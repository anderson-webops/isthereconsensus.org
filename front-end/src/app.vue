<script setup lang="ts">
import { appDescription, appName } from "~/constants";

const siteUrl = "https://isthereconsensus.org";
const route = useRoute();
const canonicalUrl = computed(() => new URL(route.path || "/", `${siteUrl}/`).toString());
const noindexRoute = computed(() => /^\/account(?:\/|$)/.test(route.path));
const structuredData = [
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		"description": appDescription,
		"name": appName,
		"url": siteUrl
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"description": appDescription,
		"name": appName,
		"url": siteUrl
	}
];

useHead(() => ({
	title: appName,
	meta: noindexRoute.value
		? [
				{
					name: "robots",
					content: "noindex,nofollow"
				}
			]
		: [],
	link: [
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
		},
		{
			rel: "canonical",
			href: canonicalUrl.value
		}
	],
	script: structuredData.map((entry, index) => ({
		children: JSON.stringify(entry),
		key: `structured-data-${index}`,
		type: "application/ld+json"
	}))
}));

useSeoMeta(() => ({
	description: appDescription,
	ogDescription: appDescription,
	ogSiteName: appName,
	ogType: "website",
	ogUrl: canonicalUrl.value,
	twitterCard: "summary_large_image",
	twitterDescription: appDescription,
	twitterTitle: appName
}));
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
:root {
	color-scheme: light;
	--consensus-ink: #15110d;
	--consensus-muted: #5d544f;
	--consensus-cream: #f6f1e8;
	--consensus-sand: #e7d6c4;
	--consensus-ember: #d36b38;
	--consensus-moss: #35524a;
	--consensus-mist: #fbf8f3;
	--consensus-surface: #fffdf9;
	--consensus-line: rgba(21, 17, 13, 0.12);
	--consensus-soft-line: rgba(21, 17, 13, 0.08);
	--consensus-soft-accent: rgba(211, 107, 56, 0.1);
	--consensus-field-surface: #ffffff;
	--consensus-elevated-surface: rgba(255, 255, 255, 0.74);
	--consensus-on-accent: #ffffff;
	--consensus-page-background:
		radial-gradient(circle at top right, rgba(211, 107, 56, 0.08), transparent 24%),
		radial-gradient(circle at top left, rgba(53, 82, 74, 0.07), transparent 22%), var(--consensus-mist);
	--consensus-shell-shadow: 0 24px 60px rgba(21, 17, 13, 0.06);
}

.dark {
	color-scheme: dark;
	--consensus-ink: #edf2f7;
	--consensus-muted: #a4afbd;
	--consensus-cream: #171d26;
	--consensus-sand: #273241;
	--consensus-ember: #d88a63;
	--consensus-moss: #7c9a90;
	--consensus-mist: #0c1117;
	--consensus-surface: #121821;
	--consensus-line: rgba(237, 242, 247, 0.16);
	--consensus-soft-line: rgba(237, 242, 247, 0.08);
	--consensus-soft-accent: rgba(216, 138, 99, 0.12);
	--consensus-field-surface: #171f2a;
	--consensus-elevated-surface: rgba(23, 31, 42, 0.88);
	--consensus-on-accent: #f8fafc;
	--consensus-page-background:
		radial-gradient(circle at top right, rgba(216, 138, 99, 0.12), transparent 20%),
		radial-gradient(circle at top left, rgba(124, 154, 144, 0.12), transparent 24%),
		linear-gradient(180deg, #0c1117 0%, #101722 100%);
	--consensus-shell-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
}

html,
body,
#__nuxt {
	min-height: 100%;
	width: 100%;
	max-width: 100%;
	margin: 0;
	padding: 0;
	background: var(--consensus-page-background);
	color: var(--consensus-ink);
	font-family: "Space Grotesk", system-ui, sans-serif;
	overflow-x: clip;
	transition:
		background-color 180ms ease,
		color 180ms ease,
		border-color 180ms ease,
		box-shadow 180ms ease;
}

* {
	box-sizing: border-box;
}

img,
svg,
canvas,
video {
	max-width: 100%;
	height: auto;
}

body {
	line-height: 1.5;
}

img {
	max-width: 100%;
}

button,
input,
textarea,
select {
	font: inherit;
	color: inherit;
	transition:
		background-color 180ms ease,
		color 180ms ease,
		border-color 180ms ease,
		box-shadow 180ms ease;
}

a {
	color: inherit;
}

.eyebrow {
	text-transform: uppercase;
	letter-spacing: 0.18em;
	font-size: 0.73rem;
	color: var(--consensus-muted);
}
</style>
