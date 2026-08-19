<script setup lang="ts">
import type { ClaimConsensusBand, ClaimsResponse, Topic, TopicResponse } from "~/types/board";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { appName, siteUrl, socialImageUrl } from "~/constants";
import { getTopicGuide, topicGuides } from "~/data/topicGuides";
import { interleaveClaimsByTopic, loadCompleteClaimDirectory } from "~/utils/claim-directory";
import { formatCountLabel } from "~/utils/format-count";
import { formatSlugTitle } from "~/utils/format-slug-title";
import { serializeJsonLd } from "~/utils/json-ld";
import { matchesSearchQuery } from "~/utils/search-query";

const route = useRoute();
const router = useRouter();
const { apiUrl } = useApi();

const { data: topicsData } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"))
);

const { data: claimsData, status: claimsStatus } = await useAsyncData("claim-directory", () =>
	loadCompleteClaimDirectory((page, pageSize) =>
		$fetch<ClaimsResponse>(apiUrl(`/claims?limit=${pageSize}&page=${page}`))
	)
);

const search = ref(typeof route.query.q === "string" ? route.query.q : "");
const claimBand = ref<"all" | ClaimConsensusBand>("all");
const claimsPageSize = 12;
const visibleClaimCount = ref(claimsPageSize);

const starterOrder = [
	"climate-and-environment",
	"health-and-medicine",
	"biology-and-evolution",
	"nutrition-and-diet",
	"neuroscience-and-psychology",
	"genetics-and-biotechnology",
	"public-policy-and-safety",
	"education-and-learning",
	"sleep-and-circadian-health",
	"exercise-and-sports-science",
	"crime-and-justice",
	"astronomy-and-space",
	"earth-and-geoscience",
	"ecology-and-conservation",
	"energy-and-infrastructure",
	"agriculture-and-food-systems",
	"oceans-and-marine-science",
	"physics-and-chemistry",
	"economics-and-social-policy"
];
const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);
const fallbackTopics = computed<Topic[]>(() =>
	Object.values(topicGuides).map((guide, index) => ({
		_id: guide.slug,
		title: formatSlugTitle(guide.slug),
		slug: guide.slug,
		description: guide.snapshot,
		order: index
	}))
);
const pageTitle = "Browse scientific consensus topics - Is There Consensus?";
const pageDescription =
	"Search the public topic directory for reviewed scientific claims, evidence summaries, uncertainty notes, and source trails.";
const pageUrl = `${siteUrl}/consensus`;
const directoryTopics = computed<Topic[]>(() => {
	const apiTopicsBySlug = new Map(topics.value.map((topic) => [topic.slug, topic]));
	const seen = new Set<string>();
	const mergedTopics = fallbackTopics.value.map((fallbackTopic) => {
		seen.add(fallbackTopic.slug);
		return {
			...fallbackTopic,
			...apiTopicsBySlug.get(fallbackTopic.slug)
		};
	});

	for (const topic of topics.value) {
		if (!seen.has(topic.slug)) mergedTopics.push(topic);
	}

	return mergedTopics;
});
const enrichedTopics = computed(() =>
	directoryTopics.value
		.map((topic) => ({
			...topic,
			guide: getTopicGuide(topic.slug)
		}))
		.sort((left, right) => {
			const leftIndex = starterOrder.indexOf(left.slug);
			const rightIndex = starterOrder.indexOf(right.slug);
			const leftRank = leftIndex === -1 ? starterOrder.length : leftIndex;
			const rightRank = rightIndex === -1 ? starterOrder.length : rightIndex;
			return leftRank - rightRank || left.title.localeCompare(right.title);
		})
);

const claims = computed(() => interleaveClaimsByTopic(claimsData.value?.claims ?? [], starterOrder));

const directoryStructuredData = computed(() => ({
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	description: pageDescription,
	isPartOf: {
		"@type": "WebSite",
		name: appName,
		url: siteUrl
	},
	mainEntity: {
		"@type": "ItemList",
		itemListElement: enrichedTopics.value.map((topic, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: topic.title,
			url: `${pageUrl}/${topic.slug}`
		}))
	},
	name: "Scientific consensus topic directory",
	publisher: {
		"@type": "Organization",
		name: appName,
		url: siteUrl
	},
	url: pageUrl
}));

