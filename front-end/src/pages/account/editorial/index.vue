<script setup lang="ts">
import type { ClaimSummary, Question, QuestionsResponse } from "~/types/board";
import AdminReviewPanel from "~/components/AdminReviewPanel.vue";
import AuthPanel from "~/components/AuthPanel.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { firstWaveClaims, holdClaims, secondWaveClaims } from "~/data/claimRoadmap";
import { measurementLoop, patternPreview, publishingPlanPreview } from "~/data/searchDemand";

const router = useRouter();
const { apiUrl } = useApi();
const { currentAccount, isLoggedIn, ready, role } = useAuth();

const loading = ref(false);
const actionState = ref("");
const errorMessage = ref("");
const claims = ref<ClaimSummary[]>([]);
const unassignedQuestions = ref<Question[]>([]);
const workflowGuide = [
	"Link to an existing claim when the proposition and scope are already covered and the new question mostly needs routing.",
	"Create a new draft claim when the proposition needs its own evidence base, definitions, or expert pool.",
	"Mark duplicate only when the proposition, scope, and practical answer are already represented elsewhere.",
	"Escalate safety, legal, or privacy issues to admin handling instead of leaving them in the normal intake queue."
];
const moderationGuide = [
	"Start with the smallest accurate intervention: relabel, merge, or clarify before you escalate to restrictions.",
	"Use topic-specific controls when the problem is localized to one claim area rather than sitewide abuse.",
	"Treat factual correction requests differently from conduct appeals; they route into revision review, not just moderation.",
	"Keep the canonical page stable while public threads gather evidence or flag problems."
];
const askFlowGuide = [
	"Loaded questions usually need a neutral rewrite plus a link to an existing claim or misconception module, not a brand-new canonical page.",
	"Multi-question bundles should be decomposed before claim creation so the site does not mint one page that tries to answer three different propositions.",
	"Concept questions such as causation, risk, and uncertainty usually belong with explainers even when they arrive through the thread queue."
];
const trustGuide = [
	"Keep the reviewed answer, last-reviewed date, reviewer line, and source count above the fold on public claim pages.",
	"Use calm, factual language and avoid wording that sounds like an order, a reprimand, or a sales pitch.",
	"Show uncertainty plainly; a clear limitation note is usually safer than overconfident certainty.",
	"Keep minority dissent in context so it does not visually overpower the dominant consensus."
];
const testingGuide = [
	"Run quick think-aloud reviews with non-expert readers before locking major wording changes.",
	"Ask testers to explain the bottom line and the remaining uncertainty in their own words.",
	"Treat confusion around one paragraph or label as a content bug, not just a reader problem."
];

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
const topicPressure = computed(() =>
	Object.values(
		unassignedQuestions.value.reduce<
			Record<string, { topic: Question["topic"]; count: number; sampleTitles: string[]; openClaims: number }>
		>((map, question) => {
			const topicKey = question.topic._id;
			if (!map[topicKey]) {
				map[topicKey] = {
					topic: question.topic,
					count: 0,
					sampleTitles: [],
					openClaims: (topicScopedClaims.value[topicKey] || []).length
				};
			}
			map[topicKey].count += 1;
			if (
				question.title &&
				!map[topicKey].sampleTitles.includes(question.title) &&
				map[topicKey].sampleTitles.length < 3
			) {
				map[topicKey].sampleTitles.push(question.title);
			}
			map[topicKey].openClaims = (topicScopedClaims.value[topicKey] || []).length;
			return map;
		}, {})
	)
		.sort((left, right) => right.count - left.count || left.topic.title.localeCompare(right.topic.title))
		.slice(0, 6)
);
const selectedClaim = ref<Record<string, string>>({});

function daysSince(value?: string) {
	if (!value) return Number.POSITIVE_INFINITY;
	const timestamp = new Date(value).getTime();
	if (!Number.isFinite(timestamp)) return Number.POSITIVE_INFINITY;
	return Math.floor((Date.now() - timestamp) / (24 * 60 * 60 * 1000));
}

function cadenceDays(claim: ClaimSummary) {
	return claim.surveillanceSpec?.cadenceDays ?? (claim.reviewMode === "living" ? 30 : 90);
}

