<script setup lang="ts">
import type {
	EvidenceClaimType,
	EvidenceLandscapeCertaintyLevel,
	EvidenceLandscapeDirection,
	EvidenceLandscapeExpertAgreement,
	EvidenceLandscapeSupportLabel,
	EvidenceLandscapeWorkflowStatus
} from "~/constants/evidenceLandscape";
import type {
	Claim,
	ClaimEvidenceSummary,
	ClaimInstitutionalAnchor,
	ClaimResponse,
	ClaimRevision,
	ClaimRevisionsResponse,
	ClaimSource,
	ClaimSourceEvidenceProfile,
	ClaimUncertaintyDriver,
	Topic,
	TopicResponse
} from "~/types/board";
import AuthPanel from "~/components/AuthPanel.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import {
	EVIDENCE_CLAIM_TYPES,
	EVIDENCE_CONSISTENCY_LEVELS,
	EVIDENCE_DIRECTNESS_LEVELS,
	EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS,
	EVIDENCE_LANDSCAPE_DIRECTIONS,
	EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS,
	EVIDENCE_LANDSCAPE_SUPPORT_LABELS,
	EVIDENCE_PRECISION_LEVELS,
	EVIDENCE_RISK_OF_BIAS_LEVELS,
	EVIDENCE_SOURCE_EXCLUSION_REASONS,
	EVIDENCE_SOURCE_POSITION_BUCKETS,
	EVIDENCE_STUDY_DESIGNS,
	EVIDENCE_TIERS,
	formatClaimTypeLabel,
	formatEvidenceConsistencyLabel,
	formatEvidenceDirectnessLabel,
	formatEvidencePrecisionLabel,
	formatEvidenceRiskOfBiasLabel,
	formatEvidenceSourceExclusionReasonLabel,
	formatEvidenceSourcePositionLabel,
	formatEvidenceStudyDesignLabel,
	formatEvidenceTierLabel,
	formatLandscapeCertaintyLabel,
	formatLandscapeDirectionLabel,
	formatLandscapeExpertAgreementLabel,
	formatLandscapeSupportLabel,
	formatLandscapeWorkflowStatus
} from "~/constants/evidenceLandscape";
import { getSourceStandard } from "~/data/sourceStandards";

interface EditorialClaimRouteParams {
	id?: string | string[];
}

const route = useRoute();
const router = useRouter();
const { apiUrl } = useApi();
const { currentAccount, isLoggedIn, ready, role } = useAuth();

const routeId = computed(() => {
	const value = (route.params as EditorialClaimRouteParams).id;
	return Array.isArray(value) ? value[0] : String(value ?? "new");
});
const isNew = computed(() => routeId.value === "new");
const canUseEditorial = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");

const loading = ref(false);
const saving = ref(false);
const actionMessage = ref("");
const errorMessage = ref("");
const claim = ref<Claim | null>(null);
const revisions = ref<ClaimRevision[]>([]);
const topics = ref<Topic[]>([]);
const sourceRows = ref<ClaimSource[]>([]);
const evidenceSummaryRows = ref<ClaimEvidenceSummary[]>([]);
const institutionalAnchorRows = ref<ClaimInstitutionalAnchor[]>([]);
const uncertaintyDriverRows = ref<ClaimUncertaintyDriver[]>([]);

const form = reactive({
	topic: "",
	title: "",
	slug: "",
	status: "draft" as Claim["status"],
	consensusBand: "unclear" as Claim["consensusBand"],
	agreementLevel: "frontier" as NonNullable<Claim["agreementLevel"]>,
	evidenceCertainty: "low" as NonNullable<Claim["evidenceCertainty"]>,
	confidenceScore: 50,
	reviewMode: "standard" as NonNullable<Claim["reviewMode"]>,
	bottomLine: "",
	stableCore: "",
	openQuestions: "",
	whatWouldChangeMinds: "",
	misconceptions: "",
	misconceptionTags: "",
	editorSummary: "",
	uncertaintySummary: "",
	landscapeClaimType: "other" as EvidenceClaimType,
	landscapeSupportLabel: "unresolved" as EvidenceLandscapeSupportLabel,
	landscapeSupportScore: null as number | null | "",
	landscapeEvidenceDirection: "not_applicable" as EvidenceLandscapeDirection,
	landscapeEvidenceCertainty: "not_assessable" as EvidenceLandscapeCertaintyLevel,
	landscapeExpertAgreement: "not_assessable" as EvidenceLandscapeExpertAgreement,
	landscapePlainLanguageAnswer: "",
	landscapeOneSentenceSummary: "",
	landscapeConfidenceStatement: "",
	landscapeCaveatSummary: "",
	landscapeDisagreementSummary: "",
	landscapeCredibleMinorityViewSummary: "",
	landscapeFringeOrUnsupportedViewSummary: "",
	landscapeWhatWouldChangeThis: "",
	landscapeShowEvidenceLandscape: false,
	landscapeShowCredibleMinorityView: false,
	landscapeShowFalseBalanceWarning: false,
	landscapeMedicalOrPublicHealthSensitive: false,
	landscapeRequiresProfessionalContext: false,
	landscapeWorkflowStatus: "not_started" as EvidenceLandscapeWorkflowStatus,
	landscapeLastAssessedAt: "",
	landscapeNextReviewDueAt: "",
	landscapeEditorialNotes: "",
	landscapeApplicabilityPopulation: "",
	landscapeApplicabilityExposureOrIntervention: "",
	landscapeApplicabilityComparator: "",
	landscapeApplicabilityOutcomes: "",
	landscapeApplicabilitySetting: "",
	landscapeApplicabilityTimeframe: "",
	searchDatabases: "",
	searchCutoffAt: "",
	inclusionRules: "",
	exclusionRules: "",
	surveillanceFocus: "",
	surveillanceCadenceDays: 90,
	watchTerms: "",
	integrityMonitors: "",
	guidelineMonitors: "",
	triggerRules: "",
	appraisalTools: "",
	authorLine: "",
	reviewerLine: "",
	coiSummary: "",
	independenceSummary: "",
	lastRetractionCheckAt: "",
	lastReviewedAt: "",
	nextReviewAt: "",
	revisionNote: ""
});

const selectedSourceStandard = computed(() => getSourceStandard(form.topic));
const hasClaimLayerA = computed(
	() =>
		institutionalAnchorRows.value.length > 0 ||
		sourceRows.value.some((source) => ["guideline", "consensus_statement"].includes(source.kind))
);
const hasClaimLayerB = computed(() =>
	sourceRows.value.some((source) => ["systematic_review", "meta_analysis"].includes(source.kind))
);
const landscapeEvidenceBaseSize = computed(() => claim.value?.evidenceLandscape?.evidenceBaseSize);
const landscapeDistribution = computed(() => claim.value?.evidenceLandscape?.distribution);

useHead({
	title: "Claim editor - Is There Consensus?"
});

function parseLines(value: string) {
	return value
		.split("\n")
		.map((item) => item.trim())
		.filter(Boolean);
}

function formatLines(value?: string[]) {
	return (value || []).join("\n");
}

function formatDateInput(value?: string) {
	if (!value) return "";
	return new Date(value).toISOString().slice(0, 10);
}

function defaultSourceEvidenceProfile(existing?: Partial<ClaimSourceEvidenceProfile>): ClaimSourceEvidenceProfile {
	return {
		schemaVersion: existing?.schemaVersion ?? 1,
		positionRelativeToClaim: existing?.positionRelativeToClaim ?? "not_coded",
		evidenceTier: existing?.evidenceTier ?? "not_coded",
		studyDesign: existing?.studyDesign ?? "not_coded",
		riskOfBias: existing?.riskOfBias ?? "not_assessed",
		directness: existing?.directness ?? "not_assessed",
		consistency: existing?.consistency ?? "not_assessed",
		precision: existing?.precision ?? "not_assessed",
		publicationIntegrity: {
			retracted: existing?.publicationIntegrity?.retracted ?? false,
			expressionOfConcern: existing?.publicationIntegrity?.expressionOfConcern ?? false,
			correctionOrErratum: existing?.publicationIntegrity?.correctionOrErratum ?? false,
			predatoryOrQuestionableVenue: existing?.publicationIntegrity?.predatoryOrQuestionableVenue ?? false,
			citationStatusCheckedAt: formatDateInput(existing?.publicationIntegrity?.citationStatusCheckedAt),
			integrityNotes: existing?.publicationIntegrity?.integrityNotes ?? ""
		},
		inclusion: {
			includedInLandscape: existing?.inclusion?.includedInLandscape ?? false,
			exclusionReason: existing?.inclusion?.exclusionReason ?? "",
			exclusionNotes: existing?.inclusion?.exclusionNotes ?? ""
		},
		extraction: {
			keyFinding: existing?.extraction?.keyFinding ?? "",
			limitations: existing?.extraction?.limitations ?? "",
			population: existing?.extraction?.population ?? "",
			exposureOrIntervention: existing?.extraction?.exposureOrIntervention ?? "",
			comparator: existing?.extraction?.comparator ?? "",
			outcomes: [...(existing?.extraction?.outcomes ?? [])],
			sampleSize: existing?.extraction?.sampleSize ?? "",
			effectEstimate: {
				metric: existing?.extraction?.effectEstimate?.metric ?? "",
				value: existing?.extraction?.effectEstimate?.value ?? "",
				confidenceInterval: existing?.extraction?.effectEstimate?.confidenceInterval ?? "",
				pValue: existing?.extraction?.effectEstimate?.pValue ?? "",
				notes: existing?.extraction?.effectEstimate?.notes ?? ""
			}
		},
		reviewer: {
			codedById: existing?.reviewer?.codedById,
			codedAt: existing?.reviewer?.codedAt,
			reviewedById: existing?.reviewer?.reviewedById,
			reviewedAt: existing?.reviewer?.reviewedAt,
			notes: existing?.reviewer?.notes ?? ""
		}
	};
}

