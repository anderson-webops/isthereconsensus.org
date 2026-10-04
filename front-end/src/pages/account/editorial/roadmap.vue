<script setup lang="ts">
import type { AdminCoverageRequest, CoverageResponse } from "~/types/coverage-roadmap";
import { coverageStatusLabels, coverageVisibilityLabels } from "~/types/coverage-roadmap";

definePageMeta({ layout: "home" });
useStaticPageMeta({
	title: "Coverage moderation - Is There Consensus?",
	description: "Admin-only approval of public research questions.",
	path: "/account/editorial/roadmap",
	robots: "noindex, nofollow"
});
const { apiUrl } = useApi();
const { ready, role, currentAccount, refreshAuth } = useAuth();
const route = useRoute();
const isAdmin = computed(() => ready.value && role.value === "admin");
const feedbackId = computed(() =>
	typeof route.query.feedbackId === "string" && /^[a-f\d]{64}$/.test(route.query.feedbackId)
		? route.query.feedbackId
		: ""
);
const rows = ref<AdminCoverageRequest[]>([]);
const pagination = ref({ page: 1, limit: 20, total: 0, hasMore: false });
const visibilityFilter = ref("");
const editing = ref<AdminCoverageRequest | null>(null);
const title = ref("");
const summary = ref("");
const requestStatus = ref<AdminCoverageRequest["status"]>("planned");
const topicId = ref<string | null>(null);
const claimId = ref<string | null>(null);
const privateNote = ref("");
const publicUpdateSummary = ref("");
const publicSummaryApproved = ref(false);
const busy = ref(false);
const mustReload = ref(false);
const notice = ref("");
const errorMessage = ref("");
const targetQuery = ref("");
const targets = ref<Array<{ _id: string; title: string; type: "claim" | "topic" }>>([]);
let generation = 0;
let controller: AbortController | undefined;

function reset() {
	editing.value = null;
	title.value = "";
	summary.value = "";
	requestStatus.value = "planned";
	topicId.value = null;
	claimId.value = null;
	privateNote.value = "";
	publicUpdateSummary.value = "";
	publicSummaryApproved.value = false;
	targets.value = [];
	targetQuery.value = "";
}
function edit(row: AdminCoverageRequest) {
	reset();
	editing.value = row;
	title.value = row.title;
	summary.value = row.summary;
	requestStatus.value = row.status;
	topicId.value = row.topicId;
	claimId.value = row.claimId;
}
async function request<Result>(path: string, method: "GET" | "POST" | "PATCH" = "GET", body?: Record<string, unknown>) {
	controller?.abort();
	controller = new AbortController();
	try {
		return await $fetch<Result>(apiUrl(path), {
			method,
			body,
			credentials: "include",
			retry: 0,
			signal: controller.signal
		});
	} catch (error) {
		if ((error as { statusCode?: number }).statusCode === 403) {
			rows.value = [];
			reset();
			await refreshAuth();
		}
		throw error;
	}
}
function errorText(error: unknown, fallback: string) {
	return (error as { data?: { error?: string } }).data?.error || fallback;
}
async function load(page = 1) {
	if (!isAdmin.value || import.meta.server || busy.value) return;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	try {
		const params = new URLSearchParams({ page: String(page), limit: "20" });
		if (visibilityFilter.value) params.set("visibility", visibilityFilter.value);
		const result = await request<CoverageResponse<AdminCoverageRequest>>(`/admin/coverage?${params}`);
		if (run !== generation) return;
		rows.value = result.rows;
		pagination.value = result.pagination;
		mustReload.value = false;
		reset();
	} catch (error) {
		if (run === generation) errorMessage.value = errorText(error, "The moderation queue could not be loaded.");
	} finally {
		if (run === generation) busy.value = false;
	}
}
async function searchTargets() {
	if (!isAdmin.value || busy.value || targetQuery.value.trim().length < 3) return;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	try {
		const result = await request<{
			claims: Array<{ _id: string; title: string; status: string }>;
			topics: Array<{ _id: string; title: string }>;
		}>(`/admin/reader-feedback/targets?query=${encodeURIComponent(targetQuery.value)}`);
		if (run !== generation) return;
		targets.value = [
			...result.claims
				.filter((item) => item.status === "published")
				.map((item) => ({ ...item, type: "claim" as const })),
			...result.topics.map((item) => ({ ...item, type: "topic" as const }))
		];
	} catch (error) {
		if (run === generation) errorMessage.value = errorText(error, "Destinations could not be loaded.");
	} finally {
		if (run === generation) busy.value = false;
	}
}
async function save(operation: "save" | "approve" | "withdraw" = "save") {
	if (!isAdmin.value || busy.value || mustReload.value) return;
	const run = ++generation;
	busy.value = true;
	errorMessage.value = "";
	notice.value = "";
	const existing = editing.value;
	try {
		const fields = {
			title: title.value,
			summary: summary.value,
			status: requestStatus.value,
			topicId: topicId.value,
			claimId: claimId.value,
			privateNote: privateNote.value
		};
		const result = await request<{ row: AdminCoverageRequest }>(
			existing ? `/admin/coverage/${existing._id}` : "/admin/coverage",
			existing ? "PATCH" : "POST",
			existing
				? {
						...fields,
						revision: existing.revision,
						operation,
						publicSummaryApproved: publicSummaryApproved.value,
						publicUpdateSummary: publicUpdateSummary.value
					}
				: { ...fields, ...(feedbackId.value ? { feedbackId: feedbackId.value } : {}) }
		);
		if (run !== generation) return;
		edit(result.row);
		rows.value = [result.row, ...rows.value.filter((row) => row._id !== result.row._id)];
		notice.value =
			result.row.visibility === "public"
				? "Approved summary saved on the public roadmap. No scientific conclusion was changed."
				: result.row.visibility === "withdrawn"
					? "The request is withdrawn from the public roadmap."
					: "Private draft saved. Review the public preview before approving it.";
	} catch (error) {
		if (run !== generation) return;
		const statusCode = (error as { statusCode?: number }).statusCode;
		mustReload.value = statusCode === 409 || !statusCode || statusCode >= 500;
		errorMessage.value = errorText(error, "The change was not confirmed saved. Reload before retrying.");
	} finally {
		if (run === generation) busy.value = false;
	}
}
watch(
	[ready, role, () => currentAccount.value?._id, feedbackId],
	() => {
		++generation;
		controller?.abort();
		rows.value = [];
		reset();
		busy.value = false;
		mustReload.value = false;
		errorMessage.value = "";
		notice.value = "";
		if (isAdmin.value) void load();
	},
	{ immediate: true }
);
onScopeDispose(() => {
	++generation;
	controller?.abort();
});
</script>

