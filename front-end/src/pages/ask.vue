<script setup lang="ts">
import type { Question, QuestionResponse, QuestionsResponse, Topic, TopicResponse } from "~/types/board";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { getTopicGuide } from "~/data/topicGuides";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { isLoggedIn, currentAccount } = useAuth();
const captchaRequired = computed(() => !!config.public.captchaSiteKey);

const prompts = [
	"Where does the consensus actually sit on this claim?",
	"Is this disagreement about whether the effect exists or only how big it is?",
	"What part of this headline is the stable core and what part is just a bump?"
];

const question = ref("");
const claim = ref("");
const sourceUrl = ref("");
const selectedTopic = ref("");
const submitting = ref(false);
const errorMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);
const manualContinue = ref(false);

const { data: topicsData, pending: topicsPending } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true"))
);
const { data: recentQuestionsData } = await useAsyncData("ask-recent-questions", () =>
	$fetch<QuestionsResponse>(apiUrl("/questions?limit=60"))
);

const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);
const recentQuestions = computed<Question[]>(() => recentQuestionsData.value?.questions ?? []);
const searchQuery = computed(() => question.value.trim().toLowerCase());
const selectedGuide = computed(() => getTopicGuide(selectedTopic.value));

const topicMatches = computed(() => {
	if (searchQuery.value.length < 3) return [];
	return topics.value
		.map((topic) => ({
			...topic,
			guide: getTopicGuide(topic.slug)
		}))
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
		.slice(0, 4);
});

const questionMatches = computed(() => {
	if (searchQuery.value.length < 3) return [];
	return recentQuestions.value
		.filter((entry) => {
			const haystack = [entry.title, entry.body, entry.topic.title, getTopicGuide(entry.topic.slug).snapshot]
				.join(" ")
				.toLowerCase();
			return haystack.includes(searchQuery.value);
		})
		.slice(0, 4);
});

const hasMatches = computed(() => topicMatches.value.length > 0 || questionMatches.value.length > 0);
const showPostingForm = computed(() => manualContinue.value || (searchQuery.value.length >= 3 && !hasMatches.value));

watchEffect(() => {
	const incomingQuestion = route.query.question;
	if (typeof incomingQuestion === "string" && incomingQuestion) {
		question.value = incomingQuestion;
	}

	const incomingTopic = route.query.topic;
	if (typeof incomingTopic === "string" && incomingTopic) {
		selectedTopic.value = incomingTopic;
	}
});

watch(
	() => [showPostingForm.value, topics.value.length, topicMatches.value.map((topic) => topic.slug).join("|")],
	() => {
		if (!topics.value.length) return;
		const availableTopics = topics.value.map((topic) => topic.slug);
		if (availableTopics.includes(selectedTopic.value)) return;
		selectedTopic.value = topicMatches.value[0]?.slug || topics.value[0].slug;
	},
	{ immediate: true }
);

function choosePrompt(prompt: string) {
	question.value = prompt;
}

async function submitQuestion() {
	errorMessage.value = "";
	if (!isLoggedIn.value) {
		errorMessage.value = "Please sign in before posting.";
		return;
	}
	const title = question.value.trim();
	if (!title) {
		errorMessage.value = "Please add a question so we can post it.";
		return;
	}
	if (!selectedTopic.value) {
		errorMessage.value = "Pick the closest topic so we can organize your question.";
		return;
	}
	if (captchaRequired.value && !captchaToken.value) {
		errorMessage.value = "Please complete the captcha.";
		return;
	}

	submitting.value = true;
	try {
		const response = await $fetch<QuestionResponse>(apiUrl("/questions"), {
			method: "POST",
			credentials: "include",
			body: {
				topic: selectedTopic.value,
				title,
				body: claim.value.trim(),
				sourceUrl: sourceUrl.value.trim(),
				captchaToken: captchaToken.value
			}
		});
		captchaRef.value?.reset();
		captchaToken.value = "";
		const slug = response.question.topic.slug || selectedTopic.value;
		router.push({
			path: `/consensus/${slug}`,
			query: { highlight: response.question._id }
		});
	} catch (error) {
		errorMessage.value = "We could not post that just yet. Please try again.";
		console.error(error);
	} finally {
		submitting.value = false;
	}
}
</script>

