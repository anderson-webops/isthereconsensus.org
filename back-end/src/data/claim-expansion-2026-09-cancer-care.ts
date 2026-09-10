import type { SeedClaim } from "./claims.js";
import { september2026ClinicalClaim as reviewedClaim } from "./claim-expansion-2026-09-clinical-shared.js";

export const september2026CancerCareClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Do diagnostic biopsies usually cause cancer to spread?",
		slug: "do-diagnostic-biopsies-usually-cause-cancer-to-spread",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Biopsy is a standard part of diagnosing and treating cancer, and clinically important tumor seeding along a needle path is rare. It has been reported with some tumors and procedures, so specialists choose technique and route carefully, but avoiding a medically indicated biopsy because spread is expected can delay the diagnosis needed for effective care.",
		stableCore: [
			"A biopsy removes or samples tissue so pathology can identify whether cancer is present and what type it is.",
			"Needle-tract seeding is biologically possible and documented, but modern series find it uncommon rather than a usual consequence.",
			"The benefit-risk balance depends on tumor type, anatomic route, technique, and whether the result will change management."
		],
		openQuestions: [
			"Which techniques and routes minimize seeding for uncommon tumors with higher procedure-specific risk?",
			"When can imaging, liquid biopsy, or resection provide enough information without a separate tissue biopsy?"
		],
		whatWouldChangeMinds: [
			"Large modern cohorts showing frequent clinically consequential seeding across routine biopsy procedures.",
			"Tumor-specific evidence showing that an alternative diagnostic route consistently produces better outcomes."
		],
		misconceptions: [
			"A temporal discovery of metastases after biopsy does not show that the biopsy created them.",
			"Rare case reports establish possibility, not the usual risk across all cancers.",
			"The appropriate response to a procedure-specific risk is planning with the treating team, not abandoning diagnosis."
		],
		editorSummary:
			"The useful distinction is between a rare, tumor-specific complication and the claim that biopsy commonly releases cancer. For most patients, accurate tissue diagnosis has far greater clinical value than the small seeding risk.",
		uncertaintySummary:
			"The general conclusion is stable, but exact risk varies by tumor, needle route, technique, follow-up, and whether microscopic deposits ever become clinically important.",
		sources: [
			["guideline", "Common Cancer Myths and Misconceptions", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/causes-prevention/risk/myths", "NCI explains that the chance surgery or biopsy causes cancer to spread is extremely low and that standard precautions reduce it."],
			["systematic_review", "Tumor Seeding With Needle Biopsy of Hepatocellular Carcinoma: A Systematic Review", "The American Journal of Gastroenterology", 2025, "10.14309/ajg.0000000000003210", "Tumor-specific synthesis estimates a low but nonzero needle-tract seeding rate after biopsy for hepatocellular carcinoma."],
			["systematic_review", "Does the taking of biopsies affect the metastatic potential of tumours? A systematic review of reports on veterinary and human cases and animal models", "The Veterinary Journal", 2011, "10.1016/j.tvjl.2011.04.010", "Cross-species review documents possible mechanisms and cases while showing why possibility should not be mistaken for a common clinical outcome."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Does cutting sugar from the diet starve or cure cancer?",
		slug: "does-cutting-sugar-from-the-diet-starve-or-cure-cancer",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Cancer cells use glucose, but so do healthy cells, and eliminating dietary sugar does not selectively starve a tumor or cure cancer. Overall diet, body weight, metabolic health, symptoms, and treatment tolerance can matter, while highly restrictive diets may cause weight and muscle loss or interfere with care.",
		stableCore: [
			"The body maintains blood glucose from multiple nutrients even when added sugar or carbohydrate intake falls.",
			"No human evidence shows that removing sugar alone eradicates established cancer.",
			"Nutrition during cancer care should support adequate energy, protein, treatment tolerance, and management of disease-specific risks."
		],
		openQuestions: [
			"Can defined dietary patterns improve outcomes for selected cancers when used alongside standard treatment?",
			"Which patients can safely use ketogenic or lower-carbohydrate diets without worsening malnutrition or quality of life?"
		],
		whatWouldChangeMinds: [
			"Replicated randomized trials showing that sugar elimination alone produces durable tumor regression or survival benefit.",
			"High-quality comparative trials identifying a specific diet-treatment combination with a clinically meaningful net benefit."
		],
		misconceptions: [
			"A tumor taking up glucose on a PET scan does not mean table sugar uniquely feeds it.",
			"Reducing excess added sugar for general health is not the same claim as curing cancer.",
			"A diet can change biomarkers without improving survival or replacing oncology treatment."
		],
		editorSummary:
			"The slogan turns a real metabolic feature into an unsupported treatment promise. Nutrition can be clinically important, but the relevant outcomes are treatment tolerance, body composition, symptoms, quality of life, recurrence, and survival.",
		uncertaintySummary:
			"Evidence against sugar elimination as a cure is strong. Trials of ketogenic and other metabolic diets remain small and heterogeneous, with no established survival benefit for routine cancer care.",
		sources: [
			["guideline", "Common Cancer Myths and Misconceptions", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/causes-prevention/risk/myths", "NCI distinguishes cancer cells' glucose use from the unsupported claim that eating or avoiding sugar controls tumor growth."],
			["systematic_review", "The use of ketogenic diets in cancer patients: a systematic review", "Clinical and Experimental Medicine", 2021, "10.1007/s10238-021-00710-2", "Review finds limited, heterogeneous clinical evidence and no basis for replacing established treatment with a ketogenic diet."],
			["systematic_review", "A systematic review of the use of ketogenic diets in adult patients with cancer", "Journal of Human Nutrition and Dietetics", 2018, "10.1111/jhn.12587", "Review describes biological rationale but emphasizes the gap between mechanism, early clinical research, and proven patient benefit."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Can unproven alternative therapies safely replace effective cancer treatment?",
		slug: "can-unproven-alternative-therapies-safely-replace-effective-cancer-treatment",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Unproven alternative therapies should not replace cancer treatments with established benefit. Observational studies find substantially worse survival among patients who choose alternative medicine instead of conventional treatment, while some complementary practices may help symptoms when checked for interactions and used alongside oncology care.",
		stableCore: [
			"Alternative treatment means using a product or practice instead of standard care; complementary treatment means using it alongside standard care.",
			"Delaying or refusing effective surgery, radiation, systemic therapy, or other indicated care can allow treatable disease to progress.",
			"Natural does not mean effective, uncontaminated, or free of interactions with medicines and procedures."
		],
		openQuestions: [
			"Which complementary approaches reliably improve pain, nausea, anxiety, sleep, or quality of life without interfering with treatment?",
			"How can clinicians discuss misinformation and patient values early enough to prevent dangerous treatment delay?"
		],
		whatWouldChangeMinds: [
			"Well-controlled trials showing a proposed alternative produces equal or better survival and safety than the treatment it would replace.",
			"Independent replication with standardized products, transparent harms, and clinically meaningful outcomes."
		],
		misconceptions: [
			"Patient testimonials cannot reveal how similar patients would have done with standard care.",
			"Using acupuncture or another supportive practice for symptoms does not validate claims that it cures cancer.",
			"Calling a therapy suppressed or natural does not supply comparative evidence."
		],
		editorSummary:
			"The safety issue is not only direct toxicity. The largest avoidable harm can be loss of time and refusal of treatment known to improve survival. Complementary symptom care and replacement cancer treatment are different questions.",
		uncertaintySummary:
			"Randomizing patients to abandon effective care would be unethical, so replacement-harm estimates are observational and may include selection differences. The direction is nevertheless consistent, large, and biologically plausible.",
		sources: [
			["guideline", "Complementary and Alternative Medicine", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/treatment/cam", "NCI distinguishes complementary from alternative use and advises discussing products and practices with the cancer-care team."],
			["landmark_study", "Use of Alternative Medicine for Cancer and Its Impact on Survival", "JNCI: Journal of the National Cancer Institute", 2018, "10.1093/jnci/djx145", "National cohort study found greater mortality among patients using alternative medicine instead of conventional cancer treatment."],
			["landmark_study", "Complementary Medicine, Refusal of Conventional Cancer Therapy, and Survival Among Patients With Curable Cancers", "JAMA Oncology", 2018, "10.1001/jamaoncol.2018.2487", "Observational analysis links complementary-medicine use with refusal of conventional care and poorer survival, clarifying treatment substitution as a major pathway."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Does early palliative care mean giving up or shorten life?",
		slug: "does-early-palliative-care-mean-giving-up-or-shorten-life",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. Palliative care can begin alongside cancer-directed treatment at any stage of serious illness. Early integration improves quality of life and symptom control and can reduce depression and burdensome care; it is not intended to hasten death, and some trials have found similar or longer survival rather than shorter survival.",
		stableCore: [
			"Palliative care addresses pain, other symptoms, communication, practical needs, caregiver support, and treatment goals.",
			"It is distinct from hospice eligibility and does not require stopping disease-directed treatment.",
			"Benefits are most consistent for quality of life, symptoms, and care alignment; survival effects vary across studies."
		],
		openQuestions: [
			"Which timing, staffing, telehealth, and referral models produce the greatest benefit for different cancers and health systems?",
			"How can early palliative services reach patients who face workforce, geographic, language, or insurance barriers?"
		],
		whatWouldChangeMinds: [
			"Large trials showing that early integrated palliative care consistently worsens quality of life or shortens survival.",
			"Comparative evidence identifying a less burdensome model that delivers equal patient and caregiver outcomes."
		],
		misconceptions: [
			"Palliative care is not synonymous with hospice or imminent death.",
			"Accepting symptom support does not mean declining chemotherapy, surgery, radiation, or other treatment.",
			"A survival finding in one cancer should not be promised to every patient."
		],
		editorSummary:
			"Early palliative care adds a layer of support rather than marking the end of treatment. The strongest reason to offer it is better living and decision support during serious illness, not a guaranteed survival extension.",
		uncertaintySummary:
			"Quality-of-life and symptom benefits are well supported, though programs and patient populations vary. Survival estimates are less consistent and should not be treated as the primary expected effect.",
		sources: [
			["guideline", "Palliative Care in Cancer", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/advanced-cancer/care-choices/palliative-care-fact-sheet", "NCI explains that palliative care can accompany cancer treatment from diagnosis and is not limited to end-of-life care."],
			["meta_analysis", "Effects of early palliative care on patients with incurable cancer: A meta-analysis and systematic review", "European Journal of Cancer Care", 2022, "10.1111/ecc.13620", "Synthesis supports quality-of-life, mood, and symptom benefits while documenting heterogeneity and evidence limitations."],
			["landmark_study", "Early Palliative Care for Patients with Metastatic Non-Small-Cell Lung Cancer", "The New England Journal of Medicine", 2010, "10.1056/NEJMoa1000678", "Randomized trial found better quality of life and mood, less aggressive end-of-life care, and no survival shortening in one cancer population."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Does exercise during and after cancer treatment reduce fatigue and improve function?",
		slug: "does-exercise-during-and-after-cancer-treatment-reduce-fatigue-and-improve-function",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Appropriately prescribed aerobic, resistance, or combined exercise during and after cancer treatment can reduce fatigue and improve physical function and quality of life. The plan should be adapted for treatment effects, bone disease, blood counts, neuropathy, infection risk, surgery, heart or lung disease, and current fitness.",
		stableCore: [
			"Exercise is a recommended part of supportive cancer care rather than something every patient must postpone until treatment ends.",
			"Benefits are clearest for fatigue, fitness, strength, function, and quality of life.",
			"The safe starting point and need for supervision depend on diagnosis, treatment, symptoms, and complications."
		],
		openQuestions: [
			"Which doses and delivery models work best for less-studied cancers, advanced disease, and people with substantial disability?",
			"How much do exercise programs change recurrence and survival beyond their established supportive-care benefits?"
		],
		whatWouldChangeMinds: [
			"Large randomized syntheses finding no patient-important fatigue or functional benefit with adapted programs.",
			"Evidence that serious harms routinely outweigh benefit when contraindications and treatment effects are assessed."
		],
		misconceptions: [
			"Exercise does not mean pushing through fever, severe pain, acute illness, or unsafe treatment complications.",
			"A general guideline is not an individualized prescription for every cancer patient.",
			"Better fitness or fatigue does not by itself prove longer survival."
		],
		editorSummary:
			"The evidence supports moving from blanket rest toward adapted activity. The practical task is matching the type, dose, and supervision to the patient's treatment course and safety constraints.",
		uncertaintySummary:
			"Supportive outcomes are high-confidence across many trials. Less evidence addresses uncommon cancers, severe comorbidity, advanced complications, long-term adherence, recurrence, and survival.",
		sources: [
			["consensus_statement", "Exercise Guidelines for Cancer Survivors: Consensus Statement from International Multidisciplinary Roundtable", "Medicine & Science in Sports & Exercise", 2019, "10.1249/MSS.0000000000002116", "International expert review translates trial evidence into exercise prescriptions and safety considerations for common cancer-related outcomes."],
			["meta_analysis", "Comparative effects of different types of exercise on health-related quality of life during and after active cancer treatment: A systematic review and network meta-analysis", "Journal of Sport and Health Science", 2023, "10.1016/j.jshs.2023.01.002", "Network synthesis compares exercise modes and supports quality-of-life benefit during and after active treatment."],
			["guideline", "Physical Activity and Cancer Fact Sheet", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/causes-prevention/risk/obesity/physical-activity-fact-sheet", "NCI summarizes activity guidance, benefits, and the need to account for cancer-specific health and safety considerations."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Does quitting smoking after a cancer diagnosis improve survival?",
		slug: "does-quitting-smoking-after-a-cancer-diagnosis-improve-survival",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Continuing to smoke after a cancer diagnosis increases treatment complications, second cancers, recurrence risk for some cancers, and mortality. Stopping is associated with better survival and treatment outcomes, and evidence-based counseling and medication can help even after many years of smoking.",
		stableCore: [
			"A cancer diagnosis is not too late for tobacco cessation to improve health.",
			"Stopping can improve healing, treatment tolerance, cardiopulmonary health, and longer-term cancer outcomes.",
			"Support should be offered without blame because nicotine dependence is a treatable chronic condition."
		],
		openQuestions: [
			"Which oncology-embedded programs produce the highest durable quit rates across cancer types and treatment settings?",
			"How much of the survival benefit varies by timing, cancer site, stage, treatment, and complete versus partial cessation?"
		],
		whatWouldChangeMinds: [
			"Bias-resistant prospective evidence consistently finding no treatment, recurrence, second-cancer, or survival advantage after cessation.",
			"Comparative trials identifying a more effective and acceptable cessation pathway for oncology care."
		],
		misconceptions: [
			"Past exposure cannot be erased, but future risk is not fixed at diagnosis.",
			"A smoking-related cancer is not a moral failure and stigma can obstruct treatment.",
			"Cutting down may reduce exposure, but it is not equivalent to verified sustained cessation."
		],
		editorSummary:
			"Cessation is part of cancer treatment, not an optional lifestyle footnote. The evidence supports routine, compassionate help with counseling and medication rather than simply telling patients to quit.",
		uncertaintySummary:
			"Most survival evidence is observational because long-term randomized smoking assignment is unethical. Residual confounding and variation across cancers affect magnitude, but the direction is consistent with treatment and biological evidence.",
		sources: [
			["guideline", "Harms of Cigarette Smoking and Health Benefits of Quitting", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/causes-prevention/risk/tobacco/cessation-fact-sheet", "NCI summarizes immediate and long-term health gains from cessation, including benefit after cancer diagnosis."],
			["meta_analysis", "Upgrading your best chances: postdiagnosis smoking cessation boosts life expectancy of patients with cancer - a systematic review and meta-analysis", "Tobacco Control", 2025, "10.1136/tc-2024-058873", "Survival synthesis across cancer cohorts finds lower mortality among patients who stop smoking, while noting heterogeneity and publication bias."],
			["meta_analysis", "The effectiveness of smoking cessation interventions after cancer diagnosis: A systematic review and meta-analysis", "Journal of Cancer Policy", 2024, "10.1016/j.jcpo.2023.100463", "Intervention synthesis assesses how cessation support performs after diagnosis and where oncology delivery can improve."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Should average-risk adults without symptoms be screened for pancreatic cancer?",
		slug: "should-average-risk-adults-without-symptoms-be-screened-for-pancreatic-cancer",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. For adults without symptoms who are not known to be at high inherited or familial risk, routine pancreatic-cancer screening has not shown a mortality benefit and can cause false positives, invasive follow-up, and unnecessary surgery. High-risk surveillance is a separate specialist decision and is not evidence for population screening.",
		stableCore: [
			"Pancreatic cancer is uncommon in the general population and current tests do not separate early dangerous disease from benign findings well enough for mass screening.",
			"No direct evidence shows routine screening reduces pancreatic-cancer mortality in average-risk adults.",
			"People with certain pathogenic variants or strong family histories may qualify for surveillance in experienced centers."
		],
		openQuestions: [
			"Can validated blood, imaging, or multi-cancer tests find curable disease with an acceptable false-positive burden?",
			"Which high-risk groups, intervals, and combinations of MRI and endoscopic ultrasound produce a net benefit?"
		],
		whatWouldChangeMinds: [
			"Randomized or compelling prospective evidence showing lower pancreatic-cancer mortality with acceptable harms in average-risk adults.",
			"A test with validated early-stage performance and a demonstrated pathway from detection to improved survival."
		],
		misconceptions: [
			"A test finding more early lesions does not automatically show that screening saves lives.",
			"Evidence for surveillance in genetically high-risk families does not apply to everyone.",
			"A normal screening result cannot rule out all future pancreatic cancer."
		],
		editorSummary:
			"This is a population-boundary question. The recommendation against routine average-risk screening coexists with targeted surveillance for selected high-risk people and active research on better early-detection tests.",
		uncertaintySummary:
			"The absence of demonstrated average-risk benefit and known downstream harms make the current recommendation stable. Future biomarkers could change the balance only if outcome trials show more than earlier detection.",
		sources: [
			["guideline", "Recommendation: Pancreatic Cancer: Screening", "U.S. Preventive Services Task Force", 2019, "https://www.uspreventiveservicestaskforce.org/uspstf/document/RecommendationStatementFinal/pancreatic-cancer-screening", "USPSTF recommends against screening asymptomatic adults not known to be at high risk and separates this population from inherited-risk surveillance."],
			["systematic_review", "Screening for Pancreatic Cancer: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force", "JAMA", 2019, "10.1001/jama.2019.6190", "Evidence review found no direct mortality evidence for average-risk screening and documented false positives and treatment harms."],
			["guideline", "Screening for Pancreatic Cancer: US Preventive Services Task Force Reaffirmation Recommendation Statement", "JAMA", 2019, "10.1001/jama.2019.10232", "Recommendation statement weighs low disease prevalence, uncertain test accuracy, absent outcome benefit, and potentially substantial treatment harms."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Should average-risk women without symptoms be screened for ovarian cancer?",
		slug: "should-average-risk-women-without-symptoms-be-screened-for-ovarian-cancer",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. In asymptomatic women without a known high-risk hereditary syndrome, screening with CA-125 blood testing, transvaginal ultrasound, or both has not reduced ovarian-cancer mortality. False positives can lead to repeat testing and surgery with real complications. Symptoms and inherited-risk evaluation require different clinical pathways.",
		stableCore: [
			"Large randomized trials did not show an ovarian-cancer mortality reduction from population screening.",
			"Because benign conditions can raise CA-125 or alter ultrasound, abnormal results are not equivalent to cancer.",
			"Women with pathogenic variants or strong family histories need individualized genetic counseling and risk management, not average-risk screening advice."
		],
		openQuestions: [
			"Can future multi-marker or longitudinal tests detect lethal disease early enough to lower mortality without excessive surgery?",
			"Which prevention and surveillance strategies best serve people with inherited high risk?"
		],
		whatWouldChangeMinds: [
			"A well-conducted trial showing lower ovarian-cancer mortality and acceptable harms in an average-risk population.",
			"Validated tests that distinguish aggressive early disease from benign abnormalities and indolent findings."
		],
		misconceptions: [
			"Finding more cancers or shifting stage at diagnosis is not by itself proof of fewer deaths.",
			"CA-125 is not a stand-alone population screening test.",
			"A recommendation against routine screening is not advice to ignore persistent concerning symptoms."
		],
		editorSummary:
			"Ovarian screening illustrates why earlier-looking detection can fail to improve the outcome that matters. The current evidence supports symptom evaluation and inherited-risk care, not routine testing of asymptomatic average-risk women.",
		uncertaintySummary:
			"Mortality evidence from large trials is high-confidence for current strategies. It does not rule out future tests with different biology, accuracy, treatment pathways, or demonstrated mortality benefit.",
		sources: [
			["guideline", "Recommendation: Ovarian Cancer: Screening", "U.S. Preventive Services Task Force", 2018, "https://www.uspreventiveservicestaskforce.org/uspstf/document/RecommendationStatementFinal/ovarian-cancer-screening", "USPSTF recommends against screening asymptomatic average-risk women because trials show no mortality benefit and important false-positive surgical harms."],
			["systematic_review", "Screening for Ovarian Cancer: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force", "JAMA", 2018, "10.1001/jama.2017.21421", "Systematic review synthesizes randomized screening outcomes and quantifies downstream testing and surgery."],
			["landmark_study", "Ovarian cancer population screening and mortality after long-term follow-up in the UK Collaborative Trial of Ovarian Cancer Screening (UKCTOCS): a randomised controlled trial", "The Lancet", 2021, "10.1016/S0140-6736(21)00731-5", "Long-term randomized follow-up found no significant mortality reduction despite stage changes in one screening strategy."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Do inherited pathogenic variants account for most cancers?",
		slug: "do-inherited-pathogenic-variants-account-for-most-cancers",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Inherited pathogenic variants cause an important minority of cancers, often estimated at about 5% to 10% overall. Most cancers arise from genetic changes acquired during life interacting with age, environment, exposures, chance, and other biology. Hereditary cancers still matter greatly because a result can guide treatment, screening, prevention, and relatives' care.",
		stableCore: [
			"All cancers involve genetic change, but genetic does not mean inherited.",
			"A germline variant is present from conception and can be passed through a family; somatic variants arise in particular cells during life.",
			"The hereditary fraction varies substantially by cancer type, age at diagnosis, ancestry, family history, and which genes are tested."
		],
		openQuestions: [
			"Which patients benefit enough from universal germline testing to justify cost, uncertain variants, and follow-up needs?",
			"How can health systems provide equitable counseling, confirmatory testing, and cascade testing for relatives?"
		],
		whatWouldChangeMinds: [
			"Representative population sequencing showing that high-penetrance inherited variants explain a majority of incident cancers.",
			"Revised pathogenicity evidence or new genes that materially changes the attributable fraction across populations."
		],
		misconceptions: [
			"Cancer being a genetic disease does not mean most cancer is inherited.",
			"No family history does not rule out a hereditary variant, and a family history does not prove one.",
			"A variant of uncertain significance is not a positive hereditary-cancer diagnosis."
		],
		editorSummary:
			"The word genetic causes the confusion. Most tumors accumulate noninherited changes, while a smaller but clinically consequential group begins with inherited susceptibility. Testing decisions depend on cancer type and personal and family context.",
		uncertaintySummary:
			"The broad minority estimate is stable, but prevalence depends on cohort selection, gene panels, ancestry representation, variant classification, tumor type, and whether lower-penetrance variants are counted.",
		sources: [
			["guideline", "Genetic Testing for Inherited Cancer Risk", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/causes-prevention/genetics/genetic-testing-fact-sheet", "NCI explains germline testing, who may benefit, result categories, counseling, family implications, and the distinction between inherited and tumor testing."],
			["guideline", "The Genetics of Cancer", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/causes-prevention/genetics", "NCI estimates that inherited harmful changes account for up to about 10% of cancers and explains that most changes arise during life."],
			["landmark_study", "Pathogenic germline variants in 10,389 adult cancers", "Cell", 2018, "10.1016/j.cell.2018.03.039", "Large pan-cancer analysis shows clinically important germline findings across cancers without supporting the claim that inherited variants explain most cases."]
		]
	}),
	reviewedClaim({
		topicSlug: "cancer-prevention-and-care",
		title: "Is cancer contagious through ordinary contact?",
		slug: "is-cancer-contagious-through-ordinary-contact",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. A person's cancer is not transmitted by touching, sharing food, breathing the same air, sex, or routine caregiving. Some infections can raise later cancer risk, and extraordinarily rare transmission has occurred through transplanted organs or between mother and fetus, but those facts do not make cancer itself ordinarily contagious.",
		stableCore: [
			"Human immune systems normally recognize and reject cells from another person.",
			"Cancer-associated viruses or bacteria can sometimes spread, but infection transmission is not transmission of an existing person's tumor.",
			"Ordinary social contact and caregiving do not require isolation from someone with cancer."
		],
		openQuestions: [
			"How can transplant screening and surveillance further reduce the already rare risk of donor-derived cancer?",
			"What can naturally transmissible cancers in a few animal species teach about immune escape and tumor evolution?"
		],
		whatWouldChangeMinds: [
			"Verified clusters showing person-to-person transfer of malignant cells through ordinary contact with genomic confirmation.",
			"Evidence that normal human immune barriers commonly fail in the absence of transplantation or severe special circumstances."
		],
		misconceptions: [
			"Catching HPV or hepatitis is not the same as catching another person's cancer.",
			"Cancer appearing in family members can reflect shared genes, age, environment, or common exposure rather than contagion.",
			"Rare transplant transmission does not justify avoiding people receiving cancer care."
		],
		editorSummary:
			"The compassionate practical conclusion is simple: people with cancer are not a danger to family, friends, coworkers, or caregivers. Infection prevention and transplant medicine involve separate mechanisms and boundaries.",
		uncertaintySummary:
			"The ordinary-contact conclusion is exceptionally secure. Scientific interest remains in rare iatrogenic or maternal-fetal transfer and naturally contagious tumors in a few nonhuman species.",
		sources: [
			["guideline", "Common Cancer Myths and Misconceptions", "National Cancer Institute", 2024, "https://www.cancer.gov/about-cancer/causes-prevention/risk/myths", "NCI states that cancer is not contagious and distinguishes ordinary contact from infection-related cancer risk and rare transplant transmission."],
			["systematic_review", "A Sixth Modality of Infectious Disease: Contagious Cancer from Devils to Clams and Beyond", "PLOS Pathogens", 2016, "10.1371/journal.ppat.1005904", "Comparative review describes rare naturally transmissible cancers in animals and the unusual biological conditions that permit them."],
			["systematic_review", "Contagious Cancer", "The Oncologist", 2011, "10.1634/theoncologist.2010-0301", "Clinical review distinguishes ordinary noncontagious human cancer from rare transmission involving transplantation, pregnancy, laboratory accidents, or severe immune circumstances."]
		]
	})
];
