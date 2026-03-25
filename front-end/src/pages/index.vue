<script setup lang="ts">
import ConsensusMeter from "~/components/ConsensusMeter.vue";
import { getTopicGuide } from "~/data/topicGuides";

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
		title: "Knowledge is built, not given",
		body: "Math and science are human inventions: symbols, models, and tools made to solve problems over time."
	},
	{
		title: "Consensus through evidence",
		body: "Agreement comes from data, debate, and replication, not a show of hands."
	},
	{
		title: "Stable core vs new bumps",
		body: "Most new studies add a small bump to a stable core, not a total rewrite."
	},
	{
		title: "Make sense of science news",
		body: "We translate headlines into scale, especially relative vs absolute risk."
	},
	{
		title: "What changes minds",
		body: "We ask what evidence would actually overturn a claim and why that bar exists."
	}
];

const signals = [
	{
		title: "Consensus Snapshot",
		body: "Plain-language clarity on where expert agreement stands and what anchors it."
	},
	{
		title: "Debate Map",
		body: "The actual unresolved questions—often narrow, technical, and interesting."
	},
	{
		title: "Evidence Trail",
		body: "Primary papers, reviews, and the voices shaping the field."
	}
];

const consensusSpectrum = [
	{
		tag: "Speculative",
		title: "Interesting idea",
		body: "A hypothesis with limited evidence or early signals."
	},
	{
		tag: "Emerging",
		title: "Evidence building",
		body: "Multiple studies, still uneven or small in scope."
	},
	{
		tag: "Active debate",
		title: "Competing models",
		body: "Serious disagreement on mechanisms, timelines, or effect size."
	},
	{
		tag: "Strong consensus",
		title: "Stable foundations",
		body: "Decades of converging evidence and broad agreement."
	}
];

const lenses = [
	{
		title: "An equal sign is a claim",
		body: "Equations aren’t magic. They’re statements that must be justified."
	},
	{
		title: "Relative vs absolute risk",
		body: "A big percentage can still mean a tiny real-world change."
	},
	{
		title: "What would change minds?",
		body: "Consensus shifts when new evidence or methods clearly outperform the old."
	}
];

const bumps = ["New study", "Methods debate", "Edge cases", "Effect size", "Alternate model"];

const meterSamples = [
	{ topic: "Vaccines and autism", level: 92, label: "Strong consensus (no link)" },
	{ topic: "Cell phones and cancer", level: 38, label: "Mixed evidence, active research" },
	{ topic: "Climate change cause", level: 88, label: "Strong consensus (human-driven)" }
];

const explainers = [
	{
		title: "Inventing Zero",
		body: "A short story about how humans created the idea of zero and why it changed everything."
	},
	{
		title: "Ulcers: From lone idea to consensus",
		body: "How H. pylori moved from fringe to fact after evidence and replication piled up."
	},
	{
		title: "Consensus spectrum",
		body: "Why some questions are settled, some debated, and others still speculative."
	},
	{
		title: "Basketball vs bumps in action",
		body: "A headline looks huge until you see it in the context of decades of data."
	}
];

const featuredTopics = [
	{
		title: "Consensus foundations",
		slug: "consensus-foundations",
		description: "Why stable claims stay stable, and what it actually takes to move a field."
	},
	{
		title: "Active scientific debates",
		slug: "active-debates",
		description: "Where the real disagreement is often narrower and more technical than the headlines suggest."
	},
	{
		title: "Media & misinformation",
		slug: "media-misinformation",
		description: "How framing, false balance, and risk language distort public understanding."
	}
].map((topic) => ({
	...topic,
	guide: getTopicGuide(topic.slug)
}));

const launchSignals = [
	"Live readiness checks for frontend, backend, Mongo, cookies, captcha, and API origin",
	"A copyable server-agent prompt tailored to this repo’s Nuxt SSR plus Express architecture",
	"A production checklist covering services, reverse proxy, TLS, environment, and go-live validation"
];

