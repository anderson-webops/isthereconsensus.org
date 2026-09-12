import type { CompleteSeedClaim } from "./claims.js";

// These are changes to existing reviews, not additional catalog entries.
// The dated record describes this scoped source check, not expert approval.
const checkedAt = "2026-09-12T16:16:00.000Z";
type Source = CompleteSeedClaim["sources"][number];
const cholesterolSlug = "are-dietary-cholesterol-and-saturated-fat-the-same-kind-of-risk";
const saturatedFatSlug = "does-saturated-fat-still-raise-ldl-and-heart-risk";

const aha2026: Source = {
	kind: "consensus_statement",
	title: "2026 Dietary Guidance to Improve Cardiovascular Health: A Scientific Statement From the American Heart Association",
	publisher: "Circulation / American Heart Association",
	year: 2026,
	url: "https://professional.heart.org/en/science-news/2026-dietary-guidance-to-improve-cardiovascular-health/top-things-to-know",
	doi: "10.1161/CIR.0000000000001435",
	pmid: "41914202",
	isAnchor: true,
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: "2026-09-12T16:14:41.350Z",
	statusSources: [],
	stance: "supports",
	note: "Official professional summary read. Updates the 2021 statement and prioritizes food patterns and unsaturated-fat replacements. Full statement and supplement were not assessed; no formal guideline appraisal was performed.",
	order: 3
};

const who2023: Source = {
	kind: "guideline",
	title: "Saturated fatty acid and trans-fatty acid intake for adults and children: WHO guideline",
	publisher: "World Health Organization",
	year: 2023,
	url: "https://www.ncbi.nlm.nih.gov/books/NBK594769/",
	isAnchor: true,
	appraisal: "not_appraised",
	citationStatus: "current",
	citationCheckedAt: checkedAt,
	statusSources: [],
	stance: "supports",
	note: "Recommendations and rationale chapter read. Strong recommendations to reduce saturated fat to 10% of energy and replace it with polyunsaturated fat; reducing below 10%, plant monounsaturated replacements and fiber-rich carbohydrate replacements are conditional. This record is a manual chapter check, not DOI-provider coverage.",
	order: 4
};

const shared: Partial<CompleteSeedClaim> = {
	searchCutoffAt: checkedAt,
	lastRetractionCheckAt: checkedAt,
	searchDatabases: [
		"Targeted publisher and institutional searches; not a systematic database search",
		"PubMed records; Consensus used for discovery, original papers used for findings",
		"Crossref and Europe PMC DOI notice metadata, checked separately from scientific content"
	],
	inclusionRules: [
		"Prioritize current institutional guidance, randomized-trial syntheses and directly relevant human trials.",
		"Specify the replacement diet, measured outcome, follow-up period and source-access limits."
	],
	exclusionRules: [
		"Do not turn a change in LDL into an observed reduction in heart attacks in a trial that did not measure them.",
		"Do not count overlapping reviews as independent sets of trials or a nonsignificant result as proof of equivalence."
	],
	appraisalTools: [
		"Narrative design, endpoint, precision, applicability and funding checks; no formal GRADE, RoB or AGREE assessment completed"
	],
	uncertaintyDrivers: [
		{
			type: "indirectness",
			detail: "A lipid endpoint cannot supply an observed clinical-event effect for the same trial."
		},
		{
			type: "generalizability",
			detail: "Dietary replacements and participants' baseline cardiovascular risk affect applicability."
		},
		{
			type: "imprecision",
			detail: "Some individual-event and mortality estimates include both benefit and no effect."
		}
	],
	authorLine: "Source-controlled synthesis prepared with AI assistance.",
	reviewerLine: "Scoped source verification; no independent expert approval recorded.",
	independenceSummary:
		"Guidance and overlapping syntheses are interpreted together, not counted as independent votes. Site agreement labels are editorial assessments, not measured percentages of experts.",
	institutionalAnchors: [
		{ name: "American Heart Association", role: "Current dietary-pattern guidance; official summary access" },
		{
			name: "World Health Organization",
			role: "Replacement-specific recommendations and stated evidence certainty"
		}
	],
	surveillanceSpec: {
		focus: "Dietary fat replacement, LDL and patient-important cardiovascular outcomes",
		cadenceDays: 180,
		watchTerms: [
			"saturated fat replacement randomized cardiovascular outcomes",
			"dietary cholesterol eggs LDL randomized"
		],
		integrityMonitors: ["Crossref and Europe PMC notice metadata", "Publisher corrections and guideline revisions"],
		guidelineMonitors: ["AHA dietary guidance", "WHO dietary fat guidance"],
		triggerRules: [
			"A new outcome trial, materially different synthesis, guideline revision or source notice warrants a human reassessment."
		]
	}
};

