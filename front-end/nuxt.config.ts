// noinspection ES6PreferShortImport

import type { ModuleOptions as ColorModeOptions } from "@nuxtjs/color-mode";
import type { NuxtConfig } from "nuxt/schema";
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { defineNuxtConfig } from "nuxt/config";
import { appDescription, appName } from "./src/constants";
import { normalizeInternalApiBase, normalizePublicApiBase } from "./src/utils/api";

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const srcPath: string = path.resolve(__dirname, "src");
const srcAlias = `${srcPath}/`;
const backendEnvPath = path.resolve(__dirname, "../back-end/.env");

function readGitValue(args: string[]): string {
	try {
		return execFileSync("git", args, {
			cwd: path.resolve(__dirname, ".."),
			encoding: "utf8",
			stdio: ["ignore", "pipe", "ignore"]
		}).trim();
	} catch {
		return "";
	}
}

const envPathCandidates = [process.env.NUXT_ENV_PATH, process.env.APP_ENV_PATH, backendEnvPath].filter(
	Boolean
) as string[];
const loadedEnvPaths = new Set<string>();

for (const envPath of envPathCandidates) {
	if (loadedEnvPaths.has(envPath)) continue;
	if (existsSync(envPath)) {
		loadEnv({ path: envPath, override: false });
		loadedEnvPaths.add(envPath);
	}
}

const isDev = process.env.NODE_ENV === "development";
const publicApiBase = normalizePublicApiBase(process.env.PUBLIC_API_BASE, isDev);
const internalApiBase = normalizeInternalApiBase(process.env.INTERNAL_API_BASE || process.env.API_INTERNAL_BASE);
const deploymentCommit =
	process.env.SOURCE_COMMIT ||
	process.env.SOURCE_VERSION ||
	process.env.GITHUB_SHA ||
	process.env.VERCEL_GIT_COMMIT_SHA ||
	process.env.COMMIT_SHA ||
	process.env.BUILD_SHA ||
	readGitValue(["rev-parse", "--short=12", "HEAD"]);
const deploymentRef =
	process.env.SOURCE_TAG ||
	process.env.RELEASE_VERSION ||
	process.env.GITHUB_REF_NAME ||
	process.env.BRANCH_NAME ||
	readGitValue(["describe", "--tags", "--exact-match"]);
const centralAnalyticsDomain = "analytics.jacobdanderson.net";
const centralAnalyticsWebsiteId = "2d20f4af-99de-4944-8f56-91ea2a32065d";
const faviconLinks = [
	{
		rel: "icon",
		type: "image/svg+xml",
		href: "/favicon.svg"
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "32x32",
		href: "/favicon-32x32.png"
	},
	{
		rel: "icon",
		type: "image/png",
		sizes: "16x16",
		href: "/favicon-16x16.png"
	},
	{
		rel: "shortcut icon",
		href: "/favicon.ico"
	},
	{
		rel: "apple-touch-icon",
		sizes: "180x180",
		href: "/apple-touch-icon.png"
	},
	{
		rel: "manifest",
		href: "/site.webmanifest"
	}
];

type ExtendedNuxtConfig = NuxtConfig & {
	colorMode?: Partial<ColorModeOptions>;
};

type ColorModePreference = "light" | "dark" | "system";
const contentColorPreference: ColorModePreference = "system";
const colorModeFallback: Exclude<ColorModePreference, "system"> = "light";
const devtoolsEnabled = process.env.NUXT_DEVTOOLS_ENABLED
	? process.env.NUXT_DEVTOOLS_ENABLED === "true"
	: process.env.CI !== "true";
const privateNoindexHeaders = {
	"X-Robots-Tag": "noindex, nofollow"
};
const legacyNoindexHeaders = {
	"X-Robots-Tag": "noindex, follow"
};

