<script setup lang="ts">
import type { ClaimsResponse, ClaimSummary, SingleTopicResponse } from "~/types/board";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { formatLandscapeCertaintyLabel, formatLandscapeSupportLabel } from "~/constants/evidenceLandscape";
import { getTopicGuide } from "~/data/topicGuides";
import { formatCountLabel } from "~/utils/format-count";
import { formatSlugTitle } from "~/utils/format-slug-title";
import { serializeJsonLd } from "~/utils/json-ld";

interface TopicRouteParams {
	slug?: string | string[];
}

const route = useRoute();
const { apiUrl } = useApi();
const { currentAccount, role } = useAuth();

const slug = computed(() => {
	const value = (route.params as TopicRouteParams).slug;
	return Array.isArray(value) ? value[0] : String(value ?? "");
});
const postedToQueue = computed(() => route.query.posted === "1");

const { data: topicData } = await useAsyncData(`topic-${slug.value}`, () =>
	$fetch<SingleTopicResponse>(apiUrl(`/topics/${slug.value}?includeClaims=true`))
);
const { data: claimsData } = await useAsyncData(`topic-claims-${slug.value}`, () =>
	$fetch<ClaimsResponse>(apiUrl(`/topics/${slug.value}/claims`))
);

const topic = computed(() => topicData.value?.topic);
const guide = computed(() => getTopicGuide(slug.value));
const claims = computed<ClaimSummary[]>(() => claimsData.value?.claims ?? []);
const starterClaims = computed(() => {
	const claimsBySlug = new Map(claims.value.map((claim) => [claim.slug, claim]));
	return (guide.value.starterClaimSlugs ?? [])
		.map((starterSlug) => claimsBySlug.get(starterSlug))
		.filter((claim): claim is ClaimSummary => Boolean(claim));
});
const canEditTopic = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
const pageUrl = computed(() => `https://isthereconsensus.org/consensus/${slug.value}`);
const topicTitle = computed(() => topic.value?.title || formatSlugTitle(slug.value));
const pageDescription = computed(() => topic.value?.description || guide.value.snapshot);
const breadcrumbStructuredData = computed(() => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: "https://isthereconsensus.org/"
		},
		{
			"@type": "ListItem",
			position: 2,
			name: "Browse topics",
			item: "https://isthereconsensus.org/consensus"
		},
		{
			"@type": "ListItem",
			position: 3,
			name: topicTitle.value,
			item: pageUrl.value
		}
	]
}));
const topicStructuredData = computed(() => ({
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	description: pageDescription.value,
	isPartOf: {
		"@type": "WebSite",
		name: "Is There Consensus",
		url: "https://isthereconsensus.org"
	},
	mainEntity: {
		"@type": "ItemList",
		itemListElement: claims.value.map((entry, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: `https://isthereconsensus.org/consensus/${slug.value}/${entry.slug}`,
			name: entry.title
		}))
	},
	name: `${topicTitle.value} topic page | Is There Consensus`,
	publisher: {
		"@type": "Organization",
		name: "Is There Consensus",
		url: "https://isthereconsensus.org"
	},
	url: pageUrl.value,
	about: {
		"@type": "Thing",
		name: topicTitle.value,
		description: pageDescription.value
	},
	dateModified: topic.value?.updatedAt
}));

useSeoMeta({
	description: () => pageDescription.value,
	ogDescription: () => pageDescription.value,
	ogSiteName: "Is There Consensus",
	ogTitle: () => `${topicTitle.value} | Is There Consensus`,
	ogType: "website",
	ogUrl: () => pageUrl.value,
	title: () => `${topicTitle.value} - Topic - Is There Consensus?`,
	twitterCard: "summary_large_image",
	twitterDescription: () => pageDescription.value,
	twitterTitle: () => `${topicTitle.value} | Is There Consensus`
});

useHead(() => ({
	link: [
		{
			key: "canonical",
			href: pageUrl.value,
			rel: "canonical"
		}
	],
	script: [breadcrumbStructuredData.value, topicStructuredData.value].map((entry, index) => ({
		innerHTML: serializeJsonLd(entry),
		key: `topic-structured-data-${index}`,
		type: "application/ld+json"
	}))
}));

function formatDate(value?: string, fallback = "Not available yet") {
	if (!value) return fallback;
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
}

