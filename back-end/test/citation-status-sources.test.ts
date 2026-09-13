import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { normalizeHttpUrl, normalizeHttpUrlList } from "../src/utils/accountValidation.js";
import { normalizeCitationStatusSources } from "../src/utils/citationStatusSources.js";

describe("legacy citation status sources", () => {
	const labels = ["Crossref", "PubMed", "Europe PMC", "Editorial review"];
	const notice = "https://publisher.example/correction";

	it("round trips stored labels alongside normalized notice URLs", () => {
		assert.deepEqual(normalizeCitationStatusSources([...labels, notice], labels), [...labels, notice]);
		assert.deepEqual(normalizeCitationStatusSources([" HTTPS://PUBLISHER.EXAMPLE/correction "], labels), [...labels, notice]);
	});

	it("preserves historical labels when replacing or clearing notice URLs", () => {
		assert.deepEqual(normalizeCitationStatusSources([notice], labels), [...labels, notice]);
		assert.deepEqual(normalizeCitationStatusSources([], [...labels, notice]), labels);
	});

	it("does not accept invented labels, including names used on other citations", () => {
		for (const label of labels) {
			assert.throws(() => normalizeCitationStatusSources([label], []), /valid URL/);
		}
		assert.throws(() => normalizeCitationStatusSources(["PubMed"], ["Crossref"]), /valid URL/);
	});

	it("never grandfathers unsafe URL schemes or embedded credentials", () => {
		for (const unsafe of ["javascript:alert(1)", "data:text/html,unsafe", "file:///tmp/notice", "ftp://example.org", "https://user:secret@example.org"]) {
			assert.throws(() => normalizeCitationStatusSources([unsafe], [unsafe]), /HTTP or HTTPS/);
		}
		assert.throws(() => normalizeCitationStatusSources(["<img src=x>"], ["<img src=x>"]), /valid URL/);
	});

	it("rejects malformed lists and overlong additions without changing stored inputs", () => {
		const original = [...labels];
		for (const value of [null, "Crossref", {}, [null], [{}], [1], [`https://example.org/${"x".repeat(500)}`]]) {
			assert.throws(() => normalizeCitationStatusSources(value, original));
			assert.deepEqual(original, labels);
		}
	});

	it("rejects overflow rather than silently dropping labels or notice URLs", () => {
		const notices = Array.from({ length: 6 }, (_, index) => `${notice}/${index}`);
		assert.deepEqual(normalizeCitationStatusSources(notices.slice(0, 2), labels), [...labels, ...notices.slice(0, 2)]);
		assert.throws(() => normalizeCitationStatusSources(notices, labels), /at most 6/);
		assert.throws(() => normalizeCitationStatusSources([...notices, "javascript:alert(1)"], []), /HTTP or HTTPS/);
	});

	it("round trips longer existing monitor lists without truncating them", () => {
		const existing = [...labels, ...Array.from({ length: 8 }, (_, index) => `${notice}/${index}`)];
		assert.deepEqual(normalizeCitationStatusSources(existing, existing), existing);
		assert.throws(() => normalizeCitationStatusSources([...existing, `${notice}/new`], existing), /at most 12/);
	});

	it("deduplicates repeated labels and normalized URLs", () => {
		assert.deepEqual(normalizeCitationStatusSources(["Crossref", notice, notice, ""], ["Crossref"]), ["Crossref", notice]);
	});

	it("does not change global URL or new-citation validation", () => {
		assert.throws(() => normalizeHttpUrl("Crossref"), /valid URL/);
		assert.throws(() => normalizeHttpUrlList([notice, "Crossref"], 6, 500), /valid URL/);
		assert.throws(() => normalizeHttpUrlList(["javascript:alert(1)"], 6, 500), /HTTP or HTTPS/);
	});
});
