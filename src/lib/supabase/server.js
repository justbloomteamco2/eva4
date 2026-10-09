export class SupabaseRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = "SupabaseRequestError";
    }
}

export async function supabaseRequest(path, options = {}) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
        throw new SupabaseRequestError("Supabase server configuration is missing.");
    }

    const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/${path}`, {
        ...options,
        cache: "no-store",
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
    if (!response.ok) {
        const detail = await response.text();
        throw new SupabaseRequestError(`Supabase request failed (${response.status}): ${detail}`);
    }
    if (response.status === 204) return null;
    return response.json();
}
