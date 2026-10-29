import type { TestContext } from "node:test";
import type { SourceIntegrityObservation } from "../src/utils/sourceIntegrity.js";
import type { IntegrityClientResult } from "../src/utils/sourceIntegrityClient.js";
import assert from "node:assert/strict";
import { it } from "node:test";
import mongoose from "mongoose";
import { Claim } from "../src/models/schemas/Claim.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { SourceIntegrityCache } from "../src/models/schemas/SourceIntegrityCache.js";
import { SourceIntegrityCheck } from "../src/models/schemas/SourceIntegrityCheck.js";
import { SourceIntegrityClient } from "../src/utils/sourceIntegrityClient.js";
import { runSourceIntegrityMonitor } from "../src/utils/sourceIntegrityMonitor.js";

const now = new Date("2026-10-28T12:00:00Z");
const observation: SourceIntegrityObservation = {
	provider: "crossref",
	doi: "10.1000/target",
	outcome: "corrected",
	suggestedStatus: "corrected",
	signals: [
		{ type: "correction", url: "https://publisher.example/notice" }
	],
	statusSources: ["https://publisher.example/notice"]
};

function query<Value>(value: Value) {
	return {
		select() { return this; },
		sort() { return this; },
		limit() { return this; },
		maxTimeMS() { return this; },
		async lean() { return value; }
	};
}

function monitorFixture(context: TestContext) {
	const source = {
		...new ClaimSource({
			claim: new mongoose.Types.ObjectId(),
			doi: "10.1000/target",
			citationStatus: "current",
			statusSources: [],
			updatedAt: now
		}).toObject(),
		doi: "10.1000/target",
		updatedAt: now
	};
	const events: string[] = [];
	const audits: Record<string, unknown>[] = [];
	const auditUpdates: unknown[] = [];
	const sourceUpdates: { filter: unknown; update: unknown }[] = [];
	const providerError: { value?: Error } = {};
	let reads = 0;
	const result: IntegrityClientResult = {
		cached: false,
		entry: {
			_id: "fixture-cache",
			provider: "crossref",
			doi: source.doi,
			attemptedAt: now,
			observedAt: now,
			observation,
			failures: 0,
			retryAt: new Date(now.getTime() + 86400000),
			purgeAt: new Date(now.getTime() + 90 * 86400000)
		}
	};
	const fixture = {
		source,
		events,
		audits,
		auditUpdates,
		sourceUpdates,
		providerError,
		matchedCount: 1,
		readSource: (_index: number) => source,
		result
	};
	context.mock.method(Claim, "distinct", () => ({
		async maxTimeMS() { return [source.claim]; }
	}));
	context.mock.method(ClaimSource, "find", () => query([source]));
	context.mock.method(ClaimSource, "findById", () => query(fixture.readSource(reads++)));
	context.mock.method(ClaimSource, "updateOne", async (filter: unknown, update: unknown) => {
		sourceUpdates.push({ filter, update });
		return { matchedCount: fixture.matchedCount };
	});
	context.mock.method(SourceIntegrityCheck, "create", async (audit: Record<string, unknown>) => {
		audits.push(audit);
		return { _id: "fixture-audit" };
	});
	context.mock.method(SourceIntegrityCheck, "updateOne", async (_filter: unknown, update: unknown) => {
		auditUpdates.push(update);
	});
	for (const method of ["open", "renew", "close"] as const) {
		context.mock.method(SourceIntegrityClient.prototype, method, async () => {
			events.push(method);
		});
	}
	context.mock.method(SourceIntegrityClient.prototype, "observe", async () => {
		events.push("observe");
		if (providerError.value) throw providerError.value;
		return fixture.result;
	});
	return fixture;
}

function run(apply = false, clock = () => now) {
	return runSourceIntegrityMonitor({
		apply,
		limit: 10,
		staleDays: 30,
		providers: ["crossref"],
		clock
	});
}

it("previews a correction without writing an audit or source", async (context) => {
	const fixture = monitorFixture(context);
	const summary = await run();
	assert.equal(summary.selected, 1);
	assert.equal(summary.flagged, 1);
	assert.equal(summary.changed, 1);
	assert.equal(summary.applied, false);
	assert.deepEqual(fixture.audits, []);
	assert.deepEqual(fixture.sourceUpdates, []);
	assert.deepEqual(fixture.events, ["open", "renew", "observe", "close"]);
});

it("applies only to the reloaded source identity and records audit application", async (context) => {
	const fixture = monitorFixture(context);
	const summary = await run(true);
	assert.equal(summary.changed, 1);
	assert.equal(summary.conflicts, 0);
	assert.deepEqual(fixture.sourceUpdates[0]?.filter, {
		_id: fixture.source._id,
		doi: fixture.source.doi,
		updatedAt: fixture.source.updatedAt
	});
	assert.equal(fixture.audits[0]?.applied, false);
	assert.deepEqual(fixture.auditUpdates, [
		{
			$set: { applied: true }
		}
	]);
	assert.deepEqual(fixture.events, [
		"open",
		"renew",
		"observe",
		"renew",
		"close"
	]);
});

it("records a competing apply without overwriting it", async (context) => {
	const fixture = monitorFixture(context);
	fixture.matchedCount = 0;
	const summary = await run(true);
	assert.equal(summary.changed, 0);
	assert.equal(summary.conflicts, 1);
	assert.deepEqual(fixture.auditUpdates, [
		{
			$set: { diagnosticCode: "source_changed_during_apply" }
		}
	]);
});

