import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const temporaryDirectory = mkdtempSync(join(tmpdir(), "isthereconsensus-backend-smoke-"));
const emptyEnvironmentFile = join(temporaryDirectory, ".env");

try {
	writeFileSync(emptyEnvironmentFile, "");
	const result = spawnSync(process.execPath, [resolve("back-end/dist/server.js")], {
		cwd: resolve("."),
		encoding: "utf8",
		env: {
			DOTENV_CONFIG_PATH: emptyEnvironmentFile,
			NODE_ENV: "production",
			PATH: process.env.PATH || ""
		},
		timeout: 10_000
	});

	assert.notEqual(result.status, 0, "The production backend must fail closed without required secrets.");
	assert.doesNotMatch(result.stderr, /ERR_MODULE_NOT_FOUND/, "The compiled backend must resolve all runtime modules.");
	assert.match(result.stderr, /Server startup failed: Error/, "Startup must fail through the redacted error boundary.");
	assert.doesNotMatch(result.stdout, /Server listening/, "The backend must not listen without required secrets.");
	console.log("backend runtime smoke ok: compiled modules load and missing secrets fail closed");
}
finally {
	rmSync(temporaryDirectory, { force: true, recursive: true });
}
