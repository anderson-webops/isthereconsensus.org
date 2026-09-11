<script setup lang="ts">
import type { ClaimsResponse, ClaimSummary, SingleTopicResponse } from "~/types/board";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import ReadingGuideLinks from "~/components/ReadingGuideLinks.vue";
import { formatLandscapeSupportLabel } from "~/constants/evidenceLandscape";
import { guidesForTopic } from "~/data/reading-guides";
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
const readingGuides = computed(() => guidesForTopic(slug.value));
const claims = computed<ClaimSummary[]>(() => claimsData.value?.claims ?? []);
const claimsBySlug = computed(() => new Map(claims.value.map((claim) => [claim.slug, claim])));
const collectionLanes = computed(() =>
	(claimsData.value?.collections ?? [])
		.map((collection) => ({
			...collection,
			claims: collection.claimSlugs
				.map((claimSlug) => claimsBySlug.value.get(claimSlug))
				.filter((claim): claim is ClaimSummary => Boolean(claim))
		}))
		.filter((collection) => collection.claims.length > 0)
);
const ungroupedClaims = computed(() => {
	const groupedSlugs = new Set(collectionLanes.value.flatMap((collection) => collection.claimSlugs));
	return claims.value.filter((claim) => !groupedSlugs.has(claim.slug));
});
const starterClaims = computed(() => {
	return (guide.value.starterClaimSlugs ?? [])
		.map((starterSlug) => claimsBySlug.value.get(starterSlug))
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

		<ReadingGuideLinks :guides="readingGuides" />

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
					<div class="starter-card__content">
						<h3>{{ claim.title }}</h3>
						<span>{{ claimSupportLabel(claim) }}</span>
					</div>
					<span class="i-carbon-arrow-right card-arrow" aria-hidden="true" />
				</NuxtLink>
			</div>
		</section>

		<section v-if="collectionLanes.length" class="atlas-lane">
			<div class="section-heading section-heading--split">
				<div>
					<p class="eyebrow">Evidence atlas</p>
					<h2>Browse by subtopic</h2>
				</div>
				<p>
					{{ formatCountLabel(claims.length, "review") }} organized into
					{{ formatCountLabel(collectionLanes.length, "collection") }}.
				</p>
			</div>

			<nav class="collection-index" aria-label="Subtopic collections">
				<a
					v-for="collection in collectionLanes"
					:key="collection.slug"
					class="collection-index__link"
					:href="`#collection-${collection.slug}`"
				>
					<span>{{ collection.title }}</span>
					<span>{{ collection.claims.length }}</span>
				</a>
			</nav>

			<div class="collection-lanes">
				<section
					v-for="collection in collectionLanes"
					:id="`collection-${collection.slug}`"
					:key="collection.slug"
					class="collection-lane"
				>
					<div class="collection-lane__heading">
						<div>
							<p class="eyebrow">{{ formatCountLabel(collection.claims.length, "review") }}</p>
							<h2>{{ collection.title }}</h2>
						</div>
						<p>{{ collection.description }}</p>
					</div>
					<div class="claim-list">
						<NuxtLink
							v-for="claim in collection.claims"
							:key="claim._id"
							class="claim-row"
							:to="`/consensus/${slug}/${claim.slug}`"
						>
							<div class="claim-row__content">
								<h3>{{ claim.title }}</h3>
								<p class="claim-row__meta">
									<span class="claim-row__status">{{ claimSupportLabel(claim) }}</span>
								</p>
							</div>
							<span class="i-carbon-arrow-right card-arrow" aria-hidden="true" />
						</NuxtLink>
					</div>
				</section>
			</div>
		</section>

		<section v-if="!collectionLanes.length || ungroupedClaims.length" class="claim-lane">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Reviewed claims</p>
					<h2>{{ collectionLanes.length ? "Other reviewed claims" : "All reviewed claims" }}</h2>
				</div>
			</div>

			<div v-if="!claims.length" class="empty-state">
				No reviewed claims are published under this topic yet. Use Ask if you need a focused question routed
				into the queue.
			</div>
			<div v-else class="claim-list">
				<NuxtLink
					v-for="claim in collectionLanes.length ? ungroupedClaims : claims"
					:key="claim._id"
					class="claim-row"
					:to="`/consensus/${slug}/${claim.slug}`"
				>
					<div class="claim-row__content">
						<h3>{{ claim.title }}</h3>
						<p class="claim-row__meta">
							<span class="claim-row__status">{{ claimSupportLabel(claim) }}</span>
						</p>
					</div>
					<span class="i-carbon-arrow-right card-arrow" aria-hidden="true" />
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
.atlas-lane,
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

.section-heading--split,
.collection-lane__heading {
	grid-template-columns: minmax(0, 0.8fr) minmax(280px, 1.2fr);
	gap: 18px 32px;
	align-items: end;
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
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	gap: 12px;
	padding: 17px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	text-decoration: none;
	transition: border-color 160ms ease;
}

.starter-card:hover,
.starter-card:focus-visible {
	border-color: var(--consensus-interactive);
}

.starter-card__content {
	display: grid;
	gap: 8px;
}

.starter-card__content > span {
	color: var(--consensus-interactive);
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0;
	line-height: 1.35;
	text-transform: uppercase;
}

.starter-card h3 {
	font-family: "Fraunces", serif;
	margin: 0;
	font-size: 1.18rem;
	font-weight: 600;
	line-height: 1.3;
}

.queue-note {
	background: color-mix(in srgb, var(--consensus-surface) 85%, var(--consensus-community-soft) 15%);
}

.atlas-lane,
.collection-lanes {
	display: grid;
	gap: 24px;
}

.collection-index {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 10px;
}

.collection-index__link {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	min-height: 54px;
	padding: 11px 14px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	font-weight: 700;
	line-height: 1.35;
	text-decoration: none;
	transition: border-color 160ms ease;
}

.collection-index__link:hover,
.collection-index__link:focus-visible {
	border-color: var(--consensus-interactive);
}

.collection-index__link span:last-child {
	color: var(--consensus-interactive);
	font-size: 0.8rem;
}

.collection-lanes {
	gap: 34px;
}

.collection-lane {
	scroll-margin-top: 88px;
}

.collection-lane__heading {
	display: grid;
}

.collection-lane__heading h2,
.collection-lane__heading p {
	margin: 0;
}

.collection-lane__heading h2 {
	font-family: "Fraunces", serif;
	font-size: 1.65rem;
	line-height: 1.2;
}

.collection-lane__heading > p {
	max-width: 62ch;
	color: var(--consensus-muted);
	line-height: 1.58;
}

.claim-list {
	display: grid;
	gap: 12px;
	margin-top: 16px;
}

.claim-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	gap: 14px;
	padding: 18px;
	color: inherit;
	text-decoration: none;
	transition: border-color 160ms ease;
}

.claim-row:hover,
.claim-row:focus-visible {
	border-color: var(--consensus-interactive);
}

.claim-row__content {
	display: grid;
	gap: 7px;
	align-content: start;
}

.claim-row h3 {
	color: var(--consensus-ink);
	font-size: 1.26rem;
	font-weight: 600;
	line-height: 1.3;
}

.claim-row p {
	margin: 0;
}

.claim-row__meta {
	display: flex;
	gap: 8px 12px;
	flex-wrap: wrap;
	font-size: 0.76rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0;
	color: var(--consensus-muted);
}

.claim-row__status {
	color: var(--consensus-interactive);
}

.card-arrow {
	width: 20px;
	height: 20px;
	color: var(--consensus-interactive);
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
	.atlas-lane,
	.claim-lane {
		padding-bottom: 18px;
	}

	.section-heading--split,
	.collection-lane__heading {
		grid-template-columns: 1fr;
		gap: 8px;
		align-items: start;
	}

	.collection-index {
		grid-template-columns: 1fr;
	}

	.collection-lanes {
		gap: 28px;
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
		font-size: 1.12rem;
		line-height: 1.3;
	}

	.claim-row__content {
		gap: 7px;
	}

	.claim-row__meta {
		gap: 6px 8px;
		font-size: 0.74rem;
		letter-spacing: 0;
		line-height: 1.35;
	}

	.starter-card h3 {
		font-size: 1.08rem;
	}

	.topic-page__actions {
		align-items: start;
		justify-content: start;
	}
}
</style>
