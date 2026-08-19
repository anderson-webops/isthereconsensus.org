import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(testDir, "..", "src/pages/index.vue"), "utf8");

describe("home entry layout", () => {
	it("keeps the first-screen copy concise and search-led", () => {
		assert.match(source, /<h1>Search a claim\. Read the bottom line\.<\/h1>/);
		assert.match(source, /Clear, reviewed summaries for scientific questions/);
		assert.match(source, /Search reviewed claims/);
		assert.match(source, /class="library-summary"/);
		assert.match(source, /formatCountLabel\(totalReviewedClaimCount, "reviewed claim"\)/);
		assert.match(source, /formatCountLabel\(totalTopicCount, "topic"\)/);
		assert.doesNotMatch(source, /hero__aside/);
	});

	it("keeps the mobile search panel compact enough to expose reviewed content sooner", () => {
		assert.match(
			source,
			/@media \(max-width: 640px\) \{[\s\S]*\.search-panel \{[\s\S]*gap: 10px;[\s\S]*padding: 14px;/
		);
		assert.match(
			source,
			/\.search-panel__row \{[\s\S]*grid-template-columns: minmax\(0, 1fr\) auto;[\s\S]*gap: 8px;/
		);
		assert.match(source, /\.search-panel \.button \{[\s\S]*min-height: 46px;[\s\S]*width: auto;/);
	});

	it("keeps library depth subordinate to the search task", () => {
		const searchIndex = source.indexOf('class="search-panel"');
		const summaryIndex = source.indexOf('class="library-summary"');

		assert.ok(searchIndex >= 0);
		assert.ok(summaryIndex > searchIndex);
		assert.match(source, /const totalReviewedClaimCount = computed/);
		assert.doesNotMatch(source, /class="library-snapshot"/);
		assert.doesNotMatch(source, /mostCoveredTopic/);
		assert.doesNotMatch(source, /claim-row__score/);
		assert.doesNotMatch(source, /ConsensusMeter/);
	});

	it("shows genuinely recent claim reviews across multiple topics", () => {
		assert.match(source, /const recentClaimCandidates = computed/);
		assert.match(source, /selectRecentClaims\(recentClaimCandidates\.value, 5\)/);
		assert.match(source, /<p class="eyebrow">Recently reviewed<\/p>/);
		assert.match(source, /<h2>New and refreshed claim reviews<\/h2>/);
		assert.match(source, /formatClaimReviewLabel\(claim\)/);
		assert.match(source, /return `Reviewed \$\{formattedDate\}`/);
	});
});