useSeoMeta({
	description: pageDescription,
	ogDescription: pageDescription,
	ogImage: socialImageUrl,
	ogImageAlt: `${appName} preview card`,
	ogImageHeight: "630",
	ogImageWidth: "1200",
	ogSiteName: appName,
	ogTitle: "Browse scientific consensus topics",
	ogType: "website",
	ogUrl: pageUrl,
	title: pageTitle,
	twitterCard: "summary_large_image",
	twitterDescription: pageDescription,
	twitterImage: socialImageUrl,
	twitterImageAlt: `${appName} preview card`,
	twitterTitle: "Browse scientific consensus topics"
});

useHead(() => ({
	link: [
		{
			key: "canonical",
			href: pageUrl,
			rel: "canonical"
		}
	],
	script: [
		{
			innerHTML: serializeJsonLd(directoryStructuredData.value),
			key: "consensus-directory-jsonld",
			type: "application/ld+json"
		}
	]
}));

watch(search, (value) => {
	router.replace({
		query: value.trim() ? { q: value.trim() } : undefined
	});
});

const query = computed(() => search.value.trim());
const filteredTopics = computed(() =>
	enrichedTopics.value.filter((topic) => {
		const topicClaimText = claims.value
			.filter((claim) => claim.topic?.slug === topic.slug)
			.flatMap((claim) => [claim.title, claim.bottomLine]);
		return matchesSearchQuery(query.value, [
			topic.title,
			topic.description,
			topic.guide.snapshot,
			topic.guide.consensusLabel,
			...topicClaimText
		]);
	})
);
const filteredClaims = computed(() =>
	claims.value.filter((claim) => {
		const matchesBand = claimBand.value === "all" || claim.consensusBand === claimBand.value;
		return (
			matchesBand &&
			matchesSearchQuery(query.value, [
				claim.title,
				claim.bottomLine,
				claim.topic?.title,
				claim.topic?.description
			])
		);
	})
);
const visibleClaims = computed(() => filteredClaims.value.slice(0, visibleClaimCount.value));
const remainingClaimCount = computed(() => Math.max(filteredClaims.value.length - visibleClaims.value.length, 0));
const hasActiveDirectoryFilter = computed(() => Boolean(query.value) || claimBand.value !== "all");
const askDirectoryLink = computed(() => ({
	path: "/ask",
	query: { question: query.value }
}));
const resultsCountLabel = computed(() => {
	const reviewLabel = formatCountLabel(
		filteredClaims.value.length,
		hasActiveDirectoryFilter.value ? "matching review" : "review"
	);
	const topicLabel = formatCountLabel(filteredTopics.value.length, query.value ? "matching topic" : "topic");
	return `${reviewLabel}, ${topicLabel}`;
});

function formatTopicClaimCount(topic: Topic) {
	if (typeof topic.claimCount === "number") return formatCountLabel(topic.claimCount, "claim review");
	return "Claim reviews load on topic pages";
}

function topicDirectoryDescription(topic: Topic & { guide: ReturnType<typeof getTopicGuide> }) {
	return topic.description || topic.guide.snapshot;
}

function formatClaimBand(band: ClaimConsensusBand) {
	if (band === "strong") return "Strong consensus";
	if (band === "broad") return "Broad consensus";
	if (band === "mixed") return "Mixed evidence";
	return "Still unclear";
}

function formatEvidenceCertainty(value?: string) {
	if (!value) return "Certainty under review";
	return `${formatSlugTitle(value)} certainty`;
}

function showMoreClaims() {
	visibleClaimCount.value += claimsPageSize;
}

function clearDirectoryFilters() {
	search.value = "";
	claimBand.value = "all";
}

watch([query, claimBand], () => {
	visibleClaimCount.value = claimsPageSize;
});
</script>

