import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { constants, createReadStream } from "node:fs";
import { lstat, open, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const repository = "anderson-webops/isthereconsensus.org";

async function readBounded(filename, maximumBytes) {
	const file = await open(filename, constants.O_RDONLY | constants.O_NOFOLLOW);
	try {
		const metadata = await file.stat();
		if (!metadata.isFile() || metadata.nlink !== 1 || metadata.size < 1 || metadata.size > maximumBytes) {
			throw new Error("Release metadata is not a bounded regular file.");
		}
		return await file.readFile();
	}
	finally {
		await file.close();
	}
}

function digest(bytes) {
	return createHash("sha256").update(bytes).digest("hex");
}

async function fileDigest(filename) {
	const hash = createHash("sha256");
	for await (const chunk of createReadStream(filename)) hash.update(chunk);
	return hash.digest("hex");
}

export function attestationArguments(filename, bundle, commit, tag) {
	if (!/^[a-f0-9]{40}$/u.test(commit) || !/^v1\.\d+\.\d+$/u.test(tag)) {
		throw new Error("Release provenance requires an exact commit and stable tag.");
	}
	return [
		"attestation",
		"verify",
		filename,
		"--repo",
		repository,
		"--bundle",
		bundle,
		"--signer-workflow",
		`${repository}/.github/workflows/ci.yml`,
		"--signer-digest",
		commit,
		"--source-digest",
		commit,
		"--source-ref",
		`refs/tags/${tag}`,
		"--deny-self-hosted-runners"
	];
}

export async function verifyReleaseAssets(directory, commit, tag, attested = false) {
	attestationArguments("subject", "bundle", commit, tag);
	if (!(await lstat(directory)).isDirectory()) throw new Error("Release assets must be a real directory.");
	const archive = `isthereconsensus-${commit.slice(0, 12)}-linux-arm64-runtime.tar.gz`;
	const checksumMembers = [archive, "runtime-manifest.json", "acceptance.json"];
	const subjects = [...checksumMembers, "SHA256SUMS"];
	const expected = [...subjects, ...(attested ? ["attestation-bundle.jsonl"] : [])].sort();
	if (JSON.stringify((await readdir(directory)).sort()) !== JSON.stringify(expected)) {
		throw new Error("Release does not contain the exact required asset set.");
	}
	for (const name of expected) {
		const metadata = await lstat(path.join(directory, name));
		if (!metadata.isFile() || metadata.nlink !== 1 || (metadata.mode & 0o7022) !== 0) {
			throw new Error("Release assets must be regular, unlinked and protected from other writers.");
		}
	}
	const manifestBytes = await readBounded(path.join(directory, "runtime-manifest.json"), 8 * 1024 * 1024);
	const manifest = JSON.parse(manifestBytes);
	const receipt = JSON.parse(await readBounded(path.join(directory, "acceptance.json"), 1024 * 1024));
	if (
		manifest.schemaVersion !== 1 || manifest.service !== "isthereconsensus.org"
		|| manifest.source?.commit !== commit || manifest.source?.tag !== tag || manifest.source?.dirty !== false
		|| manifest.target?.platform !== "linux" || manifest.target?.architecture !== "arm64"
		|| manifest.target?.libc !== "glibc" || manifest.toolchain?.node !== "v24.18.1"
		|| manifest.toolchain?.npm !== "12.0.2"
		|| !Array.isArray(manifest.files) || manifest.files.length > 100_000
		|| manifest.files.some(entry => entry.type === "file" && (!Number.isSafeInteger(entry.size) || entry.size < 0))
		|| manifest.files.reduce((total, entry) => total + (entry.type === "file" ? entry.size : 0), 0) > 1024 ** 3
	) {
		throw new Error("Release manifest does not match the reviewed source, target or size limits.");
	}
	const archiveMetadata = await lstat(path.join(directory, archive));
	if (archiveMetadata.size < 1 || archiveMetadata.size > 256 * 1024 * 1024) {
		throw new Error("Release archive exceeds its size limits.");
	}
	if (
		receipt.schemaVersion !== 1 || receipt.service !== "isthereconsensus.org"
		|| JSON.stringify(receipt.source) !== JSON.stringify(manifest.source)
		|| JSON.stringify(receipt.target) !== JSON.stringify(manifest.target)
		|| JSON.stringify(receipt.toolchain) !== JSON.stringify(manifest.toolchain)
		|| receipt.archive?.name !== archive || receipt.archive?.bytes !== archiveMetadata.size
		|| receipt.archive?.sha256 !== await fileDigest(path.join(directory, archive))
		|| receipt.manifestSha256 !== digest(manifestBytes)
		|| receipt.verifiedUnpacked !== true || receipt.productionActivationVerified !== false
	) {
		throw new Error("Release acceptance receipt differs from the exact accepted subjects.");
	}
	const checksums = [];
	for (const name of checksumMembers) checksums.push(`${await fileDigest(path.join(directory, name))}  ${name}`);
	if ((await readBounded(path.join(directory, "SHA256SUMS"), 4096)).toString() !== `${checksums.join("\n")}\n`) {
		throw new Error("Release checksums differ from their exact subjects.");
	}
	if (attested) await readBounded(path.join(directory, "attestation-bundle.jsonl"), 16 * 1024 * 1024);
	return subjects.map(name => path.join(directory, name));
}

if (process.argv[1] && path.resolve(process.argv[1]) === import.meta.filename) {
	const [directory, commit, tag, option, ...extra] = process.argv.slice(2);
	if (!directory || !commit || !tag || (option && option !== "--attested") || extra.length) {
		throw new Error("Expected ASSET_DIRECTORY COMMIT TAG [--attested].");
	}
	const subjects = await verifyReleaseAssets(directory, commit, tag, option === "--attested");
	if (option === "--attested") {
		for (const subject of subjects) {
			execFileSync("gh", attestationArguments(subject, path.join(directory, "attestation-bundle.jsonl"), commit, tag), {
				stdio: "inherit",
				timeout: 120_000
			});
		}
	}
	process.stdout.write(`Verified ${subjects.length} exact release subjects${option ? " and their provenance" : " before attestation"}.\n`);
}
