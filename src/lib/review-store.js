import { supabaseRequest } from "./supabase/server.js";

const services = new Set([
    "Security services",
    "Housekeeping",
    "Gardening",
    "Labour & manpower",
]);

export class ReviewValidationError extends Error {}

const textField = (value, label, maxLength, required) => {
    if (value === undefined && !required) return "";
    if (typeof value !== "string") {
        throw new ReviewValidationError(`Enter a valid ${label}.`);
    }
    const text = value.trim();
    if ((!text && required) || text.length > maxLength || /[\u0000-\u001f\u007f]/.test(text)) {
        throw new ReviewValidationError(`Enter a valid ${label} (up to ${maxLength} characters).`);
    }
    return text;
};

export function sanitizeReview(input) {
    if (!input || typeof input !== "object" || Array.isArray(input)) {
        throw new ReviewValidationError("Submit a valid feedback request.");
    }
    const name = textField(input.name, "name", 120, true);
    const role = textField(input.role, "role", 120, false) || "Verified client";
    const quote = textField(input.quote, "experience", 220, true);
    const service = input.service;
    if (typeof service !== "string" || !services.has(service)) {
        throw new ReviewValidationError("Select one of the listed services.");
    }
    const rating = input.rating;
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
        throw new ReviewValidationError("Select a rating from 1 to 5.");
    }
    return { name, role, quote, service, rating };
}

export async function readReviews() {
    const rows = await supabaseRequest(
        "reviews?select=id,name,role,quote,rating,service,created_at&status=eq.approved&order=created_at.desc&limit=12"
    );
    return rows.map(({ created_at, ...review }) => ({ ...review, createdAt: created_at }));
}

export async function writeReview(input) {
    const review = sanitizeReview(input);
    const [saved] = await supabaseRequest("reviews", {
        method: "POST",
        headers: { Prefer: "return=representation" },
        body: JSON.stringify({ ...review, status: "approved" }),
    });
    return saved;
}
