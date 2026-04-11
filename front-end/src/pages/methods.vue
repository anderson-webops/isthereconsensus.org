<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { sourceStandardList } from "~/data/sourceStandards";

const rubricRows = [
	{
		title: "Expert agreement",
		body: "How closely major reviews, institutional assessments, and qualified reviewers align on the core conclusion.",
		levels: ["Strong agreement", "Broad but qualified agreement", "Divided interpretations", "Frontier debate"]
	},
	{
		title: "Evidence certainty",
		body: "How stable the underlying body of evidence looks once bias, inconsistency, indirectness, and imprecision are considered.",
		levels: ["High", "Moderate", "Low", "Very low"]
	}
];

const publishabilityChecklist = [
	"Frame the claim as a testable question with a clear scope.",
	"Document where the evidence search happened and where the cutoff date lands.",
	"Prefer guidelines, consensus assessments, systematic reviews, and meta-analyses over isolated novelty.",
	"Judge study quality explicitly instead of letting every citation count the same.",
	"State what is settled, what is unsettled, and what would change the page.",
	"Declare conflicts of interest, reviewer roles, and editorial independence on the public page."
];

const twoLayerStandard = [
	{
		title: "Anchor A - Institutional conclusion",
		body: "Start with a current guideline, assessment, regulator decision, or consensus statement that directly answers the claim."
	},
	{
		title: "Anchor B - Independent synthesis",
		body: "Check that conclusion against an independent synthesis so the page is not leaning on one institution or one paper."
	},
	{
		title: "Why both layers matter",
		body: "This keeps claim pages durable under pressure and reduces the chance that one loud study, one media cycle, or one policy body dominates the public answer."
	}
];

const methodRequirements = [
	{
		title: "Search trail",
		body: "Every canonical claim page should say which databases were searched, what the search cutoff was, and how the team narrowed the field."
	},
	{
		title: "Inclusion rules",
		body: "The public page should say which evidence can carry the bottom line and which material only provides context."
	},
	{
		title: "Appraisal tools",
		body: "The review should show how the team judged the quality of trials, observational studies, and evidence syntheses."
	},
	{
		title: "Evidence summary objects",
		body: "Each page should expose reusable question-and-outcome summaries with direction, certainty, and limitations instead of relying on a flat source count."
	},
	{
		title: "Institutional anchors",
		body: "Readers should be able to see which guideline bodies, assessments, or consensus panels define the baseline for the claim."
	},
	{
		title: "Corrections discipline",
		body: "Readers should be able to see when a page changed, why it changed, and whether cornerstone citations were checked for retractions or corrections."
	}
];

const sourceTiers = [
	{
		title: "Tier 1 - Guidelines, assessments, and consensus statements",
		body: "These define the shared institutional baseline and should anchor the public-facing answer."
	},
	{
		title: "Tier 2 - Systematic reviews and meta-analyses",
		body: "These check whether the broader literature supports the same direction and certainty."
	},
	{
		title: "Tier 3 - Pivotal primary studies",
		body: "Use landmark trials or major studies when they materially changed the field or clarify a live disagreement."
	},
	{
		title: "Tier 4 - Context and background",
		body: "Mechanism, history, and terminology help explain the page, but they should not outrank synthesis."
	}
];

const updateRules = [
	"Trigger updates when a new landmark synthesis changes the direction, size, or mechanism of the current summary.",
	"Trigger updates when a major institution changes guidance or uncertainty language.",
	"Check cornerstone citations for retractions and major corrections on a visible schedule.",
	"Use living review status only on topics that actually have an update workflow behind them."
];

const evidenceOps = [
	"Ingest metadata through OpenAlex, Crossref, PubMed, and Europe PMC when appropriate.",
	"Normalize core identifiers such as DOI, PMID, PMCID, ORCID, and institutional IDs.",
	"Run integrity checks for retractions, corrections, expressions of concern, and guideline updates.",
	"Store retrieval snapshots and provenance so the team can show what changed and when it was checked.",
	"Send monitoring signals into an editorial inbox instead of auto-rewriting the public conclusion.",
	"Keep a visible public trail: source tiers, identifiers, search cutoff, review dates, and change log."
];

const misconceptionRules = [
	"Attach short misconception modules when the same interpretation error keeps reappearing on a claim page.",
	"Keep the short correction neutral, reusable, and tied to one fuller explainer instead of turning it into a custom argument every time.",
	"Use the module library to distinguish recurring reasoning mistakes from claim-specific evidence disputes."
];

useHead({
	title: "Methods playbook - Is There Consensus?"
});
</script>