<template>
	<div class="coverage-moderation">
		<header>
			<p class="eyebrow">Admin editorial workspace</p>
			<h1>Coverage moderation</h1>
			<p>
				Write a separate public question and scope. Never copy personal details or private messages into the
				public preview.
			</p>
			<NuxtLink to="/account/editorial/reader-feedback">Return to private reader suggestions</NuxtLink>
		</header>
		<p v-if="!ready" role="status">Checking account…</p>
		<p v-else-if="!isAdmin">Only administrators can approve the public coverage roadmap.</p>
		<template v-else>
			<form class="coverage-moderation__controls" @submit.prevent="load()">
				<label
					>Visibility<select v-model="visibilityFilter" :disabled="busy">
						<option value="">All requests</option>
						<option v-for="(label, value) in coverageVisibilityLabels" :key="value" :value="value">
							{{ label }}
						</option>
					</select></label
				>
				<button class="button button--ghost" :disabled="busy">Reload queue</button>
				<button class="button button--ghost" type="button" :disabled="busy || mustReload" @click="reset()">
					New private draft
				</button>
			</form>
			<p v-if="notice || busy" role="status">{{ busy ? "Working…" : notice }}</p>
			<p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
			<p v-if="mustReload">
				Reload the queue before another write. The previous change may already have been saved.
			</p>
			<form class="coverage-moderation__editor" @submit.prevent="save()">
				<h2>{{ editing ? "Edit coverage request" : "Create a private draft" }}</h2>
				<p v-if="feedbackId && !editing" class="muted">
					This draft will reference the selected private suggestion. Its text is not copied.
				</p>
				<p v-if="editing">
					{{ coverageVisibilityLabels[editing.visibility] }} · revision {{ editing.revision }}
				</p>
				<fieldset :disabled="busy || mustReload">
					<label
						>Public question<input
							v-model="title"
							name="coverage-title"
							required
							minlength="10"
							maxlength="200"
					/></label>
					<label
						>Public scope summary<textarea
							v-model="summary"
							name="coverage-summary"
							required
							minlength="40"
							maxlength="1200"
							rows="4"
						/>
					</label>
					<label
						>Research status<select v-model="requestStatus" name="coverage-status">
							<option v-for="(label, value) in coverageStatusLabels" :key="value" :value="value">
								{{ label }}
							</option>
						</select></label
					>
					<label
						>Find a topic or published review<input
							v-model="targetQuery"
							name="coverage-target-query"
							maxlength="100"
					/></label>
					<button class="button button--ghost" type="button" @click="searchTargets()">
						Find destinations
					</button>
					<ul v-if="targets.length">
						<li v-for="target in targets" :key="`${target.type}:${target._id}`">
							<button
								class="button button--ghost"
								type="button"
								@click="target.type === 'claim' ? (claimId = target._id) : (topicId = target._id)"
							>
								Link {{ target.type === "claim" ? "answer" : "topic" }}: {{ target.title }}
							</button>
						</li>
					</ul>
					<p>
						Linked topic: {{ topicId || "none" }}
						<button v-if="topicId" type="button" class="button button--ghost" @click="topicId = null">
							Remove topic
						</button>
					</p>
					<p>
						Linked answer: {{ claimId || "none" }}
						<button v-if="claimId" type="button" class="button button--ghost" @click="claimId = null">
							Remove answer
						</button>
					</p>
					<p class="muted">
						Published status requires an available reviewed answer. Linking never publishes or edits that
						answer.
					</p>
					<label
						>Private audit note<textarea
							v-model="privateNote"
							name="coverage-private-note"
							required
							minlength="10"
							maxlength="1000"
							rows="2"
						/>
					</label>
					<section class="coverage-moderation__preview" aria-label="Public summary preview">
						<p class="eyebrow">Public preview</p>
						<h3>{{ title || "Question title" }}</h3>
						<p>{{ summary || "Approved research scope will appear here." }}</p>
						<p>{{ coverageStatusLabels[requestStatus] }}</p>
					</section>
					<template v-if="editing">
						<label
							>Public progress explanation<textarea
								v-model="publicUpdateSummary"
								name="coverage-public-update"
								maxlength="500"
								rows="2"
							/>
						</label>
						<label class="coverage-moderation__confirmation"
							><input v-model="publicSummaryApproved" name="coverage-public-approved" type="checkbox" />I
							checked the public preview and progress explanation. They contain no private submission text
							or personal details.</label
						>
					</template>
					<div class="coverage-moderation__controls">
						<button class="button button--primary" type="submit">
							{{
								editing?.visibility === "public" ? "Save approved public change" : "Save private draft"
							}}
						</button>
						<button
							v-if="editing && editing.visibility !== 'public'"
							class="button button--ghost"
							type="button"
							@click="save('approve')"
						>
							Approve for public roadmap
						</button>
						<button
							v-if="editing && editing.visibility !== 'withdrawn'"
							class="button button--ghost"
							type="button"
							@click="save('withdraw')"
						>
							Withdraw from roadmap
						</button>
					</div>
				</fieldset>
			</form>
			<section aria-label="Coverage moderation queue">
				<h2>Moderation queue</h2>
				<p v-if="!rows.length && !busy && !errorMessage">No requests match these filters.</p>
				<article v-for="row in rows" :key="row._id" class="coverage-moderation__row">
					<p>{{ coverageVisibilityLabels[row.visibility] }} · {{ coverageStatusLabels[row.status] }}</p>
					<h3>{{ row.title }}</h3>
					<button class="button button--ghost" :disabled="busy || mustReload" @click="edit(row)">
						Edit request</button
					><NuxtLink v-if="row.visibility === 'public'" :to="`/roadmap/${row._id}`"
						>View public question</NuxtLink
					>
					<details v-if="row.audit.length">
						<summary>Private moderation history</summary>
						<p v-for="event in row.audit" :key="event.revision">
							{{ event.operation }} · {{ new Date(event.date).toLocaleDateString() }}: {{ event.note }}
						</p>
					</details>
				</article>
				<nav class="coverage-moderation__controls" aria-label="Moderation pages">
					<button
						class="button button--ghost"
						:disabled="busy || pagination.page <= 1"
						@click="load(pagination.page - 1)"
					>
						Previous</button
					><span>Page {{ pagination.page }}</span
					><button
						class="button button--ghost"
						:disabled="busy || !pagination.hasMore"
						@click="load(pagination.page + 1)"
					>
						Next
					</button>
				</nav>
			</section>
		</template>
	</div>
