import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const serverDir = join(testDir, "..", "server", "routes");

describe("Nuxt monitoring probes", () => {
	it("keeps GET responses minimal and explicitly implements bodyless HEAD", () => {
		for (const probe of ["healthz", "readyz"]) {
			const getSource = readFileSync(join(serverDir, `${probe}.get.ts`), "utf8");
			const headSource = readFileSync(join(serverDir, `${probe}.head.ts`), "utf8");

			assert.match(getSource, /Cache-Control", "no-store"/);
			assert.match(getSource, /return \{ ok: true \}/);
			assert.doesNotMatch(getSource, /ready:|deployment|process\.|runtimeConfig|cookie|redirect/);
			assert.match(headSource, /Cache-Control", "no-store"/);
			assert.match(headSource, /setResponseStatus\(event, 200\)/);
			assert.doesNotMatch(headSource, /return \{|ready:|deployment|cookie|redirect/);
		}
	});
});
