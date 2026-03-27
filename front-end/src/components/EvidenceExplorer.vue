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
				<p>Search live literature when you want to go beyond the summary.</p>
			</div>
			<button class="button button--primary" type="button" :disabled="loading" @click="search">
				{{ loading ? "Searching..." : "Search literature" }}
			</button>
		</div>

		<div class="evidence__controls">
			<label class="field-label" for="evidence-query">Query</label>
			<input
				id="evidence-query"
				v-model="query"
				type="text"
				placeholder="Try climate attribution, replication bias, or consensus formation"
			/>
		</div>

		<p v-if="response" class="muted">
			Provider: {{ response.provider }}{{ response.configured ? " (configured)" : " (public mode)" }}
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
				<a v-if="result.url" :href="result.url" target="_blank" rel="noreferrer">Open source</a>
			</article>
		</div>
		<div v-else-if="response && !response.results.length" class="muted">
			No literature results came back for that query yet.
		</div>
	</div>
</template>

<style scoped>
.evidence {
	display: grid;
	gap: 16px;
}

.evidence__header,
.result-card {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 20px;
}

.evidence__header {
	padding: 18px;
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
.result-meta,
.muted {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.field-label,
.result-card__top {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.evidence__controls {
	display: grid;
	gap: 8px;
}

.evidence__controls input {
	padding: 13px 15px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: #fff;
}

.result-grid {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.result-card {
	padding: 16px;
	display: grid;
	gap: 8px;
}

.result-card__top {
	display: flex;
	justify-content: space-between;
	gap: 12px;
}

.result-card a {
	font-weight: 600;
	text-decoration: none;
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
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: #fff;
}

.error {
	margin: 0;
	color: #b83d2e;
	font-weight: 600;
}
</style>
