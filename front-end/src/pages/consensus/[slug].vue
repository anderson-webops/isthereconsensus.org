<script setup lang="ts">
import type {
	ClaimsResponse,
	ClaimSummary,
	Question,
	QuestionResponse,
	QuestionsResponse,
	SingleTopicResponse
} from "~/types/board";
import { nextTick } from "vue";
import AuthPanel from "~/components/AuthPanel.vue";
import CaptchaWidget from "~/components/CaptchaWidget.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { getTopicGuide } from "~/data/topicGuides";

interface TopicRouteParams {
	slug?: string | string[];
}

const route = useRoute();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { isLoggedIn, currentAccount, role } = useAuth();

const captchaRequired = computed(() => !!config.public.captchaSiteKey);
const slug = computed(() => {
	const value = (route.params as TopicRouteParams).slug;
	return Array.isArray(value) ? value[0] : String(value ?? "");
});
const highlightId = computed(() => (typeof route.query.highlight === "string" ? route.query.highlight : ""));

const { data: topicData } = await useAsyncData(`topic-hub-${slug.value}`, () =>
	$fetch<SingleTopicResponse>(apiUrl(`/topics/${slug.value}?includeClaims=true`))
);
const { data: claimsData } = await useAsyncData(`topic-claims-${slug.value}`, () =>
	$fetch<ClaimsResponse>(apiUrl(`/topics/${slug.value}/claims`))
);
const { data: questionsData, refresh } = await useAsyncData(`topic-questions-${slug.value}`, () =>
	$fetch<QuestionsResponse>(apiUrl(`/questions?topic=${slug.value}&routingStatus=unassigned&limit=100`))
);

const questionText = ref("");
const questionDetails = ref("");
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

const topic = computed(() => topicData.value?.topic);
const guide = computed(() => getTopicGuide(slug.value));
const claims = computed<ClaimSummary[]>(() => claimsData.value?.claims ?? []);
const questions = computed<Question[]>(() => questionsData.value?.questions ?? []);
const isAdmin = computed(() => role.value === "admin");
const canEditTopic = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
const pageUrl = computed(() => `https://isthereconsensus.org/consensus/${slug.value}`);
const pageDescription = computed(() => topic.value?.description || guide.value.snapshot);
const breadcrumbStructuredData = computed(() => ({
	"@context": "https://schema.org",
	"@type": "BreadcrumbList",
	itemListElement: [
		{
			"@type": "ListItem",
			position: 1,
			name: "Home",
			item: "https://isthereconsensus.org/"
		},
		{
			"@type": "ListItem",
			position: 2,
			name: "Browse topics",
			item: "https://isthereconsensus.org/consensus"
		},
		{
			"@type": "ListItem",
			position: 3,
			name: topic.value?.title || "Topic",
			item: pageUrl.value
		}
	]
}));
const topicStructuredData = computed(() => ({
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	description: pageDescription.value,
	isPartOf: {
		"@type": "WebSite",
		name: "Is There Consensus",
		url: "https://isthereconsensus.org"
	},
	mainEntity: {
		"@type": "ItemList",
		itemListElement: claims.value.map((entry, index) => ({
			"@type": "ListItem",
			position: index + 1,
			url: `https://isthereconsensus.org/consensus/${slug.value}/${entry.slug}`,
			name: entry.title
		}))
	},
	name: topic.value ? `${topic.value.title} topic page | Is There Consensus` : "Topic page | Is There Consensus",
	publisher: {
		"@type": "Organization",
		name: "Is There Consensus",
		url: "https://isthereconsensus.org"
	},
	url: pageUrl.value,
	about: topic.value
		? {
				"@type": "Thing",
				name: topic.value.title,
				description: topic.value.description
			}
		: undefined,
	dateModified: topic.value?.updatedAt
}));

