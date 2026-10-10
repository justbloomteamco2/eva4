import { ConsultationValidationError } from "./types.js";
const services = new Set([
    "Security services",
    "Housekeeping",
    "Gardening",
    "Labour & manpower",
    "Other requests",
]);
export class ConsultationValidator {
    validate(data) {
        if (!data || typeof data !== "object" || Array.isArray(data)) {
            throw new ConsultationValidationError("Submit a valid consultation request.");
        }
        const input = data;
        const name = typeof input.name === "string" ? input.name.trim() : "";
        const email = typeof input.email === "string" ? input.email.trim() : "";
        const phone = typeof input.phone === "string" ? input.phone.trim() : "";
        const serviceType = typeof input.serviceType === "string" ? input.serviceType : "";
        const requestDetails = input.requestDetails === undefined ? "" : input.requestDetails;
        if (!name || name.length > 120 || /[\u0000-\u001f\u007f]/.test(name)) {
            throw new ConsultationValidationError("Enter a valid name (up to 120 characters).");
        }
        if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new ConsultationValidationError("Enter a valid email address.");
        }
        const digits = phone.replace(/\D/g, "");
        if (!/^[+()\d\s.-]+$/.test(phone) || digits.length < 8 || digits.length > 15) {
            throw new ConsultationValidationError("Enter a valid phone number.");
        }
        if (!services.has(serviceType)) {
            throw new ConsultationValidationError("Select one of the listed services.");
        }
        if (typeof requestDetails !== "string" || requestDetails.length > 1000 ||
            /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(requestDetails)) {
            throw new ConsultationValidationError("Keep additional details under 1,000 characters and remove unsupported control characters.");
        }
        return {
            name,
            email,
            phone,
            serviceType,
            requestDetails: serviceType === "Other requests" ? requestDetails.trim() : "",
        };
    }
}
