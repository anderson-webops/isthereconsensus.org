<script setup lang="ts">
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import { getTopicGuide } from "~/data/topicGuides";

definePageMeta({
	layout: "home"
});

const router = useRouter();
const question = ref("");

const startingPaths = [
	{
		step: "01",
		title: "I have a question",
		body: "Use this when a claim, article, or video is bothering you and you want a clean place to start.",
		to: "/ask",
		cta: "Ask a question"
	},
	{
		step: "02",
		title: "I want to browse",
		body: "Open a topic, read the consensus summary first, and only then move into public questions or sentiment.",
		to: "/consensus",
		cta: "Browse topics"
	},
	{
		step: "03",
		title: "I want the short explanation",
		body: "Read the quick guide to how this site separates settled knowledge, live debate, and public confusion.",
		to: "/how",
		cta: "Read how it works"
	}
];

const firstVisitSteps = [
	"Pick one topic instead of trying to read the whole site at once.",
	"Inside a topic, start with the Consensus view before opening Questions or Sentiment.",
	"Use the community board after you know the frame, not before."
];

const promptChips = [
	"Is there a scientific consensus on climate change?",
	"Does one new study actually change the picture?",
	"What would need to happen for experts to change their minds?",
	"How should I read a scary health headline?"
];

const detailCards = [
	{
		title: "Basketball vs bumps",
		body: "The stable consensus is the basketball. Most new studies add a bump to the surface, not a whole new shape."
	},
	{
		title: "Relative vs absolute risk",
		body: "A headline can describe a large percentage increase while the actual real-world change remains small."
	},
	{
		title: "Constructed knowledge",
		body: "Math and science are built by people using tools, symbols, and methods that were developed over time."
	}
];

const featuredTopics = [
	{
		title: "Consensus foundations",
		slug: "consensus-foundations",
		description:
			"Start here if you want to understand how stable claims get built and why they usually move slowly."
	},
	{
		title: "Media & misinformation",
		slug: "media-misinformation",
		description:
			"Start here if you want help translating headlines, hype, and misleading framing into clearer questions."
	},
	{
		title: "Active scientific debates",
		slug: "active-debates",
		description: "Start here if you want to see what real scientific disagreement usually looks like."
	}
].map((topic) => ({
	...topic,
	guide: getTopicGuide(topic.slug)
}));

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
				<h1>Start with the short answer. Open the deeper context only when you need it.</h1>
				<p class="lead">
					This site is built to help you find one clear path: what experts agree on, what is still genuinely
					open, and what headlines or public opinion tend to get wrong.
				</p>

				<div class="cta-row">
					<NuxtLink class="cta primary" to="/consensus">Browse topics</NuxtLink>
					<NuxtLink class="cta ghost" to="/ask">Ask a question</NuxtLink>
					<NuxtLink class="cta ghost" to="/how">How it works</NuxtLink>
				</div>
			</div>

			<div class="hero__aside reveal" style="animation-delay: 0.15s">
				<article class="panel panel--accent">
					<p class="panel__tag">First visit?</p>
					<h2>Do not try to read everything.</h2>
					<p>
						Pick one topic, read its Consensus view first, and treat the rest of the page as optional depth.
					</p>
				</article>
				<article class="panel">
					<p class="panel__tag">What this site tries to prevent</p>
					<ul>
						<li>Getting lost in community discussion before you know the frame</li>
						<li>Mistaking one new study for a collapse of the whole picture</li>
						<li>Treating crowd opinion like expert consensus</li>
					</ul>
				</article>
			</div>
		</header>

		<section class="section reveal" style="animation-delay: 0.25s">
			<div class="section__header">
				<h2>Choose your path</h2>
				<p>Most people only need one of these.</p>
			</div>
			<div class="path-grid">
				<NuxtLink v-for="path in startingPaths" :key="path.title" class="path-card" :to="path.to">
					<span class="path-card__step">{{ path.step }}</span>
					<h3>{{ path.title }}</h3>
					<p>{{ path.body }}</p>
					<span class="path-card__cta">{{ path.cta }} →</span>
				</NuxtLink>
			</div>
		</section>

		<section class="section section--soft reveal" style="animation-delay: 0.35s">
			<div class="section__header">
				<h2>If you are new, read in this order</h2>
				<p>This is the intended path through the site.</p>
			</div>
			<div class="visit-grid">
				<article v-for="(step, index) in firstVisitSteps" :key="step" class="visit-step">
					<span>{{ index + 1 }}</span>
					<p>{{ step }}</p>
				</article>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.45s">
			<div class="section__header">
				<h2>Start with one topic</h2>
				<p>These are good entry points because each one teaches a different part of the site’s logic.</p>
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
					<span class="feature-card__cta">Open topic →</span>
				</NuxtLink>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.55s">
			<div class="section__header">
				<h2>Try a question</h2>
				<p>If you want to feel the site quickly, start with one example instead of reading every explainer.</p>
			</div>
			<div class="prompt-card">
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
		</section>

		<section class="section section--soft reveal" style="animation-delay: 0.65s">
			<div class="section__header">
				<h2>Only open these if you want more context</h2>
				<p>These ideas matter, but they do not need to hit all at once on the first screen.</p>
			</div>
			<div class="detail-grid">
				<details v-for="item in detailCards" :key="item.title" class="detail-card">
					<summary>{{ item.title }}</summary>
					<p>{{ item.body }}</p>
				</details>
			</div>
		</section>

		<section class="section section--soft reveal" style="animation-delay: 0.75s">
			<div class="story">
				<div class="story__copy">
					<h2>Bring a claim. Leave with a better reading order.</h2>
					<p>
						Paste the claim, choose the topic where it belongs, and let the site sort the conversation into
						consensus first, questions second, and public sentiment separately.
					</p>
				</div>
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
		</section>
	</div>
