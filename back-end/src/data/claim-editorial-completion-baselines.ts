import type { CompleteSeedClaim } from "./claims.js";

interface Variant { field: string; append: boolean; value: unknown }
const variations: Variant[] = [
	{
		field: "uncertaintyDrivers",
		append: true,
		value: [
			{
				type: "generalizability",
				detail: "Most remaining uncertainty is about which subgroups, settings, or exposure levels look different from the main population-level finding."
			},
			{
				type: "imprecision",
				detail: "The direction is stable, but the exact size of the effect or risk can still move across syntheses and real-world settings."
			},
			{
				type: "implementation",
				detail: "Policy, communication, or rollout choices can change practical outcomes even when the underlying evidence direction is settled."
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Does influenza vaccination during pregnancy protect infants too young to be vaccinated?",
				population: "Pregnant people receiving seasonal inactivated or recombinant influenza vaccine and their infants younger than 6 months.",
				finding: "Maternal vaccination reduces laboratory-confirmed influenza in infants, with evidence also supporting lower infant flu-associated hospitalizations in several syntheses and recent test-negative studies.",
				effectDirection: "supports",
				magnitude: "A 2018 systematic review and meta-analysis estimated 48% lower infant laboratory-confirmed influenza risk and 72% lower influenza-associated hospitalization risk; a 2023 JAMA Pediatrics test-negative study estimated 39% effectiveness against infant influenza-associated hospitalization.",
				certainty: "moderate",
				limitations: [
					"Protection varies by season, vaccine match, trimester, and infant age.",
					"Influenza-like illness is less specific than laboratory-confirmed influenza.",
					"Safety evidence is reassuring but mostly observational and sensitive to confounding and season-timing bias."
				]
			}
		]
	},
	{
		field: "uncertaintyDrivers",
		append: true,
		value: [
			{
				type: "imprecision",
				detail: "The main direction looks durable, but effect size, baseline risk, or subgroup differences are still moving enough to matter."
			},
			{
				type: "generalizability",
				detail: "Results may not travel equally well across populations, settings, or implementation contexts."
			},
			{
				type: "timing",
				detail: "Longer follow-up or a newer synthesis could tighten or narrow the current public-facing answer."
			}
		]
	},
	{
		field: "uncertaintySummary",
		append: false,
		value: "The core direction of this claim is stable across the highest-weight sources. Most remaining uncertainty is about subgroup boundaries, effect size, or how the answer travels across settings, not whether the core conclusion reverses."
	},
	{
		field: "misconceptionTags",
		append: false,
		value: []
	},
	{
		field: "appraisalTools",
		append: true,
		value: [
			"GRADE-style certainty check for the body of evidence",
			"Risk-of-bias review for key study designs",
			"Shared-baseline check when institutions disagree"
		]
	},
	{
		field: "uncertaintySummary",
		append: false,
		value: "The overall direction looks reliable, but important details could still move. Editors should treat the main conclusion as durable while keeping effect size, subgroup risk, and implementation limits visible."
	},
	{
		field: "uncertaintyDrivers",
		append: true,
		value: [
			{
				type: "imprecision",
				detail: "The main direction looks durable, but effect size, baseline risk, or subgroup differences are still moving enough to matter."
			},
			{
				type: "generalizability",
				detail: "Results may not travel equally well across populations, settings, or implementation contexts."
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Does communicating uncertainty destroy public trust in science?",
				population: "Adults exposed to scientific, statistical, public-health, climate, vaccine, nuclear-power, or general science messages in experiments and reviews",
				finding: "Uncertainty communication usually does not produce a large overall loss of trust, but effects depend on uncertainty type, wording, topic, prior beliefs, and whether uncertainty is quantified or framed as conflict.",
				effectDirection: "supports",
				magnitude: "Dries 2026 synthesized 28 studies and found no overall trust effect, with 23 null studies. Guo 2025 synthesized 43 empirical articles and found epistemic uncertainty had a small positive credibility effect (d = 0.09), while consensus uncertainty (d = -0.12) and technical uncertainty (d = -0.15) slightly lowered attitudes without reducing credibility.",
				certainty: "moderate",
				limitations: [
					"Many studies measure immediate trust, not long-term behavior or institutional trust.",
					"Control conditions and uncertainty manipulations vary across studies.",
					"Highly politicized topics and personally threatening risks may require more careful follow-up communication."
				]
			}
		]
	},
	{
		field: "searchDatabases",
		append: false,
		value: [
			"OpenAlex",
			"Crossref",
			"Major institutional reports"
		]
	},
	{
		field: "inclusionRules",
		append: true,
		value: [
			"Prioritize systematic reviews, meta-analyses, major guidelines, and consensus assessments.",
			"Use landmark primary studies only when they materially changed the field or clarify a live disagreement.",
			"Anchor the public bottom line in sources that describe methods, scope, and major limitations."
		]
	},
	{
		field: "exclusionRules",
		append: true,
		value: [
			"Do not let isolated preprints, commentary, or anecdotal reports carry the public bottom line.",
			"Treat mechanistic or animal-only evidence as supporting context unless the page is specifically about mechanism.",
			"Exclude weak or redundant sources when a stronger synthesis already covers the same point."
		]
	},
	{
		field: "institutionalAnchors",
		append: false,
		value: [
			{
				name: "National Academies",
				role: "General evidence-synthesis anchor"
			},
			{
				name: "Major institutional reviews",
				role: "Field-specific consensus anchor"
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Do early or small studies often overestimate effects?",
				population: "Randomized trials, meta-analyses, and evidence syntheses comparing small or early studies with larger or later evidence",
				finding: "Small and early studies are often useful signals, but their effect estimates are less stable and frequently larger than estimates from larger or later evidence.",
				effectDirection: "supports",
				magnitude: "Dechartres 2013 found effects 32% larger in the smallest trial quarter and 48% larger in trials with fewer than 50 patients compared with trials with at least 1000 patients. Schwab 2021 found small-study effects in 19% of large meta-analyses. Alahdab 2018 found early exaggerated effects in 37% of chronic-condition meta-analyses.",
				certainty: "moderate",
				limitations: [
					"Small-study effects can arise from multiple mechanisms, not only publication bias.",
					"Field, outcome type, trial quality, and intervention stage change the size and direction of the problem.",
					"Some early evidence remains directionally useful, especially when waiting for large studies has serious costs."
				]
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Does sharing data and code guarantee reproducible results?",
				population: "Published studies and replication packages in psychology, language research, biomedical literature, and public data repositories",
				finding: "Open data and code are associated with better transparency and higher chances of successful reruns, but audits repeatedly find incomplete, non-executable, or only partly reproducible shared materials.",
				effectDirection: "supports",
				magnitude: "Examples include 21 of 36 shared data-and-code Registered Reports with reproduced main results, 34% to 56% reproducibility under an open data policy, one exact reproduction among 14 open-data-badged papers, and 74% initial failure among more than 9,000 R files in Harvard Dataverse replication datasets.",
				certainty: "moderate",
				limitations: [
					"Audit samples are field-specific and use different definitions of reproducibility.",
					"Successful reruns may require author help, package updates, or researcher judgment about acceptable deviations.",
					"Computational reproducibility does not prove that the underlying scientific claim replicates with new data."
				]
			}
		]
	},
	{
		field: "uncertaintyDrivers",
		append: true,
		value: [
			{
				type: "indirectness",
				detail: "Some of the evidence comes from adjacent populations, proxy outcomes, or partial versions of the public claim rather than a direct test of it."
			},
			{
				type: "bias",
				detail: "Study-design limitations, confounding, or uneven measurement still make the body of evidence vulnerable to revision."
			},
			{
				type: "timing",
				detail: "Longer follow-up and stronger syntheses could still shift both the size and the interpretation of the current signal."
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Do approved GLP-1-based obesity medications produce clinically meaningful weight loss in medically eligible adults?",
				population: "Adults with obesity, or adults with overweight plus weight-related complications, using approved medicines with lifestyle support and clinical monitoring.",
				finding: "Randomized trials and comparative reviews consistently show large average weight reductions for semaglutide and tirzepatide relative to placebo, with tirzepatide generally producing larger average reductions than semaglutide in direct and indirect comparisons.",
				effectDirection: "supports",
				magnitude: "STEP 1 reported -14.9% body-weight change with semaglutide 2.4 mg versus -2.4% with placebo at 68 weeks. SURMOUNT-1 reported -15.0% to -20.9% with tirzepatide versus -3.1% with placebo at 72 weeks. SURMOUNT-5 reported -20.2% with tirzepatide versus -13.7% with semaglutide at 72 weeks.",
				certainty: "moderate",
				limitations: [
					"Gastrointestinal adverse effects are common and can lead to discontinuation.",
					"Trial efficacy does not guarantee access, affordability, adherence, or response for every patient.",
					"Long-term maintenance often requires continued treatment, and post-withdrawal regain is common."
				]
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Can COVID-19 cause long-term symptoms after the acute infection?",
				population: "People with confirmed or probable SARS-CoV-2 infection, including non-hospitalized adults and mixed general-population cohorts.",
				finding: "SARS-CoV-2 infection is associated with excess risk of multiple persistent symptoms and functional effects compared with uninfected controls, while exact prevalence depends strongly on definitions and context.",
				effectDirection: "supports",
				magnitude: "A 2025 controlled-study meta-analysis covering 50 studies and more than 14 million people found increased risk for 39 of 40 long-term symptoms after infection; a 2022 Nature Medicine matched cohort found 62 symptoms associated with confirmed infection beyond 12 weeks in non-hospitalized adults.",
				certainty: "moderate",
				limitations: [
					"Risk estimates change with variant era, vaccination, reinfection, acute severity, and study design.",
					"Some symptoms are common in uninfected populations, making control groups and baseline health important.",
					"Mechanism and treatment evidence is less settled than the existence and functional-impact claim."
				]
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Does iodized salt prevent iodine deficiency disorders?",
				population: "Populations with inadequate iodine intake or iodine-deficiency risk, including children, pregnant people, and communities covered by salt-iodization programs.",
				finding: "Iodized salt improves iodine status and reduces classic iodine-deficiency outcomes, while safe implementation requires iodine-status monitoring and coordination with sodium-reduction programs.",
				effectDirection: "supports",
				magnitude: "A WHO systematic review with meta-analyses reported lower goiter risk across nonrandomized, cohort, and repeated cross-sectional evidence, lower cretinism and low cognitive-function outcomes in cross-sectional or quasi-experimental evidence, and higher urinary iodine after iodized-salt exposure.",
				certainty: "moderate",
				limitations: [
					"Evidence quality varied by outcome and study design, from very low to moderate.",
					"Most direct evidence comes from settings where iodine deficiency was common or program coverage changed substantially.",
					"Population benefit depends on monitoring so intake is neither too low nor too high."
				]
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Does intermittent fasting outperform continuous calorie restriction for weight loss?",
				population: "Adults with overweight, obesity, metabolic abnormalities, or elevated type 2 diabetes risk in randomized trials",
				finding: "Most syntheses find intermittent fasting produces weight loss compared with no structured restriction, but does not reliably beat continuous calorie restriction when energy restriction is similar.",
				effectDirection: "mixed",
				magnitude: "Recent network meta-analyses report broadly similar effects; BMJ 2025 found alternate-day fasting about 1.29 kg lower than continuous energy restriction, while NEJM 2022 and Annals 2023 head-to-head trials found no significant advantage for time-restricted eating over calorie restriction.",
				certainty: "moderate",
				limitations: [
					"Different fasting schedules are often pooled despite different behavioral and metabolic demands.",
					"Blinding is impossible and adherence is a central part of the intervention.",
					"Long-term maintenance, medication safety, and individual matching remain less certain than short-term weight change."
				]
			}
		]
	},
	{
		field: "misconceptionTags",
		append: false,
		value: [
			"correlation-isnt-causation",
			"anecdotes-are-not-population-evidence"
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Do graduated driver licensing laws reduce teen driver crashes and deaths?",
				population: "Young novice drivers, especially 16- and 17-year-old drivers covered by learner-permit and intermediate-license restrictions.",
				finding: "Official guidance and review literature support graduated driver licensing as a crash- and fatality-reduction policy, with the clearest benefits for 16-year-old drivers and for stronger programs with nighttime and passenger restrictions.",
				effectDirection: "supports",
				magnitude: "The 2011 Cochrane review reported a median 15.5% decrease in adjusted overall crash rates and a median 21% decrease in adjusted injury crash rates for 16-year-olds during the first post-GDL year; a 2012 meta-analysis estimated pooled adjusted crash-rate ratios of 0.78 for age 16, 0.94 for age 17, and 1.00 for age 18.",
				certainty: "moderate",
				limitations: [
					"Evidence is largely observational or quasi-experimental because licensing laws are implemented at the state or jurisdiction level.",
					"Program effects vary by age, minimum licensing ages, permit duration, night restrictions, passenger restrictions, enforcement, and how exposure is measured.",
					"Some studies raise possible age-displacement concerns, especially if risk shifts from 16-year-olds to older newly licensed drivers."
				]
			}
		]
	},
	{
		field: "evidenceSummaries",
		append: false,
		value: [
			{
				question: "Does homeopathy produce reliable clinical benefits beyond placebo?",
				population: "People using homeopathic products for specific health conditions across randomized trials, systematic reviews, and public-health evaluations.",
				finding: "The reliable-evidence signal does not support homeopathy as an effective treatment beyond placebo for specific health conditions, although small or lower-quality trials can show positive results.",
				effectDirection: "mixed",
				magnitude: "Shang 2005 found placebo-compatible effects after accounting for trial bias; Ernst 2010 found available Cochrane reviews did not show effects beyond placebo; Gartlehner 2022 found 38% of registered trials remained unpublished and unregistered trials had larger effects than registered trials.",
				certainty: "moderate",
				limitations: [
					"Trials span many conditions, remedies, and individualized protocols, making broad pooling imperfect.",
					"Some positive findings remain possible at the product-condition level but need stronger prospective replication.",
					"Safety and public-health risk depend on what condition is being treated and whether effective care is delayed."
				]
			}
		]
	},
	{
		field: "uncertaintyDrivers",
		append: true,
		value: [
			{
				type: "inconsistency",
				detail: "High-weight sources do not yet converge cleanly on one interpretation of the evidence."
			},
			{
				type: "imprecision",
				detail: "Effect estimates and practical risk ranges are still unstable enough that a stronger synthesis could materially change the summary."
			},
			{
				type: "indirectness",
				detail: "The evidence base still leans on partial, proxy, or otherwise indirect signals rather than a direct durable answer."
			}
		]
	},
	{
		field: "searchDatabases",
		append: false,
		value: [
			"PubMed",
			"OpenAlex",
			"Crossref"
		]
	}
];
const observedKeys: Record<string, number[]> = {
	"health-and-medicine/is-the-mmr-vaccine-safe-and-highly-effective-at-preventing-measles": [
		0
	],
	"health-and-medicine/can-measles-infection-weaken-immune-memory-after-recovery": [
		0
	],
	"health-and-medicine/does-the-hpv-vaccine-prevent-cervical-cancer": [
		0
	],
	"health-and-medicine/does-the-hpv-vaccine-cause-fertility-problems": [
		0
	],
	"health-and-medicine/does-hepatitis-b-vaccination-prevent-chronic-infection-and-liver-cancer": [
		0
	],
	"health-and-medicine/does-flu-vaccination-during-pregnancy-protect-pregnant-people-and-young-infants": [
		1
	],
	"health-and-medicine/can-vaers-reports-prove-that-a-vaccine-caused-an-adverse-event": [
		0
	],
	"health-and-medicine/are-e-cigarettes-safe-for-kids-and-teens": [
		0
	],
	"health-and-medicine/do-dental-sealants-prevent-cavities-in-childrens-back-teeth": [
		2
	],
	"health-and-medicine/is-there-no-safe-level-of-lead-exposure-for-children": [
		3,
		0
	],
	"health-and-medicine/does-alcohol-increase-cancer-risk-even-at-low-levels": [
		0
	],
	"health-and-medicine/do-all-types-of-alcoholic-drinks-increase-cancer-risk": [
		0
	],
	"health-and-medicine/is-there-a-safe-level-of-alcohol-consumption-when-it-comes-to-cancer-risk": [
		2
	],
	"health-and-medicine/does-secondhand-smoke-cause-cancer-and-heart-disease-in-people-who-do-not-smoke": [
		0
	],
	"health-and-medicine/does-radon-in-homes-cause-lung-cancer": [
		0
	],
	"health-and-medicine/does-sunscreen-use-prevent-skin-cancer": [
		2
	],
	"health-and-medicine/are-modern-sunscreens-safe-when-used-as-directed-including-chemical-sunscreens": [
		2
	],
	"health-and-medicine/should-you-rely-on-sunscreen-alone-or-are-clothing-and-shade-more-protective": [
		0
	],
	"health-and-medicine/does-improving-indoor-ventilation-and-filtration-reduce-respiratory-virus-spread": [
		2
	],
	"health-and-medicine/do-antibiotics-treat-colds-flu-or-most-viral-respiratory-infections": [
		0
	],
	"health-and-medicine/does-routine-imaging-improve-uncomplicated-low-back-pain": [
		0
	],
	"health-and-medicine/does-positive-airway-pressure-help-adults-with-obstructive-sleep-apnea": [
		0
	],
	"health-and-medicine/does-regular-physical-activity-reduce-the-risk-of-early-death-and-chronic-disease": [
		0
	],
	"health-and-medicine/do-structured-lifestyle-programs-prevent-or-delay-type-2-diabetes-in-adults-with-prediabetes": [
		0
	],
	"health-and-medicine/does-colorectal-cancer-screening-reduce-deaths": [
		0
	],
	"health-and-medicine/does-cervical-cancer-screening-reduce-cervical-cancer-deaths": [
		0
	],
	"health-and-medicine/does-mammography-screening-reduce-deaths-from-breast-cancer": [
		0
	],
	"health-and-medicine/does-folic-acid-before-and-early-in-pregnancy-prevent-neural-tube-defects": [
		0
	],
	"health-and-medicine/does-low-dose-ct-screening-reduce-lung-cancer-deaths-in-high-risk-adults": [
		0
	],
	"health-and-medicine/should-psa-screening-for-prostate-cancer-be-routine-for-every-older-man": [
		2
	],
	"health-and-medicine/does-quitting-smoking-reduce-health-risks-even-after-years-of-smoking": [
		0
	],
	"health-and-medicine/do-fda-approved-smoking-cessation-medications-help-adults-quit-smoking": [
		0
	],
	"health-and-medicine/does-hiv-cause-aids": [
		0
	],
	"health-and-medicine/does-prep-prevent-hiv-infection-when-taken-as-prescribed": [
		0
	],
	"health-and-medicine/do-condoms-reduce-hiv-and-other-sti-transmission-when-used-correctly-and-consistently": [
		2
	],
	"health-and-medicine/does-modern-treatment-cure-hepatitis-c-for-most-people": [
		0
	],
	"health-and-medicine/does-treating-high-blood-pressure-reduce-the-risk-of-stroke-and-heart-disease": [
		0
	],
	"health-and-medicine/do-statins-reduce-heart-attacks-and-strokes-for-people-at-elevated-cardiovascular-risk": [
		0
	],
	"health-and-medicine/should-adults-take-daily-low-dose-aspirin-to-prevent-a-first-heart-attack-or-stroke": [
		2
	],
	"health-and-medicine/do-syringe-services-programs-reduce-infection-risk-without-increasing-drug-use": [
		2
	],
	"health-and-medicine/do-medications-for-opioid-use-disorder-reduce-overdose-deaths": [
		0
	],
	"health-and-medicine/does-naloxone-reverse-opioid-overdoses-and-save-lives": [
		0
	],
	"climate-and-environment/is-global-sea-level-rising-and-accelerating-due-to-human-caused-climate-change": [
		0
	],
	"climate-and-environment/is-extreme-heat-becoming-more-frequent-or-intense-because-of-human-caused-climate-change": [
		0
	],
	"climate-and-environment/has-human-influence-increased-the-frequency-of-concurrent-heatwaves-and-droughts": [
		0
	],
	"climate-and-environment/has-human-influence-increased-fire-weather-occurrence-in-some-regions": [
		2
	],
	"nutrition-and-diet/do-most-people-consume-too-much-sodium-and-does-reducing-sodium-lower-blood-pressure": [
		0
	],
	"climate-and-environment/does-fine-particulate-air-pollution-cause-cardiovascular-disease-and-lung-cancer": [
		0
	],
	"climate-and-environment/do-portable-hepa-air-cleaners-reduce-indoor-fine-particle-pollution": [
		2
	],
	"climate-and-environment/can-indoor-dampness-and-mold-worsen-respiratory-health": [
		2
	],
	"climate-and-environment/do-gas-stoves-worsen-indoor-air-quality-and-childhood-asthma-risk": [
		2
	],
	"biology-and-evolution/are-transitional-fossils-missing-from-the-fossil-record": [
		4,
		5
	],
	"neuroscience-and-psychology/does-nicotine-harm-brain-development-into-the-mid-20s": [
		0
	],
	"neuroscience-and-psychology/does-regular-cannabis-use-increase-the-risk-of-psychosis-and-schizophrenia-especially-for-adolescents-and-heavy-or-high-thc-users": [
		2
	],
	"neuroscience-and-psychology/can-cannabis-be-addictive-and-lead-to-cannabis-use-disorder": [
		2
	],
	"neuroscience-and-psychology/does-cannabis-use-impair-driving-and-increase-crash-risk": [
		2
	],
	"neuroscience-and-psychology/are-antidepressants-effective-for-major-depressive-disorder-and-how-big-is-the-average-benefit": [
		2
	],
	"neuroscience-and-psychology/is-cognitive-behavioral-therapy-for-insomnia-a-first-line-treatment-for-chronic-insomnia": [
		0
	],
	"neuroscience-and-psychology/does-sugar-make-children-hyperactive": [
		6,
		2
	],
	"health-and-medicine/does-handwashing-with-soap-reduce-infections": [
		2
	],
	"nutrition-and-diet/does-eating-processed-meat-increase-colorectal-cancer-risk": [
		0
	],
	"nutrition-and-diet/does-it-matter-what-replaces-saturated-fat": [
		6,
		2
	],
	"nutrition-and-diet/are-seed-oils-uniquely-toxic-or-inflammatory": [
		6,
		2
	],
	"nutrition-and-diet/are-dietary-supplements-fda-approved-like-drugs": [
		3,
		0
	],
	"nutrition-and-diet/can-dietary-supplements-legally-claim-to-treat-or-cure-diseases": [
		3,
		0
	],
	"nutrition-and-diet/do-vitamin-e-or-beta-carotene-supplements-prevent-heart-disease-or-cancer": [
		3,
		0
	],
	"genetics-and-biotechnology/do-polygenic-risk-scores-work-equally-well-across-ancestry-groups": [
		7
	],
	"neuroscience-and-psychology/are-people-left-brained-or-right-brained-personality-types": [
		3,
		0
	],
	"historical-case-studies/did-asbestos-cause-mesothelioma-and-lung-cancer": [
		0
	],
	"historical-case-studies/did-oral-rehydration-therapy-save-lives-from-diarrheal-disease": [
		5
	],
	"science-communication/does-communicating-uncertainty-destroy-public-trust-in-science": [
		8
	],
	"media-misinformation/can-correlation-alone-prove-causation": [
		0,
		9,
		10,
		11,
		5,
		12
	],
	"bias-incentives/does-industry-funding-automatically-make-a-study-false": [
		2,
		9,
		10,
		11,
		5,
		12
	],
	"nutrition-and-diet/do-detox-diets-and-cleanses-remove-toxins-or-improve-health": [
		3,
		0
	],
	"bias-incentives/do-early-or-small-studies-often-overestimate-effects": [
		13
	],
	"bias-incentives/does-sharing-data-and-code-guarantee-a-study-is-reproducible": [
		14
	],
	"health-and-medicine/do-cell-phones-and-5g-networks-increase-cancer-risk": [
		2
	],
	"science-communication/is-radiofrequency-radiation-from-phones-and-5g-too-low-energy-to-damage-dna-directly": [
		3,
		0,
		9,
		10,
		11,
		5,
		12
	],
	"consensus-foundations/does-possibly-carcinogenic-mean-rf-radiation-is-proven-to-cause-cancer": [
		3,
		0,
		9,
		10,
		11,
		5,
		12
	],
	"neuroscience-and-psychology/is-hearing-loss-linked-to-higher-dementia-risk-and-can-hearing-aids-help": [
		2
	],
	"neuroscience-and-psychology/is-adhd-a-common-neurodevelopmental-disorder-that-often-persists-into-adulthood": [
		0
	],
	"neuroscience-and-psychology/do-adhd-medications-improve-symptoms-compared-with-placebo": [
		0
	],
	"neuroscience-and-psychology/are-parent-training-and-behavioral-therapy-effective-parts-of-adhd-treatment": [
		2
	],
	"climate-and-environment/are-pfas-exposures-linked-to-higher-cholesterol-and-reduced-vaccine-antibody-response": [
		2
	],
	"health-and-medicine/should-individuals-get-pfas-blood-testing-and-does-it-change-medical-care": [
		15
	],
	"climate-and-environment/are-microplastics-in-drinking-water-proven-to-cause-human-health-harms-at-current-exposure-levels": [
		15
	],
	"nutrition-and-diet/are-ultra-processed-foods-linked-to-worse-health-outcomes-and-how-much-is-causation-versus-confounding": [
		2
	],
	"health-and-medicine/are-intensive-behavioral-interventions-effective-for-children-with-obesity-and-does-dose-matter": [
		0
	],
	"health-and-medicine/is-obesity-a-major-health-risk-condition-at-the-population-level": [
		0
	],
	"health-and-medicine/do-glp-1-based-medications-produce-meaningful-weight-loss-for-adults-with-obesity": [
		16
	],
	"health-and-medicine/do-covid-19-vaccines-cause-menstrual-cycle-changes-and-are-the-changes-temporary": [
		2
	],
	"health-and-medicine/can-covid-19-cause-long-term-symptoms-even-after-mild-infection": [
		17
	],
	"nutrition-and-diet/is-higher-potassium-intake-from-food-recommended-to-reduce-blood-pressure-and-cardiovascular-risk": [
		0
	],
	"nutrition-and-diet/do-potassium-enriched-salt-substitutes-reduce-blood-pressure-compared-with-regular-salt": [
		2
	],
	"nutrition-and-diet/does-iodized-salt-prevent-iodine-deficiency-disorders": [
		18
	],
	"health-and-medicine/does-sustained-hiv-viral-suppression-prevent-sexual-transmission": [
		0
	],
	"health-and-medicine/does-indoor-tanning-increase-skin-cancer-risk": [
		0
	],
	"nutrition-and-diet/do-industrially-produced-trans-fats-increase-cardiovascular-risk": [
		0
	],
	"nutrition-and-diet/does-pasteurization-make-milk-safer-than-drinking-raw-milk": [
		0
	],
	"active-debates/is-psilocybin-assisted-therapy-an-established-treatment-for-depression": [
		4,
		5
	],
	"active-debates/is-intermittent-fasting-better-than-daily-calorie-restriction-for-weight-loss": [
		4,
		19
	],
	"active-debates/is-social-media-proven-to-be-the-main-cause-of-worsening-teen-mental-health": [
		20,
		5
	],
	"other-questions/do-graduated-driver-licensing-laws-reduce-teen-driver-crashes-and-deaths": [
		7,
		21
	],
	"health-and-medicine/does-placing-babies-on-their-backs-to-sleep-reduce-sids-risk": [
		2
	],
	"health-and-medicine/does-homeopathy-reliably-work-beyond-placebo-for-treating-health-conditions": [
		22
	],
	"health-and-medicine/does-ivermectin-reliably-improve-covid-19-outcomes": [
		2
	],
	"nutrition-and-diet/do-vitamin-c-supplements-prevent-or-cure-the-common-cold": [
		2
	],
	"nutrition-and-diet/does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe": [
		2
	],
	"neuroscience-and-psychology/is-emdr-an-evidence-based-treatment-for-ptsd": [
		2
	],
	"genetics-and-biotechnology/can-direct-to-consumer-genetic-tests-reliably-predict-most-common-diseases": [
		2
	],
	"climate-and-environment/can-planting-trees-alone-solve-climate-change": [
		0
	],
	"genetics-and-biotechnology/can-crispr-based-gene-therapy-treat-sickle-cell-disease-in-eligible-patients": [
		2
	],
	"genetics-and-biotechnology/can-a-noninvasive-prenatal-screening-test-diagnose-fetal-chromosomal-conditions-by-itself": [
		0
	],
	"genetics-and-biotechnology/can-fda-approved-rpe65-gene-therapy-improve-vision-related-function-in-a-rare-inherited-retinal-disease": [
		2
	],
	"nutrition-and-diet/do-sugar-sweetened-beverages-contribute-to-weight-gain-and-type-2-diabetes-risk": [
		0
	],
	"nutrition-and-diet/does-a-mediterranean-style-diet-reduce-cardiovascular-events-in-high-risk-adults": [
		2
	],
	"neuroscience-and-psychology/do-mindfulness-meditation-programs-reduce-anxiety-or-depression-symptoms": [
		2
	],
	"genetics-and-biotechnology/can-smn-gene-therapy-improve-outcomes-for-some-children-with-spinal-muscular-atrophy": [
		2
	],
	"genetics-and-biotechnology/can-car-t-cell-therapy-produce-durable-remissions-for-some-blood-cancers": [
		2
	],
	"neuroscience-and-psychology/does-cognitive-behavioral-therapy-help-adults-with-anxiety-disorders": [
		2
	],
	"nutrition-and-diet/do-whole-grains-and-dietary-fiber-help-lower-colorectal-cancer-risk": [
		2
	],
	"health-and-medicine/does-emergency-contraception-end-an-established-pregnancy": [
		0
	],
	"health-and-medicine/does-the-recombinant-shingles-vaccine-prevent-shingles-in-older-adults": [
		0
	],
	"nutrition-and-diet/does-the-dash-eating-plan-lower-blood-pressure": [
		0
	],
	"nutrition-and-diet/do-omega-3-fish-oil-supplements-broadly-prevent-first-heart-attacks-or-strokes": [
		2
	],
	"nutrition-and-diet/are-ketogenic-diets-a-proven-superior-long-term-weight-loss-strategy-for-most-adults": [
		2
	],
	"neuroscience-and-psychology/does-melatonin-reliably-treat-chronic-insomnia-in-adults": [
		15
	],
	"neuroscience-and-psychology/does-bright-light-therapy-help-seasonal-affective-disorder": [
		2
	],
	"health-and-medicine/do-routine-childhood-vaccines-overwhelm-or-weaken-the-immune-system": [
		0
	],
	"nutrition-and-diet/do-high-protein-diets-damage-kidney-function-in-healthy-adults": [
		2
	],
	"neuroscience-and-psychology/does-psychotherapy-help-adults-with-depression": [
		0
	],
	"genetics-and-biotechnology/are-unapproved-stem-cell-treatments-proven-safe-and-effective-for-most-advertised-conditions": [
		0
	],
	"genetics-and-biotechnology/are-multicancer-early-detection-blood-tests-proven-to-reduce-cancer-deaths-in-average-risk-people": [
		23
	],
	"genetics-and-biotechnology/can-consumer-microbiome-tests-reliably-diagnose-disease-or-prescribe-personalized-diets": [
		23
	],
	"neuroscience-and-psychology/is-exposure-and-response-prevention-effective-for-obsessive-compulsive-disorder": [
		0
	],
	"neuroscience-and-psychology/does-chronic-sleep-loss-worsen-depression-and-anxiety-risk": [
		2
	],
	"neuroscience-and-psychology/does-physical-punishment-improve-child-behavior-without-harmful-effects": [
		0
	],
	"neuroscience-and-psychology/can-recovered-memory-techniques-reliably-reveal-accurate-hidden-trauma-memories": [
		15
	],
	"nutrition-and-diet/does-a-gluten-free-diet-improve-health-for-people-without-celiac-disease-or-gluten-sensitivity": [
		2
	],
	"nutrition-and-diet/does-protein-supplementation-improve-muscle-and-strength-gains-during-resistance-training": [
		0
	],
	"nutrition-and-diet/does-eating-organic-food-clearly-improve-long-term-health-outcomes": [
		15
	],
	"nutrition-and-diet/do-non-sugar-sweeteners-reliably-help-with-long-term-weight-control": [
		15
	],
	"health-and-medicine/does-induced-abortion-increase-breast-cancer-risk": [
		0
	],
	"health-and-medicine/does-vasectomy-cause-prostate-cancer": [
		2
	],
	"health-and-medicine/does-bariatric-surgery-reduce-mortality-and-major-cardiovascular-risk-in-severe-obesity": [
		2
	],
	"health-and-medicine/do-long-term-opioids-provide-sustained-benefit-for-chronic-non-cancer-pain": [
		2
	],
	"health-and-medicine/should-menopausal-hormone-therapy-be-used-to-prevent-chronic-disease-in-most-postmenopausal-adults": [
		0
	],
	"biology-and-evolution/does-evolution-have-a-predetermined-goal-or-always-produce-perfect-organisms": [
		4,
		0,
		9,
		10,
		11,
		5,
		12
	],
	"biology-and-evolution/are-socially-defined-human-racial-groups-discrete-biological-subspecies": [
		4,
		0,
		9,
		10,
		11,
		5,
		12
	],
	"health-and-medicine/do-statins-cause-dementia-or-lasting-cognitive-decline": [
		0
	],
	"health-and-medicine/does-the-newborn-vitamin-k-injection-prevent-dangerous-bleeding-and-is-it-safe": [
		0
	],
	"health-and-medicine/does-fecal-microbiota-transplantation-work-for-recurrent-c-difficile-infection": [
		2
	],
	"health-and-medicine/do-simple-febrile-seizures-usually-cause-brain-damage-or-lasting-developmental-problems": [
		0
	],
	"health-and-medicine/do-routine-general-health-checks-reduce-deaths-in-otherwise-healthy-adults": [
		0
	],
	"climate-and-environment/does-thawing-permafrost-amplify-warming-and-does-it-make-runaway-warming-inevitable": [
		2
	],
	"nutrition-and-diet/does-eating-breakfast-cause-weight-loss-or-boost-metabolism": [
		2
	],
	"nutrition-and-diet/do-probiotics-prevent-antibiotic-associated-diarrhea": [
		2
	],
	"nutrition-and-diet/do-vitamin-d-supplements-prevent-fractures-or-falls-in-generally-healthy-adults": [
		0
	],
	"nutrition-and-diet/does-msg-cause-headaches-or-serious-health-effects-at-typical-dietary-exposure": [
		2
	],
	"nutrition-and-diet/can-an-alkaline-diet-change-blood-ph-or-treat-cancer": [
		0
	],
	"neuroscience-and-psychology/can-polygraph-tests-reliably-detect-lies": [
		2
	],
	"neuroscience-and-psychology/does-single-session-psychological-debriefing-prevent-ptsd-after-trauma": [
		0
	],
	"neuroscience-and-psychology/do-commercial-brain-training-games-produce-broad-lasting-cognitive-improvements": [
		2
	],
	"neuroscience-and-psychology/is-sexual-orientation-conversion-therapy-effective-and-safe": [
		2
	],
	"neuroscience-and-psychology/is-neurofeedback-an-established-effective-treatment-for-adhd": [
		2
	],
	"genetics-and-biotechnology/does-private-umbilical-cord-blood-banking-benefit-most-families": [
		0
	],
	"genetics-and-biotechnology/does-pgt-a-improve-cumulative-live-birth-rates-for-most-ivf-patients": [
		2
	],
	"genetics-and-biotechnology/are-polygenic-embryo-screening-scores-clinically-proven-to-improve-childrens-health": [
		23
	],
	"genetics-and-biotechnology/can-blood-based-tumor-dna-testing-replace-tissue-biopsy-for-most-cancers": [
		2
	],
	"public-policy-and-safety/does-secure-firearm-storage-reduce-youth-firearm-injury-and-suicide": [
		2,
		24,
		10,
		11,
		5
	],
	"public-policy-and-safety/do-smoke-free-indoor-laws-reduce-heart-attacks-and-other-cardiovascular-events": [
		0,
		24,
		10,
		11,
		5
	],
	"education-and-learning/does-making-a-student-repeat-a-grade-reliably-improve-long-term-outcomes": [
		15
	],
	"education-and-learning/does-high-quality-preschool-improve-later-educational-outcomes": [
		2
	],
	"education-and-learning/does-giving-every-student-a-laptop-reliably-improve-learning": [
		15
	],
	"education-and-learning/does-formative-assessment-improve-k12-learning": [
		2
	],
	"sleep-and-circadian-health/do-most-healthy-adults-need-at-least-seven-hours-of-sleep": [
		0
	],
	"sleep-and-circadian-health/can-weekend-catch-up-sleep-fully-erase-chronic-sleep-debt": [
		2
	],
	"sleep-and-circadian-health/does-alcohol-improve-sleep-when-used-as-a-nightcap": [
		0
	],
	"sleep-and-circadian-health/does-evening-light-from-screens-delay-sleep": [
		2
	],
	"sleep-and-circadian-health/should-habitual-loud-snoring-prompt-evaluation-for-sleep-apnea": [
		0
	],
	"sleep-and-circadian-health/does-long-term-night-shift-work-increase-chronic-health-risks": [
		2
	],
	"sleep-and-circadian-health/can-consumer-sleep-trackers-diagnose-sleep-disorders": [
		0
	],
	"sleep-and-circadian-health/can-a-short-daytime-nap-improve-alertness-and-cognition": [
		2
	],
	"sleep-and-circadian-health/does-regular-exercise-improve-sleep-quality": [
		2
	],
	"sleep-and-circadian-health/does-white-noise-reliably-improve-sleep": [
		23
	],
	"sleep-and-circadian-health/do-weighted-blankets-reliably-treat-insomnia-or-anxiety": [
		15
	],
	"sleep-and-circadian-health/is-mouth-taping-a-proven-safe-treatment-for-snoring-or-sleep-apnea": [
		2
	],
	"sleep-and-circadian-health/do-magnesium-supplements-reliably-improve-insomnia": [
		15
	],
	"sleep-and-circadian-health/is-cannabis-an-established-treatment-for-chronic-insomnia": [
		15
	],
	"sleep-and-circadian-health/are-sedating-antihistamines-good-regular-treatments-for-chronic-insomnia": [
		0
	],
	"sleep-and-circadian-health/do-daylight-saving-clock-changes-measurably-affect-health": [
		2
	],
	"exercise-and-sports-science/does-physical-activity-below-the-weekly-guideline-still-improve-health": [
		0
	],
	"exercise-and-sports-science/does-supervised-resistance-training-stunt-childrens-growth": [
		0
	],
	"exercise-and-sports-science/can-exercising-one-body-part-selectively-remove-fat-from-that-area": [
		2
	],
	"exercise-and-sports-science/does-static-stretching-before-exercise-prevent-injuries": [
		15
	],
	"exercise-and-sports-science/are-10000-daily-steps-necessary-for-health-benefits": [
		0
	],
	"exercise-and-sports-science/is-creatine-monohydrate-effective-and-generally-safe-for-healthy-adults": [
		0
	],
	"exercise-and-sports-science/does-recreational-running-cause-knee-or-hip-osteoarthritis": [
		2
	],
	"exercise-and-sports-science/does-exercising-before-breakfast-produce-greater-long-term-fat-loss": [
		2
	],
	"exercise-and-sports-science/must-resistance-training-sets-reach-failure-to-build-strength-or-muscle": [
		0
	],
	"exercise-and-sports-science/is-there-a-narrow-post-workout-anabolic-window-for-protein": [
		2
	],
	"exercise-and-sports-science/is-high-intensity-interval-training-universally-superior-to-moderate-continuous-exercise": [
		2
	],
	"exercise-and-sports-science/does-cardio-cancel-muscle-gains-from-strength-training": [
		2
	],
	"exercise-and-sports-science/can-regular-ice-baths-after-lifting-blunt-muscle-growth": [
		2
	],
	"exercise-and-sports-science/are-smartwatch-calorie-burn-estimates-accurate-enough-to-eat-back": [
		0
	],
	"exercise-and-sports-science/do-structured-neuromuscular-warm-ups-reduce-youth-sports-injuries": [
		0
	],
	"exercise-and-sports-science/must-weights-be-heavy-to-build-muscle": [
		0
	],
	"crime-and-justice/do-police-body-worn-cameras-consistently-reduce-use-of-force-and-complaints": [
		2
	],
	"crime-and-justice/is-eyewitness-confidence-a-reliable-measure-of-identification-accuracy": [
		0
	],
	"crime-and-justice/do-adult-drug-courts-reduce-reoffending": [
		2
	],
	"crime-and-justice/do-face-to-face-restorative-justice-conferences-reduce-repeat-offending-and-help-victims": [
		2
	],
	"crime-and-justice/does-public-area-cctv-reduce-crime": [
		2
	],
	"crime-and-justice/does-pretrial-detention-influence-later-case-and-life-outcomes": [
		2
	],
	"crime-and-justice/does-solitary-confinement-harm-mental-health": [
		0
	],
	"biology-and-evolution/does-transgenerational-epigenetic-inheritance-overturn-modern-evolutionary-theory": [
		2
	],
	"active-debates/do-anti-amyloid-drugs-provide-a-clinically-meaningful-net-benefit-in-early-alzheimers-disease": [
		2
	],
	"active-debates/does-ai-assisted-mammography-improve-screening-outcomes-beyond-detection-and-workload": [
		15
	],
	"active-debates/can-direct-air-capture-deliver-affordable-large-scale-carbon-removal": [
		23
	],
	"active-debates/is-cultivated-meat-clearly-lower-impact-at-commercial-scale": [
		23
	],
	"active-debates/is-stratospheric-aerosol-injection-a-proven-safe-climate-solution": [
		23
	],
	"active-debates/are-gene-drive-mosquitoes-proven-safe-and-effective-for-malaria-control-at-population-scale": [
		23
	],
	"astronomy-and-space/is-the-hot-big-bang-the-best-supported-broad-model-of-cosmic-history": [
		0
	],
	"astronomy-and-space/has-life-beyond-earth-been-scientifically-confirmed": [
		0
	],
	"astronomy-and-space/do-uap-reports-establish-extraterrestrial-visitation": [
		2
	],
	"ecology-and-conservation/does-breaking-habitat-into-smaller-isolated-patches-harm-biodiversity": [
		2
	],
	"ecology-and-conservation/do-pollinator-declines-threaten-crop-production": [
		0
	],
	"energy-and-infrastructure/can-short-duration-batteries-by-themselves-cover-every-grid-reliability-need": [
		0
	],
	"energy-and-infrastructure/is-green-hydrogen-the-most-efficient-choice-for-every-energy-use": [
		0
	],
	"agriculture-and-food-systems/does-no-till-farming-reliably-store-large-amounts-of-additional-soil-carbon": [
		2
	],
	"agriculture-and-food-systems/do-cover-crops-improve-soil-and-reduce-nitrate-losses-without-always-increasing-yields": [
		2
	],
	"agriculture-and-food-systems/is-regenerative-agriculture-one-standardized-uniformly-proven-farming-system": [
		0
	],
	"oceans-and-marine-science/does-overfishing-deplete-fish-stocks-and-can-effective-management-rebuild-them": [
		0
	],
	"oceans-and-marine-science/is-deep-sea-mining-environmentally-harmless": [
		0
	],
	"economics-and-social-policy/does-rent-control-help-covered-tenants-without-affecting-housing-supply-or-mobility": [
		2
	],
	"economics-and-social-policy/does-immigration-substantially-lower-wages-and-employment-for-native-born-workers-overall": [
		2
	],
	"economics-and-social-policy/does-the-earned-income-tax-credit-reduce-poverty-and-increase-employment": [
		0
	],
	"consensus-foundations/does-statistical-significance-tell-you-whether-an-effect-is-large-or-important": [
		0
	],
	"consensus-foundations/does-randomization-automatically-answer-every-causal-or-policy-question": [
		0
	],
	"media-misinformation/do-media-literacy-interventions-reliably-make-everyone-resistant-to-misinformation": [
		2
	],
	"bias-incentives/do-registered-reports-reduce-publication-bias-and-guarantee-valid-findings": [
		2
	],
	"bias-incentives/can-ordinary-journal-peer-review-reliably-detect-fraud-and-hidden-errors": [
		2
	],
	"bias-incentives/do-direct-replications-often-estimate-smaller-effects-than-original-studies": [
		0
	],
	"bias-incentives/can-flexible-analysis-choices-inflate-false-positive-findings": [
		0
	],
	"science-communication/do-more-facts-alone-reliably-resolve-polarized-science-disputes": [
		0
	],
	"science-communication/does-plain-language-improve-comprehension-without-guaranteeing-an-informed-decision": [
		0
	],
	"science-communication/is-one-trusted-messenger-equally-credible-to-every-audience": [
		2
	],
	"historical-case-studies/did-magnetic-stripes-alone-establish-the-modern-theory-of-plate-tectonics": [
		0
	],
	"public-policy-and-safety/does-minimum-unit-pricing-reduce-alcohol-consumption-and-harm": [
		2
	]
};
const omittedUrls: Record<string, string[]> = {
	"health-and-medicine/does-radon-in-homes-cause-lung-cancer": [
		"https://www.who.int/news-room/fact-sheets/detail/radon-and-health"
	],
	"nutrition-and-diet/does-the-dash-eating-plan-lower-blood-pressure": [
		"https://www.nhlbi.nih.gov/health/dash-eating-plan"
	]
};

export function observedEditorialCompletionBaseline(seed: CompleteSeedClaim): CompleteSeedClaim {
	const key = `${seed.topicSlug}/${seed.slug}`;
	const fields: Record<string, unknown> = {};
	for (const index of observedKeys[key] ?? []) {
		const variant = variations[index]!;
		const original = seed[variant.field as keyof CompleteSeedClaim];
		if (variant.append && (!Array.isArray(original) || !Array.isArray(variant.value))) throw new Error("Invalid observed compatibility definition.");
		fields[variant.field] = variant.append
			? [
					...original as unknown[],
					...variant.value as unknown[]
				]
			: variant.value;
	}
	return {
		...seed,
		...fields,
		sources: seed.sources.filter(source => !(omittedUrls[key] ?? []).includes(source.url ?? ""))
	} as CompleteSeedClaim;
}
