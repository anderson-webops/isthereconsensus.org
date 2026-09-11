import { createHmac } from "node:crypto";
import { z } from "zod";

export const feedbackKinds = ["usefulness", "missing_evidence", "content_gap"] as const;
export const feedbackStatuses = ["new", "reviewing", "planned", "resolved", "dismissed"] as const;
const objectId = z.string().regex(/^[a-f\d]{24}$/);
const sourceUrl = z
	.string()
	.trim()
	.max(500)
	.refine((value) => {
		if (!value) return true;
		try {
			const url = new URL(value);
			return ["https:", "http:"].includes(url.protocol) && !url.username && !url.password;
		}
		catch {
			return false;
		}
	}, "Use an HTTP(S) source link without credentials.");
const suggestion = {
	message: z.string().trim().min(20).max(1200),
	sourceUrl: sourceUrl.default(""),
	captchaToken: z.string().max(4096).optional()
};
export const readerFeedbackSubmission = z.discriminatedUnion("kind", [
	z.object({ kind: z.literal("usefulness"), claimId: objectId, helpful: z.boolean() }).strict(),
	z
		.object({
			kind: z.literal("missing_evidence"),
			claimId: objectId,
			area: z.enum(["source", "population", "outcome", "explanation", "other"]),
			...suggestion
		})
		.strict(),
	z
		.object({
			kind: z.literal("content_gap"),
			topicId: objectId.optional(),
			title: z.string().trim().min(10).max(200),
			...suggestion
		})
		.strict()
]);
export const readerFeedbackReview = z
	.object({
		revision: z
			.number()
			.int()
			.min(0)
			.max(Number.MAX_SAFE_INTEGER - 1),
		status: z.enum(feedbackStatuses),
		priority: z.number().int().min(0).max(2),
		note: z.string().trim().min(10).max(1000),
		linkedClaimId: objectId.nullable(),
		linkedTopicId: objectId.nullable()
	})
	.strict();
export const readerFeedbackQuery = z
	.object({
		page: z.coerce.number().int().min(1).max(200).default(1),
		limit: z.coerce.number().int().min(1).max(100).default(25),
		kind: z.enum(feedbackKinds).optional(),
		status: z.enum(feedbackStatuses).optional(),
		priority: z.coerce.number().int().min(0).max(2).optional(),
		claimId: objectId.optional(),
		topicId: objectId.optional()
	})
	.strict();

// The key is specific to the UTC day, target and feedback kind. It does not
// identify a person across topics/days. Shared networks can share one signal.
// Never persist or log the network address, cookies or CAPTCHA token.
export function feedbackSubmissionKey(
	secret: string,
	network: string,
	data: z.infer<typeof readerFeedbackSubmission>,
	now: Date
) {
	const target = data.kind === "content_gap" ? `${data.topicId ?? ""}:${data.title.toLowerCase()}` : data.claimId;
	const detail = data.kind === "usefulness" ? "" : data.message.toLowerCase();
	return createHmac("sha256", secret)
		.update(
			JSON.stringify(["reader-feedback-v1", now.toISOString().slice(0, 10), network, data.kind, target, detail])
		)
		.digest("hex");
}
