import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { createIsolatedBrowserPage } from "../../scripts/isolated-browser-page.mjs";

describe("isolated browser fixture request boundary", () => {
	it("allows only the owned origin and non-network data/blob resources", async () => {
		let intercept: ((request: { url: () => string; continue: () => Promise<void>; abort: () => Promise<void> }) => void) | undefined;
		const page = {
			async setRequestInterception(enabled: boolean) { assert.equal(enabled, true); },
			on(event: string, handler: typeof intercept) {
				assert.equal(event, "request");
				intercept = handler;
			}
		};
		assert.equal(await createIsolatedBrowserPage({ newPage: async () => page }, "http://127.0.0.1:45678"), page);
		for (const [url, expected] of [
			["http://127.0.0.1:45678/api/library/account", "continue"],
			["data:text/css,body{}", "continue"],
			["blob:http://127.0.0.1:45678/fixture", "continue"],
			["https://fonts.googleapis.com/css2?family=Example", "abort"],
			["https://isthereconsensus.org/api/auth/me", "abort"],
			["http://127.0.0.1:45679/api/auth/me", "abort"],
			["http://localhost:45678/api/auth/me", "abort"]
		]) {
			let decision = "";
			intercept!({
				url: () => url,
				continue: async () => { decision = "continue"; },
				abort: async () => { decision = "abort"; }
			});
			assert.equal(decision, expected);
		}
	});

	it("rejects remote and credential-bearing bases before opening a page", async () => {
		const context = {
			newPage: async () => { assert.fail("invalid origins must not create pages"); }
		};
		for (const base of ["https://isthereconsensus.org", "http://localhost:45678", "https://127.0.0.1:45678", "http://fixture:credential@127.0.0.1:45678"]) {
			await assert.rejects(createIsolatedBrowserPage(context, base));
		}
	});

	it("permits an explicit IPv6 loopback fixture", async () => {
		const page = { setRequestInterception: async () => {}, on: () => {} };
		assert.equal(await createIsolatedBrowserPage({ newPage: async () => page }, "http://[::1]:45678"), page);
	});

	it("keeps injected failures inside the owned origin without disabling isolation", async () => {
		let intercept: (request: { url: () => string; continue: () => Promise<void>; abort: () => Promise<void>; respond: () => Promise<void> }) => void;
		let decision = "";
		let overrides = 0;
		const page = {
			setRequestInterception: async () => {},
			on: (_event: string, handler: typeof intercept) => { intercept = handler; }
		};
		await createIsolatedBrowserPage({ newPage: async () => page }, "http://127.0.0.1:45678", (request: { respond: () => Promise<void> }, url: URL) => {
			overrides += 1;
			if (url.pathname !== "/api/reader-feedback") return false;
			void request.respond();
			return true;
		});
		for (const [url, expected] of [["https://isthereconsensus.org/api/reader-feedback", "abort"], ["http://127.0.0.1:45678/api/reader-feedback", "respond"], ["http://127.0.0.1:45678/library", "continue"]]) {
			intercept!({
				url: () => url,
				continue: async () => { decision = "continue"; },
				abort: async () => { decision = "abort"; },
				respond: async () => { decision = "respond"; }
			});
			assert.equal(decision, expected);
		}
		assert.equal(overrides, 2);
	});

	it("uses the boundary for every new page in the complete reader rehearsal", () => {
		for (const file of ["reader-library", "reader-content", "coverage-following", "coverage-roadmap", "living-evidence-refresh", "reader-feedback", "review-priority", "source-integrity", "editorial-citation"]) {
			const source = readFileSync(new URL(`../../scripts/${file}-smoke.mjs`, import.meta.url), "utf8");
			assert.ok(source.includes("createIsolatedBrowserPage("), file);
			assert.doesNotMatch(source, /await (?:browser|context)\.newPage\(/, file);
			assert.doesNotMatch(source, /setRequestInterception\(false\)/, file);
		}
	});
});
