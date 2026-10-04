<script setup lang="ts">
import type { CoverageRequest } from "~/types/coverage-roadmap";
import CoverageFollowButton from "~/components/CoverageFollowButton.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { coverageStatusLabels } from "~/types/coverage-roadmap";

const route = useRoute("roadmap-id");
const { apiUrl } = useApi();
const requestId = computed(() => String(route.params.id));
if (!/^[a-f\d]{24}$/.test(requestId.value))
	throw createError({ statusCode: 404, statusMessage: "Coverage request not found" });
const { data, error, refresh } = await useAsyncData(
	() => `coverage-request:${requestId.value}`,
	() => $fetch<{ row: CoverageRequest }>(apiUrl(`/coverage/${requestId.value}`), { retry: 0 })
);
if ((error.value as { statusCode?: number } | null)?.statusCode === 404)
	throw createError({ statusCode: 404, statusMessage: "Coverage request not found" });
const request = computed(() => data.value?.row);
useStaticPageMeta({
	title: "Requested question - Is There Consensus?",
	description: "See the approved scope, editorial progress and published answer for a requested question.",
	path: `/roadmap/${requestId.value}`
});
useHead(() => ({
	title: request.value ? `${request.value.title} - Is There Consensus?` : "Requested question - Is There Consensus?"
}));
</script>

<template>
	<div class="coverage-request">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Coverage roadmap', to: '/roadmap' },
				{ label: request?.title || 'Requested question' }
			]"
		/>
		<div v-if="error" role="alert">
			<p>This coverage request could not be loaded.</p>
			<button class="button button--ghost" @click="refresh()">Try again</button>
		</div>
		<template v-else-if="request">
			<header>
				<p class="eyebrow">{{ coverageStatusLabels[request.status] }}</p>
				<h1>{{ request.title }}</h1>
				<p>{{ request.summary }}</p>
				<p class="muted">
					This is an approved research question. A request's popularity cannot determine the scientific
					answer.
				</p>
			</header>
			<CoverageFollowButton :request-id="request._id" :title="request.title" />
			<p class="muted">
				Follow approved progress and the eventual answer in your browser or account library. No email
				notifications are sent.
			</p>
			<NuxtLink v-if="request.topic" :to="`/consensus/${request.topic.slug}`"
				>Explore {{ request.topic.title }}</NuxtLink
			>
			<section v-if="request.answer || request.answerUnavailable" class="coverage-request__panel">
				<h2>Reviewed answer</h2>
				<NuxtLink v-if="request.answer" :to="request.answer.path">{{ request.answer.title }}</NuxtLink>
				<p v-else>The linked answer is currently unavailable. Check the reviewed library or return later.</p>
			</section>
			<section class="coverage-request__panel">
				<h2>Editorial progress</h2>
				<ol>
					<li v-for="event in request.history" :key="event.id || event.date">
						<p>
							<strong>{{ coverageStatusLabels[event.status] }}</strong> ·
							{{ new Date(event.date).toLocaleDateString() }}
						</p>
						<p>{{ event.summary }}</p>
					</li>
				</ol>
			</section>
			<NuxtLink to="/roadmap">Browse other approved questions</NuxtLink>
		</template>
	</div>
</template>

<style scoped>
.coverage-request {
	display: grid;
	gap: 24px;
	max-width: 800px;
	margin: auto;
	overflow-wrap: anywhere;
}
.coverage-request h1 {
	font:
		600 clamp(1.8rem, 4vw, 2.7rem)/1.16 "Fraunces",
		serif;
}
.coverage-request p {
	line-height: 1.65;
}
.coverage-request__panel {
	padding: 24px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-surface);
}
.coverage-request__panel h2 {
	font:
		600 1.4rem/1.3 "Fraunces",
		serif;
	margin-top: 0;
}
.coverage-request a {
	color: var(--consensus-interactive);
	text-underline-offset: 4px;
}
.coverage-request li + li {
	margin-top: 20px;
}
</style>
