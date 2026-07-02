<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const sourceStack = [
	"Current guidelines, consensus statements, regulator reviews, and major assessments carry the most weight.",
	"Independent systematic reviews and meta-analyses check whether the broader literature supports the same direction.",
	"Single studies can matter, but they do not outrank the wider evidence base on their own."
];

const publicationRules = [
	"Every reviewed page should lead with a short bottom line in plain language.",
	"Uncertainty should sit next to the answer, not be hidden behind it.",
	"Readers should be able to inspect the evidence summaries, source stack, and change log without guessing where they are."
];

const updateTriggers = [
	"A new landmark review materially changes the direction, size, or mechanism of the current summary.",
	"A major professional society, regulator, or assessment body updates its formal guidance.",
	"A heavily cited paper used on the page is retracted or materially corrected.",
	"A scheduled review date passes and the page is flagged for refresh."
];

const citationRules = [
	"Reviewed answers should rely on syntheses and official reports before they rely on isolated papers or commentary.",
	"When the evidence is early or thin, the page should say so directly.",
	"Context sources can explain a topic, but they should not carry the main public answer.",
	"AI research tools such as Consensus.app can help find papers, but the reviewed page should verify and cite the underlying sources directly."
];

const disagreementRules = [
	"Public discussion does not vote reviewed answers into or out of consensus.",
	"If the evidence is split, the page should say so instead of forcing false certainty.",
	"When institutions disagree, the page should explain what the disagreement is actually about."
];

const pageSignals = [
	"Original publish date and last evidence review date",
	"Separate ratings for expert agreement and evidence certainty",
	"Outcome-level evidence summaries and a visible source stack",
	"A public change log when the page moves",
	"Clear review, conflict, and disclosure notes when those details matter"
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
			<h1>How reviewed pages show evidence and uncertainty.</h1>
			<p>
				This is the one public trust page most readers need. It explains what evidence carries the answer, which
				trust signals should be visible, and how the site handles uncertainty and updates.
			</p>
		</header>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>How sources are weighted</h2>
				<p>The evidence order that carries the public answer.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in sourceStack" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>What a reviewed page should show</h2>
				<p>The minimum public reading experience.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in publicationRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel standards-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>When pages update</h2>
				<p>Pages move when the evidence or institutional baseline moves.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in updateTriggers" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>What can carry the answer</h2>
				<p>What matters most, and what stays supporting context.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in citationRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel standards-panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>What the site does not do</h2>
				<p>Community activity and thin evidence do not get to impersonate certainty.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in disagreementRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-panel">
			<div class="section-heading section-heading--tight">
				<h2>The trust signals readers should see</h2>
				<p>The visible cues that make the page inspectable.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in pageSignals" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="standards-callout">
			<div>
				<p class="eyebrow">Why this matters</p>
				<h2>Readers should not have to learn the internal workflow to trust a page.</h2>
				<p>
					A reviewed page should make its evidence, uncertainty, and update trail visible on the page itself,
					not force readers through a maze of process documents.
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
