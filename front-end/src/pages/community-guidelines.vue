<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	{
		title: "Stay on the claim",
		body: "Keep public threads focused on the claim, the evidence, or a concrete confusion worth checking."
	},
	{
		title: "No abuse",
		body: "Harassment, spam, doxxing, impersonation, and coordinated manipulation are not allowed."
	},
	{
		title: "Discussion is not a vote",
		body: "Community discussion can improve coverage and catch errors, but it does not vote reviewed answers into or out of consensus."
	},
	{
		title: "Moderation tools",
		body: "Moderators can link, lock, slow, hide, archive, remove, or escalate content to keep the site usable and safe."
	}
];

const conductRules = [
	"Stay on the claim, source, or question. Do not turn threads into general culture-war fights.",
	"Argue from evidence, scope, and method instead of personal attacks or credential theater.",
	"Do not post private personal information, threats, targeted harassment, or material that puts another person at risk.",
	"Do not flood the site with repetitive submissions, duplicate claims, or coordinated manipulation.",
	"Do not fabricate sources, fake credentials, or present manipulated material as legitimate evidence."
];

const flagReasons = [
	"off-topic or wrong scope",
	"low-quality or unsupported",
	"misleading or misquoted",
	"duplicate of an existing thread or claim",
	"spam or coordinated manipulation",
	"harassment or abuse",
	"privacy, doxxing, or legal concern"
];

const enforcementLadder = [
	{
		title: "Guidance or no action",
		body: "Use this when a report is weak, unsubstantiated, or better handled by clarification."
	},
	{
		title: "Content-level action",
		body: "Moderators may relabel, move, merge, hide, lock, or reroute content when the thread is still salvageable."
	},
	{
		title: "Temporary restrictions",
		body: "Cooldowns, slow mode, topic limits, or restricted participation can handle disruptive behavior before removal."
	},
	{
		title: "Topic or interaction bans",
		body: "Repeat disruption on a specific topic may trigger targeted restrictions without requiring a full-site ban."
	},
	{
		title: "Suspension or removal",
		body: "Serious or repeated abuse, coordinated manipulation, threats, or privacy violations can lead to suspension or removal."
	}
];

const highConflictControls = [
	"slow mode or temporary locks when a thread moves too fast or repeats itself",
	"expert-only or editorial-summary windows when a factual dispute needs controlled synthesis",
	"topic bans for repeat offenders who derail the same subject area",
	"quarantine or admin-only escalation for legal, safety, or severe harassment cases"
];

const appeals = [
	"Explain what action is being challenged and provide new context instead of repeating the same argument.",
	"Send accuracy disputes about reviewed pages through corrections, not abuse appeals.",
	"The site may decline repeated appeals that add no new information or are obviously abusive."
];

useStaticPageMeta({
	description:
		"Review the rules for public questions, evidence-focused discussion, flags, moderation actions, and high-conflict topics.",
	path: "/community-guidelines",
	title: "Community guidelines - Is There Consensus?"
});
</script>

