import type { IncomingMessage, ServerResponse } from "node:http";
import type { TestContext } from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, it } from "node:test";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";
import {
	createPublicClaimSearch,
	PUBLIC_SEARCH_WORKER_RESPONSE_LIMIT,
	PublicSearchCancelledError,
	PublicSearchStateUnavailableError,
	publicSearchWorkerPayload
} from "../src/utils/publicSearchWorker.js";

const referenceDate = new Date("2026-10-07T00:00:00Z");
const query = "How does an inlet remain steady during changing demand?";
const publicClaim = {
	slug: "synthetic-feed",
	title: "Can a pressure loop sustain a stable feed?",
	status: "published",
	topicSlug: "synthetic-installations",
	bottomLine: "Installation-specific operating conditions govern a stable feed.",
	editorSummary: "A feed measurement and a controller description are different observations.",
	stableCore: ["The controller can influence a stable feed under the tested operating conditions."],
	privateEditorNote: "PRIVATE_EDITORIAL_MARKER",
	password: "NOT_A_CREDENTIAL",
	session: { marker: "PRIVATE_SESSION_MARKER" }
};
const draftClaim = { ...publicClaim, status: "draft", slug: "synthetic-draft", title: "PRIVATE_DRAFT_TITLE" };
type Payload = ReturnType<typeof publicSearchWorkerPayload>;
type Handler = (payload: Payload, request: IncomingMessage, response: ServerResponse) => void;

async function workerFixture(context: TestContext, handler: Handler) {
	const temporaryRoot = Buffer.byteLength(join(tmpdir(), "consensus-rank-XXXXXX", "worker.sock")) <= 100 ? tmpdir() : "/tmp";
	const directory = await mkdtemp(join(temporaryRoot, "consensus-rank-"));
	const socketPath = join(directory, "worker.sock");
	const server = createServer((request, response) => {
		assert.equal(request.method, "POST");
		assert.equal(request.url, "/rank");
		const chunks: Buffer[] = [];
		request.on("data", chunk => chunks.push(chunk));
		request.on("end", () => handler(JSON.parse(Buffer.concat(chunks).toString("utf8")), request, response));
	});
	await new Promise<void>((resolve, reject) => {
		server.once("error", reject);
		server.listen(socketPath, resolve);
	});
	context.after(async () => {
		server.closeAllConnections();
		await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
		await rm(directory, { recursive: true });
	});
	return socketPath;
}

function reply(payload: Payload, rows: unknown[]) {
	return { protocol: 1, candidate: payload.candidate, corpusHash: payload.corpusHash, queryHash: payload.queryHash, referenceDate: payload.referenceDate, rows };
}

