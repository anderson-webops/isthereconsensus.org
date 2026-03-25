import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildApiUrl, normalizeInternalApiBase, normalizePublicApiBase } from "../src/utils/api";

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
});

describe("normalizeInternalApiBase", () => {
	it("defaults to the internal backend origin", () => {
		assert.equal(normalizeInternalApiBase(undefined), "http://127.0.0.1:3011");
	});

	it("removes an accidental /api suffix from the internal base", () => {
		assert.equal(normalizeInternalApiBase("http://127.0.0.1:3011/api"), "http://127.0.0.1:3011");
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
