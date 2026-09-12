// Pure presentation policy shared by the API, reader UI and editorial queue.
// Dates describe records, not the validity or certainty of a scientific claim.
export type ReviewDateBasis = "source_record" | "editorial_review" | "unspecified";
export type ReviewState = "source_notice" | "update_requested" | "due" | "dates_need_verification" | "provenance_unknown" | "scheduled" | "unscheduled";

type DateInput = Date | string | undefined | null;
export interface ReviewStatusInput {
	status?: string;
	reviewDateBasis?: ReviewDateBasis;
	lastReviewedAt?: DateInput;
	searchCutoffAt?: DateInput;
	nextReviewAt?: DateInput;
	lastRetractionCheckAt?: DateInput;
}
export interface ReviewSourceInput {
	citationStatus?: string;
	citationCheckedAt?: DateInput;
	evidenceProfile?: {
		publicationIntegrity?: {
			retracted?: boolean;
			expressionOfConcern?: boolean;
			correctionOrErratum?: boolean;
		};
	};
}

export function recordedDate(value: DateInput): string | undefined {
	if (!value) return undefined;
	if (typeof value === "string") {
		// Reject loose browser parsing and calendar rollovers such as February 30.
		if (!/^\d{4}-\d{2}-\d{2}(?:T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?Z)?$/.test(value)) return undefined;
		const day = new Date(value.slice(0, 10));
		if (!Number.isFinite(day.getTime()) || day.toISOString().slice(0, 10) !== value.slice(0, 10)) return undefined;
	}
	const date = new Date(value);
	return Number.isFinite(date.getTime()) ? date.toISOString() : undefined;
}

export function claimReviewStatus(claim: ReviewStatusInput, sources: ReviewSourceInput[] = [], now = new Date()) {
	const evaluatedAt = now.toISOString();
	const issues: string[] = [];
	function pastDate(value: DateInput, label: string) {
		const date = recordedDate(value);
		if (value && (!date || date > evaluatedAt)) {
			issues.push(`${label} needs verification.`);
			return undefined;
		}
		return date;
	}
	const reviewedAt = pastDate(claim.lastReviewedAt, "The review date");
	const searchCutoffAt = pastDate(claim.searchCutoffAt, "The literature cutoff");
	const integrityRecordedAt = pastDate(claim.lastRetractionCheckAt, "The claim-level source check date");
	const nextReviewAt = recordedDate(claim.nextReviewAt);
	if (claim.nextReviewAt && !nextReviewAt) issues.push("The next review date needs verification.");
	if (reviewedAt && searchCutoffAt && searchCutoffAt.slice(0, 10) > reviewedAt.slice(0, 10)) {
		issues.push("The literature cutoff is later than the recorded review date.");
	}
	if (reviewedAt && nextReviewAt && nextReviewAt < reviewedAt) {
		issues.push("The next review date precedes the recorded review date.");
	}
	const sourceDates = sources
		.map(source => recordedDate(source.citationCheckedAt))
		.filter((date): date is string => Boolean(date && date <= evaluatedAt))
		.sort();
	const flaggedSourceCount = sources.filter((source) => {
		const integrity = source.evidenceProfile?.publicationIntegrity;
		return (
			["retracted", "expression_of_concern", "corrected"].includes(source.citationStatus ?? "")
			|| integrity?.retracted
			|| integrity?.expressionOfConcern
			|| integrity?.correctionOrErratum
		);
	}).length;
	const basis: ReviewDateBasis = ["source_record", "editorial_review"].includes(claim.reviewDateBasis ?? "")
		? claim.reviewDateBasis!
		: "unspecified";
	const due = Boolean(nextReviewAt && nextReviewAt <= evaluatedAt);
	const state: ReviewState
		= flaggedSourceCount > 0
			? "source_notice"
			: claim.status === "needs_update"
				? "update_requested"
				: due
					? "due"
					: issues.length
						? "dates_need_verification"
						: !reviewedAt || basis === "unspecified"
								? "provenance_unknown"
								: nextReviewAt
									? "scheduled"
									: "unscheduled";
	return {
		evaluatedAt,
		state,
		basis,
		reviewedAt,
		searchCutoffAt,
		nextReviewAt,
		integrityRecordedAt,
		issues,
		flaggedSourceCount,
		sourceChecks: {
			total: sources.length,
			recorded: sourceDates.length,
			oldest: sourceDates[0],
			latest: sourceDates.at(-1)
		}
	};
}

export type ClaimReviewStatus = ReturnType<typeof claimReviewStatus>;
