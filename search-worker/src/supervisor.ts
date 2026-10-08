import type { ChildProcess } from "node:child_process";
import type { PublicSearchWorkerRequest, PublicSearchWorkerResponse } from "../../back-end/src/utils/publicSearchWorker.js";
import type { PassageVector } from "./pipeline.js";
import assert from "node:assert/strict";
import { fork } from "node:child_process";
import { EventEmitter } from "node:events";
import { z } from "zod";
import { publicSearchWorkerResponseSchema } from "../../back-end/src/utils/publicSearchWorker.js";
import { publicPassages } from "./pipeline.js";

const messageSchema = z.discriminatedUnion("kind", [
	z.object({ kind: z.literal("boot") }).strict(),
	z.object({ kind: z.literal("warm"), corpusHash: z.string(), vectors: z.array(z.object({ id: z.string(), slug: z.string(), vector: z.array(z.number().finite()).length(384) }).strict()).max(20_000) }).strict(),
	z.object({ kind: z.literal("reply"), job: z.number().int().positive(), response: publicSearchWorkerResponseSchema }).strict(),
	z.object({ kind: z.literal("scoring"), job: z.number().int().positive() }).strict(),
	z.object({ kind: z.literal("fault") }).strict()
]);

export class SearchServiceUnavailableError extends Error {
	constructor() { super("The isolated search service is unavailable."); }
}

interface ActiveSearch {
	job: number;
	payload: PublicSearchWorkerRequest;
	resolve: (response: PublicSearchWorkerResponse) => void;
	reject: (error: Error) => void;
	signal: AbortSignal;
	abort: () => void;
	deadline: ReturnType<typeof setTimeout>;
	sent: boolean;
}

interface CachedCorpus {
	hash: string;
	corpus: PublicSearchWorkerRequest["corpus"];
	vectors?: PassageVector[];
}

export interface SearchSupervisorOptions {
	modelDirectory: string;
	createChild?: () => ChildProcess;
	rankTimeoutMilliseconds?: number;
	warmTimeoutMilliseconds?: number;
}

export class SearchSupervisor extends EventEmitter {
	private child?: ChildProcess;
	private retiring?: Promise<void>;
	private cache?: CachedCorpus;
	private active?: ActiveSearch;
	private warmDeadline?: ReturnType<typeof setTimeout>;
	private ready = false;
	private stopped = false;
	private nextJob = 0;
	private failures = 0;
	private admitting = false;

	constructor(private readonly options: SearchSupervisorOptions) { super(); }

	get state() {
		return { ready: this.ready, warming: Boolean(this.child && !this.ready), busy: Boolean(this.active), corpusHash: this.cache?.hash ?? null, ownedChildPid: this.child?.pid ?? null };
	}

	private complete(error?: Error, response?: PublicSearchWorkerResponse) {
		const active = this.active;
		if (!active) return;
		this.active = undefined;
		clearTimeout(active.deadline);
		active.signal.removeEventListener("abort", active.abort);
		if (error) active.reject(error);
		else if (response) active.resolve(response);
	}

	private retire() {
		const child = this.child;
		if (!child) return this.retiring ?? Promise.resolve();
		this.child = undefined;
		this.ready = false;
		clearTimeout(this.warmDeadline);
		this.warmDeadline = undefined;
		this.retiring = new Promise<void>((resolve) => {
			if (!child.pid || child.exitCode !== null || child.signalCode !== null) {
				resolve();
			}
			else {
				child.once("exit", () => resolve());
				child.kill("SIGKILL");
			}
		});
		return this.retiring;
	}

	private fault() {
		this.failures++;
		this.complete(new SearchServiceUnavailableError());
		void this.retire();
		this.emit("fault");
	}

	private dispatch() {
		const active = this.active;
		if (!active || active.sent || !this.ready || !this.child || active.signal.aborted) return;
		active.sent = true;
		this.child.send({ kind: "rank", job: active.job, payload: active.payload }, (error) => {
			if (error && this.active === active) this.fault();
		});
	}

