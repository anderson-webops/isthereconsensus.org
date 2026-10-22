import type { IClaim } from "../models/schemas/Claim.js";
import { legacyAppraisalTools, legacyExclusionRules, legacyInclusionRules } from "../data/legacyResearchDefaults.js";

const legacyReviewer = "Reviewed for evidence quality, scope, and plain-language accuracy.";
const legacyAuthors = new Set(["Prepared by the Is There Consensus editorial desk.", "Is There Consensus editorial seed"]);
const legacyConflicts = "No conflicts of interest were disclosed for this seeded claim page.";

function matchesTemplate(values: string[] | undefined, template: string[]) {
	return values?.length === template.length && values.every((value, index) => value.trim() === template[index]);
}

export function researchIntegrityFields<ClaimType extends Partial<Pick<IClaim, "inclusionRules" | "exclusionRules" | "appraisalTools" | "reviewerLine" | "authorLine" | "coiSummary">>>(claim: ClaimType, topicSlug: string): ClaimType {
	const fields = {
		inclusionRules: matchesTemplate(claim.inclusionRules, legacyInclusionRules({ topicSlug })) ? [] : claim.inclusionRules,
		exclusionRules: matchesTemplate(claim.exclusionRules, legacyExclusionRules({ topicSlug })) ? [] : claim.exclusionRules,
		appraisalTools: matchesTemplate(claim.appraisalTools, legacyAppraisalTools(topicSlug)) ? [] : claim.appraisalTools,
		authorLine: legacyAuthors.has(claim.authorLine ?? "") ? "Is There Consensus" : claim.authorLine,
		reviewerLine: claim.reviewerLine === legacyReviewer ? "The review method and reviewer were not recorded. Independent expert review is not documented." : claim.reviewerLine,
		coiSummary: claim.coiSummary === legacyConflicts ? "A complete funding and conflict-of-interest assessment was not recorded." : claim.coiSummary
	};
	return {
		...claim,
		...Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== undefined))
	} as ClaimType;
}

export function researchPreparation(claim: Pick<Partial<IClaim>, "authorLine" | "reviewerLine">) {
	const aiAssisted = /\bAI[- ]assist|\bAI agent\b|with AI assistance/i.test(`${claim.authorLine ?? ""} ${claim.reviewerLine ?? ""}`);
	return {
		method: aiAssisted ? "ai_assisted" as const : "not_recorded" as const,
		label: aiAssisted ? "AI-assisted research summary" : "Preparation method not recorded",
		independentExpertReview: "not_recorded" as const
	};
}

export function individualResearchFields<ClaimType extends Partial<Pick<IClaim, "inclusionRules" | "exclusionRules" | "appraisalTools" | "reviewerLine" | "authorLine" | "coiSummary">>>(claim: ClaimType, topicSlug: string): ClaimType {
	const recorded = researchIntegrityFields(claim, topicSlug);
	const specific = (values: string[] | undefined, template: string[]) => values?.filter(value => !template.includes(value.trim()));
	return {
		...recorded,
		...(recorded.inclusionRules ? { inclusionRules: specific(recorded.inclusionRules, [...legacyInclusionRules({ topicSlug }), ...legacyInclusionRules({ topicSlug: "" })]) } : {}),
		...(recorded.exclusionRules ? { exclusionRules: specific(recorded.exclusionRules, [...legacyExclusionRules({ topicSlug }), ...legacyExclusionRules({ topicSlug: "" })]) } : {}),
		...(recorded.appraisalTools ? { appraisalTools: specific(recorded.appraisalTools, [...legacyAppraisalTools(topicSlug), ...legacyAppraisalTools("")]) } : {})
	};
}

export function isRevisionCommentary(summary?: string) {
	return /^(?:(?:this|the) (?:update|refresh|revision|earlier|previous|initial|original)|(?:updated|refreshed|revised|expanded|rewritten) (?:to|with|from|after|for)|replaces? (?:the|an?|earlier)|the (?:page|review) (?:previously|originally))/i.test(summary?.trim() ?? "");
}
