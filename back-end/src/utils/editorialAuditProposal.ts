import { createHash } from "node:crypto";
import { legacyEditorialBaseline } from "../data/claim-audit-legacy-baselines-2026-10.js";
import { refreshEditorialAuditClaim } from "../data/claim-audit-refreshes-2026-10.js";
import { claimsBeforeIntegrityCorrections } from "../data/claims.js";
import { seedClaimFields } from "../data/seedClaims.js";
import { researchIntegrityFields } from "./researchIntegrity.js";

export function createEditorialAuditProposal(identity: { commit: string; tree: string }) {
	if (![identity.commit, identity.tree].every(value => /^[a-f\d]{40}$/.test(value))) throw new Error("Exact source commit and tree are required.");
	const targets = claimsBeforeIntegrityCorrections.flatMap((before) => {
		if (refreshEditorialAuditClaim(before) === before) return [];
		const after = refreshEditorialAuditClaim(researchIntegrityFields(before, before.topicSlug));
		const expected = seedClaimFields(before);
		const proposed = seedClaimFields(after);
		return [{
			key: `${before.topicSlug}/${before.slug}`,
			publicApiPath: `/api/topics/${before.topicSlug}/claims/${before.slug}`,
			expectedSourceBaseline: expected,
			compatibleLegacyBaseline: seedClaimFields(legacyEditorialBaseline(before)),
			proposedFields: proposed,
			changedFields: Object.keys(proposed).filter(field => JSON.stringify(proposed[field as keyof typeof proposed]) !== JSON.stringify(expected[field as keyof typeof expected])),
			expectedSources: before.sources,
			proposedSources: after.sources
		}];
	});
	const contentSha256 = createHash("sha256").update(JSON.stringify(targets)).digest("hex");
	return {
		schemaVersion: 1,
		kind: "source-only-editorial-proposal",
		source: identity,
		contentSha256,
		publicationStatus: "not_published",
		constraints: [
			"Not a production snapshot, authenticated rehearsal, backup, or publication receipt.",
			"Only the owner-approved, baseline-bound source-release publisher may automatically apply this batch.",
			"Preserve source IDs, notices, source-check dates, human decisions, schedules, private state, and existing history.",
			"Preserve divergent content and independent expert assessments; do not replay older approvals.",
			"Rehearse automatic application, transaction rollback, idempotency, and notice preservation before release."
		],
		targets
	};
}
