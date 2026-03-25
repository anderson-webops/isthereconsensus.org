<script setup lang="ts">
import type { Question, QuestionsResponse, Topic, TopicResponse } from "~/types/board";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import { getTopicGuide } from "~/data/topicGuides";

const { apiUrl } = useApi();

const { data: topicsData } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true"))
);
const { data: questionsData } = await useAsyncData("recent-questions", () =>
	$fetch<QuestionsResponse>(apiUrl("/questions?limit=9"))
);

const search = ref("");
const filter = ref<"all" | "settled" | "debated" | "exploratory">("all");

const browseSteps = [
	"Pick one topic instead of skimming every card.",
	"Inside that topic, read the Consensus view first.",
	"Only then open Sentiment or Questions for more context."
];

const starterOrder = ["consensus-foundations", "media-misinformation", "active-debates"];
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

const filteredQuestions = computed(() =>
	questions.value.filter((question) => {
		const guide = getTopicGuide(question.topic.slug);
		const haystack = [question.title, question.body, question.topic.title, guide.snapshot].join(" ").toLowerCase();
		return matchesFilter(guide.consensusScore) && (!query.value || haystack.includes(query.value));
	})
);
</script>

<template>
	<div class="board">
		<header class="board__header">
			<p class="eyebrow">Browse topics</p>
			<h1>Pick a topic. Read the summary first. Use the board after that.</h1>
			<p>
				This page works best when it acts like a directory, not a feed. Choose one topic, open its Consensus
				view, and treat the rest as optional depth.
			</p>
			<div class="board__actions">
				<NuxtLink class="cta primary" to="/ask">Ask a question</NuxtLink>
				<NuxtLink class="cta ghost" to="/how">How it works</NuxtLink>
			</div>
		</header>

		<section class="guide">
			<article class="guide__lead">
				<p class="guide__tag">Recommended reading order</p>
				<h2>If you are not sure where to start, follow this.</h2>
				<p>
					The site is easier to read when community discussion comes after the consensus frame instead of
					before it.
				</p>
			</article>
			<div class="guide__steps">
				<article v-for="(step, index) in browseSteps" :key="step" class="guide-step">
					<span>{{ index + 1 }}</span>
					<p>{{ step }}</p>
				</article>
			</div>
		</section>

		<section class="controls">
			<div class="controls__search">
				<label class="ask-label" for="board-search">Search topics or recent questions</label>
				<input
					id="board-search"
					v-model="search"
					type="text"
					placeholder="Search by topic, question, or keyword..."
				/>
			</div>
			<div class="controls__filters">
				<button class="filter" :class="{ active: filter === 'all' }" @click="filter = 'all'">All</button>
				<button class="filter" :class="{ active: filter === 'settled' }" @click="filter = 'settled'">
					Settled core
				</button>
				<button class="filter" :class="{ active: filter === 'debated' }" @click="filter = 'debated'">
					Active debates
				</button>
				<button class="filter" :class="{ active: filter === 'exploratory' }" @click="filter = 'exploratory'">
					Exploratory
				</button>
			</div>
		</section>

		<section class="topics">
			<div class="section-head">
				<h2>Topics</h2>
				<p>Every topic starts with its own consensus summary so you do not have to infer the frame yourself.</p>
			</div>
			<div v-if="!filteredTopics.length" class="muted">No topics match that filter yet.</div>
			<div v-else class="topics__grid">
				<NuxtLink
					v-for="topic in filteredTopics"
					:key="topic.slug"
					class="topic-card"
					:to="`/consensus/${topic.slug}`"
					:style="{ '--accent': topic.accent || '#d36b38' }"
				>
					<div class="topic-card__header">
						<div>
							<h3>{{ topic.title }}</h3>
							<p class="topic-card__count">{{ topic.questionCount ?? 0 }} community questions</p>
						</div>
						<span class="topic-card__tag">{{ topic.guide.consensusLabel }}</span>
					</div>
					<p class="topic-card__description">{{ topic.description }}</p>
					<ConsensusMeter
						:level="topic.guide.consensusScore"
						:caption="topic.guide.snapshot"
						:label="topic.guide.consensusLabel"
					/>
					<p class="topic-card__next">Open this topic and start with the Consensus view.</p>
					<span class="topic-card__cta">Open topic →</span>
				</NuxtLink>
			</div>
		</section>

		<details class="recent-panel">
			<summary>See recent community questions</summary>
			<div class="recent-panel__body">
				<p class="recent-panel__intro">
					These are useful once you already know the topic frame. If a thread looks relevant, open the topic
					first and read the summary before the thread.
				</p>
				<div v-if="!filteredQuestions.length" class="muted">No recent questions match that filter yet.</div>
				<div v-else class="recent__list">
					<div v-for="question in filteredQuestions" :key="question._id" class="recent__card">
						<div class="recent__meta">
							<span>{{ question.topic.title }}</span>
							<span>{{ new Date(question.createdAt || "").toLocaleDateString() }}</span>
						</div>
						<h3>{{ question.title }}</h3>
						<p class="recent__snapshot">{{ getTopicGuide(question.topic.slug).snapshot }}</p>
						<p v-if="question.body">{{ question.body }}</p>
						<div class="recent__footer">
							<span v-if="question.sourceUrl">Source linked</span>
							<span v-if="question.authorName || question.displayName"
								>By {{ question.authorName || question.displayName }}</span
							>
						</div>
						<NuxtLink :to="`/consensus/${question.topic.slug}?highlight=${question._id}`"
							>Open thread</NuxtLink
						>
					</div>
				</div>
			</div>
		</details>
	</div>
