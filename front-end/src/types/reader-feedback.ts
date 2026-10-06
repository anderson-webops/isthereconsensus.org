export const feedbackKindLabels = {
	usefulness: "Explanation usefulness",
	reader_experience: "Answer and explanation feedback",
	missing_evidence: "Missing evidence",
	content_gap: "Content gap"
} as const;
export const explanationClarityLabels = {
	clear: "Easy to follow",
	partly_clear: "Some parts were unclear",
	unclear: "Hard to follow"
} as const;
export const answerCoverageLabels = {
	answered: "Answered my question",
	partly_answered: "Answered part of my question",
	not_answered: "Did not answer my question",
	just_browsing: "I was just browsing"
} as const;
export type ReaderRating =
	| { kind: "usefulness"; helpful: boolean }
	| {
			kind: "reader_experience";
			clarity: keyof typeof explanationClarityLabels;
			answerCoverage: keyof typeof answerCoverageLabels;
	  };
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
	clarity?: keyof typeof explanationClarityLabels;
	answerCoverage?: keyof typeof answerCoverageLabels;
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
