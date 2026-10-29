<script setup lang="ts">
import LearnNav from "~/components/LearnNav.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { readingGuides } from "~/data/reading-guides";

useStaticPageMeta({
	title: "Reading guides - Is There Consensus?",
	description:
		"Sourced reading guides connecting scientific claims, practical questions, and the limits of the evidence.",
	path: "/guides"
});
</script>

<template>
	<div class="guides-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Reading guides' }]" />
		<header class="guides-header">
			<h1>Reading guides</h1>
		</header>
		<LearnNav />
		<p class="guides-count">
			{{ readingGuides.length }} sourced reading guides
		</p>
		<div class="guides-list">
			<NuxtLink v-for="guide in readingGuides" :key="guide.slug" class="guide-card" :to="`/guides/${guide.slug}`">
				<h2>{{ guide.title }}</h2>
				<p>{{ guide.summary }}</p>
				<span class="guide-card__meta">
					{{ guide.reviews.length }} connected reviews
					<span class="i-carbon-arrow-right" aria-hidden="true" />
				</span>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
.guides-page {
	display: grid;
	gap: 22px;
}

.guides-header {
	display: grid;
	gap: 10px;
	padding: 8px 0 4px;
}

.guides-header h1 {
	max-width: 22ch;
	margin: 0;
	line-height: 1.1;
}
.guides-count {
	margin: 0;
	color: var(--consensus-muted);
	font-size: 0.9rem;
}

.guides-list {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
	gap: 12px;
}

.guide-card {
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

.guide-card:hover,
.guide-card:focus-visible {
	border-color: var(--consensus-interactive);
}

.guide-card h2 {
	margin: 0;
	font-size: var(--type-card);
	line-height: 1.3;
}

.guide-card p {
	display: -webkit-box;
	overflow: hidden;
	margin: 0;
	color: var(--consensus-muted);
	font-size: 0.94rem;
	line-height: 1.55;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.guide-card__meta {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	color: var(--consensus-link);
	font-size: 0.86rem;
	font-weight: 600;
}
</style>
