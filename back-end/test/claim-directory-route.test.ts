import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const serverSource = readFileSync(join(testDir, "..", "src", "server.ts"), "utf8");
const routeStart = serverSource.indexOf("api.get(\"/claims\"");
const nextRoute = serverSource.indexOf("api.get(\"/topics/:topicSlug/claims/:claimSlug\"", routeStart);
const routeSource = serverSource.slice(routeStart, nextRoute);

describe("public claim directory route", () => {
	it("keeps the complete public directory available without authentication", () => {
		assert.ok(routeStart >= 0, "Missing GET /api/claims route");
		assert.ok(nextRoute > routeStart, "Claim directory should be defined before the claim-detail route");
		assert.doesNotMatch(routeSource, /requireAuth|requireAdmin|requireEditorial/);
		assert.match(routeSource, /Claim\.find\(filter\)\.populate\("topic"\)/);
		assert.match(routeSource, /loadClaimSourceReadinessCountMap/);
		assert.match(routeSource, /filter\(\(?claim\)? => publicClaimIsReady/);
	});

	it("supports bounded pagination, search, topic, and consensus filters", () => {
		assert.match(routeSource, /req\.query\.q/);
		assert.match(routeSource, /req\.query\.topic/);
		assert.match(routeSource, /req\.query\.consensusBand/);
		assert.match(routeSource, /normalizeInteger\(req\.query\.page, 1, 10_000, 1\)/);
		assert.match(routeSource, /normalizeInteger\(req\.query\.limit, 1, 500, 24\)/);
		assert.match(routeSource, /pagination:\s*\{/);
		assert.match(routeSource, /totalPages/);
		assert.match(routeSource, /hasMore/);
	});
});
