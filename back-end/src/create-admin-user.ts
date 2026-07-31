import process from "node:process";
import mongoose from "mongoose";
import * as readlineSync from "readline-sync";
import { Admin } from "./models/schemas/Admin.js";
import { User } from "./models/schemas/User.js";
import { recordAccountActivity } from "./utils/accountActivity.js";
import {
	accountEmailSchema,
	accountNameSchema,
	adminPasswordSchema,
	firstValidationError
} from "./utils/accountValidation.js";
import { resolveMongoConfiguration } from "./utils/mongoConfiguration.js";
import { logError } from "./utils/safeLog.js";
import "dotenv/config";

async function main() {
	const { uri: mongoUri } = await resolveMongoConfiguration();

	const nameResult = accountNameSchema.safeParse(readlineSync.question("Name: "));
	const emailResult = accountEmailSchema.safeParse(readlineSync.question("Email: "));
	const passwordResult = adminPasswordSchema.safeParse(
		readlineSync.question("Password: ", { hideEchoBack: true })
	);
	for (const result of [nameResult, emailResult, passwordResult]) {
		if (!result.success) throw new Error(firstValidationError(result.error));
	}

	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 10_000,
		connectTimeoutMS: 10_000
	});

	const [existingAdmin, existingUser] = await Promise.all([
		Admin.exists({ email: emailResult.data }),
		User.exists({ email: emailResult.data })
	]);
	if (existingAdmin || existingUser) {
		throw new Error("That email already belongs to an account.");
	}

	const admin = await Admin.create({
		name: nameResult.data,
		email: emailResult.data,
		password: passwordResult.data,
		editAdmins: false,
		saveEdit: "Edit",
		role: "admin"
	});
	await recordAccountActivity({
		action: "admin.created",
		actor: { type: "system" },
		target: {
			id: admin._id.toString(),
			type: "admin",
			email: admin.email
		},
		metadata: {
			source: "create-admin-user"
		}
	});
	console.log("Admin account created.");
}

main()
	.catch((error) => {
		logError("Admin account creation failed", error);
		process.exitCode = 1;
	})
	.finally(async () => {
		if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
	});
