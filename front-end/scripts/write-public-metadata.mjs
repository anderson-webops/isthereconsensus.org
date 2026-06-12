import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const frontendRoot = resolve(dirname(scriptPath), "..");
const defaultOutputDir = resolve(frontendRoot, ".output");
const defaultRepoRoot = resolve(frontendRoot, "..");

export const staticSecurityTxtBody = `Contact: mailto:consensus@isthereconsensus.org
Policy: https://github.com/anderson-webops/isthereconsensus.org/security/policy
Preferred-Languages: en
Canonical: https://isthereconsensus.org/.well-known/security.txt
Expires: 2027-06-30T23:59:00.000Z
`;

export function readGitValue(repoRoot, args) {
	try {
		return execFileSync("git", args, {
			cwd: repoRoot,
			encoding: "utf8",
			stdio: ["ignore", "pipe", "ignore"]
		}).trim();
	} catch {
		return "";
	}
}

export function readBuildId(outputDir) {
	const latestBuildPath = join(outputDir, "public", "_nuxt", "builds", "latest.json");
	if (!existsSync(latestBuildPath)) return "";

	try {
		const latestBuild = JSON.parse(readFileSync(latestBuildPath, "utf8"));
		return typeof latestBuild?.id === "string" ? latestBuild.id : "";
	} catch {
		return "";
	}
}

export function buildDeploymentMetadata({
	env = process.env,
	outputDir = defaultOutputDir,
	repoRoot = defaultRepoRoot
} = {}) {
	return {
		ok: true,
		service: "front-end",
		runtime: "nuxt-ssr",
		nodeEnv: env.NODE_ENV || "production",
		buildId: readBuildId(outputDir),
		commit:
			env.SOURCE_COMMIT ||
			env.SOURCE_VERSION ||
			env.GITHUB_SHA ||
			env.VERCEL_GIT_COMMIT_SHA ||
			env.COMMIT_SHA ||
			env.BUILD_SHA ||
			readGitValue(repoRoot, ["rev-parse", "--short=12", "HEAD"]),
		ref:
			env.SOURCE_TAG ||
			env.RELEASE_VERSION ||
			env.GITHUB_REF_NAME ||
			env.BRANCH_NAME ||
			readGitValue(repoRoot, ["describe", "--tags", "--exact-match"]),
		siteUrl: env.PUBLIC_SITE_URL || "https://isthereconsensus.org"
	};
}

export function writePublicMetadata({
	env = process.env,
	outputDir = defaultOutputDir,
	repoRoot = defaultRepoRoot
} = {}) {
	const publicDir = join(outputDir, "public");
	if (!existsSync(publicDir)) {
		throw new Error(`Missing Nuxt public output at ${publicDir}. Run nuxt build before writing public metadata.`);
	}

	const wellKnownDir = join(publicDir, ".well-known");
	mkdirSync(wellKnownDir, { recursive: true });

	const deployment = `${JSON.stringify(buildDeploymentMetadata({ env, outputDir, repoRoot }), null, 2)}\n`;
	writeFileSync(join(publicDir, "deployment.json"), deployment);
	writeFileSync(join(wellKnownDir, "security.txt"), staticSecurityTxtBody);
	writeFileSync(join(publicDir, "security.txt"), staticSecurityTxtBody);
}

if (process.argv[1] && resolve(process.argv[1]) === scriptPath) {
	writePublicMetadata({
		outputDir: process.env.PUBLIC_METADATA_OUTPUT_DIR
			? resolve(process.env.PUBLIC_METADATA_OUTPUT_DIR)
			: defaultOutputDir
	});
}
