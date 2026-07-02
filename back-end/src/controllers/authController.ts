import type { RequestHandler } from "express";
import type { IAdmin } from "../types/entities/IAdmin.js";
import type { IUser } from "../types/entities/IUser.js";
import type { CustomSession } from "../types/session/CustomSession.js";
import type { AccountActivityActor, AccountActivityTarget } from "../utils/accountActivity.js";
import { Admin } from "../models/schemas/Admin.js";
import { User } from "../models/schemas/User.js";
import { emailFingerprint, recordAccountActivity } from "../utils/accountActivity.js";
import { verifyCaptcha } from "../utils/captcha.js";

type Entity = IUser | IAdmin;

const THIRTY_DAYS_MS: number = 30 * 24 * 60 * 60 * 1000;
const TERMS_VERSION = "2026-04-11";

function isEntity(entity: any): entity is Entity {
	return entity != null && typeof entity.comparePassword === "function";
}

function getEntityId(entity: Entity) {
	return entity._id.toString();
}

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

async function actorFromSession(session: CustomSession): Promise<AccountActivityActor | undefined> {
	if (session.adminID) {
		const admin = await Admin.findById(session.adminID);
		if (admin) return accountActor(admin);
	}
	if (session.userID) {
		const user = await User.findById(session.userID);
		if (user) return accountActor(user);
	}
	return undefined;
}

function canMutate(session: CustomSession, entity: Entity) {
	if (session.adminID) return true;
	const entityId = getEntityId(entity);
	if (entity instanceof Admin) return session.adminID === entityId;
	if (entity instanceof User) return session.userID === entityId;
	return false;
}

export const registerUser: RequestHandler = async (req, res) => {
	const { name, email, password, captchaToken, acceptTerms } = req.body as {
		name?: string;
		email?: string;
		password?: string;
		captchaToken?: string;
		acceptTerms?: boolean;
	};

	if (!name || !email || !password) {
		return res.status(400).json({ error: "Name, email, and password are required." });
	}
	if (!acceptTerms) {
		return res.status(400).json({ error: "You must agree to the Terms of Service." });
	}

	const captcha = await verifyCaptcha(captchaToken, req.ip);
	if (!captcha.ok) {
		return res.status(403).json({ error: captcha.error || "Captcha verification failed." });
	}

	const trimmedName = name.trim();
	const trimmedEmail = email.trim().toLowerCase();

	const [existingUser, existingAdmin] = await Promise.all([
		User.findOne({ email: trimmedEmail }),
		Admin.findOne({ email: trimmedEmail })
	]);

	if (existingUser || existingAdmin) {
		return res.status(409).json({ error: "Email already in use." });
	}

	const user = await User.create({
		name: trimmedName,
		email: trimmedEmail,
		password,
		termsVersion: TERMS_VERSION,
		termsAcceptedAt: new Date()
	});
	const session = req.session as CustomSession;
	session.adminID = undefined;
	session.userID = user._id.toString();

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

	return res.status(201).json({ currentUser: user });
};

export const login: RequestHandler = async (req, res) => {
	const { email, password, remember, captchaToken } = req.body as {
		email?: string;
		password?: string;
		remember?: boolean;
		captchaToken?: string;
	};

	if (!email || !password) {
		return res.status(400).json({ error: "Email and password are required." });
	}

	if (captchaToken) {
		const captcha = await verifyCaptcha(captchaToken, req.ip);
		if (!captcha.ok) {
			return res.status(403).json({ error: captcha.error || "Captcha verification failed." });
		}
	}

	const normalizedEmail = email.trim().toLowerCase();

	const results = (await Promise.all([
		User.findOne({ email: normalizedEmail }).exec(),
		Admin.findOne({ email: normalizedEmail }).exec()
	])) as Array<IUser | IAdmin | null>;

	const entity = results.find(isEntity);
	const matches = entity ? await entity.comparePassword(password) : false;
	if (!entity || !matches) {
		await recordAccountActivity({
			req,
			action: "login.failed",
			actor: { type: "anonymous" },
			target: entity ? accountTarget(entity) : { type: "unknown", email: normalizedEmail },
			metadata: {
				reason: "bad_credentials"
			}
		});
		return res.status(403).json({ error: "Bad credentials." });
	}

	const session = req.session as CustomSession;
	let responseKey: "currentAdmin" | "currentUser";
	if (entity instanceof Admin) {
		session.adminID = entity._id.toString();
		session.userID = undefined;
		responseKey = "currentAdmin";
	}
	else {
		session.adminID = undefined;
		session.userID = entity._id.toString();
		responseKey = "currentUser";
	}

	const options = ((req as any).sessionOptions ??= {});
	options.maxAge = remember ? THIRTY_DAYS_MS : undefined;

	await recordAccountActivity({
		req,
		action: "login.success",
		actor: accountActor(entity),
		target: accountTarget(entity),
		metadata: {
			remember: remember ? "true" : "false"
		}
	});

	return res.json({ [responseKey]: entity });
};

