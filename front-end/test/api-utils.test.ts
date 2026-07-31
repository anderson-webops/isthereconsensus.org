import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	buildApiUrl,
	normalizeInternalApiBase,
	normalizePublicApiBase,
	normalizePublicSiteUrl
} from "../src/utils/api";

describe("normalizePublicApiBase", () => {
	it("falls back to a same-origin api path in production", () => {
		assert.equal(normalizePublicApiBase(undefined, false), "/api");
	});

	it("strips localhost values from production public config", () => {
		assert.equal(normalizePublicApiBase("http://127.0.0.1:3011", false), "/api");
		assert.equal(normalizePublicApiBase("http://localhost:3011", false), "/api");
	});

	it("keeps the local backend address in development", () => {
		assert.equal(normalizePublicApiBase(undefined, true), "http://127.0.0.1:3011");
	});

	it("rejects unsafe public API schemes and embedded credentials", () => {
		assert.throws(() => normalizePublicApiBase("javascript:alert(1)", false), /HTTP or HTTPS/);
		assert.throws(() => normalizePublicApiBase("//attacker.example/api", false), /same-origin path/);
		assert.throws(
			() => normalizePublicApiBase("https://user:secret@example.com/api", false),
			/embedded credentials/
		);
	});
});

describe("normalizeInternalApiBase", () => {
	it("defaults to the internal backend origin", () => {
		assert.equal(normalizeInternalApiBase(undefined), "http://127.0.0.1:3011");
	});

	it("removes an accidental /api suffix from the internal base", () => {
		assert.equal(normalizeInternalApiBase("http://127.0.0.1:3011/api"), "http://127.0.0.1:3011");
	});

	it("rejects unsafe internal API schemes and embedded credentials", () => {
		assert.throws(() => normalizeInternalApiBase("file:///tmp/backend"), /HTTP or HTTPS/);
		assert.throws(() => normalizeInternalApiBase("https://user:secret@example.com/api"), /embedded credentials/);
	});
});

describe("normalizePublicSiteUrl", () => {
	it("accepts exact HTTPS origins in production", () => {
		assert.equal(normalizePublicSiteUrl("https://isthereconsensus.org", false), "https://isthereconsensus.org");
	});

	it("rejects unsafe production origins and origin values with paths", () => {
		assert.throws(() => normalizePublicSiteUrl("http://isthereconsensus.org", false), /must use HTTPS/);
		assert.throws(
			() => normalizePublicSiteUrl("https://isthereconsensus.org/private", false),
			/origin without a path/
		);
		assert.throws(() => normalizePublicSiteUrl("javascript:alert(1)", false), /HTTP or HTTPS/);
	});
});

describe("buildApiUrl", () => {
	it("builds correct same-origin urls when the public base is /api", () => {
		assert.equal(buildApiUrl("/api", "/topics"), "/api/topics");
		assert.equal(buildApiUrl("/api", "/auth/me"), "/api/auth/me");
	});

	it("builds correct backend urls when the internal base is a host origin", () => {
		assert.equal(buildApiUrl("http://127.0.0.1:3011", "/topics"), "http://127.0.0.1:3011/api/topics");
		assert.equal(
			buildApiUrl("https://isthereconsensus.org", "/auth/login"),
			"https://isthereconsensus.org/api/auth/login"
		);
	});
});
