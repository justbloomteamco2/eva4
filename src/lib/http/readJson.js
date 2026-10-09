export class JsonBodyError extends Error {
    status;
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

export async function readJson(request, maxBytes = 8192) {
    const contentLength = Number(request.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > maxBytes) {
        throw new JsonBodyError("Request body is too large.", 413);
    }
    if (!request.body) {
        throw new JsonBodyError("Submit a valid JSON request.");
    }

    const reader = request.body.getReader();
    const chunks = [];
    let length = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > maxBytes) {
            await reader.cancel();
            throw new JsonBodyError("Request body is too large.", 413);
        }
        chunks.push(value);
    }

    const body = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
        body.set(chunk, offset);
        offset += chunk.byteLength;
    }
    try {
        return JSON.parse(new TextDecoder().decode(body));
    } catch {
        throw new JsonBodyError("Submit a valid JSON request.");
    }
}
