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

function hydrateForm(record: ExpertApplication | null) {
	if (!record) return;
	credentialLabel.value = record.credentialLabel || "";
	affiliation.value = record.affiliation || "";
	expertiseAreas.value = record.expertiseAreas.join(", ");
	evidenceLinks.value = record.evidenceLinks.join("\n");
	statement.value = record.statement || "";
}

async function refreshApplication() {
	if (import.meta.server) return;
	if (!isEligible.value) return;
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
		<header>
			<h2>Expert reviewer path</h2>
			<p>
				Verified reviewers help shape the curated consensus lane. This is intentionally slower and more manual
				than ordinary posting.
			</p>
		</header>

		<div v-if="!isLoggedIn" class="muted">Sign in with a user account to apply for expert review.</div>
		<div v-else-if="role !== 'user'" class="muted">
			Admin accounts can review applications but do not need to apply.
		</div>
		<div v-else-if="loading" class="muted">Loading your application...</div>
		<div v-else class="expert-panel__grid">
			<div class="status-card">
				<p class="label">Current tier</p>
				<h3>{{ currentAccount?.expertiseStatus === "verified" ? "Verified expert" : "Community member" }}</h3>
				<p v-if="application" class="muted">Application status: {{ application.status }}</p>
				<p v-if="application?.reviewNotes" class="review-note">{{ application.reviewNotes }}</p>
			</div>

			<form class="application-form" @submit.prevent="submitApplication">
				<label class="field-label" for="credential-label">Credentials</label>
				<input
					id="credential-label"
					v-model="credentialLabel"
					type="text"
					placeholder="PhD in Biology, climate researcher, science journalist..."
				/>

				<label class="field-label" for="affiliation">Affiliation</label>
				<input
					id="affiliation"
					v-model="affiliation"
					type="text"
					placeholder="University, lab, institution..."
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
				<button class="cta primary" type="submit" :disabled="saving">
					{{ saving ? "Submitting..." : application ? "Update application" : "Apply for review" }}
				</button>
			</form>
		</div>
	</section>
</template>

<style scoped>
.expert-panel,
.status-card,
.application-form {
	background: #fff;
	border-radius: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.expert-panel {
	padding: 20px;
	display: grid;
	gap: 18px;
}

.expert-panel h2,
.status-card h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.expert-panel header p,
.muted,
.review-note {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.expert-panel__grid {
	display: grid;
	gap: 16px;
	grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
}

.status-card,
.application-form {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.label,
.field-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
	color: var(--consensus-muted);
}

input,
textarea {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 12px 20px;
	border: none;
	font-size: 0.95rem;
	font-weight: 600;
	font-family: inherit;
	cursor: pointer;
	width: fit-content;
}

.cta.primary {
	background: var(--consensus-ember);
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.success {
	color: #2f6b4e;
	font-weight: 600;
}

.error {
	color: #b83d2e;
	font-weight: 600;
}

@media (max-width: 860px) {
	.expert-panel__grid {
		grid-template-columns: 1fr;
	}
}
</style>
