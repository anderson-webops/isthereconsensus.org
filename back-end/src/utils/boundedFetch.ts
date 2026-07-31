const DEFAULT_TIMEOUT_MS = 5_000;
const DEFAULT_MAX_BYTES = 256 * 1024;

export interface BoundedFetchOptions {
	timeoutMs?: number;
	maxBytes?: number;
}

async function readBoundedBody(response: Response, maxBytes: number): Promise<string> {
	const declaredLength = Number(response.headers.get("content-length") || "0");
	if (declaredLength > maxBytes) throw new Error("Upstream response exceeded the allowed size.");

	if (!response.body) return "";
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let total = 0;
	let text = "";

	try {
		while (true) {
			const { done, value } = await reader.read();
			if (done) break;
			total += value.byteLength;
			if (total > maxBytes) {
				await reader.cancel();
				throw new Error("Upstream response exceeded the allowed size.");
			}
			text += decoder.decode(value, { stream: true });
		}
		text += decoder.decode();
		return text;
	}
	finally {
		reader.releaseLock();
	}
}

export async function fetchJsonBounded<T>(
	input: string | URL,
	init: RequestInit = {},
	options: BoundedFetchOptions = {}
): Promise<{ response: Response; data: T }> {
	const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
	const maxBytes = options.maxBytes ?? DEFAULT_MAX_BYTES;
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), timeoutMs);

	try {
		const response = await fetch(input, {
			...init,
			redirect: "error",
			signal: controller.signal
		});
		const text = await readBoundedBody(response, maxBytes);
		let data: T;
		try {
			data = JSON.parse(text) as T;
		}
		catch {
			throw new Error("Upstream returned invalid JSON.");
		}
		return { response, data };
	}
	finally {
		clearTimeout(timeout);
	}
}
