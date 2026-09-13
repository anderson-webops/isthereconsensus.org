import type { CompleteSeedClaim } from "./claims.js";

// Preparation and publication-notice checks do not confer expert approval.
const preparedAt = "2026-09-12T23:22:15.000Z";
const slug = "do-covid-19-vaccines-cause-infertility";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.1093/aje/kwac011": "2026-09-12T23:12:16.882Z",
	"10.1016/j.vaccine.2022.09.019": "2026-09-12T23:12:19.350Z",
	"10.1097/aog.0000000000005310": "2026-09-12T23:12:24.088Z",
	"10.3389/fendo.2025.1587251": "2026-09-12T23:12:26.694Z",
	"10.3389/fendo.2025.1491259": "2026-09-12T23:12:29.339Z"
};
const additions: Source[] = [
	{
		kind: "meta_analysis",
		title: "Coronavirus Disease 2019 (COVID-19) Vaccination and Assisted Reproduction Outcomes: A Systematic Review and Meta-analysis",
		publisher: "Obstetrics & Gynecology",
		year: 2024,
		url: "https://pubmed.ncbi.nlm.nih.gov/37441788/",
		doi: "10.1097/AOG.0000000000005310",
		pmid: "37441788",
		stance: "supports",
		order: 5,
		note: "Original PubMed abstract and financial disclosures read. Online July 2023, February 2024 issue. Searches ended January 2023, before the two 2025 cohorts discussed here. Full synthesis methods, supplements and visual figures not independently appraised. Null tests are not equivalence tests."
	},
	{
		kind: "landmark_study",
		title: "Associations between inactivated COVID-19 vaccination status and timing and fertility and pregnancy outcomes following frozen-thawed embryo transfer: a prospective cohort study",
		publisher: "Frontiers in Endocrinology",
		year: 2025,
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12240746/",
		doi: "10.3389/fendo.2025.1587251",
		pmid: "40642511",
		pmcid: "PMC12240746",
		stance: "context",
		order: 6,
		note: "Original recruitment, exclusions, exposure/outcome definitions, adjusted models, selected main results, limitations and disclosures read. Lower frozen-transfer success is a relevant signal, not proof of permanent infertility or an mRNA effect. Full supplements, visual figures and raw data not appraised."
	},
	{
		kind: "landmark_study",
		title: "The impact of inoculation with the inactivated COVID-19 vaccine on the outcomes of in vitro fertilization and embryo transfer: a cohort study of 1,258 women from Sichuan, China",
		publisher: "Frontiers in Endocrinology",
		year: 2025,
		url: "https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2025.1491259/full",
		doi: "10.3389/fendo.2025.1491259",
		pmid: "40556827",
		stance: "context",
		order: 7,
		note: "Original eligibility, vaccine records, statistical methods, selected outcome tables, limitations and disclosures read. Fresh-transfer subset is smaller than the enrollment cohort; comparisons are unadjusted. Not an exact replication of a frozen-transfer study. Full figures, supplements and raw data not appraised."
	}
];

