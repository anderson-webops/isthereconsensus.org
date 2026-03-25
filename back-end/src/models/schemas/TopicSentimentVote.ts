import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

export interface ITopicSentimentVote {
	topic: mongoose.Types.ObjectId;
	voter: mongoose.Types.ObjectId;
	voterModel: "User" | "Admin";
	stance: "aligns" | "uncertain" | "skeptical";
	confidence: number;
	note?: string;
}

const topicSentimentVoteSchema: Schema<ITopicSentimentVote> = new Schema(
	{
		topic: { type: Schema.Types.ObjectId, ref: "Topic", required: true, index: true },
		voter: { type: Schema.Types.ObjectId, required: true, index: true },
		voterModel: { type: String, enum: ["User", "Admin"], required: true },
		stance: { type: String, enum: ["aligns", "uncertain", "skeptical"], required: true },
		confidence: { type: Number, min: 1, max: 5, default: 3 },
		note: { type: String, default: "", trim: true, maxlength: 300 }
	},
	{ timestamps: true }
);

topicSentimentVoteSchema.index({ topic: 1, voter: 1, voterModel: 1 }, { unique: true });

export const TopicSentimentVote: Model<ITopicSentimentVote> = mongoose.model<ITopicSentimentVote>(
	"TopicSentimentVote",
	topicSentimentVoteSchema
);
