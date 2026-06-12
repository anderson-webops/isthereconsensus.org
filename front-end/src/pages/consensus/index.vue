<script setup lang="ts">
import type { Topic, TopicResponse } from "~/types/board";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { getTopicGuide } from "~/data/topicGuides";
import { formatCountLabel } from "~/utils/format-count";

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
const enrichedTopics = computed(() =>
	topics.value
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

function formatTopicDate(value?: string) {
	if (!value) return "Update pending";
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
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
</script>

<template>
	<div class="directory">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Browse topics' }]" />

		<header class="directory__header">
			<p class="eyebrow">Browse topics</p>
			<h1>Browse topics. Open a reviewed claim.</h1>
			<p>Search, filter, and go straight to the closest topic.</p>
		</header>

		<section class="directory__controls">
			<div class="results-search">
				<label class="results-search__label" for="directory-search">Search topics</label>
				<input
					id="directory-search"
					v-model="search"
					type="text"
					placeholder="Search by topic, question, or keyword"
				/>
			</div>
			<p class="results-count">{{ formatCountLabel(filteredTopics.length, "topic") }}</p>
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

			<div v-if="!filteredTopics.length" class="empty-state">No topics match that search yet.</div>
			<div v-else class="topic-list">
				<article v-for="topic in filteredTopics" :key="topic.slug" class="topic-row">
					<div class="topic-row__main">
						<h3>{{ topic.title }}</h3>
						<p>{{ topic.description || topic.guide.snapshot }}</p>
						<div class="topic-row__meta">
							<span>{{ topic.guide.consensusLabel }}</span>
							<span>{{ formatCountLabel(topic.claimCount, "claim review") }}</span>
							<span>Updated {{ formatTopicDate(topic.updatedAt) }}</span>
						</div>
						<div v-if="topic.featuredClaims?.length" class="topic-row__claims">
							<span>Start with:</span>
							<NuxtLink
								v-for="claim in topic.featuredClaims.slice(0, 2)"
								:key="claim._id"
								:to="`/consensus/${topic.slug}/${claim.slug}`"
							>
								{{ claim.title }}
							</NuxtLink>
						</div>
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
	gap: 24px;
}

.directory__header h1,
.section-heading h2,
.topic-row h3 {
	font-family: "Fraunces", serif;
}

.directory__header h1 {
	font-size: clamp(2.5rem, 4.8vw, 4rem);
	margin: 8px 0 10px;
}

.directory__header p,
.section-heading p,
.topic-row p,
.empty-state,
.results-count {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.directory__controls,
.results-block,
.topic-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 20px;
}

.directory__controls,
.results-block {
	padding: 20px;
}

.directory__controls {
	display: grid;
	gap: 14px;
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
	padding: 14px 16px;
	border-radius: 16px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.filter-stack {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.filter {
	padding: 11px 14px;
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

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
	margin-bottom: 14px;
}

.section-heading h2,
.section-heading p {
	margin: 0;
}

.topic-list {
	display: grid;
	gap: 14px;
}

.topic-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 16px;
	padding: 18px;
}

.topic-row__meta,
.topic-row__claims {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.topic-row__claims a,
.topic-row__open {
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
	}

	.topic-row__side {
		justify-items: start;
	}
}
</style>
