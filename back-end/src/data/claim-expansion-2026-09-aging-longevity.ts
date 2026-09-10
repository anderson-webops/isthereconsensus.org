import type { SeedClaim } from "./claims.js";
import { september2026HealthspanClaim as reviewedClaim } from "./claim-expansion-2026-09-healthspan-shared.js";

export const september2026AgingLongevityClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Does resistance training improve strength and physical function in older adults with sarcopenia?",
		slug: "does-resistance-training-improve-strength-and-physical-function-in-older-adults-with-sarcopenia",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Progressive resistance training improves muscle strength and physical function in older adults with sarcopenia and can modestly increase muscle mass. Programs should be scaled to health, mobility, pain, fall risk, and prior training, with progression and adherence mattering more than a single ideal routine.",
		stableCore: [
			"Strength and functional outcomes improve more consistently than muscle-mass measurements.",
			"Older age does not eliminate the ability of muscle and the nervous system to adapt to training.",
			"Supervision, gradual progression, and appropriate modification can make resistance exercise feasible across a wide range of starting abilities."
		],
		openQuestions: [
			"Which frequency, intensity, volume, and power-training combinations best preserve independence for different frailty levels?",
			"How can health systems sustain participation after supervised research programs end?"
		],
		whatWouldChangeMinds: [
			"Large randomized syntheses finding no meaningful strength or functional benefit beyond attention-matched control.",
			"Evidence that adverse events consistently exceed mobility and independence benefits under appropriately adapted programs."
		],
		misconceptions: [
			"Resistance exercise is not only for young athletes or bodybuilding.",
			"Gaining little measurable muscle mass does not mean strength or function failed to improve.",
			"A diagnosis of sarcopenia does not justify beginning with an unsafe load or copying an advanced program."
		],
		editorSummary:
			"Resistance training is one of the clearest actionable findings in healthy aging. The meaningful outcomes are standing, walking, carrying, balance, and independence, not only a scan-derived change in lean mass.",
		uncertaintySummary:
			"Strength and function benefits are high-confidence. The optimal prescription, long-term adherence, and effect size in medically complex or very frail adults are less certain.",
		sources: [
			["meta_analysis", "Exercise for sarcopenia in older people: A systematic review and network meta-analysis", "Journal of Cachexia, Sarcopenia and Muscle", 2023, "10.1002/jcsm.13225", "Network synthesis compares exercise modes and supports resistance-based programs for strength and functional outcomes."],
			["meta_analysis", "Optimal resistance training prescriptions to improve muscle strength, physical function, and muscle mass in older adults diagnosed with sarcopenia: a systematic review and meta-analysis", "Aging Clinical and Experimental Research", 2025, "10.1007/s40520-025-03235-w", "Updated synthesis evaluates prescription features and distinguishes strength, function, and muscle-mass outcomes."],
			["meta_analysis", "Effects of resistance training on muscle mass, strength, and physical function in older women with sarcopenia: a systematic review and meta-analysis", "Frontiers in Public Health", 2026, "10.3389/fpubh.2025.1735899", "Sex-specific review finds benefits while documenting heterogeneity in program design and outcome measurement."]
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Can multicomponent exercise reduce frailty and falls in older adults?",
		slug: "can-multicomponent-exercise-reduce-frailty-and-falls-in-older-adults",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Programs combining balance and functional exercise with resistance work, and sometimes aerobic training, reduce falls and improve frailty-related physical function in many older adults. Benefits depend on sufficient challenge, regular participation, medication and vision review where relevant, and matching the program to the person's risks and environment.",
		stableCore: [
			"Exercise programs emphasizing balance and functional training reduce fall rates among community-dwelling older adults.",
			"Multicomponent exercise can improve frailty scores, gait, balance, and performance even when no single program reverses every aspect of frailty.",
			"Exercise is one part of fall prevention; hazards, vision, footwear, medications, blood pressure, and acute illness may also need attention."
		],
		openQuestions: [
			"Which delivery formats produce durable adherence for people with cognitive impairment, rural access barriers, or very high frailty?",
			"How much supervised intensity is needed before safe home maintenance becomes effective?"
		],
		whatWouldChangeMinds: [
			"Large randomized evidence finding no reduction in falls or functional decline with well-adhered multicomponent programs.",
			"Evidence that serious training injuries outweigh prevented falls in appropriately screened participants."
		],
		misconceptions: [
			"Simply advising an older person to be careful is not an evidence-based exercise program.",
			"Walking alone may not supply the balance challenge and progressive strength work used in effective fall-prevention trials.",
			"A prior fall does not mean exercise should be avoided; it often means assessment and supervision matter more."
		],
		editorSummary:
			"Frailty and falls are not inevitable one-way consequences of aging. Structured, challenging, adapted movement changes risk, although the program must be sustained and integrated with other modifiable hazards.",
		uncertaintySummary:
			"Fall-rate and functional benefits are high-confidence. Fracture and mortality outcomes are rarer, and results vary with baseline frailty, adherence, and delivery format.",
		sources: [
			["meta_analysis", "Effects of multicomponent exercise on frailty status and physical function in frail older adults: A meta-analysis and systematic review", "Experimental Gerontology", 2024, "10.1016/j.exger.2024.112604", "Synthesis finds improvements in frailty and physical function across multicomponent programs."],
			["meta_analysis", "Association of Long-term Exercise Training With Risk of Falls, Fractures, Hospitalizations, and Mortality in Older Adults", "JAMA Internal Medicine", 2019, "10.1001/jamainternmed.2018.5406", "Long-duration randomized evidence supports fewer falls and injurious falls while rarer outcomes remain less certain."],
			["meta_analysis", "Adherence and effectiveness of multicomponent exercise fall prevention programmes across delivery formats in community-dwelling older adults: a systematic review and multilevel meta-analysis", "Archives of Gerontology and Geriatrics", 2026, "10.1016/j.archger.2026.106304", "Review links effectiveness to delivery format and adherence across community programs."]
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Does added protein enhance resistance exercise for some older adults?",
		slug: "does-added-protein-enhance-resistance-exercise-for-some-older-adults",
		consensusBand: "broad",
		confidenceScore: 82,
		evidenceCertainty: "moderate",
		bottomLine:
			"Sometimes. Adequate protein supports muscle maintenance, and supplementation can add modest gains in lean mass or strength when older adults perform resistance exercise, especially when baseline intake is low or sarcopenia is present. More is not always better, food can supply protein, and kidney disease, appetite, total energy intake, and exercise quality change the decision.",
		stableCore: [
			"Resistance exercise is the primary stimulus; protein is not a substitute for training.",
			"Average added effects are modest and more variable for walking speed and broader physical function than for lean mass or strength.",
			"Total daily intake and distribution across meals may matter more than branding, timing claims, or a single supplement type."
		],
		openQuestions: [
			"Which older adults benefit most, and what dose and meal pattern best balance muscle, appetite, and overall diet quality?",
			"Do supplementation-driven changes persist and translate into fewer falls, disability, or care needs?"
		],
		whatWouldChangeMinds: [
			"Large trials showing no incremental muscle or strength benefit among older adults with low intake who adhere to resistance training.",
			"Long-term evidence showing that commonly recommended supplementation causes more net harm than benefit in appropriately screened groups."
		],
		misconceptions: [
			"A protein shake does not reproduce the effects of progressive resistance exercise.",
			"A statistically significant lean-mass change may be too small to improve independence.",
			"General protein targets should not be applied without clinical advice to everyone with significant kidney disease."
		],
		editorSummary:
			"Protein can strengthen a good training and nutrition plan, but the effect is conditional and usually modest. The page should steer readers toward adequate intake and functioning rather than supplement maximalism.",
		uncertaintySummary:
			"Moderate certainty reflects small average benefits, different baseline diets, supplement doses, training programs, diagnostic criteria, and inconsistent functional outcomes.",
		sources: [
			["meta_analysis", "The effectiveness of protein supplementation combined with resistance exercise programs among community-dwelling older adults with sarcopenia: a systematic review and meta-analysis", "Epidemiology and Health", 2024, "10.4178/epih.e2024030", "Sarcopenia-focused synthesis reports added effects on muscle and selected performance outcomes."],
			["meta_analysis", "Protein interventions augment the effect of resistance exercise on appendicular lean mass and handgrip strength in older adults: a systematic review and meta-analysis of randomized controlled trials", "The American Journal of Clinical Nutrition", 2022, "10.1093/ajcn/nqab355", "Randomized-trial synthesis finds modest augmentation of lean mass and handgrip strength."],
			["meta_analysis", "Protein supplementation alone or combined with exercise for sarcopenia and physical frailty: A systematic review and meta-analysis of randomized controlled trials", "Archives of Gerontology and Geriatrics", 2025, "10.1016/j.archger.2025.105783", "Updated review separates protein-only from combined interventions and finds heterogeneous outcome effects."]
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Are social isolation and loneliness linked to higher mortality in older adults?",
		slug: "are-social-isolation-and-loneliness-linked-to-higher-mortality-in-older-adults",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Across many cohorts, social isolation and loneliness are associated with higher all-cause and cardiovascular mortality. The association is robust enough to treat social connection as a health concern, but most evidence is observational, isolation and loneliness are different, and current intervention trials do not prove that any generic social program extends life.",
		stableCore: [
			"Objective isolation and subjective loneliness each predict worse health outcomes, though they overlap only partly.",
			"Adjustment for illness, income, mobility, depression, and health behavior reduces but does not erase many associations.",
			"Interventions should match the cause, such as bereavement, hearing loss, inaccessible transport, caregiving, discrimination, or lack of meaningful relationships."
		],
		openQuestions: [
			"How much of the mortality association is causal, bidirectional, or driven by unmeasured disease and disadvantage?",
			"Which targeted interventions produce durable improvements in connection, health, and survival rather than only short-term loneliness scores?"
		],
		whatWouldChangeMinds: [
			"Large cohorts with repeated measurement and strong causal designs consistently eliminating the association.",
			"Randomized interventions showing that meaningful reductions in isolation do not improve any patient-important health outcome."
		],
		misconceptions: [
			"Living alone, having few contacts, and feeling lonely are related but not identical states.",
			"An observational mortality association does not prove that loneliness directly causes every excess death.",
			"More social contact is not automatically beneficial when relationships are unsafe, unwanted, or low quality."
		],
		editorSummary:
			"Social connection belongs in health assessment, but the evidence should not be oversold as a precise causal mortality treatment. The practical goal is meaningful, chosen connection and removal of the barriers producing isolation.",
		uncertaintySummary:
			"The association is consistent and large-scale, but causal magnitude and the ability of specific interventions to reduce medical events or mortality remain uncertain.",
		sources: [
			["meta_analysis", "A systematic review and meta-analysis of 90 cohort studies of social isolation, loneliness and mortality", "Nature Human Behaviour", 2023, "10.1038/s41562-023-01617-6", "Large cohort synthesis finds both isolation and loneliness associated with all-cause and cancer mortality, with isolation also associated with cardiovascular mortality."],
			["meta_analysis", "Loneliness, social isolation, and living alone: a comprehensive systematic review, meta-analysis, and meta-regression of mortality risks in older adults", "Aging Clinical and Experimental Research", 2025, "10.1007/s40520-024-02925-1", "Older-adult synthesis separates related social exposures and examines sources of heterogeneity."],
			["meta_analysis", "Facing the Next Geriatric Giant: A Systematic Literature Review and Meta-Analysis of Interventions Tackling Loneliness and Social Isolation Among Older Adults", "Journal of the American Medical Directors Association", 2024, "10.1016/j.jamda.2024.105110", "Intervention review finds smaller and more variable effects than the observational risk literature might imply."]
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Does moderate calorie restriction improve health markers while its effect on human lifespan remains unknown?",
		slug: "does-moderate-calorie-restriction-improve-health-markers-while-its-effect-on-human-lifespan-remains-unknown",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. In the two-year CALERIE trial, sustained moderate calorie restriction in non-obese adults improved several cardiometabolic and cellular-aging biomarkers. The trial did not show that participants lived longer, and restriction can reduce lean mass or bone density and be inappropriate during growth, pregnancy, frailty, eating disorders, or some illnesses.",
		stableCore: [
			"Randomized human evidence shows changes in weight, blood pressure, lipids, insulin sensitivity, inflammation, and some aging biomarkers.",
			"Biomarker improvement is not direct evidence of longer lifespan or freedom from disability.",
			"Nutritional adequacy, preservation of muscle and bone, and psychological sustainability are central to any net benefit."
		],
		openQuestions: [
			"Do biomarker changes translate into fewer diseases, less disability, or longer life over decades?",
			"Can less restrictive eating patterns reproduce benefits with better adherence and fewer lean-mass, bone, or mental-health costs?"
		],
		whatWouldChangeMinds: [
			"Long-term randomized follow-up finding no durable cardiometabolic or biological-aging differences despite adherence.",
			"Human trials demonstrating a clear survival benefit or, conversely, substantial net harm under nutritionally adequate moderate restriction."
		],
		misconceptions: [
			"A slower epigenetic-aging measure does not mean a proven extension of human lifespan.",
			"Calorie restriction is not starvation and should not be attempted without regard to nutrient, muscle, bone, or mental health.",
			"Results in worms, flies, mice, or monkeys cannot by themselves establish how long humans will live."
		],
		editorSummary:
			"CALERIE moved calorie restriction from animal extrapolation to meaningful human biomarker evidence, but not to a longevity prescription. The endpoint boundary between risk markers and years of healthy life must stay explicit.",
		uncertaintySummary:
			"Moderate certainty applies to selected intermediate outcomes over two years. Lifespan, major disease, disability, long-term adherence, and net benefit across diverse populations remain unknown.",
		sources: [
			["meta_analysis", "Is Caloric Restriction Associated with Better Healthy Aging Outcomes? A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Nutrients", 2020, "10.3390/nu12082290", "Randomized-trial synthesis finds improvements in several cardiometabolic measures while identifying insufficient evidence for multidimensional health and longevity."],
			["landmark_study", "2 years of calorie restriction and cardiometabolic risk (CALERIE): exploratory outcomes of a multicentre, phase 2, randomised controlled trial", "The Lancet Diabetes & Endocrinology", 2019, "10.1016/s2213-8587(19)30151-2", "Randomized CALERIE analysis reports broad cardiometabolic risk-factor improvements during moderate calorie restriction."],
			["landmark_study", "Effect of long-term caloric restriction on DNA methylation measures of biological aging in healthy adults from the CALERIE trial", "Nature Aging", 2023, "10.1038/s43587-022-00357-y", "CALERIE secondary analysis finds a small slowing in one pace-of-aging measure without establishing lifespan extension."],
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Is metformin proven to extend healthy lifespan in people without diabetes?",
		slug: "is-metformin-proven-to-extend-healthy-lifespan-in-people-without-diabetes",
		consensusBand: "mixed",
		confidenceScore: 64,
		evidenceCertainty: "low",
		bottomLine:
			"No. Metformin improves glucose control and outcomes for many people with type 2 diabetes, and observational comparisons plus animal work make it a plausible geroscience candidate. It has not been shown to extend lifespan or prevent multiple age-related diseases in otherwise healthy people, and it can cause gastrointestinal effects, vitamin B12 deficiency, and rare serious harm in susceptible patients.",
		stableCore: [
			"Most favorable human longevity evidence comes from people with diabetes and nonrandomized comparisons.",
			"Confounding by disease severity, body weight, prescribing, health care, and comparator treatment limits causal interpretation.",
			"A biologically plausible mechanism and an approved use for diabetes do not establish preventive benefit in healthy aging."
		],
		openQuestions: [
			"Can large randomized trials demonstrate fewer age-related diseases or disability in selected people without diabetes?",
			"Do exercise adaptations, nutritional status, kidney function, genotype, or baseline metabolic risk change the benefit-harm balance?"
		],
		whatWouldChangeMinds: [
			"Well-powered randomized trials showing fewer major age-related diseases, disability, or deaths in people without diabetes.",
			"Replicated evidence of clinically important harm or interference with beneficial adaptations in the populations proposed for preventive use."
		],
		misconceptions: [
			"People with diabetes taking metformin and outliving a comparison group does not prove that healthy people will live longer on it.",
			"An inexpensive generic drug can still have contraindications, interactions, and monitoring needs.",
			"Calling a trial an anti-aging trial does not mean its outcome has already been demonstrated."
		],
		editorSummary:
			"Metformin is a serious research candidate, not an established longevity medicine. The site should keep treatment evidence for diabetes separate from the much less certain preventive claim in healthy adults.",
		uncertaintySummary:
			"Low certainty reflects indirect populations, observational comparisons, mixed animal findings, surrogate outcomes, and the absence of completed mortality or multimorbidity trials in healthy users.",
		sources: [
			["meta_analysis", "Metformin reduces all-cause mortality and diseases of ageing independent of its effect on diabetes control: A systematic review and meta-analysis", "Ageing Research Reviews", 2017, "10.1016/j.arr.2017.08.003", "Synthesis identifies favorable associations largely in diabetes populations and motivates rather than proves preventive use in healthy aging."],
			["systematic_review", "A Critical Review of the Evidence That Metformin Is a Putative Anti-Aging Drug That Enhances Healthspan and Extends Lifespan", "Frontiers in Endocrinology", 2021, "10.3389/fendo.2021.718942", "Critical review details substantial gaps between mechanistic, animal, diabetes, and healthy-human evidence."],
			["systematic_review", "Metformin and Aging: A Review", "Gerontology", 2019, "10.1159/000502257", "Review summarizes candidate mechanisms and clinical evidence while identifying the need for prospective aging endpoints."]
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Is rapamycin proven to extend healthy human lifespan?",
		slug: "is-rapamycin-proven-to-extend-healthy-human-lifespan",
		consensusBand: "mixed",
		confidenceScore: 58,
		evidenceCertainty: "low",
		bottomLine:
			"No. Rapamycin and related mTOR inhibitors extend lifespan in several animal models and have produced intriguing immune, skin, and physiological signals in small human studies. No trial has shown that rapamycin extends healthy human lifespan, and immune suppression, mouth ulcers, metabolic effects, infections, drug interactions, dose, and long-term safety remain central uncertainties.",
		stableCore: [
			"Animal longevity findings are reproducible enough to justify human geroscience research.",
			"Human trials to date are generally small, short, and designed around biomarkers or specific functions rather than lifespan.",
			"Transplant or oncology safety data come from different doses, schedules, illnesses, and co-medications than proposed preventive use."
		],
		openQuestions: [
			"Can intermittent or lower-dose regimens improve meaningful function or disease-free survival without clinically important immune and metabolic harm?",
			"Which biomarkers, doses, and populations provide a credible path to a feasible long-duration trial?"
		],
		whatWouldChangeMinds: [
			"Large randomized trials showing improved survival, disability-free survival, or validated multi-disease outcomes with acceptable safety.",
			"Long-term trials showing no meaningful benefit or unacceptable infection, metabolic, healing, or other harms at proposed geroprotective doses."
		],
		misconceptions: [
			"Extending mouse lifespan does not establish a human anti-aging treatment.",
			"A favorable immune-response biomarker is not proof of longer life.",
			"Changing the dosing schedule does not remove the need for controlled safety and outcome evidence."
		],
		editorSummary:
			"Rapamycin has unusually strong animal evidence and unusually weak evidence for the public claim often made about it. The correct status is promising, testable, and unproven for healthy human lifespan.",
		uncertaintySummary:
			"Low certainty reflects the absence of human longevity endpoints, small heterogeneous trials, short follow-up, and unresolved translation from disease-specific use to prevention.",
		sources: [
			["systematic_review", "Targeting ageing with rapamycin and its derivatives in humans: a systematic review", "The Lancet Healthy Longevity", 2024, "10.1016/s2666-7568(23)00258-1", "Systematic review finds signals across selected physiological systems but no proof of longer healthy human life and limited long-term safety evidence."],
			["landmark_study", "A randomized control trial to establish the feasibility and safety of rapamycin treatment in an older human cohort: Immunological, physical performance, and cognitive effects", "Experimental Gerontology", 2018, "10.1016/j.exger.2017.12.026", "Small placebo-controlled trial tests short-term feasibility and selected outcomes rather than longevity."],
			["landmark_study", "mTOR inhibition improves immune function in the elderly", "Science Translational Medicine", 2014, "10.1126/scitranslmed.3009892", "Short human trial reports improved influenza-vaccine response with an mTOR inhibitor, an intermediate immune outcome rather than lifespan evidence."]
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Do NAD boosters raise NAD without proven anti-aging clinical benefits?",
		slug: "do-nad-boosters-raise-nad-without-proven-anti-aging-clinical-benefits",
		consensusBand: "mixed",
		confidenceScore: 62,
		evidenceCertainty: "low",
		bottomLine:
			"Yes. Nicotinamide riboside and nicotinamide mononucleotide can raise NAD-related metabolites in human blood or tissues, but trials have not established that they slow aging, extend life, or reliably improve strength, cognition, metabolism, or daily function in generally healthy adults. Short-term tolerability is fairly reassuring; long-term effectiveness, safety, dose, and tissue effects remain uncertain.",
		stableCore: [
			"The biochemical target-engagement claim is stronger than any clinical anti-aging claim.",
			"Small trials frequently measure different metabolites, tissues, doses, and surrogate outcomes, limiting generalization.",
			"Commercial availability and a measurable laboratory change do not establish patient-important benefit."
		],
		openQuestions: [
			"Do defined patients with low NAD, metabolic disease, muscle dysfunction, or treatment-related depletion obtain reproducible clinical benefit?",
			"What are the long-term consequences of sustained NAD-pathway manipulation across tissues and disease risks?"
		],
		whatWouldChangeMinds: [
			"Large randomized trials showing durable improvements in function, disease, disability, or survival beyond biomarker changes.",
			"Long-term surveillance identifying clinically important harms that alter the current short-term tolerability assessment."
		],
		misconceptions: [
			"Raising a molecule that declines with age is not the same as reversing aging.",
			"Animal metabolism and lifespan findings do not guarantee the same clinical result in humans.",
			"Nicotinamide riboside, nicotinamide mononucleotide, niacin, and intravenous NAD products are not interchangeable evidence bases."
		],
		editorSummary:
			"NAD boosters reliably illustrate the biomarker-to-benefit gap. The most defensible public answer separates evidence that the products change NAD biology from the missing evidence that users live healthier or longer.",
		uncertaintySummary:
			"Low certainty for anti-aging benefit reflects small samples, short follow-up, inconsistent outcomes, product heterogeneity, and almost no direct disease-free survival or lifespan evidence.",
		sources: [
			["systematic_review", "NAD+ supplementation for anti-aging and wellness: A PRISMA-guided systematic review of preclinical and clinical evidence", "Ageing Research Reviews", 2026, "10.1016/j.arr.2026.103057", "Current review distinguishes consistent biochemical target engagement from sparse and inconsistent clinical benefit."],
			["landmark_study", "Chronic nicotinamide riboside supplementation is well-tolerated and elevates NAD+ in healthy middle-aged and older adults", "Nature Communications", 2018, "10.1038/s41467-018-03421-7", "Randomized trial demonstrates increased NAD metabolites and short-term tolerability without establishing a general anti-aging outcome."],
			["meta_analysis", "The Effect of Nicotinamide Mononucleotide and Riboside on Skeletal Muscle Mass and Function: A Systematic Review and Meta-Analysis", "Journal of Cachexia, Sarcopenia and Muscle", 2025, "10.1002/jcsm.13799", "Clinical synthesis does not find a reliable broad improvement in muscle mass or function."]
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Are senolytic drugs established anti-aging treatments?",
		slug: "are-senolytic-drugs-established-anti-aging-treatments",
		consensusBand: "mixed",
		confidenceScore: 55,
		evidenceCertainty: "very_low",
		bottomLine:
			"No. Senolytics are experimental drugs intended to remove selected senescent cells, and animal research plus early human trials provide a plausible basis for further study. They have not been shown to extend human life or broadly reverse aging, different senescent cells can have useful roles, and products such as dasatinib and quercetin can cause clinically important harms and interactions.",
		stableCore: [
			"Small human studies show that senescent-cell markers can sometimes change after treatment.",
			"Marker reduction does not establish better function, fewer diseases, or longer survival.",
			"Senescence biology differs by tissue, cause, timing, and cell type, so indiscriminate removal is not automatically beneficial."
		],
		openQuestions: [
			"Which senescent-cell populations drive specific diseases, and can they be targeted without disrupting healing, cancer suppression, or normal physiology?",
			"Do intermittent regimens improve meaningful clinical outcomes with acceptable long-term safety?"
		],
		whatWouldChangeMinds: [
			"Replicated randomized trials showing durable functional or disease benefits with a well-characterized safety profile.",
			"Evidence that biomarker changes do not translate to benefit or that tissue-specific harms outweigh candidate effects."
		],
		misconceptions: [
			"Senescent cells are not simply dead cells or universally harmful waste.",
			"A small open-label biomarker study is not proof of age reversal.",
			"Quercetin being sold as a supplement does not make experimental senolytic combinations safe for self-treatment."
		],
		editorSummary:
			"Senolytics are frontier geroscience, not routine anti-aging medicine. The page should make early translational progress visible without allowing biomarker language to become a clinical promise.",
		uncertaintySummary:
			"Very low certainty for broad clinical benefit reflects tiny early trials, disease-specific populations, unvalidated surrogate markers, heterogeneous agents, and absent long-term outcomes.",
		sources: [
			["landmark_study", "Senolytics decrease senescent cells in humans: Preliminary report from a clinical trial of Dasatinib plus Quercetin in individuals with diabetic kidney disease", "EBioMedicine", 2019, "10.1016/j.ebiom.2019.08.069", "Small preliminary human study reports changes in tissue and circulating senescence markers without testing lifespan or broad clinical benefit."],
			["systematic_review", "Senolytic drugs: from discovery to translation", "Journal of Internal Medicine", 2020, "10.1111/joim.13141", "Translational review explains candidate mechanisms, cell-type complexity, animal evidence, and early clinical limitations."],
			["landmark_study", "Effects of intermittent senolytic therapy on bone metabolism in postmenopausal women: a phase 2 randomized controlled trial", "Nature Medicine", 2024, "10.1038/s41591-024-03096-2", "Phase 2 trial evaluates a specific skeletal indication and illustrates mixed, subgroup-sensitive clinical findings rather than general age reversal."]
		]
	}),
	reviewedClaim({
		topicSlug: "aging-and-longevity",
		title: "Can consumer biological-age tests reliably guide treatment or predict an individual's lifespan?",
		slug: "can-consumer-biological-age-tests-reliably-guide-treatment-or-predict-an-individuals-lifespan",
		consensusBand: "mixed",
		confidenceScore: 59,
		evidenceCertainty: "low",
		bottomLine:
			"No. Epigenetic and phenotypic aging measures can correlate with disease and mortality across groups, making them valuable research tools. A single commercial biological-age result cannot reliably predict one person's lifespan, diagnose accelerated aging, or show that a supplement or lifestyle change worked, because platforms, algorithms, tissues, measurement error, and clinical thresholds are not standardized.",
		stableCore: [
			"Several clocks add population-level risk information beyond chronological age in research cohorts.",
			"Different clocks measure different biological signals and can give different ages for the same person.",
			"Association with future outcomes is not the same as validated treatment selection or proof that changing the score changes health."
		],
		openQuestions: [
			"Which measures are analytically stable, transport across populations, and predict outcomes strongly enough to improve a real clinical decision?",
			"Does an intervention-induced clock change mediate a reduction in disease, disability, or mortality?"
		],
		whatWouldChangeMinds: [
			"Prospective clinical-utility trials showing that clock-guided care improves patient outcomes over standard risk assessment.",
			"Standardization studies establishing reproducible individual thresholds, repeatability, and interpretation across laboratories and populations."
		],
		misconceptions: [
			"A biological age is a model output, not a literal count of years remaining.",
			"A lower number on a repeat mail-order test may reflect laboratory or algorithm variation rather than rejuvenation.",
			"A biomarker can be predictive without being a valid target for treatment."
		],
		editorSummary:
			"Aging clocks are scientifically interesting and potentially useful, but the consumer interpretation has outrun clinical validation. Their current role is research and risk stratification, not an individualized longevity verdict.",
		uncertaintySummary:
			"Low certainty for consumer clinical utility reflects platform variation, limited repeatability data, cohort-dependent calibration, sparse intervention validation, and no agreed treatment thresholds.",
		sources: [
			["meta_analysis", "The epigenetic clock as a predictor of disease and mortality risk: a systematic review and meta-analysis", "Clinical Epigenetics", 2019, "10.1186/s13148-019-0656-7", "Synthesis supports population-level associations while documenting heterogeneity and limited evidence for individual clinical use."],
			["systematic_review", "A systematic review of phenotypic and epigenetic clocks used for aging and mortality quantification in humans", "Aging", 2024, "10.18632/aging.206098", "Review compares clock construction, outcomes, strengths, and limitations across a fragmented measurement landscape."],
			["landmark_study", "Effect of long-term caloric restriction on DNA methylation measures of biological aging in healthy adults from the CALERIE trial", "Nature Aging", 2023, "10.1038/s43587-022-00357-y", "Randomized intervention analysis finds a small change in one pace measure but not every clock, illustrating why score changes are not interchangeable with clinical rejuvenation."]
		]
	})
];
