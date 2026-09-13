import { normalizeHttpUrl } from "./accountValidation.js";

const legacyLabelPattern = /^[\p{L}\p{N}][\p{L}\p{N} .,'()&/_-]*$/u;

export function normalizeCitationStatusSources(value: unknown, existing: readonly string[]): string[] {
	if (!Array.isArray(value)) throw new Error("Status sources must be a list.");
	const labels = existing.filter(item => item.length <= 500 && legacyLabelPattern.test(item));
	const knownLabels = new Set(labels);
	const submitted = value.map((item) => {
		if (typeof item !== "string") throw new Error("Each status source must be a URL or an existing provenance label.");
		const candidate = item.trim();
		return knownLabels.has(candidate) ? candidate : normalizeHttpUrl(item, 500);
	}).filter(Boolean);
	const result = [...new Set([...labels, ...submitted])];
	const limit = Math.max(6, existing.length);
	if (result.length > limit) throw new Error(`Status sources must contain at most ${limit} entries; no entries were saved.`);
	return result;
}
