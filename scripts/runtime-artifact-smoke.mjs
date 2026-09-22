import assert from "node:assert/strict";
import { spawn, spawnSync } from "node:child_process";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const sourceArtifact = path.join(root, ".runtime-artifact");
const verifier = path.join(root, "scripts/verify-runtime-artifact.mjs");

function cleanEnvironment(overrides = {}) {
	return {
		HOME: process.env.HOME || "",
		LANG: "C.UTF-8",
		PATH: process.env.PATH || "",
		...overrides
	};
}

function runSync(label, command, args, options = {}) {
	const result = spawnSync(command, args, {
		encoding: "utf8",
		maxBuffer: 20 * 1024 * 1024,
		...options
	});
	if (result.error) throw result.error;
	return { ...result, output: `${result.stdout || ""}${result.stderr || ""}`, label };
}

async function ephemeralPort() {
	return new Promise((resolve, reject) => {
		const server = net.createServer();
		server.unref();
		server.once("error", reject);
		server.listen(0, "127.0.0.1", () => {
			const address = server.address();
			const port = typeof address === "object" && address ? address.port : 0;
			server.close(() => port ? resolve(port) : reject(new Error("Could not allocate a loopback port.")));
		});
	});
}

function startService(entrypoint, cwd, env) {
	const child = spawn(process.execPath, [entrypoint], {
		cwd,
		detached: process.platform !== "win32",
		env,
		stdio: ["ignore", "pipe", "pipe"]
	});
	let output = "";
	for (const stream of [child.stdout, child.stderr]) {
		stream.on("data", data => {
			output += data.toString();
			if (output.length > 100_000) output = output.slice(-100_000);
		});
	}
	return { child, output: () => output };
}

function running(child) {
	return child.exitCode === null && child.signalCode === null;
}

async function waitForExit(child, timeoutMs) {
	if (!running(child)) return true;
	return new Promise(resolve => {
		const timer = setTimeout(() => {
			child.off("exit", onExit);
			resolve(false);
		}, timeoutMs);
		const onExit = () => {
			clearTimeout(timer);
			resolve(true);
		};
		child.once("exit", onExit);
	});
}

async function stopService(service) {
	if (!running(service.child) || !service.child.pid) return;
	const target = process.platform === "win32" ? service.child.pid : -service.child.pid;
	process.kill(target, "SIGTERM");
	if (await waitForExit(service.child, 10_000)) return;
	process.kill(target, "SIGKILL");
	await waitForExit(service.child, 2_000);
}

async function waitForResponse(service, url, expectedStatus = 200, timeoutMs = 45_000) {
	const started = Date.now();
	let lastError;
	while (Date.now() - started < timeoutMs) {
		if (!running(service.child)) {
			throw new Error(`Service exited before ${url} became ready.\n${service.output()}`);
		}
		try {
			const response = await fetch(url, { signal: AbortSignal.timeout(4_000) });
			if (response.status === expectedStatus) return response;
			lastError = new Error(`${url} returned ${response.status}; expected ${expectedStatus}.`);
		}
		catch (error) {
			lastError = error;
		}
		await new Promise(resolve => setTimeout(resolve, 250));
	}
	throw new Error(`${lastError instanceof Error ? lastError.message : `Timed out waiting for ${url}`}\n${service.output()}`);
}

async function assertProbe(baseUrl, route) {
	const getResponse = await fetch(`${baseUrl}${route}`, { signal: AbortSignal.timeout(5_000) });
	assert.equal(getResponse.status, 200);
	assert.equal(getResponse.headers.get("cache-control"), "no-store");
	assert.equal(getResponse.headers.get("set-cookie"), null);
	assert.deepEqual(await getResponse.json(), { ok: true });

	const headResponse = await fetch(`${baseUrl}${route}`, {
		method: "HEAD",
		signal: AbortSignal.timeout(5_000)
	});
	assert.equal(headResponse.status, 200);
	assert.equal(headResponse.headers.get("cache-control"), "no-store");
	assert.equal(headResponse.headers.get("set-cookie"), null);
	assert.equal(await headResponse.text(), "");
}

const acceptanceRoot = await mkdtemp(path.join(os.tmpdir(), "isthereconsensus-runtime-acceptance-"));
const artifactRoot = path.join(acceptanceRoot, "artifact");
const emptyEnvironment = path.join(acceptanceRoot, "empty.env");

