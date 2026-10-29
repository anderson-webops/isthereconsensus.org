import type mongoose from "mongoose";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import type { SourceIntegrityObservation, SourceIntegrityOutcome, SourceIntegrityProvider } from "./sourceIntegrity.js";
import type { IntegrityClientResult } from "./sourceIntegrityClient.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { SourceIntegrityCheck } from "../models/schemas/SourceIntegrityCheck.js";
import { europePmcIntegrityUrl } from "./europePmcIntegrity.js";
import {
	crossrefIntegrityUrl,
	IntegrityProviderError,
	normalizeDoi,
	SOURCE_INTEGRITY_CLAIM_STATUSES,
	SOURCE_INTEGRITY_PROVIDERS,
	statusForUpdateType,
	strongerCitationStatus
} from "./sourceIntegrity.js";
import { SourceIntegrityClient } from "./sourceIntegrityClient.js";

const DAY = 24 * 60 * 60 * 1000;
export interface SourceIntegrityMonitorOptions {
	apply: boolean;
	limit: number;
	mailto?: string;
	now?: Date;
	clock?: () => Date;
	staleDays: number;
	providers?: SourceIntegrityProvider[];
	check?: (doi: string, provider: SourceIntegrityProvider) => Promise<SourceIntegrityObservation>;
	sleep?: (milliseconds: number) => Promise<unknown>;
}

export interface SourceIntegrityMonitorSummary {
	selected: number;
	checked: number;
	noRegisteredUpdate: number;
	notIndexed: number;
	flagged: number;
	changed: number;
	unsupported: number;
	errors: number;
	cached: number;
	deferred: number;
	conflicts: number;
	applied: boolean;
	deadlineReached: boolean;
}

interface MonitorSource extends IClaimSource {
	_id: mongoose.Types.ObjectId;
	claim: mongoose.Types.ObjectId;
	updatedAt?: Date;
}

function boundedInteger(value: number, minimum: number, maximum: number) {
	if (!Number.isSafeInteger(value) || value < minimum || value > maximum) {
		throw new Error(`Source integrity option must be an integer from ${minimum} to ${maximum}.`);
	}
	return value;
}

// Append only actual notice links, not rotating provider query URLs. Existing
// human provenance is retained. Never silently truncate a new notice or churn
// the queue's assessed snapshot when a routine check is repeated.
function uniqueStatusSources(observation: SourceIntegrityObservation, existing: string[] = []) {
	const notices = observation.signals.map(signal => signal.url).filter((value): value is string => Boolean(value));
	const values = [
		...new Set([
			...existing,
			...notices
		])
	];
	if (values.length > 200) throw new IntegrityProviderError("notice_capacity_requires_review");
	return values;
}

export function buildSourceIntegrityUpdate(
	source: Pick<MonitorSource, "citationStatus" | "evidenceProfile" | "statusSources" | "citationCheckedAt">,
	observation: SourceIntegrityObservation,
	checkedAt: Date
) {
	const previousStatus = source.citationStatus ?? "current";
	const nextStatus = strongerCitationStatus(previousStatus, observation.suggestedStatus);
	const statusChanged = nextStatus !== previousStatus;
	const publicationIntegrity = source.evidenceProfile?.publicationIntegrity;
	const later = (previous?: Date) => previous && previous > checkedAt
		? previous
		: checkedAt;
	const update: Record<string, unknown> = {};
	if (observation.outcome !== "not_indexed") {
		update.citationCheckedAt = later(source.citationCheckedAt);
		update["evidenceProfile.publicationIntegrity.citationStatusCheckedAt"]
			= later(publicationIntegrity?.citationStatusCheckedAt);
	}
	if (observation.suggestedStatus) {
		update.statusSources = uniqueStatusSources(observation, source.statusSources);
		update.citationStatus = nextStatus;
		const observed = new Set(observation.signals.map(signal => statusForUpdateType(signal.type)));
		update["evidenceProfile.publicationIntegrity.retracted"]
			= publicationIntegrity?.retracted === true || nextStatus === "retracted" || observed.has("retracted");
		update["evidenceProfile.publicationIntegrity.expressionOfConcern"]
			= publicationIntegrity?.expressionOfConcern === true || nextStatus === "expression_of_concern" || observed.has("expression_of_concern");
		update["evidenceProfile.publicationIntegrity.correctionOrErratum"]
			= publicationIntegrity?.correctionOrErratum === true || nextStatus === "corrected" || observed.has("corrected");
	}
	return {
		previousStatus,
		nextStatus,
		statusChanged,
		update
	};
}

