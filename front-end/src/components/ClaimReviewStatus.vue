<script setup lang="ts">
import type { Claim } from "~/types/board";
import { claimReviewStatus, formatReviewDate, reviewStatusLabels } from "~/utils/claim-review-status";

const props = defineProps<{ claim: Claim }>();
// Preserve SSR/client agreement when a backend predating this field is served.
const evaluatedAt = useState("review-status-evaluated-at", () => new Date().toISOString());
const status = computed(
	() => props.claim.reviewStatus ?? claimReviewStatus(props.claim, props.claim.sources, new Date(evaluatedAt.value))
);
const dateLabel = computed(() =>
	status.value.basis === "editorial_review"
		? "Editorial review"
		: status.value.basis === "source_record"
			? "Source record"
			: "Review date recorded"
);
function openHistory() {
	const history = document.getElementById("claim-history");
	if (history instanceof HTMLDetailsElement) history.open = true;
}
</script>

<template>
	<details id="review-status" class="review-status">
		<summary>
			<span class="review-status__heading"
				>Review status <span>{{ reviewStatusLabels[status.state] }}</span></span
			>
			<span class="review-status__date">{{ dateLabel }}: {{ formatReviewDate(status.reviewedAt) }}</span>
		</summary>
		<div class="review-status__body">
			<p v-if="status.basis === 'unspecified'">
				The origin of this review date was not recorded. Some older imports used their import date, so this date
				alone does not confirm a completed scientific review.
			</p>
			<p v-else-if="status.basis === 'source_record'">
				This date was supplied with the published content. It does not establish an independent expert review.
			</p>
			<p v-else>
				This date was recorded through the site's editorial publication or review workflow. The reviewer
				disclosure describes who performed the review.
			</p>
			<p v-if="claim.reviewerLine" class="review-status__reviewer">{{ claim.reviewerLine }}</p>
			<p v-if="status.state === 'due'">
				The scheduled follow-up is due. This alone does not mean the conclusion is wrong.
			</p>
			<p v-if="status.flaggedSourceCount">
				{{ status.flaggedSourceCount }} {{ status.flaggedSourceCount === 1 ? "source has" : "sources have" }} a
				correction, retraction or concern notice recorded. Consult the source notes and review history for its
				significance.
			</p>
			<ul v-if="status.issues.length">
				<li v-for="issue in status.issues" :key="issue">{{ issue }}</li>
			</ul>
			<dl>
				<div>
					<dt>{{ dateLabel }}</dt>
					<dd>
						<time v-if="status.reviewedAt" :datetime="status.reviewedAt">{{
							formatReviewDate(status.reviewedAt)
						}}</time
						><span v-else>Not recorded or needs verification</span>
					</dd>
				</div>
				<div>
					<dt>Literature cutoff recorded</dt>
					<dd>
						<time v-if="status.searchCutoffAt" :datetime="status.searchCutoffAt">{{
							formatReviewDate(status.searchCutoffAt)
						}}</time
						><span v-else>Not recorded or needs verification</span>
					</dd>
				</div>
				<div>
					<dt>Next follow-up</dt>
					<dd>
						<time v-if="status.nextReviewAt" :datetime="status.nextReviewAt">{{
							formatReviewDate(status.nextReviewAt)
						}}</time
						><span v-else>Not scheduled</span>
					</dd>
				</div>
				<div>
					<dt>Source check dates recorded</dt>
					<dd>
						{{ status.sourceChecks.recorded }} of {{ status.sourceChecks.total }} displayed sources<span
							v-if="status.sourceChecks.oldest"
							>; earliest {{ formatReviewDate(status.sourceChecks.oldest) }}, latest
							{{ formatReviewDate(status.sourceChecks.latest) }}</span
						>
					</dd>
				</div>
			</dl>
			<p>
				The literature cutoff records the search boundary, not a guarantee of complete coverage. Source checks
				concern publication notices, not a fresh assessment of the conclusion. Imported dates may lack check
				provenance; no warning does not prove a source is valid.
			</p>
			<p>Formatting changes do not count as a new evidence review. All dates are shown in UTC.</p>
			<div class="review-status__links">
				<a href="#claim-sources">Read source notes</a
				><a href="#claim-history" @click="openHistory">Read change log</a>
			</div>
		</div>
	</details>
</template>

<style scoped>
.review-status {
	border-block: 1px solid var(--consensus-soft-line);
	min-width: 0;
}
summary {
	cursor: pointer;
	padding: 16px 0;
}
.review-status__heading {
	font-weight: 700;
}
.review-status__heading > span {
	margin-left: 12px;
	color: var(--consensus-muted);
	font-size: 0.88rem;
	font-weight: 500;
}
.review-status__date {
	display: block;
	margin: 6px 0 0 18px;
	color: var(--consensus-muted);
	font-size: 0.88rem;
}
.review-status__body {
	display: grid;
	gap: 14px;
	padding: 0 0 18px;
}
.review-status__body p,
.review-status__body ul {
	margin: 0;
	max-width: 76ch;
	font-size: 0.94rem;
	line-height: 1.6;
}
.review-status__reviewer {
	color: var(--consensus-muted);
}
dl {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 18px;
	margin: 0;
}
dt {
	font-weight: 700;
	font-size: 0.88rem;
}
dd {
	margin: 5px 0 0;
	color: var(--consensus-muted);
	font-size: 0.94rem;
}
.review-status__links {
	display: flex;
	flex-wrap: wrap;
	gap: 12px 24px;
}
.review-status__body,
dd {
	overflow-wrap: anywhere;
}
@media (max-width: 560px) {
	dl {
		grid-template-columns: 1fr;
	}
	.review-status__heading > span {
		display: block;
		margin: 6px 0 0 18px;
	}
}
</style>
