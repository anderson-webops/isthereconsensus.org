import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canReadDiagnostics } from "../src/utils/diagnostics.js";

describe("canReadDiagnostics", () => {
	it("allows diagnostics outside production", () => {
		assert.equal(canReadDiagnostics({ isProd: false }), true);
	});

	it("allows production diagnostics when the internal key matches", () => {
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				configuredKey: "secret",
				providedKey: "secret"
			}),
			true
		);
	});

	it("allows production diagnostics from loopback", () => {
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				clientIp: "127.0.0.1"
			}),
			true
		);
	});

	it("rejects production diagnostics without loopback or the internal key", () => {
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				configuredKey: "secret",
				providedKey: "wrong",
				clientIp: "203.0.113.10"
			}),
			false
		);
	});
});
