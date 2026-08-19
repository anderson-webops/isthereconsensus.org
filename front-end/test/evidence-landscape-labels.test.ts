import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
	formatLandscapeCertaintyLabel,
	formatLandscapeDirectionLabel,
	formatLandscapeExpertAgreementLabel,
	formatLandscapeSupportLabel
} from "../src/constants/evidenceLandscape";

const testDir = dirname(fileURLToPath(import.meta.url));
const panelSource = readFileSync(
	join(testDir, "..", "src/components/consensus/evidence-landscape/EvidenceLandscapePanel.vue"),
	"utf8"
);

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

	it("uses explicit labels and counts instead of ambiguous bars", () => {
		assert.match(panelSource, />How strong is the evidence\?</);
		assert.match(panelSource, /<details class="evidence-assessment-details">/);
		assert.match(panelSource, /Counts describe the reviewed source set; they are not votes\./);
		assert.doesNotMatch(panelSource, /distribution-track|distribution-fill|row\.width/);
		assert.doesNotMatch(panelSource, /landscape\.plainLanguageAnswer|landscape\.whatWouldChangeThis/);
	});
});
