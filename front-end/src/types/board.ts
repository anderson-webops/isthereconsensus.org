import type {
	EvidenceBoundaryDimension,
	EvidenceClaimType,
	EvidenceConsistencyLevel,
	EvidenceDirectnessLevel,
	EvidenceLandscapeCertaintyLevel,
	EvidenceLandscapeDirection,
	EvidenceLandscapeExpertAgreement,
	EvidenceLandscapeSupportLabel,
	EvidenceLandscapeWorkflowStatus,
	EvidencePrecisionLevel,
	EvidenceRiskOfBiasLevel,
	EvidenceSourceExclusionReason,
	EvidenceSourcePositionBucket,
	EvidenceStudyDesign,
	EvidenceTier
} from "~/constants/evidenceLandscape";

export type ClaimStatus = "draft" | "published" | "needs_update" | "archived";
export type ClaimConsensusBand = "strong" | "broad" | "mixed" | "unclear";
export type ClaimAgreementLevel = "strong" | "broad_qualified" | "divided" | "frontier";
export type ClaimEvidenceCertainty = "high" | "moderate" | "low" | "very_low";
export type ClaimReviewMode = "standard" | "living";
export type ClaimLandscapeSupportLabel = EvidenceLandscapeSupportLabel;
export type ClaimLandscapeEvidenceCertainty = EvidenceLandscapeCertaintyLevel;
export type ClaimLandscapeExpertAgreement = EvidenceLandscapeExpertAgreement;
export type ClaimLandscapeWorkflowStatus = EvidenceLandscapeWorkflowStatus;
export type QuestionRoutingStatus = "unassigned" | "linked" | "duplicate";
export type ClaimEvidenceDirection = "supports" | "mixed" | "unclear";
export type ClaimUncertaintyType =
	| "bias"
	| "indirectness"
	| "imprecision"
	| "inconsistency"
	| "generalizability"
	| "mechanism"
	| "timing"
	| "implementation"
	| "other";
export type ClaimSourceAppraisal = "high" | "moderate" | "low" | "not_appraised";
export type ClaimSourceCitationStatus = "current" | "corrected" | "retracted" | "expression_of_concern";
export type QuestionAskKind = "claim" | "topic" | "concept" | "discussion";
export type QuestionClosestMatchType = "claim" | "topic" | "explainer" | "question" | "none";
export type QuestionSourceContextType =
	| "article"
	| "social"
	| "video"
	| "podcast"
	| "conversation"
	| "classroom"
	| "other";

export interface ClaimChangeLogEntry {
	date: string;
	kind: "publication" | "update" | "correction" | "review";
	summary: string;
}

export interface ClaimSource {
	_id?: string;
	kind: "systematic_review" | "meta_analysis" | "guideline" | "consensus_statement" | "landmark_study" | "context";
	title: string;
	publisher?: string;
	year?: number;
	url?: string;
	doi?: string;
	pmid?: string;
	pmcid?: string;
	isAnchor?: boolean;
	appraisal?: ClaimSourceAppraisal;
	citationStatus?: ClaimSourceCitationStatus;
	citationCheckedAt?: string;
	statusSources?: string[];
	stance: "supports" | "context" | "debate";
	note?: string;
	order?: number;
	evidenceProfile?: ClaimSourceEvidenceProfile;
	createdAt?: string;
	updatedAt?: string;
}

export interface ClaimSourceEffectEstimate {
	metric?: string;
	value?: string;
	confidenceInterval?: string;
	pValue?: string;
	notes?: string;
}

export interface ClaimSourceEvidenceProfile {
	schemaVersion: number;
	positionRelativeToClaim: EvidenceSourcePositionBucket;
	evidenceTier: EvidenceTier;
	studyDesign: EvidenceStudyDesign;
	riskOfBias: EvidenceRiskOfBiasLevel;
	directness: EvidenceDirectnessLevel;
	consistency: EvidenceConsistencyLevel;
	precision: EvidencePrecisionLevel;
	publicationIntegrity: {
		retracted: boolean;
		expressionOfConcern: boolean;
		correctionOrErratum: boolean;
		predatoryOrQuestionableVenue: boolean;
		citationStatusCheckedAt?: string;
		integrityNotes?: string;
	};
	inclusion: {
		includedInLandscape: boolean;
		exclusionReason: EvidenceSourceExclusionReason;
		exclusionNotes?: string;
	};
	extraction: {
		keyFinding?: string;
		limitations?: string;
		population?: string;
		exposureOrIntervention?: string;
		comparator?: string;
		outcomes: string[];
		sampleSize?: string;
		effectEstimate: ClaimSourceEffectEstimate;
	};
	reviewer?: {
		codedById?: string;
		codedAt?: string;
		reviewedById?: string;
		reviewedAt?: string;
		notes?: string;
	};
}

export interface ClaimEvidenceSummary {
	question: string;
	population?: string;
	finding: string;
	effectDirection: ClaimEvidenceDirection;
	magnitude?: string;
	certainty?: ClaimEvidenceCertainty;
	limitations: string[];
}

export interface ClaimInstitutionalAnchor {
	name: string;
	role: string;
}

export interface ClaimUncertaintyDriver {
	type: ClaimUncertaintyType;
	detail: string;
}

export interface ClaimSurveillanceSpec {
	focus?: string;
	cadenceDays?: number;
	watchTerms: string[];
	integrityMonitors: string[];
	guidelineMonitors: string[];
	triggerRules: string[];
}

