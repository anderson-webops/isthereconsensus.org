import type { IClaim } from "../models/schemas/Claim.js";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import type { IExpertApplication } from "../models/schemas/ExpertApplication.js";
import type { IQuestion } from "../models/schemas/Question.js";
import type { ITopic } from "../models/schemas/Topic.js";
import type { ITopicSentimentVote } from "../models/schemas/TopicSentimentVote.js";
import { toPublicEvidenceLandscape } from "./evidenceLandscape.js";

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
	return value && typeof value === "object" ? (value as UnknownRecord) : null;
}

type ApplicantExpertApplicationInput = Partial<IExpertApplication> & {
	_id?: unknown;
	createdAt?: Date;
	updatedAt?: Date;
};

export function toApplicantExpertApplication(value: ApplicantExpertApplicationInput | null | undefined) {
	if (!value) return null;
	return {
		_id: value._id,
		name: value.name,
		affiliation: value.affiliation,
		credentialLabel: value.credentialLabel,
		expertiseAreas: value.expertiseAreas,
		evidenceLinks: value.evidenceLinks,
		statement: value.statement,
		conflictDisclosure: value.conflictDisclosure,
		fundingDisclosure: value.fundingDisclosure,
		attestsDisclosurePolicy: value.attestsDisclosurePolicy,
		attestsReviewStandards: value.attestsReviewStandards,
		status: value.status,
		reviewNotes: value.reviewNotes,
		reviewedAt: value.reviewedAt,
		createdAt: value.createdAt,
		updatedAt: value.updatedAt
	};
}

export function toPublicTopic(value: unknown) {
	const topic = asRecord(value);
	if (!topic) return null;
	return {
		_id: topic._id,
		title: topic.title,
		slug: topic.slug,
		description: topic.description,
		accent: topic.accent,
		order: topic.order
	};
}

export function toPublicQuestionClaim(value: unknown) {
	const claim = asRecord(value);
	if (!claim || claim.status !== "published") return null;
	return {
		_id: claim._id,
		title: claim.title,
		slug: claim.slug,
		consensusBand: claim.consensusBand,
		evidenceLandscape: toPublicEvidenceLandscape(claim as Partial<IClaim>)
	};
}

export function toEditorialQuestionClaim(value: unknown) {
	const claim = asRecord(value);
	if (!claim) return null;
	return {
		_id: claim._id,
		title: claim.title,
		slug: claim.slug,
		status: claim.status,
		consensusBand: claim.consensusBand
	};
}

export function toPublicQuestion(
	value: Partial<IQuestion>,
	options: {
		claim?: unknown;
	} = {}
) {
	return {
		_id: value._id,
		title: value.title,
		normalizedQuestion: value.normalizedQuestion,
		body: value.body,
		sourceUrl: value.sourceUrl,
		sourceContextType: value.sourceContextType,
		displayName: value.displayName || value.authorName || "Member",
		status: value.status,
		routingStatus: value.routingStatus,
		askKind: value.askKind,
		closestMatchType: value.closestMatchType,
		closestMatchLabel: value.closestMatchLabel,
		differenceNote: value.differenceNote,
		loadedFrame: value.loadedFrame,
		multiQuestion: value.multiQuestion,
		linkedAt: value.linkedAt,
		createdAt: value.createdAt,
		updatedAt: value.updatedAt,
		topic: toPublicTopic(value.topic),
		claim: toPublicQuestionClaim(options.claim === undefined ? value.claim : options.claim)
	};
}

export function toEditorialQuestion(value: Partial<IQuestion>) {
	return {
		...toPublicQuestion(value, { claim: null }),
		claim: toEditorialQuestionClaim(value.claim)
	};
}

export function toReporterQuestionFlag(value: unknown) {
	const flag = asRecord(value);
	if (!flag) return null;
	return {
		_id: flag._id,
		reason: flag.reason,
		note: flag.note,
		status: flag.status,
		reviewNote: flag.reviewNote,
		reviewedAt: flag.reviewedAt,
		createdAt: flag.createdAt,
		updatedAt: flag.updatedAt
	};
}

export function toEditorialClaimSource(value: unknown) {
	const source = asRecord(value);
	if (!source) return null;
	const evidenceProfile = asRecord(source.evidenceProfile);
	const reviewer = asRecord(evidenceProfile?.reviewer);
	const {
		claim: _claim,
		...sourceFields
	} = source;

	return {
		...sourceFields,
		...(evidenceProfile
			? {
					evidenceProfile: {
						...evidenceProfile,
						reviewer: {
							codedAt: reviewer?.codedAt,
							reviewedAt: reviewer?.reviewedAt,
							notes: reviewer?.notes
						}
					}
				}
			: {})
	};
}

