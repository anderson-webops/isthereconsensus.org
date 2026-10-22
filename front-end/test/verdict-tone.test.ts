import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { certaintyStep, verdictMix, verdictTone } from "../src/utils/verdict-tone";

describe("verdictTone", () => {
	it("prefers the assessed evidence-landscape label", () => {
		assert.equal(
			verdictTone({ consensusBand: "strong", evidenceLandscape: { supportLabel: "active_expert_debate" } }),
			"debate"
		);
		assert.equal(verdictTone({ evidenceLandscape: { supportLabel: "unsupported_fringe" } }), "against");
		assert.equal(verdictTone({ evidenceLandscape: { supportLabel: "thin_evidence" } }), "unclear");
	});

	it("falls back to the consensus band", () => {
		assert.equal(verdictTone({ consensusBand: "strong" }), "strong");
		assert.equal(verdictTone({ consensusBand: "broad" }), "broad");
		assert.equal(verdictTone({ consensusBand: "mixed" }), "debate");
	});

	it("treats missing data as unclear", () => {
		assert.equal(verdictTone(undefined), "unclear");
		assert.equal(verdictTone({}), "unclear");
	});
});

describe("certaintyStep", () => {
	it("maps certainty to a four-step scale", () => {
		assert.equal(certaintyStep("very_low"), 1);
		assert.equal(certaintyStep("low"), 2);
		assert.equal(certaintyStep("moderate"), 3);
		assert.equal(certaintyStep("high"), 4);
		assert.equal(certaintyStep(undefined), 0);
	});
});

describe("verdictMix", () => {
	it("counts claims per tone in a stable strongest-first order", () => {
		const mix = verdictMix([
			{ consensusBand: "mixed" },
			{ consensusBand: "strong" },
			{ evidenceLandscape: { supportLabel: "strong_consensus" } },
			{ consensusBand: "unclear" }
		]);
		assert.deepEqual(
			mix.map(({ tone, count }) => [tone, count]),
			[
				["strong", 2],
				["debate", 1],
				["unclear", 1]
			]
		);
		assert.equal(mix[0].label, "Strong consensus");
	});

	it("returns nothing for an empty list", () => {
		assert.deepEqual(verdictMix([]), []);
	});
});
