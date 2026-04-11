import type { Model } from "mongoose";
import type { IClaim } from "./Claim.js";
import type { ITopic } from "./Topic.js";
import mongoose, { Schema } from "mongoose";

export interface IQuestion {
	_id?: mongoose.Types.ObjectId;
	title: string;
	normalizedQuestion?: string;
	body?: string;
	topic: ITopic | mongoose.Types.ObjectId;
	claim?: IClaim | mongoose.Types.ObjectId;
	sourceUrl?: string;
	sourceContextType?: "article" | "social" | "video" | "podcast" | "conversation" | "classroom" | "other";
	displayName?: string;
	author?: mongoose.Types.ObjectId;
	authorModel?: "User" | "Admin";
	authorName?: string;
	status?: "open" | "flagged" | "archived";
	routingStatus?: "unassigned" | "linked" | "duplicate";
	askKind?: "claim" | "topic" | "concept" | "discussion";
	closestMatchType?: "claim" | "topic" | "explainer" | "question" | "none";
	closestMatchLabel?: string;
	differenceNote?: string;
	loadedFrame?: boolean;
	multiQuestion?: boolean;
	linkedBy?: mongoose.Types.ObjectId;
	linkedAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

const questionSchema: Schema<IQuestion> = new Schema(
	{
		title: { type: String, required: true, trim: true, maxlength: 200 },
		normalizedQuestion: { type: String, default: "", trim: true, maxlength: 220 },
		body: { type: String, default: "", trim: true, maxlength: 4000 },
		sourceUrl: { type: String, default: "", trim: true, maxlength: 500 },
		sourceContextType: {
			type: String,
			default: "other",
			enum: ["article", "social", "video", "podcast", "conversation", "classroom", "other"]
		},
		displayName: { type: String, default: "", trim: true, maxlength: 80 },
		author: { type: Schema.Types.ObjectId, refPath: "authorModel", index: true },
		authorModel: { type: String, enum: ["User", "Admin"], default: "User" },
		authorName: { type: String, default: "", trim: true, maxlength: 80 },
		status: { type: String, default: "open", enum: ["open", "flagged", "archived"] },
		topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true, index: true },
		claim: { type: Schema.Types.ObjectId, ref: "Claim", index: true },
		routingStatus: {
			type: String,
			default: "unassigned",
			enum: ["unassigned", "linked", "duplicate"],
			index: true
		},
		askKind: {
			type: String,
			default: "discussion",
			enum: ["claim", "topic", "concept", "discussion"]
		},
		closestMatchType: {
			type: String,
			default: "none",
			enum: ["claim", "topic", "explainer", "question", "none"]
		},
		closestMatchLabel: { type: String, default: "", trim: true, maxlength: 240 },
		differenceNote: { type: String, default: "", trim: true, maxlength: 600 },
		loadedFrame: { type: Boolean, default: false },
		multiQuestion: { type: Boolean, default: false },
		linkedBy: { type: Schema.Types.ObjectId, index: true },
		linkedAt: { type: Date }
	},
	{ timestamps: true }
);

export const Question: Model<IQuestion> = mongoose.model<IQuestion>("Question", questionSchema);