<template>
	<div class="directory">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Browse topics' }]" />

		<header class="directory__header">
			<p class="eyebrow">Browse topics</p>
			<h1>Browse topics. Open a reviewed claim.</h1>
			<p>Search the reviewed claim library, or browse every topic by subject.</p>
		</header>

		<section class="directory__controls" aria-label="Search and filter reviewed claims">
			<div class="results-search">
				<label class="results-search__label" for="directory-search">Search topics and reviewed claims</label>
				<input
					id="directory-search"
					v-model="search"
					type="search"
					placeholder="Try caffeine, vaccines, climate, sleep..."
				/>
			</div>
			<p class="results-count" aria-live="polite">{{ resultsCountLabel }}</p>
		</section>

		<section id="topic-directory" class="results-block topic-directory">
			<div class="section-heading">
				<p class="eyebrow">Browse by subject</p>
				<h2>Topics</h2>
			</div>

			<div v-if="!filteredTopics.length" class="empty-state">
				<p>No close topic or review match.</p>
				<div class="empty-state__actions">
					<NuxtLink v-if="query" class="empty-state__action" :to="askDirectoryLink">
						Ask this question
					</NuxtLink>
					<button class="empty-state__action" type="button" @click="clearDirectoryFilters">
						Show all topics
					</button>
				</div>
			</div>
			<div v-else class="topic-list">
				<NuxtLink
					v-for="topic in filteredTopics"
					:key="topic.slug"
					class="topic-row"
					:to="`/consensus/${topic.slug}`"
				>
					<div class="topic-row__main">
						<h3>{{ topic.title }}</h3>
						<p class="topic-row__description" :title="topicDirectoryDescription(topic)">
							{{ topicDirectoryDescription(topic) }}
						</p>
						<div class="topic-row__meta">
							<span>{{ topic.guide.consensusLabel }}</span>
							<span>{{ formatTopicClaimCount(topic) }}</span>
						</div>
					</div>
					<span class="topic-row__open">Open topic</span>
				</NuxtLink>
			</div>
		</section>

		<details id="reviewed-claims" class="results-block claim-directory" :open="hasActiveDirectoryFilter">
			<summary class="claim-directory__summary">
				<div>
					<p class="eyebrow">Reviewed claims</p>
					<h2>{{ formatCountLabel(filteredClaims.length, "claim review") }}</h2>
				</div>
				<span>{{ hasActiveDirectoryFilter ? "Matching reviews" : "Open directory" }}</span>
			</summary>

			<div class="claim-directory__body">
				<div class="claim-filter">
					<p class="field-label">Filter claims by consensus</p>
					<div class="filter-stack" aria-label="Filter reviewed claims by consensus">
						<button
							type="button"
							class="filter"
							:class="{ active: claimBand === 'all' }"
							@click="claimBand = 'all'"
						>
							All
						</button>
						<button
							type="button"
							class="filter"
							:class="{ active: claimBand === 'strong' }"
							@click="claimBand = 'strong'"
						>
							Strong
						</button>
						<button
							type="button"
							class="filter"
							:class="{ active: claimBand === 'broad' }"
							@click="claimBand = 'broad'"
						>
							Broad
						</button>
						<button
							type="button"
							class="filter"
							:class="{ active: claimBand === 'mixed' }"
							@click="claimBand = 'mixed'"
						>
							Mixed
						</button>
						<button
							type="button"
							class="filter"
							:class="{ active: claimBand === 'unclear' }"
							@click="claimBand = 'unclear'"
						>
							Still unclear
						</button>
					</div>
				</div>

				<div v-if="claimsStatus === 'pending'" class="empty-state" aria-live="polite">
					<p>Loading reviewed claims…</p>
				</div>
				<div v-else-if="!filteredClaims.length" class="empty-state">
					<p>No reviewed claims match that search and consensus filter.</p>
					<button class="empty-state__action" type="button" @click="clearDirectoryFilters">
						Show all claim reviews
					</button>
				</div>
				<div v-else class="claim-grid">
					<article v-for="claim in visibleClaims" :key="claim._id" class="claim-card">
						<div class="claim-card__meta">
							<NuxtLink v-if="claim.topic" :to="`/consensus/${claim.topic.slug}`">
								{{ claim.topic.title }}
							</NuxtLink>
							<span>{{ formatClaimBand(claim.consensusBand) }}</span>
						</div>
						<h3>
							<NuxtLink :to="`/consensus/${claim.topic?.slug ?? 'other-questions'}/${claim.slug}`">
								{{ claim.title }}
							</NuxtLink>
						</h3>
						<p>{{ claim.bottomLine }}</p>
						<div class="claim-card__footer">
							<span>{{ formatCountLabel(claim.sourceCount ?? 0, "source") }}</span>
							<span>{{ formatEvidenceCertainty(claim.evidenceCertainty) }}</span>
							<NuxtLink
								class="claim-card__open"
								:to="`/consensus/${claim.topic?.slug ?? 'other-questions'}/${claim.slug}`"
							>
								Open review
							</NuxtLink>
						</div>
					</article>
				</div>

				<div v-if="remainingClaimCount" class="claim-directory__more">
					<button class="empty-state__action" type="button" @click="showMoreClaims">
						Show {{ Math.min(remainingClaimCount, claimsPageSize) }} more
					</button>
					<span>{{ formatCountLabel(remainingClaimCount, "review") }} remaining</span>
				</div>
			</div>
		</details>
	</div>
