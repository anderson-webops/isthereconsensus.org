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
			<h1>Recurring mistakes on claim pages.</h1>
			<p>
				These short modules correct predictable errors before readers mistake a headline, anecdote, or partial
				result for the state of the evidence.
			</p>
		</header>

		<section class="misconception-panel misconception-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>How to use the library</h2>
				<p>Fix the mistake quickly, then link to the deeper method lesson.</p>
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
				<h2>Where each module fits</h2>
				<p>This map matches recurring mistakes to the right claim pages.</p>
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
							<td data-label="Module">{{ item.title }}</td>
							<td v-for="cluster in clusterLabels" :key="cluster.slug" :data-label="cluster.label">
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
					The goal is to stop the same interpretation mistake from repeating without pulling readers away from
					the claim.
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
	font-size: var(--consensus-page-title-size);
	line-height: 1;
}

.misconception-header p,
.misconception-card p,
.misconception-card li,
.misconception-callout p,
.section-heading p,
.plain-list,
.reuse-table {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.misconception-header p,
.misconception-callout > div {
	max-width: 68ch;
}

.section-heading p {
	max-width: 56ch;
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
	display: grid;
	gap: 6px;
	margin-bottom: 14px;
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

.misconception-callout > div {
	flex: 1 1 340px;
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
	.misconception-page {
		gap: 16px;
	}

	.misconception-header,
	.misconception-panel,
	.misconception-card,
	.misconception-callout {
		border-radius: 16px;
	}

	.misconception-header,
	.misconception-panel,
	.misconception-callout,
	.misconception-card {
		padding: 15px;
	}

	.misconception-header h1 {
		font-size: 2.35rem;
		line-height: 1.05;
	}

	.misconception-header p,
	.misconception-card p,
	.misconception-card li,
	.misconception-callout p,
	.section-heading p,
	.plain-list,
	.reuse-table {
		line-height: 1.55;
	}

	.section-heading {
		margin-bottom: 12px;
	}

	.misconception-card {
		gap: 9px;
	}

	.misconception-card h2 {
		line-height: 1.12;
	}

	.misconception-card__section {
		gap: 7px;
	}

	.misconception-card__section--correction {
		padding: 10px 11px;
		border-radius: 12px;
	}

	.misconception-card__section ul,
	.plain-list {
		gap: 6px;
		padding-left: 18px;
	}

	.misconception-card__details {
		gap: 8px;
	}

	.misconception-card__details-body {
		gap: 10px;
		padding-top: 8px;
	}

	.chip-row {
		gap: 6px;
	}

	.chip {
		padding: 5px 8px;
		font-size: 0.9rem;
		line-height: 1.25;
	}

	.misconception-callout {
		align-items: stretch;
	}

	.misconception-callout__actions {
		width: 100%;
	}

	.reuse-table {
		min-width: 0;
	}

	.reuse-table thead {
		display: none;
	}

	.reuse-table,
	.reuse-table tbody,
	.reuse-table tr,
	.reuse-table td {
		display: block;
	}

	.reuse-table tr {
		padding: 8px 0;
		border-bottom: 1px solid var(--consensus-soft-line);
	}

	.reuse-table tr:last-child {
		border-bottom: 0;
	}

	.reuse-table td {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 8px;
		padding: 2px 0;
		border-bottom: 0;
		font-size: 0.94rem;
		line-height: 1.42;
		text-align: right;
	}

	.reuse-table td::before {
		content: attr(data-label);
		color: var(--consensus-ink);
		font-weight: 700;
		text-align: left;
	}

	.reuse-table td:first-child {
		grid-template-columns: 1fr;
		gap: 4px;
		padding-bottom: 6px;
		text-align: left;
		color: var(--consensus-ink);
		font-weight: 700;
	}

	.reuse-table td:first-child::before {
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--consensus-muted);
	}
}
</style>
