import type { SeedClaim } from "./claims.js";
import { september2026VisitorDepthClaim as reviewedClaim } from "./claim-expansion-2026-09-visitor-depth-shared.js";

const whoVaccinationExplainer = [
	"consensus_statement",
	"Vaccines and immunization: What is vaccination?",
	"World Health Organization",
	2025,
	"https://www.who.int/news-room/questions-and-answers/item/vaccines-and-immunization-what-is-vaccination",
	"WHO explains how vaccines train immune defenses without requiring people to face the full risks of the disease first."
] as const;

const whoMeaslesFactSheet = [
	"guideline",
	"Measles",
	"World Health Organization",
	2025,
	"https://www.who.int/news-room/fact-sheets/detail/measles",
	"WHO describes measles as highly contagious, documents severe complications, and identifies two vaccine doses and high coverage as the prevention standard."
] as const;

const cdcAntimicrobialResistance = [
	"guideline",
	"About Antimicrobial Resistance",
	"U.S. Centers for Disease Control and Prevention",
	2025,
	"https://www.cdc.gov/antimicrobial-resistance/about/index.html",
	"CDC distinguishes resistant germs from the people or animals they infect and explains how antimicrobial exposure selects resistance."
] as const;

export const september2026VisitorDepthInfectionClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Is catching a vaccine-preventable disease generally a safer way to gain immunity than vaccination?",
		slug: "is-catching-a-vaccine-preventable-disease-generally-a-safer-way-to-gain-immunity-than-vaccination",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. Infection can produce immune memory, but it requires experiencing the disease and its unpredictable risks first. Vaccines aim to create useful protection with a much lower chance of the severe illness, disability, transmission, or death associated with diseases such as measles, tetanus, polio, and rabies. The comparison remains vaccine- and person-specific, but natural infection is not the generally safer route.",
		stableCore: [
			"Both infection and vaccination can stimulate immune memory, but only infection requires the pathogen to cause an infection first.",
			"A disease's complications are part of the price of infection-acquired immunity, not a separate issue.",
			"Vaccine recommendations weigh known benefits and adverse effects for particular ages, risks, doses, and products."
		],
		openQuestions: [
			"How should dose schedules change as population immunity, variants, and product technologies evolve?",
			"Which immune markers best predict durable protection for each pathogen and vaccine platform?"
		],
		whatWouldChangeMinds: [
			"Comparative evidence showing that acquiring a targeted disease causes fewer serious harms than its recommended vaccine in the same eligible population.",
			"A newly identified vaccine harm large enough to reverse the product-specific benefit-risk balance."
		],
		misconceptions: [
			"Natural does not mean harmless; infection is the event vaccines are intended to prevent or soften.",
			"A vaccine does not need to mimic every feature of infection to provide clinically useful protection.",
			"This population conclusion does not erase genuine contraindications or the need to investigate adverse events."
		],
		editorSummary:
			"The relevant choice is not immunity versus no immunity. It is whether to seek protection through a controlled preventive exposure or through the disease and all of its possible consequences.",
		uncertaintySummary:
			"The overall benefit-risk direction is strong for routinely recommended vaccines. Magnitude, duration, rare adverse effects, and contraindications remain product- and population-specific.",
		sources: [
			whoVaccinationExplainer,
			[
				"consensus_statement",
				"Adverse Effects of Vaccines: Evidence and Causality",
				"National Academies of Sciences, Engineering, and Medicine",
				2012,
				"10.17226/13164",
				"Independent review evaluates causal evidence for vaccine adverse events rather than assuming either perfect safety or anecdotal causation."
			],
			[
				"landmark_study",
				"Measles virus infection diminishes preexisting antibodies that offer protection from other pathogens",
				"Science",
				2019,
				"10.1126/science.aay6485",
				"Human immune-repertoire evidence shows that measles infection can remove part of previously acquired antibody memory, illustrating a disease cost beyond the acute episode."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Can a vaccine remain valuable even when breakthrough infections occur?",
		slug: "can-a-vaccine-remain-valuable-even-when-breakthrough-infections-occur",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Few vaccines prevent every infection in every person. A vaccine can still provide substantial value by lowering the chance of infection, severe disease, complications, hospitalization, death, or onward transmission. Breakthrough cases must be compared with outcomes in otherwise similar unvaccinated people, not treated as proof that protection is zero.",
		stableCore: [
			"Vaccine effectiveness is an outcome-specific reduction in risk, not a guarantee that an event never occurs.",
			"Protection against infection and protection against severe disease can differ in strength and duration.",
			"As vaccination coverage rises, vaccinated people can make up a larger share of cases even while each person's risk remains lower."
		],
		openQuestions: [
			"Which schedules and updated formulations best maintain protection as pathogens and immunity change?",
			"How should absolute risk, prior infection, age, and clinical vulnerability shape booster decisions?"
		],
		whatWouldChangeMinds: [
			"Well-controlled evidence showing no meaningful reduction in any patient-important outcome for a recommended vaccine and population.",
			"Evidence that harms exceed the remaining benefits after pathogen or population conditions change."
		],
		misconceptions: [
			"One vaccinated person becoming infected does not measure comparative vaccine effectiveness.",
			"A falling positive-test effect does not automatically erase protection against hospitalization or death.",
			"Breakthrough counts without denominators can reverse the apparent direction of risk."
		],
		editorSummary:
			"The right question is how much a vaccine changes each important outcome, for whom, and for how long. Perfect sterilizing immunity is only one possible form of value.",
		uncertaintySummary:
			"The principle is secure, while effectiveness estimates remain tied to a product, outcome, population, pathogen strain, prior immunity, and time since vaccination.",
		sources: [
			[
				"consensus_statement",
				"Vaccine efficacy, effectiveness and protection",
				"World Health Organization",
				2021,
				"https://www.who.int/news-room/feature-stories/detail/vaccine-efficacy-effectiveness-and-protection",
				"WHO explains why no vaccine is 100% effective and why effectiveness must be interpreted by outcome and real-world context."
			],
			[
				"systematic_review",
				"Correlates of protection induced by vaccination",
				"Clinical and Vaccine Immunology",
				2010,
				"10.1128/CVI.00131-10",
				"Review shows that protective immunity uses pathogen-specific mechanisms and that measurable correlates do not imply absolute protection."
			],
			whoVaccinationExplainer
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Does measles control require consistently very high two-dose vaccination coverage?",
		slug: "does-measles-control-require-consistently-very-high-two-dose-vaccination-coverage",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Measles is so contagious that communities need about 95% coverage with two doses, maintained across neighborhoods and age groups, to prevent sustained transmission and outbreaks. A high national average can still conceal local immunity gaps where measles spreads rapidly after importation.",
		stableCore: [
			"Measles has one of the highest reproduction numbers among human infections.",
			"Two doses close the protection gap left by people who do not respond to the first dose.",
			"Coverage must be timely and geographically even because clusters of susceptible people can sustain outbreaks."
		],
		openQuestions: [
			"Which local outreach and delivery strategies most effectively close persistent coverage gaps?",
			"How should programs identify and protect older cohorts missed by routine schedules?"
		],
		whatWouldChangeMinds: [
			"Sustained elimination in diverse settings at substantially lower verified two-dose coverage without hidden immunity.",
			"Evidence that measles transmissibility or vaccine effectiveness has changed enough to alter the threshold."
		],
		misconceptions: [
			"Ninety-five percent is a population-control target, not a claim that every vaccinated person is protected.",
			"A national percentage cannot reveal every undervaccinated school, neighborhood, or community.",
			"Low case counts can be the result of high coverage rather than evidence that vaccination is no longer needed."
		],
		editorSummary:
			"Measles exploits small immunity gaps. Control depends not only on reaching a high average but on keeping two-dose protection reliably high wherever people mix.",
		uncertaintySummary:
			"The need for very high coverage is well established. Exact outbreak risk varies with contact patterns, immunity from prior infection, dose timing, importations, and local clustering.",
		sources: [
			whoMeaslesFactSheet,
			[
				"guideline",
				"Measles fact sheet: reaching 95% vaccination coverage",
				"WHO Regional Office for Europe",
				2023,
				"https://cdn.who.int/media/docs/librariesprovider2/euro-health-topics/vaccines-and-immunization/measles-factsheet-2023.pdf?download=true&sfvrsn=daafadce_2",
				"WHO Europe states that at least 95% two-dose coverage in every community is needed to prevent outbreaks."
			],
			[
				"systematic_review",
				"The basic reproduction number (R0) of measles: a systematic review",
				"The Lancet Infectious Diseases",
				2017,
				"10.1016/S1473-3099(17)30307-9",
				"Systematic review documents very high and context-dependent measles transmissibility, supporting the unusually demanding immunity threshold."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Does Tdap vaccination during pregnancy protect newborns from pertussis?",
		slug: "does-tdap-vaccination-during-pregnancy-protect-newborns-from-pertussis",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Tdap during each pregnancy transfers maternal antibodies across the placenta and substantially reduces pertussis and severe outcomes during the newborn's most vulnerable first months, before the infant vaccine series can provide full protection. Recommended timing is designed to maximize antibody transfer, not to treat an infection.",
		stableCore: [
			"Young infants have the highest risk of hospitalization and death from pertussis.",
			"Vaccination during pregnancy protects through transferred antibodies and complements, rather than replaces, infant vaccination.",
			"Safety surveillance and comparative studies support routine use during pregnancy."
		],
		openQuestions: [
			"How should timing be optimized for preterm birth risk and different national schedules?",
			"How will changing pertussis strains and vaccine platforms affect duration and magnitude of infant protection?"
		],
		whatWouldChangeMinds: [
			"Replicated studies showing no reduction in infant pertussis or severe disease under current programs.",
			"A reproducible maternal or infant safety signal large enough to outweigh the observed benefit."
		],
		misconceptions: [
			"The recommendation is repeated each pregnancy because transferred antibody protection is temporary and intended for that infant.",
			"Maternal vaccination does not infect the fetus with pertussis.",
			"Cocooning household contacts alone does not provide the same direct early antibody protection."
		],
		editorSummary:
			"Maternal Tdap fills a predictable protection gap: it lends the newborn antibodies during the period when pertussis is most dangerous and the infant series is incomplete.",
		uncertaintySummary:
			"Effectiveness against early infant pertussis is consistently high. Estimates vary with timing, outcome definitions, program uptake, and circulating strains.",
		sources: [
			[
				"guideline",
				"Tdap Vaccination for Pregnant Women",
				"U.S. Centers for Disease Control and Prevention",
				2025,
				"https://www.cdc.gov/pertussis/vaccines/tdap-vaccination-during-pregnancy.html",
				"CDC recommends Tdap during every pregnancy and summarizes antibody transfer, effectiveness, timing, and safety."
			],
			[
				"systematic_review",
				"A systematic review of the burden of pertussis disease in infants and the effectiveness of maternal immunization against pertussis",
				"Expert Review of Vaccines",
				2020,
				"10.1080/14760584.2020.1791092",
				"Systematic review finds strong protection against infant pertussis, hospitalization, and death without evidence of major safety concerns."
			],
			[
				"landmark_study",
				"Effectiveness of Vaccination During Pregnancy to Prevent Infant Pertussis",
				"Pediatrics",
				2017,
				"10.1542/peds.2016-4091",
				"Large observational study estimated high effectiveness against pertussis in infants during the first two months of life."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Does BCG vaccination protect equally well against every form of tuberculosis at every age?",
		slug: "does-bcg-vaccination-protect-equally-well-against-every-form-of-tuberculosis-at-every-age",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. BCG is most consistently protective against severe disseminated and meningeal tuberculosis in young children. Protection against pulmonary tuberculosis in adolescents and adults varies substantially across settings and populations, so countries use BCG according to local TB risk rather than treating it as uniform lifelong protection against every form.",
		stableCore: [
			"BCG's strongest established role is preventing severe childhood tuberculosis.",
			"Effectiveness against pulmonary disease varies with age, geography, exposure, strain, prior mycobacterial sensitization, and study design.",
			"Vaccinated people can still become infected or develop TB and may still need testing and treatment."
		],
		openQuestions: [
			"Which new vaccines or revaccination strategies can add reliable adolescent and adult pulmonary protection?",
			"Which immune and environmental factors explain the geographic variability in BCG performance?"
		],
		whatWouldChangeMinds: [
			"Consistent controlled evidence of equally strong and durable protection across ages, settings, and TB forms.",
			"Evidence that BCG no longer prevents severe childhood TB in populations where it is currently recommended."
		],
		misconceptions: [
			"A variable vaccine is not a useless vaccine when it prevents especially dangerous childhood disease.",
			"A BCG scar does not prove complete current protection.",
			"Policies differ partly because background TB exposure and risk differ, not because countries use incompatible biology."
		],
		editorSummary:
			"BCG is a good example of why vaccine claims need an outcome, age, and setting. Its childhood benefit is much clearer than a claim of universal protection from all pulmonary TB.",
		uncertaintySummary:
			"Protection against severe childhood forms is well supported. Magnitude and duration against infection and adult pulmonary disease are heterogeneous.",
		sources: [
			[
				"guideline",
				"BCG vaccines: WHO position paper",
				"World Health Organization",
				2018,
				"https://www.who.int/teams/immunization-vaccines-and-biologicals/policies/position-papers/bcg/",
				"WHO recommends neonatal BCG in high-burden settings while describing outcome- and setting-specific effectiveness."
			],
			[
				"meta_analysis",
				"Effect of BCG vaccination on childhood tuberculous meningitis and miliary tuberculosis worldwide: a meta-analysis and assessment of cost-effectiveness",
				"The Lancet",
				2006,
				"10.1016/S0140-6736(06)68507-3",
				"Meta-analysis finds substantial protection against severe childhood meningeal and miliary tuberculosis."
			],
			[
				"guideline",
				"Tuberculosis",
				"World Health Organization",
				2025,
				"https://www.who.int/news-room/fact-sheets/detail/tuberculosis",
				"WHO describes pulmonary and extrapulmonary disease, latent infection, global burden, prevention, diagnosis, and treatment."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Can rabies post-exposure prophylaxis prevent disease after an exposure but before symptoms?",
		slug: "can-rabies-post-exposure-prophylaxis-prevent-disease-after-an-exposure-but-before-symptoms",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Prompt wound washing, rabies vaccine, and when indicated rabies immunoglobulin or an approved monoclonal antibody can prevent rabies after an exposure and before symptoms begin. Once clinical symptoms appear, rabies is nearly always fatal, so a possible exposure requires urgent professional assessment rather than waiting to see whether illness develops.",
		stableCore: [
			"Post-exposure prophylaxis works during the interval before virus reaches the central nervous system and symptoms begin.",
			"The regimen depends on the exposure, animal, location, prior vaccination, and public-health assessment.",
			"Thorough immediate wound washing is part of prevention, not a substitute for medical evaluation."
		],
		openQuestions: [
			"How can access, adherence, cold-chain reliability, and biologic supply be improved in high-burden regions?",
			"Which simplified schedules and monoclonal products preserve effectiveness while reducing cost and delay?"
		],
		whatWouldChangeMinds: [
			"Reliable surveillance showing correctly delivered modern prophylaxis routinely fails before symptom onset.",
			"Controlled evidence supporting an equally effective simpler regimen that changes current recommendations."
		],
		misconceptions: [
			"Lack of immediate symptoms does not make a credible rabies exposure safe to watch at home.",
			"Treatment after exposure is preventive and time-sensitive; it is not a cure for established symptomatic rabies.",
			"Not every animal contact has the same risk, so public-health assessment matters."
		],
		editorSummary:
			"Rabies is unusual because decisive prevention remains possible after exposure, but the window closes before symptoms. The practical consensus is to assess and act promptly.",
		uncertaintySummary:
			"Properly delivered prophylaxis is extremely effective. Rare breakthroughs concentrate around delayed, incomplete, or incorrectly administered care and severe exposures.",
		sources: [
			[
				"guideline",
				"Rabies",
				"World Health Organization",
				2024,
				"https://www.who.int/news-room/fact-sheets/detail/rabies",
				"WHO states that prompt wound care, vaccine, and indicated passive immunization prevent rabies before symptoms, which are nearly always fatal."
			],
			[
				"systematic_review",
				"Human rabies despite post-exposure prophylaxis: a systematic review of fatal breakthrough infections after zoonotic exposures",
				"The Lancet Infectious Diseases",
				2023,
				"10.1016/S1473-3099(22)00641-7",
				"Review finds breakthrough deaths rare and commonly associated with delayed, incomplete, or incorrectly delivered prophylaxis or severe exposures."
			],
			[
				"guideline",
				"Rabies vaccines: WHO position paper",
				"World Health Organization",
				2018,
				"https://www.who.int/teams/immunization-vaccines-and-biologicals/policies/position-papers/rabies",
				"WHO position paper defines evidence-based pre- and post-exposure schedules and administration."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Does a positive PCR result always prove that a person is currently infectious?",
		slug: "does-a-positive-pcr-result-always-prove-that-a-person-is-currently-infectious",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. PCR detects target genetic material, which can remain after live, transmissible virus has declined. Infectiousness depends on timing, symptoms, immune status, specimen quality, viral burden, and the pathogen. A positive result can be important evidence of current or recent infection, but it is not by itself a direct culture of replication-competent virus or a universal measure of transmission risk.",
		stableCore: [
			"Nucleic-acid amplification and viral culture answer different laboratory questions.",
			"A PCR threshold is assay- and specimen-dependent and should not be converted into a universal infectiousness cutoff.",
			"Clinical and public-health decisions combine the test with time course and patient context."
		],
		openQuestions: [
			"Which rapid measures best approximate transmission risk for different pathogens and patient groups?",
			"How should prolonged positivity be managed in severely immunocompromised people?"
		],
		whatWouldChangeMinds: [
			"Evidence that every positive molecular result, regardless of timing or host, contains transmissible replication-competent pathogen.",
			"A validated universal molecular cutoff that directly predicts transmission across assays and settings."
		],
		misconceptions: [
			"Not always infectious does not mean a positive result can be ignored.",
			"Failure to grow virus in a laboratory is not perfect proof that real-world transmission is impossible.",
			"Cycle-threshold values from different systems are not automatically comparable."
		],
		editorSummary:
			"PCR is a sensitive detector of genetic material. Interpreting contagiousness requires adding the biological timeline and clinical setting rather than demanding that one test answer every question.",
		uncertaintySummary:
			"The distinction between RNA or DNA detection and viable pathogen is firm. The probability of transmission at a given result and time varies by pathogen, assay, host, and behavior.",
		sources: [
			[
				"guideline",
				"Testing for COVID-19",
				"U.S. Centers for Disease Control and Prevention",
				2025,
				"https://www.cdc.gov/covid/testing/",
				"CDC distinguishes molecular and antigen tests and places results within symptoms, exposure, timing, and repeat-testing decisions."
			],
			[
				"systematic_review",
				"Viral Cultures for Coronavirus Disease 2019 Infectivity Assessment: A Systematic Review",
				"Clinical Infectious Diseases",
				2020,
				"10.1093/cid/ciaa1764",
				"Systematic review compares PCR detection with viral culture and shows that RNA can persist beyond the usual period of recoverable live virus."
			],
			[
				"landmark_study",
				"Relationship of SARS-CoV-2 Antigen and Reverse Transcription PCR Positivity for Viral Cultures",
				"Emerging Infectious Diseases",
				2022,
				"10.3201/eid2803.211747",
				"Longitudinal culture and molecular testing demonstrate that PCR positivity and recoverable infectious virus do not have identical durations."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Can symptoms alone reliably distinguish influenza, COVID-19, and RSV?",
		slug: "can-symptoms-alone-reliably-distinguish-influenza-covid-19-and-rsv",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Influenza, COVID-19, and RSV can all cause fever, cough, fatigue, sore throat, congestion, and breathing problems, and their presentations overlap with other infections. Age, season, exposure, and certain features change probabilities, but testing is often needed when the result will affect treatment, isolation, or care for a high-risk person.",
		stableCore: [
			"No single common symptom reliably identifies one of these viruses in every patient.",
			"Coinfections occur, and absence of a textbook symptom does not rule an infection out.",
			"Test choice and urgency depend on illness severity, timing, local circulation, and whether an actionable treatment window is open."
		],
		openQuestions: [
			"Which multiplex testing strategies improve outcomes enough to justify routine use in different settings?",
			"How should symptom-based triage adapt as variants, immunity, and seasonal circulation change?"
		],
		whatWouldChangeMinds: [
			"Prospective validation of a symptom rule with consistently near-diagnostic accuracy across ages, seasons, variants, and care settings.",
			"Evidence that testing adds no useful treatment, infection-control, or prognostic information when these viruses co-circulate."
		],
		misconceptions: [
			"A sudden onset may suggest influenza but does not prove it.",
			"Loss of taste or smell is not present in every COVID-19 case and has changed across variants.",
			"A clinician's probability judgment is not the same as laboratory confirmation."
		],
		editorSummary:
			"Symptoms narrow the field but rarely name the virus with confidence. Testing becomes most valuable when knowing the cause changes what happens next.",
		uncertaintySummary:
			"Substantial symptom overlap is well established. Diagnostic value varies with current prevalence, age, variant, test timing, and the clinical consequence of an error.",
		sources: [
			[
				"guideline",
				"Diagnosis for Flu",
				"U.S. Centers for Disease Control and Prevention",
				2025,
				"https://www.cdc.gov/flu/testing/index.html",
				"CDC states that symptoms alone cannot establish influenza because other respiratory illnesses can look similar."
			],
			[
				"guideline",
				"Clinical Guidance for Influenza, SARS-CoV-2, and RSV Testing",
				"U.S. Centers for Disease Control and Prevention",
				2025,
				"https://www.cdc.gov/flu/hcp/testing-methods/flu-covid19-detection.html",
				"CDC guidance addresses co-circulation and when separate or multiplex testing can guide care."
			],
			[
				"systematic_review",
				"Signs and symptoms to determine if a patient presenting in primary care or hospital outpatient settings has COVID-19",
				"Cochrane Database of Systematic Reviews",
				2022,
				"10.1002/14651858.CD013665.pub3",
				"Systematic review finds that individual symptoms generally have limited ability to rule COVID-19 in or out."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Does antimicrobial resistance mean a person's body has become resistant to antibiotics?",
		slug: "does-antimicrobial-resistance-mean-a-persons-body-has-become-resistant-to-antibiotics",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. The bacteria, fungi, parasites, or viruses become resistant to medicines, not the patient's body. A person can carry or become infected with a resistant organism, and antibiotic exposure can select resistant strains in their microbiome, but the same person may later have a different infection that remains susceptible to the same drug.",
		stableCore: [
			"Resistance is a heritable or acquired property of a microorganism or pathogen population.",
			"Resistant organisms and resistance genes can spread among people, animals, food, health-care settings, and the environment.",
			"Laboratory susceptibility testing helps match treatment to the organism rather than labeling a person permanently resistant."
		],
		openQuestions: [
			"Which interventions best reduce selection and transmission across human, animal, and environmental systems?",
			"How can rapid diagnostics guide earlier narrow treatment without delaying urgent care?"
		],
		whatWouldChangeMinds: [
			"Biological evidence that antimicrobial treatment failure generally results from a durable change in the patient's own tissues rather than the target organism.",
			"Evidence that microbial susceptibility no longer predicts whether an antimicrobial can inhibit the infection."
		],
		misconceptions: [
			"Needing a different antibiotic does not mean the person's body has become immune to medicine.",
			"Stopping unnecessary use helps populations and individuals but cannot make resistance disappear instantly.",
			"Resistance can arise and spread even when an individual patient took a prescribed course correctly."
		],
		editorSummary:
			"The wording matters because it points to the mechanism. Microbes evolve under selection and move between hosts; patients experience the consequences.",
		uncertaintySummary:
			"The mechanism is foundational microbiology. The uncertain pieces are which organism is present, its current susceptibility, and how resistance will spread in a particular setting.",
		sources: [
			cdcAntimicrobialResistance,
			[
				"guideline",
				"Antimicrobial resistance",
				"World Health Organization",
				2023,
				"https://www.who.int/news-room/fact-sheets/detail/antimicrobial-resistance",
				"WHO explicitly states that microorganisms, not people or animals, become antimicrobial-resistant."
			],
			[
				"systematic_review",
				"Global burden of bacterial antimicrobial resistance in 2019: a systematic analysis",
				"The Lancet",
				2022,
				"10.1016/S0140-6736(21)02724-0",
				"Global analysis estimates deaths associated with and attributable to bacterial resistance across pathogens, syndromes, and drug classes."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "infection-immunity-and-vaccines",
		title: "Do antibiotic stewardship programs improve prescribing without increasing deaths?",
		slug: "do-antibiotic-stewardship-programs-improve-prescribing-without-increasing-deaths",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Generally yes. Hospital stewardship interventions improve whether, when, and how long antibiotics are prescribed and can reduce use and some resistant infections without increasing mortality. Stewardship is not indiscriminate restriction: effective programs preserve prompt treatment for serious bacterial illness while reviewing diagnosis, drug choice, dose, route, and duration as evidence arrives.",
		stableCore: [
			"Audit with feedback, prescribing rules, decision support, and targeted restriction can improve guideline-concordant use.",
			"Across controlled hospital studies, improved prescribing has not produced an overall mortality penalty.",
			"Local microbiology, staffing, rapid diagnostics, and implementation quality determine which bundle works best."
		],
		openQuestions: [
			"Which stewardship approaches are most effective in outpatient, long-term-care, veterinary, and resource-limited settings?",
			"How can programs measure patient outcomes and resistance while avoiding delay or undertreatment?"
		],
		whatWouldChangeMinds: [
			"High-quality comparative evidence that stewardship consistently increases severe outcomes or mortality when implemented as recommended.",
			"Evidence that improved prescribing produces no meaningful use, resistance, safety, or cost benefit."
		],
		misconceptions: [
			"Stewardship does not mean refusing antibiotics to every sick patient.",
			"Using the shortest effective course is not the same as stopping treatment arbitrarily.",
			"Fewer antibiotic days are valuable only when paired with safe clinical outcomes."
		],
		editorSummary:
			"Good stewardship makes antibiotic treatment more precise. Its safety comes from clinical reassessment and evidence-based targeting, not from a simple quota to prescribe less.",
		uncertaintySummary:
			"Hospital evidence is strong for prescribing improvement and no overall mortality increase. Effects on resistance and transferability vary by setting, pathogen ecology, intervention, and follow-up.",
		sources: [
			[
				"guideline",
				"Core Elements of Hospital Antibiotic Stewardship Programs",
				"U.S. Centers for Disease Control and Prevention",
				2025,
				"https://www.cdc.gov/antibiotic-use/hcp/core-elements/",
				"CDC defines accountable, pharmacy-supported programs built around action, tracking, reporting, education, and patient safety."
			],
			[
				"systematic_review",
				"Interventions to improve antibiotic prescribing practices for hospital inpatients",
				"Cochrane Database of Systematic Reviews",
				2017,
				"10.1002/14651858.CD003543.pub4",
				"Cochrane review finds stewardship increases policy-compliant treatment and reduces duration without increasing mortality."
			],
			[
				"meta_analysis",
				"Effect of antibiotic stewardship on the incidence of infection and colonisation with antibiotic-resistant bacteria and Clostridium difficile infection: a systematic review and meta-analysis",
				"The Lancet Infectious Diseases",
				2017,
				"10.1016/S1473-3099(17)30325-0",
				"Meta-analysis associates stewardship with lower incidence of several resistant organisms and C difficile, especially alongside infection control."
			]
		]
	})
];
