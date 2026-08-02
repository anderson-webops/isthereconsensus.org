import type { RequestHandler } from "express";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import mongoose from "mongoose";
import { changeEmail, changePassword, login, logout, me } from "../src/controllers/authController.js";
import { optionalAuth, requireAdmin, requireUser } from "../src/middleware/auth.js";
import { AccountActivityLog } from "../src/models/schemas/AccountActivityLog.js";
import { Admin } from "../src/models/schemas/Admin.js";
import { User } from "../src/models/schemas/User.js";

const originals = {
	accountActivityCreate: AccountActivityLog.create,
	adminExists: Admin.exists,
	adminFindById: Admin.findById,
	adminFindOne: Admin.findOne,
	userExists: User.exists,
	userFindById: User.findById,
	userFindOne: User.findOne
};

function mockResponse() {
	return {
		statusCode: 200,
		body: undefined as unknown,
		status(code: number) {
			this.statusCode = code;
			return this;
		},
		json(payload: unknown) {
			this.body = payload;
			return this;
		},
		sendStatus(code: number) {
			this.statusCode = code;
			return this;
		}
	};
}

async function runHandler(handler: RequestHandler, req: any, res = mockResponse()) {
	await handler(req, res as any, () => undefined);
	return res;
}

function account() {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: "Account Owner",
		email: "owner@example.com",
		password: "existing-password-hash",
		sessionVersion: 4
	});
	(user as any).comparePassword = async (password: string) => password === "correct current password";
	(user as any).save = async () => user;
	return user;
}

afterEach(() => {
	AccountActivityLog.create = originals.accountActivityCreate;
	Admin.exists = originals.adminExists;
	Admin.findById = originals.adminFindById;
	Admin.findOne = originals.adminFindOne;
	User.exists = originals.userExists;
	User.findById = originals.userFindById;
	User.findOne = originals.userFindOne;
});

