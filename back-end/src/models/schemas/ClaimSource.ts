import type { Model } from "mongoose";
import type { IClaim } from "./Claim.js";
import mongoose, { Schema } from "mongoose";
import {
	EVIDENCE_CONSISTENCY_LEVELS,
	EVIDENCE_DIRECTNESS_LEVELS,
	EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
	EVIDENCE_PRECISION_LEVELS,
	EVIDENCE_RISK_OF_BIAS_LEVELS,
	EVIDENCE_SOURCE_EXCLUSION_REASONS,
	EVIDENCE_SOURCE_POSITION_BUCKETS,
	EVIDENCE_STUDY_DESIGNS,
	EVIDENCE_TIERS
} from "../../constants/evidenceLandscape.js";

export type ClaimSourceKind
	= | "systematic_review"
		| "meta_analysis"
		| "guideline"
		| "consensus_statement"
		| "landmark_study"
		| "context";
export type ClaimSourceStance = "supports" | "context" | "debate";
export type ClaimSourceAppraisal = "high" | "moderate" | "low" | "not_appraised";
export type ClaimSourceCitationStatus = "current" | "corrected" | "retracted" | "expression_of_concern";
export type ClaimSourceEvidencePosition = (typeof EVIDENCE_SOURCE_POSITION_BUCKETS)[number];
export type ClaimSourceEvidenceTier = (typeof EVIDENCE_TIERS)[number];
export type ClaimSourceStudyDesign = (typeof EVIDENCE_STUDY_DESIGNS)[number];
export type ClaimSourceRiskOfBias = (typeof EVIDENCE_RISK_OF_BIAS_LEVELS)[number];
export type ClaimSourceDirectness = (typeof EVIDENCE_DIRECTNESS_LEVELS)[number];
export type ClaimSourceConsistency = (typeof EVIDENCE_CONSISTENCY_LEVELS)[number];
export type ClaimSourcePrecision = (typeof EVIDENCE_PRECISION_LEVELS)[number];
export type ClaimSourceExclusionReason = (typeof EVIDENCE_SOURCE_EXCLUSION_REASONS)[number];

export const CLAIM_SOURCE_TITLE_MAX_LENGTH = 320;

export interface IClaimSourceEffectEstimate {
	metric?: string;
	value?: string;
	confidenceInterval?: string;
	pValue?: string;
	notes?: string;
}

export interface IClaimSourcePublicationIntegrity {
	retracted: boolean;
	expressionOfConcern: boolean;
	correctionOrErratum: boolean;
	predatoryOrQuestionableVenue: boolean;
	citationStatusCheckedAt?: Date;
	integrityNotes?: string;
}

export interface IClaimSourceInclusionProfile {
	includedInLandscape: boolean;
	exclusionReason: ClaimSourceExclusionReason;
	exclusionNotes?: string;
}

export interface IClaimSourceExtractionProfile {
	keyFinding?: string;
	limitations?: string;
	population?: string;
	exposureOrIntervention?: string;
	comparator?: string;
	outcomes: string[];
	sampleSize?: string;
	effectEstimate: IClaimSourceEffectEstimate;
}

export interface IClaimSourceReviewerProfile {
	codedById?: mongoose.Types.ObjectId;
	codedAt?: Date;
	reviewedById?: mongoose.Types.ObjectId;
	reviewedAt?: Date;
	notes?: string;
}

export interface IClaimSourceEvidenceProfile {
	schemaVersion: number;
	positionRelativeToClaim: ClaimSourceEvidencePosition;
	evidenceTier: ClaimSourceEvidenceTier;
	studyDesign: ClaimSourceStudyDesign;
	riskOfBias: ClaimSourceRiskOfBias;
	directness: ClaimSourceDirectness;
	consistency: ClaimSourceConsistency;
	precision: ClaimSourcePrecision;
	publicationIntegrity: IClaimSourcePublicationIntegrity;
	inclusion: IClaimSourceInclusionProfile;
	extraction: IClaimSourceExtractionProfile;
	reviewer: IClaimSourceReviewerProfile;
}

