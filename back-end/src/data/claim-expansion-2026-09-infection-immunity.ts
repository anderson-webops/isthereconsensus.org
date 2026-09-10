import type { SeedClaim } from "./claims.js";
import { september2026TrafficClaim as reviewedClaim } from "./claim-expansion-2026-09-shared.js";

export const september2026InfectionImmunityClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Does seasonal influenza vaccination reduce severe flu outcomes?",
		slug: "does-seasonal-influenza-vaccination-reduce-severe-flu-outcomes",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Seasonal influenza vaccination reduces influenza illness and, on average, lowers the risk of hospitalization or other severe outcomes. Protection varies across seasons, age groups, immune status, vaccine products, and how closely circulating viruses match the vaccine, so vaccination is useful risk reduction rather than a guarantee against infection.",
		stableCore: [
			"Influenza vaccine effectiveness changes from season to season and is rarely complete.",
			"Test-negative and other real-world studies generally find protection against medically attended and severe influenza.",
			"Preventing some infections and making some breakthrough cases less severe can both contribute to benefit."
		],
		openQuestions: [
			"Which vaccine platforms and timing strategies best protect older or immunocompromised people?",
			"How much of the measured protection against severe disease is independent of protection against infection?"
		],
		whatWouldChangeMinds: [
			"Well-controlled multi-season evidence consistently finding no reduction in influenza-confirmed severe outcomes.",
			"Evidence that apparent benefits are explained by health-seeking or vaccination-selection bias after strong adjustment."
		],
		misconceptions: [
			"A vaccinated person getting flu does not show that vaccination has no population benefit.",
			"A mismatch season can lower effectiveness without making every vaccine component irrelevant.",
			"Effectiveness against infection and effectiveness against hospitalization are different outcomes."
		],
		editorSummary:
			"Flu vaccination is a recurring, imperfect intervention whose value must be estimated by season and outcome. The evidence supports meaningful average protection, especially against clinically important disease, while resisting claims of either total prevention or total failure.",
		uncertaintySummary:
			"Direction of benefit is supported, but magnitude is moderately uncertain because viruses, products, populations, and study designs change each season.",
		sources: [
			["meta_analysis", "Effectiveness of influenza vaccination to prevent severe disease: a systematic review and meta-analysis of test-negative design studies", "Clinical Microbiology and Infection", 2025, "10.1016/j.cmi.2025.09.023", "Recent synthesis evaluates influenza-confirmed severe outcomes within a design intended to reduce health-care-seeking bias."],
			["meta_analysis", "Real-world effectiveness of seasonal influenza vaccination and age as effect modifier: A systematic review, meta-analysis and meta-regression of test-negative design studies", "Vaccine", 2024, "10.1016/j.vaccine.2024.02.059", "Large synthesis quantifies real-world effectiveness and how it varies with age."],
			["meta_analysis", "Efficacy and effectiveness of influenza vaccines: a systematic review and meta-analysis", "The Lancet Infectious Diseases", 2011, "10.1016/S1473-3099(11)70295-X", "Influential review separates laboratory-confirmed efficacy from broader effectiveness and highlights evidence gaps."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Can vaccination indirectly protect people who are not vaccinated?",
		slug: "can-vaccination-indirectly-protect-people-who-are-not-vaccinated",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. When a vaccine reduces infection, carriage, or infectiousness, vaccinating part of a connected population can lower exposure among others. The size of this indirect protection depends on the pathogen, vaccine, coverage, contact patterns, and how immunity changes over time; there is no single herd-immunity threshold that applies to every disease.",
		stableCore: [
			"Indirect effects have been measured after vaccination programs for several transmissible infections.",
			"Vaccines that mainly prevent severe disease may create less indirect protection than vaccines that strongly reduce infection or carriage.",
			"Coverage is distributed through real contact networks, so national averages can conceal vulnerable local clusters."
		],
		openQuestions: [
			"How should changing immunity, variants, age structure, and assortative contact be incorporated into practical thresholds?",
			"Which vaccination strategies maximize direct and indirect benefits when supply or uptake is limited?"
		],
		whatWouldChangeMinds: [
			"Population interventions repeatedly showing no exposure reduction despite a vaccine substantially reducing infection or carriage.",
			"Transmission models that fail prospectively after accounting for contact structure and changing immunity."
		],
		misconceptions: [
			"Indirect protection is not a force field and does not guarantee safety for every unvaccinated person.",
			"The same percentage cannot be copied from measles to influenza, pneumococcus, or a new variant.",
			"A disease can rebound when immunity wanes or pockets of low coverage remain."
		],
		editorSummary:
			"Herd effects are an observed population phenomenon, not merely a mathematical slogan. Their existence is well supported, while the useful magnitude and coverage target must be estimated for a particular vaccine, pathogen, place, and time.",
		uncertaintySummary:
			"Indirect protection is high-confidence in appropriate settings. Thresholds and effect sizes are conditional and can shift with biology and behavior.",
		sources: [
			["systematic_review", "Systematic review and meta-analysis of indirect protection afforded by vaccinating children against seasonal influenza: implications for policy", "Clinical Infectious Diseases", 2017, "10.1093/cid/cix420", "Review finds evidence that vaccinating children can protect unvaccinated household and community members, with heterogeneous effect sizes."],
			["systematic_review", "Indirect (herd) protection, following pneumococcal conjugated vaccines introduction: A systematic review of the literature", "Vaccine", 2017, "10.1016/j.vaccine.2017.04.032", "Population evidence documents reduced vaccine-type disease among age groups not directly targeted by childhood programs."],
			["context", "Dissecting the indirect effects caused by vaccines into the basic elements", "Human Vaccines & Immunotherapeutics", 2015, "10.1080/21645515.2015.1052196", "Framework explains how study design, coverage, transmission, and interference shape estimates of indirect effects."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Can an influenza vaccine give someone influenza?",
		slug: "can-an-influenza-vaccine-give-someone-influenza",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. Injected influenza vaccines contain inactivated virus or selected viral components and cannot produce influenza infection. The nasal-spray vaccine uses weakened, cold-adapted virus that can cause mild local or systemic symptoms but is designed not to cause ordinary influenza illness in eligible recipients.",
		stableCore: [
			"Inactivated and recombinant influenza vaccines cannot replicate into an influenza infection.",
			"Fever, aches, or fatigue after vaccination reflect short-lived immune responses and are not proof of flu.",
			"People can encounter another respiratory virus, or influenza before protection develops, near the date of vaccination."
		],
		openQuestions: [
			"Which formulations best balance broad protection, durability, tolerability, and ease of delivery?",
			"How can symptom expectations be communicated without dismissing genuine adverse experiences?"
		],
		whatWouldChangeMinds: [
			"Verified recovery of replication-competent wild-type influenza caused by an inactivated or recombinant vaccine.",
			"Reproducible evidence that eligible recipients develop ordinary influenza from the attenuated nasal product at meaningful rates."
		],
		misconceptions: [
			"Feeling briefly unwell after a shot is not the same as acquiring influenza.",
			"Protection takes time to develop, so an illness immediately after vaccination may have begun beforehand.",
			"Flu-like symptoms are caused by many pathogens that influenza vaccines do not target."
		],
		editorSummary:
			"The myth confuses expected immune symptoms and coincidental respiratory illness with vaccine-caused influenza. Vaccine type matters, but none of the recommended products gives an eligible recipient ordinary flu.",
		uncertaintySummary:
			"The biological conclusion is high-confidence. Symptom frequency and rare adverse events differ by product, age, and health status.",
		sources: [
			["systematic_review", "Influenza vaccines: Past, present and future", "Reviews in Medical Virology", 2021, "10.1002/rmv.2243", "Review describes inactivated, live attenuated, recombinant, and newer vaccine platforms and their biological limits."],
			["systematic_review", "Influenza Vaccination Strategies: Comparing Inactivated and Live Attenuated Influenza Vaccines", "Vaccines", 2015, "10.3390/vaccines3020373", "Review distinguishes the live attenuated and inactivated products while assessing protection under strain match and mismatch."],
			["systematic_review", "Influenza vaccines: Evaluation of the safety profile", "Human Vaccines & Immunotherapeutics", 2018, "10.1080/21645515.2017.1423153", "Safety review separates common transient reactions from influenza infection and uncommon serious events."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Can people transmit SARS-CoV-2 before symptoms begin?",
		slug: "can-people-transmit-sars-cov-2-before-symptoms-begin",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. People infected with SARS-CoV-2 can transmit the virus before they notice symptoms, and some never develop recognizable symptoms. Infectiousness often rises around symptom onset, which is why strategies based only on isolating visibly sick people miss part of transmission.",
		stableCore: [
			"Transmission pairs, viral kinetics, and outbreak investigations all support presymptomatic spread.",
			"Asymptomatic and presymptomatic are different: one describes the full course, while the other describes an early stage.",
			"The proportion of transmission occurring before symptoms varies with variants, immunity, behavior, and study method."
		],
		openQuestions: [
			"How do newer variants and repeated immunity alter the timing and duration of infectiousness?",
			"Which testing and ventilation strategies remain most efficient as population behavior changes?"
		],
		whatWouldChangeMinds: [
			"High-resolution transmission studies consistently placing infectious contact only after symptom onset.",
			"Viral culture and epidemiological evidence showing that pre-symptom detections are noninfectious remnants."
		],
		misconceptions: [
			"No symptoms does not necessarily mean no infection or no infectiousness.",
			"Detectable viral RNA does not by itself establish transmission, so multiple evidence types are needed.",
			"Evidence for SARS-CoV-2 should not be copied unchanged to every respiratory virus."
		],
		editorSummary:
			"Presymptomatic transmission explains why symptom screening alone could not contain COVID-19. The exact share has changed across studies and phases of the pandemic, but the route itself is well established.",
		uncertaintySummary:
			"Existence is high-confidence; the current fraction and timing distribution are context-dependent and harder to estimate.",
		sources: [
			["systematic_review", "Occurrence and transmission potential of asymptomatic and presymptomatic SARS-CoV-2 infections: A living systematic review and meta-analysis", "PLOS Medicine", 2020, "10.1371/journal.pmed.1003346", "Living review separates asymptomatic from presymptomatic infection and synthesizes transmission evidence."],
			["landmark_study", "SARS-CoV-2 infection and transmission in educational settings: a prospective, cross-sectional analysis of infection clusters and outbreaks in England", "The Lancet Infectious Diseases", 2020, "10.1016/S1473-3099(20)30882-3", "Large outbreak analysis provides real-world context for transmission around detected cases in educational settings."],
			["systematic_review", "The role of asymptomatic and pre-symptomatic infection in SARS-CoV-2 transmission: a living systematic review", "Clinical Microbiology and Infection", 2021, "10.1016/j.cmi.2021.01.011", "Updated living review concludes that transmission can occur before symptom onset while quantification remains uncertain."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Do face masks usually cause dangerous oxygen or carbon-dioxide changes?",
		slug: "do-face-masks-usually-cause-dangerous-oxygen-or-carbon-dioxide-changes",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Surgical masks, respirators, and common cloth masks can increase warmth, breathing effort, moisture, or discomfort, especially during exertion, but studies generally do not find dangerous oxygen deprivation or carbon-dioxide poisoning during ordinary use by healthy people. Individual medical conditions and unusually strenuous settings can require tailored advice.",
		stableCore: [
			"Mask materials permit gas molecules to pass even while filtering a meaningful share of larger respiratory particles.",
			"Controlled studies generally find little or no clinically important change in oxygen saturation or carbon dioxide in healthy participants.",
			"Discomfort and perceived breathlessness are real experiences even when dangerous gas-exchange impairment is absent."
		],
		openQuestions: [
			"Which designs minimize heat, pressure, and communication burdens during long or high-intensity use?",
			"Which specific cardiopulmonary conditions warrant modified use or clinical supervision?"
		],
		whatWouldChangeMinds: [
			"Consistent controlled evidence of clinically dangerous hypoxemia or hypercapnia during ordinary recommended use.",
			"A dose-response pattern showing common masks trap physiologically hazardous gas concentrations across healthy users."
		],
		misconceptions: [
			"Feeling hot or short of breath does not automatically mean blood oxygen is dangerously low.",
			"A small measurable average change is not the same as poisoning.",
			"Evidence about healthy adults does not eliminate the need for individualized medical accommodations."
		],
		editorSummary:
			"The strongest version of the claim is not supported: ordinary mask use does not generally poison healthy wearers with carbon dioxide or deprive them of oxygen. Comfort, fit, exertion, and particular health needs are still legitimate design and clinical questions.",
		uncertaintySummary:
			"Safety is well supported for ordinary use in healthy populations. Evidence is thinner for some severe conditions, very prolonged wear, and extreme exertion.",
		sources: [
			["meta_analysis", "Effects of Wearing a Mask During Exercise on Physiological and Psychological Outcomes in Healthy Individuals: A Systematic Review and Meta-Analysis", "Sports Medicine", 2022, "10.1007/s40279-022-01746-4", "Exercise synthesis finds increased perceived exertion or discomfort without broadly dangerous cardiorespiratory impairment."],
			["meta_analysis", "The Impact of Ubiquitous Face Masks and Filtering Face Piece Application During Rest, Work and Exercise on Gas Exchange, Pulmonary Function and Physical Performance: A Systematic Review with Meta-analysis", "Sports Medicine - Open", 2021, "10.1186/s40798-021-00388-6", "Review assesses oxygen and carbon-dioxide measures across health and exercise contexts."],
			["meta_analysis", "The influence of N95 and surgical masks on carbon dioxide levels: A comprehensive systematic review and meta-analysis", "Heliyon", 2024, "10.1016/j.heliyon.2024.e36626", "Synthesis finds measurable increases in some settings while distinguishing them from hazardous exposure levels."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Is alcohol-based hand sanitizer always equivalent to washing with soap and water?",
		slug: "is-alcohol-based-hand-sanitizer-always-equivalent-to-washing-with-soap-and-water",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. Alcohol-based hand sanitizer is highly useful against many pathogens and is often preferred when hands are not visibly dirty because it is fast and accessible. Soap and running water are better when hands are visibly soiled or greasy and for pathogens such as norovirus and Clostridioides difficile spores that alcohol does not reliably inactivate or remove.",
		stableCore: [
			"Both approaches reduce hand contamination and infection risk when used correctly in appropriate settings.",
			"Alcohol concentration, full hand coverage, contact time, soil, and pathogen biology affect sanitizer performance.",
			"Soap helps loosen material while running water physically carries contaminants away."
		],
		openQuestions: [
			"Which community interventions produce durable technique and adherence rather than short-term product use?",
			"How should facilities balance pathogen-specific effectiveness, skin tolerance, access, and workflow?"
		],
		whatWouldChangeMinds: [
			"Comparative trials showing alcohol products perform identically to soap and water across visible soil, spores, and non-enveloped viruses.",
			"Mechanistic evidence that recommended sanitizer formulations reliably remove or inactivate the resistant pathogens now treated as exceptions."
		],
		misconceptions: [
			"Sanitizer is not universally inferior; in many clinical moments it improves adherence and is recommended.",
			"A quick splash of either product is not the same as correct technique.",
			"Antibacterial consumer soap is not generally required for effective routine handwashing."
		],
		editorSummary:
			"The right choice is situational rather than ideological. Sanitizer is an effective front-line tool for many everyday and clinical moments, while soap and water retain important advantages when physical removal or pathogen-specific resistance matters.",
		uncertaintySummary:
			"The broad division of use is stable. Exact infection reductions vary with setting, compliance, product, outcome, and circulating pathogens.",
		sources: [
			["meta_analysis", "Soap versus sanitiser for preventing the transmission of acute respiratory infections in the community: a systematic review with meta-analysis and dose-response analysis", "BMJ Open", 2021, "10.1136/bmjopen-2020-046175", "Community synthesis compares soap and sanitizer interventions for acute respiratory infection outcomes."],
			["systematic_review", "Efficacy and effectiveness of hand hygiene-related practices used in community settings for removal of organisms from hands: a systematic review", "BMJ Global Health", 2025, "10.1136/bmjgh-2025-018925", "Review prepared for WHO guidance evaluates benefits, implementation, and evidence limitations outside health-care facilities."],
			["systematic_review", "Efficacy of instant hand sanitizers against foodborne pathogens compared with hand washing with soap and water in food preparation settings: a systematic review", "Journal of Food Protection", 2016, "10.4315/0362-028X.JFP-15-492", "Comparative review finds soap and water more reliable when soil and non-enveloped foodborne viruses limit sanitizer performance."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Are shorter antibiotic courses effective for many common infections?",
		slug: "are-shorter-antibiotic-courses-effective-for-many-common-infections",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, for many specific infections and patients, a shorter evidence-based course works as well as a longer traditional course while reducing antibiotic exposure and sometimes adverse effects. This does not mean stopping whenever symptoms improve: the right duration depends on the diagnosis, drug, source control, immune status, severity, and clinical response.",
		stableCore: [
			"Many older duration conventions were not established by direct shortest-effective-course trials.",
			"Randomized evidence supports shorter courses for several respiratory, urinary, abdominal, bloodstream, and skin infections in selected patients.",
			"Reducing unnecessary exposure can lower adverse events and selection pressure without sacrificing cure."
		],
		openQuestions: [
			"Which biomarkers and clinical criteria can individualize duration safely?",
			"Where do resistant organisms, inadequate source control, immunocompromise, implants, or deep-seated infection require longer treatment?"
		],
		whatWouldChangeMinds: [
			"Diagnosis-specific trials consistently finding higher relapse, complications, or mortality with currently supported shorter regimens.",
			"Evidence that reduced exposure does not lessen adverse effects or ecological resistance pressure."
		],
		misconceptions: [
			"Shorter evidence-based prescribing is not permission to ignore a prescribed plan.",
			"Every infection does not share one correct number of days.",
			"Longer is not automatically safer when treatment itself has harms."
		],
		editorSummary:
			"Antibiotic stewardship has moved from finishing an arbitrary long course toward using the shortest regimen proven effective for the actual condition. The decision remains diagnosis-specific and clinician-guided, not symptom-guided improvisation.",
		uncertaintySummary:
			"Moderate-to-high confidence exists for defined infections and stable patients. Generalization to excluded high-risk groups or complicated disease remains uncertain.",
		sources: [
			["systematic_review", "The evidence base for the optimal antibiotic treatment duration of upper and lower respiratory tract infections: an umbrella review", "The Lancet Infectious Diseases", 2024, "10.1016/S1473-3099(24)00456-0", "Umbrella review evaluates where shorter respiratory regimens retain efficacy and reduce exposure."],
			["meta_analysis", "Shorter Versus Longer Courses of Antibiotics for Infection in Hospitalized Patients: A Systematic Review and Meta-Analysis", "Journal of Hospital Medicine", 2018, "10.12788/jhm.2905", "Hospital-focused synthesis finds comparable outcomes for selected infections while emphasizing diagnosis-specific boundaries."],
			["systematic_review", "Antibiotic duration for common bacterial infections: a systematic review", "JAC-Antimicrobial Resistance", 2024, "10.1093/jacamr/dlae215", "Recent review maps randomized evidence and remaining gaps across common bacterial infections."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Does latent tuberculosis infection always progress to active disease?",
		slug: "does-latent-tuberculosis-infection-always-progress-to-active-disease",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Most people with latent tuberculosis infection never develop active TB and cannot spread TB while the infection remains latent. Without preventive treatment, a commonly cited lifetime progression risk is roughly five to ten percent, but risk is concentrated in the first years after infection and can be far higher with HIV, immune-suppressing treatment, very young age, or other conditions.",
		stableCore: [
			"Latent infection means evidence of immune sensitization without clinical evidence of active, contagious TB disease.",
			"Progression risk is heterogeneous rather than a fixed percentage for every person.",
			"Preventive treatment lowers future active-disease risk after active TB has been excluded."
		],
		openQuestions: [
			"Which biomarkers can identify the minority most likely to progress?",
			"How can shorter preventive regimens improve completion while preserving safety and effectiveness?"
		],
		whatWouldChangeMinds: [
			"Long-term cohorts showing near-universal progression among otherwise low-risk people with latent infection.",
			"Validated diagnostics demonstrating that current latent categories are predominantly undetected active disease."
		],
		misconceptions: [
			"A positive screening test does not by itself diagnose active TB.",
			"Not being contagious while latent does not mean future risk is zero.",
			"The five-to-ten-percent estimate should not be applied unchanged to a recently exposed or immunocompromised person."
		],
		editorSummary:
			"Latent TB is a risk state, not inevitable future disease and not current infectiousness. Screening and preventive treatment are valuable because a smaller high-consequence risk can be reduced, especially in people with identifiable risk factors.",
		uncertaintySummary:
			"The broad natural history is well established. Individual progression prediction remains imprecise and depends strongly on time since infection and host factors.",
		sources: [
			["meta_analysis", "Absolute risk of tuberculosis among untreated populations with a positive tuberculin skin test or interferon-gamma release assay result: systematic review and meta-analysis", "BMJ", 2020, "10.1136/bmj.m549", "Large synthesis quantifies highly variable absolute risk across exposure and clinical groups."],
			["systematic_review", "Screening for latent tuberculosis infection in adults: updated evidence report and systematic review for the US Preventive Services Task Force", "JAMA", 2023, "10.1001/jama.2023.3954", "Evidence review examines screening accuracy, preventive treatment, benefits, and harms."],
			["landmark_study", "Time since infection and risks of future disease for individuals with Mycobacterium tuberculosis infection in the United States", "Epidemiology", 2020, "10.1097/EDE.0000000000001271", "Modeling anchored in epidemiologic data shows that progression risk falls substantially as time since infection increases."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Does antimicrobial resistance move among humans, animals, food, and the environment?",
		slug: "does-antimicrobial-resistance-move-among-humans-animals-food-and-the-environment",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Resistant organisms, resistance genes, antimicrobials, and residues move through connected human, animal, food, wastewater, soil, and water systems. The relative contribution of each route differs by organism and setting, but resistance cannot be controlled reliably by treating hospitals, farms, or the environment as isolated worlds.",
		stableCore: [
			"Antimicrobial use in people and animals creates selection pressure within connected microbial ecosystems.",
			"Genomic, epidemiological, food-chain, and environmental studies document exchange across sectors.",
			"Sanitation, infection prevention, vaccination, stewardship, surveillance, and agricultural practices can all affect resistance."
		],
		openQuestions: [
			"What fraction of clinically important resistance in each region is attributable to particular cross-sector routes?",
			"Which One Health interventions provide the largest benefit per unit of cost and implementation burden?"
		],
		whatWouldChangeMinds: [
			"High-resolution genomic and exposure studies consistently showing clinically relevant resistance remains sealed within sectors.",
			"Intervention evidence showing cross-sector controls have no effect after within-sector antimicrobial use is accounted for."
		],
		misconceptions: [
			"One Health does not mean every resistant infection came directly from a farm animal.",
			"Bacteria become resistant; a person's body does not become immune to antibiotics.",
			"Reducing unnecessary use in one sector does not remove the need for infection prevention and access to effective treatment."
		],
		editorSummary:
			"The connected-system conclusion is strong even though source attribution for a particular infection is difficult. Useful policy therefore combines sector-specific evidence with coordinated surveillance and prevention.",
		uncertaintySummary:
			"Cross-sector movement is high-confidence. Route-specific shares, directionality, and intervention effects are much less certain and vary geographically.",
		sources: [
			["systematic_review", "State of Knowledge on the Acquisition, Diversity, Interspecies Attribution and Spread of Antimicrobial Resistance between Humans, Animals and the Environment: A Systematic Review", "Antibiotics", 2022, "10.3390/antibiotics12010073", "Systematic review synthesizes resistance pathways and evidence across human, animal, and environmental compartments."],
			["systematic_review", "Quantifying drivers of antibiotic resistance in humans: a systematic review", "The Lancet Infectious Diseases", 2018, "10.1016/S1473-3099(18)30296-2", "Review maps antimicrobial use, transmission, sanitation, health systems, trade, and socioeconomic drivers."],
			["context", "Antimicrobial resistance: One Health approach", "Veterinary World", 2022, "10.14202/vetworld.2022.743-749", "One Health review describes interconnected sources and the need for coordinated control."]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Can wastewater surveillance provide early warning of infectious-disease trends?",
		slug: "can-wastewater-surveillance-provide-early-warning-of-infectious-disease-trends",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Measuring pathogen signals in community wastewater can reveal rising or falling infection trends, including infections missed by clinical testing, and can sometimes provide earlier warning than case reports. It is a population surveillance tool, not an individual diagnostic test, and interpretation depends on sewer coverage, sampling, assays, shedding, flow, normalization, and timely reporting.",
		stableCore: [
			"Wastewater aggregates biological signals from many people without requiring each person to seek or obtain a test.",
			"Trend direction is usually more defensible than converting one sample into an exact case count.",
			"Clinical, hospital, genomic, and wastewater indicators are complementary rather than interchangeable."
		],
		openQuestions: [
			"How can methods be standardized across pathogens, sewersheds, laboratories, and changing population flows?",
			"Which decision thresholds produce timely action without overreacting to noisy measurements?"
		],
		whatWouldChangeMinds: [
			"Prospective systems repeatedly failing to track independently measured community trends under adequate sampling.",
			"Evidence that apparent lead time comes mainly from reporting delays or retrospective model tuning rather than the wastewater signal."
		],
		misconceptions: [
			"A sewershed result usually cannot identify which individual is infected.",
			"A positive signal does not translate directly into a precise number of cases.",
			"Communities without centralized sewer coverage can be underrepresented."
		],
		editorSummary:
			"Wastewater earned a durable place in public-health surveillance during COVID-19 because it measures a different slice of community infection than clinical systems. Its value is highest as one calibrated indicator in a multi-source decision system.",
		uncertaintySummary:
			"Trend detection is well supported for several pathogens. Lead time, quantitative calibration, representativeness, and action thresholds remain system-specific.",
		sources: [
			["systematic_review", "Wastewater surveillance to infer COVID-19 transmission: A systematic review", "Science of the Total Environment", 2021, "10.1016/j.scitotenv.2021.150060", "Review synthesizes wastewater trend detection, variant tracking, and major sources of measurement variation."],
			["systematic_review", "The potential of wastewater-based epidemiology as surveillance and early warning of infectious disease outbreaks", "Current Opinion in Environmental Science & Health", 2020, "10.1016/j.coesh.2020.04.006", "Early review describes the population-level early-warning rationale and implementation requirements."],
			["context", "Building national wastewater surveillance for infectious diseases in the United States", "Emerging Infectious Diseases", 2026, "10.3201/eid3213.260301", "Current national-program account explains how wastewater complements clinical surveillance and where coverage and standardization still matter."]
		]
	})
];
