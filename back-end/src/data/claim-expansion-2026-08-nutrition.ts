import type { SeedClaim } from "./claims.js";
import { august2026ReviewedClaim as reviewedClaim } from "./claim-expansion-2026-08-shared.js";

export const august2026NutritionClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does eating breakfast cause weight loss or boost metabolism?",
		slug: "does-eating-breakfast-cause-weight-loss-or-boost-metabolism",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Randomized trials do not show that adding breakfast reliably causes weight loss or meaningfully boosts total daily energy expenditure. Breakfast can be a nutritious and useful meal, but its effect on weight depends on what, how much, and when a person eats across the whole day rather than a universal metabolic advantage.",
		stableCore: [
			"People who regularly eat breakfast often differ from breakfast skippers in many health behaviors, so observational associations do not establish causation.",
			"Trials assigning adults to eat or skip breakfast have not found a consistent weight-loss benefit from eating breakfast.",
			"Adding breakfast often raises total daily energy intake when later food intake does not fall enough to compensate.",
			"Individual appetite, medication, training, diabetes management, culture, and food quality can still make breakfast helpful for a particular person."
		],
		openQuestions: [
			"Do meal timing and breakfast composition produce different long-term effects in people with diabetes, shift work, or high physical activity?",
			"Which people naturally compensate for breakfast calories later in the day, and which do not?"
		],
		whatWouldChangeMinds: [
			"Long, well-adhered randomized trials showing that adding breakfast produces clinically meaningful weight loss independent of total energy intake.",
			"Metabolic-ward evidence of a sustained rise in total daily energy expenditure large enough to explain a weight advantage."
		],
		misconceptions: [
			"Association between breakfast eating and lower weight does not prove breakfast caused the difference.",
			"Skipping breakfast does not automatically slow metabolism into a special fat-storage mode.",
			"Evidence against a universal weight-loss effect is not advice that everyone should skip breakfast."
		],
		editorSummary:
			"Breakfast is a meal, not a metabolic switch. Its nutritional value and personal usefulness can be high, but the controlled evidence does not support prescribing breakfast itself as a general weight-loss treatment.",
		uncertaintySummary:
			"Most trials are relatively short and adult-focused. Long-term effects may differ by meal composition, schedule, age, metabolic condition, and whether breakfast replaces or simply adds calories.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Effect of breakfast on weight and energy intake: systematic review and meta-analysis of randomised controlled trials",
				publisher: "BMJ",
				year: 2019,
				url: "https://consensus.app/papers/effect-of-breakfast-on-weight-and-energy-intake-sievert-hussain/5e93595224d65c2d96a528d9a396f85a/",
				doi: "10.1136/bmj.l42",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Randomized-trial synthesis finding no evidence that eating breakfast promotes weight loss and finding higher average daily energy intake in breakfast groups.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Breakfast Skipping, Body Composition, and Cardiometabolic Risk: A Systematic Review and Meta-Analysis of Randomized Trials",
				publisher: "Obesity",
				year: 2020,
				url: "https://consensus.app/papers/breakfast-skipping-body-composition-and-cardiometabolic-bonnet-cardel/81566a34821852439786ca0a2f24909f/",
				doi: "10.1002/oby.22791",
				appraisal: "high",
				stance: "context",
				note: "Trial synthesis examining body composition and metabolic outcomes, useful for separating small short-term differences from sweeping metabolism claims.",
				order: 2
			},
			{
				kind: "context",
				title: "Dietary Guidelines for Americans, 2020–2025",
				publisher: "U.S. Departments of Agriculture and Health and Human Services",
				year: 2020,
				url: "https://www.dietaryguidelines.gov/sites/default/files/2020-12/Dietary_Guidelines_for_Americans_2020-2025.pdf",
				appraisal: "high",
				stance: "context",
				note: "Dietary-pattern context emphasizing nutrient-dense foods and total intake rather than treating one named meal as an independent weight-control mechanism.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Do probiotics prevent antibiotic-associated diarrhea?",
		slug: "do-probiotics-prevent-antibiotic-associated-diarrhea",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Some probiotic strains and combinations reduce antibiotic-associated diarrhea when taken near the course of antibiotics, but the benefit is not interchangeable across all products, doses, ages, or risk groups. Most healthy people tolerate studied products, while severely ill or immunocompromised patients need particular caution.",
		stableCore: [
			"Meta-analyses generally find fewer cases of antibiotic-associated diarrhea with selected probiotics than with placebo or no probiotic.",
			"Effects are strain- and dose-specific; a label saying only 'probiotic' does not identify an evidence-backed intervention.",
			"Absolute benefit is larger when a person's baseline diarrhea risk is higher.",
			"Rare bloodstream or invasive infections have occurred in vulnerable patients, and supplement quality is not uniform."
		],
		openQuestions: [
			"Which exact strains, doses, timing, and duration work best for particular antibiotics and age groups?",
			"How should product viability, labeling accuracy, cost, and rare infection risk change recommendations in routine practice?"
		],
		whatWouldChangeMinds: [
			"Large strain-specific trials finding no clinically meaningful reduction in diarrhea across populations where current syntheses suggest benefit.",
			"Safety surveillance showing that serious adverse events outweigh the modest preventive benefit in ordinary-risk patients."
		],
		misconceptions: [
			"Evidence for one named strain or combination does not validate every fermented food or supplement.",
			"A relative risk reduction may translate into only a small absolute benefit when baseline risk is low.",
			"Probiotics do not make an unnecessary antibiotic prescription harmless."
		],
		editorSummary:
			"The evidence supports a qualified rather than universal yes. Product identity and patient risk matter enough that 'take any probiotic' is not the same recommendation tested in trials.",
		uncertaintySummary:
			"Moderate certainty supports benefit for selected preparations, but heterogeneity in strains, definitions, antibiotic regimens, populations, and product quality limits a class-wide claim.",
		sources: [
			{
				kind: "guideline",
				title: "Role of probiotics in the management of gastrointestinal disorders",
				publisher: "American Gastroenterological Association",
				year: 2020,
				url: "https://gastro.org/clinical-guidance/role-of-probiotics-in-the-management-of-gastrointestinal-disorders/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Guideline recommending only specified probiotic preparations for prevention in people receiving antibiotics and emphasizing low-certainty, formulation-specific evidence.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Probiotics for the prevention of antibiotic-associated diarrhoea: a systematic review and meta-analysis",
				publisher: "BMJ Open",
				year: 2021,
				url: "https://consensus.app/papers/probiotics-for-the-prevention-of-antibioticassociated-goodman-barringer/03c81760d4e358f6a5fdcece88be3fc7/",
				doi: "10.1136/bmjopen-2020-043054",
				appraisal: "high",
				stance: "supports",
				note: "Adult trial synthesis finding a reduced risk overall, with larger apparent benefit at higher doses and in populations with higher baseline risk.",
				order: 2
			},
			{
				kind: "context",
				title: "Probiotics: Usefulness and Safety",
				publisher: "National Center for Complementary and Integrative Health",
				year: 2026,
				url: "https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety",
				appraisal: "high",
				stance: "context",
				note: "Current safety and evidence context explaining product variation and the greater risk of harmful effects in people with severe illness or compromised immunity.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Do vitamin D supplements prevent fractures or falls in generally healthy adults?",
		slug: "do-vitamin-d-supplements-prevent-fractures-or-falls-in-generally-healthy-adults",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"For generally healthy, community-dwelling adults who are not selected for vitamin D deficiency or osteoporosis, routine vitamin D supplementation has not reduced fractures or falls in large trials and meta-analyses. This does not negate treatment for documented deficiency, osteoporosis care, or individualized advice for people with malabsorption or other specific risks.",
		stableCore: [
			"Large randomized trials in broadly healthy adults find no meaningful fracture reduction from routine vitamin D alone.",
			"Trial syntheses likewise do not show a reliable fall-prevention benefit in unselected community populations.",
			"Very high intermittent doses can increase falls in some settings and should not be assumed safer or more effective.",
			"Vitamin D remains biologically essential; the question is whether supplementation above usual care improves outcomes in people not shown to need it."
		],
		openQuestions: [
			"Which thresholds and clinical features best identify people whose low vitamin D is causally contributing to bone or muscle risk?",
			"How do calcium intake, frailty, institutional living, osteoporosis medication, and dosing pattern modify outcomes?"
		],
		whatWouldChangeMinds: [
			"Large randomized trials showing fewer fractures or falls from routine supplementation in vitamin-D-replete community adults.",
			"A reproducible biomarker-defined subgroup effect large enough to justify broad screening and treatment."
		],
		misconceptions: [
			"A vitamin being essential does not mean extra supplementation benefits everyone.",
			"This conclusion does not apply automatically to a person with diagnosed deficiency, rickets, osteomalacia, osteoporosis, or malabsorption.",
			"Higher doses are not necessarily better and can cause hypercalcemia, kidney stones, or other harms."
		],
		editorSummary:
			"The important boundary is population selection. Routine supplementation has not prevented fractures or falls in broadly healthy adults, while clinically indicated treatment remains a separate and valid use.",
		uncertaintySummary:
			"Evidence is high-certainty for unselected community adults. It is less transferable to deficient, frail, institutionalized, malabsorptive, or osteoporosis-treated populations.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Effects of vitamin D supplementation on musculoskeletal health: a systematic review, meta-analysis, and trial sequential analysis",
				publisher: "The Lancet Diabetes & Endocrinology",
				year: 2018,
				url: "https://consensus.app/papers/effects-of-vitamin-d-supplementation-on-musculoskeletal-bolland-grey/6d95e5b1e76b5981abe6637a2920fb0c/",
				doi: "10.1016/S2213-8587(18)30265-1",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Large trial synthesis finding no clinically meaningful effect on fractures, falls, or bone mineral density across commonly studied supplementation regimens.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Supplemental Vitamin D and Incident Fractures in Midlife and Older Adults",
				publisher: "New England Journal of Medicine",
				year: 2022,
				url: "https://pubmed.ncbi.nlm.nih.gov/35939577/",
				doi: "10.1056/NEJMoa2202106",
				pmid: "35939577",
				appraisal: "high",
				stance: "supports",
				note: "Large U.S. randomized trial finding that 2,000 IU of vitamin D3 daily did not reduce total, hip, or nonvertebral fractures in generally healthy adults not selected for deficiency.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Vitamin D Supplementation and Prevention of Falls and Fractures in Older Adults: A Systematic Review and Meta-analysis",
				publisher: "Journal of General Internal Medicine",
				year: 2024,
				url: "https://pubmed.ncbi.nlm.nih.gov/38997531/",
				doi: "10.1007/s11606-024-08933-1",
				pmid: "38997531",
				appraisal: "high",
				stance: "supports",
				note: "Recent synthesis supporting no routine fall or fracture benefit in community-dwelling older adults while preserving population-specific caveats.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does MSG cause headaches or serious health effects at typical dietary exposure?",
		slug: "does-msg-cause-headaches-or-serious-health-effects-at-typical-dietary-exposure",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Monosodium glutamate is considered safe at typical food-use levels, and blinded challenge studies have not established a consistent headache or multisymptom syndrome in ordinary eating conditions. Large doses consumed without food can produce short-lived symptoms in some people, and total glutamate exposure can exceed conservative regulatory intake benchmarks.",
		stableCore: [
			"MSG separates into sodium and glutamate, an amino acid also naturally present in many foods.",
			"Blinded studies using food-relevant exposure do not show a reproducible symptom pattern across the general population.",
			"High doses given without food are more likely to provoke transient headache, flushing, tingling, or related symptoms in susceptible participants.",
			"Avoidance may be reasonable for an individual with a repeatable personal response, but it is not evidence of widespread toxicity."
		],
		openQuestions: [
			"What dose and context reliably trigger symptoms in the small subset of people who report reproducible sensitivity?",
			"How well do dietary surveys capture cumulative free-glutamate exposure across additives and naturally glutamate-rich foods?"
		],
		whatWouldChangeMinds: [
			"Repeated blinded food-based challenges showing a substantial excess of symptoms at common serving doses.",
			"High-quality population evidence linking typical MSG exposure to serious chronic disease after accounting for total diet and sodium."
		],
		misconceptions: [
			"A chemical-sounding name does not distinguish MSG glutamate from the glutamate present in tomatoes or cheese.",
			"Failure to find a common syndrome does not mean no individual can experience symptoms.",
			"Safety at typical use does not mean consuming arbitrarily large concentrated doses is risk-free."
		],
		editorSummary:
			"The evidence does not support the broad reputation of MSG as a dangerous food toxin. The fair qualification is that unusually large, food-free doses can cause transient symptoms for some people and that overall sodium and additive exposure still matters.",
		uncertaintySummary:
			"Typical-use safety is well supported. Symptom studies are often small and use different doses, foods, and definitions, leaving uncertainty about a reproducibly sensitive subgroup.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Questions and Answers on Monosodium glutamate (MSG)",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url: "https://www.fda.gov/food/food-additives-petitions/questions-and-answers-monosodium-glutamate-msg",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Regulatory overview of MSG chemistry, safety status, challenge evidence, labeling, and reports of short-lived symptoms after large exposure.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Does monosodium glutamate really cause headache? A systematic review of human studies",
				publisher: "The Journal of Headache and Pain",
				year: 2016,
				url: "https://consensus.app/papers/does-monosodium-glutamate-really-cause-headache-a-obayashi-nagamura/2f28c59456105a05afbe5382a8c29891/",
				doi: "10.1186/s10194-016-0639-4",
				appraisal: "moderate",
				stance: "context",
				note: "Systematic review finding inconsistent headache results and emphasizing that positive studies often used large doses without food and had methodological limitations.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "EFSA reviews safety of glutamates added to food",
				publisher: "European Food Safety Authority",
				year: 2017,
				url: "https://www.efsa.europa.eu/en/press/news/170712",
				appraisal: "high",
				stance: "context",
				note: "European reassessment setting a group acceptable daily intake and noting that high consumers may exceed it, which supports exposure limits without establishing a common headache syndrome.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Can an alkaline diet change blood pH or treat cancer?",
		slug: "can-an-alkaline-diet-change-blood-ph-or-treat-cancer",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Food can change urine acidity, but in a healthy person the lungs, kidneys, and chemical buffers keep blood pH within a narrow range. There is no clinical evidence that an alkaline diet treats or cures cancer. A plant-rich version may still be nutritious, but any benefit comes from its foods and overall pattern—not from alkalizing a tumor or the blood.",
		stableCore: [
			"Meaningful changes in blood pH are medical abnormalities, not a routine dietary goal.",
			"The body continuously regulates acid-base balance through breathing, kidney function, and buffering systems.",
			"Diet can measurably change urine pH because urinary excretion is one way the body maintains blood pH.",
			"Laboratory observations about cancer cells and acidity do not show that eating alkaline foods treats cancer in people."
		],
		openQuestions: [
			"Which health effects of plant-rich alkaline-labeled diets are explained by fiber, food quality, weight change, sodium, or potassium rather than pH claims?",
			"Can dietary acid load affect specific kidney or bone outcomes in defined clinical populations without changing systemic blood pH?"
		],
		whatWouldChangeMinds: [
			"Controlled human trials showing that an alkaline diet alters tumor outcomes through a demonstrated systemic pH mechanism.",
			"Replicated physiological evidence that ordinary diet persistently shifts healthy human blood pH outside its regulated range."
		],
		misconceptions: [
			"A urine test strip does not measure the pH surrounding a tumor or prove that blood has been alkalized.",
			"Cancer can alter its local microenvironment; that does not mean an acidic diet caused the cancer.",
			"Eating more fruits and vegetables can be healthy without validating the diet's proposed acid-base mechanism."
		],
		editorSummary:
			"The diet packages sensible foods with an unsupported mechanism. Preserve the useful dietary pattern if it fits the person, but do not present it as a way to change blood pH or substitute for cancer treatment.",
		uncertaintySummary:
			"Acid-base physiology and the absence of cancer-treatment evidence make the central answer high-confidence. Research on dietary patterns, kidney disease, and local tumor metabolism does not currently overturn that conclusion.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Definition of alkaline diet",
				publisher: "National Cancer Institute",
				year: 2026,
				url: "https://www.cancer.gov/publications/dictionaries/cancer-terms/def/alkaline-diet",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Cancer-information anchor defining the diet and identifying the claim that it changes body acidity as a proposed rather than established treatment mechanism.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Systematic review of the association between dietary acid load, alkaline water and cancer",
				publisher: "BMJ Open",
				year: 2016,
				url: "https://consensus.app/papers/systematic-review-of-the-association-between-dietary-fenton-huang/26325d821e5458ecb7f8ea0e74c22df7/",
				doi: "10.1136/bmjopen-2015-010438",
				appraisal: "high",
				stance: "supports",
				note: "Systematic search finding a lack of evidence that dietary acid load or alkaline water prevents or treats cancer and no basis for promoting the diet for cancer control.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Diets and Supplements for Cancer",
				publisher: "National Cancer Institute",
				year: 2026,
				url: "https://www.cancer.gov/about-cancer/treatment/cam/diets-supplements",
				appraisal: "high",
				stance: "supports",
				note: "Patient guidance warning that no special diet or supplement has been proven to cure cancer and that unproven regimens can interfere with adequate nutrition or treatment.",
				order: 3
			}
		]
	})
];
