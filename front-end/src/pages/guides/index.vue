<script setup lang="ts">
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
		<header>
			<p class="eyebrow">Reading guides</p>
			<h1>See how the findings fit together.</h1>
			<p class="guides-intro">
				Follow a subject from the main takeaway to the evidence, its limits, and the questions worth asking
				next.
			</p>
		</header>
		<p class="guides-count">{{ readingGuides.length }} sourced reading guides</p>
		<div class="guides-list">
			<article v-for="guide in readingGuides" :key="guide.slug" class="guide-card">
				<h2>
					<NuxtLink :to="`/guides/${guide.slug}`">{{ guide.title }}</NuxtLink>
				</h2>
				<p>{{ guide.summary }}</p>
				<span>{{ guide.reviews.length }} connected reviews</span>
			</article>
		</div>
		<p class="guides-more">
			Want help reading evidence itself?
			<NuxtLink to="/explainers">Explore the core-concept explainers.</NuxtLink>
		</p>
	</div>
</template>

<style scoped>
.guides-page {
	display: grid;
	gap: 22px;
	max-width: 880px;
	margin: auto;
}
.guides-page h1 {
	font:
		600 var(--consensus-page-title-size)/1.12 "Fraunces",
		serif;
	margin: 8px 0 16px;
	max-width: 22ch;
}
.guides-intro {
	max-width: 66ch;
	line-height: 1.65;
	color: var(--consensus-muted);
}
.guides-count,
.guides-intro {
	margin-bottom: 0;
}
.guides-count,
.guide-card span {
	color: var(--consensus-muted);
	font-size: 0.9rem;
}
.guides-list {
	display: grid;
	gap: 16px;
}
.guide-card {
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-surface);
	padding: clamp(18px, 3vw, 26px);
}
.guide-card h2 {
	font:
		600 1.45rem/1.3 "Fraunces",
		serif;
	margin: 0;
}
.guide-card p,
.guides-more {
	line-height: 1.65;
	max-width: 68ch;
}
.guides-page a {
	color: var(--consensus-interactive);
	text-underline-offset: 4px;
}
.guide-card h2 a {
	color: var(--consensus-ink);
}
</style>
