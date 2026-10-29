import type { CompleteSeedClaim } from "./claims.js";

export const editorialAuditPreparedAt = "2026-10-22T02:17:14.000Z";

export function refreshEditorialAuditClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.slug === "do-modest-minimum-wage-increases-always-cause-large-job-losses" && seed.topicSlug === "economics-and-social-policy") {
		return rewordClaim(seed, "How do modest minimum-wage increases affect jobs?", "Across many studied increases, average effects on jobs are small or hard to distinguish from zero, while pay rises for affected workers. Some groups, industries or places can see larger job losses. These findings do not mean that any size of increase is costless.");
	}
	if (seed.slug === "are-dietary-supplements-fda-approved-like-drugs" && seed.topicSlug === "nutrition-and-diet") {
		return rewordClaim(seed, "In the United States, are dietary supplements FDA-approved like drugs?", seed.bottomLine);
	}
	if (seed.topicSlug !== "health-and-medicine") return seed;
	if (seed.slug === "do-childhood-vaccines-cause-autism") {
		return rewordClaim(seed, seed.title, `No. ${seed.bottomLine}`);
	}
	if (seed.slug === "does-fluoride-in-community-drinking-water-prevent-tooth-decay-and-is-it-safe") {
		return {
			...seed,
			title: "Does community water fluoridation still help prevent tooth decay?",
			bottomLine: "It may provide a small extra benefit, but the size of that benefit today is uncertain. Evidence about preventing cavities is different from evidence about possible harms. Higher fluoride exposure has been linked to lower IQ in children; that does not establish the risk at the U.S. target of 0.7 mg/L.",
			evidenceCertainty: "low",
			stableCore: [
				"Modern studies suggest a smaller cavity-prevention benefit than older studies, when fluoride toothpaste was less widely used.",
				"The Cochrane review rates the contemporary evidence for additional cavity prevention as low certainty.",
				"The NTP review found an association between higher fluoride exposure and lower IQ in children. It did not establish the effect of water fluoridated at 0.7 mg/L."
			],
			openQuestions: [
				"How much additional cavity prevention does fluoridation provide in communities with different access to toothpaste and dental care?",
				"What are the effects of long-term total fluoride exposure at lower water concentrations, including during pregnancy and childhood?"
			],
			editorSummary: "Cavity prevention and possible developmental effects require separate evidence assessments.",
			uncertaintySummary: "The modern cavity-prevention estimate is uncertain. Associations at higher exposure do not prove either harm or safety at lower concentrations.",
			uncertaintyDrivers: [
				{ type: "imprecision", detail: "Contemporary cavity-prevention estimates are based on few studies and include the possibility of little additional benefit." },
				{ type: "indirectness", detail: "Water concentration and urinary fluoride are different exposure measures; total intake and exposure timing matter." }
			],
			evidenceSummaries: [
				{
					question: "How much extra cavity prevention is supported by contemporary evidence?",
					population: "Children in studies conducted since widespread use of fluoride toothpaste",
					finding: "Starting community water fluoridation may produce a small additional reduction in tooth decay.",
					effectDirection: "supports",
					certainty: "low",
					limitations: ["Few contemporary studies; uncertain effect size and applicability to other communities."]
				},
				{
					question: "What does the evidence establish about children's IQ?",
					population: "Children in observational studies with differing fluoride exposure",
					finding: "The 2025 meta-analysis reports inverse associations with IQ. The authors identify limited data and uncertainty below 1.5 mg/L when exposure is estimated from drinking water alone.",
					effectDirection: "unclear",
					limitations: ["Association is not proof of causation. Results for urinary fluoride cannot be read as the same concentration in drinking water.", "The NTP monograph and related meta-analysis overlap; they are not independent replications."]
				}
			],
			sources: [
				...seed.sources.map(source => source.title.startsWith("NTP Monograph")
					? { ...source, kind: "systematic_review" as const, note: "Systematic review of neurodevelopment and cognition. Higher-exposure associations do not establish effects at 0.7 mg/L; this review overlaps with the related 2025 meta-analysis." }
					: source),
				{
					kind: "meta_analysis",
					title: "Fluoride Exposure and Children's IQ Scores: A Systematic Review and Meta-Analysis",
					publisher: "JAMA Pediatrics",
					year: 2025,
					doi: "10.1001/jamapediatrics.2024.5542",
					url: "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2828425",
					stance: "context",
					appraisal: "not_appraised",
					note: "Original article text checked for exposure definitions and the lower-concentration limitation. No independent formal risk-of-bias assessment or exhaustive correction search was completed.",
					order: seed.sources.length + 1
				}
			],
			...preparationFields(seed)
		};
	}
	if (seed.slug === "are-nicotine-e-cigarettes-less-harmful-than-smoking-and-do-they-help-people-quit") {
		return {
			...seed,
			title: "Do nicotine e-cigarettes help adults stop smoking?",
			bottomLine: "Yes. Nicotine e-cigarettes help more adults stop smoking than nicotine replacement therapy in the trials reviewed by Cochrane. That finding does not make vaping harmless or establish its long-term safety. The evidence concerns people who already smoke, not a reason for young people or non-smokers to start.",
			evidenceCertainty: "high",
			stableCore: [
				"Cochrane finds high-certainty evidence of higher smoking-cessation rates with nicotine e-cigarettes than with nicotine replacement therapy.",
				"Completely replacing cigarettes reduces exposure to many chemicals produced by burning tobacco. Continuing to smoke while vaping is not the same change.",
				"England's NHS includes vaping among options for adults trying to stop smoking. That is jurisdiction-specific guidance, not a declaration that vaping is harmless."
			],
			evidenceSummaries: [
				{
					question: "Do nicotine e-cigarettes improve smoking cessation compared with nicotine replacement therapy?",
					population: "Adults who smoke and participate in cessation trials",
					finding: "Cochrane reports higher quit rates with nicotine e-cigarettes.",
					effectDirection: "supports",
					certainty: "high",
					limitations: ["Results concern the products and support studied, not every device or every person's chance of quitting."]
				},
				{
					question: "Is long-term vaping harmless?",
					finding: "Stopping smoking and establishing long-term vaping safety are different outcomes. Longer and larger studies are needed to characterize harms.",
					effectDirection: "unclear",
					limitations: ["Shorter cessation trials cannot settle effects over decades.", "Youth, non-smokers, pregnancy, and unregulated products require separate assessment."]
				}
			],
			editorSummary: "Evidence for stopping smoking is stronger than evidence establishing long-term vaping safety.",
			uncertaintySummary: "The cessation comparison has high-certainty evidence. Long-term safety, newer devices and outcomes outside adult smoking cessation remain separate uncertainties.",
			sources: [
				...seed.sources.map(source => source.kind === "systematic_review"
					? {
							...source,
							year: 2026,
							doi: "10.1002/14651858.CD010216.pub11",
							citationCheckedAt: undefined,
							note: "The August 2026 living review supports the cessation comparison. Its safety findings do not establish absence of long-term harm. The review's certainty assessment is not a separate GRADE assessment performed by this site."
						}
					: source),
				{
					kind: "guideline",
					title: "Vaping to quit smoking",
					publisher: "NHS England",
					url: "https://www.nhs.uk/better-health/quit-smoking/ready-to-quit-smoking/vaping-to-quit-smoking/",
					stance: "context",
					appraisal: "not_appraised",
					note: "England-specific public guidance includes vaping as a smoking-cessation option while explaining that it is not risk-free. This guidance is not an independent clinical trial.",
					order: seed.sources.length + 1
				}
			],
			...preparationFields(seed)
		};
	}
	return seed;
}

