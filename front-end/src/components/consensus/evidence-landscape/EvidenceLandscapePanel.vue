<script setup lang="ts">
import type { ClaimEvidenceLandscape } from "~/types/board";
import {
	formatLandscapeCertaintyLabel,
	formatLandscapeDirectionLabel,
	formatLandscapeExpertAgreementLabel,
	formatLandscapeSupportLabel
} from "~/constants/evidenceLandscape";

const props = defineProps<{
	landscape: ClaimEvidenceLandscape;
}>();

const notes = computed(() =>
	[
		{
			key: "answer",
			label: "Plain-language answer",
			value: props.landscape.plainLanguageAnswer
		},
		{
			key: "caveat",
			label: "Important caveat",
			value: props.landscape.caveatSummary
		},
		{
			key: "disagreement",
			label: "Where credible debate remains",
			value: props.landscape.disagreementSummary
		},
		{
			key: "minority",
			label: "Credible minority view",
			value: props.landscape.publicFlags?.showCredibleMinorityView
				? props.landscape.credibleMinorityViewSummary
				: ""
		},
		{
			key: "fringe",
			label: "Why unsupported versions are not weighted equally",
			value: props.landscape.publicFlags?.showFalseBalanceWarning
				? props.landscape.fringeOrUnsupportedViewSummary
				: ""
		},
		{
			key: "change",
			label: "What could change this",
			value: props.landscape.whatWouldChangeThis
		}
	].filter((item) => item.value?.trim())
);

const evidenceBaseStats = computed(() => {
	const size = props.landscape.evidenceBaseSize;
	if (!size) return [];
	return [
		{ key: "included", label: "Included sources", value: size.includedSources },
		{ key: "syntheses", label: "Reviews / meta-analyses", value: size.systematicReviews + size.metaAnalyses },
		{ key: "guidelines", label: "Guidelines / consensus", value: size.evidenceBasedGuidelines },
		{ key: "excluded", label: "Separated sources", value: size.excludedSources }
	].filter((item) => item.value > 0 || item.key === "included");
});

const distributionRows = computed(() => {
	const distribution = props.landscape.distribution;
	if (!distribution) return [];
	const rows = [
		{ key: "support", label: "Supports", bucket: distribution.supportsClaim },
		{ key: "caveats", label: "Supports with caveats", bucket: distribution.supportsWithCaveats },
		{ key: "opposes", label: "Opposes", bucket: distribution.opposesClaim },
		{ key: "mixed", label: "Mixed / inconclusive", bucket: distribution.inconclusiveOrMixed },
		{ key: "background", label: "Background only", bucket: distribution.backgroundContext }
	];
	const maxWeighted = Math.max(...rows.map((row) => row.bucket.weightedCount ?? row.bucket.count), 1);
	return rows
		.filter((row) => row.bucket.count > 0)
		.map((row) => ({
			...row,
			width: `${Math.max(((row.bucket.weightedCount ?? row.bucket.count) / maxWeighted) * 100, 8)}%`
		}));
});

const excludedCounts = computed(() => {
	const distribution = props.landscape.distribution;
	if (!distribution) return [];
	return [
		{ key: "low-quality", label: "Low quality", value: distribution.excludedLowQuality.count },
		{ key: "retracted", label: "Retracted / invalid", value: distribution.excludedRetracted.count },
		{ key: "fringe", label: "Fringe / unsupported", value: distribution.excludedFringe.count }
	].filter((item) => item.value > 0);
});

const applicabilityItems = computed(() => {
	const applicability = props.landscape.applicability;
	if (!applicability) return [];
	return [
		{ key: "population", label: "Population", value: applicability.population },
		{ key: "exposure", label: "Exposure / intervention", value: applicability.exposureOrIntervention },
		{ key: "comparator", label: "Comparator", value: applicability.comparator },
		{ key: "outcomes", label: "Outcomes", value: applicability.outcomes?.join(", ") },
		{ key: "setting", label: "Setting", value: applicability.setting },
		{ key: "timeframe", label: "Timeframe", value: applicability.timeframe }
	].filter((item) => item.value?.trim());
});

const boundaryConditions = computed(
	() => props.landscape.boundaryConditions?.filter((item) => item.label?.trim()) ?? []
);
const showSafetyContext = computed(
	() =>
		props.landscape.publicFlags?.medicalOrPublicHealthSensitive ||
		props.landscape.publicFlags?.requiresProfessionalContext
);
const lastAssessedAt = computed(() => props.landscape.lastAssessedAt || props.landscape.workflow?.lastAssessedAt);
const nextReviewDueAt = computed(() => props.landscape.nextReviewDueAt || props.landscape.workflow?.nextReviewDueAt);

