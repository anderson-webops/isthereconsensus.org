<script setup lang="ts">
import type { Question, QuestionsResponse, SingleTopicResponse } from "~/types/board";
import { nextTick } from "vue";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";
import CommunitySentimentPanel from "~/components/CommunitySentimentPanel.vue";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import EvidenceExplorer from "~/components/EvidenceExplorer.vue";
import { getTopicGuide } from "~/data/topicGuides";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { isLoggedIn, currentAccount, role } = useAuth();
const captchaRequired = computed(() => !!config.public.captchaSiteKey);

interface ConsensusRouteParams {
	slug?: string | string[];
}

type TopicTab = "community" | "consensus" | "gap";

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
const moderationMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);
const flaggingId = ref("");
const deletingId = ref("");
const flagReason = ref<Record<string, string>>({});
const flagNote = ref<Record<string, string>>({});
const showComposer = ref(false);

const topic = computed(() => topicData.value?.topic);
const guide = computed(() => getTopicGuide(slug.value));
const questions = computed<Question[]>(() => questionsData.value?.questions ?? []);
const isAdmin = computed(() => role.value === "admin");
const activeTab = ref<TopicTab>(highlightId.value ? "community" : "consensus");
const tabGuides = [
	{
		key: "consensus",
		step: "1",
		title: "Consensus",
		body: "Start here for the short answer, the stable core, and the real open questions."
	},
	{
		key: "gap",
		step: "2",
		title: "Sentiment",
		body: "Use this after the summary to compare public impression with the evidence."
	},
	{
		key: "community",
		step: "3",
		title: "Questions",
		body: "Open the board after you know the frame, so each thread makes more sense."
	}
] as const;
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
const flagOptions = ["off-topic", "duplicate", "misleading", "low-quality", "needs-sources", "abusive"];

watch(
	() => highlightId.value,
	async (value) => {
		if (!value || !import.meta.client) return;
		activeTab.value = "community";
		await nextTick();
		document.getElementById(value)?.scrollIntoView({ behavior: "smooth", block: "center" });
	}
);

function chooseStarter(prompt: string) {
	questionText.value = prompt;
	activeTab.value = "community";
	showComposer.value = true;
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
		showComposer.value = false;
		await refresh();
		await router.replace({ query: { highlight: response.question._id } });
	} catch (error) {
		errorMessage.value = "Unable to post right now. Please try again.";
		console.error(error);
	} finally {
		submitting.value = false;
	}
}

function canDeleteQuestion(question: Question) {
	if (isAdmin.value) return true;
	return question.author === currentAccount.value?._id && question.authorModel === "User";
}

async function deleteQuestion(questionId: string) {
	moderationMessage.value = "";
	deletingId.value = questionId;
	try {
		await $fetch(apiUrl(`/questions/${questionId}`), {
			method: "DELETE",
			credentials: "include"
		});
		await refresh();
		moderationMessage.value = "Question removed.";
	} catch (error) {
		moderationMessage.value = "Unable to delete that question.";
		console.error(error);
	} finally {
		deletingId.value = "";
	}
}

async function flagQuestion(questionId: string) {
	moderationMessage.value = "";
	flaggingId.value = questionId;
	try {
		await $fetch(apiUrl(`/questions/${questionId}/flags`), {
			method: "POST",
			credentials: "include",
			body: {
				reason: flagReason.value[questionId] || "low-quality",
				note: flagNote.value[questionId] || ""
			}
		});
		moderationMessage.value = "Flag submitted for review.";
		flagNote.value[questionId] = "";
	} catch (error) {
		moderationMessage.value = "Unable to submit that flag.";
		console.error(error);
	} finally {
		flaggingId.value = "";
	}
}
</script>

