import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CATALOG_ENTRY_GOAL, catalogExpansionClaims, catalogExpansionReleases } from "../src/data/catalogExpansion.js";
import { novemberAnimalWelfareClaims, novemberAnimalWelfareResearchCheckedAt } from "../src/data/claim-expansion-2026-11-animal-welfare.js";
import { novemberArtsCreativityClaims, novemberArtsCreativityResearchCheckedAt } from "../src/data/claim-expansion-2026-11-arts-creativity.js";
import { novemberCareLearningClaims, novemberCareLearningResearchCheckedAt } from "../src/data/claim-expansion-2026-11-care-learning.js";
import { novemberCommonReaderClaims, novemberCommonReaderResearchCheckedAt } from "../src/data/claim-expansion-2026-11-common-reader.js";
import { novemberConsumerChoicesClaims, novemberConsumerChoicesResearchCheckedAt } from "../src/data/claim-expansion-2026-11-consumer-choices.js";
import { novemberEcologyConservationClaims, novemberEcologyConservationResearchCheckedAt } from "../src/data/claim-expansion-2026-11-ecology-conservation.js";
import { novemberEverydayHealthEnvironmentClaims, novemberEverydayHealthEnvironmentResearchCheckedAt } from "../src/data/claim-expansion-2026-11-everyday-health-environment.js";
import { novemberExerciseRecoveryClaims, novemberExerciseRecoveryResearchCheckedAt } from "../src/data/claim-expansion-2026-11-exercise-recovery.js";
import { novemberFoodPatternsClaims, novemberFoodPatternsResearchCheckedAt } from "../src/data/claim-expansion-2026-11-food-patterns.js";
import { novemberHouseholdEnergyClaims, novemberHouseholdEnergyResearchCheckedAt } from "../src/data/claim-expansion-2026-11-household-energy.js";
import { novemberHumanWildlifeClaims, novemberHumanWildlifeResearchCheckedAt } from "../src/data/claim-expansion-2026-11-human-wildlife.js";
import { novemberLanguageCommunicationClaims, novemberLanguageCommunicationResearchCheckedAt } from "../src/data/claim-expansion-2026-11-language-communication.js";
import { novemberLearningHabitsWorkClaims, novemberLearningHabitsWorkResearchCheckedAt } from "../src/data/claim-expansion-2026-11-learning-habits-work.js";
import { novemberLearningClaims } from "../src/data/claim-expansion-2026-11-learning.js";
import { novemberMemoryJudgmentClaims, novemberMemoryJudgmentResearchCheckedAt } from "../src/data/claim-expansion-2026-11-memory-judgment.js";
import { novemberRecoveryPreventionClaims, novemberRecoveryPreventionResearchCheckedAt } from "../src/data/claim-expansion-2026-11-recovery-prevention.js";
import { novemberRiverLandscapeClaims, novemberRiverLandscapeResearchCheckedAt } from "../src/data/claim-expansion-2026-11-river-landscape.js";
import { novemberResearchCheckedAt, researchSource } from "../src/data/claim-expansion-2026-11-shared.js";
import { novemberSocialConnectionClaims, novemberSocialConnectionResearchCheckedAt } from "../src/data/claim-expansion-2026-11-social-connection.js";
import { novemberSocialPolicyClaims, novemberSocialPolicyResearchCheckedAt } from "../src/data/claim-expansion-2026-11-social-policy.js";
import { novemberTransportHousingClaims, novemberTransportHousingResearchCheckedAt } from "../src/data/claim-expansion-2026-11-transport-housing.js";
import { novemberUrbanClaims, novemberUrbanResearchCheckedAt } from "../src/data/claim-expansion-2026-11-urban.js";
import { novemberWeatherForecastingClaims, novemberWeatherForecastingResearchCheckedAt } from "../src/data/claim-expansion-2026-11-weather-forecasting.js";
import { novemberWomensHealthSupportClaims, novemberWomensHealthSupportResearchCheckedAt } from "../src/data/claim-expansion-2026-11-womens-health-support.js";
import { novemberWorkplaceClaims, novemberWorkplaceResearchCheckedAt } from "../src/data/claim-expansion-2026-11-workplace.js";
import { defaultClaims, legacyDefaultClaims } from "../src/data/claims.js";
import { defaultTopics } from "../src/data/topics.js";
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
		assert.equal(novemberEcologyConservationClaims.length, 11);
		assert.equal(novemberRiverLandscapeClaims.length, 8);
		assert.equal(novemberExerciseRecoveryClaims.length, 8);
		assert.equal(novemberWorkplaceClaims.length, 20);
		assert.equal(novemberSocialConnectionClaims.length, 20);
		assert.equal(novemberConsumerChoicesClaims.length, 20);
		assert.equal(novemberLanguageCommunicationClaims.length, 20);
		assert.equal(novemberArtsCreativityClaims.length, 20);
		assert.equal(novemberWeatherForecastingClaims.length, 20);
		assert.equal(catalogExpansionClaims.length, 477);
		assert.equal(defaultClaims.length, 1478);
		assert.deepEqual(defaultClaims.slice(0, legacyDefaultClaims.length), legacyDefaultClaims);
		assert.deepEqual(await validateCatalogExpansion(), {
			entries: 477,
			citations: 1500,
			catalog: 1478,
			target: 1501
		});
		assert.deepEqual(await validateApprovedReaderRelease(), { reviews: 201, citations: 461 });
	});
	it("seals twenty weather reviews with qualified certainty and distinct scopes", () => {
		assert.equal(readerExpansionValueHash(novemberWeatherForecastingClaims), "95f35883a45414bdcd8ceb81e50409bba462355c892f56d57be30a3e0c92415d");
		assert.equal(novemberWeatherForecastingResearchCheckedAt, "2026-11-08T17:48:07.165Z");
		assert.ok(novemberWeatherForecastingClaims.every(claim => claim.searchCutoffAt === novemberWeatherForecastingResearchCheckedAt));
		assert.equal(new Set(novemberWeatherForecastingClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 20);
		const citations = novemberWeatherForecastingClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 83);
		assert.equal(new Set(citations.flatMap(source => source.doi
			? [source.doi]
			: [])).size, 80);
		assert.ok(novemberWeatherForecastingClaims.every(claim => claim.sources.length >= 4));
		assert.equal(novemberWeatherForecastingClaims.filter(claim => claim.consensusBand === "mixed").length, 7);
		assert.equal(novemberWeatherForecastingClaims.filter(claim => claim.consensusBand === "unclear").length, 1);
		assert.equal(novemberWeatherForecastingClaims.filter(claim => claim.evidenceCertainty === "low").length, 9);
	});
	it("adds weather without recounting existing rainfall and irrigation questions", () => {
		assert.equal(defaultTopics.length, 47);
		assert.equal(defaultTopics.filter(topic => topic.slug === "weather-and-forecasting").length, 1);
		assert.equal(defaultTopics.find(topic => topic.slug === "weather-and-forecasting")!.order, 42);
		assert.ok(novemberWeatherForecastingClaims.every(claim => claim.topicSlug === "weather-and-forecasting"));
		assert.ok(defaultClaims.some(claim => claim.slug === "does-a-40-percent-chance-of-rain-mean-rain-for-40-percent-of-the-day"));
		assert.ok(defaultClaims.some(claim => claim.slug === "does-irrigation-only-increase-crop-production-without-serious-long-term-costs"));
		assert.equal(novemberWeatherForecastingClaims.some(claim => /chance-of-rain|crop-production/u.test(claim.slug)), false);
	});
	it("retains official guidance identities and an honestly undated source", () => {
		const guidance = novemberWeatherForecastingClaims.flatMap(claim => claim.sources).filter(source => !source.doi);
		assert.equal(guidance.length, 3);
		const hosts = guidance.map((source) => {
			assert.ok(source.url);
			return new URL(source.url).hostname;
		});
		assert.deepEqual(new Set(hosts), new Set(["public.wmo.int", "confluence.ecmwf.int", "www.weather.gov"]));
		for (const source of guidance) assert.deepEqual(source.statusSources, [source.url]);
		const weatherService = guidance.find(source => source.url === "https://www.weather.gov/dvn/sirenFAQ")!;
		assert.equal(weatherService.year, undefined);
		assert.match(weatherService.note!, /vary locally/u);
		assert.match(guidance.find(source => source.publisher === "World Meteorological Organization")!.note!, /June 2024/u);
	});
	it("distinguishes forecast benchmarks and turbulence indicators from event outcomes", () => {
		const claim = (slug: string) => novemberWeatherForecastingClaims.find(entry => entry.slug === slug)!;
		const forecasts = claim("are-ai-weather-forecasts-more-accurate-than-traditional-models");
		assert.match(forecasts.sources.find(source => source.doi === "10.1126/science.adi2336")!.note!, /not a 90% probability/u);
		assert.match(claim("is-climate-change-increasing-clear-air-turbulence").misconceptions.join(" "), /worldwide change in accidents/u);
		assert.match(claim("can-el-nino-be-predicted-months-in-advance").misconceptions.join(" "), /does not guarantee/u);
		assert.match(claim("can-forecasters-predict-rapid-hurricane-intensification").misconceptions.join(" "), /thresholds/u);
	});
	it("preserves warning and regional sign-change limitations", () => {
		const claim = (slug: string) => novemberWeatherForecastingClaims.find(entry => entry.slug === slug)!;
		assert.match(claim("do-heat-health-warnings-reduce-deaths").stableCore.join(" "), /combine alerts with actions/u);
		assert.match(claim("do-flood-warnings-reduce-property-damage").exclusionRules!.join(" "), /mortality or evacuation/u);
		assert.match(claim("do-forests-support-regional-rainfall").stableCore.join(" "), /wet-season rain/u);
		assert.match(claim("does-irrigation-change-regional-rainfall").stableCore.join(" "), /reverse the modeled sign/u);
		assert.match(claim("is-arctic-warming-making-midlatitude-winters-more-extreme").exclusionRules!.join(" "), /overlapping coordinated-model/u);
	});
	it("uses canonical weather issue years rather than indexed online years", () => {
		const sources = novemberWeatherForecastingClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1038/s41586-024-08252-9", 2025],
			["10.1002/qj.70186", 2026],
			["10.1002/wea.70015", 2026],
			["10.1038/s41558-019-0662-y", 2020],
			["10.1126/sciadv.aay2880", 2020],
			["10.1175/waf-d-26-0037.1", 2026]
		] as const) assert.equal(sources.find(source => source.doi === doi)?.year, year);
	});
	it("keeps unresolved correction scopes outside this weather manuscript", () => {
		const used = new Set(novemberWeatherForecastingClaims.flatMap(claim => claim.sources).map(source => source.doi));
		for (const doi of [
			"10.1007/s00382-023-06800-z",
			"10.1002/joc.70274",
			"10.1038/s43247-023-01008-9",
			"10.1098/rspa.2005.1625"
		]) assert.equal(used.has(doi), false);
		assert.ok(used.has("10.1175/waf-d-19-0168.1"));
		assert.ok(used.has("10.1002/met.2170"));
		assert.ok(used.has("10.1126/sciadv.aay2880"));
	});
	it("keeps weather provenance accurate and public copy free of revision notes", () => {
		for (const claim of novemberWeatherForecastingClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/u);
			assert.match(claim.appraisalTools!.join(" "), /no formal GRADE assessment/u);
			assert.doesNotMatch(claim.editorSummary, /this update|earlier page|seeded claim|previous draft/iu);
			assert.doesNotMatch(claim.exclusionRules!.join(" "), /truncated.*abstract|fetching|draft helper/iu);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		}
	});
	it("seals twenty arts questions with distinct scopes and qualified certainty", () => {
		assert.equal(readerExpansionValueHash(novemberArtsCreativityClaims), "4f58f6ea14ac14a87407dd0f57ae132d9dd2882e0fd5d166af895d8a44aed1c0");
		assert.equal(novemberArtsCreativityResearchCheckedAt, "2026-11-08T16:13:44.746Z");
		assert.ok(novemberArtsCreativityClaims.every(claim => claim.searchCutoffAt === novemberArtsCreativityResearchCheckedAt));
		assert.equal(new Set(novemberArtsCreativityClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 20);
		const citations = novemberArtsCreativityClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 61);
		assert.equal(new Set(citations.map(source => source.doi!.toLowerCase())).size, 60);
		assert.equal(novemberArtsCreativityClaims.filter(claim => claim.consensusBand === "mixed").length, 10);
		assert.equal(novemberArtsCreativityClaims.filter(claim => claim.evidenceCertainty === "low").length, 15);
	});
	it("adds an arts topic and preserves separately scoped existing questions", () => {
		assert.equal(defaultTopics.length, 47);
		assert.equal(defaultTopics.filter(topic => topic.slug === "arts-and-creativity").length, 1);
		assert.equal(defaultTopics.find(topic => topic.slug === "arts-and-creativity")!.order, 41);
		assert.equal(novemberArtsCreativityClaims.filter(claim => claim.topicSlug === "arts-and-creativity").length, 12);
		assert.ok(defaultClaims.some(claim => claim.title === "Does taking photos change what people remember?"));
		assert.ok(defaultClaims.some(claim => claim.title === "Does background music help people study?"));
		assert.ok(defaultClaims.some(claim => claim.title === "How do rewards affect intrinsic motivation?"));
		assert.equal(novemberArtsCreativityClaims.some(claim => /photo|background-music|intrinsic-motivation/u.test(claim.slug)), false);
	});
	it("retains the PubMed-linked pain correction without inventing a clean status", () => {
		const pain = novemberArtsCreativityClaims.find(claim => claim.slug === "can-music-help-reduce-pain")!;
		const source = pain.sources.find(citation => citation.doi === "10.1093/jmt/thw012")!;
		assert.equal(source.citationStatus, "corrected");
		assert.ok(source.statusSources!.includes("https://doi.org/10.1093/jmt/thab012"));
		assert.match(source.note!, /2021.*supplementary material/u);
		assert.match(pain.stableCore.join(" "), /2021 publisher erratum/u);
	});
	it("keeps clinical outcomes and author-performed certainty assessments distinct", () => {
		const claim = (slug: string) => novemberArtsCreativityClaims.find(entry => entry.slug === slug)!;
		assert.match(claim("does-listening-to-music-improve-sleep-quality").misconceptions.join(" "), /questionnaire score.*hours slept/u);
		assert.match(claim("can-music-help-reduce-anxiety").stableCore.join(" "), /physiological outcomes did not show a clear benefit/u);
		assert.match(claim("can-music-help-reduce-pain").stableCore.join(" "), /no clear anxiety or quality-of-life benefit/u);
		const walking = claim("does-walking-help-people-generate-creative-ideas");
		assert.match(walking.sources[0].note!, /Authors rate.*using GRADE; this site has not independently performed GRADE/u);
		assert.match(walking.misconceptions.join(" "), /81% of participants.*81% improvement/u);
	});
	it("preserves null transfer findings and small-study limitations", () => {
		const claim = (slug: string) => novemberArtsCreativityClaims.find(entry => entry.slug === slug)!;
		assert.match(claim("does-music-training-help-children-learn-to-read").stableCore.join(" "), /no significant overall transfer to reading fluency/u);
		assert.match(claim("does-school-chess-instruction-improve-academic-achievement").stableCore.join(" "), /adjustment for multiple tests/u);
		assert.match(claim("do-drama-programs-improve-social-skills").stableCore.join(" "), /losing significance after removal/u);
		const violins = claim("do-old-italian-violins-sound-better-in-blind-tests");
		assert.match(violins.stableCore.join(" "), /favored one Stradivari/u);
		assert.match(claim("can-adults-learn-absolute-pitch").sources[0].note!, /13.9% to 31.7%/u);
	});
	it("uses observed arts issue years and retains nonindependent evidence scopes", () => {
		const citations = novemberArtsCreativityClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1037/bul0000216", 2020],
			["10.1177/1948550618775410", 2019],
			["10.1002/pam.22449", 2023],
			["10.1177/10298649211046979", 2023],
			["10.1371/journal.pone.0223047", 2019],
			["10.1177/02762374241262606", 2025],
			["10.3368/jhr.1020-11242r1", 2024],
			["10.1080/17533015.2022.2130947", 2023],
			["10.1016/j.jdeveco.2020.102615", 2021]
		] as const) assert.equal(citations.find(source => source.doi === doi)?.year, year);
		assert.equal(citations.filter(source => source.doi === "10.3368/jhr.1020-11242r1").length, 2);
		assert.equal(citations.find(source => source.doi === "10.1177/0149206318805832")!.kind, "context");
		assert.equal(citations.find(source => source.doi === "10.1177/10892680211060027")!.kind, "context");
	});
	it("keeps arts review provenance and public copy accurate", () => {
		for (const claim of novemberArtsCreativityClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/u);
			assert.match(claim.appraisalTools!.join(" "), /no formal GRADE assessment/u);
			assert.doesNotMatch(claim.editorSummary, /this update|earlier page|seeded claim|previous draft/iu);
			assert.doesNotMatch(claim.exclusionRules!.join(" "), /truncated.*abstract|fetching|draft helper/iu);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		}
	});
	it("seals twenty language questions with distinct scopes and qualified certainty", () => {
		assert.equal(readerExpansionValueHash(novemberLanguageCommunicationClaims), "e935831e8f4039d26c94e58f03107005343dff9a18068b54504cd10396d4165e");
		assert.equal(novemberLanguageCommunicationResearchCheckedAt, "2026-11-08T14:46:05.179Z");
		assert.ok(novemberLanguageCommunicationClaims.every(claim => claim.searchCutoffAt === novemberLanguageCommunicationResearchCheckedAt));
		assert.equal(new Set(novemberLanguageCommunicationClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 20);
		const citations = novemberLanguageCommunicationClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 61);
		assert.equal(new Set(citations.map(source => source.doi!.toLowerCase())).size, 61);
		assert.equal(novemberLanguageCommunicationClaims.filter(claim => claim.consensusBand === "mixed").length, 6);
		assert.equal(novemberLanguageCommunicationClaims.filter(claim => claim.consensusBand === "unclear").length, 1);
		assert.equal(novemberLanguageCommunicationClaims.filter(claim => claim.evidenceCertainty === "low").length, 9);
	});
	it("adds a language topic with distinct existing educational scopes preserved", () => {
		assert.equal(defaultTopics.length, 47);
		assert.equal(defaultTopics.filter(topic => topic.slug === "language-and-communication").length, 1);
		assert.equal(defaultTopics.find(topic => topic.slug === "language-and-communication")!.order, 40);
		assert.ok(novemberLanguageCommunicationClaims.every(claim => claim.topicSlug === "language-and-communication"));
		for (const slug of [
			"do-captions-help-people-learn-second-language-vocabulary",
			"does-systematic-phonics-instruction-help-children-learn-to-read",
			"does-being-bilingual-improve-attention-and-mental-control"
		]) assert.ok(defaultClaims.some(claim => claim.slug === slug));
	});
	it("retains observed language journal issue years and online-date distinctions", () => {
		const citations = novemberLanguageCommunicationClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1080/09571736.2022.2097298", 2024],
			["10.1177/13621688221106832", 2025],
			["10.1177/13621688221131127", 2025],
			["10.1177/1362168820988423", 2024],
			["10.1080/03054985.2024.2413109", 2026],
			["10.1111/cdev.13225", 2020],
			["10.1080/13803611.2020.1814820", 2019],
			["10.1177/00222194251364836", 2026],
			["10.1007/s11145-024-10539-2", 2025],
			["10.1177/13621688221147374", 2026]
		] as const) assert.equal(citations.find(source => source.doi === doi)?.year, year);
		assert.match(citations.find(source => source.doi === "10.1080/13803611.2020.1814820")!.note!, /2019.*October 8, 2020/u);
	});
	it("preserves null language findings and separates reported confidence from performance", () => {
		const claim = (slug: string) => novemberLanguageCommunicationClaims.find(entry => entry.slug === slug)!;
		const chatbot = claim("do-ai-chatbots-help-people-learn-a-language");
		assert.match(chatbot.stableCore.join(" "), /speaking-test gains did not differ significantly/u);
		const shadowing = claim("does-shadowing-help-language-learners");
		assert.match(shadowing.stableCore.join(" "), /without a statistically detectable advantage/u);
		const signs = claim("does-baby-sign-improve-spoken-vocabulary");
		assert.equal(signs.consensusBand, "unclear");
		assert.match(signs.exclusionRules!.join(" "), /deaf or hard-of-hearing/u);
		const sharing = claim("does-shared-book-reading-improve-childrens-language");
		assert.match(sharing.stableCore.join(" "), /without improving language beyond an active reading comparison/u);
		assert.match(sharing.stableCore.join(" "), /one of two/u);
	});
	it("keeps language reanalyses and dependent evidence pools distinct", () => {
		const citations = novemberLanguageCommunicationClaims.flatMap(claim => claim.sources);
		assert.match(citations.find(source => source.doi === "10.1177/13621688221131127")!.note!, /Reuses the original evidence base/u);
		assert.match(citations.find(source => source.doi === "10.1007/s11145-024-10539-2")!.note!, /reused data, not independent replication/u);
		assert.match(citations.find(source => source.doi === "10.1075/sibil.48.18goo")!.note!, /book chapter.*34 unique samples/u);
		assert.match(citations.find(source => source.doi === "10.1037/bul0000202")!.note!, /not listener-only/u);
	});
	it("retains language study designs, comparison conditions and outcome units", () => {
		const citations = novemberLanguageCommunicationClaims.flatMap(claim => claim.sources);
		assert.match(citations.find(source => source.doi === "10.1002/rrq.152")!.note!, /four intact.*replaced intensive reading/u);
		assert.match(citations.find(source => source.doi === "10.3102/0002831216634463")!.note!, /intent-to-treat.*not percentage score gains/u);
		assert.match(citations.find(source => source.doi === "10.1080/03054985.2024.2413109")!.note!, /all quasi-experimental/u);
		assert.match(citations.find(source => source.doi === "10.5334/pb.1146")!.note!, /low quality.*high risk of bias/u);
		assert.match(citations.find(source => source.doi === "10.1177/00222194251364836")!.note!, /39 group designs and 20 single-case/u);
	});
	it("keeps language provenance and scope disclosure accurate", () => {
		for (const claim of novemberLanguageCommunicationClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/u);
			assert.match(claim.appraisalTools!.join(" "), /no formal GRADE assessment/u);
			assert.doesNotMatch(claim.editorSummary, /this update|earlier page|seeded claim|previous draft/iu);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		}
	});
	it("seals twenty consumer questions with distinct scopes and sixty-one papers", () => {
		assert.equal(readerExpansionValueHash(novemberConsumerChoicesClaims), "9d18d42069a103b09d9bd537d6782abcaed26df9b16bb214cba3b8d98a0c3957");
		assert.equal(novemberConsumerChoicesResearchCheckedAt, "2026-11-08T13:06:14.080Z");
		assert.ok(novemberConsumerChoicesClaims.every(claim => claim.searchCutoffAt === novemberConsumerChoicesResearchCheckedAt));
		assert.equal(new Set(novemberConsumerChoicesClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 20);
		const citations = novemberConsumerChoicesClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 61);
		assert.equal(new Set(citations.map(source => source.doi!.toLowerCase())).size, 61);
		assert.equal(novemberConsumerChoicesClaims.filter(claim => claim.consensusBand === "mixed").length, 8);
		assert.equal(novemberConsumerChoicesClaims.filter(claim => claim.evidenceCertainty === "low").length, 8);
	});
	it("adds a consumer topic while preserving distinct existing decision questions", () => {
		assert.equal(defaultTopics.length, 47);
		assert.equal(defaultTopics.filter(topic => topic.slug === "consumer-choices").length, 1);
		assert.equal(defaultTopics.find(topic => topic.slug === "consumer-choices")!.order, 39);
		assert.ok(novemberConsumerChoicesClaims.every(claim => claim.topicSlug === "consumer-choices"));
		assert.ok(defaultClaims.some(claim => claim.title === "Do past irrecoverable costs influence current decisions?"));
		assert.ok(defaultClaims.some(claim => claim.title === "Does having more choice make decisions harder?"));
		assert.equal(novemberConsumerChoicesClaims.some(claim => /sunk|loss-aversion|default-options|choice-overload|numerical-anchoring/u.test(claim.slug)), false);
	});
	it("retains all three consumer citation corrections with valid notice links", () => {
		const citations = novemberConsumerChoicesClaims.flatMap(claim => claim.sources);
		assert.ok(citations.every(source => source.citationCheckedAt === novemberConsumerChoicesResearchCheckedAt));
		assert.equal(citations.filter(source => source.citationStatus === "corrected").length, 3);
		for (const [article, notice] of [
			["10.1038/s41539-025-00341-2", "10.1038/s41539-025-00387-2"],
			["10.1177/0956797617736386", "10.1177/0956797618815623"],
			["10.1080/15252019.2024.2417422", "10.1080/15252019.2025.2506340"]
		]) {
			const source = citations.find(source => source.doi === article)!;
			assert.equal(source.citationStatus, "corrected");
			assert.ok(source.statusSources!.includes(`https://doi.org/${notice}`));
		}
		assert.equal(citations.some(source => source.doi === "10.1111/obr.12445"), false);
		assert.ok(citations.every(source => source.statusSources!.every(value => URL.canParse(value))));
	});
	it("uses observed consumer journal issue dates instead of discovery-index years", () => {
		const citations = novemberConsumerChoicesClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1093/jcr/ucaa047", 2021],
			["10.1002/cb.2418", 2025],
			["10.1007/s10796-021-10170-4", 2022],
			["10.1007/s11747-021-00804-z", 2022],
			["10.1002/jcpy.1353", 2024],
			["10.1057/s41270-025-00415-5", 2026],
			["10.1509/jmr.10.0355", 2014],
			["10.1111/poms.13640", 2022],
			["10.1002/joom.1346", 2025]
		] as const) assert.equal(citations.find(source => source.doi === doi)!.year, year, doi);
	});
	it("preserves null findings, comparison groups and outcome units in consumer evidence", () => {
		const labels = novemberConsumerChoicesClaims.find(claim => claim.slug === "do-front-of-pack-nutrition-labels-improve-food-choices")!;
		assert.match(labels.misconceptions.join(" "), /positive-only labels, not.*unlabeled/u);
		assert.match(labels.sources.find(source => source.doi === "10.1007/s11747-020-00723-5")!.note!, /2.5%.*score, not calories or disease/u);
		const prices = novemberConsumerChoicesClaims.find(claim => claim.slug === "do-prices-ending-in-99-change-buying-decisions")!;
		assert.match(prices.sources.find(source => source.doi === "10.3389/frbhe.2026.1828446")!.note!, /N=729.*do not reliably change/u);
		const eco = novemberConsumerChoicesClaims.find(claim => claim.slug === "do-environmental-food-labels-change-what-shoppers-choose")!;
		assert.match(eco.exclusionRules!.join(" "), /modeled score.*measured emissions/u);
		const reviews = novemberConsumerChoicesClaims.find(claim => claim.slug === "do-online-customer-reviews-influence-buying")!;
		assert.match(reviews.misconceptions.join(" "), /0.091.*not a 9.1% sales increase/u);
	});
	it("retains corrected hypotheses and separates randomized and observational components", () => {
		const personalized = novemberConsumerChoicesClaims.find(claim => claim.slug === "are-personalized-ads-more-persuasive-than-generic-ads")!;
		assert.match(personalized.sources.find(source => source.doi === "10.1080/15252019.2024.2417422")!.note!, /Hypothesis 6.*not supported/u);
		assert.match(personalized.exclusionRules!.join(" "), /privacy-policy change randomized/u);
		const ownership = novemberConsumerChoicesClaims.find(claim => claim.slug === "does-owning-something-change-how-much-you-value-it")!;
		assert.match(ownership.exclusionRules!.join(" "), /reused original data.*independent replication/u);
		const scarcity = novemberConsumerChoicesClaims.find(claim => claim.slug === "do-scarcity-messages-make-products-more-appealing")!;
		assert.match(scarcity.exclusionRules!.join(" "), /intention.*actual booking/u);
	});
	it("keeps consumer review provenance qualified and article scope specific", () => {
		assert.ok(novemberConsumerChoicesClaims.every(claim => /independent expert review not completed/u.test(claim.reviewerLine!)));
		assert.ok(novemberConsumerChoicesClaims.every(claim => claim.appraisalTools!.some(tool => /no formal GRADE assessment/u.test(tool))));
		assert.ok(novemberConsumerChoicesClaims.every(claim => claim.sources.every(source => source.appraisal === "not_appraised")));
		assert.ok(novemberConsumerChoicesClaims.every(claim => !/earlier page|this update|seeded claim/u.test(claim.editorSummary!)));
	});
	it("seals twenty social-connection reviews with question-specific scope", () => {
		assert.equal(readerExpansionValueHash(novemberSocialConnectionClaims), "af42013c72ec5d1db2cca1db531f5b2a59e35159923d63f3c6b8fe624365d4cf");
		assert.equal(novemberSocialConnectionResearchCheckedAt, "2026-11-08T11:39:16.388Z");
		assert.ok(novemberSocialConnectionClaims.every(claim => claim.searchCutoffAt === novemberSocialConnectionResearchCheckedAt));
		assert.equal(new Set(novemberSocialConnectionClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 20);
		assert.equal(novemberSocialConnectionClaims.filter(claim => claim.consensusBand === "mixed").length, 11);
		assert.equal(novemberSocialConnectionClaims.filter(claim => claim.evidenceCertainty === "low").length, 9);
	});
	it("retains published social citations and all three observed correction notices", () => {
		const citations = novemberSocialConnectionClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 66);
		assert.equal(new Set(citations.map(source => source.doi!.toLowerCase())).size, 65);
		assert.ok(citations.every(source => source.citationCheckedAt === novemberSocialConnectionResearchCheckedAt));
		const corrected = citations.filter(source => source.citationStatus === "corrected");
		assert.equal(corrected.length, 3);
		for (const [article, notice] of [
			["10.1126/science.1150952", "10.1126/science.324_1143a"],
			["10.1037/cou0000093", "10.1037/cou0000130"],
			["10.1177/09567976221150617", "10.1177/09567976251362783"]
		]) assert.ok(corrected.find(source => source.doi === article)!.statusSources!.includes(`https://doi.org/${notice}`));
		assert.equal(citations.some(source => source.doi === "10.31234/osf.io/mye3g"), false);
		assert.ok(citations.some(source => source.doi === "10.1037/pspa0000191"));
	});
	it("retains the PubMed-linked spending correction and its affected component", () => {
		const spending = novemberSocialConnectionClaims.find(claim => claim.slug === "does-spending-money-on-others-increase-happiness")!;
		const original = spending.sources.find(source => source.doi === "10.1126/science.1150952")!;
		assert.equal(original.citationStatus, "corrected");
		assert.ok(original.statusSources!.includes("https://doi.org/10.1126/science.324_1143a"));
		assert.match(original.note!, /16-person.*0.81.*0.55/u);
		assert.match(spending.stableCore.join(" "), /2009 correction.*16-person.*other studies were unaffected/u);
	});
	it("uses observed journal issue years for social-connection research", () => {
		const citations = novemberSocialConnectionClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1007/s11266-023-00573-z", 2024],
			["10.1080/13607863.2021.1884845", 2022],
			["10.1007/s40520-019-01241-3", 2020],
			["10.1037/cou0000093", 2016],
			["10.1111/ajps.12657", 2023],
			["10.1037/pspp0000236", 2020],
			["10.1037/emo0001137", 2023],
			["10.1016/j.econlet.2024.111730", 2024],
			["10.1037/a0025948", 2012],
			["10.1162/opmi_a_00067", 2022]
		]) assert.equal(citations.find(source => source.doi === doi)!.year, year, String(doi));
	});
	it("keeps social studies' units and selected follow-up samples visible", () => {
		const claim = (slug: string) => novemberSocialConnectionClaims.find(entry => entry.slug === slug)!;
		assert.match(claim("does-volunteering-improve-wellbeing-in-older-adults").stableCore.join(" "), /445.*73.*112/u);
		assert.match(claim("does-spending-money-on-others-increase-happiness").stableCore.join(" "), /712.*1,950.*5,199/u);
		assert.match(claim("does-relationship-education-improve-couple-satisfaction").stableCore.join(" "), /1,034.*larger randomized/u);
		assert.match(claim("does-nostalgia-improve-wellbeing").stableCore.join(" "), /90 effect estimates.*not 90 independent/u);
		assert.match(claim("how-is-income-related-to-happiness").stableCore.join(" "), /33,391.*same.*not represent three independent/u);
		assert.match(claim("does-becoming-a-parent-make-people-happier").stableCore.join(" "), /152 samples.*not 152 randomized/u);
	});
	it("retains null and active-comparator social findings", () => {
		const claim = (slug: string) => novemberSocialConnectionClaims.find(entry => entry.slug === slug)!;
		assert.match(claim("does-spending-money-on-others-increase-happiness").stableCore.join(" "), /did not find a significant difference.*additional analysis/u);
		assert.match(claim("does-contact-between-groups-reduce-prejudice").stableCore.join(" "), /no change in prejudice.*discrimination increased/u);
		assert.match(claim("does-group-singing-improve-wellbeing").stableCore.join(" "), /active health-education.*did not demonstrate/u);
		assert.match(claim("does-social-support-reduce-stress-responses").stableCore.join(" "), /no significant relationship/u);
		assert.match(claim("does-moving-in-time-with-others-increase-cooperation").stableCore.join(" "), /did not find the original effects/u);
	});
	it("preserves existing social topics and related reviews without counting them again", () => {
		assert.equal(defaultTopics.length, 47);
		const existingTopics = new Set([
			"neuroscience-and-psychology",
			"mental-health-and-treatment",
			"aging-and-longevity",
			"work-and-organizations"
		]);
		assert.ok(novemberSocialConnectionClaims.every(claim => existingTopics.has(claim.topicSlug)));
		assert.equal(novemberSocialConnectionClaims.some(claim => /gratitude|loneliness-in-older-adults|gdp-per-capita/u.test(claim.slug)), false);
		assert.equal(defaultClaims.filter(claim => claim.slug === "do-gratitude-exercises-improve-wellbeing").length, 1);
	});
	it("keeps social provenance and consequential limits accurate", () => {
		assert.ok(novemberSocialConnectionClaims.every(claim => /independent expert review not completed/u.test(claim.reviewerLine!)));
		assert.ok(novemberSocialConnectionClaims.every(claim => claim.appraisalTools!.some(tool => /no formal GRADE assessment/u.test(tool))));
		assert.match(novemberSocialConnectionClaims.find(claim => claim.slug === "can-forgiveness-interventions-improve-wellbeing")!.bottomLine!, /voluntary.*unsafe/u);
		assert.match(novemberSocialConnectionClaims.find(claim => claim.slug === "does-group-singing-improve-wellbeing")!.misconceptions.join(" "), /does not by itself prove.*equivalent/u);
		assert.match(novemberSocialConnectionClaims.find(claim => claim.slug === "does-becoming-a-parent-make-people-happier")!.stableCore.join(" "), /children in the household as a proxy/u);
	});
	it("seals twenty workplace questions with distinct scopes and source evidence", () => {
		assert.equal(readerExpansionValueHash(novemberWorkplaceClaims), "d02a2fc62365c0f052e40799910af4277c3c5fae4718eb8702a104a6220c587c");
		assert.equal(novemberWorkplaceResearchCheckedAt, "2026-11-08T09:52:13.789Z");
		assert.ok(novemberWorkplaceClaims.every(claim => claim.searchCutoffAt === novemberWorkplaceResearchCheckedAt));
		const citations = novemberWorkplaceClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 66);
		assert.equal(new Set(citations.map(source => source.doi!.toLowerCase())).size, 66);
		assert.ok(citations.every(source => source.citationCheckedAt === novemberWorkplaceResearchCheckedAt && source.citationStatus === "current"));
		assert.equal(new Set(novemberWorkplaceClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 20);
		assert.equal(novemberWorkplaceClaims.filter(claim => claim.consensusBand === "mixed").length, 10);
		assert.equal(novemberWorkplaceClaims.filter(claim => claim.evidenceCertainty === "low").length, 3);
	});
	it("registers the workplace topic without replacing existing topics or unrelated questions", () => {
		assert.equal(defaultTopics.filter(topic => topic.slug === "work-and-organizations").length, 1);
		assert.equal(defaultTopics.find(topic => topic.slug === "work-and-organizations")!.order, 38);
		assert.ok(defaultTopics.some(topic => topic.slug === "animal-behavior-and-welfare"));
		assert.ok(novemberWorkplaceClaims.every(claim => claim.topicSlug === "work-and-organizations"));
		assert.ok(defaultClaims.some(claim => claim.slug === "does-performance-related-pay-improve-job-performance"));
		assert.equal(novemberWorkplaceClaims.some(claim => /performance-related-pay|personality-traits-predict/iu.test(claim.slug)), false);
	});
	it("uses workplace issue years and the observed publisher version date", () => {
		const citations = novemberWorkplaceClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1146/annurev-orgpsych-110622-060758", 2025],
			["10.1111/ijsa.12494", 2025],
			["10.1146/annurev-orgpsych-020924-072127", 2026],
			["10.1111/puar.13356", 2022],
			["10.1177/0894845320957737", 2022],
			["10.1037/apl0001315", 2026],
			["10.1080/1359432x.2021.1953989", 2022],
			["10.1080/1359432x.2021.1972973", 2022],
			["10.1016/j.jbusres.2016.08.014", 2017],
			["10.1111/corg.12585", 2025],
			["10.1257/app.20180340", 2021],
			["10.1086/714592", 2022],
			["10.15185/izawol.48.v3", 2025]
		] as const) assert.equal(citations.find(source => source.doi === doi)!.year, year, doi);
	});
	it("retains important workplace units, selection and active-comparator limits", () => {
		const citations = novemberWorkplaceClaims.flatMap(claim => claim.sources);
		assert.match(citations.find(source => source.doi === "10.1111/ijsa.12494")!.note!, /4,449 after one large study/u);
		assert.match(citations.find(source => source.doi === "10.1037/apl0000241")!.note!, /not randomized causal tests/u);
		assert.match(citations.find(source => source.doi === "10.1002/hrm.3930320210")!.note!, /48 of 198/u);
		assert.match(citations.find(source => source.doi === "10.1002/joe.22299")!.note!, /not constitute 360-degree feedback versus no feedback/u);
		assert.match(citations.find(source => source.doi === "10.1016/j.jesp.2016.11.002")!.note!, /not an independent comprehensive meta-analysis/u);
		assert.match(citations.find(source => source.doi === "10.1086/714592")!.note!, /not 21% gains/u);
	});
	it("keeps conflicting workplace evidence visible", () => {
		const crafting = novemberWorkplaceClaims.find(claim => claim.slug === "can-job-crafting-improve-work-engagement")!;
		assert.ok(crafting.sources.some(source => source.doi === "10.1037/str0000391" && source.stance === "debate"));
		assert.match(crafting.bottomLine, /without a clear improvement/u);
		const plants = novemberWorkplaceClaims.find(claim => claim.slug === "do-office-plants-make-people-more-productive")!;
		assert.match(plants.sources.find(source => source.doi === "10.3390/environments13080457")!.note!, /unchanged productivity/u);
		const ownership = novemberWorkplaceClaims.find(claim => claim.slug === "does-employee-ownership-improve-company-performance")!;
		assert.match(ownership.sources.find(source => source.doi === "10.1016/j.jbusres.2016.08.014")!.note!, /not statistically clear/u);
		const anonymous = novemberWorkplaceClaims.find(claim => claim.slug === "do-anonymous-applications-reduce-hiring-discrimination")!;
		assert.ok(anonymous.sources.some(source => source.doi === "10.1257/app.20140185" && source.stance === "debate"));
		assert.match(anonymous.stableCore.join(" "), /less likely to be interviewed or hired/u);
	});
	it("preserves the commuting synthesis and current anonymous-application overview", () => {
		const citations = novemberWorkplaceClaims.flatMap(claim => claim.sources);
		assert.equal(citations.find(source => source.doi === "10.1177/20413866221131404")!.kind, "meta_analysis");
		const overview = citations.find(source => source.doi === "10.15185/izawol.48.v3")!;
		assert.equal(overview.kind, "technical_reference");
		assert.match(overview.note!, /January 2025.*Crossref lists 2024/u);
		assert.ok(overview.statusSources!.includes("https://doi.org/10.15185/izawol.48.v3"));
		assert.equal(citations.some(source => source.doi === "10.15185/izawol.48.v2"), false);
	});
	it("retains honest workplace provenance without hiring or investment promises", () => {
		assert.ok(novemberWorkplaceClaims.every(claim => /independent expert review not completed/u.test(claim.reviewerLine!)));
		assert.ok(novemberWorkplaceClaims.every(claim => claim.appraisalTools!.some(tool => /no formal GRADE assessment/u.test(tool))));
		const diversity = novemberWorkplaceClaims.find(claim => claim.slug === "how-does-team-diversity-relate-to-performance")!;
		assert.match(diversity.exclusionRules!.join(" "), /individual hiring decisions/u);
		const ownership = novemberWorkplaceClaims.find(claim => claim.slug === "does-employee-ownership-improve-company-performance")!;
		assert.match(ownership.exclusionRules!.join(" "), /personal investment advice/u);
	});
	it("seals twenty human-wildlife questions with distinct scopes and verified sources", () => {
		assert.equal(readerExpansionValueHash(novemberHumanWildlifeClaims), "a100d8423eec9267a6c5a9b0ea8370854bd322d1adc628ecbdf8f2724eb28921");
		assert.equal(novemberHumanWildlifeResearchCheckedAt, "2026-11-08T08:23:39.889Z");
		assert.equal(novemberHumanWildlifeClaims.length, 20);
		assert.ok(novemberHumanWildlifeClaims.every(claim => claim.searchCutoffAt === novemberHumanWildlifeResearchCheckedAt));
		const citations = novemberHumanWildlifeClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 66);
		assert.equal(new Set(citations.filter(source => source.doi).map(source => source.doi!.toLowerCase())).size, 65);
		assert.equal(citations.filter(source => !source.doi).length, 1);
		assert.equal(new Set(novemberHumanWildlifeClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 20);
		assert.equal(novemberHumanWildlifeClaims.filter(claim => claim.consensusBand === "mixed").length, 6);
	});
	it("uses human-wildlife journal years and an honestly undated official reference", () => {
		const citations = novemberHumanWildlifeClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1002/fee.2809", 2025],
			["10.1111/ibi.13137", 2023],
			["10.1007/s10531-024-02969-9", 2025],
			["10.1016/j.scitotenv.2021.150289", 2022],
			["10.1002/wat2.1629", 2023]
		] as const) assert.equal(citations.find(source => source.doi === doi)?.year, year);
		const official = citations.find(source => !source.doi)!;
		assert.equal(Object.hasOwn(official, "year"), false);
		assert.equal(official.kind, "technical_reference");
		assert.equal(official.url, "https://www.fisheries.noaa.gov/southeast/bycatch/turtle-excluder-devices");
		assert.equal(citations.some(source => source.doi === "10.1039/d5va00416k"), false);
		assert.equal(citations.some(source => source.doi === "10.3390/d14050316"), false);
	});
	it("separates camera-model validation and photo identification from population inference", () => {
		const camera = novemberHumanWildlifeClaims.find(claim => claim.slug === "can-camera-traps-estimate-wildlife-population-sizes")!;
		assert.match(camera.stableCore.join(" "), /rare jaguars.*implausible estimates/u);
		assert.match(camera.sources.find(source => source.doi === "10.1111/cobi.13517")!.note!, /method prevalence, not five-percent counting accuracy/u);
		const citizen = novemberHumanWildlifeClaims.find(claim => claim.slug === "how-reliable-are-citizen-science-wildlife-records")!;
		assert.match(citizen.bottomLine, /Correct identification alone.*representative population survey/u);
		assert.match(citizen.stableCore.join(" "), /biases in both academic and citizen records/u);
	});
	it("retains solar counter-evidence and keeps maps distinct from independent experiments", () => {
		const solar = novemberHumanWildlifeClaims.find(claim => claim.slug === "how-do-solar-farms-affect-local-biodiversity")!;
		assert.equal(solar.consensusBand, "mixed");
		const negative = solar.sources.find(source => source.doi === "10.1007/s10531-026-03411-y")!;
		assert.equal(negative.stance, "debate");
		assert.match(negative.note!, /817 quantitative results from 56 publications/u);
		const noise = novemberHumanWildlifeClaims.find(claim => claim.slug === "how-does-human-made-noise-affect-land-animals")!;
		assert.match(noise.sources.find(source => source.doi === "10.1186/s13750-025-00368-3")!.note!, /not 863 independent experiments/u);
		const ranges = novemberHumanWildlifeClaims.find(claim => claim.slug === "how-are-species-ranges-shifting-as-the-climate-warms")!;
		assert.match(ranges.exclusionRules!.join(" "), /medians and means.*cannot establish acceleration or slowing/u);
	});
	it("preserves fish passage denominators and net-fishery counterfactuals", () => {
		const passage = novemberHumanWildlifeClaims.find(claim => claim.slug === "how-effective-are-fish-passages-around-dams")!;
		assert.match(passage.exclusionRules!.join(" "), /Attraction and passage have different denominators/u);
		const reserve = novemberHumanWildlifeClaims.find(claim => claim.slug === "do-marine-reserves-benefit-nearby-fisheries")!;
		assert.equal(reserve.consensusBand, "mixed");
		assert.match(reserve.stableCore.join(" "), /greater catch and effort.*no corresponding improvement in catch per unit effort/u);
		assert.equal(reserve.sources.find(source => source.doi === "10.1007/s12080-024-00596-2")?.kind, "technical_reference");
	});
	it("distinguishes plastic particle sizes and capture from destruction", () => {
		const turf = novemberHumanWildlifeClaims.find(claim => claim.slug === "does-artificial-turf-add-plastic-pollution-to-the-environment")!;
		assert.match(turf.exclusionRules!.join(" "), /mesoplastics and macroplastics.*not global microplastic shares/u);
		const wastewater = novemberHumanWildlifeClaims.find(claim => claim.slug === "do-wastewater-plants-remove-microplastics")!;
		assert.match(wastewater.bottomLine, /Capture is also different from destruction/u);
		assert.match(wastewater.exclusionRules!.join(" "), /Pooled concentrations.*paired removal rate/u);
	});
	it("keeps historical offsets, modeled credits and limited turtle encounters qualified", () => {
		const offsets = novemberHumanWildlifeClaims.find(claim => claim.slug === "how-well-do-biodiversity-offsets-compensate-for-habitat-loss")!;
		assert.equal(offsets.evidenceCertainty, "low");
		assert.match(offsets.sources.find(source => source.doi === "10.1038/s41893-022-00850-7")!.note!, /Historical 2022.*116 model specifications.*not independent projects/u);
		const turtle = novemberHumanWildlifeClaims.find(claim => claim.slug === "do-turtle-excluder-devices-reduce-accidental-turtle-catches")!;
		assert.match(turtle.exclusionRules!.join(" "), /Combined-device.*does not prove zero mortality/u);
		assert.match(turtle.sources.find(source => source.doi === "10.1002/aqc.70244")!.note!, /sixteen potentially alive/u);
	});
	it("seals twenty memory and judgment questions with distinct scopes", () => {
		assert.equal(readerExpansionValueHash(novemberMemoryJudgmentClaims), "ca5fcf990fd2a4631d681294c1d0bc6f6c0ac9e5e9e211565115d7629d34b919");
		assert.equal(novemberMemoryJudgmentResearchCheckedAt, "2026-11-08T07:00:32.090Z");
		assert.equal(novemberMemoryJudgmentClaims.length, 20);
		assert.ok(novemberMemoryJudgmentClaims.every(claim => claim.searchCutoffAt === novemberMemoryJudgmentResearchCheckedAt));
		const citations = novemberMemoryJudgmentClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 70);
		assert.equal(new Set(citations.filter(source => source.doi).map(source => source.doi!.toLowerCase())).size, 69);
		assert.equal(citations.filter(source => !source.doi).length, 1);
		assert.equal(new Set(novemberMemoryJudgmentClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 20);
	});
	it("retains the facial-expression correction and verified historical memory identifiers", () => {
		const citations = novemberMemoryJudgmentClaims.flatMap(claim => claim.sources);
		const corrected = citations.find(source => source.doi === "10.1177/1529100619832930")!;
		assert.equal(corrected.citationStatus, "corrected");
		assert.ok(corrected.statusSources?.includes("https://doi.org/10.1177/1529100619889954"));
		assert.match(corrected.note!, /image attribution, Action Unit labels and replacement images/u);
		assert.ok(citations.some(source => source.doi === "10.1037/h0101798"));
		assert.ok(citations.some(source => source.doi === "10.1037/0096-3445.114.1.1"));
		assert.equal(citations.some(source => source.doi === "10.1016/j.jarmac.2014.03.005"), false);
		const historical = citations.find(source => source.doi?.includes("517::aid-mar5"))!;
		assert.ok(historical.url?.includes("%3C517::aid-mar5%3E"));
		assert.ok(historical.statusSources?.every(url => !/[<>]/u.test(url)));
	});
	it("uses journal years and separates published syntheses from preprints or author summaries", () => {
		const citations = novemberMemoryJudgmentClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1111/jopy.12898", 2024],
			["10.1073/pnas.2416709121", 2025],
			["10.1016/j.neubiorev.2021.10.038", 2022],
			["10.1017/bpp.2022.24", 2025],
			["10.1016/j.socec.2020.101629", 2021],
			["10.1177/1745691620919358", 2022],
			["10.1111/jopy.12683", 2022],
			["10.1257/jel.20221698", 2024],
			["10.1017/bpp.2018.43", 2019]
		] as const) assert.equal(citations.find(source => source.doi === doi)?.year, year);
		const summary = citations.find(source => !source.doi)!;
		assert.equal(summary.kind, "technical_reference");
		assert.equal(summary.url, "https://www.apa.org/pubs/highlights/spotlight/issue-239");
		assert.match(summary.note!, /Author-written APA summary.*not an independent new study/u);
		assert.equal(citations.some(source => source.doi === "10.1037/bul0000356"), false);
	});
	it("preserves replication limits, shared samples and the distinction between coefficients and accuracy", () => {
		const citations = novemberMemoryJudgmentClaims.flatMap(claim => claim.sources);
		assert.match(citations.find(source => source.doi === "10.1111/jopy.12898")!.note!, /same digital-intervention cohort, not an independent trial.*157 at one year/u);
		assert.match(citations.find(source => source.doi === "10.1002/jcpy.1156")!.note!, /Primary research.*rather than a meta-analysis/u);
		assert.match(citations.find(source => source.doi === "10.1257/jel.20221698")!.note!, /not a universal ratio of emotional pain/u);
		assert.match(citations.find(source => source.doi === "10.5334/spo.101")!.note!, /does not establish a stress-by-practice interaction/u);
		assert.match(citations.find(source => source.doi === "10.1111/jopy.12683")!.note!, /total sample is not job-only/u);
		const selfAssessment = novemberMemoryJudgmentClaims.find(claim => claim.slug === "how-accurate-are-peoples-self-assessments-of-their-abilities")!;
		assert.match(selfAssessment.stableCore.join(" "), /not a claim that people are 29% accurate/u);
	});
	it("keeps symptom ratings, neutral controls and actual outcomes distinct", () => {
		const placebo = novemberMemoryJudgmentClaims.find(claim => claim.slug === "can-openly-labeled-placebos-improve-symptoms")!;
		assert.equal(placebo.consensusBand, "mixed");
		assert.equal(placebo.evidenceCertainty, "low");
		assert.match(placebo.stableCore.join(" "), /search ended in November 2023.*high risk of bias/u);
		assert.match(placebo.bottomLine, /replace effective care/u);
		const posture = novemberMemoryJudgmentClaims.find(claim => claim.slug === "can-a-power-pose-increase-confidence")!;
		assert.equal(posture.consensusBand, "mixed");
		assert.match(posture.bottomLine, /beyond a neutral posture is weaker/u);
		const defaults = novemberMemoryJudgmentClaims.find(claim => claim.slug === "do-default-options-change-peoples-choices")!;
		assert.match(defaults.stableCore.join(" "), /registration.*without a significant increase in actual test-taking/u);
		const advertising = novemberMemoryJudgmentClaims.find(claim => claim.slug === "can-subliminal-advertising-influence-peoples-choices")!;
		assert.equal(advertising.evidenceCertainty, "low");
		assert.match(advertising.exclusionRules!.join(" "), /Brief presentation alone does not demonstrate lack of awareness/u);
	});
	it("seals twenty-five animal-welfare questions with distinct scopes and source designs", () => {
		assert.equal(readerExpansionValueHash(novemberAnimalWelfareClaims), "8b68c8b2b45969145dcbca85bd60e9f4ce131a394ab0b4ef23ae89eb058aa23b");
		assert.equal(novemberAnimalWelfareResearchCheckedAt, "2026-11-08T05:26:26.126Z");
		assert.equal(novemberAnimalWelfareClaims.length, 25);
		assert.ok(novemberAnimalWelfareClaims.every(claim => claim.searchCutoffAt === novemberAnimalWelfareResearchCheckedAt));
		assert.equal(new Set(novemberAnimalWelfareClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 25);
		assert.equal(novemberAnimalWelfareClaims.filter(claim => claim.consensusBand === "mixed").length, 7);
		assert.equal(novemberAnimalWelfareClaims.filter(claim => claim.consensusBand === "unclear").length, 1);
		assert.equal(novemberAnimalWelfareClaims.filter(claim => claim.evidenceCertainty === "low").length, 11);
		const citations = novemberAnimalWelfareClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 78);
		assert.equal(new Set(citations.filter(source => source.doi).map(source => source.doi!.toLowerCase())).size, 73);
		assert.equal(new Set(citations.filter(source => !source.doi).map(source => source.url)).size, 2);
		assert.ok(citations.every(source => source.appraisal === "not_appraised"));
		assert.ok(citations.every(source => !/discovery record|earlier draft|this update|this page|generated takeaway/iu.test(source.note!)));
	});
	it("retains the substantive puppy and cattle corrections and fish attribution notice", () => {
		const citations = novemberAnimalWelfareClaims.flatMap(claim => claim.sources);
		for (const [doi, notice] of [
			["10.3390/ani12212895", "10.3390/ani13010081"],
			["10.3389/fvets.2025.1610084", "10.3389/fvets.2025.1743906"],
			["10.3389/fvets.2022.788289", "10.3389/fvets.2022.948567"]
		] as const) {
			const source = citations.find(citation => citation.doi === doi)!;
			assert.equal(source.citationStatus, "corrected");
			assert.ok(source.statusSources?.includes(`https://doi.org/${notice}`));
		}
		const puppy = novemberAnimalWelfareClaims.find(claim => claim.slug === "can-puppy-socialization-prevent-later-aggression")!;
		assert.equal(puppy.consensusBand, "mixed");
		assert.match(puppy.stableCore.join(" "), /no protective advantage.*later first exposure.*does not establish that delaying/u);
		const cattle = novemberAnimalWelfareClaims.find(claim => claim.slug === "how-does-prolonged-cow-calf-contact-affect-welfare")!;
		assert.match(cattle.stableCore.join(" "), /overall heifer difference was not statistically established/u);
		assert.match(citations.find(source => source.doi === "10.3389/fvets.2022.788289")!.note!, /attribution.*research leadership/u);
	});
	it("keeps animal journal years distinct from DOI and online-first years", () => {
		const citations = novemberAnimalWelfareClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1016/j.beproc.2014.12.010", 2015],
			["10.1007/s10071-021-01557-6", 2022],
			["10.1098/rsbl.2015.0883", 2016],
			["10.1177/1098612x211013741", 2022],
			["10.3389/fvets.2020.599284", 2021],
			["10.1177/1098612x17705044", 2018],
			["10.3168/jds.2024-25159", 2025],
			["10.3168/jds.2020-19968", 2021],
			["10.1016/j.psj.2020.11.041", 2021],
			["10.1186/s13028-023-00716-8", 2024],
			["10.1111/faf.12010", 2014],
			["10.1016/j.applanim.2006.05.041", 2007]
		] as const) assert.equal(citations.find(source => source.doi === doi)?.year, year);
	});
	it("distinguishes animal experiments from protocols, clustered units and repeated samples", () => {
		const citations = novemberAnimalWelfareClaims.flatMap(claim => claim.sources);
		assert.equal(citations.some(source => source.doi === "10.1371/journal.pone.0247321"), false);
		assert.equal(citations.some(source => source.doi === "10.1093/cz/zoab045"), false);
		assert.match(citations.find(source => source.doi === "10.3389/fvets.2020.00508")!.note!, /same 63 dogs.*not independent replications/u);
		assert.match(citations.find(source => source.doi === "10.1073/pnas.2421752122")!.note!, /not wholly independent replication/u);
		const litter = citations.find(source => source.doi === "10.1016/j.psj.2026.106907")!;
		assert.match(litter.note!, /two rooms, one per condition.*confounding room with treatment/u);
		assert.match(citations.find(source => source.doi === "10.1038/s41598-025-16288-8")!.note!, /not eight independent randomized/u);
	});
	it("retains competing attachment and housing evidence without collapsing welfare outcomes", () => {
		const attachment = novemberAnimalWelfareClaims.find(claim => claim.slug === "do-cats-form-attachment-bonds-with-people")!;
		assert.equal(attachment.consensusBand, "mixed");
		assert.equal(attachment.sources.filter(source => source.stance === "debate").length, 2);
		const hiding = novemberAnimalWelfareClaims.find(claim => claim.slug === "do-hiding-places-reduce-stress-in-shelter-cats")!;
		assert.match(hiding.stableCore.join(" "), /did not prevent weight loss/u);
		const horse = novemberAnimalWelfareClaims.find(claim => claim.slug === "does-social-contact-improve-horse-welfare")!;
		assert.match(horse.stableCore.join(" "), /more superficial injuries.*no major overall advantage/u);
		const octopus = novemberAnimalWelfareClaims.find(claim => claim.slug === "is-there-evidence-that-octopuses-are-sentient")!;
		assert.match(octopus.exclusionRules!.join(" "), /not a 75% probability/u);
		const declaration = octopus.sources.find(source => !source.doi)!;
		assert.equal(declaration.kind, "consensus_statement");
		assert.match(declaration.note!, /personally rather than for their institutions.*neither a prevalence survey/u);
	});
	it("seals twelve food-pattern questions without changing prior source cohorts", () => {
		assert.equal(readerExpansionValueHash(novemberFoodPatternsClaims), "57870b77a71ee56f062812257b3e7230457a1655e3f8c7028a1a418ef8d48bdc");
		assert.equal(novemberFoodPatternsResearchCheckedAt, "2026-11-07T15:13:31.158Z");
		assert.ok(novemberFoodPatternsClaims.every(claim => claim.searchCutoffAt === novemberFoodPatternsResearchCheckedAt));
		assert.equal(novemberFoodPatternsClaims.length, 12);
		const citations = novemberFoodPatternsClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 41);
		assert.equal(new Set(citations.filter(source => source.doi).map(source => source.doi!.toLowerCase())).size, 39);
		assert.equal(citations.filter(source => !source.doi).length, 2);
		assert.equal(new Set(novemberFoodPatternsClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 12);
		assert.equal(novemberFoodPatternsClaims.filter(claim => claim.consensusBand === "mixed").length, 4);
		assert.equal(novemberFoodPatternsClaims.filter(claim => claim.evidenceCertainty === "low").length, 6);
	});
	it("uses food-source journal years and leaves undated safety references undated", () => {
		const citations = novemberFoodPatternsClaims.flatMap(claim => claim.sources);
		for (const [doi, year] of [
			["10.1111/obr.13537", 2023],
			["10.1016/j.ajcnut.2025.11.012", 2026],
			["10.1080/27697061.2022.2161664", 2023],
			["10.1016/j.clnesp.2022.12.019", 2023],
			["10.1093/advances/nmaa113", 2021],
			["10.1080/10408398.2018.1514486", 2020],
			["10.1017/s0007114522000903", 2023],
			["10.1093/advances/nmab112", 2022],
			["10.14309/ajg.0000000000001036", 2021]
		] as const) assert.equal(citations.find(source => source.doi === doi)?.year, year);
		for (const source of citations.filter(source => !source.doi)) {
			assert.equal(Object.hasOwn(source, "year"), false);
			assert.equal(source.citationCheckedAt, novemberFoodPatternsResearchCheckedAt);
		}
	});
	it("retains the inspected low-GI correction and endpoint-specific comparison count", () => {
		const claim = novemberFoodPatternsClaims.find(claim => claim.slug === "do-low-glycemic-index-diets-improve-diabetes-control")!;
		const source = claim.sources.find(source => source.doi === "10.1136/bmj.n1651")!;
		assert.equal(source.citationStatus, "corrected");
		assert.ok(source.statusSources?.includes("https://doi.org/10.1136/bmj.n2114"));
		assert.match(source.note!, /22 comparisons and 1,502 participants/u);
		assert.match(source.note!, /blood-pressure dose-response wording and a GRADE figure label/u);
		assert.match(claim.bottomLine, /average blood sugar, measured by HbA1c/u);
		assert.match(claim.stableCore.join(" "), /twenty-two trial comparisons.*0\.31 percentage points/u);
	});
	it("separates earlier timing, eating windows and meal-frequency energy comparisons", () => {
		const timing = novemberFoodPatternsClaims.find(claim => claim.slug === "does-eating-earlier-in-the-day-help-with-weight-control")!;
		assert.equal(timing.consensusBand, "mixed");
		assert.match(timing.exclusionRules!.join(" "), /isolated clock-time.*long-term fat loss/u);
		assert.match(timing.sources.find(source => source.doi === "10.1016/j.numecd.2026.104878")!.note!, /seven lasted two to twelve weeks.*crossed the null/u);
		const frequency = novemberFoodPatternsClaims.find(claim => claim.slug === "does-meal-frequency-affect-weight-loss")!;
		assert.match(frequency.sources.find(source => source.doi === "10.1039/d1fo00484k")!.note!, /within-group.*not evidence of a between-group/u);
		assert.match(frequency.exclusionRules!.join(" "), /breakfast omission.*total calories/u);
	});
	it("distinguishes slow-eating instructions, food texture and lasting weight outcomes", () => {
		const claim = novemberFoodPatternsClaims.find(claim => claim.slug === "does-eating-more-slowly-reduce-how-much-people-eat")!;
		assert.match(claim.sources.find(source => source.doi === "10.1016/j.ajcnut.2025.11.012")!.note!, /41 completers.*Body weight did not differ/u);
		assert.match(claim.sources.find(source => source.doi === "10.1016/j.eatbeh.2023.101701")!.note!, /not described here as randomized/u);
		assert.match(claim.bottomLine, /not yet shown dependable long-term weight loss/u);
	});
	it("keeps leucine matching and particular plant proteins distinct from equal protein doses", () => {
		const claim = novemberFoodPatternsClaims.find(claim => claim.slug === "can-plant-protein-support-muscle-gains-as-well-as-animal-protein")!;
		assert.equal(claim.consensusBand, "mixed");
		assert.match(claim.sources.find(source => source.doi === "10.3390/ijerph17113871")!.note!, /leucine, not for grams of protein.*soy group received more protein/u);
		assert.match(claim.sources.find(source => source.doi === "10.1093/nutrit/nuae200")!.note!, /no trial tested sarcopenia/u);
		assert.match(claim.exclusionRules!.join(" "), /equal grams of protein.*long-term strength gains/u);
	});
	it("retains dated US and UK probiotic positions and material vulnerability warnings", () => {
		const claim = novemberFoodPatternsClaims.find(claim => claim.slug === "do-probiotics-improve-irritable-bowel-syndrome-symptoms")!;
		assert.equal(claim.sources.length, 5);
		assert.ok(claim.sources.some(source => source.doi === "10.14309/ajg.0000000000001036" && source.stance === "debate"));
		assert.ok(claim.sources.some(source => source.doi === "10.1136/gutjnl-2021-324598" && source.year === 2021));
		assert.ok(claim.sources.some(source => source.url === "https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety"));
		assert.equal(claim.sources.some(source => source.doi === "10.1053/j.gastro.2023.07.018"), false);
		assert.match(claim.uncertaintySummary!, /severe illness or impaired immunity/u);
		assert.match(claim.exclusionRules!.join(" "), /antibiotic-associated diarrhea.*No product preparation or dosing protocol/u);
	});
	it("preserves food tolerability, safety references and the actual-portion distinction", () => {
		const fiber = novemberFoodPatternsClaims.find(claim => claim.slug === "does-fiber-supplementation-help-chronic-constipation")!;
		assert.equal(fiber.evidenceCertainty, "low");
		assert.ok(fiber.sources.some(source => source.url === "https://medlineplus.gov/druginfo/meds/a601104.html"));
		assert.match(fiber.uncertaintySummary!, /Swallowing difficulty, possible obstruction/u);
		const nuts = novemberFoodPatternsClaims.find(claim => claim.slug === "does-eating-nuts-cause-weight-gain")!;
		assert.match(nuts.uncertaintySummary!, /relevant allergy/u);
		const portion = novemberFoodPatternsClaims.find(claim => claim.slug === "do-smaller-served-portions-reduce-daily-food-intake")!;
		assert.match(portion.sources.find(source => source.doi === "10.3390/nu13061978")!.note!, /smaller plates alone had little clear effect/u);
	});
	it("separates calorie selection, consumption and eating-disorder causal claims", () => {
		const claim = novemberFoodPatternsClaims.find(claim => claim.slug === "do-menu-calorie-labels-change-what-people-order")!;
		assert.match(claim.bottomLine, /selected or purchased.*actually eat are less certain/u);
		assert.match(claim.sources.find(source => source.doi === "10.1002/14651858.cd014845.pub2")!.note!, /2023 update was not fully integrated/u);
		assert.match(claim.sources.find(source => source.doi === "10.3390/dietetics4010004")!.note!, /does not establish that labeling caused population/u);
		assert.match(claim.exclusionRules!.join(" "), /alcoholic drinks.*hypothetical orders.*every country's law/u);
	});
	it("keeps private food-research revision commentary out of public source notes", () => {
		const citations = novemberFoodPatternsClaims.flatMap(claim => claim.sources);
		assert.ok(citations.every(source => !/discovery record|earlier draft|this update|this page|not reproduced|adopted here/iu.test(source.note!)));
	});
	it("seals eight exercise and recovery questions with distinct scopes and retained uncertainty", () => {
		assert.equal(readerExpansionValueHash(novemberExerciseRecoveryClaims), "9bdeec46b4bfa637b843f6d8d006a55e95b5fb9f7b4ef5589c51b9e882802c3a");
		assert.equal(novemberExerciseRecoveryResearchCheckedAt, "2026-11-07T12:37:29.000Z");
		assert.ok(novemberExerciseRecoveryClaims.every(claim => claim.searchCutoffAt === novemberExerciseRecoveryResearchCheckedAt));
		const citations = novemberExerciseRecoveryClaims.flatMap(claim => claim.sources);
		assert.equal(citations.length, 25);
		assert.equal(new Set(citations.map(source => source.doi?.toLowerCase())).size, 25);
		assert.equal(new Set(novemberExerciseRecoveryClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 8);
		assert.equal(novemberExerciseRecoveryClaims.filter(claim => claim.consensusBand === "mixed").length, 6);
		assert.equal(novemberExerciseRecoveryClaims.filter(claim => claim.evidenceCertainty === "low").length, 5);
	});
	it("preserves the massage figure correction and completed Cochrane version", () => {
		const citations = novemberExerciseRecoveryClaims.flatMap(claim => claim.sources);
		const massage = citations.find(source => source.doi === "10.1136/bmjsem-2019-000614")!;
		assert.equal(massage.citationStatus, "corrected");
		assert.ok(massage.statusSources?.includes("https://doi.org/10.1136/bmjsem-2019-000614corr1"));
		assert.match(massage.note!, /correction replaces Figure 3/u);
		assert.equal(citations.find(source => source.doi === "10.1002/14651858.cd004577.pub3")!.year, 2011);
		assert.equal(citations.find(source => source.doi === "10.1007/s40279-019-01205-7")!.year, 2020);
		assert.equal(citations.find(source => source.doi === "10.1002/msc.1667")!.year, 2023);
		assert.equal(citations.find(source => source.doi === "10.1080/15438627.2021.1989432")!.year, 2023);
	});
	it("retains conflicting recovery evidence without treating symptom changes as muscle repair", () => {
		const foam = novemberExerciseRecoveryClaims.find(claim => claim.slug === "does-foam-rolling-improve-recovery-after-exercise")!;
		assert.equal(foam.sources.length, 4);
		assert.ok(foam.sources.some(source => source.doi === "10.1016/j.jbmt.2023.04.016" && source.stance === "debate"));
		assert.ok(foam.sources.some(source => source.doi === "10.1016/j.jbmt.2024.10.009" && source.stance === "supports"));
		assert.match(foam.exclusionRules!.join(" "), /not proof of tissue repair/u);
		const compression = novemberExerciseRecoveryClaims.find(claim => claim.slug === "do-compression-garments-speed-recovery-after-exercise")!;
		assert.match(compression.sources.find(source => source.doi === "10.3389/fphys.2026.1908148")!.note!, /crossed the null.*very low/u);
		assert.ok(compression.sources.some(source => source.doi === "10.1007/s40279-022-01681-4" && source.stance === "debate"));
	});
	it("keeps clinical importance, follow-up and Pilates quality-of-life outcomes separate", () => {
		const pilates = novemberExerciseRecoveryClaims.find(claim => claim.slug === "is-pilates-better-than-other-exercise-for-chronic-low-back-pain")!;
		const trial = pilates.sources.find(source => source.doi === "10.1177/02692155241277041")!;
		assert.match(trial.note!, /pain and disability.*not clinically relevant/u);
		assert.match(trial.note!, /quality-of-life utility benefit was clinically relevant/u);
		assert.match(pilates.exclusionRules!.join(" "), /acute, structural or neurological cause/u);
		const stretching = novemberExerciseRecoveryClaims.find(claim => claim.slug === "does-stretching-after-exercise-prevent-muscle-soreness")!;
		assert.match(stretching.exclusionRules!.join(" "), /does not establish exact equivalence/u);
	});
	it("separates measured falls and active cool-down from proxy and subgroup claims", () => {
		const taiChi = novemberExerciseRecoveryClaims.find(claim => claim.slug === "can-tai-chi-help-prevent-falls-in-older-adults")!;
		assert.match(taiChi.sources.find(source => source.doi === "10.1001/jamainternmed.2018.3915")!.note!, /670.*Repeated falls differ from the number of people/u);
		assert.match(taiChi.inclusionRules!.join(" "), /separately from balance proxies and general multicomponent/u);
		const active = novemberExerciseRecoveryClaims.find(claim => claim.slug === "is-an-active-cool-down-better-than-resting-after-exercise")!;
		assert.match(active.exclusionRules!.join(" "), /Blood-lactate clearance is not a direct measure/u);
		assert.match(active.sources.find(source => source.doi === "10.3390/sports13100343")!.note!, /not 41 trials of active cool-down/u);
	});
	it("distinguishes sham-controlled tape effects from adjunct care and overlapping reviews", () => {
		const tape = novemberExerciseRecoveryClaims.find(claim => claim.slug === "does-kinesiology-tape-relieve-musculoskeletal-pain")!;
		assert.equal(tape.evidenceCertainty, "low");
		assert.match(tape.bottomLine!, /Skin irritation/u);
		assert.match(tape.exclusionRules!.join(" "), /review registrations are not completed independent trials/u);
		assert.match(tape.sources.find(source => source.doi === "10.1016/j.physio.2019.04.001")!.note!, /tape alone with sham tape/u);
		assert.match(tape.sources.find(source => source.doi === "10.1136/bmjebm-2025-114067")!.note!, /very-low-certainty/u);
	});
	it("seals eight distinct river and landscape reviews with their actual research cutoff", () => {
		assert.equal(readerExpansionValueHash(novemberRiverLandscapeClaims), "aa45716f29f50b9ba3d61d3a4a740bb8024c73bd6a274fbf4e632437cbc9bd19");
		assert.equal(novemberRiverLandscapeResearchCheckedAt, "2026-11-07T11:52:51.000Z");
		assert.ok(novemberRiverLandscapeClaims.every(claim => claim.searchCutoffAt === novemberRiverLandscapeResearchCheckedAt));
		assert.ok(novemberRiverLandscapeClaims.every(claim => claim.sources.length === 3));
		assert.equal(new Set(novemberRiverLandscapeClaims.flatMap(claim => claim.sources.map(source => source.doi?.toLowerCase()))).size, 24);
		assert.equal(new Set(novemberRiverLandscapeClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 8);
		assert.equal(novemberRiverLandscapeClaims.filter(claim => claim.consensusBand === "mixed").length, 4);
	});
	it("preserves canonical URLs for legacy DOI characters and the coral licensing notice", () => {
		const citations = novemberRiverLandscapeClaims.flatMap(claim => claim.sources);
		const historical = citations.find(source => source.doi === "10.1577/1548-8446(1997)022<0017:darirf>2.0.co;2")!;
		assert.equal(historical.url, "https://doi.org/10.1577/1548-8446(1997)022%3C0017:darirf%3E2.0.co;2");
		assert.ok(historical.statusSources?.includes(historical.url));
		assert.equal(decodeURIComponent(new URL(historical.url!).pathname.slice(1)), historical.doi);
		const corrected = citations.filter(source => source.citationStatus === "corrected");
		assert.equal(corrected.length, 1);
		assert.equal(corrected[0].doi, "10.1038/s41559-025-02667-x");
		assert.ok(corrected[0].statusSources?.includes("https://doi.org/10.1038/s41559-025-02758-9"));
		assert.match(corrected[0].note!, /licensing to open access.*does not report a scientific-result correction/u);
		assert.equal(citations.find(source => source.doi === "10.1002/hyp.14017")!.year, 2021);
		assert.equal(citations.find(source => source.doi === "10.1111/1365-2664.70396")!.year, 2026);
	});
	it("separates beaver flow attenuation from flood protection and fish access from complete recovery", () => {
		const beaver = novemberRiverLandscapeClaims.find(claim => claim.slug === "do-beaver-dams-slow-flood-flows")!;
		assert.match(beaver.bottomLine!, /raising water levels locally/u);
		assert.match(beaver.sources.find(source => source.doi === "10.1002/hyp.14735")!.note!, /could not confidently detect.*most extreme rainfall/u);
		assert.match(beaver.exclusionRules!.join(" "), /overlapping publications.*independent landscapes/u);
		const fish = novemberRiverLandscapeClaims.find(claim => claim.slug === "does-dam-removal-help-migratory-fish")!;
		assert.match(fish.stableCore.join(" "), /does not guarantee that every population fully recovers/u);
		assert.match(fish.sources.find(source => source.doi === "10.1002/mcf2.10227")!.note!, /combined dam removal with passage improvements/u);
	});
	it("retains production, species and ecological-function trade-offs in restoration answers", () => {
		const reefs = novemberRiverLandscapeClaims.find(claim => claim.slug === "do-artificial-reefs-increase-fish-populations")!;
		assert.equal(reefs.consensusBand, "mixed");
		assert.match(reefs.exclusionRules!.join(" "), /not a direct measure of net regional production/u);
		const hedges = novemberRiverLandscapeClaims.find(claim => claim.slug === "do-hedgerows-help-farmland-wildlife")!;
		assert.match(hedges.sources.find(source => source.doi === "10.1002/eap.2959")!.note!, /negative associations.*open-grassland.*intact-forest/u);
		const rewilding = novemberRiverLandscapeClaims.find(claim => claim.slug === "does-rewilding-improve-biodiversity")!;
		assert.match(rewilding.sources.find(source => source.doi === "10.1016/j.biocon.2023.110005")!.note!, /lower woody-plant diversity and carbon.*more ground-dwelling arthropod/u);
		assert.match(rewilding.sources.find(source => source.doi === "10.1016/j.jenvman.2025.124360")!.note!, /neither the share of independent projects.*expert agreement/u);
	});
	it("preserves buffer-scale limits and the invasive-revegetation comparator", () => {
		const buffers = novemberRiverLandscapeClaims.find(claim => claim.slug === "do-river-buffer-strips-reduce-farm-runoff-pollution")!;
		assert.match(buffers.bottomLine!, /Water that bypasses the strip/u);
		assert.match(buffers.sources.find(source => source.doi === "10.1002/hyp.14733")!.note!, /establishment-phase.*not mature buffers/u);
		const plants = novemberRiverLandscapeClaims.find(claim => claim.slug === "does-removing-invasive-plants-restore-native-vegetation")!;
		assert.match(plants.sources.find(source => source.doi === "10.1111/1365-2664.70396")!.note!, /comparator already received invasive removal/u);
		assert.match(plants.sources.find(source => source.doi === "10.1016/j.jenvman.2024.120216")!.note!, /Diversity within plots rose while diversity across plots/u);
	});
	it("keeps local coral function recovery separate from complete recovery and forecast risk", () => {
		const coral = novemberRiverLandscapeClaims.find(claim => claim.slug === "can-coral-restoration-rebuild-damaged-reefs")!;
		assert.equal(coral.consensusBand, "mixed");
		assert.match(coral.sources.find(source => source.doi === "10.1016/j.cub.2024.02.009")!.note!, /communities differed from healthy reference reefs/u);
		assert.match(coral.exclusionRules!.join(" "), /Projected bleaching risk is distinct from observed future failure/u);
		assert.match(coral.sources.find(source => source.doi === "10.1371/journal.pone.0226631")!.note!, /grey literature and practitioner reports/u);
	});
	it("seals eleven distinct conservation reviews with their actual research cutoff", () => {
		assert.equal(readerExpansionValueHash(novemberEcologyConservationClaims), "b5439504065657568da318099a3cd4bd1bb96fcbda896f86d54cc171675c87f4");
		assert.equal(novemberEcologyConservationResearchCheckedAt, "2026-11-07T10:15:00.579Z");
		assert.ok(novemberEcologyConservationClaims.every(claim => claim.searchCutoffAt === novemberEcologyConservationResearchCheckedAt));
		assert.ok(novemberEcologyConservationClaims.every(claim => claim.sources.length === 3));
		assert.equal(new Set(novemberEcologyConservationClaims.flatMap(claim => claim.sources.map(source => source.doi?.toLowerCase()))).size, 33);
		assert.equal(new Set(novemberEcologyConservationClaims.map(claim => JSON.stringify(claim.exclusionRules))).size, 11);
		assert.equal(novemberEcologyConservationClaims.filter(claim => claim.consensusBand === "mixed").length, 5);
	});

	it("preserves the seagrass data-accessibility correction and canonical publication years", () => {
		const claim = novemberEcologyConservationClaims.find(claim => claim.slug === "can-seagrass-restoration-rebuild-lost-meadows")!;
		const source = claim.sources.find(source => source.doi === "10.1111/1365-2664.12562")!;
		assert.equal(source.citationStatus, "corrected");
		assert.equal(source.year, 2016);
		assert.ok(source.statusSources?.includes("https://doi.org/10.1111/1365-2664.13428"));
		assert.match(source.note!, /2019 corrigendum corrects the data-accessibility DOI/u);
		const whale = novemberEcologyConservationClaims.find(claim => claim.slug === "does-slowing-ships-reduce-whale-strike-risk")!;
		assert.equal(whale.sources.find(source => source.doi === "10.3389/fmars.2024.1467387")!.year, 2025);
	});

	it("retains lower bee richness and the inconclusive formal bird-window comparison", () => {
		const mowing = novemberEcologyConservationClaims.find(claim => claim.slug === "does-mowing-less-help-pollinators")!;
		assert.equal(mowing.consensusBand, "mixed");
		assert.match(mowing.sources.find(source => source.doi === "10.1016/j.biocon.2018.01.025")!.note!, /most bees but the lowest bee richness/u);
		assert.match(mowing.sources.find(source => source.doi === "10.1111/icad.70148")!.note!, /followed by losses/u);
		const windows = novemberEcologyConservationClaims.find(claim => claim.slug === "can-window-treatments-reduce-bird-collisions")!;
		assert.match(windows.sources.find(source => source.doi === "10.1093/ornithapp/duag047")!.note!, /formal treatment-by-period interaction was not significant/u);
		assert.match(windows.exclusionRules!.join(" "), /nonsignificant formal treatment comparison/u);
	});

	it("distinguishes passage use from roadkill and modeled whale risk from observed deaths", () => {
		const crossing = novemberEcologyConservationClaims.find(claim => claim.slug === "do-wildlife-crossings-reduce-roadkill")!;
		assert.match(crossing.bottomLine!, /effective fencing/u);
		assert.match(crossing.sources.find(source => source.doi === "10.1016/j.pecon.2026.02.012")!.note!, /roadkill persisted/u);
		assert.match(crossing.inclusionRules!.join(" "), /separately from movement through general habitat corridors/u);
		const whale = novemberEcologyConservationClaims.find(claim => claim.slug === "does-slowing-ships-reduce-whale-strike-risk")!;
		assert.match(whale.sources.find(source => source.doi === "10.1890/es13-00004.1")!.note!, /modeled, not counts of observed deaths/u);
		assert.match(whale.sources.find(source => source.doi === "10.3354/esr01056")!.note!, /predictions, not directly counted/u);
	});

	it("retains peatland counterfactuals and separate coastal-protection outcomes", () => {
		const peat = novemberEcologyConservationClaims.find(claim => claim.slug === "does-rewetting-peatland-help-the-climate")!;
		assert.equal(peat.consensusBand, "mixed");
		assert.match(peat.sources.find(source => source.doi === "10.1007/s13280-025-02225-6")!.note!, /warmed the climate relative to continued forestry/u);
		assert.match(peat.exclusionRules!.join(" "), /actual warming path/u);
		const oyster = novemberEcologyConservationClaims.find(claim => claim.slug === "can-oyster-reefs-protect-shorelines-from-erosion")!;
		assert.match(oyster.sources.find(source => source.doi === "10.1002/eap.2382")!.note!, /Wave height and energy are different/u);
		assert.match(oyster.exclusionRules!.join(" "), /hurricanes or long-term property loss/u);
	});

	it("preserves ecological study populations and separates proxies from recovery", () => {
		const claim = (slug: string) => novemberEcologyConservationClaims.find(claim => claim.slug === slug)!;
		assert.match(claim("do-native-garden-plants-support-more-wildlife").sources.find(source => source.doi === "10.1073/pnas.1809259115")!.note!, /not a universal rule/u);
		assert.match(claim("do-fish-survive-catch-and-release-fishing").exclusionRules!.join(" "), /transfer and tank holding/u);
		assert.match(claim("does-urban-beekeeping-help-wild-bees").uncertaintySummary!, /observational/u);
		assert.match(claim("does-nighttime-lighting-harm-wild-insects").misconceptions!.join(" "), /Warm-colored light/u);
		assert.match(claim("can-seagrass-restoration-rebuild-lost-meadows").sources.find(source => source.doi === "10.1016/j.jenvman.2026.130094")!.note!, /Most studied Z\. marina/u);
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
