import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatSlugTitle } from "../src/utils/format-slug-title";

describe("formatSlugTitle", () => {
	it("turns route slugs into reader-facing titles", () => {
		assert.equal(formatSlugTitle("climate-and-environment"), "Climate and Environment");
		assert.equal(formatSlugTitle("health_and_medicine"), "Health and Medicine");
	});

	it("keeps short connector words lowercase after the first word", () => {
		assert.equal(formatSlugTitle("science-of-the-public-record"), "Science of the Public Record");
	});

	it("falls back when the slug is missing", () => {
		assert.equal(formatSlugTitle(undefined), "Topic");
		assert.equal(formatSlugTitle("   ", "Consensus topic"), "Consensus topic");
	});
});
