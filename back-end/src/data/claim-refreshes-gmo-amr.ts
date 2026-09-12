import type { CompleteSeedClaim } from "./claims.js";

// Scoped narrative updates to recorded baseline reviews, not new expert approvals.
const checkedAt = "2026-09-12T18:12:25.762Z";
type Source = CompleteSeedClaim["sources"][number];
const gmoSlug = "are-commercial-gmo-foods-unsafe-to-eat";
const amrSlug = "does-antibiotic-overuse-drive-antibiotic-resistance";

const common: Partial<CompleteSeedClaim> = {
	searchCutoffAt: checkedAt,
	lastRetractionCheckAt: checkedAt,
	searchDatabases: [
		"Targeted institutional and publisher searches; not a systematic literature search",
		"Consensus candidate discovery followed by original publication checks",
		"Crossref and Europe PMC notice metadata; provider coverage recorded separately"
	],
	inclusionRules: [
		"Use primary institutional assessments and original research reports; state the population, exposure, comparator and measured outcome.",
		"Consider conflicting results and explain design limits rather than counting papers as votes."
	],
	exclusionRules: [
		"Do not generalize an animal result, model prediction or surveillance association into a demonstrated clinical effect.",
		"Do not present source access dates, missing notices or narrative checks as completed expert review."
	],
	appraisalTools: ["Narrative design, applicability, uncertainty and disclosure checks; no independent formal risk-of-bias or GRADE assessment"],
	authorLine: "Source-controlled synthesis prepared with AI assistance.",
	reviewerLine: "Scoped source verification; no independent expert approval recorded.",
	independenceSummary: "Agreement labels are editorial assessments, not measured percentages of scientists. Institutional assessments and overlapping studies are not independent votes."
};

