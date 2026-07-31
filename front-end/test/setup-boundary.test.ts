import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const sourceRoot = join(testDir, "..", "src");
const serverRoot = join(testDir, "..", "server");
const browserSetupSources = ["pages/setup.vue", "utils/setup.ts"];
const operationalPromptPatterns = [
	/You are finishing production deployment/,
	/Repo root: \/srv/,
	/buildServerAgentPrompt/
];

function readSource(relativePath: string) {
	return readFileSync(join(sourceRoot, relativePath), "utf8");
}

describe("setup diagnostics browser boundary", () => {
	for (const sourcePath of browserSetupSources) {
		it(`keeps operational prompt text out of ${sourcePath}`, () => {
			const source = readSource(sourcePath);

			for (const pattern of operationalPromptPatterns) {
				assert.doesNotMatch(source, pattern);
			}
		});
	}

	for (const routePath of ["api/setup-prompt.get.ts", "api/setup-status.get.ts"]) {
		it(`keeps production diagnostics disabled by default in ${routePath}`, () => {
			const source = readFileSync(join(serverRoot, routePath), "utf8");
			assert.match(source, /ENABLE_INTERNAL_DIAGNOSTICS === "true"/);
			assert.match(source, /enabled: diagnosticsEnabled/);
			assert.match(source, /diagnosticsHidden \? 404 : 403/);
		});
	}
});
