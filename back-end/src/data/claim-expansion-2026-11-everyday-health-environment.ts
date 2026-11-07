import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberEverydayHealthEnvironmentResearchCheckedAt = "2026-11-07T04:30:37.375Z";

const sources = {
	plantsPassiveReview: researchSource("Potted plants do not improve indoor air quality: a review and analysis of reported VOC removal efficiencies", "Journal of Exposure Science &amp; Environmental Epidemiology", 2020, "https://doi.org/10.1038/s41370-019-0175-9", "10.1038/s41370-019-0175-9", "Review of 12 chamber studies and 196 experimental results, translated to estimated clean-air delivery rates. Passive potted plants removed far less volatile organic pollution than ordinary building air exchange. These estimates are not a clinical trial in occupied rooms.", "systematic_review", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	plantsPracticalReview: researchSource("Towards practical indoor air phytoremediation: A review", "Chemosphere", 2018, "https://doi.org/10.1016/j.chemosphere.2018.06.048", "10.1016/j.chemosphere.2018.06.048", "Review of botanical air cleaning, particularly systems that actively move air through growing media. Their proposed performance and need for field validation differ from leaving ordinary potted plants in a room.", "systematic_review", "context", novemberEverydayHealthEnvironmentResearchCheckedAt),
	ionizerFieldMeta: researchSource("A systematic review and meta-analysis of field studies of portable air cleaners: Performance, user behavior, and by-product emissions", "Science of The Total Environment", 2024, "https://doi.org/10.1016/j.scitotenv.2023.168786", "10.1016/j.scitotenv.2023.168786", "Review of 148 field-study papers covering several portable-air-cleaner technologies. Performance, use and possible byproducts varied. The overall particle-removal average is not an ionizer-specific result or proof of chemical safety.", "meta_analysis", "context", novemberEverydayHealthEnvironmentResearchCheckedAt),
	ionizerSchoolCrossover: researchSource("Different cardiorespiratory effects of indoor air pollution intervention with ionization air purifier: Findings from a randomized, double-blind crossover study among school children in Beijing", "Environmental Pollution", 2019, "https://doi.org/10.1016/j.envpol.2019.113054", "10.1016/j.envpol.2019.113054", "Short crossover study of 44 Beijing schoolchildren. Particle levels and some respiratory measures improved, while heart-rate variability changed unfavorably and measured ozone was unchanged. This single device and short study do not establish long-term clinical harm or universal safety.", "landmark_study", "context", novemberEverydayHealthEnvironmentResearchCheckedAt),
	co2VentilationMetric: researchSource("Development and application of an indoor carbon dioxide metric", "Indoor Air", 2022, "https://doi.org/10.1111/ina.13059", "10.1111/ina.13059", "Methods paper showing how indoor carbon dioxide depends on occupancy, emission rates, air exchange and elapsed time. A space-specific estimate can inform ventilation assessment; a single universal reading cannot certify all aspects of air quality.", "context", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	co2GuidelineReview: researchSource("Carbon dioxide guidelines for indoor air quality: a review", "Journal of Exposure Science &amp; Environmental Epidemiology", 2024, "https://doi.org/10.1038/s41370-024-00694-7", "10.1038/s41370-024-00694-7", "Review of 43 indoor-carbon-dioxide guidelines. Many limits targeted odor or lacked persuasive supporting evidence. It found no basis for one universal indoor-air-quality threshold across all buildings; hazardous high-concentration exposures were outside its ordinary-building scope.", "systematic_review", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	noiseCardiovascularMeta: researchSource("Long-Term Exposure to Traffic Noise and Risk of Incident Cardiovascular Diseases: a Systematic Review and Dose-Response Meta-Analysis", "Journal of Urban Health", 2023, "https://doi.org/10.1007/s11524-023-00769-0", "10.1007/s11524-023-00769-0", "Meta-analysis of 23 observational articles on transportation noise and incident cardiovascular disease. Road-noise associations were positive but modest. Correlated air pollution, exposure assignment and differences between diseases limit causal and individual-risk interpretation.", "meta_analysis", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	noiseMortalityMeta: researchSource("Long-term exposure to traffic noise and mortality: A systematic review and meta-analysis of epidemiological evidence between 2000 and 2020", "Environmental Pollution", 2021, "https://doi.org/10.1016/j.envpol.2020.116222", "10.1016/j.envpol.2020.116222", "Review of 13 epidemiological studies through October 2020. Most pooled mortality estimates were small and imprecise, with low-to-moderate certainty depending on outcome. Its suggested threshold was exploratory, not a verified safe-noise boundary.", "meta_analysis", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
	noiseWhoReassessment: researchSource("Revisiting the association between transportation noise and heart disease reported in the World Health Organization Environmental Noise Guidelines for the European Region: a systematic review and meta-analysis", "Environment International", 2025, "https://doi.org/10.1016/j.envint.2025.109667", "10.1016/j.envint.2025.109667", "2025 reassessment of 53 studies, predominantly European, separating heart-disease incidence, prevalence and mortality. Some aircraft estimates weakened when small-area studies were excluded. These exposure-response associations need care outside Europe and are not personal risk predictions.", "meta_analysis", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	hospitalEarplugMaskMeta: researchSource("Effect of earplugs and eye masks on the sleep quality of intensive care unit patients: A systematic review and meta‐analysis", "Journal of Advanced Nursing", 2021, "https://doi.org/10.1111/jan.14914", "10.1111/jan.14914", "Review of 13 ICU studies with 797 patients. Combined earplugs and eye masks, and eye masks alone, improved reported sleep; the earplug-alone subgroup was inconclusive. These intervention-specific results should not be replaced by the pooled overall estimate.", "meta_analysis", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	hospitalSleepMeta: researchSource("The Efficacy of Eye Masks and Earplugs Interventions for Sleep Promotion in Critically Ill Patients: A Systematic Review and Meta-Analysis", "Frontiers in Psychiatry", 2021, "https://doi.org/10.3389/fpsyt.2021.791342", "10.3389/fpsyt.2021.791342", "Review of 35 studies with 2,687 critically ill adults, including randomized and nonrandomized designs; 21 studies contributed to meta-analysis. Several subjective and measured sleep outcomes favored masks and/or earplugs. Designs, tools and combined interventions varied.", "meta_analysis", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	sitStandFullDayReview: researchSource("The Impact of Sit-Stand Desks on Full-Day and Work-Based Sedentary Behavior of Office Workers: A Systematic Review", "Human Factors: The Journal of the Human Factors and Ergonomics Society", 2025, "https://doi.org/10.1177/00187208241305591", "10.1177/00187208241305591", "Systematic review of 12 office-workplace studies comparing work-time and full-day sedentary behavior. Desk interventions often also included education or prompts. Findings about time spent sitting do not establish effects on heart attacks, lifespan or back-pain treatment.", "systematic_review", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	sitStandClusterTrial: researchSource("Effectiveness of an intervention for reducing sitting time and improving health in office workers: three arm cluster randomised controlled trial", "BMJ", 2022, "https://doi.org/10.1136/bmj-2021-069288", "10.1136/bmj-2021-069288", "UK cluster trial of 756 desk-based workers in 78 groups. At 12 months, the behavior program plus adjustable desks reduced daily sitting by about 64 minutes versus usual practice; the program without desks reduced it by about 22 minutes. This tests a combined program, not furniture alone.", "landmark_study", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	standingBackMeta: researchSource("Sit-stand workstations and impact on low back discomfort: a systematic review and meta-analysis", "Ergonomics", 2018, "https://doi.org/10.1080/00140139.2017.1402960", "10.1080/00140139.2017.1402960", "Review of 12 articles, eight pooled, finding a small reduction in low-back discomfort mainly in initially pain-free workers. It supplied limited evidence for people with established back pain or an optimal sitting/standing schedule.", "meta_analysis", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	standingMusculoskeletalTrial: researchSource("Impact of a 6-month sit-stand desk-based intervention on regional musculoskeletal discomfort and overall post-work fatigue in office workers: a cluster randomised controlled trial", "Ergonomics", 2025, "https://doi.org/10.1080/00140139.2024.2414197", "10.1080/00140139.2024.2414197", "Six-month cluster trial of 38 office workers combining desks, education and prompts. Reported discomfort improved within the intervention group, but the abstract reports no significant time-by-group interaction. Within-group change alone does not prove superiority over control.", "landmark_study", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
	smartScaleObservational: researchSource("Accuracy of Smart Scales on Weight and Body Composition: Observational Study", "JMIR mHealth and uHealth", 2021, "https://doi.org/10.2196/22487", "10.2196/22487", "Hospital comparison of three particular smart-scale models with DXA, in separate samples of 53, 52 and 48 patients. Body weight was measured more accurately than fat and muscle estimates. The paper uses ambiguous labels for signed errors; individual composition estimates disagreed substantially with the reference.", "landmark_study", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	consumerImpedanceAccuracy: researchSource("Accuracy of Bioelectrical Impedance Consumer Devices for Measurement of Body Composition in Comparison to Whole Body Magnetic Resonance Imaging and Dual X-Ray Absorptiometry", "Obesity Facts", 2008, "https://doi.org/10.1159/000176061", "10.1159/000176061", "Comparison of four consumer impedance devices with DXA and MRI in 106 adults. Group averages sometimes agreed while individual limits of agreement were wide; electrode arrangements and devices differed. Correlation does not establish individual accuracy.", "landmark_study", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	impedanceFourCompartmentReview: researchSource("The Validity of Bioelectrical Impedance Analysis Compared to a Four-Compartment Model in Healthy Adults: A Systematic Review", "Journal of Functional Morphology and Kinesiology", 2026, "https://doi.org/10.3390/jfmk11010065", "10.3390/jfmk11010065", "Review of 12 studies comparing impedance with four-compartment body-composition models in healthy, weight-stable adults. Small average biases often coexisted with wide individual disagreement. Heterogeneity prevented pooling, and the review does not cover every current consumer model.", "systematic_review", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	postureUmbrella: researchSource("No consensus on causality of spine postures or physical exposure and low back pain: A systematic review of systematic reviews", "Journal of Biomechanics", 2020, "https://doi.org/10.1016/j.jbiomech.2019.08.006", "10.1016/j.jbiomech.2019.08.006", "Umbrella review of 41 reviews covering spinal posture and physical exposures. Positive and null associations coexisted, and evidence for temporality and dose response was mixed. It did not establish that one posture causes low-back pain or that posture can never affect symptoms.", "systematic_review", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
	officePostureScoping: researchSource("Low back pain and sitting time, posture and behavior in office workers: A scoping review", "Journal of Back and Musculoskeletal Rehabilitation", 2025, "https://doi.org/10.1177/10538127251320320", "10.1177/10538127251320320", "Scoping review of 22 studies with 7,814 office workers. Sitting time, posture and behavior were associated with low-back pain in some studies; findings and designs varied. Mapping associations does not demonstrate that correcting slouching prevents or treats pain.", "systematic_review", "context", novemberEverydayHealthEnvironmentResearchCheckedAt),
	multivitaminCosmosClinic: researchSource("Effect of multivitamin-mineral supplementation versus placebo on cognitive function: results from the clinic subcohort of the COcoa Supplement and Multivitamin Outcomes Study (COSMOS) randomized clinical trial and meta-analysis of 3 cognitive studies within COSMOS", "The American Journal of Clinical Nutrition", 2024, "https://doi.org/10.1016/j.ajcnut.2023.12.011", "10.1016/j.ajcnut.2023.12.011", "COSMOS clinic trial with 573 baseline participants, plus a synthesis of 5,203 nonoverlapping participants across three substudies in the same parent trial. Pooled global-cognition and memory benefits were small. Clinic global cognition alone had a confidence interval crossing zero; dementia prevention was not established.", "landmark_study", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	multivitaminCosmosWeb: researchSource("Multivitamin Supplementation Improves Memory in Older Adults: A Randomized Clinical Trial", "The American Journal of Clinical Nutrition", 2023, "https://doi.org/10.1016/j.ajcnut.2023.05.011", "10.1016/j.ajcnut.2023.05.011", "Randomized COSMOS-Web study of 3,562 older adults. Immediate word recall improved modestly compared with placebo; several secondary cognitive measures did not. Its full sample differs from the nonoverlapping subset used in the later within-COSMOS meta-analysis.", "landmark_study", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	creatineCognitionMeta: {
		...researchSource("The effects of creatine supplementation on cognitive function in adults: a systematic review and meta-analysis", "Frontiers in Nutrition", 2024, "https://doi.org/10.3389/fnut.2024.1424972", "10.3389/fnut.2024.1424972", "Meta-analysis of 16 trials and 492 adults reporting benefits on some cognitive tests. A 2025 correction distinguishes attention and processing-speed scores from completion times. Separately, EFSA and a 2026 commentary identify non-independent outcomes and double-counted participants, limiting confidence in pooled precision.", "meta_analysis", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.3389/fnut.2024.1424972",
			"https://api.crossref.org/works?filter=updates%3A10.3389%2Ffnut.2024.1424972&rows=100",
			"https://doi.org/10.3389/fnut.2025.1570800"
		]
	},
	creatineCognitionComment: researchSource("Commentary: The effects of creatine supplementation on cognitive function in adults: a systematic review and meta-analysis", "Frontiers in Nutrition", 2026, "https://doi.org/10.3389/fnut.2026.1716285", "10.3389/fnut.2026.1716285", "Statistical commentary on the 2024 synthesis, identifying multiple correlated test results treated as independent. It requests an appropriate reanalysis. This is methodological criticism, not a new trial or a finding that creatine has no cognitive effects.", "context", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
	creatineEfsaOpinion: researchSource("Creatine and improvement in cognitive function: Evaluation of a health claim pursuant to article 13(5) of regulation (EC) No 1924/2006", "EFSA Journal", 2024, "https://doi.org/10.2903/j.efsa.2024.9100", "10.2903/j.efsa.2024.9100", "EFSA's 2024 assessment of a cognitive-function health claim found the causal benefit unestablished under the proposed conditions. It identified double-counting in the 2024 meta-analysis. This assessment concerns cognition, not creatine's established exercise uses, and is not a blanket safety ruling.", "consensus_statement", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
	collagenSkin2023Meta: researchSource("Effects of Oral Collagen for Skin Anti-Aging: A Systematic Review and Meta-Analysis", "Nutrients", 2023, "https://doi.org/10.3390/nu15092080", "10.3390/nu15092080", "Meta-analysis of 26 trials with 1,721 participants reporting improved skin hydration and elasticity. Products, duration and study quality varied. Favorable instrument-based outcomes do not by themselves show large visible benefits or establish every advertised skin claim.", "meta_analysis", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	collagenSkinFundingMeta: researchSource("Effects of Collagen Supplements on Skin Aging: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "The American Journal of Medicine", 2025, "https://doi.org/10.1016/j.amjmed.2025.04.034", "10.1016/j.amjmed.2025.04.034", "Review of 23 trials with 1,474 participants. Pooled skin outcomes favored collagen, but higher-quality and non-industry-funded subgroups did not show significant benefits. Those subgroup findings weaken confidence without establishing exact equivalence or proving that funding caused the difference.", "meta_analysis", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
	tartCherrySleepMeta: researchSource("Effects of Tart Cherry (Prunus cerasus) Supplementation on Overall Sleep Quality, Melatonin, and Inflammatory Biomarkers: A Systematic Review and Meta-Analysis", "Recent Progress in Nutrition", 2026, "https://doi.org/10.21926/rpn.2603024", "10.21926/rpn.2603024", "2026 synthesis of 10 trials enrolling 294 adults. Overall sleep-quality improvement was small and nonsignificant; a favorable insomnia subgroup used only two small trials. Certainty was low or very low, and products, populations and sleep measurements differed.", "meta_analysis", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
	tartCherryTooSourMeta: researchSource("Too Sour to be True? Tart Cherries (Prunus cerasus) and Sleep: a Systematic Review and Meta-analysis", "Current Sleep Medicine Reports", 2023, "https://doi.org/10.1007/s40675-023-00261-w", "10.1007/s40675-023-00261-w", "2023 review of eight low-to-moderate-quality studies found favorable objective sleep duration and efficiency but nonsignificant self-reported results. Objective sleep-duration results were heterogeneous. Its included trials overlap later reviews and do not add independent replications.", "meta_analysis", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	omega3DepressionCochrane: researchSource("Omega-3 fatty acids for depression in adults", "Cochrane Database of Systematic Reviews", 2021, "https://doi.org/10.1002/14651858.cd004692.pub5", "10.1002/14651858.cd004692.pub5", "2021 Cochrane review of 35 studies. The placebo comparison suggested a small-to-modest symptom effect with low-to-very-low certainty; the average clinical importance was doubtful. Response, remission and direct comparisons with antidepressants remained imprecise.", "systematic_review", "debate", novemberEverydayHealthEnvironmentResearchCheckedAt),
	omega3DepressionDoseMeta: researchSource("Efficacy and safety of n -3 fatty acids supplementation on depression: a systematic review and dose–response meta-analysis of randomised controlled trials", "British Journal of Nutrition", 2024, "https://doi.org/10.1017/s0007114523002052", "10.1017/s0007114523002052", "Review of 67 trials finding more favorable symptom and remission results in people with existing depression, but no reduction in new depression in the general population. Its populations, formulations and outcomes differ from the Cochrane review; a fitted dose-response curve is not individual treatment advice.", "meta_analysis", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt),
	omega3DepressionUmbrella: researchSource("Clinical impacts of n -3 fatty acids supplementation on depression symptoms: an umbrella review of meta-analyses", "British Journal of Nutrition", 2024, "https://doi.org/10.1017/s000711452300226x", "10.1017/s000711452300226x", "Umbrella review of 22 meta-analyses with 26 effect estimates. Findings were mixed, many favorable estimates were small, and the authors proposed an adjunctive role. Overlapping meta-analyses are not 22 independent clinical trial replications.", "systematic_review", "context", novemberEverydayHealthEnvironmentResearchCheckedAt),
	epaIonization: researchSource("Air Cleaners, HVAC Filters, and Respiratory Viruses", "US Environmental Protection Agency", undefined, "https://www.epa.gov/indoor-air-quality-iaq/air-cleaners-hvac-filters-and-respiratory-viruses", "", "EPA's public technical guidance identifies potential ozone and other byproduct emissions from bipolar ionization. Evidence outside laboratory conditions is more limited than for established filtration. Ozone-emission certification does not establish every aspect of chemical safety or clinical effectiveness.", "technical_reference", "supports", novemberEverydayHealthEnvironmentResearchCheckedAt)
};

export const novemberEverydayHealthEnvironmentClaims = [
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "do-houseplants-clean-the-air-in-a-room",
		title: "Do houseplants clean the air in a room?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Ordinary potted plants remove too little indoor pollution to replace ventilation or an air cleaner. Plants can absorb some chemicals in sealed experiments, but that does not mean a few plants will clean an occupied room.",
		stableCore: [
			"Sealed chambers make small removal effects easier to detect than real rooms do.",
			"A review translated 196 chamber results into clean-air delivery and found very low rates for typical potted plants.",
			"Active botanical filters move air through growing media; they are a different technology from passive houseplants."
		],
		openQuestions: [
			"How well do active botanical systems perform in occupied buildings over long periods?",
			"Which practical designs balance pollutant removal, maintenance and unwanted emissions?"
		],
		whatWouldChangeMinds: [
			"Independent occupied-room trials showing meaningful pollutant reductions from realistic numbers of passive plants.",
			"Reliable long-term comparisons with ordinary ventilation and filtration."
		],
		misconceptions: [
			"Removing chemicals from a sealed laboratory chamber proves that a few houseplants purify a home."
		],
		editorSummary: "The key issue is how fast pollutants are removed in a real room.",
		population: "Ordinary occupied homes and workplaces using passive potted plants.",
		scope: "Compare passive-plant removal of airborne volatile chemicals with real-room air exchange; distinguish engineered botanical filters.",
		excludedEvidence: [
			"Plant wellbeing or aesthetic benefits do not establish air-cleaning performance.",
			"Active airflow systems are not evidence for the same effect from passive pots."
		],
		uncertainty: "Real-building trials are limited, and plant species, growing media and pollutant mixtures vary.",
		sources: [sources.plantsPassiveReview, sources.plantsPracticalReview]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "can-ionizing-air-cleaners-produce-harmful-byproducts",
		title: "Can ionizing air cleaners produce harmful byproducts?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Some ionizing air cleaners can create ozone or other unwanted chemicals. Emissions depend on the device and how it is used. Removing particles does not, by itself, prove that a device is chemically safe.",
		stableCore: [
			"Ionization changes the electrical charge of airborne material; it differs from simply capturing particles in a filter.",
			"EPA identifies ozone and other potential byproducts as concerns with some ionization technologies.",
			"A short school study found improved particle levels and some breathing measures alongside an unfavorable heart-rate-variability signal; it did not establish long-term clinical harm."
		],
		openQuestions: [
			"Which devices avoid meaningful byproduct emissions under realistic occupied-room conditions?",
			"How do long-term health outcomes compare with established filtration?"
		],
		whatWouldChangeMinds: [
			"Independent device-specific testing covering ozone and other chemical byproducts during normal use and aging.",
			"Longer controlled field studies measuring both exposure and health outcomes."
		],
		misconceptions: [
			"Zero detectable ozone guarantees that every possible chemical byproduct has been excluded."
		],
		editorSummary: "Particle removal and chemical emissions need separate measurements.",
		population: "Occupied buildings using portable or in-duct ionization devices.",
		scope: "Assess potential chemical emissions and field evidence without treating every ionizer or every air cleaner as equivalent.",
		excludedEvidence: [
			"Overall air-cleaner averages are not ionizer-specific performance estimates.",
			"Single-device experiments do not establish emissions or clinical risk for every ionization product."
		],
		uncertainty: "Device designs and room conditions vary; short-term physiological changes do not settle long-term clinical outcomes.",
		sources: [sources.ionizerFieldMeta, sources.ionizerSchoolCrossover, sources.epaIonization]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "climate-and-environment",
		slug: "can-an-indoor-co2-monitor-tell-you-how-well-a-room-is-ventilated",
		title: "Can an indoor CO2 monitor tell you how well a room is ventilated?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It can provide a useful clue, especially in occupied rooms, but the number needs context. Occupancy, outdoor air, room use and measurement timing matter. A low CO2 reading does not rule out every other indoor pollutant.",
		stableCore: [
			"People release carbon dioxide, so rising levels can indicate that occupied-room air is not being replaced quickly.",
			"The same reading can mean different things in rooms with different occupancy and ventilation needs.",
			"A review of 43 guidelines found weak support for one universal CO2 limit across all ordinary buildings."
		],
		openQuestions: [
			"Which practical monitoring methods best reflect changing occupancy and ventilation?",
			"How well do simplified thresholds work across different room types?"
		],
		whatWouldChangeMinds: [
			"Field validation linking specific monitoring rules to measured air exchange across varied buildings.",
			"Strong evidence connecting a proposed threshold to a clearly defined health outcome."
		],
		misconceptions: [
			"A single reading below 1,000 ppm certifies that indoor air is safe in every respect."
		],
		editorSummary: "CO2 is a ventilation clue, not a complete air-quality test.",
		population: "Ordinary occupied homes, classrooms and workplaces.",
		scope: "Interpret occupancy-related CO2 as a ventilation proxy, separating it from measurements of particles, other gases and exceptional high-concentration hazards.",
		excludedEvidence: [
			"Industrial exposure limits do not define routine building-ventilation targets.",
			"A one-time reading without occupancy and timing information does not verify an air-exchange rate."
		],
		uncertainty: "Sensor accuracy, mixing, changing occupancy and outdoor concentrations affect interpretation.",
		sources: [sources.co2VentilationMetric, sources.co2GuidelineReview]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		slug: "is-long-term-traffic-noise-linked-to-heart-disease",
		title: "Is long-term traffic noise linked to heart disease?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Long-term traffic-noise exposure is linked to a modest increase in heart-disease risk, especially for road traffic. Most evidence is observational, so the exact size and causal contribution remain uncertain.",
		stableCore: [
			"Research distinguishes road, rail and aircraft noise, and new disease from deaths due to disease.",
			"Newer syntheses generally find positive road-noise associations, while some aircraft estimates weaken in sensitivity analyses.",
			"Noise often occurs alongside air pollution and social disadvantage, which complicates efforts to isolate its effect."
		],
		openQuestions: [
			"How much heart-disease risk falls when real-world noise exposure is reduced?",
			"How well do predominantly European results transfer to other settings?"
		],
		whatWouldChangeMinds: [
			"Strong natural experiments linking measured noise reductions to later cardiovascular outcomes.",
			"Better individual exposure measurements and separation from air pollution and neighborhood factors."
		],
		misconceptions: [
			"A small relative-risk increase predicts whether a particular exposed person will develop heart disease."
		],
		editorSummary: "The road-noise association is clearer than the precise risk from every transport source.",
		population: "Adults living near long-term transportation noise, predominantly in European observational studies.",
		scope: "Separate noise sources, incident cardiovascular disease and cause-specific mortality; retain the observational design and geographic limits.",
		excludedEvidence: [
			"Brief annoyance experiments do not measure long-term heart-disease incidence.",
			"Exploratory exposure-response starting points are not universal safe-noise thresholds."
		],
		uncertainty: "Exposure estimation, correlated pollutants and study location affect the size of associations.",
		sources: [sources.noiseCardiovascularMeta, sources.noiseMortalityMeta, sources.noiseWhoReassessment]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "sleep-and-circadian-health",
		slug: "do-earplugs-and-eye-masks-improve-sleep-in-intensive-care",
		title: "Do earplugs and eye masks improve sleep in intensive care?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Eye masks, often combined with earplugs, may improve sleep for adults in intensive care. The evidence for earplugs alone is less clear. Small studies and different sleep measures limit confidence in the size of the benefit.",
		stableCore: [
			"ICU light and noise can disturb sleep, but critical illness and medical care also matter.",
			"One review of 13 studies found more favorable results for eye masks and combined use than for earplugs alone.",
			"A broader review included both randomized and nonrandomized studies, which offer different protection against bias."
		],
		openQuestions: [
			"Which patients benefit most, and which devices are tolerable during care?",
			"Do better sleep scores translate into better recovery or less delirium?"
		],
		whatWouldChangeMinds: [
			"Larger blinded-outcome trials separating earplugs, masks and combined use.",
			"Consistent objective sleep results together with meaningful recovery outcomes."
		],
		misconceptions: [
			"A benefit from earplugs plus an eye mask proves that earplugs alone caused it."
		],
		editorSummary: "The combined-intervention evidence is stronger than the earplug-alone evidence.",
		population: "Critically ill adult ICU patients studied with eye masks, earplugs or both.",
		scope: "Compare ICU sleep outcomes by intervention and measurement method, rather than generalizing directly to healthy people at home.",
		excludedEvidence: [
			"Hearing-protection attenuation studies do not establish sleep benefits.",
			"Sleep-quality improvement does not establish a reduction in mortality or delirium."
		],
		uncertainty: "Small samples, incomplete blinding and heterogeneous sleep tools limit precision.",
		sources: [sources.hospitalEarplugMaskMeta, sources.hospitalSleepMeta]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "health-and-medicine",
		slug: "do-sit-stand-desks-help-office-workers-sit-less",
		title: "Do sit-stand desks help office workers sit less?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Programs that include adjustable desks usually help office workers spend less time sitting. Benefits can last at least a year in some trials. The evidence often tests desks together with reminders and workplace support.",
		stableCore: [
			"A large UK trial found less daily sitting after a year with a workplace program, especially when adjustable desks were added.",
			"Reviews find reductions during working hours and, in some studies, across the whole day.",
			"Replacing sitting with standing is a different change from adding walking or more vigorous exercise."
		],
		openQuestions: [
			"How much of the benefit persists after active workplace support ends?",
			"Which workers benefit from desks alone rather than a combined program?"
		],
		whatWouldChangeMinds: [
			"Longer independent trials measuring whole-day sitting after support is withdrawn.",
			"Comparisons that isolate furniture from reminders, education and organizational changes."
		],
		misconceptions: [
			"Less sitting in a desk trial proves fewer heart attacks or a longer life."
		],
		editorSummary: "The clearest measured benefit is less sitting time.",
		population: "Desk-based adult office workers, including UK local-government workplaces.",
		scope: "Assess measured work-time and whole-day sitting under adjustable-desk interventions, distinguishing behavior outcomes from disease prevention.",
		excludedEvidence: [
			"Standing time is not interchangeable with walking or exercise time.",
			"Bundled workplace programs do not isolate the effect of buying a desk."
		],
		uncertainty: "Effects vary with workplace support, adherence and follow-up duration.",
		sources: [sources.sitStandFullDayReview, sources.sitStandClusterTrial]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "health-and-medicine",
		slug: "do-standing-desks-reduce-lower-back-pain",
		title: "Do standing desks reduce lower-back pain?",
		band: "mixed",
		certainty: "low",
		bottomLine: "They may slightly reduce discomfort for some office workers, but strong evidence for treating ongoing lower-back pain is limited. Most studies test alternating sitting and standing, often with other workplace changes, rather than standing all day.",
		stableCore: [
			"An older review found small average reductions in discomfort, mainly in workers without established pain.",
			"A small newer trial reported improvement within the desk group, but no significant time-by-group interaction.",
			"A change within one group does not by itself show that the intervention worked better than the control."
		],
		openQuestions: [
			"Which people with established back pain benefit, and by how much?",
			"How do different movement patterns compare with changing the desk alone?"
		],
		whatWouldChangeMinds: [
			"Larger randomized trials in people with persistent back pain, using meaningful pain and function outcomes.",
			"Clear between-group benefits that persist beyond the supported intervention."
		],
		misconceptions: [
			"If sitting feels uncomfortable, standing for the entire workday is an established treatment."
		],
		editorSummary: "The studies support a possible small comfort benefit more clearly than a back-pain treatment claim.",
		population: "Adult desk workers, with limited direct evidence in people with established lower-back pain.",
		scope: "Assess low-back discomfort and function under sit-stand workplace interventions, separately from their effect on sitting time.",
		excludedEvidence: [
			"A statistically significant within-group change is not proof of a treatment-control difference.",
			"Trials of alternating posture do not validate standing continuously."
		],
		uncertainty: "Small samples, bundled interventions and sparse chronic-pain evidence leave treatment effects uncertain.",
		sources: [sources.standingBackMeta, sources.standingMusculoskeletalTrial]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "health-and-medicine",
		slug: "how-accurately-do-smart-scales-measure-body-fat",
		title: "How accurately do smart scales measure body fat?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Many smart scales measure body weight reasonably well but estimate body fat much less precisely for an individual. Accuracy differs by device and person. A plausible-looking percentage, or a good group average, can hide a large individual error.",
		stableCore: [
			"Scales infer body composition from electrical measurements and prediction equations rather than directly measuring fat tissue.",
			"Comparisons with reference methods often find wider individual errors than average bias suggests.",
			"Weight accuracy and body-fat accuracy need separate checks; one does not guarantee the other."
		],
		openQuestions: [
			"How well do current consumer models track small changes within the same person?",
			"Which validation populations best represent real users across age and body size?"
		],
		whatWouldChangeMinds: [
			"Independent validation of named current devices showing narrow individual agreement with appropriate reference methods.",
			"Repeat-measure studies demonstrating reliable change detection across normal day-to-day conditions."
		],
		misconceptions: [
			"A high correlation with a reference scan means each person's body-fat reading is accurate."
		],
		editorSummary: "Individual agreement matters more than a convincing average or correlation.",
		population: "Adults in consumer-impedance validation studies, including separate hospital samples and healthy adults.",
		scope: "Compare body-fat estimates and individual agreement with reference body-composition methods; keep weight measurements separate.",
		excludedEvidence: [
			"Validation of older named models does not rank every contemporary smart scale.",
			"Group-average agreement does not establish accuracy for an individual or reliable detection of small changes."
		],
		uncertainty: "Prediction equations, electrode design, hydration, body size and reference methods differ.",
		sources: [sources.smartScaleObservational, sources.consumerImpedanceAccuracy, sources.impedanceFourCompartmentReview]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "health-and-medicine",
		slug: "does-slouching-cause-lower-back-pain",
		title: "Does slouching cause lower-back pain?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Research has not established that slouching by itself causes lower-back pain. Some studies link posture or long, unbroken sitting with pain, while others do not. A position that feels uncomfortable for one person does not define a universally harmful posture.",
		stableCore: [
			"Back pain has several interacting influences, and people may also change how they sit because they already have pain.",
			"A review of 41 reviews found mixed evidence about whether physical exposures precede or cause back pain.",
			"A newer office-worker review found associations involving posture, sitting time and sitting behavior, but associations alone do not settle causation."
		],
		openQuestions: [
			"Which changes in movement or posture prevent pain in particular work settings?",
			"How do symptoms, stress, workload and prior pain change a person's response?"
		],
		whatWouldChangeMinds: [
			"Prospective studies showing a consistent posture-specific effect before pain develops.",
			"Well-controlled prevention trials showing meaningful benefits from a defined posture change."
		],
		misconceptions: [
			"Every person has one correct sitting posture that prevents back pain."
		],
		editorSummary: "Observed posture-pain links do not establish one universal cause or correction.",
		population: "Adults in spinal-posture and physical-exposure research, including office workers.",
		scope: "Distinguish association, reverse causation and prevention evidence for ordinary sitting posture and lower-back pain.",
		excludedEvidence: [
			"Surgical instability, trauma and diagnosed spinal disease are different questions.",
			"A posture that changes current symptoms does not establish the cause of all back pain."
		],
		uncertainty: "Posture definitions, self-reported pain, study design and personal circumstances differ.",
		sources: [sources.postureUmbrella, sources.officePostureScoping]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "do-multivitamins-improve-memory-in-older-adults",
		title: "Do multivitamins improve memory in older adults?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Some randomized research finds a small benefit on memory tests in older adults. The strongest recent results come from related COSMOS studies. They do not establish that multivitamins prevent dementia or reverse brain aging.",
		stableCore: [
			"COSMOS-Web found a modest improvement in immediate word recall compared with placebo.",
			"The later COSMOS synthesis combined nonoverlapping participant subsets, but all three studies belonged to the same parent trial.",
			"The clinic study's global-cognition estimate alone was less certain than its memory result and the combined estimate."
		],
		openQuestions: [
			"Will independent trials reproduce the benefit with different products and populations?",
			"Do small test-score differences translate into better daily functioning or less dementia?"
		],
		whatWouldChangeMinds: [
			"Independent long-term randomized trials showing consistent cognitive and everyday-function benefits.",
			"Reliable evidence that the effect differs by nutritional status rather than applying equally to everyone."
		],
		misconceptions: [
			"An effect described as equivalent to several years of aging means a supplement makes the brain several years younger."
		],
		editorSummary: "A small memory-test benefit and proven dementia prevention are separate outcomes.",
		population: "Older adults in US randomized COSMOS cognitive substudies.",
		scope: "Assess memory and cognitive-test outcomes in older adults, retaining related-study structure and distinct sample denominators.",
		excludedEvidence: [
			"Mortality studies do not answer this cognitive-outcome question.",
			"The full COSMOS-Web sample and its smaller nonoverlapping meta-analysis subset must not be counted as separate independent trials."
		],
		uncertainty: "Clinical importance, independent replication and generalizability beyond the studied older adults remain uncertain.",
		sources: [sources.multivitaminCosmosClinic, sources.multivitaminCosmosWeb]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "sports-nutrition-and-supplements",
		slug: "does-creatine-improve-memory-and-thinking",
		title: "Does creatine improve memory and thinking?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Creatine may help on some cognitive tasks, but a reliable general benefit remains uncertain. Trials are small and varied, and influential pooled results have statistical problems. Its established exercise benefits do not settle the separate cognition question.",
		stableCore: [
			"Cognitive studies measure different outcomes, including memory, test scores and completion time.",
			"A favorable 2024 synthesis pooled several related outcomes from the same participants as though they were independent.",
			"EFSA found a general cognitive benefit unestablished under the assessed conditions, and a later commentary called for a sound reanalysis."
		],
		openQuestions: [
			"Which effects survive analyses that correctly handle related test results?",
			"Do results in older adults or under sleep loss extend to well-rested healthy adults?"
		],
		whatWouldChangeMinds: [
			"Independent, adequately powered trials with prespecified cognitive outcomes and meaningful everyday effects.",
			"A transparent reanalysis that preserves unique participant counts and accounts for correlated tests."
		],
		misconceptions: [
			"Several positive test results from the same small group count as several independent replications."
		],
		editorSummary: "The main dispute concerns how strong and general the cognitive evidence is.",
		population: "Adults in heterogeneous creatine-cognition trials and the population covered by EFSA's cognitive health-claim assessment.",
		scope: "Assess cognitive outcomes separately from exercise performance, with explicit attention to correlated outcomes and corrected score-versus-time wording.",
		excludedEvidence: [
			"Muscle-strength benefits do not demonstrate cognitive benefit.",
			"A translation correction does not resolve the separate double-counting criticism, and regulatory assessment is not a universal safety ruling."
		],
		uncertainty: "Small trials, differing cognitive domains and non-independent pooled outcomes limit confidence.",
		sources: [sources.creatineCognitionMeta, sources.creatineCognitionComment, sources.creatineEfsaOpinion]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "aging-and-longevity",
		slug: "do-collagen-supplements-improve-aging-skin",
		title: "Do collagen supplements improve aging skin?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Some trials report better skin hydration or elasticity, but confidence in a useful benefit is limited. A newer review found that favorable results were concentrated in lower-quality or industry-funded studies. Large, independent trials are still needed.",
		stableCore: [
			"An earlier synthesis found positive average effects on measured hydration and elasticity.",
			"A later review found favorable pooled results overall, but no significant benefit in its higher-quality and non-industry-funded subgroups.",
			"These subgroup results raise concern about bias; they do not prove that every product has no effect or that funding alone caused the difference."
		],
		openQuestions: [
			"Do high-quality independent trials show a visible benefit that people consider worthwhile?",
			"How do products, duration and outcome measurements affect results?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered independent trials with blinded, clinically meaningful skin outcomes.",
			"Consistent benefits across validated measurements and participant-reported improvements."
		],
		misconceptions: [
			"A statistically significant instrument reading guarantees a noticeable anti-aging effect."
		],
		editorSummary: "Study quality and funding patterns weaken the apparent average benefit.",
		population: "Adults in randomized oral-collagen trials measuring skin outcomes.",
		scope: "Assess oral collagen for skin hydration, elasticity and related aging measures, rather than joint symptoms or topical treatments.",
		excludedEvidence: [
			"Collagen's structural role in the body does not establish that a supplement improves skin.",
			"Subgroup nonsignificance does not demonstrate exact equivalence to placebo."
		],
		uncertainty: "Product differences, small trials, overlapping reviews and funding-related patterns limit certainty.",
		sources: [sources.collagenSkin2023Meta, sources.collagenSkinFundingMeta]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "sleep-and-circadian-health",
		slug: "does-tart-cherry-help-people-sleep-better",
		title: "Does tart cherry help people sleep better?",
		band: "mixed",
		certainty: "low",
		bottomLine: "The evidence is mixed. Some small trials find better measured sleep, but people do not consistently report sleeping better. A newer synthesis found no clear overall sleep-quality benefit; its favorable insomnia subgroup was small and preliminary.",
		stableCore: [
			"Earlier pooled results were more favorable for device-measured sleep than for self-reported sleep.",
			"The 2026 review included ten trials with 294 enrolled participants and judged most evidence low or very low certainty.",
			"Products, study populations and sleep outcomes vary, and reviews include overlapping trials."
		],
		openQuestions: [
			"Will larger insomnia trials reproduce the small subgroup signal?",
			"Do consistent objective changes improve how rested people feel or function?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered trials with agreed sleep outcomes, suitable controls and longer follow-up.",
			"Replication showing meaningful benefits across both objective and patient-reported sleep measures."
		],
		misconceptions: [
			"A food containing melatonin is equivalent to an established insomnia treatment."
		],
		editorSummary: "Sleep-measure differences help explain the conflicting headlines.",
		population: "Adults in small tart-cherry sleep trials, including limited insomnia subgroups.",
		scope: "Assess sleep quality and measured sleep parameters, distinguishing them from exercise-recovery outcomes and changes in biomarkers.",
		excludedEvidence: [
			"Exercise-recovery findings do not establish improved sleep.",
			"Two favorable insomnia trials do not establish a reliable effect across all adult populations."
		],
		uncertainty: "Small samples, heterogeneous outcomes and low-certainty subgroup findings leave the practical benefit unsettled.",
		sources: [sources.tartCherrySleepMeta, sources.tartCherryTooSourMeta]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "do-omega-3-supplements-help-with-depression",
		title: "Do omega-3 supplements help with depression?",
		band: "mixed",
		certainty: "low",
		bottomLine: "They may offer a small added benefit for some adults with depression, but reviews disagree about its size and clinical importance. They have not reliably prevented new depression in the general population or been shown equivalent to antidepressants.",
		stableCore: [
			"Cochrane found a small-to-modest average symptom improvement, with low-to-very-low certainty and doubtful average clinical importance.",
			"A later, broader trial synthesis reported more favorable symptom and remission results in people with existing depression.",
			"Differences in patients, formulations and outcomes, plus overlapping studies, help explain why review headlines differ."
		],
		openQuestions: [
			"Which patients, if any, gain a clinically meaningful added benefit?",
			"Do larger low-bias trials reproduce benefits in remission and daily functioning?"
		],
		whatWouldChangeMinds: [
			"Large independent trials with prespecified symptom, remission and function outcomes alongside usual care.",
			"Consistent results separating treatment of existing depression from prevention in the general population."
		],
		misconceptions: [
			"A possible add-on benefit means omega-3 supplements can replace established depression care."
		],
		editorSummary: "Treatment, prevention and replacement of standard care are distinct claims.",
		population: "Adults in randomized omega-3 trials, distinguishing diagnosed depression from general-population prevention.",
		scope: "Assess depressive symptoms, remission and prevention separately; retain uncertainty about clinical importance and comparisons with standard treatment.",
		excludedEvidence: [
			"Observational links between fish intake and mood do not establish supplement efficacy.",
			"Dose-response models and overlapping meta-analyses do not justify individual prescribing or a count of independent replications."
		],
		uncertainty: "Heterogeneous trials, possible bias and differing review inclusion criteria limit certainty about who benefits.",
		sources: [sources.omega3DepressionCochrane, sources.omega3DepressionDoseMeta, sources.omega3DepressionUmbrella]
	}, novemberEverydayHealthEnvironmentResearchCheckedAt)
];
