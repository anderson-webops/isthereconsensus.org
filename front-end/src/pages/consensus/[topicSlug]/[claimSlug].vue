<script setup lang="ts">
import type { Claim, ClaimResponse, ClaimSource } from "~/types/board";
import ClaimReviewStatus from "~/components/ClaimReviewStatus.vue";
import ComparisonLinks from "~/components/ComparisonLinks.vue";
import EvidenceLandscapePanel from "~/components/consensus/evidence-landscape/EvidenceLandscapePanel.vue";
import LibraryAction from "~/components/LibraryAction.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import ReadingGuideLinks from "~/components/ReadingGuideLinks.vue";
import { comparisonsForReview } from "~/data/comparisons";
import { guidesForReview } from "~/data/reading-guides";
import { buildApiUrl } from "~/utils/api";
import { selectDistinctUncertaintyLimits, selectVisibleEvidenceSummaries } from "~/utils/claim-presentation";
import { claimReviewStatus, formatReviewDate } from "~/utils/claim-review-status";
import { doiResolverUrl, pubMedCentralUrl, pubMedUrl, safeExternalHttpUrl } from "~/utils/external-links";
import { formatCountLabel } from "~/utils/format-count";
import { serializeJsonLd } from "~/utils/json-ld";

interface ClaimRouteParams {
	topicSlug?: string | string[];
	claimSlug?: string | string[];
}

const route = useRoute();
const config = useRuntimeConfig();
const { apiUrl } = useApi();
const { currentAccount, role } = useAuth();

const topicSlug = computed(() => {
	const value = (route.params as ClaimRouteParams).topicSlug;
	return Array.isArray(value) ? value[0] : String(value ?? "");
});
const claimSlug = computed(() => {
	const value = (route.params as ClaimRouteParams).claimSlug;
	return Array.isArray(value) ? value[0] : String(value ?? "");
});
const postedToQueue = computed(() => route.query.posted === "1");

const { data: claimData } = await useAsyncData(`claim-${topicSlug.value}-${claimSlug.value}`, () =>
	$fetch<ClaimResponse>(apiUrl(`/topics/${topicSlug.value}/claims/${claimSlug.value}`))
);

const claim = computed<Claim | undefined>(() => claimData.value?.claim);
const reviewEvaluatedAt = useState("review-status-evaluated-at", () => new Date().toISOString());
const reviewStatus = computed(
	() =>
		claim.value?.reviewStatus ??
		claimReviewStatus(claim.value ?? {}, claim.value?.sources, new Date(reviewEvaluatedAt.value))
);
const collectionMemberships = computed(() => claimData.value?.collections ?? []);
const relatedClaims = computed(() => claimData.value?.relatedClaims ?? []);
const readingGuides = computed(() => guidesForReview(`/consensus/${topicSlug.value}/${claimSlug.value}`));
const citation = computed(() => claimData.value?.citation);
const citationCopyState = ref<"copied" | "error" | "idle">("idle");
const canEditClaim = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
const pageUrl = computed(() => `https://isthereconsensus.org/consensus/${topicSlug.value}/${claimSlug.value}`);
const pageDescription = computed(() => claim.value?.bottomLine || "Evidence-backed claim review.");
const evidenceSummaries = computed(() =>
	selectVisibleEvidenceSummaries(claim.value?.evidenceSummaries ?? [], claim.value?.title, claim.value?.bottomLine)
);
const evidenceLandscape = computed(() => claim.value?.evidenceLandscape);
const uncertaintyDrivers = computed(() => claim.value?.uncertaintyDrivers ?? []);
const sourceCount = computed(() => claim.value?.sources?.length ?? 0);
const claimSnapshotGroups = computed(() => {
	const groups = [
		{
			key: "stable-core",
			eyebrow: "Stable core",
			title: "What is settled",
			items: claim.value?.stableCore ?? []
		},
		{
			key: "open-questions",
			eyebrow: "Open questions",
			title: "What remains open",
			items: claim.value?.openQuestions ?? []
		},
		{
			key: "misconceptions",
			eyebrow: "Reader traps",
			title: "Common misconceptions",
			items: claim.value?.misconceptions ?? []
		},
		{
			key: "change-threshold",
			eyebrow: "Change threshold",
			title: "What would change this",
			items: claim.value?.whatWouldChangeMinds ?? []
		}
	];

	return groups
		.map((group) => ({
			...group,
			items: group.items.map((item) => item.trim()).filter(Boolean)
		}))
		.filter((group) => group.items.length > 0);
});
const askLink = computed(() => ({
	path: "/ask",
	query: claim.value?.title ? { topic: topicSlug.value, question: claim.value.title } : { topic: topicSlug.value }
}));
const citationExportBase = computed(() =>
	buildApiUrl(config.public.apiBase as string, `/topics/${topicSlug.value}/claims/${claimSlug.value}/citations`)
);
const claimMeta = computed(() => [
	formatBandLabel(claim.value?.consensusBand),
	formatEvidenceCertaintyLabel(claim.value?.evidenceCertainty),
	formatCountLabel(sourceCount.value, "source"),
	`Review date recorded: ${formatReviewDate(reviewStatus.value.reviewedAt)}`
]);
const bottomLineParts = computed(() => {
	const text = claim.value?.bottomLine?.trim() || "";
	const sentenceEnd = text.match(/[.!?](?:\s|$)/);
	if (!sentenceEnd) {
		return {
			lead: text,
			context: ""
		};
	}

	const leadEnd = (sentenceEnd.index ?? 0) + sentenceEnd[0].trimEnd().length;
	return {
		lead: text.slice(0, leadEnd).trim(),
		context: text.slice(leadEnd).trim()
	};
});
const uncertaintySummary = computed(() => {
	if (claim.value?.uncertaintySummary?.trim()) {
		return claim.value.uncertaintySummary.trim();
	}
	if (claim.value?.evidenceCertainty === "high") {
		return "The core conclusion appears stable. Remaining uncertainty concerns its boundaries and precision.";
	}
	if (claim.value?.evidenceCertainty === "moderate") {
		return "The overall direction appears reliable, but important details and the precision of the conclusion could still change.";
	}
	if (claim.value?.evidenceCertainty === "low") {
		return "The current direction is tentative. Stronger direct evidence could still reshape the conclusion.";
	}
	if (claim.value?.evidenceCertainty === "very_low") {
		return "The evidence base is not stable enough for a settled answer.";
	}
	return "No uncertainty summary is available yet.";
});

