import type { SeedClaim } from "./claims.js";

const checkedAt = "2026-09-11T20:19:00.000Z";
const loadingSlug = "is-a-loading-phase-necessary-to-raise-muscle-creatine-stores";
const leanMassSlug = "does-extra-lean-mass-after-creatine-mean-extra-muscle-tissue";
const bufferedSlug = "does-buffered-creatine-outperform-creatine-monohydrate";
const generalCreatineSlug = "does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe";

export const strengthPracticalGaps = [
	{
		slug: loadingSlug,
		gap: "Separates speed of muscle-store accumulation from the existing general question about strength benefits and safety.",
		relatedExistingSlugs: [generalCreatineSlug]
	},
	{
		slug: leanMassSlug,
		gap: "Explains what lean-mass measurements can establish about tissue growth, not whether creatine causes dehydration or works at all.",
		relatedExistingSlugs: [generalCreatineSlug, "does-creatine-increase-dehydration-or-muscle-cramp-risk-during-exercise"]
	},
	{
		slug: bufferedSlug,
		gap: "Tests a specific formulation's claimed superiority using a direct comparison, rather than repeating general creatine efficacy.",
		relatedExistingSlugs: [generalCreatineSlug]
	}
];

// These shared fields describe the work actually performed, not a registered
// systematic review, formal risk-of-bias appraisal, or completed expert review.
const reviewContext = {
	topicSlug: "sports-nutrition-and-supplements",
	status: "published",
	reviewMode: "standard",
	searchDatabases: ["Consensus.app (loading-study discovery)", "PubMed (selected records)", "Europe PMC (selected full text)", "NIH Office of Dietary Supplements"],
	searchCutoffAt: checkedAt,
	inclusionRules: ["Human research with a defined creatine protocol and directly relevant measurements.", "Use reviews and institutional guidance for context without treating them as new trials."],
	exclusionRules: ["Do not infer tissue growth from lean mass alone or equivalence from a nonsignificant difference.", "Do not treat brand claims, mechanisms, or a single protocol as a universal result."],
	appraisalTools: ["Narrative outcome, methods and funding check; no formal GRADE or risk-of-bias instrument completed"],
	institutionalAnchors: [{ name: "NIH Office of Dietary Supplements", role: "Independent general performance and safety context, not endorsement of a product" }],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
	independenceSummary: "Commercial relationships are disclosed alongside the findings. Neither a position statement nor a manufacturer-funded experiment alone establishes universal superiority or safety.",
	lastRetractionCheckAt: checkedAt
} satisfies Partial<SeedClaim>;

function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return { appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: checkedAt, statusSources: [entry.url!], ...entry };
}

const nih = source({
	kind: "guideline",
	title: "Dietary Supplements for Exercise and Athletic Performance: Fact Sheet for Health Professionals",
	publisher: "NIH Office of Dietary Supplements",
	year: 2024,
	url: "https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/",
	stance: "context",
	note: "Creatine section checked, including protocols, alternative forms and limitations. Updated April 1, 2024, not newly published in 2026. General guidance does not replace individual medical advice. Citation-status check is limited to the linked record.",
	order: 3
});

const position = source({
	kind: "consensus_statement",
	title: "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
	publisher: "Journal of the International Society of Sports Nutrition",
	year: 2017,
	doi: "10.1186/s12970-017-0173-z",
	pmcid: "PMC5469049",
	url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/",
	stance: "context",
	note: "Relevant full-text protocol, bioavailability, ergogenic-value and competing-interest sections checked through Europe PMC. Contributors disclose supplement-industry funding, advisory and other relationships. Not an independent new head-to-head trial or a formally appraised systematic review. Status check limited to this record.",
	order: 2
});

