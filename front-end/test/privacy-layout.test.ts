import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const privacySource = readFileSync(join(testDir, "..", "src/pages/privacy.vue"), "utf8");

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

describe("privacy page layout", () => {
	it("adds compact wayfinding without changing the policy section count", () => {
		assert.match(privacySource, /const privacySections = \[/);
		assert.match(privacySource, /<section class="privacy-contents" aria-labelledby="privacy-contents-heading">/);
		assert.match(privacySource, /<nav class="privacy-contents__links" aria-label="Privacy policy sections">/);
		assert.match(privacySource, /id="scope"/);
		assert.match(privacySource, /id="changes-to-this-policy"/);
		assert.equal((privacySource.match(/class="privacy-panel"/g) || []).length, 12);
	});

	it("keeps dense privacy copy split into scannable chunks", () => {
		assert.match(privacySource, /understand site usage and performance\./);
		assert.match(privacySource, /When your browser loads those scripts, the analytics services may receive/);
		assert.match(privacySource, /some records where reasonably necessary\./);
		assert.match(privacySource, /community-integrity records\./);
		assert.match(privacySource, /The practical handling of public questions, disassociated attribution/);
		assert.match(privacySource, /intended for children under 13\./);
		assert.match(privacySource, /If we learn that we have created an account/);
		assert.match(privacySource, /Remember me sessions can last up to about 30 days\./);
		assert.match(privacySource, /Browser-side preference storage may remain until you clear it\./);
		assert.match(privacySource, /Backups, logs, or external caches may persist for longer\./);
		assert.match(privacySource, /<ul v-if="item\.details\?\.length" class="plain-list plain-list--tight">/);
		assert.doesNotMatch(
			privacySource,
			/If you choose “remember me,” the session may last longer, currently up to about 30 days\./
		);
	});

	it("keeps public privacy paragraphs short enough to scan", () => {
		const longParagraphs = publicParagraphText(privacySource).filter((text) => text.length > 230);

		assert.deepEqual(longParagraphs, []);
		assert.match(privacySource, /That process can involve IP address and standard browser\/device signals/);
		assert.match(privacySource, /No internet service can guarantee perfect security\./);
	});

	it("keeps mobile privacy cards, contents links, and lists compact", () => {
		assert.match(
			privacySource,
			/@media \(max-width: 720px\) \{[\s\S]*\.summary-card,[\s\S]*\.category-card \{[\s\S]*gap: 5px;/
		);
		assert.match(
			privacySource,
			/\.privacy-contents__links \{[\s\S]*grid-template-columns: repeat\(auto-fit, minmax\(145px, 1fr\)\);[\s\S]*gap: 6px 12px;/
		);
		assert.match(privacySource, /\.prose \{[\s\S]*gap: 9px;/);
		assert.match(privacySource, /\.plain-list \{[\s\S]*gap: 6px;[\s\S]*padding-left: 18px;/);
	});
});
