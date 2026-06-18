import type { Model } from "mongoose";
import type { ITopic } from "./Topic.js";
import mongoose, { Schema } from "mongoose";
import {
	EVIDENCE_BOUNDARY_DIMENSIONS,
	EVIDENCE_CLAIM_TYPES,
	EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS,
	EVIDENCE_LANDSCAPE_DIRECTIONS,
	EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS,
	EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
	EVIDENCE_LANDSCAPE_SUPPORT_LABELS,
	EVIDENCE_LANDSCAPE_WORKFLOW_STATUSES
} from "../../constants/evidenceLandscape.js";
import { slugify } from "../../utils/slugify.js";

export type ClaimStatus = "draft" | "published" | "needs_update" | "archived";
export type ClaimConsensusBand = "strong" | "broad" | "mixed" | "unclear";
export type ClaimAgreementLevel = "strong" | "broad_qualified" | "divided" | "frontier";
export type ClaimEvidenceCertainty = "high" | "moderate" | "low" | "very_low";
export type ClaimReviewMode = "standard" | "living";
export type ClaimEvidenceDirection = "supports" | "mixed" | "unclear";
export type ClaimUncertaintyType = "bias" | "indirectness" | "imprecision" | "inconsistency" | "generalizability" | "mechanism" | "timing" | "implementation" | "other";
export type ClaimLandscapeSupportLabel = (typeof EVIDENCE_LANDSCAPE_SUPPORT_LABELS)[number];
export type ClaimLandscapeEvidenceCertainty = (typeof EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS)[number];
export type ClaimLandscapeExpertAgreement = (typeof EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS)[number];
export type ClaimLandscapeWorkflowStatus = (typeof EVIDENCE_LANDSCAPE_WORKFLOW_STATUSES)[number];
export type ClaimLandscapeDirection = (typeof EVIDENCE_LANDSCAPE_DIRECTIONS)[number];
export type ClaimType = (typeof EVIDENCE_CLAIM_TYPES)[number];
export type ClaimBoundaryDimension = (typeof EVIDENCE_BOUNDARY_DIMENSIONS)[number];

export interface IClaimChangeLogEntry {
	date: Date;
	kind: "publication" | "update" | "correction" | "review";
	summary: string;
}

export interface IClaimEvidenceSummary {
	question: string;
	population?: string;
	finding: string;
	effectDirection: ClaimEvidenceDirection;
	magnitude?: string;
	certainty?: ClaimEvidenceCertainty;
	limitations: string[];
}

export interface IClaimInstitutionalAnchor {
	name: string;
	role: string;
}

export interface IClaimUncertaintyDriver {
	type: ClaimUncertaintyType;
	detail: string;
}

export interface IClaimSurveillanceSpec {
	focus?: string;
	cadenceDays?: number;
	watchTerms: string[];
	integrityMonitors: string[];
	guidelineMonitors: string[];
	triggerRules: string[];
}

export interface IClaimEvidenceLandscapePublicFlags {
	showEvidenceLandscape: boolean;
	showCredibleMinorityView: boolean;
	showFalseBalanceWarning: boolean;
	medicalOrPublicHealthSensitive: boolean;
	requiresProfessionalContext: boolean;
}

export interface IClaimEvidenceLandscapeWorkflow {
	status: ClaimLandscapeWorkflowStatus;
	assignedEditorId?: mongoose.Types.ObjectId;
	reviewedById?: mongoose.Types.ObjectId;
	approvedById?: mongoose.Types.ObjectId;
	lastAssessedAt?: Date;
	nextReviewDueAt?: Date;
	publishedAt?: Date;
	supersededByClaimId?: mongoose.Types.ObjectId;
	assessedBy?: mongoose.Types.ObjectId;
	editorialNotes?: string;
}

export interface IClaimBoundaryCondition {
	dimension: ClaimBoundaryDimension;
	label: string;
	explanation: string;
	sourceIds: mongoose.Types.ObjectId[];
}

export interface IClaimLandscapeBucket {
	count: number;
	weightedCount?: number;
}

export interface IClaimLandscapeDistribution {
	supportsClaim: IClaimLandscapeBucket;
	supportsWithCaveats: IClaimLandscapeBucket;
	opposesClaim: IClaimLandscapeBucket;
	inconclusiveOrMixed: IClaimLandscapeBucket;
	backgroundContext: IClaimLandscapeBucket;
	excludedLowQuality: IClaimLandscapeBucket;
	excludedRetracted: IClaimLandscapeBucket;
	excludedFringe: IClaimLandscapeBucket;
}

