import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { defaultClaims } from "../src/data/claims.js";
import { buildSeedClaimUpdate } from "../src/data/seedClaims.js";
import { defaultTopics } from "../src/data/topics.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { CLAIM_SOURCE_TITLE_MAX_LENGTH, ClaimSource } from "../src/models/schemas/ClaimSource.js";

const launchSensitiveClaimSlugs = [
	"do-childhood-vaccines-cause-autism",
	"does-the-mmr-vaccine-cause-autism",
	"do-mrna-covid-19-vaccines-change-your-dna",
	"do-covid-19-vaccines-cause-infertility",
	"are-covid-19-vaccines-safe-and-beneficial-during-pregnancy-and-breastfeeding",
	"how-big-is-the-myocarditis-risk-after-mrna-covid-19-vaccination",
	"is-recent-global-warming-mainly-caused-by-human-activity",
	"is-the-sun-causing-recent-global-warming",
	"do-volcanoes-emit-more-co2-than-humans",
	"is-there-a-scientific-consensus-that-humans-are-causing-climate-change",
	"does-antibiotic-overuse-drive-antibiotic-resistance",
	"is-evolution-just-a-theory",
	"is-nuclear-power-more-dangerous-than-fossil-fuel-energy"
];

const july2026ExpansionSlugs = [
	"do-routine-childhood-vaccines-overwhelm-or-weaken-the-immune-system",
	"does-induced-abortion-increase-breast-cancer-risk",
	"does-vasectomy-cause-prostate-cancer",
	"does-bariatric-surgery-reduce-mortality-and-major-cardiovascular-risk-in-severe-obesity",
	"do-long-term-opioids-provide-sustained-benefit-for-chronic-non-cancer-pain",
	"should-menopausal-hormone-therapy-be-used-to-prevent-chronic-disease-in-most-postmenopausal-adults",
	"is-water-vapor-the-main-cause-of-current-global-warming",
	"is-arctic-sea-ice-declining-because-of-human-caused-warming",
	"does-deforestation-significantly-contribute-to-climate-change-and-biodiversity-loss",
	"can-electricity-grids-remain-reliable-with-high-shares-of-wind-and-solar",
	"does-livestock-production-contribute-substantially-to-greenhouse-gas-emissions",
	"do-high-protein-diets-damage-kidney-function-in-healthy-adults",
	"does-a-gluten-free-diet-improve-health-for-people-without-celiac-disease-or-gluten-sensitivity",
	"does-protein-supplementation-improve-muscle-and-strength-gains-during-resistance-training",
	"does-eating-organic-food-clearly-improve-long-term-health-outcomes",
	"do-non-sugar-sweeteners-reliably-help-with-long-term-weight-control",
	"does-psychotherapy-help-adults-with-depression",
	"is-exposure-and-response-prevention-effective-for-obsessive-compulsive-disorder",
	"does-chronic-sleep-loss-worsen-depression-and-anxiety-risk",
	"do-violent-video-games-cause-serious-real-world-violence",
	"does-physical-punishment-improve-child-behavior-without-harmful-effects",
	"can-recovered-memory-techniques-reliably-reveal-accurate-hidden-trauma-memories",
	"are-unapproved-stem-cell-treatments-proven-safe-and-effective-for-most-advertised-conditions",
	"can-genome-or-exome-sequencing-improve-diagnosis-for-children-with-suspected-rare-genetic-disorders",
	"are-multicancer-early-detection-blood-tests-proven-to-reduce-cancer-deaths-in-average-risk-people",
	"are-biosimilars-as-safe-and-effective-as-their-reference-biologic-medicines",
	"can-consumer-microbiome-tests-reliably-diagnose-disease-or-prescribe-personalized-diets",
	"does-evolution-have-a-predetermined-goal-or-always-produce-perfect-organisms",
	"is-evolution-entirely-random",
	"are-socially-defined-human-racial-groups-discrete-biological-subspecies"
];

const august2026ExpansionSlugs = [
	"do-statins-cause-dementia-or-lasting-cognitive-decline",
	"does-the-newborn-vitamin-k-injection-prevent-dangerous-bleeding-and-is-it-safe",
	"does-fecal-microbiota-transplantation-work-for-recurrent-c-difficile-infection",
	"do-simple-febrile-seizures-usually-cause-brain-damage-or-lasting-developmental-problems",
	"do-routine-general-health-checks-reduce-deaths-in-otherwise-healthy-adults",
	"is-the-urban-heat-island-effect-responsible-for-the-observed-global-warming-trend",
	"did-global-warming-stop-after-1998",
	"does-human-caused-climate-change-reduce-crop-yields-and-threaten-food-security",
	"does-thawing-permafrost-amplify-warming-and-does-it-make-runaway-warming-inevitable",
	"is-human-caused-climate-change-worsening-pollen-seasons-in-north-america",
	"does-eating-breakfast-cause-weight-loss-or-boost-metabolism",
	"do-probiotics-prevent-antibiotic-associated-diarrhea",
	"do-vitamin-d-supplements-prevent-fractures-or-falls-in-generally-healthy-adults",
	"does-msg-cause-headaches-or-serious-health-effects-at-typical-dietary-exposure",
	"can-an-alkaline-diet-change-blood-ph-or-treat-cancer",
	"can-polygraph-tests-reliably-detect-lies",
	"does-single-session-psychological-debriefing-prevent-ptsd-after-trauma",
	"do-commercial-brain-training-games-produce-broad-lasting-cognitive-improvements",
	"is-sexual-orientation-conversion-therapy-effective-and-safe",
	"is-neurofeedback-an-established-effective-treatment-for-adhd",
	"does-private-umbilical-cord-blood-banking-benefit-most-families",
	"does-pgt-a-improve-cumulative-live-birth-rates-for-most-ivf-patients",
	"does-tumor-genomic-sequencing-guarantee-an-effective-matched-cancer-therapy",
	"are-polygenic-embryo-screening-scores-clinically-proven-to-improve-childrens-health",
	"can-blood-based-tumor-dna-testing-replace-tissue-biopsy-for-most-cancers",
	"do-publicized-sobriety-checkpoints-reduce-alcohol-related-crashes-and-deaths",
	"does-comprehensive-sexuality-education-increase-teen-sexual-activity",
	"do-school-based-anti-bullying-programs-reduce-bullying",
	"does-secure-firearm-storage-reduce-youth-firearm-injury-and-suicide",
	"do-smoke-free-indoor-laws-reduce-heart-attacks-and-other-cardiovascular-events"
];

