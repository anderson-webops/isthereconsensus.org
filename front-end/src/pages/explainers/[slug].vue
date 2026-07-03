<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { getExplainer } from "~/data/explainers";
import { getMisconceptionModulesBySlugs } from "~/data/misconceptions";

interface ExplainerRouteParams {
	slug?: string | string[];
}

const route = useRoute();
const slug = computed(() => {
	const value = (route.params as ExplainerRouteParams).slug;
	return Array.isArray(value) ? value[0] : String(value ?? "");
});

const explainer = computed(() => getExplainer(slug.value));
const relatedModules = computed(() => getMisconceptionModulesBySlugs(explainer.value?.relatedMisconceptions || []));

if (!explainer.value) {
	throw createError({ statusCode: 404, statusMessage: "Explainer not found" });
}

useSeoMeta({
	title: () => `${explainer.value?.title || "Explainer"} - Is There Consensus?`,
	description: () => explainer.value?.summary || "Evergreen explainer"
});
</script>

<template>
	<div class="explainer-detail-page">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Evergreen explainers', to: '/explainers' },
				{ label: explainer?.title || 'Explainer' }
			]"
		/>

		<header class="explainer-detail-header">
			<p class="eyebrow">Evergreen explainer</p>
			<h1>{{ explainer?.title }}</h1>
			<p>{{ explainer?.summary }}</p>
		</header>

		<section class="explainer-detail-panel">
			<div class="section-heading section-heading--tight">
				<h2>What people often get wrong</h2>
				<p>Start with the misunderstanding before you try to decode the correction.</p>
			</div>
			<p>{{ explainer?.whatPeopleGetWrong }}</p>
		</section>

		<section class="explainer-detail-panel explainer-detail-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Core concept</h2>
				<p>This is the part you should reuse across claim pages.</p>
			</div>
			<p>{{ explainer?.coreConcept }}</p>
		</section>

		<section class="explainer-detail-panel">
			<div class="section-heading section-heading--tight">
				<h2>How scientists handle this in practice</h2>
				<p>These are the workflow habits behind the public explanation.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in explainer?.howScientistsHandleIt || []" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="explainer-detail-grid">
			<section class="explainer-detail-panel">
				<div class="section-heading section-heading--tight">
					<h2>Common traps</h2>
					<p>The same errors recur across topics.</p>
				</div>
				<ul class="plain-list plain-list--tight">
					<li v-for="item in explainer?.commonTraps || []" :key="item">{{ item }}</li>
				</ul>
			</section>

			<section class="explainer-detail-panel">
				<div class="section-heading section-heading--tight">
					<h2>Good sources for this concept</h2>
					<p>Process-focused sources are usually better than one-off examples.</p>
				</div>
				<ul class="plain-list plain-list--tight">
					<li v-for="item in explainer?.goodSources || []" :key="item">{{ item }}</li>
				</ul>
			</section>
		</section>

		<section class="explainer-detail-panel">
			<div class="section-heading section-heading--tight">
				<h2>Worked examples</h2>
				<p>Use one timeless example and one topic-shaped example when you explain this elsewhere.</p>
			</div>
			<div class="example-grid">
				<article v-for="item in explainer?.workedExamples || []" :key="item.title" class="example-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section v-if="relatedModules.length" class="explainer-detail-panel explainer-detail-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Related misconception modules</h2>
				<p>These are the shorter embeds that should point back to this explainer.</p>
			</div>
			<div class="module-grid">
				<article v-for="item in relatedModules" :key="item.slug" class="module-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.shortCorrection }}</p>
					<div class="module-card__actions">
						<NuxtLink class="text-link" to="/misconceptions">Open module library</NuxtLink>
					</div>
				</article>
			</div>
		</section>

		<section class="explainer-callout">
			<div>
				<p class="eyebrow">Back to claim pages</p>
				<h2>Use this once, then return to the claim.</h2>
				<p>{{ explainer?.whyItMatters }}</p>
			</div>
			<div class="explainer-callout__actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
				<NuxtLink class="button button--ghost" to="/explainers">All explainers</NuxtLink>
				<NuxtLink class="button button--ghost" to="/misconceptions">Misconception modules</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.explainer-detail-page {
	display: grid;
	gap: 22px;
}

.explainer-detail-header,
.explainer-detail-panel,
.example-card,
.module-card,
.explainer-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.explainer-detail-header,
.explainer-detail-panel,
.explainer-callout {
	padding: 22px;
}

.explainer-detail-header h1,
.section-heading h2,
.example-card h3,
.module-card h3,
.explainer-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.explainer-detail-header h1 {
	margin-top: 8px;
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
}

.explainer-detail-header p,
.explainer-detail-panel p,
.example-card p,
.module-card p,
.explainer-callout p,
.plain-list {
	color: var(--consensus-muted);
	line-height: 1.66;
}

.explainer-detail-header p,
.explainer-detail-panel > p,
.explainer-callout p {
	max-width: 68ch;
}

.explainer-detail-grid,
.example-grid,
.module-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.example-card,
.module-card {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.section-heading h2,
.example-card h3,
.module-card h3,
.explainer-callout h2 {
	line-height: 1.2;
}

.explainer-detail-panel--soft {
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

.explainer-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.explainer-callout__actions,
.module-card__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.text-link {
	font-weight: 600;
	text-decoration: none;
	color: var(--consensus-interactive);
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
	.explainer-detail-grid,
	.example-grid,
	.module-grid {
		grid-template-columns: 1fr;
	}

	.explainer-detail-header,
	.explainer-detail-panel,
	.explainer-callout {
		padding: 18px;
	}
}
</style>
