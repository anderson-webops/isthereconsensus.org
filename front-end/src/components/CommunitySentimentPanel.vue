<script setup lang="ts">
import type { TopicSentimentResponse } from "~/types/platform";

const props = defineProps<{
	topicSlug: string;
}>();

const { apiUrl } = useApi();
const { isLoggedIn } = useAuth();

const loading = ref(true);
const saving = ref(false);
const errorMessage = ref("");
const vote = ref<"aligns" | "uncertain" | "skeptical">("uncertain");
const confidence = ref(3);
const note = ref("");
const sentiment = ref<TopicSentimentResponse | null>(null);

const stanceMeta = {
	aligns: {
		label: "Mostly aligns with the evidence",
		description: "The public reading is roughly tracking the consensus."
	},
	uncertain: {
		label: "Unsure or split",
		description: "The public picture looks mixed or not well calibrated yet."
	},
	skeptical: {
		label: "Drifting away from the evidence",
		description: "The public reading seems to diverge from the consensus lane."
	}
} as const;

const stanceCards = [
	{ key: "aligns", ...stanceMeta.aligns },
	{ key: "uncertain", ...stanceMeta.uncertain },
	{ key: "skeptical", ...stanceMeta.skeptical }
] as const;

async function refreshSentiment() {
	loading.value = true;
	errorMessage.value = "";
	try {
		const response = await $fetch<TopicSentimentResponse>(apiUrl(`/topics/${props.topicSlug}/sentiment`), {
			credentials: "include"
		});
		sentiment.value = response;
		if (response.currentVote) {
			vote.value = response.currentVote.stance;
			confidence.value = response.currentVote.confidence;
			note.value = response.currentVote.note || "";
		}
	} catch (error) {
		errorMessage.value = "Unable to load community sentiment right now.";
		console.error(error);
	} finally {
		loading.value = false;
	}
}

async function submitVote() {
	if (!isLoggedIn.value) {
		errorMessage.value = "Sign in to add your community reading.";
		return;
	}

	saving.value = true;
	errorMessage.value = "";
	try {
		await $fetch(apiUrl(`/topics/${props.topicSlug}/sentiment`), {
			method: "POST",
			credentials: "include",
			body: {
				stance: vote.value,
				confidence: confidence.value,
				note: note.value.trim()
			}
		});
		await refreshSentiment();
	} catch (error) {
		errorMessage.value = "Unable to save your vote right now.";
		console.error(error);
	} finally {
		saving.value = false;
	}
}

watch(
	() => props.topicSlug,
	() => {
		refreshSentiment();
	},
	{ immediate: true }
);
</script>

<template>
	<div class="sentiment-panel">
		<div class="sentiment-panel__header">
			<div>
				<h2>Community sentiment</h2>
				<p>Keep public sentiment visible, but clearly separate it from the curated consensus lane.</p>
			</div>
			<div class="sentiment-total">
				<span>Total votes</span>
				<strong>{{ sentiment?.totalVotes || 0 }}</strong>
			</div>
		</div>

		<div v-if="loading" class="muted">Loading sentiment...</div>
		<div v-else class="sentiment-grid">
			<article v-for="meta in stanceCards" :key="meta.key" class="sentiment-card">
				<div class="sentiment-card__top">
					<h3>{{ meta.label }}</h3>
					<strong>{{ sentiment?.percentages[meta.key] || 0 }}%</strong>
				</div>
				<div class="bar">
					<div class="bar__fill" :style="{ width: `${sentiment?.percentages[meta.key] || 0}%` }" />
				</div>
				<p>{{ meta.description }}</p>
				<span>{{ sentiment?.totals[meta.key] || 0 }} votes</span>
			</article>
		</div>

		<div class="vote-panel">
			<h3>Add your reading</h3>
			<div class="vote-options">
				<button
					v-for="meta in stanceCards"
					:key="meta.key"
					class="vote-option"
					:class="{ active: vote === meta.key }"
					type="button"
					@click="vote = meta.key"
				>
					{{ meta.label }}
				</button>
			</div>
			<label class="field-label" for="sentiment-confidence">Confidence</label>
			<input id="sentiment-confidence" v-model="confidence" type="range" min="1" max="5" />
			<label class="field-label" for="sentiment-note">Optional note</label>
			<textarea
				id="sentiment-note"
				v-model="note"
				rows="3"
				placeholder="What is the public confusion pattern you’re seeing?"
			/>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			<button class="cta primary" type="button" :disabled="saving" @click="submitVote">
				{{ saving ? "Saving..." : "Save sentiment vote" }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.sentiment-panel,
.vote-panel,
.sentiment-card {
	background: #fff;
	border-radius: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
}

.sentiment-panel {
	padding: 20px;
	display: grid;
	gap: 18px;
}

.sentiment-panel__header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.sentiment-panel__header h2,
.sentiment-card h3,
.vote-panel h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.sentiment-panel__header p,
.sentiment-card p {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.sentiment-total {
	min-width: 120px;
	display: grid;
	gap: 4px;
	align-content: start;
}

.sentiment-total span,
.sentiment-card span,
.field-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
	color: var(--consensus-muted);
}

.sentiment-total strong,
.sentiment-card strong {
	font-size: 1.5rem;
}

.sentiment-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.sentiment-card {
	padding: 16px;
	display: grid;
	gap: 10px;
	background: var(--consensus-cream);
}

.sentiment-card__top {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	align-items: start;
}

.bar {
	height: 10px;
	border-radius: 999px;
	background: rgba(21, 17, 13, 0.08);
	overflow: hidden;
}

.bar__fill {
	height: 100%;
	border-radius: inherit;
	background: linear-gradient(90deg, var(--consensus-ember), #e8a26a);
}

.vote-panel {
	padding: 18px;
	display: grid;
	gap: 12px;
}

.vote-options {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.vote-option {
	border-radius: 999px;
	border: 1px solid rgba(21, 17, 13, 0.14);
	background: transparent;
	padding: 10px 14px;
	font-family: inherit;
	cursor: pointer;
}

.vote-option.active {
	border-color: var(--consensus-ember);
	box-shadow: 0 10px 20px rgba(211, 107, 56, 0.18);
}

textarea,
input[type="range"] {
	width: 100%;
}

textarea {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 12px 20px;
	border: none;
	font-size: 0.95rem;
	font-weight: 600;
	font-family: inherit;
	cursor: pointer;
	width: fit-content;
}

.cta.primary {
	background: var(--consensus-ember);
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.muted {
	color: var(--consensus-muted);
}

.error {
	color: #b83d2e;
	font-weight: 600;
}
</style>
