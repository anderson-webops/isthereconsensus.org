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
			["does-saturated-fat-still-raise-ldl-and-heart-risk", "10.1161/CIR.0000000000000510", "10.1161/cir.0000000000000529"],
			["why-does-one-study-rarely-change-everything", "10.1371/journal.pmed.0020124", "10.1371/journal.pmed.1004085"],
			["is-nuclear-power-more-dangerous-than-fossil-fuel-energy", "10.1038/s41467-026-69285-4", "10.1038/s41467-026-72052-0"]
		]) {
			const claim = defaultClaims.find(claim => claim.slug === slug)!;
			const source = claim.sources.find(source => source.doi === doi)!;
			assert.equal(source.citationStatus, "corrected");
			assert.ok(source.statusSources?.includes(`https://doi.org/${notice}`));
			const noticeSource = claim.sources.find(source => source.doi === notice);
			if (noticeSource) assert.equal(noticeSource.stance, "context");
		}
	});

	it("retains the non-DOI nuclear correction without fabricating a successful indexing check", () => {
		const claim = defaultClaims.find(claim => claim.slug === "is-nuclear-power-more-dangerous-than-fossil-fuel-energy")!;
		const report = claim.sources.find(source => source.url === "https://www.unscear.org/unscear/en/publications/2020_2021_2.html")!;
		assert.equal(report.citationStatus, "corrected");
		assert.ok(report.statusSources?.includes("https://www.unscear.org/unscear/uploads/documents/publications/Corrigenda/2020_21/2316352E-2022-II.pdf"));
		const observations = JSON.parse(readFileSync(new URL("../../docs/research/nuclear-integrity-2026-09-13.json", import.meta.url), "utf8"));
		const source = claim.sources.find(source => source.doi === "10.1007/s10640-025-01002-z")!;
		const checks = observations.filter((item: { doi: string }) => item.doi === source.doi);
		assert.equal(checks.find((item: { provider: string }) => item.provider === "europepmc").outcome, "not_indexed");
		assert.equal(source.citationCheckedAt, checks.find((item: { provider: string }) => item.provider === "crossref").observedAt);
		assert.equal(claim.sources.length, 9);
		assert.equal(claim.evidenceSummaries.length, 6);
		assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		assert.deepEqual(claim.institutionalAnchors, []);
	});

	it("keeps the aluminium correction distinct from the MMR cohort and a retracted comment", () => {
		const broad = defaultClaims.find(claim => claim.slug === "do-childhood-vaccines-cause-autism")!;
		const aluminium = broad.sources.find(source => source.doi === "10.7326/ANNALS-25-00997")!;
		assert.equal(aluminium.citationStatus, "corrected");
		assert.ok(aluminium.statusSources?.includes("https://europepmc.org/article/MED/40674587"));
		const mmr = defaultClaims.find(claim => claim.slug === "does-the-mmr-vaccine-cause-autism")!;
		const cohort = mmr.sources.find(source => source.doi === "10.7326/M18-2101")!;
		assert.notEqual(cohort.citationStatus, "retracted");
		assert.ok(!cohort.statusSources?.some(url => url.includes("L19-0381")));
	});
});
