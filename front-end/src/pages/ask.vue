<script setup lang="ts">
import type { ClaimSummary, QuestionResponse, SuggestionResponse, Topic, TopicResponse } from "~/types/board";
import { watchDebounced } from "@vueuse/core";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { isLoggedIn, currentAccount } = useAuth();

const captchaRequired = computed(() => !!config.public.captchaSiteKey);

const question = ref(typeof route.query.question === "string" ? route.query.question : "");
const context = ref("");
const sourceUrl = ref("");
const selectedTopic = ref(typeof route.query.topic === "string" ? route.query.topic : "");
const selectedClaimSlug = ref("");
const manualContinue = ref(false);
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
const exactClaimMatch = computed(() => suggestions.value.claims[0] ?? null);
const hasSuggestions = computed(
	() =>
		suggestions.value.claims.length > 0 ||
		suggestions.value.topics.length > 0 ||
		suggestions.value.questions.length > 0
);
const showPostingForm = computed(() => manualContinue.value || (searchReady.value && !hasSuggestions.value));
const selectedTopicRecord = computed(() => topics.value.find((topic) => topic.slug === selectedTopic.value) ?? null);
const claimOptions = computed(() =>
	suggestions.value.claims.filter((claim) => claim.topic?.slug === selectedTopic.value)
);

function formatBandLabel(band?: ClaimSummary["consensusBand"]) {
	if (band === "strong") return "Strong consensus";
	if (band === "broad") return "Broad consensus";
	if (band === "mixed") return "Mixed evidence";
	return "Unclear or still forming";
}

function resetSuggestions() {
	suggestions.value = { claims: [], topics: [], questions: [] };
	suggestionError.value = "";
}

watch(
	() => [topics.value.length, selectedTopic.value],
	() => {
		if (!topics.value.length) return;
		if (topics.value.some((topic) => topic.slug === selectedTopic.value)) return;
		selectedTopic.value =
			exactClaimMatch.value?.topic?.slug || suggestions.value.topics[0]?.slug || topics.value[0].slug;
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
			resetSuggestions();
		} finally {
			loadingSuggestions.value = false;
		}
	},
	{ debounce: 250, maxWait: 600 }
);

watch(
	() => selectedTopic.value,
	(value) => {
		if (!value) {
			selectedClaimSlug.value = "";
			return;
		}
		if (!claimOptions.value.some((claim) => claim.slug === selectedClaimSlug.value)) {
			selectedClaimSlug.value = "";
		}
	}
);

function openSuggestion(path: string) {
	router.push(path);
}

function continueUnderClaim(claim: ClaimSummary) {
	selectedTopic.value = claim.topic?.slug || selectedTopic.value;
	selectedClaimSlug.value = claim.slug;
	manualContinue.value = true;
}

