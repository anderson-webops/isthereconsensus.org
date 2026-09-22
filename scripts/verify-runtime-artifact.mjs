import { createHash } from "node:crypto";
import { lstat, readdir, readFile, readlink, realpath } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const manifestName = ".runtime-manifest.json";
const independentRequiredPaths = [
	"back-end/dist/server.js",
	"back-end/dist/scripts/monitorSourceIntegrity.js",
	"back-end/dist/scripts/seedContent.js",
	"back-end/package.json",
	"back-end/package-lock.json",
	"front-end/.output/public/deployment.json",
	"front-end/.output/server/index.mjs"
];
const artifactRoot = await realpath(path.resolve(process.argv[2] || ".runtime-artifact"));

async function hashFile(absolutePath) {
	return createHash("sha256").update(await readFile(absolutePath)).digest("hex");
}

async function inventory(directory, prefix = "") {
	const files = [];
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const relativePath = path.posix.join(prefix, entry.name);
		if (relativePath === manifestName) continue;
		const absolutePath = path.join(directory, entry.name);
		const metadata = await lstat(absolutePath);
		if (metadata.isDirectory()) {
			files.push(...await inventory(absolutePath, relativePath));
		}
		else if (metadata.isSymbolicLink()) {
			const target = await readlink(absolutePath);
			const resolvedTarget = path.resolve(path.dirname(absolutePath), target);
			if (resolvedTarget !== artifactRoot && !resolvedTarget.startsWith(`${artifactRoot}${path.sep}`)) {
				throw new Error(`Artifact symlink escapes its root: ${relativePath} -> ${target}`);
			}
			files.push({
				hash: createHash("sha256").update(target).digest("hex"),
				mode: metadata.mode & 0o777,
				path: relativePath,
				target,
				type: "symlink"
			});
		}
		else if (metadata.isFile()) {
			files.push({
				hash: await hashFile(absolutePath),
				mode: metadata.mode & 0o777,
				path: relativePath,
				size: metadata.size,
				type: "file"
			});
		}
		else {
			throw new Error(`Unsupported artifact entry type: ${relativePath}`);
		}
	}
	return files.sort((left, right) => left.path.localeCompare(right.path));
}

const manifest = JSON.parse(await readFile(path.join(artifactRoot, manifestName), "utf8"));
if (manifest.schemaVersion !== 1 || manifest.service !== "isthereconsensus.org") {
	throw new Error("Runtime artifact manifest has an unsupported identity or schema version.");
}
if (!/^[a-f0-9]{40}$/u.test(manifest.source?.commit || "")) {
	throw new Error("Runtime artifact manifest is missing a full source commit.");
}
if (process.env.RUNTIME_ARTIFACT_REQUIRE_CLEAN === "true" && manifest.source?.dirty !== false) {
	throw new Error("Production runtime artifacts must come from a clean source checkout.");
}
const expectedCommit = process.env.RUNTIME_ARTIFACT_EXPECT_COMMIT;
if (expectedCommit && !manifest.source.commit.startsWith(expectedCommit)) {
	throw new Error(`Runtime artifact source ${manifest.source.commit} does not match ${expectedCommit}.`);
}
if (JSON.stringify(manifest.requiredPaths) !== JSON.stringify(independentRequiredPaths)) {
	throw new Error("Runtime artifact required-path contract does not match the independent verifier.");
}
if (!Array.isArray(manifest.writablePaths) || manifest.writablePaths.length !== 0) {
	throw new Error("Immutable runtime artifact must not declare writable release paths.");
}

for (const relativePath of independentRequiredPaths) {
	const metadata = await lstat(path.join(artifactRoot, relativePath));
	if (!metadata.isFile()) throw new Error(`Runtime artifact is missing required file: ${relativePath}`);
}
for (const forbiddenPath of [".env", "back-end/.env", "front-end/.env", ".git"]) {
	try {
		await lstat(path.join(artifactRoot, forbiddenPath));
		throw new Error(`Runtime artifact contains forbidden private/source path: ${forbiddenPath}`);
	}
	catch (error) {
		if (error instanceof Error && "code" in error && error.code === "ENOENT") continue;
		throw error;
	}
}

const actualFiles = await inventory(artifactRoot);
if (JSON.stringify(actualFiles) !== JSON.stringify(manifest.files)) {
	const expected = new Map((manifest.files || []).map(entry => [entry.path, entry]));
	const actual = new Map(actualFiles.map(entry => [entry.path, entry]));
	const firstMismatch = [...new Set([...expected.keys(), ...actual.keys()])]
		.sort()
		.find(file => JSON.stringify(expected.get(file)) !== JSON.stringify(actual.get(file)));
	throw new Error(`Runtime artifact inventory or hash mismatch${firstMismatch ? ` at ${firstMismatch}` : ""}.`);
}

const expectedNativeBindings = actualFiles
	.filter(entry => entry.type === "file" && entry.path.endsWith(".node"))
	.map(entry => ({ hash: entry.hash, path: entry.path }));
if (!expectedNativeBindings.length) {
	throw new Error("Runtime artifact does not contain a native password-hashing binding.");
}
if (JSON.stringify(expectedNativeBindings) !== JSON.stringify(manifest.nativeBindings)) {
	throw new Error("Runtime artifact native-binding inventory is incomplete.");
}

const deployment = JSON.parse(
	await readFile(path.join(artifactRoot, "front-end/.output/public/deployment.json"), "utf8")
);
const deploymentCommit = String(deployment.commit || "");
if (
	deployment.ok !== true
	|| deployment.service !== "front-end"
	|| deployment.runtime !== "nuxt-ssr"
	|| !/^[a-f0-9]{12,40}$/u.test(deploymentCommit)
	|| !manifest.source.commit.startsWith(deploymentCommit)
) {
	throw new Error("Runtime artifact frontend identity does not match its source manifest.");
}
if ("nodeEnv" in deployment) {
	throw new Error("Public deployment metadata must not expose process environment details.");
}

process.stdout.write(`Verified runtime artifact with ${actualFiles.length} hashed entries.\n`);
