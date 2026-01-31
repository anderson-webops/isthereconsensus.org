<script setup lang="ts">
import type { Question, QuestionsResponse, SingleTopicResponse } from "~/types/board";
import { nextTick } from "vue";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;
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
	$fetch<SingleTopicResponse>(`${apiBase}/api/topics/${slug.value}`)
);

const { data: questionsData, refresh } = await useAsyncData(`questions-${slug.value}`, () =>
	$fetch<QuestionsResponse>(`${apiBase}/api/questions?topic=${slug.value}&limit=100`)
);

const questionText = ref("");
const questionDetails = ref("");
const submitting = ref(false);
const errorMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);

const topic = computed(() => topicData.value?.topic);
const questions = computed<Question[]>(() => questionsData.value?.questions ?? []);

watch(
	() => highlightId.value,
	async (value) => {
		if (!value || !import.meta.client) return;
		await nextTick();
		document.getElementById(value)?.scrollIntoView({ behavior: "smooth", block: "center" });
	}
);

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
		const response = await $fetch<{ question: Question }>(`${apiBase}/api/questions`, {
			method: "POST",
			credentials: "include",
			body: {
				topic: slug.value,
				title,
				body: questionDetails.value.trim(),
				captchaToken: captchaToken.value
			}
		});
		questionText.value = "";
		questionDetails.value = "";
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
			<h1>{{ topic?.title || "Main concept" }}</h1>
			<p>{{ topic?.description }}</p>
		</header>

		<section class="topic__post">
			<h2>Post a question in this category</h2>
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
			<label class="ask-label" for="topic-details">Optional details</label>
			<textarea
				id="topic-details"
				v-model="questionDetails"
				rows="3"
				placeholder="Add context, quotes, or why you're asking."
			/>
			<div v-if="isLoggedIn" class="captcha-block">
				<CaptchaWidget ref="captchaRef" v-model="captchaToken" />
			</div>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			<button class="cta primary" type="button" :disabled="submitting || !isLoggedIn" @click="postQuestion">
				{{ submitting ? "Posting..." : "Post to this topic" }}
			</button>
		</section>

		<section class="topic__list">
			<h2>Questions in this topic</h2>
			<div v-if="!questions.length" class="muted">No questions here yet. Start the conversation.</div>
			<div v-else class="question-grid">
				<article
					v-for="question in questions"
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
				</article>
			</div>
		</section>
	</div>
</template>

<style scoped>
.topic {
	display: grid;
	gap: 32px;
}

.topic__header h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.4rem, 4vw, 3.6rem);
	margin-bottom: 8px;
}

.topic__header p {
	max-width: 640px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.back {
	text-decoration: none;
	color: var(--consensus-muted);
	font-size: 0.9rem;
}

.topic__post {
	background: #fff;
	border-radius: 18px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 12px;
}

.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.7rem;
	color: var(--consensus-muted);
}

.topic__post input,
.topic__post textarea {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
	font-size: 0.95rem;
}

.captcha-block {
	display: grid;
	gap: 8px;
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

.cta.primary:disabled {
	opacity: 0.6;
	cursor: wait;
}

.topic__list {
	display: grid;
	gap: 16px;
}

.question-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.question-card {
	background: #fff;
	border-radius: 18px;
	padding: 18px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 12px 24px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 8px;
}

.question-card.highlight {
	border-color: var(--consensus-ember);
	box-shadow: 0 16px 32px rgba(211, 107, 56, 0.25);
}

.question-meta {
	display: flex;
	justify-content: space-between;
	font-size: 0.8rem;
	color: var(--consensus-muted);
}

.question-card h3 {
	font-family: "Fraunces", serif;
}

.question-card p {
	color: var(--consensus-muted);
	line-height: 1.5;
}

.question-byline {
	font-size: 0.85rem;
	margin: 0;
	color: var(--consensus-muted);
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.muted {
	color: var(--consensus-muted);
}

.error {
	color: #b83d2e;
	font-weight: 600;
}
</style>
