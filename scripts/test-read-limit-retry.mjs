import assert from "node:assert/strict";
import { test } from "node:test";
import { fetchWithReadLimit } from "./lib/read-limit-retry.mjs";

test("successful public reads keep their original response without waiting", async () => {
	const response = new Response("accepted");
	let requests = 0;
	const actual = await fetchWithReadLimit(() => {
		requests++;
		return response;
	}, () => assert.fail("A successful read must not wait."));
	assert.equal(actual, response);
	assert.equal(requests, 1);
});

test("a read limit drains the response and respects the full server window", async () => {
	const limited = new Response("limited", {
		status: 429,
		headers: { "retry-after": "60" }
	});
	const accepted = new Response("accepted");
	const waits = [];
	let requests = 0;
	const actual = await fetchWithReadLimit(() => requests++ === 0
		? limited
		: accepted, duration => waits.push(duration));
	assert.equal(actual, accepted);
	assert.equal(requests, 2);
	assert.equal(limited.bodyUsed, true);
	assert.deepEqual(waits, [61_000]);
});

test("a zero-second retry still waits beyond the reset boundary", async () => {
	let requests = 0;
	const waits = [];
	const actual = await fetchWithReadLimit(() => ++requests === 1
		? new Response("limited", {
				status: 429,
				headers: { "retry-after": "0" }
			})
		: new Response("accepted"), duration => waits.push(duration));
	assert.equal(actual.status, 200);
	assert.equal(requests, 2);
	assert.deepEqual(waits, [1000]);
});

test("missing, malformed or excessive retry metadata fails without another request", async () => {
	for (const value of [
		null,
		"",
		"-1",
		"2.5",
		"61",
		"1000",
		"later",
		"Wed, 01 Jan 2030 00:00:00 GMT"
	]) {
		const response = new Response("limited", {
			status: 429,
			headers: value === null
				? {}
				: { "retry-after": value }
		});
		let requests = 0;
		await assert.rejects(fetchWithReadLimit(() => {
			requests++;
			return response;
		}, () => assert.fail("Invalid metadata must not cause a wait.")), /Retry-After/u);
		assert.equal(requests, 1);
		assert.equal(response.bodyUsed, true);
	}
});

test("repeated rate limiting stops after one retry and drains both responses", async () => {
	const responses = [0, 1].map(() => new Response("limited", {
		status: 429,
		headers: { "retry-after": "1" }
	}));
	const waits = [];
	let requests = 0;
	await assert.rejects(fetchWithReadLimit(() => responses[requests++], duration => waits.push(duration)), /one bounded retry/u);
	assert.equal(requests, 2);
	assert.deepEqual(waits, [2000]);
	assert.ok(responses.every(response => response.bodyUsed));
});

test("other HTTP failures remain available to the caller without retrying", async () => {
	const response = new Response("unavailable", { status: 503 });
	let requests = 0;
	assert.equal(await fetchWithReadLimit(() => {
		requests++;
		return response;
	}, () => assert.fail("Other failures must not be retried.")), response);
	assert.equal(requests, 1);
});

test("request errors propagate without retrying or waiting", async () => {
	const failure = new Error("Connection failed");
	let requests = 0;
	await assert.rejects(fetchWithReadLimit(() => {
		requests++;
		throw failure;
	}, () => assert.fail("Request failures must not wait.")), error => error === failure);
	assert.equal(requests, 1);
});
