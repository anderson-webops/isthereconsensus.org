<script setup lang="ts">
const steps = [
	{
		title: "Name the claim",
		body: "Share the video, pull a quote, or describe the idea in your own words."
	},
	{
		title: "Place it on the spectrum",
		body: "We assess whether it’s speculative, emerging, debated, or strongly settled."
	},
	{
		title: "Separate core vs bumps",
		body: "We flag what’s stable and what’s just a new wrinkle."
	},
	{
		title: "Check the scale",
		body: "We translate relative risk into absolute impact so small effects stay small."
	},
	{
		title: "Trace the sources",
		body: "Primary papers, reviews, and trusted voices so you can keep learning."
	}
];

const signals = [
	{
		title: "Constructed knowledge",
		body: "We show the human effort behind the tools, models, and claims."
	},
	{
		title: "Consensus as process",
		body: "Agreement is built through evidence, argument, and replication—not vibes."
	},
	{
		title: "What changes minds",
		body: "We call out the kind of new data that could actually shift the field."
	}
];
</script>

<template>
	<div class="how">
		<header class="how__header">
			<p class="eyebrow">How it works</p>
			<h1>Consensus without the noise.</h1>
			<p>
				Science isn’t a shouting match. It’s a set of careful agreements plus a list of remaining questions. We
				help you see both—and keep the scale honest.
			</p>
		</header>

		<section class="how__grid">
			<article v-for="step in steps" :key="step.title" class="how__card">
				<h3>{{ step.title }}</h3>
				<p>{{ step.body }}</p>
			</article>
		</section>

		<section class="how__signals">
			<div class="how__signals-header">
				<h2>What we surface</h2>
				<p>These themes keep the consensus story grounded in real human effort.</p>
			</div>
			<div class="how__signals-grid">
				<article v-for="signal in signals" :key="signal.title" class="how__signal">
					<h3>{{ signal.title }}</h3>
					<p>{{ signal.body }}</p>
				</article>
			</div>
		</section>

		<section class="how__cta">
			<h2>Ready to try it?</h2>
			<p>Start a consensus check and we will guide you from claim to evidence.</p>
			<NuxtLink class="cta primary" to="/ask">Ask a question</NuxtLink>
		</section>
	</div>
</template>

<style scoped>
.how {
	display: grid;
	gap: 36px;
}

.how__header h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.4rem, 4vw, 3.6rem);
	margin-bottom: 12px;
}

.how__header p {
	max-width: 640px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.how__grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.how__card {
	background: #fff;
	border-radius: 18px;
	padding: 18px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.how__card h3 {
	font-family: "Fraunces", serif;
	margin-bottom: 8px;
}

.how__card p {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.how__signals {
	display: grid;
	gap: 20px;
}

.how__signals-header h2 {
	font-family: "Fraunces", serif;
	margin-bottom: 6px;
}

.how__signals-header p {
	color: var(--consensus-muted);
	max-width: 640px;
}

.how__signals-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.how__signal {
	background: var(--consensus-cream);
	border-radius: 18px;
	padding: 18px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.how__signal h3 {
	font-family: "Fraunces", serif;
	margin-bottom: 8px;
}

.how__signal p {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.how__cta {
	background: linear-gradient(135deg, #f4e6d5, #f0d3bf);
	border-radius: 22px;
	padding: 24px;
	display: grid;
	gap: 12px;
}

.how__cta h2 {
	font-family: "Fraunces", serif;
}

.how__cta p {
	color: var(--consensus-muted);
	max-width: 520px;
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 12px 22px;
	border: none;
	font-size: 0.95rem;
	font-weight: 600;
	cursor: pointer;
	font-family: inherit;
	text-decoration: none;
	width: fit-content;
}

.cta.primary {
	background: var(--consensus-ember);
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}
</style>
