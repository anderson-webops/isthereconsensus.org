import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import http from "node:http";
import { createRequire } from "node:module";
import net from "node:net";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const require = createRequire(import.meta.url);
const axeSourcePath = require.resolve("axe-core/axe.min.js");
const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const frontendPackagePath = resolve(projectRoot, "front-end/package.json");
const frontendPackage = JSON.parse(readFileSync(frontendPackagePath, "utf8"));

const siteName = "Is There Consensus?";
const frontendKind = "nuxt";
let frontendPort = 0;
let apiPort = 0;
let baseUrl = "";
let apiUrl = "";
const routes = [
	"/",
	"/consensus",
	"/standards",
	"/source-standards",
	"/privacy",
	"/terms"
];
const colorSchemes = (process.env.A11Y_COLOR_SCHEMES || "light,dark")
	.split(",")
	.map(scheme => scheme.trim())
	.filter(Boolean);

const chromeCandidates = [
	process.env.PUPPETEER_EXECUTABLE_PATH,
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/Applications/Chromium.app/Contents/MacOS/Chromium",
	"/usr/bin/google-chrome-stable",
	"/usr/bin/google-chrome",
	"/usr/bin/chromium-browser",
	"/usr/bin/chromium"
].filter(Boolean);

const chromePath = chromeCandidates.find(candidate => existsSync(candidate));
if (chromePath) process.env.PUPPETEER_EXECUTABLE_PATH = chromePath;

function parsePort(envName, fallbackPort) {
	const rawPort = process.env[envName];
	const port = Number(rawPort || fallbackPort);
	if (!Number.isInteger(port) || port < 1 || port > 65535) {
		throw new Error(`${envName} must be a TCP port between 1 and 65535.`);
	}
	return { explicit: Boolean(rawPort), port };
}

function portIsAvailable(port) {
	return new Promise(resolvePortCheck => {
		const server = net.createServer();
		server.unref();
		server.once("error", () => resolvePortCheck(false));
		server.listen(port, "127.0.0.1", () => {
			server.close(() => resolvePortCheck(true));
		});
	});
}

function getEphemeralPort(reservedPorts) {
	return new Promise((resolvePort, reject) => {
		const server = net.createServer();
		server.unref();
		server.once("error", reject);
		server.listen(0, "127.0.0.1", () => {
			const address = server.address();
			const port = typeof address === "object" && address ? address.port : 0;
			server.close(async () => {
				if (!port || reservedPorts.has(port)) {
					resolvePort(await getEphemeralPort(reservedPorts));
					return;
				}
				resolvePort(port);
			});
		});
	});
}

async function choosePort(envName, fallbackPort, reservedPorts) {
	const { explicit, port } = parsePort(envName, fallbackPort);
	if (!reservedPorts.has(port) && await portIsAvailable(port)) return port;
	if (explicit) throw new Error(`${envName}=${port} is already in use.`);

	const selectedPort = await getEphemeralPort(reservedPorts);
	console.warn(`[a11y] Port ${port} is unavailable; using ${selectedPort}.`);
	return selectedPort;
}

async function configurePorts() {
	const reservedPorts = new Set();
	frontendPort = await choosePort("A11Y_FRONTEND_PORT", 3348, reservedPorts);
	reservedPorts.add(frontendPort);
	apiPort = await choosePort("A11Y_API_PORT", 3048, reservedPorts);
	baseUrl = `http://127.0.0.1:${frontendPort}`;
	apiUrl = `http://127.0.0.1:${apiPort}/api`;
}

function writeServerLine(prefix, data) {
	const text = data.toString().trim();
	if (text) process.stderr.write(`[${prefix}] ${text}\n`);
}

function sendJson(res, body, status = 200) {
	res.writeHead(status, {
		"content-type": "application/json",
		"access-control-allow-origin": baseUrl,
		"access-control-allow-credentials": "true",
		"access-control-allow-headers": "authorization,content-type",
		"access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS"
	});
	res.end(JSON.stringify(body));
}

function emptyCollection() {
	return {
		items: [],
		results: [],
		data: [],
		records: [],
		total: 0
	};
}