function formatDate(value?: string) {
	if (!value) return "";
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric"
	}).format(new Date(value));
}
</script>

<template>
	<section class="evidence-landscape-panel">
		<div class="evidence-landscape-panel__header">
			<div>
				<p class="eyebrow">Evidence landscape</p>
				<h2>{{ landscape.oneSentenceSummary || formatLandscapeSupportLabel(landscape.supportLabel) }}</h2>
				<p v-if="landscape.plainLanguageAnswer" class="landscape-answer">
					{{ landscape.plainLanguageAnswer }}
				</p>
			</div>
			<div class="evidence-landscape-panel__badges" aria-label="Evidence landscape labels">
				<span class="landscape-badge landscape-badge--support">
					{{ formatLandscapeSupportLabel(landscape.supportLabel) }}
				</span>
				<span class="landscape-badge">
					{{ formatLandscapeCertaintyLabel(landscape.evidenceCertainty) }}
				</span>
				<span class="landscape-badge">
					{{ formatLandscapeExpertAgreementLabel(landscape.expertAgreement) }}
				</span>
				<span v-if="landscape.evidenceDirection" class="landscape-badge">
					{{ formatLandscapeDirectionLabel(landscape.evidenceDirection) }}
				</span>
			</div>
		</div>

		<div v-if="evidenceBaseStats.length" class="landscape-stats" aria-label="Evidence base size">
			<div v-for="item in evidenceBaseStats" :key="item.key" class="landscape-stat">
				<strong>{{ item.value }}</strong>
				<span>{{ item.label }}</span>
			</div>
		</div>

		<section v-if="distributionRows.length" class="landscape-distribution">
			<div class="landscape-section-heading">
				<p class="field-label">Range of credible source positions</p>
				<p>This is weighted by source tier, not counted as a vote.</p>
			</div>
			<div class="distribution-list">
				<div v-for="row in distributionRows" :key="row.key" class="distribution-row">
					<div class="distribution-row__meta">
						<span>{{ row.label }}</span>
						<span>{{ row.bucket.count }} source{{ row.bucket.count === 1 ? "" : "s" }}</span>
					</div>
					<div class="distribution-track" aria-hidden="true">
						<span class="distribution-fill" :style="{ width: row.width }" />
					</div>
				</div>
			</div>
		</section>

		<div v-if="notes.length" class="evidence-landscape-panel__notes">
			<article v-for="note in notes" :key="note.key" class="landscape-note">
				<p class="field-label">{{ note.label }}</p>
				<p>{{ note.value }}</p>
			</article>
		</div>

		<section v-if="boundaryConditions.length || applicabilityItems.length" class="landscape-limits">
			<div v-if="boundaryConditions.length" class="landscape-limit-card">
				<p class="field-label">Boundary conditions</p>
				<ul class="landscape-list">
					<li v-for="boundary in boundaryConditions" :key="`${boundary.dimension}-${boundary.label}`">
						<strong>{{ boundary.label }}:</strong> {{ boundary.explanation }}
					</li>
				</ul>
			</div>
			<div v-if="applicabilityItems.length" class="landscape-limit-card">
				<p class="field-label">Applies to</p>
				<dl class="landscape-definition-list">
					<template v-for="item in applicabilityItems" :key="item.key">
						<dt>{{ item.label }}</dt>
						<dd>{{ item.value }}</dd>
					</template>
				</dl>
			</div>
		</section>

		<p v-if="landscape.publicFlags?.showFalseBalanceWarning" class="landscape-warning">
			This page can describe unsupported or fringe versions of a claim, but it does not give them equal visual
			weight with stronger evidence.
		</p>

		<p v-if="showSafetyContext" class="landscape-warning">
			This is public evidence context, not medical advice. Health or professional decisions should be made with
			qualified clinical or domain-specific guidance.
		</p>

		<div v-if="excludedCounts.length" class="excluded-source-note">
			<p class="field-label">Separated from the evidence distribution</p>
			<p>
				<span v-for="item in excludedCounts" :key="item.key"> {{ item.value }} {{ item.label }} </span>
			</p>
		</div>

		<footer class="evidence-landscape-panel__footer">
			<p>
				This landscape separates support, certainty, and expert agreement. Source counts are not votes, and this
				panel does not automatically decide the public bottom line.
			</p>
			<p v-if="lastAssessedAt || nextReviewDueAt">
				<span v-if="lastAssessedAt"> Assessed {{ formatDate(lastAssessedAt) }} </span>
				<span v-if="nextReviewDueAt"> Next review {{ formatDate(nextReviewDueAt) }} </span>
			</p>
		</footer>
	</section>
</template>

