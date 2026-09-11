import type { DemandEssentialsSourceTuple } from "./claim-expansion-2026-09-demand-essentials-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026DemandEssentialsClaim as reviewedClaim } from "./claim-expansion-2026-09-demand-essentials-shared.js";

const soyHormoneMetaAnalysis = [
	"meta_analysis",
	"Neither soy nor isoflavone intake affects male reproductive hormones: An expanded and updated meta-analysis of clinical studies",
	"Reproductive Toxicology",
	2021,
	"10.1016/j.reprotox.2020.12.019",
	"Updated synthesis of 38 clinical studies found no effect on total or free testosterone, estradiol, or estrone across studied doses and durations."
] as const satisfies DemandEssentialsSourceTuple;

const plantProteinAdequacyReview = [
	"systematic_review",
	"Protein Adequacy, Plant Protein Proportion, and Main Plant Protein Sources Consumed Across Vegan, Vegetarian, Pescovegetarian, and Semivegetarian Diets: A Systematic Review",
	"The Journal of Nutrition",
	2025,
	"10.1016/j.tjnut.2024.07.033",
	"Systematic review found average protein intake across studied plant-based patterns generally within adult recommendations while identifying subgroups and diets that can fall short."
] as const satisfies DemandEssentialsSourceTuple;

const veganDietAdequacyReview = [
	"systematic_review",
	"Intake and adequacy of the vegan diet. A systematic review of the evidence",
	"Clinical Nutrition",
	2021,
	"10.1016/j.clnu.2020.11.035",
	"Review separates generally adequate macronutrient intake from recurring risks for vitamin B12, vitamin D, iodine, calcium, zinc, and selenium."
] as const satisfies DemandEssentialsSourceTuple;

const fruitJuiceUmbrellaReview = [
	"systematic_review",
	"Health effects of drinking 100% juice: an umbrella review of systematic reviews with meta-analyses",
	"Nutrition Reviews",
	2024,
	"10.1093/nutrit/nuae036",
	"Umbrella review finds a mixed outcome-specific evidence profile for 100% juice rather than equivalence with either whole fruit or sugar-sweetened drinks."
] as const satisfies DemandEssentialsSourceTuple;

const coconutOilMetaAnalysis = [
	"meta_analysis",
	"The Effect of Coconut Oil Consumption on Cardiovascular Risk Factors",
	"Circulation",
	2020,
	"10.1161/CIRCULATIONAHA.119.043052",
	"Meta-analysis of clinical trials found coconut oil raises LDL cholesterol compared with non-tropical vegetable oils, without evidence of offsetting cardiovascular benefit."
] as const satisfies DemandEssentialsSourceTuple;

export const september2026DemandEssentialsNutritionClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does apple cider vinegar produce substantial, durable weight loss?",
		slug: "does-apple-cider-vinegar-produce-substantial-durable-weight-loss",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "low",
		bottomLine:
			"It has not been shown to produce substantial, durable weight loss. Small, short trials have reported modest changes, but the evidence is sparse, heterogeneous, and vulnerable to bias. A widely publicized 2024 trial reporting unusually large effects was retracted after data and analysis concerns. Vinegar may modestly affect some short-term metabolic measures, but it is not an evidence-based substitute for sustained dietary, activity, medical, or surgical obesity care.",
		stableCore: [
			"Human weight-loss trials are few, generally small, and usually last weeks rather than years.",
			"Short-term changes in weight or glucose do not establish durable fat loss, health benefit, or safety.",
			"Undiluted vinegar can damage teeth and irritate the esophagus or stomach, and it can interact with some medicines."
		],
		openQuestions: [
			"Would well-powered, preregistered trials with verified data show a clinically meaningful effect beyond calorie intake and adherence?",
			"What dose, preparation, duration, and patient group, if any, has a favorable long-term benefit-risk profile?"
		],
		whatWouldChangeMinds: [
			"Multiple independent, preregistered trials showing clinically meaningful weight loss maintained for at least a year with acceptable harms.",
			"A high-quality meta-analysis that remains robust after excluding retracted, high-risk, and very short studies."
		],
		misconceptions: [
			"A statistically significant kilogram change is not automatically substantial or durable treatment.",
			"A meta-analysis cannot repair unreliable trials merely by pooling them.",
			"A common food ingredient can still cause harm when consumed as a concentrated remedy."
		],
		editorSummary:
			"Apple cider vinegar has an outsized reputation built on a very small evidence base. The strongest defensible conclusion is that major, lasting weight loss is unproven.",
		uncertaintySummary:
			"Some short-term pooled estimates favor vinegar, but few trials, short follow-up, inconsistent methods, and a prominent retraction make the magnitude and durability highly uncertain.",
		sources: [
			[
				"systematic_review",
				"Safety and side effects of apple vinegar intake and its effect on metabolic parameters and body weight: a systematic review",
				"European Journal of Nutrition",
				2020,
				"10.1007/s00394-020-02214-3",
				"Systematic review found too few adequate human studies to support strong health or weight-loss conclusions and documented potential adverse effects."
			],
			[
				"meta_analysis",
				"Effect of Apple Cider Vinegar Intake on Body Composition in Humans with Type 2 Diabetes and/or Overweight: A Systematic Review and Meta-Analysis of Randomized Controlled Trials",
				"Nutrients",
				2025,
				"10.3390/nu17183000",
				"Recent pooling reported short-term reductions but included very few trials; interpretation is further weakened because a prominent contributing weight-loss trial was later retracted.",
				"debate"
			],
			[
				"context",
				"BMJ Group retracts trial on apple cider vinegar and weight loss",
				"BMJ Group",
				2025,
				"https://bmjgroup.com/bmj-group-retracts-trial-on-apple-cider-vinegar-and-weight-loss/",
				"Publisher integrity notice documents implausible values, unreliable data, analytical errors, inadequate methods, and absent prospective registration in the retracted trial."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does ordinary soy consumption lower testosterone or feminize men?",
		slug: "does-ordinary-soy-consumption-lower-testosterone-or-feminize-men",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No reliable clinical evidence shows that ordinary soy-food or studied isoflavone intake feminizes men or meaningfully lowers testosterone. Isoflavones can bind estrogen receptors, but they are not equivalent to human estrogen, and pooled intervention studies generally find no important change in male reproductive hormones. Very high supplement exposures and rare case reports should not be generalized to normal food intake.",
		stableCore: [
			"Clinical hormone outcomes are more informative for this claim than the molecular label phytoestrogen alone.",
			"Updated pooled studies do not show meaningful reductions in total or free testosterone from soy foods or isoflavones at tested intakes.",
			"Whole soy foods, protein isolates, and concentrated supplements should be distinguished by dose and composition."
		],
		openQuestions: [
			"What are the long-term reproductive effects of unusually high-dose isolated supplements in susceptible individuals?",
			"Do genetics, microbiome metabolism, fertility status, or medication use modify small hormonal responses?"
		],
		whatWouldChangeMinds: [
			"Large, replicated randomized trials showing clinically meaningful androgen suppression or feminizing outcomes at ordinary dietary intakes.",
			"A consistent dose-response effect that persists after separating foods from concentrated supplements."
		],
		misconceptions: [
			"A plant compound interacting with an estrogen receptor does not mean it acts like the same dose of human estrogen in every tissue.",
			"A rodent experiment or isolated case report cannot estimate typical human dietary effects.",
			"This conclusion does not guarantee that every concentrated supplement is harmless at unlimited doses."
		],
		editorSummary:
			"The feminization claim does not survive comparison with pooled human clinical data. Dose and product still matter, especially when moving from food to supplements.",
		uncertaintySummary:
			"Evidence is strong for studied food and isoflavone exposures, while very high doses, long-term fertility endpoints, and uncommon susceptibilities are less certain.",
		sources: [
			soyHormoneMetaAnalysis,
			[
				"meta_analysis",
				"Clinical studies show no effects of soy protein or isoflavones on reproductive hormones in men: results of a meta-analysis",
				"Fertility and Sterility",
				2010,
				"10.1016/j.fertnstert.2009.04.038",
				"Earlier clinical synthesis likewise found no significant effect on total testosterone, free testosterone, sex-hormone-binding globulin, or free androgen index."
			],
			[
				"systematic_review",
				"The Impact of Soy Products and Isoflavones on Male Reproductive Hormones: A Systematic Review and Dose-Response Meta-Analysis of Randomized Controlled Trials",
				"Food Frontiers",
				2025,
				"10.1002/fft2.70090",
				"Recent randomized-trial synthesis examines dose response and supports no important average testosterone reduction while retaining uncertainty at sparse exposure extremes.",
				"context"
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does eating soy increase breast-cancer risk or recurrence?",
		slug: "does-eating-soy-increase-breast-cancer-risk-or-recurrence",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Human evidence does not show that eating ordinary soy foods increases breast-cancer incidence or recurrence. Observational studies of survivors generally show no harm and sometimes lower recurrence or mortality, although those possible benefits are not proven treatment effects. Food exposures should be distinguished from high-dose isoflavone supplements, which have less certain safety and are not a cancer therapy.",
		stableCore: [
			"Population evidence does not support avoiding tofu, soy milk, edamame, or similar foods solely because they contain isoflavones.",
			"Survivor studies are mostly observational, so apparent protective associations can be influenced by diet and lifestyle differences.",
			"Soy foods do not replace oncology treatment, and concentrated supplements deserve separate review with the care team."
		],
		openQuestions: [
			"How do timing, lifelong intake, tumor subtype, menopause, gut metabolism, and endocrine therapy modify associations?",
			"Can randomized dietary interventions clarify whether the observed lower recurrence is causal?"
		],
		whatWouldChangeMinds: [
			"Consistent prospective evidence showing ordinary soy-food intake increases incidence or recurrence after controlling for major confounders.",
			"Randomized evidence of clinically important harm or benefit during specific endocrine treatments."
		],
		misconceptions: [
			"Soy isoflavones are not identical to estradiol and can have tissue-selective actions.",
			"Evidence about foods cannot automatically establish the safety of concentrated supplements.",
			"No observed harm does not mean soy has been proven to prevent or treat breast cancer."
		],
		editorSummary:
			"The practical evidence supports keeping ordinary soy foods on the menu if desired, including after breast cancer, while treating supplement and treatment claims more cautiously.",
		uncertaintySummary:
			"No-harm evidence is consistent but largely observational. The size and causality of possible protective associations remain uncertain.",
		sources: [
			[
				"systematic_review",
				"Soy and isoflavones consumption and breast cancer survival and recurrence: a systematic review and meta-analysis",
				"European Journal of Nutrition",
				2018,
				"10.1007/s00394-018-1853-4",
				"Meta-analysis of survivors found no increased recurrence or mortality and possible favorable associations, with observational limitations."
			],
			[
				"meta_analysis",
				"Association between Soy Isoflavone Intake and Breast Cancer Risk for Pre- and Post-Menopausal Women: A Meta-Analysis of Epidemiological Studies",
				"PLOS ONE",
				2014,
				"10.1371/journal.pone.0089288",
				"Epidemiologic synthesis found no increased breast-cancer risk and highlights differences by population, menopause, and exposure."
			],
			[
				"consensus_statement",
				"Breast cancer survivors research",
				"World Cancer Research Fund International",
				2024,
				"https://www.wcrf.org/research-policy/evidence-for-our-recommendations/after-a-cancer-diagnosis-follow-recommendations/breast-cancer-survivors-research/",
				"Continuous evidence review finds no reason for survivors already eating soy foods to stop, while rating possible recurrence benefit as limited evidence."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Can a well-planned plant-based diet provide enough protein for adults?",
		slug: "can-a-well-planned-plant-based-diet-provide-enough-protein-for-adults",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Adults can meet protein and essential-amino-acid needs with a varied plant-based diet that supplies enough total food and includes protein-rich foods such as legumes, soy, nuts, seeds, and grains. Planning matters more for people with low energy intake, older adults, athletes, illness, pregnancy, or highly restrictive diets. Protein adequacy also does not guarantee adequate vitamin B12, iron, iodine, calcium, vitamin D, or other nutrients.",
		stableCore: [
			"Plant foods contain all essential amino acids, but amounts and digestibility differ across foods.",
			"A varied diet across the day can provide complementary amino-acid patterns without combining specific proteins at every meal.",
			"Vitamin B12 requires reliable fortified food or supplementation in vegan diets because protein sufficiency does not supply it."
		],
		openQuestions: [
			"What intake and meal distribution best preserve muscle in older adults eating fully plant-based diets?",
			"How should protein-quality metrics account for mixed meals, processing, adaptation, affordability, and global food patterns?"
		],
		whatWouldChangeMinds: [
			"Controlled balance and outcome studies showing varied plant-only diets cannot meet adult amino-acid needs at realistic energy intake.",
			"Long-term evidence that apparently adequate intake consistently produces functional protein deficiency."
		],
		misconceptions: [
			"Plant-based does not mean eating only vegetables or fruit.",
			"Protein adequacy and complete nutritional adequacy are separate questions.",
			"Higher needs or limited appetite may require more deliberate food choices or supplementation."
		],
		editorSummary:
			"Protein is achievable without animal foods, but the word planned matters. Total intake, food variety, life stage, and the rest of the nutrient package still deserve attention.",
		uncertaintySummary:
			"Adult adequacy is well supported at the population level. Optimal targets for aging, illness, athletic training, and very restrictive real-world patterns remain more individualized.",
		sources: [
			plantProteinAdequacyReview,
			veganDietAdequacyReview,
			[
				"consensus_statement",
				"Protein and Amino Acids",
				"Food and Agriculture Organization of the United Nations",
				2013,
				"https://www.fao.org/4/i3124e/i3124e.pdf",
				"FAO expert report defines human protein and amino-acid requirements and methods for evaluating dietary protein quality."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Are frozen fruits and vegetables substantially less nutritious than fresh produce?",
		slug: "are-frozen-fruits-and-vegetables-substantially-less-nutritious-than-fresh-produce",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"Usually no. Freezing and the blanching used for many vegetables can reduce some heat-sensitive vitamins, but frozen produce often retains nutrients well because deterioration slows after processing. Fresh produce also loses nutrients during transport and refrigerator storage. Which form has more of a particular nutrient depends on the food, nutrient, processing, storage time, and cooking method, not a universal fresh-wins rule.",
		stableCore: [
			"Minerals and fiber are generally stable through freezing, while some water-soluble vitamins are more sensitive to blanching and storage.",
			"Fresh-at-harvest is not the same comparison as produce stored for several days before eating.",
			"Frozen produce can be a nutritious, affordable, and lower-waste way to eat more fruits and vegetables."
		],
		openQuestions: [
			"How do newer freezing, packaging, transport, and home-storage practices affect individual nutrients and bioavailability?",
			"What comparisons best reflect diverse retail chains and how consumers actually store and cook produce?"
		],
		whatWouldChangeMinds: [
			"Broad independent sampling showing frozen forms consistently lose clinically important amounts of most nutrients before consumption.",
			"Outcome studies showing people substituting frozen for fresh produce experience worse health despite similar total intake."
		],
		misconceptions: [
			"Frozen does not mean nutritionally empty or heavily processed in the same sense as a formulated snack.",
			"One vitamin result for one vegetable cannot rank all fresh and frozen produce.",
			"Added sauces, salt, or sugar are product attributes, not effects of freezing itself."
		],
		editorSummary:
			"Fresh and frozen are both useful. The meaningful comparison is the specific food as it is stored and eaten, not an idealized just-picked sample versus a freezer bag.",
		uncertaintySummary:
			"Nutrient retention is commodity- and method-specific, and some comparison studies have industry funding. The absence of a large general disadvantage for frozen produce is consistent across the broader evidence.",
		sources: [
			[
				"systematic_review",
				"Nutritional comparison of fresh, frozen and canned fruits and vegetables. Part 1. Vitamins C and B and phenolic compounds",
				"Journal of the Science of Food and Agriculture",
				2007,
				"10.1002/jsfa.2825",
				"Review finds that processing and storage effects vary by nutrient and commodity and that fresh storage losses can be substantial."
			],
			[
				"landmark_study",
				"Vitamin Retention in Eight Fruits and Vegetables: A Comparison of Refrigerated and Frozen Storage",
				"Journal of Agricultural and Food Chemistry",
				2015,
				"10.1021/jf5058793",
				"Matched sampling found most vitamin levels comparable across fresh and frozen storage, with food-specific differences."
			],
			[
				"landmark_study",
				"Selected nutrient analyses of fresh, fresh-stored, and frozen fruits and vegetables",
				"Journal of Food Composition and Analysis",
				2017,
				"10.1016/j.jfca.2017.02.002",
				"Two-year comparison found frozen produce generally comparable to fresh and sometimes higher than produce after typical refrigerated storage."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does microwaving destroy more nutrients than other cooking methods?",
		slug: "does-microwaving-destroy-more-nutrients-than-other-cooking-methods",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. All cooking can change nutrients, but losses depend mainly on temperature, time, water, surface area, and the food and nutrient involved. Because microwaving is often quick and uses little water, it can retain water-soluble vitamins as well as or better than boiling. It is not always best for every nutrient or vegetable, but microwave energy has no unique nutrient-destroying effect.",
		stableCore: [
			"Heat-sensitive vitamins can decline with any sufficiently hot or long cooking method.",
			"Boiling can move water-soluble nutrients into discarded cooking water, while short steaming or microwaving often reduces that loss.",
			"Cooking can also increase availability of some compounds by softening plant tissue."
		],
		openQuestions: [
			"Which time, power, water, and vessel combinations best preserve specific nutrients while ensuring food safety?",
			"How should retention data be translated into practical guidance for mixed dishes and reheating?"
		],
		whatWouldChangeMinds: [
			"Controlled comparisons showing microwave exposure itself consistently destroys nutrients beyond matched heat, time, and water conditions.",
			"Evidence of a reproducible microwave-specific chemical pathway causing meaningful dietary deficiency."
		],
		misconceptions: [
			"The word radiation includes non-ionizing microwave energy and does not imply radioactive food.",
			"A cooked sample can appear to have more of a nutrient because water loss changes concentration or cooking improves extraction.",
			"Method rankings can reverse across nutrients and foods."
		],
		editorSummary:
			"Microwaving is simply one way to heat food. Short time and little water often make it nutrient-friendly, though the exact result depends on what and how you cook.",
		uncertaintySummary:
			"The absence of a unique destructive effect is well established. Specific retention percentages vary widely by food, nutrient, preparation, and endpoint.",
		sources: [
			[
				"systematic_review",
				"Cooking at home to retain nutritional quality and minimise nutrient losses: A focus on vegetables, potatoes and pulses",
				"Nutrition Bulletin",
				2022,
				"10.1111/nbu.12584",
				"Review concludes that long heating and abundant water often drive losses, while steaming and microwaving can retain water-soluble nutrients well."
			],
			[
				"landmark_study",
				"Effect of different cooking methods on the content of vitamins and true retention in selected vegetables",
				"Food Science and Biotechnology",
				2017,
				"10.1007/s10068-017-0281-1",
				"Controlled comparisons show nutrient-specific results, with microwaving often retaining vitamin C better than boiling but not winning every comparison."
			],
			[
				"landmark_study",
				"Effect of Different Cooking Methods on Color, Phytochemical Concentration, and Antioxidant Capacity of Raw and Frozen Brassica Vegetables",
				"Journal of Agricultural and Food Chemistry",
				2010,
				"10.1021/jf904306r",
				"Food-specific experiment found mixed phytochemical changes and good glucosinolate retention with microwaving, illustrating why one universal ranking is misleading."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Is whole fruit metabolically equivalent to drinking fruit juice?",
		slug: "is-whole-fruit-metabolically-equivalent-to-drinking-fruit-juice",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. One hundred percent juice can supply vitamins and plant compounds, but juicing removes or disrupts much of the intact fiber and food structure, makes sugar and calories faster to consume, and generally produces less fullness than whole fruit. Juice is not metabolically identical to soda, either: effects vary by amount, type, energy balance, and outcome. Whole fruit remains the better default for most fruit intake.",
		stableCore: [
			"Food structure and fiber change eating rate, gastric processing, satiety, and the delivery of sugars.",
			"Liquid calories are easier to consume in a short time and may be less completely compensated for at later meals.",
			"Evidence for 100% juice is mixed and dose-dependent, so it should not be collapsed into either whole fruit or sugar-sweetened beverages."
		],
		openQuestions: [
			"How do juice type, pulp, serving size, meal context, age, and baseline metabolic health alter long-term outcomes?",
			"Which processing methods preserve structure or fiber well enough to narrow the difference from whole fruit?"
		],
		whatWouldChangeMinds: [
			"Long-term randomized evidence showing equal satiety, energy intake, weight, and metabolic outcomes when whole fruit and matched juice are exchanged.",
			"Mechanistic evidence that removing intact structure has no meaningful effect on digestion or intake."
		],
		misconceptions: [
			"Natural sugar is not metabolically exempt from dose and food form.",
			"Not equivalent to whole fruit does not mean a small serving of 100% juice is poison.",
			"Added-sugar fruit drinks and 100% juice are not the same product."
		],
		editorSummary:
			"Juice keeps some fruit chemistry but changes the physical package. That difference matters for fullness, intake speed, and how much is easy to consume.",
		uncertaintySummary:
			"Short-term physiology supports a meaningful form effect, while long-term juice outcomes vary across populations, doses, comparators, and adjustment for total energy.",
		sources: [
			fruitJuiceUmbrellaReview,
			[
				"meta_analysis",
				"Consumption of sugar sweetened beverages, artificially sweetened beverages, and fruit juice and incidence of type 2 diabetes",
				"The BMJ",
				2015,
				"10.1136/bmj.h3576",
				"Prospective synthesis distinguishes fruit juice from whole fruit and other beverages and shows how confounding and energy adjustment affect estimated diabetes risk."
			],
			[
				"landmark_study",
				"Processing Apples to Puree or Juice Speeds Gastric Emptying and Reduces Postprandial Intestinal Volumes and Satiety in Healthy Adults",
				"The Journal of Nutrition",
				2020,
				"10.1093/jn/nxaa191",
				"Randomized crossover study found whole apples produced greater fullness and different gastrointestinal processing than matched juice."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Is intermittent fasting proven to extend human lifespan through autophagy?",
		slug: "is-intermittent-fasting-proven-to-extend-human-lifespan-through-autophagy",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Fasting can engage nutrient-sensing and cellular-recycling pathways, and some regimens improve weight or cardiometabolic markers, but no human trial has shown that intermittent fasting extends lifespan through autophagy. Most human trials are short and measure intermediate outcomes. Animal longevity results vary by species, sex, genetics, diet, timing, and whether fasting also reduces calories.",
		stableCore: [
			"Autophagy is a normal regulated process, not a binary cleansing switch that activates at one universal fasting hour.",
			"Mechanistic biomarkers and improved risk factors are not direct evidence of longer human life.",
			"Intermittent fasting often performs similarly to continuous energy restriction for many weight and metabolic outcomes."
		],
		openQuestions: [
			"Which regimens, timing, populations, and calorie-matched comparisons improve healthspan without nutritional or behavioral harm?",
			"Can validated human autophagy measures connect pathway changes to clinical aging outcomes over years?"
		],
		whatWouldChangeMinds: [
			"Long-term randomized or exceptionally strong quasi-experimental evidence showing lower mortality and longer healthy life independent of calorie intake and confounding.",
			"Validated mediation evidence showing autophagy is the causal pathway for those human outcomes."
		],
		misconceptions: [
			"A pathway seen in cells or mice does not prove a lifespan effect in humans.",
			"A fasting window does not guarantee the same metabolic state in every person.",
			"Potential benefit does not make fasting appropriate for pregnancy, eating disorders, frailty, or glucose-lowering medication without clinical guidance."
		],
		editorSummary:
			"Fasting biology is interesting and some practical outcomes are promising, but the leap from pathway activation to proven human longevity is much larger than popular claims suggest.",
		uncertaintySummary:
			"Short-term metabolic evidence is substantial; human lifespan, long-term safety, calorie-independent effects, and autophagy mediation remain unproven.",
		sources: [
			[
				"systematic_review",
				"Intermittent fasting and longevity: From animal models to implication for humans",
				"Ageing Research Reviews",
				2024,
				"10.1016/j.arr.2024.102274",
				"Review traces mechanistic and animal evidence while emphasizing that human longevity implications remain indirect."
			],
			[
				"meta_analysis",
				"Intermittent fasting strategies and their effects on body weight and other cardiometabolic risk factors",
				"The BMJ",
				2025,
				"10.1136/bmj-2024-082007",
				"Network meta-analysis of randomized trials evaluates weight and intermediate cardiometabolic outcomes, not human lifespan, and finds broadly similar effects to continuous restriction."
			],
			[
				"systematic_review",
				"Intermittent fasting for the prevention of cardiovascular disease",
				"Cochrane Database of Systematic Reviews",
				2021,
				"10.1002/14651858.CD013496.pub2",
				"Cochrane found no mortality trials and insufficient good-certainty evidence that intermittent fasting prevents cardiovascular disease; measured weight effects were similar to continuous energy restriction."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Are carnivore diets proven safe and nutritionally adequate over the long term?",
		slug: "are-carnivore-diets-proven-safe-and-nutritionally-adequate-over-the-long-term",
		consensusBand: "unclear",
		confidenceScore: 88,
		evidenceCertainty: "very_low",
		bottomLine:
			"No. Carnivore diets have not been proven safe or nutritionally adequate over years. Published evidence is dominated by self-selected surveys, case reports, and extrapolation rather than controlled long-term outcomes. Removing nearly all plant foods can sharply reduce fiber and create nutrient, lipid, gastrointestinal, and sustainability concerns, although individual intake varies with the animal foods and supplements used.",
		stableCore: [
			"There are no long-duration randomized trials establishing mortality, cardiovascular, cancer, kidney, bone, or micronutrient safety.",
			"Positive testimonials and short-term weight loss cannot detect uncommon or slowly developing harms.",
			"A diet can meet calories and protein while still falling short on fiber or selected micronutrients."
		],
		openQuestions: [
			"What are the multi-year clinical outcomes, adherence patterns, deficiencies, and adverse events across different carnivore implementations?",
			"Can any specific medically supervised use be justified against less restrictive comparators?"
		],
		whatWouldChangeMinds: [
			"Independent multi-year controlled studies showing nutritional adequacy and favorable patient-important outcomes with transparent adverse-event monitoring.",
			"Reliable population evidence showing no excess chronic-disease or deficiency risk after addressing selection and healthy-user biases."
		],
		misconceptions: [
			"The absence of a diagnosed deficiency in an online survey is not proof of long-term adequacy.",
			"Historical or traditional animal-heavy diets are not necessarily identical to a modern all-meat diet.",
			"Unproven safety does not mean every person will experience immediate harm."
		],
		editorSummary:
			"The evidence gap is the central finding. A highly restrictive diet needs long-term comparative safety data, and carnivore diets do not yet have it.",
		uncertaintySummary:
			"Certainty is very low because definitions vary and controlled long-term evidence is absent. The lack of evidence prevents confident claims of either universal harm or safety.",
		sources: [
			[
				"systematic_review",
				"Carnivore Diet: A Scoping Review of the Current Evidence, Potential Benefits and Risks",
				"Nutrients",
				2026,
				"10.3390/nu18020348",
				"Scoping review finds the evidence base extremely limited and identifies nutritional, lipid, gastrointestinal, and long-term safety concerns."
			],
			[
				"context",
				"Behavioral Characteristics and Self-Reported Health Status among 2029 Adults Consuming a Carnivore Diet",
				"Current Developments in Nutrition",
				2021,
				"10.1093/cdn/nzab133",
				"Self-selected social-media survey reported high satisfaction but cannot establish safety because outcomes were self-reported, follow-up was limited, and selection bias was substantial.",
				"debate"
			],
			[
				"consensus_statement",
				"Dietary Reference Intakes for Energy, Carbohydrate, Fiber, Fat, Fatty Acids, Cholesterol, Protein, and Amino Acids",
				"National Academies of Sciences, Engineering, and Medicine",
				2005,
				"10.17226/10490",
				"Independent reference framework defines fiber, essential fatty-acid, protein, and energy requirements used to assess restrictive diets."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Is coconut oil a heart-healthy replacement for unsaturated vegetable oils?",
		slug: "is-coconut-oil-a-heart-healthy-replacement-for-unsaturated-vegetable-oils",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. Coconut oil is rich in saturated fat and raises LDL cholesterol compared with non-tropical oils rich in unsaturated fat. It may also raise HDL, but HDL changes do not cancel the causal role of LDL in atherosclerotic risk, and no strong outcome evidence shows coconut oil prevents heart attacks or strokes. Replacing saturated fat with polyunsaturated fat has the better-supported cardiovascular profile.",
		stableCore: [
			"The relevant comparison is what replaces what, not whether one isolated food has both favorable and unfavorable biomarkers.",
			"Coconut oil generally raises LDL more than oils such as canola, soybean, sunflower, or olive oil.",
			"A traditional dietary pattern containing coconut is not equivalent to adding refined coconut oil to a different modern diet."
		],
		openQuestions: [
			"Do different coconut foods, processing methods, and background diets meaningfully alter long-term clinical outcomes?",
			"What small culinary role can coconut oil occupy without displacing more favorable unsaturated fats?"
		],
		whatWouldChangeMinds: [
			"Large long-term randomized evidence showing coconut oil lowers cardiovascular events versus unsaturated vegetable oils despite its LDL effect.",
			"Mechanistic and genetic evidence overturning the causal contribution of LDL-containing particles to atherosclerosis."
		],
		misconceptions: [
			"Raising HDL does not automatically make a food protective.",
			"Plant-derived does not mean low in saturated fat.",
			"Evidence about whole dietary cultures cannot isolate coconut oil as the cause of their health outcomes."
		],
		editorSummary:
			"Coconut oil can be a flavor choice, but it is not the evidence-based heart-health substitute for oils dominated by unsaturated fats.",
		uncertaintySummary:
			"The LDL comparison is consistent across trials. Direct long-term event trials are sparse, so guidance also relies on the established evidence connecting LDL and fat substitution to cardiovascular risk.",
		sources: [
			coconutOilMetaAnalysis,
			[
				"systematic_review",
				"Coconut oil consumption and cardiovascular risk factors in humans",
				"Nutrition Reviews",
				2016,
				"10.1093/nutrit/nuw002",
				"Review finds claims of cardiovascular benefit rest largely on weak or indirect evidence and do not establish coconut oil as preferable to unsaturated oils."
			],
			[
				"consensus_statement",
				"Dietary Fats and Cardiovascular Disease: A Presidential Advisory From the American Heart Association",
				"Circulation",
				2017,
				"10.1161/CIR.0000000000000510",
				"Evidence advisory concludes that replacing saturated fat with polyunsaturated fat lowers cardiovascular risk and advises against coconut oil as a heart-health strategy."
			]
		]
	})
];