function sourceEvidenceProfilePayload(source: ClaimSource) {
	const profile = defaultSourceEvidenceProfile(source.evidenceProfile);
	return {
		positionRelativeToClaim: profile.positionRelativeToClaim,
		evidenceTier: profile.evidenceTier,
		studyDesign: profile.studyDesign,
		riskOfBias: profile.riskOfBias,
		directness: profile.directness,
		consistency: profile.consistency,
		precision: profile.precision,
		publicationIntegrity: {
			retracted: profile.publicationIntegrity.retracted,
			expressionOfConcern: profile.publicationIntegrity.expressionOfConcern,
			correctionOrErratum: profile.publicationIntegrity.correctionOrErratum,
			predatoryOrQuestionableVenue: profile.publicationIntegrity.predatoryOrQuestionableVenue,
			citationStatusCheckedAt: profile.publicationIntegrity.citationStatusCheckedAt || undefined,
			integrityNotes: profile.publicationIntegrity.integrityNotes?.trim() || ""
		},
		inclusion: {
			includedInLandscape: profile.inclusion.includedInLandscape,
			exclusionReason: profile.inclusion.exclusionReason,
			exclusionNotes: profile.inclusion.exclusionNotes?.trim() || ""
		},
		extraction: {
			keyFinding: profile.extraction.keyFinding?.trim() || "",
			limitations: profile.extraction.limitations?.trim() || "",
			population: profile.extraction.population?.trim() || "",
			exposureOrIntervention: profile.extraction.exposureOrIntervention?.trim() || "",
			comparator: profile.extraction.comparator?.trim() || "",
			outcomes: profile.extraction.outcomes.map((item) => item.trim()).filter(Boolean),
			sampleSize: profile.extraction.sampleSize?.trim() || "",
			effectEstimate: {
				metric: profile.extraction.effectEstimate.metric?.trim() || "",
				value: profile.extraction.effectEstimate.value?.trim() || "",
				confidenceInterval: profile.extraction.effectEstimate.confidenceInterval?.trim() || "",
				pValue: profile.extraction.effectEstimate.pValue?.trim() || "",
				notes: profile.extraction.effectEstimate.notes?.trim() || ""
			}
		},
		reviewer: {
			notes: profile.reviewer?.notes?.trim() || ""
		}
	};
}

function sourceEvidenceProfileChanged(source: ClaimSource) {
	const fallbackSource = {
		evidenceProfile: defaultSourceEvidenceProfile()
	} as ClaimSource;
	const originalSource = source._id
		? (claim.value?.sources?.find((record) => record._id === source._id) ?? fallbackSource)
		: fallbackSource;
	return (
		JSON.stringify(sourceEvidenceProfilePayload(source)) !==
		JSON.stringify(sourceEvidenceProfilePayload(originalSource))
	);
}

function landscapePayload() {
	const supportScore = typeof form.landscapeSupportScore === "number" ? form.landscapeSupportScore : null;
	return {
		claimType: form.landscapeClaimType,
		supportLabel: form.landscapeSupportLabel,
		supportScore,
		evidenceDirection: form.landscapeEvidenceDirection,
		evidenceCertainty: form.landscapeEvidenceCertainty,
		expertAgreement: form.landscapeExpertAgreement,
		plainLanguageAnswer: form.landscapePlainLanguageAnswer.trim(),
		oneSentenceSummary: form.landscapeOneSentenceSummary.trim(),
		confidenceStatement: form.landscapeConfidenceStatement.trim(),
		caveatSummary: form.landscapeCaveatSummary.trim(),
		disagreementSummary: form.landscapeDisagreementSummary.trim(),
		credibleMinorityViewSummary: form.landscapeCredibleMinorityViewSummary.trim(),
		fringeOrUnsupportedViewSummary: form.landscapeFringeOrUnsupportedViewSummary.trim(),
		whatWouldChangeThis: form.landscapeWhatWouldChangeThis.trim(),
		applicability: {
			population: form.landscapeApplicabilityPopulation.trim(),
			exposureOrIntervention: form.landscapeApplicabilityExposureOrIntervention.trim(),
			comparator: form.landscapeApplicabilityComparator.trim(),
			outcomes: parseLines(form.landscapeApplicabilityOutcomes),
			setting: form.landscapeApplicabilitySetting.trim(),
			timeframe: form.landscapeApplicabilityTimeframe.trim()
		},
		publicFlags: {
			showEvidenceLandscape: form.landscapeShowEvidenceLandscape,
			showCredibleMinorityView: form.landscapeShowCredibleMinorityView,
			showFalseBalanceWarning: form.landscapeShowFalseBalanceWarning,
			medicalOrPublicHealthSensitive: form.landscapeMedicalOrPublicHealthSensitive,
			requiresProfessionalContext: form.landscapeRequiresProfessionalContext
		},
		workflow: {
			lastAssessedAt: form.landscapeLastAssessedAt || undefined,
			nextReviewDueAt: form.landscapeNextReviewDueAt || undefined,
			editorialNotes: form.landscapeEditorialNotes.trim()
		}
	};
}

function readApiError(error: unknown, fallback: string) {
	if (error && typeof error === "object" && "data" in error) {
		const data = (error as { data?: { error?: string; validationErrors?: string[] } }).data;
		if (data?.validationErrors?.length) return `${data.error || fallback} ${data.validationErrors.join(" ")}`;
		if (data?.error) return data.error;
	}
	return fallback;
}

function hydrateClaim(record: Claim | null) {
	claim.value = record;
	form.topic = record?.topic?.slug || topics.value[0]?.slug || "";
	form.title = record?.title || "";
	form.slug = record?.slug || "";
	form.status = record?.status || "draft";
	form.consensusBand = record?.consensusBand || "unclear";
	form.agreementLevel = record?.agreementLevel || "frontier";
	form.evidenceCertainty = record?.evidenceCertainty || "low";
	form.confidenceScore = record?.confidenceScore ?? 50;
	form.reviewMode = record?.reviewMode || "standard";
	form.bottomLine = record?.bottomLine || "";
	form.stableCore = (record?.stableCore || []).join("\n");
	form.openQuestions = (record?.openQuestions || []).join("\n");
	form.whatWouldChangeMinds = (record?.whatWouldChangeMinds || []).join("\n");
	form.misconceptions = (record?.misconceptions || []).join("\n");
	form.misconceptionTags = (record?.misconceptionTags || []).join("\n");
	form.editorSummary = record?.editorSummary || "";
	form.uncertaintySummary = record?.uncertaintySummary || "";
	form.landscapeClaimType = record?.evidenceLandscape?.claimType || "other";
	form.landscapeSupportLabel = record?.evidenceLandscape?.supportLabel || "unresolved";
	form.landscapeSupportScore = record?.evidenceLandscape?.supportScore ?? null;
	form.landscapeEvidenceDirection = record?.evidenceLandscape?.evidenceDirection || "not_applicable";
	form.landscapeEvidenceCertainty = record?.evidenceLandscape?.evidenceCertainty || "not_assessable";
	form.landscapeExpertAgreement = record?.evidenceLandscape?.expertAgreement || "not_assessable";
	form.landscapePlainLanguageAnswer = record?.evidenceLandscape?.plainLanguageAnswer || "";
	form.landscapeOneSentenceSummary = record?.evidenceLandscape?.oneSentenceSummary || "";
	form.landscapeConfidenceStatement = record?.evidenceLandscape?.confidenceStatement || "";
	form.landscapeCaveatSummary = record?.evidenceLandscape?.caveatSummary || "";
	form.landscapeDisagreementSummary = record?.evidenceLandscape?.disagreementSummary || "";
	form.landscapeCredibleMinorityViewSummary = record?.evidenceLandscape?.credibleMinorityViewSummary || "";
	form.landscapeFringeOrUnsupportedViewSummary = record?.evidenceLandscape?.fringeOrUnsupportedViewSummary || "";
	form.landscapeWhatWouldChangeThis = record?.evidenceLandscape?.whatWouldChangeThis || "";
	form.landscapeShowEvidenceLandscape = !!record?.evidenceLandscape?.publicFlags?.showEvidenceLandscape;
	form.landscapeShowCredibleMinorityView = !!record?.evidenceLandscape?.publicFlags?.showCredibleMinorityView;
	form.landscapeShowFalseBalanceWarning = !!record?.evidenceLandscape?.publicFlags?.showFalseBalanceWarning;
	form.landscapeMedicalOrPublicHealthSensitive =
		!!record?.evidenceLandscape?.publicFlags?.medicalOrPublicHealthSensitive;
	form.landscapeRequiresProfessionalContext = !!record?.evidenceLandscape?.publicFlags?.requiresProfessionalContext;
	form.landscapeWorkflowStatus = record?.evidenceLandscape?.workflow?.status || "not_started";
	form.landscapeLastAssessedAt = formatDateInput(record?.evidenceLandscape?.workflow?.lastAssessedAt);
	form.landscapeNextReviewDueAt = formatDateInput(record?.evidenceLandscape?.workflow?.nextReviewDueAt);
	form.landscapeEditorialNotes = record?.evidenceLandscape?.workflow?.editorialNotes || "";
	form.landscapeApplicabilityPopulation = record?.evidenceLandscape?.applicability?.population || "";
	form.landscapeApplicabilityExposureOrIntervention =
		record?.evidenceLandscape?.applicability?.exposureOrIntervention || "";
	form.landscapeApplicabilityComparator = record?.evidenceLandscape?.applicability?.comparator || "";
	form.landscapeApplicabilityOutcomes = formatLines(record?.evidenceLandscape?.applicability?.outcomes);
	form.landscapeApplicabilitySetting = record?.evidenceLandscape?.applicability?.setting || "";
	form.landscapeApplicabilityTimeframe = record?.evidenceLandscape?.applicability?.timeframe || "";
	form.searchDatabases = (record?.searchDatabases || []).join("\n");
	form.searchCutoffAt = formatDateInput(record?.searchCutoffAt);
	form.inclusionRules = (record?.inclusionRules || []).join("\n");
	form.exclusionRules = (record?.exclusionRules || []).join("\n");
	form.surveillanceFocus = record?.surveillanceSpec?.focus || "";
	form.surveillanceCadenceDays = record?.surveillanceSpec?.cadenceDays ?? 90;
	form.watchTerms = (record?.surveillanceSpec?.watchTerms || []).join("\n");
	form.integrityMonitors = (record?.surveillanceSpec?.integrityMonitors || []).join("\n");
	form.guidelineMonitors = (record?.surveillanceSpec?.guidelineMonitors || []).join("\n");
	form.triggerRules = (record?.surveillanceSpec?.triggerRules || []).join("\n");
	form.appraisalTools = (record?.appraisalTools || []).join("\n");
	form.authorLine = record?.authorLine || "";
	form.reviewerLine = record?.reviewerLine || "";
	form.coiSummary = record?.coiSummary || "";
	form.independenceSummary = record?.independenceSummary || "";
	form.lastRetractionCheckAt = formatDateInput(record?.lastRetractionCheckAt);
	form.lastReviewedAt = formatDateInput(record?.lastReviewedAt);
	form.nextReviewAt = formatDateInput(record?.nextReviewAt);
	form.revisionNote = "";
	sourceRows.value =
		record?.sources?.map((source) => ({
			...source,
			citationCheckedAt: formatDateInput(source.citationCheckedAt),
			evidenceProfile: defaultSourceEvidenceProfile(source.evidenceProfile)
		})) || [];
	evidenceSummaryRows.value =
		record?.evidenceSummaries?.map((summary) => ({
			...summary,
			limitations: [...(summary.limitations || [])]
		})) || [];
	institutionalAnchorRows.value =
		record?.institutionalAnchors?.map((anchor) => ({
			...anchor
		})) || [];
	uncertaintyDriverRows.value =
		record?.uncertaintyDrivers?.map((driver) => ({
			...driver
		})) || [];
}