function formatBandLabel(band?: ClaimSummary["consensusBand"]) {
	if (band === "strong") return "Strong consensus";
	if (band === "broad") return "Broad consensus";
	if (band === "mixed") return "Mixed evidence";
	return "Unclear or still forming";
}

function claimSupportLabel(claim: ClaimSummary) {
	return claim.evidenceLandscape?.supportLabel
		? formatLandscapeSupportLabel(claim.evidenceLandscape.supportLabel)
		: formatBandLabel(claim.consensusBand);
}

function claimCertaintyLabel(claim: ClaimSummary) {
	return claim.evidenceLandscape?.evidenceCertainty
		? formatLandscapeCertaintyLabel(claim.evidenceLandscape.evidenceCertainty)
		: "";
}

function claimCardSummary(claim: ClaimSummary) {
	return claim.evidenceLandscape?.oneSentenceSummary || claim.bottomLine;
}

function splitSummaryLead(text: string) {
	const cleaned = text.trim();
	const sentenceEnd = cleaned.match(/[.!?](?:\s|$)/);
	if (!sentenceEnd) {
		return {
			lead: cleaned,
			context: ""
		};
	}

	const leadEnd = (sentenceEnd.index ?? 0) + sentenceEnd[0].trimEnd().length;
	return {
		lead: cleaned.slice(0, leadEnd).trim(),
		context: cleaned.slice(leadEnd).trim()
	};
}

function truncateWords(text: string, maxWords = 24) {
	const words = text.trim().split(/\s+/).filter(Boolean);
	if (words.length <= maxWords) return text.trim();
	const previewWords = words.slice(0, maxWords);
	const weakEndings = new Set([
		"a",
		"an",
		"and",
		"are",
		"as",
		"because",
		"but",
		"for",
		"of",
		"or",
		"the",
		"to",
		"with"
	]);
	while (previewWords.length > 1 && weakEndings.has(previewWords[previewWords.length - 1].toLowerCase())) {
		previewWords.pop();
	}
	return `${previewWords.join(" ")}...`;
}

function compactContextPreview(text: string) {
	return truncateWords(splitSummaryLead(text).lead || text);
}

function claimCardPreview(claim: ClaimSummary) {
	const full = claimCardSummary(claim);
	const { lead, context } = splitSummaryLead(full);
	return {
		full,
		lead,
		context: compactContextPreview(context)
	};
}

function starterClaimPreview(claim: ClaimSummary) {
	const preview = claimCardPreview(claim);
	return preview.context ? `${preview.lead} ${preview.context}` : preview.lead;
}
</script>

<template>
	<div class="topic-page">
		<PageBreadcrumbs
			:items="[{ label: 'Home', to: '/' }, { label: 'Browse topics', to: '/consensus' }, { label: topicTitle }]"
		/>

		<section v-if="postedToQueue" class="queue-note">
			Your question was received and added to the queue. Reviewed pages stay separate from community intake.
		</section>

		<header class="topic-page__header">
			<div>
				<p class="eyebrow">Topic</p>
				<h1>{{ topicTitle }}</h1>
				<p class="topic-page__description">
					{{ topic?.description || guide.snapshot }}
				</p>
			</div>
			<div class="topic-page__actions">
				<NuxtLink class="button button--primary" :to="{ path: '/ask', query: { topic: slug } }">
					Ask a question
				</NuxtLink>
				<NuxtLink v-if="canEditTopic" class="button button--ghost" to="/account/editorial">
					Open editorial workspace
				</NuxtLink>
			</div>
		</header>

		<section v-if="starterClaims.length" class="start-here">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Start here</p>
					<h2>Recommended starting points</h2>
				</div>
			</div>
			<div class="start-here__grid">
				<NuxtLink
					v-for="claim in starterClaims"
					:key="claim._id"
					class="starter-card"
					:to="`/consensus/${slug}/${claim.slug}`"
				>
					<span>{{ claimSupportLabel(claim) }}</span>
					<h3>{{ claim.title }}</h3>
					<p>{{ starterClaimPreview(claim) }}</p>
				</NuxtLink>
			</div>
		</section>

		<section class="claim-lane">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Reviewed claims</p>
					<h2>All reviewed claims</h2>
				</div>
			</div>

			<div v-if="!claims.length" class="empty-state">
				No reviewed claims are published under this topic yet. Use Ask if you need a focused question routed
				into the queue.
			</div>
			<div v-else class="claim-list">
				<NuxtLink
					v-for="claim in claims"
					:key="claim._id"
					class="claim-row"
					:to="`/consensus/${slug}/${claim.slug}`"
				>
					<div class="claim-row__content">
						<h3>{{ claim.title }}</h3>
						<p class="claim-row__meta">
							<span>{{ claimSupportLabel(claim) }}</span>
							<span v-if="claimCertaintyLabel(claim)">{{ claimCertaintyLabel(claim) }}</span>
							<span>{{ formatCountLabel(claim.sourceCount, "source") }}</span>
							<span>Reviewed {{ formatDate(claim.lastReviewedAt, "Pending") }}</span>
						</p>
						<p class="claim-row__summary" :title="claimCardPreview(claim).full">
							<span class="claim-row__summary-lead">{{ claimCardPreview(claim).lead }}</span>
							<span v-if="claimCardPreview(claim).context" class="claim-row__summary-context">
								{{ claimCardPreview(claim).context }}
							</span>
						</p>
					</div>
				</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.topic-page {
	display: grid;
	gap: 22px;
}

