import { createHmac } from "node:crypto";
import { supabaseRequest } from "../supabase/server.js";

export async function checkRateLimit(request, bucket, limit, windowSeconds) {
    const identity = request.headers.get("cf-connecting-ip")
        ?? request.headers.get("x-vercel-forwarded-for")
        ?? request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim()
        ?? (process.env.NODE_ENV === "production" ? null : "local-development");
    if (!identity) {
        throw new Error("Request client IP is unavailable for rate limiting.");
    }

    const key = createHmac("sha256", process.env.SUPABASE_SERVICE_ROLE_KEY).update(identity).digest("hex");
    const allowed = await supabaseRequest("rpc/check_public_submission_limit", {
        method: "POST",
        body: JSON.stringify({
            p_bucket: bucket,
            p_key_hash: key,
            p_limit: limit,
            p_window_seconds: windowSeconds,
        }),
    });
    if (typeof allowed !== "boolean") {
        throw new Error("Supabase returned an invalid rate-limit response.");
    }
    return allowed;
}
