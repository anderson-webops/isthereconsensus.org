import type { CompleteSeedClaim } from "./claims.js";

// Actual preparation time; never independent expert approval or a new scientific review date.
const checkedAt = "2026-09-12T19:52:01.621Z";
type Source = CompleteSeedClaim["sources"][number];
const childhoodSlug = "do-childhood-vaccines-cause-autism";
const mmrSlug = "does-the-mmr-vaccine-cause-autism";

const common: Partial<CompleteSeedClaim> = {
	searchCutoffAt: checkedAt,
	lastRetractionCheckAt: "2026-09-12T19:20:31.964Z",
	searchDatabases: [
		"Targeted institutional and original-publication checks; not an exhaustive systematic search",
		"PubMed and Europe PMC indexed original abstracts; publisher and WHO full-text sections where accessible",
		"Crossref and Europe PMC notice metadata, distinct from scientific assessment"
	],
	inclusionRules: [
		"Separate MMR, other vaccines, thiomersal and aluminium exposures; specify population, outcome and follow-up.",
		"Give greater weight to comparative individual-level studies and appraised syntheses than ecological correlations or uncontrolled reports."
	],
	exclusionRules: [
		"Do not count overlapping studies or institutional statements as independent votes.",
		"Do not infer causation from timing, a mechanism alone, or an unadjusted comparison; do not turn a nonsignificant result into proof of exact zero risk."
	],
	appraisalTools: ["Narrative assessment of design, applicability, precision and disclosures; no independent GRADE or formal risk-of-bias assessment"],
	authorLine: "Source-controlled synthesis prepared with AI assistance.",
	reviewerLine: "Scoped source verification; no independent expert approval recorded.",
	independenceSummary: "Agency statements and overlapping reviews do not provide separate replications. Site agreement labels are editorial assessments, not measured percentages of experts. A metadata check does not establish scientific validity.",
	institutionalAnchors: [
		{ name: "World Health Organization GACVS", role: "December 2025 evidence assessment, with study quality and exposure-specific scope" },
		{ name: "US Centers for Disease Control and Prevention", role: "Current public communication, which differs in framing from WHO; not a new experiment" }
	],
	uncertaintyDrivers: [
		{ type: "bias", detail: "Vaccination, healthcare attendance and diagnostic recording can differ between comparison groups." },
		{ type: "generalizability", detail: "Evidence for one vaccine, schedule or population does not supply identical precision for every other exposure." },
		{ type: "imprecision", detail: "Large studies constrain population-average effects better than very rare effects or small susceptible subgroups." }
	],
	surveillanceSpec: {
		focus: "Exposure-specific vaccine safety, autism diagnoses and changes to source records",
		cadenceDays: 180,
		watchTerms: ["MMR autism cohort", "vaccine aluminium autism systematic review", "vaccines thiomersal autism evidence review"],
		integrityMonitors: ["Crossref and Europe PMC notice metadata", "Publisher corrections and corrected supplements"],
		guidelineMonitors: ["WHO GACVS", "CDC vaccine-safety communication and its cited evidence"],
		triggerRules: ["Reassess new comparative evidence, a material correction or changed guidance against the actual studied exposure and outcome."]
	}
};