const refreshes: Record<string, Partial<CompleteSeedClaim>> = {
	[cholesterolSlug]: {
		bottomLine:
			"No. Cholesterol in food, saturated fat in food and LDL cholesterol measured in blood are different things. Both dietary components can affect LDL, but the size depends on the surrounding diet and the person. Current guidance emphasizes replacing saturated-fat sources with unsaturated-fat sources and considering the whole eating pattern.",
		stableCore: [
			"The AHA cholesterol advisory found that controlled dietary-cholesterol studies often raised LDL. Removing a universal intake target does not mean dietary cholesterol has no effect.",
			"The AHA's 2026 guidance makes dietary cholesterol a lower-priority prevention target for most people while retaining advice to replace saturated-fat food sources with unsaturated-fat sources.",
			"A food's cholesterol content does not, by itself, establish its overall cardiovascular effect. A useful comparison states what food replaces what, and whether the outcome is a lipid measurement or a clinical event."
		],
		openQuestions: [
			"How much does a person's LDL response differ under realistic, sustained dietary substitutions?",
			"Can contemporary trials separate the effects of dietary cholesterol from saturated fat and other simultaneous food changes on clinical outcomes?"
		],
		whatWouldChangeMinds: [
			"Replicated trials holding background diet constant and measuring both lipid responses and longer-term clinical outcomes.",
			"A major guideline revision supported by consistent evidence across designs and relevant patient groups."
		],
		misconceptions: [
			"A study in which an egg-containing diet lowers LDL does not establish that eggs prevent heart attacks or that dietary cholesterol never raises LDL.",
			"Confounding can obscure an observational association; an absent association is not proof that a nutrient has no biological effect."
		],
		editorSummary:
			"The distinction is useful because it prevents two opposite overstatements: treating cholesterol in food as a direct reading of blood cholesterol, or treating revised dietary advice as proof that cholesterol-rich foods have no lipid effects.",
		uncertaintySummary:
			"The broad distinction remains. Individual response and the long-term effects of particular food substitutions are less certain than the ability of diet to change LDL. A small, short trial cannot settle those clinical questions.",
		coiSummary:
			"The 2025 egg trial was funded by the Egg Nutrition Center; authors reported no funder role in design, analysis, interpretation or writing. Funding is relevant context, not proof that its result is wrong. Source appraisals here are narrative, not independent formal reviews.",
		evidenceSummaries: [
			{
				question: "What did the 2025 egg trial actually show?",
				population:
					"Adults with baseline LDL below 135 mg/dL; 61 randomized, 48 completed all three diet phases",
				finding:
					"Carter and colleagues compared three five-week diets. The lower-saturated-fat, two-eggs-daily diet produced lower LDL than the high-saturated-fat control diet.",
				effectDirection: "supports",
				magnitude: "LDL difference: -5.70 mg/dL (P = 0.02), using Table 3 and the published units correction.",
				certainty: "low",
				limitations: [
					"No formal washout; foods, energy and fiber also differed, and no low-cholesterol/low-saturated-fat arm was included.",
					"Measured lipids, not heart attacks or deaths; short follow-up and egg-industry funding limit what this example establishes."
				]
			},
			{
				question: "Does cardiovascular-event evidence justify treating all dietary fat alike?",
				population: "Adults with and without cardiovascular disease in long-term dietary trials",
				finding:
					"The 2020 Cochrane review supports reducing saturated fat for combined cardiovascular events, with little or no mortality effect. It does not test every cholesterol-containing food.",
				effectDirection: "supports",
				magnitude:
					"Clinical events and LDL are distinct endpoints; detailed event estimates are discussed in the saturated-fat review.",
				certainty: "moderate",
				limitations: [
					"Replacement diets differed; a combined event endpoint cannot be read as the same effect on every individual outcome."
				]
			}
		],
		readerAnnouncement: {
			id: "2871c457-acb8-4c49-baea-502b34919d38",
			date: checkedAt,
			kind: "evidence_update",
			bottomLineImpact: "unchanged",
			summary:
				"Expanded the cholesterol-versus-saturated-fat review with 2026 guidance, a qualified egg-trial example and its units correction. The broad distinction remains; LDL results do not establish clinical-event benefits."
		}
	},
	[saturatedFatSlug]: {
		bottomLine:
			"Replacing saturated fat with unsaturated fat lowers LDL on average. Long-term trials support a reduction in combined cardiovascular events, but effects on individual outcomes and mortality are less certain. The replacement food, achieved dietary change and baseline cardiovascular risk matter to the expected benefit.",
		stableCore: [
			"WHO distinguishes high-certainty evidence for LDL lowering from moderate-certainty evidence for cardiovascular events. Certainty about a biomarker and certainty about clinical outcomes are not interchangeable.",
			"Current AHA guidance favors unsaturated-fat sources within a healthy dietary pattern. Simply removing fat without specifying the replacement does not define the intervention.",
			"A relative risk reduction is not a percentage-point reduction. The same relative effect can translate into different absolute benefits at different baseline risks."
		],
		openQuestions: [
			"How large are the benefits of specific food substitutions in contemporary populations receiving current preventive treatment?",
			"Which replacements improve each clinical outcome, and how well can people maintain the intended dietary change?"
		],
		whatWouldChangeMinds: [
			"Well-powered modern trials with measured replacement intake, adequate adherence and prespecified clinical outcomes.",
			"Consistent new evidence that materially changes the balance of events, harms and patient-relevant absolute benefits."
		],
		misconceptions: [
			"An estimate whose confidence interval crosses no effect is not proof of no benefit or proof of benefit.",
			"Small modeled benefits over five years do not establish that lifelong dietary exposure is irrelevant."
		],
		editorSummary:
			"The conclusion needs an outcome and a comparator: LDL lowering is well established, whereas event prevention depends on the intervention and endpoint. Updated synthesis adds uncertainty about the size of clinical benefit rather than demonstrating that all saturated-fat advice is pointless.",
		uncertaintySummary:
			"Older trials varied in food replacements, adherence and background treatment. Composite-event findings are more secure than claims about every individual endpoint. Baseline risk changes absolute benefit; lifetime effects are not resolved by a five-year estimate.",
		coiSummary:
			"The newer Annals review reports no primary funding. Its individual disclosure forms were not assessed, so this is not a claim that all authors have no conflicts. Most underlying trials predate contemporary preventive treatment.",
		evidenceSummaries: [
			{
				question: "How strong is the combined-event result?",
				population: "12 randomized trials, 53,758 adults, dietary interventions lasting at least two years",
				finding: "Cochrane 2020 found fewer combined cardiovascular events when saturated fat was reduced.",
				effectDirection: "supports",
				magnitude:
					"Risk ratio 0.83 (95% CI 0.70 to 0.98): about 17% relative reduction, not 17 percentage points.",
				certainty: "moderate",
				limitations: [
					"Heterogeneity was substantial (I² = 67%). The review found little or no mortality effect; its search ended in October 2019."
				]
			},
			{
				question: "What does the newer risk-stratified synthesis add?",
				population:
					"Steen and colleagues: 17 trials, 66,337 adults; search through July 30, 2025; online December 2025, print 2026",
				finding:
					"The review separates individual outcomes and models five-year absolute benefits using external baseline risks. Its low-risk interpretation depends on chosen importance thresholds, not a demonstrated absence of biological effect.",
				effectDirection: "mixed",
				magnitude:
					"Overall nonfatal heart-attack RR 0.86 (95% CI 0.70 to 1.06); with polyunsaturated-fat replacement, RR 0.75 (0.58 to 0.99), subgroup interaction P = 0.05.",
				certainty: "low",
				limitations: [
					"Overlaps the older trial base; not 17 new independent trials. Most trials had high risk of bias.",
					"Absolute risks were modeled from statin-trial control groups. Mortality intervals crossed no effect; the analysis does not establish a survival benefit or lifetime safety."
				]
			}
		],
		readerAnnouncement: {
			id: "9b2bc125-f489-4300-b7a9-a86a9464dca6",
			date: checkedAt,
			kind: "evidence_update",
			bottomLineImpact: "changed",
			summary:
				"Qualified the saturated-fat conclusion by endpoint and baseline risk; added the newer Annals synthesis and current guidance. LDL lowering is clearer than the size of each clinical benefit."
		}
	}
};

