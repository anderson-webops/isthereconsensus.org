import type { ClientSession } from "mongoose";
import type { CompleteSeedClaim } from "../data/claims.js";
import type { IClaim } from "../models/schemas/Claim.js";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import mongoose from "mongoose";
import { z } from "zod";
import { claimsBeforeLivingRefresh, defaultClaims } from "../data/claims.js";
import { seedClaimFields } from "../data/seedClaims.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimRefreshPromotion } from "../models/schemas/ClaimRefreshPromotion.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { Topic } from "../models/schemas/Topic.js";
import { getPublicClaimReadiness, summarizeClaimSourceReadiness } from "./publicClaimReadiness.js";
import { seedReaderAnnouncementSchema } from "./seedReaderAnnouncement.js";
import { normalizeDoi, strongerCitationStatus } from "./sourceIntegrity.js";

type Row = Record<string, unknown>;
interface Snapshot { key: string; claim: Row; sources: Row[] }
interface Change {
	key: string;
	claimId: string;
	claimSet: Row;
	historyAppend: Row[];
	announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]>;
	sources: Array<{ id: string | null; set: Row }>;
}
export interface RefreshPlan {
	version: 1;
	preparedAt: string;
	database: string;
	selection: string[];
	definitionHash: string;
	before: Snapshot[];
	changes: Change[];
}

export class RefreshConflict extends Error {
	constructor(message: string) {
		super(message);
		this.name = "RefreshConflict";
	}
}

function requireCondition(condition: unknown, message: string): asserts condition {
	if (!condition) throw new RefreshConflict(message);
}

// Preserve IDs, dates, private fields and revisions in the reviewed fingerprint.
export function canonicalRefreshJSON(value: unknown): string {
	const plain = JSON.parse(JSON.stringify(value));
	function sort(entry: unknown): unknown {
		if (Array.isArray(entry)) return entry.map(sort);
		if (entry && typeof entry === "object") {
			return Object.fromEntries(Object.entries(entry).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, sort(item)]));
		}
		return entry;
	}
	return JSON.stringify(sort(plain));
}
export function refreshDigest(value: unknown) {
	return createHash("sha256").update(canonicalRefreshJSON(value)).digest("hex");
}
function plainRow(value: unknown): Row {
	return JSON.parse(canonicalRefreshJSON(value));
}
function equal(a: unknown, b: unknown) {
	return canonicalRefreshJSON(a ?? null) === canonicalRefreshJSON(b ?? null);
}
function semantic(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(semantic);
	if (value && typeof value === "object") {
		return Object.fromEntries(Object.entries(value).filter(([key]) => key !== "_id").map(([key, item]) => [key, semantic(item)]));
	}
	return value;
}
function key(seed: CompleteSeedClaim) {
	return `${seed.topicSlug}/${seed.slug}`;
}
export const registeredRefreshes = claimsBeforeLivingRefresh.flatMap((before, index) => {
	const after = defaultClaims[index]!;
	return after !== before ? [{ key: key(before), before, after }] : [];
});
const selectionSchema = z.array(z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+$/)).min(1).max(20);
function definitions(selection: string[]) {
	selectionSchema.parse(selection);
	requireCondition(new Set(selection).size === selection.length, "Duplicate review selection.");
	return [...selection].sort().map((selected) => {
		const definition = registeredRefreshes.find(entry => entry.key === selected);
		requireCondition(definition, `Unregistered refresh: ${selected}`);
		return definition;
	});
}

