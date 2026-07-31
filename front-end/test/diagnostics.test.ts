import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canReadDiagnostics } from "../src/utils/diagnostics";

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

	it("rejects production diagnostics when disabled, weak, missing, or mismatched", () => {
		const key = "a".repeat(32);
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				configuredKey: key,
				providedKey: key
			}),
			false
		);
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				enabled: true,
				configuredKey: "secret",
				providedKey: "secret"
			}),
			false
		);
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				enabled: true,
				configuredKey: key
			}),
			false
		);
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				enabled: true,
				configuredKey: key,
				providedKey: "wrong"
			}),
			false
		);
	});
});
