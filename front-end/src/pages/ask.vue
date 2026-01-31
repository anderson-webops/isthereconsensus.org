<script setup lang="ts">
import type { QuestionResponse, Topic, TopicResponse } from "~/types/board";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;
const { isLoggedIn, currentAccount } = useAuth();
const captchaRequired = computed(() => !!config.public.captchaSiteKey);

const prompts = [
	"Summarize the video",
	"Recommend related content",
	"Why does science face bias?",
	"How does Crash Course balance education and engagement?",
	'What is the "scandal hypothesis"?'
];

const question = ref("");
const claim = ref("");
const selectedTopic = ref("");
const submitting = ref(false);
const errorMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);

const { data: topicsData, pending: topicsPending } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(`${apiBase}/api/topics?includeCounts=true`)
);

const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);

watchEffect(() => {
	const incoming = route.query.question;
	if (typeof incoming === "string") {
		question.value = incoming;
	}

	const incomingTopic = route.query.topic;
	if (typeof incomingTopic === "string" && incomingTopic) {
		selectedTopic.value = incomingTopic;
	}

	if (topics.value.length) {
		const hasMatch = topics.value.some((topic) => topic.slug === selectedTopic.value);
		if (!hasMatch) selectedTopic.value = topics.value[0].slug;
	}
});

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
		errorMessage.value = "Pick a main concept so we can organize your question.";
		return;
	}
	if (captchaRequired.value && !captchaToken.value) {
		errorMessage.value = "Please complete the captcha.";
		return;
	}

	submitting.value = true;
	try {
		const payload = {
			topic: selectedTopic.value,
			title,
			body: claim.value.trim(),
			captchaToken: captchaToken.value
		};
		const response = await $fetch<QuestionResponse>(`${apiBase}/api/questions`, {
			method: "POST",
			credentials: "include",
			body: payload
		});
		captchaRef.value?.reset();
		captchaToken.value = "";
		const slug = response.question.topic.slug || selectedTopic.value;
		router.push({
			path: `/consensus/${slug}`,
			query: { highlight: response.question._id }
		});
	} catch (error) {
		errorMessage.value = "We couldn't post that just yet. Please try again.";
		console.error(error);
	} finally {
		submitting.value = false;
	}
}

function backHome() {
	router.push("/");
}
</script>

<template>
	<div class="ask">
		<header class="ask__header">
			<p class="eyebrow">Consensus check</p>
			<h1>Ask about what you watched.</h1>
			<p>
				Paste a claim, summarize the video, or pick a starter prompt. We will map consensus and surface the real
				questions.
			</p>
		</header>

		<div class="ask__grid">
			<section class="ask__panel">
				<AuthPanel
					v-if="!isLoggedIn"
					title="Sign in to post"
					hint="Only logged-in members can post to the board."
				/>
				<div v-else class="muted">Signed in as {{ currentAccount?.name }}</div>
				<label class="ask-label" for="topic">Main concept</label>
				<div v-if="topicsPending" class="muted">Loading topics...</div>
				<div v-else-if="!topics.length" class="muted">No topics available yet.</div>
				<div v-else class="topic-grid">
					<button
						v-for="topic in topics"
						:key="topic.slug"
						class="topic-chip"
						:class="{ active: selectedTopic === topic.slug }"
						type="button"
						@click="selectedTopic = topic.slug"
					>
						<span>{{ topic.title }}</span>
						<small>{{ topic.questionCount ?? 0 }} questions</small>
					</button>
				</div>

				<label class="ask-label" for="question">Your question</label>
				<textarea id="question" v-model="question" rows="4" placeholder="What is the video claiming?" />

				<label class="ask-label" for="claim">Optional: the specific claim</label>
				<input id="claim" v-model="claim" type="text" placeholder="Short, exact phrasing helps." />

				<div v-if="isLoggedIn" class="captcha-block">
					<CaptchaWidget ref="captchaRef" v-model="captchaToken" />
				</div>

				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>

				<div class="ask__actions">
					<button
						class="cta primary"
						type="button"
						:disabled="submitting || !isLoggedIn"
						@click="submitQuestion"
					>
						{{ submitting ? "Posting..." : "Post to the board" }}
					</button>
					<button class="cta ghost" type="button" @click="backHome">Back home</button>
				</div>
			</section>

			<section class="ask__panel">
				<p class="prompt-title">Not sure what to ask?</p>
				<div class="prompt-grid">
					<button
						v-for="prompt in prompts"
						:key="prompt"
						class="prompt-chip"
						type="button"
						@click="choosePrompt(prompt)"
					>
						{{ prompt }}
					</button>
				</div>
				<p class="muted">You can edit the prompt after clicking it.</p>
			</section>
		</div>
	</div>
</template>

<style scoped>
.ask {
	display: grid;
	gap: 32px;
}

.ask__header h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.4rem, 4vw, 3.6rem);
	margin-bottom: 12px;
}

.ask__header p {
	max-width: 640px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.ask__grid {
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.ask__panel {
	background: #fff;
	border-radius: 20px;
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

.ask__panel textarea,
.ask__panel input {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
	font-size: 0.95rem;
}

.topic-grid {
	display: grid;
	gap: 10px;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.topic-chip {
	border-radius: 16px;
	border: 1px solid rgba(21, 17, 13, 0.1);
	padding: 12px 14px;
	text-align: left;
	background: var(--consensus-cream);
	font-family: inherit;
	cursor: pointer;
	display: grid;
	gap: 4px;
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
}

.topic-chip.active {
	border-color: var(--consensus-ember);
	box-shadow: 0 12px 24px rgba(211, 107, 56, 0.2);
	transform: translateY(-1px);
}

.topic-chip small {
	color: var(--consensus-muted);
	font-size: 0.75rem;
}

.ask__actions {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
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

.cta.ghost {
	background: transparent;
	border: 1px solid rgba(21, 17, 13, 0.2);
	color: var(--consensus-ink);
}

.prompt-title {
	font-size: 0.95rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--consensus-muted);
}

.prompt-grid {
	display: grid;
	gap: 10px;
}

.prompt-chip {
	text-align: left;
	padding: 12px 16px;
	border-radius: 999px;
	border: 1px solid rgba(21, 17, 13, 0.1);
	background: var(--consensus-cream);
	font-family: inherit;
	font-size: 0.95rem;
	color: var(--consensus-ink);
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
}

.prompt-chip:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 20px rgba(21, 17, 13, 0.12);
}

.muted {
	color: var(--consensus-muted);
	font-size: 0.9rem;
}

.error {
	color: #b83d2e;
	font-weight: 600;
}
</style>
