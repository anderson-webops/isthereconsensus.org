<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	"Use this path for copyright, trademark, logo, impersonation, or other intellectual-property concerns related to site content or user submissions.",
	"Rights complaints should identify the exact material at issue, who owns the right being asserted, and what action is being requested.",
	"The site may temporarily limit access to disputed material while a complaint is reviewed.",
	"Counter-statements should respond to the specific complaint rather than simply repeating that the site is educational."
];

const noticeRequirements = [
	"your name, organization if relevant, and a contact email where the site can reach you",
	"the exact URL or content description of the material you want reviewed",
	"what right you believe is implicated: copyright, trademark, impersonation, or another specific legal concern",
	"a statement of the basis for the complaint, including ownership or authorized-representative status where applicable",
	"any supporting documents or links that help the site evaluate the notice quickly"
];

const workflow = [
	{
		title: "Intake and triage",
		body: "The site logs the notice, checks whether the complaint is complete enough to evaluate, and routes it to the appropriate legal or admin review queue."
	},
	{
		title: "Interim action if needed",
		body: "When the risk looks credible, the site may hide, disable, or otherwise limit access to the disputed material while the review is underway."
	},
	{
		title: "Notice to the affected contributor",
		body: "If user-submitted content is involved, the contributor may be notified and given a chance to respond unless the issue is clearly fraudulent, urgent, or legally constrained."
	},
	{
		title: "Resolution and repeat-abuse handling",
		body: "The site may restore, edit, leave removed, or permanently restrict access to content, and repeat rights abuse can be treated as an account-enforcement issue."
	}
];

const scopeNotes = [
	"Defamation, factual disagreement, and policy complaints are usually not copyright complaints; they should be routed through corrections, moderation, or direct policy contact instead.",
	"Limited quoting for commentary, source explanation, or educational criticism may still be reviewed under a fair-use analysis, but the site may act conservatively when a complaint is credible.",
	"Trademark or impersonation complaints should explain the confusing use, not just assert ownership in the abstract."
];

useHead({
	title: "Copyright and trademark complaints - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Copyright and trademark complaints' }]" />

		<header class="policy-header">
			<p class="eyebrow">Copyright and trademark complaints</p>
			<h1>Rights complaints and takedown requests.</h1>
			<p>
				This page describes the site’s current complaint intake workflow for copyright, trademark, and related
				rights issues.
			</p>
		</header>

		<section class="policy-summary">
			<article v-for="item in quickPoints" :key="item" class="policy-summary-card">
				<p>{{ item }}</p>
			</article>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>What a complete complaint should include</h2>
				<p>Specific notices move faster than vague demands.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in noticeRequirements" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Review workflow</h2>
				<p>The site treats rights complaints as a bounded process, not a support-thread argument.</p>
			</div>
			<div class="policy-card-grid">
				<article v-for="item in workflow" :key="item.title" class="policy-detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>What this page does not cover well</h2>
				<p>Not every complaint belongs in a copyright lane.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in scopeNotes" :key="item">{{ item }}</li>
			</ul>
			<div class="policy-prose">
				<p>
					Send notices to
					<a href="mailto:consensus@isthereconsensus.org">consensus@isthereconsensus.org</a> with the subject
					line <strong>Rights complaint</strong> so the site can route the message correctly.
				</p>
			</div>
		</section>

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Use the right lane</p>
				<h2>Factual disputes, moderation appeals, and rights notices are not the same workflow.</h2>
				<p>
					Use corrections for scientific errors, moderation for community enforcement, and this page for
					actual rights assertions.
				</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/terms">Terms of service</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
				<NuxtLink class="button button--ghost" to="/moderation-and-appeals">Moderation and appeals</NuxtLink>
			</div>
		</section>
	</div>
</template>