const us2026: Source = {
	kind: "landmark_study",
	title: "Association Between First MMR Vaccination Before Age 2 Years and Childhood Autism in a U.S. EHR Cohort of 2.5 Million Children",
	publisher: "The Pediatric Infectious Disease Journal",
	year: 2026,
	url: "https://pubmed.ncbi.nlm.nih.gov/42520244/",
	doi: "10.1097/INF.0000000000005349",
	pmid: "42520244",
	isAnchor: true,
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: "2026-09-12T19:20:26.035Z",
	statusSources: [],
	stance: "supports",
	order: 4,
	note: "Original indexed abstract checked in PubMed and Europe PMC. Full methods and supplements were inaccessible. This US observational study postdates WHO's August 2025 search horizon."
};
const cdc: Source = {
	kind: "context",
	title: "Autism and Vaccines",
	publisher: "US Centers for Disease Control and Prevention",
	year: 2026,
	url: "https://www.cdc.gov/vaccine-safety/about/autism.html",
	isAnchor: false,
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: checkedAt,
	statusSources: [],
	stance: "debate",
	order: 5,
	note: "Page marked July 22, 2026 read in full. Records changed agency framing, including vaccine-specific uncertainty and criticism of observational MMR evidence. Its detailed claims about the Danish corrected supplement were not independently verified here."
};
const aluminiumReview: Source = {
	kind: "systematic_review",
	title: "Aluminium adjuvants in vaccines and potential health effects: systematic review",
	publisher: "The BMJ",
	year: 2026,
	url: "https://www.bmj.com/content/393/bmj-2025-088921",
	doi: "10.1136/bmj-2025-088921",
	pmid: "42091164",
	pmcid: "PMC13147496",
	isAnchor: true,
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: "2026-09-12T19:20:29.152Z",
	statusSources: [],
	stance: "supports",
	order: 4,
	note: "Original full-text methods, selected outcomes, limitations and disclosures inspected through Europe PMC. Search updated November 2025. Supplements and later rapid responses were not assessed; certainty judgments belong to the review authors."
};
const aluminiumCohort: Source = {
	kind: "landmark_study",
	title: "Aluminum-Adsorbed Vaccines and Chronic Diseases in Childhood: A Nationwide Cohort Study",
	publisher: "Annals of Internal Medicine",
	year: 2025,
	url: "https://pubmed.ncbi.nlm.nih.gov/40658954/",
	doi: "10.7326/ANNALS-25-00997",
	pmid: "40658954",
	isAnchor: false,
	appraisal: "not_appraised",
	citationStatus: "corrected",
	citationCheckedAt: "2026-09-12T19:20:31.964Z",
	statusSources: ["https://europepmc.org/article/MED/40674587"],
	stance: "supports",
	order: 5,
	note: "Original indexed abstract and correction identity verified. Correction DOI 10.7326/ANNALS-25-03233 is linked, but its full text and corrected supplement were inaccessible. The correction's scope is unknown here; no detailed subgroup reinterpretation is claimed."
};

