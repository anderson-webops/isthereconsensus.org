<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";
import { siteUrl } from "~/constants";
import { comparisonForSlug } from "~/data/comparisons";
import { formatComparisonEstimate, resolveComparisonSelection } from "~/utils/evidence-comparison";
import { serializeJsonLd } from "~/utils/json-ld";

definePageMeta({ key: (route) => route.path });
const route = useRoute();
const router = useRouter();
const comparison = comparisonForSlug(String(route.params.slug || ""));
if (!comparison) throw createError({ statusCode: 404, statusMessage: "Evidence comparison not found" });
const selection = computed(() => resolveComparisonSelection(comparison, route.query));
const sourceNumbers = new Map(comparison.sources.map((source, index) => [source.id, index + 1]));
const sourceTitles = new Map(comparison.sources.map((source) => [source.id, source.title]));

function updateSelection(change: { outcome?: string; context?: string; options?: string }) {
	return router.push({
		query: {
			outcome: selection.value.outcome.id,
			context: selection.value.context.id,
			options: selection.value.options.map((option) => option.id).join(","),
			...change
		}
	});
}
function selectOutcome(event: Event) {
	void updateSelection({ outcome: (event.target as HTMLSelectElement).value });
}
function selectContext(event: Event) {
	void updateSelection({ context: (event.target as HTMLSelectElement).value });
}
function toggleOption(id: string) {
	const ids = new Set(selection.value.options.map((option) => option.id));
	if (ids.has(id)) ids.delete(id);
	else ids.add(id);
	void updateSelection({ options: [...ids].join(",") });
}
function showAll() {
	void updateSelection({ options: "all" });
}

useStaticPageMeta({
	title: `${comparison.title} - Is There Consensus?`,
	description: comparison.description,
	path: `/compare/${comparison.slug}`
});
useHead({
	script: [
		{
			key: "comparison-jsonld",
			type: "application/ld+json",
			innerHTML: serializeJsonLd({
				"@context": "https://schema.org",
				"@type": "Article",
				headline: comparison.title,
				description: comparison.description,
				url: `${siteUrl}/compare/${comparison.slug}`,
				dateModified: comparison.checkedAt,
				inLanguage: "en",
				citation: comparison.sources.map((source) => source.url)
			})
		}
	]
});
</script>

<template>
	<article class="comparison-page">
		<PageBreadcrumbs
			:items="[{ label: 'Home', to: '/' }, { label: 'Comparisons', to: '/compare' }, { label: comparison.title }]"
		/>
		<header>
			<p class="eyebrow">Evidence comparison</p>
			<h1>{{ comparison.title }}</h1>
			<p class="comparison-intro">{{ comparison.description }}</p>
		</header>
		<section class="comparison-controls" aria-label="Choose your comparison">
			<div class="comparison-selects">
				<label for="comparison-outcome"
					>Outcome
					<select id="comparison-outcome" :value="selection.outcome.id" @change="selectOutcome">
						<option v-for="outcome in comparison.outcomes" :key="outcome.id" :value="outcome.id">
							{{ outcome.label }}
						</option>
					</select>
				</label>
				<label for="comparison-context"
					>Context
					<select id="comparison-context" :value="selection.context.id" @change="selectContext">
						<option v-for="context in comparison.contexts" :key="context.id" :value="context.id">
							{{ context.label }}
						</option>
					</select>
				</label>
			</div>
			<fieldset>
				<legend>Options to compare</legend>
				<div class="comparison-choices">
					<label v-for="option in comparison.options" :key="option.id">
						<input
							type="checkbox"
							:checked="selection.options.some((item) => item.id === option.id)"
							@change="toggleOption(option.id)"
						/>
						{{ option.label }}
					</label>
				</div>
			</fieldset>
		</section>
		<section class="comparison-results" aria-labelledby="comparison-result-title">
			<h2 id="comparison-result-title">{{ selection.outcome.label }}</h2>
			<p>{{ selection.outcome.explanation }}</p>
			<p class="comparison-context">{{ selection.context.explanation }}</p>
			<p class="comparison-basis">
				{{ comparison.datasetLabel }}. Sources checked
				<time :datetime="comparison.checkedAt">{{ comparison.checkedAt }}</time
				>.
			</p>
			<p class="comparison-status" role="status">
				{{ selection.options.length }} options selected for {{ selection.outcome.label.toLowerCase() }}.
				{{
					selection.context.supportsEstimates
						? "Published medians hide variation; these are not predictions."
						: "No comparable estimates for this context in this dataset."
				}}
			</p>
			<div v-if="selection.options.length" class="comparison-grid">
				<section
					v-for="option in selection.options"
					:key="option.id"
					class="comparison-option"
					:aria-labelledby="`option-${option.id}`"
				>
					<h3 :id="`option-${option.id}`">{{ option.label }}</h3>
					<template v-if="selection.context.supportsEstimates && option.estimates[selection.outcome.id]">
						<p class="comparison-value">
							{{ formatComparisonEstimate(option.estimates[selection.outcome.id]!) }}
						</p>
						<p class="comparison-unit">{{ selection.outcome.unit }}</p>
						<p class="comparison-option-scope">{{ option.scope }}</p>
						<a
							v-for="id in option.estimates[selection.outcome.id]!.sourceIds"
							:key="id"
							:href="`#comparison-source-${id}`"
							:aria-label="`Source ${sourceNumbers.get(id)}: ${sourceTitles.get(id)}`"
							>Source {{ sourceNumbers.get(id) }}</a
						>
					</template>
					<p v-else class="comparison-unavailable">
						{{
							selection.context.supportsEstimates
								? "No estimate available for this outcome"
								: "Not comparable in this context"
						}}
					</p>
				</section>
			</div>
			<div v-else class="comparison-empty">
				<p>Select options above to see the evidence.</p>
				<button type="button" @click="showAll">Show all options</button>
			</div>
		</section>
		<section class="comparison-limits" aria-labelledby="comparison-limits-title">
			<h2 id="comparison-limits-title">Read these figures with their limits</h2>
			<ul>
				<li v-for="limit in comparison.limitations" :key="limit">{{ limit }}</li>
			</ul>
			<p>{{ comparison.measureNote }}</p>
			<NuxtLink :to="comparison.guidePath">Read the guide for the wider tradeoffs</NuxtLink>
		</section>
		<section aria-labelledby="comparison-reviews-title">
			<h2 id="comparison-reviews-title">Connected claim reviews</h2>
			<ul>
				<li v-for="review in comparison.reviews" :key="review.path">
					<NuxtLink :to="review.path">{{ review.label }}</NuxtLink>
				</li>
			</ul>
		</section>
		<section aria-labelledby="comparison-sources-title">
			<h2 id="comparison-sources-title">Sources and scope</h2>
			<ol class="comparison-sources">
				<li v-for="source in comparison.sources" :id="`comparison-source-${source.id}`" :key="source.id">
					<a :href="source.url" rel="noopener noreferrer">{{ source.title }}</a>
					<p>{{ source.locator }}. {{ source.note }}</p>
				</li>
			</ol>
			<p><NuxtLink to="/corrections">Suggest a correction</NuxtLink></p>
		</section>
	</article>
