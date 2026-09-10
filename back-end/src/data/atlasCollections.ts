export interface AtlasCollectionDefinition {
	topicSlug: string;
	slug: string;
	title: string;
	description: string;
	claimSlugs: readonly string[];
}

export interface PublicAtlasCollection {
	slug: string;
	title: string;
	description: string;
	claimSlugs: string[];
}

export interface PublicAtlasCollectionMembership {
	slug: string;
	title: string;
	description: string;
	claimCount: number;
}

/**
 * The atlas taxonomy is intentionally source-controlled. A claim must be placed
 * deliberately instead of inheriting a potentially misleading category from a
 * keyword or model-generated label. Integrity tests keep these references in
 * sync with the seeded evidence library.
 */
export const atlasCollections = [
	{
		topicSlug: "health-and-medicine",
		slug: "vaccines-and-immunization",
		title: "Vaccines and immunization",
		description: "Vaccine effectiveness, safety signals, pregnancy, immune response, and common causal myths.",
		claimSlugs: [
			"do-childhood-vaccines-cause-autism",
			"does-the-mmr-vaccine-cause-autism",
			"is-the-mmr-vaccine-safe-and-highly-effective-at-preventing-measles",
			"can-measles-infection-weaken-immune-memory-after-recovery",
			"does-the-hpv-vaccine-prevent-cervical-cancer",
			"does-the-hpv-vaccine-cause-fertility-problems",
			"does-hepatitis-b-vaccination-prevent-chronic-infection-and-liver-cancer",
			"do-mrna-covid-19-vaccines-change-your-dna",
			"do-covid-19-vaccines-cause-infertility",
			"are-covid-19-vaccines-safe-and-beneficial-during-pregnancy-and-breastfeeding",
			"does-flu-vaccination-during-pregnancy-protect-pregnant-people-and-young-infants",
			"can-vaers-reports-prove-that-a-vaccine-caused-an-adverse-event",
			"how-big-is-the-myocarditis-risk-after-mrna-covid-19-vaccination",
			"do-covid-19-vaccines-cause-menstrual-cycle-changes-and-are-the-changes-temporary",
			"does-the-recombinant-shingles-vaccine-prevent-shingles-in-older-adults",
			"do-routine-childhood-vaccines-overwhelm-or-weaken-the-immune-system"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "pregnancy-infancy-and-reproductive-health",
		title: "Pregnancy, infancy, and reproductive health",
		description: "Preventive care and common safety claims spanning pregnancy, infancy, fertility, and menopause.",
		claimSlugs: [
			"does-breastfeeding-reduce-infants-risk-of-infections",
			"does-folic-acid-before-and-early-in-pregnancy-prevent-neural-tube-defects",
			"does-placing-babies-on-their-backs-to-sleep-reduce-sids-risk",
			"does-emergency-contraception-end-an-established-pregnancy",
			"does-induced-abortion-increase-breast-cancer-risk",
			"does-vasectomy-cause-prostate-cancer",
			"should-menopausal-hormone-therapy-be-used-to-prevent-chronic-disease-in-most-postmenopausal-adults",
			"does-the-newborn-vitamin-k-injection-prevent-dangerous-bleeding-and-is-it-safe",
			"do-simple-febrile-seizures-usually-cause-brain-damage-or-lasting-developmental-problems"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "tobacco-nicotine-and-smoking-cessation",
		title: "Tobacco, nicotine, and smoking cessation",
		description: "Relative harms, youth risk, secondhand exposure, and interventions that help people stop smoking.",
		claimSlugs: [
			"are-nicotine-e-cigarettes-less-harmful-than-smoking-and-do-they-help-people-quit",
			"are-e-cigarettes-safe-for-kids-and-teens",
			"does-secondhand-smoke-cause-cancer-and-heart-disease-in-people-who-do-not-smoke",
			"does-quitting-smoking-reduce-health-risks-even-after-years-of-smoking",
			"do-fda-approved-smoking-cessation-medications-help-adults-quit-smoking"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "oral-health",
		title: "Oral health",
		description: "Evidence behind fluoride and preventive dental care for children and adults.",
		claimSlugs: [
			"does-fluoride-in-community-drinking-water-prevent-tooth-decay-and-is-it-safe",
			"does-fluoride-toothpaste-prevent-cavities",
			"do-dental-sealants-prevent-cavities-in-childrens-back-teeth"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "cancer-risk-and-prevention",
		title: "Cancer risk and prevention",
		description: "Environmental, behavioral, and consumer exposures that alter cancer risk or are commonly misread.",
		claimSlugs: [
			"does-alcohol-increase-cancer-risk-even-at-low-levels",
			"do-all-types-of-alcoholic-drinks-increase-cancer-risk",
			"is-there-a-safe-level-of-alcohol-consumption-when-it-comes-to-cancer-risk",
			"does-radon-in-homes-cause-lung-cancer",
			"does-sunscreen-use-prevent-skin-cancer",
			"are-modern-sunscreens-safe-when-used-as-directed-including-chemical-sunscreens",
			"should-you-rely-on-sunscreen-alone-or-are-clothing-and-shade-more-protective",
			"do-cell-phones-and-5g-networks-increase-cancer-risk",
			"does-indoor-tanning-increase-skin-cancer-risk"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "respiratory-and-infectious-disease",
		title: "Respiratory and infectious disease",
		description: "Transmission, prevention, treatment, and recovery across respiratory and communicable diseases.",
		claimSlugs: [
			"do-masks-and-respirators-reduce-the-spread-of-respiratory-viruses",
			"does-improving-indoor-ventilation-and-filtration-reduce-respiratory-virus-spread",
			"do-antibiotics-treat-colds-flu-or-most-viral-respiratory-infections",
			"does-hiv-cause-aids",
			"does-prep-prevent-hiv-infection-when-taken-as-prescribed",
			"do-condoms-reduce-hiv-and-other-sti-transmission-when-used-correctly-and-consistently",
			"does-modern-treatment-cure-hepatitis-c-for-most-people",
			"does-antibiotic-overuse-drive-antibiotic-resistance",
			"does-handwashing-with-soap-reduce-infections",
			"do-insecticide-treated-bed-nets-reduce-malaria-in-endemic-regions",
			"does-nirmatrelvir-ritonavir-reduce-severe-covid-19-risk-for-high-risk-outpatients",
			"can-covid-19-cause-long-term-symptoms-even-after-mild-infection",
			"does-sustained-hiv-viral-suppression-prevent-sexual-transmission",
			"does-ivermectin-reliably-improve-covid-19-outcomes"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "screening-and-early-detection",
		title: "Screening and early detection",
		description: "When screening reduces harm, where tradeoffs matter, and why more testing is not always better.",
		claimSlugs: [
			"does-colorectal-cancer-screening-reduce-deaths",
			"does-cervical-cancer-screening-reduce-cervical-cancer-deaths",
			"does-mammography-screening-reduce-deaths-from-breast-cancer",
			"does-low-dose-ct-screening-reduce-lung-cancer-deaths-in-high-risk-adults",
			"should-psa-screening-for-prostate-cancer-be-routine-for-every-older-man",
			"do-routine-general-health-checks-reduce-deaths-in-otherwise-healthy-adults"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "cardiovascular-metabolic-and-weight-health",
		title: "Cardiovascular, metabolic, and weight health",
		description: "Prevention and treatment evidence for cardiovascular disease, diabetes, obesity, and related risks.",
		claimSlugs: [
			"does-regular-physical-activity-reduce-the-risk-of-early-death-and-chronic-disease",
			"do-structured-lifestyle-programs-prevent-or-delay-type-2-diabetes-in-adults-with-prediabetes",
			"does-treating-high-blood-pressure-reduce-the-risk-of-stroke-and-heart-disease",
			"do-statins-reduce-heart-attacks-and-strokes-for-people-at-elevated-cardiovascular-risk",
			"should-adults-take-daily-low-dose-aspirin-to-prevent-a-first-heart-attack-or-stroke",
			"are-intensive-behavioral-interventions-effective-for-children-with-obesity-and-does-dose-matter",
			"is-obesity-a-major-health-risk-condition-at-the-population-level",
			"do-glp-1-based-medications-produce-meaningful-weight-loss-for-adults-with-obesity",
			"does-bariatric-surgery-reduce-mortality-and-major-cardiovascular-risk-in-severe-obesity",
			"do-statins-cause-dementia-or-lasting-cognitive-decline"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "pain-sleep-and-treatment-choices",
		title: "Pain, sleep, and treatment choices",
		description: "Benefits, limits, and harms of common tests and treatments for pain, sleep, and chronic conditions.",
		claimSlugs: [
			"does-routine-imaging-improve-uncomplicated-low-back-pain",
			"does-spinal-manipulation-help-low-back-pain",
			"does-positive-airway-pressure-help-adults-with-obstructive-sleep-apnea",
			"does-homeopathy-reliably-work-beyond-placebo-for-treating-health-conditions",
			"do-long-term-opioids-provide-sustained-benefit-for-chronic-non-cancer-pain",
			"does-fecal-microbiota-transplantation-work-for-recurrent-c-difficile-infection"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "harm-reduction-and-overdose-prevention",
		title: "Harm reduction and overdose prevention",
		description: "Interventions that reduce infection and overdose risk for people who use drugs.",
		claimSlugs: [
			"do-syringe-services-programs-reduce-infection-risk-without-increasing-drug-use",
			"do-medications-for-opioid-use-disorder-reduce-overdose-deaths",
			"does-naloxone-reverse-opioid-overdoses-and-save-lives"
		]
	},
	{
		topicSlug: "health-and-medicine",
		slug: "environmental-exposure-and-health",
		title: "Environmental exposure and health",
		description: "How lead, PFAS, and other environmental exposures translate into individual and public-health action.",
		claimSlugs: [
			"is-there-no-safe-level-of-lead-exposure-for-children",
			"should-individuals-get-pfas-blood-testing-and-does-it-change-medical-care"
		]
	},
	{
		topicSlug: "climate-and-environment",
		slug: "causes-consensus-and-models",
		title: "Causes, consensus, and climate models",
		description: "What is causing current warming and how observations, models, and expert assessment establish attribution.",
		claimSlugs: [
			"is-recent-global-warming-mainly-caused-by-human-activity",
			"is-the-sun-causing-recent-global-warming",
			"do-volcanoes-emit-more-co2-than-humans",
			"is-there-a-scientific-consensus-that-humans-are-causing-climate-change",
			"have-climate-models-generally-predicted-the-broad-warming-trend",
			"is-water-vapor-the-main-cause-of-current-global-warming",
			"is-the-urban-heat-island-effect-responsible-for-the-observed-global-warming-trend",
			"did-global-warming-stop-after-1998"
		]
	},
	{
		topicSlug: "climate-and-environment",
		slug: "observed-changes-and-extreme-weather",
		title: "Observed changes and extreme weather",
		description: "Measured changes in heat, rainfall, storms, ice, sea level, and other climate-sensitive systems.",
		claimSlugs: [
			"is-global-sea-level-rising-and-accelerating-due-to-human-caused-climate-change",
			"is-global-sea-level-rise-influenced-year-to-year-by-climate-cycles-even-as-the-long-term-trend-rises",
			"is-extreme-heat-becoming-more-frequent-or-intense-because-of-human-caused-climate-change",
			"has-human-influence-increased-the-frequency-of-concurrent-heatwaves-and-droughts",
			"has-human-influence-increased-fire-weather-occurrence-in-some-regions",
			"is-heavy-rainfall-becoming-more-frequent-and-intense-because-of-human-caused-climate-change",
			"does-climate-change-make-hurricanes-wetter-and-coastal-flooding-worse",
			"are-glaciers-and-major-ice-sheets-losing-mass-as-the-climate-warms",
			"is-arctic-sea-ice-declining-because-of-human-caused-warming",
			"does-thawing-permafrost-amplify-warming-and-does-it-make-runaway-warming-inevitable",
			"is-human-caused-climate-change-worsening-pollen-seasons-in-north-america"
		]
	},
	{
		topicSlug: "climate-and-environment",
		slug: "air-quality-and-health",
		title: "Air quality and health",
		description: "Outdoor and indoor air pollution, practical controls, and the health outcomes they affect.",
		claimSlugs: [
			"does-air-pollution-cause-millions-of-premature-deaths-each-year",
			"does-fine-particulate-air-pollution-cause-cardiovascular-disease-and-lung-cancer",
			"do-portable-hepa-air-cleaners-reduce-indoor-fine-particle-pollution",
			"does-household-air-pollution-from-solid-fuels-cause-major-disease-burdens-especially-in-children",
			"can-indoor-dampness-and-mold-worsen-respiratory-health",
			"do-gas-stoves-worsen-indoor-air-quality-and-childhood-asthma-risk"
		]
	},
	{
		topicSlug: "climate-and-environment",
		slug: "oceans-ice-and-ecosystems",
		title: "Oceans, ice, and ecosystems",
		description: "How warming and carbon dioxide affect marine systems, biodiversity, and ecological resilience.",
		claimSlugs: [
			"is-the-ocean-becoming-more-acidic-because-of-human-co2-emissions",
			"does-ocean-warming-cause-coral-bleaching-and-reef-loss",
			"is-current-biodiversity-loss-largely-driven-by-human-activity"
		]
	},
	{
		topicSlug: "climate-and-environment",
		slug: "energy-and-climate-solutions",
		title: "Energy and climate solutions",
		description: "Lifecycle emissions, system reliability, and the limits of individual mitigation technologies.",
		claimSlugs: [
			"can-cutting-methane-emissions-slow-warming-in-the-near-term",
			"is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
			"do-electric-vehicles-usually-have-lower-lifetime-greenhouse-gas-emissions-than-gasoline-cars",
			"do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity",
			"do-heat-pumps-usually-cut-home-heating-emissions-compared-with-fossil-fuel-heating",
			"can-planting-trees-alone-solve-climate-change",
			"can-electricity-grids-remain-reliable-with-high-shares-of-wind-and-solar"
		]
	},
	{
		topicSlug: "climate-and-environment",
		slug: "chemical-and-particle-exposures",
		title: "Chemical and particle exposures",
		description: "What is established and still uncertain about PFAS, microplastics, and pesticide exposure.",
		claimSlugs: [
			"are-pfas-forever-chemicals-harmful-to-human-health-and-what-do-drinking-water-limits-try-to-prevent",
			"are-pfas-exposures-linked-to-higher-cholesterol-and-reduced-vaccine-antibody-response",
			"are-microplastics-in-drinking-water-proven-to-cause-human-health-harms-at-current-exposure-levels",
			"are-neonicotinoid-insecticides-harmful-to-bees-and-other-pollinators"
		]
	},
	{
		topicSlug: "climate-and-environment",
		slug: "land-use-food-and-climate",
		title: "Land use, food, and climate",
		description: "Climate and biodiversity consequences of forests, agriculture, livestock, and food security.",
		claimSlugs: [
			"does-deforestation-significantly-contribute-to-climate-change-and-biodiversity-loss",
			"does-livestock-production-contribute-substantially-to-greenhouse-gas-emissions",
			"does-human-caused-climate-change-reduce-crop-yields-and-threaten-food-security"
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		slug: "dietary-fats-and-heart-health",
		title: "Dietary fats and heart health",
		description: "Cholesterol, saturated and unsaturated fats, dietary patterns, and cardiovascular outcomes.",
		claimSlugs: [
			"are-dietary-cholesterol-and-saturated-fat-the-same-kind-of-risk",
			"does-saturated-fat-still-raise-ldl-and-heart-risk",
			"does-it-matter-what-replaces-saturated-fat",
			"are-seed-oils-uniquely-toxic-or-inflammatory",
			"do-industrially-produced-trans-fats-increase-cardiovascular-risk",
			"does-a-mediterranean-style-diet-reduce-cardiovascular-events-in-high-risk-adults",
			"does-the-dash-eating-plan-lower-blood-pressure",
			"do-omega-3-fish-oil-supplements-broadly-prevent-first-heart-attacks-or-strokes"
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		slug: "sodium-potassium-and-micronutrients",
		title: "Sodium, potassium, and micronutrients",
		description: "How mineral intake, fortification, and deficiency shape blood pressure and population health.",
		claimSlugs: [
			"do-most-people-consume-too-much-sodium-and-does-reducing-sodium-lower-blood-pressure",
			"is-higher-potassium-intake-from-food-recommended-to-reduce-blood-pressure-and-cardiovascular-risk",
			"do-potassium-enriched-salt-substitutes-reduce-blood-pressure-compared-with-regular-salt",
			"does-iodized-salt-prevent-iodine-deficiency-disorders"
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		slug: "supplements-and-prevention",
		title: "Supplements and prevention",
		description: "Where supplements help, where marketing outruns evidence, and how regulation differs from medicines.",
		claimSlugs: [
			"does-vitamin-d-supplementation-prevent-or-treat-covid-19-beyond-correcting-deficiency",
			"do-dietary-supplements-usually-improve-health-in-healthy-adults",
			"are-dietary-supplements-fda-approved-like-drugs",
			"can-dietary-supplements-legally-claim-to-treat-or-cure-diseases",
			"do-vitamin-e-or-beta-carotene-supplements-prevent-heart-disease-or-cancer",
			"do-vitamin-c-supplements-prevent-or-cure-the-common-cold",
			"do-vitamin-d-supplements-prevent-fractures-or-falls-in-generally-healthy-adults"
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		slug: "weight-diet-patterns-and-food-quality",
		title: "Weight, diet patterns, and food quality",
		description: "Diet patterns, processing, sweeteners, and popular rules promoted for weight or general health.",
		claimSlugs: [
			"do-detox-diets-and-cleanses-remove-toxins-or-improve-health",
			"are-ultra-processed-foods-linked-to-worse-health-outcomes-and-how-much-is-causation-versus-confounding",
			"do-sugar-sweetened-beverages-contribute-to-weight-gain-and-type-2-diabetes-risk",
			"are-ketogenic-diets-a-proven-superior-long-term-weight-loss-strategy-for-most-adults",
			"does-a-gluten-free-diet-improve-health-for-people-without-celiac-disease-or-gluten-sensitivity",
			"does-eating-organic-food-clearly-improve-long-term-health-outcomes",
			"do-non-sugar-sweeteners-reliably-help-with-long-term-weight-control",
			"does-eating-breakfast-cause-weight-loss-or-boost-metabolism",
			"can-an-alkaline-diet-change-blood-ph-or-treat-cancer"
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		slug: "food-safety-and-cancer-risk",
		title: "Food safety and cancer risk",
		description: "How processing, additives, and preparation affect infection or cancer risk at real-world exposures.",
		claimSlugs: [
			"does-eating-processed-meat-increase-colorectal-cancer-risk",
			"does-aspartame-cause-cancer-at-typical-intake-levels",
			"does-pasteurization-make-milk-safer-than-drinking-raw-milk",
			"do-whole-grains-and-dietary-fiber-help-lower-colorectal-cancer-risk",
			"does-msg-cause-headaches-or-serious-health-effects-at-typical-dietary-exposure"
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		slug: "performance-caffeine-and-gut-health",
		title: "Performance, caffeine, and gut health",
		description: "Evidence for protein, creatine, caffeine tolerance, and microbiome-related nutrition claims.",
		claimSlugs: [
			"does-creatine-monohydrate-improve-strength-training-and-is-it-generally-safe",
			"does-caffeine-become-less-effective-with-regular-daily-use",
			"do-high-protein-diets-damage-kidney-function-in-healthy-adults",
			"does-protein-supplementation-improve-muscle-and-strength-gains-during-resistance-training",
			"do-probiotics-prevent-antibiotic-associated-diarrhea"
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		slug: "substance-use-brain-and-behavior",
		title: "Substance use, brain, and behavior",
		description: "Nicotine and cannabis effects on development, addiction, mental health, and driving.",
		claimSlugs: [
			"does-nicotine-harm-brain-development-into-the-mid-20s",
			"does-regular-cannabis-use-increase-the-risk-of-psychosis-and-schizophrenia-especially-for-adolescents-and-heavy-or-high-thc-users",
			"can-cannabis-be-addictive-and-lead-to-cannabis-use-disorder",
			"does-cannabis-use-impair-driving-and-increase-crash-risk"
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		slug: "depression-anxiety-and-treatment",
		title: "Depression, anxiety, and treatment",
		description: "Medication, psychotherapy, exercise, mindfulness, and other treatments for common mental-health conditions.",
		claimSlugs: [
			"are-antidepressants-effective-for-major-depressive-disorder-and-how-big-is-the-average-benefit",
			"does-exercise-reduce-symptoms-of-depression",
			"do-probiotics-reliably-treat-depression-or-anxiety",
			"do-mindfulness-meditation-programs-reduce-anxiety-or-depression-symptoms",
			"does-cognitive-behavioral-therapy-help-adults-with-anxiety-disorders",
			"does-bright-light-therapy-help-seasonal-affective-disorder",
			"does-psychotherapy-help-adults-with-depression"
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		slug: "sleep-and-cognitive-health",
		title: "Sleep and cognitive health",
		description: "Sleep timing, insomnia care, chronic sleep loss, and links between sensory and cognitive health.",
		claimSlugs: [
			"do-later-school-start-times-help-teenagers-get-more-sleep",
			"is-cognitive-behavioral-therapy-for-insomnia-a-first-line-treatment-for-chronic-insomnia",
			"is-hearing-loss-linked-to-higher-dementia-risk-and-can-hearing-aids-help",
			"does-melatonin-reliably-treat-chronic-insomnia-in-adults",
			"does-chronic-sleep-loss-worsen-depression-and-anxiety-risk"
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		slug: "adhd-and-neurodevelopment",
		title: "ADHD and neurodevelopment",
		description: "What ADHD is and how medication, behavioral care, and marketed alternatives compare.",
		claimSlugs: [
			"is-adhd-a-common-neurodevelopmental-disorder-that-often-persists-into-adulthood",
			"do-adhd-medications-improve-symptoms-compared-with-placebo",
			"are-parent-training-and-behavioral-therapy-effective-parts-of-adhd-treatment",
			"is-neurofeedback-an-established-effective-treatment-for-adhd"
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		slug: "trauma-ocd-and-memory",
		title: "Trauma, OCD, and memory",
		description: "Evidence-based care and common misconceptions about trauma processing, OCD, and recovered memory.",
		claimSlugs: [
			"is-emdr-an-evidence-based-treatment-for-ptsd",
			"is-exposure-and-response-prevention-effective-for-obsessive-compulsive-disorder",
			"can-recovered-memory-techniques-reliably-reveal-accurate-hidden-trauma-memories",
			"does-single-session-psychological-debriefing-prevent-ptsd-after-trauma"
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		slug: "popular-brain-and-behavior-myths",
		title: "Popular brain and behavior myths",
		description: "Familiar claims about learning, personality, violence, parenting, cognition, and identity tested against evidence.",
		claimSlugs: [
			"do-learning-styles-improve-educational-outcomes",
			"does-sugar-make-children-hyperactive",
			"are-people-left-brained-or-right-brained-personality-types",
			"do-we-only-use-10-percent-of-our-brain",
			"do-violent-video-games-cause-serious-real-world-violence",
			"does-physical-punishment-improve-child-behavior-without-harmful-effects",
			"can-polygraph-tests-reliably-detect-lies",
			"do-commercial-brain-training-games-produce-broad-lasting-cognitive-improvements",
			"is-sexual-orientation-conversion-therapy-effective-and-safe"
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		slug: "gmos-and-agricultural-biotechnology",
		title: "GMOs and agricultural biotechnology",
		description: "Food safety, regulation, and exposure claims involving genetically engineered crops and associated products.",
		claimSlugs: [
			"are-commercial-gmo-foods-unsafe-to-eat",
			"are-gmos-unregulated-in-the-united-states",
			"does-glyphosate-cause-cancer-in-humans"
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		slug: "genes-risk-and-personalized-medicine",
		title: "Genes, risk, and personalized medicine",
		description: "What inherited variants and risk scores can predict, for whom, and how they can guide care.",
		claimSlugs: [
			"are-genes-destiny-for-complex-human-traits",
			"do-polygenic-risk-scores-work-equally-well-across-ancestry-groups",
			"can-direct-to-consumer-genetic-tests-reliably-predict-most-common-diseases",
			"do-harmful-brca1-or-brca2-variants-substantially-raise-breast-and-ovarian-cancer-risk",
			"can-pharmacogenomic-testing-improve-prescribing-decisions-for-some-drugs"
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		slug: "gene-cell-and-biologic-therapies",
		title: "Gene, cell, and biologic therapies",
		description: "Established uses, emerging benefits, and safety boundaries for gene, cell, and biologic treatments.",
		claimSlugs: [
			"is-crispr-ready-for-heritable-human-embryo-editing",
			"can-crispr-based-gene-therapy-treat-sickle-cell-disease-in-eligible-patients",
			"can-fda-approved-rpe65-gene-therapy-improve-vision-related-function-in-a-rare-inherited-retinal-disease",
			"can-smn-gene-therapy-improve-outcomes-for-some-children-with-spinal-muscular-atrophy",
			"can-car-t-cell-therapy-produce-durable-remissions-for-some-blood-cancers",
			"are-unapproved-stem-cell-treatments-proven-safe-and-effective-for-most-advertised-conditions",
			"are-biosimilars-as-safe-and-effective-as-their-reference-biologic-medicines"
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		slug: "screening-reproduction-and-rare-disease",
		title: "Screening, reproduction, and rare disease",
		description: "The capabilities and limits of prenatal, newborn, reproductive, and rare-disease testing.",
		claimSlugs: [
			"can-a-noninvasive-prenatal-screening-test-diagnose-fetal-chromosomal-conditions-by-itself",
			"does-newborn-screening-help-find-serious-treatable-conditions-before-babies-become-sick",
			"can-carrier-screening-identify-reproductive-risk-for-some-inherited-conditions",
			"can-genome-or-exome-sequencing-improve-diagnosis-for-children-with-suspected-rare-genetic-disorders",
			"does-private-umbilical-cord-blood-banking-benefit-most-families",
			"does-pgt-a-improve-cumulative-live-birth-rates-for-most-ivf-patients",
			"are-polygenic-embryo-screening-scores-clinically-proven-to-improve-childrens-health"
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		slug: "precision-oncology-and-consumer-testing",
		title: "Precision oncology and consumer testing",
		description: "Where blood tests, sequencing, and microbiome services help and where their marketing exceeds clinical evidence.",
		claimSlugs: [
			"are-multicancer-early-detection-blood-tests-proven-to-reduce-cancer-deaths-in-average-risk-people",
			"can-consumer-microbiome-tests-reliably-diagnose-disease-or-prescribe-personalized-diets",
			"does-tumor-genomic-sequencing-guarantee-an-effective-matched-cancer-therapy",
			"can-blood-based-tumor-dna-testing-replace-tissue-biopsy-for-most-cancers"
		]
	},
	{
		topicSlug: "biology-and-evolution",
		slug: "evidence-and-common-descent",
		title: "Evidence and common descent",
		description: "How scientific theory, fossils, genetics, and comparative biology support evolutionary history.",
		claimSlugs: [
			"is-evolution-just-a-theory",
			"are-transitional-fossils-missing-from-the-fossil-record"
		]
	},
	{
		topicSlug: "biology-and-evolution",
		slug: "human-evolution-and-variation",
		title: "Human evolution and variation",
		description: "Human ancestry, continuing evolution, and what genetic variation does not imply about race.",
		claimSlugs: [
			"did-humans-evolve-from-chimpanzees-living-today",
			"have-modern-humans-stopped-evolving",
			"are-socially-defined-human-racial-groups-discrete-biological-subspecies"
		]
	},
	{
		topicSlug: "biology-and-evolution",
		slug: "evolution-in-action",
		title: "Evolution in action",
		description: "Directly observed evolutionary change, antibiotic resistance, and the emergence of reproductive isolation.",
		claimSlugs: [
			"can-evolution-be-observed-happening-today",
			"is-antibiotic-resistance-an-example-of-evolution",
			"can-reproductive-isolation-evolve-within-observable-timescales"
		]
	},
	{
		topicSlug: "biology-and-evolution",
		slug: "mechanisms-and-misconceptions",
		title: "Mechanisms and misconceptions",
		description: "Selection, mutation, drift, gene loss, and epigenetics without purpose-driven or all-random caricatures.",
		claimSlugs: [
			"does-evolution-have-a-predetermined-goal-or-always-produce-perfect-organisms",
			"is-evolution-entirely-random",
			"can-losing-genes-be-an-adaptive-evolutionary-change",
			"do-organisms-mutate-because-they-need-a-particular-adaptation",
			"can-genetic-drift-change-populations-without-natural-selection",
			"does-transgenerational-epigenetic-inheritance-overturn-modern-evolutionary-theory"
		]
	},
	{
		topicSlug: "human-origins-and-paleontology",
		slug: "archaic-genomes-and-contact",
		title: "Archaic genomes and contact",
		description: "What ancient and living genomes show about contact with Neanderthal and Denisovan populations.",
		claimSlugs: [
			"did-modern-humans-interbreed-with-neanderthals",
			"did-denisovans-contribute-ancestry-to-living-human-populations"
		]
	},
	{
		topicSlug: "human-origins-and-paleontology",
		slug: "human-origins-and-hominin-lives",
		title: "Human origins and hominin lives",
		description: "African origins, branching human evolution, and the behavior of other hominin populations.",
		claimSlugs: [
			"did-homo-sapiens-originate-in-africa",
			"was-human-evolution-a-straight-ladder-toward-modern-humans",
			"were-neanderthals-unintelligent-and-without-complex-culture"
		]
	},
	{
		topicSlug: "human-origins-and-paleontology",
		slug: "deep-time-transitions-and-extinction",
		title: "Deep-time transitions and extinction",
		description: "Dinosaur-to-bird and land-to-water transitions, plus the impact that ended the non-avian dinosaurs.",
		claimSlugs: [
			"are-living-birds-dinosaurs",
			"did-the-chicxulub-asteroid-impact-drive-the-end-cretaceous-mass-extinction",
			"did-feathers-evolve-only-after-birds-began-to-fly",
			"is-archaeopteryx-evidence-of-the-dinosaur-bird-transition",
			"did-whales-evolve-from-land-dwelling-mammals"
		]
	},
	{
		topicSlug: "sports-nutrition-and-supplements",
		slug: "performance-aids-and-hydration",
		title: "Performance aids and hydration",
		description: "When buffering, nitrate, and electrolyte products can improve a specific exercise demand.",
		claimSlugs: [
			"does-beta-alanine-improve-exercise-performance",
			"can-beetroot-juice-or-dietary-nitrate-improve-exercise-performance",
			"does-sodium-bicarbonate-improve-high-intensity-exercise-performance",
			"are-electrolyte-sports-drinks-necessary-for-ordinary-short-workouts"
		]
	},
	{
		topicSlug: "sports-nutrition-and-supplements",
		slug: "protein-connective-tissue-and-adaptation",
		title: "Protein, connective tissue, and adaptation",
		description: "Claims about isolated amino acids, collagen, HMB, and supplements that may alter training adaptation.",
		claimSlugs: [
			"do-bcaa-supplements-add-muscle-or-performance-benefits-when-protein-intake-is-adequate",
			"do-collagen-supplements-improve-joint-pain-or-training-adaptation",
			"does-hmb-reliably-add-muscle-or-strength-in-trained-athletes",
			"do-high-dose-antioxidant-supplements-improve-training-adaptation"
		]
	},
	{
		topicSlug: "sports-nutrition-and-supplements",
		slug: "botanicals-and-recovery",
		title: "Botanicals and recovery",
		description: "Popular plant-derived products assessed for performance, soreness, and recovery rather than wellness reputation.",
		claimSlugs: [
			"does-ashwagandha-reliably-improve-athletic-performance",
			"does-tart-cherry-supplementation-speed-recovery-from-hard-exercise"
		]
	},
	{
		topicSlug: "infection-immunity-and-vaccines",
		slug: "influenza-vaccination-and-indirect-protection",
		title: "Influenza vaccination and indirect protection",
		description: "Direct and population benefits of vaccination, plus what influenza vaccines cannot cause.",
		claimSlugs: [
			"does-seasonal-influenza-vaccination-reduce-severe-flu-outcomes",
			"can-vaccination-indirectly-protect-people-who-are-not-vaccinated",
			"can-an-influenza-vaccine-give-someone-influenza"
		]
	},
	{
		topicSlug: "infection-immunity-and-vaccines",
		slug: "transmission-masks-and-hand-hygiene",
		title: "Transmission, masks, and hand hygiene",
		description: "How transmission can precede symptoms and how common protective tools work within their limits.",
		claimSlugs: [
			"can-people-transmit-sars-cov-2-before-symptoms-begin",
			"do-face-masks-usually-cause-dangerous-oxygen-or-carbon-dioxide-changes",
			"is-alcohol-based-hand-sanitizer-always-equivalent-to-washing-with-soap-and-water"
		]
	},
	{
		topicSlug: "infection-immunity-and-vaccines",
		slug: "treatment-resistance-and-surveillance",
		title: "Treatment, resistance, and surveillance",
		description: "Treatment duration, latent-infection risk, connected resistance systems, and population early warning.",
		claimSlugs: [
			"are-shorter-antibiotic-courses-effective-for-many-common-infections",
			"does-latent-tuberculosis-infection-always-progress-to-active-disease",
			"does-antimicrobial-resistance-move-among-humans-animals-food-and-the-environment",
			"can-wastewater-surveillance-provide-early-warning-of-infectious-disease-trends"
		]
	}
] as const satisfies readonly AtlasCollectionDefinition[];

const atlasCollectionsByTopic = new Map<string, readonly AtlasCollectionDefinition[]>();
for (const collection of atlasCollections) {
	const existing = atlasCollectionsByTopic.get(collection.topicSlug) ?? [];
	atlasCollectionsByTopic.set(collection.topicSlug, [...existing, collection]);
}

export function getAtlasCollections(topicSlug: string) {
	return atlasCollectionsByTopic.get(topicSlug) ?? [];
}

export function buildPublicAtlasCollections(topicSlug: string, visibleClaimSlugs: Iterable<string>) {
	const visible = new Set(visibleClaimSlugs);
	return getAtlasCollections(topicSlug)
		.map<PublicAtlasCollection>(collection => ({
			slug: collection.slug,
			title: collection.title,
			description: collection.description,
			claimSlugs: collection.claimSlugs.filter(claimSlug => visible.has(claimSlug))
		}))
		.filter(collection => collection.claimSlugs.length > 0);
}

export function getAtlasCollectionMemberships(topicSlug: string, claimSlug: string) {
	return getAtlasCollections(topicSlug)
		.filter(collection => collection.claimSlugs.includes(claimSlug))
		.map<PublicAtlasCollectionMembership>(collection => ({
			slug: collection.slug,
			title: collection.title,
			description: collection.description,
			claimCount: collection.claimSlugs.length
		}));
}

export function rankRelatedClaimSlugs(
	topicSlug: string,
	claimSlug: string,
	visibleClaimSlugs: Iterable<string>,
	limit = 4
) {
	const visible = new Set(visibleClaimSlugs);
	const rankings = new Map<string, {
		sharedCollectionCount: number;
		nearestPosition: number;
		firstCollectionIndex: number;
		firstClaimIndex: number;
	}>();

	for (const [collectionIndex, collection] of getAtlasCollections(topicSlug).entries()) {
		const claimIndex = collection.claimSlugs.indexOf(claimSlug);
		if (claimIndex < 0) continue;

		for (const [candidateIndex, candidateSlug] of collection.claimSlugs.entries()) {
			if (candidateSlug === claimSlug || !visible.has(candidateSlug)) continue;
			const current = rankings.get(candidateSlug);
			const distance = Math.abs(candidateIndex - claimIndex);
			rankings.set(candidateSlug, {
				sharedCollectionCount: (current?.sharedCollectionCount ?? 0) + 1,
				nearestPosition: Math.min(current?.nearestPosition ?? Number.POSITIVE_INFINITY, distance),
				firstCollectionIndex: Math.min(current?.firstCollectionIndex ?? collectionIndex, collectionIndex),
				firstClaimIndex: Math.min(current?.firstClaimIndex ?? candidateIndex, candidateIndex)
			});
		}
	}

	return [...rankings.entries()]
		.sort(([leftSlug, left], [rightSlug, right]) =>
			right.sharedCollectionCount - left.sharedCollectionCount
			|| left.nearestPosition - right.nearestPosition
			|| left.firstCollectionIndex - right.firstCollectionIndex
			|| left.firstClaimIndex - right.firstClaimIndex
			|| leftSlug.localeCompare(rightSlug)
		)
		.slice(0, Math.max(0, limit))
		.map(([relatedSlug]) => relatedSlug);
}
