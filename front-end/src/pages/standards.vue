<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const sourceStack = [
	"Systematic reviews and meta-analyses come first whenever they exist.",
	"Consensus statements, clinical guidelines, and major institutional reviews anchor the public summary.",
	"Single studies can inform context, but they do not outrank the broader literature."
];

const publicationRules = [
	"A claim should only be published as consensus when multiple independent reviews or major institutions converge on the same bottom line.",
	"If the evidence is still split, the page should be labeled as active debate or unclear rather than forced into a false certainty.",
	"When institutions disagree, the page should identify the shared baseline first and then explain the narrower margin of disagreement."
];

const updateTriggers = [
	"A new landmark review materially changes the direction, size, or mechanism of the current summary.",
	"A major professional society updates its formal guidance.",
	"A heavily cited paper used on the page is retracted or materially corrected.",
	"An editorial review date passes and the claim is flagged as needing a refresh."
];

const citationRules = [
	"Core public claims should be backed by peer-reviewed syntheses or official reports, not by blogs, anonymous commentary, or isolated preprints.",
	"Systematic reviews, meta-analyses, and major institutional guidance should outrank individual studies unless a landmark trial is the reason the field changed.",
	"When evidence is early or thin, the page should say that clearly instead of forcing a settled summary."
];

const disagreementRules = [
	"If major bodies disagree, identify the shared baseline first and then explain the narrower margin of disagreement.",
	"Do not present a minority expert view like a 50-50 split when the broader literature is not actually balanced.",
	"Separate disputes about effect size, scope, or policy from disputes about whether the core phenomenon exists."
];

const reviewerExpectations = [
	"Pages should be reviewed by people with relevant domain or editorial expertise before being treated as canonical.",
	"Reviewer qualifications should be visible enough to build trust without turning the page into a credential contest.",
	"Claim pages should state what kind of evidence would change the current summary so the review standard stays falsifiable."
];

const trustSignals = [
	"Original publish date and last evidence review date",
	"Consensus band and confidence score",
	"Source stack counts by type, anchor-source labels, and DOI/PMID visibility where available",
	"Outcome-level evidence summaries and institutional anchor metadata",
	"Plain-language bottom line before the deeper nuance",
	"A clear statement that public sentiment is not the same thing as expert consensus"
];

const institutionStacks = [
	{
		title: "Health and medicine",
		body: "Cochrane, WHO, CDC, and NASEM are the main anchors when a claim affects care, safety, or public-health policy."
	},
	{
		title: "Nutrition and diet",
		body: "The American Heart Association, American College of Cardiology, and Academy of Nutrition and Dietetics help define the mainstream evidence-backed baseline."
	},
	{
		title: "Climate and environment",
		body: "IPCC assessment reports, NOAA, NASA, and environmental evidence reviews are the main reference points for the settled core."
	},
	{
		title: "Genetics and biotechnology",
		body: "WHO, FAO, National Academies reviews, and major regulator safety assessments are the main starting points for GMO and biotechnology safety claims."
	},
	{
		title: "Neuroscience and psychology",
		body: "The Campbell Collaboration, APA, and domain societies are more useful than pop-psychology summaries or isolated lab claims."
	},
	{
		title: "Historical case studies",
		body: "Landmark trials, Surgeon General or equivalent public-health reports, and retrospective reviews help explain how past consensus shifts actually happened."
	}
];

const independenceNotes = [
	"Canonical claim pages are supposed to track the evidence stack, not the loudest public argument.",
	"Community threads do not vote a claim into or out of consensus.",
	"Source transparency and update logic should be visible enough that users can inspect the reasoning."
];

useHead({
	title: "Editorial standards - Is There Consensus?"
});
</script>

<template>
	<div class="standards-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Editorial standards' }]" />

		<header class="standards-header">
			<p class="eyebrow">Editorial standards</p>
			<h1>How the site decides when a claim is ready to publish.</h1>
			<p>
				The platform is not a live opinion board. Canonical claim pages are supposed to reflect the evidence
				stack, the limits of that evidence, and what would actually change the current view.
			</p>
		</header>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>Source hierarchy</h2>
				<p>What the editorial layer prefers to rely on.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in sourceStack" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>When a claim is settled enough to publish</h2>
				<p>Publishing thresholds should be explicit.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in publicationRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel standards-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Update triggers</h2>
				<p>The site should update on evidence changes, not only on a calendar.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in updateTriggers" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>Source and citation policy</h2>
				<p>What kinds of materials are allowed to carry the public summary.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in citationRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>Trusted institution stacks</h2>
				<p>The site should anchor each cluster in the bodies that already synthesize the field.</p>
			</div>
			<div class="institution-grid">
				<article v-for="item in institutionStacks" :key="item.title" class="institution-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="standards-panel standards-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Handling disagreement among experts or institutions</h2>
				<p>Disagreement should be explained, not flattened into confusion.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in disagreementRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>Reviewer and publication expectations</h2>
				<p>Trust depends on visible review standards, not just confident writing.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in reviewerExpectations" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>Trust signals shown on public pages</h2>
				<p>Users should not have to guess how much review a page received.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in trustSignals" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel standards-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Editorial independence</h2>
				<p>Confidence should come from legible process, not from posture.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in independenceNotes" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-callout">
			<div>
				<p class="eyebrow">Why this matters</p>
				<h2>Transparency is part of the product, not a footnote.</h2>
				<p>
					Public trust does not come from sounding confident. It comes from showing the evidence hierarchy,
					naming the uncertainty honestly, and making the review logic legible.
				</p>
			</div>
			<div class="standards-callout__actions">
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
				<NuxtLink class="button button--ghost" to="/governance">Governance and workflow</NuxtLink>
				<NuxtLink class="button button--ghost" to="/community-guidelines">Community guidelines</NuxtLink>
				<NuxtLink class="button button--primary" to="/explainers">Read explainers</NuxtLink>
				<NuxtLink class="button button--ghost" to="/consensus">Browse claim reviews</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.standards-page {
	display: grid;
	gap: 24px;
}

.standards-header,
.standards-panel,
.institution-card,
.standards-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.standards-header,
.standards-panel,
.standards-callout {
	padding: 22px;
}

.standards-header h1,
.section-heading h2,
.institution-card h3,
.standards-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.standards-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.standards-header p,
.plain-list,
.institution-card p,
.standards-callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
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

.standards-panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.institution-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;
}

.institution-card {
	padding: 18px;
}

.institution-card p {
	margin: 8px 0 0;
}

.standards-callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.standards-callout__actions {
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

@media (max-width: 820px) {
	.institution-grid {
		grid-template-columns: 1fr;
	}
}
</style>
