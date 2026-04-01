import type { Model } from "mongoose";
import type { ITopic } from "./Topic.js";
import mongoose, { Schema } from "mongoose";
import { slugify } from "../../utils/slugify.js";

export type ClaimStatus = "draft" | "published" | "needs_update" | "archived";
export type ClaimConsensusBand = "strong" | "broad" | "mixed" | "unclear";

export interface IClaim {
	_id?: mongoose.Types.ObjectId;
	topic: ITopic | mongoose.Types.ObjectId;
	title: string;
	slug: string;
	status: ClaimStatus;
	consensusBand: ClaimConsensusBand;
	confidenceScore: number;
	bottomLine: string;
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	misconceptions: string[];
	editorSummary?: string;
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
		confidenceScore: { type: Number, required: true, default: 50, min: 0, max: 100 },
		bottomLine: { type: String, default: "", trim: true, maxlength: 2000 },
		stableCore: { type: [String], default: [] },
		openQuestions: { type: [String], default: [] },
		whatWouldChangeMinds: { type: [String], default: [] },
		misconceptions: { type: [String], default: [] },
		editorSummary: { type: String, default: "", trim: true, maxlength: 4000 },
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
