import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildPublicAtlasCollections, getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { economicsCheckedAt, readerEconomicsClaims, readerEconomicsGaps, readerEconomicsSlugs, readerEconomicsSources } from "../src/data/claim-expansion-reader-economics.js";
import { readerExpansionClaims } from "../src/data/claim-expansion-reader.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: string) => readerEconomicsClaims.find(claim => claim.slug === readerEconomicsSlugs[key])!;
const textFor = (key: string) => [claimFor(key).bottomLine, ...claimFor(key).stableCore, claimFor(key).editorSummary].join(" ");
const closeTo = (actual: number, expected: number) => assert.ok(Math.abs(actual - expected) < 1e-9);

describe("economic measurement expansion", () => {
	it("adds eighteen distinct canonical reviews and reaches the controlling source target without recounting old reviews", () => {
		assert.equal(readerEconomicsClaims.length, 18);
		for (const field of ["slug", "title", "bottomLine"] as const) assert.equal(new Set(readerEconomicsClaims.map(claim => claim[field])).size, 18);
		assert.deepEqual(readerEconomicsGaps.map(gap => gap.slug), readerEconomicsClaims.map(claim => claim.slug));
		assert.ok(defaultClaims.length >= 1001);
		assert.equal(new Set(defaultClaims.map(claim => `${claim.topicSlug}/${claim.slug}`)).size, defaultClaims.length);
		assert.ok(readerExpansionClaims.length >= 201);
		assert.equal(defaultClaims.filter(claim => !readerExpansionClaims.some(addition => addition.slug === claim.slug)).length, 800);
		for (const claim of readerEconomicsClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.topicSlug, "economics-and-social-policy");
			assert.ok([claim.bottomLine, ...claim.stableCore, claim.editorSummary].join(" ").split(/\s+/).length >= 280);
			assert.equal(claim.searchCutoffAt, economicsCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, economicsCheckedAt);
			assert.match(claim.readerAnnouncement!.id, /^ecb1f520-79c6-49bf-9b6b-0cd6dc6a00\d\d$/);
		}
		assert.equal(new Set(readerEconomicsClaims.map(claim => claim.readerAnnouncement!.id)).size, 18);
		assert.ok(Date.parse(economicsCheckedAt) <= Date.now());
	});

	it("validates seventeen original technical references without inventing current observations or expert review", async () => {
		assert.equal(Object.keys(readerEconomicsSources).length, 17);
		for (const claim of readerEconomicsClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.match(claim.coiSummary!, /institutional incentives/);
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
			assert.ok(claim.sources.length >= 2);
			for (const entry of claim.sources) {
				const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
				await source.validate();
				assert.equal(source.kind, "technical_reference");
				assert.equal(source.appraisal, "not_appraised");
				assert.equal(source.evidenceProfile.studyDesign, "not_coded");
				assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
				assert.equal(source.citationCheckedAt!.toISOString(), economicsCheckedAt);
				assert.ok(source.statusSources.includes(entry.url!));
			}
		}
		assert.equal(readerEconomicsSources.annual.year, 2006);
		assert.equal(readerEconomicsSources.disinflation.year, 2024);
		assert.equal(readerEconomicsSources.welfare.year, undefined);
		assert.ok(Object.values(readerEconomicsSources).every(source => !source.url!.includes("consensus.app")));
	});

	it("independently checks price-level compounding, household weights, rebasing and exact real-pay ratios", () => {
		closeTo(100 * 1.06 * 1.03, 109.18);
		closeTo(100 * (109.18 / 106 - 1), 3);
		closeTo(0.5 * 10 + 0.5 * 0, 5);
		closeTo(0.2 * 10 + 0.8 * 0, 2);
		closeTo(210 / 200, 105 / 100);
		closeTo(100 * (1.05 / 1.06 - 1), -0.9433962264151);
		assert.notEqual(100 * (1.05 / 1.06 - 1), 5 - 6);
		assert.match(textFor("disinflation"), /monthly decline can coexist/);
		assert.match(textFor("personalBasket"), /not BLS's actual weights/);
		assert.match(textFor("basePeriod"), /Rebasing cannot solve/);
		assert.match(textFor("realPay"), /exact standard of living.*not adopted/);
	});

	it("preserves shelter-service, seasonal, interval and vintage limits", () => {
		assert.match(textFor("housing"), /rather than every asset-purchase cost or each owner's mortgage payment/);
		assert.match(textFor("housing"), /does not imply that housing is absent/);
		assert.match(textFor("seasonal"), /Multiplying a monthly rate by twelve does not generally/);
		assert.match(textFor("seasonal"), /not stripped of every irregular shock/);
		assert.match(readerEconomicsSources.personal.note, /December 2001/);
		assert.match(readerEconomicsSources.seasonal.note, /funding-lapse procedures/);
	});

	it("checks labor-force exits, distinct broader denominators and jobs-versus-people counterexamples", () => {
		assert.equal(100 * 6 / (54 + 6), 10);
		assert.equal(100 - 54, 46);
		closeTo(100 * 4 / (54 + 4), 6.896551724137931);
		closeTo(100 * (6 + 2 + 4) / (60 + 2), 19.35483870967742);
		assert.notEqual(100 * 12 / 62, 100 * 12 / 60);
		const coveredJobs = [{ person: "worker-one", job: "position-one" }, { person: "worker-one", job: "position-two" }];
		assert.equal(coveredJobs.length, 2);
		assert.equal(new Set(coveredJobs.map(job => job.person)).size, 1);
		assert.match(textFor("unemployedShare"), /temporary-layoff/);
		assert.match(textFor("fallingUnemployment"), /not always discouragement/);
		assert.match(textFor("underutilization"), /not a count of every preference/);
		assert.match(textFor("surveyConflict"), /not a blanket guarantee/);
	});

	it("checks nominal output and compounded annualization without turning a convention into a forecast", () => {
		assert.equal(10 * 8, 80);
		assert.equal(10 * 10, 100);
		assert.equal(100 * (100 / 80 - 1), 25);
		const quarterFactor = 101 / 100;
		const annualRate = 100 * (quarterFactor ** 4 - 1);
		closeTo(annualRate, 4.060401);
		closeTo((1 + annualRate / 100) ** 0.25, quarterFactor);
		assert.notEqual(annualRate, 4);
		assert.match(textFor("nominalGdp"), /CPI is not automatically/);
		assert.match(textFor("annualGdp"), /neither an observed full-year result nor a forecast/);
		assert.match(textFor("annualGdp"), /inconsistent rounded comparison/);
	});

	it("checks value-added and imported-content arithmetic without inferring a trade-policy counterfactual", () => {
		assert.equal(4 + 7 + 12, 23);
		assert.equal(4 + (7 - 4) + (12 - 7), 12);
		assert.equal(100 - 80, 20);
		assert.match(textFor("valueAdded"), /Investment goods.*different accounting role/);
		assert.match(textFor("imports"), /not automatically a feasible counterfactual/);
		assert.match(textFor("imports"), /does not prove that imports never affect/);
	});

	it("independently checks Fisher nonadditivity while retaining reference-period and welfare/PPP boundaries", () => {
		const previousPrices = [1, 1];
		const currentPrices = [1, 2];
		const previousQuantities = [10, 10];
		const currentQuantities = [20, 5];
		const valueAt = (prices: number[], quantities: number[]) => prices.reduce((total, price, index) => total + price * quantities[index]!, 0);
		const previousValue = valueAt(previousPrices, previousQuantities);
		const laspeyres = valueAt(previousPrices, currentQuantities) / previousValue;
		const paasche = valueAt(currentPrices, currentQuantities) / valueAt(currentPrices, previousQuantities);
		const aggregate = previousValue * Math.sqrt(laspeyres * paasche);
		closeTo(aggregate, 22.360679774997898);
		assert.equal(valueAt(previousPrices, currentQuantities), 25);
		assert.notEqual(aggregate, 25);
		assert.match(textFor("chainAdd"), /reference-period exception/);
		assert.match(textFor("chainAdd"), /Current-dollar accounting remains/);
		assert.match(textFor("perCapita"), /not a median paycheck/);
		assert.match(textFor("pppForecast"), /separate assumptions and evidence/);
		assert.match(textFor("pppForecast"), /not.*profitable trade/);
	});

	it("preserves all twenty existing memberships, hides unpublished groups and retrieves diagnostic queries without tuning the ranker", () => {
		const newSlugs = new Set(readerEconomicsClaims.map(claim => claim.slug));
		const existing = defaultClaims.filter(claim => claim.topicSlug === "economics-and-social-policy" && !newSlugs.has(claim.slug));
		assert.equal(existing.length, 20);
		const oldGroups = ["work-wages-leave-and-care", "cash-poverty-and-child-development", "housing-supply-stability-and-rents", "markets-prices-and-public-externalities"];
		for (const claim of existing) {
			const memberships = getAtlasCollectionMemberships(claim.topicSlug, claim.slug);
			assert.equal(memberships.length, 1);
			assert.ok(oldGroups.includes(memberships[0]!.slug));
		}
		assert.deepEqual(buildPublicAtlasCollections("economics-and-social-policy", existing.map(claim => claim.slug)).map(group => group.slug), oldGroups);
		const groups = {
			"prices-baskets-and-real-income": ["disinflation", "personalBasket", "housing", "basePeriod", "realPay", "seasonal"],
			"employment-units-and-denominators": ["unemployedShare", "fallingUnemployment", "payrollPeople", "surveyConflict", "underutilization"],
			"national-output-and-growth-accounting": ["nominalGdp", "annualGdp", "valueAdded", "imports", "chainAdd"],
			"per-person-and-international-comparisons": ["perCapita", "pppForecast"]
		};
		assert.equal(Object.values(groups).flat().length, 18);
		for (const [group, keys] of Object.entries(groups)) {
			for (const key of keys) assert.deepEqual(getAtlasCollectionMemberships("economics-and-social-policy", readerEconomicsSlugs[key]!).map(membership => membership.slug), [group]);
		}
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = { disinflation: "falling inflation prices", personalBasket: "household CPI inflation", housing: "CPI buying home", basePeriod: "CPI reference bases", realPay: "pay rise purchasing power", seasonal: "seasonally adjusted inflation", unemployedShare: "unemployment everyone without job", fallingUnemployment: "falling unemployment found work", payrollPeople: "payroll jobs employed people", surveyConflict: "household payroll surveys disagreement", underutilization: "unemployment wants more work", nominalGdp: "nominal GDP goods produced", annualGdp: "annualized quarterly GDP growth", valueAdded: "GDP every sale production", imports: "subtract imports domestic output", chainAdd: "chained dollar GDP components", perCapita: "GDP per capita income wellbeing", pppForecast: "purchasing power parity exchange rate" };
		for (const [key, query] of Object.entries(queries)) assert.ok(search(query).some(result => result.claim.slug === readerEconomicsSlugs[key]), query);
	});
});
