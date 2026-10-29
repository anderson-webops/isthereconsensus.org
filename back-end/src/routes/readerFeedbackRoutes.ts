import type { Types } from "mongoose";
import type { LoadVisibleClaims } from "./readerLibraryRoutes.js";
import express from "express";
import rateLimit, { ipKeyGenerator } from "express-rate-limit";
import { comparisonForSlug } from "../data/comparisons/index.js";
import { requireAdmin } from "../middleware/auth.js";
import { Claim } from "../models/schemas/Claim.js";
import { ReaderFeedback } from "../models/schemas/ReaderFeedback.js";
import { Topic } from "../models/schemas/Topic.js";
import { verifyCaptcha } from "../utils/captcha.js";
import { loadVisibleLibraryClaims } from "../utils/publicClaimQueries.js";
import {
	feedbackSubmissionKey,
	readerFeedbackQuery,
	readerFeedbackReview,
	readerFeedbackSubmission
} from "../utils/readerFeedback.js";
import { logError } from "../utils/safeLog.js";

class FeedbackTargetError extends Error {}

interface FeedbackTarget {
	topicId?: Types.ObjectId;
	referenceTitle?: string;
	target: { comparisonSlug?: string; claimId?: string };
}

async function resolveFeedbackTarget(data: ReturnType<typeof readerFeedbackSubmission.parse>, loadVisibleClaims: LoadVisibleClaims): Promise<FeedbackTarget> {
	if (data.kind !== "content_gap" && data.comparisonSlug) {
		const comparison = comparisonForSlug(data.comparisonSlug);
		if (!comparison) throw new FeedbackTargetError("This comparison is no longer available for feedback.");
		return {
			referenceTitle: comparison.title,
			target: { comparisonSlug: comparison.slug }
		};
	}
	if (data.kind !== "content_gap") {
		const [claim] = await loadVisibleClaims([data.claimId!]);
		if (!claim) throw new FeedbackTargetError("This review is no longer available for feedback.");
		return {
			topicId: claim.topic._id,
			referenceTitle: claim.title,
			target: { claimId: data.claimId }
		};
	}
	if (!data.topicId) return { target: {} };
	const topic = await Topic.findById(data.topicId).select("_id").lean();
	if (!topic) throw new FeedbackTargetError("This topic is no longer available.");
	return { topicId: topic._id, target: {} };
}

function storedFeedbackContent(data: ReturnType<typeof readerFeedbackSubmission.parse>) {
	if (data.kind === "usefulness") return { helpful: data.helpful };
	if (data.kind === "reader_experience") return { clarity: data.clarity, answerCoverage: data.answerCoverage };
	return {
		message: data.message,
		sourceUrl: data.sourceUrl,
		...(data.kind === "missing_evidence"
			? { area: data.area }
			: { title: data.title })
	};
}

