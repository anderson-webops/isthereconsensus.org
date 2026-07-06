import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

const layoutFiles = ["src/layouts/default.vue", "src/layouts/home.vue"];

describe("theme controls", () => {
	for (const file of layoutFiles) {
		it(`keeps the palette switcher next to the compact color-mode toggle in the header in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const paletteImportIndex = source.indexOf('import PaletteSwitcher from "~/components/PaletteSwitcher.vue"');
			const themeImportIndex = source.indexOf('import ThemeToggle from "~/components/ThemeToggle.vue"');
			const paletteRenderIndex = source.indexOf("<PaletteSwitcher />");
			const themeRenderIndex = source.indexOf("<ThemeToggle />");

			assert.notEqual(paletteImportIndex, -1);
			assert.notEqual(themeImportIndex, -1);
			assert.notEqual(paletteRenderIndex, -1);
			assert.notEqual(themeRenderIndex, -1);
			assert.ok(paletteRenderIndex < themeRenderIndex);
			assert.match(
				source,
				/class="site-header__controls" aria-label="Appearance controls"[\s\S]*<PaletteSwitcher \/>\s*<ThemeToggle \/>/
			);
			assert.doesNotMatch(source, /site-footer__appearance/);
		});

		it(`keeps the footer focused on support and policy links in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const footerStart = source.indexOf('<footer class="site-footer">');
			const footer = source.slice(footerStart);

			assert.notEqual(footerStart, -1);
			assert.match(footer, /to="\/corrections"[\s\S]*Corrections/);
			assert.match(footer, /to="\/community-guidelines"[\s\S]*Guidelines/);
			assert.match(footer, /to="\/terms"[\s\S]*Terms/);
			assert.match(footer, /to="\/privacy"[\s\S]*Privacy/);
			assert.match(footer, /&copy; \{\{ year \}\} Is There Consensus\?/);
			assert.doesNotMatch(footer, /Browse topics|Ask a question|Explainers|How reviews work/);
			assert.doesNotMatch(footer, /PaletteSwitcher|ThemeToggle/);
		});

		it(`keeps mobile appearance controls beside the brand without adding a footer control row in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");

			assert.match(
				source,
				/@media \(max-width: 700px\) \{[\s\S]*\.site-header \{[\s\S]*grid-template-columns: minmax\(0, 1fr\) auto;/
			);
			assert.match(
				source,
				/@media \(max-width: 700px\) \{[\s\S]*\.site-header__actions \{[\s\S]*display: contents;/
			);
			assert.match(
				source,
				/@media \(max-width: 700px\) \{[\s\S]*\.site-header__controls \{[\s\S]*grid-column: 2;/
			);
			assert.match(
				source,
				/@media \(max-width: 700px\) \{[\s\S]*\.site-nav \{[\s\S]*grid-column: 1 \/ -1;[\s\S]*flex-wrap: wrap;/
			);
			assert.match(source, /@media \(max-width: 480px\) \{[\s\S]*\.site-brand__tag \{[\s\S]*display: none;/);
			assert.doesNotMatch(source, /site-footer__appearance/);
		});
	}

	it("keeps the restored green, blue, and warm background palettes", () => {
		const source = readFileSync(join(testDir, "..", "src/components/PaletteSwitcher.vue"), "utf8");
		const appSource = readFileSync(join(testDir, "..", "src/app.vue"), "utf8");

		assert.match(source, /type PaletteValue = "green" \| "blue" \| "warm"/);
		assert.match(source, /label: "Green", value: "green"/);
		assert.match(source, /label: "Blue", value: "blue"/);
		assert.match(source, /label: "Warm", value: "warm"/);
		assert.match(source, /document\.documentElement\.dataset\.consensusPalette = value/);
		assert.match(appSource, /:root\[data-consensus-palette="blue"\]/);
		assert.match(appSource, /:root\[data-consensus-palette="warm"\]/);
		assert.match(appSource, /--consensus-page-background/);
	});

	it("keeps the light and dark toggle visually compact", () => {
		const source = readFileSync(join(testDir, "..", "src/components/ThemeToggle.vue"), "utf8");

		assert.match(source, /\.theme-toggle \{[\s\S]*width: 42px;[\s\S]*height: 42px;/);
		assert.match(source, /const toggleLabel = computed/);
		assert.match(source, /:aria-label="toggleLabel"/);
	});
});
