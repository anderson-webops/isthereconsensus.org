import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const notFoundSource = readFileSync(join(testDir, "..", "src", "pages", "[...all].vue"), "utf8");

describe("not found route", () => {
	it("returns an HTTP 404 instead of only rendering not-found copy", () => {
		assert.match(notFoundSource, /setResponseStatus\(404\)/);
	});

	it("keeps catch-all pages out of search indexes", () => {
		assert.match(notFoundSource, /robots:\s*"noindex,follow"/);
	});

	it("does not self-canonicalize unknown URLs", () => {
		assert.match(notFoundSource, /key:\s*"canonical"/);
		assert.match(notFoundSource, /href:\s*`\$\{siteUrl\}\/`/);
	});
});
