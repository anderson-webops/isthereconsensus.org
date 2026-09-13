import type { CompleteSeedClaim } from "./claims.js";

// Source preparation does not constitute independent scientific approval.
const preparedAt = "2026-09-12T22:52:24.000Z";
const slug = "do-dietary-supplements-usually-improve-health-in-healthy-adults";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.1001/jama.2022.8970": "2026-09-12T22:51:20.926Z",
	"10.1001/jama.2021.15650": "2026-09-12T22:51:23.896Z",
	"10.1093/ajcn/nqac056": "2026-09-12T22:51:26.853Z",
	"10.1016/j.ajcnut.2023.12.011": "2026-09-12T22:51:29.869Z",
	"10.1002/alz.13078": "2026-09-12T22:51:32.737Z",
	"10.1038/s41591-026-04239-3": "2026-09-12T22:51:37.314Z",
	"10.1016/j.ajcnut.2026.101355": "2026-09-12T22:51:40.076Z"
};
const additions: Source[] = [
	{
		kind: "systematic_review",
		title: "Vitamin and Mineral Supplements for the Primary Prevention of Cardiovascular Disease and Cancer: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force",
		publisher: "JAMA",
		year: 2022,
		url: "https://doi.org/10.1001/jama.2021.15650",
		doi: "10.1001/jama.2021.15650",
		pmid: "35727272",
		stance: "supports",
		order: 3,
		note: "Original evidence report: methods, selected pooled results, limitations and funding read. Includes a small pooled cancer-incidence benefit; its scope excludes deficiency treatment and many other outcomes. Independent formal appraisal and full supplements not completed."
	},
	{
		kind: "landmark_study",
		title: "Multivitamins in the prevention of cancer and cardiovascular disease: the COcoa Supplement and Multivitamin Outcomes Study (COSMOS) randomized clinical trial",
		publisher: "The American Journal of Clinical Nutrition",
		year: 2022,
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9170475/",
		doi: "10.1093/ajcn/nqac056",
		pmid: "35294969",
		pmcid: "PMC9170475",
		stance: "supports",
		order: 4,
		note: "Original trial methods, adjudication, main results, limitations and disclosures read. Median 3.6-year follow-up limits long-latency cancer inference. Secondary lung-cancer finding is retained with its multiplicity caveat. Supplements and visual figures not independently appraised."
	},
	{
		kind: "meta_analysis",
		title: "Effect of multivitamin-mineral supplementation versus placebo on cognitive function: results from the clinic subcohort of the COcoa Supplement and Multivitamin Outcomes Study (COSMOS) randomized clinical trial and meta-analysis of 3 cognitive studies within COSMOS",
		publisher: "The American Journal of Clinical Nutrition",
		year: 2024,
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11103094/",
		doi: "10.1016/j.ajcnut.2023.12.011",
		pmid: "38244989",
		pmcid: "PMC11103094",
		stance: "context",
		order: 5,
		note: "Original methods, cognitive outcomes, attrition, results and disclosures read. Nonoverlapping subcohorts within one parent trial: global cognition pools Clinic and Mind; episodic memory also includes Web. Small test-score benefits are not demonstrated dementia prevention. Supplements and visual figures not appraised."
	},
	{
		kind: "landmark_study",
		title: "Impact of Multivitamin-Mineral and Cocoa Extract on Incidence of Mild Cognitive Impairment and Dementia: Results from the Cocoa Supplement and Multivitamin Outcomes Study for the Mind COSMOS-Mind",
		publisher: "Alzheimer's & Dementia",
		year: 2023,
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10562510/",
		doi: "10.1002/alz.13078",
		pmid: "37035889",
		pmcid: "PMC10562510",
		stance: "context",
		order: 6,
		note: "Original assessment/adjudication methods, incident outcome estimates, limitations and disclosures read. Few events and low power prevent a confident no-effect conclusion. Exploratory trajectories among converters are not an independent prevention trial. Full supplements and visual figures not appraised."
	},
	{
		kind: "landmark_study",
		title: "Effects of daily multivitamin-multimineral and cocoa extract supplementation on epigenetic aging clocks in the COSMOS randomized clinical trial",
		publisher: "Nature Medicine",
		year: 2026,
		url: "https://www.nature.com/articles/s41591-026-04239-3",
		doi: "10.1038/s41591-026-04239-3",
		pmid: "41803341",
		stance: "context",
		order: 7,
		note: "Original publisher abstract, funding, disclosures and an extended-data caption read; main methods/results require subscription access and were not appraised. Two biomarker signals do not establish longer life. Main-outcome multiplicity handling remains unassessed."
	},
	{
		kind: "landmark_study",
		title: "Multivitamin supplementation and COVID-19 incidence and symptom severity in the COcoa Supplement and Multivitamin Outcomes Study (COSMOS) randomized trial",
		publisher: "The American Journal of Clinical Nutrition",
		year: 2026,
		url: "https://pubmed.ncbi.nlm.nih.gov/42385272/",
		doi: "10.1016/j.ajcnut.2026.101355",
		pmid: "42385272",
		stance: "context",
		order: 8,
		note: "Original PubMed abstract and conflict statement read; publisher full text returned 403. Secondary analysis of 2020 outcomes, with adherence-based selection. Symptom signal is stronger in per-protocol analysis; full ascertainment, missing-data and adjustment methods remain unappraised."
	}
];

