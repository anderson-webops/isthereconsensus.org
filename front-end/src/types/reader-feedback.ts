export const feedbackKindLabels = {
	usefulness: "Explanation usefulness",
	missing_evidence: "Missing evidence",
	content_gap: "Content gap"
} as const;
export const feedbackStatusLabels = {
	new: "New",
	reviewing: "Reviewing",
	planned: "Planned",
	resolved: "Resolved",
	dismissed: "Dismissed"
} as const;
export const feedbackPriorityLabels = ["Low", "Normal", "High"] as const;
export interface FeedbackRow {
	_id: string;
	kind: keyof typeof feedbackKindLabels;
	status: keyof typeof feedbackStatusLabels;
	priority: number;
	revision: number;
	claimId?: string;
	comparisonSlug?: string;
	topicId?: string;
	helpful?: boolean;
	area?: string;
	title?: string;
	referenceTitle?: string;
	message?: string;
	sourceUrl?: string;
	createdAt: string;
	linkedClaimId?: string | null;
	linkedTopicId?: string | null;
	linkedTopic?: { _id: string; title: string; slug: string };
	reviews: Array<{ status: keyof typeof feedbackStatusLabels; priority: number; note: string; date: string }>;
}
export interface FeedbackResponse {
	rows: FeedbackRow[];
	pagination: { page: number; limit: number; total: number; hasMore: boolean };
}
