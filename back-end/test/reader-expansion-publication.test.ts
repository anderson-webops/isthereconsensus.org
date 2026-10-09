import type { ReaderExpansionEditorialApi, ReaderExpansionEditorialPlan, ReaderExpansionPublicationEvent } from "../src/utils/readerExpansionPublication.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readerExpansionClaims } from "../src/data/claim-expansion-reader.js";
import { defaultClaims } from "../src/data/claims.js";
import { createReaderExpansionSourceProposal, readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";
import { createReaderExpansionEditorialApi, prepareReaderExpansionEditorialPlan, publishReaderExpansionEditorialPlan } from "../src/utils/readerExpansionPublication.js";

const now = new Date("2026-10-09T13:00:00.000Z");
const proposal = () => createReaderExpansionSourceProposal(readerExpansionClaims, defaultClaims, { commit: "a".repeat(40), tree: "b".repeat(40) }, now);
const adminId = "a".repeat(24);

function approval(plan: ReaderExpansionEditorialPlan) {
	return { sourceCommit: plan.sourceCommit, planSha256: readerExpansionValueHash(plan), backupSha256: "b".repeat(64), restoreVerificationSha256: "c".repeat(64), rehearsalReceiptSha256: "d".repeat(64), backendArtifactSha256: "e".repeat(64), operatorApprovalRef: "Synthetic protected operator approval, not production evidence.", reviewedAt: now.toISOString() };
}

function fixture(initial: "missing" | "draft" | "published" = "missing") {
	const source = proposal();
	const records = new Map<string, Record<string, unknown>>();
	const sources = new Map<string, Record<string, unknown>[]>();
	const calls: { path: string; method: string; anonymous: boolean }[] = [];
	let sequence = 0;
	const nextId = () => (++sequence).toString(16).padStart(24, "0");
	if (initial !== "missing") {
		for (const target of source.targets) {
			const claimId = nextId();
			records.set(claimId, { ...structuredClone(target.createPayload), _id: claimId, topic: { slug: target.createPayload.topic }, status: initial });
			sources.set(claimId, target.sourcePayloads.map(payload => ({ statusSources: [], ...structuredClone(payload), _id: nextId() })));
		}
	}
	const response = (claimId: string) => ({ ...structuredClone(records.get(claimId)), sources: structuredClone(sources.get(claimId) ?? []) });
	const api: ReaderExpansionEditorialApi = async (path, options = {}) => {
		const method = options.method ?? "GET";
		calls.push({ path, method, anonymous: Boolean(options.anonymous) });
		if (path === "/auth/me") return { status: 200, data: { currentUser: null, currentAdmin: { _id: adminId, unrelatedSessionField: "never-copy-this" } } };
		if (path === "/editorial/claims" && method === "GET") return { status: 200, data: { claims: [...records.values()].map(claim => structuredClone(claim)) } };
		if (path === "/editorial/claims" && method === "POST") {
			const claimId = nextId();
			records.set(claimId, { ...structuredClone(options.body), _id: claimId, topic: { slug: options.body!.topic }, status: "draft" });
			sources.set(claimId, []);
			return { status: 201, data: { claim: response(claimId) } };
		}
		const match = path.match(/^\/editorial\/claims\/([a-f\d]{24})(?:\/(sources|publish))?$/u);
		if (match) {
			const claimId = match[1];
			if (!records.has(claimId)) return { status: 404, data: {} };
			if (match[2] === "sources") {
				if (method === "GET") return { status: 200, data: { sources: structuredClone(sources.get(claimId)) } };
				const citation = { statusSources: [], ...structuredClone(options.body), _id: nextId() };
				sources.get(claimId)!.push(citation);
				return { status: 201, data: { source: structuredClone(citation) } };
			}
			if (method === "PATCH") Object.assign(records.get(claimId)!, structuredClone(options.body), { topic: { slug: options.body!.topic } });
			if (match[2] === "publish") Object.assign(records.get(claimId)!, { status: "published", lastReviewedAt: options.body!.lastReviewedAt });
			return { status: 200, data: { claim: response(claimId) } };
		}
		if (path === "/claims?limit=1") return { status: 200, data: { pagination: { total: 800 + [...records.values()].filter(claim => claim.status === "published").length } } };
		const target = source.targets.find(entry => entry.publicApiPath.slice(4) === path);
		const claim = target && [...records.values()].find(entry => entry.slug === target.createPayload.slug && (entry.topic as { slug: string }).slug === target.createPayload.topic && entry.status === "published");
		return claim ? { status: 200, data: { claim: response(claim._id as string) } } : { status: 404, data: {} };
	};
	return { source, records, sources, calls, api };
}

describe("protected reader expansion editorial batch", () => {
	it("previews every target without mutations and publishes all 201 with observed identities and full citations", async () => {
		const state = fixture();
		const plan = await prepareReaderExpansionEditorialPlan(state.source, state.api, now);
		assert.equal(plan.rows.length, 201);
		assert.ok(plan.rows.every(row => row.status === "missing"));
		assert.ok(state.calls.every(call => call.method === "GET"));
		assert.equal(JSON.stringify(plan).includes("never-copy-this"), false);
		const events: ReaderExpansionPublicationEvent[] = [];
		const result = await publishReaderExpansionEditorialPlan(state.source, plan, approval(plan), state.api, async (event) => {
			events.push(event);
		}, now);
		assert.equal(result.canonicalReviews, 201);
		assert.equal(result.orderedCitations, 461);
		assert.equal(result.catalogTotal, 1001);
		assert.equal(new Set(result.results.map(row => row.claimId)).size, 201);
		assert.equal(state.calls.filter(call => call.method === "POST" && call.path.endsWith("/publish")).length, 201);
		assert.equal(events.filter(event => event.state === "pending").length, 1064);
		assert.equal(result.fullPrivateStatePreservationVerified, false);
		assert.equal(result.renderedPagesVerified, false);
		assert.equal(JSON.stringify(result).includes("never-copy-this"), false);
		for (const target of state.source.targets) {
			const claim = [...state.records.values()].find(row => row.slug === target.createPayload.slug)!;
			for (const field of ["stableCore", "whatWouldChangeMinds", "evidenceSummaries"]) assert.deepEqual(claim[field], target.createPayload[field]);
			assert.equal(claim.lastReviewedAt, now.toISOString());
		}
	});

	it("preserves existing citation IDs and legacy provenance without rewriting or republishing matching publications", async () => {
		for (const initial of ["draft", "published"] as const) {
			const state = fixture(initial);
			for (const citations of state.sources.values()) citations[0].statusSources = ["Crossref", ...(citations[0].statusSources as string[])];
			const before = readerExpansionValueHash([...state.sources]);
			const plan = await prepareReaderExpansionEditorialPlan(state.source, state.api, now);
			const result = await publishReaderExpansionEditorialPlan(state.source, plan, approval(plan), state.api, async () => {}, now);
			assert.equal(readerExpansionValueHash([...state.sources]), before);
			assert.equal(result.results.filter(row => row.disposition === "already_matching").length, initial === "published" ? 201 : 0);
			assert.ok(state.calls.filter(call => call.method !== "GET").every(call => call.path.endsWith("/publish")));
			if (initial === "published") assert.ok(state.calls.every(call => call.method === "GET"));
		}
	});

	it("rejects changed or partial proposals, duplicate identities, conflicting drafts and stronger notices before writes", async () => {
		const partial = fixture();
		partial.source.targets.pop();
		await assert.rejects(prepareReaderExpansionEditorialPlan(partial.source, partial.api, now));
		for (const alter of [
			(state: ReturnType<typeof fixture>) => { [...state.records.values()][0].bottomLine = "Conflicting live content"; },
			(state: ReturnType<typeof fixture>) => { [...state.records.values()][0].status = "needs_update"; },
			(state: ReturnType<typeof fixture>) => { [...state.sources.values()][0][0].citationStatus = "corrected"; },
			(state: ReturnType<typeof fixture>) => { [...state.sources.values()][0][0].statusSources = ["https://example.test/new-notice"]; },
			(state: ReturnType<typeof fixture>) => {
				const duplicate = structuredClone([...state.records.values()][0]);
				duplicate._id = "f".repeat(24);
				state.records.set(duplicate._id as string, duplicate);
			}
		]) {
			const state = fixture("draft");
			alter(state);
			await assert.rejects(prepareReaderExpansionEditorialPlan(state.source, state.api, now));
			assert.ok(state.calls.every(call => call.method === "GET"));
		}
	});

	it("refuses stale plans, missing evidence, changed actors and changed live state without mutations", async () => {
		for (const variant of ["stale", "digest", "evidence", "actor", "state"] as const) {
			const state = fixture("draft");
			const plan = await prepareReaderExpansionEditorialPlan(state.source, state.api, now);
			const consent = approval(plan);
			if (variant === "digest") consent.planSha256 = "f".repeat(64);
			if (variant === "evidence") consent.restoreVerificationSha256 = "";
			if (variant === "state") [...state.records.values()][0].privateOperatorNote = "Changed since preview";
			const api: ReaderExpansionEditorialApi = async (path, options) => variant === "actor" && path === "/auth/me" ? { status: 200, data: { currentUser: null, currentAdmin: { _id: "f".repeat(24) } } } : state.api(path, options);
			await assert.rejects(publishReaderExpansionEditorialPlan(state.source, plan, consent, api, async () => {}, variant === "stale" ? new Date(now.getTime() + 86400001) : now));
			assert.ok(state.calls.every(call => call.method === "GET"));
		}
	});

	it("journals before writes and stops on an unconfirmed mutation without retrying or emitting response secrets", async () => {
		const state = fixture();
		const plan = await prepareReaderExpansionEditorialPlan(state.source, state.api, now);
		const events: ReaderExpansionPublicationEvent[] = [];
		let writes = 0;
		const api: ReaderExpansionEditorialApi = async (path, options) => {
			if (options?.method === "POST") {
				writes += 1;
				assert.equal(events.at(-1)?.state, "pending");
				throw new Error("Synthetic session value must not appear in output");
			}
			return state.api(path, options);
		};
		await assert.rejects(publishReaderExpansionEditorialPlan(state.source, plan, approval(plan), api, async (event) => {
			events.push(event);
		}, now), error => error instanceof Error && !error.message.includes("Synthetic session"));
		assert.equal(writes, 1);
		assert.deepEqual(events.map(event => event.state), ["pending"]);
		const blocked = fixture();
		const blockedPlan = await prepareReaderExpansionEditorialPlan(blocked.source, blocked.api, now);
		await assert.rejects(publishReaderExpansionEditorialPlan(blocked.source, blockedPlan, approval(blockedPlan), blocked.api, async () => {
			throw new Error("Journal unavailable");
		}, now));
		assert.ok(blocked.calls.every(call => call.method === "GET"));
	});

	it("keeps authentication loopback-only, omits credentials on anonymous readback and refuses redirects and anonymous writes", async () => {
		for (const origin of ["https://isthereconsensus.org", "http://localhost:3000", "http://127.0.0.1:3000/admin", "http://fixture:fixture@127.0.0.1:3000"]) assert.throws(() => createReaderExpansionEditorialApi(origin, "fixture-session"));
		assert.throws(() => createReaderExpansionEditorialApi("http://127.0.0.1:3000", "fixture\r\nvalue"));
		const requests: { url: string; options: RequestInit }[] = [];
		const transport: typeof fetch = async (input, options = {}) => {
			requests.push({ url: String(input), options });
			return new Response(JSON.stringify({ ok: true }), { status: 200 });
		};
		const api = createReaderExpansionEditorialApi("http://127.0.0.1:3000", "fixture-session", "https://isthereconsensus.org", transport);
		await api("/auth/me");
		await api("/claims?limit=1", { anonymous: true });
		assert.equal(new Headers(requests[0].options.headers).get("cookie"), "fixture-session");
		assert.equal(new Headers(requests[0].options.headers).get("origin"), "https://isthereconsensus.org");
		assert.equal(new Headers(requests[1].options.headers).has("cookie"), false);
		assert.equal(new Headers(requests[1].options.headers).has("origin"), false);
		assert.equal(requests[1].url, "https://isthereconsensus.org/api/claims?limit=1");
		assert.ok(requests.every(request => request.options.redirect === "error"));
		await assert.rejects(api("//unexpected-host"));
		await assert.rejects(api("/editorial/claims", { method: "POST", anonymous: true }));
	});

	it("retries only a confirmed bounded rate-limit refusal once and never retries an uncertain write", async () => {
		let calls = 0;
		const limited: typeof fetch = async () => {
			calls += 1;
			return calls === 1 ? new Response("Rate limited", { status: 429, headers: { "Retry-After": "1" } }) : new Response("{}", { status: 201 });
		};
		const api = createReaderExpansionEditorialApi("http://127.0.0.1:3000", "fixture-session", "http://127.0.0.1:3000", limited);
		assert.equal((await api("/editorial/claims", { method: "POST", body: {} })).status, 201);
		assert.equal(calls, 2);
		for (const value of [null, "0", "61", "not-a-delay"]) {
			let refused = 0;
			const invalid: typeof fetch = async () => {
				refused += 1;
				return new Response("Private response must not appear", { status: 429, ...(value ? { headers: { "Retry-After": value } } : {}) });
			};
			await assert.rejects(createReaderExpansionEditorialApi("http://127.0.0.1:3000", "fixture-session", "http://127.0.0.1:3000", invalid)("/editorial/claims", { method: "POST", body: {} }));
			assert.equal(refused, 1);
		}
		let uncertain = 0;
		const broken: typeof fetch = async () => {
			uncertain += 1;
			throw new Error("Unknown write outcome with private cookie data");
		};
		await assert.rejects(createReaderExpansionEditorialApi("http://127.0.0.1:3000", "fixture-session", "http://127.0.0.1:3000", broken)("/editorial/claims", { method: "POST", body: {} }), error => error instanceof Error && !error.message.includes("private cookie"));
		assert.equal(uncertain, 1);
	});
});