<style scoped>
.evidence-landscape-panel {
	display: grid;
	gap: 18px;
	padding: 22px;
	border: 1px solid color-mix(in srgb, var(--consensus-community) 24%, var(--consensus-soft-line));
	border-radius: 22px;
	background:
		linear-gradient(135deg, color-mix(in srgb, var(--consensus-community-soft) 24%, transparent), transparent 42%),
		var(--consensus-surface);
}

.evidence-landscape-panel__header,
.evidence-landscape-panel__footer {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: start;
}

.evidence-landscape-panel h2 {
	margin: 6px 0 0;
	font-family: "Fraunces", serif;
	font-size: clamp(1.7rem, 3vw, 2.45rem);
	line-height: 1.05;
}

.landscape-answer {
	max-width: 76ch;
	margin: 12px 0 0;
	color: var(--consensus-ink);
	font-size: 1.02rem;
	line-height: 1.65;
}

.evidence-landscape-panel__badges,
.evidence-landscape-panel__footer p:last-child {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.landscape-stats {
	display: grid;
	grid-template-columns: repeat(4, minmax(0, 1fr));
	gap: 10px;
}

.landscape-stat {
	display: grid;
	gap: 2px;
	padding: 14px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 16px;
	background: color-mix(in srgb, var(--consensus-field-surface) 84%, var(--consensus-community-soft) 16%);
}

.landscape-stat strong {
	font-family: "Fraunces", serif;
	font-size: 1.9rem;
	line-height: 1;
}

.landscape-stat span {
	color: var(--consensus-muted);
	font-size: 0.8rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.landscape-badge {
	display: inline-flex;
	align-items: center;
	padding: 7px 11px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	font-size: 0.78rem;
	font-weight: 700;
}

.landscape-badge--support {
	border-color: color-mix(in srgb, var(--consensus-community) 42%, var(--consensus-line));
}

.landscape-distribution,
.landscape-limits,
.excluded-source-note {
	display: grid;
	gap: 12px;
	padding: 16px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
	background: var(--consensus-field-surface);
}

.landscape-section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.landscape-section-heading p,
.excluded-source-note p {
	margin: 0;
}

.landscape-section-heading p:last-child,
.excluded-source-note p:last-child {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.distribution-list {
	display: grid;
	gap: 10px;
}

.distribution-row {
	display: grid;
	gap: 7px;
}

.distribution-row__meta {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	color: var(--consensus-muted);
	font-size: 0.86rem;
	font-weight: 700;
}

.distribution-track {
	overflow: hidden;
	height: 10px;
	border-radius: 999px;
	background: var(--consensus-elevated-surface);
}

.distribution-fill {
	display: block;
	height: 100%;
	border-radius: inherit;
	background: linear-gradient(90deg, var(--consensus-community), var(--consensus-accent));
}

.evidence-landscape-panel__notes {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.landscape-note {
	display: grid;
	gap: 6px;
	padding: 15px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 16px;
	background: var(--consensus-field-surface);
}

.landscape-note p,
.landscape-warning,
.evidence-landscape-panel__footer p {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.65;
}

.landscape-note p:last-child {
	color: var(--consensus-ink);
}

.landscape-limits {
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.landscape-limit-card {
	display: grid;
	gap: 10px;
}

.landscape-list {
	display: grid;
	gap: 8px;
	margin: 0;
	padding-left: 20px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.landscape-list strong {
	color: var(--consensus-ink);
}

.landscape-definition-list {
	display: grid;
	grid-template-columns: max-content minmax(0, 1fr);
	gap: 8px 12px;
	margin: 0;
}

.landscape-definition-list dt {
	color: var(--consensus-muted);
	font-size: 0.82rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

.landscape-definition-list dd {
	margin: 0;
	color: var(--consensus-ink);
	line-height: 1.45;
}

.landscape-warning {
	padding: 14px 16px;
	border-radius: 16px;
	background: color-mix(in srgb, var(--consensus-caution) 12%, var(--consensus-field-surface));
	border: 1px solid color-mix(in srgb, var(--consensus-caution) 35%, var(--consensus-soft-line));
}

.excluded-source-note p:last-child {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.excluded-source-note span {
	display: inline-flex;
	padding: 5px 9px;
	border-radius: 999px;
	border: 1px solid color-mix(in srgb, var(--consensus-caution) 28%, var(--consensus-line));
	background: color-mix(in srgb, var(--consensus-caution) 10%, var(--consensus-elevated-surface));
}

.field-label {
	font-size: 0.82rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

@media (max-width: 760px) {
	.landscape-stats,
	.landscape-limits {
		grid-template-columns: 1fr;
	}

	.evidence-landscape-panel__notes {
		grid-template-columns: 1fr;
	}
}
</style>
