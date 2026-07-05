<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { sourceStandardList } from "~/data/sourceStandards";

const crossCuttingRules = [
	"Start with the current institutional baseline, then check it against an independent synthesis.",
	"Keep source prominence proportional to evidence strength and institutional responsibility.",
	"Use topic-specific source notes when the field has unusual anchor bodies or unusual kinds of disagreement.",
	"Do not let background papers or media coverage outrank decision-facing reviews."
];

function openHashTarget() {
	const targetId = window.location.hash.slice(1);
	const target = targetId ? document.getElementById(targetId) : null;

	if (target instanceof HTMLDetailsElement) {
		target.open = true;
	}
}

onMounted(() => {
	openHashTarget();
	window.addEventListener("hashchange", openHashTarget);
});

onBeforeUnmount(() => {
	window.removeEventListener("hashchange", openHashTarget);
});

useStaticPageMeta({
	description: "Topic-specific sourcing notes explain why reviewed claims weigh source types differently by field.",
	path: "/source-standards",
	robots: "noindex,follow",
	title: "Topic sourcing notes - Is There Consensus?"
});
</script>

<template>
	<div class="source-standards-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Topic sourcing notes' }]" />

		<header class="page-header">
			<p class="eyebrow">Topic sourcing notes</p>
			<h1>How source stacks change by topic.</h1>
			<p>
				Use this reference to see why a reviewed claim may weigh guidelines, assessments, datasets, syntheses,
				or individual studies differently by field.
			</p>
		</header>

		<section class="panel panel--soft">
			<div class="section-heading section-heading--tight">
				<h2>Cross-cutting rules</h2>
				<p>The baseline rules that apply before topic-specific evidence needs change the weighting.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in crossCuttingRules" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="panel">
			<div class="section-heading section-heading--tight">
				<h2>When to use this reference</h2>
				<p>Use it when you want to audit why a claim gave more weight to one source type than another.</p>
			</div>
			<ul class="plain-list">
				<li>Medicine may lean on guideline bodies and clinical review programs.</li>
				<li>Climate topics may lean on assessment bodies and synthesis reports.</li>
				<li>Evidence-literacy topics may lean more on meta-research and reliability studies.</li>
			</ul>
		</section>

		<section class="topic-standards-section">
			<div class="section-heading section-heading--tight">
				<h2>Topic notes</h2>
				<p>
					These field-specific notes explain what gets more weight when the default hierarchy is too general.
				</p>
			</div>
			<div class="topic-standard-list">
				<details
					v-for="standard in sourceStandardList"
					:id="standard.slug"
					:key="standard.slug"
					class="topic-standard"
				>
					<summary>
						<span>
							<span class="topic-standard__title">{{ standard.title }}</span>
							<span class="topic-standard__summary">{{ standard.summary }}</span>
						</span>
					</summary>
					<div class="topic-standard__body">
						<section class="topic-standard__block">
							<h3>Two-source baseline</h3>
							<dl class="source-stack">
								<div>
									<dt>Institutional anchor</dt>
									<dd>{{ standard.twoLayer.anchorA }}</dd>
								</div>
								<div>
									<dt>Independent check</dt>
									<dd>{{ standard.twoLayer.anchorB }}</dd>
								</div>
								<div>
									<dt>Why both are needed</dt>
									<dd>{{ standard.twoLayer.why }}</dd>
								</div>
							</dl>
						</section>

						<section class="topic-standard__columns">
							<div class="topic-standard__block">
								<h3>Primary anchors</h3>
								<ul class="plain-list plain-list--compact">
									<li v-for="anchor in standard.primaryAnchors" :key="anchor.name">
										<strong>{{ anchor.name }}</strong>
										<span>{{ anchor.note }}</span>
									</li>
								</ul>
							</div>
							<div class="topic-standard__block">
								<h3>Secondary checks</h3>
								<ul class="plain-list plain-list--compact">
									<li v-for="anchor in standard.secondaryAnchors" :key="anchor.name">
										<strong>{{ anchor.name }}</strong>
										<span>{{ anchor.note }}</span>
									</li>
								</ul>
							</div>
						</section>

						<section class="topic-standard__block">
							<h3>Source hierarchy</h3>
							<ol class="tier-list">
								<li v-for="tier in standard.sourceHierarchy" :key="tier.title">
									<strong>{{ tier.title }}</strong>
									<span>{{ tier.body }}</span>
								</li>
							</ol>
						</section>

						<section class="topic-standard__columns">
							<div class="topic-standard__block">
								<h3>Avoid overweighting</h3>
								<ul class="plain-list plain-list--compact">
									<li v-for="item in standard.avoidOverweighting" :key="item">{{ item }}</li>
								</ul>
							</div>
							<div class="topic-standard__block">
								<h3>Update triggers</h3>
								<ul class="plain-list plain-list--compact">
									<li v-for="item in standard.updateTriggers" :key="item">{{ item }}</li>
								</ul>
							</div>
						</section>
					</div>
				</details>
			</div>
		</section>

		<section class="callout">
			<div>
				<p class="eyebrow">Shorter overview</p>
				<h2>For the public version, start with How Reviews Work.</h2>
				<p>
					That page explains what reviewed claims show first. This reference is for readers who want the
					topic-by-topic sourcing detail.
				</p>
			</div>
			<div class="callout__actions">
				<NuxtLink class="button button--primary" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/consensus">Browse claim reviews</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.source-standards-page {
	display: grid;
	gap: 24px;
}

