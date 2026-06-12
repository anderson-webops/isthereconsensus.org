import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

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
});
