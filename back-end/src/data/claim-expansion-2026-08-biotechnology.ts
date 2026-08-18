import type { SeedClaim } from "./claims.js";
import { august2026ReviewedClaim as reviewedClaim } from "./claim-expansion-2026-08-shared.js";

export const august2026BiotechnologyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Does private umbilical cord-blood banking benefit most families?",
		slug: "does-private-umbilical-cord-blood-banking-benefit-most-families",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Routine private cord-blood storage as biological insurance is unlikely to benefit most families. Professional bodies favor public donation when available and support directed family banking when a sibling or close relative has a condition that may be treated with a cord-blood transplant. Marketing of broad future regenerative uses generally runs ahead of proven clinical applications.",
		stableCore: [
			"Cord blood contains blood-forming stem cells used to treat selected blood, immune, and metabolic disorders.",
			"The chance that a child will use their own privately stored unit is low, and the unit may be too small for a larger recipient.",
			"For some genetic diseases and leukemias, the child's own cord blood may carry the same mutation or a premalignant cell and therefore may not be appropriate.",
			"Public banks make donated units available to matched patients and improve the diversity of the donor inventory."
		],
		openQuestions: [
			"Which experimental regenerative applications will eventually demonstrate durable clinical benefit using autologous or related cord-derived cells?",
			"How can collection and public-bank access be expanded while maintaining quality and diverse representation?"
		],
		whatWouldChangeMinds: [
			"Proven common clinical uses that make a privately stored autologous unit substantially likely to benefit the child or family.",
			"Independent cost-effectiveness evidence showing routine private storage produces meaningful population benefit compared with public donation and other health priorities."
		],
		misconceptions: [
			"Saving cord blood does not guarantee that enough suitable cells will be available if illness occurs.",
			"A family's real directed medical need is different from speculative insurance for an average-risk newborn.",
			"Promising laboratory or early-phase research is not an established future treatment."
		],
		editorSummary:
			"Cord blood is a legitimate transplant resource, but that does not make routine private storage the best choice for most births. Public donation and medically directed banking align more closely with proven use.",
		uncertaintySummary:
			"Current transplant uses and low autologous-use probability are well established. Future cell therapies could change the calculation, but families should not pay today as though experimental indications were guaranteed.",
		sources: [
			{
				kind: "guideline",
				title: "Umbilical Cord Blood Banking",
				publisher: "American College of Obstetricians and Gynecologists",
				year: 2019,
				url: "https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2019/03/umbilical-cord-blood-banking",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Clinical guidance favoring public banking over routine private storage and supporting directed banking when a known family medical indication exists.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Cord Blood Banking for Potential Future Transplantation",
				publisher: "American Academy of Pediatrics",
				year: 2017,
				url: "https://publications.aap.org/pediatrics/article-abstract/140/5/e20172695/37866/Cord-Blood-Banking-for-Potential-Future",
				doi: "10.1542/peds.2017-2695",
				appraisal: "high",
				stance: "supports",
				note: "Pediatric policy reviewing proven transplant uses, limitations of autologous units, quality requirements, public donation, and directed family banking.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Hybrid umbilical cord blood banking: a literature review",
				publisher: "Archives of Gynecology and Obstetrics",
				year: 2023,
				url: "https://doi.org/10.1007/s00404-023-07003-x",
				doi: "10.1007/s00404-023-07003-x",
				appraisal: "moderate",
				stance: "context",
				note: "Recent review comparing public, private, and hybrid models and documenting the clinical-use, access, quality, and cost tradeoffs behind policy recommendations.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Does PGT-A improve cumulative live-birth rates for most IVF patients?",
		slug: "does-pgt-a-improve-cumulative-live-birth-rates-for-most-ivf-patients",
		consensusBand: "mixed",
		confidenceScore: 72,
		evidenceCertainty: "moderate",
		bottomLine:
			"Routine preimplantation genetic testing for aneuploidy has not been shown to increase the cumulative chance of live birth for most IVF patients when all embryos from a retrieval are counted. It can reduce transfers of clearly aneuploid embryos and may reduce miscarriage or time to pregnancy in selected patients, but benefits depend on age, embryo number, test accuracy, mosaic-result policy, and which outcome is measured.",
		stableCore: [
			"PGT-A samples a few placental-lineage cells from a blastocyst and estimates whether chromosome copy numbers are abnormal.",
			"Per-transfer success can look better after excluding embryos, while cumulative live birth per retrieval may not improve because fewer embryos remain available.",
			"A large randomized trial in younger women with several good-quality blastocysts found no cumulative live-birth advantage from PGT-A.",
			"Mosaic calls, embryo self-correction, laboratory thresholds, biopsy effects, and false classification complicate decisions about discarding or deprioritizing embryos."
		],
		openQuestions: [
			"Which older or recurrent-loss subgroups gain a net cumulative benefit after accounting for cost, time, and embryos not transferred?",
			"How should laboratories standardize mosaic reporting and counsel patients about embryos with uncertain reproductive potential?"
		],
		whatWouldChangeMinds: [
			"Large age-stratified randomized trials showing a reproducible cumulative live-birth benefit per retrieval in a clearly defined population.",
			"Improved testing that prospectively demonstrates lower misclassification and better outcomes without losing embryos capable of healthy live birth."
		],
		misconceptions: [
			"Selecting an embryo with a higher chance per transfer does not necessarily increase the chance of a baby from the entire retrieval.",
			"PGT-A is a screening test, not a guarantee that an embryo or pregnancy is genetically normal.",
			"A result in younger good-prognosis patients cannot settle effectiveness for every older or poor-prognosis patient."
		],
		editorSummary:
			"This is an endpoint-sensitive debate. PGT-A can make a sequence of transfers more selective, but the clinically central question is whether it improves the cumulative chance of live birth for a particular patient without wrongly excluding usable embryos.",
		uncertaintySummary:
			"Moderate evidence argues against universal routine benefit. Subgroup effects remain unsettled because age, embryo yield, platform, mosaic handling, clinic practice, and per-transfer versus per-retrieval outcomes differ across studies.",
		sources: [
			{
				kind: "guideline",
				title: "The use of preimplantation genetic testing for aneuploidy: a committee opinion",
				publisher: "American Society for Reproductive Medicine",
				year: 2024,
				url: "https://www.asrm.org/practice-guidance/practice-committee-documents/the-use-of-preimplantation-genetic-testing-for-aneuploidy-a-committee-opinion-2024/",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Current practice review concluding that universal value as a routine IVF screening test has not been demonstrated and identifying possible selected uses and unresolved mosaic issues.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Live Birth with or without Preimplantation Genetic Testing for Aneuploidy",
				publisher: "New England Journal of Medicine",
				year: 2021,
				url: "https://doi.org/10.1056/NEJMoa2103613",
				doi: "10.1056/NEJMoa2103613",
				appraisal: "high",
				stance: "debate",
				note: "Large randomized trial in women aged 20–37 with at least three good-quality blastocysts finding lower pregnancy loss but no higher cumulative live-birth rate with PGT-A.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Preimplantation genetic testing for abnormal chromosome numbers for couples undergoing in vitro fertilisation",
				publisher: "Cochrane",
				year: 2020,
				url: "https://www.cochrane.org/evidence/CD005291_preimplantation-genetic-testing-abnormal-chromosome-numbers-couples-undergoing-vitro-fertilisation",
				doi: "10.1002/14651858.CD005291.pub3",
				appraisal: "high",
				stance: "debate",
				note: "Randomized-evidence synthesis finding insufficient evidence of a cumulative live-birth benefit and emphasizing low certainty and differences among testing generations.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Does tumor genomic sequencing guarantee an effective matched cancer therapy?",
		slug: "does-tumor-genomic-sequencing-guarantee-an-effective-matched-cancer-therapy",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Tumor genomic testing can identify an effective targeted treatment, trial, diagnostic clue, or inherited-risk signal for some patients, and it is standard in several cancers. But many tumors have no currently actionable alteration, some matches lack proof for that cancer type, access can be limited, and a molecular match does not guarantee response or prevent resistance.",
		stableCore: [
			"A genomic alteration can be a driver, a passenger, a resistance marker, or a finding whose clinical meaning is unknown.",
			"Actionability depends on tumor type, evidence level, drug availability, prior treatment, co-alterations, and patient health—not only the presence of a mutation.",
			"Even strongly matched therapies help only a subset of eligible patients and can fail as heterogeneous tumor cells evolve resistance.",
			"Normal-tissue testing and genetic counseling may be needed when a tumor result could represent an inherited variant."
		],
		openQuestions: [
			"Which combinations of genomic, transcriptomic, immune, and functional testing most improve survival rather than only matching rates?",
			"How can representative access to sequencing, molecular tumor boards, trials, and matched drugs be improved?"
		],
		whatWouldChangeMinds: [
			"Evidence that nearly all sequenced tumors yield an accessible, validated match with a high and durable response rate.",
			"Randomized evidence showing that broad sequencing adds no patient benefit beyond standard pathology and guideline-directed testing."
		],
		misconceptions: [
			"Finding a mutation is not the same as finding a drug that will work.",
			"A commercially listed match may rest on evidence from another cancer type or an early trial.",
			"The absence of an actionable result does not mean the test was performed incorrectly or that no treatment remains."
		],
		editorSummary:
			"Precision oncology is genuinely useful but probabilistic. Its strongest successes occur where a biomarker and therapy are clinically validated; sequencing should be presented as a way to find opportunities, not a promise that every tumor has a vulnerable switch.",
		uncertaintySummary:
			"Clinical utility varies sharply by cancer, disease stage, panel, evidence framework, and access. Many studies measure actionability or treatment matching rather than randomized survival improvement.",
		sources: [
			{
				kind: "guideline",
				title: "Biomarker Testing for Cancer Treatment",
				publisher: "National Cancer Institute",
				year: 2026,
				url: "https://www.cancer.gov/about-cancer/treatment/types/biomarker-testing-cancer-treatment",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Patient-facing institutional guidance explaining when biomarker testing is standard, why results may not produce a treatment, and why a match may not work.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Clinical Impact of Next-Generation Sequencing-Guided Targeted Therapies in Advanced Cancer",
				publisher: "Clinical Oncology",
				year: 2025,
				url: "https://doi.org/10.1016/j.clon.2025.103943",
				doi: "10.1016/j.clon.2025.103943",
				appraisal: "moderate",
				stance: "context",
				note: "Recent synthesis finding clinically meaningful benefit in selected matched patients while documenting that only a subset receive and respond to a recommended targeted therapy.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "ESMO Scale for Clinical Actionability of molecular Targets (ESCAT)",
				publisher: "European Society for Medical Oncology",
				year: 2018,
				url: "https://doi.org/10.1093/annonc/mdy263",
				doi: "10.1093/annonc/mdy263",
				appraisal: "high",
				stance: "context",
				note: "Consensus framework ranking molecular targets by strength of clinical evidence, illustrating why not every detected alteration is an equally credible treatment match.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Are polygenic embryo-screening scores clinically proven to improve children's health?",
		slug: "are-polygenic-embryo-screening-scores-clinically-proven-to-improve-childrens-health",
		consensusBand: "unclear",
		confidenceScore: 45,
		evidenceCertainty: "very_low",
		bottomLine:
			"No clinical trials have shown that selecting IVF embryos using polygenic risk scores improves children's health. Scores can estimate statistical risk for some complex traits, but prediction within a small group of siblings is limited, performance varies by ancestry, environments change outcomes, and reducing one predicted risk can unintentionally shift others. Professional societies currently regard the practice as unproven and unsuitable for routine clinical use.",
		stableCore: [
			"Polygenic scores combine many variants, each with a small association derived from population datasets.",
			"Embryos from the same parents share much of their genome, so expected score differences are smaller than differences across unrelated people.",
			"Most scores predict less accurately in ancestry groups underrepresented in the discovery data.",
			"There is no prospective evidence that score-based embryo selection produces healthier children over the life course."
		],
		openQuestions: [
			"What are the long-term health, psychological, equity, and family effects if selection is used at scale?",
			"How stable are within-family predictions when environments, gene interactions, ancestry, and pleiotropic effects are modeled more realistically?"
		],
		whatWouldChangeMinds: [
			"Prospective, independently replicated evidence showing clinically meaningful health improvement without offsetting harms across diverse families.",
			"Validated within-family prediction that remains accurate across ancestry groups and produces transparent, favorable net-benefit estimates."
		],
		misconceptions: [
			"A percentile calculated among unrelated adults does not translate directly into the same difference among sibling embryos.",
			"Lower predicted risk is not a guarantee that a child will avoid disease, and a higher score is not a diagnosis.",
			"Technical ability to calculate a score is not evidence that using it improves outcomes."
		],
		editorSummary:
			"This is a frontier technology already being marketed ahead of outcome evidence. The relevant standard is not whether a score can rank embryos, but whether selection yields meaningful net health benefit across diverse families without unacceptable tradeoffs.",
		uncertaintySummary:
			"Evidence certainty is very low because no prospective child-health outcome trials exist. Modeling assumptions, ancestry transferability, embryo number, correlated traits, and future environments all materially change predicted benefit.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Use of preimplantation genetic testing for polygenic disorders (PGT-P): an Ethics Committee opinion",
				publisher: "American Society for Reproductive Medicine",
				year: 2026,
				url: "https://www.asrm.org/practice-guidance/ethics-opinions/use-of-preimplantation-genetic-testing-for-polygenic-disorders-pgt-p-an-ethics-committee-opinion-2026/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Current professional opinion characterizing PGT-P as nascent and unproven and concluding that it should not be offered as routine reproductive care.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "ESHRE position statement on polygenic risk scores in preimplantation genetic testing",
				publisher: "European Society of Human Reproduction and Embryology",
				year: 2021,
				url: "https://www.eshre.eu/Guidelines-and-Legal/Position-statements/PRS",
				appraisal: "high",
				stance: "supports",
				note: "Professional position opposing clinical use because of limited utility, population bias, complex trait biology, and unresolved ethical concerns.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Screening embryos for polygenic disease risk: a review of epidemiological, clinical, and ethical considerations",
				publisher: "Human Reproduction Update",
				year: 2024,
				url: "https://doi.org/10.1093/humupd/dmae012",
				doi: "10.1093/humupd/dmae012",
				appraisal: "high",
				stance: "context",
				note: "Comprehensive review of modeled benefit, within-family limitations, ancestry portability, correlated traits, clinical evidence gaps, and governance questions.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Can blood-based tumor DNA testing replace tissue biopsy for most cancers?",
		slug: "can-blood-based-tumor-dna-testing-replace-tissue-biopsy-for-most-cancers",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Not for most cancers. Circulating tumor DNA testing can reveal actionable mutations, track some cancers, and help when tissue is unsafe or insufficient, but a negative blood result can miss a low-shedding or low-volume tumor. Tissue usually remains necessary to establish histology, architecture, and other features that a blood sample cannot provide.",
		stableCore: [
			"Tumors release variable amounts of DNA into blood depending on cancer type, burden, location, treatment, and biology.",
			"A well-validated positive liquid-biopsy result can sometimes guide targeted therapy without repeating an invasive biopsy.",
			"A negative result is often non-informative rather than proof that the tumor lacks the alteration, so tissue testing should follow when feasible.",
			"Blood testing does not ordinarily provide the cellular morphology and spatial context required to diagnose and classify a new cancer."
		],
		openQuestions: [
			"Which cancer-stage and assay combinations have sufficient sensitivity and clinical utility for screening, residual-disease monitoring, or treatment selection?",
			"How should clinicians distinguish tumor DNA from age-related clonal blood-cell variants that can create false-positive interpretations?"
		],
		whatWouldChangeMinds: [
			"Prospective trials showing that blood-only diagnosis and profiling match or improve outcomes across most cancer types without unacceptable missed disease.",
			"Assays with consistently high sensitivity at low tumor fractions plus validated methods for recovering histologic and microenvironment information."
		],
		misconceptions: [
			"A negative liquid biopsy does not rule out cancer or an actionable tumor mutation.",
			"A DNA variant found in blood does not always come from the tumor.",
			"Being less invasive makes liquid biopsy complementary and valuable, but not automatically a complete substitute for tissue."
		],
		editorSummary:
			"Liquid biopsy is a powerful complement whose value is already real in selected settings. The key asymmetry is that a valid positive result may be actionable, whereas a negative result often cannot close the question.",
		uncertaintySummary:
			"Utility varies by assay, cancer, stage, shedding, and purpose. Rapid technical change means this boundary should be reviewed frequently, especially for residual disease and early detection.",
		sources: [
			{
				kind: "consensus_statement",
				title: "IASLC issues consensus updated report on liquid biopsies",
				publisher: "International Association for the Study of Lung Cancer",
				year: 2021,
				url: "https://www.iaslc.org/iaslc-news/press-release/iaslc-issues-consensus-updated-report-liquid-biopsies",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Clinical consensus explaining validated uses in advanced lung cancer, the value of a positive result, and the need for tissue follow-up after an uninformative negative test.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Liquid Biopsy for Advanced Non-Small Cell Lung Cancer: A Statement Paper from the IASLC",
				publisher: "Journal of Thoracic Oncology",
				year: 2021,
				url: "https://doi.org/10.1016/j.jtho.2021.06.017",
				doi: "10.1016/j.jtho.2021.06.017",
				appraisal: "high",
				stance: "context",
				note: "Detailed evidence-based statement defining when plasma testing can guide care and why negative plasma findings cannot generally replace tumor analysis.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Circulating Tumor DNA Analysis in Patients With Cancer: American Society of Clinical Oncology and College of American Pathologists Joint Review",
				publisher: "Journal of Clinical Oncology",
				year: 2018,
				url: "https://doi.org/10.1200/JCO.2017.76.8671",
				doi: "10.1200/JCO.2017.76.8671",
				appraisal: "high",
				stance: "context",
				note: "Joint review assessing analytic validity, clinical validity, concordance with tissue, false-negative risk, and the evidence needed before broader replacement claims.",
				order: 3
			}
		]
	})
];
