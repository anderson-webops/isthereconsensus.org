import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026ExerciseClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Does physical activity below the weekly guideline still improve health?",
		slug: "does-physical-activity-below-the-weekly-guideline-still-improve-health",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Health benefits begin below the usual target of 150 minutes of moderate activity per week, and the largest proportional gain often comes from moving from none to some. The guideline marks a level associated with substantial benefit, not a threshold below which movement is worthless; more activity can add benefit within practical limits.",
		stableCore: [
			"Dose-response syntheses show lower mortality and disease risk with increasing non-occupational activity, including at levels below guideline targets.",
			"Replacing inactivity with walking, cycling, active chores, or shorter bouts can be meaningful even if a person cannot yet meet the full recommendation.",
			"The greatest marginal gain is often among the least active, while additional benefit gradually tapers at higher volumes.",
			"Medical conditions, disability, heat, air quality, and injury risk can require individualized type and intensity."
		],
		openQuestions: [
			"Which combinations of intensity, resistance work, balance, and accumulated movement best serve different ages and health conditions?",
			"How do wearable measurement errors and occupational activity affect dose-response estimates?"
		],
		whatWouldChangeMinds: [
			"Large objective-measurement cohorts and trials consistently finding no benefit until a rigid weekly threshold is crossed.",
			"Evidence that the apparent low-dose benefit is fully explained by healthier people being more able to move."
		],
		misconceptions: [
			"A guideline target is not a pass-fail biological switch.",
			"Exercise does not need to happen in a gym or in long uninterrupted sessions to count.",
			"An observational dose-response does not specify one exact prescription for every individual."
		],
		editorSummary:
			"The all-or-nothing version of exercise advice is wrong and discouraging. The evidence supports a progression message: some movement is better than none, the standard target brings substantial benefit, and sustainable increases matter.",
		uncertaintySummary:
			"High certainty supports the direction and broad dose-response. Exact causal effect sizes vary with activity measurement, baseline health, domain of activity, intensity, and residual confounding.",
		sources: [
			{
				kind: "guideline",
				title: "WHO guidelines on physical activity and sedentary behaviour",
				publisher: "World Health Organization",
				year: 2020,
				url: "https://www.who.int/publications/i/item/9789240015128",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Global evidence-based guidance recommending regular activity, emphasizing that any amount is better than none and defining higher volumes for substantial benefit.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Non-occupational physical activity and risk of cardiovascular disease, cancer and mortality outcomes: a dose-response meta-analysis of large prospective studies",
				publisher: "British Journal of Sports Medicine",
				year: 2023,
				url: "https://doi.org/10.1136/bjsports-2022-105669",
				doi: "10.1136/bjsports-2022-105669",
				appraisal: "high",
				stance: "supports",
				note: "Large harmonized dose-response synthesis finding meaningful mortality and disease reductions below recommended activity volumes and diminishing marginal gains at higher levels.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Physical activity and all cause mortality: systematic review and meta-analysis of cohort studies",
				publisher: "BMJ",
				year: 2019,
				url: "https://doi.org/10.1136/bmj.l4570",
				doi: "10.1136/bmj.l4570",
				appraisal: "high",
				stance: "supports",
				note: "Device-measured activity synthesis supporting lower mortality with more total activity and less sedentary time, including at relatively modest levels.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Does supervised resistance training stunt children's growth?",
		slug: "does-supervised-resistance-training-stunt-childrens-growth",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Properly designed and supervised resistance training does not stunt children's growth. It can improve strength, motor skills, bone health, injury resilience, and confidence. The meaningful risks come from poor supervision, unsafe equipment, inappropriate loads, maximal lifting without preparation, or trying to copy adult competitive programs.",
		stableCore: [
			"Reviews do not find impaired linear growth or maturation from age-appropriate supervised training.",
			"Children can gain strength through neural learning and technique before large muscle-size changes occur.",
			"Qualified supervision, progressive loading, safe equipment, and mastery of movement are more important than a fixed minimum age.",
			"Weightlifting competition, powerlifting, bodybuilding, and general resistance exercise are not interchangeable activities."
		],
		openQuestions: [
			"Which program doses best support long-term participation, bone development, and injury prevention across sports and developmental stages?",
			"How can safe instruction be made accessible where trained supervision and appropriate equipment are limited?"
		],
		whatWouldChangeMinds: [
			"Prospective evidence showing supervised age-appropriate training consistently impairs growth plates, height, or maturation.",
			"Surveillance showing unacceptable injury rates despite adherence to modern pediatric training standards."
		],
		misconceptions: [
			"Anecdotes about injuries from unsupervised lifting do not establish that structured youth training stops growth.",
			"Resistance can come from body weight, bands, machines, or free weights; it does not require maximal barbells.",
			"Being cleared for general training is not the same as being ready for unsupervised competition."
		],
		editorSummary:
			"The growth-stunting warning is not supported by modern pediatric sports medicine. The responsible message is permission with guardrails: teach technique, supervise closely, progress gradually, and match the program to the child.",
		uncertaintySummary:
			"High certainty supports safety and no growth suppression under supervised programs. Injury rates and optimal dosing depend on coaching quality, equipment, maturity, sport demands, and adherence.",
		sources: [
			{
				kind: "guideline",
				title: "Resistance Training for Children and Adolescents",
				publisher: "American Academy of Pediatrics",
				year: 2020,
				url: "https://doi.org/10.1542/peds.2020-1011",
				doi: "10.1542/peds.2020-1011",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "AAP clinical report supporting appropriately supervised youth resistance training and detailing readiness, technique, progression, and safety precautions.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Weight Training in Youth-Growth, Maturation, and Safety: An Evidence-Based Review",
				publisher: "Clinical Journal of Sport Medicine",
				year: 2006,
				url: "https://doi.org/10.1097/01.jsm.0000248843.31874.be",
				doi: "10.1097/01.jsm.0000248843.31874.be",
				appraisal: "high",
				stance: "supports",
				note: "Evidence review finding supervised experimental programs relatively safe with no negative effect on growth or maturation in pre- and early-pubertal youth.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Youth Resistance Training: Updated Position Statement Paper From the National Strength and Conditioning Association",
				publisher: "Journal of Strength and Conditioning Research",
				year: 2009,
				url: "https://doi.org/10.1519/JSC.0b013e31819df407",
				doi: "10.1519/JSC.0b013e31819df407",
				appraisal: "high",
				stance: "supports",
				note: "Professional position statement concluding that age-appropriate, supervised programs are safe and beneficial while emphasizing qualified instruction.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Can exercising one body part selectively remove fat from that area?",
		slug: "can-exercising-one-body-part-selectively-remove-fat-from-that-area",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Training one muscle group strengthens that area but does not reliably make the body remove a meaningful amount of fat from the same spot. Overall fat loss is governed mainly by whole-body energy balance and biology. A small recent trial suggests highly localized aerobic work might influence nearby fat under special conditions, but it has not overturned the broader evidence.",
		stableCore: [
			"Muscles use circulating and stored fuels; they are not limited to burning the fat directly on top of the working muscle.",
			"Meta-analysis of localized training studies found no overall spot-reduction effect across sex, age, and body region.",
			"Exercise can change a region's appearance through muscle growth and overall fat loss even when fat was not selectively removed there.",
			"Body-fat distribution and the order in which fat is lost vary strongly with sex, genetics, hormones, and starting composition."
		],
		openQuestions: [
			"Can very high-volume localized aerobic exercise create a small reproducible regional effect, and is it practically meaningful?",
			"Which imaging methods and training designs best separate local fat change from muscle growth, fluid shifts, and whole-body loss?"
		],
		whatWouldChangeMinds: [
			"Independent preregistered trials repeatedly showing clinically meaningful regional fat loss beyond total-body change.",
			"An updated meta-analysis showing consistent localization across body regions, sexes, and realistic programs."
		],
		misconceptions: [
			"Feeling a muscle burn does not show that nearby fat is being preferentially oxidized.",
			"A smaller waist after abdominal training can reflect overall loss, posture, or thicker muscle rather than targeted fat removal.",
			"One small positive experiment does not erase a larger mixed or negative literature."
		],
		editorSummary:
			"The practical advice remains stable: train muscles for strength and use whole-body activity and diet for fat loss. The narrow physiological possibility of a small local effect deserves replication, not marketing certainty.",
		uncertaintySummary:
			"Moderate certainty supports no meaningful average spot reduction. Studies are small and heterogeneous, and a recent positive trial creates a legitimate but still narrow replication question.",
		sources: [
			{
				kind: "meta_analysis",
				title: "A proposed model to test the hypothesis of exercise-induced localized fat reduction (spot reduction), including a systematic review with meta-analysis",
				publisher: "Human Movement",
				year: 2021,
				url: "https://doi.org/10.5114/hm.2022.110373",
				doi: "10.5114/hm.2022.110373",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Systematic review and meta-analysis finding no localized fat-loss effect from training the adjacent musculature.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Regional fat changes induced by localized muscle endurance resistance training",
				publisher: "Journal of Strength and Conditioning Research",
				year: 2013,
				url: "https://doi.org/10.1519/JSC.0b013e31827e8681",
				doi: "10.1519/JSC.0b013e31827e8681",
				appraisal: "moderate",
				stance: "supports",
				note: "Localized leg-training study finding body-fat changes that did not preferentially occur in the trained limb.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Abdominal aerobic endurance exercise reveals spot reduction exists: A randomized controlled trial",
				publisher: "Physiological Reports",
				year: 2023,
				url: "https://doi.org/10.14814/phy2.15853",
				doi: "10.14814/phy2.15853",
				appraisal: "moderate",
				stance: "debate",
				note: "Small randomized trial reporting greater local trunk-fat reduction with specialized abdominal endurance work, a result that needs independent replication.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Does static stretching before exercise prevent injuries?",
		slug: "does-static-stretching-before-exercise-prevent-injuries",
		consensusBand: "mixed",
		confidenceScore: 69,
		evidenceCertainty: "low",
		bottomLine:
			"Static stretching by itself does not consistently prevent all exercise injuries. It may reduce some muscle-tendon injuries when used regularly or inside a broader warm-up, while having little effect on overuse, joint, or impact injuries. Warm-up, progressive loading, sport-specific preparation, strength, and workload management matter more than treating stretching as universal insurance.",
		stableCore: [
			"Injury is not one outcome: muscle strains, tendon problems, contact injuries, and overuse conditions have different causes.",
			"Older reviews found little effect on total injuries but possible protection for musculotendinous injuries.",
			"Newer synthesis reports a reduction in muscle injuries, not a broad reduction across every injury type.",
			"Long static holds immediately before explosive performance can temporarily reduce force or power, particularly without a dynamic warm-up."
		],
		openQuestions: [
			"Which stretch durations, frequencies, sports, and combinations with strength or dynamic warm-up prevent clinically meaningful injuries?",
			"Do long-term mobility programs affect injury differently from brief pre-event stretching?"
		],
		whatWouldChangeMinds: [
			"Large sport-specific trials showing a consistent substantial reduction in total injuries from static stretching alone.",
			"Updated synthesis showing no effect even for muscle injuries when exposure and adherence are measured well."
		],
		misconceptions: [
			"Improved range of motion is not the same outcome as fewer injuries.",
			"Evidence about static stretching does not apply automatically to a complete dynamic warm-up.",
			"A small average effect for muscle injury does not mean stretching prevents impact or overuse injuries."
		],
		editorSummary:
			"The old yes-or-no debate bundled unlike injuries and unlike stretching routines. Stretch for mobility or sport demands when useful, but injury prevention should be built around the actual risk profile rather than one ritual.",
		uncertaintySummary:
			"Low certainty reflects inconsistent definitions, small event counts, mixed interventions, adherence problems, and different sports. Recent evidence is more favorable for muscle injury than for total injury.",
		sources: [
			{
				kind: "systematic_review",
				title: "A Systematic Review into the Efficacy of Static Stretching as Part of a Warm-Up for the Prevention of Exercise-Related Injury",
				publisher: "Research in Sports Medicine",
				year: 2008,
				url: "https://doi.org/10.1080/15438620802310784",
				doi: "10.1080/15438620802310784",
				isAnchor: true,
				appraisal: "moderate",
				stance: "context",
				note: "Review finding no significant reduction in overall injuries but a possible benefit for musculotendinous injuries.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Stretching intervention can prevent muscle injuries: a systematic review and meta-analysis",
				publisher: "Sport Sciences for Health",
				year: 2024,
				url: "https://doi.org/10.1007/s11332-024-01213-9",
				doi: "10.1007/s11332-024-01213-9",
				appraisal: "moderate",
				stance: "debate",
				note: "Updated synthesis reporting fewer muscle injuries among healthy active participants while finding no corresponding tendon-injury reduction.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Acute effects of muscle stretching on physical performance, range of motion, and injury incidence in healthy active individuals: a systematic review",
				publisher: "Applied Physiology, Nutrition, and Metabolism",
				year: 2016,
				url: "https://doi.org/10.1139/apnm-2015-0235",
				doi: "10.1139/apnm-2015-0235",
				appraisal: "high",
				stance: "context",
				note: "Broad review distinguishing range-of-motion gains, dose-dependent acute performance effects, and limited injury evidence.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Are 10,000 daily steps necessary for health benefits?",
		slug: "are-10000-daily-steps-necessary-for-health-benefits",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Ten thousand steps is a memorable target, not a biological minimum. Mortality and cardiovascular risk begin to improve at much lower step counts, with benefits increasing as people move more and often leveling before 10,000—especially in older adults. A higher goal can still motivate some people, but progress from baseline matters most.",
		stableCore: [
			"Large cohorts show a graded association between more steps and lower mortality without a cliff at 10,000.",
			"The apparent plateau occurs at a lower daily count in older adults than in younger adults in several analyses.",
			"Step count captures movement volume but not every benefit of intensity, resistance exercise, balance, or reduced sitting.",
			"Wearables differ in accuracy, and the same count can represent different workloads across bodies and terrains."
		],
		openQuestions: [
			"How should step goals be individualized by age, mobility, baseline activity, pace, and cardiometabolic risk?",
			"What combinations of steps, intensity, strength training, and sedentary interruption best predict specific outcomes?"
		],
		whatWouldChangeMinds: [
			"Prospective evidence showing no benefit below 10,000 and a sharp threshold exactly at that count.",
			"Trials demonstrating that a fixed 10,000-step prescription outperforms progressive individualized goals across populations."
		],
		misconceptions: [
			"Falling short of 10,000 does not make a walk pointless.",
			"A plateau in one outcome does not prove additional activity has no other benefit.",
			"Step counts are useful behavior measures, not complete fitness or health scores."
		],
		editorSummary:
			"The 10,000-step rule should be replaced with a dose-response message. People gain by moving above their baseline, and many obtain substantial benefit well before five digits.",
		uncertaintySummary:
			"High certainty supports benefit below 10,000 and no exact threshold. Most evidence is observational, and plateau estimates vary with age, device, follow-up, health, and statistical model.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Daily steps and all-cause mortality: a meta-analysis of 15 international cohorts",
				publisher: "The Lancet Public Health",
				year: 2022,
				url: "https://doi.org/10.1016/S2468-2667(21)00302-9",
				doi: "10.1016/S2468-2667(21)00302-9",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Individual-level meta-analysis finding progressively lower mortality with more steps and age-dependent leveling well below a universal 10,000-step threshold.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "The association between daily step count and all-cause and cardiovascular mortality: a meta-analysis",
				publisher: "European Journal of Preventive Cardiology",
				year: 2023,
				url: "https://doi.org/10.1093/eurjpc/zwad229",
				doi: "10.1093/eurjpc/zwad229",
				appraisal: "high",
				stance: "supports",
				note: "Updated dose-response synthesis reporting lower all-cause and cardiovascular mortality beginning at modest step-count differences.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Physical Activity Guidelines for Americans, 2nd edition",
				publisher: "U.S. Department of Health and Human Services",
				year: 2018,
				url: "https://health.gov/sites/default/files/2019-09/Physical_Activity_Guidelines_2nd_edition.pdf",
				appraisal: "high",
				stance: "context",
				note: "Federal evidence review frames activity by time and intensity, emphasizes that some activity is better than none, and does not establish 10,000 steps as a required threshold.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "exercise-and-sports-science",
		title: "Is creatine monohydrate effective and generally safe for healthy adults?",
		slug: "is-creatine-monohydrate-effective-and-generally-safe-for-healthy-adults",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Creatine monohydrate reliably improves high-intensity exercise capacity and can add strength and lean mass when combined with resistance training. At standard studied doses it is generally safe for healthy adults; temporary water-weight gain is common. Evidence does not justify every marketed form or every claimed cognitive and medical benefit, and people with kidney disease or other relevant conditions need clinical guidance.",
		stableCore: [
			"Creatine increases muscle phosphocreatine availability, supporting repeated short, high-intensity efforts.",
			"Meta-analyses find additional strength gains when creatine is paired with resistance training, though study samples have included many more men than women.",
			"Controlled trials and safety reviews do not show kidney damage in healthy users taking conventional amounts, despite modest changes in serum creatinine.",
			"Creatine monohydrate is the most studied form; premium variants have not established superior outcomes."
		],
		openQuestions: [
			"How do benefits vary by sex, diet, age, baseline muscle creatine, training status, and dosing strategy?",
			"Which proposed cognitive, aging, pregnancy, or clinical uses produce meaningful outcomes in larger independent trials?"
		],
		whatWouldChangeMinds: [
			"Large independent trials finding no added high-intensity or resistance-training benefit over placebo.",
			"Reliable long-term surveillance showing clinically important kidney or other organ harm in healthy users at standard doses."
		],
		misconceptions: [
			"Creatine is not an anabolic steroid.",
			"A rise in measured creatinine does not automatically mean kidney injury, but relevant symptoms and disease still require medical evaluation.",
			"Evidence for strength and repeated high-intensity work does not prove benefits for endurance or every health claim."
		],
		editorSummary:
			"Creatine is an unusual supplement category with a mature evidence base for a specific use. That supports measured confidence about monohydrate and resistance training—not a blank check for marketing claims or medically complex users.",
		uncertaintySummary:
			"High certainty supports performance efficacy and short-to-medium-term safety in healthy adults. Very long follow-up, underrepresented groups, clinical populations, and non-performance claims are less certain.",
		sources: [
			{
				kind: "consensus_statement",
				title: "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
				publisher: "Journal of the International Society of Sports Nutrition",
				year: 2017,
				url: "https://doi.org/10.1186/s12970-017-0173-z",
				doi: "10.1186/s12970-017-0173-z",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Professional evidence review identifying monohydrate as an effective ergogenic supplement and finding no compelling harm in healthy people at studied doses.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Effects of Creatine Supplementation and Resistance Training on Muscle Strength Gains in Adults Younger Than 50 Years: A Systematic Review and Meta-Analysis",
				publisher: "Nutrients",
				year: 2024,
				url: "https://doi.org/10.3390/nu16213665",
				doi: "10.3390/nu16213665",
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis of 23 studies finding additional upper- and lower-body strength gains with creatine plus resistance training, while noting sparse female data.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "A short review of the most common safety concerns regarding creatine ingestion",
				publisher: "Frontiers in Nutrition",
				year: 2025,
				url: "https://doi.org/10.3389/fnut.2025.1682746",
				doi: "10.3389/fnut.2025.1682746",
				appraisal: "moderate",
				stance: "context",
				note: "Current safety review examining kidney, dehydration, gastrointestinal, cramping, hair-loss, and other common concerns while defining evidence limits.",
				order: 3
			}
		]
	})
];
