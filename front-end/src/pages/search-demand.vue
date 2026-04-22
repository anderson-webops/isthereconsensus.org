<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

useHead({
	title: "Search demand note - Is There Consensus?",
	meta: [{ name: "robots", content: "noindex,follow" }]
});
</script>

<template>
	<div class="search-demand-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Search demand note' }]" />

		<header class="page-header">
			<p class="eyebrow">Search demand note</p>
			<h1>This route is now a short note, not a public prioritization memo.</h1>
			<p>
				Search demand still matters internally, but it should not compete with the published reviews in the main
				public experience.
			</p>
		</header>

		<section class="callout">
			<div>
				<p class="eyebrow">Use the published pages</p>
				<h2>The product should answer questions first and explain prioritization second.</h2>
			</div>
			<div class="callout__actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
				<NuxtLink class="button button--ghost" to="/ask">Ask a question</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.search-demand-page {
	display: grid;
	gap: 24px;
}

.page-header,
.callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
	padding: 22px;
}

.page-header h1,
.callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.page-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.page-header p,
.callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
	margin: 0;
}

.callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.callout__actions {
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
</style>
