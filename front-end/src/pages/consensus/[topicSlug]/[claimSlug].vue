<script setup lang="ts">
import type { Claim, ClaimResponse, Question, QuestionResponse, QuestionsResponse } from "~/types/board";
import { nextTick } from "vue";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

interface ClaimRouteParams {
	topicSlug?: string | string[];
	claimSlug?: string | string[];
}

const route = useRoute();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { isLoggedIn, currentAccount, role } = useAuth();

const captchaRequired = computed(() => !!config.public.captchaSiteKey);
const topicSlug = computed(() => {
	const value = (route.params as ClaimRouteParams).topicSlug;
	return Array.isArray(value) ? value[0] : String(value ?? "");
});
const claimSlug = computed(() => {
	const value = (route.params as ClaimRouteParams).claimSlug;
	return Array.isArray(value) ? value[0] : String(value ?? "");
});
const highlightId = computed(() => (typeof route.query.highlight === "string" ? route.query.highlight : ""));

const { data: claimData } = await useAsyncData(`claim-${topicSlug.value}-${claimSlug.value}`, () =>
	$fetch<ClaimResponse>(apiUrl(`/topics/${topicSlug.value}/claims/${claimSlug.value}`))
);
const { data: questionsData, refresh } = await useAsyncData(
	`claim-questions-${topicSlug.value}-${claimSlug.value}`,
	() => $fetch<QuestionsResponse>(apiUrl(`/questions?topic=${topicSlug.value}&claim=${claimSlug.value}&limit=100`))
);

const questionTitle = ref("");
const questionBody = ref("");
const questionSourceUrl = ref("");
const questionSearch = ref("");
const showComposer = ref(false);
const submitting = ref(false);
const errorMessage = ref("");
const moderationMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);
const flaggingId = ref("");
const deletingId = ref("");
const flagReason = ref<Record<string, string>>({});
const flagNote = ref<Record<string, string>>({});

const claim = computed<Claim | undefined>(() => claimData.value?.claim);
const questions = computed<Question[]>(() => questionsData.value?.questions ?? []);
const isAdmin = computed(() => role.value === "admin");
const canEditClaim = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
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

const trustFacts = computed(() => [
	{ label: "Consensus", value: formatBandLabel(claim.value?.consensusBand) },
	{ label: "Confidence score", value: `${claim.value?.confidenceScore ?? 0}/100` },
	{ label: "Sources listed", value: String(claim.value?.sources?.length ?? claim.value?.sourceCount ?? 0) },
	{ label: "Published", value: formatDate(claim.value?.publishedAt, "Publish date pending") },
	{ label: "Last reviewed", value: formatDate(claim.value?.lastReviewedAt, "Review date pending") },
	{ label: "Next review", value: formatDate(claim.value?.nextReviewAt, "Not scheduled") }
]);

useHead(() => ({
	title: claim.value ? `${claim.value.title} - Is There Consensus?` : "Claim - Is There Consensus?"
}));

watch(
	() => [highlightId.value, questions.value.length],
	async ([value]) => {
		if (!value || !import.meta.client) return;
		await nextTick();
		document.getElementById(String(value))?.scrollIntoView({ behavior: "smooth", block: "center" });
	},
	{ immediate: true }
);

function formatBandLabel(band?: Claim["consensusBand"]) {
	if (band === "strong") return "Strong consensus";
	if (band === "broad") return "Broad consensus";
	if (band === "mixed") return "Mixed evidence";
	return "Unclear or still forming";
}

function formatDate(value?: string, fallback = "Not available yet") {
	if (!value) return fallback;
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
}

function canDeleteQuestion(question: Question) {
	if (isAdmin.value) return true;
	return question.author === currentAccount.value?._id && question.authorModel === "User";
}

