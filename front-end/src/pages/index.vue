<script setup lang="ts">
definePageMeta({
	layout: "home"
});

const router = useRouter();

const prompts = [
	"Summarize the video",
	"Recommend related content",
	"Why does science face bias?",
	"How does Crash Course balance education and engagement?",
	'What is the "scandal hypothesis"?'
];

const consensusPillars = [
	{
		title: "What science agrees on",
		body: "Consensus is real on the foundations: evolution, climate, vaccines, and how evidence is weighed. The site foregrounds that stability."
	},
	{
		title: "Where the debate actually lives",
		body: "The loudest disagreements are rarely the real ones. Researchers often debate niche questions—like a new signaling pathway or a frog’s feeding strategy."
	},
	{
		title: "Why this matters",
		body: "Pseudoscience thrives on sensationalism. This project redirects attention to what’s settled, what’s open, and why that distinction matters."
	}
];

const signals = [
	{
		title: "Consensus Check",
		body: "A plain-language summary of where expert agreement stands and why it’s strong."
	},
	{
		title: "Debate Map",
		body: "A snapshot of the real open questions—often small, specific, and fascinating."
	},
	{
		title: "Source Trail",
		body: "Primary papers, review articles, and the key voices shaping the discussion."
	}
];

const question = ref("");

function toAskWithQuestion(prompt: string) {
	question.value = prompt;
	router.push({
		path: "/ask",
		query: { question: prompt }
	});
}

function goToAsk() {
	const trimmed = question.value.trim();
	router.push({
		path: "/ask",
		query: trimmed ? { question: trimmed } : undefined
	});
}
</script>

<template>
	<div class="page">
		<div class="orb orb--peach" />
		<div class="orb orb--sage" />
		<div class="orb orb--ember" />

		<header class="hero">
			<div class="hero__copy reveal" style="animation-delay: 0.05s">
				<p class="eyebrow">isthereconsensus.org</p>
				<h1>Is there consensus?</h1>
				<p class="lead">
					Hello! Curious about what you’re watching? I’m here to help you separate reliable consensus from
					noisy disagreement.
				</p>

				<div class="prompt-card">
					<p class="prompt-title">Not sure what to ask? Choose something:</p>
					<div class="prompt-grid">
						<button
							v-for="prompt in prompts"
							:key="prompt"
							class="prompt-chip"
							type="button"
							@click="toAskWithQuestion(prompt)"
						>
							{{ prompt }}
						</button>
					</div>
				</div>

				<div class="cta-row">
					<NuxtLink class="cta primary" to="/ask">Start a consensus check</NuxtLink>
					<NuxtLink class="cta ghost" to="/how">See how it works</NuxtLink>
				</div>
			</div>

			<div class="hero__panel reveal" style="animation-delay: 0.15s">
				<div class="panel">
					<div class="panel__tag">Idea behind the site</div>
					<h3>Most scientific debates aren’t about the sensational stuff.</h3>
					<p>
						While there are legitimate disputes in science, they’re usually about specialized, “boring”
						questions—not the headline-grabbing claims that pseudoscience leans on.
					</p>
					<ul>
						<li>New cell signaling pathways</li>
						<li>Feeding strategies of a specific frog species</li>
						<li>How to interpret a thin slice of data</li>
					</ul>
				</div>
				<div class="panel panel--accent">
					<div class="panel__tag">The goal</div>
					<h3>Show the real consensus—and the real questions.</h3>
					<p>
						This project highlights where expert agreement is strong and contrasts it with the quieter, more
						technical debates that actually drive science forward.
					</p>
					<div class="signal-row">
						<span>Consensus &uarr;</span>
						<span>Hype &darr;</span>
					</div>
				</div>
			</div>
		</header>

		<section class="section reveal" style="animation-delay: 0.25s">
			<div class="section__header">
				<h2>The guiding idea</h2>
				<p>
					Scientific consensus isn’t the enemy of curiosity—it’s the launchpad. We spotlight the foundations,
					then map the smaller debates that matter.
				</p>
			</div>
			<div class="card-grid">
				<article v-for="pillar in consensusPillars" :key="pillar.title" class="card">
					<h3>{{ pillar.title }}</h3>
					<p>{{ pillar.body }}</p>
				</article>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.35s">
			<div class="section__header">
				<h2>What you’ll get</h2>
				<p>From any video or claim, you get a calm answer: what’s settled, what’s open, and why.</p>
			</div>
			<div class="signal-grid">
				<div v-for="signal in signals" :key="signal.title" class="signal">
					<h3>{{ signal.title }}</h3>
					<p>{{ signal.body }}</p>
				</div>
			</div>
		</section>

		<section class="section section--wide reveal" style="animation-delay: 0.45s">
			<div class="story">
				<div>
					<h2>Curious about what you’re watching?</h2>
					<p>
						Ask in plain language. We translate the science and point to the sources—so you can spend more
						time learning and less time sorting noise.
					</p>
					<div class="ask-card">
						<label class="ask-label" for="ask">Ask a question</label>
						<textarea
							id="ask"
							v-model="question"
							rows="3"
							placeholder="Paste a claim or summarize what you watched..."
						/>
						<button class="cta primary" type="button" @click="goToAsk">Preview a consensus check</button>
					</div>
				</div>
				<div class="story__list">
					<div>
						<span>01</span>
						<p>Drop a link or describe the claim.</p>
					</div>
					<div>
						<span>02</span>
						<p>See consensus vs active debate.</p>
					</div>
					<div>
						<span>03</span>
						<p>Get sources and next questions.</p>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.page {
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 96px;
}

