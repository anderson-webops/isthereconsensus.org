import type { QueryFilter } from "mongoose";
import type {
	ClaimConsensusBand,
	ClaimStatus,
	IClaim,
	IClaimEvidenceLandscape,
	IClaimEvidenceSummary,
	IClaimInstitutionalAnchor,
	IClaimSurveillanceSpec,
	IClaimUncertaintyDriver
} from "./models/schemas/Claim.js";
import type { ClaimSourceKind, ClaimSourceStance, IClaimSourceEvidenceProfile } from "./models/schemas/ClaimSource.js";
import type { IExpertApplication } from "./models/schemas/ExpertApplication.js";
import type { IQuestion } from "./models/schemas/Question.js";
import type { PublicClaimSourceReadinessCounts } from "./utils/publicClaimReadiness.js";
// src/server.ts
import process, { env, exit } from "node:process";
import cookieSession from "cookie-session";

import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import {
	EVIDENCE_BOUNDARY_DIMENSIONS,
	EVIDENCE_CLAIM_TYPES,
	EVIDENCE_CONSISTENCY_LEVELS,
	EVIDENCE_DIRECTNESS_LEVELS,
	EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS,
	EVIDENCE_LANDSCAPE_DIRECTIONS,
	EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS,
	EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
	EVIDENCE_LANDSCAPE_SUPPORT_LABELS,
	EVIDENCE_PRECISION_LEVELS,
	EVIDENCE_RISK_OF_BIAS_LEVELS,
	EVIDENCE_SOURCE_EXCLUSION_REASONS,
	EVIDENCE_SOURCE_POSITION_BUCKETS,
	EVIDENCE_STUDY_DESIGNS,
	EVIDENCE_TIERS
} from "./constants/evidenceLandscape.js";
import { listAccountActivity } from "./controllers/accountActivityController.js";
import { seedClaims } from "./data/seedClaims.js";
import { seedTopics } from "./data/seedTopics.js";
import { optionalAuth, requireAdmin, requireAuth, requireEditorial } from "./middleware/auth.js";
import { Claim } from "./models/schemas/Claim.js";
import { ClaimRevision } from "./models/schemas/ClaimRevision.js";
import { CLAIM_SOURCE_TITLE_MAX_LENGTH, ClaimSource } from "./models/schemas/ClaimSource.js";
import { EvidenceLandscapeReview } from "./models/schemas/EvidenceLandscapeReview.js";
import { ExpertApplication } from "./models/schemas/ExpertApplication.js";
import { Question } from "./models/schemas/Question.js";
import { QuestionFlag } from "./models/schemas/QuestionFlag.js";
import { Topic } from "./models/schemas/Topic.js";
import { TopicSentimentVote } from "./models/schemas/TopicSentimentVote.js";
import { User } from "./models/schemas/User.js";
import { authRoutes } from "./routes/authRoutes.js";
import { buildSetupStatus } from "./setup/buildSetupStatus.js";
import { recordAccountActivity } from "./utils/accountActivity.js";
import {
	normalizeHttpOrigin,
	normalizeHttpUrl,
	normalizeHttpUrlList
} from "./utils/accountValidation.js";
import { verifyCaptcha } from "./utils/captcha.js";
import { claimWorkflowTransitionAllowed } from "./utils/claimWorkflow.js";
import { getActorFromRequest } from "./utils/community.js";
import { canReadDiagnostics } from "./utils/diagnostics.js";
import { searchEvidence } from "./utils/evidence.js";
import {
	recomputeEvidenceLandscapeFromSources,
	sourceIsExcludedEvidenceCard,
	sourceIsPublicEvidenceCard,
	toPublicEvidenceSourceCard,
	validEvidenceSourcePosition,
	validEvidenceStudyDesign,
	validEvidenceTier
} from "./utils/evidenceDistribution.js";
import { toPublicEvidenceLandscape } from "./utils/evidenceLandscape.js";
import { resolveMongoConfiguration } from "./utils/mongoConfiguration.js";
import {
	emptyPublicClaimSourceReadinessCounts,
	getPublicClaimReadiness,
	summarizeClaimSourceReadiness
} from "./utils/publicClaimReadiness.js";
import {
	toApplicantExpertApplication,
	toEditorialClaim,
	toEditorialClaimRevision,
	toEditorialClaimSource,
	toEditorialEvidenceLandscape,
	toEditorialEvidenceReview,
	toEditorialQuestion,
	toPublicClaim,
	toPublicQuestion,
	toPublicTopic,
	toPublicTopicSentimentVote,
	toReporterQuestionFlag
} from "./utils/publicRecords.js";
import { logError } from "./utils/safeLog.js";
import { slugify } from "./utils/slugify.js";
import "dotenv/config";

const whitespacePattern = /\s+/;
const normalizeQuestionPattern = /[^\p{L}\p{N}\s]/gu;

