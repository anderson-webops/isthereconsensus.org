import type { ReadingGuideContent } from "./types";

export const exerciseGuide: ReadingGuideContent = {
	takeaway:
		"Physical activity is not an all-or-nothing threshold. Aerobic activity, muscle strengthening, and less sedentary time address different needs, and benefits can begin below headline targets such as 150 weekly minutes or 10,000 daily steps.",
	scope: "General adult evidence and public health guidance, not an individualized training prescription. Disability, pregnancy, illness, injury, and current fitness affect suitable activities. Adapt activity with appropriate professional advice when needed.",
	sections: [
		{
			id: "targets-not-gates",
			title: "A guideline is a target, not an entrance fee",
			paragraphs: [
				{
					text: "CDC's adult guidance calls for at least 150 minutes of moderate aerobic activity, 75 minutes of vigorous activity, or an equivalent combination each week, alongside muscle strengthening on at least two days. It explicitly states that some activity is better than none. Falling short of the weekly target does not make a walk or a shorter session worthless, and the target does not mark the point where benefit suddenly switches on.",
					sources: ["cdc"]
				},
				{
					text: "Activity can be spread across the week and broken into smaller periods. The two parts of the recommendation also should not be silently exchanged: an aerobic-minute total does not demonstrate that someone has done strengthening work. A useful reading of the guideline therefore asks both how much movement happens and which kinds of capacity it develops, rather than treating one number as a complete fitness score.",
					sources: ["cdc"]
				}
			]
		},
		{
			id: "intensity",
			title: "The same activity can be a different effort",
			paragraphs: [
				{
					text: "CDC distinguishes absolute intensity, the energy cost of an activity, from relative intensity, its difficulty for a particular person. A pace that is moderate for a trained walker can feel vigorous to somebody else. Its practical talk-test guide is that moderate activity generally permits conversation but not singing; vigorous effort makes sustained conversation difficult. This is an approximate aid, not a diagnosis, a competition, or a reason to ignore concerning symptoms.",
					sources: ["intensity"]
				}
			]
		},
		{
			id: "steps",
			title: "10,000 steps is not a biological boundary",
			paragraphs: [
				{
					text: "A 2025 systematic review assembled 57 studies from 35 cohorts; 31 studies entered its meta-analyses. Several outcomes showed declining risk with higher daily steps, with changes in the curve around 5,000-7,000 steps. Other outcomes followed different patterns. These findings argue against treating 10,000 as a universal minimum, but do not establish one new magic number that is optimal for everyone.",
					sources: ["steps"]
				},
				{
					text: "These are mainly comparisons between people whose habitual activity differs, not a trial assigning every person a fixed step prescription. Existing health, mobility, and other behaviors can influence both steps and later outcomes. The review explicitly identifies residual confounding and limited evidence for some outcomes. A relative association from a cohort should not be promised as the percentage by which one reader will reduce their own risk.",
					sources: ["steps"]
				},
				{
					text: "The publisher later corrected a supplementary table. The correction is linked here for transparency; this guide uses the indexed abstract's broad findings and does not reproduce or reinterpret the corrected table's estimates.",
					sources: ["correction"]
				}
			]
		},
		{
			id: "beyond-counts",
			title: "A counter measures only part of activity",
			paragraphs: [
				{
					text: "WHO includes walking, cycling, wheeling, sport, and other movement within physical activity. A step-only comparison can therefore miss activities that are important to someone whose movement does not mainly involve walking. Muscle strengthening and reducing sedentary time also have a place in the guidance. A simple counter can be useful for a chosen behavior without becoming a universal ranking of health, effort, or access to exercise.",
					sources: ["who"]
				}
			]
		},
		{
			id: "outcomes",
			title: "Choose the outcome before judging the program",
			paragraphs: [
				{
					text: "WHO describes benefits spanning cardiovascular health, functioning, mental health, and sleep. Weight is only one possible outcome. A claim about faster race performance asks a different question from reducing inactivity or maintaining everyday mobility. Access matters too: safe spaces, transport, disability accommodations, and time influence whether activity is feasible. Those barriers should not be mistaken for evidence that a person lacks motivation or that the underlying benefits do not apply.",
					sources: ["who"]
				}
			]
		},
		{
			id: "compare-fairly",
			title: "Try a fair comparison",
			paragraphs: [
				{
					text: "An original reading exercise: one program advertises more steps, another stronger legs, and another improved race times. Before choosing a winner, write down the outcome that matters, the starting fitness of participants, the time required, and how consistently people could follow it. Those programs may answer different questions. ‘Best exercise’ is incomplete without a purpose, a comparison, and a realistic way for the intended person to take part.",
					sources: []
				}
			]
		}
	],
	questions: [
		"Is the target being mistaken for a minimum below which nothing helps?",
		"Does the measure capture the activities this person actually does?",
		"Was the benefit tested in a trial or associated with habitual activity?",
		"Does the program address the outcome, ability, and circumstances that matter?"
	],
	sources: [
		{
			id: "cdc",
			title: "CDC: Adult activity recommendations",
			url: "https://www.cdc.gov/physical-activity-basics/guidelines/adults.html",
			kind: "Public health guidance",
			note: "Weekly aerobic and strengthening guidance and smaller activity periods checked. These are population targets, not personal prescriptions."
		},
		{
			id: "intensity",
			title: "CDC: Measuring physical activity intensity",
			url: "https://www.cdc.gov/physical-activity-basics/measuring/index.html",
			kind: "Public health guidance",
			note: "Relative versus absolute effort and the talk test checked. A practical guide does not replace clinical assessment."
		},
		{
			id: "steps",
			title: "Ding et al. (2025): Daily steps and health outcomes in adults",
			url: "https://pubmed.ncbi.nlm.nih.gov/40713949/",
			kind: "Systematic review and dose-response meta-analysis",
			note: "Consensus discovery cross-checked against the primary abstract in Europe PMC. Associations, confounding, and outcome-specific limits retained."
		},
		{
			id: "correction",
			title: "Correction to Ding et al. (2025)",
			url: "https://doi.org/10.1016/S2468-2667(25)00199-9",
			kind: "Publisher correction",
			note: "Publisher notice checked: supplementary table 8 was corrected in August 2025. That table is not reproduced in this guide."
		},
		{
			id: "who",
			title: "WHO: Physical activity",
			url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity",
			kind: "Public health evidence summary",
			note: "Activity types, benefits, sedentary behavior, and access considerations checked. Guidance covers more than step counts."
		}
	]
};