const gmo: Partial<CompleteSeedClaim> = {
	bottomLine: "The evidence does not support treating assessed commercial GM foods as inherently more hazardous to eat than comparable conventional foods. Safety depends on the particular product, trait and intended use. This is neither a guarantee of zero risk nor a blanket judgment about every future modification, pesticide exposure or farming practice.",
	stableCore: [
		"WHO's food-safety explanation addresses assessed products and case-by-case testing. Its page is dated 2014; it is not a new 2026 systematic review.",
		"The National Academies' 2016 assessment found no persuasive evidence of adverse health effects attributable to consuming the GE foods it examined, while acknowledging weak direct long-term human exposure data.",
		"EFSA's current overview describes assessment of molecular changes, composition, toxicity, allergenicity and environmental effects. A favorable food/feed assessment does not itself grant every possible authorization."
	],
	openQuestions: [
		"How can surveillance better measure long-term exposure to particular products and detect rare harms?",
		"Which testing methods best assess new proteins or substantial changes in a food's composition?"
	],
	whatWouldChangeMinds: [
		"Reproducible, product-specific evidence of clinically relevant harm under realistic exposure, with a suitable comparator.",
		"A regulatory reassessment or well-conducted synthesis that materially changes a product's benefit-risk judgment."
	],
	misconceptions: [
		"A change in composition is a reason to investigate its relevance, not automatic proof of either danger or benefit.",
		"A disagreement about a particular study does not settle every question about biotechnology or agricultural policy."
	],
	editorSummary: "Ask which product, which exposure and which outcome. Broad reassurance is useful only when its scope and the evidence behind it remain visible.",
	uncertaintySummary: "Rare or delayed effects are harder to exclude than obvious short-term toxicity. Evidence about one crop and trait does not eliminate the need to assess another.",
	evidenceCertainty: "moderate",
	coiSummary: "The DP202216 assessment evaluates an applicant dossier from Pioneer Overseas Corporation, including applicant-supplied studies. Shen and colleagues declared no commercial or financial conflicts. Individual EFSA declarations and the underlying sponsor data were not independently audited here.",
	institutionalAnchors: [
		{ name: "World Health Organization", role: "Dated food-safety explanation" },
		{ name: "National Academies", role: "Broad assessment and explicit long-term evidence limits" },
		{ name: "European Food Safety Authority", role: "Product-specific scientific assessments, distinct from authorization decisions" }
	],
	uncertaintyDrivers: [
		{ type: "indirectness", detail: "Animal feeding studies do not directly estimate lifetime human disease risk." },
		{ type: "generalizability", detail: "Products, traits and intended uses require their own assessment." },
		{ type: "bias", detail: "Reported adverse findings require appraisal of controls, statistical analysis and reporting." }
	],
	evidenceSummaries: [
		{
			question: "What does a concrete safety assessment establish?",
			population: "EFSA's 2024 assessment of maize DP202216 for import, processing and food/feed use; cultivation excluded",
			finding: "The panel found it as safe as its comparator for the assessed uses. Its evidence included an applicant-supplied 90-day rat feeding study.",
			effectDirection: "supports",
			magnitude: "Six groups, 16 rats of each sex per group; diets included 33% or 50% GM maize. No treatment-related adverse effects were identified by the panel.",
			certainty: "moderate",
			limitations: ["Bounded animal evidence, not a lifetime human trial or an independent replication of the applicant's experiment."]
		},
		{
			question: "What about reviews reporting potential harms?",
			population: "Shen and colleagues, 2022: 203 animal studies and one acute human crossover trial; search through July 2020",
			finding: "This review reported possible serious harms and called for further human research. It rated the included animal studies at unclear or high risk of bias and did not pool adverse-event effects because studies differed substantially.",
			effectDirection: "mixed",
			magnitude: "The human experiment involved 36 people and two single meals, not long-term disease follow-up.",
			certainty: "low",
			limitations: [
				"A tally of reported events does not establish that GM food caused them or estimate population risk.",
				"One included study was the Séralini experiment. EFSA found its design, analysis and reporting inadequate for conclusions about tumor incidence; the National Academies documented that the 2014 republication reused the data."
			]
		}
	],
	surveillanceSpec: {
		focus: "Product-specific food safety and the limits of generalizing across GM traits",
		cadenceDays: 180,
		watchTerms: ["genetically modified food long-term health systematic review", "EFSA GMO food safety assessment"],
		integrityMonitors: ["Crossref and Europe PMC notices", "Publisher notices and agency reassessments"],
		guidelineMonitors: ["EFSA GMO assessments", "WHO food-safety guidance"],
		triggerRules: ["Reassess a new safety signal or changed assessment for the relevant product and exposure."]
	},
	readerAnnouncement: {
		id: "2a958fea-ebdf-4338-b77d-876d1176a174",
		date: checkedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary: "Added a product-specific GMO safety assessment, direct-human-evidence limits and an explanation of conflicting animal-study findings. The broad conclusion remains, with explicit boundaries for products and uses."
	}
};

