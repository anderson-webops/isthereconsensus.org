import type { ReadingGuideContent } from "./types";

export const vaccinesGuide: ReadingGuideContent = {
	takeaway:
		"Vaccine benefits and harms can both be studied without assuming either perfect safety or hidden catastrophe. Compare a specific vaccine, outcome, population, and time period; distinguish reported events from established causal risks.",
	scope: "Evidence literacy using childhood MMR as a worked example and US safety reporting as context. This is not a current vaccination schedule or an individual eligibility assessment. Discuss contraindications and personal circumstances with a qualified clinician.",
	sections: [
		{
			id: "specific-outcomes",
			title: "Start with a disease and an outcome",
			paragraphs: [
				{
					text: "‘Does the vaccine work?’ needs a more specific endpoint. Preventing measles, preventing mumps, and reducing transmission are different questions even when the vaccine contains several components. Cochrane's 2021 review found high effectiveness against measles: about 95% after one dose and 96% after two in the included cohort studies, with moderate-certainty evidence. Those estimates describe the reviewed studies, not an exact guarantee for every exposure or a universal figure for all vaccines.",
					sources: ["cochrane"]
				}
			]
		},
		{
			id: "real-risks",
			title: "Acknowledging a real risk does not validate every allegation",
			paragraphs: [
				{
					text: "The same review found evidence of some harms, including febrile seizures and a rare platelet disorder, while not finding an association between MMR and autism. For that platelet disorder, risk was lower after vaccination than after natural infection. A useful assessment distinguishes outcomes and formulations, and compares disease risks too. ‘Safe’ does not mean zero risk, and evidence for one adverse effect does not establish unrelated allegations.",
					sources: ["cochrane"]
				}
			]
		},
		{
			id: "reports-and-causes",
			title: "A report starts an investigation; it does not finish one",
			paragraphs: [
				{
					text: "The US Vaccine Adverse Event Reporting System accepts reports of significant events after vaccination even when the reporter does not know whether vaccination caused them. That broad reporting is intentional: it helps identify possible safety signals. A report can describe a real and distressing event while leaving its cause unresolved. Timing alone cannot distinguish a vaccine reaction from an illness that would have happened anyway.",
					sources: ["fda"]
				},
				{
					text: "FDA states that VAERS reports generally cannot establish causation. Signals can prompt additional studies, including systems with different designs and better ability to assess possible risks. Treating a count of reports as a count of proven injuries skips that work. Treating the system as useless makes the opposite mistake: its role is to raise questions that can be tested, not to deliver a final causal verdict on every report.",
					sources: ["fda"]
				}
			]
		},
		{
			id: "autism-evidence",
			title: "The autism conclusion rests on comparative evidence",
			paragraphs: [
				{
					text: "A Danish registry study followed 657,461 children and found no increased autism risk after MMR vaccination, including analyses of children with elevated background risk and of periods after vaccination. Its adjusted hazard ratio was 0.93, with a 95% confidence interval of 0.85-1.02. That is not evidence that vaccination prevents autism; it is a result consistent with no increased risk. The study was observational and did not individually review medical charts.",
					sources: ["danish"]
				},
				{
					text: "WHO's vaccine-safety committee reassessed the broader literature in 2025 and reaffirmed that childhood vaccines do not cause autism. Its assessment included research published through August 2025. The important point is convergence across studies and settings, not a vote over anecdotes. Autism's causes and support needs remain important research questions, but that does not make a repeatedly tested vaccine explanation equally plausible.",
					sources: ["who"]
				}
			]
		},
		{
			id: "reading-numbers",
			title: "Ask what sits underneath a large number",
			paragraphs: [
				{
					text: "An original reading exercise: imagine a headline listing 100 events after an intervention. Before judging it, ask how many people received it, how long they were observed, how often the event normally occurs, and whether a comparable group had fewer events. These are hypothetical numbers, not vaccine data. The point is to identify the missing comparison before converting a sequence of events into an explanation of their cause.",
					sources: []
				},
				{
					text: "Extend that hypothetical example: 100 events among 100,000 recipients and 90 among 100,000 comparison participants over the same period gives an observed difference of 10 per 100,000, not 100. Even that difference is not automatically caused by the intervention. Group comparability, event definitions, and how events were detected still need to be examined before calling it an excess caused by treatment.",
					sources: []
				}
			]
		}
	],
	questions: [
		"Which vaccine, formulation, outcome, and age group does the claim concern?",
		"Is the number a report, a confirmed event, or an estimated causal excess?",
		"What is the disease-risk comparison over the same period?",
		"Do several independent studies support the conclusion, and what remains uncertain?"
	],
	sources: [
		{
			id: "cochrane",
			title: "Cochrane (2021): Vaccines for measles, mumps, rubella, and varicella in children",
			url: "https://www.cochrane.org/evidence/CD004407_does-measles-mumps-rubella-and-varicella-mmrv-vaccine-protect-children-and-does-it-cause-harmful",
			kind: "Systematic review",
			note: "Public summary and abstract checked. Effectiveness and harms differ by outcome and formulation; this is not a current dosing schedule."
		},
		{
			id: "fda",
			title: "FDA: Vaccine Adverse Event Reporting System questions and answers",
			url: "https://www.fda.gov/vaccines-blood-biologics/vaccine-adverse-events/vaccine-adverse-event-reporting-system-vaers-questions-and-answers",
			kind: "Safety surveillance guidance",
			note: "Reporting purpose, causal limitations, and follow-up safety systems checked. Reported events are not automatically established vaccine reactions."
		},
		{
			id: "danish",
			title: "Hviid et al. (2019): MMR vaccination and autism",
			url: "https://pubmed.ncbi.nlm.nih.gov/30831578/",
			kind: "Nationwide cohort study",
			note: "Primary abstract checked through Europe PMC. Registry-based observational evidence, with adjusted comparisons rather than randomized exposure."
		},
		{
			id: "who",
			title: "WHO (2025): Vaccine-safety committee reassessment of autism evidence",
			url: "https://www.who.int/news/item/11-12-2025-who-expert-group-s-new-analysis-reaffirms-there-is-no-link-between-vaccines-and-autism",
			kind: "Expert committee assessment summary",
			note: "December 2025 institutional statement checked. The committee synthesis is distinguished from the individual Danish cohort."
		}
	]
};
