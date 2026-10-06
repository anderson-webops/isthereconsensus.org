import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import {
	answerCoverageLabels,
	explanationClarityLabels,
	feedbackKindLabels,
	feedbackPriorityLabels,
	feedbackStatusLabels
} from "../src/types/reader-feedback";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
describe("reader feedback contract", () => {
	it("distinguishes explanation feedback from scientific agreement", () => {
		assert.match(
			read("../src/components/ReaderFeedback.vue"),
			/This rates the explanation, not whether you agree with the science/
		);
		assert.deepEqual(Object.keys(feedbackKindLabels), [
			"usefulness",
			"reader_experience",
			"missing_evidence",
			"content_gap"
		]);
		assert.deepEqual(Object.keys(feedbackStatusLabels), ["new", "reviewing", "planned", "resolved", "dismissed"]);
		assert.deepEqual(feedbackPriorityLabels, ["Low", "Normal", "High"]);
	});
	it("offers distinct optional clarity and answer-coverage choices without assuming a rating", () => {
		assert.deepEqual(Object.keys(explanationClarityLabels), ["clear", "partly_clear", "unclear"]);
		assert.deepEqual(Object.keys(answerCoverageLabels), [
			"answered",
			"partly_answered",
			"not_answered",
			"just_browsing"
		]);
		const form = read("../src/components/ReaderFeedback.vue");
		assert.match(form, /const experienceExpanded = ref\(false\)/);
		assert.match(form, /const clarity = ref<[^;]+>\(""\)/);
		assert.match(form, /const answerCoverage = ref<[^;]+>\(""\)/);
		assert.match(form, /They do not record your question, account or search text/);
		assert.match(form, /response.received !== true/);
		assert.match(form, /typeof response.duplicate !== "boolean"/);
	});
	it("keeps experience choices in private admin triage, not public coverage suggestions", () => {
		const admin = read("../src/pages/account/editorial/reader-feedback.vue");
		assert.match(admin, /Explanation clarity/);
		assert.match(admin, /Answer coverage/);
		assert.match(admin, /v-if="row.kind === 'missing_evidence' \|\| row.kind === 'content_gap'"/);
		assert.match(admin, /explanationClarityLabels\[row.clarity\]/);
		assert.match(admin, /answerCoverageLabels\[row.answerCoverage\]/);
	});
	it("starts with empty explicit inputs and sends no account credentials", () => {
		const form = read("../src/components/ReaderFeedback.vue");
		assert.match(form, /const title = ref\(""\)/);
		assert.match(form, /const message = ref\(""\)/);
		assert.match(form, /credentials: "omit"/);
		assert.doesNotMatch(form, /localStorage|useRoute|route\.query/);
		assert.match(form, /maxlength="1200"/);
	});
	it("keeps the admin queue private in indexing and shared caches", () => {
		const middleware = read("../server/middleware/readerFeedbackPrivacy.ts");
		assert.match(middleware, /\/account\/editorial\/reader-feedback/);
		assert.match(middleware, /private, no-store/);
		assert.match(middleware, /noindex, nofollow/);
		const page = read("../src/pages/account/editorial/reader-feedback.vue");
		assert.match(page, /role.value === "admin"/);
		assert.match(page, /currentAccount.value\?\._id/);
		assert.match(page, /run !== generation/);
	});
	it("uses canonical comparison targets and explicitly opts into mixed library updates", () => {
		const comparison = read("../src/pages/compare/[slug].vue");
		assert.match(comparison, /:comparison-slug="comparison.slug"/);
		assert.match(comparison, /<ReaderFeedback :key="comparison.slug"/);
		assert.match(comparison, /comparisonHistory\(comparison/);
		assert.match(comparison, /not study dates or cosmetic refreshes/);
		const library = read("../src/pages/library.vue");
		assert.match(library, /includeComparisons: true/);
		assert.match(library, /v-else-if="update.comparison"/);
		assert.match(library, /v-if="update.coverageRequest"/);
		assert.match(library, /includeCoverageRequests: true/);
		const admin = read("../src/pages/account/editorial/reader-feedback.vue");
		assert.match(admin, /comparisonForSlug\(row.comparisonSlug\)/);
		assert.match(admin, /name="comparison-filter"/);
	});
});
