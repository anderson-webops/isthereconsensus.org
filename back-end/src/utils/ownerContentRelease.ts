import type { CompleteSeedClaim } from "../data/claims.js";
import type { IClaim } from "../models/schemas/Claim.js";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";
import { legacyEditorialBaseline } from "../data/claim-audit-legacy-baselines-2026-10.js";
import { refreshEditorialAuditClaim } from "../data/claim-audit-refreshes-2026-10.js";
import { claimsBeforeIntegrityCorrections } from "../data/claims.js";
import { seedClaimFields } from "../data/seedClaims.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { ContentRelease } from "../models/schemas/ContentRelease.js";
import { Topic } from "../models/schemas/Topic.js";
import { approvedReaderContentMatches } from "./approvedReaderPublication.js";
import { createEditorialAuditProposal } from "./editorialAuditProposal.js";
import { getPublicClaimReadiness, summarizeClaimSourceReadiness } from "./publicClaimReadiness.js";
import { researchIntegrityFields } from "./researchIntegrity.js";

export const OWNER_EDITORIAL_RELEASE = "owner-content-first-editorial-2026-10-21";
export const APPROVED_EDITORIAL_DATA_SHA256 = "0d81058d72280b9ad4c9efb32cee438c2f47e3ce899ac4f177c4ebc6328180cf";
const sourceFields = ["kind", "title", "publisher", "year", "url", "doi", "pmid", "pmcid", "isAnchor", "appraisal", "stance", "note", "order"] as const;
const preservedClaimFields = new Set(["status", "changeLog", "lastRetractionCheckAt", "surveillanceSpec"]);

function scientificSources(source: Partial<IClaimSource>) {
	return Object.fromEntries(sourceFields.filter(field => source[field] !== undefined && source[field] !== "").map(field => [field, source[field]]));
}

function withoutHistory(claim: ReturnType<typeof seedClaimFields>) {
	return Object.fromEntries(Object.entries(claim).filter(([field]) => !preservedClaimFields.has(field)));
}

export function ownerCorrectionMatches(claim: Partial<IClaim>, sources: Partial<IClaimSource>[], before: CompleteSeedClaim) {
	if (claim.status !== "published" || sources.length !== before.sources.length) return false;
	const workflow = claim.evidenceLandscape?.workflow;
	if (claim.evidenceLandscape?.publicFlags?.showEvidenceLandscape || workflow?.approvedById || workflow?.reviewedById || ["approved", "published"].includes(workflow?.status ?? "")) return false;
	if (sources.some(source => source.evidenceProfile?.reviewer?.reviewedById || source.evidenceProfile?.reviewer?.reviewedAt)) return false;
	const actual = researchIntegrityFields(claim, before.topicSlug);
	if (![before, legacyEditorialBaseline(before)].some(baseline => approvedReaderContentMatches(actual, withoutHistory(researchIntegrityFields(seedClaimFields(baseline), before.topicSlug))))) return false;
	return sources.every((source, index) => approvedReaderContentMatches(scientificSources(source), scientificSources(before.sources[index] as unknown as IClaimSource)));
}

export async function publishOwnerEditorialCorrections(signal?: AbortSignal) {
	const proposal = createEditorialAuditProposal({ commit: "0".repeat(40), tree: "0".repeat(40) });
	if (proposal.targets.length !== 5 || proposal.contentSha256 !== APPROVED_EDITORIAL_DATA_SHA256) throw new Error("Owner-approved editorial release definition has changed.");
	const result = { published: 0, preserved: 0, conflicts: 0, failed: 0 };
	signal?.throwIfAborted();
	const hello = await mongoose.connection.db!.admin().command({ hello: 1 });
	if (!hello.setName && hello.msg !== "isdbgrid") throw new Error("Owner content corrections require atomic transaction support; no content was changed.");
	await ContentRelease.init();
	for (const target of proposal.targets) {
		if (signal?.aborted) break;
		const session = await mongoose.startSession();
		try {
			const outcome = await session.withTransaction(async () => {
				signal?.throwIfAborted();
				const receiptId = `${OWNER_EDITORIAL_RELEASE}:${target.key}`;
				const receipt = await ContentRelease.findById(receiptId).session(session).lean();
				if (receipt) {
					if (receipt.contentHash !== proposal.contentSha256) throw new Error("Immutable owner content release differs from its receipt.");
					return "preserved" as const;
				}
				const before = claimsBeforeIntegrityCorrections.find(claim => `${claim.topicSlug}/${claim.slug}` === target.key)!;
				const topic = await Topic.findOne({ slug: before.topicSlug }).session(session).lean();
				if (!topic) return "conflicts" as const;
				const claim = await Claim.findOne({ topic: topic._id, slug: before.slug }).session(session).lean();
				if (!claim) return "conflicts" as const;
				const sources = await ClaimSource.find({ claim: claim._id }).sort({ order: 1, _id: 1 }).session(session).lean();
				if (!ownerCorrectionMatches(claim, sources, before)) return "conflicts" as const;
				const after = refreshEditorialAuditClaim(researchIntegrityFields(before, before.topicSlug));
				const proposed = seedClaimFields(after);
				const patch = Object.fromEntries(target.changedFields.filter(field => !preservedClaimFields.has(field)).map(field => [field, proposed[field as keyof typeof proposed]]));
				for (const [index, source] of after.sources.entries()) {
					const fields = scientificSources(source as unknown as IClaimSource);
					if (sources[index]) {
						await ClaimSource.updateOne({ _id: sources[index]!._id }, { $set: fields, $inc: { __v: 1 } }, { session, runValidators: true });
					}
					else {
						await new ClaimSource({ ...fields, claim: claim._id }).save({ session });
					}
				}
				const appliedAt = new Date();
				const history = after.changeLog.slice(before.changeLog.length);
				const summary = history.at(-1)!.summary;
				await Claim.updateOne({ _id: claim._id }, {
					$set: patch,
					$push: {
						changeLog: { $each: history },
						readerUpdates: { $each: [{ id: randomUUID(), date: appliedAt, kind: "correction", bottomLineImpact: target.changedFields.includes("evidenceCertainty") ? "changed" : "unchanged", summary }], $position: 0 }
					},
					$inc: { __v: 1 }
				}, { session, runValidators: true });
				const saved = await Claim.findById(claim._id).session(session).lean();
				const savedSources = await ClaimSource.find({ claim: claim._id }).sort({ order: 1, _id: 1 }).session(session).lean();
				if (!saved || !getPublicClaimReadiness(saved, summarizeClaimSourceReadiness(savedSources)).isReady) throw new Error("Owner correction is not publicly ready.");
				await new ContentRelease({
					_id: receiptId,
					releaseId: OWNER_EDITORIAL_RELEASE,
					contentHash: proposal.contentSha256,
					key: target.key,
					actorType: "system",
					approvalBasis: "owner_content_first",
					appliedAt,
					before: { claim, sources },
					after: { claim: saved, sources: savedSources }
				}).save({ session });
				return "published" as const;
			}, { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" }, readPreference: "primary", maxCommitTimeMS: 10_000, timeoutMS: 30_000 });
			if (outcome) result[outcome]++;
		}
		catch { result.failed++; }
		finally { await session.endSession(); }
	}
	return result;
}
