import type {
	IClaimEvidenceBaseSize,
	IClaimEvidenceLandscape,
	IClaimLandscapeDistribution
} from "../models/schemas/Claim.js";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import {
	EVIDENCE_SOURCE_POSITION_BUCKETS,
	EVIDENCE_STUDY_DESIGNS,
	EVIDENCE_TIER_WEIGHTS,
	EVIDENCE_TIERS
} from "../constants/evidenceLandscape.js";

type EvidenceSourceForDistribution = Pick<IClaimSource, "citationStatus" | "evidenceProfile" | "kind">;

export type PublicEvidenceSourcePosition = Extract<
	(typeof EVIDENCE_SOURCE_POSITION_BUCKETS)[number],
	"supports_claim" | "supports_with_caveats" | "opposes_claim" | "inconclusive_or_mixed" | "background_context"
>;

export interface PublicEvidenceSourceCard {
	id: string;
	title: string;
	publisher?: string;
	year?: number;
	doi?: string;
	pmid?: string;
	pmcid?: string;
	url?: string;
	sourceStack: IClaimSource["kind"];
	appraisal?: IClaimSource["appraisal"];
	citationStatus?: IClaimSource["citationStatus"];
	evidenceProfile: {
		positionRelativeToClaim: IClaimSource["evidenceProfile"]["positionRelativeToClaim"];
		evidenceTier: IClaimSource["evidenceProfile"]["evidenceTier"];
		studyDesign: IClaimSource["evidenceProfile"]["studyDesign"];
		riskOfBias: IClaimSource["evidenceProfile"]["riskOfBias"];
		directness: IClaimSource["evidenceProfile"]["directness"];
		keyFinding?: string;
		limitations?: string;
	};
}

export const publicEvidenceSourcePositions = new Set<PublicEvidenceSourcePosition>([
	"supports_claim",
	"supports_with_caveats",
	"opposes_claim",
	"inconclusive_or_mixed",
	"background_context"
]);

function isPublicEvidenceSourcePosition(
	position: IClaimSource["evidenceProfile"]["positionRelativeToClaim"]
): position is PublicEvidenceSourcePosition {
	return publicEvidenceSourcePositions.has(position as PublicEvidenceSourcePosition);
}

function emptyWeightedBucket() {
	return { count: 0, weightedCount: 0 };
}

function emptyExcludedBucket() {
	return { count: 0 };
}

export function createEmptyEvidenceLandscapeDistribution(): IClaimLandscapeDistribution {
	return {
		supportsClaim: emptyWeightedBucket(),
		supportsWithCaveats: emptyWeightedBucket(),
		opposesClaim: emptyWeightedBucket(),
		inconclusiveOrMixed: emptyWeightedBucket(),
		backgroundContext: emptyWeightedBucket(),
		excludedLowQuality: emptyExcludedBucket(),
		excludedRetracted: emptyExcludedBucket(),
		excludedFringe: emptyExcludedBucket()
	};
}

export function createEmptyEvidenceBaseSize(): IClaimEvidenceBaseSize {
	return {
		totalSources: 0,
		includedSources: 0,
		excludedSources: 0,
		systematicReviews: 0,
		metaAnalyses: 0,
		evidenceBasedGuidelines: 0,
		randomizedTrials: 0,
		observationalStudies: 0,
		mechanisticOrPreclinical: 0,
		expertCommentary: 0,
		retractedOrInvalid: 0
	};
}

function isRetractedOrInvalid(source: EvidenceSourceForDistribution) {
	const profile = source.evidenceProfile;
	return (
		source.citationStatus === "retracted"
		|| profile.publicationIntegrity.retracted
		|| profile.evidenceTier === "tier_6_retracted_or_invalid"
		|| profile.studyDesign === "retracted_or_expression_of_concern"
	);
}

function isExcludedPosition(position: IClaimSource["evidenceProfile"]["positionRelativeToClaim"]) {
	return position === "excluded_low_quality" || position === "excluded_retracted" || position === "excluded_fringe";
}

function incrementWeightedBucket(bucket: { count: number; weightedCount?: number }, weight: number) {
	bucket.count += 1;
	bucket.weightedCount = (bucket.weightedCount ?? 0) + weight;
}

function incrementEvidenceBaseSize(
	size: IClaimEvidenceBaseSize,
	source: EvidenceSourceForDistribution,
	included: boolean
) {
	const design = source.evidenceProfile.studyDesign;
	const tier = source.evidenceProfile.evidenceTier;

	if (isRetractedOrInvalid(source)) {
		size.retractedOrInvalid += 1;
	}

	if (!included) return;

	if (design === "systematic_review" || design === "living_review") {
		size.systematicReviews += 1;
		return;
	}
	if (design === "meta_analysis") {
		size.metaAnalyses += 1;
		return;
	}
	if (design === "evidence_based_guideline" || design === "consensus_statement") {
		size.evidenceBasedGuidelines += 1;
		return;
	}
	if (design === "randomized_trial" || design === "non_randomized_trial") {
		size.randomizedTrials += 1;
		return;
	}
	if (
		design === "cohort_study"
		|| design === "case_control_study"
		|| design === "cross_sectional_study"
		|| design === "case_series"
		|| design === "ecological_study"
		|| design === "modeling_study"
		|| tier === "tier_3_observational_or_modeling"
	) {
		size.observationalStudies += 1;
		return;
	}
	if (
		design === "mechanistic_human"
		|| design === "animal_study"
		|| design === "in_vitro_study"
		|| tier === "tier_4_mechanistic_or_preclinical"
	) {
		size.mechanisticOrPreclinical += 1;
		return;
	}
	if (design === "expert_commentary" || design === "news_or_secondary_reporting") {
		size.expertCommentary += 1;
	}
}

