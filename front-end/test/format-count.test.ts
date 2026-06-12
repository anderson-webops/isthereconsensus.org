import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatCountLabel } from "../src/utils/format-count";

describe("formatCountLabel", () => {
	it("uses singular labels only for a count of one", () => {
		assert.equal(formatCountLabel(1, "claim review"), "1 claim review");
		assert.equal(formatCountLabel(0, "claim review"), "0 claim reviews");
		assert.equal(formatCountLabel(2, "claim review"), "2 claim reviews");
	});

	it("falls back to zero for missing counts", () => {
		assert.equal(formatCountLabel(undefined, "source"), "0 sources");
		assert.equal(formatCountLabel(null, "source"), "0 sources");
	});

	it("supports irregular plural labels", () => {
		assert.equal(formatCountLabel(1, "entry", "entries"), "1 entry");
		assert.equal(formatCountLabel(3, "entry", "entries"), "3 entries");
	});
});
