import type { SetupDashboardResponse } from "../src/types/setup";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildFrontendSetupChecks, buildServerAgentPrompt } from "../src/utils/setup";

describe("buildServerAgentPrompt", () => {
	it("includes the public site origin and api base", () => {
		const prompt = buildServerAgentPrompt({
			siteUrl: "https://isthereconsensus.org/",
			apiBase: "https://isthereconsensus.org/"
		});

		assert.match(prompt, /https:\/\/isthereconsensus\.org/);
		assert.match(prompt, /PUBLIC_API_BASE=https:\/\/isthereconsensus\.org/);
	});
});

describe("buildFrontendSetupChecks", () => {
	it("warns when the api base is still localhost", () => {
		const dashboard: SetupDashboardResponse = {
			generatedAt: new Date().toISOString(),
			siteUrl: "https://isthereconsensus.org",
			apiBase: "http://127.0.0.1:3011",
			frontend: { ok: true, detail: "Nuxt is serving this page." },
			backendHealth: { ok: true, detail: "Backend /healthz responded successfully.", data: { ok: true } },
			backendReady: {
				ok: true,
				detail: "Backend /readyz reports MongoDB is ready.",
				data: { ready: true, state: 1 }
			},
			backendSetup: { ok: true, detail: "7/8 checks passing" }
		};

		const checks = buildFrontendSetupChecks(dashboard);
		const originAlignment = checks.find((check) => check.id === "origin-alignment");

		assert.equal(originAlignment?.ok, false);
		assert.match(originAlignment?.detail || "", /127\.0\.0\.1/);
	});
});