</template>

<style scoped>
.comparison-page {
	display: grid;
	gap: 24px;
	overflow-wrap: anywhere;
}
.comparison-page h1 {
	font:
		600 clamp(1.8rem, 4vw, 2.7rem)/1.16 "Fraunces",
		serif;
	margin: 8px 0 12px;
}
.comparison-page h2 {
	font:
		600 1.35rem/1.3 "Fraunces",
		serif;
	margin: 0 0 12px;
}
.comparison-page p,
.comparison-page li {
	line-height: 1.65;
}
.comparison-intro {
	max-width: 70ch;
	color: var(--consensus-muted);
	margin-bottom: 0;
}
.comparison-controls {
	padding: 20px;
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
}
.comparison-selects {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 18px;
}
.comparison-selects label {
	display: grid;
	gap: 6px;
	font-size: 1rem;
	font-weight: 600;
}
.comparison-selects select {
	width: 100%;
	min-width: 0;
	min-height: 44px;
	padding: 10px 12px;
	border: 1px solid var(--consensus-line);
	border-radius: 6px;
	color: var(--consensus-ink);
	background: var(--consensus-field-surface);
	font: inherit;
}
.comparison-controls fieldset {
	border: 0;
	margin: 18px 0 0;
	padding: 0;
}
.comparison-controls legend {
	font-weight: 600;
	margin-bottom: 8px;
}
.comparison-choices {
	display: flex;
	flex-wrap: wrap;
	gap: 8px 18px;
}
.comparison-choices label {
	display: inline-flex;
	align-items: center;
	gap: 8px;
	min-height: 44px;
	cursor: pointer;
}
.comparison-choices input {
	width: 18px;
	height: 18px;
	accent-color: var(--consensus-interactive);
}
.comparison-context {
	max-width: 85ch;
	border-left: 3px solid var(--consensus-interactive);
	padding-left: 14px;
}
.comparison-basis,
.comparison-status,
.comparison-unit,
.comparison-option-scope {
	color: var(--consensus-muted);
	font-size: 0.9rem;
}
.comparison-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 175px), 1fr));
	gap: 12px;
}
.comparison-option {
	padding: 20px 16px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 8px;
	background: var(--consensus-surface);
	min-width: 0;
}
.comparison-option h3 {
	margin: 0;
	font-size: 1.08rem;
}
.comparison-option .comparison-value {
	font-size: 2rem;
	line-height: 1.2;
	font-variant-numeric: tabular-nums;
	margin: 18px 0 4px;
	color: var(--consensus-ink);
}
.comparison-unit {
	margin: 0;
}
.comparison-option a {
	font-size: 0.9rem;
}
.comparison-unavailable {
	font-weight: 600;
}
.comparison-page a {
	color: var(--consensus-interactive);
	text-underline-offset: 4px;
}
.comparison-page li + li {
	margin-top: 10px;
}
.comparison-sources li {
	scroll-margin-top: 24px;
}
.comparison-sources {
	list-style: decimal;
	padding-left: 24px;
}
.comparison-limits {
	padding-top: 24px;
	border-top: 1px solid var(--consensus-soft-line);
}
.comparison-limits p {
	max-width: 80ch;
}
.comparison-empty button {
	min-height: 44px;
	padding: 8px 18px;
	border: 1px solid var(--consensus-line);
	border-radius: 6px;
	background: var(--consensus-surface);
	color: var(--consensus-ink);
	font: inherit;
	cursor: pointer;
}
.comparison-page :is(a, button, select, input):focus-visible {
	outline: 3px solid var(--consensus-interactive);
	outline-offset: 3px;
}
@media (max-width: 640px) {
	.comparison-selects {
		grid-template-columns: minmax(0, 1fr);
	}
}
</style>
