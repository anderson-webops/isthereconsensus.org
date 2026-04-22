import type {
	IClaimEvidenceSummary,
	IClaimInstitutionalAnchor,
	IClaimSurveillanceSpec,
	IClaimUncertaintyDriver
} from "./models/schemas/Claim.js";
// src/server.ts
import process, { env, exit } from "node:process";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import express from "express";

import mongoose from "mongoose";
import { seedClaims } from "./data/seedClaims.js";
import { seedTopics } from "./data/seedTopics.js";
import { requireAdmin, requireAuth, requireEditorial } from "./middleware/auth.js";
import { Claim } from "./models/schemas/Claim.js";
import { ClaimRevision } from "./models/schemas/ClaimRevision.js";
import { ClaimSource } from "./models/schemas/ClaimSource.js";
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
import { slugify } from "./utils/slugify.js";
import { readMongoSecret } from "./vaultClient.js";
import "dotenv/config";

const whitespacePattern = /\s+/;
const normalizeQuestionPattern = /[^\p{L}\p{N}\s]/gu;

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
			res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
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
			return res
				.status(503)
				.set("Cache-Control", "no-store")
				.json({
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
			return res
				.status(503)
				.set("Cache-Control", "no-store")
				.json({
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
		const forwardedIp
			= typeof forwardedFor === "string"
				? forwardedFor.split(",")[0]?.trim()
				: Array.isArray(forwardedFor)
					? forwardedFor[0]?.trim()
					: undefined;
		const clientIp = forwardedIp || req.ip || req.socket.remoteAddress || "";
		const isInternalRequest
			= env.NODE_ENV !== "production"
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
	await seedClaims();
	await Question.updateMany({ routingStatus: { $exists: false } }, { $set: { routingStatus: "unassigned" } });

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

	function normalizeBoolean(value: unknown) {
		return value === true || value === "true" || value === 1 || value === "1";
	}

	function normalizeQuestionText(value: string) {
		return value
			.toLowerCase()
			.replace(normalizeQuestionPattern, " ")
			.replace(whitespacePattern, " ")
			.trim();
	}

	function currentActor(req: express.Request) {
		return getActorFromRequest(req);
	}

	function normalizeAskKind(value: unknown) {
		const normalized = normalizeText(value, 24);
		if (normalized === "claim") return "claim";
		if (normalized === "topic") return "topic";
		if (normalized === "concept") return "concept";
		return "discussion";
	}

	function normalizeClosestMatchType(value: unknown) {
		const normalized = normalizeText(value, 24);
		if (normalized === "claim") return "claim";
		if (normalized === "topic") return "topic";
		if (normalized === "explainer") return "explainer";
		if (normalized === "question") return "question";
		return "none";
	}

	function normalizeSourceContextType(value: unknown) {
		const normalized = normalizeText(value, 32);
		if (normalized === "article") return "article";
		if (normalized === "social") return "social";
		if (normalized === "video") return "video";
		if (normalized === "podcast") return "podcast";
		if (normalized === "conversation") return "conversation";
		if (normalized === "classroom") return "classroom";
		return "other";
	}

	function normalizeStatus(value: unknown) {
		const normalized = normalizeText(value, 24);
		return normalized || "draft";
	}

	function normalizeAgreementLevel(value: unknown) {
		const normalized = normalizeText(value, 32);
		if (normalized === "strong") return "strong";
		if (normalized === "broad_qualified") return "broad_qualified";
		if (normalized === "divided") return "divided";
		if (normalized === "frontier") return "frontier";
		return "frontier";
	}

	function normalizeEvidenceCertainty(value: unknown): IClaimEvidenceSummary["certainty"] {
		const normalized = normalizeText(value, 24);
		if (normalized === "high") return "high";
		if (normalized === "moderate") return "moderate";
		if (normalized === "low") return "low";
		if (normalized === "very_low") return "very_low";
		return "low";
	}

	function normalizeReviewMode(value: unknown) {
		return normalizeText(value, 24) === "living" ? "living" : "standard";
	}

	function normalizeDate(value: unknown) {
		if (!value) return undefined;
		const date = new Date(String(value));
		return Number.isNaN(date.getTime()) ? undefined : date;
	}

	function normalizeInteger(value: unknown, min: number, max: number, fallback: number) {
		const numeric = Number(value);
		if (!Number.isFinite(numeric)) return fallback;
		return Math.min(Math.max(Math.round(numeric), min), max);
	}

	function normalizeSourceAppraisal(value: unknown) {
		const normalized = normalizeText(value, 32);
		if (normalized === "high") return "high";
		if (normalized === "moderate") return "moderate";
		if (normalized === "low") return "low";
		return "not_appraised";
	}

	function normalizeCitationStatus(value: unknown) {
		const normalized = normalizeText(value, 40);
		if (normalized === "corrected") return "corrected";
		if (normalized === "retracted") return "retracted";
		if (normalized === "expression_of_concern") return "expression_of_concern";
		return "current";
	}

	function normalizeEvidenceDirection(value: unknown): IClaimEvidenceSummary["effectDirection"] {
		const normalized = normalizeText(value, 24);
		if (normalized === "supports") return "supports";
		if (normalized === "mixed") return "mixed";
		return "unclear";
	}

	function normalizeUncertaintyType(value: unknown): IClaimUncertaintyDriver["type"] {
		const normalized = normalizeText(value, 32);
		if (normalized === "bias") return "bias";
		if (normalized === "indirectness") return "indirectness";
		if (normalized === "imprecision") return "imprecision";
		if (normalized === "inconsistency") return "inconsistency";
		if (normalized === "generalizability") return "generalizability";
		if (normalized === "mechanism") return "mechanism";
		if (normalized === "timing") return "timing";
		if (normalized === "implementation") return "implementation";
		return "other";
	}

	function normalizeEvidenceSummaries(value: unknown): IClaimEvidenceSummary[] {
		if (!Array.isArray(value)) return [];
		return value
			.slice(0, 10)
			.map((item) => {
				const record = typeof item === "object" && item ? (item as Record<string, unknown>) : {};
				const question = normalizeText(record.question, 240);
				const finding = normalizeText(record.finding, 1200);
				if (!question || !finding) return null;
				return {
					question,
					population: normalizeText(record.population, 200),
					finding,
					effectDirection: normalizeEvidenceDirection(record.effectDirection),
					magnitude: normalizeText(record.magnitude, 280),
					certainty: record.certainty ? normalizeEvidenceCertainty(record.certainty) : undefined,
					limitations: normalizeList(record.limitations, 6, 240)
				};
			})
			.filter((item): item is NonNullable<typeof item> => Boolean(item));
	}

	function normalizeUncertaintyDrivers(value: unknown): IClaimUncertaintyDriver[] {
		if (!Array.isArray(value)) return [];
		return value
			.slice(0, 6)
			.map((item) => {
				const record = typeof item === "object" && item ? (item as Record<string, unknown>) : {};
				const detail = normalizeText(record.detail, 280);
				if (!detail) return null;
				return {
					type: normalizeUncertaintyType(record.type),
					detail
				};
			})
			.filter((item): item is NonNullable<typeof item> => Boolean(item));
	}

	function normalizeInstitutionalAnchors(value: unknown): IClaimInstitutionalAnchor[] {
		if (!Array.isArray(value)) return [];
		return value
			.slice(0, 8)
			.map((item) => {
				const record = typeof item === "object" && item ? (item as Record<string, unknown>) : {};
				const name = normalizeText(record.name, 160);
				const role = normalizeText(record.role, 280);
				if (!name || !role) return null;
				return { name, role };
			})
			.filter((item): item is NonNullable<typeof item> => Boolean(item));
	}

	function normalizeSurveillanceSpec(value: unknown): IClaimSurveillanceSpec {
		const record = typeof value === "object" && value ? (value as Record<string, unknown>) : {};
		const cadenceCandidate = Number(record.cadenceDays);
		return {
			focus: normalizeText(record.focus, 1000),
			cadenceDays:
				Number.isFinite(cadenceCandidate) && cadenceCandidate >= 1
					? Math.min(Math.max(Math.round(cadenceCandidate), 1), 3650)
					: undefined,
			watchTerms: normalizeList(record.watchTerms, 8, 120),
			integrityMonitors: normalizeList(record.integrityMonitors, 8, 180),
			guidelineMonitors: normalizeList(record.guidelineMonitors, 8, 180),
			triggerRules: normalizeList(record.triggerRules, 8, 240)
		};
	}

	async function findTopicOr404(res: express.Response, slug: string) {
		const topic = await Topic.findOne({ slug });
		if (!topic) {
			res.status(404).json({ error: "Topic not found." });
			return null;
		}
		return topic;
	}

	async function findClaimForTopic(topicId: mongoose.Types.ObjectId, claimSlug: string) {
		return Claim.findOne({ topic: topicId, slug: claimSlug });
	}

	async function loadClaimSources(claimId: mongoose.Types.ObjectId) {
		return ClaimSource.find({ claim: claimId }).sort({ order: 1, createdAt: 1 }).lean();
	}

	function appendClaimChangeLog(
		claim: {
			changeLog?: Array<{
				date: Date;
				kind: "publication" | "update" | "correction" | "review";
				summary: string;
			}>;
		},
		kind: "publication" | "update" | "correction" | "review",
		summary: string
	) {
		const entry = {
			date: new Date(),
			kind,
			summary: normalizeText(summary, 240) || "Claim updated."
		};
		claim.changeLog = [entry, ...(claim.changeLog ?? [])].slice(0, 12);
	}

	async function createClaimRevision(params: {
		claimId: mongoose.Types.ObjectId;
		editorId: string;
		editorModel: "User" | "Admin";
		summary: string;
	}) {
		const claim = await Claim.findById(params.claimId).lean();
		if (!claim) return null;
		const sources = await loadClaimSources(params.claimId);
		return ClaimRevision.create({
			claim: params.claimId,
			editor: new mongoose.Types.ObjectId(params.editorId),
			editorModel: params.editorModel,
			summary: params.summary,
			snapshot: {
				claim: {
					_id: claim._id,
					topic: claim.topic,
					title: claim.title,
					slug: claim.slug,
					status: claim.status,
					consensusBand: claim.consensusBand,
					agreementLevel: claim.agreementLevel,
					evidenceCertainty: claim.evidenceCertainty,
					confidenceScore: claim.confidenceScore,
					reviewMode: claim.reviewMode,
					bottomLine: claim.bottomLine,
					stableCore: claim.stableCore,
					openQuestions: claim.openQuestions,
					whatWouldChangeMinds: claim.whatWouldChangeMinds,
					misconceptions: claim.misconceptions,
					misconceptionTags: claim.misconceptionTags,
					editorSummary: claim.editorSummary,
					uncertaintySummary: claim.uncertaintySummary,
					uncertaintyDrivers: claim.uncertaintyDrivers,
					searchDatabases: claim.searchDatabases,
					searchCutoffAt: claim.searchCutoffAt,
					inclusionRules: claim.inclusionRules,
					exclusionRules: claim.exclusionRules,
					surveillanceSpec: claim.surveillanceSpec,
					appraisalTools: claim.appraisalTools,
					evidenceSummaries: claim.evidenceSummaries,
					institutionalAnchors: claim.institutionalAnchors,
					authorLine: claim.authorLine,
					reviewerLine: claim.reviewerLine,
					coiSummary: claim.coiSummary,
					independenceSummary: claim.independenceSummary,
					lastRetractionCheckAt: claim.lastRetractionCheckAt,
					changeLog: claim.changeLog,
					lastReviewedAt: claim.lastReviewedAt,
					nextReviewAt: claim.nextReviewAt,
					publishedAt: claim.publishedAt,
					reviewedBy: claim.reviewedBy,
					createdAt: claim.createdAt,
					updatedAt: claim.updatedAt
				},
				sources: sources.map(source => ({
					_id: source._id,
					kind: source.kind,
					title: source.title,
					publisher: source.publisher,
					year: source.year,
					url: source.url,
					doi: source.doi,
					pmid: source.pmid,
					pmcid: source.pmcid,
					isAnchor: source.isAnchor,
					appraisal: source.appraisal,
					citationStatus: source.citationStatus,
					citationCheckedAt: source.citationCheckedAt,
					statusSources: source.statusSources,
					stance: source.stance,
					note: source.note,
					order: source.order
				}))
			}
		});
	}

	function analyzeMatch(query: string, haystack: string) {
		if (!query || !haystack) {
			return {
				matchReason: "",
				matchScore: 0
			};
		}
		const normalizedQuery = query.toLowerCase();
		const normalizedHaystack = haystack.toLowerCase();
		if (normalizedHaystack === normalizedQuery) {
			return {
				matchReason: "Exact wording match",
				matchScore: 120
			};
		}
		if (normalizedHaystack.startsWith(normalizedQuery)) {
			return {
				matchReason: "Starts with the same wording",
				matchScore: 100
			};
		}
		if (normalizedHaystack.includes(normalizedQuery)) {
			return {
				matchReason: "Contains the same phrasing",
				matchScore: 80
			};
		}
		const queryTokens = normalizedQuery.split(whitespacePattern).filter(Boolean);
		const haystackTokens = normalizedHaystack.split(whitespacePattern).filter(Boolean);
		const overlap = [...new Set(queryTokens.filter(token => haystackTokens.some(entry => entry.includes(token))))];
		return overlap.length
			? {
					matchReason: `Matches terms: ${overlap.slice(0, 3).join(", ")}`,
					matchScore: 20 + overlap.length * 10
				}
			: {
					matchReason: "",
					matchScore: 0
				};
	}

	api.get("/topics", async (req, res) => {
		try {
			const includeCounts = req.query.includeCounts === "true";
			const includeClaims = req.query.includeClaims === "true";
			const topics = await Topic.find().sort({ order: 1, title: 1 }).lean();

			if (!includeCounts && !includeClaims) {
				return res.json({ topics });
			}

			const counts = await Question.aggregate([
				{
					$match: {
						status: { $ne: "archived" },
						routingStatus: { $ne: "duplicate" }
					}
				},
				{ $group: { _id: "$topic", count: { $sum: 1 } } }
			]);
			const countMap = new Map<string, number>();
			for (const row of counts) {
				countMap.set(row._id.toString(), row.count);
			}

			let claimCountMap = new Map<string, number>();
			let featuredClaimsMap = new Map<string, unknown[]>();
			if (includeClaims) {
				const publishedClaims = await Claim.find({ status: "published" })
					.sort({ lastReviewedAt: -1, publishedAt: -1, title: 1 })
					.lean();
				claimCountMap = publishedClaims.reduce((map, claim) => {
					const key = claim.topic.toString();
					map.set(key, (map.get(key) ?? 0) + 1);
					return map;
				}, new Map<string, number>());
				featuredClaimsMap = publishedClaims.reduce((map, claim) => {
					const key = claim.topic.toString();
					const current = map.get(key) ?? [];
					if (current.length < 3) {
						current.push({
							_id: claim._id,
							title: claim.title,
							slug: claim.slug,
							consensusBand: claim.consensusBand,
							agreementLevel: claim.agreementLevel,
							evidenceCertainty: claim.evidenceCertainty,
							confidenceScore: claim.confidenceScore,
							reviewMode: claim.reviewMode,
							bottomLine: claim.bottomLine,
							searchCutoffAt: claim.searchCutoffAt,
							lastReviewedAt: claim.lastReviewedAt,
							publishedAt: claim.publishedAt,
							lastRetractionCheckAt: claim.lastRetractionCheckAt
						});
						map.set(key, current);
					}
					return map;
				}, new Map<string, unknown[]>());
			}

			const topicsWithCounts = topics.map((topic) => {
				const key = topic._id.toString();
				return {
					...topic,
					questionCount: countMap.get(key) ?? 0,
					claimCount: includeClaims ? (claimCountMap.get(key) ?? 0) : undefined,
					featuredClaims: includeClaims ? (featuredClaimsMap.get(key) ?? []) : undefined
				};
			});

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

			if (req.query.includeClaims !== "true") {
				return res.json({ topic });
			}

			const [claimCount, featuredClaims] = await Promise.all([
				Claim.countDocuments({ topic: topic._id, status: "published" }),
				Claim.find({ topic: topic._id, status: "published" })
					.sort({ lastReviewedAt: -1, publishedAt: -1, title: 1 })
					.limit(5)
					.lean()
			]);
			return res.json({
				topic: {
					...topic,
					claimCount,
					featuredClaims
				}
			});
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load topic." });
		}
	});

	api.get("/topics/:slug/claims", async (req, res) => {
		try {
			const topic = await findTopicOr404(res, req.params.slug);
			if (!topic) return;

			const claims = await Claim.find({ topic: topic._id, status: "published" })
				.sort({ lastReviewedAt: -1, publishedAt: -1, title: 1 })
				.lean();
			const sourceCounts = await ClaimSource.aggregate([
				{ $match: { claim: { $in: claims.map(claim => claim._id) } } },
				{ $group: { _id: "$claim", count: { $sum: 1 } } }
			]);
			const sourceCountMap = new Map<string, number>();
			for (const row of sourceCounts) {
				sourceCountMap.set(row._id.toString(), row.count);
			}

			return res.json({
				claims: claims.map(claim => ({
					...claim,
					sourceCount: sourceCountMap.get(claim._id.toString()) ?? 0,
					topic: {
						_id: topic._id,
						title: topic.title,
						slug: topic.slug,
						description: topic.description,
						accent: topic.accent
					}
				}))
			});
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load claims." });
		}
	});

	api.get("/topics/:topicSlug/claims/:claimSlug", async (req, res) => {
		try {
			const topic = await findTopicOr404(res, req.params.topicSlug);
			if (!topic) return;

			const claim = await Claim.findOne({
				topic: topic._id,
				slug: req.params.claimSlug,
				status: "published"
			}).lean();
			if (!claim) return res.status(404).json({ error: "Claim not found." });

			const sources = await loadClaimSources(claim._id);
			return res.json({
				claim: {
					...claim,
					sourceCount: sources.length,
					topic: {
						_id: topic._id,
						title: topic.title,
						slug: topic.slug,
						description: topic.description,
						accent: topic.accent
					},
					sources
				}
			});
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load claim." });
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
					returnDocument: "after",
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

	api.get("/search/suggestions", async (req, res) => {
		try {
			const query = normalizeText(req.query.q, 160).toLowerCase();
			if (!query || query.length < 2) {
				return res.json({ claims: [], topics: [], questions: [] });
			}

			const [claims, topics, questions] = await Promise.all([
				Claim.find({ status: "published" }).populate("topic").lean(),
				Topic.find().sort({ order: 1, title: 1 }).lean(),
				Question.find({
					status: { $ne: "archived" },
					routingStatus: { $ne: "duplicate" }
				})
					.sort({ createdAt: -1 })
					.limit(120)
					.populate("topic")
					.populate("claim")
					.lean()
			]);

			const rankedClaims = claims
				.map((claim) => {
					const haystack = [
						claim.title,
						claim.bottomLine,
						claim.editorSummary,
						...(claim.misconceptions || []),
						...(claim.misconceptionTags || []),
						typeof claim.topic === "object" && "title" in claim.topic ? claim.topic.title : ""
					]
						.join(" ")
						.trim();
					const match = analyzeMatch(query, haystack);
					return { claim, match };
				})
				.filter(entry => entry.match.matchScore > 0)
				.sort(
					(left, right) =>
						right.match.matchScore - left.match.matchScore || left.claim.title.localeCompare(right.claim.title)
				)
				.slice(0, 6)
				.map(({ claim, match }) => ({
					_id: claim._id,
					title: claim.title,
					slug: claim.slug,
					bottomLine: claim.bottomLine,
					consensusBand: claim.consensusBand,
					confidenceScore: claim.confidenceScore,
					matchReason: match.matchReason,
					matchScore: match.matchScore,
					topic:
						typeof claim.topic === "object" && "slug" in claim.topic
							? {
									_id: claim.topic._id,
									title: claim.topic.title,
									slug: claim.topic.slug
								}
							: null
				}));

			const rankedTopics = topics
				.map((topic) => {
					const match = analyzeMatch(query, [topic.title, topic.description, topic.slug].join(" "));
					return { topic, match };
				})
				.filter(entry => entry.match.matchScore > 0)
				.sort(
					(left, right) =>
						right.match.matchScore - left.match.matchScore || left.topic.title.localeCompare(right.topic.title)
				)
				.slice(0, 6)
				.map(({ topic, match }) => ({
					...topic,
					matchReason: match.matchReason,
					matchScore: match.matchScore
				}));

			const rankedQuestions = questions
				.map((question) => {
					const haystack = [
						question.normalizedQuestion,
						question.title,
						question.body,
						question.closestMatchLabel,
						typeof question.topic === "object" && "title" in question.topic ? question.topic.title : ""
					]
						.join(" ")
						.trim();
					const match = analyzeMatch(query, haystack);
					return { question, match };
				})
				.filter(entry => entry.match.matchScore > 0)
				.sort(
					(left, right) =>
						right.match.matchScore - left.match.matchScore
						|| left.question.title.localeCompare(right.question.title)
				)
				.slice(0, 6)
				.map(({ question, match }) => ({
					...question,
					matchReason: match.matchReason,
					matchScore: match.matchScore
				}));

			return res.json({
				claims: rankedClaims,
				topics: rankedTopics,
				questions: rankedQuestions
			});
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load suggestions." });
		}
	});

	api.get("/questions", async (req, res) => {
		try {
			const topicSlug = typeof req.query.topic === "string" ? req.query.topic : "";
			const claimSlug = typeof req.query.claim === "string" ? req.query.claim : "";
			const routingStatus = typeof req.query.routingStatus === "string" ? req.query.routingStatus : "";
			const limitRaw = Number(req.query.limit ?? 30);
			const limit = Number.isFinite(limitRaw) ? Math.min(Math.max(limitRaw, 1), 100) : 30;

			const filter: {
				topic?: mongoose.Types.ObjectId;
				claim?: mongoose.Types.ObjectId;
				routingStatus?: string | { $ne: string };
				status?: { $ne: string };
			} = {
				status: { $ne: "archived" },
				routingStatus: { $ne: "duplicate" }
			};
			if (topicSlug) {
				const topic = await Topic.findOne({ slug: topicSlug });
				if (!topic) return res.status(404).json({ error: "Topic not found." });
				filter.topic = topic._id;

				if (claimSlug) {
					const claim = await findClaimForTopic(topic._id, claimSlug);
					if (!claim) return res.status(404).json({ error: "Claim not found." });
					filter.claim = claim._id;
					filter.routingStatus = "linked";
				}
				else if (!routingStatus) {
					filter.routingStatus = "unassigned";
				}
			}

			if (routingStatus && ["unassigned", "linked", "duplicate"].includes(routingStatus)) {
				filter.routingStatus = routingStatus;
			}

			const questions = await Question.find(filter)
				.sort({ createdAt: -1 })
				.limit(limit)
				.populate("topic")
				.populate("claim")
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
			const question = await Question.findById(req.params.id).populate("topic").populate("claim").lean();
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
			const claimSlug = normalizeText(req.body?.claim, 160);
			const title = normalizeText(req.body?.title, 200);
			const normalizedQuestion
				= normalizeText(req.body?.normalizedQuestion, 220) || normalizeQuestionText(title || "");
			const body = normalizeText(req.body?.body, 4000);
			const sourceUrl = normalizeText(req.body?.sourceUrl, 500);
			const sourceContextType = normalizeSourceContextType(req.body?.sourceContextType);
			const displayName = normalizeText(req.body?.displayName, 80);
			const askKind = normalizeAskKind(req.body?.askKind);
			const closestMatchType = normalizeClosestMatchType(req.body?.closestMatchType);
			const closestMatchLabel = normalizeText(req.body?.closestMatchLabel, 240);
			const differenceNote = normalizeText(req.body?.differenceNote, 600);
			const loadedFrame = normalizeBoolean(req.body?.loadedFrame);
			const multiQuestion = normalizeBoolean(req.body?.multiQuestion);

			if (!topicSlug) return res.status(400).json({ error: "Topic is required." });
			if (!title) return res.status(400).json({ error: "Title is required." });

			const topic = await Topic.findOne({ slug: topicSlug });
			if (!topic) return res.status(404).json({ error: "Topic not found." });

			let claim: Awaited<ReturnType<typeof findClaimForTopic>> | null = null;
			if (claimSlug) {
				claim = await findClaimForTopic(topic._id, claimSlug);
				if (!claim) {
					return res.status(400).json({ error: "Claim does not belong to the supplied topic." });
				}
			}

			const actor = currentActor(req);
			const resolvedDisplayName = displayName || actor.name;

			const question = await Question.create({
				title,
				normalizedQuestion,
				body,
				sourceUrl,
				sourceContextType,
				displayName: resolvedDisplayName,
				author: actor.id,
				authorModel: actor.model,
				authorName: actor.name,
				topic: topic._id,
				claim: claim?._id,
				askKind,
				closestMatchType,
				closestMatchLabel,
				differenceNote,
				loadedFrame,
				multiQuestion,
				routingStatus: claim ? "linked" : "unassigned",
				linkedBy: claim ? new mongoose.Types.ObjectId(actor.id) : undefined,
				linkedAt: claim ? new Date() : undefined
			});

			if (actor.model === "User") {
				await User.findByIdAndUpdate(actor.id, {
					$inc: { trustScore: 2 },
					$max: { trustLevel: 1 }
				});
			}

			const populated = await Question.findById(question._id).populate("topic").populate("claim").lean();
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
					returnDocument: "after",
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
			const conflictDisclosure = normalizeText(req.body?.conflictDisclosure, 1200);
			const fundingDisclosure = normalizeText(req.body?.fundingDisclosure, 1200);
			const attestsDisclosurePolicy = normalizeBoolean(req.body?.attestsDisclosurePolicy);
			const attestsReviewStandards = normalizeBoolean(req.body?.attestsReviewStandards);
			const expertiseAreas = normalizeList(req.body?.expertiseAreas, 8, 80);
			const evidenceLinks = normalizeList(req.body?.evidenceLinks, 8, 300);
			const user = await User.findById(actor.id);

			if (!user) return res.status(404).json({ error: "User not found." });
			if (
				!credentialLabel
				|| !statement
				|| !expertiseAreas.length
				|| !attestsDisclosurePolicy
				|| !attestsReviewStandards
			) {
				return res
					.status(400)
					.json({
						error:
							"Credentials, expertise areas, a short statement, and both reviewer attestations are required."
					});
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
					conflictDisclosure,
					fundingDisclosure,
					attestsDisclosurePolicy,
					attestsReviewStandards,
					status: "pending",
					reviewNotes: "",
					reviewedBy: undefined,
					reviewedAt: undefined
				},
				{
					returnDocument: "after",
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

	api.get("/editorial/claims", requireEditorial, async (req, res) => {
		try {
			const status = typeof req.query.status === "string" ? req.query.status : "";
			const filter = status ? { status } : {};
			const claims = await Claim.find(filter).sort({ updatedAt: -1, createdAt: -1 }).populate("topic").lean();
			const sourceCounts = await ClaimSource.aggregate([
				{ $match: { claim: { $in: claims.map(claim => claim._id) } } },
				{
					$group: {
						_id: "$claim",
						count: { $sum: 1 },
						flaggedCount: {
							$sum: {
								$cond: [{ $ne: ["$citationStatus", "current"] }, 1, 0]
							}
						},
						retractedCount: {
							$sum: {
								$cond: [{ $eq: ["$citationStatus", "retracted"] }, 1, 0]
							}
						},
						correctedCount: {
							$sum: {
								$cond: [{ $eq: ["$citationStatus", "corrected"] }, 1, 0]
							}
						},
						concernCount: {
							$sum: {
								$cond: [{ $eq: ["$citationStatus", "expression_of_concern"] }, 1, 0]
							}
						}
					}
				}
			]);
			const sourceCountMap = new Map<
				string,
				{
					count: number;
					flaggedCount: number;
					retractedCount: number;
					correctedCount: number;
					concernCount: number;
				}
			>();
			for (const row of sourceCounts) {
				sourceCountMap.set(row._id.toString(), {
					count: row.count,
					flaggedCount: row.flaggedCount,
					retractedCount: row.retractedCount,
					correctedCount: row.correctedCount,
					concernCount: row.concernCount
				});
			}
			return res.json({
				claims: claims.map(claim => ({
					...claim,
					sourceCount: sourceCountMap.get(claim._id.toString())?.count ?? 0,
					flaggedSourceCount: sourceCountMap.get(claim._id.toString())?.flaggedCount ?? 0,
					retractedSourceCount: sourceCountMap.get(claim._id.toString())?.retractedCount ?? 0,
					correctedSourceCount: sourceCountMap.get(claim._id.toString())?.correctedCount ?? 0,
					concernSourceCount: sourceCountMap.get(claim._id.toString())?.concernCount ?? 0
				}))
			});
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load editorial claims." });
		}
	});

	api.get("/editorial/claims/:id", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId).populate("topic").lean();
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			const sources = await loadClaimSources(claim._id);
			return res.json({ claim: { ...claim, sources } });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load claim." });
		}
	});

	api.post("/editorial/claims", requireEditorial, async (req, res) => {
		try {
			const topicSlug = normalizeText(req.body?.topic, 120);
			const title = normalizeText(req.body?.title, 220);
			const slug = slugify(normalizeText(req.body?.slug, 220) || title);
			const revisionNote = normalizeText(req.body?.revisionNote, 2000) || "Created draft claim.";

			if (!topicSlug || !title) {
				return res.status(400).json({ error: "Topic and title are required." });
			}

			const topic = await Topic.findOne({ slug: topicSlug });
			if (!topic) return res.status(404).json({ error: "Topic not found." });

			const existing = await Claim.findOne({ topic: topic._id, slug });
			if (existing) {
				return res.status(409).json({ error: "A claim with that slug already exists in this topic." });
			}

			const claim = await Claim.create({
				topic: topic._id,
				title,
				slug,
				status: normalizeStatus(req.body?.status),
				consensusBand: normalizeText(req.body?.consensusBand, 24) || "unclear",
				agreementLevel: normalizeAgreementLevel(req.body?.agreementLevel),
				evidenceCertainty: normalizeEvidenceCertainty(req.body?.evidenceCertainty),
				confidenceScore: normalizeInteger(req.body?.confidenceScore, 0, 100, 50),
				reviewMode: normalizeReviewMode(req.body?.reviewMode),
				bottomLine: normalizeText(req.body?.bottomLine, 2000),
				stableCore: normalizeList(req.body?.stableCore, 12, 280),
				openQuestions: normalizeList(req.body?.openQuestions, 12, 280),
				whatWouldChangeMinds: normalizeList(req.body?.whatWouldChangeMinds, 12, 280),
				misconceptions: normalizeList(req.body?.misconceptions, 12, 280),
				misconceptionTags: normalizeList(req.body?.misconceptionTags, 8, 64),
				editorSummary: normalizeText(req.body?.editorSummary, 4000),
				uncertaintySummary: normalizeText(req.body?.uncertaintySummary, 1600),
				uncertaintyDrivers: normalizeUncertaintyDrivers(req.body?.uncertaintyDrivers),
				searchDatabases: normalizeList(req.body?.searchDatabases, 8, 120),
				searchCutoffAt: normalizeDate(req.body?.searchCutoffAt),
				inclusionRules: normalizeList(req.body?.inclusionRules, 8, 240),
				exclusionRules: normalizeList(req.body?.exclusionRules, 8, 240),
				surveillanceSpec: normalizeSurveillanceSpec(req.body?.surveillanceSpec),
				appraisalTools: normalizeList(req.body?.appraisalTools, 8, 180),
				evidenceSummaries: normalizeEvidenceSummaries(req.body?.evidenceSummaries),
				institutionalAnchors: normalizeInstitutionalAnchors(req.body?.institutionalAnchors),
				authorLine: normalizeText(req.body?.authorLine, 240),
				reviewerLine: normalizeText(req.body?.reviewerLine, 240),
				coiSummary: normalizeText(req.body?.coiSummary, 1000),
				independenceSummary: normalizeText(req.body?.independenceSummary, 1000),
				lastRetractionCheckAt: normalizeDate(req.body?.lastRetractionCheckAt),
				lastReviewedAt: normalizeDate(req.body?.lastReviewedAt),
				nextReviewAt: normalizeDate(req.body?.nextReviewAt),
				changeLog: [
					{
						date: new Date(),
						kind: "update",
						summary: revisionNote
					}
				]
			});

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: revisionNote
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.status(201).json({ claim: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to create claim." });
		}
	});

	api.patch("/editorial/claims/:id", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });

			const nextTopicSlug = normalizeText(req.body?.topic, 120);
			if (nextTopicSlug) {
				const topic = await Topic.findOne({ slug: nextTopicSlug });
				if (!topic) return res.status(404).json({ error: "Topic not found." });
				claim.topic = topic._id;
			}

			const nextTitle = normalizeText(req.body?.title, 220);
			if (nextTitle) claim.title = nextTitle;

			const nextSlug = normalizeText(req.body?.slug, 220);
			if (nextSlug || nextTitle) {
				claim.slug = slugify(nextSlug || nextTitle || claim.title);
			}

			const duplicate = await Claim.findOne({
				_id: { $ne: claim._id },
				topic: claim.topic,
				slug: claim.slug
			});
			if (duplicate) {
				return res.status(409).json({ error: "A claim with that slug already exists in this topic." });
			}

			if (req.body?.status) claim.status = normalizeStatus(req.body?.status) as typeof claim.status;
			if (req.body?.consensusBand) {
				claim.consensusBand = normalizeText(req.body?.consensusBand, 24) as typeof claim.consensusBand;
			}
			if (req.body?.agreementLevel !== undefined) {
				claim.agreementLevel = normalizeAgreementLevel(req.body?.agreementLevel) as typeof claim.agreementLevel;
			}
			if (req.body?.evidenceCertainty !== undefined) {
				claim.evidenceCertainty = normalizeEvidenceCertainty(
					req.body?.evidenceCertainty
				) as typeof claim.evidenceCertainty;
			}
			if (req.body?.confidenceScore !== undefined) {
				claim.confidenceScore = normalizeInteger(req.body?.confidenceScore, 0, 100, claim.confidenceScore);
			}
			if (req.body?.reviewMode !== undefined) {
				claim.reviewMode = normalizeReviewMode(req.body?.reviewMode) as typeof claim.reviewMode;
			}
			if (req.body?.bottomLine !== undefined) claim.bottomLine = normalizeText(req.body?.bottomLine, 2000);
			if (req.body?.stableCore !== undefined) claim.stableCore = normalizeList(req.body?.stableCore, 12, 280);
			if (req.body?.openQuestions !== undefined) {
				claim.openQuestions = normalizeList(req.body?.openQuestions, 12, 280);
			}
			if (req.body?.whatWouldChangeMinds !== undefined) {
				claim.whatWouldChangeMinds = normalizeList(req.body?.whatWouldChangeMinds, 12, 280);
			}
			if (req.body?.misconceptions !== undefined) {
				claim.misconceptions = normalizeList(req.body?.misconceptions, 12, 280);
			}
			if (req.body?.misconceptionTags !== undefined) {
				claim.misconceptionTags = normalizeList(req.body?.misconceptionTags, 8, 64);
			}
			if (req.body?.editorSummary !== undefined) {
				claim.editorSummary = normalizeText(req.body?.editorSummary, 4000);
			}
			if (req.body?.uncertaintySummary !== undefined) {
				claim.uncertaintySummary = normalizeText(req.body?.uncertaintySummary, 1600);
			}
			if (req.body?.uncertaintyDrivers !== undefined) {
				claim.uncertaintyDrivers = normalizeUncertaintyDrivers(req.body?.uncertaintyDrivers);
			}
			if (req.body?.searchDatabases !== undefined) {
				claim.searchDatabases = normalizeList(req.body?.searchDatabases, 8, 120);
			}
			if (req.body?.searchCutoffAt !== undefined) {
				claim.searchCutoffAt = normalizeDate(req.body?.searchCutoffAt);
			}
			if (req.body?.inclusionRules !== undefined) {
				claim.inclusionRules = normalizeList(req.body?.inclusionRules, 8, 240);
			}
			if (req.body?.exclusionRules !== undefined) {
				claim.exclusionRules = normalizeList(req.body?.exclusionRules, 8, 240);
			}
			if (req.body?.surveillanceSpec !== undefined) {
				claim.surveillanceSpec = normalizeSurveillanceSpec(req.body?.surveillanceSpec);
			}
			if (req.body?.appraisalTools !== undefined) {
				claim.appraisalTools = normalizeList(req.body?.appraisalTools, 8, 180);
			}
			if (req.body?.evidenceSummaries !== undefined) {
				claim.evidenceSummaries = normalizeEvidenceSummaries(req.body?.evidenceSummaries);
			}
			if (req.body?.institutionalAnchors !== undefined) {
				claim.institutionalAnchors = normalizeInstitutionalAnchors(req.body?.institutionalAnchors);
			}
			if (req.body?.authorLine !== undefined) {
				claim.authorLine = normalizeText(req.body?.authorLine, 240);
			}
			if (req.body?.reviewerLine !== undefined) {
				claim.reviewerLine = normalizeText(req.body?.reviewerLine, 240);
			}
			if (req.body?.coiSummary !== undefined) {
				claim.coiSummary = normalizeText(req.body?.coiSummary, 1000);
			}
			if (req.body?.independenceSummary !== undefined) {
				claim.independenceSummary = normalizeText(req.body?.independenceSummary, 1000);
			}
			if (req.body?.lastRetractionCheckAt !== undefined) {
				claim.lastRetractionCheckAt = normalizeDate(req.body?.lastRetractionCheckAt);
			}
			if (req.body?.lastReviewedAt !== undefined) {
				claim.lastReviewedAt = normalizeDate(req.body?.lastReviewedAt);
			}
			if (req.body?.nextReviewAt !== undefined) {
				claim.nextReviewAt = normalizeDate(req.body?.nextReviewAt);
			}

			const revisionSummary = normalizeText(req.body?.revisionNote, 2000) || "Updated claim draft.";
			appendClaimChangeLog(claim, "update", revisionSummary);

			await claim.save();

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: revisionSummary
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to update claim." });
		}
	});

	api.post("/editorial/claims/:id/publish", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });

			const actor = currentActor(req);
			const publishedAt = new Date();
			claim.status = "published";
			claim.publishedAt = claim.publishedAt || publishedAt;
			claim.lastReviewedAt = normalizeDate(req.body?.lastReviewedAt) || publishedAt;
			claim.nextReviewAt
				= normalizeDate(req.body?.nextReviewAt) || new Date(publishedAt.getTime() + 180 * 24 * 60 * 60 * 1000);
			claim.reviewedBy = new mongoose.Types.ObjectId(actor.id);
			appendClaimChangeLog(
				claim,
				"publication",
				normalizeText(req.body?.revisionNote, 2000) || "Published claim."
			);
			await claim.save();

			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: normalizeText(req.body?.revisionNote, 2000) || "Published claim."
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to publish claim." });
		}
	});

	api.post("/editorial/claims/:id/archive", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });

			const actor = currentActor(req);
			claim.status = "archived";
			appendClaimChangeLog(claim, "update", normalizeText(req.body?.revisionNote, 2000) || "Archived claim.");
			await claim.save();

			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: normalizeText(req.body?.revisionNote, 2000) || "Archived claim."
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to archive claim." });
		}
	});

	api.get("/editorial/claims/:id/revisions", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}
			const revisions = await ClaimRevision.find({ claim: claimId }).sort({ createdAt: -1 }).lean();
			return res.json({ revisions });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load claim revisions." });
		}
	});

	api.get("/editorial/claims/:id/sources", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}
			const sources = await loadClaimSources(new mongoose.Types.ObjectId(claimId));
			return res.json({ sources });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load claim sources." });
		}
	});

	api.post("/editorial/claims/:id/sources", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}
			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });

			const source = await ClaimSource.create({
				claim: claim._id,
				kind: normalizeText(req.body?.kind, 32) || "context",
				title: normalizeText(req.body?.title, 240),
				publisher: normalizeText(req.body?.publisher, 160),
				year: req.body?.year
					? normalizeInteger(req.body?.year, 0, 9999, new Date().getUTCFullYear())
					: undefined,
				url: normalizeText(req.body?.url, 500),
				doi: normalizeText(req.body?.doi, 200),
				pmid: normalizeText(req.body?.pmid, 40),
				pmcid: normalizeText(req.body?.pmcid, 40),
				isAnchor: normalizeBoolean(req.body?.isAnchor),
				appraisal: normalizeSourceAppraisal(req.body?.appraisal),
				citationStatus: normalizeCitationStatus(req.body?.citationStatus),
				citationCheckedAt: normalizeDate(req.body?.citationCheckedAt),
				statusSources: normalizeList(req.body?.statusSources, 6, 120),
				stance: normalizeText(req.body?.stance, 24) || "context",
				note: normalizeText(req.body?.note, 1000),
				order: normalizeInteger(req.body?.order, 0, 999, 0)
			});

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: normalizeText(req.body?.revisionNote, 2000) || "Added claim source."
			});

			return res.status(201).json({ source });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to add source." });
		}
	});

	api.patch("/editorial/claims/:id/sources/:sourceId", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			const sourceId = typeof req.params.sourceId === "string" ? req.params.sourceId : "";
			if (!mongoose.Types.ObjectId.isValid(claimId) || !mongoose.Types.ObjectId.isValid(sourceId)) {
				return res.status(400).json({ error: "Invalid source id." });
			}

			const source = await ClaimSource.findOne({ _id: sourceId, claim: claimId });
			if (!source) return res.status(404).json({ error: "Source not found." });

			if (req.body?.kind !== undefined) source.kind = normalizeText(req.body?.kind, 32) as typeof source.kind;
			if (req.body?.title !== undefined) source.title = normalizeText(req.body?.title, 240);
			if (req.body?.publisher !== undefined) source.publisher = normalizeText(req.body?.publisher, 160);
			if (req.body?.year !== undefined) {
				source.year = req.body?.year ? normalizeInteger(req.body?.year, 0, 9999, 0) : undefined;
			}
			if (req.body?.url !== undefined) source.url = normalizeText(req.body?.url, 500);
			if (req.body?.doi !== undefined) source.doi = normalizeText(req.body?.doi, 200);
			if (req.body?.pmid !== undefined) source.pmid = normalizeText(req.body?.pmid, 40);
			if (req.body?.pmcid !== undefined) source.pmcid = normalizeText(req.body?.pmcid, 40);
			if (req.body?.isAnchor !== undefined) source.isAnchor = normalizeBoolean(req.body?.isAnchor);
			if (req.body?.appraisal !== undefined) {
				source.appraisal = normalizeSourceAppraisal(req.body?.appraisal) as typeof source.appraisal;
			}
			if (req.body?.citationStatus !== undefined) {
				source.citationStatus = normalizeCitationStatus(
					req.body?.citationStatus
				) as typeof source.citationStatus;
			}
			if (req.body?.citationCheckedAt !== undefined) {
				source.citationCheckedAt = normalizeDate(req.body?.citationCheckedAt);
			}
			if (req.body?.statusSources !== undefined) {
				source.statusSources = normalizeList(req.body?.statusSources, 6, 120);
			}
			if (req.body?.stance !== undefined)
				source.stance = normalizeText(req.body?.stance, 24) as typeof source.stance;
			if (req.body?.note !== undefined) source.note = normalizeText(req.body?.note, 1000);
			if (req.body?.order !== undefined)
				source.order = normalizeInteger(req.body?.order, 0, 999, source.order || 0);
			await source.save();

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: new mongoose.Types.ObjectId(claimId),
				editorId: actor.id,
				editorModel: actor.model,
				summary: normalizeText(req.body?.revisionNote, 2000) || "Updated claim source."
			});

			return res.json({ source });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to update source." });
		}
	});

	api.delete("/editorial/claims/:id/sources/:sourceId", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			const sourceId = typeof req.params.sourceId === "string" ? req.params.sourceId : "";
			if (!mongoose.Types.ObjectId.isValid(claimId) || !mongoose.Types.ObjectId.isValid(sourceId)) {
				return res.status(400).json({ error: "Invalid source id." });
			}

			const source = await ClaimSource.findOneAndDelete({ _id: sourceId, claim: claimId });
			if (!source) return res.status(404).json({ error: "Source not found." });

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: new mongoose.Types.ObjectId(claimId),
				editorId: actor.id,
				editorModel: actor.model,
				summary: normalizeText(req.body?.revisionNote, 2000) || "Removed claim source."
			});

			return res.sendStatus(204);
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to remove source." });
		}
	});

	api.get("/editorial/questions", requireEditorial, async (req, res) => {
		try {
			const routingStatus = typeof req.query.routingStatus === "string" ? req.query.routingStatus : "";
			const filter: Record<string, unknown> = {
				status: { $ne: "archived" }
			};
			if (routingStatus && ["unassigned", "linked", "duplicate"].includes(routingStatus)) {
				filter.routingStatus = routingStatus;
			}
			const questions = await Question.find(filter)
				.sort({ createdAt: -1 })
				.populate("topic")
				.populate("claim")
				.lean();
			return res.json({ questions });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to load editorial questions." });
		}
	});

	api.post("/editorial/questions/:id/link-claim", requireEditorial, async (req, res) => {
		try {
			const questionId = typeof req.params.id === "string" ? req.params.id : "";
			const claimId = normalizeText(req.body?.claimId, 40);
			if (!mongoose.Types.ObjectId.isValid(questionId) || !mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid question or claim id." });
			}

			const [question, claim] = await Promise.all([Question.findById(questionId), Claim.findById(claimId)]);
			if (!question) return res.status(404).json({ error: "Question not found." });
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (question.topic.toString() !== claim.topic.toString()) {
				return res.status(400).json({ error: "Claim must belong to the same topic as the question." });
			}

			const actor = currentActor(req);
			question.claim = claim._id;
			question.routingStatus = "linked";
			question.linkedBy = new mongoose.Types.ObjectId(actor.id);
			question.linkedAt = new Date();
			await question.save();

			const populated = await Question.findById(question._id).populate("topic").populate("claim").lean();
			return res.json({ question: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to link question to claim." });
		}
	});

	api.post("/editorial/questions/:id/create-claim", requireEditorial, async (req, res) => {
		try {
			const questionId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(questionId)) {
				return res.status(400).json({ error: "Invalid question id." });
			}

			const question = await Question.findById(questionId).populate("topic");
			if (!question) return res.status(404).json({ error: "Question not found." });
			const topic = question.topic as { _id: mongoose.Types.ObjectId; slug: string; title: string };
			const title = normalizeText(req.body?.title, 220) || question.title;
			const slug = slugify(normalizeText(req.body?.slug, 220) || title);
			const existing = await Claim.findOne({ topic: topic._id, slug });
			if (existing) {
				return res.status(409).json({ error: "A claim with that slug already exists in this topic." });
			}

			const claim = await Claim.create({
				topic: topic._id,
				title,
				slug,
				status: "draft",
				consensusBand: "unclear",
				confidenceScore: 50,
				bottomLine: normalizeText(req.body?.bottomLine, 2000),
				editorSummary: normalizeText(req.body?.editorSummary, 4000) || question.body || ""
			});

			const actor = currentActor(req);
			question.claim = claim._id;
			question.routingStatus = "linked";
			question.linkedBy = new mongoose.Types.ObjectId(actor.id);
			question.linkedAt = new Date();
			await question.save();

			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary:
					normalizeText(req.body?.revisionNote, 2000)
					|| `Created draft claim from question: ${question.title}`
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.status(201).json({ claim: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to create claim from question." });
		}
	});

	api.post("/editorial/questions/:id/mark-duplicate", requireEditorial, async (req, res) => {
		try {
			const questionId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(questionId)) {
				return res.status(400).json({ error: "Invalid question id." });
			}

			const question = await Question.findById(questionId);
			if (!question) return res.status(404).json({ error: "Question not found." });

			question.routingStatus = "duplicate";
			question.status = "flagged";
			question.linkedBy = new mongoose.Types.ObjectId(currentActor(req).id);
			question.linkedAt = new Date();
			await question.save();

			const populated = await Question.findById(question._id).populate("topic").populate("claim").lean();
			return res.json({ question: populated });
		}
		catch (error) {
			console.error(error);
			return res.status(500).json({ error: "Failed to mark question as duplicate." });
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
	const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
	let isShuttingDown = false;

	const shutdown = async (signal: NodeJS.Signals) => {
		if (isShuttingDown) {
			return;
		}

		isShuttingDown = true;
		console.log(`${signal} received, shutting down gracefully...`);

		try {
			if (server.listening) {
				await new Promise<void>((resolve, reject) => {
					server.close((error) => {
						if (error) {
							reject(error);
							return;
						}

						resolve();
					});
				});
			}

			if (mongoose.connection.readyState !== 0) {
				await mongoose.disconnect();
			}

			console.log("Graceful shutdown complete.");
			exit(0);
		}
		catch (error) {
			console.error("Graceful shutdown failed:", error);
			exit(1);
		}
	};

	process.once("SIGINT", () => {
		void shutdown("SIGINT");
	});
	process.once("SIGTERM", () => {
		void shutdown("SIGTERM");
	});
}

main().catch((err) => {
	console.error(err);
	exit(1);
});
