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
	font-size: var(--type-section);
}
.comparison-links ul {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
	gap: 10px;
	list-style: none;
	padding: 0;
	margin: 16px 0 0;
}
.comparison-links li {
	position: relative;
	display: grid;
	gap: 6px;
	max-width: none;
	padding: 14px 16px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 12px;
	background: var(--consensus-surface);
	transition: border-color 160ms ease;
}
.comparison-links li:hover,
.comparison-links li:focus-within {
	border-color: var(--consensus-interactive);
}
.comparison-links li > a {
	color: var(--consensus-ink);
	font-weight: 600;
	line-height: 1.35;
	text-decoration: none;
}
/* Stretch the title link over the whole card so the card is one target. */
.comparison-links li > a::after {
	content: "";
	position: absolute;
	inset: 0;
	border-radius: inherit;
}
.comparison-links p {
	display: -webkit-box;
	overflow: hidden;
	margin: 0;
	color: var(--consensus-muted);
	font-size: 0.92rem;
	line-height: 1.5;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
</style>
