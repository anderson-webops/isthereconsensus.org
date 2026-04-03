<script setup lang="ts">
import type { ClaimSummary, Question, QuestionsResponse } from "~/types/board";
import AdminReviewPanel from "~/components/AdminReviewPanel.vue";
import AuthPanel from "~/components/AuthPanel.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const router = useRouter();
const { apiUrl } = useApi();
const { currentAccount, isLoggedIn, ready, role } = useAuth();

const loading = ref(false);
const actionState = ref("");
const errorMessage = ref("");
const claims = ref<ClaimSummary[]>([]);
const unassignedQuestions = ref<Question[]>([]);

const canUseEditorial = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
const isAdmin = computed(() => role.value === "admin");
const draftClaims = computed(() => claims.value.filter((claim) => claim.status === "draft"));
const reviewClaims = computed(() =>
	claims.value.filter((claim) => {
		if (claim.status === "needs_update") return true;
		if (claim.status !== "published") return false;
		if (!claim.nextReviewAt) return false;
		return new Date(claim.nextReviewAt).getTime() <= Date.now();
	})
);
const topicScopedClaims = computed(() =>
	unassignedQuestions.value.reduce<Record<string, ClaimSummary[]>>((map, question) => {
		const topicKey = question.topic._id;
		map[topicKey] = claims.value.filter((claim) => claim.topic?._id === topicKey && claim.status !== "archived");
		return map;
	}, {})
);
const selectedClaim = ref<Record<string, string>>({});

useHead({
	title: "Editorial workspace - Is There Consensus?"
});

async function refreshEditorial() {
	if (!import.meta.client || !canUseEditorial.value) return;
	loading.value = true;
	errorMessage.value = "";
	try {
		const [claimsResponse, questionsResponse] = await Promise.all([
			$fetch<{ claims: ClaimSummary[] }>(apiUrl("/editorial/claims"), {
				credentials: "include"
			}),
			$fetch<QuestionsResponse>(apiUrl("/editorial/questions?routingStatus=unassigned"), {
				credentials: "include"
			})
		]);
		claims.value = claimsResponse.claims;
		unassignedQuestions.value = questionsResponse.questions;
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to load the editorial workspace.";
	} finally {
		loading.value = false;
	}
}

async function createDraftClaim(question: Question) {
	actionState.value = question._id;
	try {
		const response = await $fetch<{ claim: ClaimSummary }>(
			apiUrl(`/editorial/questions/${question._id}/create-claim`),
			{
				method: "POST",
				credentials: "include",
				body: {
					title: question.title,
					editorSummary: question.body || "",
					revisionNote: "Created draft claim from editorial queue."
				}
			}
		);
		await refreshEditorial();
		await router.push(`/account/editorial/claims/${response.claim._id}`);
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to create a draft claim from that question.";
	} finally {
		actionState.value = "";
	}
}

async function linkQuestion(question: Question) {
	const claimId = selectedClaim.value[question._id];
	if (!claimId) return;
	actionState.value = question._id;
	try {
		await $fetch(apiUrl(`/editorial/questions/${question._id}/link-claim`), {
			method: "POST",
			credentials: "include",
			body: { claimId }
		});
		await refreshEditorial();
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to link that question to a claim.";
	} finally {
		actionState.value = "";
	}
}

async function markDuplicate(question: Question) {
	actionState.value = question._id;
	try {
		await $fetch(apiUrl(`/editorial/questions/${question._id}/mark-duplicate`), {
			method: "POST",
			credentials: "include"
		});
		await refreshEditorial();
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to mark that question as duplicate.";
	} finally {
		actionState.value = "";
	}
}

async function deleteQuestion(question: Question) {
	actionState.value = question._id;
	try {
		await $fetch(apiUrl(`/questions/${question._id}`), {
			method: "DELETE",
			credentials: "include"
		});
		await refreshEditorial();
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to delete that question.";
	} finally {
		actionState.value = "";
	}
}

watch(
	() => [ready.value, canUseEditorial.value],
	([isReady, canEdit]) => {
		if (isReady && canEdit && import.meta.client) {
			refreshEditorial();
		}
	},
	{ immediate: true }
);
</script>