export function refreshLivingEvidenceClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	const refresh = seed.topicSlug === "nutrition-and-diet" ? refreshes[seed.slug] : undefined;
	if (!refresh) return seed;
	const sources: Source[] = seed.sources.map(source => ({
		...source,
		appraisal: "not_appraised" as const,
		statusSources: [] as string[]
	}));
	if (seed.slug === cholesterolSlug) {
		sources[0] = {
			...sources[0]!,
			url: "https://pubmed.ncbi.nlm.nih.gov/31838890/",
			citationCheckedAt: "2026-09-12T16:14:35.149Z",
			note: "AHA advisory abstract and indexed primary-paper methods excerpt checked: cholesterol interventions can raise LDL, while observational cardiovascular results are inconsistent. Detailed pooled figures are not used here; full formal appraisal not completed."
		};
		sources[1] = {
			...sources[1]!,
			citationCheckedAt: "2026-09-12T16:14:38.202Z",
			note: "Official full abstract and public summary read. Long-term randomized evidence for combined cardiovascular events, with replacement and mortality qualifications; the complete review supplement was not assessed."
		};
		sources.push(
			aha2026,
			who2023,
			{
				kind: "landmark_study",
				title: "Impact of dietary cholesterol from eggs and saturated fat on LDL cholesterol levels: a randomized cross-over study",
				publisher: "The American Journal of Clinical Nutrition",
				year: 2025,
				url: "https://doi.org/10.1016/j.ajcnut.2025.05.001",
				doi: "10.1016/j.ajcnut.2025.05.001",
				pmid: "40339906",
				appraisal: "not_appraised",
				citationStatus: "corrected",
				citationCheckedAt: "2026-09-12T16:14:44.392Z",
				statusSources: [
					"https://doi.org/10.1016/j.ajcnut.2025.10.009",
					"https://europepmc.org/article/MED/41138747"
				],
				stance: "supports",
				note: "Full journal PDF and Table 3 inspected. The published correction changes abstract LDL units to mg/dL; older copies can retain erroneous units. This short lipid trial is an example, not evidence of clinical-event benefit.",
				order: 5
			},
			{
				kind: "context",
				title: "Corrigendum to Impact of dietary cholesterol from eggs and saturated fat on LDL cholesterol levels: a randomized cross-over study",
				publisher: "The American Journal of Clinical Nutrition",
				year: 2025,
				url: "https://doi.org/10.1016/j.ajcnut.2025.10.009",
				doi: "10.1016/j.ajcnut.2025.10.009",
				pmid: "41138747",
				appraisal: "not_appraised",
				citationStatus: "current",
				citationCheckedAt: "2026-09-12T16:14:48.156Z",
				statusSources: [],
				stance: "context",
				note: "Indexed publisher notice read. A units correction to the original paper, not a separate efficacy study or a retraction.",
				order: 6
			}
		);
	}
	else {
		sources[0] = {
			...sources[0]!,
			stance: "context",
			isAnchor: false,
			citationCheckedAt: "2026-09-12T16:14:54.024Z",
			note: "Historical 2021 guidance, retained for provenance; superseded as the current guidance anchor by the 2026 statement below."
		};
		sources[1] = {
			...sources[1]!,
			citationCheckedAt: "2026-09-12T16:14:38.202Z",
			note: "Official full abstract read. Combined-event result and mortality uncertainty are distinguished; detailed full-review supplement not assessed."
		};
		sources[2] = {
			...sources[2]!,
			isAnchor: false,
			citationStatus: "corrected",
			citationCheckedAt: "2026-09-12T16:14:57.578Z",
			statusSources: [
				"https://doi.org/10.1161/cir.0000000000000529",
				"https://europepmc.org/article/MED/28874427"
			],
			note: "Historical advisory retained as context. Both metadata providers link a 2017 correction; its detailed scope was not assessed here. Current recommendations in this refresh come from the 2026 AHA summary and WHO guideline chapter."
		};
		sources.push(
			{ ...aha2026, order: 4 },
			{ ...who2023, order: 5 },
			{
				kind: "systematic_review",
				title: "Effect of Interventions Aimed at Reducing or Modifying Saturated Fat Intake on Cholesterol, Mortality, and Major Cardiovascular Events: A Risk Stratified Systematic Review of Randomized Trials",
				publisher: "Annals of Internal Medicine",
				year: 2026,
				url: "https://pubmed.ncbi.nlm.nih.gov/41397264/",
				doi: "10.7326/ANNALS-25-02229",
				pmid: "41397264",
				appraisal: "not_appraised",
				citationStatus: "current",
				citationCheckedAt: "2026-09-12T16:14:50.773Z",
				statusSources: [],
				stance: "debate",
				note: "Full paper, methods and risk table inspected; supplemental analyses and individual disclosures not assessed. Separates endpoints and models absolute effects; low-to-moderate certainty is the authors' assessment, not an independent site GRADE rating.",
				order: 6
			}
		);
	}
	return {
		...seed,
		...shared,
		...refresh,
		sources,
		changeLog: [
			...seed.changeLog,
			{
				date: checkedAt,
				kind: "update",
				summary: refresh.readerAnnouncement!.summary
			}
		]
	};
}
