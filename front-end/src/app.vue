<script setup lang="ts">
import { appDescription, appName, siteUrl, socialImageUrl } from "~/constants";

const privateRoutePattern = /^(?:\/account|\/api|\/setup)(?:\/|$)/;
const route = useRoute();
const canonicalUrl = computed(() => new URL(route.path || "/", `${siteUrl}/`).toString());
const noindexRoute = computed(() => privateRoutePattern.test(route.path));
const structuredData = [
	{
		"@context": "https://schema.org",
		"@type": "Organization",
		description: appDescription,
		name: appName,
		url: siteUrl
	},
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		description: appDescription,
		name: appName,
		url: siteUrl
	}
];

useHead(() => ({
	htmlAttrs: {
		lang: "en"
	},
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
		innerHTML: JSON.stringify(entry),
		key: `structured-data-${index}`,
		type: "application/ld+json"
	}))
}));

useSeoMeta({
	description: appDescription,
	ogDescription: appDescription,
	ogImage: socialImageUrl,
	ogImageAlt: `${appName} preview card`,
	ogImageHeight: "630",
	ogImageWidth: "1200",
	ogSiteName: appName,
	ogType: "website",
	ogUrl: () => canonicalUrl.value,
	twitterCard: "summary_large_image",
	twitterDescription: appDescription,
	twitterImage: socialImageUrl,
	twitterImageAlt: `${appName} preview card`,
	twitterTitle: appName
});
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
	--consensus-ember: #a64620;
	--consensus-moss: #35524a;
	--consensus-mist: #fbf8f3;
	--consensus-surface: #fffdf9;
	--consensus-line: rgba(21, 17, 13, 0.12);
	--consensus-soft-line: rgba(21, 17, 13, 0.08);
	--consensus-soft-accent: rgba(211, 107, 56, 0.1);
	--consensus-field-surface: #ffffff;
	--consensus-elevated-surface: rgba(255, 255, 255, 0.74);
	--consensus-on-accent: #ffffff;
	--consensus-link: #0f766e;
	--consensus-focus-outline: #c25b2c;
	--consensus-focus-ring: rgba(211, 107, 56, 0.22);
	--consensus-home-title-size: 3.35rem;
	--consensus-page-title-size: 3.15rem;
	--consensus-page-title-measure: 20ch;
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
	--consensus-ember: #f0a37a;
	--consensus-moss: #7c9a90;
	--consensus-mist: #0c1117;
	--consensus-surface: #121821;
	--consensus-line: rgba(237, 242, 247, 0.16);
	--consensus-soft-line: rgba(237, 242, 247, 0.08);
	--consensus-soft-accent: rgba(216, 138, 99, 0.12);
	--consensus-field-surface: #171f2a;
	--consensus-elevated-surface: rgba(23, 31, 42, 0.88);
	--consensus-on-accent: #111827;
	--consensus-link: #5eead4;
	--consensus-focus-outline: #f2a37a;
	--consensus-focus-ring: rgba(216, 138, 99, 0.26);
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
	text-decoration-thickness: 0.08em;
	text-underline-offset: 0.18em;
}

:where(a[href], button, input, textarea, select, summary, [role="button"], .button):focus-visible {
	outline: 3px solid var(--consensus-focus-outline);
	outline-offset: 3px;
	box-shadow: 0 0 0 4px var(--consensus-focus-ring);
}

:where(.button) {
	transition:
		background-color 180ms ease,
		color 180ms ease,
		border-color 180ms ease,
		box-shadow 180ms ease,
		transform 120ms ease;
}

:where(.button):not([aria-disabled="true"]):not(:disabled):hover {
	transform: translateY(-1px);
}

:where(.button):not([aria-disabled="true"]):not(:disabled):active {
	transform: translateY(0);
}

.eyebrow {
	text-transform: uppercase;
	letter-spacing: 0.16em;
	font-size: 0.73rem;
	font-weight: 600;
	color: var(--consensus-muted);
}

:where(.prose, .policy-prose, .plain-list, .policy-list) {
	max-width: 72ch;
}

.policy-page {
	display: grid;
	gap: 24px;
}

.policy-header,
.policy-panel,
.policy-summary-card,
.policy-detail-card,
.policy-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.policy-header,
.policy-panel,
.policy-callout {
	padding: 22px;
}

.policy-header h1,
.policy-section-heading h2,
.policy-detail-card h3,
.policy-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.policy-header h1 {
	margin-top: 8px;
	max-width: var(--consensus-page-title-measure);
	font-size: var(--consensus-page-title-size);
	line-height: 1.04;
}

.policy-header p,
.policy-summary-card p,
.policy-detail-card p,
.policy-list,
.policy-prose p,
.policy-callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.policy-summary,
.policy-card-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.policy-summary-card,
.policy-detail-card {
	padding: 18px;
}

.policy-summary-card p,
.policy-detail-card p,
.policy-list {
	margin: 0;
}

.policy-detail-card .button {
	display: inline-flex;
	margin-top: 14px;
}

.policy-section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
	margin-bottom: 12px;
}

.policy-section-heading--tight h2,
.policy-section-heading--tight p {
	margin: 0;
}

.policy-panel--soft {
	background: var(--consensus-elevated-surface);
}

.policy-list {
	padding-left: 18px;
}

.policy-list li + li {
	margin-top: 8px;
}

.policy-list--tight li + li {
	margin-top: 6px;
}

.policy-callout {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
	align-items: center;
}

.policy-callout__actions {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.policy-callout a,
.policy-prose a {
	color: var(--consensus-link);
}

body
	:is(
		.account-header,
		.ask-page__header,
		.claim-page__header,
		.corrections-header,
		.directory__header,
		.editor-header,
		.editorial-header,
		.explainer-detail-header,
		.explainer-header,
		.guidelines-header,
		.misconception-header,
		.not-found,
		.page-header,
		.privacy-header,
		.setup__copy,
		.standards-header,
		.terms-header,
		.topic-page__header
	)
	h1:not(.no-page-title-scale) {
	max-width: var(--consensus-page-title-measure);
	color: var(--consensus-ink);
	font-size: var(--consensus-page-title-size);
	line-height: 1.04;
	letter-spacing: 0;
}

@media (max-width: 720px) {
	:root {
		--consensus-home-title-size: 2.55rem;
		--consensus-page-title-size: 2.35rem;
		--consensus-page-title-measure: 18ch;
	}
}

@media (max-width: 420px) {
	:root {
		--consensus-home-title-size: 2.05rem;
		--consensus-page-title-size: 1.95rem;
		--consensus-page-title-measure: none;
	}
}

@media (max-width: 720px) {
	.policy-header,
	.policy-panel,
	.policy-callout {
		padding: 18px;
	}

	.policy-callout {
		align-items: stretch;
	}

	.policy-callout__actions {
		width: 100%;
	}
}
</style>
