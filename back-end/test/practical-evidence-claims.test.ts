import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { practicalEvidenceClaims, practicalEvidenceGaps } from "../src/data/claim-expansion-practical-evidence.js";
import { strengthPracticalClaims } from "../src/data/claim-expansion-practical-strength.js";
import { defaultClaims } from "../src/data/claims.js";
import { buildSeedClaimUpdate } from "../src/data/seedClaims.js";
import { defaultTopics } from "../src/data/topics.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

describe("new practical-evidence canonical reviews", () => {
	it("counts new questions separately from the 750-review baseline and comparison pages", () => {
		const slugs = new Set(practicalEvidenceClaims.map(claim => claim.slug));
		assert.equal(slugs.size, practicalEvidenceClaims.length);
		assert.equal(defaultClaims.length, 750 + slugs.size);
		assert.equal(practicalEvidenceGaps.length, slugs.size);
		for (const gap of practicalEvidenceGaps) {
			assert.ok(slugs.has(gap.slug));
			assert.ok(gap.gap.length > 70);
			assert.equal(defaultClaims.filter(claim => claim.slug === gap.slug).length, 1);
			for (const related of gap.relatedExistingSlugs) {
				assert.ok(!slugs.has(related));
				assert.ok(defaultClaims.some(claim => claim.slug === related));
			}
		}
	});

	it("keeps the three creatine questions distinct and their evidence limits explicit", () => {
		assert.equal(strengthPracticalClaims.length, 3);
		const [loading, leanMass, buffered] = strengthPracticalClaims;
		assert.match(loading!.bottomLine, /does not establish identical strength/);
		assert.match(loading!.evidenceSummaries![0]!.limitations.join(" "), /Abstract only/);
		assert.match(leanMass!.bottomLine, /not evidence that all creatine benefits are water/);
		assert.match(leanMass!.evidenceSummaries![0]!.finding, /0\.51 kg.*2\.24 versus 2\.11 kg/);
		assert.match(leanMass!.evidenceSummaries![1]!.magnitude!, /95% credible interval −0\.02 to 0\.25/);
		assert.match(buffered!.bottomLine, /does not prove exact equivalence/);
		assert.match(buffered!.coiSummary!, /AlzChem/);
		for (const claim of strengthPracticalClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.appraisalTools!.join(" "), /no formal GRADE/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
			assert.equal(new Set(claim.sources.map(source => source.url)).size, claim.sources.length);
		}
	});

	it("finds the new creatine questions without counting comparisons or revisions as reviews", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [index, query] of ["creatine loading phase", "creatine lean mass muscle tissue", "buffered creatine monohydrate"].entries()) {
			assert.ok(search(query).some(result => result.claim.slug === strengthPracticalClaims[index]!.slug));
		}
	});

	it("validates new reviews and sources against the real deployment schemas", async () => {
		for (const entry of practicalEvidenceClaims) {
			const claim = defaultClaims.find(item => item.slug === entry.slug)!;
			assert.ok(defaultTopics.some(topic => topic.slug === claim.topicSlug));
			const document = new Claim({
				topic: new mongoose.Types.ObjectId(),
				slug: claim.slug,
				...buildSeedClaimUpdate({}, claim).$set
			});
			await document.validate();
			for (const source of claim.sources) await new ClaimSource({ claim: document._id, ...source }).validate();
			assert.equal(claim.readerAnnouncement?.kind, "new_review");
			assert.equal(claim.readerAnnouncement?.bottomLineImpact, "new");
			assert.ok(Date.parse(claim.readerAnnouncement!.date) <= Date.now());
			assert.match(claim.readerAnnouncement!.id, /^[0-9a-f-]{36}$/);
		}
	});

	it("does not manufacture a measured consensus, direct trial, or independent expert review", () => {
		const claim = practicalEvidenceClaims[0]!;
		assert.equal(claim.consensusBand, "unclear");
		assert.equal(claim.evidenceCertainty, "very_low");
		assert.match(claim.bottomLine, /does not prove timing never matters/i);
		assert.match(claim.reviewerLine!, /independent expert review not completed/);
		assert.match(claim.coiSummary!, /supplement-industry relationships/);
		assert.match(claim.uncertaintySummary!, /targeted search/);
		assert.match(claim.evidenceSummaries![1]!.limitations.join(" "), /Abstract checked/);
		assert.ok(claim.sources.every(source => source.statusSources?.every(url => url.startsWith("https://"))));
	});

	it("makes the new question discoverable through the existing claim search", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		assert.ok(
			search("morning caffeine 90 minutes").some(
				result => result.claim.slug === practicalEvidenceClaims[0]!.slug
			)
		);
	});
});
