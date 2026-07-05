import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const rightsSource = readFileSync(join(testDir, "..", "src/pages/copyright-and-trademark.vue"), "utf8");

describe("copyright and trademark layout", () => {
	it("keeps rights complaint copy concise without changing the review lanes", () => {
		assert.match(rightsSource, /Use this lane for copyright, trademark, and related rights issues\./);
		assert.match(
			rightsSource,
			/the right involved: copyright, trademark, impersonation, or another specific legal concern/
		);
		assert.match(rightsSource, /Fair-use quoting for commentary, source explanation, or educational criticism/);
		assert.match(rightsSource, /Send scientific errors to corrections, community enforcement to moderation/);
		assert.match(rightsSource, /<p class="eyebrow">Rights lane<\/p>/);
		assert.doesNotMatch(rightsSource, /intellectual-property concerns tied to site content or submissions/);
		assert.doesNotMatch(
			rightsSource,
			/Limited quoting for commentary, source explanation, or educational criticism may still be reviewed under fair use/
		);
	});
});
