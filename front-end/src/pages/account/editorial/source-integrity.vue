<script setup lang="ts">
import type { SourceIntegrityOutcome, SourceIntegrityResponse } from "~/types/platform";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { safeExternalHttpUrl } from "~/utils/external-links";
import { formatCountLabel } from "~/utils/format-count";

definePageMeta({
	layout: "home"
});

useStaticPageMeta({
	description: "Admin-only source-integrity monitoring activity and maintenance queue.",
	path: "/account/editorial/source-integrity",
	robots: "noindex, nofollow",
	title: "Source integrity - Is There Consensus?"
});

const { apiUrl } = useApi();
const { role, ready } = useAuth();
const isAdmin = computed(() => role.value === "admin");
const loading = ref(false);
const errorMessage = ref("");
const outcome = ref("");
const response = ref<SourceIntegrityResponse>({
	summary: {
		monitoredSourceCount: 0,
		uncheckedSourceCount: 0,
		staleSourceCount: 0,
		flaggedSourceCount: 0,
		recentSignalCount: 0,
		recentErrorCount: 0,
		staleDays: 30
	},
	checks: [],
	pagination: {
		page: 1,
		limit: 25,
		total: 0,
		hasMore: false
	}
});
const outcomes: SourceIntegrityOutcome[] = [
	"retracted",
	"expression_of_concern",
	"corrected",
	"error",
	"unsupported",
	"no_registered_update"
];

function formatDate(value?: string) {
	if (!value) return "Not yet";
	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(new Date(value));
}

function formatOutcome(value: SourceIntegrityOutcome) {
	if (value === "no_registered_update") return "No registered update";
	if (value === "expression_of_concern") return "Expression of concern";
	return value.charAt(0).toUpperCase() + value.slice(1);
}

function outcomeClass(value: SourceIntegrityOutcome) {
	if (value === "retracted" || value === "expression_of_concern") return "signal signal--critical";
	if (value === "corrected" || value === "error") return "signal signal--attention";
	return "signal";
}

function formatSignalType(value: string) {
	const normalized = value.replaceAll("_", " ");
	return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

async function loadChecks(page = response.value.pagination.page) {
	if (!import.meta.client || !isAdmin.value) return;
	loading.value = true;
	errorMessage.value = "";
	try {
		const params = new URLSearchParams({
			limit: String(response.value.pagination.limit),
			page: String(page)
		});
		if (outcome.value) params.set("outcome", outcome.value);
		response.value = await $fetch<SourceIntegrityResponse>(apiUrl(`/admin/source-integrity?${params}`), {
			credentials: "include"
		});
	} catch {
		errorMessage.value = "Unable to load source-integrity activity.";
	} finally {
		loading.value = false;
	}
}

watch(
	() => [ready.value, isAdmin.value],
	([authReady, admin]) => {
		if (authReady && admin) void loadChecks(1);
	},
	{ immediate: true }
);
</script>

<template>
	<main class="integrity-page">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Account', to: '/account' },
				{ label: 'Editorial workspace', to: '/account/editorial' },
				{ label: 'Source integrity' }
			]"
		/>

		<header class="integrity-header">
			<div>
				<p class="eyebrow">Evidence operations</p>
				<h1>Source integrity</h1>
				<p>
					Crossref update metadata is checked in bounded batches. Retractions, corrections, and expressions of
					concern enter the human review queue; an empty result is not treated as proof that a paper is valid.
				</p>
			</div>
			<button v-if="isAdmin" class="button button--ghost" type="button" :disabled="loading" @click="loadChecks()">
				{{ loading ? "Refreshing..." : "Refresh" }}
			</button>
		</header>

		<section v-if="!ready" class="integrity-panel" aria-live="polite">
			<h2>Checking access...</h2>
		</section>

		<section v-else-if="!isAdmin" class="integrity-panel">
			<h2>Admin access required.</h2>
			<p>Source-integrity activity is operational data available only to administrators.</p>
			<NuxtLink class="button button--primary" to="/account">Go to account</NuxtLink>
		</section>

		<template v-else>
			<section class="summary-grid" aria-label="Source integrity summary">
				<article>
					<span>DOI sources monitored</span>
					<strong>{{ response.summary.monitoredSourceCount }}</strong>
				</article>
				<article>
					<span>Stale or unchecked</span>
					<strong>{{ response.summary.staleSourceCount + response.summary.uncheckedSourceCount }}</strong>
				</article>
				<article>
					<span>Flagged sources</span>
					<strong>{{ response.summary.flaggedSourceCount }}</strong>
				</article>
				<article>
					<span>Recent signals</span>
					<strong>{{ response.summary.recentSignalCount }}</strong>
				</article>
				<article>
					<span>Recent check errors</span>
					<strong>{{ response.summary.recentErrorCount }}</strong>
				</article>
				<article>
					<span>Latest check</span>
					<strong class="summary-date">{{ formatDate(response.summary.latestCheckAt) }}</strong>
				</article>
			</section>

			<section class="integrity-panel">
				<div class="panel-heading">
					<div>
						<h2>Check history</h2>
						<p>
							{{ formatCountLabel(response.pagination.total, "record") }} retained for audit and triage.
						</p>
					</div>
					<label>
						<span>Outcome</span>
						<select v-model="outcome" @change="loadChecks(1)">
							<option value="">All outcomes</option>
							<option v-for="item in outcomes" :key="item" :value="item">
								{{ formatOutcome(item) }}
							</option>
						</select>
					</label>
				</div>

				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
				<div v-if="!response.checks.length && !loading" class="empty-state">
					No source checks match this filter yet.
				</div>
				<div v-else class="check-list">
					<article v-for="check in response.checks" :key="check._id" class="check-card">
						<div class="check-card__heading">
							<div>
								<span :class="outcomeClass(check.outcome)">{{ formatOutcome(check.outcome) }}</span>
								<h3>{{ check.source?.title || "Source no longer present" }}</h3>
							</div>
							<time :datetime="check.checkedAt">{{ formatDate(check.checkedAt) }}</time>
						</div>
						<p v-if="check.doi" class="check-card__doi">DOI {{ check.doi }}</p>
						<p v-if="check.claim">
							Review:
							<NuxtLink
								v-if="check.claim.topic?.slug"
								:to="`/consensus/${check.claim.topic.slug}/${check.claim.slug}`"
							>
								{{ check.claim.title }}
							</NuxtLink>
							<span v-else>{{ check.claim.title }}</span>
						</p>
						<ul v-if="check.signals.length" class="signal-list">
							<li v-for="signal in check.signals" :key="`${signal.type}-${signal.noticeDoi}`">
								<strong>{{ signal.label || formatSignalType(signal.type) }}</strong>
								<span v-if="signal.source"> via {{ signal.source }}</span>
								<a
									v-if="safeExternalHttpUrl(signal.url)"
									:href="safeExternalHttpUrl(signal.url)"
									target="_blank"
									rel="noopener noreferrer"
								>
									Open notice
								</a>
							</li>
						</ul>
						<p v-if="check.diagnosticCode" class="check-card__diagnostic">
							Diagnostic: {{ check.diagnosticCode }}
						</p>
					</article>
				</div>

				<footer class="pagination-row">
					<span>Page {{ response.pagination.page }}</span>
					<div>
						<button
							class="button button--ghost"
							type="button"
							:disabled="loading || response.pagination.page <= 1"
							@click="loadChecks(response.pagination.page - 1)"
						>
							Previous
						</button>
						<button
							class="button button--ghost"
							type="button"
							:disabled="loading || !response.pagination.hasMore"
							@click="loadChecks(response.pagination.page + 1)"
						>
							Next
						</button>
					</div>
				</footer>
			</section>
		</template>
	</main>
