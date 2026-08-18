import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { topicGuides } from "../src/data/topicGuides.js";

const testDir = dirname(fileURLToPath(import.meta.url));
function seededClaimTopics() {
	const dataDir = join(testDir, "..", "..", "back-end", "src", "data");
	const seedFiles = readdirSync(dataDir).filter(
		(fileName) => fileName === "claims.ts" || (fileName.startsWith("claim-expansion-") && fileName.endsWith(".ts"))
	);
	const claimTopics = new Map<string, string>();

	for (const fileName of seedFiles) {
		const source = readFileSync(join(dataDir, fileName), "utf8");
		for (const match of source.matchAll(/topicSlug:\s*"([^"]+)"[\s\S]*?slug:\s*"([^"]+)"/g)) {
			claimTopics.set(match[2], match[1]);
		}
	}

	return claimTopics;
}

describe("topic guide starter claims", () => {
	it("provides three distinct, seeded entry points for every topic guide", () => {
		const allStarters: string[] = [];
		const claimTopics = seededClaimTopics();

		for (const [topicSlug, guide] of Object.entries(topicGuides)) {
			const starters = guide.starterClaimSlugs ?? [];

			assert.equal(starters.length, 3, `${topicSlug} should expose exactly three starter claims`);
			assert.equal(new Set(starters).size, 3, `${topicSlug} starter claims should be distinct`);
			for (const starterSlug of starters) {
				assert.equal(
					claimTopics.get(starterSlug),
					topicSlug,
					`${starterSlug} should be seeded in ${topicSlug}`
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
