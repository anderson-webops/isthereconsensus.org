<script setup lang="ts">
import type { SearchDemandOpportunity } from "~/data/searchDemand";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import {
	demandOpportunities,
	demandPrinciples,
	holdTopics,
	measurementLoop,
	publishingPlan,
	queryPatternRows
} from "~/data/searchDemand";

const opportunitiesByCluster = Object.entries(
	demandOpportunities.reduce<Record<string, SearchDemandOpportunity[]>>((map, item) => {
		if (!map[item.cluster]) map[item.cluster] = [];
		map[item.cluster].push(item);
		return map;
	}, {})
).map(([cluster, items]) => ({ cluster, items }));

useHead({
	title: "Search demand - Is There Consensus?"
});
</script>

<template>
	<div class="search-demand-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Search demand' }]" />

		<header class="page-header">
			<p class="eyebrow">Search demand and misinformation pressure</p>
			<h1>What people actually search should shape what the site builds next.</h1>
			<p>
				This page turns recurring query phrasing into product guidance. It highlights the claim pages and
				explainers most likely to reduce confusion because they match real public search behavior, not just
				abstract editorial preference.
			</p>
		</header>

		<section class="panel panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Selection rules</h2>
				<p>Use search demand as a prioritization signal, not as a substitute for evidence standards.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in demandPrinciples" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Top opportunities by cluster</p>
					<h2>High-value future pages from recurring public demand</h2>
				</div>
				<p>
					These clusters combine stable consensus, durable misinformation patterns, and phrasing people really
					type into search.
				</p>
			</div>

			<div class="cluster-stack">
				<section v-for="group in opportunitiesByCluster" :key="group.cluster" class="cluster-section">
					<div class="section-heading section-heading--tight">
						<h3>{{ group.cluster }}</h3>
						<p>{{ group.items.length }} suggested surfaces</p>
					</div>
					<div class="opportunity-grid">
						<article v-for="item in group.items" :key="item.title" class="detail-card">
							<p class="detail-card__meta">
								<span>{{ item.format }}</span>
								<span>{{ item.anchors.join(" · ") }}</span>
							</p>
							<h4>{{ item.title }}</h4>
							<p>{{ item.whyItMatters }}</p>
							<ul class="plain-chip-list">
								<li v-for="query in item.querySignals" :key="query">{{ query }}</li>
							</ul>
						</article>
					</div>
				</section>
			</div>
		</section>

		<section class="panel panel--soft">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Query patterns</p>
					<h2>What common search phrasing usually means</h2>
				</div>
				<p>
					Some phrasing patterns are strong signals that the user needs a canonical claim page. Others are
					really evidence-literacy problems in disguise.
				</p>
			</div>

			<div class="pattern-grid">
				<article v-for="row in queryPatternRows" :key="row.pattern" class="detail-card detail-card--accent">
					<p class="eyebrow">{{ row.bestFit }}</p>
					<h3>{{ row.pattern }}</h3>
					<p>{{ row.signal }}</p>
					<ul class="plain-list plain-list--tight">
						<li v-for="example in row.examples" :key="example">{{ example }}</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Twelve-week publishing plan</p>
					<h2>One practical way to sequence the next quarter</h2>
				</div>
				<p>
					Start with stable binary claims that match repeated query phrasing, then add the explainers that
					reduce repeat work across those clusters.
				</p>
			</div>

			<div class="plan-list">
				<article v-for="row in publishingPlan" :key="`${row.week}-${row.title}`" class="plan-row">
					<div>
						<p class="detail-card__meta">
							<span>{{ row.week }}</span>
							<span>{{ row.type }}</span>
							<span>{{ row.cluster }}</span>
						</p>
						<h3>{{ row.title }}</h3>
						<p>{{ row.rationale }}</p>
					</div>
				</article>
			</div>
		</section>

		<section class="panel panel--soft">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Too unsettled to target yet</p>
					<h2>Topics that need explainer-first or living-review treatment</h2>
				</div>
				<p>
					Not every high-interest topic should become a binary claim page. These are better delayed or framed
					more carefully.
				</p>
			</div>
			<div class="hold-grid">
				<article v-for="item in holdTopics" :key="item.title" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.whyItWaits }}</p>
					<p class="detail-card__small"><strong>Best format:</strong> {{ item.bestFormat }}</p>
				</article>
			</div>
		</section>

		<section class="panel">
			<div class="section-heading section-heading--tight">
				<h2>What to measure while the roadmap runs</h2>
				<p>Use demand signals to learn which surfaces actually reduce duplicate posting and confusion.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in measurementLoop" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="callout">
			<div>
				<p class="eyebrow">Operational takeaway</p>
				<h2>Search demand should sharpen the queue, not replace evidence discipline.</h2>
				<p>
					The best next pages are the ones where public phrasing, public harm, and strong institutional
					anchors all overlap. This search lens helps the editorial team find them earlier and route users
					more accurately.
				</p>
			</div>
			<div class="callout__actions">
				<NuxtLink class="button button--primary" to="/claim-roadmap">Open the claim roadmap</NuxtLink>
				<NuxtLink class="button button--ghost" to="/ask">Use the ask flow</NuxtLink>
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.search-demand-page {
	display: grid;
	gap: 24px;
}

.page-header,
.panel,
.detail-card,
.plan-row,
.callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.page-header,
.panel,
.callout {
	padding: 22px;
}

.page-header h1,
.section-heading h2,
.section-heading h3,
.detail-card h3,
.detail-card h4,
.plan-row h3,
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
.detail-card p,
.plan-row p,
.callout p,
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
	margin-bottom: 18px;
}

.section-heading--tight {
	margin-bottom: 14px;
}

.section-heading h2,
.section-heading h3,
.section-heading p,
.page-header p,
.callout p,
.callout h2 {
	margin: 0;
}

.cluster-stack,
.plan-list {
	display: grid;
	gap: 18px;
}

.cluster-section {
	display: grid;
	gap: 14px;
}

.opportunity-grid,
.pattern-grid,
.hold-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.detail-card,
.plan-row {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.detail-card--accent {
	border-left: 4px solid var(--consensus-debate);
}

.detail-card__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	margin: 0;
	font-size: 0.9rem;
	font-weight: 600;
	color: var(--consensus-muted);
}

.detail-card__small {
	margin: 0;
	font-size: 0.95rem;
}

.plain-list {
	margin: 0;
	padding-left: 18px;
	display: grid;
	gap: 10px;
}

.plain-list--tight {
	gap: 6px;
}

.plain-chip-list {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.plain-chip-list li {
	padding: 6px 10px;
	border-radius: 999px;
	background: color-mix(in srgb, var(--consensus-surface-soft) 84%, transparent);
	font-size: 0.85rem;
	color: var(--consensus-muted);
}

.callout {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
}

.callout__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	align-items: center;
}

@media (max-width: 760px) {
	.page-header,
	.panel,
	.callout {
		padding: 18px;
	}
}
</style>
