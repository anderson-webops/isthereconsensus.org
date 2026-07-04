<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	{
		title: "Who discloses",
		body: "Anyone who can shape reviewed pages should disclose relevant financial, professional, advocacy, and litigation-related interests."
	},
	{
		title: "Perception matters",
		body: "The site treats perceived conflicts seriously because trust depends on visible safeguards, not only proof of bad faith."
	},
	{
		title: "Managed participation",
		body: "Disclosure does not automatically disqualify someone, but it can trigger recusal, added review controls, or public explanation."
	},
	{
		title: "No veto power",
		body: "Funders, employers, advocacy groups, and strategic partners do not get editorial veto power over reviewed conclusions."
	}
];

const conflictTypes = [
	"direct financial stakes such as employment, consulting, grants, paid testimony, advisory fees, equity, or board roles",
	"institutional interests, including affiliation with an organization that publicly campaigns on the claim at issue",
	"public advocacy, litigation, or organized lobbying that could affect perceived neutrality",
	"close professional or personal relationships that create a realistic assignment or review risk",
	"strong nonfinancial commitments that a reasonable reader would want to know about"
];

const disclosureFields = [
	"current employer or institutional affiliation relevant to the topic",
	"recent or ongoing funding that bears on the claim area or source stack",
	"paid advisory, consulting, board, or expert-witness roles",
	"public advocacy, litigation participation, or campaign leadership tied to the topic",
	"a short plain-language summary for publication when disclosure is relevant"
];

const recusalRules = [
	{
		title: "Automatic recusal",
		body: "A reviewer or editor steps out when they have a direct financial or strategic stake in the exact conclusion, source, product, or organization under review."
	},
	{
		title: "Managed participation",
		body: "A disclosed interest can sometimes be managed through independent review, narrower scope, or a public note."
	},
	{
		title: "Post-publication discovery",
		body: "If an undisclosed conflict appears after publication, the site logs it, checks whether page confidence changes, and adds a correction or reviewer change when needed."
	}
];

const publicCommitments = [
	"Reviewed pages show reviewer or author lines when those roles materially influenced the final synthesis.",
	"Claim pages expose a short conflict-of-interest summary and editorial-independence note when disclosure is relevant.",
	"Internal records preserve recusals, waivers, and review decisions even when the full details are not shown publicly.",
	"If a conflict is serious enough to affect confidence, the site prefers replacement review over private hand-waving."
];

useStaticPageMeta({
	description:
		"Read how reviewer conflicts, funding relationships, recusals, and disclosure notes are handled during claim review.",
	path: "/conflicts-and-funding",
	title: "Conflict and funding disclosure - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Conflict and funding disclosure' }]" />

		<header class="policy-header">
			<p class="eyebrow">Conflict and funding disclosure</p>
			<h1>Influence, funding, and disclosures.</h1>
			<p>
				This policy governs the interests that must be disclosed by staff editors, verified experts, and anyone
				with approval power over reviewed claim pages.
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
				<h2>What counts as a conflict</h2>
				<p>The site uses a broad trust-centered definition rather than a narrow misconduct-only definition.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in conflictTypes" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>What reviewers disclose</h2>
				<p>These fields are captured before assignment, not discovered after publication.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in disclosureFields" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Recusal and management</h2>
				<p>Disclosure is the start of the process, not the end of it.</p>
			</div>
			<div class="policy-card-grid">
				<article v-for="item in recusalRules" :key="item.title" class="policy-detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>What readers can see</h2>
				<p>Relevant interests should be visible where they matter.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in publicCommitments" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Related standards</p>
				<h2>Disclosure matters when it changes assignment and review behavior.</h2>
				<p>
					Use the expert program page for reviewer standards and How Reviews Work for the public publishing
					bar.
				</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/expert-review-program"
					>Verified expert review program</NuxtLink
				>
				<NuxtLink class="button button--ghost" to="/standards">How reviews work</NuxtLink>
			</div>
		</section>
	</div>
</template>
