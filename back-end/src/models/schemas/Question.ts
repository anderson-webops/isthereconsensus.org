import type { Model } from "mongoose";
import type { ITopic } from "./Topic.js";
import mongoose, { Schema } from "mongoose";

export interface IQuestion {
	title: string;
	body?: string;
	topic: ITopic | mongoose.Types.ObjectId;
	sourceUrl?: string;
	displayName?: string;
	author?: mongoose.Types.ObjectId;
	authorModel?: "User" | "Admin";
	authorName?: string;
	status?: "open" | "flagged" | "archived";
}

const questionSchema: Schema<IQuestion> = new Schema(
	{
		title: { type: String, required: true, trim: true, maxlength: 200 },
		body: { type: String, default: "", trim: true, maxlength: 4000 },
		sourceUrl: { type: String, default: "", trim: true, maxlength: 500 },
		displayName: { type: String, default: "", trim: true, maxlength: 80 },
		author: { type: Schema.Types.ObjectId, refPath: "authorModel", index: true },
		authorModel: { type: String, enum: ["User", "Admin"], default: "User" },
		authorName: { type: String, default: "", trim: true, maxlength: 80 },
		status: { type: String, default: "open", enum: ["open", "flagged", "archived"] },
		topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true, index: true }
	},
	{ timestamps: true }
);

export const Question: Model<IQuestion> = mongoose.model<IQuestion>("Question", questionSchema);
