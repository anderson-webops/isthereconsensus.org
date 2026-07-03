<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { getExplainer } from "~/data/explainers";
import { misconceptionModules } from "~/data/misconceptions";

const clusterLabels = [
	{ slug: "health-and-medicine", label: "Health and medicine" },
	{ slug: "nutrition-and-diet", label: "Nutrition and diet" },
	{ slug: "climate-and-environment", label: "Climate and environment" },
	{ slug: "genetics-and-biotechnology", label: "Genetics and biotechnology" },
	{ slug: "neuroscience-and-psychology", label: "Neuroscience and psychology" },
	{ slug: "science-news-and-media", label: "Science news and media" }
];

function formatRelevance(value: string) {
	if (value === "core") return "Core";
	if (value === "frequent") return "Frequent";
	return "Occasional";
}

function explainerTitle(slug: string) {
	return getExplainer(slug)?.title || slug;
}

useStaticPageMeta({
	description:
		"Browse reusable modules that explain common mistakes in science headlines, anecdotes, isolated studies, and uncertainty.",
	path: "/misconceptions",
	title: "Misconception modules - Is There Consensus?"
});
</script>

<template>
	<div class="misconception-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Misconception modules' }]" />

		<header class="misconception-header">
			<p class="eyebrow">Misconception modules</p>
			<h1>Recurring mistakes across claim pages.</h1>
			<p>
				These modules are designed to be short, reusable embeds on claim pages. They correct predictable errors
				before readers mistake a headline, anecdote, or partial result for the state of the evidence.
			</p>
		</header>

		<section class="misconception-panel misconception-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>How to use the library</h2>
				<p>
					The short module should fix the mistake fast. The linked explainer carries the deeper method lesson.
				</p>
			</div>
			<ul class="plain-list">
				<li>Use the short correction when a claim page keeps attracting the same misunderstanding.</li>
				<li>Keep the correction neutral and plain-language instead of turning it into a scolding.</li>
				<li>Link to one explainer page so readers can learn the method once and reuse it elsewhere.</li>
				<li>Use topic-shaped examples, but keep the conceptual logic consistent across clusters.</li>
			</ul>
		</section>

		<section class="misconception-grid">
			<article v-for="item in misconceptionModules" :key="item.slug" class="misconception-card">
				<div>
					<p class="eyebrow">Module</p>
					<h2>{{ item.title }}</h2>
				</div>
				<p class="misconception-card__diagnosis">{{ item.diagnosis }}</p>
				<section class="misconception-card__section misconception-card__section--correction">
					<h3>Short correction</h3>
					<p>{{ item.shortCorrection }}</p>
				</section>
				<details class="misconception-card__details">
					<summary>Checks and context</summary>
					<div class="misconception-card__details-body">
						<section class="misconception-card__section">
							<h3>Quick check</h3>
							<ul>
								<li v-for="entry in item.quickChecks" :key="entry">{{ entry }}</li>
							</ul>
						</section>
						<section class="misconception-card__section">
							<h3>Why it persists</h3>
							<p>{{ item.whyItPersists }}</p>
						</section>
					</div>
				</details>
				<section class="misconception-card__section misconception-card__section--links">
					<h3>Related explainers</h3>
					<div class="chip-row">
						<NuxtLink
							v-for="slug in item.relatedExplainers"
							:key="slug"
							class="chip"
							:to="`/explainers/${slug}`"
						>
							{{ explainerTitle(slug) }}
						</NuxtLink>
					</div>
				</section>
			</article>
		</section>

		<section class="misconception-panel">
			<div class="section-heading section-heading--tight">
				<h2>Reuse map by topic cluster</h2>
				<p>Use this to decide which modules belong on which kinds of claim pages.</p>
			</div>
			<div class="reuse-table-wrap">
				<table class="reuse-table">
					<thead>
						<tr>
							<th>Module</th>
							<th v-for="cluster in clusterLabels" :key="cluster.slug">{{ cluster.label }}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="item in misconceptionModules" :key="item.slug">
							<td>{{ item.title }}</td>
							<td v-for="cluster in clusterLabels" :key="cluster.slug">
								{{
									formatRelevance(
										item.clusterUse.find((entry) => entry.slug === cluster.slug)?.relevance ||
											"occasional"
									)
								}}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section class="misconception-callout">
			<div>
				<p class="eyebrow">Next step</p>
				<h2>Use the right module, then return to the claim.</h2>
				<p>
					The goal is not to send readers into a side maze. It is to stop the same interpretation mistake from
					repeating on every claim page.
				</p>
			</div>
			<div class="misconception-callout__actions">
				<NuxtLink class="button button--primary" to="/explainers">Evergreen explainers</NuxtLink>
				<NuxtLink class="button button--ghost" to="/consensus">Browse claim reviews</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.misconception-page {
	display: grid;
	gap: 24px;
}