async function loadTopics() {
	const response = await $fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"));
	topics.value = response.topics;
	if (!form.topic) {
		form.topic = response.topics[0]?.slug || "";
	}
}

async function loadClaim() {
	if (!import.meta.client || !canUseEditorial.value || isNew.value) {
		hydrateClaim(null);
		revisions.value = [];
		return;
	}

	loading.value = true;
	errorMessage.value = "";
	try {
		const [claimResponse, revisionsResponse] = await Promise.all([
			$fetch<ClaimResponse>(apiUrl(`/editorial/claims/${routeId.value}`), {
				credentials: "include"
			}),
			$fetch<ClaimRevisionsResponse>(apiUrl(`/editorial/claims/${routeId.value}/revisions`), {
				credentials: "include"
			})
		]);
		hydrateClaim(claimResponse.claim);
		revisions.value = revisionsResponse.revisions;
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to load the claim editor.";
	} finally {
		loading.value = false;
	}
}

function claimPayload() {
	return {
		topic: form.topic,
		title: form.title.trim(),
		slug: form.slug.trim(),
		status: form.status,
		consensusBand: form.consensusBand,
		agreementLevel: form.agreementLevel,
		evidenceCertainty: form.evidenceCertainty,
		confidenceScore: form.confidenceScore,
		reviewMode: form.reviewMode,
		bottomLine: form.bottomLine.trim(),
		stableCore: parseLines(form.stableCore),
		openQuestions: parseLines(form.openQuestions),
		whatWouldChangeMinds: parseLines(form.whatWouldChangeMinds),
		misconceptions: parseLines(form.misconceptions),
		misconceptionTags: parseLines(form.misconceptionTags),
		editorSummary: form.editorSummary.trim(),
		uncertaintySummary: form.uncertaintySummary.trim(),
		evidenceLandscape: landscapePayload(),
		searchDatabases: parseLines(form.searchDatabases),
		searchCutoffAt: form.searchCutoffAt || undefined,
		inclusionRules: parseLines(form.inclusionRules),
		exclusionRules: parseLines(form.exclusionRules),
		surveillanceSpec: {
			focus: form.surveillanceFocus.trim(),
			cadenceDays: form.surveillanceCadenceDays || undefined,
			watchTerms: parseLines(form.watchTerms),
			integrityMonitors: parseLines(form.integrityMonitors),
			guidelineMonitors: parseLines(form.guidelineMonitors),
			triggerRules: parseLines(form.triggerRules)
		},
		appraisalTools: parseLines(form.appraisalTools),
		evidenceSummaries: evidenceSummaryRows.value
			.map((summary) => ({
				question: summary.question.trim(),
				population: summary.population?.trim() || "",
				finding: summary.finding.trim(),
				effectDirection: summary.effectDirection,
				magnitude: summary.magnitude?.trim() || "",
				certainty: summary.certainty,
				limitations: (summary.limitations || []).map((item) => item.trim()).filter(Boolean)
			}))
			.filter((summary) => summary.question && summary.finding),
		institutionalAnchors: institutionalAnchorRows.value
			.map((anchor) => ({
				name: anchor.name.trim(),
				role: anchor.role.trim()
			}))
			.filter((anchor) => anchor.name && anchor.role),
		uncertaintyDrivers: uncertaintyDriverRows.value
			.map((driver) => ({
				type: driver.type,
				detail: driver.detail.trim()
			}))
			.filter((driver) => driver.detail),
		authorLine: form.authorLine.trim(),
		reviewerLine: form.reviewerLine.trim(),
		coiSummary: form.coiSummary.trim(),
		independenceSummary: form.independenceSummary.trim(),
		lastRetractionCheckAt: form.lastRetractionCheckAt || undefined,
		lastReviewedAt: form.lastReviewedAt || undefined,
		nextReviewAt: form.nextReviewAt || undefined,
		revisionNote: form.revisionNote.trim()
	};
}

async function syncSources(claimId: string) {
	const existingIds = new Set((claim.value?.sources || []).map((source) => source._id).filter(Boolean) as string[]);
	const currentIds = new Set(sourceRows.value.map((source) => source._id).filter(Boolean) as string[]);

	for (const sourceId of existingIds) {
		if (!currentIds.has(sourceId)) {
			await $fetch(apiUrl(`/editorial/claims/${claimId}/sources/${sourceId}`), {
				method: "DELETE",
				credentials: "include"
			});
		}
	}

	for (const source of sourceRows.value) {
		const body = {
			kind: source.kind,
			title: source.title.trim(),
			publisher: source.publisher?.trim() || "",
			year: source.year || undefined,
			url: source.url?.trim() || "",
			doi: source.doi?.trim() || "",
			pmid: source.pmid?.trim() || "",
			pmcid: source.pmcid?.trim() || "",
			isAnchor: !!source.isAnchor,
			appraisal: source.appraisal || "not_appraised",
			citationStatus: source.citationStatus || "current",
			citationCheckedAt: source.citationCheckedAt || undefined,
			statusSources: (source.statusSources || []).map((item) => item.trim()).filter(Boolean),
			stance: source.stance,
			note: source.note?.trim() || "",
			order: source.order ?? 0
		};

		if (source._id) {
			await $fetch(apiUrl(`/editorial/claims/${claimId}/sources/${source._id}`), {
				method: "PATCH",
				credentials: "include",
				body
			});
			if (sourceEvidenceProfileChanged(source)) {
				await $fetch(apiUrl(`/editorial/claim-sources/${source._id}/evidence-profile`), {
					method: "PATCH",
					credentials: "include",
					body: sourceEvidenceProfilePayload(source)
				});
			}
		} else if (body.title) {
			const response = await $fetch<{ source: ClaimSource }>(apiUrl(`/editorial/claims/${claimId}/sources`), {
				method: "POST",
				credentials: "include",
				body
			});
			source._id = response.source._id;
			if (source._id && sourceEvidenceProfileChanged(source)) {
				await $fetch(apiUrl(`/editorial/claim-sources/${source._id}/evidence-profile`), {
					method: "PATCH",
					credentials: "include",
					body: sourceEvidenceProfilePayload(source)
				});
			}
		}
	}
}

