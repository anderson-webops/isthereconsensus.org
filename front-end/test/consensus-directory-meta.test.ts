import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { getTopicGuide } from "../src/data/topicGuides.js";

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

	it("exposes the full reviewed-claim directory instead of only topic previews", () => {
		assert.match(source, /loadCompleteClaimDirectory\(\(page, pageSize\) =>/);
		assert.match(source, /`\/claims\?limit=\$\{pageSize\}&page=\$\{page\}`/);
		assert.match(source, /id="reviewed-claims"/);
		assert.match(source, /Reviewed claim directory/);
		assert.match(source, /v-for="claim in visibleClaims"/);
		assert.match(source, /claimBand === 'strong'/);
		assert.match(source, /claimBand === 'broad'/);
		assert.match(source, /claimBand === 'mixed'/);
		assert.match(source, /claimBand === 'unclear'/);
		assert.match(source, /showMoreClaims/);
		assert.match(source, /formatCountLabel\(totalReviewedClaimCount, "claim"\)/);
		assert.match(source, /interleaveClaimsByTopic/);
		assert.match(source, /filteredClaims\.value\.length/);
		assert.match(source, /const claimsPageSize = 12/);
	});

	it("adds guided directory sections for the first encyclopedia expansion topics", () => {
		const expectedGuides = [
			["education-and-learning", /varies sharply by intervention/i],
			["sleep-and-circadian-health", /Strong foundations/i],
			["exercise-and-sports-science", /Strong consensus on movement/i],
			["crime-and-justice", /design and value limits/i]
		] as const;

		for (const [slug, labelPattern] of expectedGuides) {
			const guide = getTopicGuide(slug);
			assert.equal(guide.slug, slug);
			assert.match(guide.consensusLabel, labelPattern);
			assert.ok(guide.stableCore.length >= 3);
			assert.ok(guide.evidenceTrail.length >= 2);
			assert.match(source, new RegExp(`"${slug}"`));
		}
	});

	it("surfaces the new public-policy reviews with a claim-specific directory guide", () => {
		const policyGuide = getTopicGuide("public-policy-and-safety");
		assert.equal(policyGuide.slug, "public-policy-and-safety");
		assert.match(policyGuide.consensusLabel, /Strong evidence/);
		assert.match(policyGuide.snapshot, /legal rights, costs, fairness/);
		assert.match(source, /"public-policy-and-safety"/);
	});

	it("puts reviewed claims before a compact, count-labeled topic disclosure", () => {
		const claimDirectoryIndex = source.indexOf('id="reviewed-claims"');
		const topicDirectoryIndex = source.indexOf('id="topic-directory"');

		assert.ok(claimDirectoryIndex >= 0);
		assert.ok(topicDirectoryIndex > claimDirectoryIndex);
		assert.match(source, /<details id="topic-directory"/);
		assert.match(source, /Browse all \{\{ formatCountLabel\(totalTopicCount, "topic"\) \}\}/);
		assert.match(source, /\.results-block\.topic-directory \{[\s\S]*padding: 0;/);
		assert.match(source, /\.topic-directory__summary::after \{[\s\S]*content: "\+";/);
	});

	it("keeps mobile directory filters compact without changing the page flow", () => {
		assert.match(source, /@media \(max-width: 760px\) \{[\s\S]*\.directory__controls \{[\s\S]*gap: 8px;/);
		assert.match(
			source,
			/\.directory__controls,\s*\.directory__snapshot,\s*\.results-block \{[\s\S]*padding: 14px;/
		);
		assert.match(source, /\.filter-stack \{[\s\S]*flex-wrap: wrap;[\s\S]*overflow-x: visible;/);
		assert.match(source, /\.filter \{[\s\S]*flex: 0 1 auto;[\s\S]*min-height: 40px;/);
		assert.match(source, /\.claim-grid \{[\s\S]*grid-template-columns: 1fr;/);
		assert.match(source, /\.topic-directory__summary > span \{[\s\S]*display: none;/);
	});
});
