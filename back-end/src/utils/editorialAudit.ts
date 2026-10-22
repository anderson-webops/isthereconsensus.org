import type { CompleteSeedClaim } from "../data/claims.js";
import { isRevisionCommentary, researchPreparation } from "./researchIntegrity.js";

const healthTopics = new Set(["health-and-medicine", "infection-immunity-and-vaccines", "mental-health-and-treatment", "cancer-prevention-and-care", "cardiovascular-metabolic-and-kidney-health", "reproductive-and-sexual-health", "substance-use-and-addiction"]);

export function estimatedReadingGrade(text: string) {
	const words = text.toLowerCase().match(/[a-z]+(?:'[a-z]+)?/g) ?? [];
	if (!words.length) return null;
	const sentences = Math.max(1, (text.match(/[.!?]+(?=\s|$)/g) ?? []).length);
	const syllables = words.reduce((total, word) => {
		const simplified = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
		return total + Math.max(1, (simplified.match(/[aeiouy]+/g) ?? []).length);
	}, 0);
	return Math.round((0.39 * words.length / sentences + 11.8 * syllables / words.length - 15.59) * 10) / 10;
}

export function editorialConcerns(claim: CompleteSeedClaim, referenceYear: number) {
	const reasons: string[] = [];
	const years = claim.sources.flatMap(source => Number.isInteger(source.year) ? [source.year!] : []);
	const newestSourceYear = years.length ? Math.max(...years) : null;
	const health = healthTopics.has(claim.topicSlug);
	if (isRevisionCommentary(claim.editorSummary)) reasons.push("revision_commentary");
	if (/\b(?:always|every|proven|alone|reliably)\b/i.test(claim.title)) reasons.push("absolute_wording_check");
	if (/\band\s+(?:do|does|is|are|can|will|should)\b/i.test(claim.title)) reasons.push("bundled_question_check");
	if (health && claim.reviewMode !== "living") reasons.push("health_followup_not_scheduled");
	if (newestSourceYear !== null && referenceYear - newestSourceYear >= 8) reasons.push(health ? "health_source_age_check" : "foundational_source_age_check");
	if (newestSourceYear === null) reasons.push("source_years_not_recorded");
	if (claim.sources.length <= 2) reasons.push("source_coverage_check");
	if (/\b(?:FDA|EPA|OSHA|FTC)\b/.test(claim.title) && !/\bUS\b|\bU\.S\.|\bUnited States\b/.test(claim.title)) reasons.push("jurisdiction_label_check");
	const readingGrade = estimatedReadingGrade(claim.bottomLine);
	if (readingGrade !== null && readingGrade > 10) reasons.push("answer_readability_check");
	return { reasons, newestSourceYear, estimatedReadingGrade: readingGrade };
}

export function auditClaimCatalog(claims: CompleteSeedClaim[], referenceYear: number) {
	if (!Number.isInteger(referenceYear) || referenceYear < 2000 || referenceYear > 2200) throw new Error("Use an explicit reference year.");
	const topics: Record<string, number> = {};
	const bands: Record<string, number> = {};
	const reasons: Record<string, number> = {};
	const rows = claims.map((claim) => {
		topics[claim.topicSlug] = (topics[claim.topicSlug] ?? 0) + 1;
		bands[claim.consensusBand] = (bands[claim.consensusBand] ?? 0) + 1;
		const concerns = editorialConcerns(claim, referenceYear);
		for (const reason of concerns.reasons) reasons[reason] = (reasons[reason] ?? 0) + 1;
		return {
			key: `${claim.topicSlug}/${claim.slug}`,
			title: claim.title,
			sourceCount: claim.sources.length,
			preparation: researchPreparation(claim).method,
			...concerns
		};
	});
	return {
		schemaVersion: 1,
		referenceYear,
		basis: "Source-controlled catalog, not a live database inventory or expert review.",
		interpretation: "Flags are review candidates, not quality failures. Old foundational sources, few strong sources, and absent DOIs are not automatic defects. Reading grades use a heuristic syllable count, not reader-comprehension testing.",
		claims: claims.length,
		topics,
		bands,
		reasons,
		rows
	};
}
