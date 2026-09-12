<script setup lang="ts">
import type { NoticeRow, PriorityDetail, PriorityResponse } from "~/types/review-priority";
import { priorityReasonLabels } from "~/types/review-priority";
import { safeExternalHttpUrl } from "~/utils/external-links";

definePageMeta({ layout: "home" });
useStaticPageMeta({
	title: "Review priorities - Is There Consensus?",
	description: "Admin review scheduling and source-notice decisions.",
	path: "/account/editorial/review-priority",
	robots: "noindex, nofollow"
});
const { apiUrl } = useApi();
const { ready, role, currentAccount, refreshAuth } = useAuth();
const isAdmin = computed(() => ready.value && role.value === "admin");
function emptyQueue(): PriorityResponse {
	return {
		evaluatedAt: "",
		rows: [],
		pagination: { page: 1, limit: 25, total: 0, hasMore: false }
	};
}
const result = ref(emptyQueue());
const detail = ref<PriorityDetail | null>(null);
const detailHeading = ref<HTMLElement | null>(null);
const reason = ref("attention");
const query = ref("");
const busy = ref(false);
const errorMessage = ref("");
const notice = ref("");
const nextDate = ref("");
const scheduleNote = ref("");
const sourceNotes = ref<Record<string, string>>({});
let generation = 0;
let controller: AbortController | undefined;

function formatDate(value?: string | null) {
	if (!value) return "Not recorded";
	const date = new Date(value);
	return Number.isFinite(date.getTime())
		? new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeZone: "UTC" }).format(date)
		: "Needs verification";
}
function noticeLabel(source: Pick<NoticeRow, "snapshot">) {
	const labels: string[] = [];
	if (source.snapshot.retracted || source.snapshot.citationStatus === "retracted") labels.push("Retraction");
	if (source.snapshot.expressionOfConcern || source.snapshot.citationStatus === "expression_of_concern")
		labels.push("Expression of concern");
	if (source.snapshot.correctionOrErratum || source.snapshot.citationStatus === "corrected")
		labels.push("Correction");
	return labels.join(", ");
}
async function request<T>(path: string, body?: Record<string, unknown>) {
	controller?.abort();
	controller = new AbortController();
	try {
		return await $fetch<T>(apiUrl(path), {
			method: body ? "PATCH" : "GET",
			body,
			credentials: "include",
			signal: controller.signal,
			retry: 0
		});
	} catch (error) {
		if ((error as { statusCode?: number }).statusCode === 403) {
			result.value = emptyQueue();
			detail.value = null;
			sourceNotes.value = {};
			scheduleNote.value = "";
			await refreshAuth();
		}
		throw error;
	}
}
function reportError(error: unknown) {
	errorMessage.value =
		(error as { data?: { error?: string } }).data?.error ||
		"The request was not confirmed. Reload before retrying.";
}
function setDetail(value: PriorityDetail) {
	detail.value = value;
	nextDate.value = value.claim.nextReviewAt?.slice(0, 10) ?? "";
	scheduleNote.value = "";
	sourceNotes.value = {};
}
async function load(page = 1, keepId?: string) {
	if (import.meta.server || !isAdmin.value) return;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	if (!keepId) detail.value = null;
	try {
		const params = new URLSearchParams({
			page: String(page),
			limit: "25",
			reason: reason.value,
			query: query.value
		});
		const rows = await request<PriorityResponse>(`/admin/review-priority?${params}`);
		if (run !== generation) return;
		result.value = rows;
		if (keepId) {
			const selected = await request<PriorityDetail>(`/admin/review-priority/${keepId}`);
			if (run === generation) setDetail(selected);
		}
	} catch (error) {
		if (run === generation) reportError(error);
	} finally {
		if (run === generation) busy.value = false;
	}
}
async function openReview(id: string, sourcePage = 1) {
	if (!isAdmin.value || busy.value) return;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	notice.value = "";
	detail.value = null;
	try {
		const selected = await request<PriorityDetail>(`/admin/review-priority/${id}?sourcePage=${sourcePage}`);
		if (run === generation) {
			setDetail(selected);
			await nextTick();
			if (run === generation) detailHeading.value?.focus();
		}
	} catch (error) {
		if (run === generation) reportError(error);
	} finally {
		if (run === generation) busy.value = false;
	}
}
async function save(path: string, body: Record<string, unknown>, message: string) {
	if (!isAdmin.value || busy.value || !detail.value) return;
	const id = detail.value.claim._id;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	notice.value = "";
	try {
		await request(path, body);
		if (run !== generation) return;
		notice.value = message;
		await load(result.value.pagination.page, id);
	} catch (error) {
		if (run === generation) reportError(error);
	} finally {
		if (run === generation) busy.value = false;
	}
}
function saveSchedule() {
	if (!detail.value) return;
	void save(
		`/admin/review-priority/${detail.value.claim._id}/schedule`,
		{
			revision: detail.value.schedule.revision,
			expectedNextReviewAt: detail.value.claim.nextReviewAt ?? null,
			nextReviewAt: nextDate.value || null,
			note: scheduleNote.value
		},
		"Schedule saved. The recorded scientific review date has not changed."
	);
}
function decide(source: NoticeRow) {
	if (!detail.value) return;
	void save(
		`/admin/review-priority/${detail.value.claim._id}/sources/${source._id}`,
		{
			revision: source.revision,
			fingerprint: source.fingerprint,
			decision: source.addressed ? "open" : "addressed",
			note: sourceNotes.value[source._id] ?? ""
		},
		"Decision recorded. The citation warning and scientific conclusion remain unchanged."
	);
}
watch(
	[ready, role, () => currentAccount.value?._id],
	() => {
		generation++;
		controller?.abort();
		result.value = emptyQueue();
		detail.value = null;
		sourceNotes.value = {};
		scheduleNote.value = "";
		nextDate.value = "";
		query.value = "";
		errorMessage.value = "";
		notice.value = "";
		busy.value = false;
		if (import.meta.client && isAdmin.value) void load();
	},
	{ immediate: true, flush: "sync" }
);
onBeforeUnmount(() => {
	generation++;
	controller?.abort();
});
</script>

