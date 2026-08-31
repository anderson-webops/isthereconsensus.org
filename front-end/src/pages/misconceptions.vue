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
			<h1>Recurring mistakes around science claims.</h1>
			<p>
				These short modules correct predictable errors before readers mistake a headline, anecdote, or partial
				result for the state of the evidence.
			</p>
		</header>

		<section class="misconception-grid">
			<details v-for="item in misconceptionModules" :key="item.slug" class="misconception-card">
				<summary class="misconception-card__summary">
					<div>
						<p class="eyebrow">Common mistake</p>
						<h2>{{ item.title }}</h2>
					</div>
					<span class="i-carbon-chevron-down misconception-card__chevron" aria-hidden="true" />
				</summary>
				<div class="misconception-card__body">
					<p class="misconception-card__diagnosis">{{ item.diagnosis }}</p>
					<section class="misconception-card__section misconception-card__section--correction">
						<h3>Short correction</h3>
						<p>{{ item.shortCorrection }}</p>
					</section>
					<section class="misconception-card__section">
						<h3>Quick checks</h3>
						<ul>
							<li v-for="entry in item.quickChecks" :key="entry">{{ entry }}</li>
						</ul>
					</section>
					<section class="misconception-card__section">
						<h3>Why it persists</h3>
						<p>{{ item.whyItPersists }}</p>
					</section>
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
				</div>
			</details>
		</section>

		<details class="misconception-panel misconception-panel--soft misconception-panel--disclosure">
			<summary class="misconception-panel__summary">
				<span class="section-heading section-heading--tight">
					<h2 class="misconception-panel__title">How the library fits</h2>
					<span>Fix the mistake quickly, then link to the deeper method lesson.</span>
				</span>
				<span class="i-carbon-chevron-down misconception-panel__chevron" aria-hidden="true" />
			</summary>
			<div class="misconception-panel__body">
				<ul class="plain-list">
					<li>The short correction helps when the same misunderstanding keeps returning.</li>
					<li>Corrections stay neutral and plain-language instead of turning into scolding.</li>
					<li>One linked explainer gives readers the method behind the correction.</li>
					<li>Topic-shaped examples help, but the conceptual logic stays consistent across clusters.</li>
				</ul>
			</div>
		</details>

		<details class="misconception-panel misconception-panel--disclosure">
			<summary class="misconception-panel__summary">
				<span class="section-heading section-heading--tight">
					<h2 class="misconception-panel__title">Where each module fits</h2>
					<span>This map connects recurring mistakes to the science claims where they often appear.</span>
				</span>
				<span class="i-carbon-chevron-down misconception-panel__chevron" aria-hidden="true" />
			</summary>
			<div class="misconception-panel__body">
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
			</div>
		</details>

		<section class="misconception-callout">
			<div>
				<p class="eyebrow">Next step</p>
				<h2>Use the right correction, then return to the claim.</h2>
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
	min-width: 0;
	overflow: hidden;
}

.misconception-card__summary {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	gap: 14px;
	padding: 19px 20px;
	list-style: none;
	cursor: pointer;
}

.misconception-card__summary::-webkit-details-marker {
	display: none;
}

.misconception-card__summary > div {
	display: grid;
	gap: 7px;
}

.misconception-card__summary .eyebrow {
	margin: 0;
}

.misconception-card__summary h2 {
	font-size: 1.24rem;
	font-weight: 600;
	line-height: 1.3;
}

.misconception-card__summary:focus-visible {
	outline: 2px solid var(--consensus-interactive);
	outline-offset: -3px;
}

.misconception-card__chevron {
	width: 20px;
	height: 20px;
	color: var(--consensus-interactive);
	transition: transform 160ms ease;
}

.misconception-card[open] .misconception-card__chevron {
	transform: rotate(180deg);
}

.misconception-card__body {
	display: grid;
	gap: 16px;
	padding: 18px 20px 20px;
	border-top: 1px solid var(--consensus-soft-line);
}

.misconception-card__section {
	display: grid;
	gap: 8px;
}

.misconception-card__diagnosis {
	margin: 0;
}

.misconception-card__section--correction {
	padding-left: 14px;
	border-left: 3px solid var(--consensus-method);
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

.misconception-panel--soft {
	background: color-mix(in srgb, var(--consensus-method) 14%, var(--consensus-surface));
}

.misconception-panel--disclosure {
	padding: 0;
	overflow: hidden;
}

.misconception-panel__summary {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 14px;
	align-items: center;
	min-height: 68px;
	padding: 15px 18px;
	cursor: pointer;
	list-style: none;
}

.misconception-panel__summary::-webkit-details-marker {
	display: none;
}

.misconception-panel__summary .section-heading {
	display: grid;
	gap: 4px;
	margin: 0;
}

.misconception-panel__title {
	margin: 0;
	font-family: "Fraunces", serif;
	font-size: 1.2rem;
	font-weight: 700;
	line-height: 1.2;
}

.misconception-panel__summary .section-heading > span:last-child {
	color: var(--consensus-muted);
	line-height: 1.45;
}

.misconception-panel__chevron {
	width: 20px;
	height: 20px;
	color: var(--consensus-interactive);
	transition: transform 160ms ease;
}

.misconception-panel--disclosure[open] .misconception-panel__chevron {
	transform: rotate(180deg);
}

.misconception-panel__body {
	padding: 16px 18px 18px;
	border-top: 1px solid var(--consensus-soft-line);
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
	.misconception-callout {
		padding: 15px;
	}

	.misconception-panel--disclosure {
		padding: 0;
	}

	.misconception-panel__summary {
		min-height: 62px;
		padding: 13px 14px;
	}

	.misconception-panel__body {
		padding: 13px 14px 14px;
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

	.misconception-card__summary {
		gap: 10px;
		padding: 14px;
	}

	.misconception-card__summary h2 {
		font-size: 1.12rem;
		line-height: 1.3;
	}

	.misconception-card__body {
		gap: 14px;
		padding: 14px;
	}

	.misconception-card__section {
		gap: 7px;
	}

	.misconception-card__section--correction {
		padding-left: 11px;
	}

	.misconception-card__section ul,
	.plain-list {
		gap: 6px;
		padding-left: 18px;
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