async function saveClaim() {
	if (!form.topic || !form.title.trim()) {
		errorMessage.value = "Topic and title are required.";
		return false;
	}

	saving.value = true;
	errorMessage.value = "";
	actionMessage.value = "";
	try {
		if (isNew.value) {
			const response = await $fetch<ClaimResponse>(apiUrl("/editorial/claims"), {
				method: "POST",
				credentials: "include",
				body: claimPayload()
			});
			const createdId = response.claim._id;
			if (sourceRows.value.length) {
				await syncSources(createdId);
			}
			actionMessage.value = "Draft claim created.";
			await router.replace(`/account/editorial/claims/${createdId}`);
			await loadClaim();
			return true;
		}

		await $fetch<ClaimResponse>(apiUrl(`/editorial/claims/${routeId.value}`), {
			method: "PATCH",
			credentials: "include",
			body: claimPayload()
		});
		await syncSources(routeId.value);
		actionMessage.value = "Claim saved.";
		await loadClaim();
		return true;
	} catch (error) {
		console.error(error);
		errorMessage.value = readApiError(error, "Unable to save the claim.");
		return false;
	} finally {
		saving.value = false;
	}
}

async function runLandscapeAction(action: "recompute" | "submit-review" | "approve" | "publish") {
	if (isNew.value) {
		errorMessage.value = "Save the draft before running evidence landscape workflow actions.";
		return;
	}

	const saved = await saveClaim();
	if (!saved) return;

	const actionCopy = {
		recompute: "Evidence distribution recomputed.",
		"submit-review": "Evidence landscape submitted for review.",
		approve: "Evidence landscape approved.",
		publish: "Evidence landscape published."
	} satisfies Record<"recompute" | "submit-review" | "approve" | "publish", string>;

	saving.value = true;
	errorMessage.value = "";
	actionMessage.value = "";
	try {
		await $fetch(apiUrl(`/editorial/claims/${routeId.value}/evidence-landscape/${action}`), {
			method: "POST",
			credentials: "include",
			body: {
				notes: form.revisionNote.trim() || undefined
			}
		});
		actionMessage.value = actionCopy[action];
		await loadClaim();
	} catch (error) {
		console.error(error);
		errorMessage.value = readApiError(error, "Unable to update the evidence landscape workflow.");
	} finally {
		saving.value = false;
	}
}

async function publishClaim() {
	if (isNew.value) {
		errorMessage.value = "Save the draft first, then publish it.";
		return;
	}
	saving.value = true;
	errorMessage.value = "";
	actionMessage.value = "";
	try {
		await $fetch<ClaimResponse>(apiUrl(`/editorial/claims/${routeId.value}/publish`), {
			method: "POST",
			credentials: "include",
			body: {
				lastReviewedAt: form.lastReviewedAt || undefined,
				nextReviewAt: form.nextReviewAt || undefined,
				revisionNote: form.revisionNote.trim() || "Published claim."
			}
		});
		actionMessage.value = "Claim published.";
		await loadClaim();
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to publish the claim.";
	} finally {
		saving.value = false;
	}
}

async function archiveClaim() {
	if (isNew.value) return;
	saving.value = true;
	errorMessage.value = "";
	actionMessage.value = "";
	try {
		await $fetch<ClaimResponse>(apiUrl(`/editorial/claims/${routeId.value}/archive`), {
			method: "POST",
			credentials: "include",
			body: {
				revisionNote: form.revisionNote.trim() || "Archived claim."
			}
		});
		actionMessage.value = "Claim archived.";
		await loadClaim();
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to archive the claim.";
	} finally {
		saving.value = false;
	}
}

function addSource() {
	sourceRows.value.push({
		kind: "context",
		title: "",
		publisher: "",
		pmid: "",
		pmcid: "",
		isAnchor: false,
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "",
		statusSources: [],
		stance: "context",
		note: "",
		order: sourceRows.value.length,
		evidenceProfile: defaultSourceEvidenceProfile()
	});
}

function removeSource(index: number) {
	sourceRows.value.splice(index, 1);
}

function addEvidenceSummary() {
	evidenceSummaryRows.value.push({
		question: "",
		population: "",
		finding: "",
		effectDirection: "unclear",
		magnitude: "",
		certainty: "low",
		limitations: []
	});
}

function removeEvidenceSummary(index: number) {
	evidenceSummaryRows.value.splice(index, 1);
}

function updateEvidenceSummaryLimitations(index: number, event: Event) {
	const target = event.target as HTMLTextAreaElement | null;
	evidenceSummaryRows.value[index].limitations = parseLines(target?.value || "");
}

function updateSourceStatusSources(index: number, event: Event) {
	const target = event.target as HTMLTextAreaElement | null;
	sourceRows.value[index].statusSources = parseLines(target?.value || "");
}

function updateSourceOutcomes(index: number, event: Event) {
	const target = event.target as HTMLTextAreaElement | null;
	const profile = defaultSourceEvidenceProfile(sourceRows.value[index].evidenceProfile);
	profile.extraction.outcomes = parseLines(target?.value || "");
	sourceRows.value[index].evidenceProfile = profile;
}

function addInstitutionalAnchor() {
	institutionalAnchorRows.value.push({
		name: "",
		role: ""
	});
}

function removeInstitutionalAnchor(index: number) {
	institutionalAnchorRows.value.splice(index, 1);
}

function addUncertaintyDriver() {
	uncertaintyDriverRows.value.push({
		type: "other",
		detail: ""
	});
}

function removeUncertaintyDriver(index: number) {
	uncertaintyDriverRows.value.splice(index, 1);
}

watch(
	() => [ready.value, canUseEditorial.value, routeId.value],
	async ([isReady, canEdit]) => {
		if (!isReady || !canEdit || !import.meta.client) return;
		await loadTopics();
		await loadClaim();
	},
	{ immediate: true }
);
</script>