<template>
	<div class="editorial-page">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Account', to: '/account' },
				{ label: 'Editorial workspace' }
			]"
		/>

		<header class="editorial-header">
			<div>
				<p class="eyebrow">Editorial workspace</p>
				<h1>Route intake, maintain canonical claims, and keep the board clean.</h1>
				<p>
					This area is for verified experts and admins. Topic hubs stay public; canonical claim reviews and
					intake routing happen here.
				</p>
			</div>
			<div class="editorial-header__actions">
				<NuxtLink class="button button--primary" to="/account/editorial/claims/new">Create new claim</NuxtLink>
				<button class="button button--ghost" type="button" :disabled="loading" @click="refreshEditorial">
					{{ loading ? "Refreshing..." : "Refresh" }}
				</button>
			</div>
		</header>

		<section v-if="!ready" class="locked-panel">
			<p class="eyebrow">Checking access</p>
			<h2>Loading your editorial permissions.</h2>
		</section>
		<AuthPanel
			v-else-if="!isLoggedIn"
			title="Sign in to continue"
			hint="Editorial access requires a logged-in account."
		/>
		<section v-else-if="!canUseEditorial" class="locked-panel">
			<p class="eyebrow">Restricted area</p>
			<h2>Verified experts and admins only.</h2>
			<p>Member accounts can apply for expert review from the main account page.</p>
			<NuxtLink class="button button--ghost" to="/account">Back to account</NuxtLink>
		</section>
		<template v-else>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>

			<section class="summary-strip">
				<article class="summary-card">
					<span>Unassigned questions</span>
					<strong>{{ unassignedQuestions.length }}</strong>
				</article>
				<article class="summary-card">
					<span>Draft claims</span>
					<strong>{{ draftClaims.length }}</strong>
				</article>
				<article class="summary-card">
					<span>Claims needing review</span>
					<strong>{{ reviewClaims.length }}</strong>
				</article>
				<article class="summary-card">
					<span>Your access</span>
					<strong>{{ isAdmin ? "Admin" : "Verified expert" }}</strong>
				</article>
			</section>

			<section class="editorial-panel">
				<div class="section-heading">
					<div>
						<p class="eyebrow">Queue 1</p>
						<h2>Unassigned community questions</h2>
					</div>
					<p>Link a question to an existing claim, turn it into a draft, or mark it as duplicate.</p>
				</div>

				<div v-if="!unassignedQuestions.length" class="empty-state">No unassigned questions are waiting.</div>
				<div v-else class="queue-list">
					<article v-for="question in unassignedQuestions" :key="question._id" class="queue-card">
						<div class="queue-card__content">
							<p class="queue-card__meta">
								<span>{{ question.topic.title }}</span>
								<span>{{ question.authorName || question.displayName || "Community member" }}</span>
							</p>
							<h3>{{ question.title }}</h3>
							<p>{{ question.body || "No additional context provided." }}</p>
							<a v-if="question.sourceUrl" :href="question.sourceUrl" target="_blank" rel="noreferrer">
								{{ question.sourceUrl }}
							</a>
						</div>

						<div class="queue-card__actions">
							<select v-model="selectedClaim[question._id]">
								<option value="">Link to an existing claim</option>
								<option
									v-for="claim in topicScopedClaims[question.topic._id] || []"
									:key="claim._id"
									:value="claim._id"
								>
									{{ claim.title }}
								</option>
							</select>
							<div class="queue-card__buttons">
								<button
									class="button button--ghost"
									type="button"
									:disabled="!selectedClaim[question._id] || actionState === question._id"
									@click="linkQuestion(question)"
								>
									Link claim
								</button>
								<button
									class="button button--ghost"
									type="button"
									:disabled="actionState === question._id"
									@click="createDraftClaim(question)"
								>
									Create draft
								</button>
								<button
									class="button button--ghost"
									type="button"
									:disabled="actionState === question._id"
									@click="markDuplicate(question)"
								>
									Mark duplicate
								</button>
								<button
									v-if="isAdmin"
									class="button button--ghost button--danger"
									type="button"
									:disabled="actionState === question._id"
									@click="deleteQuestion(question)"
								>
									Delete
								</button>
							</div>
						</div>
					</article>
				</div>
			</section>

			<section class="editorial-grid">
				<section class="editorial-panel">
					<div class="section-heading section-heading--tight">
						<div>
							<p class="eyebrow">Queue 2</p>
							<h2>Draft claims</h2>
						</div>
						<p>These are waiting for structured editorial review and publication.</p>
					</div>

					<div v-if="!draftClaims.length" class="empty-state">No draft claims yet.</div>
					<div v-else class="claim-list">
						<article v-for="claim in draftClaims" :key="claim._id" class="claim-card">
							<p class="queue-card__meta">
								<span>{{ claim.topic?.title }}</span>
								<span>{{ claim.sourceCount ?? 0 }} sources</span>
							</p>
							<h3>{{ claim.title }}</h3>
							<p>{{ claim.bottomLine || "Draft claim waiting for a bottom line." }}</p>
							<NuxtLink class="button button--ghost" :to="`/account/editorial/claims/${claim._id}`">
								Open draft
							</NuxtLink>
						</article>
					</div>
				</section>

				<section class="editorial-panel">
					<div class="section-heading section-heading--tight">
						<div>
							<p class="eyebrow">Queue 3</p>
							<h2>Claims needing review</h2>
						</div>
						<p>Published claims whose review date has passed or which are marked for update.</p>
					</div>

					<div v-if="!reviewClaims.length" class="empty-state">
						No published claims are currently due for review.
					</div>
					<div v-else class="claim-list">
						<article v-for="claim in reviewClaims" :key="claim._id" class="claim-card">
							<p class="queue-card__meta">
								<span>{{ claim.topic?.title }}</span>
								<span
									>Next review
									{{
										claim.nextReviewAt ? new Date(claim.nextReviewAt).toLocaleDateString() : "n/a"
									}}</span
								>
							</p>
							<h3>{{ claim.title }}</h3>
							<p>{{ claim.bottomLine }}</p>
							<NuxtLink class="button button--ghost" :to="`/account/editorial/claims/${claim._id}`">
								Open review
							</NuxtLink>
						</article>
					</div>
				</section>
			</section>

			<section v-if="isAdmin" class="editorial-panel">
				<div class="section-heading section-heading--tight">
					<div>
						<p class="eyebrow">Queue 4</p>
						<h2>Admin moderation</h2>
					</div>
					<p>Admin-only review queues for flagged content and expert applications.</p>
				</div>
				<AdminReviewPanel />
			</section>
		</template>
	</div>
