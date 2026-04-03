<script setup lang="ts">
import type { ExpertApplication } from "~/types/platform";

const { apiUrl } = useApi();
const { currentAccount, role, isLoggedIn, refreshAuth } = useAuth();

const loading = ref(false);
const saving = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const application = ref<ExpertApplication | null>(null);

const credentialLabel = ref("");
const affiliation = ref("");
const expertiseAreas = ref("");
const evidenceLinks = ref("");
const statement = ref("");

const isEligible = computed(() => isLoggedIn.value && role.value === "user");
const expertiseTier = computed(() => {
	if (currentAccount.value?.expertiseStatus === "verified") return "Verified expert";
	if (application.value?.status === "pending") return "Application pending";
	if (application.value?.status === "needs-info") return "Needs more information";
	return "Community member";
});

function hydrateForm(record: ExpertApplication | null) {
	if (!record) return;
	credentialLabel.value = record.credentialLabel || "";
	affiliation.value = record.affiliation || "";
	expertiseAreas.value = record.expertiseAreas.join(", ");
	evidenceLinks.value = record.evidenceLinks.join("\n");
	statement.value = record.statement || "";
}

async function refreshApplication() {
	if (import.meta.server || !isEligible.value) return;
	loading.value = true;
	errorMessage.value = "";
	try {
		const response = await $fetch<{ application: ExpertApplication | null }>(apiUrl("/expert-applications/me"), {
			credentials: "include"
		});
		application.value = response.application;
		hydrateForm(response.application);
	} catch (error) {
		errorMessage.value = "Unable to load expert application status.";
		console.error(error);
	} finally {
		loading.value = false;
	}
}

async function submitApplication() {
	saving.value = true;
	errorMessage.value = "";
	successMessage.value = "";
	try {
		const response = await $fetch<{ application: ExpertApplication }>(apiUrl("/expert-applications"), {
			method: "POST",
			credentials: "include",
			body: {
				credentialLabel: credentialLabel.value.trim(),
				affiliation: affiliation.value.trim(),
				expertiseAreas: expertiseAreas.value
					.split(",")
					.map((item) => item.trim())
					.filter(Boolean),
				evidenceLinks: evidenceLinks.value
					.split("\n")
					.map((item) => item.trim())
					.filter(Boolean),
				statement: statement.value.trim()
			}
		});
		application.value = response.application;
		successMessage.value = "Application submitted for review.";
		await refreshAuth();
	} catch (error) {
		errorMessage.value = "Unable to submit the expert application.";
		console.error(error);
	} finally {
		saving.value = false;
	}
}

watch(
	() => isEligible.value,
	(value) => {
		if (value && import.meta.client) refreshApplication();
	},
	{ immediate: true }
);
</script>

<template>
	<section class="expert-panel">
		<header class="expert-panel__header">
			<div>
				<h2>Expert review</h2>
				<p>
					Verified reviewers help shape the curated consensus lane. This is slower and more manual than
					posting.
				</p>
			</div>
		</header>

		<div v-if="!isLoggedIn" class="muted">Sign in with a member account to apply.</div>
		<div v-else-if="role !== 'user'" class="muted">
			Admin accounts review applications and do not need to apply.
		</div>
		<div v-else-if="loading" class="muted">Loading your application...</div>
		<div v-else class="expert-panel__body">
			<div class="status-strip">
				<article class="status-card">
					<span>Current tier</span>
					<strong>{{ expertiseTier }}</strong>
				</article>
				<article class="status-card">
					<span>Application status</span>
					<strong>{{ application?.status || "not started" }}</strong>
				</article>
				<article class="status-card">
					<span>Expertise areas</span>
					<strong>{{
						currentAccount?.expertiseAreas?.length || application?.expertiseAreas.length || 0
					}}</strong>
				</article>
			</div>

			<p v-if="application?.reviewNotes" class="review-note">{{ application.reviewNotes }}</p>

			<details class="application-details" :open="!application">
				<summary>{{ application ? "Update application" : "Apply for expert review" }}</summary>
				<form class="application-form" @submit.prevent="submitApplication">
					<label class="field-label" for="credential-label">Credentials</label>
					<input
						id="credential-label"
						v-model="credentialLabel"
						type="text"
						placeholder="PhD in biology, climate researcher, science journalist"
					/>

					<label class="field-label" for="affiliation">Affiliation</label>
					<input
						id="affiliation"
						v-model="affiliation"
						type="text"
						placeholder="University, lab, institution"
					/>

					<label class="field-label" for="expertise-areas">Expertise areas</label>
					<input
						id="expertise-areas"
						v-model="expertiseAreas"
						type="text"
						placeholder="Comma-separated: epidemiology, climate modeling, statistics"
					/>

					<label class="field-label" for="evidence-links">Evidence links</label>
					<textarea
						id="evidence-links"
						v-model="evidenceLinks"
						rows="3"
						placeholder="One link per line: profile page, ORCID, lab page, publications"
					/>

					<label class="field-label" for="statement">Why you should review this lane</label>
					<textarea
						id="statement"
						v-model="statement"
						rows="5"
						placeholder="Describe the domain you work in and the kinds of questions you can help review."
					/>

					<p v-if="successMessage" class="success">{{ successMessage }}</p>
					<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
					<button class="button button--primary" type="submit" :disabled="saving">
						{{ saving ? "Submitting..." : application ? "Update application" : "Apply for review" }}
					</button>
				</form>
			</details>
		</div>
	</section>
</template>

<style scoped>
.expert-panel,
.status-card,
.application-details {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 20px;
}

.expert-panel {
	padding: 20px;
	display: grid;
	gap: 16px;
}

.expert-panel__header h2,
.application-details summary {
	margin: 0;
	font-family: "Fraunces", serif;
}

.expert-panel__header p,
.muted,
.review-note,
.error,
.success {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.expert-panel__body,
.application-form {
	display: grid;
	gap: 14px;
}

.status-strip {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.status-card {
	padding: 14px 16px;
	display: grid;
	gap: 6px;
}

.status-card span,
.field-label {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.status-card strong {
	font-size: 1rem;
	color: var(--consensus-ink);
}

.application-details {
	padding: 16px 18px;
}

.application-details summary {
	cursor: pointer;
	font-size: 1.05rem;
}

.application-form {
	margin-top: 14px;
}

input,
textarea {
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	cursor: pointer;
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.error {
	color: #b83d2e;
	font-weight: 600;
}

.success {
	color: #2f6b4e;
	font-weight: 600;
}
</style>
