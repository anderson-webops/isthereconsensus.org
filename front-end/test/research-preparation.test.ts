import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
	regulatoryContextLabel,
	selectResearchPreparation,
	shortAnswerLabel
} from "../src/utils/claim-presentation.js";

describe("research preparation and answer labels", () => {
	it("labels regulatory context without treating U.S. source citations as universal jurisdiction", () => {
		assert.equal(
			regulatoryContextLabel("Are dietary supplements FDA-approved like drugs?"),
			"United States: FDA approval"
		);
		assert.equal(regulatoryContextLabel("Does exercise improve health?"), null);
	});
	it("distinguishes documented AI assistance from missing records without implying human review", () => {
		assert.equal(
			selectResearchPreparation({ authorLine: "AI-assisted synthesis prepared for Is There Consensus." }).method,
			"ai_assisted"
		);
		assert.equal(
			selectResearchPreparation({ reviewerLine: "Sources checked by an AI agent." }).method,
			"ai_assisted"
		);
		assert.equal(
			selectResearchPreparation({ authorLine: "Prepared by the Is There Consensus editorial desk." }).method,
			"not_recorded"
		);
		assert.equal(selectResearchPreparation().independentExpertReview, "not_recorded");
	});

	it("labels only explicit answers, independently of agreement strength", () => {
		assert.equal(shortAnswerLabel("Yes. The effect is measured."), "Yes");
		assert.equal(shortAnswerLabel("No. The evidence does not support it."), "No");
		assert.equal(shortAnswerLabel("Yes, with dose and context caveats."), "Yes, with limits");
		assert.equal(shortAnswerLabel("Usually yes for adults who smoke."), "Yes, with limits");
		assert.equal(shortAnswerLabel("It depends on the population."), "Depends on context");
		for (const text of [
			"No evidence of benefit has been established.",
			"Current evidence does not support this.",
			"The effect is uncertain.",
			""
		]) {
			assert.equal(shortAnswerLabel(text), null);
		}
	});

	it("uses organizational authorship and keeps internal editor summaries out of the answer card", () => {
		const source = readFileSync(
			new URL("../src/pages/consensus/[topicSlug]/[claimSlug].vue", import.meta.url),
			"utf8"
		);
		assert.match(source, /author: \{\s*"@type": "Organization"/);
		assert.doesNotMatch(source, /"@type": "Person"/);
		assert.doesNotMatch(source, /claim\?\.editorSummary/);
		assert.match(source, /Agreement: \{\{ claimMeta.verdict \}\}/);
		assert.doesNotMatch(source, /class="claim-preparation"/);
		assert.match(source, /<ClaimReviewStatus v-if="claim" :claim="claim"/);
		const disclosure = readFileSync(new URL("../src/components/ClaimReviewStatus.vue", import.meta.url), "utf8");
		assert.match(disclosure, /<details id="review-status"/);
		assert.match(disclosure, /preparation.label.*Independent expert review is not documented/);
		assert.match(disclosure, /automation/);
	});
});
