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
		const summaryIndex = claimRow.indexOf('class="claim-row__summary"');

		assert.ok(titleIndex >= 0, "topic claim cards should render the claim title");
		assert.ok(metaIndex > titleIndex, "metadata should support the title instead of leading the card");
		assert.ok(summaryIndex > metaIndex, "summary should follow title and trust metadata");
		assert.match(source, /\.claim-row__content \{[\s\S]*display: grid;[\s\S]*gap: 8px;/);
	});

	it("keeps topic claim cards compact on mobile", () => {
		assert.match(source, /function claimCardPreview\(claim: ClaimSummary\)/);
		assert.match(source, /splitSummaryLead\(full\)/);
		assert.match(source, /function compactContextPreview\(text: string\)/);
		assert.match(source, /weakEndings\.has/);
		assert.match(source, /compactContextPreview\(context\)/);
		assert.match(source, /:title="claimCardPreview\(claim\)\.full"/);
		assert.match(source, /class="claim-row__summary-lead"/);
		assert.match(source, /class="claim-row__summary-context"/);
		assert.match(source, /\.claim-row__summary \{[\s\S]*display: grid;[\s\S]*gap: 4px;/);
		assert.match(source, /\.claim-row__summary-lead \{[\s\S]*font-weight: 700;/);
		assert.match(source, /\.claim-row__summary-context \{[\s\S]*-webkit-line-clamp: 2;/);
		assert.match(source, /@media \(max-width: 820px\) \{[\s\S]*\.claim-row__summary \{[\s\S]*gap: 3px;/);
		assert.match(source, /@media \(max-width: 820px\) \{[\s\S]*\.claim-row__content \{[\s\S]*gap: 7px;/);
		assert.match(source, /\.claim-row__caveat \{[\s\S]*-webkit-line-clamp: 2;/);
	});
});