function publication(id: string, summary: string): Pick<SeedClaim, "changeLog" | "readerAnnouncement"> {
	return {
		changeLog: [{ date: checkedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: checkedAt, kind: "new_review", bottomLineImpact: "new", summary }
	};
}

export const strengthPracticalClaims: SeedClaim[] = [
	{
		...reviewContext,
		title: "Is a loading phase necessary to raise muscle creatine stores?",
		slug: loadingSlug,
		consensusBand: "broad",
		agreementLevel: "broad_qualified",
		// Legacy editorial field, not a measured percentage of expert agreement.
		confidenceScore: 80,
		evidenceCertainty: "moderate",
		bottomLine: "No. A higher initial intake can raise muscle creatine stores faster, but a lower daily intake can raise them gradually over several weeks. This does not establish identical strength gains on every schedule or make supplementation necessary.",
		stableCore: [
			"In the 1996 study, 31 men received different amounts over different periods. Both rapid and gradual protocols increased muscle creatine concentration.",
			"The reported roughly 20% change refers to creatine stored in muscle, not a 20% increase in strength or muscle size.",
			"NIH guidance and the ISSN position statement describe gradual protocols without a high-dose loading phase."
		],
		openQuestions: ["How do tolerability, adherence and time to a useful performance benefit differ across schedules?", "How well do the older male-only store measurements generalize to other populations and baseline diets?"],
		whatWouldChangeMinds: ["Replicated direct comparisons of schedules measuring stores, strength, training exposure and adverse effects over the same period.", "Evidence that a clinically important subgroup cannot raise stores with a gradual protocol."],
		misconceptions: ["Faster accumulation is not proof of a larger eventual training benefit.", "Skipping loading does not mean creatine cannot enter muscle.", "The research doses describe experiments, not a personal prescription."],
		misconceptionTags: ["creatine loading", "muscle saturation", "supplement timing"],
		editorSummary: "Loading is a speed question. Separating it from long-term training outcomes avoids turning one practical protocol into a biological requirement. A person can also train effectively without taking creatine.",
		uncertaintySummary: "The narrow conclusion that loading is not required to raise stores has convergent experimental and guidance support. Exact timelines and strength equivalence are less certain. This targeted search is not exhaustive, and the original trial was checked at abstract level only.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "Muscle creatine concentration is not itself a strength or hypertrophy outcome." }, { type: "generalizability", detail: "The original experimental sample consisted of 31 men." }],
		surveillanceSpec: { focus: "Loading versus gradual creatine protocols", cadenceDays: 180, watchTerms: ["creatine loading no loading randomized muscle stores"], integrityMonitors: ["Notices on cited research records"], guidelineMonitors: ["NIH exercise-supplement guidance"], triggerRules: ["A direct protocol comparison, synthesis or source correction warrants reassessment."] },
		evidenceSummaries: [{
			question: "Can a gradual protocol raise muscle stores?",
			population: "31 men across experimental protocols in Hultman et al. (1996)",
			finding: "The abstract reports about 20% higher muscle creatine after 20 g/day for six days and a similar gradual rise after 3 g/day for 28 days.",
			effectDirection: "supports",
			magnitude: "Approximately 20% in stored muscle creatine; not a strength effect estimate.",
			certainty: "moderate",
			limitations: ["Abstract only; full methods and allocation not independently checked", "Different protocol durations", "No basis here for a strength-equivalence claim"]
		}],
		coiSummary: "The original trial's funding could not be established from the inspected abstract. The ISSN position statement discloses extensive supplement-industry relationships; NIH provides independent general context.",
		...publication("6cd4a2bf-9e62-47ba-8269-6f8493328d08", "New review: creatine loading speeds muscle-store accumulation but is not required for a gradual increase."),
		sources: [source({ kind: "landmark_study", title: "Muscle creatine loading in men", publisher: "Journal of Applied Physiology", year: 1996, doi: "10.1152/jappl.1996.81.1.232", pmid: "8828669", url: "https://pubmed.ncbi.nlm.nih.gov/8828669/", isAnchor: true, stance: "supports", note: "PubMed abstract and Consensus paper record checked. Experimental muscle-store measurements in 31 men; full allocation methods and funding not verified. Do not label this a randomized strength-equivalence trial. Status check limited to the linked record.", order: 1 }), position, nih]
	},
	{
		...reviewContext,
		title: "Does extra lean mass measured after creatine mean extra muscle tissue?",
		slug: leanMassSlug,
		consensusBand: "broad",
		agreementLevel: "broad_qualified",
		confidenceScore: 80,
		evidenceCertainty: "moderate",
		bottomLine: "Not necessarily. Lean-mass measurements include water and other non-fat components, so an early increase is not proof of new muscle tissue. Direct muscle-size studies suggest a possible small added growth benefit with training, but its size remains uncertain. These are compatible findings, not evidence that all creatine benefits are water.",
		stableCore: [
			"DXA estimates lean mass; it does not directly weigh newly built contractile muscle protein.",
			"A 2025 trial found a lean-mass increase during one week of creatine before training began, illustrating why the timing of the baseline matters.",
			"A separate synthesis using regional ultrasound or CT measurements addresses muscle size more directly, although it also has uncertainty."
		],
		openQuestions: ["How much of early measured change is fluid, and how much reflects tissue change under well-controlled hydration?", "Do larger, longer trials with direct imaging and a pre-training wash-in find meaningful extra growth?"],
		whatWouldChangeMinds: ["Trials combining muscle imaging, body-water measures and standardized hydration with prespecified long-term training outcomes.", "Independent replication of wash-in designs across doses, ages, sexes and training histories."],
		misconceptions: ["A kilogram of DXA lean mass is not necessarily a kilogram of new skeletal muscle.", "A nonsignificant difference in one trial is not proof that creatine never helps muscle growth.", "An early increase without training does not establish its exact water contribution when hydration was not measured."],
		misconceptionTags: ["creatine water weight", "DXA lean mass", "muscle hypertrophy"],
		editorSummary: "Read what was measured before interpreting how much muscle was gained. The wash-in trial informs measurement interpretation, while the imaging review addresses a different outcome. Neither licenses subtracting one study's kilograms from another study's estimate.",
		uncertaintySummary: "Confidence in the distinction between lean mass and muscle tissue is greater than confidence in the precise extra hypertrophy effect. The wash-in trial did not control hydration, and the imaging estimate's credible interval crosses zero. This is a targeted synthesis, not a formal certainty assessment.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "DXA lean mass includes non-muscle components; hydration was not measured in the wash-in trial." }, { type: "imprecision", detail: "The regional-muscle meta-analysis has a small average effect with a 95% credible interval crossing zero." }],
		surveillanceSpec: { focus: "Creatine, body water and direct muscle-size outcomes", cadenceDays: 180, watchTerms: ["creatine wash-in hydration hypertrophy imaging"], integrityMonitors: ["Notices on cited research records"], guidelineMonitors: ["NIH exercise-supplement guidance"], triggerRules: ["A replicated wash-in trial or updated direct-imaging synthesis warrants reassessment."] },
		evidenceSummaries: [
			{ question: "What happened before and after training in the wash-in trial?", population: "63 randomized adults aged 18–50, without resistance training in the previous year", finding: "After seven days of 5 g/day, the creatine group had a 0.51 kg greater DXA lean-mass change than the no-supplement control (p = 0.03). Over the subsequent 12-week training phase, gains were 2.24 versus 2.11 kg (p = 0.71).", effectDirection: "supports", magnitude: "DXA lean mass in kilograms, not directly measured muscle tissue or a demonstrated equivalence margin.", certainty: "low", limitations: ["No placebo supplement", "Hydration and intramuscular creatine not measured", "Only one dose tested; cannot infer that a higher dose is necessary", "Wash-in change within reported measurement standard error"] },
			{ question: "What does direct muscle imaging suggest?", population: "Ten trials in healthy adults, with 44 regional outcomes and 6–52 weeks of training", finding: "The 2023 Bayesian synthesis estimated a small average added effect with creatine, but the interval also permits no added effect.", effectDirection: "unclear", magnitude: "Standardized mean difference 0.11; 95% credible interval −0.02 to 0.25. Not kilograms or a consensus percentage.", certainty: "low", limitations: ["Different regions, populations and durations", "Few trained participants", "Industry relationships among review authors"] }
		],
		coiSummary: "The wash-in report discloses prior True Protein sponsorship supplying study creatine. Authors of the imaging synthesis disclose supplement-company advisory, research, donation, travel or educational interests. These do not automatically invalidate results but belong in their interpretation.",
		...publication("8b58217a-648d-49b2-a4f4-4f893147d996", "New review: distinguish creatine-related lean-mass changes from directly measured muscle growth."),
		sources: [
			source({ kind: "landmark_study", title: "The Effect of Creatine Supplementation on Lean Body Mass with and Without Resistance Training", publisher: "Nutrients", year: 2025, doi: "10.3390/nu17061081", pmid: "40292479", pmcid: "PMC11944689", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11944689/", isAnchor: true, stance: "supports", note: "Relevant full-text methods, results, discussion and disclosures checked through Europe PMC. No placebo or controlled hydration; the authors' higher-dose speculation was not tested. Source-record status check is not an exhaustive integrity investigation.", order: 1 }),
			source({ kind: "meta_analysis", title: "The Effects of Creatine Supplementation Combined with Resistance Training on Regional Measures of Muscle Hypertrophy: A Systematic Review with Meta-Analysis", publisher: "Nutrients", year: 2023, doi: "10.3390/nu15092116", pmid: "37432300", pmcid: "PMC10180745", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10180745/", stance: "context", note: "Full relevant methods, results and conflicts checked through Europe PMC. Bayesian credible intervals are not confidence intervals or expert agreement. Regional imaging is more direct than whole-body lean mass, but individual trials were not independently reappraised. Industry relationships disclosed. Status check limited to this record.", order: 2 }),
			nih
		]
	},
	{
		...reviewContext,
		title: "Does buffered creatine outperform creatine monohydrate?",
		slug: bufferedSlug,
		consensusBand: "broad",
		agreementLevel: "broad_qualified",
		confidenceScore: 65,
		evidenceCertainty: "low",
		bottomLine: "A benefit over monohydrate has not been demonstrated in the direct trial checked. Buffered creatine did not produce greater muscle-creatine, body-composition or strength changes over 28 days. That small trial does not prove exact equivalence, identical long-term safety, or that every alternative formulation is ineffective.",
		stableCore: ["The 2012 randomized double-blind study compared monohydrate with buffered creatine at both a lower marketed dose and a matched dose.", "There was no inactive placebo group, so this is a formulation comparison rather than a fresh test of creatine versus no creatine.", "An absorption or stomach-acidity explanation is not itself evidence of better training results."],
		openQuestions: ["Would independent, longer head-to-head trials find a meaningful difference in strength, tolerability or adherence?", "Can any proposed advantage be replicated with verified product composition and prespecified outcomes?"],
		whatWouldChangeMinds: ["Adequately powered, independently funded superiority trials with matched training and transparent adverse-event reporting.", "A replicated advantage important to users, not just a different blood concentration or marketing claim."],
		misconceptions: ["More expensive does not establish better muscle uptake or performance.", "No statistically significant difference is not a formal demonstration of equivalence.", "No reported adverse events in a short small study does not prove equal lifetime safety."],
		misconceptionTags: ["buffered creatine", "creatine monohydrate", "supplement marketing"],
		editorSummary: "The relevant question is whether the claimed improvement survives a direct comparison. This trial and the broader guidance do not establish a buffered-product advantage. The conclusion is deliberately narrower than a verdict on all possible formulations.",
		uncertaintySummary: "The direct study is small, short and funded by a monohydrate manufacturer. A lack of demonstrated superiority is better supported than a claim of exact equivalence. This targeted source check is not an exhaustive review of every formulation.",
		uncertaintyDrivers: [{ type: "imprecision", detail: "Only 36 men over 28 days; usable muscle biopsies in 25 participants." }, { type: "bias", detail: "The monohydrate manufacturer AlzChem funded the trial." }, { type: "generalizability", detail: "Healthy resistance-trained young men do not represent all potential users." }],
		surveillanceSpec: { focus: "Direct buffered versus monohydrate comparisons", cadenceDays: 180, watchTerms: ["buffered creatine monohydrate randomized superiority"], integrityMonitors: ["Notices on cited research records"], guidelineMonitors: ["NIH exercise-supplement guidance"], triggerRules: ["An independent head-to-head trial or systematic synthesis warrants reassessment."] },
		evidenceSummaries: [{ question: "Did buffering improve outcomes in the direct comparison?", population: "36 healthy resistance-trained men, average age about 20, over 28 days", finding: "No greater training or body-composition changes were demonstrated with buffered creatine. Usable biopsy measurements were available in only 25 participants.", effectDirection: "unclear", magnitude: "Three study arms; no superiority shown, not a quantified equivalence result.", certainty: "low", limitations: ["Habitual training logged, not a new standardized supervised program", "No inactive placebo arm", "Short duration and limited sample", "Funded by AlzChem, a monohydrate manufacturer"] }],
		coiSummary: "AlzChem, a creatine-monohydrate manufacturer, funded the direct trial. The authors stated that analysis and interpretation were independent. The ISSN position statement also discloses supplement-industry relationships; these are not independent replications of the trial.",
		...publication("6d814723-a291-4c07-819a-93171b55ba34", "New review: a direct trial does not establish that buffered creatine outperforms monohydrate."),
		sources: [source({ kind: "landmark_study", title: "A buffered form of creatine does not promote greater changes in muscle creatine content, body composition, or training adaptations than creatine monohydrate", publisher: "Journal of the International Society of Sports Nutrition", year: 2012, doi: "10.1186/1550-2783-9-43", pmcid: "PMC3479057", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3479057/", isAnchor: true, stance: "supports", note: "Full relevant design, participants, supplementation, results and funding sections checked through Europe PMC. Randomized double-blind formulation trial with manufacturer funding; not an equivalence trial. Muscle free-creatine analysis included 25 valid biopsy records. Status check limited to this record.", order: 1 }), position, nih]
	}
];
