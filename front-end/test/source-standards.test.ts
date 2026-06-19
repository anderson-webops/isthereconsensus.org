import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getSourceStandard } from "../src/data/sourceStandards";

describe("source standards", () => {
	it("classifies Skeptical Science as supporting climate rebuttal context", () => {
		const standard = getSourceStandard("climate-and-environment");

		assert.equal(
			standard.primaryAnchors.some((anchor) => anchor.name === "Skeptical Science"),
			false
		);
		assert.ok(
			standard.secondaryAnchors.some(
				(anchor) =>
					anchor.name === "Skeptical Science" &&
					/supporting rebuttal library/i.test(anchor.note) &&
					/after/i.test(anchor.note)
			)
		);
		assert.match(standard.supportContextRule, /Skeptical Science rebuttals/);
		assert.ok(
			standard.sourceHierarchy.some(
				(tier) => /Rebuttal explainers/.test(tier.title) && /do not let rebuttal pages outrank/i.test(tier.body)
			)
		);
	});
});
