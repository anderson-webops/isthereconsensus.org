<script setup lang="ts">
import type { Question, QuestionsResponse, SingleTopicResponse } from "~/types/board";
import { nextTick } from "vue";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import { getTopicGuide } from "~/data/topicGuides";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { isLoggedIn, currentAccount } = useAuth();
const captchaRequired = computed(() => !!config.public.captchaSiteKey);

interface ConsensusRouteParams {
	slug?: string | string[];
}

const slug = computed(() => {
	const value = (route.params as ConsensusRouteParams).slug;
	return Array.isArray(value) ? value[0] : String(value ?? "");
});
const highlightId = computed(() => (typeof route.query.highlight === "string" ? route.query.highlight : ""));

const { data: topicData } = await useAsyncData(`topic-${slug.value}`, () =>
	$fetch<SingleTopicResponse>(apiUrl(`/topics/${slug.value}`))
);

const { data: questionsData, refresh } = await useAsyncData(`questions-${slug.value}`, () =>
	$fetch<QuestionsResponse>(apiUrl(`/questions?topic=${slug.value}&limit=100`))
);

const questionText = ref("");
const questionDetails = ref("");
const questionSourceUrl = ref("");
const questionSearch = ref("");
const submitting = ref(false);
const errorMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);

const topic = computed(() => topicData.value?.topic);
const guide = computed(() => getTopicGuide(slug.value));
const questions = computed<Question[]>(() => questionsData.value?.questions ?? []);
const filteredQuestions = computed(() => {
	const query = questionSearch.value.trim().toLowerCase();
	if (!query) return questions.value;
	return questions.value.filter((question) =>
		[question.title, question.body, question.authorName, question.displayName, question.sourceUrl]
			.join(" ")
			.toLowerCase()
			.includes(query)
	);
});
const activeTab = ref<"community" | "consensus" | "gap">("community");

watch(
	() => highlightId.value,
	async (value) => {
		if (!value || !import.meta.client) return;
		await nextTick();
		document.getElementById(value)?.scrollIntoView({ behavior: "smooth", block: "center" });
	}
);

function chooseStarter(prompt: string) {
	questionText.value = prompt;
	activeTab.value = "community";
}

async function postQuestion() {
	errorMessage.value = "";
	if (!isLoggedIn.value) {
		errorMessage.value = "Please sign in before posting.";
		return;
	}
	const title = questionText.value.trim();
	if (!title) {
		errorMessage.value = "Please add a question before posting.";
		return;
	}
	if (captchaRequired.value && !captchaToken.value) {
		errorMessage.value = "Please complete the captcha.";
		return;
	}
	submitting.value = true;
	try {
		const response = await $fetch<{ question: Question }>(apiUrl("/questions"), {
			method: "POST",
			credentials: "include",
			body: {
				topic: slug.value,
				title,
				body: questionDetails.value.trim(),
				sourceUrl: questionSourceUrl.value.trim(),
				captchaToken: captchaToken.value
			}
		});
		questionText.value = "";
		questionDetails.value = "";
		questionSourceUrl.value = "";
		captchaRef.value?.reset();
		captchaToken.value = "";
		await refresh();
		await router.replace({ query: { highlight: response.question._id } });
	} catch (error) {
		errorMessage.value = "Unable to post right now. Please try again.";
		console.error(error);
	} finally {
		submitting.value = false;
	}
}
</script>

