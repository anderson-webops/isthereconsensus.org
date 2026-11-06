import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CATALOG_ENTRY_GOAL, catalogExpansionClaims, catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberLearningHabitsWorkClaims, novemberLearningHabitsWorkResearchCheckedAt } from "../src/data/claim-expansion-2026-11-learning-habits-work.js";
import { novemberLearningClaims } from "../src/data/claim-expansion-2026-11-learning.js";
import { novemberResearchCheckedAt } from "../src/data/claim-expansion-2026-11-shared.js";
import { novemberTransportHousingClaims, novemberTransportHousingResearchCheckedAt } from "../src/data/claim-expansion-2026-11-transport-housing.js";
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
		assert.equal(novemberLearningHabitsWorkClaims.length, 24);
		assert.equal(novemberTransportHousingClaims.length, 18);
		assert.equal(catalogExpansionClaims.length, 60);
		assert.equal(defaultClaims.length, 1061);
		assert.deepEqual(defaultClaims.slice(0, legacyDefaultClaims.length), legacyDefaultClaims);
		assert.deepEqual(await validateCatalogExpansion(), {
			entries: 60,
			citations: 135,
			catalog: 1061,
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
	it("seals the learning, habits and work cohort with its own source-check date", () => {
		assert.equal(readerExpansionValueHash(novemberLearningHabitsWorkClaims), "f420839700734714998cb591385fc97ddc6c8e02f4f24805722a9724ee889130");
		assert.notEqual(novemberLearningHabitsWorkResearchCheckedAt, novemberResearchCheckedAt);
		assert.notEqual(novemberLearningHabitsWorkResearchCheckedAt, novemberUrbanResearchCheckedAt);
		const topicCounts = new Map<string, number>();
		for (const claim of novemberLearningHabitsWorkClaims) {
			assert.equal(claim.searchCutoffAt, novemberLearningHabitsWorkResearchCheckedAt);
			topicCounts.set(claim.topicSlug, (topicCounts.get(claim.topicSlug) ?? 0) + 1);
		}
		assert.equal(topicCounts.get("education-and-learning"), 13);
		assert.equal(topicCounts.get("neuroscience-and-psychology"), 7);
		assert.equal(topicCounts.get("economics-and-social-policy"), 4);
		const citations = novemberLearningHabitsWorkClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 50);
		assert.equal(new Set(citations.map(source => source.doi)).size, 50);
		assert.equal(new Set(novemberLearningHabitsWorkClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 24);
		assert.ok(novemberLearningHabitsWorkClaims.every(claim => claim.exclusionRules?.length === 1 && !claim.exclusionRules[0].includes("percentage of expert agreement")));
		assert.equal(citations.find(source => source.doi === "10.1037/0033-2909.125.6.627")?.year, 1999);
		assert.equal(citations.find(source => source.doi === "10.1007/bf03392017")?.year, 2001);
		assert.ok(citations.some(source => source.doi === "10.1037/tmb0000123"));
		assert.equal(citations.some(source => source.doi?.endsWith(".supp")), false);
		assert.equal(citations.some(source => source.doi?.startsWith("10.2139/ssrn")), false);
	});
	it("preserves conflicting findings and distinguishes uncertain training effects from agreement", () => {
		for (const slug of [
			"does-background-music-help-people-study",
			"does-a-nearby-unused-smartphone-impair-thinking",
			"does-faster-video-playback-affect-learning",
			"how-do-rewards-affect-intrinsic-motivation",
			"how-does-hybrid-work-affect-employee-performance"
		]) {
			const claim = novemberLearningHabitsWorkClaims.find(entry => entry.slug === slug)!;
			assert.equal(claim.consensusBand, "mixed");
			assert.equal(claim.agreementLevel, "divided");
			assert.equal(claim.evidenceSummaries![0].effectDirection, "mixed");
			assert.ok(claim.sources.some(source => source.stance === "debate"));
		}
		const training = novemberLearningHabitsWorkClaims.find(claim => claim.slug === "does-time-management-training-improve-employee-wellbeing")!;
		assert.equal(training.consensusBand, "unclear");
		assert.equal(training.agreementLevel, "frontier");
		assert.equal(training.evidenceCertainty, "low");
		assert.equal(training.evidenceSummaries![0].effectDirection, "unclear");
		assert.ok(training.confidenceScore < 50);
	});
	it("seals the distinct transport and housing cohort without changing earlier releases", () => {
		assert.equal(readerExpansionValueHash(novemberTransportHousingClaims), "416a2f3253e2fa38b0dc905571142433c9bffb2473a0037f9725be186ec121bd");
		assert.notEqual(novemberTransportHousingResearchCheckedAt, novemberLearningHabitsWorkResearchCheckedAt);
		const citations = novemberTransportHousingClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 40);
		assert.equal(new Set(citations.map(source => source.doi)).size, 40);
		assert.equal(new Set(novemberTransportHousingClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 18);
		assert.ok(novemberTransportHousingClaims.every(claim => claim.searchCutoffAt === novemberTransportHousingResearchCheckedAt));
		assert.equal(novemberTransportHousingClaims.filter(claim => claim.consensusBand === "mixed").length, 5);
		assert.equal(citations.some(source => source.doi?.startsWith("10.48550/arxiv")), false);
		assert.equal(citations.find(source => source.doi === "10.1016/j.jue.2021.103356")?.year, 2021);
		assert.equal(citations.find(source => source.doi === "10.1177/0739456x21990728")?.year, 2024);
		assert.equal(citations.find(source => source.doi === "10.1080/01944363.2025.2563532")?.year, 2026);
		assert.equal(citations.find(source => source.doi === "10.1016/j.cstp.2023.101124")?.year, 2024);
		assert.equal(citations.find(source => source.doi === "10.1016/j.cstp.2024.101340")?.year, 2025);
	});
	it("retains the Tallinn erratum and avoids treating hypothetical travel choices as observed effects", () => {
		const fare = novemberTransportHousingClaims.find(claim => claim.slug === "does-fare-free-public-transport-reduce-car-use")!;
		const corrected = fare.sources.find(source => source.doi === "10.1007/s11116-016-9695-5")!;
		assert.equal(corrected.citationStatus, "corrected");
		assert.ok(corrected.statusSources?.includes("https://doi.org/10.1007/s11116-017-9785-z"));
		assert.match(corrected.note!, /Table 2/u);
		assert.equal(fare.consensusBand, "mixed");
		const cashout = novemberTransportHousingClaims.find(claim => claim.slug === "does-cashing-out-workplace-parking-reduce-solo-driving")!;
		assert.equal(cashout.evidenceCertainty, "low");
		assert.match(cashout.sources.find(source => source.doi === "10.1016/j.tra.2018.04.025")!.note!, /stated-choice.*hypothetical/u);
		assert.match(cashout.stableCore.join(" "), /not measured behavior/u);
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
	it("keeps numerical travel and housing findings tied to their actual comparisons", () => {
		const core = (slug: string) => novemberTransportHousingClaims.find(claim => claim.slug === slug)!.stableCore.join(" ");
		assert.match(core("do-electric-bikes-replace-car-trips"), /controlled comparisons.*2\.4 fewer car kilometers.*follow-up/u);
		assert.match(core("do-short-term-rentals-raise-local-housing-rents"), /Barcelona.*1\.9%.*average neighborhood/u);
		assert.match(core("do-more-walkable-neighborhoods-encourage-walking"), /25th.*75th.*1,100.*three months/u);
		assert.match(core("does-cashing-out-workplace-parking-reduce-solo-driving"), /1,694.*17%.*relative change/u);
		assert.match(core("how-do-low-emission-zones-affect-urban-air-pollution"), /2019 ULEZ.*less than 3%.*no clear overall effect/u);
		const rail = novemberTransportHousingClaims.find(claim => claim.slug === "does-opening-urban-rail-reduce-driving")!;
		assert.match(rail.misconceptions.join(" "), /can include former bus riders as well as former drivers/u);
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
