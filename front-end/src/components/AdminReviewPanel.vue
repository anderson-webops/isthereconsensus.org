<script setup lang="ts">
import type { ExpertApplication, QuestionFlag } from "~/types/platform";

const { apiUrl } = useApi();
const { role } = useAuth();

const loading = ref(false);
const actionState = ref("");
const applicationQueue = ref<ExpertApplication[]>([]);
const flagQueue = ref<QuestionFlag[]>([]);
const errorMessage = ref("");

const isAdmin = computed(() => role.value === "admin");

async function refreshQueues() {
	if (import.meta.server) return;
	if (!isAdmin.value) return;
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
				decision
			}
		});
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
			body: {
				decision
			}
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
				<h2>Admin review queues</h2>
				<p>Review expert applications and moderation reports from one place.</p>
			</div>
			<button class="cta ghost" type="button" :disabled="loading" @click="refreshQueues">
				{{ loading ? "Refreshing..." : "Refresh queues" }}
			</button>
		</header>

		<p v-if="errorMessage" class="error">{{ errorMessage }}</p>

		<div class="admin-panel__grid">
			<div class="queue">
				<h3>Expert applications</h3>
				<div v-if="!applicationQueue.length" class="muted">No expert applications waiting.</div>
				<div v-else class="queue-list">
					<article v-for="application in applicationQueue" :key="application._id" class="queue-card">
						<h4>{{ application.name }}</h4>
						<p>{{ application.credentialLabel }}</p>
						<p class="muted">{{ application.expertiseAreas.join(", ") }}</p>
						<div class="queue-actions">
							<button
								class="mini approve"
								type="button"
								:disabled="actionState === application._id"
								@click="reviewApplication(application._id, 'approved')"
							>
								Approve
							</button>
							<button
								class="mini"
								type="button"
								:disabled="actionState === application._id"
								@click="reviewApplication(application._id, 'needs-info')"
							>
								Needs info
							</button>
							<button
								class="mini reject"
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

			<div class="queue">
				<h3>Question flags</h3>
				<div v-if="!flagQueue.length" class="muted">No flagged questions waiting.</div>
				<div v-else class="queue-list">
					<article v-for="flag in flagQueue" :key="flag._id" class="queue-card">
						<h4>{{ flag.question?.title || "Flagged question" }}</h4>
						<p>{{ flag.reason }}</p>
						<p class="muted">{{ flag.reporterName }}</p>
						<div class="queue-actions">
							<button
								class="mini approve"
								type="button"
								:disabled="actionState === flag._id"
								@click="reviewFlag(flag._id, 'reviewed')"
							>
								Reviewed
							</button>
							<button
								class="mini"
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
		</div>
	</section>
</template>

<style scoped>
.admin-panel,
.queue,
.queue-card {
	background: #fff;
	border-radius: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.admin-panel {
	padding: 20px;
	display: grid;
	gap: 18px;
}

.admin-panel__header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.admin-panel__header h2,
.queue h3,
.queue-card h4 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.admin-panel__header p,
.queue-card p,
.muted {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.admin-panel__grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.queue {
	padding: 18px;
	display: grid;
	gap: 12px;
}

.queue-list {
	display: grid;
	gap: 12px;
}

.queue-card {
	padding: 14px;
	display: grid;
	gap: 8px;
	background: var(--consensus-cream);
}

.queue-actions {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.cta,
.mini {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 10px 16px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	font-size: 0.9rem;
	font-weight: 600;
	font-family: inherit;
	cursor: pointer;
	background: #fff;
}

.mini.approve {
	border-color: rgba(47, 107, 78, 0.35);
}

.mini.reject {
	border-color: rgba(184, 61, 46, 0.35);
}

.error {
	color: #b83d2e;
	font-weight: 600;
}
</style>
