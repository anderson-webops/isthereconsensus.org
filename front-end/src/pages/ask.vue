<script setup lang="ts">
import type {
	ClaimSummary,
	QuestionAskKind,
	QuestionClosestMatchType,
	QuestionResponse,
	SuggestionResponse,
	Topic,
	TopicResponse
} from "~/types/board";
import { watchDebounced } from "@vueuse/core";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { formatLandscapeCertaintyLabel, formatLandscapeSupportLabel } from "~/constants/evidenceLandscape";
import { analyzeAskQuery, defaultAskKind, matchExplainers, matchStrengthLabel } from "~/utils/ask-flow";

interface MatchOption {
	label: string;
	path?: string;
	type: QuestionClosestMatchType;
}

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { currentAccount, isLoggedIn } = useAuth();

const captchaRequired = computed(() => !!config.public.captchaSiteKey);

const question = ref(typeof route.query.question === "string" ? route.query.question : "");
const context = ref("");
const sourceUrl = ref("");
const selectedTopic = ref(typeof route.query.topic === "string" ? route.query.topic : "");
const questionKind = ref<QuestionAskKind>("discussion");
const suggestions = ref<SuggestionResponse>({ claims: [], topics: [], questions: [] });
const loadingSuggestions = ref(false);
const suggestionError = ref("");
const showPostingForm = ref(false);
const submitting = ref(false);
const errorMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);
const postingFormRef = ref<HTMLElement | null>(null);

const { data: topicsData } = await useAsyncData("ask-topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"))
);

const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);
const query = computed(() => question.value.trim());
const searchReady = computed(() => query.value.length >= 3);
const queryAnalysis = computed(() => analyzeAskQuery(query.value));
const explainerSuggestions = computed(() => matchExplainers(query.value).slice(0, 3));
const topClaimMatch = computed(() => suggestions.value.claims[0] ?? null);
const topTopicMatch = computed(() => suggestions.value.topics[0] ?? null);
const showMatchDecision = computed(() => searchReady.value && !loadingSuggestions.value);
const supportLinks = computed(() => {
	const links: Array<{ label: string; path: string }> = [];

	for (const topic of suggestions.value.topics.slice(0, 2)) {
		links.push({
			label: `Topic: ${topic.title}`,
			path: `/consensus/${topic.slug}`
		});
	}

	for (const item of explainerSuggestions.value.slice(0, 2)) {
		links.push({
			label: `Explainer: ${item.title}`,
			path: `/explainers/${item.slug}`
		});
	}

	return links;
});
const closestMatchRecord = computed<MatchOption | null>(() => {
	if (topClaimMatch.value?.topic?.slug) {
		return {
			label: topClaimMatch.value.title,
			path: `/consensus/${topClaimMatch.value.topic.slug}/${topClaimMatch.value.slug}`,
			type: "claim"
		};
	}

	if (topTopicMatch.value) {
		return {
			label: topTopicMatch.value.title,
			path: `/consensus/${topTopicMatch.value.slug}`,
			type: "topic"
		};
	}

	if (explainerSuggestions.value[0]) {
		return {
			label: explainerSuggestions.value[0].title,
			path: `/explainers/${explainerSuggestions.value[0].slug}`,
			type: "explainer"
		};
	}

	return null;
});

useStaticPageMeta({
	description:
		"Ask a concise scientific question, see the closest reviewed claim when one exists, and add context for editorial review.",
	path: "/ask",
	title: "Ask a question - Is There Consensus?"
});

function resetSuggestions() {
	suggestions.value = { claims: [], topics: [], questions: [] };
	suggestionError.value = "";
}

function formatBandLabel(band?: ClaimSummary["consensusBand"]) {
	if (band === "strong") return "Strong consensus";
	if (band === "broad") return "Broad consensus";
	if (band === "mixed") return "Mixed evidence";
	return "Unclear or still forming";
}

function claimSupportLabel(claim: ClaimSummary) {
	return claim.evidenceLandscape?.supportLabel
		? formatLandscapeSupportLabel(claim.evidenceLandscape.supportLabel)
		: formatBandLabel(claim.consensusBand);
}

