<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const steps = [
	{
		title: "Start with the claim",
		body: "Search for the closest claim or topic in plain language."
	},
	{
		title: "Read the reviewed answer first",
		body: "Open the short bottom line before diving into details or discussion."
	},
	{
		title: "Open the nuance when you need it",
		body: "Use the evidence summaries, uncertainty notes, and source trail if you need more depth."
	}
];

const signals = [
	"Reviewed claims and community discussion are separate layers.",
	"Uncertainty belongs next to the answer, not hidden behind it.",
	"Topics are for broad questions; claim pages are for specific propositions.",
	"Explainers exist so claim pages do not have to reteach the same concepts every time."
];

const methodLinks = [
	{
		title: "Browse topics",
		body: "Start here when you want the closest reviewed topic or claim.",
		to: "/consensus",
		cta: "Browse topics"
	},
	{
		title: "Evergreen explainers",
		body: "Use these for recurring concepts like causation, risk, uncertainty, and how to read evidence.",
		to: "/explainers",
		cta: "Open explainers"
	},
	{
		title: "Ask a question",
		body: "Use this when you cannot find a close reviewed match and need the topic routed.",
		to: "/ask",
		cta: "Open Ask"
	}
];

const mindChangers = [
	"Independent replications across methods or labs",
	"Evidence that changes the size, direction, or mechanism of the effect",
	"Better measurements than the older literature had access to",
	"A model that predicts reality better than the current one"
];
</script>

<template>
	<div class="how-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'How it works' }]" />

		<header class="how-page__header">
			<p class="eyebrow">How it works</p>
			<h1>Use the site in this order: search, read the reviewed answer, then go deeper if needed.</h1>
			<p>
				The public pages are designed to get you to the closest reviewed answer before sending you into debate,
				background reading, or new thread creation.
			</p>
		</header>

		<section class="how-page__panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">The reading order</p>
					<h2>The basic sequence</h2>
				</div>
				<p>Keep this order in mind whenever you open a topic hub or claim review.</p>
			</div>
			<div class="step-list">
				<article v-for="(step, index) in steps" :key="step.title" class="step-row">
					<span>{{ index + 1 }}</span>
					<div>
						<h3>{{ step.title }}</h3>
						<p>{{ step.body }}</p>
					</div>
				</article>
			</div>
		</section>

		<section class="how-page__panel">
			<div class="section-heading section-heading--tight">
				<h2>What the layout is trying to do</h2>
				<p>The main reader-facing rules.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in signals" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="how-page__panel how-page__panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Where to go next</h2>
				<p>Pick the surface that matches what you actually need.</p>
			</div>
			<div class="resource-grid">
				<article v-for="item in methodLinks" :key="item.title" class="resource-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
					<NuxtLink class="text-link" :to="item.to">{{ item.cta }}</NuxtLink>
				</article>
			</div>
		</section>

		<section class="how-page__panel">
			<div class="section-heading section-heading--tight">
				<h2>What would actually change minds?</h2>
				<p>Consensus shifts when better evidence survives scrutiny.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in mindChangers" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="how-page__cta">
			<div>
				<p class="eyebrow">Ready to use it?</p>
				<h2>Start with the closest reviewed page.</h2>
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

.how-page__header h1,
.section-heading h2,
.step-row h3,
.resource-card h3,
.how-page__cta h2 {
	font-family: "Fraunces", serif;
}

.how-page__header h1 {
	font-size: clamp(2.4rem, 4.6vw, 3.8rem);
	margin: 8px 0 10px;
}

.how-page__header p,
.section-heading p,
.step-row p,
.resource-card p,
.plain-list,
.how-page__cta p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.how-page__panel,
.step-row,
.resource-card,
.how-page__cta {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.how-page__panel,
.how-page__cta {
	padding: 22px;
	display: grid;
	gap: 16px;
}

.how-page__panel--soft {
	background: var(--consensus-elevated-surface);
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.step-list,
.resource-grid {
	display: grid;
	gap: 12px;
}

.step-row {
	padding: 16px 18px;
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 14px;
}

.step-row span {
	width: 34px;
	height: 34px;
	border-radius: 999px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	background: var(--consensus-soft-accent);
	font-weight: 700;
	color: var(--consensus-ember);
}

.step-row h3,
.resource-card h3 {
	margin: 0 0 4px;
}

.step-row p,
.resource-card p,
.plain-list,
.how-page__cta p {
	margin: 0;
}

.resource-grid {
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.resource-card {
	padding: 18px;
}

.plain-list {
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.how-page__cta {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.how-page__cta h2 {
	margin: 6px 0 0;
}

.how-page__cta-actions {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 20px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	text-decoration: none;
	font-weight: 600;
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.button--ghost {
	background: transparent;
}

.text-link {
	font-weight: 600;
	text-decoration: none;
}

@media (max-width: 780px) {
	.resource-grid {
		grid-template-columns: 1fr;
	}
}
</style>
