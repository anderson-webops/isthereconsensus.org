import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { getSourceStandard, sourceStandardList } from "../src/data/sourceStandards";

const testDir = dirname(fileURLToPath(import.meta.url));

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
				(tier) => /Rebuttal explainers/.test(tier.title) && /rebuttal pages do not outrank/i.test(tier.body)
			)
		);
	});

	it("keeps AI literature search tools in discovery context", () => {
		const standard = getSourceStandard();

		assert.match(standard.supportContextRule, /AI-generated literature summaries/);
		assert.ok(
			standard.sourceHierarchy.some(
				(tier) =>
					/Discovery tools/.test(tier.title) &&
					/Consensus\.app/.test(tier.body) &&
					/underlying sources need direct verification/i.test(tier.body)
			)
		);
		assert.ok(standard.avoidOverweighting.some((item) => /AI search summaries/.test(item)));
	});

	it("renders topic-specific source-standard anchors on the reference page", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/source-standards.vue"), "utf8");

		assert.match(source, /sourceStandardList/);
		assert.match(source, /:id="standard\.slug"/);
		assert.match(source, /function openHashTarget\(\)/);
		assert.match(source, /target instanceof HTMLDetailsElement/);
		assert.ok(sourceStandardList.length > 0);
		assert.ok(sourceStandardList.every((standard) => standard.slug && standard.summary));
	});
});
