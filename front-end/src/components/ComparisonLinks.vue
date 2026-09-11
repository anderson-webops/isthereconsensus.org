<script setup lang="ts">
import type { EvidenceComparison } from "~/data/comparisons/types";

defineProps<{ comparisons: EvidenceComparison[] }>();
</script>

<template>
	<section v-if="comparisons.length" class="comparison-links" aria-label="Related evidence comparisons">
		<h2>Compare options side by side</h2>
		<ul>
			<li v-for="comparison in comparisons" :key="comparison.slug">
				<NuxtLink :to="`/compare/${comparison.slug}`">{{ comparison.title }}</NuxtLink>
				<p>{{ comparison.description }}</p>
			</li>
		</ul>
	</section>
</template>

<style scoped>
.comparison-links {
	padding: 20px 0;
	border-block: 1px solid var(--consensus-soft-line);
}
.comparison-links h2 {
	margin: 0;
	font:
		600 1.35rem/1.3 "Fraunces",
		serif;
}
.comparison-links ul {
	display: grid;
	gap: 14px;
	list-style: none;
	padding: 0;
	margin: 16px 0 0;
}
.comparison-links a {
	color: var(--consensus-interactive);
	font-weight: 600;
	text-underline-offset: 3px;
}
.comparison-links p {
	margin: 5px 0 0;
	max-width: 72ch;
	color: var(--consensus-muted);
	line-height: 1.6;
}
</style>
