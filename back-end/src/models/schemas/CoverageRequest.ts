import mongoose, { Schema } from "mongoose";
import { coverageStatuses, coverageVisibilities } from "../../utils/coverageRoadmap.js";

const coverageRequestSchema = new Schema({
	title: { type: String, required: true, minlength: 10, maxlength: 200 },
	summary: { type: String, required: true, minlength: 40, maxlength: 1200 },
	status: { type: String, enum: coverageStatuses, required: true, default: "planned" },
	visibility: { type: String, enum: coverageVisibilities, required: true, default: "draft" },
	feedbackId: { type: String, match: /^[a-f\d]{64}$/ },
	topicId: { type: Schema.Types.ObjectId, ref: "Topic", default: null },
	claimId: { type: Schema.Types.ObjectId, ref: "Claim", default: null },
	revision: { type: Number, required: true, default: 0, min: 0, validate: Number.isSafeInteger },
	publicUpdatedAt: { type: Date, default: null },
	publicHistory: {
		type: [{
			_id: false,
			date: { type: Date, required: true },
			status: { type: String, required: true, enum: coverageStatuses },
			summary: { type: String, required: true, minlength: 10, maxlength: 500 }
		}],
		default: []
	},
	audit: {
		type: [{
			_id: false,
			date: { type: Date, required: true },
			adminId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
			revision: { type: Number, required: true },
			operation: { type: String, required: true, enum: ["create", "save", "approve", "withdraw"] },
			visibility: { type: String, required: true, enum: coverageVisibilities },
			status: { type: String, required: true, enum: coverageStatuses },
			note: { type: String, required: true, minlength: 10, maxlength: 1000 }
		}],
		default: []
	}
}, { timestamps: true, versionKey: false, strict: "throw" });

coverageRequestSchema.index({ visibility: 1, status: 1, publicUpdatedAt: -1, _id: -1 });
coverageRequestSchema.index({ feedbackId: 1 });

export const CoverageRequest = mongoose.model("CoverageRequest", coverageRequestSchema);
