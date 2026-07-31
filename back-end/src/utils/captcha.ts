import { env } from "node:process";
import { fetchJsonBounded } from "./boundedFetch.js";
import { logError } from "./safeLog.js";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface CaptchaResult {
	ok: boolean;
	skipped?: boolean;
	error?: string;
}

export async function verifyCaptcha(token: string | undefined, remoteIp?: string): Promise<CaptchaResult> {
	const secret = env.CAPTCHA_SECRET;
	if (!secret) {
		if (env.NODE_ENV === "production") {
			return { ok: false, error: "Captcha is unavailable." };
		}
		return { ok: true, skipped: true };
	}
	if (!token) {
		return { ok: false, error: "Captcha token missing" };
	}

	const body = new URLSearchParams();
	body.set("secret", secret);
	body.set("response", token);
	if (remoteIp) body.set("remoteip", remoteIp);

	try {
		const { response, data } = await fetchJsonBounded<{ "success"?: boolean; "error-codes"?: string[] }>(
			VERIFY_URL,
			{
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body
			},
			{ timeoutMs: 5_000, maxBytes: 32 * 1024 }
		);
		if (!response.ok) return { ok: false, error: "Captcha verification failed." };
		if (!data.success) {
			return { ok: false, error: "Captcha verification failed." };
		}
		return { ok: true };
	}
	catch (error) {
		logError("Captcha verification failed", error);
		return { ok: false, error: "Captcha verification is temporarily unavailable." };
	}
}