const uncertaintyLimits = computed(() =>
	selectDistinctUncertaintyLimits({
		drivers: uncertaintyDrivers.value,
		openQuestions: claim.value?.openQuestions ?? [],
		evidenceSummaries: evidenceSummaries.value
	})
);

const sourceGroups = computed(() => {
	const groups: Array<{
		key: string;
		tier: string;
		title: string;
		description: string;
		kinds: ClaimSource["kind"][];
	}> = [
		{
			key: "tier1",
			tier: "Tier 1",
			title: "Guidelines and consensus statements",
			description:
				"These sources establish the shared institutional baseline and the current public-facing consensus.",
			kinds: ["guideline", "consensus_statement"]
		},
		{
			key: "tier2",
			tier: "Tier 2",
			title: "Systematic reviews and meta-analyses",
			description:
				"These sources summarize the literature and carry the most weight when the site explains the body of evidence.",
			kinds: ["systematic_review", "meta_analysis"]
		},
		{
			key: "tier3",
			tier: "Tier 3",
			title: "Pivotal primary studies",
			description:
				"These studies matter when a specific trial or landmark paper changed the field or clarified a major point.",
			kinds: ["landmark_study"]
		},
		{
			key: "tier4",
			tier: "Tier 4",
			title: "Context and background",
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
			name: claim.value?.topic?.title || "Topic",
			item: `https://isthereconsensus.org/consensus/${topicSlug.value}`
		},
		{
			"@type": "ListItem",
			position: 4,
			name: claim.value?.title || "Claim review",
			item: pageUrl.value
		}
	]
}));
const articleStructuredData = computed(() => ({
	"@context": "https://schema.org",
	"@type": "Article",
	articleSection: claim.value?.topic?.title,
	author: claim.value?.authorLine
		? {
				"@type": "Person",
				name: claim.value.authorLine
			}
		: {
				"@type": "Organization",
				name: "Is There Consensus"
			},
	citation: (claim.value?.sources ?? []).map((source) => sourcePrimaryLink(source) || source.title),
	dateModified: claim.value?.updatedAt || claim.value?.lastReviewedAt,
	datePublished: claim.value?.publishedAt,
	description: pageDescription.value,
	headline: claim.value?.title || "Claim review",
	isPartOf: {
		"@type": "WebSite",
		name: "Is There Consensus",
		url: "https://isthereconsensus.org"
	},
	mainEntityOfPage: pageUrl.value,
	publisher: {
		"@type": "Organization",
		name: "Is There Consensus",
		url: "https://isthereconsensus.org"
	},
	url: pageUrl.value,
	about: claim.value?.topic
		? {
				"@type": "Thing",
				name: claim.value.topic.title,
				description: claim.value.topic.description
			}
		: undefined
}));

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
			key: "canonical",
			href: pageUrl.value,
			rel: "canonical"
		}
	],
	script: [breadcrumbStructuredData.value, articleStructuredData.value].map((entry, index) => ({
		innerHTML: serializeJsonLd(entry),
		key: `claim-structured-data-${index}`,
		type: "application/ld+json"
	}))
}));

function formatBandLabel(band?: Claim["consensusBand"]) {
	if (band === "strong") return "Strong consensus";
	if (band === "broad") return "Broad consensus";
	if (band === "mixed") return "Mixed evidence";
	return "Unclear or still forming";
}