describe("isolated public search transport", () => {
	it("retains native ranking without a configured worker and excludes draft inputs", async () => {
		const search = createPublicClaimSearch();
		assert.deepEqual(await search([publicClaim, draftClaim], query, referenceDate), createClaimSearchIndex([publicClaim])(query, referenceDate));
		assert.deepEqual(await search([draftClaim], draftClaim.title, referenceDate), []);
	});

	it("sends only current public allowlisted fields, without account or transport secrets", async (context) => {
		const socketPath = await workerFixture(context, (payload, request, response) => {
			assert.equal(payload.query, query);
			assert.equal(payload.corpus.length, 1);
			assert.equal(payload.corpus[0].status, "published");
			assert.deepEqual(payload.corpus[0].stableCore, publicClaim.stableCore);
			assert.doesNotMatch(JSON.stringify(payload), /PRIVATE_|password|session|privateEditorNote/u);
			assert.equal(request.headers.cookie, undefined);
			assert.equal(request.headers.authorization, undefined);
			response.end(JSON.stringify(reply(payload, [{ slug: publicClaim.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 }])));
		});
		const results = await createPublicClaimSearch({ socketPath })([publicClaim, draftClaim], query, referenceDate);
		assert.equal(results[0].claim, publicClaim);
		assert.equal(results[0].match.matchStrength, "related");
		assert.equal(results[0].match.matchScore, 90);
	});

	it("keeps exact native titles first without involving an unavailable model", async () => {
		const search = createPublicClaimSearch({ socketPath: "/private/tmp/consensus-unavailable.sock" });
		const results = await search([publicClaim], publicClaim.title, referenceDate);
		assert.equal(results[0].claim, publicClaim);
		assert.equal(results[0].match.matchStrength, "exact");
	});

	it("does not send individual prescribed-treatment decisions to the worker", async () => {
		const search = createPublicClaimSearch({ socketPath: "/private/tmp/consensus-unavailable.sock" });
		assert.deepEqual(await search([publicClaim], "Should I increase my prescribed medication to reduce pressure?", referenceDate), []);
	});

	it("preserves exact query casing and fingerprints publication changes", () => {
		const initial = publicSearchWorkerPayload([publicClaim, draftClaim], query, referenceDate);
		assert.equal(initial.query, query);
		assert.notEqual(publicSearchWorkerPayload([publicClaim], query.toLowerCase(), referenceDate).queryHash, initial.queryHash);
		assert.notEqual(publicSearchWorkerPayload([{ ...publicClaim, stableCore: ["A revised public paragraph."] }], query, referenceDate).corpusHash, initial.corpusHash);
		assert.notEqual(publicSearchWorkerPayload([], query, referenceDate).corpusHash, initial.corpusHash);
		assert.equal(publicSearchWorkerPayload([{ ...publicClaim, privateEditorNote: "Different private state" }], query, referenceDate).corpusHash, initial.corpusHash);
	});

	for (const corruption of ["unknown-slug", "draft-slug", "duplicate", "stale-corpus", "wrong-query", "wrong-reference-date", "wrong-candidate", "extra-field", "below-relevance", "below-cosine", "false-native"] as const) {
		it(`rejects ${corruption} worker results without exposing stale or private objects`, async (context) => {
			const socketPath = await workerFixture(context, (payload, request, response) => {
				const row = { slug: publicClaim.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 };
				const value = reply(payload, [row]);
				if (corruption === "unknown-slug") row.slug = "unknown-review";
				if (corruption === "draft-slug") row.slug = draftClaim.slug;
				if (corruption === "duplicate") value.rows.push(row);
				if (corruption === "stale-corpus") value.corpusHash = "0".repeat(64);
				if (corruption === "wrong-query") value.queryHash = "0".repeat(64);
				if (corruption === "wrong-reference-date") value.referenceDate = "2026-10-06T00:00:00Z";
				if (corruption === "wrong-candidate") Object.assign(value, { candidate: "different-method" });
				if (corruption === "extra-field") Object.assign(value, { privateEditorNote: "PRIVATE_RESPONSE_MARKER" });
				if (corruption === "below-relevance") row.relevance = 0.79;
				if (corruption === "below-cosine") row.cosine = 0.64;
				if (corruption === "false-native") value.rows = [{ slug: publicClaim.slug, kind: "native" }];
				response.end(JSON.stringify(value));
			});
			const search = createPublicClaimSearch({ socketPath });
			assert.deepEqual(await search([publicClaim, draftClaim], query, referenceDate), createClaimSearchIndex([publicClaim])(query, referenceDate));
		});
	}

	for (const failure of ["warming", "malformed", "oversized", "deadline"] as const) {
		it(`bounds ${failure} workers and keeps native search available`, async (context) => {
			const socketPath = await workerFixture(context, (payload, request, response) => {
				if (failure === "warming") {
					response.statusCode = 202;
					response.end();
				}
				if (failure === "malformed") response.end("not json");
				if (failure === "oversized") response.end(" ".repeat(PUBLIC_SEARCH_WORKER_RESPONSE_LIMIT + 1));
			});
			assert.deepEqual(await createPublicClaimSearch({ socketPath, timeoutMilliseconds: 40 })([publicClaim], query, referenceDate), createClaimSearchIndex([publicClaim])(query, referenceDate));
		});
	}

	it("never creates an unbounded worker queue when reader requests overlap", async (context) => {
		let release: () => void;
		let received = 0;
		let notify: () => void;
		const firstReceived = new Promise<void>((resolve) => {
			notify = resolve;
		});
		const socketPath = await workerFixture(context, (payload, request, response) => {
			received++;
			release = () => response.end(JSON.stringify(reply(payload, [])));
			notify();
		});
		const search = createPublicClaimSearch({ socketPath });
		const first = search([publicClaim], query, referenceDate);
		await firstReceived;
		assert.deepEqual(await search([publicClaim], "A second unfamiliar question", referenceDate), createClaimSearchIndex([publicClaim])("A second unfamiliar question", referenceDate));
		assert.equal(received, 1);
		release();
		await first;
	});

	it("rejects pre-cancelled searches without transport or publication work", async (context) => {
		let received = 0;
		let refreshed = 0;
		const socketPath = await workerFixture(context, (payload, request, response) => {
			received++;
			response.end(JSON.stringify(reply(payload, [])));
		});
		const search = createPublicClaimSearch({ socketPath });
		const controller = new AbortController();
		controller.abort("PRIVATE_ABORT_REASON");
		for (const value of [query, publicClaim.title]) {
			await assert.rejects(search([publicClaim], value, referenceDate, async () => {
				refreshed++;
				return [publicClaim];
			}, controller.signal), PublicSearchCancelledError);
		}
		assert.equal(received, 0);
		assert.equal(refreshed, 0);
	});

	it("closes abandoned RPC and lets the next query use the shared worker", async (context) => {
		let received = 0;
		let refreshed = 0;
		let notify: () => void;
		let disconnected: () => void;
		let lateReply: () => void;
		const entered = new Promise<void>((resolve) => {
			notify = resolve;
		});
		const closed = new Promise<void>((resolve) => {
			disconnected = resolve;
		});
		const socketPath = await workerFixture(context, (payload, request, response) => {
			received++;
			if (received === 1) {
				response.once("close", () => disconnected());
				lateReply = () => response.end(JSON.stringify(reply(payload, [])));
				notify();
			}
			else {
				response.end(JSON.stringify(reply(payload, [{ slug: publicClaim.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 }])));
			}
		});
		const search = createPublicClaimSearch({ socketPath });
		const controller = new AbortController();
		const first = search([publicClaim], query, referenceDate, async () => {
			refreshed++;
			return [publicClaim];
		}, controller.signal);
		const rejected = assert.rejects(first, (error: unknown) => {
			assert.ok(error instanceof PublicSearchCancelledError);
			assert.doesNotMatch(error.message, /PRIVATE_ABORT_REASON/u);
			return true;
		});
		await entered;
		controller.abort("PRIVATE_ABORT_REASON");
		await rejected;
		await closed;
		assert.equal(refreshed, 0);
		const results = await search([publicClaim], "Another unfamiliar inlet question", referenceDate);
		assert.equal(received, 2);
		assert.equal(results[0].claim, publicClaim);
		lateReply();
	});

	it("does not let one reader's cancellation affect another in-flight search", async (context) => {
		let release: () => void;
		let notify: () => void;
		let received = 0;
		const entered = new Promise<void>((resolve) => {
			notify = resolve;
		});
		const socketPath = await workerFixture(context, (payload, request, response) => {
			received++;
			release = () => response.end(JSON.stringify(reply(payload, [{ slug: publicClaim.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 }])));
			notify();
		});
		const search = createPublicClaimSearch({ socketPath });
		const first = search([publicClaim], query, referenceDate);
		await entered;
		const controller = new AbortController();
		controller.abort();
		await assert.rejects(search([publicClaim], "A cancelled second question", referenceDate, undefined, controller.signal), PublicSearchCancelledError);
		assert.equal(received, 1);
		release();
		assert.equal((await first)[0].claim, publicClaim);
	});

	for (const fails of [false, true]) {
		it(`discards a cancelled publication check even when it ${fails ? "fails" : "succeeds"}`, { timeout: 5_000 }, async (context) => {
			let release: () => void;
			let notify: () => void;
			const entered = new Promise<void>((resolve) => {
				notify = resolve;
			});
			const checking = new Promise<void>((resolve) => {
				release = resolve;
			});
			const controller = new AbortController();
			const socketPath = await workerFixture(context, (payload, request, response) => response.end(JSON.stringify(reply(payload, [{ slug: publicClaim.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 }]))));
			const search = createPublicClaimSearch({ socketPath });
			const first = search([publicClaim], query, referenceDate, async () => {
				notify();
				await checking;
				if (fails) throw new Error("Unavailable public state");
				return [publicClaim];
			}, controller.signal);
			const rejected = assert.rejects(first, PublicSearchCancelledError);
			await entered;
			controller.abort();
			await rejected;
			assert.equal((await search([publicClaim], query, referenceDate))[0].claim, publicClaim);
			release();
			await checking;
		});
	}

	it("does not let a late abandoned publication check unlock another reader's RPC", { timeout: 5_000 }, async (context) => {
		let releaseRefresh: () => void;
		let notifyRefresh: () => void;
		let notifySecond: () => void;
		let releaseSecond: () => void;
		let received = 0;
		const refreshEntered = new Promise<void>((resolve) => {
			notifyRefresh = resolve;
		});
		const refreshPending = new Promise<void>((resolve) => {
			releaseRefresh = resolve;
		});
		const secondEntered = new Promise<void>((resolve) => {
			notifySecond = resolve;
		});
		const socketPath = await workerFixture(context, (payload, request, response) => {
			received++;
			const respond = () => response.end(JSON.stringify(reply(payload, [{ slug: publicClaim.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 }])));
			if (received === 1) {
				respond();
			}
			else {
				releaseSecond = respond;
				notifySecond();
			}
		});
		const search = createPublicClaimSearch({ socketPath });
		const controller = new AbortController();
		const first = search([publicClaim], query, referenceDate, async () => {
			notifyRefresh();
			await refreshPending;
			return [publicClaim];
		}, controller.signal);
		const rejected = assert.rejects(first, PublicSearchCancelledError);
		await refreshEntered;
		controller.abort();
		await rejected;
		const second = search([publicClaim], "A second unfamiliar question", referenceDate);
		await secondEntered;
		releaseRefresh();
		await refreshPending;
		assert.deepEqual(await search([publicClaim], "A third unfamiliar question", referenceDate), createClaimSearchIndex([publicClaim])("A third unfamiliar question", referenceDate));
		assert.equal(received, 2);
		releaseSecond();
		assert.equal((await second)[0].claim, publicClaim);
	});

	it("rechecks publication after an in-flight worker response instead of returning withdrawn content", async (context) => {
		const socketPath = await workerFixture(context, (payload, request, response) => response.end(JSON.stringify(reply(payload, [{ slug: publicClaim.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 }]))));
		const search = createPublicClaimSearch({ socketPath });
		assert.deepEqual(await search([publicClaim], query, referenceDate, async () => [{ ...publicClaim, status: "draft" }]), []);
	});

	it("rejects stale paragraph predictions when public wording changes during scoring", async (context) => {
		const revised = { ...publicClaim, title: "A different public question", stableCore: ["A revised public paragraph."] };
		const socketPath = await workerFixture(context, (payload, request, response) => response.end(JSON.stringify(reply(payload, [{ slug: publicClaim.slug, kind: "paragraph", relevance: 0.9, cosine: 0.7 }]))));
		assert.deepEqual(await createPublicClaimSearch({ socketPath })([publicClaim], query, referenceDate, async () => [revised]), createClaimSearchIndex([revised])(query, referenceDate));
	});

	it("does not expose old public objects if current publication verification fails", async (context) => {
		const socketPath = await workerFixture(context, (payload, request, response) => response.end(JSON.stringify(reply(payload, []))));
		await assert.rejects(createPublicClaimSearch({ socketPath })([publicClaim], query, referenceDate, async () => {
			throw new Error("Unavailable public state");
		}), PublicSearchStateUnavailableError);
	});

	for (const socketPath of ["relative.sock", "https://example.com/worker.sock", "/private/tmp/../tmp/worker.sock"]) {
		it(`does not use an unsafe transport path ${socketPath}`, async () => {
			assert.deepEqual(await createPublicClaimSearch({ socketPath })([publicClaim], query, referenceDate), createClaimSearchIndex([publicClaim])(query, referenceDate));
		});
	}
});
