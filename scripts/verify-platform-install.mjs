import { spawn } from "node:child_process";
import { cp, lstat, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const scratchRoot = path.join(root, ".ai-work", "runs");
const frontendManifest = JSON.parse(await readFile(path.join(root, "front-end/package.json"), "utf8"));

function run(command, args, cwd) {
	return new Promise((resolve, reject) => {
		const env = {
			...process.env,
			PUPPETEER_SKIP_DOWNLOAD: "true"
		};
		delete env.npm_config_global_ignore_file;
		delete env.NPM_CONFIG_GLOBAL_IGNORE_FILE;
		const child = spawn(command, args, {
			cwd,
			env,
			stdio: "inherit"
		});
		child.once("error", reject);
		child.once("exit", code => code === 0 ? resolve() : reject(new Error(`${command} exited with ${code}`)));
	});
}

async function verifyTarget(libc) {
	const npmExecPath = process.env.npm_execpath;
	if (!npmExecPath) throw new Error("Run verify:platform-install through npm so the selected npm executable is known.");
	await mkdir(scratchRoot, { recursive: true });
	const temporaryRoot = await mkdtemp(path.join(scratchRoot, `isthereconsensus-linux-arm64-${libc}-`));
	try {
		await Promise.all([
			mkdir(path.join(temporaryRoot, "back-end"), { recursive: true }),
			mkdir(path.join(temporaryRoot, "search-worker"), { recursive: true }),
			mkdir(path.join(temporaryRoot, "front-end"), { recursive: true })
		]);
		await Promise.all([
			cp(path.join(root, "package.json"), path.join(temporaryRoot, "package.json")),
			cp(path.join(root, "package-lock.json"), path.join(temporaryRoot, "package-lock.json")),
			cp(path.join(root, ".npmrc"), path.join(temporaryRoot, ".npmrc")),
			cp(path.join(root, "vendor"), path.join(temporaryRoot, "vendor"), { recursive: true }),
			cp(path.join(root, "back-end/package.json"), path.join(temporaryRoot, "back-end/package.json"), {
				recursive: true
			}),
			cp(path.join(root, "front-end/package.json"), path.join(temporaryRoot, "front-end/package.json"), {
				recursive: true
			}),
			cp(path.join(root, "search-worker/package.json"), path.join(temporaryRoot, "search-worker/package.json"))
		]);
		await run(
			process.execPath,
			[
				npmExecPath,
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

		const expected = Object.entries(frontendManifest.optionalDependencies || {}).filter(([dependency]) => {
			if (dependency === "@esbuild/linux-arm64") return true;
			return dependency.includes("linux-arm64") && dependency.endsWith(libc === "musl" ? "-musl" : "-gnu");
		});
		const missing = [];
		for (const [dependency, expectedVersion] of expected) {
			let found = false;
			for (const installRoot of [temporaryRoot, path.join(temporaryRoot, "front-end")]) {
				try {
					const installed = JSON.parse(
						await readFile(path.join(installRoot, "node_modules", dependency, "package.json"), "utf8")
					);
					if (installed.version === expectedVersion) {
						found = true;
						break;
					}
				}
				catch {
					// Continue through valid npm workspace install locations.
				}
			}
			if (!found) missing.push(`${dependency}@${expectedVersion}`);
		}
		if (missing.length) {
			throw new Error(`Linux ARM64 ${libc} install omitted native packages: ${missing.join(", ")}`);
		}
		if (libc === "glibc") {
			const runtimeDirectory = path.join(temporaryRoot, "search-worker/node_modules/onnxruntime-node");
			const metadata = JSON.parse(await readFile(path.join(runtimeDirectory, "package.json"), "utf8"));
			if (metadata.version !== "1.30.0") throw new Error("The worker native runtime is not the reviewed version.");
			for (const filename of ["onnxruntime_binding.node", "libonnxruntime.so.1"]) {
				const absolutePath = path.join(runtimeDirectory, "bin/napi-v6/linux/arm64", filename);
				const stat = await lstat(absolutePath);
				const bytes = await readFile(absolutePath);
				if (!stat.isFile() || stat.isSymbolicLink() || bytes.subarray(0, 4).toString("hex") !== "7f454c46" || bytes[4] !== 2 || bytes[5] !== 1 || bytes.readUInt16LE(18) !== 183) {
					throw new Error("The worker install lacks its genuine Linux ARM64 ELF binding or shared library.");
				}
			}
			process.stdout.write("Verified pinned worker Linux ARM64 ELF files; this cross-install is not native inference or capacity acceptance.\n");
		}
		process.stdout.write(`Verified Linux ARM64 ${libc} clean install (${expected.length} native packages).\n`);
	}
	finally {
		await rm(temporaryRoot, { force: true, recursive: true });
	}
}

await verifyTarget("glibc");
await verifyTarget("musl");
