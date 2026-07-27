<script setup lang="ts">
import type { ClaimConsensusBand, ClaimsResponse, Topic, TopicResponse } from "~/types/board";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { appName, siteUrl, socialImageUrl } from "~/constants";
import { getTopicGuide, topicGuides } from "~/data/topicGuides";
import { interleaveClaimsByTopic } from "~/utils/claim-directory";
import { formatCountLabel } from "~/utils/format-count";
import { formatSlugTitle } from "~/utils/format-slug-title";

const route = useRoute();
const router = useRouter();
const { apiUrl } = useApi();

const { data: topicsData } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"))
);
const { data: claimsData, status: claimsStatus } = await useAsyncData("claim-directory", () =>
	$fetch<ClaimsResponse>(apiUrl("/claims?limit=500"))
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
	"genetics-and-biotechnology"
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
			innerHTML: JSON.stringify(directoryStructuredData.value),
			key: "consensus-directory-jsonld",
			type: "application/ld+json"
		}
	]
}));

function formatTopicUpdateLabel(value?: string) {
	if (!value) return "Update pending";
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
	return `Updated ${formattedDate}`;
}

watch(search, (value) => {
	router.replace({
		query: value.trim() ? { q: value.trim() } : undefined
	});
});

const query = computed(() => search.value.trim().toLowerCase());
const filteredTopics = computed(() =>
	enrichedTopics.value.filter((topic) => {
		const topicClaimText = claims.value
			.filter((claim) => claim.topic?.slug === topic.slug)
			.flatMap((claim) => [claim.title, claim.bottomLine]);
		const haystack = [
			topic.title,
			topic.description,
			topic.guide.snapshot,
			topic.guide.consensusLabel,
			...topicClaimText
		]
			.join(" ")
			.toLowerCase();
		return !query.value || haystack.includes(query.value);
	})
);
const totalTopicCount = computed(() => enrichedTopics.value.length);
const totalReviewedClaimCount = computed(
	() =>
		claimsData.value?.pagination?.total ??
		enrichedTopics.value.reduce((count, topic) => count + (topic.claimCount ?? 0), 0)
);
const topicsWithReviewedClaimsCount = computed(
	() => enrichedTopics.value.filter((topic) => (topic.claimCount ?? 0) > 0).length
);
const coverageLeaders = computed(() =>
	enrichedTopics.value
		.filter((topic) => (topic.claimCount ?? 0) > 0)
		.slice()
		.sort(
			(left, right) => (right.claimCount ?? 0) - (left.claimCount ?? 0) || left.title.localeCompare(right.title)
		)
		.slice(0, 3)
);
const filteredClaims = computed(() =>
	claims.value.filter((claim) => {
		const matchesBand = claimBand.value === "all" || claim.consensusBand === claimBand.value;
		const haystack = [claim.title, claim.bottomLine, claim.topic?.title ?? "", claim.topic?.description ?? ""]
			.join(" ")
			.toLowerCase();
		return matchesBand && (!query.value || haystack.includes(query.value));
	})
);
const visibleClaims = computed(() => filteredClaims.value.slice(0, visibleClaimCount.value));
const remainingClaimCount = computed(() => Math.max(filteredClaims.value.length - visibleClaims.value.length, 0));
const hasActiveDirectoryFilter = computed(() => Boolean(query.value) || claimBand.value !== "all");
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

		<section class="directory__snapshot" aria-label="Library snapshot">
			<div class="directory__stat">
				<strong>{{ formatCountLabel(totalReviewedClaimCount, "reviewed claim") }}</strong>
				<span>public claim library</span>
			</div>
			<div class="directory__stat">
				<strong>{{ formatCountLabel(totalTopicCount, "topic") }}</strong>
				<span>topic areas</span>
			</div>
			<div class="directory__stat">
				<strong>{{ formatCountLabel(topicsWithReviewedClaimsCount, "active topic") }}</strong>
				<span>with live reviews</span>
			</div>
			<p v-if="coverageLeaders.length" class="directory__coverage">
				Most covered:
				<NuxtLink v-for="topic in coverageLeaders" :key="topic.slug" :to="`/consensus/${topic.slug}`">
					{{ topic.title }} ({{ topic.claimCount }})
				</NuxtLink>
			</p>
		</section>

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
			<div class="filter-stack" aria-label="Filter reviewed claims by consensus">
				<button class="filter" :class="{ active: claimBand === 'all' }" @click="claimBand = 'all'">
					All reviews
				</button>
				<button class="filter" :class="{ active: claimBand === 'strong' }" @click="claimBand = 'strong'">
					Strong
				</button>
				<button class="filter" :class="{ active: claimBand === 'broad' }" @click="claimBand = 'broad'">
					Broad
				</button>
				<button class="filter" :class="{ active: claimBand === 'mixed' }" @click="claimBand = 'mixed'">
					Mixed
				</button>
				<button class="filter" :class="{ active: claimBand === 'unclear' }" @click="claimBand = 'unclear'">
					Still unclear
				</button>
			</div>
		</section>

		<section id="reviewed-claims" class="results-block claim-directory">
			<div class="section-heading claim-directory__heading">
				<div>
					<p class="eyebrow">Every public review</p>
					<h2>Reviewed claim directory</h2>
				</div>
				<p>
					Browse {{ formatCountLabel(totalReviewedClaimCount, "claim") }} directly. Each review shows its
					bottom line, uncertainty, and source trail.
				</p>
			</div>

			<div v-if="claimsStatus === 'pending'" class="empty-state" aria-live="polite">
				<p>Loading reviewed claims…</p>
			</div>
			<div v-else-if="!filteredClaims.length" class="empty-state">
				<p>No reviewed claims match that search and evidence filter.</p>
				<button class="empty-state__action" type="button" @click="clearDirectoryFilters">
					Show all claim reviews
				</button>
			</div>
			<div v-else class="claim-grid">
				<article
					v-for="claim in visibleClaims"
					:key="claim._id"
					class="claim-card"
					:data-consensus-band="claim.consensusBand"
				>
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
		</section>

		<details id="topic-directory" class="results-block topic-directory">
			<summary class="topic-directory__summary">
				<div>
					<p class="eyebrow">Browse by subject</p>
					<h2>Browse all {{ formatCountLabel(totalTopicCount, "topic") }}</h2>
				</div>
				<span>
					{{ query ? formatCountLabel(filteredTopics.length, "matching topic") : "Open topic directory" }}
				</span>
			</summary>

			<div class="topic-directory__body">
				<p>Each topic page leads with reviewed claims, not general discussion.</p>

				<div v-if="!filteredTopics.length" class="empty-state">
					<p>No topics match that search yet.</p>
					<button class="empty-state__action" type="button" @click="clearDirectoryFilters">
						Show all {{ formatCountLabel(totalTopicCount, "topic") }}
					</button>
				</div>
				<div v-else class="topic-list">
					<article v-for="topic in filteredTopics" :key="topic.slug" class="topic-row">
						<div class="topic-row__main">
							<h3>{{ topic.title }}</h3>
							<p class="topic-row__description" :title="topicDirectoryDescription(topic)">
								{{ topicDirectoryDescription(topic) }}
							</p>
							<div class="topic-row__meta">
								<span>{{ topic.guide.consensusLabel }}</span>
								<span>{{ formatTopicClaimCount(topic) }}</span>
								<span>{{ formatTopicUpdateLabel(topic.updatedAt) }}</span>
							</div>
							<details v-if="topic.featuredClaims?.length" class="topic-row__claims">
								<summary>Start with reviewed claims</summary>
								<div class="topic-row__claims-list">
									<NuxtLink
										v-for="claim in topic.featuredClaims.slice(0, 2)"
										:key="claim._id"
										:to="`/consensus/${topic.slug}/${claim.slug}`"
									>
										{{ claim.title }}
									</NuxtLink>
								</div>
							</details>
						</div>
						<div class="topic-row__side">
							<ConsensusMeter :level="topic.guide.consensusScore" :label="topic.guide.consensusLabel" />
							<NuxtLink class="topic-row__open" :to="`/consensus/${topic.slug}`">Open topic</NuxtLink>
						</div>
					</article>
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
.topic-directory__summary h2,
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

