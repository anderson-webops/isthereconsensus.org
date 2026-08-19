import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";

describe("claim presentation defaults", () => {
	it("derives domain-neutral uncertainty limits from the claim's open questions", () => {
		const claim = defaultClaims.find(
			entry => entry.slug === "are-atoms-physically-real-rather-than-only-mathematical-conveniences"
		);
		assert.ok(claim, "Missing seeded atomic-reality claim");

		assert.doesNotMatch(
			claim.uncertaintySummary,
			/subgroup|population-level|policy|communication|rollout|implementation context/i
		);
		assert.deepEqual(
			claim.uncertaintyDrivers.map(driver => driver.detail),
			claim.openQuestions
		);
	});

	it("does not append the retired generic health and policy limits", () => {
		const retiredFallbacks = [
			"Most remaining uncertainty is about which subgroups, settings, or exposure levels look different from the main population-level finding.",
			"The direction is stable, but the exact size of the effect or risk can still move across syntheses and real-world settings.",
			"Policy, communication, or rollout choices can change practical outcomes even when the underlying evidence direction is settled."
		];

		for (const claim of defaultClaims) {
			for (const driver of claim.uncertaintyDrivers) {
				assert.equal(
					retiredFallbacks.includes(driver.detail),
					false,
					`Retired fallback remained on ${claim.slug}`
				);
			}
		}
	});
});
