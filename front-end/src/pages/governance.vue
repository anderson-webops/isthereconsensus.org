<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	"Canonical claim pages are reviewed through a documented editorial workflow; they are not decided by open voting.",
	"Community questions stay public and useful, but they route into editorial intake rather than acting as consensus evidence.",
	"Verified experts review draft claims under structured rubrics, disclosure rules, and conflict-of-interest guardrails.",
	"Corrections, major updates, and claim withdrawals should stay visible in the public record rather than happening silently."
];

const principles = [
	"Method, source choice, and correction logic should be visible enough that readers can inspect the process.",
	"Public discussion, expert review, and canonical summaries are different layers and should stay distinct.",
	"High-conflict topics need stronger routing, moderation, and review controls than ordinary questions do.",
	"The site should prefer one coherent canonical claim page over multiple competing pages for the same proposition."
];

const workflowStages = [
	{
		title: "Stage A · Intake and pre-screening",
		body: "New submissions are checked for spam, manipulation, privacy risk, and obvious safety problems before they enter the editorial queues."
	},
	{
		title: "Stage B · Triage and routing",
		body: "An editorial reviewer decides whether the question should link to an existing claim, become a new draft, wait for clarification, or be removed as policy-breaking or duplicate."
	},
	{
		title: "Stage C · Draft claim construction",
		body: "The editorial layer scopes the proposition, maps the evidence base, and writes a draft package that can be reviewed consistently."
	},
	{
		title: "Stage D · Expert review assignment",
		body: "Routine claims should usually have at least two independent verified reviewers, with conflict-of-interest disclosures and method coverage where needed."
	},
	{
		title: "Stage E · Structured expert review",
		body: "Reviewers confirm wording, evidence hierarchy, missing sources, uncertainty drivers, and whether the draft overreaches beyond the evidence."
	},
	{
		title: "Stage F · Editorial synthesis and publication",
		body: "Editors publish the canonical page, explain what is settled versus unsettled, and record reviewer, version, and correction metadata."
	},
	{
		title: "Stage G · Monitoring and corrections",
		body: "Published claims stay on watch for corrections, retractions, new syntheses, and misinformation spikes that justify a visible update."
	}
];

const roleCards = [
	{
		title: "Admin",
		body: "Owns platform integrity, severe moderation actions, safety/legal handling, and final enforcement authority.",
		rights: ["safety queue access", "appeals oversight", "sitewide enforcement"]
	},
	{
		title: "Editorial reviewer",
		body: "Owns claim drafting, scoping, evidence mapping, review coordination, and final canonical synthesis.",
		rights: ["draft claims", "request review", "publish revisions"]
	},
	{
		title: "Verified expert",
		body: "Reviews draft claims for precision, evidence quality, missing sources, and overreach, but does not unilaterally publish them.",
		rights: ["submit expert review", "request revisions", "propose sources"]
	},
	{
		title: "Community user",
		body: "Can ask questions, post sources, flag problems, and help surface confusion without directly changing canonical text.",
		rights: ["public questions", "flagging", "thread participation"]
	}
];

const queueGroups = [
	{
		title: "Editorial queues",
		items: [
			"new submissions",
			"needs clarification",
			"candidate for existing-claim link",
			"candidate for new claim",
			"drafting",
			"expert recruitment",
			"in expert review",
			"ready to publish",
			"published and monitoring",
			"revision requested"
		]
	},
	{
		title: "Moderation and safety queues",
		items: ["flag queue", "high-conflict watchlist", "safety or legal escalation", "appeals"]
	}
];

const routingRules = [
	{
		title: "Link to an existing claim",
		body: "Use this when the question is really asking about the same proposition at the same scope and belongs under an existing canonical page."
	},
	{
		title: "Create a new draft claim",
		body: "Use this when no current claim covers the proposition cleanly and the answer needs a distinct evidence base, scope, or expert pool."
	},
	{
		title: "Mark duplicate",
		body: "Use this only when the proposition, scope, and practical answer are already represented elsewhere and the new thread adds no distinct editorial need."
	},
	{
		title: "Archive or redirect",
		body: "Use this when the content is no longer the best destination, but keeping the record helps search, history, or editorial continuity."
	},
	{
		title: "Remove or quarantine",
		body: "Use this for spam, harassment, privacy violations, coordinated manipulation, illegal material, or clearly non-scientific abuse of the platform."
	}
];

