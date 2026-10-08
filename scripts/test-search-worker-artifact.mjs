import assert from "node:assert/strict";
import { chmod, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { assertWorkerRequiredPaths, verifyWorkerArtifact, workerInventory, workerRequiredPaths, workerRuntimeVersions } from "./search-worker-artifact-lib.mjs";

async function fixture(context) {
	const root = await mkdtemp(path.join(tmpdir(), "worker-artifact-test-"));
	context.after(() => rm(root, { recursive: true, force: true }));
	const native = "node_modules/onnxruntime-node/bin/napi-v6/linux/arm64";
	const required = [...workerRequiredPaths, `${native}/onnxruntime_binding.node`, `${native}/libonnxruntime.so.1`];
	for (const name of ["@huggingface/tokenizers", "onnxruntime-node", "onnxruntime-web", "wink-nlp", "wink-eng-lite-web-model", "zod"]) required.push(`node_modules/${name}/package.json`);
	for (const filename of required) {
		await mkdir(path.dirname(path.join(root, filename)), { recursive: true });
		await writeFile(path.join(root, filename), "synthetic artifact fixture");
	}
	for (const [name, version] of Object.entries(workerRuntimeVersions)) await writeFile(path.join(root, "node_modules", name, "package.json"), JSON.stringify({ name, version }));
	return root;
}
test("worker required paths are independent of the archive inventory", async (context) => {
	const root = await fixture(context);
	await assertWorkerRequiredPaths(root, "linux", "arm64");
	await rm(path.join(root, "dist/search-worker/src/assets.js"));
	await assert.rejects(assertWorkerRequiredPaths(root, "linux", "arm64"), { code: "ENOENT" });
});
test("worker requires its native addon and shared runtime", async (context) => {
	const root = await fixture(context);
	await rm(path.join(root, "node_modules/onnxruntime-node/bin/napi-v6/linux/arm64/libonnxruntime.so.1"));
	await assert.rejects(assertWorkerRequiredPaths(root, "linux", "arm64"), { code: "ENOENT" });
});
test("worker artifact excludes compiler and development trees", async (context) => {
	const root = await fixture(context);
	await mkdir(path.join(root, "node_modules/tsx"));
	await assert.rejects(assertWorkerRequiredPaths(root, "linux", "arm64"), /forbidden/u);
});
test("worker inventory refuses escaping links", async (context) => {
	const root = await fixture(context);
	await symlink("../../outside", path.join(root, "escaped"));
	await assert.rejects(workerInventory(root), /inside/u);
});
test("worker inventory refuses special file permissions", async (context) => {
	const root = await fixture(context);
	const special = path.join(root, "special-directory");
	await mkdir(special);
	await chmod(special, 0o1755);
	await assert.rejects(workerInventory(root), /special mode/u);
});
test("worker rejects unreviewed native targets", async (context) => {
	const root = await fixture(context);
	await assert.rejects(assertWorkerRequiredPaths(root, "linux", "x64"), /reviewed/u);
});
test("worker source identity cannot be substituted", async (context) => {
	const root = await fixture(context);
	await writeFile(path.join(root, ".worker-manifest.json"), JSON.stringify({ schemaVersion: 1, service: "isthereconsensus.org-search-worker", source: { commit: "a".repeat(40), dirty: false } }));
	await assert.rejects(verifyWorkerArtifact(root, { expectedCommit: "b".repeat(40) }));
});
test("worker requires its offline WASM assets independently", async (context) => {
	const root = await fixture(context);
	await rm(path.join(root, "node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm"));
	await assert.rejects(assertWorkerRequiredPaths(root, "linux", "arm64"), { code: "ENOENT" });
});
test("worker rejects mismatched runtime metadata", async (context) => {
	const root = await fixture(context);
	await writeFile(path.join(root, "node_modules/onnxruntime-node/package.json"), JSON.stringify({ version: "0.0.0" }));
	await assert.rejects(assertWorkerRequiredPaths(root, "linux", "arm64"), /exactly pinned/u);
});