</template>

<style scoped>
.page {
	position: relative;
	display: grid;
	gap: 64px;
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

.hero__copy,
.hero__aside,
.story__copy {
	display: grid;
	gap: 18px;
}

.hero__copy {
	max-width: 680px;
}

.eyebrow,
.panel__tag,
.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.14em;
	font-size: 0.72rem;
	color: var(--consensus-muted);
}

.hero__copy h1,
.section__header h2,
.path-card h3,
.feature-card h3,
.story__copy h2,
.panel h2,
.detail-card summary {
	font-family: "Fraunces", serif;
}

.hero__copy h1 {
	font-size: clamp(2.8rem, 5vw, 4.4rem);
	line-height: 1.05;
}

.lead,
.section__header p,
.path-card p,
.feature-card p,
.panel p,
.panel li,
.visit-step p,
.detail-card p,
.story__copy p {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.cta-row,
.feature-grid,
.path-grid,
.visit-grid,
.detail-grid {
	display: grid;
	gap: 16px;
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

.panel,
.path-card,
.feature-card,
.prompt-card,
.visit-step,
.detail-card,
.ask-card {
	background: rgba(255, 255, 255, 0.88);
	border: 1px solid rgba(21, 17, 13, 0.08);
	border-radius: 22px;
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	backdrop-filter: blur(6px);
}

.panel,
.path-card,
.feature-card,
.visit-step,
.ask-card {
	padding: 22px;
}

.panel ul {
	margin: 0;
	padding-left: 18px;
	display: grid;
	gap: 8px;
}

.panel--accent {
	background: linear-gradient(135deg, #f7ebde, #f4e1cf);
}

.section {
	display: grid;
	gap: 20px;
}

.path-grid,
.feature-grid,
.visit-grid,
.detail-grid {
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.path-card,
.feature-card {
	text-decoration: none;
	color: var(--consensus-ink);
	display: grid;
	gap: 12px;
}

.path-card__step {
	font-size: 0.78rem;
	font-weight: 700;
	letter-spacing: 0.14em;
	color: var(--consensus-muted);
}

.path-card__cta,
.feature-card__cta {
	font-weight: 700;
	color: var(--consensus-ember);
}

.section--soft {
	background: rgba(21, 17, 13, 0.05);
	border-radius: 28px;
	padding: clamp(24px, 4vw, 36px);
}

.visit-step {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 12px;
	align-items: start;
}

.visit-step span {
	width: 34px;
	height: 34px;
	border-radius: 50%;
	display: inline-grid;
	place-items: center;
	background: rgba(211, 107, 56, 0.14);
	color: var(--consensus-ember);
	font-weight: 700;
}

.prompt-card {
	padding: 18px;
}

.prompt-grid {
	display: grid;
	gap: 10px;
}

.prompt-chip {
	text-align: left;
	padding: 12px 16px;
	border-radius: 16px;
	border: 1px solid rgba(21, 17, 13, 0.1);
	background: var(--consensus-cream);
	font-family: inherit;
	font-size: 0.95rem;
	color: var(--consensus-ink);
	cursor: pointer;
}

.detail-card {
	padding: 16px 18px;
}

.detail-card summary {
	cursor: pointer;
	font-weight: 700;
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

.ask-card {
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
	min-height: 100px;
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
		gap: 52px;
	}

	.cta-row {
		flex-direction: column;
	}

	.cta {
		width: 100%;
	}
}
</style>
