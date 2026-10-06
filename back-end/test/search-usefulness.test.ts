import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { join } from "node:path";
import process from "node:process";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import {
	evaluateSearchUsefulness,
	normalizeSearchEvaluationOrigin,
	parseSearchUsefulnessDataset
} from "../src/utils/searchUsefulness.js";

const target = { topicSlug: "synthetic-topic", claimSlug: "synthetic-review" };
const title = "Can a pump maintain a steady feed?";
const bottomLine = "Pressure < 2 & flow remains steady.";
const covered = { id: "covered", query: "Can a pump maintain a steady feed?", classification: "covered", expected: [target] };
const outside = { id: "outside", query: "Which train should I board?", classification: "outside", expected: [] };
const dataset = {
	schemaVersion: 1,
	publicQueries: true,
	provenance: {
		kind: "development",
		author: "assistant",
		contextExposure: "development",
		frozenAt: "2026-10-06T00:00:00Z",
		baselineSourceCommit: "a".repeat(40)
	},
	questions: [covered, outside]
};
const article = { claim: { slug: target.claimSlug, topic: { slug: target.topicSlug }, title, bottomLine, status: "published", sources: [{ url: "https://example.org/public-source" }] } };
const page = `<html><head><title>${title}</title></head><body><h1>${title}</h1><p>Pressure &lt; 2 &amp; flow remains steady.</p></body></html>`;
const hit = { slug: target.claimSlug, title, topic: { slug: target.topicSlug } };

function fixtureFetch(change?: (url: URL) => Response | undefined): typeof fetch {
	return async (input, init) => {
		const url = new URL(String(input));
		assert.equal(init?.method, "GET");
		assert.equal(init?.credentials, "omit");
		assert.equal(init?.redirect, "manual");
		assert.deepEqual(Object.keys(init?.headers ?? {}), ["Accept"]);
		const changed = change?.(url);
		if (changed) return changed;
		if (url.pathname === `/api/topics/${target.topicSlug}/claims/${target.claimSlug}`) return Response.json(article);
		if (url.pathname === `/consensus/${target.topicSlug}/${target.claimSlug}`) return new Response(page);
		if (["/api/claims", "/api/search/suggestions"].includes(url.pathname)) return Response.json({ claims: url.searchParams.get("q") === covered.query ? [hit] : [] });
		return new Response("Not found", { status: 404 });
	};
}

async function evaluate(input: unknown = dataset, fetcher = fixtureFetch()) {
	return evaluateSearchUsefulness(input, "http://127.0.0.1:3011", { fetch: fetcher, intervalMs: 0, now: () => new Date("2026-10-06T01:00:00Z") });
}

