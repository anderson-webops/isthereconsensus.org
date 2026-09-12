import type { PipelineStage } from "mongoose";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import { createHash } from "node:crypto";
import { z } from "zod";
import { recordedDate } from "./claimReviewStatus.js";

export const priorityReasons = [
	"source_notice",
	"update_requested",
	"due",
	"evidence_request",
	"dates_need_verification"
] as const;
export const maintenanceHistoryLimit = 100;
const objectId = z.string().regex(/^[a-f\d]{24}$/);
const revision = z
	.number()
	.int()
	.min(0)
	.max(Number.MAX_SAFE_INTEGER - 1);
const note = z.string().trim().min(20).max(1000);
const date = z
	.string()
	.refine(value => Boolean(recordedDate(value)), "Use a valid UTC date.")
	.nullable();
export const reviewPriorityQuery = z
	.object({
		page: z.coerce.number().int().min(1).max(10_000).default(1),
		limit: z.coerce.number().int().min(1).max(50).default(25),
		reason: z.enum(["attention", "all", ...priorityReasons]).default("attention"),
		query: z.string().trim().max(100).default(""),
		topicId: objectId.optional()
	})
	.strict();
export const reviewDetailQuery = z
	.object({ sourcePage: z.coerce.number().int().min(1).max(10_000).default(1) })
	.strict();
export const reviewScheduleChange = z
	.object({ revision, expectedNextReviewAt: date, nextReviewAt: date, note })
	.strict();
export const sourceNoticeDecision = z
	.object({
		revision,
		fingerprint: z.string().regex(/^[a-f\d]{64}$/),
		decision: z.enum(["addressed", "open"]),
		note
	})
	.strict();

// Only stable notice identity/content goes into the signature. A routine check
// timestamp or reordered links must not reopen a handled notice.
export function sourceNoticeSnapshot(source: Partial<IClaimSource>) {
	const integrity = source.evidenceProfile?.publicationIntegrity;
	return {
		citationStatus: source.citationStatus ?? "current",
		retracted: integrity?.retracted === true,
		expressionOfConcern: integrity?.expressionOfConcern === true,
		correctionOrErratum: integrity?.correctionOrErratum === true,
		doi: source.doi ?? "",
		url: source.url ?? "",
		integrityNotes: integrity?.integrityNotes ?? "",
		statusSources: [...new Set(source.statusSources ?? [])].sort()
	};
}
export type NoticeSnapshot = ReturnType<typeof sourceNoticeSnapshot>;
export function noticeFingerprint(snapshot: NoticeSnapshot) {
	return createHash("sha256")
		.update(
			JSON.stringify([
				snapshot.citationStatus,
				snapshot.retracted,
				snapshot.expressionOfConcern,
				snapshot.correctionOrErratum,
				snapshot.doi,
				snapshot.url,
				snapshot.integrityNotes,
				[...new Set(snapshot.statusSources)].sort()
			])
		)
		.digest("hex");
}
export function hasSourceNotice(snapshot: NoticeSnapshot) {
	return (
		snapshot.citationStatus !== "current"
		|| snapshot.retracted
		|| snapshot.expressionOfConcern
		|| snapshot.correctionOrErratum
	);
}

export const sourceNoticeFilter = {
	$or: [
		{ citationStatus: { $in: ["corrected", "retracted", "expression_of_concern"] as const } },
		{ "evidenceProfile.publicationIntegrity.retracted": true },
		{ "evidenceProfile.publicationIntegrity.expressionOfConcern": true },
		{ "evidenceProfile.publicationIntegrity.correctionOrErratum": true }
	]
};

const noticeFields = [
	"citationStatus",
	"retracted",
	"expressionOfConcern",
	"correctionOrErratum",
	"doi",
	"url",
	"integrityNotes"
];
export function noticeStages(includeHistory = false): Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[] {
	return [
		{
			$set: {
				noticeSnapshot: {
					citationStatus: { $ifNull: ["$citationStatus", "current"] },
					retracted: { $eq: [{ $ifNull: ["$evidenceProfile.publicationIntegrity.retracted", false] }, true] },
					expressionOfConcern: {
						$eq: [{ $ifNull: ["$evidenceProfile.publicationIntegrity.expressionOfConcern", false] }, true]
					},
					correctionOrErratum: {
						$eq: [{ $ifNull: ["$evidenceProfile.publicationIntegrity.correctionOrErratum", false] }, true]
					},
					doi: { $ifNull: ["$doi", ""] },
					url: { $ifNull: ["$url", ""] },
					integrityNotes: { $ifNull: ["$evidenceProfile.publicationIntegrity.integrityNotes", ""] },
					statusSources: { $ifNull: ["$statusSources", []] }
				}
			}
		},
		{ $lookup: {
			from: "sourcenoticereviews",
			localField: "_id",
			foreignField: "_id",
			as: "noticeReview",
			pipeline: [{ $project: { snapshot: 1, decision: 1, ...(includeHistory ? { revision: 1, history: 1 } : {}) } }]
		} },
		{ $set: { noticeReview: { $arrayElemAt: ["$noticeReview", 0] } } },
		{
			$set: {
				noticeAddressed: {
					$and: [
						{ $eq: ["$noticeReview.decision", "addressed"] },
						...noticeFields.map(field => ({
							$eq: [`$noticeReview.snapshot.${field}`, `$noticeSnapshot.${field}`]
						})),
						{
							$setEquals: [
								{ $ifNull: ["$noticeReview.snapshot.statusSources", []] },
								"$noticeSnapshot.statusSources"
							]
						}
					]
				}
			}
		}
	];
}

