import type { SeedClaim } from "./claims.js";
import { september2026ClinicalClaim as reviewedClaim } from "./claim-expansion-2026-09-clinical-shared.js";

export const september2026SubstanceUseClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Is cannabis use during pregnancy established as safe?",
		slug: "is-cannabis-use-during-pregnancy-established-as-safe",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. No amount or route of cannabis use during pregnancy has been established as safe. Observational syntheses associate prenatal exposure with outcomes including preterm birth and lower birth weight, but tobacco, other substances, social conditions, dose measurement, and reasons for use complicate causal estimates. Professional guidance recommends avoiding cannabis while offering nonjudgmental support and safer symptom treatment.",
		stableCore: [
			"THC crosses the placenta, and smoke or vapor can add combustion or inhalation exposures.",
			"Human evidence is necessarily observational, so an association does not define an exact causal risk for every pregnancy.",
			"Edibles, vaping, cannabidiol products, and medical authorization do not have evidence establishing pregnancy safety."
		],
		openQuestions: [
			"How do dose, potency, timing, route, co-use, and sustained versus discontinued exposure change specific outcomes?",
			"Which treatments best address nausea, pain, sleep, anxiety, or cannabis use disorder during pregnancy without stigma or punitive care?"
		],
		whatWouldChangeMinds: [
			"High-quality prospective evidence consistently showing no fetal, neonatal, or developmental risk across well-measured exposure levels.",
			"Validated evidence that a specific cannabinoid treatment has a favorable pregnancy benefit-risk balance for a defined indication."
		],
		misconceptions: [
			"Natural, legal, or medically available does not mean tested as safe in pregnancy.",
			"Uncertain causal magnitude is not evidence of no risk.",
			"Guidance to avoid cannabis should not be used to shame patients or deter prenatal care."
		],
		editorSummary:
			"The evidence supports precaution without pretending observational data are a randomized experiment. The clinical response should pair clear risk communication with confidential, supportive care and effective alternatives for the symptom or disorder driving use.",
		uncertaintySummary:
			"Moderate certainty reflects consistent signals for some birth outcomes alongside residual confounding, self-reported exposure, changing potency, and limited long-term developmental evidence.",
		sources: [
			["guideline", "Cannabis Use During Pregnancy and Lactation", "American College of Obstetricians and Gynecologists", 2025, "https://www.acog.org/clinical/clinical-guidance/clinical-consensus/articles/2025/10/cannabis-use-during-pregnancy-and-lactation", "Current clinical consensus recommends screening and counseling without stigma, avoidance during pregnancy, and evidence-based treatment for underlying symptoms."],
			["meta_analysis", "Cannabis Use in Pregnancy and Neonatal Outcomes: A Systematic Review and Meta-Analysis", "Cannabis and Cannabinoid Research", 2024, "10.1089/can.2022.0262", "Adjusted synthesis reports associations with selected neonatal outcomes while documenting heterogeneity and confounding limits."],
			["meta_analysis", "Birth Outcomes of Neonates Exposed to Marijuana in Utero: A Systematic Review and Meta-analysis", "JAMA Network Open", 2022, "10.1001/jamanetworkopen.2021.45653", "Large synthesis examines preterm birth, birth weight, and neonatal outcomes and shows why co-exposures and study design matter."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Do naltrexone and acamprosate help alcohol use disorder?",
		slug: "do-naltrexone-and-acamprosate-help-alcohol-use-disorder",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Oral naltrexone and acamprosate improve alcohol-use outcomes for some adults and are recommended first-line options in many settings. Average effects are meaningful but modest, the best choice depends on the person's goal and medical context, and medication works best when access, adherence, withdrawal needs, psychosocial care, and co-occurring conditions are addressed.",
		stableCore: [
			"Naltrexone reduces return to heavy drinking and craving for many patients but cannot be used while a person requires opioid medication and may be unsuitable with significant liver disease.",
			"Acamprosate helps maintain abstinence after stopping alcohol but requires multiple daily doses and kidney-based eligibility review.",
			"Alcohol use disorder is treatable, and medication can be offered without requiring failure of counseling alone."
		],
		openQuestions: [
			"Which clinical, genetic, goal, and adherence factors can match each patient to the most effective medication?",
			"How can primary care and emergency settings reduce the large gap between evidence and medication access?"
		],
		whatWouldChangeMinds: [
			"Updated low-bias trials showing no reduction in return to drinking or heavy drinking for appropriately selected patients.",
			"Comparative evidence identifying safer or more effective first-line options across common patient goals."
		],
		misconceptions: [
			"Medication for alcohol use disorder is not replacing one addiction with another.",
			"A modest average effect can still be important when the condition is recurrent and dangerous.",
			"Detoxification manages withdrawal but does not provide the relapse-prevention effect of ongoing treatment."
		],
		editorSummary:
			"These are underused evidence-based treatments, not miracle cures. Choice should start with the outcome sought, opioid exposure, liver and kidney health, dosing feasibility, prior response, and the supports needed to stay engaged.",
		uncertaintySummary:
			"Benefits are high-confidence at the group level, while individual response varies. Trials use different drinking goals, psychosocial co-interventions, adherence levels, and follow-up periods.",
		sources: [
			["meta_analysis", "Pharmacotherapy for Alcohol Use Disorder: A Systematic Review and Meta-Analysis", "JAMA", 2023, "10.1001/jama.2023.19761", "Large review supports oral naltrexone and acamprosate as first-line treatments and reports outcome-specific numbers needed to treat."],
			["meta_analysis", "Pharmacotherapies for Adults With Alcohol Use Disorders: A Systematic Review and Network Meta-analysis", "Journal of Addiction Medicine", 2022, "10.1097/ADM.0000000000000992", "Network synthesis compares multiple medicines across abstinence, heavy drinking, adverse effects, and acceptability."],
			["guideline", "Naltrexone", "Substance Abuse and Mental Health Services Administration", 2026, "https://www.samhsa.gov/substance-use/treatment/options/naltrexone", "SAMHSA explains oral and extended-release naltrexone, opioid and liver precautions, and its role within alcohol-use-disorder care."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Does contingency management help stimulant use disorder?",
		slug: "does-contingency-management-help-stimulant-use-disorder",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Contingency management, which provides predictable incentives for verified treatment goals such as stimulant-negative tests or attendance, is the best-supported behavioral intervention for stimulant use disorder. It improves abstinence and engagement during treatment, although access is limited and benefits may weaken after incentives end.",
		stableCore: [
			"The intervention reinforces a clearly defined behavior quickly and consistently rather than paying someone merely to have a disorder.",
			"Benefits have been demonstrated for methamphetamine and cocaine use across many controlled studies.",
			"Contingency management can be combined with counseling, community reinforcement, medical care, and treatment for co-occurring conditions."
		],
		openQuestions: [
			"Which incentive size, schedule, duration, digital delivery, and maintenance design produces durable benefit at scale?",
			"How can reimbursement and program rules expand access without adding stigma, fraud risk, or excessive administrative burden?"
		],
		whatWouldChangeMinds: [
			"Large low-bias trials consistently finding no verified reduction in stimulant use or improvement in retention.",
			"Replicated alternatives that produce larger and more durable patient-important outcomes with comparable reach and safety."
		],
		misconceptions: [
			"Incentives are a structured learning intervention, not a moral reward for behavior that should have occurred anyway.",
			"Improvement during a program does not guarantee permanent abstinence after reinforcement stops.",
			"No medication with established broad efficacy does not mean stimulant use disorder is untreatable."
		],
		editorSummary:
			"The evidence is stronger than the availability. The main unresolved work is implementation and durability, not whether well-run contingency management changes verified behavior during treatment.",
		uncertaintySummary:
			"During-treatment benefit is high-confidence. Effect size varies by target and design, and evidence is less certain for long-term outcomes after incentives end and for population-scale implementation.",
		sources: [
			["guideline", "The ASAM/AAAP Clinical Practice Guideline on the Management of Stimulant Use Disorder", "Journal of Addiction Medicine", 2024, "10.1097/ADM.0000000000001299", "Multisociety guideline identifies contingency management as the current standard of care and describes combinations, monitoring, and implementation."],
			["systematic_review", "Psychosocial interventions for stimulant use disorder", "Cochrane Database of Systematic Reviews", 2024, "10.1002/14651858.CD011866.pub3", "Randomized-evidence synthesis compares contingency management and other psychosocial interventions across abstinence, retention, and harms."],
			["systematic_review", "Contingency management for the treatment of methamphetamine use disorder: A systematic review", "Drug and Alcohol Dependence", 2020, "10.1016/j.drugalcdep.2020.108307", "Methamphetamine-focused review finds broad treatment-period benefit while highlighting program and follow-up differences."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Does stopping smoking generally worsen mental health?",
		slug: "does-stopping-smoking-generally-worsen-mental-health",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Nicotine withdrawal can temporarily cause irritability, anxiety, low mood, and poor concentration, but people who sustain smoking cessation do not generally have worse mental health than those who continue. Syntheses associate quitting with small-to-moderate improvements in anxiety, depression, stress, positive mood, and psychological quality of life.",
		stableCore: [
			"Short-term withdrawal symptoms are real and should not be confused with the longer-term mental-health trajectory.",
			"People with mental-health conditions can quit and should have access to medication, behavioral support, and monitoring.",
			"Smoking can feel calming because nicotine briefly relieves withdrawal that prior nicotine exposure helped create."
		],
		openQuestions: [
			"How much of the observed improvement is caused by cessation versus health, social, or treatment factors that also predict successful quitting?",
			"Which supports best prevent temporary withdrawal and relapse for each psychiatric condition and medication regimen?"
		],
		whatWouldChangeMinds: [
			"Bias-resistant longitudinal and randomized evidence showing sustained mental-health deterioration after cessation across populations.",
			"Consistent identification of a subgroup whose net psychiatric harm cannot be mitigated by supported cessation."
		],
		misconceptions: [
			"Feeling worse during early withdrawal does not mean smoking protects long-term mental health.",
			"A psychiatric diagnosis is not a reason to withhold evidence-based cessation treatment.",
			"Improved average symptoms do not promise that every individual's mood will improve immediately."
		],
		editorSummary:
			"The clinically honest message includes both time horizons: withdrawal may be uncomfortable now, while sustained cessation is not associated with worse mental health and often accompanies improvement. Support and monitoring make the transition safer.",
		uncertaintySummary:
			"Moderate certainty reflects consistent associations but serious risk of time-varying confounding in much of the evidence. Withdrawal timing, psychiatric diagnosis, medication metabolism, and support needs vary.",
		sources: [
			["systematic_review", "Smoking cessation for improving mental health", "Cochrane Database of Systematic Reviews", 2021, "10.1002/14651858.CD013522.pub2", "Cochrane review finds no mental-health worsening and small-to-moderate improvements while rating certainty from very low to moderate because most evidence is observational."],
			["guideline", "Smoking and Depression and Anxiety", "Centers for Disease Control and Prevention", 2023, "https://www.cdc.gov/tobacco/campaign/tips/diseases/depression-anxiety.html", "CDC explains nicotine-withdrawal relief, longer-term mental-health evidence, and the value of supported cessation."],
			["landmark_study", "Association Between Smoking Abstinence and Depression and Anxiety Symptoms After Hospital Discharge: The Helping HAND 4 Trial", "Journal of Addiction Medicine", 2025, "10.1097/ADM.0000000000001358", "Prospective trial-cohort analysis adds contemporary evidence that verified abstinence was not associated with worsening depression or anxiety after hospitalization."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Does treating tobacco use undermine recovery from alcohol or other drug use?",
		slug: "does-treating-tobacco-use-undermine-recovery-from-alcohol-or-other-drug-use",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Offering smoking-cessation treatment during recovery does not generally worsen alcohol or other drug outcomes, and some evidence links quitting smoking with better sustained recovery. Tobacco treatment should be coordinated with the person's priorities and other care rather than routinely postponed.",
		stableCore: [
			"Tobacco causes major mortality among people with substance-use and mental-health conditions and deserves treatment in its own right.",
			"Randomized cessation interventions have not shown the feared general loss of sobriety and may improve longer-term abstinence from other substances.",
			"Integrated treatment can address shared triggers, stress, medication interactions, and social environments without demanding simultaneous perfection."
		],
		openQuestions: [
			"Which timing and integrated treatment models maximize both tobacco cessation and recovery retention for each substance and setting?",
			"How much does smoking cessation itself improve other-substance recovery versus reflecting broader recovery progress?"
		],
		whatWouldChangeMinds: [
			"Modern randomized evidence showing that offering tobacco treatment causes clinically important relapse or disengagement across recovery settings.",
			"Comparative programs demonstrating that a deliberately delayed approach produces better overall survival and substance outcomes."
		],
		misconceptions: [
			"Tobacco is not a harmless coping tool simply because another substance created a more immediate crisis.",
			"Offering treatment is not the same as forcing simultaneous abstinence as a condition of care.",
			"An association between quitting both substances does not by itself prove which change caused the other."
		],
		editorSummary:
			"The old fear that tobacco treatment threatens sobriety is not supported as a general rule. Patient-centered integrated care can treat the largest long-term health risk without withholding other addiction treatment.",
		uncertaintySummary:
			"Evidence supports no overall harm and possible recovery benefit, but older trials, changing tobacco products, variable treatment intensity, and self-selection limit the exact causal magnitude.",
		sources: [
			["meta_analysis", "A meta-analysis of smoking cessation interventions with individuals in substance abuse treatment or recovery", "Journal of Consulting and Clinical Psychology", 2004, "10.1037/0022-006X.72.6.1144", "Randomized-trial synthesis found short-term tobacco benefit and no compromise of other-substance recovery, with a higher likelihood of long-term sobriety."],
			["guideline", "Behavioral Health and Tobacco Use", "Centers for Disease Control and Prevention", 2023, "https://www.cdc.gov/tobacco-health-equity/collection/behavioral-health-interactions.html", "CDC summarizes disproportionate tobacco harm and supports integrating evidence-based cessation into behavioral-health and substance-use care."],
			["landmark_study", "Cigarette Smoking During Recovery From Substance Use Disorders", "JAMA Psychiatry", 2025, "10.1001/jamapsychiatry.2025.1976", "Large longitudinal within-person analysis associates transition to smoking abstinence with improved recovery from other substance-use disorders while retaining observational limits."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Can abrupt alcohol withdrawal be medically dangerous?",
		slug: "can-abrupt-alcohol-withdrawal-be-medically-dangerous",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. A person who is physically dependent on alcohol can develop seizures, hallucinations, severe autonomic instability, or delirium after suddenly stopping or sharply reducing intake. Risk cannot be judged from willpower or alcohol amount alone, and people with heavy regular use, prior severe withdrawal, major illness, pregnancy, or concerning symptoms need prompt medical assessment.",
		stableCore: [
			"Alcohol withdrawal can progress rapidly and severe withdrawal is a medical emergency.",
			"Prior withdrawal seizures or delirium, repeated withdrawals, high dependence, and serious coexisting illness increase risk.",
			"Withdrawal management is the start of care, not treatment for the ongoing alcohol use disorder by itself."
		],
		openQuestions: [
			"Which validated tools and biomarkers best predict severe withdrawal across emergency, inpatient, and outpatient settings?",
			"How can withdrawal care transition reliably into medication and continuing treatment for alcohol use disorder?"
		],
		whatWouldChangeMinds: [
			"Robust prospective evidence showing that abrupt cessation is not associated with seizures or delirium in physically dependent people.",
			"Validated lower-burden protocols that safely manage currently high-risk patients outside monitored clinical settings."
		],
		misconceptions: [
			"Advice to seek medical care is not advice to keep drinking indefinitely.",
			"Someone can be at risk even if they do not identify with a stereotype of severe alcohol use disorder.",
			"Feeling better after detoxification does not remove relapse, overdose, liver, cardiovascular, or mental-health risk."
		],
		editorSummary:
			"This page has an urgent safety boundary: severe alcohol withdrawal can kill. It should direct potentially dependent readers toward assessment while making clear that medically managed withdrawal and longer-term treatment solve different problems.",
		uncertaintySummary:
			"The existence and seriousness of severe withdrawal are exceptionally secure. Individual prediction and the safest setting depend on history, current symptoms, medical status, supports, and local clinical capacity.",
		sources: [
			["guideline", "The ASAM Clinical Practice Guideline on Alcohol Withdrawal Management", "Journal of Addiction Medicine", 2020, "10.1097/ADM.0000000000000732", "Clinical guideline defines severity, risk factors, emergency features, monitoring, medications, and transitions from withdrawal management to continuing treatment."],
			["systematic_review", "Benzodiazepines for alcohol withdrawal", "Cochrane Database of Systematic Reviews", 2010, "10.1002/14651858.CD005063.pub3", "Randomized-evidence synthesis supports benzodiazepines for preventing and treating key withdrawal complications while comparing regimens and alternatives."],
			["systematic_review", "Clinical management of alcohol withdrawal: A systematic review", "Industrial Psychiatry Journal", 2013, "10.4103/0972-6748.132914", "Clinical synthesis describes the time course from early symptoms to seizures and delirium and reviews risk-based management."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Is moderate alcohol consumption proven to protect heart health?",
		slug: "is-moderate-alcohol-consumption-proven-to-protect-heart-health",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Some observational studies report lower cardiovascular risk among moderate drinkers than nondrinkers, but healthier-user differences, former-drinker classification, measurement error, and genetic evidence weaken a causal protective interpretation. Major heart organizations do not recommend starting alcohol for health, and alcohol raises risks including cancer, atrial fibrillation, hypertension, injury, and dependence.",
		stableCore: [
			"An observational J-shaped curve does not establish that alcohol caused the lower risk in its middle group.",
			"Potential effects differ by dose pattern, beverage, age, sex, medication, disease, and outcome; binge drinking is harmful even when an average looks moderate.",
			"People who do not drink should not start for cardiovascular prevention, and people who do drink should not interpret a limit as a risk-free target."
		],
		openQuestions: [
			"Can future causal designs isolate any dose-specific cardiovascular benefit from confounding and competing harms?",
			"How should guidance communicate different absolute risks for older adults, younger adults, and people with alcohol-related vulnerability?"
		],
		whatWouldChangeMinds: [
			"Large randomized or comparably strong causal evidence showing net cardiovascular benefit from initiating a defined alcohol dose.",
			"Converging genetic, biomarker, and natural-experiment evidence that survives former-drinker and socioeconomic bias."
		],
		misconceptions: [
			"Moderate is a consumption category, not proof of benefit or absence of harm.",
			"Red wine is not a substitute for diet, activity, blood-pressure control, or indicated medication.",
			"A lower risk for one cardiovascular outcome would not erase cancer, injury, liver, pregnancy, interaction, or addiction risks."
		],
		editorSummary:
			"The responsible conclusion is not that every drink has equal harm. It is that current evidence does not justify prescribing alcohol as preventive medicine, especially when safer interventions have direct outcome evidence.",
		uncertaintySummary:
			"Uncertainty remains about low-dose effects in specific older populations and outcomes. Confidence is stronger that observational protection has been overstated and that total health effects cannot be inferred from coronary disease alone.",
		sources: [
			["consensus_statement", "Alcohol Use and Cardiovascular Disease", "Circulation", 2025, "10.1161/CIR.0000000000001341", "American Heart Association scientific statement weighs observational signals against causal limitations and alcohol-related cardiovascular harms."],
			["systematic_review", "Alcohol consumption in relation to cardiovascular diseases and mortality: a systematic review of Mendelian randomization studies", "European Journal of Epidemiology", 2022, "10.1007/s10654-021-00799-5", "Genetic-instrument review finds little support for a cardioprotective causal effect and challenges the observational J-shaped interpretation."],
			["landmark_study", "Association of Habitual Alcohol Intake With Risk of Cardiovascular Disease", "JAMA Network Open", 2022, "10.1001/jamanetworkopen.2022.3849", "Large cohort and genetic analysis shows nonlinear observational patterns alongside evidence consistent with risk across consumption levels."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Are supervised consumption sites proven to reduce population overdose mortality?",
		slug: "are-supervised-consumption-sites-proven-to-reduce-population-overdose-mortality",
		consensusBand: "mixed",
		confidenceScore: 64,
		evidenceCertainty: "low",
		bottomLine:
			"Not yet. Supervised consumption sites reverse overdoses onsite, have recorded extremely few or no onsite overdose deaths, connect clients with services, and generally do not increase nearby crime. Whether opening sites measurably reduces deaths across an entire city or region remains uncertain because population studies are few, observational, context-dependent, and mixed.",
		stableCore: [
			"Onsite overdose response and safer-consumption outcomes are direct service effects and should not be confused with population mortality.",
			"Population impact depends on capacity, location, hours, drug supply, reach, policing, treatment access, and the share of use occurring onsite.",
			"Existing evidence does not support claims that sites inevitably increase neighborhood crime or drug use, but local implementation still requires measurement."
		],
		openQuestions: [
			"What coverage and service combination is needed to change population overdose mortality during a fentanyl-dominated crisis?",
			"How do mobile, inhalation-inclusive, peer-led, and integrated treatment models compare across mortality, access, public order, and equity?"
		],
		whatWouldChangeMinds: [
			"Replicated controlled natural experiments showing a clear population mortality reduction across different settings and drug supplies.",
			"High-quality evaluations showing no onsite, service-linkage, or neighborhood benefit despite adequate reach and implementation."
		],
		misconceptions: [
			"No death inside a site does not prove fewer deaths across the whole population.",
			"Uncertain population mortality is not evidence that the service has no benefit.",
			"Evidence from one highly used Vancouver facility cannot supply a universal effect size for every city."
		],
		editorSummary:
			"This claim needs two verdicts. Immediate onsite overdose management and service connection are well supported; citywide mortality reduction is plausible but not yet established with the same certainty.",
		uncertaintySummary:
			"Low certainty for population mortality reflects only a handful of observational studies, changing fentanyl exposure, geographic spillovers, concurrent policies, and difficult counterfactuals. Onsite outcomes are more direct and consistent.",
		sources: [
			["systematic_review", "Supervised consumption sites and population-level overdose mortality: a systematic review of recent evidence, 2016-2024", "Health Promotion and Chronic Disease Prevention in Canada", 2025, "10.24095/hpcdp.45.9.02", "Focused review finds mixed population-level mortality associations and clearly separates them from onsite overdose reversal and service linkage; a 2026 corrigendum added clarification about one included study.", "debate", "corrected"],
			["systematic_review", "Supervised Injection Facilities as Harm Reduction: A Systematic Review", "American Journal of Preventive Medicine", 2021, "10.1016/j.amepre.2021.04.017", "Review supports improvements in overdose response, safer behavior, care access, and public order while noting concentration of evidence in a small number of sites."],
			["systematic_review", "Effectiveness of drug consumption facilities to reduce harm and support people who use drugs: a systematic review", "Current HIV/AIDS Reports", 2017, "10.1007/s11904-017-0363-y", "Earlier synthesis finds client and community benefits but highlights observational methods and limits on causal population estimates."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Are fentanyl test strips proven to prevent overdose deaths?",
		slug: "are-fentanyl-test-strips-proven-to-prevent-overdose-deaths",
		consensusBand: "mixed",
		confidenceScore: 63,
		evidenceCertainty: "low",
		bottomLine:
			"Not yet. Fentanyl test strips can detect fentanyl in many drug samples, are feasible to distribute, and sometimes prompt safer behavior, but direct evidence that their use reduces overdose deaths is sparse. A negative result does not make a sample safe, strips cannot measure dose or detect every hazardous substance, and they should be paired with naloxone and other risk-reduction measures.",
		stableCore: [
			"Test strips are a drug-checking tool, not a purity, potency, or safety certificate.",
			"Performance depends on the product, dilution and sampling method, cross-reactants, fentanyl analogue, and whether contamination is evenly distributed.",
			"People can use the information to avoid a sample, use less, avoid using alone, carry naloxone, or seek a checking service, but behavior and outcomes vary."
		],
		openQuestions: [
			"Do test-strip programs reduce nonfatal and fatal overdose when evaluated prospectively against comparable access conditions?",
			"How should drug checking adapt to xylazine, nitazenes, benzodiazepines, uneven mixtures, and rapidly changing local supplies?"
		],
		whatWouldChangeMinds: [
			"Randomized or strong quasi-experimental evidence showing a meaningful reduction in overdose with test-strip access and use.",
			"Real-world evaluations showing that inaccurate reassurance or displacement of stronger precautions causes net harm."
		],
		misconceptions: [
			"A negative strip does not prove that a dose is fentanyl-free or safe.",
			"A positive strip cannot tell how much fentanyl is present.",
			"Unproven mortality impact does not mean strips have no analytical or behavioral value."
		],
		editorSummary:
			"Fentanyl test strips are promising information tools with a much stronger evidence base for detection and feasibility than for mortality. The page should support layered harm reduction without converting a test result into reassurance.",
		uncertaintySummary:
			"Low certainty for overdose prevention reflects no randomized trials and very few studies measuring overdose outcomes. Sensitivity, acceptability, and feasibility are better established than durable behavior or mortality effects.",
		sources: [
			["systematic_review", "Fentanyl Test Strips for Harm Reduction: A Scoping Review", "Journal of Addiction Medicine", 2024, "10.1097/ADM.0000000000001321", "Review of 91 reports finds strong sensitivity, specificity, feasibility, and acceptability evidence but very limited overdose-outcome research."],
			["guideline", "Fentanyl Facts", "Centers for Disease Control and Prevention", 2025, "https://www.cdc.gov/overdose-prevention/about/fentanyl.html", "CDC explains test-strip use and limitations and places drug checking alongside naloxone, avoiding use alone, and other overdose precautions."],
			["landmark_study", "A rapid fentanyl test strip intervention to reduce overdose risk among young adults who use drugs: A pilot study", "Harm Reduction Journal", 2018, "10.1186/s12954-018-0252-8", "Prospective pilot shows feasibility and reported risk-reduction responses while remaining too small and uncontrolled to establish mortality benefit."]
		]
	}),
	reviewedClaim({
		topicSlug: "substance-use-and-addiction",
		title: "Does opioid detoxification without ongoing treatment reduce overdose risk?",
		slug: "does-opioid-detoxification-without-ongoing-treatment-reduce-overdose-risk",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. Withdrawal management alone is not effective treatment for opioid use disorder and can increase overdose vulnerability if relapse occurs after tolerance falls. Ongoing treatment with medications such as buprenorphine or methadone markedly lowers mortality while a person remains engaged, and naloxone, continuity, and rapid re-entry are essential when treatment stops.",
		stableCore: [
			"Detoxification can relieve or manage withdrawal but does not by itself treat craving, relapse risk, social conditions, or the chronic disorder.",
			"Overdose risk is especially high after leaving treatment, hospitalization, or incarceration because tolerance and drug supply may have changed.",
			"Buprenorphine and methadone retention reduce all-cause and overdose mortality, though transitions into and out of treatment remain high-risk periods."
		],
		openQuestions: [
			"Which low-threshold, long-acting, telehealth, and peer-supported models retain more people without coercion?",
			"How can systems prevent gaps after emergency care, detoxification, incarceration, pregnancy transitions, or insurance disruption?"
		],
		whatWouldChangeMinds: [
			"Large prospective evidence showing durable lower overdose mortality after detoxification alone than with continued medication treatment.",
			"A non-maintenance strategy that reliably prevents relapse and death across real-world settings with comparable access."
		],
		misconceptions: [
			"Completing withdrawal does not mean the opioid use disorder has resolved.",
			"Buprenorphine or methadone treatment is not merely substituting an uncontrolled addiction when dose and care are medically managed.",
			"Relapse after detoxification is not a moral failure and should trigger rapid safety support and treatment access."
		],
		editorSummary:
			"The dangerous misconception is treating detox as the finish line. It is a transition point with elevated risk unless it leads directly to ongoing evidence-based treatment, naloxone access, and continuity.",
		uncertaintySummary:
			"The mortality advantage of remaining in medication treatment and the post-treatment risk spike are highly consistent. Optimal medication, duration, delivery, and support should still be individualized.",
		sources: [
			["guideline", "The ASAM National Practice Guideline for the Treatment of Opioid Use Disorder: 2020 Focused Update", "Journal of Addiction Medicine", 2020, "10.1097/ADM.0000000000000633", "Clinical guideline states that withdrawal management alone is not opioid-use-disorder treatment and warns about relapse and overdose after lost tolerance."],
			["meta_analysis", "Mortality risk during and after opioid substitution treatment: systematic review and meta-analysis of cohort studies", "The BMJ", 2017, "10.1136/bmj.j1550", "Large cohort synthesis finds substantially lower mortality during methadone or buprenorphine treatment and elevated risk after treatment cessation."],
			["landmark_study", "Loss of tolerance and overdose mortality after inpatient opiate detoxification: follow up study", "The BMJ", 2003, "10.1136/bmj.326.7396.959", "Follow-up study directly illustrates overdose deaths after detoxification among people who had lost tolerance."]
		]
	})
];
