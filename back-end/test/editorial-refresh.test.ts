import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { editorialAuditPreparedAt, refreshEditorialAuditClaim } from "../src/data/claim-audit-refreshes-2026-10.js";
import { claimsBeforeIntegrityCorrections, defaultClaims } from "../src/data/claims.js";
import { seedClaimFields } from "../src/data/seedClaims.js";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createEditorialAuditProposal } from "../src/utils/editorialAuditProposal.js";

describe("source-prepared editorial audit corrections", () => {
	it("produces a source-bound proposal without impersonating production or an authenticated reviewer", () => {
		const proposal = createEditorialAuditProposal({ commit: "a".repeat(40), tree: "b".repeat(40) });
		assert.equal(proposal.targets.length, 5);
		assert.equal(proposal.publicationStatus, "not_published");
		assert.equal(proposal.kind, "source-only-editorial-proposal");
		assert.match(proposal.contentSha256, /^[a-f\d]{64}$/);
		assert.equal(JSON.stringify(proposal).includes("SESSION_SECRET"), false);
		assert.throws(() => createEditorialAuditProposal({ commit: "main", tree: "main" }));
		assert.ok(proposal.targets.every(target => !target.changedFields.includes("lastRetractionCheckAt")));
		for (const target of proposal.targets) {
			const canonical = defaultClaims.find(claim => `${claim.topicSlug}/${claim.slug}` === target.key)!;
			assert.deepEqual(target.proposedFields, seedClaimFields(canonical));
			assert.notEqual(target.proposedFields.reviewerLine, "Reviewed for evidence quality, scope, and plain-language accuracy.");
		}
	});
	it("changes only five identified reviews and preserves canonical paths", () => {
		const changed = claimsBeforeIntegrityCorrections.filter(claim => refreshEditorialAuditClaim(claim) !== claim);
		assert.equal(changed.length, 5);
		for (const before of changed) {
			const after = refreshEditorialAuditClaim(before);
			assert.equal(after.slug, before.slug);
			assert.equal(after.topicSlug, before.topicSlug);
			assert.equal(after.lastRetractionCheckAt, before.lastRetractionCheckAt);
			assert.deepEqual(after.changeLog.slice(0, before.changeLog.length), before.changeLog);
			assert.equal(after.changeLog.at(-1)?.date, editorialAuditPreparedAt);
		}
	});

	it("separates fluoride outcomes and does not turn observational associations into a causal verdict", () => {
		const claim = defaultClaims.find(claim => claim.slug === "does-fluoride-in-community-drinking-water-prevent-tooth-decay-and-is-it-safe")!;
		assert.match(claim.title, /prevent tooth decay/);
		assert.doesNotMatch(claim.title, /and is it safe/);
		assert.equal(claim.evidenceCertainty, "low");
		assert.equal(claim.sources.find(source => source.title.startsWith("NTP Monograph"))?.kind, "systematic_review");
		assert.ok(claim.sources.some(source => source.doi === "10.1001/jamapediatrics.2024.5542"));
		assert.match(claim.bottomLine, /does not establish the risk/);
		assert.ok(claim.evidenceSummaries.some(summary => summary.limitations.some(limit => limit.includes("not independent replications"))));
	});

	it("distinguishes smoking cessation from long-term safety and labels England's guidance", () => {
		const claim = defaultClaims.find(claim => claim.slug === "are-nicotine-e-cigarettes-less-harmful-than-smoking-and-do-they-help-people-quit")!;
		assert.equal(claim.evidenceCertainty, "high");
		assert.ok(claim.sources.some(source => source.doi === "10.1002/14651858.CD010216.pub11"));
		assert.ok(claim.sources.some(source => source.publisher === "NHS England"));
		assert.match(claim.bottomLine, /does not make vaping harmless/);
		assert.equal(claim.evidenceSummaries[1]?.certainty, undefined);
	});

	it("validates prepared rows without claiming publication or expert approval", async () => {
		for (const before of claimsBeforeIntegrityCorrections) {
			const after = refreshEditorialAuditClaim(before);
			if (after === before) continue;
			await new Claim({ ...seedClaimFields(after), topic: new mongoose.Types.ObjectId(), slug: after.slug }).validate();
			for (const source of after.sources) await new ClaimSource({ ...source, claim: new mongoose.Types.ObjectId() }).validate();
			assert.equal(after.readerAnnouncement, before.readerAnnouncement);
		}
	});
});
