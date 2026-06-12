import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

const publicStaticPages = [
	{
		file: "src/pages/ask.vue",
		path: "/ask",
		description: "Ask a concise scientific question"
	},
	{
		file: "src/pages/explainers/index.vue",
		path: "/explainers",
		description: "Read short evergreen explainers"
	},
	{
		file: "src/pages/misconceptions.vue",
		path: "/misconceptions",
		description: "Browse reusable modules"
	},
	{
		file: "src/pages/standards.vue",
		path: "/standards",
		description: "Learn how reviewed pages weigh sources"
	},
	{
		file: "src/pages/privacy.vue",
		path: "/privacy",
		description: "Review what personal information"
	},
	{
		file: "src/pages/terms.vue",
		path: "/terms",
		description: "Read the terms for public browsing"
	}
];

describe("static page metadata", () => {
	it("sets canonical and share metadata through a shared helper", () => {
		const source = readFileSync(join(testDir, "..", "src/composables/useStaticPageMeta.ts"), "utf8");

		assert.match(source, /new URL\(path, `\$\{siteUrl\}\/`\)/);
		assert.match(source, /ogImage:\s*socialImageUrl/);
		assert.match(source, /twitterImage:\s*socialImageUrl/);
		assert.match(source, /key:\s*"canonical"/);
	});

	for (const page of publicStaticPages) {
		it(`gives ${page.path} a page-specific description`, () => {
			const source = readFileSync(join(testDir, "..", page.file), "utf8");

			assert.match(source, /useStaticPageMeta\(\{/);
			assert.match(source, new RegExp(`path:\\s*"${page.path}"`));
			assert.match(source, new RegExp(page.description));
		});
	}
});
