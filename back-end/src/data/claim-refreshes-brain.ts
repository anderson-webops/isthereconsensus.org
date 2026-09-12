import type { CompleteSeedClaim } from "./claims.js";

// Source preparation does not constitute independent scientific approval.
const preparedAt = "2026-09-12T22:23:22.206Z";
const slug = "do-we-only-use-10-percent-of-our-brain";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.1073/pnas.98.2.676": "2026-09-12T22:19:12.455Z",
	"10.3389/fpsyg.2012.00429": "2026-09-12T22:19:15.148Z",
	"10.1038/s41467-019-08546-x": "2026-09-12T22:19:18.229Z",
	"10.1177/0271678x241237974": "2026-09-12T22:19:20.705Z",
	"10.1177/0271678x251329707": "2026-09-12T22:19:23.554Z"
};
const additions: Source[] = [
	{
		kind: "landmark_study",
		title: "Correspondence between cerebral glucose metabolism and BOLD reveals relative power and cost in human brain",
		publisher: "Nature Communications",
		year: 2019,
		url: "https://www.nature.com/articles/s41467-019-08546-x",
		doi: "10.1038/s41467-019-08546-x",
		pmid: "30741935",
		pmcid: "PMC6370887",
		stance: "supports",
		order: 4,
		note: "Original abstract, selected acquisition methods, results, metric definitions, limitations and disclosures read. Relative PET/fMRI measures describe regional variation; they do not count active neurons. Full supplements, visual figures and raw data were not independently appraised."
	},
	{
		kind: "landmark_study",
		title: "The brain's dark energy puzzle: How strongly is glucose metabolism linked to resting-state brain activity?",
		publisher: "Journal of Cerebral Blood Flow & Metabolism",
		year: 2024,
		url: "https://doi.org/10.1177/0271678X241237974",
		doi: "10.1177/0271678X241237974",
		pmid: "38443762",
		pmcid: "PMC11342718",
		stance: "context",
		order: 5,
		note: "Original abstract, selected participant and modeling methods, results, limitations and disclosures read. Training and testing cohorts used different acquisition protocols. Correlational model performance is not a percentage of brain use or a validated individual diagnostic test. Supplements and visual plots not appraised."
	},
	{
		kind: "landmark_study",
		title: "The brain's dark energy puzzle upgraded: [18F]FDG uptake, delivery and phosphorylation, and their coupling with resting-state brain activity",
		publisher: "Journal of Cerebral Blood Flow & Metabolism",
		year: 2025,
		url: "https://doi.org/10.1177/0271678X251329707",
		doi: "10.1177/0271678X251329707",
		pmid: "40370305",
		pmcid: "PMC12081390",
		stance: "context",
		order: 6,
		note: "Original abstract, selected participant/kinetic methods and results, limitations and disclosures read. Follow-up from the same research program as the 2024 testing cohort; participant overlap is unresolved. Indirect, non-simultaneous measurements and correlational modeling limit causal interpretation. No independent supplement, figure or data appraisal."
	}
];