	private message(child: ChildProcess, value: unknown) {
		if (this.child !== child || this.stopped) return;
		try {
			const message = messageSchema.parse(value);
			if (message.kind === "fault") throw new SearchServiceUnavailableError();
			if (message.kind === "boot") {
				assert.ok(this.cache && !this.ready);
				child.send({ kind: "warm", corpusHash: this.cache.hash, corpus: this.cache.corpus, vectors: this.cache.vectors }, (error) => {
					if (error && this.child === child) this.fault();
				});
			}
			else if (message.kind === "warm") {
				assert.ok(this.cache && !this.ready);
				assert.equal(message.corpusHash, this.cache.hash);
				const passages = publicPassages(this.cache.corpus);
				assert.equal(message.vectors.length, passages.length);
				for (const [index, row] of message.vectors.entries()) {
					assert.equal(row.id, passages[index].id);
					assert.equal(row.slug, passages[index].slug);
					assert.ok(Math.abs(Math.hypot(...row.vector) - 1) < 0.001);
				}
				this.cache.vectors = message.vectors;
				this.ready = true;
				this.failures = 0;
				clearTimeout(this.warmDeadline);
				this.warmDeadline = undefined;
				this.emit("ready");
				this.dispatch();
			}
			else if (message.kind === "scoring") {
				if (this.active?.sent && this.active.job === message.job) this.emit("scoring", { job: message.job, ownedChildPid: child.pid });
			}
			else if (message.kind === "reply") {
				const active = this.active;
				if (!active || !active.sent || active.job !== message.job) return;
				assert.equal(message.response.corpusHash, active.payload.corpusHash);
				assert.equal(message.response.queryHash, active.payload.queryHash);
				assert.equal(message.response.referenceDate, active.payload.referenceDate);
				this.complete(undefined, message.response);
			}
		}
		catch { this.fault(); }
	}

	private async start() {
		await this.retiring;
		if (this.child || this.stopped || this.failures >= 3) return;
		const child = this.options.createChild?.() ?? fork(new URL("./child.js", import.meta.url), [this.options.modelDirectory], {
			execArgv: ["--max-old-space-size=512"],
			env: { NODE_ENV: "production", ONNXRUNTIME_NODE_INSTALL: "skip" },
			serialization: "advanced",
			stdio: ["ignore", "ignore", "ignore", "ipc"]
		});
		this.child = child;
		child.on("message", value => this.message(child, value));
		child.once("error", () => {
			if (this.child === child) this.fault();
		});
		child.once("exit", () => {
			if (this.child === child) this.fault();
		});
		this.warmDeadline = setTimeout(() => {
			if (this.child === child) this.fault();
		}, Math.max(1, Math.min(this.options.warmTimeoutMilliseconds ?? 600_000, 600_000)));
	}

	async rank(payload: PublicSearchWorkerRequest, signal: AbortSignal): Promise<PublicSearchWorkerResponse> {
		if (this.stopped || signal.aborted || this.active || this.admitting) throw new SearchServiceUnavailableError();
		this.admitting = true;
		try {
			if (this.cache?.hash !== payload.corpusHash) {
				await this.retire();
				this.cache = { hash: payload.corpusHash, corpus: payload.corpus };
				this.failures = 0;
			}
			await this.start();
			if (signal.aborted || this.stopped || !this.child || (!this.ready && !this.cache?.vectors)) throw new SearchServiceUnavailableError();
			return new Promise<PublicSearchWorkerResponse>((resolve, reject) => {
				const job = ++this.nextJob;
				const abort = () => {
					if (this.active?.job !== job) return;
					const sent = this.active.sent;
					this.complete(new SearchServiceUnavailableError());
					if (sent) void this.retire();
				};
				const deadline = setTimeout(abort, Math.max(1, Math.min(this.options.rankTimeoutMilliseconds ?? 7_500, 7_500)));
				this.active = { job, payload, signal, resolve, reject, abort, deadline, sent: false };
				signal.addEventListener("abort", abort, { once: true });
				if (signal.aborted) abort();
				else this.dispatch();
			});
		}
		finally { this.admitting = false; }
	}

	async close() {
		this.stopped = true;
		this.complete(new SearchServiceUnavailableError());
		await this.retire();
		this.cache = undefined;
		this.removeAllListeners();
	}
}