const childhood: Partial<CompleteSeedClaim> = {
	bottomLine: "The best available evidence does not support childhood vaccines causing autism. MMR has especially large direct studies; other vaccines and ingredients need their own evidence rather than borrowing MMR's precision. WHO retains its no-causal-link conclusion, while the current CDC page emphasizes uncertainty and disputes broader reassurance.",
	stableCore: [
		"A diagnosis after vaccination does not, by itself, identify the cause. Comparative studies must account for age, healthcare use and differences between vaccinated and unvaccinated children.",
		"The overall evidence is more informative than a count of positive and negative papers. Poorly controlled ecological correlations cannot identify which individual exposure caused which outcome.",
		"MMR, thiomersal and aluminium-adjuvanted vaccines are different exposures. MMR does not contain aluminium; its results should not be presented as direct tests of every infant vaccine."
	],
	openQuestions: [
		"How complete is the evidence for each product, schedule, ingredient and rare subgroup?",
		"Can better linked records and prespecified analyses reduce residual confounding and clarify uncommon outcomes?"
	],
	whatWouldChangeMinds: [
		"Independent, well-controlled individual-level studies that reproduce a clinically meaningful exposure-specific autism signal.",
		"A material correction or new synthesis that changes the interpretation of the strongest comparative evidence."
	],
	misconceptions: [
		"Insufficient evidence for one narrowly defined vaccine question is not affirmative evidence that vaccination causes autism.",
		"A change in an agency webpage is not itself a new clinical result. Current agency wording should be described accurately without treating unanimity as the evidence."
	],
	editorSummary: "This update replaces blanket institutional agreement with exposure-specific evidence and an explicit account of differing agency statements. The broad causal conclusion remains, with narrower claims about what particular studies establish.",
	evidenceCertainty: "moderate",
	uncertaintySummary: "The evidence is strongest for well-studied exposures such as MMR. Observational studies do not eliminate every unmeasured difference or exclude every rare susceptible subgroup. The aluminium cohort has a linked correction whose full scope was unavailable for this check.",
	coiSummary: "The BMJ review reports Public Health Agency of Canada staff/resources and no external funding; declared professional roles were described in the paper. The Danish aluminium abstract reports no primary funding. These disclosures and agency affiliation do not replace assessment of methods; underlying datasets and full individual declarations were not audited.",
	evidenceSummaries: [
		{
			question: "What did WHO actually review?",
			population: "English-language human research published January 2010-August 2025, with earlier evidence represented through syntheses",
			finding: "GACVS retained its no-causal-link conclusion after weighing design and bias. Its vaccine/thiomersal review and its aluminium assessment are separate evidence streams.",
			effectDirection: "supports",
			magnitude: "The first review included 31 primary studies and five meta-analyses. Those counts are not an expert-consensus percentage.",
			certainty: "moderate",
			limitations: ["The first review excludes aluminium-adjuvant studies. Selected sections of the 2025 advance proof were inspected, not every table or the later final version."]
		},
		{
			question: "What does the older pooled evidence show?",
			population: "Taylor 2014: five cohorts with 1,256,407 children and five case-control studies with 9,920 children; search through April 2014",
			finding: "The cohort estimate did not show an association between vaccination and autism.",
			effectDirection: "supports",
			magnitude: "Pooled odds ratio 0.99, 95% confidence interval 0.92-1.06. This is a relative association, not an absolute risk or a trial result.",
			certainty: "moderate",
			limitations: ["Original abstract access only; underlying studies, full methods and disclosures were not independently appraised. This review does not include the newer cohorts."]
		},
		{
			question: "How direct is the aluminium-and-autism evidence?",
			population: "BMJ 2026 review: search through November 2025; autism findings from two ecological studies and one Danish cohort",
			finding: "The review judged the ecological studies critically biased and the cohort at moderate risk of bias. It found no persuasive causal association, while recognizing gaps and outcome-specific uncertainty.",
			effectDirection: "supports",
			magnitude: "The full review has 59 studies across many outcomes. Its 11 randomized trials are not 11 randomized autism trials; the Danish cohort included 1,224,176 children.",
			certainty: "moderate",
			limitations: ["The cited Danish cohort has a linked correction; the notice's full scope and corrected supplement were inaccessible. The review was not a single pooled autism estimate.", "Evidence of uncommon local nodules or granulomas concerns a different outcome and must not be concealed by an autism conclusion."]
		}
	],
	readerAnnouncement: {
		id: "554e0da8-143d-419d-a45f-0cda8a67e275",
		date: checkedAt,
		kind: "evidence_update",
		bottomLineImpact: "changed",
		summary: "Qualified the broad wording to distinguish vaccine-specific evidence and differing current agency statements. Corrected the scope of WHO's review and added aluminium evidence with its linked correction and access limits."
	}
};

