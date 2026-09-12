import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import { seedReviewDates } from "../src/data/seedClaims.js";
import { seedReaderAnnouncementSchema } from "../src/utils/seedReaderAnnouncement.js";

const baseline = JSON.parse(readFileSync(new URL("../../docs/living-evidence-baseline.json", import.meta.url), "utf8"));
const registry = JSON.parse(readFileSync(new URL("../../docs/living-evidence-refreshes.json", import.meta.url), "utf8"));

describe("living evidence refresh delivery", () => {
	it("updates baseline reviews without creating duplicate reviews or replacing publication history", () => {
		assert.equal(defaultClaims.length, baseline.totalReviews);
		const ids = new Set<string>();
		for (const record of registry.refreshes) {
			assert.ok(baseline.refreshTargets.some((target: { slug: string }) => target.slug === record.slug));
			const matches = defaultClaims.filter(claim => claim.slug === record.slug && claim.topicSlug === record.topicSlug);
			assert.equal(matches.length, 1);
			const claim = matches[0]!;
			const announcement = seedReaderAnnouncementSchema.parse(claim.readerAnnouncement);
			assert.equal(announcement.id, record.announcementId);
			assert.equal(announcement.kind, "evidence_update");
			assert.equal(announcement.bottomLineImpact, record.bottomLineImpact);
			assert.ok(!ids.has(announcement.id));
			ids.add(announcement.id);
			assert.ok(claim.changeLog.some(entry => entry.kind === "publication" && entry.date < record.preparedAt));
			assert.equal(claim.changeLog.at(-1)?.kind, "update");
			assert.equal(seedReviewDates(claim).reviewDateBasis, "source_record");
			assert.ok(seedReviewDates(claim).lastReviewedAt!.toISOString() < record.preparedAt);
			assert.match(claim.reviewerLine, /no independent expert approval/i);
			assert.equal(record.publicVerification, null);
		}
	});

	it("retains independently observed corrections without treating the notices as efficacy evidence", () => {
		for (const [slug, doi, notice] of [
			["are-dietary-cholesterol-and-saturated-fat-the-same-kind-of-risk", "10.1016/j.ajcnut.2025.05.001", "10.1016/j.ajcnut.2025.10.009"],
			["does-saturated-fat-still-raise-ldl-and-heart-risk", "10.1161/CIR.0000000000000510", "10.1161/cir.0000000000000529"]
		]) {
			const claim = defaultClaims.find(claim => claim.slug === slug)!;
			const source = claim.sources.find(source => source.doi === doi)!;
			assert.equal(source.citationStatus, "corrected");
			assert.ok(source.statusSources?.includes(`https://doi.org/${notice}`));
			const noticeSource = claim.sources.find(source => source.doi === notice);
			if (noticeSource) assert.equal(noticeSource.stance, "context");
		}
	});
});
