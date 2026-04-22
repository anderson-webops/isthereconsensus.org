<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { policyGroups, policyPrinciples } from "~/data/policies";

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
			<h1>Policies, governance, and review rules in one place.</h1>
			<p>
				This hub groups the pages that explain the legal baseline, editorial governance, moderation rules, and
				the standards behind reviewed pages.
			</p>
		</header>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>How to use this hub</h2>
				<p>Start with the narrowest page that matches the problem.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in policyPrinciples" :key="item">{{ item }}</li>
			</ul>
		</section>

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

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Related pages</p>
				<h2>Use legal pages for rights questions and policy pages for workflow questions.</h2>
				<p>
					Use Terms and Privacy for baseline legal questions. Use the policy pages here when the issue is
					about review quality, disclosures, moderation, retention, or operational fairness.
				</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/terms">Terms of service</NuxtLink>
				<NuxtLink class="button button--ghost" to="/privacy">Privacy policy</NuxtLink>
				<NuxtLink class="button button--ghost" to="/governance">Governance and workflow</NuxtLink>
			</div>
		</section>
	</div>
</template>
