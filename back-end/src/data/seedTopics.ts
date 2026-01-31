import { Topic } from "../models/schemas/Topic.js";
import { defaultTopics } from "./topics.js";

export async function seedTopics() {
	for (const topic of defaultTopics) {
		await Topic.findOneAndUpdate(
			{ slug: topic.slug },
			{ $setOnInsert: topic },
			{ upsert: true, new: true }
		);
	}
}
