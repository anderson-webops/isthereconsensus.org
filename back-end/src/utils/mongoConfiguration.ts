import { env } from "node:process";
import { readMongoSecret, vaultConfigurationState } from "../vaultClient.js";

export interface MongoConfiguration {
	uri: string;
	source: "env" | "vault";
}

export function validateMongoUri(uri: string) {
	if (!/^mongodb(?:\+srv)?:\/\/\S+$/u.test(uri) || uri.length > 8_192) {
		throw new Error("MongoDB configuration must contain a valid MongoDB URI.");
	}
	return uri;
}

export async function resolveMongoConfiguration(): Promise<MongoConfiguration> {
	const vaultState = vaultConfigurationState();
	if (vaultState === "incomplete") {
		throw new Error("VAULT_ROLE_ID and VAULT_SECRET_ID must be configured together.");
	}

	if (vaultState === "configured") {
		const { uri } = await readMongoSecret();
		return { source: "vault", uri: validateMongoUri(uri) };
	}

	if (!env.MONGODB_URI) {
		throw new Error("No MongoDB URI available (Vault and MONGODB_URI missing).");
	}
	return { source: "env", uri: validateMongoUri(env.MONGODB_URI) };
}
