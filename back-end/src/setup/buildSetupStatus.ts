import { env } from "node:process";
import mongoose from "mongoose";

export type MongoConfigSource = "vault" | "env" | "missing";
export type SetupSeverity = "critical" | "warning" | "info";

export interface SetupCheck {
	id: string;
	label: string;
	ok: boolean;
	severity: SetupSeverity;
	detail: string;
	action?: string;
}

export interface SetupStatusResponse {
	ok: boolean;
	environment: "production" | "development";
	generatedAt: string;
	apiBase: string;
	databaseName: string;
	mongoSource: MongoConfigSource;
	checks: SetupCheck[];
	summary: string;
}

interface BuildSetupStatusOptions {
	isProd: boolean;
	isCrossSite: boolean;
	corsOrigin: string;
	mongoSource: MongoConfigSource;
}

const localUrlPattern = /localhost|127\.0\.0\.1|0\.0\.0\.0/i;
const trailingSlashPattern = /\/+$/;

function looksLocalUrl(value: string) {
	return localUrlPattern.test(value);
}

function normalizeApiBase(value: string) {
	return value.replace(trailingSlashPattern, "");
}

export function buildSetupStatus({
	isProd,
	isCrossSite,
	corsOrigin,
	mongoSource
}: BuildSetupStatusOptions): SetupStatusResponse {
	const publicApiBase = normalizeApiBase(env.PUBLIC_API_BASE || "");
	const hasSessionSecret = !!env.SESSION_SECRET;
	const hasCaptchaSecret = !!env.CAPTCHA_SECRET;
	const hasCaptchaSiteKey = !!env.PUBLIC_CAPTCHA_SITEKEY;
	const topicCreationEnabled = env.ENABLE_TOPIC_CREATION === "true";
	const databaseName = mongoose.connection.db?.databaseName || mongoose.connection.name || "";
	const mongoConnected = mongoose.connection.readyState === 1;
	const checks: SetupCheck[] = [
		{
			id: "mode",
			label: "Production mode",
			ok: isProd,
			severity: "warning",
			detail: isProd ? "NODE_ENV=production is active." : "The server is not running in production mode.",
			action: "Set NODE_ENV=production in the deployed service units."
		},
		{
			id: "mongo-source",
			label: "MongoDB credentials",
			ok: mongoSource !== "missing",
			severity: "critical",
			detail:
				mongoSource === "vault"
					? "MongoDB credentials are loading from Vault."
					: mongoSource === "env"
						? "MongoDB credentials are loading from MONGODB_URI."
						: "No MongoDB credentials are configured.",
			action: "Provide Vault AppRole credentials or set MONGODB_URI."
		},
		{
			id: "mongo-connection",
			label: "MongoDB connection",
			ok: mongoConnected,
			severity: "critical",
			detail: mongoConnected
				? `MongoDB is connected${databaseName ? ` to ${databaseName}` : ""}.`
				: "The API is not connected to MongoDB.",
			action: "Confirm the database host is reachable and the credentials are valid."
		},
		{
			id: "session-secret",
			label: "Session secret",
			ok: hasSessionSecret,
			severity: "critical",
			detail: hasSessionSecret ? "SESSION_SECRET is configured." : "SESSION_SECRET is missing.",
			action: "Set a long random SESSION_SECRET before exposing auth to the public."
		},
		{
			id: "public-api-base",
			label: "Frontend API base",
			ok: !isProd || (!!publicApiBase && !looksLocalUrl(publicApiBase)),
			severity: "critical",
			detail: publicApiBase
				? `PUBLIC_API_BASE is set to ${publicApiBase}.`
				: "PUBLIC_API_BASE is not set.",
			action: "Point PUBLIC_API_BASE at the public site origin or a same-origin reverse proxy."
		},
		{
			id: "cors",
			label: "Cross-site CORS",
			ok: !isCrossSite || (!!corsOrigin && corsOrigin !== "*"),
			severity: "warning",
			detail: !isCrossSite
				? "Same-origin mode is assumed, so explicit CORS is optional."
				: corsOrigin === "*"
					? "CORS_ORIGIN is '*', which breaks credentialed auth requests."
					: corsOrigin
						? `Cross-site requests are allowed from ${corsOrigin}.`
						: "CROSS_SITE=true but CORS_ORIGIN is not configured.",
			action: "If frontend and backend use different origins, set CORS_ORIGIN to the exact frontend origin."
		},
		{
			id: "captcha",
			label: "Captcha protection",
			ok: hasCaptchaSecret && hasCaptchaSiteKey,
			severity: "warning",
			detail:
				hasCaptchaSecret && hasCaptchaSiteKey
					? "Turnstile is configured on both the frontend and backend."
					: hasCaptchaSecret || hasCaptchaSiteKey
						? "Captcha is only partially configured."
						: "Captcha is disabled; posting is open without challenge protection.",
			action: "Set both CAPTCHA_SECRET and PUBLIC_CAPTCHA_SITEKEY for production posting."
		},
		{
			id: "cookies",
			label: "Secure cookies",
			ok: true,
			severity: "info",
			detail: isProd
				? isCrossSite
					? "Production cookies are configured for cross-site usage with SameSite=None and Secure."
					: "Production cookies are configured with SameSite=Lax and Secure."
				: "Development cookie settings are active.",
			action: "Terminate TLS at the proxy so secure cookies stay valid."
		},
		{
			id: "topic-creation",
			label: "Topic creation",
			ok: topicCreationEnabled,
			severity: "info",
			detail: topicCreationEnabled
				? "Public topic creation is enabled."
				: "Topic creation is disabled; only seeded topics will appear.",
			action: "Enable only if you want the public to create new topic lanes."
		}
	];

	const failedCritical = checks.filter(check => check.severity === "critical" && !check.ok).length;
	const passed = checks.filter(check => check.ok).length;

	return {
		ok: failedCritical === 0,
		environment: isProd ? "production" : "development",
		generatedAt: new Date().toISOString(),
		apiBase: publicApiBase,
		databaseName,
		mongoSource,
		checks,
		summary: `${passed}/${checks.length} checks passing`
	};
}
