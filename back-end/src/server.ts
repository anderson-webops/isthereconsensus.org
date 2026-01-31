// src/server.ts
import { env, exit } from "node:process";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express from "express";
import mongoose from "mongoose";

import { seedTopics } from "./data/seedTopics.js";
import { requireAuth } from "./middleware/auth.js";
import { Question } from "./models/schemas/Question.js";
import { Topic } from "./models/schemas/Topic.js";
import { authRoutes } from "./routes/authRoutes.js";
import { verifyCaptcha } from "./utils/captcha.js";
import { readMongoSecret } from "./vaultClient.js";
import "dotenv/config";

async function main() {
	const app = express();

	// health
	app.get("/healthz", (_req, res) => res.json({ ok: true }));

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
	app.get("/readyz", (_req, res) => {
		const s = mongoose.connection.readyState; // 1=connected, 2=connecting
		if (s === 1) return res.json({ ready: true });
		return res.status(503).json({ ready: false, state: s });
	});

	// --- Get Mongo URI from Vault (preferred), else env fallback ---
	let mongoUri: string | undefined;
	try {
		const { uri } = await readMongoSecret(); // your Vault client should read from KV v2
		mongoUri = uri;
	}
	catch (e) {
		// Fail silently if Vault is not available, then probably local test (Had to do this to avoid weird requirements
		// console.log("Vault unavailable, falling back to MONGODB_URI:", e);
		const m: string = e?.toString() || "";
		if (!m.includes("Failed to fetch") && !m.includes("connect ECONNREFUSED")) {
			console.log("");
		}

		mongoUri = env.MONGODB_URI;
	}

	if (!mongoUri) {
		throw new Error("No MongoDB URI available (Vault and MONGODB_URI missing)");
	}

	await mongoose.connect(mongoUri);
	console.log("Connected to MongoDB");
	const c = mongoose.connection;
	console.log(`Mongo connected: db=${c.db?.databaseName} host=${c.host} name=${c.name}`);
	app.get("/_dbinfo", (_req, res) => {
		res.json({
			databaseName: c.db?.databaseName,
			host: c.host,
			name: c.name,
			usingVault: !!env.VAULT_ROLE_ID && !!env.VAULT_SECRET_ID
		});
	});
	await seedTopics();

	const api = express.Router();

	function normalizeText(value: unknown, maxLength: number) {
		if (typeof value !== "string") return "";
		const trimmed = value.trim();
		if (!trimmed) return "";
		return trimmed.length > maxLength ? trimmed.slice(0, maxLength).trim() : trimmed;
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

			const session = req.session as any;
			const authorId = session?.adminID || session?.userID;
			const authorModel = session?.adminID ? "Admin" : "User";
			const authorName
				= (session?.adminID ? (req as any).currentAdmin?.name : (req as any).currentUser?.name) || "";
			const resolvedDisplayName = displayName || authorName;

			const question = await Question.create({
				title,
				body,
				sourceUrl,
				displayName: resolvedDisplayName,
				author: authorId,
				authorModel,
				authorName,
				topic: topic._id
			});

			const populated = await Question.findById(question._id).populate("topic").lean();
			return res.status(201).json({ question: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to create question." });
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
