import type { IClaim } from "../models/schemas/Claim.js";
import type { IReaderLibrary } from "../models/schemas/ReaderLibrary.js";
import type { IReaderUpdate } from "../utils/readerUpdates.js";
import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { comparisonForSlug, evidenceComparisons } from "../data/comparisons/index.js";
import { compareUpdatePosition, selectedComparisonUpdates } from "../data/comparisons/updates.js";
import { requireAuth } from "../middleware/auth.js";
import { Claim } from "../models/schemas/Claim.js";
import { MAX_FOLLOWED_TOPICS, MAX_SAVED_REVIEWS, ReaderLibrary } from "../models/schemas/ReaderLibrary.js";
import { Topic } from "../models/schemas/Topic.js";
import { replacementComparisons, savedComparisonSlugsSchema } from "../utils/comparisonLibrary.js";
import { loadVisibleLibraryClaims } from "../utils/publicClaimQueries.js";
import { toPublicClaimSummary, toPublicTopic } from "../utils/publicRecords.js";
import { decodeReaderUpdateCursor, encodeReaderUpdateCursor } from "../utils/readerUpdates.js";
import { logError } from "../utils/safeLog.js";

const id = z.string().regex(/^[a-f\d]{24}$/);
function ids(maximum: number) {
	return z
		.array(id)
		.max(maximum)
		.refine(values => new Set(values).size === values.length);
}
const selection = z
	.object({
		savedReviewIds: ids(MAX_SAVED_REVIEWS),
		followedTopicIds: ids(MAX_FOLLOWED_TOPICS),
		savedComparisonSlugs: savedComparisonSlugsSchema.optional()
	})
	.strict();
const replacement = selection
	.extend({
		revision: z
			.number()
			.int()
			.min(0)
			.max(Number.MAX_SAFE_INTEGER - 1)
	})
	.strict();
// Older clients send savedComparisonSlugs but still expect review-only rows.
const updateRequest = selection.extend({ cursor: z.string().max(400).optional(), includeComparisons: z.boolean().optional() }).strict();

export type LoadVisibleClaims = (claimIds: string[]) => Promise<IClaim[]>;

function publicLibrary(library: IReaderLibrary | null) {
	return {
		revision: library?.revision ?? 0,
		savedReviewIds: library?.savedReviewIds ?? [],
		followedTopicIds: library?.followedTopicIds ?? [],
		savedComparisonSlugs: library?.savedComparisonSlugs ?? []
	};
}

function ownerKey(req: express.Request) {
	if (req.currentAdmin?._id) return `admin:${req.currentAdmin._id}`;
	if (req.currentUser?._id) return `user:${req.currentUser._id}`;
	throw new Error("Authenticated library owner missing");
}

function isDuplicateKey(error: unknown) {
	return Boolean(error && typeof error === "object" && "code" in error && error.code === 11000);
}