</template>

<style scoped>
.directory {
	display: grid;
	gap: 22px;
}

.directory__header h1,
.section-heading h2,
.claim-directory__summary h2,
.topic-row h3,
.claim-card h3 {
	font-family: "Fraunces", serif;
}

.directory__header h1 {
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
	margin: 8px 0 10px;
}

.directory__header p,
.section-heading p,
.topic-row p,
.empty-state,
.results-count {
	color: var(--consensus-muted);
	line-height: 1.64;
}

.directory__header p {
	max-width: 68ch;
}

.section-heading p {
	max-width: 56ch;
}

.directory__controls,
.claim-directory,
.topic-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
}

.directory__controls {
	padding: 18px;
}

.topic-directory {
	padding: 4px 0 22px;
	border-bottom: 1px solid var(--consensus-soft-line);
}

.directory__controls {
	display: grid;
	gap: 12px;
}

.results-search {
	display: grid;
	gap: 8px;
}

.results-search__label,
.field-label,
.topic-row__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.results-search input {
	width: 100%;
	min-height: 48px;
	padding: 14px 16px;
	border-radius: 8px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.filter-stack {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.filter {
	min-height: 42px;
	padding: 10px 13px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: transparent;
	color: var(--consensus-ink);
	cursor: pointer;
	font-weight: 600;
}

.filter.active {
	border-color: var(--consensus-ember);
	background: color-mix(in srgb, var(--consensus-ember) 12%, var(--consensus-surface));
}

.empty-state {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	flex-wrap: wrap;
}

.empty-state p {
	margin: 0;
}

.empty-state__actions {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.empty-state__action {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border: 1px solid var(--consensus-ember);
	border-radius: 999px;
	background: color-mix(in srgb, var(--consensus-ember) 12%, var(--consensus-surface));
	color: var(--consensus-ink);
	cursor: pointer;
	font-weight: 700;
	padding: 10px 14px;
	text-decoration: none;
}

.section-heading {
	display: grid;
	gap: 6px;
	margin-bottom: 14px;
}

.section-heading h2,
.section-heading p {
	margin: 0;
}

.topic-list {
	display: grid;
	gap: 12px;
}

.topic-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 16px;
	padding: 18px 20px;
	color: inherit;
	text-decoration: none;
}

.topic-row__main {
	display: grid;
	gap: 10px;
	align-content: start;
}

.topic-row h3 {
	margin: 0;
	line-height: 1.2;
}

.topic-row p {
	margin: 0;
}

.topic-row__description {
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
}

.topic-row__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.topic-row__open {
	display: inline-flex;
	align-items: center;
	align-self: start;
	justify-content: center;
	justify-self: end;
	min-height: 40px;
	padding: 9px 14px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	font-weight: 600;
	text-decoration: none;
}

.claim-directory {
	overflow: hidden;
	padding: 0;
}

.claim-directory__summary {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto auto;
	align-items: center;
	gap: 14px;
	padding: 18px;
	list-style: none;
	cursor: pointer;
}

.claim-directory__summary::-webkit-details-marker {
	display: none;
}

.claim-directory__summary > div {
	display: grid;
	gap: 6px;
}

.claim-directory__summary h2,
.claim-directory__summary p {
	margin: 0;
}

.claim-directory__summary .eyebrow,
.claim-directory__summary > span {
	color: var(--consensus-muted);
}

.claim-directory__summary > span {
	font-size: 0.9rem;
	font-weight: 700;
}

.claim-directory__summary::after {
	display: grid;
	width: 30px;
	height: 30px;
	place-items: center;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	color: var(--consensus-ink);
	content: "+";
}

.claim-directory[open] .claim-directory__summary::after {
	content: "−";
}

.claim-directory__body {
	display: grid;
	gap: 16px;
	padding: 18px;
	border-top: 1px solid var(--consensus-soft-line);
}

.claim-filter {
	display: grid;
	gap: 8px;
}

.claim-filter .field-label {
	margin: 0;
}

.claim-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;
}

.claim-card {
	display: grid;
	align-content: start;
	gap: 12px;
	min-width: 0;
	padding: 18px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-field-surface);
}

