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

	it("keeps the reference framing readable for first-time visitors", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/source-standards.vue"), "utf8");
		const topicNotesIndex = source.indexOf('<section class="topic-standards-section">');
		const crossCuttingIndex = source.indexOf('<section class="panel panel--soft">');
		const usageIndex = source.indexOf('<section class="panel">');

		assert.match(source, /How source stacks change by topic\./);
		assert.match(source, /why a reviewed claim may weigh guidelines, assessments, datasets, syntheses/);
		assert.match(source, /When to use this reference/);
		assert.match(source, /For the public version, start with How Reviews Work\./);
		assert.doesNotMatch(source, /This reference supports source-stack review/);
		assert.doesNotMatch(source, /Start with the main public trust page/);
		assert.notEqual(topicNotesIndex, -1);
		assert.notEqual(crossCuttingIndex, -1);
		assert.notEqual(usageIndex, -1);
		assert.ok(topicNotesIndex < crossCuttingIndex);
		assert.ok(crossCuttingIndex < usageIndex);
	});

	it("keeps source hierarchy tiers visually separated for scanning", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/source-standards.vue"), "utf8");

		assert.match(
			source,
			/\.topic-standard summary:focus-visible \{[\s\S]*outline: none;[\s\S]*box-shadow: inset 0 0 0 3px/
		);
		assert.match(source, /\.tier-list li \{[\s\S]*padding-left: 12px;[\s\S]*border-left: 3px solid/);
		assert.match(source, /\.tier-list li::marker \{[\s\S]*font-weight: 700;/);
		assert.match(source, /\.tier-list \{[\s\S]*gap: 12px;[\s\S]*padding-left: 22px;/);
		assert.match(
			source,
			/@media \(max-width: 720px\) \{[\s\S]*\.topic-standard__body \{[\s\S]*gap: 14px;[\s\S]*\.tier-list \{[\s\S]*gap: 8px;[\s\S]*padding-left: 18px;/
		);
	});
});
