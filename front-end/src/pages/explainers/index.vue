<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { evergreenExplainers } from "~/data/explainers";

useStaticPageMeta({
	description:
		"Read short evergreen explainers for evidence hierarchies, causation, risk, replication, and scientific uncertainty.",
	path: "/explainers",
	title: "Evergreen explainers - Is There Consensus?"
});
</script>

<template>
	<div class="explainer-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Evergreen explainers' }]" />

		<header class="explainer-header">
			<p class="eyebrow">Evergreen explainers</p>
			<h1>Core concepts behind recurring confusion.</h1>
			<p>
				Evidence hierarchies, risk, causation, replication, falsifiability, and the line between settled
				consensus and frontier debate.
			</p>
		</header>

		<section class="explainer-grid">
			<NuxtLink
				v-for="explainer in evergreenExplainers"
				:key="explainer.slug"
				class="explainer-card"
				:to="`/explainers/${explainer.slug}`"
			>
				<div>
					<p class="eyebrow">Explainer</p>
					<h2>{{ explainer.title }}</h2>
				</div>
				<p>{{ explainer.summary }}</p>
				<span class="explainer-card__link">Read explainer</span>
			</NuxtLink>
		</section>

		<section class="explainer-callout">
			<div>
				<p class="eyebrow">Reviewed library</p>
				<h2>See these concepts in context.</h2>
			</div>
			<div class="explainer-callout__actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.explainer-page {
	display: grid;
	gap: 22px;
}

.explainer-header,
.explainer-card {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
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
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
}

.explainer-header p,
.explainer-card p,
.explainer-card li,
.explainer-callout p {
	color: var(--consensus-muted);
	line-height: 1.66;
}

.explainer-header p,
.explainer-callout p {
	max-width: 68ch;
}

.explainer-callout > div {
	flex: 1 1 340px;
	max-width: 68ch;
}

.explainer-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.explainer-card {
	padding: 20px;
	display: grid;
	gap: 14px;
	align-content: start;
	color: var(--consensus-ink);
	text-decoration: none;
	transition:
		border-color 160ms ease,
		transform 160ms ease;
}

.explainer-card:hover,
.explainer-card:focus-visible {
	border-color: var(--consensus-interactive);
	transform: translateY(-2px);
}

.explainer-card h2 {
	line-height: 1.2;
}

.explainer-card__link {
	align-self: end;
	font-weight: 600;
	color: var(--consensus-interactive);
}

.explainer-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
	padding-right: 0;
	padding-left: 0;
	border-top: 1px solid var(--consensus-soft-line);
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
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

@media (max-width: 900px) {
	.explainer-grid {
		grid-template-columns: 1fr;
	}

	.explainer-card,
	.explainer-header,
	.explainer-callout {
		padding: 18px;
	}

	.explainer-callout {
		align-items: stretch;
		padding-right: 0;
		padding-left: 0;
	}

	.explainer-callout__actions {
		width: 100%;
	}
}
</style>
