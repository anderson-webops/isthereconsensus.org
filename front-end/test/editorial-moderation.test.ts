import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, it } from "node:test";

const editorialSource = await readFile(new URL("../src/pages/account/editorial/index.vue", import.meta.url), "utf8");

describe("editorial moderation workflow", () => {
	it("requires and submits a moderation reason before privacy-preserving question removal", () => {
		assert.match(editorialSource, /const moderationReason = deletionReason\.value\[question\._id\]\?\.trim\(\)/);
		assert.match(editorialSource, /body: \{ moderationReason \}/);
		assert.match(
			editorialSource,
			/Remove public content and public account attribution while retaining moderation\s+records/
		);
		assert.match(editorialSource, /!deletionConfirmed\[question\._id\][\s\S]+actionState === question\._id/);
	});
});