<template>
	<div class="ask-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Ask a question' }]" />

		<header class="ask-page__header">
			<p class="eyebrow">Ask a question</p>
			<h1>Search first. Post only if the site does not already cover it.</h1>
			<p>
				This keeps the site readable. Existing topics come first. New questions should land under the closest
				topic instead of creating a brand-new lane every time.
			</p>
		</header>

		<section class="ask-search">
			<label class="field-label" for="ask-question">What are you trying to check?</label>
			<textarea
				id="ask-question"
				v-model="question"
				rows="3"
				placeholder="Type the claim, headline, or question you want checked"
			/>
			<p class="ask-search__hint">
				Type a few words and the page will look for matching topics and existing community threads.
			</p>
		</section>

		<section class="match-grid">
			<article class="match-block">
				<div class="section-heading section-heading--tight">
					<h2>Possible topic matches</h2>
					<p>Open one of these first if it looks close.</p>
				</div>

				<div v-if="searchQuery.length < 3" class="empty-state">
					Type at least a few words to start matching.
				</div>
				<div v-else-if="!topicMatches.length" class="empty-state">No close topic match yet.</div>
				<div v-else class="match-list">
					<NuxtLink
						v-for="topic in topicMatches"
						:key="topic.slug"
						class="match-row"
						:to="`/consensus/${topic.slug}`"
					>
						<div>
							<h3>{{ topic.title }}</h3>
							<p>{{ topic.guide.snapshot }}</p>
						</div>
						<ConsensusMeter :level="topic.guide.consensusScore" :label="topic.guide.consensusLabel" />
					</NuxtLink>
				</div>
			</article>

			<article class="match-block">
				<div class="section-heading section-heading--tight">
					<h2>Recent threads that may already help</h2>
					<p>These are community posts, so still read the topic summary first.</p>
				</div>

				<div v-if="searchQuery.length < 3" class="empty-state">
					Type at least a few words to check existing threads.
				</div>
				<div v-else-if="!questionMatches.length" class="empty-state">No close thread match yet.</div>
				<div v-else class="match-list">
					<NuxtLink
						v-for="entry in questionMatches"
						:key="entry._id"
						class="thread-row"
						:to="`/consensus/${entry.topic.slug}?highlight=${entry._id}`"
					>
						<p class="thread-row__meta">{{ entry.topic.title }}</p>
						<h3>{{ entry.title }}</h3>
						<p>{{ entry.body || getTopicGuide(entry.topic.slug).snapshot }}</p>
					</NuxtLink>
				</div>
			</article>
		</section>

		<section class="posting-gate">
			<div>
				<p class="eyebrow">Still need to post?</p>
				<h2>Continue only if you still need a new thread.</h2>
				<p>Posting creates a community thread under a topic. It does not create a new top-level topic page.</p>
			</div>
			<button class="button button--ghost" type="button" @click="manualContinue = true">
				{{ hasMatches ? "I still need to post this" : "Continue to posting" }}
			</button>
		</section>

		<section v-if="showPostingForm" class="posting-form">
			<div class="posting-form__header">
				<div>
					<p class="eyebrow">Post under a topic</p>
					<h2>Choose the closest topic</h2>
				</div>
				<p>Readers should hit the consensus summary before they hit the thread.</p>
			</div>

			<AuthPanel
				v-if="!isLoggedIn"
				title="Sign in to post"
				hint="Only logged-in members can add community questions."
			/>
			<p v-else class="muted">Signed in as {{ currentAccount?.name }}</p>

			<div class="topic-picker">
				<label class="field-label" for="post-topic">Closest topic</label>
				<div v-if="topicsPending" class="empty-state">Loading topics...</div>
				<div v-else class="topic-picker__list">
					<button
						v-for="topic in topics"
						:key="topic.slug"
						class="topic-option"
						:class="{ active: selectedTopic === topic.slug }"
						type="button"
						@click="selectedTopic = topic.slug"
					>
						<strong>{{ topic.title }}</strong>
						<span>{{ topic.questionCount ?? 0 }} community threads</span>
					</button>
				</div>
			</div>

			<div v-if="selectedTopic" class="selected-topic">
				<h3>{{ topics.find((topic) => topic.slug === selectedTopic)?.title || "Selected topic" }}</h3>
				<ConsensusMeter
					:level="selectedGuide.consensusScore"
					:label="selectedGuide.consensusLabel"
					:caption="selectedGuide.snapshot"
				/>
			</div>

			<label class="field-label" for="post-context">Context or quoted claim</label>
			<textarea
				id="post-context"
				v-model="claim"
				rows="4"
				placeholder="Optional. Paste the quote, summarize the argument, or explain what felt off"
			/>

			<label class="field-label" for="post-source">Source URL</label>
			<input id="post-source" v-model="sourceUrl" type="url" placeholder="Optional source URL" />

			<details class="helper-details">
				<summary>Need help phrasing the question?</summary>
				<div class="starter-row">
					<button
						v-for="prompt in prompts"
						:key="prompt"
						class="starter-chip"
						type="button"
						@click="choosePrompt(prompt)"
					>
						{{ prompt }}
					</button>
				</div>
			</details>

			<div v-if="isLoggedIn" class="captcha-wrap">
				<CaptchaWidget ref="captchaRef" v-model="captchaToken" />
			</div>

			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			<div class="posting-form__actions">
				<button
					class="button button--primary"
					type="button"
					:disabled="submitting || !isLoggedIn"
					@click="submitQuestion"
				>
					{{ submitting ? "Posting..." : "Post to the board" }}
				</button>
				<NuxtLink class="button button--ghost" to="/consensus">Browse topics</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.ask-page {
	display: grid;
	gap: 24px;
}

