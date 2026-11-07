import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CATALOG_ENTRY_GOAL, catalogExpansionClaims, catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberCommonReaderClaims, novemberCommonReaderResearchCheckedAt } from "../src/data/claim-expansion-2026-11-common-reader.js";
import { novemberEverydayHealthEnvironmentClaims, novemberEverydayHealthEnvironmentResearchCheckedAt } from "../src/data/claim-expansion-2026-11-everyday-health-environment.js";
import { novemberHouseholdEnergyClaims, novemberHouseholdEnergyResearchCheckedAt } from "../src/data/claim-expansion-2026-11-household-energy.js";
import { novemberLearningHabitsWorkClaims, novemberLearningHabitsWorkResearchCheckedAt } from "../src/data/claim-expansion-2026-11-learning-habits-work.js";
import { novemberLearningClaims } from "../src/data/claim-expansion-2026-11-learning.js";
import { novemberResearchCheckedAt, researchSource } from "../src/data/claim-expansion-2026-11-shared.js";
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
		assert.equal(novemberHouseholdEnergyClaims.length, 13);
		assert.equal(novemberCommonReaderClaims.length, 16);
		assert.equal(novemberEverydayHealthEnvironmentClaims.length, 14);
		assert.equal(catalogExpansionClaims.length, 103);
		assert.equal(defaultClaims.length, 1104);
		assert.deepEqual(defaultClaims.slice(0, legacyDefaultClaims.length), legacyDefaultClaims);
		assert.deepEqual(await validateCatalogExpansion(), {
			entries: 103,
			citations: 244,
			catalog: 1104,
			target: 1501
		});
		assert.deepEqual(await validateApprovedReaderRelease(), { reviews: 201, citations: 461 });
	});
	it("seals distinct everyday health and environment questions and their checked sources", () => {
		assert.equal(readerExpansionValueHash(novemberEverydayHealthEnvironmentClaims), "1466a07509ff63a35b6810870fd7ce4e8e09eb17a67d6d2f20ae9d248fe20aa3");
		assert.notEqual(novemberEverydayHealthEnvironmentResearchCheckedAt, novemberCommonReaderResearchCheckedAt);
		assert.ok(novemberEverydayHealthEnvironmentClaims.every(claim => claim.searchCutoffAt === novemberEverydayHealthEnvironmentResearchCheckedAt));
		assert.equal(new Set(novemberEverydayHealthEnvironmentClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 14);
		const citations = novemberEverydayHealthEnvironmentClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 33);
		assert.equal(new Set(citations.filter(source => source.doi).map(source => source.doi)).size, 32);
		assert.equal(citations.some(source => source.doi === "10.1016/j.buildenv.2021.107750"), false);
		assert.equal(citations.some(source => source.doi === "10.1093/nutrit/nuac111"), false);
		assert.equal(citations.some(source => source.doi === "10.1093/nutrit/nuac108"), false);
	});
	it("retains creatine's correction and separate statistical criticism", () => {
		const claim = novemberEverydayHealthEnvironmentClaims.find(claim => claim.slug === "does-creatine-improve-memory-and-thinking")!;
		const synthesis = claim.sources.find(source => source.doi === "10.3389/fnut.2024.1424972")!;
		assert.equal(synthesis.citationStatus, "corrected");
		assert.ok(synthesis.statusSources?.includes("https://doi.org/10.3389/fnut.2025.1570800"));
		assert.match(synthesis.note!, /scores from completion times/u);
		assert.match(claim.stableCore.join(" "), /independent/u);
		assert.ok(claim.sources.some(source => source.doi === "10.2903/j.efsa.2024.9100"));
		assert.equal(claim.consensusBand, "mixed");
	});
	it("separates COSMOS samples and cognitive scores from dementia prevention", () => {
		const claim = novemberEverydayHealthEnvironmentClaims.find(claim => claim.slug === "do-multivitamins-improve-memory-in-older-adults")!;
		assert.match(claim.sources.find(source => source.doi === "10.1016/j.ajcnut.2023.12.011")!.note!, /5,203 nonoverlapping/u);
		assert.match(claim.sources.find(source => source.doi === "10.1016/j.ajcnut.2023.05.011")!.note!, /3,562/u);
		assert.match(claim.bottomLine, /do not establish.*prevent dementia/u);
		assert.match(claim.stableCore.join(" "), /same parent trial/u);
	});
	it("preserves intervention, subgroup and individual-agreement limits", () => {
		const claim = (slug: string) => novemberEverydayHealthEnvironmentClaims.find(claim => claim.slug === slug)!;
		assert.match(claim("do-standing-desks-reduce-lower-back-pain").stableCore.join(" "), /no significant time-by-group interaction/u);
		assert.match(claim("do-earplugs-and-eye-masks-improve-sleep-in-intensive-care").bottomLine, /earplugs alone is less clear/u);
		assert.match(claim("how-accurately-do-smart-scales-measure-body-fat").misconceptions.join(" "), /correlation/u);
		assert.match(claim("do-collagen-supplements-improve-aging-skin").stableCore.join(" "), /higher-quality and non-industry-funded/u);
		assert.match(claim("does-tart-cherry-help-people-sleep-better").sources[0].note!, /two small trials/u);
		assert.match(claim("do-omega-3-supplements-help-with-depression").bottomLine, /not reliably prevented new depression/u);
	});
	it("keeps official ionizer guidance dated by its check instead of inventing publication metadata", () => {
		const claim = novemberEverydayHealthEnvironmentClaims.find(claim => claim.slug === "can-ionizing-air-cleaners-produce-harmful-byproducts")!;
		const official = claim.sources.find(source => source.publisher === "US Environmental Protection Agency")!;
		assert.equal(Object.hasOwn(official, "year"), false);
		assert.equal(official.citationCheckedAt, novemberEverydayHealthEnvironmentResearchCheckedAt);
		assert.equal(official.url, "https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-hvac-filters-and-respiratory-viruses");
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
	it("seals the household-energy cohort with specific scopes and verified journal dates", () => {
		assert.equal(readerExpansionValueHash(novemberHouseholdEnergyClaims), "07fa9ed9bd72d5c312d84f51a5154d72094bd481c504230deb2dcd1b1afe8352");
		assert.notEqual(novemberHouseholdEnergyResearchCheckedAt, novemberTransportHousingResearchCheckedAt);
		assert.ok(novemberHouseholdEnergyClaims.every(claim => claim.topicSlug === "energy-and-infrastructure" && claim.searchCutoffAt === novemberHouseholdEnergyResearchCheckedAt));
		assert.equal(new Set(novemberHouseholdEnergyClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 13);
		const citations = novemberHouseholdEnergyClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 30);
		assert.equal(new Set(citations.map(source => source.doi)).size, 27);
		for (const [doi, year] of [
			["10.1111/sjoe.12422", 2021],
			["10.1016/j.enbuild.2024.115161", 2025],
			["10.1016/j.enbuild.2021.111572", 2022],
			["10.1016/j.jeem.2023.102901", 2024],
			["10.1111/jiec.13344", 2023]
		] as const) assert.equal(citations.find(source => source.doi === doi)?.year, year);
		for (const doi of ["10.3386/w14429", "10.1016/j.rineng.2026.112105", "10.11648/j.ajee.20210901.11"]) {
			assert.equal(citations.some(source => source.doi === doi), false);
		}
		assert.ok(citations.every(source => !/automated takeaway|this page|earlier draft/u.test(source.note!)));
	});
	it("distinguishes monitor offers, installation-adjusted effects and matched heating comparisons", () => {
		const feedback = novemberHouseholdEnergyClaims.find(claim => claim.slug === "do-home-energy-feedback-displays-reduce-energy-use")!;
		assert.match(feedback.stableCore.join(" "), /4\.7%.*offering.*5\.8%/u);
		assert.match(feedback.sources[0].note!, /prevented fully randomized assignment/u);
		assert.match(feedback.exclusionRules!.join(" "), /offer effects.*installation-adjusted/u);
		const zonal = novemberHouseholdEnergyClaims.find(claim => claim.slug === "do-room-by-room-heating-controls-save-energy")!;
		assert.match(zonal.stableCore.join(" "), /68 homes.*37.*3\.5%.*matched/u);
		assert.match(zonal.misconceptions.join(" "), /across the intervention group.*not.*two-thirds/u);
		const social = novemberHouseholdEnergyClaims.find(claim => claim.slug === "do-neighbor-comparisons-reduce-household-electricity-use")!;
		assert.match(social.stableCore.join(" "), /6\.7%.*not persistent.*no overall reduction in water/u);
	});
	it("preserves energy denominators and measurement limits in engineering findings", () => {
		const core = (slug: string) => novemberHouseholdEnergyClaims.find(claim => claim.slug === slug)!.stableCore.join(" ");
		assert.match(core("do-solar-panels-lose-output-as-they-age"), /median rates around 0\.5%-0\.6%.*mean rates around 0\.8%-0\.9%/u);
		assert.match(core("does-daylight-saving-time-reduce-electricity-use"), /0\.34%.*during days/u);
		assert.match(core("do-time-of-use-electricity-prices-reduce-peak-demand"), /9%.*1%-2%.*conservative/u);
		assert.match(core("does-home-battery-storage-reduce-greenhouse-gas-emissions"), /modeled 162 households/u);
		assert.match(core("can-shading-and-night-ventilation-reduce-home-overheating"), /daytime conditions over 20 days.*does not directly establish overnight/u);
		assert.match(core("do-led-bulbs-use-less-electricity-than-incandescent-bulbs"), /8\.5 W.*800 lumens.*60 W.*840 lumens/u);
		assert.match(core("does-induction-cooking-use-less-energy-than-other-cooktops"), /ten percentage points.*simmering.*unclear/iu);
	});
	it("keeps heterogeneous household-energy answers qualified", () => {
		const mixed = novemberHouseholdEnergyClaims.filter(claim => claim.consensusBand === "mixed");
		assert.equal(mixed.length, 5);
		for (const claim of mixed) {
			assert.equal(claim.agreementLevel, "divided");
			assert.equal(claim.evidenceSummaries![0].effectDirection, "mixed");
			assert.ok(claim.uncertaintySummary && claim.exclusionRules?.length === 1);
		}
		assert.ok(novemberHouseholdEnergyClaims.every(claim => !/this update|earlier page|seeded|prototype/iu.test(claim.editorSummary!)));
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
	it("seals distinct common-reader questions, scopes and evidence directions", () => {
		assert.equal(readerExpansionValueHash(novemberCommonReaderClaims), "72fd21a53492d7693eec00ac1112cd997099b07fbaa0f437ef05effb65440e3d");
		assert.notEqual(novemberCommonReaderResearchCheckedAt, novemberHouseholdEnergyResearchCheckedAt);
		assert.ok(novemberCommonReaderClaims.every(claim => claim.searchCutoffAt === novemberCommonReaderResearchCheckedAt));
		assert.equal(new Set(novemberCommonReaderClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 16);
		assert.equal(novemberCommonReaderClaims.filter(claim => claim.consensusBand === "mixed").length, 7);
		assert.equal(novemberCommonReaderClaims.filter(claim => claim.consensusBand === "unclear").length, 1);
		assert.equal(novemberCommonReaderClaims.some(claim => /smaller classes|school uniforms/u.test(claim.title)), false);
		const citations = novemberCommonReaderClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 46);
		assert.equal(new Set(citations.filter(source => source.doi).map(source => source.doi)).size, 40);
		assert.ok(citations.every(source => !/fetched discovery|earlier draft|this update|this page/u.test(source.note!)));
	});
	it("retains correction notices and canonical journal metadata", () => {
		const citations = novemberCommonReaderClaims.flatMap(claim => claim.sources);
		const coffee = citations.find(source => source.doi === "10.1136/bmj.j5024")!;
		assert.equal(coffee.citationStatus, "corrected");
		assert.ok(coffee.statusSources?.includes("https://doi.org/10.1136/bmj.k194"));
		assert.match(coffee.note!, /0\.79-0\.88/u);
		for (const [doi, year] of [
			["10.1001/jamapediatrics.2014.1893", 2015],
			["10.1037/amp0000364", 2019],
			["10.1177/21677026231186625", 2024],
			["10.1257/aeri.20190536", 2021]
		] as const) assert.equal(citations.find(source => source.doi === doi)?.year, year);
		assert.equal(citations.some(source => source.doi === "10.3386/w26396"), false);
		assert.equal(citations.find(source => source.doi === "10.1037/a0032734")?.title, "Predicting ethnic and racial discrimination: A meta-analysis of IAT criterion studies.");
		assert.match(citations.find(source => source.doi === "10.1016/j.rser.2026.117333")!.note!, /August 12, 2026/u);
	});
	it("omits unknown publication years without changing dated sources", () => {
		const source = researchSource("Undated reference", "Reference publisher", undefined, "https://example.test/reference", "", "Reference context.");
		assert.equal(Object.hasOwn(source, "year"), false);
		const safety = novemberCommonReaderClaims.flatMap(claim => claim.sources).find(source => source.publisher === "British Heart Foundation")!;
		assert.equal(Object.hasOwn(safety, "year"), false);
		assert.equal(safety.citationCheckedAt, novemberCommonReaderResearchCheckedAt);
		assert.equal(readerExpansionValueHash(novemberHouseholdEnergyClaims), "07fa9ed9bd72d5c312d84f51a5154d72094bd481c504230deb2dcd1b1afe8352");
	});
	it("separates family comparisons, surveillance samples and agency positions", () => {
		const pregnancy = novemberCommonReaderClaims.find(claim => claim.slug === "does-acetaminophen-use-during-pregnancy-cause-autism")!;
		const sibling = pregnancy.sources.find(source => source.doi === "10.1001/jamainternmed.2026.2215")!;
		assert.equal(sibling.kind, "landmark_study");
		assert.match(sibling.note!, /124,333.*97,285/u);
		assert.match(pregnancy.exclusionRules!.join(" "), /overlapping reviews/u);
		assert.ok(pregnancy.sources.some(source => source.doi === "10.1186/s12940-025-01208-0" && source.stance === "debate"));
		assert.ok(pregnancy.sources.some(source => source.publisher === "U.S. Food and Drug Administration" && source.stance === "debate"));
		assert.ok(pregnancy.sources.some(source => source.publisher === "European Medicines Agency" && source.year === 2026));
		const prevalence = novemberCommonReaderClaims.find(claim => claim.slug === "why-are-more-children-being-identified-as-autistic")!;
		assert.match(prevalence.stableCore.join(" "), /2022 records.*not nationally representative/u);
		assert.match(prevalence.sources.find(source => source.doi === "10.1001/jamapediatrics.2014.1893")!.note!, /33%-87%/u);
	});
	it("distinguishes endpoints, exposure measurement and individual predictions", () => {
		const sauna = novemberCommonReaderClaims.find(claim => claim.slug === "does-regular-sauna-use-prevent-heart-related-deaths")!;
		assert.match(sauna.sources[0].note!, /not sauna alone/u);
		assert.match(sauna.exclusionRules!.join(" "), /short-term blood-pressure.*sauna alone/u);
		const screen = novemberCommonReaderClaims.find(claim => claim.slug === "how-does-childhood-screen-use-relate-to-language-development")!;
		assert.match(screen.sources.find(source => source.doi === "10.1001/jamapediatrics.2024.2620")!.note!, /64 observational.*not a language-only sample/u);
		const sitting = novemberCommonReaderClaims.find(claim => claim.slug === "is-more-sitting-linked-to-a-higher-risk-of-early-death")!;
		assert.match(sitting.exclusionRules!.join(" "), /hip-device inactivity.*exact sitting posture/u);
		const iat = novemberCommonReaderClaims.find(claim => claim.slug === "can-an-implicit-association-test-predict-individual-behavior")!;
		assert.match(iat.sources[0].note!, /regression coefficient.*not the overall correlation/u);
		const cold = novemberCommonReaderClaims.find(claim => claim.slug === "do-cold-plunges-improve-mental-wellbeing")!;
		assert.equal(cold.evidenceSummaries![0].effectDirection, "unclear");
		assert.match(cold.stableCore.join(" "), /cold shock/u);
	});
	it("honors shutdown before validation or database work", async () => {
		const controller = new AbortController();
		controller.abort();
		await assert.rejects(publishCatalogExpansion(controller.signal), { name: "AbortError" });
	});
});
