import type { IncomingMessage, ServerResponse } from "node:http";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { chmod, lstat, realpath } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { observeHttpRequestCancellation } from "../../back-end/src/utils/httpRequestCancellation.js";
import { PUBLIC_SEARCH_WORKER_REQUEST_LIMIT, PUBLIC_SEARCH_WORKER_RESPONSE_LIMIT, publicSearchWorkerPayload, publicSearchWorkerRequestSchema } from "../../back-end/src/utils/publicSearchWorker.js";
import { verifyModelAssets } from "./assets.js";
import { SearchSupervisor } from "./supervisor.js";

function send(response: ServerResponse, status: number, value: unknown) {
	if (response.destroyed || response.writableEnded) return;
	const body = JSON.stringify(value);
	assert.ok(Buffer.byteLength(body) <= PUBLIC_SEARCH_WORKER_RESPONSE_LIMIT);
	response.writeHead(status, { "content-type": "application/json", "cache-control": "no-store" });
	response.end(body);
}

async function body(request: IncomingMessage) {
	const chunks: Buffer[] = [];
	let size = 0;
	for await (const chunk of request) {
		size += Buffer.byteLength(chunk);
		assert.ok(size <= PUBLIC_SEARCH_WORKER_REQUEST_LIMIT, "Worker request exceeds its bound.");
		chunks.push(Buffer.from(chunk));
	}
	return JSON.parse(Buffer.concat(chunks).toString("utf8")) as unknown;
}

export async function createSearchWorkerServer(socketPath: string, supervisor: SearchSupervisor) {
	assert.ok(path.isAbsolute(socketPath) && path.normalize(socketPath) === socketPath && socketPath.endsWith(".sock") && Buffer.byteLength(socketPath) <= 100, "A normalized private socket path is required.");
	const directory = await lstat(path.dirname(socketPath));
	assert.ok(directory.isDirectory() && !directory.isSymbolicLink() && (directory.mode & 0o002) === 0, "The socket directory must not be world-writable or a symlink.");
	await realpath(path.dirname(socketPath));
	try {
		await lstat(socketPath);
		throw new Error("The socket path already exists.");
	}
	catch (error) {
		if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
	}
	const server = createServer(async (request, response) => {
		const cancellation = observeHttpRequestCancellation(request, response);
		try {
			if (request.method === "GET" && request.url === "/healthz") {
				send(response, 200, { ok: true });
				return;
			}
			if (request.method === "GET" && request.url === "/readyz") {
				send(response, supervisor.state.ready ? 200 : 503, { ready: supervisor.state.ready });
				return;
			}
			if (request.method !== "POST" || request.url !== "/rank") {
				send(response, 404, { error: "Unknown worker route." });
				return;
			}
			if (request.headers["content-type"] !== "application/json" || Number(request.headers["content-length"]) > PUBLIC_SEARCH_WORKER_REQUEST_LIMIT) {
				send(response, 400, { error: "Invalid worker request." });
				return;
			}
			let payload;
			try {
				payload = publicSearchWorkerRequestSchema.parse(await body(request));
				const canonical = publicSearchWorkerPayload(payload.corpus, payload.query, new Date(payload.referenceDate));
				assert.equal(new Set(payload.corpus.map(claim => claim.slug)).size, payload.corpus.length);
				assert.deepEqual(payload, canonical);
			}
			catch {
				send(response, 400, { error: "Invalid worker request." });
				return;
			}
			const result = await supervisor.rank(payload, cancellation.signal);
			if (!cancellation.signal.aborted) send(response, 200, result);
		}
		catch {
			if (!cancellation.signal.aborted) send(response, 503, { error: "Search worker is unavailable." });
		}
		finally { cancellation.dispose(); }
	});
	server.maxConnections = 8;
	server.headersTimeout = 2_000;
	server.requestTimeout = 2_000;
	server.keepAliveTimeout = 1_000;
	await new Promise<void>((resolve, reject) => {
		server.once("error", reject);
		server.listen(socketPath, resolve);
	});
	await chmod(socketPath, 0o660);
	return {
		server,
		async close() {
			await supervisor.close();
			server.closeAllConnections();
			await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()));
		}
	};
}

async function main() {
	const socketPath = process.env.SEARCH_WORKER_SOCKET;
	const modelDirectory = process.env.SEARCH_MODEL_DIR;
	assert.ok(socketPath && modelDirectory, "The private worker socket and pinned model directory must be explicitly configured.");
	await verifyModelAssets(modelDirectory);
	const worker = await createSearchWorkerServer(socketPath, new SearchSupervisor({ modelDirectory }));
	let stopping = false;
	const stop = () => {
		if (stopping) return;
		stopping = true;
		worker.close().catch(() => {
			process.exitCode = 1;
		});
	};
	process.once("SIGINT", stop);
	process.once("SIGTERM", stop);
	process.stdout.write("Isolated search transport is listening; corpus readiness is checked separately.\n");
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	main().catch(() => {
		process.stderr.write("Isolated search worker startup failed.\n");
		process.exitCode = 1;
	});
}
