import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import {
	CONTENT_COVERAGE_TARGET,
	summarizeContentCoverage
} from "../src/data/contentCoverage.js";
import { defaultTopics } from "../src/data/topics.js";

describe("content coverage", () => {
	it("tracks the current library against the evidence-encyclopedia target", () => {
		const report = summarizeContentCoverage(defaultClaims, defaultTopics);

		assert.ok(report.reviewedClaimCount >= 335);
		assert.ok(report.activeTopicCount >= 21);
		assert.equal(report.definedTopicCount, defaultTopics.length);
		assert.equal(
			report.claimGap,
			Math.max(0, CONTENT_COVERAGE_TARGET.minimumReviewedClaims - report.reviewedClaimCount)
		);
		assert.equal(
			report.activeTopicGap,
			Math.max(0, CONTENT_COVERAGE_TARGET.minimumActiveTopics - report.activeTopicCount)
		);
		assert.deepEqual(report.unlistedTopicSlugs, []);
		assert.equal(
			report.targetReached,
			report.reviewedClaimCount >= CONTENT_COVERAGE_TARGET.minimumReviewedClaims
			&& report.activeTopicCount >= CONTENT_COVERAGE_TARGET.minimumActiveTopics
		);
	});

	it("counts only published reviews and only topics with published content", () => {
		const topics = [
			{ slug: "one", title: "One", order: 1 },
			{ slug: "two", title: "Two", order: 2 }
		];
		const report = summarizeContentCoverage(
			[
				{ topicSlug: "one", status: "published" },
				{ topicSlug: "one", status: "draft" },
				{ topicSlug: "missing", status: "published" }
			],
			topics
		);

		assert.equal(report.reviewedClaimCount, 2);
		assert.equal(report.activeTopicCount, 1);
		assert.deepEqual(report.topics.map(topic => topic.reviewedClaimCount), [1, 0]);
		assert.deepEqual(report.unlistedTopicSlugs, ["missing"]);
		assert.equal(report.targetReached, false);
	});
});
