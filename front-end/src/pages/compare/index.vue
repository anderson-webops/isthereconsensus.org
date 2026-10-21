<script setup lang="ts">
import LearnNav from "~/components/LearnNav.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { evidenceComparisons } from "~/data/comparisons";

useStaticPageMeta({
	title: "Evidence comparisons - Is There Consensus?",
	description: "Compare options using sourced findings, explicit contexts, and visible limits.",
	path: "/compare"
});
</script>

<template>
	<div class="comparisons-index">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Comparisons' }]" />
		<header class="comparisons-header">
			<p class="eyebrow">Evidence comparisons</p>
			<h1>Compare the evidence, with its limits.</h1>
		</header>
		<LearnNav />
		<div class="comparison-list">
			<NuxtLink
				v-for="comparison in evidenceComparisons"
				:key="comparison.slug"
				class="comparison-card"
				:to="`/compare/${comparison.slug}`"
			>
				<h2>{{ comparison.title }}</h2>
				<p>{{ comparison.description }}</p>
				<p class="comparison-summary">
					{{ comparison.options.length }} options · {{ comparison.outcomes.length }} measures ·
					{{ comparison.datasetLabel }}
				</p>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
.comparisons-index {
	display: grid;
	gap: 22px;
	overflow-wrap: anywhere;
}

.comparisons-header {
	display: grid;
	gap: 10px;
	padding: 8px 0 4px;
}

.comparisons-header h1 {
	max-width: 22ch;
	margin: 0;
	line-height: 1.1;
}

.comparison-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
	gap: 12px;
}

.comparison-card {
	display: grid;
	align-content: start;
	gap: 8px;
	padding: 18px 20px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 14px;
	background: var(--consensus-surface);
	color: var(--consensus-ink);
	text-decoration: none;
	transition: border-color 160ms ease;
}

.comparison-card:hover,
.comparison-card:focus-visible {
	border-color: var(--consensus-interactive);
}

.comparison-card h2 {
	margin: 0;
	font-size: var(--type-card);
	line-height: 1.3;
}

.comparison-card p {
	margin: 0;
	color: var(--consensus-muted);
	font-size: 0.94rem;
	line-height: 1.55;
}

.comparison-card .comparison-summary {
	font-size: 0.84rem;
}
</style>