<template>
	<div class="review-priority">
		<NuxtLink to="/account/editorial">Back to editorial workspace</NuxtLink>
		<header>
			<p class="eyebrow">Evidence maintenance</p>
			<h1>Review priorities</h1>
			<p>
				See what needs attention and record the next step. Priority reflects review work, not whether a
				scientific claim is true.
			</p>
		</header>
		<p v-if="!ready">Checking access...</p>
		<p v-else-if="!isAdmin">This queue is only available to admins. <NuxtLink to="/account">Sign in</NuxtLink></p>
		<template v-else>
			<form class="priority-filters" @submit.prevent="load()">
				<label
					>Show<select v-model="reason" :disabled="busy">
						<option value="attention">Needs attention</option>
						<option v-for="(label, value) in priorityReasonLabels" :key="value" :value="value">
							{{ label }}
						</option>
						<option value="all">All published reviews</option>
					</select></label
				>
				<label>Find a review<input v-model="query" type="search" maxlength="100" :disabled="busy" /></label>
				<button class="button button--ghost" type="submit" :disabled="busy">
					{{ busy ? "Loading..." : "Apply filters" }}
				</button>
			</form>
			<p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
			<p v-if="notice" role="status">{{ notice }}</p>
			<p aria-live="polite">
				{{ result.pagination.total }} {{ result.pagination.total === 1 ? "review" : "reviews" }} match.
				<NuxtLink to="/account/editorial/reader-feedback">All reader feedback</NuxtLink> ·
				<NuxtLink to="/account/editorial/source-integrity">Source-check history</NuxtLink>
			</p>
			<div
				v-if="result.rows.length"
				class="priority-table"
				tabindex="0"
				role="region"
				aria-label="Review priority table"
			>
				<table>
					<caption class="sr-only">
						Reviews ordered by source notices, requested updates, deadlines, reader requests and date
						issues.
					</caption>
					<thead>
						<tr>
							<th scope="col">Review</th>
							<th scope="col">Needs attention</th>
							<th scope="col">Next review</th>
							<th scope="col">Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="row in result.rows" :key="row._id">
							<th scope="row">
								<span>{{ row.topic?.title }}</span
								>{{ row.title }}
							</th>
							<td>
								<ul v-if="row.reasons.length">
									<li v-for="item in row.reasons" :key="item">
										{{ priorityReasonLabels[item]
										}}<template v-if="item === 'source_notice'">
											({{ row.openNoticeCount }})</template
										><template v-if="item === 'evidence_request'">
											({{ row.feedbackCount }})</template
										>
									</li>
								</ul>
								<span v-else>No open task recorded</span>
							</td>
							<td>{{ formatDate(row.nextReviewAt) }}</td>
							<td>
								<button
									class="button button--ghost"
									type="button"
									:disabled="busy"
									:aria-label="`Manage review: ${row.title}`"
									@click="openReview(row._id)"
								>
									Manage
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p v-else-if="!busy && !errorMessage">
				No reviews match these filters. Choose all published reviews to schedule one.
			</p>
			<nav class="priority-pagination" aria-label="Review queue pages">
				<button
					type="button"
					:disabled="busy || result.pagination.page <= 1"
					@click="load(result.pagination.page - 1)"
				>
					Previous</button
				><span>Page {{ result.pagination.page }}</span
				><button
					type="button"
					:disabled="busy || !result.pagination.hasMore"
					@click="load(result.pagination.page + 1)"
				>
					Next
				</button>
			</nav>
			<section v-if="detail" class="priority-detail" aria-labelledby="selected-review-title">
				<header>
					<h2 id="selected-review-title" ref="detailHeading" tabindex="-1">{{ detail.claim.title }}</h2>
					<p>
						<NuxtLink :to="`/account/editorial/claims/${detail.claim._id}`">Open editorial review</NuxtLink>
						·
						<NuxtLink :to="`/account/editorial/reader-feedback?reviewId=${detail.claim._id}`"
							>Review reader evidence requests</NuxtLink
						>
					</p>
				</header>
				<p>
					Recorded review date: {{ formatDate(detail.claim.reviewStatus.reviewedAt) }}. Literature cutoff:
					{{ formatDate(detail.claim.reviewStatus.searchCutoffAt) }}.
				</p>
				<p v-if="detail.claim.reviewStatus.basis === 'unspecified'">
					The origin of the recorded review date is unknown. Scheduling does not establish a completed review.
				</p>
				<ul v-if="detail.claim.reviewStatus.issues.length">
					<li v-for="issue in detail.claim.reviewStatus.issues" :key="issue">{{ issue }}</li>
				</ul>
				<form class="schedule-form" @submit.prevent="saveSchedule">
					<h3>Schedule the next review</h3>
					<label>Next review date (UTC)<input v-model="nextDate" type="date" :disabled="busy" /></label>
					<p>
						Leave the date empty to remove the deadline. Source notices and reader requests remain in the
						queue.
					</p>
					<label
						>Reason for this schedule<textarea
							v-model="scheduleNote"
							required
							minlength="20"
							maxlength="1000"
							rows="3"
							:disabled="busy"
						/></label
					><button class="button button--primary" :disabled="busy || scheduleNote.trim().length < 20">
						Save schedule
					</button>
				</form>
				<details v-if="detail.schedule.history.length">
					<summary>Schedule history</summary>
					<p>The most recent {{ detail.historyLimit }} actions are retained.</p>
					<ol>
						<li v-for="(entry, index) in [...detail.schedule.history].reverse()" :key="index">
							<strong>{{ formatDate(entry.date) }}</strong
							>: {{ formatDate(entry.previousAt) }} →
							{{ entry.nextAt ? formatDate(entry.nextAt) : "Unscheduled" }}
							<p>{{ entry.note }}</p>
							<p>Recorded by {{ entry.adminName || "Former admin" }} ({{ entry.adminId }}).</p>
						</li>
					</ol>
				</details>
				<h3>Source notices</h3>
				<p>
					Record how each notice was assessed. Marking it handled keeps the citation warning visible. A
					changed notice needs a fresh decision.
				</p>
				<p v-if="!detail.pagination.total">
					No citation warnings are recorded for this review. This does not establish that every source has
					been checked.
				</p>
				<article v-for="source in detail.sources" :key="source._id" class="source-notice">
					<h4>{{ source.title }}</h4>
					<p>
						{{ source.addressed ? "Handled for the current notice" : "Needs assessment" }} ·
						{{ noticeLabel(source) }}
					</p>
					<p v-if="source.snapshot.integrityNotes">{{ source.snapshot.integrityNotes }}</p>
					<ul>
						<li
							v-for="url in source.snapshot.statusSources.filter((value) => safeExternalHttpUrl(value))"
							:key="url"
						>
							<a :href="safeExternalHttpUrl(url)" target="_blank" rel="noopener noreferrer">{{ url }}</a>
						</li>
					</ul>
					<form @submit.prevent="decide(source)">
						<label
							>Assessment and next step<textarea
								v-model="sourceNotes[source._id]"
								required
								minlength="20"
								maxlength="1000"
								rows="3"
								:disabled="busy"
							/></label
						><button
							class="button button--ghost"
							:disabled="busy || (sourceNotes[source._id]?.trim().length ?? 0) < 20"
						>
							{{ source.addressed ? "Reopen notice" : "Mark notice handled" }}
						</button>
					</form>
					<details v-if="source.history.length">
						<summary>Decision history</summary>
						<p>The most recent {{ detail.historyLimit }} actions are retained.</p>
						<ol>
							<li v-for="(entry, index) in [...source.history].reverse()" :key="index">
								<strong
									>{{ formatDate(entry.date) }}:
									{{ entry.decision === "addressed" ? "Handled" : "Reopened" }}</strong
								>
								<p>{{ entry.note }}</p>
								<p>Recorded by {{ entry.adminName || "Former admin" }} ({{ entry.adminId }}).</p>
								<p>Notice assessed: {{ noticeLabel({ snapshot: entry.snapshot }) }}.</p>
								<ul>
									<li
										v-for="url in entry.snapshot.statusSources.filter((value) =>
											safeExternalHttpUrl(value)
										)"
										:key="url"
									>
										<a :href="safeExternalHttpUrl(url)" target="_blank" rel="noopener noreferrer">{{
											url
										}}</a>
									</li>
								</ul>
							</li>
						</ol>
					</details>
				</article>
				<nav
					v-if="detail.pagination.total > detail.pagination.limit"
					class="priority-pagination"
					aria-label="Source notice pages"
				>
					<button
						:disabled="busy || detail.pagination.page <= 1"
						@click="openReview(detail.claim._id, detail.pagination.page - 1)"
					>
						Previous notices</button
					><span>Page {{ detail.pagination.page }}</span
					><button
						:disabled="busy || !detail.pagination.hasMore"
						@click="openReview(detail.claim._id, detail.pagination.page + 1)"
					>
						Next notices
					</button>
				</nav>
			</section>
		</template>
	</div>