async function postQuestion() {
	errorMessage.value = "";
	if (!isLoggedIn.value) {
		errorMessage.value = "Please sign in before posting.";
		return;
	}
	if (!questionTitle.value.trim()) {
		errorMessage.value = "Please add a focused question before posting.";
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
				topic: topicSlug.value,
				claim: claimSlug.value,
				title: questionTitle.value.trim(),
				body: questionBody.value.trim(),
				sourceUrl: questionSourceUrl.value.trim(),
				captchaToken: captchaToken.value
			}
		});

		questionTitle.value = "";
		questionBody.value = "";
		questionSourceUrl.value = "";
		showComposer.value = false;
		captchaRef.value?.reset();
		captchaToken.value = "";
		await refresh();
		await navigateTo({
			path: `/consensus/${topicSlug.value}/${claimSlug.value}`,
			query: { highlight: response.question._id }
		});
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to post right now. Please try again.";
	} finally {
		submitting.value = false;
	}
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
		console.error(error);
		moderationMessage.value = "Unable to delete that question.";
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
		flagNote.value[questionId] = "";
		moderationMessage.value = "Flag submitted for review.";
	} catch (error) {
		console.error(error);
		moderationMessage.value = "Unable to submit that flag.";
	} finally {
		flaggingId.value = "";
	}
}
</script>

