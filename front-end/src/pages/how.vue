<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const steps = [
	{
		title: "Start with the claim",
		body: "Frame the question in plain language before opening up methods, edge cases, or community debate."
	},
	{
		title: "Look for the stable core",
		body: "Ask what experts broadly agree on before treating a new paper or headline as a reversal."
	},
	{
		title: "Open the uncertainty on purpose",
		body: "Real debates usually live in effect size, mechanism, scope, or edge cases rather than in the entire claim."
	}
];

const signals = [
	"Consensus is earned through criticism, replication, and converging evidence.",
	"Public opinion and expert consensus are different signals and should stay separate.",
	"Uncertainty is part of honest explanation, not a reason to flatten everything into confusion.",
	"A good topic page makes the bottom line easy to find before it asks you to read the nuance."
];

const methodLinks = [
	{
		title: "Evergreen explainers",
		body: "Use these when you need the recurring concepts once: evidence hierarchies, causation, risk, falsifiability, replication, and denial patterns.",
		to: "/explainers",
		cta: "Open explainers"
	},
	{
		title: "Editorial standards",
		body: "Use this when you want to know what the site counts as settled enough to publish, how updates work, and why source counts and review dates stay visible.",
		to: "/standards",
		cta: "Open standards"
	},
	{
		title: "Governance and workflow",
		body: "Use this when you want the editorial pipeline, role boundaries, routing rules, and moderation model that sit behind the public claim pages.",
		to: "/governance",
		cta: "Open governance"
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
			<h1>Read the stable core first. Open the method layer only when you need it.</h1>
			<p>
				The site is built around one rule: expert consensus, active debate, and community discussion are not the
				same thing, so the interface should not treat them as the same thing.
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
				<h2>What the site tries to keep visible</h2>
				<p>These are the rules behind the structure.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in signals" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="how-page__panel how-page__panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>When you need the method layer</h2>
				<p>Use these pages instead of forcing every claim review to re-explain the same concepts.</p>
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
				<p>Consensus shifts when better evidence survives challenge.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in mindChangers" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="how-page__cta">
			<div>
				<p class="eyebrow">Ready to use it?</p>
				<h2>Search the claim, then read the review in order.</h2>
			</div>
			<div class="how-page__cta-actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse topics</NuxtLink>
				<NuxtLink class="button button--ghost" to="/explainers">Read explainers</NuxtLink>
				<NuxtLink class="button button--ghost" to="/governance">Open governance</NuxtLink>
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
