import type { ReadingGuideContent } from "./types";

export const medicalEvidenceGuide: ReadingGuideContent = {
	takeaway:
		"A useful medical finding tells you who was studied, what was compared, which outcome changed, and how certain the estimate is. Relative effects, statistical significance, and promising biomarkers cannot answer all of those questions on their own.",
	scope: "A guide to reading evidence, not a tool for diagnosing illness or choosing treatment. The numerical examples are invented for explanation. Individual decisions also depend on harms, preferences, feasibility, and advice from a qualified healthcare professional.",
	sections: [
		{
			id: "the-question",
			title: "Write down the comparison before reading the headline",
			paragraphs: [
				{
					text: "Cochrane frames applicability around the population, intervention, comparison, and outcome. A finding about symptom relief in severely affected adults does not automatically answer a question about prevention in healthy children. Ask what participants actually received, what the comparison group received, and whether the outcome matters to the intended reader. A study can be well conducted and still answer a different question from the one you need answered.",
					sources: ["interpretation"]
				}
			]
		},
		{
			id: "absolute-risk",
			title: "Put the denominator back into the result",
			paragraphs: [
				{
					text: "An original, hypothetical example: over the same follow-up period, an event happens to 20 of every 1,000 people in one group and 10 of every 1,000 in another. That is a 50% relative reduction, but an absolute reduction of 10 per 1,000, or one percentage point. Both descriptions are mathematically correct. Neither tells you the balance of benefit and harm without knowing what the event was and what other outcomes changed.",
					sources: []
				},
				{
					text: "Now change the invented baseline to two events per 1,000 and the comparison to one per 1,000. The relative reduction is still 50%, but the absolute difference is only one per 1,000. This arithmetic does not predict any treatment's effects. It demonstrates why two identical relative headlines can describe quite different practical benefits, and why a time period and starting risk should travel with a risk claim.",
					sources: []
				}
			]
		},
		{
			id: "precision",
			title: "A small P value is not a large benefit",
			paragraphs: [
				{
					text: "Statistical significance does not measure clinical importance. Cochrane recommends considering the effect estimate and confidence interval rather than sorting findings into a simple significant-or-not verdict. A wide interval may leave both worthwhile benefit and little benefit plausible. A narrow interval can describe a precisely estimated but unimportant difference. Confidence intervals address statistical precision under the analysis assumptions; they do not include every uncertainty from bias or applying the result to different people.",
					sources: ["interpretation"]
				}
			]
		},
		{
			id: "certainty",
			title: "Certainty belongs to an outcome, not a popularity score",
			paragraphs: [
				{
					text: "GRADE rates confidence in a body of evidence for a particular outcome as high, moderate, low, or very low. Cochrane describes concerns about bias, inconsistent findings, indirectness, imprecision, and missing evidence as reasons certainty may fall. These judgments should have explanations. A label is not a percentage of scientists who agree, and one study does not receive a single permanent seal that settles every outcome it measured. Evidence for symptom improvement can be stronger than evidence for rare harms.",
					sources: ["grade"]
				}
			]
		},
		{
			id: "surrogates",
			title: "A better measurement may not mean a better life",
			paragraphs: [
				{
					text: "FDA distinguishes a clinical outcome, such as how a person feels, functions, or survives, from a surrogate used to predict benefit. A laboratory value or imaging measurement can be informative without itself being the benefit a patient wants. Some surrogates are well validated for a particular use; others remain candidates. The necessary question is whether changing this marker with this intervention reliably predicts the claimed clinical improvement in the relevant setting, not whether all biomarkers are good or bad.",
					sources: ["fda"]
				}
			]
		},
		{
			id: "missing-evidence",
			title: "A synthesis is only as complete as the evidence it can find",
			paragraphs: [
				{
					text: "A meta-analysis can be biased when whole studies or particular results are unavailable because of their findings. Cochrane therefore considers selective non-reporting, trial records, and other evidence beyond the easily found published papers. Combining studies does not automatically remove the biases they share. Nor is an asymmetric funnel plot proof of publication bias: several explanations are possible. Look for a transparent search, reasons for exclusions, and discussion of what missing results could change.",
					sources: ["missing"]
				}
			]
		}
	],
	questions: [
		"Who was studied, compared with what, and for how long?",
		"What are the absolute benefit and harms, not only the relative effect?",
		"Does the result concern a patient-important outcome or a surrogate?",
		"How certain is each outcome, and could missing evidence change the conclusion?"
	],
	sources: [
		{
			id: "interpretation",
			title: "Cochrane Handbook, chapter 15: Interpreting results",
			url: "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-15",
			kind: "Evidence-synthesis methods",
			note: "Applicability, precision, and effect interpretation sections checked. The numerical examples in this guide are original and hypothetical."
		},
		{
			id: "grade",
			title: "Cochrane Handbook, chapter 14: Certainty of evidence",
			url: "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-14",
			kind: "Evidence-grading methods",
			note: "Outcome-specific GRADE categories and downgrading considerations checked. This guide does not independently grade a treatment."
		},
		{
			id: "fda",
			title: "FDA: Surrogate endpoint resources",
			url: "https://www.fda.gov/drugs/development-resources/surrogate-endpoint-resources-drug-and-biologic-development",
			kind: "Regulatory methods explanation",
			note: "Clinical versus surrogate endpoints and validation categories checked. Validation is specific to the proposed use and benefit."
		},
		{
			id: "missing",
			title: "Cochrane Handbook, chapter 13: Bias from missing evidence",
			url: "https://www.cochrane.org/authors/handbooks-and-manuals/handbook/current/chapter-13",
			kind: "Evidence-synthesis methods",
			note: "Selective non-reporting and funnel-plot limitations checked. A systematic review does not automatically eliminate source-study bias."
		}
	]
};
