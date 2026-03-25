import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IExpertApplication {
	user: mongoose.Types.ObjectId;
	name: string;
	affiliation?: string;
	credentialLabel: string;
	expertiseAreas: string[];
	evidenceLinks: string[];
	statement: string;
	status: "pending" | "approved" | "rejected" | "needs-info";
	reviewNotes?: string;
	reviewedBy?: mongoose.Types.ObjectId;
	reviewedAt?: Date;
}

const expertApplicationSchema: Schema<IExpertApplication> = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
		name: { type: String, required: true, trim: true, maxlength: 120 },
		affiliation: { type: String, default: "", trim: true, maxlength: 160 },
		credentialLabel: { type: String, required: true, trim: true, maxlength: 160 },
		expertiseAreas: { type: [String], default: [] },
		evidenceLinks: { type: [String], default: [] },
		statement: { type: String, required: true, trim: true, maxlength: 4000 },
		status: {
			type: String,
			default: "pending",
			enum: ["pending", "approved", "rejected", "needs-info"],
			index: true
		},
		reviewNotes: { type: String, default: "", trim: true, maxlength: 2000 },
		reviewedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
		reviewedAt: { type: Date }
	},
	{ timestamps: true }
);

export const ExpertApplication: Model<IExpertApplication> = mongoose.model<IExpertApplication>(
	"ExpertApplication",
	expertApplicationSchema
);
