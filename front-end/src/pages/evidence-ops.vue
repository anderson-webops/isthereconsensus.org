<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const principles = [
	{
		title: "Traceable evidence graph",
		body: "Every public statement should map back to normalized sources, visible review notes, and a dated change trail rather than a black-box summary."
	},
	{
		title: "Automation for surveillance, not auto-conclusions",
		body: "Monitoring jobs should surface retractions, corrections, new syntheses, and guideline changes. Editors still decide whether the public bottom line moves."
	},
	{
		title: "Guideline updates are their own stream",
		body: "Institutional guidance can change practical recommendations faster than a single new study changes the evidence base, so the site watches those updates separately."
	},
	{
		title: "Appraisal belongs next to discovery",
		body: "Finding a source is not enough. The review layer should record what kind of study it is, how it was appraised, and how much certainty the body of evidence deserves."
	}
];

const stackRows = [
	{
		tier: "Must-have",
		tools: "Crossref, PubMed / Entrez, PMC ID Converter, Retraction Watch integration, Europe PMC",
		body: "These systems cover identifier normalization, biomedical discovery, and the integrity checks most likely to stop the site from leaning on invalidated papers."
	},
	{
		tier: "Should-have",
		tools: "OpenAlex, Unpaywall, guideline repositories and institutional feeds",
		body: "These expand cross-disciplinary discovery, improve full-text access, and make guideline replacement easier to catch early."
	},
	{
		tier: "Nice-to-have",
		tools: "PROSPERO, Epistemonikos, PubPeer",
		body: "These are useful for spotting upcoming syntheses, review matrices, and post-publication discussion, but they should not outrank the core identifier and integrity stack."
	}
];

const monitoringLoops = [
	{
		title: "Daily integrity loop",
		items: [
			"Check cited DOI / PMID / PMCID records for retractions, major corrections, and expressions of concern.",
			"Treat citation-status changes as immediate editorial tickets, not as passive metadata.",
			"Show visible banners when a cited source has been invalidated or materially corrected."
		]
	},
	{
		title: "Weekly or monthly literature loop",
		items: [
			"Re-run saved searches against the claim surveillance spec instead of relying on ad hoc searches.",
			"Prioritize new systematic reviews, meta-analyses, and major syntheses before isolated primary studies.",
			"Tune cadence by topic speed and review mode rather than forcing every page into one calendar schedule."
		]
	},
	{
		title: "Guideline monitoring loop",
		items: [
			"Track the institutions that define the public baseline for each claim.",
			"Escalate replacement, scope, or uncertainty-language changes from those institutions quickly.",
			"Treat recommendation changes as a higher-priority review stream than routine staleness checks."
		]
	}
];

const triggerRows = [
	{
		level: "Critical",
		body: "Retracted citations, expressions of concern, or major corrections in the current source stack. These should trigger visible page-level attention and immediate editorial review."
	},
	{
		level: "High priority",
		body: "New landmark syntheses, guideline replacements, or overdue monitoring checks on fast-moving claims. These should route into the editorial inbox within days, not months."
	},
	{
		level: "Routine",
		body: "Scheduled review cadence, watchlist refreshes, and lower-risk discovery updates that help keep the evidence trail fresh without implying the conclusion has changed."
	}
];

const dataObjects = [
	"Canonical claim record with a surveillance spec, review mode, and update policy.",
	"Work-normalization layer keyed by DOI, PMID, PMCID, and other stable identifiers.",
	"Source snapshots that store retrieval time, raw payload provenance, and rate-limit context.",
	"Appraisal records that separate study quality, risk of bias, and body-of-evidence certainty.",
	"Update tickets that connect raw monitoring events to editorial actions and public change-log entries."
];

const roadmapRows = [
	{
		phase: "Phase 1",
		title: "Normalization and audit trail",
		body: "Build normalized source records, snapshot retrieval metadata, and an editorial inbox that can explain what changed and which claim pages are affected."
	},
	{
		phase: "Phase 2",
		title: "Retraction and guideline monitoring",
		body: "Wire in the highest-risk monitors first: retractions, corrections, expressions of concern, and version changes from the institutions that anchor the site’s public summaries."
	},
	{
		phase: "Phase 3",
		title: "Discovery scale and richer appraisal",
		body: "Expand cross-disciplinary discovery, formalize appraisal templates, and support living-review style monitoring only where the workflow actually exists."
	}
];

