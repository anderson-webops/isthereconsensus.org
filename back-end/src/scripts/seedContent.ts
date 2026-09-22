import process, { env } from "node:process";
import mongoose from "mongoose";
import { seedClaims } from "../data/seedClaims.js";
import { seedTopics } from "../data/seedTopics.js";
import { resolveMongoConfiguration } from "../utils/mongoConfiguration.js";
import { logError } from "../utils/safeLog.js";
import "dotenv/config";

export function parseSeedContentMode(value: string | undefined): "insert" | "sync" {
	const mode = value || "insert";
	if (mode !== "insert" && mode !== "sync") {
		throw new Error("SEED_CONTENT_MODE must be either insert or sync.");
	}
	return mode;
}

export async function runSeedContent() {
	const mode = parseSeedContentMode(env.SEED_CONTENT_MODE);
	const { uri: mongoUri } = await resolveMongoConfiguration();

	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 10_000,
		connectTimeoutMS: 10_000
	});
	await seedTopics();
	await seedClaims({ synchronizeExisting: mode === "sync" });
	console.log(`Seed content mode: ${mode === "sync" ? "synchronize existing" : "insert only"}.`);
}

runSeedContent()
	.catch((error) => {
		logError("Seed content failed", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
	});
