import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { createEditorialAuditProposal } from "../utils/editorialAuditProposal.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
const git = (...args: string[]) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
if (git("status", "--porcelain")) throw new Error("Commit the complete reviewed source before preparing the release proposal.");
const proposal = createEditorialAuditProposal({
	commit: git("rev-parse", "HEAD"),
	tree: git("rev-parse", "HEAD^{tree}")
});
process.stdout.write(`${JSON.stringify(proposal, null, 2)}\n`);
