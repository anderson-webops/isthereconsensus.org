<script setup lang="ts">
import ComparisonLinks from "~/components/ComparisonLinks.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { siteUrl } from "~/constants";
import { comparisonsForGuide } from "~/data/comparisons";
import { readingGuides } from "~/data/reading-guides";
import { loadReadingGuide } from "~/data/reading-guides/load";
import { serializeJsonLd } from "~/utils/json-ld";

// Remount when navigating between guides so body, source anchors, and metadata
// move together, including browser back/forward and unknown slugs.
definePageMeta({ key: (route) => route.path });
const route = useRoute();
const slug = String(route.params.slug || "");
const summary = readingGuides.find((guide) => guide.slug === slug);
const guide = summary ? await loadReadingGuide(slug) : undefined;
if (!summary || !guide) throw createError({ statusCode: 404, statusMessage: "Reading guide not found" });

const guideText = guide.sections
	.flatMap((section) => section.paragraphs)
	.map((paragraph) => paragraph.text)
	.join(" ");
const readingMinutes = Math.max(1, Math.ceil(guideText.split(/\s+/).length / 200));
const checkedDate = new Date(`${summary.checkedAt}T12:00:00Z`).toLocaleDateString("en-US", {
	year: "numeric",
	month: "long",
	day: "numeric",
	timeZone: "UTC"
});
const sourceNumbers = new Map(guide.sources.map((source, index) => [source.id, index + 1]));
const sourceTitles = new Map(guide.sources.map((source) => [source.id, source.title]));

useStaticPageMeta({
	title: `${summary.title} - Is There Consensus?`,
	description: summary.summary,
	path: `/guides/${slug}`
});
useHead({
	script: [
		{
			key: "reading-guide-jsonld",
			type: "application/ld+json",
			innerHTML: serializeJsonLd({
				"@context": "https://schema.org",
				"@type": "Article",
				headline: summary.title,
				description: summary.summary,
				url: `${siteUrl}/guides/${slug}`,
				dateModified: summary.checkedAt,
				inLanguage: "en",
				citation: guide.sources.map((source) => source.url)
			})
		}
	]
});
</script>

<template>
	<article class="reading-guide">
		<PageBreadcrumbs
			:items="[{ label: 'Home', to: '/' }, { label: 'Reading guides', to: '/guides' }, { label: summary.title }]"
		/>
		<header class="reading-guide__header">
			<p class="eyebrow">Reading guide</p>
			<h1>{{ summary.title }}</h1>
			<p class="reading-guide__description">{{ summary.summary }}</p>
			<p class="reading-guide__meta">
				{{ readingMinutes }} min read <span aria-hidden="true">·</span> Sources checked
				<time :datetime="summary.checkedAt">{{ checkedDate }}</time>
			</p>
		</header>
		<section class="guide-takeaway" aria-labelledby="guide-takeaway-title">
			<h2 id="guide-takeaway-title">The short answer</h2>
			<p>{{ guide.takeaway }}</p>
		</section>
		<ComparisonLinks :comparisons="comparisonsForGuide(`/guides/${slug}`)" />
		<details class="guide-contents">
			<summary>In this guide</summary>
			<nav aria-label="In this guide">
				<ol>
					<li v-for="section in guide.sections" :key="section.id">
						<a :href="`#${section.id}`">{{ section.title }}</a>
					</li>
					<li><a href="#connected-reviews">Connected claim reviews</a></li>
					<li><a href="#guide-sources">Sources and their limits</a></li>
				</ol>
			</nav>
		</details>
		<p class="guide-scope">{{ guide.scope }}</p>
		<section
			v-for="section in guide.sections"
			:id="section.id"
			:key="section.id"
			class="guide-section"
			:aria-labelledby="`${section.id}-title`"
		>
			<h2 :id="`${section.id}-title`">{{ section.title }}</h2>
			<p v-for="(paragraph, index) in section.paragraphs" :key="index">
				{{ paragraph.text }}
				<span v-if="paragraph.sources.length" class="guide-citations">
					<a
						v-for="id in paragraph.sources"
						:key="id"
						:href="`#source-${id}`"
						:aria-label="`Source ${sourceNumbers.get(id)}: ${sourceTitles.get(id)}`"
						>[{{ sourceNumbers.get(id) }}]</a
					>
				</span>
			</p>
		</section>
		<section class="guide-section guide-questions" aria-labelledby="guide-questions-title">
			<h2 id="guide-questions-title">Questions to take with you</h2>
			<ul>
				<li v-for="question in guide.questions" :key="question">{{ question }}</li>
			</ul>
		</section>
		<section id="connected-reviews" class="guide-section" aria-labelledby="connected-reviews-title">
			<h2 id="connected-reviews-title">Read the individual claim reviews</h2>
			<ul class="guide-review-links">
				<li v-for="review in summary.reviews" :key="review.path">
					<NuxtLink :to="review.path">{{ review.label }}</NuxtLink>
				</li>
			</ul>
		</section>
		<section id="guide-sources" class="guide-section" aria-labelledby="guide-sources-title">
			<h2 id="guide-sources-title">Sources and their limits</h2>
			<p class="guide-scope">
				Sources are linked beside the relevant explanations. Notes distinguish full guidance pages from research
				abstracts; inclusion does not imply endorsement by the source's authors.
			</p>
			<ol class="guide-source-list">
				<li v-for="source in guide.sources" :id="`source-${source.id}`" :key="source.id">
					<a :href="source.url" rel="noopener noreferrer">{{ source.title }}</a>
					<p class="guide-source-kind">{{ source.kind }}</p>
					<p>{{ source.note }}</p>
				</li>
			</ol>
		</section>
		<p class="guide-footer">
			<NuxtLink to="/guides">Browse all reading guides</NuxtLink> <span aria-hidden="true">·</span>
			<NuxtLink to="/corrections">Suggest a correction</NuxtLink>
		</p>
	</article>
