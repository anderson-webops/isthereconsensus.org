import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));

const layoutFiles = ["src/layouts/default.vue", "src/layouts/home.vue"];

describe("theme controls", () => {
	for (const file of layoutFiles) {
		it(`keeps the palette switcher next to the compact color-mode toggle in ${file}`, () => {
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
			assert.match(source, /class="site-header__controls"[\s\S]*<PaletteSwitcher \/>\s*<ThemeToggle \/>/);
		});
	}

	it("keeps the restored green, blue, and warm background palettes", () => {
		const source = readFileSync(join(testDir, "..", "src/components/PaletteSwitcher.vue"), "utf8");

		assert.match(source, /type PaletteValue = "green" \| "blue" \| "warm"/);
		assert.match(source, /label: "Green", value: "green"/);
		assert.match(source, /label: "Blue", value: "blue"/);
		assert.match(source, /label: "Warm", value: "warm"/);
		assert.match(source, /document\.documentElement\.dataset\.consensusPalette = value/);
	});

	it("keeps the light and dark toggle visually compact", () => {
		const source = readFileSync(join(testDir, "..", "src/components/ThemeToggle.vue"), "utf8");

		assert.match(source, /\.theme-toggle \{[\s\S]*width: 42px;[\s\S]*height: 42px;/);
	});
});