<template>
	<div class="topic">
		<header class="topic__header">
			<NuxtLink class="back" to="/consensus">← Back to board</NuxtLink>
			<div class="topic__header-grid">
				<div>
					<h1>{{ topic?.title || "Topic lane" }}</h1>
					<p>{{ topic?.description }}</p>
				</div>
				<div class="topic__summary">
					<ConsensusMeter
						:level="guide.consensusScore"
						:label="guide.consensusLabel"
						:caption="guide.snapshot"
					/>
				</div>
			</div>
		</header>

		<section class="topic__hero">
			<article class="hero-card">
				<p class="hero-card__eyebrow">Stable core</p>
				<ul>
					<li v-for="item in guide.stableCore" :key="item">{{ item }}</li>
				</ul>
			</article>
			<article class="hero-card">
				<p class="hero-card__eyebrow">Open edges</p>
				<ul>
					<li v-for="item in guide.openQuestions" :key="item">{{ item }}</li>
				</ul>
			</article>
		</section>

		<section class="topic__tabs">
			<button class="tab" :class="{ active: activeTab === 'community' }" @click="activeTab = 'community'">
				Community lane
			</button>
			<button class="tab" :class="{ active: activeTab === 'consensus' }" @click="activeTab = 'consensus'">
				Consensus map
			</button>
			<button class="tab" :class="{ active: activeTab === 'gap' }" @click="activeTab = 'gap'">Gap map</button>
		</section>

		<section v-if="activeTab === 'community'" class="topic__panel topic__panel--community">
			<div class="topic__post">
				<h2>Post a question in this lane</h2>
				<p class="muted">Ask the focused version of the question, not the biggest version of the fear.</p>

				<div class="starter-row">
					<button
						v-for="prompt in guide.starterQuestions"
						:key="prompt"
						class="starter-chip"
						type="button"
						@click="chooseStarter(prompt)"
					>
						{{ prompt }}
					</button>
				</div>

				<AuthPanel
					v-if="!isLoggedIn"
					title="Sign in to post"
					hint="You'll need an account before adding questions."
				/>
				<div v-else class="muted">Signed in as {{ currentAccount?.name }}</div>
				<label class="ask-label" for="topic-question">Question</label>
				<input
					id="topic-question"
					v-model="questionText"
					type="text"
					placeholder="Ask a clear, focused question."
				/>
				<label class="ask-label" for="topic-details">Context or quoted claim</label>
				<textarea
					id="topic-details"
					v-model="questionDetails"
					rows="4"
					placeholder="Add context, quote the source, or explain what confused you."
				/>
				<label class="ask-label" for="topic-source">Source URL</label>
				<input
					id="topic-source"
					v-model="questionSourceUrl"
					type="url"
					placeholder="Optional, but useful when you have the original source."
				/>
				<div v-if="isLoggedIn" class="captcha-block">
					<CaptchaWidget ref="captchaRef" v-model="captchaToken" />
				</div>
				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
				<button class="cta primary" type="button" :disabled="submitting || !isLoggedIn" @click="postQuestion">
					{{ submitting ? "Posting..." : "Post to this lane" }}
				</button>
			</div>

			<div class="topic__list">
				<div class="topic__list-header">
					<div>
						<h2>Questions in this lane</h2>
						<p class="muted">
							{{ questions.length }} questions so far, organized against the same consensus frame.
						</p>
					</div>
					<div class="topic__search">
						<label class="ask-label" for="question-search">Search this lane</label>
						<input
							id="question-search"
							v-model="questionSearch"
							type="text"
							placeholder="Filter by title, author, context, or source"
						/>
					</div>
				</div>
				<div v-if="!filteredQuestions.length" class="muted">No questions here yet. Start the conversation.</div>
				<div v-else class="question-grid">
					<article
						v-for="question in filteredQuestions"
						:id="question._id"
						:key="question._id"
						class="question-card"
						:class="{ highlight: question._id === highlightId }"
					>
						<div class="question-meta">
							<span>{{ new Date(question.createdAt || "").toLocaleDateString() }}</span>
							<span>{{ question.status || "open" }}</span>
						</div>
						<h3>{{ question.title }}</h3>
						<p v-if="question.authorName || question.displayName" class="question-byline">
							Asked by {{ question.authorName || question.displayName }}
						</p>
						<p v-if="question.body">{{ question.body }}</p>
						<a
							v-if="question.sourceUrl"
							class="question-link"
							:href="question.sourceUrl"
							target="_blank"
							rel="noreferrer"
						>
							Open source ↗
						</a>
					</article>
				</div>
			</div>
		</section>

		<section v-else-if="activeTab === 'consensus'" class="topic__panel">
			<div class="info-grid">
				<article class="info-card">
					<h2>Consensus snapshot</h2>
					<p>{{ guide.snapshot }}</p>
				</article>
				<article class="info-card">
					<h2>What would change minds</h2>
					<ul>
						<li v-for="item in guide.whatWouldChangeMinds" :key="item">{{ item }}</li>
					</ul>
				</article>
			</div>

			<div class="info-grid">
				<article class="info-card">
					<h2>Stable core</h2>
					<ul>
						<li v-for="item in guide.stableCore" :key="item">{{ item }}</li>
					</ul>
				</article>
				<article class="info-card">
					<h2>Evidence trail to follow</h2>
					<div class="resource-list">
						<div v-for="resource in guide.evidenceTrail" :key="resource.title" class="resource">
							<h3>{{ resource.title }}</h3>
							<p>{{ resource.note }}</p>
						</div>
					</div>
				</article>
			</div>
		</section>

		<section v-else class="topic__panel">
			<div class="info-grid">
				<article class="info-card">
					<h2>What people often get wrong</h2>
					<ul>
						<li v-for="item in guide.commonMisreads" :key="item">{{ item }}</li>
					</ul>
				</article>
				<article class="info-card">
					<h2>Good next questions</h2>
					<ul>
						<li v-for="item in guide.starterQuestions" :key="item">{{ item }}</li>
					</ul>
				</article>
			</div>

			<article class="info-card info-card--wide">
				<h2>How to use this gap map</h2>
				<p>
					The “gap” is the distance between what a headline or casual conversation suggests and what the
					evidence base actually supports. This lane keeps that gap visible so curiosity does not get hijacked
					by hype.
				</p>
			</article>
		</section>
	</div>
