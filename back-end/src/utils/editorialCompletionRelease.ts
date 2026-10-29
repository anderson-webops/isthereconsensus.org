import type { IClaim } from "../models/schemas/Claim.js";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";
import { claimsBeforeEditorialCompletion } from "../data/claims.js";
import { seedSourceIdentity } from "../data/seedClaims.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { ContentRelease } from "../models/schemas/ContentRelease.js";
import { Topic } from "../models/schemas/Topic.js";
import { approvedReaderContentMatches } from "./approvedReaderPublication.js";
import { createEditorialCompletionProposal } from "./editorialCompletionProposal.js";
import { ownerCorrectionMatches, scientificSources } from "./ownerContentRelease.js";
import { getPublicClaimReadiness, summarizeClaimSourceReadiness } from "./publicClaimReadiness.js";
import { isRevisionCommentary } from "./researchIntegrity.js";

export const EDITORIAL_COMPLETION_RELEASE = "owner-editorial-completion-2026-10-22";
export const EDITORIAL_COMPLETION_SHA256 = "1eb90cbcb4025be246701e2cea33dc35b6da8f99d603cb95adff11b4344fa4f5";
const preservedFields = new Set([
	"status",
	"changeLog",
	"lastRetractionCheckAt",
	"surveillanceSpec"
]);

export function completionBaselineMatches(claim: Partial<IClaim>, sources: Partial<IClaimSource>[], baseline: typeof claimsBeforeEditorialCompletion[number]) {
	const actual = isRevisionCommentary(baseline.editorSummary) && isRevisionCommentary(claim.editorSummary)
		? { ...claim, editorSummary: baseline.editorSummary }
		: claim;
	return ownerCorrectionMatches(actual, sources, baseline, []);
}

function matchesExpectedSchedule(
	claim: Partial<IClaim>,
	maintenance: ReturnType<typeof createEditorialCompletionProposal>["targets"][number]["maintenance"]
) {
	const expectedSchedule = maintenance?.expectedDefaultSchedule;
	return Boolean(maintenance && claim.lastReviewedAt && claim.reviewDateBasis === "source_record"
		&& claim.lastReviewedAt.getTime() === expectedSchedule?.lastReviewedAt?.getTime()
		&& (!claim.nextReviewAt || claim.nextReviewAt.getTime() === expectedSchedule?.nextReviewAt?.getTime()));
}

async function writeCompletionSources(
	proposedSources: ReturnType<typeof createEditorialCompletionProposal>["targets"][number]["proposedSources"],
	baseline: typeof claimsBeforeEditorialCompletion[number],
	sources: readonly { _id: mongoose.Types.ObjectId }[],
	claimId: mongoose.Types.ObjectId,
	session: mongoose.ClientSession
) {
	for (const source of proposedSources) {
		const fields = scientificSources(source);
		const identity = seedSourceIdentity(source);
		const existingIndex = baseline.sources.findIndex(value => approvedReaderContentMatches(seedSourceIdentity(value), identity));
		const existing = existingIndex >= 0
			? sources[existingIndex]
			: undefined;
		if (existing) {
			if (JSON.stringify(fields) !== JSON.stringify(scientificSources(baseline.sources[existingIndex]!))) {
				await ClaimSource.updateOne({ _id: existing._id }, {
					$set: fields,
					$inc: { __v: 1 }
				}, { session, runValidators: true });
			}
		}
		else {
			await new ClaimSource({ ...fields, claim: claimId }).save({ session });
		}
	}
}

