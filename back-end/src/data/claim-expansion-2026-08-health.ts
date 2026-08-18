import type { SeedClaim } from "./claims.js";
import { august2026ReviewedClaim as reviewedClaim } from "./claim-expansion-2026-08-shared.js";

export const august2026HealthClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do statins cause dementia or lasting cognitive decline?",
		slug: "do-statins-cause-dementia-or-lasting-cognitive-decline",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"The best evidence does not show that statins cause dementia or meaningful lasting cognitive decline. Rare memory or confusion reports have usually been nonserious and reversible after changing or stopping treatment. Observational studies often associate statin use with lower dementia risk, but that does not prove statins prevent dementia.",
		stableCore: [
			"Randomized trials have not found a meaningful adverse effect of statins on overall cognition.",
			"Large observational syntheses do not show increased dementia risk among statin users, although healthier-user and prescribing differences limit causal interpretation.",
			"Postmarketing cognitive symptoms are described as rare, generally reversible, and not a progressive dementia syndrome.",
			"People taking statins for cardiovascular prevention should discuss symptoms or medication changes with a clinician rather than stopping treatment on their own."
		],
		openQuestions: [
			"Which uncommon patients are most susceptible to short-lived cognitive symptoms, and do dose, drug properties, or interactions matter?",
			"Can adequately powered randomized trials establish whether any statin regimen changes dementia incidence rather than only showing an absence of cognitive harm?"
		],
		whatWouldChangeMinds: [
			"Replicated randomized evidence showing persistent cognitive decline attributable to statin treatment.",
			"A consistent dose-response signal for dementia that survives strong control for cardiovascular risk, health-care access, and prescribing differences."
		],
		misconceptions: [
			"A reversible episode of forgetfulness is not the same outcome as dementia.",
			"An observational association with lower dementia risk does not prove that prescribing a statin prevents dementia.",
			"The absence of population-level cognitive harm does not mean every reported symptom should be dismissed."
		],
		editorSummary:
			"This is a reassuring safety conclusion, not a dementia-treatment claim. Randomized cognitive data and very large observational syntheses point away from lasting harm, while rare reversible symptoms remain a legitimate reason for an individualized medication review.",
		uncertaintySummary:
			"Confidence is high that statins do not cause a common progressive cognitive disorder. The frequency and mechanism of rare reversible symptoms, and whether statins have any causal protective effect against dementia, remain less certain.",
		sources: [
			{
				kind: "guideline",
				title: "Lipitor (atorvastatin calcium) approval package and cognitive adverse-event labeling",
				publisher: "U.S. Food and Drug Administration",
				year: 2012,
				url: "https://www.accessdata.fda.gov/drugsatfda_docs/nda/2012/020702s060.pdf",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Regulatory source describing rare postmarketing memory and confusion reports as generally nonserious and reversible rather than a progressive dementia signal.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Do Statins Impair Cognition? A Systematic Review and Meta-Analysis of Randomized Controlled Trials",
				publisher: "Journal of General Internal Medicine",
				year: 2015,
				url: "https://consensus.app/papers/do-statins-impair-cognition-a-systematic-review-and-ott-richardson/dc8d6a8acef45eda8445d3a081a4f91c/",
				doi: "10.1007/s11606-014-3115-3",
				appraisal: "high",
				stance: "supports",
				note: "Randomized-trial synthesis finding no significant adverse effect of statin therapy on cognition in cognitively healthy participants or people with Alzheimer's disease.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Statin use and dementia risk: A systematic review and updated meta-analysis",
				publisher: "Alzheimer's & Dementia: Translational Research & Clinical Interventions",
				year: 2025,
				url: "https://consensus.app/papers/statin-use-and-dementia-risk-a-systematic-review-and-westphal-buss/ee237a45c6cc5bcd9113cdfa6f85426f/",
				doi: "10.1002/trc2.70039",
				appraisal: "moderate",
				stance: "supports",
				note: "Updated synthesis of 55 observational studies and more than seven million patients finding no increased dementia risk and an association with lower risk; residual confounding prevents a prevention claim.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Does the newborn vitamin K injection prevent dangerous bleeding, and is it safe?",
		slug: "does-the-newborn-vitamin-k-injection-prevent-dangerous-bleeding-and-is-it-safe",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. A vitamin K injection after birth is highly effective at preventing vitamin K deficiency bleeding, including delayed bleeding in the brain or intestines that can occur without warning. Serious harms from the injection are very rare, and the historical claim that it causes childhood cancer has not held up in later studies.",
		stableCore: [
			"Newborns begin life with low vitamin K stores, and breast milk alone supplies only small amounts.",
			"A single intramuscular dose protects against early, classic, and late vitamin K deficiency bleeding more reliably than no prophylaxis or incomplete oral regimens.",
			"Late bleeding can occur in apparently healthy infants and often involves the brain.",
			"Subsequent studies have not replicated the early 1990s cancer signal that prompted concern."
		],
		openQuestions: [
			"Which oral schedules can approach injection-level protection where an injection is declined, and how reliably are all doses completed?",
			"How can clinicians communicate a rare but severe risk before birth, when families have more time to consider the evidence?"
		],
		whatWouldChangeMinds: [
			"Reliable surveillance showing a serious causal harm from intramuscular vitamin K comparable to the bleeding it prevents.",
			"Large comparative evidence showing an oral regimen with equally durable protection and dependable real-world completion."
		],
		misconceptions: [
			"The injection is a vitamin dose, not a vaccine.",
			"A healthy-looking newborn can still develop delayed vitamin K deficiency bleeding.",
			"Waiting for visible bleeding is unsafe because intracranial bleeding can be the first sign."
		],
		editorSummary:
			"This is one of the clearest newborn-prevention decisions: a one-time injection prevents a rare but potentially catastrophic event, while decades of follow-up have not substantiated the proposed cancer risk.",
		uncertaintySummary:
			"The direction and large preventive effect are high-confidence. Uncertainty mainly concerns the comparative performance and adherence of alternative oral schedules, not whether prophylaxis is needed.",
		sources: [
			{
				kind: "guideline",
				title: "Frequently Asked Questions About Vitamin K Deficiency Bleeding",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/vitamin-k-deficiency/faq/index.html",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Current U.S. public-health guidance explaining the biological risk, the protection from the birth injection, and the lack of a replicated childhood-cancer association.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Vitamin K and the Newborn Infant",
				publisher: "American Academy of Pediatrics",
				year: 2022,
				url: "https://pubmed.ncbi.nlm.nih.gov/35190810/",
				doi: "10.1542/peds.2021-056036",
				pmid: "35190810",
				appraisal: "high",
				stance: "supports",
				note: "Clinical policy statement reaffirming intramuscular prophylaxis and reviewing late bleeding, oral alternatives, and safety concerns.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Vitamin K prophylaxis for prevention of vitamin K deficiency bleeding: a systematic review",
				publisher: "Journal of Perinatology",
				year: 2016,
				url: "https://consensus.app/papers/vitamin-k-prophylaxis-for-prevention-of-vitamin-k-sankar-chandrasekaran/5bddcef9cb2954c9b9c83eb6fbb00d1d/",
				doi: "10.1038/jp.2016.30",
				appraisal: "high",
				stance: "supports",
				note: "Systematic review finding strong protection against late vitamin K deficiency bleeding from intramuscular prophylaxis, while documenting weaker evidence for single-dose oral regimens.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Does fecal microbiota transplantation work for recurrent C. difficile infection?",
		slug: "does-fecal-microbiota-transplantation-work-for-recurrent-c-difficile-infection",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"For selected patients with recurrent Clostridioides difficile infection after standard antibiotics, properly screened fecal microbiota-based therapy substantially improves the chance of sustained resolution. It is a regulated clinical treatment with donor-screening and infection-transmission risks, not a general-purpose microbiome cleanse or proven treatment for unrelated conditions.",
		stableCore: [
			"Randomized and observational evidence consistently finds higher sustained resolution rates for recurrent C. difficile infection than antibiotic treatment alone.",
			"Current gastroenterology guidance recommends microbiota-based therapy for many immunocompetent adults after recurrent infection, with important exceptions for severe immunocompromise.",
			"Donor and product screening are essential because bacteria, viruses, and antimicrobial-resistant organisms can be transmitted.",
			"Evidence for inflammatory bowel disease, irritable bowel syndrome, obesity, or wellness uses is not equivalent to the recurrent-infection evidence."
		],
		openQuestions: [
			"Which delivery method, preparation, and timing provide the best balance of recurrence prevention, burden, and safety?",
			"How should treatment be tailored for children, pregnancy, severe immunocompromise, and fulminant infection?"
		],
		whatWouldChangeMinds: [
			"Large modern trials finding no sustained-resolution advantage over optimized standard care.",
			"Safety surveillance showing transmission or other serious harms that outweigh the reduction in recurrent infection under current screening protocols."
		],
		misconceptions: [
			"Evidence for recurrent C. difficile does not validate do-it-yourself transplantation.",
			"A donor who appears healthy is not necessarily free of transmissible pathogens.",
			"A treatment can be effective while still resting on low- or moderate-certainty evidence for particular products and patient groups."
		],
		editorSummary:
			"The clinical signal for recurrent C. difficile is substantial, but the boundary matters: use screened products under medical oversight after standard therapy, and do not generalize the result to commercial or home microbiome interventions.",
		uncertaintySummary:
			"Effectiveness is supported across evidence types, although certainty varies by product, route, recurrence history, and immune status. Rare infectious harms and evolving regulation justify continued surveillance.",
		sources: [
			{
				kind: "guideline",
				title: "Fecal microbiota-based therapies for select gastrointestinal diseases",
				publisher: "American Gastroenterological Association",
				year: 2024,
				url: "https://gastro.org/clinical-guidance/fecal-microbiota-based-therapies-for-select-gastrointestinal-diseases/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Current guideline conditionally recommending microbiota-based therapy after standard antibiotics for recurrent infection in immunocompetent adults and defining groups where use is not advised.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Faecal microbiota transplantation for recurrent Clostridioides difficile infection: An updated systematic review and meta-analysis",
				publisher: "EClinicalMedicine",
				year: 2020,
				url: "https://consensus.app/papers/faecal-microbiota-transplantation-for-recurrent-baunwall-lee/2a317d328b6f544396be3b66dd6ec8ea/",
				doi: "10.1016/j.eclinm.2020.100642",
				appraisal: "high",
				stance: "supports",
				note: "Updated synthesis finding high overall effectiveness, with repeated administration and lower-gastrointestinal delivery often producing the strongest results.",
				order: 2
			},
			{
				kind: "context",
				title: "Safety alert: risk of serious adverse events likely due to transmission of pathogenic organisms through fecal microbiota transplantation",
				publisher: "U.S. Food and Drug Administration",
				year: 2020,
				url: "https://www.fda.gov/safety/medical-product-safety-information/fecal-microbiota-transplantation-safety-alert-risk-serious-adverse-events-likely-due-transmission",
				appraisal: "high",
				stance: "context",
				note: "Regulatory safety evidence documenting pathogen transmission and reinforcing why donor screening, informed consent, and clinical controls are indispensable.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do simple febrile seizures usually cause brain damage or lasting developmental problems?",
		slug: "do-simple-febrile-seizures-usually-cause-brain-damage-or-lasting-developmental-problems",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Simple febrile seizures are frightening but usually do not cause brain damage, intellectual disability, or lasting developmental problems. They can recur, and children have a modestly higher later epilepsy risk than children without febrile seizures, but that association does not show that a brief simple seizure damaged the brain. Prolonged, focal, repeated, or otherwise atypical seizures need separate evaluation.",
		stableCore: [
			"A simple febrile seizure is generalized, lasts less than 15 minutes, and occurs only once in a 24-hour period in an otherwise neurologically healthy young child.",
			"Long-term developmental and cognitive outcomes after simple febrile seizures are generally reassuring.",
			"Recurrence is common enough to discuss, but most children outgrow febrile seizures by school age.",
			"Complex or prolonged seizures, serious infection signs, or a first seizure warrant prompt medical assessment rather than reassurance from a web page."
		],
		openQuestions: [
			"How much of the later epilepsy association reflects shared genetic or developmental susceptibility rather than an effect of the febrile seizure itself?",
			"Which children with complex features benefit from imaging, electroencephalography, or closer neurological follow-up?"
		],
		whatWouldChangeMinds: [
			"Prospective evidence showing consistent structural injury or developmental decline after brief, well-characterized simple febrile seizures.",
			"A replicated intervention showing that preventing simple recurrences improves long-term cognition or development enough to outweigh treatment harms."
		],
		misconceptions: [
			"A dramatic-looking seizure is not automatically evidence of brain injury.",
			"An elevated later epilepsy risk does not establish that the febrile seizure caused epilepsy.",
			"Reassurance about simple febrile seizures does not apply to a seizure lasting five minutes or more without an emergency plan, focal symptoms, repeated seizures, or signs of meningitis."
		],
		editorSummary:
			"The durable message is reassurance with a careful boundary: brief, generalized, one-time febrile seizures usually have a benign developmental prognosis, while complex or prolonged events are a different clinical question.",
		uncertaintySummary:
			"The benign prognosis of well-defined simple febrile seizures is high-confidence. Risk prediction and optimal testing are less certain for children whose events fall outside that definition.",
		sources: [
			{
				kind: "systematic_review",
				title: "Febrile Seizures: A Systematic Review of Different Guidelines",
				publisher: "Pediatric Neurology",
				year: 2024,
				url: "https://consensus.app/papers/febrile-seizures-a-systematic-review-of-different-capuano-bardi/1748c13248a65ffcb181a3cd90dd8dce/",
				doi: "10.1016/j.pediatrneurol.2024.03.024",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Cross-guideline synthesis showing broad agreement on the definition, generally benign course, and limited testing needed for simple febrile seizures.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Are brief febrile seizures benign? A systematic review and narrative synthesis",
				publisher: "Epilepsia",
				year: 2023,
				url: "https://consensus.app/papers/are-brief-febrile-seizures-benign-a-systematic-review-ivan-bickle/3180bb322cb55bc0987cc96f654d7642/",
				doi: "10.1111/epi.17720",
				appraisal: "high",
				stance: "supports",
				note: "Outcome-focused synthesis finding the evidence broadly reassuring for cognition and behavior after brief febrile seizures while identifying limitations in older studies.",
				order: 2
			},
			{
				kind: "context",
				title: "Epilepsy and Seizures",
				publisher: "National Institute of Neurological Disorders and Stroke",
				year: 2026,
				url: "https://www.ninds.nih.gov/health-information/disorders/epilepsy-and-seizures",
				appraisal: "high",
				stance: "context",
				note: "Neurological context distinguishing provoked seizures from epilepsy and explaining when prolonged or recurrent seizures require urgent care.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do routine general health checks reduce deaths in otherwise healthy adults?",
		slug: "do-routine-general-health-checks-reduce-deaths-in-otherwise-healthy-adults",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Inviting otherwise healthy adults to broad, untargeted packages of routine health checks has not reduced overall or cardiovascular mortality in randomized trials. That result does not argue against primary care, recommended vaccines and screening, risk-factor follow-up, or testing prompted by symptoms; it argues against assuming that more indiscriminate testing automatically improves outcomes.",
		stableCore: [
			"Large randomized evidence finds little or no effect of general health checks on total, cardiovascular, or cancer mortality.",
			"Checkups can increase diagnoses and treatment without necessarily improving the outcomes that matter most.",
			"Targeted preventive services based on age, risk, and evidence are different from one-size-fits-all multi-test packages.",
			"An ongoing relationship with primary care can still support vaccination, counseling, medication review, and timely evaluation of symptoms."
		],
		openQuestions: [
			"Which focused components of a preventive visit improve patient-centered outcomes when delivered to underserved or high-risk populations?",
			"Can newer risk-stratified approaches deliver benefits without the false positives and overdiagnosis associated with broad testing?"
		],
		whatWouldChangeMinds: [
			"Modern randomized programs showing a reproducible reduction in mortality or major morbidity from broad general health checks beyond usual care.",
			"Evidence that a clearly specified checkup model yields benefits large enough to outweigh overdiagnosis, false positives, anxiety, procedures, and cost."
		],
		misconceptions: [
			"This finding is not a recommendation to avoid doctors until symptoms become severe.",
			"A screening test can detect more disease without reducing deaths if it overdiagnoses harmless findings or if effective care was already available.",
			"Evidence-based screening for a defined population is not the same intervention as a generic annual testing panel."
		],
		editorSummary:
			"The useful distinction is between preventive care and indiscriminate testing. Broad check packages have not delivered the expected mortality benefit, while targeted services and continuity of care remain important.",
		uncertaintySummary:
			"Mortality findings are high-certainty for the broad programs studied, many of which predate current risk tools and treatment patterns. Particular modern, targeted models may perform differently and should be evaluated on their own outcomes.",
		sources: [
			{
				kind: "systematic_review",
				title: "General health checks for reducing illness and mortality",
				publisher: "Cochrane",
				year: 2019,
				url: "https://www.cochrane.org/evidence/CD009009_general-health-checks-reducing-illness-and-mortality",
				doi: "10.1002/14651858.CD009009.pub3",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Updated review of 17 randomized trials and 251,891 participants finding no reduction in total or cause-specific mortality from general health checks.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "General health checks in adults for reducing morbidity and mortality from disease: Cochrane systematic review and meta-analysis",
				publisher: "BMJ",
				year: 2012,
				url: "https://consensus.app/papers/general-health-checks-in-adults-for-reducing-morbidity-krogsb%C3%B8ll-j%C3%B8rgensen/d1baa177abf25fd5ac92a0f3ec3ca251/",
				doi: "10.1136/bmj.e7191",
				appraisal: "high",
				stance: "supports",
				note: "Trial synthesis reporting no effect on total, cardiovascular, or cancer mortality while noting increases in some diagnoses.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "General Health Checks in Adult Primary Care: A Review",
				publisher: "JAMA",
				year: 2021,
				url: "https://consensus.app/papers/general-health-checks-in-adult-primary-care-a-review-liss-oh/2ea66c03b34057098c6d6f7610d2337f/",
				doi: "10.1001/jama.2021.6524",
				appraisal: "moderate",
				stance: "context",
				note: "Modern primary-care review separating the lack of mortality benefit from possible gains in selected preventive services, patient experience, and risk-factor detection.",
				order: 3
			}
		]
	})
];
