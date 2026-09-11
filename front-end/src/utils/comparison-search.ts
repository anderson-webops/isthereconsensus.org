import { createClaimSearchIndex } from "../../../back-end/src/utils/claimSearch.js";
import { evidenceComparisons } from "../data/comparisons/index.js";

// Retrieval only: comparison options belong in their own result group, never
// in canonical review counts, consensus ratings or exact-claim routing.
const index = createClaimSearchIndex(
	evidenceComparisons.map((comparison) => ({
		slug: comparison.slug,
		title: [comparison.title, ...comparison.options.map((option) => option.label)].join(" "),
		bottomLine: comparison.description,
		editorSummary: [
			...comparison.outcomes.map((outcome) => outcome.label),
			...comparison.contexts.map((context) => context.label)
		].join(" "),
		comparison
	}))
);

export function searchComparisons(query: string) {
	const bounded = query.trim().slice(0, 160);
	if (!bounded) return [];
	const concepts = bounded
		.replace(/\b(?:compare|comparing|comparison|comparisons|vs|versus|options)\b/giu, " ")
		.trim();
	return concepts ? index(concepts).map((result) => result.claim.comparison) : evidenceComparisons;
}
