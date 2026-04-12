<script setup lang="ts">
import type { ExpertApplication, QuestionFlag } from "~/types/platform";

const { apiUrl } = useApi();
const { role } = useAuth();

const loading = ref(false);
const actionState = ref("");
const applicationQueue = ref<ExpertApplication[]>([]);
const flagQueue = ref<QuestionFlag[]>([]);
const errorMessage = ref("");
const reviewNotes = ref<Record<string, string>>({});

const isAdmin = computed(() => role.value === "admin");

async function refreshQueues() {
	if (import.meta.server || !isAdmin.value) return;
	loading.value = true;
	errorMessage.value = "";
	try {
		const [applicationsResponse, flagsResponse] = await Promise.all([
			$fetch<{ applications: ExpertApplication[] }>(apiUrl("/admin/expert-applications?status=pending"), {
				credentials: "include"
			}),
			$fetch<{ flags: QuestionFlag[] }>(apiUrl("/admin/question-flags"), {
				credentials: "include"
			})
		]);
		applicationQueue.value = applicationsResponse.applications;
		flagQueue.value = flagsResponse.flags;
	} catch (error) {
		errorMessage.value = "Unable to load admin review queues.";
		console.error(error);
	} finally {
		loading.value = false;
	}
}

async function reviewApplication(id: string, decision: "approved" | "rejected" | "needs-info") {
	actionState.value = id;
	try {
		await $fetch(apiUrl(`/admin/expert-applications/${id}/review`), {
			method: "POST",
			credentials: "include",
			body: {
				decision,
				reviewNotes: reviewNotes.value[id] || ""
			}
		});
		delete reviewNotes.value[id];
		await refreshQueues();
	} catch (error) {
		errorMessage.value = "Unable to review that application.";
		console.error(error);
	} finally {
		actionState.value = "";
	}
}

async function reviewFlag(id: string, decision: "reviewed" | "dismissed") {
	actionState.value = id;
	try {
		await $fetch(apiUrl(`/admin/question-flags/${id}/review`), {
			method: "POST",
			credentials: "include",
			body: { decision }
		});
		await refreshQueues();
	} catch (error) {
		errorMessage.value = "Unable to review that flag.";
		console.error(error);
	} finally {
		actionState.value = "";
	}
}

watch(
	() => isAdmin.value,
	(value) => {
		if (value && import.meta.client) refreshQueues();
	},
	{ immediate: true }
);
</script>