export interface ClaimEvidenceLandscape {
	schemaVersion: number;
	claimType?: EvidenceClaimType;
	supportLabel: ClaimLandscapeSupportLabel;
	supportScore?: number | null;
	evidenceDirection?: EvidenceLandscapeDirection;
	evidenceCertainty: ClaimLandscapeEvidenceCertainty;
	expertAgreement: ClaimLandscapeExpertAgreement;
	plainLanguageAnswer?: string;
	oneSentenceSummary?: string;
	confidenceStatement?: string;
	caveatSummary?: string;
	disagreementSummary?: string;
	credibleMinorityViewSummary?: string;
	fringeOrUnsupportedViewSummary?: string;
	whatWouldChangeThis?: string;
	boundaryConditions?: ClaimEvidenceBoundaryCondition[];
	applicability?: ClaimEvidenceApplicability;
	distribution?: ClaimEvidenceLandscapeDistribution;
	evidenceBaseSize?: ClaimEvidenceBaseSize;
	publicFlags?: {
		showEvidenceLandscape?: boolean;
		showCredibleMinorityView?: boolean;
		showFalseBalanceWarning?: boolean;
		medicalOrPublicHealthSensitive?: boolean;
		requiresProfessionalContext?: boolean;
	};
	lastAssessedAt?: string;
	nextReviewDueAt?: string;
	workflow?: {
		status?: ClaimLandscapeWorkflowStatus;
		lastAssessedAt?: string;
		nextReviewDueAt?: string;
		assessedBy?: string;
		assignedEditorId?: string;
		reviewedById?: string;
		approvedById?: string;
		publishedAt?: string;
		supersededByClaimId?: string;
		editorialNotes?: string;
	};
}

export interface ClaimEvidenceBoundaryCondition {
	dimension: EvidenceBoundaryDimension;
	label: string;
	explanation: string;
	sourceIds?: string[];
}

export interface ClaimEvidenceApplicability {
	population?: string;
	exposureOrIntervention?: string;
	comparator?: string;
	outcomes: string[];
	setting?: string;
	timeframe?: string;
}

export interface ClaimEvidenceDistributionBucket {
	count: number;
	weightedCount?: number;
}

export interface ClaimEvidenceLandscapeDistribution {
	supportsClaim: ClaimEvidenceDistributionBucket;
	supportsWithCaveats: ClaimEvidenceDistributionBucket;
	opposesClaim: ClaimEvidenceDistributionBucket;
	inconclusiveOrMixed: ClaimEvidenceDistributionBucket;
	backgroundContext: ClaimEvidenceDistributionBucket;
	excludedLowQuality: ClaimEvidenceDistributionBucket;
	excludedRetracted: ClaimEvidenceDistributionBucket;
	excludedFringe: ClaimEvidenceDistributionBucket;
}

export interface ClaimEvidenceBaseSize {
	totalSources: number;
	includedSources: number;
	excludedSources: number;
	systematicReviews: number;
	metaAnalyses: number;
	evidenceBasedGuidelines: number;
	randomizedTrials: number;
	observationalStudies: number;
	mechanisticOrPreclinical: number;
	expertCommentary: number;
	retractedOrInvalid: number;
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
	agreementLevel?: ClaimAgreementLevel;
	evidenceCertainty?: ClaimEvidenceCertainty;
	confidenceScore: number;
	reviewMode?: ClaimReviewMode;
	bottomLine: string;
	sourceCount?: number;
	flaggedSourceCount?: number;
	retractedSourceCount?: number;
	correctedSourceCount?: number;
	concernSourceCount?: number;
	searchCutoffAt?: string;
	surveillanceSpec?: ClaimSurveillanceSpec;
	evidenceLandscape?: ClaimEvidenceLandscape;
	lastReviewedAt?: string;
	nextReviewAt?: string;
	publishedAt?: string;
	lastRetractionCheckAt?: string;
	topic?: Topic | null;
	createdAt?: string;
	updatedAt?: string;
}

export interface Claim extends ClaimSummary {
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	misconceptions: string[];
	misconceptionTags?: string[];
	editorSummary?: string;
	uncertaintySummary?: string;
	uncertaintyDrivers?: ClaimUncertaintyDriver[];
	searchDatabases?: string[];
	inclusionRules?: string[];
	exclusionRules?: string[];
	appraisalTools?: string[];
	evidenceSummaries?: ClaimEvidenceSummary[];
	institutionalAnchors?: ClaimInstitutionalAnchor[];
	authorLine?: string;
	reviewerLine?: string;
	coiSummary?: string;
	independenceSummary?: string;
	changeLog?: ClaimChangeLogEntry[];
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
	normalizedQuestion?: string;
	body?: string;
	sourceUrl?: string;
	sourceContextType?: QuestionSourceContextType;
	displayName?: string;
	author?: string;
	authorName?: string;
	authorModel?: "User" | "Admin";
	status?: "open" | "flagged" | "archived";
	routingStatus?: QuestionRoutingStatus;
	askKind?: QuestionAskKind;
	closestMatchType?: QuestionClosestMatchType;
	closestMatchLabel?: string;
	differenceNote?: string;
	loadedFrame?: boolean;
	multiQuestion?: boolean;
	linkedAt?: string;
	createdAt?: string;
	updatedAt?: string;
	topic: Topic;
	claim?: QuestionClaimRef | null;
}

export interface SearchClaimMatch extends ClaimSummary {
	matchReason?: string;
	matchScore?: number;
}

export interface SearchTopicMatch extends Topic {
	matchReason?: string;
	matchScore?: number;
}

export interface SearchQuestionMatch extends Question {
	matchReason?: string;
	matchScore?: number;
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
	claims: SearchClaimMatch[];
	topics: SearchTopicMatch[];
	questions: SearchQuestionMatch[];
}
