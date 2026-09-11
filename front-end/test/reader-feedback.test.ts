import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { feedbackKindLabels, feedbackPriorityLabels, feedbackStatusLabels } from "../src/types/reader-feedback";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
describe("reader feedback contract", () => {
	it("distinguishes explanation feedback from scientific agreement", () => {
		assert.match(
			read("../src/components/ReaderFeedback.vue"),
			/This rates the explanation, not whether you agree with the science/
		);
		assert.deepEqual(Object.keys(feedbackKindLabels), ["usefulness", "missing_evidence", "content_gap"]);
		assert.deepEqual(Object.keys(feedbackStatusLabels), ["new", "reviewing", "planned", "resolved", "dismissed"]);
		assert.deepEqual(feedbackPriorityLabels, ["Low", "Normal", "High"]);
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
});
