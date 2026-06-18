export const EVIDENCE_LANDSCAPE_SUPPORT_LABELS = [
	"strong_consensus",
	"broad_agreement_with_caveats",
	"active_expert_debate",
	"thin_evidence",
	"unresolved",
	"unsupported_fringe"
] as const;

export const EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS = ["high", "moderate", "low", "very_low", "not_assessable"] as const;

export const EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS = [
	"high",
	"moderate",
	"low",
	"mixed",
	"not_assessable"
] as const;

export const EVIDENCE_LANDSCAPE_DIRECTIONS = [
	"strongly_supports_claim",
	"mostly_supports_claim",
	"mixed_or_context_dependent",
	"mostly_opposes_claim",
	"strongly_opposes_claim",
	"insufficient_evidence",
	"not_applicable"
] as const;

export const EVIDENCE_SOURCE_POSITION_BUCKETS = [
	"supports_claim",
	"supports_with_caveats",
	"opposes_claim",
	"inconclusive_or_mixed",
	"background_context",
	"excluded_low_quality",
	"excluded_retracted",
	"excluded_fringe",
	"not_coded"
] as const;

export const EVIDENCE_TIERS = [
	"tier_1_synthesis_or_guideline",
	"tier_2_high_quality_primary",
	"tier_3_observational_or_modeling",
	"tier_4_mechanistic_or_preclinical",
	"tier_5_commentary_or_low_quality",
	"tier_6_retracted_or_invalid",
	"not_coded"
] as const;

export const EVIDENCE_STUDY_DESIGNS = [
	"systematic_review",
	"meta_analysis",
	"living_review",
	"evidence_based_guideline",
	"consensus_statement",
	"randomized_trial",
	"non_randomized_trial",
	"cohort_study",
	"case_control_study",
	"cross_sectional_study",
	"case_series",
	"ecological_study",
	"mechanistic_human",
	"animal_study",
	"in_vitro_study",
	"modeling_study",
	"expert_commentary",
	"news_or_secondary_reporting",
	"retracted_or_expression_of_concern",
	"other",
	"not_coded"
] as const;

export const EVIDENCE_RISK_OF_BIAS_LEVELS = ["low", "some_concerns", "high", "critical", "not_assessed"] as const;

export const EVIDENCE_DIRECTNESS_LEVELS = ["direct", "partially_direct", "indirect", "not_assessed"] as const;

export const EVIDENCE_CONSISTENCY_LEVELS = [
	"consistent_with_body",
	"partly_consistent",
	"inconsistent_with_body",
	"not_assessed"
] as const;

export const EVIDENCE_PRECISION_LEVELS = ["precise", "imprecise", "not_applicable", "not_assessed"] as const;

export const EVIDENCE_SOURCE_EXCLUSION_REASONS = [
	"",
	"not_relevant_to_claim",
	"wrong_population",
	"wrong_exposure_or_intervention",
	"wrong_outcome",
	"superseded_by_better_evidence",
	"low_quality",
	"high_risk_of_bias",
	"retracted",
	"pseudoscientific_or_fringe",
	"duplicate",
	"background_only",
	"other"
] as const;

export const EVIDENCE_LANDSCAPE_WORKFLOW_STATUSES = [
	"not_started",
	"draft",
	"ready_for_review",
	"changes_requested",
	"approved",
	"published",
	"stale",
	"superseded"
] as const;

export const EVIDENCE_CLAIM_TYPES = [
	"causal",
	"intervention",
	"diagnostic",
	"prognostic",
	"prevalence",
	"mechanistic",
	"risk_factor",
	"descriptive",
	"policy_relevant_science",
	"other"
] as const;

export const EVIDENCE_BOUNDARY_DIMENSIONS = [
	"population",
	"age_group",
	"sex_or_gender",
	"dose_or_exposure_level",
	"duration",
	"geography",
	"time_period",
	"species_or_model",
	"outcome_definition",
	"measurement_method",
	"setting",
	"other"
] as const;

