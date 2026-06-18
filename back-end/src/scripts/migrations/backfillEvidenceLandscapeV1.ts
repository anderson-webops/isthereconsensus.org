import process, { env } from "node:process";
import mongoose from "mongoose";
import {
	EVIDENCE_LANDSCAPE_SCHEMA_VERSION
} from "../../constants/evidenceLandscape.js";
import { Claim } from "../../models/schemas/Claim.js";
import { readMongoSecret } from "../../vaultClient.js";
import "dotenv/config";

async function getMongoUri() {
	try {
		const { uri } = await readMongoSecret();
		if (uri) return uri;
	}
	catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		if (!message.includes("Failed to fetch") && !message.includes("ECONNREFUSED")) {
			console.warn(`Vault unavailable; falling back to MONGODB_URI (${message}).`);
		}
	}

	if (!env.MONGODB_URI) {
		throw new Error("No MongoDB URI available (Vault and MONGODB_URI missing).");
	}
	return env.MONGODB_URI;
}

function defaultEvidenceLandscape() {
	return {
		schemaVersion: EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
		claimType: "other",
		supportLabel: "unresolved",
		supportScore: null,
		evidenceDirection: "not_applicable",
		evidenceCertainty: "not_assessable",
		expertAgreement: "not_assessable",
		plainLanguageAnswer: "",
		oneSentenceSummary: "",
		confidenceStatement: "",
		caveatSummary: "",
		disagreementSummary: "",
		credibleMinorityViewSummary: "",
		fringeOrUnsupportedViewSummary: "",
		whatWouldChangeThis: "",
		boundaryConditions: [],
		applicability: {
			population: "",
			exposureOrIntervention: "",
			comparator: "",
			outcomes: [],
			setting: "",
			timeframe: ""
		},
		distribution: {
			supportsClaim: { count: 0, weightedCount: 0 },
			supportsWithCaveats: { count: 0, weightedCount: 0 },
			opposesClaim: { count: 0, weightedCount: 0 },
			inconclusiveOrMixed: { count: 0, weightedCount: 0 },
			backgroundContext: { count: 0, weightedCount: 0 },
			excludedLowQuality: { count: 0 },
			excludedRetracted: { count: 0 },
			excludedFringe: { count: 0 }
		},
		evidenceBaseSize: {
			totalSources: 0,
			includedSources: 0,
			excludedSources: 0,
			systematicReviews: 0,
			metaAnalyses: 0,
			evidenceBasedGuidelines: 0,
			randomizedTrials: 0,
			observationalStudies: 0,
			mechanisticOrPreclinical: 0,
			expertCommentary: 0,
			retractedOrInvalid: 0
		},
		publicFlags: {
			showEvidenceLandscape: false,
			showCredibleMinorityView: false,
			showFalseBalanceWarning: false,
			medicalOrPublicHealthSensitive: false,
			requiresProfessionalContext: false
		},
		workflow: {
			status: "not_started",
			editorialNotes: ""
		}
	};
}

async function main() {
	const write = process.argv.includes("--write");
	const mongoUri = await getMongoUri();
	await mongoose.connect(mongoUri);

	const filter = { "evidenceLandscape.schemaVersion": { $exists: false } };
	const missingCount = await Claim.countDocuments(filter);
	console.log(`Claims missing evidenceLandscape v${EVIDENCE_LANDSCAPE_SCHEMA_VERSION}: ${missingCount}`);

	if (!write) {
		console.log("Dry run only. Re-run with --write to apply defaults.");
		await mongoose.disconnect();
		return;
	}

	const result = await Claim.updateMany(filter, {
		$set: {
			evidenceLandscape: defaultEvidenceLandscape()
		}
	});
	console.log(`Updated claims: ${result.modifiedCount}`);
	await mongoose.disconnect();
}

main().catch(async (error) => {
	console.error(error);
	await mongoose.disconnect();
	process.exit(1);
});
