import type { IClaim, IClaimEvidenceLandscape } from "../models/schemas/Claim.js";

export interface PublicEvidenceLandscape {
	schemaVersion: number;
	supportLabel: IClaimEvidenceLandscape["supportLabel"];
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
	publicFlags: {
		showCredibleMinorityView: boolean;
		showFalseBalanceWarning: boolean;
	};
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
		supportLabel: landscape.supportLabel,
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
		publicFlags: {
			showCredibleMinorityView,
			showFalseBalanceWarning
		},
		workflow: {
			status: "published",
			lastAssessedAt: landscape.workflow.lastAssessedAt,
			nextReviewDueAt: landscape.workflow.nextReviewDueAt
		}
	};
}
