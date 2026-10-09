import type { SeedClaim } from "../data/claims.js";
import { randomUUID } from "node:crypto";
import mongoose from "mongoose";
import { readerExpansionClaims } from "../data/claim-expansion-reader.js";
import { defaultClaims } from "../data/claims.js";
import { seedClaimFields, seedReviewDates } from "../data/seedClaims.js";
import { defaultTopics } from "../data/topics.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimRevision } from "../models/schemas/ClaimRevision.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { CoverageRequest } from "../models/schemas/CoverageRequest.js";
import { SourcePublication } from "../models/schemas/SourcePublication.js";
import { Topic } from "../models/schemas/Topic.js";
import { normalizeHttpUrl } from "./accountValidation.js";
import { normalizeClaimNarratives } from "./claimNarratives.js";
import { getPublicClaimReadiness, summarizeClaimSourceReadiness } from "./publicClaimReadiness.js";
import { createReaderExpansionSourceProposal, readerExpansionValueHash } from "./readerExpansionProposal.js";

export const APPROVED_READER_RELEASE = "reader-expansion-owner-approved-2026-10-09";
export const APPROVED_READER_DATA_SHA256 = "84890c262558a82e837a847cdbdc6af0d398e1a5a6d9b011277510c09f0b80eb";
export const ASSISTANT_PUBLICATION_SUMMARY = "Published after assistant source screening under the owner's content-first policy. Human moderation remains available; independent expert review is not claimed.";

export function approvedReaderDraft(seed: SeedClaim, topicId: mongoose.Types.ObjectId) {
	const canonical = defaultClaims.find(value => value.topicSlug === seed.topicSlug && value.slug === seed.slug);
	if (!canonical) throw new Error("Approved review is missing from the canonical source.");
	return { ...seedClaimFields(canonical), ...seedReviewDates(canonical), topic: topicId, slug: seed.slug, status: "draft" as const, changeLog: [] };
}

function project(actual: unknown, expected: unknown): unknown {
	if (expected instanceof Date) return actual;
	if (Array.isArray(expected)) {
		if (!Array.isArray(actual) || actual.length !== expected.length) throw new Error("Approved content array differs.");
		return expected.map((value, index) => project(actual[index], value));
	}
	if (expected && typeof expected === "object" && !(expected instanceof mongoose.Types.ObjectId)) {
		if (!actual || typeof actual !== "object") throw new Error("Approved content object differs.");
		return Object.fromEntries(Object.entries(expected).map(([key, value]) => [key, project((actual as Record<string, unknown>)[key], value)]));
	}
	return actual;
}

export function approvedReaderContentMatches(actual: unknown, expected: unknown) {
	try {
		return readerExpansionValueHash(project(actual, expected)) === readerExpansionValueHash(expected);
	}
	catch {
		return false;
	}
}

export async function validateApprovedReaderRelease(now = new Date()) {
	if (readerExpansionClaims.length !== 201) throw new Error("The approved release must contain all 201 reviews.");
	const proposal = createReaderExpansionSourceProposal(readerExpansionClaims, defaultClaims, { commit: "0".repeat(40), tree: "0".repeat(40) }, now);
	if (proposal.proposalDataSha256 !== APPROVED_READER_DATA_SHA256) throw new Error("The complete release differs from the owner-approved material.");
	const keys = new Set<string>();
	for (const seed of readerExpansionClaims) {
		const key = `${seed.topicSlug}/${seed.slug}`;
		if (keys.has(key) || !defaultTopics.some(topic => topic.slug === seed.topicSlug)) throw new Error("Approved canonical identity is invalid.");
		keys.add(key);
		const fields = approvedReaderDraft(seed, new mongoose.Types.ObjectId());
		if (!approvedReaderContentMatches(fields, { ...fields, ...normalizeClaimNarratives(fields) })) throw new Error("Approved narratives would change.");
		const claim = new Claim({ ...fields, status: "published", publishedAt: now, changeLog: [{ date: now, kind: "publication", summary: ASSISTANT_PUBLICATION_SUMMARY }] });
		await claim.validate();
		const sources = seed.sources.map(source => new ClaimSource({ ...source, claim: claim._id }));
		for (const source of sources) {
			await source.validate();
			if (source.url) normalizeHttpUrl(source.url, 2000);
		}
		if (!getPublicClaimReadiness(claim.toObject(), summarizeClaimSourceReadiness(sources)).isReady) throw new Error("An approved review is not publicly ready.");
	}
	return { reviews: keys.size, citations: readerExpansionClaims.reduce((total, seed) => total + seed.sources.length, 0) };
}

