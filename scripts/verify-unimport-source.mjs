import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const output = process.env.UNIMPORT_VERIFICATION_OUTPUT || path.join(root, ".ai-work/runs/unimport-source-verification");
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, "Run through the pinned npm CLI");
assert.equal(process.versions.node, "26.13.1");
assert.equal(execFileSync(process.execPath, [npmCli, "--version"], { encoding: "utf8" }).trim(), "12.2.3");

execFileSync("bash", ["scripts/prepare-unimport-source.sh"], { cwd: root, stdio: "inherit", timeout: 300_000 });
execFileSync("python3", ["-I", "-B", "scripts/check-unimport-consumers.py"], {
	cwd: root,
	stdio: "inherit",
	timeout: 60_000
});
const qualification = JSON.parse(readFileSync(path.join(root, "vendor/unimport/QUALIFIED.json"), "utf8"));
const archive = readFileSync(path.join(root, qualification.compilerArchive));
const archiveSha256 = createHash("sha256").update(archive).digest("hex");
assert.equal(archiveSha256, qualification.compilerArchiveSha256);
mkdirSync(output, { recursive: true });
writeFileSync(path.join(output, "verified-source-receipt.json"), `${JSON.stringify({
	qualificationSource: qualification.commit,
	compilerArchive: qualification.compilerArchive,
	compilerArchiveSha256: archiveSha256,
	reproducibleSignedSource: true,
	independentGraphAuditsAndSignatures: true,
	installedConsumersVerified: true
}, null, 2)}\n`);
