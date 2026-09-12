import type { SeedClaim } from "./claims.js";
import { accountProtectionClaims, accountProtectionGaps } from "./claim-expansion-practical-account.js";
import { airPracticalClaims, airPracticalGaps } from "./claim-expansion-practical-air.js";
import { exerciseBpPracticalClaims, exerciseBpPracticalGaps } from "./claim-expansion-practical-exercise-bp.js";
import { foodStorageClaims, foodStorageGaps } from "./claim-expansion-practical-food.js";
import { hearingPracticalClaims, hearingPracticalGaps } from "./claim-expansion-practical-hearing.js";
import { heatingPracticalClaims, heatingPracticalGaps } from "./claim-expansion-practical-heating.js";
import { mosquitoPracticalClaims, mosquitoPracticalGaps } from "./claim-expansion-practical-mosquito.js";
import { sleepPracticalClaims, sleepPracticalGaps } from "./claim-expansion-practical-sleep.js";
import { strengthPracticalClaims, strengthPracticalGaps } from "./claim-expansion-practical-strength.js";
import { waterPracticalClaims, waterPracticalGaps } from "./claim-expansion-practical-water.js";

const checkedAt = "2026-09-11T19:38:00.000Z";
const morningDelaySlug = "does-delaying-morning-caffeine-prevent-an-afternoon-crash";

// Only genuinely new canonical questions belong here. The comparison pages
// and revisions to existing claims do not count toward the fifty-review goal.
export const practicalEvidenceGaps = [
	{
		slug: morningDelaySlug,
		gap: "Tests the claimed benefit of a specific post-waking delay, not daily tolerance or a bedtime cutoff.",
		relatedExistingSlugs: [
			"does-caffeine-become-less-effective-with-regular-daily-use",
			"can-caffeine-consumed-six-hours-before-bedtime-still-disrupt-sleep"
		]
	},
	...strengthPracticalGaps,
	...sleepPracticalGaps,
	...heatingPracticalGaps,
	...airPracticalGaps,
	...exerciseBpPracticalGaps,
	...waterPracticalGaps,
	...mosquitoPracticalGaps,
	...hearingPracticalGaps,
	...accountProtectionGaps,
	...foodStorageGaps
];

