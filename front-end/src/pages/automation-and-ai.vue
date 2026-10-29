<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	{
		title: "Research summaries",
		body: "Summaries may be published after AI-assisted source screening, with human moderation and corrections afterward."
	},
	{
		title: "Editorial responsibility",
		body: "The site owner remains responsible for publication. Owner approval is not independent expert review."
	},
	{
		title: "Separate lanes",
		body: "Automated source checks, human editorial review, and independent expert review are different processes."
	},
	{
		title: "Contributor responsibility",
		body: "If AI tools support drafts or moderation, contributors remain responsible for correctness, confidentiality, and disclosure."
	}
];

const allowedUses = [
	"Retraction checks, guideline-watch queues, citation-integrity scans, and update alerts.",
	"Duplicate detection, misconception matching, and query-shape classification.",
	"AI-assisted drafting and source screening of research summaries, with preparation and review status disclosed.",
	"Dashboards that show intake pressure without changing reviewed pages automatically."
];

const disallowedUses = [
	"Overwriting an existing human editorial decision or reviewed bottom line without the authorized editorial workflow.",
	"Claiming human review, expert approval, a systematic search, or a formal appraisal without supporting records.",
	"Final moderation decisions that cannot be meaningfully appealed to a human reviewer.",
	"Putting confidential reviewer or applicant materials into outside tools without a clear security basis.",
	"Presenting generated text as institutional evidence, expert judgment, or peer-reviewed research."
];

const humanGates = [
	{
		title: "Publication gate",
		body: "Publication does not establish independent expert approval. Pages distinguish recorded preparation from review that has not been documented."
	},
	{
		title: "Moderation gate",
		body: "Risk scoring or abuse detection can prioritize review, but a person can inspect and reverse meaningful enforcement actions."
	},
	{
		title: "Disclosure gate",
		body: "Pages disclose recorded AI assistance. If historical preparation details are missing, the site says so rather than inventing a reviewer or workflow."
	}
];

const contributorRules = [
	"Do not upload private drafts, sensitive user data, or reviewer materials to outside tools unless the site can defend that confidentiality choice.",
	"Treat generated summaries as fallible working material, not as a substitute for evidence review.",
	"Disclose meaningful AI assistance internally and, where relevant, on the reviewed page."
];

useStaticPageMeta({
	description:
		"How AI-assisted source screening, publication, human moderation, and independent expert review differ.",
	path: "/automation-and-ai",
	title: "Automation and AI disclosure - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Automation and AI disclosure' }]" />

		<header class="policy-header">
			<p class="eyebrow">
				Automation and AI disclosure
			</p>
			<h1>Preparation and review</h1>
			<p>
				AI tools can summarize real research and still misinterpret it. Linked sources support checking the
				summary; they do not establish expert approval.
			</p>
		</header>

		<section class="policy-summary">
			<article v-for="item in quickPoints" :key="item.title" class="policy-summary-card">
				<h2>{{ item.title }}</h2>
				<p>{{ item.body }}</p>
			</article>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Allowed support uses</h2>
			</div>
			<ul class="policy-list">
				<li v-for="item in allowedUses" :key="item">
					{{ item }}
				</li>
			</ul>
		</section>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Disallowed uses</h2>
			</div>
			<ul class="policy-list">
				<li v-for="item in disallowedUses" :key="item">
					{{ item }}
				</li>
			</ul>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Publication and moderation</h2>
			</div>
			<div class="policy-card-grid">
				<article v-for="item in humanGates" :key="item.title" class="policy-detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Rules for contributors using AI tools</h2>
			</div>
			<ul class="policy-list">
				<li v-for="item in contributorRules" :key="item">
					{{ item }}
				</li>
			</ul>
		</section>

		<section class="policy-callout">
			<div>
				<h2>Related policies</h2>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
			</div>
		</section>
	</div>
</template>