function claimCertaintyLabel(claim: ClaimSummary) {
	return claim.evidenceLandscape?.evidenceCertainty
		? formatLandscapeCertaintyLabel(claim.evidenceLandscape.evidenceCertainty)
		: "";
}

function claimCardSummary(claim: ClaimSummary) {
	return claim.evidenceLandscape?.oneSentenceSummary || claim.bottomLine;
}

function openSuggestion(path: string) {
	router.push(path);
}

async function revealPostingForm() {
	showPostingForm.value = true;
	errorMessage.value = "";
	await nextTick();
	postingFormRef.value?.scrollIntoView({ behavior: "smooth", block: "start" });
}

watch(
	() => query.value,
	(value, previous) => {
		questionKind.value = defaultAskKind(queryAnalysis.value);
		if (previous !== undefined && value !== previous) showPostingForm.value = false;
	},
	{ immediate: true }
);

watch(
	() => [topics.value.length, selectedTopic.value, topClaimMatch.value?._id, topTopicMatch.value?._id],
	() => {
		if (!topics.value.length) return;
		if (topics.value.some((topic) => topic.slug === selectedTopic.value)) return;
		selectedTopic.value = topClaimMatch.value?.topic?.slug || topTopicMatch.value?.slug || topics.value[0].slug;
	},
	{ immediate: true }
);

watchDebounced(
	() => query.value,
	async (value) => {
		if (!value || value.length < 3) {
			resetSuggestions();
			return;
		}

		loadingSuggestions.value = true;
		suggestionError.value = "";
		try {
			suggestions.value = await $fetch<SuggestionResponse>(
				apiUrl(`/search/suggestions?q=${encodeURIComponent(value)}`)
			);
		} catch {
			suggestionError.value = "Unable to load suggestions right now.";
			suggestions.value = { claims: [], topics: [], questions: [] };
		} finally {
			loadingSuggestions.value = false;
		}
	},
	{ debounce: 250, maxWait: 600 }
);

