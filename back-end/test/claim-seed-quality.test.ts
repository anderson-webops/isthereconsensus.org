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

	it("keeps the dental sealant claim readable for parents and general readers", () => {
		const claim = defaultClaims.find(
			entry => entry.slug === "do-dental-sealants-prevent-cavities-in-childrens-back-teeth"
		);
		assert.ok(claim, "Missing dental sealant claim seed");

		const visibleSummary = [claim.bottomLine, claim.editorSummary, ...claim.stableCore, ...claim.sources.map(source => source.note)].join(
			" "
		);

		assert.match(claim.bottomLine, /They work as a barrier over pits and fissures/);
		assert.match(claim.bottomLine, /They do not replace fluoride toothpaste, brushing, diet, dental care/);
		assert.match(claim.editorSummary, /cavities in pits and fissures of children's molars/);
		assert.match(visibleSummary, /tooth decay compared with no sealant/);
		assert.doesNotMatch(visibleSummary, /occlusal caries/i);
		assert.doesNotMatch(visibleSummary, /occlusal surfaces/i);
		assert.doesNotMatch(visibleSummary, /\bcaries\b/i);
		assert.doesNotMatch(visibleSummary, /CDC says/i);
	});

	it("keeps the diabetes prevention claim clear about structured programs", () => {
		const slug = "do-structured-lifestyle-programs-prevent-or-delay-type-2-diabetes-in-adults-with-prediabetes";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing diabetes prevention claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /organized Diabetes Prevention Program-style interventions/);
		assert.match(visibleSummary, /new diabetes diagnoses/);
		assert.match(visibleSummary, /heart attacks, strokes, and mortality/);
		assert.doesNotMatch(visibleSummary, /diabetes-incidence/i);
		assert.doesNotMatch(visibleSummary, /diabetes incidence/i);
		assert.doesNotMatch(visibleSummary, /cardiovascular-event/i);
		assert.doesNotMatch(visibleSummary, /try harder/i);
	});

	it("keeps the exercise and depression claim useful without blaming patients", () => {
		const slug = "does-exercise-reduce-symptoms-of-depression";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing exercise and depression claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /reasonable evidence-based treatment option or add-on/);
		assert.match(claim.bottomLine, /not a guaranteed cure or a blame-the-patient message/);
		assert.ok(claim.bottomLine.length <= 300, "Exercise/depression bottom line should stay scannable");
		assert.match(visibleSummary, /73 studies (?:with|and) 4,985 adults/);
		assert.match(visibleSummary, /218 unique studies and 14,170 participants/);
		assert.match(visibleSummary, /does not mean depression is laziness/);
		assert.match(visibleSummary, /not a treatment plan by itself/);
		assert.match(visibleSummary, /should not replace urgent care/);
		assert.doesNotMatch(visibleSummary, /just exercise/i);
		assert.doesNotMatch(visibleSummary, /snap out of it/i);
		assert.doesNotMatch(visibleSummary, /try harder/i);
	});

	it("keeps the later school start time claim focused on adolescent sleep", () => {
		const slug = "do-later-school-start-times-help-teenagers-get-more-sleep";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing later school start time claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.institutionalAnchors.map(anchor => anchor.role),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /Later middle and high school start times/);
		assert.match(visibleSummary, /adolescent sleep/i);
		assert.ok(claim.bottomLine.length <= 380, "Later school start time bottom line should stay concise");
		assert.match(claim.bottomLine, /clearest consensus is on sleep timing and duration/);
		assert.match(visibleSummary, /8:30 a\.m\. or later/);
		assert.match(visibleSummary, /8 to 10 hours/);
		assert.match(visibleSummary, /28 studies and 1,774,509 participants/);
		assert.match(visibleSummary, /only 17\.7%/);
		assert.match(visibleSummary, /depend on implementation/);
		assert.match(visibleSummary, /do not guarantee better grades/);
		assert.doesNotMatch(visibleSummary, /will guarantee better grades/i);
		assert.doesNotMatch(visibleSummary, /guaranteed grade gains/i);
		assert.doesNotMatch(visibleSummary, /lazy/i);
		assert.doesNotMatch(visibleSummary, /just sleep in/i);
	});

	it("keeps the heat pump emissions claim bounded to emissions, not household cost promises", () => {
		const slug = "do-heat-pumps-usually-cut-home-heating-emissions-compared-with-fossil-fuel-heating";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing heat pump emissions claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.misconceptions,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /Usually yes/);
		assert.match(claim.bottomLine, /costs, comfort, and installation difficulty are separate questions/);
		assert.ok(claim.bottomLine.length <= 320, "Heat pump bottom line should stay scannable");
		assert.match(visibleSummary, /3-to-5 times/);
		assert.match(visibleSummary, /53 of 59 regions/);
		assert.match(visibleSummary, /5%-9%/);
		assert.match(visibleSummary, /cleaner grids/);
		assert.match(visibleSummary, /refrigerant leaks/);
		assert.doesNotMatch(visibleSummary, /guaranteed lower bills/i);
		assert.doesNotMatch(visibleSummary, /every household will save money/i);
		assert.doesNotMatch(visibleSummary, /zero-emission heat pumps/i);
	});

	it("keeps the wind and solar lifecycle claim bounded to greenhouse gas evidence", () => {
		const slug = "do-wind-and-solar-power-have-lower-lifecycle-greenhouse-gas-emissions-than-fossil-fuel-electricity";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing wind and solar lifecycle claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.misconceptions,
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(visibleSummary, /43 g CO2e\/kWh for solar photovoltaics/);
		assert.match(visibleSummary, /13 for wind/);
		assert.match(visibleSummary, /486 for natural gas/);
		assert.match(visibleSummary, /1001 for coal/);
		assert.match(visibleSummary, /not literally zero-emission/);
		assert.match(visibleSummary, /coal and natural gas power without carbon capture/);
		assert.match(visibleSummary, /land use, wildlife, mining, reliability, cost, siting, or local consent/);
		assert.doesNotMatch(visibleSummary, /zero lifecycle emissions/i);
		assert.doesNotMatch(visibleSummary, /solves all energy/i);
		assert.doesNotMatch(visibleSummary, /\bunabated\b/i);
		assert.doesNotMatch(visibleSummary, /accounting boundary/i);
	});

	it("keeps the carbon monoxide alarm claim clear for household readers", () => {
		const slug = "do-carbon-monoxide-alarms-reduce-poisoning-risk";
		const claim = defaultClaims.find(entry => entry.slug === slug);
		assert.ok(claim, "Missing carbon monoxide alarm claim seed");

		const visibleSummary = [
			claim.bottomLine,
			claim.editorSummary,
			claim.uncertaintySummary,
			...claim.stableCore,
			...claim.openQuestions,
			...claim.exclusionRules,
			...claim.evidenceSummaries.flatMap(summary => [summary.finding, summary.magnitude, ...summary.limitations]),
			...claim.institutionalAnchors.map(anchor => anchor.role),
			...claim.sources.map(source => source.note)
		].join(" ");

		assert.match(claim.bottomLine, /only as a warning layer/);
		assert.match(visibleSummary, /carbon monoxide alarms near every sleeping area/);
		assert.match(visibleSummary, /studies of alarm laws and death rates are mixed/);
		assert.match(visibleSummary, /steps that stop CO from building up/);
		assert.doesNotMatch(visibleSummary, /law-level/i);
		assert.doesNotMatch(visibleSummary, /source-control/i);
		assert.doesNotMatch(visibleSummary, /detection bias/i);
		assert.doesNotMatch(visibleSummary, /confounding/i);
		assert.doesNotMatch(visibleSummary, /CO detector/i);
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
