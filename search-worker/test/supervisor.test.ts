import type { ChildProcess } from "node:child_process";
import type { TestContext } from "node:test";
import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { once } from "node:events";
import process from "node:process";
import { describe, it } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { publicSearchWorkerPayload, publicSearchWorkerRequestSchema } from "../../back-end/src/utils/publicSearchWorker.js";
import { SearchServiceUnavailableError, SearchSupervisor } from "../src/supervisor.js";

const fixture = new URL("./fixtures/model-peer.mjs", import.meta.url);
const referenceDate = new Date("2026-10-07T00:00:00Z");
const claim = { title: "Can a pump supply a steady feed?", slug: "synthetic-feed", status: "published", bottomLine: "The pump can supply a steady feed in this installation.", stableCore: [] };
const payload = (query = "How does the feed stay steady?") => publicSearchWorkerRequestSchema.parse(publicSearchWorkerPayload([claim], query, referenceDate));

function supervisorFixture(context: TestContext, extra: Partial<ConstructorParameters<typeof SearchSupervisor>[0]> = {}) {
	const children: ChildProcess[] = [];
	const supervisor = new SearchSupervisor({ modelDirectory: "/unused-test-models", createChild: () => {
		const child = fork(fixture, [], { execArgv: [], serialization: "advanced", stdio: ["ignore", "ignore", "ignore", "ipc"], env: {} });
		children.push(child);
		return child;
	}, ...extra });
	context.after(() => supervisor.close());
	return { supervisor, children };
}

async function warm(supervisor: SearchSupervisor) {
	const ready = once(supervisor, "ready");
	await assert.rejects(supervisor.rank(payload(), new AbortController().signal), SearchServiceUnavailableError);
	await ready;
}

describe("independent model process lifetime", () => {
	it("warms only public corpus data and does not send the abandoned initial query", async (context) => {
		const { supervisor, children } = supervisorFixture(context);
		await warm(supervisor);
		assert.equal(supervisor.state.ready, true);
		assert.equal(children.length, 1);
		const result = await supervisor.rank(payload(), new AbortController().signal);
		assert.equal(result.rows[0]?.slug, claim.slug);
	});
	it("rejects pre-cancelled work without spawning a child", async (context) => {
		const { supervisor, children } = supervisorFixture(context);
		const controller = new AbortController();
		controller.abort("UNTRUSTED_ABORT_REASON");
		await assert.rejects(supervisor.rank(payload(), controller.signal), error => error instanceof SearchServiceUnavailableError && !error.message.includes("UNTRUSTED_ABORT_REASON"));
		assert.equal(children.length, 0);
	});
	it("kills only its owned active inference and recovers from public vectors", async (context) => {
		const { supervisor, children } = supervisorFixture(context);
		await warm(supervisor);
		const controller = new AbortController();
		const oldChild = children[0];
		const operation = supervisor.rank(payload("HOLD_INFERENCE"), controller.signal);
		const rejection = assert.rejects(operation, SearchServiceUnavailableError);
		await delay(20);
		assert.equal(oldChild.signalCode, null);
		assert.equal(supervisor.state.busy, true);
		controller.abort();
		await rejection;
		await delay(20);
		assert.equal(oldChild.signalCode, "SIGKILL");
		const result = await supervisor.rank(payload("The settled final wording"), new AbortController().signal);
		assert.equal(result.rows[0]?.slug, claim.slug);
		assert.equal(children.length, 2);
	});
	it("coalesces abandoned typing while a public-only cached restart warms", async (context) => {
		const { supervisor, children } = supervisorFixture(context);
		await warm(supervisor);
		const firstController = new AbortController();
		const first = supervisor.rank(payload("HOLD_INFERENCE"), firstController.signal);
		const firstRejected = assert.rejects(first, SearchServiceUnavailableError);
		await delay(10);
		firstController.abort();
		await firstRejected;
		for (const wording of ["T", "Th", "The", "The f", "The final"]) {
			const controller = new AbortController();
			const operation = supervisor.rank(payload(wording), controller.signal);
			const rejected = assert.rejects(operation, SearchServiceUnavailableError);
			await delay(1);
			controller.abort();
			await rejected;
		}
		const final = payload("The final settled wording");
		const result = await supervisor.rank(final, new AbortController().signal);
		assert.equal(result.queryHash, final.queryHash);
		assert.equal(children.length, 2);
	});
	it("does not admit simultaneous requests across the asynchronous startup boundary", async (context) => {
		const { supervisor } = supervisorFixture(context);
		await warm(supervisor);
		const first = supervisor.rank(payload(), new AbortController().signal);
		await assert.rejects(supervisor.rank(payload("Another reader"), new AbortController().signal), SearchServiceUnavailableError);
		await first;
	});
	it("bounds active inference time and clears the owned slot", async (context) => {
		const { supervisor, children } = supervisorFixture(context, { rankTimeoutMilliseconds: 30 });
		await warm(supervisor);
		await assert.rejects(supervisor.rank(payload("HOLD_INFERENCE"), new AbortController().signal), SearchServiceUnavailableError);
		await delay(20);
		assert.equal(children[0].signalCode, "SIGKILL");
		assert.equal(supervisor.state.busy, false);
	});
	it("rebuilds rather than serving a previous corpus fingerprint", async (context) => {
		const { supervisor, children } = supervisorFixture(context);
		await warm(supervisor);
		const changed = publicSearchWorkerRequestSchema.parse(publicSearchWorkerPayload([{ ...claim, bottomLine: "The reviewed wording has changed." }], "How does the feed stay steady?", referenceDate));
		const ready = once(supervisor, "ready");
		await assert.rejects(supervisor.rank(changed, new AbortController().signal), SearchServiceUnavailableError);
		await ready;
		const result = await supervisor.rank(changed, new AbortController().signal);
		assert.equal(result.corpusHash, changed.corpusHash);
		assert.notEqual(result.corpusHash, payload().corpusHash);
		assert.equal(children.length, 2);
	});
	it("stops its owned child and refuses new requests after shutdown", async (context) => {
		const { supervisor, children } = supervisorFixture(context);
		await warm(supervisor);
		await supervisor.close();
		assert.equal(children[0].signalCode, "SIGKILL");
		await assert.rejects(supervisor.rank(payload(), new AbortController().signal), SearchServiceUnavailableError);
		assert.equal(supervisor.state.ownedChildPid, null);
		assert.equal(process.pid > 0, true);
	});
});
