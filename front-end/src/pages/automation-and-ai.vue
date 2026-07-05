<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	{
		title: "Human gate",
		body: "Automation can support monitoring, routing, and prioritization, but it does not publish reviewed bottom lines on its own."
	},
	{
		title: "Named owner",
		body: "Consequential uses need a human owner who can explain the decision path."
	},
	{
		title: "Separate lanes",
		body: "Monitoring, triage, and drafting assistance stay separate from final editorial judgment."
	},
	{
		title: "Contributor responsibility",
		body: "If AI tools support drafts or moderation, contributors remain responsible for correctness, confidentiality, and disclosure."
	}
];

const allowedUses = [
	"Retraction checks, guideline-watch queues, citation-integrity scans, and update alerts.",
	"Duplicate detection, misconception matching, and query-shape classification.",
	"Drafting aids that summarize existing material for human review.",
	"Dashboards that show intake pressure without changing reviewed pages automatically."
];

const disallowedUses = [
	"Auto-publishing or changing a reviewed bottom line without human editorial approval.",
	"Final moderation decisions that cannot be meaningfully appealed to a human reviewer.",
	"Putting confidential reviewer or applicant materials into outside tools without a clear security basis.",
	"Presenting generated text as institutional evidence, expert judgment, or peer-reviewed research."
];

const humanGates = [
	{
		title: "Publication gate",
		body: "A human editor remains responsible for the published claim, uncertainty framing, and public source stack."
	},
	{
		title: "Moderation gate",
		body: "Risk scoring or abuse detection can prioritize review, but a person can inspect and reverse meaningful enforcement actions."
	},
	{
		title: "Disclosure gate",
		body: "When automation materially affects a page, queue, or review step, the site explains its role in plain language."
	}
];

const contributorRules = [
	"Do not upload private drafts, sensitive user data, or reviewer materials to outside tools unless the site can defend that confidentiality choice.",
	"Treat generated summaries as fallible working material, not as a substitute for evidence review.",
	"Disclose meaningful AI assistance internally and, where relevant, on the reviewed page."
];

useStaticPageMeta({
	description:
		"See how automation may support drafting, moderation, and operations while editorial publication remains human-controlled.",
	path: "/automation-and-ai",
	title: "Automation and AI disclosure - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Automation and AI disclosure' }]" />

		<header class="policy-header">
			<p class="eyebrow">Automation and AI disclosure</p>
			<h1>Automation support and human review.</h1>
			<p>These rules keep automation, AI-assisted drafting, and decision support accountable to people.</p>
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
				<p>The site can automate monitoring and routing without automating accountability.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in allowedUses" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Disallowed uses</h2>
				<p>These uses stay outside the workflow.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in disallowedUses" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Human review gates</h2>
				<p>Automation should accelerate judgment while keeping ownership visible.</p>
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
				<p>Editorial convenience does not override confidentiality or source discipline.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in contributorRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Related trust pages</p>
				<h2>Make the human gate visible without exposing private operations.</h2>
				<p>How Reviews Work covers the public standard; Corrections covers the visible change path.</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
			</div>
		</section>
	</div>
</template>
