import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { serializeJsonLd } from "../src/utils/json-ld";

describe("serializeJsonLd", () => {
	it("keeps untrusted metadata from closing its script element", () => {
		const title = "</script><script>alert('metadata injection')</script>&\u2028";
		const serialized = serializeJsonLd({ title });

		assert.doesNotMatch(serialized, /<\/script/i);
		assert.match(serialized, /\\u003c\/script\\u003e/);
		assert.match(serialized, /\\u0026/);
		assert.match(serialized, /\\u2028/);
		assert.deepEqual(JSON.parse(serialized), { title });
	});
});
