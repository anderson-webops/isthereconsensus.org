import type { Topic } from "../types/board";
import { formatCountLabel } from "./format-count";

export function formatPublicCountLabel(count: number, kind: "review" | "topic") {
	if (!Number.isSafeInteger(count) || count < 0) {
		return kind === "review"
			? "Reviews unavailable"
			: "Topics unavailable";
	}
	const step = kind === "review"
		? 1000
		: 5;
	return count >= step
		? `${Math.floor(count / step) * step}+ ${kind}s`
		: formatCountLabel(count, kind);
}

export function formatPublicLibrarySummary(topics: readonly Pick<Topic, "slug" | "claimCount">[] | null | undefined) {
	const fallback = "Browse reviewed claims by topic";
	if (!topics?.length) return fallback;
	const slugs = new Set<string>();
	let total = 0;
	for (const topic of topics) {
		if (!topic.slug?.trim() || slugs.has(topic.slug)) return fallback;
		if (typeof topic.claimCount !== "number" || !Number.isSafeInteger(topic.claimCount) || topic.claimCount < 0)
			return fallback;
		slugs.add(topic.slug);
		total += topic.claimCount;
		if (!Number.isSafeInteger(total)) return fallback;
	}
	return total >= 1000
		? `Browse ${Math.floor(total / 1000) * 1000}+ reviewed claims by topic`
		: fallback;
}
