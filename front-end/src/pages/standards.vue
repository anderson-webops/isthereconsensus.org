<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const sourceStack = [
	"Use a two-layer anchor by default: one current institutional conclusion and one independent synthesis.",
	"Consensus statements, clinical guidelines, regulator reviews, and major assessments anchor the public summary.",
	"Single studies can inform context, but they do not outrank the broader literature or a methods-explicit assessment body."
];

const publicationRules = [
	"Publish a reviewed claim when multiple independent reviews or major institutions converge on the same bottom line.",
	"If the evidence is still split, say so directly instead of forcing false certainty.",
	"When institutions disagree, explain the baseline and then the narrower point of disagreement."
];

const updateTriggers = [
	"A new landmark review materially changes the direction, size, or mechanism of the current summary.",
	"A major professional society, regulator, or assessment body updates its formal guidance.",
	"A heavily cited paper used on the page is retracted or materially corrected.",
	"An editorial review date passes and the claim is flagged as needing a refresh."
];

const citationRules = [
	"Core public claims should rely on peer-reviewed syntheses or official reports, not blogs, anonymous commentary, or isolated preprints.",
	"Systematic reviews, meta-analyses, and major institutional guidance should outrank individual studies unless a landmark trial changed the field.",
	"When evidence is early or thin, the page should say that clearly."
];

const disagreementRules = [
	"Restrict institutional disagreement to reputable bodies with explicit methods.",
	"Label whether the disagreement is about evidence, thresholds, feasibility, or policy values.",
	"Do not present a minority institutional view like a 50-50 split when the broader literature is not actually balanced."
];

const pageSignals = [
	"Original publish date and last evidence review date",
	"Expert agreement and evidence certainty shown as separate ratings",
	"Source stack counts by type, anchor-source labels, and DOI/PMID visibility where available",
	"Outcome-level evidence summaries and institutional anchor metadata",
	"A visible change log when the page moves"
];

useHead({
	title: "Editorial standards - Is There Consensus?"
});
</script>

<template>
	<div class="standards-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Editorial standards' }]" />

		<header class="standards-header">
			<p class="eyebrow">Editorial standards</p>
			<h1>What a reviewed claim has to meet before it goes public.</h1>
			<p>
				This page covers the public publishing bar: what sources matter most, when a claim is ready, and what a
				reader should be able to inspect on the page.
			</p>
		</header>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>Institution-first source hierarchy</h2>
				<p>The order of evidence that carries the public summary.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in sourceStack" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>When a claim is settled enough to publish</h2>
				<p>The basic publication threshold.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in publicationRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel standards-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Update triggers</h2>
				<p>Pages should move when the evidence or institutional baseline moves.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in updateTriggers" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>Source and citation policy</h2>
				<p>What can carry the reviewed answer and what cannot.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in citationRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel standards-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Handling disagreement among experts or institutions</h2>
				<p>Disagreement should be explained, not flattened into confusion.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in disagreementRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>What readers should see on the page</h2>
				<p>The minimum public trust signals.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in pageSignals" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-callout">
			<div>
				<p class="eyebrow">Why this matters</p>
				<h2>Readers should not have to guess why a page is trustworthy.</h2>
				<p>
					Transparency is part of the product. A reviewed claim should show the evidence hierarchy, the
					uncertainty, and the update trail without sending readers through a maze of process pages.
				</p>
			</div>
			<div class="standards-callout__actions">
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
				<NuxtLink class="button button--ghost" to="/source-standards">Source-stack standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/conflicts-and-funding">Conflict disclosure</NuxtLink>
				<NuxtLink class="button button--ghost" to="/expert-review-program">Verified expert review</NuxtLink>
				<NuxtLink class="button button--ghost" to="/policy-center">Policy center</NuxtLink>
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.standards-page {
	display: grid;
	gap: 24px;
}

.standards-header,
.standards-panel,
.institution-card,
.standards-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.standards-header,
.standards-panel,
.standards-callout {
	padding: 22px;
}

.standards-header h1,
.section-heading h2,
.institution-card h3,
.standards-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.standards-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.standards-header p,
.plain-list,
.institution-card p,
.standards-callout p {
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

.section-heading p,
.section-heading h2,
.standards-header p,
.standards-callout p,
.standards-callout h2 {
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

.institution-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.institution-card {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.institution-card p,
.institution-card h3 {
	margin: 0;
}

.text-link {
	color: var(--consensus-interactive);
	font-weight: 600;
	text-decoration: none;
}

.standards-callout {
	display: grid;
	gap: 16px;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.standards-callout__actions {
	display: flex;
	gap: 10px;
	justify-content: end;
	flex-wrap: wrap;
}

@media (max-width: 760px) {
	.standards-callout {
		grid-template-columns: 1fr;
	}

	.standards-callout__actions {
		justify-content: start;
	}
}
</style>
