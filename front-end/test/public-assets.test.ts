import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const publicDir = join(testDir, "..", "public");

function publicPath(path: string) {
	return join(publicDir, path);
}

function pngSize(path: string) {
	const buffer = readFileSync(publicPath(path));
	assert.equal(buffer.toString("ascii", 1, 4), "PNG");

	return {
		width: buffer.readUInt32BE(16),
		height: buffer.readUInt32BE(20)
	};
}

describe("public launch assets", () => {
	it("ships a web manifest backed by existing icons", () => {
		const manifest = JSON.parse(readFileSync(publicPath("site.webmanifest"), "utf8")) as {
			icons?: Array<{ src?: string; sizes?: string; type?: string }>;
		};

		assert.ok(Array.isArray(manifest.icons));
		for (const icon of manifest.icons || []) {
			assert.equal(icon.type, "image/png");
			assert.ok(icon.src);
			assert.ok(existsSync(publicPath(icon.src.replace(/^\//, ""))));
		}
	});

	it("ships a full-size social preview card", () => {
		assert.ok(existsSync(publicPath("og-card.svg")));
		const size = pngSize("og-card.png");

		assert.deepEqual(size, { width: 1200, height: 630 });
	});

	it("ships crawler guidance with the canonical sitemap location", () => {
		const robots = readFileSync(publicPath("robots.txt"), "utf8");

		assert.match(robots, /^User-agent: \*/m);
		assert.match(robots, /^Disallow: \/api/m);
		assert.match(robots, /^Disallow: \/account/m);
		assert.match(robots, /^Disallow: \/setup/m);
		assert.match(robots, /^Sitemap: https:\/\/isthereconsensus\.org\/sitemap\.xml$/m);
	});

	it("ships a security.txt contact at the standard and fallback locations", () => {
		const standard = readFileSync(publicPath(".well-known/security.txt"), "utf8");
		const fallback = readFileSync(publicPath("security.txt"), "utf8");

		assert.equal(fallback, standard);
		assert.match(standard, /^Contact: mailto:consensus@isthereconsensus\.org$/m);
		assert.match(
			standard,
			/^Policy: https:\/\/github\.com\/anderson-webops\/isthereconsensus\.org\/security\/policy$/m
		);
		assert.match(standard, /^Canonical: https:\/\/isthereconsensus\.org\/\.well-known\/security\.txt$/m);
		assert.match(standard, /^Expires: 2027-06-30T23:59:00\.000Z$/m);
	});
});