.page-header,
.panel,
.callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
	padding: 22px;
}

.page-header h1,
.section-heading h2,
.callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.page-header h1 {
	margin-top: 8px;
	font-size: var(--consensus-page-title-size);
	line-height: 1;
}

.page-header p,
.section-heading p,
.plain-list,
.callout p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.page-header p,
.callout > div {
	max-width: 68ch;
}

.section-heading p {
	max-width: 56ch;
}

.section-heading {
	display: grid;
	gap: 6px;
	align-items: start;
	margin-bottom: 14px;
}

.section-heading h2,
.section-heading p,
.page-header p,
.callout p,
.callout h2 {
	margin: 0;
}

.panel--soft {
	background: var(--consensus-elevated-surface);
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.topic-standards-section {
	display: grid;
	gap: 14px;
}

.topic-standards-section > .section-heading {
	margin-bottom: 0;
	padding-inline: 2px;
}

.topic-standards-section > .section-heading h2 {
	font-size: 1.55rem;
	line-height: 1.15;
}

.topic-standard-list {
	display: grid;
	gap: 12px;
}

.topic-standard {
	scroll-margin-top: 18px;
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
	overflow: clip;
}

.topic-standard:target {
	border-color: color-mix(in srgb, var(--consensus-debate) 42%, var(--consensus-soft-line));
	box-shadow: 0 0 0 3px color-mix(in srgb, var(--consensus-debate) 12%, transparent);
}

.topic-standard summary {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 14px;
	align-items: center;
	padding: 16px 18px;
	cursor: pointer;
}

.topic-standard summary::-webkit-details-marker {
	display: none;
}

.topic-standard summary:focus-visible {
	outline: none;
	box-shadow: inset 0 0 0 3px color-mix(in srgb, var(--consensus-debate) 22%, transparent);
}

.topic-standard summary::after {
	content: "+";
	display: inline-grid;
	place-items: center;
	width: 28px;
	height: 28px;
	border-radius: 999px;
	border: 1px solid var(--consensus-soft-line);
	color: var(--consensus-muted);
	font-weight: 700;
}

.topic-standard[open] summary {
	border-bottom: 1px solid var(--consensus-soft-line);
	background: var(--consensus-elevated-surface);
}

.topic-standard[open] summary::after {
	content: "-";
}

.topic-standard__title,
.topic-standard__summary {
	display: block;
}

.topic-standard__title {
	margin-bottom: 4px;
	color: var(--consensus-ink);
	font-weight: 700;
}

.topic-standard__summary {
	max-width: 74ch;
	color: var(--consensus-muted);
	line-height: 1.5;
}

.topic-standard__body {
	display: grid;
	gap: 18px;
	padding: 18px;
}

.topic-standard__columns {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
}

.topic-standard__block {
	display: grid;
	gap: 10px;
	align-content: start;
}

.topic-standard__block h3 {
	margin: 0;
	font-family: "Fraunces", serif;
	font-size: 1.05rem;
	line-height: 1.25;
}

.source-stack {
	display: grid;
	gap: 10px;
	margin: 0;
}

.source-stack div,
.tier-list li {
	display: grid;
	gap: 5px;
}

.tier-list li {
	padding-left: 12px;
	border-left: 3px solid color-mix(in srgb, var(--consensus-debate) 28%, var(--consensus-soft-line));
}

.tier-list li::marker {
	color: var(--consensus-muted);
	font-weight: 700;
}

.source-stack dt,
.tier-list strong,
.plain-list strong {
	color: var(--consensus-ink);
	font-weight: 700;
}

.source-stack dd {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.plain-list--compact {
	gap: 7px;
}

.plain-list--compact li {
	display: grid;
	gap: 3px;
}

.plain-list--compact span,
.tier-list span {
	color: var(--consensus-muted);
	line-height: 1.5;
}

.tier-list {
	display: grid;
	gap: 12px;
	margin: 0;
	padding-left: 22px;
	color: var(--consensus-muted);
}

.callout {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.callout > div {
	flex: 1 1 340px;
}

.callout__actions {
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

@media (max-width: 720px) {
	.source-standards-page {
		gap: 18px;
	}

	.page-header,
	.panel,
	.callout,
	.topic-standard {
		border-radius: 16px;
	}

	.page-header,
	.panel,
	.callout {
		padding: 16px;
	}

	.page-header p,
	.section-heading p,
	.plain-list,
	.callout p {
		line-height: 1.58;
	}

	.topic-standard summary,
	.topic-standard__body {
		padding: 14px;
	}

	.topic-standard summary {
		gap: 10px;
	}

	.topic-standard__body {
		gap: 14px;
	}

	.tier-list {
		gap: 8px;
		padding-left: 18px;
	}

	.tier-list li {
		padding-left: 10px;
	}

	.callout {
		align-items: stretch;
		gap: 16px;
	}

	.callout__actions {
		width: 100%;
	}

	.callout .button {
		padding: 10px 14px;
		line-height: 1.25;
	}
}
</style>
