import { z } from "zod";

export const coverageStatuses = ["planned", "researching", "published"] as const;
export const coverageVisibilities = ["draft", "public", "withdrawn"] as const;
const objectId = z.string().regex(/^[a-f\d]{24}$/);
const fields = {
	title: z.string().trim().min(10).max(200),
	summary: z.string().trim().min(40).max(1200),
	status: z.enum(coverageStatuses),
	topicId: objectId.nullable(),
	claimId: objectId.nullable(),
	privateNote: z.string().trim().min(10).max(1000)
};
function hasPublishedAnswer(data: { status: string; claimId: string | null }) {
	return data.status !== "published" || data.claimId !== null;
}

export const coverageDraft = z.object({
	...fields,
	feedbackId: z.string().regex(/^[a-f\d]{64}$/).optional()
}).strict().refine(hasPublishedAnswer, "Published requests require a reviewed answer.");

export const coverageChange = z.object({
	...fields,
	revision: z.number().int().min(0).max(Number.MAX_SAFE_INTEGER - 1),
	operation: z.enum(["save", "approve", "withdraw"]),
	publicSummaryApproved: z.boolean(),
	publicUpdateSummary: z.string().trim().max(500)
}).strict().refine(hasPublishedAnswer, "Published requests require a reviewed answer.");

export const coverageQuery = z.object({
	page: z.coerce.number().int().min(1).max(200).default(1),
	limit: z.coerce.number().int().min(1).max(50).default(20),
	status: z.enum(coverageStatuses).optional()
}).strict();

export const adminCoverageQuery = coverageQuery.extend({
	visibility: z.enum(coverageVisibilities).optional()
}).strict();

export function coverageTransition(visibility: typeof coverageVisibilities[number], change: z.infer<typeof coverageChange>) {
	const nextVisibility = change.operation === "approve"
		? "public"
		: change.operation === "withdraw" ? "withdrawn" : visibility;
	if (nextVisibility === "public" && (!change.publicSummaryApproved || change.publicUpdateSummary.length < 10)) {
		return { ok: false as const, error: "Explicitly approve the public summary and provide a public update explanation." };
	}
	return { ok: true as const, visibility: nextVisibility };
}

interface CoveragePublicRecord {
	_id: unknown;
	title: string;
	summary: string;
	status: string;
	publicUpdatedAt?: Date | null;
	publicHistory: Array<{ date: Date; status: string; summary: string }>;
}

export function publicCoverageRequest(
	row: CoveragePublicRecord,
	topic: { title: string; slug: string } | null,
	answer: { title: string; slug: string; topic: { slug: string } } | null
) {
	return {
		_id: String(row._id),
		title: row.title,
		summary: row.summary,
		status: row.status,
		updatedAt: row.publicUpdatedAt ?? null,
		topic: topic ? { title: topic.title, slug: topic.slug } : null,
		answer: row.status === "published" && answer
			? { title: answer.title, path: `/consensus/${answer.topic.slug}/${answer.slug}` }
			: null,
		answerUnavailable: row.status === "published" && !answer,
		history: row.publicHistory.map(event => ({ date: event.date, status: event.status, summary: event.summary }))
	};
}
