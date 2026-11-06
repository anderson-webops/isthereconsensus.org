import type { SeedClaim } from "../data/claims.js";
import mongoose from "mongoose";
import { CATALOG_ENTRY_GOAL, catalogExpansionReleases } from "../data/catalogExpansion.js";
import { defaultClaims } from "../data/claims.js";
import { defaultTopics } from "../data/topics.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { CoverageRequest } from "../models/schemas/CoverageRequest.js";
import { SourcePublication } from "../models/schemas/SourcePublication.js";
import { normalizeHttpUrl } from "./accountValidation.js";
import { approvedReaderContentMatches, approvedReaderDraft, ASSISTANT_PUBLICATION_SUMMARY, publishApprovedSourceClaim } from "./approvedReaderPublication.js";
import { normalizeClaimNarratives } from "./claimNarratives.js";
import { getPublicClaimReadiness, summarizeClaimSourceReadiness } from "./publicClaimReadiness.js";
import { readerExpansionValueHash } from "./readerExpansionProposal.js";

async function validateExpansionEntry(seed: SeedClaim, additions: Set<string>) {
	const key = `${seed.topicSlug}/${seed.slug}`;
	if (additions.has(key) || !defaultTopics.some(topic => topic.slug === seed.topicSlug)) throw new Error("Expansion topics and paths must be valid and unique.");
	additions.add(key);
	const canonical = defaultClaims.find(claim => claim.topicSlug === seed.topicSlug && claim.slug === seed.slug);
	if (readerExpansionValueHash(canonical) !== readerExpansionValueHash(seed)) throw new Error("Canonical content differs from its self-reviewed definition.");
	const fields = approvedReaderDraft(seed, new mongoose.Types.ObjectId());
	if (!approvedReaderContentMatches(fields, {
		...fields,
		...normalizeClaimNarratives(fields)
	})) {
		throw new Error("Expansion narratives would change during storage.");
	}
	const now = new Date();
	const claim = new Claim({
		...fields,
		status: "published",
		publishedAt: now,
		changeLog: [
			{ date: now, kind: "publication", summary: ASSISTANT_PUBLICATION_SUMMARY }
		]
	});
	await claim.validate();
	await new CoverageRequest({
		title: claim.title,
		summary: claim.editorSummary,
		status: "published",
		visibility: "public",
		topicId: claim.topic,
		claimId: claim._id
	}).validate();
	const sources = seed.sources.map(source => new ClaimSource({ ...source, claim: claim._id }));
	for (const source of sources) {
		await source.validate();
		if (source.url) normalizeHttpUrl(source.url, 2000);
		for (const statusSource of source.statusSources ?? []) normalizeHttpUrl(statusSource, 2000);
	}
	const readiness = getPublicClaimReadiness(claim.toObject(), summarizeClaimSourceReadiness(sources));
	if (!readiness.isReady) throw new Error(`Expansion ${key} is not publicly ready: ${readiness.missing.join(", ")}.`);
	return sources.length;
}

export async function validateCatalogExpansion() {
	const identities = new Set(defaultClaims.map(claim => `${claim.topicSlug}/${claim.slug}`));
	if (identities.size !== defaultClaims.length) throw new Error("Catalog paths must be unique.");
	const releaseIds = new Set<string>();
	const additions = new Set<string>();
	let citations = 0;
	for (const release of catalogExpansionReleases) {
		if (!release.id || releaseIds.has(release.id) || !release.claims.length) throw new Error("Expansion releases need unique identities and content.");
		releaseIds.add(release.id);
		if (readerExpansionValueHash(release.claims) !== release.dataSha256) throw new Error("Expansion content differs from its self-reviewed source seal.");
		for (const seed of release.claims) citations += await validateExpansionEntry(seed, additions);
	}
	return {
		entries: additions.size,
		citations,
		catalog: defaultClaims.length,
		target: CATALOG_ENTRY_GOAL
	};
}

export async function publishCatalogExpansion(signal?: AbortSignal) {
	signal?.throwIfAborted();
	await validateCatalogExpansion();
	signal?.throwIfAborted();
	await SourcePublication.init();
	const result = {
		published: 0,
		preserved: 0,
		conflicts: 0,
		failed: 0
	};
	const queue = catalogExpansionReleases.flatMap(release => release.claims.map(seed => ({ seed, releaseId: release.id })));
	for (const { seed, releaseId } of queue) {
		if (signal?.aborted) break;
		try {
			result[await publishApprovedSourceClaim(seed, releaseId)]++;
		}
		catch {
			result.failed++;
		}
	}
	return result;
}
