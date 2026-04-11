<script setup lang="ts">
import type { Question, QuestionsResponse, Topic, TopicResponse } from "~/types/board";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { getTopicGuide } from "~/data/topicGuides";

const route = useRoute();
const router = useRouter();
const { apiUrl } = useApi();

const { data: topicsData } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"))
);
const { data: questionsData } = await useAsyncData("recent-questions", () =>
	$fetch<QuestionsResponse>(apiUrl("/questions?limit=9"))
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
const questions = computed<Question[]>(() => questionsData.value?.questions ?? []);
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
const starterTopics = computed(() =>
	filteredTopics.value.filter((topic) => starterOrder.includes(topic.slug)).slice(0, 3)
);
const filteredQuestions = computed(() =>
	questions.value.filter((question) => {
		const guide = getTopicGuide(question.topic.slug);
		const haystack = [question.title, question.body, question.topic.title, guide.snapshot].join(" ").toLowerCase();
		return matchesFilter(guide.consensusScore) && (!query.value || haystack.includes(query.value));
	})
);
</script>

<template>
	<div class="directory">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Browse topics' }]" />

		<header class="directory__header">
			<p class="eyebrow">Browse topics</p>
			<h1>Pick one topic. Read the bottom line first.</h1>
			<p>
				This page is a directory, not a feed. Search first, filter if you need to, and open one topic at a time.
			</p>
		</header>

		<div class="directory__layout">
			<aside class="directory__sidebar">
				<section class="sidebar-block">
					<p class="eyebrow">Start here</p>
					<h2>Recommended reading order</h2>
					<ol>
						<li>Search or pick one topic.</li>
						<li>Open the bottom line on that page.</li>
						<li>Only then move into debate, sentiment, or community threads.</li>
					</ol>
				</section>

				<section class="sidebar-block">
					<p class="eyebrow">Filter topics</p>
					<div class="filter-stack">
						<button class="filter" :class="{ active: filter === 'all' }" @click="filter = 'all'">
							All topics
						</button>
						<button class="filter" :class="{ active: filter === 'settled' }" @click="filter = 'settled'">
							Strong consensus
						</button>
						<button class="filter" :class="{ active: filter === 'debated' }" @click="filter = 'debated'">
							Active debate
						</button>
						<button
							class="filter"
							:class="{ active: filter === 'exploratory' }"
							@click="filter = 'exploratory'"
						>
							Exploratory
						</button>
					</div>
				</section>

				<section class="sidebar-block">
					<p class="eyebrow">When to use Ask</p>
					<p>
						Use Ask when you cannot find the topic yet. The site works best when new threads sit under an
						existing topic page.
					</p>
					<NuxtLink class="text-link" to="/ask">Go to Ask</NuxtLink>
				</section>

				<section class="sidebar-block">
					<p class="eyebrow">Method layer</p>
					<p>
						If you need help with evidence hierarchies, causation, or risk reporting, use the explainers and
						editorial standards before you dive deeper into a single topic.
					</p>
					<div class="sidebar-links">
						<NuxtLink class="text-link" to="/explainers">Read explainers</NuxtLink>
						<NuxtLink class="text-link" to="/standards">Read standards</NuxtLink>
						<NuxtLink class="text-link" to="/source-standards">Read source-stack standards</NuxtLink>
					</div>
				</section>
			</aside>

			<section class="directory__results">
				<div class="results-toolbar">
					<div class="results-search">
						<label class="results-search__label" for="directory-search">Search topics</label>
						<input
							id="directory-search"
							v-model="search"
							type="text"
							placeholder="Search by topic, question, or keyword"
						/>
					</div>
					<p class="results-count">{{ filteredTopics.length }} topics</p>
				</div>

				<section v-if="!query && filter === 'all' && starterTopics.length" class="starter-block">
					<div class="section-heading">
						<h2>High-value starting points</h2>
						<p>
							These are the strongest first topics when the public conversation is noisier than the
							evidence.
						</p>
					</div>
					<div class="starter-list">
						<NuxtLink
							v-for="topic in starterTopics"
							:key="topic.slug"
							class="starter-row"
							:to="`/consensus/${topic.slug}`"
						>
							<strong>{{ topic.title }}</strong>
							<span>{{ topic.guide.snapshot }}</span>
						</NuxtLink>
					</div>
				</section>

				<section class="results-block">
					<div class="section-heading section-heading--tight">
						<h2>Topic directory</h2>
						<p>Each topic page starts with a short answer and moves to deeper context only after that.</p>
					</div>

					<div v-if="!filteredTopics.length" class="empty-state">No topics match that search yet.</div>
					<div v-else class="topic-list">
						<article v-for="topic in filteredTopics" :key="topic.slug" class="topic-row">
							<div class="topic-row__main">
								<h3>{{ topic.title }}</h3>
								<p>{{ topic.description || topic.guide.snapshot }}</p>
								<div class="topic-row__meta">
									<span>{{ topic.guide.consensusLabel }}</span>
									<span>{{ topic.claimCount ?? 0 }} claim reviews</span>
									<span>{{ topic.guide.evidenceTrail.length }} evidence routes</span>
									<span>Updated {{ formatTopicDate(topic.updatedAt) }}</span>
									<span>{{ topic.questionCount ?? 0 }} community threads</span>
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
								<ConsensusMeter
									:level="topic.guide.consensusScore"
									:label="topic.guide.consensusLabel"
								/>
								<NuxtLink class="topic-row__open" :to="`/consensus/${topic.slug}`"
									>Open topic hub</NuxtLink
								>
							</div>
						</article>
					</div>
				</section>

				<details class="recent-panel">
					<summary>Recent community questions</summary>
					<div class="recent-panel__body">
						<p>
							Use these after you know the topic frame. If a thread looks relevant, open the topic page
							first.
						</p>
						<div v-if="!filteredQuestions.length" class="empty-state">
							No recent questions match that filter.
						</div>
						<div v-else class="recent-list">
							<article v-for="question in filteredQuestions" :key="question._id" class="recent-row">
								<div>
									<p class="recent-row__meta">
										<span>{{ question.topic.title }}</span>
										<span>{{ new Date(question.createdAt || "").toLocaleDateString() }}</span>
									</p>
									<h3>{{ question.title }}</h3>
									<p>{{ question.body || getTopicGuide(question.topic.slug).snapshot }}</p>
								</div>
								<NuxtLink :to="`/consensus/${question.topic.slug}?highlight=${question._id}`"
									>Open thread</NuxtLink
								>
							</article>
						</div>
					</div>
				</details>
			</section>
		</div>
	</div>
</template>

<style scoped>
.directory {
	display: grid;
	gap: 24px;
}

.directory__header h1,
.sidebar-block h2,
.section-heading h2,
.topic-row h3,
.recent-row h3 {
	font-family: "Fraunces", serif;
}

.directory__header h1 {
	font-size: clamp(2.5rem, 4.8vw, 4rem);
	margin: 8px 0 10px;
}

.directory__header p,
.sidebar-block p,
.sidebar-block ol,
.section-heading p,
.topic-row p,
.recent-panel__body p,
.empty-state,
.results-count {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.directory__layout {
	display: grid;
	grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
	gap: 24px;
	align-items: start;
}

.directory__sidebar,
.directory__results {
	display: grid;
	gap: 16px;
}

.sidebar-block,
.results-toolbar,
.starter-block,
.results-block,
.topic-row,
.recent-panel,
.recent-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 20px;
}

.sidebar-block,
.starter-block,
.results-block,
.recent-panel {
	padding: 18px;
}

.sidebar-block ol {
	margin: 12px 0 0;
	padding-left: 18px;
	display: grid;
	gap: 10px;
}

.filter-stack {
	display: grid;
	gap: 10px;
}

.sidebar-links {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.filter,
.text-link {
	font-weight: 600;
}

.filter {
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: transparent;
	text-align: left;
	cursor: pointer;
}

.filter.active {
	background: var(--consensus-soft-accent);
	border-color: rgba(211, 107, 56, 0.3);
}

.text-link {
	text-decoration: none;
}

.results-toolbar {
	padding: 16px 18px;
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.results-search {
	display: grid;
	gap: 8px;
	flex: 1;
	min-width: min(100%, 360px);
}

.results-search__label,
.topic-row__meta,
.recent-row__meta,
.results-count {
	font-size: 0.86rem;
	font-weight: 600;
}

.results-search input {
	padding: 13px 15px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.section-heading {
	display: flex;
	justify-content: space-between;
	align-items: end;
	gap: 14px;
	flex-wrap: wrap;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.starter-list,
.topic-list,
.recent-list {
	display: grid;
	gap: 12px;
}

.starter-row,
.topic-row,
.recent-row {
	text-decoration: none;
}

.starter-row {
	display: grid;
	gap: 4px;
	padding: 14px 16px;
	border-radius: 16px;
	background: var(--consensus-mist);
}

.starter-row span {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.topic-row {
	padding: 18px;
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(220px, 300px);
	gap: 18px;
}

.topic-row__main {
	display: grid;
	gap: 10px;
}

.topic-row__main h3,
.recent-row h3 {
	margin: 0;
}

.topic-row__main p,
.recent-row p {
	margin: 0;
}

.topic-row__claims {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	font-size: 0.9rem;
}

.topic-row__claims a {
	color: var(--consensus-ink);
	font-weight: 600;
	text-decoration: none;
}

.topic-row__claims span {
	color: var(--consensus-muted);
}

.topic-row__meta,
.recent-row__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	color: var(--consensus-muted);
}

.topic-row__side {
	display: grid;
	align-content: center;
	gap: 10px;
}

.topic-row__open {
	text-decoration: none;
	font-weight: 600;
	color: var(--consensus-ink);
}

.recent-panel summary {
	cursor: pointer;
	font-weight: 600;
}

.recent-panel__body {
	margin-top: 14px;
	display: grid;
	gap: 14px;
}

.recent-row {
	padding: 16px;
	display: flex;
	justify-content: space-between;
	gap: 18px;
	align-items: start;
}

.recent-row a {
	white-space: nowrap;
	font-weight: 600;
	text-decoration: none;
}

@media (max-width: 920px) {
	.directory__layout,
	.topic-row {
		grid-template-columns: 1fr;
	}
}

@media (max-width: 640px) {
	.results-toolbar {
		padding: 14px;
	}

	.results-search {
		min-width: 0;
		width: 100%;
	}

	.recent-row {
		flex-direction: column;
	}

	.recent-row a {
		white-space: normal;
		word-break: break-word;
	}
}
</style>
