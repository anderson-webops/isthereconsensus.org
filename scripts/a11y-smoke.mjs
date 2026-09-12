import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
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
const frontendServerEntry = resolve(projectRoot, "front-end/.output/server/index.mjs");

const siteName = "Is There Consensus?";
let frontendPort = 0;
let apiPort = 0;
let baseUrl = "";
let apiUrl = "";
const routes = [
	"/",
	"/consensus",
	"/consensus?q=creatine%20vs%20protein",
	"/consensus/a11y-topic/a11y-citation-review",
	"/ask",
	"/ask?question=creatine%20vs%20protein",
	"/library",
	"/account/editorial/reader-feedback",
	"/explainers",
	"/explainers/how-consensus-forms",
	"/guides",
	"/compare",
	"/compare/electricity-emissions",
	"/compare/electricity-emissions?outcome=upstream",
	"/compare/electricity-emissions?context=whole-grid",
	"/compare/electricity-emissions?options=",
	"/compare/caffeine-dose-and-sleep",
	"/compare/caffeine-dose-and-sleep?outcome=deep-sleep&context=twelve-hours",
	"/compare/caffeine-dose-and-sleep?context=other-populations",
	"/compare/caffeine-dose-and-sleep?options=",
	"/compare/strength-training-supplements",
	"/compare/strength-training-supplements?outcome=muscle-growth",
	"/compare/strength-training-supplements?context=without-training",
	"/compare/strength-training-supplements?context=clinical",
	"/compare/strength-training-supplements?options=",
	"/compare/non-drug-insomnia-treatments",
	"/compare/non-drug-insomnia-treatments?outcome=demands",
	"/compare/non-drug-insomnia-treatments?context=short-opportunity",
	"/compare/non-drug-insomnia-treatments?context=other-populations",
	"/compare/non-drug-insomnia-treatments?options=",
	"/compare/home-heat-pump-upgrades",
	"/compare/home-heat-pump-upgrades?outcome=lifetime-value",
	"/compare/home-heat-pump-upgrades?context=with-envelope",
	"/compare/home-heat-pump-upgrades?context=your-home",
	"/compare/home-heat-pump-upgrades?context=other-systems",
	"/compare/home-heat-pump-upgrades?options=",
	"/compare/particle-air-cleaner-designs",
	"/compare/particle-air-cleaner-designs?outcome=power",
	"/compare/particle-air-cleaner-designs?context=occupied-home",
	"/compare/particle-air-cleaner-designs?context=gases",
	"/compare/particle-air-cleaner-designs?context=health",
	"/compare/particle-air-cleaner-designs?options=",
	"/guides/choosing-air-cleaning",
	"/compare/exercise-and-blood-pressure",
	"/compare/exercise-and-blood-pressure?outcome=diastolic",
	"/compare/exercise-and-blood-pressure?context=ambulatory",
	"/compare/exercise-and-blood-pressure?context=ambulatory&outcome=diastolic",
	"/compare/exercise-and-blood-pressure?context=personal",
	"/compare/exercise-and-blood-pressure?context=events",
	"/compare/exercise-and-blood-pressure?options=",
	"/guides/exercise-and-blood-pressure",
	"/compare/mosquito-bite-prevention",
	"/compare/hearing-protection",
	"/consensus/digital-security-and-privacy",
	"/compare/food-storage-and-safety",
	"/compare/food-storage-and-safety?outcome=limits",
	"/compare/food-storage-and-safety?context=meal",
	"/compare/food-storage-and-safety?context=outage",
	"/compare/food-storage-and-safety?options=",
	"/guides/food-storage-and-safety",
	"/compare/account-protection",
	"/compare/account-protection?outcome=access",
	"/compare/account-protection?context=personal",
	"/compare/account-protection?context=incident",
	"/compare/account-protection?options=",
	"/guides/account-protection",
	"/compare/hearing-protection?outcome=use",
	"/compare/hearing-protection?context=personal",
	"/compare/hearing-protection?context=injury",
	"/compare/hearing-protection?options=",
	"/guides/hearing-protection",
	"/compare/mosquito-bite-prevention?outcome=use",
	"/compare/mosquito-bite-prevention?context=personal",
	"/compare/mosquito-bite-prevention?context=child",
	"/compare/mosquito-bite-prevention?options=",
	"/guides/mosquito-bite-prevention",
	"/compare/household-water-treatment",
	"/compare/household-water-treatment?outcome=chemicals",
	"/compare/household-water-treatment?outcome=resources",
	"/compare/household-water-treatment?context=your-water",
	"/compare/household-water-treatment?context=emergency",
	"/compare/household-water-treatment?options=",
	"/guides/household-water-treatment",
	"/guides/caffeine-tolerance-and-sleep",
	"/guides/making-sense-of-supplements",
	"/guides/comparing-electricity-options",
	"/guides/sleep-and-insomnia",
	"/guides/exercise-without-magic-numbers",
	"/guides/reading-vaccine-evidence",
	"/guides/making-sense-of-nutrition",
	"/guides/understanding-climate-attribution",
	"/guides/understanding-evolution",
	"/guides/interpreting-medical-evidence",
	"/misconceptions",
	"/standards",
	"/source-standards",
	"/privacy",
	"/terms",
	"/community-guidelines",
	"/corrections",
	"/conflicts-and-funding",
	"/expert-review-program",
	"/moderation-and-appeals",
	"/automation-and-ai",
	"/copyright-and-trademark",
	"/account-deletion-and-retention",
	"/account/editorial/source-integrity",
	"/this-page-does-not-exist"
];
const colorSchemes = (process.env.A11Y_COLOR_SCHEMES || "light,dark")
	.split(",")
	.map((scheme) => scheme.trim())
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