const mmr: Partial<CompleteSeedClaim> = {
	bottomLine: "Large comparative studies do not find that MMR vaccination increases autism risk. New US evidence adds to the Danish cohorts and older syntheses. These findings strongly argue against a meaningful population-wide increase; they are not proof of exactly zero effect in every possible subgroup.",
	stableCore: [
		"MMR has been studied directly in large populations, including children with measured autism risk factors.",
		"The newer US study explicitly accounts for age at vaccination and uses a negative-control exposure to probe residual bias; these methods strengthen interpretation without making the study randomized.",
		"The measured endpoint is a recorded autism diagnosis. A relative hazard below one should not be described as evidence that MMR prevents autism."
	],
	openQuestions: [
		"How robust are results to incomplete vaccination records, delayed diagnoses and differences in healthcare use?",
		"How well can future studies assess uncommon susceptible subgroups without relying on unstable post-hoc comparisons?"
	],
	whatWouldChangeMinds: [
		"Replicated, prespecified individual-level analyses showing a consistent MMR-specific increase after accounting for timing and confounding.",
		"A material correction or new evidence that changes the interpretation of the large comparative studies."
	],
	misconceptions: [
		"The fact that autism becomes apparent near vaccination age does not identify vaccination as its cause.",
		"Some higher-risk groups have been examined, but that does not mean every possible rare subgroup has been conclusively excluded."
	],
	editorSummary: "The central conclusion is retained, with a new US cohort, quantitative estimates and clearer limits on subgroup and exact-zero claims. CDC's current page acknowledges prior high-strength MMR no-association assessments while criticizing observational methods; that communication change is presented separately from the study results.",
	evidenceCertainty: "high",
	uncertaintySummary: "Convergent large observational studies constrain a population-wide increase. Their confidence intervals do not capture every possible bias, and selected subgroup analyses cannot establish universal absence of risk. This is an editorial certainty judgment, not a formal site GRADE assessment.",
	coiSummary: "Hviid 2019 reports Novo Nordisk Foundation and Danish Ministry of Health funding. The 2026 US indexed record reports no funding or conflicts. Original abstracts/disclosure records were inspected; full methods, supplements and underlying data were not independently audited.",
	evidenceSummaries: [
		{
			question: "What does the Danish cohort add?",
			population: "657,461 children born in Denmark during 1999-2010; registry follow-up through August 2013",
			finding: "MMR was not associated with an increased autism hazard overall or consistently in the measured higher-risk subgroups.",
			effectDirection: "supports",
			magnitude: "Adjusted hazard ratio 0.93, 95% confidence interval 0.85-1.02; 6,517 autism diagnoses during about five million person-years.",
			certainty: "moderate",
			limitations: ["No individual charts were reviewed. Registry adjustment and measured subgroup analyses cannot rule out every unmeasured difference or rare subgroup."]
		},
		{
			question: "What does the new US study add?",
			population: "2,560,035 US children with linked birth-parent electronic records; first MMR at 11.5-24 months and follow-up through age eight",
			finding: "Prespecified age-based landmark analyses found no increased autism hazard. A pneumococcal-booster negative control also produced an estimate near one.",
			effectDirection: "supports",
			magnitude: "MMR adjusted hazard ratio 0.97, 99% confidence interval 0.91-1.03. Negative control: 1.01, 99% interval 0.99-1.04.",
			certainty: "moderate",
			limitations: ["Original abstract access only; full analytic methods and supplements were inaccessible. The negative control probes bias but does not prove that all confounding is absent."]
		}
	],
	readerAnnouncement: {
		id: "02ed9586-5ec0-494c-b43c-d7b9ec2c1be9",
		date: checkedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary: "Added the 2026 US MMR cohort and quantitative Danish/US estimates, with correct confidence intervals, registry and subgroup limitations, and current agency context. The central no-increased-risk conclusion is retained."
	}
};

function retainedSources(seed: CompleteSeedClaim): Source[] {
	return seed.sources.map((source) => {
		let note = source.note;
		let citationCheckedAt = checkedAt;
		if (source.doi === "10.1016/j.vaccine.2014.04.085") {
			note = "Original indexed abstract inspected. Cohort, case-control, autism and broader ASD estimates are distinct. Full methods, individual studies and disclosures were not appraised.";
			citationCheckedAt = "2026-09-12T19:20:13.239Z";
		}
		else if (source.doi === "10.7326/M18-2101") {
			note = "Original abstract, funding and linked notices inspected. A retracted linked comment is a separate letter, not a retraction of this cohort. Full methods and supplements not independently appraised.";
			citationCheckedAt = "2026-09-12T19:20:22.820Z";
		}
		else if (source.url?.includes("update-vaccines-thimerosal-autism")) {
			note = "Selected methods and synthesis sections of the December 2025 advance proof inspected. This vaccine/thiomersal review excludes aluminium adjuvants; WHO considered that evidence separately. Later final version not assessed.";
		}
		else if (source.publisher === "World Health Organization") {
			note = "Original release and GACVS statement inspected. WHO weighs evidence quality, rather than treating study counts as independent votes. Its assessment predates the July 2026 US MMR report.";
		}
		return { ...source, note, appraisal: "not_appraised", citationCheckedAt };
	});
}

export function refreshVaccineClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "health-and-medicine") return seed;
	const refresh = seed.slug === childhoodSlug ? childhood : seed.slug === mmrSlug ? mmr : undefined;
	if (!refresh) return seed;
	const additions = seed.slug === childhoodSlug
		? [aluminiumReview, aluminiumCohort, { ...us2026, order: 6 }, { ...cdc, order: 7 }]
		: [us2026, cdc];
	return {
		...seed,
		...common,
		...refresh,
		sources: [...retainedSources(seed), ...additions],
		changeLog: [...seed.changeLog, { date: checkedAt, kind: "update", summary: refresh.readerAnnouncement!.summary }]
	};
}
