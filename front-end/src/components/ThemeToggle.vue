<script setup lang="ts">
const colorMode = useColorMode();
const hydrated = ref(false);

const isDark = computed(() => hydrated.value && colorMode.value === "dark");
const toggleLabel = computed(() => (isDark.value ? "Switch to light mode" : "Switch to dark mode"));

onMounted(() => {
	hydrated.value = true;
});

function toggleTheme() {
	colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
	<button class="theme-toggle" type="button" :aria-label="toggleLabel" :title="toggleLabel" @click="toggleTheme">
		<span class="i-carbon-sun theme-toggle__icon theme-toggle__icon--sun" aria-hidden="true" />
		<span class="i-carbon-moon theme-toggle__icon theme-toggle__icon--moon" aria-hidden="true" />
	</button>
</template>

<style scoped>
.theme-toggle {
	display: inline-grid;
	place-items: center;
	width: 38px;
	height: 38px;
	padding: 0;
	border-radius: 999px;
	border: 1px solid var(--consensus-soft-line);
	background: var(--consensus-field-surface);
	color: var(--consensus-ink);
	cursor: pointer;
	transition:
		background-color 180ms ease,
		border-color 180ms ease,
		color 180ms ease,
		transform 180ms ease;
}

.theme-toggle:hover {
	transform: translateY(-1px);
	border-color: var(--consensus-interactive);
	background: var(--consensus-soft-accent);
}

.theme-toggle:focus-visible {
	outline: 2px solid var(--consensus-debate);
	outline-offset: 3px;
}

.theme-toggle__icon {
	display: inline-block;
	width: 1.05em;
	height: 1.05em;
	font-size: 1.05rem;
	color: var(--consensus-ember);
}

.theme-toggle__icon--moon {
	display: none;
}

:global(.dark) .theme-toggle {
	background: var(--consensus-field-surface);
}

:global(.dark) .theme-toggle__icon {
	color: var(--consensus-moss);
}

:global(.dark) .theme-toggle__icon--sun {
	display: none;
}

:global(.dark) .theme-toggle__icon--moon {
	display: inline-block;
}
</style>
