import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

const canonicalFiles = [
	"src/app.vue",
	"src/pages/index.vue",
	"src/pages/[...all].vue",
	"src/pages/consensus/index.vue",
	"src/pages/consensus/[slug].vue",
	"src/pages/consensus/[topicSlug]/[claimSlug].vue"
];

describe("canonical links", () => {
	for (const file of canonicalFiles) {
		it(`keys the canonical link in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const canonicalIndex = source.indexOf('rel: "canonical"');
			assert.notEqual(canonicalIndex, -1);

			const precedingBlock = source.slice(Math.max(0, canonicalIndex - 80), canonicalIndex);
			assert.match(precedingBlock, /key:\s*"canonical"/);
		});
	}
});
