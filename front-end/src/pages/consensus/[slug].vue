<script setup lang="ts">
import type { Question, QuestionsResponse, SingleTopicResponse } from "~/types/board";
import { nextTick } from "vue";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";
import CommunitySentimentPanel from "~/components/CommunitySentimentPanel.vue";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import EvidenceExplorer from "~/components/EvidenceExplorer.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { getTopicGuide } from "~/data/topicGuides";

const route = useRoute();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { isLoggedIn, currentAccount, role } = useAuth();

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
const formattedUpdated = computed(() => {
	if (!topic.value?.updatedAt) return "Review date not available yet";
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(topic.value.updatedAt));
});
const provenanceLabel = computed(() =>
	topic.value?.updatedAt
		? "Editorial summary with tracked evidence routes"
		: "Seeded topic summary awaiting first dated review"
);
const trustFacts = computed(() => [
	{ label: "Consensus level", value: guide.value.consensusLabel },
	{ label: "Last updated", value: formattedUpdated.value },
	{ label: "Evidence routes listed", value: String(guide.value.evidenceTrail.length) },
	{ label: "Open questions tracked", value: String(guide.value.openQuestions.length) },
	{ label: "Community threads", value: String(questions.value.length) }
]);
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

useHead(() => ({
	title: topic.value ? `${topic.value.title} - Is There Consensus?` : "Topic - Is There Consensus?"
}));

watch(
	() => [highlightId.value, questions.value.length],
	async ([value]) => {
		const id = typeof value === "string" ? value : "";
		if (!id || !import.meta.client) return;
		await nextTick();
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
	},
	{ immediate: true }
);

