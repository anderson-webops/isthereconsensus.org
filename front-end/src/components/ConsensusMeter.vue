<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		level: number;
		label?: string;
		caption?: string;
	}>(),
	{
		label: "",
		caption: ""
	}
);

const clampedLevel = computed(() => Math.min(Math.max(props.level, 0), 100));
</script>

<template>
	<div class="meter-card">
		<div class="meter" role="img" :aria-label="`Consensus level ${clampedLevel}%`">
			<span class="meter__track" />
			<span class="meter__fill" :style="{ width: `${clampedLevel}%` }" />
		</div>
		<div class="meter__meta">
			<strong>{{ clampedLevel }}%</strong>
			<span v-if="props.label">{{ props.label }}</span>
		</div>
		<p v-if="props.caption" class="meter__caption">{{ props.caption }}</p>
	</div>
</template>

<style scoped>
.meter-card {
	display: grid;
	gap: 10px;
}

.meter {
	position: relative;
	height: 12px;
}

.meter__track,
.meter__fill {
	position: absolute;
	left: 0;
	top: 0;
	height: 100%;
	border-radius: 999px;
}

.meter__track {
	width: 100%;
	background: rgba(21, 17, 13, 0.08);
}

.meter__fill {
	background: linear-gradient(90deg, #9c9a83 0%, #d6b05d 42%, #d36b38 100%);
}

.meter__meta {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	font-size: 0.9rem;
	align-items: baseline;
}

.meter__meta strong {
	font-family: "Fraunces", serif;
	font-size: 1.02rem;
	letter-spacing: 0;
	line-height: 1;
}

.meter__meta span {
	color: var(--consensus-muted);
}

.meter__caption {
	margin: 0;
	max-width: 40ch;
	color: var(--consensus-muted);
	line-height: 1.55;
}
</style>
