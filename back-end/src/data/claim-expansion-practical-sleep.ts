import type { SeedClaim } from "./claims.js";

const checkedAt = "2026-09-11T22:13:18.000Z";
const generalSlug = "is-cognitive-behavioral-therapy-for-insomnia-a-first-line-treatment-for-chronic-insomnia";
const hygieneSlug = "is-sleep-hygiene-alone-an-effective-treatment-for-chronic-insomnia";
const briefSlug = "can-brief-behavioral-treatment-improve-chronic-insomnia";
const stimulusSlug = "can-stimulus-control-alone-help-chronic-insomnia";
const relaxationSlug = "is-relaxation-an-essential-part-of-effective-insomnia-treatment";
const digitalSlug = "does-fully-automated-digital-cbt-i-match-face-to-face-therapy";
const safetySlug = "can-sleep-restriction-therapy-temporarily-increase-daytime-sleepiness";

export const sleepPracticalGaps = [
	{
		slug: briefSlug,
		gap: "Examines a structured shorter treatment, its actual comparator and follow-up, rather than repeating the general first-line CBT-I recommendation.",
		relatedExistingSlugs: [generalSlug, hygieneSlug]
	},
	{
		slug: stimulusSlug,
		gap: "Separates evidence for stimulus control on its own from an association with benefit when included in a multicomponent package.",
		relatedExistingSlugs: [generalSlug, hygieneSlug]
	},
	{
		slug: relaxationSlug,
		gap: "Reconciles a conditional standalone recommendation with uncertain incremental benefit inside a package; not a general sleep-hygiene question.",
		relatedExistingSlugs: [generalSlug, hygieneSlug]
	},
	{
		slug: digitalSlug,
		gap: "Tests whether one delivery format matches another, rather than treating efficacy against a waiting list as proof of equal clinical care.",
		relatedExistingSlugs: [generalSlug]
	},
	{
		slug: safetySlug,
		gap: "Addresses early effects of supervised therapeutic time-in-bed restriction, not adaptation to habitual insufficient sleep or its general harms.",
		relatedExistingSlugs: [
			generalSlug,
			"do-people-fully-adapt-to-chronic-sleep-restriction-without-performance-loss"
		]
	}
];

const reviewContext = {
	topicSlug: "sleep-and-circadian-health",
	status: "published",
	reviewMode: "standard",
	searchDatabases: [
		"Consensus.app (digital-delivery discovery)",
		"PubMed records through Europe PMC",
		"Selected PMC and publisher articles",
		"American Academy of Sleep Medicine"
	],
	searchCutoffAt: checkedAt,
	inclusionRules: [
		"Adult chronic-insomnia research with a defined intervention, comparator and outcome.",
		"Distinguish direct trials, guideline recommendations and modeled component effects."
	],
	exclusionRules: [
		"Do not count a trial protocol as completed results or a sleep app as validated CBT-I by default.",
		"Do not extrapolate insomnia treatment to people who simply lack enough opportunity to sleep."
	],
	appraisalTools: [
		"Targeted design, outcome and source-notice check; no formal GRADE or risk-of-bias instrument completed"
	],
	institutionalAnchors: [
		{
			name: "American Academy of Sleep Medicine",
			role: "2021 recommendations on adult behavioral insomnia treatments, not an endorsement of a particular app"
		}
	],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
	independenceSummary:
		"Source access and disclosures are stated individually. A recommendation, commercial program, or single experiment is not an independent replication of the other evidence.",
	lastRetractionCheckAt: checkedAt
} satisfies Partial<SeedClaim>;

function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return {
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: checkedAt,
		statusSources: [entry.url!],
		...entry
	};
}