.topic-page__header,
.queue-note,
.claim-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
}

.topic-page__header,
.queue-note {
	padding: 22px;
}

.start-here,
.claim-lane {
	padding: 4px 0 22px;
	border-bottom: 1px solid var(--consensus-soft-line);
}

.claim-lane {
	border-bottom: 0;
}

.topic-page__header {
	display: grid;
	gap: 16px;
}

.topic-page__header h1,
.section-heading h2,
.claim-row h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.topic-page__header h1 {
	margin-top: 8px;
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
}

.topic-page__description,
.section-heading p,
.claim-row p,
.empty-state,
.queue-note {
	color: var(--consensus-muted);
	line-height: 1.64;
}

.topic-page__description,
.section-heading p {
	max-width: 68ch;
}

.section-heading {
	display: grid;
	gap: 6px;
	align-items: start;
}

.topic-page__actions {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading h2,
.starter-card h3,
.section-heading p {
	margin: 0;
}

.start-here__grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 12px;
	margin-top: 16px;
}

.starter-card {
	display: grid;
	gap: 8px;
	padding: 17px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	text-decoration: none;
}

.starter-card > span {
	color: var(--consensus-ember);
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
}

.starter-card h3 {
	font-family: "Fraunces", serif;
	font-size: 1.08rem;
	line-height: 1.24;
}

.starter-card p {
	margin: 0;
	color: var(--consensus-muted);
	font-size: 0.92rem;
	line-height: 1.5;
}

.queue-note {
	background: color-mix(in srgb, var(--consensus-surface) 85%, var(--consensus-community-soft) 15%);
}

.claim-list {
	display: grid;
	gap: 12px;
	margin-top: 16px;
}

.claim-row {
	display: grid;
	padding: 18px;
	text-decoration: none;
}

.claim-row__content {
	display: grid;
	gap: 8px;
	align-content: start;
}

.claim-row h3 {
	line-height: 1.2;
}

.claim-row p {
	margin: 0;
}

.claim-row__summary {
	display: grid;
	gap: 4px;
}

.claim-row__summary-lead {
	color: var(--consensus-ink);
	font-weight: 700;
}

.claim-row__summary-context {
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.claim-row__meta {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
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
	.topic-page {
		gap: 18px;
	}

	.topic-page__header,
	.queue-note {
		padding: 18px;
		border-radius: 8px;
	}

	.start-here,
	.claim-lane {
		padding-bottom: 18px;
	}

	.claim-list {
		gap: 10px;
		margin-top: 14px;
	}

	.start-here__grid {
		grid-template-columns: 1fr;
		gap: 10px;
		margin-top: 14px;
	}

	.claim-row {
		padding: 14px;
		border-radius: 8px;
	}

	.claim-row h3 {
		line-height: 1.16;
	}

	.claim-row__content {
		gap: 7px;
	}

	.claim-row p {
		line-height: 1.5;
	}

	.claim-row__meta {
		gap: 6px 8px;
		font-size: 0.74rem;
		letter-spacing: 0.05em;
		line-height: 1.35;
	}

	.claim-row__summary {
		gap: 3px;
	}

	.topic-page__actions {
		align-items: start;
		justify-content: start;
	}
}
</style>
