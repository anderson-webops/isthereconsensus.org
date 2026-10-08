import type { SearchableClaim } from "./claimSearch.js";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { request } from "node:http";
import path from "node:path";
import { z } from "zod";
import { claimSearchLanguage, createClaimSearchIndex } from "./claimSearch.js";

export const PUBLIC_SEARCH_WORKER_PROTOCOL = 1;
export const PUBLIC_SEARCH_WORKER_CANDIDATE = "paragraph-source-scope-v4";
export const PUBLIC_SEARCH_WORKER_REQUEST_LIMIT = 4 * 1024 * 1024;
export const PUBLIC_SEARCH_WORKER_RESPONSE_LIMIT = 512 * 1024;

const digest = (value: string) => createHash("sha256").update(value).digest("hex");
const digestSchema = z.string().regex(/^[a-f0-9]{64}$/u);
const rowSchema = z.discriminatedUnion("kind", [
	z.object({ slug: z.string().min(1).max(240), kind: z.literal("native") }).strict(),
	z.object({
		slug: z.string().min(1).max(240),
		kind: z.literal("paragraph"),
		relevance: z.number().finite().min(0.8).max(1),
		cosine: z.number().finite().min(0.65).max(1.001)
	}).strict()
]);
const responseSchema = z.object({
	protocol: z.literal(PUBLIC_SEARCH_WORKER_PROTOCOL),
	candidate: z.literal(PUBLIC_SEARCH_WORKER_CANDIDATE),
	corpusHash: digestSchema,
	queryHash: digestSchema,
	referenceDate: z.iso.datetime(),
	rows: z.array(rowSchema).max(10_000)
}).strict();

export interface PublicSearchCorpusClaim extends SearchableClaim {
	status?: string;
}

export interface PublicSearchWorkerOptions {
	socketPath?: string;
	timeoutMilliseconds?: number;
}

export class PublicSearchStateUnavailableError extends Error {
	constructor() {
		super("Current public search state could not be verified.");
		this.name = "PublicSearchStateUnavailableError";
	}
}

export function publicSearchWorkerPayload<ClaimType extends PublicSearchCorpusClaim>(claims: ClaimType[], query: string, referenceDate: Date) {
	const corpus = claims
		.filter(claim => claim.status === "published")
		.map(claim => ({
			title: claim.title,
			slug: claim.slug,
			topicSlug: claim.topicSlug ?? "",
			status: "published" as const,
			bottomLine: claim.bottomLine ?? "",
			editorSummary: claim.editorSummary ?? "",
			stableCore: claim.stableCore ?? [],
			misconceptions: claim.misconceptions ?? [],
			misconceptionTags: claim.misconceptionTags ?? []
		}))
		.sort((left, right) => left.slug.localeCompare(right.slug));
	return {
		protocol: PUBLIC_SEARCH_WORKER_PROTOCOL,
		candidate: PUBLIC_SEARCH_WORKER_CANDIDATE,
		query,
		queryHash: digest(query),
		referenceDate: referenceDate.toISOString(),
		corpusHash: digest(JSON.stringify(corpus)),
		corpus
	};
}

function validSocketPath(value: string | undefined): value is string {
	return Boolean(value && path.isAbsolute(value) && path.normalize(value) === value && value.endsWith(".sock") && Buffer.byteLength(value) <= 100);
}

async function workerReply(socketPath: string, body: string, timeoutMilliseconds: number) {
	return new Promise<unknown>((resolve, reject) => {
		const controller = new AbortController();
		const deadline = setTimeout(() => controller.abort(), timeoutMilliseconds);
		const operation = request({
			socketPath,
			method: "POST",
			path: "/rank",
			agent: false,
			signal: controller.signal,
			headers: { "content-type": "application/json", "content-length": Buffer.byteLength(body) }
		}, (response) => {
			if (response.statusCode !== 200) {
				response.destroy();
				reject(new Error("Search worker is unavailable."));
				return;
			}
			const chunks: Buffer[] = [];
			let size = 0;
			response.on("data", (chunk: Buffer) => {
				size += chunk.length;
				if (size > PUBLIC_SEARCH_WORKER_RESPONSE_LIMIT) {
					response.destroy(new Error("Search worker response exceeds its bound."));
					return;
				}
				chunks.push(chunk);
			});
			response.on("end", () => {
				try {
					resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
				}
				catch {
					reject(new Error("Invalid search worker response."));
				}
			});
			response.on("error", reject);
		});
		operation.on("error", reject);
		operation.on("close", () => clearTimeout(deadline));
		operation.end(body);
	});
}

export function createPublicClaimSearch(options: PublicSearchWorkerOptions = {}) {
	const socketPath = options.socketPath;
	const timeoutMilliseconds = Math.max(1, Math.min(options.timeoutMilliseconds ?? 8_000, 8_000));
	let active = false;
	return async <ClaimType extends PublicSearchCorpusClaim>(claims: ClaimType[], query: string, referenceDate = new Date(), refresh?: () => Promise<ClaimType[]>) => {
		const publicClaims = claims.filter(claim => claim.status === "published");
		const native = createClaimSearchIndex(publicClaims)(query, referenceDate);
		if (!validSocketPath(socketPath) || !query.trim() || query.length > 160 || active || native[0]?.match.matchStrength === "exact" || claimSearchLanguage.isPersonalTreatmentDecision(query)) return native;
		const payload = publicSearchWorkerPayload(publicClaims, query, referenceDate);
		const body = JSON.stringify(payload);
		if (Buffer.byteLength(body) > PUBLIC_SEARCH_WORKER_REQUEST_LIMIT) return native;
		active = true;
		try {
			let reply: z.infer<typeof responseSchema> | undefined;
			try {
				reply = responseSchema.parse(await workerReply(socketPath, body, timeoutMilliseconds));
			}
			catch {
				reply = undefined;
			}
			let currentClaims = publicClaims;
			if (refresh) {
				try {
					currentClaims = (await refresh()).filter(claim => claim.status === "published");
				}
				catch {
					throw new PublicSearchStateUnavailableError();
				}
			}
			const currentNative = refresh ? createClaimSearchIndex(currentClaims)(query, referenceDate) : native;
			const currentPayload = refresh ? publicSearchWorkerPayload(currentClaims, query, referenceDate) : payload;
			if (!reply || reply.corpusHash !== payload.corpusHash || reply.queryHash !== payload.queryHash || reply.referenceDate !== payload.referenceDate || currentPayload.corpusHash !== payload.corpusHash) return currentNative;
			const bySlug = new Map(currentClaims.map(claim => [claim.slug, claim]));
			const nativeBySlug = new Map(currentNative.map(row => [row.claim.slug, row]));
			const seen = new Set<string>();
			const results: typeof native = [];
			for (const row of reply.rows) {
				const claim = bySlug.get(row.slug);
				if (!claim || seen.has(row.slug)) return currentNative;
				seen.add(row.slug);
				if (row.kind === "native") {
					const original = nativeBySlug.get(row.slug);
					if (!original) return currentNative;
					results.push(original);
				}
				else {
					results.push({
						claim,
						rankingScore: row.relevance * 100,
						match: { matchStrength: "related", matchScore: Math.round(row.relevance * 100), matchReason: "Related public source paragraph; check the review's scope" }
					});
				}
			}
			return results;
		}
		finally { active = false; }
	};
}
