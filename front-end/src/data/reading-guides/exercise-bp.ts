import type { ReadingGuideContent } from "./types";

export const exerciseBpGuide: ReadingGuideContent = {
	takeaway:
		"Exercise can lower blood pressure, but the best-looking number is not necessarily the best-supported program for you. Compare measurement, population and uncertainty first.",
	scope: "An evidence-reading guide, not a personal workout plan or a replacement for blood-pressure care. It separates resting group results, ambulatory evidence, dose modeling and measurement timing.",
	sections: [
		{
			id: "same-question",
			title: "Start with the outcome and the study population",
			paragraphs: [
				{
					text: "The comparison starts with Hu et al.'s August 2026 review of exercise programs in middle-aged and older study groups. Its age criterion was a study-level mean of at least 45. That does not mean every participant was at least 45, nor that everyone had hypertension. Some participants had stable chronic conditions, baseline pressures varied, and medication use was not consistently described. Those details limit how directly a pooled result applies to a particular reader.",
					sources: ["hu"]
				},
				{
					text: "The review contains 159 randomized trials and 10,821 participants at baseline, but the outcome-specific networks contain 152 trials for systolic pressure and 147 for diastolic pressure. Programs lasted between four and 48 weeks, with a median of 12. The displayed numbers describe the difference in average change versus control. They are not the final pressure someone should expect after a workout, and a negative number does not mean pressure itself became negative.",
					sources: ["hu"]
				}
			]
		},
		{
			id: "ranking",
			title: "Read uncertainty before declaring a winner",
			paragraphs: [
				{
					text: "The largest primary systolic estimate belonged to circuit-based training, but combined aerobic and resistance training overtook it in some analyses excluding high-risk or small studies. A change in ordering under reasonable checks is important information. It tells us that the headline rank depends partly on which evidence enters the calculation. It does not make every exercise equivalent, and it does not justify replacing one simplistic winner with another.",
					sources: ["hu"]
				},
				{
					text: "These estimates come from a Bayesian network model that combines direct and indirect comparisons. Their 95% credible intervals describe uncertainty conditional on the model and evidence, not the fraction of scientists who agree or the range of outcomes expected for an individual. The authors rated no network comparison high confidence. All the isometric studies in this review used handgrip, so transferring that estimate to wall squats would also change the intervention being evaluated.",
					sources: ["hu"]
				}
			]
		},
		{
			id: "measurement",
			title: "Keep resting and 24-hour results separate",
			paragraphs: [
				{
					text: "Switching the comparison to 24-hour pressure changes the evidence, not just the label. The ambulatory synthesis by Schneider et al. concerns adults with hypertension and a different measurement schedule. The site therefore describes that evidence separately instead of carrying over the resting numbers. Its full methods were not available for appraisal here; the linked primary abstract is the access boundary, and uncertain evidence is left uncertain rather than filled with a borrowed estimate.",
					sources: ["schneider"]
				},
				{
					text: "A useful trial-reading example comes from Pinto et al.'s handgrip, walking and control study in older adults. Pressure fell within exercise groups at office visits, but the study did not detect between-group office superiority or ambulatory differences. This illustrates why before-and-after change alone is insufficient: the control group and uncertainty remain part of the question. It also illustrates why failure to detect a difference should not be described as proof of exact equivalence.",
					sources: ["pinto"]
				}
			]
		},
		{
			id: "dose-and-care",
			title: "Do not turn a fitted curve into a prescription",
			paragraphs: [
				{
					text: "Hu et al. modeled exercise dose using activity-compendium energy costs and protocol duration, with representative values where information was incomplete. The overall curve peaked around 1,200 MET-minutes per week, while modality-specific patterns differed and an isometric dose curve could not be estimated. The useful inference is that dose deserves study, not that every person should hit the same exact number. The peak is not a demonstrated boundary between ineffective, optimal and harmful exercise.",
					sources: ["hu"]
				},
				{
					text: "For routine home monitoring, measurement conditions need to be consistent. AHA guidance separates recent exercise from resting measurement and emphasizes a record of readings, not a selected post-workout low. The linked guidance can help readers discuss technique with their healthcare professional. Neither a comparison card nor a home reading should be used here to diagnose a condition, change medication or decide that follow-up is unnecessary. This guide explains research interpretation, not a personal treatment decision.",
					sources: ["aha"]
				}
			]
		}
	],
	questions: [
		"Was pressure measured at rest, over 24 hours, or during recovery?",
		"Was the result a between-group difference or only change within one group?",
		"Does the uncertainty support the headline rank?",
		"Is a dose recommendation being inferred from a fitted curve rather than directly tested?"
	],
	sources: [
		{
			id: "hu",
			title: "Hu et al. (2026): exercise modality and dose",
			url: "https://link.springer.com/article/10.1007/s40279-026-02521-5",
			kind: "Systematic review and Bayesian network meta-analysis",
			note: "Main full text and Table 2 checked; source authors' confidence assessments are not an independent site appraisal. CC BY 4.0; explanations adapted with attribution."
		},
		{
			id: "schneider",
			title: "Schneider et al. (2026): 24-hour ambulatory pressure",
			url: "https://pubmed.ncbi.nlm.nih.gov/42120187/",
			kind: "Network meta-analysis",
			note: "Primary abstract and disclosures checked, not full methods. Possible trial overlap with other reviews is not counted as independent replication."
		},
		{
			id: "pinto",
			title: "Pinto et al.: home-based isometric training trial",
			url: "https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/jgs.19213",
			kind: "Randomized trial",
			note: "2025 issue, first online 2024. Abstract, disclosures and supplement checked; main full report not appraised. LSP disclosed ownership of P3-EX LLC, which could benefit."
		},
		{
			id: "aha",
			title: "AHA: Home Blood Pressure Monitoring",
			url: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home",
			kind: "Institutional measurement guidance",
			note: "Official preparation and repeated-measurement guidance reviewed August 2025, not a clinical trial of exercise effectiveness."
		}
	]
};
