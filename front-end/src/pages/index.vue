<script setup lang="ts">
import type { ClaimSummary, SuggestionResponse, Topic, TopicResponse } from "~/types/board";
import { watchDebounced } from "@vueuse/core";
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import { appDescription, appName, socialImageUrl } from "~/constants";
import { formatLandscapeCertaintyLabel, formatLandscapeSupportLabel } from "~/constants/evidenceLandscape";
import { getTopicGuide } from "~/data/topicGuides";
import { analyzeAskQuery, matchExplainers } from "~/utils/ask-flow";
import { formatCountLabel } from "~/utils/format-count";

definePageMeta({
	layout: "home"
});

const router = useRouter();
const { apiUrl } = useApi();

const search = ref("");
const suggestions = ref<SuggestionResponse>({ claims: [], topics: [], questions: [] });
const loadingSuggestions = ref(false);
const suggestionError = ref("");

const starterOrder = [
	"climate-and-environment",
	"health-and-medicine",
	"biology-and-evolution",
	"nutrition-and-diet",
	"neuroscience-and-psychology"
];
const fallbackTopics: Topic[] = [
	{
		_id: "fallback-climate-and-environment",
		title: "Climate & environment",
		slug: "climate-and-environment",
		description: "Where the science stands on climate change, energy, and environmental risk.",
		questionCount: 0,
		claimCount: 0
	},
	{
		_id: "fallback-health-and-medicine",
		title: "Health & medicine",
		slug: "health-and-medicine",
		description: "High-stakes medical and public-health claims with strong evidence bases.",
		questionCount: 0,
		claimCount: 0
	},
	{
		_id: "fallback-biology-and-evolution",
		title: "Biology & evolution",
		slug: "biology-and-evolution",
		description: "Core biological frameworks that are often misrepresented in public debate.",
		questionCount: 0,
		claimCount: 0
	},
	{
		_id: "fallback-nutrition-and-diet",
		title: "Nutrition & diet",
		slug: "nutrition-and-diet",
		description: "A noisy topic area where stable guidance is often buried under headline churn.",
		questionCount: 0,
		claimCount: 0
	},
	{
		_id: "fallback-neuroscience-and-psychology",
		title: "Neuroscience & psychology",
		slug: "neuroscience-and-psychology",
		description: "Evidence-backed summaries for common brain and behavior myths.",
		questionCount: 0,
		claimCount: 0
	}
];

const { data: topicsData } = await useAsyncData("home-topics", async () => {
	try {
		return await $fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"));
	} catch {
		return { topics: fallbackTopics };
	}
});

const topics = computed<Topic[]>(() => topicsData.value?.topics ?? []);
const enrichedTopics = computed(() =>
	topics.value
		.map((topic) => ({
			...topic,
			guide: getTopicGuide(topic.slug)
		}))
		.sort((left, right) => {
			const leftIndex = starterOrder.indexOf(left.slug);
			const rightIndex = starterOrder.indexOf(right.slug);
			const leftRank = leftIndex === -1 ? starterOrder.length : leftIndex;
			const rightRank = rightIndex === -1 ? starterOrder.length : rightIndex;
			return (
				leftRank - rightRank ||
				(right.claimCount ?? 0) - (left.claimCount ?? 0) ||
				left.title.localeCompare(right.title)
			);
		})
);

const searchQuery = computed(() => search.value.trim());
const searchAnalysis = computed(() => analyzeAskQuery(searchQuery.value));
const claimSuggestions = computed(() => suggestions.value.claims.slice(0, 3));
const topicSuggestions = computed(() => suggestions.value.topics.slice(0, 3));
const explainerSuggestions = computed(() => matchExplainers(searchQuery.value).slice(0, 2));
const featuredClaims = computed(() => {
	const seen = new Set<string>();
	return enrichedTopics.value
		.flatMap((topic) =>
			(topic.featuredClaims ?? []).map((claim) => ({
				...claim,
				topic
			}))
		)
		.filter((claim) => {
			if (seen.has(claim._id)) return false;
			seen.add(claim._id);
			return true;
		})
		.slice(0, 5);
});
const topicHighlights = computed(() => enrichedTopics.value.slice(0, 5));
const faqEntries = [
	{
		answer: "Search the claim first, read the short bottom line, and then open the evidence stack only if you need the deeper explanation or source trail.",
		question: "How should I use Is There Consensus?"
	},
	{
		answer: "The site prioritizes consensus statements, guidelines, systematic reviews, and higher-quality syntheses before it leans on single studies or isolated headlines.",
		question: "What evidence does the site rely on?"
	},
	{
		answer: "No. Community discussion stays separate from reviewed claim pages so public sentiment does not get mistaken for expert consensus.",
		question: "Are the public discussions the same thing as the site’s consensus judgment?"
	}
];

