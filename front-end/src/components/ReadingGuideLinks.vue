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
.guide-links__heading a {
	color: var(--consensus-link);
	font-size: 0.92rem;
	font-weight: 600;
	text-underline-offset: 3px;
}
.guide-links h2 {
	margin: 0;
	font-size: var(--type-section);
}
.guide-links ul {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
	gap: 10px;
	list-style: none;
	padding: 0;
	margin: 16px 0 0;
}
.guide-links li {
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
.guide-links li:hover,
.guide-links li:focus-within {
	border-color: var(--consensus-interactive);
}
.guide-links li > a {
	color: var(--consensus-ink);
	font-weight: 600;
	line-height: 1.35;
	text-decoration: none;
}
/* Stretch the title link over the whole card so the card is one target. */
.guide-links li > a::after {
	content: "";
	position: absolute;
	inset: 0;
	border-radius: inherit;
}
.guide-links p {
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
