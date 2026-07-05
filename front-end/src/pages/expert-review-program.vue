<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	{
		title: "Review scope",
		body: "Verified experts check scope, evidence quality, uncertainty language, and overreach; they do not publish reviewed answers alone."
	},
	{
		title: "Eligibility",
		body: "Eligibility depends on domain expertise, identity verification, and enough public evidence to evaluate credibility."
	},
	{
		title: "Conflict-aware assignments",
		body: "Review assignments respect conflict disclosures and recusal rules before a draft is shared."
	},
	{
		title: "Public context",
		body: "Reviewer names, roles, and affiliations may appear publicly when they help readers understand how a claim was checked."
	}
];

const eligibility = [
	"domain experience, credentials, publications, or comparable professional work tied to the claim area",
	"a verifiable identity and enough external evidence to confirm affiliation or subject-matter standing",
	"agreement to the site's disclosure, conduct, and review-quality expectations",
	"willingness to stay within scope rather than using reviews for unrelated advocacy"
];

const responsibilities = [
	"check whether the claim statement matches the evidence base and institutional anchors actually cited",
	"flag missing major reviews, assessments, or consensus statements before publication",
	"push back on wording that outruns the evidence or collapses unsettled edge cases into the bottom line",
	"use uncertainty language that is specific and plain, not vague hedging or performative certainty",
	"avoid confidentiality breaches, citation gaming, credential-focused arguments, and ad hominem review conduct"
];

const disagreementFlow = [
	{
		title: "Independent first-pass review",
		body: "High-impact claims should usually receive at least two independent reviews before editors decide whether the draft is ready."
	},
	{
		title: "Structured disagreement handling",
		body: "When reviewers disagree, the site logs whether the issue is scope, missing sources, certainty language, or the conclusion."
	},
	{
		title: "Replacement or escalation",
		body: "A conflicted, nonresponsive, or repeatedly low-quality reviewer can be replaced without treating reviewer status as permanent."
	}
];

const removalTriggers = [
	"material misrepresentation of credentials or affiliations",
	"failure to disclose a relevant conflict when assigned",
	"repeated review behavior that ignores the evidence hierarchy or pushes unsupported claims",
	"harassment, confidentiality breaches, or abusive use of draft access"
];

useStaticPageMeta({
	description:
		"Learn how verified expert reviewers are screened, assigned, disclosed, and removed when the review role is abused.",
	path: "/expert-review-program",
	title: "Verified expert review program - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Verified expert review program' }]" />

		<header class="policy-header">
			<p class="eyebrow">Verified expert review program</p>
			<h1>Expert reviewer verification.</h1>
			<p>The verified-expert layer sits between community discussion and reviewed editorial publication.</p>
		</header>

		<section class="policy-summary">
			<article v-for="item in quickPoints" :key="item.title" class="policy-summary-card">
				<h2>{{ item.title }}</h2>
				<p>{{ item.body }}</p>
			</article>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Eligibility and verification</h2>
				<p>Verification is about useful review work, not status on its own.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in eligibility" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Reviewer responsibilities</h2>
				<p>The role is quality control, not personal promotion.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in responsibilities" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Disagreement and replacement</h2>
				<p>The workflow makes reviewer disagreement clear enough for editors to resolve.</p>
			</div>
			<div class="policy-card-grid">
				<article v-for="item in disagreementFlow" :key="item.title" class="policy-detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Removal or suspension triggers</h2>
				<p>Verification can be revoked when the review role is abused.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in removalTriggers" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Apply with disclosures</p>
				<h2>Expert review works only when assignment, disclosure, and trust stay aligned.</h2>
				<p>
					Applications should include affiliation, evidence of expertise, and relevant funding or conflict
					notes so editors can assign reviewers responsibly.
				</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/account">Open account workspace</NuxtLink>
				<NuxtLink class="button button--ghost" to="/conflicts-and-funding"
					>Conflict and funding disclosure</NuxtLink
				>
				<NuxtLink class="button button--ghost" to="/standards">How reviews work</NuxtLink>
			</div>
		</section>
	</div>
</template>
