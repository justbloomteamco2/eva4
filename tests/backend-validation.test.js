import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import { JsonBodyError, readJson } from "../src/lib/http/readJson.js";
import { sanitizeReview, writeReview, ReviewValidationError } from "../src/lib/review-store.js";
import { checkRateLimit } from "../src/lib/security/rate-limit.js";
import { ConsultationService } from "../src/lib/consultation/ConsultationService.js";
import { ConsultationValidator } from "../src/lib/consultation/ConsultationValidator.js";

const validReview = {
    name: "Jamie Client",
    role: "Facilities manager",
    quote: "Reliable and professional service.",
    service: "Security services",
    rating: 5,
};

test("review validation accepts bounded, supported feedback", () => {
    assert.deepEqual(sanitizeReview(validReview), validReview);
});

test("review validation rejects oversized and unsupported fields", () => {
    assert.throws(
        () => sanitizeReview({ ...validReview, quote: "x".repeat(221) }),
        ReviewValidationError
    );
    assert.throws(
        () => sanitizeReview({ ...validReview, service: "Other" }),
        ReviewValidationError
    );
    assert.throws(
        () => sanitizeReview({ ...validReview, rating: 6 }),
        ReviewValidationError
    );
});

test("new reviews are saved as approved", async () => {
    const originalFetch = globalThis.fetch;
    const originalUrl = process.env.SUPABASE_URL;
    const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    let savedReview;
    process.env.SUPABASE_URL = "https://project.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";
    globalThis.fetch = async (_url, options) => {
        savedReview = JSON.parse(options.body);
        return Response.json([{ ...savedReview, id: "review-123" }], { status: 201 });
    };
    try {
        const result = await writeReview(validReview);
        assert.equal(savedReview.status, "approved");
        assert.equal(result.status, "approved");
    } finally {
        globalThis.fetch = originalFetch;
        if (originalUrl === undefined) delete process.env.SUPABASE_URL;
        else process.env.SUPABASE_URL = originalUrl;
        if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
        else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    }
});

test("JSON reader parses valid requests and rejects oversized bodies", async () => {
    const request = new Request("https://example.test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validReview),
    });
    assert.deepEqual(await readJson(request), validReview);

    const oversized = new Request("https://example.test", {
        method: "POST",
        body: "x".repeat(100),
    });
    await assert.rejects(readJson(oversized, 10), (error) =>
        error instanceof JsonBodyError && error.status === 413
    );
});

test("rate limiter sends only an HMAC of client identity to Supabase", async () => {
    const originalFetch = globalThis.fetch;
    const originalUrl = process.env.SUPABASE_URL;
    const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    let rpcBody;
    process.env.SUPABASE_URL = "https://project.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";
    globalThis.fetch = async (url, options) => {
        assert.equal(url, "https://project.supabase.co/rest/v1/rpc/check_public_submission_limit");
        rpcBody = JSON.parse(options.body);
        return new Response("false", { status: 200 });
    };
    try {
        const request = new Request("https://example.test", {
            headers: { "x-forwarded-for": "203.0.113.55, 192.0.2.10" },
        });
        assert.equal(await checkRateLimit(request, "reviews", 3, 3600), false);
        assert.equal(rpcBody.p_bucket, "reviews");
        assert.equal(rpcBody.p_key_hash.length, 64);
        assert.equal(
            rpcBody.p_key_hash,
            createHmac("sha256", "test-service-key").update("192.0.2.10").digest("hex")
        );
    } finally {
        globalThis.fetch = originalFetch;
        if (originalUrl === undefined) delete process.env.SUPABASE_URL;
        else process.env.SUPABASE_URL = originalUrl;
        if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
        else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    }
});

test("consultation requests persist before notification and retain failed notifications", async () => {
    const originalFetch = globalThis.fetch;
    const originalUrl = process.env.SUPABASE_URL;
    const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const originalError = console.error;
    const events = [];
    process.env.SUPABASE_URL = "https://project.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-key";
    globalThis.fetch = async (_url, options) => {
        const payload = JSON.parse(options.body);
        events.push({ method: options.method, payload });
        if (options.method === "POST") {
            return Response.json([{ id: "lead-123" }], { status: 201 });
        }
        return new Response(null, { status: 204 });
    };
    console.error = () => {};
    try {
        const failedEmail = { sendEmail: async () => { throw new Error("delivery failed"); } };
        const service = new ConsultationService(failedEmail, new ConsultationValidator());
        const result = await service.processConsultation({
            name: "Client",
            email: "client@example.com",
            phone: "+91 98765 43210",
            serviceType: "Housekeeping",
        });
        assert.deepEqual(result, { id: "lead-123", notificationSent: false });
        assert.equal(events[0].method, "POST");
        assert.equal(events[0].payload.email, "client@example.com");
        assert.equal(events[1].method, "PATCH");
        assert.deepEqual(events[1].payload, { notification_status: "failed" });
    } finally {
        globalThis.fetch = originalFetch;
        console.error = originalError;
        if (originalUrl === undefined) delete process.env.SUPABASE_URL;
        else process.env.SUPABASE_URL = originalUrl;
        if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
        else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
    }
});