.misconception-page > * {
	min-width: 0;
}

.misconception-header,
.misconception-panel,
.misconception-card,
.misconception-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.misconception-header,
.misconception-panel,
.misconception-callout {
	padding: 22px;
}

.misconception-header h1,
.misconception-card h2,
.misconception-card h3,
.misconception-callout h2,
.section-heading h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.misconception-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.misconception-header p,
.misconception-card p,
.misconception-card li,
.misconception-callout p,
.plain-list,
.reuse-table {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.misconception-grid {
	display: grid;
	gap: 16px;
	align-items: start;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.misconception-card {
	padding: 22px;
	display: grid;
	gap: 13px;
	align-content: start;
	min-width: 0;
}

.misconception-card__section {
	display: grid;
	gap: 8px;
}

.misconception-card__diagnosis {
	margin: 0;
}

.misconception-card__section--correction {
	padding: 13px 14px;
	border: 1px solid color-mix(in srgb, var(--consensus-method) 28%, var(--consensus-soft-line));
	border-radius: 14px;
	background: color-mix(in srgb, var(--consensus-method) 10%, var(--consensus-surface));
}

.misconception-card__section--correction p {
	color: var(--consensus-ink);
}

.misconception-card__section--links {
	padding-top: 2px;
}

.misconception-card__section p,
.misconception-card__section ul {
	margin: 0;
}

.misconception-card__section ul,
.plain-list {
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.misconception-card__details {
	display: grid;
	gap: 10px;
	padding-top: 2px;
}

.misconception-card__details summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	list-style: none;
	cursor: pointer;
	font-family: "Fraunces", serif;
	font-weight: 600;
	line-height: 1.2;
	color: var(--consensus-ink);
}

.misconception-card__details summary::-webkit-details-marker {
	display: none;
}

.misconception-card__details summary:focus-visible {
	border-radius: 8px;
	outline: 2px solid var(--consensus-debate);
	outline-offset: 4px;
}

.misconception-card__details summary::after {
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

.misconception-card__details[open] summary::after {
	content: "-";
}

.misconception-card__details-body {
	display: grid;
	gap: 12px;
	padding-top: 10px;
}

.misconception-panel--soft {
	background: color-mix(in srgb, var(--consensus-method) 14%, var(--consensus-surface));
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.chip-row {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.chip {
	padding: 7px 10px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	text-decoration: none;
	color: var(--consensus-ink);
	font-weight: 600;
	max-width: 100%;
	overflow-wrap: anywhere;
}

.reuse-table-wrap {
	max-width: 100%;
	min-width: 0;
	overflow-x: auto;
}

.reuse-table {
	width: 100%;
	border-collapse: collapse;
	min-width: 860px;
}

.reuse-table th,
.reuse-table td {
	padding: 10px 12px;
	border-bottom: 1px solid var(--consensus-soft-line);
	text-align: left;
	vertical-align: top;
}

.reuse-table th {
	color: var(--consensus-ink);
}

.misconception-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.misconception-callout__actions {
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
	.misconception-grid {
		grid-template-columns: 1fr;
	}
}

@media (max-width: 640px) {
	.misconception-header,
	.misconception-panel,
	.misconception-card,
	.misconception-callout {
		border-radius: 18px;
	}

	.misconception-header,
	.misconception-panel,
	.misconception-callout,
	.misconception-card {
		padding: 18px;
	}

	.misconception-header h1 {
		font-size: 2.35rem;
		line-height: 1.05;
	}
}
</style>