const chromePath = chromeCandidates.find((candidate) => existsSync(candidate));
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
	return new Promise((resolvePortCheck) => {
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
	if (!reservedPorts.has(port) && (await portIsAvailable(port))) return port;
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
	if (pathname.endsWith("/topics/a11y-topic/claims/a11y-citation-review")) {
		return {
			claim: {
				_id: "a11y-claim",
				title: "Does this sample review support accessible citation reuse?",
				slug: "a11y-citation-review",
				status: "published",
				consensusBand: "broad",
				evidenceCertainty: "moderate",
				confidenceScore: 82,
				bottomLine: "Yes. The fixture exposes the citation controls to the built-app accessibility check.",
				stableCore: ["The review can be copied or exported in standard citation formats."],
				openQuestions: ["How will citation use vary by reader?"],
				whatWouldChangeMinds: ["A browser-level accessibility regression."],
				misconceptions: [],
				sources: [
					{
						kind: "systematic_review",
						title: "Accessible evidence reuse fixture",
						publisher: "Is There Consensus",
						year: 2026,
						url: "https://isthereconsensus.org/standards",
						stance: "supports",
						note: "A deterministic fixture for built-app accessibility testing."
					}
				],
				lastReviewedAt: "2026-09-10T00:00:00.000Z",
				publishedAt: "2026-09-10T00:00:00.000Z",
				topic: {
					_id: "a11y-topic",
					title: "Accessibility fixtures",
					slug: "a11y-topic",
					description: "Deterministic content used only by the local accessibility smoke test."
				}
			},
			citation: {
				plainText: "Is There Consensus editorial team. Accessible citation fixture.",
				markdown: "[Accessible citation fixture](https://isthereconsensus.org/standards).",
				reviewUrl: "https://isthereconsensus.org/consensus/a11y-topic/a11y-citation-review",
				reviewedAt: "2026-09-10"
			},
			collections: [],
			relatedClaims: []
		};
	}
	if (pathname.endsWith("/pageview")) return { pageview: 0, startAt: Date.now() };
	if (pathname.includes("/session")) return { authenticated: false, user: null, admin: null };
	if (pathname.includes("/auth") || pathname.includes("/login"))
		return { authenticated: false, user: null, token: "" };
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
	if (pathname.includes("/submissions") || pathname.includes("/board") || pathname.includes("/items"))
		return emptyCollection();
	if (pathname.includes("/service-directory")) return { services: [], categories: [], ...emptyCollection() };
	if (pathname.includes("/elections")) return { elections: [], ...emptyCollection() };
	if (pathname.includes("/jurisdictions") || pathname.includes("/locations") || pathname.includes("/districts"))
		return { jurisdictions: [], locations: [], districts: [], ...emptyCollection() };
	if (pathname.includes("/representatives") || pathname.includes("/candidate"))
		return { representatives: [], candidates: [], ...emptyCollection() };
	if (pathname.includes("/sources")) return { sources: [], ...emptyCollection() };
	if (pathname.includes("/products")) return [];
	if (pathname.includes("/contact") || pathname.includes("/cart") || pathname.includes("/orders"))
		return { ok: true };
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
		} catch (error) {
			lastError = error;
		}
		await new Promise((resolveWait) => setTimeout(resolveWait, 400));
	}
	throw lastError || new Error(`Timed out waiting for ${url}`);
}

