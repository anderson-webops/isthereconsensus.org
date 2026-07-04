import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { defaultClaims } from "../src/data/claims.js";
import { CLAIM_SOURCE_TITLE_MAX_LENGTH, ClaimSource } from "../src/models/schemas/ClaimSource.js";

const launchSensitiveClaimSlugs = [
	"do-childhood-vaccines-cause-autism",
	"does-the-mmr-vaccine-cause-autism",
	"do-mrna-covid-19-vaccines-change-your-dna",
	"do-covid-19-vaccines-cause-infertility",
	"are-covid-19-vaccines-safe-and-beneficial-during-pregnancy-and-breastfeeding",
	"how-big-is-the-myocarditis-risk-after-mrna-covid-19-vaccination",
	"is-recent-global-warming-mainly-caused-by-human-activity",
	"is-the-sun-causing-recent-global-warming",
	"do-volcanoes-emit-more-co2-than-humans",
	"is-there-a-scientific-consensus-that-humans-are-causing-climate-change",
	"does-antibiotic-overuse-drive-antibiotic-resistance",
	"is-evolution-just-a-theory",
	"is-nuclear-power-more-dangerous-than-fossil-fuel-energy"
];

function primarySourceLink(source: (typeof defaultClaims)[number]["sources"][number]) {
	return source.url || source.doi || source.pmid || source.pmcid || "";
}

describe("default claim seed quality", () => {
	it("keeps seeded claim slugs unique", () => {
		const keys = defaultClaims.map(claim => `${claim.topicSlug}/${claim.slug}`);
		assert.equal(new Set(keys).size, keys.length);
	});

	it("keeps every published claim complete enough for public claim pages", () => {
		const publishedClaims = defaultClaims.filter(claim => claim.status === "published");

		assert.ok(publishedClaims.length > 0);
		for (const claim of publishedClaims) {
			assert.ok(claim.title.trim(), `${claim.slug} is missing a title`);
			assert.ok(claim.bottomLine.trim(), `${claim.slug} is missing a bottom line`);
			assert.ok(claim.editorSummary.trim(), `${claim.slug} is missing an editor summary`);
			assert.ok(claim.uncertaintySummary.trim(), `${claim.slug} is missing uncertainty summary copy`);
			assert.ok(claim.stableCore.length >= 2, `${claim.slug} needs stable-core bullets`);
			assert.ok(claim.openQuestions.length >= 1, `${claim.slug} needs visible uncertainty limits`);
			assert.ok(claim.evidenceSummaries.length >= 1, `${claim.slug} needs outcome evidence summaries`);
			assert.ok(claim.changeLog.length >= 1, `${claim.slug} needs a public change log`);
			assert.ok(claim.sources.length >= 2, `${claim.slug} needs at least two source rows`);
			assert.ok(
				claim.sources.some(source => source.kind !== "context"),
				`${claim.slug} needs at least one decision-weight source`
			);

			const sourceOrders = claim.sources.map(source => source.order);
			assert.equal(new Set(sourceOrders).size, sourceOrders.length, `${claim.slug} has duplicate source orders`);
			for (const source of claim.sources) {
				assert.ok(source.title.trim(), `${claim.slug} has a source without a title`);
				assert.ok(source.publisher.trim(), `${claim.slug} has a source without a publisher`);
				assert.ok(source.note.trim(), `${claim.slug} has a source without an editorial note`);
				assert.ok(source.order > 0, `${claim.slug} has a source without a positive order`);
				assert.ok(
					primarySourceLink(source),
					`${claim.slug} source "${source.title}" needs a public link or identifier`
				);
			}
		}
	});

	it("keeps public source links free of chat-specific tracking parameters", () => {
		for (const claim of defaultClaims) {
			for (const source of claim.sources) {
				if (!source.url) continue;
				assert.doesNotMatch(
					source.url,
					/[?&]utm_source=chatgpt\b/,
					`${claim.slug} source "${source.title}" exposes a chat-specific tracking parameter`
				);
			}
		}
	});

	it("keeps launch-sensitive claim cards backed by linked source stacks", () => {
		for (const slug of launchSensitiveClaimSlugs) {
			const claim = defaultClaims.find(entry => entry.slug === slug);
			assert.ok(claim, `Missing launch-sensitive claim seed ${slug}`);
			assert.equal(claim.status, "published", `${slug} must stay published for launch`);
			assert.ok(claim.sources.length >= 3, `${slug} must expose at least three sources`);
			assert.ok(
				claim.sources.some(source => source.kind !== "context"),
				`${slug} needs at least one decision-weight source, not only background context`
			);

			assert.ok(claim.sources.every(primarySourceLink), `${slug} must expose only linked source rows`);
		}
	});

	it("keeps seeded claim sources inside the ClaimSource schema constraints", async () => {
		const titlePath = ClaimSource.schema.path("title") as { options: { maxlength?: number } };
		assert.equal(titlePath.options.maxlength, CLAIM_SOURCE_TITLE_MAX_LENGTH);

		for (const claim of defaultClaims) {
			for (const source of claim.sources) {
				assert.ok(
					source.title.length <= CLAIM_SOURCE_TITLE_MAX_LENGTH,
					`${claim.slug} source title is ${source.title.length}/${CLAIM_SOURCE_TITLE_MAX_LENGTH} characters: ${source.title}`
				);

				const sourceDocument = new ClaimSource({
					claim: new mongoose.Types.ObjectId(),
					...source,
					citationCheckedAt: source.citationCheckedAt ? new Date(source.citationCheckedAt) : undefined
				});
				await assert.doesNotReject(
					() => sourceDocument.validate(),
					`${claim.slug} source "${source.title}" failed schema validation`
				);
			}
		}
	});

	it("keeps Skeptical Science contextual on the flagship climate claim", () => {
		const claim = defaultClaims.find(
			entry => entry.slug === "is-recent-global-warming-mainly-caused-by-human-activity"
		);
		assert.ok(claim, "Missing flagship climate claim seed");

		const skepticalScienceSource = claim.sources.find(source => source.publisher === "Skeptical Science");
		assert.ok(skepticalScienceSource, "Climate claim should include Skeptical Science as rebuttal context");
		assert.equal(skepticalScienceSource.kind, "context");
		assert.equal(skepticalScienceSource.isAnchor, false);
		assert.match(skepticalScienceSource.note, /Contextual rebuttal resource/);
		assert.match(skepticalScienceSource.note, /rather than as the assessment anchor/);
	});
});
