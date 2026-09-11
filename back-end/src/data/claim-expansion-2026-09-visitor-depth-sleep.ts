import type { SeedClaim } from "./claims.js";
import { september2026VisitorDepthClaim as reviewedClaim } from "./claim-expansion-2026-09-visitor-depth-shared.js";

const nindsUnderstandingSleep = [
	"consensus_statement",
	"Understanding Sleep",
	"National Institute of Neurological Disorders and Stroke",
	2025,
	"https://www.ninds.nih.gov/sites/default/files/2025-05/understanding-sleep.pdf",
	"NIH synthesis explains sleep stages, circadian timing, learning and memory, sleep need, deprivation, and common disorders."
] as const;

const aasmInsomniaSystematicReview = [
	"systematic_review",
	"Behavioral and psychological treatments for chronic insomnia disorder in adults: an American Academy of Sleep Medicine systematic review, meta-analysis, and GRADE assessment",
	"Journal of Clinical Sleep Medicine",
	2021,
	"10.5664/jcsm.8988",
	"AASM evidence review distinguishes multicomponent CBT-I from single-component advice and grades patient-important sleep outcomes."
] as const;

const aasmOralApplianceGuideline = [
	"guideline",
	"Clinical Practice Guideline for the Treatment of Obstructive Sleep Apnea and Snoring with Oral Appliance Therapy",
	"Journal of Clinical Sleep Medicine",
	2015,
	"10.5664/jcsm.4858",
	"Joint AASM and AADSM guideline recommends a custom titratable appliance for appropriate adults who prefer it or cannot tolerate CPAP, with professional fitting and follow-up testing."
] as const;

