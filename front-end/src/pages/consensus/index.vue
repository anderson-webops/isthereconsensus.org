<script setup lang="ts">
import type { Question, QuestionsResponse, Topic, TopicResponse } from "~/types/board";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import { getTopicGuide } from "~/data/topicGuides";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;

const { data: topicsData } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(`${apiBase}/api/topics?includeCounts=true`)
);
const { data: questionsData } = await useAsyncData("recent-questions", () =>
	$fetch<QuestionsResponse>(`${apiBase}/api/questions?limit=18`)
);

const search = ref("");
const filter = ref<"all" | "settled" | "debated" | "exploratory">("all");

const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);
const questions = computed<Question[]>(() => questionsData.value?.questions ?? []);
const enrichedTopics = computed(() =>
	topics.value.map((topic) => ({
		...topic,
		guide: getTopicGuide(topic.slug)
	}))
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

const averageConsensus = computed(() => {
	if (!enrichedTopics.value.length) return 0;
	const total = enrichedTopics.value.reduce((sum, topic) => sum + topic.guide.consensusScore, 0);
	return Math.round(total / enrichedTopics.value.length);
});

const debatedTopics = computed(
	() =>
		enrichedTopics.value.filter((topic) => topic.guide.consensusScore >= 45 && topic.guide.consensusScore < 75)
			.length
);
</script>

<template>
	<div class="board">
		<header class="board__header">
			<p class="eyebrow">Consensus board</p>
			<h1>Browse questions by topic, consensus strength, and confusion pattern.</h1>
			<p>
				Use the board as a map, not just a feed. Each lane shows what is stable, where the debate really is, and
				what kinds of questions belong there.
			</p>
			<div class="board__actions">
				<NuxtLink class="cta primary" to="/ask">Post a question</NuxtLink>
				<NuxtLink class="cta ghost" to="/setup">Open setup hub</NuxtLink>
			</div>
		</header>

		<section class="stats">
			<article class="stat-card">
				<p>Topic lanes</p>
				<h2>{{ enrichedTopics.length }}</h2>
				<span>Curated consensus maps</span>
			</article>
			<article class="stat-card">
				<p>Average consensus</p>
				<h2>{{ averageConsensus }}%</h2>
				<span>Across current topic lanes</span>
			</article>
			<article class="stat-card">
				<p>Active debate lanes</p>
				<h2>{{ debatedTopics }}</h2>
				<span>Where mechanism and magnitude are still contested</span>
			</article>
		</section>

		<section class="controls">
			<div class="controls__search">
				<label class="ask-label" for="board-search">Search topics or recent questions</label>
				<input
					id="board-search"
					v-model="search"
					type="text"
					placeholder="Try bias, misinformation, replication, communication..."
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
				<h2>Topic lanes</h2>
				<p>
					Each lane carries a different kind of consensus work: stable core, real debate, or translation
					problems.
				</p>
			</div>
			<div v-if="!filteredTopics.length" class="muted">No topic lanes match that filter yet.</div>
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
					<div class="topic-card__meta">
						<span>{{ topic.guide.openQuestions.length }} open edges</span>
						<span>{{ topic.guide.commonMisreads.length }} common misreads</span>
					</div>
					<span class="topic-card__cta">Open lane →</span>
				</NuxtLink>
			</div>
		</section>

		<section class="recent">
			<div class="section-head">
				<h2>Recent questions</h2>
				<p>
					Recent posts stay grounded by their lane’s consensus framing instead of floating as isolated hot
					takes.
				</p>
			</div>
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
					<NuxtLink :to="`/consensus/${question.topic.slug}?highlight=${question._id}`">Open thread</NuxtLink>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.board {
	display: grid;
	gap: 32px;
}

.board__header h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.5rem, 4.6vw, 3.8rem);
	margin: 10px 0 12px;
	max-width: 900px;
}

.board__header p {
	max-width: 700px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.board__actions {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	margin-top: 20px;
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

.stats,
.topics__grid,
.recent__list {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.stat-card,
.controls,
.topic-card,
.recent__card {
	background: #fff;
	border-radius: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.stat-card {
	padding: 18px;
}

.stat-card p,
.stat-card span,
.topic-card__description,
.recent__card p,
.muted,
.section-head p {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.stat-card p {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
}

.stat-card h2,
.section-head h2,
.topic-card h3,
.recent__card h3 {
	font-family: "Fraunces", serif;
}

.stat-card h2 {
	font-size: 2rem;
	margin: 10px 0 8px;
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

.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.7rem;
	color: var(--consensus-muted);
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

.topic-card__meta {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	font-size: 0.82rem;
	color: var(--consensus-muted);
}

.topic-card__cta {
	font-weight: 700;
	color: var(--consensus-ember);
}

.recent__snapshot {
	font-weight: 600;
}

.recent__footer {
	color: var(--consensus-muted);
}
</style>
