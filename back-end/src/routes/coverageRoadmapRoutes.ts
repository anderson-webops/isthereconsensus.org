import type { LoadVisibleClaims } from "./readerLibraryRoutes.js";
import express from "express";
import { requireAdmin } from "../middleware/auth.js";
import { CoverageRequest } from "../models/schemas/CoverageRequest.js";
import { ReaderFeedback } from "../models/schemas/ReaderFeedback.js";
import { Topic } from "../models/schemas/Topic.js";
import {
	adminCoverageQuery,
	coverageChange,
	coverageDraft,
	coverageQuery,
	coverageTransition,
	publicCoverageRequest
} from "../utils/coverageRoadmap.js";
import { loadVisibleLibraryClaims } from "../utils/publicClaimQueries.js";
import { logError } from "../utils/safeLog.js";

const validId = (value: unknown) => typeof value === "string" && /^[a-f\d]{24}$/.test(value);
const publicFields = "title summary status topicId claimId publicUpdatedAt publicHistory";

export function createCoverageRoadmapRouter(loadVisibleClaims: LoadVisibleClaims = loadVisibleLibraryClaims) {
	const router = express.Router();
	router.use(["/coverage", "/admin/coverage"], (_req, res, next) => {
		res.set("Cache-Control", "private, no-store");
		next();
	});

	async function publicRows(rows: Array<Parameters<typeof publicCoverageRequest>[0] & { topicId?: unknown; claimId?: unknown }>) {
		const [topics, claims] = await Promise.all([
			Topic.find({ _id: { $in: rows.flatMap(row => row.topicId ? [String(row.topicId)] : []) } })
				.select("title slug")
				.maxTimeMS(5000)
				.lean(),
			loadVisibleClaims(rows.flatMap(row => row.status === "published" && row.claimId ? [String(row.claimId)] : []))
		]);
		const topicMap = new Map(topics.map(topic => [String(topic._id), topic]));
		const claimMap = new Map(claims.flatMap(claim =>
			typeof claim.topic === "object" && "slug" in claim.topic
				? [[String(claim._id), { title: claim.title, slug: claim.slug, topic: { slug: claim.topic.slug } }] as const]
				: []
		));
		return rows.map(row => publicCoverageRequest(row, topicMap.get(String(row.topicId)) ?? null, claimMap.get(String(row.claimId)) ?? null));
	}

	async function validTargets(data: { topicId: string | null; claimId: string | null; status: string }) {
		const [topic, claims] = await Promise.all([
			data.topicId ? Topic.exists({ _id: data.topicId }).maxTimeMS(5000) : true,
			data.claimId ? loadVisibleClaims([data.claimId]) : []
		]);
		return Boolean(topic && (!data.claimId || claims.length === 1) && (data.status !== "published" || claims.length === 1));
	}

	router.get("/coverage", async (req, res) => {
		const parsed = coverageQuery.safeParse(req.query);
		if (!parsed.success) return res.status(400).json({ error: "Invalid coverage filters or page." });
		const { page, limit, ...filters } = parsed.data;
		try {
			const filter = { ...filters, visibility: "public" as const };
			const [rows, total] = await Promise.all([
				CoverageRequest.find(filter).select(publicFields).sort({ publicUpdatedAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit).maxTimeMS(5000).lean(),
				CoverageRequest.countDocuments(filter).maxTimeMS(5000)
			]);
			return res.json({ rows: await publicRows(rows), pagination: { page, limit, total, hasMore: page * limit < total } });
		}
		catch (error) {
			logError("Public coverage roadmap failed", error);
			return res.status(503).json({ error: "The coverage roadmap could not be loaded. Please retry." });
		}
	});

	router.get("/coverage/:id", async (req, res) => {
		if (!validId(req.params.id)) return res.status(404).json({ error: "This coverage request is not available." });
		try {
			const row = await CoverageRequest.findOne({ _id: String(req.params.id), visibility: "public" }).select(publicFields).maxTimeMS(5000).lean();
			if (!row) return res.status(404).json({ error: "This coverage request is not available." });
			return res.json({ row: (await publicRows([row]))[0] });
		}
		catch (error) {
			logError("Public coverage request failed", error);
			return res.status(503).json({ error: "The coverage request could not be loaded. Please retry." });
		}
	});

	router.get("/admin/coverage", requireAdmin, async (req, res) => {
		const parsed = adminCoverageQuery.safeParse(req.query);
		if (!parsed.success) return res.status(400).json({ error: "Invalid coverage filters or page." });
		const { page, limit, ...filters } = parsed.data;
		try {
			const [rows, total] = await Promise.all([
				CoverageRequest.find(filters).sort({ updatedAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit).maxTimeMS(5000).lean(),
				CoverageRequest.countDocuments(filters).maxTimeMS(5000)
			]);
			return res.json({ rows, pagination: { page, limit, total, hasMore: page * limit < total } });
		}
		catch (error) {
			logError("Admin coverage queue failed", error);
			return res.status(503).json({ error: "The coverage queue could not be loaded. Please retry." });
		}
	});

	router.post("/admin/coverage", requireAdmin, async (req, res) => {
		const parsed = coverageDraft.safeParse(req.body);
		if (!parsed.success) return res.status(400).json({ error: "Check the draft question, summary, note and linked answer." });
		try {
			const { privateNote, ...data } = parsed.data;
			if (!await validTargets(data)) return res.status(422).json({ error: "Choose an existing topic and an available published review." });
			if (data.feedbackId && !await ReaderFeedback.exists({ _id: data.feedbackId, kind: { $in: ["content_gap", "missing_evidence"] }, expiresAt: { $gt: new Date() } }).maxTimeMS(5000)) {
				return res.status(422).json({ error: "The private suggestion is unavailable or expired." });
			}
			const row = await CoverageRequest.create({
				...data,
				visibility: "draft",
				audit: [{ date: new Date(), adminId: req.currentAdmin!._id, revision: 0, operation: "create", visibility: "draft", status: data.status, note: privateNote }]
			});
			return res.status(201).json({ row });
		}
		catch (error) {
			logError("Coverage draft creation failed", error);
			return res.status(503).json({ error: "Draft creation was not confirmed. Reload before retrying." });
		}
	});

	router.patch("/admin/coverage/:id", requireAdmin, async (req, res) => {
		const parsed = coverageChange.safeParse(req.body);
		if (!validId(req.params.id) || !parsed.success) return res.status(400).json({ error: "Check the coverage change, revision and required notes." });
		try {
			const current = await CoverageRequest.findById(String(req.params.id)).maxTimeMS(5000).lean();
			if (!current || current.revision !== parsed.data.revision) return res.status(409).json({ error: "The request changed. Reload before saving." });
			const transition = coverageTransition(current.visibility, parsed.data);
			if (!transition.ok) return res.status(400).json({ error: transition.error });
			const { revision, operation, privateNote, publicUpdateSummary, title, summary, status, topicId, claimId } = parsed.data;
			const fields = { title, summary, status, topicId, claimId };
			if (operation !== "withdraw" && !await validTargets(fields)) return res.status(422).json({ error: "Choose an existing topic and an available published review." });
			const now = new Date();
			const isPublic = transition.visibility === "public";
			const row = await CoverageRequest.findOneAndUpdate({ _id: current._id, revision }, {
				$set: { ...fields, visibility: transition.visibility, ...(isPublic ? { publicUpdatedAt: now } : {}) },
				$inc: { revision: 1 },
				$push: {
					audit: { $each: [{ date: now, adminId: req.currentAdmin!._id, revision: revision + 1, operation, visibility: transition.visibility, status: fields.status, note: privateNote }], $slice: -100 },
					...(isPublic ? { publicHistory: { $each: [{ date: now, status: fields.status, summary: publicUpdateSummary }], $slice: -100 } } : {})
				}
			}, { returnDocument: "after", runValidators: true }).maxTimeMS(5000).lean();
			if (!row) return res.status(409).json({ error: "The request changed. Reload before saving." });
			return res.json({ row });
		}
		catch (error) {
			logError("Coverage request edit failed", error);
			return res.status(503).json({ error: "The change was not confirmed saved. Reload before retrying." });
		}
	});
	return router;
}
