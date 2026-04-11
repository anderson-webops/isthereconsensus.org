<script setup lang="ts">
import type { Claim, ClaimResponse, ClaimSource, Question, QuestionResponse, QuestionsResponse } from "~/types/board";
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
const pageUrl = computed(() => `https://isthereconsensus.org/consensus/${topicSlug.value}/${claimSlug.value}`);
const pageDescription = computed(() => claim.value?.bottomLine || "Evidence-backed claim review.");
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
const evidenceSummaries = computed(() => claim.value?.evidenceSummaries ?? []);
const institutionalAnchors = computed(() => claim.value?.institutionalAnchors ?? []);
const surveillanceSpec = computed(() => claim.value?.surveillanceSpec);
const sourceStackSummary = computed(() => {
	const sources = claim.value?.sources ?? [];
	const anchorCount = sources.filter((source) => source.isAnchor).length;
	const synthesisCount = sources.filter(
		(source) => source.kind === "systematic_review" || source.kind === "meta_analysis"
	).length;
	const guidelineCount = sources.filter(
		(source) => source.kind === "guideline" || source.kind === "consensus_statement"
	).length;
	const flaggedCount = sources.filter(
		(source) => source.citationStatus && source.citationStatus !== "current"
	).length;

	const parts = [
		anchorCount ? `${anchorCount} anchor${anchorCount === 1 ? "" : "s"}` : "",
		synthesisCount ? `${synthesisCount} synth${synthesisCount === 1 ? "esis" : "eses"}` : "",
		guidelineCount ? `${guidelineCount} institution${guidelineCount === 1 ? "" : "s"}` : "",
		flaggedCount ? `${flaggedCount} flagged citation${flaggedCount === 1 ? "" : "s"}` : ""
	].filter(Boolean);

	return parts.length ? parts.join(" · ") : "No source stack yet";
});

const ratingFacts = computed(() => [
	{
		label: "Expert agreement",
		value: formatAgreementLabel(claim.value?.agreementLevel, claim.value?.consensusBand),
		note: "How closely major reviews and expert bodies line up on the main conclusion."
	},
	{
		label: "Evidence certainty",
		value: formatEvidenceCertaintyLabel(claim.value?.evidenceCertainty),
		note: "How stable the underlying body of evidence looks right now."
	},
	{
		label: "Review mode",
		value: formatReviewModeLabel(claim.value?.reviewMode),
		note: "Whether this page is on a scheduled review cycle or an active living update track."
	}
]);

const trustFacts = computed(() => [
	{ label: "Source stack", value: sourceStackSummary.value },
	{ label: "Published", value: formatDate(claim.value?.publishedAt, "Publish date pending") },
	{ label: "Last reviewed", value: formatDate(claim.value?.lastReviewedAt, "Review date pending") },
	{ label: "Next review", value: formatDate(claim.value?.nextReviewAt, "Not scheduled") },
	{ label: "Search cutoff", value: formatDate(claim.value?.searchCutoffAt, "Cutoff not listed") },
	{ label: "Retraction check", value: formatDate(claim.value?.lastRetractionCheckAt, "Not listed") }
]);

const sourceGroups = computed(() => {
	const groups: Array<{
		key: string;
		title: string;
		description: string;
		kinds: ClaimSource["kind"][];
	}> = [
		{
			key: "tier1",
			title: "Tier 1 · Guidelines and consensus statements",
			description:
				"These sources establish the shared institutional baseline and the current public-facing consensus.",
			kinds: ["guideline", "consensus_statement"]
		},
		{
			key: "tier2",
			title: "Tier 2 · Systematic reviews and meta-analyses",
			description:
				"These sources summarize the literature and carry the most weight when the site explains the body of evidence.",
			kinds: ["systematic_review", "meta_analysis"]
		},
		{
			key: "tier3",
			title: "Tier 3 · Pivotal primary studies",
			description:
				"These studies matter when a specific trial or landmark paper changed the field or clarified a major point.",
			kinds: ["landmark_study"]
		},
		{
			key: "tier4",
			title: "Tier 4 · Context and background",
			description:
				"These sources help explain methods, history, and scope, but they do not outrank the higher-tier syntheses.",
			kinds: ["context"]
		}
	];

	return groups
		.map((group) => ({
			...group,
			items: (claim.value?.sources ?? []).filter((source) => group.kinds.includes(source.kind))
		}))
		.filter((group) => group.items.length > 0);
});