async function submitQuestion() {
	errorMessage.value = "";
	if (!isLoggedIn.value) {
		errorMessage.value = "Please sign in before posting.";
		return;
	}
	if (!query.value) {
		errorMessage.value = "Add a question before posting.";
		return;
	}
	if (!selectedTopic.value) {
		errorMessage.value = "Choose the closest topic before posting.";
		return;
	}
	if (captchaRequired.value && !captchaToken.value) {
		errorMessage.value = "Please complete the captcha.";
		return;
	}

	submitting.value = true;
	try {
		await $fetch<QuestionResponse>(apiUrl("/questions"), {
			method: "POST",
			credentials: "include",
			body: {
				topic: selectedTopic.value,
				claim: undefined,
				title: query.value,
				normalizedQuestion: queryAnalysis.value.normalized,
				body: context.value.trim(),
				sourceUrl: sourceUrl.value.trim(),
				sourceContextType: "other",
				askKind: questionKind.value,
				closestMatchType: closestMatchRecord.value?.type || "none",
				closestMatchLabel: closestMatchRecord.value?.label || "",
				differenceNote: "",
				loadedFrame: queryAnalysis.value.looksLoaded,
				multiQuestion: queryAnalysis.value.hasMultipleQuestions,
				captchaToken: captchaToken.value
			}
		});

		captchaRef.value?.reset();
		captchaToken.value = "";

		await router.push({
			path: `/consensus/${selectedTopic.value}`,
			query: { posted: "1" }
		});
	} catch {
		errorMessage.value = "Unable to post right now. Please try again.";
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
			<h1>Search first. Ask what is missing.</h1>
			<p>Find the closest reviewed answer, or send the specific gap for review.</p>
		</header>

		<section class="search-panel">
			<label class="field-label" for="claim-question">What are you looking for?</label>
			<textarea
				id="claim-question"
				v-model="question"
				rows="3"
				placeholder="Does X cause Y? Is X safe? What does this new study show?"
			/>
		</section>

		<section v-if="searchReady" class="results-panel">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Closest reviewed pages</p>
					<h2>Does one of these answer it?</h2>
				</div>
			</div>

			<div v-if="loadingSuggestions" class="empty-state">Checking reviewed pages...</div>
			<div v-else-if="suggestionError" class="empty-state">{{ suggestionError }}</div>
			<div v-else-if="!suggestions.claims.length" class="empty-state">No close reviewed claim found.</div>
			<div v-else class="match-list">
				<article
					v-for="claim in suggestions.claims"
					:key="claim._id"
					class="match-row"
					:class="{ 'match-row--strong': topClaimMatch?._id === claim._id }"
				>
					<div>
						<p class="match-row__meta">
							<span>{{ claim.topic?.title }}</span>
							<span>{{ matchStrengthLabel(claim.matchScore, claim.matchStrength) }}</span>
							<span>{{ claimSupportLabel(claim) }}</span>
							<span v-if="claimCertaintyLabel(claim)">{{ claimCertaintyLabel(claim) }}</span>
						</p>
						<h3>{{ claim.title }}</h3>
						<p class="match-row__summary" :title="claimCardSummary(claim)">
							{{ claimCardSummary(claim) }}
						</p>
						<p v-if="claim.matchReason" class="match-row__reason">{{ claim.matchReason }}</p>
					</div>
					<div class="match-row__actions">
						<button
							class="button button--primary"
							type="button"
							@click="openSuggestion(`/consensus/${claim.topic?.slug}/${claim.slug}`)"
						>
							Open review
						</button>
					</div>
				</article>
			</div>

			<div v-if="supportLinks.length" class="support-links">
				<p class="field-label">Related topics and explainers</p>
				<div class="support-links__list">
					<NuxtLink v-for="link in supportLinks" :key="link.path" class="text-link" :to="link.path">
						{{ link.label }}
					</NuxtLink>
				</div>
			</div>

			<div v-if="showMatchDecision" class="match-decision">
				<p>
					{{
						suggestions.claims.length
							? "None of these answers my question."
							: "This question is not covered yet."
					}}
				</p>
				<button class="button button--primary" type="button" @click="revealPostingForm">
					Ask what is missing
				</button>
			</div>
		</section>

		<section v-if="showPostingForm" ref="postingFormRef" class="posting-form">
			<div class="posting-form__header">
				<div>
					<p class="eyebrow">Submit to the queue</p>
					<h2>Ask what is missing</h2>
				</div>
			</div>
			<p class="posting-form__question">{{ query }}</p>

			<AuthPanel
				v-if="!isLoggedIn"
				title="Sign in to post"
				hint="Only logged-in members can add new community threads."
				variant="inline"
			/>
			<p v-else class="muted">Signed in as {{ currentAccount?.name }}</p>

			<div class="field-stack">
				<label class="field-label" for="post-topic">Closest topic</label>
				<select id="post-topic" v-model="selectedTopic">
					<option v-for="topic in topics" :key="topic._id" :value="topic.slug">
						{{ topic.title }}
					</option>
				</select>
			</div>

			<details class="posting-form__optional">
				<summary>Add context, source, or what differs</summary>
				<div class="posting-form__optional-body">
					<div class="field-stack">
						<label class="field-label" for="post-context">Context, quote, or local detail</label>
						<textarea
							id="post-context"
							v-model="context"
							rows="4"
							placeholder="Optional. Paste the quote, describe what differs from the closest match, or explain the confusion."
						/>
					</div>

					<div class="field-stack">
						<label class="field-label" for="post-source">Source URL</label>
						<input id="post-source" v-model="sourceUrl" type="url" placeholder="Optional source URL" />
					</div>
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
					{{ submitting ? "Posting..." : "Post to the queue" }}
				</button>
			</div>
		</section>
	</div>
</template>

<style scoped>
.ask-page {
	display: grid;
	gap: 22px;
}

.ask-page__header h1,
.section-heading h2,
.match-row h3,
.posting-form h2 {
	font-family: "Fraunces", serif;
}

.ask-page__header h1 {
	margin: 8px 0 10px;
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
}

.ask-page__header p,
.section-heading p,
.match-row p,
.empty-state,
.posting-form__header p,
.posting-form__question,
.match-decision p,
.muted,
.error {
	color: var(--consensus-muted);
	line-height: 1.64;
}

.ask-page__header p,
.section-heading p,
.posting-form__header p {
	max-width: 68ch;
}

.search-panel,
.results-panel,
.posting-form,
.match-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.search-panel,
.results-panel,
.posting-form {
	padding: 20px;
}

.search-panel,
.results-panel,
.posting-form,
.field-stack {
	display: grid;
	gap: 12px;
}

.search-panel textarea,
.posting-form textarea,
.posting-form input,
.posting-form select {
	width: 100%;
	min-height: 48px;
	padding: 14px 16px;
	border-radius: 16px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.field-label,
.match-row__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.match-row__meta {
	display: flex;
	gap: 8px 12px;
	flex-wrap: wrap;
	align-items: center;
}

.section-heading,
.posting-form__header {
	display: grid;
	gap: 6px;
	align-items: start;
}

.match-row__actions,
.posting-form__actions,
.match-decision {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading h2,
.section-heading p,
.posting-form__header h2,
.posting-form__header p,
.match-decision p {
	margin: 0;
}

.match-list {
	display: grid;
	gap: 12px;
}

.match-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: start;
	gap: 14px;
	padding: 18px;
}

.match-row h3,
.posting-form h2 {
	line-height: 1.2;
}

.match-row--strong {
	border-color: rgba(211, 107, 56, 0.42);
	box-shadow: 0 0 0 2px rgba(211, 107, 56, 0.12);
}

.match-row__summary {
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
}

.match-row__actions {
	flex-direction: column;
	align-items: stretch;
	min-width: 148px;
}

.match-row__actions .button {
	width: 100%;
}

.support-links {
	margin-top: 8px;
	display: grid;
	gap: 8px;
}

.support-links__list {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.match-decision {
	align-items: center;
	margin-top: 4px;
	padding-top: 16px;
	border-top: 1px solid var(--consensus-soft-line);
}

.posting-form {
	scroll-margin-top: 18px;
}

.posting-form__question {
	margin: 0;
	padding: 13px 15px;
	border-left: 3px solid var(--consensus-ember);
	background: var(--consensus-field-surface);
	color: var(--consensus-ink);
}

.posting-form__actions {
	justify-content: end;
}

.posting-form__optional {
	display: grid;
	gap: 10px;
	padding: 12px 0 2px;
	border-top: 1px solid var(--consensus-soft-line);
}

.posting-form__optional summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	list-style: none;
	cursor: pointer;
	font-family: "Fraunces", serif;
	font-weight: 600;
	line-height: 1.2;
	color: var(--consensus-ink);
}

.posting-form__optional summary::-webkit-details-marker {
	display: none;
}

.posting-form__optional summary:focus-visible {
	border-radius: 8px;
	outline: 2px solid var(--consensus-debate);
	outline-offset: 4px;
}

.posting-form__optional summary::after {
	width: 18px;
	height: 18px;
	flex: 0 0 18px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	color: var(--consensus-muted);
	font-family: "Space Grotesk", system-ui, sans-serif;
	font-size: 0.82rem;
	line-height: 16px;
	text-align: center;
	content: "+";
}

.posting-form__optional[open] summary::after {
	content: "-";
}

.posting-form__optional-body {
	display: grid;
	gap: 12px;
	padding-top: 10px;
}

.button,
.text-link {
	font-weight: 600;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 11px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	text-decoration: none;
	cursor: pointer;
	background: transparent;
	color: var(--consensus-ink);
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.text-link {
	text-decoration: none;
}

@media (max-width: 720px) {
	.search-panel,
	.results-panel,
	.posting-form {
		padding: 18px;
	}

	.match-row {
		grid-template-columns: 1fr;
	}

	.match-row__actions,
	.posting-form__actions,
	.match-decision {
		width: 100%;
	}

	.match-decision {
		align-items: stretch;
		flex-direction: column;
	}
}
</style>
