<script setup lang="ts">
import type { ClaimsResponse, ClaimSummary, SingleTopicResponse } from "~/types/board";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { formatLandscapeCertaintyLabel, formatLandscapeSupportLabel } from "~/constants/evidenceLandscape";
import { getTopicGuide } from "~/data/topicGuides";
import { formatCountLabel } from "~/utils/format-count";
import { formatSlugTitle } from "~/utils/format-slug-title";

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
		innerHTML: JSON.stringify(entry),
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

		<section class="claim-lane">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Reviewed claims</p>
					<h2>Open the claim that matches your question</h2>
				</div>
				<p>Each reviewed page includes the bottom line, uncertainty, evidence summaries, and source trail.</p>
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
					<div>
						<p class="claim-row__meta">
							<span>{{ claimSupportLabel(claim) }}</span>
							<span v-if="claimCertaintyLabel(claim)">{{ claimCertaintyLabel(claim) }}</span>
							<span>{{ formatCountLabel(claim.sourceCount, "source") }}</span>
							<span>Reviewed {{ formatDate(claim.lastReviewedAt, "Pending") }}</span>
						</p>
						<h3>{{ claim.title }}</h3>
						<p class="claim-row__summary" :title="claimCardSummary(claim)">
							{{ claimCardSummary(claim) }}
						</p>
						<p v-if="claim.evidenceLandscape?.caveatSummary" class="claim-row__caveat">
							Caveat: {{ claim.evidenceLandscape.caveatSummary }}
						</p>
					</div>
					<span class="claim-row__score">{{ claim.confidenceScore }}/100</span>
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
.claim-lane,
.queue-note,
.claim-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.topic-page__header,
.claim-lane,
.queue-note {
	padding: 22px;
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

.topic-page__actions,
.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading h2,
.section-heading p {
	margin: 0;
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
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 12px;
	padding: 18px;
	text-decoration: none;
}

.claim-row h3 {
	line-height: 1.2;
}

.claim-row p {
	margin: 0;
}

.claim-row__summary {
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
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

.claim-row__score {
	font-size: 1rem;
	color: var(--consensus-ink);
}

.claim-row__caveat {
	margin-top: 8px;
	padding-top: 8px;
	border-top: 1px solid var(--consensus-soft-line);
	font-size: 0.94rem;
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
	.claim-row {
		grid-template-columns: 1fr;
		padding: 16px;
	}

	.topic-page__actions {
		align-items: start;
		justify-content: start;
	}
}
</style>
