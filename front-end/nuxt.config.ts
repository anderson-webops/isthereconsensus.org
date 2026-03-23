// noinspection ES6PreferShortImport

import type { ModuleOptions as ColorModeOptions } from "@nuxtjs/color-mode";
import type { ModuleOptions as PwaModuleOptions } from "@vite-pwa/nuxt";
import type { NuxtConfig } from "nuxt/schema";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";
import { defineNuxtConfig } from "nuxt/config";
import { devSwEnabled, pwa } from "./src/config/pwa";
import { appDescription } from "./src/constants";

const __dirname: string = path.dirname(fileURLToPath(import.meta.url));
const srcPath: string = path.resolve(__dirname, "src");
const srcAlias = `${srcPath}/`;
const backendEnvPath = path.resolve(__dirname, "../back-end/.env");
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
const enablePwaEnv = process.env.ENABLE_PWA === "true" || process.env.VITE_PLUGIN_PWA === "true";
const enablePwa = enablePwaEnv && (!isDev || devSwEnabled);
const manifestLinks = enablePwa ? [{ rel: "manifest", href: "/manifest.webmanifest" }] : [];
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
	...manifestLinks
];

type ExtendedNuxtConfig = NuxtConfig & {
	colorMode?: Partial<ColorModeOptions>;
	pwa?: PwaModuleOptions | false;
};

type ColorModePreference = "light" | "dark" | "system";
const contentColorPreference: ColorModePreference = "light";
const colorModeFallback: Exclude<ColorModePreference, "system"> = "light";

export default defineNuxtConfig({
	alias: {
		"~": srcAlias,
		"@": srcAlias
	},

	modules: ["@vueuse/nuxt", "@unocss/nuxt", "@pinia/nuxt", "@nuxtjs/color-mode", "@vite-pwa/nuxt", "@nuxt/eslint"],

	srcDir: "src",

	devtools: {
		enabled: true
	},

	app: {
		head: {
			viewport: "width=device-width,initial-scale=1",
			link: faviconLinks,
			meta: [
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ name: "description", content: appDescription },
				{ name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
				{ name: "theme-color", media: "(prefers-color-scheme: light)", content: "white" },
				{ name: "theme-color", media: "(prefers-color-scheme: dark)", content: "#222222" }
			],
			script: isDev
				? []
				: [
						{
							defer: true,
							src: "https://analytics.isthereconsensus.org/script.js",
							"data-website-id": "6a5e2165-ed75-4c43-9640-b19128069984"
						}
					]
		}
	},

	runtimeConfig: {
		resend: {
			apiKey: process.env.RESEND_API_KEY,
			from: process.env.RESEND_FROM,
			to: process.env.RESEND_TO
		},
		public: {
			pwaDevSw: devSwEnabled,
			apiBase: process.env.PUBLIC_API_BASE || "http://127.0.0.1:3011",
			captchaSiteKey: process.env.PUBLIC_CAPTCHA_SITEKEY || ""
		}
	},

	colorMode: {
		preference: contentColorPreference,
		fallback: colorModeFallback,
		classSuffix: ""
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
			routes: ["/"],
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

	pwa: { ...pwa, disable: !enablePwa },
	vite: {
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
