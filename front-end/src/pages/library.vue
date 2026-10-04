<script setup lang="ts">
import type { ClaimSummary, Topic } from "~/types/board";
import type { CoverageRequest } from "~/types/coverage-roadmap";
import type { ReaderLibraryController } from "~/utils/reader-library";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { coverageStatusLabels } from "~/types/coverage-roadmap";

interface LibraryContent {
	reviews: ClaimSummary[];
	topics: Topic[];
	comparisons: Array<{ slug: string; title: string; description: string }>;
	coverageRequests: CoverageRequest[];
}
type ReaderUpdate = {
	id: string;
	date: string;
	kind: "new_review" | "new_comparison" | "evidence_update" | "correction" | "coverage_progress" | "requested_answer";
	summary: string;
	bottomLineImpact: "new" | "changed" | "unchanged" | "not_assessed";
} & (
	| { review: ClaimSummary; comparison?: never; coverageRequest?: never }
	| { comparison: LibraryContent["comparisons"][number]; review?: never; coverageRequest?: never }
	| { coverageRequest: CoverageRequest; review?: never; comparison?: never }
);
interface UpdatePage {
	updates: ReaderUpdate[];
	nextCursor: string | null;
}

const library = useNuxtApp().$readerLibrary as ReaderLibraryController;
const { apiUrl } = useApi();
const content = ref<LibraryContent>({ reviews: [], topics: [], comparisons: [], coverageRequests: [] });
const contentLoading = ref(false);
const contentError = ref("");
const contentLoaded = ref(false);
const updates = ref<ReaderUpdate[]>([]);
const nextCursor = ref<string | null>(null);
const updatesLoading = ref(false);
const updatesError = ref("");
const refreshCount = ref(0);
const visibleCount = ref(20);
const confirmClear = ref(false);
const scopeLabel = computed(() => (library.state.scope === "account" ? "account" : "browser"));
const reviewsById = computed(() => new Map(content.value.reviews.map((review) => [review._id, review])));
const topicsById = computed(() => new Map(content.value.topics.map((topic) => [topic._id, topic])));
const requestsById = computed(
	() => new Map((content.value.coverageRequests ?? []).map((request) => [request._id, request]))
);
const comparisonsBySlug = computed(
	() => new Map(content.value.comparisons.map((comparison) => [comparison.slug, comparison]))
);
const selectionKey = computed(() =>
	JSON.stringify([
		library.state.owner,
		library.state.scope,
		library.state.ready,
		library.state.savedReviewIds,
		library.state.followedTopicIds,
		library.state.savedComparisonSlugs,
		library.state.followedCoverageRequestIds,
		refreshCount.value
	])
);
function selection() {
	return {
		savedReviewIds: [...library.state.savedReviewIds],
		followedTopicIds: [...library.state.followedTopicIds],
		savedComparisonSlugs: [...library.state.savedComparisonSlugs],
		followedCoverageRequestIds: [...library.state.followedCoverageRequestIds]
	};
}
let updateRequest: AbortController | null = null;

watch(
	selectionKey,
	async (_value, _previous, onCleanup) => {
		const request = new AbortController();
		onCleanup(() => request.abort());
		content.value = { reviews: [], topics: [], comparisons: [], coverageRequests: [] };
		contentLoaded.value = false;
		contentError.value = "";
		contentLoading.value = false;
		visibleCount.value = 20;
		confirmClear.value = false;
		if (!library.state.ready) return;
		if (
			!library.state.savedReviewIds.length &&
			!library.state.followedTopicIds.length &&
			!library.state.savedComparisonSlugs.length &&
			!library.state.followedCoverageRequestIds.length
		) {
			contentLoaded.value = true;
			return;
		}
		contentLoading.value = true;
		try {
			const response = await $fetch<LibraryContent>(apiUrl("/library/resolve"), {
				method: "POST",
				credentials: "omit",
				body: selection(),
				signal: request.signal
			});
			if (request.signal.aborted) return;
			content.value = response;
			contentLoaded.value = true;
		} catch {
			if (!request.signal.aborted)
				contentError.value = "Saved content could not be loaded. Your selections are still saved.";
		} finally {
			if (!request.signal.aborted) contentLoading.value = false;
		}
	},
	{ immediate: true }
);

