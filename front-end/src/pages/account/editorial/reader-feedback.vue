<script setup lang="ts">
import type { FeedbackResponse, FeedbackRow } from "~/types/reader-feedback";
import { comparisonForSlug, evidenceComparisons } from "~/data/comparisons";
import { feedbackKindLabels, feedbackPriorityLabels, feedbackStatusLabels } from "~/types/reader-feedback";
import { safeExternalHttpUrl } from "~/utils/external-links";

definePageMeta({ layout: "home" });
useStaticPageMeta({
	title: "Reader feedback - Is There Consensus?",
	description: "Admin-only reader feedback and editorial priorities.",
	path: "/account/editorial/reader-feedback",
	robots: "noindex, nofollow"
});
const { apiUrl } = useApi();
const { ready, role, currentAccount, refreshAuth } = useAuth();
const isAdmin = computed(() => ready.value && role.value === "admin");
const rows = ref<FeedbackRow[]>([]);
const pagination = ref({ page: 1, limit: 25, total: 0, hasMore: false });
const status = ref("new");
const kind = ref("");
const priority = ref("");
const comparisonSlug = ref("");
const busy = ref(false);
const errorMessage = ref("");
const notice = ref("");
const editing = ref<FeedbackRow | null>(null);
const reviewStatus = ref<FeedbackRow["status"]>("reviewing");
const reviewPriority = ref(1);
const note = ref("");
const linkedClaimId = ref<string | null>(null);
const linkedTopicId = ref<string | null>(null);
const linkLabel = ref("");
const targetQuery = ref("");
const targets = ref<Array<{ _id: string; title: string; type: "claim" | "topic" }>>([]);
let generation = 0;
let controller: AbortController | undefined;