.directory__snapshot,
.directory__controls,
.results-block,
.topic-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.directory__snapshot,
.directory__controls,
.results-block {
	padding: 18px;
}

.directory__snapshot {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	align-items: center;
	gap: 12px;
}

.directory__stat {
	display: grid;
	gap: 4px;
}

.directory__stat strong {
	color: var(--consensus-ink);
	font-family: "Fraunces", serif;
	font-size: clamp(1.15rem, 2.5vw, 1.6rem);
	line-height: 1.1;
}

.directory__stat span {
	color: var(--consensus-muted);
	font-size: 0.78rem;
	font-weight: 800;
	letter-spacing: 0.08em;
	line-height: 1.2;
	text-transform: uppercase;
}

.directory__coverage {
	grid-column: 1 / -1;
	display: flex;
	gap: 8px 12px;
	flex-wrap: wrap;
	margin: 2px 0 0;
	color: var(--consensus-muted);
	font-size: 0.92rem;
	line-height: 1.5;
}

.directory__coverage a {
	color: var(--consensus-ink);
	font-weight: 700;
	text-decoration: none;
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
	border-radius: 16px;
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

.empty-state__action {
	border: 1px solid var(--consensus-ember);
	border-radius: 999px;
	background: color-mix(in srgb, var(--consensus-ember) 12%, var(--consensus-surface));
	color: var(--consensus-ink);
	cursor: pointer;
	font-weight: 700;
	padding: 10px 14px;
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

.topic-row__claims {
	display: grid;
	gap: 8px;
	padding-top: 2px;
}

.topic-row__claims summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	list-style: none;
	cursor: pointer;
	font-weight: 600;
	color: var(--consensus-ink);
}

.topic-row__claims summary::-webkit-details-marker {
	display: none;
}

.topic-row__claims summary::after {
	width: 18px;
	height: 18px;
	flex: 0 0 18px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	color: var(--consensus-muted);
	font-size: 0.82rem;
	line-height: 16px;
	text-align: center;
	content: "+";
}

.topic-row__claims[open] summary::after {
	content: "-";
}

.topic-row__claims-list {
	display: flex;
	gap: 8px 10px;
	flex-wrap: wrap;
	padding-left: 2px;
}

.topic-row__claims a,
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

.topic-row__side {
	display: grid;
	gap: 12px;
	justify-items: end;
}

.results-block.topic-directory {
	overflow: hidden;
	padding: 0;
}

.topic-directory__summary {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto auto;
	align-items: center;
	gap: 14px;
	padding: 18px;
	list-style: none;
	cursor: pointer;
}

.topic-directory__summary::-webkit-details-marker {
	display: none;
}

.topic-directory__summary > div {
	display: grid;
	gap: 6px;
}

.topic-directory__summary h2,
.topic-directory__summary p {
	margin: 0;
}

.topic-directory__summary .eyebrow,
.topic-directory__summary > span,
.topic-directory__body > p {
	color: var(--consensus-muted);
}

.topic-directory__summary > span {
	font-size: 0.9rem;
	font-weight: 700;
}

.topic-directory__summary::after {
	display: grid;
	width: 30px;
	height: 30px;
	place-items: center;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	color: var(--consensus-ink);
	content: "+";
}

.topic-directory[open] .topic-directory__summary::after {
	content: "−";
}

.topic-directory__body {
	display: grid;
	gap: 14px;
	padding: 18px;
	border-top: 1px solid var(--consensus-soft-line);
}

.topic-directory__body > p {
	margin: 0;
	line-height: 1.6;
}

.claim-directory {
	display: grid;
	gap: 16px;
}

.claim-directory__heading {
	display: grid;
	grid-template-columns: minmax(0, 0.8fr) minmax(280px, 1.2fr);
	align-items: end;
	gap: 16px;
	margin-bottom: 0;
}

.claim-directory__heading > div {
	display: grid;
	gap: 6px;
}

.claim-directory__heading .eyebrow {
	color: var(--consensus-muted);
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
	border-left: 4px solid var(--consensus-ember);
	border-radius: 16px;
	background: var(--consensus-field-surface);
}

.claim-card[data-consensus-band="broad"] {
	border-left-color: color-mix(in srgb, var(--consensus-ember) 72%, var(--consensus-ink));
}

.claim-card[data-consensus-band="mixed"] {
	border-left-color: color-mix(in srgb, var(--consensus-muted) 75%, var(--consensus-ember));
}

.claim-card[data-consensus-band="unclear"] {
	border-left-color: var(--consensus-muted);
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
	.directory__snapshot,
	.results-block,
	.topic-row {
		border-radius: 16px;
	}

	.directory__controls,
	.directory__snapshot,
	.results-block {
		padding: 14px;
	}

	.directory__snapshot {
		grid-template-columns: 1fr;
		gap: 10px;
	}

	.directory__coverage {
		gap: 6px 10px;
	}

	.directory__controls {
		gap: 8px;
	}

	.results-search input {
		min-height: 46px;
		padding: 12px 14px;
		border-radius: 14px;
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

	.topic-row__claims {
		gap: 6px;
	}

	.topic-row__side {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		justify-items: stretch;
		gap: 10px;
		width: 100%;
	}

	.topic-row__open {
		align-self: center;
	}

	.topic-row__side :deep(.meter-card) {
		gap: 7px;
	}

	.topic-row__side :deep(.meter__meta span) {
		display: none;
	}

	.claim-directory__heading {
		grid-template-columns: 1fr;
		align-items: start;
		gap: 8px;
	}

	.topic-directory__summary {
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 10px;
		padding: 14px;
	}

	.topic-directory__summary > span {
		display: none;
	}

	.topic-directory__body {
		padding: 14px;
	}

	.claim-grid {
		grid-template-columns: 1fr;
	}

	.claim-card {
		gap: 10px;
		padding: 14px;
		border-radius: 14px;
	}

	.claim-card > p {
		-webkit-line-clamp: 5;
	}

	.claim-directory__more {
		align-items: stretch;
		flex-direction: column;
		text-align: center;
	}

	.empty-state__action {
		width: 100%;
	}
}
</style>
