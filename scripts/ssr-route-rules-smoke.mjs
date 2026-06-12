import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import net from "node:net";
import { dirname, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const serverEntry = resolve(projectRoot, "front-end/.output/server/index.mjs");

const routeExpectations = {
	"/claim-roadmap": {
		location: "/account/editorial#canonical-backlog",
		robots: "noindex, follow",
		status: 301
	},
	"/evidence-ops": {
		location: "/standards",
		robots: "noindex, follow",
		status: 301
	},
	"/future-roadmap": {
		location: "/account/editorial#future-roadmap",
		robots: "noindex, follow",
		status: 301
	},
	"/governance": {
		location: "/account/editorial#moderation-guide",
		robots: "noindex, follow",
		status: 301
	},
	"/how": {
		location: "/standards",
		robots: "noindex, follow",
		status: 301
	},
	"/methods": {
		location: "/standards",
		robots: "noindex, follow",
		status: 301
	},
	"/policy-center": {
		location: "/standards",
		robots: "noindex, follow",
		status: 301
	},
	"/search-demand": {
		location: "/account/editorial#search-demand-signals",
		robots: "noindex, follow",
		status: 301
	},
	"/source-standards": {
		robots: "noindex, follow",
		status: 200
	},
	"/account": {
		robots: "noindex, nofollow",
		status: 200
	},
	"/setup": {
		robots: "noindex, nofollow",
		status: 404
	}
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
	console.warn(`[ssr-routes] Port ${port} is unavailable; using ${selectedPort}.`);
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

async function fetchRoute(baseUrl, route) {
	const response = await fetch(`${baseUrl}${route}`, {
		redirect: "manual",
		signal: AbortSignal.timeout(8_000)
	});
	const location = response.headers.get("location");
	const resolvedLocation = location
		? `${new URL(location, baseUrl).pathname}${new URL(location, baseUrl).hash}`
		: undefined;
	return {
		location: resolvedLocation,
		robots: response.headers.get("x-robots-tag") || "",
		status: response.status
	};
}

function assertRoute(route, actual, expected) {
	if (actual.status !== expected.status) {
		throw new Error(`${route} returned ${actual.status}; expected ${expected.status}.`);
	}
	if (actual.robots !== expected.robots) {
		throw new Error(`${route} returned X-Robots-Tag ${actual.robots}; expected ${expected.robots}.`);
	}
	if (expected.location && actual.location !== expected.location) {
		throw new Error(`${route} redirected to ${actual.location}; expected ${expected.location}.`);
	}
	if (!expected.location && actual.location) {
		throw new Error(`${route} unexpectedly redirected to ${actual.location}.`);
	}
}

if (!existsSync(serverEntry)) {
	throw new Error("Missing front-end/.output/server/index.mjs. Run npm run build before npm run smoke:ssr-routes.");
}

const reservedPorts = new Set();
const port = await choosePort("SSR_ROUTE_SMOKE_PORT", 4069, reservedPorts);
const baseUrl = `http://127.0.0.1:${port}`;
const serverProcess = startServer(port);

try {
	await waitForText(baseUrl, "Is There Consensus?");

	for (const [route, expectation] of Object.entries(routeExpectations)) {
		const actual = await fetchRoute(baseUrl, route);
		assertRoute(route, actual, expectation);
		console.log(`ssr route ok: ${route}`);
	}

	console.log(`ssr route rules ok: ${baseUrl}`);
}
finally {
	await stopProcessTree(serverProcess);
}
