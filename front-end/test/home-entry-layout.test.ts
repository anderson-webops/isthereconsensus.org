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
		assert.match(source, /Search a claim, headline, or topic/);
		assert.match(source, /class="library-snapshot" aria-label="Library snapshot"/);
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

	it("keeps library depth visible before users start searching", () => {
		assert.match(source, /const totalReviewedClaimCount = computed/);
		assert.match(source, /const topicsWithReviewedClaimsCount = computed/);
		assert.match(source, /const mostCoveredTopic = computed/);
		assert.match(source, /\.filter\(\(topic\) => \(topic\.claimCount \?\? 0\) > 0\)/);
		assert.match(source, /in the public library/);
		assert.match(source, /ready to browse/);
		assert.match(source, /with live reviews/);
	});
});
