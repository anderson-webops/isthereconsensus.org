import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { chmod, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { test } from "node:test";
import { attestationArguments, verifyReleaseAssets } from "./verify-runtime-release.mjs";

const commit = "a".repeat(40);
const tag = "v1.38.33";
const archive = `isthereconsensus-${commit.slice(0, 12)}-linux-arm64-runtime.tar.gz`;
const digest = bytes => createHash("sha256").update(bytes).digest("hex");

async function withFixture(run) {
	const directory = await mkdtemp(path.join(os.tmpdir(), "consensus-release-metadata-"));
	try {
		const archiveBytes = Buffer.from("synthetic metadata fixture, not a runtime archive");
		const manifest = {
			schemaVersion: 1,
			service: "isthereconsensus.org",
			source: { commit, tag, dirty: false },
			target: { platform: "linux", architecture: "arm64", libc: "glibc" },
			toolchain: { node: "v24.18.1", npm: "12.0.2" },
			files: [{ type: "file", path: "synthetic", size: 1 }]
		};
		const manifestBytes = Buffer.from(JSON.stringify(manifest));
		const receipt = {
			schemaVersion: 1,
			service: manifest.service,
			source: manifest.source,
			target: manifest.target,
			toolchain: manifest.toolchain,
			archive: { name: archive, bytes: archiveBytes.length, sha256: digest(archiveBytes) },
			manifestSha256: digest(manifestBytes),
			verifiedUnpacked: true,
			productionActivationVerified: false
		};
		const files = new Map([
			[archive, archiveBytes],
			["runtime-manifest.json", manifestBytes],
			["acceptance.json", Buffer.from(JSON.stringify(receipt))]
		]);
		for (const [name, bytes] of files) await writeFile(path.join(directory, name), bytes, { mode: 0o600 });
		await writeFile(path.join(directory, "SHA256SUMS"), [...files].map(([name, bytes]) => `${digest(bytes)}  ${name}\n`).join(""));
		await run(directory, manifest, receipt);
	}
	finally {
		await rm(directory, { recursive: true, force: true });
	}
}

test("validates bounded metadata without claiming it is authenticated provenance", async () => {
	await withFixture(async (directory) => {
		assert.equal((await verifyReleaseAssets(directory, commit, tag)).length, 4);
		await assert.rejects(verifyReleaseAssets(directory, commit, tag, true), /exact required asset set/u);
	});
});

test("rejects substitution of every exact checksum subject", async () => {
	for (const name of [archive, "runtime-manifest.json", "acceptance.json", "SHA256SUMS"]) {
		await withFixture(async (directory) => {
			await writeFile(path.join(directory, name), `${await readFile(path.join(directory, name))} `);
			await assert.rejects(verifyReleaseAssets(directory, commit, tag));
		});
	}
});

test("rejects missing, extra and linked assets", async () => {
	await withFixture(async (directory) => {
		await writeFile(path.join(directory, "unexpected"), "synthetic");
		await assert.rejects(verifyReleaseAssets(directory, commit, tag), /exact required asset set/u);
		await rm(path.join(directory, "unexpected"));
		await rm(path.join(directory, archive));
		await assert.rejects(verifyReleaseAssets(directory, commit, tag), /exact required asset set/u);
		await symlink("acceptance.json", path.join(directory, archive));
		await assert.rejects(verifyReleaseAssets(directory, commit, tag), /regular/u);
	});
});

test("rejects writable release subjects and a symlinked directory", async () => {
	await withFixture(async (directory) => {
		await chmod(path.join(directory, "acceptance.json"), 0o666);
		await assert.rejects(verifyReleaseAssets(directory, commit, tag), /protected/u);
	});
	await withFixture(async (directory) => {
		const linked = `${directory}-link`;
		try {
			await symlink(directory, linked);
			await assert.rejects(verifyReleaseAssets(linked, commit, tag), /real directory/u);
		}
		finally {
			await rm(linked);
		}
	});
});

test("rejects wrong source, platform, toolchain and false acceptance claims", async () => {
	for (const change of [
		(manifest) => { manifest.source.dirty = true; },
		(manifest) => { manifest.source.commit = "b".repeat(40); },
		(manifest) => { manifest.source.tag = "v1.0.0"; },
		(manifest) => { manifest.target.architecture = "x64"; },
		(manifest) => { manifest.toolchain.node = "v26.0.0"; },
		(manifest) => { manifest.files[0].size = 2 ** 31; }
	]) {
		await withFixture(async (directory, manifest) => {
			change(manifest);
			await writeFile(path.join(directory, "runtime-manifest.json"), JSON.stringify(manifest));
			await assert.rejects(verifyReleaseAssets(directory, commit, tag), /manifest/u);
		});
	}
	await withFixture(async (directory, _manifest, receipt) => {
		receipt.productionActivationVerified = true;
		await writeFile(path.join(directory, "acceptance.json"), JSON.stringify(receipt));
		await assert.rejects(verifyReleaseAssets(directory, commit, tag), /receipt/u);
	});
});

test("pins repository, workflow, source, signer, tag and GitHub-hosted identity", () => {
	const args = attestationArguments("subject", "bundle", commit, tag);
	for (const pair of [
		["--repo", "anderson-webops/isthereconsensus.org"],
		["--signer-workflow", "anderson-webops/isthereconsensus.org/.github/workflows/ci.yml"],
		["--signer-digest", commit],
		["--source-digest", commit],
		["--source-ref", `refs/tags/${tag}`]
	]) assert.equal(args[args.indexOf(pair[0]) + 1], pair[1]);
	assert.ok(args.includes("--deny-self-hosted-runners"));
	assert.throws(() => attestationArguments("subject", "bundle", "a".repeat(12), tag));
	assert.throws(() => attestationArguments("subject", "bundle", commit, "v1.0.0-rc.1"));
});

test("cryptographic verification rejects a self-authored bundle despite consistent checksums", async () => {
	await withFixture(async (directory) => {
		await writeFile(path.join(directory, "attestation-bundle.jsonl"), "{}\n");
		const result = spawnSync(process.execPath, [
			"scripts/verify-runtime-release.mjs",
			directory,
			commit,
			tag,
			"--attested"
		], { encoding: "utf8", timeout: 30_000 });
		assert.equal(result.error, undefined);
		assert.notEqual(result.status, 0);
		assert.doesNotMatch(result.stdout, /and their provenance/u);
	});
});
