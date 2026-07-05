import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(testDir, "..", "src/pages/consensus/[topicSlug]/[claimSlug].vue"), "utf8");

describe("claim detail layout", () => {
	it("keeps the source stack scannable without hiding the top evidence tier", () => {
		assert.match(source, /<details\s+v-for="group in sourceGroups"[\s\S]*:open="group\.key === 'tier1'"/);
		assert.match(source, /class="source-group__summary"/);
		assert.match(source, /formatCountLabel\(group\.items\.length, "source"\)/);
		assert.match(source, /class="source-list"[\s\S]*<article v-for="source in group\.items"/);
		assert.doesNotMatch(source, /<section v-for="group in sourceGroups"/);
	});

	it("keeps the uncertainty summary at a readable measure", () => {
		assert.match(source, /\.uncertainty-strip > div > p:not\(\.eyebrow\):not\(\.field-label\) \{/);
		assert.match(source, /max-width: 68ch;/);
	});
});
