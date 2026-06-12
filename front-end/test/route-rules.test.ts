import assert from "node:assert/strict";
import { describe, it } from "node:test";

const { default: config } = await import("../nuxt.config.ts");
const routeRules = config.routeRules ?? {};

const privateRoutes = ["/account", "/account/**", "/api/**", "/setup", "/setup/**"];
const legacyRedirects: Record<string, string> = {
	"/claim-roadmap": "/account/editorial#canonical-backlog",
	"/evidence-ops": "/standards",
	"/future-roadmap": "/account/editorial#future-roadmap",
	"/governance": "/account/editorial#moderation-guide",
	"/how": "/standards",
	"/methods": "/standards",
	"/policy-center": "/standards",
	"/search-demand": "/account/editorial#search-demand-signals"
};

describe("route rules", () => {
	for (const route of privateRoutes) {
		it(`keeps private route ${route} out of search indexes`, () => {
			assert.equal(routeRules[route]?.headers?.["X-Robots-Tag"], "noindex, nofollow");
		});
	}

	for (const [route, destination] of Object.entries(legacyRedirects)) {
		it(`redirects and noindexes legacy route ${route}`, () => {
			assert.equal(routeRules[route]?.headers?.["X-Robots-Tag"], "noindex, follow");
			assert.deepEqual(routeRules[route]?.redirect, {
				to: destination,
				statusCode: 301
			});
		});
	}

	it("keeps low-profile source standards out of search indexes without redirecting editors", () => {
		assert.equal(routeRules["/source-standards"]?.headers?.["X-Robots-Tag"], "noindex, follow");
		assert.equal(routeRules["/source-standards"]?.redirect, undefined);
	});
});