describe("account security", () => {
	it("changes only the authenticated account email and revokes older sessions", async () => {
		const user = account();
		User.exists = (async () => null) as any;
		Admin.exists = (async () => null) as any;
		AccountActivityLog.create = (async (entry: unknown) => entry) as any;
		const session = {
			userID: user._id.toString(),
			sessionVersion: 4
		};

		const response = await runHandler(
			changeEmail,
			{
				body: {
					email: "new.owner@example.com",
					currentPassword: "correct current password"
				},
				currentUser: user,
				session,
				headers: {},
				socket: {},
				get: () => ""
			}
		);

		assert.equal(response.statusCode, 200);
		assert.equal(user.email, "new.owner@example.com");
		assert.equal(user.sessionVersion, 5);
		assert.equal(session.sessionVersion, 5);
	});

	it("requires the current password before changing an email", async () => {
		const user = account();
		const response = await runHandler(
			changeEmail,
			{
				body: {
					email: "attacker@example.com",
					currentPassword: "wrong password"
				},
				currentUser: user,
				session: {
					userID: user._id.toString(),
					sessionVersion: 4
				}
			}
		);

		assert.equal(response.statusCode, 403);
		assert.equal(user.email, "owner@example.com");
		assert.equal(user.sessionVersion, 4);
	});

	it("rejects short replacement passwords before mutating the account", async () => {
		const user = account();
		const response = await runHandler(
			changePassword,
			{
				body: {
					currentPassword: "correct current password",
					newPassword: "short"
				},
				currentUser: user,
				session: {
					userID: user._id.toString(),
					sessionVersion: 4
				}
			}
		);

		assert.equal(response.statusCode, 400);
		assert.equal(user.sessionVersion, 4);
	});

	it("keeps admin replacement passwords on the stronger minimum", async () => {
		const admin = new Admin({
			_id: new mongoose.Types.ObjectId(),
			name: "Administrator",
			email: "admin@example.com",
			password: "existing-password-hash",
			sessionVersion: 2,
			editAdmins: false,
			saveEdit: "Edit"
		});
		(admin as any).comparePassword = async () => true;
		(admin as any).save = async () => admin;

		const response = await runHandler(
			changePassword,
			{
				body: {
					currentPassword: "correct current password",
					newPassword: "twelve chars"
				},
				currentAdmin: admin,
				session: {
					adminID: admin._id.toString(),
					sessionVersion: 2
				}
			}
		);

		assert.equal(response.statusCode, 400);
		assert.equal(admin.sessionVersion, 2);
	});

	it("caps admin login cookies at eight hours even when remember is requested", async () => {
		const admin = new Admin({
			_id: new mongoose.Types.ObjectId(),
			name: "Administrator",
			email: "admin@example.com",
			password: "existing-password-hash",
			sessionVersion: 2,
			editAdmins: false,
			saveEdit: "Edit"
		});
		(admin as any).comparePassword = async () => true;
		User.findOne = (() => ({ exec: async () => null })) as any;
		Admin.findOne = (() => ({ exec: async () => admin })) as any;
		AccountActivityLog.create = (async (entry: unknown) => entry) as any;
		const req: any = {
			body: {
				email: "admin@example.com",
				password: "correct current password",
				remember: true
			},
			session: {},
			headers: {},
			socket: {},
			get: () => ""
		};

		const response = await runHandler(login, req);

		assert.equal(response.statusCode, 200);
		assert.equal(req.session.adminID, admin._id.toString());
		assert.equal(req.session.userID, undefined);
		assert.equal(req.sessionOptions.maxAge, 8 * 60 * 60 * 1000);
	});

	it("rejects a disabled admin even when the submitted password is correct", async () => {
		const admin = new Admin({
			_id: new mongoose.Types.ObjectId(),
			enabled: false,
			name: "Disabled administrator",
			email: "disabled-admin@example.com",
			password: "existing-password-hash",
			sessionVersion: 7,
			editAdmins: false,
			saveEdit: "Edit"
		});
		(admin as any).comparePassword = async () => true;
		User.findOne = (() => ({ exec: async () => null })) as any;
		Admin.findOne = (() => ({ exec: async () => admin })) as any;
		AccountActivityLog.create = (async (entry: unknown) => entry) as any;
		const req: any = {
			body: {
				email: "disabled-admin@example.com",
				password: "correct current password"
			},
			session: {},
			headers: {},
			socket: {},
			get: () => ""
		};

		const response = await runHandler(login, req);

		assert.equal(response.statusCode, 403);
		assert.deepEqual(response.body, { error: "Invalid email or password." });
		assert.equal(req.session.adminID, undefined);
	});

	it("revokes a disabled admin session at every authorization check", async () => {
		const admin = new Admin({
			_id: new mongoose.Types.ObjectId(),
			enabled: false,
			name: "Disabled administrator",
			email: "disabled-admin@example.com",
			password: "existing-password-hash",
			sessionVersion: 7,
			editAdmins: false,
			saveEdit: "Edit"
		});
		Admin.findById = (async () => admin) as any;
		const req: any = {
			session: {
				adminID: admin._id.toString(),
				sessionVersion: 7
			}
		};

		const response = await runHandler(requireAdmin, req);

		assert.equal(response.statusCode, 403);
		assert.equal(req.session, null);
		assert.deepEqual(response.body, { error: "Session expired" });
	});

	it("invalidates a cookie whose session version no longer matches the account", async () => {
		const user = account();
		User.findById = (async () => user) as any;
		const req: any = {
			session: {
				userID: user._id.toString(),
				sessionVersion: 3
			}
		};
		const response = await runHandler(requireUser, req);

		assert.equal(response.statusCode, 403);
		assert.equal(req.session, null);
		assert.deepEqual(response.body, { error: "Session expired" });
	});

	it("clears a stale optional session and continues as an anonymous request", async () => {
		const user = account();
		User.findById = (async () => user) as any;
		const req: any = {
			session: {
				userID: user._id.toString(),
				sessionVersion: 3
			}
		};
		const response = mockResponse();
		let continued = false;

		await optionalAuth(req, response as any, () => {
			continued = true;
		});

		assert.equal(continued, true);
		assert.equal(req.session, null);
		assert.equal(req.currentUser, undefined);
		assert.equal(response.statusCode, 200);
	});

	it("rejects a session that claims both user and admin identities", async () => {
		const req: any = {
			session: {
				userID: new mongoose.Types.ObjectId().toString(),
				adminID: new mongoose.Types.ObjectId().toString(),
				sessionVersion: 0
			}
		};
		const response = await runHandler(requireAdmin, req);

		assert.equal(response.statusCode, 403);
		assert.equal(req.session, null);
		assert.deepEqual(response.body, { error: "Invalid session" });
	});

	it("treats an ambiguous identity as logged out on the public account-status route", async () => {
		const req: any = {
			session: {
				userID: new mongoose.Types.ObjectId().toString(),
				adminID: new mongoose.Types.ObjectId().toString(),
				sessionVersion: 0
			}
		};
		const response = await runHandler(me, req);

		assert.equal(response.statusCode, 200);
		assert.equal(req.session, null);
		assert.deepEqual(response.body, { currentUser: null, currentAdmin: null });
	});

	it("clears the browser session even when the logout audit lookup cannot reach the database", async () => {
		User.findById = (async () => {
			throw new Error("database unavailable");
		}) as any;
		const req: any = {
			session: {
				userID: new mongoose.Types.ObjectId().toString(),
				sessionVersion: 4
			}
		};

		const response = await runHandler(logout, req);

		assert.equal(response.statusCode, 200);
		assert.equal(req.session, null);
	});
});
