<script setup lang="ts">
import type { ReaderRating } from "~/types/reader-feedback";
import { answerCoverageLabels, explanationClarityLabels } from "~/types/reader-feedback";

const props = defineProps<{ claimId?: string; comparisonSlug?: string }>();
const hasEvidenceTarget = computed(() => Boolean(props.claimId || props.comparisonSlug));
const evidenceTarget = computed(() =>
	props.comparisonSlug ? { comparisonSlug: props.comparisonSlug } : { claimId: props.claimId }
);
const { apiUrl } = useApi();
const config = useRuntimeConfig();
const expanded = ref(false);
const busy = ref(false);
const received = ref(false);
const experienceExpanded = ref(false);
const experienceReceived = ref(false);
const clarity = ref<keyof typeof explanationClarityLabels | "">("");
const answerCoverage = ref<keyof typeof answerCoverageLabels | "">("");
const notice = ref("");
const errorMessage = ref("");
const title = ref("");
const area = ref("source");
const message = ref("");
const sourceUrl = ref("");
const captchaToken = ref("");
const captchaRef = ref<{ reset: () => void } | null>(null);
let controller: AbortController | undefined;

onBeforeUnmount(() => controller?.abort());

async function sendExperience() {
	if (!clarity.value || !answerCoverage.value) {
		errorMessage.value = "Choose how clear the explanation was and whether it answered your question.";
		return;
	}
	await send({ kind: "reader_experience", clarity: clarity.value, answerCoverage: answerCoverage.value });
}

async function send(rating?: ReaderRating) {
	if (busy.value) return;
	if (!rating && config.public.captchaSiteKey && !captchaToken.value) {
		errorMessage.value = "Please complete the bot check.";
		return;
	}
	busy.value = true;
	errorMessage.value = "";
	notice.value = "";
	controller = new AbortController();
	try {
		const body = rating
			? { ...rating, ...evidenceTarget.value }
			: {
					kind: hasEvidenceTarget.value ? "missing_evidence" : "content_gap",
					...(hasEvidenceTarget.value
						? { ...evidenceTarget.value, area: area.value }
						: { title: title.value }),
					message: message.value,
					sourceUrl: sourceUrl.value,
					captchaToken: captchaToken.value
				};
		const response = await $fetch<{ received: boolean; duplicate: boolean }>(apiUrl("/reader-feedback"), {
			method: "POST",
			body,
			credentials: "omit",
			signal: controller.signal,
			retry: 0
		});
		if (response.received !== true || typeof response.duplicate !== "boolean") {
			throw new Error("Feedback receipt was not confirmed.");
		}
		notice.value = response.duplicate
			? "This feedback has already been received today."
			: "Thank you. Your feedback is in the private editorial queue.";
		if (rating?.kind === "usefulness") {
			received.value = true;
		} else if (rating?.kind === "reader_experience") {
			experienceReceived.value = true;
			experienceExpanded.value = false;
		} else {
			expanded.value = false;
			title.value = "";
			message.value = "";
			sourceUrl.value = "";
		}
	} catch (error: unknown) {
		if (controller.signal.aborted) return;
		const data = (error as { data?: { error?: string } }).data;
		errorMessage.value =
			data?.error || "Feedback was not confirmed received. Your input is still here; please retry.";
	} finally {
		busy.value = false;
		if (!rating) {
			captchaRef.value?.reset();
			captchaToken.value = "";
		}
	}
}
</script>

