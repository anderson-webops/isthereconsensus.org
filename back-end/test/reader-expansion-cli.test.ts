import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { READER_EXPANSION_SOURCE_PATHS } from "../src/utils/readerExpansionProposal.js";

const root = fileURLToPath(new URL("../../", import.meta.url));
const parent = path.join(root, ".ai-work/runs/test-reader-expansion-cli");
function execute(args: string[]) {
	return spawnSync(process.execPath, ["--import", "tsx", "back-end/src/scripts/prepareReaderExpansion.ts", ...args], {
		cwd: root,
		encoding: "utf8",
		timeout: 15000,
		env: { ...process.env, MONGO_URI: "mongodb://127.0.0.1:1/forbidden-reader-plan" }
	});
}
const git = (...args: string[]) => execFileSync("git", ["-C", root, ...args], { encoding: "utf8" }).trim();

describe("source proposal CLI guards", () => {
	it("rejects credential/origin options and repeated arguments without echoing their values", () => {
		for (const args of [[], ["--origin", "https://example.test"], ["--password", "do-not-echo"], ["--output", "one", "--output", "two"]]) {
			const result = execute(args);
			assert.equal(result.status, 2);
			assert.equal(result.stdout, "");
			assert.doesNotMatch(result.stderr, /do-not-echo|example\.test/u);
		}
	});

	it("never overwrites an existing evidence file", () => {
		mkdirSync(parent, { recursive: true });
		const directory = mkdtempSync(path.join(parent, "existing-"));
		try {
			const output = path.join(directory, "proposal.json");
			writeFileSync(output, "retain-this-original", { mode: 0o600 });
			const result = execute(["--output", output]);
			assert.equal(result.status, 2);
			assert.equal(result.stdout, "");
			assert.equal(readFileSync(output, "utf8"), "retain-this-original");
		}
		finally {
			rmSync(directory, { recursive: true });
		}
	});

	it("requires committed source, or emits an exclusive mode-0600 complete source-bound proposal", () => {
		mkdirSync(parent, { recursive: true });
		const directory = mkdtempSync(path.join(parent, "complete-"));
		try {
			const output = path.join(directory, "proposal.json");
			const dirty = Boolean(git("status", "--porcelain", "--untracked-files=normal", "--", ...READER_EXPANSION_SOURCE_PATHS));
			const result = execute(["--output", output]);
			assert.equal(result.status, dirty ? 2 : 0);
			if (dirty) {
				assert.equal(existsSync(output), false);
				assert.equal(result.stdout, "");
			}
			else {
				const bytes = readFileSync(output);
				const proposal = JSON.parse(bytes.toString("utf8"));
				const summary = JSON.parse(result.stdout);
				assert.equal(proposal.sourceCommit, git("rev-parse", "HEAD"));
				assert.equal(proposal.sourceTree, git("rev-parse", "HEAD^{tree}"));
				assert.equal(proposal.targets.length, 201);
				assert.equal(proposal.proposalCitationCount, 461);
				assert.equal(proposal.longNarrativeItems, 277);
				assert.equal(proposal.isPublicationReceipt, false);
				assert.equal(proposal.productionAuthorizationGranted, false);
				assert.equal(statSync(output).mode & 0o777, 0o600);
				assert.equal(summary.fileSha256, createHash("sha256").update(bytes).digest("hex"));
				assert.deepEqual(Object.keys(summary).sort(), ["artifactKind", "fileSha256", "isPublicationReceipt", "longNarrativeItems", "proposalCitationCount", "proposalClaimCount", "proposalDataSha256", "sourceCommit"]);
				assert.equal(execute(["--output", output]).status, 2);
				assert.deepEqual(readFileSync(output), bytes);
			}
		}
		finally {
			rmSync(directory, { recursive: true });
		}
	});
});
