export const coverageStatusLabels = { planned: "Planned", researching: "Researching", published: "Published" } as const;
export const coverageVisibilityLabels = { draft: "Private draft", public: "Public", withdrawn: "Withdrawn" } as const;

export interface CoverageRequest {
	_id: string;
	title: string;
	summary: string;
	status: keyof typeof coverageStatusLabels;
	updatedAt: string | null;
	topic: { title: string; slug: string } | null;
	answer: { title: string; path: string } | null;
	answerUnavailable: boolean;
	history: Array<{ id?: string; date: string; status: keyof typeof coverageStatusLabels; summary: string }>;
}

export interface AdminCoverageRequest {
	_id: string;
	title: string;
	summary: string;
	status: keyof typeof coverageStatusLabels;
	visibility: keyof typeof coverageVisibilityLabels;
	revision: number;
	feedbackId?: string;
	topicId: string | null;
	claimId: string | null;
	audit: Array<{ date: string; operation: string; note: string; revision: number }>;
}

export interface CoverageResponse<Row = CoverageRequest> {
	rows: Row[];
	pagination: { page: number; limit: number; total: number; hasMore: boolean };
}
