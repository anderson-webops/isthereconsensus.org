import type { CompleteSeedClaim } from "./claims.js";

const preparedAt = "2026-09-13T03:43:58.087Z";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.1136/bmj-2021-069445": "2026-09-13T03:34:13.759Z",
	"10.1016/s0140-6736(22)00791-7": "2026-09-13T03:34:16.307Z",
	"10.1161/circulationaha.122.059970": "2026-09-13T03:34:19.122Z",
	"10.1001/jama.2024.16380": "2026-09-13T03:34:21.868Z",
	"10.1093/eurheartj/ehae056": "2026-09-13T03:34:24.734Z"
};
const additions: Source[] = [
	{
		kind: "guideline",
		title: "FDA Approves Required Updated Warning in Labeling of mRNA COVID-19 Vaccines Regarding Myocarditis and Pericarditis Following Vaccination",
		publisher: "U.S. Food and Drug Administration",
		year: 2025,
		url: "https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/fda-approves-required-updated-warning-labeling-mrna-covid-19-vaccines-regarding-myocarditis-and",
		stance: "supports",
		order: 6,
		note: "Original June 25, 2025 safety communication read. Its claims estimates concern the 2023–2024 formula, and its MRI discussion summarizes older-formula follow-up; underlying analyses were not independently reappraised."
	},
	{
		kind: "landmark_study",
		title: "Booster vaccination with SARS-CoV-2 mRNA vaccines and myocarditis in adolescents and young adults: a Nordic cohort study",
		publisher: "European Heart Journal",
		year: 2024,
		url: "https://pubmed.ncbi.nlm.nih.gov/38365960/",
		doi: "10.1093/eurheartj/ehae056",
		pmid: "38365960",
		stance: "supports",
		order: 7,
		note: "Original author abstract and bibliographic record assessed after the fetched Consensus record. Publisher full-text retrieval failed; full methods, calendar dates, figures, supplements and disclosures not appraised."
	},
	{
		kind: "landmark_study",
		title: "Long-Term Prognosis of Patients With Myocarditis Attributed to COVID-19 mRNA Vaccination, SARS-CoV-2 Infection, or Conventional Etiologies",
		publisher: "JAMA",
		year: 2024,
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11348078/",
		doi: "10.1001/jama.2024.16380",
		pmid: "39186694",
		stance: "supports",
		order: 8,
		note: "Selected original design, results, limitations and disclosures assessed. Not every limitation, supplement, underlying record or MRI outcome independently appraised. Later retrieval was restricted; no additional assessment inferred."
	}
];

