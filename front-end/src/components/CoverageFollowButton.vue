<script setup lang="ts">
import type { ReaderLibraryController } from "~/utils/reader-library";

const props = defineProps<{ requestId: string; title: string }>();
const library = useNuxtApp().$readerLibrary as ReaderLibraryController;
const following = computed(() => library.state.followedCoverageRequestIds.includes(props.requestId));
const interacted = ref(false);
async function toggle() {
	interacted.value = true;
	await library.setSelected("followedCoverageRequestIds", props.requestId, !following.value);
}
</script>

<template>
	<div class="coverage-follow">
		<button
			type="button"
			class="button button--ghost"
			:aria-pressed="following"
			:aria-label="`${following ? 'Unfollow' : 'Follow'} requested question: ${title}`"
			:disabled="!library.state.ready || library.state.busy || library.state.needsReload"
			@click="toggle"
		>
			{{ following ? "Following question" : "Follow question" }}
		</button>
		<p v-if="interacted && library.state.error" role="alert">{{ library.state.error }}</p>
		<p v-else-if="interacted && library.state.notice" role="status">{{ library.state.notice }}</p>
		<NuxtLink to="/library#followed-questions">View followed questions in My library</NuxtLink>
	</div>
</template>

<style scoped>
.coverage-follow {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 12px;
	margin-top: 16px;
	font-size: 0.875rem;
}
.coverage-follow p {
	flex-basis: 100%;
	margin: 0;
}
.coverage-follow a {
	color: var(--consensus-interactive);
	text-underline-offset: 4px;
}
</style>