async function loadUpdates(append = false) {
	if (updatesLoading.value || !library.state.ready) return;
	const request = updateRequest;
	if (!request || request.signal.aborted) return;
	updatesLoading.value = true;
	updatesError.value = "";
	try {
		const response = await $fetch<UpdatePage>(apiUrl("/library/updates"), {
			method: "POST",
			credentials: "omit",
			signal: request.signal,
			body: {
				...selection(),
				includeComparisons: true,
				includeCoverageRequests: true,
				...(append && nextCursor.value ? { cursor: nextCursor.value } : {})
			}
		});
		if (request.signal.aborted) return;
		updates.value = append ? [...updates.value, ...response.updates] : response.updates;
		nextCursor.value = response.nextCursor;
	} catch {
		if (!request.signal.aborted) updatesError.value = "Updates could not be loaded. Please retry.";
	} finally {
		if (!request.signal.aborted) updatesLoading.value = false;
	}
}

watch(
	selectionKey,
	(_value, _previous, onCleanup) => {
		updateRequest = new AbortController();
		const request = updateRequest;
		onCleanup(() => request.abort());
		updates.value = [];
		nextCursor.value = null;
		updatesLoading.value = false;
		updatesError.value = "";
		if (
			library.state.ready &&
			(library.state.savedReviewIds.length ||
				library.state.followedTopicIds.length ||
				library.state.savedComparisonSlugs.length ||
				library.state.followedCoverageRequestIds.length)
		) {
			void loadUpdates();
		}
	},
	{ immediate: true }
);

async function clearLibrary() {
	if (await library.clearLibrary()) confirmClear.value = false;
}

const impactLabels = {
	new: "Initial publication",
	changed: "Bottom line changed",
	unchanged: "Bottom line unchanged",
	not_assessed: "Bottom-line impact not assessed"
};
const kindLabels = {
	new_review: "New review",
	new_comparison: "New comparison",
	evidence_update: "Evidence update",
	correction: "Correction",
	coverage_progress: "Requested question progress",
	requested_answer: "Requested answer linked"
};
function formatDate(value: string) {
	return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(value));
}

useSeoMeta({ title: "My library - Is There Consensus?", robots: "noindex, nofollow" });
</script>

