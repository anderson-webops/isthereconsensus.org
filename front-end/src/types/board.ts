export type ClaimStatus = "draft" | "published" | "needs_update" | "archived";
export type ClaimConsensusBand = "strong" | "broad" | "mixed" | "unclear";
export type QuestionRoutingStatus = "unassigned" | "linked" | "duplicate";

export interface ClaimSource {
	_id?: string;
	kind: "systematic_review" | "meta_analysis" | "guideline" | "consensus_statement" | "landmark_study" | "context";
	title: string;
	publisher?: string;
	year?: number;
	url?: string;
	doi?: string;
	stance: "supports" | "context" | "debate";
	note?: string;
	order?: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface Topic {
	_id: string;
	title: string;
	slug: string;
	description?: string;
	order?: number;
	accent?: string;
	questionCount?: number;
	claimCount?: number;
	featuredClaims?: ClaimSummary[];
	createdAt?: string;
	updatedAt?: string;
}

export interface ClaimSummary {
	_id: string;
	title: string;
	slug: string;
	status?: ClaimStatus;
	consensusBand: ClaimConsensusBand;
	confidenceScore: number;
	bottomLine: string;
	sourceCount?: number;
	lastReviewedAt?: string;
	nextReviewAt?: string;
	publishedAt?: string;
	topic?: Topic | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface Claim extends ClaimSummary {
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	misconceptions: string[];
	editorSummary?: string;
	reviewedBy?: string;
	sources?: ClaimSource[];
}

export interface ClaimRevision {
	_id: string;
	claim: string;
	editor: string;
	editorModel: "User" | "Admin";
	summary: string;
	snapshot: Record<string, unknown>;
	createdAt?: string;
	updatedAt?: string;
}

export interface QuestionClaimRef {
	_id: string;
	title: string;
	slug: string;
	consensusBand?: ClaimConsensusBand;
}

export interface Question {
	_id: string;
	title: string;
	body?: string;
	sourceUrl?: string;
	displayName?: string;
	author?: string;
	authorName?: string;
	authorModel?: "User" | "Admin";
	status?: "open" | "flagged" | "archived";
	routingStatus?: QuestionRoutingStatus;
	linkedAt?: string;
	createdAt?: string;
	updatedAt?: string;
	topic: Topic;
	claim?: QuestionClaimRef | null;
}

export interface TopicResponse {
	topics: Topic[];
}

export interface SingleTopicResponse {
	topic: Topic;
}

export interface ClaimsResponse {
	claims: ClaimSummary[];
}

export interface ClaimResponse {
	claim: Claim;
}

export interface ClaimRevisionsResponse {
	revisions: ClaimRevision[];
}

export interface QuestionResponse {
	question: Question;
}

export interface QuestionsResponse {
	questions: Question[];
}

export interface SuggestionResponse {
	claims: ClaimSummary[];
	topics: Topic[];
	questions: Question[];
}
