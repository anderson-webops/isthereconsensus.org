import type { ReadingGuideContent } from "./types";

export const sleepGuide: ReadingGuideContent = {
	takeaway:
		"Sleep duration, sleep quality, and insomnia treatment are different questions. Healthy habits support sleep, but persistent insomnia deserves more than another checklist: structured CBT-I has substantially stronger treatment evidence.",
	scope: "An adult-focused explanation, not a diagnosis or a personal treatment plan. Children, shift workers, pregnancy, and people with medical conditions may need different advice. Do not start, stop, or combine sleep medicines based on this guide.",
	sections: [
		{
			id: "opportunity-and-quality",
			title: "Enough time in bed is only the first question",
			paragraphs: [
				{
					text: "CDC recommends at least seven hours of sleep for adults aged 18-60, seven to nine for ages 61-64, and seven to eight for those 65 and older. These are population recommendations, not a test that diagnoses an individual. Time allocated to bed and time actually asleep are also different quantities: a long night in bed may contain substantial wakefulness.",
					sources: ["cdc"]
				},
				{
					text: "Quality matters alongside duration. Repeated awakenings, difficulty falling asleep, or persistent daytime sleepiness despite sufficient opportunity can indicate a problem that a bigger hour target will not explain. A sleep diary can record timing, awakenings, naps, caffeine, alcohol, and medicines so a clinician sees the pattern rather than one unusually bad night.",
					sources: ["cdc"]
				}
			]
		},
		{
			id: "habits-versus-treatment",
			title: "Sleep hygiene is not a complete insomnia treatment",
			paragraphs: [
				{
					text: "Advice about regular timing, a comfortable bedroom, and caffeine is often called sleep hygiene. A 2025 synthesis included 42 trials involving 4,245 adults and found sleep-hygiene education inferior to cognitive behavioral therapy for insomnia, or CBT-I, on insomnia severity. Most included trials had high risk of bias. The result supports a distinction between basic advice and a structured treatment, not a precise prediction of how much either will help one person.",
					sources: ["hygiene"]
				},
				{
					text: "Improvement between the beginning and end of a sleep-hygiene program does not by itself prove that the advice caused the improvement. Symptoms can fluctuate, and participants may change other things. Comparisons with an appropriate control group are more informative. Nor should rankings across a small or biased evidence base be converted into recommendations for every alternative therapy examined.",
					sources: ["hygiene"]
				}
			]
		},
		{
			id: "structured-care",
			title: "CBT-I addresses more than bedtime habits",
			paragraphs: [
				{
					text: "NHLBI describes CBT-I as a multicomponent treatment addressing thoughts about sleep, relaxation, the association between bed and sleep, and the time spent in bed. It is generally an initial treatment for long-term insomnia. Its time-in-bed component is not an invitation to prescribe yourself severe sleep restriction; appropriate support and adjustment matter, especially when daytime functioning or other health conditions complicate treatment.",
					sources: ["nhlbi"]
				},
				{
					text: "A 2025 review of 67 randomized trials and 5,232 participants found improvements in insomnia severity and sleep continuity among adults with chronic diseases. This helps address the concern that CBT-I only applies to otherwise healthy sleepers. The trials still varied in diseases, delivery methods, and comparison groups; pooled benefits do not establish that every app or every shortened program provides equivalent care.",
					sources: ["chronic-disease"]
				}
			]
		},
		{
			id: "combination-treatment",
			title: "Adding a medicine changes the comparison",
			paragraphs: [
				{
					text: "The final 2026 AASM guideline conditionally favors starting CBT-I plus insomnia medicine over medicine alone, but conditionally advises against preferring the combination over CBT-I alone. Both recommendations have low-certainty evidence and allow patient preferences to matter. Those statements are compatible: adding CBT-I to a medication-only approach and adding medication to CBT-I are different decisions. The guideline concerns concurrent treatment, not every possible later rescue strategy.",
					sources: ["aasm"]
				}
			]
		},
		{
			id: "different-problem",
			title: "Not every poor night is an insomnia problem",
			paragraphs: [
				{
					text: "Breathing pauses or gasping during sleep, frequent loud snoring, and substantial daytime sleepiness warrant discussion with a healthcare professional. Sleep apnea is one possible explanation, but symptoms alone do not diagnose it and loud snoring is not required in every case. Evaluation may include a sleep study. Treating these signs as merely poor discipline or a need for a stronger sedative can miss the actual question.",
					sources: ["apnea"]
				}
			]
		},
		{
			id: "read-the-promise",
			title: "Read a sleep promise in three parts",
			paragraphs: [
				{
					text: "An original reading exercise: an advertisement promises ‘better sleep.’ Ask whether that means falling asleep sooner, fewer awakenings, longer total sleep, or better daytime functioning. Then ask who was studied and what the comparison was. A product that changes one measurement has not necessarily solved the person's main difficulty. Keeping the outcome explicit makes both optimistic promises and disappointing experiences easier to interpret.",
					sources: []
				}
			]
		}
	],
	questions: [
		"Is the problem insufficient opportunity, disrupted sleep, or daytime functioning?",
		"Was the intervention basic advice or structured CBT-I?",
		"Compared with what, and in which patients?",
		"Are there symptoms that call for assessment rather than another product?"
	],
	sources: [
		{
			id: "cdc",
			title: "CDC: About Sleep",
			url: "https://www.cdc.gov/sleep/about/index.html",
			kind: "Public health guidance",
			note: "Adult duration, sleep quality, and diary sections checked. Population guidance does not diagnose a sleep disorder."
		},
		{
			id: "hygiene",
			title: "Ruan et al. (2025): Effects of sleep hygiene education for insomnia",
			url: "https://pubmed.ncbi.nlm.nih.gov/40449065/",
			kind: "Systematic review and meta-analysis",
			note: "Abstract checked through Europe PMC. Most included trials had high risk of bias; within-group improvement is not proof of causation."
		},
		{
			id: "nhlbi",
			title: "NHLBI: Insomnia treatment",
			url: "https://www.nhlbi.nih.gov/health/insomnia/treatment",
			kind: "Public health guidance",
			note: "CBT-I components and treatment context checked. This guide does not reproduce a clinical treatment protocol."
		},
		{
			id: "chronic-disease",
			title: "Scott et al. (2025): CBT-I in people with chronic disease",
			url: "https://pubmed.ncbi.nlm.nih.gov/40982264/",
			kind: "Systematic review of randomized trials",
			note: "Primary abstract checked through Europe PMC: 67 trials, 5,232 participants. Full trial-level methods were not independently reanalyzed."
		},
		{
			id: "aasm",
			title: "AASM (2026): Combination treatment for chronic insomnia in adults",
			url: "https://pubmed.ncbi.nlm.nih.gov/41975142/",
			kind: "Clinical practice guideline",
			note: "Final published recommendation abstract checked, not the earlier consultation draft. Conditional recommendations with low-certainty evidence."
		},
		{
			id: "apnea",
			title: "NHLBI: Sleep apnea symptoms",
			url: "https://www.nhlbi.nih.gov/health/sleep-apnea/symptoms",
			kind: "Public health guidance",
			note: "Symptoms and assessment advice checked. Neither this list nor a consumer sleep score establishes a diagnosis."
		}
	]
};
