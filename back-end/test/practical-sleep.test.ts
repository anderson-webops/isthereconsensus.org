import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	insomniaSources,
	sleepPracticalClaims,
	sleepPracticalGaps
} from "../src/data/claim-expansion-practical-sleep.js";
import { defaultClaims } from "../src/data/claims.js";
import { evidenceComparisons } from "../src/data/comparisons/index.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

describe("practical insomnia evidence", () => {
	it("adds five distinct canonical questions and connects every one to the comparison", () => {
		assert.equal(sleepPracticalClaims.length, 5);
		assert.equal(sleepPracticalGaps.length, 5);
		const comparison = evidenceComparisons.find(item => item.slug === "non-drug-insomnia-treatments")!;
		for (const claim of sleepPracticalClaims) {
			assert.equal(defaultClaims.filter(item => item.slug === claim.slug).length, 1);
			assert.ok(
				comparison.reviews.some(review => review.path === `/consensus/${claim.topicSlug}/${claim.slug}`)
			);
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.appraisalTools!.join(" "), /no formal GRADE/);
			assert.ok(claim.sources.every(source => source.appraisal === "not_appraised"));
		}
	});

	it("keeps the corrected brief-treatment record and follow-up limits visible", () => {
		assert.equal(insomniaSources.brief.citationStatus, "corrected");
		assert.ok(
			insomniaSources.brief.statusSources!.includes(
				"https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/2735979"
			)
		);
		assert.match(insomniaSources.brief.note, /SD to SE/);
		const claim = sleepPracticalClaims[0]!;
		assert.match(claim.evidenceSummaries![0]!.finding, /67% versus 25%.*55% versus 13%/);
		assert.match(claim.uncertaintySummary!, /Selected responder follow-up cannot establish comparative durability/);
	});

	it("preserves component estimates as conditional odds ratios, not absolute benefits or proof of harm", () => {
		assert.match(sleepPracticalClaims[1]!.evidenceSummaries![0]!.magnitude!, /1\.43 \(95% CI 1\.00 to 2\.05\)/);
		assert.match(sleepPracticalClaims[2]!.evidenceSummaries![0]!.magnitude!, /0\.81 \(95% CI 0\.64 to 1\.02\)/);
		assert.match(sleepPracticalClaims[2]!.bottomLine, /does not prove relaxation harms sleep/);
		assert.match(insomniaSources.components.note, /no component interactions/);
	});

	it("keeps the direct non-inferiority margin, orientation and uncertainty together", () => {
		const claim = sleepPracticalClaims[3]!;
		assert.match(
			claim.evidenceSummaries![0]!.magnitude!,
			/Face-to-face minus digital ISI: −2\.8 points \(95% CI −4\.8 to −0\.8\)/
		);
		assert.match(claim.evidenceSummaries![0]!.magnitude!, /margin −2 points/);
		assert.match(claim.bottomLine, /did not demonstrate digital non-inferiority/);
		assert.match(claim.uncertaintySummary!, /one program and one Norwegian clinical service/);
	});

	it("does not erase early safety signals or mislabel the later trial's odds ratio", () => {
		const claim = sleepPracticalClaims[4]!;
		assert.match(claim.evidenceSummaries![0]!.population, /16 patients.*uncontrolled/);
		assert.match(claim.evidenceSummaries![1]!.population, /150 postmenopausal women/);
		assert.match(
			claim.evidenceSummaries![1]!.magnitude!,
			/0\.94 \(95% CI 0\.13 to 6\.96\), not a between-treatment relative risk/
		);
		assert.match(claim.bottomLine, /reassuring end-of-treatment findings do not settle the first few days/);
		assert.match(claim.misconceptions.join(" "), /Do not drive/);
	});

	it("retrieves each question through the existing canonical search", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		for (const [index, query] of [
			"brief behavioral insomnia",
			"stimulus control insomnia",
			"relaxation essential insomnia",
			"automated digital CBT-I face-to-face",
			"sleep restriction daytime sleepiness"
		].entries()) {
			assert.ok(
				search(query).some(result => result.claim.slug === sleepPracticalClaims[index]!.slug),
				query
			);
		}
	});
});
