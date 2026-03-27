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
		title: "Separate the bumps from the ball",
		body: "Real debates often live in effect size, mechanism, or scope rather than in the existence of the overall effect."
	}
];

const signals = [
	"Consensus is earned through criticism, replication, and converging evidence.",
	"Public opinion and expert consensus are different signals and should stay separate.",
	"Uncertainty is part of honest explanation, not a reason to flatten everything into confusion.",
	"A good topic page makes the bottom line easy to find before it asks you to read the nuance."
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
			<h1>Read the stable core first. Open the nuance second.</h1>
			<p>
				This site is built around one idea: expert consensus, active debate, and public confusion are not the
				same thing, so the interface should not treat them as the same thing.
			</p>
		</header>

		<section class="how-page__panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">The reading order</p>
					<h2>The basic sequence</h2>
				</div>
				<p>Keep this order in mind whenever you open a topic page.</p>
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
				<h2>Pick a topic or search a claim.</h2>
			</div>
			<div class="how-page__cta-actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse topics</NuxtLink>
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
.plain-list,
.how-page__cta p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.how-page__panel,
.step-row,
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
	background: rgba(255, 255, 255, 0.7);
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

.step-list {
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

.step-row h3 {
	margin: 0 0 4px;
}

.step-row p,
.plain-list,
.how-page__cta p {
	margin: 0;
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
	color: #fff;
}

.button--ghost {
	background: transparent;
}
</style>
