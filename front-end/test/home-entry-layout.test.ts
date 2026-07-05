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
});
