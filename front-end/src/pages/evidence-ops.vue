<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const triggers = [
	"New landmark syntheses or guideline changes.",
	"Retractions, major corrections, or expressions of concern in cited sources.",
	"Scheduled review dates on pages that need a freshness check."
];

useHead({
	title: "Update monitoring note - Is There Consensus?",
	meta: [{ name: "robots", content: "noindex,follow" }]
});
</script>

<template>
	<div class="ops-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Update monitoring note' }]" />

		<header class="ops-header">
			<p class="eyebrow">Update monitoring note</p>
			<h1>A short note on what can trigger review.</h1>
			<p>
				This route used to describe a much larger operations model. Public readers usually only need to know
				what kinds of changes can trigger a visible page review.
			</p>
		</header>

		<section class="ops-panel ops-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Main triggers</h2>
				<p>Automation can surface these signals, but editors still decide whether the public answer moves.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in triggers" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="ops-callout">
			<div>
				<p class="eyebrow">Use the public trust pages</p>
				<h2>Readers usually need the update rule, not the full monitoring stack.</h2>
				<p>
					Use Corrections for the visible change path and Automation and AI for the rule on automated
					assistance.
				</p>
			</div>
			<div class="ops-callout__actions">
				<NuxtLink class="button button--primary" to="/corrections">Corrections policy</NuxtLink>
				<NuxtLink class="button button--ghost" to="/automation-and-ai">Automation and AI</NuxtLink>
				<NuxtLink class="button button--ghost" to="/standards">How reviews work</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.ops-page {
	display: grid;
	gap: 24px;
}

.ops-header,
.ops-panel,
.ops-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
	padding: 22px;
}

.ops-header h1,
.section-heading h2,
.ops-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.ops-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.ops-header p,
.plain-list,
.ops-callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	align-items: end;
	flex-wrap: wrap;
	margin-bottom: 14px;
}

.section-heading h2,
.section-heading p,
.ops-header p,
.ops-callout p,
.ops-callout h2 {
	margin: 0;
}

.ops-panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.ops-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.ops-callout__actions {
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
