import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { europePmcIntegrityUrl, parseEuropePmcIntegrityResponse } from "../src/utils/europePmcIntegrity.js";
import { normalizeDoi, parseCrossrefIntegrityResponse, requireIntegrityResponse, retryAfterMilliseconds } from "../src/utils/sourceIntegrity.js";
import { buildSourceIntegrityUpdate, runSourceIntegrityMonitor } from "../src/utils/sourceIntegrityMonitor.js";

const fixtures = JSON.parse(readFileSync(new URL("./fixtures/europepmc-integrity.json", import.meta.url), "utf8"));
const original = fixtures.find((fixture: any) => fixture.url.includes("DOI%3A"));
function payload(records = original.records) {
	return { version: "6.9", hitCount: records.length, resultList: { result: records } };
}

describe("Europe PMC complementary metadata", () => {
	it("interprets a verified original's incoming notices and preserves both independent flags", () => {
		const observation = parseEuropePmcIntegrityResponse(payload(), original.records[0].doi);
		assert.equal(observation.provider, "europepmc");
		assert.equal(observation.outcome, "retracted");
		assert.equal(observation.providerVersion, "6.9");
		assert.deepEqual(observation.recordIds, ["MED:12145110"]);
		assert.deepEqual(observation.signals.map(signal => signal.type), ["expression_of_concern", "retraction"]);
		assert.ok(observation.statusSources.includes("https://europepmc.org/article/MED/36216386"));
		const before = { citationStatus: "current" as const, evidenceProfile: { publicationIntegrity: { integrityNotes: "Existing human appraisal", correctionOrErratum: true } } as any };
		const result = buildSourceIntegrityUpdate(before, observation, new Date());
		assert.equal(result.update["evidenceProfile.publicationIntegrity.retracted"], true);
		assert.equal(result.update["evidenceProfile.publicationIntegrity.expressionOfConcern"], true);
		assert.equal(result.update["evidenceProfile.publicationIntegrity.correctionOrErratum"], true);
		assert.equal(result.update["evidenceProfile.publicationIntegrity.integrityNotes"], undefined);
	});

	it("does not mistake a retraction or concern notice for its affected paper", () => {
		for (const fixture of fixtures.filter((fixture: any) => fixture.records[0].id !== "12145110")) {
			const observation = parseEuropePmcIntegrityResponse(payload(fixture.records), fixture.records[0].doi);
			assert.notEqual(observation.suggestedStatus, "retracted");
			assert.notEqual(observation.suggestedStatus, "expression_of_concern");
		}
	});

	it("handles an erratum on a notice as a correction of that notice", () => {
		const record = { id: "42", source: "MED", doi: "10.1000/notice", pubTypeList: { pubType: ["Retraction of Publication"] }, commentCorrectionList: { commentCorrection: [
			{ type: "Retraction of", id: "40", source: "MED" },
			{ type: "Erratum in", id: "43", source: "MED" }
		] } };
		const result = parseEuropePmcIntegrityResponse(payload([record]), record.doi);
		assert.equal(result.outcome, "corrected");
		assert.equal(result.signals.length, 1);
	});

	it("separates not indexed from no registered update and advances no public date", () => {
		const observation = parseEuropePmcIntegrityResponse(payload([]), "10.1000/absent");
		assert.equal(observation.outcome, "not_indexed");
		const result = buildSourceIntegrityUpdate({ evidenceProfile: {} as any }, observation, new Date());
		assert.deepEqual(result.update, {});
		const indexed = parseEuropePmcIntegrityResponse(payload([{ id: "1", source: "MED", doi: "10.1000/clear" }]), "10.1000/clear");
		assert.equal(indexed.outcome, "no_registered_update");
		assert.equal(indexed.suggestedStatus, undefined);
	});

	it("rejects mismatched, malformed, partial and oversized results rather than reporting absence", () => {
		for (const bad of [null, {}, { hitCount: 0 }, { ...payload([]), hitCount: 1 }, { ...payload([]), hitCount: -1 }, payload([{ ...original.records[0], doi: "10.1000/other" }]), payload([{ ...original.records[0], commentCorrectionList: {} }]), payload([{ ...original.records[0], pubTypeList: { pubType: [null] } }]), payload(Array.from({ length: 101 }).fill(original.records[0]))]) {
			assert.throws(() => parseEuropePmcIntegrityResponse(bad, original.records[0].doi));
		}
		for (const bad of [null, {}, { message: {} }, { status: "error", message: { items: [] } }, { message: { items: [null] } }, { message: { items: [{ DOI: "10.1000/notice" }] } }, { message: { items: [{ "DOI": "10.1000/notice", "update-to": [{ DOI: "10.1000/other", type: "retraction" }] }] } }, { message: { "total-results": 1, "items": [] } }]) {
			assert.throws(() => parseCrossrefIntegrityResponse(bad, "10.1000/target"));
		}
	});

	it("keeps query syntax bounded and avoids truncating an identifier into a different DOI", () => {
		assert.equal(normalizeDoi(`10.1000/${"a".repeat(250)}`), "");
		assert.equal(normalizeDoi("10.1000/x\" OR *:*"), "");
		assert.equal(normalizeDoi("10.1000/x\\y"), "");
		assert.equal(europePmcIntegrityUrl("doi: 10.1000/ABC").searchParams.get("query"), "DOI:\"10.1000/abc\"");
	});

	it("preserves stable notice provenance on repeated checks and does not reduce a check date", () => {
		const observation = parseEuropePmcIntegrityResponse(payload(), original.records[0].doi);
		const newer = new Date("2026-09-12T12:00:00Z");
		const result = buildSourceIntegrityUpdate({ citationStatus: "retracted", citationCheckedAt: newer, evidenceProfile: {} as any, statusSources: ["https://publisher.example/manual", ...observation.signals.map(signal => signal.url!)] }, observation, new Date("2026-09-11"));
		assert.equal(result.update.citationCheckedAt, newer);
		assert.deepEqual(result.update.statusSources, ["https://publisher.example/manual", ...observation.signals.map(signal => signal.url!)]);
		assert.throws(() => buildSourceIntegrityUpdate({ evidenceProfile: {} as any, statusSources: Array.from({ length: 200 }, (_, i) => `https://example.org/${i}`) }, observation, newer), /notice_capacity_requires_review/);
	});

	it("classifies HTTP errors before parsing HTML bodies and bounds upstream retry instructions", () => {
		assert.throws(() => requireIntegrityResponse(new Response("<html>Busy</html>", { status: 429, headers: { "Retry-After": "120" } })), (error: any) => error.code === "http_429" && error.retryAfterMs === 120000);
		assert.equal(retryAfterMilliseconds("garbage"), 0);
		assert.equal(retryAfterMilliseconds("99999999999999"), 86400000);
		assert.equal(retryAfterMilliseconds("Sat, 12 Sep 2026 13:00:00 GMT", Date.parse("2026-09-12T12:00:00Z")), 3600000);
	});
});