function identity(source: Row): string {
	const doi = normalizeDoi(source.doi);
	if (doi) return `doi:${doi}`;
	if (typeof source.pmid === "string" && /^\d+$/.test(source.pmid)) return `pmid:${source.pmid}`;
	if (typeof source.pmcid === "string" && /^PMC\d+$/i.test(source.pmcid)) return `pmcid:${source.pmcid.toUpperCase()}`;
	try {
		const url = new URL(String(source.url));
		requireCondition(["https:", "http:"].includes(url.protocol), "Invalid citation URL.");
		return `url:${url.href}`;
	}
	catch { throw new RefreshConflict("Every source needs a stable DOI, PMID, PMCID or URL."); }
}
const sourceFields = ["kind", "title", "publisher", "year", "url", "doi", "pmid", "pmcid", "isAnchor", "appraisal", "stance", "note", "order"];
function sourceValues(source: unknown): Row {
	const hydrated = plainRow(new ClaimSource(source).toObject());
	return Object.fromEntries(sourceFields.map(field => [field, hydrated[field] ?? null]));
}
function assertBaseline(current: Row, baseline: Row, label: string) {
	for (const [field, expected] of Object.entries(baseline)) {
		requireCondition(equal(semantic(current[field]), semantic(expected)), `${label}: editorial divergence in ${field}; use the editorial workflow.`);
	}
}
function laterDate(a: unknown, b: unknown): string | undefined {
	const values = [a, b].filter(value => typeof value === "string" && Number.isFinite(Date.parse(value))) as string[];
	return values.sort((left, right) => Date.parse(left) - Date.parse(right)).at(-1);
}
function status(row: Row) {
	const profile = row.evidenceProfile as IClaimSource["evidenceProfile"] | undefined;
	const integrity = profile?.publicationIntegrity;
	const flag = integrity?.retracted ? "retracted" : integrity?.expressionOfConcern ? "expression_of_concern" : integrity?.correctionOrErratum ? "corrected" : "current";
	return strongerCitationStatus(row.citationStatus as IClaimSource["citationStatus"] ?? "current", flag);
}

