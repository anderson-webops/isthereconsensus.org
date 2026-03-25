<script setup lang="ts">
import type { EvidenceSearchResponse } from "~/types/platform";

const props = defineProps<{
	topicSlug: string;
	defaultQuery: string;
}>();

const { apiUrl } = useApi();

const query = ref("");
const loading = ref(false);
const errorMessage = ref("");
const response = ref<EvidenceSearchResponse | null>(null);

async function search() {
	const value = query.value.trim() || props.defaultQuery.trim();
	if (!value) {
		errorMessage.value = "Add a search query first.";
		return;
	}

	loading.value = true;
	errorMessage.value = "";
	try {
		response.value = await $fetch<EvidenceSearchResponse>(apiUrl("/evidence/search"), {
			query: {
				topic: props.topicSlug,
				q: value
			}
		});
	} catch (error) {
		errorMessage.value = "Unable to load literature results right now.";
		console.error(error);
	} finally {
		loading.value = false;
	}
}

watch(
	() => props.defaultQuery,
	(value) => {
		query.value = value;
	},
	{ immediate: true }
);
</script>

<template>
	<div class="evidence">
		<div class="evidence__header">
			<div>
				<h2>Evidence explorer</h2>
				<p>Pull in live literature so the consensus lane can point to actual papers, not just summaries.</p>
			</div>
			<button class="cta primary" type="button" :disabled="loading" @click="search">
				{{ loading ? "Searching..." : "Search literature" }}
			</button>
		</div>

		<div class="evidence__controls">
			<label class="field-label" for="evidence-query">Query</label>
			<input
				id="evidence-query"
				v-model="query"
				type="text"
				placeholder="Try climate attribution, replication bias, consensus formation..."
			/>
		</div>

		<p v-if="response" class="muted">
			Provider: {{ response.provider
			}}{{ response.configured ? " (configured key/email present)" : " (public mode)" }}
		</p>
		<p v-if="errorMessage" class="error">{{ errorMessage }}</p>

		<div v-if="response?.results.length" class="result-grid">
			<article v-for="result in response.results" :key="result.id" class="result-card">
				<div class="result-card__top">
					<span>{{ result.year || "Year unknown" }}</span>
					<span v-if="result.citedByCount">Cited {{ result.citedByCount }} times</span>
				</div>
				<h3>{{ result.title }}</h3>
				<p v-if="result.journal" class="result-meta">{{ result.journal }}</p>
				<p v-if="result.authors.length" class="result-meta">{{ result.authors.join(", ") }}</p>
				<a v-if="result.url" :href="result.url" target="_blank" rel="noreferrer">Open source ↗</a>
			</article>
		</div>
		<div v-else-if="response && !response.results.length" class="muted">
			No literature results came back for that query yet.
		</div>
	</div>
</template>

<style scoped>
.evidence {
	background: #fff;
	border-radius: 20px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 16px;
}

.evidence__header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.evidence__header h2,
.result-card h3 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.evidence__header p,
.result-meta {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.field-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
	color: var(--consensus-muted);
}

.evidence__controls {
	display: grid;
	gap: 8px;
}

input {
	border-radius: 14px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 12px 14px;
	font-family: inherit;
}

.result-grid {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.result-card {
	display: grid;
	gap: 8px;
	padding: 16px;
	border-radius: 18px;
	background: var(--consensus-cream);
	border: 1px solid rgba(21, 17, 13, 0.08);
}

.result-card__top {
	display: flex;
	justify-content: space-between;
	gap: 12px;
	font-size: 0.8rem;
	color: var(--consensus-muted);
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
