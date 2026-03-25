import assert from "node:assert/strict";
import test from "node:test";
// noinspection ES6PreferShortImport
import { appDescription } from "../src/constants";

test("nuxt config points to src/ and keeps the public app shell metadata", async () => {
	const { default: config } = await import("../nuxt.config.ts");

	assert.equal(config.srcDir, "src");
	assert.deepEqual(
		config.modules?.sort(),
		["@nuxt/eslint", "@nuxtjs/color-mode", "@pinia/nuxt", "@unocss/nuxt", "@vueuse/nuxt"].sort()
	);
	assert.equal(config.colorMode?.preference, "light");
	assert.equal(config.colorMode?.fallback, "light");

	const headMeta = config.app?.head?.meta ?? [];
	const headLinks = config.app?.head?.link ?? [];
	const descriptionMeta = headMeta.find((meta) => meta?.name === "description");
	assert.equal(descriptionMeta?.content, appDescription);

	const manifestLink = headLinks.find((link) => link?.rel === "manifest");
	assert.equal(manifestLink, undefined);
});