export interface IClaimEvidenceBaseSize {
	totalSources: number;
	includedSources: number;
	excludedSources: number;
	systematicReviews: number;
	metaAnalyses: number;
	evidenceBasedGuidelines: number;
	randomizedTrials: number;
	observationalStudies: number;
	mechanisticOrPreclinical: number;
	expertCommentary: number;
	retractedOrInvalid: number;
}

export interface IClaimApplicability {
	population?: string;
	exposureOrIntervention?: string;
	comparator?: string;
	outcomes: string[];
	setting?: string;
	timeframe?: string;
}

export interface IClaimEvidenceLandscape {
	schemaVersion: number;
	claimType: ClaimType;
	supportLabel: ClaimLandscapeSupportLabel;
	supportScore?: number | null;
	evidenceDirection: ClaimLandscapeDirection;
	evidenceCertainty: ClaimLandscapeEvidenceCertainty;
	expertAgreement: ClaimLandscapeExpertAgreement;
	plainLanguageAnswer?: string;
	oneSentenceSummary?: string;
	confidenceStatement?: string;
	caveatSummary?: string;
	disagreementSummary?: string;
	credibleMinorityViewSummary?: string;
	fringeOrUnsupportedViewSummary?: string;
	whatWouldChangeThis?: string;
	boundaryConditions: IClaimBoundaryCondition[];
	applicability: IClaimApplicability;
	distribution: IClaimLandscapeDistribution;
	evidenceBaseSize: IClaimEvidenceBaseSize;
	publicFlags: IClaimEvidenceLandscapePublicFlags;
	workflow: IClaimEvidenceLandscapeWorkflow;
}

function defaultLandscapeBucket(weighted = true): IClaimLandscapeBucket {
	return weighted ? { count: 0, weightedCount: 0 } : { count: 0 };
}

function defaultLandscapeDistribution(): IClaimLandscapeDistribution {
	return {
		supportsClaim: defaultLandscapeBucket(),
		supportsWithCaveats: defaultLandscapeBucket(),
		opposesClaim: defaultLandscapeBucket(),
		inconclusiveOrMixed: defaultLandscapeBucket(),
		backgroundContext: defaultLandscapeBucket(),
		excludedLowQuality: defaultLandscapeBucket(false),
		excludedRetracted: defaultLandscapeBucket(false),
		excludedFringe: defaultLandscapeBucket(false)
	};
}