.orb {
	position: absolute;
	border-radius: 999px;
	filter: blur(0px);
	opacity: 0.65;
	pointer-events: none;
	mix-blend-mode: multiply;
	animation: float 10s ease-in-out infinite;
}

.orb--peach {
	width: 320px;
	height: 320px;
	background: radial-gradient(circle at top, #ffd7b0, #eaa07a 70%);
	top: -80px;
	right: 12%;
	animation-delay: -2s;
}

.orb--sage {
	width: 260px;
	height: 260px;
	background: radial-gradient(circle at top, #d5e5d5, #8ab59f 70%);
	bottom: 40%;
	left: -40px;
	animation-delay: -5s;
}

.orb--ember {
	width: 220px;
	height: 220px;
	background: radial-gradient(circle at top, #ffd1c2, #cf6b49 70%);
	bottom: 12%;
	right: -40px;
	animation-delay: -8s;
}

.hero {
	display: grid;
	gap: 32px;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	align-items: start;
	position: relative;
}

.hero__copy {
	max-width: 560px;
}

.hero__copy h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.8rem, 5vw, 4.6rem);
	line-height: 1.05;
	margin: 12px 0 16px;
}

.eyebrow {
	text-transform: uppercase;
	letter-spacing: 0.2em;
	font-size: 0.75rem;
	color: var(--consensus-muted);
}

.lead {
	font-size: 1.15rem;
	line-height: 1.6;
	color: var(--consensus-muted);
	margin-bottom: 28px;
}

.prompt-card {
	background: rgba(255, 255, 255, 0.8);
	border: 1px solid rgba(21, 17, 13, 0.08);
	border-radius: 24px;
	padding: 20px 22px;
	box-shadow: 0 24px 60px rgba(21, 17, 13, 0.08);
	backdrop-filter: blur(6px);
}

.prompt-title {
	font-size: 0.95rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--consensus-muted);
	margin-bottom: 12px;
}

.prompt-grid {
	display: grid;
	gap: 10px;
}

.prompt-chip {
	text-align: left;
	padding: 12px 16px;
	border-radius: 999px;
	border: 1px solid rgba(21, 17, 13, 0.1);
	background: var(--consensus-cream);
	font-family: inherit;
	font-size: 0.95rem;
	color: var(--consensus-ink);
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
}

