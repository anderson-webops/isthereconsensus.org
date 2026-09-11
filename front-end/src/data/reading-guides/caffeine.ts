import type { ReadingGuideContent } from "./types";

export const caffeineGuide: ReadingGuideContent = {
	takeaway:
		"Regular use can reduce some of caffeine's effects without eliminating every benefit. Feeling a weaker buzz, reversing withdrawal, improving exercise performance, and disrupting sleep are different outcomes.",
	scope: "An evidence guide for adults, not an individual dosing plan. Pregnancy, medications, medical conditions, and younger age require separate advice from a qualified health professional.",
	sections: [
		{
			id: "define-effective",
			title: "First ask what ‘effective’ means",
			paragraphs: [
				{
					text: "Headache relief, alertness, and timed exercise performance are different outcomes. When someone says coffee has stopped working, ask which outcome changed, compared with what baseline. A smaller subjective lift does not establish that every effect has disappeared.",
					sources: ["withdrawal", "performance"]
				},
				{
					text: "The comparison matters especially in regular users. A caffeine-free test morning may include withdrawal, not simply the person's usual functioning without caffeine. A benefit over that morning can combine withdrawal relief with other effects. This is one reason that a single before-and-after experience cannot establish how much of a long-term benefit remains.",
					sources: ["withdrawal"]
				}
			]
		},
		{
			id: "tolerance-evidence",
			title: "Tolerance is real, but it is not an on/off switch",
			paragraphs: [
				{
					text: "A 2022 meta-analysis of 60 exercise studies found an average performance benefit from acute caffeine and did not detect a relationship between habitual consumption and that benefit. This supports the possibility of an exercise benefit in regular users. It does not show that one person's response stays unchanged through years of daily use.",
					sources: ["performance"]
				},
				{
					text: "A 2025 randomized experiment followed 80 initially inactive men, with groups assigned caffeine or placebo and with or without exercise training. Repeated caffeine use reduced the performance boost, but an acute benefit was still present at the tested stages. The study therefore supports partial tolerance, not complete loss of effectiveness. Its population and exercise tests limit generalization to women, older people, or ordinary desk work.",
					sources: ["habituation"]
				},
				{
					text: "These findings are not a simple contradiction. Comparing habitual users across studies asks a different question from repeatedly testing people while introducing regular use. Training, measurement, and study design differ too. Read the outcome and comparison before deciding that a new study either overturns tolerance or proves caffeine becomes useless.",
					sources: ["performance", "habituation"]
				}
			]
		},
		{
			id: "withdrawal",
			title: "Feeling worse without caffeine is a separate clue",
			paragraphs: [
				{
					text: "A review of controlled withdrawal experiments identified headache, fatigue, reduced alertness, and difficulty concentrating among the supported symptoms. Symptoms commonly began within a day of stopping and lasted several days, with substantial individual variation. An unpleasant caffeine-free day is therefore not a clean measurement of a person's eventual caffeine-free baseline.",
					sources: ["withdrawal"]
				},
				{
					text: "Withdrawal relief is not the same claim as improvement above a stable, non-withdrawing baseline. Neither should it be used to dismiss benefits on separately measured exercise outcomes.",
					sources: ["withdrawal", "performance"]
				}
			]
		},
		{
			id: "sleep",
			title: "The benefit today can have a sleep cost tonight",
			paragraphs: [
				{
					text: "A 2023 synthesis of 24 studies found that caffeine reduced total sleep time by an average of about 45 minutes under the conditions studied, with poorer sleep efficiency and later sleep onset. That average combines different doses, timing, and participants. It is not a prediction that every cup will cost every person exactly 45 minutes.",
					sources: ["sleep"]
				},
				{
					text: "The review also modeled timing thresholds for particular coffee and pre-workout servings. Those estimates should not become a universal clock-time rule: serving size, caffeine content, and individual clearance differ. The practical question is not just whether caffeine creates a noticeable buzz, but whether its timing is compatible with adequate sleep.",
					sources: ["sleep", "fda"]
				},
				{
					text: "This creates a plausible feedback loop: poor sleep prompts caffeine use, while caffeine can impair subsequent sleep. The review supports that concern, but it does not diagnose the cause of an individual's fatigue. Persistent tiredness deserves attention in its own right rather than automatic escalation of caffeine.",
					sources: ["sleep"]
				}
			]
		},
		{
			id: "practical-boundaries",
			title: "Use the evidence without turning it into a dosing challenge",
			paragraphs: [
				{
					text: "The FDA describes 400 mg per day as an amount not generally associated with negative effects for most adults. This is neither a target nor a guarantee for an individual. The agency emphasizes sensitivity, medications, and health circumstances, and notes that caffeine comes from multiple foods, drinks, supplements, and medicines.",
					sources: ["fda"]
				},
				{
					text: "If reducing regular use, the FDA recommends doing so gradually to limit unpleasant withdrawal. The research summarized here does not establish a universal ‘reset’ duration or justify progressively larger doses to recreate an earlier feeling. A clinician or pharmacist can help assess interactions and persistent symptoms.",
					sources: ["fda", "habituation"]
				}
			]
		}
	],
	questions: [
		"Am I trying to change alertness, headache, exercise performance, or sleep?",
		"Does the comparison include withdrawal, and how was the outcome measured?",
		"Have I counted caffeine from all sources and considered its timing?",
		"Does this study actually include people and circumstances like mine?"
	],
	sources: [
		{
			id: "fda",
			title: "FDA: Spilling the Beans, How Much Caffeine Is Too Much?",
			url: "https://www.fda.gov/consumers/consumer-updates/spilling-beans-how-much-caffeine-too-much",
			kind: "Public health guidance",
			note: "Adult safety context, individual variation, and gradual reduction. Guidance page checked; not a personal dose recommendation."
		},
		{
			id: "performance",
			title: "Carvalho et al. (2022): Habitual caffeine consumption and exercise response",
			url: "https://pubmed.ncbi.nlm.nih.gov/35536449/",
			kind: "Systematic review and meta-analysis",
			note: "60 studies; acute exercise outcomes and habitual-use comparisons. Abstract checked, not full text."
		},
		{
			id: "withdrawal",
			title: "Juliano and Griffiths (2004): A critical review of caffeine withdrawal",
			url: "https://pubmed.ncbi.nlm.nih.gov/15448977/",
			kind: "Evidence review",
			note: "Controlled withdrawal evidence and symptom timing. Older foundational review; abstract checked."
		},
		{
			id: "sleep",
			title: "Gardiner et al. (2023): The effect of caffeine on subsequent sleep",
			url: "https://pubmed.ncbi.nlm.nih.gov/36870101/",
			kind: "Systematic review and meta-analysis",
			note: "24 studies. Pooled sleep effects and modeled timing are not individual predictions. Abstract checked."
		},
		{
			id: "habituation",
			title: "Khodadadi et al. (2025): Habitual caffeine, training, and exercise performance",
			url: "https://pubmed.ncbi.nlm.nih.gov/39905628/",
			kind: "Randomized experiment",
			note: "80 initially inactive men; partial tolerance during repeated use. Abstract checked; do not generalize to every population or outcome."
		}
	]
};
