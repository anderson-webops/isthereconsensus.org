import type { TestContext } from "node:test";
import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { once } from "node:events";
import { chmod, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { request } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { publicSearchWorkerPayload } from "../../back-end/src/utils/publicSearchWorker.js";
import { createSearchWorkerServer } from "../src/server.js";
import { SearchSupervisor } from "../src/supervisor.js";

const modelPeer = new URL("./fixtures/model-peer.mjs", import.meta.url);
const referenceDate = new Date("2026-10-07T00:00:00Z");
const claim = { title: "Does a pressure loop sustain the feed?", slug: "synthetic-loop", status: "published", bottomLine: "A pressure loop sustains the feed under the tested conditions." };
const payload = publicSearchWorkerPayload([claim], "How is the feed sustained?", referenceDate);

async function fixture(context: TestContext) {
	const directory = await mkdtemp(path.join(tmpdir(), "search-worker-"));
	const socketPath = path.join(directory, "rank.sock");
	const supervisor = new SearchSupervisor({ modelDirectory: "/unused-test-models", createChild: () => fork(modelPeer, [], { execArgv: [], serialization: "advanced", stdio: ["ignore", "ignore", "ignore", "ipc"], env: {} }) });
	let worker: Awaited<ReturnType<typeof createSearchWorkerServer>> | undefined;
	context.after(async () => {
		if (worker) await worker.close();
		else await supervisor.close();
		await rm(directory, { recursive: true, force: true });
	});
	worker = await createSearchWorkerServer(socketPath, supervisor);
	return { socketPath, supervisor };
}

function call(socketPath: string, method: string, route: string, value?: unknown, headers: Record<string, string> = {}) {
	return new Promise<{ status: number; body: unknown }>((resolve, reject) => {
		const operation = request({ socketPath, method, path: route, agent: false, headers: { "content-type": "application/json", ...headers } }, (response) => {
			let body = "";
			response.setEncoding("utf8");
			response.on("data", (chunk) => {
				body += chunk;
			});
			response.on("end", () => resolve({ status: response.statusCode ?? 0, body: JSON.parse(body) }));
			response.on("error", reject);
		});
		operation.on("error", reject);
		operation.end(value === undefined ? undefined : JSON.stringify(value));
	});
}

describe("private local worker HTTP protocol", () => {
	it("distinguishes live transport from an unwarmed model corpus", async (context) => {
		const { socketPath } = await fixture(context);
		assert.deepEqual(await call(socketPath, "GET", "/healthz"), { status: 200, body: { ok: true } });
		assert.deepEqual(await call(socketPath, "GET", "/readyz"), { status: 503, body: { ready: false } });
	});
	it("returns a fingerprint-bound response after background public-only warming", async (context) => {
		const { socketPath, supervisor } = await fixture(context);
		const ready = once(supervisor, "ready");
		assert.equal((await call(socketPath, "POST", "/rank", payload)).status, 503);
		await ready;
		const result = await call(socketPath, "POST", "/rank", payload);
		assert.equal(result.status, 200);
		assert.deepEqual(result.body, { protocol: 1, candidate: payload.candidate, corpusHash: payload.corpusHash, queryHash: payload.queryHash, referenceDate: payload.referenceDate, rows: [{ slug: claim.slug, kind: "native" }] });
		assert.equal((await call(socketPath, "GET", "/readyz")).status, 200);
	});
	for (const [name, change] of [
		["extra private fields", { privateEditorNote: "PRIVATE_FIELD_MARKER" }],
		["wrong corpus digest", { corpusHash: "0".repeat(64) }],
		["wrong query digest", { queryHash: "0".repeat(64) }],
		["unknown protocol", { protocol: 2 }],
		["unrecognized candidate", { candidate: "another-model" }]
	] as const) {
		it(`rejects ${name} before model admission`, async (context) => {
			const { socketPath, supervisor } = await fixture(context);
			assert.equal((await call(socketPath, "POST", "/rank", { ...payload, ...change })).status, 400);
			assert.equal(supervisor.state.ownedChildPid, null);
		});
	}
	it("rejects draft rows and nested secret fields, without reflecting them", async (context) => {
		const { socketPath } = await fixture(context);
		for (const change of [{ status: "draft" }, { session: "PRIVATE_SESSION_MARKER" }]) {
			const result = await call(socketPath, "POST", "/rank", { ...payload, corpus: [{ ...payload.corpus[0], ...change }] });
			assert.equal(result.status, 400);
			assert.ok(!JSON.stringify(result.body).includes("PRIVATE_SESSION_MARKER"));
		}
	});
	it("rejects duplicate slugs and oversized declared bodies", async (context) => {
		const { socketPath } = await fixture(context);
		assert.equal((await call(socketPath, "POST", "/rank", { ...payload, corpus: [payload.corpus[0], payload.corpus[0]] })).status, 400);
		assert.equal((await call(socketPath, "POST", "/rank", payload, { "content-length": String(4 * 1024 * 1024 + 1) })).status, 400);
	});
	it("does not expose corpus, diagnostics or an HTTP/TCP listener", async (context) => {
		const { socketPath } = await fixture(context);
		assert.equal((await call(socketPath, "GET", "/corpus")).status, 404);
		assert.equal((await call(socketPath, "GET", "/rank")).status, 404);
	});
	it("does not unlink or replace an existing socket-path file", async (context) => {
		const directory = await mkdtemp(path.join(tmpdir(), "search-socket-"));
		const socketPath = path.join(directory, "rank.sock");
		await writeFile(socketPath, "EXISTING_FILE_MARKER");
		const supervisor = new SearchSupervisor({ modelDirectory: "/unused-test-models" });
		context.after(async () => {
			await supervisor.close();
			await rm(directory, { recursive: true, force: true });
		});
		await assert.rejects(createSearchWorkerServer(socketPath, supervisor), /already exists/u);
	});
	it("rejects a world-writable socket directory and non-normalized paths", async (context) => {
		const directory = await mkdtemp(path.join(tmpdir(), "search-socket-"));
		await chmod(directory, 0o777);
		await mkdir(path.join(directory, "nested"));
		const supervisor = new SearchSupervisor({ modelDirectory: "/unused-test-models" });
		context.after(async () => {
			await supervisor.close();
			await rm(directory, { recursive: true, force: true });
		});
		await assert.rejects(createSearchWorkerServer(path.join(directory, "rank.sock"), supervisor), /world-writable/u);
		await assert.rejects(createSearchWorkerServer(`${directory}/nested/../rank.sock`, supervisor), /normalized/u);
	});
});
