<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { sourceStandardList } from "~/data/sourceStandards";

const sourceStack = [
	"Use a two-layer anchor by default: one current institutional conclusion and one independent synthesis.",
	"Consensus statements, clinical guidelines, regulator reviews, and major assessments anchor the public summary.",
	"Single studies can inform context, but they do not outrank the broader literature or a methods-explicit assessment body."
];

const publicationRules = [
	"A claim should only be published as consensus when multiple independent reviews or major institutions converge on the same bottom line.",
	"If the evidence is still split, label the page as active debate or unclear instead of forcing false certainty.",
	"When institutions disagree, identify the shared baseline first and then explain the narrower margin of disagreement."
];

const updateTriggers = [
	"A new landmark review materially changes the direction, size, or mechanism of the current summary.",
	"A major professional society, regulator, or assessment body updates its formal guidance.",
	"A heavily cited paper used on the page is retracted or materially corrected.",
	"An editorial review date passes and the claim is flagged as needing a refresh."
];

const citationRules = [
	"Core public claims should be backed by peer-reviewed syntheses or official reports, not by blogs, anonymous commentary, or isolated preprints.",
	"Systematic reviews, meta-analyses, and major institutional guidance should outrank individual studies unless a landmark trial is the reason the field changed.",
	"When evidence is early or thin, the page should say that clearly instead of forcing a settled summary."
];

const disagreementRules = [
	"Restrict institutional disagreement to reputable bodies with explicit methods.",
	"Label whether the disagreement is about evidence, thresholds, feasibility, or policy values.",
	"Do not present a minority institutional view like a 50-50 split when the broader literature is not actually balanced.",
	"Keep prominence proportional to evidence strength and institutional representativeness."
];

const reviewerExpectations = [
	"Pages should be reviewed by people with relevant domain or editorial expertise before being treated as canonical.",
	"Reviewer qualifications should be visible enough to build trust without turning the page into a credential contest.",
	"Claim pages should state what kind of evidence would change the current summary so the review standard stays falsifiable."
];

const trustSignals = [
	"Original publish date and last evidence review date",
	"Expert agreement and evidence certainty shown as separate ratings",
	"Source stack counts by type, anchor-source labels, and DOI/PMID visibility where available",
	"Outcome-level evidence summaries and institutional anchor metadata",
	"Reusable misconception modules linked to fuller explainers when the same interpretation error keeps repeating",
	"A clear statement that public sentiment is not the same thing as expert consensus"
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
				<h2>Institution-first source hierarchy</h2>
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
				<h2>Cluster anchor stacks</h2>
				<p>The site should anchor each cluster in the bodies that already synthesize the field.</p>
			</div>
			<div class="institution-grid">
				<article v-for="item in sourceStandardList" :key="item.slug" class="institution-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.summary }}</p>
					<ul class="plain-list plain-list--tight">
						<li v-for="anchor in item.primaryAnchors.slice(0, 3)" :key="anchor.name">
							<strong>{{ anchor.name }}:</strong> {{ anchor.note }}
						</li>
					</ul>
					<NuxtLink class="text-link" :to="`/source-standards#${item.slug}`"
						>Open full cluster standard</NuxtLink
					>
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
					naming the uncertainty honestly, and making the source-stack logic legible.
				</p>
			</div>
			<div class="standards-callout__actions">
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
				<NuxtLink class="button button--ghost" to="/source-standards">Source-stack standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/misconceptions">Misconception modules</NuxtLink>
				<NuxtLink class="button button--ghost" to="/evidence-ops">Evidence operations</NuxtLink>
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
	align-items: end;
	flex-wrap: wrap;
	margin-bottom: 18px;
}

.section-heading--tight {
	margin-bottom: 14px;
}

.section-heading p,
.section-heading h2,
.standards-header p,
.standards-callout p,
.standards-callout h2 {
	margin: 0;
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.plain-list--tight {
	gap: 6px;
}

.institution-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.institution-card {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.institution-card p,
.institution-card h3 {
	margin: 0;
}

.text-link {
	color: var(--consensus-interactive);
	font-weight: 600;
	text-decoration: none;
}

.standards-callout {
	display: grid;
	gap: 16px;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.standards-callout__actions {
	display: flex;
	gap: 10px;
	justify-content: end;
	flex-wrap: wrap;
}

@media (max-width: 760px) {
	.standards-callout {
		grid-template-columns: 1fr;
	}

	.standards-callout__actions {
		justify-content: start;
	}
}
</style>
