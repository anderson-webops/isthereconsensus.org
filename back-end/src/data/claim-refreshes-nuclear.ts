import type { CompleteSeedClaim } from "./claims.js";

const preparedAt = "2026-09-13T01:58:45.000Z";
const slug = "is-nuclear-power-more-dangerous-than-fossil-fuel-energy";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.1016/s0140-6736(07)61253-7": "2026-09-13T01:15:28.992Z",
	"10.1038/s41560-023-01241-8": "2026-09-13T01:15:31.672Z",
	"10.1007/s10640-025-01002-z": "2026-09-13T01:15:33.246Z",
	"10.1371/journal.pone.0336218": "2026-09-13T01:15:37.087Z",
	"10.1038/s41467-026-69285-4": "2026-09-13T01:57:56.846Z"
};
const additions: Source[] = [
	{
		kind: "landmark_study",
		title: "Nuclear power generation phase-outs redistribute US air quality and climate-related mortality risk",
		publisher: "Nature Energy",
		year: 2023,
		url: "https://pubmed.ncbi.nlm.nih.gov/39360032/",
		doi: "10.1038/s41560-023-01241-8",
		pmid: "39360032",
		pmcid: "PMC11446505",
		stance: "supports",
		order: 4,
		note: "Original abstract, disclosures and selected figure captions assessed. Full methods, visual figures, supplements and model inputs not independently appraised. A modeled replacement scenario, not observed shutdown deaths."
	},
	{
		kind: "landmark_study",
		title: "Unintended Effects of Germany’s Nuclear Phase Out: A Rise in Mortality Due to Non-Communicable Respiratory Diseases",
		publisher: "Environmental and Resource Economics",
		year: 2025,
		url: "https://link.springer.com/article/10.1007/s10640-025-01002-z",
		doi: "10.1007/s10640-025-01002-z",
		stance: "supports",
		order: 5,
		note: "Selected original data, design, results, robustness and disclosures read. Full figures and appendices not appraised. Europe PMC did not index this DOI; its check date comes from Crossref, not that incomplete coverage."
	},
	{
		kind: "landmark_study",
		title: "Nuclear phase-out: Can we catch up on CO2 emissions?",
		publisher: "PLOS One",
		year: 2025,
		url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0336218",
		doi: "10.1371/journal.pone.0336218",
		pmid: "41212927",
		stance: "context",
		order: 6,
		note: "Selected original methods, results, robustness and disclosures read. Broader fossil-energy CO2, not power-only emissions or mortality. Full supplements, figures and independent code replication not appraised."
	},
	{
		kind: "consensus_statement",
		title: "UNSCEAR 2020/2021 Report, Volume II, Scientific Annex B: Levels and effects of radiation exposure due to the accident at the Fukushima Daiichi Nuclear Power Station",
		publisher: "United Nations Scientific Committee on the Effects of Atomic Radiation",
		year: 2022,
		url: "https://www.unscear.org/unscear/en/publications/2020_2021_2.html",
		stance: "context",
		order: 7,
		citationStatus: "corrected",
		citationCheckedAt: preparedAt,
		statusSources: ["https://www.unscear.org/unscear/uploads/documents/publications/Corrigenda/2020_21/2316352E-2022-II.pdf"],
		note: "Health-summary paragraphs 244–250 assessed; printed page 96 visually checked. Evidence through 2019, not 2026. The 2023 correction revises early monitoring-data descriptions in paragraphs 18/A29, not clinical outcomes. Full models not reappraised."
	},
	{
		kind: "context",
		title: "The Chornobyl Accident",
		publisher: "United Nations Scientific Committee on the Effects of Atomic Radiation",
		url: "https://www.unscear.org/unscear/en/areas-of-work/chernobyl.html",
		stance: "context",
		order: 8,
		note: "Original radiation-health overview assessed. Acute radiation deaths and increased thyroid cancer after childhood exposure are real harms. This overview is not an estimate of every accident-related consequence."
	},
	{
		kind: "landmark_study",
		title: "National analysis of cancer mortality and proximity to nuclear power plants in the United States",
		publisher: "Nature Communications",
		year: 2026,
		url: "https://link.springer.com/article/10.1038/s41467-026-69285-4",
		doi: "10.1038/s41467-026-69285-4",
		pmid: "41730864",
		stance: "context",
		order: 9,
		citationStatus: "corrected",
		statusSources: ["https://doi.org/10.1038/s41467-026-72052-0", "https://europepmc.org/article/MED/41974749"],
		note: "Original selected methods, limitations, results and disclosures assessed. April 2026 notice corrects Figure 5's date span to 1980–2018, not the 2000–2018 mortality series. Figures, supplements and raw data not independently appraised."
	}
];

