import type { ReadingGuideContent } from "./types";

export const supplementsGuide: ReadingGuideContent = {
	takeaway:
		"Supplements are not one intervention. Evidence for a defined ingredient and purpose does not validate every product, every dose, or a broad promise of better health.",
	scope: "General evidence literacy, with US regulatory context. This does not diagnose deficiency or recommend a personal supplement regimen. Review products and medicines with a clinician or pharmacist.",
	sections: [
		{
			id: "separate-questions",
			title: "Separate the promise into three questions",
			paragraphs: [
				{
					text: "Start with the intended job. Correcting inadequate nutrient intake, improving a particular exercise outcome, and preventing chronic disease in an otherwise healthy person are different questions. A result for one does not automatically answer the others. NIH notes that supplements can help meet nutrient needs in some circumstances, but cannot replace the variety of foods in a healthy eating pattern.",
					sources: ["nih-basics"]
				},
				{
					text: "Ask three separate questions: does the ingredient improve the outcome, does the bottle contain it, and is it appropriate for this person? Quality, effectiveness, and safety are distinct checks.",
					sources: ["nih-basics", "fda"]
				}
			]
		},
		{
			id: "regulation",
			title: "Being on sale is not the same as being approved",
			paragraphs: [
				{
					text: "In the United States, dietary supplements do not undergo FDA premarket approval like medicines. Manufacturers have responsibilities for safety, labeling, and manufacturing quality; FDA also has oversight and enforcement powers. ‘Not preapproved’ therefore does not mean ‘no rules,’ but it does mean a shopper should not treat market availability as a government finding that a product works.",
					sources: ["fda"]
				},
				{
					text: "Match the studied ingredient, formulation, participants, and outcome to the claim. Evidence for one ingredient does not validate every mixture containing it. A label about supporting a body function does not establish disease prevention or treatment.",
					sources: ["fda", "nih-sport"]
				}
			]
		},
		{
			id: "prevention",
			title: "General disease prevention is a demanding claim",
			paragraphs: [
				{
					text: "The USPSTF's 2022 recommendation advises against beta carotene or vitamin E supplements for preventing cardiovascular disease or cancer in community-dwelling, nonpregnant adults. For multivitamins and most other single or paired nutrients, it found insufficient evidence to determine the balance of benefit and harm for those prevention goals. Insufficient evidence is not a positive recommendation.",
					sources: ["uspstf"]
				},
				{
					text: "That recommendation does not apply to treating a known deficiency, pregnancy-related needs, children, or certain illness settings. It also does not mean every possible supplement has been proved useless for every outcome. Read the population and purpose beside the conclusion; otherwise a narrow prevention finding can be stretched into either an unsupported sales pitch or an equally unsupported blanket dismissal.",
					sources: ["uspstf"]
				}
			]
		},
		{
			id: "creatine",
			title: "Creatine shows what a more specific claim looks like",
			paragraphs: [
				{
					text: "NIH's sports-supplement summary identifies evidence that creatine can help repeated, short, high-intensity efforts and training-related gains in strength and power. That is a more precise statement than ‘boosts performance.’ Benefits vary among people, and the evidence is less compelling for endurance activities such as long-distance running.",
					sources: ["nih-sport"]
				},
				{
					text: "The same summary describes a generally reassuring safety record in healthy adults and notes that increased water retention can raise body weight. An increase on the scale is therefore not automatically new muscle. Evidence from healthy adults also should not be silently transferred to people with medical conditions or to every multi-ingredient sports product.",
					sources: ["nih-sport"]
				},
				{
					text: "The boundaries are part of the finding. Support for a specific sports outcome does not establish unrelated benefits such as disease prevention.",
					sources: ["nih-sport"]
				}
			]
		},
		{
			id: "quality-and-safety",
			title: "A quality seal answers only part of the question",
			paragraphs: [
				{
					text: "Independent testing can check ingredients and contaminants. NIH cautions that quality seals do not guarantee safety or effectiveness. A seal is evidence about the checks performed, not proof of a health promise.",
					sources: ["nih-basics"]
				},
				{
					text: "Supplements can interact with medicines, and combining products can obscure total intake. ‘Natural’ does not remove these concerns. Keep a complete product list, including blends, and bring it to a clinician or pharmacist. The question is not only whether a supplement has any possible benefit, but whether that benefit and its uncertainties fit the person's actual circumstances.",
					sources: ["nih-basics", "fda"]
				}
			]
		},
		{
			id: "reading-an-ad",
			title: "Try the claim test before the shopping test",
			paragraphs: [
				{
					text: "Imagine an advertisement saying that a tested ingredient ‘supports health.’ Before comparing brands, translate the advertisement into a question that could be answered: which health outcome, measured over what period, in which people, against what comparison? This is an editorial reading exercise, not a claim about a particular product. If the promise cannot be made specific, the evidence cannot be matched to it reliably.",
					sources: []
				}
			]
		}
	],
	questions: [
		"What exact ingredient, formulation, and outcome were tested?",
		"Does the evidence concern deficiency treatment or prevention in people without deficiency?",
		"Does the quality check establish contents, effectiveness, or both?",
		"Could another product or medicine change the risk?"
	],
	sources: [
		{
			id: "fda",
			title: "FDA: Questions and Answers on Dietary Supplements",
			url: "https://www.fda.gov/food/information-consumers-using-dietary-supplements/questions-and-answers-dietary-supplements",
			kind: "US regulatory guidance",
			note: "Premarket approval, manufacturer responsibilities, labeling, and enforcement. Guidance page checked."
		},
		{
			id: "nih-basics",
			title: "NIH Office of Dietary Supplements: What You Need to Know",
			url: "https://ods.od.nih.gov/factsheets/WYNTK-Consumer/",
			kind: "Public health guidance",
			note: "Nutrient needs, interactions, and the limits of independent quality seals. Relevant sections checked."
		},
		{
			id: "uspstf",
			title: "USPSTF (2022): Vitamins and minerals for cardiovascular disease and cancer prevention",
			url: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/vitamin-supplementation-to-prevent-cvd-and-cancer-preventive-medication",
			kind: "Evidence-based recommendation",
			note: "Recommendation and clinician summary checked. Applies to specified prevention goals and populations, not deficiency treatment."
		},
		{
			id: "nih-sport",
			title: "NIH Office of Dietary Supplements: Exercise and Athletic Performance",
			url: "https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-Consumer/",
			kind: "Evidence summary",
			note: "Creatine effectiveness and safety sections checked. Different products and health circumstances require separate assessment."
		}
	]
};
