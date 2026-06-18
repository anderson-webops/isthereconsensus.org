<script setup lang="ts">
import type { ClaimEvidenceLandscape } from "~/types/board";
import {
	formatLandscapeCertaintyLabel,
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
			</div>
		</div>

		<div v-if="notes.length" class="evidence-landscape-panel__notes">
			<article v-for="note in notes" :key="note.key" class="landscape-note">
				<p class="field-label">{{ note.label }}</p>
				<p>{{ note.value }}</p>
			</article>
		</div>

		<p v-if="landscape.publicFlags?.showFalseBalanceWarning" class="landscape-warning">
			This page can describe unsupported or fringe versions of a claim, but it does not give them equal visual
			weight with stronger evidence.
		</p>

		<footer class="evidence-landscape-panel__footer">
			<p>
				This landscape separates support, certainty, and expert agreement. Source counts are not votes, and this
				panel does not automatically decide the public bottom line.
			</p>
			<p v-if="landscape.workflow?.lastAssessedAt || landscape.workflow?.nextReviewDueAt">
				<span v-if="landscape.workflow?.lastAssessedAt">
					Assessed {{ formatDate(landscape.workflow.lastAssessedAt) }}
				</span>
				<span v-if="landscape.workflow?.nextReviewDueAt">
					Next review {{ formatDate(landscape.workflow.nextReviewDueAt) }}
				</span>
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

.evidence-landscape-panel__badges,
.evidence-landscape-panel__footer p:last-child {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
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

.landscape-warning {
	padding: 14px 16px;
	border-radius: 16px;
	background: color-mix(in srgb, var(--consensus-caution) 12%, var(--consensus-field-surface));
	border: 1px solid color-mix(in srgb, var(--consensus-caution) 35%, var(--consensus-soft-line));
}

.field-label {
	font-size: 0.82rem;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}

@media (max-width: 760px) {
	.evidence-landscape-panel__notes {
		grid-template-columns: 1fr;
	}
}
</style>
