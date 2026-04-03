<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === "dark");
const label = computed(() => (isDark.value ? "Dark" : "Light"));
const nextLabel = computed(() => (isDark.value ? "light" : "dark"));

function toggleTheme() {
	colorMode.preference = isDark.value ? "light" : "dark";
}
</script>

<template>
	<button
		class="theme-toggle"
		type="button"
		:aria-pressed="isDark"
		:aria-label="`Switch to ${nextLabel} mode`"
		:title="`Switch to ${nextLabel} mode`"
		@click="toggleTheme"
	>
		<span class="theme-toggle__track" aria-hidden="true">
			<span class="theme-toggle__thumb" />
		</span>
		<span class="theme-toggle__label">{{ label }}</span>
	</button>
</template>

<style scoped>
.theme-toggle {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	padding: 8px 12px;
	border-radius: 999px;
	border: 1px solid var(--consensus-soft-line);
	background: var(--consensus-elevated-surface);
	color: var(--consensus-ink);
	box-shadow: var(--consensus-shell-shadow);
	backdrop-filter: blur(16px);
	cursor: pointer;
}

.theme-toggle__track {
	position: relative;
	width: 44px;
	height: 24px;
	border-radius: 999px;
	background: var(--consensus-soft-accent);
	border: 1px solid var(--consensus-line);
}

.theme-toggle__thumb {
	position: absolute;
	top: 2px;
	left: 2px;
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: var(--consensus-ember);
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
	transform: translateX(0);
	transition:
		transform 180ms ease,
		background-color 180ms ease;
}

:global(.dark) .theme-toggle__thumb {
	transform: translateX(20px);
	background: var(--consensus-moss);
}

.theme-toggle__label {
	font-size: 0.84rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: var(--consensus-muted);
}
</style>
