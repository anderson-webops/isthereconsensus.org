import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import net from "node:net";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const serverEntry = resolve(projectRoot, "front-end/.output/server/index.mjs");
const staticAssetDirs = [
	{ dir: resolve(projectRoot, "front-end/.output/public"), label: "Nuxt public output" },
	{ dir: resolve(projectRoot, "front-end/dist"), label: "static dist output" }
];
const securityTxtExpectation = {
	contentType: "text/plain",
	includes: [
		"Contact: mailto:consensus@isthereconsensus.org",
		"Canonical: https://isthereconsensus.org/.well-known/security.txt"
	]
};

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
	console.warn(`[ssr-assets] Port ${port} is unavailable; using ${selectedPort}.`);
	return selectedPort;
}

function writeServerLine(prefix, data) {
	const text = data.toString().trim();
	if (text) process.stderr.write(`[${prefix}] ${text}\n`);
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
		if (error?.code !== "ESRCH") console.warn(`Could not stop SSR server: ${error.message}`);
		return;
	}

	if (await waitForProcessExit(child, 5_000)) return;

	try {
		process.kill(target, "SIGKILL");
	}
	catch (error) {
		if (error?.code !== "ESRCH") console.warn(`Could not force stop SSR server: ${error.message}`);
	}
	await waitForProcessExit(child, 2_000);
}

function startServer(port) {
	const child = spawn(process.execPath, [serverEntry], {
		cwd: projectRoot,
		detached: process.platform !== "win32",
		env: {
			...process.env,
			HOST: "127.0.0.1",
			NITRO_HOST: "127.0.0.1",
			NITRO_PORT: String(port),
			NODE_ENV: "production",
			PORT: String(port)
		},
		stdio: ["ignore", "pipe", "pipe"]
	});
	child.stdout.on("data", data => writeServerLine("ssr", data));
	child.stderr.on("data", data => writeServerLine("ssr", data));
	return child;
}

async function waitForText(url, expectedText, timeoutMs = 45_000) {
	const start = Date.now();
	let lastError;
	while (Date.now() - start < timeoutMs) {
		try {
			const response = await fetch(url, { signal: AbortSignal.timeout(8_000) });
			const text = await response.text();
			if (response.ok && text.includes(expectedText)) return;
			lastError = new Error(`${url} returned ${response.status} without expected text: ${expectedText}`);
		}
		catch (error) {
			lastError = error;
		}
		await new Promise(resolveWait => setTimeout(resolveWait, 400));
	}
	throw lastError || new Error(`Timed out waiting for ${url}`);
}

async function fetchAsset(baseUrl, route) {
	const response = await fetch(`${baseUrl}${route}`, { signal: AbortSignal.timeout(8_000) });
	const body = await response.text();
	return { body, contentType: response.headers.get("content-type") || "", status: response.status };
}

function assertAsset(route, result, expected) {
	if (result.status !== 200) {
		throw new Error(`${route} returned ${result.status}; expected 200.`);
	}
	if (expected.contentType && !result.contentType.includes(expected.contentType)) {
		throw new Error(`${route} returned content-type ${result.contentType}; expected ${expected.contentType}.`);
	}
	for (const fragment of expected.includes) {
		if (!result.body.includes(fragment)) {
			throw new Error(`${route} is missing expected text: ${fragment}`);
		}
	}
}

function assertManifest(result) {
	assertAsset("/site.webmanifest", result, {
		contentType: "application/manifest+json",
		includes: []
	});

	const manifest = JSON.parse(result.body);
	if (manifest.name !== "Is There Consensus") {
		throw new Error(`/site.webmanifest has unexpected name: ${manifest.name}`);
	}
	if (manifest.start_url !== "/" || manifest.display !== "standalone") {
		throw new Error("/site.webmanifest has unexpected launch metadata.");
	}
	const iconSources = new Set((manifest.icons || []).map(icon => icon.src));
	for (const icon of ["/pwa-192x192.png", "/pwa-512x512.png", "/maskable-icon.png"]) {
		if (!iconSources.has(icon)) {
			throw new Error(`/site.webmanifest is missing icon ${icon}.`);
		}
	}
}

