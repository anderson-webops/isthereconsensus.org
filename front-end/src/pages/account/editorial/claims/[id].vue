<script setup lang="ts">
import type {
	Claim,
	ClaimResponse,
	ClaimRevision,
	ClaimRevisionsResponse,
	ClaimSource,
	Topic,
	TopicResponse
} from "~/types/board";
import AuthPanel from "~/components/AuthPanel.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

interface EditorialClaimRouteParams {
	id?: string | string[];
}

const route = useRoute();
const router = useRouter();
const { apiUrl } = useApi();
const { currentAccount, isLoggedIn, ready, role } = useAuth();

const routeId = computed(() => {
	const value = (route.params as EditorialClaimRouteParams).id;
	return Array.isArray(value) ? value[0] : String(value ?? "new");
});
const isNew = computed(() => routeId.value === "new");
const canUseEditorial = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");

const loading = ref(false);
const saving = ref(false);
const actionMessage = ref("");
const errorMessage = ref("");
const claim = ref<Claim | null>(null);
const revisions = ref<ClaimRevision[]>([]);
const topics = ref<Topic[]>([]);
const sourceRows = ref<ClaimSource[]>([]);

const form = reactive({
	topic: "",
	title: "",
	slug: "",
	status: "draft" as Claim["status"],
	consensusBand: "unclear" as Claim["consensusBand"],
	confidenceScore: 50,
	bottomLine: "",
	stableCore: "",
	openQuestions: "",
	whatWouldChangeMinds: "",
	misconceptions: "",
	editorSummary: "",
	lastReviewedAt: "",
	nextReviewAt: "",
	revisionNote: ""
});

useHead({
	title: "Claim editor - Is There Consensus?"
});

function parseLines(value: string) {
	return value
		.split("\n")
		.map((item) => item.trim())
		.filter(Boolean);
}

function formatDateInput(value?: string) {
	if (!value) return "";
	return new Date(value).toISOString().slice(0, 10);
}

function hydrateClaim(record: Claim | null) {
	claim.value = record;
	form.topic = record?.topic?.slug || topics.value[0]?.slug || "";
	form.title = record?.title || "";
	form.slug = record?.slug || "";
	form.status = record?.status || "draft";
	form.consensusBand = record?.consensusBand || "unclear";
	form.confidenceScore = record?.confidenceScore ?? 50;
	form.bottomLine = record?.bottomLine || "";
	form.stableCore = (record?.stableCore || []).join("\n");
	form.openQuestions = (record?.openQuestions || []).join("\n");
	form.whatWouldChangeMinds = (record?.whatWouldChangeMinds || []).join("\n");
	form.misconceptions = (record?.misconceptions || []).join("\n");
	form.editorSummary = record?.editorSummary || "";
	form.lastReviewedAt = formatDateInput(record?.lastReviewedAt);
	form.nextReviewAt = formatDateInput(record?.nextReviewAt);
	form.revisionNote = "";
	sourceRows.value =
		record?.sources?.map((source) => ({
			...source
		})) || [];
}

async function loadTopics() {
	const response = await $fetch<TopicResponse>(apiUrl("/topics?includeCounts=true&includeClaims=true"));
	topics.value = response.topics;
	if (!form.topic) {
		form.topic = response.topics[0]?.slug || "";
	}
}

async function loadClaim() {
	if (!import.meta.client || !canUseEditorial.value || isNew.value) {
		hydrateClaim(null);
		revisions.value = [];
		return;
	}

	loading.value = true;
	errorMessage.value = "";
	try {
		const [claimResponse, revisionsResponse] = await Promise.all([
			$fetch<ClaimResponse>(apiUrl(`/editorial/claims/${routeId.value}`), {
				credentials: "include"
			}),
			$fetch<ClaimRevisionsResponse>(apiUrl(`/editorial/claims/${routeId.value}/revisions`), {
				credentials: "include"
			})
		]);
		hydrateClaim(claimResponse.claim);
		revisions.value = revisionsResponse.revisions;
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to load the claim editor.";
	} finally {
		loading.value = false;
	}
}

function claimPayload() {
	return {
		topic: form.topic,
		title: form.title.trim(),
		slug: form.slug.trim(),
		status: form.status,
		consensusBand: form.consensusBand,
		confidenceScore: form.confidenceScore,
		bottomLine: form.bottomLine.trim(),
		stableCore: parseLines(form.stableCore),
		openQuestions: parseLines(form.openQuestions),
		whatWouldChangeMinds: parseLines(form.whatWouldChangeMinds),
		misconceptions: parseLines(form.misconceptions),
		editorSummary: form.editorSummary.trim(),
		lastReviewedAt: form.lastReviewedAt || undefined,
		nextReviewAt: form.nextReviewAt || undefined,
		revisionNote: form.revisionNote.trim()
	};
}