export function priorityPipeline(now: Date): PipelineStage[] {
	const dateValue = (field: string) => ({
		$convert: { input: `$${field}`, to: "date", onError: null, onNull: null }
	});
	const day = (field: string) => ({
		$dateToString: { date: `$${field}`, format: "%Y-%m-%d", timezone: "UTC", onNull: "" }
	});
	return [
		{ $match: { status: { $in: ["published", "needs_update"] } } },
		{
			$project: {
				title: 1,
				slug: 1,
				topic: 1,
				status: 1,
				lastReviewedAt: 1,
				reviewDateBasis: 1,
				searchCutoffAt: 1,
				nextReviewAt: 1
			}
		},
		{
			$lookup: {
				from: "claimsources",
				let: { claimId: "$_id" },
				pipeline: [
					{ $match: { ...sourceNoticeFilter, $expr: { $eq: ["$claim", "$$claimId"] } } },
					...noticeStages(),
					{ $match: { noticeAddressed: { $ne: true } } },
					{
						$project: {
							_id: 1,
							critical: {
								$or: [
									{ $in: ["$citationStatus", ["retracted", "expression_of_concern"]] },
									"$noticeSnapshot.retracted",
									"$noticeSnapshot.expressionOfConcern"
								]
							}
						}
					}
				],
				as: "openNotices"
			}
		},
		{
			$lookup: {
				from: "readerfeedbacks",
				let: { claimId: "$_id" },
				pipeline: [
					{
						$match: {
							kind: { $in: ["missing_evidence", "content_gap"] },
							status: { $in: ["new", "reviewing", "planned"] },
							expiresAt: { $gt: now },
							$expr: {
								$or: [{ $eq: ["$claimId", "$$claimId"] }, { $eq: ["$linkedClaimId", "$$claimId"] }]
							}
						}
					},
					{ $count: "count" }
				],
				as: "feedbackCounts"
			}
		},
		{
			$set: {
				reviewed: dateValue("lastReviewedAt"),
				cutoff: dateValue("searchCutoffAt"),
				deadline: dateValue("nextReviewAt"),
				openNoticeCount: { $size: "$openNotices" },
				feedbackCount: { $ifNull: [{ $arrayElemAt: ["$feedbackCounts.count", 0] }, 0] },
				critical: { $in: [true, "$openNotices.critical"] }
			}
		},
		{
			$set: {
				due: { $and: [{ $ne: ["$deadline", null] }, { $lte: ["$deadline", now] }] },
				dateIssue: {
					$or: [
						...[
							["lastReviewedAt", "reviewed"],
							["searchCutoffAt", "cutoff"],
							["nextReviewAt", "deadline"]
						].map(([raw, parsed]) => ({
							$and: [{ $ne: [{ $ifNull: [`$${raw}`, null] }, null] }, { $eq: [`$${parsed}`, null] }]
						})),
						{ $gt: ["$reviewed", now] },
						{ $gt: ["$cutoff", now] },
						{ $and: [{ $ne: ["$reviewed", null] }, { $gt: [day("cutoff"), day("reviewed")] }] },
						{
							$and: [
								{ $ne: ["$reviewed", null] },
								{ $ne: ["$deadline", null] },
								{ $lt: ["$deadline", "$reviewed"] }
							]
						}
					]
				}
			}
		},
		{
			$set: {
				reasons: {
					$concatArrays: [
						{ $cond: [{ $gt: ["$openNoticeCount", 0] }, ["source_notice"], []] },
						{ $cond: [{ $eq: ["$status", "needs_update"] }, ["update_requested"], []] },
						{ $cond: ["$due", ["due"], []] },
						{ $cond: [{ $gt: ["$feedbackCount", 0] }, ["evidence_request"], []] },
						{ $cond: ["$dateIssue", ["dates_need_verification"], []] }
					]
				},
				priority: {
					$switch: {
						branches: [
							{ case: "$critical", then: 0 },
							{ case: { $gt: ["$openNoticeCount", 0] }, then: 1 },
							{ case: { $eq: ["$status", "needs_update"] }, then: 2 },
							{ case: "$due", then: 3 },
							{ case: { $gt: ["$feedbackCount", 0] }, then: 4 },
							{ case: "$dateIssue", then: 5 }
						],
						default: 6
					}
				}
			}
		},
		{ $unset: ["openNotices", "feedbackCounts", "reviewed", "cutoff", "deadline", "due", "dateIssue", "critical"] }
	];
}
