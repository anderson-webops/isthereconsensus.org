export const EVIDENCE_LANDSCAPE_SUPPORT_LABELS = [
	"strong_consensus",
	"broad_agreement_with_caveats",
	"active_expert_debate",
	"thin_evidence",
	"unresolved",
	"unsupported_fringe"
] as const;

export const EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS = [
	"high",
	"moderate",
	"low",
	"very_low",
	"not_assessable"
] as const;

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

export const EVIDENCE_TIER_WEIGHTS: Record<(typeof EVIDENCE_TIERS)[number], number> = {
	tier_1_synthesis_or_guideline: 5,
	tier_2_high_quality_primary: 4,
	tier_3_observational_or_modeling: 3,
	tier_4_mechanistic_or_preclinical: 2,
	tier_5_commentary_or_low_quality: 1,
	tier_6_retracted_or_invalid: 0,
	not_coded: 0
};

export const EVIDENCE_LANDSCAPE_SCHEMA_VERSION = 2;
