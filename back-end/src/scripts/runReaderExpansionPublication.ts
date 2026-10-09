import type { FileHandle } from "node:fs/promises";
import type { ReaderExpansionSourceProposal } from "../utils/readerExpansionProposal.js";
import type { ReaderExpansionEditorialPlan, ReaderExpansionPublicationApproval } from "../utils/readerExpansionPublication.js";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { open, stat } from "node:fs/promises";
import { dirname, isAbsolute, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { READER_EXPANSION_SOURCE_PATHS, readerExpansionValueHash } from "../utils/readerExpansionProposal.js";
import { createReaderExpansionEditorialApi, prepareReaderExpansionEditorialPlan, publishReaderExpansionEditorialPlan } from "../utils/readerExpansionPublication.js";

interface OperatorOptions {
	adminOrigin: string;
	publicOrigin: string;
	cookieFile: string;
	proposalFile: string;
	outputFile: string;
	planFile?: string;
	approvalFile?: string;
	journalFile?: string;
	evidenceFiles?: Record<"backupSha256" | "restoreVerificationSha256" | "rehearsalReceiptSha256" | "backendArtifactSha256", string>;
}

async function privateInput(path: string) {
	if (typeof path !== "string" || !isAbsolute(path)) throw new Error("Private files require absolute paths.");
	const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
	try {
		const metadata = await handle.stat();
		if (!metadata.isFile() || (metadata.mode & 0o077) !== 0 || metadata.uid !== process.geteuid!()) throw new Error("Private inputs require owned regular files with no group or public access.");
		return handle;
	}
	catch (error) {
		await handle.close();
		throw error;
	}
}

async function privateText(path: string, limit = 16 * 1024 * 1024) {
	const handle = await privateInput(path);
	try {
		if ((await handle.stat()).size > limit) throw new Error("Private input exceeds its bound.");
		return await handle.readFile("utf8");
	}
	finally { await handle.close(); }
}

async function privateOutput(path: string) {
	if (typeof path !== "string" || !isAbsolute(path)) throw new Error("Private output requires an absolute path.");
	const parent = await stat(dirname(path));
	if (!parent.isDirectory() || (parent.mode & 0o077) !== 0 || parent.uid !== process.geteuid!()) throw new Error("Outputs require an existing owned private directory.");
	return open(path, "wx", 0o600);
}

async function evidenceHash(path: string) {
	const handle = await privateInput(path);
	try {
		const hash = createHash("sha256");
		for await (const chunk of handle.createReadStream({ autoClose: false })) hash.update(chunk);
		return hash.digest("hex");
	}
	finally { await handle.close(); }
}

async function durableWrite(handle: FileHandle, value: unknown) {
	await handle.writeFile(`${JSON.stringify(value)}\n`);
	await handle.sync();
}

async function run() {
	const args = process.argv.slice(2);
	if (args.length !== 4 || args[0] !== "--mode" || !["preview", "publish"].includes(args[1]) || args[2] !== "--options") throw new Error("Use --mode preview or publish with --options and a private configuration file.");
	const root = resolve(fileURLToPath(new URL("../../../", import.meta.url)));
	if (fileURLToPath(import.meta.url) !== resolve(root, "back-end/src/scripts/runReaderExpansionPublication.ts")) throw new Error("Use the verified committed source entrypoint, not a compiled copy.");
	const git = (...options: string[]) => execFileSync("git", ["-C", root, ...options], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
	if (resolve(git("rev-parse", "--show-toplevel")) !== root || git("status", "--porcelain", "--untracked-files=normal", "--", ...READER_EXPANSION_SOURCE_PATHS)) throw new Error("Source and toolchain inputs must be committed.");
	const options = JSON.parse(await privateText(args[3])) as OperatorOptions;
	const proposal = JSON.parse(await privateText(options.proposalFile)) as ReaderExpansionSourceProposal;
	if (proposal.sourceCommit !== git("rev-parse", "HEAD") || proposal.sourceTree !== git("rev-parse", "HEAD^{tree}")) throw new Error("The proposal must identify the executing checkout.");
	if (!options.publicOrigin) throw new Error("An explicit anonymous acceptance origin is required.");
	const api = createReaderExpansionEditorialApi(options.adminOrigin, (await privateText(options.cookieFile, 16384)).trim(), options.publicOrigin);
	let plan: ReaderExpansionEditorialPlan | undefined;
	let approval: ReaderExpansionPublicationApproval | undefined;
	if (args[1] === "publish") {
		plan = JSON.parse(await privateText(options.planFile!)) as ReaderExpansionEditorialPlan;
		approval = JSON.parse(await privateText(options.approvalFile!)) as ReaderExpansionPublicationApproval;
		for (const key of ["backupSha256", "restoreVerificationSha256", "rehearsalReceiptSha256", "backendArtifactSha256"] as const) {
			if (await evidenceHash(options.evidenceFiles![key]) !== approval[key]) throw new Error("Reviewed evidence bytes differ from the approval.");
		}
	}
	const output = await privateOutput(options.outputFile);
	let journal;
	try {
		if (args[1] === "preview") {
			const prepared = await prepareReaderExpansionEditorialPlan(proposal, api);
			await durableWrite(output, prepared);
			console.log(JSON.stringify({ operation: "preview", sourceCommit: proposal.sourceCommit, planSha256: readerExpansionValueHash(prepared), targets: prepared.rows.length, published: false }));
			return;
		}
		if (!plan || !approval) throw new Error("Publication requires a reviewed plan and explicit approval.");
		journal = await privateOutput(options.journalFile!);
		await durableWrite(journal, { operation: "batch_preflight", sourceCommit: proposal.sourceCommit, proposalDataSha256: proposal.proposalDataSha256, planSha256: readerExpansionValueHash(plan) });
		const report = await publishReaderExpansionEditorialPlan(proposal, plan, approval, api, event => durableWrite(journal!, event));
		await durableWrite(output, report);
		console.log(JSON.stringify({ operation: "authenticated-api-batch-readback", sourceCommit: proposal.sourceCommit, targets: report.canonicalReviews, citations: report.orderedCitations, catalogTotal: report.catalogTotal, fullPrivateStatePreservationVerified: false, renderedPagesVerified: false }));
	}
	finally {
		await journal?.close();
		await output.close();
	}
}

run().catch(() => {
	console.error("Operator workflow stopped. Retain the private journal, inspect current state and reconcile before another write. No credential, input, response or private path is printed.");
	process.exitCode = 2;
});