export interface IClaimSource {
	claim: IClaim | mongoose.Types.ObjectId;
	kind: ClaimSourceKind;
	title: string;
	publisher?: string;
	year?: number;
	url?: string;
	doi?: string;
	pmid?: string;
	pmcid?: string;
	isAnchor?: boolean;
	appraisal?: ClaimSourceAppraisal;
	citationStatus?: ClaimSourceCitationStatus;
	citationCheckedAt?: Date;
	statusSources?: string[];
	stance: ClaimSourceStance;
	note?: string;
	order?: number;
	evidenceProfile: IClaimSourceEvidenceProfile;
}

function defaultEffectEstimate(): IClaimSourceEffectEstimate {
	return {
		metric: "",
		value: "",
		confidenceInterval: "",
		pValue: "",
		notes: ""
	};
}

function defaultEvidenceProfile(): IClaimSourceEvidenceProfile {
	return {
		schemaVersion: EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
		positionRelativeToClaim: "not_coded",
		evidenceTier: "not_coded",
		studyDesign: "not_coded",
		riskOfBias: "not_assessed",
		directness: "not_assessed",
		consistency: "not_assessed",
		precision: "not_assessed",
		publicationIntegrity: {
			retracted: false,
			expressionOfConcern: false,
			correctionOrErratum: false,
			predatoryOrQuestionableVenue: false,
			citationStatusCheckedAt: undefined,
			integrityNotes: ""
		},
		inclusion: {
			includedInLandscape: false,
			exclusionReason: "",
			exclusionNotes: ""
		},
		extraction: {
			keyFinding: "",
			limitations: "",
			population: "",
			exposureOrIntervention: "",
			comparator: "",
			outcomes: [],
			sampleSize: "",
			effectEstimate: defaultEffectEstimate()
		},
		reviewer: {
			codedById: undefined,
			codedAt: undefined,
			reviewedById: undefined,
			reviewedAt: undefined,
			notes: ""
		}
	};
}

const effectEstimateSchema = new Schema<IClaimSourceEffectEstimate>(
	{
		metric: { type: String, default: "", trim: true, maxlength: 120 },
		value: { type: String, default: "", trim: true, maxlength: 160 },
		confidenceInterval: { type: String, default: "", trim: true, maxlength: 160 },
		pValue: { type: String, default: "", trim: true, maxlength: 80 },
		notes: { type: String, default: "", trim: true, maxlength: 500 }
	},
	{ _id: false }
);

