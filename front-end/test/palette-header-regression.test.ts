import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const layoutFiles = ["src/layouts/default.vue", "src/layouts/home.vue"] as const;

describe("palette header regression guard", () => {
	for (const file of layoutFiles) {
		it(`keeps the restored background palette controls in the header for ${file}`, () => {
			const source = readFileSync(join(testDir, "..", file), "utf8");
			const headerStart = source.indexOf('<header class="site-header">');
			const headerEnd = source.indexOf("</header>", headerStart);
			const header = source.slice(headerStart, headerEnd);
			const controls = header.indexOf('class="site-header__controls" aria-label="Appearance controls"');
			const paletteRender = header.indexOf("<PaletteSwitcher />");
			const themeRender = header.indexOf("<ThemeToggle />");

			assert.ok(headerStart >= 0, `${file} must render a site header`);
			assert.ok(headerEnd > headerStart, `${file} must close the site header`);
			assert.ok(controls >= 0, `${file} must keep appearance controls in the header`);
			assert.ok(paletteRender > controls, `${file} must render PaletteSwitcher inside the header controls`);
			assert.ok(themeRender > paletteRender, `${file} must keep ThemeToggle next to PaletteSwitcher`);
			assert.doesNotMatch(source, /site-footer__appearance/);
		});
	}
});
