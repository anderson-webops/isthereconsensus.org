<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { policyGroups } from "~/data/policies";

function formatStatusLabel(status: "core" | "operational" | "program") {
	if (status === "core") return "Core";
	if (status === "program") return "Program";
	return "Operational";
}

useHead({
	title: "Policy center - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Policy center' }]" />

		<header class="policy-header">
			<p class="eyebrow">Policy center</p>
			<h1>Core policies and review rules in one place.</h1>
			<p>
				Use this hub for legal, moderation, correction, and review-rule pages. Most readers only need one trust
				page plus the legal page that matches the problem.
			</p>
		</header>

		<section v-for="group in policyGroups" :key="group.title" class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>{{ group.title }}</h2>
				<p>{{ group.description }}</p>
			</div>
			<div class="policy-card-grid">
				<article v-for="item in group.items" :key="item.to" class="policy-detail-card">
					<p class="eyebrow">{{ formatStatusLabel(item.status) }}</p>
					<h3>{{ item.title }}</h3>
					<p>{{ item.summary }}</p>
					<NuxtLink class="button button--ghost" :to="item.to">Open page</NuxtLink>
				</article>
			</div>
		</section>
	</div>
</template>
