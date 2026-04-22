<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	"Moderation actions should come with enough explanation that the affected user can understand what happened and why.",
	"Appeals are for challenging an enforcement decision or adding new context, not for retrying the same argument indefinitely.",
	"Fact disputes about reviewed pages should usually route through the corrections process instead of the abuse-enforcement lane.",
	"The site prefers proportional interventions and human review for meaningful appeals."
];

const actionTypes = [
	"content labels, moves, merges, or archival routing for threads that are salvageable",
	"hides, locks, or slow-mode actions when a thread becomes repetitive, abusive, or impossible to moderate well",
	"topic-specific restrictions for users who repeatedly derail one claim area without requiring a sitewide ban",
	"temporary suspensions or permanent removal for severe abuse, doxxing, threats, coordinated manipulation, or repeated rule-breaking"
];

const noticeElements = [
	"the action taken and whether it applies to one post, one topic, or the entire account",
	"the rule or category that triggered the action",
	"the content excerpt, URL, or thread reference involved when practical",
	"where to appeal and what new information would make the appeal useful"
];

const appealFlow = [
	{
		title: "Initial submission",
		body: "The appeal should identify the challenged action, the affected content, and any new context or evidence that was not part of the original review."
	},
	{
		title: "Second-look review",
		body: "Appeals should be reviewed by a moderator or admin who can revisit the decision rather than simply rubber-stamp the first action."
	},
	{
		title: "Outcome logging",
		body: "The site logs whether the original action was upheld, narrowed, reversed, or escalated so moderation quality can be checked over time."
	}
];

const transparencyCommitments = [
	"Maintain a moderation taxonomy so reports, actions, and appeals use the same categories.",
	"Aim to publish aggregate moderation and appeal counts once the community volume makes those numbers meaningful.",
	"Keep conduct enforcement distinct from scientific corrections so users do not confuse moderation power with editorial truth claims."
];

useHead({
	title: "Moderation and appeals - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Moderation and appeals' }]" />

		<header class="policy-header">
			<p class="eyebrow">Moderation and appeals</p>
			<h1>How moderation decisions should be explained, challenged, and reviewed.</h1>
			<p>
				This page operationalizes the community rules by defining notices, action types, and appeal
				expectations.
			</p>
		</header>

		<section class="policy-summary">
			<article v-for="item in quickPoints" :key="item" class="policy-summary-card">
				<p>{{ item }}</p>
			</article>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Action types</h2>
				<p>Moderation should use the smallest accurate tool before escalating further.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in actionTypes" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>What a user should be told</h2>
				<p>Users should receive reasons, not just outcomes.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in noticeElements" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Appeal flow</h2>
				<p>The site can revisit decisions without turning appeals into endless relitigation.</p>
			</div>
			<div class="policy-card-grid">
				<article v-for="item in appealFlow" :key="item.title" class="policy-detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Transparency commitments</h2>
				<p>Fairness gets more believable when the process can be audited later.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in transparencyCommitments" :key="item">{{ item }}</li>
			</ul>
			<div class="policy-prose">
				<p>
					For moderation questions or appeals, email
					<a href="mailto:consensus@isthereconsensus.org">consensus@isthereconsensus.org</a> with the subject
					line <strong>Moderation appeal</strong>.
				</p>
			</div>
		</section>

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Keep the lanes separate</p>
				<h2>Moderation appeals are not the same as asking to change the science summary.</h2>
				<p>
					If the problem is factual, use corrections. If the problem is conduct enforcement, use this page and
					the community-guideline framework.
				</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/community-guidelines">Community guidelines</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
			</div>
		</section>
	</div>
</template>