<template>
	<div class="claim-page">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Browse topics', to: '/consensus' },
				{ label: claim?.topic?.title || 'Topic', to: `/consensus/${topicSlug}` },
				{ label: claim?.title || 'Claim' }
			]"
		/>

		<header class="claim-page__header">
			<div>
				<p class="eyebrow">Canonical claim review</p>
				<h1>{{ claim?.title || "Claim review" }}</h1>
				<p class="claim-page__description">
					{{ claim?.editorSummary || "This page is the editorial summary for the claim." }}
				</p>
			</div>
			<div class="trust-grid">
				<article v-for="fact in trustFacts" :key="fact.label" class="trust-card">
					<span>{{ fact.label }}</span>
					<strong>{{ fact.value }}</strong>
				</article>
			</div>
		</header>

		<section class="bottom-line">
			<div>
				<p class="eyebrow">The bottom line</p>
				<h2>{{ claim?.bottomLine }}</h2>
				<p>
					Read this first. Everything else on the page expands the evidence, the remaining uncertainty, and
					the practical limits of the current consensus.
				</p>
			</div>
			<div class="bottom-line__actions">
				<NuxtLink class="button button--ghost" :to="`/consensus/${topicSlug}`">Back to topic hub</NuxtLink>
				<NuxtLink
					v-if="canEditClaim && claim?._id"
					class="button button--ghost"
					:to="`/account/editorial/claims/${claim._id}`"
				>
					Edit claim
				</NuxtLink>
			</div>
		</section>

		<section class="reading-guide">
			<div>
				<p class="eyebrow">Why this page is structured this way</p>
				<h2>Editorial answer first. Evidence stack second. Community threads last.</h2>
				<p>
					This page keeps the reviewed summary, dates, and source counts above the fold. Community threads
					below can raise questions, but they do not vote the claim into or out of consensus.
				</p>
			</div>
			<div class="reading-guide__actions">
				<NuxtLink class="button button--ghost" to="/standards">Editorial standards</NuxtLink>
				<NuxtLink class="button button--ghost" to="/explainers">Evergreen explainers</NuxtLink>
			</div>
		</section>

		<section class="content-stack">
			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Stable core</p>
						<h2>What looks settled right now</h2>
					</div>
				</div>
				<ul class="plain-list">
					<li v-for="item in claim?.stableCore || []" :key="item">{{ item }}</li>
				</ul>
			</section>

			<details class="content-panel disclosure" open>
				<summary>Open questions and live uncertainty</summary>
				<ul class="plain-list">
					<li v-for="item in claim?.openQuestions || []" :key="item">{{ item }}</li>
				</ul>
			</details>

			<details class="content-panel disclosure">
				<summary>What would change minds</summary>
				<ul class="plain-list">
					<li v-for="item in claim?.whatWouldChangeMinds || []" :key="item">{{ item }}</li>
				</ul>
			</details>

			<details class="content-panel disclosure">
				<summary>Why public confusion sticks</summary>
				<ul class="plain-list">
					<li v-for="item in claim?.misconceptions || []" :key="item">{{ item }}</li>
				</ul>
			</details>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Evidence trail</p>
						<h2>Sources attached to this claim review</h2>
					</div>
					<p>
						These sources sit under the editorial summary, not beside it, so the reading order stays clear.
					</p>
				</div>

				<div v-if="!claim?.sources?.length" class="empty-state">No sources are attached yet.</div>
				<div v-else class="source-list">
					<article v-for="source in claim.sources" :key="source._id || source.title" class="source-row">
						<div>
							<p class="source-row__meta">
								<span>{{ source.kind.replaceAll("_", " ") }}</span>
								<span>{{ source.publisher || "Source" }}</span>
								<span v-if="source.year">{{ source.year }}</span>
							</p>
							<h3>{{ source.title }}</h3>
							<p>{{ source.note }}</p>
						</div>
						<a
							v-if="source.url"
							class="button button--ghost"
							:href="source.url"
							target="_blank"
							rel="noreferrer"
						>
							Open source
						</a>
					</article>
				</div>
			</section>
		</section>

		<section class="lane lane--community">
			<div class="section-heading section-heading--stacked">
				<div>
					<p class="eyebrow">Claim-specific community threads</p>
					<h2>Questions filed under this claim</h2>
				</div>
				<p>These threads stay below the canonical review so they do not compete with the editorial answer.</p>
			</div>

			<div class="community-toolbar">
				<div class="community-toolbar__search">
					<label class="field-label" for="claim-question-search">Search community threads</label>
					<input
						id="claim-question-search"
						v-model="questionSearch"
						type="text"
						placeholder="Filter by title, author, source, or context"
					/>
				</div>
				<button class="button button--ghost" type="button" @click="showComposer = !showComposer">
					{{ showComposer ? "Hide question form" : "Ask under this claim" }}
				</button>
			</div>

			<section v-if="showComposer" class="composer">
				<div class="composer__intro">
					<h3>Ask a focused follow-up</h3>
					<p>
						Keep this tied to the claim review above. Broad topic questions belong on the topic hub instead.
					</p>
				</div>

				<AuthPanel
					v-if="!isLoggedIn"
					title="Sign in to post"
					hint="Only logged-in members can add claim-specific community threads."
				/>
				<p v-else class="muted">Signed in as {{ currentAccount?.name }}</p>

				<label class="field-label" for="claim-question-title">Question</label>
				<textarea
					id="claim-question-title"
					v-model="questionTitle"
					rows="3"
					placeholder="What part of the claim still feels unclear?"
				/>

				<label class="field-label" for="claim-question-body">Context or quoted source</label>
				<textarea
					id="claim-question-body"
					v-model="questionBody"
					rows="4"
					placeholder="Optional. Paste the quote, headline, or specific detail you want checked."
				/>

				<label class="field-label" for="claim-question-source">Source URL</label>
				<input
					id="claim-question-source"
					v-model="questionSourceUrl"
					type="url"
					placeholder="Optional source URL"
				/>

				<div v-if="isLoggedIn" class="captcha-wrap">
					<CaptchaWidget ref="captchaRef" v-model="captchaToken" />
				</div>

				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
				<div class="posting-form__actions">
					<button
						class="button button--primary"
						type="button"
						:disabled="submitting || !isLoggedIn"
						@click="postQuestion"
					>
						{{ submitting ? "Posting..." : "Post under this claim" }}
					</button>
				</div>
			</section>

			<p v-if="moderationMessage" class="muted">{{ moderationMessage }}</p>

			<div v-if="!filteredQuestions.length" class="empty-state">
				No community threads are attached to this claim yet.
			</div>
			<div v-else class="question-list">
				<article
					v-for="question in filteredQuestions"
					:id="question._id"
					:key="question._id"
					class="question-card"
					:class="{ 'question-card--highlighted': highlightId === question._id }"
				>
					<div class="question-card__meta">
						<span>{{ question.authorName || question.displayName || "Community member" }}</span>
						<span>{{ formatDate(question.createdAt) }}</span>
					</div>
					<h3>{{ question.title }}</h3>
					<p v-if="question.body">{{ question.body }}</p>
					<a
						v-if="question.sourceUrl"
						class="question-card__source"
						:href="question.sourceUrl"
						target="_blank"
						rel="noreferrer"
					>
						{{ question.sourceUrl }}
					</a>

					<div class="question-card__actions">
						<select v-model="flagReason[question._id]" class="flag-select">
							<option value="low-quality">Low quality</option>
							<option value="off-topic">Off topic</option>
							<option value="duplicate">Duplicate</option>
							<option value="misleading">Misleading</option>
							<option value="needs-sources">Needs sources</option>
							<option value="abusive">Abusive</option>
						</select>
						<input
							v-model="flagNote[question._id]"
							type="text"
							class="flag-note"
							placeholder="Optional moderation note"
						/>
						<button
							class="button button--ghost"
							type="button"
							:disabled="flaggingId === question._id"
							@click="flagQuestion(question._id)"
						>
							{{ flaggingId === question._id ? "Submitting..." : "Flag" }}
						</button>
						<button
							v-if="canDeleteQuestion(question)"
							class="button button--ghost button--danger"
							type="button"
							:disabled="deletingId === question._id"
							@click="deleteQuestion(question._id)"
						>
							{{ deletingId === question._id ? "Removing..." : "Delete" }}
						</button>
					</div>
				</article>
			</div>
		</section>
	</div>