export function refreshSupplementClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "nutrition-and-diet" || seed.slug !== slug) return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "bf9db60d-9ff6-414f-8bcb-9420a2b5c146",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary: "Replaced a blanket answer with outcome-specific evidence: small cognitive and possible cancer benefits, uncertain dementia prevention, nutrient-specific harms, and qualified 2026 findings."
	};
	return {
		...seed,
		bottomLine: "There is no single answer for all supplements. In adults without a deficiency, routine multivitamins have not established broad protection against heart disease or death. Some older-adult trials show small cognitive benefits, and pooled trials suggest a modest cancer-incidence benefit. Benefits and harms depend on the product, population and outcome; treating a deficiency is a separate question.",
		stableCore: [
			"An insufficient-evidence recommendation means the balance of benefits and harms is unresolved. It does not mean every study found no benefit.",
			"The USPSTF's 2022 advice concerns prevention of cardiovascular disease and cancer in nonpregnant adults without known deficiencies. It cannot settle every supplement claim.",
			"The USPSTF recommends against beta carotene and vitamin E for those preventive purposes. Beta carotene can increase lung-cancer risk in people who smoke or have asbestos exposure.",
			"Correcting a nutrient deficiency or using a supplement for a defined medical indication differs from adding a general wellness product. Ingredients, dose and interactions matter."
		],
		openQuestions: [
			"Do the small cognitive-test benefits in older adults translate into less disability or dementia over longer follow-up?",
			"Which nutritional backgrounds, formulations and durations explain differences between trials?",
			"Do changes in aging biomarkers predict a meaningful health benefit from supplementation?"
		],
		whatWouldChangeMinds: [
			"Independent, adequately powered trials with clinically meaningful outcomes and longer follow-up, specifying formulation, baseline nutrition and harms.",
			"Replication of benefits outside the same parent trial, with prespecified analyses, transparent missing-data handling and results across diverse populations."
		],
		misconceptions: [
			"A benefit on one memory test does not establish prevention of dementia, heart disease or death.",
			"A model describing two years of cognitive aging is not an observed two-year delay in dementia.",
			"A small change in an epigenetic clock is not proof of rejuvenation or extra years of life.",
			"Natural does not guarantee safety, and a favorable per-protocol result is not interchangeable with the main randomized comparison."
		],
		editorSummary: "The earlier 'usually not' answer hid important differences. This revision retains modest positive findings and explains what they do and do not establish. It separates prevention guidance, clinical outcomes, cognitive scores and exploratory biomarkers, while preserving the original two citation identities and history.",
		uncertaintySummary: "Evidence varies by nutrient and outcome. Moderate overall certainty is an editorial judgment about this qualified conclusion, not a formal grade for every result; individual summaries remain unrated. Positive cognitive findings warrant attention, while short follow-up, selected older samples and one research program limit broader claims. No measured expert-agreement percentage or independent expert approval is asserted.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "Older volunteer cohorts and specific formulations cannot represent all adults or supplements." },
			{ type: "indirectness", detail: "Cognitive scores and aging biomarkers differ from dementia, disability and survival." },
			{ type: "imprecision", detail: "Few dementia events and short follow-up leave substantial uncertainty about long-term outcomes." }
		],
		evidenceCertainty: "moderate",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-12T22:51:40.076Z",
		searchDatabases: ["Targeted original publications and reference tracing, not an exhaustive systematic search", "Consensus discovery with fetched records followed by original-source verification", "Crossref and Europe PMC publication-notice metadata"],
		inclusionRules: ["Identify the supplement, population, comparator and outcome before interpreting a benefit.", "Retain relevant positive, null and harmful findings; distinguish main analyses from exploratory and per-protocol results."],
		exclusionRules: ["Do not generalize vitamin/mineral results to every botanical, sports supplement or treatment indication.", "Do not count repeated COSMOS reports as independent parent trials or use biomarkers as established survival benefits."],
		appraisalTools: ["Narrative assessment of design, outcomes, access limits and disclosures; no independent formal risk-of-bias assessment"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "The USPSTF evidence report was AHRQ-funded and reports no conflicts. COSMOS reports NIH support, Mars Edge funding and Pfizer/Haleon product support, with investigator industry relationships. The aging report also discloses FOXO support and a former employee's involvement. Reported funder-role statements are documented in the source record; this is not an independent conflicts audit.",
		independenceSummary: "The cancer, cognition, dementia, aging and COVID reports share the COSMOS research program. Cognitive pooling removes participant overlap for the relevant endpoints, but it is not replication across independent trials. Seven Crossref checks and two Europe PMC checks returned no registered updates; five Europe PMC requests failed with HTTP 503. Missing notices do not certify validity.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What does the prevention evidence show?",
				population: "O'Connor 2022: 84 studies across supplements; generally healthy adults without known deficiencies",
				finding: "The review found a small pooled cancer-incidence benefit for multivitamins, but little support for broad cardiovascular or mortality benefits. The USPSTF still judged the overall balance insufficient for multivitamins and most individual nutrients.",
				effectDirection: "mixed",
				magnitude: "Any cancer: odds ratio 0.93 (95% CI 0.87 to 0.99), four trials with 48,859 participants. Absolute differences in adequately powered trials ranged from 0.2 to 1.2 percentage points lower.",
				limitations: ["Few large trials, different formulations and durations, many analyses. These are cancer-prevention findings, not an assessment of every supplement use."]
			},
			{
				question: "Why can one large trial differ from the pooled result?",
				population: "Sesso 2022 COSMOS: 21,442 older US adults; median 3.6 years",
				finding: "The main comparison did not show a clear reduction in invasive cancer. Cardiovascular events and all-cause death also had estimates compatible with no effect. A lower lung-cancer rate was a secondary finding without adjustment for multiple comparisons.",
				effectDirection: "mixed",
				magnitude: "Cancer HR 0.97 (95% CI 0.86 to 1.09); cardiovascular events 0.98 (0.86 to 1.12); death 0.93 (0.81 to 1.08); secondary lung cancer 0.62 (0.42 to 0.92).",
				limitations: ["Short for cancer latency, selected volunteers and one formulation. The lung finding is hypothesis-generating. COSMOS is included in the 2022 synthesis, not an independent addition to its participant total.", "Self-reported gastrointestinal bleeding was more frequent with multivitamins (HR 1.17, 95% CI 1.03 to 1.32). This also comes from multiple secondary comparisons and needs cautious interpretation."]
			},
			{
				question: "Are there cognitive benefits?",
				population: "Vyas 2024: nonoverlapping COSMOS cognitive subcohorts, with two to three years of follow-up",
				finding: "Pooled results favored multivitamins for global cognition and episodic memory. Global cognition combines Clinic and Mind; memory also includes Web. The Clinic primary estimate alone included no difference, while its secondary memory estimate favored supplementation.",
				effectDirection: "supports",
				magnitude: "Global cognition: 0.07 standard-deviation units (95% CI 0.03 to 0.11; 2,731 participants). Episodic memory: 0.06 (0.03 to 0.10; 5,203 participants). These are small test-score differences.",
				limitations: [
					"Clinic retained 492 of 573 baseline-complete participants at two years; models assume missingness is explainable by observed data.",
					"Secondary analyses lacked multiplicity control. Limited diversity and one parent trial/formulation constrain generalization."
				]
			},
			{
				question: "Does that establish dementia prevention?",
				population: "Sachs 2023 COSMOS-Mind: 2,262 enrolled older adults, with three years of cognitive follow-up",
				finding: "Blinded adjudication identified 110 incident mild-cognitive-impairment cases and 14 probable-dementia cases. Neither comparison established a reduction; low power also prevents ruling out meaningful benefit or harm.",
				effectDirection: "unclear",
				magnitude: "Mild cognitive impairment HR 0.91 (95% CI 0.63 to 1.32); probable dementia 0.76 (0.27 to 2.20).",
				limitations: [
					"Few events, 2,082 participants with at least one follow-up, baseline cases excluded from the respective incidence analyses.",
					"Telephone testing and proxy information informed adjudication. This is part of the same program as the cognitive-score findings."
				]
			},
			{
				question: "What do the 2026 aging and infection reports add?",
				population: "COSMOS: 958 participants in the aging analysis; 18,205 retained and adherent at January 2020 in the COVID analysis",
				finding: "The aging report describes small favorable changes in two epigenetic clocks over two years, with uncertain clinical meaning. The COVID report did not establish fewer infections; a symptom signal was stronger in a secondary per-protocol analysis.",
				effectDirection: "mixed",
				magnitude: "COVID incidence HR 0.93 (95% CI 0.81 to 1.07). Among 338 cases with symptom data, the symptomatic-illness odds ratio was 0.70 (0.44 to 1.11) in the main analysis and 0.60 (0.37 to 0.99) per protocol.",
				limitations: [
					"Original abstracts and available disclosures checked; full methods were unavailable. Biomarkers do not establish survival benefit.",
					"Selection, symptom-data availability and 2020 timing limit infection inference; the secondary finding does not establish general immune protection."
				]
			}
		],
		surveillanceSpec: {
			focus: "Supplement benefits and harms by population, formulation and clinical outcome",
			cadenceDays: 180,
			watchTerms: ["multivitamin cognition dementia independent randomized trial", "multivitamin cancer mortality follow-up", "COSMOS epigenetic aging clinical outcomes"],
			integrityMonitors: ["Crossref and Europe PMC publication-notice metadata", "Original publisher corrections"],
			guidelineMonitors: ["USPSTF vitamin/mineral prevention guidance", "NIH Office of Dietary Supplements"],
			triggerRules: ["Reassess updated guidance, independently replicated clinical benefits, longer follow-up or new serious harms."]
		},
		sources: [
			...seed.sources.map(source => ({
				...source,
				kind: source.doi ? source.kind : "context" as const,
				appraisal: "not_appraised" as const,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] ?? source.citationCheckedAt : source.citationCheckedAt,
				note: source.doi
					? "Original USPSTF recommendation and rationale read. Insufficient evidence for multivitamins/most nutrients in CVD and cancer prevention; recommends against beta carotene and vitamin E for those purposes. Not a verdict on every supplement or deficiency treatment."
					: "NIH consumer guidance; original effectiveness and safety sections read. Context for specific indications, ingredients and interactions, not a randomized trial or formal clinical recommendation for every healthy adult."
			})),
			...additions.map(source => ({ ...source, appraisal: "not_appraised" as const, citationStatus: "current" as const, citationCheckedAt: noticeChecks[source.doi!.toLowerCase()] }))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
