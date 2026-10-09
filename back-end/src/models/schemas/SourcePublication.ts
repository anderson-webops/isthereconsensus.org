import mongoose, { Schema } from "mongoose";

const sourcePublicationSchema = new Schema({
	key: { type: String, required: true, unique: true },
	releaseId: { type: String, required: true },
	contentHash: { type: String, required: true, match: /^[a-f\d]{64}$/ },
	claimId: { type: Schema.Types.ObjectId, required: true },
	sourceIds: { type: [Schema.Types.ObjectId], required: true },
	coverageId: { type: Schema.Types.ObjectId, required: true },
	state: { type: String, enum: ["pending", "published"], default: "pending", required: true },
	publishedAt: { type: Date, default: null }
}, { timestamps: true, strict: "throw" });

export const SourcePublication = mongoose.model("SourcePublication", sourcePublicationSchema);
