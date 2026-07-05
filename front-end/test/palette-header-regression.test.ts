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
			const headerEnd = source.indexOf("</header>", headerStart);
			const header = source.slice(headerStart, headerEnd);
			const footerControls = source.indexOf('class="site-footer__appearance" aria-label="Appearance controls"');
			const paletteRender = source.indexOf("<PaletteSwitcher />");
			const themeRender = source.indexOf("<ThemeToggle />");

			assert(headerStart >= 0, `${file} must render a site header`);
			assert(headerEnd > headerStart, `${file} must close the site header`);
			assert(footerControls >= 0, `${file} must keep appearance controls in the footer`);
			assert(paletteRender > footerControls, `${file} must render PaletteSwitcher inside the footer controls`);
			assert(themeRender > paletteRender, `${file} must keep ThemeToggle next to PaletteSwitcher`);
			assert.doesNotMatch(header, /PaletteSwitcher|ThemeToggle|site-header__controls/);
		});
	}
});
