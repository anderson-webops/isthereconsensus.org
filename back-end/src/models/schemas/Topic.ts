import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";
import { slugify } from "../../utils/slugify.js";

export interface ITopic {
	title: string;
	slug: string;
	description?: string;
	order?: number;
	accent?: string;
}

const topicSchema: Schema<ITopic> = new Schema(
	{
		title: { type: String, required: true, trim: true, unique: true },
		slug: { type: String, required: true, trim: true, lowercase: true, unique: true, index: true },
		description: { type: String, default: "", trim: true },
		order: { type: Number, default: 0 },
		accent: { type: String, default: "" }
	},
	{ timestamps: true }
);

topicSchema.pre("validate", function () {
	if (!this.slug && this.title) {
		this.slug = slugify(this.title);
	}
});

export const Topic: Model<ITopic> = mongoose.model<ITopic>("Topic", topicSchema);
