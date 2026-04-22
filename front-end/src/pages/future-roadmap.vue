<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

useHead({
	title: "Product roadmap note - Is There Consensus?",
	meta: [{ name: "robots", content: "noindex,follow" }]
});
</script>

<template>
	<div class="future-roadmap-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Product roadmap note' }]" />

		<header class="page-header">
			<p class="eyebrow">Product roadmap note</p>
			<h1>This route is now a short note instead of a public product plan.</h1>
			<p>
				The detailed build sequence belongs in internal planning, not in the main public journey. Public readers
				should use the live reviews and the trust pages that explain how those reviews work.
			</p>
		</header>

		<section class="callout">
			<div>
				<p class="eyebrow">Use the live pages</p>
				<h2>The public site foregrounds what is published, not the backlog.</h2>
			</div>
			<div class="callout__actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
				<NuxtLink class="button button--ghost" to="/standards">How reviews work</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.future-roadmap-page {
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
