import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const termsSource = readFileSync(join(testDir, "..", "src/pages/terms.vue"), "utf8");

function publicParagraphText(source: string) {
	const template = source.match(/<template[\s\S]*<\/template>/)?.[0] || "";

	return [...template.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)]
		.map((match) =>
			match[1]
				.replace(/<[^>]+>/g, " ")
				.replace(/\{\{[^}]+\}\}/g, " ")
				.replace(/&[a-z]+;/gi, " ")
				.replace(/\s+/g, " ")
				.trim()
		)
		.filter(Boolean);
}

describe("terms page layout", () => {
	it("keeps legal copy concise without dropping public-content cautions", () => {
		assert.match(
			termsSource,
			/Community submissions may be publicly visible, indexed by search engines, or cached by services/
		);
		assert.match(termsSource, /It is not a substitute for a licensed professional who knows your circumstances\./);
		assert.match(termsSource, /Do not copy substantial portions or republish site materials beyond fair/);
		assert.match(termsSource, /That includes loss of data, goodwill, profits, or business opportunities/);
		assert.doesNotMatch(termsSource, /voting system for deciding what the evidence says/);
		assert.doesNotMatch(termsSource, /anything that you would not want to appear in a public context/);
		assert.doesNotMatch(termsSource, /attempted to manipulate the site/);
	});

	it("uses subheads to make dense legal sections scannable", () => {
		for (const label of [
			"Moderation actions",
			"Related policies",
			"Account consequences",
			"Records we may retain",
			"Professional advice",
			"Corrections path",
			"Emergencies",
			"Site materials",
			"Third-party materials",
			"Rights complaints",
			"Service availability",
			"Community content",
			"Excluded damages",
			"Legal limits"
		]) {
			assert.match(termsSource, new RegExp(`>${label}<`));
		}
		assert.match(termsSource, /\.prose h3 \{[\s\S]*font-size: 0\.98rem;/);
	});

	it("keeps public terms paragraphs short enough to scan", () => {
		const longParagraphs = publicParagraphText(termsSource).filter((text) => text.length > 250);

		assert.deepEqual(longParagraphs, []);
		assert.doesNotMatch(termsSource, /The current complaint workflow is described/);
	});

	it("adds compact wayfinding for the long terms page without adding legal sections", () => {
		assert.match(termsSource, /const termsSections = \[/);
		assert.match(termsSource, /<section class="terms-contents" aria-labelledby="terms-contents-heading">/);
		assert.match(termsSource, /<nav class="terms-contents__links" aria-label="Terms sections">/);
		assert.match(termsSource, /id="acceptance-and-scope"/);
		assert.match(termsSource, /id="changes-to-terms"/);
		assert.equal((termsSource.match(/class="terms-panel"/g) || []).length, 14);
	});

	it("keeps mobile terms cards and lists compact", () => {
		assert.match(termsSource, /@media \(max-width: 720px\) \{[\s\S]*\.summary-card \{[\s\S]*gap: 5px;/);
		assert.match(
			termsSource,
			/\.terms-contents__links \{[\s\S]*grid-template-columns: repeat\(auto-fit, minmax\(145px, 1fr\)\);[\s\S]*gap: 6px 12px;/
		);
		assert.match(termsSource, /\.prose \{[\s\S]*gap: 9px;/);
		assert.match(termsSource, /\.plain-list \{[\s\S]*gap: 6px;[\s\S]*padding-left: 18px;/);
		assert.match(termsSource, /\.terms-callout \{[\s\S]*align-items: stretch;[\s\S]*gap: 16px;/);
	});
});
