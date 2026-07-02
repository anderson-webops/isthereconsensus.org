import type { RequestHandler } from "express";
import type { QueryFilter } from "mongoose";
import type { IAccountActivityLog } from "../models/schemas/AccountActivityLog.js";
import mongoose from "mongoose";
import {
	ACCOUNT_ACTIVITY_ACTIONS,
	ACCOUNT_ACTIVITY_ACTOR_TYPES,
	ACCOUNT_ACTIVITY_TARGET_TYPES,
	AccountActivityLog
} from "../models/schemas/AccountActivityLog.js";

function normalizeText(value: unknown, maxLength: number) {
	if (typeof value !== "string") return "";
	const trimmed = value.trim();
	if (!trimmed) return "";
	return trimmed.length > maxLength ? trimmed.slice(0, maxLength).trim() : trimmed;
}

function isKnownValue<T extends string>(values: readonly T[], value: string): value is T {
	return values.includes(value as T);
}

export const listAccountActivity: RequestHandler = async (req, res) => {
	try {
		const requestedLimit = Number.parseInt(typeof req.query.limit === "string" ? req.query.limit : "", 10);
		const requestedPage = Number.parseInt(typeof req.query.page === "string" ? req.query.page : "", 10);
		const limit = Number.isFinite(requestedLimit) ? Math.min(Math.max(requestedLimit, 1), 100) : 30;
		const page = Number.isFinite(requestedPage) ? Math.max(requestedPage, 1) : 1;
		const action = normalizeText(req.query.action, 80);
		const actorId = normalizeText(req.query.actorId, 80);
		const actorType = normalizeText(req.query.actorType, 16);
		const targetId = normalizeText(req.query.targetId, 80);
		const targetType = normalizeText(req.query.targetType, 32);
		const sourceIp = normalizeText(req.query.sourceIp, 80);
		const from = normalizeText(req.query.from, 40);
		const to = normalizeText(req.query.to, 40);
		const filter: QueryFilter<IAccountActivityLog> = {};

		if (action) {
			if (!isKnownValue(ACCOUNT_ACTIVITY_ACTIONS, action)) {
				return res.status(400).json({ error: "Invalid account activity action." });
			}
			filter.action = action;
		}

		if (actorType) {
			if (!isKnownValue(ACCOUNT_ACTIVITY_ACTOR_TYPES, actorType)) {
				return res.status(400).json({ error: "Invalid actor type." });
			}
			filter.actorType = actorType;
		}

		if (targetType) {
			if (!isKnownValue(ACCOUNT_ACTIVITY_TARGET_TYPES, targetType)) {
				return res.status(400).json({ error: "Invalid target type." });
			}
			filter.targetType = targetType;
		}

		if (actorId) {
			if (!mongoose.Types.ObjectId.isValid(actorId)) {
				return res.status(400).json({ error: "Invalid actor id." });
			}
			filter.actorId = new mongoose.Types.ObjectId(actorId);
		}

		if (targetId) {
			if (!mongoose.Types.ObjectId.isValid(targetId)) {
				return res.status(400).json({ error: "Invalid target id." });
			}
			filter.targetId = new mongoose.Types.ObjectId(targetId);
		}

		if (sourceIp) filter.sourceIp = sourceIp;

		if (from || to) {
			const createdAt: Record<string, Date> = {};
			if (from) {
				const fromDate = new Date(from);
				if (Number.isNaN(fromDate.valueOf())) return res.status(400).json({ error: "Invalid from date." });
				createdAt.$gte = fromDate;
			}
			if (to) {
				const toDate = new Date(to);
				if (Number.isNaN(toDate.valueOf())) return res.status(400).json({ error: "Invalid to date." });
				createdAt.$lte = toDate;
			}
			filter.createdAt = createdAt;
		}

		const skip = (page - 1) * limit;
		const [logs, total] = await Promise.all([
			AccountActivityLog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
			AccountActivityLog.countDocuments(filter)
		]);
		return res.json({
			logs,
			pagination: {
				page,
				limit,
				total,
				hasMore: skip + logs.length < total
			}
		});
	}
	catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Failed to load account activity." });
	}
};
