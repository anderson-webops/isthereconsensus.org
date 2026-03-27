<script setup lang="ts">
interface BreadcrumbItem {
	label: string;
	to?: string;
}

defineProps<{
	items: BreadcrumbItem[];
}>();
</script>

<template>
	<nav class="breadcrumbs" aria-label="Breadcrumb">
		<ol>
			<li v-for="(item, index) in items" :key="`${item.label}-${index}`">
				<NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
				<span v-else>{{ item.label }}</span>
				<span v-if="index < items.length - 1" class="breadcrumbs__divider">/</span>
			</li>
		</ol>
	</nav>
</template>

<style scoped>
.breadcrumbs ol {
	margin: 0;
	padding: 0;
	list-style: none;
	display: flex;
	flex-wrap: wrap;
	gap: 8px;
	align-items: center;
	font-size: 0.9rem;
	color: var(--consensus-muted);
}

.breadcrumbs li {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.breadcrumbs a,
.breadcrumbs span {
	color: inherit;
	text-decoration: none;
}

.breadcrumbs a:hover {
	color: var(--consensus-ink);
}

.breadcrumbs__divider {
	opacity: 0.7;
}
</style>