useSeoMeta({
	description: () => pageDescription.value,
	ogDescription: () => pageDescription.value,
	ogSiteName: "Is There Consensus",
	ogTitle: () => (claim.value ? `${claim.value.title} | Is There Consensus` : "Claim | Is There Consensus"),
	ogType: "article",
	ogUrl: () => pageUrl.value,
	title: () => (claim.value ? `${claim.value.title} - Is There Consensus?` : "Claim - Is There Consensus?"),
	twitterCard: "summary_large_image",
	twitterDescription: () => pageDescription.value,
	twitterTitle: () => (claim.value ? `${claim.value.title} | Is There Consensus` : "Claim | Is There Consensus")
});

useHead(() => ({
	link: [
		{
			href: pageUrl.value,
			rel: "canonical"
		}
	]
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

function formatAgreementLabel(agreement?: Claim["agreementLevel"], fallbackBand?: Claim["consensusBand"]) {
	if (agreement === "strong") return "Strong agreement";
	if (agreement === "broad_qualified") return "Broad but qualified agreement";
	if (agreement === "divided") return "Divided interpretations";
	if (agreement === "frontier") return "Frontier debate";
	return formatBandLabel(fallbackBand);
}

function formatEvidenceCertaintyLabel(certainty?: Claim["evidenceCertainty"]) {
	if (certainty === "high") return "High certainty";
	if (certainty === "moderate") return "Moderate certainty";
	if (certainty === "low") return "Low certainty";
	if (certainty === "very_low") return "Very low certainty";
	return "Certainty not listed";
}

function formatReviewModeLabel(mode?: Claim["reviewMode"]) {
	return mode === "living" ? "Living review" : "Scheduled review";
}

function formatCadence(days?: number) {
	if (!days) return "Cadence not listed";
	if (days % 30 === 0 && days >= 30) {
		const months = days / 30;
		return `${months} month${months === 1 ? "" : "s"}`;
	}
	return `${days} day${days === 1 ? "" : "s"}`;
}

function formatChangeKind(kind?: string) {
	if (kind === "publication") return "Published";
	if (kind === "correction") return "Correction";
	if (kind === "review") return "Review";
	return "Update";
}

function formatSourceKind(kind: string) {
	return kind.replaceAll("_", " ");
}

function formatEffectDirection(direction?: string) {
	if (direction === "supports") return "Supports current bottom line";
	if (direction === "mixed") return "Mixed or split signal";
	return "Still unclear";
}

function formatSourceAppraisal(appraisal?: ClaimSource["appraisal"]) {
	if (appraisal === "high") return "High-quality anchor";
	if (appraisal === "moderate") return "Moderate-quality anchor";
	if (appraisal === "low") return "Low-confidence source";
	return "Not appraised";
}

function formatCitationStatus(status?: ClaimSource["citationStatus"]) {
	if (status === "corrected") return "Corrected";
	if (status === "retracted") return "Retracted";
	if (status === "expression_of_concern") return "Expression of concern";
	return "Current";
}

function sourcePrimaryLink(source: ClaimSource) {
	if (source.url) return source.url;
	if (source.doi) return `https://doi.org/${source.doi}`;
	if (source.pmid) return `https://pubmed.ncbi.nlm.nih.gov/${source.pmid}/`;
	if (source.pmcid) return `https://pmc.ncbi.nlm.nih.gov/articles/${source.pmcid}/`;
	return "";
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
			<div class="claim-page__hero">
				<p class="eyebrow">Canonical claim review</p>
				<h1>{{ claim?.title || "Claim review" }}</h1>
				<p class="claim-page__description">
					{{ claim?.editorSummary || "This page is the editorial summary for the claim." }}
				</p>
			</div>
			<div class="rating-grid">
				<article v-for="fact in ratingFacts" :key="fact.label" class="trust-card trust-card--rating">
					<span>{{ fact.label }}</span>
					<strong>{{ fact.value }}</strong>
					<p>{{ fact.note }}</p>
				</article>
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
					This page keeps the reviewed summary, the source stack, and the update trail above the fold.
					Community threads below can raise questions, but they do not vote the claim into or out of
					consensus.
				</p>
			</div>
			<div class="reading-guide__actions">
				<NuxtLink class="button button--ghost" to="/methods">Methods playbook</NuxtLink>
				<NuxtLink class="button button--ghost" to="/evidence-ops">Evidence operations</NuxtLink>
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
						<p class="eyebrow">Outcome view</p>
						<h2>Evidence summaries by outcome</h2>
					</div>
					<p>
						These objects carry the reusable evidence summary for the claim, not just a flat list of
						citations.
					</p>
				</div>

				<div v-if="!evidenceSummaries.length" class="empty-state">
					No outcome-level evidence summaries are attached yet.
				</div>
				<div v-else class="evidence-summary-list">
					<article
						v-for="summary in evidenceSummaries"
						:key="`${summary.question}-${summary.finding}`"
						class="evidence-summary-card"
					>
						<div class="evidence-summary-card__top">
							<div>
								<p class="eyebrow">Key question</p>
								<h3>{{ summary.question }}</h3>
							</div>
							<div class="evidence-summary-card__badges">
								<span class="tag">{{ formatEffectDirection(summary.effectDirection) }}</span>
								<span class="tag">{{ formatEvidenceCertaintyLabel(summary.certainty) }}</span>
							</div>
						</div>
						<p v-if="summary.population" class="muted">
							<strong>Population / context:</strong> {{ summary.population }}
						</p>
						<p><strong>Finding:</strong> {{ summary.finding }}</p>
						<p v-if="summary.magnitude"><strong>Magnitude / range:</strong> {{ summary.magnitude }}</p>
						<div v-if="summary.limitations?.length">
							<p class="field-label">Key limitations</p>
							<ul class="plain-list plain-list--tight">
								<li v-for="item in summary.limitations" :key="item">{{ item }}</li>
							</ul>
						</div>
					</article>
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Methods snapshot</p>
						<h2>How this claim was reviewed</h2>
					</div>
					<p>
						Each page should show the search scope, the filters, and the appraisal logic behind the summary.
					</p>
				</div>

				<div class="methods-grid">
					<article class="method-card">
						<h3>Databases searched</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in claim?.searchDatabases || []" :key="item">{{ item }}</li>
						</ul>
					</article>

					<article class="method-card">
						<h3>Inclusion rules</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in claim?.inclusionRules || []" :key="item">{{ item }}</li>
						</ul>
					</article>

					<article class="method-card">
						<h3>Exclusion rules</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in claim?.exclusionRules || []" :key="item">{{ item }}</li>
						</ul>
					</article>

					<article class="method-card">
						<h3>Appraisal tools</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in claim?.appraisalTools || []" :key="item">{{ item }}</li>
						</ul>
					</article>
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Evidence operations</p>
						<h2>How this page stays on watch</h2>
					</div>
					<p>
						Automation should surface integrity and guideline changes, but editors still decide whether the
						public conclusion changes.
					</p>
				</div>

				<div class="methods-grid">
					<article class="method-card">
						<h3>Surveillance focus</h3>
						<p>{{ surveillanceSpec?.focus || "The monitoring scope is not listed yet." }}</p>
					</article>

					<article class="method-card">
						<h3>Cadence</h3>
						<p>{{ formatCadence(surveillanceSpec?.cadenceDays) }}</p>
					</article>

					<article class="method-card">
						<h3>Watch terms</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in surveillanceSpec?.watchTerms || []" :key="item">{{ item }}</li>
						</ul>
					</article>

					<article class="method-card">
						<h3>Integrity monitors</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in surveillanceSpec?.integrityMonitors || []" :key="item">{{ item }}</li>
						</ul>
					</article>

					<article class="method-card">
						<h3>Guideline monitors</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in surveillanceSpec?.guidelineMonitors || []" :key="item">{{ item }}</li>
						</ul>
					</article>

					<article class="method-card">
						<h3>Priority triggers</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in surveillanceSpec?.triggerRules || []" :key="item">{{ item }}</li>
						</ul>
					</article>
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Anchor institutions</p>
						<h2>Which bodies define the public baseline here</h2>
					</div>
					<p>
						These anchors show which review bodies or assessments the page treats as the field-level
						baseline.
					</p>
				</div>

				<div v-if="!institutionalAnchors.length" class="empty-state">
					No institutional anchors are listed for this claim yet.
				</div>
				<div v-else class="anchor-grid">
					<article v-for="anchor in institutionalAnchors" :key="anchor.name" class="anchor-card">
						<h3>{{ anchor.name }}</h3>
						<p>{{ anchor.role }}</p>
					</article>
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Review and independence</p>
						<h2>Who reviewed this and what guardrails were used</h2>
					</div>
					<p>
						Trust signals should be visible enough that a skeptical reader can inspect the process without
						guessing.
					</p>
				</div>

				<div class="review-grid">
					<article class="review-card">
						<h3>Prepared by</h3>
						<p>{{ claim?.authorLine || "Editorial authorship not listed yet." }}</p>
					</article>

					<article class="review-card">
						<h3>Reviewed by</h3>
						<p>{{ claim?.reviewerLine || "Reviewer details not listed yet." }}</p>
					</article>

					<article class="review-card">
						<h3>Conflicts of interest</h3>
						<p>{{ claim?.coiSummary || "Conflict-of-interest statement not listed yet." }}</p>
					</article>

					<article class="review-card">
						<h3>Editorial independence</h3>
						<p>{{ claim?.independenceSummary || "Editorial independence statement not listed yet." }}</p>
					</article>
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Evidence trail</p>
						<h2>Ranked source stack</h2>
					</div>
					<p>
						The stack is grouped so readers can see which sources set the baseline and which ones are only
						supporting context.
					</p>
				</div>

				<div v-if="!claim?.sources?.length" class="empty-state">No sources are attached yet.</div>
				<div v-else class="source-groups">
					<section v-for="group in sourceGroups" :key="group.key" class="source-group">
						<div class="source-group__header">
							<h3>{{ group.title }}</h3>
							<p>{{ group.description }}</p>
						</div>
						<div class="source-list">
							<article v-for="source in group.items" :key="source._id || source.title" class="source-row">
								<div>
									<p class="source-row__meta">
										<span>{{ formatSourceKind(source.kind) }}</span>
										<span>{{ source.publisher || "Source" }}</span>
										<span v-if="source.year">{{ source.year }}</span>
									</p>
									<h4>{{ source.title }}</h4>
									<p>{{ source.note }}</p>
									<div class="source-row__badges">
										<span v-if="source.isAnchor" class="tag tag--anchor">Anchor source</span>
										<span class="tag">{{ formatSourceAppraisal(source.appraisal) }}</span>
										<span
											class="tag"
											:class="{
												'tag--warning':
													source.citationStatus && source.citationStatus !== 'current'
											}"
										>
											{{ formatCitationStatus(source.citationStatus) }}
										</span>
									</div>
									<div
										v-if="source.doi || source.pmid || source.pmcid || source.citationCheckedAt"
										class="source-row__identifiers"
									>
										<span v-if="source.doi">DOI: {{ source.doi }}</span>
										<span v-if="source.pmid">PMID: {{ source.pmid }}</span>
										<span v-if="source.pmcid">PMCID: {{ source.pmcid }}</span>
										<span v-if="source.citationCheckedAt">
											Checked {{ formatDate(source.citationCheckedAt, "Date pending") }}
										</span>
									</div>
									<div v-if="source.statusSources?.length" class="source-row__identifiers">
										<span>Integrity signals: {{ source.statusSources.join(" · ") }}</span>
									</div>
								</div>
								<a
									v-if="sourcePrimaryLink(source)"
									class="button button--ghost"
									:href="sourcePrimaryLink(source)"
									target="_blank"
									rel="noreferrer"
								>
									Open source
								</a>
							</article>
						</div>
					</section>
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Corrections and updates</p>
						<h2>Visible change log</h2>
					</div>
					<p>Readers should be able to see what changed, when it changed, and why the page moved.</p>
				</div>

				<div v-if="!claim?.changeLog?.length" class="empty-state">
					No public change log entries are recorded yet.
				</div>
				<div v-else class="change-log">
					<article
						v-for="entry in claim.changeLog"
						:key="`${entry.date}-${entry.summary}`"
						class="change-log__entry"
					>
						<p class="change-log__meta">
							<span>{{ formatChangeKind(entry.kind) }}</span>
							<span>{{ formatDate(entry.date, "Date pending") }}</span>
						</p>
						<p>{{ entry.summary }}</p>
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

.claim-page__hero {
	display: grid;
	gap: 10px;
}

.claim-page__header h1,
.bottom-line h2,
.reading-guide h2,
.section-heading h2,
.method-card h3,
.review-card h3,
.source-group__header h3,
.source-row h4,
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

.rating-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.trust-card {
	padding: 16px 18px;
	display: grid;
	gap: 6px;
}

.trust-card--rating {
	border-left: 4px solid var(--consensus-debate);
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

.trust-card p {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.55;
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

.source-groups,
.change-log {
	display: grid;
	gap: 18px;
}

.source-group {
	display: grid;
	gap: 12px;
}

.source-group__header {
	display: grid;
	gap: 6px;
}

.source-group__header p {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.methods-grid,
.review-grid,
.anchor-grid,
.evidence-summary-list {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.method-card,
.review-card,
.anchor-card,
.evidence-summary-card,
.change-log__entry {
	padding: 16px;
	border-radius: 18px;
	border: 1px solid var(--consensus-soft-line);
	background: var(--consensus-field-surface);
}

.method-card,
.review-card,
.anchor-card,
.evidence-summary-card {
	display: grid;
	gap: 10px;
}

.method-card p,
.review-card p,
.anchor-card p,
.evidence-summary-card p,
.change-log__entry p {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.65;
}

.plain-list--tight {
	gap: 8px;
	padding-left: 18px;
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

.evidence-summary-card__top {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	flex-wrap: wrap;
	align-items: start;
}

.evidence-summary-card h3,
.anchor-card h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.evidence-summary-card__badges,
.source-row__badges,
.source-row__identifiers {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.source-row__identifiers {
	color: var(--consensus-muted);
	font-size: 0.9rem;
}

.source-row h4 {
	font-size: 1.02rem;
}

.source-row__meta,
.question-card__meta {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.tag {
	display: inline-flex;
	align-items: center;
	padding: 6px 10px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	font-size: 0.76rem;
	font-weight: 600;
	line-height: 1;
}

.tag--anchor {
	border-color: var(--consensus-evidence);
}

.tag--warning {
	border-color: rgba(184, 61, 46, 0.28);
	background: rgba(184, 61, 46, 0.08);
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
	background: var(--consensus-field-surface);
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
	color: var(--consensus-on-accent);
}

.button--danger {
	border-color: rgba(184, 61, 46, 0.3);
}

.change-log__meta {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

@media (max-width: 820px) {
	.bottom-line,
	.reading-guide,
	.methods-grid,
	.review-grid,
	.anchor-grid,
	.evidence-summary-list {
		grid-template-columns: 1fr;
	}

	.bottom-line__actions,
	.reading-guide__actions {
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
