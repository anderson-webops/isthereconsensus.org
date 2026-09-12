import type { CompleteSeedClaim } from "./claims.js";

// Preparation of a source-backed revision, not independent scientific approval.
const preparedAt = "2026-09-12T22:01:12.000Z";
const slug = "do-learning-styles-improve-educational-outcomes";
type Source = CompleteSeedClaim["sources"][number];

// Successful Crossref observations only. The separate Europe PMC attempts failed.
const noticeChecks: Record<string, string> = {
	"10.1111/j.1539-6053.2009.01038.x": "2026-09-12T21:49:05.940Z",
	"10.3389/fpsyg.2012.00429": "2026-09-12T21:49:20.525Z",
	"10.3389/fpsyg.2024.1428732": "2026-09-12T21:49:23.655Z",
	"10.1007/s10648-025-10002-w": "2026-09-12T21:49:26.459Z",
	"10.3389/fpsyg.2020.00164": "2026-09-12T21:49:29.236Z"
};

const additions: Source[] = [
	{
		kind: "meta_analysis",
		title: "Is it really a neuromyth? A meta-analysis of the learning styles matching hypothesis",
		publisher: "Frontiers in Psychology",
		year: 2024,
		url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1428732/full",
		doi: "10.3389/fpsyg.2024.1428732",
		stance: "debate",
		isAnchor: true,
		order: 3,
		note: "Original abstract, selected search/inclusion methods, results and table text, sensitivity analyses, limitations and disclosures read. Retains the small positive pooled result and the abstract/main-text numerical discrepancy. No full supplement, visual-plot appraisal or independent reanalysis."
	},
	{
		kind: "context",
		title: "Learning Styles, Preferences, or Strategies? An Explanation for the Resurgence of Styles Across Many Meta-analyses",
		publisher: "Educational Psychology Review",
		year: 2025,
		url: "https://link.springer.com/article/10.1007/s10648-025-10002-w",
		doi: "10.1007/s10648-025-10002-w",
		stance: "context",
		order: 4,
		note: "Original abstract, selected classification and constituent-review discussion, and disclosures read. A Reflection on the Field using the Visible Learning database, not a new experiment or a direct reanalysis of the 2024 modality meta-analysis. Full summary table and underlying studies not independently appraised."
	},
	{
		kind: "landmark_study",
		title: "Providing Instruction Based on Students' Learning Style Preferences Does Not Improve Learning",
		publisher: "Frontiers in Psychology",
		year: 2020,
		url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2020.00164/full",
		doi: "10.3389/fpsyg.2020.00164",
		stance: "supports",
		order: 5,
		note: "Original abstract, methods, selected results and disclosures read. Counterbalanced reading/listening tasks in one fifth-grade cohort; only 34 students entered the contrasting-preference comparison. The reported interaction degrees of freedom appear inconsistent with that sample. No independent data or visual-figure appraisal."
	}
];

