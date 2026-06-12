import type { IClaim } from "../models/schemas/Claim.js";
import type { ClaimSourceKind, IClaimSource } from "../models/schemas/ClaimSource.js";

export interface PublicClaimSourceReadinessCounts {
	sourceCount: number;
	linkedSourceCount: number;
	decisionWeightSourceCount: number;
}

export interface PublicClaimReadiness {
	isReady: boolean;
	missing: string[];
}

export const emptyPublicClaimSourceReadinessCounts: PublicClaimSourceReadinessCounts = {
	sourceCount: 0,
	linkedSourceCount: 0,
	decisionWeightSourceCount: 0
};

export const decisionWeightSourceKinds = new Set<ClaimSourceKind>([
	"consensus_statement",
	"guideline",
	"landmark_study",
	"meta_analysis",
	"systematic_review"
]);

function hasText(value: unknown): boolean {
	return typeof value === "string" && value.trim().length > 0;
}

function hasAtLeast(value: unknown, minimum: number): boolean {
	return Array.isArray(value) && value.length >= minimum;
}

function hasDateLikeValue(value: unknown): boolean {
	if (!value) return false;
	const date = value instanceof Date ? value : new Date(String(value));
	return !Number.isNaN(date.getTime());
}

export function sourceHasPublicLink(source: Pick<IClaimSource, "doi" | "pmcid" | "pmid" | "url">): boolean {
	return [source.url, source.doi, source.pmid, source.pmcid].some(hasText);
}

export function summarizeClaimSourceReadiness(
	sources: Array<Pick<IClaimSource, "doi" | "kind" | "pmcid" | "pmid" | "url">>
): PublicClaimSourceReadinessCounts {
	return sources.reduce<PublicClaimSourceReadinessCounts>(
		(counts, source) => ({
			sourceCount: counts.sourceCount + 1,
			linkedSourceCount: counts.linkedSourceCount + (sourceHasPublicLink(source) ? 1 : 0),
			decisionWeightSourceCount:
				counts.decisionWeightSourceCount + (decisionWeightSourceKinds.has(source.kind) ? 1 : 0)
		}),
		{ ...emptyPublicClaimSourceReadinessCounts }
	);
}

export function getPublicClaimReadiness(
	claim: Partial<IClaim>,
	sourceCounts: PublicClaimSourceReadinessCounts
): PublicClaimReadiness {
	const missing: string[] = [];

	if (claim.status !== "published") missing.push("published status");
	if (!hasText(claim.title)) missing.push("title");
	if (!hasText(claim.bottomLine)) missing.push("bottom line");
	if (!hasText(claim.editorSummary)) missing.push("editor summary");
	if (!hasText(claim.uncertaintySummary)) missing.push("uncertainty summary");
	if (!hasAtLeast(claim.stableCore, 2)) missing.push("stable core bullets");
	if (!hasAtLeast(claim.openQuestions, 1)) missing.push("open questions");
	if (!hasAtLeast(claim.evidenceSummaries, 1)) missing.push("outcome evidence summaries");
	if (!hasAtLeast(claim.changeLog, 1)) missing.push("change log");
	if (!hasDateLikeValue(claim.lastReviewedAt)) missing.push("review date");
	if (!hasDateLikeValue(claim.publishedAt)) missing.push("publication date");
	if (sourceCounts.sourceCount < 2) missing.push("source stack");
	if (sourceCounts.linkedSourceCount < 2) missing.push("linked sources");
	if (sourceCounts.decisionWeightSourceCount < 1) missing.push("decision-weight source");

	return {
		isReady: missing.length === 0,
		missing
	};
}