function formatEvidenceCertaintyLabel(certainty?: Claim["evidenceCertainty"]) {
	if (certainty === "high") return "High certainty";
	if (certainty === "moderate") return "Moderate certainty";
	if (certainty === "low") return "Low certainty";
	if (certainty === "very_low") return "Very low certainty";
	return "Certainty not listed";
}

function formatChangeKind(kind?: string) {
	if (kind === "publication") return "Published";
	if (kind === "correction") return "Correction";
	if (kind === "review") return "Review";
	return "Update";
}

function formatSourceKind(kind: string) {
	const label = kind.replaceAll("_", " ");
	return `${label.charAt(0).toUpperCase()}${label.slice(1)}`;
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
	return (
		safeExternalHttpUrl(source.url) ||
		doiResolverUrl(source.doi) ||
		pubMedUrl(source.pmid) ||
		pubMedCentralUrl(source.pmcid)
	);
}

function citationExportUrl(format: "bibtex" | "json" | "markdown" | "ris") {
	const separator = citationExportBase.value.includes("?") ? "&" : "?";
	return `${citationExportBase.value}${separator}format=${format}`;
}

async function copyCitation() {
	if (!import.meta.client || !citation.value?.plainText) return;
	try {
		await window.navigator.clipboard.writeText(citation.value.plainText);
		citationCopyState.value = "copied";
	} catch {
		citationCopyState.value = "error";
	}
}

