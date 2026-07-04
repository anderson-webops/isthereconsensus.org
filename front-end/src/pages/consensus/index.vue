<script setup lang="ts">
import type { Topic, TopicResponse } from "~/types/board";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { appName, siteUrl, socialImageUrl } from "~/constants";
import { getTopicGuide, topicGuides } from "~/data/topicGuides";
import { formatCountLabel } from "~/utils/format-count";
import { formatSlugTitle } from "~/utils/format-slug-title";

const route = useRoute();
const router = useRouter();
const { apiUrl } = useApi();

const { data: topicsData } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"))
);

const search = ref(typeof route.query.q === "string" ? route.query.q : "");
const filter = ref<"all" | "settled" | "debated" | "exploratory">("all");

const starterOrder = [
	"climate-and-environment",
	"health-and-medicine",
	"biology-and-evolution",
	"nutrition-and-diet",
	"neuroscience-and-psychology"
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

function matchesFilter(score: number) {
	if (filter.value === "settled") return score >= 75;
	if (filter.value === "debated") return score >= 45 && score < 75;
	if (filter.value === "exploratory") return score < 45;
	return true;
}

const query = computed(() => search.value.trim().toLowerCase());
const filteredTopics = computed(() =>
	enrichedTopics.value.filter((topic) => {
		const haystack = [topic.title, topic.description, topic.guide.snapshot, topic.guide.consensusLabel]
			.join(" ")
			.toLowerCase();
		return matchesFilter(topic.guide.consensusScore) && (!query.value || haystack.includes(query.value));
	})
);
const totalTopicCount = computed(() => enrichedTopics.value.length);
const resultsCountLabel = computed(() => {
	if (filteredTopics.value.length === totalTopicCount.value) return formatCountLabel(totalTopicCount.value, "topic");
	return `${filteredTopics.value.length} of ${formatCountLabel(totalTopicCount.value, "topic")}`;
});

function formatTopicClaimCount(topic: Topic) {
	if (typeof topic.claimCount === "number") return formatCountLabel(topic.claimCount, "claim review");
	return "Claim reviews load on topic pages";
}

function topicDirectoryDescription(topic: Topic & { guide: ReturnType<typeof getTopicGuide> }) {
	return topic.description || topic.guide.snapshot;
}

function showAllTopics() {
	search.value = "";
	filter.value = "all";
}
</script>

<template>
	<div class="directory">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Browse topics' }]" />

		<header class="directory__header">
			<p class="eyebrow">Browse topics</p>
			<h1>Browse topics. Open a reviewed claim.</h1>
			<p>Search and filter topics, then open the reviewed claim closest to your question.</p>
		</header>

		<section class="directory__controls">
			<div class="results-search">
				<label class="results-search__label" for="directory-search">Search topics</label>
				<input id="directory-search" v-model="search" type="text" placeholder="Search topic or keyword" />
			</div>
			<p class="results-count">{{ resultsCountLabel }}</p>
			<div class="filter-stack">
				<button class="filter" :class="{ active: filter === 'all' }" @click="filter = 'all'">All topics</button>
				<button class="filter" :class="{ active: filter === 'settled' }" @click="filter = 'settled'">
					Strong consensus
				</button>
				<button class="filter" :class="{ active: filter === 'debated' }" @click="filter = 'debated'">
					Active debate
				</button>
				<button class="filter" :class="{ active: filter === 'exploratory' }" @click="filter = 'exploratory'">
					Exploratory
				</button>
			</div>
		</section>

		<section class="results-block">
			<div class="section-heading section-heading--tight">
				<h2>Topic directory</h2>
				<p>Each topic page leads with reviewed claims, not general discussion.</p>
			</div>

			<div v-if="!filteredTopics.length" class="empty-state">
				<p>No topics match that search yet.</p>
				<button class="empty-state__action" type="button" @click="showAllTopics">
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
		</section>
	</div>
</template>

<style scoped>
.directory {
	display: grid;
	gap: 22px;
}

.directory__header h1,
.section-heading h2,
.topic-row h3 {
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
.results-block,
.topic-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.directory__controls,
.results-block {
	padding: 18px;
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

@media (max-width: 760px) {
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

	.empty-state__action {
		width: 100%;
	}
}
</style>
