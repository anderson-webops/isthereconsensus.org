export type ContributorTier = "member" | "contributor" | "trusted" | "expert";
export type ExpertiseStatus = "none" | "pending" | "verified" | "rejected";

export interface ExpertApplication {
	_id: string;
	name: string;
	affiliation?: string;
	credentialLabel: string;
	expertiseAreas: string[];
	evidenceLinks: string[];
	statement: string;
	status: "pending" | "approved" | "rejected" | "needs-info";
	reviewNotes?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface TopicSentimentVote {
	_id: string;
	stance: "aligns" | "uncertain" | "skeptical";
	confidence: number;
	note?: string;
}

export interface TopicSentimentResponse {
	totalVotes: number;
	totals: Record<"aligns" | "uncertain" | "skeptical", number>;
	percentages: Record<"aligns" | "uncertain" | "skeptical", number>;
	currentVote: TopicSentimentVote | null;
}

export interface EvidenceResult {
	id: string;
	title: string;
	year?: number;
	journal?: string;
	url?: string;
	doi?: string;
	citedByCount?: number;
	type?: string;
	authors: string[];
}

export interface EvidenceSearchResponse {
	query: string;
	provider: string;
	configured: boolean;
	results: EvidenceResult[];
}

export interface QuestionFlag {
	_id: string;
	reason: "off-topic" | "duplicate" | "misleading" | "low-quality" | "needs-sources" | "abusive";
	note?: string;
	status: "open" | "reviewed" | "dismissed";
	reporterName?: string;
	question?: {
		_id: string;
		title: string;
		topic?: {
			title: string;
			slug: string;
		};
	};
	createdAt?: string;
}