export function toEditorialEvidenceLandscape(value: unknown) {
	const evidenceLandscape = asRecord(value);
	if (!evidenceLandscape) return null;
	const workflow = asRecord(evidenceLandscape.workflow);
	const sanitizedWorkflow = workflow
		? Object.fromEntries(
				Object.entries(workflow).filter(
					([key]) => !["assignedEditorId", "reviewedById", "approvedById", "assessedBy"].includes(key)
				)
			)
		: null;
	return {
		...evidenceLandscape,
		workflow: sanitizedWorkflow
	};
}

export function toEditorialClaim(value: unknown) {
	const claim = asRecord(value);
	if (!claim) return null;
	const {
		reviewedBy: _reviewedBy,
		sources,
		...claimFields
	} = claim;
	const evidenceLandscape = toEditorialEvidenceLandscape(claim.evidenceLandscape);

	return {
		...claimFields,
		...(evidenceLandscape
			? {
					evidenceLandscape
				}
			: {}),
		...(Array.isArray(sources)
			? { sources: sources.map(toEditorialClaimSource).filter(Boolean) }
			: {})
	};
}

export function toEditorialClaimRevision(value: unknown) {
	const revision = asRecord(value);
	if (!revision) return null;
	return {
		_id: revision._id,
		editorModel: revision.editorModel,
		summary: revision.summary,
		createdAt: revision.createdAt,
		updatedAt: revision.updatedAt
	};
}

export function toEditorialEvidenceReview(value: unknown) {
	const review = asRecord(value);
	if (!review) return null;
	return {
		_id: review._id,
		action: review.action,
		fromStatus: review.fromStatus,
		toStatus: review.toStatus,
		actorModel: review.actorModel,
		notes: review.notes,
		changedFields: review.changedFields,
		createdAt: review.createdAt,
		updatedAt: review.updatedAt
	};
}

type PublicTopicSentimentVoteInput = Partial<ITopicSentimentVote> & {
	_id?: unknown;
	createdAt?: Date;
	updatedAt?: Date;
};

export function toPublicTopicSentimentVote(value: PublicTopicSentimentVoteInput | null | undefined) {
	if (!value) return null;
	return {
		_id: value._id,
		stance: value.stance,
		confidence: value.confidence,
		note: value.note,
		createdAt: value.createdAt,
		updatedAt: value.updatedAt
	};
}

type PublicClaimSourceInput = IClaimSource & {
	_id?: unknown;
	createdAt?: Date;
	updatedAt?: Date;
};

export function toPublicClaimSource(value: PublicClaimSourceInput) {
	return {
		_id: value._id,
		kind: value.kind,
		title: value.title,
		publisher: value.publisher,
		year: value.year,
		url: value.url,
		doi: value.doi,
		pmid: value.pmid,
		pmcid: value.pmcid,
		isAnchor: value.isAnchor,
		appraisal: value.appraisal,
		citationStatus: value.citationStatus,
		citationCheckedAt: value.citationCheckedAt,
		statusSources: value.statusSources,
		stance: value.stance,
		note: value.note,
		order: value.order,
		createdAt: value.createdAt,
		updatedAt: value.updatedAt
	};
}

export function toPublicClaim(
	value: Partial<IClaim>,
	options: {
		sourceCount?: number;
		sources?: PublicClaimSourceInput[];
		topic?: ITopic | UnknownRecord | null;
	} = {}
) {
	return {
		_id: value._id,
		topic: toPublicTopic(options.topic ?? value.topic),
		title: value.title,
		slug: value.slug,
		status: value.status,
		consensusBand: value.consensusBand,
		agreementLevel: value.agreementLevel,
		evidenceCertainty: value.evidenceCertainty,
		confidenceScore: value.confidenceScore,
		reviewMode: value.reviewMode,
		bottomLine: value.bottomLine,
		stableCore: value.stableCore,
		openQuestions: value.openQuestions,
		whatWouldChangeMinds: value.whatWouldChangeMinds,
		misconceptions: value.misconceptions,
		misconceptionTags: value.misconceptionTags,
		editorSummary: value.editorSummary,
		uncertaintySummary: value.uncertaintySummary,
		uncertaintyDrivers: value.uncertaintyDrivers,
		searchDatabases: value.searchDatabases,
		searchCutoffAt: value.searchCutoffAt,
		inclusionRules: value.inclusionRules,
		exclusionRules: value.exclusionRules,
		appraisalTools: value.appraisalTools,
		evidenceSummaries: value.evidenceSummaries,
		evidenceLandscape: toPublicEvidenceLandscape(value),
		institutionalAnchors: value.institutionalAnchors,
		authorLine: value.authorLine,
		reviewerLine: value.reviewerLine,
		coiSummary: value.coiSummary,
		independenceSummary: value.independenceSummary,
		lastRetractionCheckAt: value.lastRetractionCheckAt,
		changeLog: value.changeLog,
		lastReviewedAt: value.lastReviewedAt,
		nextReviewAt: value.nextReviewAt,
		publishedAt: value.publishedAt,
		createdAt: value.createdAt,
		updatedAt: value.updatedAt,
		sourceCount: options.sourceCount,
		sources: options.sources?.map(toPublicClaimSource)
	};
}
