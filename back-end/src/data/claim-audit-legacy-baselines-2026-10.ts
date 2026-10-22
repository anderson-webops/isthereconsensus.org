import type { CompleteSeedClaim } from "./claims.js";

export function legacyEditorialBaseline(seed: CompleteSeedClaim): CompleteSeedClaim {
	const qualified = new Set([
		"health-and-medicine/are-nicotine-e-cigarettes-less-harmful-than-smoking-and-do-they-help-people-quit",
		"health-and-medicine/does-fluoride-in-community-drinking-water-prevent-tooth-decay-and-is-it-safe",
		"economics-and-social-policy/do-modest-minimum-wage-increases-always-cause-large-job-losses"
	]);
	const key = `${seed.topicSlug}/${seed.slug}`;
	if (qualified.has(key)) {
		return { ...seed, uncertaintyDrivers: [...seed.uncertaintyDrivers, { type: "imprecision", detail: "The main direction looks durable, but effect size, baseline risk, or subgroup differences are still moving enough to matter." }, { type: "generalizability", detail: "Results may not travel equally well across populations, settings, or implementation contexts." }, { type: "timing", detail: "Longer follow-up or a newer synthesis could tighten or narrow the current public-facing answer." }] };
	}
	if (key === "nutrition-and-diet/are-dietary-supplements-fda-approved-like-drugs") {
		return {
			...seed,
			uncertaintySummary: "The core direction of this claim is stable across the highest-weight sources. Most remaining uncertainty is about subgroup boundaries, effect size, or how the answer travels across settings, not whether the core conclusion reverses.",
			uncertaintyDrivers: [...seed.uncertaintyDrivers, { type: "generalizability", detail: "Most remaining uncertainty is about which subgroups, settings, or exposure levels look different from the main population-level finding." }, { type: "imprecision", detail: "The direction is stable, but the exact size of the effect or risk can still move across syntheses and real-world settings." }, { type: "implementation", detail: "Policy, communication, or rollout choices can change practical outcomes even when the underlying evidence direction is settled." }]
		};
	}
	return seed;
}
