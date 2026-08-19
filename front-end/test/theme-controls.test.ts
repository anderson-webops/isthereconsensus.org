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
			const headerControlsIndex = source.indexOf(
				'class="site-header__controls" aria-label="Appearance controls"'
			);
			const paletteRenderIndex = source.indexOf("<PaletteSwitcher />");
			const themeRenderIndex = source.indexOf("<ThemeToggle />");

			assert.match(source, /import PaletteSwitcher from "~\/components\/PaletteSwitcher\.vue"/);
			assert.match(source, /import ThemeToggle from "~\/components\/ThemeToggle\.vue"/);
			assert.ok(headerControlsIndex >= 0);
			assert.ok(paletteRenderIndex > headerControlsIndex);
			assert.ok(themeRenderIndex > paletteRenderIndex);
			assert.doesNotMatch(source, /site-footer__appearance/);
		});

		it(`keeps first-time navigation focused while preserving utility links in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const headerStart = source.indexOf('<header class="site-header">');
			const headerEnd = source.indexOf("</header>", headerStart);
			const header = source.slice(headerStart, headerEnd);
			const footer = source.slice(source.indexOf('<footer class="site-footer">'));

			assert.match(header, /to="\/consensus"[\s\S]*Browse/);
			assert.match(header, /to="\/explainers"[\s\S]*Explainers/);
			assert.match(header, /to="\/ask"[\s\S]*Ask/);
			assert.doesNotMatch(header, /<NuxtLink to="\/">Home<\/NuxtLink>/);
			assert.doesNotMatch(header, /to="\/standards"|to="\/account">Account/);
			assert.match(footer, /to="\/standards"[\s\S]*How reviews work/);
			assert.match(footer, /to="\/account"[\s\S]*Account/);
			assert.match(footer, /to="\/corrections"[\s\S]*Corrections/);
			assert.match(footer, /to="\/privacy"[\s\S]*Privacy/);
			assert.match(footer, /to="\/terms"[\s\S]*Terms/);
		});

		it(`keeps the header controls usable on mobile in ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");

			assert.match(
				source,
				/@media \(max-width: 700px\) \{[\s\S]*\.site-header__actions \{[\s\S]*justify-content: space-between;/
			);
			assert.match(source, /@media \(max-width: 360px\) \{[\s\S]*flex-direction: column;/);
			assert.match(
				source,
				/\.site-header__controls :deep\(\.theme-toggle\) \{[\s\S]*width: 34px;[\s\S]*height: 34px;/
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
		assert.match(source, /const toggleLabel = computed/);
		assert.match(source, /:aria-label="toggleLabel"/);
	});
});
