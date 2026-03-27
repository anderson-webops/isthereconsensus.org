<script setup lang="ts">
import type { Topic, TopicResponse } from "~/types/board";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import { getTopicGuide } from "~/data/topicGuides";

definePageMeta({
	layout: "home"
});

const router = useRouter();
const { apiUrl } = useApi();

const { data: topicsData } = await useAsyncData("home-topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true"))
);

const search = ref("");

const starterOrder = ["consensus-foundations", "media-misinformation", "active-debates"];
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
			return (
				leftRank - rightRank ||
				(right.questionCount ?? 0) - (left.questionCount ?? 0) ||
				left.title.localeCompare(right.title)
			);
		})
);

const searchQuery = computed(() => search.value.trim().toLowerCase());
const suggestedTopics = computed(() => {
	if (!searchQuery.value) return [];
	return enrichedTopics.value
		.filter((topic) => {
			const haystack = [
				topic.title,
				topic.description,
				topic.guide.snapshot,
				topic.guide.consensusLabel,
				...topic.guide.starterQuestions
			]
				.join(" ")
				.toLowerCase();
			return haystack.includes(searchQuery.value);
		})
		.slice(0, 5);
});

const trendingTopics = computed(() => enrichedTopics.value.slice(0, 5));
const quickPrinciples = [
	{
		title: "Start with the bottom line",
		body: "Each topic page opens with the short answer before the debate, sentiment, or community lane."
	},
	{
		title: "Treat new studies as updates, not instant reversals",
		body: "Most new papers add detail around the edges. They do not usually rewrite the center all at once."
	},
	{
		title: "Keep expert consensus separate from public opinion",
		body: "The site shows both, but it does not present them as the same kind of signal."
	}
];

function submitSearch() {
	const query = search.value.trim();
	if (!query) {
		router.push("/consensus");
		return;
	}
	if (suggestedTopics.value.length === 1) {
		router.push(`/consensus/${suggestedTopics.value[0].slug}`);
		return;
	}
	router.push({
		path: "/consensus",
		query: { q: query }
	});
}

function formatTopicDate(value?: string) {
	if (!value) return "Update pending";
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
}
</script>

<template>
	<div class="home">
		<section class="hero">
			<div class="hero__copy">
				<p class="eyebrow">Find out where the science stands</p>
				<h1>Understand the science. Skip the noise.</h1>
				<p class="hero__lead">
					Search a topic, read the short answer first, and only then decide whether you need the debate,
					literature, or community questions.
				</p>

				<form class="search-panel" @submit.prevent="submitSearch">
					<label class="search-panel__label" for="home-search">Search a topic or claim</label>
					<div class="search-panel__row">
						<input
							id="home-search"
							v-model="search"
							type="text"
							placeholder="Try climate change, sweeteners, or media misinformation"
						/>
						<button class="button button--primary" type="submit">Search</button>
					</div>
					<p class="search-panel__hint">
						If a topic already exists, open it first. If not, the site will send you to the topic browser.
					</p>
					<ul v-if="suggestedTopics.length" class="suggestion-list">
						<li v-for="topic in suggestedTopics" :key="topic.slug">
							<NuxtLink :to="`/consensus/${topic.slug}`">
								<strong>{{ topic.title }}</strong>
								<span>{{ topic.guide.snapshot }}</span>
							</NuxtLink>
						</li>
					</ul>
				</form>
			</div>

			<aside class="hero__aside">
				<p class="eyebrow">What you get on each topic page</p>
				<ol>
					<li>A plain-language bottom line.</li>
					<li>The stable core of the evidence.</li>
					<li>Open questions and public misunderstandings, clearly separated.</li>
				</ol>
			</aside>
		</section>

		<section class="home-section">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Trending consensus</p>
					<h2>Good places to start</h2>
				</div>
				<NuxtLink class="text-link" to="/consensus">Browse all topics</NuxtLink>
			</div>

			<div class="topic-list">
				<NuxtLink
					v-for="topic in trendingTopics"
					:key="topic.slug"
					class="topic-row"
					:to="`/consensus/${topic.slug}`"
				>
					<div class="topic-row__main">
						<h3>{{ topic.title }}</h3>
						<p>{{ topic.guide.snapshot }}</p>
						<div class="topic-row__meta">
							<span>{{ topic.guide.consensusLabel }}</span>
							<span>{{ topic.guide.evidenceTrail.length }} evidence routes</span>
							<span>Updated {{ formatTopicDate(topic.updatedAt) }}</span>
							<span>{{ topic.questionCount ?? 0 }} community threads</span>
						</div>
					</div>
					<div class="topic-row__meter">
						<ConsensusMeter :level="topic.guide.consensusScore" :label="topic.guide.consensusLabel" />
					</div>
				</NuxtLink>
			</div>
		</section>

		<section class="home-section home-section--soft">
			<div class="section-heading">
				<div>
					<p class="eyebrow">How to read the site</p>
					<h2>Keep the reading order simple</h2>
				</div>
			</div>

			<div class="principles">
				<article v-for="item in quickPrinciples" :key="item.title" class="principle">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="home-section home-section--compact">
			<div class="closing-callout">
				<div>
					<p class="eyebrow">Still do not see your topic?</p>
					<h2>Check the browser first, then ask.</h2>
					<p>
						The site works best when new questions land under the closest existing topic, so readers hit the
						consensus summary before the thread.
					</p>
				</div>
				<div class="closing-callout__actions">
					<NuxtLink class="button button--primary" to="/consensus">Browse topics</NuxtLink>
					<NuxtLink class="button button--ghost" to="/ask">Ask a question</NuxtLink>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.home {
	display: grid;
	gap: 40px;
}