function responseFor(url) {
	const pathname = url.pathname.replace(/\/+/g, "/");
	if (pathname.endsWith("/pageview")) return { pageview: 0, startAt: Date.now() };
	if (pathname.includes("/session")) return { authenticated: false, user: null, admin: null };
	if (pathname.includes("/auth") || pathname.includes("/login")) return { authenticated: false, user: null, token: "" };
	if (pathname.includes("/me") || pathname.includes("/account")) return { user: null, authenticated: false };
	if (pathname.includes("/quotes")) return [];
	if (pathname.includes("/availability")) {
		const start = new Date(Date.now() + 24 * 60 * 60_000);
		start.setMinutes(0, 0, 0);
		const end = new Date(start.getTime() + 60 * 60_000);
		return [{ id: "a11y-slot", title: "Available", start: start.toISOString(), end: end.toISOString() }];
	}
	if (pathname.includes("/topics")) return { topics: [], claims: [], ...emptyCollection() };
	if (pathname.includes("/claims")) return { claims: [], ...emptyCollection() };
	if (pathname.includes("/search")) return { query: url.searchParams.get("q") || "", ...emptyCollection() };
	if (pathname.includes("/submissions") || pathname.includes("/board") || pathname.includes("/items")) return emptyCollection();
	if (pathname.includes("/service-directory")) return { services: [], categories: [], ...emptyCollection() };
	if (pathname.includes("/elections")) return { elections: [], ...emptyCollection() };
	if (pathname.includes("/jurisdictions") || pathname.includes("/locations") || pathname.includes("/districts")) return { jurisdictions: [], locations: [], districts: [], ...emptyCollection() };
	if (pathname.includes("/representatives") || pathname.includes("/candidate")) return { representatives: [], candidates: [], ...emptyCollection() };
	if (pathname.includes("/sources")) return { sources: [], ...emptyCollection() };
	if (pathname.includes("/products")) return [];
	if (pathname.includes("/contact") || pathname.includes("/cart") || pathname.includes("/orders")) return { ok: true };
	return { ok: true, ...emptyCollection() };
}

function createMockApiServer() {
	return http.createServer((req, res) => {
		const url = new URL(req.url || "/", `http://127.0.0.1:${apiPort}`);
		if (req.method === "OPTIONS") {
			sendJson(res, {}, 204);
			return;
		}
		sendJson(res, responseFor(url));
	});
}

async function listen(server, port) {
	await new Promise((resolveListen, reject) => {
		server.once("error", reject);
		server.listen(port, "127.0.0.1", resolveListen);
	});
}

async function waitForHttp(url, timeoutMs = 45_000, expectedText = "") {
	const start = Date.now();
	let lastError;
	while (Date.now() - start < timeoutMs) {
		try {
			const response = await fetch(url);
			const text = await response.text();
			if (response.ok && (!expectedText || text.includes(expectedText))) return;
			lastError = new Error(`${url} returned ${response.status}`);
			if (response.ok && expectedText) {
				lastError = new Error(`${url} did not render expected text: ${expectedText}`);
			}
		}
		catch (error) {
			lastError = error;
		}
		await new Promise(resolveWait => setTimeout(resolveWait, 400));
	}
	throw lastError || new Error(`Timed out waiting for ${url}`);
}

function startFrontend() {
	const isNuxt = frontendKind === "nuxt" || Object.values(frontendPackage.scripts || {}).some(script => String(script).includes("nuxt"));
	const args = isNuxt
		? ["exec", "-w", "front-end", "--", "nuxt", "dev", "--host", "127.0.0.1", "--port", String(frontendPort)]
		: ["exec", "-w", "front-end", "--", "vite", "--host", "127.0.0.1", "--port", String(frontendPort), "--strictPort"];

	const child = spawn("npm", args, {
		cwd: projectRoot,
		env: {
			...process.env,
			BROWSER: "none",
			DISABLE_ANALYTICS: "true",
			NUXT_DEVTOOLS_ENABLED: "false",
			NUXT_TELEMETRY_DISABLED: "1",
			NUXT_PUBLIC_APP_URL: baseUrl,
			NUXT_PUBLIC_SITE_URL: baseUrl,
			NUXT_PUBLIC_API_BASE: apiUrl,
			NUXT_PUBLIC_API_BASE_URL: apiUrl,
			PUBLIC_API_BASE: apiUrl,
			INTERNAL_API_BASE: apiUrl,
			API_INTERNAL_BASE: apiUrl,
			ADMIN_API_BASE: apiUrl,
			NUXT_ADMIN_API_BASE: apiUrl,
			ADMIN_API_KEY: "a11y-smoke",
			NUXT_ADMIN_API_KEY: "a11y-smoke",
			ADMIN_SESSION_SECRET: "a11y-smoke-session-secret",
			NUXT_ADMIN_SESSION_SECRET: "a11y-smoke-session-secret",
			NUXT_SESSION_SIGNING_SECRET: "a11y-smoke-session-secret",
			SESSION_SIGNING_SECRET: "a11y-smoke-session-secret",
			NUXT_PUBLIC_BACKEND_MODE: "mock",
			NUXT_PUBLIC_BILLING_MODE: "mock",
			NUXT_PUBLIC_ENABLE_DEMO_ACCESS: "true",
			NUXT_PUBLIC_FEATURE_INVESTMENT_MODULE: "true",
			NUXT_PUBLIC_PORTAL_URL: baseUrl,
			VITE_API_BASE_URL: apiUrl,
			VITE_API_URL: apiUrl,
			VITE_SSG_API_BASE_URL: apiUrl,
			VITE_PUBLIC_SITE_ORIGIN: baseUrl,
			VITE_SHOW_AD_SLOTS: "false"
		},
		detached: process.platform !== "win32",
		stdio: ["ignore", "pipe", "pipe"]
	});
	child.stdout.on("data", data => writeServerLine(isNuxt ? "nuxt" : "vite", data));
	child.stderr.on("data", data => writeServerLine(isNuxt ? "nuxt" : "vite", data));
	return child;
}

