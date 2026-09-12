import mongoose, { Schema } from "mongoose";
import { feedbackKinds, feedbackStatuses } from "../../utils/readerFeedback.js";

const feedbackSchema = new Schema(
	{
		_id: { type: String, required: true, match: /^[a-f\d]{64}$/ },
		kind: { type: String, required: true, enum: feedbackKinds },
		claimId: { type: Schema.Types.ObjectId, ref: "Claim" },
		comparisonSlug: { type: String, maxlength: 100, match: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
		topicId: { type: Schema.Types.ObjectId, ref: "Topic" },
		helpful: { type: Boolean },
		area: { type: String, enum: ["source", "population", "outcome", "explanation", "other"] },
		title: { type: String, maxlength: 200 },
		referenceTitle: { type: String, maxlength: 500 },
		message: { type: String, maxlength: 1200 },
		sourceUrl: { type: String, maxlength: 500 },
		status: { type: String, enum: feedbackStatuses, default: "new", required: true },
		priority: { type: Number, min: 0, max: 2, default: 1, required: true },
		revision: { type: Number, default: 0, required: true },
		linkedClaimId: { type: Schema.Types.ObjectId, ref: "Claim" },
		linkedTopicId: { type: Schema.Types.ObjectId, ref: "Topic" },
		reviews: {
			type: [
				{
					_id: false,
					status: { type: String, enum: feedbackStatuses, required: true },
					priority: { type: Number, required: true },
					note: { type: String, required: true, maxlength: 1000 },
					adminId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
					date: { type: Date, required: true },
					linkedClaimId: { type: Schema.Types.ObjectId, ref: "Claim" },
					linkedTopicId: { type: Schema.Types.ObjectId, ref: "Topic" }
				}
			],
			default: []
		},
		expiresAt: { type: Date, required: true }
	},
	{ timestamps: true, versionKey: false, strict: "throw" }
);

feedbackSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
feedbackSchema.index({ status: 1, priority: -1, createdAt: -1, _id: -1 });
feedbackSchema.index({ claimId: 1, createdAt: -1 });
feedbackSchema.index({ linkedClaimId: 1, status: 1, expiresAt: 1 });
feedbackSchema.index({ comparisonSlug: 1, createdAt: -1 });
feedbackSchema.index({ topicId: 1, createdAt: -1 });

export const ReaderFeedback = mongoose.model("ReaderFeedback", feedbackSchema);
