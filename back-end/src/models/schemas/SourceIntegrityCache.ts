import type { SourceIntegrityObservation, SourceIntegrityProvider } from "../../utils/sourceIntegrity.js";
import mongoose, { Schema } from "mongoose";
import { SOURCE_INTEGRITY_OUTCOMES, SOURCE_INTEGRITY_PROVIDERS } from "../../utils/sourceIntegrity.js";
import { sourceIntegritySignalSchema } from "./SourceIntegrityCheck.js";

export interface IntegrityCacheEntry {
	_id: string;
	provider: SourceIntegrityProvider;
	doi: string;
	attemptedAt: Date;
	observedAt?: Date;
	retryAt: Date;
	purgeAt: Date;
	observation?: SourceIntegrityObservation;
	diagnosticCode?: string;
	failures: number;
}

const observationSchema = new Schema<SourceIntegrityObservation>({
	provider: { type: String, enum: SOURCE_INTEGRITY_PROVIDERS, required: true },
	doi: { type: String, required: true, maxlength: 240 },
	outcome: { type: String, enum: SOURCE_INTEGRITY_OUTCOMES, required: true },
	suggestedStatus: { type: String, enum: ["corrected", "expression_of_concern", "retracted"] },
	queryUrl: { type: String, maxlength: 1000 },
	providerVersion: { type: String, maxlength: 40 },
	recordIds: { type: [String], default: undefined },
	signals: { type: [sourceIntegritySignalSchema], default: [] },
	statusSources: { type: [String], default: [] }
}, { _id: false, strict: "throw" });

const cacheSchema = new Schema<IntegrityCacheEntry>({
	_id: String,
	provider: { type: String, enum: SOURCE_INTEGRITY_PROVIDERS, required: true },
	doi: { type: String, required: true, maxlength: 240 },
	attemptedAt: { type: Date, required: true },
	observedAt: Date,
	retryAt: { type: Date, required: true },
	purgeAt: { type: Date, required: true },
	observation: observationSchema,
	diagnosticCode: { type: String, maxlength: 120 },
	failures: { type: Number, required: true, min: 0 }
}, { strict: "throw" });
cacheSchema.index({ purgeAt: 1 }, { expireAfterSeconds: 0 });

export const SourceIntegrityCache = mongoose.model("SourceIntegrityCache", cacheSchema);

// Persistent provider cooldowns survive process restarts; the lease coordinates
// applying runs. TTL cleanup must not erase an upstream Retry-After deadline.
const leaseSchema = new Schema({
	_id: String,
	owner: String,
	leaseUntil: Date,
	crossref: Date,
	europepmc: Date
}, { strict: "throw" });
export const SourceIntegrityLease = mongoose.model("SourceIntegrityLease", leaseSchema);