export async function planClaimRefresh(snapshot: Snapshot, before: CompleteSeedClaim, after: CompleteSeedClaim): Promise<Change> {
	const { claim, sources } = snapshot;
	requireCondition(claim.status === "published", `${snapshot.key}: only already-published reviews can be refreshed.`);
	const workflow = (claim.evidenceLandscape as IClaim["evidenceLandscape"] | undefined)?.workflow;
	requireCondition(!workflow?.reviewedById && !workflow?.approvedById && ["not_started", "draft", "changes_requested"].includes(workflow?.status ?? "not_started") && !(claim.evidenceLandscape as IClaim["evidenceLandscape"] | undefined)?.publicFlags?.showEvidenceLandscape, `${snapshot.key}: active landscape review requires the editorial workflow.`);
	const beforeFields = plainRow(seedClaimFields(before));
	const afterFields = plainRow(seedClaimFields(after));
	delete beforeFields.changeLog;
	delete beforeFields.lastRetractionCheckAt;
	assertBaseline(claim, beforeFields, snapshot.key);
	const claimSet = Object.fromEntries(Object.entries(afterFields).filter(([field, value]) => field !== "changeLog" && field !== "lastRetractionCheckAt" && !equal(value, beforeFields[field])));
	const latestCheck = laterDate(claim.lastRetractionCheckAt, after.lastRetractionCheckAt);
	if (latestCheck) claimSet.lastRetractionCheckAt = latestCheck;
	requireCondition(equal(after.changeLog.slice(0, before.changeLog.length), before.changeLog), "Refresh must append the existing source history.");
	const historyAppend = after.changeLog.slice(before.changeLog.length).map(plainRow);
	requireCondition(historyAppend.length > 0, "A substantive history entry is required.");
	const announcement = seedReaderAnnouncementSchema.parse(after.readerAnnouncement);
	requireCondition(announcement.kind !== "new_review", "Existing reviews require update or correction announcements.");
	requireCondition(!(claim.readerUpdates as Array<{ id: string }> | undefined)?.some(entry => entry.id === announcement.id), "Announcement already exists without this promotion receipt; review manually.");
	const existing = new Map(sources.map(source => [identity(source), source]));
	const previous = new Map(before.sources.map(source => [identity(plainRow(source)), source]));
	const next = new Set(after.sources.map(source => identity(plainRow(source))));
	requireCondition(existing.size === sources.length && previous.size === before.sources.length && next.size === after.sources.length, "Duplicate citation identity; review manually.");
	requireCondition(existing.size === previous.size && [...previous.keys()].every(id => existing.has(id) && next.has(id)), "The live source set diverged or the refresh removes a source; review manually.");
	const updates = after.sources.map((source) => {
		const id = identity(plainRow(source));
		const live = existing.get(id);
		const seed = previous.get(id);
		const set = sourceValues(source);
		if (live && seed) {
			assertBaseline(sourceValues(live), sourceValues(seed), `${snapshot.key} source ${id}`);
			const profile = live.evidenceProfile as IClaimSource["evidenceProfile"] | undefined;
			requireCondition(!profile?.reviewer?.reviewedAt && !profile?.reviewer?.reviewedById, "Reviewed source coding requires the editorial workflow.");
			requireCondition(!profile?.publicationIntegrity?.predatoryOrQuestionableVenue, `Source ${id} has a venue warning requiring editorial review.`);
			requireCondition(strongerCitationStatus(status(live), source.citationStatus ?? "current") === (source.citationStatus ?? "current"), `Source ${id} has a stronger live warning than the refresh addresses.`);
		}
		set.citationStatus = source.citationStatus ?? "current";
		const checked = laterDate(live?.citationCheckedAt, source.citationCheckedAt);
		if (checked) set.citationCheckedAt = checked;
		set.statusSources = [...new Set([...(live?.statusSources as string[] ?? []), ...(source.statusSources ?? [])])];
		// Never replace the row: extraction, human decisions and provider progress stay attached to its ID.
		return { id: live ? String(live._id) : null, set };
	});
	const candidate = new Claim({ ...claim, ...claimSet, changeLog: [...(claim.changeLog as unknown[] ?? []), ...historyAppend] });
	const candidateSources = updates.map(update => new ClaimSource({ ...sources.find(source => source._id === update.id), ...update.set, claim: claim._id }));
	try {
		await candidate.validate();
		for (const source of candidateSources) await source.validate();
	}
	catch { throw new RefreshConflict(`${snapshot.key}: candidate failed schema validation.`); }
	const readiness = getPublicClaimReadiness(candidate, summarizeClaimSourceReadiness(candidateSources));
	requireCondition(readiness.isReady, `${snapshot.key}: candidate is not public-ready: ${readiness.missing.join(", ")}`);
	return { key: snapshot.key, claimId: String(claim._id), claimSet, historyAppend, announcement, sources: updates };
}

export async function prepareClaimRefreshes(selection: string[], preparedAt = new Date().toISOString(), session?: ClientSession): Promise<RefreshPlan> {
	const selected = definitions(selection);
	const before: Snapshot[] = [];
	const changes: Change[] = [];
	for (const definition of selected) {
		const topics = await Topic.find({ slug: definition.before.topicSlug }).limit(2).session(session ?? null).lean();
		requireCondition(topics.length === 1, `Expected one topic: ${definition.before.topicSlug}`);
		const claims = await Claim.find({ topic: topics[0]!._id, slug: definition.before.slug }).select("+maintenance").limit(2).session(session ?? null).lean();
		requireCondition(claims.length === 1, `Expected one existing claim: ${definition.key}`);
		const sources = await ClaimSource.find({ claim: claims[0]!._id }).select("+integrityMonitoring").sort({ _id: 1 }).limit(101).session(session ?? null).lean();
		requireCondition(sources.length <= 100, "Source limit exceeded; use the editorial workflow.");
		const snapshot = { key: definition.key, claim: plainRow(claims[0]), sources: sources.map(plainRow) };
		before.push(snapshot);
		changes.push(await planClaimRefresh(snapshot, definition.before, definition.after));
	}
	const plan: RefreshPlan = { version: 1, preparedAt, database: mongoose.connection.name, selection: selected.map(entry => entry.key), definitionHash: refreshDigest(selected), before, changes };
	requireCondition(Buffer.byteLength(canonicalRefreshJSON(plan)) <= 8 * 1024 * 1024, "Plan exceeds 8 MiB; select a smaller batch.");
	return plan;
}

