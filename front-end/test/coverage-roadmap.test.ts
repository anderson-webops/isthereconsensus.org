import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { coverageStatusLabels, coverageVisibilityLabels } from "../src/types/coverage-roadmap";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");
describe("coverage roadmap UI contract", () => {
	it("follows public questions through the shared private library and separates editorial progress", () => {
		for (const path of ["../src/pages/roadmap/index.vue", "../src/pages/roadmap/[id].vue"]) {
			assert.match(read(path), /<CoverageFollowButton :request-id="request._id" :title="request.title"/);
		}
		const control = read("../src/components/CoverageFollowButton.vue");
		assert.match(control, /library.setSelected\("followedCoverageRequestIds"/);
		assert.match(control, /:aria-pressed="following"/);
		assert.match(control, /library.state.needsReload/);
		assert.doesNotMatch(control, /localStorage|\$fetch|feedbackId|privateNote|v-html/);
		const library = read("../src/pages/library.vue");
		assert.match(library, /includeCoverageRequests: true/);
		assert.match(library, /id="followed-questions"/);
		assert.match(library, /Requested question currently unavailable/);
		assert.match(library, /v-if="!update.coverageRequest"/);
		assert.match(library, /No\s+email notifications/);
	});
	it("keeps public request status distinct from private moderation visibility", () => {
		assert.deepEqual(Object.keys(coverageStatusLabels), ["planned", "researching", "published"]);
		assert.deepEqual(Object.keys(coverageVisibilityLabels), ["draft", "public", "withdrawn"]);
		for (const path of ["../src/pages/roadmap/index.vue", "../src/pages/roadmap/[id].vue"]) {
			const page = read(path);
			assert.doesNotMatch(page, /feedbackId|privateNote|\.audit|v-html/);
			assert.match(page, /answerUnavailable/);
			assert.match(page, /retry: 0/);
		}
	});
	it("requires a separate public preview and resets private data on identity change", () => {
		const page = read("../src/pages/account/editorial/roadmap.vue");
		assert.match(page, /role.value === "admin"/);
		assert.match(page, /currentAccount.value\?\._id/);
		assert.match(page, /run !== generation/);
		assert.match(page, /noindex, nofollow/);
		assert.match(page, /name="coverage-public-approved"/);
		assert.match(page, /aria-label="Public summary preview"/);
		assert.match(page, /const title = ref\(""\)/);
		assert.match(page, /const summary = ref\(""\)/);
		assert.doesNotMatch(page, /localStorage|route\.query\.(title|message|summary)/);
		assert.match(page, /mustReload.value = statusCode === 409/);
		const privacy = read("../server/middleware/coverageRoadmapPrivacy.ts");
		assert.match(privacy, /\/account\/editorial\/roadmap/);
		assert.match(privacy, /private, no-store/);
		assert.match(privacy, /noindex, nofollow/);
	});
	it("offers discovery from Ask and a private suggestion-to-draft link", () => {
		assert.match(read("../src/pages/ask.vue"), /to="\/roadmap"/);
		assert.match(read("../src/pages/account/editorial/reader-feedback.vue"), /Prepare a separate public question/);
		assert.match(read("../src/pages/account/editorial/index.vue"), /Public coverage moderation/);
	});
});
