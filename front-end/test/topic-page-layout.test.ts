import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(testDir, "..", "src/pages/consensus/[slug].vue"), "utf8");

describe("topic page layout", () => {
	it("puts claim titles before supporting metadata in topic cards", () => {
		const claimRowStart = source.indexOf('class="claim-row"');
		const claimRowEnd = source.indexOf("</NuxtLink>", claimRowStart);
		const claimRow = source.slice(claimRowStart, claimRowEnd);

		const titleIndex = claimRow.indexOf("<h3>{{ claim.title }}</h3>");
		const metaIndex = claimRow.indexOf('class="claim-row__meta"');

		assert.ok(titleIndex >= 0, "topic claim cards should render the claim title");
		assert.ok(metaIndex > titleIndex, "metadata should support the title instead of leading the card");
		assert.match(source, /\.claim-row__content \{[\s\S]*display: grid;[\s\S]*gap: 7px;/);
		assert.match(claimRow, /class="claim-row__status"/);
		assert.match(claimRow, /i-carbon-arrow-right/);
	});

	it("keeps answers and review details on the destination page", () => {
		assert.doesNotMatch(source, /claimCardPreview|starterClaimPreview|claimCardSummary|splitSummaryLead/);
		assert.doesNotMatch(source, /claim-row__summary/);
		assert.doesNotMatch(
			source,
			/claimCertaintyLabel|formatCountLabel\(claim\.sourceCount|formatDate\(claim\.lastReviewedAt/
		);
		assert.match(source, /\.claim-row h3 \{[\s\S]*font-size: 1\.26rem;/);
		assert.match(source, /@media \(max-width: 820px\) \{[\s\S]*\.claim-row h3 \{[\s\S]*font-size: 1\.12rem;/);
		assert.doesNotMatch(source, /claim-row__score|claim-row__caveat|confidenceScore/);
	});

	it("offers curated starter claims before the full topic directory", () => {
		const starterSection = source.indexOf('class="start-here"');
		const directorySection = source.indexOf('class="claim-lane"');

		assert.ok(starterSection >= 0, "topic pages should render the curated starter section");
		assert.ok(directorySection > starterSection, "starter claims should appear before the full topic directory");
		assert.match(source, /v-if="starterClaims\.length"/);
		assert.match(source, /Recommended starting points/);
		assert.match(source, /v-for="claim in starterClaims"/);
		assert.match(source, /class="starter-card__content"/);
		assert.match(source, /\{\{ claimSupportLabel\(claim\) \}\}/);
		assert.doesNotMatch(source, /starterClaimPreview|<p>\{\{ claim\.bottomLine \}\}<\/p>/);
		assert.match(source, /:to="`\/consensus\/\$\{slug\}\/\$\{claim\.slug\}`"/);
	});

	it("uses one readable consensus cue instead of a row of competing metadata", () => {
		assert.match(source, /claimSupportLabel\(claim\)/);
		assert.doesNotMatch(
			source,
			/claimCertaintyLabel|sourceCount|lastReviewedAt|Confidence score|\/100|claim-row__score/
		);
	});

	it("organizes configured topics into navigable evidence-atlas collections", () => {
		assert.match(source, /const collectionLanes = computed/);
		assert.match(source, /<h2>Browse by subtopic<\/h2>/);
		assert.match(source, /<nav class="collection-index" aria-label="Subtopic collections">/);
		assert.match(source, /:href="`#collection-\$\{collection\.slug\}`"/);
		assert.match(source, /:id="`collection-\$\{collection\.slug\}`"/);
		assert.match(source, /v-for="claim in collection\.claims"/);
		assert.match(source, /v-if="!collectionLanes\.length \|\| ungroupedClaims\.length" class="claim-lane"/);
		assert.match(source, /collectionLanes\.length \? "Other reviewed claims" : "All reviewed claims"/);
	});
});
