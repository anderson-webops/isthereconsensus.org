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
import { analyzeAskQuery, defaultAskKind, matchExplainers, matchStrengthLabel } from "~/utils/ask-flow";

interface MatchOption {
	key: string;
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
const coreQuestion = ref(question.value);
const context = ref("");
const sourceUrl = ref("");
const selectedTopic = ref(typeof route.query.topic === "string" ? route.query.topic : "");
const selectedClaimSlug = ref("");
const questionKind = ref<QuestionAskKind>("discussion");
const manualContinue = ref(false);
const selectedClosestMatch = ref("");
const suggestions = ref<SuggestionResponse>({ claims: [], topics: [], questions: [] });
const loadingSuggestions = ref(false);
const suggestionError = ref("");
const submitting = ref(false);
const errorMessage = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);

const { data: topicsData } = await useAsyncData("ask-topics", () =>
	$fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"))
);

const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);
const query = computed(() => question.value.trim());
const searchReady = computed(() => query.value.length >= 3);
const queryAnalysis = computed(() => analyzeAskQuery(query.value));
const explainerSuggestions = computed(() => matchExplainers(query.value));
const hasAnySuggestions = computed(
	() =>
		suggestions.value.claims.length > 0 ||
		suggestions.value.topics.length > 0 ||
		explainerSuggestions.value.length > 0
);
const showPostingForm = computed(() => manualContinue.value || (searchReady.value && !hasAnySuggestions.value));
const topClaimMatch = computed(() => suggestions.value.claims[0] ?? null);
const topTopicMatch = computed(() => suggestions.value.topics[0] ?? null);
const selectedTopicRecord = computed(() => topics.value.find((topic) => topic.slug === selectedTopic.value) ?? null);
const matchOptions = computed<MatchOption[]>(() => {
	const options: MatchOption[] = [];

	for (const claim of suggestions.value.claims.slice(0, 4)) {
		options.push({
			key: `claim:${claim._id}`,
			label: claim.title,
			path: claim.topic?.slug ? `/consensus/${claim.topic.slug}/${claim.slug}` : undefined,
			type: "claim"
		});
	}

	for (const item of explainerSuggestions.value.slice(0, 3)) {
		options.push({
			key: `explainer:${item.slug}`,
			label: item.title,
			path: `/explainers/${item.slug}`,
			type: "explainer"
		});
	}

	for (const topic of suggestions.value.topics.slice(0, 3)) {
		options.push({
			key: `topic:${topic._id}`,
			label: topic.title,
			path: `/consensus/${topic.slug}`,
			type: "topic"
		});
	}

	return options.slice(0, 8);
});
const selectedClosestMatchRecord = computed(
	() => matchOptions.value.find((option) => option.key === selectedClosestMatch.value) ?? null
);

