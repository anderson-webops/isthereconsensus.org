import type { RequestHandler } from "express";
import { Admin } from "../models/schemas/Admin.js";
import { User } from "../models/schemas/User.js";

export const requireUser: RequestHandler = async (req, res, next) => {
	const session = req.session as any;
	if (!session?.userID) {
		return res.status(403).json({ error: "Login required" });
	}
	try {
		const user = await User.findById(session.userID);
		if (!user) return res.status(403).json({ error: "User not found" });
		req.currentUser = user;
		return next();
	}
	catch (error) {
		console.error("User auth error", error);
		return res.status(500).json({ error: "Unable to validate user" });
	}
};

export const requireAdmin: RequestHandler = async (req, res, next) => {
	const session = req.session as any;
	if (!session?.adminID) {
		return res.status(403).json({ error: "Admin login required" });
	}
	try {
		const admin = await Admin.findById(session.adminID);
		if (!admin) return res.status(403).json({ error: "Admin not found" });
		req.currentAdmin = admin;
		return next();
	}
	catch (error) {
		console.error("Admin auth error", error);
		return res.status(500).json({ error: "Unable to validate admin" });
	}
};

export const requireAuth: RequestHandler = async (req, res, next) => {
	const session = req.session as any;
	if (session?.userID) return requireUser(req, res, next);
	if (session?.adminID) return requireAdmin(req, res, next);
	return res.status(403).json({ error: "Login required" });
};

export const requireEditorial: RequestHandler = async (req, res, next) => {
	const session = req.session as any;
	if (session?.adminID) {
		return requireAdmin(req, res, next);
	}

	if (!session?.userID) {
		return res.status(403).json({ error: "Editorial access requires a verified expert or admin." });
	}

	try {
		const user = await User.findById(session.userID);
		if (!user) {
			return res.status(403).json({ error: "User not found" });
		}
		if (user.expertiseStatus !== "verified") {
			return res.status(403).json({ error: "Verified expert access required." });
		}
		req.currentUser = user;
		return next();
	}
	catch (error) {
		console.error("Editorial auth error", error);
		return res.status(500).json({ error: "Unable to validate editorial access" });
	}
};
