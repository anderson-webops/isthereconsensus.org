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
			<span class="meter__dot" :style="{ left: `${clampedLevel}%` }" />
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
	height: 16px;
}

.meter__track,
.meter__fill {
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	height: 10px;
	border-radius: 999px;
}

.meter__track {
	width: 100%;
	background: rgba(21, 17, 13, 0.08);
}

.meter__fill {
	background: linear-gradient(90deg, #8e8e80 0%, #d6b05d 40%, #d36b38 100%);
}

.meter__dot {
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: #fff;
	border: 3px solid var(--consensus-ember);
	box-shadow: 0 8px 18px rgba(21, 17, 13, 0.14);
}

.meter__meta {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	font-size: 0.92rem;
	align-items: baseline;
}

.meter__caption {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.5;
}
</style>