export function createReaderFeedbackRouter(
	secret: string,
	loadVisibleClaims: LoadVisibleClaims = loadVisibleLibraryClaims
) {
	const router = express.Router();
	router.use(["/reader-feedback", "/admin/reader-feedback"], (_req, res, next) => {
		res.set("Cache-Control", "private, no-store");
		next();
	});
	const limiter = rateLimit({
		windowMs: 60 * 60_000,
		limit: 30,
		standardHeaders: "draft-8",
		legacyHeaders: false,
		message: { error: "Feedback limit reached. Please try again later." }
	});

	router.post("/reader-feedback", limiter, async (req, res) => {
		const parsed = readerFeedbackSubmission.safeParse(req.body);
		if (!parsed.success) return res.status(400).json({ error: "Check the feedback fields and length limits." });
		const data = parsed.data;
		try {
			const now = new Date();
			const key = feedbackSubmissionKey(secret, ipKeyGenerator(req.ip || "unknown"), data, now);
			if (await ReaderFeedback.exists({ _id: key })) return res.json({ received: true, duplicate: true });
			const { topicId, referenceTitle, target } = await resolveFeedbackTarget(data, loadVisibleClaims);
			if (data.kind !== "usefulness" && data.kind !== "reader_experience") {
				const captcha = await verifyCaptcha(data.captchaToken, req.ip);
				if (!captcha.ok)
					return res.status(403).json({ error: captcha.error || "Please complete the bot check." });
			}
			// Whitelist every stored field. Do not spread req.body, auth or CAPTCHA data.
			await ReaderFeedback.create({
				_id: key,
				kind: data.kind,
				topicId,
				referenceTitle,
				...target,
				...storedFeedbackContent(data),
				expiresAt: new Date(now.getTime() + 730 * 24 * 60 * 60_000)
			});
			return res.status(201).json({ received: true, duplicate: false });
		}
		catch (error) {
			if (error instanceof FeedbackTargetError) return res.status(422).json({ error: error.message });
			if (error && typeof error === "object" && "code" in error && error.code === 11000)
				return res.json({ received: true, duplicate: true });
			logError("Reader feedback submission failed", error);
			return res.status(503).json({ error: "Feedback was not confirmed received. Please retry." });
		}
	});

	router.get("/admin/reader-feedback/targets", requireAdmin, async (req, res) => {
		const query = req.query.query;
		if (typeof query !== "string" || query.trim().length < 3 || query.length > 100)
			return res.status(400).json({ error: "Enter 3-100 characters to find a review or topic." });
		const text = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		try {
			const [claims, topics] = await Promise.all([
				Claim.find({
					title: { $regex: text, $options: "i" }
				})
					.select("_id title status")
					.sort({ title: 1 })
					.limit(20)
					.maxTimeMS(5000)
					.lean(),
				Topic.find({
					title: { $regex: text, $options: "i" }
				})
					.select("_id title")
					.sort({ title: 1 })
					.limit(20)
					.maxTimeMS(5000)
					.lean()
			]);
			return res.json({ claims, topics });
		}
		catch (error) {
			logError("Reader feedback target search failed", error);
			return res.status(503).json({ error: "Destinations could not be loaded. Please retry." });
		}
	});

	router.get("/admin/reader-feedback", requireAdmin, async (req, res) => {
		const parsed = readerFeedbackQuery.safeParse(req.query);
		if (!parsed.success) return res.status(400).json({ error: "Invalid feedback filters or page." });
		const { page, limit, reviewId, ...filters } = parsed.data;
		try {
			const filter = {
				...filters,
				expiresAt: {
					$gt: new Date()
				},
				...(reviewId
					? {
							$or: [
								{ claimId: reviewId },
								{ linkedClaimId: reviewId }
							]
						}
					: {})
			};
			const [rows, total] = await Promise.all([
				ReaderFeedback.find(filter)
					.sort({ priority: -1, createdAt: -1, _id: -1 })
					.skip((page - 1) * limit)
					.limit(limit)
					.maxTimeMS(5000)
					.lean(),
				ReaderFeedback.countDocuments(filter).maxTimeMS(5000)
			]);
			const linkedTopics = await Topic.find({
				_id: {
					$in: rows.flatMap(row => row.linkedTopicId
						? [row.linkedTopicId]
						: [])
				}
			})
				.select("_id title slug")
				.maxTimeMS(5000)
				.lean();
			const topicMap = new Map(linkedTopics.map(topic => [
				String(topic._id),
				topic
			]));
			return res.json({
				rows: rows.map(row => ({
					...row,
					linkedTopic: topicMap.get(String(row.linkedTopicId))
				})),
				pagination: {
					page,
					limit,
					total,
					hasMore: page * limit < total
				}
			});
		}
		catch (error) {
			logError("Reader feedback queue failed", error);
			return res.status(503).json({ error: "Reader feedback could not be loaded. Please retry." });
		}
	});

	router.patch("/admin/reader-feedback/:id", requireAdmin, async (req, res) => {
		const parsed = readerFeedbackReview.safeParse(req.body);
		if (!/^[a-f\d]{64}$/.test(String(req.params.id)) || !parsed.success) {
			return res
				.status(400)
				.json({ error: "Choose a status, priority and a review note of 10-1000 characters." });
		}
		try {
			const { revision, note, ...change } = parsed.data;
			const [claim, topic] = await Promise.all([
				change.linkedClaimId
					? Claim.exists({ _id: change.linkedClaimId })
					: true,
				change.linkedTopicId
					? Topic.exists({ _id: change.linkedTopicId })
					: true
			]);
			if (!claim || !topic) return res.status(422).json({ error: "The linked claim or topic does not exist." });
			const row = await ReaderFeedback.findOneAndUpdate(
				{
					_id: String(req.params.id),
					revision,
					expiresAt: {
						$gt: new Date()
					}
				},
				{
					$set: change,
					$inc: { revision: 1 },
					$push: {
						reviews: {
							$each: [
								{
									...change,
									note,
									adminId: req.currentAdmin!._id,
									date: new Date()
								}
							],
							$slice: -50
						}
					}
				},
				{ returnDocument: "after", runValidators: true }
			).lean();
			if (!row) return res.status(409).json({ error: "Feedback changed or expired. Reload before saving." });
			return res.json({ row });
		}
		catch (error) {
			logError("Reader feedback review failed", error);
			return res.status(503).json({ error: "Your review was not confirmed saved. Reload before retrying." });
		}
	});
	return router;
}
