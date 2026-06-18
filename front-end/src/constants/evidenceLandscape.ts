export const EVIDENCE_LANDSCAPE_SUPPORT_LABELS = [
	"well_supported",
	"supported_with_limitations",
	"mixed_or_contested",
	"insufficient_evidence",
	"unlikely_or_unsupported",
	"unresolved"
] as const;

export const EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS = ["high", "moderate", "low", "very_low", "not_assessable"] as const;

export const EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS = [
	"strong",
	"broad",
	"qualified",
	"divided",
	"insufficient_field",
	"not_assessable"
] as const;

export const EVIDENCE_LANDSCAPE_WORKFLOW_STATUSES = [
	"not_started",
	"in_review",
	"ready_for_review",
	"published",
	"retired"
] as const;

export type EvidenceLandscapeSupportLabel = (typeof EVIDENCE_LANDSCAPE_SUPPORT_LABELS)[number];
export type EvidenceLandscapeCertaintyLevel = (typeof EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS)[number];
export type EvidenceLandscapeExpertAgreement = (typeof EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS)[number];
export type EvidenceLandscapeWorkflowStatus = (typeof EVIDENCE_LANDSCAPE_WORKFLOW_STATUSES)[number];

export function formatLandscapeSupportLabel(value?: EvidenceLandscapeSupportLabel) {
	if (value === "well_supported") return "Well supported";
	if (value === "supported_with_limitations") return "Supported with limitations";
	if (value === "mixed_or_contested") return "Mixed or contested";
	if (value === "insufficient_evidence") return "Insufficient evidence";
	if (value === "unlikely_or_unsupported") return "Unlikely or unsupported";
	return "Unresolved";
}

export function formatLandscapeCertaintyLabel(value?: EvidenceLandscapeCertaintyLevel) {
	if (value === "high") return "High certainty";
	if (value === "moderate") return "Moderate certainty";
	if (value === "low") return "Low certainty";
	if (value === "very_low") return "Very low certainty";
	return "Not assessable";
}

export function formatLandscapeExpertAgreementLabel(value?: EvidenceLandscapeExpertAgreement) {
	if (value === "strong") return "Strong expert agreement";
	if (value === "broad") return "Broad expert agreement";
	if (value === "qualified") return "Qualified agreement";
	if (value === "divided") return "Divided expert interpretation";
	if (value === "insufficient_field") return "Field too thin to assess";
	return "Not assessable";
}

export function formatLandscapeWorkflowStatus(value?: EvidenceLandscapeWorkflowStatus) {
	if (value === "in_review") return "In review";
	if (value === "ready_for_review") return "Ready for review";
	if (value === "published") return "Published";
	if (value === "retired") return "Retired";
	return "Not started";
}