export type EvidenceLandscapeSupportLabel = (typeof EVIDENCE_LANDSCAPE_SUPPORT_LABELS)[number];
export type EvidenceLandscapeCertaintyLevel = (typeof EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS)[number];
export type EvidenceLandscapeExpertAgreement = (typeof EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS)[number];
export type EvidenceLandscapeWorkflowStatus = (typeof EVIDENCE_LANDSCAPE_WORKFLOW_STATUSES)[number];
export type EvidenceLandscapeDirection = (typeof EVIDENCE_LANDSCAPE_DIRECTIONS)[number];
export type EvidenceClaimType = (typeof EVIDENCE_CLAIM_TYPES)[number];
export type EvidenceBoundaryDimension = (typeof EVIDENCE_BOUNDARY_DIMENSIONS)[number];
export type EvidenceSourcePositionBucket = (typeof EVIDENCE_SOURCE_POSITION_BUCKETS)[number];
export type EvidenceTier = (typeof EVIDENCE_TIERS)[number];
export type EvidenceStudyDesign = (typeof EVIDENCE_STUDY_DESIGNS)[number];
export type EvidenceRiskOfBiasLevel = (typeof EVIDENCE_RISK_OF_BIAS_LEVELS)[number];
export type EvidenceDirectnessLevel = (typeof EVIDENCE_DIRECTNESS_LEVELS)[number];
export type EvidenceConsistencyLevel = (typeof EVIDENCE_CONSISTENCY_LEVELS)[number];
export type EvidencePrecisionLevel = (typeof EVIDENCE_PRECISION_LEVELS)[number];
export type EvidenceSourceExclusionReason = (typeof EVIDENCE_SOURCE_EXCLUSION_REASONS)[number];

export function formatLandscapeSupportLabel(value?: EvidenceLandscapeSupportLabel) {
	if (value === "strong_consensus") return "Strong consensus";
	if (value === "broad_agreement_with_caveats") return "Broad agreement with caveats";
	if (value === "active_expert_debate") return "Active expert debate";
	if (value === "thin_evidence") return "Thin evidence";
	if (value === "unsupported_fringe") return "Unsupported or fringe";
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
	if (value === "high") return "High expert agreement";
	if (value === "moderate") return "Moderate expert agreement";
	if (value === "low") return "Low expert agreement";
	if (value === "mixed") return "Mixed expert interpretation";
	return "Not assessable";
}

export function formatLandscapeDirectionLabel(value?: EvidenceLandscapeDirection) {
	if (value === "strongly_supports_claim") return "Strongly supports the claim";
	if (value === "mostly_supports_claim") return "Mostly supports the claim";
	if (value === "mixed_or_context_dependent") return "Mixed or context dependent";
	if (value === "mostly_opposes_claim") return "Mostly opposes the claim";
	if (value === "strongly_opposes_claim") return "Strongly opposes the claim";
	if (value === "insufficient_evidence") return "Insufficient evidence";
	return "Not applicable";
}

export function formatLandscapeWorkflowStatus(value?: EvidenceLandscapeWorkflowStatus) {
	if (value === "draft") return "Draft";
	if (value === "ready_for_review") return "Ready for review";
	if (value === "changes_requested") return "Changes requested";
	if (value === "approved") return "Approved";
	if (value === "published") return "Published";
	if (value === "stale") return "Stale";
	if (value === "superseded") return "Superseded";
	return "Not started";
}

export function formatEvidenceTierLabel(value?: EvidenceTier) {
	if (value === "tier_1_synthesis_or_guideline") return "Tier 1 synthesis or guideline";
	if (value === "tier_2_high_quality_primary") return "Tier 2 high-quality primary evidence";
	if (value === "tier_3_observational_or_modeling") return "Tier 3 observational or modeling evidence";
	if (value === "tier_4_mechanistic_or_preclinical") return "Tier 4 mechanistic or preclinical evidence";
	if (value === "tier_5_commentary_or_low_quality") return "Tier 5 commentary or low-quality evidence";
	if (value === "tier_6_retracted_or_invalid") return "Tier 6 retracted or invalid evidence";
	return "Not coded";
}