</template>

<style scoped>
.board {
	display: grid;
	gap: 28px;
}

.board__header h1,
.guide__lead h2,
.section-head h2,
.topic-card h3,
.recent__card h3 {
	font-family: "Fraunces", serif;
}

.board__header h1 {
	font-size: clamp(2.5rem, 4.6vw, 3.8rem);
	margin: 10px 0 12px;
	max-width: 920px;
}

.board__header p,
.guide__lead p,
.topic-card__description,
.topic-card__next,
.recent__card p,
.recent-panel__intro,
.muted,
.section-head p {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.board__actions {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	margin-top: 18px;
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 12px 22px;
	font-size: 0.95rem;
	font-weight: 600;
	text-decoration: none;
	border: 1px solid rgba(21, 17, 13, 0.12);
}

.cta.primary {
	background: var(--consensus-ember);
	border-color: transparent;
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.cta.ghost {
	background: rgba(255, 255, 255, 0.76);
	color: var(--consensus-ink);
}

.guide,
.controls,
.topic-card,
.recent-panel,
.recent__card {
	background: #fff;
	border-radius: 22px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.guide {
	padding: 20px;
	display: grid;
	gap: 18px;
}

.guide__tag,
.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.7rem;
	color: var(--consensus-muted);
}

.guide__steps,
.topics__grid,
.recent__list {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.guide-step {
	padding: 16px 18px;
	border-radius: 18px;
	background: rgba(21, 17, 13, 0.05);
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 12px;
	align-items: start;
}

.guide-step span {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: inline-grid;
	place-items: center;
	background: rgba(211, 107, 56, 0.14);
	color: var(--consensus-ember);
	font-weight: 700;
}

.controls {
	padding: 18px;
	display: grid;
	gap: 16px;
}

.controls__search {
	display: grid;
	gap: 8px;
}

.controls input {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
	font-size: 0.95rem;
}

.controls__filters {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.filter {
	border-radius: 999px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	background: var(--consensus-mist);
	padding: 10px 16px;
	font: inherit;
	font-weight: 600;
	cursor: pointer;
	color: var(--consensus-muted);
}

.filter.active {
	background: rgba(211, 107, 56, 0.12);
	border-color: rgba(211, 107, 56, 0.3);
	color: var(--consensus-ink);
}

.section-head h2 {
	margin-bottom: 6px;
}

.topic-card,
.recent__card {
	padding: 20px;
	text-decoration: none;
	color: var(--consensus-ink);
	display: grid;
	gap: 12px;
}

.topic-card {
	position: relative;
	overflow: hidden;
}

.topic-card::after {
	content: "";
	position: absolute;
	inset: auto -15% -25% auto;
	width: 160px;
	height: 160px;
	border-radius: 50%;
	background: color-mix(in srgb, var(--accent) 80%, transparent);
	opacity: 0.18;
}

.topic-card__header,
.recent__meta,
.recent__footer {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	flex-wrap: wrap;
}

.topic-card__count,
.recent__meta,
.recent__footer {
	font-size: 0.82rem;
}

.topic-card__tag {
	font-size: 0.82rem;
	font-weight: 700;
	max-width: 180px;
	text-align: right;
}

.topic-card__next {
	font-weight: 600;
	margin: 0;
}

.topic-card__cta {
	font-weight: 700;
	color: var(--consensus-ember);
}

.recent-panel {
	padding: 18px 20px;
}

.recent-panel summary {
	cursor: pointer;
	font-family: "Fraunces", serif;
	font-size: 1.3rem;
}

.recent-panel summary::-webkit-details-marker {
	display: none;
}

.recent-panel__body {
	display: grid;
	gap: 16px;
	margin-top: 16px;
}

.recent__snapshot {
	font-weight: 600;
}

.recent__footer {
	color: var(--consensus-muted);
}
</style>
