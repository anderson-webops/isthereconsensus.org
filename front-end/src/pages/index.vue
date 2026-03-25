<script setup lang="ts">
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import { getTopicGuide } from "~/data/topicGuides";

definePageMeta({
	layout: "home"
});

const router = useRouter();
const question = ref("");

const promptChips = [
	"Is there a scientific consensus on climate change?",
	"Does one new study actually change the picture?",
	"What would need to happen for experts to change their minds?",
	"How should I read a scary health headline?"
];

const quickStart = [
	{
		title: "Start with what is settled",
		body: "See the stable core before you get pulled into edge cases, headlines, or culture-war framing."
	},
	{
		title: "Then look at the real debate",
		body: "Most live disagreements are narrower than the public version of the question."
	},
	{
		title: "Ask what would change minds",
		body: "Consensus moves when better evidence, better tools, or repeated results outperform the old view."
	}
];

const featuredTopics = [
	{
		title: "Consensus foundations",
		slug: "consensus-foundations",
		description: "How stable claims get built, and why they usually move slowly."
	},
	{
		title: "Active scientific debates",
		slug: "active-debates",
		description: "Where the real disagreement is often technical, narrow, and still worth following."
	},
	{
		title: "Media & misinformation",
		slug: "media-misinformation",
		description: "How headlines, framing, and bad risk language distort what people think science says."
	}
].map((topic) => ({
	...topic,
	guide: getTopicGuide(topic.slug)
}));

const detailCards = [
	{
		title: "Basketball vs bumps",
		body: "The stable consensus is the basketball. Most new studies add a bump to the surface, not a new shape."
	},
	{
		title: "Relative vs absolute risk",
		body: "A headline can describe a large percentage increase while the real-world change stays small."
	},
	{
		title: "Constructed knowledge",
		body: "Math and science are built by people using symbols, methods, and arguments developed over time."
	},
	{
		title: "Consensus is earned",
		body: "It is not a vote. It is what remains after criticism, replication, and repeated attempts to prove an idea wrong."
	}
];

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
				<h1>A simple way to check what experts actually agree on.</h1>
				<p class="lead">
					Start with the short answer, open more context only when you need it, and keep the difference
					between settled knowledge and live debate clear.
				</p>

				<div class="cta-row">
					<NuxtLink class="cta primary" to="/ask">Ask a question</NuxtLink>
					<NuxtLink class="cta ghost" to="/consensus">Browse topics</NuxtLink>
					<NuxtLink class="cta ghost" to="/how">How it works</NuxtLink>
				</div>

				<div class="prompt-card">
					<p class="prompt-title">Try a question</p>
					<div class="prompt-grid">
						<button
							v-for="prompt in promptChips"
							:key="prompt"
							class="prompt-chip"
							type="button"
							@click="toAskWithQuestion(prompt)"
						>
							{{ prompt }}
						</button>
					</div>
				</div>
			</div>

			<div class="hero__aside reveal" style="animation-delay: 0.15s">
				<article class="panel">
					<p class="panel__tag">What this site does</p>
					<h2>Keep the answer readable without flattening the truth.</h2>
					<ul>
						<li>Show the consensus snapshot first</li>
						<li>Keep open questions and public sentiment separate</li>
						<li>Make it obvious what would really change minds</li>
					</ul>
				</article>
				<article class="panel panel--light">
					<p class="panel__tag">One rule of thumb</p>
					<h3>Most headlines describe a bump, not a collapse.</h3>
					<p>
						If a claim sounds dramatic, check whether it changes the stable core of evidence or just adds a
						new wrinkle at the edge.
					</p>
				</article>
			</div>
		</header>

		<section class="section reveal" style="animation-delay: 0.25s">
			<div class="section__header">
				<h2>Start here</h2>
				<p>These three questions do most of the work.</p>
			</div>
			<div class="card-grid">
				<article v-for="item in quickStart" :key="item.title" class="card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.35s">
			<div class="section__header">
				<h2>Browse by topic</h2>
				<p>Open a topic when you want a clean summary first and the deeper discussion after that.</p>
			</div>
			<div class="feature-grid">
				<NuxtLink
					v-for="topic in featuredTopics"
					:key="topic.slug"
					class="feature-card"
					:to="`/consensus/${topic.slug}`"
				>
					<h3>{{ topic.title }}</h3>
					<p>{{ topic.description }}</p>
					<ConsensusMeter
						:level="topic.guide.consensusScore"
						:label="topic.guide.consensusLabel"
						:caption="topic.guide.snapshot"
					/>
					<div class="feature-meta">
						<span>{{ topic.guide.openQuestions.length }} open questions</span>
						<span>{{ topic.guide.commonMisreads.length }} common misreads</span>
					</div>
				</NuxtLink>
			</div>
		</section>

		<section class="section section--soft reveal" style="animation-delay: 0.45s">
			<div class="section__header">
				<h2>Open more context only if you need it</h2>
				<p>
					The site works best when the first screen is calm and the deeper framing stays available on demand.
				</p>
			</div>
			<div class="detail-grid">
				<details v-for="item in detailCards" :key="item.title" class="detail-card">
					<summary>{{ item.title }}</summary>
					<p>{{ item.body }}</p>
				</details>
			</div>
		</section>

		<section class="section section--soft reveal" style="animation-delay: 0.55s">
			<div class="story">
				<div class="story__copy">
					<h2>Bring a claim. Leave with context.</h2>
					<p>
						Paste a link, quote a headline, or write the question in plain language. The goal is to help you
						see what is settled, what is still open, and what deserves caution.
					</p>
					<div class="ask-card">
						<label class="ask-label" for="ask">Ask a question</label>
						<textarea
							id="ask"
							v-model="question"
							rows="3"
							placeholder="Paste a claim, a quote, or the question you want checked..."
						/>
						<button class="cta primary" type="button" @click="goToAsk">Continue to ask</button>
					</div>
				</div>
				<div class="story__steps">
					<div class="step">
						<span>1</span>
						<p>Ask the narrow version of the question.</p>
					</div>
					<div class="step">
						<span>2</span>
						<p>Read the consensus summary before the argument.</p>
					</div>
					<div class="step">
						<span>3</span>
						<p>Open evidence, sentiment, or discussion only when you want more depth.</p>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.page {
	position: relative;
	display: grid;
	gap: 72px;
}

