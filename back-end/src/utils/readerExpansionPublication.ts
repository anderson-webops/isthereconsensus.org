import type { ReaderExpansionSourceProposal } from "./readerExpansionProposal.js";
import { Buffer } from "node:buffer";
import { setTimeout as delay } from "node:timers/promises";
import { readerExpansionClaims } from "../data/claim-expansion-reader.js";
import { defaultClaims } from "../data/claims.js";
import { normalizeCitationStatusSources } from "./citationStatusSources.js";
import { createReaderExpansionSourceProposal, readerExpansionValueHash } from "./readerExpansionProposal.js";

export type ReaderExpansionEditorialApi = (path: string, options?: { method?: "GET" | "POST" | "PATCH"; body?: Record<string, unknown>; anonymous?: boolean }) => Promise<{ status: number; data: unknown }>;

export interface ReaderExpansionEditorialPlan {
	schemaVersion: 1;
	sourceCommit: string;
	proposalDataSha256: string;
	preparedAt: string;
	adminId: string;
	rows: { canonicalPath: string; claimId: string | null; sourceIds: string[]; status: "missing" | "draft" | "published"; snapshotSha256: string }[];
}

export interface ReaderExpansionPublicationApproval {
	sourceCommit: string;
	planSha256: string;
	backupSha256: string;
	restoreVerificationSha256: string;
	rehearsalReceiptSha256: string;
	backendArtifactSha256: string;
	operatorApprovalRef: string;
	reviewedAt: string;
}

export interface ReaderExpansionPublicationEvent {
	state: "pending" | "confirmed" | "already_published";
	operation: "create" | "source" | "edit" | "publish" | "readback";
	canonicalPath: string;
	claimId?: string;
	sourceId?: string;
	sourceIndex?: number;
}

export class ReaderExpansionPublicationConflict extends Error {}