<template>
	<section class="reader-feedback" aria-label="Reader feedback">
		<div v-if="hasEvidenceTarget" class="reader-feedback__row">
			<h2>Was this {{ comparisonSlug ? "comparison" : "review" }} useful?</h2>
			<button type="button" :disabled="busy || received" @click="send({ kind: 'usefulness', helpful: true })">
				Yes, useful
			</button>
			<button type="button" :disabled="busy || received" @click="send({ kind: 'usefulness', helpful: false })">
				Not yet
			</button>
		</div>
		<p v-if="hasEvidenceTarget" class="reader-feedback__hint">
			This rates the explanation, not whether you agree with the science.
		</p>
		<div v-if="hasEvidenceTarget" class="reader-feedback__experience">
			<button
				type="button"
				:aria-expanded="experienceExpanded"
				:disabled="busy || experienceReceived"
				@click="experienceExpanded = !experienceExpanded"
			>
				{{
					experienceReceived
						? "Answer and explanation feedback received"
						: experienceExpanded
							? "Close answer feedback"
							: "Tell us what worked (optional)"
				}}
			</button>
			<form v-if="experienceExpanded" class="reader-feedback__form" @submit.prevent="sendExperience()">
				<p>
					These choices are private to admins. They do not record your question, account or search text, and
					do not rate agreement with the science.
				</p>
				<label
					>How easy was the explanation to follow?
					<select v-model="clarity" name="feedback-clarity" required :disabled="busy">
						<option disabled value="">Choose an answer</option>
						<option v-for="(label, value) in explanationClarityLabels" :key="value" :value="value">
							{{ label }}
						</option>
					</select>
				</label>
				<label
					>Did it answer the question you came with?
					<select v-model="answerCoverage" name="feedback-answer-coverage" required :disabled="busy">
						<option disabled value="">Choose an answer</option>
						<option v-for="(label, value) in answerCoverageLabels" :key="value" :value="value">
							{{ label }}
						</option>
					</select>
				</label>
				<div>
					<button type="submit" :disabled="busy">
						{{ busy ? "Sending…" : "Send private answer feedback" }}
					</button>
				</div>
			</form>
		</div>
		<button type="button" :aria-expanded="expanded" :disabled="busy" @click="expanded = !expanded">
			{{
				expanded
					? "Close feedback form"
					: hasEvidenceTarget
						? "Suggest missing evidence"
						: "Suggest a missing topic privately"
			}}
		</button>
		<form v-if="expanded" class="reader-feedback__form" @submit.prevent="send()">
			<p>
				Only admins can read this feedback. Do not include names, contact details, personal health information
				or private links. Your search text is not copied or saved automatically.
			</p>
			<label v-if="!hasEvidenceTarget"
				>Question or topic
				<input
					v-model="title"
					:disabled="busy"
					name="feedback-title"
					autocomplete="off"
					required
					minlength="10"
					maxlength="200"
				/>
			</label>
			<label v-else
				>What is missing?
				<select v-model="area" :disabled="busy" name="feedback-area">
					<option value="source">A source or newer evidence</option>
					<option value="population">Who the evidence applies to</option>
					<option value="outcome">An outcome or tradeoff</option>
					<option value="explanation">A clearer explanation</option>
					<option value="other">Something else</option>
				</select>
			</label>
			<label
				>What should we investigate? (20-1,200 characters)
				<textarea
					v-model="message"
					:disabled="busy"
					name="feedback-message"
					autocomplete="off"
					rows="4"
					required
					minlength="20"
					maxlength="1200"
				/>
			</label>
			<label
				>Public source link (optional)
				<input
					v-model="sourceUrl"
					:disabled="busy"
					name="feedback-source"
					type="url"
					autocomplete="off"
					maxlength="500"
				/>
			</label>
			<CaptchaWidget v-if="config.public.captchaSiteKey" ref="captchaRef" v-model="captchaToken" size="compact" />
			<div>
				<button class="button button--primary" type="submit" :disabled="busy">
					{{ busy ? "Sending…" : "Send private suggestion" }}
				</button>
			</div>
		</form>
		<p v-if="errorMessage" role="alert">{{ errorMessage }}</p>
		<p role="status">{{ notice }}</p>
	</section>
</template>

<style scoped>
.reader-feedback {
	padding: 1.25rem;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 1rem;
	background: var(--consensus-surface);
	font-size: 1rem;
}
.reader-feedback__row {
	display: flex;
	flex-wrap: wrap;
	gap: 0.65rem;
	align-items: center;
}
.reader-feedback h2 {
	font-size: 1.125rem;
	margin: 0 0.5rem 0 0;
}
.reader-feedback__hint {
	color: var(--consensus-muted);
	font-size: 0.875rem;
}
.reader-feedback__experience {
	margin-block: 0.75rem;
}
.reader-feedback button {
	min-height: 2.75rem;
	padding: 0.6rem 0.9rem;
	border-radius: 0.6rem;
	border: 1px solid var(--consensus-line);
}
.reader-feedback button:disabled {
	opacity: 0.65;
	cursor: default;
}
.reader-feedback__form {
	display: grid;
	gap: 1rem;
	max-width: 48rem;
	margin-top: 1rem;
}
.reader-feedback label {
	display: grid;
	gap: 0.4rem;
}
.reader-feedback input,
.reader-feedback select,
.reader-feedback textarea {
	min-width: 0;
	width: 100%;
	min-height: 2.75rem;
	padding: 0.65rem;
	border: 1px solid var(--consensus-line);
	border-radius: 0.5rem;
	background: var(--consensus-field-surface);
	color: var(--consensus-ink);
	font: inherit;
}
.reader-feedback textarea {
	resize: vertical;
}
.reader-feedback :focus-visible {
	outline: 2px solid var(--consensus-accent);
	outline-offset: 3px;
}
</style>
