import { cp, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import { spawn } from "node:child_process";

const root = process.cwd();
const frontendManifest = JSON.parse(await readFile(path.join(root, "front-end/package.json"), "utf8"));

function run(command, args, cwd) {
	return new Promise((resolve, reject) => {
		const child = spawn(command, args, {
			cwd,
			env: {
				...process.env,
				PUPPETEER_SKIP_DOWNLOAD: "true"
			},
			stdio: "inherit"
		});
		child.once("error", reject);
		child.once("exit", code => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
	});
}

async function verifyTarget(libc) {
	const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), `isthereconsensus-linux-arm64-${libc}-`));
	try {
		await Promise.all([
			mkdir(path.join(temporaryRoot, "back-end"), { recursive: true }),
			mkdir(path.join(temporaryRoot, "front-end"), { recursive: true })
		]);
		await Promise.all([
			cp(path.join(root, "package.json"), path.join(temporaryRoot, "package.json")),
			cp(path.join(root, "package-lock.json"), path.join(temporaryRoot, "package-lock.json")),
			cp(path.join(root, ".npmrc"), path.join(temporaryRoot, ".npmrc")),
			cp(path.join(root, "back-end/package.json"), path.join(temporaryRoot, "back-end/package.json"), {
				recursive: true
			}),
			cp(path.join(root, "front-end/package.json"), path.join(temporaryRoot, "front-end/package.json"), {
				recursive: true
			})
		]);
		await run(
			process.execPath.replace(/node$/, "npm"),
			[
				"ci",
				"--ignore-scripts",
				"--include=optional",
				"--no-audit",
				"--no-fund",
				"--os=linux",
				"--cpu=arm64",
				`--libc=${libc}`
			],
			temporaryRoot
		);

		const expected = Object.keys(frontendManifest.optionalDependencies || {}).filter((dependency) => {
			if (dependency === "@esbuild/linux-arm64") return true;
			return dependency.includes("linux-arm64") && dependency.endsWith(libc === "musl" ? "-musl" : "-gnu");
		});
		const missing = [];
		for (const dependency of expected) {
			try {
				await readFile(path.join(temporaryRoot, "node_modules", dependency, "package.json"), "utf8");
			}
			catch {
				missing.push(dependency);
			}
		}
		if (missing.length) {
			throw new Error(`Linux ARM64 ${libc} install omitted native packages: ${missing.join(", ")}`);
		}
		process.stdout.write(`Verified Linux ARM64 ${libc} clean install (${expected.length} native packages).\n`);
	}
	finally {
		await rm(temporaryRoot, { force: true, recursive: true });
	}
}

await verifyTarget("glibc");
await verifyTarget("musl");