export function createReaderExpansionEditorialApi(adminOrigin: string, cookieHeader: string, publicOrigin = adminOrigin, transport: typeof fetch = fetch): ReaderExpansionEditorialApi {
	const local = new URL(adminOrigin);
	const publicUrl = new URL(publicOrigin);
	const isLoopback = (url: URL) => ["127.0.0.1", "[::1]"].includes(url.hostname) && ["http:", "https:"].includes(url.protocol);
	const isOrigin = (url: URL) => !url.username && !url.password && url.pathname === "/" && !url.search && !url.hash;
	requireCondition(isLoopback(local) && isOrigin(local), "Authenticated editorial requests require an operator-local loopback origin.");
	requireCondition(isOrigin(publicUrl) && (isLoopback(publicUrl) || publicUrl.origin === "https://isthereconsensus.org"), "Anonymous acceptance requires the public site or isolated loopback origin.");
	requireCondition(typeof cookieHeader === "string" && cookieHeader.length > 0 && cookieHeader.length <= 16384 && !/[\r\n]/u.test(cookieHeader), "An existing private administrator session is required.");
	return async (path, options = {}) => {
		requireCondition(path.startsWith("/") && !path.startsWith("//") && !/[\\\r\n#]/u.test(path), "Editorial paths must remain origin-relative.");
		const origin = options.anonymous ? publicUrl.origin : local.origin;
		const method = options.method ?? "GET";
		requireCondition(!options.anonymous || method === "GET", "Anonymous acceptance cannot mutate records.");
		try {
			const send = () => transport(`${origin}/api${path}`, {
				method,
				redirect: "error",
				credentials: "omit",
				cache: "no-store",
				signal: AbortSignal.timeout(30000),
				headers: { Accept: "application/json", ...(options.anonymous ? {} : { Cookie: cookieHeader, Origin: publicUrl.origin }), ...(options.body ? { "Content-Type": "application/json" } : {}) },
				...(options.body ? { body: JSON.stringify(options.body) } : {})
			});
			let response = await send();
			if (response.status === 429) {
				const seconds = Number(response.headers.get("retry-after"));
				requireCondition(Number.isInteger(seconds) && seconds > 0 && seconds <= 60, "The rate-limit delay is unavailable or outside its bound.");
				await response.body?.cancel();
				await delay((seconds + 1) * 1000);
				response = await send();
				requireCondition(response.status !== 429, "The bounded rate-limit retry was not accepted.");
			}
			const limit = 32 * 1024 * 1024;
			requireCondition(!response.headers.get("content-length") || Number(response.headers.get("content-length")) <= limit, "Editorial response exceeds its bound.");
			const reader = response.body?.getReader();
			requireCondition(reader, "Editorial response body is unavailable.");
			const chunks = [];
			let size = 0;
			try {
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					size += value.byteLength;
					requireCondition(size <= limit, "Editorial response exceeds its bound.");
					chunks.push(value);
				}
			}
			finally { await reader.cancel(); }
			return { status: response.status, data: JSON.parse(Buffer.concat(chunks).toString("utf8")) };
		}
		catch { throw new ReaderExpansionPublicationConflict("Editorial transport failed. Read back pending operations before retrying."); }
	};
}

function requireCondition(condition: unknown, message: string): asserts condition {
	if (!condition) throw new ReaderExpansionPublicationConflict(message);
}

function record(value: unknown): Record<string, unknown> {
	requireCondition(value !== null && typeof value === "object" && !Array.isArray(value), "Editorial response must be an object.");
	return value as Record<string, unknown>;
}

function identifier(value: unknown): string {
	requireCondition(typeof value === "string" && /^[a-f\d]{24}$/u.test(value), "Observed editorial identity is invalid.");
	return value;
}

async function request(api: ReaderExpansionEditorialApi, path: string, options?: Parameters<ReaderExpansionEditorialApi>[1], expected = 200) {
	let response;
	try {
		response = await api(path, options);
	}
	catch { throw new ReaderExpansionPublicationConflict("Editorial request was not confirmed. Stop and read back before another write."); }
	requireCondition(response.status === expected, "Editorial request was not confirmed. Stop and read back before another write.");
	return record(response.data);
}

function validateProposal(proposal: ReaderExpansionSourceProposal) {
	const expected = createReaderExpansionSourceProposal(readerExpansionClaims, defaultClaims, { commit: proposal.sourceCommit, tree: proposal.sourceTree }, new Date(proposal.generatedAt));
	requireCondition(readerExpansionValueHash(proposal) === readerExpansionValueHash(expected), "The complete proposal must match the executing source definitions.");
}

function projectedValue(actual: unknown, expected: unknown): unknown {
	if (Array.isArray(expected)) {
		requireCondition(Array.isArray(actual) && actual.length === expected.length, "Editorial array contents differ from the approved source.");
		return expected.map((item, index) => projectedValue(actual[index], item));
	}
	if (expected !== null && typeof expected === "object") {
		const values = record(actual);
		return Object.fromEntries(Object.entries(expected).map(([key, value]) => [key, projectedValue(values[key], value)]));
	}
	return actual;
}

function verifyClaim(actual: Record<string, unknown>, target: ReaderExpansionSourceProposal["targets"][number], anonymous = false) {
	const expected = Object.fromEntries(Object.entries(target.createPayload).filter(([key]) => !anonymous || key !== "surveillanceSpec"));
	const comparable = { ...actual, topic: record(actual.topic).slug };
	requireCondition(readerExpansionValueHash(projectedValue(comparable, expected)) === readerExpansionValueHash(expected), "Canonical identity or complete review content differs from the approved source.");
}

function verifySources(actual: unknown, target: ReaderExpansionSourceProposal["targets"][number]) {
	requireCondition(Array.isArray(actual) && actual.length === target.sourcePayloads.length, "Ordered citations differ from the approved source.");
	return actual.map((value, index) => {
		const source = record(value);
		const desired = target.sourcePayloads[index];
		const existingLabels = Array.isArray(source.statusSources) ? source.statusSources as string[] : [];
		const expected = { ...desired, statusSources: normalizeCitationStatusSources(desired.statusSources ?? [], existingLabels) };
		requireCondition(readerExpansionValueHash(projectedValue(source, expected)) === readerExpansionValueHash(expected), "Citation content, notices or ordering differs from the approved source.");
		return identifier(source._id);
	});
}

async function observedClaim(api: ReaderExpansionEditorialApi, claimId: string) {
	const response = await request(api, `/editorial/claims/${claimId}`);
	const claim = record(response.claim);
	requireCondition(identifier(claim._id) === claimId, "Editorial read returned a different claim identity.");
	const sources = await request(api, `/editorial/claims/${claimId}/sources`);
	return { claim, sources: sources.sources };
}

export async function prepareReaderExpansionEditorialPlan(proposal: ReaderExpansionSourceProposal, api: ReaderExpansionEditorialApi, preparedAt = new Date()): Promise<ReaderExpansionEditorialPlan> {
	validateProposal(proposal);
	requireCondition(Number.isFinite(preparedAt.getTime()), "A valid plan date is required.");
	const session = await request(api, "/auth/me");
	requireCondition(session.currentUser === null, "A current unambiguous administrator session is required.");
	const adminId = identifier(record(session.currentAdmin)._id);
	const inventory = await request(api, "/editorial/claims");
	requireCondition(Array.isArray(inventory.claims), "The complete editorial inventory is required.");
	const rows: ReaderExpansionEditorialPlan["rows"] = [];
	for (const target of proposal.targets) {
		const matches = inventory.claims.map(record).filter(claim => claim.slug === target.createPayload.slug && record(claim.topic).slug === target.createPayload.topic);
		requireCondition(matches.length <= 1, "Duplicate canonical editorial records require operator reconciliation.");
		if (!matches.length) {
			rows.push({ canonicalPath: target.canonicalPath, claimId: null, sourceIds: [], status: "missing", snapshotSha256: readerExpansionValueHash(null) });
			continue;
		}
		const claimId = identifier(matches[0]._id);
		const observed = await observedClaim(api, claimId);
		requireCondition(observed.claim.status === "draft" || observed.claim.status === "published", "Existing non-draft/non-published reviews require operator reconciliation.");
		verifyClaim(observed.claim, target);
		const sourceIds = verifySources(observed.sources, target);
		if (observed.claim.status === "published") {
			const publicClaim = record((await request(api, target.publicApiPath.replace(/^\/api/u, ""), { anonymous: true })).claim);
			requireCondition(identifier(publicClaim._id) === claimId && publicClaim.status === "published", "Matching publication is not anonymously available.");
			verifyClaim(publicClaim, target, true);
			requireCondition(readerExpansionValueHash(verifySources(publicClaim.sources, target)) === readerExpansionValueHash(sourceIds), "Anonymous citation identities differ from the editorial records.");
		}
		rows.push({ canonicalPath: target.canonicalPath, claimId, sourceIds, status: observed.claim.status, snapshotSha256: readerExpansionValueHash(observed) });
	}
	const claimIds = rows.flatMap(row => row.claimId === null ? [] : [row.claimId]);
	const sourceIds = rows.flatMap(row => row.sourceIds);
	requireCondition(new Set(claimIds).size === claimIds.length && new Set(sourceIds).size === sourceIds.length, "Existing editorial identities must be distinct before any mutation.");
	return { schemaVersion: 1, sourceCommit: proposal.sourceCommit, proposalDataSha256: proposal.proposalDataSha256, preparedAt: preparedAt.toISOString(), adminId, rows };
}

export async function publishReaderExpansionEditorialPlan(
	proposal: ReaderExpansionSourceProposal,
	plan: ReaderExpansionEditorialPlan,
	approval: ReaderExpansionPublicationApproval,
	api: ReaderExpansionEditorialApi,
	journal: (event: ReaderExpansionPublicationEvent) => Promise<void>,
	now = new Date()
) {
	validateProposal(proposal);
	requireCondition(approval.sourceCommit === proposal.sourceCommit && plan.sourceCommit === proposal.sourceCommit, "Approval and plan must bind the exact proposal source.");
	for (const value of [approval.planSha256, approval.backupSha256, approval.restoreVerificationSha256, approval.rehearsalReceiptSha256, approval.backendArtifactSha256]) requireCondition(/^[a-f\d]{64}$/u.test(value), "Reviewed backup, restore, rehearsal, artifact and plan digests are required.");
	requireCondition(typeof approval.operatorApprovalRef === "string" && approval.operatorApprovalRef.trim().length >= 20 && approval.operatorApprovalRef.length <= 500, "An explicit protected operator approval reference is required.");
	const preparedAt = new Date(plan.preparedAt);
	const reviewedAt = new Date(approval.reviewedAt);
	requireCondition(Number.isFinite(now.getTime()) && Number.isFinite(preparedAt.getTime()) && preparedAt <= now && now.getTime() - preparedAt.getTime() <= 86400000, "The reviewed plan is stale or invalid.");
	requireCondition(Number.isFinite(reviewedAt.getTime()) && reviewedAt <= now, "Supply the actual completed editorial assessment date, not a generated future date.");
	requireCondition(readerExpansionValueHash(plan) === approval.planSha256, "The reviewed plan digest differs.");
	const current = await prepareReaderExpansionEditorialPlan(proposal, api, preparedAt);
	requireCondition(readerExpansionValueHash(current) === approval.planSha256, "Editorial state or authenticated actor changed after preview; reconcile a new plan.");
	const results = [];
	for (const [index, target] of proposal.targets.entries()) {
		const planned = current.rows[index];
		let claimId = planned.claimId;
		const expectedSourceIds = [...planned.sourceIds];
		const write = async (operation: "create" | "source" | "edit" | "publish", path: string, body: Record<string, unknown>, sourceIndex?: number) => {
			const event = { operation, canonicalPath: target.canonicalPath, ...(claimId ? { claimId } : {}), ...(sourceIndex === undefined ? {} : { sourceIndex }) };
			await journal({ ...event, state: "pending" });
			const data = await request(api, path, { method: operation === "edit" ? "PATCH" : "POST", body }, operation === "create" || operation === "source" ? 201 : 200);
			const observedId = identifier(record(operation === "source" ? data.source : data.claim)._id);
			if (operation !== "source") {
				requireCondition(claimId === null || claimId === observedId, "Mutation returned a different observed identity.");
				claimId = observedId;
			}
			else {
				expectedSourceIds.push(observedId);
			}
			await journal({ ...event, state: "confirmed", claimId: claimId!, ...(operation === "source" ? { sourceId: observedId } : {}) });
			return data;
		};
		if (planned.status === "missing") {
			const created = await write("create", "/editorial/claims", target.createPayload);
			requireCondition(record(created.claim).status === "draft", "Creation did not return a private draft.");
			verifyClaim(record(created.claim), target);
			for (const [sourceIndex, source] of target.sourcePayloads.entries()) await write("source", `/editorial/claims/${claimId}/sources`, source, sourceIndex);
			const edited = await write("edit", `/editorial/claims/${claimId}`, target.createPayload);
			verifyClaim(record(edited.claim), target);
		}
		requireCondition(claimId !== null, "A canonical observed claim identity is required.");
		if (planned.status !== "published") {
			const observed = await observedClaim(api, claimId);
			requireCondition(observed.claim.status === "draft", "The draft status changed before publication.");
			if (planned.status === "draft") requireCondition(readerExpansionValueHash(observed) === planned.snapshotSha256, "An existing draft changed during the batch; reconcile it before publication.");
			verifyClaim(observed.claim, target);
			requireCondition(readerExpansionValueHash(verifySources(observed.sources, target)) === readerExpansionValueHash(expectedSourceIds), "Ordered citation identities changed before publication.");
			const published = await write("publish", `/editorial/claims/${claimId}/publish`, { revisionNote: "Protected reader-expansion editorial assessment; source qualifications retained. No independent expert review is implied.", lastReviewedAt: reviewedAt.toISOString() });
			requireCondition(record(published.claim).status === "published", "Publication was not confirmed.");
			verifyClaim(record(published.claim), target);
		}
		else {
			await journal({ state: "already_published", operation: "readback", canonicalPath: target.canonicalPath, claimId });
		}
		const article = record((await request(api, target.publicApiPath.replace(/^\/api/u, ""), { anonymous: true })).claim);
		requireCondition(identifier(article._id) === claimId && article.status === "published", "Canonical anonymous publication readback failed.");
		verifyClaim(article, target, true);
		const sourceIds = verifySources(article.sources, target);
		requireCondition(readerExpansionValueHash(sourceIds) === readerExpansionValueHash(expectedSourceIds), "Ordered citation identities changed during public readback.");
		await journal({ state: "confirmed", operation: "readback", canonicalPath: target.canonicalPath, claimId });
		results.push({ canonicalPath: target.canonicalPath, claimId, sourceIds, disposition: planned.status === "published" ? "already_matching" : "published" });
	}
	const catalog = await request(api, "/claims?limit=1", { anonymous: true });
	const catalogTotal = record(catalog.pagination).total;
	requireCondition(new Set(results.map(row => row.claimId)).size === proposal.proposalClaimCount, "The batch does not contain distinct observed review identities.");
	requireCondition(new Set(results.flatMap(row => row.sourceIds)).size === proposal.proposalCitationCount, "The batch does not contain distinct observed citation identities.");
	requireCondition(typeof catalogTotal === "number" && catalogTotal >= proposal.publicAcceptanceMinimum, "The public catalog has not reached the required publication threshold.");
	return { artifactKind: "reader-expansion-authenticated-api-batch-readback", sourceCommit: proposal.sourceCommit, proposalDataSha256: proposal.proposalDataSha256, planSha256: approval.planSha256, completedAt: new Date().toISOString(), canonicalReviews: results.length, orderedCitations: results.reduce((total, row) => total + row.sourceIds.length, 0), catalogTotal, results, fullPrivateStatePreservationVerified: false, renderedPagesVerified: false, independentExpertReviewClaimed: false };
}