export function integrityProviderDueFilter(provider: SourceIntegrityProvider, now: Date, staleDays = 30) {
	const path = `integrityMonitoring.${provider}`;
	return {
		$or: [
			{
				[`${path}.retryAt`]: { $exists: false }
			},
			{
				[`${path}.retryAt`]: { $lte: now }
			},
			{
				[`${path}.outcome`]: {
					$in: [
						"no_registered_update",
						"corrected",
						"expression_of_concern",
						"retracted"
					]
				},
				[`${path}.checkedAt`]: {
					$lt: new Date(now.getTime() - staleDays * DAY)
				}
			},
			{
				$expr: {
					$ne: [`$${path}.doi`, "$doi"]
				}
			}
		]
	};
}

interface MonitorContext {
	apply: boolean;
	staleDays: number;
	clock: () => Date;
	client: SourceIntegrityClient;
	summary: SourceIntegrityMonitorSummary;
}

function sourceProviderDue(source: MonitorSource, provider: SourceIntegrityProvider, context: MonitorContext) {
	const progress = source.integrityMonitoring?.[provider];
	const successfulProgress = progress && [
		"no_registered_update",
		"corrected",
		"expression_of_concern",
		"retracted"
	].includes(progress.outcome);
	const stale = successfulProgress && progress.checkedAt && progress.checkedAt.getTime() < context.clock().getTime() - context.staleDays * DAY;
	return !(progress && progress.doi === source.doi && progress.retryAt > context.clock() && !stale);
}

function monitorObservationState(
	source: MonitorSource,
	doi: string,
	result: IntegrityClientResult | undefined,
	attemptedAt: Date,
	staleDays: number
) {
	const entry = result?.entry;
	const observation = entry?.observation;
	let diagnosticCode = !doi
		? "invalid_doi"
		: entry?.diagnosticCode;
	let outcome: SourceIntegrityOutcome = !doi
		? "unsupported"
		: observation?.outcome ?? "error";
	const successful = observation && outcome !== "not_indexed";
	const observedAt = entry?.observedAt;
	let retryAt = new Date((successful ? observedAt! : attemptedAt).getTime() + staleDays * DAY);
	if (!successful && entry) retryAt = entry.retryAt;
	let sourceUpdate: ReturnType<typeof buildSourceIntegrityUpdate> | undefined;
	try {
		if (observation && observedAt) sourceUpdate = buildSourceIntegrityUpdate(source, observation, observedAt);
	}
	catch (error) {
		if (!(error instanceof IntegrityProviderError)) throw error;
		diagnosticCode = error.code;
		outcome = "error";
		retryAt = new Date(attemptedAt.getTime() + DAY);
	}
	return {
		entry,
		observation,
		diagnosticCode,
		outcome,
		successful,
		observedAt,
		retryAt,
		sourceUpdate,
		cached: result?.cached ?? false
	};
}

type MonitorObservationState = ReturnType<typeof monitorObservationState>;

function recordMonitorOutcome(summary: SourceIntegrityMonitorSummary, state: MonitorObservationState, cached = false) {
	if (cached) summary.cached += 1;
	switch (state.outcome) {
		case "unsupported":
			summary.unsupported += 1;
			break;
		case "error":
			summary.errors += 1;
			break;
		case "not_indexed":
			summary.notIndexed += 1;
			break;
		default:
			summary.checked += 1;
			if (state.outcome === "no_registered_update") summary.noRegisteredUpdate += 1;
			else summary.flagged += 1;
	}
}

function monitorQueryUrl(doi: string, provider: SourceIntegrityProvider) {
	if (!doi) return undefined;
	return (provider === "crossref"
		? crossrefIntegrityUrl(doi)
		: europePmcIntegrityUrl(doi)).toString();
}

function monitoringCheckedAt(source: MonitorSource, provider: SourceIntegrityProvider, state: MonitorObservationState) {
	if (state.successful && state.outcome !== "error") return state.observedAt;
	const previous = source.integrityMonitoring?.[provider];
	return previous?.doi === source.doi
		? previous?.checkedAt
		: undefined;
}