export async function publishEditorialCompletion(signal?: AbortSignal) {
	signal?.throwIfAborted();
	const proposal = createEditorialCompletionProposal({
		commit: "0".repeat(40),
		tree: "0".repeat(40)
	});
	if (proposal.contentSha256 !== EDITORIAL_COMPLETION_SHA256 || proposal.targets.length !== 467) throw new Error("The approved editorial completion definition has changed.");
	const hello = await mongoose.connection.db!.admin().command({ hello: 1 });
	if (!hello.setName && hello.msg !== "isdbgrid") throw new Error("Editorial completion requires atomic transaction support; no content was changed.");
	await ContentRelease.init();
	const result = {
		published: 0,
		preserved: 0,
		conflicts: 0,
		failed: 0,
		scheduled: 0
	};
	for (const target of proposal.targets) {
		if (signal?.aborted) break;
		const session = await mongoose.startSession();
		try {
			const outcome = await session.withTransaction(async () => {
				signal?.throwIfAborted();
				const receiptId = `${EDITORIAL_COMPLETION_RELEASE}:${target.key}`;
				const receipt = await ContentRelease.findById(receiptId).session(session).lean();
				if (receipt) {
					if (receipt.contentHash !== proposal.contentSha256) throw new Error("The immutable editorial receipt differs.");
					return { disposition: "preserved" as const, scheduled: false };
				}
				const before = claimsBeforeEditorialCompletion.find(claim => `${claim.topicSlug}/${claim.slug}` === target.key)!;
				const topic = await Topic.findOne({ slug: before.topicSlug }).session(session).lean();
				const claim = topic && await Claim.findOne({ topic: topic._id, slug: before.slug }).session(session).lean();
				if (!claim) return { disposition: "conflicts" as const, scheduled: false };
				const sources = await ClaimSource.find({ claim: claim._id }).sort({ order: 1, _id: 1 }).session(session).lean();
				const baseline = [before, ...target.compatibleBaselines].find(candidate => completionBaselineMatches(claim, sources, candidate));
				if (!baseline) return { disposition: "conflicts" as const, scheduled: false };
				const proposed = target.proposedFields;
				const patch: Record<string, unknown> = Object.fromEntries(target.changedFields.filter(field => !preservedFields.has(field)).map(field => [field, proposed[field as keyof typeof proposed]]));
				const scheduled = matchesExpectedSchedule(claim, target.maintenance);
				if (scheduled) patch.nextReviewAt = new Date(claim.lastReviewedAt!.getTime() + target.maintenance!.cadenceDays * 86400000);
				await writeCompletionSources(target.proposedSources, baseline, sources, claim._id, session);
				const history = proposed.changeLog.slice(target.expectedSourceBaseline.changeLog.length);
				const appliedAt = new Date();
				await Claim.updateOne({ _id: claim._id }, {
					$set: patch,
					$push: {
						changeLog: { $each: history },
						readerUpdates: {
							$each: [
								{
									id: randomUUID(),
									date: appliedAt,
									kind: "correction",
									bottomLineImpact: "unchanged",
									summary: history.at(-1)!.summary
								}
							],
							$position: 0
						}
					},
					$inc: { __v: 1 }
				}, { session, runValidators: true });
				const saved = await Claim.findById(claim._id).session(session).lean();
				const savedSources = await ClaimSource.find({ claim: claim._id }).sort({ order: 1, _id: 1 }).session(session).lean();
				if (!saved || !getPublicClaimReadiness(saved, summarizeClaimSourceReadiness(savedSources)).isReady) throw new Error("Editorial completion is not publicly ready.");
				await new ContentRelease({
					_id: receiptId,
					releaseId: EDITORIAL_COMPLETION_RELEASE,
					contentHash: proposal.contentSha256,
					key: target.key,
					actorType: "system",
					approvalBasis: "owner_content_first",
					appliedAt,
					before: { claim, sources },
					after: { claim: saved, sources: savedSources }
				}).save({ session });
				return { disposition: "published" as const, scheduled };
			}, {
				readConcern: { level: "snapshot" },
				writeConcern: { w: "majority" },
				readPreference: "primary",
				maxCommitTimeMS: 10_000,
				timeoutMS: 30_000
			});
			if (outcome) {
				result[outcome.disposition]++;
				if (outcome.scheduled) result.scheduled++;
			}
		}
		catch { result.failed++; }
		finally { await session.endSession(); }
	}
	return result;
}
