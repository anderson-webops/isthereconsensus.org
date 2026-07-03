<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const crossCuttingRules = [
	"Start with the current institutional baseline, then check it against an independent synthesis.",
	"Keep source prominence proportional to evidence strength and institutional responsibility.",
	"Use topic-specific source notes when the field has unusual anchor bodies or unusual kinds of disagreement.",
	"Do not let background papers or media coverage outrank decision-facing reviews."
];

useStaticPageMeta({
	description:
		"Reference topic-specific sourcing notes for reviewers checking how source stacks should be weighted in unusual fields.",
	path: "/source-standards",
	robots: "noindex,follow",
	title: "Topic sourcing notes - Is There Consensus?"
});
</script>

<template>
	<div class="source-standards-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Topic sourcing notes' }]" />

		<header class="page-header">
			<p class="eyebrow">Topic sourcing notes</p>
			<h1>Topic-specific source stacks.</h1>
			<p>
				This page is a low-profile reference, not part of the main public reading path. Most readers only need
				the main How Reviews Work page.
			</p>
		</header>

		<section class="panel panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Cross-cutting rules</h2>
				<p>The default sourcing rules that apply before any topic-specific adjustment.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in crossCuttingRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="panel">
			<div class="section-heading section-heading--tight">
				<h2>When this page matters</h2>
				<p>Usually only when a reader or reviewer is checking why a source stack was built a certain way.</p>
			</div>
			<ul class="plain-list">
				<li>Medicine may lean on guideline bodies and clinical review programs.</li>
				<li>Climate topics may lean on assessment bodies and synthesis reports.</li>
				<li>Evidence-literacy topics may lean more on meta-research and reliability studies.</li>
			</ul>
		</section>

		<section class="callout">
			<div>
				<p class="eyebrow">Start simpler</p>
				<h2>Use the main public trust page first.</h2>
				<p>
					If you only want to understand what reviewed pages show and why they are trustworthy, go back to How
					Reviews Work.
				</p>
			</div>
			<div class="callout__actions">
				<NuxtLink class="button button--primary" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/consensus">Browse claim reviews</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.source-standards-page {
	display: grid;
	gap: 24px;
}

.page-header,
.panel,
.callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
	padding: 22px;
}

.page-header h1,
.section-heading h2,
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
.section-heading p,
.plain-list,
.callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.page-header p,
.callout > div {
	max-width: 68ch;
}

.section-heading p {
	max-width: 56ch;
}

.section-heading {
	display: grid;
	gap: 6px;
	align-items: start;
	margin-bottom: 14px;
}

.section-heading h2,
.section-heading p,
.page-header p,
.callout p,
.callout h2 {
	margin: 0;
}

.panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.callout > div {
	flex: 1 1 340px;
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

@media (max-width: 720px) {
	.page-header,
	.panel,
	.callout {
		padding: 18px;
	}

	.callout {
		align-items: stretch;
	}

	.callout__actions {
		width: 100%;
	}
}
</style>
