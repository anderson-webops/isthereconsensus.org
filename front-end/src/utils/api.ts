const LOCAL_URL_PATTERN = /localhost|127\.0\.0\.1|0\.0\.0\.0/i;

function trimTrailingSlash(value: string) {
	return value.replace(/\/+$/, "");
}

function ensureLeadingSlash(value: string) {
	return value.startsWith("/") ? value : `/${value}`;
}

export function isLocalApiBase(value: string) {
	return LOCAL_URL_PATTERN.test(value);
}

export function normalizePublicApiBase(value: string | undefined, isDev: boolean) {
	const candidate = (value || "").trim();

	if (!candidate) {
		return isDev ? "http://127.0.0.1:3011" : "/api";
	}

	if (!isDev && isLocalApiBase(candidate)) {
		return "/api";
	}

	if (candidate.startsWith("/")) {
		return ensureLeadingSlash(trimTrailingSlash(candidate)) || "/api";
	}

	return trimTrailingSlash(candidate);
}

export function normalizeInternalApiBase(value: string | undefined) {
	const candidate = (value || "").trim();
	return trimTrailingSlash(candidate || "http://127.0.0.1:3011").replace(/\/api$/, "");
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
