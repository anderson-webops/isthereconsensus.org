import { z } from "zod";

function containsControlCharacter(value: string) {
	return Array.from(value).some((character) => {
		const codePoint = character.codePointAt(0) ?? 0;
		return codePoint <= 31 || codePoint === 127;
	});
}

export const accountNameSchema = z
	.string()
	.trim()
	.min(2, "Name must be at least 2 characters.")
	.max(80, "Name must be at most 80 characters.")
	.refine(value => !containsControlCharacter(value), "Name contains unsupported characters.");

export const accountEmailSchema = z
	.string()
	.trim()
	.max(254, "Email must be at most 254 characters.")
	.email("Enter a valid email address.")
	.transform(value => value.toLowerCase());

export const accountPasswordSchema = z
	.string()
	.min(12, "Password must be at least 12 characters.")
	.max(256, "Password must be at most 256 characters.");

export const adminPasswordSchema = z
	.string()
	.min(16, "Admin password must be at least 16 characters.")
	.max(256, "Admin password must be at most 256 characters.");

export const loginSchema = z.object({
	email: accountEmailSchema,
	password: z.string().min(1).max(1024),
	remember: z.boolean().optional().default(false),
	captchaToken: z.string().max(4096).optional()
});

export const registrationSchema = z.object({
	name: accountNameSchema,
	email: accountEmailSchema,
	password: accountPasswordSchema,
	captchaToken: z.string().max(4096).optional(),
	acceptTerms: z.literal(true, {
		error: "You must agree to the Terms of Service."
	})
});

export const emailChangeSchema = z.object({
	email: accountEmailSchema,
	currentPassword: z.string().min(1).max(1024)
});

export const passwordChangeSchema = z.object({
	currentPassword: z.string().min(1).max(1024),
	newPassword: accountPasswordSchema
}).refine(value => value.currentPassword !== value.newPassword, {
	message: "New password must differ from the current password.",
	path: ["newPassword"]
});

export function firstValidationError(error: z.ZodError) {
	return error.issues[0]?.message || "Invalid request.";
}

export function normalizeHttpUrl(value: unknown, maxLength = 500): string {
	if (typeof value !== "string") return "";
	const candidate = value.trim();
	if (!candidate) return "";
	if (candidate.length > maxLength) {
		throw new Error(`URL must be at most ${maxLength} characters.`);
	}

	let parsed: URL;
	try {
		parsed = new URL(candidate);
	}
	catch {
		throw new Error("Enter a valid URL.");
	}

	if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) {
		throw new Error("Only public HTTP or HTTPS URLs are allowed.");
	}

	return parsed.toString();
}

export function normalizeHttpUrlList(value: unknown, maxItems = 8, maxLength = 500): string[] {
	if (!Array.isArray(value)) return [];
	return value
		.slice(0, maxItems)
		.map(item => normalizeHttpUrl(item, maxLength))
		.filter(Boolean);
}

export function normalizeHttpOrigin(
	value: unknown,
	options: {
		requireHttps?: boolean;
	} = {}
): string {
	const normalized = normalizeHttpUrl(value, 2048);
	if (!normalized) {
		throw new Error("Origin is required.");
	}
	const parsed = new URL(normalized);
	if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
		throw new Error("Origin must not include a path, query, or fragment.");
	}
	if (options.requireHttps && parsed.protocol !== "https:") {
		throw new Error("Production origins must use HTTPS.");
	}
	return parsed.origin;
}