function buildOpsReasons(claim: ClaimSummary) {
	const reasons: string[] = [];
	if ((claim.retractedSourceCount ?? 0) > 0) {
		reasons.push(`${claim.retractedSourceCount} retracted source${claim.retractedSourceCount === 1 ? "" : "s"}`);
	}
	if ((claim.concernSourceCount ?? 0) > 0) {
		reasons.push(`${claim.concernSourceCount} expression${claim.concernSourceCount === 1 ? "" : "s"} of concern`);
	}
	if ((claim.correctedSourceCount ?? 0) > 0) {
		reasons.push(`${claim.correctedSourceCount} corrected citation${claim.correctedSourceCount === 1 ? "" : "s"}`);
	}
	if (
		(claim.flaggedSourceCount ?? 0) > 0 &&
		(claim.retractedSourceCount ?? 0) === 0 &&
		(claim.concernSourceCount ?? 0) === 0
	) {
		reasons.push(`${claim.flaggedSourceCount} flagged citation${claim.flaggedSourceCount === 1 ? "" : "s"}`);
	}
	if (daysSince(claim.lastRetractionCheckAt) > cadenceDays(claim)) {
		reasons.push("retraction check is stale");
	}
	if (daysSince(claim.searchCutoffAt) > cadenceDays(claim)) {
		reasons.push("search cutoff is stale");
	}
	if (claim.nextReviewAt && new Date(claim.nextReviewAt).getTime() <= Date.now()) {
		reasons.push("review date has passed");
	}
	if (!claim.surveillanceSpec?.focus) reasons.push("missing surveillance focus");
	if (!claim.surveillanceSpec?.integrityMonitors?.length) reasons.push("missing integrity monitors");
	if (!claim.surveillanceSpec?.guidelineMonitors?.length) reasons.push("missing guideline monitors");
	if (!claim.surveillanceSpec?.triggerRules?.length) reasons.push("missing trigger rules");
	return reasons;
}

const criticalOpsClaims = computed(() =>
	claims.value
		.filter((claim) => (claim.retractedSourceCount ?? 0) > 0 || (claim.concernSourceCount ?? 0) > 0)
		.map((claim) => ({ claim, reasons: buildOpsReasons(claim) }))
);

const highPriorityOpsClaims = computed(() =>
	claims.value
		.filter((claim) => !criticalOpsClaims.value.some((entry) => entry.claim._id === claim._id))
		.filter((claim) => claim.status === "published" || claim.status === "needs_update")
		.filter(
			(claim) =>
				(claim.flaggedSourceCount ?? 0) > 0 ||
				daysSince(claim.lastRetractionCheckAt) > cadenceDays(claim) ||
				daysSince(claim.searchCutoffAt) > cadenceDays(claim) ||
				(!!claim.nextReviewAt && new Date(claim.nextReviewAt).getTime() <= Date.now())
		)
		.map((claim) => ({ claim, reasons: buildOpsReasons(claim) }))
		.slice(0, 8)
);

