import type { RequestHandler } from "express";
import assert from "node:assert/strict";
import process from "node:process";
import { afterEach, describe, it } from "node:test";
import mongoose from "mongoose";
import { listAccountActivity } from "../src/controllers/accountActivityController.js";
import { login, registerUser } from "../src/controllers/authController.js";
import { requireAdmin } from "../src/middleware/auth.js";
import { AccountActivityLog } from "../src/models/schemas/AccountActivityLog.js";
import { Admin } from "../src/models/schemas/Admin.js";
import { User } from "../src/models/schemas/User.js";
import { sanitizeAccountActivityMetadata } from "../src/utils/accountActivity.js";

const originalCaptchaSecret = process.env.CAPTCHA_SECRET;
const originals = {
	accountActivityCreate: AccountActivityLog.create,
	accountActivityFind: AccountActivityLog.find,
	accountActivityCountDocuments: AccountActivityLog.countDocuments,
	adminFindById: Admin.findById,
	adminFindOne: Admin.findOne,
	userCreate: User.create,
	userFindOne: User.findOne
};

function mockResponse() {
	const response = {
		statusCode: 200,
		body: undefined as unknown,
		headers: {} as Record<string, string>,
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
			this.body = undefined;
			return this;
		},
		set(name: string, value: string) {
			this.headers[name] = value;
			return this;
		}
	};
	return response;
}

function mockRequest(overrides: Record<string, unknown> = {}) {
	return {
		body: {},
		headers: {},
		ip: "198.51.100.25",
		query: {},
		session: {},
		socket: {},
		get(name: string) {
			return (this.headers as Record<string, string>)[name.toLowerCase()] ?? "";
		},
		...overrides
	};
}

async function runHandler(handler: RequestHandler, req: any, res: ReturnType<typeof mockResponse>) {
	await handler(req, res as any, () => undefined);
	return res;
}

function testUser(email = "member@example.com") {
	const user = new User({
		_id: new mongoose.Types.ObjectId(),
		name: "A Member",
		email,
		password: "hashed"
	});
	(user as any).comparePassword = async () => false;
	return user;
}

afterEach(() => {
	process.env.CAPTCHA_SECRET = originalCaptchaSecret;
	AccountActivityLog.create = originals.accountActivityCreate;
	AccountActivityLog.find = originals.accountActivityFind;
	AccountActivityLog.countDocuments = originals.accountActivityCountDocuments;
	Admin.findById = originals.adminFindById;
	Admin.findOne = originals.adminFindOne;
	User.create = originals.userCreate;
	User.findOne = originals.userFindOne;
});

describe("account activity logging", () => {
	it("creates an audit row after successful public user registration", async () => {
		delete process.env.CAPTCHA_SECRET;
		const createdLogs: any[] = [];
		const user = testUser("new.member@example.com");
		User.findOne = (async () => null) as any;
		Admin.findOne = (async () => null) as any;
		User.create = (async () => user) as any;
		AccountActivityLog.create = (async (entry: any) => {
			createdLogs.push(entry);
			return entry;
		}) as any;

		const req = mockRequest({
			body: {
				acceptTerms: true,
				email: "New.Member@Example.com",
				name: "A Member",
				password: "not-logged"
			},
			headers: { "user-agent": "test-agent", "x-request-id": "req-register" },
			session: {}
		});
		const res = await runHandler(registerUser, req, mockResponse());

		assert.equal(res.statusCode, 201);
		assert.equal(createdLogs.length, 1);
		assert.equal(createdLogs[0].action, "user.registered");
		assert.equal(createdLogs[0].actorType, "anonymous");
		assert.equal(createdLogs[0].targetType, "user");
		assert.equal(createdLogs[0].targetEmailDomain, "example.com");
		assert.ok(createdLogs[0].targetEmailHash);
		assert.equal("targetEmail" in createdLogs[0], false);
		assert.equal(JSON.stringify(createdLogs[0]).includes("not-logged"), false);
	});

	it("creates a failed-login audit row without password or token data", async () => {
		delete process.env.CAPTCHA_SECRET;
		const createdLogs: any[] = [];
		const user = testUser("member@example.com");
		User.findOne = (() => ({ exec: async () => user })) as any;
		Admin.findOne = (() => ({ exec: async () => null })) as any;
		AccountActivityLog.create = (async (entry: any) => {
			createdLogs.push(entry);
			return entry;
		}) as any;

		const req = mockRequest({
			body: {
				captchaToken: "captcha-secret",
				email: "member@example.com",
				password: "wrong-password"
			},
			headers: { "user-agent": "test-agent", "x-request-id": "req-login-failed" },
			session: {}
		});
		const res = await runHandler(login, req, mockResponse());

		assert.equal(res.statusCode, 403);
		assert.equal(createdLogs.length, 1);
		assert.equal(createdLogs[0].action, "login.failed");
		assert.equal(createdLogs[0].actorType, "anonymous");
		assert.equal(createdLogs[0].targetType, "user");
		assert.equal(createdLogs[0].targetEmailDomain, "example.com");
		const serialized = JSON.stringify(createdLogs[0]);
		assert.equal(serialized.includes("wrong-password"), false);
		assert.equal(serialized.includes("captcha-secret"), false);
		assert.equal(serialized.includes("session"), false);
	});

	it("rejects unauthenticated account activity reads at the admin gate", async () => {
		const req = mockRequest({ session: {} });
		const res = await runHandler(requireAdmin, req, mockResponse());

		assert.equal(res.statusCode, 403);
		assert.deepEqual(res.body, { error: "Admin login required" });
	});

	it("lets admins read paginated account activity", async () => {
		const captured: { filter?: unknown; skip?: number; limit?: number } = {};
		const logs = [
			{
				_id: new mongoose.Types.ObjectId(),
				action: "user.registered",
				actorType: "anonymous",
				targetType: "user",
				targetEmailDomain: "example.com",
				createdAt: new Date()
			}
		];
		AccountActivityLog.find = ((filter: unknown) => {
			captured.filter = filter;
			return {
				sort() {
					return this;
				},
				skip(value: number) {
					captured.skip = value;
					return this;
				},
				limit(value: number) {
					captured.limit = value;
					return this;
				},
				lean: async () => logs
			};
		}) as any;
		AccountActivityLog.countDocuments = (async () => 3) as any;

		const res = await runHandler(
			listAccountActivity,
			mockRequest({
				currentAdmin: new Admin({
					_id: new mongoose.Types.ObjectId(),
					email: "admin@example.com",
					name: "Admin",
					password: "hashed"
				}),
				query: {
					action: "user.registered",
					limit: "1",
					page: "2",
					sourceIp: "198.51.100.25"
				}
			}),
			mockResponse()
		);

		assert.equal(res.statusCode, 200);
		assert.equal(captured.skip, 1);
		assert.equal(captured.limit, 1);
		assert.deepEqual(captured.filter, {
			action: "user.registered",
			sourceIp: "198.51.100.25"
		});
		assert.deepEqual((res.body as any).pagination, {
			hasMore: true,
			limit: 1,
			page: 2,
			total: 3
		});
		assert.equal((res.body as any).logs.length, 1);
	});

	it("removes raw secret fields and raw email fields from metadata", () => {
		assert.deepEqual(
			sanitizeAccountActivityMetadata({
				captchaToken: "captcha",
				count: 2,
				newEmailDomain: "example.com",
				newEmailHash: "hash",
				password: "password",
				rawEmail: "person@example.com",
				sessionCookie: "cookie"
			}),
			{
				count: "2",
				newEmailDomain: "example.com",
				newEmailHash: "hash"
			}
		);
	});
});
