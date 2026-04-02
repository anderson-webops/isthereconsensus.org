<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { evergreenExplainers } from "~/data/explainers";

useHead({
	title: "Evergreen explainers - Is There Consensus?"
});
</script>

<template>
	<div class="explainer-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Evergreen explainers' }]" />

		<header class="explainer-header">
			<p class="eyebrow">Evergreen explainers</p>
			<h1>The core concepts you should not have to relearn on every topic page.</h1>
			<p>
				These explainers carry the recurring ideas behind the site: evidence hierarchies, risk, causation,
				replication, falsifiability, and the difference between settled consensus and frontier debate.
			</p>
		</header>

		<section class="explainer-grid">
			<article v-for="explainer in evergreenExplainers" :key="explainer.slug" class="explainer-card">
				<div>
					<p class="eyebrow">Explainer</p>
					<h2>{{ explainer.title }}</h2>
				</div>
				<p>{{ explainer.summary }}</p>
				<section class="explainer-card__section">
					<h3>Why it matters</h3>
					<p>{{ explainer.whyItMatters }}</p>
				</section>
				<section class="explainer-card__section">
					<h3>Key points</h3>
					<ul>
						<li v-for="point in explainer.keyPoints" :key="point">{{ point }}</li>
					</ul>
				</section>
			</article>
		</section>

		<section class="explainer-callout">
			<div>
				<p class="eyebrow">Use the library, then return to the claim</p>
				<h2>These are support pages, not a detour.</h2>
				<p>
					Use them when a topic page references evidence hierarchies, uncertainty, or media distortion and you
					want the fuller explanation once, in one place.
				</p>
			</div>
			<div class="explainer-callout__actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
				<NuxtLink class="button button--ghost" to="/standards">Read editorial standards</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.explainer-page {
	display: grid;
	gap: 24px;
}

.explainer-header,
.explainer-card,
.explainer-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.explainer-header,
.explainer-callout {
	padding: 22px;
}

.explainer-header h1,
.explainer-card h2,
.explainer-card h3,
.explainer-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.explainer-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.explainer-header p,
.explainer-card p,
.explainer-card li,
.explainer-callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.explainer-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.explainer-card {
	padding: 22px;
	display: grid;
	gap: 14px;
}

.explainer-card__section {
	display: grid;
	gap: 8px;
}

.explainer-card__section p,
.explainer-card__section ul {
	margin: 0;
}

.explainer-card__section ul {
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.explainer-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.explainer-callout__actions {
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
	background: var(--consensus-interactive);
	border-color: var(--consensus-interactive);
	color: #fff;
}

@media (max-width: 900px) {
	.explainer-grid {
		grid-template-columns: 1fr;
	}
}
</style>