function chooseStarter(prompt: string) {
	questionText.value = prompt;
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
		await navigateTo({
			path: `/consensus/${slug.value}`,
			query: { highlight: response.question._id }
		});
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
	<div class="topic-page">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Browse topics', to: '/consensus' },
				{ label: topic?.title || 'Topic' }
			]"
		/>

		<header class="topic-page__header">
			<div>
				<p class="eyebrow">Topic</p>
				<h1>{{ topic?.title || "Topic" }}</h1>
				<p class="topic-page__description">{{ topic?.description || guide.snapshot }}</p>
			</div>
			<div class="trust-grid">
				<article v-for="fact in trustFacts" :key="fact.label" class="trust-card">
					<span>{{ fact.label }}</span>
					<strong>{{ fact.value }}</strong>
				</article>
			</div>
		</header>

		<section class="bottom-line">
			<div class="bottom-line__copy">
				<p class="eyebrow">The bottom line</p>
				<h2>{{ guide.snapshot }}</h2>
				<p>
					Start here. The rest of the page adds context, uncertainty, and community discussion, but this is
					the part you should read first.
				</p>
			</div>
			<div class="bottom-line__meter">
				<ConsensusMeter
					:level="guide.consensusScore"
					:label="guide.consensusLabel"
					:caption="guide.consensusLabel"
				/>
			</div>
		</section>

		<section class="provenance-panel">
			<div>
				<p class="eyebrow">Why trust this page</p>
				<h2>Provenance and maintenance</h2>
			</div>
			<p>
				{{ provenanceLabel }}. The public sentiment and community lanes stay below on purpose so they do not
				compete with the summary.
			</p>
		</section>

		<section class="core-section">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Stable core</p>
					<h2>The evidence, in plain language</h2>
				</div>
				<p>These are the parts of the topic that look stable enough to anchor the page.</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in guide.stableCore" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="disclosure-stack">
			<details class="disclosure">
				<summary>What scientists are still debating</summary>
				<ul class="plain-list plain-list--nested">
					<li v-for="item in guide.openQuestions" :key="item">{{ item }}</li>
				</ul>
			</details>

			<details class="disclosure">
				<summary>What would actually change minds</summary>
				<ul class="plain-list plain-list--nested">
					<li v-for="item in guide.whatWouldChangeMinds" :key="item">{{ item }}</li>
				</ul>
			</details>

			<details class="disclosure">
				<summary>Common public misunderstandings</summary>
				<ul class="plain-list plain-list--nested">
					<li v-for="item in guide.commonMisreads" :key="item">{{ item }}</li>
				</ul>
			</details>

			<details class="disclosure">
				<summary>Where to read next</summary>
				<div class="resource-list">
					<article v-for="resource in guide.evidenceTrail" :key="resource.title" class="resource-row">
						<h3>{{ resource.title }}</h3>
						<p>{{ resource.note }}</p>
					</article>
				</div>
			</details>

			<details class="disclosure">
				<summary>Search the literature</summary>
				<div class="disclosure__body">
					<EvidenceExplorer :topic-slug="slug" :default-query="topic?.title || guide.slug" />
				</div>
			</details>
		</section>

		<section class="lane lane--sentiment">
			<div class="section-heading section-heading--stacked">
				<div>
					<p class="eyebrow">Public sentiment</p>
					<h2>How public impression compares</h2>
				</div>
				<p>This lane stays separate from expert consensus on purpose.</p>
			</div>
			<CommunitySentimentPanel :topic-slug="slug" />
		</section>

		<section class="lane lane--community">
			<div class="section-heading section-heading--stacked">
				<div>
					<p class="eyebrow">Community questions</p>
					<h2>Threads under this topic</h2>
				</div>
				<p>Use the discussion lane after reading the bottom line so each thread has the right frame.</p>
			</div>

			<div class="community-toolbar">
				<div class="community-toolbar__search">
					<label class="field-label" for="question-search">Search community threads</label>
					<input
						id="question-search"
						v-model="questionSearch"
						type="text"
						placeholder="Filter by title, author, context, or source"
					/>
				</div>
				<button class="button button--ghost" type="button" @click="showComposer = !showComposer">
					{{ showComposer ? "Hide question form" : "Ask a question" }}
				</button>
			</div>

			<section v-if="showComposer" class="composer">
				<div class="composer__intro">
					<h3>Post a question under this topic</h3>
					<p>
						Keep the question focused. The clearest version of the question is usually the best one to post.
					</p>
				</div>

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
					hint="Only logged-in members can add questions to the board."
				/>
				<p v-else class="muted">Signed in as {{ currentAccount?.name }}</p>

				<label class="field-label" for="topic-question">Question</label>
				<input
					id="topic-question"
					v-model="questionText"
					type="text"
					placeholder="Ask a clear, focused question"
				/>

				<label class="field-label" for="topic-details">Context or quoted claim</label>
				<textarea
					id="topic-details"
					v-model="questionDetails"
					rows="4"
					placeholder="Add context, quote the source, or explain what confused you"
				/>

				<label class="field-label" for="topic-source">Source URL</label>
				<input id="topic-source" v-model="questionSourceUrl" type="url" placeholder="Optional source URL" />

				<div v-if="isLoggedIn" class="captcha-wrap">
					<CaptchaWidget ref="captchaRef" v-model="captchaToken" />
				</div>

				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
				<button
					class="button button--primary"
					type="button"
					:disabled="submitting || !isLoggedIn"
					@click="postQuestion"
				>
					{{ submitting ? "Posting..." : "Post question" }}
				</button>
			</section>

			<p v-if="moderationMessage" class="success">{{ moderationMessage }}</p>
			<div v-if="!filteredQuestions.length" class="empty-state">No community threads yet for this topic.</div>
			<div v-else class="question-list">
				<article
					v-for="question in filteredQuestions"
					:id="question._id"
					:key="question._id"
					class="question-row"
					:class="{ 'question-row--highlight': question._id === highlightId }"
				>
					<div class="question-row__main">
						<div class="question-row__meta">
							<span>{{ new Date(question.createdAt || "").toLocaleDateString() }}</span>
							<span>{{ question.status || "open" }}</span>
							<span v-if="question.authorName || question.displayName"
								>By {{ question.authorName || question.displayName }}</span
							>
						</div>
						<h3>{{ question.title }}</h3>
						<p v-if="question.body">{{ question.body }}</p>
						<a v-if="question.sourceUrl" :href="question.sourceUrl" target="_blank" rel="noreferrer"
							>Open source</a
						>
					</div>

					<div v-if="isLoggedIn" class="question-row__actions">
						<details class="flag-box">
							<summary>Report</summary>
							<div class="flag-box__body">
								<label class="field-label" :for="`flag-reason-${question._id}`">Reason</label>
								<select :id="`flag-reason-${question._id}`" v-model="flagReason[question._id]">
									<option v-for="reason in flagOptions" :key="reason" :value="reason">
										{{ reason }}
									</option>
								</select>
								<label class="field-label" :for="`flag-note-${question._id}`">Note</label>
								<textarea
									:id="`flag-note-${question._id}`"
									v-model="flagNote[question._id]"
									rows="2"
									placeholder="Optional context for moderators"
								/>
								<button
									class="mini-button"
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
							class="mini-button mini-button--danger"
							type="button"
							:disabled="deletingId === question._id"
							@click="deleteQuestion(question._id)"
						>
							{{ deletingId === question._id ? "Deleting..." : "Delete" }}
						</button>
					</div>
				</article>
			</div>
		</section>
	</div>
</template>

<style scoped>
.topic-page {
	display: grid;
	gap: 24px;
}

