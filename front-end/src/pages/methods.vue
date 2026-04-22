<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const ratingNotes = [
	"Expert agreement and evidence certainty are shown separately because a field can agree on the direction of the answer while still debating size, scope, or mechanism.",
	"The site uses plain-language uncertainty notes so readers can see what is still open without losing the main conclusion.",
	"If the evidence is too split for a durable bottom line, the page should say that directly."
];

const sourcingNotes = [
	"Guidelines, consensus statements, regulator reviews, and major syntheses carry more weight than isolated papers.",
	"Topic-specific sourcing notes exist because medicine, climate, nutrition, and other clusters do not all use the same anchor institutions.",
	"Most readers do not need the cluster-level sourcing notes unless they are checking why a source stack was built a certain way."
];

useHead({
	title: "Method notes - Is There Consensus?",
	meta: [{ name: "robots", content: "noindex,follow" }]
});
</script>

<template>
	<div class="methods-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Method notes' }]" />

		<header class="methods-header">
			<p class="eyebrow">Method notes</p>
			<h1>A short note on ratings and sourcing.</h1>
			<p>
				This page is a compact reference for readers who want a little more detail after the main
				<a href="/standards">How Reviews Work</a> page.
			</p>
		</header>

		<section class="methods-panel">
			<div class="section-heading section-heading--tight">
				<h2>Why the ratings are split</h2>
				<p>Agreement and certainty answer different questions.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in ratingNotes" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="methods-panel methods-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Why sourcing varies by topic</h2>
				<p>Different fields have different anchor institutions and review cultures.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in sourcingNotes" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="methods-callout">
			<div>
				<p class="eyebrow">Most readers can stop earlier</p>
				<h2>The main public trust page is usually enough.</h2>
				<p>
					If you only want to know what reviewed pages show and when they update, use How Reviews Work. Use
					this page only for the extra note on ratings and sourcing.
				</p>
			</div>
			<div class="methods-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/source-standards">Topic sourcing notes</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.methods-page {
	display: grid;
	gap: 24px;
}

.methods-header,
.methods-panel,
.methods-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
	padding: 22px;
}

.methods-header h1,
.section-heading h2,
.methods-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.methods-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.methods-header p,
.methods-callout p,
.plain-list {
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
.methods-header p,
.methods-callout p,
.methods-callout h2 {
	margin: 0;
}

.methods-panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.methods-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.methods-callout__actions {
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