useSeoMeta({
	description: appDescription,
	ogDescription: appDescription,
	ogImage: socialImageUrl,
	ogImageAlt: `${appName} preview card`,
	ogImageHeight: "630",
	ogImageWidth: "1200",
	ogSiteName: appName,
	ogTitle: appName,
	ogType: "website",
	ogUrl: "https://isthereconsensus.org/",
	title: appName,
	twitterCard: "summary_large_image",
	twitterDescription: appDescription,
	twitterImage: socialImageUrl,
	twitterImageAlt: `${appName} preview card`,
	twitterTitle: appName
});

useHead({
	link: [
		{
			key: "canonical",
			href: "https://isthereconsensus.org/",
			rel: "canonical"
		}
	],
	script: [
		{
			innerHTML: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "FAQPage",
				mainEntity: faqEntries.map((entry) => ({
					"@type": "Question",
					acceptedAnswer: {
						"@type": "Answer",
						text: entry.answer
					},
					name: entry.question
				}))
			}),
			key: "faq-jsonld",
			type: "application/ld+json"
		}
	]
});

function resetSuggestions() {
	suggestions.value = { claims: [], topics: [], questions: [] };
	suggestionError.value = "";
}

watchDebounced(
	() => searchQuery.value,
	async (value) => {
		if (value.length < 3) {
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
			suggestions.value = { claims: [], topics: [], questions: [] };
			suggestionError.value = "Suggestion lookup is unavailable right now.";
		} finally {
			loadingSuggestions.value = false;
		}
	},
	{ debounce: 250, maxWait: 600 }
);