export const september2026VisitorDepthSleepClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Do people fully adapt to chronic sleep restriction without performance loss?",
		slug: "do-people-fully-adapt-to-chronic-sleep-restriction-without-performance-loss",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. With repeated nights of insufficient sleep, attention lapses and cognitive performance can worsen cumulatively even when people report that their sleepiness has leveled off. Individuals differ, and some tasks are more vulnerable than others, but feeling accustomed to a short schedule is not reliable evidence that objective performance has fully recovered.",
		stableCore: [
			"Controlled dose-response studies show accumulating vigilance impairment across consecutive restricted nights.",
			"Subjective sleepiness and objective performance can diverge, especially after several days.",
			"Recovery time depends on the size and duration of the restriction and may require more than one unrestricted night."
		],
		openQuestions: [
			"Which biological markers can identify people most vulnerable to repeated restriction before a safety-critical failure?",
			"How do real-world naps, stimulants, workload, and recovery schedules alter cumulative deficits over months or years?"
		],
		whatWouldChangeMinds: [
			"Replicated controlled studies showing stable objective performance across weeks of materially restricted sleep without compensatory recovery.",
			"A validated subjective measure that reliably confirms full cognitive adaptation in individuals."
		],
		misconceptions: [
			"Feeling less bothered by sleepiness is not the same as performing normally.",
			"Rare natural short sleepers do not establish that most adults can train themselves to need less sleep.",
			"Caffeine may mask sleepiness temporarily without replacing sleep's full functions."
		],
		editorSummary:
			"The dangerous part of chronic restriction is that self-perception can stabilize while errors keep accumulating. Objective demands, not confidence alone, should guide safety decisions.",
		uncertaintySummary:
			"Cumulative impairment under controlled restriction is robust. Individual vulnerability, affected domains, and the recovery needed after long real-world restriction vary.",
		sources: [
			[
				"landmark_study",
				"The cumulative cost of additional wakefulness: dose-response effects on neurobehavioral functions and sleep physiology from chronic sleep restriction and total sleep deprivation",
				"Sleep",
				2003,
				"10.1093/sleep/26.2.117",
				"Fourteen-day laboratory study found dose-dependent cumulative cognitive deficits and showed that subjective sleepiness underestimated impairment."
			],
			[
				"landmark_study",
				"Patterns of performance degradation and restoration during sleep restriction and subsequent recovery: a sleep dose-response study",
				"Journal of Sleep Research",
				2003,
				"10.1046/j.1365-2869.2003.00337.x",
				"Controlled study found performance degradation across restricted schedules and dose-dependent restoration during recovery."
			],
			nindsUnderstandingSleep
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does drowsy driving materially increase crash risk?",
		slug: "does-drowsy-driving-materially-increase-crash-risk",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Sleep loss and sleepiness slow responses, impair attention and judgment, increase lane deviations, and can cause microsleeps, materially raising crash risk. Opening a window, turning up music, or relying on willpower is not a dependable countermeasure; a sleepy driver should stop driving and obtain sleep or change drivers.",
		stableCore: [
			"Crash risk rises with acute sleep loss, long time awake, circadian low points, night work, and untreated sleep disorders.",
			"Drivers often underestimate impairment and may have no memory of a microsleep.",
			"Adequate sleep is the primary prevention; caffeine and a brief nap can be temporary emergency aids but do not make severe sleepiness safe."
		],
		openQuestions: [
			"Which vehicle-based detection and warning systems prevent crashes without producing false reassurance?",
			"Which work-hour, licensing, screening, and public-education policies most effectively reduce population harm?"
		],
		whatWouldChangeMinds: [
			"High-quality natural experiments showing no increase in objective driving errors or crashes after substantial sleep loss.",
			"A validated intervention that restores safe driving performance despite ongoing severe sleepiness."
		],
		misconceptions: [
			"A driver does not need to fall fully asleep for attention failures to become dangerous.",
			"Experience on a familiar route does not protect against microsleeps.",
			"Being legally allowed to drive does not mean a particular fatigued trip is safe."
		],
		editorSummary:
			"Drowsiness is a driving impairment, not merely discomfort. The safe response is to remove the driver from the task, not to improvise stimulation while continuing.",
		uncertaintySummary:
			"The causal impairment is clear. Exact crash fractions are hard to measure because fatigue is underreported and often leaves no definitive post-crash marker.",
		sources: [
			[
				"systematic_review",
				"A systematic review of studies investigating the impact of sleep deprivation on drivers' physiology and driving performance",
				"Transportation Research Part F: Traffic Psychology and Behaviour",
				2024,
				"10.1016/j.trf.2024.12.001",
				"Systematic review synthesizes objective driving impairment associated with sleepiness across experimental and observational designs."
			],
			[
				"consensus_statement",
				"Sleep-deprived motor vehicle operators are unfit to drive: a multidisciplinary expert consensus statement on drowsy driving",
				"Sleep Health",
				2016,
				"10.1016/j.sleh.2016.04.003",
				"Sleep experts identify insufficient sleep, time awake, circadian timing, and sleep disorders as important preventable driving risks."
			],
			[
				"guideline",
				"Driver Fatigue on the Job",
				"National Institute for Occupational Safety and Health",
				2024,
				"https://www.cdc.gov/niosh/motor-vehicle/driver-fatigue/index.html",
				"CDC workplace guidance describes fatigue-related impairment, warning signs, and the need to stop rather than rely on ineffective tricks."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does sleep support memory consolidation after learning?",
		slug: "does-sleep-support-memory-consolidation-after-learning",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Sleep after learning supports the stabilization and reorganization of several kinds of memory, including declarative facts and procedural skills. It does not photograph every experience or guarantee recall, and effects depend on timing, task, sleep stage, prior learning, and interference, but sleep is an active part of memory processing rather than passive downtime.",
		stableCore: [
			"Both non-REM and REM physiology contribute to memory processing through partly different mechanisms.",
			"Experimental sleep and nap studies show benefits that cannot be explained only by time passing.",
			"Sleep before learning also matters because severe sleep loss impairs attention and initial encoding."
		],
		openQuestions: [
			"How are specific memories selected for strengthening, integration, abstraction, or forgetting during sleep?",
			"Which targeted cueing or stimulation methods can improve clinically important learning safely and durably?"
		],
		whatWouldChangeMinds: [
			"Converging experiments showing no memory difference when sleep and wake conditions are equated for interference and circadian timing.",
			"A better mechanism explaining stage-specific neural replay and experimental sleep effects without a consolidation role."
		],
		misconceptions: [
			"Sleep cannot create knowledge that was never encoded or practiced.",
			"A single all-nighter may impair both learning and later consolidation even if the person feels productive.",
			"Memory benefit does not mean every extra hour of sleep yields unlimited improvement."
		],
		editorSummary:
			"Learning continues after study ends. Sleep helps stabilize and reorganize what the brain encoded, while also preparing attention systems for new learning.",
		uncertaintySummary:
			"A general consolidation role is strongly supported. Effect size and mechanism vary by memory system, task, age, sleep architecture, and experimental control.",
		sources: [
			[
				"systematic_review",
				"Sleep and memory consolidation in healthy, neurotypical children, and adults: a summary of systematic reviews and meta-analyses",
				"Essays in Biochemistry",
				2023,
				"10.1042/ETLS20230110",
				"Review of reviews synthesizes converging evidence and unresolved mechanisms across declarative, procedural, emotional, and working memory."
			],
			[
				"systematic_review",
				"About sleep's role in memory",
				"Physiological Reviews",
				2013,
				"10.1152/physrev.00032.2012",
				"Comprehensive mechanistic review explains consolidation through systems, synaptic, and stage-dependent processes."
			],
			nindsUnderstandingSleep
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Is REM sleep the only sleep stage important for memory?",
		slug: "is-rem-sleep-the-only-sleep-stage-important-for-memory",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Slow-wave and other non-REM sleep processes are central to many forms of declarative and spatial memory, while REM is implicated in emotional, procedural, associative, and integrative processing. The stages interact across sleep cycles, and no simple rule assigns every memory type to one exclusive stage.",
		stableCore: [
			"Deep non-REM sleep supports hippocampal-neocortical communication and replay linked to memory stabilization.",
			"REM has distinctive neural and chemical conditions that may support integration and emotional processing.",
			"Normal memory benefits emerge from repeated cycles and transitions, not from maximizing one stage in isolation."
		],
		openQuestions: [
			"Which stage features are causal for specific transformations rather than merely correlated with them?",
			"How do age, disease, medication, and targeted stage disruption change the division of memory work?"
		],
		whatWouldChangeMinds: [
			"Selective, replicated experiments showing that removing all non-REM contributions leaves memory consolidation intact across memory systems.",
			"Evidence that REM alone accounts for replay, stabilization, integration, and forgetting observed throughout sleep."
		],
		misconceptions: [
			"Dream vividness does not measure how much useful memory processing occurred.",
			"A consumer estimate of REM time cannot diagnose a memory problem.",
			"More of one stage is not automatically better when healthy sleep architecture requires balance and cycling."
		],
		editorSummary:
			"Memory is not assigned to a single nighttime department. Different sleep states contribute interacting operations across repeated cycles.",
		uncertaintySummary:
			"Multiple-stage involvement is well established. Precise causal assignments remain debated because stage manipulation can disturb other sleep features.",
		sources: [
			[
				"systematic_review",
				"About sleep's role in memory",
				"Physiological Reviews",
				2013,
				"10.1152/physrev.00032.2012",
				"Comprehensive review describes complementary non-REM and REM contributions instead of a REM-only model."
			],
			[
				"systematic_review",
				"Sleep and memory consolidation in healthy, neurotypical children, and adults: a summary of systematic reviews and meta-analyses",
				"Essays in Biochemistry",
				2023,
				"10.1042/ETLS20230110",
				"Cross-domain synthesis emphasizes that memory outcomes depend on several sleep stages and physiological features."
			],
			[
				"guideline",
				"How Sleep Works: Sleep Phases and Stages",
				"National Heart, Lung, and Blood Institute",
				2022,
				"https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep",
				"NIH explains the recurring architecture of non-REM and REM sleep and their distinct physiological features."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Can caffeine consumed six hours before bedtime still disrupt sleep?",
		slug: "can-caffeine-consumed-six-hours-before-bedtime-still-disrupt-sleep",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Controlled evidence shows that a substantial caffeine dose even six hours before bed can shorten sleep, and meta-analysis finds later caffeine generally delays sleep, reduces total sleep, and alters sleep depth. Sensitivity and clearance vary widely, so six hours is not a universal safe cutoff and smaller doses may matter less.",
		stableCore: [
			"Caffeine blocks adenosine signaling and has a half-life long enough for meaningful amounts to remain at bedtime.",
			"People may underestimate sleep disruption because subjective impressions do not capture every change in duration or architecture.",
			"Dose, habitual use, genetics, pregnancy, medications, age, smoking, and timing change the effect."
		],
		openQuestions: [
			"Can personalized cutoff guidance improve sleep without imposing unnecessary restriction on low-sensitivity users?",
			"How do repeated small doses and newer high-caffeine products alter real-world sleep across different chronotypes?"
		],
		whatWouldChangeMinds: [
			"Repeated controlled trials showing that caffeine six hours before bed has no objective or subjective sleep effect at commonly consumed doses.",
			"Evidence that residual caffeine at bedtime does not alter adenosine-linked sleep regulation."
		],
		misconceptions: [
			"Being able to fall asleep after coffee does not prove sleep duration and quality were unaffected.",
			"Six hours is evidence that effects can persist, not a guaranteed cutoff for every person.",
			"Tolerance to alerting effects may be incomplete and does not ensure complete tolerance to sleep disruption."
		],
		editorSummary:
			"Caffeine timing reaches farther into the evening than many people feel. A personal trial of earlier or lower intake can be more informative than assuming bedtime alone defines exposure.",
		uncertaintySummary:
			"Average sleep disruption is well supported. The practical cutoff and minimum consequential dose vary considerably between individuals.",
		sources: [
			[
				"landmark_study",
				"Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed",
				"Journal of Clinical Sleep Medicine",
				2013,
				"10.5664/jcsm.3170",
				"Randomized crossover trial found a 400 mg dose reduced sleep even when taken six hours before bedtime."
			],
			[
				"meta_analysis",
				"The effect of caffeine on subsequent sleep: a systematic review and meta-analysis",
				"Sleep Medicine Reviews",
				2023,
				"10.1016/j.smrv.2023.101764",
				"Meta-analysis estimates average changes in sleep onset, duration, efficiency, and deep sleep and derives dose-and-timing guidance."
			],
			nindsUnderstandingSleep
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Is sleep hygiene alone an effective treatment for chronic insomnia?",
		slug: "is-sleep-hygiene-alone-an-effective-treatment-for-chronic-insomnia",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Usually not. A regular schedule, appropriate light, less late caffeine, and a workable sleep environment can support sleep, but education about these habits alone is not the recommended stand-alone treatment for chronic insomnia. Multicomponent cognitive behavioral therapy for insomnia, or CBT-I, directly addresses conditioned wakefulness, time in bed, sleep beliefs, and relapse prevention and has stronger evidence.",
		stableCore: [
			"Many people with chronic insomnia already know common sleep-hygiene advice yet remain unable to sleep reliably.",
			"CBT-I combines behavioral and cognitive components rather than relying on general lifestyle tips.",
			"Persistent insomnia also warrants assessment for medical, psychiatric, circadian, medication, and other sleep-disorder contributors."
		],
		openQuestions: [
			"Which digital, brief, group, and stepped-care CBT-I models best expand access without losing effectiveness?",
			"Which patients benefit from specific components, medication combinations, or treatment of comorbid conditions first?"
		],
		whatWouldChangeMinds: [
			"Well-powered trials showing education-only sleep hygiene matches multicomponent CBT-I for durable remission of chronic insomnia.",
			"Evidence that CBT-I components add no meaningful patient benefit beyond general advice."
		],
		misconceptions: [
			"Failure to improve after basic advice is not proof that a patient is lazy or noncompliant.",
			"Sleep hygiene can be useful without being sufficient treatment by itself.",
			"CBT-I is a structured clinical intervention, not simply being told to relax or put the phone away."
		],
		editorSummary:
			"Good habits create supportive conditions, but chronic insomnia is often self-reinforcing. Treatment works on the learned and cognitive mechanisms that a checklist alone does not reverse.",
		uncertaintySummary:
			"Guidelines consistently favor multicomponent treatment over sleep hygiene alone. Access, comorbidity, component choice, and individual response remain variable.",
		sources: [
			aasmInsomniaSystematicReview,
			[
				"guideline",
				"Behavioral and psychological treatments for chronic insomnia disorder in adults: an American Academy of Sleep Medicine clinical practice guideline",
				"Journal of Clinical Sleep Medicine",
				2021,
				"10.5664/jcsm.8986",
				"AASM recommends multicomponent CBT-I and advises against sleep hygiene as a single-component treatment."
			],
			[
				"guideline",
				"New guideline supports behavioral, psychological treatments for insomnia",
				"American Academy of Sleep Medicine",
				2021,
				"https://aasm.org/new-guideline-supports-behavioral-psychological-treatments-for-insomnia/",
				"AASM public guidance explains why sleep hygiene should not be used as a stand-alone chronic insomnia treatment."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Can correctly timed melatonin shift the circadian clock?",
		slug: "can-correctly-timed-melatonin-shift-the-circadian-clock",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Melatonin is a biological timing signal, and doses taken at the appropriate circadian phase can shift the internal clock earlier or later. Timing is often more important than taking a large dose, and a mistimed dose can be ineffective or shift in the unwanted direction. This circadian use is different from treating every case of chronic insomnia as a simple melatonin deficiency.",
		stableCore: [
			"The direction and size of a shift follow a phase-response curve tied to internal biological time.",
			"Timed light exposure and darkness are powerful companion signals and can reinforce or oppose melatonin's effect.",
			"Delayed sleep-wake phase, jet lag, shift work, and non-24-hour disorders are distinct problems requiring different schedules."
		],
		openQuestions: [
			"How can practical care estimate circadian phase without expensive repeated laboratory sampling?",
			"What dose, formulation, and light schedule best balance adherence, precision, and next-day effects for each disorder?"
		],
		whatWouldChangeMinds: [
			"Replicated phase-marker studies showing no direction-dependent clock shift from melatonin across circadian timing.",
			"A model that predicts observed phase shifts without melatonin acting as a timing signal."
		],
		misconceptions: [
			"Taking melatonin at bedtime is not automatically the right schedule for shifting a clock.",
			"A larger dose is not necessarily a larger or better phase shift.",
			"Clock shifting and immediate sedation are related but different outcomes."
		],
		editorSummary:
			"Melatonin works partly as a message about biological time. The clock reads that message differently depending on when it arrives.",
		uncertaintySummary:
			"Phase-shifting is established under controlled conditions and in selected circadian disorders. Real-world precision is limited by uncertain internal phase, light exposure, product quality, and adherence.",
		sources: [
			[
				"landmark_study",
				"A three pulse phase response curve to three milligrams of melatonin in humans",
				"The Journal of Physiology",
				2007,
				"10.1113/jphysiol.2007.143180",
				"Controlled phase-marker study maps circadian advances and delays produced by melatonin administered at different biological times."
			],
			[
				"guideline",
				"Clinical Practice Guideline for the Treatment of Intrinsic Circadian Rhythm Sleep-Wake Disorders",
				"American Academy of Sleep Medicine",
				2015,
				"https://www.aasm.org/resources/clinicalguidelines/crswd-intrinsic.pdf",
				"AASM evaluates strategically timed melatonin and light for specific circadian rhythm sleep-wake disorders."
			],
			nindsUnderstandingSleep
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does irregular sleep timing matter even when total sleep duration seems adequate?",
		slug: "does-irregular-sleep-timing-matter-even-when-total-sleep-duration-seems-adequate",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Probably yes. Large observational studies associate irregular sleep timing and duration with worse cardiometabolic, mental-health, and mortality outcomes even after accounting for average sleep duration. Laboratory circadian disruption also changes metabolism and physiology. However, irregularity may partly reflect shift work, illness, stress, caregiving, or social disadvantage, so the long-term causal effect of regularizing sleep is less certain than the association.",
		stableCore: [
			"Sleep health includes regularity and circadian alignment as well as total duration.",
			"Week-to-week averages can hide repeated swings between short and long sleep or early and late timing.",
			"Consistent wake time and morning light can help stabilize timing, but rigid schedules are not feasible or necessary for everyone."
		],
		openQuestions: [
			"Do interventions that improve regularity independently reduce cardiovascular, metabolic, or psychiatric events?",
			"How much variability is benign across chronotypes, life stages, cultures, caregiving, and flexible work?"
		],
		whatWouldChangeMinds: [
			"Randomized long-term evidence showing that changing regularity does not alter intermediate or clinical outcomes.",
			"Better causal analyses showing the observed associations are fully explained by duration, illness, occupation, or social conditions."
		],
		misconceptions: [
			"An observational association does not prove that schedule variability caused every health difference.",
			"Regularity does not require sleeping and waking at the exact same minute daily.",
			"Adequate average duration does not guarantee adequate sleep on each individual night."
		],
		editorSummary:
			"Duration is not the whole sleep pattern. Regularity appears to carry additional information, but intervention evidence has not yet caught up with the strength of the associations.",
		uncertaintySummary:
			"Consensus supports regularity as a dimension of sleep health. Causal effect sizes and optimal flexibility remain uncertain because most long-term outcome evidence is observational.",
		sources: [
			[
				"consensus_statement",
				"The importance of sleep regularity: a consensus statement of the National Sleep Foundation sleep timing and variability panel",
				"Sleep Health",
				2023,
				"10.1016/j.sleh.2023.07.016",
				"Expert consensus defines sleep regularity as a distinct sleep-health dimension and recommends standardized measurement and reporting."
			],
			[
				"landmark_study",
				"Sleep Irregularity and Risk of Cardiovascular Events",
				"Journal of the American College of Cardiology",
				2020,
				"10.1016/j.jacc.2019.12.054",
				"Prospective cohort study links greater sleep variability to incident cardiovascular disease after adjustment for average sleep duration and other risks."
			],
			nindsUnderstandingSleep
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does treating obstructive sleep apnea reduce motor-vehicle crash risk?",
		slug: "does-treating-obstructive-sleep-apnea-reduce-motor-vehicle-crash-risk",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, when effective treatment is used consistently. Untreated obstructive sleep apnea is associated with substantially higher motor-vehicle crash risk, and observational before-and-after evidence indicates that adherent CPAP treatment lowers that risk toward that of drivers without apnea. The exact benefit for one person depends on disease severity, sleepiness, treatment response, adherence, and other driving risks.",
		stableCore: [
			"Repeated airway obstruction fragments sleep and can produce impaired vigilance even when sleep duration appears adequate.",
			"CPAP can normalize breathing during use, but an unused machine cannot reduce risk.",
			"Driving fitness requires clinical assessment rather than diagnosis alone because impairment and treatment response vary."
		],
		openQuestions: [
			"Which combination of symptoms, biomarkers, adherence data, and driving measures best predicts individual residual risk?",
			"How effectively do oral appliances, surgery, weight loss, and newer treatments reduce real-world crashes compared with CPAP?"
		],
		whatWouldChangeMinds: [
			"Well-controlled evidence showing no crash reduction after objectively verified effective treatment and adherence.",
			"Evidence that the untreated association is fully explained by other driver characteristics rather than apnea-related impairment."
		],
		misconceptions: [
			"Having sleep apnea does not mean every person will crash or must permanently stop driving.",
			"Starting treatment is not the same as demonstrating effective, sustained use.",
			"Reduced crash risk does not prove that CPAP prevents every cardiovascular or cognitive outcome."
		],
		editorSummary:
			"Sleep-apnea treatment is also a public-safety intervention when it restores alertness. The clearest benefit depends on actual control of the disorder, not merely possession of equipment.",
		uncertaintySummary:
			"The untreated risk increase and reduction after adherent CPAP are consistent, but crash outcomes rely mainly on observational designs because withholding effective therapy for long periods would be problematic.",
		sources: [
			[
				"meta_analysis",
				"Obstructive sleep apnea and risk of motor vehicle crash: systematic review and meta-analysis",
				"Journal of Clinical Sleep Medicine",
				2009,
				"https://pmc.ncbi.nlm.nih.gov/articles/PMC2792976/",
				"Meta-analysis finds increased crash risk among drivers with obstructive sleep apnea and examines severity and sleepiness predictors."
			],
			[
				"meta_analysis",
				"Continuous positive airway pressure reduces risk of motor vehicle crash among drivers with obstructive sleep apnea: systematic review and meta-analysis",
				"Sleep",
				2010,
				"10.1093/sleep/33.10.1373",
				"Before-and-after synthesis finds a substantial reduction in crashes after CPAP treatment."
			],
			[
				"consensus_statement",
				"Sleep Disorders and Sleep Deprivation: An Unmet Public Health Problem",
				"National Academies of Sciences, Engineering, and Medicine",
				2006,
				"10.17226/11617",
				"National Academies reviews sleep-disorder consequences, accident risk, underdiagnosis, and public-health responses."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Can a custom oral appliance treat obstructive sleep apnea when CPAP is not tolerated or preferred?",
		slug: "can-a-custom-oral-appliance-treat-obstructive-sleep-apnea-when-cpap-is-not-tolerated-or-preferred",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, for many adults. A custom, titratable mandibular-advancement appliance fitted by a qualified dentist can reduce obstructive events and symptoms and is guideline-supported when a patient cannot tolerate CPAP or prefers an alternative. CPAP usually lowers the apnea-hypopnea index more, while comfort and adherence can make real-world effectiveness more comparable for some outcomes.",
		stableCore: [
			"Evidence applies to professionally fitted custom titratable devices, not generic anti-snoring products sold without assessment.",
			"Effectiveness varies with anatomy and disease, so follow-up sleep testing is recommended rather than relying only on reduced snoring.",
			"Dental, jaw, bite, and device effects require ongoing qualified follow-up."
		],
		openQuestions: [
			"Which anatomical and physiological measures best predict who will respond completely?",
			"How do long-term cardiovascular outcomes compare across oral appliances, CPAP, surgery, positional therapy, and combined treatment?"
		],
		whatWouldChangeMinds: [
			"Updated randomized syntheses showing custom titratable appliances do not improve objective apnea or patient-important outcomes.",
			"Evidence that adverse dental or cardiovascular outcomes outweigh benefit in the currently recommended population."
		],
		misconceptions: [
			"A quieter bed partner does not prove that apnea and oxygen disruption are controlled.",
			"An oral appliance is not a one-size-fits-all mouthguard.",
			"Being less potent on a laboratory index than CPAP does not make the option ineffective when it is used more consistently."
		],
		editorSummary:
			"The best device is one that both controls the disorder and is actually used. Oral appliances are a legitimate clinical option, but fitting and objective follow-up distinguish therapy from a retail gadget.",
		uncertaintySummary:
			"Benefits for apnea indices, sleepiness, and quality of life are established in selected adults. Complete response, long-term dental effects, and comparative cardiovascular outcomes vary.",
		sources: [
			aasmOralApplianceGuideline,
			[
				"systematic_review",
				"Oral appliance therapy for the management of obstructive sleep apnea in adults: an umbrella review",
				"JBI Evidence Synthesis",
				2025,
				"10.11124/JBIES-23-00539",
				"Umbrella review synthesizes effectiveness, adherence, adverse effects, and comparative evidence across existing reviews."
			],
			[
				"guideline",
				"Oral appliance therapy clinical guideline published jointly by AASM and AADSM",
				"American Academy of Sleep Medicine",
				2015,
				"https://aasm.org/oral-appliance-therapy-clinical-guideline-published-jointly-by-aasm-and-aadsm/",
				"AASM public summary emphasizes qualified dental fitting, custom titratable devices, follow-up testing, and use when CPAP is not tolerated or is not preferred."
			]
		]
	})
];
