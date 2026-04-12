<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import {
	annualRoadmap,
	futureRoadmapPrinciples,
	highestLeverageImprovements,
	sixMonthRoadmap
} from "~/data/futureRoadmap";

useHead({
	title: "Future roadmap - Is There Consensus?"
});
</script>

<template>
	<div class="future-roadmap-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Future roadmap' }]" />

		<header class="page-header">
			<p class="eyebrow">Future roadmap</p>
			<h1>What should get built next, and in what order.</h1>
			<p>
				This roadmap turns the next six to twelve months into a bounded product plan. The goal is not just more
				pages. It is a stronger evidence model, better routing, and public claim pages that stay stable under
				challenge.
			</p>
		</header>

		<section class="panel panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>What the next phase should optimize for</h2>
				<p>These rules keep expansion aligned with the site’s core promise.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in futureRoadmapPrinciples" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Top 10</p>
					<h2>Highest-leverage improvements</h2>
				</div>
				<p>These are the upgrades that most directly improve trust, durability, and editorial throughput.</p>
			</div>

			<div class="improvement-grid">
				<article
					v-for="item in highestLeverageImprovements"
					:key="item.rank"
					class="detail-card detail-card--priority"
				>
					<p class="detail-card__meta">
						<span>#{{ item.rank }}</span>
						<span>Highest leverage</span>
					</p>
					<h3>{{ item.title }}</h3>
					<p>{{ item.whyItMatters }}</p>
					<p class="detail-card__small"><strong>Implement:</strong> {{ item.implementation }}</p>
					<p class="detail-card__small"><strong>Measure:</strong> {{ item.successMetric }}</p>
				</article>
			</div>
		</section>

		<section class="panel panel--soft">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Next 6 months</p>
					<h2>One practical execution sequence</h2>
				</div>
				<p>Build the evidence substrate first, then scale the public surface on top of it.</p>
			</div>

			<div class="roadmap-list">
				<article v-for="item in sixMonthRoadmap" :key="item.phase" class="roadmap-row">
					<div>
						<p class="detail-card__meta">
							<span>{{ item.phase }}</span>
							<span>Execution milestone</span>
						</p>
						<h3>{{ item.deliverables }}</h3>
						<p><strong>Depends on:</strong> {{ item.dependencies }}</p>
						<p><strong>Done when:</strong> {{ item.doneWhen }}</p>
					</div>
				</article>
			</div>
		</section>

		<section class="panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">12-month view</p>
					<h2>How the site should mature over the year</h2>
				</div>
				<p>Scale claim volume only after certainty, source integrity, and routing quality are stable.</p>
			</div>

			<div class="quarter-grid">
				<article v-for="item in annualRoadmap" :key="item.quarter" class="detail-card detail-card--accent">
					<p class="eyebrow">{{ item.quarter }}</p>
					<h3>{{ item.deliverables }}</h3>
					<p>{{ item.materialChange }}</p>
				</article>
			</div>
		</section>

		<section class="callout">
			<div>
				<p class="eyebrow">Operational takeaway</p>
				<h2>Scale only after the method layer is real.</h2>
				<p>
					The site already has the right public shape: claim first, evidence second, community last. The next
					phase is about making every part of that promise durable, inspectable, and operationally routine.
				</p>
			</div>
			<div class="callout__actions">
				<NuxtLink class="button button--primary" to="/claim-roadmap">Claim roadmap</NuxtLink>
				<NuxtLink class="button button--ghost" to="/search-demand">Search demand</NuxtLink>
				<NuxtLink class="button button--ghost" to="/evidence-ops">Evidence operations</NuxtLink>
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.future-roadmap-page {
	display: grid;
	gap: 24px;
}

.page-header,
.panel,
.detail-card,
.roadmap-row,
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
.detail-card h3,
.roadmap-row h3,
.callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.page-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
}

.page-header p,
.section-heading p,
.detail-card p,
.roadmap-row p,
.callout p,
.plain-list {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading--tight {
	align-items: start;
}

.section-heading h2,
.section-heading p {
	margin: 0;
}

.improvement-grid,
.quarter-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.roadmap-list {
	display: grid;
	gap: 12px;
}

.detail-card,
.roadmap-row {
	padding: 18px;
}

.detail-card--priority {
	border-left: 4px solid var(--consensus-debate);
}

.detail-card--accent {
	background: color-mix(in srgb, var(--consensus-surface) 90%, var(--consensus-method-tint) 10%);
}

.detail-card__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	margin: 0 0 10px;
	font-size: 0.82rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	font-weight: 600;
	color: var(--consensus-muted);
}

.detail-card__small {
	margin-top: 10px;
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.callout {
	display: grid;
	gap: 16px;
}

.callout__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

@media (max-width: 700px) {
	.page-header,
	.panel,
	.callout {
		padding: 18px;
	}
}
</style>
