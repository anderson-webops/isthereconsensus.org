import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const sitemapSource = readFileSync(join(testDir, "..", "server", "routes", "sitemap.xml.ts"), "utf8");

const publicStaticRoutes = [
	"/",
	"/ask",
	"/consensus",
	"/explainers",
	"/misconceptions",
	"/standards",
	"/privacy",
	"/terms"
];

const omittedRoutes = [
	"/claim-roadmap",
	"/evidence-ops",
	"/future-roadmap",
	"/governance",
	"/how",
	"/methods",
	"/policy-center",
	"/search-demand",
	"/source-standards"
];

describe("sitemap static route list", () => {
	for (const route of publicStaticRoutes) {
		it(`keeps ${route} discoverable`, () => {
			assert.match(sitemapSource, new RegExp(`path: "${route === "/" ? "\\/" : route}"`));
		});
	}

	for (const route of omittedRoutes) {
		it(`omits redirected or noindex route ${route}`, () => {
			assert.doesNotMatch(sitemapSource, new RegExp(`path: "${route}"`));
		});
	}
});
