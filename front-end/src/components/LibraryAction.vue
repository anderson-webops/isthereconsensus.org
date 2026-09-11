<script setup lang="ts">
const props = defineProps<{ kind: "review" | "topic"; id: string }>();
const { $readerLibrary: library } = useNuxtApp();
const key = computed(() => (props.kind === "review" ? "savedReviewIds" : "followedTopicIds"));
const selected = computed(() => library.state[key.value].includes(props.id));
const label = computed(() =>
	props.kind === "review"
		? selected.value
			? "Saved review"
			: "Save review"
		: selected.value
			? "Following topic"
			: "Follow topic"
);
</script>

<template>
	<div class="library-action">
		<ClientOnly>
			<button
				type="button"
				:aria-pressed="selected"
				:disabled="!library.state.ready || library.state.busy || library.state.needsReload"
				@click="library.setSelected(key, id, !selected)"
			>
				<span :class="selected ? 'i-carbon-bookmark-filled' : 'i-carbon-bookmark'" aria-hidden="true" />
				{{ label }}
			</button>
			<template #fallback
				><span class="library-action__placeholder">{{
					kind === "review" ? "Save review" : "Follow topic"
				}}</span></template
			>
		</ClientOnly>
		<NuxtLink to="/library">My library</NuxtLink>
		<span v-if="library.state.ready" class="library-action__scope">{{
			library.state.scope === "account" ? "Account" : "This browser"
		}}</span>
		<span v-if="library.state.error" role="alert">{{ library.state.error }}</span>
		<span v-else class="library-action__notice" role="status">{{ library.state.notice }}</span>
	</div>
</template>

<style scoped>
.library-action {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 0.6rem;
	font-size: 0.875rem;
}
.library-action button,
.library-action__placeholder {
	display: inline-flex;
	align-items: center;
	gap: 0.45rem;
	min-height: 2.75rem;
	padding: 0.55rem 0.85rem;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	background: var(--consensus-surface);
	color: var(--consensus-ink);
	font: inherit;
	font-weight: 600;
}
.library-action button[aria-pressed="true"] {
	background: var(--consensus-soft-accent);
}
.library-action button:disabled {
	opacity: 0.6;
	cursor: wait;
}
.library-action a {
	color: var(--consensus-ink);
	text-underline-offset: 0.2em;
}
.library-action__scope,
.library-action__notice {
	color: var(--consensus-muted);
}
.library-action [role="alert"] {
	flex-basis: 100%;
	color: var(--consensus-ink);
}
</style>
