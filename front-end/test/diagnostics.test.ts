import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { canReadDiagnostics } from "../src/utils/diagnostics";

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

	it("rejects production diagnostics when the key is missing or mismatched", () => {
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				configuredKey: "secret"
			}),
			false
		);
		assert.equal(
			canReadDiagnostics({
				isProd: true,
				configuredKey: "secret",
				providedKey: "wrong"
			}),
			false
		);
	});
});
