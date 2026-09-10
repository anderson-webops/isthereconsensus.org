export type ContributorTier = "member" | "contributor" | "trusted" | "expert";
export type ExpertiseStatus = "none" | "pending" | "verified" | "rejected";
export type AccountActivityAction =
	| "user.registered"
	| "user.deleted"
	| "admin.created"
	| "admin.disabled"
	| "admin.enabled"
	| "admin.deleted"
	| "login.success"
	| "login.failed"
	| "logout"
	| "password.changed"
	| "email.changed"
	| "expert_application.created"
	| "expert_application.reviewed"
	| "question.deleted"
	| "question.moderated"
	| "question_flag.reviewed";

export type AccountActivityActorType = "user" | "admin" | "system" | "anonymous";
export type AccountActivityTargetType = "user" | "admin" | "expert_application" | "question" | "unknown";

export interface AccountActivityLog {
	_id: string;
	action: AccountActivityAction;
	actorType: AccountActivityActorType;
	actorId?: string;
	targetType: AccountActivityTargetType;
	targetId?: string;
	targetEmailHash?: string;
	targetEmailDomain?: string;
	sourceIp?: string;
	requestId?: string;
	userAgent?: string;
	metadata?: Record<string, string>;
	createdAt?: string;
}

export interface AccountActivityResponse {
	logs: AccountActivityLog[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		hasMore: boolean;
	};
}

export type SourceIntegrityOutcome =
	"no_registered_update" | "corrected" | "expression_of_concern" | "retracted" | "unsupported" | "error";

export interface SourceIntegritySignal {
	type: string;
	label?: string;
	noticeDoi?: string;
	url?: string;
	source?: string;
	updatedAt?: string;
}

export interface SourceIntegrityCheck {
	_id: string;
	provider: "crossref";
	doi?: string;
	checkedAt?: string;
	previousStatus: "current" | "corrected" | "retracted" | "expression_of_concern";
	observedStatus?: "current" | "corrected" | "retracted" | "expression_of_concern";
	outcome: SourceIntegrityOutcome;
	signals: SourceIntegritySignal[];
	statusSources: string[];
	applied: boolean;
	diagnosticCode?: string;
	source?: {
		_id: string;
		title: string;
		doi?: string;
		citationStatus?: "current" | "corrected" | "retracted" | "expression_of_concern";
	} | null;
	claim?: {
		_id: string;
		title: string;
		slug: string;
		status: string;
		topic?: {
			title: string;
			slug: string;
		} | null;
	} | null;
}

export interface SourceIntegrityResponse {
	summary: {
		monitoredSourceCount: number;
		uncheckedSourceCount: number;
		staleSourceCount: number;
		flaggedSourceCount: number;
		recentSignalCount: number;
		recentErrorCount: number;
		staleDays: number;
		latestCheckAt?: string;
	};
	checks: SourceIntegrityCheck[];
	pagination: {
		page: number;
		limit: number;
		total: number;
		hasMore: boolean;
	};
}

export interface ExpertApplication {
	_id: string;
	name: string;
	affiliation?: string;
	credentialLabel: string;
	expertiseAreas: string[];
	evidenceLinks: string[];
	statement: string;
	conflictDisclosure?: string;
	fundingDisclosure?: string;
	attestsDisclosurePolicy?: boolean;
	attestsReviewStandards?: boolean;
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
	reviewNote?: string;
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