<template>
	<div class="topic">
		<header class="topic__header">
			<NuxtLink class="back" to="/consensus">← Back to topics</NuxtLink>
			<div class="topic__header-grid">
				<div>
					<h1>{{ topic?.title || "Topic" }}</h1>
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

		<section class="topic__start">
			<article class="start-card start-card--summary">
				<p class="start-card__eyebrow">Read this first</p>
				<h2>{{ guide.snapshot }}</h2>
				<p>
					If you only read one thing on this page, read the Consensus view first. The rest of the page is here
					to add depth, not to replace the frame.
				</p>
			</article>

			<div class="tab-grid">
				<button
					v-for="tab in tabGuides"
					:key="tab.key"
					class="tab-card"
					:class="{ active: activeTab === tab.key }"
					type="button"
					@click="activeTab = tab.key"
				>
					<span class="tab-card__step">{{ tab.step }}</span>
					<div>
						<h3>{{ tab.title }}</h3>
						<p>{{ tab.body }}</p>
					</div>
				</button>
			</div>
		</section>

		<section v-if="activeTab === 'consensus'" class="topic__panel">
			<div class="info-grid">
				<article class="info-card">
					<h2>Stable core</h2>
					<ul>
						<li v-for="item in guide.stableCore" :key="item">{{ item }}</li>
					</ul>
				</article>
				<article class="info-card">
					<h2>Real open questions</h2>
					<ul>
						<li v-for="item in guide.openQuestions" :key="item">{{ item }}</li>
					</ul>
				</article>
			</div>

			<div class="info-grid">
				<article class="info-card">
					<h2>What people often get wrong</h2>
					<ul>
						<li v-for="item in guide.commonMisreads" :key="item">{{ item }}</li>
					</ul>
				</article>
				<article class="info-card">
					<h2>What would change minds</h2>
					<ul>
						<li v-for="item in guide.whatWouldChangeMinds" :key="item">{{ item }}</li>
					</ul>
				</article>
			</div>

			<article class="info-card">
				<h2>Evidence trail to follow</h2>
				<div class="resource-list">
					<div v-for="resource in guide.evidenceTrail" :key="resource.title" class="resource">
						<h3>{{ resource.title }}</h3>
						<p>{{ resource.note }}</p>
					</div>
				</div>
			</article>

			<details class="deep-dive">
				<summary>Search the literature for this topic</summary>
				<div class="deep-dive__body">
					<EvidenceExplorer :topic-slug="slug" :default-query="topic?.title || guide.slug" />
				</div>
			</details>
		</section>

		<section v-else-if="activeTab === 'gap'" class="topic__panel">
			<article class="info-card info-card--wide">
				<h2>What this view is for</h2>
				<p>
					This view is for the distance between public impression and the evidence base. Use it after the
					consensus summary, not as a substitute for it.
				</p>
			</article>

			<div class="info-grid">
				<article class="info-card">
					<h2>Common misreads</h2>
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

			<CommunitySentimentPanel :topic-slug="slug" />
		</section>

		<section v-else class="topic__panel">
			<div class="community-header">
				<div>
					<h2>Community questions</h2>
					<p class="muted">Best after reading the consensus summary so each thread has a clear frame.</p>
				</div>
				<button class="cta ghost" type="button" @click="showComposer = !showComposer">
					{{ showComposer ? "Hide question form" : "Ask a question" }}
				</button>
			</div>

			<div class="topic__list">
				<div class="topic__list-header">
					<div>
						<h3>Questions in this topic</h3>
						<p class="muted">{{ questions.length }} questions so far.</p>
					</div>
					<div class="topic__search">
						<label class="ask-label" for="question-search">Search questions</label>
						<input
							id="question-search"
							v-model="questionSearch"
							type="text"
							placeholder="Filter by title, author, context, or source"
						/>
					</div>
				</div>

				<p v-if="moderationMessage" class="success">{{ moderationMessage }}</p>
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
						<div v-if="isLoggedIn" class="question-actions">
							<details class="flag-box">
								<summary>Report</summary>
								<div class="flag-box__body">
									<label class="ask-label" :for="`flag-reason-${question._id}`">Reason</label>
									<select :id="`flag-reason-${question._id}`" v-model="flagReason[question._id]">
										<option v-for="reason in flagOptions" :key="reason" :value="reason">
											{{ reason }}
										</option>
									</select>
									<label class="ask-label" :for="`flag-note-${question._id}`">Note</label>
									<textarea
										:id="`flag-note-${question._id}`"
										v-model="flagNote[question._id]"
										rows="2"
										placeholder="Optional context for moderators"
									/>
									<button
										class="mini"
										type="button"
										:disabled="flaggingId === question._id"
										@click="flagQuestion(question._id)"
									>
										{{ flaggingId === question._id ? "Submitting..." : "Submit flag" }}
									</button>
								</div>
							</details>
							<button
								v-if="canDeleteQuestion(question)"
								class="mini danger"
								type="button"
								:disabled="deletingId === question._id"
								@click="deleteQuestion(question._id)"
							>
								{{ deletingId === question._id ? "Deleting..." : "Delete" }}
							</button>
						</div>
					</article>
				</div>
			</div>

			<section v-if="showComposer" class="topic__post">
				<h3>Post a question</h3>
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
					{{ submitting ? "Posting..." : "Post question" }}
				</button>
			</section>
		</section>
	</div>
