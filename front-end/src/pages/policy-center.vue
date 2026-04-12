<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { policyGroups, policyPrinciples } from "~/data/policies";

useHead({
	title: "Policy center - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Policy center' }]" />

		<header class="policy-header">
			<p class="eyebrow">Policy center</p>
			<h1>The site contract, governance rules, and review standards in one place.</h1>
			<p>
				This hub groups the pages that explain what the site promises legally, how editorial power is
				constrained, how moderation and appeals work, and what standards apply to expert review and automation.
			</p>
		</header>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Operating principles</h2>
				<p>These are the rules behind the rules.</p>
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
					<p class="eyebrow">{{ item.status }}</p>
					<h3>{{ item.title }}</h3>
					<p>{{ item.summary }}</p>
					<NuxtLink class="button button--ghost" :to="item.to">Open page</NuxtLink>
				</article>
			</div>
		</section>

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Related pages</p>
				<h2>Start with the narrowest page that matches the problem.</h2>
				<p>
					Use Terms and Privacy for baseline legal questions. Use the standalone governance pages when the
					issue is about review quality, disclosures, moderation, retention, or operational fairness.
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
