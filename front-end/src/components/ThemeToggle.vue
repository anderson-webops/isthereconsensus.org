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
	width: 42px;
	height: 42px;
	padding: 0;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	box-shadow: 0 10px 24px rgba(21, 17, 13, 0.1);
	backdrop-filter: blur(16px);
	cursor: pointer;
	transition:
		background-color 180ms ease,
		border-color 180ms ease,
		box-shadow 180ms ease,
		color 180ms ease,
		transform 180ms ease;
}

.theme-toggle:hover {
	transform: translateY(-1px);
	border-color: var(--consensus-soft-line);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.14);
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
	box-shadow: 0 14px 32px rgba(0, 0, 0, 0.32);
}

:global(.dark) .theme-toggle:hover {
	box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
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
