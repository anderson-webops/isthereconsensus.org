<script setup lang="ts">
import type { QuestionResponse, Topic, TopicResponse } from "~/types/board";
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

const prompts = [
	"Where does the consensus actually sit on this claim?",
	"What part of this headline is the stable core and what part is just a bump?",
	"Is this disagreement about whether the effect exists or only how big it is?",
	"What would experts need to see before changing their minds?",
	"Does this video keep the scale of the evidence honest?"
];

const question = ref("");
const claim = ref("");
const sourceUrl = ref("");
const selectedTopic = ref("");
const submitting = ref(false);
const errorMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);

const { data: topicsData, pending: topicsPending } = await useAsyncData("topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true"))
);

const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);
const selectedGuide = computed(() => getTopicGuide(selectedTopic.value));

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
		errorMessage.value = "Pick a topic lane so we can organize your question.";
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
			sourceUrl: sourceUrl.value.trim(),
			captchaToken: captchaToken.value
		};
		const response = await $fetch<QuestionResponse>(apiUrl("/questions"), {
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
</script>

<template>
	<div class="ask">
		<header class="ask__header">
			<p class="eyebrow">Consensus check</p>
			<h1>Bring the claim, keep the scale honest.</h1>
			<p>
				Paste the claim, link the source when you have it, and place the question in the lane where it actually
				belongs. That keeps the later conversation sharper.
			</p>
			<p class="muted">
				Posts go to the community lane first. Curated consensus maps stay separate from the feed.
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

				<label class="ask-label" for="topic">Topic lane</label>
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
				<textarea
					id="question"
					v-model="question"
					rows="4"
					placeholder="What are you actually trying to check?"
				/>

				<label class="ask-label" for="claim">Context or quoted claim</label>
				<textarea
					id="claim"
					v-model="claim"
					rows="4"
					placeholder="Paste the quote, summarize the argument, or explain what felt off."
				/>

				<label class="ask-label" for="source">Source URL</label>
				<input
					id="source"
					v-model="sourceUrl"
					type="url"
					placeholder="Optional, but useful when you can point to the original source."
				/>

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
					<NuxtLink class="cta ghost" to="/consensus">Browse the board</NuxtLink>
				</div>
			</section>

			<section class="ask__panel ask__panel--context">
				<div>
					<p class="prompt-title">Starter prompts</p>
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
				</div>

				<div v-if="selectedTopic" class="guide">
					<h2>{{ topics.find((topic) => topic.slug === selectedTopic)?.title || "Selected lane" }}</h2>
					<ConsensusMeter
						:level="selectedGuide.consensusScore"
						:label="selectedGuide.consensusLabel"
						:caption="selectedGuide.snapshot"
					/>
					<div class="guide__section">
						<h3>Common misreads</h3>
						<ul>
							<li v-for="item in selectedGuide.commonMisreads" :key="item">{{ item }}</li>
						</ul>
					</div>
					<div class="guide__section">
						<h3>What moves this lane forward</h3>
						<ul>
							<li v-for="item in selectedGuide.whatWouldChangeMinds" :key="item">{{ item }}</li>
						</ul>
					</div>
				</div>
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
	font-size: clamp(2.5rem, 4.4vw, 3.8rem);
	margin-bottom: 12px;
}

.ask__header p {
	max-width: 720px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.ask__grid {
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.ask__panel {
	background: #fff;
	border-radius: 20px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 14px;
}

.ask__panel--context {
	align-content: start;
}

.ask-label,
.prompt-title {
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
}

.topic-chip.active {
	border-color: rgba(211, 107, 56, 0.28);
	box-shadow: 0 12px 24px rgba(211, 107, 56, 0.15);
}

.ask__actions {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 12px 22px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	font-size: 0.95rem;
	font-weight: 600;
	cursor: pointer;
	font-family: inherit;
	text-decoration: none;
}

.cta.primary {
	background: var(--consensus-ember);
	color: #fff;
	border-color: transparent;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.cta.ghost {
	background: var(--consensus-mist);
	color: var(--consensus-ink);
}

.prompt-grid,
.guide__section ul {
	display: grid;
	gap: 10px;
}

.prompt-chip {
	text-align: left;
	padding: 12px 16px;
	border-radius: 16px;
	border: 1px solid rgba(21, 17, 13, 0.1);
	background: var(--consensus-mist);
	font-family: inherit;
	font-size: 0.95rem;
	cursor: pointer;
}

.guide {
	display: grid;
	gap: 14px;
	padding: 18px;
	border-radius: 18px;
	background: rgba(21, 17, 13, 0.04);
}

.guide h2,
.guide h3 {
	font-family: "Fraunces", serif;
}

.guide h2 {
	margin: 0;
}

.guide__section ul {
	margin: 0;
	padding-left: 18px;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.muted {
	color: var(--consensus-muted);
}

.error {
	color: #b33a1b;
	margin: 0;
}
</style>