it("preserves an edit made during the provider request", async (context) => {
	const fixture = monitorFixture(context);
	fixture.readSource = index => index === 0
		? fixture.source
		: { ...fixture.source, doi: "10.1000/edited" };
	const summary = await run(true);
	assert.equal(summary.conflicts, 1);
	assert.equal(summary.checked, 0);
	assert.deepEqual(fixture.sourceUpdates, []);
	assert.deepEqual(fixture.audits, []);
});

it("preserves cached provenance and retry semantics", async (context) => {
	const fixture = monitorFixture(context);
	fixture.result.cached = true;
	const summary = await run(true);
	assert.equal(summary.cached, 1);
	assert.equal(fixture.audits[0]?.cached, true);
	assert.deepEqual(fixture.audits[0]?.observedAt, now);
	assert.deepEqual(fixture.audits[0]?.retryAt, new Date(now.getTime() + 30 * 86400000));
});

it("records invalid DOI input without contacting a provider", async (context) => {
	const fixture = monitorFixture(context);
	fixture.source.doi = "invalid";
	const summary = await run(true);
	assert.equal(summary.unsupported, 1);
	assert.equal(fixture.events.includes("observe"), false);
	assert.equal(fixture.audits[0]?.diagnosticCode, "invalid_doi");
	assert.equal(fixture.audits[0]?.queryUrl, undefined);
});

it("defers without writing source or audit state", async (context) => {
	const fixture = monitorFixture(context);
	fixture.result = {
		cached: false,
		deferredUntil: new Date(now.getTime() + 60000)
	};
	const summary = await run(true);
	assert.equal(summary.deferred, 1);
	assert.equal(summary.checked, 0);
	assert.deepEqual(fixture.audits, []);
	assert.deepEqual(fixture.sourceUpdates, []);
});

it("does not advance checked time when the provider has no indexed record", async (context) => {
	const fixture = monitorFixture(context);
	const entry = fixture.result.entry;
	assert.ok(entry);
	entry.observation = {
		...observation,
		outcome: "not_indexed",
		suggestedStatus: undefined,
		signals: [],
		statusSources: []
	};
	const summary = await run(true);
	assert.equal(summary.notIndexed, 1);
	assert.equal(summary.changed, 0);
	assert.deepEqual(fixture.sourceUpdates[0]?.update, {
		$set: {
			"integrityMonitoring.crossref": {
				doi: fixture.source.doi,
				attemptedAt: now,
				retryAt: entry.retryAt,
				outcome: "not_indexed",
				checkedAt: undefined
			}
		},
		$inc: { __v: 1 }
	});
});

it("leaves capacity failures for review without losing existing notices", async (context) => {
	const fixture = monitorFixture(context);
	fixture.source.statusSources = Array.from({ length: 200 }, (_value, index) => `https://publisher.example/previous-${index}`);
	const summary = await run(true);
	assert.equal(summary.errors, 1);
	assert.equal(summary.changed, 0);
	assert.equal(fixture.audits[0]?.diagnosticCode, "notice_capacity_requires_review");
	assert.deepEqual(fixture.audits[0]?.retryAt, new Date(now.getTime() + 86400000));
	assert.deepEqual(fixture.auditUpdates, [
		{
			$set: { applied: false }
		}
	]);
	assert.equal(fixture.source.statusSources.length, 200);
});

it("closes its client when the bounded batch deadline is reached", async (context) => {
	const fixture = monitorFixture(context);
	let ticks = 0;
	const summary = await run(false, () => new Date(now.getTime() + (++ticks >= 4
		? 20 * 60000
		: 0)));
	assert.equal(summary.deadlineReached, true);
	assert.deepEqual(fixture.events, ["open", "close"]);
});

it("closes the client when a provider operation rejects", async (context) => {
	const fixture = monitorFixture(context);
	fixture.providerError.value = new Error("fixture failure");
	await assert.rejects(run(true), /fixture failure/);
	assert.equal(fixture.events.at(-1), "close");
	assert.deepEqual(fixture.sourceUpdates, []);
});

it("caches failures and increases bounded provider backoff on retry", async (context) => {
	let currentTime = now;
	let attempts = 0;
	context.mock.method(SourceIntegrityCache, "findById", () => query(null));
	const client = new SourceIntegrityClient({
		apply: false,
		clock: () => currentTime,
		check: async () => {
			attempts += 1;
			throw new Error("fixture provider unavailable");
		}
	});
	const first = await client.observe(observation.doi, "crossref");
	assert.equal(first.entry?.diagnosticCode, "provider_request_failed");
	assert.equal(first.entry?.failures, 1);
	assert.deepEqual(first.entry?.retryAt, new Date(now.getTime() + 15 * 60000));
	assert.equal((await client.observe(observation.doi, "crossref")).cached, true);
	assert.equal(attempts, 1);
	currentTime = new Date(now.getTime() + 15 * 60000 + 1);
	const repeated = await client.observe(observation.doi, "crossref");
	assert.equal(attempts, 2);
	assert.equal(repeated.entry?.failures, 2);
	assert.deepEqual(repeated.entry?.retryAt, new Date(currentTime.getTime() + 30 * 60000));
	assert.deepEqual(repeated.entry?.purgeAt, new Date(currentTime.getTime() + 90 * 86400000));
});

it("retains provider identity failures as retryable diagnostics", async (context) => {
	context.mock.method(SourceIntegrityCache, "findById", () => query(null));
	const client = new SourceIntegrityClient({
		apply: false,
		clock: () => now,
		check: async () => ({ ...observation, doi: "10.1000/other" })
	});
	const result = await client.observe(observation.doi, "crossref");
	assert.equal(result.entry?.diagnosticCode, "identity_mismatch");
	assert.equal(result.entry?.observation, undefined);
	assert.deepEqual(result.entry?.retryAt, new Date(now.getTime() + 15 * 60000));
});
