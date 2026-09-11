<script setup lang="ts">
import type { ReadingGuideSummary } from "~/data/reading-guides/types";

defineProps<{ guides: ReadingGuideSummary[] }>();
</script>

<template>
	<section v-if="guides.length" class="guide-links" aria-label="Related reading guides">
		<div class="guide-links__heading">
			<h2>Put the evidence together</h2>
			<NuxtLink to="/guides">All reading guides</NuxtLink>
		</div>
		<ul>
			<li v-for="guide in guides" :key="guide.slug">
				<NuxtLink :to="`/guides/${guide.slug}`">{{ guide.title }}</NuxtLink>
				<p>{{ guide.summary }}</p>
			</li>
		</ul>
	</section>
</template>

<style scoped>
.guide-links {
	padding: 20px 0;
	border-block: 1px solid var(--consensus-soft-line);
}
.guide-links__heading {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: baseline;
	gap: 12px;
}
.guide-links h2 {
	margin: 0;
	font:
		600 1.35rem/1.3 "Fraunces",
		serif;
}
.guide-links ul {
	display: grid;
	gap: 14px;
	list-style: none;
	padding: 0;
	margin: 18px 0 0;
}
.guide-links li > a {
	font-weight: 600;
}
.guide-links a {
	color: var(--consensus-interactive);
	text-underline-offset: 3px;
}
.guide-links p {
	margin: 5px 0 0;
	max-width: 72ch;
	color: var(--consensus-muted);
	line-height: 1.6;
}
</style>
