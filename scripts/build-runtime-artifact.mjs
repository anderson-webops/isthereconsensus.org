import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import {
	chmod,
	cp,
	lstat,
	mkdir,
	readdir,
	readFile,
	readlink,
	realpath,
	rm,
	writeFile
} from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = await realpath(process.cwd());
const artifactRoot = path.join(root, ".runtime-artifact");
const manifestName = ".runtime-manifest.json";
const requiredPaths = [
	"back-end/dist/server.js",
	"back-end/dist/scripts/monitorSourceIntegrity.js",
	"back-end/dist/scripts/seedContent.js",
	"back-end/package.json",
	"back-end/package-lock.json",
	"front-end/.output/public/deployment.json",
	"front-end/.output/server/index.mjs"
];

function git(args) {
	return execFileSync("git", args, {
		cwd: root,
		encoding: "utf8",
		stdio: ["ignore", "pipe", "ignore"]
	}).trim();
}

function gitOptional(args) {
	try {
		return git(args);
	}
	catch {
		return "";
	}
}

function runSelectedNpm(args, cwd) {
	const npmExecPath = process.env.npm_execpath;
	if (!npmExecPath) throw new Error("Run artifact:build through npm so the selected npm executable is known.");
	const env = { ...process.env };
	delete env.npm_config_global_ignore_file;
	delete env.NPM_CONFIG_GLOBAL_IGNORE_FILE;
	const result = spawnSync(process.execPath, [npmExecPath, ...args], {
		cwd,
		encoding: "utf8",
		env,
		maxBuffer: 20 * 1024 * 1024
	});
	process.stdout.write(result.stdout || "");
	process.stderr.write(result.stderr || "");
	if (result.status !== 0) throw new Error(`npm ${args.join(" ")} failed with exit code ${result.status}.`);
}

async function assertFile(relativePath) {
	const metadata = await lstat(path.join(root, relativePath));
	if (!metadata.isFile()) throw new Error(`Required build output is not a file: ${relativePath}`);
}

async function normalizeTree(directory) {
	await chmod(directory, 0o755);
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const absolutePath = path.join(directory, entry.name);
		if (entry.isDirectory()) await normalizeTree(absolutePath);
		else if (entry.isFile()) await chmod(absolutePath, 0o644);
	}
}

async function removeSourceMaps(directory) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const absolutePath = path.join(directory, entry.name);
		if (entry.isDirectory()) await removeSourceMaps(absolutePath);
		else if (entry.isFile() && entry.name.endsWith(".map")) await rm(absolutePath);
	}
}

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

for (const relativePath of [
	"back-end/dist/server.js",
	"back-end/dist/scripts/monitorSourceIntegrity.js",
	"back-end/dist/scripts/seedContent.js",
	"front-end/.output/server/index.mjs",
	"front-end/.output/public/deployment.json"
]) {
	await assertFile(relativePath);
}

await rm(artifactRoot, { force: true, recursive: true });
await Promise.all([
	mkdir(path.join(artifactRoot, "back-end"), { recursive: true }),
	mkdir(path.join(artifactRoot, "front-end"), { recursive: true })
]);
await Promise.all([
	cp(path.join(root, "back-end/dist"), path.join(artifactRoot, "back-end/dist"), { recursive: true }),
	cp(path.join(root, "front-end/.output"), path.join(artifactRoot, "front-end/.output"), { recursive: true }),
	cp(path.join(root, "back-end/package.json"), path.join(artifactRoot, "back-end/package.json")),
	cp(path.join(root, "back-end/package-lock.json"), path.join(artifactRoot, "back-end/package-lock.json")),
	cp(path.join(root, "back-end/.npmrc"), path.join(artifactRoot, "back-end/.npmrc"))
]);

runSelectedNpm(
	["ci", "--omit=dev", "--include=optional", "--strict-allow-scripts", "--no-fund"],
	path.join(artifactRoot, "back-end")
);
runSelectedNpm(["ls", "--omit=dev", "--all"], path.join(artifactRoot, "back-end"));
await rm(path.join(artifactRoot, "back-end/node_modules/.bin"), { force: true, recursive: true });
await removeSourceMaps(path.join(artifactRoot, "back-end/dist"));
await normalizeTree(artifactRoot);

for (const relativePath of requiredPaths) {
	const metadata = await lstat(path.join(artifactRoot, relativePath));
	if (!metadata.isFile()) throw new Error(`Runtime artifact is missing required file: ${relativePath}`);
}

const files = await inventory(artifactRoot);
const sourceCommit = git(["rev-parse", "HEAD"]);
const deployment = JSON.parse(
	await readFile(path.join(artifactRoot, "front-end/.output/public/deployment.json"), "utf8")
);
const deploymentCommit = String(deployment.commit || "");
if (!/^[a-f0-9]{12,40}$/u.test(deploymentCommit) || !sourceCommit.startsWith(deploymentCommit)) {
	throw new Error("Frontend deployment metadata does not identify the artifact source commit.");
}
const sourceTimestamp = Number.parseInt(git(["show", "-s", "--format=%ct", "HEAD"]), 10);
const manifest = {
	schemaVersion: 1,
	service: "isthereconsensus.org",
	source: {
		commit: sourceCommit,
		dirty: Boolean(git(["status", "--porcelain"])),
		tag: process.env.SOURCE_TAG || gitOptional(["describe", "--tags", "--exact-match"]) || null,
		timestamp: new Date(sourceTimestamp * 1000).toISOString()
	},
	toolchain: {
		node: process.version,
		npm: execFileSync(process.execPath, [process.env.npm_execpath, "--version"], { encoding: "utf8" }).trim()
	},
	entrypoints: {
		api: "back-end/dist/server.js",
		seed: "back-end/dist/scripts/seedContent.js",
		sourceIntegrity: "back-end/dist/scripts/monitorSourceIntegrity.js",
		web: "front-end/.output/server/index.mjs"
	},
	requiredPaths,
	writablePaths: [],
	externalState: ["MongoDB content, accounts, sessions, and editorial records remain outside immutable releases."],
	nativeBindings: files
		.filter(entry => entry.type === "file" && entry.path.endsWith(".node"))
		.map(entry => ({ hash: entry.hash, path: entry.path })),
	files
};

await writeFile(path.join(artifactRoot, manifestName), `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o644 });
process.stdout.write(`Built runtime artifact with ${files.length} hashed entries at ${artifactRoot}.\n`);
