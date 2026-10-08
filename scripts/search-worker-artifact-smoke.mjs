import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { execFileSync, spawn } from "node:child_process";
import { once } from "node:events";
import { mkdir, readFile, rename, rm } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { fileDigest, verifyWorkerArtifact } from "./search-worker-artifact-lib.mjs";

const root = path.resolve(".search-worker-artifact");
const scratch = path.resolve(".ai-work/runs/20261008-a");
const unpacked = path.join(scratch, "release");
const socketPath = path.join(scratch, "worker.sock");
assert.ok(Buffer.byteLength(socketPath) <= 100);
const receipt = JSON.parse(await readFile(`${root}.receipt.json`, "utf8"));
assert.equal(await fileDigest(`${root}.tar.gz`), receipt.archiveSha256);
await mkdir(scratch, { mode: 0o700 });
const children = [];
function start() {
	const child = spawn(process.execPath, [path.join(unpacked, "dist/search-worker/src/server.js")], {
		cwd: unpacked,
		env: { NODE_ENV: "production", SEARCH_MODEL_DIR: path.join(unpacked, "models"), SEARCH_WORKER_SOCKET: socketPath },
		stdio: "ignore"
	});
	children.push(child);
	return child;
}
function call(method, route, body) {
	return new Promise((resolve, reject) => {
		const request = http.request({ socketPath, method, path: route, headers: { "content-type": "application/json" }, agent: false }, (response) => {
			let data = "";
			response.on("data", (chunk) => {
				data += chunk.toString();
			});
			response.on("end", () => resolve({ status: response.statusCode, body: JSON.parse(data) }));
			response.on("error", reject);
		});
		request.on("error", reject);
		request.setTimeout(9000, () => request.destroy(new Error("Private artifact call timed out.")));
		request.end(body ? JSON.stringify(body) : undefined);
	});
}
async function waitFor(predicate) {
	const deadline = Date.now() + 30_000;
	while (Date.now() < deadline) {
		if (await predicate()) return;
		await delay(100);
	}
	throw new Error("Artifact readiness timed out.");
}
async function stop(child) {
	if (child.exitCode !== null || child.signalCode !== null) return;
	const exit = once(child, "exit");
	child.kill("SIGTERM");
	const deadline = setTimeout(() => child.kill("SIGKILL"), 3000);
	try {
		await exit;
	}
	finally {
		clearTimeout(deadline);
	}
	assert.equal(child.exitCode, 0);
}
try {
	await mkdir(unpacked);
	execFileSync("tar", ["-xzf", `${root}.tar.gz`, "-C", unpacked]);
	const manifest = await verifyWorkerArtifact(unpacked);
	assert.equal(manifest.contentSha256, receipt.contentSha256);
	assert.equal(await fileDigest(path.join(unpacked, ".worker-manifest.json")), receipt.manifestSha256);
	const child = start();
	await waitFor(async () => {
		try {
			return (await call("GET", "/healthz")).status === 200;
		}
		catch {
			return false;
		}
	});
	assert.deepEqual(await call("GET", "/readyz"), { status: 503, body: { ready: false } });
	const { publicSearchWorkerPayload } = await import(path.join(unpacked, "dist/back-end/src/utils/publicSearchWorker.js"));
	const fixture = [{ title: "Does a pump sustain pressure?", slug: "synthetic-pump", status: "published", bottomLine: "A pump sustains pressure in the described installation." }];
	const payload = publicSearchWorkerPayload(fixture, "Does a pump sustain pressure?", new Date("2026-10-07T00:00:00Z"));
	assert.equal((await call("POST", "/rank", payload)).status, 503);
	await waitFor(async () => (await call("GET", "/readyz")).status === 200);
	const result = await call("POST", "/rank", payload);
	assert.equal(result.status, 200);
	assert.equal(result.body.rows[0].slug, fixture[0].slug);
	assert.equal(result.body.corpusHash, payload.corpusHash);
	await stop(child);
	const missing = path.join(unpacked, "dist/search-worker/src/assets.js");
	await rename(missing, `${missing}.missing`);
	await assert.rejects(verifyWorkerArtifact(unpacked));
	const invalid = start();
	const [code] = await once(invalid, "exit");
	assert.notEqual(code, 0);
	await rename(`${missing}.missing`, missing);
	await verifyWorkerArtifact(unpacked);
	process.stdout.write("Exact unpacked production-only worker, offline cold start, readiness, rank, shutdown and missing-module regression pass. Native host capacity and full search quality remain separate gates.\n");
}
finally {
	for (const child of children) {
		if (child.exitCode === null && child.signalCode === null) await stop(child);
	}
	await rm(scratch, { recursive: true, force: true });
}
