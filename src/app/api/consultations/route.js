import { NextResponse } from "next/server";
import { ConsultationService } from "@/lib/consultation/ConsultationService";
import { ConsultationValidator } from "@/lib/consultation/ConsultationValidator";
import { ResendEmailService } from "@/lib/consultation/ResendEmailService";
import { ConsultationValidationError, } from "@/lib/consultation/types";
import { checkRateLimit } from "@/lib/security/rate-limit";
import { JsonBodyError, readJson } from "@/lib/http/readJson";
export async function POST(request) {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    const to = process.env.CONSULTATION_TO_EMAIL;
    let allowed;
    try {
        allowed = await checkRateLimit(request, "consultations", 5, 900);
    }
    catch (error) {
        console.error("Consultation rate limiting failed:", error);
        return NextResponse.json({ error: "Consultation requests are temporarily unavailable." }, { status: 503 });
    }
    if (!allowed) {
        return NextResponse.json(
            { error: "Too many requests. Please try again in a few minutes." },
            { status: 429, headers: { "Retry-After": "900" } }
        );
    }
    let payload;
    try {
        payload = await readJson(request, 4096);
    }
    catch (error) {
        if (error instanceof JsonBodyError) {
            return NextResponse.json({ error: error.message }, { status: error.status });
        }
        throw error;
    }
    const emailService = apiKey && from && to ? new ResendEmailService(apiKey, from, to) : null;
    const service = new ConsultationService(emailService, new ConsultationValidator());
    try {
        const result = await service.processConsultation(payload);
        return NextResponse.json({
            message: result.notificationSent
                ? "Your consultation request has been received."
                : "Your request has been received. Our team will follow up with you.",
        }, { status: 201 });
    }
    catch (error) {
        if (error instanceof ConsultationValidationError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        console.error("Consultation request could not be saved:", error);
        return NextResponse.json({ error: "Unable to save your request right now. Please try again later." }, { status: 503 });
    }
}
