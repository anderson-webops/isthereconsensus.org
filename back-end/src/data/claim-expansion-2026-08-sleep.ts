import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026SleepClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Do most healthy adults need at least seven hours of sleep?",
		slug: "do-most-healthy-adults-need-at-least-seven-hours-of-sleep",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Most healthy adults should regularly get at least seven hours of sleep, with roughly seven to nine hours fitting many adults. Individual need varies, and sleep quality, timing, regularity, and untreated disorders matter too. A small number of natural short sleepers function well on less, but routinely feeling fine after restriction does not prove full recovery.",
		stableCore: [
			"Expert panels converge on at least seven hours per night for healthy adults as a population recommendation.",
			"Regular short sleep is associated with impaired alertness and higher cardiometabolic, mental-health, accident, and mortality risks.",
			"Young adults, people recovering from sleep debt, and people who are ill may appropriately need more than nine hours.",
			"Duration alone cannot diagnose healthy sleep; fragmentation, apnea, circadian misalignment, and daytime impairment also matter."
		],
		openQuestions: [
			"How should recommendations be individualized by genetics, age, illness, pregnancy, workload, and sleep quality?",
			"Which long-term health associations are directly caused by sleep duration rather than illness or social conditions that alter sleep?"
		],
		whatWouldChangeMinds: [
			"Convergent experimental and longitudinal evidence showing that routinely sleeping under seven hours preserves health and performance for most adults.",
			"Validated individual measures that predict substantially different sleep need better than current population guidance."
		],
		misconceptions: [
			"Seven hours is a population floor, not a promise that seven is optimal for every person.",
			"Getting used to feeling sleepy does not mean attention and reaction time have fully adapted.",
			"Long sleep can be a marker of illness; an association does not prove that extra sleep itself is harmful."
		],
		editorSummary:
			"The practical consensus is clear enough for public guidance: most adults should protect at least seven hours. Individual variation is real, but it should not be used to normalize chronic restriction.",
		uncertaintySummary:
			"High certainty supports the population recommendation. Exact personal need and long-term causal estimates are less precise because much health evidence is observational and sleep is often self-reported.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Recommended Amount of Sleep for a Healthy Adult: A Joint Consensus Statement of the American Academy of Sleep Medicine and Sleep Research Society",
				publisher: "Journal of Clinical Sleep Medicine",
				year: 2015,
				url: "https://doi.org/10.5664/jcsm.4758",
				doi: "10.5664/jcsm.4758",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Expert consensus recommending seven or more hours per night on a regular basis for healthy adults, with explicit caveats about longer sleep and individual circumstances.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Sleep duration and health in adults: an overview of systematic reviews",
				publisher: "Applied Physiology, Nutrition, and Metabolism",
				year: 2020,
				url: "https://doi.org/10.1139/apnm-2020-0034",
				doi: "10.1139/apnm-2020-0034",
				appraisal: "high",
				stance: "supports",
				note: "Umbrella review finding the most favorable adult health associations around seven to eight hours while documenting the limits of predominantly observational evidence.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "National Sleep Foundation's sleep time duration recommendations: methodology and results summary",
				publisher: "Sleep Health",
				year: 2015,
				url: "https://doi.org/10.1016/j.sleh.2014.12.010",
				doi: "10.1016/j.sleh.2014.12.010",
				appraisal: "high",
				stance: "context",
				note: "Independent multidisciplinary recommendation describing age-specific ranges and the uncertainty outside generally recommended durations.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Can weekend catch-up sleep fully erase chronic sleep debt?",
		slug: "can-weekend-catch-up-sleep-fully-erase-chronic-sleep-debt",
		consensusBand: "broad",
		confidenceScore: 80,
		evidenceCertainty: "moderate",
		bottomLine:
			"Extra weekend sleep can reduce immediate sleepiness and may improve some outcomes, but it does not reliably erase all performance, metabolic, or circadian effects of repeatedly sleeping too little during the week. Regular adequate sleep is preferable; catch-up is partial recovery, not a complete reset.",
		stableCore: [
			"Recovery sleep repays some acute sleep pressure, so sleeping longer after restriction is biologically useful.",
			"Different functions recover at different rates; subjective alertness can improve before every cognitive or metabolic measure normalizes.",
			"Large shifts between weekday and weekend schedules can add circadian misalignment, sometimes called social jet lag.",
			"Observational links between catch-up sleep and better health do not prove that catch-up cancels the harm of chronic restriction."
		],
		openQuestions: [
			"How much recovery sleep is useful without creating additional circadian disruption for different chronotypes?",
			"Which health effects recover after days, weeks, or sustained schedule change rather than one weekend?"
		],
		whatWouldChangeMinds: [
			"Repeated controlled studies showing that weekend recovery fully normalizes cognitive, metabolic, and circadian outcomes during recurring restriction.",
			"Long-term causal evidence that a stable catch-up pattern performs as well as regular adequate sleep across major health outcomes."
		],
		misconceptions: [
			"Partial recovery is not the same as no benefit.",
			"Feeling better on Sunday does not prove that every accumulated deficit is gone.",
			"Associations with lower depression or mortality can reflect work schedules, illness, and socioeconomic differences."
		],
		editorSummary:
			"Catch-up sleep is better framed as harm reduction than as a bank-account repayment that returns every system to zero. It can help, but it should not become reassurance for a chronically inadequate schedule.",
		uncertaintySummary:
			"Controlled trials are short, while long-term studies are observational and define catch-up differently. Benefits and residual deficits vary by outcome, restriction severity, timing, and chronotype.",
		sources: [
			{
				kind: "systematic_review",
				title: "Can weekend catch-up sleep repay the sleep debt? Balancing short-term relief with long-term risks",
				publisher: "Sleep and Breathing",
				year: 2025,
				url: "https://doi.org/10.1007/s11325-025-03473-2",
				doi: "10.1007/s11325-025-03473-2",
				isAnchor: true,
				appraisal: "moderate",
				stance: "supports",
				note: "Review concluding that weekend recovery may provide short-term relief but is not a reliable or sustainable full repayment strategy.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Ad libitum Weekend Recovery Sleep Fails to Prevent Metabolic Dysregulation during a Repeating Pattern of Insufficient Sleep and Weekend Recovery Sleep",
				publisher: "Current Biology",
				year: 2019,
				url: "https://doi.org/10.1016/j.cub.2019.01.069",
				doi: "10.1016/j.cub.2019.01.069",
				appraisal: "high",
				stance: "supports",
				note: "Controlled laboratory study finding that weekend recovery did not prevent metabolic disruption when insufficient sleep resumed.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Association of weekend catch-up sleep with depression: A systematic review and meta-analysis",
				publisher: "Journal of Affective Disorders",
				year: 2025,
				url: "https://doi.org/10.1016/j.jad.2025.02.080",
				doi: "10.1016/j.jad.2025.02.080",
				appraisal: "moderate",
				stance: "context",
				note: "Observational synthesis associating moderate catch-up sleep with lower depression risk while underscoring nonlinearity and residual confounding.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does alcohol improve sleep when used as a nightcap?",
		slug: "does-alcohol-improve-sleep-when-used-as-a-nightcap",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Alcohol can make some people fall asleep faster, but it does not improve sleep overall. Even relatively low pre-sleep doses can reduce REM sleep, and higher doses disrupt normal sleep architecture and often produce poorer, more fragmented sleep later in the night. Alcohol can also worsen snoring and obstructive sleep apnea, so it is not an evidence-based insomnia treatment.",
		stableCore: [
			"Sedation and healthy sleep are not the same outcome: shortening sleep onset does not establish restorative sleep across the night.",
			"A 2024 systematic review and meta-analysis found REM-sleep disruption beginning at low alcohol doses, with greater disruption as dose increased.",
			"Controlled sleep-laboratory research confirms that pre-sleep alcohol changes normal REM and slow-wave sleep patterns across consecutive nights.",
			"Alcohol relaxes upper-airway tissues and is associated with greater sleep-apnea risk, making it especially concerning for people with snoring or diagnosed apnea."
		],
		openQuestions: [
			"How do dose, timing, sex, age, tolerance, alcohol-use pattern, and existing sleep disorders change the size of overnight disruption?",
			"How quickly do sleep architecture and daytime functioning recover after reducing habitual pre-sleep alcohol use?"
		],
		whatWouldChangeMinds: [
			"Replicated controlled studies showing that pre-sleep alcohol improves whole-night sleep continuity, architecture, and next-day function rather than only shortening sleep onset.",
			"High-quality evidence showing sustained insomnia benefit without tolerance, dependence, respiratory worsening, or later-night disruption."
		],
		misconceptions: [
			"Falling asleep faster is not the same as sleeping better.",
			"Feeling unconscious or sedated does not mean normal restorative sleep stages are preserved.",
			"A nightcap can affect breathing and later-night sleep even when a person does not remember waking."
		],
		editorSummary:
			"The nightcap myth confuses an immediate sedating effect with better sleep. The evidence consistently separates faster sleep onset from poorer sleep architecture and respiratory risk, making alcohol a bad insomnia strategy even when it feels helpful at first.",
		uncertaintySummary:
			"The direction of the acute effect is stable, but its size varies with dose, timing, individual metabolism, habitual use, and baseline sleep or breathing disorders. Long-term experiments are more limited because sustained alcohol exposure cannot be assigned casually.",
		sources: [
			{
				kind: "meta_analysis",
				title: "The effect of alcohol on subsequent sleep in healthy adults: A systematic review and meta-analysis",
				publisher: "Sleep Medicine Reviews",
				year: 2024,
				url: "https://doi.org/10.1016/j.smrv.2024.102030",
				doi: "10.1016/j.smrv.2024.102030",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Systematic review and meta-analysis finding that low-dose alcohol already reduces REM sleep and that higher doses may shorten sleep onset while worsening later REM disruption.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Altered sleep architecture following consecutive nights of pre-sleep alcohol",
				publisher: "Sleep",
				year: 2024,
				url: "https://doi.org/10.1093/sleep/zsae003",
				doi: "10.1093/sleep/zsae003",
				appraisal: "moderate",
				stance: "supports",
				note: "Controlled crossover polysomnography study finding that pre-sleep alcohol altered slow-wave and REM accumulation and reduced total REM sleep across three consecutive nights.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Alcohol and the risk of sleep apnoea: a systematic review and meta-analysis",
				publisher: "Sleep Medicine",
				year: 2018,
				url: "https://doi.org/10.1016/j.sleep.2017.12.005",
				doi: "10.1016/j.sleep.2017.12.005",
				appraisal: "moderate",
				stance: "context",
				note: "Systematic review and meta-analysis associating higher alcohol consumption with greater obstructive sleep-apnea risk, supporting caution about alcohol as a sleep aid.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does evening light from screens delay sleep?",
		slug: "does-evening-light-from-screens-delay-sleep",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Bright, blue-enriched light from screens in the evening can suppress melatonin, increase alertness, and delay circadian timing or sleep, especially when exposure is close, bright, long, and late. Screen use also delays sleep through content and time displacement. Blue light is not the only factor, and filters alone do not reliably solve every sleep problem.",
		stableCore: [
			"The human circadian system is particularly sensitive to short-wavelength light, but brightness, duration, timing, distance, and prior light exposure all matter.",
			"Controlled studies show that sufficiently strong evening screen light can delay melatonin and sleep-related physiology.",
			"Interactive or emotionally engaging content and simply staying up later can affect sleep independently of light color.",
			"Dimming devices, reducing late exposure, and increasing daytime light can be more reliable than treating one color setting as a complete fix."
		],
		openQuestions: [
			"How large are real-world effects from modern dimmed devices across ages and individual light sensitivity?",
			"Which combinations of timing limits, content changes, ambient light, and filters meaningfully improve clinical sleep outcomes?"
		],
		whatWouldChangeMinds: [
			"Controlled studies across realistic devices and settings consistently finding no circadian or sleep effect from substantial late-evening exposure.",
			"Evidence that content and time displacement explain essentially all observed effects, leaving spectral light contribution negligible."
		],
		misconceptions: [
			"Blue light is not a special toxin that damages sleep regardless of dose and timing.",
			"Turning on a warm-color mode does not prevent stimulating content from keeping someone awake.",
			"A laboratory e-reader at full exposure does not quantify the effect of every brief real-world phone check."
		],
		editorSummary:
			"The mechanism is real, but popular explanations often make it too simple. Late light, behavioral stimulation, and displaced bedtime work together; the practical response is broader evening light and device management, not fear of one wavelength.",
		uncertaintySummary:
			"Moderate certainty supports a circadian effect under meaningful exposure. Real-world effect sizes and the independent value of filters vary across devices, brightness, content, age, and baseline sleep problems.",
		sources: [
			{
				kind: "guideline",
				title: "Circadian Rhythm Disorders: Treatment",
				publisher: "National Heart, Lung, and Blood Institute",
				year: 2022,
				url: "https://www.nhlbi.nih.gov/health/circadian-rhythm-disorders/treatment",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "NIH guidance explaining that reducing artificial evening light from screens can help shift circadian timing and that timed light is itself a treatment tool.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "The influence of blue light on sleep, performance and wellbeing in young adults: A systematic review",
				publisher: "Frontiers in Physiology",
				year: 2022,
				url: "https://doi.org/10.3389/fphys.2022.943108",
				doi: "10.3389/fphys.2022.943108",
				appraisal: "moderate",
				stance: "supports",
				note: "Review finding evening blue-light exposure can increase alertness while negatively affecting sleep timing, quality, or duration, with substantial protocol variation.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Evening use of light-emitting eReaders negatively affects sleep, circadian timing, and next-morning alertness",
				publisher: "Proceedings of the National Academy of Sciences",
				year: 2015,
				url: "https://doi.org/10.1073/pnas.1418490112",
				doi: "10.1073/pnas.1418490112",
				appraisal: "high",
				stance: "supports",
				note: "Controlled crossover study demonstrating delayed melatonin timing, longer sleep onset, and reduced morning alertness after prolonged evening e-reader exposure.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Should habitual loud snoring prompt evaluation for sleep apnea?",
		slug: "should-habitual-loud-snoring-prompt-evaluation-for-sleep-apnea",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Habitual loud snoring—especially with witnessed breathing pauses, gasping, daytime sleepiness, resistant hypertension, or other risk factors—should prompt consideration of obstructive sleep apnea. Snoring alone does not diagnose apnea, and not everyone who snores has it; validated assessment and, when indicated, a sleep study are needed.",
		stableCore: [
			"Snoring reflects vibration from a narrowed upper airway and is a common warning sign of obstructive sleep apnea.",
			"Symptoms and questionnaires can estimate risk but cannot reliably confirm or exclude apnea in place of objective testing when suspicion is meaningful.",
			"Untreated obstructive sleep apnea can impair alertness and is associated with cardiovascular, metabolic, and accident risks.",
			"Children with habitual snoring require age-appropriate evaluation because causes, consequences, and treatment differ from adults."
		],
		openQuestions: [
			"Which home sensors and consumer devices can accurately triage apnea across diverse populations without excessive false reassurance?",
			"How should testing thresholds vary with symptoms, cardiovascular risk, occupation, pregnancy, and access to sleep services?"
		],
		whatWouldChangeMinds: [
			"High-quality diagnostic studies showing habitual snoring and accompanying red flags add no useful information about apnea risk.",
			"Validated non-test pathways that safely rule out clinically important apnea across routine populations."
		],
		misconceptions: [
			"Snoring is a warning sign, not a diagnosis.",
			"Being young or thin lowers some risks but does not make sleep apnea impossible.",
			"A phone recording or wearable score is not automatically equivalent to a validated sleep study."
		],
		editorSummary:
			"The useful message avoids both dismissal and alarm: common snoring is not proof of disease, but persistent loud snoring with pauses, gasping, sleepiness, or relevant medical risk deserves evaluation rather than normalization.",
		uncertaintySummary:
			"High certainty supports the diagnostic pathway and the limits of symptom screening. The predictive value of snoring varies with age, sex, body size, anatomy, comorbidities, and how symptoms are reported.",
		sources: [
			{
				kind: "guideline",
				title: "Clinical Practice Guideline for Diagnostic Testing for Adult Obstructive Sleep Apnea",
				publisher: "American Academy of Sleep Medicine",
				year: 2017,
				url: "https://doi.org/10.5664/jcsm.6506",
				doi: "10.5664/jcsm.6506",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Evidence-based guideline requiring objective sleep testing when clinical assessment indicates meaningful apnea risk and rejecting questionnaires as stand-alone diagnosis.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Is it more than a snore? Recognizing sleep apnea warning signs",
				publisher: "American Academy of Sleep Medicine",
				year: 2021,
				url: "https://aasm.org/is-it-more-than-a-snore-recognizing-sleep-apnea-warning-signs/",
				appraisal: "high",
				stance: "supports",
				note: "Clinical public guidance distinguishing ordinary snoring from warning patterns such as pauses, gasping, and daytime impairment.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Diagnostic accuracy of screening questionnaires for obstructive sleep apnoea in adults in different clinical cohorts: a systematic review and meta-analysis",
				publisher: "Sleep and Breathing",
				year: 2021,
				url: "https://doi.org/10.1007/s11325-021-02450-9",
				doi: "10.1007/s11325-021-02450-9",
				appraisal: "high",
				stance: "context",
				note: "Diagnostic synthesis showing common symptom-based tools can be sensitive but lack enough specificity to replace objective diagnosis.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "sleep-and-circadian-health",
		title: "Does long-term night-shift work increase chronic health risks?",
		slug: "does-long-term-night-shift-work-increase-chronic-health-risks",
		consensusBand: "broad",
		confidenceScore: 83,
		evidenceCertainty: "moderate",
		bottomLine:
			"Long-term night and rotating shift work is associated with higher risks of sleep and circadian disruption, cardiometabolic disease, and some adverse mental-health and safety outcomes. IARC classifies night-shift work as probably carcinogenic, but individual risk and the size of causal effects remain uncertain because schedules, duration, occupation, and lifestyle differ.",
		stableCore: [
			"Working during usual sleep hours creates circadian misalignment and often shortens or fragments sleep.",
			"Cohort syntheses generally report higher cardiovascular, metabolic, and all-cause mortality risks among long-term night workers.",
			"IARC's Group 2A classification identifies a cancer hazard from the evidence; it does not quantify every worker's personal cancer probability.",
			"Schedule design, recovery time, light exposure, workload, diet, and control over shifts may modify risk."
		],
		openQuestions: [
			"Which forward-rotating schedules, shift lengths, light strategies, and recovery protections most effectively reduce long-term harm?",
			"How much observed cancer and cardiovascular risk is causal after accounting for occupation, socioeconomic conditions, and health selection?"
		],
		whatWouldChangeMinds: [
			"Large well-controlled cohorts and natural experiments consistently finding no excess chronic risk across substantial night-work exposure.",
			"Intervention evidence showing that particular schedule designs remove the observed risk despite continued night work."
		],
		misconceptions: [
			"Probably carcinogenic is a hazard classification, not a prediction that most night workers will develop cancer.",
			"Not every overnight shift carries the same risk as years of frequent rotating work.",
			"Worker sleep advice cannot replace employer control over scheduling, staffing, and recovery time."
		],
		editorSummary:
			"The evidence supports treating chronic night work as an occupational health exposure rather than a harmless preference. It does not justify deterministic cancer claims, and prevention should include schedule design—not only advice to individual workers.",
		uncertaintySummary:
			"Moderate certainty reflects converging observational and mechanistic evidence but few randomized long-term exposures. Risk estimates vary by schedule definition, duration, occupation, confounding, and healthy-worker selection.",
		sources: [
			{
				kind: "consensus_statement",
				title: "IARC Monographs on the Identification of Carcinogenic Hazards to Humans, Volume 124: Night Shift Work",
				publisher: "International Agency for Research on Cancer",
				year: 2020,
				url: "https://publications.iarc.who.int/593",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Formal hazard assessment classifying night-shift work as probably carcinogenic based on limited human, sufficient animal, and strong mechanistic evidence.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Associations of shift work and night work with risk of all-cause, cardiovascular and cancer mortality: a meta-analysis of cohort studies",
				publisher: "Sleep Medicine",
				year: 2021,
				url: "https://doi.org/10.1016/j.sleep.2021.08.017",
				doi: "10.1016/j.sleep.2021.08.017",
				appraisal: "high",
				stance: "supports",
				note: "Cohort meta-analysis reporting higher all-cause, cardiovascular, and cancer mortality associations, with variation across exposure definitions and study quality.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Night shift work and indicators of cardiovascular risk: a systematic review and meta-analysis",
				publisher: "Environmental Research",
				year: 2025,
				url: "https://doi.org/10.1016/j.envres.2025.121503",
				doi: "10.1016/j.envres.2025.121503",
				appraisal: "moderate",
				stance: "supports",
				note: "Updated synthesis finding adverse differences in inflammatory, lipid, and cardiac-excitability markers among night-shift workers while retaining causal limitations.",
				order: 3
			}
		]
	})
];
