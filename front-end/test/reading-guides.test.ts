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
	it("has a unique discoverable entry for all ten planned subjects", () => {
		assert.ok(readingGuides.length >= 10);
		assert.equal(new Set(readingGuides.map((guide) => guide.slug)).size, readingGuides.length);
		for (const slug of [
			"caffeine-tolerance-and-sleep",
			"making-sense-of-supplements",
			"comparing-electricity-options",
			"sleep-and-insomnia",
			"exercise-without-magic-numbers",
			"reading-vaccine-evidence",
			"making-sense-of-nutrition",
			"understanding-climate-attribution",
			"understanding-evolution",
			"interpreting-medical-evidence"
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
			assert.ok(body.split(/\s+/).length >= 500, `${summary.slug} needs a substantive body`);
			for (const section of guide.sections) {
				assert.match(section.id, safeSlug);
				assert.ok(section.paragraphs.length > 0);
				for (const paragraph of section.paragraphs) {
					assert.ok(paragraph.text.length > 80);
					assert.equal(paragraph.text, paragraph.text.trim());
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
		assert.match(source, /\.\.\.staticRoutes, \.\.\.guideRoutes, \.\.\.comparisonRoutes, \.\.\.dynamicRoutes/);
	});

	it("includes every guide in both-theme accessibility coverage", () => {
		const source = readFileSync(new URL("../../scripts/a11y-smoke.mjs", import.meta.url), "utf8");
		for (const guide of readingGuides) assert.ok(source.includes(`"/guides/${guide.slug}"`));
		assert.ok(source.includes('"light,dark"'));
	});

	it("preserves important population, correction, and uncertainty qualifications", async () => {
		const qualifications: Record<string, RegExp[]> = {
			"sleep-and-insomnia": [/low-certainty/, /medicine alone/, /CBT-I alone/],
			"exercise-without-magic-numbers": [
				/residual confounding/,
				/corrected a supplementary table/,
				/not.*one reader/
			],
			"reading-vaccine-evidence": [
				/not evidence that vaccination prevents autism/,
				/observational/,
				/cannot establish causation/
			],
			"making-sense-of-nutrition": [/2018 revised analysis/, /random assignment/, /small and short/],
			"understanding-climate-attribution": [
				/2011-2020/,
				/1850-1900/,
				/hypothetical/,
				/not evidence that a region is unaffected/
			],
			"understanding-evolution": [
				/did not descend from chimpanzees living today/,
				/Genetic drift/,
				/not.*person's body/
			],
			"interpreting-medical-evidence": [
				/hypothetical/,
				/one percentage point/,
				/not a percentage of scientists/,
				/not.*proof of publication bias/
			]
		};
		for (const [slug, patterns] of Object.entries(qualifications)) {
			const text = JSON.stringify(await loadReadingGuide(slug));
			for (const pattern of patterns) assert.match(text, pattern, `${slug}: missing qualification`);
		}
	});
});
