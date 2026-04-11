<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

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
		title: "Tier 1 · Guidelines and consensus statements",
		body: "Use these to define the shared baseline among major expert bodies. They anchor the public-facing answer."
	},
	{
		title: "Tier 2 · Systematic reviews and meta-analyses",
		body: "Use these to summarize the body of evidence and avoid cherry-picking isolated studies."
	},
	{
		title: "Tier 3 · Pivotal primary studies",
		body: "Use these when one trial or landmark paper materially changed the field or clarifies an active disagreement."
	},
	{
		title: "Tier 4 · Context and background",
		body: "Use these for mechanism, history, and terminology. They should not outrank higher-tier synthesis sources."
	}
];

const updateRules = [
	"Trigger updates when a new landmark synthesis changes the direction or size of the effect.",
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
					When a reader can see the rubric, the search scope, the source tiers, and the update trail, the page
					stops sounding like a black box.
				</p>
			</div>
			<div class="methods-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">Editorial standards</NuxtLink>
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
	flex-wrap: wrap;
	align-items: end;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.rubric-grid,
.detail-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.rubric-card,
.detail-card {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.plain-list--tight {
	gap: 8px;
	padding-left: 18px;
}

.methods-panel--soft {
	background: var(--consensus-elevated-surface);
}

.methods-callout {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
	align-items: end;
}

.methods-callout__actions {
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
	text-decoration: none;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.button--ghost {
	background: transparent;
	color: var(--consensus-ink);
}

@media (max-width: 820px) {
	.rubric-grid,
	.detail-grid {
		grid-template-columns: 1fr;
	}
}
</style>