const evidenceProfileSchema = new Schema<IClaimSourceEvidenceProfile>(
	{
		schemaVersion: { type: Number, required: true, default: EVIDENCE_LANDSCAPE_SCHEMA_VERSION, min: 1 },
		positionRelativeToClaim: {
			type: String,
			required: true,
			default: "not_coded",
			enum: EVIDENCE_SOURCE_POSITION_BUCKETS,
			index: true
		},
		evidenceTier: {
			type: String,
			required: true,
			default: "not_coded",
			enum: EVIDENCE_TIERS,
			index: true
		},
		studyDesign: {
			type: String,
			required: true,
			default: "not_coded",
			enum: EVIDENCE_STUDY_DESIGNS,
			index: true
		},
		riskOfBias: { type: String, required: true, default: "not_assessed", enum: EVIDENCE_RISK_OF_BIAS_LEVELS },
		directness: { type: String, required: true, default: "not_assessed", enum: EVIDENCE_DIRECTNESS_LEVELS },
		consistency: { type: String, required: true, default: "not_assessed", enum: EVIDENCE_CONSISTENCY_LEVELS },
		precision: { type: String, required: true, default: "not_assessed", enum: EVIDENCE_PRECISION_LEVELS },
		publicationIntegrity: {
			type: new Schema<IClaimSourcePublicationIntegrity>(
				{
					retracted: { type: Boolean, required: true, default: false, index: true },
					expressionOfConcern: { type: Boolean, required: true, default: false },
					correctionOrErratum: { type: Boolean, required: true, default: false },
					predatoryOrQuestionableVenue: { type: Boolean, required: true, default: false },
					citationStatusCheckedAt: { type: Date },
					integrityNotes: { type: String, default: "", trim: true, maxlength: 1000 }
				},
				{ _id: false }
			),
			default: () => defaultEvidenceProfile().publicationIntegrity
		},
		inclusion: {
			type: new Schema<IClaimSourceInclusionProfile>(
				{
					includedInLandscape: { type: Boolean, required: true, default: false, index: true },
					exclusionReason: { type: String, default: "", enum: EVIDENCE_SOURCE_EXCLUSION_REASONS },
					exclusionNotes: { type: String, default: "", trim: true, maxlength: 1000 }
				},
				{ _id: false }
			),
			default: () => defaultEvidenceProfile().inclusion
		},
		extraction: {
			type: new Schema<IClaimSourceExtractionProfile>(
				{
					keyFinding: { type: String, default: "", trim: true, maxlength: 1000 },
					limitations: { type: String, default: "", trim: true, maxlength: 1000 },
					population: { type: String, default: "", trim: true, maxlength: 280 },
					exposureOrIntervention: { type: String, default: "", trim: true, maxlength: 280 },
					comparator: { type: String, default: "", trim: true, maxlength: 280 },
					outcomes: { type: [String], default: [] },
					sampleSize: { type: String, default: "", trim: true, maxlength: 120 },
					effectEstimate: { type: effectEstimateSchema, default: () => defaultEffectEstimate() }
				},
				{ _id: false }
			),
			default: () => defaultEvidenceProfile().extraction
		},
		reviewer: {
			type: new Schema<IClaimSourceReviewerProfile>(
				{
					codedById: { type: Schema.Types.ObjectId, ref: "User" },
					codedAt: { type: Date },
					reviewedById: { type: Schema.Types.ObjectId, ref: "User" },
					reviewedAt: { type: Date },
					notes: { type: String, default: "", trim: true, maxlength: 1000 }
				},
				{ _id: false }
			),
			default: () => defaultEvidenceProfile().reviewer
		}
	},
	{ _id: false }
);

const claimSourceSchema: Schema<IClaimSource> = new Schema(
	{
		claim: { type: Schema.Types.ObjectId, ref: "Claim", required: true, index: true },
		kind: {
			type: String,
			required: true,
			default: "context",
			enum: [
				"systematic_review",
				"meta_analysis",
				"guideline",
				"consensus_statement",
				"landmark_study",
				"context"
			]
		},
		title: { type: String, required: true, trim: true, maxlength: CLAIM_SOURCE_TITLE_MAX_LENGTH },
		publisher: { type: String, default: "", trim: true, maxlength: 160 },
		year: { type: Number, min: 0, max: 9999 },
		url: { type: String, default: "", trim: true, maxlength: 500 },
		doi: { type: String, default: "", trim: true, maxlength: 200 },
		pmid: { type: String, default: "", trim: true, maxlength: 40 },
		pmcid: { type: String, default: "", trim: true, maxlength: 40 },
		isAnchor: { type: Boolean, default: false },
		appraisal: {
			type: String,
			default: "not_appraised",
			enum: ["high", "moderate", "low", "not_appraised"]
		},
		citationStatus: {
			type: String,
			default: "current",
			enum: ["current", "corrected", "retracted", "expression_of_concern"]
		},
		citationCheckedAt: { type: Date },
		statusSources: { type: [String], default: [] },
		stance: {
			type: String,
			required: true,
			default: "context",
			enum: ["supports", "context", "debate"]
		},
		note: { type: String, default: "", trim: true, maxlength: 1000 },
		order: { type: Number, default: 0 },
		evidenceProfile: {
			type: evidenceProfileSchema,
			default: () => defaultEvidenceProfile()
		}
	},
	{ timestamps: true }
);

claimSourceSchema.index({ claim: 1, order: 1, createdAt: 1 });
claimSourceSchema.index({
	"claim": 1,
	"evidenceProfile.positionRelativeToClaim": 1,
	"evidenceProfile.evidenceTier": 1
});
claimSourceSchema.index({
	"evidenceProfile.publicationIntegrity.retracted": 1,
	"evidenceProfile.inclusion.includedInLandscape": 1
});

export const ClaimSource: Model<IClaimSource> = mongoose.model<IClaimSource>("ClaimSource", claimSourceSchema);
