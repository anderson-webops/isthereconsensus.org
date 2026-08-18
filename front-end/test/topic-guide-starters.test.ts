import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { topicGuides } from "../src/data/topicGuides.js";

const testDir = dirname(fileURLToPath(import.meta.url));
const expandedTopicFiles = new Map([
	["consensus-foundations", "claim-expansion-2026-08-consensus-foundations.ts"],
	["media-misinformation", "claim-expansion-2026-08-media-misinformation.ts"],
	["bias-incentives", "claim-expansion-2026-08-bias-incentives.ts"],
	["science-communication", "claim-expansion-2026-08-science-communication.ts"],
	["historical-case-studies", "claim-expansion-2026-08-historical-case-studies.ts"],
	["public-policy-and-safety", "claim-expansion-2026-08-public-policy-safety.ts"]
]);

function claimSlugsFromSeedFile(fileName: string) {
	const source = readFileSync(join(testDir, "..", "..", "back-end", "src", "data", fileName), "utf8");
	return new Set([...source.matchAll(/\n\t\tslug: "([^"]+)",/g)].map((match) => match[1]));
}

describe("topic guide starter claims", () => {
	it("provides three distinct, seeded entry points for every newly deepened topic", () => {
		const allStarters: string[] = [];

		for (const [topicSlug, fileName] of expandedTopicFiles) {
			const starters = topicGuides[topicSlug]?.starterClaimSlugs ?? [];
			const seededClaimSlugs = claimSlugsFromSeedFile(fileName);

			assert.equal(starters.length, 3, `${topicSlug} should expose exactly three starter claims`);
			assert.equal(new Set(starters).size, 3, `${topicSlug} starter claims should be distinct`);
			for (const starterSlug of starters) {
				assert.ok(
					seededClaimSlugs.has(starterSlug),
					`${starterSlug} should exist in the ${topicSlug} seed tranche`
				);
			}
			allStarters.push(...starters);
		}

		assert.equal(
			new Set(allStarters).size,
			allStarters.length,
			"starter claims should not repeat across topic guides"
		);
	});
});
