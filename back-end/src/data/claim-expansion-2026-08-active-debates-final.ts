import type { SeedClaim } from "./claims.js";
import {
	august2026EncyclopediaTrancheFiveSourcedClaim as reviewedClaim,
	encyclopediaDoiSources as sources
} from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026ActiveDebatesFinalClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Does ultra-processing harm health beyond a food's nutrient profile?",
		slug: "does-ultra-processing-harm-health-beyond-a-foods-nutrient-profile",
		consensusBand: "mixed",
		confidenceScore: 67,
		evidenceCertainty: "low",
		bottomLine:
			"High intake of foods classified as ultra-processed is consistently associated with poorer health, and one tightly controlled feeding trial found greater calorie intake and weight gain on an ultra-processed diet. How much risk comes from processing itself rather than energy density, texture, palatability, additives, food structure, and overall nutrient quality remains unsettled.",
		stableCore: [
			"Prospective syntheses link higher ultra-processed-food intake with multiple adverse outcomes, but most disease evidence is observational.",
			"The inpatient randomized trial established that two offered diets led to different intake and weight over two weeks; it did not isolate one processing mechanism or long-term disease.",
			"The NOVA category contains nutritionally diverse foods, so category-level advice can both capture useful patterns and blur important differences."
		],
		openQuestions: [
			"Which properties of particular ultra-processed foods causally alter intake, metabolism, microbiota, or disease risk?",
			"Does the classification improve prediction and dietary guidance beyond nutrient profile, energy density, and food-group pattern?"
		],
		whatWouldChangeMinds: [
			"Long randomized diets matched on plausible mediators showing an independent clinically important processing effect.",
			"High-quality cohort and trial evidence showing associations disappear once conventional diet quality and measurement error are addressed."
		],
		misconceptions: [
			"An association across a broad category does not make every item equally harmful.",
			"Matching listed nutrients does not necessarily match texture, eating rate, structure, flavor, or intake.",
			"Debate over classification does not imply that diets rich in minimally processed plants are unsupported."
		],
		editorSummary:
			"The health signal is credible; the active debate concerns causal components, category precision, and whether processing adds information beyond familiar diet-quality measures.",
		uncertaintySummary:
			"Observational confounding, dietary misclassification, a broad exposure category, and very limited long-term randomization prevent a clean independent-processing estimate.",
		sources: sources([
			["systematic_review", "Ultra-processed food exposure and adverse health outcomes: umbrella review of epidemiological meta-analyses", "BMJ", 2024, "10.1136/bmj-2023-077310", "Umbrella review finding numerous adverse associations while grading much of the evidence as observational and low certainty."],
			["landmark_study", "Ultra-Processed Diets Cause Excess Calorie Intake and Weight Gain: An Inpatient Randomized Controlled Trial of Ad Libitum Food Intake", "Cell Metabolism", 2019, "10.1016/j.cmet.2019.05.008", "Controlled crossover trial showing greater spontaneous intake and short-term weight gain under the offered ultra-processed diet."],
			["systematic_review", "Does the concept of ultra-processed foods help inform dietary guidelines, beyond conventional classification systems? NO", "The American Journal of Clinical Nutrition", 2022, "10.1093/ajcn/nqac123", "Evidence-based critique of category definition, mechanisms, and added value beyond conventional nutrition measures.", "debate"]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Have ordinary microplastic exposures been shown to cause human disease?",
		slug: "have-ordinary-microplastic-exposures-been-shown-to-cause-human-disease",
		consensusBand: "unclear",
		confidenceScore: 46,
		evidenceCertainty: "very_low",
		bottomLine:
			"Not yet. Micro- and nanoplastics have been detected in human samples, and laboratory, animal, and emerging observational studies justify concern. But detection is not a diagnosis, exposure measurement is difficult, contamination controls are challenging, and current evidence cannot quantify which everyday exposures cause which human diseases.",
		stableCore: [
			"Human exposure through ingestion and inhalation is real, and particles have been reported in blood, lungs, placenta, and vascular tissue.",
			"Experimental evidence supports plausible inflammatory, oxidative, reproductive, and respiratory mechanisms at some doses.",
			"A recent vascular cohort found a strong association with later events but cannot establish that detected particles caused them."
		],
		openQuestions: [
			"What are valid, standardized measures of particle size, polymer, dose, tissue burden, and laboratory contamination?",
			"Which exposure routes and particle properties produce clinically important effects at real-world human doses?"
		],
		whatWouldChangeMinds: [
			"Prospective replicated human studies with validated exposure measurement, dose-response, and strong confounding control identifying specific outcomes.",
			"Evidence that reported tissue detections and biological effects are predominantly contamination, analytical artifacts, or doses unrelated to human exposure."
		],
		misconceptions: [
			"Finding a particle in tissue does not reveal the size of a health risk.",
			"Hazard at a laboratory dose is not automatically risk at ordinary exposure.",
			"Unproven disease causation does not mean pollution is harmless or that exposure reduction research lacks value."
		],
		editorSummary:
			"Exposure is established and concern is reasonable; disease-specific human causation and risk magnitude remain a frontier.",
		uncertaintySummary:
			"Rapidly evolving assays, contamination risk, inconsistent particle definitions, indirect dose evidence, and sparse prospective cohorts keep certainty very low.",
		sources: sources([
			["systematic_review", "Effects of Microplastic Exposure on Human Digestive, Reproductive, and Respiratory Health: A Rapid Systematic Review", "Environmental Science & Technology", 2024, "10.1021/acs.est.3c09524", "Rapid systematic review integrating human and experimental evidence while identifying major exposure and causal gaps."],
			["landmark_study", "Microplastics and Nanoplastics in Atheromas and Cardiovascular Events", "New England Journal of Medicine", 2024, "10.1056/NEJMoa2309822", "Prospective observational study linking detected particles in carotid plaque with events, without establishing causal attribution."],
			["landmark_study", "Discovery and quantification of plastic particle pollution in human blood", "Environment International", 2022, "10.1016/j.envint.2022.107199", "Analytical study supporting systemic exposure while illustrating the measurement and contamination challenges.", "context"]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Do anti-amyloid drugs provide a clinically meaningful net benefit in early Alzheimer's disease?",
		slug: "do-anti-amyloid-drugs-provide-a-clinically-meaningful-net-benefit-in-early-alzheimers-disease",
		consensusBand: "mixed",
		confidenceScore: 69,
		evidenceCertainty: "moderate",
		bottomLine:
			"Lecanemab and donanemab clearly remove amyloid and modestly slow average decline over about 18 months in selected people with early symptomatic Alzheimer's disease. Whether that difference is noticeable enough to each patient to outweigh infusion burden, monitoring, cost, and brain swelling or bleeding risk remains an active clinical and policy judgment.",
		stableCore: [
			"Large randomized trials show statistically significant slowing, not restoration of lost cognition or a cure.",
			"Amyloid-related imaging abnormalities are common, usually asymptomatic but sometimes serious or fatal, with risk modified by APOE genotype and anticoagulation.",
			"Trial eligibility, biomarker confirmation, specialist capacity, MRI monitoring, comorbidity, and patient priorities limit generalization."
		],
		openQuestions: [
			"How durable are clinical benefits and harms over several years and in patients underrepresented or excluded from trials?",
			"Which patients experience a personally meaningful delay, and how should benefit be communicated against absolute risk and burden?"
		],
		whatWouldChangeMinds: [
			"Long-term pragmatic evidence showing sustained independence, quality-of-life, or caregiver benefit with acceptable serious harm.",
			"Independent reanalysis showing the apparent clinical slowing is not robust, not perceptible, or offset by treatment-related injury."
		],
		misconceptions: [
			"Amyloid removal and cure are not equivalent outcomes.",
			"Statistical significance does not determine whether an average difference matters to a patient.",
			"A modest average can contain different benefit and risk for different eligible people."
		],
		editorSummary:
			"These drugs are genuine disease-modifying therapies with modest average effects and material burdens—not either a cure or an evidence-free approval.",
		uncertaintySummary:
			"Efficacy trials are strong for selected early disease, but minimal clinically important difference, long-term outcomes, external validity, and system-level value remain contested.",
		sources: sources([
			["meta_analysis", "Clinically Important Benefits and Harms of Monoclonal Antibodies Targeting Amyloid for the Treatment of Alzheimer Disease: A Systematic Review and Meta-Analysis", "The Annals of Family Medicine", 2024, "10.1370/afm.3050", "Synthesis weighing average cognitive effects against accepted clinical-importance thresholds and amyloid-related harm."],
			["landmark_study", "Lecanemab in Early Alzheimer's Disease", "New England Journal of Medicine", 2023, "10.1056/NEJMoa2212948", "Phase 3 trial showing slower decline and substantial amyloid removal alongside infusion and imaging-related adverse events."],
			["landmark_study", "Donanemab in Early Symptomatic Alzheimer Disease: The TRAILBLAZER-ALZ 2 Randomized Clinical Trial", "JAMA", 2023, "10.1001/jama.2023.13239", "Phase 3 trial showing modest average slowing and clinically important amyloid-related imaging risks."]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Does long COVID involve measurable biological abnormalities?",
		slug: "does-long-covid-involve-measurable-biological-abnormalities",
		consensusBand: "broad",
		confidenceScore: 83,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes at the group level. Studies report immune, vascular, metabolic, neurologic, autonomic, organ, and viral-persistence abnormalities in subsets of people with long COVID. No single biomarker explains every presentation or serves as a validated routine diagnostic test, and symptom-based definitions include several likely mechanisms.",
		stableCore: [
			"Persistent symptoms after SARS-CoV-2 infection are documented across cohorts and cannot be reduced to one organ or one psychological explanation.",
			"Biomarker studies find recurring signals, but replication, sampling time, acute-severity matching, vaccination, reinfection, and control selection vary.",
			"Normal routine tests do not prove absence of illness, while an abnormal research marker does not automatically identify an effective treatment."
		],
		openQuestions: [
			"Which biological subtypes are reproducible and causally linked to particular symptoms or treatment responses?",
			"Can a validated multimarker or functional test distinguish long COVID from overlapping post-infectious and chronic conditions?"
		],
		whatWouldChangeMinds: [
			"Large harmonized cohorts finding no reproducible biological or functional differences after careful matching and blinded analysis.",
			"Intervention studies showing that correcting a proposed mechanism does not alter the linked symptoms or function."
		],
		misconceptions: [
			"No single diagnostic marker does not mean no biology is involved.",
			"A group-average abnormality need not appear in every patient.",
			"Biological evidence does not establish one universal mechanism or justify every proposed treatment."
		],
		editorSummary:
			"Long COVID has biological evidence and substantial heterogeneity; the frontier is subtype validation, causal mechanism, diagnosis, and treatment—not whether patients can have real post-infectious illness.",
		uncertaintySummary:
			"Definitions, controls, variants, vaccination, reinfection, timing, assay platforms, and small samples make individual biomarkers inconsistent.",
		sources: sources([
			["systematic_review", "Biomarkers in long COVID-19: A systematic review", "Frontiers in Medicine", 2023, "10.3389/fmed.2023.1085988", "Systematic review cataloguing immune, inflammatory, vascular, organ, and other biomarker findings and limitations."],
			["systematic_review", "Long COVID: major findings, mechanisms and recommendations", "Nature Reviews Microbiology", 2023, "10.1038/s41579-022-00846-2", "Broad mechanistic synthesis integrating epidemiology, organ effects, immune dysregulation, persistence, and research needs."],
			["landmark_study", "Development of a Definition of Postacute Sequelae of SARS-CoV-2 Infection", "JAMA", 2023, "10.1001/jama.2023.8823", "Large prospective cohort deriving a symptom-based research definition while demonstrating heterogeneity and lack of a single test."]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Does psychedelic microdosing improve mood or cognition beyond placebo?",
		slug: "does-psychedelic-microdosing-improve-mood-or-cognition-beyond-placebo",
		consensusBand: "mixed",
		confidenceScore: 59,
		evidenceCertainty: "low",
		bottomLine:
			"Controlled studies have not established reliable broad mood or cognitive benefits beyond placebo and expectation. Some low doses produce detectable acute subjective effects, and small studies report mixed outcomes, but popular claims substantially exceed the evidence. Microdosing also carries legal, product-quality, psychiatric, and cardiovascular uncertainties.",
		stableCore: [
			"Observational users often report benefit, but self-selection and expectancy are unusually strong in this context.",
			"Blinded and self-blinded studies commonly find little objective cognitive advantage and substantial placebo contribution.",
			"Microdosing is different from supervised therapeutic trials of full psychedelic doses with psychological support."
		],
		openQuestions: [
			"Do any defined clinical populations benefit from a standardized low-dose regimen over an active placebo?",
			"What are the long-term cardiovascular, psychiatric, tolerance, interaction, and functional effects of repeated dosing?"
		],
		whatWouldChangeMinds: [
			"Well-powered preregistered trials with effective blinding showing durable clinically meaningful mood or cognitive improvement.",
			"Mechanistic and safety evidence identifying a reproducible dose-response and responsive subgroup."
		],
		misconceptions: [
			"Anecdotal enthusiasm cannot separate drug, ritual, expectation, and concurrent lifestyle change.",
			"Sub-perceptual is not a guarantee that a dose has no acute effects or risks.",
			"Evidence for full-dose psychedelic therapy does not validate unsupervised microdosing."
		],
		editorSummary:
			"Microdosing remains an interesting but unproven practice; controlled evidence is much less impressive than testimonials.",
		uncertaintySummary:
			"Small samples, weak blinding, variable drugs and doses, healthy volunteers, short follow-up, and expectancy make modest true effects difficult to resolve.",
		sources: sources([
			["systematic_review", "Microdosing Psychedelics: Current Evidence From Controlled Studies", "Biological Psychiatry: Cognitive Neuroscience and Neuroimaging", 2024, "10.1016/j.bpsc.2024.01.002", "Review of controlled evidence finding limited and inconsistent support for advertised mood and cognitive benefits."],
			["landmark_study", "Self-blinding citizen science to explore psychedelic microdosing", "eLife", 2021, "10.7554/eLife.62878", "Large self-blinding study finding improvements in both microdose and placebo groups consistent with expectancy."],
			["landmark_study", "Microdosing with psilocybin mushrooms: a double-blind placebo-controlled study", "Translational Psychiatry", 2022, "10.1038/s41398-022-02039-0", "Controlled study finding noticeable subjective effects but no evidence supporting broad well-being, creativity, or cognitive gains."]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Does AI-assisted mammography improve screening outcomes beyond detection and workload?",
		slug: "does-ai-assisted-mammography-improve-screening-outcomes-beyond-detection-and-workload",
		consensusBand: "unclear",
		confidenceScore: 54,
		evidenceCertainty: "low",
		bottomLine:
			"AI-assisted reading can reduce radiologist workload and has increased cancer detection without a large short-term false-positive increase in prospective screening studies. Whether it reduces interval cancers or breast-cancer mortality without unacceptable overdiagnosis, subgroup bias, automation error, or loss of expertise requires longer randomized follow-up and external validation.",
		stableCore: [
			"Retrospective test accuracy is not enough to establish better population health or safe implementation.",
			"The MASAI randomized trial supports near-term screening performance and workload benefits in one organized Swedish program.",
			"Algorithm, threshold, workflow, human oversight, imaging technology, prevalence, and population can change the result."
		],
		openQuestions: [
			"Do AI-assisted programs reduce interval cancers, advanced disease, and mortality while controlling overdiagnosis and unnecessary workup?",
			"How stable and equitable is performance across vendors, sites, racial and age groups, breast density, and software updates?"
		],
		whatWouldChangeMinds: [
			"Long randomized follow-up demonstrating better patient outcomes and acceptable harms across external populations.",
			"Evidence that early detection gains mainly represent overdiagnosis, subgroup failure, or displaced workload rather than clinical benefit."
		],
		misconceptions: [
			"Finding more cancers is not automatically the same as saving more lives.",
			"One algorithm's performance does not validate every product or workflow.",
			"Non-inferior short-term screening accuracy does not settle long-term safety."
		],
		editorSummary:
			"AI mammography has crossed from retrospective promise into encouraging prospective evidence; patient-important long-term benefit is the remaining bar.",
		uncertaintySummary:
			"Few prospective randomized programs, short follow-up, vendor specificity, workflow dependence, and limited mortality evidence keep the conclusion emerging.",
		sources: sources([
			["systematic_review", "Use of artificial intelligence for image analysis in breast cancer screening programmes: systematic review of test accuracy", "BMJ", 2021, "10.1136/bmj.n1872", "Review showing promising retrospective accuracy but insufficient prospective evidence for safe program replacement."],
			["landmark_study", "Artificial intelligence-supported screen reading versus standard double reading in the Mammography Screening with Artificial Intelligence trial: a clinical safety analysis", "The Lancet Oncology", 2023, "10.1016/S1470-2045(23)00298-X", "Interim randomized trial showing reduced reading workload and increased detection without a clear false-positive increase."],
			["landmark_study", "Screening performance and characteristics of breast cancer detected in the Mammography Screening with Artificial Intelligence trial", "The Lancet Digital Health", 2025, "10.1016/S2589-7500(24)00267-X", "Subsequent randomized screening analysis characterizing detected cancers while longer outcome follow-up remains necessary."]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Can direct air capture deliver affordable large-scale carbon removal?",
		slug: "can-direct-air-capture-deliver-affordable-large-scale-carbon-removal",
		consensusBand: "unclear",
		confidenceScore: 49,
		evidenceCertainty: "very_low",
		bottomLine:
			"Direct air capture is physically feasible and operating plants remove carbon dioxide, but affordable climate-scale deployment is not yet demonstrated. Net removal requires low-carbon energy, complete lifecycle accounting, transport and durable storage; cost, energy, materials, water, infrastructure, and build rate make it a complement to—not a substitute for—rapid emissions cuts.",
		stableCore: [
			"Capturing dilute atmospheric carbon dioxide is technically possible but thermodynamically and economically demanding.",
			"Integrated-assessment pathways often use removals for residual emissions, but model deployment is not proof that facilities can scale at assumed cost.",
			"Selling captured carbon into short-lived products or using high-emission energy may not deliver durable net-negative emissions."
		],
		openQuestions: [
			"How quickly can independently measured cost, energy, sorbent durability, capture rate, and geologic storage improve at commercial scale?",
			"What policy, monitoring, liability, community-consent, and infrastructure systems can support durable removal without delaying mitigation?"
		],
		whatWouldChangeMinds: [
			"Years of transparent commercial operation demonstrating low lifecycle emissions, durable storage, and steep verified cost decline at megaton-to-gigaton scale.",
			"Operational evidence showing material, energy, water, storage, or cost constraints prevent a meaningful contribution even for residual emissions."
		],
		misconceptions: [
			"Capturing one tonne gross is not necessarily removing one tonne net.",
			"A pilot plant and a gigaton-scale industry are different milestones.",
			"Future removal cannot make continued avoidable emissions consequence-free."
		],
		editorSummary:
			"DAC has crossed the feasibility threshold, not the affordability and scale threshold; evaluate operating data and full carbon accounting rather than announcements.",
		uncertaintySummary:
			"Most large-scale costs and resource needs are modeled or vendor-reported, process designs differ, and public multi-year operating data remain scarce.",
		sources: sources([
			["consensus_statement", "Negative Emissions Technologies and Reliable Sequestration: A Research Agenda", "National Academies Press", 2019, "10.17226/25259", "Independent assessment of DAC energetics, costs, lifecycle boundaries, storage, research needs, and scale constraints."],
			["landmark_study", "A Process for Capturing CO2 from the Atmosphere", "Joule", 2018, "10.1016/j.joule.2018.05.006", "Detailed process and techno-economic analysis demonstrating an engineering pathway while relying on modeled commercial assumptions."],
			["systematic_review", "An inter-model assessment of the role of direct air capture in deep mitigation pathways", "Nature Communications", 2019, "10.1038/s41467-019-10842-5", "Model comparison showing possible climate-system roles and the sensitivity to cost, energy, storage, and policy assumptions."]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Is cultivated meat clearly lower-impact at commercial scale?",
		slug: "is-cultivated-meat-clearly-lower-impact-at-commercial-scale",
		consensusBand: "unclear",
		confidenceScore: 43,
		evidenceCertainty: "very_low",
		bottomLine:
			"Not yet. Cultivated meat could use far less land and avoid many livestock impacts, but its commercial energy, media, purification, facility, waste, and climate footprint is not established. Prospective assessments range from favorable to worse than beef under different production and electricity assumptions, and current laboratory methods are not the promised future process.",
		stableCore: [
			"Environmental results are dominated by hypothetical scale-up choices because a mature commercial industry does not yet supply representative operating data.",
			"Land use is likely to be lower than beef, while energy and greenhouse-gas comparisons are highly sensitive to clean electricity and media purification.",
			"Comparisons must specify the livestock system, product, nutrition, allocation, time horizon, and whether future process improvements are assumed."
		],
		openQuestions: [
			"Can food-grade media, bioreactors, cell density, contamination control, and downstream processing scale with low energy and material demand?",
			"What do audited commercial facilities show per kilogram of nutritionally comparable product under regional electricity systems?"
		],
		whatWouldChangeMinds: [
			"Transparent third-party lifecycle data from sustained commercial production showing robust benefits across realistic boundaries.",
			"Scale-up evidence showing unavoidable pharmaceutical-like purification or energy requirements make impacts consistently higher than efficient livestock or plant alternatives."
		],
		misconceptions: [
			"No slaughter does not automatically mean low carbon or low energy.",
			"A future-process lifecycle model is a scenario, not a factory measurement.",
			"Cultivated meat and plant proteins are different environmental comparisons."
		],
		editorSummary:
			"Cultivated meat has plausible environmental advantages and unresolved scale-up burdens; current lifecycle numbers are conditional scenarios, not a settled footprint.",
		uncertaintySummary:
			"Missing commercial inventories force strong assumptions about media, sterility, energy, yields, capital equipment, co-products, and future electricity.",
		sources: sources([
			["systematic_review", "Ex-ante life cycle assessment of commercial-scale cultivated meat production in 2030", "The International Journal of Life Cycle Assessment", 2023, "10.1007/s11367-022-02128-8", "Prospective assessment finding potential benefits under food-grade scale-up and low-carbon energy assumptions."],
			["landmark_study", "Environmental Impacts of Cultured Meat: A Cradle-to-Gate Life Cycle Assessment", "ACS Food Science & Technology", 2024, "10.1021/acsfoodscitech.4c00281", "Assessment of a current high-purification production pathway finding potentially high energy and warming impacts."],
			["landmark_study", "Climate Impacts of Cultured Meat and Beef Cattle", "Frontiers in Sustainable Food Systems", 2019, "10.3389/fsufs.2019.00005", "Dynamic climate comparison showing results depend on energy emissions, methane, consumption trajectory, and time horizon.", "debate"]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Is stratospheric aerosol injection a proven safe climate solution?",
		slug: "is-stratospheric-aerosol-injection-a-proven-safe-climate-solution",
		consensusBand: "unclear",
		confidenceScore: 38,
		evidenceCertainty: "very_low",
		bottomLine:
			"No. Models and volcanic analogues indicate that reflecting a small fraction of sunlight could cool global average temperature quickly, but deployment has not been tested and would not remove carbon dioxide or stop ocean acidification. Regional rainfall, ozone, ecosystems, health, conflict, unequal impacts, governance, and rapid rebound after termination remain major risks.",
		stableCore: [
			"Solar geoengineering could offset some temperature-driven harms but cannot recreate the climate that would exist without elevated greenhouse gases.",
			"Effects would be geographically uneven and depend on aerosol material, altitude, dose, duration, emissions pathway, and deployment strategy.",
			"Research into feasibility and risk is different from evidence that deployment is safe, governable, or desirable."
		],
		openQuestions: [
			"What regional climate, health, ecological, ozone, and geopolitical outcomes would follow plausible deployment and termination strategies?",
			"Who could authorize, monitor, adjust, compensate, or stop a transboundary intervention, and with what legitimacy?"
		],
		whatWouldChangeMinds: [
			"Robust observations and models sharply narrowing regional harms, termination risk, and intervention uncertainty under credible governance.",
			"Evidence that aerosol processes cannot produce a predictable meaningful temperature response or create unacceptable unavoidable harms."
		],
		misconceptions: [
			"Cooling temperature is not the same as reversing atmospheric carbon dioxide.",
			"Calling for research is not an endorsement of deployment.",
			"A relatively low direct technical cost can coexist with enormous environmental and governance risk."
		],
		editorSummary:
			"SAI is a plausible but unproven climate intervention with potentially fast cooling and unusually large uncertainty, asymmetry, and governance stakes.",
		uncertaintySummary:
			"Evidence comes mainly from models, process studies, and imperfect volcanic analogues; no deployment-scale experiment can establish the full coupled human and Earth-system outcome in advance.",
		sources: sources([
			["consensus_statement", "Reflecting Sunlight: Recommendations for Solar Geoengineering Research and Research Governance", "National Academies Press", 2021, "10.17226/25762", "Independent assessment separating a governed research agenda from deployment and cataloguing physical, social, ethical, and governance risks."],
			["systematic_review", "The Risk of Termination Shock From Solar Geoengineering", "Earth's Future", 2018, "10.1002/2017EF000735", "Analysis of rapid warming risk if a large sustained intervention ends while greenhouse-gas concentrations remain high."],
			["systematic_review", "Sulfur injections for a cooler planet", "Science", 2017, "10.1126/science.aan3317", "Review of aerosol microphysics, delivery assumptions, cooling potential, side effects, and major research gaps."]
		])
	}),
	reviewedClaim({
		topicSlug: "active-debates",
		title: "Are gene-drive mosquitoes proven safe and effective for malaria control at population scale?",
		slug: "are-gene-drive-mosquitoes-proven-safe-and-effective-for-malaria-control-at-population-scale",
		consensusBand: "unclear",
		confidenceScore: 36,
		evidenceCertainty: "very_low",
		bottomLine:
			"No. CRISPR gene drives have suppressed malaria-vector mosquito populations in cages and could become a powerful complement to existing control, but no gene-drive mosquito has demonstrated safe, effective malaria reduction through open population-scale deployment. Resistance, spread, ecology, reversibility, consent, monitoring, and cross-border governance remain unresolved.",
		stableCore: [
			"Laboratory gene drives can bias inheritance and spread traits or suppress caged mosquito populations across generations.",
			"Cage success does not reproduce migration, ecological networks, genetic diversity, seasonal dynamics, evolution, or human behavior in the field.",
			"WHO and National Academies frameworks require phased testing, risk assessment, community engagement, governance, and post-release monitoring."
		],
		openQuestions: [
			"Will drives remain effective amid resistance, diverse wild genomes, migration, ecology, and changing malaria transmission?",
			"What form of community and regional authorization is legitimate for an intervention designed to spread beyond the release site?"
		],
		whatWouldChangeMinds: [
			"Phased transparent field trials demonstrating durable epidemiologic benefit, bounded ecological risk, effective monitoring, and legitimate authorization.",
			"Evidence that resistance, ecological effects, governance, or inability to control spread makes acceptable deployment infeasible."
		],
		misconceptions: [
			"Complete suppression in a cage is not proof of malaria elimination in a region.",
			"A gene drive is not the same as a non-driving genetically modified mosquito release.",
			"Potential public-health benefit does not remove the need for consent, ecological assessment, and cross-border governance."
		],
		editorSummary:
			"Gene drives have compelling laboratory proof of mechanism, while population health effectiveness and responsible field deployment remain frontier questions.",
		uncertaintySummary:
			"No open population-scale epidemiologic evidence exists; wild evolution, ecology, spread, reversibility, monitoring, and governance cannot be resolved by cages alone.",
		sources: sources([
			["consensus_statement", "Gene Drives on the Horizon: Advancing Science, Navigating Uncertainty, and Aligning Research with Public Values", "National Academies Press", 2016, "10.17226/23405", "Independent framework for phased research, ecological risk assessment, public values, and governance before release."],
			["landmark_study", "A CRISPR-Cas9 gene drive system targeting female reproduction in the malaria mosquito vector Anopheles gambiae", "Nature Biotechnology", 2016, "10.1038/nbt.3439", "Laboratory proof of inheritance bias and suppression potential alongside resistance and translation questions."],
			["landmark_study", "A CRISPR-Cas9 gene drive targeting doublesex causes complete population suppression in caged Anopheles gambiae mosquitoes", "Nature Biotechnology", 2018, "10.1038/nbt.4245", "Cage-population demonstration of suppression that establishes mechanism, not open-field safety or malaria outcomes."]
		])
	})
];
