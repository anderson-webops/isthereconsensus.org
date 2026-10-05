import type { ReadingGuideSummary } from "../data/reading-guides/types";

type GuideReview = ReadingGuideSummary["reviews"][number];
export type GuideReviewAvailability = "published" | "not_published" | "unavailable";
export type AvailableGuideReview = GuideReview & { availability: GuideReviewAvailability };

const reviewPath = /^\/consensus\/([a-z0-9]+(?:-[a-z0-9]+)*)\/([a-z0-9]+(?:-[a-z0-9]+)*)$/;
const safeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export async function loadGuideReviewAvailability(
	reviews: readonly GuideReview[],
	loadPublishedTopicClaims: (topic: string) => Promise<unknown>
): Promise<AvailableGuideReview[]> {
	const parsed = reviews.map((review) => ({ review, match: reviewPath.exec(review.path) }));
	const topics = [
		...new Set(parsed.map((entry) => entry.match?.[1]).filter((topic): topic is string => Boolean(topic)))
	];
	const results = await Promise.all(
		topics.map(async (topic) => {
			try {
				const response = await loadPublishedTopicClaims(topic);
				if (!response || typeof response !== "object" || !Object.hasOwn(response, "claims"))
					throw new Error("Invalid public topic response");
				const claims = (response as Record<string, unknown>).claims;
				if (!Array.isArray(claims)) throw new Error("Invalid public claim list");
				const slugs = new Set<string>();
				for (const claim of claims) {
					if (
						!claim ||
						typeof claim !== "object" ||
						typeof claim.slug !== "string" ||
						!safeSlug.test(claim.slug) ||
						(claim.status !== undefined && claim.status !== "published")
					) {
						throw new Error("Invalid public claim row");
					}
					slugs.add(claim.slug);
				}
				return { topic, slugs };
			} catch {
				return { topic, slugs: null };
			}
		})
	);
	const byTopic = new Map(results.map((result) => [result.topic, result.slugs]));
	return parsed.map(({ review, match }) => {
		const slugs = match ? byTopic.get(match[1]!) : null;
		return {
			path: review.path,
			label: review.label,
			availability: !slugs ? "unavailable" : slugs.has(match![2]!) ? "published" : "not_published"
		};
	});
}