const amr: Partial<CompleteSeedClaim> = {
	bottomLine: "Yes. Antibiotic exposure selects for resistant bacteria, and unnecessary or inappropriate use adds avoidable pressure. The aim is effective treatment with appropriate drugs and duration, together with infection prevention. Reducing prescribing is well supported; the size and timing of the resulting reduction in resistant infections depend on the setting.",
	stableCore: [
		"Resistance occurs in microbes, not because a person's body gets used to an antibiotic. Resistant organisms and resistance genes can spread to people who did not take the drug.",
		"WHO identifies misuse and overuse as major accelerators, alongside poor sanitation, infection prevention, diagnostics and access to appropriate medicines. Stewardship must preserve timely treatment when antibiotics are needed.",
		"A prescribing outcome, carriage of resistant bacteria and an illness caused by resistant bacteria are different outcomes. Evidence for one must not be silently substituted for another."
	],
	openQuestions: [
		"Which combinations of prescribing support, rapid diagnosis and infection prevention best reduce resistant infections in different health systems?",
		"How quickly does resistance decline after less antibiotic exposure, and which organisms or transmission settings respond least?"
	],
	whatWouldChangeMinds: [
		"Replicated studies that revise the role of selection and transmission for a defined organism and drug.",
		"Trials measuring clinical recovery and resistant infections, not only prescription counts, that change which stewardship strategy is preferred."
	],
	misconceptions: [
		"Stewardship does not mean withholding antibiotics from someone who needs them.",
		"Do not choose a shorter course from a general population finding; treatment duration should follow the clinical assessment and current guidance for that infection."
	],
	editorSummary: "The mechanism is well established. The practical question is how to reduce avoidable exposure while treating infections effectively and limiting transmission.",
	uncertaintySummary: "Local pathogen prevalence, drug choice, access to care and infection-control practices affect the outcome. Surveillance trends alone cannot attribute resistance to an individual prescription or quantify the share caused by overuse.",
	coiSummary: "Mo and colleagues report public and charitable funding, no competing interests and no funder role. Disclosure forms for the older syntheses were not assessed; their results are not described as conflict-free or independently reanalysed here.",
	institutionalAnchors: [
		{ name: "Centers for Disease Control and Prevention", role: "Selection, transmission and clinical stewardship framing" },
		{ name: "World Health Organization", role: "Global surveillance and access-sensitive policy" },
		{ name: "Cochrane", role: "Prescribing intervention outcomes and certainty distinctions" }
	],
	uncertaintyDrivers: [
		{ type: "bias", detail: "Patients prescribed antibiotics can differ from unexposed patients in infection risk and care history." },
		{ type: "indirectness", detail: "Reduced prescribing and asymptomatic carriage are not themselves counts of resistant infections." },
		{ type: "generalizability", detail: "Transmission and surveillance differ across settings." }
	],
	evidenceSummaries: [
		{
			question: "Is the association visible in individual patients?",
			population: "Costelloe and colleagues, 2010: 24 studies, 19 observational and five randomized",
			finding: "Previous prescribing was associated with subsequent resistance in bacteria isolated from patients. This connects exposure with resistance beyond country-level consumption comparisons.",
			effectDirection: "supports",
			magnitude: "Five urinary-bacteria studies, 14,348 participants: odds ratio 2.5 (95% CI 2.1 to 2.9) within two months; 1.33 (1.2 to 1.5) within twelve months.",
			certainty: "moderate",
			limitations: ["Mostly observational evidence. These are odds ratios, not absolute risks, a fixed biological expiry date or an individual prognosis."]
		},
		{
			question: "What do hospital stewardship trials show?",
			population: "Cochrane 2017 review; search through January 2015; clinical and microbial outcomes assessed separately",
			finding: "Prescribing interventions reduced treatment duration without evidence of increased mortality on average. Microbial-outcome evidence was much less certain.",
			effectDirection: "supports",
			magnitude: "Duration: 1.95 days shorter (95% CI 1.67 to 2.22; 14 trials, 3,318 participants). Mortality: risk difference 0 percentage points (95% CI -1 to 0; 28 trials, 15,827 participants).",
			certainty: "moderate",
			limitations: ["The review rated resistance outcomes very low certainty. Restrictive policies can cause treatment delays; these averages do not justify denying needed care."]
		},
		{
			question: "Does every shorter course produce the same resistance benefit?",
			population: "Mo and colleagues, 2023: hospital-transmission models and a synthesis of duration trials",
			finding: "The analysis supports possible reductions in carriage, but effects depend on transmission and which organisms the drug suppresses. A model can also predict increased carriage of a particular resistance phenotype under some conditions.",
			effectDirection: "mixed",
			magnitude: "Only five of 206 duration trials contributed to the resistant gram-negative carriage meta-analysis.",
			certainty: "low",
			limitations: ["Sparse carriage data and model assumptions cannot establish one universal treatment duration or a population reduction in resistant infections."]
		},
		{
			question: "What does newer global surveillance add?",
			population: "WHO's 2025 GLASS report: data from 104 countries in 2023, covering selected laboratory-confirmed bacterial infections",
			finding: "The report updates the scale and geographic coverage of resistance surveillance. It is a monitoring report, not a trial of stewardship.",
			effectDirection: "mixed",
			magnitude: "More than 23 million confirmed cases across the report's dataset; adjusted 2023 estimates for 93 infection-type, pathogen and antibiotic combinations.",
			certainty: "moderate",
			limitations: ["The official overview was read, not the complete statistical report. These records are not a random sample of all infections or an estimate of the proportion caused by overuse."]
		}
	],
	surveillanceSpec: {
		focus: "Stewardship benefits, patient safety and measured resistance outcomes",
		cadenceDays: 120,
		watchTerms: ["antibiotic stewardship resistant infections randomized trial", "antibiotic duration resistance carriage"],
		integrityMonitors: ["Crossref and Europe PMC notices", "Publisher corrections"],
		guidelineMonitors: ["WHO GLASS reports", "CDC antibiotic stewardship", "Cochrane prescribing reviews"],
		triggerRules: ["Reassess new intervention evidence or guidance that changes patient safety, resistance outcomes or applicability."]
	},
	readerAnnouncement: {
		id: "ffcd5178-7fce-4459-8b1a-79e80b6c628b",
		date: checkedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary: "Added patient resistance estimates, stewardship outcomes, duration uncertainty and 2025 surveillance context. The role of overuse remains clear; prescribing, carriage and infection outcomes are now distinguished."
	}
};

