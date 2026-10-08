import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { watchDebounced } from "@vueuse/core";
import { nextTick, ref } from "vue";
import { settledSearchWatchOptions } from "../src/utils/latest-request.js";

describe("settled public search typing", () => {
	for (const cadence of [35, 100]) {
		it(`waits for the final query during eight prefixes at ${cadence} ms intervals`, async (context) => {
			context.mock.timers.enable({ apis: ["setTimeout"] });
			const query = ref("");
			const forwarded: string[] = [];
			const stop = watchDebounced(query, (value) => forwarded.push(value), settledSearchWatchOptions);
			context.after(stop);
			for (const prefix of [
				"c",
				"co",
				"cof",
				"coff",
				"coffee",
				"coffee st",
				"coffee stopped",
				"coffee stopped work"
			]) {
				query.value = prefix;
				await nextTick();
				context.mock.timers.tick(cadence);
				await nextTick();
				assert.deepEqual(forwarded, []);
			}
			query.value = "coffee stopped working";
			await nextTick();
			context.mock.timers.tick(249);
			assert.deepEqual(forwarded, []);
			context.mock.timers.tick(1);
			await nextTick();
			assert.deepEqual(forwarded, [query.value]);
		});
	}

	it("uses the tested settled-only policy for home, directory and Ask", () => {
		for (const filename of ["index.vue", "consensus/index.vue", "ask.vue"]) {
			const source = readFileSync(new URL(`../src/pages/${filename}`, import.meta.url), "utf8");
			assert.match(source, /watchDebounced\([\s\S]*settledSearchWatchOptions/);
			assert.doesNotMatch(source, /maxWait\s*:/);
		}
	});

	it("cancels directory page fetches immediately when intent changes or the page closes", () => {
		const source = readFileSync(new URL("../src/pages/consensus/index.vue", import.meta.url), "utf8");
		assert.match(source, /watch\(query, directoryRequests\.cancel, \{ flush: "sync" \}\)/);
		assert.match(source, /onScopeDispose\(directoryRequests\.cancel\)/);
		assert.match(source, /const request = directoryRequests\.begin\(\)/);
		assert.match(source, /signal: request\.signal/);
	});

	it("restarts a cancelled directory request when typing returns to the same settled query", () => {
		const source = readFileSync(new URL("../src/pages/consensus/index.vue", import.meta.url), "utf8");
		assert.match(source, /if \(requestedQuery\.value === value\) void refreshClaims\(\)/);
		assert.match(source, /else requestedQuery\.value = value/);
	});
});
