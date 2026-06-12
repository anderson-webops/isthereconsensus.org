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
});