</template>

<style scoped>
.reading-guide {
	max-width: 780px;
	margin: auto;
	display: grid;
	gap: 24px;
	overflow-wrap: anywhere;
}
.reading-guide__header h1 {
	margin: 8px 0 16px;
	font:
		600 var(--consensus-page-title-size)/1.12 "Fraunces",
		serif;
}
.reading-guide__description {
	color: var(--consensus-muted);
	font-size: 1.1rem;
}
.reading-guide p,
.reading-guide li {
	line-height: 1.75;
}
.reading-guide h2 {
	font:
		600 1.5rem/1.3 "Fraunces",
		serif;
	margin: 0 0 16px;
}
.reading-guide__meta,
.guide-scope,
.guide-source-kind {
	color: var(--consensus-muted);
	font-size: 0.9rem;
}
.reading-guide__meta {
	display: flex;
	gap: 6px;
	flex-wrap: wrap;
}
.guide-takeaway {
	padding: 22px;
	border: 1px solid var(--consensus-soft-line);
	border-left: 3px solid var(--consensus-interactive);
	background: var(--consensus-surface);
	border-radius: 8px;
}
.guide-takeaway h2 {
	font-size: 1.2rem;
}
.guide-takeaway p,
.guide-scope {
	margin: 0;
}
.guide-contents {
	padding: 14px 0;
	border-block: 1px solid var(--consensus-soft-line);
}
.guide-contents summary {
	cursor: pointer;
	font-weight: 600;
}
.guide-contents li,
.guide-questions li,
.guide-review-links li {
	margin: 10px 0;
}
.guide-section {
	scroll-margin-top: 24px;
}
.guide-section p {
	margin: 0 0 18px;
}
.reading-guide a {
	color: var(--consensus-interactive);
	text-underline-offset: 3px;
}
.guide-citations {
	display: inline-flex;
	gap: 6px;
	margin-left: 4px;
	font-size: 0.9rem;
}
.guide-citations a {
	padding: 2px;
}
.guide-questions,
.guide-source-list li {
	padding-top: 20px;
	border-top: 1px solid var(--consensus-soft-line);
}
.guide-source-list {
	padding-left: 24px;
	list-style: decimal;
}
.guide-source-list li {
	padding-left: 5px;
	margin-bottom: 20px;
	scroll-margin-top: 24px;
}
.guide-source-list p {
	margin: 5px 0 0;
}
.guide-source-list a {
	font-weight: 600;
}
.guide-footer {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}
@media (max-width: 600px) {
	.reading-guide {
		gap: 20px;
	}
	.reading-guide__header h1 {
		font-size: 2rem;
	}
	.guide-takeaway {
		padding: 18px;
	}
}
@media print {
	.guide-contents,
	.guide-footer {
		display: none;
	}
	.reading-guide {
		max-width: none;
	}
	.guide-section {
		break-inside: auto;
	}
	h2 {
		break-after: avoid;
	}
}
</style>