</template>

<style scoped>
.editorial-page {
	display: grid;
	gap: 24px;
}

.editorial-header,
.locked-panel,
.summary-card,
.editorial-panel,
.queue-card,
.claim-card {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.editorial-header,
.locked-panel,
.editorial-panel {
	padding: 22px;
}

.editorial-header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.editorial-header h1,
.locked-panel h2,
.section-heading h2,
.queue-card h3,
.claim-card h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.editorial-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.editorial-header p,
.locked-panel p,
.section-heading p,
.queue-card p,
.queue-card a,
.claim-card p,
.empty-state,
.error {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.editorial-header__actions,
.queue-card__buttons {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.summary-strip {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.summary-card {
	padding: 16px 18px;
	display: grid;
	gap: 6px;
}

.summary-card span,
.queue-card__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.summary-card strong {
	color: var(--consensus-ink);
}

.editorial-panel,
.queue-list,
.claim-list {
	display: grid;
	gap: 14px;
}

.section-heading {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.section-heading--tight h2,
.section-heading--tight p {
	margin: 0;
}

.queue-card,
.claim-card {
	padding: 18px;
	display: grid;
	gap: 12px;
}

.queue-card__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.queue-card__actions {
	display: grid;
	gap: 10px;
}

.queue-card__actions select {
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.editorial-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 11px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	background: transparent;
	color: var(--consensus-ink);
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.button--danger {
	border-color: rgba(184, 61, 46, 0.3);
}

.error {
	color: #b83d2e;
	font-weight: 600;
}

@media (max-width: 920px) {
	.editorial-grid {
		grid-template-columns: 1fr;
	}
}
</style>
