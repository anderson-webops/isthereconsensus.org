import type { Model } from "mongoose";
import type { IClaim } from "./Claim.js";
import mongoose, { Schema } from "mongoose";

export type ClaimSourceKind
	= "systematic_review" | "meta_analysis" | "guideline" | "consensus_statement" | "landmark_study" | "context";
export type ClaimSourceStance = "supports" | "context" | "debate";

export interface IClaimSource {
	claim: IClaim | mongoose.Types.ObjectId;
	kind: ClaimSourceKind;
	title: string;
	publisher?: string;
	year?: number;
	url?: string;
	doi?: string;
	stance: ClaimSourceStance;
	note?: string;
	order?: number;
}

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
		title: { type: String, required: true, trim: true, maxlength: 240 },
		publisher: { type: String, default: "", trim: true, maxlength: 160 },
		year: { type: Number, min: 0, max: 9999 },
		url: { type: String, default: "", trim: true, maxlength: 500 },
		doi: { type: String, default: "", trim: true, maxlength: 200 },
		stance: {
			type: String,
			required: true,
			default: "context",
			enum: ["supports", "context", "debate"]
		},
		note: { type: String, default: "", trim: true, maxlength: 1000 },
		order: { type: Number, default: 0 }
	},
	{ timestamps: true }
);

claimSourceSchema.index({ claim: 1, order: 1, createdAt: 1 });

export const ClaimSource: Model<IClaimSource> = mongoose.model<IClaimSource>("ClaimSource", claimSourceSchema);
