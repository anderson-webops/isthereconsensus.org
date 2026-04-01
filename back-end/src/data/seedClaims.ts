import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { Topic } from "../models/schemas/Topic.js";
import { defaultClaims } from "./claims.js";

export async function seedClaims() {
	for (const seed of defaultClaims) {
		const topic = await Topic.findOne({ slug: seed.topicSlug });
		if (!topic) continue;

		const claim = await Claim.findOneAndUpdate(
			{ topic: topic._id, slug: seed.slug },
			{
				$setOnInsert: {
					topic: topic._id,
					title: seed.title,
					slug: seed.slug,
					status: seed.status,
					consensusBand: seed.consensusBand,
					confidenceScore: seed.confidenceScore,
					bottomLine: seed.bottomLine,
					stableCore: seed.stableCore,
					openQuestions: seed.openQuestions,
					whatWouldChangeMinds: seed.whatWouldChangeMinds,
					misconceptions: seed.misconceptions,
					editorSummary: seed.editorSummary,
					lastReviewedAt: new Date(),
					nextReviewAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
					publishedAt: seed.status === "published" ? new Date() : undefined
				}
			},
			{ upsert: true, new: true }
		);

		for (const source of seed.sources) {
			await ClaimSource.findOneAndUpdate(
				{ claim: claim._id, title: source.title },
				{ $setOnInsert: { claim: claim._id, ...source } },
				{ upsert: true, new: true }
			);
		}
	}
}