const metrics = [
	"time from submission to triage decision",
	"time from draft creation to expert assignment and completion",
	"duplicate rate and duplicate-link accuracy",
	"correction rate and time-to-correction after a credible report",
	"flags per 1,000 comments and median time to first moderator action",
	"appeal reversal rate, which is a useful signal for policy clarity and moderator consistency"
];

useHead({
	title: "Governance and workflow - Is There Consensus?"
});
</script>

<template>
	<div class="governance-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Governance and workflow' }]" />

		<header class="governance-header">
			<p class="eyebrow">Governance and workflow</p>
			<h1>How public questions become canonical claim pages.</h1>
			<p>
				The site uses a layered model: public community input stays open, canonical claim pages stay curated,
				and moderation follows explicit escalation rules instead of improvised one-off calls.
			</p>
		</header>

		<section class="governance-summary">
			<article v-for="item in quickPoints" :key="item" class="summary-card">
				<p>{{ item }}</p>
			</article>
		</section>

		<section class="governance-panel">
			<div class="section-heading section-heading--tight">
				<h2>Operating principles</h2>
				<p>The workflow should make editorial judgment legible rather than hiding it behind tone.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in principles" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="governance-panel governance-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Editorial pipeline</h2>
				<p>Each stage has a different job. Community input is not the same as publication approval.</p>
			</div>
			<div class="card-grid">
				<article v-for="item in workflowStages" :key="item.title" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="governance-panel">
			<div class="section-heading section-heading--tight">
				<h2>Roles and decision rights</h2>
				<p>People can contribute at different levels without collapsing all authority into one layer.</p>
			</div>
			<div class="card-grid">
				<article v-for="item in roleCards" :key="item.title" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
					<ul class="plain-list plain-list--tight">
						<li v-for="right in item.rights" :key="right">{{ right }}</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="governance-panel">
			<div class="section-heading section-heading--tight">
				<h2>Queue architecture</h2>
				<p>The queues are the governance model expressed in software.</p>
			</div>
			<div class="card-grid">
				<article v-for="group in queueGroups" :key="group.title" class="detail-card">
					<h3>{{ group.title }}</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="item in group.items" :key="item">{{ item }}</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="governance-panel governance-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Routing decision rules</h2>
				<p>These rules keep the site from forking the same answer into multiple competing pages.</p>
			</div>
			<div class="card-grid">
				<article v-for="item in routingRules" :key="item.title" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="governance-panel">
			<div class="section-heading section-heading--tight">
				<h2>Operational metrics</h2>
				<p>Good governance should be measurable, not just aspirational.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in metrics" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="governance-callout">
			<div>
				<p class="eyebrow">Related policies</p>
				<h2>Moderation, corrections, and editorial method should reinforce each other.</h2>
				<p>
					Use the linked pages if you want the conduct rules, correction path, or public evidence model in a
					more direct form.
				</p>
			</div>
			<div class="governance-callout__actions">
				<NuxtLink class="button button--primary" to="/community-guidelines">Community guidelines</NuxtLink>
				<NuxtLink class="button button--ghost" to="/moderation-and-appeals">Moderation and appeals</NuxtLink>
				<NuxtLink class="button button--ghost" to="/expert-review-program">Verified expert review</NuxtLink>
				<NuxtLink class="button button--ghost" to="/conflicts-and-funding">Conflict disclosure</NuxtLink>
				<NuxtLink class="button button--ghost" to="/evidence-ops">Evidence operations</NuxtLink>
				<NuxtLink class="button button--ghost" to="/policy-center">Policy center</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.governance-page {
	display: grid;
	gap: 24px;
}

.governance-header,
.governance-panel,
.summary-card,
.detail-card,
.governance-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.governance-header,
.governance-panel,
.governance-callout {
	padding: 22px;
}

.governance-header h1,
.section-heading h2,
.detail-card h3,
.governance-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.governance-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.governance-header p,
.summary-card p,
.detail-card p,
.plain-list,
.governance-callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.governance-summary,
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

.governance-panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.plain-list--tight {
	gap: 8px;
	padding-left: 18px;
	margin-top: 10px;
}

.governance-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.governance-callout__actions {
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

@media (max-width: 720px) {
	.governance-callout {
		align-items: start;
	}
}
</style>
