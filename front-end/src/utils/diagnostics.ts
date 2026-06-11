export interface DiagnosticsAccessInput {
	isProd: boolean;
	configuredKey?: string;
	providedKey?: string;
}

export function canReadDiagnostics({ isProd, configuredKey, providedKey }: DiagnosticsAccessInput) {
	if (!isProd) return true;
	return Boolean(configuredKey && providedKey === configuredKey);
}