const august2026EncyclopediaSlugs = [
	"do-later-school-start-times-improve-adolescent-sleep-and-well-being",
	"does-systematic-phonics-instruction-help-children-learn-to-read",
	"do-smaller-classes-substantially-improve-student-achievement",
	"does-making-a-student-repeat-a-grade-reliably-improve-long-term-outcomes",
	"do-school-uniforms-improve-academic-achievement-or-student-behavior",
	"does-homework-improve-academic-achievement",
	"do-most-healthy-adults-need-at-least-seven-hours-of-sleep",
	"can-weekend-catch-up-sleep-fully-erase-chronic-sleep-debt",
	"does-alcohol-improve-sleep-when-used-as-a-nightcap",
	"does-evening-light-from-screens-delay-sleep",
	"should-habitual-loud-snoring-prompt-evaluation-for-sleep-apnea",
	"does-long-term-night-shift-work-increase-chronic-health-risks",
	"does-physical-activity-below-the-weekly-guideline-still-improve-health",
	"does-supervised-resistance-training-stunt-childrens-growth",
	"can-exercising-one-body-part-selectively-remove-fat-from-that-area",
	"does-static-stretching-before-exercise-prevent-injuries",
	"are-10000-daily-steps-necessary-for-health-benefits",
	"is-creatine-monohydrate-effective-and-generally-safe-for-healthy-adults",
	"does-the-death-penalty-deter-homicide-more-than-long-imprisonment",
	"does-hot-spots-policing-reduce-crime-without-simply-moving-it-nearby",
	"do-police-body-worn-cameras-consistently-reduce-use-of-force-and-complaints",
	"does-trying-juveniles-in-adult-court-reduce-later-offending",
	"is-eyewitness-confidence-a-reliable-measure-of-identification-accuracy",
	"do-cognitive-behavioral-rehabilitation-programs-reduce-reoffending"
];

const titleStopWords = new Set([
	"a",
	"an",
	"and",
	"are",
	"can",
	"do",
	"does",
	"for",
	"in",
	"is",
	"most",
	"of",
	"or",
	"the",
	"to",
	"with"
]);

function titleTokens(title: string) {
	return new Set(
		title
			.toLowerCase()
			.replaceAll(/[^a-z0-9]+/g, " ")
			.trim()
			.split(/\s+/)
			.filter(token => token && !titleStopWords.has(token))
	);
}

function titleSimilarity(left: string, right: string) {
	const leftTokens = titleTokens(left);
	const rightTokens = titleTokens(right);
	const intersection = [...leftTokens].filter(token => rightTokens.has(token)).length;
	const union = new Set([...leftTokens, ...rightTokens]).size;
	return union === 0 ? 0 : intersection / union;
}

function primarySourceLink(source: (typeof defaultClaims)[number]["sources"][number]) {
	return source.url || source.doi || source.pmid || source.pmcid || "";
}

