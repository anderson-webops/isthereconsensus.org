import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { chmod, cp, lstat, mkdir, readdir, realpath, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import modelLock from "../search-worker/models.lock.json" with { type: "json" };
import { assertWorkerRequiredPaths, fileDigest, sha256, workerInventory, workerRequiredPaths } from "./search-worker-artifact-lib.mjs";

const root = await realpath(process.cwd());
const artifact = path.join(root, ".search-worker-artifact");
assert.ok(process.env.SEARCH_MODEL_DIR && process.env.npm_execpath, "Build via npm with an explicitly provisioned pinned model directory.");
for (const entry of modelLock.files) {
	const filename = path.join(process.env.SEARCH_MODEL_DIR, entry.path);
	const stat = await lstat(filename);
	assert.ok(stat.isFile() && !stat.isSymbolicLink());
	assert.equal(stat.size, entry.size);
	assert.equal(await fileDigest(filename), entry.sha256);
}
try {
	await lstat(artifact);
	await lstat(path.join(artifact, ".worker-manifest.json"));
	await rm(artifact, { recursive: true });
}
catch (error) {
	if (error.code !== "ENOENT") throw error;
	try {
		await lstat(artifact);
		throw new Error("Refusing to replace an unrecognized existing artifact directory.");
	}
	catch (missing) {
		if (missing.code !== "ENOENT") throw missing;
	}
}
await mkdir(artifact);
for (const filename of ["package.json", "package-lock.json", ".npmrc"]) await cp(path.join(root, "search-worker/runtime", filename), path.join(artifact, filename));
await cp(path.join(root, "search-worker/dist"), path.join(artifact, "dist"), { recursive: true });
await cp(path.join(root, "search-worker/deployment-contract.json"), path.join(artifact, "deployment-contract.json"));
for (const entry of modelLock.files) {
	const destination = path.join(artifact, "models", entry.path);
	await mkdir(path.dirname(destination), { recursive: true });
	await cp(path.join(process.env.SEARCH_MODEL_DIR, entry.path), destination, { dereference: false });
}
const npm = args => execFileSync(process.execPath, [process.env.npm_execpath, ...args], { cwd: artifact, env: { ...process.env, ONNXRUNTIME_NODE_INSTALL: "skip" }, stdio: "inherit" });
npm(["ci", "--omit=dev", "--include=optional", "--strict-allow-scripts"]);
npm(["ls", "--omit=dev", "--all"]);
await rm(path.join(artifact, "node_modules/.bin"), { recursive: true, force: true });
async function normalize(directory) {
	await chmod(directory, 0o755);
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const filename = path.join(directory, entry.name);
		if (entry.isDirectory()) await normalize(filename);
		else if (entry.isFile()) await chmod(filename, 0o644);
	}
}
await normalize(artifact);
await assertWorkerRequiredPaths(artifact, process.platform, process.arch);
const git = args => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const files = await workerInventory(artifact);
const manifest = {
	schemaVersion: 1,
	service: "isthereconsensus.org-search-worker",
	source: { commit: git(["rev-parse", "HEAD"]), tree: git(["rev-parse", "HEAD^{tree}"]), dirty: Boolean(git(["status", "--porcelain"])) },
	target: { platform: process.platform, architecture: process.arch, libc: process.platform === "linux" ? "glibc" : null },
	toolchain: { node: process.version, npm: execFileSync(process.execPath, [process.env.npm_execpath, "--version"], { encoding: "utf8" }).trim() },
	contractSha256: await fileDigest(path.join(artifact, "deployment-contract.json")),
	contentSha256: sha256(JSON.stringify(files)),
	requiredPaths: workerRequiredPaths,
	writablePaths: [],
	files,
	activation: "unset; source artifact, not host or usefulness acceptance"
};
await writeFile(path.join(artifact, ".worker-manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
const archive = `${artifact}.tar.gz`;
execFileSync("tar", ["-czf", archive, "-C", artifact, "."], { stdio: "inherit" });
await writeFile(`${artifact}.receipt.json`, `${JSON.stringify({ schemaVersion: 1, archiveSha256: await fileDigest(archive), manifestSha256: await fileDigest(path.join(artifact, ".worker-manifest.json")), contentSha256: manifest.contentSha256, source: manifest.source, activationVerified: false }, null, 2)}\n`);
process.stdout.write(`Built independent worker archive with ${files.length} verified entries; activation remains unset.\n`);
