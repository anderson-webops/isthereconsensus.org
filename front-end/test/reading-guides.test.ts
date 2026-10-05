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
	it("connects thirty-two distinct mechanical-model questions without claiming measurements or expert votes", async () => {
		const guide = await loadReadingGuide("reading-motion-forces-and-energy-claims");
		assert.ok(guide);
		const summary = readingGuides.find((entry) => entry.slug === "reading-motion-forces-and-energy-claims")!;
		assert.equal(summary.reviews.length, 32);
		assert.deepEqual(summary.topics, ["physics-and-chemistry"]);
		assert.equal(summary.checkedAt, "2026-10-05");
		assert.equal(guide.sources.length, 39);
		const paragraphs = guide.sections.flatMap((section) => section.paragraphs);
		const text = paragraphs.map((paragraph) => paragraph.text).join(" ");
		assert.ok(text.split(/\s+/).length >= 2000);
		assert.ok(paragraphs.every((paragraph) => paragraph.sources.length > 0));
		assert.match(guide.scope, /independently constructed and hypothetical/);
		assert.match(guide.scope, /independent expert review has not been completed/);
		assert.ok(guide.sections.some((section) => section.title === "A conserved total does not freeze every part"));
		assert.match(text, /3 N m through 2 radians does 6 J/);
		assert.match(text, /1\.5 N s and 3 N s/);
		assert.match(text, /not a numerical poll of scientists/);
		assert.match(text, /this library does not establish it/);
	});
	it("connects twenty distinct electrical questions with sourced state, model and measurement boundaries", async () => {
		const guide = await loadReadingGuide("reading-electrical-quantities-and-circuit-claims");
		assert.ok(guide);
		const summary = readingGuides.find(
			(entry) => entry.slug === "reading-electrical-quantities-and-circuit-claims"
		)!;
		assert.equal(summary.reviews.length, 20);
		assert.deepEqual(summary.topics, ["physics-and-chemistry"]);
		assert.equal(summary.checkedAt, "2026-10-05");
		const paragraphs = guide.sections.flatMap((section) => section.paragraphs);
		const text = paragraphs.map((paragraph) => paragraph.text).join(" ");
		assert.ok(text.split(/\s+/).length >= 1500);
		assert.equal(guide.sources.length, 22);
		assert.ok(paragraphs.every((paragraph) => paragraph.sources.length > 0));
		assert.match(guide.scope, /independently constructed and hypothetical/);
		assert.match(guide.scope, /independent expert review has not been completed/);
		assert.match(text, /charge balance, the energy balance and the propagation question/);
		assert.match(text, /108,000 J/);
		assert.match(text, /20 VA.*0\.5 gives 10 W/);
		assert.match(text, /9 mJ, not the 18 mJ/);
		assert.match(text, /not independent experiments/);
		assert.match(text, /not a numerical poll of scientists/);
		assert.match(text, /0\.02 Wb/);
	});

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

	it("adds a distinct privacy guide with observer and encryption boundaries", async () => {
		const guide = await loadReadingGuide("browsing-privacy");
		assert.ok(guide);
		assert.match(guide.scope, /not a provider ranking, independent security audit/);
		assert.match(guide.scope, /independent expert review has not been completed/);
		const text = guide.sections
			.flatMap((section) => section.paragraphs)
			.map((paragraph) => paragraph.text)
			.join(" ");
		assert.match(text, /dishonest website can use HTTPS/);
		assert.match(text, /does not mean it can automatically decrypt/);
		assert.match(text, /old implementation findings cannot establish/);
		assert.notEqual(guide, await loadReadingGuide("account-protection"));
		const summary = readingGuides.find((entry) => entry.slug === "browsing-privacy")!;
		assert.equal(summary.reviews.length, 3);
		assert.equal(new Set(summary.reviews.map((review) => review.path)).size, 3);
	});

	it("keeps guide routes in the sitemap even when the backend is unavailable", () => {
		const source = readFileSync(new URL("../server/routes/sitemap.xml.ts", import.meta.url), "utf8");
		assert.match(source, /const guideRoutes = readingGuides\.map/);
		assert.match(source, /\.\.\.staticRoutes, \.\.\.guideRoutes, \.\.\.comparisonRoutes, \.\.\.dynamicRoutes/);
	});

	it("adds a distinct evidence-chain guide without overstating reconstructions", async () => {
		const guide = await loadReadingGuide("reading-fossil-and-ancestry-evidence");
		assert.ok(guide);
		assert.match(guide.scope, /not a laboratory protocol, medical diet recommendation/);
		assert.match(guide.scope, /independent expert review has not been completed/);
		const text = guide.sections
			.flatMap((section) => section.paragraphs)
			.map((paragraph) => paragraph.text)
			.join(" ");
		assert.match(text, /not a catch-all name/);
		assert.match(text, /not the brain itself/);
		assert.match(text, /not evidence of the first woman/);
		assert.match(text, /still includes animal foods/);
		assert.match(text, /not two independent studies/);
		assert.notEqual(guide, await loadReadingGuide("understanding-evolution"));
		const summary = readingGuides.find((entry) => entry.slug === "reading-fossil-and-ancestry-evidence")!;
		assert.equal(summary.reviews.length, 5);
	});

	it("connects ten space questions while qualifying observations and models", async () => {
		const guide = await loadReadingGuide("reading-space-observations");
		assert.ok(guide);
		assert.match(guide.scope, /independent expert review has not been completed/);
		const text = guide.sections
			.flatMap((section) => section.paragraphs)
			.map((paragraph) => paragraph.text)
			.join(" ");
		assert.match(text, /not a resolved photograph/);
		assert.match(text, /not two independent confirmations/);
		assert.match(text, /not a direct identification/);
		assert.match(text, /not an exhaustive review of later comparisons/);
		assert.match(text, /not a movie of one galaxy/);
		assert.equal(readingGuides.find((entry) => entry.slug === "reading-space-observations")!.reviews.length, 10);
		assert.notEqual(guide, await loadReadingGuide("reading-fossil-and-ancestry-evidence"));
	});

	it("adds substantive flood and coastal guides with ten real review links each", async () => {
		for (const slug of ["reading-flood-and-groundwater-claims", "reading-tides-waves-and-ocean-measurements"]) {
			const guide = await loadReadingGuide(slug);
			assert.ok(guide);
			assert.equal(readingGuides.find((entry) => entry.slug === slug)!.reviews.length, 10);
			const text = guide.sections
				.flatMap((section) => section.paragraphs)
				.map((paragraph) => paragraph.text)
				.join(" ");
			assert.ok(text.split(/\s+/).length >= 900);
			assert.match(guide.scope, /independent expert review has not been completed/);
			assert.match(guide.scope, /not a.*warning/);
		}
	});

	it("connects twenty heat and optics reviews with a substantial original guide", async () => {
		const guide = await loadReadingGuide("reading-heat-and-light-claims");
		assert.ok(guide);
		const summary = readingGuides.find((entry) => entry.slug === "reading-heat-and-light-claims")!;
		assert.equal(summary.reviews.length, 20);
		assert.deepEqual(summary.topics, ["physics-and-chemistry"]);
		assert.equal(summary.checkedAt, "2026-10-05");
		const text = guide.sections
			.flatMap((section) => section.paragraphs)
			.map((paragraph) => paragraph.text)
			.join(" ");
		assert.ok(text.split(/\s+/).length >= 1100);
		assert.equal(guide.sources.length, 19);
		assert.match(guide.scope, /independent expert review has not been completed/);
		assert.match(guide.scope, /not a clinical recommendation/);
		assert.match(text, /commercial interest remains visible/);
		assert.match(text, /Full methods, funding and conflicts were not audited/);
		assert.match(text, /internal reflection need not be total/);
		assert.match(text, /not an absolute limit/);
		assert.match(text, /does not by itself establish UV protection/);
		assert.notEqual(guide, await loadReadingGuide("reading-tides-waves-and-ocean-measurements"));
	});

	it("connects twenty statistics questions with a substantial original guide and model boundaries", async () => {
		const guide = await loadReadingGuide("reading-averages-percentages-and-probability");
		assert.ok(guide);
		const summary = readingGuides.find((entry) => entry.slug === "reading-averages-percentages-and-probability")!;
		assert.equal(summary.reviews.length, 20);
		assert.deepEqual(summary.topics, ["consensus-foundations"]);
		assert.equal(summary.checkedAt, "2026-10-05");
		const paragraphs = guide.sections.flatMap((section) => section.paragraphs);
		const text = paragraphs.map((paragraph) => paragraph.text).join(" ");
		assert.ok(text.split(/\s+/).length >= 1400);
		assert.equal(guide.sources.length, 27);
		assert.ok(paragraphs.every((paragraph) => paragraph.sources.length > 0));
		assert.match(guide.scope, /independently constructed and hypothetical/);
		assert.match(guide.scope, /independent expert review has not been completed/);
		assert.match(text, /68\/110 versus 75\/110/);
		assert.match(text, /Unknown is not measured zero/);
		assert.match(text, /not independent experiments/);
		assert.match(text, /does not fix biased selection/);
		assert.match(text, /Countable additivity.*uncountable/);
		assert.match(text, /always aggregate and always adjust are both inadequate/);
	});

	it("keeps water definitions, access limitations and safety boundaries visible", async () => {
		const flood = await loadReadingGuide("reading-flood-and-groundwater-claims");
		const coastal = await loadReadingGuide("reading-tides-waves-and-ocean-measurements");
		const floodText = JSON.stringify(flood);
		const coastalText = JSON.stringify(coastal);
		assert.match(floodText, /not a complete basin observation/);
		assert.match(floodText, /without raising it above the ground/);
		assert.match(floodText, /abstract and DOI-metadata level/);
		assert.match(floodText, /not a certificate of safety/);
		assert.match(coastalText, /not a universal zero-transport theorem/);
		assert.match(coastalText, /not two independent confirmations/);
		assert.match(coastalText, /not a complete local surge forecast/);
		assert.match(coastalText, /not a full water-column profile/);
		assert.match(coastalText, /erroneous core-magma wording.*not adopted/);
		assert.notEqual(flood, coastal);
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
