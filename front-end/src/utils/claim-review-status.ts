export { claimReviewStatus } from "../../../back-end/src/utils/claimReviewStatus.js";
export type { ClaimReviewStatus, ReviewDateBasis } from "../../../back-end/src/utils/claimReviewStatus.js";

export function formatReviewDate(value?: string) {
	return value
		? new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(value))
		: "Not recorded";
}

export const reviewStatusLabels = {
	source_notice: "Source notice recorded",
	update_requested: "Update requested",
	due: "Follow-up review due",
	dates_need_verification: "Dates need verification",
	provenance_unknown: "Date provenance not recorded",
	scheduled: "Follow-up scheduled",
	unscheduled: "Follow-up not scheduled"
};
