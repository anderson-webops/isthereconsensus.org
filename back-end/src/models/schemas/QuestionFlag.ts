import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface IQuestionFlag {
	question: mongoose.Types.ObjectId;
	reporter: mongoose.Types.ObjectId;
	reporterModel: "User" | "Admin";
	reporterName: string;
	reason: "off-topic" | "duplicate" | "misleading" | "low-quality" | "needs-sources" | "abusive";
	note?: string;
	status: "open" | "reviewed" | "dismissed";
	reviewedBy?: mongoose.Types.ObjectId;
	reviewedAt?: Date;
}

const questionFlagSchema: Schema<IQuestionFlag> = new Schema(
	{
		question: { type: Schema.Types.ObjectId, ref: "Question", required: true, index: true },
		reporter: { type: Schema.Types.ObjectId, required: true, index: true },
		reporterModel: { type: String, enum: ["User", "Admin"], required: true },
		reporterName: { type: String, required: true, trim: true, maxlength: 80 },
		reason: {
			type: String,
			enum: ["off-topic", "duplicate", "misleading", "low-quality", "needs-sources", "abusive"],
			required: true
		},
		note: { type: String, default: "", trim: true, maxlength: 500 },
		status: { type: String, enum: ["open", "reviewed", "dismissed"], default: "open", index: true },
		reviewedBy: { type: Schema.Types.ObjectId, ref: "Admin" },
		reviewedAt: { type: Date }
	},
	{ timestamps: true }
);

questionFlagSchema.index({ question: 1, reporter: 1, reporterModel: 1 }, { unique: true });

export const QuestionFlag: Model<IQuestionFlag> = mongoose.model<IQuestionFlag>("QuestionFlag", questionFlagSchema);