.prompt-chip:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 20px rgba(21, 17, 13, 0.12);
}

.cta-row {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	margin-top: 24px;
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
}

.cta.primary {
	background: var(--consensus-ember);
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.cta.ghost {
	background: transparent;
	border: 1px solid rgba(21, 17, 13, 0.2);
	color: var(--consensus-ink);
}

.hero__panel {
	display: grid;
	gap: 18px;
}

.panel {
	background: rgba(21, 17, 13, 0.92);
	color: #fdf8f2;
	padding: 24px;
	border-radius: 22px;
	box-shadow: 0 18px 40px rgba(21, 17, 13, 0.2);
}

.panel h3 {
	font-family: "Fraunces", serif;
	margin-top: 8px;
	margin-bottom: 12px;
}

.panel ul {
	margin: 12px 0 0 18px;
	padding: 0;
	color: rgba(253, 248, 242, 0.82);
}

.panel--accent {
	background: linear-gradient(135deg, #f4e6d5, #f0d3bf);
	color: var(--consensus-ink);
}

.panel__tag {
	text-transform: uppercase;
	letter-spacing: 0.15em;
	font-size: 0.7rem;
	color: inherit;
	opacity: 0.7;
}

.signal-row {
	margin-top: 16px;
	display: flex;
	justify-content: space-between;
	font-size: 0.85rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
}

.section {
	display: grid;
	gap: 32px;
}

.section__header h2 {
	font-family: "Fraunces", serif;
	font-size: clamp(2rem, 3vw, 2.8rem);
	margin-bottom: 12px;
}

.section__header p {
	max-width: 680px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.card-grid {
	display: grid;
	gap: 18px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card {
	padding: 20px;
	border-radius: 20px;
	background: #fff;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.card h3 {
	font-family: "Fraunces", serif;
	margin-bottom: 8px;
}

.card p {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.signal-grid {
	display: grid;
	gap: 18px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.signal {
	padding: 22px;
	border-radius: 22px;
	background: rgba(255, 255, 255, 0.85);
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 18px 40px rgba(21, 17, 13, 0.08);
}

.signal h3 {
	font-family: "Fraunces", serif;
	margin-bottom: 8px;
}

.signal p {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.section--wide {
	background: rgba(21, 17, 13, 0.06);
	border-radius: 28px;
	padding: clamp(24px, 4vw, 40px);
}

.story {
	display: grid;
	gap: 28px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	align-items: center;
}

.story h2 {
	font-family: "Fraunces", serif;
	font-size: clamp(2rem, 4vw, 3rem);
	margin-bottom: 12px;
}

.story p {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.story__list {
	display: grid;
	gap: 16px;
}

.story__list div {
	display: flex;
	gap: 16px;
	align-items: center;
	background: #fff;
	padding: 14px 18px;
	border-radius: 18px;
	box-shadow: 0 12px 24px rgba(21, 17, 13, 0.08);
}

.story__list span {
	font-family: "Fraunces", serif;
	font-size: 1.4rem;
	color: var(--consensus-ember);
}

.ask-card {
	margin-top: 20px;
	display: grid;
	gap: 12px;
	padding: 16px;
	border-radius: 18px;
	background: #fff;
	border: 1px solid rgba(21, 17, 13, 0.1);
	box-shadow: 0 14px 30px rgba(21, 17, 13, 0.1);
}

.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.7rem;
	color: var(--consensus-muted);
}

.ask-card textarea {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
	font-size: 0.95rem;
	resize: vertical;
	min-height: 96px;
}

.reveal {
	opacity: 0;
	transform: translateY(18px);
	animation: reveal 0.6s ease forwards;
}

@keyframes reveal {
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes float {
	0%,
	100% {
		transform: translateY(0px);
	}
	50% {
		transform: translateY(-18px);
	}
}

@media (prefers-reduced-motion: reduce) {
	.reveal,
	.orb {
		animation: none;
		opacity: 1;
		transform: none;
	}
}
</style>
