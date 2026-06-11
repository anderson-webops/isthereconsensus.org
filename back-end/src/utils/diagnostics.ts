const loopbackAddresses = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

export interface DiagnosticsAccessInput {
	isProd: boolean;
	configuredKey?: string;
	providedKey?: string;
	clientIp?: string;
}

export function canReadDiagnostics({ isProd, configuredKey, providedKey, clientIp }: DiagnosticsAccessInput) {
	if (!isProd) return true;
	if (configuredKey && providedKey === configuredKey) return true;
	return Boolean(clientIp && loopbackAddresses.has(clientIp));
}
