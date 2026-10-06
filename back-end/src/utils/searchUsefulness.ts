import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { z } from "zod";

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u).max(200);
const destination = z.object({ topicSlug: slug, claimSlug: slug }).strict();
const question = z.object({
	id: z.string().regex(/^[\w-]+$/u).max(80),
	query: z.string().min(2).max(160).refine(value => value === value.trim()),
	classification: z.enum(["covered", "partial", "gap", "outside"]),
	expected: z.array(destination).max(10)
}).strict().superRefine((value, context) => {
	if (/\b(?:authorization|cookie|set-cookie)\s*:|\bbearer\s+[\w.~+/-]{8,}|\b(?:password|token|secret|session)\s*[:=]\s*\S+/iu.test(value.query)) context.addIssue({ code: "custom", message: "Credential-like query content is not permitted." });
	if (new Set(value.expected.map(target => `${target.topicSlug}/${target.claimSlug}`)).size !== value.expected.length) context.addIssue({ code: "custom", message: "Expected destinations cannot repeat." });
	if (value.classification === "covered" && !value.expected.length) context.addIssue({ code: "custom", message: "Covered questions require a preassigned destination." });
	if (["gap", "outside"].includes(value.classification) && value.expected.length) context.addIssue({ code: "custom", message: "Gap and outside questions cannot have expected answers." });
});
const datasetSchema = z.object({
	schemaVersion: z.literal(1),
	publicQueries: z.literal(true),
	provenance: z.object({
		kind: z.enum(["development", "fresh-candidate"]),
		author: z.enum(["assistant", "human", "external"]),
		contextExposure: z.enum(["development", "unexposed"]),
		frozenAt: z.iso.datetime(),
		baselineSourceCommit: z.string().regex(/^[a-f0-9]{40}$/u)
	}).strict(),
	questions: z.array(question).min(1).max(200)
}).strict().superRefine((value, context) => {
	if (new Set(value.questions.map(item => item.id)).size !== value.questions.length) context.addIssue({ code: "custom", message: "Question identifiers must be unique." });
	if (new Set(value.questions.map(item => item.query.toLowerCase())).size !== value.questions.length) context.addIssue({ code: "custom", message: "Question wording must be unique." });
	if (value.provenance.kind === "fresh-candidate" && value.provenance.contextExposure !== "unexposed") context.addIssue({ code: "custom", message: "Development questions cannot be labelled fresh." });
});
const searchResponse = z.object({ claims: z.array(z.object({ slug, title: z.string().min(1), topic: z.object({ slug }) })).max(500) });
const articleResponse = z.object({ claim: z.object({
	slug,
	status: z.literal("published"),
	title: z.string().trim().min(1),
	bottomLine: z.string().trim().min(1),
	topic: z.object({ slug }),
	sources: z.array(z.object({ url: z.url({ protocol: /^https?$/u }) })).min(1)
}) });

export type SearchUsefulnessDataset = z.infer<typeof datasetSchema>;
export type SearchUsefulnessDestination = z.infer<typeof destination>;
export interface SearchUsefulnessOptions {
	fetch?: typeof fetch;
	intervalMs?: number;
	now?: () => Date;
}

export function parseSearchUsefulnessDataset(value: unknown): SearchUsefulnessDataset {
	const dataset = datasetSchema.safeParse(value);
	if (!dataset.success) throw new Error("Invalid evaluation dataset. Use the documented strict public-question schema.");
	return dataset.data;
}

export function normalizeSearchEvaluationOrigin(value: string) {
	const origin = new URL(value);
	const local = ["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname);
	if (origin.username || origin.password || origin.search || origin.hash || origin.pathname !== "/"
		|| (local ? !["http:", "https:"].includes(origin.protocol) : origin.protocol !== "https:" || origin.hostname !== "isthereconsensus.org")) {
		throw new Error("Evaluation origin must be the public site or a loopback HTTP(S) origin, without credentials or a path.");
	}
	return { origin: origin.origin, local };
}

function canonicalPath(target: SearchUsefulnessDestination) {
	return `/consensus/${target.topicSlug}/${target.claimSlug}`;
}

function visibleText(html: string) {
	const entities: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: "\"", apos: "'", nbsp: " " };
	return html
		.replace(/<!--[\s\S]*?-->|<(script|style|template|head)\b[^>]*>[\s\S]*?<\/\1>/giu, "")
		.replace(/<[^>]*>/gu, " ")
		.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/giu, (_match, entity: string) => {
			if (!entity.startsWith("#")) return entities[entity.toLowerCase()];
			const code = entity.toLowerCase().startsWith("#x") ? Number.parseInt(entity.slice(2), 16) : Number.parseInt(entity.slice(1), 10);
			return code <= 0x10FFFF ? String.fromCodePoint(code) : "";
		})
		.normalize("NFKC")
		.replace(/\s+/gu, " ")
		.trim();
}