export function refreshFertilityClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "health-and-medicine" || seed.slug !== slug) return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "189b6ff6-f0a5-4e81-a4cb-adbe75ec0ef0",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary: "Qualified the blanket answer by vaccine platform and outcome. Added assisted-reproduction evidence, including a 2025 inactivated-vaccine signal, and clarified what the National Academies review concluded."
	};
	return {
		...seed,
		bottomLine: "Evidence does not support the blanket claim that COVID-19 vaccines cause infertility. Findings for the studied mRNA vaccines are reassuring, but evidence is not equally strong for every platform or treatment setting. Some inactivated-vaccine studies report lower assisted-reproduction success in specific circumstances; these findings deserve follow-up and do not establish permanent infertility.",
		stableCore: [
			"The 2024 National Academies review favored rejecting a causal link between female infertility and the Pfizer-BioNTech or Moderna mRNA vaccines. It found evidence inadequate for firm conclusions about the Janssen and Novavax vaccines.",
			"A prospective study of couples trying to conceive found no appreciable reduction in per-cycle conception probability after either partner's vaccination, within its observed follow-up.",
			"Spontaneous conception, success of an embryo-transfer cycle, ovarian-reserve markers and semen measurements answer different questions.",
			"A change in menstrual timing or a laboratory marker is not itself a diagnosis of infertility. Conversely, a reassuring pooled estimate does not erase a specific contrary finding."
		],
		openQuestions: [
			"Do independent cohorts reproduce the inactivated-vaccine timing signal, with comparable treatment protocols and better control of selection and confounding?",
			"What do longer follow-up and cumulative live-birth outcomes show across vaccine platforms, infection histories and patient groups?",
			"How can fertility outcomes be assessed separately from short-lived symptoms and changes in individual laboratory measures?"
		],
		whatWouldChangeMinds: [
			"Reproducible reductions in meaningful reproductive outcomes in well-controlled independent studies, with a defined platform, population and time window.",
			"Evidence that resolves whether a treatment-specific association reflects vaccination, patient selection, infection or other treatment differences."
		],
		misconceptions: [
			"Insufficient evidence about one vaccine platform is not proof that it causes infertility, and evidence about another platform cannot automatically fill that gap.",
			"A nonsignificant difference does not prove two groups are equivalent; its confidence interval still matters.",
			"A study of inactivated vaccines does not directly test an mRNA vaccine.",
			"An observational timing association does not establish a universal waiting period before fertility treatment."
		],
		editorSummary: "The earlier answer treated heterogeneous evidence too uniformly. This revision specifies the National Academies' platform-specific conclusions, adds a newer assisted-reproduction synthesis, and retains both a lower-success signal and a different 2025 cohort with no clear difference. Their designs and outcomes are explained instead of using study counts as votes.",
		uncertaintySummary: "The broad infertility claim is unsupported, while platform-specific gaps and treatment-specific signals remain. Moderate overall certainty is an editorial judgment about this qualified synthesis, not a formal grade for each result. Individual summaries remain unrated. The retained agreement label is not a measured expert survey.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "Evidence differs across vaccine platforms, spontaneous conception and selected fertility-treatment populations." },
			{ type: "bias", detail: "Observational comparisons may retain confounding, selection effects and exposure misclassification." },
			{ type: "imprecision", detail: "Several platform-specific, male and live-birth estimates remain too imprecise to exclude small effects." }
		],
		evidenceCertainty: "moderate",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-12T23:12:29.339Z",
		searchDatabases: ["Targeted original studies, evidence-review chapters and reference tracing; not an exhaustive systematic search", "Consensus discovery with fetched records and original-source verification", "Crossref and Europe PMC publication-notice metadata"],
		inclusionRules: ["Separate platform, exposure timing, treatment population and reproductive outcome.", "Retain relevant contrary findings and inspect denominators, study selection and uncertainty."],
		exclusionRules: ["Do not equate laboratory-marker changes or a failed treatment cycle with permanent infertility.", "Do not count overlapping studies in multiple syntheses as independent replications or infer universal policy from a narrow outcome review."],
		appraisalTools: ["Narrative assessment of study design, selection, outcome definitions and disclosures; no independent formal risk-of-bias assessment"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "Wesselink reports NICHD funding and an author's AbbVie consulting and fertility-product in-kind support. Chamani discloses reproductive-industry employment, advisory and ownership interests. Liu and Wei report public/institutional research funding and declare no relevant commercial conflicts. Zace declares no competing interests. Other disclosures were not fully assessed; this is not an independent conflicts audit.",
		independenceSummary: "The 2022 and 2024 syntheses cover overlapping earlier evidence and predate the two 2025 reports. The 2025 cohorts come from different centers and examine different transfer settings. Ten Crossref/Europe PMC queries found no registered updates for five DOIs; that metadata coverage does not certify scientific validity.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What did the National Academies conclude?",
				population: "2024 review of female infertility, with separate conclusions for four vaccine products",
				finding: "Evidence favored rejecting a causal relationship for BNT162b2 and mRNA-1273. Evidence for Ad26.COV2.S and NVX-CoV2373 was inadequate to accept or reject a causal relationship. Those distinctions should not be collapsed into an equally certain verdict for all products.",
				effectDirection: "supports",
				magnitude: "Product-specific causal assessments, not a survey percentage or a new randomized trial.",
				limitations: ["This review concerns female infertility. Its conclusions predate the 2025 studies discussed below and do not constitute an endorsement of this updated synthesis."]
			},
			{
				question: "What about couples trying to conceive spontaneously?",
				population: "Wesselink 2022: 2,126 US/Canadian couples; male vaccination information available for 1,369",
				finding: "Adjusted per-cycle conception estimates were compatible with little difference after vaccination of either partner. Vaccination status was updated over time. The study distinguished vaccination from reported infection; its short-term male-infection estimate was imprecise.",
				effectDirection: "supports",
				magnitude: "Fecundability ratio: female vaccination 1.08 (95% CI 0.95 to 1.23); male vaccination 0.95 (0.83 to 1.10).",
				limitations: ["Self-reported exposure and menstrual information, residual confounding, and a mostly White, highly educated cohort. Attempts occurred zero to eleven months after vaccination, averaging 3.5 months; this is not lifelong follow-up."]
			},
			{
				question: "What do pooled assisted-reproduction studies show?",
				population: "Chamani 2024: 25 studies, including 19 reporting embryo-transfer outcomes",
				finding: "The pooled clinical-pregnancy and live-birth estimates did not establish reductions after vaccination. Confidence intervals still allow some differences; the live-birth estimate is less precise. Different endpoint samples overlap and should not be added together as unique participants.",
				effectDirection: "supports",
				magnitude: "Clinical pregnancy OR 0.94 (95% CI 0.88 to 1.01); live birth OR 0.95 (0.78 to 1.17).",
				limitations: ["Original abstract and disclosures assessed; full synthesis methods not appraised. Search ended January 2023, so it does not resolve the later 2025 findings. Null significance tests do not demonstrate equivalence."]
			},
			{
				question: "What is the contrary 2025 frozen-transfer finding?",
				population: "Liu 2025: 2,733 women at one Chinese center, including 742 with inactivated vaccination",
				finding: "Vaccinated women had lower clinical-pregnancy and live-birth rates after their first frozen embryo transfer. Associations were stronger for vaccination before ovarian stimulation. This is a relevant treatment-specific signal that needs independent investigation.",
				effectDirection: "mixed",
				magnitude: "Adjusted clinical-pregnancy RR 0.92 (95% CI 0.86 to 0.98); live-birth RR 0.89 (0.82 to 0.98).",
				limitations: [
					"Nonrandomized, one center/platform; residual socioeconomic and clinical confounding. Exclusions based on follow-up, infection and missing data can affect selection.",
					"Adjustment includes treatment and embryo features that may be downstream of exposure, complicating causal interpretation. It does not establish permanent infertility or a universal timing rule."
				]
			},
			{
				question: "Did a different 2025 cohort reproduce that result?",
				population: "Wei 2025: 1,258 enrolled women; fresh-transfer outcomes in 475 vaccinated and 312 unvaccinated women",
				finding: "Fresh-transfer clinical-pregnancy and live-birth rates showed no clear difference after CoronaVac vaccination. The study provides a different observation, but its fresh-transfer setting and analysis cannot directly settle the frozen-transfer signal.",
				effectDirection: "unclear",
				magnitude: "Live birth: 220/475 (46.3%) versus 139/312 (44.6%); reported P = 0.627.",
				limitations: ["Unadjusted comparisons and a selected transfer subset. Small dose/timing groups, one center and limited generalizability. Lack of statistical significance is not proof of identical outcomes."]
			}
		],
		surveillanceSpec: {
			focus: "Fertility outcomes by vaccine platform, infection history and treatment setting",
			cadenceDays: 180,
			watchTerms: ["COVID vaccination fecundability prospective cohort", "inactivated vaccine frozen embryo transfer timing live birth", "mRNA vaccination fertility long-term cohort"],
			integrityMonitors: ["Crossref and Europe PMC publication-notice metadata", "Original publisher corrections"],
			guidelineMonitors: ["National Academies vaccine adverse-effects evidence reviews", "Reproductive-medicine evidence assessments"],
			triggerRules: ["Reassess independent replication, longer outcome follow-up, changed platform-specific causal assessments or corrections to a cited study."]
		},
		sources: [
			...seed.sources.map(source => ({
				...source,
				appraisal: "not_appraised" as const,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] ?? source.citationCheckedAt : source.citationCheckedAt,
				note: source.doi === "10.1093/aje/kwac011"
					? "Original recruitment, time-varying models, selected results, missing-data approach, limitations and disclosures read. Adjusted conception estimates, not lifelong infertility incidence. Full tables, visual figures and supplements not independently appraised."
					: source.doi
						? "Original 2022 synthesis: selected methods, results, author quality assessments and limitations read. Mixes reproductive markers and clinical outcomes; most studies were rated moderate or poor by its authors, with short follow-up. Not proof that every individual result was unchanged."
						: source.publisher.includes("National Academies")
							? "Original chapter scope, selected mechanistic discussion and product-specific conclusions read. Favors rejecting a female-infertility link for the two mRNA vaccines; inadequate evidence for Janssen and Novavax. Predates the 2025 cohorts. Full committee appraisal and disclosures not independently reassessed."
							: "Original fertility and menstrual-change sections read through the web tool; direct retrieval returned 403. Page displays September 9, 2024. Retained as public-health context; its historical wording does not replace assessment of newer studies or establish current vaccine policy."
			})),
			...additions.map(source => ({ ...source, appraisal: "not_appraised" as const, citationStatus: "current" as const, citationCheckedAt: noticeChecks[source.doi!.toLowerCase()] }))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
