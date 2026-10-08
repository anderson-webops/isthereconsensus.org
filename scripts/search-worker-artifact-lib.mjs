import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat, readdir, readFile, readlink } from "node:fs/promises";
import path from "node:path";
import contractReference from "../search-worker/deployment-contract.json" with { type: "json" };
import modelReference from "../search-worker/models.lock.json" with { type: "json" };

export const workerRequiredPaths = [
	"node_modules/onnxruntime-web/dist/ort.node.min.mjs",
	"node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.mjs",
	"node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm",
	"node_modules/@huggingface/tokenizers/dist/tokenizers.mjs",
	"package.json",
	"package-lock.json",
	".npmrc",
	"deployment-contract.json",
	"dist/search-worker/models.lock.json",
	"dist/search-worker/src/server.js",
	"dist/search-worker/src/child.js",
	"dist/search-worker/src/runtime.js",
	"dist/search-worker/src/assets.js",
	"dist/search-worker/src/supervisor.js",
	"dist/search-worker/src/pipeline.js",
	"dist/back-end/src/utils/publicSearchWorker.js",
	"dist/back-end/src/utils/httpRequestCancellation.js",
	"dist/back-end/src/utils/claimSearch.js",
	"dist/back-end/src/utils/searchMatch.js",
	"dist/back-end/src/data/contentDemand.js"
];
export const workerRuntimeVersions = { ...modelReference.runtime, zod: "4.6.5" };
export const sha256 = value => createHash("sha256").update(value).digest("hex");
export async function fileDigest(filename) {
	const digest = createHash("sha256");
	for await (const chunk of createReadStream(filename)) digest.update(chunk);
	return digest.digest("hex");
}
export async function workerInventory(root, directory = root) {
	const rows = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const filename = path.join(directory, entry.name);
		const relative = path.relative(root, filename).split(path.sep).join("/");
		if (relative === ".worker-manifest.json") continue;
		const stat = await lstat(filename);
		assert.equal(stat.mode & 0o7000, 0, "Artifact entries cannot have special mode bits.");
		if (stat.isDirectory()) {
			rows.push(...await workerInventory(root, filename));
		}
		else if (stat.isSymbolicLink()) {
			const target = await readlink(filename);
			const destination = path.resolve(path.dirname(filename), target);
			assert.ok(!path.isAbsolute(target) && destination.startsWith(`${root}${path.sep}`), "Artifact links must stay inside the tree.");
			await lstat(destination);
			rows.push({ path: relative, type: "symlink", target, sha256: sha256(target) });
		}
		else {
			assert.ok(stat.isFile(), "Artifact entries must be files, directories or internal links.");
			rows.push({ path: relative, type: "file", size: stat.size, mode: stat.mode & 0o777, sha256: await fileDigest(filename) });
		}
	}
	return rows.sort((left, right) => left.path.localeCompare(right.path));
}
export async function assertWorkerRequiredPaths(root, platform, architecture) {
	assert.ok(["linux", "darwin"].includes(platform) && architecture === "arm64", "Only reviewed ARM64 artifact targets are supported.");
	const nativeRoot = `node_modules/onnxruntime-node/bin/napi-v6/${platform}/${architecture}`;
	const bindings = ["onnxruntime_binding.node", platform === "linux" ? "libonnxruntime.so.1" : "libonnxruntime.1.dylib"];
	for (const relative of [...workerRequiredPaths, ...bindings.map(filename => `${nativeRoot}/${filename}`)]) {
		const stat = await lstat(path.join(root, relative));
		assert.ok(stat.isFile() && !stat.isSymbolicLink(), "An independent required runtime file is missing.");
	}
	for (const [name, version] of Object.entries(workerRuntimeVersions)) {
		const stat = await lstat(path.join(root, "node_modules", name, "package.json"));
		assert.ok(stat.isFile(), "A direct production dependency is absent.");
		const metadata = JSON.parse(await readFile(path.join(root, "node_modules", name, "package.json"), "utf8"));
		assert.equal(metadata.version, version, "The artifact production runtime version must be exactly pinned.");
	}
	const forbidden = [".env", ".git", "src", "test", "node_modules/tsx", "node_modules/typescript"];
	for (const relative of forbidden) {
		try {
			await lstat(path.join(root, relative));
			throw new Error("Artifact contains a forbidden private or development path.");
		}
		catch (error) {
			if (error.code !== "ENOENT") throw error;
		}
	}
}
export async function verifyWorkerArtifact(root, { expectedCommit, requireClean = false } = {}) {
	const manifest = JSON.parse(await readFile(path.join(root, ".worker-manifest.json"), "utf8"));
	assert.equal(manifest.schemaVersion, 1);
	assert.equal(manifest.service, "isthereconsensus.org-search-worker");
	assert.match(manifest.source.commit, /^[a-f0-9]{40}$/u);
	if (expectedCommit) assert.equal(manifest.source.commit, expectedCommit);
	if (requireClean) assert.equal(manifest.source.dirty, false, "Production artifacts need a clean source identity.");
	assert.deepEqual(manifest.requiredPaths, workerRequiredPaths);
	assert.deepEqual(manifest.writablePaths, []);
	await assertWorkerRequiredPaths(root, manifest.target.platform, manifest.target.architecture);
	const contract = JSON.parse(await readFile(path.join(root, "deployment-contract.json"), "utf8"));
	assert.deepEqual(contract, contractReference, "The independent source-to-host contract must be unchanged.");
	assert.equal(contract.schemaVersion, 1);
	assert.equal(contract.service, manifest.service);
	assert.equal(contract.activationDefault, "unset");
	assert.equal(contract.runtimeNetworkDownloads, false);
	assert.equal(manifest.contractSha256, await fileDigest(path.join(root, "deployment-contract.json")));
	const lock = JSON.parse(await readFile(path.join(root, "dist/search-worker/models.lock.json"), "utf8"));
	assert.deepEqual(lock, modelReference, "The artifact must preserve every independently pinned model and runtime.");
	assert.equal(lock.candidate, contract.candidate);
	for (const entry of lock.files) {
		const filename = path.join(root, "models", entry.path);
		const stat = await lstat(filename);
		assert.ok(stat.isFile() && !stat.isSymbolicLink());
		assert.equal(stat.size, entry.size);
		assert.equal(await fileDigest(filename), entry.sha256);
	}
	const files = await workerInventory(root);
	assert.deepEqual(files, manifest.files);
	assert.equal(manifest.contentSha256, sha256(JSON.stringify(files)));
	return manifest;
}