export const logout: RequestHandler = async (req, res) => {
	const session = req.session as CustomSession;
	const entity = session.adminID
		? await Admin.findById(session.adminID)
		: session.userID
			? await User.findById(session.userID)
			: null;

	if (entity) {
		await recordAccountActivity({
			req,
			action: "logout",
			actor: accountActor(entity),
			target: accountTarget(entity)
		});
	}

	(req.session as any) = null;
	return res.sendStatus(200);
};

export const me: RequestHandler = async (req, res) => {
	const session = req.session as CustomSession;

	if (session?.adminID) {
		const admin = await Admin.findById(session.adminID);
		if (!admin) session.adminID = undefined;
		return res.json({ currentAdmin: admin ?? null, currentUser: null });
	}

	if (session?.userID) {
		const user = await User.findById(session.userID);
		if (!user) session.userID = undefined;
		return res.json({ currentUser: user ?? null, currentAdmin: null });
	}

	return res.json({ currentUser: null, currentAdmin: null });
};

export const checkEmail: RequestHandler = async (req, res) => {
	const { id, email } = req.body as { id?: string; email?: string };
	if (!email) return res.status(400).json({ error: "Email required." });

	const [u, a] = await Promise.all([User.findOne({ email }), Admin.findOne({ email })]);
	const conflict = [u, a].some(entity => entity && entity._id.toString() !== id);
	return res.status(conflict ? 409 : 200).json({ available: !conflict });
};

export const changeEmail: RequestHandler = async (req, res) => {
	const { id } = req.params as { id?: string };
	const { email: newEmail } = req.body as { email?: string };

	if (!id) return res.status(400).json({ error: "Missing account id." });
	if (!newEmail) return res.status(400).json({ error: "New email is required." });

	const normalizedEmail = newEmail.trim().toLowerCase();
	const models = [User, Admin] as Array<import("mongoose").Model<any>>;
	const conflicts = await Promise.all(
		models.map(Model => Model.exists({ email: normalizedEmail, _id: { $ne: id } }))
	);

	if (conflicts.some(Boolean)) {
		return res.status(409).json({ error: "Email already exists." });
	}

	const session = req.session as CustomSession;
	for (const Model of models) {
		const doc = await Model.findById(id);
		if (!doc) continue;
		if (!canMutate(session, doc as Entity)) {
			return res.status(403).json({ error: "Not authorized to update this email." });
		}
		const previousEmail = doc.email;
		doc.email = normalizedEmail;
		await doc.save();
		const previousEmailFingerprint = emailFingerprint(previousEmail);
		const newEmailFingerprint = emailFingerprint(normalizedEmail);
		await recordAccountActivity({
			req,
			action: "email.changed",
			actor: (await actorFromSession(session)) ?? accountActor(doc as Entity),
			target: accountTarget(doc as Entity),
			metadata: {
				previousEmailHash: previousEmailFingerprint.targetEmailHash,
				previousEmailDomain: previousEmailFingerprint.targetEmailDomain,
				newEmailHash: newEmailFingerprint.targetEmailHash,
				newEmailDomain: newEmailFingerprint.targetEmailDomain
			}
		});
		return res.json({ message: "Email updated successfully." });
	}

	return res.status(404).json({ error: "Account not found." });
};

export const changePassword: RequestHandler = async (req, res) => {
	const { id } = req.params as { id?: string };
	const { currentPassword, newPassword } = req.body as {
		currentPassword?: string;
		newPassword?: string;
	};

	if (!id) return res.status(400).json({ error: "Missing account id." });
	if (!newPassword) return res.status(400).json({ error: "New password is required." });

	const models = [User, Admin] as Array<import("mongoose").Model<any>>;
	const session = req.session as CustomSession;

	for (const Model of models) {
		const doc = await Model.findById(id);
		if (!doc) continue;
		if (!canMutate(session, doc as Entity)) {
			return res.status(403).json({ error: "Not authorized to update this password." });
		}

		const isAdminOverride = !!session.adminID;
		if (!isAdminOverride) {
			if (!currentPassword) {
				return res.status(400).json({ error: "Current password is required." });
			}
			const matches = await (doc as Entity).comparePassword(currentPassword);
			if (!matches) {
				return res.status(403).json({ error: "Current password is incorrect." });
			}
		}

		doc.password = newPassword;
		await doc.save();
		await recordAccountActivity({
			req,
			action: "password.changed",
			actor: (await actorFromSession(session)) ?? accountActor(doc as Entity),
			target: accountTarget(doc as Entity),
			metadata: {
				adminOverride: isAdminOverride ? "true" : "false"
			}
		});
		return res.json({ message: "Password updated successfully." });
	}

	return res.status(404).json({ error: "Account not found." });
};
