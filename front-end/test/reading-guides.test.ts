import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { defaultClaims } from "../../back-end/src/data/claims.js";
import { defaultTopics } from "../../back-end/src/data/topics.js";
import { guidesForReview, guidesForTopic, readingGuides } from "../src/data/reading-guides/index.js";
import { loadReadingGuide } from "../src/data/reading-guides/load.js";

const claimPaths = new Set(defaultClaims.map((claim) => `/consensus/${claim.topicSlug}/${claim.slug}`));
const topicSlugs = new Set(defaultTopics.map((topic) => topic.slug));
const safeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

describe("sourced reading guides", () => {
	it("has a unique discoverable entry for each initial guide", () => {
		assert.equal(new Set(readingGuides.map((guide) => guide.slug)).size, readingGuides.length);
		for (const slug of [
			"caffeine-tolerance-and-sleep",
			"making-sense-of-supplements",
			"comparing-electricity-options"
		])
			assert.ok(readingGuides.some((guide) => guide.slug === slug));
	});

	for (const summary of readingGuides) {
		it(`${summary.slug} has substantive explanations and traceable sources`, async () => {
			const guide = await loadReadingGuide(summary.slug);
			assert.ok(guide);
			assert.match(summary.slug, safeSlug);
			assert.ok(guide.sections.length >= 4);
			assert.ok(guide.sources.length >= 3);
			assert.ok(guide.questions.length >= 3);
			assert.ok(guide.scope.length > 80);
			assert.match(summary.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
			assert.ok(Date.parse(summary.checkedAt) <= Date.now(), "source checks cannot be future dated");
			const sources = new Set(guide.sources.map((source) => source.id));
			assert.equal(sources.size, guide.sources.length);
			assert.equal(new Set(guide.sections.map((section) => section.id)).size, guide.sections.length);
			const paragraphs = guide.sections.flatMap((section) => section.paragraphs);
			const body = paragraphs.map((paragraph) => paragraph.text).join(" ");
			assert.ok(body.split(/\s+/).length >= 500);
			for (const section of guide.sections) {
				assert.match(section.id, safeSlug);
				assert.ok(section.paragraphs.length > 0);
				for (const paragraph of section.paragraphs) {
					assert.ok(paragraph.text.length > 80);
					for (const id of paragraph.sources) assert.ok(sources.has(id), `missing citation ${id}`);
				}
			}
			for (const source of guide.sources) {
				assert.match(source.id, safeSlug);
				assert.ok(
					paragraphs.some((paragraph) => paragraph.sources.includes(source.id)),
					"no decorative sources"
				);
				assert.equal(new URL(source.url).protocol, "https:");
				assert.equal(new URL(source.url).username, "");
				assert.equal(new URL(source.url).password, "");
				assert.ok(source.note.length > 50, "source role and review scope are required");
			}
		});

		it(`${summary.slug} connects to real claims and topics in both directions`, () => {
			assert.ok(summary.reviews.length >= 3);
			for (const topic of summary.topics) {
				assert.ok(topicSlugs.has(topic), `unknown topic ${topic}`);
				assert.ok(guidesForTopic(topic).includes(summary));
			}
			for (const review of summary.reviews) {
				assert.ok(claimPaths.has(review.path), `unknown claim ${review.path}`);
				assert.ok(guidesForReview(review.path).includes(summary));
			}
		});
	}

	it("rejects unknown and prototype-property slugs without importing arbitrary paths", async () => {
		for (const slug of ["not-a-guide", "__proto__", "constructor", "../../account", "toString"])
			assert.equal(await loadReadingGuide(slug), undefined);
		assert.deepEqual(guidesForTopic("unknown"), []);
		assert.deepEqual(guidesForReview("/consensus/unknown/unknown"), []);
	});

	it("keeps evidence qualifications with the caffeine findings", async () => {
		const guide = await loadReadingGuide("caffeine-tolerance-and-sleep");
		const text = JSON.stringify(guide);
		assert.match(text, /80 initially inactive men/);
		assert.match(text, /partial tolerance/);
		assert.match(text, /not a prediction/);
		assert.match(text, /neither a target nor a guarantee/);
		assert.match(text, /Abstract checked/);
	});

	it("keeps guide routes in the sitemap even when the backend is unavailable", () => {
		const source = readFileSync(new URL("../server/routes/sitemap.xml.ts", import.meta.url), "utf8");
		assert.match(source, /const guideRoutes = readingGuides\.map/);
		assert.match(source, /\.\.\.staticRoutes, \.\.\.guideRoutes, \.\.\.dynamicRoutes/);
	});
});
