import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const sourceDir = join(dirname(fileURLToPath(import.meta.url)), "..", "src");
const readSource = (path: string) => readFileSync(join(sourceDir, path), "utf8");

describe("public website copy", () => {
	it("keeps shared branding concise without removing navigation or appearance controls", () => {
		for (const layout of ["default", "home"]) {
			const source = readSource(`layouts/${layout}.vue`);
			assert.doesNotMatch(source, /site-brand__tag|site-footer__description/);
			assert.match(source, /site-brand__name">Is There Consensus\?/);
			assert.match(source, /aria-label="Primary"/);
			assert.match(source, /aria-label="Support and policy"/);
			assert.match(source, /aria-label="Appearance controls"/);
			assert.match(source, /<PaletteSwitcher \/>/);
			assert.match(source, /<ThemeToggle \/>/);
		}
	});

	it("uses descriptive directory headings without stacked introductions", () => {
		const pages = [
			["consensus/index.vue", "Browse topics"],
			["explainers/index.vue", "Explainers"],
			["guides/index.vue", "Reading guides"],
			["compare/index.vue", "Evidence comparisons"],
			["roadmap/index.vue", "Coverage roadmap"],
			["misconceptions.vue", "Common misconceptions"],
			["source-standards.vue", "Topic sourcing notes"],
			["account-deletion-and-retention.vue", "Account deletion and retention"],
			["copyright-and-trademark.vue", "Copyright and trademark complaints"]
		];
		for (const [path, heading] of pages) {
			const source = readSource(`pages/${path}`);
			const header = source.match(/<header\b[^>]*>([\s\S]*?)<\/header>/)?.[1] ?? "";
			assert.ok(header.includes(`<h1>${heading}</h1>`), path);
			assert.doesNotMatch(
				header,
				/class="eyebrow"|Use this reference|Use this lane|Use this request-based process/
			);
		}
	});

	it("retains consequential privacy and storage disclosures", () => {
		const roadmap = readSource("pages/roadmap/index.vue");
		assert.match(roadmap, /Only separately approved summaries appear here/);
		assert.match(roadmap, /Private suggestions stay private/);
		assert.match(roadmap, /requests never\s+determine a scientific conclusion/);
		const library = readSource("pages/library.vue");
		assert.match(library, /Saved only in this browser\. Clearing site data removes these selections/);
		assert.match(library, /Anyone using this browser\s+profile can see them/);
		assert.match(library, /No\s+email notifications/);
	});

	it("preserves related-reading destinations without promotional callouts", () => {
		const explainers = readSource("pages/explainers/index.vue");
		assert.match(explainers, /aria-label="Related reading"/);
		assert.match(explainers, /to="\/consensus">Browse claim reviews/);
		assert.doesNotMatch(explainers, /See these concepts in context/);
		const misconceptions = readSource("pages/misconceptions.vue");
		assert.match(misconceptions, /to="\/explainers">Evergreen explainers/);
		assert.match(misconceptions, /to="\/consensus">Browse claim reviews/);
		assert.doesNotMatch(misconceptions, /Use the right correction, then return to the claim|The goal is to stop/);
	});
});
