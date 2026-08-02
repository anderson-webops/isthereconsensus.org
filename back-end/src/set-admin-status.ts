import process from "node:process";
import mongoose from "mongoose";
import * as readlineSync from "readline-sync";
import { Admin } from "./models/schemas/Admin.js";
import { recordAccountActivity } from "./utils/accountActivity.js";
import { accountEmailSchema, firstValidationError } from "./utils/accountValidation.js";
import { resolveMongoConfiguration } from "./utils/mongoConfiguration.js";
import { logError } from "./utils/safeLog.js";
import "dotenv/config";

async function main() {
	const action = readlineSync.question("Action (enable/disable): ").trim().toLowerCase();
	if (action !== "enable" && action !== "disable") {
		throw new Error("Action must be enable or disable.");
	}

	const emailResult = accountEmailSchema.safeParse(readlineSync.question("Admin email: "));
	if (!emailResult.success) throw new Error(firstValidationError(emailResult.error));
	const confirmation = readlineSync.question(`Type ${emailResult.data} to confirm: `).trim().toLowerCase();
	if (confirmation !== emailResult.data) {
		throw new Error("Confirmation did not match the target admin email.");
	}

	const { uri: mongoUri } = await resolveMongoConfiguration();
	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 10_000,
		connectTimeoutMS: 10_000
	});

	const admin = await Admin.findOne({ email: emailResult.data });
	if (!admin) throw new Error("Admin account not found.");

	const nextEnabled = action === "enable";
	const currentlyEnabled = admin.enabled !== false;
	if (currentlyEnabled === nextEnabled) {
		console.log(`Admin account is already ${nextEnabled ? "enabled" : "disabled"}.`);
		return;
	}

	if (!nextEnabled) {
		const enabledAdminCount = await Admin.countDocuments({ enabled: { $ne: false } });
		if (enabledAdminCount <= 1) {
			throw new Error("Refusing to disable the last enabled admin account.");
		}
	}

	admin.enabled = nextEnabled;
	admin.sessionVersion = Number(admin.sessionVersion || 0) + 1;
	await admin.save();
	if (!nextEnabled && await Admin.countDocuments({ enabled: { $ne: false } }) === 0) {
		admin.enabled = true;
		admin.sessionVersion = Number(admin.sessionVersion || 0) + 1;
		await admin.save();
		throw new Error("Concurrent status changes would disable every admin; the target account was re-enabled.");
	}
	await recordAccountActivity({
		action: nextEnabled ? "admin.enabled" : "admin.disabled",
		actor: { type: "system" },
		target: {
			id: admin._id.toString(),
			type: "admin",
			email: admin.email
		},
		metadata: {
			revokedExistingSessions: "true",
			source: "set-admin-status"
		}
	});

	console.log(`Admin account ${nextEnabled ? "enabled" : "disabled"}; existing sessions were revoked.`);
}

main()
	.catch((error) => {
		logError("Admin status change failed", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
	});