async function syncSources(claimId: string) {
	const existingIds = new Set((claim.value?.sources || []).map((source) => source._id).filter(Boolean) as string[]);
	const currentIds = new Set(sourceRows.value.map((source) => source._id).filter(Boolean) as string[]);

	for (const sourceId of existingIds) {
		if (!currentIds.has(sourceId)) {
			await $fetch(apiUrl(`/editorial/claims/${claimId}/sources/${sourceId}`), {
				method: "DELETE",
				credentials: "include"
			});
		}
	}

	for (const source of sourceRows.value) {
		const body = {
			kind: source.kind,
			title: source.title.trim(),
			publisher: source.publisher?.trim() || "",
			year: source.year || undefined,
			url: source.url?.trim() || "",
			doi: source.doi?.trim() || "",
			stance: source.stance,
			note: source.note?.trim() || "",
			order: source.order ?? 0
		};

		if (source._id) {
			await $fetch(apiUrl(`/editorial/claims/${claimId}/sources/${source._id}`), {
				method: "PATCH",
				credentials: "include",
				body
			});
		} else if (body.title) {
			await $fetch(apiUrl(`/editorial/claims/${claimId}/sources`), {
				method: "POST",
				credentials: "include",
				body
			});
		}
	}
}

async function saveClaim() {
	if (!form.topic || !form.title.trim()) {
		errorMessage.value = "Topic and title are required.";
		return;
	}

	saving.value = true;
	errorMessage.value = "";
	actionMessage.value = "";
	try {
		if (isNew.value) {
			const response = await $fetch<ClaimResponse>(apiUrl("/editorial/claims"), {
				method: "POST",
				credentials: "include",
				body: claimPayload()
			});
			const createdId = response.claim._id;
			if (sourceRows.value.length) {
				await syncSources(createdId);
			}
			actionMessage.value = "Draft claim created.";
			await router.replace(`/account/editorial/claims/${createdId}`);
			await loadClaim();
			return;
		}

		await $fetch<ClaimResponse>(apiUrl(`/editorial/claims/${routeId.value}`), {
			method: "PATCH",
			credentials: "include",
			body: claimPayload()
		});
		await syncSources(routeId.value);
		actionMessage.value = "Claim saved.";
		await loadClaim();
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to save the claim.";
	} finally {
		saving.value = false;
	}
}

async function publishClaim() {
	if (isNew.value) {
		errorMessage.value = "Save the draft first, then publish it.";
		return;
	}
	saving.value = true;
	errorMessage.value = "";
	actionMessage.value = "";
	try {
		await $fetch<ClaimResponse>(apiUrl(`/editorial/claims/${routeId.value}/publish`), {
			method: "POST",
			credentials: "include",
			body: {
				lastReviewedAt: form.lastReviewedAt || undefined,
				nextReviewAt: form.nextReviewAt || undefined,
				revisionNote: form.revisionNote.trim() || "Published claim."
			}
		});
		actionMessage.value = "Claim published.";
		await loadClaim();
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to publish the claim.";
	} finally {
		saving.value = false;
	}
}

async function archiveClaim() {
	if (isNew.value) return;
	saving.value = true;
	errorMessage.value = "";
	actionMessage.value = "";
	try {
		await $fetch<ClaimResponse>(apiUrl(`/editorial/claims/${routeId.value}/archive`), {
			method: "POST",
			credentials: "include",
			body: {
				revisionNote: form.revisionNote.trim() || "Archived claim."
			}
		});
		actionMessage.value = "Claim archived.";
		await loadClaim();
	} catch (error) {
		console.error(error);
		errorMessage.value = "Unable to archive the claim.";
	} finally {
		saving.value = false;
	}
}

function addSource() {
	sourceRows.value.push({
		kind: "context",
		title: "",
		publisher: "",
		stance: "context",
		note: "",
		order: sourceRows.value.length
	});
}

function removeSource(index: number) {
	sourceRows.value.splice(index, 1);
}

watch(
	() => [ready.value, canUseEditorial.value, routeId.value],
	async ([isReady, canEdit]) => {
		if (!isReady || !canEdit || !import.meta.client) return;
		await loadTopics();
		await loadClaim();
	},
	{ immediate: true }
);
</script>

