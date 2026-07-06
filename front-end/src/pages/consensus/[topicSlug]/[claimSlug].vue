<script setup lang="ts">
import type { Claim, ClaimResponse, ClaimSource } from "~/types/board";
import EvidenceLandscapePanel from "~/components/consensus/evidence-landscape/EvidenceLandscapePanel.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { formatCountLabel } from "~/utils/format-count";

interface ClaimRouteParams {
	topicSlug?: string | string[];
	claimSlug?: string | string[];
}

const route = useRoute();
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
const canEditClaim = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
const pageUrl = computed(() => `https://isthereconsensus.org/consensus/${topicSlug.value}/${claimSlug.value}`);
const pageDescription = computed(() => claim.value?.bottomLine || "Evidence-backed claim review.");
const evidenceSummaries = computed(() => claim.value?.evidenceSummaries ?? []);
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
			key: "misconceptions",
			eyebrow: "Reader traps",
			title: "Common misconceptions",
			items: claim.value?.misconceptions ?? []
		},
		{
			key: "open-questions",
			eyebrow: "Open questions",
			title: "What remains open",
			items: claim.value?.openQuestions ?? []
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
const claimMeta = computed(() => [
	formatBandLabel(claim.value?.consensusBand),
	formatEvidenceCertaintyLabel(claim.value?.evidenceCertainty),
	formatCountLabel(sourceCount.value, "source"),
	`Reviewed ${formatDate(claim.value?.lastReviewedAt, "Pending")}`
]);
const evidenceSectionTitle = computed(() =>
	claimSnapshotGroups.value.length ? "Claim snapshot" : "Evidence summaries by outcome"
);
const evidenceSectionDescription = computed(() =>
	claimSnapshotGroups.value.length
		? "A concise view of what is stable, what is easy to misread, and what could still change."
		: "Each summary captures the question, the finding, and the main limitations."
);

const uncertaintySummary = computed(() => {
	if (claim.value?.uncertaintySummary?.trim()) {
		return claim.value.uncertaintySummary.trim();
	}
	if (claim.value?.evidenceCertainty === "high") {
		return "High certainty means the broader evidence stack looks stable and would probably need a substantial new synthesis to move.";
	}
	if (claim.value?.evidenceCertainty === "moderate") {
		return "Moderate certainty means the overall direction looks reliable, but size, subgroup details, or implementation details could still move.";
	}
	if (claim.value?.evidenceCertainty === "low") {
		return "Low certainty means the current direction is tentative enough that stronger direct evidence could still reshape the page.";
	}
	if (claim.value?.evidenceCertainty === "very_low") {
		return "Very low certainty means this is an unstable evidence base and should be read as a careful snapshot, not a durable settled answer.";
	}
	return "A plain-language uncertainty summary is not available yet.";
});

const uncertaintyLimits = computed(() => {
	const driverDetails = uncertaintyDrivers.value.map((driver) => driver.detail.trim()).filter(Boolean);
	if (driverDetails.length) {
		return Array.from(new Set(driverDetails)).slice(0, 6);
	}
	return Array.from(
		new Set(
			evidenceSummaries.value
				.flatMap((summary) => summary.limitations || [])
				.map((item) => item.trim())
				.filter(Boolean)
		)
	).slice(0, 6);
});

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
	reviewedBy: claim.value?.reviewerLine
		? {
				"@type": "Person",
				name: claim.value.reviewerLine
			}
		: undefined,
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
		innerHTML: JSON.stringify(entry),
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

		<section class="bottom-line">
			<div>
				<h2>Bottom line</h2>
				<p class="bottom-line__text">{{ claim?.bottomLine }}</p>
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

		<EvidenceLandscapePanel v-if="evidenceLandscape" :landscape="evidenceLandscape" />

		<section class="uncertainty-strip">
			<div>
				<p class="eyebrow">Uncertainty and limits</p>
				<h2>{{ formatEvidenceCertaintyLabel(claim?.evidenceCertainty) }}</h2>
				<p>{{ uncertaintySummary }}</p>
			</div>
			<div v-if="uncertaintyLimits.length">
				<p class="field-label">Main limits</p>
				<ul class="plain-list plain-list--tight">
					<li v-for="item in uncertaintyLimits" :key="item">{{ item }}</li>
				</ul>
			</div>
		</section>

		<section class="content-stack">
			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Outcome view</p>
						<h2>{{ evidenceSectionTitle }}</h2>
					</div>
					<p>{{ evidenceSectionDescription }}</p>
				</div>

				<div v-if="claimSnapshotGroups.length" class="claim-snapshot-grid">
					<article v-for="group in claimSnapshotGroups" :key="group.key" class="claim-snapshot-block">
						<p class="eyebrow">{{ group.eyebrow }}</p>
						<h3>{{ group.title }}</h3>
						<ul class="plain-list plain-list--tight">
							<li v-for="item in group.items" :key="item">{{ item }}</li>
						</ul>
					</article>
				</div>

				<div v-if="evidenceSummaries.length" class="outcome-summary-section">
					<div v-if="claimSnapshotGroups.length" class="section-subheading">
						<h3>Outcome summaries</h3>
						<p>Each summary captures the question, the finding, and the main limitations.</p>
					</div>
					<div class="evidence-summary-list">
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
				</div>
				<div v-else-if="!claimSnapshotGroups.length" class="empty-state">
					No outcome-level evidence summaries are attached yet.
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Evidence trail</p>
						<h2>Source stack</h2>
					</div>
					<p>Grouped so the most decision-relevant sources appear first.</p>
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
								<span class="source-group__title">{{ group.title }}</span>
								<span class="source-group__description">{{ group.description }}</span>
							</span>
							<span class="source-group__summary-meta">
								<span class="source-group__count">
									{{ formatCountLabel(group.items.length, "source") }}
								</span>
								<span class="source-group__toggle" aria-hidden="true" />
							</span>
						</summary>
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
					</details>
				</div>
			</section>

			<section class="content-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Corrections and updates</p>
						<h2>Change log</h2>
					</div>
					<p>What changed and when.</p>
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
	</div>
</template>

<style scoped>
.claim-page {
	display: grid;
	gap: 22px;
}

.claim-page__header,
.bottom-line,
.uncertainty-strip,
.content-panel,
.queue-note {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
	padding: 22px;
}

.claim-page__header,
.bottom-line,
.uncertainty-strip {
	display: grid;
	gap: 18px;
}

.claim-page__hero {
	display: grid;
	gap: 10px;
}

.claim-page__header h1,
.bottom-line h2,
.section-heading h2,
.section-subheading h3,
.claim-snapshot-block h3,
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
.section-subheading p,
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

.uncertainty-strip > div > p:not(.eyebrow):not(.field-label) {
	max-width: 68ch;
}

.bottom-line__actions,
.evidence-summary-card__top,
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
.section-subheading p,
.source-group__description {
	max-width: 58ch;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.section-subheading {
	display: grid;
	gap: 6px;
	padding-top: 2px;
}

.section-subheading h3,
.section-subheading p {
	margin: 0;
}

.content-stack,
.outcome-summary-section,
.evidence-summary-list,
.source-groups,
.source-list,
.change-log {
	display: grid;
	gap: 16px;
}

.claim-snapshot-grid {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	align-items: start;
	gap: 16px;
}

.evidence-summary-card,
.claim-snapshot-block,
.source-group,
.change-log__entry {
	display: grid;
	gap: 14px;
	padding: 18px;
	border-radius: 16px;
	background: var(--consensus-field-surface);
	border: 1px solid var(--consensus-soft-line);
}

.source-row {
	padding: 16px;
	border-radius: 14px;
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
}

.source-group__summary {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 14px;
	align-items: start;
	cursor: pointer;
	list-style: none;
}

.source-group__summary::-webkit-details-marker {
	display: none;
}

.source-group__summary-copy {
	display: grid;
	gap: 6px;
	min-width: 0;
}

.source-group__title {
	color: var(--consensus-ink);
	line-height: 1.22;
}

.source-group__description {
	display: block;
}

.source-group__summary-meta {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	justify-content: end;
}

.source-group__count {
	display: inline-flex;
	align-items: center;
	min-height: 28px;
	padding: 5px 9px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-elevated-surface);
	color: var(--consensus-muted);
	font-size: 0.78rem;
	font-weight: 700;
	white-space: nowrap;
}

.source-group__toggle {
	display: inline-grid;
	place-items: center;
	width: 28px;
	height: 28px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	font-weight: 800;
}

.source-group__toggle::before {
	content: "+";
}

.source-group[open] .source-group__toggle::before {
	content: "-";
}

.source-group[open] .source-list {
	margin-top: 14px;
}

.evidence-summary-card p,
.claim-snapshot-block p,
.source-row p,
.change-log__entry p {
	margin: 0;
}

.evidence-summary-card h3,
.section-subheading h3,
.claim-snapshot-block h3,
.source-group__title,
.source-row h4 {
	line-height: 1.22;
}

.evidence-summary-card__badges,
.source-row__badges,
.source-row__identifiers {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.source-row__identifiers span,
.source-row h4 {
	overflow-wrap: anywhere;
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

	.claim-page__header,
	.bottom-line,
	.uncertainty-strip,
	.content-panel,
	.queue-note {
		padding: 14px;
		border-radius: 16px;
	}

	.claim-page__header,
	.bottom-line,
	.uncertainty-strip {
		gap: 10px;
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
	.section-subheading p,
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
		gap: 12px;
	}

	.evidence-summary-card,
	.claim-snapshot-block,
	.source-group,
	.change-log__entry {
		gap: 11px;
		padding: 14px;
		border-radius: 14px;
	}

	.source-row {
		gap: 12px;
		padding: 14px;
		border-radius: 12px;
	}

	.source-group__summary {
		grid-template-columns: 1fr;
		gap: 10px;
	}

	.source-group__summary-meta {
		justify-content: space-between;
		width: 100%;
	}

	.source-group[open] .source-list {
		margin-top: 12px;
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
