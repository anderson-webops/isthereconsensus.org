import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { writeFile } from "node:fs/promises";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { readerExpansionClaims } from "../data/claim-expansion-reader.js";
import { defaultClaims } from "../data/claims.js";
import { createReaderExpansionSourceProposal, READER_EXPANSION_SOURCE_PATHS } from "../utils/readerExpansionProposal.js";

async function run() {
	const args = process.argv.slice(2);
	if (args.length !== 2 || args[0] !== "--output" || !args[1].trim() || args[1].startsWith("--")) throw new Error("Use --output with a new private evidence file.");
	const root = fileURLToPath(new URL("../../../", import.meta.url));
	const git = (...options: string[]) => execFileSync("git", ["-C", root, ...options], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
	if (git("status", "--porcelain", "--untracked-files=normal", "--", ...READER_EXPANSION_SOURCE_PATHS)) throw new Error("Backend source and dependency/toolchain inputs must be committed before preparing an operator proposal.");
	const identity = { commit: git("rev-parse", "HEAD"), tree: git("rev-parse", "HEAD^{tree}") };
	const proposal = createReaderExpansionSourceProposal(readerExpansionClaims, defaultClaims, identity, new Date());
	const output = `${JSON.stringify(proposal, null, 2)}\n`;
	await writeFile(args[1], output, { mode: 0o600, flag: "wx" });
	process.stdout.write(`${JSON.stringify({ artifactKind: proposal.artifactKind, sourceCommit: proposal.sourceCommit, proposalClaimCount: proposal.proposalClaimCount, proposalCitationCount: proposal.proposalCitationCount, longNarrativeItems: proposal.longNarrativeItems, proposalDataSha256: proposal.proposalDataSha256, fileSha256: createHash("sha256").update(output).digest("hex"), isPublicationReceipt: false })}\n`);
}

run().catch(() => {
	console.error("Source proposal failed. Use committed backend source and a new private output file. No input values are printed; nothing was authenticated or published.");
	process.exitCode = 2;
});
