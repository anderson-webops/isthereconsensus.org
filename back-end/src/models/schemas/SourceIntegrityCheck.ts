import type { Model } from "mongoose";
import type { SourceIntegrityOutcome, SourceIntegrityProvider, SourceIntegritySignal } from "../../utils/sourceIntegrity.js";
import type { ClaimSourceCitationStatus } from "./ClaimSource.js";
import mongoose, { Schema } from "mongoose";
import { SOURCE_INTEGRITY_OUTCOMES, SOURCE_INTEGRITY_PROVIDERS } from "../../utils/sourceIntegrity.js";

export const SOURCE_INTEGRITY_CHECK_RETENTION_SECONDS = 2 * 365 * 24 * 60 * 60;

export interface ISourceIntegrityCheck {
	claim: mongoose.Types.ObjectId;
	source: mongoose.Types.ObjectId;
	provider: SourceIntegrityProvider;
	attemptedAt?: Date;
	providerAttemptedAt?: Date;
	observedAt?: Date;
	cached?: boolean;
	queryUrl?: string;
	providerVersion?: string;
	recordIds?: string[];
	retryAt?: Date;
	doi?: string;
	checkedAt: Date;
	previousStatus: ClaimSourceCitationStatus;
	observedStatus?: ClaimSourceCitationStatus;
	outcome: SourceIntegrityOutcome;
	signals: SourceIntegritySignal[];
	statusSources: string[];
	applied: boolean;
	diagnosticCode?: string;
	createdAt?: Date;
}

export const sourceIntegritySignalSchema = new Schema<SourceIntegritySignal>(
	{
		type: { type: String, required: true, trim: true, maxlength: 64 },
		label: { type: String, default: "", trim: true, maxlength: 160 },
		noticeDoi: { type: String, default: "", trim: true, maxlength: 240 },
		url: { type: String, default: "", trim: true, maxlength: 500 },
		source: { type: String, default: "", trim: true, maxlength: 80 },
		updatedAt: { type: String, default: "", trim: true, maxlength: 40 }
	},
	{ _id: false }
);

const sourceIntegrityCheckSchema = new Schema<ISourceIntegrityCheck>(
	{
		claim: { type: Schema.Types.ObjectId, ref: "Claim", required: true, index: true },
		source: { type: Schema.Types.ObjectId, ref: "ClaimSource", required: true, index: true },
		provider: { type: String, required: true, enum: SOURCE_INTEGRITY_PROVIDERS, index: true },
		doi: { type: String, default: "", trim: true, maxlength: 240, index: true },
		checkedAt: { type: Date, required: true },
		attemptedAt: { type: Date },
		providerAttemptedAt: { type: Date },
		observedAt: { type: Date },
		cached: { type: Boolean },
		queryUrl: { type: String, maxlength: 1000 },
		providerVersion: { type: String, maxlength: 40 },
		recordIds: { type: [String], default: undefined },
		retryAt: { type: Date },
		previousStatus: {
			type: String,
			required: true,
			enum: ["current", "corrected", "retracted", "expression_of_concern"]
		},
		observedStatus: {
			type: String,
			enum: ["current", "corrected", "retracted", "expression_of_concern"]
		},
		outcome: { type: String, required: true, enum: SOURCE_INTEGRITY_OUTCOMES, index: true },
		signals: { type: [sourceIntegritySignalSchema], default: [] },
		statusSources: { type: [String], default: [] },
		applied: { type: Boolean, required: true, default: false },
		diagnosticCode: { type: String, default: "", trim: true, maxlength: 120 }
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

sourceIntegrityCheckSchema.index({ provider: 1, checkedAt: -1, _id: -1 });
sourceIntegrityCheckSchema.index({ checkedAt: -1 });
sourceIntegrityCheckSchema.index({ source: 1, checkedAt: -1 });
sourceIntegrityCheckSchema.index({ outcome: 1, checkedAt: -1 });
sourceIntegrityCheckSchema.index(
	{ createdAt: 1 },
	{ expireAfterSeconds: SOURCE_INTEGRITY_CHECK_RETENTION_SECONDS }
);

export const SourceIntegrityCheck: Model<ISourceIntegrityCheck> = mongoose.model<ISourceIntegrityCheck>(
	"SourceIntegrityCheck",
	sourceIntegrityCheckSchema
);
