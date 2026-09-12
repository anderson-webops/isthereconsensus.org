import type { ClaimReviewStatus } from "~/utils/claim-review-status";

export const priorityReasonLabels = {
	source_notice: "Source notice",
	update_requested: "Update requested",
	due: "Review due",
	evidence_request: "Reader evidence request",
	dates_need_verification: "Check recorded dates"
} as const;
export type PriorityReason = keyof typeof priorityReasonLabels;
export interface PriorityRow {
	_id: string;
	title: string;
	slug: string;
	topic?: { _id: string; title: string; slug: string };
	status: string;
	nextReviewAt?: string | null;
	openNoticeCount: number;
	feedbackCount: number;
	reasons: PriorityReason[];
}
export interface QueuePagination {
	page: number;
	limit: number;
	total: number;
	hasMore: boolean;
}
export interface PriorityResponse {
	evaluatedAt: string;
	rows: PriorityRow[];
	pagination: QueuePagination;
}
export interface NoticeRow {
	_id: string;
	title: string;
	fingerprint: string;
	addressed: boolean;
	revision: number;
	snapshot: {
		citationStatus: string;
		retracted: boolean;
		expressionOfConcern: boolean;
		correctionOrErratum: boolean;
		url: string;
		statusSources: string[];
		integrityNotes: string;
	};
	history: Array<{
		date: string;
		decision: "addressed" | "open";
		note: string;
		adminId: string;
		adminName: string | null;
		snapshot: NoticeRow["snapshot"];
	}>;
}
export interface PriorityDetail {
	claim: Pick<PriorityRow, "_id" | "title" | "slug" | "topic" | "status" | "nextReviewAt"> & {
		reviewStatus: ClaimReviewStatus;
	};
	schedule: {
		revision: number;
		history: Array<{
			date: string;
			previousAt: string | null;
			nextAt: string | null;
			note: string;
			adminId: string;
			adminName: string | null;
		}>;
	};
	sources: NoticeRow[];
	pagination: QueuePagination;
	historyLimit: number;
}
