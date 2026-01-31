import { env } from "node:process";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface CaptchaResult {
	ok: boolean;
	skipped?: boolean;
	error?: string;
}

export async function verifyCaptcha(token: string | undefined, remoteIp?: string): Promise<CaptchaResult> {
	const secret = env.CAPTCHA_SECRET;
	if (!secret) {
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
		const response = await fetch(VERIFY_URL, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body
		});
		const data = (await response.json()) as { "success"?: boolean; "error-codes"?: string[] };
		if (!data.success) {
			return { ok: false, error: data["error-codes"]?.join(", ") || "Captcha failed" };
		}
		return { ok: true };
	}
	catch (error) {
		console.error("Captcha verification failed", error);
		return { ok: false, error: "Captcha verification error" };
	}
}
