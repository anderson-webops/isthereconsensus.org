import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { describe, it } from "node:test";

interface Lockfile {
	packages: Record<string, { version?: string; resolved?: string; link?: boolean }>;
}
interface Manifest {
	overrides: Record<string, unknown>;
}

function readJson<Contents>(path: string): Contents {
	return JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8")) as Contents;
}

function lockedVersions(lock: Lockfile, packageName: string) {
	return Object.entries(lock.packages)
		.filter(([path]) => path === `node_modules/${packageName}` || path.endsWith(`/node_modules/${packageName}`))
		.map(([, record]) => record.version);
}

describe("reviewed dependency security pins", () => {
	it("resolves every affected toolchain occurrence to its reviewed override", () => {
		const manifest = readJson<Manifest>("../../package.json");
		const lock = readJson<Lockfile>("../../package-lock.json");
		for (const packageName of ["katex", "source-map-js", "tinypool"]) {
			const expected = manifest.overrides[packageName];
			assert.equal(typeof expected, "string", `${packageName}: missing reviewed override`);
			const versions = lockedVersions(lock, packageName);
			assert.ok(versions.length, `${packageName}: package is missing from the lock`);
			assert.ok(versions.every(version => version === expected), `${packageName}: an unreviewed version remains`);
		}
	});

	it("keeps the production proxy dependency aligned in root and standalone backend installs", () => {
		const root = readJson<Manifest>("../../package.json");
		const backend = readJson<Manifest>("../package.json");
		const expected = root.overrides["proxy-addr"];
		assert.equal(typeof expected, "string");
		assert.equal(backend.overrides["proxy-addr"], expected);
		for (const path of ["../../package-lock.json", "../package-lock.json"]) {
			const versions = lockedVersions(readJson<Lockfile>(path), "proxy-addr");
			assert.ok(versions.length, `${path}: production proxy dependency is missing`);
			assert.ok(versions.every(version => version === expected), `${path}: root/standalone production lock drift`);
		}
	});

	it("keeps every Git implementation and adapter link canonical in the committed lock", () => {
		const lock = readJson<Lockfile>("../../package-lock.json");
		for (const [path, record] of Object.entries(lock.packages).filter(([path]) => path.endsWith("/simple-git"))) {
			if (path === "vendor/simple-git") {
				assert.equal(record.version, "4.0.2-webops.1");
			}
			else if (record.link) {
				assert.equal(record.resolved, "vendor/simple-git", `${path}: noncanonical adapter link`);
			}
			else {
				assert.equal(record.version, "4.0.2", `${path}: incomplete or unpatched Git lock entry`);
			}
		}
	});

	it("adapts legacy imports without replacing the patched Git implementation or its default guards", async () => {
		const root = readJson<{ devDependencies: Record<string, string>; overrides: Record<string, unknown> }>("../../package.json");
		const adapter = readJson<{ dependencies: Record<string, string> }>("../../vendor/simple-git/package.json");
		assert.equal(root.devDependencies["simple-git"], "file:vendor/simple-git");
		assert.deepEqual(root.overrides["simple-git"], { ".": "$simple-git", "simple-git": "4.0.2" });
		assert.equal(adapter.dependencies["simple-git"], "4.0.2");
		const lock = readJson<Lockfile>("../../package-lock.json");
		for (const [packageName, expected] of [["simple-git", "4.0.2"], ["@simple-git/argv-parser", "2.0.1"]]) {
			const versions = lockedVersions(lock, packageName);
			const installed = versions.filter(Boolean);
			assert.ok(installed.length && installed.every(version => version === expected), `${packageName}: patched implementation drift`);
		}
		const esm = await import("simple-git");
		const require = createRequire(new URL("../../front-end/package.json", import.meta.url));
		const commonjs = require("simple-git");
		const devtoolsRequire = createRequire(new URL("../../front-end/node_modules/@nuxt/devtools/package.json", import.meta.url));
		assert.equal(devtoolsRequire("simple-git"), commonjs);
		assert.equal(esm.default, esm.simpleGit);
		assert.equal(commonjs, commonjs.simpleGit);
		for (const exports of [esm, commonjs]) {
			assert.equal(typeof exports.GitError, "function");
			assert.equal(typeof exports.simpleGit, "function");
			const client = exports.simpleGit({ baseDir: new URL("../..", import.meta.url).pathname });
			assert.equal(await client.checkIsRepo(), true);
			assert.equal(typeof (await client.status()).isClean(), "boolean");
		}
	});
});
