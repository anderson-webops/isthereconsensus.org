import { env } from "node:process";
import { readMongoSecret, vaultConfigurationState } from "../vaultClient.js";

export interface MongoConfiguration {
	uri: string;
	source: "env" | "vault";
}

export async function resolveMongoConfiguration(): Promise<MongoConfiguration> {
	const vaultState = vaultConfigurationState();
	if (vaultState === "incomplete") {
		throw new Error("VAULT_ROLE_ID and VAULT_SECRET_ID must be configured together.");
	}

	if (vaultState === "configured") {
		const { uri } = await readMongoSecret();
		if (!uri) {
			throw new Error("Configured Vault secret did not provide a MongoDB URI.");
		}
		return { source: "vault", uri };
	}

	if (!env.MONGODB_URI) {
		throw new Error("No MongoDB URI available (Vault and MONGODB_URI missing).");
	}
	return { source: "env", uri: env.MONGODB_URI };
}
