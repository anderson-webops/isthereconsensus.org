<script setup lang="ts">
import AuthPanel from "~/components/AuthPanel.vue";

const contributorLanes = [
	{
		title: "Member",
		body: "Ask questions, post source links, and help surface where the public framing is drifting away from the evidence."
	},
	{
		title: "Trusted contributor",
		body: "Contributors who consistently ask focused, source-backed questions can help sharpen topic lanes and explainers."
	},
	{
		title: "Expert reviewer",
		body: "Verified domain experts and invited reviewers help keep the consensus maps grounded in real disciplinary norms."
	}
];

const reviewPrinciples = [
	"Keep the stable core visible even when the frontier is interesting.",
	"Separate curiosity, opinion, and evidence instead of blending them together.",
	"Favor precise claims and original sources over vague summaries."
];
</script>

<template>
	<div class="account-page">
		<header class="account-page__header">
			<p class="eyebrow">Account</p>
			<h1>Manage access and contributor roles.</h1>
			<p>
				Accounts unlock posting today. Over time this area also supports trusted contributors and expert review
				paths for the curated consensus lane.
			</p>
		</header>

		<AuthPanel
			title="Account access"
			hint="Your account controls posting now and moderation or review roles later."
		/>

		<section class="account-page__grid">
			<article v-for="lane in contributorLanes" :key="lane.title" class="info-card">
				<h2>{{ lane.title }}</h2>
				<p>{{ lane.body }}</p>
			</article>
		</section>

		<section class="principles">
			<h2>Contributor principles</h2>
			<ul>
				<li v-for="item in reviewPrinciples" :key="item">{{ item }}</li>
			</ul>
		</section>
	</div>
</template>

<style scoped>
.account-page {
	display: grid;
	gap: 28px;
}

.account-page__header h1,
.info-card h2,
.principles h2 {
	font-family: "Fraunces", serif;
}

.account-page__header h1 {
	font-size: clamp(2.3rem, 4vw, 3.4rem);
	margin-bottom: 8px;
}

.account-page__header p,
.info-card p {
	max-width: 720px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.account-page__grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.info-card,
.principles {
	background: #fff;
	border-radius: 20px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.principles ul {
	margin: 12px 0 0;
	padding-left: 18px;
	display: grid;
	gap: 8px;
	color: var(--consensus-muted);
	line-height: 1.55;
}
</style>
