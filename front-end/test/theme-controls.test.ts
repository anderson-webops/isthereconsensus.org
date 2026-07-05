import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

const layoutFiles = ["src/layouts/default.vue", "src/layouts/home.vue"];

describe("theme controls", () => {
	for (const file of layoutFiles) {
		it(`keeps the compact appearance controls in the footer in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const paletteImportIndex = source.indexOf('import PaletteSwitcher from "~/components/PaletteSwitcher.vue"');
			const themeImportIndex = source.indexOf('import ThemeToggle from "~/components/ThemeToggle.vue"');
			const headerStart = source.indexOf('<header class="site-header">');
			const mainStart = source.indexOf('<main class="site-main">');
			const header = source.slice(headerStart, mainStart);
			const footerStart = source.indexOf('<footer class="site-footer">');
			const footer = source.slice(footerStart);
			const paletteRenderIndex = source.indexOf("<PaletteSwitcher />");
			const themeRenderIndex = source.indexOf("<ThemeToggle />");

			assert.notEqual(paletteImportIndex, -1);
			assert.notEqual(themeImportIndex, -1);
			assert.notEqual(headerStart, -1);
			assert.notEqual(mainStart, -1);
			assert.notEqual(footerStart, -1);
			assert.notEqual(paletteRenderIndex, -1);
			assert.notEqual(themeRenderIndex, -1);
			assert.ok(paletteRenderIndex < themeRenderIndex);
			assert.doesNotMatch(header, /PaletteSwitcher|ThemeToggle|site-header__controls/);
			assert.match(
				footer,
				/<ClientOnly>[\s\S]*class="site-footer__appearance" aria-label="Appearance controls"[\s\S]*<PaletteSwitcher \/>\s*<span class="site-footer__appearance-divider" aria-hidden="true" \/>\s*<ThemeToggle \/>/
			);
			assert.match(footer, /site-footer__appearance-fallback/);
			assert.doesNotMatch(footer, /site-footer__appearance-label|>Appearance</);
		});

		it(`keeps the footer focused on essential support and policy links in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const footerStart = source.indexOf('<footer class="site-footer">');
			const footer = source.slice(footerStart);

			assert.notEqual(footerStart, -1);
			assert.match(footer, /to="\/corrections"[\s\S]*Corrections/);
			assert.match(footer, /to="\/terms"[\s\S]*Terms/);
			assert.match(footer, /to="\/privacy"[\s\S]*Privacy/);
			assert.doesNotMatch(
				footer,
				/Browse topics|Ask a question|Explainers|How reviews work|Account|Editorial|Guidelines/
			);
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
	});
});