export function refreshLearningClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "neuroscience-and-psychology" || seed.slug !== slug) return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "db9693e7-acc0-470e-a858-605fac87e649",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary: "Added newer evidence, including a small positive meta-analysis; explained the matching test and its limits; and corrected the classification of a teacher-belief survey."
	};
	return {
		...seed,
		bottomLine: "Sorting students into fixed visual, auditory or similar learning-style categories is not well justified as a routine way to improve learning. Small positive effects have been reported, but the evidence does not establish a dependable, lasting benefit across classrooms. This does not negate individual preferences, accessibility needs or the value of adapting teaching to the task.",
		stableCore: [
			"The matching claim requires evidence that different style groups benefit most from different teaching methods. If everyone benefits from the same diagram, that shows a useful explanation, not a need to sort learners into styles.",
			"A 2024 meta-analysis found a small positive average effect. It also identified substantial uncertainty about study quality, applicability and which learners would consistently benefit.",
			"Preference, skill, motivation and a diagnosed access need are different concepts. A weak case for preference matching is not a reason to withhold accessible material.",
			"Ask whether students can understand, recall and apply the material. A learning-style label alone does not answer those questions."
		],
		openQuestions: [
			"Can larger, well-controlled studies identify a reliable matching benefit that persists beyond short learning tasks?",
			"How much do baseline skills, expectations, measurement choices and participant exclusions explain differences between studies?",
			"Would a proposed matching system improve outcomes enough to justify its assessment and preparation costs in ordinary classrooms?"
		],
		whatWouldChangeMinds: [
			"Replicated, adequately powered studies showing that each prespecified style group benefits most from its matched method on a common, meaningful outcome test.",
			"Evidence that these gains generalize to ordinary students and sustained learning, with accessible alternatives and implementation costs assessed."
		],
		misconceptions: [
			"Finding a positive average effect is not the same as validating a dependable rule for assigning each student a method.",
			"A nonsignificant result from a small subgroup does not prove the effect is exactly zero.",
			"A correlation between a preference score and achievement does not show that changing instruction to match that preference causes improvement.",
			"A percentage of surveyed teachers endorsing learning styles is a belief measure, not a percentage of experts agreeing that the method works."
		],
		editorSummary: "The revision replaces a blanket neuromyth dismissal with a more precise assessment of routine style matching. It retains positive findings, explains the required comparison and separates instructional outcomes from surveys of belief. The practical conclusion remains cautious, with no claim that every possible teaching adaptation has been disproved.",
		uncertaintySummary: "Definitions, tests and student selection differ across the literature. Small contrasting-style groups and short instructional tasks limit precision and generalization. The newer positive meta-analysis and the 2025 discussion cover different bodies of evidence. Overall moderate certainty is an editorial judgment, not an independent GRADE or risk-of-bias assessment; individual evidence summaries remain unrated.",
		uncertaintyDrivers: [
			{ type: "inconsistency", detail: "Different style inventories, instructional tasks and outcomes may not test the same matching claim." },
			{ type: "bias", detail: "Selection into distinct style categories, expectations and incompletely reported outcome reliability can affect findings." },
			{ type: "generalizability", detail: "Short tasks and selected subgroups do not establish a lasting benefit for whole classrooms." }
		],
		evidenceCertainty: "moderate",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-12T21:49:29.236Z",
		searchDatabases: [
			"Targeted original publisher articles and reference tracing; not an exhaustive systematic search",
			"Consensus discovery and fetched records, checked against original publications",
			"Successful Crossref notice queries; Europe PMC attempts timed out or returned temporary server errors"
		],
		inclusionRules: [
			"Distinguish instructional matching experiments from correlations, teacher-belief surveys and methodological discussion.",
			"Identify the comparison, common outcome, analyzed sample and limits of any claimed matching interaction.",
			"Retain materially relevant positive and contrary results with their actual design and scope."
		],
		exclusionRules: [
			"Do not treat a generic preference or learning-strategy correlation as proof of a matching intervention.",
			"Do not treat overlapping syntheses as independent experiments or pool their different effect measures informally.",
			"Do not infer a fixed learner identity, an accessibility policy or a long-term benefit from a short preference-matching task."
		],
		appraisalTools: ["Narrative assessment of design, matching criteria, outcome scope, precision and disclosures; no independent formal grading"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "Clinton-Lisell and Litzinger report University of North Dakota Alumni Foundation support and no commercial or financial conflicts. Rogowsky and colleagues report National Science Foundation funding and no commercial or financial conflicts. Hattie and O'Leary declare no competing interests and no research funding, with institutional open-access support. Pashler and Dekker disclosures were not fully assessed. These are reported disclosures, not an independent conflicts audit.",
		independenceSummary: "The syntheses overlap and use different constructs. Journal publication, teacher endorsement and site agreement labels are not an expert vote. Crossref notice queries succeeded; Europe PMC checks failed, so dual-provider coverage is not claimed. A recorded source-check date does not establish scientific validity.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What would a convincing test of style matching show?",
				population: "Pashler and colleagues' commissioned evidence assessment, 2008 issue; online publication in 2009",
				finding: "Classify preferences, randomly assign instructional methods within each group and assess everyone with the same test. The best method must differ between style groups. Merely showing different average achievement between groups does not demonstrate matching.",
				effectDirection: "unclear",
				magnitude: "A test-design criterion, not an effect-size estimate or a vote by all psychologists.",
				limitations: ["This historical assessment acknowledged that many possible versions had not been adequately tested. The original abstract and selected introduction were read; full methods, figures and disclosures were not appraised."]
			},
			{
				question: "Has a recent synthesis found a benefit?",
				population: "Clinton-Lisell and Litzinger 2024: 21 studies, 101 effect sizes, 1,712 participants",
				finding: "Yes. The main analysis found a small positive average effect, with high heterogeneity. Positive matching patterns for at least two styles appeared in 11 of 42 outcome measures; that is not the percentage of students who benefited. Excluding two nonrandomized studies did not remove the pooled benefit.",
				effectDirection: "mixed",
				magnitude: "Main results: Hedges' g 0.32 (95% CI, 0.07-0.57), I² 91%. The abstract differs: g 0.31 (0.05-0.57).",
				limitations: ["Short tasks, participant exclusions and incompletely reported measurement reliability constrain use. The authors advise against treating this as sufficient support for widespread adoption. No independent reanalysis resolved the numerical discrepancy."]
			},
			{
				question: "Why do syntheses sometimes appear to disagree?",
				population: "Hattie and O'Leary 2025: discussion of 17 meta-analyses in the Visible Learning database",
				finding: "The authors distinguish instructional comparisons from correlations between style scores and achievement. Their four matching syntheses include varied cognitive-style constructs. This is not an updated pooling of the 2024 modality-only studies, and its near-zero estimate does not cancel that positive result.",
				effectDirection: "mixed",
				magnitude: "Reported matching estimate d 0.04 (SE 0.21); average correlation r 0.24 for the other group. These measure different things.",
				limitations: ["The underlying studies overlap, and some constructs extend beyond visual/auditory preferences. Original classification discussion and disclosures were read; the full table and underlying studies were not independently appraised."]
			},
			{
				question: "What does a school-age comparison illustrate?",
				population: "Rogowsky 2020: 125 participating fifth graders in one rural US school; 34 in the contrasting-style analysis",
				finding: "Students completed both reading and listening tasks in counterbalanced order, followed by the same written question format. The contrasting-style analysis did not find a significant matching interaction. Its small subgroup cannot exclude every small effect or establish results for all ages and subjects.",
				effectDirection: "unclear",
				magnitude: "The key comparison included 12 strongly auditory and 22 strongly visual students, not all 125 participants.",
				limitations: ["Missing measures and exclusions reduced the analyzed sample. The reported interaction degrees of freedom appear inconsistent with the stated sample, so they are not reproduced here. This was not a long-term classroom intervention."]
			},
			{
				question: "Do frequently quoted teacher percentages measure effectiveness?",
				population: "Dekker 2012: 242 volunteer teachers from selected UK and Dutch regions",
				finding: "This survey measured beliefs about the brain and education. It did not assign students to teaching methods or measure a matching benefit. Its citation is now correctly described as contextual survey evidence, rather than a scientific consensus statement.",
				effectDirection: "unclear",
				magnitude: "Matching was endorsed by 93% of 137 UK respondents and 96% of 105 Dutch respondents in this historical sample.",
				limitations: ["Participation was voluntary and most respondents were interested in neuroscience. These are not current worldwide teacher rates or a measured academic consensus. Selected original methods and table text were read; full questionnaire and disclosures were not appraised."]
			}
		],
		surveillanceSpec: {
			focus: "Reliable instructional matching benefits, outcome measurement and classroom applicability",
			cadenceDays: 180,
			watchTerms: ["learning styles matching crossover interaction", "modality matching meta-analysis", "learning styles classroom long-term outcomes"],
			integrityMonitors: ["Crossref and Europe PMC publication-notice metadata", "Original publisher corrections"],
			guidelineMonitors: ["Original educational research syntheses and methodological guidance"],
			triggerRules: ["Reassess replicated matching interactions, a better controlled synthesis or a correction affecting the cited estimates."]
		},
		sources: [
			...seed.sources.map(source => ({
				...source,
				kind: "context" as const,
				isAnchor: source.doi === "10.1111/j.1539-6053.2009.01038.x",
				appraisal: "not_appraised" as const,
				citationCheckedAt: noticeChecks[source.doi!.toLowerCase()] ?? source.citationCheckedAt,
				note: source.doi === "10.1111/j.1539-6053.2009.01038.x"
					? "Original abstract and selected introduction read. A commissioned conceptual and targeted evidence assessment, not an exhaustive systematic review. Issue year 2008 differs from the publisher's December 2009 online date. Full methods, figures and disclosures not appraised."
					: "Original teacher-belief survey, not a consensus statement or a teaching intervention. Selected abstract, recruitment methods and result-table text read. Volunteer respondents in two regions do not establish a global current prevalence. Full questionnaire and disclosures not appraised."
			})),
			...additions.map(source => ({
				...source,
				appraisal: "not_appraised" as const,
				citationStatus: "current" as const,
				citationCheckedAt: noticeChecks[source.doi!.toLowerCase()]
			}))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