.ask-page__header h1,
.section-heading h2,
.match-row h3,
.thread-row h3,
.posting-gate h2,
.posting-form h2,
.selected-topic h3 {
	font-family: "Fraunces", serif;
}

.ask-page__header h1 {
	font-size: clamp(2.5rem, 4.8vw, 4rem);
	margin: 8px 0 10px;
}

.ask-page__header p,
.ask-search__hint,
.section-heading p,
.empty-state,
.match-row p,
.thread-row p,
.posting-gate p,
.posting-form__header p,
.muted,
.error,
.field-label,
.topic-option span {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.ask-search,
.match-block,
.posting-gate,
.posting-form,
.match-row,
.thread-row,
.topic-option,
.selected-topic,
.helper-details {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.ask-search,
.match-block,
.posting-gate,
.posting-form,
.selected-topic,
.helper-details {
	padding: 20px;
}

.ask-search {
	display: grid;
	gap: 10px;
}

.ask-search textarea,
.posting-form textarea,
.posting-form input {
	padding: 14px 16px;
	border-radius: 16px;
	border: 1px solid var(--consensus-line);
	background: #fff;
}

.field-label,
.thread-row__meta,
.topic-option span {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.ask-search__hint,
.match-row p,
.thread-row p {
	margin: 0;
}

.match-grid {
	display: grid;
	gap: 18px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.match-block,
.match-list,
.posting-form {
	display: grid;
	gap: 14px;
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.match-row,
.thread-row {
	padding: 16px;
	text-decoration: none;
	display: grid;
	gap: 10px;
}

.match-row h3,
.thread-row h3,
.posting-gate h2,
.posting-form h2,
.selected-topic h3 {
	margin: 0;
}

.thread-row__meta {
	margin: 0;
}

.posting-gate {
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.posting-form__header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.topic-picker {
	display: grid;
	gap: 10px;
}

.topic-picker__list {
	display: grid;
	gap: 10px;
	grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
}

.topic-option {
	padding: 14px;
	display: grid;
	gap: 4px;
	text-align: left;
	cursor: pointer;
}

.topic-option.active {
	background: var(--consensus-soft-accent);
	border-color: rgba(211, 107, 56, 0.3);
}

.selected-topic {
	display: grid;
	gap: 10px;
}

.helper-details summary {
	cursor: pointer;
	font-weight: 600;
}

.starter-row {
	margin-top: 12px;
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.starter-chip,
.button {
	font: inherit;
}

.starter-chip {
	padding: 10px 14px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-mist);
	cursor: pointer;
}

.posting-form__actions {
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
	border: 1px solid var(--consensus-line);
	text-decoration: none;
	font-weight: 600;
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: #fff;
}

.button--ghost {
	background: transparent;
}

.error {
	margin: 0;
	font-weight: 600;
	color: #b83d2e;
}

@media (max-width: 920px) {
	.match-grid {
		grid-template-columns: 1fr;
	}
}
</style>