</template>

<style scoped>
.topic {
	display: grid;
	gap: 28px;
}

.topic__header-grid,
.topic__hero,
.info-grid,
.question-grid {
	display: grid;
	gap: 16px;
}

.topic__header-grid,
.topic__panel--community {
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.topic__header h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.5rem, 4.5vw, 3.8rem);
	margin: 8px 0 10px;
}

.topic__header p,
.muted,
.info-card p,
.question-card p {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.back {
	text-decoration: none;
	color: var(--consensus-muted);
	font-size: 0.92rem;
}

.topic__summary,
.hero-card,
.topic__post,
.topic__list,
.info-card,
.question-card {
	background: #fff;
	border-radius: 20px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.topic__hero,
.info-grid {
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.hero-card__eyebrow,
.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
	color: var(--consensus-muted);
}

.hero-card ul,
.info-card ul {
	margin: 12px 0 0;
	padding-left: 18px;
	display: grid;
	gap: 8px;
}

.topic__tabs {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.tab {
	border-radius: 999px;
	border: 1px solid rgba(21, 17, 13, 0.16);
	padding: 10px 16px;
	background: transparent;
	cursor: pointer;
	font-family: inherit;
	font-weight: 600;
	color: var(--consensus-muted);
}

.tab.active {
	border-color: rgba(211, 107, 56, 0.3);
	background: rgba(211, 107, 56, 0.12);
	color: var(--consensus-ink);
}

.topic__panel {
	display: grid;
	gap: 16px;
}

.topic__post,
.topic__list {
	display: grid;
	gap: 12px;
	align-content: start;
}

.starter-row {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.starter-chip {
	border-radius: 999px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 10px 14px;
	background: var(--consensus-mist);
	font: inherit;
	cursor: pointer;
}

.topic__post input,
.topic__post textarea,
.topic__search input {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
	font-size: 0.95rem;
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
	width: fit-content;
}

.cta.primary {
	background: var(--consensus-ember);
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.topic__list-header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.topic__search {
	display: grid;
	gap: 8px;
	min-width: min(100%, 320px);
}

.question-grid {
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.question-card {
	display: grid;
	gap: 10px;
}

.question-card.highlight {
	border-color: rgba(211, 107, 56, 0.35);
	box-shadow: 0 20px 40px rgba(211, 107, 56, 0.18);
}

.question-meta {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	font-size: 0.82rem;
	color: var(--consensus-muted);
}

.question-card h3,
.info-card h2,
.resource h3 {
	font-family: "Fraunces", serif;
}

.question-byline,
.question-link {
	font-size: 0.9rem;
}

.question-link {
	color: var(--consensus-ember);
	text-decoration: none;
	font-weight: 700;
}

.resource-list {
	display: grid;
	gap: 12px;
}

.resource {
	border-radius: 16px;
	padding: 14px;
	background: var(--consensus-mist);
}

.resource h3 {
	margin: 0 0 6px;
}

.resource p,
.error {
	margin: 0;
}

.info-card--wide {
	max-width: 760px;
}

.error {
	color: #b33a1b;
}
</style>