<template>
	<section v-if="isAdmin" class="admin-panel">
		<header class="admin-panel__header">
			<div>
				<h2>Admin review</h2>
				<p>Moderation and expert-review queues, in one place.</p>
			</div>
			<button class="button button--ghost" type="button" :disabled="loading" @click="refreshQueues">
				{{ loading ? "Refreshing..." : "Refresh queues" }}
			</button>
		</header>

		<p v-if="errorMessage" class="error">{{ errorMessage }}</p>

		<div class="admin-summary">
			<article class="summary-card">
				<span>Expert applications</span>
				<strong>{{ applicationQueue.length }}</strong>
			</article>
			<article class="summary-card">
				<span>Question flags</span>
				<strong>{{ flagQueue.length }}</strong>
			</article>
		</div>

		<details class="queue-panel" :open="applicationQueue.length > 0">
			<summary>Expert applications</summary>
			<div class="queue-panel__body">
				<div v-if="!applicationQueue.length" class="muted">No expert applications waiting.</div>
				<div v-else class="queue-list">
					<article v-for="application in applicationQueue" :key="application._id" class="queue-card">
						<div>
							<h3>{{ application.name }}</h3>
							<p>{{ application.credentialLabel }}</p>
							<p class="muted">{{ application.expertiseAreas.join(", ") }}</p>
							<p v-if="application.affiliation" class="muted">{{ application.affiliation }}</p>
							<p v-if="application.conflictDisclosure" class="muted">
								<strong>Conflicts:</strong> {{ application.conflictDisclosure }}
							</p>
							<p v-if="application.fundingDisclosure" class="muted">
								<strong>Funding:</strong> {{ application.fundingDisclosure }}
							</p>
							<p class="muted">
								Disclosure policy:
								<strong>{{ application.attestsDisclosurePolicy ? "attested" : "missing" }}</strong>
								· Review standards:
								<strong>{{ application.attestsReviewStandards ? "attested" : "missing" }}</strong>
							</p>
						</div>
						<div class="queue-actions queue-actions--stacked">
							<textarea
								v-model="reviewNotes[application._id]"
								class="review-notes"
								rows="3"
								placeholder="Optional review note shown back to the applicant"
							/>
							<button
								class="mini-button mini-button--approve"
								type="button"
								:disabled="actionState === application._id"
								@click="reviewApplication(application._id, 'approved')"
							>
								Approve
							</button>
							<button
								class="mini-button"
								type="button"
								:disabled="actionState === application._id"
								@click="reviewApplication(application._id, 'needs-info')"
							>
								Needs info
							</button>
							<button
								class="mini-button mini-button--danger"
								type="button"
								:disabled="actionState === application._id"
								@click="reviewApplication(application._id, 'rejected')"
							>
								Reject
							</button>
						</div>
					</article>
				</div>
			</div>
		</details>

		<details class="queue-panel" :open="flagQueue.length > 0">
			<summary>Question flags</summary>
			<div class="queue-panel__body">
				<div v-if="!flagQueue.length" class="muted">No flagged questions waiting.</div>
				<div v-else class="queue-list">
					<article v-for="flag in flagQueue" :key="flag._id" class="queue-card">
						<div>
							<h3>{{ flag.question?.title || "Flagged question" }}</h3>
							<p>{{ flag.reason }}</p>
							<p class="muted">{{ flag.reporterName || "Unknown reporter" }}</p>
						</div>
						<div class="queue-actions">
							<button
								class="mini-button mini-button--approve"
								type="button"
								:disabled="actionState === flag._id"
								@click="reviewFlag(flag._id, 'reviewed')"
							>
								Reviewed
							</button>
							<button
								class="mini-button"
								type="button"
								:disabled="actionState === flag._id"
								@click="reviewFlag(flag._id, 'dismissed')"
							>
								Dismiss
							</button>
						</div>
					</article>
				</div>
			</div>
		</details>
	</section>
</template>

<style scoped>
.admin-panel,
.summary-card,
.queue-panel,
.queue-card {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 20px;
}

.admin-panel {
	padding: 20px;
	display: grid;
	gap: 16px;
}

.admin-panel__header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.admin-panel__header h2,
.queue-card h3,
.queue-panel summary {
	margin: 0;
	font-family: "Fraunces", serif;
}

.admin-panel__header p,
.queue-card p,
.muted,
.error {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.admin-summary {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.summary-card {
	padding: 14px 16px;
	display: grid;
	gap: 6px;
}

.summary-card span {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.summary-card strong {
	font-size: 1rem;
	color: var(--consensus-ink);
}

.queue-panel {
	padding: 16px 18px;
}

.queue-panel summary {
	cursor: pointer;
	font-size: 1.05rem;
}

.queue-panel__body,
.queue-list {
	margin-top: 14px;
	display: grid;
	gap: 12px;
}

.queue-card {
	padding: 14px 16px;
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.queue-actions {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	align-items: start;
}

.queue-actions--stacked {
	display: grid;
	min-width: min(100%, 280px);
}

.review-notes {
	width: 100%;
	padding: 10px 12px;
	border-radius: 14px;
	border: 1px solid var(--consensus-soft-line);
	background: var(--consensus-field-surface);
	color: var(--consensus-ink);
}

.button,
.mini-button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 10px 16px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	cursor: pointer;
	background: transparent;
}

.mini-button--approve {
	border-color: rgba(47, 107, 78, 0.35);
}

.mini-button--danger {
	border-color: rgba(184, 61, 46, 0.35);
}

.error {
	color: #b83d2e;
	font-weight: 600;
}
</style>
