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
			<li
				v-for="(item, index) in items"
				:key="`${item.label}-${index}`"
				:class="{ 'breadcrumbs__item--current': index === items.length - 1 }"
			>
				<NuxtLink v-if="item.to && index < items.length - 1" class="breadcrumbs__link" :to="item.to">
					{{ item.label }}
				</NuxtLink>
				<span
					v-else
					class="breadcrumbs__current"
					:aria-current="index === items.length - 1 ? 'page' : undefined"
				>
					{{ item.label }}
				</span>
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
	gap: 6px;
	align-items: center;
	font-size: 0.88rem;
	color: var(--consensus-muted);
}

.breadcrumbs li {
	display: inline-flex;
	align-items: center;
	gap: 6px;
}

.breadcrumbs__link,
.breadcrumbs__current {
	text-decoration: none;
}

.breadcrumbs__link {
	color: var(--consensus-muted);
}

.breadcrumbs__link:hover {
	color: var(--consensus-ink);
}

.breadcrumbs__current {
	color: var(--consensus-ink);
	font-weight: 600;
}

.breadcrumbs__divider {
	opacity: 0.45;
}
</style>
