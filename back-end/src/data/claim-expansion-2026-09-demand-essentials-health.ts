import type { DemandEssentialsSourceTuple } from "./claim-expansion-2026-09-demand-essentials-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026DemandEssentialsClaim as reviewedClaim } from "./claim-expansion-2026-09-demand-essentials-shared.js";

const cdcAdultAntibioticGuidance = [
	"guideline",
	"Outpatient Clinical Care for Adults: Antibiotic Prescribing and Use",
	"U.S. Centers for Disease Control and Prevention",
	2025,
	"https://www.cdc.gov/antibiotic-use/hcp/clinical-care/adult-outpatient.html",
	"CDC guidance distinguishes conditions unlikely to benefit from antibiotics from bacterial presentations where treatment is appropriate."
] as const satisfies DemandEssentialsSourceTuple;

const aapFeverReport = [
	"guideline",
	"Fever and Antipyretic Use in Children",
	"American Academy of Pediatrics",
	2011,
	"10.1542/peds.2010-3852",
	"AAP clinical report, reaffirmed with reference updates in 2022, centers comfort and signs of serious illness rather than normalizing temperature or preventing seizures."
] as const satisfies DemandEssentialsSourceTuple;

const niceFeverGuideline = [
	"guideline",
	"Fever in under 5s: assessment and initial management",
	"National Institute for Health and Care Excellence",
	2025,
	"https://www.nice.org.uk/guidance/NG143/chapter/recommendations",
	"NICE uses symptoms and risk signs to guide assessment and states antipyretics do not prevent febrile convulsions."
] as const satisfies DemandEssentialsSourceTuple;

const whoLowBackPainGuideline = [
	"guideline",
	"WHO guideline for non-surgical management of chronic primary low back pain in adults in primary and community care settings",
	"World Health Organization",
	2023,
	"https://www.who.int/publications/i/item/9789240081789",
	"WHO recommends a person-centered package and conditionally includes some physical and needling therapies while emphasizing modest, context-dependent evidence."
] as const satisfies DemandEssentialsSourceTuple;

