import type { ComparisonEstimate, EvidenceComparison } from "../data/comparisons/types";

export function formatComparisonEstimate(estimate: ComparisonEstimate) {
	const prefix = estimate.qualifier === "less_than" ? "<" : estimate.qualifier === "approximately" ? "≈" : "";
	return `${prefix}${estimate.value.toLocaleString("en-US", { maximumFractionDigits: 20 })}`;
}

export function resolveComparisonSelection(comparison: EvidenceComparison, query: Record<string, unknown>) {
	const outcome = comparison.outcomes.find((item) => item.id === query.outcome) || comparison.outcomes[0]!;
	const context = comparison.contexts.find((item) => item.id === query.context) || comparison.contexts[0]!;
	const requested = typeof query.options === "string" ? query.options.split(",") : undefined;
	const selected = comparison.options.filter((option) => !requested || requested.includes(option.id));
	const options = selected.length || query.options === "" ? selected : comparison.options;
	return { outcome, context, options };
}
