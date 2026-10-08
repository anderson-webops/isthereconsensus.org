import type { IncomingMessage, ServerResponse } from "node:http";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { describe, it } from "node:test";
import { observeHttpRequestCancellation } from "../src/utils/httpRequestCancellation.js";

function lifecycleFixture() {
	const request = Object.assign(new EventEmitter(), { aborted: false });
	const response = Object.assign(new EventEmitter(), { writableEnded: false, destroyed: false });
	const observation = observeHttpRequestCancellation(request as unknown as IncomingMessage, response as unknown as ServerResponse);
	return { request, response, ...observation };
}

describe("HTTP reader cancellation", () => {
	it("does not mistake a complete incoming GET for a departed reader", () => {
		const lifecycle = lifecycleFixture();
		lifecycle.request.emit("end");
		lifecycle.request.emit("close");
		assert.equal(lifecycle.signal.aborted, false);
		lifecycle.dispose();
	});

	it("aborts when the response socket closes before a response is sent", () => {
		const lifecycle = lifecycleFixture();
		lifecycle.response.emit("close");
		assert.equal(lifecycle.signal.aborted, true);
		lifecycle.dispose();
	});

	it("aborts an interrupted incoming request", () => {
		const lifecycle = lifecycleFixture();
		lifecycle.request.emit("aborted");
		assert.equal(lifecycle.signal.aborted, true);
		lifecycle.dispose();
	});

	it("does not abort successful response completion", () => {
		const lifecycle = lifecycleFixture();
		lifecycle.response.writableEnded = true;
		lifecycle.response.emit("close");
		assert.equal(lifecycle.signal.aborted, false);
		lifecycle.dispose();
	});

	for (const state of ["request-aborted", "response-destroyed"]) {
		it(`recognizes an already ${state} lifecycle`, () => {
			const request = Object.assign(new EventEmitter(), { aborted: state === "request-aborted" });
			const response = Object.assign(new EventEmitter(), { writableEnded: false, destroyed: state === "response-destroyed" });
			const observation = observeHttpRequestCancellation(request as unknown as IncomingMessage, response as unknown as ServerResponse);
			assert.equal(observation.signal.aborted, true);
			observation.dispose();
		});
	}

	it("removes only its own listeners on every route exit", () => {
		const request = Object.assign(new EventEmitter(), { aborted: false });
		const response = Object.assign(new EventEmitter(), { writableEnded: false, destroyed: false });
		const existing = () => {};
		request.on("aborted", existing);
		response.on("close", existing);
		const observation = observeHttpRequestCancellation(request as unknown as IncomingMessage, response as unknown as ServerResponse);
		assert.equal(request.listenerCount("aborted"), 2);
		assert.equal(response.listenerCount("close"), 2);
		observation.dispose();
		observation.dispose();
		assert.deepEqual(request.listeners("aborted"), [existing]);
		assert.deepEqual(response.listeners("close"), [existing]);
		response.emit("close");
		assert.equal(observation.signal.aborted, false);
	});
});
