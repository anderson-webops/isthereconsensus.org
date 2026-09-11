import type { ComparisonAnnouncement, EvidenceComparison } from "./types.js";

// These are deliberate, source-backed editorial events, never checkedAt,
// deployment timestamps, saved-state changes or automatic freshness signals.
// Dates on the initial three entries record their original source releases.
export function validComparisonAnnouncement(value: ComparisonAnnouncement, comparison: EvidenceComparison) {
	if (!value || typeof value !== "object" || typeof value.date !== "string") return false;
	const date = new Date(value.date);
	return typeof value.id === "string"
		&& /^[a-f\d]{8}-[a-f\d]{4}-[1-8][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/.test(value.id)
		&& /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value.date)
		&& Number.isFinite(date.getTime())
		&& date.toISOString().replace(".000Z", "Z") === value.date.replace(".000Z", "Z")
		&& ["new_comparison", "evidence_update", "correction"].includes(value.kind)
		&& ["new", "changed", "unchanged", "not_assessed"].includes(value.bottomLineImpact)
		&& (value.kind === "new_comparison") === (value.bottomLineImpact === "new")
		&& typeof value.summary === "string" && value.summary.trim().length >= 20 && value.summary.length <= 500
		&& Array.isArray(value.sourceIds) && value.sourceIds.length > 0
		&& value.sourceIds.length <= comparison.sources.length
		&& new Set(value.sourceIds).size === value.sourceIds.length
		&& value.sourceIds.every(id => comparison.sources.some(source => source.id === id));
}

export function compareUpdatePosition(a: { date: Date; id: string }, b: { date: Date; id: string }) {
	// Binary ordering matches Mongo's default string collation for cursor ties.
	return b.date.getTime() - a.date.getTime() || (a.id === b.id ? 0 : a.id < b.id ? 1 : -1);
}

export function comparisonHistory(comparison: EvidenceComparison, asOf = new Date()) {
	const seen = new Set<string>();
	return (comparison.readerUpdates ?? []).slice(-100).filter((update) => {
		if (!validComparisonAnnouncement(update, comparison) || new Date(update.date) > asOf || seen.has(update.id)) return false;
		seen.add(update.id);
		return true;
	}).sort((a, b) => compareUpdatePosition({ ...a, date: new Date(a.date) }, { ...b, date: new Date(b.date) }));
}

export function selectedComparisonUpdates(
	comparisons: EvidenceComparison[],
	savedSlugs: string[],
	topicSlugs: string[],
	asOf: Date,
	windowStart: Date,
	cursor?: { before: string; id: string }
) {
	const before = cursor && { date: new Date(cursor.before), id: cursor.id };
	return comparisons.filter(comparison => savedSlugs.includes(comparison.slug) || comparison.topics.some(slug => topicSlugs.includes(slug)))
		.flatMap(comparison => comparisonHistory(comparison, asOf).map(announcement => ({
			comparison: { slug: comparison.slug, title: comparison.title, description: comparison.description },
			update: { ...announcement, date: new Date(announcement.date) }
		})))
		.filter(row => row.update.date >= windowStart && (!before || compareUpdatePosition(row.update, before) > 0))
		.sort((a, b) => compareUpdatePosition(a.update, b.update));
}
