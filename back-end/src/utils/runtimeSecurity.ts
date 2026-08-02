import { isIP } from "node:net";

const loopbackHosts = new Set(["127.0.0.1", "::1", "localhost"]);

export function parseTrustedProxyIps(rawValue: string | undefined, isProduction: boolean) {
	const values = rawValue === undefined
		? isProduction ? ["127.0.0.1", "::1"] : []
		: rawValue
				.split(",")
				.map(value => value.trim())
				.filter(Boolean);

	if (values.some(value => isIP(value) === 0)) {
		throw new Error("TRUST_PROXY_IPS accepts exact IP addresses only.");
	}
	return [...new Set(values)];
}

export function parseRuntimeHost(
	rawValue: string | undefined,
	isProduction: boolean,
	allowPublicListener = false
) {
	const host = rawValue?.trim() || "127.0.0.1";
	if (isIP(host) === 0 && host !== "localhost") {
		throw new Error("HOST must be an exact IP address or localhost.");
	}
	if (isProduction && !loopbackHosts.has(host) && !allowPublicListener) {
		throw new Error("Production listeners must remain loopback-only unless ALLOW_PUBLIC_LISTENER=true.");
	}
	return host;
}

export function assertDistinctProductionSecrets(
	isProduction: boolean,
	secrets: Record<string, string | undefined>
) {
	if (!isProduction) return;

	const configured = Object.entries(secrets).filter((entry): entry is [string, string] => Boolean(entry[1]));
	for (let index = 0; index < configured.length; index += 1) {
		for (let comparisonIndex = index + 1; comparisonIndex < configured.length; comparisonIndex += 1) {
			if (configured[index][1] === configured[comparisonIndex][1]) {
				throw new Error(`${configured[index][0]} and ${configured[comparisonIndex][0]} must use different secrets.`);
			}
		}
	}
}
