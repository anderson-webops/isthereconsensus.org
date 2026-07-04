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
			key: "canonical",
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
	--consensus-ink: #17201d;
	--consensus-muted: #5a6561;
	--consensus-cream: #f4f7f4;
	--consensus-sand: #d7e2dd;
	--consensus-ember: #ad552f;
	--consensus-moss: #315c55;
	--consensus-mist: #f7faf8;
	--consensus-surface: #fffffc;
	--consensus-line: rgba(21, 17, 13, 0.12);
	--consensus-soft-line: rgba(21, 17, 13, 0.08);
	--consensus-soft-accent: rgba(47, 125, 100, 0.1);
	--consensus-field-surface: #ffffff;
	--consensus-elevated-surface: rgba(255, 255, 255, 0.74);
	--consensus-on-accent: #ffffff;
	--consensus-link: #0f766e;
	--consensus-interactive: #0f766e;
	--consensus-accent: #256d85;
	--consensus-community: #2f7d64;
	--consensus-community-soft: rgba(47, 125, 100, 0.16);
	--consensus-caution: #a56512;
	--consensus-method: #5d6fa8;
	--consensus-debate: #ad552f;
	--consensus-debate-soft: rgba(173, 85, 47, 0.14);
	--consensus-focus-outline: #c25b2c;
	--consensus-focus-ring: rgba(47, 125, 100, 0.24);
	--consensus-home-title-size: 3.05rem;
	--consensus-page-title-size: 2.8rem;
	--consensus-page-title-measure: 20ch;
	--consensus-page-background: linear-gradient(180deg, #f7faf8 0%, #eef4f1 100%);
	--consensus-shell-shadow: 0 24px 60px rgba(21, 17, 13, 0.05);
}

