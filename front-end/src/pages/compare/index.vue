<script setup lang="ts">
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
		<header>
			<p class="eyebrow">Evidence comparisons</p>
			<h1>Compare the evidence, with its limits.</h1>
		</header>
		<article v-for="comparison in evidenceComparisons" :key="comparison.slug">
			<h2>
				<NuxtLink :to="`/compare/${comparison.slug}`">{{ comparison.title }}</NuxtLink>
			</h2>
			<p>{{ comparison.description }}</p>
			<p class="comparison-summary">
				{{ comparison.options.length }} options · {{ comparison.outcomes.length }} measures ·
				{{ comparison.datasetLabel }}
			</p>
		</article>
		<p><NuxtLink to="/guides">Explore the reading guides</NuxtLink> for broader explanations.</p>
	</div>
</template>

<style scoped>
.comparisons-index {
	max-width: 900px;
	margin: auto;
	display: grid;
	gap: 24px;
	overflow-wrap: anywhere;
}
.comparisons-index h1 {
	font:
		600 clamp(1.8rem, 4vw, 2.7rem)/1.16 "Fraunces",
		serif;
	margin: 8px 0 0;
}
.comparisons-index h2 {
	font:
		600 1.4rem/1.3 "Fraunces",
		serif;
	margin: 0;
}
.comparisons-index article {
	border: 1px solid var(--consensus-soft-line);
	padding: 24px;
	border-radius: 8px;
	background: var(--consensus-surface);
}
.comparisons-index p {
	line-height: 1.65;
}
.comparisons-index a {
	color: var(--consensus-interactive);
	text-underline-offset: 4px;
}
.comparison-summary {
	color: var(--consensus-muted);
	font-size: 0.9rem;
	margin-bottom: 0;
}
</style>
