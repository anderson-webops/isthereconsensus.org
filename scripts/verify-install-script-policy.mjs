import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const repositoryRoot = new URL("..", import.meta.url);

function read(path) {
	return readFileSync(new URL(path, repositoryRoot), "utf8");
}

function readJson(path) {
	return JSON.parse(read(path));
}

function packageVersion(lockfile, packageName) {
	return lockfile.packages?.[`node_modules/${packageName}`]?.version;
}

function exactApproval(lockfile, packageName) {
	const version = packageVersion(lockfile, packageName);
	assert.ok(version, `${packageName} is missing from its lockfile.`);
	return `${packageName}@${version}`;
}

function parseProjectAllowScripts(path) {
	const line = read(path)
		.split(/\r?\n/u)
		.find(value => value.startsWith("allow-scripts="));

	assert.ok(line, `${path} must define allow-scripts.`);
	return line.slice("allow-scripts=".length).split(",").sort();
}

function runSelectedNpm(args, cwd = repositoryRoot) {
	const npmExecPath = process.env.npm_execpath;
	assert.ok(npmExecPath, "Run install-script verification through npm so the selected npm executable is known.");

	const env = { ...process.env };
	delete env.npm_config_global_ignore_file;
	delete env.NPM_CONFIG_GLOBAL_IGNORE_FILE;

	const result = spawnSync(process.execPath, [npmExecPath, ...args], {
		cwd,
		encoding: "utf8",
		env,
		maxBuffer: 10 * 1024 * 1024
	});
	const output = [result.stdout, result.stderr].filter(Boolean).join("");

	if (result.status !== 0) {
		process.stdout.write(output);
		throw new Error(`npm ${args.join(" ")} failed with exit code ${result.status}.`);
	}

	for (const warning of [
		/install scripts blocked because they are not covered by allowScripts/iu,
		/not yet covered by allowScripts/iu,
		/allowScripts in workspace .* is ignored/iu,
		/ignoring workspace config/iu
	]) {
		assert.doesNotMatch(output, warning, `npm ${args.join(" ")} emitted an install-script policy warning.`);
	}
}

const rootPackage = readJson("package.json");
const rootLock = readJson("package-lock.json");
const backEndLock = readJson("back-end/package-lock.json");
const rootApprovals = ["argon2", "esbuild", "fsevents", "unrs-resolver"];
const expectedRootPolicy = Object.fromEntries(
	rootApprovals.map(packageName => [exactApproval(rootLock, packageName), true])
);
expectedRootPolicy["express-rate-limit"] = false;
expectedRootPolicy.mongodb = false;
expectedRootPolicy.puppeteer = false;

assert.deepEqual(rootPackage.allowScripts, expectedRootPolicy, "The root install-script policy must match the lockfile.");

for (const packageName of ["argon2", "esbuild", "fsevents"]) {
	const approval = exactApproval(backEndLock, packageName);
	assert.equal(
		rootPackage.allowScripts[approval],
		true,
		`The root policy must approve ${approval} for backend workspace installs.`
	);
}

const expectedBackEndPolicy = ["argon2", "esbuild", "fsevents"]
	.map(packageName => exactApproval(backEndLock, packageName))
	.sort();
assert.deepEqual(parseProjectAllowScripts("back-end/.npmrc"), expectedBackEndPolicy);

runSelectedNpm(["ci", "--include=optional", "--strict-allow-scripts", "--dry-run"]);

const standaloneRoot = mkdtempSync(join(tmpdir(), "isthereconsensus-backend-install-"));
try {
	for (const name of ["package.json", "package-lock.json", ".npmrc"]) {
		cpSync(fileURLToPath(new URL(`back-end/${name}`, repositoryRoot)), join(standaloneRoot, name));
	}
	runSelectedNpm(["ci", "--include=optional", "--strict-allow-scripts", "--dry-run"], standaloneRoot);
}
finally {
	rmSync(standaloneRoot, { force: true, recursive: true });
}

console.log("Install-script policy verified for root and standalone backend clean installs.");
