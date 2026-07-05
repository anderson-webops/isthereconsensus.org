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
			const headerStart = source.indexOf('<header class="site-header">');
			const mainStart = source.indexOf('<main class="site-main">');
			const footerStart = source.indexOf('<footer class="site-footer">');
			const footer = source.slice(footerStart);
			const paletteRender = source.indexOf("<PaletteSwitcher />");
			const themeRender = source.indexOf("<ThemeToggle />");

			assert(headerStart >= 0, `${file} must render a header`);
			assert(mainStart >= 0, `${file} must render a main region`);
			assert(footerStart >= 0, `${file} must render a footer`);
			assert.match(footer, /class="site-footer__appearance" role="group" aria-label="Appearance controls"/);
			assert(paletteRender > footerStart, `${file} must render PaletteSwitcher inside the footer controls`);
			assert(themeRender > paletteRender, `${file} must keep ThemeToggle next to PaletteSwitcher`);
			assert.doesNotMatch(
				source.slice(headerStart, mainStart),
				/PaletteSwitcher|ThemeToggle|site-header__controls/
			);
		});
	}
});