.hero {
	display: grid;
	gap: 24px;
	grid-template-columns: minmax(0, 1.45fr) minmax(260px, 0.8fr);
	align-items: start;
}

.hero__copy,
.hero__aside,
.search-panel,
.topic-row,
.principle,
.closing-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 24px;
}

.hero__copy {
	padding: 28px;
	display: grid;
	gap: 20px;
}

.hero h1,
.section-heading h2,
.topic-row h3,
.principle h3,
.closing-callout h2 {
	font-family: "Fraunces", serif;
}

.hero h1 {
	font-size: clamp(2.7rem, 5vw, 4.4rem);
	line-height: 0.98;
	margin: 0;
	max-width: 12ch;
}

.hero__lead,
.topic-row p,
.principle p,
.closing-callout p,
.search-panel__hint,
.hero__aside {
	color: var(--consensus-muted);
}

.hero__lead {
	font-size: 1.05rem;
	line-height: 1.7;
	max-width: 58ch;
	margin: 0;
}

.hero__aside {
	padding: 24px;
}

.hero__aside ol {
	margin: 12px 0 0;
	padding-left: 18px;
	display: grid;
	gap: 12px;
	line-height: 1.6;
}

.search-panel {
	padding: 18px;
	display: grid;
	gap: 12px;
}

.search-panel__label,
.topic-row__meta,
.text-link,
.suggestion-list strong,
.button {
	font-weight: 600;
}

.search-panel__label {
	font-size: 0.95rem;
}

.search-panel__row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 12px;
}

.search-panel input {
	width: 100%;
	padding: 14px 16px;
	border-radius: 16px;
	border: 1px solid var(--consensus-line);
	background: #fff;
}

.search-panel__hint {
	margin: 0;
	font-size: 0.95rem;
	line-height: 1.6;
}

.suggestion-list {
	margin: 0;
	padding: 0;
	list-style: none;
	display: grid;
	gap: 10px;
}

.suggestion-list a {
	display: grid;
	gap: 4px;
	padding: 12px 14px;
	border-radius: 16px;
	background: var(--consensus-mist);
	text-decoration: none;
}

.suggestion-list span {
	font-size: 0.94rem;
	line-height: 1.5;
	color: var(--consensus-muted);
}

.home-section {
	display: grid;
	gap: 18px;
}

.home-section--soft {
	padding: 24px;
	border-radius: 24px;
	background: rgba(255, 255, 255, 0.65);
	border: 1px solid var(--consensus-soft-line);
}

.home-section--compact {
	gap: 0;
}

.section-heading {
	display: flex;
	justify-content: space-between;
	align-items: end;
	gap: 16px;
	flex-wrap: wrap;
}

.section-heading h2,
.topic-row h3,
.principle h3,
.closing-callout h2 {
	margin: 6px 0 0;
}

.topic-list,
.principles {
	display: grid;
	gap: 14px;
}

.topic-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
	gap: 18px;
	padding: 18px 20px;
	text-decoration: none;
}

.topic-row__main {
	display: grid;
	gap: 10px;
}

.topic-row__main p {
	margin: 0;
	line-height: 1.65;
}

.topic-row__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	font-size: 0.88rem;
	color: var(--consensus-muted);
}

.topic-row__meter {
	display: grid;
	align-content: center;
}

.principles {
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.principle {
	padding: 20px;
}

.principle p,
.closing-callout p {
	margin: 10px 0 0;
	line-height: 1.65;
}

.closing-callout {
	padding: 24px 26px;
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
	align-items: end;
}

.closing-callout__actions {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 20px;
	border-radius: 999px;
	text-decoration: none;
	border: 1px solid var(--consensus-line);
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: #fff;
}

.button--ghost {
	background: transparent;
}

.text-link {
	text-decoration: none;
}

@media (max-width: 920px) {
	.hero,
	.topic-row,
	.principles {
		grid-template-columns: 1fr;
	}

	.hero h1 {
		max-width: none;
	}
}

@media (max-width: 640px) {
	.hero__copy,
	.hero__aside,
	.search-panel,
	.topic-row,
	.principle,
	.closing-callout {
		border-radius: 20px;
	}

	.search-panel__row {
		grid-template-columns: 1fr;
	}
}
</style>