export async function evaluateSearchUsefulness(input: unknown, originValue: string, options: SearchUsefulnessOptions = {}) {
	const dataset = parseSearchUsefulnessDataset(input);
	const { origin, local } = normalizeSearchEvaluationOrigin(originValue);
	const intervalMs = options.intervalMs ?? 3000;
	if (!Number.isFinite(intervalMs) || intervalMs < (local ? 0 : 3000)) throw new Error("Public evaluation requires at least 3000 milliseconds between questions.");
	const request = options.fetch ?? fetch;
	const now = options.now ?? (() => new Date());
	const maximumBytes = 2 * 1024 * 1024;
	let lastRequestAt = 0;
	async function get(path: string, accepts: string) {
		if (!local && lastRequestAt) await delay(Math.max(0, 250 - (Date.now() - lastRequestAt)));
		lastRequestAt = Date.now();
		try {
			const response = await request(new URL(path, origin), { method: "GET", credentials: "omit", redirect: "manual", headers: { Accept: accepts }, signal: AbortSignal.timeout(10_000) });
			if (response.status !== 200) {
				await response.body?.cancel();
				return { ok: false as const, reason: `http-${response.status}` };
			}
			if (!response.body) return { ok: false as const, reason: "empty-response" };
			const reader = response.body.getReader();
			const chunks: Uint8Array[] = [];
			let length = 0;
			while (true) {
				const chunk = await reader.read();
				if (chunk.done) break;
				length += chunk.value.byteLength;
				if (length > maximumBytes) {
					await reader.cancel();
					return { ok: false as const, reason: "oversized-response" };
				}
				chunks.push(chunk.value);
			}
			return { ok: true as const, text: Buffer.concat(chunks).toString("utf8") };
		}
		catch {
			return { ok: false as const, reason: "transport-unavailable" };
		}
	}
	async function getJson(path: string) {
		const response = await get(path, "application/json");
		if (!response.ok) return response;
		try {
			return { ok: true as const, value: JSON.parse(response.text) as unknown };
		}
		catch { return { ok: false as const, reason: "invalid-json" }; }
	}
	const deploymentResponse = await getJson("/deployment.json");
	const releaseRef = z.string().regex(/^v?\d+\.\d+\.\d+$/u);
	const deploymentSchema = z.object({
		version: releaseRef.optional(),
		ref: releaseRef.optional(),
		commit: z.string().regex(/^[a-f0-9]{12,40}$/u)
	}).refine(value => Boolean(value.version || value.ref) && (!value.version || !value.ref || value.version === value.ref)).transform(value => ({ version: value.version ?? value.ref!, commit: value.commit }));
	const deployment = deploymentResponse.ok ? deploymentSchema.safeParse(deploymentResponse.value) : null;
	const deploymentObservation = {
		frontend: deployment?.success ? deployment.data : null,
		reason: deployment?.success ? "observed-frontend-identity-only" : deploymentResponse.ok ? "invalid-deployment-response" : deploymentResponse.reason
	};
	const destinations = new Map<string, { readable: boolean; reason: string }>();
	async function probe(target: SearchUsefulnessDestination) {
		const path = canonicalPath(target);
		const previous = destinations.get(path);
		if (previous) return previous;
		const response = await getJson(`/api/topics/${target.topicSlug}/claims/${target.claimSlug}`);
		let result = { readable: false, reason: response.ok ? "invalid-public-article" : response.reason };
		if (response.ok) {
			const article = articleResponse.safeParse(response.value);
			if (article.success && article.data.claim.slug === target.claimSlug && article.data.claim.topic.slug === target.topicSlug) {
				const page = await get(path, "text/html");
				if (!page.ok) {
					result = { readable: false, reason: page.reason };
				}
				else {
					const withoutInert = page.text.replace(/<!--[\s\S]*?-->|<(script|style|template|head)\b[^>]*>[\s\S]*?<\/\1>/giu, "");
					const headings = [...withoutInert.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/giu)].map(match => visibleText(match[1]));
					const body = visibleText(withoutInert);
					const normalizePublicText = (text: string) => text.normalize("NFKC").replace(/\s+/gu, " ").trim();
					const readable = headings.includes(normalizePublicText(article.data.claim.title)) && body.includes(normalizePublicText(article.data.claim.bottomLine));
					result = { readable, reason: readable ? "public-api-and-rendered-content" : "rendered-content-mismatch" };
				}
			}
		}
		destinations.set(path, result);
		return result;
	}
	const rows = [];
	for (const [position, item] of dataset.questions.entries()) {
		if (position) await delay(intervalMs);
		const expected: Array<{ path: string; readable: boolean; reason: string }> = [];
		for (const target of item.expected) expected.push({ path: canonicalPath(target), ...await probe(target) });
		const endpoints = [];
		for (const name of ["directory", "suggestions"] as const) {
			const parameters = new URLSearchParams({ q: item.query });
			if (name === "directory") parameters.set("limit", "3");
			const response = await getJson(`${name === "directory" ? "/api/claims" : "/api/search/suggestions"}?${parameters}`);
			const parsed = response.ok ? searchResponse.safeParse(response.value) : null;
			if (!parsed?.success) {
				endpoints.push({ name, available: false, reason: response.ok ? "invalid-search-response" : response.reason, topThree: [], hit: false, empty: false });
				continue;
			}
			const topThree = [];
			for (const candidate of parsed.data.claims.slice(0, 3)) {
				const target = { topicSlug: candidate.topic.slug, claimSlug: candidate.slug };
				topThree.push({ path: canonicalPath(target), ...await probe(target) });
			}
			const hit = topThree.some(candidate => candidate.readable && expected.some(target => target.readable && candidate.path === target.path));
			endpoints.push({ name, available: true, reason: "ok", topThree, hit, empty: !parsed.data.claims.length });
		}
		rows.push({ id: item.id, query: item.query, classification: item.classification, expected, endpoints });
	}
	const covered = rows.filter(row => row.classification === "covered");
	const outside = rows.filter(row => row.classification === "outside");
	const endpointScores = ["directory", "suggestions"].map((name) => {
		const coveredHits = covered.filter(row => row.endpoints.find(endpoint => endpoint.name === name)?.hit).length;
		const outsideEmpty = outside.filter(row => row.endpoints.find(endpoint => endpoint.name === name)?.empty).length;
		return { name, coveredHits, coveredTotal: covered.length, coveredPercent: covered.length ? coveredHits * 100 / covered.length : null, outsideEmpty, outsideTotal: outside.length };
	});
	const unavailable = rows.filter(row => row.endpoints.some(endpoint => !endpoint.available)).map(row => row.id);
	const unreadable = [...destinations].filter(([, result]) => !result.readable).map(([path, result]) => ({ path, reason: result.reason }));
	return {
		schemaVersion: 1,
		checkedAt: now().toISOString(),
		origin,
		deploymentObservation,
		datasetSha256: createHash("sha256").update(JSON.stringify(dataset)).digest("hex"),
		provenance: dataset.provenance,
		limitations: "Mechanical public retrieval and rendered-text check only. Provenance is declared, not independently certified. Scientific relevance, comprehensibility, visual accessibility, and freshness require separate review.",
		counts: { covered: covered.length, partial: rows.filter(row => row.classification === "partial").length, gaps: rows.filter(row => row.classification === "gap").length, outside: outside.length },
		endpointScores,
		unavailable,
		unreadable,
		mechanicalGatePassed: covered.length > 0 && outside.length > 0 && !unavailable.length && !unreadable.length && endpointScores.every(score => score.coveredPercent! >= 90 && score.outsideEmpty === score.outsideTotal),
		rows
	};
}