<template>
	<div class="guidelines-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Community guidelines' }]" />

		<header class="guidelines-header">
			<p class="eyebrow">Community guidelines</p>
			<h1>Rules for public discussion, flags, and moderation.</h1>
			<p>
				The site is not built to reward the loudest thread. Public discussion is useful when it helps clarify a
				claim, surface credible sources, or identify a real error.
			</p>
		</header>

		<section class="guidelines-summary">
			<article v-for="item in quickPoints" :key="item.title" class="summary-card">
				<h3>{{ item.title }}</h3>
				<p>{{ item.body }}</p>
			</article>
		</section>

		<section class="guidelines-panel">
			<div class="section-heading section-heading--tight">
				<h2>Expected conduct</h2>
				<p>Good threads help the editorial layer think more clearly; bad threads just generate heat.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in conductRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="guidelines-panel guidelines-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Standard flag reasons</h2>
				<p>Use the smallest accurate category so moderators can act quickly and consistently.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in flagReasons" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="guidelines-panel">
			<div class="section-heading section-heading--tight">
				<h2>Enforcement ladder</h2>
				<p>The goal is proportional, explainable enforcement, not surprise punishment.</p>
			</div>
			<div class="card-grid">
				<article v-for="item in enforcementLadder" :key="item.title" class="detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="guidelines-panel">
			<div class="section-heading section-heading--tight">
				<h2>High-conflict topic controls</h2>
				<p>Some topics need narrower participation rules so the site does not drift into forum warfare.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in highConflictControls" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="guidelines-panel guidelines-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Appeals and correction paths</h2>
				<p>Conduct disputes and factual disputes should not be forced into the same pipe.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in appeals" :key="item">{{ item }}</li>
			</ul>
			<div class="prose">
				<p>
					For moderation questions, policy concerns, or serious safety issues, email
					<a href="mailto:consensus@isthereconsensus.org">consensus@isthereconsensus.org</a>.
				</p>
			</div>
		</section>

		<section class="guidelines-callout">
			<div>
				<p class="eyebrow">Related pages</p>
				<h2>Use the right path for the right problem.</h2>
				<p>
					Use corrections for factual problems, moderation for enforcement questions, and How Reviews Work for
					the publishing standard.
				</p>
			</div>
			<div class="guidelines-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/moderation-and-appeals">Moderation and appeals</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.guidelines-page {
	display: grid;
	gap: 24px;
}

.guidelines-header,
.guidelines-panel,
.summary-card,
.detail-card,
.guidelines-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.guidelines-header,
.guidelines-panel,
.guidelines-callout {
	padding: 22px;
}

.guidelines-header h1,
.section-heading h2,
.summary-card h3,
.detail-card h3,
.guidelines-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.guidelines-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.guidelines-header p,
.section-heading p,
.summary-card p,
.detail-card p,
.plain-list,
.prose p,
.guidelines-callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.guidelines-header p,
.guidelines-callout > div {
	max-width: 68ch;
}

.section-heading p {
	max-width: 56ch;
}

.guidelines-summary,
.card-grid {
	display: grid;
	gap: 14px;
}

.guidelines-summary {
	align-items: start;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card-grid {
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
}

.summary-card,
.detail-card {
	padding: 18px;
}

.summary-card {
	display: grid;
	gap: 8px;
	align-content: start;
}

.summary-card h3 {
	font-size: 1rem;
	color: var(--consensus-ink);
}

.summary-card p,
.summary-card h3,
.detail-card p,
.plain-list,
.prose p {
	margin: 0;
}

.section-heading {
	display: grid;
	gap: 6px;
	margin-bottom: 14px;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.guidelines-panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.guidelines-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.guidelines-callout > div {
	flex: 1 1 340px;
}

.guidelines-callout__actions {
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

.prose a {
	color: var(--consensus-ink);
}

@media (max-width: 720px) {
	.guidelines-page {
		gap: 18px;
	}

	.guidelines-header,
	.guidelines-panel,
	.summary-card,
	.detail-card,
	.guidelines-callout {
		border-radius: 16px;
	}

	.guidelines-header,
	.guidelines-panel,
	.guidelines-callout {
		padding: 16px;
	}

	.summary-card,
	.detail-card {
		padding: 14px;
	}

	.guidelines-summary,
	.card-grid {
		gap: 10px;
	}

	.summary-card {
		gap: 5px;
	}

	.guidelines-header p,
	.section-heading p,
	.summary-card p,
	.detail-card p,
	.plain-list,
	.prose p,
	.guidelines-callout p {
		line-height: 1.58;
	}

	.section-heading {
		margin-bottom: 12px;
	}

	.plain-list {
		gap: 6px;
		padding-left: 18px;
	}

	.guidelines-callout {
		align-items: stretch;
		gap: 16px;
	}

	.guidelines-callout__actions {
		width: 100%;
		gap: 10px;
	}

	.button {
		padding: 10px 14px;
		line-height: 1.25;
	}
}

@media (max-width: 820px) {
	.guidelines-summary {
		grid-template-columns: 1fr;
	}
}
</style>