describe("bounded integrity transport", () => {
	it("cancels a declared oversized body without reading it", async () => {
		let cancelled = false;
		const originalFetch = globalThis.fetch;
		globalThis.fetch = async () => new Response(new ReadableStream({ cancel() {
			cancelled = true;
		} }), { headers: { "content-length": "2097153" } });
		try {
			const { fetchJsonBounded } = await import("../src/utils/boundedFetch.js");
			await assert.rejects(fetchJsonBounded("https://fixture.invalid", {}, { maxBytes: 2097152 }), /exceeded/);
			assert.equal(cancelled, true);
		}
		finally { globalThis.fetch = originalFetch; }
	});

	it("bounds streamed bodies without trusting Content-Length and cancels HTML errors", async () => {
		const originalFetch = globalThis.fetch;
		let cancelled = 0;
		globalThis.fetch = async () => new Response(new ReadableStream({
			pull(controller) { controller.enqueue(new TextEncoder().encode("1234567890")); },
			cancel() {
				cancelled += 1;
			}
		}));
		try {
			const { fetchJsonBounded } = await import("../src/utils/boundedFetch.js");
			await assert.rejects(fetchJsonBounded("https://fixture.invalid", {}, { maxBytes: 15 }), /exceeded/);
			assert.equal(cancelled, 1);
			globalThis.fetch = async () => new Response(new ReadableStream({ cancel() {
				cancelled += 1;
			} }), { status: 503 });
			await assert.rejects(fetchJsonBounded("https://fixture.invalid", {}, { validateResponse: requireIntegrityResponse }), /http_503/);
			assert.equal(cancelled, 2);
		}
		finally { globalThis.fetch = originalFetch; }
	});

	it("aborts a stalled request at its deadline", async () => {
		const originalFetch = globalThis.fetch;
		globalThis.fetch = async (_input, init) => new Promise((_resolve, reject) => {
			init?.signal?.addEventListener("abort", () => reject(new Error("Fixture timeout")), { once: true });
		});
		try {
			const { fetchJsonBounded } = await import("../src/utils/boundedFetch.js");
			await assert.rejects(fetchJsonBounded("https://fixture.invalid", {}, { timeoutMs: 20 }), /Fixture timeout/);
		}
		finally { globalThis.fetch = originalFetch; }
	});
});

it("rejects invalid batch bounds before opening a database or provider client", async () => {
	for (const options of [{ limit: 0 }, { limit: 501 }, { limit: 1.5 }, { staleDays: 0 }, { staleDays: 3651 }, { providers: [] }]) {
		await assert.rejects(runSourceIntegrityMonitor({ apply: false, limit: 10, staleDays: 30, ...options }));
	}
});