function closeServer(server) {
	return new Promise(resolveClose => server.close(resolveClose));
}

function processIsRunning(child) {
	return child.exitCode === null && child.signalCode === null;
}

function waitForProcessExit(child, timeoutMs) {
	if (!processIsRunning(child)) return Promise.resolve(true);

	return new Promise(resolveWait => {
		const onExit = () => {
			clearTimeout(timeout);
			resolveWait(true);
		};
		const timeout = setTimeout(() => {
			child.off("exit", onExit);
			resolveWait(false);
		}, timeoutMs);
		child.once("exit", onExit);
	});
}

async function stopProcessTree(child) {
	if (!child.pid || !processIsRunning(child)) return;

	const target = process.platform === "win32" ? child.pid : -child.pid;
	try {
		process.kill(target, "SIGTERM");
	}
	catch (error) {
		if (error?.code !== "ESRCH") console.warn(`Could not stop frontend process: ${error.message}`);
		return;
	}

	if (await waitForProcessExit(child, 5_000)) return;

	try {
		process.kill(target, "SIGKILL");
	}
	catch (error) {
		if (error?.code !== "ESRCH") console.warn(`Could not force stop frontend process: ${error.message}`);
	}
	await waitForProcessExit(child, 2_000);
}

async function analyzePage(browser, route, scheme) {
	const url = `${baseUrl}${route}`;
	const page = await browser.newPage();
	page.setDefaultTimeout(45_000);
	page.setDefaultNavigationTimeout(60_000);
	await page.setViewport({ width: 1280, height: 1000, deviceScaleFactor: 1 });
	if (scheme === "dark" || scheme === "light") {
		await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
	}
	await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
	await page.waitForNetworkIdle({ idleTime: 500, timeout: 8_000 }).catch(() => {});
	await page.addScriptTag({ path: axeSourcePath });
	const result = await page.evaluate(async () => {
		return await globalThis.axe.run(document, {
			resultTypes: ["violations"],
			runOnly: {
				type: "tag",
				values: ["wcag2a", "wcag2aa"]
			}
		});
	});
	await page.close();
	return {
		url,
		scheme,
		violations: result.violations.filter(violation => violation.id !== "frame-tested")
	};
}

await configurePorts();

const apiServer = createMockApiServer();
const frontendProcess = startFrontend();
let browser;

try {
	await listen(apiServer, apiPort);
	await waitForHttp(baseUrl, 45_000, siteName);

	browser = await puppeteer.launch({
		executablePath: chromePath,
		headless: "new",
		args: ["--no-sandbox", "--disable-dev-shm-usage"]
	});

	const failures = [];
	for (const route of routes) {
		for (const scheme of colorSchemes) {
			const result = await analyzePage(browser, route, scheme);
			if (result.violations.length) {
				failures.push(result);
				continue;
			}
			console.log(`a11y ok: ${result.url} [${scheme}]`);
		}
	}

	if (failures.length) {
		for (const failure of failures) {
			console.error(`\nAccessibility issues for ${siteName} at ${failure.url} [${failure.scheme}]`);
			for (const violation of failure.violations) {
				console.error(`- [${violation.impact ?? "unknown"}] ${violation.id}: ${violation.help}`);
				console.error(`  ${violation.helpUrl}`);
				for (const node of violation.nodes) {
					console.error(`  ${node.target.join(", ")}`);
				}
			}
		}
		process.exitCode = 1;
	}
}
finally {
	if (browser) await browser.close();
	await stopProcessTree(frontendProcess);
	await closeServer(apiServer);
}
