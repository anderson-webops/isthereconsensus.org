import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { doiResolverUrl, pubMedCentralUrl, pubMedUrl, safeExternalHttpUrl } from "../src/utils/external-links";

describe("safeExternalHttpUrl", () => {
	it("accepts credential-free HTTP and HTTPS links", () => {
		assert.equal(safeExternalHttpUrl("https://example.com/paper"), "https://example.com/paper");
		assert.equal(safeExternalHttpUrl("http://example.com/source"), "http://example.com/source");
	});

	it("rejects executable, credential-bearing, and malformed links", () => {
		assert.equal(safeExternalHttpUrl("javascript:alert(1)"), "");
		assert.equal(safeExternalHttpUrl("data:text/html,unsafe"), "");
		assert.equal(safeExternalHttpUrl("https://user:secret@example.com/private"), "");
		assert.equal(safeExternalHttpUrl("//example.com/path"), "");
	});
});

describe("research identifier links", () => {
	it("constructs fixed-origin DOI and PubMed links", () => {
		assert.equal(doiResolverUrl("10.1000/example?version=1"), "https://doi.org/10.1000/example%3Fversion%3D1");
		assert.equal(pubMedUrl("12345678"), "https://pubmed.ncbi.nlm.nih.gov/12345678/");
		assert.equal(pubMedCentralUrl("pmc123456"), "https://pmc.ncbi.nlm.nih.gov/articles/PMC123456/");
	});

	it("rejects identifiers that could alter the destination or do not match the identifier shape", () => {
		assert.equal(doiResolverUrl("https://attacker.example/paper"), "");
		assert.equal(doiResolverUrl("10.1000\\@attacker.example"), "");
		assert.equal(pubMedUrl("../attacker"), "");
		assert.equal(pubMedCentralUrl("123456"), "");
	});
});
