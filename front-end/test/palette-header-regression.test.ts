import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const layoutFiles = ["src/layouts/default.vue", "src/layouts/home.vue"] as const;

describe("palette footer regression guard", () => {
	for (const file of layoutFiles) {
		it(`keeps background palette controls in the footer for ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const headerControls = source.indexOf('class="site-header__controls" aria-label="Appearance controls"');
			const footerControls = source.indexOf('class="site-footer__appearance" aria-label="Appearance controls"');
			const paletteRender = source.indexOf("<PaletteSwitcher />");
			const themeRender = source.indexOf("<ThemeToggle />");

			assert.equal(headerControls, -1, `${file} should not duplicate appearance controls in the header`);
			assert(footerControls >= 0, `${file} must keep appearance controls in the footer`);
			assert(paletteRender > footerControls, `${file} must render PaletteSwitcher inside the footer controls`);
			assert(themeRender > paletteRender, `${file} must keep ThemeToggle next to PaletteSwitcher`);
			assert.match(source, /i-carbon-color-palette/);
		});
	}
});
