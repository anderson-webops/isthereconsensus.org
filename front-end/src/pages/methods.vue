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

const wordingPatterns = [
	"Lead with a clear bottom line in plain language, then attribute the answer to evidence or institutions.",
	"Prefer neutral, factual phrasing such as 'current evidence suggests' over pushy or combative wording.",
	"Use modest qualifiers where needed so uncertainty is visible without diluting the main conclusion.",
	"Explain technical terms in everyday language the first time they appear."
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
			<h1>The public rubric behind each reviewed claim page.</h1>
			<p>
				This page explains the basic method: how agreement and certainty are shown, how source tiers work, and
				what review details should be visible on each page.
			</p>
		</header>

		<section class="methods-panel">
			<div class="section-heading section-heading--tight">
				<h2>The two-axis rubric</h2>
				<p>Agreement and certainty are separate signals.</p>
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
				<p>The minimum bar before a claim is published.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in publishabilityChecklist" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="methods-panel">
			<div class="section-heading section-heading--tight">
				<h2>The default two-layer anchor standard</h2>
				<p>
					Most reviewed pages should show both a current institutional conclusion and an independent
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
				<h2>Wording discipline</h2>
				<p>Trust and comprehension improve when the language stays plain, calm, and non-directive.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in wordingPatterns" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="methods-callout">
			<div>
				<p class="eyebrow">Why this matters</p>
				<h2>Trust comes from visible method.</h2>
				<p>
					Readers should be able to see the rubric, the source tiers, and the update trail without wading
					through internal workflow notes.
				</p>
			</div>
			<div class="methods-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">Editorial standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/source-standards">Source-stack standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/conflicts-and-funding">Conflict disclosure</NuxtLink>
				<NuxtLink class="button button--ghost" to="/policy-center">Policy center</NuxtLink>
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