.claim-card__meta,
.claim-card__footer {
	display: flex;
	align-items: center;
	gap: 8px 12px;
	flex-wrap: wrap;
	color: var(--consensus-muted);
	font-size: 0.78rem;
	font-weight: 700;
	letter-spacing: 0.05em;
	text-transform: uppercase;
}

.claim-card__meta {
	justify-content: space-between;
}

.claim-card__meta a,
.claim-card h3 a,
.claim-card__open {
	color: inherit;
	text-decoration: none;
}

.claim-card__meta a:hover,
.claim-card h3 a:hover,
.claim-card__open:hover {
	color: var(--consensus-ember);
}

.claim-card h3 {
	margin: 0;
	font-size: clamp(1.1rem, 2vw, 1.35rem);
	line-height: 1.25;
}

.claim-card > p {
	display: -webkit-box;
	overflow: hidden;
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.6;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 4;
}

.claim-card__footer {
	align-self: end;
	padding-top: 2px;
	border-top: 1px solid var(--consensus-soft-line);
	letter-spacing: 0.03em;
	text-transform: none;
}

.claim-card__open {
	margin-left: auto;
	color: var(--consensus-ink);
}

.claim-directory__more {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12px;
	color: var(--consensus-muted);
	font-size: 0.9rem;
}

@media (max-width: 760px) {
	.directory {
		gap: 18px;
	}

	.directory__controls,
	.claim-directory,
	.topic-row {
		border-radius: 8px;
	}

	.directory__controls {
		padding: 14px;
	}

	.results-block.claim-directory {
		padding: 0;
	}

	.directory__controls {
		gap: 8px;
	}

	.results-search input {
		min-height: 46px;
		padding: 12px 14px;
		border-radius: 8px;
	}

	.filter-stack {
		flex-wrap: wrap;
		gap: 7px;
		overflow-x: visible;
		padding-bottom: 0;
	}

	.filter {
		flex: 0 1 auto;
		min-height: 40px;
		padding: 8px 11px;
		line-height: 1.2;
	}

	.section-heading {
		margin-bottom: 12px;
	}

	.directory__header p,
	.section-heading p,
	.topic-row p,
	.empty-state,
	.results-count {
		line-height: 1.58;
	}

	.topic-row {
		grid-template-columns: 1fr;
		gap: 12px;
		padding: 14px;
	}

	.topic-row__main {
		gap: 8px;
	}

	.topic-row__description {
		-webkit-line-clamp: 2;
	}

	.topic-row__open {
		justify-self: start;
	}

	.claim-directory__summary {
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 10px;
		padding: 14px;
	}

	.claim-directory__summary > span {
		display: none;
	}

	.claim-directory__body {
		padding: 14px;
	}

	.claim-grid {
		grid-template-columns: 1fr;
	}

	.claim-card {
		gap: 10px;
		padding: 14px;
		border-radius: 8px;
	}

	.claim-card > p {
		-webkit-line-clamp: 5;
	}

	.claim-directory__more {
		align-items: stretch;
		flex-direction: column;
		text-align: center;
	}

	.empty-state__actions,
	.empty-state__action {
		width: 100%;
	}
}
</style>
