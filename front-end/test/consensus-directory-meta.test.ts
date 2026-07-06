import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(testDir, "..", "src/pages/consensus/index.vue"), "utf8");

describe("consensus directory metadata", () => {
	it("uses a descriptive public title instead of the generic site title", () => {
		assert.match(source, /Browse scientific consensus topics - Is There Consensus\?/);
		assert.match(source, /Search the public topic directory for reviewed scientific claims/);
	});

	it("keeps the directory shareable and machine-readable", () => {
		assert.match(source, /ogImage:\s*socialImageUrl/);
		assert.match(source, /twitterImage:\s*socialImageUrl/);
		assert.match(source, /"@type": "CollectionPage"/);
		assert.match(source, /key:\s*"consensus-directory-jsonld"/);
	});

	it("makes the reviewed claim library size visible before filtering", () => {
		assert.match(source, /const totalReviewedClaimCount = computed/);
		assert.match(source, /const topicsWithReviewedClaimsCount = computed/);
		assert.match(source, /const coverageLeaders = computed/);
		assert.match(source, /class="directory__snapshot" aria-label="Library snapshot"/);
		assert.match(source, /formatCountLabel\(totalReviewedClaimCount, "reviewed claim"\)/);
		assert.match(source, /formatCountLabel\(topicsWithReviewedClaimsCount, "active topic"\)/);
		assert.match(source, /Most covered:/);
	});

	it("keeps mobile directory filters compact without changing the page flow", () => {
		assert.match(source, /@media \(max-width: 760px\) \{[\s\S]*\.directory__controls \{[\s\S]*gap: 8px;/);
		assert.match(source, /\.directory__controls,\s*\.results-block \{[\s\S]*padding: 14px;/);
		assert.match(source, /\.filter-stack \{[\s\S]*flex-wrap: wrap;[\s\S]*overflow-x: visible;/);
		assert.match(source, /\.filter \{[\s\S]*flex: 0 1 auto;[\s\S]*min-height: 40px;/);
	});
});
