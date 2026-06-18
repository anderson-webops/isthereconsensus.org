export const EVIDENCE_LANDSCAPE_SUPPORT_LABELS = [
	"well_supported",
	"supported_with_limitations",
	"mixed_or_contested",
	"insufficient_evidence",
	"unlikely_or_unsupported",
	"unresolved"
] as const;

export const EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS = [
	"high",
	"moderate",
	"low",
	"very_low",
	"not_assessable"
] as const;

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

export const EVIDENCE_LANDSCAPE_SCHEMA_VERSION = 1;