const routineOpsClaims = computed(() =>
	claims.value
		.filter(
			(claim) =>
				!criticalOpsClaims.value.some((entry) => entry.claim._id === claim._id) &&
				!highPriorityOpsClaims.value.some((entry) => entry.claim._id === claim._id)
		)
		.filter(
			(claim) =>
				!claim.surveillanceSpec?.focus ||
				!claim.surveillanceSpec?.watchTerms?.length ||
				!claim.surveillanceSpec?.integrityMonitors?.length ||
				!claim.surveillanceSpec?.guidelineMonitors?.length ||
				!claim.surveillanceSpec?.triggerRules?.length
		)
		.map((claim) => ({ claim, reasons: buildOpsReasons(claim) }))
		.slice(0, 8)
);
const loadedQuestionCount = computed(() => unassignedQuestions.value.filter((question) => question.loadedFrame).length);
const bundledQuestionCount = computed(
	() => unassignedQuestions.value.filter((question) => question.multiQuestion).length
);
const conceptQuestionCount = computed(
	() => unassignedQuestions.value.filter((question) => question.askKind === "concept").length
);
const roadmapPreview = firstWaveClaims.slice(0, 6);
const roadmapFollowOn = secondWaveClaims.slice(0, 4);
const roadmapHolds = holdClaims.slice(0, 4);
const demandPatterns = patternPreview.slice(0, 4);
const publishingPreview = publishingPlanPreview.slice(0, 4);
const demandMeasurement = measurementLoop.slice(0, 2);

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
					<span>Critical evidence alerts</span>
					<strong>{{ criticalOpsClaims.length }}</strong>
				</article>
				<article class="summary-card">
					<span>Loaded asks</span>
					<strong>{{ loadedQuestionCount }}</strong>
				</article>
				<article class="summary-card">
					<span>Bundled asks</span>
					<strong>{{ bundledQuestionCount }}</strong>
				</article>
				<article class="summary-card">
					<span>Your access</span>
					<strong>{{ isAdmin ? "Admin" : "Verified expert" }}</strong>
				</article>
			</section>

			<section class="editorial-panel">
				<div class="section-heading section-heading--tight">
					<div>
						<p class="eyebrow">Evidence-ops inbox</p>
						<h2>Monitoring signals that need human review</h2>
					</div>
					<p>
						Automation should surface what changed. Editors decide whether the public answer, source stack,
						or review note needs to move.
					</p>
				</div>

				<div class="ops-grid">
					<section class="ops-column ops-column--critical">
						<div class="ops-column__header">
							<h3>Critical</h3>
							<p>Retractions and expressions of concern should never wait for the next routine review.</p>
						</div>
						<div v-if="!criticalOpsClaims.length" class="empty-state">No critical evidence alerts.</div>
						<div v-else class="claim-list">
							<article v-for="entry in criticalOpsClaims" :key="entry.claim._id" class="claim-card">
								<p class="queue-card__meta">
									<span>{{ entry.claim.topic?.title }}</span>
									<span>{{ entry.claim.sourceCount ?? 0 }} sources</span>
								</p>
								<h3>{{ entry.claim.title }}</h3>
								<ul class="plain-chip-list">
									<li v-for="reason in entry.reasons" :key="reason">{{ reason }}</li>
								</ul>
								<NuxtLink
									class="button button--ghost"
									:to="`/account/editorial/claims/${entry.claim._id}`"
								>
									Open claim
								</NuxtLink>
							</article>
						</div>
					</section>

					<section class="ops-column">
						<div class="ops-column__header">
							<h3>High priority</h3>
							<p>Stale checks, flagged citations, and overdue reviews should move quickly.</p>
						</div>
						<div v-if="!highPriorityOpsClaims.length" class="empty-state">
							No high-priority updates pending.
						</div>
						<div v-else class="claim-list">
							<article v-for="entry in highPriorityOpsClaims" :key="entry.claim._id" class="claim-card">
								<p class="queue-card__meta">
									<span>{{ entry.claim.topic?.title }}</span>
									<span>{{ cadenceDays(entry.claim) }} day cadence</span>
								</p>
								<h3>{{ entry.claim.title }}</h3>
								<ul class="plain-chip-list">
									<li v-for="reason in entry.reasons.slice(0, 4)" :key="reason">{{ reason }}</li>
								</ul>
								<NuxtLink
									class="button button--ghost"
									:to="`/account/editorial/claims/${entry.claim._id}`"
								>
									Open claim
								</NuxtLink>
							</article>
						</div>
					</section>

					<section class="ops-column">
						<div class="ops-column__header">
							<h3>Routine cleanup</h3>
							<p>Fill the monitoring spec so the site can support a real evidence-surveillance loop.</p>
						</div>
						<div v-if="!routineOpsClaims.length" class="empty-state">
							No routine evidence-ops cleanup is queued.
						</div>
						<div v-else class="claim-list">
							<article v-for="entry in routineOpsClaims" :key="entry.claim._id" class="claim-card">
								<p class="queue-card__meta">
									<span>{{ entry.claim.topic?.title }}</span>
									<span>{{ entry.claim.reviewMode === "living" ? "Living" : "Scheduled" }}</span>
								</p>
								<h3>{{ entry.claim.title }}</h3>
								<ul class="plain-chip-list">
									<li v-for="reason in entry.reasons.slice(0, 4)" :key="reason">{{ reason }}</li>
								</ul>
								<NuxtLink
									class="button button--ghost"
									:to="`/account/editorial/claims/${entry.claim._id}`"
								>
									Open claim
								</NuxtLink>
							</article>
						</div>
					</section>
				</div>
			</section>

			<section class="editorial-grid editorial-grid--guide">
				<section class="editorial-panel">
					<div class="section-heading section-heading--tight">
						<div>
							<p class="eyebrow">Routing guide</p>
							<h2>How to route incoming questions</h2>
						</div>
						<p>These rules keep the site from creating multiple competing answers to the same claim.</p>
					</div>
					<ul class="guide-list">
						<li v-for="item in workflowGuide" :key="item">{{ item }}</li>
					</ul>
				</section>

				<section class="editorial-panel">
					<div class="section-heading section-heading--tight">
						<div>
							<p class="eyebrow">Moderation guide</p>
							<h2>How to handle conflict without flattening the workflow</h2>
						</div>
						<p>Community discussion is useful, but canonical pages should not become live edit wars.</p>
					</div>
					<ul class="guide-list">
						<li v-for="item in moderationGuide" :key="item">{{ item }}</li>
					</ul>
					<div class="editorial-panel__links">
						<NuxtLink class="button button--ghost" to="/governance">Governance and workflow</NuxtLink>
						<NuxtLink class="button button--ghost" to="/community-guidelines"
							>Community guidelines</NuxtLink
						>
						<NuxtLink class="button button--ghost" to="/corrections">Corrections policy</NuxtLink>
					</div>
				</section>

				<section class="editorial-panel">
					<div class="section-heading section-heading--tight">
						<div>
							<p class="eyebrow">Ask-flow guide</p>
							<h2>Signals from the public question form</h2>
						</div>
						<p>
							These fields help editors decide whether a question needs routing, reframing, or a new page.
						</p>
					</div>
					<ul class="guide-list">
						<li v-for="item in askFlowGuide" :key="item">{{ item }}</li>
					</ul>
					<p class="muted">
						{{ conceptQuestionCount }} concept asks, {{ loadedQuestionCount }} loaded asks, and
						{{ bundledQuestionCount }} bundled asks are currently sitting in intake.
					</p>
				</section>

				<section class="editorial-panel">
					<div class="section-heading section-heading--tight">
						<div>
							<p class="eyebrow">Trust and wording guide</p>
							<h2>How to keep public copy credible without sounding pushy</h2>
						</div>
						<p>Claim pages work better when the tone stays plain, calm, and visibly evidence-led.</p>
					</div>
					<ul class="guide-list">
						<li v-for="item in trustGuide" :key="item">{{ item }}</li>
					</ul>
					<p class="muted">{{ testingGuide.join(" ") }}</p>
				</section>
			</section>

			<section class="editorial-panel">
				<div class="section-heading section-heading--tight">
					<div>
						<p class="eyebrow">Ask pressure</p>
						<h2>Where new claim demand is building</h2>
					</div>
					<p>
						Use repeated unassigned questions as a signal for what needs a canonical page or a faster
						refresh.
					</p>
				</div>

				<div v-if="!topicPressure.length" class="empty-state">No topic pressure is building right now.</div>
				<div v-else class="pressure-grid">
					<article v-for="item in topicPressure" :key="item.topic._id" class="pressure-card">
						<p class="queue-card__meta">
							<span>{{ item.topic.title }}</span>
							<span>{{ item.count }} open asks</span>
							<span>{{ item.openClaims }} active claims</span>
						</p>
						<h3>{{ item.topic.description || "Claim demand is building in this topic." }}</h3>
						<ul class="pressure-card__list">
							<li v-for="title in item.sampleTitles" :key="title">{{ title }}</li>
						</ul>
					</article>
				</div>
			</section>

			<section class="editorial-panel">
				<div class="section-heading section-heading--tight">
					<div>
						<p class="eyebrow">Canonical backlog</p>
						<h2>Research-backed claims worth building next</h2>
					</div>
					<p>
						Use the roadmap when demand is split across multiple topics and the queue needs a stable
						editorial ordering instead of headline-driven decisions.
					</p>
				</div>

				<div class="ops-grid">
					<section class="ops-column">
						<div class="ops-column__header">
							<h3>First wave</h3>
							<p>Best immediate candidates for the next canonical claim pages.</p>
						</div>
						<ul class="guide-list">
							<li v-for="item in roadmapPreview" :key="item.slug">
								<strong>{{ item.title }}</strong> - {{ item.cluster }}
							</li>
						</ul>
					</section>

					<section class="ops-column">
						<div class="ops-column__header">
							<h3>Second wave</h3>
							<p>Follow-ons that reuse the first-wave method and misconception modules.</p>
						</div>
						<ul class="guide-list">
							<li v-for="item in roadmapFollowOn" :key="item.slug">
								<strong>{{ item.title }}</strong> - {{ item.pageType }}
							</li>
						</ul>
					</section>

					<section class="ops-column">
						<div class="ops-column__header">
							<h3>Hold queue</h3>
							<p>Topics worth delaying until the site can carry stronger uncertainty framing.</p>
						</div>
						<ul class="guide-list">
							<li v-for="item in roadmapHolds" :key="item.slug">
								<strong>{{ item.title }}</strong> - {{ item.cluster }}
							</li>
						</ul>
						<NuxtLink class="button button--ghost" to="/claim-roadmap">Open the full roadmap</NuxtLink>
					</section>
				</div>
			</section>

			<section class="editorial-panel">
				<div class="section-heading section-heading--tight">
					<div>
						<p class="eyebrow">Search-demand signals</p>
						<h2>What public query phrasing should push upward in the queue</h2>
					</div>
					<p>
						Use stable search phrasing to sharpen prioritization. Demand matters most when it overlaps with
						strong anchors and a clean canonical question.
					</p>
				</div>

				<div class="ops-grid">
					<section class="ops-column">
						<div class="ops-column__header">
							<h3>Common query patterns</h3>
							<p>These patterns often signal that a canonical page or explainer is missing.</p>
						</div>
						<ul class="guide-list">
							<li v-for="item in demandPatterns" :key="item.pattern">
								<strong>{{ item.pattern }}</strong> - {{ item.bestFit }}
							</li>
						</ul>
					</section>

					<section class="ops-column">
						<div class="ops-column__header">
							<h3>First month publishing cues</h3>
							<p>Start with the claims and explainers that match the strongest repeating phrasing.</p>
						</div>
						<ul class="guide-list">
							<li v-for="item in publishingPreview" :key="`${item.week}-${item.title}`">
								<strong>{{ item.week }}:</strong> {{ item.title }}
							</li>
						</ul>
					</section>

					<section class="ops-column">
						<div class="ops-column__header">
							<h3>What to measure</h3>
							<p>Use these checks to confirm the search-demand work is actually reducing confusion.</p>
						</div>
						<ul class="guide-list">
							<li v-for="item in demandMeasurement" :key="item">{{ item }}</li>
						</ul>
						<NuxtLink class="button button--ghost" to="/search-demand">Open the full demand page</NuxtLink>
					</section>
				</div>
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
								<span v-if="question.askKind">{{ question.askKind }}</span>
							</p>
							<h3>{{ question.title }}</h3>
							<p>{{ question.body || "No additional context provided." }}</p>
							<ul
								v-if="
									question.loadedFrame ||
									question.multiQuestion ||
									(question.sourceContextType && question.sourceContextType !== 'other') ||
									question.closestMatchLabel
								"
								class="plain-chip-list"
							>
								<li v-if="question.loadedFrame">loaded frame</li>
								<li v-if="question.multiQuestion">multi-question bundle</li>
								<li v-if="question.sourceContextType && question.sourceContextType !== 'other'">
									{{ question.sourceContextType }}
								</li>
								<li v-if="question.closestMatchLabel">
									closest match: {{ question.closestMatchLabel }}
								</li>
							</ul>
							<p v-if="question.differenceNote" class="queue-card__note">
								<strong>What the match missed:</strong> {{ question.differenceNote }}
							</p>
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
.claim-list,
.pressure-grid {
	display: grid;
	gap: 14px;
}

.ops-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ops-column {
	display: grid;
	gap: 12px;
	padding: 18px;
	border-radius: 18px;
	border: 1px solid var(--consensus-soft-line);
	background: var(--consensus-field-surface);
}

.ops-column--critical {
	border-color: rgba(184, 61, 46, 0.35);
}

.ops-column__header h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.ops-column__header p {
	margin: 6px 0 0;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.guide-list {
	margin: 0;
	padding-left: 20px;
	display: grid;
	gap: 10px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.editorial-panel__links {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.pressure-grid {
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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

.pressure-card {
	padding: 18px;
	display: grid;
	gap: 12px;
	background: var(--consensus-field-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 18px;
}

.pressure-card h3 {
	margin: 0;
	font-size: 1rem;
	font-family: "Fraunces", serif;
}

.pressure-card__list {
	margin: 0;
	padding-left: 18px;
	display: grid;
	gap: 8px;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.plain-chip-list {
	margin: 0;
	padding-left: 18px;
	display: grid;
	gap: 8px;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.queue-card__meta {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.queue-card__note {
	margin: 0;
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

.editorial-grid--guide {
	align-items: start;
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

	.ops-grid {
		grid-template-columns: 1fr;
	}
}
</style>
