import type { Model } from "mongoose";
import type { ITopic } from "./Topic.js";
import mongoose, { Schema } from "mongoose";
import { slugify } from "../../utils/slugify.js";

export type ClaimStatus = "draft" | "published" | "needs_update" | "archived";
export type ClaimConsensusBand = "strong" | "broad" | "mixed" | "unclear";
export type ClaimAgreementLevel = "strong" | "broad_qualified" | "divided" | "frontier";
export type ClaimEvidenceCertainty = "high" | "moderate" | "low" | "very_low";
export type ClaimReviewMode = "standard" | "living";

export interface IClaimChangeLogEntry {
	date: Date;
	kind: "publication" | "update" | "correction" | "review";
	summary: string;
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
	editorSummary?: string;
	searchDatabases: string[];
	searchCutoffAt?: Date;
	inclusionRules: string[];
	exclusionRules: string[];
	appraisalTools: string[];
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
		editorSummary: { type: String, default: "", trim: true, maxlength: 4000 },
		searchDatabases: { type: [String], default: [] },
		searchCutoffAt: { type: Date },
		inclusionRules: { type: [String], default: [] },
		exclusionRules: { type: [String], default: [] },
		appraisalTools: { type: [String], default: [] },
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

claimSchema.pre("validate", function () {
	if (!this.slug && this.title) {
		this.slug = slugify(this.title);
	}
});

export const Claim: Model<IClaim> = mongoose.model<IClaim>("Claim", claimSchema);
