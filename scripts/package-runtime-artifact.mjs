import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { copyFile, lstat, mkdir, mkdtemp, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const artifact = path.resolve(process.argv[2] || ".runtime-artifact");
const output = path.resolve(process.argv[3] || ".runtime-release-assets");
const manifestPath = path.join(artifact, ".runtime-manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const git = (args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const commit = git(["rev-parse", "HEAD"]);
const tag = manifest.source?.tag;
const sourceTimestamp = Date.parse(manifest.source?.timestamp || "");

if (
	process.platform !== "linux" ||
	process.arch !== "arm64" ||
	!process.report.getReport().header.glibcVersionRuntime
) {
	throw new Error("Runtime release archives must be packaged inside Linux ARM64 glibc.");
}
if (!Number.isFinite(sourceTimestamp)) {
	throw new Error("Runtime artifact source timestamp is invalid.");
}

if (output === artifact || output.startsWith(`${artifact}${path.sep}`)) {
	throw new Error("Runtime release assets must be outside the artifact tree.");
}
if (manifest.source?.commit !== commit || manifest.source?.dirty !== false) {
	throw new Error("The clean runtime artifact must match the current source commit.");
}
if (git(["status", "--porcelain", "--untracked-files=all"])) {
	throw new Error("Runtime release assets require a clean source checkout.");
}
if (
	!/^v1\.\d+\.\d+$/u.test(tag || "") ||
	git(["cat-file", "-t", `refs/tags/${tag}`]) !== "tag" ||
	git(["rev-parse", `refs/tags/${tag}^{commit}`]) !== commit
) {
	throw new Error("Runtime release assets require an annotated v1 tag at the artifact source commit.");
}
if (manifest.toolchain?.node !== "v24.22.1" || manifest.toolchain?.npm !== "12.2.1") {
	throw new Error("Runtime artifact toolchain does not match the reviewed release contract.");
}
git(["merge-base", "--is-ancestor", commit, "refs/remotes/origin/main"]);
if (!process.env.RUNTIME_ARTIFACT_MONGO_URI) {
	throw new Error("Release packaging requires an isolated synthetic MongoDB fixture.");
}

try {
	await lstat(output);
	throw new Error("Refusing to replace existing runtime release assets.");
} catch (error) {
	if (error?.code !== "ENOENT") throw error;
}

function verify(directory) {
	execFileSync(process.execPath, ["scripts/verify-runtime-artifact.mjs", directory], {
		cwd: process.cwd(),
		stdio: "inherit",
		env: {
			...process.env,
			RUNTIME_ARTIFACT_REQUIRE_CLEAN: "true",
			RUNTIME_ARTIFACT_EXPECT_TARGET: "linux-arm64-glibc",
			RUNTIME_ARTIFACT_EXPECT_COMMIT: commit
		}
	});
}

async function digest(filename) {
	const hash = createHash("sha256");
	for await (const chunk of createReadStream(filename)) hash.update(chunk);
	return hash.digest("hex");
}

verify(artifact);
await mkdir(path.dirname(output), { recursive: true });
const staging = await mkdtemp(path.join(path.dirname(output), ".runtime-release-assets-"));
const archiveName = `isthereconsensus-${commit.slice(0, 12)}-linux-arm64-runtime.tar.gz`;
const archive = path.join(staging, archiveName);

try {
	execFileSync(
		"tar",
		[
			"--format=ustar",
			"--sort=name",
			"--owner=0",
			"--group=0",
			"--numeric-owner",
			`--mtime=@${Math.floor(sourceTimestamp / 1000)}`,
			"-czf",
			archive,
			"-C",
			artifact,
			".runtime-manifest.json",
			"back-end",
			"front-end",
			"deploy"
		],
		{ stdio: "inherit", env: { ...process.env, TAR_OPTIONS: "" } }
	);
	const unpacked = path.join(staging, "unpacked");
	await mkdir(unpacked);
	execFileSync("tar", ["--same-permissions", "-xzf", archive, "-C", unpacked], { stdio: "inherit" });
	verify(unpacked);
	if ((await digest(path.join(unpacked, ".runtime-manifest.json"))) !== (await digest(manifestPath))) {
		throw new Error("Unpacked runtime manifest does not match the accepted artifact.");
	}
	execFileSync(process.execPath, ["scripts/runtime-artifact-smoke.mjs", unpacked], {
		stdio: "inherit",
		env: { ...process.env, RUNTIME_ARTIFACT_REQUIRE_DATABASE: "true" }
	});
	await rm(unpacked, { recursive: true });

	const manifestName = "runtime-manifest.json";
	const receiptName = "acceptance.json";
	const archiveSha256 = await digest(archive);
	await copyFile(manifestPath, path.join(staging, manifestName));
	const receipt = {
		schemaVersion: 1,
		service: "isthereconsensus.org",
		source: manifest.source,
		target: manifest.target,
		toolchain: manifest.toolchain,
		archive: { name: archiveName, bytes: (await stat(archive)).size, sha256: archiveSha256 },
		manifestSha256: await digest(manifestPath),
		verifiedUnpacked: true,
		productionActivationVerified: false
	};
	await writeFile(path.join(staging, receiptName), `${JSON.stringify(receipt, null, 2)}\n`);
	const checksums = await Promise.all(
		[archiveName, manifestName, receiptName].map(
			async (name) => `${await digest(path.join(staging, name))}  ${name}`
		)
	);
	await writeFile(path.join(staging, "SHA256SUMS"), `${checksums.join("\n")}\n`);
	await rename(staging, output);
	process.stdout.write(`Accepted exact Linux ARM64 runtime archive ${archiveSha256} at ${output}.\n`);
} catch (error) {
	await rm(staging, { recursive: true, force: true });
	throw error;
}