<template>
	<div class="claim-editor-page">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Account', to: '/account' },
				{ label: 'Editorial workspace', to: '/account/editorial' },
				{ label: isNew ? 'New claim' : claim?.title || 'Claim editor' }
			]"
		/>

		<header class="editor-header">
			<div>
				<p class="eyebrow">Claim editor</p>
				<h1>{{ isNew ? "Create a canonical claim" : claim?.title || "Edit claim" }}</h1>
				<p>Use the structured form below. The public page should always read in a predictable order.</p>
			</div>
			<div class="editor-header__actions">
				<NuxtLink
					v-if="claim?.topic?.slug && claim?.slug && !isNew"
					class="button button--ghost"
					:to="`/consensus/${claim.topic.slug}/${claim.slug}`"
				>
					View public page
				</NuxtLink>
				<NuxtLink class="button button--ghost" to="/account/editorial">Back to workspace</NuxtLink>
			</div>
		</header>

		<section v-if="!ready" class="locked-panel">
			<p class="eyebrow">Checking access</p>
			<h2>Loading your editorial permissions.</h2>
		</section>
		<AuthPanel
			v-else-if="!isLoggedIn"
			title="Sign in to continue"
			hint="Editorial access requires a verified expert or admin."
		/>
		<section v-else-if="!canUseEditorial" class="locked-panel">
			<p class="eyebrow">Restricted area</p>
			<h2>Verified experts and admins only.</h2>
			<p>Member accounts can apply for expert review from the main account page.</p>
			<NuxtLink class="button button--ghost" to="/account">Back to account</NuxtLink>
		</section>
		<section v-else class="editor-grid">
			<form class="editor-form" @submit.prevent="saveClaim">
				<div class="form-grid">
					<label class="field">
						<span class="field-label">Topic</span>
						<select v-model="form.topic">
							<option v-for="topic in topics" :key="topic._id" :value="topic.slug">
								{{ topic.title }}
							</option>
						</select>
					</label>

					<label class="field">
						<span class="field-label">Status</span>
						<select v-model="form.status">
							<option value="draft">Draft</option>
							<option value="published">Published</option>
							<option value="needs_update">Needs update</option>
							<option value="archived">Archived</option>
						</select>
					</label>

					<label class="field field--full">
						<span class="field-label">Claim title</span>
						<input v-model="form.title" type="text" placeholder="How does scientific consensus form?" />
					</label>

					<label class="field">
						<span class="field-label">Slug</span>
						<input v-model="form.slug" type="text" placeholder="how-does-scientific-consensus-form" />
					</label>

					<label class="field">
						<span class="field-label">Consensus band</span>
						<select v-model="form.consensusBand">
							<option value="strong">Strong</option>
							<option value="broad">Broad</option>
							<option value="mixed">Mixed</option>
							<option value="unclear">Unclear</option>
						</select>
					</label>

					<label class="field">
						<span class="field-label">Confidence score</span>
						<input v-model.number="form.confidenceScore" type="number" min="0" max="100" />
					</label>

					<label class="field">
						<span class="field-label">Last reviewed</span>
						<input v-model="form.lastReviewedAt" type="date" />
					</label>

					<label class="field">
						<span class="field-label">Next review</span>
						<input v-model="form.nextReviewAt" type="date" />
					</label>

					<label class="field field--full">
						<span class="field-label">Bottom line</span>
						<textarea
							v-model="form.bottomLine"
							rows="4"
							placeholder="Two or three sentences in plain language."
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Editor summary</span>
						<textarea
							v-model="form.editorSummary"
							rows="4"
							placeholder="Internal framing note for the public page and future reviewers."
						/>
					</label>

					<label class="field field--full">
						<span class="field-label">Stable core (one point per line)</span>
						<textarea v-model="form.stableCore" rows="5" />
					</label>

					<label class="field field--full">
						<span class="field-label">Open questions (one point per line)</span>
						<textarea v-model="form.openQuestions" rows="5" />
					</label>

					<label class="field field--full">
						<span class="field-label">What would change minds (one point per line)</span>
						<textarea v-model="form.whatWouldChangeMinds" rows="5" />
					</label>

					<label class="field field--full">
						<span class="field-label">Misconceptions (one point per line)</span>
						<textarea v-model="form.misconceptions" rows="5" />
					</label>
				</div>

				<section class="sources-panel">
					<div class="section-heading">
						<div>
							<p class="eyebrow">Sources</p>
							<h2>Evidence list</h2>
						</div>
						<button class="button button--ghost" type="button" @click="addSource">Add source</button>
					</div>

					<div v-if="!sourceRows.length" class="empty-state">No sources attached yet.</div>
					<div v-else class="source-list">
						<article v-for="(source, index) in sourceRows" :key="source._id || index" class="source-editor">
							<div class="source-editor__grid">
								<label class="field">
									<span class="field-label">Kind</span>
									<select v-model="source.kind">
										<option value="systematic_review">Systematic review</option>
										<option value="meta_analysis">Meta-analysis</option>
										<option value="guideline">Guideline</option>
										<option value="consensus_statement">Consensus statement</option>
										<option value="landmark_study">Landmark study</option>
										<option value="context">Context</option>
									</select>
								</label>

								<label class="field">
									<span class="field-label">Stance</span>
									<select v-model="source.stance">
										<option value="supports">Supports</option>
										<option value="context">Context</option>
										<option value="debate">Debate</option>
									</select>
								</label>

								<label class="field field--full">
									<span class="field-label">Title</span>
									<input v-model="source.title" type="text" />
								</label>

								<label class="field">
									<span class="field-label">Publisher</span>
									<input v-model="source.publisher" type="text" />
								</label>

								<label class="field">
									<span class="field-label">Year</span>
									<input v-model.number="source.year" type="number" min="0" max="9999" />
								</label>

								<label class="field field--full">
									<span class="field-label">URL</span>
									<input v-model="source.url" type="url" />
								</label>

								<label class="field">
									<span class="field-label">DOI</span>
									<input v-model="source.doi" type="text" />
								</label>

								<label class="field">
									<span class="field-label">Order</span>
									<input v-model.number="source.order" type="number" min="0" />
								</label>

								<label class="field field--full">
									<span class="field-label">Note</span>
									<textarea v-model="source.note" rows="3" />
								</label>
							</div>

							<button
								class="button button--ghost button--danger"
								type="button"
								@click="removeSource(index)"
							>
								Remove source
							</button>
						</article>
					</div>
				</section>

				<label class="field field--full">
					<span class="field-label">Revision note</span>
					<textarea v-model="form.revisionNote" rows="3" placeholder="What changed in this edit?" />
				</label>

				<p v-if="actionMessage" class="success">{{ actionMessage }}</p>
				<p v-if="errorMessage" class="error">{{ errorMessage }}</p>

				<div class="editor-actions">
					<button class="button button--primary" type="submit" :disabled="saving">
						{{ saving ? "Saving..." : isNew ? "Create draft" : "Save claim" }}
					</button>
					<button
						v-if="!isNew"
						class="button button--ghost"
						type="button"
						:disabled="saving"
						@click="publishClaim"
					>
						Publish
					</button>
					<button
						v-if="!isNew"
						class="button button--ghost button--danger"
						type="button"
						:disabled="saving"
						@click="archiveClaim"
					>
						Archive
					</button>
				</div>
			</form>

			<aside class="revision-panel">
				<div class="section-heading section-heading--tight">
					<div>
						<p class="eyebrow">Revision history</p>
						<h2>Recent snapshots</h2>
					</div>
					<p>Each publish or update records a serialized snapshot of the public claim.</p>
				</div>

				<div v-if="loading" class="empty-state">Loading claim data...</div>
				<div v-else-if="!revisions.length" class="empty-state">No revisions recorded yet.</div>
				<div v-else class="revision-list">
					<article v-for="revision in revisions" :key="revision._id" class="revision-card">
						<p class="revision-card__meta">
							<span>{{ revision.editorModel }}</span>
							<span>{{
								revision.createdAt ? new Date(revision.createdAt).toLocaleString() : "Unknown time"
							}}</span>
						</p>
						<h3>{{ revision.summary || "Revision snapshot" }}</h3>
					</article>
				</div>
			</aside>
		</section>
	</div>