useHead({
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

function continueUnderClaim(claim: ClaimSummary) {
	selectedTopic.value = claim.topic?.slug || selectedTopic.value;
	selectedClaimSlug.value = claim.slug;
	selectedClosestMatch.value = `claim:${claim._id}`;
	questionKind.value = "claim";
	manualContinue.value = true;
}

function openSuggestion(path: string) {
	router.push(path);
}

watch(
	() => query.value,
	(value, previous) => {
		if (!coreQuestion.value || coreQuestion.value === previous) {
			coreQuestion.value = value;
		}
		if (!manualContinue.value) {
			questionKind.value = defaultAskKind(queryAnalysis.value);
		}
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

watch(
	() => selectedTopic.value,
	(value) => {
		if (!value) {
			selectedClaimSlug.value = "";
			return;
		}
		const topicClaims = suggestions.value.claims.filter((claim) => claim.topic?.slug === value);
		if (!topicClaims.some((claim) => claim.slug === selectedClaimSlug.value)) {
			selectedClaimSlug.value = "";
		}
	}
);

watch(
	() => matchOptions.value.map((entry) => entry.key).join("|"),
	() => {
		if (
			selectedClosestMatch.value &&
			matchOptions.value.some((entry) => entry.key === selectedClosestMatch.value)
		) {
			return;
		}
		selectedClosestMatch.value = matchOptions.value[0]?.key || "";
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
		} catch (error) {
			console.error(error);
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
	if (!coreQuestion.value.trim()) {
		errorMessage.value = "Add a one-sentence core question before posting.";
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
				claim: selectedClaimSlug.value || undefined,
				title: coreQuestion.value.trim(),
				normalizedQuestion: queryAnalysis.value.normalized,
				body: context.value.trim(),
				sourceUrl: sourceUrl.value.trim(),
				sourceContextType: "other",
				askKind: questionKind.value,
				closestMatchType: selectedClosestMatchRecord.value?.type || "none",
				closestMatchLabel: selectedClosestMatchRecord.value?.label || "",
				differenceNote: "",
				loadedFrame: queryAnalysis.value.looksLoaded,
				multiQuestion: queryAnalysis.value.hasMultipleQuestions,
				captchaToken: captchaToken.value
			}
		});

		captchaRef.value?.reset();
		captchaToken.value = "";

		if (selectedClaimSlug.value) {
			await router.push({
				path: `/consensus/${selectedTopic.value}/${selectedClaimSlug.value}`,
				query: { posted: "1" }
			});
			return;
		}

		await router.push({
			path: `/consensus/${selectedTopic.value}`,
			query: { posted: "1" }
		});
	} catch (error) {
		console.error(error);
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
			<h1>Search first. Ask when the close reviewed pages still miss the question.</h1>
			<p>Reviewed claim pages come first. Broader topics and explainers are just fallback context.</p>
		</header>

		<section class="search-panel">
			<label class="field-label" for="claim-question">Ask a question or type a claim</label>
			<textarea
				id="claim-question"
				v-model="question"
				rows="3"
				placeholder="Does X cause Y? Is X safe? What is the difference between hazard and risk?"
			/>
			<p class="search-panel__hint">Start typing to see the closest reviewed pages.</p>
		</section>

		<section class="results-grid">
			<article class="results-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Claim reviews</p>
						<h2>Best match first</h2>
					</div>
					<p>Open the reviewed claim if one already answers the question.</p>
				</div>

				<div v-if="!searchReady" class="empty-state">Type at least three characters to start matching.</div>
				<div v-else-if="loadingSuggestions" class="empty-state">Checking reviewed pages...</div>
				<div v-else-if="suggestionError" class="empty-state">{{ suggestionError }}</div>
				<div v-else-if="!suggestions.claims.length" class="empty-state">No close claim review yet.</div>
				<div v-else class="match-list">
					<article
						v-for="claim in suggestions.claims"
						:key="claim._id"
						class="match-row match-row--claim"
						:class="{ 'match-row--strong': topClaimMatch?._id === claim._id }"
					>
						<div>
							<p class="match-row__meta">
								<span>{{ claim.topic?.title }}</span>
								<span>{{ matchStrengthLabel(claim.matchScore) }}</span>
								<span>{{ formatBandLabel(claim.consensusBand) }}</span>
							</p>
							<h3>{{ claim.title }}</h3>
							<p>{{ claim.bottomLine }}</p>
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
							<button class="button button--ghost" type="button" @click="continueUnderClaim(claim)">
								Ask anyway
							</button>
						</div>
					</article>
				</div>
			</article>

			<article class="results-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Other close pages</p>
						<h2>Use these only when the question is broader or conceptual</h2>
					</div>
					<p>These are fallback clicks when one reviewed claim would be too narrow.</p>
				</div>

				<div v-if="!searchReady" class="empty-state">
					Topic and explainer matches appear here after you type.
				</div>
				<div v-else class="support-stack">
					<section v-if="suggestions.topics.length" class="support-section">
						<h3>Topics</h3>
						<div class="match-list">
							<article v-for="topic in suggestions.topics" :key="topic._id" class="match-row">
								<div>
									<p class="match-row__meta">
										<span>{{ matchStrengthLabel(topic.matchScore) }}</span>
										<span>{{ topic.claimCount ?? 0 }} claim reviews</span>
									</p>
									<h3>{{ topic.title }}</h3>
									<p>{{ topic.description }}</p>
									<p v-if="topic.matchReason" class="match-row__reason">{{ topic.matchReason }}</p>
								</div>
								<button
									class="button button--ghost"
									type="button"
									@click="openSuggestion(`/consensus/${topic.slug}`)"
								>
									Open topic
								</button>
							</article>
						</div>
					</section>

					<section v-if="explainerSuggestions.length" class="support-section">
						<h3>Explainers</h3>
						<div class="match-list">
							<article v-for="item in explainerSuggestions" :key="item.slug" class="match-row">
								<div>
									<p class="match-row__meta">
										<span>Explainer</span>
										<span>{{ matchStrengthLabel(item.score) }}</span>
									</p>
									<h3>{{ item.title }}</h3>
									<p>{{ item.summary }}</p>
									<p class="match-row__reason">{{ item.reason }}</p>
								</div>
								<button
									class="button button--ghost"
									type="button"
									@click="openSuggestion(`/explainers/${item.slug}`)"
								>
									Open explainer
								</button>
							</article>
						</div>
					</section>

					<div
						v-if="!suggestions.topics.length && !explainerSuggestions.length"
						class="empty-state empty-state--tight"
					>
						No broader topic or background page looks close yet.
					</div>
				</div>
			</article>
		</section>

		<section v-if="searchReady && hasAnySuggestions && !showPostingForm" class="posting-gate">
			<div>
				<p class="eyebrow">Still not answered?</p>
				<h2>Ask a focused question.</h2>
				<p>Use this only when the close reviewed page still misses what you need.</p>
			</div>
			<button class="button button--ghost" type="button" @click="manualContinue = true">Ask anyway</button>
		</section>

		<section v-if="showPostingForm" class="posting-form">
			<div class="posting-form__header">
				<div>
					<p class="eyebrow">Submit to the queue</p>
					<h2>Create a new question</h2>
				</div>
				<p>Keep it short. The closest existing page is attached automatically when one exists.</p>
			</div>

			<AuthPanel
				v-if="!isLoggedIn"
				title="Sign in to post"
				hint="Only logged-in members can add new community threads."
			/>
			<p v-else class="muted">Signed in as {{ currentAccount?.name }}</p>

			<div class="field-stack">
				<label class="field-label" for="core-question">One-sentence core question</label>
				<input
					id="core-question"
					v-model="coreQuestion"
					type="text"
					placeholder="Example: Do vaccines change human DNA?"
				/>
			</div>

			<div class="field-stack">
				<label class="field-label" for="post-topic">Closest topic</label>
				<select id="post-topic" v-model="selectedTopic">
					<option v-for="topic in topics" :key="topic._id" :value="topic.slug">
						{{ topic.title }}
					</option>
				</select>
			</div>

			<div v-if="selectedTopicRecord" class="selected-topic">
				<h3>{{ selectedTopicRecord.title }}</h3>
				<p>{{ selectedTopicRecord.description }}</p>
				<p class="selected-topic__meta">
					<span>{{ selectedTopicRecord.claimCount ?? 0 }} claim reviews</span>
					<span>{{ selectedTopicRecord.questionCount ?? 0 }} community threads</span>
				</p>
			</div>

			<div class="field-stack">
				<label class="field-label" for="post-context">Context, quote, or local detail</label>
				<textarea
					id="post-context"
					v-model="context"
					rows="4"
					placeholder="Optional. Paste the quote, describe what felt off, or explain the confusion."
				/>
			</div>

			<div class="field-stack">
				<label class="field-label" for="post-source">Source URL</label>
				<input id="post-source" v-model="sourceUrl" type="url" placeholder="Optional source URL" />
			</div>

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
.posting-gate h2,
.posting-form h2,
.selected-topic h3,
.support-section h3 {
	font-family: "Fraunces", serif;
}

.ask-page__header h1 {
	margin: 8px 0 10px;
	font-size: clamp(2.5rem, 4.8vw, 4rem);
}

.ask-page__header p,
.search-panel__hint,
.section-heading p,
.match-row p,
.empty-state,
.posting-gate p,
.posting-form__header p,
.muted,
.error,
.selected-topic p {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.search-panel,
.results-panel,
.posting-gate,
.posting-form,
.match-row,
.selected-topic {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.search-panel,
.results-panel,
.posting-form,
.selected-topic {
	padding: 20px;
}

.posting-gate {
	padding: 20px;
	display: flex;
	justify-content: space-between;
	gap: 18px;
	flex-wrap: wrap;
	align-items: end;
}

.search-panel,
.results-panel,
.posting-form,
.field-stack,
.support-stack,
.support-section {
	display: grid;
	gap: 12px;
}

.search-panel textarea,
.posting-form textarea,
.posting-form input,
.posting-form select {
	padding: 14px 16px;
	border-radius: 16px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.field-label,
.match-row__meta,
.selected-topic__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.section-heading,
.posting-form__header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading h2,
.section-heading p,
.posting-form__header h2,
.posting-form__header p {
	margin: 0;
}

.match-row__actions,
.posting-form__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.results-grid {
	display: grid;
	gap: 18px;
	grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
	align-items: start;
}

.match-list {
	display: grid;
	gap: 12px;
}

.match-row {
	display: grid;
	gap: 14px;
	padding: 18px;
}

.match-row--strong {
	border-color: rgba(211, 107, 56, 0.42);
	box-shadow: 0 0 0 2px rgba(211, 107, 56, 0.12);
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
	color: var(--consensus-on-accent);
}

@media (max-width: 900px) {
	.results-grid {
		grid-template-columns: 1fr;
	}
}
</style>
