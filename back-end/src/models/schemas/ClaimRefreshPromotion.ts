import mongoose, { Schema } from "mongoose";

// Private operator receipt, never a fabricated authenticated editorial review.
// The original documents retain any pre-existing extraction and review history.
export const ClaimRefreshPromotion = mongoose.model("ClaimRefreshPromotion", new Schema({
	_id: { type: String, required: true },
	appliedAt: { type: Date, required: true },
	actorType: { type: String, enum: ["system"], required: true },
	operatorNote: { type: String, required: true, maxlength: 2000 },
	backupSha256: { type: String, required: true, match: /^[a-f0-9]{64}$/ },
	definitionHash: { type: String, required: true },
	selection: { type: [String], required: true },
	before: { type: Schema.Types.Mixed, required: true },
	changes: { type: Schema.Types.Mixed, required: true }
}, { autoCreate: false, autoIndex: false }));
