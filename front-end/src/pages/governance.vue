<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const workflow = [
	"Questions and sources can surface problems, but they do not directly change the reviewed answer.",
	"Editors and verified reviewers build and check the published page.",
	"Corrections and major updates stay visible in the public record instead of replacing old text silently."
];

useHead({
	title: "Editorial workflow note - Is There Consensus?",
	meta: [{ name: "robots", content: "noindex,follow" }]
});
</script>

<template>
	<div class="governance-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Editorial workflow note' }]" />

		<header class="governance-header">
			<p class="eyebrow">Editorial workflow note</p>
			<h1>A short note on how community input and reviewed pages stay separate.</h1>
			<p>
				This route is now a compact reference rather than a full public operations manual. Most readers should
				use How Reviews Work, Community Guidelines, or Corrections instead.
			</p>
		</header>

		<section class="governance-panel governance-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>At a glance</h2>
				<p>The public model is simpler than the old workflow page made it sound.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in workflow" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="governance-callout">
			<div>
				<p class="eyebrow">Use the shorter public pages</p>
				<h2>Readers usually do not need the internal queue design.</h2>
				<p>Use the pages below for the public trust standard, conduct rules, and factual change path.</p>
			</div>
			<div class="governance-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/community-guidelines">Community guidelines</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.governance-page {
	display: grid;
	gap: 24px;
}

.governance-header,
.governance-panel,
.governance-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
	padding: 22px;
}

.governance-header h1,
.section-heading h2,
.governance-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.governance-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.governance-header p,
.plain-list,
.governance-callout p {
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
.governance-header p,
.governance-callout p,
.governance-callout h2 {
	margin: 0;
}

.governance-panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.governance-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.governance-callout__actions {
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
