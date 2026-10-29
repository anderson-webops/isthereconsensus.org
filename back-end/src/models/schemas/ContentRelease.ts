import mongoose, { Schema } from "mongoose";

const contentReleaseSchema = new Schema({
	_id: { type: String, required: true },
	releaseId: { type: String, required: true },
	contentHash: { type: String, required: true, match: /^[a-f\d]{64}$/ },
	key: { type: String, required: true },
	actorType: {
		type: String,
		required: true,
		enum: ["system"]
	},
	approvalBasis: {
		type: String,
		required: true,
		enum: ["owner_content_first"]
	},
	appliedAt: { type: Date, required: true },
	before: { type: Schema.Types.Mixed, required: true },
	after: { type: Schema.Types.Mixed, required: true }
}, { strict: "throw", timestamps: true });

export const ContentRelease = mongoose.model("ContentRelease", contentReleaseSchema);
