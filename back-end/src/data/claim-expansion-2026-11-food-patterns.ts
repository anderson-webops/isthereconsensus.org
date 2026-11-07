import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberFoodPatternsResearchCheckedAt = "2026-11-07T15:13:31.158Z";

const sources = {
	timingDistribution: researchSource("Distribution of energy intake across the day and weight loss: A systematic review and meta‐analysis", "Obesity Reviews", 2023, "https://doi.org/10.1111/obr.13537", "10.1111/obr.13537", "2023 synthesis of nine randomized trials found a small short-term weight advantage for earlier calorie distribution during energy-reduced diets. The interventions do not cleanly establish a lasting effect of clock time independent of food intake, adherence and other changes. Longer studies are needed to assess persistence and practical importance.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	timingBroad: researchSource("Meal Timing and Anthropometric and Metabolic Outcomes", "JAMA Network Open", 2024, "https://doi.org/10.1001/jamanetworkopen.2024.42163", "10.1001/jamanetworkopen.2024.42163", "2024 synthesis included 69 reports from 29 trials, not 69 independent trials. Only four trials concerned calorie distribution; the others tested meal frequency or time-restricted eating. Effects were small, clinical importance uncertain, and most trials had high risk of bias. Its overall trial count should not be attributed to earlier eating alone.", "meta_analysis", "context", novemberFoodPatternsResearchCheckedAt),
	timingGlucose: researchSource("Effects of timing of meal intake on glucose metabolism: a systematic review and meta-analysis of human intervention studies", "Nutrition, Metabolism and Cardiovascular Diseases", 2026, "https://doi.org/10.1016/j.numecd.2026.104878", "10.1016/j.numecd.2026.104878", "2026 synthesis included 44 meal-timing studies: 37 lasted no more than one week and seven lasted two to twelve weeks. Earlier meals reduced some immediate glucose responses, while longer-study fasting glucose estimates were imprecise and crossed the null. The complete official PubMed abstract was checked. These are metabolic measurements, not evidence of durable weight loss or fewer complications.", "meta_analysis", "context", novemberFoodPatternsResearchCheckedAt),
	timingMechanism: researchSource("Early Time‐Restricted Feeding Reduces Appetite and Increases Fat Oxidation But Does Not Affect Energy Expenditure in Humans", "Obesity", 2019, "https://doi.org/10.1002/oby.22518", "10.1002/oby.22518", "2019 crossover experiment in eleven adults matched food intake and meal frequency over four-day periods. Earlier restricted eating did not increase 24-hour energy expenditure. Appetite and fuel-use measurements changed, but the trial also changed eating-window duration and did not establish long-term fat loss. The abstract's proposed weight-loss mechanism is an interpretation, not a measured long-term outcome.", "landmark_study", "debate", novemberFoodPatternsResearchCheckedAt),
	frequencyNetwork: researchSource("Impact of Meal Frequency on Anthropometric Outcomes: A Systematic Review and Network Meta-Analysis of Randomized Controlled Trials", "Advances in Nutrition", 2020, "https://doi.org/10.1093/advances/nmaa056", "10.1093/advances/nmaa056", "2020 network synthesis of 22 isocaloric trials and 647 participants found some small weight differences favoring fewer meals, but concluded that robust evidence was limited. Trials could last only two weeks. Its ranking scores describe a statistical model, not the percentage of experts agreeing or proof of a universally best meal count.", "meta_analysis", "context", novemberFoodPatternsResearchCheckedAt),
	frequencyMeta: researchSource("The effects of eating frequency on changes in body composition and cardiometabolic health in adults: a systematic review with meta-analysis of randomized trials", "International Journal of Behavioral Nutrition and Physical Activity", 2023, "https://doi.org/10.1186/s12966-023-01532-z", "10.1186/s12966-023-01532-z", "2023 review covered 17 reports from sixteen trials; five trials lacked enough reporting for pooling and fifteen were at high risk of bias. The pooled weight comparison was imprecise and crossed the null. This does not establish exact equivalence, nor a dependable advantage for either high- or low-frequency eating.", "meta_analysis", "debate", novemberFoodPatternsResearchCheckedAt),
	frequencyTrial: researchSource("Hypocaloric diet with lower meal frequency did not affect weight loss, body composition and insulin responsiveness, but improved lipid profile: a randomized clinical trial", "Food & Function", 2021, "https://doi.org/10.1039/d1fo00484k", "10.1039/d1fo00484k", "2021 randomized study compared three and six meals during energy-restricted diets in forty women over ninety days. Weight, body composition and energy-expenditure changes did not clearly differ between groups, although triglycerides favored three meals. A within-group rise in resting metabolism is not evidence of a between-group metabolic advantage.", "landmark_study", "context", novemberFoodPatternsResearchCheckedAt),
	speedMeta: researchSource("A systematic review and meta-analysis examining the effect of eating rate on energy intake and hunger", "The American Journal of Clinical Nutrition", 2014, "https://doi.org/10.3945/ajcn.113.081745", "10.3945/ajcn.113.081745", "2014 review of 22 experiments found lower concurrent food intake with slower eating, with substantial variation between studies. Hunger ratings did not clearly differ immediately or over the following few hours. Most evidence concerns a meal or short experiment, not sustained weight loss from everyday advice.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	speedBehavior: researchSource("Eating pace instruction is effective in slowing eating rate in women with overweight and obesity", "Eating Behaviors", 2023, "https://doi.org/10.1016/j.eatbeh.2023.101701", "10.1016/j.eatbeh.2023.101701", "2023 five-week behavioral study enrolled 65 young women with overweight or obesity; the reported pooled comparison contained 25 participants per group. Slowing and longer meals improved, while the change in measured meal intake was not statistically clear. The complete official abstract was checked. Assignment is not described here as randomized, and within-group questionnaire improvements do not prove a between-group intake benefit.", "landmark_study", "debate", novemberFoodPatternsResearchCheckedAt),
	speedTexture: researchSource("Eating rate has sustained effects on energy intake from ultraprocessed diets: a 2-week ad libitum dietary randomized controlled crossover trial", "The American Journal of Clinical Nutrition", 2026, "https://doi.org/10.1016/j.ajcnut.2025.11.012", "10.1016/j.ajcnut.2025.11.012", "2026 journal trial, published online in 2025, included 41 completers in two fourteen-day crossover diet periods. Food textures designed to slow eating reduced daily intake relative to faster-eaten ultraprocessed diets, with several served-food characteristics matched. Body weight did not differ between diets. Texture changes are not identical to instructions to eat slowly; repeated measurements are not additional participants.", "landmark_study", "supports", novemberFoodPatternsResearchCheckedAt),
	proteinMeta: researchSource("Animal Protein versus Plant Protein in Supporting Lean Mass and Muscle Strength: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Nutrients", 2021, "https://doi.org/10.3390/nu13020661", "10.3390/nu13020661", "2021 synthesis included eighteen articles, sixteen in pooled analyses. Overall absolute lean mass and strength did not clearly differ by protein source, while some percent-lean-mass and younger-adult comparisons favored animal protein. Total intake was generally above recommended allowances. Reviews may overlap, and a subgroup result does not settle every plant-protein comparison.", "meta_analysis", "context", novemberFoodPatternsResearchCheckedAt),
	proteinRecent: researchSource("Effect of Plant Versus Animal Protein on Muscle Mass, Strength, Physical Performance, and Sarcopenia: A Systematic Review and Meta-analysis of Randomized Controlled Trials", "Nutrition Reviews", 2025, "https://doi.org/10.1093/nutrit/nuae200", "10.1093/nutrit/nuae200", "2025 review identified 43 randomized trials, thirty contributing to muscle-mass pooling. Animal protein had a small average mass advantage, particularly against some non-soy sources, while soy-versus-milk mass and overall strength or physical-performance comparisons were not clearly different. Not all studies were resistance-training trials, and no trial tested sarcopenia as an outcome.", "meta_analysis", "debate", novemberFoodPatternsResearchCheckedAt),
	proteinSoy: researchSource("No Difference Between the Effects of Supplementing With Soy Protein Versus Animal Protein on Gains in Muscle Mass and Strength in Response to Resistance Exercise", "International Journal of Sport Nutrition and Exercise Metabolism", 2018, "https://doi.org/10.1123/ijsnem.2018-0071", "10.1123/ijsnem.2018-0071", "2018 synthesis of nine studies and 266 participants found similar strength and lean-mass gains with soy and animal protein alongside resistance exercise. This concerns a particular plant protein and tested training settings. Short-term muscle-protein-synthesis responses are not the same outcome as measured gains over weeks, and nonsignificance does not prove exact equivalence.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	proteinTrial: researchSource("No Significant Differences in Muscle Growth and Strength Development When Consuming Soy and Whey Protein Supplements Matched for Leucine Following a 12 Week Resistance Training Program in Men and Women: A Randomized Trial", "International Journal of Environmental Research and Public Health", 2020, "https://doi.org/10.3390/ijerph17113871", "10.3390/ijerph17113871", "2020 twelve-week randomized training trial enrolled 61 untrained young adults, with 48 completing. Soy and whey groups had similar measured muscle and strength gains. Supplements were matched for leucine, not for grams of protein; the soy group received more protein. The result does not establish identical outcomes for all plant foods, older adults or trained athletes.", "landmark_study", "supports", novemberFoodPatternsResearchCheckedAt),
	ibsOutcome: researchSource("Strain-specific and outcome-specific efficacy of probiotics for the treatment of irritable bowel syndrome: A systematic review and meta-analysis", "eClinicalMedicine", 2021, "https://doi.org/10.1016/j.eclinm.2021.101154", "10.1016/j.eclinm.2021.101154", "2021 strain- and outcome-specific review included 42 trials and 3,856 participants, including adult and pediatric populations. Some products improved particular symptoms, while outcomes and confirmatory evidence varied. The complete official abstract was checked. A benefit for one symptom or product does not establish a general probiotic class effect, and this review can overlap later syntheses.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	ibsStrain: researchSource("Strain-Specific Systematic Review with Meta-Analysis of Probiotics Efficacy in the Treatment of Irritable Bowel Syndrome", "Journal of Clinical Medicine", 2026, "https://doi.org/10.3390/jcm15031152", "10.3390/jcm15031152", "2026 review pooled 32 articles concerning ten single-strain probiotics, with different findings by product and outcome. Some strains had favorable symptom results, others did not, and one had conflicting findings. Results that could not be pooled were excluded. This cannot establish that an arbitrary retail product works or that all IBS subtypes respond similarly.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	ibsAcg: researchSource("ACG Clinical Guideline: Management of Irritable Bowel Syndrome", "American Journal of Gastroenterology", 2021, "https://doi.org/10.14309/ajg.0000000000001036", "10.14309/ajg.0000000000001036", "The 2021 American College of Gastroenterology guideline conditionally suggests against probiotics for global IBS symptoms because the evidence was very low quality. This is a dated North American recommendation, not evidence that every product is ineffective or a summary of all later studies.", "guideline", "debate", novemberFoodPatternsResearchCheckedAt),
	ibsBsg: researchSource("British Society of Gastroenterology guidelines on the management of irritable bowel syndrome", "Gut", 2021, "https://doi.org/10.1136/gutjnl-2021-324598", "10.1136/gutjnl-2021-324598", "The 2021 British Society of Gastroenterology guideline takes a more permissive approach to a monitored trial, with a weak recommendation and very-low-quality evidence, without endorsing a specific strain. This differs from the American guideline's threshold for routine use; neither establishes reliable benefit from every product.", "guideline", "context", novemberFoodPatternsResearchCheckedAt),
	nccihProbiotics: researchSource("Probiotics: Usefulness and Safety", "National Center for Complementary and Integrative Health", undefined, "https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety", "", "Official safety overview notes that probiotic effects differ between products and that harm risk is greater in people with severe illness or compromised immune systems. Product contamination and infections are material limitations. This is safety context rather than an IBS efficacy trial or an assurance that retail products are interchangeable.", "technical_reference", "context", novemberFoodPatternsResearchCheckedAt),
	orderSystematic: researchSource("Ordered Eating and Its Effects on Various Postprandial Health Markers: A Systematic Review", "Journal of the American Nutrition Association", 2023, "https://doi.org/10.1080/27697061.2022.2161664", "10.1080/27697061.2022.2161664", "2023 journal review of eleven reports compared different food orders in equal-calorie meals made from the same foods. Carbohydrate-last ordering tended to reduce immediate glucose and insulin excursions. This acute comparison is not a trial of long-term diabetes complications. Its 2022 online-first date differs from the journal year, and hormone or hunger outcomes were less consistent.", "systematic_review", "supports", novemberFoodPatternsResearchCheckedAt),
	orderHealthy: researchSource("Effects of meal sequence intervention on blood glucose response in healthy adults: a systematic review", "Clinical Nutrition Research", 2026, "https://doi.org/10.7762/cnr.2025.0027", "10.7762/cnr.2025.0027", "2026 review included six small studies and 107 healthy young participants. Most found smaller immediate glucose responses when vegetable, fruit or protein foods preceded carbohydrate-rich foods. One study was repeated-measures rather than randomized. The findings do not establish prevention of diabetes, long-term HbA1c benefits or effects in every age group.", "systematic_review", "supports", novemberFoodPatternsResearchCheckedAt),
	orderDiabetes: researchSource("The Impact of Macronutrient Ordering on Postprandial Glycaemic Control in Diabetes: A Systematic Review", "Endocrinology, Diabetes & Metabolism", 2026, "https://doi.org/10.1002/edm2.70228", "10.1002/edm2.70228", "2026 review of six studies and 144 participants with diabetes found mostly favorable immediate glucose responses to carbohydrate-last meals. Designs differed and the review judged the evidence low certainty. Its narrative synthesis is not an independent large trial; underlying studies may overlap earlier reviews.", "systematic_review", "supports", novemberFoodPatternsResearchCheckedAt),
	lowGIBmj: {
		...researchSource("Effect of low glycaemic index or load dietary patterns on glycaemic control and cardiometabolic risk factors in diabetes: systematic review and meta-analysis of randomised controlled trials", "BMJ", 2021, "https://doi.org/10.1136/bmj.n1651", "10.1136/bmj.n1651", "2021 review included 27 trials and 29 comparisons overall; its HbA1c estimate came from 22 comparisons and 1,502 participants. The average reduction was about 0.31 percentage points, mainly alongside usual treatment, with substantial heterogeneity. The correction concerns blood-pressure dose-response wording and a GRADE figure label. The HbA1c difference is an absolute percentage-point change, not a 31% reduction or a measured decrease in complications.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1136/bmj.n1651",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fbmj.n1651&rows=100",
			"https://doi.org/10.1136/bmj.n2114"
		]
	},
	lowGIMeta: researchSource("Low-glycemic index diets as an intervention for diabetes: a systematic review and meta-analysis", "The American Journal of Clinical Nutrition", 2019, "https://doi.org/10.1093/ajcn/nqz149", "10.1093/ajcn/nqz149", "2019 review included 54 randomized trials across adults and children with impaired glucose tolerance or diabetes. Some glucose and lipid measures improved, while insulin requirements and several other measures did not clearly change. Its populations are broader than adult type 2 diabetes and overlap with later reviews; it is not 54 additional independent confirmations.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	diabetesGuideline: researchSource("Evidence-based European recommendations for the dietary management of diabetes", "Diabetologia", 2023, "https://doi.org/10.1007/s00125-023-05894-8", "10.1007/s00125-023-05894-8", "2023 European diabetes nutrition recommendations support several suitable food patterns and place dietary advice within broader diabetes care. Their general emphasis includes minimally processed plant foods and food quality. They provide clinical context rather than proof that a low GI number makes every food healthy or replaces medication. This is European guidance, not a universal legal or treatment rule.", "guideline", "context", novemberFoodPatternsResearchCheckedAt),
	oatBeta: researchSource("Effects of Oat Beta-Glucan Intake on Lipid Profiles in Hypercholesterolemic Adults: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Nutrients", 2022, "https://doi.org/10.3390/nu14102043", "10.3390/nu14102043", "2022 synthesis of thirteen trials and 927 participants with high cholesterol found lower LDL and total cholesterol with oat beta-glucan; HDL and triglycerides did not clearly improve. Study duration, food form and participant characteristics varied. Lipid changes are not direct measurements of heart attacks prevented.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	oatWhole: researchSource("The separate effects of whole oats and isolated beta-glucan on lipid profile: A systematic review and meta-analysis of randomized controlled trials", "Clinical Nutrition ESPEN", 2023, "https://doi.org/10.1016/j.clnesp.2022.12.019", "10.1016/j.clnesp.2022.12.019", "2023 synthesis of 28 trials and 1,494 adults found favorable LDL and total-cholesterol effects from oats and isolated beta-glucan, with differences by design and intervention. Standardized effects are not cholesterol concentrations; the review's prevention interpretation exceeds the lipid outcomes directly measured.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	oatTrial: researchSource("A Randomized Placebo-Controlled Clinical Trial to Evaluate the Medium-Term Effects of Oat Fibers on Human Health: The Beta-Glucan Effects on Lipid Profile, Glycemia and inTestinal Health (BELT) Study", "Nutrients", 2020, "https://doi.org/10.3390/nu12030686", "10.3390/nu12030686", "2020 BELT crossover trial in 83 Italian adults with moderately high cholesterol found lower LDL with an oat-fiber intervention over eight weeks. Participants already followed a Mediterranean diet and had low cardiovascular risk. Fasting glucose and self-rated gut well-being did not improve. This product-specific short trial can overlap syntheses and does not establish a universal serving effect.", "landmark_study", "supports", novemberFoodPatternsResearchCheckedAt),
	nutsWeight: researchSource("Are fatty nuts a weighty concern? A systematic review and meta‐analysis and dose–response meta‐regression of prospective cohorts and randomized controlled trials", "Obesity Reviews", 2021, "https://doi.org/10.1111/obr.13330", "10.1111/obr.13330", "2021 review included six prospective cohort studies and 86 randomized trials. Trial estimates did not show a clear average weight increase with nuts, with intervals compatible with small gains or losses. The cohort association with less future obesity is observational. Its meta-regression and pooled trial comparisons answer different questions.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	nutsSubstitution: researchSource("Intake of Nuts or Nut Products Does Not Lead to Weight Gain, Independent of Dietary Substitution Instructions: A Systematic Review and Meta-Analysis of Randomized Trials", "Advances in Nutrition", 2021, "https://doi.org/10.1093/advances/nmaa113", "10.1093/advances/nmaa113", "2021 synthesis of 55 nut-feeding studies found no clear average body-weight increase with or without explicit food-substitution instructions. Results concern the tested interventions and do not establish that unlimited additions are weight-neutral. Heterogeneous methods and unreported outcomes remain limitations, and reviews can include overlapping studies.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	nutsHunger: researchSource("Effect of nuts on energy intake, hunger, and fullness, a systematic review and meta-analysis of randomized clinical trials", "Critical Reviews in Food Science and Nutrition", 2020, "https://doi.org/10.1080/10408398.2018.1514486", "10.1080/10408398.2018.1514486", "2020 journal review, first online in 2018, included 31 trials. Reported energy intake rose overall while hunger fell; fullness and weight did not clearly change. Intake relied mainly on short food records. These findings qualify a simple appetite explanation and do not establish either inevitable weight gain or guaranteed weight loss.", "meta_analysis", "context", novemberFoodPatternsResearchCheckedAt),
	psylliumSafety: researchSource("Psyllium", "MedlinePlus / National Library of Medicine", undefined, "https://medlineplus.gov/druginfo/meds/a601104.html", "", "Patient medication reference describes psyllium as a bulk-forming laxative and identifies precautions involving swallowing difficulty, intestinal blockage, allergies and other medicines. This provides product-specific safety context rather than comparative efficacy evidence or instructions for a self-directed regimen.", "technical_reference", "context", novemberFoodPatternsResearchCheckedAt),
	fiberUpdated: researchSource("The Effect of Fiber Supplementation on Chronic Constipation in Adults: An Updated Systematic Review and Meta-Analysis of Randomized Controlled Trials", "The American Journal of Clinical Nutrition", 2022, "https://doi.org/10.1093/ajcn/nqac184", "10.1093/ajcn/nqac184", "2022 review included sixteen trials and 1,251 adults with chronic constipation. Fiber improved response, stool frequency and consistency on average, with particularly supportive findings for psyllium, but results varied substantially. Flatulence increased. Subgroup findings are not proof of a universally optimal regimen, and whole-food advice is a different intervention from a tested supplement.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	fiberEarlier: researchSource("Systematic review with meta‐analysis: effect of fibre supplementation on chronic idiopathic constipation in adults", "Alimentary Pharmacology & Therapeutics", 2016, "https://doi.org/10.1111/apt.13662", "10.1111/apt.13662", "2016 synthesis of seven randomized trials found moderate constipation symptom benefits and more flatulence, with low-quality evidence and bias concerns. These studies can be included in the later review. Response proportions are specific to the contributing comparisons, not a personal chance of success or a measure of expert agreement.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	fiberGuidelines: researchSource("British Dietetic Association Guidelines for the Dietary Management of Chronic Constipation in Adults", "Journal of Human Nutrition and Dietetics", 2025, "https://doi.org/10.1111/jhn.70133", "10.1111/jhn.70133", "2025 British Dietetic Association guidance drew on four reviews covering 75 trials across many dietary interventions, not 75 fiber-only trials. Most of its 59 statements had low or very-low-certainty evidence, with eight rated moderate. It separates supplement, food and drink evidence and gives no whole-diet recommendation where evidence is lacking. This does not make every type of fiber interchangeable.", "guideline", "context", novemberFoodPatternsResearchCheckedAt),
	portionDownsize: researchSource("Downsizing food: a systematic review and meta-analysis examining the effect of reducing served food portion sizes on daily energy intake and body weight", "British Journal of Nutrition", 2023, "https://doi.org/10.1017/s0007114522000903", "10.1017/s0007114522000903", "2023 review included fourteen experimental studies in its daily-intake analysis. Smaller served portions reduced intake on average. Only four studies supplied body-weight outcomes, limiting conclusions about lasting weight change. Multiple effects within studies are not additional independent studies.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	portionMeta: researchSource("Systematic Review and Meta-Analysis on the Effect of Portion Size and Ingestive Frequency on Energy Intake and Body Weight among Adults in Randomized Controlled Feeding Trials", "Advances in Nutrition", 2022, "https://doi.org/10.1093/advances/nmab112", "10.1093/advances/nmab112", "2022 synthesis examined portion size and eating frequency separately, including fourteen portion-size studies. Larger served portions increased daily intake, but too few studies supported conclusions about chronic body weight. Adults outside the studied age range and people with chronic disease were excluded, and reviews can overlap.", "meta_analysis", "supports", novemberFoodPatternsResearchCheckedAt),
	portionTools: researchSource("Impact of Portion Control Tools on Portion Size Awareness, Choice and Intake: Systematic Review and Meta-Analysis", "Nutrients", 2021, "https://doi.org/10.3390/nu13061978", "10.3390/nu13061978", "2021 review distinguished actual food portions from portion-control tools. Some bowls, utensils and calibrated tableware reduced intake, while smaller plates alone had little clear effect. Combining those interventions into a claim that any small plate causes weight loss would misrepresent the evidence. Weight outcomes were limited and effects varied by tool.", "meta_analysis", "context", novemberFoodPatternsResearchCheckedAt),
	calorieCochrane: researchSource("Calorie (energy) labelling for changing selection and consumption of food or alcohol", "Cochrane Database of Systematic Reviews", 2025, "https://doi.org/10.1002/14651858.cd014845.pub2", "10.1002/14651858.cd014845.pub2", "2025 Cochrane review included 25 studies, mostly in high-income countries and often higher-income populations. Sixteen randomized studies supported a small reduction in energy selected; actual consumption had fewer studies and lower certainty. Much selection involved purchases, but selection and eating remain distinct. Main searches reached 2021; a 2023 update was not fully integrated, so the publication year is not a complete 2025 search cutoff.", "systematic_review", "supports", novemberFoodPatternsResearchCheckedAt),
	calorieUS: researchSource("Providing Nutrition Information on US Restaurant Menus: A Systematic Review Since the Affordable Care Act (2010)", "Journal of Consumer Policy", 2025, "https://doi.org/10.1007/s10603-024-09578-7", "10.1007/s10603-024-09578-7", "2024 review selected 24 higher-quality papers about US menu nutrition information after the 2010 Affordable Care Act. Outcomes included choices, perceptions and sales, rather than one pooled weight-loss measure. Its US restaurant-policy scope does not describe every country's labeling rules or settle long-term effects on obesity.", "systematic_review", "context", novemberFoodPatternsResearchCheckedAt),
	calorieHarms: researchSource("The Impact of Restaurant Menu Calorie Information on People with Eating Disorders: A Scoping Review", "Dietetics", 2025, "https://doi.org/10.3390/dietetics4010004", "10.3390/dietetics4010004", "2025 scoping review of ten papers identifies concerns and reported distress among people with eating disorders. Its qualitative and heterogeneous evidence is important for harms but does not establish that labeling caused population eating-disorder trends. Its broad claim of little calorie benefit should be read alongside the larger Cochrane synthesis, which found a small average selection effect.", "technical_reference", "debate", novemberFoodPatternsResearchCheckedAt)
};

export const novemberFoodPatternsClaims = [
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "does-eating-earlier-in-the-day-help-with-weight-control",
		title: "Does eating earlier in the day help with weight control?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Possibly a little. Earlier meals may help some people eat less or lose a little more weight, but lasting benefits from timing alone are uncertain.",
		editorSummary: "Studies often change both meal timing and other parts of eating. Small short-term benefits do not establish a best clock schedule for everyone.",
		stableCore: [
			"Trials that move more food earlier in the day sometimes find small weight benefits, especially alongside an energy-reduced diet.",
			"Meal timing, the length of the eating window and the amount eaten are different changes. Many studies alter more than one at once.",
			"A small controlled experiment found no increase in total daily energy use. A 2026 review also found that clearer glucose benefits came mainly from experiments lasting a week or less."
		],
		openQuestions: [
			"Whether an earlier schedule adds a lasting benefit when total intake and support are matched.",
			"How shift work, sleep, medication and personal schedules affect feasibility and outcomes."
		],
		whatWouldChangeMinds: [
			"Large, longer trials that separate clock time from eating-window length and actual food intake, while tracking adherence and clinical outcomes."
		],
		misconceptions: [
			"Earlier eating has not been shown to work mainly by making everyone burn more calories.",
			"An immediate glucose change does not establish lasting weight loss or prevention of diabetes."
		],
		population: "Mainly adults in weight-management or short meal-timing experiments; shift workers and people with complex medical needs are less well represented.",
		scope: "Human trials of earlier calorie distribution and related meal timing, separating measured weight change from appetite and glucose mechanisms.",
		excludedEvidence: [
			"Do not count a shorter eating window as an isolated clock-time change, or a few days of fuel-use measurements as long-term fat loss."
		],
		uncertainty: "Most studies are short, many have bias concerns, and changing meal timing can also change food intake. Timing changes may need to fit diabetes treatment and other medical care.",
		sources: [
			sources.timingDistribution,
			sources.timingBroad,
			sources.timingGlucose,
			sources.timingMechanism
		]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "does-meal-frequency-affect-weight-loss",
		title: "Does meal frequency affect weight loss?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Evidence does not identify a best meal count. Eating more often has not shown a dependable weight-loss advantage when overall food intake is similar.",
		editorSummary: "Some studies favor fewer meals, while others find little difference. Total intake, study quality and how well people follow the plan matter.",
		stableCore: [
			"Reviews comparing more and fewer daily meals reach different estimates, with many small or high-bias trials.",
			"Planned equal-calorie comparisons provide limited support for small benefits from fewer meals, rather than a clear advantage from frequent snacking.",
			"In one ninety-day trial, three and six meals produced similar weight and energy-expenditure results. Changes within one group did not establish a metabolic difference between groups."
		],
		openQuestions: [
			"Whether any meal-frequency effect lasts when calories, food quality and follow-up support are closely matched.",
			"Which schedules people can sustain without unwanted hunger, symptoms or disruption to treatment."
		],
		whatWouldChangeMinds: [
			"Longer, well-powered trials that measure actual intake, energy expenditure and adherence rather than relying only on planned menus."
		],
		misconceptions: [
			"A statistical ranking of meal counts is not proof of an optimal number or a percentage of experts agreeing.",
			"A comparison that finds no clear difference does not prove all meal patterns are exactly equivalent."
		],
		population: "Mostly young and middle-aged adults in weight or metabolic studies, with limited evidence for other clinical groups.",
		scope: "Human meal-frequency comparisons, prioritizing weight and energy expenditure when total food intake is intended to be comparable.",
		excludedEvidence: [
			"Keep meal frequency distinct from breakfast omission, overnight fasting duration and unplanned changes in total calories."
		],
		uncertainty: "Trials often differ in calorie control and have high risk of bias. Effects on one blood marker need not match effects on weight.",
		sources: [sources.frequencyNetwork, sources.frequencyMeta, sources.frequencyTrial]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "does-eating-more-slowly-reduce-how-much-people-eat",
		title: "Does eating more slowly reduce how much people eat?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Often in short experiments. Slower eating can reduce intake during a meal, but advice to slow down has not yet shown dependable long-term weight loss.",
		editorSummary: "Food texture and eating pace can change meal intake. Those experiments answer a different question from whether a simple instruction works over months.",
		stableCore: [
			"A review of twenty-two experiments found lower food intake when eating was slower, although results varied between studies.",
			"A recent two-week diet experiment found lower intake with food textures designed to slow eating, without a clear between-diet body-weight difference.",
			"A five-week behavioral study successfully slowed meals but did not find a statistically clear reduction in measured meal intake. Less food eaten and less hunger are also separate outcomes."
		],
		openQuestions: [
			"Whether a practical slow-eating habit changes everyday intake over many months.",
			"How food texture, distractions and differences between people affect the result."
		],
		whatWouldChangeMinds: [
			"Longer trials that compare a sustainable behavior change with an active control and measure intake, weight and possible adverse effects."
		],
		misconceptions: [
			"A laboratory meal effect is not a guaranteed weight-loss result.",
			"Serving harder-to-eat food is not the same intervention as telling someone to eat slowly."
		],
		population: "Mostly adults in controlled meals or short interventions; one behavioral study focused on young women.",
		scope: "Experimental changes in eating rate, separating immediate and daily intake from appetite ratings and lasting body-weight effects.",
		excludedEvidence: [
			"Do not treat observational links between fast eating and body size as randomized evidence, or repeated meal measurements as additional people."
		],
		uncertainty: "Studies use different methods to slow eating, and durable weight outcomes remain poorly established. This is evidence about average responses, not an eating-disorder treatment plan.",
		sources: [sources.speedMeta, sources.speedTexture, sources.speedBehavior]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "sports-nutrition-and-supplements",
		slug: "can-plant-protein-support-muscle-gains-as-well-as-animal-protein",
		title: "Can plant protein support muscle gains as well as animal protein?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Often, particularly with soy and enough total protein. Some comparisons favor animal protein for muscle mass, while strength gains are frequently similar.",
		editorSummary: "Protein source, total intake and the comparison being made all matter. Similar soy and whey results do not establish identical results for every plant food.",
		stableCore: [
			"Training studies show that soy can support increases in strength and lean mass comparable to those seen with animal-protein supplements in the tested settings.",
			"A broader 2025 review found a small average muscle-mass advantage for animal protein, especially against some non-soy plant sources. It found no clear overall strength difference.",
			"One training trial matched soy and whey for leucine rather than grams of protein. Immediate muscle-protein-synthesis measurements and gains measured over weeks are different outcomes."
		],
		openQuestions: [
			"How a wider range of plant foods and blends compare when total protein, energy and training are matched.",
			"Whether results differ for older adults, trained athletes and people at risk of muscle loss."
		],
		whatWouldChangeMinds: [
			"Larger training trials with matched diets, clearly reported amino-acid differences and longer follow-up across several plant-protein sources."
		],
		misconceptions: [
			"Showing that a plant-based diet can supply enough protein does not prove every protein source has identical effects on training.",
			"No statistically clear difference is weaker evidence than a trial designed to establish equivalence."
		],
		population: "Adults in protein-comparison trials, including many younger or previously untrained participants; not every study included resistance training.",
		scope: "Plant-versus-animal protein comparisons for muscle mass and strength, with particular attention to resistance training and soy-versus-whey trials.",
		excludedEvidence: [
			"Do not equate leucine-matched supplements with equal grams of protein, or acute synthesis measurements with long-term strength gains."
		],
		uncertainty: "Studies differ in protein source, intake and training. Soy has more direct comparative evidence than many other plant proteins, and prevention of sarcopenia was not established.",
		sources: [
			sources.proteinRecent,
			sources.proteinSoy,
			sources.proteinMeta,
			sources.proteinTrial
		]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "do-probiotics-improve-irritable-bowel-syndrome-symptoms",
		title: "Do probiotics improve irritable bowel syndrome symptoms?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Some products may help particular symptoms, but the evidence is inconsistent. A benefit from one probiotic does not establish that other products work.",
		editorSummary: "The product, symptom and patient group matter. Clinical guidelines have taken different approaches to the same uncertain evidence.",
		stableCore: [
			"Reviews find benefits for some products and outcomes, alongside negative or conflicting results. Overall symptom relief, pain and bloating are different measures.",
			"The 2021 American College of Gastroenterology guideline suggests against routine use for global IBS symptoms. The 2021 British guideline allows a more permissive monitored approach, with very-low-quality evidence.",
			"Safety findings in otherwise healthy trial participants do not establish safety for severely ill or immunocompromised people. Official guidance identifies higher harm risks in these groups."
		],
		openQuestions: [
			"Which defined products provide a reproducible, meaningful benefit for particular IBS symptoms.",
			"How long benefits last and whether findings generalize across ages, IBS subtypes and health conditions."
		],
		whatWouldChangeMinds: [
			"Independent, adequately powered product-specific trials using consistent patient-important outcomes, with longer follow-up and complete adverse-event reporting."
		],
		misconceptions: [
			"Probiotic products are not interchangeable simply because their labels use a similar organism name.",
			"Evidence for antibiotic-associated diarrhea does not establish efficacy for IBS, and symptom improvement does not confirm an IBS diagnosis."
		],
		population: "People with diagnosed IBS; cited reviews include different adult and pediatric populations, while guidance mainly concerns adults.",
		scope: "Product-specific randomized evidence for IBS symptoms and dated US and UK guideline positions, with official safety context.",
		excludedEvidence: [
			"Keep IBS distinct from inflammatory bowel disease, antibiotic-associated diarrhea and claims about treating an individual microbiome result. No product preparation or dosing protocol is inferred."
		],
		uncertainty: "Trials differ in products, symptoms and bias risk, and reviews overlap. Persistent or changing symptoms need clinical assessment; people with severe illness or impaired immunity need clinician guidance before using these products.",
		sources: [
			sources.ibsStrain,
			sources.ibsOutcome,
			sources.ibsAcg,
			sources.ibsBsg,
			sources.nccihProbiotics
		]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "does-eating-carbohydrates-last-lower-blood-sugar-after-a-meal",
		title: "Does eating carbohydrates last lower blood sugar after a meal?",
		band: "broad",
		certainty: "low",
		bottomLine: "Usually in small, short experiments. Eating carbohydrate-rich foods after vegetables or protein can reduce the immediate glucose rise; lasting health benefits remain uncertain.",
		editorSummary: "Meal order can change a short-term blood-sugar response without changing the foods served. That result does not establish lower diabetes risk or fewer complications.",
		stableCore: [
			"Studies using the same foods in different orders often find a smaller immediate glucose rise when carbohydrate-rich foods are eaten last.",
			"Recent reviews report favorable short-term findings in both healthy participants and people with diabetes, but include few participants and varied designs.",
			"Immediate glucose peaks, longer-term average glucose measured by HbA1c, and clinical complications are separate outcomes."
		],
		openQuestions: [
			"Whether meal-order changes meaningfully improve HbA1c or patient-important outcomes over months or years.",
			"How feasible the approach is with mixed dishes and different food cultures."
		],
		whatWouldChangeMinds: [
			"Longer, larger trials using matched foods and calories, with adherence, HbA1c, quality of life and adverse outcomes measured."
		],
		misconceptions: [
			"A smaller glucose peak does not show that carbohydrate itself must be eliminated.",
			"A short experiment does not establish a replacement for diabetes medication or individualized dietary care."
		],
		population: "Small groups of healthy adults and people with diabetes; evidence does not cover every medication regimen or clinical setting.",
		scope: "Human within-meal food-order comparisons, separating acute glucose responses from HbA1c and long-term disease outcomes.",
		excludedEvidence: [
			"Exclude comparisons that change the foods or calories as proof of an isolated ordering effect, and avoid interpreting hormone changes as proven prevention of complications."
		],
		uncertainty: "The direction of the immediate response is fairly consistent, but certainty is limited by small studies, varied designs and little long-term evidence. People using glucose-lowering treatment need changes to fit their clinical plan.",
		sources: [sources.orderSystematic, sources.orderHealthy, sources.orderDiabetes]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "do-low-glycemic-index-diets-improve-diabetes-control",
		title: "Do low-glycemic-index diets improve diabetes control?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, modestly on average. Lower-glycemic-index or lower-glycemic-load eating patterns can improve average blood sugar, measured by HbA1c, alongside usual diabetes care.",
		editorSummary: "The clearest evidence concerns blood-glucose control, particularly in adults with type 2 diabetes. Food quality and the wider care plan still matter.",
		stableCore: [
			"Within a 2021 review, twenty-two trial comparisons found an average HbA1c reduction of about 0.31 percentage points relative to higher-GI or higher-GL diets.",
			"Most participants in that analysis were adults with type 2 diabetes already receiving medication or insulin. Earlier reviews also found average glucose benefits, with differences across studies.",
			"GI describes the glucose response to a fixed carbohydrate amount, while glycemic load also reflects quantity. Neither measure captures every aspect of food quality."
		],
		openQuestions: [
			"How well people sustain the pattern and whether it changes long-term clinical complications.",
			"Which benefits remain when fiber, weight change and other aspects of diet are closely matched."
		],
		whatWouldChangeMinds: [
			"Long-term comparative trials that separate dietary components and report clinical events, medication changes, adherence and safety."
		],
		misconceptions: [
			"An HbA1c reduction of 0.31 percentage points is not a 31% reduction or a percentage of scientists agreeing.",
			"A low GI value does not automatically make a food nutritious or remove the need for diabetes treatment."
		],
		population: "Mainly adults with established type 2 diabetes; some pooled evidence also includes type 1 diabetes, impaired glucose tolerance or younger participants.",
		scope: "Randomized comparisons of lower-GI/GL eating patterns for glycemic control, with European clinical nutrition guidance as context.",
		excludedEvidence: [
			"Do not substitute low-carbohydrate diet studies for isolated GI/GL comparisons, or treat glucose-marker changes as direct measurements of complications prevented."
		],
		uncertainty: "Diet composition, achieved GI/GL differences and adherence vary. People using insulin or medicines that can cause low glucose need dietary changes coordinated with their care team.",
		sources: [sources.lowGIBmj, sources.lowGIMeta, sources.diabetesGuideline]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "do-oats-and-oat-beta-glucan-lower-ldl-cholesterol",
		title: "Do oats and oat beta-glucan lower LDL cholesterol?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, on average. Oats and their soluble fiber, beta-glucan, can produce a modest reduction in LDL cholesterol, although effects vary by food and study.",
		editorSummary: "Trials support a cholesterol benefit, especially in adults with higher starting levels. These studies do not directly show how many heart attacks are prevented.",
		stableCore: [
			"Reviews of randomized trials find lower LDL and total cholesterol after oat or oat beta-glucan interventions.",
			"Whole oats, extracted fiber and differently processed oat foods are not identical products. Their effects need not match serving for serving.",
			"An eight-week crossover trial in adults with moderately high cholesterol found lower LDL but no clear improvement in fasting glucose or self-rated gut well-being."
		],
		openQuestions: [
			"How processing, food form and long-term adherence affect the size and persistence of the LDL change.",
			"Whether the tested interventions improve clinical cardiovascular outcomes beyond their effect on lipids."
		],
		whatWouldChangeMinds: [
			"Longer comparative trials with well-characterized foods and patient-important outcomes, rather than lipid markers alone."
		],
		misconceptions: [
			"A favorable cholesterol result does not establish identical benefits for every oat snack or cereal.",
			"An LDL change is not itself a direct count of heart attacks prevented and does not make prescribed treatment unnecessary."
		],
		population: "Adults with and without high cholesterol; much direct evidence concerns people with elevated cholesterol.",
		scope: "Human randomized oat and oat beta-glucan comparisons for LDL and related lipid markers, distinguishing whole foods from extracted fiber.",
		excludedEvidence: [
			"Do not convert standardized effects into cholesterol concentrations or use an ingredient study as proof of identical effects from every finished oat product."
		],
		uncertainty: "Food preparation, starting cholesterol and trial duration differ. Most trials measure lipids over weeks rather than long-term cardiovascular events.",
		sources: [sources.oatBeta, sources.oatWhole, sources.oatTrial]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "does-eating-nuts-cause-weight-gain",
		title: "Does eating nuts cause weight gain?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Usually not in the amounts tested. Trials of nut-containing diets do not show a clear average weight increase, despite nuts being energy-dense.",
		editorSummary: "The whole eating pattern matters. Trial findings do not mean that nuts contain no calories or that unlimited extra food cannot affect weight.",
		stableCore: [
			"A large review included eighty-six randomized nut-feeding trials and found no clear average increase in body weight.",
			"A separate synthesis found broadly similar weight results with and without explicit instructions to replace other foods, though the studies varied.",
			"Appetite and reported intake findings are less simple: one review found less hunger but higher reported energy intake, without a clear weight change."
		],
		openQuestions: [
			"How nut form, the rest of the diet and eating habits affect longer-term weight responses.",
			"How well findings from controlled or supported diets generalize to ordinary eating over years."
		],
		whatWouldChangeMinds: [
			"Longer randomized comparisons with reliable intake measures, clearly defined food replacements and diverse participants."
		],
		misconceptions: [
			"Energy density alone does not predict the measured weight effect of adding a food to a broader diet.",
			"The trial average is not a guarantee for unlimited amounts or an individual person's weight response."
		],
		population: "Adults in nut-feeding trials with varied body sizes and health profiles; evidence concerns tested foods and amounts.",
		scope: "Randomized nut-feeding evidence for body weight, keeping cohort associations and appetite mechanisms separate.",
		excludedEvidence: [
			"Do not treat an observational association with lower obesity risk as randomized proof of weight loss, or model rankings and appetite ratings as direct body-weight outcomes."
		],
		uncertainty: "Studies vary in duration, food substitution and nut form, and reviews can include the same trials. Nuts are unsuitable for people with a relevant allergy.",
		sources: [sources.nutsWeight, sources.nutsSubstitution, sources.nutsHunger]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "does-fiber-supplementation-help-chronic-constipation",
		title: "Does fiber supplementation help chronic constipation?",
		band: "broad",
		certainty: "low",
		bottomLine: "Yes, for many adults, but the type matters. Some fiber supplements improve stool frequency and consistency; they can also cause gas or bloating.",
		editorSummary: "Psyllium has supportive evidence, while findings for other fibers vary. A tested supplement is a different intervention from general advice to eat more fiber.",
		stableCore: [
			"A 2022 review of sixteen randomized trials found improved constipation response, stool frequency and consistency on average.",
			"Different fibers do not have identical effects. Earlier evidence and newer dietary guidance both identify important differences between products and outcomes.",
			"Flatulence was more common with fiber in pooled trials. Many studies were small or varied substantially, and much guideline evidence was low certainty."
		],
		openQuestions: [
			"Which fiber products offer the best balance of symptom relief and tolerability for different patients.",
			"How benefits compare with whole-food approaches and persist over longer follow-up."
		],
		whatWouldChangeMinds: [
			"Larger, well-blinded comparisons of clearly defined fibers with consistent symptom, quality-of-life and adverse-event outcomes."
		],
		misconceptions: [
			"A benefit from one fiber does not mean every fiber supplement is interchangeable.",
			"Constipation relief does not establish benefits for all IBS symptoms or explain every cause of constipation."
		],
		population: "Adults with chronic idiopathic or functional constipation in dietary trials, rather than all causes of altered bowel habits.",
		scope: "Randomized fiber-supplement evidence for adult constipation, with dated British dietary guidance and explicit attention to gas and product differences.",
		excludedEvidence: [
			"Keep supplement trials separate from whole-diet claims, and do not generalize to bowel obstruction, swallowing disorders or an unexplained new change in bowel habits."
		],
		uncertainty: "Benefits and side effects differ by fiber and patient. Persistent symptoms or new bowel changes need clinical assessment. Swallowing difficulty, possible obstruction and other medicines require particular care with products such as psyllium.",
		sources: [
			sources.fiberUpdated,
			sources.fiberEarlier,
			sources.fiberGuidelines,
			sources.psylliumSafety
		]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "do-smaller-served-portions-reduce-daily-food-intake",
		title: "Do smaller served portions reduce daily food intake?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, on average in experiments. Serving less food tends to reduce daily energy intake, but evidence for lasting weight change is more limited.",
		editorSummary: "Changing the amount served has stronger support than simply using a smaller plate. Much of the evidence measures intake over short periods.",
		stableCore: [
			"Reviews of experiments lasting at least a day find that larger served portions increase daily intake and smaller portions reduce it on average.",
			"Long-term body-weight evidence is much thinner than evidence about food intake. One review's weight analysis relied on only four studies.",
			"Portion-control tools are a separate question. A review found little clear intake benefit from smaller plates alone, although some other tools had favorable effects."
		],
		openQuestions: [
			"How much people compensate at later meals over months, outside controlled settings.",
			"Which changes preserve nutritional adequacy and are practical across ages, cultures and food settings."
		],
		whatWouldChangeMinds: [
			"Longer real-world trials that measure total intake, nutrition, adherence and body-weight outcomes rather than a single meal alone."
		],
		misconceptions: [
			"A small plate does not necessarily mean that less food is served or eaten.",
			"Short-term intake differences cannot be multiplied into a guaranteed long-term weight loss."
		],
		population: "Mostly adults in experimental feeding studies; applicability to children and people with specific nutritional needs requires separate evidence.",
		scope: "Manipulations of actual served portion size, separating daily intake from tableware effects and long-term body weight.",
		excludedEvidence: [
			"Do not count smaller dishes as an actual portion reduction without measuring served food, or count multiple effects from one experiment as independent studies."
		],
		uncertainty: "Controlled environments and short durations limit generalization. Lower intake is not a suitable goal for everyone, including people with undernutrition or eating disorders.",
		sources: [sources.portionDownsize, sources.portionMeta, sources.portionTools]
	}, novemberFoodPatternsResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "do-menu-calorie-labels-change-what-people-order",
		title: "Do menu calorie labels change what people order?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, but the average change is small. Calorie labels tend to reduce the energy selected or purchased; effects on what people actually eat are less certain.",
		editorSummary: "A small population-average effect can coexist with little change for many people. Benefits, accessibility and possible harms need to be judged separately.",
		stableCore: [
			"A 2025 Cochrane review found a small reduction in energy selected across sixteen randomized studies, including studies of actual purchases.",
			"There were fewer studies of consumption and lower certainty about how much people ate. Long-term effects on body weight were not established by these selection results.",
			"Most evidence came from high-income countries and often higher-income groups. Separate research reports distress and other concerns among some people with eating disorders."
		],
		openQuestions: [
			"Whether effects persist over time and generalize across income groups, food settings and countries.",
			"How policy design can address possible harms and whether food businesses change their offerings."
		],
		whatWouldChangeMinds: [
			"Longer representative policy evaluations measuring purchases, consumption, nutritional quality and harms, with adequate comparisons and clear reporting."
		],
		misconceptions: [
			"A small average selection effect does not mean labels change every person's choices.",
			"Choosing fewer calories is not the same measurement as eating fewer calories or achieving better health, and qualitative concerns do not by themselves establish population-level causation."
		],
		population: "Primarily adults in high-income countries; restaurant and cafeteria studies form much of the evidence.",
		scope: "Calorie information on menus and related food-selection settings, separating ordering and purchasing from actual consumption and eating-disorder outcomes.",
		excludedEvidence: [
			"Do not generalize food-label findings to alcoholic drinks, treat hypothetical orders as actual meals, or use a US policy review as a statement of every country's law."
		],
		uncertainty: "Study settings and populations are uneven. The 2025 review did not fully integrate its newer search update, and possible harms to people with eating disorders need stronger prospective study.",
		sources: [sources.calorieCochrane, sources.calorieUS, sources.calorieHarms]
	}, novemberFoodPatternsResearchCheckedAt)
];
