import { z } from "zod";

export const MAX_SAVED_COMPARISONS = 50;
export const comparisonSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const savedComparisonSlugsSchema = z.array(z.string().max(100).regex(comparisonSlugPattern))
	.max(MAX_SAVED_COMPARISONS)
	.refine(values => new Set(values).size === values.length);

// Omitting this new field in an older client's replacement must not erase it.
// An explicit empty array remains the reader's request to clear comparisons.
export function replacementComparisons(incoming: string[] | undefined, current: string[] = []) {
	return incoming ?? current;
}
