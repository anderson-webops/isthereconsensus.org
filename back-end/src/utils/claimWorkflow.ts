import type { ClaimStatus } from "../models/schemas/Claim.js";

export type ClaimWorkflowAction
	= | "archive"
		| "publish"
		| "request_update"
		| "restore_draft"
		| "review";

const allowedFrom: Record<ClaimWorkflowAction, ReadonlySet<ClaimStatus>> = {
	archive: new Set(["draft", "needs_update", "published"]),
	publish: new Set(["draft", "needs_update"]),
	request_update: new Set(["published"]),
	restore_draft: new Set(["archived", "needs_update"]),
	review: new Set(["published"])
};

export function claimWorkflowTransitionAllowed(status: ClaimStatus, action: ClaimWorkflowAction) {
	return allowedFrom[action].has(status);
}