describe("default claim seed quality", () => {
	it("keeps seeded claim slugs globally unique across topics", () => {
		const slugs = defaultClaims.map(claim => claim.slug);
		assert.equal(new Set(slugs).size, slugs.length);
	});

	it("keeps every source-controlled claim within the persistence schema", async () => {
		for (const seed of defaultClaims) {
			const document = new Claim({
				topic: new mongoose.Types.ObjectId(),
				slug: seed.slug,
				...(buildSeedClaimUpdate({}, seed).$set ?? {}),
				lastReviewedAt: new Date(),
				nextReviewAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
				publishedAt: seed.status === "published" ? new Date() : undefined
			});
			await assert.doesNotReject(() => document.validate(), seed.slug);
		}
	});

	it("keeps every published claim complete enough for public claim pages", () => {
		const publishedClaims = defaultClaims.filter(claim => claim.status === "published");

		assert.ok(publishedClaims.length > 0);
		for (const claim of publishedClaims) {
			assert.ok(claim.title.trim(), `${claim.slug} is missing a title`);
			assert.ok(claim.bottomLine.trim(), `${claim.slug} is missing a bottom line`);
			assert.ok(claim.editorSummary.trim(), `${claim.slug} is missing an editor summary`);
			assert.ok(claim.uncertaintySummary.trim(), `${claim.slug} is missing uncertainty summary copy`);
			assert.ok(claim.stableCore.length >= 2, `${claim.slug} needs stable-core bullets`);
			assert.ok(claim.openQuestions.length >= 1, `${claim.slug} needs visible uncertainty limits`);
			assert.ok(claim.evidenceSummaries.length >= 1, `${claim.slug} needs outcome evidence summaries`);
			assert.ok(claim.changeLog.length >= 1, `${claim.slug} needs a public change log`);
			assert.ok(claim.sources.length >= 2, `${claim.slug} needs at least two source rows`);
			assert.ok(
				claim.sources.some(source => source.kind !== "context"),
				`${claim.slug} needs at least one decision-weight source`
			);

			const sourceOrders = claim.sources.map(source => source.order);
			assert.equal(new Set(sourceOrders).size, sourceOrders.length, `${claim.slug} has duplicate source orders`);
			for (const source of claim.sources) {
				assert.ok(source.title.trim(), `${claim.slug} has a source without a title`);
				assert.ok(source.publisher.trim(), `${claim.slug} has a source without a publisher`);
				assert.ok(source.note.trim(), `${claim.slug} has a source without an editorial note`);
				assert.ok(source.order > 0, `${claim.slug} has a source without a positive order`);
				assert.ok(
					primarySourceLink(source),
					`${claim.slug} source "${source.title}" needs a public link or identifier`
				);
			}
		}
	});

	it("keeps public source links free of chat-specific tracking parameters", () => {
		for (const claim of defaultClaims) {
			for (const source of claim.sources) {
				if (!source.url) continue;
				assert.doesNotMatch(
					source.url,
					/[?&]utm_source=chatgpt\b/,
					`${claim.slug} source "${source.title}" exposes a chat-specific tracking parameter`
				);
			}
		}
	});

	it("keeps launch-sensitive claim cards backed by linked source stacks", () => {
		for (const slug of launchSensitiveClaimSlugs) {
			const claim = defaultClaims.find(entry => entry.slug === slug);
			assert.ok(claim, `Missing launch-sensitive claim seed ${slug}`);
			assert.equal(claim.status, "published", `${slug} must stay published for launch`);
			assert.ok(claim.sources.length >= 3, `${slug} must expose at least three sources`);
			assert.ok(
				claim.sources.some(source => source.kind !== "context"),
				`${slug} needs at least one decision-weight source, not only background context`
			);

			assert.ok(claim.sources.every(primarySourceLink), `${slug} must expose only linked source rows`);
		}
	});

	it("publishes the July 2026 expansion as 30 source-backed, cross-topic claim reviews", () => {
		const expansionClaims = july2026ExpansionSlugs.map((slug) => {
			const claim = defaultClaims.find(entry => entry.slug === slug);
			assert.ok(claim, `Missing July 2026 expansion claim ${slug}`);
			return claim;
		});

		assert.equal(new Set(july2026ExpansionSlugs).size, 30);
		assert.equal(expansionClaims.length, 30);
		assert.deepEqual(
			Object.fromEntries(
				[...new Set(expansionClaims.map(claim => claim.topicSlug))]
					.sort()
					.map(topicSlug => [
						topicSlug,
						expansionClaims.filter(claim => claim.topicSlug === topicSlug).length
					])
			),
			{
				"biology-and-evolution": 3,
				"climate-and-environment": 5,
				"genetics-and-biotechnology": 5,
				"health-and-medicine": 6,
				"neuroscience-and-psychology": 6,
				"nutrition-and-diet": 5
			}
		);

		for (const claim of expansionClaims) {
			assert.equal(claim.status, "published", `${claim.slug} must be public`);
			assert.equal(claim.searchCutoffAt, "2026-07-26T12:00:00.000Z");
			assert.equal(claim.lastRetractionCheckAt, "2026-07-26T12:00:00.000Z");
			assert.ok(claim.sources.length >= 3, `${claim.slug} needs at least three sources`);
			assert.ok(
				claim.sources.some(source => source.isAnchor),
				`${claim.slug} needs a visible anchor source`
			);
			assert.ok(
				claim.sources.some(
					source =>
						source.kind === "systematic_review"
						|| source.kind === "meta_analysis"
						|| source.kind === "guideline"
						|| source.kind === "consensus_statement"
				),
				`${claim.slug} needs a synthesis or institutional decision source`
			);
		}
	});

	it("publishes 30 genuinely new August 2026 reviews beyond the 251-claim July baseline", () => {
		const expansionSlugSet = new Set(august2026ExpansionSlugs);
		const expansionClaims = august2026ExpansionSlugs.map((slug) => {
			const claim = defaultClaims.find(entry => entry.slug === slug);
			assert.ok(claim, `Missing August 2026 expansion claim ${slug}`);
			return claim;
		});

		assert.equal(expansionSlugSet.size, 30);
		assert.equal(expansionClaims.length, 30);
		assert.ok(defaultClaims.length >= 281, "The library must retain the 281-claim August milestone");
		assert.deepEqual(
			Object.fromEntries(
				[...new Set(expansionClaims.map(claim => claim.topicSlug))]
					.sort()
					.map(topicSlug => [
						topicSlug,
						expansionClaims.filter(claim => claim.topicSlug === topicSlug).length
					])
			),
			{
				"climate-and-environment": 5,
				"genetics-and-biotechnology": 5,
				"health-and-medicine": 5,
				"neuroscience-and-psychology": 5,
				"nutrition-and-diet": 5,
				"public-policy-and-safety": 5
			}
		);

		assert.ok(defaultTopics.length >= 14);
		const policyTopic = defaultTopics.find(topic => topic.slug === "public-policy-and-safety");
		assert.ok(policyTopic, "The new policy reviews need a visible topic directory");
		assert.equal(policyTopic.order, 14);

		for (const claim of expansionClaims) {
			assert.equal(claim.status, "published", `${claim.slug} must be public`);
			assert.equal(claim.searchCutoffAt, "2026-08-18T12:00:00.000Z");
			assert.equal(claim.lastRetractionCheckAt, "2026-08-18T12:00:00.000Z");
			assert.ok(claim.sources.length >= 3, `${claim.slug} needs at least three sources`);
			assert.ok(
				claim.sources.some(source => source.isAnchor),
				`${claim.slug} needs a visible anchor source`
			);
			assert.ok(
				claim.sources.some(
					source =>
						source.kind === "systematic_review"
						|| source.kind === "meta_analysis"
						|| source.kind === "guideline"
						|| source.kind === "consensus_statement"
				),
				`${claim.slug} needs a synthesis or institutional decision source`
			);
		}
	});

	it("adds a 24-review encyclopedia tranche across four newly developed topics", () => {
		const expansionSlugSet = new Set(august2026EncyclopediaSlugs);
		const expansionClaims = august2026EncyclopediaSlugs.map((slug) => {
			const claim = defaultClaims.find(entry => entry.slug === slug);
			assert.ok(claim, `Missing encyclopedia expansion claim ${slug}`);
			return claim;
		});

		assert.equal(expansionSlugSet.size, 24);
		assert.equal(expansionClaims.length, 24);
		assert.ok(defaultClaims.length >= 305, "The first encyclopedia tranche must bring the library to 305 claims");
		assert.deepEqual(
			Object.fromEntries(
				[...new Set(expansionClaims.map(claim => claim.topicSlug))]
					.sort()
					.map(topicSlug => [
						topicSlug,
						expansionClaims.filter(claim => claim.topicSlug === topicSlug).length
					])
			),
			{
				"crime-and-justice": 6,
				"education-and-learning": 6,
				"exercise-and-sports-science": 6,
				"sleep-and-circadian-health": 6
			}
		);

		const newTopicSlugs = [
			"crime-and-justice",
			"education-and-learning",
			"exercise-and-sports-science",
			"sleep-and-circadian-health"
		];
		assert.ok(defaultTopics.length >= 18, "The first encyclopedia tranche must bring the directory to 18 topics");
		for (const topicSlug of newTopicSlugs) {
			assert.ok(defaultTopics.some(topic => topic.slug === topicSlug), `Missing topic ${topicSlug}`);
		}

		for (const claim of expansionClaims) {
			assert.equal(claim.status, "published", `${claim.slug} must be public`);
			assert.equal(claim.searchCutoffAt, "2026-08-18T18:00:00.000Z");
			assert.equal(claim.lastRetractionCheckAt, "2026-08-18T18:00:00.000Z");
			assert.ok(claim.sources.length >= 3, `${claim.slug} needs at least three sources`);
			assert.ok(claim.sources.some(source => source.isAnchor), `${claim.slug} needs a visible anchor source`);
			assert.ok(
				claim.sources.some(
					source =>
						source.kind === "systematic_review"
						|| source.kind === "meta_analysis"
						|| source.kind === "guideline"
						|| source.kind === "consensus_statement"
				),
				`${claim.slug} needs a synthesis or institutional decision source`
			);
		}
	});

	it("keeps the encyclopedia tranche distinct from the existing claim library", () => {
		const expansionSlugSet = new Set(august2026EncyclopediaSlugs);
		const expansionClaims = defaultClaims.filter(claim => expansionSlugSet.has(claim.slug));
		const preExistingClaims = defaultClaims.filter(claim => !expansionSlugSet.has(claim.slug));

		for (const claim of expansionClaims) {
			for (const existing of preExistingClaims) {
				const similarity = titleSimilarity(claim.title, existing.title);
				assert.ok(
					similarity < 0.72,
					`Encyclopedia claim "${claim.title}" is too similar to existing "${existing.title}" (${similarity.toFixed(2)})`
				);
			}
		}
	});

	it("keeps the August expansion distinct from pre-existing claim titles", () => {
		const expansionSlugSet = new Set(august2026ExpansionSlugs);
		const expansionClaims = defaultClaims.filter(claim => expansionSlugSet.has(claim.slug));
		const preExistingClaims = defaultClaims.filter(claim => !expansionSlugSet.has(claim.slug));

		for (const claim of expansionClaims) {
			for (const existing of preExistingClaims) {
				const similarity = titleSimilarity(claim.title, existing.title);
				assert.ok(
					similarity < 0.72,
					`August claim "${claim.title}" is too similar to pre-existing "${existing.title}" (${similarity.toFixed(2)})`
				);
			}
		}
	});

	it("keeps the August expansion's contested conclusions inside their evidence boundaries", () => {
		function visibleClaimText(slug: string) {
			const claim = defaultClaims.find(entry => entry.slug === slug);
			assert.ok(claim, `Missing August expansion claim ${slug}`);
			return [
				claim.bottomLine,
				claim.editorSummary,
				claim.uncertaintySummary,
				...claim.stableCore,
				...claim.openQuestions,
				...claim.misconceptions,
				...claim.sources.map(source => source.note)
			].join(" ");
		}

		const statins = visibleClaimText("do-statins-cause-dementia-or-lasting-cognitive-decline");
		assert.match(statins, /observational/i);
		assert.match(statins, /does not prove|not prove/i);
		assert.match(statins, /reversible/i);

		const fecalTransplant = visibleClaimText(
			"does-fecal-microbiota-transplantation-work-for-recurrent-c-difficile-infection"
		);
		assert.match(fecalTransplant, /screen/i);
		assert.match(fecalTransplant, /immunocomprom/i);
		assert.match(fecalTransplant, /transmi/i);

		const pgtA = visibleClaimText("does-pgt-a-improve-cumulative-live-birth-rates-for-most-ivf-patients");
		assert.match(pgtA, /cumulative/i);
		assert.match(pgtA, /per.transfer|per.retrieval/i);
		assert.match(pgtA, /mosaic/i);

		const polygenicEmbryos = visibleClaimText(
			"are-polygenic-embryo-screening-scores-clinically-proven-to-improve-childrens-health"
		);
		assert.match(polygenicEmbryos, /no clinical/i);
		assert.match(polygenicEmbryos, /ancestry/i);
		assert.match(polygenicEmbryos, /unproven/i);

		const firearmStorage = visibleClaimText(
			"does-secure-firearm-storage-reduce-youth-firearm-injury-and-suicide"
		);
		assert.match(firearmStorage, /observational/i);
		assert.match(firearmStorage, /randomized/i);

		const polygraph = visibleClaimText("can-polygraph-tests-reliably-detect-lies");
		assert.match(polygraph, /screening/i);
		assert.match(polygraph, /false positive/i);

		const neurofeedback = visibleClaimText("is-neurofeedback-an-established-effective-treatment-for-adhd");
		assert.match(neurofeedback, /blinded/i);
		assert.match(neurofeedback, /no meaningful overall/i);

		const sexEducation = visibleClaimText(
			"does-comprehensive-sexuality-education-increase-teen-sexual-activity"
		);
		assert.match(sexEducation, /does not generally/i);
		assert.match(sexEducation, /vary|variation/i);
	});

	it("keeps the expansion's contested claims inside their evidence boundaries", () => {
		function visibleClaimText(slug: string) {
			const claim = defaultClaims.find(entry => entry.slug === slug);
			assert.ok(claim, `Missing expansion claim ${slug}`);
			return [
				claim.bottomLine,
				claim.editorSummary,
				claim.uncertaintySummary,
				...claim.stableCore,
				...claim.openQuestions,
				...claim.misconceptions,
				...claim.sources.map(source => source.note)
			].join(" ");
		}

		const abortion = visibleClaimText("does-induced-abortion-increase-breast-cancer-risk");
		assert.match(abortion, /prospective/i);
		assert.match(abortion, /retrospective/i);
		assert.match(abortion, /recall|disclosure/i);

		const vasectomy = visibleClaimText("does-vasectomy-cause-prostate-cancer");
		assert.match(vasectomy, /aggressive|high-grade/i);
		assert.match(vasectomy, /fatal|lethal/i);
		assert.match(vasectomy, /screening|detection/i);

		const opioids = visibleClaimText("do-long-term-opioids-provide-sustained-benefit-for-chronic-non-cancer-pain");
		assert.match(opioids, /abrupt|rapid/i);
		assert.match(opioids, /selected|individual/i);
		assert.match(opioids, /very low|uncertain|limited/i);

		const violentGames = visibleClaimText("do-violent-video-games-cause-serious-real-world-violence");
		assert.match(violentGames, /laboratory|aggression/i);
		assert.match(violentGames, /criminal|serious|lethal/i);
		assert.doesNotMatch(violentGames, /proven cause of (?:crime|mass violence)/i);

		const recoveredMemory = visibleClaimText(
			"can-recovered-memory-techniques-reliably-reveal-accurate-hidden-trauma-memories"
		);
		assert.match(recoveredMemory, /corroborat/i);
		assert.match(recoveredMemory, /suggest/i);
		assert.match(recoveredMemory, /not.*all.*false|both|either truth or falsity/i);

		const multicancer = visibleClaimText(
			"are-multicancer-early-detection-blood-tests-proven-to-reduce-cancer-deaths-in-average-risk-people"
		);
		assert.match(multicancer, /no completed controlled|not yet|unknown/i);
		assert.match(multicancer, /mortality|cancer deaths/i);
		assert.match(multicancer, /standard screening|established.*screening/i);

		const microbiome = visibleClaimText(
			"can-consumer-microbiome-tests-reliably-diagnose-disease-or-prescribe-personalized-diets"
		);
		assert.match(microbiome, /standard/i);
		assert.match(microbiome, /clinical|diagnos/i);
		assert.match(microbiome, /different|discrepanc|vary/i);

		const evolutionRandomness = visibleClaimText("is-evolution-entirely-random");
		assert.match(evolutionRandomness, /chance|stochastic/i);
		assert.match(evolutionRandomness, /selection.*non-random|non-random.*selection/i);
		assert.match(evolutionRandomness, /not.*planned|does not imply.*planning/i);

		const humanRace = visibleClaimText(
			"are-socially-defined-human-racial-groups-discrete-biological-subspecies"
		);
		assert.match(humanRace, /ancestry|population/i);
		assert.match(humanRace, /not.*discrete|do not form discrete/i);
		assert.match(humanRace, /racism.*(?:health|biological)|biological.*consequences/i);
	});

	it("keeps the dental sealant claim readable for parents and general readers", () => {
		const claim = defaultClaims.find(
			entry => entry.slug === "do-dental-sealants-prevent-cavities-in-childrens-back-teeth"
		);
		assert.ok(claim, "Missing dental sealant claim seed");

		const visibleSummary = [claim.bottomLine, claim.editorSummary, ...claim.stableCore, ...claim.sources.map(source => source.note)].join(
			" "
		);

		assert.match(claim.bottomLine, /They work as a barrier over pits and fissures/);
		assert.match(claim.bottomLine, /They do not replace fluoride toothpaste, brushing, diet, dental care/);
		assert.match(claim.editorSummary, /cavities in pits and fissures of children's molars/);
		assert.match(visibleSummary, /tooth decay compared with no sealant/);
		assert.doesNotMatch(visibleSummary, /occlusal caries/i);
		assert.doesNotMatch(visibleSummary, /occlusal surfaces/i);
		assert.doesNotMatch(visibleSummary, /\bcaries\b/i);
		assert.doesNotMatch(visibleSummary, /CDC says/i);
	});

	it("keeps the fluoride toothpaste claim scoped to cavity prevention and child-use caveats", () => {
		const claim = defaultClaims.find(entry => entry.slug === "does-fluoride-toothpaste-prevent-cavities");
		assert.ok(claim, "Missing fluoride toothpaste claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.misconceptions,
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "strong");
		assert.equal(claim.evidenceCertainty, "high");
		assert.match(claim.bottomLine, /helps prevent tooth decay/);
		assert.match(visibleSummary, /1000 to 1250 ppm fluoride/);
		assert.match(visibleSummary, /1450 to 1500 ppm fluoride/);
		assert.match(visibleSummary, /swallowing too much toothpaste/);
		assert.match(visibleSummary, /age-appropriate amounts and supervision/);
		assert.match(visibleSummary, /non-fluoride toothpaste/);
		assert.doesNotMatch(visibleSummary, /\bcaries\b/i);
		assert.doesNotMatch(visibleSummary, /treats active cavities/i);
		assert.doesNotMatch(visibleSummary, /more toothpaste is always better/i);
	});

	it("keeps the diabetes prevention claim clear about structured programs", () => {
		const slug = "do-structured-lifestyle-programs-prevent-or-delay-type-2-diabetes-in-adults-with-prediabetes";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing diabetes prevention claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /organized Diabetes Prevention Program-style interventions/);
		assert.match(visibleSummary, /new diabetes diagnoses/);
		assert.match(visibleSummary, /heart attacks, strokes, and mortality/);
		assert.doesNotMatch(visibleSummary, /diabetes-incidence/i);
		assert.doesNotMatch(visibleSummary, /diabetes incidence/i);
		assert.doesNotMatch(visibleSummary, /cardiovascular-event/i);
		assert.doesNotMatch(visibleSummary, /try harder/i);
	});

	it("keeps the exercise and depression claim useful without blaming patients", () => {
		const slug = "does-exercise-reduce-symptoms-of-depression";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing exercise and depression claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /reasonable evidence-based treatment option or add-on/);
		assert.match(claim.bottomLine, /not a guaranteed cure or a blame-the-patient message/);
		assert.ok(claim.bottomLine.length <= 300, "Exercise/depression bottom line should stay scannable");
		assert.match(visibleSummary, /73 studies (?:with|and) 4,985 adults/);
		assert.match(visibleSummary, /218 unique studies and 14,170 participants/);
		assert.match(visibleSummary, /does not mean depression is laziness/);
		assert.match(visibleSummary, /not a treatment plan by itself/);
		assert.match(visibleSummary, /should not replace urgent care/);
		assert.doesNotMatch(visibleSummary, /just exercise/i);
		assert.doesNotMatch(visibleSummary, /snap out of it/i);
		assert.doesNotMatch(visibleSummary, /try harder/i);
	});

	it("keeps the primary-prevention statin claim scoped to elevated-risk adults", () => {
		const slug = "do-statins-reduce-heart-attacks-and-strokes-for-people-at-elevated-cardiovascular-risk";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing primary-prevention statin claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /appropriately selected adults at elevated cardiovascular risk/);
		assert.ok(claim.bottomLine.length <= 360, "Statin bottom line should stay scannable");
		assert.ok(
			claim.stableCore.every(item => item.length <= 240),
			"Statin stable-core bullets should stay short enough to scan"
		);
		assert.match(visibleSummary, /10-year cardiovascular disease risk of 10% or higher/);
		assert.match(visibleSummary, /7\.5% to less than 10%/);
		assert.match(visibleSummary, /0\.92 for all-cause mortality/);
		assert.match(visibleSummary, /0\.78 for stroke/);
		assert.match(visibleSummary, /0\.67 for myocardial infarction/);
		assert.match(visibleSummary, /0\.72 for composite cardiovascular outcomes/);
		assert.match(visibleSummary, /one-fifth fewer/);
		assert.match(visibleSummary, /11 fewer events per 1000/);
		assert.match(visibleSummary, /older than 75/);
		assert.match(visibleSummary, /not automatic for every low-risk adult/);
		assert.doesNotMatch(visibleSummary, /everyone should take statins/i);
		assert.doesNotMatch(visibleSummary, /guaranteed prevention/i);
	});

	it("keeps the primary-prevention aspirin claim selective and bleeding-aware", () => {
		const slug = "should-adults-take-daily-low-dose-aspirin-to-prevent-a-first-heart-attack-or-stroke";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing primary-prevention aspirin claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "broad");
		assert.match(claim.bottomLine, /Not routinely/);
		assert.ok(claim.bottomLine.length <= 430, "Aspirin bottom line should stay scannable");
		assert.ok(
			claim.stableCore.every(item => item.length <= 240),
			"Aspirin stable-core bullets should stay short enough to scan"
		);
		assert.ok(
			claim.openQuestions.every(item => item.length <= 220),
			"Aspirin open-question bullets should stay short enough to scan"
		);
		assert.match(visibleSummary, /40 to 59/);
		assert.match(visibleSummary, /10% or greater 10-year cardiovascular disease risk/);
		assert.match(visibleSummary, /against initiating low-dose aspirin for primary prevention in adults 60 years or older/);
		assert.match(visibleSummary, /should be used infrequently for routine primary prevention/);
		assert.match(visibleSummary, /13 trials and 164,225 participants/);
		assert.match(visibleSummary, /19,114 healthy older adults/);
		assert.match(visibleSummary, /gastrointestinal and intracranial bleeding/);
		assert.match(visibleSummary, /Primary prevention is not the same as secondary prevention/);
		assert.doesNotMatch(visibleSummary, /everyone should take aspirin/i);
		assert.doesNotMatch(visibleSummary, /no one benefits/i);
		assert.doesNotMatch(visibleSummary, /risk-free/i);
	});

	it("keeps the spinal manipulation claim bounded to modest low-back-pain evidence", () => {
		const slug = "does-spinal-manipulation-help-low-back-pain";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing spinal manipulation low back pain claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.exclusionRules,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "broad");
		assert.equal(claim.evidenceCertainty, "moderate");
		assert.match(claim.bottomLine, /Sometimes, modestly/);
		assert.ok(claim.bottomLine.length <= 430, "Spinal manipulation bottom line should stay scannable");
		assert.match(visibleSummary, /low back pain/);
		assert.match(visibleSummary, /76 studies and 11,866 people/);
		assert.match(visibleSummary, /4\.7-point pain difference/);
		assert.match(visibleSummary, /15 randomized trials and 1,699 participants/);
		assert.match(visibleSummary, /non-musculoskeletal/);
		assert.match(visibleSummary, /red-flag/);
		assert.doesNotMatch(visibleSummary, /can treat asthma/i);
		assert.doesNotMatch(visibleSummary, /can treat high blood pressure/i);
		assert.doesNotMatch(visibleSummary, /guaranteed cure/i);
		assert.doesNotMatch(visibleSummary, /realigns/i);
	});

	it("keeps the later school start time claim focused on adolescent sleep", () => {
		const slug = "do-later-school-start-times-help-teenagers-get-more-sleep";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing later school start time claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.institutionalAnchors.map(anchor => anchor.role),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /Later middle and high school start times/);
		assert.match(visibleSummary, /adolescent sleep/i);
		assert.ok(claim.bottomLine.length <= 380, "Later school start time bottom line should stay concise");
		assert.match(claim.bottomLine, /clearest consensus is on sleep timing and duration/);
		assert.match(visibleSummary, /8:30 a\.m\. or later/);
		assert.match(visibleSummary, /8 to 10 hours/);
		assert.match(visibleSummary, /28 studies and 1,774,509 participants/);
		assert.match(visibleSummary, /only 17\.7%/);
		assert.match(visibleSummary, /depend on implementation/);
		assert.match(visibleSummary, /do not guarantee better grades/);
		assert.doesNotMatch(visibleSummary, /will guarantee better grades/i);
		assert.doesNotMatch(visibleSummary, /guaranteed grade gains/i);
		assert.doesNotMatch(visibleSummary, /lazy/i);
		assert.doesNotMatch(visibleSummary, /just sleep in/i);
	});

	it("keeps the heat pump emissions claim bounded to emissions, not household cost promises", () => {
		const slug = "do-heat-pumps-usually-cut-home-heating-emissions-compared-with-fossil-fuel-heating";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing heat pump emissions claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /Usually yes/);
		assert.match(claim.bottomLine, /costs, comfort, and installation difficulty are separate questions/);
		assert.ok(claim.bottomLine.length <= 320, "Heat pump bottom line should stay scannable");
		assert.match(visibleSummary, /3-to-5 times/);
		assert.match(visibleSummary, /53 of 59 regions/);
		assert.match(visibleSummary, /5%-9%/);
		assert.match(visibleSummary, /cleaner grids/);
		assert.match(visibleSummary, /refrigerant leaks/);
		assert.doesNotMatch(visibleSummary, /guaranteed lower bills/i);
		assert.doesNotMatch(visibleSummary, /every household will save money/i);
		assert.doesNotMatch(visibleSummary, /zero-emission heat pumps/i);
	});

	it("keeps the wind and solar lifecycle claim bounded to greenhouse gas evidence", () => {
		const slug = "do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing wind and solar lifecycle claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.misconceptions,
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(visibleSummary, /43 g CO2e\/kWh for solar photovoltaics/);
		assert.match(visibleSummary, /13 for wind/);
		assert.match(visibleSummary, /486 for natural gas/);
		assert.match(visibleSummary, /1001 for coal/);
		assert.match(visibleSummary, /not literally zero-emission/);
		assert.match(visibleSummary, /coal and natural gas power without carbon capture/);
		assert.match(visibleSummary, /land use, wildlife, mining, reliability, cost, siting, or local consent/);
		assert.doesNotMatch(visibleSummary, /zero lifecycle emissions/i);
		assert.doesNotMatch(visibleSummary, /solves all energy/i);
		assert.doesNotMatch(visibleSummary, /\bunabated\b/i);
		assert.doesNotMatch(visibleSummary, /accounting boundary/i);
	});

	it("keeps the methane mitigation claim scoped to near-term warming and CO2 complementarity", () => {
		const slug = "can-cutting-methane-emissions-slow-warming-in-the-near-term";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing methane mitigation claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.institutionalAnchors.map(anchor => anchor.role),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "strong");
		assert.equal(claim.evidenceCertainty, "high");
		assert.match(claim.bottomLine, /shorter-lived greenhouse gas/);
		assert.match(claim.bottomLine, /does not replace carbon dioxide cuts/);
		assert.ok(claim.bottomLine.length <= 330, "Methane mitigation bottom line should stay scannable");
		assert.match(visibleSummary, /45% by 2030/);
		assert.match(visibleSummary, /0\.3 C/);
		assert.match(visibleSummary, /30%/);
		assert.match(visibleSummary, /ozone|air quality/i);
		assert.match(visibleSummary, /super-emitters|undercounting/i);
		assert.match(visibleSummary, /CO2 reductions rather than replacing them/);
		assert.doesNotMatch(visibleSummary, /replaces CO2 reductions/i);
		assert.doesNotMatch(visibleSummary, /methane cuts alone/i);
		assert.doesNotMatch(visibleSummary, /solves climate change/i);
		assert.doesNotMatch(visibleSummary, /guaranteed/i);
	});

	it("keeps the insecticide-treated bed-net claim focused on malaria prevention and implementation limits", () => {
		const slug = "do-insecticide-treated-bed-nets-reduce-malaria-in-endemic-regions";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing insecticide-treated bed-net claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.institutionalAnchors.map(anchor => anchor.role),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "strong");
		assert.equal(claim.evidenceCertainty, "high");
		assert.match(claim.bottomLine, /malaria-endemic areas/);
		assert.match(claim.bottomLine, /not a complete malaria-control program/);
		assert.ok(claim.bottomLine.length <= 340, "Bed-net bottom line should stay scannable");
		assert.match(visibleSummary, /23 trials/);
		assert.match(visibleSummary, /275,000/);
		assert.match(visibleSummary, /5\.6 child lives per 1000/);
		assert.match(visibleSummary, /20%/);
		assert.match(visibleSummary, /282 million malaria cases and 610,000 deaths/);
		assert.match(visibleSummary, /pyrethroid resistance/i);
		assert.match(visibleSummary, /consistent use|nightly use/i);
		assert.match(visibleSummary, /diagnosis, treatment, chemoprevention, vaccines/);
		assert.doesNotMatch(visibleSummary, /eliminate malaria by themselves/i);
		assert.doesNotMatch(visibleSummary, /guaranteed/i);
		assert.doesNotMatch(visibleSummary, /obsolete everywhere/i);
	});

	it("keeps the carbon monoxide alarm claim clear for household readers", () => {
		const slug = "do-carbon-monoxide-alarms-reduce-poisoning-risk";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing carbon monoxide alarm claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.exclusionRules,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.institutionalAnchors.map(anchor => anchor.role),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /only as a warning layer/);
		assert.match(visibleSummary, /carbon monoxide alarms near every sleeping area/);
		assert.match(visibleSummary, /studies of alarm laws and death rates are mixed/);
		assert.match(visibleSummary, /steps that stop CO from building up/);
		assert.doesNotMatch(visibleSummary, /law-level/i);
		assert.doesNotMatch(visibleSummary, /source-control/i);
		assert.doesNotMatch(visibleSummary, /detection bias/i);
		assert.doesNotMatch(visibleSummary, /confounding/i);
		assert.doesNotMatch(visibleSummary, /CO detector/i);
	});

	it("keeps the nirmatrelvir-ritonavir claim scoped to high-risk early outpatient treatment", () => {
		const slug = "does-nirmatrelvir-ritonavir-reduce-severe-covid-19-risk-for-high-risk-outpatients";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing nirmatrelvir-ritonavir claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.exclusionRules,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.title, /Paxlovid/);
		assert.match(claim.bottomLine, /Paxlovid \(nirmatrelvir-ritonavir\)/);
		assert.match(claim.bottomLine, /started within 5 days/);
		assert.match(claim.bottomLine, /nonhospitalized people at high risk/);
		assert.ok(claim.bottomLine.length <= 380, "Nirmatrelvir-ritonavir bottom line should stay scannable");
		assert.match(visibleSummary, /87% reduction in hospitalization and death/);
		assert.match(visibleSummary, /0\.6% to 1\.2%/);
		assert.match(visibleSummary, /drug-drug interactions/);
		assert.match(visibleSummary, /kidney or liver/);
		assert.match(visibleSummary, /low-risk vaccinated adult/);
		assert.match(visibleSummary, /Long COVID risk/);
		assert.doesNotMatch(visibleSummary, /works for everyone/i);
		assert.doesNotMatch(visibleSummary, /guaranteed cure/i);
		assert.doesNotMatch(visibleSummary, /low-risk adults should take/i);
		assert.doesNotMatch(visibleSummary, /drug interactions do not matter/i);
	});

	it("keeps the homeopathy claim placebo-scoped and safety-aware", () => {
		const slug = "does-homeopathy-reliably-work-beyond-placebo-for-treating-health-conditions";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing homeopathy claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.exclusionRules,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "broad");
		assert.match(claim.bottomLine, /Not reliably/);
		assert.ok(claim.bottomLine.length <= 520, "Homeopathy bottom line should stay scannable");
		assert.match(visibleSummary, /little evidence to support homeopathy as an effective treatment/);
		assert.match(visibleSummary, /beyond placebo/);
		assert.match(visibleSummary, /38% of registered trials remained unpublished/);
		assert.match(visibleSummary, /without FDA review/);
		assert.match(visibleSummary, /delay effective diagnosis or treatment|effective care is delayed/);
		assert.match(visibleSummary, /not enough to establish treatment effects/);
		assert.doesNotMatch(visibleSummary, /homeopathy works/i);
		assert.doesNotMatch(visibleSummary, /cures/i);
		assert.doesNotMatch(visibleSummary, /impossible for any condition/i);
		assert.doesNotMatch(visibleSummary, /always safe/i);
	});

	it("keeps the masks and respirators claim evidence-balanced", () => {
		const slug = "do-masks-and-respirators-reduce-the-spread-of-respiratory-viruses";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing masks and respirators claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "broad");
		assert.equal(claim.evidenceCertainty, "moderate");
		assert.match(claim.bottomLine, /risk reduction rather than complete protection/);
		assert.match(claim.bottomLine, /fit, filtration, consistent use/);
		assert.ok(claim.bottomLine.length <= 360, "Masks bottom line should stay scannable");
		assert.match(visibleSummary, /CDC guidance says masks can lower respiratory-virus transmission risk/);
		assert.match(visibleSummary, /proper mask-wearing rose from 13\.3% to 42\.3%/);
		assert.match(visibleSummary, /600 villages and 342,183 adults/);
		assert.match(visibleSummary, /Cochrane/);
		assert.match(visibleSummary, /low adherence/);
		assert.match(visibleSummary, /not proof that masks cannot work/);
		assert.match(visibleSummary, /Cloth masks, surgical masks, KN95s, and N95 respirators/);
		assert.doesNotMatch(visibleSummary, /masks are useless/i);
		assert.doesNotMatch(visibleSummary, /masks provide perfect protection/i);
		assert.doesNotMatch(visibleSummary, /guaranteed protection/i);
		assert.doesNotMatch(visibleSummary, /Cochrane proved masks do not work/i);
	});

	it("keeps the ventilation and filtration respiratory-virus claim evidence-balanced", () => {
		const slug = "does-improving-indoor-ventilation-and-filtration-reduce-respiratory-virus-spread";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing ventilation and filtration respiratory-virus claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "broad");
		assert.equal(claim.evidenceCertainty, "moderate");
		assert.match(claim.bottomLine, /one layer of risk reduction/);
		assert.match(claim.bottomLine, /virus-carrying particles/);
		assert.ok(claim.bottomLine.length <= 380, "Ventilation bottom line should stay scannable");
		assert.match(visibleSummary, /39% lower COVID-19 incidence/);
		assert.match(visibleSummary, /48% lower incidence/);
		assert.match(visibleSummary, /65% lower simulated aerosol exposure/);
		assert.match(visibleSummary, /90%/);
		assert.match(visibleSummary, /CO2 monitors.*not virus detectors/);
		assert.match(visibleSummary, /Opening a window is not always enough/);
		assert.match(visibleSummary, /clean-air delivery rate \(CADR\)/);
		assert.match(visibleSummary, /observational design limits causal certainty/);
		assert.doesNotMatch(visibleSummary, /guaranteed/i);
		assert.doesNotMatch(visibleSummary, /sterilize/i);
		assert.doesNotMatch(visibleSummary, /CO2 monitor detects virus/i);
		assert.doesNotMatch(visibleSummary, /replaces vaccination/i);
	});

	it("keeps the caffeine tolerance claim outcome-specific and withdrawal-aware", () => {
		const slug = "does-caffeine-become-less-effective-with-regular-daily-use";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing caffeine tolerance claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.exclusionRules,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.equal(claim.consensusBand, "broad");
		assert.equal(claim.evidenceCertainty, "moderate");
		assert.match(claim.bottomLine, /^Partly\./);
		assert.ok(claim.bottomLine.length <= 450, "Caffeine tolerance bottom line should stay scannable");
		assert.match(visibleSummary, /partial, effect-specific tolerance/i);
		assert.match(visibleSummary, /withdrawal reversal/i);
		assert.match(visibleSummary, /60 (?:exercise )?studies/i);
		assert.match(visibleSummary, /SMD 0\.25, 95% CI 0\.20 to 0\.30/);
		assert.match(visibleSummary, /11-person 20-day trial|11 active adults/);
		assert.match(visibleSummary, /12 to 24 hours/);
		assert.match(visibleSummary, /2 to 9 days/);
		assert.match(visibleSummary, /does not automatically erase exercise benefits/i);
		assert.match(visibleSummary, /does not mean caffeine has stopped affecting sleep/i);
		assert.match(visibleSummary, /taking ever-larger doses is not a proven solution/i);
		assert.doesNotMatch(visibleSummary, /complete tolerance develops/i);
		assert.doesNotMatch(visibleSummary, /habitual users get no benefit/i);
	});

	it("keeps seeded claim sources inside the ClaimSource schema constraints", async () => {
		const titlePath = ClaimSource.schema.path("title") as { options: { maxlength?: number } };
		assert.equal(titlePath.options.maxlength, CLAIM_SOURCE_TITLE_MAX_LENGTH);

		for (const claim of defaultClaims) {
			for (const source of claim.sources) {
				assert.ok(
					source.title.length <= CLAIM_SOURCE_TITLE_MAX_LENGTH,
					`${claim.slug} source title is ${source.title.length}/${CLAIM_SOURCE_TITLE_MAX_LENGTH} characters: ${source.title}`
				);

				const sourceDocument = new ClaimSource({
					claim: new mongoose.Types.ObjectId(),
					...source,
					citationCheckedAt: source.citationCheckedAt ? new Date(source.citationCheckedAt) : undefined
				});
				await assert.doesNotReject(
					() => sourceDocument.validate(),
					`${claim.slug} source "${source.title}" failed schema validation`
				);
			}
		}
	});

	it("keeps Skeptical Science contextual on the flagship climate claim", () => {
		const claim = defaultClaims.find(
			entry => entry.slug === "is-recent-global-warming-mainly-caused-by-human-activity"
		);
		assert.ok(claim, "Missing flagship climate claim seed");

		const skepticalScienceSource = claim.sources.find(source => source.publisher === "Skeptical Science");
		assert.ok(skepticalScienceSource, "Climate claim should include Skeptical Science as rebuttal context");
		assert.equal(skepticalScienceSource.kind, "context");
		assert.equal(skepticalScienceSource.isAnchor, false);
		assert.match(skepticalScienceSource.note, /Contextual rebuttal resource/);
		assert.match(skepticalScienceSource.note, /rather than as the assessment anchor/);
	});
});