function gmoSources(seed: CompleteSeedClaim): Source[] {
	return [
		{ ...seed.sources[0]!, year: 2014, appraisal: "not_appraised", citationCheckedAt: checkedAt, statusSources: [], note: "Dated WHO page inspected for its assessed-product scope; manual institutional check, no DOI-provider coverage." },
		{ ...seed.sources[1]!, appraisal: "not_appraised", citationCheckedAt: "2026-09-12T18:01:36.175Z", statusSources: [], note: "Health-chapter conclusions and Box 5-5 read through NCBI Bookshelf. Full report not assessed. Crossref checked; Europe PMC did not index this DOI." },
		{
			kind: "guideline",
			title: "Assessment of genetically modified maize DP202216 for food and feed uses, under Regulation (EC) No 1829/2003 (application EFSA-GMO-NL-2019-159)",
			publisher: "EFSA Journal",
			year: 2024,
			url: "https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2024.8655",
			doi: "10.2903/j.efsa.2024.8655",
			isAnchor: true,
			appraisal: "not_appraised",
			citationStatus: "current",
			citationCheckedAt: "2026-09-12T18:01:40.884Z",
			statusSources: [],
			stance: "supports",
			order: 3,
			note: "Scope, protein-safety, feeding-study and Appendix C sections inspected. Applicant data and individual disclosures not independently audited; this is a scientific assessment, not an authorization record."
		},
		{
			kind: "systematic_review",
			title: "Evaluation of adverse effects/events of genetically modified food consumption: a systematic review of animal and human studies",
			publisher: "Environmental Sciences Europe",
			year: 2022,
			url: "https://link.springer.com/article/10.1186/s12302-021-00578-9",
			doi: "10.1186/s12302-021-00578-9",
			isAnchor: false,
			appraisal: "not_appraised",
			citationStatus: "current",
			citationCheckedAt: "2026-09-12T18:01:43.071Z",
			statusSources: [],
			stance: "debate",
			order: 4,
			note: "Methods, main results, limitations and conflict declaration inspected; supplements and underlying datasets not audited. Crossref checked; Europe PMC did not index this DOI."
		},
		{
			kind: "context",
			title: "Final review of the Séralini et al. (2012a) publication on a 2-year rodent feeding study with glyphosate formulations and GM maize NK603",
			publisher: "EFSA Journal",
			year: 2012,
			url: "https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2012.2986",
			doi: "10.2903/j.efsa.2012.2986",
			isAnchor: false,
			appraisal: "not_appraised",
			citationStatus: "current",
			citationCheckedAt: "2026-09-12T18:01:45.955Z",
			statusSources: [],
			stance: "context",
			order: 5,
			note: "Official abstract assessed for the methodological critique. This agency statement is not the criticized experiment or a retraction notice. Europe PMC did not index it."
		},
		{
			kind: "context",
			title: "Genetically modified organisms",
			publisher: "European Food Safety Authority",
			year: 2026,
			url: "https://www.efsa.europa.eu/en/topics/genetically-modified-organisms",
			isAnchor: true,
			appraisal: "not_appraised",
			citationStatus: "current",
			citationCheckedAt: checkedAt,
			statusSources: [],
			stance: "context",
			order: 6,
			note: "Current agency overview read, including scientific assessment versus authorization roles; manual page check, not DOI notice coverage."
		}
	];
}

