import type { RequestHandler } from "express";
import type { IAdmin } from "../types/entities/IAdmin.js";
import type { IUser } from "../types/entities/IUser.js";
import type { CustomSession } from "../types/session/CustomSession.js";
import type { AccountActivityActor, AccountActivityTarget } from "../utils/accountActivity.js";
import argon2 from "argon2";
import { Admin } from "../models/schemas/Admin.js";
import { User } from "../models/schemas/User.js";
import { emailFingerprint, recordAccountActivity } from "../utils/accountActivity.js";
import {
	adminPasswordSchema,
	emailChangeSchema,
	firstValidationError,
	loginSchema,
	passwordChangeSchema,
	registrationSchema
} from "../utils/accountValidation.js";
import { adminIsEnabled } from "../utils/adminAccess.js";
import { verifyCaptcha } from "../utils/captcha.js";
import { logError } from "../utils/safeLog.js";

type Entity = IUser | IAdmin;

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const ADMIN_SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000;
const TERMS_VERSION = "2026-04-11";
const dummyPasswordHash = argon2.hash("not-a-real-account-password");

function accountType(entity: Entity): "admin" | "user" {
	return entity instanceof Admin ? "admin" : "user";
}

function accountTarget(entity: Entity): AccountActivityTarget {
	return {
		id: entity._id.toString(),
		type: accountType(entity),
		email: entity.email
	};
}

function accountActor(entity: Entity): AccountActivityActor {
	return {
		id: entity._id.toString(),
		type: accountType(entity)
	};
}

function sessionVersion(entity: Entity) {
	return Number(entity.sessionVersion || 0);
}

function clearSession(req: Parameters<RequestHandler>[0]) {
	(req.session as unknown) = null;
}

function hasAmbiguousIdentity(session: CustomSession | undefined) {
	return Boolean(session?.userID && session?.adminID);
}

function setSession(req: Parameters<RequestHandler>[0], entity: Entity) {
	const session = req.session as CustomSession;
	session.sessionVersion = sessionVersion(entity);
	if (entity instanceof Admin) {
		session.adminID = entity._id.toString();
		session.userID = undefined;
	}
	else {
		session.adminID = undefined;
		session.userID = entity._id.toString();
	}
}

function currentEntity(req: Parameters<RequestHandler>[0]): Entity | null {
	return req.currentAdmin ?? req.currentUser ?? null;
}

async function consumeDummyPasswordCheck(password: string) {
	const hash = await dummyPasswordHash;
	await argon2.verify(hash, password);
}

export const registerUser: RequestHandler = async (req, res) => {
	const parsed = registrationSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ error: firstValidationError(parsed.error) });
	}

	const captcha = await verifyCaptcha(parsed.data.captchaToken, req.ip);
	if (!captcha.ok) {
		return res.status(403).json({ error: captcha.error || "Captcha verification failed." });
	}

	const [existingUser, existingAdmin] = await Promise.all([
		User.exists({ email: parsed.data.email }),
		Admin.exists({ email: parsed.data.email })
	]);
	if (existingUser || existingAdmin) {
		return res.status(409).json({ error: "Email already in use." });
	}

	const user = await User.create({
		name: parsed.data.name,
		email: parsed.data.email,
		password: parsed.data.password,
		termsVersion: TERMS_VERSION,
		termsAcceptedAt: new Date()
	});
	setSession(req, user);

	await recordAccountActivity({
		req,
		action: "user.registered",
		actor: { type: "anonymous" },
		target: accountTarget(user),
		metadata: {
			source: "public_registration",
			termsVersion: TERMS_VERSION
		}
	});

	return res.status(201).json({ currentUser: user, currentAdmin: null });
};

export const login: RequestHandler = async (req, res) => {
	const parsed = loginSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ error: "Email and password are required." });
	}

	if (parsed.data.captchaToken) {
		const captcha = await verifyCaptcha(parsed.data.captchaToken, req.ip);
		if (!captcha.ok) {
			return res.status(403).json({ error: captcha.error || "Captcha verification failed." });
		}
	}

	const [user, admin] = await Promise.all([
		User.findOne({ email: parsed.data.email }).exec(),
		Admin.findOne({ email: parsed.data.email }).exec()
	]);
	const matchesExactlyOneAccount = Number(Boolean(user)) + Number(Boolean(admin)) === 1;
	const entity = matchesExactlyOneAccount ? (admin ?? user) : null;
	const matches = entity
		? await entity.comparePassword(parsed.data.password)
		: (await consumeDummyPasswordCheck(parsed.data.password), false);
	const disabledAdmin = entity instanceof Admin && !adminIsEnabled(entity);

	if (!entity || !matches || disabledAdmin) {
		await recordAccountActivity({
			req,
			action: "login.failed",
			actor: { type: "anonymous" },
			target: entity ? accountTarget(entity) : { type: "unknown", email: parsed.data.email },
			metadata: {
				reason: disabledAdmin
					? "disabled_account"
					: matchesExactlyOneAccount ? "bad_credentials" : "unknown_or_ambiguous_account"
			}
		});
		return res.status(403).json({ error: "Invalid email or password." });
	}

	setSession(req, entity);
	const options = ((req as unknown as { sessionOptions?: { maxAge?: number } }).sessionOptions ??= {});
	const remember = !(entity instanceof Admin) && parsed.data.remember;
	options.maxAge = entity instanceof Admin ? ADMIN_SESSION_MAX_AGE_MS : remember ? THIRTY_DAYS_MS : undefined;

	await recordAccountActivity({
		req,
		action: "login.success",
		actor: accountActor(entity),
		target: accountTarget(entity),
		metadata: {
			remember: remember ? "true" : "false",
			sessionClass: entity instanceof Admin ? "admin_8h" : remember ? "remembered_user" : "browser_session"
		}
	});

	return entity instanceof Admin
		? res.json({ currentAdmin: entity, currentUser: null })
		: res.json({ currentUser: entity, currentAdmin: null });
};

