import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import process from "node:process";
import { evaluateSearchUsefulness } from "../utils/searchUsefulness.js";

async function run() {
	const args = process.argv.slice(2);
	const allowed = new Set(["--dataset", "--origin", "--output", "--interval-ms"]);
	if (!args.length || args.length % 2 || args.some((argument, index) => index % 2 === 0 && !allowed.has(argument))) throw new Error("Use --dataset <public-question-file> --origin <site-origin> [--output <report-file>] [--interval-ms <milliseconds>].");
	const options = new Map(Array.from({ length: args.length / 2 }, (_, index) => [args[index * 2], args[index * 2 + 1]]));
	if (options.size !== args.length / 2 || !options.get("--dataset") || !options.get("--origin")) throw new Error("Dataset and origin are required; flags cannot be repeated.");
	const info = await stat(options.get("--dataset")!);
	if (!info.isFile() || info.size > 256 * 1024) throw new Error("Evaluation input must be a regular file no larger than 256 KiB.");
	const bytes = await readFile(options.get("--dataset")!);
	if (bytes.length > 256 * 1024) throw new Error("Evaluation datasets must not exceed 256 KiB.");
	let dataset: unknown;
	try {
		dataset = JSON.parse(bytes.toString("utf8"));
	}
	catch { throw new Error("Dataset must contain valid JSON."); }
	const report = await evaluateSearchUsefulness(dataset, options.get("--origin")!, {
		intervalMs: options.has("--interval-ms") ? Number(options.get("--interval-ms")) : undefined
	});
	const output = `${JSON.stringify({ ...report, inputFileSha256: createHash("sha256").update(bytes).digest("hex") }, null, 2)}\n`;
	if (options.get("--output")) await writeFile(options.get("--output")!, output, { mode: 0o600, flag: "wx" });
	else process.stdout.write(output);
	if (!report.mechanicalGatePassed) process.exitCode = 1;
}

run().catch(() => {
	console.error("Search evaluation failed. Check the documented arguments, public-question schema, and local file access. Input values and server response bodies are not printed.");
	process.exitCode = 2;
});
