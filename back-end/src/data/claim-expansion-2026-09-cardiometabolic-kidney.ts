import type { SeedClaim } from "./claims.js";
import { september2026ClinicalClaim as reviewedClaim } from "./claim-expansion-2026-09-clinical-shared.js";

export const september2026CardiometabolicKidneyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Does lifelong exposure to high LDL cholesterol causally drive atherosclerosis?",
		slug: "does-lifelong-exposure-to-high-ldl-cholesterol-causally-drive-atherosclerosis",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. LDL-containing particles play a causal role in atherosclerotic cardiovascular disease. Risk reflects both level and duration of exposure, so reducing LDL earlier and for longer generally lowers cumulative risk, while the best treatment intensity still depends on absolute risk, age, other conditions, preferences, and medication burden.",
		stableCore: [
			"Genetic studies, prospective cohorts, pathology, and randomized LDL-lowering trials converge on the same causal direction.",
			"Atherosclerosis develops over years, making cumulative exposure more informative than one isolated cholesterol measurement.",
			"Lowering LDL reduces cardiovascular events across several drug mechanisms, supporting the particle rather than one medication as the causal target."
		],
		openQuestions: [
			"How low and how early should treatment begin for different lifetime-risk groups while preserving proportional benefit and minimizing burden?",
			"Which measures best identify residual risk after LDL has been substantially lowered?"
		],
		whatWouldChangeMinds: [
			"Large randomized programs in which substantial LDL lowering fails to reduce atherosclerotic events despite adequate duration and adherence.",
			"Genetic or mechanistic evidence showing that LDL exposure is only a marker for another factor that fully explains the observed effects."
		],
		misconceptions: [
			"LDL being necessary for normal biology does not mean higher circulating exposure is harmless.",
			"A person with high LDL and no current symptoms may still be accumulating arterial risk.",
			"The causal role of LDL does not mean cholesterol is the only cause of cardiovascular disease."
		],
		editorSummary:
			"This is one of the strongest causal conclusions in preventive cardiology. The remaining clinical debate concerns who should start which intervention at what threshold, not whether sustained LDL exposure contributes to atherosclerosis.",
		uncertaintySummary:
			"Causal direction is exceptionally well supported. Individual absolute benefit, optimal targets, treatment timing, competing risks, and residual risk vary substantially.",
		sources: [
			["consensus_statement", "Low-density lipoproteins cause atherosclerotic cardiovascular disease. 1. Evidence from genetic, epidemiologic, and clinical studies", "European Heart Journal", 2017, "10.1093/eurheartj/ehx144", "European Atherosclerosis Society consensus integrates genetic, observational, mechanistic, and randomized evidence for causality."],
			["systematic_review", "The importance of LDL-C lowering in atherosclerotic cardiovascular disease prevention: Lower for longer is better", "American Journal of Preventive Cardiology", 2024, "10.1016/j.ajpc.2024.100649", "Current review connects cumulative LDL exposure with event reduction and distinguishes lifetime prevention from short trial horizons."],
			["guideline", "ACC/AHA Issue Updated Guideline for Managing Lipids, Cholesterol", "American Heart Association", 2026, "https://newsroom.heart.org/news/accaha-issue-updated-guideline-for-managing-lipids-cholesterol", "Current professional guidance translates LDL evidence into risk-based testing and treatment decisions."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Does raising HDL cholesterol with medication reliably prevent heart attacks?",
		slug: "does-raising-hdl-cholesterol-with-medication-reliably-prevent-heart-attacks",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. A low HDL cholesterol level is associated with cardiovascular risk, but medicines that raise HDL have not reliably reduced heart attacks when added to effective contemporary care. HDL concentration is a risk marker with complex biology, not a treatment target whose numerical increase guarantees protection.",
		stableCore: [
			"Association between naturally measured HDL and risk does not prove that pharmacologically changing the number changes outcomes.",
			"Trials of niacin and several other HDL-targeted drugs raised HDL without the expected cardiovascular benefit.",
			"Prevention should focus on interventions with demonstrated event reduction, including LDL lowering and risk-factor control when indicated."
		],
		openQuestions: [
			"Can measures of HDL particle function identify useful biology or treatment targets better than HDL cholesterol concentration?",
			"Are there selected populations or mechanisms in which an HDL-directed intervention improves clinical outcomes?"
		],
		whatWouldChangeMinds: [
			"Replicated outcome trials showing that an HDL-directed treatment reduces cardiovascular events through HDL change independent of other lipid effects.",
			"Validated functional HDL measures that guide treatment and improve patient-important outcomes."
		],
		misconceptions: [
			"Calling HDL good cholesterol does not mean increasing its laboratory value is always beneficial.",
			"A favorable observational association is not equivalent to a successful treatment target.",
			"An HDL number cannot be interpreted without the rest of a person's cardiovascular risk profile."
		],
		editorSummary:
			"HDL is a classic warning against treating a biomarker simply because it predicts risk. The failed outcome trials changed the clinical question from how to raise HDL to which interventions actually prevent events.",
		uncertaintySummary:
			"Evidence against HDL concentration as a routine drug target is high-confidence. HDL biology remains active research, and future function-specific therapies could differ from older HDL-raising drugs.",
		sources: [
			["meta_analysis", "Effect on cardiovascular risk of high density lipoprotein targeted drug treatments niacin, fibrates, and CETP inhibitors: meta-analysis of randomised controlled trials including 117 411 patients", "The BMJ", 2014, "10.1136/bmj.g4379", "Large randomized-trial synthesis found no general cardiovascular benefit from raising HDL in the statin era."],
			["landmark_study", "Niacin in Patients with Low HDL Cholesterol Levels Receiving Intensive Statin Therapy", "The New England Journal of Medicine", 2011, "10.1056/NEJMoa1107579", "AIM-HIGH raised HDL and changed other lipids but did not reduce cardiovascular events when added to intensive statin therapy."],
			["guideline", "Your Complete Guide to Understanding Cholesterol and Lipids", "American Heart Association", 2026, "https://www.heart.org/en/health-topics/cholesterol/your-complete-guide-to-understanding-cholesterol-and-lipids", "Professional patient guidance explains why lipid values are interpreted as part of overall cardiovascular risk rather than as isolated good and bad scores."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Does oral anticoagulation reduce stroke in atrial fibrillation when indicated?",
		slug: "does-oral-anticoagulation-reduce-stroke-in-atrial-fibrillation-when-indicated",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. For people with atrial fibrillation whose estimated clot-related stroke risk justifies treatment, oral anticoagulation substantially reduces ischemic stroke. The decision must balance stroke prevention against bleeding, kidney function, interactions, adherence, procedure plans, and patient preferences; aspirin is not an equivalent substitute.",
		stableCore: [
			"Atrial fibrillation can allow blood to pool and clot in the atria, creating an embolic-stroke pathway.",
			"Direct oral anticoagulants are generally preferred over warfarin for eligible patients without mechanical heart valves or moderate-to-severe rheumatic mitral stenosis.",
			"Risk scores organize decisions but do not replace review of bleeding risks, changing health status, and shared decision-making."
		],
		openQuestions: [
			"How should treatment thresholds adapt to device-detected short episodes, frailty, falls, and rapidly changing kidney function?",
			"Which patients benefit most from left atrial appendage closure when long-term anticoagulation is unsuitable?"
		],
		whatWouldChangeMinds: [
			"Large contemporary trials finding no net stroke benefit in clearly risk-eligible atrial-fibrillation populations.",
			"Validated alternatives that prevent embolic stroke with lower overall burden or harm."
		],
		misconceptions: [
			"Anticoagulants do not thin blood in a literal sense; they reduce clot formation while increasing bleeding risk.",
			"Being at risk of falls does not automatically outweigh stroke prevention, though individual circumstances matter.",
			"An apparently normal rhythm on one day does not necessarily remove stroke risk from established atrial fibrillation."
		],
		editorSummary:
			"The consensus is about net benefit in a defined risk group, not universal treatment of every brief irregular rhythm. Good care repeatedly reassesses both embolic and bleeding risk.",
		uncertaintySummary:
			"Stroke reduction is high-confidence for guideline-eligible clinical atrial fibrillation. Greater uncertainty surrounds very short device-detected episodes, extreme frailty, unusual bleeding risks, and specific alternatives.",
		sources: [
			["guideline", "2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation", "Circulation", 2024, "10.1161/CIR.0000000000001193", "Multisociety guideline recommends risk-based anticoagulation and defines major exceptions, alternatives, and reassessment needs."],
			["meta_analysis", "Systematic review and network meta-analysis of stroke prevention treatments in patients with atrial fibrillation", "Clinical Pharmacology: Advances and Applications", 2016, "10.2147/CPAA.S105165", "Network synthesis compares anticoagulants and antiplatelet strategies across stroke, bleeding, and mortality outcomes."],
			["meta_analysis", "Comparison of the efficacy and safety of new oral anticoagulants with warfarin in patients with atrial fibrillation: a meta-analysis of randomised trials", "The Lancet", 2014, "10.1016/S0140-6736(13)62343-0", "Pivotal trial synthesis found direct oral anticoagulants at least as effective as warfarin with a different bleeding profile."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Does cardiac rehabilitation improve outcomes after coronary heart disease?",
		slug: "does-cardiac-rehabilitation-improve-outcomes-after-coronary-heart-disease",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Exercise-based cardiac rehabilitation after heart attack, coronary intervention, bypass surgery, or stable coronary disease improves fitness and quality of life and reduces hospital admissions; syntheses also support lower cardiovascular mortality. It is a supervised risk-reduction program, not simply advice to exercise alone.",
		stableCore: [
			"Cardiac rehabilitation combines adapted exercise with education, medication support, nutrition, tobacco treatment, and psychosocial care.",
			"Benefits depend on referral, attendance, adherence, and continuation of risk-reducing care after the formal program.",
			"Home-based and hybrid models can be appropriate for selected patients when they preserve assessment, progression, communication, and safety."
		],
		openQuestions: [
			"Which automatic referral, remote, transport, and culturally tailored models best close large participation gaps?",
			"How should programs adapt for multimorbidity, frailty, heart failure, disability, and underrepresented groups?"
		],
		whatWouldChangeMinds: [
			"Updated randomized synthesis showing no meaningful functional, hospitalization, quality-of-life, or mortality benefit under contemporary care.",
			"Evidence that a simpler alternative produces equal outcomes with greater reach and lower burden."
		],
		misconceptions: [
			"Cardiac rehabilitation is not reserved for athletes or people who were already fit.",
			"Feeling better after a procedure does not replace secondary prevention and supervised recovery.",
			"A home program is not the same as exercising without assessment or follow-up."
		],
		editorSummary:
			"Cardiac rehabilitation is a complete secondary-prevention service whose underuse is a delivery failure. Its value comes from combining safe progression with the other behaviors and treatments that shape recurrent risk.",
		uncertaintySummary:
			"Fitness, quality-of-life, and hospitalization benefits are robust. Exact mortality magnitude and the best delivery model vary with era, baseline care, program content, and participation.",
		sources: [
			["systematic_review", "Exercise-based cardiac rehabilitation for coronary heart disease", "Cochrane Database of Systematic Reviews", 2021, "10.1002/14651858.CD001800.pub3", "Updated randomized synthesis evaluates mortality, admissions, quality of life, and safety across contemporary rehabilitation programs."],
			["meta_analysis", "Exercise-Based Cardiac Rehabilitation for Coronary Heart Disease: Cochrane Systematic Review and Meta-Analysis", "Journal of the American College of Cardiology", 2016, "10.1016/j.jacc.2015.10.044", "Major synthesis supports lower cardiovascular mortality and hospitalization with improved quality of life."],
			["guideline", "Home-Based Cardiac Rehabilitation: Top Things to Know", "American Heart Association", 2019, "https://professional.heart.org/en/science-news/home-based-cardiac-rehabilitation/top-things-to-know", "Professional statement explains when structured home-based rehabilitation can extend access while preserving core clinical components."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Does home blood-pressure monitoring help control hypertension?",
		slug: "does-home-blood-pressure-monitoring-help-control-hypertension",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, especially when readings are linked to clinical feedback, medication adjustment, or structured self-management. Validated upper-arm devices and repeated measurements can improve diagnosis and modestly lower blood pressure, but home monitoring does not replace professional care and poor technique or selective recording can mislead.",
		stableCore: [
			"Out-of-office readings can identify white-coat and masked hypertension that a clinic snapshot may miss.",
			"Monitoring paired with co-interventions produces more reliable blood-pressure improvement than an unsupported device alone.",
			"Correct cuff size, validated equipment, seated rest, arm position, repeated readings, and transparent reporting matter."
		],
		openQuestions: [
			"Which telemonitoring and medication-titration designs produce durable control without widening digital-access gaps?",
			"How should schedules be simplified while retaining enough measurements for reliable decisions?"
		],
		whatWouldChangeMinds: [
			"Large pragmatic trials finding no diagnostic or control benefit when validated monitoring is connected to timely care.",
			"Evidence that a lower-burden measurement strategy produces equal outcomes across diverse settings."
		],
		misconceptions: [
			"One high or low home reading is not a diagnosis or a reason to change medicine without a plan.",
			"Wrist and finger devices are not interchangeable with validated upper-arm monitors.",
			"Normal home readings do not justify ignoring symptoms or an urgent clinical situation."
		],
		editorSummary:
			"The monitor is useful because it creates a better series of measurements and a feedback loop. The intervention is not merely buying a cuff; it is reliable measurement connected to decisions.",
		uncertaintySummary:
			"Average blood-pressure benefit is modest and varies with the accompanying support. Device validity, adherence, baseline control, treatment protocol, and access determine practical effectiveness.",
		sources: [
			["meta_analysis", "Self-measurement of blood pressure at home using a cuff device for change in blood pressure levels: systematic review and meta-analysis", "Hypertension Research", 2024, "10.1038/s41440-024-01981-4", "Current synthesis finds better blood-pressure control, with larger effects when monitoring is paired with clinical or behavioral support."],
			["landmark_study", "Efficacy of self-monitored blood pressure, with or without telemonitoring, for titration of antihypertensive medication (TASMINH4): an unmasked randomised controlled trial", "The Lancet", 2018, "10.1016/S0140-6736(18)30309-X", "Pragmatic trial shows how self-monitoring linked to medication titration can improve clinic blood pressure."],
			["guideline", "Home Blood Pressure Monitoring", "American Heart Association", 2026, "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home", "Patient guidance covers validated devices, cuff fit, technique, recording, and when readings require clinical attention."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Do SGLT2 inhibitors slow chronic kidney disease even without diabetes?",
		slug: "do-sglt2-inhibitors-slow-chronic-kidney-disease-even-without-diabetes",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. SGLT2 inhibitors reduce progression of chronic kidney disease and kidney or cardiovascular events in many eligible adults, including people without diabetes. Benefit and prescribing depend on kidney function, albuminuria, heart failure, volume status, infection risk, acute illness, and other contraindications; they are not appropriate for every kidney condition.",
		stableCore: [
			"Large outcome trials showed kidney protection beyond glucose lowering, including in participants without diabetes.",
			"A small early fall in estimated filtration can occur after starting therapy and is different from ongoing kidney injury when interpreted clinically.",
			"These medicines complement rather than replace blood-pressure control, renin-angiotensin system treatment when indicated, and disease-specific care."
		],
		openQuestions: [
			"How much benefit extends to low-albuminuria disease, advanced kidney failure, transplant recipients, and uncommon primary kidney disorders?",
			"Which initiation and monitoring pathways best prevent volume depletion, ketoacidosis, and avoidable discontinuation?"
		],
		whatWouldChangeMinds: [
			"Large controlled trials showing no kidney-event benefit in well-defined nondiabetic chronic kidney disease populations.",
			"Long-term safety evidence showing harms exceed kidney and cardiovascular benefits in currently eligible groups."
		],
		misconceptions: [
			"A drug developed for diabetes can have proven benefits unrelated to lowering blood glucose.",
			"An initial change in estimated filtration does not automatically mean the medicine is damaging the kidney.",
			"Evidence for a drug class does not make every product, dose, patient, or kidney diagnosis interchangeable."
		],
		editorSummary:
			"SGLT2 inhibitors are a major change in kidney care because outcome benefits cross the diabetes boundary. The claim remains eligibility-specific and requires sick-day, volume, infection, and ketoacidosis safety counseling.",
		uncertaintySummary:
			"Kidney protection is high-confidence in the populations represented by major trials and guidelines. Evidence is thinner for transplant, dialysis, type 1 diabetes, very low albuminuria, and some rare kidney diseases.",
		sources: [
			["guideline", "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease", "Kidney Disease: Improving Global Outcomes", 2024, "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf", "International guideline recommends SGLT2 inhibitors for defined chronic kidney disease groups regardless of diabetes and details initiation and safety boundaries."],
			["meta_analysis", "SGLT2 inhibitors and kidney outcomes across the spectrum of kidney disease: a systematic review and meta-analysis", "Clinical Journal of the American Society of Nephrology", 2024, "10.2215/CJN.0000000000000568", "Broad synthesis finds kidney benefit across diabetes status and multiple baseline kidney-risk strata."],
			["landmark_study", "Empagliflozin in Patients with Chronic Kidney Disease", "The New England Journal of Medicine", 2023, "10.1056/NEJMoa2204233", "EMPA-KIDNEY demonstrated fewer kidney-disease progression or cardiovascular-death events in a broad CKD population, including participants without diabetes."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Can type 2 diabetes enter remission after substantial sustained weight loss?",
		slug: "can-type-2-diabetes-enter-remission-after-substantial-sustained-weight-loss",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Some people with type 2 diabetes can reach remission after substantial, sustained weight loss through an intensive lifestyle program, metabolic surgery, or other effective weight-management treatment. Remission means glucose remains below the diabetes threshold without glucose-lowering medicine for a defined period; it is not a permanent cure and requires follow-up.",
		stableCore: [
			"The probability of remission rises with greater maintained weight loss and is generally higher earlier in the disease course.",
			"Weight regain can lead to recurrence, and prior diabetes can leave ongoing cardiovascular, kidney, eye, and nerve risk.",
			"Medication changes during rapid weight loss need clinical supervision to prevent hypoglycemia, hypotension, or other harm."
		],
		openQuestions: [
			"Which combinations of lifestyle, medication, surgery, and long-term support produce the most durable remission for different patients?",
			"How should screening and risk treatment change after years of remission?"
		],
		whatWouldChangeMinds: [
			"Long-term controlled evidence showing that substantial maintained weight loss does not produce medication-free glycemic remission.",
			"Better predictors demonstrating that remission depends primarily on another modifiable mechanism rather than weight loss and disease duration."
		],
		misconceptions: [
			"Remission is not proof that diabetes never existed or can never return.",
			"Not achieving remission does not mean weight loss, activity, or treatment produced no health benefit.",
			"Rapid restrictive dieting without medication review can be unsafe."
		],
		editorSummary:
			"Type 2 diabetes is not inevitably progressive for every person. Remission is a real outcome, but the responsible message includes maintenance, recurrence, safety, and continued complication surveillance.",
		uncertaintySummary:
			"Remission over one to several years is well established, while lifetime durability and optimal maintenance are less certain. Results depend strongly on baseline duration, insulin reserve, intervention intensity, and maintained weight loss.",
		sources: [
			["guideline", "Achieving Type 2 Diabetes Remission through Weight Loss", "National Institute of Diabetes and Digestive and Kidney Diseases", 2025, "https://www.niddk.nih.gov/health-information/professionals/diabetes-discoveries-practice/achieving-type-2-diabetes-remission-through-weight-loss", "NIDDK explains remission definitions, evidence from intensive weight management, durability, recurrence, and the need for continued monitoring."],
			["meta_analysis", "Impact of bodyweight loss on type 2 diabetes remission: a systematic review and meta-regression analysis of randomised controlled trials", "The Lancet Diabetes & Endocrinology", 2025, "10.1016/S2213-8587(24)00346-2", "Randomized-trial synthesis shows a dose-response relationship between weight loss and remission across interventions."],
			["landmark_study", "Primary care-led weight management for remission of type 2 diabetes (DiRECT): an open-label, cluster-randomised trial", "The Lancet", 2018, "10.1016/S0140-6736(17)33102-1", "DiRECT established that an intensive primary-care weight-management program can produce medication-free remission in a substantial subset."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Can regular NSAID use injure the kidneys?",
		slug: "can-regular-nsaid-use-injure-the-kidneys",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Nonsteroidal anti-inflammatory drugs such as ibuprofen and naproxen can reduce kidney blood flow, trigger acute kidney injury, worsen fluid retention and blood pressure, and contribute to chronic harm in susceptible people. Risk rises with chronic kidney disease, dehydration, older age, heart failure, higher dose, longer use, and certain medicine combinations.",
		stableCore: [
			"Over-the-counter availability does not make frequent NSAID use harmless.",
			"Risk is especially important during vomiting, diarrhea, poor intake, severe illness, or use with diuretics and renin-angiotensin system blockers.",
			"Avoidance, dose limitation, monitoring, and pain-treatment alternatives should be individualized rather than applied as one rule to every person."
		],
		openQuestions: [
			"What exposure pattern creates clinically important chronic kidney decline in lower-risk adults?",
			"Which pain strategies provide equivalent relief with fewer kidney, gastrointestinal, and cardiovascular harms for each condition?"
		],
		whatWouldChangeMinds: [
			"Large prospective evidence showing no acute or chronic kidney harm across currently recognized high-risk groups and exposure patterns.",
			"Validated tools that identify patients with negligible kidney risk despite repeated use."
		],
		misconceptions: [
			"Taking the labeled dose does not eliminate risk during dehydration or high-risk illness.",
			"Acetaminophen and topical NSAIDs have different benefits and harms and are not automatic substitutes for every patient.",
			"Kidney injury can occur without pain or an obvious change in urine."
		],
		editorSummary:
			"The question is not whether one occasional dose inevitably damages kidneys. It is whether NSAIDs have a real kidney-harm pathway whose probability changes sharply with patient risk, illness, combinations, dose, and duration.",
		uncertaintySummary:
			"Acute kidney risk in susceptible patients is high-confidence. The magnitude of chronic decline from intermittent or long-term use is harder to separate from the illnesses and pain conditions that prompt treatment.",
		sources: [
			["guideline", "Safe Medicine Use with Chronic Kidney Disease", "National Kidney Foundation", 2025, "https://www.kidney.org/kidney-topics/safe-medicine-use-chronic-kidney-disease", "Patient guidance explains why NSAIDs can harm kidneys, which risk factors matter, and why medicine review is needed in CKD."],
			["meta_analysis", "Non-steroidal anti-inflammatory drug induced acute kidney injury in the community dwelling general population and people with chronic kidney disease: systematic review and meta-analysis", "BMC Nephrology", 2017, "10.1186/s12882-017-0673-8", "Synthesis quantifies higher acute kidney injury risk in general and chronic-kidney-disease populations."],
			["systematic_review", "NSAIDs in CKD: Are They Safe?", "American Journal of Kidney Diseases", 2020, "10.1053/j.ajkd.2020.03.023", "Nephrology review weighs kidney, electrolyte, cardiovascular, and gastrointestinal harms against pain benefit and practical alternatives."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Does chronic kidney disease substantially increase cardiovascular risk?",
		slug: "does-chronic-kidney-disease-substantially-increase-cardiovascular-risk",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Lower kidney filtration and higher urine albumin are independently associated with heart attack, stroke, heart failure, cardiovascular death, and all-cause mortality. Chronic kidney disease is therefore a cardiovascular risk condition as well as a kidney condition, even when a person has few symptoms.",
		stableCore: [
			"Estimated filtration and albuminuria provide complementary risk information and should be interpreted together.",
			"Risk rises progressively with more severe kidney dysfunction and albumin leakage rather than beginning at one magical cutoff.",
			"Shared causes and mechanisms include diabetes, hypertension, vascular disease, inflammation, mineral imbalance, anemia, and fluid overload."
		],
		openQuestions: [
			"Which combinations of kidney and cardiovascular treatments best reduce competing risks at each CKD stage?",
			"How should risk calculators and treatment thresholds account for albuminuria, frailty, and underrepresented populations?"
		],
		whatWouldChangeMinds: [
			"Large representative cohorts showing no independent cardiovascular gradient after rigorous measurement and adjustment.",
			"Intervention evidence demonstrating that kidney-risk markers add no useful prevention information beyond conventional factors."
		],
		misconceptions: [
			"Kidney disease can be clinically important before pain, swelling, or obvious urinary symptoms appear.",
			"A mildly reduced filtration estimate and severe albuminuria do not carry the same risk as the reverse pattern.",
			"Association does not prove that every cardiovascular event is caused directly by the kidney."
		],
		editorSummary:
			"Kidney and cardiovascular prevention cannot be separated cleanly. Measuring albuminuria as well as filtration helps reveal risk that may be missed when attention stays only on whether dialysis is near.",
		uncertaintySummary:
			"The risk gradient is exceptionally consistent across cohorts. Individual prediction still varies with age, cause of CKD, acute measurement changes, competing illness, and treatment.",
		sources: [
			["guideline", "KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease", "Kidney Disease: Improving Global Outcomes", 2024, "https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf", "International guideline classifies risk jointly by filtration and albuminuria and integrates cardiovascular prevention into CKD care."],
			["meta_analysis", "Association of estimated glomerular filtration rate and albuminuria with all-cause and cardiovascular mortality: a collaborative meta-analysis of general population cohorts", "The Lancet", 2010, "10.1016/S0140-6736(10)60674-5", "Large collaborative analysis established independent, graded mortality associations for both filtration and albuminuria."],
			["guideline", "Risk Factors for Chronic Kidney Disease", "National Kidney Foundation", 2026, "https://www.kidney.org/kidney-topics/risk-factors-chronic-kidney-disease?page=0", "Patient guidance explains the bidirectional relationship among kidney disease, diabetes, high blood pressure, and cardiovascular disease."]
		]
	}),
	reviewedClaim({
		topicSlug: "cardiovascular-metabolic-and-kidney-health",
		title: "Can smartwatch atrial-fibrillation alerts replace a medical ECG diagnosis?",
		slug: "can-smartwatch-atrial-fibrillation-alerts-replace-a-medical-ecg-diagnosis",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"No. A smartwatch alert can identify a pulse pattern that deserves evaluation, and some watch ECG recordings can be clinically useful, but an alert alone does not establish atrial fibrillation or determine treatment. Confirmation requires an interpretable electrocardiographic tracing reviewed in clinical context, especially before anticoagulation.",
		stableCore: [
			"Photoplethysmography detects pulse irregularity, while a single-lead watch ECG records limited electrical information; neither captures every rhythm continuously.",
			"False positives matter more in younger or low-risk populations where atrial fibrillation is uncommon.",
			"No alert does not rule out intermittent arrhythmia, and an alert may represent noise, ectopic beats, or another rhythm."
		],
		openQuestions: [
			"Which alert duration and burden predict clinically important stroke risk rather than transient or incidental rhythm findings?",
			"How should health systems confirm alerts without producing unnecessary testing, anxiety, or inequitable access?"
		],
		whatWouldChangeMinds: [
			"Validated watch algorithms independently shown to diagnose treatment-relevant atrial fibrillation with negligible false classification across populations.",
			"Outcome trials showing safe treatment decisions can be based on alerts without confirmatory ECG review."
		],
		misconceptions: [
			"A high algorithm accuracy does not equal a high probability of disease in every user.",
			"A normal watch reading cannot exclude a rhythm that was absent during that brief recording.",
			"An alert should prompt appropriate review, not self-starting or stopping heart or blood-thinning medication."
		],
		editorSummary:
			"Wearables are useful screening and recording tools, not autonomous cardiologists. Their value depends on signal quality, disease prevalence, confirmatory testing, symptoms, and a care pathway that prevents both missed disease and overdiagnosis.",
		uncertaintySummary:
			"Ability to detect many episodes is well supported, but real-world predictive value varies by device, algorithm, age, rhythm burden, and recording quality. The treatment significance of very brief device-detected episodes remains unsettled.",
		sources: [
			["guideline", "Atrial Fibrillation Diagnosis", "American Heart Association", 2026, "https://www.heart.org/en/health-topics/atrial-fibrillation/treatment-and-prevention-of-atrial-fibrillation/afib-diagnosis", "Professional guidance explains ECG-based confirmation and the role of ambulatory and consumer rhythm records in a broader diagnostic evaluation."],
			["meta_analysis", "Diagnostic Accuracy of Smartwatches for the Detection of Cardiac Arrhythmia: Systematic Review and Meta-analysis", "Journal of Medical Internet Research", 2021, "10.2196/28974", "Synthesis finds useful diagnostic performance while documenting heterogeneity, selected study populations, and the need for clinical confirmation."],
			["landmark_study", "Large-Scale Assessment of a Smartwatch to Identify Atrial Fibrillation", "The New England Journal of Medicine", 2019, "10.1056/NEJMoa1901183", "Apple Heart Study shows scalable alerting and reasonable confirmation yield while also illustrating low alert rates, incomplete follow-up, and non-diagnostic notifications."]
		]
	})
];