export const logout: RequestHandler = async (req, res) => {
	const session = req.session as CustomSession;
	clearSession(req);

	try {
		const entity = hasAmbiguousIdentity(session)
			? null
			: session?.adminID
				? await Admin.findById(session.adminID)
				: session?.userID
					? await User.findById(session.userID)
					: null;

		if (entity && session.sessionVersion === sessionVersion(entity)) {
			await recordAccountActivity({
				req,
				action: "logout",
				actor: accountActor(entity),
				target: accountTarget(entity)
			});
		}
	}
	catch (error) {
		logError("Logout audit lookup failed", error);
	}

	return res.sendStatus(200);
};

export const me: RequestHandler = async (req, res) => {
	const session = req.session as CustomSession | undefined;
	if (hasAmbiguousIdentity(session)) {
		clearSession(req);
		return res.json({ currentUser: null, currentAdmin: null });
	}
	let entity: Entity | null = null;
	if (session?.adminID) entity = await Admin.findById(session.adminID);
	else if (session?.userID) entity = await User.findById(session.userID);

	if (
		!entity
		|| (entity instanceof Admin && !adminIsEnabled(entity))
		|| session?.sessionVersion !== sessionVersion(entity)
	) {
		if (session?.adminID || session?.userID) clearSession(req);
		return res.json({ currentUser: null, currentAdmin: null });
	}

	return entity instanceof Admin
		? res.json({ currentAdmin: entity, currentUser: null })
		: res.json({ currentUser: entity, currentAdmin: null });
};

export const changeEmail: RequestHandler = async (req, res) => {
	const entity = currentEntity(req);
	if (!entity) return res.status(403).json({ error: "Login required." });

	const parsed = emailChangeSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ error: firstValidationError(parsed.error) });
	}

	if (!(await entity.comparePassword(parsed.data.currentPassword))) {
		return res.status(403).json({ error: "Current password is incorrect." });
	}

	const isAdmin = entity instanceof Admin;
	const conflicts = await Promise.all([
		User.exists(isAdmin ? { email: parsed.data.email } : { email: parsed.data.email, _id: { $ne: entity._id } }),
		Admin.exists(isAdmin ? { email: parsed.data.email, _id: { $ne: entity._id } } : { email: parsed.data.email })
	]);
	if (conflicts.some(Boolean)) {
		return res.status(409).json({ error: "Email already in use." });
	}

	const previousEmail = entity.email;
	entity.email = parsed.data.email;
	entity.sessionVersion = sessionVersion(entity) + 1;
	await entity.save();
	setSession(req, entity);

	const previousEmailFingerprint = emailFingerprint(previousEmail);
	const newEmailFingerprint = emailFingerprint(parsed.data.email);
	await recordAccountActivity({
		req,
		action: "email.changed",
		actor: accountActor(entity),
		target: accountTarget(entity),
		metadata: {
			previousEmailHash: previousEmailFingerprint.targetEmailHash,
			previousEmailDomain: previousEmailFingerprint.targetEmailDomain,
			newEmailHash: newEmailFingerprint.targetEmailHash,
			newEmailDomain: newEmailFingerprint.targetEmailDomain
		}
	});

	return entity instanceof Admin
		? res.json({ message: "Email updated successfully.", currentAdmin: entity, currentUser: null })
		: res.json({ message: "Email updated successfully.", currentUser: entity, currentAdmin: null });
};

export const changePassword: RequestHandler = async (req, res) => {
	const entity = currentEntity(req);
	if (!entity) return res.status(403).json({ error: "Login required." });

	const parsed = passwordChangeSchema.safeParse(req.body);
	if (!parsed.success) {
		return res.status(400).json({ error: firstValidationError(parsed.error) });
	}
	if (entity instanceof Admin) {
		const adminPassword = adminPasswordSchema.safeParse(parsed.data.newPassword);
		if (!adminPassword.success) {
			return res.status(400).json({ error: firstValidationError(adminPassword.error) });
		}
	}
	if (!(await entity.comparePassword(parsed.data.currentPassword))) {
		return res.status(403).json({ error: "Current password is incorrect." });
	}

	entity.password = parsed.data.newPassword;
	entity.sessionVersion = sessionVersion(entity) + 1;
	await entity.save();
	setSession(req, entity);

	await recordAccountActivity({
		req,
		action: "password.changed",
		actor: accountActor(entity),
		target: accountTarget(entity),
		metadata: {
			revokedOtherSessions: "true"
		}
	});
	return res.json({ message: "Password updated successfully." });
};
