import type { CompleteSeedClaim } from "./claims.js";

const preparedAt = "2026-09-13T03:43:58.087Z";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.1088/1748-9326/11/4/048002": "2026-09-13T03:15:39.764Z",
	"10.5194/essd-18-3889-2026": "2026-09-13T03:15:43.203Z",
	"10.1038/s41598-017-14828-5": "2026-09-13T03:24:27.518Z"
};
const additions: Source[] = [
	{
		kind: "landmark_study",
		title: "Indicators of Global Climate Change 2025: annual update of key indicators of the state of the climate system and human influence",
		publisher: "Earth System Science Data",
		year: 2026,
		url: "https://essd.copernicus.org/articles/18/3889/2026/",
		doi: "10.5194/essd-18-3889-2026",
		stance: "supports",
		order: 5,
		note: "Selected original attribution methods, results and disclosures assessed; Table 6 visually checked. Not every indicator, supplement, figure or underlying analysis reappraised. This annual update is not a new IPCC assessment."
	},
	{
		kind: "landmark_study",
		title: "A real-time Global Warming Index",
		publisher: "Scientific Reports",
		year: 2017,
		url: "https://www.nature.com/articles/s41598-017-14828-5",
		doi: "10.1038/s41598-017-14828-5",
		pmid: "29133863",
		stance: "supports",
		order: 6,
		note: "Selected original methodology, results, acknowledgments and competing-interest declaration assessed. Not all variants, supplements or code independently reanalysed. Later publisher retrieval failed; earlier original HTML was retained."
	}
];

