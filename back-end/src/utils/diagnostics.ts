import { Buffer } from "node:buffer";
import { timingSafeEqual } from "node:crypto";

export interface DiagnosticsAccessInput {
	isProd: boolean;
	enabled?: boolean;
	configuredKey?: string;
	providedKey?: string;
}

function keysMatch(configuredKey: string, providedKey: string) {
	const expected = Buffer.from(configuredKey);
	const received = Buffer.from(providedKey);
	return expected.length === received.length && timingSafeEqual(expected, received);
}

export function canReadDiagnostics({ isProd, enabled, configuredKey, providedKey }: DiagnosticsAccessInput) {
	if (!isProd) return true;
	if (!enabled || !configuredKey || configuredKey.length < 32 || !providedKey) return false;
	return keysMatch(configuredKey, providedKey);
}
