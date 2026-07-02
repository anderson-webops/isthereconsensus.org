import type { Request } from "express";
import type {
	AccountActivityAction,
	AccountActivityActorType,
	AccountActivityTargetType
} from "../models/schemas/AccountActivityLog.js";
import { createHash } from "node:crypto";
import mongoose from "mongoose";
import { AccountActivityLog } from "../models/schemas/AccountActivityLog.js";

const sensitiveMetadataKeyPattern = /password|token|secret|captcha|session|cookie|authorization|auth/i;
const emailMetadataKeyPattern = /email/i;
const allowedEmailMetadataKeyPattern = /emailHash$|emailDomain$/i;
const metadataValueMaxLength = 500;

export interface AccountActivityActor {
	type: AccountActivityActorType;
	id?: string;
}

export interface AccountActivityTarget {
	type: AccountActivityTargetType;
	id?: string;
	email?: string;
	emailHash?: string;
	emailDomain?: string;
}

export interface RecordAccountActivityInput {
	req?: Request;
	action: AccountActivityAction;
	actor: AccountActivityActor;
	target: AccountActivityTarget;
	metadata?: Record<string, unknown>;
}

function clientIp(req?: Request) {
	if (!req) return "";
	const forwardedFor = req.headers["x-forwarded-for"];
	const forwardedIp
		= typeof forwardedFor === "string"
			? forwardedFor.split(",")[0]?.trim()
			: Array.isArray(forwardedFor)
				? forwardedFor[0]?.trim()
				: undefined;
	return forwardedIp || req.ip || req.socket.remoteAddress || "";
}

function requestId(req?: Request) {
	if (!req) return "";
	const rawRequestId = req.get("x-request-id") || req.get("x-correlation-id") || "";
	return rawRequestId.trim().slice(0, 120);
}

function normalizeObjectId(id?: string) {
	if (!id || !mongoose.Types.ObjectId.isValid(id)) return undefined;
	return new mongoose.Types.ObjectId(id);
}

export function emailFingerprint(email?: string) {
	const normalizedEmail = email?.trim().toLowerCase() ?? "";
	if (!normalizedEmail) {
		return {
			targetEmailHash: "",
			targetEmailDomain: ""
		};
	}

	return {
		targetEmailHash: createHash("sha256").update(normalizedEmail).digest("hex"),
		targetEmailDomain: normalizedEmail.split("@").pop() ?? ""
	};
}

export function sanitizeAccountActivityMetadata(metadata: Record<string, unknown> = {}) {
	const sanitized: Record<string, string> = {};
	for (const [key, value] of Object.entries(metadata)) {
		if (!key || sensitiveMetadataKeyPattern.test(key)) continue;
		if (emailMetadataKeyPattern.test(key) && !allowedEmailMetadataKeyPattern.test(key)) continue;
		if (value === undefined || value === null) continue;

		const stringValue = String(value).trim();
		if (!stringValue) continue;
		if (stringValue.length > metadataValueMaxLength) {
			sanitized[key] = stringValue.slice(0, metadataValueMaxLength).trim();
			continue;
		}
		sanitized[key] = stringValue;
	}
	return sanitized;
}

export async function recordAccountActivity(input: RecordAccountActivityInput) {
	try {
		const emailFields = input.target.email
			? emailFingerprint(input.target.email)
			: {
					targetEmailHash: input.target.emailHash ?? "",
					targetEmailDomain: input.target.emailDomain ?? ""
				};

		await AccountActivityLog.create({
			action: input.action,
			actorType: input.actor.type,
			actorId: normalizeObjectId(input.actor.id),
			targetType: input.target.type,
			targetId: normalizeObjectId(input.target.id),
			targetEmailHash: emailFields.targetEmailHash,
			targetEmailDomain: emailFields.targetEmailDomain,
			sourceIp: clientIp(input.req),
			userAgent: input.req?.get("user-agent") || "",
			requestId: requestId(input.req),
			metadata: sanitizeAccountActivityMetadata(input.metadata)
		});
	}
	catch (error) {
		console.error("Failed to record account activity", error);
	}
}