const trustFacts = computed(() => [
	{ label: "Consensus snapshot", value: guide.value.consensusLabel },
	{ label: "Reviewed claims", value: String(claims.value.length) },
	{ label: "Last updated", value: formatDate(topic.value?.updatedAt, "Update pending") },
	{ label: "Open community threads", value: String(questions.value.length) }
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

useSeoMeta({
	description: () => pageDescription.value,
	ogDescription: () => pageDescription.value,
	ogSiteName: "Is There Consensus",
	ogTitle: () => (topic.value ? `${topic.value.title} | Is There Consensus` : "Topic | Is There Consensus"),
	ogType: "website",
	ogUrl: () => pageUrl.value,
	title: () => (topic.value ? `${topic.value.title} - Topic - Is There Consensus?` : "Topic - Is There Consensus?"),
	twitterCard: "summary_large_image",
	twitterDescription: () => pageDescription.value,
	twitterTitle: () => (topic.value ? `${topic.value.title} | Is There Consensus` : "Topic | Is There Consensus")
});

useHead(() => ({
	link: [
		{
			href: pageUrl.value,
			rel: "canonical"
		}
	],
	script: [breadcrumbStructuredData.value, topicStructuredData.value].map((entry, index) => ({
		innerHTML: JSON.stringify(entry),
		key: `topic-structured-data-${index}`,
		type: "application/ld+json"
	}))
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

function formatDate(value?: string, fallback = "Not available yet") {
	if (!value) return fallback;
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
}

function formatBandLabel(band?: ClaimSummary["consensusBand"]) {
	if (band === "strong") return "Strong consensus";
	if (band === "broad") return "Broad consensus";
	if (band === "mixed") return "Mixed evidence";
	return "Unclear or still forming";
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
	if (!questionText.value.trim()) {
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
				topic: slug.value,
				title: questionText.value.trim(),
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
				<p class="topic-page__description">
					{{ topic?.description || guide.snapshot }}
				</p>
			</div>
			<div class="trust-grid">
				<article v-for="fact in trustFacts" :key="fact.label" class="trust-card">
					<span>{{ fact.label }}</span>
					<strong>{{ fact.value }}</strong>
				</article>
			</div>
		</header>

		<section class="topic-summary">
			<div>
				<p class="eyebrow">Overview</p>
				<h2>{{ guide.snapshot }}</h2>
				<p>Start with a reviewed claim below. Open the broader topic notes only when you need extra context.</p>
			</div>
			<div class="topic-summary__actions">
				<NuxtLink class="button button--primary" to="/ask">Ask about this topic</NuxtLink>
				<NuxtLink v-if="canEditTopic" class="button button--ghost" to="/account/editorial"
					>Open editorial workspace</NuxtLink
				>
			</div>
		</section>

		<section class="claim-lane">
			<div class="section-heading section-heading--stacked">
				<div>
					<p class="eyebrow">Reviewed claims</p>
					<h2>Start here when one matches your question</h2>
				</div>
				<p>These pages carry the reviewed bottom line, uncertainty, and source trail.</p>
			</div>

			<div v-if="!claims.length" class="empty-state">No reviewed claims are published under this topic yet.</div>
			<div v-else class="claim-list">
				<NuxtLink
					v-for="claim in claims"
					:key="claim._id"
					class="claim-row"
					:to="`/consensus/${slug}/${claim.slug}`"
				>
					<div>
						<p class="claim-row__meta">
							<span>{{ formatBandLabel(claim.consensusBand) }}</span>
							<span>{{ claim.sourceCount ?? 0 }} sources</span>
							<span>Reviewed {{ formatDate(claim.lastReviewedAt, "Pending") }}</span>
						</p>
						<h3>{{ claim.title }}</h3>
						<p>{{ claim.bottomLine }}</p>
					</div>
					<span class="claim-row__score">{{ claim.confidenceScore }}/100</span>
				</NuxtLink>
			</div>
		</section>

		<details class="fallback-lane disclosure">
			<summary>Broader topic snapshot</summary>
			<p class="disclosure-intro">
				Use this when you need the wider frame or when a narrower reviewed claim is not live yet.
			</p>
			<div class="fallback-grid">
				<section class="fallback-panel">
					<h3>Stable core</h3>
					<ul class="plain-list">
						<li v-for="item in guide.stableCore" :key="item">{{ item }}</li>
					</ul>
				</section>

				<section class="fallback-panel">
					<h3>Open questions</h3>
					<ul class="plain-list">
						<li v-for="item in guide.openQuestions" :key="item">{{ item }}</li>
					</ul>
				</section>

				<section class="fallback-panel">
					<h3>What would change minds</h3>
					<ul class="plain-list">
						<li v-for="item in guide.whatWouldChangeMinds" :key="item">{{ item }}</li>
					</ul>
				</section>

				<section class="fallback-panel">
					<h3>Common public misreads</h3>
					<ul class="plain-list">
						<li v-for="item in guide.commonMisreads" :key="item">{{ item }}</li>
					</ul>
				</section>
			</div>
		</details>

		<details class="lane lane--community disclosure">
			<summary>Community questions under this topic</summary>
			<p class="community-note">
				<strong>Community discussion:</strong> public questions and comments, not the reviewed answer.
			</p>

			<div class="community-toolbar">
				<div class="community-toolbar__search">
					<label class="field-label" for="topic-question-search">Search unassigned threads</label>
					<input
						id="topic-question-search"
						v-model="questionSearch"
						type="text"
						placeholder="Filter by title, author, source, or context"
					/>
				</div>
				<button class="button button--ghost" type="button" @click="showComposer = !showComposer">
					{{ showComposer ? "Hide question form" : "Ask under this topic" }}
				</button>
			</div>

			<section v-if="showComposer" class="composer">
				<div class="composer__intro">
					<h3>Post a new topic question</h3>
					<p>Use this when none of the reviewed claims above fits what you need.</p>
				</div>

				<AuthPanel
					v-if="!isLoggedIn"
					title="Sign in to post"
					hint="Only logged-in members can add new topic threads."
				/>
				<p v-else class="muted">Signed in as {{ currentAccount?.name }}</p>

				<label class="field-label" for="topic-question-title">Question</label>
				<textarea
					id="topic-question-title"
					v-model="questionText"
					rows="3"
					placeholder="What part of this topic still feels unresolved?"
				/>

				<label class="field-label" for="topic-question-body">Context or quoted source</label>
				<textarea
					id="topic-question-body"
					v-model="questionDetails"
					rows="4"
					placeholder="Optional. Paste the quote, source, or detail that triggered the question."
				/>

				<label class="field-label" for="topic-question-source">Source URL</label>
				<input
					id="topic-question-source"
					v-model="questionSourceUrl"
					type="url"
					placeholder="Optional source URL"
				/>

				<div v-if="isLoggedIn" class="captcha-wrap">
					<CaptchaWidget ref="captchaRef" v-model="captchaToken" />
				</div>

				<p class="muted">
					Questions posted here are public and may be indexed. See the
					<NuxtLink to="/privacy">Privacy Policy</NuxtLink> for details.
				</p>
				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
				<div class="posting-form__actions">
					<button
						class="button button--primary"
						type="button"
						:disabled="submitting || !isLoggedIn"
						@click="postQuestion"
					>
						{{ submitting ? "Posting..." : "Post to the board" }}
					</button>
				</div>
			</section>

			<p v-if="moderationMessage" class="muted">{{ moderationMessage }}</p>

			<div v-if="!filteredQuestions.length" class="empty-state">
				No unassigned threads are waiting under this topic.
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
							<option value="low-quality">Low quality / unsupported</option>
							<option value="off-topic">Off topic</option>
							<option value="duplicate">Duplicate</option>
							<option value="misleading">Misleading</option>
							<option value="spam">Spam / manipulation</option>
							<option value="harassment">Harassment / abuse</option>
							<option value="privacy">Privacy / doxxing</option>
							<option value="legal">Legal concern</option>
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
		</details>
	</div>
</template>

<style scoped>
.topic-page {
	display: grid;
	gap: 24px;
}

.topic-page__header,
.trust-card,
.topic-summary,
.resource-strip,
.source-standard-strip,
.claim-lane,
.fallback-lane,
.lane,
.claim-row,
.fallback-panel,
.question-card,
.composer {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.topic-page__header,
.topic-summary,
.resource-strip,
.source-standard-strip,
.claim-lane,
.fallback-lane,
.lane,
.composer {
	padding: 22px;
}

.topic-page__header,
.topic-summary,
.resource-strip,
.source-standard-strip,
.claim-lane,
.fallback-lane,
.lane,
.composer {
	display: grid;
	gap: 16px;
}

.topic-page__header h1,
.topic-summary h2,
.resource-strip h2,
.source-standard-strip h2,
.section-heading h2,
.claim-row h3,
.fallback-panel h3,
.question-card h3,
.composer h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.topic-page__header h1 {
	margin-top: 8px;
	font-size: clamp(2.6rem, 5vw, 4.25rem);
	line-height: 0.98;
}

.topic-page__description,
.topic-summary p,
.resource-strip p,
.source-standard-strip p,
.section-heading p,
.claim-row p,
.fallback-panel,
.plain-list,
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
.claim-row__meta,
.question-card__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.trust-card strong,
.claim-row__score {
	font-size: 1rem;
	color: var(--consensus-ink);
}

.topic-summary {
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.resource-strip {
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.topic-summary__actions,
.resource-strip__actions,
.posting-form__actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	justify-content: end;
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

.disclosure summary {
	cursor: pointer;
	font-family: "Fraunces", serif;
	font-size: 1.08rem;
}

.disclosure-intro {
	margin: 0;
}

.claim-list,
.question-list {
	display: grid;
	gap: 12px;
}

.claim-row,
.fallback-panel,
.question-card {
	padding: 18px;
}

.claim-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 12px;
	text-decoration: none;
}

.claim-row__meta,
.question-card__meta {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.fallback-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.community-note {
	margin: 0;
	padding: 14px 16px;
	border-radius: 16px;
	border: 1px solid var(--consensus-soft-line);
	background: color-mix(in srgb, var(--consensus-surface) 88%, var(--consensus-community-soft) 12%);
	color: var(--consensus-muted);
	line-height: 1.6;
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
	background: var(--consensus-field-surface);
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
	color: var(--consensus-on-accent);
}

.button--danger {
	border-color: rgba(184, 61, 46, 0.3);
}

@media (max-width: 820px) {
	.topic-summary,
	.resource-strip,
	.claim-row,
	.fallback-grid {
		grid-template-columns: 1fr;
	}

	.topic-summary__actions,
	.resource-strip__actions {
		justify-content: start;
	}
}

@media (max-width: 640px) {
	.community-toolbar__search,
	.flag-select,
	.flag-note {
		min-width: 0;
		width: 100%;
	}
}
</style>