.topic-page__header,
.bottom-line,
.provenance-panel,
.core-section,
.disclosure,
.lane,
.community-toolbar,
.composer,
.question-row,
.trust-card {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.topic-page__header {
	padding: 22px;
	display: grid;
	gap: 18px;
}

.topic-page__header h1,
.bottom-line h2,
.provenance-panel h2,
.core-section h2,
.lane h2,
.disclosure summary,
.resource-row h3,
.composer h3,
.question-row h3 {
	font-family: "Fraunces", serif;
}

.topic-page__header h1 {
	font-size: clamp(2.5rem, 5vw, 4.2rem);
	line-height: 1;
	margin: 8px 0 10px;
}

.topic-page__description,
.bottom-line p,
.provenance-panel p,
.section-heading p,
.plain-list,
.resource-row p,
.muted,
.empty-state,
.question-row p,
.question-row a,
.flag-box summary,
.field-label,
.trust-card span,
.question-row__meta,
.success,
.error {
	color: var(--consensus-muted);
}

.trust-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(4, minmax(0, 1fr));
}

.trust-card {
	padding: 14px 16px;
	display: grid;
	gap: 6px;
}

.trust-card span,
.field-label,
.question-row__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.trust-card strong {
	font-size: 1rem;
	color: var(--consensus-ink);
}

.bottom-line {
	padding: 24px;
	display: grid;
	gap: 24px;
	grid-template-columns: minmax(0, 1.2fr) minmax(240px, 320px);
	align-items: start;
}

.bottom-line__copy h2,
.provenance-panel h2,
.core-section h2,
.lane h2,
.composer h3 {
	margin: 8px 0 10px;
}

.bottom-line__copy p,
.provenance-panel p,
.section-heading p,
.resource-row p,
.composer__intro p,
.question-row p {
	line-height: 1.7;
	margin: 0;
}

.bottom-line__meter {
	display: grid;
	align-content: center;
}

.core-section,
.lane,
.composer {
	padding: 22px;
	display: grid;
	gap: 16px;
}

.provenance-panel {
	padding: 20px 22px;
	display: grid;
	gap: 8px;
	background: rgba(255, 255, 255, 0.72);
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading--stacked {
	align-items: start;
}

.section-heading--stacked p {
	max-width: 44rem;
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 10px;
	line-height: 1.65;
}

.plain-list--nested {
	margin-top: 14px;
}

.disclosure-stack {
	display: grid;
	gap: 14px;
}

.disclosure {
	padding: 18px 20px;
}

.disclosure summary {
	cursor: pointer;
	font-size: 1.15rem;
}

.disclosure__body {
	margin-top: 16px;
}

.resource-list {
	margin-top: 16px;
	display: grid;
	gap: 12px;
}

.resource-row {
	padding: 14px 16px;
	border-radius: 18px;
	background: var(--consensus-mist);
}

.resource-row h3 {
	margin: 0 0 4px;
}

.lane--sentiment {
	background: rgba(255, 255, 255, 0.78);
}

.community-toolbar {
	padding: 16px 18px;
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.community-toolbar__search {
	display: grid;
	gap: 8px;
	flex: 1;
	min-width: min(100%, 340px);
}

.community-toolbar__search input,
.composer input,
.composer textarea,
.flag-box__body textarea,
.flag-box__body select {
	padding: 13px 15px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: #fff;
}

.composer__intro {
	display: grid;
	gap: 4px;
}

.starter-row {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.starter-chip,
.button,
.mini-button {
	font: inherit;
}

.starter-chip {
	padding: 10px 14px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-mist);
	cursor: pointer;
}

.button,
.mini-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	cursor: pointer;
	text-decoration: none;
	font-weight: 600;
}

.button {
	padding: 12px 20px;
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

.question-list {
	display: grid;
	gap: 14px;
}

.question-row {
	padding: 18px;
	display: grid;
	gap: 14px;
	grid-template-columns: minmax(0, 1fr) minmax(180px, 220px);
}

.question-row--highlight {
	border-color: rgba(211, 107, 56, 0.32);
	background: rgba(255, 250, 244, 0.95);
}

.question-row__main {
	display: grid;
	gap: 8px;
}

.question-row__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.question-row h3 {
	margin: 0;
}

.question-row a {
	font-weight: 600;
	text-decoration: none;
}

.question-row__actions {
	display: grid;
	gap: 10px;
	align-content: start;
}

.flag-box__body {
	margin-top: 10px;
	display: grid;
	gap: 8px;
}

.mini-button {
	padding: 9px 14px;
	border: 1px solid var(--consensus-line);
	background: transparent;
	width: fit-content;
}

.mini-button--danger {
	border-color: rgba(184, 61, 46, 0.35);
}

.success,
.error {
	margin: 0;
	font-weight: 600;
}

.error {
	color: #b83d2e;
}

.success {
	color: #2f6b4e;
}

@media (max-width: 980px) {
	.trust-grid,
	.bottom-line,
	.question-row {
		grid-template-columns: 1fr;
	}
}
</style>
