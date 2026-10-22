import { createHash } from "node:crypto";
import { observedEditorialCompletionBaseline } from "../data/claim-editorial-completion-baselines.js";
import { clinicalMaintenanceTopics, completeEditorialCopy } from "../data/claim-editorial-completion.js";
import { claimsBeforeEditorialCompletion } from "../data/claims.js";
import { seedClaimFields, seedReviewDates } from "../data/seedClaims.js";

export function createEditorialCompletionProposal(identity: { commit: string; tree: string }) {
	if (![identity.commit, identity.tree].every(value => /^[a-f\d]{40}$/.test(value))) throw new Error("Exact source commit and tree are required.");
	const targets = claimsBeforeEditorialCompletion.flatMap((before) => {
		const after = completeEditorialCopy(before);
		if (after === before) return [];
		const expected = seedClaimFields(before);
		const proposed = seedClaimFields(after);
		return [{
			key: `${before.topicSlug}/${before.slug}`,
			publicApiPath: `/api/topics/${before.topicSlug}/claims/${before.slug}`,
			expectedSourceBaseline: expected,
			compatibleBaselines: [observedEditorialCompletionBaseline(before)],
			proposedFields: proposed,
			changedFields: Object.keys(proposed).filter(field => JSON.stringify(proposed[field as keyof typeof proposed]) !== JSON.stringify(expected[field as keyof typeof expected])),
			expectedSources: before.sources,
			proposedSources: after.sources,
			maintenance: clinicalMaintenanceTopics.has(before.topicSlug) ? { cadenceDays: 90, expectedDefaultSchedule: seedReviewDates(before), preserveOtherSchedules: true } : null
		}];
	});
	return {
		schemaVersion: 1,
		kind: "owner-approved-editorial-completion",
		source: identity,
		contentSha256: createHash("sha256").update(JSON.stringify(targets)).digest("hex"),
		publicationStatus: "not_published",
		independentExpertReviewClaimed: false,
		constraints: ["Apply only exact approved baselines in transactions.", "Preserve divergent editorial work, independent assessments, private state, citation identities and notices, history and review dates.", "A copy edit or maintenance classification is not a new scientific review.", "Keep both older publication approvals immutable; verify actual anonymous readback after normal deployment."],
		targets
	};
}