</template>

<style scoped>
.topic {
	display: grid;
	gap: 24px;
}

.topic__header-grid,
.topic__start,
.info-grid,
.question-grid {
	display: grid;
	gap: 16px;
}

.topic__header-grid {
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.topic__header h1,
.start-card h2,
.tab-card h3,
.community-header h2,
.info-card h2,
.question-card h3,
.resource h3 {
	font-family: "Fraunces", serif;
}

.topic__header h1 {
	font-size: clamp(2.5rem, 4.5vw, 3.8rem);
	margin: 8px 0 10px;
}

.topic__header p,
.muted,
.start-card p,
.tab-card p,
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
.start-card,
.tab-card,
.topic__post,
.topic__list,
.info-card,
.question-card,
.deep-dive {
	background: #fff;
	border-radius: 20px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.topic__start,
.info-grid {
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.start-card__eyebrow,
.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
	color: var(--consensus-muted);
}

.tab-grid {
	display: grid;
	gap: 12px;
}

.tab-card {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 12px;
	text-align: left;
	cursor: pointer;
	font: inherit;
	background: rgba(255, 255, 255, 0.92);
}

.tab-card.active {
	border-color: rgba(211, 107, 56, 0.32);
	box-shadow: 0 18px 36px rgba(211, 107, 56, 0.16);
}

.tab-card__step {
	width: 34px;
	height: 34px;
	border-radius: 50%;
	display: inline-grid;
	place-items: center;
	background: rgba(211, 107, 56, 0.14);
	color: var(--consensus-ember);
	font-weight: 700;
}

.tab-card h3,
.community-header h2,
.topic__list h3 {
	margin: 0 0 4px;
}

.topic__panel {
	display: grid;
	gap: 16px;
}

.info-card ul {
	margin: 12px 0 0;
	padding-left: 18px;
	display: grid;
	gap: 8px;
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

.deep-dive summary,
.flag-box summary {
	cursor: pointer;
	font-weight: 700;
}

.deep-dive summary::-webkit-details-marker,
.flag-box summary::-webkit-details-marker {
	display: none;
}

.deep-dive__body {
	margin-top: 16px;
}

.community-header,
.topic__list-header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.topic__list,
.topic__post {
	display: grid;
	gap: 12px;
}

.topic__search {
	display: grid;
	gap: 8px;
	min-width: min(100%, 320px);
}

.topic__search input,
.topic__post input,
.topic__post textarea,
.flag-box__body textarea,
.flag-box__body select {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
	font-size: 0.95rem;
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

.question-meta,
.question-actions {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	flex-wrap: wrap;
}

.question-meta {
	font-size: 0.82rem;
	color: var(--consensus-muted);
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

.flag-box {
	width: 100%;
}

.flag-box__body {
	display: grid;
	gap: 8px;
	margin-top: 10px;
}

.starter-row {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.starter-chip,
.mini,
.cta {
	font: inherit;
}

.starter-chip {
	border-radius: 999px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 10px 14px;
	background: var(--consensus-mist);
	cursor: pointer;
}

.mini,
.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	cursor: pointer;
}

.mini {
	padding: 8px 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	background: #fff;
	font-size: 0.85rem;
	font-weight: 600;
	width: fit-content;
}

.mini.danger {
	border-color: rgba(184, 61, 46, 0.35);
}

.cta {
	padding: 12px 22px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	font-size: 0.95rem;
	font-weight: 600;
	text-decoration: none;
	width: fit-content;
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

.info-card--wide {
	max-width: 760px;
}

.error,
.resource p {
	margin: 0;
}

.error {
	color: #b33a1b;
}

.success {
	color: #2f6b4e;
	font-weight: 600;
	margin: 0;
}
</style>