function rewordClaim(seed: CompleteSeedClaim, title: string, bottomLine: string): CompleteSeedClaim {
	return {
		...seed,
		title,
		bottomLine,
		evidenceSummaries: seed.evidenceSummaries.map(summary =>
			summary.question === seed.title && summary.finding === seed.bottomLine
			&& summary.population?.startsWith("Public-facing summary built from")
				? { ...summary, question: title, finding: bottomLine }
				: summary
		),
		changeLog: [
			...seed.changeLog,
			{
				date: editorialAuditPreparedAt,
				kind: "update",
				summary: "Clarified the question or lead answer without changing the source set or scientific conclusion."
			}
		]
	};
}

function preparationFields(seed: CompleteSeedClaim) {
	return {
		reviewMode: "living" as const,
		searchDatabases: ["Consensus: targeted discovery", "Original publisher and public-health source pages"],
		searchCutoffAt: editorialAuditPreparedAt,
		appraisalTools: ["Targeted source and scope checks; no independent formal risk-of-bias or GRADE assessment."],
		authorLine: "Research summary prepared with AI assistance.",
		reviewerLine: "Selected source text checked by an AI agent. Independent expert review has not been completed.",
		coiSummary: "A complete funding and conflict-of-interest assessment has not been completed.",
		surveillanceSpec: {
			...seed.surveillanceSpec,
			cadenceDays: 90,
			focus: "New evidence or guidance that changes the outcome-specific answer"
		},
		changeLog: [
			...seed.changeLog,
			{
				date: editorialAuditPreparedAt,
				kind: "update" as const,
				summary: "Separated outcomes with different certainty, clarified the question, and added source and jurisdiction context. Preparation was AI-assisted, not independent expert review."
			}
		]
	};
}
