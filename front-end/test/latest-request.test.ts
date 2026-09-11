import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createLatestRequest } from "../src/utils/latest-request.js";

describe("search request ordering", () => {
	it("rejects a late result as soon as the input changes, before the next debounced request", () => {
		const requests = createLatestRequest();
		const first = requests.begin();
		assert.equal(first.isCurrent(), true);
		requests.cancel();
		assert.equal(first.signal.aborted, true);
		assert.equal(first.isCurrent(), false);
		const second = requests.begin();
		assert.equal(second.isCurrent(), true);
		assert.equal(second.signal.aborted, false);
	});

	it("keeps an older completion from clearing the current loading state", async () => {
		const requests = createLatestRequest();
		let release: () => void = () => {};
		let state = "loading";
		const first = requests.begin();
		const oldResult = new Promise<void>((resolve) => {
			release = resolve;
		}).then(() => {
			if (first.isCurrent()) state = "old result";
		});
		const second = requests.begin();
		state = "new result";
		release();
		await oldResult;
		assert.equal(state, "new result");
		assert.equal(second.isCurrent(), true);
		requests.cancel();
		assert.equal(second.isCurrent(), false);
	});
});