function formatDate(value?: string, fallback = "Not available yet") {
	if (!value) return fallback;
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
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

		<section v-if="postedToQueue" class="queue-note">
			Your question was received and added to the queue. The reviewed claim stays separate from community intake.
		</section>

		<header class="claim-page__header">
			<div class="claim-page__hero">
				<p class="eyebrow">Reviewed claim</p>
				<h1>{{ claim?.title || "Claim review" }}</h1>
				<p class="claim-page__description">
					{{ claim?.editorSummary || "This review summarizes the available evidence for the claim." }}
				</p>
			</div>
			<p class="claim-page__meta">
				<span v-for="item in claimMeta" :key="item">{{ item }}</span>
			</p>
		</header>

		<LibraryAction v-if="claim?._id" :id="claim._id" kind="review" />

		<section class="bottom-line">
			<div>
				<h2>Bottom line</h2>
				<p class="bottom-line__text bottom-line__text--lead">{{ bottomLineParts.lead }}</p>
				<p v-if="bottomLineParts.context" class="bottom-line__context">{{ bottomLineParts.context }}</p>
			</div>
			<div class="bottom-line__actions">
				<NuxtLink class="button button--ghost" :to="`/consensus/${topicSlug}`">Back to topic</NuxtLink>
				<NuxtLink class="button button--ghost" :to="askLink">Ask a question</NuxtLink>
				<NuxtLink
					v-if="canEditClaim && claim?._id"
					class="button button--ghost"
					:to="`/account/editorial/claims/${claim._id}`"
				>
					Edit claim
				</NuxtLink>
			</div>
		</section>

		<ClaimReviewStatus v-if="claim" :claim="claim" />

		<section class="content-stack">
			<section v-if="claimSnapshotGroups.length" class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Evidence</p>
						<h2>What the evidence says</h2>
					</div>
				</div>

				<div class="claim-snapshot-grid">
					<details
						v-for="group in claimSnapshotGroups"
						:key="group.key"
						class="claim-snapshot-block"
						:open="group.key === 'stable-core'"
					>
						<summary class="claim-snapshot-block__summary">
							<span class="claim-snapshot-block__heading">
								<span class="eyebrow">{{ group.eyebrow }}</span>
								<h3 class="claim-snapshot-block__title">{{ group.title }}</h3>
							</span>
							<span class="claim-snapshot-block__summary-meta">
								<span>{{ formatCountLabel(group.items.length, "point") }}</span>
								<span class="i-carbon-chevron-down claim-snapshot-block__chevron" aria-hidden="true" />
							</span>
						</summary>
						<div class="claim-snapshot-block__body">
							<ul class="plain-list plain-list--tight">
								<li v-for="item in group.items" :key="item">{{ item }}</li>
							</ul>
						</div>
					</details>
				</div>
			</section>

			<section class="uncertainty-strip">
				<div>
					<p class="eyebrow">Uncertainty</p>
					<h2>{{ formatEvidenceCertaintyLabel(claim?.evidenceCertainty) }}</h2>
					<p>{{ uncertaintySummary }}</p>
				</div>
				<details v-if="uncertaintyLimits.length" class="uncertainty-strip__limits">
					<summary>
						<span>Limits to keep in mind</span>
						<span>{{ formatCountLabel(uncertaintyLimits.length, "point") }}</span>
					</summary>
					<ul class="plain-list plain-list--tight">
						<li v-for="item in uncertaintyLimits" :key="item">{{ item }}</li>
					</ul>
				</details>
			</section>

			<EvidenceLandscapePanel v-if="evidenceLandscape" :landscape="evidenceLandscape" />

			<section v-if="evidenceSummaries.length" class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Outcome detail</p>
						<h2>Detailed findings</h2>
					</div>
				</div>
				<div class="outcome-summary-section">
					<div class="evidence-summary-list">
						<details
							v-for="summary in evidenceSummaries"
							:key="`${summary.question}-${summary.finding}`"
							class="evidence-summary-card"
						>
							<summary class="evidence-summary-card__summary">
								<h3>{{ summary.question }}</h3>
								<div class="evidence-summary-card__badges">
									<span class="tag">{{ formatEffectDirection(summary.effectDirection) }}</span>
									<span class="tag">{{ formatEvidenceCertaintyLabel(summary.certainty) }}</span>
									<span
										class="i-carbon-chevron-down evidence-summary-card__chevron"
										aria-hidden="true"
									/>
								</div>
							</summary>
							<div class="evidence-summary-card__body">
								<p v-if="summary.population" class="muted">
									<strong>Population / context:</strong> {{ summary.population }}
								</p>
								<p><strong>Finding:</strong> {{ summary.finding }}</p>
								<p v-if="summary.magnitude">
									<strong>Magnitude / range:</strong> {{ summary.magnitude }}
								</p>
								<div v-if="summary.limitations?.length">
									<p class="field-label">Key limitations</p>
									<ul class="plain-list plain-list--tight">
										<li v-for="item in summary.limitations" :key="item">{{ item }}</li>
									</ul>
								</div>
							</div>
						</details>
					</div>
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading section-heading--sources">
					<h2 id="claim-sources">Sources</h2>
					<p>{{ formatCountLabel(sourceCount, "source") }}, highest-weight first.</p>
				</div>

				<div v-if="!claim?.sources?.length" class="empty-state">No sources are attached yet.</div>
				<div v-else class="source-groups">
					<details
						v-for="group in sourceGroups"
						:key="group.key"
						class="source-group"
						:open="group.key === 'tier1'"
					>
						<summary class="source-group__summary">
							<span class="source-group__summary-copy">
								<span class="eyebrow">{{ group.tier }}</span>
								<h3 class="source-group__title">{{ group.title }}</h3>
							</span>
							<span class="source-group__summary-meta">
								<span class="source-group__count">{{
									formatCountLabel(group.items.length, "source")
								}}</span>
								<span class="i-carbon-chevron-down source-group__chevron" aria-hidden="true" />
							</span>
						</summary>
						<div class="source-group__body">
							<p class="source-group__description">{{ group.description }}</p>
							<div class="source-list">
								<article
									v-for="source in group.items"
									:key="source._id || source.title"
									class="source-row"
								>
									<div class="source-row__content">
										<h4>{{ source.title }}</h4>
										<p class="source-row__meta">
											<span>{{ source.publisher || "Source" }}</span>
											<span v-if="source.year">{{ source.year }}</span>
										</p>
										<p class="source-row__note">{{ source.note }}</p>
										<div class="source-row__badges">
											<span v-if="source.isAnchor" class="tag tag--anchor">Anchor source</span>
											<span
												v-if="source.citationStatus && source.citationStatus !== 'current'"
												class="tag tag--warning"
											>
												{{ formatCitationStatus(source.citationStatus) }}
											</span>
										</div>
										<details class="source-row__details">
											<summary>
												<span>Source details</span>
												<span
													class="i-carbon-chevron-down source-row__details-chevron"
													aria-hidden="true"
												/>
											</summary>
											<dl class="source-row__details-list">
												<dt>Type</dt>
												<dd>{{ formatSourceKind(source.kind) }}</dd>
												<dt>Appraisal</dt>
												<dd>{{ formatSourceAppraisal(source.appraisal) }}</dd>
												<dt>Citation status</dt>
												<dd>{{ formatCitationStatus(source.citationStatus) }}</dd>
												<template v-if="source.doi">
													<dt>DOI</dt>
													<dd>{{ source.doi }}</dd>
												</template>
												<template v-if="source.pmid">
													<dt>PMID</dt>
													<dd>{{ source.pmid }}</dd>
												</template>
												<template v-if="source.pmcid">
													<dt>PMCID</dt>
													<dd>{{ source.pmcid }}</dd>
												</template>
												<template v-if="source.citationCheckedAt">
													<dt>Checked</dt>
													<dd>{{ formatDate(source.citationCheckedAt, "Date pending") }}</dd>
												</template>
											</dl>
											<div v-if="source.statusSources?.length" class="source-row__integrity">
												<p class="field-label">Integrity signals</p>
												<ul class="plain-list plain-list--tight">
													<li
														v-for="statusSource in source.statusSources"
														:key="statusSource"
													>
														<a
															v-if="safeExternalHttpUrl(statusSource)"
															:href="safeExternalHttpUrl(statusSource)"
															target="_blank"
															rel="noopener noreferrer"
														>
															{{ statusSource }}
														</a>
														<span v-else>{{ statusSource }}</span>
													</li>
												</ul>
											</div>
										</details>
									</div>
									<a
										v-if="sourcePrimaryLink(source)"
										class="source-row__open"
										:href="sourcePrimaryLink(source)"
										target="_blank"
										rel="noopener noreferrer"
									>
										<span>Open source</span>
										<span class="i-carbon-arrow-up-right" aria-hidden="true" />
									</a>
								</article>
							</div>
						</div>
					</details>
				</div>
			</section>

			<details v-if="citation" class="content-panel citation-panel">
				<summary class="citation-panel__summary">
					<span>
						<span class="eyebrow">Reuse the evidence</span>
						<span class="citation-panel__title">Cite this review</span>
					</span>
					<span class="i-carbon-chevron-down citation-panel__chevron" aria-hidden="true" />
				</summary>
				<div class="citation-panel__body">
					<p>{{ citation.plainText }}</p>
					<div class="citation-panel__actions">
						<button class="button button--primary" type="button" @click="copyCitation">
							{{ citationCopyState === "copied" ? "Citation copied" : "Copy citation" }}
						</button>
						<a class="button button--ghost" :href="citationExportUrl('bibtex')">BibTeX</a>
						<a class="button button--ghost" :href="citationExportUrl('ris')">RIS</a>
						<a class="button button--ghost" :href="citationExportUrl('markdown')">Markdown</a>
						<a class="button button--ghost" :href="citationExportUrl('json')">CSL JSON</a>
					</div>
					<p v-if="citationCopyState === 'error'" class="citation-panel__error" role="status">
						Your browser blocked clipboard access. Use one of the downloadable formats instead.
					</p>
					<p class="citation-panel__note">
						Exports include this reviewed page and its displayed source list. Missing author metadata is
						never invented.
					</p>
				</div>
			</details>

			<ReadingGuideLinks :guides="readingGuides" />
			<ComparisonLinks :comparisons="comparisonsForReview(`/consensus/${topicSlug}/${claimSlug}`)" />

			<section v-if="collectionMemberships.length || relatedClaims.length" class="content-panel continue-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Continue exploring</p>
						<h2>Related reviews</h2>
					</div>
					<p>Follow the nearest evidence questions instead of returning to a flat directory.</p>
				</div>

				<div v-if="collectionMemberships.length" class="collection-memberships">
					<span class="field-label">This review belongs to</span>
					<NuxtLink
						v-for="collection in collectionMemberships"
						:key="collection.slug"
						class="collection-membership"
						:to="{ path: `/consensus/${topicSlug}`, hash: `#collection-${collection.slug}` }"
					>
						<span>{{ collection.title }}</span>
						<span>{{ formatCountLabel(collection.claimCount, "review") }}</span>
					</NuxtLink>
				</div>

				<div v-if="relatedClaims.length" class="related-claim-grid">
					<NuxtLink
						v-for="relatedClaim in relatedClaims"
						:key="relatedClaim._id"
						class="related-claim-card"
						:to="`/consensus/${topicSlug}/${relatedClaim.slug}`"
					>
						<div>
							<span class="eyebrow">{{ formatBandLabel(relatedClaim.consensusBand) }}</span>
							<h3>{{ relatedClaim.title }}</h3>
							<p>{{ relatedClaim.bottomLine }}</p>
						</div>
						<span class="i-carbon-arrow-right related-claim-card__arrow" aria-hidden="true" />
					</NuxtLink>
				</div>
			</section>

			<details id="claim-history" class="content-panel change-log-panel">
				<summary class="change-log-panel__summary">
					<span class="change-log-panel__heading">
						<span class="eyebrow">Corrections and updates</span>
						<h2 class="change-log-panel__title">Change log</h2>
					</span>
					<span class="change-log-panel__meta">
						{{ claim?.changeLog?.length || 0 }}
						{{ claim?.changeLog?.length === 1 ? "entry" : "entries" }}
					</span>
				</summary>
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
			</details>
			<ReaderFeedback v-if="claim?._id" :key="claim._id" :claim-id="claim._id" />
		</section>
	</div>
</template>

<style scoped>
.claim-page {
	display: grid;
	gap: 22px;
}

.claim-page__header,
.bottom-line,
.queue-note {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
	padding: 22px;
}

.claim-page__header,
.bottom-line {
	display: grid;
	gap: 18px;
}

.uncertainty-strip {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 18px;
	align-items: start;
	padding: 18px 0;
	border-top: 1px solid var(--consensus-soft-line);
	border-bottom: 1px solid var(--consensus-soft-line);
}

.content-panel {
	display: grid;
	gap: 16px;
	padding: 4px 0 24px;
	border-bottom: 1px solid var(--consensus-soft-line);
}

.content-panel:last-child {
	padding-bottom: 0;
	border-bottom: 0;
}

.claim-page__hero {
	display: grid;
	gap: 10px;
}

.claim-page__header h1,
.bottom-line h2,
.section-heading h2,
.claim-snapshot-block__title,
.source-group__title,
.source-row h4 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.claim-page__header h1 {
	margin-top: 8px;
	font-size: var(--consensus-page-title-size);
	line-height: 1.08;
}

.claim-page__description,
.claim-page__meta,
.bottom-line p,
.section-heading p,
.plain-list,
.source-row p,
.empty-state,
.muted,
.field-label,
.queue-note {
	color: var(--consensus-muted);
	line-height: 1.64;
}

.claim-page__description,
.bottom-line p,
.section-heading p {
	max-width: 68ch;
}

.queue-note {
	background: color-mix(in srgb, var(--consensus-surface) 85%, var(--consensus-community-soft) 15%);
}

.claim-page__meta,
.change-log__meta,
.source-row__meta,
.field-label {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.bottom-line {
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: end;
}

.bottom-line h2 {
	line-height: 1.18;
}

.bottom-line .bottom-line__text {
	max-width: 72ch;
	margin: 8px 0 0;
	color: var(--consensus-ink);
	font-size: 1.08rem;
	line-height: 1.62;
}

.bottom-line__text--lead {
	font-weight: 700;
}

.bottom-line__context {
	max-width: 72ch;
	margin: 8px 0 0;
	color: var(--consensus-muted);
	line-height: 1.58;
}

.uncertainty-strip > div > p:not(.eyebrow):not(.field-label) {
	max-width: 68ch;
}

.uncertainty-strip h2 {
	margin: 4px 0 6px;
	font-family: "Fraunces", serif;
	font-size: 1.35rem;
	line-height: 1.18;
}

.uncertainty-strip p {
	margin: 0;
}

.uncertainty-strip__limits {
	width: min(100%, 360px);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
}

.uncertainty-strip__limits > summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	min-height: 44px;
	padding: 9px 12px;
	cursor: pointer;
	list-style: none;
	font-size: 0.9rem;
	font-weight: 700;
}

.uncertainty-strip__limits > summary::-webkit-details-marker {
	display: none;
}

.uncertainty-strip__limits > summary span:last-child {
	color: var(--consensus-muted);
	font-size: 0.78rem;
}

.uncertainty-strip__limits .plain-list {
	margin: 0 12px 12px;
}

.bottom-line__actions,
.source-row {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: start;
}

.bottom-line__actions {
	justify-content: end;
}

.section-heading {
	display: grid;
	gap: 6px;
	margin-bottom: 14px;
}

.section-heading h2,
.section-heading p {
	margin: 0;
}

.section-heading p,
.source-group__description {
	max-width: 58ch;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.section-heading--sources {
	margin-bottom: 4px;
}

.section-heading--sources h2 {
	font-size: 1.7rem;
}

.content-stack,
.outcome-summary-section,
.evidence-summary-list,
.source-groups,
.source-list,
.change-log,
.continue-panel,
.collection-memberships,
.related-claim-grid {
	display: grid;
	gap: 16px;
}

.collection-memberships {
	grid-template-columns: max-content repeat(2, minmax(0, 1fr));
	align-items: center;
	gap: 10px;
}

.collection-membership {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	min-height: 46px;
	padding: 9px 12px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	font-weight: 700;
	text-decoration: none;
	transition: border-color 160ms ease;
}

.collection-membership:hover,
.collection-membership:focus-visible {
	border-color: var(--consensus-interactive);
}

.collection-membership span:last-child {
	color: var(--consensus-muted);
	font-size: 0.76rem;
	white-space: nowrap;
}

.related-claim-grid {
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 12px;
}

.related-claim-card {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 14px;
	align-items: center;
	padding: 16px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-surface);
	color: var(--consensus-ink);
	text-decoration: none;
	transition: border-color 160ms ease;
}

.related-claim-card:hover,
.related-claim-card:focus-visible {
	border-color: var(--consensus-interactive);
}

.related-claim-card > div {
	display: grid;
	gap: 7px;
}

.related-claim-card .eyebrow,
.related-claim-card h3,
.related-claim-card p {
	margin: 0;
}

.related-claim-card h3 {
	font-family: "Fraunces", serif;
	font-size: 1.08rem;
	font-weight: 600;
	line-height: 1.28;
}

.related-claim-card p {
	display: -webkit-box;
	overflow: hidden;
	color: var(--consensus-muted);
	font-size: 0.9rem;
	line-height: 1.5;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}

.related-claim-card__arrow {
	width: 20px;
	height: 20px;
	color: var(--consensus-interactive);
}

.claim-snapshot-grid {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: 10px;
}

.evidence-summary-card,
.claim-snapshot-block {
	display: block;
	border-radius: 8px;
	background: var(--consensus-field-surface);
	border: 1px solid var(--consensus-soft-line);
	overflow: hidden;
}

.claim-snapshot-block__summary,
.evidence-summary-card__summary {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 14px;
	align-items: center;
	min-height: 58px;
	padding: 13px 16px;
	cursor: pointer;
	list-style: none;
}

.claim-snapshot-block__summary::-webkit-details-marker,
.evidence-summary-card__summary::-webkit-details-marker {
	display: none;
}

.claim-snapshot-block__heading {
	display: grid;
	gap: 3px;
}

.claim-snapshot-block__heading .eyebrow {
	margin: 0;
}

.claim-snapshot-block__title,
.evidence-summary-card h3 {
	margin: 0;
	color: var(--consensus-ink);
	font-weight: 600;
	line-height: 1.24;
}

.claim-snapshot-block__summary-meta {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	color: var(--consensus-muted);
	font-size: 0.8rem;
	font-weight: 700;
	white-space: nowrap;
}

.claim-snapshot-block__chevron,
.evidence-summary-card__chevron,
.source-group__chevron {
	width: 18px;
	height: 18px;
	color: var(--consensus-interactive);
	transition: transform 160ms ease;
}

.claim-snapshot-block[open] .claim-snapshot-block__chevron,
.evidence-summary-card[open] .evidence-summary-card__chevron,
.source-group[open] .source-group__chevron {
	transform: rotate(180deg);
}

.claim-snapshot-block__body,
.evidence-summary-card__body {
	display: grid;
	gap: 12px;
	padding: 14px 16px 16px;
	border-top: 1px solid var(--consensus-soft-line);
}

.change-log__entry {
	display: grid;
	gap: 14px;
	padding: 18px;
	border-radius: 8px;
	background: var(--consensus-field-surface);
	border: 1px solid var(--consensus-soft-line);
}

.source-group {
	display: block;
	border-top: 1px solid var(--consensus-soft-line);
}

.source-group:last-child {
	border-bottom: 1px solid var(--consensus-soft-line);
}

.source-row {
	padding: 16px 18px;
	border-radius: 8px;
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
}

.source-group__summary {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 14px;
	align-items: center;
	min-height: 68px;
	padding: 12px 0;
	cursor: pointer;
	list-style: none;
}

.source-group__summary::-webkit-details-marker {
	display: none;
}

.source-group__summary-copy {
	display: grid;
	gap: 3px;
	min-width: 0;
}

.source-group__title {
	margin: 0;
	color: var(--consensus-ink);
	font-size: 1.08rem;
	font-weight: 600;
	line-height: 1.22;
}

.source-group__description {
	margin: 0;
}

.source-group__summary-meta {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	justify-content: end;
}

.source-group__count {
	color: var(--consensus-muted);
	font-size: 0.8rem;
	font-weight: 700;
	white-space: nowrap;
}

.source-group__body {
	display: grid;
	gap: 12px;
	padding: 4px 0 18px;
}

.source-row__content {
	display: grid;
	flex: 1 1 620px;
	gap: 8px;
	min-width: 0;
}

.source-row h4 {
	font-size: 1.08rem;
	line-height: 1.3;
	overflow-wrap: anywhere;
}

.source-row__meta {
	gap: 8px;
}

.source-row__note {
	max-width: 72ch;
}

.source-row__open {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	min-height: 44px;
	color: var(--consensus-link);
	font-weight: 700;
	text-decoration: none;
}

.source-row__open [class*="i-carbon-"] {
	width: 17px;
	height: 17px;
}

.source-row__details {
	margin-top: 2px;
	border-top: 1px solid var(--consensus-soft-line);
}

.source-row__details > summary {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	min-height: 44px;
	cursor: pointer;
	list-style: none;
	color: var(--consensus-link);
	font-size: 0.88rem;
	font-weight: 700;
}

.source-row__details > summary::-webkit-details-marker {
	display: none;
}

.source-row__details-chevron {
	width: 16px;
	height: 16px;
	transition: transform 160ms ease;
}

.source-row__details[open] .source-row__details-chevron {
	transform: rotate(180deg);
}

.source-row__details-list {
	display: grid;
	grid-template-columns: max-content minmax(0, 1fr);
	gap: 6px 14px;
	margin: 0 0 12px;
	font-size: 0.88rem;
}

.source-row__details-list dt {
	color: var(--consensus-muted);
	font-weight: 700;
}

.source-row__details-list dd {
	margin: 0;
	overflow-wrap: anywhere;
}

.source-row__integrity {
	display: grid;
	gap: 6px;
	padding: 12px 0 2px;
	border-top: 1px solid var(--consensus-soft-line);
}

.source-row__integrity a {
	color: var(--consensus-link);
}

.evidence-summary-card p,
.source-row p,
.change-log__entry p {
	margin: 0;
}

.evidence-summary-card h3,
.source-group__title,
.source-row h4 {
	line-height: 1.22;
}

.evidence-summary-card__badges,
.source-row__badges {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.plain-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.plain-list--tight {
	gap: 8px;
}

.tag {
	display: inline-flex;
	align-items: center;
	padding: 6px 10px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	font-size: 0.78rem;
	font-weight: 600;
}

.tag--anchor {
	border-color: color-mix(in srgb, var(--consensus-community) 34%, var(--consensus-line));
}

.tag--warning {
	border-color: color-mix(in srgb, var(--consensus-caution) 40%, var(--consensus-line));
	background: color-mix(in srgb, var(--consensus-caution) 12%, var(--consensus-elevated-surface));
}

.citation-panel__summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	cursor: pointer;
	list-style: none;
}

.citation-panel__summary::-webkit-details-marker {
	display: none;
}

.citation-panel__summary > span:first-child {
	display: grid;
	gap: 6px;
}

.citation-panel__title {
	font-family: "Fraunces", serif;
	font-size: 1.5rem;
	font-weight: 700;
	line-height: 1.15;
}

.citation-panel__chevron {
	width: 18px;
	height: 18px;
	transition: transform 160ms ease;
}

.citation-panel[open] .citation-panel__chevron {
	transform: rotate(180deg);
}

.citation-panel__body {
	display: grid;
	gap: 14px;
	padding-top: 18px;
}

.citation-panel__body p {
	max-width: 78ch;
	margin: 0;
}

.citation-panel__actions {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.citation-panel__note {
	color: var(--consensus-muted);
	font-size: 0.86rem;
}

.citation-panel__error {
	color: var(--consensus-caution);
}

.change-log-panel__summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	cursor: pointer;
	list-style: none;
}

.change-log-panel__summary::-webkit-details-marker {
	display: none;
}

.change-log-panel__heading {
	display: grid;
	gap: 6px;
}

.change-log-panel__title {
	margin: 0;
	font-family: "Fraunces", serif;
	font-size: 1.5rem;
	font-weight: 700;
	line-height: 1.15;
}

.change-log-panel__meta {
	color: var(--consensus-muted);
	font-size: 0.82rem;
	font-weight: 700;
}

.change-log-panel[open] .change-log-panel__summary {
	margin-bottom: 16px;
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

@media (max-width: 860px) {
	.claim-page {
		gap: 14px;
	}

	.bottom-line {
		grid-template-columns: 1fr;
	}

	.claim-snapshot-grid {
		grid-template-columns: 1fr;
	}

	.collection-memberships,
	.related-claim-grid {
		grid-template-columns: 1fr;
	}

	.claim-page__header,
	.bottom-line,
	.queue-note {
		padding: 14px;
		border-radius: 16px;
	}

	.claim-page__header,
	.bottom-line {
		gap: 10px;
	}

	.uncertainty-strip {
		grid-template-columns: 1fr;
		gap: 10px;
		padding: 14px 0;
	}

	.uncertainty-strip__limits {
		width: 100%;
	}

	.claim-page__hero {
		gap: 7px;
	}

	.claim-page__header h1 {
		margin-top: 4px;
		font-size: clamp(1.72rem, 7.2vw, 2.05rem);
		line-height: 1.02;
	}

	.claim-page__description,
	.claim-page__meta,
	.bottom-line p,
	.section-heading p,
	.plain-list,
	.source-row p,
	.empty-state,
	.muted,
	.field-label,
	.queue-note {
		line-height: 1.5;
	}

	.bottom-line .bottom-line__text {
		margin-top: 6px;
		font-size: 1.02rem;
		line-height: 1.48;
	}

	.bottom-line__context {
		margin-top: 6px;
		line-height: 1.46;
	}

	.section-heading {
		margin-bottom: 12px;
	}

	.content-stack,
	.outcome-summary-section,
	.evidence-summary-list,
	.source-groups,
	.source-list,
	.change-log {
		gap: 12px;
	}

	.claim-snapshot-grid {
		gap: 8px;
	}

	.change-log__entry {
		gap: 11px;
		padding: 14px;
		border-radius: 8px;
	}

	.claim-snapshot-block__summary,
	.evidence-summary-card__summary {
		min-height: 54px;
		padding: 11px 13px;
	}

	.claim-snapshot-block__body,
	.evidence-summary-card__body {
		padding: 12px 13px 14px;
	}

	.evidence-summary-card__summary {
		grid-template-columns: 1fr;
		gap: 8px;
	}

	.evidence-summary-card__badges {
		align-items: center;
	}

	.source-group__summary {
		min-height: 62px;
		padding: 10px 0;
	}

	.source-group__body {
		padding: 2px 0 14px;
	}

	.source-row {
		gap: 10px;
		padding: 14px;
		border-radius: 8px;
	}

	.source-row__open {
		min-height: 40px;
	}

	.plain-list {
		gap: 8px;
		padding-left: 18px;
	}

	.plain-list--tight {
		gap: 6px;
	}

	.tag {
		padding: 5px 8px;
	}

	.bottom-line__actions {
		width: 100%;
		justify-content: start;
		gap: 8px;
	}
}

@media (max-width: 560px) {
	.claim-snapshot-block__summary {
		grid-template-columns: 1fr auto;
	}

	.source-row__details-list {
		grid-template-columns: 1fr;
		gap: 3px;
	}

	.source-row__details-list dd + dt {
		margin-top: 6px;
	}

	.bottom-line__actions {
		display: flex;
		flex-wrap: wrap;
	}

	.bottom-line__actions .button {
		flex: 1 1 140px;
		min-height: 40px;
		padding: 10px 12px;
	}
}
</style>
