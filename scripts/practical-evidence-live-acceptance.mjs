import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { practicalEvidenceClaims } from "../back-end/src/data/claim-expansion-practical-evidence.ts";
import { evidenceComparisons } from "../back-end/src/data/comparisons/index.ts";
import { estimateForSelection, findingForSelection, formatComparisonEstimate } from "../front-end/src/utils/evidence-comparison.ts";

// Read-only acceptance of the exact source release. Run from a checkout of the
// expected commit: node --import tsx scripts/practical-evidence-live-acceptance.mjs COMMIT TAG
const [commit, ref] = process.argv.slice(2);
assert.match(commit || "", /^[a-f0-9]{40}$/);
assert.match(ref || "", /^v1\.\d+\.\d+$/);
const repository = fileURLToPath(new URL("../", import.meta.url));
assert.equal(execFileSync("git", ["rev-parse", "HEAD"], { cwd: repository, encoding: "utf8" }).trim(), commit, "Check out the expected release commit first");
execFileSync("git", ["diff", "--quiet", "HEAD", "--", "back-end/src/data", "front-end/src/data", "front-end/src/utils/evidence-comparison.ts", "scripts/practical-evidence-live-acceptance.mjs"], { cwd: repository });
assert.ok(evidenceComparisons.length >= 12);
assert.ok(practicalEvidenceClaims.length >= 50);
const base = "https://isthereconsensus.org";
const escape = value => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
async function get(path) {
	const response = await fetch(base + path, { redirect: "error", signal: AbortSignal.timeout(20_000) });
	assert.equal(response.status, 200, path);
	return response;
}
let acceptedBuild;
async function identity() {
	const data = await (await get("/deployment.json")).json();
	assert.equal(data.commit, commit);
	assert.equal(data.ref, ref);
	assert.ok(data.buildId);
	if (acceptedBuild) assert.equal(data.buildId, acceptedBuild, "Release changed during acceptance");
	acceptedBuild = data.buildId;
	console.log(JSON.stringify({ identity: data }));
}
await identity();
await get("/healthz");
await get("/readyz");
const count = (await (await get("/api/claims?limit=1")).json()).pagination.total;
assert.ok(count >= 750 + practicalEvidenceClaims.length);
const sitemap = await (await get("/sitemap.xml")).text();
for (const comparison of evidenceComparisons) {
	const path = `/compare/${comparison.slug}`;
	for (const context of comparison.contexts) {
		for (const outcome of comparison.outcomes) {
			const html = await (await get(`${path}?context=${context.id}&outcome=${outcome.id}`)).text();
			const cards = html.match(/<section\b[^>]*class="comparison-option"[^>]*>[\s\S]*?<\/section>/g) || [];
			assert.equal(cards.length, comparison.options.length, `${path}: card count`);
			for (const [index, option] of comparison.options.entries()) {
				const card = cards[index];
				assert.ok(card.includes(escape(option.label)), `${path}/${option.id}: label`);
				const estimate = estimateForSelection(option, outcome, context);
				const finding = findingForSelection(option, outcome, context);
				if (estimate) {
					const value = card.match(/<p\b[^>]*class="comparison-value"[^>]*>([\s\S]*?)<\/p>/)?.[1]?.trim();
					assert.equal(value, escape(formatComparisonEstimate(estimate)), `${path}/${context.id}/${outcome.id}/${option.id}: value`);
					assert.ok(card.includes(escape(outcome.unit)));
					if (estimate.interpretation) assert.ok(card.includes(escape(estimate.interpretation)));
					if (estimate.uncertainty) {
						for (const key of ["metric", "estimate", "lower", "upper"]) assert.ok(card.includes(escape(String(estimate.uncertainty[key]))));
					}
				} else if (finding) {
					assert.ok(!card.includes('class="comparison-value"'));
					for (const key of ["headline", "summary", "evidence", "scope", "limitation"]) assert.ok(card.includes(escape(finding[key])), `${path}/${context.id}/${outcome.id}/${option.id}/${key}`);
				} else {
					assert.ok(card.includes('class="comparison-unavailable"'));
					assert.ok(!card.includes('class="comparison-value"'));
					assert.ok(!card.includes('class="comparison-finding"'));
					assert.ok(!card.includes('class="comparison-source-link"'));
				}
				for (const id of estimate?.sourceIds || finding?.sourceIds || []) assert.ok(card.includes(`href="#comparison-source-${id}"`));
			}
		}
	}
	const guide = await (await get(comparison.guidePath)).text();
	assert.ok(guide.includes(`href="${path}"`));
	for (const route of [path, comparison.guidePath, ...comparison.reviews.map(review => review.path)]) assert.ok(sitemap.includes(`<loc>${base}${route}</loc>`), route);
	console.log(`Verified all contexts and outcomes: ${path}`);
}
for (const expected of practicalEvidenceClaims) {
	const path = `/api/topics/${expected.topicSlug}/claims/${expected.slug}`;
	const actual = (await (await get(path)).json()).claim;
	for (const key of ["title", "bottomLine", "stableCore", "uncertaintySummary", "reviewerLine", "coiSummary"]) {
		if (expected[key] !== undefined) assert.deepEqual(actual[key], expected[key], `${expected.slug}/${key}`);
	}
	for (const source of expected.sources) {
		const received = actual.sources.find(item => item.title === source.title);
		assert.ok(received, `${expected.slug}: source ${source.title}`);
		for (const key of ["url", "note", "doi", "citationStatus"]) {
			if (source[key] !== undefined) assert.equal(received[key], source[key], `${expected.slug}/${source.title}/${key}`);
		}
	}
}
const topics = (await (await get("/api/topics")).json()).topics;
assert.ok(topics.length >= 36);
let reviews = 0;
for (const topic of topics) {
	assert.ok(sitemap.includes(`<loc>${base}/consensus/${topic.slug}</loc>`));
	const claims = (await (await get(`/api/topics/${topic.slug}/claims`)).json()).claims;
	for (const claim of claims) {
		assert.ok(sitemap.includes(`<loc>${base}/consensus/${topic.slug}/${claim.slug}</loc>`), `Missing sitemap review: ${claim.slug}`);
		reviews++;
	}
}
assert.equal(reviews, count, "Topic listings and catalog count disagree");
await identity();
console.log(JSON.stringify({ passed: true, comparisons: evidenceComparisons.length, newReviews: practicalEvidenceClaims.length, totalReviews: count, sitemapTopics: topics.length, sitemapReviews: reviews }));