export function recomputeEvidenceLandscapeFromSources(
	sources: EvidenceSourceForDistribution[]
): Pick<IClaimEvidenceLandscape, "distribution" | "evidenceBaseSize"> {
	const distribution = createEmptyEvidenceLandscapeDistribution();
	const evidenceBaseSize = createEmptyEvidenceBaseSize();

	for (const source of sources) {
		const profile = source.evidenceProfile;
		const position = profile.positionRelativeToClaim;
		const weight = EVIDENCE_TIER_WEIGHTS[profile.evidenceTier] ?? 0;
		const newsAsEvidence = profile.studyDesign === "news_or_secondary_reporting" && position !== "background_context";
		const retractedOrInvalid = isRetractedOrInvalid(source);

		evidenceBaseSize.totalSources += 1;

		if (retractedOrInvalid || position === "excluded_retracted") {
			distribution.excludedRetracted.count += 1;
			evidenceBaseSize.excludedSources += 1;
			incrementEvidenceBaseSize(evidenceBaseSize, source, false);
			continue;
		}

		if (position === "excluded_low_quality") {
			distribution.excludedLowQuality.count += 1;
			evidenceBaseSize.excludedSources += 1;
			continue;
		}

		if (position === "excluded_fringe") {
			distribution.excludedFringe.count += 1;
			evidenceBaseSize.excludedSources += 1;
			continue;
		}

		const included
			= profile.inclusion.includedInLandscape && isPublicEvidenceSourcePosition(position) && !newsAsEvidence;

		if (!included) {
			incrementEvidenceBaseSize(evidenceBaseSize, source, false);
			continue;
		}

		evidenceBaseSize.includedSources += 1;
		incrementEvidenceBaseSize(evidenceBaseSize, source, true);

		if (position === "supports_claim") {
			incrementWeightedBucket(distribution.supportsClaim, weight);
		}
		else if (position === "supports_with_caveats") {
			incrementWeightedBucket(distribution.supportsWithCaveats, weight);
		}
		else if (position === "opposes_claim") {
			incrementWeightedBucket(distribution.opposesClaim, weight);
		}
		else if (position === "inconclusive_or_mixed") {
			incrementWeightedBucket(distribution.inconclusiveOrMixed, weight);
		}
		else if (position === "background_context") {
			incrementWeightedBucket(distribution.backgroundContext, weight);
		}
	}

	return { distribution, evidenceBaseSize };
}

export function sourceIsPublicEvidenceCard(source: Pick<IClaimSource, "citationStatus" | "evidenceProfile">) {
	const profile = source.evidenceProfile;
	return (
		profile.inclusion.includedInLandscape
		&& isPublicEvidenceSourcePosition(profile.positionRelativeToClaim)
		&& source.citationStatus !== "retracted"
		&& !profile.publicationIntegrity.retracted
	);
}

export function sourceIsExcludedEvidenceCard(source: Pick<IClaimSource, "citationStatus" | "evidenceProfile">) {
	const profile = source.evidenceProfile;
	return (
		source.citationStatus === "retracted"
		|| profile.publicationIntegrity.retracted
		|| isExcludedPosition(profile.positionRelativeToClaim)
	);
}

export function validEvidenceSourcePosition(value: unknown) {
	return (
		typeof value === "string"
		&& EVIDENCE_SOURCE_POSITION_BUCKETS.includes(value as (typeof EVIDENCE_SOURCE_POSITION_BUCKETS)[number])
	);
}

export function validEvidenceTier(value: unknown) {
	return typeof value === "string" && EVIDENCE_TIERS.includes(value as (typeof EVIDENCE_TIERS)[number]);
}

export function validEvidenceStudyDesign(value: unknown) {
	return (
		typeof value === "string"
		&& EVIDENCE_STUDY_DESIGNS.includes(value as (typeof EVIDENCE_STUDY_DESIGNS)[number])
	);
}

export function toPublicEvidenceSourceCard(source: IClaimSource & { _id?: unknown }): PublicEvidenceSourceCard {
	const profile = source.evidenceProfile;
	return {
		id: String(source._id ?? ""),
		title: source.title,
		publisher: source.publisher,
		year: source.year,
		doi: source.doi,
		pmid: source.pmid,
		pmcid: source.pmcid,
		url: source.url,
		sourceStack: source.kind,
		appraisal: source.appraisal,
		citationStatus: source.citationStatus,
		evidenceProfile: {
			positionRelativeToClaim: profile.positionRelativeToClaim,
			evidenceTier: profile.evidenceTier,
			studyDesign: profile.studyDesign,
			riskOfBias: profile.riskOfBias,
			directness: profile.directness,
			keyFinding: profile.extraction.keyFinding,
			limitations: profile.extraction.limitations
		}
	};
}
