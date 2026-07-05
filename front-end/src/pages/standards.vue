<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const sourceStack = [
	"Start with current guidelines, consensus statements, regulator reviews, and major assessments.",
	"Check the wider literature with independent systematic reviews and meta-analyses.",
	"Treat single studies as context unless the wider evidence base shifts with them."
];

const publicationRules = [
	"Lead with a short bottom line in plain language.",
	"Place uncertainty beside the answer, not behind it.",
	"Make evidence summaries, source stacks, and change logs easy to find."
];

const updateTriggers = [
	"A landmark review changes the direction, size, or mechanism of the summary.",
	"A major society, regulator, or assessment body updates formal guidance.",
	"A cited paper is retracted or materially corrected.",
	"A scheduled review date passes and the page is flagged for review."
];

const citationRules = [
	"Rely on syntheses and official reports before isolated papers or commentary.",
	"When evidence is early or thin, say so directly.",
	"Use context sources to explain a topic, not to carry the public answer.",
	"Use tools such as Consensus.app for discovery, then cite verified underlying sources."
];

const disagreementRules = [
	"Public discussion does not vote reviewed answers into or out of consensus.",
	"If evidence is split, say so instead of forcing certainty.",
	"When institutions disagree, explain what the disagreement is about."
];

const pageSignals = [
	"Publish date and last evidence-review date",
	"Separate expert-agreement and evidence-certainty ratings",
	"Outcome-level evidence summaries and visible source stack",
	"A public change log when the page moves",
	"Review, conflict, and disclosure notes when relevant"
];

useStaticPageMeta({
	description:
		"Learn how reviewed pages weigh sources, expose uncertainty, show evidence summaries, and update when the evidence changes.",
	path: "/standards",
	title: "How reviews work - Is There Consensus?"
});
</script>

<template>
	<div class="standards-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'How reviews work' }]" />

		<header class="standards-header">
			<p class="eyebrow">How reviews work</p>
			<h1>How reviewed pages weigh evidence.</h1>
			<p>
				These standards explain what carries the answer, which trust signals stay visible, and how reviews
				handle uncertainty and updates.
			</p>
		</header>

		<div class="standards-grid" aria-label="Review standards summary">
			<section class="standards-panel">
				<div class="section-heading section-heading--tight">
					<h2>Evidence order</h2>
					<p>What carries the public answer.</p>
				</div>
				<ul class="plain-list">
					<li v-for="item in sourceStack" :key="item">{{ item }}</li>
				</ul>
			</section>

			<section class="standards-panel">
				<div class="section-heading section-heading--tight">
					<h2>What readers see first</h2>
					<p>The minimum public reading experience.</p>
				</div>
				<ul class="plain-list">
					<li v-for="item in publicationRules" :key="item">{{ item }}</li>
				</ul>
			</section>

			<section class="standards-panel standards-panel--soft">
				<div class="section-heading section-heading--tight">
					<h2>When reviews change</h2>
					<p>Pages move when the evidence or institutional baseline moves.</p>
				</div>
				<ul class="plain-list">
					<li v-for="item in updateTriggers" :key="item">{{ item }}</li>
				</ul>
			</section>

			<section class="standards-panel">
				<div class="section-heading section-heading--tight">
					<h2>What can support the answer</h2>
					<p>What matters most, and what stays as context.</p>
				</div>
				<ul class="plain-list">
					<li v-for="item in citationRules" :key="item">{{ item }}</li>
				</ul>
			</section>

			<section class="standards-panel standards-panel--soft">
				<div class="section-heading section-heading--tight">
					<h2>What does not decide consensus</h2>
					<p>Community activity and thin evidence do not get to impersonate certainty.</p>
				</div>
				<ul class="plain-list">
					<li v-for="item in disagreementRules" :key="item">{{ item }}</li>
				</ul>
			</section>

			<section class="standards-panel">
				<div class="section-heading section-heading--tight">
					<h2>Trust signals on each page</h2>
					<p>The visible cues that make the page inspectable.</p>
				</div>
				<ul class="plain-list">
					<li v-for="item in pageSignals" :key="item">{{ item }}</li>
				</ul>
			</section>
		</div>

		<section class="standards-callout">
			<div>
				<p class="eyebrow">Why this matters</p>
				<h2>Trust comes from visible evidence, uncertainty, and updates.</h2>
				<p>
					A reviewed page should make its evidence, uncertainty, and update trail visible where the claim is
					being read.
				</p>
			</div>
			<div class="standards-callout__actions">
				<NuxtLink class="button button--ghost" to="/conflicts-and-funding">Conflict disclosure</NuxtLink>
				<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
				<NuxtLink class="button button--ghost" to="/community-guidelines">Community guidelines</NuxtLink>
				<NuxtLink class="button button--primary" to="/consensus">Browse claim reviews</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.standards-page {
	display: grid;
	gap: 22px;
}

.standards-header,
.standards-panel,
.institution-card,
.standards-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.standards-header,
.standards-panel,
.standards-callout {
	padding: 22px;
}

.standards-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
	align-items: start;
}

.standards-panel {
	display: grid;
	align-content: start;
	gap: 14px;
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
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
}

.standards-header p,
.plain-list,
.institution-card p,
.standards-callout p {
	color: var(--consensus-muted);
	line-height: 1.66;
}

.standards-header p,
.standards-callout p {
	max-width: 68ch;
}

.section-heading {
	display: grid;
	gap: 6px;
	align-items: start;
	margin-bottom: 18px;
}

.section-heading--tight {
	margin-bottom: 0;
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
	padding-left: 19px;
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
	.standards-page {
		gap: 18px;
	}

	.standards-header,
	.standards-panel,
	.standards-callout {
		border-radius: 16px;
		padding: 16px;
	}

	.standards-grid {
		gap: 12px;
	}

	.standards-panel {
		gap: 10px;
	}

	.standards-header p,
	.plain-list,
	.standards-callout p {
		line-height: 1.56;
	}

	.plain-list {
		gap: 6px;
		padding-left: 18px;
	}

	.standards-callout {
		gap: 14px;
		grid-template-columns: 1fr;
	}

	.standards-callout__actions {
		justify-content: start;
		width: 100%;
	}
}
</style>
