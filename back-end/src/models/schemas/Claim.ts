import type { Model } from "mongoose";
import type { ITopic } from "./Topic.js";
import mongoose, { Schema } from "mongoose";
import {
	EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS,
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
}

export interface IClaimEvidenceLandscapeWorkflow {
	status: ClaimLandscapeWorkflowStatus;
	lastAssessedAt?: Date;
	nextReviewDueAt?: Date;
	assessedBy?: mongoose.Types.ObjectId;
	editorialNotes?: string;
}

export interface IClaimEvidenceLandscape {
	schemaVersion: number;
	supportLabel: ClaimLandscapeSupportLabel;
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
	publicFlags: IClaimEvidenceLandscapePublicFlags;
	workflow: IClaimEvidenceLandscapeWorkflow;
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
					supportLabel: {
						type: String,
						required: true,
						default: "unresolved",
						enum: EVIDENCE_LANDSCAPE_SUPPORT_LABELS
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
					publicFlags: {
						type: new Schema<IClaimEvidenceLandscapePublicFlags>(
							{
								showEvidenceLandscape: { type: Boolean, required: true, default: false },
								showCredibleMinorityView: { type: Boolean, required: true, default: false },
								showFalseBalanceWarning: { type: Boolean, required: true, default: false }
							},
							{ _id: false }
						),
						default: () => ({
							showEvidenceLandscape: false,
							showCredibleMinorityView: false,
							showFalseBalanceWarning: false
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
								lastAssessedAt: { type: Date },
								nextReviewDueAt: { type: Date },
								assessedBy: { type: Schema.Types.ObjectId },
								editorialNotes: { type: String, default: "", trim: true, maxlength: 2000 }
							},
							{ _id: false }
						),
						default: () => ({
							status: "not_started",
							lastAssessedAt: undefined,
							nextReviewDueAt: undefined,
							assessedBy: undefined,
							editorialNotes: ""
						})
					}
				},
				{ _id: false }
			),
			default: () => ({
				schemaVersion: EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
				supportLabel: "unresolved",
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
				publicFlags: {
					showEvidenceLandscape: false,
					showCredibleMinorityView: false,
					showFalseBalanceWarning: false
				},
				workflow: {
					status: "not_started",
					lastAssessedAt: undefined,
					nextReviewDueAt: undefined,
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

claimSchema.pre("validate", function () {
	if (!this.slug && this.title) {
		this.slug = slugify(this.title);
	}
});

export const Claim: Model<IClaim> = mongoose.model<IClaim>("Claim", claimSchema);
