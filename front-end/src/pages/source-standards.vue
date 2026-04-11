<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { fallbackSourceStandard, sourceStandardList } from "~/data/sourceStandards";

const displayStandards = [fallbackSourceStandard, ...sourceStandardList];

const crossCuttingRules = [
	"Use a two-layer anchor by default: one current institutional conclusion plus one independent synthesis.",
	"Treat institutional disagreement as differential weighting, not as two symmetrical camps.",
	"Keep prominence proportional to evidence strength and institutional representativeness.",
	"Use update triggers tied to assessments, guidelines, safety signals, and major syntheses instead of media cycles.",
	"Do not let mechanism papers, preprints, or commentary outrank decision-facing reviews."
];

useHead({
	title: "Source-stack standards - Is There Consensus?"
});
</script>

<template>
	<div class="source-standards-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Source-stack standards' }]" />

		<header class="page-header">
			<p class="eyebrow">Institution-first sourcing</p>
			<h1>How each topic cluster should build a durable source stack.</h1>
			<p>
				These standards keep claim pages anchored in institutions and syntheses that already carry
				public-service, assessment, or guideline responsibilities. The default is simple: use one current
				institutional conclusion, check it against an independent synthesis, then place primary studies and
				context below that.
			</p>
		</header>

		<section class="panel panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Cross-cutting rules</h2>
				<p>The site should apply these rules before it specializes by cluster.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in crossCuttingRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section v-for="standard in displayStandards" :id="standard.slug" :key="standard.slug" class="panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Cluster standard</p>
					<h2>{{ standard.title }}</h2>
				</div>
				<p>{{ standard.summary }}</p>
			</div>

			<div class="anchor-check-grid">
				<article class="detail-card detail-card--accent">
					<h3>Anchor A</h3>
					<p>{{ standard.twoLayer.anchorA }}</p>
				</article>
				<article class="detail-card detail-card--accent">
					<h3>Anchor B</h3>
					<p>{{ standard.twoLayer.anchorB }}</p>
				</article>
				<article class="detail-card">
					<h3>Why both layers matter</h3>
					<p>{{ standard.twoLayer.why }}</p>
				</article>
			</div>

			<div class="detail-grid">
				<article class="detail-card">
					<h3>Primary anchors</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="anchor in standard.primaryAnchors" :key="anchor.name">
							<strong>{{ anchor.name }}:</strong> {{ anchor.note }}
						</li>
					</ul>
				</article>

				<article class="detail-card">
					<h3>Secondary anchors</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="anchor in standard.secondaryAnchors" :key="anchor.name">
							<strong>{{ anchor.name }}:</strong> {{ anchor.note }}
						</li>
					</ul>
				</article>
			</div>

			<div class="detail-grid">
				<article class="detail-card">
					<h3>What counts as an anchor source</h3>
					<p>{{ standard.anchorSourceRule }}</p>
				</article>
				<article class="detail-card">
					<h3>What stays supporting context only</h3>
					<p>{{ standard.supportContextRule }}</p>
				</article>
			</div>

			<div class="hierarchy-grid">
				<article v-for="tier in standard.sourceHierarchy" :key="tier.title" class="detail-card">
					<h3>{{ tier.title }}</h3>
					<p>{{ tier.body }}</p>
				</article>
			</div>

			<div class="detail-grid">
				<article class="detail-card">
					<h3>Do not overweight</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="item in standard.avoidOverweighting" :key="item">{{ item }}</li>
					</ul>
				</article>
				<article class="detail-card">
					<h3>Update triggers</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="item in standard.updateTriggers" :key="item">{{ item }}</li>
					</ul>
				</article>
			</div>

			<div class="detail-grid">
				<article class="detail-card">
					<h3>Typical disagreement patterns</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="item in standard.disagreementPatterns" :key="item">{{ item }}</li>
					</ul>
				</article>
				<article class="detail-card">
					<h3>How the page should summarize disagreement</h3>
					<p>{{ standard.disagreementRule }}</p>
				</article>
			</div>

			<div class="detail-grid">
				<article class="detail-card">
					<h3>Recurring misconception patterns</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="item in standard.misconceptionPatterns" :key="item">{{ item }}</li>
					</ul>
				</article>
				<article class="detail-card">
					<h3>Good canonical claim shapes</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="item in standard.exampleQuestions" :key="item">{{ item }}</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="callout">
			<div>
				<p class="eyebrow">Operational takeaway</p>
				<h2>Institutional sourcing is a product feature.</h2>
				<p>
					A readable claim page is not enough. The source stack has to stay inspectable, reproducible, and
					hard to game even when one topic is under active public pressure.
				</p>
			</div>
			<div class="callout__actions">
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
				<NuxtLink class="button button--ghost" to="/standards">Editorial standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/evidence-ops">Evidence operations</NuxtLink>
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
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
.detail-card,
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
.section-heading p,
.page-header p,
.callout p,
.callout h2 {
	margin: 0;
}

.anchor-check-grid,
.detail-grid,
.hierarchy-grid {
	display: grid;
	gap: 14px;
}

.anchor-check-grid,
.detail-grid {
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.hierarchy-grid {
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	margin-top: 14px;
}

.detail-card {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.detail-card--accent {
	border-left: 4px solid var(--consensus-debate);
}

.detail-card p,
.detail-card h3 {
	margin: 0;
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.plain-list--tight {
	gap: 6px;
}

.callout {
	display: grid;
	gap: 16px;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.callout__actions {
	display: flex;
	gap: 10px;
	justify-content: end;
	flex-wrap: wrap;
}

@media (max-width: 760px) {
	.callout {
		grid-template-columns: 1fr;
	}

	.callout__actions {
		justify-content: start;
	}
}
</style>
