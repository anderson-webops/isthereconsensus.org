import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defaultClaims } from "../src/data/claims.js";
import { auditClaimCatalog, editorialConcerns, estimatedReadingGrade } from "../src/utils/editorialAudit.js";

describe("bounded editorial catalog audit", () => {
	it("reports the whole source catalog without calling flags defects or inventing reader demand", () => {
		const report = auditClaimCatalog(defaultClaims, 2026);
		assert.equal(report.claims, 1001);
		assert.equal(report.rows.length, 1001);
		assert.equal(new Set(report.rows.map(row => row.key)).size, 1001);
		assert.match(report.basis, /not a live database inventory or expert review/);
		assert.match(report.interpretation, /not automatic defects/);
		assert.equal(Object.values(report.topics).reduce((total, count) => total + count, 0), 1001);
		assert.throws(() => auditClaimCatalog([], Number.NaN));
	});

	it("distinguishes old clinical evidence from stable foundational references", () => {
		const base = defaultClaims[0]!;
		const oldSources = base.sources.map(source => ({ ...source, year: 2010 }));
		assert.ok(editorialConcerns({ ...base, sources: oldSources, topicSlug: "health-and-medicine" }, 2026).reasons.includes("health_source_age_check"));
		const physics = editorialConcerns({ ...base, sources: oldSources, topicSlug: "physics-and-chemistry" }, 2026);
		assert.ok(physics.reasons.includes("foundational_source_age_check"));
		assert.equal(physics.reasons.includes("health_source_age_check"), false);
	});

	it("does not invent source years or treat missing DOIs as evidence failure", () => {
		const base = defaultClaims[0]!;
		const row = editorialConcerns({ ...base, sources: [{ ...base.sources[0]!, year: undefined, doi: undefined }] }, 2026);
		assert.equal(row.newestSourceYear, null);
		assert.ok(row.reasons.includes("source_years_not_recorded"));
		assert.equal(row.reasons.some(reason => reason.includes("doi")), false);
		assert.equal(estimatedReadingGrade(""), null);
	});

	it("recognizes punctuated U.S. jurisdiction labels without matching unrelated words", () => {
		const base = defaultClaims[0]!;
		for (const title of ["Do U.S. FDA-approved medicines help?", "Do US FDA-approved medicines help?", "Do United States FDA-approved medicines help?"]) assert.equal(editorialConcerns({ ...base, title }, 2026).reasons.includes("jurisdiction_label_check"), false);
		assert.equal(editorialConcerns({ ...base, title: "Do FDA-approved medicines help?" }, 2026).reasons.includes("jurisdiction_label_check"), true);
	});
});
