import type { SeedClaim } from "./claims.js";
import { september2026DemandDepthClaim as reviewedClaim } from "./claim-expansion-2026-09-demand-depth-shared.js";

const sportsNutritionPosition = [
	"consensus_statement",
	"Position of the Academy of Nutrition and Dietetics, Dietitians of Canada, and the American College of Sports Medicine: Nutrition and Athletic Performance",
	"Journal of the Academy of Nutrition and Dietetics",
	2016,
	"10.1016/j.jand.2015.12.006",
	"Joint position statement integrates carbohydrate, protein, hydration, supplement, training, and competition evidence for athletes."
] as const;

const nihPerformanceSupplements = [
	"guideline",
	"Dietary Supplements for Exercise and Athletic Performance: Fact Sheet for Health Professionals",
	"NIH Office of Dietary Supplements",
	2024,
	"https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-HealthProfessional/",
	"Evidence-based federal reference summarizes efficacy, studied doses, adverse effects, interactions, and product-quality concerns for common performance ingredients."
] as const;

export const september2026DemandDepthSportsNutritionClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Does carbohydrate intake during prolonged endurance exercise improve performance?",
		slug: "does-carbohydrate-intake-during-prolonged-endurance-exercise-improve-performance",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Consuming carbohydrate during prolonged endurance exercise can preserve carbohydrate availability and improve time-trial, time-to-exhaustion, or competition performance, especially as duration and intensity increase. The useful amount and form depend on event length, gastrointestinal tolerance, prior fueling, and opportunities to eat or drink.",
		stableCore: [
			"Carbohydrate consumed during prolonged exercise supplies an additional oxidizable fuel and helps maintain blood glucose.",
			"Benefits are clearest in sustained endurance work and are not a promise of improvement in every short session.",
			"Higher intakes require practice because gastrointestinal tolerance can limit real-world use."
		],
		openQuestions: [
			"How should athletes individualize dose, carbohydrate blend, texture, and timing for their event and gut tolerance?",
			"How much benefit remains in different climates, feeding states, and sports with intermittent rather than continuous work?"
		],
		whatWouldChangeMinds: [
			"Large competition-like trials repeatedly finding no benefit across prolonged events despite adequate dosing and adherence.",
			"Evidence that the apparent effect is explained by expectancy or study-design bias rather than carbohydrate availability."
		],
		misconceptions: [
			"Evidence for a prolonged race does not make carbohydrate necessary during every brief workout.",
			"A recommended range is not a command to consume the maximum amount regardless of comfort.",
			"Sports drinks, gels, chews, and ordinary foods can all deliver carbohydrate; the brand is not the mechanism."
		],
		editorSummary:
			"This is one of sports nutrition's better-supported performance tools. The practical question is not whether carbohydrate can work, but which event is long enough to benefit and what an athlete can comfortably absorb.",
		uncertaintySummary:
			"Direction of effect is well supported. Effect size varies with duration, intensity, baseline glycogen, fasting, dose, training status, protocol, and outcome.",
		sources: [
			sportsNutritionPosition,
			["meta_analysis", "The ergogenic effects of acute carbohydrate feeding on endurance performance: a systematic review, meta-analysis and meta-regression", "Critical Reviews in Food Science and Nutrition", 2023, "10.1080/10408398.2023.2233633", "Meta-analysis estimates overall endurance-performance benefit while examining exercise duration, feeding, dose, and protocol as moderators."],
			["meta_analysis", "A systematic review and meta-analysis of carbohydrate benefits associated with randomized controlled competition-based performance trials", "Journal of the International Society of Sports Nutrition", 2016, "10.1186/s12970-016-0139-6", "Competition-oriented synthesis supports a performance benefit while highlighting heterogeneity in events and feeding protocols."]
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Does carbohydrate loading improve long-duration endurance performance?",
		slug: "does-carbohydrate-loading-improve-long-duration-endurance-performance",
		consensusBand: "strong",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, for events long enough to make muscle glycogen a meaningful constraint. Raising carbohydrate intake while tapering training can increase pre-event glycogen and improve later-stage pace or performance in many endurance events lasting roughly 90 minutes or longer. It offers little reason to expect a benefit in short events and can add temporary water weight or gastrointestinal discomfort.",
		stableCore: [
			"Muscle glycogen can be increased above ordinary resting levels through high carbohydrate availability and reduced training load.",
			"The performance rationale is strongest when duration is sufficient for glycogen depletion to impair pace.",
			"Modern protocols do not require a severe depletion workout before loading."
		],
		openQuestions: [
			"Which loading duration and carbohydrate target best balance glycogen, body mass, comfort, and individual response?",
			"How should loading interact with race-day intake for different endurance disciplines and intensities?"
		],
		whatWouldChangeMinds: [
			"Controlled long-duration trials showing that confirmed glycogen supercompensation never improves relevant performance or fatigue resistance.",
			"Evidence that simpler adequate-carbohydrate preparation produces indistinguishable glycogen and outcomes across target events."
		],
		misconceptions: [
			"Carbohydrate loading is not simply eating one oversized pasta dinner.",
			"Extra scale weight before an event often includes water stored with glycogen, not sudden fat gain.",
			"A strategy for long endurance events should not be generalized to sprints or ordinary gym sessions."
		],
		editorSummary:
			"Loading is a specific event-preparation tool, not an all-purpose athletic diet. It is most defensible when late-race carbohydrate limitation matters and should be rehearsed before competition.",
		uncertaintySummary:
			"Glycogen supercompensation is well established, while performance gains vary with event demands, sex representation, training taper, habitual diet, loading protocol, and race-day fueling.",
		sources: [
			sportsNutritionPosition,
			["meta_analysis", "Glycogen supercompensation in skeletal muscle after cycling or running followed by a high carbohydrate intake the following days: a systematic review and meta-analysis", "Frontiers in Physiology", 2025, "10.3389/fphys.2025.1620943", "Recent synthesis quantifies muscle-glycogen supercompensation after exercise and high-carbohydrate recovery protocols."],
			["consensus_statement", "Carbohydrates for training and competition", "Journal of Sports Sciences", 2011, "10.1080/02640414.2011.585473", "Sports-nutrition review translates glycogen and fueling evidence into event-duration-specific preparation and competition guidance."]
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Is there a narrow 30-minute anabolic window for protein after lifting?",
		slug: "is-there-a-narrow-30-minute-anabolic-window-for-protein-after-lifting",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Resistance exercise increases muscle sensitivity to protein for many hours, so missing protein in the first 30 minutes does not forfeit the workout. Total daily protein, adequate energy, and reasonably distributed high-quality servings matter more. A meal near training is convenient and sensible, especially after fasting or when the next meal would otherwise be delayed.",
		stableCore: [
			"Resistance exercise and dietary protein interact over a recovery period much longer than 30 minutes.",
			"Longer-term gains track total adequate protein more consistently than an exact post-workout clock time.",
			"Pre-exercise meals change how urgent post-exercise feeding is because amino acids remain available during recovery."
		],
		openQuestions: [
			"What distribution and per-meal dose best serve older adults, elite athletes, and people training more than once daily?",
			"When does immediate feeding add value after fasting, very long sessions, or unusually low prior protein intake?"
		],
		whatWouldChangeMinds: [
			"Long-term matched-protein trials showing a uniquely large hypertrophy penalty whenever intake occurs outside 30 minutes.",
			"Mechanistic and training evidence establishing a sharp universal cutoff rather than a broad period of elevated sensitivity."
		],
		misconceptions: [
			"Saying the window is broad does not mean timing is completely irrelevant.",
			"An acute muscle-protein-synthesis measurement is not identical to months of muscle growth.",
			"A protein shake is optional if an ordinary meal supplies an appropriate serving."
		],
		editorSummary:
			"The famous 30-minute deadline is much narrower than the evidence. Put training-day protein into a practical daily pattern instead of treating a delayed shake as a lost workout.",
		uncertaintySummary:
			"There is good support against a universal narrow cutoff. Exact optimal timing remains less certain because studies differ in age, training, baseline diet, dose, and whether total protein is matched.",
		sources: [
			["consensus_statement", "International Society of Sports Nutrition position stand: nutrient timing", "Journal of the International Society of Sports Nutrition", 2017, "10.1186/s12970-017-0189-4", "Position stand describes a wider exercise-related opportunity and emphasizes total intake, meal distribution, prior feeding, and training context."],
			["meta_analysis", "The effect of protein timing on muscle strength and hypertrophy: a meta-analysis", "Journal of the International Society of Sports Nutrition", 2013, "10.1186/1550-2783-10-53", "Meta-analysis finds that apparent timing effects are strongly influenced by differences in total protein intake."],
			sportsNutritionPosition
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Does caffeine improve exercise performance in habitual caffeine users?",
		slug: "does-caffeine-improve-exercise-performance-in-habitual-caffeine-users",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Often, yes. Habitual users can still gain a small performance benefit from an acute caffeine dose, although regular exposure, dose, withdrawal, genetics, sleep, expectancy, and event type can alter the response. Evidence does not support assuming that complete abstinence is always necessary, and more caffeine can worsen sleep or side effects without improving performance.",
		stableCore: [
			"Caffeine can improve several endurance, vigilance, and high-intensity outcomes at doses below those commonly associated with severe side effects.",
			"Habitual intake does not reliably erase every acute performance effect.",
			"Caffeine withdrawal and sleep disruption can confound studies and real-world attempts to manipulate tolerance."
		],
		openQuestions: [
			"How much do habitual dose, genotype, sex, timing, and event type explain responder differences?",
			"Can any abstinence strategy improve competition outcomes after accounting for withdrawal and lost sleep?"
		],
		whatWouldChangeMinds: [
			"Well-controlled trials consistently showing zero acute benefit in habitual users across performance domains.",
			"Preregistered evidence showing that a particular withdrawal protocol reliably restores a larger net benefit without offsetting harms."
		],
		misconceptions: [
			"Tolerance to feeling stimulated is not proof that every performance effect has disappeared.",
			"A group-average benefit does not guarantee that a particular athlete will respond well.",
			"Abrupt abstinence before competition can create headache, fatigue, or impaired concentration."
		],
		editorSummary:
			"Habitual use changes the context, not necessarily the sign of caffeine's effect. Athletes should test a modest dose, timing, sleep impact, and side effects rather than escalating or abruptly withdrawing on faith.",
		uncertaintySummary:
			"Acute ergogenic effects are well established overall, but studies of habituation are fewer and use inconsistent definitions of habitual intake and withdrawal.",
		sources: [
			nihPerformanceSupplements,
			["meta_analysis", "Can I Have My Coffee and Drink It? A Systematic Review and Meta-analysis to Determine Whether Habitual Caffeine Consumption Affects the Ergogenic Effect of Caffeine", "Sports Medicine", 2022, "10.1007/s40279-022-01685-0", "Meta-analysis directly examines whether regular caffeine exposure changes the acute ergogenic effect."],
			["meta_analysis", "Wake up and smell the coffee: caffeine supplementation and exercise performance, an umbrella review of 21 published meta-analyses", "British Journal of Sports Medicine", 2019, "10.1136/bjsports-2018-100278", "Umbrella review finds mostly small-to-moderate benefits across exercise outcomes while documenting variable evidence quality and protocols."]
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Does creatine increase dehydration or muscle-cramp risk during exercise?",
		slug: "does-creatine-increase-dehydration-or-muscle-cramp-risk-during-exercise",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. Controlled studies and athlete monitoring do not show that recommended creatine use increases dehydration, heat illness, or muscle cramps. Creatine draws water into muscle and often increases body mass, but that is not the same as harmful whole-body dehydration. Ordinary hydration and heat-safety practices still apply.",
		stableCore: [
			"Creatine increases intracellular water along with stored creatine and does not inherently drain total-body water.",
			"Trials in exercise and heat have not shown impaired temperature regulation or hydration from recommended dosing.",
			"Cramps have many causes, and anecdotes cannot determine whether creatine caused an episode."
		],
		openQuestions: [
			"How well do the data generalize to every extreme-heat occupation, medical condition, and combined supplement regimen?",
			"Which field surveillance systems best capture uncommon adverse events while separating exposure from causation?"
		],
		whatWouldChangeMinds: [
			"Consistent randomized or high-quality prospective evidence of excess dehydration, cramps, or heat illness at recommended doses.",
			"A reproducible physiological mechanism showing creatine impairs fluid balance or thermoregulation in typical users."
		],
		misconceptions: [
			"Water entering muscle cells is not equivalent to water leaving the body.",
			"Early body-mass gain is expected and does not by itself indicate edema or dehydration.",
			"Evidence against added risk does not remove the need to drink appropriately or acclimatize to heat."
		],
		editorSummary:
			"The dehydration warning persists despite a fairly direct evidence base against it. Creatine does not make heat precautions optional, but recommended use is not an established cramp or dehydration trigger.",
		uncertaintySummary:
			"The conclusion is strong for healthy people using standard protocols. Evidence is thinner for severe disease, unregulated mixtures, unusually high doses, and rare events.",
		sources: [
			nihPerformanceSupplements,
			["systematic_review", "Part II. Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show?", "Journal of the International Society of Sports Nutrition", 2024, "10.1080/15502783.2024.2441760", "Evidence review addresses hydration, cramps, heat, kidney, hair, women, older adults, and other recurring safety claims."],
			["systematic_review", "Putting the Myth of Creatine Supplementation Leading to Muscle Cramps and Dehydration to Rest", "British Journal of Sports Medicine", 2008, "10.1136/bjsm.2007.042473", "Systematic review and meta-analyses find no evidence that creatine impairs heat tolerance or hydration during exercise."]
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Is creatine's proposed link to hair loss established?",
		slug: "is-creatines-proposed-link-to-hair-loss-established",
		consensusBand: "mixed",
		confidenceScore: 72,
		evidenceCertainty: "low",
		bottomLine:
			"No. The concern largely grew from one small study that measured a rise in dihydrotestosterone, not hair loss. A 12-week randomized trial that directly measured scalp and hair outcomes found no adverse difference, which is reassuring but not enough to exclude every small, long-term, or susceptibility-specific effect.",
		stableCore: [
			"A hormone change is not direct evidence that participants lost hair.",
			"The first randomized trial designed around direct hair and follicle measures did not find worse outcomes over 12 weeks.",
			"Androgenetic hair loss depends on genetic and follicular sensitivity as well as androgen signaling."
		],
		openQuestions: [
			"Would longer use affect people already predisposed to androgenetic alopecia?",
			"Do dose, age, sex, baseline hair status, or concurrent treatments modify any effect too small for current trials to detect?"
		],
		whatWouldChangeMinds: [
			"Replicated long-term trials showing greater objective hair loss with creatine than placebo.",
			"Mechanistic evidence paired with measured follicle miniaturization, not a hormone surrogate alone."
		],
		misconceptions: [
			"The original small study did not count hairs or diagnose baldness.",
			"One reassuring 12-week trial cannot prove zero risk for every person over years.",
			"Hair shedding after starting a supplement does not by timing alone establish causation."
		],
		editorSummary:
			"The categorical warning that creatine causes baldness outruns the evidence. The newest direct trial is useful, but the appropriately cautious conclusion is not established rather than impossible.",
		uncertaintySummary:
			"Direct evidence is limited to a short trial with modest sample size. Long-term effects and genetically susceptible subgroups remain insufficiently studied.",
		sources: [
			nihPerformanceSupplements,
			["landmark_study", "Does creatine cause hair loss? A 12-week randomized controlled trial", "Journal of the International Society of Sports Nutrition", 2025, "10.1080/15502783.2025.2495229", "Direct randomized assessment found no between-group difference in hair-growth or follicle-health measures after 12 weeks."],
			["systematic_review", "Part II. Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show?", "Journal of the International Society of Sports Nutrition", 2024, "10.1080/15502783.2024.2441760", "Review explains the indirect origin of the hair-loss concern and the limits of inferring clinical hair loss from one hormone result."]
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Does citrulline meaningfully improve strength or power?",
		slug: "does-citrulline-meaningfully-improve-strength-or-power",
		consensusBand: "mixed",
		confidenceScore: 69,
		evidenceCertainty: "low",
		bottomLine:
			"Possibly by a small amount in some high-intensity resistance tasks, but not reliably across strength and power outcomes. Meta-analyses report modest improvements in repetitions or total work under some protocols, while maximal strength and explosive-power findings are inconsistent. Citrulline and citrulline malate products, doses, malate ratios, and study designs are not interchangeable.",
		stableCore: [
			"Citrulline can raise circulating arginine and nitric-oxide availability more effectively than taking the same amount of arginine orally.",
			"The most favorable findings concern short-term resistance-exercise volume rather than large gains in maximal strength.",
			"Small samples, product variation, and many tested outcomes make effect-size certainty limited."
		],
		openQuestions: [
			"Which dose, formulation, timing, and exercise protocol produce a reproducible athlete-relevant benefit?",
			"Does repeated use improve training adaptation rather than only one-session repetition counts?"
		],
		whatWouldChangeMinds: [
			"Large preregistered trials showing consistent meaningful gains across standardized strength and power outcomes.",
			"Independent trials finding no effect under the protocols that generated the strongest meta-analytic signals."
		],
		misconceptions: [
			"A larger muscle pump does not establish greater maximal strength or long-term hypertrophy.",
			"Citrulline malate labels may not deliver the same citrulline or malate amounts used in research.",
			"A small average increase in repetitions is not a guaranteed visible performance difference."
		],
		editorSummary:
			"Citrulline is plausible and may slightly raise resistance-exercise volume, but it belongs below more established fundamentals and supplements. The category needs standardized products and larger direct trials.",
		uncertaintySummary:
			"Evidence is limited by small studies, acute protocols, publication bias risk, heterogeneous doses and formulations, and inconsistent outcome selection.",
		sources: [
			nihPerformanceSupplements,
			["meta_analysis", "Acute Effects of Citrulline Supplementation on High-Intensity Strength and Power Performance: A Systematic Review and Meta-Analysis", "Sports Medicine", 2019, "10.1007/s40279-019-01091-z", "Meta-analysis reports a small aggregate benefit for high-intensity strength and power tasks while noting limited studies and variable protocols."],
			["meta_analysis", "Effect of citrulline on post-exercise rating of perceived exertion, muscle soreness, and blood lactate levels: A systematic review and meta-analysis", "Journal of Sport and Health Science", 2020, "10.1016/j.jshs.2020.02.003", "Synthesis adds recovery and exertion context without establishing a large or universal strength benefit."]
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Does glutamine build muscle or improve performance in healthy athletes?",
		slug: "does-glutamine-build-muscle-or-improve-performance-in-healthy-athletes",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Generally no. Glutamine is biologically important and can be clinically useful in selected illness or deficiency contexts, but supplementation has not reliably increased muscle, strength, or aerobic performance in healthy, adequately nourished athletes. Some immune, soreness, or gastrointestinal findings remain context-specific and do not establish a general ergogenic effect.",
		stableCore: [
			"Glutamine is abundant in the body, and healthy muscle can synthesize it.",
			"Biochemical importance does not mean more oral glutamine becomes a limiting ingredient for muscle growth.",
			"Aggregated athlete evidence does not show a reliable improvement in body composition or performance."
		],
		openQuestions: [
			"Are there meaningful benefits during extreme training stress, energy deficit, heat, gastrointestinal challenge, or documented low availability?",
			"Which outcomes, if any, justify supplementation in specific athlete subgroups rather than healthy athletes generally?"
		],
		whatWouldChangeMinds: [
			"Large independent trials showing added muscle or performance with diet, protein, and training carefully matched.",
			"A validated deficiency or responder marker that predicts a repeatable benefit in athletes."
		],
		misconceptions: [
			"Being the most abundant amino acid in muscle does not prove that oral intake limits muscle growth.",
			"Clinical use in severe illness cannot be transferred directly to healthy training populations.",
			"A change in an immune marker is not automatically better performance or fewer illnesses."
		],
		editorSummary:
			"Glutamine's reputation is larger than its healthy-athlete performance evidence. A special clinical or high-stress use should be evaluated separately from routine muscle-building claims.",
		uncertaintySummary:
			"The absence of a general ergogenic effect is reasonably consistent. Smaller subgroup, immune, gastrointestinal, and recovery effects are heterogeneous and less certain.",
		sources: [
			nihPerformanceSupplements,
			["meta_analysis", "Glutamine supplementation and athletic performance, body composition, and immune function: a systematic review and a meta-analysis of clinical trials", "Clinical Nutrition", 2019, "10.1016/j.clnu.2018.05.001", "Meta-analysis finds no general improvement in aerobic performance, body composition, or immune outcomes, with limited context-specific signals."],
			["systematic_review", "Glutamine as an Anti-Fatigue Amino Acid in Sports Nutrition", "Nutrients", 2019, "10.3390/nu11040863", "Review separates mechanistic and clinical rationales from inconsistent endurance, immunity, gastrointestinal, and recovery evidence in athletes."]
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Do magnesium supplements improve performance when deficiency is absent?",
		slug: "do-magnesium-supplements-improve-performance-when-deficiency-is-absent",
		consensusBand: "broad",
		confidenceScore: 83,
		evidenceCertainty: "moderate",
		bottomLine:
			"Usually not in a reliable, meaningful way. Correcting magnesium deficiency is important for normal nerve, muscle, energy, and cardiovascular function, but trials do not consistently show that extra magnesium improves strength, endurance, or recovery in people who already have adequate status. Diet assessment and clinical context matter more than assuming every cramp signals deficiency.",
		stableCore: [
			"Magnesium is essential, and inadequate intake or deficiency can impair normal physiology.",
			"Nutrient replacement and supplementation above adequate status are different interventions.",
			"Common blood measurements do not perfectly reflect total-body magnesium, complicating subgroup classification."
		],
		openQuestions: [
			"Which practical status markers best identify athletes likely to benefit?",
			"Do high sweat losses, restricted diets, older age, or particular training loads create responder groups with clinically relevant gains?"
		],
		whatWouldChangeMinds: [
			"Large trials in demonstrably magnesium-replete athletes showing reproducible meaningful performance benefits.",
			"Validated status-stratified evidence revealing a consistent dose-response above adequacy."
		],
		misconceptions: [
			"An essential nutrient is not automatically performance-enhancing when taken in excess.",
			"Muscle cramps have many causes and do not diagnose magnesium deficiency.",
			"Supplemental magnesium can cause diarrhea and can interact with some medicines."
		],
		editorSummary:
			"Magnesium is a correct-the-gap intervention, not a dependable boost above adequacy. Suspected deficiency deserves dietary or clinical assessment rather than automatic high-dose supplementation.",
		uncertaintySummary:
			"Evidence is heterogeneous because baseline status, dose, formulation, age, training, and outcomes vary. Benefits may be more likely in deficiency than in replete populations.",
		sources: [
			["guideline", "Magnesium: Fact Sheet for Health Professionals", "NIH Office of Dietary Supplements", 2026, "https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/", "Federal reference covers physiological roles, status assessment, intake, deficiency, upper limits, adverse effects, and medication interactions."],
			["systematic_review", "The Role of Mineral and Trace Element Supplementation in Exercise and Athletic Performance: A Systematic Review", "Nutrients", 2019, "10.3390/nu11030696", "Systematic review finds that performance benefits are more plausible when a nutrient deficit exists and evidence is inconsistent in replete athletes."],
			["meta_analysis", "The effect of magnesium supplementation on muscle fitness: a meta-analysis and systematic review", "Magnesium Research", 2017, "10.1684/mrh.2018.0430", "Synthesis finds inconsistent muscle-fitness effects, with baseline status and participant characteristics likely influencing results."]
		]
	}),
	reviewedClaim({
		topicSlug: "sports-nutrition-and-supplements",
		title: "Are multi-ingredient pre-workout supplements proven safe and effective as a category?",
		slug: "are-multi-ingredient-pre-workout-supplements-proven-safe-and-effective-as-a-category",
		consensusBand: "mixed",
		confidenceScore: 66,
		evidenceCertainty: "low",
		bottomLine:
			"No. Some studied formulas can acutely improve alertness, repetitions, or selected performance outcomes, often largely because they contain caffeine, but evidence cannot be transferred to every changing blend. Most trials are short, product-specific, and too small to establish uncommon or long-term harms. Dose disclosure, stimulant exposure, interactions, third-party testing, and sport eligibility matter.",
		stableCore: [
			"Multi-ingredient products vary widely in ingredients, doses, quality control, and reformulation over time.",
			"An effect from caffeine or another supported ingredient does not validate every ingredient or the complete category.",
			"Supplement regulation and premarket evidence requirements differ from those for medicines."
		],
		openQuestions: [
			"Which named formulas improve meaningful outcomes beyond a matched caffeine control?",
			"What are the long-term cardiovascular, sleep, psychiatric, interaction, contamination, and repeated-use risks?"
		],
		whatWouldChangeMinds: [
			"Long, adequately powered independent trials establishing category-wide safety and meaningful benefits across standardized products.",
			"Head-to-head trials showing that complete blends consistently outperform matched caffeine and nutrition controls."
		],
		misconceptions: [
			"Feeling tingling, flushed, or stimulated does not prove better training adaptation.",
			"A study of one disclosed formula does not validate another product with a proprietary blend.",
			"A legal retail supplement can still contain excessive, mislabeled, contaminated, or sport-prohibited substances."
		],
		editorSummary:
			"Pre-workout is a marketing category, not one intervention. Evaluate the exact label, independent testing, total caffeine, other stimulants, and direct evidence instead of borrowing credibility from one ingredient or product.",
		uncertaintySummary:
			"Short-term efficacy evidence is formula-specific and often industry-funded. Long-term and rare-event safety evidence is inadequate, while formulation turnover limits generalization.",
		sources: [
			nihPerformanceSupplements,
			["meta_analysis", "A Systematic Review and Meta-analysis of the Effect of Multi-ingredient Preworkout Supplementation on Strength, Exercise Volume, and Anaerobic Capacity in Healthy Resistance-Trained Individuals", "Strength and Conditioning Journal", 2020, "10.1519/SSC.0000000000000537", "Synthesis finds possible acute benefits from some formulas but emphasizes heterogeneous products, outcomes, and short study duration."],
			["systematic_review", "Multi-ingredient pre-workout supplements, safety implications, and performance outcomes: a brief review", "Journal of the International Society of Sports Nutrition", 2018, "10.1186/s12970-018-0247-6", "Review summarizes short-term performance findings and warns that product-specific mixtures, proprietary blends, and sparse long-term data limit broad conclusions."]
		]
	})
];
