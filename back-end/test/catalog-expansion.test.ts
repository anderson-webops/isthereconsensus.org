import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CATALOG_ENTRY_GOAL, catalogExpansionClaims, catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberCareLearningClaims, novemberCareLearningResearchCheckedAt } from "../src/data/claim-expansion-2026-11-care-learning.js";
import { novemberCommonReaderClaims, novemberCommonReaderResearchCheckedAt } from "../src/data/claim-expansion-2026-11-common-reader.js";
import { novemberEverydayHealthEnvironmentClaims, novemberEverydayHealthEnvironmentResearchCheckedAt } from "../src/data/claim-expansion-2026-11-everyday-health-environment.js";
import { novemberHouseholdEnergyClaims, novemberHouseholdEnergyResearchCheckedAt } from "../src/data/claim-expansion-2026-11-household-energy.js";
import { novemberLearningHabitsWorkClaims, novemberLearningHabitsWorkResearchCheckedAt } from "../src/data/claim-expansion-2026-11-learning-habits-work.js";
import { novemberLearningClaims } from "../src/data/claim-expansion-2026-11-learning.js";
import { novemberRecoveryPreventionClaims, novemberRecoveryPreventionResearchCheckedAt } from "../src/data/claim-expansion-2026-11-recovery-prevention.js";
import { novemberResearchCheckedAt, researchSource } from "../src/data/claim-expansion-2026-11-shared.js";
import { novemberSocialPolicyClaims, novemberSocialPolicyResearchCheckedAt } from "../src/data/claim-expansion-2026-11-social-policy.js";
import { novemberTransportHousingClaims, novemberTransportHousingResearchCheckedAt } from "../src/data/claim-expansion-2026-11-transport-housing.js";
import { novemberUrbanClaims, novemberUrbanResearchCheckedAt } from "../src/data/claim-expansion-2026-11-urban.js";
import { novemberWomensHealthSupportClaims, novemberWomensHealthSupportResearchCheckedAt } from "../src/data/claim-expansion-2026-11-womens-health-support.js";
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
		assert.equal(novemberSocialPolicyClaims.length, 10);
		assert.equal(novemberCareLearningClaims.length, 20);
		assert.equal(novemberRecoveryPreventionClaims.length, 7);
		assert.equal(novemberWomensHealthSupportClaims.length, 13);
		assert.equal(catalogExpansionClaims.length, 153);
		assert.equal(defaultClaims.length, 1154);
		assert.deepEqual(defaultClaims.slice(0, legacyDefaultClaims.length), legacyDefaultClaims);
		assert.deepEqual(await validateCatalogExpansion(), {
			entries: 153,
			citations: 395,
			catalog: 1154,
			target: 1501
		});
		assert.deepEqual(await validateApprovedReaderRelease(), { reviews: 201, citations: 461 });
	});
	it("seals the recovery and reproductive-health cohorts without changing prior evidence", () => {
		assert.equal(readerExpansionValueHash(novemberRecoveryPreventionClaims), "d77fc79c111ed1e33a90546ed2628e9122dd29f00a091745d371d0eaa5e73373");
		assert.equal(readerExpansionValueHash(novemberWomensHealthSupportClaims), "9631a3d296ce3c94fa4f6927b9c0495ef4d64f7c5de1126454a2a352279d1b0b");
		assert.notEqual(novemberRecoveryPreventionResearchCheckedAt, novemberWomensHealthSupportResearchCheckedAt);
		assert.ok(novemberRecoveryPreventionClaims.every(claim => claim.searchCutoffAt === novemberRecoveryPreventionResearchCheckedAt));
		assert.ok(novemberWomensHealthSupportClaims.every(claim => claim.searchCutoffAt === novemberWomensHealthSupportResearchCheckedAt));
		assert.equal(new Set(novemberRecoveryPreventionClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 7);
		assert.equal(new Set(novemberWomensHealthSupportClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 13);
		const citations = [
			...novemberRecoveryPreventionClaims,
			...novemberWomensHealthSupportClaims
		].flatMap(claim => claim.sources);
		assert.equal(citations.length, 58);
		assert.equal(new Set(citations.map(source => source.doi?.toLowerCase())).size, 58);
	});
	it("uses completed canonical versions and actual journal years rather than discovery labels", () => {
		const sources = [
			...novemberRecoveryPreventionClaims,
			...novemberWomensHealthSupportClaims
		].flatMap(claim => claim.sources);
		const source = (doi: string) => sources.find(entry => entry.doi?.toLowerCase() === doi)!;
		for (const [doi, year] of [
			["10.1002/14651858.cd012880.pub2", 2020],
			["10.1002/14651858.cd000249.pub2", 2018],
			["10.1002/14651858.cd007407.pub4", 2020],
			["10.1002/14651858.cd003766.pub6", 2017],
			["10.1002/14651858.cd013258.pub2", 2023],
			["10.1111/1471-0528.15153", 2019],
			["10.1111/1471-0528.17304", 2023],
			["10.1016/j.dsx.2020.12.030", 2021],
			["10.1016/j.ejogrb.2024.11.040", 2025]
		] as const) assert.equal(source(doi).year, year);
		for (const excluded of [
			"10.1002/14651858.cd013258",
			"10.1002/14651858.cd003766.pub5",
			"10.1002/14651858.cd007407.pub3",
			"10.1002/14651858.cd004307.pub6",
			"10.12688/f1000research.52313.1"
		]) {
			assert.equal(sources.some(entry => entry.doi?.toLowerCase() === excluded), false);
		}
		assert.ok(source("10.3310/hta25460"));
	});
	it("retains the publisher's inline menopause correction even without a registered notice", () => {
		const claim = novemberWomensHealthSupportClaims.find(claim => claim.slug === "can-cbt-make-menopausal-hot-flashes-less-disruptive")!;
		const source = claim.sources.find(source => source.doi === "10.1111/1471-0528.15153")!;
		assert.equal(source.citationStatus, "corrected");
		assert.ok(source.statusSources?.includes("https://obgyn.onlinelibrary.wiley.com/doi/10.1111/1471-0528.15153"));
		assert.match(source.note!, /July 2018 inline correction/u);
		assert.match(claim.bottomLine, /does not necessarily mean.*how often/u);
	});
	it("preserves conflicting trials and separates fall rates from first-fall outcomes", () => {
		const claim = novemberWomensHealthSupportClaims.find(claim => claim.slug === "do-home-hazard-reduction-programs-prevent-falls")!;
		assert.equal(claim.consensusBand, "mixed");
		assert.match(claim.bottomLine, /Fewer repeated falls.*first fall/u);
		assert.match(claim.sources.find(source => source.doi === "10.1001/jamanetworkopen.2021.22044")!.note!, /primary first-fall hazard.*inconclusive.*secondary total-fall rate/u);
		assert.match(claim.sources.find(source => source.doi === "10.3310/hta25460")!.note!, /1,331.*no reduction/u);
		const laser = novemberWomensHealthSupportClaims.find(claim => claim.slug === "does-vaginal-laser-treatment-help-menopause-symptoms")!;
		assert.equal(laser.consensusBand, "mixed");
		assert.ok(laser.sources.some(source => source.stance === "supports"));
		assert.ok(laser.sources.some(source => source.stance === "debate"));
	});
	it("separates clinical process measures, structured treatment and absolute outcomes", () => {
		const claim = (slug: string) => novemberWomensHealthSupportClaims.find(claim => claim.slug === slug)!;
		const diabetes = claim("does-diabetes-self-management-education-improve-blood-sugar");
		assert.match(diabetes.sources.find(source => source.doi === "10.1016/j.dsx.2020.12.030")!.note!, /standardized mean difference.*not an absolute percentage-point/u);
		assert.match(diabetes.sources.find(source => source.doi === "10.1371/journal.pone.0297328")!.note!, /quasi-experimental confidence interval crossed no effect/u);
		const facilitation = claim("does-twelve-step-facilitation-help-alcohol-abstinence");
		assert.match(facilitation.stableCore.join(" "), /Voluntary attendance alone is not the same/u);
		assert.match(facilitation.exclusionRules!.join(" "), /adds no independent trial population/u);
		const pulmonary = claim("does-pulmonary-rehabilitation-help-people-with-copd");
		assert.match(pulmonary.sources.find(source => source.doi === "10.1164/rccm.202306-1066st")!.note!, /pulmonary-hypertension recommendation is conditional, not strong/u);
		assert.match(pulmonary.bottomLine, /does not reverse the disease/u);
		assert.match(claim("does-acupuncture-improve-ivf-live-birth-rates").stableCore.join(" "), /clinical pregnancy is not the same as a live birth/u);
	});
	it("retains clinical eligibility and uncertainty without turning subgroup rankings into prescriptions", () => {
		const prenatal = novemberWomensHealthSupportClaims.find(claim => claim.slug === "does-prenatal-exercise-reduce-gestational-diabetes-risk")!;
		assert.match(prenatal.evidenceSummaries![0].population!, /contraindications/u);
		assert.match(prenatal.exclusionRules!.join(" "), /dose-response curve.*does not prescribe/u);
		const period = novemberWomensHealthSupportClaims.find(claim => claim.slug === "does-exercise-ease-period-pain")!;
		assert.equal(period.evidenceCertainty, "low");
		assert.match(period.exclusionRules!.join(" "), /secondary period pain/u);
		assert.match(period.sources.find(source => source.doi === "10.1186/s40798-024-00718-4")!.note!, /dropout estimate includes no difference/u);
		const bleeding = novemberWomensHealthSupportClaims.find(claim => claim.slug === "does-tranexamic-acid-reduce-heavy-menstrual-bleeding")!;
		assert.match(bleeding.exclusionRules!.join(" "), /personal medication regimen/u);
	});
	it("seals the policy and care cohorts with distinct source-check dates and scopes", () => {
		assert.equal(readerExpansionValueHash(novemberSocialPolicyClaims), "15c9290f7da18174a586c80174c36d46f893d1ee8dd8e82b94d3914d735b4896");
		assert.equal(readerExpansionValueHash(novemberCareLearningClaims), "c46db54ebd176e61558c182e7705e11e82105ed0eb5355a0aef8b26235c8743c");
		assert.notEqual(novemberSocialPolicyResearchCheckedAt, novemberCareLearningResearchCheckedAt);
		for (const [claims, checkedAt, citationCount, mixedCount] of [
			[
				novemberSocialPolicyClaims,
				novemberSocialPolicyResearchCheckedAt,
				34,
				6
			],
			[
				novemberCareLearningClaims,
				novemberCareLearningResearchCheckedAt,
				59,
				11
			]
		] as const) {
			assert.ok(claims.every(claim => claim.searchCutoffAt === checkedAt));
			assert.equal(new Set(claims.map(claim => JSON.stringify(claim.exclusionRules))).size, claims.length);
			const citations = claims.flatMap(claim => claim.sources);
			assert.equal(citations.length, citationCount);
			assert.equal(new Set(citations.map(source => source.doi)).size, citationCount);
			assert.equal(claims.filter(claim => claim.consensusBand === "mixed").length, mixedCount);
		}
	});
	it("retains primary correction notices beyond the provider's registered-update results", () => {
		for (const [claims, doi, correction] of [
			[novemberSocialPolicyClaims, "10.1111/ssqu.70025", "10.1111/ssqu.70044"],
			[novemberSocialPolicyClaims, "10.1001/jamanetworkopen.2024.31612", "10.1001/jamanetworkopen.2024.43755"],
			[novemberCareLearningClaims, "10.1212/wnl.0000000000213334", "10.1212/wnl.0000000000213686"]
		] as const) {
			const source = claims.flatMap(claim => claim.sources).find(source => source.doi === doi)!;
			assert.equal(source.citationStatus, "corrected");
			assert.ok(source.statusSources?.includes(`https://doi.org/${correction}`));
		}
		const oregon = novemberSocialPolicyClaims.find(claim => claim.slug === "did-oregons-drug-decriminalization-increase-overdose-deaths")!;
		assert.equal(oregon.consensusBand, "mixed");
		assert.match(oregon.sources.find(source => source.doi === "10.1001/jamanetworkopen.2024.31612")!.note!, /rates are deaths per population, not percentages/u);
		assert.match(oregon.sources.find(source => source.doi === "10.3386/w35427")!.note!, /working paper/u);
		const pressure = novemberCareLearningClaims.find(claim => claim.slug === "can-treating-high-blood-pressure-lower-dementia-risk")!;
		assert.match(pressure.sources.find(source => source.doi === "10.1212/wnl.0000000000213334")!.note!, /Figure 3.*composite endpoint/u);
		assert.match(pressure.stableCore.join(" "), /mild cognitive impairment than for dementia alone/u);
	});
	it("cites completed research versions and excludes unreviewed correction candidates", () => {
		const careSources = novemberCareLearningClaims.flatMap(claim => claim.sources);
		assert.equal(careSources.find(source => source.doi === "10.1002/14651858.CD014915.pub2")?.year, 2023);
		assert.ok(careSources.some(source => source.doi === "10.1200/jco.23.02596" && source.kind === "guideline"));
		for (const excluded of ["10.1002/14651858.cd014915", "10.1007/s00520-023-07662-1", "10.1016/j.ijnurstu.2022.104181"]) {
			assert.equal(careSources.some(source => source.doi?.toLowerCase() === excluded), false);
		}
		assert.equal(careSources.find(source => source.doi === "10.1007/s10549-025-07858-5")?.year, 2026);
		assert.equal(careSources.find(source => source.doi === "10.1016/j.buildenv.2020.107426")?.year, 2021);
		const policySources = novemberSocialPolicyClaims.flatMap(claim => claim.sources);
		assert.equal(policySources.find(source => source.doi === "10.1093/rfs/hhy090")?.year, 2019);
		assert.equal(policySources.find(source => source.doi === "10.1016/j.jpubeco.2016.10.002")?.year, 2017);
		assert.equal(policySources.find(source => source.doi === "10.1080/17457289.2021.1994579")?.year, 2023);
	});
	it("adds distinct dementia treatment and office-layout questions without duplicating existing reviews", () => {
		for (const slug of ["is-hearing-loss-linked-to-higher-dementia-risk-and-can-hearing-aids-help", "how-does-hybrid-work-affect-employee-performance"]) {
			assert.equal(defaultClaims.filter(claim => claim.slug === slug).length, 1);
			assert.equal(novemberCareLearningClaims.some(claim => claim.slug === slug), false);
		}
		const stimulation = novemberCareLearningClaims.find(claim => claim.slug === "does-cognitive-stimulation-therapy-help-people-with-dementia")!;
		assert.equal(stimulation.sources.length, 2);
		assert.match(stimulation.exclusionRules!.join(" "), /do not establish prevention in cognitively healthy adults/u);
		const office = novemberCareLearningClaims.find(claim => claim.slug === "how-do-open-plan-offices-affect-collaboration")!;
		assert.equal(office.consensusBand, "mixed");
		assert.match(office.sources[0].note!, /not randomized.*not total collaboration quality/u);
	});
	it("keeps observation units, follow-ups and intervention comparisons explicit", () => {
		const identification = novemberSocialPolicyClaims.find(claim => claim.slug === "do-strict-voter-id-laws-reduce-turnout")!;
		assert.match(identification.sources.find(source => source.doi === "10.1093/qje/qjab019")!.note!, /1\.6 billion voter-election observations.*not 1\.6 billion distinct people/u);
		assert.match(identification.sources.find(source => source.doi === "10.1111/jels.12283")!.note!, /not an estimate of turnout loss under a strict/u);
		const college = novemberCareLearningClaims.find(claim => claim.slug === "do-early-college-high-schools-increase-degree-completion")!;
		assert.match(college.exclusionRules!.join(" "), /follow-ups of one experiment/u);
		assert.match(college.sources[0].note!, /no longer significant/u);
		const teacher = novemberCareLearningClaims.find(claim => claim.slug === "does-teacher-merit-pay-improve-student-achievement")!;
		assert.match(teacher.sources.find(source => source.doi === "10.1002/pam.20022")!.note!, /not random assignment of teachers to receive merit pay/u);
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