export function refreshClimateClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "climate-and-environment" || seed.slug !== "is-recent-global-warming-mainly-caused-by-human-activity") return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "1d9fe3e2-04bd-4741-bef6-dccebdf2acbf",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary: "Added updated warming attribution and a concrete methodological example; distinguished observations, human contributions, survey denominators, uncertainty ranges and annual versus long-term temperatures."
	};
	return {
		...seed,
		bottomLine: "Yes. Human activities account for essentially all recent multidecadal global warming. Greenhouse-gas warming is partly offset by other human influences, especially aerosol cooling. Natural influences still affect individual years and regions; this conclusion does not mean every temperature change or weather event has only a human cause.",
		stableCore: [
			"Detecting warming and explaining its causes are related but different questions. Attribution compares observed changes with expected human and natural influences.",
			"The net human contribution includes both warming and cooling influences; it is not identical to the greenhouse-gas contribution alone.",
			"A baseline, averaging period and uncertainty definition are necessary to interpret a temperature estimate.",
			"Agreement surveys describe views or published positions. Physical evidence, not a vote, establishes the causal explanation."
		],
		openQuestions: [
			"How will revised observations and improved attribution change the estimated contributions of individual drivers?",
			"How do aerosol changes, natural variability and feedbacks affect near-term warming and regional impacts?",
			"How can estimates from different baselines and averaging periods be communicated without misleading comparisons?"
		],
		whatWouldChangeMinds: [
			"A reproducible explanation fitting observations and independent physical constraints better than human forcing, while also explaining why existing attribution methods appear to detect it.",
			"Improved observations or corrections can revise a numerical estimate without reversing the established broad causal conclusion."
		],
		misconceptions: [
			"A cold day or one unusual year does not measure a multidecadal global trend.",
			"A percentage from a selected set of position-taking papers is not a current census of every scientist or the probability that a claim is true.",
			"Different estimates are not necessarily contradictions: check their periods, baselines, temperature definitions and uncertainty ranges first.",
			"A historical estimate can change when the dataset or method improves; that revision is not additional physical warming occurring in the past."
		],
		editorSummary: "The earlier review stated the conclusion mainly through assessment and educational sources. The revision adds a dated attribution update, a methodological example and explicit interpretation boundaries. It corrects the consensus reply's source classification while retaining its identity and historical role.",
		uncertaintySummary: "High overall certainty is an editorial synthesis of the causal conclusion, not a new formal grade. Individual summaries remain unrated. The site's agreement label is not a newly measured expert survey or a probability of truth; uncertainty about contributions and regional outcomes remains meaningful.",
		uncertaintyDrivers: [
			{ type: "imprecision", detail: "Coverage, temperature definitions and dataset revisions affect estimated warming." },
			{ type: "timing", detail: "Single-year variability and different averaging periods complicate comparisons." },
			{ type: "other", detail: "Attribution methods share observations and physical assumptions; method diversity is not complete independence." }
		],
		evidenceCertainty: "high",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-13T03:24:27.518Z",
		searchDatabases: [
			"Targeted original assessments, attribution studies and explanatory resources; not an exhaustive systematic search",
			"Consensus discovery followed by fetched records and original-source verification",
			"Crossref and Europe PMC publication-notice metadata with explicit coverage gaps"
		],
		inclusionRules: ["Specify the baseline, period, measured or attributed quantity and uncertainty convention.", "Separate physical attribution from the measurement of scientific agreement."],
		exclusionRules: ["Do not treat an annual update as a new IPCC assessment or one year's temperature as a long-term threshold assessment.", "Do not treat educational summaries or repeated dataset analyses as new independent observations."],
		appraisalTools: ["Narrative assessment of attribution, denominators, uncertainty, independence and access; no independent formal grading or code reanalysis"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "Forster describes Leeds coordination contracted by ECMWF with EU support and other public research funding; the contact author reports no competing interests for the authors. Haustein acknowledges dataset providers and declares no competing interests. Cook thanks commenters and includes Skeptical Science affiliations; no complete modern conflicts audit is inferred. These are reported disclosures, not an independent investigation.",
		independenceSummary: "The annual update builds on IPCC methods and existing datasets, including the Global Warming Index lineage. These are not independent realizations of Earth's climate. Educational sources summarize that evidence, and some consensus-study authors also contribute to Skeptical Science. Four successful notice observations found no registered updates; two Europe PMC indexing gaps and an earlier failed request remain documented. Metadata does not certify scientific validity.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What does the IPCC attribute to human activity?",
				population: "IPCC 2023 synthesis, 2010–2019 compared with 1850–1900",
				finding: "The best estimate of human-caused warming is 1.07°C, with a likely range of 0.8–1.3°C. The observed estimate for that same period is 1.06°C. Human greenhouse-gas warming is partly offset by other human influences.",
				effectDirection: "supports",
				magnitude: "A global attribution assessment, not the fraction of scientists agreeing.",
				limitations: ["The nearby 1.1°C headline refers to observations for 2011–2020, a different period. Selected SPM text and footnotes were checked, not the entire assessment and its underlying studies."]
			},
			{
				question: "What does the newer annual update add?",
				population: "Forster 2026, 2016–2025 compared with 1850–1900",
				finding: "Observed global mean surface warming is 1.26°C [1.13–1.36], while the assessed human contribution is 1.24°C [1.0–1.5]. The observed range is very likely; the attribution range is likely. They are not interchangeable confidence intervals.",
				effectDirection: "supports",
				magnitude: "A decade-average update, not a single-year threshold decision.",
				limitations: ["Three attribution methods share observations and foundations. Data revisions can change historical estimates; the original code, supplements and every indicator were not independently reanalysed."]
			},
			{
				question: "How can attribution go beyond tracking temperature?",
				population: "Haustein 2017 Global Warming Index methodology",
				finding: "The study compares observed temperature evolution with modeled responses to human and natural influences, carrying uncertainty in observations, forcing, response and internal variability. This is an inference constrained by data and physics, not a correlation with calendar year alone.",
				effectDirection: "supports",
				magnitude: "A methodological example, not an independent new climate history.",
				limitations: ["The original study uses an 1850–1879 reference period. Its numerical results cannot simply be compared with a later estimate using 1850–1900; all variants and supplements were not assessed."]
			},
			{
				question: "What does the familiar consensus percentage actually count?",
				population: "Cook 2016 reply summarizing studies of scientific agreement",
				finding: "One discussed study classified 11,944 abstracts; 4,014 expressed a position, and 97.1% of that subset endorsed human-caused warming. The denominator is not all screened abstracts, all people or a new survey conducted for this page.",
				effectDirection: "supports",
				magnitude: "A position estimate from a defined historical sample, not a physical attribution estimate.",
				limitations: ["Questions, expertise, samples and dates differ between the studies in the reply. Papers without a stated position are not automatically rejection; the underlying classifications were not independently repeated."]
			},
			{
				question: "What role do the educational sources play?",
				population: "NASA evidence overview and Skeptical Science's 2023 human-fingerprint explanation",
				finding: "The resources connect warming observations and fossil-carbon evidence to the broader causal account. They help explain why observing climate change, identifying added carbon and estimating temperature contributions are distinct steps.",
				effectDirection: "supports",
				magnitude: "Explanatory context rather than new independent datasets.",
				limitations: ["Selected text was assessed, not every graph or linked study. NASA's page includes older data endpoints and rankings; those are not reused as current records. The Skeptical Science date remains 2023."]
			}
		],
		surveillanceSpec: {
			focus: "Human attribution of recent global warming and interpretation of updated estimates",
			cadenceDays: 180,
			watchTerms: ["Indicators of Global Climate Change human induced warming", "global warming attribution observational revision", "climate consensus survey denominator correction"],
			integrityMonitors: ["Crossref and Europe PMC publication-notice metadata", "Original publisher corrections"],
			guidelineMonitors: ["IPCC assessments and original climate observation providers"],
			triggerRules: ["Review materially revised attribution, methods or corrections without conflating changed estimates with changed past climate."]
		},
		sources: [
			...seed.sources.map((source): Source => ({
				...source,
				kind: source.doi ? "context" : source.kind,
				appraisal: "not_appraised",
				isAnchor: false,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] : source.citationCheckedAt,
				note: source.doi
					? "Original reply: selected methods, Table 1 and continuation, conclusions and acknowledgments assessed. It summarizes agreement estimates, not a pooled physical-attribution effect; underlying classifications and studies not all reappraised."
					: source.publisher === "IPCC"
						? "Original SPM A1/A1.1/A1.2 and footnotes visually assessed on printed page 4. Original 2023 identity retained; not a full reappraisal of all assessment chapters or references."
						: source.publisher === "NASA"
							? "Selected original overview, warming, ocean and ice explanations read. Some rankings and data endpoints are older; no fresh publication date, current ranking or assessment of every reference inferred."
							: "Contextual rebuttal resource, used for explanation rather than as the assessment anchor. Original basic explanation and selected further details read; dated July 2, 2023. Not a new independent dataset; linked studies not all appraised."
			})),
			...additions.map((source): Source => ({ ...source, appraisal: "not_appraised", isAnchor: false, citationStatus: "current", citationCheckedAt: noticeChecks[source.doi!.toLowerCase()] }))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