<template>
	<div class="claim-editor-page">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Account', to: '/account' },
				{ label: 'Editorial workspace', to: '/account/editorial' },
				{ label: isNew ? 'New claim' : claim?.title || 'Claim editor' }
			]"
		/>

		<header class="editor-header">
			<div>
				<p class="eyebrow">Claim editor</p>
				<h1>{{ isNew ? "Create a canonical claim" : claim?.title || "Edit claim" }}</h1>
				<p>Use the structured form below. The public page should always read in a predictable order.</p>
			</div>
			<div class="editor-header__actions">
				<NuxtLink
					v-if="claim?.topic?.slug && claim?.slug && !isNew"
					class="button button--ghost"
					:to="`/consensus/${claim.topic.slug}/${claim.slug}`"
				>
					View public page
				</NuxtLink>
				<NuxtLink class="button button--ghost" to="/account/editorial">Back to workspace</NuxtLink>
			</div>
		</header>

		<section v-if="!ready" class="locked-panel">
			<p class="eyebrow">Checking access</p>
			<h2>Loading your editorial permissions.</h2>
		</section>
		<AuthPanel
			v-else-if="!isLoggedIn"
			title="Sign in to continue"
			hint="Editorial access requires a verified expert or admin."
		/>
		<section v-else-if="!canUseEditorial" class="locked-panel">
			<p class="eyebrow">Restricted area</p>
			<h2>Verified experts and admins only.</h2>
			<p>Member accounts can apply for expert review from the main account page.</p>
			<NuxtLink class="button button--ghost" to="/account">Back to account</NuxtLink>
		</section>
		<section v-else class="editor-grid">
			<form class="editor-form" @submit.prevent="saveClaim">
				<div class="form-grid">
					<label class="field">
						<span class="field-label">Topic</span>
						<select v-model="form.topic">
							<option v-for="topic in topics" :key="topic._id" :value="topic.slug">
								{{ topic.title }}
							</option>
						</select>
					</label>

					<label class="field">
						<span class="field-label">Status</span>
						<select v-model="form.status">
							<option value="draft">Draft</option>
							<option value="published">Published</option>
							<option value="needs_update">Needs update</option>
							<option value="archived">Archived</option>
						</select>
					</label>

					<label class="field field--full">
						<span class="field-label">Claim title</span>
						<input v-model="form.title" type="text" placeholder="How does scientific consensus form?" />
					</label>

					<label class="field">
						<span class="field-label">Slug</span>
						<input v-model="form.slug" type="text" placeholder="how-does-scientific-consensus-form" />
					</label>

					<label class="field">
						<span class="field-label">Consensus band</span>
						<select v-model="form.consensusBand">
							<option value="strong">Strong</option>
							<option value="broad">Broad</option>
							<option value="mixed">Mixed</option>
							<option value="unclear">Unclear</option>
						</select>
					</label>

					<label class="field">
						<span class="field-label">Confidence score</span>
						<input v-model.number="form.confidenceScore" type="number" min="0" max="100" />
					</label>

					<label class="field">
						<span class="field-label">Agreement level</span>
						<select v-model="form.agreementLevel">
							<option value="strong">Strong agreement</option>
							<option value="broad_qualified">Broad but qualified</option>
							<option value="divided">Divided interpretations</option>
							<option value="frontier">Frontier debate</option>
						</select>
					</label>

					<label class="field">
						<span class="field-label">Evidence certainty</span>
						<select v-model="form.evidenceCertainty">
							<option value="high">High</option>
							<option value="moderate">Moderate</option>
							<option value="low">Low</option>
							<option value="very_low">Very low</option>
						</select>
					</label>

					<label class="field">
						<span class="field-label">Review mode</span>
						<select v-model="form.reviewMode">
							<option value="standard">Scheduled review</option>
							<option value="living">Living review</option>
						</select>
					</label>

					<label class="field">
						<span class="field-label">Search cutoff</span>
						<input v-model="form.searchCutoffAt" type="date" />
					</label>

					<label class="field">
						<span class="field-label">Retraction check</span>
						<input v-model="form.lastRetractionCheckAt" type="date" />
					</label>

					<label class="field">
						<span class="field-label">Last reviewed</span>
						<input v-model="form.lastReviewedAt" type="date" />
					</label>

					<label class="field">
						<span class="field-label">Next review</span>
						<input v-model="form.nextReviewAt" type="date" />
					</label>

					<label class="field field--full">
						<span class="field-label">Bottom line</span>
						<textarea
							v-model="form.bottomLine"
							rows="4"
							placeholder="Two or three sentences in plain language."
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Editor summary</span>
						<textarea
							v-model="form.editorSummary"
							rows="4"
							placeholder="Internal framing note for the public page and future reviewers."
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Plain-language uncertainty summary</span>
						<textarea
							v-model="form.uncertaintySummary"
							rows="4"
							placeholder="Explain what is still uncertain without undermining the settled core of the page."
						/>
					</label>

					<div class="field field--full structured-block">
						<div class="structured-block__header">
							<div>
								<span class="field-label">Evidence landscape</span>
								<p>
									Captures the support range, credible disagreement, and limits. It appears publicly
									only when the workflow is published and the public flag is enabled.
								</p>
							</div>
							<div class="workflow-actions">
								<p class="status-pill">
									{{ formatLandscapeWorkflowStatus(form.landscapeWorkflowStatus) }}
								</p>
								<button
									class="button button--ghost"
									type="button"
									:disabled="saving || isNew"
									@click="runLandscapeAction('recompute')"
								>
									Recompute
								</button>
								<button
									class="button button--ghost"
									type="button"
									:disabled="saving || isNew"
									@click="runLandscapeAction('submit-review')"
								>
									Submit review
								</button>
								<button
									class="button button--ghost"
									type="button"
									:disabled="saving || isNew"
									@click="runLandscapeAction('approve')"
								>
									Approve
								</button>
								<button
									class="button button--primary"
									type="button"
									:disabled="saving || isNew"
									@click="runLandscapeAction('publish')"
								>
									Publish landscape
								</button>
							</div>
						</div>

						<div class="structured-card__grid">
							<label class="field">
								<span class="field-label">Claim type</span>
								<select v-model="form.landscapeClaimType">
									<option v-for="value in EVIDENCE_CLAIM_TYPES" :key="value" :value="value">
										{{ formatClaimTypeLabel(value) }}
									</option>
								</select>
							</label>

							<label class="field">
								<span class="field-label">Support label</span>
								<select v-model="form.landscapeSupportLabel">
									<option
										v-for="value in EVIDENCE_LANDSCAPE_SUPPORT_LABELS"
										:key="value"
										:value="value"
									>
										{{ formatLandscapeSupportLabel(value) }}
									</option>
								</select>
							</label>

							<label class="field">
								<span class="field-label">Support score</span>
								<input
									v-model.number="form.landscapeSupportScore"
									type="number"
									min="0"
									max="100"
									placeholder="Optional"
								/>
							</label>

							<label class="field">
								<span class="field-label">Evidence direction</span>
								<select v-model="form.landscapeEvidenceDirection">
									<option v-for="value in EVIDENCE_LANDSCAPE_DIRECTIONS" :key="value" :value="value">
										{{ formatLandscapeDirectionLabel(value) }}
									</option>
								</select>
							</label>

							<label class="field">
								<span class="field-label">Landscape certainty</span>
								<select v-model="form.landscapeEvidenceCertainty">
									<option
										v-for="value in EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS"
										:key="value"
										:value="value"
									>
										{{ formatLandscapeCertaintyLabel(value) }}
									</option>
								</select>
							</label>

							<label class="field">
								<span class="field-label">Expert agreement</span>
								<select v-model="form.landscapeExpertAgreement">
									<option
										v-for="value in EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS"
										:key="value"
										:value="value"
									>
										{{ formatLandscapeExpertAgreementLabel(value) }}
									</option>
								</select>
							</label>

							<label class="field field--full">
								<span class="field-label">One-sentence landscape summary</span>
								<input
									v-model="form.landscapeOneSentenceSummary"
									type="text"
									placeholder="The broad answer, stated without collapsing uncertainty into a score."
								/>
							</label>

							<label class="field field--full">
								<span class="field-label">Plain-language answer</span>
								<textarea
									v-model="form.landscapePlainLanguageAnswer"
									rows="4"
									placeholder="What should a careful reader conclude, and how strong is that conclusion?"
								/>
							</label>

							<label class="field field--full">
								<span class="field-label">Confidence statement</span>
								<textarea
									v-model="form.landscapeConfidenceStatement"
									rows="3"
									placeholder="Why the site is more or less confident than a single headline would imply."
								/>
							</label>

							<label class="field field--full">
								<span class="field-label">Caveat summary</span>
								<textarea
									v-model="form.landscapeCaveatSummary"
									rows="3"
									placeholder="The most important qualification a reader should keep in mind."
								/>
							</label>

							<label class="field field--full">
								<span class="field-label">Disagreement summary</span>
								<textarea
									v-model="form.landscapeDisagreementSummary"
									rows="3"
									placeholder="Where credible experts still disagree, if they do."
								/>
							</label>

							<label class="field field--full">
								<span class="field-label">Credible minority view</span>
								<textarea
									v-model="form.landscapeCredibleMinorityViewSummary"
									rows="3"
									placeholder="Only use for serious expert disagreement that clears the source standard."
								/>
							</label>

							<label class="field field--full">
								<span class="field-label">Fringe or unsupported view note</span>
								<textarea
									v-model="form.landscapeFringeOrUnsupportedViewSummary"
									rows="3"
									placeholder="Explain why unsupported versions are not given equal weight, when necessary."
								/>
							</label>

							<label class="field field--full">
								<span class="field-label">What would change this landscape</span>
								<textarea
									v-model="form.landscapeWhatWouldChangeThis"
									rows="3"
									placeholder="Name the kind of evidence, review, or real-world signal that could move this page."
								/>
							</label>

							<label class="field">
								<span class="field-label">Last landscape assessment</span>
								<input v-model="form.landscapeLastAssessedAt" type="date" />
							</label>

							<label class="field">
								<span class="field-label">Next landscape review</span>
								<input v-model="form.landscapeNextReviewDueAt" type="date" />
							</label>

							<label class="field field--full">
								<span class="field-label">Population</span>
								<input
									v-model="form.landscapeApplicabilityPopulation"
									type="text"
									placeholder="Who or what this assessment applies to."
								/>
							</label>

							<label class="field">
								<span class="field-label">Exposure / intervention</span>
								<input v-model="form.landscapeApplicabilityExposureOrIntervention" type="text" />
							</label>

							<label class="field">
								<span class="field-label">Comparator</span>
								<input v-model="form.landscapeApplicabilityComparator" type="text" />
							</label>

							<label class="field field--full">
								<span class="field-label">Outcomes (one per line)</span>
								<textarea v-model="form.landscapeApplicabilityOutcomes" rows="3" />
							</label>

							<label class="field">
								<span class="field-label">Setting</span>
								<input v-model="form.landscapeApplicabilitySetting" type="text" />
							</label>

							<label class="field">
								<span class="field-label">Timeframe</span>
								<input v-model="form.landscapeApplicabilityTimeframe" type="text" />
							</label>

							<label class="field field--checkbox">
								<input v-model="form.landscapeShowEvidenceLandscape" type="checkbox" />
								<span class="field-label">Show landscape publicly</span>
							</label>

							<label class="field field--checkbox">
								<input v-model="form.landscapeShowCredibleMinorityView" type="checkbox" />
								<span class="field-label">Show credible minority view</span>
							</label>

							<label class="field field--checkbox">
								<input v-model="form.landscapeShowFalseBalanceWarning" type="checkbox" />
								<span class="field-label">Show false-balance warning</span>
							</label>

							<label class="field field--checkbox">
								<input v-model="form.landscapeMedicalOrPublicHealthSensitive" type="checkbox" />
								<span class="field-label">Medical/public-health sensitive</span>
							</label>

							<label class="field field--checkbox">
								<input v-model="form.landscapeRequiresProfessionalContext" type="checkbox" />
								<span class="field-label">Professional context reviewed</span>
							</label>

							<label class="field field--full">
								<span class="field-label">Editorial landscape notes</span>
								<textarea
									v-model="form.landscapeEditorialNotes"
									rows="3"
									placeholder="Private reviewer notes. These are not exposed publicly."
								/>
							</label>
						</div>

						<div class="landscape-snapshot">
							<article>
								<span class="field-label">Evidence base</span>
								<strong>{{ landscapeEvidenceBaseSize?.includedSources ?? 0 }} included</strong>
								<p>
									{{ landscapeEvidenceBaseSize?.totalSources ?? 0 }} total,
									{{ landscapeEvidenceBaseSize?.excludedSources ?? 0 }} excluded
								</p>
							</article>
							<article>
								<span class="field-label">Direction counts</span>
								<strong>{{ landscapeDistribution?.supportsClaim?.count ?? 0 }} support</strong>
								<p>
									{{ landscapeDistribution?.supportsWithCaveats?.count ?? 0 }} caveated,
									{{ landscapeDistribution?.opposesClaim?.count ?? 0 }} opposing,
									{{ landscapeDistribution?.inconclusiveOrMixed?.count ?? 0 }} mixed
								</p>
							</article>
							<article>
								<span class="field-label">Integrity exclusions</span>
								<strong>{{ landscapeDistribution?.excludedRetracted?.count ?? 0 }} retracted</strong>
								<p>
									{{ landscapeDistribution?.excludedLowQuality?.count ?? 0 }} low quality,
									{{ landscapeDistribution?.excludedFringe?.count ?? 0 }} fringe
								</p>
							</article>
						</div>

						<p class="helper-note">
							Do not use this as a vote count or a truth score. Source counts are not votes; the public
							bottom line still requires editorial judgment.
						</p>
					</div>

					<div class="field field--full structured-block">
						<div class="structured-block__header">
							<div>
								<span class="field-label">Typed uncertainty drivers</span>
								<p>Add three to six concrete reasons the certainty is not higher or fully settled.</p>
							</div>
							<button class="button button--ghost" type="button" @click="addUncertaintyDriver">
								Add driver
							</button>
						</div>

						<div v-if="!uncertaintyDriverRows.length" class="empty-state">
							No uncertainty drivers attached yet.
						</div>
						<div v-else class="structured-list">
							<article
								v-for="(driver, index) in uncertaintyDriverRows"
								:key="`${driver.type}-${index}`"
								class="structured-card"
							>
								<div class="structured-card__grid">
									<label class="field">
										<span class="field-label">Driver type</span>
										<select v-model="driver.type">
											<option value="bias">Bias / confounding</option>
											<option value="indirectness">Indirectness</option>
											<option value="imprecision">Imprecision / effect size</option>
											<option value="inconsistency">Inconsistency</option>
											<option value="generalizability">Generalizability</option>
											<option value="mechanism">Mechanism</option>
											<option value="timing">Timing / follow-up</option>
											<option value="implementation">Implementation / policy</option>
											<option value="other">Other</option>
										</select>
									</label>

									<label class="field field--full">
										<span class="field-label">Public-facing note</span>
										<textarea
											v-model="driver.detail"
											rows="3"
											placeholder="What specific uncertainty should a careful reader keep in mind?"
										/>
									</label>
								</div>

								<button
									class="button button--ghost button--danger"
									type="button"
									@click="removeUncertaintyDriver(index)"
								>
									Remove driver
								</button>
							</article>
						</div>
					</div>

					<div class="field field--full structured-block">
						<div class="structured-block__header">
							<div>
								<span class="field-label">Cluster sourcing standard</span>
								<p>Use the topic-specific anchor stack before publishing the page as canonical.</p>
							</div>
							<NuxtLink
								class="button button--ghost"
								:to="`/source-standards#${selectedSourceStandard.slug}`"
							>
								Open standard
							</NuxtLink>
						</div>

						<div class="structured-card__grid">
							<article class="helper-card">
								<h3>Anchor A</h3>
								<p>
									<strong>{{
										hasClaimLayerA ? "Present in this draft" : "Still missing in this draft"
									}}</strong>
								</p>
								<p>{{ selectedSourceStandard.twoLayer.anchorA }}</p>
							</article>

							<article class="helper-card">
								<h3>Anchor B</h3>
								<p>
									<strong>{{
										hasClaimLayerB ? "Present in this draft" : "Still missing in this draft"
									}}</strong>
								</p>
								<p>{{ selectedSourceStandard.twoLayer.anchorB }}</p>
							</article>

							<article class="helper-card">
								<h3>Primary anchors</h3>
								<ul class="plain-list plain-list--tight">
									<li
										v-for="anchor in selectedSourceStandard.primaryAnchors.slice(0, 4)"
										:key="anchor.name"
									>
										<strong>{{ anchor.name }}:</strong> {{ anchor.note }}
									</li>
								</ul>
							</article>

							<article class="helper-card">
								<h3>Disagreement rule</h3>
								<p>{{ selectedSourceStandard.disagreementRule }}</p>
							</article>
						</div>
					</div>

					<label class="field field--full">
						<span class="field-label">Search databases (one per line)</span>
						<textarea
							v-model="form.searchDatabases"
							rows="4"
							placeholder="PubMed&#10;OpenAlex&#10;Crossref"
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Inclusion rules (one per line)</span>
						<textarea v-model="form.inclusionRules" rows="4" />
					</label>

					<label class="field field--full">
						<span class="field-label">Exclusion rules (one per line)</span>
						<textarea v-model="form.exclusionRules" rows="4" />
					</label>

					<label class="field field--full">
						<span class="field-label">Surveillance focus</span>
						<textarea
							v-model="form.surveillanceFocus"
							rows="3"
							placeholder="Track the exact evidence question, scope, and why the page is on watch."
						/>
					</label>

					<label class="field">
						<span class="field-label">Surveillance cadence (days)</span>
						<input v-model.number="form.surveillanceCadenceDays" type="number" min="1" max="3650" />
					</label>

					<label class="field field--full">
						<span class="field-label">Watch terms (one per line)</span>
						<textarea
							v-model="form.watchTerms"
							rows="4"
							placeholder="vaccine autism&#10;MMR autism&#10;childhood vaccine safety"
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Integrity monitors (one per line)</span>
						<textarea
							v-model="form.integrityMonitors"
							rows="4"
							placeholder="Crossref update metadata&#10;PubMed linking&#10;Europe PMC status checks"
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Guideline monitors (one per line)</span>
						<textarea
							v-model="form.guidelineMonitors"
							rows="4"
							placeholder="WHO guidance streams&#10;CDC guidance updates"
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Update triggers (one per line)</span>
						<textarea
							v-model="form.triggerRules"
							rows="4"
							placeholder="Retracted source in the source stack&#10;New synthesis that could shift the bottom line"
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Appraisal tools (one per line)</span>
						<textarea v-model="form.appraisalTools" rows="4" />
					</label>

					<div class="field field--full structured-block">
						<div class="structured-block__header">
							<div>
								<span class="field-label">Evidence summaries</span>
								<p>One reusable summary object per key question or outcome on the page.</p>
							</div>
							<button class="button button--ghost" type="button" @click="addEvidenceSummary">
								Add evidence summary
							</button>
						</div>

						<div v-if="!evidenceSummaryRows.length" class="empty-state">
							No evidence summaries attached yet.
						</div>
						<div v-else class="structured-list">
							<article
								v-for="(summary, index) in evidenceSummaryRows"
								:key="`${summary.question}-${index}`"
								class="structured-card"
							>
								<div class="structured-card__grid">
									<label class="field field--full">
										<span class="field-label">Question</span>
										<input v-model="summary.question" type="text" />
									</label>

									<label class="field field--full">
										<span class="field-label">Population / context</span>
										<input v-model="summary.population" type="text" />
									</label>

									<label class="field">
										<span class="field-label">Effect direction</span>
										<select v-model="summary.effectDirection">
											<option value="supports">Supports bottom line</option>
											<option value="mixed">Mixed</option>
											<option value="unclear">Unclear</option>
										</select>
									</label>

									<label class="field">
										<span class="field-label">Certainty</span>
										<select v-model="summary.certainty">
											<option value="high">High</option>
											<option value="moderate">Moderate</option>
											<option value="low">Low</option>
											<option value="very_low">Very low</option>
										</select>
									</label>

									<label class="field field--full">
										<span class="field-label">Finding</span>
										<textarea v-model="summary.finding" rows="3" />
									</label>

									<label class="field field--full">
										<span class="field-label">Magnitude / range</span>
										<input v-model="summary.magnitude" type="text" />
									</label>

									<label class="field field--full">
										<span class="field-label">Limitations (one per line)</span>
										<textarea
											:value="formatLines(summary.limitations)"
											rows="4"
											@input="updateEvidenceSummaryLimitations(index, $event)"
										/>
									</label>
								</div>

								<button
									class="button button--ghost button--danger"
									type="button"
									@click="removeEvidenceSummary(index)"
								>
									Remove evidence summary
								</button>
							</article>
						</div>
					</div>

					<div class="field field--full structured-block">
						<div class="structured-block__header">
							<div>
								<span class="field-label">Institutional anchors</span>
								<p>Show which guideline or assessment bodies define the baseline for this topic.</p>
							</div>
							<button class="button button--ghost" type="button" @click="addInstitutionalAnchor">
								Add anchor
							</button>
						</div>

						<div v-if="!institutionalAnchorRows.length" class="empty-state">
							No institutional anchors attached yet.
						</div>
						<div v-else class="structured-list">
							<article
								v-for="(anchor, index) in institutionalAnchorRows"
								:key="`${anchor.name}-${index}`"
								class="structured-card"
							>
								<div class="structured-card__grid">
									<label class="field">
										<span class="field-label">Institution</span>
										<input v-model="anchor.name" type="text" />
									</label>

									<label class="field field--full">
										<span class="field-label">Role on the page</span>
										<input v-model="anchor.role" type="text" />
									</label>
								</div>

								<button
									class="button button--ghost button--danger"
									type="button"
									@click="removeInstitutionalAnchor(index)"
								>
									Remove anchor
								</button>
							</article>
						</div>
					</div>

					<label class="field field--full">
						<span class="field-label">Prepared by</span>
						<input
							v-model="form.authorLine"
							type="text"
							placeholder="Prepared by the Is There Consensus editorial desk."
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Reviewed by</span>
						<input
							v-model="form.reviewerLine"
							type="text"
							placeholder="Reviewed for evidence quality and plain-language accuracy."
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Conflict of interest summary</span>
						<textarea v-model="form.coiSummary" rows="3" />
					</label>

					<label class="field field--full">
						<span class="field-label">Editorial independence summary</span>
						<textarea v-model="form.independenceSummary" rows="3" />
					</label>

					<label class="field field--full">
						<span class="field-label">Stable core (one point per line)</span>
						<textarea v-model="form.stableCore" rows="5" />
					</label>

					<label class="field field--full">
						<span class="field-label">Open questions (one point per line)</span>
						<textarea v-model="form.openQuestions" rows="5" />
					</label>

					<label class="field field--full">
						<span class="field-label">What would change minds (one point per line)</span>
						<textarea v-model="form.whatWouldChangeMinds" rows="5" />
					</label>

					<label class="field field--full">
						<span class="field-label">Misconceptions (one point per line)</span>
						<textarea v-model="form.misconceptions" rows="5" />
					</label>

					<label class="field field--full">
						<span class="field-label">Misconception module tags (one per line)</span>
						<textarea
							v-model="form.misconceptionTags"
							rows="4"
							placeholder="one-study-doesnt-overturn-evidence&#10;correlation-isnt-causation"
						/>
					</label>
				</div>

				<section class="sources-panel">
					<div class="section-heading">
						<div>
							<p class="eyebrow">Sources</p>
							<h2>Evidence list</h2>
						</div>
						<button class="button button--ghost" type="button" @click="addSource">Add source</button>
					</div>

					<div v-if="!sourceRows.length" class="empty-state">No sources attached yet.</div>
					<div v-else class="source-list">
						<article v-for="(source, index) in sourceRows" :key="source._id || index" class="source-editor">
							<div class="source-editor__grid">
								<label class="field">
									<span class="field-label">Kind</span>
									<select v-model="source.kind">
										<option value="systematic_review">Systematic review</option>
										<option value="meta_analysis">Meta-analysis</option>
										<option value="guideline">Guideline</option>
										<option value="consensus_statement">Consensus statement</option>
										<option value="landmark_study">Landmark study</option>
										<option value="context">Context</option>
									</select>
								</label>

								<label class="field">
									<span class="field-label">Stance</span>
									<select v-model="source.stance">
										<option value="supports">Supports</option>
										<option value="context">Context</option>
										<option value="debate">Debate</option>
									</select>
								</label>

								<label class="field field--full">
									<span class="field-label">Title</span>
									<input v-model="source.title" type="text" />
								</label>

								<label class="field">
									<span class="field-label">Publisher</span>
									<input v-model="source.publisher" type="text" />
								</label>

								<label class="field">
									<span class="field-label">Year</span>
									<input v-model.number="source.year" type="number" min="0" max="9999" />
								</label>

								<label class="field field--full">
									<span class="field-label">URL</span>
									<input v-model="source.url" type="url" />
								</label>

								<label class="field">
									<span class="field-label">DOI</span>
									<input v-model="source.doi" type="text" />
								</label>

								<label class="field">
									<span class="field-label">PMID</span>
									<input v-model="source.pmid" type="text" />
								</label>

								<label class="field">
									<span class="field-label">PMCID</span>
									<input v-model="source.pmcid" type="text" />
								</label>

								<label class="field">
									<span class="field-label">Appraisal</span>
									<select v-model="source.appraisal">
										<option value="high">High</option>
										<option value="moderate">Moderate</option>
										<option value="low">Low</option>
										<option value="not_appraised">Not appraised</option>
									</select>
								</label>

								<label class="field">
									<span class="field-label">Citation status</span>
									<select v-model="source.citationStatus">
										<option value="current">Current</option>
										<option value="corrected">Corrected</option>
										<option value="retracted">Retracted</option>
										<option value="expression_of_concern">Expression of concern</option>
									</select>
								</label>

								<label class="field">
									<span class="field-label">Citation checked</span>
									<input v-model="source.citationCheckedAt" type="date" />
								</label>

								<label class="field field--full">
									<span class="field-label">Status sources (one per line)</span>
									<textarea
										:value="formatLines(source.statusSources)"
										rows="3"
										@input="updateSourceStatusSources(index, $event)"
									/>
								</label>

								<label class="field field--checkbox">
									<input v-model="source.isAnchor" type="checkbox" />
									<span class="field-label">Anchor source</span>
								</label>

								<label class="field">
									<span class="field-label">Order</span>
									<input v-model.number="source.order" type="number" min="0" />
								</label>

								<label class="field field--full">
									<span class="field-label">Note</span>
									<textarea v-model="source.note" rows="3" />
								</label>
							</div>

							<details v-if="source.evidenceProfile" class="source-evidence-profile">
								<summary>
									<span>Evidence coding</span>
									<strong>{{
										formatEvidenceSourcePositionLabel(
											source.evidenceProfile.positionRelativeToClaim
										)
									}}</strong>
								</summary>
								<div class="source-evidence-profile__grid">
									<label class="field">
										<span class="field-label">Position relative to claim</span>
										<select v-model="source.evidenceProfile.positionRelativeToClaim">
											<option
												v-for="value in EVIDENCE_SOURCE_POSITION_BUCKETS"
												:key="value"
												:value="value"
											>
												{{ formatEvidenceSourcePositionLabel(value) }}
											</option>
										</select>
									</label>

									<label class="field">
										<span class="field-label">Evidence tier</span>
										<select v-model="source.evidenceProfile.evidenceTier">
											<option v-for="value in EVIDENCE_TIERS" :key="value" :value="value">
												{{ formatEvidenceTierLabel(value) }}
											</option>
										</select>
									</label>

									<label class="field">
										<span class="field-label">Study design</span>
										<select v-model="source.evidenceProfile.studyDesign">
											<option v-for="value in EVIDENCE_STUDY_DESIGNS" :key="value" :value="value">
												{{ formatEvidenceStudyDesignLabel(value) }}
											</option>
										</select>
									</label>

									<label class="field">
										<span class="field-label">Risk of bias</span>
										<select v-model="source.evidenceProfile.riskOfBias">
											<option
												v-for="value in EVIDENCE_RISK_OF_BIAS_LEVELS"
												:key="value"
												:value="value"
											>
												{{ formatEvidenceRiskOfBiasLabel(value) }}
											</option>
										</select>
									</label>

									<label class="field">
										<span class="field-label">Directness</span>
										<select v-model="source.evidenceProfile.directness">
											<option
												v-for="value in EVIDENCE_DIRECTNESS_LEVELS"
												:key="value"
												:value="value"
											>
												{{ formatEvidenceDirectnessLabel(value) }}
											</option>
										</select>
									</label>

									<label class="field">
										<span class="field-label">Consistency</span>
										<select v-model="source.evidenceProfile.consistency">
											<option
												v-for="value in EVIDENCE_CONSISTENCY_LEVELS"
												:key="value"
												:value="value"
											>
												{{ formatEvidenceConsistencyLabel(value) }}
											</option>
										</select>
									</label>

									<label class="field">
										<span class="field-label">Precision</span>
										<select v-model="source.evidenceProfile.precision">
											<option
												v-for="value in EVIDENCE_PRECISION_LEVELS"
												:key="value"
												:value="value"
											>
												{{ formatEvidencePrecisionLabel(value) }}
											</option>
										</select>
									</label>

									<label class="field">
										<span class="field-label">Exclusion reason</span>
										<select v-model="source.evidenceProfile.inclusion.exclusionReason">
											<option
												v-for="value in EVIDENCE_SOURCE_EXCLUSION_REASONS"
												:key="value || 'none'"
												:value="value"
											>
												{{ formatEvidenceSourceExclusionReasonLabel(value) }}
											</option>
										</select>
									</label>

									<label class="field field--checkbox">
										<input
											v-model="source.evidenceProfile.inclusion.includedInLandscape"
											type="checkbox"
										/>
										<span class="field-label">Count in landscape</span>
									</label>

									<label class="field field--checkbox">
										<input
											v-model="source.evidenceProfile.publicationIntegrity.retracted"
											type="checkbox"
										/>
										<span class="field-label">Retracted / invalid</span>
									</label>

									<label class="field field--checkbox">
										<input
											v-model="source.evidenceProfile.publicationIntegrity.expressionOfConcern"
											type="checkbox"
										/>
										<span class="field-label">Expression of concern</span>
									</label>

									<label class="field field--checkbox">
										<input
											v-model="source.evidenceProfile.publicationIntegrity.correctionOrErratum"
											type="checkbox"
										/>
										<span class="field-label">Correction / erratum</span>
									</label>

									<label class="field field--checkbox">
										<input
											v-model="
												source.evidenceProfile.publicationIntegrity.predatoryOrQuestionableVenue
											"
											type="checkbox"
										/>
										<span class="field-label">Questionable venue</span>
									</label>

									<label class="field">
										<span class="field-label">Integrity checked</span>
										<input
											v-model="
												source.evidenceProfile.publicationIntegrity.citationStatusCheckedAt
											"
											type="date"
										/>
									</label>

									<label class="field field--full">
										<span class="field-label">Key finding</span>
										<textarea v-model="source.evidenceProfile.extraction.keyFinding" rows="3" />
									</label>

									<label class="field field--full">
										<span class="field-label">Limitations</span>
										<textarea v-model="source.evidenceProfile.extraction.limitations" rows="3" />
									</label>

									<label class="field">
										<span class="field-label">Population</span>
										<input v-model="source.evidenceProfile.extraction.population" type="text" />
									</label>

									<label class="field">
										<span class="field-label">Exposure / intervention</span>
										<input
											v-model="source.evidenceProfile.extraction.exposureOrIntervention"
											type="text"
										/>
									</label>

									<label class="field">
										<span class="field-label">Comparator</span>
										<input v-model="source.evidenceProfile.extraction.comparator" type="text" />
									</label>

									<label class="field">
										<span class="field-label">Sample size</span>
										<input v-model="source.evidenceProfile.extraction.sampleSize" type="text" />
									</label>

									<label class="field field--full">
										<span class="field-label">Outcomes (one per line)</span>
										<textarea
											:value="formatLines(source.evidenceProfile.extraction.outcomes)"
											rows="3"
											@input="updateSourceOutcomes(index, $event)"
										/>
									</label>

									<label class="field">
										<span class="field-label">Effect metric</span>
										<input
											v-model="source.evidenceProfile.extraction.effectEstimate.metric"
											type="text"
										/>
									</label>

									<label class="field">
										<span class="field-label">Effect value</span>
										<input
											v-model="source.evidenceProfile.extraction.effectEstimate.value"
											type="text"
										/>
									</label>

									<label class="field">
										<span class="field-label">Confidence interval</span>
										<input
											v-model="
												source.evidenceProfile.extraction.effectEstimate.confidenceInterval
											"
											type="text"
										/>
									</label>

									<label class="field">
										<span class="field-label">P value</span>
										<input
											v-model="source.evidenceProfile.extraction.effectEstimate.pValue"
											type="text"
										/>
									</label>

									<label class="field field--full">
										<span class="field-label">Effect notes</span>
										<textarea
											v-model="source.evidenceProfile.extraction.effectEstimate.notes"
											rows="2"
										/>
									</label>

									<label class="field field--full">
										<span class="field-label">Exclusion notes</span>
										<textarea v-model="source.evidenceProfile.inclusion.exclusionNotes" rows="2" />
									</label>

									<label class="field field--full">
										<span class="field-label">Integrity notes</span>
										<textarea
											v-model="source.evidenceProfile.publicationIntegrity.integrityNotes"
											rows="2"
										/>
									</label>

									<label class="field field--full">
										<span class="field-label">Reviewer notes</span>
										<textarea v-model="source.evidenceProfile.reviewer.notes" rows="2" />
									</label>
								</div>
							</details>

							<button
								class="button button--ghost button--danger"
								type="button"
								@click="removeSource(index)"
							>
								Remove source
							</button>
						</article>
					</div>
				</section>

				<label class="field field--full">
					<span class="field-label">Revision note</span>
					<textarea v-model="form.revisionNote" rows="3" placeholder="What changed in this edit?" />
				</label>

				<p v-if="actionMessage" class="success">{{ actionMessage }}</p>
				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>

				<div class="editor-actions">
					<button class="button button--primary" type="submit" :disabled="saving">
						{{ saving ? "Saving..." : isNew ? "Create draft" : "Save claim" }}
					</button>
					<button
						v-if="!isNew"
						class="button button--ghost"
						type="button"
						:disabled="saving"
						@click="publishClaim"
					>
						Publish
					</button>
					<button
						v-if="!isNew"
						class="button button--ghost button--danger"
						type="button"
						:disabled="saving"
						@click="archiveClaim"
					>
						Archive
					</button>
				</div>
			</form>

			<aside class="revision-panel">
				<div class="section-heading section-heading--tight">
					<div>
						<p class="eyebrow">Revision history</p>
						<h2>Recent snapshots</h2>
					</div>
					<p>Each publish or update records a serialized snapshot of the public claim.</p>
				</div>

				<div v-if="loading" class="empty-state">Loading claim data...</div>
				<div v-else-if="!revisions.length" class="empty-state">No revisions recorded yet.</div>
				<div v-else class="revision-list">
					<article v-for="revision in revisions" :key="revision._id" class="revision-card">
						<p class="revision-card__meta">
							<span>{{ revision.editorModel }}</span>
							<span>{{
								revision.createdAt ? new Date(revision.createdAt).toLocaleString() : "Unknown time"
							}}</span>
						</p>
						<h3>{{ revision.summary || "Revision snapshot" }}</h3>
					</article>
				</div>
			</aside>
		</section>
	</div>
