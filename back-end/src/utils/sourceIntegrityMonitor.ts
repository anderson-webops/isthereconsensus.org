import type mongoose from "mongoose";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import type { SourceIntegrityObservation } from "./sourceIntegrity.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { SourceIntegrityCheck } from "../models/schemas/SourceIntegrityCheck.js";
import { errorCategory } from "./safeLog.js";
import {
	fetchCrossrefIntegrityObservation,
	normalizeDoi,
	SOURCE_INTEGRITY_CLAIM_STATUSES,
	strongerCitationStatus
} from "./sourceIntegrity.js";

export interface SourceIntegrityMonitorOptions {
	apply: boolean;
	limit: number;
	mailto?: string;
	now?: Date;
	staleDays: number;
	check?: (doi: string) => Promise<SourceIntegrityObservation>;
}

export interface SourceIntegrityMonitorSummary {
	selected: number;
	checked: number;
	noRegisteredUpdate: number;
	flagged: number;
	changed: number;
	unsupported: number;
	errors: number;
	applied: boolean;
}

interface MonitorSource extends Pick<
	IClaimSource,
	"citationStatus" | "doi" | "evidenceProfile" | "statusSources"
> {
	_id: mongoose.Types.ObjectId;
	claim: mongoose.Types.ObjectId;
}

function boundedInteger(value: number, minimum: number, maximum: number) {
	if (!Number.isInteger(value)) throw new Error("Source integrity monitor options must be integers.");
	return Math.min(maximum, Math.max(minimum, value));
}

function uniqueStatusSources(observed: string[], existing: string[] = []) {
	return [...new Set([...observed, ...existing].map(value => value.trim()).filter(Boolean))].slice(0, 6);
}

function integrityNote(observation: SourceIntegrityObservation) {
	const labels = observation.signals.map(signal => signal.label || signal.type.replaceAll("_", " "));
	return `Automated Crossref check found ${[...new Set(labels)].join(", ")}. Human editorial review required.`
		.slice(0, 1000);
}

export function buildSourceIntegrityUpdate(
	source: Pick<MonitorSource, "citationStatus" | "evidenceProfile" | "statusSources">,
	observation: SourceIntegrityObservation,
	checkedAt: Date
) {
	const previousStatus = source.citationStatus ?? "current";
	const nextStatus = strongerCitationStatus(previousStatus, observation.suggestedStatus);
	const statusChanged = nextStatus !== previousStatus;
	const publicationIntegrity = source.evidenceProfile?.publicationIntegrity;
	const update: Record<string, unknown> = {
		"citationCheckedAt": checkedAt,
		"statusSources": uniqueStatusSources(observation.statusSources, source.statusSources),
		"evidenceProfile.publicationIntegrity.citationStatusCheckedAt": checkedAt
	};

	if (observation.suggestedStatus) {
		update.citationStatus = nextStatus;
		update["evidenceProfile.publicationIntegrity.retracted"]
			= publicationIntegrity?.retracted === true || nextStatus === "retracted";
		update["evidenceProfile.publicationIntegrity.expressionOfConcern"]
			= publicationIntegrity?.expressionOfConcern === true || nextStatus === "expression_of_concern";
		update["evidenceProfile.publicationIntegrity.correctionOrErratum"]
			= publicationIntegrity?.correctionOrErratum === true || nextStatus === "corrected";
		if (statusChanged) {
			update["evidenceProfile.publicationIntegrity.integrityNotes"] = integrityNote(observation);
		}
	}

	return {
		previousStatus,
		nextStatus,
		statusChanged,
		update
	};
}

export async function runSourceIntegrityMonitor(options: SourceIntegrityMonitorOptions) {
	const limit = boundedInteger(options.limit, 1, 500);
	const staleDays = boundedInteger(options.staleDays, 1, 3650);
	const now = options.now ?? new Date();
	const staleBefore = new Date(now.getTime() - staleDays * 24 * 60 * 60 * 1000);
	const check = options.check ?? ((doi: string) => fetchCrossrefIntegrityObservation(doi, {
		mailto: options.mailto
	}));
	const monitoredClaimIds = await Claim.distinct("_id", {
		status: { $in: SOURCE_INTEGRITY_CLAIM_STATUSES }
	});
	const candidates = await ClaimSource.find({
		claim: { $in: monitoredClaimIds },
		doi: { $exists: true, $ne: "" },
		$or: [
			{ citationCheckedAt: { $exists: false } },
			{ citationCheckedAt: { $lt: staleBefore } }
		]
	})
		.sort({ citationCheckedAt: 1, _id: 1 })
		.limit(limit)
		.lean() as MonitorSource[];
	const summary: SourceIntegrityMonitorSummary = {
		selected: candidates.length,
		checked: 0,
		noRegisteredUpdate: 0,
		flagged: 0,
		changed: 0,
		unsupported: 0,
		errors: 0,
		applied: options.apply
	};

	for (const source of candidates) {
		const doi = normalizeDoi(source.doi);
		const previousStatus = source.citationStatus ?? "current";
		if (!doi) {
			summary.unsupported += 1;
			if (options.apply) {
				await ClaimSource.updateOne(
					{ _id: source._id },
					{
						$set: {
							"citationCheckedAt": now,
							"evidenceProfile.publicationIntegrity.citationStatusCheckedAt": now
						}
					}
				);
				await SourceIntegrityCheck.create({
					claim: source.claim,
					source: source._id,
					provider: "crossref",
					doi: source.doi,
					checkedAt: now,
					previousStatus,
					outcome: "unsupported",
					signals: [],
					statusSources: [],
					applied: true,
					diagnosticCode: "invalid_doi"
				});
			}
			continue;
		}

		try {
			const observation = await check(doi);
			const sourceUpdate = buildSourceIntegrityUpdate(source, observation, now);
			summary.checked += 1;
			if (observation.outcome === "no_registered_update") summary.noRegisteredUpdate += 1;
			else summary.flagged += 1;
			if (sourceUpdate.statusChanged) summary.changed += 1;

			if (options.apply) {
				await ClaimSource.updateOne({ _id: source._id }, { $set: sourceUpdate.update });
				await SourceIntegrityCheck.create({
					claim: source.claim,
					source: source._id,
					provider: observation.provider,
					doi,
					checkedAt: now,
					previousStatus: sourceUpdate.previousStatus,
					observedStatus: observation.suggestedStatus,
					outcome: observation.outcome,
					signals: observation.signals,
					statusSources: observation.statusSources,
					applied: true
				});
				if (sourceUpdate.statusChanged) {
					await Claim.updateOne(
						{ _id: source.claim, status: "published" },
						{ $set: { nextReviewAt: now } }
					);
				}
			}
		}
		catch (error) {
			summary.errors += 1;
			if (options.apply) {
				await SourceIntegrityCheck.create({
					claim: source.claim,
					source: source._id,
					provider: "crossref",
					doi,
					checkedAt: now,
					previousStatus,
					outcome: "error",
					signals: [],
					statusSources: [],
					applied: false,
					diagnosticCode: errorCategory(error).slice(0, 120)
				});
			}
		}
	}

	return summary;
}