export function refreshNuclearClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "climate-and-environment" || seed.slug !== slug) return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "9c3be85a-f0c4-4946-99a3-0e7c43e5f0ce",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary: "Qualified the comparison by outcome and replacement mix. Added phase-out studies, a cancer-proximity association and accident-health evidence, preserving uncertainty and two linked corrections."
	};
	return {
		...seed,
		bottomLine: "For routine air pollution and climate burden from electricity generation, comparative evidence generally favors nuclear over fossil fuels, especially coal and oil. That is not a claim that nuclear is harmless or always the best alternative. Accident consequences, local health evidence and the energy source that would replace a plant must be assessed separately.",
		stableCore: [
			"Compare electricity systems providing the same service, over a stated time period. Routine pollution, climate damage and rare accidents are different outcomes.",
			"Replacing nuclear electricity with fossil generation can increase pollution; replacement with other low-carbon sources can change that tradeoff.",
			"A modeled number of attributable deaths is not a count of identified people killed by a specific plant or closure.",
			"Lower average pollution estimates do not erase waste obligations, displacement, worker harms, cost or governance concerns."
		],
		openQuestions: [
			"Which feasible replacement mix delivers reliable low-carbon electricity in each region, and how quickly?",
			"How robust are local cancer associations to individual exposure measurement, residential history and alternative explanations?",
			"How should rare accidents, chronic pollution, unequal burdens and long-term waste stewardship be compared without hiding any of them?"
		],
		whatWouldChangeMinds: [
			"Independent comparisons showing a materially different health ranking under realistic replacement systems, with consistent denominators and uncertainty.",
			"Better individual-level evidence establishing the causes and size of health risks near normally operating plants, or revised accident-health assessments."
		],
		misconceptions: [
			"Low carbon does not mean risk free, and a concern about accidents is not evidence of ignorance.",
			"A phase-out estimate is not a universal recommendation to build a particular new plant.",
			"A later narrowing of an annual emissions gap does not itself remove earlier cumulative emissions.",
			"An ecological association deserves investigation, but distance from a facility is not an individual radiation-dose measurement."
		],
		editorSummary: "Replaces a dismissive public-fear framing with a comparison of measured outcomes, counterfactual models and accident consequences. Includes recent evidence that complicates the earlier answer without turning a single estimate into a universal ranking or giving operational nuclear instructions.",
		uncertaintySummary: "Moderate overall certainty is an editorial assessment of this qualified synthesis, not a formal rating of each study. Individual summaries remain unrated. The retained broad agreement label is not a measured expert survey, and the evidence does not supply one all-hazard risk ratio for every electricity system.",
		uncertaintyDrivers: [
			{ type: "implementation", detail: "The replacement mix, grid, plant condition and time horizon affect comparative outcomes." },
			{ type: "bias", detail: "Ecological associations and constructed counterfactuals remain vulnerable to confounding and exposure error." },
			{ type: "imprecision", detail: "Rare events and small excess risks can be difficult to measure; nondetection does not establish zero harm." }
		],
		evidenceCertainty: "moderate",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: preparedAt,
		searchDatabases: [
			"Targeted original studies, institutional assessments and reference tracing; not an exhaustive systematic search",
			"Consensus discovery followed by fetched records and original-source verification",
			"Crossref and Europe PMC publication notices, with original publisher corrections"
		],
		inclusionRules: [
			"Specify population, outcome, counterfactual replacement and whether an estimate is observed or modeled.",
			"Retain relevant contrary findings, corrections and accident consequences alongside routine electricity comparisons."
		],
		exclusionRules: [
			"Do not compare incompatible mortality totals, time windows or energy-service denominators as if they were one risk ratio.",
			"Do not infer scientific validity from a warning-free metadata check or turn statistical nondetection into proof of no harm."
		],
		appraisalTools: ["Narrative assessment of population, comparison, confounding, uncertainty and access; no independent formal risk-of-bias grading"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "Freese, Kaariaho, Loiacono and Alwadi declare no competing interests. Kaariaho reports EU/ERC funding; Loiacono reports EU/Italian public support and no funder role. Alwadi reports no external award and a Harvard doctoral fellowship. These declarations are not an independent conflicts audit; the older review's full disclosures were not assessed.",
		independenceSummary: "Institutional assessments and two analyses of the same German policy are not independent replications of every endpoint. Ten provider responses for five DOIs comprise seven no-registered-update findings, two correction detections and one not-indexed result. UNSCEAR's correction was checked separately. Neither absence of a notice nor a correction settles validity.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What supports the routine health and climate comparison?",
				population: "Historical European fuel-cycle comparisons and IPCC energy-system assessment",
				finding: "Markandya and Wilkinson's 2007 review places coal, lignite and oil highest for health burden, gas lower and nuclear lower still. IPCC treats nuclear as a low-carbon option while identifying cost, construction, waste and acceptance constraints.",
				effectDirection: "supports",
				magnitude: "Comparative context, not a new universal deaths-per-unit estimate.",
				limitations: ["Original indexed review abstract and selected IPCC section assessed, not all underlying studies. Historical estimates cannot decide every current plant or low-carbon alternative."]
			},
			{
				question: "What happens in a modeled US nuclear shutdown?",
				population: "Freese 2023 US dispatch and air-quality scenarios",
				finding: "Removing nuclear generation and replacing it with coal, gas and oil produced an estimated 5,200 additional annual air-pollution deaths. Scenarios with more renewables or simultaneous coal closures changed the impacts.",
				effectDirection: "supports",
				magnitude: "Scenario-dependent modeled annual mortality, not observed fatalities.",
				limitations: ["Full methods and uncertainty inputs were not appraised. This estimate does not cover every accident, waste burden or future replacement grid."]
			},
			{
				question: "What did a German respiratory-health analysis find?",
				population: "Kaariaho 2025: Germany compared with a synthetic control built from 12 donor countries",
				finding: "The estimated 2011–2019 increase was 17 potential years of life lost per 100,000 annually from noncommunicable respiratory disease. The reference age was 75; the author's approximate conversion to 170 annual deaths is not an identified fatality count.",
				effectDirection: "supports",
				magnitude: "Counterfactual population estimate; permutation p = 0.077, not below 0.05.",
				limitations: ["The health model fit coal use poorly, requiring a separate coal model. Confounding, donor selection and cross-border spillovers constrain causal interpretation despite robustness checks."]
			},
			{
				question: "Must the phase-out emissions penalty stay constant?",
				population: "Loiacono 2025: Germany, 1990–2023, with 11 European donor countries",
				finding: "The synthetic-control emissions gap narrowed by 2023, which the authors associate with renewable expansion. Their alternative synthetic difference-in-differences analysis reported an average null effect over 2011–2023 but an increase over 2011–2017.",
				effectDirection: "mixed",
				magnitude: "Time- and method-dependent fossil-energy CO2 findings, not mortality.",
				limitations: ["The outcome includes energy uses outside electricity. Unmeasured non-power changes and interconnected donor grids can affect the comparison; robustness checks do not prove the identifying assumptions."]
			},
			{
				question: "Does lower routine pollution mean accidents caused no harm?",
				population: "UNSCEAR assessments of Fukushima and Chornobyl",
				finding: "The Fukushima assessment found no documented resident health effects directly attributable to radiation, while recognizing evacuation-related and psychological harms. Chornobyl caused acute radiation deaths and increased thyroid cancer after exposure at young ages.",
				effectDirection: "mixed",
				magnitude: "Different accidents and outcomes; no all-consequence death total is inferred.",
				limitations: ["A radiation-related increase too small to discern is not proof of zero risk. Fukushima evidence ends in 2019; combined-disaster harms should not all be attributed to radiation."]
			},
			{
				question: "What about the 2026 cancer-proximity study?",
				population: "Alwadi 2026: adult cancer mortality in US counties, 2000–2018",
				finding: "Counties nearer nuclear plants had higher cancer mortality after county-level adjustment. The authors explicitly do not establish causality; the association should be investigated rather than omitted or treated as proven radiation deaths.",
				effectDirection: "unclear",
				magnitude: "Ecological proximity association, not a causal nuclear-versus-fossil risk ratio.",
				limitations: ["No individual dosimetry or residential histories; all cancers combined and childhood cancers unassessed. Attributable-death calculations assume causality that this design cannot establish."]
			}
		],
		surveillanceSpec: {
			focus: "Comparative electricity health outcomes, replacement mixes and accident assessments",
			cadenceDays: 180,
			watchTerms: ["nuclear phase-out health counterfactual", "nuclear proximity cancer individual exposure", "electricity comparative health emissions evidence"],
			integrityMonitors: ["Crossref and Europe PMC publication notices", "Original publisher and UNSCEAR corrections"],
			guidelineMonitors: ["IPCC energy assessments", "UNSCEAR health assessments"],
			triggerRules: ["Reassess independent outcome evidence, credible replications, changed replacement scenarios or corrections affecting cited findings. Keep coverage non-operational."]
		},
		sources: [
			...seed.sources.map((source): Source => ({
				...source,
				appraisal: "not_appraised",
				isAnchor: false,
				kind: source.doi || source.publisher === "IAEA" ? "context" : source.kind,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] : source.citationCheckedAt,
				note: source.doi
					? "Original indexed abstract assessed. A historical fuel-cycle review, not a primary clinical cohort; full methods, disclosures and underlying studies not appraised."
					: source.publisher === "IAEA"
						? "Original institutional climate context read. Older 2018/2019 statistics are not current estimates or independent comparative-health evidence."
						: "Selected original indexed chapter 6, section 6.4.2.4 assessed; direct chapter retrieval failed. Low-carbon context with cost, construction and waste constraints, not a plant-specific recommendation."
			})),
			...additions.map((source): Source => ({
				...source,
				appraisal: "not_appraised",
				isAnchor: false,
				citationStatus: source.citationStatus ?? "current",
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] : source.citationCheckedAt
			}))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
