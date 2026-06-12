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
	},
	{
		file: "src/pages/community-guidelines.vue",
		path: "/community-guidelines",
		description: "Review the rules for public questions"
	},
	{
		file: "src/pages/corrections.vue",
		path: "/corrections",
		description: "See how factual corrections"
	},
	{
		file: "src/pages/conflicts-and-funding.vue",
		path: "/conflicts-and-funding",
		description: "Read how reviewer conflicts"
	},
	{
		file: "src/pages/expert-review-program.vue",
		path: "/expert-review-program",
		description: "Learn how verified expert reviewers"
	},
	{
		file: "src/pages/moderation-and-appeals.vue",
		path: "/moderation-and-appeals",
		description: "Review how moderation actions"
	},
	{
		file: "src/pages/account-deletion-and-retention.vue",
		path: "/account-deletion-and-retention",
		description: "Learn how to request account deletion"
	},
	{
		file: "src/pages/automation-and-ai.vue",
		path: "/automation-and-ai",
		description: "See how automation may support"
	},
	{
		file: "src/pages/copyright-and-trademark.vue",
		path: "/copyright-and-trademark",
		description: "Learn how copyright and trademark complaints"
	},
	{
		file: "src/pages/source-standards.vue",
		path: "/source-standards",
		description: "Reference topic-specific sourcing notes"
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

	it("keeps the low-profile source standards page out of search indexes", () => {
		const source = readFileSync(join(testDir, "..", "src/pages/source-standards.vue"), "utf8");

		assert.match(source, /robots:\s*"noindex,follow"/);
	});
});