function amrSources(seed: CompleteSeedClaim): Source[] {
	return [
		{ ...seed.sources[0]!, appraisal: "not_appraised", citationCheckedAt: checkedAt, statusSources: [], note: "CDC overview and selection/transmission sections read. Dated January 2025; manual page check, not DOI-provider coverage." },
		{ ...seed.sources[1]!, appraisal: "not_appraised", citationCheckedAt: checkedAt, statusSources: [], note: "WHO overview and drivers sections checked for overuse, access and prevention context; manual institutional check." },
		{ ...seed.sources[2]!, appraisal: "not_appraised", citationCheckedAt: "2026-09-12T18:01:50.359Z", statusSources: [], note: "Complete official summary and abstract read; full review supplement not assessed. Provider checks used DOI 10.1002/14651858.CD003543.pub4; the existing citation URL identity is retained." },
		{
			kind: "systematic_review",
			title: "Effect of antibiotic prescribing in primary care on antimicrobial resistance in individual patients: systematic review and meta-analysis",
			publisher: "BMJ",
			year: 2010,
			url: "https://pubmed.ncbi.nlm.nih.gov/20483949/",
			doi: "10.1136/bmj.c2096",
			pmid: "20483949",
			isAnchor: false,
			appraisal: "not_appraised",
			citationStatus: "current",
			citationCheckedAt: "2026-09-12T18:01:53.307Z",
			statusSources: [],
			stance: "supports",
			order: 4,
			note: "Original abstract verified in PubMed. Publisher full text was inaccessible; pooled estimates and design counts are limited to that abstract."
		},
		{
			kind: "meta_analysis",
			title: "Implications of reducing antibiotic treatment duration for antimicrobial resistance in hospital settings: A modelling study and meta-analysis",
			publisher: "PLOS Medicine",
			year: 2023,
			url: "https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.1004013",
			doi: "10.1371/journal.pmed.1004013",
			isAnchor: false,
			appraisal: "not_appraised",
			citationStatus: "current",
			citationCheckedAt: "2026-09-12T18:01:55.801Z",
			statusSources: [],
			stance: "context",
			order: 5,
			note: "Original methods, main results and declarations inspected. Models were not independently reproduced; supplements and individual trial data were not reanalysed."
		},
		{
			kind: "context",
			title: "Global antibiotic resistance surveillance report 2025",
			publisher: "World Health Organization",
			year: 2025,
			url: "https://www.who.int/publications/i/item/9789240116337",
			isAnchor: false,
			appraisal: "not_appraised",
			citationStatus: "current",
			citationCheckedAt: checkedAt,
			statusSources: [],
			stance: "context",
			order: 6,
			note: "Official report overview inspected; complete report and statistical adjustments not assessed. Report year and surveillance year differ."
		}
	];
}

export function refreshGmoAndAmrClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	const refresh = seed.topicSlug === "genetics-and-biotechnology" && seed.slug === gmoSlug
		? gmo
		: seed.topicSlug === "health-and-medicine" && seed.slug === amrSlug ? amr : undefined;
	if (!refresh) return seed;
	return {
		...seed,
		...common,
		...refresh,
		sources: seed.slug === gmoSlug ? gmoSources(seed) : amrSources(seed),
		changeLog: [...seed.changeLog, { date: checkedAt, kind: "update", summary: refresh.readerAnnouncement!.summary }]
	};
}