</template>

<style scoped>
.coverage-moderation {
	display: grid;
	gap: 24px;
	max-width: 950px;
	margin: auto;
	overflow-wrap: anywhere;
}
.coverage-moderation h1 {
	font:
		600 clamp(1.8rem, 4vw, 2.7rem)/1.16 "Fraunces",
		serif;
}
.coverage-moderation p {
	line-height: 1.65;
}
.coverage-moderation__controls {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 12px;
}
.coverage-moderation__editor,
.coverage-moderation__row {
	padding: 24px;
	border: 1px solid var(--consensus-soft-line);
	background: var(--consensus-surface);
	border-radius: 8px;
}
.coverage-moderation fieldset {
	display: grid;
	gap: 16px;
	padding: 0;
	border: 0;
	min-width: 0;
}
.coverage-moderation label {
	display: grid;
	gap: 6px;
}
.coverage-moderation input:not([type="checkbox"]),
.coverage-moderation textarea,
.coverage-moderation select {
	box-sizing: border-box;
	width: 100%;
	max-width: 100%;
}
.coverage-moderation__confirmation {
	grid-template-columns: auto 1fr;
	align-items: start;
}
.coverage-moderation__preview {
	border-left: 3px solid var(--consensus-interactive);
	padding: 12px 20px;
}
.coverage-moderation__row + .coverage-moderation__row {
	margin-top: 16px;
}
.coverage-moderation a {
	color: var(--consensus-interactive);
	text-underline-offset: 4px;
}
</style>
