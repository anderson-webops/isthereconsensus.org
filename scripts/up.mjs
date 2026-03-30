import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const workspaces = [".", "front-end", "back-end"];
const tazeBin = join(rootDir, "node_modules", ".bin", process.platform === "win32" ? "taze.cmd" : "taze");
const dryRun = process.argv.includes("--dry-run");

if (!existsSync(tazeBin)) {
	console.error("taze binary was not found. Run `npm ci` first.");
	process.exit(1);
}

function run(cmd, args, cwd, stdio = "inherit") {
	return spawnSync(cmd, args, { cwd, stdio, encoding: "utf8" });
}

function canUpgradeEslintMajor() {
	const checkDir = mkdtempSync(join(tmpdir(), "itc-eslint-check-"));

	try {
		writeFileSync(
			join(checkDir, "package.json"),
			JSON.stringify(
				{
					name: "itc-eslint-compat-check",
					private: true,
					devDependencies: {
						eslint: "^10.0.1",
						"eslint-plugin-format": "latest",
						"@antfu/eslint-config": "latest",
						"@nuxt/eslint": "latest"
					}
				},
				null,
				2
			)
		);

		const result = spawnSync(
			"npm",
			["install", "--package-lock-only", "--ignore-scripts", "--no-audit", "--no-fund"],
			{ cwd: checkDir, stdio: "pipe", encoding: "utf8", timeout: 20000 }
		);

		// If the probe cannot complete quickly (offline/registry issues), keep the guard on.
		if (result.error)
			return false;

		return result.status === 0;
	}
	finally {
		rmSync(checkDir, { recursive: true, force: true });
	}
}

const allowEslintMajor = canUpgradeEslintMajor();
const tazeArgs = ["major", "-I", ...(allowEslintMajor ? [] : ["-x", "eslint"])];

console.log(
	allowEslintMajor
		? "ESLint major guard: compatibility check passed; eslint major upgrades are enabled."
		: "ESLint major guard: compatibility check failed; eslint major upgrades are excluded for this run."
);

for (const workspace of workspaces) {
	const cwd = workspace === "." ? rootDir : join(rootDir, workspace);
	const label = workspace === "." ? "root" : workspace;

	console.log(`\nUpdating ${label}: ${tazeBin} ${tazeArgs.join(" ")}`);

	if (dryRun)
		continue;

	const result = run(tazeBin, tazeArgs, cwd);
	if (result.status !== 0)
		process.exit(result.status ?? 1);
}
