import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { loadGuideReviewAvailability } from "../src/utils/guide-review-availability.js";

const reviews = [
	{ path: "/consensus/physics-and-chemistry/first-review", label: "First" },
	{ path: "/consensus/physics-and-chemistry/second-review", label: "Second" },
	{ path: "/consensus/astronomy-and-space/first-review", label: "Other topic" }
];

describe("public availability of connected guide reviews", () => {
	it("uses one dedicated published-claims request per topic and retains metadata order", async () => {
		const called: string[] = [];
		const result = await loadGuideReviewAvailability(reviews, async (topic) => {
			called.push(topic);
			return { claims: [{ slug: "first-review" }, { slug: "second-review", status: "published" }] };
		});
		assert.deepEqual(called, ["physics-and-chemistry", "astronomy-and-space"]);
		assert.deepEqual(
			result.map((entry) => entry.availability),
			["published", "published", "published"]
		);
		assert.deepEqual(
			result.map(({ availability: _availability, ...review }) => review),
			reviews
		);
	});

	it("marks source-only records not published without borrowing a matching slug from another topic", async () => {
		const result = await loadGuideReviewAvailability(reviews, async (topic) => ({
			claims: topic === "astronomy-and-space" ? [{ slug: "first-review" }] : []
		}));
		assert.deepEqual(
			result.map((entry) => entry.availability),
			["not_published", "not_published", "published"]
		);
	});

	it("treats a failed availability check as unknown rather than proof of no public records", async () => {
		const result = await loadGuideReviewAvailability(reviews, async (topic) => {
			if (topic === "physics-and-chemistry") throw new Error("private-token-must-not-be-rendered");
			return { claims: [{ slug: "first-review" }] };
		});
		assert.deepEqual(
			result.map((entry) => entry.availability),
			["unavailable", "unavailable", "published"]
		);
		assert.ok(!JSON.stringify(result).includes("private-token"));
	});

	it("does not use malformed or nonpublic API rows as publication evidence", async () => {
		for (const response of [
			{},
			{ claims: null },
			{ claims: "not a list" },
			{ claims: [null] },
			{ claims: [{ slug: "../first-review" }] },
			{ claims: [{ slug: "first-review", status: "draft" }] }
		]) {
			const result = await loadGuideReviewAvailability(reviews, async () => response);
			assert.ok(result.every((entry) => entry.availability === "unavailable"));
		}
	});

	it("rejects external, encoded, query-bearing and malformed target paths before requesting them", async () => {
		const unsafe = [
			"https://example.org/consensus/topic/claim",
			"//example.org/consensus/topic/claim",
			"/consensus/../claim",
			"/consensus/topic/claim?token=private",
			"/consensus/topic/%2e%2e",
			"/consensus/topic/claim#secret"
		];
		let calls = 0;
		const result = await loadGuideReviewAvailability(
			unsafe.map((path) => ({ path, label: "Invalid metadata" })),
			async () => {
				calls += 1;
				return { claims: [] };
			}
		);
		assert.equal(calls, 0);
		assert.ok(result.every((entry) => entry.availability === "unavailable"));
	});

	it("supports an empty guide without reading the API", async () => {
		assert.deepEqual(
			await loadGuideReviewAvailability([], async () => {
				throw new Error("must not be requested");
			}),
			[]
		);
	});

	it("projects only public link metadata and does not copy extra input or API fields", async () => {
		const result = await loadGuideReviewAvailability(
			reviews.map((review) => ({ ...review, privateNote: "must-not-be-projected" })),
			async () => ({ claims: [{ slug: "first-review", privateNote: "must-not-be-projected" }] })
		);
		assert.ok(result.every((entry) => Object.keys(entry).sort().join(",") === "availability,label,path"));
		assert.ok(!JSON.stringify(result).includes("must-not-be-projected"));
	});

	it("can recheck after publication, withdrawal or a temporary API failure", async () => {
		let current: unknown = { claims: [] };
		const load = async () => {
			if (current instanceof Error) throw current;
			return current;
		};
		assert.equal((await loadGuideReviewAvailability(reviews, load))[0]!.availability, "not_published");
		current = { claims: [{ slug: "first-review" }] };
		assert.equal((await loadGuideReviewAvailability(reviews, load))[0]!.availability, "published");
		current = new Error("temporary failure");
		assert.equal((await loadGuideReviewAvailability(reviews, load))[0]!.availability, "unavailable");
		current = { claims: [] };
		assert.equal((await loadGuideReviewAvailability(reviews, load))[0]!.availability, "not_published");
	});
});