try {
	await cp(sourceArtifact, artifactRoot, { recursive: true });
	await writeFile(emptyEnvironment, "");
	const manifest = JSON.parse(await readFile(path.join(artifactRoot, ".runtime-manifest.json"), "utf8"));

	const verification = runSync("artifact verification", process.execPath, [verifier, artifactRoot], {
		cwd: acceptanceRoot,
		env: cleanEnvironment({ RUNTIME_ARTIFACT_EXPECT_COMMIT: manifest.source.commit })
	});
	assert.equal(verification.status, 0, verification.output);

	const backendFailClosed = runSync(
		"backend fail-closed startup",
		process.execPath,
		[path.join(artifactRoot, "back-end/dist/server.js")],
		{
			cwd: artifactRoot,
			env: cleanEnvironment({
				DOTENV_CONFIG_PATH: emptyEnvironment,
				NODE_ENV: "production"
			}),
			timeout: 15_000
		}
	);
	assert.notEqual(backendFailClosed.status, 0);
	assert.doesNotMatch(backendFailClosed.output, /ERR_MODULE_NOT_FOUND/u);
	assert.match(backendFailClosed.output, /Server startup failed: Error/u);

	const seedFailClosed = runSync(
		"seed fail-closed startup",
		process.execPath,
		[path.join(artifactRoot, "back-end/dist/scripts/seedContent.js")],
		{
			cwd: artifactRoot,
			env: cleanEnvironment({
				DOTENV_CONFIG_PATH: emptyEnvironment,
				NODE_ENV: "production"
			}),
			timeout: 15_000
		}
	);
	assert.notEqual(seedFailClosed.status, 0);
	assert.doesNotMatch(seedFailClosed.output, /ERR_MODULE_NOT_FOUND/u);
	assert.match(seedFailClosed.output, /Seed content failed: Error/u);

	const webPort = await ephemeralPort();
	const webBaseUrl = `http://127.0.0.1:${webPort}`;
	const web = startService(
		path.join(artifactRoot, "front-end/.output/server/index.mjs"),
		artifactRoot,
		cleanEnvironment({
			HOST: "127.0.0.1",
			NITRO_HOST: "127.0.0.1",
			NITRO_PORT: String(webPort),
			NODE_ENV: "production",
			PORT: String(webPort)
		})
	);
	try {
		const homepage = await waitForResponse(web, `${webBaseUrl}/`);
		assert.match(await homepage.text(), /Is There Consensus/u);
		await assertProbe(webBaseUrl, "/healthz");
		await assertProbe(webBaseUrl, "/readyz");
	}
	finally {
		await stopService(web);
	}
	assert.equal(web.child.exitCode, 0, `Web service did not shut down cleanly.\n${web.output()}`);

	const mongoUri = process.env.RUNTIME_ARTIFACT_MONGO_URI;
	if (mongoUri) {
		const seed = runSync(
			"seed entrypoint",
			process.execPath,
			[path.join(artifactRoot, "back-end/dist/scripts/seedContent.js")],
			{
				cwd: artifactRoot,
				env: cleanEnvironment({
					DOTENV_CONFIG_PATH: emptyEnvironment,
					MONGODB_URI: mongoUri,
					NODE_ENV: "production",
					SEED_CONTENT_MODE: "insert"
				}),
				timeout: 180_000
			}
		);
		assert.equal(seed.status, 0, seed.output);
		assert.doesNotMatch(seed.output, /ERR_MODULE_NOT_FOUND/u);

		const apiPort = await ephemeralPort();
		const apiBaseUrl = `http://127.0.0.1:${apiPort}`;
		const api = startService(
			path.join(artifactRoot, "back-end/dist/server.js"),
			artifactRoot,
			cleanEnvironment({
				CAPTCHA_SECRET: "artifact-captcha-secret-0000000000000000",
				DOTENV_CONFIG_PATH: emptyEnvironment,
				HOST: "127.0.0.1",
				MONGODB_URI: mongoUri,
				NODE_ENV: "production",
				PORT: String(apiPort),
				PUBLIC_CAPTCHA_SITEKEY: "artifact-public-key",
				PUBLIC_SITE_URL: "https://example.test",
				SESSION_SECRET: "artifact-session-secret-0000000000000000",
				TRUST_PROXY_IPS: "127.0.0.1,::1"
			})
		);
		try {
			await waitForResponse(api, `${apiBaseUrl}/readyz`);
			await assertProbe(apiBaseUrl, "/healthz");
			await assertProbe(apiBaseUrl, "/readyz");
		}
		finally {
			await stopService(api);
		}
		assert.equal(api.child.exitCode, 0, `API service did not shut down cleanly.\n${api.output()}`);
	}
	else {
		process.stdout.write("Synthetic MongoDB URI not supplied; isolated dependency-ready API acceptance is deferred to CI.\n");
	}

	await rm(path.join(artifactRoot, "back-end/dist/utils/runtimeSecurity.js"));
	const missingModule = runSync("missing module regression", process.execPath, [verifier, artifactRoot], {
		cwd: acceptanceRoot,
		env: cleanEnvironment({ RUNTIME_ARTIFACT_EXPECT_COMMIT: manifest.source.commit })
	});
	assert.notEqual(missingModule.status, 0);
	assert.match(missingModule.output, /inventory or hash mismatch.*runtimeSecurity\.js/iu);

	process.stdout.write("Runtime artifact smoke passed in an isolated directory.\n");
}
finally {
	await rm(acceptanceRoot, { force: true, recursive: true });
}