export const september2026DemandEssentialsHealthClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Must FDA-approved generic medicines match brand-name quality and bioequivalence?",
		slug: "must-fda-approved-generic-medicines-match-brand-name-quality-and-bioequivalence",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. An FDA-approved generic must have the same active ingredient, strength, dosage form, route, intended use, and manufacturing quality and must demonstrate bioequivalence to its reference drug. It may differ in inactive ingredients, appearance, or packaging, and bioequivalence is an accepted range rather than molecular identity. Particular patients or narrow-therapeutic-index drugs can still require monitoring when products change.",
		stableCore: [
			"Generic approval is a regulated equivalence pathway, not permission to sell an untested imitation.",
			"Manufacturing facilities and finished products must meet the same quality standards applied to brand-name medicines.",
			"Inactive ingredients can matter for allergies, tolerability, swallowing, or adherence even when the active medicine is equivalent."
		],
		openQuestions: [
			"Which complex drugs, delivery devices, biologic follow-ons, and narrow-index medicines need additional switching evidence?",
			"How can regulators and health systems detect product-specific manufacturing problems faster without undermining confidence in the entire generic pathway?"
		],
		whatWouldChangeMinds: [
			"Reliable comparative surveillance showing approved generics systematically fail quality or clinical performance standards despite meeting current tests.",
			"Evidence that the accepted bioequivalence framework misses clinically important differences for a defined drug class."
		],
		misconceptions: [
			"Lower price usually reflects competition and avoided repeat development costs, not a lower regulatory quality standard.",
			"Bioequivalence does not mean every pill contains different amounts within an 80-to-125-percent range.",
			"A problem with one manufacturer or lot does not establish that all generic medicines are inferior."
		],
		editorSummary:
			"FDA generics must match the medicine in the ways that drive treatment, while allowing nonclinical differences such as color and fillers. Product-specific exceptions deserve monitoring, not a blanket lower-quality assumption.",
		uncertaintySummary:
			"The approval standard is clear and clinical equivalence is strong for ordinary small-molecule drugs. Complex formulations, patient-specific tolerability, and selected narrow-index products warrant closer attention.",
		sources: [
			[
				"guideline",
				"Generic Drug Facts",
				"U.S. Food and Drug Administration",
				2025,
				"https://www.fda.gov/drugs/generic-drugs/generic-drug-facts",
				"FDA describes the sameness, bioequivalence, quality, manufacturing, labeling, and allowable inactive-ingredient differences required for approval."
			],
			[
				"guideline",
				"Generic Drugs: Questions and Answers",
				"U.S. Food and Drug Administration",
				2025,
				"https://www.fda.gov/drugs/frequently-asked-questions-popular-topics/generic-drugs-questions-answers",
				"FDA answers common misconceptions about cost, approval evidence, variation, and manufacturing oversight."
			],
			[
				"meta_analysis",
				"Clinical Equivalence between Generic Versus Branded Antibiotics: Systematic Review and Meta-Analysis",
				"Antibiotics",
				2023,
				"10.3390/antibiotics12050935",
				"Clinical synthesis generally supports equivalence while identifying heterogeneous and limited evidence for some antibiotic comparisons."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do antibiotics meaningfully help uncomplicated acute bronchitis in otherwise healthy adults?",
		slug: "do-antibiotics-meaningfully-help-uncomplicated-acute-bronchitis-in-otherwise-healthy-adults",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Usually no. Uncomplicated acute bronchitis is most often viral, and antibiotics provide at most a small average reduction in cough or feeling ill while causing adverse effects and contributing to resistance. Evaluation should focus on ruling out pneumonia, pertussis, influenza, COVID-19, or another condition that changes treatment. Colored sputum alone does not establish bacterial infection.",
		stableCore: [
			"Routine antibiotics are not recommended for uncomplicated acute bronchitis in otherwise healthy adults.",
			"Cough commonly lasts two to three weeks, longer than many people expect, even without bacterial disease.",
			"Small average symptom effects must be weighed against nausea, diarrhea, allergic reactions, cost, and antimicrobial resistance."
		],
		openQuestions: [
			"Which rapid clinical or biomarker tools best identify the uncommon patient with a treatable bacterial cause?",
			"Which communication and symptom-management strategies reduce unnecessary prescribing while maintaining safety and trust?"
		],
		whatWouldChangeMinds: [
			"Large modern trials showing clinically important recovery or complication benefits in clearly uncomplicated bronchitis.",
			"A validated test identifying a common antibiotic-responsive subgroup with net benefit."
		],
		misconceptions: [
			"Green or yellow mucus can reflect immune cells and does not by itself prove bacterial infection.",
			"Symptoms improving after antibiotics does not show the medicine caused improvement in a self-limited illness.",
			"Avoiding unnecessary antibiotics does not mean ignoring pneumonia warning signs."
		],
		editorSummary:
			"For straightforward acute bronchitis, time and symptom care usually do more than antibiotics. The clinical job is to identify the exceptions, not medicate every cough.",
		uncertaintySummary:
			"The lack of meaningful average benefit is well supported. Individual uncertainty lies in diagnosis, frailty, comorbidity, and uncommon bacterial causes.",
		sources: [
			[
				"systematic_review",
				"Antibiotics for acute bronchitis",
				"Cochrane Database of Systematic Reviews",
				2017,
				"10.1002/14651858.CD000245.pub4",
				"Review finds limited clinical benefit, roughly half a day less cough on average, alongside more adverse effects and uncertain applicability to frail older adults."
			],
			cdcAdultAntibioticGuidance,
			[
				"guideline",
				"Appropriate Antibiotic Use for Acute Respiratory Tract Infection in Adults: Advice for High-Value Care",
				"Annals of Internal Medicine",
				2016,
				"10.7326/M15-1840",
				"ACP and CDC advice recommends against antibiotics for uncomplicated bronchitis unless pneumonia or another antibiotic-responsive diagnosis is suspected."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do antibiotics routinely help most acute sinus infections?",
		slug: "do-antibiotics-routinely-help-most-acute-sinus-infections",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Most acute rhinosinusitis follows a viral respiratory infection and improves without antibiotics. Antibiotics offer a modest average benefit in clinically diagnosed cases and cause adverse effects, so guidelines reserve them for patterns more suggestive of bacterial disease, such as severe symptoms, persistence without improvement, or worsening after initial recovery. Complications and high-risk patients require separate assessment.",
		stableCore: [
			"Symptoms during the first several days cannot reliably distinguish viral from bacterial sinusitis by mucus color alone.",
			"Watchful waiting is appropriate for many uncomplicated cases when follow-up is available.",
			"Severe eye swelling, vision change, neurologic symptoms, marked systemic illness, or immunocompromise changes the urgency."
		],
		openQuestions: [
			"Which point-of-care tests can identify bacterial disease and likely antibiotic responders accurately?",
			"What watchful-waiting and delayed-prescription strategies best balance symptom burden, complications, and stewardship?"
		],
		whatWouldChangeMinds: [
			"High-quality trials showing large patient-important benefit from routine immediate antibiotics across uncomplicated acute sinus symptoms.",
			"Validated diagnostic criteria demonstrating that most ordinary acute presentations are bacterial and treatment-responsive."
		],
		misconceptions: [
			"Facial pressure and colored drainage do not automatically prove a bacterial infection.",
			"A small average benefit does not mean no individual can benefit.",
			"Avoiding routine antibiotics does not mean delaying care for orbital or neurologic warning signs."
		],
		editorSummary:
			"Most short-lived sinus infections need time and symptom care. Antibiotics are for selected bacterial patterns, not the default response to congestion and colored mucus.",
		uncertaintySummary:
			"Average benefits and harms are well characterized, but diagnosis without direct sinus sampling remains imperfect and evidence is thinner for complicated or high-risk patients.",
		sources: [
			[
				"systematic_review",
				"Antibiotics for acute rhinosinusitis in adults",
				"Cochrane Database of Systematic Reviews",
				2018,
				"10.1002/14651858.CD006089.pub5",
				"Review finds most adults recover without antibiotics, with modest additional cure and more adverse effects among those treated."
			],
			cdcAdultAntibioticGuidance,
			[
				"guideline",
				"Executive Summary: IDSA Clinical Practice Guideline for Acute Bacterial Rhinosinusitis in Children and Adults",
				"Clinical Infectious Diseases",
				2012,
				"10.1093/cid/cir1043",
				"Guideline defines persistent, severe, and double-worsening presentations used to identify likely bacterial disease and guide treatment."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Are ear candles safe and effective for removing earwax?",
		slug: "are-ear-candles-safe-and-effective-for-removing-earwax",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. Ear candles do not create the claimed suction or remove earwax, and candle residue can add material to the canal. Reported harms include burns, blocked canals, eardrum injury, and delayed diagnosis. Evidence-based options depend on symptoms and anatomy and can include observation, softening drops, irrigation in appropriate patients, or removal by a trained clinician.",
		stableCore: [
			"Measurements do not show the negative pressure needed to pull wax from the ear.",
			"Material displayed after burning a candle can come from the candle itself rather than the ear.",
			"A perforated eardrum, ear surgery, tubes, infection, diabetes, anticoagulation, or uncertain diagnosis can make home procedures unsafe."
		],
		openQuestions: [
			"Which self-care instructions and clinical removal methods minimize complications for different patient groups?",
			"How can misleading demonstrations and device marketing be corrected effectively?"
		],
		whatWouldChangeMinds: [
			"Replicated controlled studies demonstrating actual wax removal and net benefit without burns, deposits, or structural injury.",
			"A plausible measured mechanism showing safe pressure or transport from the ear canal."
		],
		misconceptions: [
			"Dark material in a used candle is not proof that toxins or wax left the ear.",
			"Ancient or natural branding does not establish safety near skin, hair, and the eardrum.",
			"Most earwax is protective and does not need removal unless it causes symptoms or blocks examination."
		],
		editorSummary:
			"Ear candling fails both the mechanism and outcome tests while adding a flame and hot wax beside a delicate organ. Use established wax-management options instead.",
		uncertaintySummary:
			"Evidence of efficacy is negative and the injury mechanism is direct. Exact complication rates are uncertain because use and harms are incompletely reported.",
		sources: [
			[
				"guideline",
				"Detention Without Physical Examination of Ear Candles",
				"U.S. Food and Drug Administration",
				2022,
				"https://www.accessdata.fda.gov/cms_ia/importalert_225.html",
				"FDA import alert describes ear candles as unapproved devices promoted without validated evidence and associated with potentially serious injury."
			],
			[
				"guideline",
				"Clinical Practice Guideline (Update): Earwax (Cerumen Impaction)",
				"Otolaryngology-Head and Neck Surgery",
				2017,
				"10.1177/0194599816671491",
				"Professional guideline recommends established cerumen treatments and specifically recommends against ear candling.",
				undefined,
				"corrected"
			],
			[
				"landmark_study",
				"Ear Candles: Efficacy and Safety",
				"The Laryngoscope",
				1996,
				"10.1097/00005537-199610000-00010",
				"Pressure measurements and clinical observation found no suction or wax removal and documented candle-wax deposition and injury reports."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do oral over-the-counter cough and cold medicines help young children, and are they safe?",
		slug: "do-oral-over-the-counter-cough-and-cold-medicines-help-young-children-and-are-they-safe",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"They have not shown reliable benefit in young children and can cause serious harm through side effects, duplicate ingredients, or dosing errors. U.S. products are labeled not to use under age four, and the FDA advises against decongestant- or antihistamine-containing cough and cold products under age two. Fluids, saline, humidified air, and age-appropriate honey for children over one are safer symptom options.",
		stableCore: [
			"Cough and cold combinations often contain several active ingredients, increasing overdose and duplication risk.",
			"Evidence does not show meaningful routine cough relief in young children.",
			"Infants, accidental ingestions, adult formulations, and multiple products containing acetaminophen require particular caution."
		],
		openQuestions: [
			"Which non-drug measures best improve sleep and comfort for specific pediatric respiratory symptoms?",
			"How can packaging and caregiver education most effectively prevent dosing errors and accidental ingestion?"
		],
		whatWouldChangeMinds: [
			"Large pediatric randomized trials showing a clinically important symptom benefit with low serious-harm and dosing-error risk.",
			"A child-specific formulation with validated dosing and a favorable benefit-risk profile."
		],
		misconceptions: [
			"Over the counter does not mean effective or safe for every age.",
			"A sedated child is not necessarily a child with a meaningfully treated cough.",
			"Using several brand names can duplicate the same active ingredient."
		],
		editorSummary:
			"For young children, the benefit is unconvincing and the medication complexity creates preventable risk. Comfort care and attention to warning signs are the safer default.",
		uncertaintySummary:
			"The recommendation against routine use in young children is strong. Evidence varies by ingredient and age, and this page does not cover clinician-directed treatment of a specific diagnosis.",
		sources: [
			[
				"guideline",
				"Should You Give Kids Medicine for Coughs and Colds?",
				"U.S. Food and Drug Administration",
				2024,
				"https://www.fda.gov/consumers/consumer-updates/should-you-give-kids-medicine-coughs-and-colds",
				"FDA summarizes age restrictions, limited benefit, serious adverse effects, ingredient duplication, and safer supportive care."
			],
			[
				"systematic_review",
				"Over-the-counter medications for acute cough in children and adults in community settings",
				"Cochrane Database of Systematic Reviews",
				2014,
				"10.1002/14651858.CD001831.pub5",
				"Review finds no good evidence for or against many OTC cough preparations and highlights heterogeneous small trials and adverse effects."
			],
			[
				"context",
				"Infant Deaths Associated with Cough and Cold Medications: Two States, 2005",
				"U.S. Centers for Disease Control and Prevention",
				2007,
				"https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5601a1.htm",
				"CDC investigation documents fatal infant exposures and the lack of established safe dosing or efficacy for children under two."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Can honey modestly reduce acute cough in children over age one?",
		slug: "can-honey-modestly-reduce-acute-cough-in-children-over-age-one",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, it may modestly reduce cough frequency or severity and improve sleep for children over one with an acute upper-respiratory infection. Evidence is short term and not uniformly high certainty, and honey does not treat pneumonia, asthma, pertussis, or another serious cause. Never give honey to an infant under 12 months because of botulism risk.",
		stableCore: [
			"Trials compare a small bedtime dose with no treatment, placebo, or common cough medicines over a few nights.",
			"Average symptom improvements are modest and based heavily on caregiver ratings.",
			"Honey is a comfort measure, not an antibiotic or a reason to ignore breathing difficulty, dehydration, or prolonged illness."
		],
		openQuestions: [
			"Which dose, honey type, timing, and outcome measure produce the most reproducible benefit?",
			"How does honey compare with other low-risk supportive measures across age groups and causes of cough?"
		],
		whatWouldChangeMinds: [
			"Larger blinded trials showing no meaningful improvement over matched placebo.",
			"Reliable surveillance identifying clinically important harms in children over one at ordinary short-term doses."
		],
		misconceptions: [
			"Natural does not mean appropriate for infants; the under-one restriction is firm.",
			"A soothing effect does not prove honey shortens the infection.",
			"Persistent, severe, or breathing-related cough needs diagnosis rather than repeated home treatment."
		],
		editorSummary:
			"For an otherwise uncomplicated cough, honey is a reasonable small comfort measure after the first birthday. Its role is modest symptom relief, not cure.",
		uncertaintySummary:
			"Pooled evidence suggests short-term benefit, but many trials are small, blinding is difficult, and effects beyond a few nights are uncertain.",
		sources: [
			[
				"systematic_review",
				"Honey for acute cough in children",
				"Cochrane Database of Systematic Reviews",
				2018,
				"10.1002/14651858.CD007094.pub5",
				"Cochrane review finds honey probably improves cough compared with no treatment or placebo over short follow-up, with low to moderate certainty."
			],
			[
				"systematic_review",
				"Honey for acute cough in children: a systematic review",
				"European Journal of Pediatrics",
				2023,
				"10.1007/s00431-023-05066-1",
				"Updated review reports modest short-term symptom and sleep benefit while noting study limitations and heterogeneity."
			],
			[
				"guideline",
				"Cough, acute: antimicrobial prescribing",
				"National Institute for Health and Care Excellence",
				2019,
				"https://www.nice.org.uk/guidance/ng120/chapter/recommendations",
				"NICE advises that people over age one may wish to try honey for an acute cough while emphasizing self-limited illness and warning signs."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Is fever itself usually dangerous in an otherwise healthy child?",
		slug: "is-fever-itself-usually-dangerous-in-an-otherwise-healthy-child",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Usually no. Fever is a regulated immune response and, by itself, is not known to damage the brain or cause long-term neurologic harm in an otherwise healthy child at temperatures produced by ordinary infections. The underlying illness can be serious, especially in young infants or when warning signs are present. Care should focus on the child's breathing, hydration, alertness, pain, rash, age, and overall condition rather than the number alone.",
		stableCore: [
			"Infection-related fever differs from uncontrolled hyperthermia such as heatstroke, where body temperature can become directly dangerous.",
			"Fever medicine is primarily for comfort, not for forcing every temperature to normal.",
			"Any fever in a very young infant and fever with breathing difficulty, stiff neck, seizure, dehydration, unusual rash, or reduced responsiveness needs prompt assessment."
		],
		openQuestions: [
			"Which home-monitoring and telehealth tools best identify serious illness without increasing fever phobia?",
			"How can dosing guidance reduce accidental acetaminophen or ibuprofen harm?"
		],
		whatWouldChangeMinds: [
			"Evidence that ordinary regulated infectious fevers independently cause neurologic injury in otherwise healthy children.",
			"A validated temperature threshold that predicts serious disease better than age, behavior, and clinical warning signs."
		],
		misconceptions: [
			"A higher number does not always mean a more serious infection, and a lower fever does not guarantee safety.",
			"Fever is a symptom, not the diagnosis.",
			"This reassurance does not apply to heatstroke, severe underlying disease, or every young infant."
		],
		editorSummary:
			"Treat the child, not just the thermometer. Fever usually signals the body's response; the child's age and accompanying signs tell you when the cause may be dangerous.",
		uncertaintySummary:
			"The distinction between ordinary fever and hyperthermia is strong. Safe assessment still depends on age, medical history, duration, associated symptoms, and access to care.",
		sources: [
			aapFeverReport,
			niceFeverGuideline,
			[
				"systematic_review",
				"Fever in Children: Pearls and Pitfalls",
				"Children",
				2017,
				"10.3390/children4090081",
				"Clinical review distinguishes fever from hyperthermia, emphasizes age and warning signs, and finds fever itself is not the usual source of danger."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do fever-reducing medicines prevent febrile seizures?",
		slug: "do-fever-reducing-medicines-prevent-febrile-seizures",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No, not reliably. Acetaminophen or ibuprofen can improve comfort and lower temperature temporarily, but randomized evidence does not show that routine antipyretic use prevents febrile seizures over the course of an illness. One study suggests rectal acetaminophen may reduce recurrence during the same fever episode, but that narrower result has not changed the general prevention guidance.",
		stableCore: [
			"Febrile seizures can occur early in an illness, sometimes before caregivers know a child has fever.",
			"The speed and individual susceptibility of the fever response may matter more than achieving a particular temperature.",
			"Antipyretics remain useful for distress or pain when dosed safely, even though they are not reliable seizure prophylaxis."
		],
		openQuestions: [
			"Does carefully timed treatment reduce same-episode recurrence in a reproducible subgroup?",
			"Which genetic and physiologic factors best predict recurrent or complex febrile seizures?"
		],
		whatWouldChangeMinds: [
			"Large replicated randomized trials showing a clinically meaningful reduction across whole febrile illnesses.",
			"A validated timing and dosing protocol that prevents seizures without adding medication harm."
		],
		misconceptions: [
			"A seizure occurring while fever is high does not mean lowering every fever would have prevented it.",
			"Failure to prevent seizures does not mean comfort treatment is useless.",
			"Alternating medicines can increase dosing mistakes and should not be improvised as seizure prevention."
		],
		editorSummary:
			"Use fever medicines for comfort, not as a dependable anti-seizure shield. Most febrile seizures are brief, but first, prolonged, focal, or repeated seizures need medical evaluation.",
		uncertaintySummary:
			"Whole-illness prevention evidence is consistently negative. A possible same-episode benefit remains narrower and requires confirmation.",
		sources: [
			[
				"meta_analysis",
				"Use of antipyretics for preventing febrile seizure recurrence in children: a systematic review and meta-analysis",
				"European Journal of Pediatrics",
				2020,
				"10.1007/s00431-020-03845-8",
				"Review finds no support for preventing recurrence in later fever episodes and only limited evidence for a same-episode effect."
			],
			[
				"meta_analysis",
				"Do antipyretics prevent the recurrence of febrile seizures in children? A systematic review of randomized controlled trials and meta-analysis",
				"European Journal of Paediatric Neurology",
				2013,
				"10.1016/j.ejpn.2013.04.008",
				"Earlier randomized-trial synthesis found acetaminophen, ibuprofen, and diclofenac did not prevent febrile-seizure recurrence."
			],
			aapFeverReport
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Does acupuncture meaningfully improve chronic low-back pain beyond usual care or sham treatment?",
		slug: "does-acupuncture-meaningfully-improve-chronic-low-back-pain-beyond-usual-care-or-sham-treatment",
		consensusBand: "mixed",
		confidenceScore: 82,
		evidenceCertainty: "low",
		bottomLine:
			"Acupuncture can improve short-term pain or function compared with no treatment and may help some people as part of a broader care plan, but average differences from sham acupuncture are small and often not clinically important. Guidelines differ in how they weigh modest effects, safety, cost, availability, and patient preference. It is an option for selected chronic nonspecific pain, not a proven correction of a hidden energy blockage.",
		stableCore: [
			"Benefits look larger against no treatment than against credible sham procedures.",
			"Most evidence concerns chronic nonspecific low-back pain, not fracture, infection, cancer, inflammatory disease, or severe neurologic compression.",
			"Serious harms are uncommon with sterile technique and trained practitioners, while minor bleeding, soreness, or bruising can occur."
		],
		openQuestions: [
			"Which needling, context, practitioner, and patient factors account for response beyond expectation and attention?",
			"How durable are benefits and how does acupuncture compare with exercise, psychological care, and multidisciplinary programs?"
		],
		whatWouldChangeMinds: [
			"Consistent high-certainty trials showing a clinically important durable advantage over well-designed sham treatment.",
			"Conversely, pragmatic trials showing no useful function, pain, or medication benefit when added to evidence-based care."
		],
		misconceptions: [
			"Better than doing nothing does not establish a specific needling mechanism.",
			"A small average effect does not mean every patient response is imaginary or every patient benefits.",
			"Low-back pain with progressive weakness, bowel or bladder change, fever, trauma, or cancer risk needs medical assessment."
		],
		editorSummary:
			"Acupuncture occupies a narrow middle ground: a reasonable preference-sensitive option for some chronic nonspecific pain, with effects that shrink against sham and should not be oversold.",
		uncertaintySummary:
			"Certainty ranges from moderate to very low because blinding is difficult, sham procedures may not be inert, outcomes are subjective, and durability varies.",
		sources: [
			[
				"systematic_review",
				"Acupuncture for chronic nonspecific low back pain",
				"Cochrane Database of Systematic Reviews",
				2020,
				"10.1002/14651858.CD013814",
				"Cochrane review finds clinically important immediate benefit versus no treatment but little or no clinically important pain benefit versus sham or usual care."
			],
			whoLowBackPainGuideline,
			[
				"guideline",
				"Noninvasive Treatments for Acute, Subacute, and Chronic Low Back Pain",
				"Annals of Internal Medicine",
				2017,
				"10.7326/M16-2367",
				"American College of Physicians lists acupuncture among initial non-drug options for chronic low-back pain based on low-to-moderate quality evidence."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Can spinal manipulation reliably treat asthma, hypertension, or other non-musculoskeletal disease?",
		slug: "can-spinal-manipulation-reliably-treat-asthma-hypertension-or-other-non-musculoskeletal-disease",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Spinal manipulation may offer modest relief for selected musculoskeletal pain, but credible trials do not show reliable benefit for diseases such as asthma, hypertension, infantile colic, or dysmenorrhea. Claims that adjusting the spine broadly restores organ function are not supported by clinical evidence and should not replace effective medical care.",
		stableCore: [
			"Evidence for a musculoskeletal symptom cannot be generalized to unrelated organ disease.",
			"Higher-quality trials using sham manipulation have not shown superiority for the studied non-musculoskeletal conditions.",
			"Delaying asthma, blood-pressure, infection, or infant assessment can create harm even when the manipulation itself causes no injury."
		],
		openQuestions: [
			"Can any narrowly defined non-musculoskeletal symptom benefit through relaxation, mobility, or contextual care rather than disease modification?",
			"How often do unsupported claims lead patients to delay or stop effective treatment?"
		],
		whatWouldChangeMinds: [
			"Independent, preregistered sham-controlled trials showing reproducible patient-important disease improvement with plausible mediation.",
			"Evidence that benefits persist after controlling for co-interventions, expectation, and natural symptom fluctuation."
		],
		misconceptions: [
			"The nervous system connecting the spine and organs does not mean spinal adjustments correct every organ disease.",
			"A patient feeling better after a visit does not by itself show that lung function or blood pressure disease improved.",
			"Rejecting broad disease claims does not deny that manual therapy may help some forms of back or neck pain."
		],
		editorSummary:
			"Keep the claim matched to the evidence. Manipulation has a limited musculoskeletal role, not a demonstrated ability to treat unrelated internal disease.",
		uncertaintySummary:
			"Available high-quality non-musculoskeletal trials are few, but their direction is consistently unsupportive. Sparse evidence limits condition-specific precision more than it supports benefit.",
		sources: [
			[
				"systematic_review",
				"The global summit on the efficacy and effectiveness of spinal manipulative therapy for the prevention and treatment of non-musculoskeletal disorders: a systematic review of the literature",
				"Chiropractic & Manual Therapies",
				2021,
				"10.1186/s12998-021-00362-9",
				"International systematic review found no evidence of effect in the acceptable- or high-quality trials for studied non-musculoskeletal disorders.",
				undefined,
				"corrected"
			],
			[
				"systematic_review",
				"Spinal manipulation for asthma: A systematic review of randomised clinical trials",
				"Respiratory Medicine",
				2009,
				"10.1016/j.rmed.2009.06.017",
				"Review concludes that rigorous randomized evidence does not support spinal manipulation as an effective asthma treatment."
			],
			[
				"guideline",
				"Spinal Manipulation: What You Need To Know",
				"National Center for Complementary and Integrative Health",
				2025,
				"https://www.nccih.nih.gov/health/spinal-manipulation-what-you-need-to-know",
				"NIH summary distinguishes limited evidence for musculoskeletal pain from the very small, unsupportive evidence base for non-musculoskeletal disease."
			]
		]
	})
];
