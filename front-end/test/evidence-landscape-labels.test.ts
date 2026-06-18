import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	formatLandscapeCertaintyLabel,
	formatLandscapeDirectionLabel,
	formatLandscapeExpertAgreementLabel,
	formatLandscapeSupportLabel
} from "../src/constants/evidenceLandscape";

describe("evidence landscape labels", () => {
	it("keeps support, certainty, and agreement separate", () => {
		assert.equal(formatLandscapeSupportLabel("broad_agreement_with_caveats"), "Broad agreement with caveats");
		assert.equal(formatLandscapeCertaintyLabel("very_low"), "Very low certainty");
		assert.equal(formatLandscapeExpertAgreementLabel("mixed"), "Mixed expert interpretation");
		assert.equal(formatLandscapeDirectionLabel("strongly_opposes_claim"), "Strongly opposes the claim");
	});

	it("does not use political source-bias framing", () => {
		const labels = [
			formatLandscapeSupportLabel("strong_consensus"),
			formatLandscapeSupportLabel("active_expert_debate"),
			formatLandscapeCertaintyLabel("high"),
			formatLandscapeExpertAgreementLabel("moderate")
		].join(" ");

		assert.equal(/\bleft\b|\bright\b|\bcenter\b/i.test(labels), false);
	});
});