<template>
	<div class="methods-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Methods playbook' }]" />

		<header class="methods-header">
			<p class="eyebrow">Methods playbook</p>
			<h1>The public rubric behind each canonical claim page.</h1>
			<p>
				This page makes the evidence model legible. The site should not ask readers to trust tone alone; it
				should show how agreement, certainty, sourcing, and updates are handled.
			</p>
		</header>

		<section class="methods-panel">
			<div class="section-heading section-heading--tight">
				<h2>The two-axis rubric</h2>
				<p>Consensus should not collapse evidence quality and agreement into a single fuzzy label.</p>
			</div>
			<div class="rubric-grid">
				<article v-for="item in rubricRows" :key="item.title" class="rubric-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
					<ul class="plain-list plain-list--tight">
						<li v-for="level in item.levels" :key="level">{{ level }}</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="methods-panel methods-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Minimum publishability checklist</h2>
				<p>A claim page should behave like a lightweight evidence synthesis, not a confident opinion post.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in publishabilityChecklist" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="methods-panel">
			<div class="section-heading section-heading--tight">
				<h2>The default two-layer anchor standard</h2>
				<p>
					Most canonical pages should show both a current institutional conclusion and an independent
					synthesis.
				</p>
			</div>
			<div class="detail-grid">
				<article v-for="item in twoLayerStandard" :key="item.title" class="detail-card detail-card--accent">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="methods-panel">
			<div class="section-heading section-heading--tight">
				<h2>What each page should expose</h2>
				<p>Readers should be able to inspect the method without opening a dense appendix first.</p>
			</div>
			<div class="detail-grid">
				<article v-for="item in methodRequirements" :key="item.title" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="methods-panel">
			<div class="section-heading section-heading--tight">
				<h2>Source stack logic</h2>
				<p>Not every citation should carry equal weight in the public summary.</p>
			</div>
			<div class="detail-grid">
				<article v-for="item in sourceTiers" :key="item.title" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="methods-panel methods-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Cluster source-stack standards</h2>
				<p>Different domains need different anchors, but the institution-first logic stays consistent.</p>
			</div>
			<div class="detail-grid">
				<article v-for="item in sourceStandardList" :key="item.slug" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.summary }}</p>
					<p><strong>Anchor A:</strong> {{ item.primaryAnchors[0]?.name }}</p>
					<p><strong>Anchor B:</strong> {{ item.twoLayer.anchorB }}</p>
					<NuxtLink class="text-link" :to="`/source-standards#${item.slug}`">Open cluster standard</NuxtLink>
				</article>
			</div>
		</section>

		<section class="methods-panel methods-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Update and corrections rules</h2>
				<p>Corrections and review cadence are part of the evidence model, not a footnote.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in updateRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="methods-panel">
			<div class="section-heading section-heading--tight">
				<h2>Evidence operations stack</h2>
				<p>The backend should support reliable discovery, integrity checks, and visible provenance.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in evidenceOps" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="methods-panel methods-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Misconception module discipline</h2>
				<p>The site should reuse the same interpretation corrections instead of rewriting them ad hoc.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in misconceptionRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="methods-callout">
			<div>
				<p class="eyebrow">Why this matters</p>
				<h2>Trust comes from visible process.</h2>
				<p>
					When a reader can see the rubric, the search scope, the source tiers, the institutional anchor
					logic, and the update trail, the page stops sounding like a black box.
				</p>
			</div>
			<div class="methods-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">Editorial standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/source-standards">Source-stack standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/misconceptions">Misconception modules</NuxtLink>
				<NuxtLink class="button button--ghost" to="/evidence-ops">Evidence operations</NuxtLink>
				<NuxtLink class="button button--ghost" to="/governance">Governance and workflow</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
				<NuxtLink class="button button--ghost" to="/consensus">Browse claim reviews</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.methods-page {
	display: grid;
	gap: 24px;
}

.methods-header,
.methods-panel,
.rubric-card,
.detail-card,
.methods-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.methods-header,
.methods-panel,
.methods-callout {
	padding: 22px;
}

.methods-header h1,
.section-heading h2,
.rubric-card h3,
.detail-card h3,
.methods-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.methods-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.methods-header p,
.rubric-card p,
.detail-card p,
.methods-callout p,
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

.section-heading p,
.section-heading h2,
.methods-header p,
.methods-callout p,
.methods-callout h2 {
	margin: 0;
}

.rubric-grid,
.detail-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.rubric-card,
.detail-card {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.detail-card--accent {
	border-left: 4px solid var(--consensus-debate);
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

.methods-callout {
	display: grid;
	gap: 16px;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.methods-callout__actions {
	display: flex;
	gap: 10px;
	justify-content: end;
	flex-wrap: wrap;
}

.text-link {
	color: var(--consensus-interactive);
	font-weight: 600;
	text-decoration: none;
}

@media (max-width: 760px) {
	.methods-callout {
		grid-template-columns: 1fr;
	}

	.methods-callout__actions {
		justify-content: start;
	}
}
</style>