async function main() {
	const app = express();
	const isProd = env.NODE_ENV === "production";
	const isCrossSite = env.CROSS_SITE === "true";
	const internalDiagnosticsKey = env.INTERNAL_DIAGNOSTICS_KEY;
	const diagnosticsEnabled = env.ENABLE_INTERNAL_DIAGNOSTICS === "true";
	const seedContentMode = env.SEED_CONTENT_MODE || "insert";
	if (seedContentMode !== "insert" && seedContentMode !== "sync") {
		throw new Error("SEED_CONTENT_MODE must be either insert or sync.");
	}
	app.disable("x-powered-by");

	const trustProxy = (env.TRUST_PROXY_IPS || "loopback")
		.split(",")
		.map(value => value.trim())
		.filter(Boolean);
	app.set("trust proxy", trustProxy);

	app.use(helmet({
		contentSecurityPolicy: false,
		crossOriginResourcePolicy: false,
		hsts: isProd
	}));

	// health
	const healthLimiter = rateLimit({
		windowMs: 60_000,
		limit: 120,
		standardHeaders: "draft-8",
		legacyHeaders: false
	});
	app.get("/healthz", healthLimiter, (_req, res) => {
		res.set("Cache-Control", "no-store");
		res.json({ ok: true });
	});

	const SESSION_SECRET = env.SESSION_SECRET;
	if (!SESSION_SECRET) throw new Error("Missing SESSION_SECRET");
	if (isProd && (SESSION_SECRET.length < 32 || /SECRET_VALUE_HERE|change.?me/i.test(SESSION_SECRET))) {
		throw new Error("SESSION_SECRET must be a unique production secret of at least 32 characters.");
	}
	if (isProd && !env.CAPTCHA_SECRET) {
		throw new Error("CAPTCHA_SECRET is required in production.");
	}
	if (isProd && diagnosticsEnabled && (!internalDiagnosticsKey || internalDiagnosticsKey.length < 32)) {
		throw new Error("Enabled production diagnostics require INTERNAL_DIAGNOSTICS_KEY of at least 32 characters.");
	}

	app.use(express.json({
		inflate: false,
		limit: "128kb",
		strict: true,
		type: ["application/json", "application/*+json"]
	}));

	const publicSiteOrigin = normalizeHttpOrigin(
		env.PUBLIC_SITE_URL || "https://isthereconsensus.org",
		{ requireHttps: isProd }
	);
	const configuredCorsOrigins = (env.CORS_ORIGIN || "")
		.split(",")
		.map(value => value.trim())
		.filter(Boolean)
		.map(value => normalizeHttpOrigin(value, { requireHttps: isProd }));
	const allowedOrigins = new Set([publicSiteOrigin, ...configuredCorsOrigins]);
	if (isProd && isCrossSite && configuredCorsOrigins.length === 0) {
		throw new Error("CORS_ORIGIN is required when CROSS_SITE=true in production.");
	}
	const corsOrigin = configuredCorsOrigins.join(",");

	app.use((req, res, next) => {
		const origin = req.get("origin");
		const originAllowed = Boolean(origin && allowedOrigins.has(origin));
		if (originAllowed) {
			res.setHeader("Access-Control-Allow-Origin", origin!);
			res.setHeader("Access-Control-Allow-Credentials", "true");
			res.setHeader("Vary", "Origin");
			res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
			res.setHeader("Access-Control-Allow-Headers", "Content-Type");
		}
		if (req.method === "OPTIONS") {
			return originAllowed || (!isProd && !origin)
				? res.sendStatus(204)
				: res.status(403).json({ error: "Origin not allowed." });
		}
		return next();
	});

	// 2) sessions BEFORE any route that needs req.session
	///   COOKIES   ///
	type CookieSessionOpts = Parameters<typeof cookieSession>[0];

	const cookieOptions: CookieSessionOpts = {
		name: isProd ? "__Host-session" : "session",
		keys: [SESSION_SECRET],
		maxAge: 24 * 60 * 60 * 1000,
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secure: isProd
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

	app.use((req, res, next) => {
		const unsafeMethod = !["GET", "HEAD", "OPTIONS"].includes(req.method);
		if (!unsafeMethod) return next();

		const origin = req.get("origin");
		const fetchSite = req.get("sec-fetch-site");
		if ((origin && !allowedOrigins.has(origin))
			|| (fetchSite === "cross-site" && (!origin || !allowedOrigins.has(origin)))) {
			return res.status(403).json({ error: "Cross-site request blocked." });
		}
		if (isProd && req.get("cookie") && !origin && fetchSite !== "same-origin" && fetchSite !== "same-site") {
			return res.status(403).json({ error: "Request origin could not be verified." });
		}
		return next();
	});

	const authLimiter = rateLimit({
		windowMs: 15 * 60_000,
		limit: 20,
		standardHeaders: "draft-8",
		legacyHeaders: false
	});
	const writeLimiter = rateLimit({
		windowMs: 60_000,
		limit: 90,
		standardHeaders: "draft-8",
		legacyHeaders: false,
		skip: req => ["GET", "HEAD", "OPTIONS"].includes(req.method)
	});
	const readLimiter = rateLimit({
		windowMs: 60_000,
		limit: 300,
		standardHeaders: "draft-8",
		legacyHeaders: false,
		skip: req => !["GET", "HEAD"].includes(req.method)
	});
	const searchSuggestionLimiter = rateLimit({
		windowMs: 60_000,
		limit: 30,
		standardHeaders: "draft-8",
		legacyHeaders: false
	});
	const evidenceSearchLimiter = rateLimit({
		windowMs: 60_000,
		limit: 20,
		standardHeaders: "draft-8",
		legacyHeaders: false
	});
	app.use("/api/auth/login", authLimiter);
	app.use("/api/auth/register", authLimiter);
	app.use("/api/auth/email", authLimiter);
	app.use("/api/auth/password", authLimiter);
	app.use("/api", readLimiter);
	app.use("/api", writeLimiter);

	// 3) cache-control for auth endpoints
	app.use((req, res, next) => {
		if (req.path.startsWith("/accounts") || req.path.startsWith("/api/auth") || req.path.endsWith("/loggedin")) {
			res.setHeader("Cache-Control", "no-store");
		}
		next();
	});

	// ready
	app.get("/readyz", healthLimiter, async (_req, res) => {
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
			await connection.db.command({ ping: 1, maxTimeMS: 2_000 });
			return res.set("Cache-Control", "no-store").json({
				ready: true,
				components: {
					db: { ok: true, state }
				}
			});
		}
		catch {
			return res
				.status(503)
				.set("Cache-Control", "no-store")
				.json({
					ready: false,
					components: {
						db: {
							ok: false,
							state,
							error: "db-ping-failed"
						}
					}
				});
		}
	});

	const { source: mongoSource, uri: mongoUri } = await resolveMongoConfiguration();

	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 10_000,
		connectTimeoutMS: 10_000
	});
	console.log(`Connected to MongoDB using ${mongoSource} configuration.`);
	const c = mongoose.connection;

	function requireDiagnosticsAccess(req: express.Request, res: express.Response) {
		const allowed = canReadDiagnostics({
			isProd,
			enabled: diagnosticsEnabled,
			configuredKey: internalDiagnosticsKey,
			providedKey: req.get("x-internal-diagnostics-key")
		});
		if (!allowed) {
			res
				.status(isProd && !diagnosticsEnabled ? 404 : 403)
				.set("Cache-Control", "no-store")
				.json({ ok: false, error: isProd && !diagnosticsEnabled ? "not_found" : "forbidden" });
		}
		return allowed;
	}

	app.get("/_dbinfo", (req, res) => {
		if (!requireDiagnosticsAccess(req, res)) return;

		res.set("Cache-Control", "no-store").json({
			databaseName: c.db?.databaseName ?? null,
			host: c.host || null,
			name: c.name || null,
			readyState: c.readyState,
			usingVault: mongoSource === "vault"
		});
	});
	app.get("/api/setup/status", (req, res) => {
		if (!requireDiagnosticsAccess(req, res)) return;

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
	await seedClaims({ synchronizeExisting: seedContentMode === "sync" });
	console.log(`Seed content mode: ${seedContentMode === "sync" ? "synchronize existing" : "insert only"}.`);
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

	function canMutateClaim(req: express.Request, claim: Pick<IClaim, "status">) {
		if (req.currentAdmin) {
			return claim.status === "draft" || claim.status === "needs_update";
		}
		return claim.status === "draft";
	}

	function requireClaimMutationAccess(
		req: express.Request,
		res: express.Response,
		claim: Pick<IClaim, "status">
	) {
		if (canMutateClaim(req, claim)) return true;
		res.status(403).json({
			error:
				"Claim edits require draft status, or needs-update status for an admin. Use the review workflow for published or archived records."
		});
		return false;
	}

	function invalidateEvidenceLandscapeApproval(claim: Pick<IClaim, "evidenceLandscape">) {
		const workflow = claim.evidenceLandscape.workflow;
		workflow.status = workflow.status === "changes_requested" ? "changes_requested" : "draft";
		workflow.reviewedById = undefined;
		workflow.approvedById = undefined;
		workflow.publishedAt = undefined;
		claim.evidenceLandscape.publicFlags.showEvidenceLandscape = false;
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

	function isClaimStatus(value: string): value is ClaimStatus {
		return value === "draft" || value === "published" || value === "needs_update" || value === "archived";
	}

	function normalizeConsensusBand(value: unknown): ClaimConsensusBand {
		const normalized = normalizeText(value, 24);
		if (normalized === "strong") return "strong";
		if (normalized === "broad") return "broad";
		if (normalized === "mixed") return "mixed";
		return "unclear";
	}

	function isQuestionRoutingStatus(value: string): value is NonNullable<IQuestion["routingStatus"]> {
		return value === "unassigned" || value === "linked" || value === "duplicate";
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

	function normalizeClaimSourceKind(value: unknown): ClaimSourceKind {
		const normalized = normalizeText(value, 32);
		if (normalized === "systematic_review") return "systematic_review";
		if (normalized === "meta_analysis") return "meta_analysis";
		if (normalized === "guideline") return "guideline";
		if (normalized === "consensus_statement") return "consensus_statement";
		if (normalized === "landmark_study") return "landmark_study";
		return "context";
	}

	function normalizeClaimSourceStance(value: unknown): ClaimSourceStance {
		const normalized = normalizeText(value, 24);
		if (normalized === "supports") return "supports";
		if (normalized === "debate") return "debate";
		return "context";
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

	function normalizeEvidenceLandscapeEnum<T extends readonly string[]>(
		value: unknown,
		allowed: T,
		fallback: T[number]
	): T[number] {
		const normalized = normalizeText(value, 80);
		return (allowed as readonly string[]).includes(normalized) ? (normalized as T[number]) : fallback;
	}

	function normalizeEvidenceLandscapeBoolean(value: unknown, fallback: boolean) {
		return value === undefined ? fallback : normalizeBoolean(value);
	}

	function normalizeEvidenceLandscapeText(
		record: Record<string, unknown>,
		key: string,
		maxLength: number,
		fallback = ""
	) {
		return Object.hasOwn(record, key) ? normalizeText(record[key], maxLength) : fallback;
	}

	function normalizeOptionalObjectId(value: unknown, fallback?: mongoose.Types.ObjectId) {
		const raw = normalizeText(value, 40);
		return mongoose.Types.ObjectId.isValid(raw) ? new mongoose.Types.ObjectId(raw) : fallback;
	}

	function normalizeLandscapeScore(value: unknown, fallback?: number | null) {
		if (value === null) return null;
		if (value === undefined) return fallback ?? null;
		const numeric = Number(value);
		return Number.isFinite(numeric) ? Math.min(Math.max(Math.round(numeric), 0), 100) : (fallback ?? null);
	}

	function normalizeLandscapeBucket(value: unknown, fallback?: { count?: number; weightedCount?: number }) {
		const record = typeof value === "object" && value ? (value as Record<string, unknown>) : {};
		return {
			count: normalizeInteger(record.count, 0, 100000, fallback?.count ?? 0),
			weightedCount: normalizeInteger(record.weightedCount, 0, 100000, fallback?.weightedCount ?? 0)
		};
	}

	function normalizeExcludedLandscapeBucket(value: unknown, fallback?: { count?: number }) {
		const record = typeof value === "object" && value ? (value as Record<string, unknown>) : {};
		return {
			count: normalizeInteger(record.count, 0, 100000, fallback?.count ?? 0)
		};
	}

	function normalizeLandscapeDistribution(
		value: unknown,
		existing?: IClaimEvidenceLandscape["distribution"]
	): IClaimEvidenceLandscape["distribution"] {
		const record = typeof value === "object" && value ? (value as Record<string, unknown>) : {};
		return {
			supportsClaim: normalizeLandscapeBucket(record.supportsClaim, existing?.supportsClaim),
			supportsWithCaveats: normalizeLandscapeBucket(record.supportsWithCaveats, existing?.supportsWithCaveats),
			opposesClaim: normalizeLandscapeBucket(record.opposesClaim, existing?.opposesClaim),
			inconclusiveOrMixed: normalizeLandscapeBucket(record.inconclusiveOrMixed, existing?.inconclusiveOrMixed),
			backgroundContext: normalizeLandscapeBucket(record.backgroundContext, existing?.backgroundContext),
			excludedLowQuality: normalizeExcludedLandscapeBucket(record.excludedLowQuality, existing?.excludedLowQuality),
			excludedRetracted: normalizeExcludedLandscapeBucket(record.excludedRetracted, existing?.excludedRetracted),
			excludedFringe: normalizeExcludedLandscapeBucket(record.excludedFringe, existing?.excludedFringe)
		};
	}

	function normalizeEvidenceBaseSize(
		value: unknown,
		existing?: IClaimEvidenceLandscape["evidenceBaseSize"]
	): IClaimEvidenceLandscape["evidenceBaseSize"] {
		const record = typeof value === "object" && value ? (value as Record<string, unknown>) : {};
		return {
			totalSources: normalizeInteger(record.totalSources, 0, 100000, existing?.totalSources ?? 0),
			includedSources: normalizeInteger(record.includedSources, 0, 100000, existing?.includedSources ?? 0),
			excludedSources: normalizeInteger(record.excludedSources, 0, 100000, existing?.excludedSources ?? 0),
			systematicReviews: normalizeInteger(record.systematicReviews, 0, 100000, existing?.systematicReviews ?? 0),
			metaAnalyses: normalizeInteger(record.metaAnalyses, 0, 100000, existing?.metaAnalyses ?? 0),
			evidenceBasedGuidelines: normalizeInteger(
				record.evidenceBasedGuidelines,
				0,
				100000,
				existing?.evidenceBasedGuidelines ?? 0
			),
			randomizedTrials: normalizeInteger(record.randomizedTrials, 0, 100000, existing?.randomizedTrials ?? 0),
			observationalStudies: normalizeInteger(
				record.observationalStudies,
				0,
				100000,
				existing?.observationalStudies ?? 0
			),
			mechanisticOrPreclinical: normalizeInteger(
				record.mechanisticOrPreclinical,
				0,
				100000,
				existing?.mechanisticOrPreclinical ?? 0
			),
			expertCommentary: normalizeInteger(record.expertCommentary, 0, 100000, existing?.expertCommentary ?? 0),
			retractedOrInvalid: normalizeInteger(
				record.retractedOrInvalid,
				0,
				100000,
				existing?.retractedOrInvalid ?? 0
			)
		};
	}

	function normalizeLandscapeApplicability(
		value: unknown,
		existing?: IClaimEvidenceLandscape["applicability"]
	): IClaimEvidenceLandscape["applicability"] {
		const record = typeof value === "object" && value ? (value as Record<string, unknown>) : {};
		return {
			population: normalizeEvidenceLandscapeText(record, "population", 280, existing?.population),
			exposureOrIntervention: normalizeEvidenceLandscapeText(
				record,
				"exposureOrIntervention",
				280,
				existing?.exposureOrIntervention
			),
			comparator: normalizeEvidenceLandscapeText(record, "comparator", 280, existing?.comparator),
			outcomes: Object.hasOwn(record, "outcomes") ? normalizeList(record.outcomes, 12, 180) : (existing?.outcomes ?? []),
			setting: normalizeEvidenceLandscapeText(record, "setting", 280, existing?.setting),
			timeframe: normalizeEvidenceLandscapeText(record, "timeframe", 280, existing?.timeframe)
		};
	}

	function normalizeBoundaryConditions(
		value: unknown,
		existing?: IClaimEvidenceLandscape["boundaryConditions"]
	): IClaimEvidenceLandscape["boundaryConditions"] {
		if (!Array.isArray(value)) return existing ?? [];
		return value
			.slice(0, 12)
			.map((item) => {
				const record = typeof item === "object" && item ? (item as Record<string, unknown>) : {};
				const label = normalizeText(record.label, 180);
				const explanation = normalizeText(record.explanation, 1000);
				if (!label || !explanation) return null;
				const sourceIds = Array.isArray(record.sourceIds)
					? record.sourceIds
							.map(sourceId => normalizeOptionalObjectId(sourceId))
							.filter((sourceId): sourceId is mongoose.Types.ObjectId => Boolean(sourceId))
					: [];
				return {
					dimension: normalizeEvidenceLandscapeEnum(record.dimension, EVIDENCE_BOUNDARY_DIMENSIONS, "other"),
					label,
					explanation,
					sourceIds
				};
			})
			.filter((item): item is NonNullable<typeof item> => Boolean(item));
	}

	function normalizeEvidenceLandscape(value: unknown, existing?: IClaimEvidenceLandscape): IClaimEvidenceLandscape {
		const record = typeof value === "object" && value ? (value as Record<string, unknown>) : {};
		const flags = typeof record.publicFlags === "object" && record.publicFlags
			? (record.publicFlags as Record<string, unknown>)
			: {};
		const requestedWorkflow = typeof record.workflow === "object" && record.workflow
			? (record.workflow as Record<string, unknown>)
			: {};
		const existingFlags = existing?.publicFlags ?? {
			showEvidenceLandscape: false,
			showCredibleMinorityView: false,
			showFalseBalanceWarning: false,
			medicalOrPublicHealthSensitive: false,
			requiresProfessionalContext: false
		};
		const existingWorkflow = existing?.workflow ?? {
			status: "not_started",
			assignedEditorId: undefined,
			reviewedById: undefined,
			approvedById: undefined,
			lastAssessedAt: undefined,
			nextReviewDueAt: undefined,
			publishedAt: undefined,
			supersededByClaimId: undefined,
			assessedBy: undefined,
			editorialNotes: ""
		};

		return {
			schemaVersion: EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
			claimType: normalizeEvidenceLandscapeEnum(record.claimType, EVIDENCE_CLAIM_TYPES, existing?.claimType ?? "other"),
			supportLabel: normalizeEvidenceLandscapeEnum(
				record.supportLabel,
				EVIDENCE_LANDSCAPE_SUPPORT_LABELS,
				existing?.supportLabel ?? "unresolved"
			),
			supportScore: normalizeLandscapeScore(record.supportScore, existing?.supportScore),
			evidenceDirection: normalizeEvidenceLandscapeEnum(
				record.evidenceDirection,
				EVIDENCE_LANDSCAPE_DIRECTIONS,
				existing?.evidenceDirection ?? "not_applicable"
			),
			evidenceCertainty: normalizeEvidenceLandscapeEnum(
				record.evidenceCertainty,
				EVIDENCE_LANDSCAPE_CERTAINTY_LEVELS,
				existing?.evidenceCertainty ?? "not_assessable"
			),
			expertAgreement: normalizeEvidenceLandscapeEnum(
				record.expertAgreement,
				EVIDENCE_LANDSCAPE_EXPERT_AGREEMENT_LEVELS,
				existing?.expertAgreement ?? "not_assessable"
			),
			plainLanguageAnswer: normalizeEvidenceLandscapeText(
				record,
				"plainLanguageAnswer",
				2000,
				existing?.plainLanguageAnswer
			),
			oneSentenceSummary: normalizeEvidenceLandscapeText(
				record,
				"oneSentenceSummary",
				280,
				existing?.oneSentenceSummary
			),
			confidenceStatement: normalizeEvidenceLandscapeText(
				record,
				"confidenceStatement",
				800,
				existing?.confidenceStatement
			),
			caveatSummary: normalizeEvidenceLandscapeText(record, "caveatSummary", 1600, existing?.caveatSummary),
			disagreementSummary: normalizeEvidenceLandscapeText(
				record,
				"disagreementSummary",
				1600,
				existing?.disagreementSummary
			),
			credibleMinorityViewSummary: normalizeEvidenceLandscapeText(
				record,
				"credibleMinorityViewSummary",
				1200,
				existing?.credibleMinorityViewSummary
			),
			fringeOrUnsupportedViewSummary: normalizeEvidenceLandscapeText(
				record,
				"fringeOrUnsupportedViewSummary",
				1200,
				existing?.fringeOrUnsupportedViewSummary
			),
			whatWouldChangeThis: normalizeEvidenceLandscapeText(
				record,
				"whatWouldChangeThis",
				1200,
				existing?.whatWouldChangeThis
			),
			boundaryConditions: normalizeBoundaryConditions(
				Object.hasOwn(record, "boundaryConditions") ? record.boundaryConditions : undefined,
				existing?.boundaryConditions
			),
			applicability: normalizeLandscapeApplicability(record.applicability, existing?.applicability),
			distribution: normalizeLandscapeDistribution(record.distribution, existing?.distribution),
			evidenceBaseSize: normalizeEvidenceBaseSize(record.evidenceBaseSize, existing?.evidenceBaseSize),
			publicFlags: {
				showEvidenceLandscape: existingFlags.showEvidenceLandscape,
				showCredibleMinorityView: normalizeEvidenceLandscapeBoolean(
					flags.showCredibleMinorityView,
					existingFlags.showCredibleMinorityView
				),
				showFalseBalanceWarning: normalizeEvidenceLandscapeBoolean(
					flags.showFalseBalanceWarning,
					existingFlags.showFalseBalanceWarning
				),
				medicalOrPublicHealthSensitive: normalizeEvidenceLandscapeBoolean(
					flags.medicalOrPublicHealthSensitive,
					existingFlags.medicalOrPublicHealthSensitive
				),
				requiresProfessionalContext: normalizeEvidenceLandscapeBoolean(
					flags.requiresProfessionalContext,
					existingFlags.requiresProfessionalContext
				)
			},
			workflow: {
				status: existingWorkflow.status,
				assignedEditorId: existingWorkflow.assignedEditorId,
				reviewedById: existingWorkflow.reviewedById,
				approvedById: existingWorkflow.approvedById,
				lastAssessedAt: existingWorkflow.lastAssessedAt,
				nextReviewDueAt: existingWorkflow.nextReviewDueAt,
				publishedAt: existingWorkflow.publishedAt,
				supersededByClaimId: existingWorkflow.supersededByClaimId,
				assessedBy: existingWorkflow.assessedBy,
				editorialNotes: normalizeEvidenceLandscapeText(
					requestedWorkflow,
					"editorialNotes",
					2000,
					existingWorkflow.editorialNotes
				)
			}
		};
	}

	function defaultSourceEvidenceProfile(existing?: IClaimSourceEvidenceProfile): IClaimSourceEvidenceProfile {
		return {
			schemaVersion: existing?.schemaVersion ?? EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
			positionRelativeToClaim: existing?.positionRelativeToClaim ?? "not_coded",
			evidenceTier: existing?.evidenceTier ?? "not_coded",
			studyDesign: existing?.studyDesign ?? "not_coded",
			riskOfBias: existing?.riskOfBias ?? "not_assessed",
			directness: existing?.directness ?? "not_assessed",
			consistency: existing?.consistency ?? "not_assessed",
			precision: existing?.precision ?? "not_assessed",
			publicationIntegrity: {
				retracted: existing?.publicationIntegrity?.retracted ?? false,
				expressionOfConcern: existing?.publicationIntegrity?.expressionOfConcern ?? false,
				correctionOrErratum: existing?.publicationIntegrity?.correctionOrErratum ?? false,
				predatoryOrQuestionableVenue: existing?.publicationIntegrity?.predatoryOrQuestionableVenue ?? false,
				citationStatusCheckedAt: existing?.publicationIntegrity?.citationStatusCheckedAt,
				integrityNotes: existing?.publicationIntegrity?.integrityNotes ?? ""
			},
			inclusion: {
				includedInLandscape: existing?.inclusion?.includedInLandscape ?? false,
				exclusionReason: existing?.inclusion?.exclusionReason ?? "",
				exclusionNotes: existing?.inclusion?.exclusionNotes ?? ""
			},
			extraction: {
				keyFinding: existing?.extraction?.keyFinding ?? "",
				limitations: existing?.extraction?.limitations ?? "",
				population: existing?.extraction?.population ?? "",
				exposureOrIntervention: existing?.extraction?.exposureOrIntervention ?? "",
				comparator: existing?.extraction?.comparator ?? "",
				outcomes: existing?.extraction?.outcomes ?? [],
				sampleSize: existing?.extraction?.sampleSize ?? "",
				effectEstimate: {
					metric: existing?.extraction?.effectEstimate?.metric ?? "",
					value: existing?.extraction?.effectEstimate?.value ?? "",
					confidenceInterval: existing?.extraction?.effectEstimate?.confidenceInterval ?? "",
					pValue: existing?.extraction?.effectEstimate?.pValue ?? "",
					notes: existing?.extraction?.effectEstimate?.notes ?? ""
				}
			},
			reviewer: {
				codedById: existing?.reviewer?.codedById,
				codedAt: existing?.reviewer?.codedAt,
				reviewedById: existing?.reviewer?.reviewedById,
				reviewedAt: existing?.reviewer?.reviewedAt,
				notes: existing?.reviewer?.notes ?? ""
			}
		};
	}

	function normalizeSourceEvidenceProfile(
		value: unknown,
		existing?: IClaimSourceEvidenceProfile
	): IClaimSourceEvidenceProfile {
		const defaults = defaultSourceEvidenceProfile(existing);
		const record = typeof value === "object" && value ? (value as Record<string, unknown>) : {};
		const publicationIntegrity = typeof record.publicationIntegrity === "object" && record.publicationIntegrity
			? (record.publicationIntegrity as Record<string, unknown>)
			: {};
		const inclusion = typeof record.inclusion === "object" && record.inclusion
			? (record.inclusion as Record<string, unknown>)
			: {};
		const extraction = typeof record.extraction === "object" && record.extraction
			? (record.extraction as Record<string, unknown>)
			: {};
		const effectEstimate = typeof extraction.effectEstimate === "object" && extraction.effectEstimate
			? (extraction.effectEstimate as Record<string, unknown>)
			: {};
		const reviewer = typeof record.reviewer === "object" && record.reviewer
			? (record.reviewer as Record<string, unknown>)
			: {};

		return {
			schemaVersion: EVIDENCE_LANDSCAPE_SCHEMA_VERSION,
			positionRelativeToClaim: normalizeEvidenceLandscapeEnum(
				record.positionRelativeToClaim,
				EVIDENCE_SOURCE_POSITION_BUCKETS,
				defaults.positionRelativeToClaim
			),
			evidenceTier: normalizeEvidenceLandscapeEnum(record.evidenceTier, EVIDENCE_TIERS, defaults.evidenceTier),
			studyDesign: normalizeEvidenceLandscapeEnum(record.studyDesign, EVIDENCE_STUDY_DESIGNS, defaults.studyDesign),
			riskOfBias: normalizeEvidenceLandscapeEnum(record.riskOfBias, EVIDENCE_RISK_OF_BIAS_LEVELS, defaults.riskOfBias),
			directness: normalizeEvidenceLandscapeEnum(record.directness, EVIDENCE_DIRECTNESS_LEVELS, defaults.directness),
			consistency: normalizeEvidenceLandscapeEnum(record.consistency, EVIDENCE_CONSISTENCY_LEVELS, defaults.consistency),
			precision: normalizeEvidenceLandscapeEnum(record.precision, EVIDENCE_PRECISION_LEVELS, defaults.precision),
			publicationIntegrity: {
				retracted: normalizeEvidenceLandscapeBoolean(
					publicationIntegrity.retracted,
					defaults.publicationIntegrity.retracted
				),
				expressionOfConcern: normalizeEvidenceLandscapeBoolean(
					publicationIntegrity.expressionOfConcern,
					defaults.publicationIntegrity.expressionOfConcern
				),
				correctionOrErratum: normalizeEvidenceLandscapeBoolean(
					publicationIntegrity.correctionOrErratum,
					defaults.publicationIntegrity.correctionOrErratum
				),
				predatoryOrQuestionableVenue: normalizeEvidenceLandscapeBoolean(
					publicationIntegrity.predatoryOrQuestionableVenue,
					defaults.publicationIntegrity.predatoryOrQuestionableVenue
				),
				citationStatusCheckedAt:
					publicationIntegrity.citationStatusCheckedAt === undefined
						? defaults.publicationIntegrity.citationStatusCheckedAt
						: normalizeDate(publicationIntegrity.citationStatusCheckedAt),
				integrityNotes: normalizeEvidenceLandscapeText(
					publicationIntegrity,
					"integrityNotes",
					1000,
					defaults.publicationIntegrity.integrityNotes
				)
			},
			inclusion: {
				includedInLandscape: normalizeEvidenceLandscapeBoolean(
					inclusion.includedInLandscape,
					defaults.inclusion.includedInLandscape
				),
				exclusionReason: normalizeEvidenceLandscapeEnum(
					inclusion.exclusionReason,
					EVIDENCE_SOURCE_EXCLUSION_REASONS,
					defaults.inclusion.exclusionReason
				),
				exclusionNotes: normalizeEvidenceLandscapeText(inclusion, "exclusionNotes", 1000, defaults.inclusion.exclusionNotes)
			},
			extraction: {
				keyFinding: normalizeEvidenceLandscapeText(extraction, "keyFinding", 1000, defaults.extraction.keyFinding),
				limitations: normalizeEvidenceLandscapeText(extraction, "limitations", 1000, defaults.extraction.limitations),
				population: normalizeEvidenceLandscapeText(extraction, "population", 280, defaults.extraction.population),
				exposureOrIntervention: normalizeEvidenceLandscapeText(
					extraction,
					"exposureOrIntervention",
					280,
					defaults.extraction.exposureOrIntervention
				),
				comparator: normalizeEvidenceLandscapeText(extraction, "comparator", 280, defaults.extraction.comparator),
				outcomes: Object.hasOwn(extraction, "outcomes")
					? normalizeList(extraction.outcomes, 12, 180)
					: defaults.extraction.outcomes,
				sampleSize: normalizeEvidenceLandscapeText(extraction, "sampleSize", 120, defaults.extraction.sampleSize),
				effectEstimate: {
					metric: normalizeEvidenceLandscapeText(
						effectEstimate,
						"metric",
						120,
						defaults.extraction.effectEstimate.metric
					),
					value: normalizeEvidenceLandscapeText(
						effectEstimate,
						"value",
						160,
						defaults.extraction.effectEstimate.value
					),
					confidenceInterval: normalizeEvidenceLandscapeText(
						effectEstimate,
						"confidenceInterval",
						160,
						defaults.extraction.effectEstimate.confidenceInterval
					),
					pValue: normalizeEvidenceLandscapeText(
						effectEstimate,
						"pValue",
						80,
						defaults.extraction.effectEstimate.pValue
					),
					notes: normalizeEvidenceLandscapeText(
						effectEstimate,
						"notes",
						500,
						defaults.extraction.effectEstimate.notes
					)
				}
			},
			reviewer: {
				codedById: defaults.reviewer.codedById,
				codedAt: defaults.reviewer.codedAt,
				reviewedById: defaults.reviewer.reviewedById,
				reviewedAt: defaults.reviewer.reviewedAt,
				notes: normalizeEvidenceLandscapeText(reviewer, "notes", 1000, defaults.reviewer.notes)
			}
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

	async function findPublicClaimForTopic(topicId: mongoose.Types.ObjectId, claimSlug: string) {
		const claim = await Claim.findOne({ topic: topicId, slug: claimSlug, status: "published" });
		if (!claim) return null;
		const sources = await loadClaimSources(claim._id);
		return getPublicClaimReadiness(claim.toObject(), summarizeClaimSourceReadiness(sources)).isReady
			? claim
			: null;
	}

	async function loadClaimSources(claimId: mongoose.Types.ObjectId) {
		return ClaimSource.find({ claim: claimId }).sort({ order: 1, createdAt: 1 }).lean();
	}

	function publicClaimSourceCountsFor(
		sourceCountMap: Map<string, PublicClaimSourceReadinessCounts>,
		claimId: unknown
	): PublicClaimSourceReadinessCounts {
		return sourceCountMap.get(String(claimId)) ?? emptyPublicClaimSourceReadinessCounts;
	}

	function publicClaimIsReady(
		claim: Partial<IClaim> & { _id?: unknown },
		sourceCountMap: Map<string, PublicClaimSourceReadinessCounts>
	) {
		return getPublicClaimReadiness(claim, publicClaimSourceCountsFor(sourceCountMap, claim._id)).isReady;
	}

	async function loadClaimSourceReadinessCountMap(claimIds: mongoose.Types.ObjectId[]) {
		if (!claimIds.length) return new Map<string, PublicClaimSourceReadinessCounts>();

		const sources = await ClaimSource.find({ claim: { $in: claimIds } }).lean();
		const sourcesByClaim = new Map<string, typeof sources>();
		for (const source of sources) {
			const key = source.claim.toString();
			sourcesByClaim.set(key, [...(sourcesByClaim.get(key) ?? []), source]);
		}

		const sourceCountMap = new Map<string, PublicClaimSourceReadinessCounts>();
		for (const [claimId, claimSources] of sourcesByClaim) {
			sourceCountMap.set(claimId, summarizeClaimSourceReadiness(claimSources));
		}

		return sourceCountMap;
	}

	async function serializePublicQuestions(questions: Array<Partial<IQuestion>>) {
		const claims = questions.map((question) => {
			const claim = question.claim as unknown as (Partial<IClaim> & { _id?: unknown }) | null | undefined;
			return claim && typeof claim === "object" && claim._id ? claim : null;
		});
		const claimIds = claims
			.map(claim => claim?._id)
			.filter((id): id is mongoose.Types.ObjectId => Boolean(id && mongoose.Types.ObjectId.isValid(String(id))))
			.map(id => new mongoose.Types.ObjectId(String(id)));
		const sourceCountMap = await loadClaimSourceReadinessCountMap(claimIds);

		return questions.map((question, index) => {
			const claim = claims[index];
			return toPublicQuestion(question, {
				claim: claim && publicClaimIsReady(claim, sourceCountMap) ? claim : null
			});
		});
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
					evidenceLandscape: claim.evidenceLandscape,
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

	async function createEvidenceLandscapeReviewEvent(params: {
		claimId: mongoose.Types.ObjectId;
		action:
			| "created"
			| "updated"
			| "submitted_for_review"
			| "changes_requested"
			| "approved"
			| "published"
			| "marked_stale"
			| "superseded"
			| "source_coding_updated"
			| "distribution_recomputed";
		actorId: string;
		actorModel: "User" | "Admin";
		fromStatus?: string;
		toStatus?: string;
		notes?: string;
		changedFields?: string[];
	}) {
		const claim = await Claim.findById(params.claimId).lean();
		if (!claim) return null;
		const sources = await loadClaimSources(params.claimId);
		return EvidenceLandscapeReview.create({
			claimId: params.claimId,
			action: params.action,
			fromStatus: params.fromStatus ?? "",
			toStatus: params.toStatus ?? claim.evidenceLandscape?.workflow?.status ?? "",
			actorId: new mongoose.Types.ObjectId(params.actorId),
			actorModel: params.actorModel,
			notes: normalizeText(params.notes, 2000),
			changedFields: params.changedFields ?? [],
			snapshot: {
				evidenceLandscape: claim.evidenceLandscape ?? null,
				sourceEvidenceProfiles: sources.map(source => ({
					claimSourceId: source._id,
					evidenceProfile: source.evidenceProfile
				}))
			}
		});
	}

	function evidenceLandscapeCadenceMonths(landscape: IClaimEvidenceLandscape) {
		const baseMonths = {
			strong_consensus: 12,
			broad_agreement_with_caveats: 9,
			active_expert_debate: 3,
			thin_evidence: 6,
			unresolved: 6,
			unsupported_fringe: 12
		}[landscape.supportLabel];
		return landscape.publicFlags.medicalOrPublicHealthSensitive ? Math.min(baseMonths, 6) : baseMonths;
	}

	function addMonths(date: Date, months: number) {
		const next = new Date(date);
		next.setMonth(next.getMonth() + months);
		return next;
	}

	function evidenceLandscapeTextLength(value?: string) {
		return (value ?? "").trim().length;
	}

	function validateEvidenceLandscapeForSubmit(
		claim: Pick<IClaim, "evidenceLandscape">,
		sources: Awaited<ReturnType<typeof loadClaimSources>>
	) {
		const errors: string[] = [];
		const landscape = claim.evidenceLandscape;
		const includedSources = sources.filter(source => source.evidenceProfile.inclusion.includedInLandscape);
		const excludedSources = sources.filter(source => sourceIsExcludedEvidenceCard(source));

		if (evidenceLandscapeTextLength(landscape.plainLanguageAnswer) < 40) {
			errors.push("Plain-language answer must be at least 40 characters.");
		}
		if (evidenceLandscapeTextLength(landscape.oneSentenceSummary) < 40) {
			errors.push("One-sentence summary must be at least 40 characters.");
		}
		if (evidenceLandscapeTextLength(landscape.confidenceStatement) < 40) {
			errors.push("Confidence statement must be at least 40 characters.");
		}
		if (landscape.supportLabel !== "unsupported_fringe" && includedSources.length === 0) {
			errors.push("At least one source must be included in the landscape before review.");
		}
		if (
			includedSources.some(source =>
				source.evidenceProfile.positionRelativeToClaim === "not_coded"
				|| source.evidenceProfile.evidenceTier === "not_coded"
				|| source.evidenceProfile.studyDesign === "not_coded"
			)
		) {
			errors.push("Included sources must have position, evidence tier, and study design coded.");
		}
		if (excludedSources.some(source => !source.evidenceProfile.inclusion.exclusionReason)) {
			errors.push("Excluded sources must include an exclusion reason.");
		}

		return errors;
	}

	async function validateEvidenceLandscapeForApproval(claim: IClaim, sources: Awaited<ReturnType<typeof loadClaimSources>>) {
		const errors = validateEvidenceLandscapeForSubmit(claim, sources);
		const landscape = claim.evidenceLandscape;

		if (landscape.workflow.status !== "ready_for_review") {
			errors.push("Evidence landscape must be ready for review before approval.");
		}
		if (
			landscape.supportLabel === "strong_consensus"
			&& (landscape.evidenceCertainty === "very_low" || landscape.evidenceCertainty === "not_assessable")
		) {
			errors.push("Strong consensus cannot use very low or not-assessable evidence certainty.");
		}
		if (
			landscape.supportLabel === "unsupported_fringe"
			&& !["mostly_opposes_claim", "strongly_opposes_claim"].includes(landscape.evidenceDirection)
		) {
			errors.push("Unsupported/fringe claims must mostly or strongly oppose the assessed claim.");
		}
		if (landscape.publicFlags.showCredibleMinorityView && !landscape.credibleMinorityViewSummary?.trim()) {
			errors.push("Credible minority view summary is required when the public flag is on.");
		}
		if (landscape.supportLabel === "unsupported_fringe" && !landscape.fringeOrUnsupportedViewSummary?.trim()) {
			errors.push("Unsupported/fringe claims require an unsupported-view summary.");
		}
		if (landscape.publicFlags.medicalOrPublicHealthSensitive && !landscape.publicFlags.requiresProfessionalContext) {
			errors.push("Medical or public-health-sensitive claims require professional context review.");
		}

		const [latestSourceCoding, latestRecompute] = await Promise.all([
			EvidenceLandscapeReview.findOne({ claimId: claim._id, action: "source_coding_updated" })
				.sort({ createdAt: -1 })
				.lean(),
			EvidenceLandscapeReview.findOne({ claimId: claim._id, action: "distribution_recomputed" })
				.sort({ createdAt: -1 })
				.lean()
		]);
		if (
			latestSourceCoding?.createdAt
			&& (!latestRecompute?.createdAt || latestRecompute.createdAt < latestSourceCoding.createdAt)
		) {
			errors.push("Distribution must be recomputed after the latest source-coding update.");
		}

		return errors;
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
				return res.json({ topics: topics.map(toPublicTopic) });
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
				const sourceCountMap = await loadClaimSourceReadinessCountMap(publishedClaims.map(claim => claim._id));
				const publicReadyClaims = publishedClaims.filter(claim => publicClaimIsReady(claim, sourceCountMap));
				claimCountMap = publicReadyClaims.reduce((map, claim) => {
					const key = claim.topic.toString();
					map.set(key, (map.get(key) ?? 0) + 1);
					return map;
				}, new Map<string, number>());
				featuredClaimsMap = publicReadyClaims.reduce((map, claim) => {
					const key = claim.topic.toString();
					const current = map.get(key) ?? [];
					if (current.length < 3) {
						const sourceCounts = publicClaimSourceCountsFor(sourceCountMap, claim._id);
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
							evidenceLandscape: toPublicEvidenceLandscape(claim),
							sourceCount: sourceCounts.sourceCount,
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
					...toPublicTopic(topic),
					questionCount: countMap.get(key) ?? 0,
					claimCount: includeClaims ? (claimCountMap.get(key) ?? 0) : undefined,
					featuredClaims: includeClaims ? (featuredClaimsMap.get(key) ?? []) : undefined
				};
			});

			return res.json({ topics: topicsWithCounts });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to load topics." });
		}
	});

	api.get("/topics/:slug", async (req, res) => {
		try {
			const topic = await Topic.findOne({ slug: req.params.slug }).lean();
			if (!topic) return res.status(404).json({ error: "Topic not found." });

			if (req.query.includeClaims !== "true") {
				return res.json({ topic: toPublicTopic(topic) });
			}

			const featuredClaims = await Claim.find({ topic: topic._id, status: "published" })
				.sort({ lastReviewedAt: -1, publishedAt: -1, title: 1 })
				.lean();
			const sourceCountMap = await loadClaimSourceReadinessCountMap(featuredClaims.map(claim => claim._id));
			const publicReadyClaims = featuredClaims.filter(claim => publicClaimIsReady(claim, sourceCountMap));
			return res.json({
				topic: {
					...toPublicTopic(topic),
					claimCount: publicReadyClaims.length,
					featuredClaims: publicReadyClaims.slice(0, 5).map(claim => toPublicClaim(claim, {
						sourceCount: publicClaimSourceCountsFor(sourceCountMap, claim._id).sourceCount,
						topic
					}))
				}
			});
		}
		catch (error) {
			logError("API request failed", error);
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
			const sourceCountMap = await loadClaimSourceReadinessCountMap(claims.map(claim => claim._id));
			const publicReadyClaims = claims.filter(claim => publicClaimIsReady(claim, sourceCountMap));

			return res.json({
				claims: publicReadyClaims.map(claim => toPublicClaim(claim, {
					sourceCount: publicClaimSourceCountsFor(sourceCountMap, claim._id).sourceCount,
					topic: topic.toObject()
				}))
			});
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to load claims." });
		}
	});

	api.get("/claims", async (req, res) => {
		try {
			const query = normalizeText(req.query.q, 160).toLowerCase();
			const topicSlug = normalizeText(req.query.topic, 80);
			const requestedBand = normalizeText(req.query.consensusBand, 24);
			const consensusBand = ["strong", "broad", "mixed", "unclear"].includes(requestedBand)
				? (requestedBand as ClaimConsensusBand)
				: "";
			const page = normalizeInteger(req.query.page, 1, 10_000, 1);
			const pageSize = normalizeInteger(req.query.limit, 1, 500, 24);

			const filter: QueryFilter<IClaim> = { status: "published" };
			if (consensusBand) filter.consensusBand = consensusBand;
			if (topicSlug) {
				const topic = await Topic.findOne({ slug: topicSlug }).select("_id").lean();
				if (!topic) return res.status(404).json({ error: "Topic not found." });
				filter.topic = topic._id;
			}

			const claims = await Claim.find(filter).populate("topic").lean();
			const sourceCountMap = await loadClaimSourceReadinessCountMap(claims.map(claim => claim._id));
			const publicReadyClaims = claims.filter(claim => publicClaimIsReady(claim, sourceCountMap));
			const rankedClaims = publicReadyClaims
				.map((claim) => {
					const topic = claim.topic && typeof claim.topic === "object" && "slug" in claim.topic
						? claim.topic
						: null;
					const haystack = [
						claim.title,
						claim.bottomLine,
						claim.editorSummary,
						...(claim.misconceptions || []),
						...(claim.misconceptionTags || []),
						topic?.title ?? "",
						topic?.description ?? ""
					]
						.join(" ")
						.trim();

					return {
						claim,
						match: query
							? analyzeMatch(query, haystack)
							: {
									matchReason: "",
									matchScore: 0
								},
						topic
					};
				})
				.filter(entry => !query || entry.match.matchScore > 0)
				.sort((left, right) => {
					if (query && left.match.matchScore !== right.match.matchScore) {
						return right.match.matchScore - left.match.matchScore;
					}
					return (
						(left.topic?.title ?? "").localeCompare(right.topic?.title ?? "")
						|| left.claim.title.localeCompare(right.claim.title)
					);
				});

			const total = rankedClaims.length;
			const totalPages = Math.max(Math.ceil(total / pageSize), 1);
			const boundedPage = Math.min(page, totalPages);
			const start = (boundedPage - 1) * pageSize;
			const claimsPage = rankedClaims.slice(start, start + pageSize).map(({ claim, match, topic }) => ({
				_id: claim._id,
				title: claim.title,
				slug: claim.slug,
				status: claim.status,
				consensusBand: claim.consensusBand,
				agreementLevel: claim.agreementLevel,
				evidenceCertainty: claim.evidenceCertainty,
				confidenceScore: claim.confidenceScore,
				reviewMode: claim.reviewMode,
				bottomLine: claim.bottomLine,
				sourceCount: publicClaimSourceCountsFor(sourceCountMap, claim._id).sourceCount,
				searchCutoffAt: claim.searchCutoffAt,
				lastReviewedAt: claim.lastReviewedAt,
				publishedAt: claim.publishedAt,
				lastRetractionCheckAt: claim.lastRetractionCheckAt,
				matchReason: match.matchReason || undefined,
				matchScore: query ? match.matchScore : undefined,
				topic: topic
					? {
							_id: topic._id,
							title: topic.title,
							slug: topic.slug,
							description: topic.description,
							accent: topic.accent
						}
					: null
			}));

			return res.json({
				claims: claimsPage,
				pagination: {
					page: boundedPage,
					pageSize,
					total,
					totalPages,
					hasMore: boundedPage < totalPages
				}
			});
		}
		catch (error) {
			logError("API request failed", error);
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
			const sourceCounts = summarizeClaimSourceReadiness(sources);
			if (!getPublicClaimReadiness(claim, sourceCounts).isReady) {
				return res.status(404).json({ error: "Claim not found." });
			}
			return res.json({
				claim: toPublicClaim(claim, {
					sourceCount: sourceCounts.sourceCount,
					topic: topic.toObject(),
					sources
				})
			});
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to load claim." });
		}
	});

	api.get("/claims/:claimSlug/evidence-landscape/sources", async (req, res) => {
		try {
			const claimSlug = typeof req.params.claimSlug === "string" ? req.params.claimSlug : "";
			const claim = await Claim.findOne({ slug: claimSlug, status: "published" }).lean();
			if (!claim || !toPublicEvidenceLandscape(claim)) {
				return res.status(404).json({ error: "Evidence landscape not found." });
			}

			const includeExcluded = req.query.includeExcluded === "true";
			const position = validEvidenceSourcePosition(req.query.position) ? req.query.position : "";
			const tier = validEvidenceTier(req.query.tier) ? req.query.tier : "";
			const studyDesign = validEvidenceStudyDesign(req.query.studyDesign) ? req.query.studyDesign : "";
			const sources = await loadClaimSources(claim._id);
			const filteredSources = sources.filter((source) => {
				if (position && source.evidenceProfile.positionRelativeToClaim !== position) return false;
				if (tier && source.evidenceProfile.evidenceTier !== tier) return false;
				if (studyDesign && source.evidenceProfile.studyDesign !== studyDesign) return false;
				if (includeExcluded) return sourceIsPublicEvidenceCard(source) || sourceIsExcludedEvidenceCard(source);
				return sourceIsPublicEvidenceCard(source);
			});

			return res.json({
				claim: {
					id: claim._id,
					title: claim.title,
					slug: claim.slug
				},
				sources: filteredSources.map(source => toPublicEvidenceSourceCard(source))
			});
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to load evidence landscape sources." });
		}
	});

	api.get("/topics/:slug/sentiment", optionalAuth, async (req, res) => {
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
				currentVote: toPublicTopicSentimentVote(currentVote)
			});
		}
		catch (error) {
			logError("API request failed", error);
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

			return res.json({ vote: toPublicTopicSentimentVote(vote) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to save sentiment." });
		}
	});

	api.post("/topics", requireAdmin, async (req, res) => {
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
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to create topic." });
		}
	});

	api.get("/search/suggestions", searchSuggestionLimiter, async (req, res) => {
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
			const sourceCountMap = await loadClaimSourceReadinessCountMap(claims.map(claim => claim._id));
			const publicReadyClaims = claims.filter(claim => publicClaimIsReady(claim, sourceCountMap));

			const rankedClaims = publicReadyClaims
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
					...toPublicQuestion(question),
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
			logError("API request failed", error);
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

			const filter: QueryFilter<IQuestion> = {
				status: { $ne: "archived" },
				routingStatus: { $ne: "duplicate" }
			};
			if (topicSlug) {
				const topic = await Topic.findOne({ slug: topicSlug });
				if (!topic) return res.status(404).json({ error: "Topic not found." });
				filter.topic = topic._id;

				if (claimSlug) {
					const claim = await findPublicClaimForTopic(topic._id, claimSlug);
					if (!claim) return res.status(404).json({ error: "Claim not found." });
					filter.claim = claim._id;
					filter.routingStatus = "linked";
				}
				else if (!routingStatus) {
					filter.routingStatus = "unassigned";
				}
			}

			if (isQuestionRoutingStatus(routingStatus) && routingStatus !== "duplicate") {
				filter.routingStatus = routingStatus;
			}

			const questions = await Question.find(filter)
				.sort({ createdAt: -1 })
				.limit(limit)
				.populate("topic")
				.populate("claim")
				.lean();

			return res.json({ questions: await serializePublicQuestions(questions) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to load questions." });
		}
	});

	api.get("/questions/:id", async (req, res) => {
		try {
			if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
				return res.status(400).json({ error: "Invalid question id." });
			}
			const question = await Question.findOne({
				_id: req.params.id,
				status: { $ne: "archived" },
				routingStatus: { $ne: "duplicate" }
			}).populate("topic").populate("claim").lean();
			if (!question) return res.status(404).json({ error: "Question not found." });
			const [publicQuestion] = await serializePublicQuestions([question]);
			return res.json({ question: publicQuestion });
		}
		catch (error) {
			logError("API request failed", error);
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
			let sourceUrl = "";
			try {
				sourceUrl = normalizeHttpUrl(req.body?.sourceUrl, 500);
			}
			catch (error) {
				return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid source URL." });
			}
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

			let claim: Awaited<ReturnType<typeof findPublicClaimForTopic>> | null = null;
			if (claimSlug) {
				claim = await findPublicClaimForTopic(topic._id, claimSlug);
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
			const [publicQuestion] = populated ? await serializePublicQuestions([populated]) : [null];
			return res.status(201).json({ question: publicQuestion });
		}
		catch (error) {
			logError("API request failed", error);
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
			if (question.status === "archived") {
				return res.status(409).json({ error: "This question has already been removed." });
			}

			const actor = currentActor(req);
			const isOwner = question.author?.toString() === actor.id && question.authorModel === actor.model;
			const isAdmin = actor.model === "Admin";

			if (!isOwner && !isAdmin) {
				return res.status(403).json({ error: "Not authorized to delete this question." });
			}
			const moderationReason = normalizeText(req.body?.moderationReason, 500);
			if (isAdmin && !isOwner && !moderationReason) {
				return res.status(400).json({ error: "A moderation reason is required to remove another account's question." });
			}

			const previousRoutingStatus = question.routingStatus || "unassigned";
			const previousStatus = question.status || "open";
			question.title = "Removed question";
			question.normalizedQuestion = "";
			question.body = "";
			question.sourceUrl = "";
			question.sourceContextType = "other";
			question.displayName = "";
			question.author = undefined;
			question.authorModel = undefined;
			question.authorName = "";
			question.linkedBy = undefined;
			question.closestMatchLabel = "";
			question.differenceNote = "";
			question.status = "archived";
			await question.save();
			await recordAccountActivity({
				req,
				action: "question.deleted",
				actor: {
					id: actor.id,
					type: actor.model === "Admin" ? "admin" : "user"
				},
				target: {
					id: question._id.toString(),
					type: "question"
				},
				metadata: {
					...(moderationReason ? { moderationReason } : {}),
					ownerDelete: String(isOwner),
					preservedModerationFlags: "true",
					previousRoutingStatus,
					previousStatus
				}
			});
			return res.sendStatus(204);
		}
		catch (error) {
			logError("API request failed", error);
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
			const flagIdentity = {
				question: question._id,
				reporter: actor.id,
				reporterModel: actor.model
			};
			const upsertResult = await QuestionFlag.updateOne(
				flagIdentity,
				{
					$set: {
						reporterName: actor.name,
						reason,
						note,
						status: "open",
						reviewNote: "",
						reviewedBy: undefined,
						reviewedAt: undefined
					},
					$setOnInsert: flagIdentity
				},
				{ upsert: true }
			);
			const flag = await QuestionFlag.findOne(flagIdentity).lean();

			if (actor.model === "User" && upsertResult.upsertedCount === 1) {
				await User.findByIdAndUpdate(actor.id, { $inc: { trustScore: 1 } });
			}

			return res.status(201).json({ flag: toReporterQuestionFlag(flag) });
		}
		catch (error) {
			logError("API request failed", error);
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
			return res.json({ application: toApplicantExpertApplication(application) });
		}
		catch (error) {
			logError("API request failed", error);
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
			let evidenceLinks: string[];
			try {
				evidenceLinks = normalizeHttpUrlList(req.body?.evidenceLinks, 8, 300);
			}
			catch (error) {
				return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid evidence URL." });
			}
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
			await recordAccountActivity({
				req,
				action: "expert_application.created",
				actor: {
					id: user._id.toString(),
					type: "user"
				},
				target: {
					id: application._id.toString(),
					type: "expert_application",
					email: user.email
				},
				metadata: {
					expertiseAreas: expertiseAreas.join(", "),
					source: "account_workspace"
				}
			});

			return res.status(201).json({ application: toApplicantExpertApplication(application) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to submit expert application." });
		}
	});

	api.get("/evidence/search", evidenceSearchLimiter, async (req, res) => {
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
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to search evidence sources." });
		}
	});

	api.get("/editorial/claims", requireEditorial, async (req, res) => {
		try {
			const status = typeof req.query.status === "string" ? req.query.status : "";
			const filter: QueryFilter<IClaim> = isClaimStatus(status) ? { status } : {};
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
				claims: claims
					.map(claim =>
						toEditorialClaim({
							...claim,
							sourceCount: sourceCountMap.get(claim._id.toString())?.count ?? 0,
							flaggedSourceCount: sourceCountMap.get(claim._id.toString())?.flaggedCount ?? 0,
							retractedSourceCount: sourceCountMap.get(claim._id.toString())?.retractedCount ?? 0,
							correctedSourceCount: sourceCountMap.get(claim._id.toString())?.correctedCount ?? 0,
							concernSourceCount: sourceCountMap.get(claim._id.toString())?.concernCount ?? 0
						})
					)
					.filter(Boolean)
			});
		}
		catch (error) {
			logError("API request failed", error);
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
			return res.json({ claim: toEditorialClaim({ ...claim, sources }) });
		}
		catch (error) {
			logError("API request failed", error);
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
				status: "draft",
				consensusBand: normalizeConsensusBand(req.body?.consensusBand),
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
				evidenceLandscape: normalizeEvidenceLandscape(req.body?.evidenceLandscape),
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
			return res.status(201).json({ claim: toEditorialClaim(populated) });
		}
		catch (error) {
			logError("API request failed", error);
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
			if (!requireClaimMutationAccess(req, res, claim)) return;
			if (req.body?.status !== undefined) {
				return res.status(400).json({ error: "Use the publish or archive workflow to change claim status." });
			}

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

			if (req.body?.consensusBand !== undefined) {
				claim.consensusBand = normalizeConsensusBand(req.body?.consensusBand);
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
			if (req.body?.evidenceLandscape !== undefined) {
				claim.evidenceLandscape = normalizeEvidenceLandscape(req.body?.evidenceLandscape, claim.evidenceLandscape);
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
			invalidateEvidenceLandscapeApproval(claim);

			await claim.save();

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: revisionSummary
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: toEditorialClaim(populated) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to update claim." });
		}
	});

	api.post("/editorial/claims/:id/publish", requireAdmin, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!claimWorkflowTransitionAllowed(claim.status, "publish")) {
				return res.status(409).json({
					error: "Only draft or needs-update claims can be published."
				});
			}
			const revisionNote = normalizeText(req.body?.revisionNote, 2000);
			if (claim.status === "needs_update" && !revisionNote) {
				return res.status(400).json({ error: "A public update summary is required before republication." });
			}
			const publicationSummary = revisionNote || "Published claim.";

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
				publicationSummary
			);
			const sources = await loadClaimSources(claim._id);
			const readiness = getPublicClaimReadiness(claim.toObject(), summarizeClaimSourceReadiness(sources));
			if (!readiness.isReady) {
				return res.status(422).json({
					error: "Claim is not ready for publication.",
					validationErrors: readiness.missing
				});
			}
			await claim.save();

			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: publicationSummary
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: toEditorialClaim(populated) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to publish claim." });
		}
	});

	api.post("/editorial/claims/:id/review", requireAdmin, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!claimWorkflowTransitionAllowed(claim.status, "review")) {
				return res.status(409).json({ error: "Only published claims can receive a completed review." });
			}
			const revisionNote = normalizeText(req.body?.revisionNote, 2000);
			if (!revisionNote) {
				return res.status(400).json({ error: "A public review summary is required." });
			}

			const reviewedAt = normalizeDate(req.body?.lastReviewedAt) || new Date();
			claim.lastReviewedAt = reviewedAt;
			claim.nextReviewAt
				= normalizeDate(req.body?.nextReviewAt) || new Date(reviewedAt.getTime() + 180 * 24 * 60 * 60 * 1000);
			claim.reviewedBy = new mongoose.Types.ObjectId(currentActor(req).id);
			appendClaimChangeLog(claim, "review", revisionNote);
			const sources = await loadClaimSources(claim._id);
			const readiness = getPublicClaimReadiness(claim.toObject(), summarizeClaimSourceReadiness(sources));
			if (!readiness.isReady) {
				return res.status(422).json({
					error: "Claim is not ready to remain published.",
					validationErrors: readiness.missing
				});
			}
			await claim.save();

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: revisionNote
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: toEditorialClaim(populated) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to record claim review." });
		}
	});

	api.post("/editorial/claims/:id/request-update", requireAdmin, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!claimWorkflowTransitionAllowed(claim.status, "request_update")) {
				return res.status(409).json({ error: "Only published claims can be marked as needing an update." });
			}
			const revisionNote = normalizeText(req.body?.revisionNote, 2000);
			if (!revisionNote) {
				return res.status(400).json({ error: "A public update rationale is required." });
			}

			claim.status = "needs_update";
			appendClaimChangeLog(claim, "update", revisionNote);
			await claim.save();

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: revisionNote
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: toEditorialClaim(populated) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to mark claim for update." });
		}
	});

	api.post("/editorial/claims/:id/restore-draft", requireAdmin, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!claimWorkflowTransitionAllowed(claim.status, "restore_draft")) {
				return res.status(409).json({
					error: "Only archived or needs-update claims can be restored to draft."
				});
			}
			const revisionNote = normalizeText(req.body?.revisionNote, 2000);
			if (!revisionNote) {
				return res.status(400).json({ error: "A public restoration rationale is required." });
			}

			claim.status = "draft";
			appendClaimChangeLog(claim, "update", revisionNote);
			await claim.save();

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: revisionNote
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: toEditorialClaim(populated) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to restore claim draft." });
		}
	});

	api.post("/editorial/claims/:id/archive", requireAdmin, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!claimWorkflowTransitionAllowed(claim.status, "archive")) {
				return res.status(409).json({ error: "The claim is already archived." });
			}
			const revisionNote = normalizeText(req.body?.revisionNote, 2000);
			if (!revisionNote) {
				return res.status(400).json({ error: "A public archival rationale is required." });
			}

			const actor = currentActor(req);
			claim.status = "archived";
			appendClaimChangeLog(claim, "update", revisionNote);
			await claim.save();

			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: revisionNote
			});

			const populated = await Claim.findById(claim._id).populate("topic").lean();
			return res.json({ claim: toEditorialClaim(populated) });
		}
		catch (error) {
			logError("API request failed", error);
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
			return res.json({
				revisions: revisions.map(toEditorialClaimRevision).filter(Boolean)
			});
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to load claim revisions." });
		}
	});

	api.get("/editorial/claims/:id/evidence-landscape", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId).lean();
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			const [sources, reviewHistory] = await Promise.all([
				loadClaimSources(claim._id),
				EvidenceLandscapeReview.find({ claimId: claim._id }).sort({ createdAt: -1 }).limit(50).lean()
			]);

			return res.json({
				claim: {
					id: claim._id,
					title: claim.title,
					evidenceLandscape: toEditorialEvidenceLandscape(claim.evidenceLandscape)
				},
				sources: sources.map(toEditorialClaimSource).filter(Boolean),
				reviewHistory: reviewHistory.map(toEditorialEvidenceReview).filter(Boolean)
			});
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to load evidence landscape." });
		}
	});

	api.patch("/editorial/claims/:id/evidence-landscape", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!requireClaimMutationAccess(req, res, claim)) return;

			const fromStatus = claim.evidenceLandscape.workflow.status;
			claim.evidenceLandscape = normalizeEvidenceLandscape(req.body, claim.evidenceLandscape);
			invalidateEvidenceLandscapeApproval(claim);
			await claim.save();

			const actor = currentActor(req);
			await createEvidenceLandscapeReviewEvent({
				claimId: claim._id,
				action: "updated",
				actorId: actor.id,
				actorModel: actor.model,
				fromStatus,
				toStatus: claim.evidenceLandscape.workflow.status,
				notes: normalizeText(req.body?.notes, 2000),
				changedFields: Object.keys(typeof req.body === "object" && req.body ? req.body : {})
			});

			return res.json({ claim: toEditorialClaim(claim.toObject()) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to update evidence landscape." });
		}
	});

	api.patch("/editorial/claim-sources/:sourceId/evidence-profile", requireEditorial, async (req, res) => {
		try {
			const sourceId = typeof req.params.sourceId === "string" ? req.params.sourceId : "";
			if (!mongoose.Types.ObjectId.isValid(sourceId)) {
				return res.status(400).json({ error: "Invalid source id." });
			}

			const source = await ClaimSource.findById(sourceId);
			if (!source) return res.status(404).json({ error: "Source not found." });
			const claim = await Claim.findById(source.claim);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!requireClaimMutationAccess(req, res, claim)) return;

			const actor = currentActor(req);
			const fromStatus = claim.evidenceLandscape.workflow.status;
			source.evidenceProfile = normalizeSourceEvidenceProfile(req.body, source.evidenceProfile);
			source.evidenceProfile.reviewer.codedById = new mongoose.Types.ObjectId(actor.id);
			source.evidenceProfile.reviewer.codedAt = new Date();
			source.evidenceProfile.reviewer.reviewedById = undefined;
			source.evidenceProfile.reviewer.reviewedAt = undefined;
			await source.save();

			invalidateEvidenceLandscapeApproval(claim);
			await claim.save();

			await createEvidenceLandscapeReviewEvent({
				claimId: claim._id,
				action: "source_coding_updated",
				actorId: actor.id,
				actorModel: actor.model,
				fromStatus,
				toStatus: claim.evidenceLandscape.workflow.status,
				changedFields: Object.keys(typeof req.body === "object" && req.body ? req.body : {})
			});

			return res.json({ source: toEditorialClaimSource(source.toObject()) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to update source evidence profile." });
		}
	});

	api.post("/editorial/claims/:id/evidence-landscape/recompute", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!requireClaimMutationAccess(req, res, claim)) return;
			const sources = await loadClaimSources(claim._id);
			const recomputed = recomputeEvidenceLandscapeFromSources(sources);
			const fromStatus = claim.evidenceLandscape.workflow.status;
			claim.evidenceLandscape.distribution = recomputed.distribution;
			claim.evidenceLandscape.evidenceBaseSize = recomputed.evidenceBaseSize;
			invalidateEvidenceLandscapeApproval(claim);
			await claim.save();

			const actor = currentActor(req);
			await createEvidenceLandscapeReviewEvent({
				claimId: claim._id,
				action: "distribution_recomputed",
				actorId: actor.id,
				actorModel: actor.model,
				fromStatus,
				toStatus: claim.evidenceLandscape.workflow.status,
				changedFields: ["distribution", "evidenceBaseSize"]
			});

			return res.json({ evidenceLandscape: toEditorialEvidenceLandscape(claim.evidenceLandscape) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to recompute evidence landscape." });
		}
	});

	api.post("/editorial/claims/:id/evidence-landscape/submit-review", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!requireClaimMutationAccess(req, res, claim)) return;
			const fromStatus = claim.evidenceLandscape.workflow.status;
			if (!["not_started", "draft", "changes_requested"].includes(fromStatus)) {
				return res.status(409).json({
					error: "Only a draft or changes-requested evidence landscape can be submitted for review."
				});
			}
			const sources = await loadClaimSources(claim._id);
			const validationErrors = validateEvidenceLandscapeForSubmit(claim, sources);
			if (validationErrors.length) {
				return res.status(422).json({ error: "Evidence landscape is not ready for review.", validationErrors });
			}

			const actor = currentActor(req);
			claim.evidenceLandscape.workflow.status = "ready_for_review";
			claim.evidenceLandscape.workflow.assignedEditorId = new mongoose.Types.ObjectId(actor.id);
			await claim.save();

			await createEvidenceLandscapeReviewEvent({
				claimId: claim._id,
				action: "submitted_for_review",
				actorId: actor.id,
				actorModel: actor.model,
				fromStatus,
				toStatus: "ready_for_review",
				notes: normalizeText(req.body?.notes, 2000)
			});

			return res.json({ evidenceLandscape: toEditorialEvidenceLandscape(claim.evidenceLandscape) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to submit evidence landscape for review." });
		}
	});

	api.post("/editorial/claims/:id/evidence-landscape/request-changes", requireAdmin, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (claim.status !== "draft" && claim.status !== "needs_update") {
				return res.status(409).json({
					error: "Move the claim into the update workflow before requesting evidence landscape changes."
				});
			}
			const fromStatus = claim.evidenceLandscape.workflow.status;
			if (fromStatus !== "ready_for_review" && fromStatus !== "approved") {
				return res.status(409).json({
					error: "Changes can be requested only from a ready-for-review or approved landscape."
				});
			}
			const notes = normalizeText(req.body?.notes, 2000);
			if (!notes) {
				return res.status(400).json({ error: "A private change-request note is required." });
			}

			const actor = currentActor(req);
			claim.evidenceLandscape.workflow.status = "changes_requested";
			claim.evidenceLandscape.workflow.reviewedById = new mongoose.Types.ObjectId(actor.id);
			claim.evidenceLandscape.workflow.approvedById = undefined;
			await claim.save();

			await createEvidenceLandscapeReviewEvent({
				claimId: claim._id,
				action: "changes_requested",
				actorId: actor.id,
				actorModel: actor.model,
				fromStatus,
				toStatus: "changes_requested",
				notes
			});

			return res.json({ evidenceLandscape: toEditorialEvidenceLandscape(claim.evidenceLandscape) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to request evidence landscape changes." });
		}
	});

	api.post("/editorial/claims/:id/evidence-landscape/approve", requireAdmin, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			const sources = await loadClaimSources(claim._id);
			const validationErrors = await validateEvidenceLandscapeForApproval(claim.toObject(), sources);
			if (validationErrors.length) {
				return res.status(422).json({ error: "Evidence landscape is not ready for approval.", validationErrors });
			}

			const actor = currentActor(req);
			const now = new Date();
			const fromStatus = claim.evidenceLandscape.workflow.status;
			claim.evidenceLandscape.workflow.status = "approved";
			claim.evidenceLandscape.workflow.reviewedById = new mongoose.Types.ObjectId(actor.id);
			claim.evidenceLandscape.workflow.approvedById = new mongoose.Types.ObjectId(actor.id);
			claim.evidenceLandscape.workflow.lastAssessedAt = now;
			claim.evidenceLandscape.workflow.nextReviewDueAt = addMonths(
				now,
				evidenceLandscapeCadenceMonths(claim.evidenceLandscape)
			);
			await claim.save();

			await createEvidenceLandscapeReviewEvent({
				claimId: claim._id,
				action: "approved",
				actorId: actor.id,
				actorModel: actor.model,
				fromStatus,
				toStatus: "approved",
				notes: normalizeText(req.body?.notes, 2000)
			});

			return res.json({ evidenceLandscape: toEditorialEvidenceLandscape(claim.evidenceLandscape) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to approve evidence landscape." });
		}
	});

	api.post("/editorial/claims/:id/evidence-landscape/publish", requireAdmin, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (claim.evidenceLandscape.workflow.status !== "approved") {
				return res.status(422).json({ error: "Evidence landscape must be approved before publication." });
			}

			if (claim.evidenceLandscape.publicFlags.showCredibleMinorityView && !claim.evidenceLandscape.credibleMinorityViewSummary?.trim()) {
				return res.status(422).json({ error: "Credible minority view summary is required before publication." });
			}
			if (
				claim.evidenceLandscape.publicFlags.medicalOrPublicHealthSensitive
				&& !claim.evidenceLandscape.publicFlags.requiresProfessionalContext
			) {
				return res.status(422).json({ error: "Professional context review is required before publication." });
			}

			const actor = currentActor(req);
			const fromStatus = claim.evidenceLandscape.workflow.status;
			claim.evidenceLandscape.workflow.status = "published";
			claim.evidenceLandscape.workflow.publishedAt = new Date();
			claim.evidenceLandscape.publicFlags.showEvidenceLandscape = true;
			await claim.save();

			await createEvidenceLandscapeReviewEvent({
				claimId: claim._id,
				action: "published",
				actorId: actor.id,
				actorModel: actor.model,
				fromStatus,
				toStatus: "published",
				notes: normalizeText(req.body?.notes, 2000)
			});

			return res.json({ evidenceLandscape: toEditorialEvidenceLandscape(claim.evidenceLandscape) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to publish evidence landscape." });
		}
	});

	api.get("/editorial/claims/:id/sources", requireEditorial, async (req, res) => {
		try {
			const claimId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(claimId)) {
				return res.status(400).json({ error: "Invalid claim id." });
			}
			const sources = await loadClaimSources(new mongoose.Types.ObjectId(claimId));
			return res.json({ sources: sources.map(toEditorialClaimSource).filter(Boolean) });
		}
		catch (error) {
			logError("API request failed", error);
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
			if (!requireClaimMutationAccess(req, res, claim)) return;
			const sourceTitle = normalizeText(req.body?.title, CLAIM_SOURCE_TITLE_MAX_LENGTH);
			if (!sourceTitle) return res.status(400).json({ error: "Source title is required." });

			let sourceUrl = "";
			try {
				sourceUrl = normalizeHttpUrl(req.body?.url, 500);
			}
			catch (error) {
				return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid source URL." });
			}

			let statusSources: string[];
			try {
				statusSources = normalizeHttpUrlList(req.body?.statusSources, 6, 500);
			}
			catch (error) {
				return res.status(400).json({
					error: error instanceof Error ? error.message : "Invalid integrity signal URL."
				});
			}

			const source = await ClaimSource.create({
				claim: claim._id,
				kind: normalizeClaimSourceKind(req.body?.kind),
				title: sourceTitle,
				publisher: normalizeText(req.body?.publisher, 160),
				year: req.body?.year
					? normalizeInteger(req.body?.year, 0, 9999, new Date().getUTCFullYear())
					: undefined,
				url: sourceUrl,
				doi: normalizeText(req.body?.doi, 200),
				pmid: normalizeText(req.body?.pmid, 40),
				pmcid: normalizeText(req.body?.pmcid, 40),
				isAnchor: normalizeBoolean(req.body?.isAnchor),
				appraisal: normalizeSourceAppraisal(req.body?.appraisal),
				citationStatus: normalizeCitationStatus(req.body?.citationStatus),
				citationCheckedAt: normalizeDate(req.body?.citationCheckedAt),
				statusSources,
				stance: normalizeClaimSourceStance(req.body?.stance),
				note: normalizeText(req.body?.note, 1000),
				order: normalizeInteger(req.body?.order, 0, 999, 0)
			});
			invalidateEvidenceLandscapeApproval(claim);
			await claim.save();

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: claim._id,
				editorId: actor.id,
				editorModel: actor.model,
				summary: normalizeText(req.body?.revisionNote, 2000) || "Added claim source."
			});

			return res.status(201).json({ source: toEditorialClaimSource(source.toObject()) });
		}
		catch (error) {
			logError("API request failed", error);
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
			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!requireClaimMutationAccess(req, res, claim)) return;

			if (req.body?.kind !== undefined) source.kind = normalizeClaimSourceKind(req.body?.kind);
			if (req.body?.title !== undefined) {
				const sourceTitle = normalizeText(req.body?.title, CLAIM_SOURCE_TITLE_MAX_LENGTH);
				if (!sourceTitle) return res.status(400).json({ error: "Source title is required." });
				source.title = sourceTitle;
			}
			if (req.body?.publisher !== undefined) source.publisher = normalizeText(req.body?.publisher, 160);
			if (req.body?.year !== undefined) {
				source.year = req.body?.year ? normalizeInteger(req.body?.year, 0, 9999, 0) : undefined;
			}
			if (req.body?.url !== undefined) {
				try {
					source.url = normalizeHttpUrl(req.body?.url, 500);
				}
				catch (error) {
					return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid source URL." });
				}
			}
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
				try {
					source.statusSources = normalizeHttpUrlList(req.body?.statusSources, 6, 500);
				}
				catch (error) {
					return res.status(400).json({
						error: error instanceof Error ? error.message : "Invalid integrity signal URL."
					});
				}
			}
			if (req.body?.stance !== undefined)
				source.stance = normalizeClaimSourceStance(req.body?.stance);
			if (req.body?.note !== undefined) source.note = normalizeText(req.body?.note, 1000);
			if (req.body?.order !== undefined)
				source.order = normalizeInteger(req.body?.order, 0, 999, source.order || 0);
			source.evidenceProfile.reviewer.reviewedById = undefined;
			source.evidenceProfile.reviewer.reviewedAt = undefined;
			await source.save();
			invalidateEvidenceLandscapeApproval(claim);
			await claim.save();

			const actor = currentActor(req);
			await createClaimRevision({
				claimId: new mongoose.Types.ObjectId(claimId),
				editorId: actor.id,
				editorModel: actor.model,
				summary: normalizeText(req.body?.revisionNote, 2000) || "Updated claim source."
			});

			return res.json({ source: toEditorialClaimSource(source.toObject()) });
		}
		catch (error) {
			logError("API request failed", error);
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

			const claim = await Claim.findById(claimId);
			if (!claim) return res.status(404).json({ error: "Claim not found." });
			if (!requireClaimMutationAccess(req, res, claim)) return;
			const source = await ClaimSource.findOneAndDelete({ _id: sourceId, claim: claimId });
			if (!source) return res.status(404).json({ error: "Source not found." });
			invalidateEvidenceLandscapeApproval(claim);
			await claim.save();

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
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to remove source." });
		}
	});

	api.get("/editorial/questions", requireEditorial, async (req, res) => {
		try {
			const routingStatus = typeof req.query.routingStatus === "string" ? req.query.routingStatus : "";
			const filter: QueryFilter<IQuestion> = {
				status: { $ne: "archived" }
			};
			if (isQuestionRoutingStatus(routingStatus)) {
				filter.routingStatus = routingStatus;
			}
			const questions = await Question.find(filter)
				.sort({ createdAt: -1 })
				.populate("topic")
				.populate("claim")
				.lean();
			return res.json({ questions: questions.map(toEditorialQuestion) });
		}
		catch (error) {
			logError("API request failed", error);
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
			if (claim.status === "archived") {
				return res.status(422).json({ error: "Archived claims cannot receive new question links." });
			}
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
			return res.json({ question: populated ? toEditorialQuestion(populated) : null });
		}
		catch (error) {
			logError("API request failed", error);
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
			return res.status(201).json({ claim: toEditorialClaim(populated) });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to create claim from question." });
		}
	});

	api.post("/editorial/questions/:id/mark-duplicate", requireAdmin, async (req, res) => {
		try {
			const questionId = typeof req.params.id === "string" ? req.params.id : "";
			if (!mongoose.Types.ObjectId.isValid(questionId)) {
				return res.status(400).json({ error: "Invalid question id." });
			}
			const moderationNote = normalizeText(req.body?.moderationNote, 1000);
			if (!moderationNote) {
				return res.status(400).json({ error: "A moderation note is required to mark a question duplicate." });
			}

			const question = await Question.findById(questionId);
			if (!question) return res.status(404).json({ error: "Question not found." });

			const actor = currentActor(req);
			question.routingStatus = "duplicate";
			question.status = "flagged";
			question.linkedBy = new mongoose.Types.ObjectId(actor.id);
			question.linkedAt = new Date();
			question.moderationNote = moderationNote;
			question.moderatedBy = new mongoose.Types.ObjectId(actor.id);
			question.moderatedAt = new Date();
			await question.save();
			await recordAccountActivity({
				req,
				action: "question.moderated",
				actor: {
					id: actor.id,
					type: "admin"
				},
				target: {
					id: question._id.toString(),
					type: "question"
				},
				metadata: {
					decision: "duplicate",
					topicId: question.topic.toString()
				}
			});

			const populated = await Question.findById(question._id).populate("topic").populate("claim").lean();
			return res.json({ question: populated ? toEditorialQuestion(populated) : null });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to mark question as duplicate." });
		}
	});

	api.get("/admin/account-activity", requireAdmin, listAccountActivity);

	api.get("/admin/expert-applications", requireAdmin, async (req, res) => {
		try {
			const status = typeof req.query.status === "string" ? req.query.status : "";
			const filter: QueryFilter<IExpertApplication>
				= status === "pending" || status === "approved" || status === "rejected" || status === "needs-info"
					? { status }
					: {};
			const applications = await ExpertApplication.find(filter).sort({ createdAt: -1 }).lean();
			return res.json({ applications });
		}
		catch (error) {
			logError("API request failed", error);
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
			if (decision !== "approved" && !reviewNotes) {
				return res.status(400).json({
					error: "Review notes are required when requesting more information or removing verified access."
				});
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
				const previousStatus = user.expertiseStatus;
				const previousTrustLevel = user.trustLevel || 0;
				user.expertiseStatus
					= decision === "approved" ? "verified" : decision === "needs-info" ? "pending" : "rejected";
				if (previousStatus !== user.expertiseStatus) {
					user.sessionVersion = Number(user.sessionVersion || 0) + 1;
				}
				if (decision === "approved") {
					user.trustLevel = Math.max(user.trustLevel || 0, 3);
					user.trustScore = Math.max(user.trustScore || 0, 200);
					user.affiliation = application.affiliation || user.affiliation || "";
					user.expertiseAreas = application.expertiseAreas;
				}
				else {
					user.trustLevel = Math.min(user.trustLevel || 0, 2);
				}
				await user.save();
				await recordAccountActivity({
					req,
					action: "expert_application.reviewed",
					actor: {
						id: req.currentAdmin?._id.toString() ?? currentActor(req).id,
						type: "admin"
					},
					target: {
						id: application._id.toString(),
						type: "expert_application",
						email: user.email
					},
					metadata: {
						decision,
						newTrustLevel: user.trustLevel || 0,
						previousStatus,
						previousTrustLevel,
						newStatus: user.expertiseStatus,
						userId: user._id.toString()
					}
				});
			}

			return res.json({ application });
		}
		catch (error) {
			logError("API request failed", error);
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
			logError("API request failed", error);
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
			const reviewNote = normalizeText(req.body?.reviewNote, 1000);
			if (!reviewNote) {
				return res.status(400).json({ error: "A moderation review note is required." });
			}

			const flag = await QuestionFlag.findById(flagId);
			if (!flag) return res.status(404).json({ error: "Flag not found." });
			if (flag.status !== "open") {
				return res.status(409).json({ error: "This flag has already been reviewed." });
			}

			flag.status = decision;
			flag.reviewNote = reviewNote;
			const actor = currentActor(req);
			flag.reviewedBy = new mongoose.Types.ObjectId(actor.id);
			flag.reviewedAt = new Date();
			await flag.save();
			await recordAccountActivity({
				req,
				action: "question_flag.reviewed",
				actor: {
					id: actor.id,
					type: "admin"
				},
				target: {
					id: flag.question.toString(),
					type: "question"
				},
				metadata: {
					decision,
					reason: flag.reason
				}
			});

			return res.json({ flag });
		}
		catch (error) {
			logError("API request failed", error);
			return res.status(500).json({ error: "Failed to review question flag." });
		}
	});

	app.use("/api/auth", authRoutes);
	app.use("/api", api);
	app.use("/api", (_req, res) => {
		res.status(404).json({ error: "Not found." });
	});
	app.use((_req, res) => {
		res.status(404).json({ error: "Not found." });
	});

	const errorHandler: express.ErrorRequestHandler = (error, _req, res, _next) => {
		const parserError = error instanceof SyntaxError
			&& typeof error === "object"
			&& error
			&& "type" in error
			&& error.type === "entity.parse.failed";
		if (parserError) {
			res.status(400).json({ error: "Request body must contain valid JSON." });
			return;
		}

		logError("Unhandled API error", error);
		res.status(500).json({ error: "Internal server error." });
	};
	app.use(errorHandler);

	const parsedPort = Number.parseInt(env.PORT || "3011", 10);
	if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65_535) {
		throw new Error("PORT must be an integer between 1 and 65535.");
	}
	const host = env.HOST || "127.0.0.1";
	const server = app.listen(parsedPort, host, () => console.log(`Server listening on ${host}:${parsedPort}.`));
	server.requestTimeout = 15_000;
	server.headersTimeout = 10_000;
	server.keepAliveTimeout = 5_000;
	server.maxRequestsPerSocket = 1_000;
	let isShuttingDown = false;

	const shutdown = async (signal: NodeJS.Signals) => {
		if (isShuttingDown) {
			return;
		}

		isShuttingDown = true;
		console.log(`${signal} received, shutting down gracefully...`);

		try {
			if (server.listening) {
				server.closeIdleConnections();
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
			logError("Graceful shutdown failed", error);
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
	logError("Server startup failed", err);
	exit(1);
});