export function refreshBrainClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "neuroscience-and-psychology" || seed.slug !== slug) return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "0db18271-f57c-43d7-a4a2-26f75362e4ff",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary: "Added primary imaging studies and explained resting activity, task contrasts and the limits of metabolic models. Kept the conclusion while correcting the use of a teacher-belief survey."
	};
	return {
		...seed,
		bottomLine: "No. The idea that 90 percent of a healthy brain normally sits unused is unsupported. Brain systems remain active at rest and change their activity with different tasks. This does not mean every neuron fires at once, or that a brain scan measures a single percentage of your potential.",
		stableCore: [
			"Rest is a comparison condition, not a brain-off state. Ongoing metabolism and coordinated activity are observable without an assigned task.",
			"A highlighted area on a task-activation map usually marks a measured difference from a comparison condition. Areas without that contrast are not thereby shown to be unused.",
			"Blood-oxygen and glucose-tracer measurements reflect different aspects of brain physiology. Neither directly counts all firing neurons.",
			"Improving a skill does not require a dormant 90 percent reserve. Claims about a training product need their own meaningful learning outcomes."
		],
		openQuestions: [
			"How do cellular signaling, support processes and blood flow together explain regional energy use?",
			"Which imaging models reproduce across people, scanners and changing states, and which remain exploratory?"
		],
		whatWouldChangeMinds: [
			"Convergent, independently replicated evidence that a defined large fraction of healthy brain tissue has no ongoing function across ordinary conditions, with measurement limitations excluded.",
			"A coherent alternative accounting for resting metabolism and changing network activity. A dark patch on one scan or an unexplained model residual would not suffice."
		],
		misconceptions: [
			"Not showing a task-related increase is different from having no activity.",
			"A model explaining part of the variation in an imaging measurement has not measured that fraction of the brain's capacity.",
			"More activity is not automatically better performance, and this review does not establish a universal ideal activity level.",
			"A survey showing that people believe a claim is evidence about belief, not proof of the claim."
		],
		editorSummary: "The central conclusion is retained, with a fuller account of what the cited measurements establish. New examples distinguish organized resting activity from baseline-relative changes and explain why imperfect metabolic predictions do not reveal unused tissue. The original teacher survey is retained as historical context only.",
		uncertaintySummary: "The unused-reserve claim is unsupported, while the detailed relationship between imaging signals, cellular activity and metabolism remains under investigation. High overall certainty describes an editorial judgment about that broad conclusion, not an independent formal appraisal of each imaging model. Individual summaries remain unrated.",
		uncertaintyDrivers: [
			{ type: "indirectness", detail: "BOLD and PET provide indirect signals at different spatial and temporal scales." },
			{ type: "generalizability", detail: "Selected adult samples and scanner-specific protocols do not establish an individual diagnostic or learning-capacity test." }
		],
		evidenceCertainty: "high",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-12T22:19:23.554Z",
		searchDatabases: ["Targeted original publications and reference tracing, not an exhaustive systematic search", "Consensus discovery followed by fetched records and original-source verification", "Crossref and Europe PMC publication-notice metadata"],
		inclusionRules: ["Identify the population, imaging measure and comparison before interpreting a result.", "Separate primary measurements, model interpretations and surveys of public belief."],
		exclusionRules: ["Do not translate activation contrasts, model variance or cell proportions into a percentage of usable brain.", "Do not count overlapping datasets as independent replications or treat exploratory metrics as established clinical tests."],
		appraisalTools: ["Narrative assessment of measurement, design, generalization and disclosures; no independent formal risk-of-bias assessment"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "Raichle reports NIH and Dana Foundation support. Shokri-Kojori reports NIH/NIAAA intramural support. Volpi reports NIH/NIA support, with McDonnell Center support also reported in 2024. The latter three papers declare no competing interests. Other disclosures were not fully assessed; these reports are not an independent conflicts audit.",
		independenceSummary: "The 2024 and 2025 Volpi papers include the same research program, with exact participant overlap unresolved. Crossref and Europe PMC queries returned no registered updates for five DOIs; that metadata result does not certify scientific validity. The retained agreement label is not a measured survey percentage.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What does the original default-mode study show?",
				population: "Raichle 2001: two independent resting adult groups of 19, plus an eyes-closed/fixation comparison in 11 adults",
				finding: "PET measurements supported an organized metabolic baseline. The paper's absence of activation under its oxygen-extraction definition does not mean a lack of ongoing activity; it concerns deviations from that baseline.",
				effectDirection: "supports",
				magnitude: "Oxygen extraction is oxygen used divided by oxygen delivered, not the proportion of brain tissue in use.",
				limitations: ["Selected adult samples and indirect physiology. These are separate analyses, not a single 49-person experiment mapping every cell or possible function."]
			},
			{
				question: "How does resting activity vary across networks?",
				population: "Shokri-Kojori 2019: 28 healthy adults and a separate 40-person alcohol-exposure cohort",
				finding: "Combined PET/fMRI measurements distinguished regional patterns of metabolism and functional signals. The study's relative power and cost measures are normalized comparisons, rather than physical wattage or active-neuron percentages.",
				effectDirection: "supports",
				magnitude: "The measures characterize differences between networks; they do not estimate an unused fraction.",
				limitations: ["Static, indirect proxies and selected cohorts. Proposed clinical biomarker applications are not established by this study."]
			},
			{
				question: "Does unexplained metabolic variation mean unused brain?",
				population: "Volpi 2024: 26 training and 33 testing participants; 2025 follow-up: 47 adults from the testing cohort's research program",
				finding: "The studies modeled regional glucose-tracer measurements using resting functional signals. Incomplete predictions leave questions about physiology and measurement; they do not reveal dormant tissue. The follow-up added oxygen-metabolism information and separated tracer uptake, delivery and phosphorylation.",
				effectDirection: "unclear",
				magnitude: "The 2025 study reports 35% explained variation in uptake with fMRI features and 46% with oxygen information added. These are model-performance measures.",
				limitations: ["Correlational analyses; indirect and partly semiquantitative measures. The 2025 PET/MRI measurements were not simultaneous. Exact participant overlap is unresolved, so these are not counted as independent replications."]
			},
			{
				question: "What does the teacher survey contribute?",
				population: "Dekker 2012: 242 volunteer teachers from selected UK and Dutch regions",
				finding: "The survey documents historical beliefs about the brain. It did not measure brain activity or test a dormant reserve. Its role here is contextual, not experimental support for the scientific conclusion.",
				effectDirection: "unclear",
				magnitude: "Respondent beliefs, not a current worldwide prevalence or an expert-agreement estimate.",
				limitations: ["Volunteer selection and regional recruitment limit generalization. Selected original methods and result-table text were read; full questionnaire and disclosures were not appraised."]
			}
		],
		surveillanceSpec: {
			focus: "Interpretation of resting brain activity and metabolic imaging",
			cadenceDays: 365,
			watchTerms: ["resting brain metabolism BOLD PET", "default mode oxygen extraction", "brain glucose metabolism model replication"],
			integrityMonitors: ["Crossref and Europe PMC publication-notice metadata", "Original publisher corrections"],
			guidelineMonitors: ["Primary neuroimaging studies and measurement guidance"],
			triggerRules: ["Reassess corrections, stronger measurement validation or evidence changing the interpretation of a cited model."]
		},
		sources: [
			...seed.sources.map(source => ({
				...source,
				stance: source.doi === "10.1073/pnas.98.2.676" ? "supports" as const : "context" as const,
				isAnchor: source.doi === "10.1073/pnas.98.2.676",
				appraisal: "not_appraised" as const,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] ?? source.citationCheckedAt : source.citationCheckedAt,
				note: source.doi === "10.1073/pnas.98.2.676"
					? "Original abstract, cohort methods, selected results/discussion and funding read. Baseline-relative oxygen-extraction findings do not imply absent metabolism. Visual figures, full tables and independent data analysis were not appraised."
					: source.doi === "10.3389/fpsyg.2012.00429"
						? "Historical teacher-belief survey, not a measurement of brain activity. Selected original methods and result-table text read. No claim of global current prevalence or independent full appraisal."
						: "Historical explanatory journalism; original body read. Retained for context, without adopting its imprecise momentary-use, cell-ratio or knowledge-percentage statements as quantitative evidence."
			})),
			...additions.map(source => ({ ...source, appraisal: "not_appraised" as const, citationStatus: "current" as const, citationCheckedAt: noticeChecks[source.doi!.toLowerCase()] }))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