function submitSearch() {
	const query = searchQuery.value;
	if (!query) {
		router.push("/consensus");
		return;
	}

	const firstClaim = claimSuggestions.value[0];
	if (firstClaim?.topic?.slug) {
		router.push(`/consensus/${firstClaim.topic.slug}/${firstClaim.slug}`);
		return;
	}

	const firstTopic = topicSuggestions.value[0];
	if (firstTopic?.slug) {
		router.push(`/consensus/${firstTopic.slug}`);
		return;
	}

	if (searchAnalysis.value.recommendedDestination === "explainer" && explainerSuggestions.value[0]) {
		router.push(`/explainers/${explainerSuggestions.value[0].slug}`);
		return;
	}

	router.push({
		path: "/ask",
		query: { question: query }
	});
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

function formatTopicUpdateLabel(value?: string) {
	if (!value) return "Update pending";
	const formattedDate = new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
	return `Updated ${formattedDate}`;
}
</script>

<template>
	<div class="home">
		<section class="hero">
			<div class="hero__copy">
				<p class="eyebrow">Find out where the science stands</p>
				<h1>Search a claim. Read the bottom line.</h1>
				<p class="hero__lead">
					Clear, reviewed summaries for scientific questions that are often louder in public than they are
					uncertain in the evidence.
				</p>

				<form class="search-panel" @submit.prevent="submitSearch">
					<label class="search-panel__label" for="home-search">Search a claim, headline, or topic</label>
					<div class="search-panel__row">
						<input
							id="home-search"
							v-model="search"
							type="text"
							placeholder="Try vaccines, climate, or GMOs"
						/>
						<button class="button button--primary" type="submit">Search</button>
					</div>
					<p class="search-panel__hint">Matching claim reviews, topics, and explainers appear as you type.</p>

					<p v-if="suggestionError" class="search-panel__hint">{{ suggestionError }}</p>
					<div v-else-if="loadingSuggestions && searchQuery.length >= 3" class="search-panel__hint">
						Checking reviewed pages...
					</div>

					<div
						v-if="claimSuggestions.length || topicSuggestions.length || explainerSuggestions.length"
						class="suggestion-groups"
					>
						<div v-if="claimSuggestions.length" class="suggestion-group">
							<p class="suggestion-group__label">Claim reviews</p>
							<ul class="suggestion-list">
								<li v-for="claim in claimSuggestions" :key="claim._id">
									<NuxtLink :to="`/consensus/${claim.topic?.slug}/${claim.slug}`">
										<strong>{{ claim.title }}</strong>
										<span class="suggestion-list__summary" :title="claimCardSummary(claim)">
											{{ claimCardSummary(claim) }}
										</span>
									</NuxtLink>
								</li>
							</ul>
						</div>

						<div v-if="topicSuggestions.length" class="suggestion-group">
							<p class="suggestion-group__label">Topics</p>
							<ul class="suggestion-list">
								<li v-for="topic in topicSuggestions" :key="topic._id">
									<NuxtLink :to="`/consensus/${topic.slug}`">
										<strong>{{ topic.title }}</strong>
										<span>{{ topic.description || getTopicGuide(topic.slug).snapshot }}</span>
									</NuxtLink>
								</li>
							</ul>
						</div>

						<div v-if="explainerSuggestions.length" class="suggestion-group">
							<p class="suggestion-group__label">Explain concepts</p>
							<ul class="suggestion-list">
								<li v-for="item in explainerSuggestions" :key="item.slug">
									<NuxtLink :to="`/explainers/${item.slug}`">
										<strong>{{ item.title }}</strong>
										<span>{{ item.reason }}</span>
									</NuxtLink>
								</li>
							</ul>
						</div>
					</div>
				</form>
			</div>
		</section>

		<section v-if="featuredClaims.length" class="home-section">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Featured reviews</p>
					<h2>Start with a reviewed claim</h2>
				</div>
				<NuxtLink class="text-link" to="/consensus">Browse all topics</NuxtLink>
			</div>

			<div class="claim-list">
				<NuxtLink
					v-for="claim in featuredClaims"
					:key="claim._id"
					class="claim-row"
					:to="`/consensus/${claim.topic.slug}/${claim.slug}`"
				>
					<div class="claim-row__main">
						<p class="claim-row__meta">
							<span>{{ claim.topic.title }}</span>
							<span>{{ claimSupportLabel(claim) }}</span>
							<span v-if="claimCertaintyLabel(claim)">{{ claimCertaintyLabel(claim) }}</span>
							<span>{{ formatCountLabel(claim.sourceCount, "source") }}</span>
						</p>
						<h3>{{ claim.title }}</h3>
						<p class="claim-row__summary" :title="claimCardSummary(claim)">
							{{ claimCardSummary(claim) }}
						</p>
					</div>
					<span class="claim-row__score" :aria-label="`Confidence score ${claim.confidenceScore} out of 100`">
						<span>Confidence</span>
						<strong>{{ claim.confidenceScore }}/100</strong>
					</span>
				</NuxtLink>
			</div>
		</section>

		<section class="home-section">
			<div class="section-heading">
				<div>
					<p class="eyebrow">Topic clusters</p>
					<h2>Browse by topic</h2>
				</div>
				<NuxtLink class="text-link" to="/consensus">Open the directory</NuxtLink>
			</div>

			<div class="topic-list">
				<NuxtLink
					v-for="topic in topicHighlights"
					:key="topic.slug"
					class="topic-row"
					:to="`/consensus/${topic.slug}`"
				>
					<div class="topic-row__main">
						<h3>{{ topic.title }}</h3>
						<p>{{ topic.description || topic.guide.snapshot }}</p>
						<div class="topic-row__meta">
							<span>{{ topic.guide.consensusLabel }}</span>
							<span>{{ formatCountLabel(topic.claimCount, "claim review") }}</span>
							<span>{{ formatTopicUpdateLabel(topic.updatedAt) }}</span>
						</div>
					</div>
					<div class="topic-row__meter">
						<ConsensusMeter :level="topic.guide.consensusScore" :label="topic.guide.consensusLabel" />
					</div>
				</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.home {
	display: grid;
	gap: 36px;
}

.hero {
	display: grid;
	gap: 20px;
	grid-template-columns: minmax(0, 1fr);
	align-items: start;
}

.search-panel,
.claim-row,
.topic-row,
.explainer-row,
.trust-row {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.hero__copy {
	display: grid;
	gap: 16px;
	padding-top: 6px;
}

.hero h1,
.section-heading h2,
.claim-row h3,
.topic-row h3,
.explainer-row h3,
.trust-row h3 {
	font-family: "Fraunces", serif;
}

.hero h1 {
	max-width: 18ch;
	color: var(--consensus-ink);
	font-size: var(--consensus-home-title-size);
	line-height: 1.08;
	letter-spacing: 0;
	margin: 0;
}

.hero__lead,
.claim-row p,
.topic-row p,
.search-panel__hint {
	color: var(--consensus-muted);
}

.hero__lead {
	font-size: 1.05rem;
	line-height: 1.68;
	max-width: 58ch;
	margin: 0;
}

.search-panel {
	max-width: 920px;
	padding: 18px 20px;
	display: grid;
	gap: 12px;
}

.search-panel__label,
.claim-row__meta,
.topic-row__meta,
.suggestion-group__label,
.text-link,
.suggestion-list strong,
.button {
	font-weight: 600;
}

.search-panel__label {
	font-size: 0.95rem;
	color: var(--consensus-ink);
}

.search-panel__row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 12px;
}

.search-panel input {
	width: 100%;
	min-height: 48px;
	padding: 14px 16px;
	border-radius: 16px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.search-panel__hint {
	margin: 0;
	font-size: 0.95rem;
	line-height: 1.6;
}

.suggestion-groups {
	display: grid;
	gap: 12px;
}

.suggestion-group {
	display: grid;
	gap: 8px;
}

.suggestion-group__label {
	margin: 0;
	font-size: 0.82rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.suggestion-list {
	margin: 0;
	padding: 0;
	list-style: none;
	display: grid;
	gap: 10px;
}

.suggestion-list a {
	display: grid;
	gap: 4px;
	padding: 12px 14px;
	border-radius: 16px;
	background: var(--consensus-mist);
	text-decoration: none;
}

.suggestion-list span {
	font-size: 0.94rem;
	line-height: 1.5;
	color: var(--consensus-muted);
}

.suggestion-list__summary,
.claim-row__summary {
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
}

.suggestion-list__summary {
	-webkit-line-clamp: 2;
}

.claim-row__summary {
	-webkit-line-clamp: 3;
}

.home-section {
	display: grid;
	gap: 18px;
}

.home-section--soft {
	padding: 24px;
	border-radius: 24px;
	background: var(--consensus-elevated-surface);
	border: 1px solid var(--consensus-soft-line);
}

.home-section--compact {
	gap: 0;
}

.section-heading {
	display: flex;
	justify-content: space-between;
	align-items: end;
	gap: 16px;
	flex-wrap: wrap;
}

.section-heading__links {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.section-heading h2,
.claim-row h3,
.topic-row h3,
.explainer-row h3,
.trust-row h3 {
	margin: 6px 0 0;
	line-height: 1.18;
}

.claim-list,
.roadmap-list,
.topic-list,
.explainer-list,
.trust-list {
	display: grid;
	gap: 14px;
}

.claim-row,
.topic-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 18px;
	padding: 18px;
	text-decoration: none;
}

.claim-row__main,
.topic-row__main {
	display: grid;
	gap: 10px;
}

.claim-row__main p,
.topic-row__main p {
	margin: 0;
	line-height: 1.62;
}

.claim-row__meta,
.topic-row__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	font-size: 0.88rem;
	color: var(--consensus-muted);
}

.claim-row__score {
	display: inline-grid;
	gap: 3px;
	align-self: center;
	justify-self: end;
	min-width: 118px;
	padding: 9px 12px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 14px;
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	text-align: center;
}

.claim-row__score span {
	color: var(--consensus-muted);
	font-size: 0.68rem;
	font-weight: 700;
	letter-spacing: 0.06em;
	line-height: 1;
	text-transform: uppercase;
}

.claim-row__score strong {
	font-family: "Fraunces", serif;
	font-size: 1.08rem;
	line-height: 1;
}

.topic-row__meter {
	display: grid;
	align-content: center;
	min-width: 220px;
}

.library-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 24px;
}

.explainer-row,
.trust-row {
	padding: 18px;
}

.explainer-row--roadmap {
	border-left: 4px solid var(--consensus-interactive);
}

.explainer-row p,
.trust-row p {
	margin: 10px 0 0;
	line-height: 1.65;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 20px;
	border-radius: 999px;
	text-decoration: none;
	border: 1px solid var(--consensus-line);
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.button--ghost {
	background: transparent;
}

.text-link {
	text-decoration: none;
}

@media (max-width: 980px) {
	.hero,
	.library-grid,
	.claim-row,
	.topic-row {
		grid-template-columns: 1fr;
	}

	.hero h1 {
		max-width: none;
	}

	.topic-row__meter {
		min-width: 0;
	}

	.claim-row__score {
		justify-self: start;
		text-align: left;
	}
}

@media (max-width: 640px) {
	.home {
		gap: 30px;
	}

	.section-heading {
		display: grid;
		gap: 8px;
		align-items: start;
	}

	.section-heading .text-link {
		justify-self: start;
	}

	.hero__copy,
	.search-panel,
	.claim-row,
	.topic-row,
	.explainer-row,
	.trust-row {
		border-radius: 16px;
	}

	.hero__copy {
		gap: 16px;
	}

	.search-panel {
		gap: 10px;
		padding: 14px;
	}

	.search-panel input {
		min-height: 46px;
		padding: 12px 14px;
		border-radius: 14px;
	}

	.claim-row,
	.topic-row {
		gap: 12px;
		padding: 14px;
	}

	.claim-row__main,
	.topic-row__main {
		gap: 8px;
	}

	.claim-row__summary {
		-webkit-line-clamp: 2;
	}

	.claim-row__score {
		display: inline-flex;
		align-items: baseline;
		gap: 7px;
		min-width: 0;
		padding: 7px 10px;
	}

	.claim-row__score strong {
		font-size: 1rem;
	}

	.search-panel__row {
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 8px;
	}

	.search-panel .button {
		min-height: 46px;
		width: auto;
		padding: 10px 14px;
	}

	.search-panel__hint {
		font-size: 0.92rem;
		line-height: 1.5;
	}
}
</style>