export const insomniaSources = {
	guideline: source({
		kind: "guideline",
		title: "Behavioral and psychological treatments for chronic insomnia disorder in adults: an American Academy of Sleep Medicine clinical practice guideline",
		publisher: "Journal of Clinical Sleep Medicine",
		year: 2021,
		doi: "10.5664/jcsm.8986",
		pmid: "33164742",
		url: "https://pubmed.ncbi.nlm.nih.gov/33164742/",
		stance: "supports",
		note: "Final recommendation abstract checked through Europe PMC, with AASM's public explanation. Strong recommendation for multicomponent CBT-I; conditional recommendations for brief therapies, stimulus control, sleep restriction and relaxation, and against sleep hygiene alone. Full guideline methods were not independently appraised. Status check limited to the linked record.",
		order: 1
	}),
	components: source({
		kind: "meta_analysis",
		title: "Components and Delivery Formats of Cognitive Behavioral Therapy for Chronic Insomnia in Adults: A Systematic Review and Component Network Meta-Analysis",
		publisher: "JAMA Psychiatry",
		year: 2024,
		doi: "10.1001/jamapsychiatry.2023.5060",
		pmid: "38231522",
		pmcid: "PMC10794978",
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10794978/",
		stance: "context",
		note: "Relevant full-text methods, results, limitations and disclosures checked through Europe PMC. Additive model assumes no component interactions; the authors describe conclusions as hypothesis-generating. Public grants supported the review; authors disclose pharmaceutical, technology, intellectual-property and CBT-I teaching/business interests. Source-record check, not an exhaustive integrity audit.",
		order: 2
	}),
	brief: source({
		kind: "landmark_study",
		title: "Efficacy of brief behavioral treatment for chronic insomnia in older adults",
		publisher: "Archives of Internal Medicine",
		year: 2011,
		doi: "10.1001/archinternmed.2010.535",
		pmid: "21263078",
		pmcid: "PMC3101289",
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3101289/",
		stance: "supports",
		citationStatus: "corrected",
		statusSources: [
			"https://pubmed.ncbi.nlm.nih.gov/21263078/",
			"https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2735979"
		],
		note: "Abstract and indexed outcome/follow-up passages checked, not a full trial reappraisal. The 2019 correction changes Tables 2–5 headings from SD to SE; do not interpret those values as participant standard deviations. Categorical four-week results are reported separately. Longer follow-up was restricted to favorable BBTI responders, not a continued randomized comparison. NIH grants appear in the record; complete original financial disclosures were not verified.",
		order: 2
	}),
	digital: source({
		kind: "landmark_study",
		title: "Mode of delivery of Cognitive Behavioral Therapy for Insomnia: a randomized controlled non-inferiority trial of digital and face-to-face therapy",
		publisher: "Sleep",
		year: 2021,
		doi: "10.1093/sleep/zsab185",
		pmid: "34291808",
		pmcid: "PMC8664599",
		url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8664599/",
		stance: "supports",
		note: "Consensus record and relevant full-text design, intervention, analysis and limitations checked through Europe PMC. Fully automated SHUTi versus experienced therapists in one Norwegian clinical service, not all digital or video-delivered CBT-I. Prespecified two-point ISI margin at week 33. Hospital and national sleep-service funding reported; authors declared no competing interests. Linked-record status check only.",
		order: 1
	}),
	digitalReview: source({
		kind: "meta_analysis",
		title: "Efficacy of digital cognitive behavioural therapy for insomnia: a meta-analysis of randomised controlled trials",
		publisher: "Sleep Medicine",
		year: 2020,
		doi: "10.1016/j.sleep.2020.08.020",
		pmid: "32950013",
		url: "https://pubmed.ncbi.nlm.nih.gov/32950013/",
		stance: "context",
		note: "Consensus metadata and primary abstract through Europe PMC checked. Digital programs generally outperformed controls, with substantial heterogeneity. Do not turn an average estimate or a different non-inferiority threshold into proof that every program matches individual therapy. Full methods and funding not independently verified; status check limited to the record.",
		order: 2
	}),
	acute: source({
		kind: "landmark_study",
		title: "Sleep restriction therapy for insomnia is associated with reduced objective total sleep time, increased daytime somnolence, and objectively impaired vigilance: implications for the clinical management of insomnia disorder",
		publisher: "Sleep",
		year: 2014,
		doi: "10.5665/sleep.3386",
		pmid: "24497651",
		url: "https://pubmed.ncbi.nlm.nih.gov/24497651/",
		stance: "supports",
		note: "Primary abstract checked through Europe PMC. Sixteen patients in an uncontrolled within-person study, not a randomized risk comparison. Acute laboratory sleep and vigilance measurements cannot supply an incidence of harm or a universal driving-risk estimate. Full methods and disclosures not independently verified; linked-record status check only.",
		order: 1
	}),
	safety: source({
		kind: "landmark_study",
		title: "Risk of excessive sleepiness in sleep restriction therapy and cognitive behavioral therapy for insomnia: a randomized controlled trial",
		publisher: "Journal of Clinical Sleep Medicine",
		year: 2020,
		doi: "10.5664/jcsm.8164",
		pmid: "31992407",
		url: "https://pubmed.ncbi.nlm.nih.gov/31992407/",
		stance: "context",
		note: "Primary abstract and NIH grant metadata checked through Europe PMC. Single-site trial in 150 postmenopausal women, with blinded pretreatment/posttreatment assessments. Wide intervals and assessment timing limit reassurance about the first treatment days. Odds ratios compare transitions in sleepiness, not SRT-versus-CBT-I risk ratios. Full methods/disclosures not independently verified; record-only status check.",
		order: 2
	})
};

