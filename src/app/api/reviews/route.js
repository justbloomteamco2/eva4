import { NextResponse } from "next/server";
import { readReviews, writeReview } from "@/lib/review-store";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { JsonBodyError, readJson } from "@/lib/http/readJson";
import { ReviewValidationError } from "@/lib/review-store";
export async function GET() {
    try {
        const reviews = await readReviews();
        return NextResponse.json(reviews, { status: 200 });
    }
    catch (error) {
        console.error("Review feed load failed:", error);
        return NextResponse.json({ error: "Unable to load client feedback right now." }, { status: 503 });
    }
}
export async function POST(request) {
    let allowed;
    try {
        allowed = await checkRateLimit(request, "reviews", 3, 3600);
    }
    catch (error) {
        console.error("Review rate limiting failed:", error);
        return NextResponse.json({ error: "Feedback is temporarily unavailable. Please try again later." }, { status: 503 });
    }
    if (!allowed) {
        return NextResponse.json(
            { error: "Please wait before submitting more feedback." },
            { status: 429, headers: { "Retry-After": "3600" } }
        );
    }
    try {
        const payload = await readJson(request, 8192);
        const review = await writeReview(payload);
        return NextResponse.json(
            { message: "Thank you. Your feedback will be reviewed before it appears.", review },
            { status: 202 }
        );
    }
    catch (error) {
        if (error instanceof JsonBodyError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        if (error instanceof ReviewValidationError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        console.error("Review submission failed:", error);
        return NextResponse.json({ error: "Unable to save your feedback right now." }, { status: 503 });
    }
}
