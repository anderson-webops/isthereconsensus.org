import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { matchesSearchQuery } from "../src/utils/search-query.js";

describe("directory search matching", () => {
	it("matches exact scientific terms and common variants", () => {
		assert.equal(matchesSearchQuery("vaccines", ["Routine childhood vaccination"]), true);
		assert.equal(matchesSearchQuery("atoms physically real", ["Are atoms physically real?"]), true);
	});

	it("does not match an unrelated sentence through stop words or one weak term", () => {
		assert.equal(
			matchesSearchQuery("penguins dream in color", ["Broad guidance with high headline churn in nutrition"]),
			false
		);
		assert.equal(matchesSearchQuery("penguins climate dreams", ["Climate and environmental risk"]), false);
	});
});