function publication(
	id: string,
	summary: string,
	focus: string
): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return {
		changeLog: [{ date: checkedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: checkedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: {
			focus,
			cadenceDays: 180,
			watchTerms: [focus],
			integrityMonitors: ["Corrections or retractions on cited records"],
			guidelineMonitors: ["AASM behavioral insomnia guidance"],
			triggerRules: [
				"Reassess after a relevant direct comparison, updated synthesis, guideline or source correction."
			]
		}
	};
}

export const sleepPracticalClaims: SeedClaim[] = [
	{
		...reviewContext,
		title: "Can brief behavioral treatment improve chronic insomnia?",
		slug: briefSlug,
		consensusBand: "broad",
		agreementLevel: "broad_qualified",
		evidenceCertainty: "moderate",
		// Legacy editorial field, not a measured percentage of expert agreement.
		confidenceScore: 75,
		bottomLine:
			"Yes. Structured brief behavioral treatment can improve insomnia, including in older adults. It is more than an advice leaflet, and evidence against education alone does not establish that a shorter program matches full CBT-I for everyone.",
		stableCore: [
			"AASM conditionally supports multicomponent brief therapies; full multicomponent CBT-I has a strong recommendation.",
			"Buysse et al. randomized 79 older adults to nurse-delivered behavioral care or printed information.",
			"After four weeks, 55% versus 13% no longer met insomnia criteria. These are trial outcomes, not scientific agreement percentages."
		],
		openQuestions: [
			"Which patients benefit sufficiently from brief care and which need a fuller course?",
			"How durable are benefits across routine services with different staffing and follow-up?"
		],
		whatWouldChangeMinds: [
			"Larger direct comparisons of brief and full CBT-I with the same eligibility, outcomes and follow-up.",
			"Replicated evidence of relapse, dropout and adverse effects across ages and comorbidities."
		],
		misconceptions: [
			"Brief does not mean a generic sleep-hygiene checklist.",
			"A treatment response is not necessarily remission or absence of every sleep complaint.",
			"The trial's longer follow-up does not establish six-month superiority in the entire randomized sample."
		],
		misconceptionTags: ["brief behavioral treatment", "BBTI", "insomnia remission"],
		editorSummary:
			"The access question is whether structured care can be delivered in fewer contacts. A successful short program is useful evidence, but it does not erase differences in content, clinician support or the need to adjust treatment.",
		uncertaintySummary:
			"The guideline and trial support benefit, but the example is small and older-adult focused. Selected responder follow-up cannot establish comparative durability. This targeted search is not exhaustive and does not formally grade the whole evidence base.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "The direct trial recruited older adults; its results do not establish the same remission rate in every service."
			},
			{
				type: "bias",
				detail: "Longer follow-up was limited to favorable brief-treatment responders rather than the full randomized comparison."
			}
		],
		evidenceSummaries: [
			{
				question: "Did brief treatment outperform information alone?",
				population: "79 older adults, mean age 71.7, with chronic insomnia and common comorbidities",
				finding:
					"At four weeks, categorical response was 67% versus 25%; absence of an insomnia diagnosis was 55% versus 13%. Treatment included two sessions and two calls.",
				effectDirection: "supports",
				magnitude:
					"Trial-specific proportions with different response and remission definitions; not a head-to-head full-CBT-I comparison.",
				certainty: "moderate",
				limitations: [
					"Small sample and unequal intervention contact",
					"Selected-responder longer follow-up",
					"2019 correction: table headings should say standard error, not standard deviation"
				]
			}
		],
		coiSummary:
			"NIH support is listed for the trial; complete original financial disclosures were not verified. AASM is a professional-society guideline, not an independent replication of this study.",
		...publication(
			"b5a4d5e1-6830-4f52-9228-182f79c1d924",
			"New review: brief behavioral insomnia care can help, but education-controlled trials do not establish equivalence to full CBT-I.",
			"Brief behavioral insomnia therapy versus full CBT-I"
		),
		sources: [{ ...insomniaSources.guideline, isAnchor: true }, insomniaSources.brief]
	},
	{
		...reviewContext,
		title: "Can stimulus control alone help chronic insomnia?",
		slug: stimulusSlug,
		consensusBand: "broad",
		agreementLevel: "broad_qualified",
		evidenceCertainty: "low",
		confidenceScore: 65,
		bottomLine:
			"It can help and has a conditional AASM recommendation as a standalone treatment. That is weaker support than the strong recommendation for multicomponent CBT-I. Evidence that stimulus control contributes to a package is not proof that using only that component gives the same result.",
		stableCore: [
			"Stimulus control targets the learned association between bed and wakefulness; it is not simply bedroom-comfort advice.",
			"The 2024 component analysis linked stimulus control with improved sleep latency and efficiency, but used an additive model rather than testing every combination directly.",
			"Its remission incremental odds ratio was 1.43, with a 95% confidence interval of 1.00 to 2.05; that is not a 43-percentage-point remission increase."
		],
		openQuestions: [
			"Who can obtain durable benefit from stimulus control alone rather than a full package?",
			"How do support, adherence and other treatment components change its contribution?"
		],
		whatWouldChangeMinds: [
			"Larger direct trials isolating stimulus control with matched therapist contact and meaningful follow-up.",
			"Replicated component-interaction studies that test rather than assume how techniques combine."
		],
		misconceptions: [
			"A component's incremental odds ratio is not an individual's chance of remission.",
			"A conditional recommendation does not mean either useless or guaranteed effective.",
			"An online instruction is not a clinical assessment or a complete CBT-I program."
		],
		misconceptionTags: ["stimulus control", "conditioned wakefulness", "CBT-I components"],
		editorSummary:
			"Separate three questions: can this technique help, does it add something to a package, and is it sufficient on its own? Those questions use different comparisons and need not have identical answers.",
		uncertaintySummary:
			"There is qualified support for standalone use, but estimates of component contribution depend on modeling assumptions and heterogeneous programs. The component interval reaches the null boundary; it should not become a precise promise of benefit.",
		uncertaintyDrivers: [
			{
				type: "indirectness",
				detail: "Modeled incremental effects inside combinations are not standalone-treatment effect estimates."
			},
			{ type: "imprecision", detail: "The remission interval reaches an odds ratio of 1.00." }
		],
		evidenceSummaries: [
			{
				question: "Does including stimulus control contribute to improvement?",
				population:
					"The 2024 synthesis included 241 adult insomnia trials overall, not 241 standalone stimulus-control trials",
				finding:
					"The component model suggested better remission and self-reported sleep continuity when stimulus control was included.",
				effectDirection: "supports",
				magnitude: "Remission incremental odds ratio 1.43 (95% CI 1.00 to 2.05), conditional on the model.",
				certainty: "low",
				limitations: [
					"Assumes additive effects without interactions",
					"Program content and trial quality varied",
					"Not a personal treatment effect or proof of equivalence to full CBT-I"
				]
			}
		],
		coiSummary:
			"The component review had public research grants, with disclosed commercial, intellectual-property and CBT-I teaching/business interests among authors. The guideline's full disclosures were not independently checked.",
		...publication(
			"135dc276-2fef-4213-ad2b-ec78cec371ad",
			"New review: distinguish standalone stimulus control from its modeled contribution to a multicomponent insomnia treatment.",
			"Stimulus control standalone insomnia randomized trials"
		),
		sources: [{ ...insomniaSources.guideline, isAnchor: true }, insomniaSources.components]
	},
	{
		...reviewContext,
		title: "Is relaxation an essential part of effective insomnia treatment?",
		slug: relaxationSlug,
		consensusBand: "unclear",
		agreementLevel: "frontier",
		evidenceCertainty: "low",
		confidenceScore: 60,
		bottomLine:
			"It is not established as an essential ingredient. AASM conditionally supports relaxation on its own, but a later component analysis did not show a clear added remission benefit within treatment packages. That does not prove relaxation harms sleep or that a person who finds it helpful should abandon it.",
		stableCore: [
			"Standalone relaxation versus a control and adding relaxation to a package are different treatment questions.",
			"The 2024 component estimate was an incremental odds ratio of 0.81, with a 95% confidence interval of 0.64 to 1.02; the interval includes no difference.",
			"The authors called the component findings hypothesis-generating because undetected interactions could change their interpretation."
		],
		openQuestions: [
			"Which relaxation methods, patients and combinations produce useful sleep benefits?",
			"Can direct trials establish whether relaxation adds to or interferes with particular behavioral components?"
		],
		whatWouldChangeMinds: [
			"Replicated trials comparing the same CBT-I package with and without relaxation, with matched contact.",
			"Evidence of patient-important benefit or harm rather than a mechanistic explanation alone."
		],
		misconceptions: [
			"A confidence interval that includes no difference is not definitive proof of harm.",
			"Comfort or stress relief is not the same outcome as insomnia remission.",
			"A conditional standalone recommendation does not make a component mandatory in every package."
		],
		misconceptionTags: ["relaxation insomnia", "CBT-I components", "incremental benefit"],
		editorSummary:
			"The apparent disagreement partly reflects different comparisons. Basic relaxation may be acceptable and helpful, while evidence that it improves an already structured insomnia treatment remains uncertain. Neither side licenses an all-or-nothing slogan.",
		uncertaintySummary:
			"The component estimate is imprecise and depends on an additive model. Different relaxation methods were grouped together. This targeted review does not establish the best package or the effect on every individual.",
		uncertaintyDrivers: [
			{ type: "imprecision", detail: "The incremental-remission interval includes an odds ratio of 1.00." },
			{
				type: "indirectness",
				detail: "Including a component in a program is not the same as comparing that technique alone with no treatment."
			}
		],
		evidenceSummaries: [
			{
				question: "Does relaxation add remission benefit inside CBT-I packages?",
				population: "Adult chronic-insomnia trials in the 2024 component network meta-analysis",
				finding:
					"The model did not establish added remission benefit. Its estimate leaned toward lower remission, but the interval also permits no difference.",
				effectDirection: "unclear",
				magnitude:
					"Incremental odds ratio 0.81 (95% CI 0.64 to 1.02); not a demonstrated 19% personal harm risk.",
				certainty: "low",
				limitations: [
					"Assumed additivity may fail",
					"Different methods and delivery intensity grouped",
					"Does not overturn a standalone guideline recommendation by itself"
				]
			}
		],
		coiSummary:
			"Public grants supported the component review; some authors disclose technology/pharmaceutical, intellectual-property and CBT-I teaching/business interests. No independent reappraisal of every underlying trial was performed.",
		...publication(
			"30c0e5c8-cf91-4d81-a610-3e6dc02b9939",
			"New review: relaxation is not a proven essential CBT-I ingredient, and uncertain incremental effects are not proof of harm.",
			"Relaxation added to CBT-I component trials"
		),
		sources: [
			{ ...insomniaSources.guideline, stance: "context" },
			{ ...insomniaSources.components, isAnchor: true, stance: "supports" }
		]
	},
	{
		...reviewContext,
		title: "Does fully automated digital CBT-I match face-to-face therapy?",
		slug: digitalSlug,
		consensusBand: "broad",
		agreementLevel: "broad_qualified",
		evidenceCertainty: "moderate",
		confidenceScore: 75,
		bottomLine:
			"Not automatically. Digital CBT-I can improve insomnia compared with control conditions, but that does not establish that a fully automated program matches experienced individual therapy. A direct Norwegian clinical trial found greater symptom improvement with face-to-face care; its longer-term result did not demonstrate digital non-inferiority.",
		stableCore: [
			"The 2021 trial randomized 101 patients to fully automated SHUTi or individual therapist-delivered CBT-I.",
			"At week 33, the estimated face-to-face minus digital ISI difference was −2.8 points (95% CI −4.8 to −0.8), favoring face-to-face care.",
			"The prespecified non-inferiority margin was two ISI points. The interval crossed that margin, so non-inferiority was not established, even though the superiority comparison favored face-to-face care."
		],
		openQuestions: [
			"Which patients do well with automated care, and who benefits from added therapist support?",
			"How do current programs compare when therapeutic content, support and populations are matched?"
		],
		whatWouldChangeMinds: [
			"Replicated direct non-inferiority trials with justified margins, adherence reporting and clinically relevant follow-up.",
			"Evidence distinguishing automated programs, therapist-guided online care and live video sessions."
		],
		misconceptions: [
			"Effective versus a waiting list is not equivalent to expert-delivered care.",
			"Failure to establish non-inferiority is not proof that every digital program is ineffective.",
			"A commercial sleep tracker or relaxation app is not automatically a tested CBT-I intervention."
		],
		misconceptionTags: ["digital CBT-I", "automated therapy", "non-inferiority"],
		editorSummary:
			"Delivery is not just a screen-versus-room distinction. Human support, program content, adherence and clinical complexity can all differ. This evidence informs access decisions without dismissing useful digital care or endorsing every app.",
		uncertaintySummary:
			"The direct result concerns one program and one Norwegian clinical service, not all online treatment. A broader 2020 review found benefit against controls with substantial heterogeneity. The review abstract was checked, not every underlying study.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "A fully automated program in a referred clinical population differs from guided online or live-video care."
			},
			{
				type: "imprecision",
				detail: "The week-33 interval crosses the prespecified two-point non-inferiority margin."
			}
		],
		evidenceSummaries: [
			{
				question: "Did the automated program meet the direct trial's non-inferiority criterion?",
				population: "101 Norwegian sleep-clinic patients: 52 face-to-face and 49 fully automated",
				finding:
					"Both groups improved. Face-to-face care had lower estimated insomnia severity at week 33; the interval did not establish digital non-inferiority.",
				effectDirection: "supports",
				magnitude:
					"Face-to-face minus digital ISI: −2.8 points (95% CI −4.8 to −0.8). Lower is better; prespecified margin −2 points.",
				certainty: "moderate",
				limitations: [
					"One program and service",
					"Cannot infer that all digital delivery is inferior",
					"Not an equivalence trial with identical therapist support"
				]
			}
		],
		coiSummary:
			"The direct trial reports hospital and national sleep-service funding and no competing interests. The 2020 review's full funding and financial disclosures were not verified from its abstract.",
		...publication(
			"c7b9eea2-f81b-4429-9aa8-c6c8c99c45af",
			"New review: digital CBT-I efficacy against controls does not establish equivalence to individual face-to-face care.",
			"Fully automated versus face-to-face CBT-I non-inferiority"
		),
		sources: [
			{ ...insomniaSources.digital, isAnchor: true },
			insomniaSources.digitalReview,
			{ ...insomniaSources.guideline, order: 3, stance: "context" }
		]
	},
	{
		...reviewContext,
		title: "Can sleep restriction therapy temporarily increase daytime sleepiness?",
		slug: safetySlug,
		consensusBand: "broad",
		agreementLevel: "broad_qualified",
		evidenceCertainty: "low",
		confidenceScore: 65,
		bottomLine:
			"Yes, early sleepiness or impaired alertness can occur, even while insomnia improves. This does not mean supervised behavioral treatment is generally unsafe. Studies measured different time points, and reassuring end-of-treatment findings do not settle the first few days. Therapeutic restriction of time in bed is not an invitation to deprive yourself of sleep.",
		stableCore: [
			"An uncontrolled study of 16 patients found acute sleep loss, greater sleepiness and worse vigilance during a four-week protocol.",
			"A later randomized trial in 150 postmenopausal women did not find a clear increase in excessive sleepiness after treatment, but its intervals were wide.",
			"Alertness, symptom severity and total sleep time are distinct outcomes; improvement in one does not certify safety for driving or hazardous work."
		],
		openQuestions: [
			"How often do clinically important problems occur during the first treatment days under different protocols?",
			"Which adaptations and monitoring approaches best preserve alertness in higher-risk patients?"
		],
		whatWouldChangeMinds: [
			"Larger controlled studies measuring vigilance, sleepiness and adverse events from the first treatment days onward.",
			"Replicated comparisons of supported protocols in varied patients, with prespecified safety thresholds."
		],
		misconceptions: [
			"The 16-person study cannot estimate everyone's risk or establish a randomized causal effect.",
			"A nonsignificant posttreatment result is not proof of zero early risk.",
			"Do not drive or do hazardous work while sleepy, or set a severe sleep-restriction schedule from this review."
		],
		misconceptionTags: ["sleep restriction therapy", "daytime sleepiness", "CBT-I safety"],
		editorSummary:
			"Treatment can have a time course: sleep may consolidate while early daytime functioning temporarily worsens. Discuss significant sleepiness and relevant medical conditions with a qualified clinician; this page does not supply a personal sleep window or substitute for assessment.",
		uncertaintySummary:
			"The early signal comes from a small uncontrolled study. The randomized trial assessed before and after treatment in a specific population, not continuous early risk. Neither establishes a precise incidence of harm or complete absence of risk.",
		uncertaintyDrivers: [
			{ type: "bias", detail: "The acute study had no untreated randomized comparison." },
			{
				type: "imprecision",
				detail: "The later trial's sleepiness-transition odds ratios had wide confidence intervals."
			},
			{
				type: "generalizability",
				detail: "Timing, protocols and populations differ, so the studies do not directly contradict each other."
			}
		],
		evidenceSummaries: [
			{
				question: "What was observed during the acute phase?",
				population: "16 patients with psychophysiological insomnia in a within-person, uncontrolled study",
				finding:
					"Laboratory total sleep time fell during treatment, with increased sleepiness in weeks 1–3 and impaired vigilance at several assessments. Measures returned toward baseline by three months.",
				effectDirection: "supports",
				magnitude: "A safety signal, not a population incidence or head-to-head risk estimate.",
				certainty: "low",
				limitations: [
					"No randomized control",
					"Small selected sample",
					"Cannot certify driving safety or attribute every change to treatment"
				]
			},
			{
				question: "What did the later randomized trial establish?",
				population: "150 postmenopausal women allocated to CBT-I, sleep restriction or sleep education",
				finding:
					"Pretreatment/posttreatment objective assessments did not show a clear excess transition to sleepiness. The authors called for measurements immediately after starting restriction.",
				effectDirection: "unclear",
				magnitude:
					"Sleep-restriction transition OR 0.94 (95% CI 0.13 to 6.96), not a between-treatment relative risk.",
				certainty: "low",
				limitations: [
					"Wide interval",
					"Not a measurement of every early treatment day",
					"Abstract-level assessment and one clinical population"
				]
			}
		],
		coiSummary:
			"The 2020 trial lists NIH nursing-research support. Complete financial disclosures for both safety papers were not verified from the inspected abstracts; no independence claim is made beyond the records checked.",
		...publication(
			"6582a3d5-2bc2-4d28-a57a-d1732a5fd3b7",
			"New review: early sleepiness during sleep restriction needs monitoring; later reassuring findings do not prove zero early risk.",
			"Sleep restriction therapy early sleepiness vigilance safety"
		),
		sources: [
			{ ...insomniaSources.acute, isAnchor: true },
			insomniaSources.safety,
			{ ...insomniaSources.guideline, order: 3, stance: "context" }
		]
	}
];
