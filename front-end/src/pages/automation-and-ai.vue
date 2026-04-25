<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	"Automation can help the site monitor evidence, route questions, and surface operational priorities, but it should not publish reviewed bottom lines on its own.",
	"Any materially consequential use of automation should have a named human owner who can explain the decision path.",
	"Monitoring, triage, and drafting assistance stay separate from final editorial judgment.",
	"If AI tools are used in draft preparation or moderation support, contributors remain responsible for correctness, confidentiality, and disclosure obligations."
];

const allowedUses = [
	"evidence-monitoring tasks such as retraction checks, guideline-watch queues, citation integrity scans, and update-trigger alerts",
	"search and routing support such as duplicate detection, misconception-module matching, or query-shape classification",
	"internal drafting aids that help summarize existing material for editors, provided a human reviewer checks the output before publication",
	"operational dashboards that surface likely intake pressure without automatically changing the reviewed page"
];

const disallowedUses = [
	"auto-publishing or materially changing a reviewed bottom line without human editorial approval",
	"final moderation decisions that cannot be meaningfully appealed to a human reviewer",
	"using confidential reviewer or applicant materials in external tools without an explicit security and confidentiality basis",
	"presenting generated text as if it were an institutional source, independent expert judgment, or peer-reviewed evidence"
];

const humanGates = [
	{
		title: "Publication gate",
		body: "A human editor remains responsible for the published claim, the visible uncertainty framing, and the public source stack even when automation assisted earlier steps."
	},
	{
		title: "Moderation gate",
		body: "Risk scoring or abuse detection can prioritize review, but a person should be able to inspect and reverse meaningful enforcement actions."
	},
	{
		title: "Disclosure gate",
		body: "When automation materially affects a page, queue, or review step, the site explains the role of that automation in plain language."
	}
];

const contributorRules = [
	"Do not upload private drafts, sensitive user data, or reviewer materials to outside tools unless the site can actually stand behind that confidentiality choice.",
	"Treat generated summaries as fallible working material, not as a substitute for reading the evidence or checking the source stack.",
	"If AI assistance shaped reviewer or editorial output in a meaningful way, disclose that use internally and, where relevant, on the public page."
];

useHead({
	title: "Automation and AI disclosure - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Automation and AI disclosure' }]" />

		<header class="policy-header">
			<p class="eyebrow">Automation and AI disclosure</p>
			<h1>Automation support and human review.</h1>
			<p>
				This page explains the site’s operating rules for automation, AI-assisted drafting, and decision-support
				tools.
			</p>
		</header>

		<section class="policy-summary">
			<article v-for="item in quickPoints" :key="item" class="policy-summary-card">
				<p>{{ item }}</p>
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
				<p>These are the lines the site does not cross.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in disallowedUses" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Human review gates</h2>
				<p>Automation should accelerate judgment, not hide who owns it.</p>
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
				<h2>Readers should be able to inspect the human gate without learning the whole ops stack.</h2>
				<p>Use How Reviews Work for the public standard and Corrections for the visible change path.</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
			</div>
		</section>
	</div>
</template>
