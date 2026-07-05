import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

const layoutFiles = ["src/layouts/default.vue", "src/layouts/home.vue"];

describe("theme controls", () => {
	for (const file of layoutFiles) {
		it(`keeps the palette switcher next to the compact color-mode toggle in the footer in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const paletteImportIndex = source.indexOf('import PaletteSwitcher from "~/components/PaletteSwitcher.vue"');
			const themeImportIndex = source.indexOf('import ThemeToggle from "~/components/ThemeToggle.vue"');
			const footerControlsIndex = source.indexOf(
				'class="site-footer__appearance" aria-label="Appearance controls"'
			);
			const paletteRenderIndex = source.indexOf("<PaletteSwitcher />");
			const themeRenderIndex = source.indexOf("<ThemeToggle />");

			assert.notEqual(paletteImportIndex, -1);
			assert.notEqual(themeImportIndex, -1);
			assert.notEqual(footerControlsIndex, -1);
			assert.notEqual(paletteRenderIndex, -1);
			assert.notEqual(themeRenderIndex, -1);
			assert.ok(footerControlsIndex < paletteRenderIndex);
			assert.ok(paletteRenderIndex < themeRenderIndex);
			assert.match(
				source,
				/class="site-footer__appearance" aria-label="Appearance controls"[\s\S]*i-carbon-color-palette[\s\S]*Theme[\s\S]*<PaletteSwitcher \/>\s*<ThemeToggle \/>/
			);
			assert.doesNotMatch(source, /site-header__controls/);
		});

		it(`keeps the footer focused on brand, appearance, and utility links in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const footerStart = source.indexOf('<footer class="site-footer">');
			const footer = source.slice(footerStart);

			assert.notEqual(footerStart, -1);
			assert.match(footer, /Appearance controls/);
			assert.match(footer, /i-carbon-color-palette/);
			assert.match(footer, />Theme</);
			assert.match(footer, /PaletteSwitcher/);
			assert.match(footer, /ThemeToggle/);
			assert.match(footer, /to="\/corrections"[\s\S]*Corrections/);
			assert.match(footer, /to="\/privacy"[\s\S]*Privacy/);
			assert.match(footer, /to="\/terms"[\s\S]*Terms/);
			assert.match(footer, /&copy; \{\{ year \}\} Is There Consensus\?/);
			assert.doesNotMatch(footer, /Browse topics|Ask a question|Explainers|How reviews work/);
			assert.doesNotMatch(footer, /community-guidelines|Guidelines/);
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
