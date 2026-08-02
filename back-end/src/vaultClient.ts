import { env } from "node:process";
import { z } from "zod";
import { fetchJsonBounded } from "./utils/boundedFetch.js";

const vaultLoginResponseSchema = z.object({
	auth: z.object({
		client_token: z.string().min(16).max(4096)
	})
});

const vaultSecretResponseSchema = z.object({
	data: z.object({
		data: z.object({
			uri: z.string().min(1).max(8192).regex(/^mongodb(?:\+srv)?:\/\//u)
		})
	})
});

function vaultAddress() {
	const parsed = new URL(env.VAULT_ADDR || "http://127.0.0.1:8200");
	if (
		!["http:", "https:"].includes(parsed.protocol)
		|| parsed.username
		|| parsed.password
		|| parsed.pathname !== "/"
		|| parsed.search
		|| parsed.hash
	) {
		throw new Error("VAULT_ADDR must contain only an HTTP or HTTPS scheme and host without credentials.");
	}
	const loopbackHosts = new Set(["127.0.0.1", "::1", "[::1]", "localhost"]);
	if (parsed.protocol !== "https:" && !loopbackHosts.has(parsed.hostname)) {
		throw new Error("VAULT_ADDR must use HTTPS unless Vault is on the local host.");
	}
	return parsed;
}

export function vaultConfigurationState(): "configured" | "disabled" | "incomplete" {
	const hasRole = Boolean(env.VAULT_ROLE_ID);
	const hasSecret = Boolean(env.VAULT_SECRET_ID);
	if (hasRole && hasSecret) return "configured";
	if (!hasRole && !hasSecret) return "disabled";
	return "incomplete";
}

async function vaultLogin(): Promise<string> {
	if (vaultConfigurationState() !== "configured") {
		throw new Error("Vault AppRole credentials are not completely configured.");
	}

	const url = new URL("/v1/auth/approle/login", vaultAddress());
	const { response, data } = await fetchJsonBounded<unknown>(
		url,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				role_id: env.VAULT_ROLE_ID,
				secret_id: env.VAULT_SECRET_ID
			})
		},
		{ timeoutMs: 5_000, maxBytes: 64 * 1024 }
	);
	if (!response.ok) throw new Error(`Vault login failed with status ${response.status}.`);
	return vaultLoginResponseSchema.parse(data).auth.client_token;
}

export async function readMongoSecret() {
	const token = await vaultLogin();
	const url = new URL("/v1/secret/data/jacob/mongodb", vaultAddress());
	const { response, data } = await fetchJsonBounded<unknown>(
		url,
		{
			headers: { "X-Vault-Token": token }
		},
		{ timeoutMs: 5_000, maxBytes: 64 * 1024 }
	);
	if (!response.ok) throw new Error(`Vault secret read failed with status ${response.status}.`);
	return vaultSecretResponseSchema.parse(data).data.data;
}
