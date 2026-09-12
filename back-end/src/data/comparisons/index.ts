import { airCleaningComparison } from "./air-cleaning.js";
import { caffeineComparison } from "./caffeine.js";
import { electricityComparison } from "./electricity.js";
import { exerciseBpComparison } from "./exercise-bp.js";
import { heatingComparison } from "./heating.js";
import { insomniaComparison } from "./insomnia.js";
import { strengthComparison } from "./strength.js";
import { waterComparison } from "./water.js";

export const evidenceComparisons = [
	electricityComparison,
	caffeineComparison,
	strengthComparison,
	insomniaComparison,
	heatingComparison,
	airCleaningComparison,
	exerciseBpComparison,
	waterComparison
];

export function comparisonForSlug(slug: string) {
	return evidenceComparisons.find(comparison => comparison.slug === slug);
}

export function comparisonsForGuide(path: string) {
	return evidenceComparisons.filter(comparison => comparison.guidePath === path);
}

export function comparisonsForTopic(slug: string) {
	return evidenceComparisons.filter(comparison => comparison.topics.includes(slug));
}

export function comparisonsForReview(path: string) {
	return evidenceComparisons.filter(comparison => comparison.reviews.some(review => review.path === path));
}