export async function publishApprovedReaderContent(signal?: AbortSignal) {
	signal?.throwIfAborted();
	await validateApprovedReaderRelease();
	signal?.throwIfAborted();
	await SourcePublication.init();
	const result = { published: 0, preserved: 0, conflicts: 0, failed: 0 };
	for (const seed of readerExpansionClaims) {
		if (signal?.aborted) break;
		try {
			const key = `${seed.topicSlug}/${seed.slug}`;
			let journal = await SourcePublication.findOne({ key }).maxTimeMS(5000);
			if (journal?.state === "published") {
				result.preserved++;
				continue;
			}
			let topic = await Topic.findOne({ slug: seed.topicSlug }).maxTimeMS(5000);
			const existing = topic && await Claim.findOne({ topic: topic._id, slug: seed.slug }).maxTimeMS(5000);
			if (existing && (!journal || !existing._id.equals(journal.claimId))) {
				result.preserved++;
				continue;
			}
			if (!topic) {
				const definition = defaultTopics.find(value => value.slug === seed.topicSlug)!;
				topic = await Topic.findOneAndUpdate({ slug: seed.topicSlug }, { $setOnInsert: definition }, { upsert: true, returnDocument: "after", runValidators: true }).maxTimeMS(5000);
			}
			const fields = approvedReaderDraft(seed, topic!._id);
			const contentHash = readerExpansionValueHash({ fields, sources: seed.sources });
			if (!journal) journal = await SourcePublication.findOneAndUpdate({ key }, { $setOnInsert: { key, releaseId: APPROVED_READER_RELEASE, contentHash, claimId: new mongoose.Types.ObjectId(), sourceIds: seed.sources.map(() => new mongoose.Types.ObjectId()), coverageId: new mongoose.Types.ObjectId(), state: "pending" } }, { upsert: true, returnDocument: "after", runValidators: true }).maxTimeMS(5000);
			if (!journal || journal.releaseId !== APPROVED_READER_RELEASE || journal.contentHash !== contentHash || journal.sourceIds.length !== seed.sources.length) {
				result.conflicts++;
				continue;
			}
			const claim = existing ?? await Claim.findOneAndUpdate({ _id: journal.claimId }, { $setOnInsert: fields }, { upsert: true, returnDocument: "after", runValidators: true }).maxTimeMS(5000);
			if (!claim || !["draft", "published"].includes(claim.status)) {
				result.conflicts++;
				continue;
			}
			if (await ClaimRevision.exists({ claim: claim._id }).maxTimeMS(5000)) {
				result.conflicts++;
				continue;
			}
			const expected = claim.status === "draft" ? fields : Object.fromEntries(Object.entries(fields).filter(([name]) => !["status", "changeLog"].includes(name)));
			if (!approvedReaderContentMatches(claim.toObject(), expected)) {
				result.conflicts++;
				continue;
			}
			if (claim.status === "draft") {
				for (const [index, source] of seed.sources.entries()) await ClaimSource.findOneAndUpdate({ _id: journal.sourceIds[index] }, { $setOnInsert: { ...source, claim: claim._id, createdAt: new Date(), updatedAt: new Date() } }, { upsert: true, returnDocument: "after", runValidators: true, timestamps: false }).maxTimeMS(5000);
			}
			const sources = await ClaimSource.find({ claim: claim._id }).sort({ order: 1, _id: 1 }).maxTimeMS(5000);
			if (sources.length !== seed.sources.length || sources.some((source, index) => !source._id.equals(journal!.sourceIds[index]) || !approvedReaderContentMatches(source.toObject(), { ...seed.sources[index], claim: claim._id }))) {
				result.conflicts++;
				continue;
			}
			if (claim.status === "draft") {
				claim.status = "published";
				claim.publishedAt = new Date();
				claim.changeLog = [{ date: claim.publishedAt, kind: "publication", summary: ASSISTANT_PUBLICATION_SUMMARY }];
				if (!getPublicClaimReadiness(claim.toObject(), summarizeClaimSourceReadiness(sources)).isReady) {
					result.conflicts++;
					continue;
				}
				await claim.save();
			}
			if (!getPublicClaimReadiness(claim.toObject(), summarizeClaimSourceReadiness(sources)).isReady) {
				result.conflicts++;
				continue;
			}
			await CoverageRequest.findOneAndUpdate({ _id: journal.coverageId }, { $setOnInsert: { title: seed.title, summary: "Selected through the site's coverage audit, not submitted as a reader request. This assistant-screened evidence summary is available now and remains open to human moderation and corrections.", status: "published", visibility: "public", topicId: topic!._id, claimId: claim._id, publicUpdatedAt: claim.publishedAt, publicHistory: [{ id: randomUUID(), date: claim.publishedAt, status: "published", summary: ASSISTANT_PUBLICATION_SUMMARY }], createdAt: new Date(), updatedAt: new Date() } }, { upsert: true, runValidators: true, timestamps: false }).maxTimeMS(5000);
			await SourcePublication.updateOne({ _id: journal._id, state: "pending" }, { $set: { state: "published", publishedAt: claim.publishedAt } }).maxTimeMS(5000);
			result.published++;
		}
		catch {
			result.failed++;
		}
	}
	return result;
}