function readStaticAsset(dir, route) {
	const relativePath = route.replace(/^\/+/, "");
	return readFileSync(resolve(dir, relativePath), "utf8");
}

function assertStaticDeploymentMetadata(dir, label) {
	const body = readStaticAsset(dir, "/deployment.json");
	const data = JSON.parse(body);
	if (data.ok !== true || data.service !== "front-end" || data.runtime !== "nuxt-ssr") {
		throw new Error(`${label}/deployment.json has unexpected service metadata: ${body}`);
	}
	for (const field of ["buildId", "commit", "ref", "siteUrl"]) {
		if (typeof data[field] !== "string") {
			throw new Error(`${label}/deployment.json field ${field} must be a string.`);
		}
	}
}

function assertStaticSecurityTxt(dir, label) {
	const securityStandard = readStaticAsset(dir, "/.well-known/security.txt");
	const securityFallback = readStaticAsset(dir, "/security.txt");
	for (const fragment of securityTxtExpectation.includes) {
		if (!securityStandard.includes(fragment)) {
			throw new Error(`${label}/.well-known/security.txt is missing expected text: ${fragment}`);
		}
	}
	if (securityFallback !== securityStandard) {
		throw new Error(`${label}/security.txt does not match ${label}/.well-known/security.txt.`);
	}
}

function assertStaticMetadataFiles() {
	for (const { dir, label } of staticAssetDirs) {
		if (!existsSync(dir)) {
			throw new Error(`Missing ${label} at ${dir}. Run npm run build before npm run smoke:ssr-assets.`);
		}
		assertStaticDeploymentMetadata(dir, label);
		assertStaticSecurityTxt(dir, label);
	}
}

function assertDeploymentMetadata(result) {
	assertAsset("/deployment.json", result, {
		contentType: "application/json",
		includes: []
	});

	const data = JSON.parse(result.body);
	if (data.ok !== true || data.service !== "front-end" || data.runtime !== "nuxt-ssr") {
		throw new Error(`/deployment.json has unexpected service metadata: ${result.body}`);
	}
	for (const field of ["buildId", "commit", "ref", "siteUrl"]) {
		if (typeof data[field] !== "string") {
			throw new Error(`/deployment.json field ${field} must be a string.`);
		}
	}
}

async function assertSecurityTxt(baseUrl) {
	const securityStandard = await fetchAsset(baseUrl, "/.well-known/security.txt");
	const securityFallback = await fetchAsset(baseUrl, "/security.txt");

	assertAsset("/.well-known/security.txt", securityStandard, securityTxtExpectation);
	assertAsset("/security.txt", securityFallback, securityTxtExpectation);
	if (securityFallback.body !== securityStandard.body) {
		throw new Error("/security.txt does not match /.well-known/security.txt.");
	}
}

async function runWithServer(baseUrl, port, callback) {
	const serverProcess = startServer(port);
	try {
		await waitForText(baseUrl, "Is There Consensus?");
		await callback();
	}
	finally {
		await stopProcessTree(serverProcess);
	}
}

if (!existsSync(serverEntry)) {
	throw new Error("Missing front-end/.output/server/index.mjs. Run npm run build before npm run smoke:ssr-assets.");
}

assertStaticMetadataFiles();

const reservedPorts = new Set();
const port = await choosePort("SSR_ASSET_SMOKE_PORT", 4068, reservedPorts);
const baseUrl = `http://127.0.0.1:${port}`;

await runWithServer(baseUrl, port, async () => {
	const robots = await fetchAsset(baseUrl, "/robots.txt");
	const manifest = await fetchAsset(baseUrl, "/site.webmanifest");
	const deployment = await fetchAsset(baseUrl, "/deployment.json");

	await assertSecurityTxt(baseUrl);
	assertDeploymentMetadata(deployment);
	assertAsset("/robots.txt", robots, {
		contentType: "text/plain",
		includes: [
			"User-agent: *",
			"Disallow: /api",
			"Sitemap: https://isthereconsensus.org/sitemap.xml"
		]
	});
	assertManifest(manifest);

	console.log(`ssr public assets ok: ${baseUrl}`);
});
