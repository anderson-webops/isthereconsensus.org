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
import { logError } from "../utils/safeLog.js";

function normalizeText(value: unknown, maxLength: number) {
	if (typeof value !== "string") return "";
	const trimmed = value.trim();
	if (!trimmed) return "";
	return trimmed.length > maxLength
		? trimmed.slice(0, maxLength).trim()
		: trimmed;
}

function isKnownValue<T extends string>(values: readonly T[], value: string): value is T {
	return values.includes(value as T);
}

class AccountActivityQueryError extends Error {}

function optionalActivityEnum<Value extends string>(values: readonly Value[], value: string, message: string) {
	if (!value) return undefined;
	if (!isKnownValue(values, value)) throw new AccountActivityQueryError(message);
	return value;
}

function optionalActivityId(value: string, message: string) {
	if (!value) return undefined;
	if (!mongoose.Types.ObjectId.isValid(value)) throw new AccountActivityQueryError(message);
	return new mongoose.Types.ObjectId(value);
}

function activityDateRange(from: string, to: string) {
	if (!from && !to) return undefined;
	const createdAt: { $gte?: Date; $lte?: Date } = {};
	if (from) {
		const fromDate = new Date(from);
		if (Number.isNaN(fromDate.valueOf())) throw new AccountActivityQueryError("Invalid from date.");
		createdAt.$gte = fromDate;
	}
	if (to) {
		const toDate = new Date(to);
		if (Number.isNaN(toDate.valueOf())) throw new AccountActivityQueryError("Invalid to date.");
		createdAt.$lte = toDate;
	}
	return createdAt;
}

function activityPagination(query: Parameters<RequestHandler>[0]["query"]) {
	const requestedLimit = Number.parseInt(typeof query.limit === "string"
		? query.limit
		: "", 10);
	const requestedPage = Number.parseInt(typeof query.page === "string"
		? query.page
		: "", 10);
	return {
		limit: Number.isFinite(requestedLimit)
			? Math.min(Math.max(requestedLimit, 1), 100)
			: 30,
		page: Number.isFinite(requestedPage)
			? Math.max(requestedPage, 1)
			: 1
	};
}

function activityQueryFilter(query: Parameters<RequestHandler>[0]["query"]): QueryFilter<IAccountActivityLog> {
	const actionText = normalizeText(query.action, 80);
	const actorIdText = normalizeText(query.actorId, 80);
	const actorTypeText = normalizeText(query.actorType, 16);
	const targetIdText = normalizeText(query.targetId, 80);
	const targetTypeText = normalizeText(query.targetType, 32);
	const sourceIp = normalizeText(query.sourceIp, 80);
	const from = normalizeText(query.from, 40);
	const to = normalizeText(query.to, 40);
	const action = optionalActivityEnum(ACCOUNT_ACTIVITY_ACTIONS, actionText, "Invalid account activity action.");
	const actorType = optionalActivityEnum(ACCOUNT_ACTIVITY_ACTOR_TYPES, actorTypeText, "Invalid actor type.");
	const targetType = optionalActivityEnum(ACCOUNT_ACTIVITY_TARGET_TYPES, targetTypeText, "Invalid target type.");
	const actorId = optionalActivityId(actorIdText, "Invalid actor id.");
	const targetId = optionalActivityId(targetIdText, "Invalid target id.");
	const createdAt = activityDateRange(from, to);
	return {
		...(action
			? { action }
			: {}),
		...(actorType
			? { actorType }
			: {}),
		...(targetType
			? { targetType }
			: {}),
		...(actorId
			? { actorId }
			: {}),
		...(targetId
			? { targetId }
			: {}),
		...(sourceIp
			? { sourceIp }
			: {}),
		...(createdAt
			? { createdAt }
			: {})
	};
}

export const listAccountActivity: RequestHandler = async (req, res) => {
	try {
		const { limit, page } = activityPagination(req.query);
		const filter = activityQueryFilter(req.query);
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
		if (error instanceof AccountActivityQueryError) return res.status(400).json({ error: error.message });
		logError("Account activity query failed", error);
		return res.status(500).json({ error: "Failed to load account activity." });
	}
};