function defaultEvidenceBaseSize(): IClaimEvidenceBaseSize {
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

function defaultApplicability(): IClaimApplicability {
	return {
		population: "",
		exposureOrIntervention: "",
		comparator: "",
		outcomes: [],
		setting: "",
		timeframe: ""
	};
}

export interface IClaim {
	_id?: mongoose.Types.ObjectId;
	topic: ITopic | mongoose.Types.ObjectId;
	title: string;
	slug: string;
	status: ClaimStatus;
	consensusBand: ClaimConsensusBand;
	agreementLevel: ClaimAgreementLevel;
	evidenceCertainty: ClaimEvidenceCertainty;
	confidenceScore: number;
	reviewMode: ClaimReviewMode;
	bottomLine: string;
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	misconceptions: string[];
	misconceptionTags: string[];
	editorSummary?: string;
	uncertaintySummary?: string;
	uncertaintyDrivers: IClaimUncertaintyDriver[];
	searchDatabases: string[];
	searchCutoffAt?: Date;
	inclusionRules: string[];
	exclusionRules: string[];
	surveillanceSpec: IClaimSurveillanceSpec;
	appraisalTools: string[];
	evidenceSummaries: IClaimEvidenceSummary[];
	evidenceLandscape: IClaimEvidenceLandscape;
	institutionalAnchors: IClaimInstitutionalAnchor[];
	authorLine?: string;
	reviewerLine?: string;
	coiSummary?: string;
	independenceSummary?: string;
	lastRetractionCheckAt?: Date;
	changeLog: IClaimChangeLogEntry[];
	lastReviewedAt?: Date;
	nextReviewAt?: Date;
	publishedAt?: Date;
	reviewedBy?: mongoose.Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
}

const landscapeBucketSchema = new Schema<IClaimLandscapeBucket>(
	{
		count: { type: Number, default: 0, min: 0 },
		weightedCount: { type: Number, default: 0, min: 0 }
	},
	{ _id: false }
);

const excludedLandscapeBucketSchema = new Schema<IClaimLandscapeBucket>(
	{
		count: { type: Number, default: 0, min: 0 }
	},
	{ _id: false }
);

const boundaryConditionSchema = new Schema<IClaimBoundaryCondition>(
	{
		dimension: {
			type: String,
			required: true,
			enum: EVIDENCE_BOUNDARY_DIMENSIONS
		},
		label: { type: String, required: true, trim: true, maxlength: 180 },
		explanation: { type: String, required: true, trim: true, maxlength: 1000 },
		sourceIds: [{ type: Schema.Types.ObjectId, ref: "ClaimSource" }]
	},
	{ _id: false }
);

const landscapeDistributionSchema = new Schema<IClaimLandscapeDistribution>(
	{
		supportsClaim: { type: landscapeBucketSchema, default: () => defaultLandscapeBucket() },
		supportsWithCaveats: { type: landscapeBucketSchema, default: () => defaultLandscapeBucket() },
		opposesClaim: { type: landscapeBucketSchema, default: () => defaultLandscapeBucket() },
		inconclusiveOrMixed: { type: landscapeBucketSchema, default: () => defaultLandscapeBucket() },
		backgroundContext: { type: landscapeBucketSchema, default: () => defaultLandscapeBucket() },
		excludedLowQuality: { type: excludedLandscapeBucketSchema, default: () => defaultLandscapeBucket(false) },
		excludedRetracted: { type: excludedLandscapeBucketSchema, default: () => defaultLandscapeBucket(false) },
		excludedFringe: { type: excludedLandscapeBucketSchema, default: () => defaultLandscapeBucket(false) }
	},
	{ _id: false }
);

const evidenceBaseSizeSchema = new Schema<IClaimEvidenceBaseSize>(
	{
		totalSources: { type: Number, default: 0, min: 0 },
		includedSources: { type: Number, default: 0, min: 0 },
		excludedSources: { type: Number, default: 0, min: 0 },
		systematicReviews: { type: Number, default: 0, min: 0 },
		metaAnalyses: { type: Number, default: 0, min: 0 },
		evidenceBasedGuidelines: { type: Number, default: 0, min: 0 },
		randomizedTrials: { type: Number, default: 0, min: 0 },
		observationalStudies: { type: Number, default: 0, min: 0 },
		mechanisticOrPreclinical: { type: Number, default: 0, min: 0 },
		expertCommentary: { type: Number, default: 0, min: 0 },
		retractedOrInvalid: { type: Number, default: 0, min: 0 }
	},
	{ _id: false }
);

const applicabilitySchema = new Schema<IClaimApplicability>(
	{
		population: { type: String, default: "", trim: true, maxlength: 280 },
		exposureOrIntervention: { type: String, default: "", trim: true, maxlength: 280 },
		comparator: { type: String, default: "", trim: true, maxlength: 280 },
		outcomes: { type: [String], default: [] },
		setting: { type: String, default: "", trim: true, maxlength: 280 },
		timeframe: { type: String, default: "", trim: true, maxlength: 280 }
	},
	{ _id: false }
);

const claimSchema: Schema<IClaim> = new Schema(
	{
		topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true, index: true },
		title: { type: String, required: true, trim: true, maxlength: 220 },
		slug: { type: String, required: true, trim: true, lowercase: true },
		status: {
			type: String,
			required: true,
			default: "draft",
			enum: ["draft", "published", "needs_update", "archived"],
			index: true
		},
		consensusBand: {
			type: String,
			required: true,
			default: "unclear",
			enum: ["strong", "broad", "mixed", "unclear"]
		},
		agreementLevel: {
			type: String,
			required: true,
			default: "frontier",
			enum: ["strong", "broad_qualified", "divided", "frontier"]
		},
		evidenceCertainty: {
			type: String,
			required: true,
			default: "low",
			enum: ["high", "moderate", "low", "very_low"]
		},
		confidenceScore: { type: Number, required: true, default: 50, min: 0, max: 100 },
		reviewMode: {
			type: String,
			required: true,
			default: "standard",
			enum: ["standard", "living"]
		},
		bottomLine: { type: String, default: "", trim: true, maxlength: 2000 },
		stableCore: { type: [String], default: [] },
		openQuestions: { type: [String], default: [] },
		whatWouldChangeMinds: { type: [String], default: [] },
		misconceptions: { type: [String], default: [] },
		misconceptionTags: { type: [String], default: [] },
		editorSummary: { type: String, default: "", trim: true, maxlength: 4000 },
		uncertaintySummary: { type: String, default: "", trim: true, maxlength: 1600 },
		uncertaintyDrivers: {
			type: [
				new Schema<IClaimUncertaintyDriver>(
					{
						type: {
							type: String,
							required: true,
							enum: [
								"bias",
								"indirectness",
								"imprecision",
								"inconsistency",
								"generalizability",
								"mechanism",
								"timing",
								"implementation",
								"other"
							]
						},
						detail: { type: String, required: true, trim: true, maxlength: 280 }
					},
					{ _id: false }
				)
			],
			default: []
		},
		searchDatabases: { type: [String], default: [] },
		searchCutoffAt: { type: Date },
		inclusionRules: { type: [String], default: [] },
		exclusionRules: { type: [String], default: [] },
		surveillanceSpec: {
			type: new Schema<IClaimSurveillanceSpec>(
				{
					focus: { type: String, default: "", trim: true, maxlength: 1000 },
					cadenceDays: { type: Number, min: 1, max: 3650 },
					watchTerms: { type: [String], default: [] },
					integrityMonitors: { type: [String], default: [] },
					guidelineMonitors: { type: [String], default: [] },
					triggerRules: { type: [String], default: [] }
				},
				{ _id: false }
			),
			default: () => ({
				focus: "",
				cadenceDays: undefined,
				watchTerms: [],
				integrityMonitors: [],
				guidelineMonitors: [],
				triggerRules: []
			})
		},
		appraisalTools: { type: [String], default: [] },
		evidenceSummaries: {
			type: [
				new Schema<IClaimEvidenceSummary>(
					{
						question: { type: String, required: true, trim: true, maxlength: 240 },
						population: { type: String, default: "", trim: true, maxlength: 200 },
						finding: { type: String, required: true, trim: true, maxlength: 1200 },
						effectDirection: {
							type: String,
							required: true,
							default: "unclear",
							enum: ["supports", "mixed", "unclear"]
						},
						magnitude: { type: String, default: "", trim: true, maxlength: 280 },
						certainty: {
							type: String,
							default: undefined,
							enum: ["high", "moderate", "low", "very_low"]
						},
						limitations: { type: [String], default: [] }
					},
					{ _id: false }
				)
			],
			default: []
		},
		evidenceLandscape: {
			type: new Schema<IClaimEvidenceLandscape>(
				{
					schemaVersion: {
						type: Number,
						required: true,
						default: EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
						min: 1
					},
					claimType: {
						type: String,
						required: true,
						default: "other",
						enum: EVIDENCE_CLAIM_TYPES
					},
					supportLabel: {
						type: String,
						required: true,
						default: "unresolved",
						enum: EVIDENCE_LANDSCAPE_SUPPORT_LABELS
					},
					supportScore: { type: Number, default: null, min: 0, max: 100 },
					evidenceDirection: {
						type: String,
						required: true,
						default: "not_applicable",
						enum: EVIDENCE_LANDSCAPE_DIRECTIONS
					},
					evidenceCertainty: {
						type: String,
						required: true,
						default: "not_assessable",
						enum: EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS
					},
					expertAgreement: {
						type: String,
						required: true,
						default: "not_assessable",
						enum: EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS
					},
					plainLanguageAnswer: { type: String, default: "", trim: true, maxlength: 2000 },
					oneSentenceSummary: { type: String, default: "", trim: true, maxlength: 280 },
					confidenceStatement: { type: String, default: "", trim: true, maxlength: 800 },
					caveatSummary: { type: String, default: "", trim: true, maxlength: 1600 },
					disagreementSummary: { type: String, default: "", trim: true, maxlength: 1600 },
					credibleMinorityViewSummary: { type: String, default: "", trim: true, maxlength: 1200 },
					fringeOrUnsupportedViewSummary: { type: String, default: "", trim: true, maxlength: 1200 },
					whatWouldChangeThis: { type: String, default: "", trim: true, maxlength: 1200 },
					boundaryConditions: { type: [boundaryConditionSchema], default: [] },
					applicability: { type: applicabilitySchema, default: () => defaultApplicability() },
					distribution: {
						type: landscapeDistributionSchema,
						default: () => defaultLandscapeDistribution()
					},
					evidenceBaseSize: {
						type: evidenceBaseSizeSchema,
						default: () => defaultEvidenceBaseSize()
					},
					publicFlags: {
						type: new Schema<IClaimEvidenceLandscapePublicFlags>(
							{
								showEvidenceLandscape: { type: Boolean, required: true, default: false },
								showCredibleMinorityView: { type: Boolean, required: true, default: false },
								showFalseBalanceWarning: { type: Boolean, required: true, default: false },
								medicalOrPublicHealthSensitive: { type: Boolean, required: true, default: false },
								requiresProfessionalContext: { type: Boolean, required: true, default: false }
							},
							{ _id: false }
						),
						default: () => ({
							showEvidenceLandscape: false,
							showCredibleMinorityView: false,
							showFalseBalanceWarning: false,
							medicalOrPublicHealthSensitive: false,
							requiresProfessionalContext: false
						})
					},
					workflow: {
						type: new Schema<IClaimEvidenceLandscapeWorkflow>(
							{
								status: {
									type: String,
									required: true,
									default: "not_started",
									enum: EVIDENCE_LANDSCAPE_WORKFLOW_STATUSES
								},
								assignedEditorId: { type: Schema.Types.ObjectId, ref: "User" },
								reviewedById: { type: Schema.Types.ObjectId, ref: "User" },
								approvedById: { type: Schema.Types.ObjectId, ref: "User" },
								lastAssessedAt: { type: Date },
								nextReviewDueAt: { type: Date },
								publishedAt: { type: Date },
								supersededByClaimId: { type: Schema.Types.ObjectId, ref: "Claim" },
								assessedBy: { type: Schema.Types.ObjectId },
								editorialNotes: { type: String, default: "", trim: true, maxlength: 2000 }
							},
							{ _id: false }
						),
						default: () => ({
							status: "not_started",
							assignedEditorId: undefined,
							reviewedById: undefined,
							approvedById: undefined,
							lastAssessedAt: undefined,
							nextReviewDueAt: undefined,
							publishedAt: undefined,
							supersededByClaimId: undefined,
							assessedBy: undefined,
							editorialNotes: ""
						})
					}
				},
				{ _id: false }
			),
			default: () => ({
				schemaVersion: EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
				claimType: "other",
				supportLabel: "unresolved",
				supportScore: null,
				evidenceDirection: "not_applicable",
				evidenceCertainty: "not_assessable",
				expertAgreement: "not_assessable",
				plainLanguageAnswer: "",
				oneSentenceSummary: "",
				confidenceStatement: "",
				caveatSummary: "",
				disagreementSummary: "",
				credibleMinorityViewSummary: "",
				fringeOrUnsupportedViewSummary: "",
				whatWouldChangeThis: "",
				boundaryConditions: [],
				applicability: defaultApplicability(),
				distribution: defaultLandscapeDistribution(),
				evidenceBaseSize: defaultEvidenceBaseSize(),
				publicFlags: {
					showEvidenceLandscape: false,
					showCredibleMinorityView: false,
					showFalseBalanceWarning: false,
					medicalOrPublicHealthSensitive: false,
					requiresProfessionalContext: false
				},
				workflow: {
					status: "not_started",
					assignedEditorId: undefined,
					reviewedById: undefined,
					approvedById: undefined,
					lastAssessedAt: undefined,
					nextReviewDueAt: undefined,
					publishedAt: undefined,
					supersededByClaimId: undefined,
					assessedBy: undefined,
					editorialNotes: ""
				}
			})
		},
		institutionalAnchors: {
			type: [
				new Schema<IClaimInstitutionalAnchor>(
					{
						name: { type: String, required: true, trim: true, maxlength: 160 },
						role: { type: String, required: true, trim: true, maxlength: 280 }
					},
					{ _id: false }
				)
			],
			default: []
		},
		authorLine: { type: String, default: "", trim: true, maxlength: 240 },
		reviewerLine: { type: String, default: "", trim: true, maxlength: 240 },
		coiSummary: { type: String, default: "", trim: true, maxlength: 1000 },
		independenceSummary: { type: String, default: "", trim: true, maxlength: 1000 },
		lastRetractionCheckAt: { type: Date },
		changeLog: {
			type: [
				new Schema<IClaimChangeLogEntry>(
					{
						date: { type: Date, required: true },
						kind: {
							type: String,
							required: true,
							enum: ["publication", "update", "correction", "review"]
						},
						summary: { type: String, required: true, trim: true, maxlength: 240 }
					},
					{ _id: false }
				)
			],
			default: []
		},
		lastReviewedAt: { type: Date },
		nextReviewAt: { type: Date },
		publishedAt: { type: Date },
		reviewedBy: { type: Schema.Types.ObjectId }
	},
	{ timestamps: true }
);

claimSchema.index({ topic: 1, slug: 1 }, { unique: true });
claimSchema.index({
	"evidenceLandscape.publicFlags.showEvidenceLandscape": 1,
	"evidenceLandscape.workflow.status": 1
});
claimSchema.index({
	"evidenceLandscape.supportLabel": 1,
	"evidenceLandscape.evidenceCertainty": 1,
	"evidenceLandscape.workflow.status": 1
});
claimSchema.index({ "evidenceLandscape.workflow.nextReviewDueAt": 1 });

claimSchema.pre("validate", function () {
	if (!this.slug && this.title) {
		this.slug = slugify(this.title);
	}
});

export const Claim: Model<IClaim> = mongoose.model<IClaim>("Claim", claimSchema);
