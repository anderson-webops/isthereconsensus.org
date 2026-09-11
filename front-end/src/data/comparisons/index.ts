import { caffeineComparison } from "./caffeine";
import { electricityComparison } from "./electricity";
import { strengthComparison } from "./strength";

export const evidenceComparisons = [electricityComparison, caffeineComparison, strengthComparison];

export function comparisonForSlug(slug: string) {
	return evidenceComparisons.find((comparison) => comparison.slug === slug);
}

export function comparisonsForGuide(path: string) {
	return evidenceComparisons.filter((comparison) => comparison.guidePath === path);
}

export function comparisonsForTopic(slug: string) {
	return evidenceComparisons.filter((comparison) => comparison.topics.includes(slug));
}

export function comparisonsForReview(path: string) {
	return evidenceComparisons.filter((comparison) => comparison.reviews.some((review) => review.path === path));
}