</template>

<style scoped>
.review-priority {
	display: grid;
	gap: 1.25rem;
	max-width: 76rem;
	margin: 0 auto;
}
.review-priority header {
	display: grid;
	gap: 0.5rem;
}
.review-priority h1 {
	font-family: "Fraunces", serif;
	font-size: var(--consensus-page-title-size);
	line-height: 1.15;
}
.review-priority h2 {
	font-family: "Fraunces", serif;
	font-size: 1.5rem;
}
.review-priority h3 {
	font-size: 1.15rem;
	font-weight: 700;
}
.review-priority h4 {
	font-weight: 700;
}
.review-priority button {
	min-height: 2.75rem;
	border: 1px solid var(--consensus-line);
	border-radius: 0.6rem;
	padding: 0.6rem 0.9rem;
	text-align: start;
}
.review-priority input,
.review-priority select,
.review-priority textarea {
	width: 100%;
	min-width: 0;
	min-height: 2.75rem;
	border: 1px solid var(--consensus-line);
	border-radius: 0.5rem;
	padding: 0.6rem;
	background: var(--consensus-field-surface);
	color: var(--consensus-ink);
	font: inherit;
}
.review-priority button:disabled {
	opacity: 0.65;
	cursor: default;
}
.review-priority :focus-visible {
	outline: 2px solid var(--consensus-focus-outline);
	outline-offset: 3px;
}
.priority-filters {
	display: flex;
	flex-wrap: wrap;
	align-items: end;
	gap: 1rem;
}
.review-priority label {
	display: grid;
	gap: 0.4rem;
	min-width: 0;
}
.priority-filters label {
	flex: 1 1 15rem;
}
.priority-table {
	overflow-x: auto;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 1rem;
}
table {
	width: 100%;
	min-width: 42rem;
	border-collapse: collapse;
	text-align: left;
}
th,
td {
	padding: 1rem;
	border-bottom: 1px solid var(--consensus-soft-line);
	vertical-align: top;
}
tbody th {
	width: 40%;
	font-weight: 600;
}
tbody th span {
	display: block;
	color: var(--consensus-muted);
	font-size: 0.85rem;
	font-weight: 400;
	margin-bottom: 0.35rem;
}
td ul {
	margin: 0;
	padding-left: 1.1rem;
}
.priority-pagination {
	display: flex;
	align-items: center;
	gap: 1rem;
	flex-wrap: wrap;
}
.priority-pagination button {
	min-height: 2.75rem;
}
.priority-detail {
	display: grid;
	gap: 1rem;
	padding: clamp(1rem, 3vw, 2rem);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 1rem;
	background: var(--consensus-surface);
}
.schedule-form,
.source-notice,
.source-notice form {
	display: grid;
	gap: 0.8rem;
	align-content: start;
}
.schedule-form {
	max-width: 40rem;
}
.schedule-form input {
	width: min(100%, 16rem);
}
.schedule-form button,
.source-notice button {
	justify-self: start;
}
.source-notice {
	padding-top: 1rem;
	border-top: 1px solid var(--consensus-soft-line);
}
.source-notice a,
.priority-detail li {
	overflow-wrap: anywhere;
}
.priority-detail details {
	padding: 0.7rem 0;
}
.priority-detail details li {
	margin-top: 0.75rem;
}
</style>
