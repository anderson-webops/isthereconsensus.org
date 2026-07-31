const LOCAL_URL_PATTERN = /localhost|127\.0\.0\.1|0\.0\.0\.0/i;
const TRAILING_SLASH_PATTERN = /\/+$/;
const API_SUFFIX_PATTERN = /\/api$/;

function trimTrailingSlash(value: string) {
	return value.replace(TRAILING_SLASH_PATTERN, "");
}

function ensureLeadingSlash(value: string) {
	return value.startsWith("/") ? value : `/${value}`;
}

function normalizeAbsoluteHttpBase(value: string, label: string) {
	let parsed: URL;
	try {
		parsed = new URL(value);
	} catch {
		throw new Error(`${label} must be a relative path or an absolute HTTP or HTTPS URL.`);
	}
	if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) {
		throw new Error(`${label} must be an HTTP or HTTPS URL without embedded credentials.`);
	}
	return trimTrailingSlash(parsed.toString());
}

export function isLocalApiBase(value: string) {
	return LOCAL_URL_PATTERN.test(value);
}

export function normalizePublicApiBase(value: string | undefined, isDev: boolean) {
	const candidate = (value || "").trim();

	if (!candidate) {
		return isDev ? "http://127.0.0.1:3011" : "/api";
	}

	if (candidate.startsWith("/")) {
		if (candidate.startsWith("//") || candidate.includes("\\") || /\s/.test(candidate)) {
			throw new Error("PUBLIC_API_BASE must be a same-origin path or an absolute HTTP or HTTPS URL.");
		}
		return ensureLeadingSlash(trimTrailingSlash(candidate)) || "/api";
	}

	const normalized = normalizeAbsoluteHttpBase(candidate, "PUBLIC_API_BASE");
	return !isDev && isLocalApiBase(normalized) ? "/api" : normalized;
}

export function normalizeInternalApiBase(value: string | undefined) {
	const candidate = (value || "").trim();
	return normalizeAbsoluteHttpBase(candidate || "http://127.0.0.1:3011", "INTERNAL_API_BASE").replace(
		API_SUFFIX_PATTERN,
		""
	);
}

export function normalizePublicSiteUrl(value: string | undefined, isDev: boolean) {
	const candidate = (value || (isDev ? "http://127.0.0.1:3000" : "https://isthereconsensus.org")).trim();
	const normalized = normalizeAbsoluteHttpBase(candidate, "PUBLIC_SITE_URL");
	const parsed = new URL(normalized);
	if (!isDev && parsed.protocol !== "https:") {
		throw new Error("PUBLIC_SITE_URL must use HTTPS in production.");
	}
	if (parsed.pathname !== "/" || parsed.search || parsed.hash) {
		throw new Error("PUBLIC_SITE_URL must be an origin without a path, query, or fragment.");
	}
	return parsed.origin;
}

export function joinBaseUrl(base: string, path: string) {
	const normalizedPath = ensureLeadingSlash(path);
	if (!base) return normalizedPath;
	if (base === "/") return normalizedPath;
	return `${trimTrailingSlash(base)}${normalizedPath}`;
}

export function withApiPrefix(base: string) {
	const normalizedBase = base.startsWith("/") ? ensureLeadingSlash(trimTrailingSlash(base)) : trimTrailingSlash(base);

	if (!normalizedBase) return "/api";
	if (normalizedBase === "/api" || normalizedBase.endsWith("/api")) return normalizedBase;
	return joinBaseUrl(normalizedBase, "/api");
}

export function buildApiUrl(base: string, path: string) {
	return joinBaseUrl(withApiPrefix(base), path);
}
