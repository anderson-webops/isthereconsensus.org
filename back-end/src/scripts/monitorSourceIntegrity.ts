import process from "node:process";
import mongoose from "mongoose";
import { resolveMongoConfiguration } from "../utils/mongoConfiguration.js";
import { logError } from "../utils/safeLog.js";
import { SOURCE_INTEGRITY_PROVIDERS } from "../utils/sourceIntegrity.js";
import { runSourceIntegrityMonitor } from "../utils/sourceIntegrityMonitor.js";
import "dotenv/config";

function integerArgument(name: string, fallback: number) {
	const index = process.argv.indexOf(name);
	if (index < 0) return fallback;
	const argument = process.argv[index + 1] ?? "";
	const value = Number(argument);
	if (!/^\d+$/.test(argument) || !Number.isSafeInteger(value)) throw new Error(`${name} requires an integer value.`);
	return value;
}

async function main() {
	const providerIndex = process.argv.indexOf("--provider");
	const requestedProvider = providerIndex < 0 ? "all" : process.argv[providerIndex + 1];
	const providers = SOURCE_INTEGRITY_PROVIDERS.filter(provider => requestedProvider === "all" || provider === requestedProvider);
	if (!providers.length) throw new Error("--provider requires crossref, europepmc or all.");
	const options = {
		providers,
		apply: process.argv.includes("--apply"),
		limit: integerArgument("--limit", 100),
		mailto: process.env.CROSSREF_MAILTO,
		staleDays: integerArgument("--stale-days", 30)
	};
	const { uri } = await resolveMongoConfiguration();
	await mongoose.connect(uri, {
		connectTimeoutMS: 10_000,
		serverSelectionTimeoutMS: 10_000
	});
	const summary = await runSourceIntegrityMonitor(options);
	console.log(JSON.stringify(summary));
}

main()
	.catch((error) => {
		logError("Source integrity monitor failed", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
	});
