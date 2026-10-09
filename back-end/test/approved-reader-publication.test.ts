import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { readerExpansionClaims } from "../src/data/claim-expansion-reader.js";
import { defaultClaims } from "../src/data/claims.js";
import { approvedReaderContentMatches, approvedReaderDraft, publishApprovedReaderContent, validateApprovedReaderRelease } from "../src/utils/approvedReaderPublication.js";

describe("owner-approved content-first release", () => {
	it("does not start database work after shutdown cancels publication", async () => {
		const controller = new AbortController();
		controller.abort();
		await assert.rejects(publishApprovedReaderContent(controller.signal), { name: "AbortError" });
	});
	it("validates the complete 201-review, 461-citation release without a database", async () => {
		assert.deepEqual(await validateApprovedReaderRelease(), { reviews: 201, citations: 461 });
	});
	it("keeps source dates and honest assistant disclosures without a fake human actor", () => {
		const seed = readerExpansionClaims[0];
		const draft = approvedReaderDraft(seed, new mongoose.Types.ObjectId());
		assert.equal(draft.status, "draft");
		assert.deepEqual(draft.changeLog, []);
		assert.equal(draft.reviewDateBasis, "source_record");
		assert.match(draft.reviewerLine, /AI agent.*independent expert review not completed/u);
		assert.ok(draft.lastReviewedAt instanceof Date);
		assert.equal("reviewedBy" in draft, false);
	});
	it("preserves complete narratives and refuses changed content or extra array items", () => {
		const draft = approvedReaderDraft(readerExpansionClaims[0], new mongoose.Types.ObjectId());
		assert.equal(approvedReaderContentMatches({ ...draft, unrelatedField: "not part of the approved payload" }, draft), true);
		assert.equal(approvedReaderContentMatches({ ...draft, bottomLine: "Different answer" }, draft), false);
		assert.equal(approvedReaderContentMatches({ ...draft, stableCore: [...draft.stableCore, "Unapproved addition"] }, draft), false);
	});
	it("rejects changes to the approved batch before any publication", async () => {
		const original = readerExpansionClaims[0].bottomLine;
		const canonical = defaultClaims.find(value => value.slug === readerExpansionClaims[0].slug)!;
		const canonicalOriginal = canonical.bottomLine;
		try {
			readerExpansionClaims[0].bottomLine = "Unapproved replacement.";
			canonical.bottomLine = readerExpansionClaims[0].bottomLine;
			await assert.rejects(validateApprovedReaderRelease(), /owner-approved material/u);
		}
		finally {
			readerExpansionClaims[0].bottomLine = original;
			canonical.bottomLine = canonicalOriginal;
		}
	});
});