describe("public search usefulness evaluation", () => {
	it("checks both real search surfaces and the expected public API and rendered content", async () => {
		const report = await evaluate();
		assert.equal(report.mechanicalGatePassed, true);
		assert.equal(report.checkedAt, "2026-10-06T01:00:00.000Z");
		assert.deepEqual(report.endpointScores.map(row => [row.name, row.coveredHits, row.coveredTotal, row.outsideEmpty, row.outsideTotal]), [["directory", 1, 1, 1, 1], ["suggestions", 1, 1, 1, 1]]);
		assert.deepEqual(report.unreadable, []);
		assert.match(report.datasetSha256, /^[a-f0-9]{64}$/u);
		assert.match(report.limitations, /not independently certified/u);
		assert.deepEqual(report.deploymentObservation, { frontend: null, reason: "http-404" });
	});

	it("records only validated frontend release identity and does not imply backend identity", async () => {
		for (const version of [{ version: "v1.38.15" }, { ref: "v1.38.15" }]) {
			const report = await evaluate(dataset, fixtureFetch(url => url.pathname === "/deployment.json" ? Response.json({ ...version, commit: "a".repeat(40), privateConfiguration: "do-not-copy-this-value" }) : undefined));
			assert.deepEqual(report.deploymentObservation, { frontend: { version: "v1.38.15", commit: "a".repeat(40) }, reason: "observed-frontend-identity-only" });
			assert.ok(!JSON.stringify(report).includes("do-not-copy-this-value"));
		}
	});

	it("keeps partial questions and gaps visible without adding them to the covered denominator", async () => {
		const report = await evaluate({ ...dataset, questions: [
			...dataset.questions,
			{ id: "partial", query: "Which installation details matter?", classification: "partial", expected: [target] },
			{ id: "gap", query: "Does an unreviewed installation work?", classification: "gap", expected: [] }
		] });
		assert.deepEqual(report.counts, { covered: 1, partial: 1, gaps: 1, outside: 1 });
		assert.equal(report.rows.length, 4);
		assert.equal(report.rows[2].query, "Which installation details matter?");
	});

	it("requires the 90-percent threshold separately on each search surface", async () => {
		const report = await evaluate(dataset, fixtureFetch(url => url.pathname === "/api/search/suggestions" ? Response.json({ claims: [] }) : undefined));
		assert.equal(report.endpointScores[0].coveredPercent, 100);
		assert.equal(report.endpointScores[1].coveredPercent, 0);
		assert.equal(report.mechanicalGatePassed, false);
	});

	it("does not turn missing expected pages, drafts, or source-less records into successful answers", async () => {
		for (const response of [new Response("Not found", { status: 404 }), Response.json({ claim: { ...article.claim, status: "draft" } }), Response.json({ claim: { ...article.claim, sources: [] } })]) {
			const report = await evaluate(dataset, fixtureFetch(url => url.pathname.startsWith("/api/topics/") ? response : undefined));
			assert.equal(report.mechanicalGatePassed, false);
			assert.ok(report.endpointScores.every(row => row.coveredHits === 0));
			assert.equal(report.unreadable.length, 1);
		}
	});

	it("rejects wrong-page HTTP 200 responses and content found only in inert HTML", async () => {
		for (const html of [`<h1>Different article</h1><p>Pressure &lt; 2 &amp; flow remains steady.</p>`, `<script type="application/json">${page}</script><h1>Loading</h1>`, `<template>${page}</template><h1>Loading</h1>`, `<h1>${title}</h1><script>${bottomLine}</script>`]) {
			const report = await evaluate(dataset, fixtureFetch(url => url.pathname.startsWith("/consensus/") ? new Response(html) : undefined));
			assert.equal(report.mechanicalGatePassed, false);
			assert.equal(report.unreadable[0].reason, "rendered-content-mismatch");
		}
	});

	it("keeps duplicate search results in their actual rank positions", async () => {
		const other = { ...hit, slug: "other-review" };
		const report = await evaluate(dataset, fixtureFetch((url) => {
			if (url.searchParams.get("q") === covered.query) return Response.json({ claims: [other, other, other, hit] });
			if (url.pathname.endsWith("/other-review") && url.pathname.startsWith("/api/")) return Response.json({ claim: { ...article.claim, slug: other.slug } });
			if (url.pathname.endsWith("/other-review")) return new Response(page);
			return undefined;
		}));
		assert.equal(report.mechanicalGatePassed, false);
		assert.ok(report.rows[0].endpoints.every(endpoint => endpoint.topThree.length === 3 && !endpoint.hit));
	});

	it("does not confuse HTTP failures, malformed JSON, or redirects with empty outside controls", async () => {
		for (const makeResponse of [() => new Response("Rate limited", { status: 429 }), () => new Response("not json"), () => new Response("", { status: 302, headers: { Location: "https://untrusted.example/" } })]) {
			const report = await evaluate(dataset, fixtureFetch(url => url.searchParams.get("q") === outside.query ? makeResponse() : undefined));
			assert.equal(report.mechanicalGatePassed, false);
			assert.deepEqual(report.unavailable, [outside.id]);
			assert.ok(report.endpointScores.every(row => row.outsideEmpty === 0));
		}
	});

	it("bounds response size and redacts transport exceptions and private response fields", async () => {
		const oversized = await evaluate(dataset, fixtureFetch(url => url.pathname === "/api/claims" ? new Response("x".repeat(2 * 1024 * 1024 + 1)) : undefined));
		assert.equal(oversized.mechanicalGatePassed, false);
		assert.equal(oversized.rows[0].endpoints[0].reason, "oversized-response");
		const privateValue = "private-value-must-not-appear";
		const report = await evaluate(dataset, fixtureFetch((url) => {
			if (url.pathname.startsWith("/api/topics/")) return Response.json({ ...article, resetToken: privateValue, cookie: privateValue, adminNotes: privateValue }, { headers: { "Set-Cookie": privateValue } });
			return undefined;
		}));
		assert.equal(report.mechanicalGatePassed, true);
		assert.ok(!JSON.stringify(report).includes(privateValue));
		const failed = await evaluate(dataset, async () => {
			throw new Error(privateValue);
		});
		assert.equal(failed.mechanicalGatePassed, false);
		assert.ok(!JSON.stringify(failed).includes(privateValue));
	});

	it("rejects duplicate, overlong, altered, contradictory, or credential-like questions", () => {
		for (const invalid of [
			{ ...dataset, publicQueries: false },
			{ ...dataset, token: "private-value" },
			{ ...dataset, questions: [covered, covered] },
			{ ...dataset, questions: [covered, { ...outside, query: covered.query.toUpperCase() }] },
			{ ...dataset, questions: [{ ...covered, query: "x".repeat(161) }] },
			{ ...dataset, questions: [{ ...covered, query: ` ${covered.query}` }] },
			{ ...dataset, questions: [{ ...covered, expected: [] }] },
			{ ...dataset, questions: [{ ...outside, expected: [target] }] },
			{ ...dataset, questions: [{ ...covered, expected: [target, target] }] },
			{ ...dataset, questions: [{ ...outside, query: "Authorization: Bearer private-value" }] },
			{ ...dataset, provenance: { ...dataset.provenance, kind: "fresh-candidate" } }
		]) assert.throws(() => parseSearchUsefulnessDataset(invalid), /Invalid evaluation dataset/u);
	});

	it("requires both covered and outside cases and never certifies claimed freshness", async () => {
		const coveredOnly = await evaluate({ ...dataset, questions: [covered] });
		assert.equal(coveredOnly.mechanicalGatePassed, false);
		const outsideOnly = await evaluate({ ...dataset, questions: [outside] });
		assert.equal(outsideOnly.mechanicalGatePassed, false);
		const fresh = await evaluate({ ...dataset, provenance: { ...dataset.provenance, kind: "fresh-candidate", author: "human", contextExposure: "unexposed" } });
		assert.equal(fresh.provenance.kind, "fresh-candidate");
		assert.match(fresh.limitations, /freshness require separate review/u);
	});

	it("allows only credential-free public or loopback origins and preserves public pacing", async () => {
		for (const value of ["http://127.0.0.1:3011", "http://localhost:3011", "http://[::1]:3011", "https://isthereconsensus.org"]) assert.ok(normalizeSearchEvaluationOrigin(value).origin);
		for (const value of ["https://user:pass@isthereconsensus.org", "https://isthereconsensus.org/path", "https://isthereconsensus.org?token=value", "https://isthereconsensus.org#fragment", "http://isthereconsensus.org", "https://untrusted.example", "file:///tmp/data", "https://isthereconsensus.org.untrusted.example"]) assert.throws(() => normalizeSearchEvaluationOrigin(value));
		await assert.rejects(evaluateSearchUsefulness(dataset, "https://isthereconsensus.org", { intervalMs: 0, fetch: fixtureFetch() }), /3000 milliseconds/u);
		await assert.rejects(evaluateSearchUsefulness(dataset, "http://127.0.0.1:3011", { intervalMs: Number.NaN, fetch: fixtureFetch() }), /3000 milliseconds/u);
	});

	it("runs the CLI against an actual isolated HTTP server and creates an owner-only report", async () => {
		const scratch = fileURLToPath(new URL("../../.ai-work/runs/", import.meta.url));
		await mkdir(scratch, { recursive: true });
		const directory = await mkdtemp(join(scratch, "evaluation-cli-"));
		const server = createServer((request, response) => {
			assert.equal(request.method, "GET");
			assert.equal(request.headers.cookie, undefined);
			assert.equal(request.headers.authorization, undefined);
			const url = new URL(request.url ?? "/", "http://127.0.0.1");
			if (url.pathname === `/consensus/${target.topicSlug}/${target.claimSlug}`) {
				response.setHeader("Content-Type", "text/html");
				response.end(page);
				return;
			}
			response.setHeader("Content-Type", "application/json");
			if (url.pathname === "/deployment.json") response.end(JSON.stringify({ ref: "v1.38.15", commit: "a".repeat(40) }));
			else if (url.pathname.startsWith("/api/topics/")) response.end(JSON.stringify(article));
			else response.end(JSON.stringify({ claims: url.searchParams.get("q") === covered.query ? [hit] : [] }));
		});
		try {
			await new Promise<void>((resolve, reject) => {
				server.once("error", reject);
				server.listen(0, "127.0.0.1", resolve);
			});
			const address = server.address();
			assert.ok(address && typeof address === "object");
			const inputPath = join(directory, "questions.json");
			const outputPath = join(directory, "report.json");
			await writeFile(inputPath, JSON.stringify(dataset));
			const runCli = () => new Promise<number | null>((resolve, reject) => {
				const child = spawn(process.execPath, ["--import", "tsx", fileURLToPath(new URL("../src/scripts/evaluateSearchUsefulness.ts", import.meta.url)), "--dataset", inputPath, "--origin", `http://127.0.0.1:${address.port}`, "--output", outputPath, "--interval-ms", "0"], { stdio: "ignore", signal: AbortSignal.timeout(15_000) });
				child.once("error", reject);
				child.once("close", resolve);
			});
			assert.equal(await runCli(), 0);
			const report = JSON.parse(await readFile(outputPath, "utf8"));
			assert.equal(report.mechanicalGatePassed, true);
			assert.match(report.inputFileSha256, /^[a-f0-9]{64}$/u);
			assert.equal((await stat(outputPath)).mode & 0o777, 0o600);
			const original = await readFile(outputPath, "utf8");
			assert.equal(await runCli(), 2);
			assert.equal(await readFile(outputPath, "utf8"), original);
		}
		finally {
			if (server.listening) await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
			await rm(directory, { recursive: true, force: true });
		}
	});
});
