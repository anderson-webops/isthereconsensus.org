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

export function formatClaimTypeLabel(value?: EvidenceClaimType) {
	if (value === "causal") return "Causal";
	if (value === "intervention") return "Intervention";
	if (value === "diagnostic") return "Diagnostic";
	if (value === "prognostic") return "Prognostic";
	if (value === "prevalence") return "Prevalence";
	if (value === "mechanistic") return "Mechanistic";
	if (value === "risk_factor") return "Risk factor";
	if (value === "descriptive") return "Descriptive";
	if (value === "policy_relevant_science") return "Policy-relevant science";
	return "Other";
}

export function formatEvidenceSourcePositionLabel(value?: EvidenceSourcePositionBucket) {
	if (value === "supports_claim") return "Supports claim";
	if (value === "supports_with_caveats") return "Supports with caveats";
	if (value === "opposes_claim") return "Opposes claim";
	if (value === "inconclusive_or_mixed") return "Inconclusive or mixed";
	if (value === "background_context") return "Background context";
	if (value === "excluded_low_quality") return "Excluded: low quality";
	if (value === "excluded_retracted") return "Excluded: retracted or invalid";
	if (value === "excluded_fringe") return "Excluded: fringe or pseudoscientific";
	return "Not coded";
}

export function formatEvidenceStudyDesignLabel(value?: EvidenceStudyDesign) {
	if (value === "systematic_review") return "Systematic review";
	if (value === "meta_analysis") return "Meta-analysis";
	if (value === "living_review") return "Living review";
	if (value === "evidence_based_guideline") return "Evidence-based guideline";
	if (value === "consensus_statement") return "Consensus statement";
	if (value === "randomized_trial") return "Randomized trial";
	if (value === "non_randomized_trial") return "Non-randomized trial";
	if (value === "cohort_study") return "Cohort study";
	if (value === "case_control_study") return "Case-control study";
	if (value === "cross_sectional_study") return "Cross-sectional study";
	if (value === "case_series") return "Case series";
	if (value === "ecological_study") return "Ecological study";
	if (value === "mechanistic_human") return "Mechanistic human study";
	if (value === "animal_study") return "Animal study";
	if (value === "in_vitro_study") return "In vitro study";
	if (value === "modeling_study") return "Modeling study";
	if (value === "expert_commentary") return "Expert commentary";
	if (value === "news_or_secondary_reporting") return "News or secondary reporting";
	if (value === "retracted_or_expression_of_concern") return "Retracted or expression of concern";
	if (value === "other") return "Other";
	return "Not coded";
}

export function formatEvidenceRiskOfBiasLabel(value?: EvidenceRiskOfBiasLevel) {
	if (value === "low") return "Low risk";
	if (value === "some_concerns") return "Some concerns";
	if (value === "high") return "High risk";
	if (value === "critical") return "Critical risk";
	return "Not assessed";
}

export function formatEvidenceDirectnessLabel(value?: EvidenceDirectnessLevel) {
	if (value === "direct") return "Direct";
	if (value === "partially_direct") return "Partially direct";
	if (value === "indirect") return "Indirect";
	return "Not assessed";
}

export function formatEvidenceConsistencyLabel(value?: EvidenceConsistencyLevel) {
	if (value === "consistent_with_body") return "Consistent with body";
	if (value === "partly_consistent") return "Partly consistent";
	if (value === "inconsistent_with_body") return "Inconsistent with body";
	return "Not assessed";
}

export function formatEvidencePrecisionLabel(value?: EvidencePrecisionLevel) {
	if (value === "precise") return "Precise";
	if (value === "imprecise") return "Imprecise";
	if (value === "not_applicable") return "Not applicable";
	return "Not assessed";
}

export function formatEvidenceSourceExclusionReasonLabel(value?: EvidenceSourceExclusionReason) {
	if (!value) return "No exclusion reason";
	if (value === "not_relevant_to_claim") return "Not relevant to claim";
	if (value === "wrong_population") return "Wrong population";
	if (value === "wrong_exposure_or_intervention") return "Wrong exposure/intervention";
	if (value === "wrong_outcome") return "Wrong outcome";
	if (value === "superseded_by_better_evidence") return "Superseded by better evidence";
	if (value === "low_quality") return "Low quality";
	if (value === "high_risk_of_bias") return "High risk of bias";
	if (value === "retracted") return "Retracted";
	if (value === "pseudoscientific_or_fringe") return "Pseudoscientific or fringe";
	if (value === "duplicate") return "Duplicate";
	if (value === "background_only") return "Background only";
	return "Other";
}
