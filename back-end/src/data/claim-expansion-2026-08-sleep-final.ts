import type { SeedClaim } from "./claims.js";
import {
	august2026EncyclopediaTrancheFiveSourcedClaim as reviewedClaim,
	encyclopediaDoiSources as sources
} from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026SleepFinalClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Can consumer sleep trackers diagnose sleep disorders?",
		slug: "can-consumer-sleep-trackers-diagnose-sleep-disorders",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Many current wearables estimate broad sleep-wake patterns reasonably enough for personal trends, but their sleep stages and clinical-event measures vary by device and algorithm. They cannot diagnose insomnia, sleep apnea, narcolepsy, or another disorder in place of a clinical history and validated testing.",
		stableCore: [
			"Most consumer devices infer sleep from movement and optical signals rather than measuring the full physiology used in polysomnography.",
			"Performance differs across devices, firmware, populations, sleep conditions, and outcomes; proprietary algorithm changes can alter validity.",
			"A concerning pattern or symptom can prompt evaluation, but the device output is not itself a diagnosis."
		],
		openQuestions: [
			"Which consumer metrics remain calibrated in older adults, children, shift workers, and people with sleep or movement disorders?",
			"What validation and change-notification standards should manufacturers meet before making clinical claims?"
		],
		whatWouldChangeMinds: [
			"Independent prospective studies showing a consumer device meets disorder-specific diagnostic accuracy standards across representative clinical populations.",
			"Transparent algorithms demonstrating stable performance across updates and clinically relevant subgroups."
		],
		misconceptions: [
			"A precise-looking sleep-stage graph is not necessarily an accurate measurement.",
			"Trend tracking and diagnosis require different levels of validation.",
			"A normal wearable score does not rule out clinically important symptoms."
		],
		editorSummary:
			"Use a tracker as a diary-like clue, not a sleep laboratory on your wrist; persistent symptoms deserve clinical evaluation.",
		uncertaintySummary:
			"Sleep-wake estimates are improving, but device-specific validation, opaque updates, stage accuracy, and performance in clinical populations limit diagnostic use.",
		sources: sources([
			["meta_analysis", "Performance of consumer wrist-worn sleep tracking devices compared to polysomnography: a meta-analysis", "Journal of Clinical Sleep Medicine", 2025, "10.5664/jcsm.11460", "Device-level synthesis showing useful average measures alongside material disagreement with polysomnography."],
			["landmark_study", "Performance of seven consumer sleep-tracking devices compared with polysomnography", "Sleep", 2020, "10.1093/sleep/zsaa291", "Head-to-head laboratory validation demonstrating substantial variation by device and sleep measure."],
			["systematic_review", "Wearable Sleep Technology in Clinical and Research Settings", "Medicine & Science in Sports & Exercise", 2019, "10.1249/MSS.0000000000001947", "Review distinguishing consumer trend uses from validated clinical assessment and diagnosis."]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Can a short daytime nap improve alertness and cognition?",
		slug: "can-a-short-daytime-nap-improve-alertness-and-cognition",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. A brief daytime nap can improve alertness, reaction time, and some memory or executive outcomes, especially after inadequate sleep. Longer or badly timed naps can produce temporary sleep inertia and may delay nighttime sleep, so a nap is a tactical aid rather than a full replacement for adequate regular sleep.",
		stableCore: [
			"Controlled studies find short-term cognitive and subjective benefits after many daytime naps.",
			"Nap length, circadian timing, prior sleep loss, age, and time allowed to recover from waking change the result.",
			"Deep sleep increases the chance of grogginess immediately after a longer nap."
		],
		openQuestions: [
			"Which nap prescriptions best fit different work schedules, ages, and performance demands?",
			"When does habitual daytime sleep signal or worsen an underlying nighttime sleep problem?"
		],
		whatWouldChangeMinds: [
			"Updated controlled syntheses finding no post-nap benefit after accounting for practice effects and sleep loss.",
			"Evidence that short naps routinely impair later nighttime sleep enough to outweigh daytime gains."
		],
		misconceptions: [
			"A helpful nap does not erase chronic sleep deprivation.",
			"Longer is not always better because sleep inertia can matter.",
			"Daytime sleepiness severe enough to disrupt life warrants more than a nap strategy."
		],
		editorSummary:
			"A short, well-timed nap can restore near-term performance; protect the main sleep period and allow time for grogginess to pass.",
		uncertaintySummary:
			"Average acute benefits are clear, while the best duration and timing vary and evidence on long-term habitual napping is more confounded.",
		sources: sources([
			["meta_analysis", "Effects of a Short Daytime Nap on the Cognitive Performance: A Systematic Review and Meta-Analysis", "International Journal of Environmental Research and Public Health", 2021, "10.3390/ijerph181910212", "Synthesis finding post-nap improvements across several cognitive outcomes and timing conditions."],
			["systematic_review", "The effects of napping on cognitive functioning", "Progress in Brain Research", 2010, "10.1016/B978-0-444-53702-7.00009-9", "Review of sleep inertia and cognitive benefits across nap lengths and prior-sleep conditions."],
			["systematic_review", "Benefits of napping in healthy adults: impact of nap length, time of day, age, and experience with napping", "Journal of Sleep Research", 2009, "10.1111/j.1365-2869.2008.00718.x", "Review mapping how individual and scheduling factors alter nap outcomes."]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does regular exercise improve sleep quality?",
		slug: "does-regular-exercise-improve-sleep-quality",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, on average. Regular aerobic, resistance, or combined exercise can modestly improve perceived sleep quality and insomnia symptoms. Effects vary, and exercise is not a substitute for assessment of sleep apnea or severe insomnia; timing close to bedtime is tolerable for many people but intense late sessions can disturb some sleepers.",
		stableCore: [
			"Randomized-trial syntheses generally find modest improvements in sleep quality and insomnia symptoms.",
			"Both acute activity and sustained training can help, through partially different mechanisms.",
			"Sleep opportunity, medical conditions, exercise dose, timing, fitness, and personal response affect magnitude."
		],
		openQuestions: [
			"Which mode, dose, and timing work best for specific sleep disorders and circadian schedules?",
			"How much improvement is mediated by mood, temperature, fitness, weight change, or circadian timing?"
		],
		whatWouldChangeMinds: [
			"Large low-bias trials showing no sleep benefit across well-adhered exercise programs and validated outcomes.",
			"Evidence that adverse sleep effects from ordinary training outweigh average benefits in most adults."
		],
		misconceptions: [
			"One exhausting workout is not the same as a sustainable sleep intervention.",
			"Exercise cannot diagnose or mechanically open an obstructed airway.",
			"Averages about evening exercise do not override an individual's repeatable response."
		],
		editorSummary:
			"Regular movement is a useful part of sleep health, with realistic expectations and attention to symptoms that need specific treatment.",
		uncertaintySummary:
			"Self-reported sleep improves more consistently than every objective measure; interventions and populations are heterogeneous.",
		sources: sources([
			["meta_analysis", "Effects of Exercise on Sleep Quality and Insomnia in Adults: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Frontiers in Psychiatry", 2021, "10.3389/fpsyt.2021.664499", "Randomized-trial synthesis finding improved sleep quality and insomnia outcomes."],
			["meta_analysis", "The effects of physical activity on sleep: a meta-analytic review", "Journal of Behavioral Medicine", 2015, "10.1007/s10865-015-9617-6", "Broad synthesis separating acute and regular activity effects on subjective and objective sleep."],
			["meta_analysis", "Exercise can improve sleep quality: a systematic review and meta-analysis", "PeerJ", 2018, "10.7717/peerj.5172", "Updated analysis of exercise interventions and sleep-quality outcomes across adult populations."]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does white noise reliably improve sleep?",
		slug: "does-white-noise-reliably-improve-sleep",
		consensusBand: "mixed",
		confidenceScore: 58,
		evidenceCertainty: "very_low",
		bottomLine:
			"Not reliably. Continuous broadband sound can mask intermittent environmental noise and has helped sleep in some small studies, but the overall evidence is low quality and inconsistent. It may also add unwanted sound exposure, so benefits should be judged by the actual setting rather than assuming white noise is inherently sleep-promoting.",
		stableCore: [
			"Sound masking is plausible when unpredictable noise is the main sleep disruption.",
			"Studies use different sounds, volumes, populations, controls, and sleep outcomes, often with small samples.",
			"A device should be kept at a safe level and should not conceal alarms, breathing symptoms, or a treatable environmental problem."
		],
		openQuestions: [
			"Which sound spectra, levels, and bedroom conditions offer net benefit without hearing or arousal costs?",
			"Do benefits persist in larger blinded home trials using objective sleep measures?"
		],
		whatWouldChangeMinds: [
			"Well-powered randomized home studies showing durable clinically meaningful improvement across common insomnia and noise settings.",
			"Better exposure evidence showing recommended long-term levels carry no meaningful auditory or sleep-fragmentation risk."
		],
		misconceptions: [
			"A soothing sound preference is not proof of better sleep physiology.",
			"White, pink, and other noises are not interchangeable interventions.",
			"Masking a noisy room does not fix every cause of insomnia."
		],
		editorSummary:
			"White noise may help a specific noise problem, but current research does not justify a universal sleep-aid claim.",
		uncertaintySummary:
			"The synthesis is limited by small, heterogeneous studies, inconsistent comparators, short follow-up, and possible publication bias.",
		sources: sources([
			["systematic_review", "Noise as a sleep aid: A systematic review", "Sleep Medicine Reviews", 2021, "10.1016/j.smrv.2020.101385", "Review concluding that evidence for continuous noise as a general sleep aid is low quality and inconsistent."],
			["landmark_study", "Broadband Sound Administration Improves Sleep Onset Latency in Healthy Subjects in a Model of Transient Insomnia", "Frontiers in Neurology", 2017, "10.3389/fneur.2017.00718", "Small controlled study illustrating potential benefit under a specific transient-insomnia model."],
			["landmark_study", "The influence of white noise on sleep in subjects exposed to ICU noise", "Sleep Medicine", 2005, "10.1016/j.sleep.2004.12.004", "Small experimental study testing noise masking in an unusually noisy simulated environment."]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Do weighted blankets reliably treat insomnia or anxiety?",
		slug: "do-weighted-blankets-reliably-treat-insomnia-or-anxiety",
		consensusBand: "mixed",
		confidenceScore: 61,
		evidenceCertainty: "low",
		bottomLine:
			"Evidence is promising but not strong enough for a general treatment claim. Some trials report better subjective sleep or reduced anxiety in selected psychiatric or clinical groups, while objective effects and results across populations are inconsistent. Weighted blankets should not replace established care and can be unsafe for someone unable to remove one independently.",
		stableCore: [
			"Small studies support comfort and subjective benefit for some users, but intervention and control conditions vary.",
			"Evidence is concentrated in selected clinical populations and does not establish one ideal weight or diagnosis-wide effect.",
			"Mobility, breathing, circulation, heat, age, and supervision affect safety."
		],
		openQuestions: [
			"Which people experience clinically meaningful benefit beyond expectancy and sensory preference?",
			"What blanket weight, duration, comparator, and safety screening should future trials standardize?"
		],
		whatWouldChangeMinds: [
			"Large blinded or credible-comparator trials showing consistent objective and patient-important benefit across target conditions.",
			"Surveillance showing meaningful rates of respiratory, mobility, thermal, or other harms under ordinary use."
		],
		misconceptions: [
			"Feeling calming is valuable but not identical to treating an anxiety disorder.",
			"One positive psychiatric trial does not establish benefit for every sleeper.",
			"Heavier is not automatically more therapeutic."
		],
		editorSummary:
			"A weighted blanket can be an optional comfort aid for an appropriate user; evidence does not support presenting it as a proven universal treatment.",
		uncertaintySummary:
			"Samples are small, blinding is difficult, subjective outcomes dominate, and populations and blanket protocols differ substantially.",
		sources: sources([
			["meta_analysis", "The effect of weighted blankets on sleep quality and mental health symptoms in people with psychiatric disorders in inpatient and outpatient settings: A systematic review and meta-analysis", "Journal of Psychiatric Research", 2024, "10.1016/j.jpsychires.2024.09.027", "Current synthesis finding possible benefits while emphasizing small, heterogeneous clinical evidence."],
			["landmark_study", "A randomized controlled study of weighted chain blankets for insomnia in psychiatric disorders", "Journal of Clinical Sleep Medicine", 2020, "10.5664/jcsm.8636", "Randomized trial reporting subjective insomnia improvement in a selected psychiatric sample."],
			["systematic_review", "Weighted Blanket Use: A Systematic Review", "American Journal of Occupational Therapy", 2020, "10.5014/ajot.2020.037358", "Review finding more support for anxiety reduction than for broad objective sleep improvement."]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Is mouth taping a proven safe treatment for snoring or sleep apnea?",
		slug: "is-mouth-taping-a-proven-safe-treatment-for-snoring-or-sleep-apnea",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Evidence is sparse, small, and limited to selected people; forcing the mouth closed can be risky with nasal obstruction, vomiting risk, breathing disease, or unrecognized sleep apnea. Snoring and suspected apnea should be evaluated rather than self-treated with a social-media trend.",
		stableCore: [
			"A few small studies suggest mouth closure may change snoring or apnea measures in carefully selected mouth-breathers, but they do not establish broad safety or efficacy.",
			"Obstructive sleep apnea can involve collapse beyond the mouth, so sealing the lips does not reliably open the airway.",
			"Habitual loud snoring, witnessed pauses, choking, or daytime sleepiness can justify clinical assessment."
		],
		openQuestions: [
			"Is there any well-defined low-risk subgroup for whom supervised mouth closure adds benefit to established treatment?",
			"What adverse events occur in unscreened home use, including people with nasal obstruction or severe apnea?"
		],
		whatWouldChangeMinds: [
			"Large controlled trials with airway screening showing sustained benefit and low harm in a clearly defined population.",
			"Reliable post-market safety data demonstrating that unsupervised use does not create clinically important breathing or aspiration risk."
		],
		misconceptions: [
			"Waking with a dry mouth does not identify the cause of disordered breathing.",
			"Less audible snoring does not prove apnea or oxygen levels improved.",
			"A viral wellness practice is not a validated medical treatment."
		],
		editorSummary:
			"Do not seal a breathing route to troubleshoot an undiagnosed airway problem; investigate the snoring and nasal obstruction instead.",
		uncertaintySummary:
			"The evidence base is too small and selective for general safety or treatment claims, and rare but serious harms are poorly measured.",
		sources: sources([
			["systematic_review", "Breaking social media fads and uncovering the safety and efficacy of mouth taping in patients with mouth breathing, sleep disordered breathing, or obstructive sleep apnea: A systematic review", "PLOS One", 2025, "10.1371/journal.pone.0323643", "Systematic review finding limited heterogeneous evidence and important safety concerns."],
			["landmark_study", "The Impact of Mouth-Taping in Mouth-Breathers with Mild Obstructive Sleep Apnea: A Preliminary Study", "Healthcare", 2022, "10.3390/healthcare10091755", "Small selected pilot that cannot establish effectiveness or safety for general or severe apnea populations."],
			["landmark_study", "The Efficacy of a Chinstrap in Treating Sleep Disordered Breathing and Snoring", "Journal of Clinical Sleep Medicine", 2014, "10.5664/jcsm.3962", "Test of a different mouth-closing approach finding that closure alone did not improve obstructive sleep apnea."]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Do magnesium supplements reliably improve insomnia?",
		slug: "do-magnesium-supplements-reliably-improve-insomnia",
		consensusBand: "mixed",
		confidenceScore: 58,
		evidenceCertainty: "low",
		bottomLine:
			"Not reliably for the general population. Small trials in older adults suggest possible modest improvements, but reviews find low-quality, inconsistent evidence and uncertain clinical importance. Correcting a true deficiency is different from assuming extra magnesium treats chronic insomnia, and supplements can cause diarrhea or interact with kidney disease and medicines.",
		stableCore: [
			"Magnesium participates in normal physiology, but biological plausibility does not establish an insomnia treatment effect.",
			"Trials are few, small, short, and heterogeneous in formulation, dose, baseline status, and outcome.",
			"Cognitive behavioral therapy for insomnia has a much stronger evidence base for chronic insomnia."
		],
		openQuestions: [
			"Do people with measured low magnesium benefit more than unselected sleepers?",
			"Which formulation and dose, if any, produces patient-important benefit without adverse effects?"
		],
		whatWouldChangeMinds: [
			"Large preregistered trials showing durable clinically meaningful benefit against credible placebo in defined insomnia populations.",
			"A biomarker-guided trial establishing a reproducible responsive subgroup and safe dosing range."
		],
		misconceptions: [
			"An essential nutrient is not automatically an effective supplement for everyone.",
			"A statistically different questionnaire score may not mean noticeable recovery or daytime function.",
			"More magnesium can be unsafe when kidney clearance is impaired."
		],
		editorSummary:
			"Magnesium is not an established general insomnia treatment; investigate the sleep problem and use better-supported care first.",
		uncertaintySummary:
			"Current estimates are imprecise and at risk of bias; deficiency status and supplement formulation may be important but under-tested moderators.",
		sources: sources([
			["meta_analysis", "Oral magnesium supplementation for insomnia in older adults: a Systematic Review & Meta-Analysis", "BMC Complementary Medicine and Therapies", 2021, "10.1186/s12906-021-03297-z", "Review finding low-certainty signals from a small number of older-adult trials."],
			["systematic_review", "The Role of Magnesium in Sleep Health: a Systematic Review of Available Literature", "Biological Trace Element Research", 2022, "10.1007/s12011-022-03162-1", "Broader review finding mixed observational and intervention evidence and major design limitations."],
			["landmark_study", "The Effect of Melatonin, Magnesium, and Zinc on Primary Insomnia in Long-Term Care Facility Residents in Italy: A Double-Blind, Placebo-Controlled Clinical Trial", "Journal of the American Geriatrics Society", 2011, "10.1111/j.1532-5415.2010.03232.x", "Small combination-supplement trial that cannot isolate magnesium's contribution or generalize beyond selected older adults.", "context"]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Is cannabis an established treatment for chronic insomnia?",
		slug: "is-cannabis-an-established-treatment-for-chronic-insomnia",
		consensusBand: "mixed",
		confidenceScore: 62,
		evidenceCertainty: "low",
		bottomLine:
			"No. Cannabinoids may improve sleep in some people, particularly when pain or another condition is being treated, but insomnia-specific trials are few, short, and heterogeneous. Tolerance, next-day impairment, dependence, psychiatric effects, product variability, and rebound sleep problems complicate routine long-term use.",
		stableCore: [
			"Most randomized evidence comes from patients with other illnesses rather than primary chronic insomnia.",
			"Self-reported sleep can improve while objective sleep architecture, daytime function, and long-term benefit remain uncertain.",
			"THC, CBD, dose, route, timing, and product quality produce materially different exposures and risks."
		],
		openQuestions: [
			"Which cannabinoid formulation, if any, has durable net benefit for a defined insomnia population?",
			"How do tolerance, withdrawal, driving impairment, dependence, and psychiatric risk change the long-term balance?"
		],
		whatWouldChangeMinds: [
			"Long, well-powered insomnia trials showing sustained daytime and nighttime benefit with acceptable dependence and impairment risk.",
			"Comparative trials showing a cannabinoid performs at least as well as established first-line treatment on patient-important outcomes."
		],
		misconceptions: [
			"Feeling sedated is not identical to restorative sleep.",
			"A plant-derived product can still impair, interact, and produce dependence.",
			"Evidence for pain relief with improved sleep does not automatically establish treatment of primary insomnia."
		],
		editorSummary:
			"Cannabis remains an experimental or condition-specific sleep option, not a proven first-line treatment for chronic insomnia.",
		uncertaintySummary:
			"Small short trials, indirect populations, variable products, subjective outcomes, and limited harm follow-up keep certainty low.",
		sources: sources([
			["meta_analysis", "Medical cannabis and cannabinoids for impaired sleep: a systematic review and meta-analysis of randomized clinical trials", "Sleep", 2021, "10.1093/sleep/zsab234", "Synthesis finding small sleep benefits largely in chronic-pain populations and increased adverse effects."],
			["systematic_review", "Is There a Place for Medicinal Cannabis in Treating Patients with Sleep Disorders? What We Know so Far", "Nature and Science of Sleep", 2022, "10.2147/NSS.S340949", "Clinical review emphasizing sparse disorder-specific evidence, product differences, and safety questions."],
			["landmark_study", "Treating insomnia symptoms with medicinal cannabis: a randomized, crossover trial of the efficacy of a cannabinoid medicine compared with placebo", "Sleep", 2021, "10.1093/sleep/zsab149", "Short small crossover trial illustrating possible efficacy but not long-term effectiveness or safety."]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Are sedating antihistamines good regular treatments for chronic insomnia?",
		slug: "are-sedating-antihistamines-good-regular-treatments-for-chronic-insomnia",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. First-generation antihistamines such as diphenhydramine can cause short-term drowsiness, but evidence for chronic insomnia benefit is weak, tolerance can develop, and anticholinergic and next-day effects are important—especially in older adults. Major guidelines favor cognitive behavioral therapy for insomnia and advise against routine diphenhydramine use.",
		stableCore: [
			"Sedation is an adverse pharmacologic effect, not proof of durable restorative sleep or daytime benefit.",
			"Regular use can bring tolerance, dry mouth, constipation, urinary retention, confusion, falls, and residual impairment.",
			"Chronic insomnia benefits from identifying causes and using treatments with durable evidence."
		],
		openQuestions: [
			"What is the true prevalence and harm burden of long-term over-the-counter sleep-aid use?",
			"Which implementation strategies help regular users transition safely to more durable treatment?"
		],
		whatWouldChangeMinds: [
			"Long-term randomized evidence showing sustained patient-important benefit without tolerance, anticholinergic burden, or next-day impairment.",
			"Guideline reassessment concluding that benefits clearly exceed harms in a defined chronic-insomnia subgroup."
		],
		misconceptions: [
			"Over the counter does not mean appropriate for nightly long-term use.",
			"Drowsiness and healthy sleep are not equivalent outcomes.",
			"A medicine can be familiar and still pose greater risk with age or other medications."
		],
		editorSummary:
			"Routine antihistamine sedation is a poor foundation for chronic insomnia care; use durable behavioral treatment and evaluate contributing conditions.",
		uncertaintySummary:
			"The recommendation against routine use is stable; exact long-term harm rates and the safest discontinuation supports need better study.",
		sources: sources([
			["guideline", "Clinical Practice Guideline for the Pharmacologic Treatment of Chronic Insomnia in Adults", "Journal of Clinical Sleep Medicine", 2017, "10.5664/jcsm.6470", "American Academy of Sleep Medicine guideline suggesting clinicians not use diphenhydramine for chronic insomnia."],
			["systematic_review", "Pharmacologic Treatment of Insomnia Disorder: An Evidence Report for a Clinical Practice Guideline by the American College of Physicians", "Annals of Internal Medicine", 2016, "10.7326/M15-1781", "Evidence review finding insufficient durable support for many common over-the-counter approaches."],
			["guideline", "Management of Chronic Insomnia Disorder in Adults: A Clinical Practice Guideline From the American College of Physicians", "Annals of Internal Medicine", 2016, "10.7326/M15-2175", "Guideline recommending cognitive behavioral therapy as initial treatment for chronic insomnia."]
		])
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Do daylight-saving clock changes measurably affect health?",
		slug: "do-daylight-saving-clock-changes-measurably-affect-health",
		consensusBand: "broad",
		confidenceScore: 85,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, but the average short-term effects are small. The spring clock advance causes sleep loss and circadian misalignment and is associated with transient increases in some cardiovascular and safety outcomes. Observational estimates vary, and this evidence does not by itself decide every policy tradeoff between permanent standard time and permanent daylight time.",
		stableCore: [
			"Moving clocks does not instantly move human circadian timing, especially after the spring advance.",
			"Time-series studies and meta-analyses find short-lived population signals rather than a massive risk change for every individual.",
			"Sleep and circadian organizations generally favor permanent standard time because morning light better aligns human biology."
		],
		openQuestions: [
			"How do latitude, chronotype, work schedule, age, and pre-existing disease modify transition effects?",
			"What are the long-run health, safety, energy, economic, and public-preference consequences of each permanent-time policy?"
		],
		whatWouldChangeMinds: [
			"Large controlled natural experiments consistently finding no transition-related sleep, cardiovascular, or safety changes.",
			"Evidence that permanent daylight time produces better net circadian and health outcomes than permanent standard time across latitudes."
		],
		misconceptions: [
			"A small population risk increase does not mean the transition causes an event in most people.",
			"Evidence about twice-yearly switching is not identical to evidence comparing permanent clock policies.",
			"More evening light is not the only biological or social outcome that matters."
		],
		editorSummary:
			"Clock changes create a measurable circadian perturbation; describe its modest scale and keep the transition question separate from permanent-time policy.",
		uncertaintySummary:
			"Natural experiments are vulnerable to coding, weather, weekday, and secular confounding, and results differ by outcome and jurisdiction.",
		sources: sources([
			["meta_analysis", "Daylight Saving Time and Acute Myocardial Infarction: A Meta-Analysis", "Journal of Clinical Medicine", 2019, "10.3390/jcm8030404", "Meta-analysis finding a small transient increase in acute myocardial infarction after the spring transition."],
			["consensus_statement", "Daylight saving time: an American Academy of Sleep Medicine position statement", "Journal of Clinical Sleep Medicine", 2020, "10.5664/jcsm.8780", "Sleep-medicine position linking clock changes to circadian disruption and favoring permanent standard time."],
			["landmark_study", "Daylight saving time transitions and acute myocardial infarction", "Chronobiology International", 2013, "10.3109/07420528.2013.775144", "Population time-series study illustrating the short-lived cardiovascular signal and its uncertainty."]
		])
	})
];
