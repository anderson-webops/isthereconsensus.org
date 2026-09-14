import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import { seedReviewDates } from "../src/data/seedClaims.js";
import { seedReaderAnnouncementSchema } from "../src/utils/seedReaderAnnouncement.js";

const baseline = JSON.parse(readFileSync(new URL("../../docs/living-evidence-baseline.json", import.meta.url), "utf8"));
const registry = JSON.parse(readFileSync(new URL("../../docs/living-evidence-refreshes.json", import.meta.url), "utf8"));
const publication = JSON.parse(readFileSync(new URL("../../docs/living-evidence-publication-2026-09-13.json", import.meta.url), "utf8"));

describe("living evidence refresh delivery", () => {
	it("keeps prepared search descriptions and study limitations within the authenticated editor limits", () => {
		for (const record of registry.refreshes) {
			const claim = defaultClaims.find(entry => entry.topicSlug === record.topicSlug && entry.slug === record.slug)!;
			assert.ok(claim.searchDatabases.length <= 8, claim.slug);
			for (const description of claim.searchDatabases) {
				assert.equal(description, description.trim(), claim.slug);
				assert.ok(description.length <= 120, `${claim.slug}: search description would be truncated`);
			}
			for (const summary of claim.evidenceSummaries) {
				assert.ok((summary.limitations?.length ?? 0) <= 6, claim.slug);
				for (const limitation of summary.limitations ?? []) {
					assert.equal(limitation, limitation.trim(), claim.slug);
					assert.ok(limitation.length <= 240, `${claim.slug}: study limitation would be truncated`);
				}
			}
		}
	});

	it("records the twenty verified publications with actual rather than prepared announcement identities", () => {
		const key = (record: { topicSlug: string; slug: string }) => `${record.topicSlug}/${record.slug}`;
		assert.equal(registry.refreshes.length, 20);
		assert.deepEqual(registry.refreshes.map(key).sort(), baseline.refreshTargets.map(key).sort());
		assert.equal(publication.allPassed, true);
		assert.equal(publication.articles.length, 20);
		assert.equal(new Set(publication.articles.map((article: { announcementId: string }) => article.announcementId)).size, 20);
		for (const record of registry.refreshes) {
			const article = publication.articles.find((entry: { key: string }) => entry.key === key(record));
			assert.ok(article, key(record));
			assert.equal(record.status, "publicly_verified");
			assert.equal(record.announcementId, article.announcementId);
			assert.notEqual(record.announcementId, record.preparedAnnouncementId);
			assert.match(record.announcementId, /^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/);
			assert.equal(record.bottomLineImpact, article.bottomLineImpact);
			assert.equal(record.publicVerification.record, "living-evidence-publication-2026-09-13.json");
			assert.equal(record.publicVerification.release, publication.release);
			assert.equal(record.publicVerification.commit, publication.commit);
			assert.equal(record.publicVerification.verifiedAt, publication.completedAt);
			assert.equal(record.publicVerification.announcementAt, article.announcementAt);
			assert.equal(record.publicVerification.publicationHistoryAt, article.publicationAt);
			assert.equal(record.publicVerification.lastReviewedAt, article.lastReviewedAt);
			assert.equal(record.publicVerification.reviewDateBasis, "editorial_review");
			assert.equal(record.publicVerification.nextReviewAt, article.nextReviewAt);
			assert.equal(record.publicVerification.sourceCount, article.sources);
			assert.ok(Date.parse(article.announcementAt) <= Date.parse(article.lastReviewedAt));
			assert.ok(Date.parse(article.lastReviewedAt) <= Date.parse(article.publicationAt));
			assert.ok(Date.parse(article.publicationAt) <= Date.parse(publication.completedAt));
			assert.equal(article.retainedSourceIds.length, article.retainedSources);
			assert.equal(new Set(article.orderedSourceIds).size, article.sources);
			assert.ok(article.retainedSourceIds.every((identity: string) => article.orderedSourceIds.includes(identity)));
		}
		assert.equal(publication.articles.reduce((total: number, article: { retainedSources: number }) => total + article.retainedSources, 0), 60);
		assert.equal(publication.articles.reduce((total: number, article: { addedSources: number }) => total + article.addedSources, 0), 72);
	});

	it("updates baseline reviews without creating duplicate reviews or replacing publication history", () => {
		assert.equal(defaultClaims.length, baseline.totalReviews);
		const ids = new Set<string>();
		for (const record of registry.refreshes) {
			assert.ok(baseline.refreshTargets.some((target: { slug: string }) => target.slug === record.slug));
			const matches = defaultClaims.filter(claim => claim.slug === record.slug && claim.topicSlug === record.topicSlug);
			assert.equal(matches.length, 1);
			const claim = matches[0]!;
			const announcement = seedReaderAnnouncementSchema.parse(claim.readerAnnouncement);
			assert.equal(announcement.id, record.preparedAnnouncementId);
			assert.equal(announcement.kind, "evidence_update");
			assert.equal(announcement.bottomLineImpact, record.bottomLineImpact);
			assert.ok(!ids.has(announcement.id));
			ids.add(announcement.id);
			assert.ok(claim.changeLog.some(entry => entry.kind === "publication" && entry.date < record.preparedAt));
			assert.equal(claim.changeLog.at(-1)?.kind, "update");
			assert.equal(seedReviewDates(claim).reviewDateBasis, "source_record");
			assert.ok(seedReviewDates(claim).lastReviewedAt!.toISOString() < record.preparedAt);
			assert.match(claim.reviewerLine, /no independent expert approval/i);
			assert.notEqual(announcement.id, record.announcementId);
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
		assert.equal(claim.lastRetractionCheckAt, observations.at(-1).observedAt);
		assert.notEqual(report.citationCheckedAt, claim.readerAnnouncement?.date);
		assert.equal(claim.sources.length, 9);
		assert.equal(claim.evidenceSummaries.length, 6);
		assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		assert.deepEqual(claim.institutionalAnchors, []);
	});

	it("keeps smoking notice checks separate from preparation and undated guidance checks", () => {
		const claim = defaultClaims.find(claim => claim.slug === "did-smoking-cause-lung-cancer")!;
		const observations = JSON.parse(readFileSync(new URL("../../docs/research/smoking-integrity-2026-09-13.json", import.meta.url), "utf8"));
		for (const source of claim.sources.filter(source => source.doi)) {
			const checks = observations.filter((item: { doi: string }) => item.doi === source.doi!.toLowerCase());
			assert.equal(checks.length, 2);
			assert.ok(checks.every((item: { outcome: string }) => item.outcome === "no_registered_update"));
			assert.equal(source.citationCheckedAt, checks.at(-1).observedAt);
			assert.notEqual(source.citationCheckedAt, claim.readerAnnouncement?.date);
		}
		const guidance = claim.sources.find(source => source.publisher === "National Cancer Institute")!;
		assert.equal(guidance.year, 2017);
		assert.equal(guidance.citationCheckedAt, undefined);
		assert.equal(claim.lastRetractionCheckAt, observations.at(-1).observedAt);
		assert.equal(claim.sources.length, 5);
		assert.equal(claim.evidenceSummaries.length, 5);
		assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		assert.deepEqual(claim.institutionalAnchors, []);
	});

	it("does not date an evolution book check from an unsuccessful indexing result", () => {
		const claim = defaultClaims.find(claim => claim.slug === "is-evolution-just-a-theory")!;
		const observations = JSON.parse(readFileSync(new URL("../../docs/research/evolution-integrity-2026-09-13.json", import.meta.url), "utf8"));
		const book = claim.sources.find(source => source.doi === "10.17226/11876")!;
		const checks = observations.filter((item: { doi: string }) => item.doi === book.doi);
		assert.equal(checks.find((item: { provider: string }) => item.provider === "europepmc").outcome, "not_indexed");
		assert.equal(book.citationCheckedAt, checks.find((item: { provider: string }) => item.provider === "crossref").observedAt);
		assert.equal(claim.lastRetractionCheckAt, observations.at(-1).observedAt);
		assert.notEqual(claim.lastRetractionCheckAt, claim.readerAnnouncement?.date);
		assert.equal(claim.sources.length, 5);
		assert.equal(claim.evidenceSummaries.length, 4);
		assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		assert.deepEqual(claim.institutionalAnchors, []);
	});

	it("retains incomplete climate notice coverage and the successful retry separately", () => {
		const claim = defaultClaims.find(claim => claim.slug === "is-recent-global-warming-mainly-caused-by-human-activity")!;
		const observations = JSON.parse(readFileSync(new URL("../../docs/research/climate-integrity-2026-09-13.json", import.meta.url), "utf8"));
		assert.equal(observations.length, 7);
		assert.equal(observations.filter((item: { outcome?: string }) => item.outcome === "not_indexed").length, 2);
		const failure = observations.find((item: { error?: unknown }) => item.error);
		assert.ok(failure);
		assert.equal(failure.observedAt, undefined);
		for (const source of claim.sources.filter(source => source.doi)) {
			const successful = observations.filter((item: { doi: string; outcome?: string }) => item.doi === source.doi && item.outcome === "no_registered_update");
			assert.equal(source.citationCheckedAt, successful.at(-1).observedAt);
		}
		assert.equal(claim.sources.find(source => source.doi === "10.1088/1748-9326/11/4/048002")?.kind, "context");
		assert.equal(claim.lastRetractionCheckAt, observations.at(-1).observedAt);
		assert.equal(claim.sources.length, 6);
		assert.equal(claim.evidenceSummaries.length, 5);
		assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		assert.deepEqual(claim.institutionalAnchors, []);
	});

	it("preserves clinical source dates and guidance limits in the myocarditis refresh", () => {
		const claim = defaultClaims.find(claim => claim.slug === "how-big-is-the-myocarditis-risk-after-mrna-covid-19-vaccination")!;
		const observations = JSON.parse(readFileSync(new URL("../../docs/research/myocarditis-integrity-2026-09-13.json", import.meta.url), "utf8"));
		assert.equal(observations.length, 10);
		for (const source of claim.sources.filter(source => source.doi)) {
			const checks = observations.filter((item: { doi: string }) => item.doi === source.doi!.toLowerCase());
			assert.equal(checks.length, 2);
			assert.ok(checks.every((item: { outcome: string }) => item.outcome === "no_registered_update"));
			assert.equal(source.citationCheckedAt, checks.at(-1).observedAt);
			assert.notEqual(source.citationCheckedAt, claim.readerAnnouncement?.date);
		}
		const guidance = claim.sources.find(source => source.publisher === "U.S. Food and Drug Administration")!;
		assert.equal(guidance.year, 2025);
		assert.equal(guidance.citationCheckedAt, undefined);
		assert.match(guidance.note!, /2023–2024/);
		assert.equal(claim.lastRetractionCheckAt, observations.at(-1).observedAt);
		assert.equal(claim.sources.length, 8);
		assert.equal(claim.evidenceSummaries.length, 7);
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