</template>

<style scoped>
.integrity-page {
	max-width: 1180px;
	margin: 0 auto;
	padding: 32px 20px 56px;
	display: grid;
	gap: 18px;
}

.integrity-header,
.integrity-panel,
.summary-grid article {
	border: 1px solid var(--consensus-soft-line);
	background: var(--consensus-surface);
}

.integrity-header,
.integrity-panel {
	padding: 24px;
	border-radius: 20px;
}

.integrity-header,
.panel-heading,
.check-card__heading,
.pagination-row,
.pagination-row > div {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
}

.integrity-header h1,
.integrity-header p,
.panel-heading h2,
.panel-heading p,
.check-card h3,
.check-card p {
	margin: 0;
}

.integrity-header > div {
	display: grid;
	gap: 8px;
	max-width: 74ch;
}

.summary-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 12px;
}

.summary-grid article {
	display: grid;
	gap: 8px;
	padding: 16px;
	border-radius: 14px;
}

.summary-grid span,
.check-card time,
.check-card__doi,
.check-card__diagnostic,
.panel-heading p {
	color: var(--consensus-muted);
}

.summary-grid strong {
	font-size: 1.7rem;
}

.summary-grid .summary-date {
	font-size: 1rem;
}

.panel-heading label {
	display: grid;
	gap: 5px;
	font-weight: 700;
}

.panel-heading select {
	min-height: 42px;
	padding: 8px 12px;
	border: 1px solid var(--consensus-line);
	border-radius: 8px;
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
}

.check-list {
	display: grid;
	gap: 12px;
	margin-top: 18px;
}

.check-card {
	display: grid;
	gap: 10px;
	padding: 16px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 12px;
	background: var(--consensus-elevated-surface);
}

.check-card__heading > div {
	display: grid;
	gap: 8px;
}

.signal {
	width: fit-content;
	padding: 4px 8px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	font-size: 0.75rem;
	font-weight: 800;
}

.signal--critical {
	border-color: color-mix(in srgb, var(--consensus-caution) 62%, var(--consensus-line));
	background: color-mix(in srgb, var(--consensus-caution) 13%, transparent);
}

.signal--attention {
	border-color: color-mix(in srgb, var(--consensus-interactive) 46%, var(--consensus-line));
}

.signal-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 8px;
}

.signal-list a,
.check-card a {
	color: var(--consensus-link);
}

.signal-list a {
	margin-left: 8px;
}

.pagination-row {
	margin-top: 18px;
}

@media (max-width: 760px) {
	.integrity-page {
		padding: 18px 12px 40px;
	}

	.integrity-header,
	.panel-heading,
	.check-card__heading,
	.pagination-row {
		align-items: stretch;
		flex-direction: column;
	}

	.summary-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
	}

	.integrity-header .button,
	.panel-heading label {
		width: 100%;
	}
}
</style>