</template>

<style scoped>
.claim-editor-page {
	display: grid;
	gap: 24px;
}

.editor-header,
.locked-panel,
.editor-form,
.revision-panel,
.source-editor,
.revision-card {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.editor-header,
.locked-panel,
.editor-form,
.revision-panel {
	padding: 22px;
}

.editor-header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.editor-header h1,
.locked-panel h2,
.section-heading h2,
.revision-card h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.editor-header h1 {
	margin-top: 8px;
	font-size: var(--consensus-page-title-size);
	line-height: 1;
}

.editor-header p,
.locked-panel p,
.section-heading p,
.empty-state,
.success,
.error,
.revision-card__meta {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.editor-header__actions,
.editor-actions,
.workflow-actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.workflow-actions {
	align-items: center;
	justify-content: flex-end;
}

.editor-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
	align-items: start;
}

.editor-form,
.revision-panel,
.source-list {
	display: grid;
	gap: 16px;
}

.form-grid,
.source-editor__grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.field {
	display: grid;
	gap: 8px;
}

.field--full {
	grid-column: 1 / -1;
}

.field--checkbox {
	grid-auto-flow: column;
	justify-content: start;
	align-items: center;
	gap: 10px;
}

.field-label,
.revision-card__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.field input,
.field textarea,
.field select {
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.field--checkbox input {
	width: auto;
	margin: 0;
}

.sources-panel {
	display: grid;
	gap: 14px;
}

.structured-block,
.structured-list {
	display: grid;
	gap: 14px;
}

.structured-block__header {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	flex-wrap: wrap;
	align-items: end;
}

.structured-block__header p {
	margin: 4px 0 0;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.structured-card {
	padding: 18px;
	border-radius: 18px;
	border: 1px solid var(--consensus-soft-line);
	background: var(--consensus-field-surface);
	display: grid;
	gap: 12px;
}

.status-pill {
	display: inline-flex;
	align-items: center;
	margin: 0;
	padding: 7px 11px;
	border-radius: 999px;
	border: 1px solid color-mix(in srgb, var(--consensus-community) 35%, var(--consensus-line));
	color: var(--consensus-muted);
	font-size: 0.82rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.helper-note {
	margin: 0;
	padding: 14px 16px;
	border-radius: 16px;
	border: 1px solid color-mix(in srgb, var(--consensus-caution) 35%, var(--consensus-soft-line));
	background: color-mix(in srgb, var(--consensus-caution) 10%, var(--consensus-field-surface));
	color: var(--consensus-muted);
	line-height: 1.65;
}

.landscape-snapshot {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.landscape-snapshot article {
	padding: 14px;
	border-radius: 16px;
	border: 1px solid var(--consensus-soft-line);
	background: color-mix(in srgb, var(--consensus-surface) 84%, var(--consensus-field-surface) 16%);
}

.landscape-snapshot strong,
.landscape-snapshot p {
	display: block;
	margin: 6px 0 0;
}

.landscape-snapshot p {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.helper-card {
	display: grid;
	gap: 8px;
	padding: 14px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 16px;
	background: color-mix(in srgb, var(--consensus-surface) 86%, var(--consensus-debate-soft) 14%);
}

.helper-card h3,
.helper-card p {
	margin: 0;
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.plain-list--tight {
	gap: 6px;
}

.structured-card__grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.source-editor,
.revision-card {
	padding: 18px;
}

.source-evidence-profile {
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
	background: color-mix(in srgb, var(--consensus-field-surface) 88%, var(--consensus-surface) 12%);
}

.source-evidence-profile summary {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	cursor: pointer;
	padding: 14px 16px;
	font-weight: 700;
}

.source-evidence-profile summary::marker {
	color: var(--consensus-muted);
}

.source-evidence-profile summary strong {
	color: var(--consensus-muted);
	font-size: 0.9rem;
}

.source-evidence-profile__grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	padding: 0 16px 16px;
}

.revision-list {
	display: grid;
	gap: 12px;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 11px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	background: transparent;
	color: var(--consensus-ink);
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.button--danger {
	border-color: rgba(184, 61, 46, 0.3);
}

.success {
	color: #2f6b4e;
	font-weight: 600;
}

.error {
	color: #b83d2e;
	font-weight: 600;
}

@media (max-width: 980px) {
	.editor-grid {
		grid-template-columns: 1fr;
	}
}

@media (max-width: 720px) {
	.form-grid,
	.source-editor__grid,
	.structured-card__grid,
	.source-evidence-profile__grid,
	.landscape-snapshot {
		grid-template-columns: 1fr;
	}
}
</style>
