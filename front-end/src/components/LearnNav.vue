<script setup lang="ts">
const route = useRoute();

const sections = [
	{ to: "/explainers", label: "Explainers", icon: "i-carbon-idea" },
	{ to: "/guides", label: "Reading guides", icon: "i-carbon-book" },
	{ to: "/compare", label: "Comparisons", icon: "i-carbon-compare" },
	{ to: "/misconceptions", label: "Common mistakes", icon: "i-carbon-warning-alt" }
] as const;

function isCurrent(path: string) {
	return route.path === path || route.path.startsWith(`${path}/`);
}
</script>

<template>
	<nav class="learn-nav" aria-label="Learn sections">
		<NuxtLink
			v-for="section in sections"
			:key="section.to"
			:to="section.to"
			class="learn-nav__link"
			:aria-current="isCurrent(section.to) ? 'page' : undefined"
		>
			<span :class="section.icon" aria-hidden="true" />
			{{ section.label }}
		</NuxtLink>
	</nav>
</template>

<style scoped>
.learn-nav {
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
}

.learn-nav__link {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	min-height: 40px;
	padding: 8px 14px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 999px;
	background: var(--consensus-surface);
	color: var(--consensus-ink);
	font-size: 0.92rem;
	font-weight: 500;
	text-decoration: none;
	transition:
		border-color 160ms ease,
		background-color 160ms ease;
}

.learn-nav__link:hover {
	border-color: var(--consensus-line);
}

.learn-nav__link[aria-current="page"] {
	border-color: var(--consensus-ink);
	background: var(--consensus-ink);
	color: var(--consensus-mist);
}

.learn-nav__link [class^="i-"] {
	width: 16px;
	height: 16px;
}
</style>