<template>
	<div class="library-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'My library' }]" />
		<header>
			<h1>My library</h1>
			<p>Keep useful reviews and comparisons, and follow topics and requested questions you want to revisit.</p>
		</header>
		<section class="library-settings" aria-label="Library storage">
			<div class="library-toolbar">
				<button
					type="button"
					:aria-pressed="library.state.scope === 'device'"
					:disabled="library.state.busy"
					@click="library.changeScope('device')"
				>
					This browser
				</button>
				<button
					v-if="library.state.owner"
					type="button"
					:aria-pressed="library.state.scope === 'account'"
					:disabled="library.state.busy"
					@click="library.changeScope('account')"
				>
					My account
				</button>
				<NuxtLink v-else to="/account">Sign in for account sync</NuxtLink>
				<button type="button" :disabled="library.state.busy" @click="library.reload()">Reload library</button>
			</div>
			<p v-if="library.state.scope === 'device'">
				Saved only in this browser. Clearing site data removes these selections. Anyone using this browser
				profile can see them.
			</p>
			<p v-else>
				Your account library is private and available when you sign in. Browser saves stay separate unless you
				copy them.
			</p>
			<button
				v-if="library.state.owner"
				type="button"
				:disabled="library.state.busy"
				@click="library.copyDeviceToAccount()"
			>
				Copy browser saves and follows to my account
			</button>
			<p class="library-note">
				Up to 200 saved reviews, 50 comparisons, 100 followed topics and 100 requested questions per library. No
				email notifications.
			</p>
			<p v-if="library.state.error" role="alert">{{ library.state.error }}</p>
			<p v-else-if="!library.state.ready" role="status">Loading your library…</p>
			<p v-else role="status">{{ library.state.notice }}</p>
		</section>

		<template v-if="library.state.ready">
			<nav class="library-toolbar" aria-label="Library sections">
				<a href="#saved-reviews">Saved reviews ({{ library.state.savedReviewIds.length }})</a>
				<a href="#saved-comparisons">Saved comparisons ({{ library.state.savedComparisonSlugs.length }})</a>
				<a href="#followed-topics">Followed topics ({{ library.state.followedTopicIds.length }})</a>
				<a href="#followed-questions"
					>Requested questions ({{ library.state.followedCoverageRequestIds.length }})</a
				>
				<a href="#reader-updates">What changed</a>
			</nav>
			<p v-if="contentLoading" role="status">Loading saved content…</p>
			<div v-if="contentError" role="alert">
				<p>{{ contentError }}</p>
				<button type="button" @click="refreshCount++">Retry loading content</button>
			</div>

			<section id="saved-reviews" aria-labelledby="saved-heading">
				<h2 id="saved-heading">Saved reviews</h2>
				<p v-if="!library.state.savedReviewIds.length">
					No saved reviews yet. Open a <NuxtLink to="/consensus">reviewed claim</NuxtLink> and choose “Save
					review”.
				</p>
				<ul v-else-if="contentLoaded" class="library-list">
					<li v-for="id in library.state.savedReviewIds.slice(0, visibleCount)" :key="id">
						<div v-if="reviewsById.get(id)?.topic">
							<p class="library-note">{{ reviewsById.get(id)?.topic?.title }}</p>
							<h3>
								<NuxtLink
									:to="`/consensus/${reviewsById.get(id)?.topic?.slug}/${reviewsById.get(id)?.slug}`"
									>{{ reviewsById.get(id)?.title }}</NuxtLink
								>
							</h3>
						</div>
						<div v-else>
							<h3>Review currently unavailable</h3>
							<p class="library-note">
								It may be under revision or withdrawn. You can keep or remove the saved reference.
							</p>
						</div>
						<button
							type="button"
							:disabled="library.state.busy || library.state.needsReload"
							:aria-label="`Remove saved review: ${reviewsById.get(id)?.title || 'unavailable review'}`"
							@click="library.setSelected('savedReviewIds', id, false)"
						>
							Remove
						</button>
					</li>
				</ul>
				<button
					v-if="contentLoaded && visibleCount < library.state.savedReviewIds.length"
					type="button"
					@click="visibleCount += 20"
				>
					Show more saved reviews
				</button>
			</section>

			<section id="saved-comparisons" aria-labelledby="comparisons-heading">
				<h2 id="comparisons-heading">Saved comparisons</h2>
				<p v-if="!library.state.savedComparisonSlugs.length">
					Open an <NuxtLink to="/compare">evidence comparison</NuxtLink> and choose “Save comparison”.
				</p>
				<p v-else class="library-note">
					Bookmarks open the comparison's default view. Copy its page address to keep a particular outcome and
					selection.
				</p>
				<ul v-if="contentLoaded && library.state.savedComparisonSlugs.length" class="library-list">
					<li v-for="slug in library.state.savedComparisonSlugs" :key="slug">
						<div>
							<h3>
								<NuxtLink v-if="comparisonsBySlug.get(slug)" :to="`/compare/${slug}`">{{
									comparisonsBySlug.get(slug)?.title
								}}</NuxtLink
								><span v-else>Comparison currently unavailable</span>
							</h3>
							<p class="library-note">
								{{
									comparisonsBySlug.get(slug)?.description ||
									"You can keep or remove this saved reference."
								}}
							</p>
						</div>
						<button
							type="button"
							:disabled="library.state.busy || library.state.needsReload"
							:aria-label="`Remove saved comparison: ${comparisonsBySlug.get(slug)?.title || 'unavailable comparison'}`"
							@click="library.setSelected('savedComparisonSlugs', slug, false)"
						>
							Remove
						</button>
					</li>
				</ul>
			</section>

			<section id="followed-topics" aria-labelledby="followed-heading">
				<h2 id="followed-heading">Followed topics</h2>
				<p v-if="!library.state.followedTopicIds.length">
					Open a <NuxtLink to="/consensus">topic page</NuxtLink> and choose “Follow topic” to see its
					published updates here.
				</p>
				<ul v-else-if="contentLoaded" class="library-list">
					<li v-for="id in library.state.followedTopicIds" :key="id">
						<h3>
							<NuxtLink v-if="topicsById.get(id)" :to="`/consensus/${topicsById.get(id)?.slug}`">{{
								topicsById.get(id)?.title
							}}</NuxtLink
							><span v-else>Topic currently unavailable</span>
						</h3>
						<button
							type="button"
							:disabled="library.state.busy || library.state.needsReload"
							:aria-label="`Unfollow topic: ${topicsById.get(id)?.title || 'unavailable topic'}`"
							@click="library.setSelected('followedTopicIds', id, false)"
						>
							Unfollow
						</button>
					</li>
				</ul>
			</section>

			<section id="followed-questions" aria-labelledby="questions-heading">
				<h2 id="questions-heading">Followed requested questions</h2>
				<p v-if="!library.state.followedCoverageRequestIds.length">
					Choose “Follow question” on the <NuxtLink to="/roadmap">coverage roadmap</NuxtLink> to track
					approved progress and the eventual answer.
				</p>
				<ul v-else-if="contentLoaded" class="library-list">
					<li v-for="id in library.state.followedCoverageRequestIds" :key="id">
						<div v-if="requestsById.get(id)">
							<p class="library-note">{{ coverageStatusLabels[requestsById.get(id)!.status] }}</p>
							<h3>
								<NuxtLink :to="`/roadmap/${id}`">{{ requestsById.get(id)?.title }}</NuxtLink>
							</h3>
							<NuxtLink v-if="requestsById.get(id)?.answer" :to="requestsById.get(id)!.answer!.path"
								>Read the reviewed answer</NuxtLink
							>
							<p v-else-if="requestsById.get(id)?.answerUnavailable">
								The linked answer is currently unavailable.
							</p>
						</div>
						<div v-else>
							<h3>Requested question currently unavailable</h3>
							<p class="library-note">
								You can keep or remove this reference. Private and withdrawn questions are not shown.
							</p>
						</div>
						<button
							type="button"
							:disabled="library.state.busy || library.state.needsReload"
							:aria-label="`Unfollow requested question: ${requestsById.get(id)?.title || 'unavailable question'}`"
							@click="library.setSelected('followedCoverageRequestIds', id, false)"
						>
							Unfollow
						</button>
					</li>
				</ul>
			</section>

			<section id="reader-updates" aria-labelledby="updates-heading">
				<div class="library-toolbar">
					<h2 id="updates-heading">What changed</h2>
					<button type="button" :disabled="updatesLoading" @click="refreshCount++">Refresh updates</button>
				</div>
				<p>
					New reviews and comparisons, substantive evidence updates and corrections from the last 90 days, for
					your saved content and followed topics. Approved requested-question progress and answer links appear
					separately from scientific evidence updates. Draft work and routine saves are excluded.
				</p>
				<p class="library-note">
					Review announcements start with the library feature. Comparison dates record their original source
					releases, not today's deployment. Up to 100 announcements are retained per review or comparison.
				</p>
				<p v-if="updatesLoading" role="status">Loading updates…</p>
				<p v-if="updatesError" role="alert">{{ updatesError }}</p>
				<p v-else-if="!updatesLoading && !updates.length">
					No published updates to show for this selection{{ nextCursor ? " on this page" : "" }}.
				</p>
				<ul v-if="updates.length" class="library-list library-list--updates">
					<li v-for="update in updates" :key="update.id">
						<div>
							<p class="library-note">
								<time :datetime="update.date">{{ formatDate(update.date) }}</time> ·
								{{ kindLabels[update.kind] }}
							</p>
							<h3>
								<NuxtLink
									v-if="update.coverageRequest"
									:to="`/roadmap/${update.coverageRequest._id}`"
									>{{ update.coverageRequest.title }}</NuxtLink
								>
								<NuxtLink v-else-if="update.comparison" :to="`/compare/${update.comparison.slug}`">{{
									update.comparison.title
								}}</NuxtLink>
								<NuxtLink
									v-else-if="update.review"
									:to="`/consensus/${update.review.topic?.slug}/${update.review.slug}`"
									>{{ update.review.title }}</NuxtLink
								>
							</h3>
							<p>{{ update.summary }}</p>
							<NuxtLink v-if="update.coverageRequest?.answer" :to="update.coverageRequest.answer.path"
								>Read the reviewed answer</NuxtLink
							>
							<p v-if="!update.coverageRequest" class="library-note">
								{{ impactLabels[update.bottomLineImpact] }}
							</p>
						</div>
					</li>
				</ul>
				<button v-if="nextCursor" type="button" :disabled="updatesLoading" @click="loadUpdates(true)">
					Load older updates
				</button>
			</section>
		</template>

		<section class="library-clear" aria-label="Remove library selections">
			<button v-if="!confirmClear" type="button" :disabled="library.state.busy" @click="confirmClear = true">
				Clear {{ scopeLabel }} library…
			</button>
			<div v-else>
				<p>
					Remove all saved reviews, comparisons, followed topics and requested questions from this
					{{ scopeLabel }} library? This cannot be undone. The other library will not change.
				</p>
				<div class="library-toolbar">
					<button type="button" :disabled="library.state.busy" @click="clearLibrary">
						Yes, clear {{ scopeLabel }} library</button
					><button type="button" @click="confirmClear = false">Cancel</button>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.library-page {
	display: grid;
	gap: 1.5rem;
	padding-bottom: 1rem;
}
.library-page h1,
.library-page h2,
.library-page h3 {
	margin: 0;
	color: var(--consensus-ink);
}
.library-page h1,
.library-page h2 {
	font-family: "Fraunces", serif;
}
.library-page h1 {
	font-size: clamp(2rem, 4vw, 3rem);
}
.library-page h2 {
	font-size: 1.45rem;
}
.library-page h3 {
	font-size: 1rem;
	line-height: 1.5;
}
.library-page p {
	margin: 0.5rem 0;
	line-height: 1.6;
	color: var(--consensus-muted);
}
.library-page a {
	color: var(--consensus-link);
	text-underline-offset: 0.2em;
}
.library-settings {
	padding: 1rem;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-surface);
}
.library-toolbar {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 0.75rem;
}
.library-page button {
	padding: 0.6rem 0.9rem;
	min-height: 2.75rem;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	color: var(--consensus-ink);
	background: var(--consensus-surface);
	font: inherit;
	font-size: 0.875rem;
	line-height: 1.4;
	cursor: pointer;
}
.library-page button[aria-pressed="true"] {
	background: var(--consensus-soft-accent);
}
.library-page button:disabled {
	opacity: 0.6;
	cursor: wait;
}
.library-note {
	font-size: 0.875rem;
}
.library-list {
	list-style: none;
	padding: 0;
	margin: 0.75rem 0;
}
.library-list li {
	display: flex;
	align-items: start;
	justify-content: space-between;
	gap: 1rem;
	padding: 1rem 0;
	border-top: 1px solid var(--consensus-soft-line);
}
.library-list li > div {
	min-width: 0;
	overflow-wrap: anywhere;
}
.library-list li > button {
	flex: 0 0 auto;
}
.library-clear {
	border-top: 1px solid var(--consensus-soft-line);
	padding-top: 1rem;
}
.library-page section {
	scroll-margin-top: 1rem;
}
@media (max-width: 480px) {
	.library-list li {
		flex-wrap: wrap;
	}
}
</style>