export const practicalEvidenceClaims: SeedClaim[] = [
	{
		topicSlug: "sleep-and-circadian-health",
		title: "Does delaying morning caffeine for 90 minutes prevent an afternoon crash?",
		slug: morningDelaySlug,
		status: "published",
		consensusBand: "unclear",
		agreementLevel: "frontier",
		// Legacy editorial field, not a measured percentage of expert agreement.
		confidenceScore: 50,
		evidenceCertainty: "very_low",
		reviewMode: "standard",
		bottomLine:
			"A universal 90–120-minute waiting rule is not established. The sources checked do not demonstrate that delaying the same morning dose prevents afternoon fatigue. That does not prove timing never matters or that immediate caffeine is better.",
		stableCore: [
			"The 2024 review directly discussing this rule offers a physiological critique, not a trial showing the best waiting time.",
			"A cortisol response is not an afternoon-fatigue outcome. Evidence about one cannot establish a benefit for the other.",
			"Dose, sleep, medicines, and individual sensitivity still matter even when a clock-based rule is unproven."
		],
		openQuestions: [
			"Does a fixed morning delay improve afternoon alertness when dose, sleep opportunity, meals, and later caffeine are held constant?",
			"Would any benefit differ between habitual users, occasional users, and shift workers?"
		],
		whatWouldChangeMinds: [
			"Replicated randomized comparisons of immediate versus delayed morning caffeine, with prespecified afternoon sleepiness and performance outcomes.",
			"Evidence of a useful benefit without compensatory later dosing or poorer subsequent sleep."
		],
		misconceptions: [
			"A plausible hormone story does not validate an exact 90-minute deadline.",
			"Not finding direct evidence is not the same as proving the two schedules equivalent.",
			"This conclusion does not recommend increasing caffeine or treating persistent fatigue with a stimulant."
		],
		misconceptionTags: ["caffeine timing", "morning cortisol", "afternoon fatigue"],
		editorSummary:
			"The useful distinction is between an optional personal routine and a demonstrated biological requirement. This review addresses the latter. Neither a social-media anecdote nor a hormone measurement substitutes for testing afternoon functioning.",
		uncertaintySummary:
			"Direct evidence for the proposed benefit was not identified in this targeted search. Certainty is very low for the specific delay rule; this is not a measured scientific vote against every possible timing effect.",
		uncertaintyDrivers: [
			{
				type: "indirectness",
				detail: "Hormone and sleep studies do not directly compare the claimed morning schedules on afternoon fatigue."
			},
			{
				type: "generalizability",
				detail: "The small physiological trial included healthy young men, not every caffeine consumer."
			},
			{
				type: "other",
				detail: "Targeted source checking is not a registered systematic review or an exhaustive search."
			}
		],
		searchDatabases: [
			"Consensus.app (targeted discovery)",
			"PMC (selected full text)",
			"PubMed (selected abstract)",
			"FDA (consumer guidance)"
		],
		searchCutoffAt: checkedAt,
		inclusionRules: [
			"Human evidence explicitly relevant to morning timing, cortisol, fatigue, or the limits of caffeine guidance.",
			"Distinguish the direct timing claim from indirect mechanisms and general safety context."
		],
		exclusionRules: [
			"Do not treat social-media testimonials, animal mechanisms, or sports time-of-day comparisons as direct tests of the 90-minute rule.",
			"Do not infer equal outcomes from an absent or nonsignificant comparison."
		],
		surveillanceSpec: {
			focus: "Direct morning-delay trials measuring afternoon alertness",
			cadenceDays: 180,
			watchTerms: ["caffeine morning delay randomized", "caffeine 90 minutes afternoon fatigue"],
			integrityMonitors: ["Publisher notices for the cited papers"],
			guidelineMonitors: ["FDA caffeine guidance"],
			triggerRules: [
				"A direct randomized trial, systematic review, or relevant source correction warrants reassessment."
			]
		},
		appraisalTools: [
			"Narrative directness and outcome check; no formal GRADE or risk-of-bias instrument completed"
		],
		evidenceSummaries: [
			{
				question: "Does the proposed delay prevent an afternoon crash?",
				population: "Adult caffeine consumers; direct schedule comparison not established",
				finding:
					"The 2024 narrative review questions the rule's proposed cortisol and adenosine rationale. It does not establish an optimal schedule.",
				effectDirection: "unclear",
				magnitude: "No direct afternoon-fatigue effect estimate available from the cited sources.",
				certainty: "very_low",
				limitations: [
					"Narrative, not systematic review",
					"Supplement-industry relationships disclosed",
					"No direct delay trial identified"
				]
			},
			{
				question: "Can caffeine increase stress hormones?",
				population: "47 healthy young men in a double-blind placebo-controlled crossover trial",
				finding:
					"After 3.3 mg/kg caffeine, peak ACTH and cortisol increases versus placebo were 33% and 30%. This establishes an acute hormone response, not harm or a benefit from delaying caffeine.",
				effectDirection: "supports",
				magnitude: "Hormone peaks at 60 minutes after dosing; no afternoon-crash comparison.",
				certainty: "low",
				limitations: [
					"Abstract checked, not full trial report",
					"Surrogate rather than patient-important outcome",
					"Male-only sample"
				]
			}
		],
		institutionalAnchors: [
			{
				name: "US Food and Drug Administration",
				role: "General caffeine sensitivity and safety context, not endorsement of a morning waiting rule"
			}
		],
		authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
		reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
		coiSummary:
			"The 2024 narrative review discloses supplement-industry relationships among contributors. FDA guidance provides independent safety context, not validation of the timing claim.",
		independenceSummary:
			"No sponsor or popularity ranking determines this conclusion. An exact waiting rule requires direct outcome evidence, not authority or mechanistic plausibility alone.",
		lastRetractionCheckAt: checkedAt,
		changeLog: [
			{
				date: checkedAt,
				kind: "publication",
				summary:
					"New review of the morning caffeine-delay claim, with explicit indirectness and source-access limits."
			}
		],
		readerAnnouncement: {
			id: "b6c4d56e-e553-4e04-b888-3fc5db9ec079",
			date: checkedAt,
			kind: "new_review",
			bottomLineImpact: "new",
			summary:
				"New review: does waiting 90 minutes for morning caffeine prevent an afternoon crash? Direct outcome evidence is not established."
		},
		sources: [
			{
				kind: "context",
				title: "Common questions and misconceptions about caffeine supplementation: what does the scientific evidence really show?",
				publisher: "Journal of the International Society of Sports Nutrition",
				year: 2024,
				doi: "10.1080/15502783.2024.2323919",
				url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10930107/",
				pmcid: "PMC10930107",
				isAnchor: true,
				appraisal: "low",
				stance: "supports",
				note: "Section 15 and disclosures checked in full text. Narrative critique of the waiting rule, not a systematic review or a direct schedule trial. Supplement-industry relationships are disclosed. Citation status checked on this record only, not through an exhaustive integrity search.",
				order: 1,
				citationStatus: "current",
				citationCheckedAt: checkedAt,
				statusSources: ["https://pmc.ncbi.nlm.nih.gov/articles/PMC10930107/"]
			},
			{
				kind: "landmark_study",
				title: "Stress-like adrenocorticotropin responses to caffeine in young healthy men",
				publisher: "Pharmacology Biochemistry and Behavior",
				year: 1996,
				doi: "10.1016/S0091-3057(96)00105-0",
				url: "https://pubmed.ncbi.nlm.nih.gov/8951977/",
				pmid: "8951977",
				isAnchor: false,
				appraisal: "not_appraised",
				stance: "context",
				note: "PubMed abstract checked. A 47-man crossover experiment supports acute ACTH and cortisol responses. It does not test prevention of afternoon fatigue by a fixed post-waking delay. Full methods and risk of bias were not independently appraised.",
				order: 2,
				citationStatus: "current",
				citationCheckedAt: checkedAt,
				statusSources: ["https://pubmed.ncbi.nlm.nih.gov/8951977/"]
			},
			{
				kind: "guideline",
				title: "Spilling the Beans: How Much Caffeine is Too Much?",
				publisher: "US Food and Drug Administration",
				url: "https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much",
				isAnchor: false,
				appraisal: "moderate",
				stance: "context",
				note: "Consumer guidance checked for sensitivity, medications, sleep effects, and counting all caffeine sources. Its general adult daily amount is not a target, an individual guarantee, or evidence for a 90-minute rule.",
				order: 3,
				citationStatus: "current",
				citationCheckedAt: checkedAt,
				statusSources: [
					"https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much"
				]
			}
		]
	},
	...strengthPracticalClaims,
	...sleepPracticalClaims,
	...heatingPracticalClaims,
	...airPracticalClaims,
	...exerciseBpPracticalClaims,
	...waterPracticalClaims,
	...mosquitoPracticalClaims,
	...hearingPracticalClaims,
	...accountProtectionClaims,
	...foodStorageClaims
];
