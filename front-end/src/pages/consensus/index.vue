<script setup lang="ts">
import type { Question, QuestionsResponse, Topic, TopicResponse } from "~/types/board";

const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;

const { data: topicsData } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(`${apiBase}/api/topics?includeCounts=true`)
);
const { data: questionsData } = await useAsyncData("recent-questions", () =>
	$fetch<QuestionsResponse>(`${apiBase}/api/questions?limit=12`)
);

const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);
const questions = computed<Question[]>(() => questionsData.value?.questions ?? []);
</script>

<template>
	<div class="board">
		<header class="board__header">
			<p class="eyebrow">Consensus board</p>
			<h1>Browse questions by main concept.</h1>
			<p>
				Pick a category to see what people are asking and how the conversation is organized. This keeps the
				board clean and easy to navigate.
			</p>
			<NuxtLink class="cta primary" to="/ask">Post a question</NuxtLink>
		</header>

		<section class="topics">
			<h2>Main concepts</h2>
			<div v-if="!topics.length" class="muted">Topics are loading. Check back soon.</div>
			<div v-else class="topics__grid">
				<NuxtLink
					v-for="topic in topics"
					:key="topic.slug"
					class="topic-card"
					:to="`/consensus/${topic.slug}`"
					:style="{ '--accent': topic.accent || '#d36b38' }"
				>
					<div class="topic-card__header">
						<h3>{{ topic.title }}</h3>
						<span>{{ topic.questionCount ?? 0 }} questions</span>
					</div>
					<p>{{ topic.description }}</p>
					<span class="topic-card__cta">View questions →</span>
				</NuxtLink>
			</div>
		</section>

		<section class="recent">
			<h2>Recent questions</h2>
			<div v-if="!questions.length" class="muted">No questions yet. Be the first to post.</div>
			<div v-else class="recent__list">
				<div v-for="question in questions" :key="question._id" class="recent__card">
					<div class="recent__meta">
						<span>{{ question.topic.title }}</span>
						<span>{{ new Date(question.createdAt || "").toLocaleDateString() }}</span>
					</div>
					<h3>{{ question.title }}</h3>
					<p v-if="question.body">{{ question.body }}</p>
					<NuxtLink :to="`/consensus/${question.topic.slug}?highlight=${question._id}`">Open thread</NuxtLink>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.board {
	display: grid;
	gap: 36px;
}

.board__header h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.4rem, 4vw, 3.6rem);
	margin-bottom: 12px;
}

.board__header p {
	max-width: 640px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 12px 22px;
	border: none;
	font-size: 0.95rem;
	font-weight: 600;
	cursor: pointer;
	font-family: inherit;
	text-decoration: none;
	width: fit-content;
}

.cta.primary {
	background: var(--consensus-ember);
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.topics {
	display: grid;
	gap: 16px;
}

.topics__grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.topic-card {
	--accent: var(--consensus-ember);
	display: grid;
	gap: 8px;
	padding: 18px;
	border-radius: 18px;
	background: #fff;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	text-decoration: none;
	color: var(--consensus-ink);
	position: relative;
	overflow: hidden;
}

.topic-card::after {
	content: "";
	position: absolute;
	inset: auto -20% -40% auto;
	width: 120px;
	height: 120px;
	border-radius: 50%;
	background: color-mix(in srgb, var(--accent) 80%, transparent);
	opacity: 0.2;
}

.topic-card__header {
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 8px;
}

.topic-card__header h3 {
	font-family: "Fraunces", serif;
}

.topic-card__header span {
	color: var(--consensus-muted);
	font-size: 0.8rem;
}

.topic-card p {
	color: var(--consensus-muted);
	line-height: 1.5;
}

.topic-card__cta {
	font-weight: 600;
	color: var(--consensus-ember);
}

.recent {
	display: grid;
	gap: 16px;
}

.recent__list {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.recent__card {
	background: #fff;
	border-radius: 18px;
	padding: 18px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 12px 24px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 8px;
}

.recent__meta {
	display: flex;
	justify-content: space-between;
	font-size: 0.8rem;
	color: var(--consensus-muted);
}

.recent__card h3 {
	font-family: "Fraunces", serif;
}

.recent__card p {
	color: var(--consensus-muted);
	line-height: 1.5;
}

.muted {
	color: var(--consensus-muted);
}
</style>
