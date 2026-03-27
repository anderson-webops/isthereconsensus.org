// src/server.ts
import { env, exit } from "node:process";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import mongoose from "mongoose";

import { seedTopics } from "./data/seedTopics.js";
import { requireAdmin, requireAuth } from "./middleware/auth.js";
import { ExpertApplication } from "./models/schemas/ExpertApplication.js";
import { Question } from "./models/schemas/Question.js";
import { QuestionFlag } from "./models/schemas/QuestionFlag.js";
import { Topic } from "./models/schemas/Topic.js";
import { TopicSentimentVote } from "./models/schemas/TopicSentimentVote.js";
import { User } from "./models/schemas/User.js";
import { authRoutes } from "./routes/authRoutes.js";
import { buildSetupStatus } from "./setup/buildSetupStatus.js";
import { verifyCaptcha } from "./utils/captcha.js";
import { getActorFromRequest } from "./utils/community.js";
import { searchEvidence } from "./utils/evidence.js";
import { readMongoSecret } from "./vaultClient.js";
import "dotenv/config";

async function main() {
	const app = express();
	const internalDiagnosticsKey = env.INTERNAL_DIAGNOSTICS_KEY;
	const loopbackAddresses = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

	// health
	app.get("/healthz", (_req, res) => {
		res.set("Cache-Control", "no-store");
		res.json({ ok: true });
	});

	const SESSION_SECRET = env.SESSION_SECRET;
	if (!SESSION_SECRET) throw new Error("Missing SESSION_SECRET");

	app.set("trust proxy", 1);

	// 1) parsers first (with limits)
	app.use(bodyParser.urlencoded({ extended: false, limit: "256kb" }));
	app.use(bodyParser.json({ limit: "256kb" }));

	const isProd: boolean = env.NODE_ENV === "production";
	const isCrossSite: boolean = !!env.CROSS_SITE;
	const corsOrigin = env.CORS_ORIGIN || (isProd ? "" : "*");
	if (corsOrigin) {
		const allowCredentials = corsOrigin !== "*";
		app.use((req, res, next) => {
			res.setHeader("Access-Control-Allow-Origin", corsOrigin);
			res.setHeader("Vary", "Origin");
			res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
			res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
			if (allowCredentials) {
				res.setHeader("Access-Control-Allow-Credentials", "true");
			}
			if (req.method === "OPTIONS") return res.sendStatus(204);
			return next();
		});
	}

	// 2) sessions BEFORE any route that needs req.session
	///   COOKIES   ///
	type CookieSessionOpts = Parameters<typeof cookieSession>[0];

	const cookieOptions: CookieSessionOpts = {
		name: "session",
		keys: [SESSION_SECRET],
		maxAge: 24 * 60 * 60 * 1000,
		sameSite: "lax", // default, safe for dev & same-origin
		secure: false // default in dev
	};

	// Adjust for production
	if (isProd) {
		if (isCrossSite) {
			cookieOptions.sameSite = "none"; // required for cross-site
			cookieOptions.secure = true; // required when SameSite=None
			// cookieOptions.domain = ".example.com"; // optional if you want subdomain sharing
		}
		else {
			cookieOptions.sameSite = "lax"; // fine for same-origin
			cookieOptions.secure = true; // enforce HTTPS cookies
		}
	}

	app.use(cookieSession(cookieOptions));

	// 3) cache-control for auth endpoints
	app.use((req, res, next) => {
		if (req.path.startsWith("/accounts") || req.path.startsWith("/api/auth") || req.path.endsWith("/loggedin")) {
			res.setHeader("Cache-Control", "no-store");
		}
		next();
	});

	// ready
	app.get("/readyz", async (_req, res) => {
		const connection = mongoose.connection;
		const state = connection.readyState;
		if (state !== 1 || !connection.db) {
			return res.status(503).set("Cache-Control", "no-store").json({
				ready: false,
				components: {
					db: { ok: false, state }
				}
			});
		}

		try {
			await connection.db.admin().ping();
			return res.set("Cache-Control", "no-store").json({
				ready: true,
				components: {
					db: { ok: true, state }
				}
			});
		}
		catch (error) {
			return res.status(503).set("Cache-Control", "no-store").json({
				ready: false,
				components: {
					db: {
						ok: false,
						state,
						error: error instanceof Error ? error.message : "db-ping-failed"
					}
				}
			});
		}
	});

	// --- Get Mongo URI from Vault (preferred), else env fallback ---
	let mongoUri: string | undefined;
	let mongoSource: "vault" | "env" | "missing" = "missing";
	try {
		const { uri } = await readMongoSecret(); // your Vault client should read from KV v2
		mongoUri = uri;
		mongoSource = uri ? "vault" : "missing";
	}
	catch (e) {
		// Fail silently if Vault is not available, then probably local test (Had to do this to avoid weird requirements
		// console.log("Vault unavailable, falling back to MONGODB_URI:", e);
		const m: string = e?.toString() || "";
		if (!m.includes("Failed to fetch") && !m.includes("connect ECONNREFUSED")) {
			console.log("");
		}

		mongoUri = env.MONGODB_URI;
		mongoSource = mongoUri ? "env" : "missing";
	}

	if (!mongoUri) {
		throw new Error("No MongoDB URI available (Vault and MONGODB_URI missing)");
	}

	await mongoose.connect(mongoUri);
	console.log("Connected to MongoDB");
	const c = mongoose.connection;
	console.log(`Mongo connected: db=${c.db?.databaseName} host=${c.host} name=${c.name}`);
	app.get("/_dbinfo", (req, res) => {
		const forwardedFor = req.headers["x-forwarded-for"];
		const forwardedIp = typeof forwardedFor === "string"
			? forwardedFor.split(",")[0]?.trim()
			: Array.isArray(forwardedFor)
				? forwardedFor[0]?.trim()
				: undefined;
		const clientIp = forwardedIp || req.ip || req.socket.remoteAddress || "";
		const isInternalRequest = env.NODE_ENV !== "production"
			|| (internalDiagnosticsKey && req.get("x-internal-diagnostics-key") === internalDiagnosticsKey)
			|| loopbackAddresses.has(clientIp);

		if (!isInternalRequest) {
			return res.status(403).set("Cache-Control", "no-store").json({ ok: false, error: "forbidden" });
		}

		res.set("Cache-Control", "no-store").json({
			databaseName: c.db?.databaseName ?? null,
			host: c.host || null,
			name: c.name || null,
			readyState: c.readyState,
			usingVault: !!env.VAULT_ROLE_ID && !!env.VAULT_SECRET_ID
		});
	});
	app.get("/api/setup/status", (_req, res) => {
		res.json(
			buildSetupStatus({
				isProd,
				isCrossSite,
				corsOrigin,
				mongoSource
			})
		);
	});
	await seedTopics();

	const api = express.Router();

	function normalizeText(value: unknown, maxLength: number) {
		if (typeof value !== "string") return "";
		const trimmed = value.trim();
		if (!trimmed) return "";
		return trimmed.length > maxLength ? trimmed.slice(0, maxLength).trim() : trimmed;
	}

	function normalizeList(value: unknown, maxItems: number, maxLength: number) {
		if (!Array.isArray(value)) return [];
		return value
			.map(item => (typeof item === "string" ? item.trim() : ""))
			.filter(Boolean)
			.slice(0, maxItems)
			.map(item => (item.length > maxLength ? item.slice(0, maxLength).trim() : item));
	}

	function currentActor(req: express.Request) {
		return getActorFromRequest(req);
	}

	api.get("/topics", async (req, res) => {
		try {
			const includeCounts = req.query.includeCounts === "true";
			const topics = await Topic.find().sort({ order: 1, title: 1 }).lean();

			if (!includeCounts) {
				return res.json({ topics });
			}

			const counts = await Question.aggregate([
				{ $group: { _id: "$topic", count: { $sum: 1 } } }
			]);
			const countMap = new Map<string, number>();
			for (const row of counts) {
				countMap.set(row._id.toString(), row.count);
			}

			const topicsWithCounts = topics.map(topic => ({
				...topic,
				questionCount: countMap.get(topic._id.toString()) ?? 0
			}));

			return res.json({ topics: topicsWithCounts });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load topics." });
		}
	});

	api.get("/topics/:slug", async (req, res) => {
		try {
			const topic = await Topic.findOne({ slug: req.params.slug }).lean();
			if (!topic) return res.status(404).json({ error: "Topic not found." });
			return res.json({ topic });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load topic." });
		}
	});

	api.get("/topics/:slug/sentiment", async (req, res) => {
		try {
			const topic = await Topic.findOne({ slug: req.params.slug });
			if (!topic) return res.status(404).json({ error: "Topic not found." });

			const votes = await TopicSentimentVote.find({ topic: topic._id }).lean();
			const totals = {
				aligns: 0,
				uncertain: 0,
				skeptical: 0
			};

			for (const vote of votes) {
				totals[vote.stance] += 1;
			}

			const totalVotes = votes.length;
			const percentages = totalVotes
				? {
						aligns: Math.round((totals.aligns / totalVotes) * 100),
						uncertain: Math.round((totals.uncertain / totalVotes) * 100),
						skeptical: Math.round((totals.skeptical / totalVotes) * 100)
					}
				: { aligns: 0, uncertain: 0, skeptical: 0 };

			let currentVote = null;
			const actor = currentActor(req);
			if (actor.id) {
				currentVote = await TopicSentimentVote.findOne({
					topic: topic._id,
					voter: actor.id,
					voterModel: actor.model
				}).lean();
			}

			return res.json({
				topic: {
					_id: topic._id,
					slug: topic.slug,
					title: topic.title
				},
				totalVotes,
				totals,
				percentages,
				currentVote
			});
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load sentiment." });
		}
	});

	api.post("/topics/:slug/sentiment", requireAuth, async (req, res) => {
		try {
			const topic = await Topic.findOne({ slug: req.params.slug });
			if (!topic) return res.status(404).json({ error: "Topic not found." });

			const stance = normalizeText(req.body?.stance, 24) as "aligns" | "uncertain" | "skeptical";
			const note = normalizeText(req.body?.note, 300);
			const confidenceRaw = Number(req.body?.confidence ?? 3);
			const confidence = Number.isFinite(confidenceRaw) ? Math.min(Math.max(confidenceRaw, 1), 5) : 3;

			if (!["aligns", "uncertain", "skeptical"].includes(stance)) {
				return res.status(400).json({ error: "Invalid stance." });
			}

			const actor = currentActor(req);
			const vote = await TopicSentimentVote.findOneAndUpdate(
				{
					topic: topic._id,
					voter: actor.id,
					voterModel: actor.model
				},
				{
					topic: topic._id,
					voter: actor.id,
					voterModel: actor.model,
					stance,
					confidence,
					note
				},
				{
					new: true,
					upsert: true,
					setDefaultsOnInsert: true
				}
			).lean();

			return res.json({ vote });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to save sentiment." });
		}
	});

	api.post("/topics", async (req, res) => {
		if (env.ENABLE_TOPIC_CREATION !== "true") {
			return res.status(403).json({ error: "Topic creation is disabled." });
		}

		try {
			const title = normalizeText(req.body?.title, 80);
			if (!title) return res.status(400).json({ error: "Title is required." });

			const description = normalizeText(req.body?.description, 240);
			const accent = normalizeText(req.body?.accent, 24);
			const orderValue = Number(req.body?.order);
			const order = Number.isFinite(orderValue) ? orderValue : 0;

			const topic = await Topic.create({ title, description, accent, order });
			return res.status(201).json({ topic });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to create topic." });
		}
	});

	api.get("/questions", async (req, res) => {
		try {
			const topicSlug = typeof req.query.topic === "string" ? req.query.topic : "";
			const limitRaw = Number(req.query.limit ?? 30);
			const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 30;

			const filter: { topic?: mongoose.Types.ObjectId } = {};
			if (topicSlug) {
				const topic = await Topic.findOne({ slug: topicSlug });
				if (!topic) return res.status(404).json({ error: "Topic not found." });
				filter.topic = topic._id;
			}

			const questions = await Question.find(filter)
				.sort({ createdAt: -1 })
				.limit(limit)
				.populate("topic")
				.lean();

			return res.json({ questions });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load questions." });
		}
	});

	api.get("/questions/:id", async (req, res) => {
		try {
			if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
				return res.status(400).json({ error: "Invalid question id." });
			}
			const question = await Question.findById(req.params.id).populate("topic").lean();
			if (!question) return res.status(404).json({ error: "Question not found." });
			return res.json({ question });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load question." });
		}
	});

	api.post("/questions", requireAuth, async (req, res) => {
		try {
			const captcha = await verifyCaptcha(req.body?.captchaToken, req.ip);
			if (!captcha.ok) {
				return res.status(403).json({ error: captcha.error || "Captcha verification failed." });
			}

			const topicSlug = normalizeText(req.body?.topic, 80);
			const title = normalizeText(req.body?.title, 200);
			const body = normalizeText(req.body?.body, 4000);
			const sourceUrl = normalizeText(req.body?.sourceUrl, 500);
			const displayName = normalizeText(req.body?.displayName, 80);

			if (!topicSlug) return res.status(400).json({ error: "Topic is required." });
			if (!title) return res.status(400).json({ error: "Title is required." });

			const topic = await Topic.findOne({ slug: topicSlug });
			if (!topic) return res.status(404).json({ error: "Topic not found." });

			const actor = currentActor(req);
			const resolvedDisplayName = displayName || actor.name;

			const question = await Question.create({
				title,
				body,
				sourceUrl,
				displayName: resolvedDisplayName,
				author: actor.id,
				authorModel: actor.model,
				authorName: actor.name,
				topic: topic._id
			});

			if (actor.model === "User") {
				await User.findByIdAndUpdate(actor.id, {
					$inc: { trustScore: 2 },
					$max: { trustLevel: 1 }
				});
			}

			const populated = await Question.findById(question._id).populate("topic").lean();
			return res.status(201).json({ question: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to create question." });
		}
	});

	api.delete("/questions/:id", requireAuth, async (req, res) => {
		try {
			const questionId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(questionId)) {
				return res.status(400).json({ error: "Invalid question id." });
			}

			const question = await Question.findById(questionId);
			if (!question) return res.status(404).json({ error: "Question not found." });

			const actor = currentActor(req);
			const isOwner = question.author?.toString() === actor.id && question.authorModel === actor.model;
			const isAdmin = actor.model === "Admin";

			if (!isOwner && !isAdmin) {
				return res.status(403).json({ error: "Not authorized to delete this question." });
			}

			await QuestionFlag.deleteMany({ question: question._id });
			await question.deleteOne();
			return res.sendStatus(204);
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to delete question." });
		}
	});

	api.post("/questions/:id/flags", requireAuth, async (req, res) => {
		try {
			const questionId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(questionId)) {
				return res.status(400).json({ error: "Invalid question id." });
			}

			const question = await Question.findById(questionId);
			if (!question) return res.status(404).json({ error: "Question not found." });

			const reason = normalizeText(req.body?.reason, 32) as
				| "off-topic"
				| "duplicate"
				| "misleading"
				| "low-quality"
				| "needs-sources"
				| "abusive";
			const note = normalizeText(req.body?.note, 500);
			if (!["off-topic", "duplicate", "misleading", "low-quality", "needs-sources", "abusive"].includes(reason)) {
				return res.status(400).json({ error: "Invalid flag reason." });
			}

			const actor = currentActor(req);
			const flag = await QuestionFlag.findOneAndUpdate(
				{
					question: question._id,
					reporter: actor.id,
					reporterModel: actor.model
				},
				{
					question: question._id,
					reporter: actor.id,
					reporterModel: actor.model,
					reporterName: actor.name,
					reason,
					note,
					status: "open"
				},
				{
					new: true,
					upsert: true,
					setDefaultsOnInsert: true
				}
			).lean();

			if (actor.model === "User") {
				await User.findByIdAndUpdate(actor.id, { $inc: { trustScore: 1 } });
			}

			return res.status(201).json({ flag });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to flag question." });
		}
	});

	api.get("/expert-applications/me", requireAuth, async (req, res) => {
		try {
			const actor = currentActor(req);
			if (actor.model !== "User") {
				return res.json({ application: null });
			}
			const application = await ExpertApplication.findOne({ user: actor.id }).lean();
			return res.json({ application });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load expert application." });
		}
	});

	api.post("/expert-applications", requireAuth, async (req, res) => {
		try {
			const actor = currentActor(req);
			if (actor.model !== "User") {
				return res.status(403).json({ error: "Only user accounts can apply for expert review." });
			}

			const credentialLabel = normalizeText(req.body?.credentialLabel, 160);
			const affiliation = normalizeText(req.body?.affiliation, 160);
			const statement = normalizeText(req.body?.statement, 4000);
			const expertiseAreas = normalizeList(req.body?.expertiseAreas, 8, 80);
			const evidenceLinks = normalizeList(req.body?.evidenceLinks, 8, 300);
			const user = await User.findById(actor.id);

			if (!user) return res.status(404).json({ error: "User not found." });
			if (!credentialLabel || !statement || !expertiseAreas.length) {
				return res.status(400).json({ error: "Credentials, expertise areas, and a short statement are required." });
			}

			const application = await ExpertApplication.findOneAndUpdate(
				{ user: user._id },
				{
					user: user._id,
					name: user.name,
					affiliation,
					credentialLabel,
					expertiseAreas,
					evidenceLinks,
					statement,
					status: "pending",
					reviewNotes: "",
					reviewedBy: undefined,
					reviewedAt: undefined
				},
				{
					new: true,
					upsert: true,
					setDefaultsOnInsert: true
				}
			).lean();

			user.expertiseStatus = "pending";
			if (affiliation) user.affiliation = affiliation;
			if (expertiseAreas.length) user.expertiseAreas = expertiseAreas;
			await user.save();

			return res.status(201).json({ application });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to submit expert application." });
		}
	});

	api.get("/evidence/search", async (req, res) => {
		try {
			const query = typeof req.query.q === "string" ? req.query.q : "";
			const topicSlug = typeof req.query.topic === "string" ? req.query.topic : "";
			let searchQuery = normalizeText(query, 180);

			if (!searchQuery && topicSlug) {
				const topic = await Topic.findOne({ slug: topicSlug }).lean();
				searchQuery = topic?.title || "";
			}

			if (!searchQuery) return res.status(400).json({ error: "Query is required." });

			const evidence = await searchEvidence(searchQuery);
			return res.json({
				query: searchQuery,
				...evidence
			});
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to search evidence sources." });
		}
	});

	api.get("/admin/expert-applications", requireAdmin, async (req, res) => {
		try {
			const status = typeof req.query.status === "string" ? req.query.status : "";
			const filter = status ? { status } : {};
			const applications = await ExpertApplication.find(filter).sort({ createdAt: -1 }).lean();
			return res.json({ applications });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load expert applications." });
		}
	});

	api.post("/admin/expert-applications/:id/review", requireAdmin, async (req, res) => {
		try {
			const applicationId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(applicationId)) {
				return res.status(400).json({ error: "Invalid application id." });
			}

			const decision = normalizeText(req.body?.decision, 16) as "approved" | "rejected" | "needs-info";
			const reviewNotes = normalizeText(req.body?.reviewNotes, 2000);
			if (!["approved", "rejected", "needs-info"].includes(decision)) {
				return res.status(400).json({ error: "Invalid decision." });
			}

			const application = await ExpertApplication.findById(applicationId);
			if (!application) return res.status(404).json({ error: "Application not found." });

			application.status = decision;
			application.reviewNotes = reviewNotes;
			application.reviewedBy = new mongoose.Types.ObjectId(currentActor(req).id);
			application.reviewedAt = new Date();
			await application.save();

			const user = await User.findById(application.user);
			if (user) {
				user.expertiseStatus
					= decision === "approved" ? "verified" : decision === "needs-info" ? "pending" : "rejected";
				if (decision === "approved") {
					user.trustLevel = Math.max(user.trustLevel || 0, 3);
					user.trustScore = Math.max(user.trustScore || 0, 200);
					user.affiliation = application.affiliation || user.affiliation || "";
					user.expertiseAreas = application.expertiseAreas;
				}
				await user.save();
			}

			return res.json({ application });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to review expert application." });
		}
	});

	api.get("/admin/question-flags", requireAdmin, async (_req, res) => {
		try {
			const flags = await QuestionFlag.find({ status: "open" })
				.sort({ createdAt: -1 })
				.populate({
					path: "question",
					populate: { path: "topic" }
				})
				.lean();
			return res.json({ flags });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load question flags." });
		}
	});

	api.post("/admin/question-flags/:id/review", requireAdmin, async (req, res) => {
		try {
			const flagId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(flagId)) {
				return res.status(400).json({ error: "Invalid flag id." });
			}

			const decision = normalizeText(req.body?.decision, 16) as "reviewed" | "dismissed";
			if (!["reviewed", "dismissed"].includes(decision)) {
				return res.status(400).json({ error: "Invalid decision." });
			}

			const flag = await QuestionFlag.findById(flagId);
			if (!flag) return res.status(404).json({ error: "Flag not found." });

			flag.status = decision;
			flag.reviewedBy = new mongoose.Types.ObjectId(currentActor(req).id);
			flag.reviewedAt = new Date();
			await flag.save();

			return res.json({ flag });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to review question flag." });
		}
	});

	app.use("/api/auth", authRoutes);
	app.use("/api", api);

	const PORT = env.PORT || 3011;
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
}

main().catch((err) => {
	console.error(err);
	exit(1);
});