</template>

<style scoped>
.claim-editor-page {
	display: grid;
	gap: 24px;
}

.editor-header,
.locked-panel,
.editor-form,
.revision-panel,
.source-editor,
.revision-card {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.editor-header,
.locked-panel,
.editor-form,
.revision-panel {
	padding: 22px;
}

.editor-header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.editor-header h1,
.locked-panel h2,
.section-heading h2,
.revision-card h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.editor-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.editor-header p,
.locked-panel p,
.section-heading p,
.empty-state,
.success,
.error,
.revision-card__meta {
	color: var(--consensus-muted);
	line-height: 1.65;
}

.editor-header__actions,
.editor-actions {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.editor-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
	align-items: start;
}

.editor-form,
.revision-panel,
.source-list {
	display: grid;
	gap: 16px;
}

.form-grid,
.source-editor__grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.field {
	display: grid;
	gap: 8px;
}

.field--full {
	grid-column: 1 / -1;
}

.field-label,
.revision-card__meta {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.field input,
.field textarea,
.field select {
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: #fff;
}

.sources-panel {
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

.source-editor,
.revision-card {
	padding: 18px;
}

.revision-list {
	display: grid;
	gap: 12px;
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
	background: var(--consensus-interactive);
	border-color: var(--consensus-interactive);
	color: #fff;
}

.button--danger {
	border-color: rgba(184, 61, 46, 0.3);
}

.success {
	color: #2f6b4e;
	font-weight: 600;
}

.error {
	color: #b83d2e;
	font-weight: 600;
}

@media (max-width: 980px) {
	.editor-grid {
		grid-template-columns: 1fr;
	}
}

@media (max-width: 720px) {
	.form-grid,
	.source-editor__grid {
		grid-template-columns: 1fr;
	}
}
</style>