export function refreshMyocarditisClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "health-and-medicine" || seed.slug !== "how-big-is-the-myocarditis-risk-after-mrna-covid-19-vaccination") return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "f74e9911-4a9c-4a90-92d5-eea8b6856f17",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary: "Added dated absolute-risk estimates, booster and longer-term outcome evidence; separated case definitions, risk windows, subgroup infection comparisons, clinical recovery and persistent MRI findings."
	};
	return {
		...seed,
		bottomLine: "Myocarditis after mRNA COVID-19 vaccination is rare but real, with higher risk in adolescent and young adult males, especially after dose two in early vaccination programs. There is no single rate for every product, dose, age or formulation. Many patients improve, but clinical recovery and normal heart imaging are not the same outcome, and longer-term consequences remain under study.",
		stableCore: [
			"A population-average rate can hide a higher-risk subgroup; the highest subgroup rate should not be applied to everyone.",
			"Myocarditis alone, myocarditis plus pericarditis, hospital diagnoses and broader claims-based diagnoses are different outcomes.",
			"Observed cases after vaccination and estimated excess cases attributed to an exposure are not interchangeable.",
			"Vaccine-versus-infection comparisons depend on age, sex, product, era and outcome. They do not by themselves measure the complete benefits and harms of vaccination."
		],
		openQuestions: [
			"What are the risks for the latest formulations and schedules in populations with different infection histories?",
			"Which persistent symptoms or imaging abnormalities predict clinically important long-term outcomes?",
			"How do case recognition, infection testing and the choice of comparison period affect risk estimates?"
		],
		whatWouldChangeMinds: [
			"Well-designed current-formulation surveillance identifying a materially different risk level, distribution or outcome pattern.",
			"Longer, well-retained follow-up connecting imaging findings and symptoms to clinically important outcomes, with appropriate comparison groups."
		],
		misconceptions: [
			"Rare does not mean imaginary or harmless, and hospitalization does not by itself establish permanent injury.",
			"A favorable overall infection comparison does not establish that infection-associated myocarditis risk is higher for every vaccine and subgroup.",
			"A normal activity clearance, a clinician's recovery assessment and disappearance of all MRI abnormalities are different endpoints.",
			"Chest pain, shortness of breath or palpitations after vaccination warrant prompt medical attention rather than self-diagnosis from population statistics."
		],
		editorSummary: "The earlier review identified the signal but supplied few concrete comparisons. This revision explains what selected studies and surveillance estimates measure, including important subgroup exceptions and limits to reassuring recovery summaries. It provides clinical context, not individual vaccination advice or biological research procedures.",
		uncertaintySummary: "Moderate overall certainty is an editorial judgment about this mixed, evolving risk-and-outcome question, not a new formal grading exercise. Individual summaries remain unrated. The safety signal is established, while precise current-formulation rates and long-term prognosis are less certain. The agreement label is not a new expert survey.",
		uncertaintyDrivers: [
			{ type: "bias", detail: "Claims codes, hospital diagnoses, myocarditis/pericarditis definitions and surveillance ascertainment differ." },
			{ type: "generalizability", detail: "Early-dose and historical-formulation estimates do not transfer automatically to every current product or subgroup." },
			{ type: "timing", detail: "Different risk windows, changing infection detection and limited long-term follow-up affect comparisons." }
		],
		evidenceCertainty: "moderate",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-13T03:34:24.734Z",
		searchDatabases: [
			"Targeted original clinical studies, author abstracts and regulator guidance; not an exhaustive systematic search",
			"Consensus discovery followed by fetched records and original-source verification",
			"Crossref and Europe PMC publication-notice metadata"
		],
		inclusionRules: ["Specify product, dose, population, formulation era, comparison, outcome and risk window where available.", "Distinguish incidence, excess risk, prognosis among cases and the meaning of recovery."],
		exclusionRules: ["Do not substitute spontaneous-report totals for causal incidence estimates.", "Do not turn an older observational interval comparison into generic current dosing advice or experimental instructions."],
		appraisalTools: ["Narrative assessment of clinical endpoints, denominators, confounding, selection and access; no independent formal risk-of-bias grading"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "Wong's original abstract reports FDA funding. FDA identifies funding and coauthorship of the imaging follow-up it summarizes. Semenzato reports one author's nonfinancial French Society of Cardiology support outside the study and no other disclosures. Full Hviid and baseline-study disclosures were not all available or assessed; no blanket absence of conflicts is inferred.",
		independenceSummary: "Regulatory summaries can reuse the same evidence as published studies; their repetition is not independent replication. Repeated follow-up of patients and shared national data systems also need care. Ten successful notice responses found no registered updates across five study DOIs, not proof of scientific validity. No new notice-check date is invented for non-DOI guidance.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What does a more recent formulation-specific estimate show?",
				population: "FDA June 2025 communication, U.S. claims after the 2023–2024 formula",
				finding: "Unadjusted myocarditis and/or pericarditis incidence during days 1–7 was about 8 cases per million doses for ages 6 months–64 years, and 27 per million doses for males 12–24 years.",
				effectDirection: "supports",
				magnitude: "Observed combined diagnoses per dose, not estimated causal excess risk.",
				limitations: ["Claims ascertainment, a short window and a specific formulation era limit interpretation. These are not automatically 2026 rates or comparable with myocarditis-only, 28-day studies."]
			},
			{
				question: "Does a booster have exactly the same evidence as dose two?",
				population: "Hviid 2024: 8.9 million Nordic residents aged 12–39",
				finding: "Among males, myocarditis risk within 28 days of a third dose was 0.86 [95% CI 0.53–1.32] per 100,000 vaccinated people for Pfizer and 1.95 [0.53–4.99] for Moderna. Rates were higher than in the comparison period at least 28 days after dose two.",
				effectDirection: "supports",
				magnitude: "Inpatient myocarditis in a booster comparison, not a placebo-controlled estimate.",
				limitations: ["Original author abstract only. Full adjustment choices, calendar dates and disclosures were not appraised; wide intervals and different products or populations preclude a universal rate."]
			},
			{
				question: "Is infection-associated myocarditis risk always higher?",
				population: "Patone 2022: vaccinated people aged 13 or older in England, December 2020–December 2021",
				finding: "The overall result did not apply uniformly. For men under 40, estimated excess myocarditis admissions or deaths per million were 97 [95% CI 91–99] after Moderna dose two versus 16 [12–18] after a positive infection test, within days 1–28.",
				effectDirection: "supports",
				magnitude: "A subgroup comparison of excess events, not all observed cases or a complete benefit-risk calculation.",
				limitations: ["Original abstract of a self-controlled case series assessed. Infection detection, calendar period and time-varying factors matter; full methods and supplementary estimates were not independently appraised."]
			},
			{
				question: "What does longer follow-up among hospitalized cases add?",
				population: "Semenzato 2024: French patients aged 12–49 hospitalized for myocarditis in 2020–2022",
				finding: "Over 18 months, a composite of myopericarditis readmission, other cardiovascular events or death occurred in 32 of 558 postvaccine cases versus 497 of 3,779 conventional cases. The weighted hazard ratio was 0.55 [95% CI 0.36–0.86]. Lower complication frequency is not a guarantee of full recovery.",
				effectDirection: "supports",
				magnitude: "Prognosis among hospitalized cases, not vaccinated-versus-unvaccinated incidence.",
				limitations: ["Exposure windows classify cases rather than proving each cause. Hospital selection, recognition and confounding limit causal comparison; the outcome does not establish symptom resolution or normalized MRI for everyone."]
			},
			{
				question: "Why can clinical recovery and abnormal imaging coexist?",
				population: "CDC 2025 monitoring presentation and FDA's separate imaging follow-up summary",
				finding: "CDC reports provider-assessed full or probable recovery in 83% at at least 90 days and over 90% at at least one year among surveyed young cases from 2021. Its one-year data are labeled unpublished. FDA separately describes persistent injury markers on MRI with uncertain long-term significance.",
				effectDirection: "supports",
				magnitude: "Different outcomes and follow-up populations, not interchangeable recovery percentages.",
				limitations: [
					"The original CDC slide and FDA communication were assessed, not all underlying patient records or MRI analyses.",
					"Follow-up selection and differing definitions limit comparisons; neither inevitable damage nor universal complete recovery follows."
				]
			},
			{
				question: "What does the earlier U.S. product comparison establish?",
				population: "Wong 2022 claims cohort, vaccine recipients aged 18–64",
				finding: "Combined myocarditis/pericarditis diagnoses during days 1–7 were most frequent among young men after dose two. The head-to-head Moderna-versus-Pfizer incidence rate ratio was 1.43 [95% CI 0.88–2.34], leaving uncertainty about the size of a product difference.",
				effectDirection: "supports",
				magnitude: "A comparison of diagnosis rates, not proof that the products are equivalent.",
				limitations: ["Original author abstract only. Historical expected rates and claims codes have limitations. The reported age-specific incidence rates use person-days, which must not be mistaken for per-dose risks."]
			},
			{
				question: "Does a living-review label mean its evidence is current?",
				population: "BMJ 2022 living evidence synthesis, main database search through January 10, 2022",
				finding: "The review brings together incidence, risk-factor and outcome evidence, but its longer-term evidence was limited. Its publication label does not make early-dose estimates or small follow-up series representative of every later formulation.",
				effectDirection: "unclear",
				magnitude: "An older synthesis with explicitly bounded coverage.",
				limitations: ["Original author abstract assessed, not every study or the full risk-of-bias process. Its evidence categories overlap, so adding their counts does not yield independent study totals."]
			}
		],
		surveillanceSpec: {
			focus: "Clinical myocarditis risk and longer-term outcomes after mRNA COVID-19 vaccination",
			cadenceDays: 90,
			watchTerms: ["updated COVID vaccine myocarditis absolute risk age sex", "vaccine associated myocarditis long term clinical outcomes", "myocarditis formulation surveillance correction"],
			integrityMonitors: ["Crossref and Europe PMC publication-notice metadata", "Original publisher corrections"],
			guidelineMonitors: ["FDA safety communications and CDC clinical guidance"],
			triggerRules: ["Review new formulation-specific surveillance, clinically meaningful longer follow-up or material corrections; keep coverage clinical and non-operational."]
		},
		sources: [
			...seed.sources.map((source): Source => ({
				...source,
				appraisal: "not_appraised",
				isAnchor: false,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] : source.citationCheckedAt,
				note: source.doi
					? "Original author abstract verified through Europe PMC, with study identity, clinical outcomes and comparison limits. Full text was not successfully assessed in this refresh; no complete methods, disclosures, supplements or formal grading claim."
					: source.kind === "context"
						? "Original June 25, 2025 slide 24 visually assessed. Its recovery figures concern reported cases from 2021, and the one-year data are expressly unpublished. Other slides and underlying studies not comprehensively appraised."
						: "Original clinical myocarditis section read; page dated November 4, 2025. Current interval wording is narrowly scoped, not generic dosing advice. No new publication or source-notice date inferred from access."
			})),
			...additions.map((source): Source => ({ ...source, appraisal: "not_appraised", isAnchor: false, citationStatus: "current", citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] : undefined }))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