async function submitQuestion() {
	errorMessage.value = "";
	if (!isLoggedIn.value) {
		errorMessage.value = "Please sign in before posting.";
		return;
	}
	if (!query.value) {
		errorMessage.value = "Please add a question or headline first.";
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
		const response = await $fetch<QuestionResponse>(apiUrl("/questions"), {
			method: "POST",
			credentials: "include",
			body: {
				topic: selectedTopic.value,
				claim: selectedClaimSlug.value || undefined,
				title: query.value,
				body: context.value.trim(),
				sourceUrl: sourceUrl.value.trim(),
				captchaToken: captchaToken.value
			}
		});

		captchaRef.value?.reset();
		captchaToken.value = "";

		if (selectedClaimSlug.value) {
			await router.push({
				path: `/consensus/${selectedTopic.value}/${selectedClaimSlug.value}`,
				query: { highlight: response.question._id }
			});
			return;
		}

		await router.push({
			path: `/consensus/${selectedTopic.value}`,
			query: { highlight: response.question._id }
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
			<h1>Check for an existing claim review before posting.</h1>
			<p>
				The site is claim-first now. Search the claim, open the existing review if it exists, and only post a
				new thread when the answer is not already covered.
			</p>
		</header>

		<section class="search-panel">
			<label class="field-label" for="claim-question">What are you trying to check?</label>
			<textarea
				id="claim-question"
				v-model="question"
				rows="3"
				placeholder="Paste the claim, headline, or question"
			/>
			<p class="search-panel__hint">
				Start with the exact claim if you can. Existing claim reviews are ranked above topic hubs and community
				threads.
			</p>
		</section>

		<section class="results-grid">
			<article class="results-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">1. Existing claim reviews</p>
						<h2>Best match first</h2>
					</div>
					<p>Open one of these before you post anything new.</p>
				</div>

				<div v-if="!searchReady" class="empty-state">Type at least three characters to start matching.</div>
				<div v-else-if="loadingSuggestions" class="empty-state">Checking existing claim reviews...</div>
				<div v-else-if="suggestionError" class="empty-state">{{ suggestionError }}</div>
				<div v-else-if="!suggestions.claims.length" class="empty-state">No claim review looks close yet.</div>
				<div v-else class="match-list">
					<article v-for="claim in suggestions.claims" :key="claim._id" class="match-row match-row--claim">
						<div>
							<p class="match-row__meta">
								<span>{{ claim.topic?.title }}</span>
								<span>{{ formatBandLabel(claim.consensusBand) }}</span>
							</p>
							<h3>{{ claim.title }}</h3>
							<p>{{ claim.bottomLine }}</p>
						</div>
						<div class="match-row__actions">
							<button
								class="button button--primary"
								type="button"
								@click="openSuggestion(`/consensus/${claim.topic?.slug}/${claim.slug}`)"
							>
								Open claim review
							</button>
							<button class="button button--ghost" type="button" @click="continueUnderClaim(claim)">
								Post under this claim
							</button>
						</div>
					</article>
				</div>
			</article>

			<article class="results-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">2. Topic hubs</p>
						<h2>Read the topic frame if the claim is still broad</h2>
					</div>
					<p>Use the hub when you need the bigger context before getting more specific.</p>
				</div>

				<div v-if="!searchReady" class="empty-state">Topic matches appear here after you type.</div>
				<div v-else-if="!suggestions.topics.length" class="empty-state">No close topic hub yet.</div>
				<div v-else class="match-list">
					<article v-for="topic in suggestions.topics" :key="topic._id" class="match-row">
						<div>
							<p class="match-row__meta">
								<span>{{ topic.claimCount ?? 0 }} claim reviews</span>
								<span>{{ topic.questionCount ?? 0 }} community threads</span>
							</p>
							<h3>{{ topic.title }}</h3>
							<p>{{ topic.description }}</p>
						</div>
						<button
							class="button button--ghost"
							type="button"
							@click="openSuggestion(`/consensus/${topic.slug}`)"
						>
							Open topic hub
						</button>
					</article>
				</div>
			</article>

			<article class="results-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">3. Community threads</p>
						<h2>Only after the claim or topic frame</h2>
					</div>
					<p>These are discussion threads, not canonical summaries.</p>
				</div>

				<div v-if="!searchReady" class="empty-state">Recent thread matches appear here after you type.</div>
				<div v-else-if="!suggestions.questions.length" class="empty-state">
					No existing thread looks close yet.
				</div>
				<div v-else class="match-list">
					<article v-for="entry in suggestions.questions" :key="entry._id" class="match-row">
						<div>
							<p class="match-row__meta">
								<span>{{ entry.topic.title }}</span>
								<span>{{ entry.claim?.title || "Unassigned thread" }}</span>
							</p>
							<h3>{{ entry.title }}</h3>
							<p>{{ entry.body || entry.sourceUrl || "Open the topic hub to read the frame first." }}</p>
						</div>
						<button
							class="button button--ghost"
							type="button"
							@click="
								openSuggestion(
									entry.claim
										? `/consensus/${entry.topic.slug}/${entry.claim.slug}?highlight=${entry._id}`
										: `/consensus/${entry.topic.slug}?highlight=${entry._id}`
								)
							"
						>
							Open thread
						</button>
					</article>
				</div>
			</article>
		</section>

		<section class="posting-gate">
			<div>
				<p class="eyebrow">Still need to post?</p>
				<h2>Post only if the site still does not cover the question.</h2>
				<p>
					New threads stay under a topic hub by default. You can explicitly attach the thread to a known
					claim.
				</p>
			</div>
			<button class="button button--ghost" type="button" @click="manualContinue = true">
				{{ hasSuggestions ? "I still need to post" : "Continue to posting" }}
			</button>
		</section>

		<section v-if="showPostingForm" class="posting-form">
			<div class="posting-form__header">
				<div>
					<p class="eyebrow">Submit to the board</p>
					<h2>Organize the thread before you post it</h2>
				</div>
				<p>
					Choose the topic first. Then decide whether the thread should stay unassigned or sit under a known
					claim.
				</p>
			</div>

			<AuthPanel
				v-if="!isLoggedIn"
				title="Sign in to post"
				hint="Only logged-in members can add new community threads."
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

			<div v-if="selectedTopicRecord" class="selected-topic">
				<h3>{{ selectedTopicRecord.title }}</h3>
				<p>{{ selectedTopicRecord.description }}</p>
				<p class="selected-topic__meta">
					<span>{{ selectedTopicRecord.claimCount ?? 0 }} claim reviews</span>
					<span>{{ selectedTopicRecord.questionCount ?? 0 }} community threads</span>
				</p>
			</div>

			<div class="field-stack">
				<label class="field-label" for="claim-link">Attach to a published claim</label>
				<select id="claim-link" v-model="selectedClaimSlug">
					<option value="">Leave this as an unassigned topic thread</option>
					<option v-for="claim in claimOptions" :key="claim._id" :value="claim.slug">
						{{ claim.title }}
					</option>
				</select>
				<p class="muted">
					Leave this blank unless the question clearly belongs under an existing claim review.
				</p>
			</div>

			<div class="field-stack">
				<label class="field-label" for="post-context">Context or quote</label>
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
					{{ submitting ? "Posting..." : "Post to the board" }}
				</button>
				<NuxtLink class="button button--ghost" to="/consensus">Browse topics</NuxtLink>
			</div>
		</section>

		<section v-if="exactClaimMatch && !showPostingForm" class="next-step">
			<p class="eyebrow">Recommended next step</p>
			<h2>Open the closest claim review first.</h2>
			<p>{{ exactClaimMatch.title }} is currently the strongest match for this query.</p>
			<button
				class="button button--primary"
				type="button"
				@click="openSuggestion(`/consensus/${exactClaimMatch.topic?.slug}/${exactClaimMatch.slug}`)"
			>
				Open {{ exactClaimMatch.title }}
			</button>
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
.next-step h2 {
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
.selected-topic,
.next-step {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.search-panel,
.results-panel,
.posting-form,
.selected-topic,
.next-step {
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
.field-stack {
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
	background: #fff;
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

.results-grid {
	display: grid;
	gap: 18px;
	grid-template-columns: repeat(3, minmax(0, 1fr));
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

.match-list {
	display: grid;
	gap: 12px;
}

.match-row {
	padding: 16px;
	display: grid;
	gap: 14px;
}

.match-row__meta,
.selected-topic__meta {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.match-row h3,
.selected-topic h3,
.next-step h2 {
	margin: 0;
}

.match-row__actions,
.posting-form__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
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
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: #fff;
}

.button--ghost {
	background: transparent;
	color: var(--consensus-ink);
}

.empty-state {
	padding: 14px 0 4px;
}

.next-step {
	display: grid;
	gap: 10px;
}

.error {
	color: #b83d2e;
	font-weight: 600;
}

@media (max-width: 1000px) {
	.results-grid {
		grid-template-columns: 1fr;
	}
}
</style>
