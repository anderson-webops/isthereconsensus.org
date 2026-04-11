<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	"Canonical pages should not be silently rewritten when the bottom line changes in a meaningful way.",
	"Corrections, updates, routine reviews, and archival actions should be labeled differently in the public change log.",
	"Credible correction requests should identify the exact claim text, the evidence problem, and the best supporting sources.",
	"A flagged citation, major correction, or retraction should trigger fast editorial review rather than waiting for the next routine review date."
];

const correctionTypes = [
	{
		title: "Correction",
		body: "Use when the published page contains a factual error, a materially misleading statement, or a citation problem that changes how the current page should be read."
	},
	{
		title: "Update",
		body: "Use when new evidence, a guideline change, or a major assessment justifies revising the current synthesis without the old version being treated as an outright error."
	},
	{
		title: "Review",
		body: "Use for scheduled maintenance checks where the team re-runs the evidence scan and confirms or lightly refreshes the page."
	},
	{
		title: "Archive or withdraw",
		body: "Use when a claim page should stay in the public record but is no longer the correct live destination, or when a serious issue makes the page unsuitable to present as current."
	}
];

const submitChecklist = [
	"quote the exact claim statement or paragraph you think needs attention",
	"explain whether the issue is factual, citation-related, scope-related, or wording-related",
	"include the strongest available sources, ideally reviews, guidelines, assessments, or clearly identified primary studies",
	"note whether the problem is urgent because of a correction, retraction, safety issue, or active misinformation spike"
];

const responseFlow = [
	"triage the report as a moderation issue, a normal editorial revision request, or a possible urgent correction",
	"check whether the cited source stack or key identifiers need immediate integrity review",
	"re-run the relevant editorial or expert review step if the issue could change the public bottom line",
	"publish the result with a visible change-log entry rather than silently replacing the old text"
];

const triggerExamples = [
	"a major guideline body changes its recommendation or uncertainty language",
	"a systematic review or meta-analysis materially changes the direction or size of the effect",
	"a cornerstone citation is corrected, retracted, or receives an expression of concern",
	"a claim page is shown to have merged two different scopes or populations that should be separated"
];

useHead({
	title: "Corrections policy - Is There Consensus?"
});
</script>

<template>
	<div class="corrections-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Corrections policy' }]" />

		<header class="corrections-header">
			<p class="eyebrow">Corrections policy</p>
			<h1>How factual corrections and major updates should be handled.</h1>
			<p>
				The goal is a visible scholarly record, not silent copy edits that make it impossible to tell what
				changed or why a page moved.
			</p>
		</header>

		<section class="corrections-summary">
			<article v-for="item in quickPoints" :key="item" class="summary-card">
				<p>{{ item }}</p>
			</article>
		</section>

		<section class="corrections-panel">
			<div class="section-heading section-heading--tight">
				<h2>Public change types</h2>
				<p>The site should distinguish normal review from true correction work.</p>
			</div>
			<div class="card-grid">
				<article v-for="item in correctionTypes" :key="item.title" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="corrections-panel corrections-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>What a strong correction request should include</h2>
				<p>
					Specific requests are easier to review than general accusations that a page is “biased” or “wrong.”
				</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in submitChecklist" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="corrections-panel">
			<div class="section-heading section-heading--tight">
				<h2>How the site should respond</h2>
				<p>Corrections should move through a bounded workflow, not an ad hoc argument thread.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in responseFlow" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="corrections-panel">
			<div class="section-heading section-heading--tight">
				<h2>Examples of update triggers</h2>
				<p>Some changes should trigger immediate review even if the next scheduled review is far away.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in triggerExamples" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="corrections-callout">
			<div>
				<p class="eyebrow">Report a problem</p>
				<h2>Send correction evidence to the editorial layer.</h2>
				<p>
					For factual correction requests, source-stack problems, or major update triggers, email
					<a href="mailto:consensus@isthereconsensus.org">consensus@isthereconsensus.org</a> with the claim
					URL, the exact text at issue, and the best evidence you have.
				</p>
			</div>
			<div class="corrections-callout__actions">
				<NuxtLink class="button button--primary" to="/governance">Governance and workflow</NuxtLink>
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
				<NuxtLink class="button button--ghost" to="/community-guidelines">Community guidelines</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.corrections-page {
	display: grid;
	gap: 24px;
}

.corrections-header,
.corrections-panel,
.summary-card,
.detail-card,
.corrections-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.corrections-header,
.corrections-panel,
.corrections-callout {
	padding: 22px;
}

.corrections-header h1,
.section-heading h2,
.detail-card h3,
.corrections-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.corrections-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.corrections-header p,
.summary-card p,
.detail-card p,
.plain-list,
.corrections-callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.corrections-summary,
.card-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.summary-card,
.detail-card {
	padding: 18px;
}

.summary-card p,
.detail-card p,
.plain-list {
	margin: 0;
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
	margin-bottom: 12px;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.corrections-panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.corrections-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.corrections-callout__actions {
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

.corrections-callout a {
	color: var(--consensus-ink);
}
</style>
