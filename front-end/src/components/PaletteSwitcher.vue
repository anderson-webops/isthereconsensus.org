<script setup lang="ts">
type PaletteValue = "green" | "blue" | "warm";

const storageKey = "consensus-palette";
const paletteOptions: Array<{ label: string; value: PaletteValue }> = [
	{ label: "Green", value: "green" },
	{ label: "Blue", value: "blue" },
	{ label: "Warm", value: "warm" }
];

const activePalette = ref<PaletteValue>("green");

function isPaletteValue(value: string | null): value is PaletteValue {
	return value === "green" || value === "blue" || value === "warm";
}

function applyPalette(value: PaletteValue) {
	activePalette.value = value;
	document.documentElement.dataset.consensusPalette = value;
	localStorage.setItem(storageKey, value);
}

onMounted(() => {
	const savedPalette = localStorage.getItem(storageKey);
	applyPalette(isPaletteValue(savedPalette) ? savedPalette : "green");
});
</script>

<template>
	<div class="palette-switcher" aria-label="Background palette" role="group">
		<button
			v-for="option in paletteOptions"
			:key="option.value"
			class="palette-switcher__button"
			:class="`palette-switcher__button--${option.value}`"
			type="button"
			:aria-label="`Use ${option.label} background palette`"
			:aria-pressed="activePalette === option.value"
			:title="`${option.label} background palette`"
			@click="applyPalette(option.value)"
		>
			<span class="palette-switcher__swatch" aria-hidden="true" />
		</button>
	</div>
</template>

<style scoped>
.palette-switcher {
	display: inline-flex;
	align-items: center;
	gap: 3px;
	padding: 4px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	background: var(--consensus-elevated-surface);
	box-shadow: 0 10px 24px rgba(21, 17, 13, 0.06);
	backdrop-filter: blur(16px);
}

.palette-switcher__button {
	display: inline-grid;
	place-items: center;
	width: 28px;
	height: 28px;
	padding: 0;
	border: 1px solid transparent;
	border-radius: 999px;
	background: transparent;
	cursor: pointer;
	transition:
		background-color 180ms ease,
		border-color 180ms ease,
		box-shadow 180ms ease,
		transform 180ms ease;
}

.palette-switcher__button:hover {
	background: var(--consensus-soft-line);
	transform: translateY(-1px);
}

.palette-switcher__button:focus-visible {
	outline: 2px solid var(--consensus-debate);
	outline-offset: 3px;
}

.palette-switcher__button[aria-pressed="true"] {
	border-color: var(--consensus-ink);
	background: var(--consensus-soft-accent);
	box-shadow: inset 0 0 0 2px var(--consensus-surface);
}

.palette-switcher__swatch {
	width: 16px;
	height: 16px;
	border: 1px solid rgba(21, 17, 13, 0.16);
	border-radius: 999px;
	background: linear-gradient(135deg, var(--palette-start), var(--palette-end));
}

.palette-switcher__button--green {
	--palette-start: #f7faf8;
	--palette-end: #2f7d64;
}

.palette-switcher__button--blue {
	--palette-start: #f6f9fc;
	--palette-end: #256d85;
}

.palette-switcher__button--warm {
	--palette-start: #fbf8f3;
	--palette-end: #d36b38;
}

:global(.dark) .palette-switcher {
	box-shadow: 0 12px 28px rgba(0, 0, 0, 0.26);
}

:global(.dark) .palette-switcher__swatch {
	border-color: rgba(237, 242, 247, 0.2);
}
</style>
