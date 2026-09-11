import type { ReadingGuideContent } from "./types";

export const nutritionGuide: ReadingGuideContent = {
	takeaway:
		"Nutrition evidence is clearest when the question specifies a dietary pattern, what replaces what, and the outcome measured. A nutrient headline or processing label alone cannot summarize an entire diet or predict an individual's health.",
	scope: "General adult nutrition evidence, not a weight-loss prescription or treatment for an eating disorder, allergy, deficiency, or medical condition. Individual needs and practical access to food matter; clinical diets require appropriate professional guidance.",
	sections: [
		{
			id: "patterns",
			title: "Start with a pattern rather than a miracle ingredient",
			paragraphs: [
				{
					text: "WHO's 2026 healthy-diet summary emphasizes adequacy, balance, moderation, and diversity. It describes diets built around varied minimally processed or unprocessed foods, while limiting excess free sugars, sodium, and unhealthy fats. The exact foods can differ with culture, availability, and individual needs. A healthy pattern is therefore not identical to buying a particular branded food, following one named diet, or treating every meal as a test of purity.",
					sources: ["who"]
				},
				{
					text: "Read an isolated food claim within that broader pattern. Adding one beneficial food does not tell us what it displaces, whether nutritional needs are met, or whether the change is sustainable. Equally, a single food eaten occasionally does not describe the whole diet. A useful explanation considers repeated choices and access rather than moral labels for foods or people.",
					sources: ["who"]
				}
			]
		},
		{
			id: "replacement",
			title: "Less of one nutrient means more of something else",
			paragraphs: [
				{
					text: "When total energy is held roughly constant, reducing saturated fat means replacing its energy with something else. Cochrane's long-term trial review found fewer combined cardiovascular events after reducing saturated fat, with little or no effect on overall mortality. The trials tested dietary substitutions, not the disappearance of calories into a vacuum. Outcome choice matters: an effect on cardiovascular events is not interchangeable with an effect on all deaths.",
					sources: ["fats"]
				},
				{
					text: "The review had limited data for some replacement nutrients and did not establish that every carbohydrate-rich replacement food is equivalent. A headline saying ‘fat is good’ or ‘fat is bad’ erases both the type of fat and the alternative. Ask what changed in each group, how long it changed, and whether the reported outcome was a blood measurement, a clinical event, or death.",
					sources: ["fats"]
				}
			]
		},
		{
			id: "mediterranean-example",
			title: "A dietary-pattern trial is not a test of one bottle of oil",
			paragraphs: [
				{
					text: "PREDIMED enrolled 7,447 older adults in Spain who had high cardiovascular risk but no cardiovascular disease at enrollment. The groups assigned a Mediterranean pattern supplemented with extra-virgin olive oil or nuts had fewer major cardiovascular events than the comparison group given reduced-fat advice. Participants also received dietary education and study support. This tests a supported pattern in a particular population, not whether adding oil alone protects every young, low-risk person.",
					sources: ["predimed"]
				},
				{
					text: "The version linked here is the 2018 revised analysis. The investigators withdrew the earlier report after identifying departures from random assignment and published analyses addressing those problems. That history belongs beside the result: neither hiding the correction nor pretending it erases all the evidence is helpful. The findings should be weighed with the wider evidence, with the revised methods and population limits visible.",
					sources: ["predimed"]
				}
			]
		},
		{
			id: "processing",
			title: "A controlled feeding study answers a bounded question",
			paragraphs: [
				{
					text: "In a 2019 NIH inpatient crossover trial, 20 adults received an ultra-processed diet for two weeks and an unprocessed diet for two weeks, in randomized order. They could eat as much as they wished. Participants ate more energy and gained weight during the ultra-processed phase, while losing weight during the other phase. The controlled setting strengthens the comparison beyond an association between habitual diet and later illness.",
					sources: ["hall"]
				},
				{
					text: "It does not identify a single harmful additive, establish that every food in the ultra-processed category behaves identically, or measure decades of cancer risk. The intervention changed complete menus, and the experiment was small and short. Its value is evidence that the dietary conditions tested can influence intake and weight, not permission to attach every long-term health claim to the word ‘processed.’",
					sources: ["hall"]
				}
			]
		},
		{
			id: "headline-exercise",
			title: "Turn a headline into an answerable question",
			paragraphs: [
				{
					text: "An original reading exercise: replace ‘this diet prevents disease’ with ‘among these participants, this supported pattern, compared with that alternative, changed this outcome over this period.’ Then identify what remains unknown: adherence outside the study, cost, food access, individual suitability, and whether the result concerns a clinical outcome or only an intermediate marker. The longer sentence is less catchy, but it shows exactly which conclusion the evidence can carry.",
					sources: []
				}
			]
		}
	],
	questions: [
		"What dietary pattern is being compared with what alternative?",
		"Does the result concern intake, weight, a biomarker, clinical events, or mortality?",
		"How much support did participants receive, and can the finding generalize?",
		"Is the cited study the corrected or superseded version?"
	],
	sources: [
		{
			id: "who",
			title: "WHO (2026): Healthy diet",
			url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet",
			kind: "Public health guidance",
			note: "January 2026 principles and dietary-pattern guidance checked. Individual diets vary with needs, culture, and food availability."
		},
		{
			id: "fats",
			title: "Cochrane (2020): Reducing saturated fat and cardiovascular risk",
			url: "https://www.cochrane.org/evidence/CD011737_effect-cutting-down-saturated-fat-we-eat-our-risk-heart-disease",
			kind: "Systematic review of long-term trials",
			note: "Public summary and abstract checked. Combined cardiovascular events and mortality are separate endpoints; some substitutions have limited data."
		},
		{
			id: "predimed",
			title: "Estruch et al. (2018): Mediterranean diet and primary cardiovascular prevention",
			url: "https://pubmed.ncbi.nlm.nih.gov/29897866/",
			kind: "Revised trial analysis",
			note: "Primary abstract checked through Europe PMC. Uses the revised report addressing randomization departures, not the withdrawn 2013 analysis."
		},
		{
			id: "hall",
			title: "Hall et al. (2019): Ultra-processed diets and ad libitum intake",
			url: "https://pubmed.ncbi.nlm.nih.gov/31105044/",
			kind: "Randomized inpatient crossover trial",
			note: "Current indexed abstract checked; record links later corrections. Small, short feeding study, not a test of every processed food or long-term disease outcome."
		}
	]
};
