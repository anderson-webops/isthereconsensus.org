import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { securityTxtBody } from "../server/utils/securityTxt";

const testDir = dirname(fileURLToPath(import.meta.url));
const frontendRoot = join(testDir, "..");
const scriptPath = join(frontendRoot, "scripts", "write-public-metadata.mjs");

function withOutputDir(callback: (outputDir: string) => void) {
	const outputDir = mkdtempSync(join(tmpdir(), "itc-public-metadata-"));
	try {
		mkdirSync(join(outputDir, "public", "_nuxt", "builds"), { recursive: true });
		writeFileSync(join(outputDir, "public", "_nuxt", "builds", "latest.json"), JSON.stringify({ id: "build-123" }));
		callback(outputDir);
	} finally {
		rmSync(outputDir, { recursive: true, force: true });
	}
}

test("public metadata writer emits static deployment and security assets", () => {
	withOutputDir((outputDir) => {
		execFileSync(process.execPath, [scriptPath], {
			cwd: frontendRoot,
			env: {
				...process.env,
				NODE_ENV: "production",
				PUBLIC_SITE_URL: "https://example.test",
				PUBLIC_METADATA_OUTPUT_DIR: outputDir,
				SOURCE_COMMIT: "abc123",
				SOURCE_TAG: "v1.0.0"
			}
		});

		const deployment = JSON.parse(readFileSync(join(outputDir, "public", "deployment.json"), "utf8")) as {
			buildId?: string;
			commit?: string;
			ref?: string;
		};
		const standardSecurity = readFileSync(join(outputDir, "public", ".well-known", "security.txt"), "utf8");
		const fallbackSecurity = readFileSync(join(outputDir, "public", "security.txt"), "utf8");

		assert.equal(deployment.commit, "abc123");
		assert.equal(deployment.ref, "v1.0.0");
		assert.equal(deployment.buildId, "build-123");
		assert.equal(standardSecurity, securityTxtBody);
		assert.equal(fallbackSecurity, securityTxtBody);
	});
});
