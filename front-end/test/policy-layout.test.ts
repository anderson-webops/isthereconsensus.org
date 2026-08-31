import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

describe("shared policy layout", () => {
	it("keeps policy summary cards compact and scannable on mobile", () => {
		const source = readFileSync(join(testDir, "..", "src/app.vue"), "utf8");

		assert.match(source, /@media \(max-width: 720px\) \{[\s\S]*\.policy-summary-card \{[\s\S]*padding: 12px;/);
		assert.match(source, /\.policy-summary-card h2 \{[\s\S]*line-height: 1\.18;/);
		assert.match(source, /\.policy-summary-card p \{[\s\S]*line-height: 1\.4;/);
	});

	it("uses section dividers instead of framing every policy section as another card", () => {
		const source = readFileSync(join(testDir, "..", "src/app.vue"), "utf8");

		assert.match(source, /\.policy-panel \{[\s\S]*padding: 22px 0;[\s\S]*border-top:/);
		assert.match(source, /\.policy-panel--soft \{[\s\S]*background: transparent;/);
		assert.match(source, /@media \(max-width: 720px\) \{[\s\S]*\.policy-panel \{[\s\S]*padding: 16px 0;/);
	});

	it("keeps policy callout actions full width on narrow screens", () => {
		const source = readFileSync(join(testDir, "..", "src/app.vue"), "utf8");

		assert.match(source, /@media \(max-width: 520px\) \{[\s\S]*:where\(\.button\) \{[\s\S]*width: 100%;/);
	});
});
