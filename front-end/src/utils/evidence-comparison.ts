import type { ComparisonEstimate, EvidenceComparison } from "../data/comparisons/types";

export function formatComparisonEstimate(estimate: ComparisonEstimate) {
	const prefix = estimate.qualifier === "less_than" ? "<" : estimate.qualifier === "approximately" ? "≈" : "";
	return `${prefix}${estimate.value.toLocaleString("en-US", { maximumFractionDigits: 20 })}`;
}

export function estimateForSelection(
	option: EvidenceComparison["options"][number],
	outcome: EvidenceComparison["outcomes"][number],
	context: EvidenceComparison["contexts"][number]
) {
	if (!context.supportsEstimates) return undefined;
	const estimates = option.estimatesByContext ? option.estimatesByContext[context.id] : option.estimates;
	return estimates?.[outcome.id];
}

export function resolveComparisonSelection(comparison: EvidenceComparison, query: Record<string, unknown>) {
	const outcome = comparison.outcomes.find((item) => item.id === query.outcome) || comparison.outcomes[0]!;
	const context = comparison.contexts.find((item) => item.id === query.context) || comparison.contexts[0]!;
	const requested = typeof query.options === "string" ? query.options.split(",") : undefined;
	const selected = comparison.options.filter((option) => !requested || requested.includes(option.id));
	const options = selected.length || query.options === "" ? selected : comparison.options;
	return { outcome, context, options };
}

export function findingForSelection(
	option: EvidenceComparison["options"][number],
	outcome: EvidenceComparison["outcomes"][number],
	context: EvidenceComparison["contexts"][number]
) {
	if (!context.supportsEstimates) return undefined;
	return option.findingsByContext?.[context.id]?.[outcome.id];
}

interface SelectionChange {
	outcome?: string;
	context?: string;
	options?: string;
}

// Apply each change to the last completed navigation, not a stale render.
// Function changes let rapid checkbox toggles compose in the same way.
export function createComparisonNavigation(
	comparison: EvidenceComparison,
	readQuery: () => Record<string, unknown>,
	navigate: (query: Record<string, string>) => Promise<unknown>
) {
	let pending = Promise.resolve();
	return (
		change: SelectionChange | ((current: ReturnType<typeof resolveComparisonSelection>) => SelectionChange)
	) => {
		const next = pending.then(() => {
			const current = resolveComparisonSelection(comparison, readQuery());
			return navigate({
				outcome: current.outcome.id,
				context: current.context.id,
				options: current.options.map((option) => option.id).join(","),
				...(typeof change === "function" ? change(current) : change)
			});
		});
		// A failed navigation must not poison all later control changes.
		pending = next.then(
			() => undefined,
			() => undefined
		);
		return next;
	};
}
