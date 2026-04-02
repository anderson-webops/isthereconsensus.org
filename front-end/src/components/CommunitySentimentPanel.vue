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
		description: "Public reading is roughly tracking the consensus."
	},
	uncertain: {
		label: "Unsure or split",
		description: "Public reading looks mixed or poorly calibrated."
	},
	skeptical: {
		label: "Drifting away from the evidence",
		description: "Public reading seems to diverge from the consensus lane."
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
		errorMessage.value = "Sign in to add your reading.";
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
	<div class="sentiment">
		<div class="sentiment__header">
			<div>
				<h2>Community sentiment</h2>
				<p>Visible, but intentionally separate from the consensus summary above.</p>
			</div>
			<div class="sentiment__total">
				<span>Total votes</span>
				<strong>{{ sentiment?.totalVotes || 0 }}</strong>
			</div>
		</div>

		<div v-if="loading" class="muted">Loading sentiment...</div>
		<div v-else class="sentiment__grid">
			<article
				v-for="meta in stanceCards"
				:key="meta.key"
				class="sentiment-card"
				:class="`sentiment-card--${meta.key}`"
			>
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
					:class="[{ active: vote === meta.key }, `vote-option--${meta.key}`]"
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
				placeholder="What public confusion pattern are you seeing?"
			/>
			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>
			<button class="button button--primary" type="button" :disabled="saving" @click="submitVote">
				{{ saving ? "Saving..." : "Save sentiment vote" }}
			</button>
		</div>
	</div>
</template>

<style scoped>
.sentiment {
	display: grid;
	gap: 16px;
}

.sentiment__header,
.sentiment-card,
.vote-panel {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 20px;
}

.sentiment__header,
.vote-panel {
	padding: 18px;
}

.sentiment__header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	border-inline-start: 4px solid var(--consensus-sentiment);
	background: linear-gradient(180deg, var(--consensus-sentiment-soft), var(--consensus-surface) 24%);
}

.sentiment__header h2,
.sentiment-card h3,
.vote-panel h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.sentiment__header p,
.sentiment-card p,
.muted {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.sentiment__total,
.sentiment-card span,
.field-label {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.sentiment__total {
	display: grid;
	gap: 4px;
}

.sentiment__total strong,
.sentiment-card strong {
	font-size: 1.35rem;
	color: var(--consensus-ink);
}

.sentiment__grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.sentiment-card {
	--sentiment-color: var(--consensus-sentiment);
	--sentiment-soft: var(--consensus-sentiment-soft);
	padding: 16px;
	display: grid;
	gap: 10px;
	border-inline-start: 3px solid var(--sentiment-color);
	background: linear-gradient(180deg, var(--sentiment-soft), rgba(255, 255, 255, 0.92) 40%);
}

.sentiment-card--aligns {
	--sentiment-color: var(--consensus-evidence);
	--sentiment-soft: var(--consensus-evidence-soft);
}

.sentiment-card--uncertain {
	--sentiment-color: var(--consensus-sentiment);
	--sentiment-soft: var(--consensus-sentiment-soft);
}

.sentiment-card--skeptical {
	--sentiment-color: var(--consensus-caution);
	--sentiment-soft: var(--consensus-caution-soft);
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
	background: linear-gradient(90deg, var(--sentiment-color), rgba(255, 255, 255, 0.75));
}

.vote-panel {
	display: grid;
	gap: 12px;
	border-inline-start: 4px solid var(--consensus-sentiment);
}

.vote-options {
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
}

.vote-option {
	padding: 10px 14px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	background: transparent;
	cursor: pointer;
}

.vote-option.active {
	background: var(--consensus-sentiment-soft);
	border-color: var(--consensus-sentiment);
}

.vote-option--aligns.active {
	background: var(--consensus-evidence-soft);
	border-color: var(--consensus-evidence);
}

.vote-option--skeptical.active {
	background: var(--consensus-caution-soft);
	border-color: var(--consensus-caution);
}

textarea,
input[type="range"] {
	width: 100%;
}

textarea {
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: #fff;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	cursor: pointer;
}

.button--primary {
	background: var(--consensus-interactive);
	border-color: var(--consensus-interactive);
	color: #fff;
}

.error {
	margin: 0;
	color: #b83d2e;
	font-weight: 600;
}
</style>
