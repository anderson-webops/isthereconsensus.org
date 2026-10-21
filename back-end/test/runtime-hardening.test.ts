import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { Admin } from "../src/models/schemas/Admin.js";
import { ExpertApplication } from "../src/models/schemas/ExpertApplication.js";
import { User } from "../src/models/schemas/User.js";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(backendRoot, "..");

describe("runtime hardening", () => {
	it("keeps MongoDB fixtures pinned together on a compatible runner with a readiness gate", () => {
		const workflow = readFileSync(join(repositoryRoot, ".github/workflows/ci.yml"), "utf8");
		const promotion = readFileSync(join(repositoryRoot, "scripts/claim-refresh-promotion-smoke.mjs"), "utf8");
		const build = workflow.split("\n  build:\n")[1].split("\n  linux-arm64-install:")[0];
		const fixture = build.match(/image: (mongo:8\.0\.34@sha256:[a-f0-9]{64})/);
		assert.ok(fixture);
		assert.match(build, /^ {4}runs-on: ubuntu-22\.04$/m);
		assert.ok(promotion.includes(`const image = "${fixture[1]}";`));
		assert.match(build, /--health-cmd "mongosh --quiet --eval 'db\.adminCommand\(\{ ping: 1 \}\)'"/);
		assert.match(build, /--health-retries 12/);
	});

	it("rejects concurrent stale account and expert-access decisions", () => {
		assert.equal(Admin.schema.options.optimisticConcurrency, true);
		assert.equal(User.schema.options.optimisticConcurrency, true);
		assert.equal(ExpertApplication.schema.options.optimisticConcurrency, true);
	});

	it("seeds content before the API starts and bounds each Node service", () => {
		const apiUnit = readFileSync(
			join(repositoryRoot, "deploy/systemd/isthereconsensus-api.service"),
			"utf8"
		);
		const webUnit = readFileSync(
			join(repositoryRoot, "deploy/systemd/isthereconsensus-web.service"),
			"utf8"
		);

		const seedPosition = apiUnit.indexOf("ExecStartPre=/usr/bin/node back-end/dist/scripts/seedContent.js");
		const serverPosition = apiUnit.indexOf("ExecStart=/usr/bin/node back-end/dist/server.js");
		assert.ok(seedPosition >= 0 && serverPosition > seedPosition);
		for (const unit of [apiUnit, webUnit]) {
			assert.match(unit, /MemoryHigh=384M/);
			assert.match(unit, /MemoryMax=512M/);
			assert.match(unit, /TasksMax=128/);
		}
	});
});
