import type { RequestHandler } from "express";
import type { CustomSession } from "../types/session/CustomSession.js";
import { Admin } from "../models/schemas/Admin.js";
import { User } from "../models/schemas/User.js";
import { adminIsEnabled } from "../utils/adminAccess.js";
import { logError } from "../utils/safeLog.js";

function sessionVersionMatches(session: CustomSession, account: { sessionVersion?: number }) {
	return session.sessionVersion === Number(account.sessionVersion || 0);
}

function hasAmbiguousIdentity(session: CustomSession) {
	return Boolean(session?.userID && session?.adminID);
}

function clearSession(req: Parameters<RequestHandler>[0]) {
	(req.session as unknown) = null;
}

export const requireUser: RequestHandler = async (req, res, next) => {
	const session = req.session as CustomSession;
	if (hasAmbiguousIdentity(session)) {
		clearSession(req);
		return res.status(403).json({ error: "Invalid session" });
	}
	if (!session?.userID) {
		return res.status(403).json({ error: "Login required" });
	}
	try {
		const user = await User.findById(session.userID);
		if (!user || !sessionVersionMatches(session, user)) {
			clearSession(req);
			return res.status(403).json({ error: "Session expired" });
		}
		req.currentUser = user;
		return next();
	}
	catch (error) {
		logError("User auth validation failed", error);
		return res.status(500).json({ error: "Unable to validate user" });
	}
};

export const requireAdmin: RequestHandler = async (req, res, next) => {
	const session = req.session as CustomSession;
	if (hasAmbiguousIdentity(session)) {
		clearSession(req);
		return res.status(403).json({ error: "Invalid session" });
	}
	if (!session?.adminID) {
		return res.status(403).json({ error: "Admin login required" });
	}
	try {
		const admin = await Admin.findById(session.adminID);
		if (!admin || !adminIsEnabled(admin) || !sessionVersionMatches(session, admin)) {
			clearSession(req);
			return res.status(403).json({ error: "Session expired" });
		}
		req.currentAdmin = admin;
		return next();
	}
	catch (error) {
		logError("Admin auth validation failed", error);
		return res.status(500).json({ error: "Unable to validate admin" });
	}
};

export const requireAuth: RequestHandler = async (req, res, next) => {
	const session = req.session as CustomSession;
	if (hasAmbiguousIdentity(session)) {
		clearSession(req);
		return res.status(403).json({ error: "Invalid session" });
	}
	if (session?.userID) return requireUser(req, res, next);
	if (session?.adminID) return requireAdmin(req, res, next);
	return res.status(403).json({ error: "Login required" });
};

export const optionalAuth: RequestHandler = async (req, res, next) => {
	const session = req.session as CustomSession;
	if (hasAmbiguousIdentity(session)) {
		clearSession(req);
		return next();
	}
	if (!session?.userID && !session?.adminID) return next();

	try {
		if (session.userID) {
			const user = await User.findById(session.userID);
			if (!user || !sessionVersionMatches(session, user)) {
				clearSession(req);
				return next();
			}
			req.currentUser = user;
			return next();
		}

		const admin = await Admin.findById(session.adminID);
		if (!admin || !adminIsEnabled(admin) || !sessionVersionMatches(session, admin)) {
			clearSession(req);
			return next();
		}
		req.currentAdmin = admin;
		return next();
	}
	catch (error) {
		logError("Optional auth validation failed", error);
		return res.status(500).json({ error: "Unable to validate session" });
	}
};

export const requireEditorial: RequestHandler = async (req, res, next) => {
	const session = req.session as CustomSession;
	if (hasAmbiguousIdentity(session)) {
		clearSession(req);
		return res.status(403).json({ error: "Invalid session" });
	}
	if (session?.adminID) {
		return requireAdmin(req, res, next);
	}

	if (!session?.userID) {
		return res.status(403).json({ error: "Editorial access requires a verified expert or admin." });
	}

	try {
		const user = await User.findById(session.userID);
		if (!user || !sessionVersionMatches(session, user)) {
			clearSession(req);
			return res.status(403).json({ error: "Session expired" });
		}
		if (user.expertiseStatus !== "verified") {
			return res.status(403).json({ error: "Verified expert access required." });
		}
		req.currentUser = user;
		return next();
	}
	catch (error) {
		logError("Editorial auth validation failed", error);
		return res.status(500).json({ error: "Unable to validate editorial access" });
	}
};
