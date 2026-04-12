<script setup lang="ts">
import type { ClaimRoadmapEntry } from "~/data/claimRoadmap";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import {
	backlogByCluster,
	backlogPrinciples,
	clusterSummaries,
	firstWaveClaims,
	holdClaims,
	secondWaveClaims,
	topPriorityClaims
} from "~/data/claimRoadmap";

function formatLabel(value: string) {
	return value
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

function topicLink(entry: ClaimRoadmapEntry) {
	return entry.topicSlug ? `/consensus/${entry.topicSlug}` : undefined;
}

useHead({
	title: "Claim roadmap - Is There Consensus?"
});
</script>

<template>
	<div class="claim-roadmap-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Claim roadmap' }]" />

		<header class="page-header">
			<p class="eyebrow">Canonical claim roadmap</p>
			<h1>The next public claim pages worth building.</h1>
			<p>
				This roadmap turns recurring misinformation pressure into a visible editorial queue. It prioritizes
				claims where public confusion is high, the harm from misunderstanding is real, and the source stack can
				be anchored in durable institutional and synthesis-grade evidence.
			</p>
		</header>

		<section class="panel panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Selection rules</h2>
				<p>Use these rules before a public question becomes a canonical claim page.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in backlogPrinciples" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Top 15</p>
					<h2>Highest-priority claim pages</h2>
				</div>
				<p>
					These are the pages with the best mix of public demand, public-health or policy value, and strong
					institutional anchors.
				</p>
			</div>

			<div class="priority-grid">
				<article v-for="entry in topPriorityClaims" :key="entry.slug" class="detail-card detail-card--priority">
					<p class="detail-card__meta">
						<span>#{{ entry.rank }}</span>
						<span>{{ entry.cluster }}</span>
						<span>{{ formatLabel(entry.consensusTier) }}</span>
						<span>{{ formatLabel(entry.evidenceCertainty) }} certainty</span>
					</p>
					<h3>{{ entry.title }}</h3>
					<p>{{ entry.whyItMatters }}</p>
					<ul class="plain-chip-list">
						<li v-for="anchor in entry.anchors" :key="anchor">{{ anchor }}</li>
					</ul>
					<p class="detail-card__small">
						<strong>Misconception pattern:</strong>
						{{ entry.misconceptions.join(", ") }}
					</p>
					<p class="detail-card__small">
						<strong>What would change minds:</strong>
						{{ entry.whatWouldChangeMinds }}
					</p>
					<div class="detail-card__actions">
						<span class="detail-badge">{{ entry.pageType }}</span>
						<NuxtLink v-if="topicLink(entry)" class="text-link" :to="topicLink(entry)!"
							>Open topic hub</NuxtLink
						>
					</div>
				</article>
			</div>
		</section>

		<section class="panel panel--soft">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Three-month plan</p>
					<h2>Build in waves, not in one giant queue</h2>
				</div>
				<p>
					The first wave should create reusable mechanism, risk-comparison, threshold, and climate-confidence
					modules. The second wave should reuse those modules instead of rebuilding the same concepts from
					scratch.
				</p>
			</div>

			<div class="wave-grid">
				<article class="detail-card detail-card--accent">
					<p class="eyebrow">First wave</p>
					<h3>Foundation pages</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="entry in firstWaveClaims" :key="entry.slug">{{ entry.title }}</li>
					</ul>
				</article>
				<article class="detail-card detail-card--accent">
					<p class="eyebrow">Second wave</p>
					<h3>High-demand follow-ons</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="entry in secondWaveClaims" :key="entry.slug">{{ entry.title }}</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="panel">
			<div class="section-heading section-heading--tight">
				<h2>Which clusters are most worth expanding now?</h2>
				<p>
					The site should concentrate where the evidence base is strong enough to carry a durable public
					answer.
				</p>
			</div>
			<div class="cluster-grid">
				<article v-for="item in clusterSummaries" :key="item.cluster" class="detail-card">
					<p class="eyebrow">{{ item.priority }}</p>
					<h3>{{ item.cluster }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Remaining 35</p>
					<h2>Backlog grouped by cluster</h2>
				</div>
				<p>
					These are still high-value, but many work better as follow-ons after the first-wave modules exist.
				</p>
			</div>

			<div class="cluster-stack">
				<section v-for="group in backlogByCluster" :key="group.cluster" class="cluster-section">
					<div class="section-heading section-heading--tight">
						<h3>{{ group.cluster }}</h3>
						<p>{{ group.items.length }} planned pages or explainers</p>
					</div>
					<div class="backlog-list">
						<article v-for="entry in group.items" :key="entry.slug" class="backlog-row">
							<div>
								<p class="detail-card__meta">
									<span>#{{ entry.rank }}</span>
									<span>{{ entry.pageType }}</span>
									<span>{{ formatLabel(entry.consensusTier) }}</span>
								</p>
								<h4>{{ entry.title }}</h4>
								<p>{{ entry.whyItMatters }}</p>
							</div>
							<div class="backlog-row__side">
								<span class="detail-badge">{{ formatLabel(entry.evidenceCertainty) }} certainty</span>
								<NuxtLink v-if="topicLink(entry)" class="text-link" :to="topicLink(entry)!"
									>Topic hub</NuxtLink
								>
							</div>
						</article>
					</div>
				</section>
			</div>
		</section>

		<section class="panel panel--soft">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Wait list</p>
					<h2>Topics that should wait for tighter uncertainty framing</h2>
				</div>
				<p>
					These topics are still worth covering, but they should not get a public page until the uncertainty
					box is stronger than the temptation to overstate the answer.
				</p>
			</div>
			<div class="hold-grid">
				<article v-for="entry in holdClaims" :key="entry.slug" class="detail-card">
					<p class="detail-card__meta">
						<span>#{{ entry.rank }}</span>
						<span>{{ entry.cluster }}</span>
					</p>
					<h3>{{ entry.title }}</h3>
					<p>{{ entry.whyItMatters }}</p>
					<p class="detail-card__small">
						<strong>Why it waits:</strong>
						{{ entry.whatWouldChangeMinds }}
					</p>
				</article>
			</div>
		</section>

		<section class="callout">
			<div>
				<p class="eyebrow">Operational takeaway</p>
				<h2>Use the roadmap to choose what becomes canonical next.</h2>
				<p>
					A visible queue keeps the site from drifting toward whatever topic had the loudest headline this
					week. It also makes it easier to explain why some public questions become full claim pages while
					others stay in explainers, topic hubs, or the hold queue.
				</p>
			</div>
			<div class="callout__actions">
				<NuxtLink class="button button--primary" to="/consensus">Browse current claim reviews</NuxtLink>
				<NuxtLink class="button button--ghost" to="/future-roadmap">Future roadmap</NuxtLink>
				<NuxtLink class="button button--ghost" to="/search-demand">Search-demand signals</NuxtLink>
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
				<NuxtLink class="button button--ghost" to="/standards">Editorial standards</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.claim-roadmap-page {
	display: grid;
	gap: 24px;
}

.page-header,
.panel,
.detail-card,
.backlog-row,
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
.backlog-row h4,
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
.backlog-row p,
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

.priority-grid,
.wave-grid,
.cluster-grid,
.hold-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.cluster-stack {
	display: grid;
	gap: 18px;
}

.cluster-section {
	display: grid;
	gap: 14px;
}

.backlog-list {
	display: grid;
	gap: 12px;
}

.detail-card,
.backlog-row {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.detail-card--priority {
	border-left: 4px solid var(--consensus-interactive);
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

.detail-card__actions,
.callout__actions,
.backlog-row__side {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	align-items: center;
}

.detail-badge {
	display: inline-flex;
	align-items: center;
	padding: 6px 10px;
	border-radius: 999px;
	background: color-mix(in srgb, var(--consensus-interactive) 12%, transparent);
	color: var(--consensus-ink);
	font-size: 0.85rem;
	font-weight: 700;
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

.backlog-row {
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: start;
}

.callout {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
}

.text-link {
	font-weight: 600;
	text-decoration: none;
}

@media (max-width: 760px) {
	.backlog-row {
		grid-template-columns: 1fr;
	}
}
</style>
