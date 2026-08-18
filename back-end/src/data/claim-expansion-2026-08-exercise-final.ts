import type { SeedClaim } from "./claims.js";
import {
	august2026EncyclopediaTrancheFiveSourcedClaim as reviewedClaim,
	encyclopediaDoiSources as sources
} from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026ExerciseFinalClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Does recreational running cause knee or hip osteoarthritis?",
		slug: "does-recreational-running-cause-knee-or-hip-osteoarthritis",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Ordinary recreational running has not been shown to cause knee or hip osteoarthritis and is often associated with similar or lower prevalence than inactivity. Very high-volume competitive exposure, previous injury, joint anatomy, age, and body weight can change individual risk; pain that persists or changes movement still deserves assessment.",
		stableCore: [
			"Systematic reviews do not support a simple wear-and-tear model in which normal recreational running inevitably destroys cartilage.",
			"Past joint injury is a clearer osteoarthritis risk factor than recreational running itself.",
			"Observational comparisons can reflect healthy-runner selection, so lower prevalence does not prove running prevents every case."
		],
		openQuestions: [
			"How do lifetime mileage, intensity, surface, biomechanics, and prior injury interact at very high exposure?",
			"Which symptoms and imaging findings should change training while preserving beneficial activity?"
		],
		whatWouldChangeMinds: [
			"Long-term controlled cohorts showing a dose-dependent osteoarthritis increase among recreational runners after injury and health differences are addressed.",
			"Mechanistic and clinical evidence establishing that ordinary running loads exceed joint adaptation in most healthy adults."
		],
		misconceptions: [
			"Joints are living tissues that adapt; they are not simple machine bearings.",
			"Running with an acute injury is not the same exposure as healthy recreational running.",
			"Population evidence does not guarantee that every painful joint should keep the same training load."
		],
		editorSummary:
			"Recreational running is generally compatible with joint health; manage injuries and individual symptoms rather than assuming mileage equals damage.",
		uncertaintySummary:
			"Most evidence is observational and exposure definitions vary. Extreme competitive histories and injured subgroups remain less certain.",
		sources: sources([
			["meta_analysis", "The Association of Recreational and Competitive Running With Hip and Knee Osteoarthritis: A Systematic Review and Meta-analysis", "Journal of Orthopaedic & Sports Physical Therapy", 2017, "10.2519/jospt.2017.7137", "Synthesis finding lower osteoarthritis prevalence in recreational runners than competitive runners or sedentary controls."],
			["meta_analysis", "Running and Knee Osteoarthritis: A Systematic Review and Meta-analysis", "The American Journal of Sports Medicine", 2017, "10.1177/0363546516657531", "Review finding no evidence that recreational running accelerates radiographic or symptomatic knee osteoarthritis."],
			["landmark_study", "Is There an Association Between a History of Running and Symptomatic Knee Osteoarthritis? A Cross-Sectional Study From the Osteoarthritis Initiative", "Arthritis Care & Research", 2017, "10.1002/acr.22939", "Large cohort analysis finding no increased symptomatic knee-osteoarthritis risk among self-selected runners."]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Does exercising before breakfast produce greater long-term fat loss?",
		slug: "does-exercising-before-breakfast-produce-greater-long-term-fat-loss",
		consensusBand: "broad",
		confidenceScore: 82,
		evidenceCertainty: "moderate",
		bottomLine:
			"Not reliably. Fasted exercise burns a larger proportion of fat during that session, but longer-term studies do not show clearly greater fat or weight loss when total energy intake and training are comparable. Meal timing can be chosen for comfort, performance, adherence, medical needs, and the broader diet.",
		stableCore: [
			"Acute fuel use is not the same outcome as change in body fat over weeks or months.",
			"The body compensates across the day through appetite, later fuel use, and energy expenditure.",
			"Fasted training may feel fine for some low-to-moderate sessions and impair performance or glucose management for others."
		],
		openQuestions: [
			"Do particular sports, training intensities, metabolic conditions, or adherence patterns produce a meaningful long-term difference?",
			"How does habitual pre-exercise feeding affect performance adaptation separately from fat loss?"
		],
		whatWouldChangeMinds: [
			"Long, energy-matched randomized trials consistently showing materially greater fat loss from fasted training.",
			"Evidence of a persistent energy-expenditure or appetite mechanism that survives compensation across the day."
		],
		misconceptions: [
			"Burning more fat during one workout does not necessarily reduce more stored fat over time.",
			"Eating before exercise does not switch off all fat metabolism.",
			"People using glucose-lowering medication may need individualized safety advice."
		],
		editorSummary:
			"Choose fed or fasted training for performance, tolerance, safety, and adherence; neither is a proven fat-loss shortcut.",
		uncertaintySummary:
			"Long-term trials are small and short, but they converge against a large body-composition advantage from fasting alone.",
		sources: sources([
			["meta_analysis", "Effect of Overnight Fasted Exercise on Weight Loss and Body Composition: A Systematic Review and Meta-Analysis", "Journal of Functional Morphology and Kinesiology", 2017, "10.3390/jfmk2040043", "Review finding no clear long-term weight or body-composition advantage for fasted exercise."],
			["landmark_study", "Body composition changes associated with fasted versus non-fasted aerobic exercise", "Journal of the International Society of Sports Nutrition", 2014, "10.1186/s12970-014-0054-7", "Small randomized intervention finding similar body-composition changes under a calorie-restricted diet."],
			["landmark_study", "Exercising in the Fasted State Reduced 24-Hour Energy Intake in Active Male Adults", "Journal of Nutrition and Metabolism", 2016, "10.1155/2016/1984198", "Short-term study illustrating appetite and energy-intake responses without establishing long-term fat loss.", "context"]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Must resistance-training sets reach failure to build strength or muscle?",
		slug: "must-resistance-training-sets-reach-failure-to-build-strength-or-muscle",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Sets performed close enough to failure can build strength and muscle without every set reaching the point where another repetition is impossible. Failure can be a useful tool, especially with lighter loads or selected exercises, but it also increases fatigue, discomfort, and recovery cost.",
		stableCore: [
			"Meta-analyses find no consistent hypertrophy or strength requirement for momentary muscular failure when training volume and effort are comparable.",
			"Very easy sets may provide too little stimulus, particularly with light loads.",
			"Exercise selection, safety, training age, load, volume, and proximity to failure all affect the tradeoff."
		],
		openQuestions: [
			"What proximity-to-failure range optimizes stimulus, fatigue, and adherence across exercises and trainees?",
			"How accurately can people estimate repetitions in reserve without supervision?"
		],
		whatWouldChangeMinds: [
			"Long well-controlled trials showing failure produces substantially greater growth or strength at matched volume across populations.",
			"Evidence that stopping short consistently fails to recruit or adapt high-threshold muscle fibers under realistic programs."
		],
		misconceptions: [
			"Not training to failure does not mean stopping as soon as a set feels uncomfortable.",
			"A hard set and a failed repetition are not identical.",
			"Failure on a machine isolation exercise carries different costs from failure under a heavy free-weight lift."
		],
		editorSummary:
			"Train hard enough to create a stimulus, but use failure selectively rather than treating it as the price of every effective set.",
		uncertaintySummary:
			"Evidence rejects an absolute failure requirement; optimal proximity and how it interacts with load and volume remain less precise.",
		sources: sources([
			["meta_analysis", "Effects of resistance training performed to repetition failure or non-failure on muscular strength and hypertrophy: A systematic review and meta-analysis", "Journal of Sport and Health Science", 2022, "10.1016/j.jshs.2021.01.007", "Synthesis finding no clear requirement for failure when key training variables are considered."],
			["meta_analysis", "Effects of Resistance Training Performed to Failure or Not to Failure on Muscle Strength, Hypertrophy, and Power Output: A Systematic Review With Meta-Analysis", "Journal of Strength and Conditioning Research", 2021, "10.1519/JSC.0000000000003936", "Independent synthesis comparing strength, hypertrophy, and power outcomes."],
			["systematic_review", "Towards an improved understanding of proximity-to-failure in resistance training and its influence on skeletal muscle hypertrophy, neuromuscular fatigue, muscle damage, and perceived discomfort: A scoping review", "Journal of Sports Sciences", 2022, "10.1080/02640414.2022.2080165", "Review clarifying the stimulus-fatigue tradeoffs and measurement limits around repetitions in reserve."]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Is there a narrow post-workout anabolic window for protein?",
		slug: "is-there-a-narrow-post-workout-anabolic-window-for-protein",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"No narrow minutes-long window has been established. Protein near training can be convenient and useful, especially if the previous meal was distant, but total daily protein, adequate energy, training quality, and protein distributed across meals matter more than racing to consume a shake immediately after the last repetition.",
		stableCore: [
			"Resistance exercise sensitizes muscle to protein for many hours, not only a brief post-workout interval.",
			"Apparent timing benefits shrink when total protein intake is matched.",
			"Timing matters more at the margins—for example, prolonged fasting, closely spaced sessions, or athletes struggling to meet total needs."
		],
		openQuestions: [
			"What distribution best supports different ages, energy intakes, training volumes, and athletic schedules?",
			"When do pre-sleep or between-session protein strategies produce meaningful additional adaptation?"
		],
		whatWouldChangeMinds: [
			"Energy- and protein-matched long-term trials showing large losses when protein is delayed modestly after training.",
			"A reproducible mechanism establishing a short universal cutoff after which the training response cannot be supported."
		],
		misconceptions: [
			"Rejecting a narrow window does not mean protein timing can never matter.",
			"A supplement is not required if a suitable meal supplies enough protein.",
			"More protein timing precision cannot compensate for inadequate training or total intake."
		],
		editorSummary:
			"Meet daily protein needs and place sensible meals around training; there is usually no post-workout stopwatch emergency.",
		uncertaintySummary:
			"Total intake clearly dominates; smaller timing effects are difficult to isolate and may differ by age, fasting, dose, and program.",
		sources: sources([
			["meta_analysis", "The effect of protein timing on muscle strength and hypertrophy: a meta-analysis", "Journal of the International Society of Sports Nutrition", 2013, "10.1186/1550-2783-10-53", "Meta-analysis finding that total protein explains much of the apparent timing advantage."],
			["systematic_review", "Nutrient timing revisited: is there a post-exercise anabolic window?", "Journal of the International Society of Sports Nutrition", 2013, "10.1186/1550-2783-10-5", "Review replacing the narrow-window claim with a broader context-dependent timing model."],
			["meta_analysis", "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults", "British Journal of Sports Medicine", 2018, "10.1136/bjsports-2017-097608", "Large synthesis establishing the role and limits of adequate total protein during resistance training."]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Is high-intensity interval training universally superior to moderate continuous exercise?",
		slug: "is-high-intensity-interval-training-universally-superior-to-moderate-continuous-exercise",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. High-intensity intervals often improve cardiorespiratory fitness efficiently and can outperform moderate continuous exercise on some outcomes, but they are not superior for every health goal, person, adherence pattern, or risk profile. Both approaches can work, and the best program is one that is safe, progressive, and sustainable.",
		stableCore: [
			"Meta-analyses commonly find a larger average improvement in cardiorespiratory fitness from interval protocols.",
			"Body composition, blood pressure, glucose, enjoyment, injury, and adherence do not all favor one method consistently.",
			"Published HIIT protocols range from manageable intervals to very strenuous laboratory sessions, so the label alone is uninformative."
		],
		openQuestions: [
			"Which interval formats maximize long-term adherence and safety outside supervised trials?",
			"How should intensity be prescribed for beginners and people with cardiovascular, metabolic, or musculoskeletal conditions?"
		],
		whatWouldChangeMinds: [
			"Long pragmatic trials showing one approach dominates patient-important outcomes, adherence, and harms across diverse populations.",
			"Evidence that fitness advantages from intervals do not persist when training dose and attendance are realistically matched."
		],
		misconceptions: [
			"Time-efficient does not mean effortless or appropriate without progression.",
			"A higher peak fitness gain does not settle every exercise goal.",
			"Moderate exercise remains strongly health-promoting."
		],
		editorSummary:
			"Intervals are an effective option, not a universal winner; match intensity and format to the person's goals, risks, and likelihood of continuing.",
		uncertaintySummary:
			"Short supervised studies dominate, protocol definitions vary, and long-term adherence and clinical outcomes are less certain than fitness changes.",
		sources: sources([
			["meta_analysis", "High-intensity interval training and cardiorespiratory fitness in adults: An umbrella review of systematic reviews and meta-analyses", "Scandinavian Journal of Medicine & Science in Sports", 2024, "10.1111/sms.14652", "Umbrella review finding a cardiorespiratory-fitness advantage while documenting substantial protocol heterogeneity."],
			["meta_analysis", "Effectiveness of High-Intensity Interval Training (HIT) and Continuous Endurance Training for VO2max Improvements: A Systematic Review and Meta-Analysis of Controlled Trials", "Sports Medicine", 2015, "10.1007/s40279-015-0365-0", "Comparison showing larger average fitness gains from intervals under controlled conditions."],
			["meta_analysis", "Effects of high-intensity interval training on cardiometabolic health: a systematic review and meta-analysis of intervention studies", "British Journal of Sports Medicine", 2017, "10.1136/bjsports-2015-095841", "Synthesis of broader cardiometabolic outcomes and population-specific uncertainty."]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Does cardio cancel muscle gains from strength training?",
		slug: "does-cardio-cancel-muscle-gains-from-strength-training",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Usually no. Combining aerobic and strength training can improve both fitness domains, and updated evidence finds little average interference with whole-muscle hypertrophy or maximal strength. Very high endurance volume, insufficient recovery, same-session sequencing, and goals such as explosive power can create tradeoffs.",
		stableCore: [
			"Concurrent training does not erase the adaptations from resistance exercise in ordinary mixed programs.",
			"Interference is more plausible when endurance stress is large, recovery and energy are inadequate, or power is the priority.",
			"Separating demanding sessions and prioritizing the main goal can reduce acute fatigue conflicts."
		],
		openQuestions: [
			"Which combinations of running, cycling, volume, sequence, and recovery matter most for advanced athletes?",
			"How do sex, age, training status, energy availability, and molecular responses modify interference?"
		],
		whatWouldChangeMinds: [
			"Long matched programs showing substantial hypertrophy or strength loss from moderate concurrent training across typical trainees.",
			"Evidence that session separation and workload management do not reduce observed interference."
		],
		misconceptions: [
			"Cardio is not one dose or modality.",
			"A small power tradeoff in athletes is not cancellation of all muscle growth.",
			"Avoiding aerobic fitness can carry health and performance costs of its own."
		],
		editorSummary:
			"Most people can train strength and endurance together; manage volume, sequence, nutrition, and recovery when one adaptation is a high priority.",
		uncertaintySummary:
			"Average interference is smaller than once feared, but advanced athletes, high running volumes, power outcomes, and fiber-level changes remain more nuanced.",
		sources: sources([
			["meta_analysis", "Compatibility of Concurrent Aerobic and Strength Training for Skeletal Muscle Size and Function: An Updated Systematic Review and Meta-Analysis", "Sports Medicine", 2022, "10.1007/s40279-021-01587-7", "Updated synthesis finding no meaningful average loss of whole-muscle hypertrophy or maximal strength."],
			["meta_analysis", "Concurrent training: a meta-analysis examining interference of aerobic and resistance exercises", "Journal of Strength and Conditioning Research", 2012, "10.1519/JSC.0b013e31823a3e2d", "Influential earlier synthesis identifying modality, frequency, and duration as possible moderators."],
			["systematic_review", "Interference between Concurrent Resistance and Endurance Exercise: Molecular Bases and the Role of Individual Training Variables", "Sports Medicine", 2014, "10.1007/s40279-014-0162-1", "Mechanistic review explaining when acute signaling and program design may create tradeoffs."]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Can regular ice baths after lifting blunt muscle growth?",
		slug: "can-regular-ice-baths-after-lifting-blunt-muscle-growth",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Probably, when cold-water immersion is used immediately after most resistance-training sessions. It can reduce soreness and help short-term recovery in some settings, but repeated post-lifting use appears to modestly attenuate hypertrophy-related signaling and muscle growth. An occasional ice bath is not expected to erase progress.",
		stableCore: [
			"Cold can reduce pain and inflammation-related signals that are part of adaptation as well as discomfort.",
			"Training studies and meta-analysis point to smaller hypertrophy with regular immediate post-exercise immersion.",
			"The tradeoff differs when rapid recovery for near-term performance matters more than maximizing long-term muscle gain."
		],
		openQuestions: [
			"How much delay after training avoids interference while preserving recovery benefits?",
			"Do temperature, immersion duration, training status, sex, and competition schedule change the adaptation cost?"
		],
		whatWouldChangeMinds: [
			"Larger long-term trials finding equivalent hypertrophy under repeated immediate immersion and matched training.",
			"Evidence that observed attenuation is due to measurement bias, unequal training, nutrition, or other recovery differences."
		],
		misconceptions: [
			"Less soreness does not necessarily mean greater adaptation.",
			"One cold exposure is not the same as a repeated post-training protocol.",
			"A tool can aid competition recovery while being suboptimal for a separate hypertrophy goal."
		],
		editorSummary:
			"If muscle growth is the priority, avoid making immediate ice baths the default after every lift; reserve them for situations where rapid recovery matters more.",
		uncertaintySummary:
			"The direction is increasingly consistent, but studies are small and protocol-specific and the exact practical size remains imprecise.",
		sources: sources([
			["meta_analysis", "Throwing cold water on muscle growth: A systematic review with meta-analysis of the effects of postexercise cold water immersion on resistance training-induced hypertrophy", "European Journal of Sport Science", 2024, "10.1002/ejsc.12074", "Current synthesis finding attenuation of resistance-training-induced hypertrophy with regular immersion."],
			["landmark_study", "Post-exercise cold water immersion attenuates acute anabolic signalling and long-term adaptations in muscle to strength training", "The Journal of Physiology", 2015, "10.1113/JP270570", "Training and mechanistic study linking repeated immersion with smaller strength-training adaptations."],
			["systematic_review", "Strength Training Adaptations After Cold-Water Immersion", "Journal of Strength and Conditioning Research", 2014, "10.1519/JSC.0000000000000434", "Early synthesis distinguishing short-term recovery effects from possible long-term adaptation costs."]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Are smartwatch calorie-burn estimates accurate enough to eat back?",
		slug: "are-smartwatch-calorie-burn-estimates-accurate-enough-to-eat-back",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Generally no. Consumer wearables often measure heart rate and steps reasonably under some conditions, but energy-expenditure estimates can have large, device- and activity-specific errors. Treat a calorie number as a rough trend, not a precise credit to add back to food intake.",
		stableCore: [
			"Energy expenditure is inferred from proprietary models using imperfect sensors and population averages.",
			"Error varies with exercise type, intensity, body characteristics, device placement, and algorithm updates.",
			"A plausible daily number can still be wrong enough to undermine a tightly balanced weight-management calculation."
		],
		openQuestions: [
			"Which devices and calibration methods remain accurate across activities and diverse bodies?",
			"Can transparent personalized models improve energy estimates without encouraging false precision?"
		],
		whatWouldChangeMinds: [
			"Independent validations showing consistently small individual-level energy error across common activities and populations.",
			"Transparent algorithms maintaining calibration after firmware changes and across real-world free-living conditions."
		],
		misconceptions: [
			"Accurate heart rate does not guarantee accurate calorie expenditure.",
			"A device displaying single-calorie precision has not measured single-calorie precision.",
			"Trend usefulness and meal-level accounting are different standards."
		],
		editorSummary:
			"Use wearable calories as a coarse behavioral signal and let longer-term weight, performance, hunger, and health trends guide adjustment.",
		uncertaintySummary:
			"Validity changes rapidly by product and update, but reviews consistently find energy expenditure less reliable than steps or heart rate.",
		sources: sources([
			["systematic_review", "Reliability and Validity of Commercially Available Wearable Devices for Measuring Steps, Energy Expenditure, and Heart Rate: Systematic Review", "JMIR mHealth and uHealth", 2020, "10.2196/18694", "Device review finding the weakest validity for energy expenditure and substantial model-specific variation."],
			["landmark_study", "Accuracy in Wrist-Worn, Sensor-Based Measurements of Heart Rate and Energy Expenditure in a Diverse Cohort", "Journal of Personalized Medicine", 2017, "10.3390/jpm7020003", "Head-to-head validation finding acceptable heart-rate performance but poor energy-expenditure accuracy."],
			["meta_analysis", "How well do activity monitors estimate energy expenditure? A systematic review and meta-analysis of the validity of current technologies", "British Journal of Sports Medicine", 2020, "10.1136/bjsports-2018-099643", "Synthesis documenting device-dependent validity and energy-expenditure errors too large for precise dietary compensation."]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Do structured neuromuscular warm-ups reduce youth sports injuries?",
		slug: "do-structured-neuromuscular-warm-ups-reduce-youth-sports-injuries",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Regular warm-up programs that combine balance, strength, agility, landing, and movement-control exercises reduce lower-extremity and overall injuries in many youth team sports. Benefit depends on repeated use and coaching quality; a brief one-time stretch routine is not the same intervention.",
		stableCore: [
			"Randomized trials and meta-analyses show meaningful injury reductions from multicomponent neuromuscular programs.",
			"Programs such as FIFA 11+ are preventive training curricula, not merely raising body temperature before play.",
			"Adherence, exercise progression, technique feedback, age, sex, sport, and baseline injury risk affect impact."
		],
		openQuestions: [
			"Which minimum dose and implementation supports preserve benefit across community settings?",
			"How should programs be adapted by sport, developmental stage, disability, and previous injury?"
		],
		whatWouldChangeMinds: [
			"Large cluster trials finding no injury reduction despite high adherence to a well-specified program.",
			"Surveillance showing program-related injuries or lost participation offset the prevention benefit."
		],
		misconceptions: [
			"A preventive warm-up is more than static stretching.",
			"Reduced risk does not mean no athlete will be injured.",
			"A program unused by teams cannot produce the efficacy seen in trials."
		],
		editorSummary:
			"Make a structured neuromuscular program a routine part of practice and competition preparation, with coaching and adherence treated as core ingredients.",
		uncertaintySummary:
			"The overall preventive effect is robust; exact size varies by injury definition, sport, sex, program, supervision, and adherence.",
		sources: sources([
			["meta_analysis", "Effectiveness of Warm-Up Intervention Programs to Prevent Sports Injuries among Children and Adolescents: A Systematic Review and Meta-Analysis", "International Journal of Environmental Research and Public Health", 2022, "10.3390/ijerph19106336", "Youth-specific synthesis finding fewer injuries with structured warm-up programs."],
			["meta_analysis", "Neuromuscular training injury prevention strategies in youth sport: a systematic review and meta-analysis", "British Journal of Sports Medicine", 2015, "10.1136/bjsports-2015-094639", "Review quantifying injury reduction and the influence of age, dosage, and program design."],
			["meta_analysis", "Neuromuscular Training for Sports Injury Prevention", "Medicine & Science in Sports & Exercise", 2010, "10.1249/MSS.0b013e3181b88d37", "Meta-analysis of controlled trials supporting multicomponent neuromuscular prevention programs."]
		])
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Must weights be heavy to build muscle?",
		slug: "must-weights-be-heavy-to-build-muscle",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. A broad range of loads can build similar muscle when sets are sufficiently challenging and total training is appropriate. Heavier loads are more specific and generally better for maximizing one-repetition strength, while lighter loads require more repetitions and may create more discomfort or time cost.",
		stableCore: [
			"Meta-analysis and trials find comparable average hypertrophy across low and high loads when effort is high.",
			"Maximal strength improves more with practice under heavy loads because strength is skill- and load-specific.",
			"Extremely light, easy sets may not recruit enough muscle or may require impractical repetition counts."
		],
		openQuestions: [
			"What lower load threshold works reliably when proximity to failure and volume are controlled?",
			"How should load ranges differ for older adults, pain, rehabilitation, advanced lifters, and tendon or bone goals?"
		],
		whatWouldChangeMinds: [
			"Long matched trials showing substantially greater hypertrophy from heavy loads across muscles and populations.",
			"Evidence that lighter-load gains are measurement artifacts or cannot persist with progressive training."
		],
		misconceptions: [
			"A light weight must still create a meaningful training stimulus.",
			"Similar muscle growth does not mean identical strength or performance adaptation.",
			"One load range need not be used for every exercise or phase."
		],
		editorSummary:
			"Use loads that allow safe, progressive, challenging work; include heavier practice when maximal strength itself is the goal.",
		uncertaintySummary:
			"The hypertrophy equivalence is well supported across common load ranges, while very low loads, advanced trainees, and long-term programming need more evidence.",
		sources: sources([
			["meta_analysis", "Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training: A Systematic Review and Meta-analysis", "Journal of Strength and Conditioning Research", 2017, "10.1519/JSC.0000000000002200", "Synthesis finding similar hypertrophy but greater maximal-strength improvement with heavier loading."],
			["landmark_study", "Neither load nor systemic hormones determine resistance training-mediated hypertrophy or strength gains in resistance-trained young men", "Journal of Applied Physiology", 2016, "10.1152/japplphysiol.00154.2016", "Randomized trial finding comparable hypertrophy under low and high loads taken to volitional failure."],
			["landmark_study", "Effects of different intensities of resistance training with equated volume load on muscle strength and hypertrophy", "European Journal of Sport Science", 2018, "10.1080/17461391.2018.1450898", "Controlled comparison clarifying where load-specific strength and broadly similar hypertrophy diverge."]
		])
	})
];
