<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const steps = [
	"Search for the closest claim or topic in plain language.",
	"Read the reviewed bottom line before opening the extra context.",
	"Use explainers or Ask only when the reviewed page does not answer what you need."
];

useHead({
	title: "Start here - Is There Consensus?",
	meta: [{ name: "robots", content: "noindex,follow" }]
});
</script>

<template>
	<div class="how-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Start here' }]" />

		<header class="how-page__header">
			<p class="eyebrow">Start here</p>
			<h1>The site is meant to be used in three short steps.</h1>
			<p>
				Search first, read the reviewed answer second, and only then open the deeper context or ask a follow-up.
			</p>
		</header>

		<section class="how-page__panel">
			<div class="section-heading section-heading--tight">
				<h2>The basic sequence</h2>
				<p>The interface should make this obvious, but here is the short version.</p>
			</div>
			<ol class="step-list">
				<li v-for="item in steps" :key="item">{{ item }}</li>
			</ol>
		</section>

		<section class="how-page__cta">
			<div>
				<p class="eyebrow">Use the shortest path</p>
				<h2>Start with the reviewed page whenever one exists.</h2>
			</div>
			<div class="how-page__cta-actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse topics</NuxtLink>
				<NuxtLink class="button button--ghost" to="/explainers">Read explainers</NuxtLink>
				<NuxtLink class="button button--ghost" to="/ask">Ask a question</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.how-page {
	display: grid;
	gap: 24px;
}

.how-page__header,
.how-page__panel,
.how-page__cta {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
	padding: 22px;
}

.how-page__header h1,
.section-heading h2,
.how-page__cta h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.how-page__header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.how-page__header p,
.section-heading p,
.step-list,
.how-page__cta p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
	margin-bottom: 14px;
}

.section-heading h2,
.section-heading p,
.how-page__header p,
.how-page__cta p,
.how-page__cta h2 {
	margin: 0;
}

.step-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.how-page__cta {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.how-page__cta-actions {
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
