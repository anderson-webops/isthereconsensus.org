<script setup lang="ts">
import type { CoverageResponse } from "~/types/coverage-roadmap";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { coverageStatusLabels } from "~/types/coverage-roadmap";

useStaticPageMeta({
	title: "Coverage roadmap - Is There Consensus?",
	description: "Follow approved research questions from planning to a published, sourced answer.",
	path: "/roadmap"
});
const { apiUrl } = useApi();
const route = useRoute();
const router = useRouter();
const status = computed(() =>
	typeof route.query.status === "string" && Object.hasOwn(coverageStatusLabels, route.query.status)
		? route.query.status
		: ""
);
const page = computed(() => {
	const value = typeof route.query.page === "string" ? Number(route.query.page) : 1;
	return Number.isInteger(value) && value >= 1 && value <= 200 ? value : 1;
});
const {
	data,
	error,
	status: loadStatus,
	refresh
} = await useAsyncData(
	"coverage-roadmap",
	() =>
		$fetch<CoverageResponse>(apiUrl("/coverage"), {
			query: { page: page.value, limit: 20, ...(status.value ? { status: status.value } : {}) },
			retry: 0
		}),
	{ watch: [status, page] }
);
function browse(nextPage: number, nextStatus = status.value) {
	return router.push({
		path: "/roadmap",
		query: { ...(nextStatus ? { status: nextStatus } : {}), ...(nextPage > 1 ? { page: String(nextPage) } : {}) }
	});
}
</script>

<template>
	<div class="coverage-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Coverage roadmap' }]" />
		<header>
			<p class="eyebrow">Coverage roadmap</p>
			<h1>From a question to a reviewed answer.</h1>
			<p>
				See which questions editors have approved for research, what is being worked on, and where an answer is
				ready.
			</p>
			<p class="muted">
				Only separately approved summaries appear here. Private suggestions stay private, and requests never
				determine a scientific conclusion.
			</p>
			<NuxtLink to="/ask">Suggest a question for review</NuxtLink>
		</header>
		<nav class="coverage-filters" aria-label="Filter coverage requests">
			<button class="button button--ghost" :aria-pressed="!status" @click="browse(1, '')">All requests</button>
			<button
				v-for="(label, value) in coverageStatusLabels"
				:key="value"
				class="button button--ghost"
				:aria-pressed="status === value"
				@click="browse(1, value)"
			>
				{{ label }}
			</button>
		</nav>
		<p v-if="loadStatus === 'pending'" role="status">Loading approved questions…</p>
		<div v-else-if="error" role="alert">
			<p>The roadmap could not be loaded. This does not mean there are no requests.</p>
			<button class="button button--ghost" @click="refresh()">Try again</button>
		</div>
		<template v-else>
			<p v-if="!data?.rows.length">
				No approved requests match this view yet. You can still browse the
				<NuxtLink to="/consensus">reviewed library</NuxtLink> or suggest a missing question.
			</p>
			<article v-for="request in data?.rows" :key="request._id" class="coverage-card">
				<p class="eyebrow">{{ coverageStatusLabels[request.status] }}</p>
				<h2>
					<NuxtLink :to="`/roadmap/${request._id}`">{{ request.title }}</NuxtLink>
				</h2>
				<p>{{ request.summary }}</p>
				<NuxtLink v-if="request.answer" :to="request.answer.path">Read the reviewed answer</NuxtLink>
				<p v-if="request.answerUnavailable" class="muted">
					The linked answer is currently unavailable. Publication status is not proof of an available reviewed
					answer.
				</p>
			</article>
			<nav v-if="page > 1 || data?.pagination.hasMore" class="coverage-filters" aria-label="Coverage pages">
				<button class="button button--ghost" :disabled="page <= 1" @click="browse(page - 1)">Previous</button>
				<span>Page {{ page }}</span>
				<button class="button button--ghost" :disabled="!data?.pagination.hasMore" @click="browse(page + 1)">
					Next
				</button>
			</nav>
		</template>
	</div>
</template>

<style scoped>
.coverage-page {
	display: grid;
	gap: 24px;
	max-width: 900px;
	margin: auto;
	overflow-wrap: anywhere;
}
.coverage-page h1 {
	font:
		600 clamp(1.8rem, 4vw, 2.7rem)/1.16 "Fraunces",
		serif;
}
.coverage-page p {
	line-height: 1.65;
}
.coverage-filters {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	align-items: center;
}
.coverage-filters [aria-pressed="true"] {
	border-color: var(--consensus-interactive);
}
.coverage-card {
	padding: 24px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-surface);
}
.coverage-card h2 {
	margin: 0;
	font:
		600 1.4rem/1.3 "Fraunces",
		serif;
}
.coverage-page a {
	color: var(--consensus-interactive);
	text-underline-offset: 4px;
}
</style>