const headlineReality = [
	{
		headline: "New pill cuts risk in half!",
		reality: "In the study, risk dropped from 4% to 2%. Big relative change, small absolute change."
	},
	{
		headline: "Coffee causes cancer (again)!",
		reality: "One study found a small signal, but the broader evidence still shows no clear causal link."
	},
	{
		headline: "Breakthrough proves cold fusion",
		reality: "A single result without replication is a bump, not a new core."
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
					A calm guide to how knowledge gets built: what experts agree on, what is still debated, and how to
					read claims without panic.
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
					<h3>Knowledge is made by people, not dropped from the sky.</h3>
					<p>
						Math and science are constructed: tools, arguments, and methods built over time. When we hide
						the human effort, learning turns into memorizing artifacts.
					</p>
					<ul>
						<li>An equal sign is a claim to be justified</li>
						<li>Consensus is the result of real disagreement</li>
						<li>Evidence beats vibes, but it takes time</li>
					</ul>
				</div>
				<div class="panel panel--accent">
					<div class="panel__tag">The goal</div>
					<h3>Separate the basketball from the bumps.</h3>
					<p>
						We highlight the stable core of consensus while surfacing the smaller, technical questions that
						headlines often exaggerate.
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
					Consensus isn’t the end of curiosity—it’s the launchpad. We show the foundations, then map the
					smaller debates that give science its texture.
				</p>
			</div>
			<div class="card-grid">
				<article v-for="pillar in consensusPillars" :key="pillar.title" class="card">
					<h3>{{ pillar.title }}</h3>
					<p>{{ pillar.body }}</p>
				</article>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.3s">
			<div class="section__header">
				<h2>Consensus is a spectrum</h2>
				<p>
					There isn’t just “known” and “unknown.” Most ideas live on a continuum—some are stable foundations,
					others are still being argued, tested, or refined.
				</p>
			</div>
			<div class="spectrum-grid">
				<article v-for="stage in consensusSpectrum" :key="stage.title" class="spectrum-card">
					<span class="spectrum-tag">{{ stage.tag }}</span>
					<h3>{{ stage.title }}</h3>
					<p>{{ stage.body }}</p>
				</article>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.32s">
			<div class="section__header">
				<h2>Consensus at a glance</h2>
				<p>Use a quick meter to see how settled a topic is before diving deeper.</p>
			</div>
			<div class="meter-grid">
				<article v-for="sample in meterSamples" :key="sample.topic" class="meter-card">
					<h3>{{ sample.topic }}</h3>
					<div class="meter" role="img" :aria-label="`${sample.topic} consensus level ${sample.level}%`">
						<span class="meter__track" />
						<span class="meter__fill" :style="{ width: `${sample.level}%` }" />
						<span class="meter__dot" :style="{ left: `${sample.level}%` }" />
					</div>
					<p class="meter__label">{{ sample.label }}</p>
				</article>
			</div>
		</section>

		<section class="section section--wide reveal" style="animation-delay: 0.35s">
			<div class="basketball">
				<div class="basketball__copy">
					<h2>The basketball vs the bumps</h2>
					<p>
						Consensus is the ball: shape, size, and weight are well known. New studies add
						bumps—interesting, but not always world-changing. We keep that scale clear.
					</p>
					<ul>
						<li>Basketball = the stable core of evidence.</li>
						<li>Bumps = fresh studies, methods, or edge cases.</li>
						<li>Big news ≠ big change.</li>
					</ul>
				</div>
				<div class="basketball__visual">
					<div class="ball">
						<span v-for="bump in bumps" :key="bump" class="ball__bump">{{ bump }}</span>
					</div>
				</div>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.4s">
			<div class="section__header">
				<h2>Small lenses that change everything</h2>
				<p>A few framing tools make scientific stories easier to understand—and harder to manipulate.</p>
			</div>
			<div class="lens-grid">
				<article v-for="lens in lenses" :key="lens.title" class="lens-card">
					<h3>{{ lens.title }}</h3>
					<p>{{ lens.body }}</p>
				</article>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.45s">
			<div class="section__header">
				<h2>What you’ll get</h2>
				<p>
					From any video or claim, you get a calm answer: what’s settled, what’s open, and how big the change
					is.
				</p>
			</div>
			<div class="signal-grid">
				<div v-for="signal in signals" :key="signal.title" class="signal">
					<h3>{{ signal.title }}</h3>
					<p>{{ signal.body }}</p>
				</div>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.48s">
			<div class="section__header">
				<h2>Featured topic lanes</h2>
				<p>
					Each lane has its own consensus profile, open questions, and common framing mistakes so the board
					feels like a map instead of a pile.
				</p>
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
				</NuxtLink>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.5s">
			<div class="section__header">
				<h2>Mini explainers</h2>
				<p>Short reads that show how consensus forms, shifts, and stays stable.</p>
			</div>
			<div class="card-grid">
				<article v-for="explainer in explainers" :key="explainer.title" class="card">
					<h3>{{ explainer.title }}</h3>
					<p>{{ explainer.body }}</p>
				</article>
			</div>
		</section>

		<section class="section reveal" style="animation-delay: 0.55s">
			<div class="section__header">
				<h2>Headline reality check</h2>
				<p>Tap a headline to see the scale behind it.</p>
			</div>
			<div class="headline-grid">
				<details v-for="card in headlineReality" :key="card.headline" class="headline-card">
					<summary>{{ card.headline }}</summary>
					<p>{{ card.reality }}</p>
				</details>
			</div>
		</section>

		<section class="section section--wide reveal" style="animation-delay: 0.58s">
			<div class="launch-panel">
				<div>
					<h2>Need to finish the deployment?</h2>
					<p>
						The site now includes a setup hub with live readiness checks and a server-agent prompt written
						for this exact stack.
					</p>
					<ul>
						<li v-for="signal in launchSignals" :key="signal">{{ signal }}</li>
					</ul>
				</div>
				<div class="launch-panel__cta">
					<NuxtLink class="cta primary" to="/setup">Open setup hub</NuxtLink>
					<p class="muted">Use it to line up services, nginx, env vars, Mongo, and posting safeguards.</p>
				</div>
			</div>
		</section>

		<section class="section section--wide reveal" style="animation-delay: 0.6s">
			<div class="story">
				<div>
					<h2>Bring a claim. Leave with context.</h2>
					<p>
						Ask in plain language. We translate the evidence, the consensus level, and the open questions—so
						you can spend more time learning and less time sorting noise.
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
						<p>See where the consensus sits on the spectrum.</p>
					</div>
					<div>
						<span>03</span>
						<p>Get sources, open questions, and what would change minds.</p>
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

.spectrum-grid {
	display: grid;
	gap: 18px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.spectrum-card {
	padding: 20px;
	border-radius: 20px;
	background: #fff;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 8px;
}

.spectrum-tag {
	font-size: 0.7rem;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	color: var(--consensus-muted);
}

.spectrum-card h3 {
	font-family: "Fraunces", serif;
}

.spectrum-card p {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.meter-grid {
	display: grid;
	gap: 18px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.meter-card {
	padding: 20px;
	border-radius: 20px;
	background: #fff;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 12px;
}

.meter-card h3 {
	font-family: "Fraunces", serif;
	margin: 0;
}

.meter {
	position: relative;
	height: 12px;
	border-radius: 999px;
	background: rgba(21, 17, 13, 0.08);
	overflow: hidden;
}

.meter__track {
	position: absolute;
	inset: 0;
	background: linear-gradient(90deg, #f0d3bf 0%, #d36b38 60%, #35524a 100%);
	opacity: 0.25;
}

.meter__fill {
	position: absolute;
	inset: 0;
	background: linear-gradient(90deg, #f0d3bf 0%, #d36b38 60%, #35524a 100%);
}

.meter__dot {
	position: absolute;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 18px;
	height: 18px;
	border-radius: 50%;
	background: #fff;
	border: 2px solid var(--consensus-ink);
	box-shadow: 0 6px 12px rgba(21, 17, 13, 0.2);
}

.meter__label {
	color: var(--consensus-muted);
	line-height: 1.5;
}

.basketball {
	display: grid;
	gap: 24px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
	align-items: center;
}

.basketball__copy h2 {
	font-family: "Fraunces", serif;
	font-size: clamp(2rem, 4vw, 3rem);
	margin-bottom: 12px;
}

.basketball__copy p {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.basketball__copy ul {
	margin: 14px 0 0 18px;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.basketball__visual {
	display: grid;
	place-items: center;
}

.ball {
	width: min(260px, 70vw);
	aspect-ratio: 1 / 1;
	border-radius: 50%;
	background: radial-gradient(circle at 35% 25%, #ffe3c9 0%, #d6895f 55%, #9b4b2b 100%);
	position: relative;
	box-shadow:
		0 24px 50px rgba(21, 17, 13, 0.25),
		inset 0 16px 30px rgba(255, 255, 255, 0.3);
	display: grid;
	place-items: center;
}

.ball__bump {
	position: absolute;
	background: rgba(255, 255, 255, 0.92);
	border: 1px solid rgba(21, 17, 13, 0.12);
	border-radius: 999px;
	padding: 6px 10px;
	font-size: 0.7rem;
	white-space: nowrap;
	box-shadow: 0 8px 18px rgba(21, 17, 13, 0.18);
}

.ball__bump:nth-child(1) {
	top: 12%;
	left: 18%;
}

.ball__bump:nth-child(2) {
	top: 20%;
	right: 8%;
}

.ball__bump:nth-child(3) {
	bottom: 18%;
	left: 10%;
}

.ball__bump:nth-child(4) {
	bottom: 8%;
	right: 22%;
}

.ball__bump:nth-child(5) {
	top: 55%;
	left: 42%;
}

.lens-grid {
	display: grid;
	gap: 18px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.lens-card {
	padding: 20px;
	border-radius: 20px;
	background: var(--consensus-cream);
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.lens-card h3 {
	font-family: "Fraunces", serif;
	margin-bottom: 8px;
}

.lens-card p {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.headline-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.headline-card {
	background: #fff;
	border-radius: 18px;
	padding: 16px 18px;
	border: 1px solid rgba(21, 17, 13, 0.1);
	box-shadow: 0 12px 24px rgba(21, 17, 13, 0.08);
}

.headline-card summary {
	cursor: pointer;
	font-weight: 600;
}

.headline-card summary::-webkit-details-marker {
	display: none;
}

.headline-card p {
	margin-top: 10px;
	color: var(--consensus-muted);
	line-height: 1.55;
}

.feature-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.feature-card {
	background: #fff;
	border-radius: 22px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	text-decoration: none;
	color: var(--consensus-ink);
	display: grid;
	gap: 12px;
}

.feature-card h3 {
	font-family: "Fraunces", serif;
	margin: 0;
}

.feature-card p {
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

.launch-panel {
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.launch-panel h2 {
	font-family: "Fraunces", serif;
	margin-bottom: 10px;
}

.launch-panel p,
.launch-panel li,
.muted {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.launch-panel ul {
	margin: 12px 0 0;
	padding-left: 18px;
	display: grid;
	gap: 8px;
}

.launch-panel__cta {
	display: grid;
	gap: 12px;
	align-content: center;
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
