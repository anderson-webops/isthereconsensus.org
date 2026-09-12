import type { IntegrityCacheEntry } from "../models/schemas/SourceIntegrityCache.js";
import type { SourceIntegrityObservation, SourceIntegrityProvider } from "./sourceIntegrity.js";
import { createHash, randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { SourceIntegrityCache, SourceIntegrityLease } from "../models/schemas/SourceIntegrityCache.js";
import { fetchEuropePmcIntegrityObservation } from "./europePmcIntegrity.js";
import { fetchCrossrefIntegrityObservation, IntegrityProviderError } from "./sourceIntegrity.js";

const DAY = 24 * 60 * 60 * 1000;
const MINIMUM_INTERVAL = 1000;
export const SOURCE_INTEGRITY_CACHE_VERSION = 1;

export interface IntegrityClientOptions {
	apply: boolean;
	clock: () => Date;
	mailto?: string;
	check?: (doi: string, provider: SourceIntegrityProvider) => Promise<SourceIntegrityObservation>;
	sleep?: (milliseconds: number) => Promise<unknown>;
}

export interface IntegrityClientResult {
	entry?: IntegrityCacheEntry;
	cached: boolean;
	deferredUntil?: Date;
}

export function integrityCacheId(provider: SourceIntegrityProvider, doi: string) {
	return createHash("sha256").update(`${SOURCE_INTEGRITY_CACHE_VERSION}:${provider}:${doi}`).digest("hex");
}

export class SourceIntegrityClient {
	private owner = randomUUID();
	private cache = new Map<string, IntegrityCacheEntry>();
	private nextRequest: Partial<Record<SourceIntegrityProvider, Date>> = {};
	constructor(private options: IntegrityClientOptions) {}

	async open() {
		const now = this.options.clock();
		if (this.options.apply) {
			try {
				await SourceIntegrityLease.updateOne({ _id: "monitor" }, {
					$setOnInsert: { leaseUntil: new Date(0) }
				}, { upsert: true });
			}
			catch (error) {
				if ((error as { code?: number }).code !== 11000) throw error;
			}
			const acquired = await SourceIntegrityLease.updateOne({ _id: "monitor", leaseUntil: { $lte: now } }, {
				$set: { owner: this.owner, leaseUntil: new Date(now.getTime() + 60_000) }
			});
			if (acquired.modifiedCount !== 1) throw new IntegrityProviderError("monitor_already_running");
		}
		const state = await SourceIntegrityLease.findById("monitor").maxTimeMS(5000).lean();
		if (!this.options.apply && state?.owner && state.leaseUntil && state.leaseUntil > now) {
			throw new IntegrityProviderError("monitor_already_running");
		}
		this.nextRequest = { crossref: state?.crossref ?? undefined, europepmc: state?.europepmc ?? undefined };
	}

	async renew() {
		if (!this.options.apply) return;
		const now = this.options.clock();
		const result = await SourceIntegrityLease.updateOne({
			_id: "monitor",
			owner: this.owner,
			leaseUntil: { $gt: now }
		}, { $set: { leaseUntil: new Date(now.getTime() + 60_000) } });
		if (result.matchedCount !== 1) throw new IntegrityProviderError("monitor_lease_lost");
	}

	async close() {
		if (this.options.apply) {
			await SourceIntegrityLease.updateOne({ _id: "monitor", owner: this.owner }, {
				$set: { leaseUntil: new Date(0) },
				$unset: { owner: 1 }
			});
		}
	}

	async observe(doi: string, provider: SourceIntegrityProvider): Promise<IntegrityClientResult> {
		await this.renew();
		const id = integrityCacheId(provider, doi);
		const now = this.options.clock();
		const cached = this.cache.get(id) ?? await SourceIntegrityCache.findById(id).maxTimeMS(5000).lean();
		if (cached && cached.retryAt > now) {
			this.cache.set(id, cached);
			return { entry: cached, cached: true };
		}
		const next = this.nextRequest[provider];
		if (next && next.getTime() - now.getTime() > MINIMUM_INTERVAL) {
			return { deferredUntil: next, cached: false };
		}
		if (next && next > now) await (this.options.sleep ?? delay)(next.getTime() - now.getTime());
		const attemptedAt = this.options.clock();
		let entry: IntegrityCacheEntry;
		try {
			const observation = await (this.options.check
				? this.options.check(doi, provider)
				: provider === "crossref"
					? fetchCrossrefIntegrityObservation(doi, { mailto: this.options.mailto })
					: fetchEuropePmcIntegrityObservation(doi));
			if (observation.provider !== provider || observation.doi !== doi) {
				throw new IntegrityProviderError("identity_mismatch");
			}
			const observedAt = this.options.clock();
			entry = {
				_id: id,
				provider,
				doi,
				attemptedAt,
				observedAt,
				observation,
				failures: 0,
				retryAt: new Date(observedAt.getTime() + (observation.outcome === "not_indexed" ? 7 * DAY : DAY)),
				purgeAt: new Date(observedAt.getTime() + 90 * DAY)
			};
			this.nextRequest[provider] = new Date(observedAt.getTime() + MINIMUM_INTERVAL);
		}
		catch (error) {
			const failedAt = this.options.clock();
			const failures = Math.min((cached?.failures ?? 0) + 1, 8);
			const retryMs = Math.max(
				Math.min(15 * 60 * 1000 * 2 ** (failures - 1), DAY),
				error instanceof IntegrityProviderError ? error.retryAfterMs : 0
			);
			entry = {
				_id: id,
				provider,
				doi,
				attemptedAt,
				failures,
				diagnosticCode: error instanceof IntegrityProviderError ? error.code : "provider_request_failed",
				retryAt: new Date(failedAt.getTime() + retryMs),
				purgeAt: new Date(failedAt.getTime() + 90 * DAY)
			};
			// Stop this provider's batch on failure; the other provider can continue.
			this.nextRequest[provider] = entry.retryAt;
		}
		await this.renew();
		if (this.options.apply) {
			const retained = await SourceIntegrityLease.updateOne({ _id: "monitor", owner: this.owner }, {
				$set: { [provider]: this.nextRequest[provider] }
			}).maxTimeMS(5000);
			if (retained.matchedCount !== 1) throw new IntegrityProviderError("monitor_lease_lost");
			await SourceIntegrityCache.replaceOne({ _id: id }, entry, { upsert: true, runValidators: true }).maxTimeMS(5000);
		}
		this.cache.set(id, entry);
		return { entry, cached: false };
	}
}
