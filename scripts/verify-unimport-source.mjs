import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const verificationGraph = path.join(root, "vendor/unimport-source-verification");
const output = process.env.UNIMPORT_VERIFICATION_OUTPUT || path.join(root, ".ai-work/runs/unimport-source-verification");
const originalArchive = path.join(root, "vendor/unimport-upstream/unimport-7.0.1.tgz");
const npmCli = realpathSync(process.env.npm_execpath || process.env.NPM_CLI || path.join(path.dirname(process.execPath), "npm"));
const npm = createRequire(path.resolve(path.dirname(npmCli), "../package.json"));
assert.equal(npm("./package.json").version, "12.2.1");
assert.equal(process.versions.node, "24.22.1");
const originalIntegrity = "sha512-HcHDoFaz6xiViJNRGWEGYleYl7KVxU8XVHSPJnkuozaQrCUVrA8aRv/vd+e8XP28y26n3L2VRAudCuF5+ek59w==";
const originalDigest = createHash("sha512").update(readFileSync(originalArchive)).digest();
assert.equal(`sha512-${originalDigest.toString("base64")}`, originalIntegrity);
const advisoryVersions = {
	unimport: ["7.0.1", "7.0.2", "7.0.2+webops.1"]
};
const advisoryResponse = await fetch("https://registry.npmjs.org/-/npm/v1/security/advisories/bulk", {
	method: "POST",
	headers: { "content-type": "application/json" },
	body: JSON.stringify(advisoryVersions),
	signal: AbortSignal.timeout(30_000),
});
assert.equal(advisoryResponse.ok, true, "The maintained package advisory query must complete successfully");
const advisories = await advisoryResponse.json();
assert.deepEqual(advisories, {}, "The base, supported upstream floor and maintained version require zero known advisories");
const sourceManifest = JSON.parse(readFileSync(path.join(verificationGraph, "package.json"), "utf8"));
assert.deepEqual(sourceManifest.dependencies, { unimport: "7.0.1" });
const sourceLock = JSON.parse(readFileSync(path.join(verificationGraph, "package-lock.json"), "utf8"));
assert.equal(sourceLock.packages["node_modules/unimport"].integrity, originalIntegrity);
assert.equal(sourceLock.packages["node_modules/unimport"].version, "7.0.1");

function run(command, args, cwd = root, json = false) {
	const result = spawnSync(command, args, {
		cwd,
		encoding: "utf8",
		timeout: 300_000,
		maxBuffer: 16 * 1024 * 1024,
		env: process.env,
	});
	if (result.error)
		throw result.error;
	if (result.status !== 0)
		throw new Error(`Unimport source verification failed (${path.basename(command)} ${args[0]}): ${result.stderr.slice(-3000)} ${result.stdout.slice(-3000)}`);
	if (json)
		return JSON.parse(result.stdout);
	process.stdout.write(result.stdout);
	process.stderr.write(result.stderr);
	return undefined;
}

run(process.execPath, [
	npmCli,
	"--prefix",
	verificationGraph,
	"ci",
	"--workspaces=false",
	"--ignore-scripts",
	"--no-fund",
	"--no-audit",
], verificationGraph);
for (const omit of [
	[],
	["--omit=dev"],
]) {
	const audit = run(process.execPath, [
		npmCli,
		"--prefix",
		verificationGraph,
		"audit",
		"--workspaces=false",
		"--audit-level=low",
		"--json",
		...omit,
	], verificationGraph, true);
	assert.equal(audit.metadata.vulnerabilities.total, 0);
}
const verification = run(process.execPath, [
	npmCli,
	"--prefix",
	verificationGraph,
	"audit",
	"signatures",
	"--json",
	"--include-attestations",
], verificationGraph, true);
assert.deepEqual(verification.invalid, []);
assert.deepEqual(verification.missing, []);
const original = verification.verified.find(item => item.name === "unimport" && item.version === "7.0.1");
assert.ok(original, "The original publisher package must have cryptographically verified attestation bundles");
assert.equal(original.registry, "https://registry.npmjs.org/");
assert.equal(original.attestations.url, "https://registry.npmjs.org/-/npm/v1/attestations/unimport@7.0.1");
const bundles = original.attestationBundles;
assert.ok(Array.isArray(bundles) && bundles.length >= 2);
let provenance;
for (const attestation of bundles) {
	const envelope = attestation.bundle?.dsseEnvelope || attestation.dsseEnvelope;
	assert.ok(envelope?.payload);
	const statement = JSON.parse(Buffer.from(envelope.payload, "base64").toString("utf8"));
	assert.deepEqual(statement.subject, [
		{
			name: "pkg:npm/unimport@7.0.1",
			digest: {
				sha512: originalDigest.toString("hex"),
			},
		},
	]);
	if (statement.predicateType === "https://slsa.dev/provenance/v1")
		provenance = statement.predicate;
}
assert.ok(provenance, "The base requires verified SLSA publisher provenance");
assert.deepEqual(provenance.buildDefinition.externalParameters.workflow, {
	ref: "refs/tags/v7.0.1",
	repository: "https://github.com/unjs/unimport",
	path: ".github/workflows/release.yml",
});
assert.ok(provenance.buildDefinition.resolvedDependencies.some(dependency => dependency.digest.gitCommit === "fdf98b5aef3c2f6d5a6519d5dbb69631347b62fb"));
run("python3", [
	"-I",
	"-B",
	path.join(root, "scripts/verify-unimport-source-proof.py"),
]);
run("python3", [
	"-I",
	"-B",
	path.join(root, "scripts/package-unimport.py"),
	"--check",
]);
mkdirSync(output, { recursive: true });
writeFileSync(path.join(output, "verified-original-attestations.json"), `${JSON.stringify(original, null, 2)}\n`);
writeFileSync(path.join(output, "verified-source-receipt.json"), `${JSON.stringify({
	original: "unimport@7.0.1",
	originalIntegrity,
	verificationGraphLockSha256: createHash("sha256").update(readFileSync(path.join(verificationGraph, "package-lock.json"))).digest("hex"),
	maintainedArchiveSha256: createHash("sha256").update(readFileSync(path.join(root, "vendor/unimport-7.0.2+webops.1.tgz"))).digest("hex"),
	originalSource: "fdf98b5aef3c2f6d5a6519d5dbb69631347b62fb",
	upstreamRelease: "bbd07768ddb4919205bcb5a3cbc06c3a2791981a",
	maintainedDistribution: "7.0.2+webops.1",
	fullAuditVulnerabilities: 0,
	productionAuditVulnerabilities: 0,
	verifiedPublisherProvenance: true,
	deterministicMaintainedPayload: true,
	advisoryVersions,
	advisories,
}, null, 2)}\n`);
process.stdout.write("Verified original Unimport publisher provenance, authenticated source patch and maintained payload.\n");
