import type { ClaimEvidenceSummary, ClaimUncertaintyDriver } from "~/types/board";

const generatedFallbackPopulation =
	"Public-facing summary built from the highest-weight evidence available for this claim.";

const retiredFallbackLimits = new Set(
	[
		"Most remaining uncertainty is about which subgroups, settings, or exposure levels look different from the main population-level finding.",
		"The direction is stable, but the exact size of the effect or risk can still move across syntheses and real-world settings.",
		"Policy, communication, or rollout choices can change practical outcomes even when the underlying evidence direction is settled.",
		"The main direction looks durable, but effect size, baseline risk, or subgroup differences are still moving enough to matter.",
		"Results may not travel equally well across populations, settings, or implementation contexts.",
		"Longer follow-up or a newer synthesis could tighten or narrow the current public-facing answer.",
		"Some of the evidence comes from adjacent populations, proxy outcomes, or partial versions of the public claim rather than a direct test of it.",
		"Study-design limitations, confounding, or uneven measurement still make the body of evidence vulnerable to revision.",
		"Longer follow-up and stronger syntheses could still shift both the size and the interpretation of the current signal.",
		"High-weight sources do not yet converge cleanly on one interpretation of the evidence.",
		"Effect estimates and practical risk ranges are still unstable enough that a stronger synthesis could materially change the summary.",
		"The evidence base still leans on partial, proxy, or otherwise indirect signals rather than a direct durable answer."
	].map(normalizeText)
);

function normalizeText(value?: string) {
	return value?.trim().replace(/\s+/g, " ").toLocaleLowerCase() ?? "";
}

export function isGeneratedFallbackEvidenceSummary(
	summary: ClaimEvidenceSummary,
	claimTitle?: string,
	bottomLine?: string
) {
	const population = normalizeText(summary.population);
	return (
		population.startsWith(normalizeText(generatedFallbackPopulation)) &&
		normalizeText(summary.question) === normalizeText(claimTitle) &&
		normalizeText(summary.finding) === normalizeText(bottomLine)
	);
}

export function selectVisibleEvidenceSummaries(
	summaries: ClaimEvidenceSummary[],
	claimTitle?: string,
	bottomLine?: string
) {
	return summaries.filter((summary) => !isGeneratedFallbackEvidenceSummary(summary, claimTitle, bottomLine));
}

interface SelectUncertaintyLimitsOptions {
	drivers: ClaimUncertaintyDriver[];
	openQuestions: string[];
	evidenceSummaries: ClaimEvidenceSummary[];
	limit?: number;
}

export function selectDistinctUncertaintyLimits({
	drivers,
	openQuestions,
	evidenceSummaries,
	limit = 4
}: SelectUncertaintyLimitsOptions) {
	const openQuestionSet = new Set(openQuestions.map(normalizeText));
	const seen = new Set<string>();
	const limits: string[] = [];
	const candidates = [
		...drivers.map((driver) => driver.detail),
		...evidenceSummaries.flatMap((summary) => summary.limitations ?? [])
	];

	for (const candidate of candidates) {
		const trimmed = candidate.trim();
		const normalized = normalizeText(trimmed);
		if (
			!normalized ||
			openQuestionSet.has(normalized) ||
			retiredFallbackLimits.has(normalized) ||
			seen.has(normalized)
		) {
			continue;
		}
		seen.add(normalized);
		limits.push(trimmed);
		if (limits.length >= limit) break;
	}

	return limits;
}