async function request<T>(path: string, body?: Record<string, unknown>) {
	controller?.abort();
	controller = new AbortController();
	try {
		return await $fetch<T>(apiUrl(path), {
			method: body ? "PATCH" : "GET",
			body,
			signal: controller.signal,
			credentials: "include",
			retry: 0
		});
	} catch (error) {
		if ((error as { statusCode?: number }).statusCode === 403) {
			rows.value = [];
			editing.value = null;
			targets.value = [];
			await refreshAuth();
		}
		throw error;
	}
}
function requestError(error: unknown, fallback: string) {
	return (error as { data?: { error?: string } }).data?.error || fallback;
}
async function load(page = 1) {
	if (!isAdmin.value || import.meta.server) return;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	const params = new URLSearchParams({ page: String(page), limit: String(pagination.value.limit) });
	if (status.value) params.set("status", status.value);
	if (kind.value) params.set("kind", kind.value);
	if (priority.value) params.set("priority", priority.value);
	if (comparisonSlug.value) params.set("comparisonSlug", comparisonSlug.value);
	try {
		const result = await request<FeedbackResponse>(`/admin/reader-feedback?${params}`);
		if (run !== generation) return;
		rows.value = result.rows;
		pagination.value = result.pagination;
		editing.value = null;
	} catch (error) {
		if (run === generation)
			errorMessage.value = requestError(error, "The queue could not be loaded. Please retry.");
	} finally {
		if (run === generation) busy.value = false;
	}
}
function edit(row: FeedbackRow) {
	editing.value = row;
	reviewStatus.value = row.status === "new" ? "reviewing" : row.status;
	reviewPriority.value = row.priority;
	note.value = "";
	targets.value = [];
	targetQuery.value = "";
	linkedClaimId.value = row.linkedClaimId ?? null;
	linkedTopicId.value = row.linkedTopicId ?? null;
	linkLabel.value = row.linkedClaimId
		? "Existing linked review"
		: row.linkedTopicId
			? "Existing linked topic"
			: "No destination linked";
	errorMessage.value = "";
	notice.value = "";
}
async function searchTargets() {
	if (!isAdmin.value || busy.value) return;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	try {
		const result = await request<{
			claims: Array<{ _id: string; title: string }>;
			topics: Array<{ _id: string; title: string }>;
		}>(`/admin/reader-feedback/targets?query=${encodeURIComponent(targetQuery.value)}`);
		if (run !== generation) return;
		targets.value = [
			...result.claims.map((item) => ({ ...item, type: "claim" as const })),
			...result.topics.map((item) => ({ ...item, type: "topic" as const }))
		];
		if (!targets.value.length) notice.value = "No destinations match. Try another word.";
	} catch (error) {
		if (run === generation) errorMessage.value = requestError(error, "Destinations could not be loaded.");
	} finally {
		if (run === generation) busy.value = false;
	}
}
async function save() {
	if (!isAdmin.value || busy.value || !editing.value) return;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	try {
		await request(`/admin/reader-feedback/${editing.value._id}`, {
			revision: editing.value.revision,
			status: reviewStatus.value,
			priority: reviewPriority.value,
			note: note.value,
			linkedClaimId: linkedClaimId.value,
			linkedTopicId: linkedTopicId.value
		});
		if (run !== generation) return;
		notice.value = "Editorial priority saved. No scientific conclusion or publication state was changed.";
		await load(pagination.value.page);
	} catch (error) {
		if (run === generation)
			errorMessage.value = requestError(error, "The change was not confirmed saved. Reload before retrying.");
	} finally {
		if (run === generation) busy.value = false;
	}
}
function chooseTarget(target: (typeof targets.value)[number]) {
	linkedClaimId.value = target.type === "claim" ? target._id : null;
	linkedTopicId.value = target.type === "topic" ? target._id : null;
	linkLabel.value = target.title;
	targets.value = [];
}
watch(
	[ready, role, () => currentAccount.value?._id],
	() => {
		generation++;
		controller?.abort();
		rows.value = [];
		editing.value = null;
		targets.value = [];
		errorMessage.value = "";
		notice.value = "";
		busy.value = false;
		pagination.value = { page: 1, limit: 25, total: 0, hasMore: false };
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
	<div class="feedback-queue">
		<NuxtLink to="/account/editorial">Back to editorial workspace</NuxtLink>
		<header>
			<h1>Reader feedback</h1>
			<p>
				Use explanation feedback and evidence gaps to plan editorial work. These are submissions, not votes on
				scientific agreement or counts of unique people.
			</p>
		</header>
		<p v-if="!ready">Checking access…</p>
		<p v-else-if="!isAdmin">This queue is only available to admins. <NuxtLink to="/account">Sign in</NuxtLink></p>
		<template v-else>
			<form class="feedback-queue__filters" @submit.prevent="load()">
				<label
					>Status<select v-model="status" :disabled="busy">
						<option value="">All statuses</option>
						<option v-for="(label, value) in feedbackStatusLabels" :key="value" :value="value">
							{{ label }}
						</option>
					</select></label
				>
				<label
					>Feedback type<select v-model="kind" :disabled="busy">
						<option value="">All types</option>
						<option v-for="(label, value) in feedbackKindLabels" :key="value" :value="value">
							{{ label }}
						</option>
					</select></label
				>
				<label
					>Priority<select v-model="priority" :disabled="busy">
						<option value="">All priorities</option>
						<option v-for="(label, index) in feedbackPriorityLabels" :key="label" :value="String(index)">
							{{ label }}
						</option>
					</select></label
				>
				<label
					>Comparison<select v-model="comparisonSlug" name="comparison-filter" :disabled="busy">
						<option value="">All feedback</option>
						<option
							v-for="comparison in evidenceComparisons"
							:key="comparison.slug"
							:value="comparison.slug"
						>
							{{ comparison.title }}
						</option>
					</select></label
				>
				<button class="button button--ghost" type="submit" :disabled="busy">Apply filters / reload</button>
			</form>
			<p role="status">
				{{
					busy
						? "Loading…"
						: notice || `${pagination.total} matching submissions. High priority first, then newest.`
				}}
			</p>
			<p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
			<p v-if="!busy && !errorMessage && !rows.length">No reader feedback matches these filters.</p>
			<article v-for="row in rows" :key="row._id" class="feedback-queue__card">
				<p>
					{{ feedbackKindLabels[row.kind] }} · {{ feedbackStatusLabels[row.status] }} ·
					{{ feedbackPriorityLabels[row.priority] }} priority ·
					{{ new Date(row.createdAt).toLocaleDateString() }}
				</p>
				<h2>{{ row.title || row.referenceTitle || "Review feedback" }}</h2>
				<p v-if="row.kind === 'usefulness'">
					{{ row.helpful ? "The explanation was useful." : "The explanation was not useful yet." }}
				</p>
				<p v-if="row.area">Missing: {{ row.area }}</p>
				<p v-if="row.message" class="feedback-queue__message">{{ row.message }}</p>
				<div class="feedback-queue__links">
					<NuxtLink
						v-if="row.comparisonSlug && comparisonForSlug(row.comparisonSlug)"
						:to="`/compare/${row.comparisonSlug}`"
						>Open original comparison</NuxtLink
					>
					<span v-else-if="row.comparisonSlug">Original comparison is no longer public.</span>
					<NuxtLink v-if="row.claimId" :to="`/account/editorial/claims/${row.claimId}`"
						>Open original review</NuxtLink
					>
					<a
						v-if="safeExternalHttpUrl(row.sourceUrl)"
						:href="safeExternalHttpUrl(row.sourceUrl)"
						target="_blank"
						rel="noopener noreferrer"
						>Submitted source link</a
					>
					<NuxtLink v-if="row.linkedClaimId" :to="`/account/editorial/claims/${row.linkedClaimId}`"
						>Open linked review</NuxtLink
					>
					<NuxtLink v-if="row.linkedTopic" :to="`/consensus/${row.linkedTopic.slug}`"
						>Linked topic: {{ row.linkedTopic.title }}</NuxtLink
					>
				</div>
				<details v-if="row.reviews.length">
					<summary>Editorial review history ({{ row.reviews.length }})</summary>
					<div v-for="(review, index) in row.reviews" :key="index">
						<p>
							{{ feedbackStatusLabels[review.status] }} · {{ feedbackPriorityLabels[review.priority] }} ·
							{{ new Date(review.date).toLocaleDateString() }}
						</p>
						<p class="feedback-queue__message">{{ review.note }}</p>
					</div>
				</details>
				<button
					v-if="editing?._id !== row._id"
					class="button button--ghost"
					type="button"
					:disabled="busy"
					@click="edit(row)"
				>
					Review feedback
				</button>
				<form v-else class="feedback-queue__review" @submit.prevent="save">
					<label
						>Review status<select v-model="reviewStatus" :disabled="busy">
							<option v-for="(label, value) in feedbackStatusLabels" :key="value" :value="value">
								{{ label }}
							</option>
						</select></label
					>
					<label
						>Editorial priority<select v-model.number="reviewPriority" :disabled="busy">
							<option v-for="(label, index) in feedbackPriorityLabels" :key="label" :value="index">
								{{ label }}
							</option>
						</select></label
					>
					<label
						>Reason / next action (10-1,000 characters)<textarea
							v-model="note"
							:disabled="busy"
							name="review-note"
							minlength="10"
							maxlength="1000"
							required
							rows="3"
						/>
					</label>
					<label
						>Find a review or topic to link<input
							v-model="targetQuery"
							:disabled="busy"
							name="target-query"
							maxlength="100"
					/></label>
					<div>
						<button type="button" :disabled="busy || targetQuery.trim().length < 3" @click="searchTargets">
							Find destination
						</button>
					</div>
					<div v-if="targets.length" class="feedback-queue__targets">
						<button v-for="target in targets" :key="target._id" type="button" @click="chooseTarget(target)">
							{{ target.type === "claim" ? "Review" : "Topic" }}: {{ target.title }}
						</button>
					</div>
					<p>
						{{ linkLabel }}
						<button
							v-if="linkedClaimId || linkedTopicId"
							type="button"
							@click="
								linkedClaimId = null;
								linkedTopicId = null;
								linkLabel = 'No destination linked';
							"
						>
							Remove link
						</button>
					</p>
					<div class="feedback-queue__links">
						<button class="button button--primary" type="submit" :disabled="busy">
							Save editorial review</button
						><button type="button" :disabled="busy" @click="editing = null">Cancel</button>
					</div>
				</form>
			</article>
			<nav aria-label="Feedback pages" class="feedback-queue__links">
				<button type="button" :disabled="busy || pagination.page === 1" @click="load(pagination.page - 1)">
					Previous page</button
				><span>Page {{ pagination.page }}</span
				><button type="button" :disabled="busy || !pagination.hasMore" @click="load(pagination.page + 1)">
					Next page
				</button>
			</nav>
		</template>
	</div>
</template>

<style scoped>
.feedback-queue {
	display: grid;
	gap: 1.25rem;
	font-size: 1rem;
}
.feedback-queue h1 {
	font-family: "Fraunces", serif;
	font-size: var(--consensus-page-title-size);
}
.feedback-queue h2 {
	font-size: 1.25rem;
}
.feedback-queue__filters,
.feedback-queue__links {
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	align-items: end;
}
.feedback-queue__card {
	display: grid;
	gap: 1rem;
	padding: 1.25rem;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 1rem;
	background: var(--consensus-surface);
	min-width: 0;
}
.feedback-queue label,
.feedback-queue__review,
.feedback-queue__targets {
	display: grid;
	gap: 0.6rem;
	min-width: 0;
}
.feedback-queue__filters label {
	max-width: 100%;
}
.feedback-queue__review {
	max-width: 48rem;
}
.feedback-queue button {
	min-height: 2.75rem;
	border: 1px solid var(--consensus-line);
	border-radius: 0.6rem;
	padding: 0.6rem 0.9rem;
	text-align: start;
}
.feedback-queue input,
.feedback-queue select,
.feedback-queue textarea {
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
.feedback-queue__message {
	white-space: pre-wrap;
	overflow-wrap: anywhere;
}
.feedback-queue button:disabled {
	opacity: 0.65;
	cursor: default;
}
.feedback-queue :focus-visible {
	outline: 2px solid var(--consensus-focus-outline);
	outline-offset: 3px;
}
</style>