export default defineNuxtConfig({
	alias: {
		"~": srcAlias,
		"@": srcAlias
	},

	modules: ["@vueuse/nuxt", "@unocss/nuxt", "@pinia/nuxt", "@nuxtjs/color-mode", "@nuxt/eslint"],

	srcDir: "src",

	devtools: {
		enabled: devtoolsEnabled
	},

	app: {
		head: {
			viewport: "width=device-width,initial-scale=1",
			link: faviconLinks,
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "description", content: appDescription },
				{ name: "application-name", content: appName },
				{ name: "apple-mobile-web-app-title", content: appName },
				{ name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
				{ name: "theme-color", media: "(prefers-color-scheme: light)", content: "#fbf8f3" },
				{ name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#0c1117" }
			],
			script: isDev
				? []
				: [
						{
							defer: true,
							src: "https://analytics.isthereconsensus.org/script.js",
							"data-website-id": "6a5e2165-ed75-4c43-9640-b19128069984"
						},
						{
							defer: true,
							src: `https://${centralAnalyticsDomain}/script.js`,
							"data-website-id": centralAnalyticsWebsiteId
						}
					]
		}
	},

	runtimeConfig: {
		apiInternalBase: internalApiBase,
		internalDiagnosticsKey: process.env.INTERNAL_DIAGNOSTICS_KEY || "",
		resend: {
			apiKey: process.env.RESEND_API_KEY,
			from: process.env.RESEND_FROM,
			to: process.env.RESEND_TO
		},
		public: {
			apiBase: publicApiBase,
			siteUrl: process.env.PUBLIC_SITE_URL || "https://isthereconsensus.org",
			captchaSiteKey: process.env.PUBLIC_CAPTCHA_SITEKEY || "",
			deployment: {
				commit: deploymentCommit || "",
				ref: deploymentRef || ""
			}
		}
	},

	colorMode: {
		preference: contentColorPreference,
		fallback: colorModeFallback,
		classSuffix: ""
	},

	routeRules: {
		"/account": {
			headers: privateNoindexHeaders
		},
		"/account/**": {
			headers: privateNoindexHeaders
		},
		"/api/**": {
			headers: privateNoindexHeaders
		},
		"/claim-roadmap": {
			headers: legacyNoindexHeaders,
			redirect: {
				to: "/account/editorial#canonical-backlog",
				statusCode: 301
			}
		},
		"/evidence-ops": {
			headers: legacyNoindexHeaders,
			redirect: {
				to: "/standards",
				statusCode: 301
			}
		},
		"/future-roadmap": {
			headers: legacyNoindexHeaders,
			redirect: {
				to: "/account/editorial#future-roadmap",
				statusCode: 301
			}
		},
		"/governance": {
			headers: legacyNoindexHeaders,
			redirect: {
				to: "/account/editorial#moderation-guide",
				statusCode: 301
			}
		},
		"/how": {
			headers: legacyNoindexHeaders,
			redirect: {
				to: "/standards",
				statusCode: 301
			}
		},
		"/methods": {
			headers: legacyNoindexHeaders,
			redirect: {
				to: "/standards",
				statusCode: 301
			}
		},
		"/policy-center": {
			headers: legacyNoindexHeaders,
			redirect: {
				to: "/standards",
				statusCode: 301
			}
		},
		"/search-demand": {
			headers: legacyNoindexHeaders,
			redirect: {
				to: "/account/editorial#search-demand-signals",
				statusCode: 301
			}
		},
		"/setup": {
			headers: privateNoindexHeaders
		},
		"/setup/**": {
			headers: privateNoindexHeaders
		},
		"/source-standards": {
			headers: legacyNoindexHeaders
		}
	},

	// Production source maps are not part of the deployment output and they currently
	// trigger noisy Vite warnings from Nuxt's module preload polyfill transform.
	sourcemap: {
		client: false,
		server: false
	},

	future: {
		compatibilityVersion: 4
	},

	experimental: {
		// when using generate, payload js assets included in sw precache manifest
		// but missing on offline, disabling extraction it until fixed
		payloadExtraction: false,
		renderJsonPayloads: true,
		typedPages: true
	},

	compatibilityDate: "2024-08-14",

	nitro: {
		esbuild: {
			options: {
				target: "esnext"
			}
		},
		prerender: {
			crawlLinks: false,
			routes: [],
			ignore: []
		}
	},

	eslint: {
		config: {
			standalone: false,
			nuxt: {
				sortConfigKeys: true
			}
		}
	},
	vite: {
		build: {
			modulePreload: {
				polyfill: false
			}
		},
		resolve: {
			alias: {
				"~": srcPath,
				"@": srcPath
			}
		},
		server: {
			fs: {
				allow: [path.resolve(__dirname, "..", "..")]
			}
		}
	}
} as ExtendedNuxtConfig) as ExtendedNuxtConfig;
