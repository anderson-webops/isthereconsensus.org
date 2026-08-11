import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import express from "express";
import { createProbeRouter } from "../src/utils/probes.js";

const servers: Server[] = [];

async function startServer(readiness: () => boolean | Promise<boolean>) {
	const app = express();
	app.use(createProbeRouter(readiness));
	const server = app.listen(0, "127.0.0.1");
	servers.push(server);
	await new Promise<void>(resolve => server.once("listening", resolve));
	const address = server.address() as AddressInfo;
	return `http://127.0.0.1:${address.port}`;
}

afterEach(async () => {
	await Promise.all(
		servers.splice(0).map(
			server => new Promise<void>(resolve => server.close(() => resolve()))
		)
	);
});

async function assertProbe(
	baseUrl: string,
	path: string,
	method: "GET" | "HEAD",
	status: number,
	body: string
) {
	const response = await fetch(`${baseUrl}${path}`, { method, redirect: "manual" });
	assert.equal(response.status, status);
	assert.equal(response.headers.get("cache-control"), "no-store");
	assert.equal(response.headers.get("set-cookie"), null);
	assert.equal(response.headers.get("location"), null);
	assert.equal(response.headers.get("www-authenticate"), null);
	assert.equal(await response.text(), body);
}

describe("monitoring probes", () => {
	it("returns minimal liveness and readiness responses", async () => {
		const baseUrl = await startServer(() => true);
		await assertProbe(baseUrl, "/healthz", "GET", 200, "{\"ok\":true}");
		await assertProbe(baseUrl, "/healthz", "HEAD", 200, "");
		await assertProbe(baseUrl, "/readyz", "GET", 200, "{\"ok\":true}");
		await assertProbe(baseUrl, "/readyz", "HEAD", 200, "");
	});

	it("returns a generic 503 when readiness fails", async () => {
		const baseUrl = await startServer(() => {
			throw new Error("mongodb://operator:secret@internal-host/private-db");
		});
		await assertProbe(baseUrl, "/readyz", "GET", 503, "{\"ok\":false}");
		await assertProbe(baseUrl, "/readyz", "HEAD", 503, "");
	});
});
