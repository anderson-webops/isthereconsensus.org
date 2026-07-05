<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { evergreenExplainers } from "~/data/explainers";

useStaticPageMeta({
	description:
		"Read short evergreen explainers for evidence hierarchies, causation, risk, replication, and scientific uncertainty.",
	path: "/explainers",
	title: "Evergreen explainers - Is There Consensus?"
});
</script>

<template>
	<div class="explainer-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Evergreen explainers' }]" />

		<header class="explainer-header">
			<p class="eyebrow">Evergreen explainers</p>
			<h1>Core concepts behind recurring confusion.</h1>
			<p>
				These explainers cover the recurring ideas behind the site: evidence hierarchies, risk, causation,
				replication, falsifiability, and the line between settled consensus and frontier debate.
			</p>
		</header>

		<section class="explainer-grid">
			<article v-for="explainer in evergreenExplainers" :key="explainer.slug" class="explainer-card">
				<div>
					<p class="eyebrow">Explainer</p>
					<h2>{{ explainer.title }}</h2>
				</div>
				<p>{{ explainer.summary }}</p>
				<section class="explainer-card__section">
					<h3>Why it matters</h3>
					<p>{{ explainer.whyItMatters }}</p>
				</section>
				<details class="explainer-card__details">
					<summary>Key points</summary>
					<ul>
						<li v-for="point in explainer.keyPoints" :key="point">{{ point }}</li>
					</ul>
				</details>
				<div class="explainer-card__actions">
					<span class="explainer-card__meta">
						{{ explainer.relatedMisconceptions.length }} linked module{{
							explainer.relatedMisconceptions.length === 1 ? "" : "s"
						}}
					</span>
					<NuxtLink class="text-link" :to="`/explainers/${explainer.slug}`">Open explainer</NuxtLink>
				</div>
			</article>
		</section>

		<section class="explainer-callout">
			<div>
				<p class="eyebrow">Support the claim, then return</p>
				<h2>These are support pages, not a detour.</h2>
				<p>
					They fit when a topic page references evidence hierarchies, uncertainty, or media distortion and the
					fuller explanation belongs in one reusable place.
				</p>
			</div>
			<div class="explainer-callout__actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
				<NuxtLink class="button button--ghost" to="/misconceptions">View misconception modules</NuxtLink>
				<NuxtLink class="button button--ghost" to="/standards">How reviews work</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.explainer-page {
	display: grid;
	gap: 22px;
}

.explainer-header,
.explainer-card,
.explainer-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.explainer-header,
.explainer-callout {
	padding: 22px;
}

.explainer-header h1,
.explainer-card h2,
.explainer-card h3,
.explainer-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.explainer-header h1 {
	margin-top: 8px;
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
}

.explainer-header p,
.explainer-card p,
.explainer-card li,
.explainer-callout p {
	color: var(--consensus-muted);
	line-height: 1.66;
}

.explainer-header p,
.explainer-callout p {
	max-width: 68ch;
}

.explainer-callout > div {
	flex: 1 1 340px;
	max-width: 68ch;
}

.explainer-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.explainer-card {
	padding: 20px;
	display: grid;
	gap: 14px;
	align-content: start;
}

.explainer-card__section,
.explainer-card__details {
	display: grid;
	gap: 8px;
	padding-top: 2px;
}

.explainer-card h2,
.explainer-card h3,
.explainer-card__details summary {
	line-height: 1.2;
}

.explainer-card__section p,
.explainer-card__details ul {
	margin: 0;
}

.explainer-card__details summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	list-style: none;
	cursor: pointer;
	font-family: "Fraunces", serif;
	font-weight: 600;
	color: var(--consensus-ink);
}

.explainer-card__details summary::-webkit-details-marker {
	display: none;
}

.explainer-card__details summary::after {
	width: 18px;
	height: 18px;
	flex: 0 0 18px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	color: var(--consensus-muted);
	font-family: "Space Grotesk", system-ui, sans-serif;
	font-size: 0.82rem;
	line-height: 16px;
	text-align: center;
	content: "+";
}

.explainer-card__details[open] summary::after {
	content: "-";
}

.explainer-card__details ul {
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.explainer-card__actions {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	flex-wrap: wrap;
	align-items: center;
}

.explainer-card__meta {
	color: var(--consensus-muted);
	font-size: 0.9rem;
}

.text-link {
	font-weight: 600;
	text-decoration: none;
	color: var(--consensus-interactive);
}

.explainer-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.explainer-callout__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 11px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	background: transparent;
	color: var(--consensus-ink);
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

@media (max-width: 900px) {
	.explainer-grid {
		grid-template-columns: 1fr;
	}

	.explainer-card,
	.explainer-header,
	.explainer-callout {
		padding: 18px;
	}

	.explainer-callout {
		align-items: stretch;
	}

	.explainer-callout__actions {
		width: 100%;
	}
}
</style>