export async function applyClaimRefreshes(plan: RefreshPlan, approval: { planSha256: string; backupSha256: string; operatorNote: string }) {
	z.object({ planSha256: z.string().regex(/^[a-f0-9]{64}$/), backupSha256: z.string().regex(/^[a-f0-9]{64}$/), operatorNote: z.string().trim().min(20).max(2000) }).strict().parse(approval);
	requireCondition(plan.version === 1 && plan.database === mongoose.connection.name, "Plan version or target database does not match.");
	requireCondition(refreshDigest(plan) === approval.planSha256, "The reviewed plan digest does not match.");
	const hello = await mongoose.connection.db!.admin().command({ hello: 1 });
	requireCondition(hello.setName || hello.msg === "isdbgrid", "Atomic promotion requires MongoDB transaction support. No records were changed; use the reviewed editorial procedure or arrange a supported topology separately.");
	const session = await mongoose.startSession();
	try {
		return await session.withTransaction(async () => {
			const receipt = await ClaimRefreshPromotion.findById(approval.planSha256).session(session).lean();
			if (receipt) return { status: "already_applied" as const, appliedAt: receipt.appliedAt, selection: receipt.selection };
			const prepared = Date.parse(plan.preparedAt);
			requireCondition(Number.isFinite(prepared) && prepared <= Date.now() && Date.now() - prepared <= 24 * 60 * 60 * 1000, "The plan is stale; prepare and review a fresh snapshot.");
			const fresh = await prepareClaimRefreshes(plan.selection, plan.preparedAt, session);
			requireCondition(refreshDigest(fresh) === approval.planSha256, "Live state or the refresh definition changed after preview; prepare and review again.");
			const appliedAt = new Date();
			for (const change of fresh.changes) {
				const snapshot = fresh.before.find(entry => entry.key === change.key)!;
				for (const source of change.sources) {
					if (source.id) {
						const original = snapshot.sources.find(row => row._id === source.id)!;
						const result = await ClaimSource.updateOne({ _id: source.id, __v: original.__v ?? { $exists: false }, updatedAt: original.updatedAt ?? { $exists: false } }, { $set: source.set, $inc: { __v: 1 } }, { session, runValidators: true });
						requireCondition(result.matchedCount === 1, "Concurrent source change; no batch changes will be committed.");
					}
					else {
						await new ClaimSource({ ...source.set, claim: change.claimId }).save({ session });
					}
				}
				const result = await Claim.updateOne({ _id: change.claimId, status: "published", __v: snapshot.claim.__v ?? { $exists: false }, updatedAt: snapshot.claim.updatedAt ?? { $exists: false } }, {
					$set: change.claimSet,
					$push: { changeLog: { $each: change.historyAppend }, readerUpdates: { $each: [{ ...change.announcement, date: appliedAt }], $position: 0 } },
					$inc: { __v: 1 }
				}, { session, runValidators: true });
				requireCondition(result.matchedCount === 1, "Concurrent claim change; no batch changes will be committed.");
			}
			await new ClaimRefreshPromotion({ _id: approval.planSha256, appliedAt, actorType: "system", operatorNote: approval.operatorNote, backupSha256: approval.backupSha256, definitionHash: fresh.definitionHash, selection: fresh.selection, before: fresh.before, changes: fresh.changes }).save({ session });
			return { status: "applied" as const, appliedAt, selection: fresh.selection };
		}, { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" }, readPreference: "primary", maxCommitTimeMS: 15_000, timeoutMS: 60_000 });
	}
	finally { await session.endSession(); }
}
