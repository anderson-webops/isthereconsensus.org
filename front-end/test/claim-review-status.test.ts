import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { claimReviewStatus, formatReviewDate, reviewStatusLabels } from "../src/utils/claim-review-status.js";

describe("reader review status", () => {
	it("formats the same calendar day regardless of the reader timezone", () => {
		assert.equal(formatReviewDate("2026-09-12T00:00:00.000Z"), "Sep 12, 2026");
		assert.equal(formatReviewDate(), "Not recorded");
	});
	it("labels follow-up schedules without promising current or valid evidence", () => {
		const status = claimReviewStatus(
			{ lastReviewedAt: "2026-08-01", reviewDateBasis: "source_record", nextReviewAt: "2026-09-01" },
			[],
			new Date("2026-09-12")
		);
		assert.equal(reviewStatusLabels[status.state], "Follow-up review due");
		assert.equal(status.basis, "source_record");
	});
});
