import type { IClaim, IClaimEvidenceLandscape } from "../models/schemas/Claim.js";

export interface PublicEvidenceLandscape {
	schemaVersion: number;
	claimType: IClaimEvidenceLandscape["claimType"];
	supportLabel: IClaimEvidenceLandscape["supportLabel"];
	supportScore?: number | null;
	evidenceDirection: IClaimEvidenceLandscape["evidenceDirection"];
	evidenceCertainty: IClaimEvidenceLandscape["evidenceCertainty"];
	expertAgreement: IClaimEvidenceLandscape["expertAgreement"];
	plainLanguageAnswer?: string;
	oneSentenceSummary?: string;
	confidenceStatement?: string;
	caveatSummary?: string;
	disagreementSummary?: string;
	credibleMinorityViewSummary?: string;
	fringeOrUnsupportedViewSummary?: string;
	whatWouldChangeThis?: string;
	boundaryConditions: IClaimEvidenceLandscape["boundaryConditions"];
	applicability: IClaimEvidenceLandscape["applicability"];
	distribution: IClaimEvidenceLandscape["distribution"];
	evidenceBaseSize: IClaimEvidenceLandscape["evidenceBaseSize"];
	publicFlags: {
		showCredibleMinorityView: boolean;
		showFalseBalanceWarning: boolean;
		medicalOrPublicHealthSensitive: boolean;
		requiresProfessionalContext: boolean;
	};
	lastAssessedAt?: Date;
	nextReviewDueAt?: Date;
	workflow: {
		status: "published";
		lastAssessedAt?: Date;
		nextReviewDueAt?: Date;
	};
}

export function toPublicEvidenceLandscape(
	claim: Partial<IClaim> | null | undefined
): PublicEvidenceLandscape | undefined {
	const landscape = claim?.evidenceLandscape;
	if (!landscape?.publicFlags?.showEvidenceLandscape || landscape.workflow?.status !== "published") {
		return undefined;
	}

	const showCredibleMinorityView = !!landscape.publicFlags.showCredibleMinorityView;
	const showFalseBalanceWarning = !!landscape.publicFlags.showFalseBalanceWarning;

	return {
		schemaVersion: landscape.schemaVersion,
		claimType: landscape.claimType,
		supportLabel: landscape.supportLabel,
		supportScore: landscape.supportScore,
		evidenceDirection: landscape.evidenceDirection,
		evidenceCertainty: landscape.evidenceCertainty,
		expertAgreement: landscape.expertAgreement,
		plainLanguageAnswer: landscape.plainLanguageAnswer,
		oneSentenceSummary: landscape.oneSentenceSummary,
		confidenceStatement: landscape.confidenceStatement,
		caveatSummary: landscape.caveatSummary,
		disagreementSummary: landscape.disagreementSummary,
		credibleMinorityViewSummary: showCredibleMinorityView
			? landscape.credibleMinorityViewSummary
			: undefined,
		fringeOrUnsupportedViewSummary: showFalseBalanceWarning
			? landscape.fringeOrUnsupportedViewSummary
			: undefined,
		whatWouldChangeThis: landscape.whatWouldChangeThis,
		boundaryConditions: landscape.boundaryConditions ?? [],
		applicability: landscape.applicability,
		distribution: landscape.distribution,
		evidenceBaseSize: landscape.evidenceBaseSize,
		publicFlags: {
			showCredibleMinorityView,
			showFalseBalanceWarning,
			medicalOrPublicHealthSensitive: !!landscape.publicFlags.medicalOrPublicHealthSensitive,
			requiresProfessionalContext: !!landscape.publicFlags.requiresProfessionalContext
		},
		lastAssessedAt: landscape.workflow.lastAssessedAt,
		nextReviewDueAt: landscape.workflow.nextReviewDueAt,
		workflow: {
			status: "published",
			lastAssessedAt: landscape.workflow.lastAssessedAt,
			nextReviewDueAt: landscape.workflow.nextReviewDueAt
		}
	};
}
