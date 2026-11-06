import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CATALOG_ENTRY_GOAL, catalogExpansionClaims, catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberLearningClaims } from "../src/data/claim-expansion-2026-11-learning.js";
import { novemberResearchCheckedAt } from "../src/data/claim-expansion-2026-11-shared.js";
import { novemberUrbanClaims, novemberUrbanResearchCheckedAt } from "../src/data/claim-expansion-2026-11-urban.js";
import { defaultClaims, legacyDefaultClaims } from "../src/data/claims.js";
import { SourcePublication } from "../src/models/schemas/SourcePublication.js";
import { validateApprovedReaderRelease } from "../src/utils/approvedReaderPublication.js";
import { publishCatalogExpansion, validateCatalogExpansion } from "../src/utils/catalogExpansionPublication.js";
import { readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";

describe("self-reviewed expansion toward 1501 canonical reviews", () => {
	it("adds distinct reviewed cohorts and retains the complete legacy catalog", async () => {
		assert.equal(CATALOG_ENTRY_GOAL, 1501);
		assert.equal(legacyDefaultClaims.length, 1001);
		assert.equal(novemberLearningClaims.length, 8);
		assert.equal(novemberUrbanClaims.length, 10);
		assert.equal(catalogExpansionClaims.length, 18);
		assert.equal(defaultClaims.length, 1019);
		assert.deepEqual(defaultClaims.slice(0, legacyDefaultClaims.length), legacyDefaultClaims);
		assert.deepEqual(await validateCatalogExpansion(), {
			entries: 18,
			citations: 45,
			catalog: 1019,
			target: 1501
		});
		assert.deepEqual(await validateApprovedReaderRelease(), { reviews: 201, citations: 461 });
	});
	it("keeps the learning seal unchanged while recording a separately dated urban review", () => {
		assert.equal(readerExpansionValueHash(novemberLearningClaims), "4ee54e7752ad58b5f24cbb97631a90c59f61e1c377871bf9793670894172bfb1");
		assert.equal(readerExpansionValueHash(novemberUrbanClaims), "4d6522389f71888a8d64978cf0432b1be8a8868af293e7a781f3a67557f55b48");
		for (const claim of novemberLearningClaims) {
			assert.equal(claim.topicSlug, "education-and-learning");
			assert.equal(claim.searchCutoffAt, novemberResearchCheckedAt);
		}
		for (const claim of novemberUrbanClaims) {
			assert.ok(["climate-and-environment", "energy-and-infrastructure"].includes(claim.topicSlug));
			assert.equal(claim.searchCutoffAt, novemberUrbanResearchCheckedAt);
		}
		assert.notEqual(novemberUrbanResearchCheckedAt, novemberResearchCheckedAt);
	});
	it("records scoped evidence and honest review provenance on every new article", () => {
		for (const claim of catalogExpansionClaims) {
			assert.equal(claim.status, "draft");
			assert.match(claim.reviewerLine!, /independent expert review not completed/u);
			assert.match(claim.appraisalTools!.join(" "), /no formal GRADE/u);
			assert.ok(claim.stableCore.length >= 2 && claim.openQuestions.length >= 2);
			assert.ok(claim.evidenceSummaries!.length && claim.inclusionRules!.length);
			assert.ok(claim.searchCutoffAt && Number.isFinite(Date.parse(claim.searchCutoffAt)));
			assert.ok(claim.changeLog);
			assert.equal(claim.changeLog.some(entry => entry.kind === "publication"), false);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised" && source.citationCheckedAt === claim.searchCutoffAt));
			assert.equal(new Set(claim.sources.map(source => source.doi || source.url)).size, claim.sources.length);
		}
		assert.ok(catalogExpansionClaims.some(claim => claim.consensusBand === "mixed"));
	});
	it("keeps the publication target separate from source inventory and moderation headroom", async () => {
		const originalLength = defaultClaims.length;
		try {
			defaultClaims.push(...Array.from({ length: CATALOG_ENTRY_GOAL - originalLength + 1 }, (_, index) => ({ ...defaultClaims[0], slug: `archived-inventory-fixture-${index}` })));
			const report = await validateCatalogExpansion();
			assert.equal(report.catalog, CATALOG_ENTRY_GOAL + 1);
			assert.equal(report.target, 1501);
			assert.equal(report.entries, catalogExpansionClaims.length);
		}
		finally {
			defaultClaims.splice(originalLength);
		}
	});
	it("rejects edited definitions before database work", async (context) => {
		const release = catalogExpansionReleases[0];
		const original = release.claims[0].title;
		const database = context.mock.method(SourcePublication, "init", async () => {
			throw new Error("Unexpected database call");
		});
		try {
			release.claims[0].title = "Changed after self-review";
			await assert.rejects(publishCatalogExpansion(), /self-reviewed source seal/u);
			assert.equal(database.mock.callCount(), 0);
		}
		finally {
			release.claims[0].title = original;
		}
	});
	it("rejects independent canonical edits even when the raw source seal still matches", async () => {
		const seed = catalogExpansionClaims[0];
		const canonical = defaultClaims.find(claim => claim.slug === seed.slug && claim.topicSlug === seed.topicSlug)!;
		const original = canonical.bottomLine;
		try {
			canonical.bottomLine = "A different conclusion";
			await assert.rejects(validateCatalogExpansion(), /Canonical content differs/u);
		}
		finally {
			canonical.bottomLine = original;
		}
	});
	it("rejects duplicate canonical paths", async () => {
		defaultClaims.push(defaultClaims[0]);
		try {
			await assert.rejects(validateCatalogExpansion(), /paths must be unique/u);
		}
		finally {
			defaultClaims.pop();
		}
	});
	it("validates new citation provenance URLs without allowing legacy labels in new content", async () => {
		const release = catalogExpansionReleases[0];
		const seed = release.claims[0];
		const canonical = defaultClaims.find(claim => claim.slug === seed.slug)!;
		const originalSources = seed.sources[0].statusSources;
		const canonicalSources = canonical.sources[0].statusSources;
		const originalHash = release.dataSha256;
		try {
			seed.sources[0].statusSources = ["Crossref"];
			canonical.sources[0].statusSources = ["Crossref"];
			release.dataSha256 = readerExpansionValueHash(release.claims);
			await assert.rejects(validateCatalogExpansion(), /URL|url/u);
		}
		finally {
			seed.sources[0].statusSources = originalSources;
			canonical.sources[0].statusSources = canonicalSources;
			release.dataSha256 = originalHash;
		}
	});
	it("honors shutdown before validation or database work", async () => {
		const controller = new AbortController();
		controller.abort();
		await assert.rejects(publishCatalogExpansion(controller.signal), { name: "AbortError" });
	});
});