async function applyMonitorObservation(
	source: MonitorSource,
	provider: SourceIntegrityProvider,
	doi: string,
	attemptedAt: Date,
	state: MonitorObservationState,
	context: MonitorContext
) {
	const { entry, observation, diagnosticCode, outcome, observedAt, retryAt, sourceUpdate } = state;
	const audit = await SourceIntegrityCheck.create({
		claim: source.claim,
		source: source._id,
		provider,
		doi: doi || source.doi,
		checkedAt: attemptedAt,
		attemptedAt,
		providerAttemptedAt: entry?.attemptedAt,
		observedAt,
		retryAt,
		cached: state.cached,
		previousStatus: source.citationStatus ?? "current",
		observedStatus: observation?.suggestedStatus,
		outcome,
		signals: observation?.signals ?? [],
		statusSources: observation?.statusSources ?? [],
		queryUrl: monitorQueryUrl(doi, provider),
		providerVersion: observation?.providerVersion,
		recordIds: observation?.recordIds,
		diagnosticCode,
		applied: false
	});
	await context.client.renew();
	const updateResult = await ClaimSource.updateOne({
		_id: source._id,
		doi: source.doi,
		updatedAt: source.updatedAt ?? { $exists: false }
	}, {
		$set: {
			...sourceUpdate?.update,
			[`integrityMonitoring.${provider}`]: {
				doi: source.doi,
				attemptedAt,
				retryAt,
				outcome,
				checkedAt: monitoringCheckedAt(source, provider, state)
			}
		},
		$inc: { __v: 1 }
	}, { runValidators: true });
	if (updateResult.matchedCount !== 1) {
		context.summary.conflicts += 1;
		await SourceIntegrityCheck.updateOne({ _id: audit._id }, {
			$set: { diagnosticCode: "source_changed_during_apply" }
		});
		return;
	}
	if (sourceUpdate?.statusChanged) context.summary.changed += 1;
	await SourceIntegrityCheck.updateOne({ _id: audit._id }, {
		$set: {
			applied: Boolean(sourceUpdate)
		}
	});
}

async function monitorCandidate(candidate: MonitorSource, provider: SourceIntegrityProvider, context: MonitorContext) {
	await context.client.renew();
	let source = await ClaimSource.findById(candidate._id).select("+integrityMonitoring").maxTimeMS(5000).lean() as MonitorSource | null;
	if (!source || source.doi !== candidate.doi) {
		context.summary.conflicts += 1;
		return;
	}
	if (!sourceProviderDue(source, provider, context)) return;
	const attemptedAt = context.clock();
	const doi = normalizeDoi(source.doi);
	const result = doi
		? await context.client.observe(doi, provider)
		: undefined;
	if (result?.deferredUntil) {
		context.summary.deferred += 1;
		return;
	}
	// Reload after the network request to preserve edits made while waiting.
	source = await ClaimSource.findById(candidate._id).select("+integrityMonitoring").maxTimeMS(5000).lean() as MonitorSource | null;
	if (!source || source.doi !== candidate.doi) {
		context.summary.conflicts += 1;
		return;
	}
	const state = monitorObservationState(source, doi, result, attemptedAt, context.staleDays);
	recordMonitorOutcome(context.summary, state, result?.cached);
	if (!context.apply) {
		if (state.sourceUpdate?.statusChanged) context.summary.changed += 1;
		return;
	}
	await applyMonitorObservation(source, provider, doi, attemptedAt, state, context);
}

export async function runSourceIntegrityMonitor(options: SourceIntegrityMonitorOptions) {
	const limit = boundedInteger(options.limit, 1, 500);
	const staleDays = boundedInteger(options.staleDays, 1, 3650);
	const providers = [
		...new Set(options.providers ?? SOURCE_INTEGRITY_PROVIDERS)
	];
	if (!providers.length || providers.some(provider => !SOURCE_INTEGRITY_PROVIDERS.includes(provider))) {
		throw new Error("Select Crossref, Europe PMC, or both providers.");
	}
	const clock = options.clock ?? (() => options.now ?? new Date());
	if (!Number.isFinite(clock().getTime())) throw new TypeError("Invalid monitor date.");
	const deadline = clock().getTime() + 20 * 60 * 1000;
	const client = new SourceIntegrityClient({ ...options, clock });
	const summary: SourceIntegrityMonitorSummary = {
		selected: 0,
		checked: 0,
		noRegisteredUpdate: 0,
		notIndexed: 0,
		flagged: 0,
		changed: 0,
		unsupported: 0,
		errors: 0,
		cached: 0,
		deferred: 0,
		conflicts: 0,
		applied: options.apply,
		deadlineReached: false
	};
	const context = {
		apply: options.apply,
		staleDays,
		clock,
		client,
		summary
	};
	await client.open();
	try {
		const monitoredClaimIds = await Claim.distinct("_id", {
			status: { $in: SOURCE_INTEGRITY_CLAIM_STATUSES }
		}).maxTimeMS(5000);
		const candidates = await ClaimSource.find({
			claim: { $in: monitoredClaimIds },
			doi: { $exists: true, $ne: "" },
			$or: providers.map(provider => integrityProviderDueFilter(provider, clock(), staleDays))
		}).select("+integrityMonitoring").sort({ _id: 1 }).limit(limit).maxTimeMS(5000).lean() as MonitorSource[];
		summary.selected = candidates.length;
		for (const candidate of candidates) {
			for (const provider of providers) {
				if (clock().getTime() >= deadline) {
					summary.deadlineReached = true;
					return summary;
				}
				await monitorCandidate(candidate, provider, context);
			}
		}
		return summary;
	}
	finally { await client.close(); }
}
