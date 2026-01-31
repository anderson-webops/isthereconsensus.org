<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const prompts = [
	"Did we invent math or discover it?",
	"What does consensus mean in climate science?",
	"Do we really only use 10% of our brains?",
	"Is this headline a bump on the basketball?",
	"How strong is the evidence for this claim?",
	"Relative vs absolute risk: what actually changed?"
];

const scaffolds = [
	{
		title: "Consensus check",
		template: "Is there scientific consensus that [claim]?"
	},
	{
		title: "Mechanism question",
		template: "What mechanism would have to be true for [claim] to work?"
	},
	{
		title: "Scope & limits",
		template: "Where does [claim] hold up, and where does it fail?"
	},
	{
		title: "Risk lens",
		template: "What is the absolute risk change in [claim], not just the relative risk?"
	}
];

const lenses = [
	"Consensus is earned through evidence, not a vote.",
	"Separate the stable core from the new bumps.",
	"Ask what would change minds."
];

const question = ref("");
const claim = ref("");
const hasPreview = ref(false);

watchEffect(() => {
	const incoming = route.query.question;
	if (typeof incoming === "string") {
		question.value = incoming;
	}
});

function choosePrompt(prompt: string) {
	question.value = prompt;
}

function applyScaffold(template: string) {
	question.value = template;
}

function runPreview() {
	if (!question.value.trim() && !claim.value.trim()) return;
	hasPreview.value = true;
}

function resetPreview() {
	hasPreview.value = false;
}

function backHome() {
	router.push("/");
}
</script>

<template>
	<div class="ask">
		<header class="ask__header">
			<p class="eyebrow">Consensus check</p>
			<h1>Ask about a claim.</h1>
			<p>
				Paste a claim, summarize the video, or use a scaffold. We will map consensus, show the real debates, and
				keep the scale honest.
			</p>
		</header>

		<div class="ask__grid">
			<section class="ask__panel">
				<label class="ask-label" for="question">Your question</label>
				<textarea id="question" v-model="question" rows="4" placeholder="What is the video claiming?" />
				<p class="ask-helper">Too broad? That is fine. We will help you narrow it to something testable.</p>

				<label class="ask-label" for="claim">Optional: the specific claim</label>
				<input id="claim" v-model="claim" type="text" placeholder="Short, exact phrasing helps." />

				<div class="ask__actions">
					<button class="cta primary" type="button" @click="runPreview">Preview consensus</button>
					<button class="cta ghost" type="button" @click="backHome">Back home</button>
				</div>
			</section>

			<section class="ask__panel">
				<p class="prompt-title">Starter prompts</p>
				<div class="prompt-grid">
					<button
						v-for="prompt in prompts"
						:key="prompt"
						class="prompt-chip"
						type="button"
						@click="choosePrompt(prompt)"
					>
						{{ prompt }}
					</button>
				</div>
			</section>
		</div>

		<section class="ask__extras">
			<div class="extras-card">
				<h3>Question scaffolds</h3>
				<p class="muted">
					These templates turn a vague curiosity into a precise, testable question. Replace the brackets with
					your topic.
				</p>
				<div class="scaffold-grid">
					<button
						v-for="scaffold in scaffolds"
						:key="scaffold.title"
						class="scaffold-chip"
						type="button"
						@click="applyScaffold(scaffold.template)"
					>
						<span>{{ scaffold.title }}</span>
						<small>{{ scaffold.template }}</small>
					</button>
				</div>
			</div>
			<div class="extras-card">
				<h3>Consensus lenses</h3>
				<ul class="lens-list">
					<li v-for="lens in lenses" :key="lens">{{ lens }}</li>
				</ul>
			</div>
		</section>

		<section v-if="hasPreview" class="preview">
			<div class="preview__header">
				<h2>Preview (coming soon)</h2>
				<p>
					This is where the consensus snapshot, debate map, and evidence trail will appear. For now, your
					prompt is saved below.
				</p>
			</div>
			<div class="preview__cards">
				<div class="preview__card">
					<h3>Consensus snapshot</h3>
					<p>We will summarize where expert agreement sits on the spectrum.</p>
				</div>
				<div class="preview__card">
					<h3>Your prompt</h3>
					<p>{{ question || "(none)" }}</p>
					<p v-if="claim" class="muted">Claim: {{ claim }}</p>
				</div>
				<div class="preview__card">
					<h3>Debate map</h3>
					<p>We will show the real open questions that scientists are discussing.</p>
				</div>
				<div class="preview__card">
					<h3>Scale check</h3>
					<p>We highlight absolute vs relative risk so bumps don’t feel like earthquakes.</p>
				</div>
			</div>
			<button class="cta ghost" type="button" @click="resetPreview">Clear preview</button>
		</section>
	</div>
</template>

<style scoped>
.ask {
	display: grid;
	gap: 32px;
}

.ask__header h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.4rem, 4vw, 3.6rem);
	margin-bottom: 12px;
}

.ask__header p {
	max-width: 640px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.ask__grid {
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.ask__panel {
	background: #fff;
	border-radius: 20px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 12px;
}

.ask-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.7rem;
	color: var(--consensus-muted);
}

.ask-helper {
	margin: 0;
	color: var(--consensus-muted);
	font-size: 0.9rem;
	line-height: 1.5;
}

.ask__panel textarea,
.ask__panel input {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
	font-size: 0.95rem;
}

.ask__actions {
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

.prompt-title {
	font-size: 0.95rem;
	text-transform: uppercase;
	letter-spacing: 0.1em;
	color: var(--consensus-muted);
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

.ask__extras {
	display: grid;
	gap: 20px;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
}

.extras-card {
	background: var(--consensus-cream);
	border-radius: 20px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 12px;
}

.extras-card h3 {
	font-family: "Fraunces", serif;
}

.extras-card .muted {
	color: var(--consensus-muted);
	line-height: 1.55;
}

.scaffold-grid {
	display: grid;
	gap: 10px;
}

.scaffold-chip {
	text-align: left;
	padding: 12px 14px;
	border-radius: 16px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	background: #fff;
	font-family: inherit;
	display: grid;
	gap: 4px;
	cursor: pointer;
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease;
}

.scaffold-chip span {
	font-weight: 600;
}

.scaffold-chip small {
	color: var(--consensus-muted);
	font-size: 0.8rem;
}

.scaffold-chip:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 20px rgba(21, 17, 13, 0.12);
}

.lens-list {
	margin: 0;
	padding-left: 18px;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.preview {
	margin-top: 12px;
	display: grid;
	gap: 16px;
}

.preview__header h2 {
	font-family: "Fraunces", serif;
	margin-bottom: 6px;
}

.preview__header p {
	color: var(--consensus-muted);
	max-width: 680px;
}

.preview__cards {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.preview__card {
	background: rgba(21, 17, 13, 0.9);
	color: #fdf8f2;
	border-radius: 18px;
	padding: 18px;
}

.preview__card h3 {
	font-family: "Fraunces", serif;
	margin-bottom: 8px;
}

.preview__card .muted {
	color: rgba(253, 248, 242, 0.75);
	margin-top: 8px;
	font-size: 0.9rem;
}
</style>