.orb {
	position: absolute;
	border-radius: 999px;
	opacity: 0.6;
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
	top: 38%;
	left: -40px;
	animation-delay: -5s;
}

.orb--ember {
	width: 220px;
	height: 220px;
	background: radial-gradient(circle at top, #ffd1c2, #cf6b49 70%);
	bottom: 8%;
	right: -40px;
	animation-delay: -8s;
}

.hero {
	display: grid;
	gap: 28px;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	align-items: start;
}

.hero__copy {
	max-width: 620px;
	display: grid;
	gap: 22px;
}

.eyebrow,
.panel__tag,
.prompt-title,
.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.14em;
	font-size: 0.72rem;
	color: var(--consensus-muted);
}

.hero__copy h1,
.section__header h2,
.story__copy h2,
.panel h2,
.panel h3,
.card h3,
.feature-card h3 {
	font-family: "Fraunces", serif;
}

.hero__copy h1 {
	font-size: clamp(2.8rem, 5vw, 4.5rem);
	line-height: 1.05;
}

.lead,
.section__header p,
.card p,
.feature-card p,
.detail-card p,
.panel p,
.story__copy p,
.step p {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.cta-row {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 12px 22px;
	border: 1px solid rgba(21, 17, 13, 0.14);
	font-size: 0.95rem;
	font-weight: 600;
	cursor: pointer;
	font-family: inherit;
	text-decoration: none;
}

.cta.primary {
	background: var(--consensus-ember);
	border-color: transparent;
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.cta.ghost {
	background: rgba(255, 255, 255, 0.72);
	color: var(--consensus-ink);
}

.prompt-card,
.panel,
.card,
.feature-card,
.detail-card,
.ask-card,
.step {
	background: rgba(255, 255, 255, 0.86);
	border: 1px solid rgba(21, 17, 13, 0.08);
	border-radius: 22px;
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	backdrop-filter: blur(6px);
}

.prompt-card {
	padding: 20px 22px;
}

.prompt-grid {
	display: grid;
	gap: 10px;
	margin-top: 12px;
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
	cursor: pointer;
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
}

.prompt-chip:hover {
	transform: translateY(-1px);
	box-shadow: 0 10px 20px rgba(21, 17, 13, 0.12);
}

.hero__aside {
	display: grid;
	gap: 16px;
}

.panel {
	padding: 22px;
}

.panel ul {
	margin: 12px 0 0 18px;
	display: grid;
	gap: 8px;
	color: var(--consensus-muted);
}

.panel--light {
	background: linear-gradient(135deg, #f7ebde, #f4e1cf);
}

.section {
	display: grid;
	gap: 24px;
}

.card-grid,
.feature-grid,
.detail-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.card,
.feature-card {
	padding: 20px;
	text-decoration: none;
	color: var(--consensus-ink);
	display: grid;
	gap: 12px;
}

.feature-meta {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	font-size: 0.82rem;
	color: var(--consensus-muted);
}

.section--soft {
	background: rgba(21, 17, 13, 0.05);
	border-radius: 28px;
	padding: clamp(24px, 4vw, 36px);
}

.detail-card {
	padding: 16px 18px;
}

.detail-card summary {
	cursor: pointer;
	font-weight: 700;
	font-family: "Fraunces", serif;
}

.detail-card summary::-webkit-details-marker {
	display: none;
}

.detail-card p {
	margin-top: 10px;
}

.story {
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	align-items: start;
}

.story__copy {
	display: grid;
	gap: 14px;
}

.story__steps {
	display: grid;
	gap: 12px;
}

.step {
	padding: 18px;
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 12px;
	align-items: start;
}

.step span {
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: inline-grid;
	place-items: center;
	background: rgba(211, 107, 56, 0.14);
	color: var(--consensus-ember);
	font-weight: 700;
}

.ask-card {
	padding: 18px;
	display: grid;
	gap: 10px;
}

.ask-card textarea {
	border-radius: 16px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
	font-size: 0.95rem;
	resize: vertical;
	min-height: 96px;
	background: rgba(255, 255, 255, 0.92);
}

@keyframes float {
	0%,
	100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
}

@media (max-width: 720px) {
	.page {
		gap: 56px;
	}

	.cta-row {
		flex-direction: column;
	}

	.cta {
		width: 100%;
	}
}
</style>
