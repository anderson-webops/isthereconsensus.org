import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canReadDiagnostics } from "../src/utils/diagnostics.js";

describe("canReadDiagnostics", () => {
	it("allows diagnostics outside production", () => {
		assert.equal(canReadDiagnostics({ isProd: false }), true);
	});

	it("allows production diagnostics when the internal key matches", () => {
		const key = "a".repeat(32);
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				enabled: true,
				configuredKey: key,
				providedKey: key
			}),
			true
		);
	});

	it("does not trust loopback or forwarded loopback addresses in production", () => {
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				enabled: true,
				clientIp: "127.0.0.1"
			} as any),
			false,
			"loopback access must not bypass the diagnostics key"
		);
	});

	it("rejects production diagnostics without the enabled gate and strong matching key", () => {
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				enabled: true,
				configuredKey: "secret",
				providedKey: "wrong"
			}),
			false
		);
	});
});
