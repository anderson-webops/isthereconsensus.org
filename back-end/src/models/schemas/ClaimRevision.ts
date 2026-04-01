import type { Model } from "mongoose";
import type { IClaim } from "./Claim.js";
import mongoose, { Schema } from "mongoose";

export interface IClaimRevision {
	claim: IClaim | mongoose.Types.ObjectId;
	editor: mongoose.Types.ObjectId;
	editorModel: "User" | "Admin";
	summary: string;
	snapshot: Record<string, unknown>;
}

const claimRevisionSchema: Schema<IClaimRevision> = new Schema(
	{
		claim: { type: Schema.Types.ObjectId, ref: "Claim", required: true, index: true },
		editor: { type: Schema.Types.ObjectId, refPath: "editorModel", required: true, index: true },
		editorModel: { type: String, enum: ["User", "Admin"], required: true },
		summary: { type: String, default: "", trim: true, maxlength: 2000 },
		snapshot: { type: Schema.Types.Mixed, required: true }
	},
	{ timestamps: true }
);

claimRevisionSchema.index({ claim: 1, createdAt: -1 });

export const ClaimRevision: Model<IClaimRevision> = mongoose.model<IClaimRevision>("ClaimRevision", claimRevisionSchema);