useHead({
	title: "Evidence operations - Is There Consensus?"
});
</script>

<template>
	<div class="ops-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Evidence operations' }]" />

		<header class="ops-header">
			<p class="eyebrow">Evidence operations</p>
			<h1>The monitoring system behind durable claim pages.</h1>
			<p>
				This site should not update because a headline is loud. It should update because the evidence graph,
				institutional baseline, or source integrity status actually changed.
			</p>
		</header>

		<section class="ops-panel">
			<div class="section-heading section-heading--tight">
				<h2>Core operating principles</h2>
				<p>These rules keep evidence surveillance useful without pretending the site can automate judgment.</p>
			</div>
			<div class="ops-grid ops-grid--cards">
				<article v-for="item in principles" :key="item.title" class="ops-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="ops-panel ops-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Evidence-ops stack</h2>
				<p>
					The stack should start with normalization and integrity, then expand into discovery and convenience
					layers.
				</p>
			</div>
			<div class="ops-grid ops-grid--cards">
				<article v-for="item in stackRows" :key="item.tier" class="ops-card">
					<p class="eyebrow">{{ item.tier }}</p>
					<h3>{{ item.tools }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="ops-panel">
			<div class="section-heading section-heading--tight">
				<h2>Monitoring loops</h2>
				<p>
					A living evidence workflow is really a repeatable surveillance-and-triage loop with human review at
					the end.
				</p>
			</div>
			<div class="ops-grid ops-grid--cards">
				<article v-for="item in monitoringLoops" :key="item.title" class="ops-card">
					<h3>{{ item.title }}</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="entry in item.items" :key="entry">{{ entry }}</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="ops-panel">
			<div class="section-heading section-heading--tight">
				<h2>Trigger severities</h2>
				<p>
					Not every update signal deserves the same treatment. Severity should shape both timing and
					visibility.
				</p>
			</div>
			<div class="ops-grid ops-grid--cards">
				<article v-for="item in triggerRows" :key="item.level" class="ops-card">
					<h3>{{ item.level }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="ops-panel ops-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Data objects the site should preserve</h2>
				<p>Readers see the summary. Operators need the audit trail behind it.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in dataObjects" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="ops-panel">
			<div class="section-heading section-heading--tight">
				<h2>Practical roadmap</h2>
				<p>Build the audit foundation first. Add richer discovery only after the integrity loop is reliable.</p>
			</div>
			<div class="ops-grid ops-grid--cards">
				<article v-for="item in roadmapRows" :key="item.phase" class="ops-card">
					<p class="eyebrow">{{ item.phase }}</p>
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="ops-callout">
			<div>
				<p class="eyebrow">Why this matters</p>
				<h2>Readers should be able to inspect the update logic, not just the latest conclusion.</h2>
				<p>
					Trust improves when the site explains what it watches, how often it checks, and what kinds of
					signals force a human review.
				</p>
			</div>
			<div class="ops-callout__actions">
				<NuxtLink class="button button--primary" to="/methods">Methods playbook</NuxtLink>
				<NuxtLink class="button button--ghost" to="/automation-and-ai">Automation and AI</NuxtLink>
				<NuxtLink class="button button--ghost" to="/standards">Editorial standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/policy-center">Policy center</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.ops-page {
	display: grid;
	gap: 24px;
}

.ops-header,
.ops-panel,
.ops-card,
.ops-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.ops-header,
.ops-panel,
.ops-callout {
	padding: 22px;
}

.ops-header h1,
.section-heading h2,
.ops-card h3,
.ops-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.ops-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.ops-header p,
.ops-card p,
.ops-callout p,
.plain-list {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.ops-grid {
	display: grid;
	gap: 14px;
}

.ops-grid--cards {
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ops-card {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.ops-panel--soft {
	background: color-mix(in srgb, var(--consensus-method) 14%, var(--consensus-surface));
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

.ops-callout {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.ops-callout__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

@media (max-width: 920px) {
	.ops-grid--cards {
		grid-template-columns: 1fr;
	}
}
</style>