.dark {
	color-scheme: dark;
	--consensus-ink: #eef5ef;
	--consensus-muted: #a9b7ae;
	--consensus-cream: #111611;
	--consensus-sand: #263229;
	--consensus-ember: #f0a37a;
	--consensus-moss: #7c9a90;
	--consensus-mist: #0d120f;
	--consensus-surface: #141b17;
	--consensus-line: rgba(237, 242, 247, 0.16);
	--consensus-soft-line: rgba(237, 242, 247, 0.08);
	--consensus-soft-accent: rgba(124, 154, 144, 0.16);
	--consensus-field-surface: #1b241e;
	--consensus-elevated-surface: rgba(27, 36, 30, 0.9);
	--consensus-on-accent: #111827;
	--consensus-link: #5eead4;
	--consensus-interactive: #5eead4;
	--consensus-accent: #7dd3fc;
	--consensus-community: #7bc8a4;
	--consensus-community-soft: rgba(123, 200, 164, 0.16);
	--consensus-caution: #f1c36d;
	--consensus-method: #9aa8ff;
	--consensus-debate: #f0a37a;
	--consensus-debate-soft: rgba(240, 163, 122, 0.16);
	--consensus-focus-outline: #f2a37a;
	--consensus-focus-ring: rgba(216, 138, 99, 0.26);
	--consensus-page-background: linear-gradient(180deg, #0d120f 0%, #111811 100%);
	--consensus-shell-shadow: 0 30px 80px rgba(0, 0, 0, 0.24);
}

:root[data-consensus-palette="blue"] {
	--consensus-ink: #16212b;
	--consensus-muted: #566675;
	--consensus-cream: #f3f7fb;
	--consensus-sand: #d4e0ec;
	--consensus-mist: #f6f9fc;
	--consensus-surface: #fffffe;
	--consensus-soft-accent: rgba(37, 109, 133, 0.12);
	--consensus-field-surface: #ffffff;
	--consensus-elevated-surface: rgba(255, 255, 255, 0.78);
	--consensus-link: #0f6b8a;
	--consensus-interactive: #0f6b8a;
	--consensus-focus-ring: rgba(37, 109, 133, 0.22);
	--consensus-page-background: linear-gradient(180deg, #f6f9fc 0%, #eaf2f7 100%);
	--consensus-shell-shadow: 0 24px 60px rgba(15, 53, 74, 0.06);
}

.dark[data-consensus-palette="blue"] {
	--consensus-ink: #edf5fb;
	--consensus-muted: #a8b7c4;
	--consensus-cream: #0f141a;
	--consensus-sand: #243342;
	--consensus-mist: #0b1117;
	--consensus-surface: #121a23;
	--consensus-soft-accent: rgba(125, 211, 252, 0.16);
	--consensus-field-surface: #17212c;
	--consensus-elevated-surface: rgba(23, 33, 44, 0.9);
	--consensus-link: #7dd3fc;
	--consensus-interactive: #7dd3fc;
	--consensus-focus-ring: rgba(125, 211, 252, 0.24);
	--consensus-page-background: linear-gradient(180deg, #0b1117 0%, #101923 100%);
	--consensus-shell-shadow: 0 30px 80px rgba(0, 0, 0, 0.26);
}

:root[data-consensus-palette="warm"] {
	--consensus-ink: #15110d;
	--consensus-muted: #5d544f;
	--consensus-cream: #f6f1e8;
	--consensus-sand: #e7d6c4;
	--consensus-ember: #a64620;
	--consensus-moss: #35524a;
	--consensus-mist: #fbf8f3;
	--consensus-surface: #fffdf9;
	--consensus-soft-accent: rgba(211, 107, 56, 0.1);
	--consensus-field-surface: #ffffff;
	--consensus-elevated-surface: rgba(255, 255, 255, 0.74);
	--consensus-link: #0f766e;
	--consensus-interactive: #0f766e;
	--consensus-debate: #a64620;
	--consensus-debate-soft: rgba(211, 107, 56, 0.14);
	--consensus-focus-outline: #c25b2c;
	--consensus-focus-ring: rgba(211, 107, 56, 0.22);
	--consensus-page-background:
		radial-gradient(circle at top right, rgba(211, 107, 56, 0.08), transparent 24%),
		radial-gradient(circle at top left, rgba(53, 82, 74, 0.07), transparent 22%), var(--consensus-mist);
	--consensus-shell-shadow: 0 24px 60px rgba(21, 17, 13, 0.06);
}

.dark[data-consensus-palette="warm"] {
	--consensus-ink: #edf2f7;
	--consensus-muted: #a4afbd;
	--consensus-cream: #171d26;
	--consensus-sand: #273241;
	--consensus-ember: #f0a37a;
	--consensus-moss: #7c9a90;
	--consensus-mist: #0c1117;
	--consensus-surface: #121821;
	--consensus-soft-accent: rgba(216, 138, 99, 0.12);
	--consensus-field-surface: #171f2a;
	--consensus-elevated-surface: rgba(23, 31, 42, 0.88);
	--consensus-link: #5eead4;
	--consensus-interactive: #5eead4;
	--consensus-debate: #f0a37a;
	--consensus-debate-soft: rgba(216, 138, 99, 0.16);
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
	line-height: 1.58;
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

p,
li,
dd {
	overflow-wrap: anywhere;
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
	max-width: 68ch;
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
	border-radius: 18px;
}

.policy-header,
.policy-panel,
.policy-callout {
	padding: 22px;
}

.policy-header h1,
.policy-section-heading h2,
.policy-summary-card h2,
.policy-detail-card h3,
.policy-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.policy-header h1 {
	margin-top: 8px;
	max-width: var(--consensus-page-title-measure);
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
}

.policy-header p,
.policy-summary-card p,
.policy-detail-card p,
.policy-list,
.policy-prose p,
.policy-callout p {
	color: var(--consensus-muted);
	line-height: 1.68;
}

.policy-header p,
.policy-callout p {
	max-width: 68ch;
}

.policy-summary {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
}

.policy-card-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
}

.policy-summary-card,
.policy-detail-card {
	padding: 18px;
}

.policy-summary-card {
	display: grid;
	gap: 5px;
	align-content: start;
	padding: 15px 16px;
}

.policy-summary-card h2 {
	color: var(--consensus-ink);
	font-family: inherit;
	font-size: 0.96rem;
	line-height: 1.22;
}

.policy-summary-card p {
	font-size: 0.96rem;
	line-height: 1.48;
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
	display: grid;
	gap: 6px;
	align-items: start;
	margin-bottom: 12px;
}

.policy-section-heading--tight h2,
.policy-section-heading--tight p {
	margin: 0;
}

.policy-section-heading p {
	max-width: 58ch;
	color: var(--consensus-muted);
	line-height: 1.55;
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
	line-height: 1.08;
	letter-spacing: 0;
}

@media (max-width: 720px) {
	:root {
		--consensus-home-title-size: 2.35rem;
		--consensus-page-title-size: 2.15rem;
		--consensus-page-title-measure: 18ch;
	}
}

@media (max-width: 420px) {
	:root {
		--consensus-home-title-size: 2rem;
		--consensus-page-title-size: 1.9rem;
		--consensus-page-title-measure: none;
	}
}

@media (max-width: 720px) {
	.policy-page {
		gap: 18px;
	}

	.policy-header,
	.policy-panel,
	.policy-summary-card,
	.policy-detail-card,
	.policy-callout {
		border-radius: 16px;
	}

	.policy-header,
	.policy-panel,
	.policy-callout {
		padding: 16px;
	}

	.policy-summary,
	.policy-card-grid {
		gap: 10px;
	}

	.policy-summary-card {
		padding: 14px;
	}

	.policy-section-heading {
		margin-bottom: 10px;
	}

	.policy-header p,
	.policy-detail-card p,
	.policy-list,
	.policy-prose p,
	.policy-callout p {
		line-height: 1.58;
	}

	.policy-detail-card {
		padding: 14px;
	}

	.policy-detail-card h3 {
		font-size: 1rem;
	}

	.policy-detail-card p {
		line-height: 1.52;
	}

	.policy-callout {
		align-items: stretch;
		gap: 16px;
	}

	.policy-callout__actions {
		width: 100%;
	}

	.policy-callout .button {
		padding: 10px 14px;
		line-height: 1.25;
	}

	:where(.button) {
		min-height: 44px;
	}
}

@media (max-width: 520px) {
	:where(.button) {
		width: 100%;
	}
}
</style>
