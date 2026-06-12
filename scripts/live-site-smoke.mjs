const defaultBaseUrl = "https://isthereconsensus.org";
const baseUrl = normalizeBaseUrl(process.env.LIVE_SMOKE_BASE_URL || defaultBaseUrl);
const profile = process.env.LIVE_SMOKE_PROFILE || "production";
const timeoutMs = Number(process.env.LIVE_SMOKE_TIMEOUT_MS || 10_000);

function normalizeBaseUrl(value) {
	try {
		const url = new URL(value);
		url.pathname = url.pathname.replace(/\/+$/, "");
		url.search = "";
		url.hash = "";
		return url.toString().replace(/\/$/, "");
	}
	catch {
		throw new Error(`LIVE_SMOKE_BASE_URL is not a valid URL: ${value}`);
	}
}

function buildUrl(route) {
	return `${baseUrl}${route}`;
}

async function fetchRoute(route, options = {}) {
	const response = await fetch(buildUrl(route), {
		headers: options.headers,
		method: options.method || "GET",
		redirect: options.redirect || "manual",
		signal: AbortSignal.timeout(timeoutMs)
	});
	const body = await response.text();
	return {
		body,
		contentType: response.headers.get("content-type") || "",
		headers: response.headers,
		route,
		status: response.status
	};
}

function expectStatus(result, expectedStatus) {
	if (result.status !== expectedStatus) {
		throw new Error(`${result.route} returned ${result.status}; expected ${expectedStatus}.`);
	}
}

function expectContentType(result, fragment) {
	if (!result.contentType.includes(fragment)) {
		throw new Error(`${result.route} returned content-type ${result.contentType}; expected ${fragment}.`);
	}
}

function expectIncludes(result, fragments) {
	for (const fragment of fragments) {
		if (!result.body.includes(fragment)) {
			throw new Error(`${result.route} is missing expected text: ${fragment}`);
		}
	}
}

function parseJson(result) {
	try {
		return JSON.parse(result.body);
	}
	catch (error) {
		throw new Error(`${result.route} did not return valid JSON: ${error instanceof Error ? error.message : error}`);
	}
}

function assertManifest(result) {
	expectStatus(result, 200);
	expectContentType(result, "application/manifest+json");

	const manifest = parseJson(result);
	if (manifest.name !== "Is There Consensus") {
		throw new Error(`${result.route} has unexpected name: ${manifest.name}`);
	}
	if (manifest.start_url !== "/" || manifest.display !== "standalone") {
		throw new Error(`${result.route} has unexpected launch metadata.`);
	}
	const icons = new Set((manifest.icons || []).map(icon => icon.src));
	for (const icon of ["/pwa-192x192.png", "/pwa-512x512.png", "/maskable-icon.png"]) {
		if (!icons.has(icon)) {
			throw new Error(`${result.route} is missing icon ${icon}.`);
		}
	}
}

function assertReadyz(result) {
	expectStatus(result, 200);
	expectContentType(result, "application/json");
	const data = parseJson(result);
	if (data.ready !== true) {
		throw new Error(`${result.route} did not report ready: ${result.body}`);
	}
}

async function runCheck(label, check) {
	try {
		await check();
		console.log(`live smoke ok: ${label}`);
		return null;
	}
	catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`live smoke failed: ${label}: ${message}`);
		return `${label}: ${message}`;
	}
}

if (!["production", "frontend"].includes(profile)) {
	throw new Error("LIVE_SMOKE_PROFILE must be production or frontend.");
}

const failures = [];

failures.push(await runCheck("homepage renders public site", async () => {
	const result = await fetchRoute("/");
	expectStatus(result, 200);
	expectContentType(result, "text/html");
	expectIncludes(result, ["Is There Consensus", "Search the claim"]);
}));

failures.push(await runCheck("robots.txt advertises canonical sitemap", async () => {
	const result = await fetchRoute("/robots.txt");
	expectStatus(result, 200);
	expectContentType(result, "text/plain");
	expectIncludes(result, [
		"User-agent: *",
		"Disallow: /api",
		"Sitemap: https://isthereconsensus.org/sitemap.xml"
	]);
}));

let standardSecurityBody = "";
failures.push(await runCheck(".well-known/security.txt exposes reporting metadata", async () => {
	const result = await fetchRoute("/.well-known/security.txt");
	expectStatus(result, 200);
	expectContentType(result, "text/plain");
	expectIncludes(result, [
		"Contact: mailto:consensus@isthereconsensus.org",
		"Policy: https://github.com/anderson-webops/isthereconsensus.org/security/policy",
		"Canonical: https://isthereconsensus.org/.well-known/security.txt"
	]);
	standardSecurityBody = result.body;
}));

failures.push(await runCheck("security.txt fallback matches standard location", async () => {
	const result = await fetchRoute("/security.txt");
	expectStatus(result, 200);
	expectContentType(result, "text/plain");
	if (result.body !== standardSecurityBody) {
		throw new Error("/security.txt does not match /.well-known/security.txt.");
	}
}));

failures.push(await runCheck("web manifest exposes install metadata", async () => {
	assertManifest(await fetchRoute("/site.webmanifest"));
}));

failures.push(await runCheck("/setup is not publicly readable", async () => {
	expectStatus(await fetchRoute("/setup"), 404);
}));

failures.push(await runCheck("/healthz responds", async () => {
	const result = await fetchRoute("/healthz");
	expectStatus(result, 200);
	expectContentType(result, "application/json");
	expectIncludes(result, ["ok"]);
}));

failures.push(await runCheck("/readyz responds ready", async () => {
	assertReadyz(await fetchRoute("/readyz"));
}));

if (profile === "production") {
	failures.push(await runCheck("backend setup diagnostics reject unauthenticated public requests", async () => {
		const result = await fetchRoute("/api/setup/status");
		expectStatus(result, 403);
		expectContentType(result, "application/json");
		expectIncludes(result, ["forbidden"]);
	}));
}

const actualFailures = failures.filter(Boolean);
if (actualFailures.length) {
	console.error(`\nLive smoke failed for ${baseUrl} (${profile}).`);
	for (const failure of actualFailures) console.error(`- ${failure}`);
	process.exitCode = 1;
}
else {
	console.log(`live smoke ok: ${baseUrl} (${profile})`);
}