export function createReaderLibraryRouter(loadVisibleClaims: LoadVisibleClaims = loadVisibleLibraryClaims) {
	const router = express.Router();
	// Apply before authentication, including forbidden/error responses. Never
	// cache reader interests or serialize an owner id into a public response.
	router.use((_req, res, next) => {
		res.set("Cache-Control", "private, no-store");
		next();
	});

	router.get("/account", requireAuth, async (req, res) => {
		try {
			return res.json(publicLibrary(await ReaderLibrary.findById(ownerKey(req)).lean()));
		}
		catch (error) {
			logError("Reader library read failed", error);
			return res.status(503).json({ error: "Your account library could not be loaded. Please retry." });
		}
	});

	router.patch("/account", requireAuth, async (req, res) => {
		const parsed = replacement.safeParse(req.body);
		if (!parsed.success) return res.status(400).json({ error: "Invalid library selection or revision." });
		try {
			const key = ownerKey(req);
			const current = await ReaderLibrary.findById(key).lean();
			if ((current?.revision ?? 0) !== parsed.data.revision) {
				return res.status(409).json({ error: "Your library changed elsewhere. Reload it before saving." });
			}
			// Old references can always be removed, even if a review was withdrawn.
			// Only additions must resolve to currently public content.
			const addedReviews = parsed.data.savedReviewIds.filter(value => !current?.savedReviewIds.includes(value));
			const addedTopics = parsed.data.followedTopicIds.filter(
				value => !current?.followedTopicIds.includes(value)
			);
			const comparisons = replacementComparisons(parsed.data.savedComparisonSlugs, current?.savedComparisonSlugs);
			const addedComparisons = comparisons.filter(value => !current?.savedComparisonSlugs?.includes(value));
			if (addedComparisons.some(slug => !comparisonForSlug(slug))) {
				return res.status(422).json({ error: "A selected comparison is no longer available." });
			}
			const [reviews, topics] = await Promise.all([
				addedReviews.length ? loadVisibleClaims(addedReviews) : [],
				addedTopics.length
					? Topic.find({ _id: { $in: addedTopics } })
							.select("_id")
							.lean()
					: []
			]);
			if (reviews.length !== addedReviews.length || topics.length !== addedTopics.length) {
				return res.status(422).json({ error: "A selected review or topic is no longer available." });
			}
			const next = {
				revision: parsed.data.revision + 1,
				savedReviewIds: parsed.data.savedReviewIds,
				followedTopicIds: parsed.data.followedTopicIds,
				savedComparisonSlugs: comparisons
			};
			const saved = current
				? await ReaderLibrary.findOneAndUpdate(
						{ _id: key, revision: current.revision },
						{ $set: next },
						{
							returnDocument: "after",
							runValidators: true
						}
					).lean()
				: await ReaderLibrary.create({ _id: key, ...next });
			if (!saved) return res.status(409).json({ error: "Your library changed elsewhere. Please retry." });
			return res.json(publicLibrary(saved));
		}
		catch (error) {
			if (isDuplicateKey(error)) {
				return res.status(409).json({ error: "Your library changed elsewhere. Please retry." });
			}
			logError("Reader library save failed", error);
			return res.status(503).json({ error: "Your library was not confirmed saved. Reload it before retrying." });
		}
	});

	// POST keeps potentially sensitive interests out of URL/access-log query
	// strings. This is a read-only resolver, with no anonymous database writes.
	router.post("/resolve", async (req, res) => {
		const parsed = selection.safeParse(req.body);
		if (!parsed.success) return res.status(400).json({ error: "Invalid library selection." });
		try {
			const [claims, topics] = await Promise.all([
				parsed.data.savedReviewIds.length ? loadVisibleClaims(parsed.data.savedReviewIds) : [],
				parsed.data.followedTopicIds.length
					? Topic.find({ _id: { $in: parsed.data.followedTopicIds } }).lean()
					: []
			]);
			return res.json({
				reviews: claims.map(claim => toPublicClaimSummary(claim)),
				topics: topics.map(toPublicTopic),
				comparisons: (parsed.data.savedComparisonSlugs ?? []).flatMap((slug) => {
					const comparison = comparisonForSlug(slug);
					return comparison ? [{ slug, title: comparison.title, description: comparison.description }] : [];
				})
			});
		}
		catch (error) {
			logError("Reader library content load failed", error);
			return res
				.status(503)
				.json({ error: "Saved content could not be loaded. Your selections have not been removed." });
		}
	});

	router.post("/updates", async (req, res) => {
		const parsed = updateRequest.safeParse(req.body);
		if (!parsed.success) return res.status(400).json({ error: "Invalid update selection." });
		const now = new Date();
		let cursor: ReturnType<typeof decodeReaderUpdateCursor> | undefined;
		try {
			if (parsed.data.cursor) cursor = decodeReaderUpdateCursor(parsed.data.cursor, now);
		}
		catch {
			return res.status(400).json({ error: "Invalid update page. Refresh the feed." });
		}
		const asOf = cursor ? new Date(cursor.asOf) : now;
		const windowStart = new Date(asOf.getTime() - 90 * 24 * 60 * 60 * 1000);
		const selected = [];
		if (parsed.data.savedReviewIds.length) {
			selected.push({
				_id: { $in: parsed.data.savedReviewIds.map(value => new mongoose.Types.ObjectId(value)) }
			});
		}
		if (parsed.data.followedTopicIds.length) {
			selected.push({
				topic: { $in: parsed.data.followedTopicIds.map(value => new mongoose.Types.ObjectId(value)) }
			});
		}
		try {
			const claimRows = selected.length
				? await Claim.aggregate<{ claimId: mongoose.Types.ObjectId; update: IReaderUpdate }>([
						{
							$match: {
								"status": "published",
								"$or": selected,
								"readerUpdates.date": { $gte: windowStart, $lte: asOf }
							}
						},
						{ $unwind: "$readerUpdates" },
						{
							$match: {
								"readerUpdates.date": { $gte: windowStart, $lte: asOf },
								...(cursor
									? {
											$or: [
												{ "readerUpdates.date": { $lt: new Date(cursor.before) } },
												{
													"readerUpdates.date": new Date(cursor.before),
													"readerUpdates.id": { $lt: cursor.id }
												}
											]
										}
									: {})
							}
						},
						{ $sort: { "readerUpdates.date": -1, "readerUpdates.id": -1 } },
						{ $limit: 31 },
						{ $project: { _id: 0, claimId: "$_id", update: "$readerUpdates" } }
					]).option({ maxTimeMS: 5000 })
				: [];
			const topics = parsed.data.includeComparisons && parsed.data.followedTopicIds.length
				? await Topic.find({ _id: { $in: parsed.data.followedTopicIds } }).select("slug").maxTimeMS(5000).lean()
				: [];
			const comparisonRows = parsed.data.includeComparisons
				? selectedComparisonUpdates(evidenceComparisons, parsed.data.savedComparisonSlugs ?? [], topics.map(topic => topic.slug), asOf, windowStart, cursor)
				: [];
			const rows = [...claimRows, ...comparisonRows].sort((a, b) => compareUpdatePosition(a.update, b.update)).slice(0, 31);
			const page = rows.slice(0, 30);
			const claimIds = [...new Set(page.flatMap(row => "claimId" in row ? [String(row.claimId)] : []))];
			const visible = claimIds.length ? await loadVisibleClaims(claimIds) : [];
			const claims = new Map(visible.map(claim => [String(claim._id), claim]));
			const last = page.at(-1);
			return res.json({
				updates: page.map((row) => {
					const { update } = row;
					const fields = { id: update.id, date: update.date, kind: update.kind, summary: update.summary, bottomLineImpact: update.bottomLineImpact };
					if ("comparison" in row) return { ...fields, comparison: row.comparison };
					const claim = claims.get(String(row.claimId));
					return claim ? { ...fields, review: toPublicClaimSummary(claim) } : null;
				}).filter(row => row !== null),
				nextCursor:
					rows.length > 30 && last ? encodeReaderUpdateCursor(last.update.date, last.update.id, asOf) : null,
				asOf,
				windowStart
			});
		}
		catch (error) {
			logError("Reader update feed failed", error);
			return res.status(503).json({ error: "Updates could not be loaded. Please retry." });
		}
	});

	return router;
}
