import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	formatLandscapeCertaintyLabel,
	formatLandscapeExpertAgreementLabel,
	formatLandscapeSupportLabel
} from "../src/constants/evidenceLandscape";

describe("evidence landscape labels", () => {
	it("keeps support, certainty, and agreement separate", () => {
		assert.equal(formatLandscapeSupportLabel("supported_with_limitations"), "Supported with limitations");
		assert.equal(formatLandscapeCertaintyLabel("very_low"), "Very low certainty");
		assert.equal(formatLandscapeExpertAgreementLabel("divided"), "Divided expert interpretation");
	});

	it("does not use political source-bias framing", () => {
		const labels = [
			formatLandscapeSupportLabel("well_supported"),
			formatLandscapeSupportLabel("mixed_or_contested"),
			formatLandscapeCertaintyLabel("high"),
			formatLandscapeExpertAgreementLabel("qualified")
		].join(" ");

		assert.equal(/\bleft\b|\bright\b|\bcenter\b/i.test(labels), false);
	});
});
