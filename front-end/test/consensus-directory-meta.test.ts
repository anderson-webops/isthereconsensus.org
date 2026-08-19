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

	it("puts search first without repeating library statistics", () => {
		const searchIndex = source.indexOf('class="directory__controls"');
		const topicIndex = source.indexOf('id="topic-directory"');

		assert.ok(searchIndex >= 0);
		assert.ok(topicIndex > searchIndex);
		assert.doesNotMatch(source, /directory__snapshot/);
		assert.doesNotMatch(source, /coverageLeaders/);
		assert.doesNotMatch(source, /Most covered:/);
	});

	it("exposes the full reviewed-claim directory instead of only topic previews", () => {
		assert.match(source, /loadCompleteClaimDirectory\(\(page, pageSize\) =>/);
		assert.match(source, /`\/claims\?limit=\$\{pageSize\}&page=\$\{page\}`/);
		assert.match(source, /id="reviewed-claims"/);
		assert.match(source, /Filter claims by consensus/);
		assert.match(source, /v-for="claim in visibleClaims"/);
		assert.match(source, /claimBand === 'strong'/);
		assert.match(source, /claimBand === 'broad'/);
		assert.match(source, /claimBand === 'mixed'/);
		assert.match(source, /claimBand === 'unclear'/);
		assert.match(source, /showMoreClaims/);
		assert.match(source, /interleaveClaimsByTopic/);
		assert.match(source, /filteredClaims\.value\.length/);
		assert.match(source, /const claimsPageSize = 12/);
	});

	it("adds guided directory sections for the encyclopedia expansion topics", () => {
		const expectedGuides = [
			["education-and-learning", /varies sharply by intervention/i],
			["sleep-and-circadian-health", /Strong foundations/i],
			["exercise-and-sports-science", /Strong consensus on movement/i],
			["crime-and-justice", /design and value limits/i],
			["astronomy-and-space", /Strong observations/i],
			["earth-and-geoscience", /probabilistic hazards/i],
			["ecology-and-conservation", /context-dependent remedies/i],
			["energy-and-infrastructure", /system-dependent choices/i],
			["agriculture-and-food-systems", /management-dependent outcomes/i],
			["oceans-and-marine-science", /uneven observation and recovery/i],
			["physics-and-chemistry", /demanding discovery standards/i],
			["economics-and-social-policy", /distribution-sensitive effects/i]
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

	it("puts topics before the optional full claim directory", () => {
		const claimDirectoryIndex = source.indexOf('id="reviewed-claims"');
		const topicDirectoryIndex = source.indexOf('id="topic-directory"');

		assert.ok(topicDirectoryIndex >= 0);
		assert.ok(claimDirectoryIndex > topicDirectoryIndex);
		assert.match(source, /<section id="topic-directory"/);
		assert.match(source, /<details id="reviewed-claims"/);
		assert.match(source, /:open="hasActiveDirectoryFilter"/);
		assert.match(source, /\.claim-directory__summary::after \{[\s\S]*content: "\+";/);
		assert.doesNotMatch(source, /ConsensusMeter/);
	});

	it("keeps mobile directory filters compact without changing the page flow", () => {
		assert.match(source, /@media \(max-width: 760px\) \{[\s\S]*\.directory__controls \{[\s\S]*gap: 8px;/);
		assert.match(source, /@media \(max-width: 760px\) \{[\s\S]*\.directory__controls \{[\s\S]*padding: 14px;/);
		assert.match(source, /\.filter-stack \{[\s\S]*flex-wrap: wrap;[\s\S]*overflow-x: visible;/);
		assert.match(source, /\.filter \{[\s\S]*flex: 0 1 auto;[\s\S]*min-height: 40px;/);
		assert.match(source, /\.claim-grid \{[\s\S]*grid-template-columns: 1fr;/);
		assert.match(source, /\.claim-directory__summary > span \{[\s\S]*display: none;/);
	});
});
