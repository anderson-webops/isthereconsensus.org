import type { NoticeSnapshot } from "../../utils/reviewPriority.js";
import mongoose, { Schema } from "mongoose";

const snapshotSchema = new Schema<NoticeSnapshot>(
	{
		citationStatus: { type: String, required: true },
		retracted: { type: Boolean, required: true },
		expressionOfConcern: { type: Boolean, required: true },
		correctionOrErratum: { type: Boolean, required: true },
		doi: { type: String, default: "", maxlength: 240 },
		url: { type: String, default: "", maxlength: 500 },
		integrityNotes: { type: String, default: "", maxlength: 1000 },
		statusSources: { type: [String], default: [] }
	},
	{ _id: false, strict: "throw" }
);
const historySchema = new Schema(
	{
		fingerprint: { type: String, required: true },
		snapshot: { type: snapshotSchema, required: true },
		decision: { type: String, required: true, enum: ["open", "addressed"] },
		note: { type: String, required: true, minlength: 20, maxlength: 1000 },
		adminId: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
		date: { type: Date, required: true }
	},
	{ _id: false, strict: "throw" }
);

// Private operational disposition. Never changes or clears the source warning.
const schema = new Schema(
	{
		_id: { type: Schema.Types.ObjectId, ref: "ClaimSource", required: true },
		claim: { type: Schema.Types.ObjectId, ref: "Claim", required: true, index: true },
		snapshot: { type: snapshotSchema, required: true },
		fingerprint: { type: String, required: true, match: /^[a-f\d]{64}$/ },
		decision: { type: String, required: true, enum: ["open", "addressed"] },
		revision: { type: Number, required: true, min: 1 },
		history: { type: [historySchema], default: [] }
	},
	{ timestamps: true, versionKey: false, strict: "throw" }
);

export const SourceNoticeReview = mongoose.model("SourceNoticeReview", schema);
