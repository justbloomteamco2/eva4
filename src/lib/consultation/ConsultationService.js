import { supabaseRequest } from "../supabase/server.js";

export class ConsultationService {
    emailService;
    validator;
    constructor(emailService, validator) {
        this.emailService = emailService;
        this.validator = validator;
    }
    async processConsultation(data) {
        const request = this.validator.validate(data);
        const [saved] = await supabaseRequest("consultation_requests", {
            method: "POST",
            headers: { Prefer: "return=representation" },
            body: JSON.stringify({
                name: request.name,
                email: request.email,
                phone: request.phone,
                service_type: request.serviceType,
                request_details: request.requestDetails || null,
            }),
        });
        if (!saved?.id) {
            throw new Error("Supabase did not return the saved consultation request.");
        }
        let notificationSent = false;
        if (this.emailService) {
            try {
                await this.emailService.sendEmail({
                    replyTo: request.email,
                    subject: `New consultation request: ${request.name}`,
                    text: [
                        "New consultation request",
                        `Name: ${request.name}`,
                        `Email: ${request.email}`,
                        `Phone: ${request.phone}`,
                        `Service needed: ${request.serviceType}`,
                        ...(request.requestDetails ? [`Additional details: ${request.requestDetails}`] : []),
                    ].join("\n"),
                });
                notificationSent = true;
            } catch (error) {
                console.error(`Consultation email delivery failed for request ${saved.id}:`, error);
            }
        } else {
            console.error(`Consultation email is not configured for saved request ${saved.id}.`);
        }
        try {
            await supabaseRequest(`consultation_requests?id=eq.${encodeURIComponent(saved.id)}`, {
                method: "PATCH",
                body: JSON.stringify({ notification_status: notificationSent ? "sent" : "failed" }),
            });
        } catch (error) {
            console.error(`Could not update notification status for request ${saved.id}:`, error);
        }
        return { id: saved.id, notificationSent };
    }
}