function startFrontend() {
	if (!existsSync(frontendServerEntry)) {
		throw new Error(
			"Missing front-end/.output/server/index.mjs. Run `npm run build` or `npm run -w front-end build` before `npm run a11y`."
		);
	}

	const child = spawn(process.execPath, [frontendServerEntry], {
		cwd: resolve(projectRoot, "front-end"),
		env: {
			...process.env,
			BROWSER: "none",
			DISABLE_ANALYTICS: "true",
			NODE_ENV: "production",
			HOST: "127.0.0.1",
			NITRO_HOST: "127.0.0.1",
			PORT: String(frontendPort),
			NITRO_PORT: String(frontendPort),
			NUXT_DEVTOOLS_ENABLED: "false",
			NUXT_TELEMETRY_DISABLED: "1",
			NUXT_PUBLIC_APP_URL: baseUrl,
			NUXT_PUBLIC_SITE_URL: baseUrl,
			NUXT_API_INTERNAL_BASE: apiUrl,
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
	child.stdout.on("data", (data) => writeServerLine("ssr", data));
	child.stderr.on("data", (data) => writeServerLine("ssr", data));
	return child;
}

function closeServer(server) {
	return new Promise((resolveClose) => server.close(resolveClose));
}

function processIsRunning(child) {
	return child.exitCode === null && child.signalCode === null;
}

function waitForProcessExit(child, timeoutMs) {
	if (!processIsRunning(child)) return Promise.resolve(true);

	return new Promise((resolveWait) => {
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
	} catch (error) {
		if (error?.code !== "ESRCH") console.warn(`Could not stop frontend process: ${error.message}`);
		return;
	}

	if (await waitForProcessExit(child, 5_000)) return;

	try {
		process.kill(target, "SIGKILL");
	} catch (error) {
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
	await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
	await new Promise((resolveWait) => setTimeout(resolveWait, 100));
	const mobileLayout = await page.evaluate(() => {
		const visible = (element) => {
			const style = globalThis.getComputedStyle(element);
			const rect = element.getBoundingClientRect();
			return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
		};
		const overflowElements = Array.from(document.querySelectorAll("body *"))
			.filter(
				(element) =>
					visible(element) &&
					(element.getBoundingClientRect().right > globalThis.innerWidth + 1 ||
						element.getBoundingClientRect().left < -1)
			)
			.slice(0, 5)
			.map((element) => `${element.tagName.toLowerCase()}.${String(element.className || "").trim()}`);
		const negativeLetterSpacing = Array.from(document.querySelectorAll("body *"))
			.filter((element) => {
				if (!visible(element)) return false;
				const value = Number.parseFloat(globalThis.getComputedStyle(element).letterSpacing);
				return Number.isFinite(value) && value < 0;
			})
			.slice(0, 5)
			.map((element) => `${element.tagName.toLowerCase()}.${String(element.className || "").trim()}`);

		return {
			h1Count: Array.from(document.querySelectorAll("main h1")).filter(visible).length,
			horizontalOverflow: document.documentElement.scrollWidth > globalThis.innerWidth + 1,
			overflowElements,
			negativeLetterSpacing
		};
	});
	await page.close();
	const layoutIssues = [];
	if (mobileLayout.h1Count !== 1)
		layoutIssues.push(`expected one visible main heading, found ${mobileLayout.h1Count}`);
	if (mobileLayout.horizontalOverflow || mobileLayout.overflowElements.length) {
		layoutIssues.push(`mobile horizontal overflow: ${mobileLayout.overflowElements.join(", ") || "page root"}`);
	}
	if (mobileLayout.negativeLetterSpacing.length) {
		layoutIssues.push(`negative letter spacing: ${mobileLayout.negativeLetterSpacing.join(", ")}`);
	}
	return {
		url,
		scheme,
		layoutIssues,
		violations: result.violations.filter((violation) => violation.id !== "frame-tested")
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
			if (result.violations.length || result.layoutIssues.length) {
				failures.push(result);
				continue;
			}
			console.log(`a11y ok: ${result.url} [${scheme}]`);
		}
	}

	if (failures.length) {
		for (const failure of failures) {
			console.error(`\nAccessibility issues for ${siteName} at ${failure.url} [${failure.scheme}]`);
			for (const issue of failure.layoutIssues) {
				console.error(`- [layout] ${issue}`);
			}
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
} finally {
	if (browser) {
		const browserProcess = browser.process();
		// Chromium helpers can retain inherited output pipes after the browser
		// exits. Close only this runner's browser pipes during shutdown.
		const closePipes = () => {
			for (const stream of browserProcess?.stdio ?? []) stream?.destroy();
		};
		const cleanupTimer = setTimeout(closePipes, 2_000);
		try {
			await browser.close();
		} finally {
			clearTimeout(cleanupTimer);
			closePipes();
		}
	}
	await stopProcessTree(frontendProcess);
	await closeServer(apiServer);
}