</template>

<style scoped>
.claim-page {
	display: grid;
	gap: 24px;
}

.claim-page__header,
.trust-card,
.bottom-line,
.reading-guide,
.content-panel,
.lane,
.question-card,
.composer {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.claim-page__header,
.bottom-line,
.reading-guide,
.content-panel,
.lane,
.composer {
	padding: 22px;
}

.claim-page__header,
.bottom-line,
.reading-guide {
	display: grid;
	gap: 18px;
}

.claim-page__header h1,
.bottom-line h2,
.reading-guide h2,
.section-heading h2,
.source-row h3,
.question-card h3,
.composer h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.claim-page__header h1 {
	margin-top: 8px;
	font-size: clamp(2.6rem, 5vw, 4.25rem);
	line-height: 0.98;
}

.claim-page__description,
.bottom-line p,
.reading-guide p,
.section-heading p,
.plain-list,
.source-row p,
.empty-state,
.muted,
.field-label,
.question-card p,
.question-card__source,
.composer p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.trust-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.trust-card {
	padding: 16px 18px;
	display: grid;
	gap: 6px;
}

.trust-card span,
.field-label,
.question-card__meta,
.source-row__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.trust-card strong {
	font-size: 1rem;
	color: var(--consensus-ink);
}

.bottom-line {
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.reading-guide {
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.bottom-line__actions,
.reading-guide__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	justify-content: end;
}

.content-stack {
	display: grid;
	gap: 16px;
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

.section-heading p,
.section-heading h2 {
	margin: 0;
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.disclosure summary {
	cursor: pointer;
	font-family: "Fraunces", serif;
	font-size: 1.05rem;
}

.disclosure ul {
	margin-top: 14px;
}

.source-list,
.question-list {
	display: grid;
	gap: 12px;
}

.source-row,
.question-card {
	display: grid;
	gap: 10px;
}

.source-row {
	padding: 16px;
	border-radius: 18px;
	border: 1px solid var(--consensus-soft-line);
}

.source-row__meta,
.question-card__meta {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.lane {
	display: grid;
	gap: 16px;
}

.community-toolbar {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.community-toolbar__search {
	display: grid;
	gap: 8px;
	min-width: min(100%, 420px);
}

.community-toolbar input,
.composer textarea,
.composer input,
.flag-select,
.flag-note {
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: #fff;
}

.composer {
	display: grid;
	gap: 12px;
}

.question-card {
	padding: 18px;
}

.question-card--highlighted {
	border-color: rgba(211, 107, 56, 0.42);
	box-shadow: 0 0 0 2px rgba(211, 107, 56, 0.12);
}

.question-card__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	align-items: center;
}

.flag-select {
	min-width: 150px;
}

.flag-note {
	flex: 1;
	min-width: 220px;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 11px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	background: transparent;
	color: var(--consensus-ink);
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: #fff;
}

.button--danger {
	border-color: rgba(184, 61, 46, 0.3);
}

@media (max-width: 820px) {
	.bottom-line,
	.reading-guide {
		grid-template-columns: 1fr;
	}

	.bottom-line__actions,
	.reading-guide__actions {
		justify-content: start;
	}
}
</style>
