import type { PipelineStage } from "mongoose";
import express from "express";
import mongoose from "mongoose";
import { requireAdmin } from "../middleware/auth.js";
import { Admin } from "../models/schemas/Admin.js";
import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { SourceNoticeReview } from "../models/schemas/SourceNoticeReview.js";
import { claimReviewStatus, recordedDate } from "../utils/claimReviewStatus.js";
import {
	hasSourceNotice,
	maintenanceHistoryLimit,
	noticeFingerprint,
	noticeStages,
	priorityPipeline,
	reviewDetailQuery,
	reviewPriorityQuery,
	reviewScheduleChange,
	sourceNoticeDecision,
	sourceNoticeFilter,
	sourceNoticeSnapshot
} from "../utils/reviewPriority.js";
import { logError } from "../utils/safeLog.js";

const validId = (value: unknown): value is string => typeof value === "string" && /^[a-f\d]{24}$/.test(value);
const visibleStatus = { $in: ["published", "needs_update"] as const };

export function createReviewPriorityRouter() {
	const router = express.Router();
	router.use(
		"/admin/review-priority",
		(_req, res, next) => {
			res.set("Cache-Control", "private, no-store");
			next();
		},
		requireAdmin
	);

	router.get("/admin/review-priority", async (req, res) => {
		const parsed = reviewPriorityQuery.safeParse(req.query);
		if (!parsed.success) return res.status(400).json({ error: "Invalid review filters or page." });
		const { page, limit, reason, query, topicId } = parsed.data;
		try {
			const now = new Date();
			const initialFilter: Record<string, unknown> = {};
			if (topicId) initialFilter.topic = new mongoose.Types.ObjectId(topicId);
			if (query) initialFilter.title = { $regex: query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
			const pipeline: PipelineStage[] = [{ $match: initialFilter }, ...priorityPipeline(now)];
			if (reason === "attention") pipeline.push({ $match: { "reasons.0": { $exists: true } } });
			else if (reason !== "all") pipeline.push({ $match: { reasons: reason } });
			pipeline.push({
				$facet: {
					rows: [
						{ $sort: { priority: 1, nextReviewAt: 1, _id: 1 } },
						{ $skip: (page - 1) * limit },
						{ $limit: limit },
						{
							$lookup: {
								from: "topics",
								localField: "topic",
								foreignField: "_id",
								pipeline: [{ $project: { title: 1, slug: 1 } }],
								as: "topic"
							}
						},
						{ $set: { topic: { $arrayElemAt: ["$topic", 0] } } }
					],
					total: [{ $count: "count" }]
				}
			});
			const [result] = await Claim.aggregate(pipeline).option({ maxTimeMS: 8000 });
			const total = result.total[0]?.count ?? 0;
			return res.json({
				evaluatedAt: now,
				rows: result.rows,
				pagination: { page, limit, total, hasMore: page * limit < total }
			});
		}
		catch (error) {
			logError("Review priority queue failed", error);
			return res.status(503).json({ error: "The review queue could not be loaded. Please retry." });
		}
	});

	router.get("/admin/review-priority/:id", async (req, res) => {
		const query = reviewDetailQuery.safeParse(req.query);
		if (!validId(req.params.id) || !query.success)
			return res.status(400).json({ error: "Invalid review or page." });
		try {
			const claim = await Claim.findOne({ _id: req.params.id, status: visibleStatus })
				.select(
					"title slug topic status lastReviewedAt reviewDateBasis searchCutoffAt nextReviewAt +maintenance"
				)
				.populate("topic", "title slug")
				.maxTimeMS(5000)
				.lean();
			if (!claim)
				return res.status(404).json({ error: "This review is not available in the maintenance queue." });
			const filter = { claim: claim._id, ...sourceNoticeFilter };
			const sourcePage = query.data.sourcePage;
			const [sources, total] = await Promise.all([
				ClaimSource.aggregate([
					{ $match: filter },
					{ $sort: { _id: 1 } },
					{ $skip: (sourcePage - 1) * 10 },
					{ $limit: 10 },
					...noticeStages(true),
					{ $project: { title: 1, noticeSnapshot: 1, noticeAddressed: 1, noticeReview: 1 } }
				]).option({ maxTimeMS: 5000 }),
				ClaimSource.countDocuments(filter).maxTimeMS(5000)
			]);
			const schedule = claim.maintenance ?? { revision: 0, history: [] };
			const adminIds = [...new Set<string>([
				...schedule.history.map(entry => String(entry.adminId)),
				...sources.flatMap(source => (source.noticeReview?.history ?? []).map((entry: { adminId: unknown }) => String(entry.adminId)))
			])];
			const admins = await Admin.find({ _id: { $in: adminIds } }).select("name").maxTimeMS(5000).lean();
			const names = new Map(admins.map(admin => [String(admin._id), admin.name]));
			const withAdmin = <T extends { adminId: unknown }>(entry: T) => ({ ...entry, adminName: names.get(String(entry.adminId)) ?? null });
			return res.json({
				claim: {
					_id: claim._id,
					title: claim.title,
					slug: claim.slug,
					topic: claim.topic,
					status: claim.status,
					nextReviewAt: claim.nextReviewAt ?? null,
					reviewStatus: claimReviewStatus(claim)
				},
				schedule: { revision: schedule.revision, history: schedule.history.map(withAdmin) },
				sources: sources.map(source => ({
					_id: source._id,
					title: source.title,
					snapshot: {
						...source.noticeSnapshot,
						statusSources: [...new Set<string>(source.noticeSnapshot.statusSources)].sort()
					},
					fingerprint: noticeFingerprint({
						...source.noticeSnapshot,
						statusSources: [...new Set<string>(source.noticeSnapshot.statusSources)].sort()
					}),
					addressed: source.noticeAddressed === true,
					revision: source.noticeReview?.revision ?? 0,
					history: (source.noticeReview?.history ?? []).map(withAdmin)
				})),
				pagination: { page: sourcePage, limit: 10, total, hasMore: sourcePage * 10 < total },
				historyLimit: maintenanceHistoryLimit
			});
		}
		catch (error) {
			logError("Review maintenance detail failed", error);
			return res.status(503).json({ error: "Review details could not be loaded. Please retry." });
		}
	});

	router.patch("/admin/review-priority/:id/schedule", async (req, res) => {
		const parsed = reviewScheduleChange.safeParse(req.body);
		if (!validId(req.params.id) || !parsed.success) {
			return res
				.status(400)
				.json({ error: "Provide a valid date, revision and a reason of 20-1000 characters." });
		}
		const { revision, expectedNextReviewAt, nextReviewAt, note } = parsed.data;
		const now = new Date();
		const nextAt = nextReviewAt ? new Date(recordedDate(nextReviewAt)!) : null;
		if (nextAt && nextAt.getTime() > now.getTime() + 5 * 366 * 86400000)
			return res.status(400).json({ error: "Choose a review date within five years." });
		const previousAt = expectedNextReviewAt ? new Date(recordedDate(expectedNextReviewAt)!) : null;
		try {
			const result = await Claim.findOneAndUpdate(
				{
					_id: req.params.id,
					status: visibleStatus,
					nextReviewAt: previousAt,
					...(revision
						? { "maintenance.revision": revision }
						: { $or: [{ "maintenance.revision": 0 }, { "maintenance.revision": { $exists: false } }] })
				},
				{
					$set: { nextReviewAt: nextAt },
					$inc: { "maintenance.revision": 1, "__v": 1 },
					$push: {
						"maintenance.history": {
							$each: [{ date: now, adminId: req.currentAdmin!._id, previousAt, nextAt, note }],
							$slice: -maintenanceHistoryLimit
						}
					}
				},
				{ returnDocument: "after", runValidators: true }
			)
				.select("_id")
				.maxTimeMS(5000)
				.lean();
			if (!result)
				return res.status(409).json({ error: "The review or its schedule changed. Reload before saving." });
			return res.json({ saved: true });
		}
		catch (error) {
			logError("Review schedule save failed", error);
			return res.status(503).json({ error: "The schedule was not confirmed saved. Reload before retrying." });
		}
	});

	router.patch("/admin/review-priority/:id/sources/:sourceId", async (req, res) => {
		const parsed = sourceNoticeDecision.safeParse(req.body);
		if (!validId(req.params.id) || !validId(req.params.sourceId) || !parsed.success) {
			return res
				.status(400)
				.json({ error: "Provide a notice, revision, decision and a reason of 20-1000 characters." });
		}
		try {
			const claim = await Claim.exists({ _id: req.params.id, status: visibleStatus });
			const source
				= claim
					&& (await ClaimSource.findOne({ _id: req.params.sourceId, claim: req.params.id }).maxTimeMS(5000).lean());
			if (!source) return res.status(404).json({ error: "This source is not available for review." });
			const snapshot = sourceNoticeSnapshot(source);
			const { fingerprint, revision, decision, note } = parsed.data;
			if (!hasSourceNotice(snapshot) || noticeFingerprint(snapshot) !== fingerprint) {
				return res
					.status(409)
					.json({ error: "The source notice changed. Reload before recording a decision." });
			}
			const result = await SourceNoticeReview.findOneAndUpdate(
				{ _id: source._id, revision },
				{
					$set: { claim: claim._id, snapshot, fingerprint, decision },
					$inc: { revision: 1 },
					$push: {
						history: {
							$each: [
								{
									snapshot,
									fingerprint,
									decision,
									note,
									adminId: req.currentAdmin!._id,
									date: new Date()
								}
							],
							$slice: -maintenanceHistoryLimit
						}
					}
				},
				{ upsert: revision === 0, returnDocument: "after", runValidators: true }
			)
				.maxTimeMS(5000)
				.lean();
			if (!result) return res.status(409).json({ error: "Another decision was recorded. Reload before saving." });
			return res.json({ saved: true });
		}
		catch (error) {
			if (error && typeof error === "object" && "code" in error && error.code === 11000)
				return res.status(409).json({ error: "Another decision was recorded. Reload before saving." });
			logError("Source notice decision failed", error);
			return res.status(503).json({ error: "The decision was not confirmed saved. Reload before retrying." });
		}
	});
	return router;
}
