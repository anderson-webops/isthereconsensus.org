<script setup lang="ts">
import type { SetupCheck, SetupDashboardResponse, SetupPromptResponse } from "~/types/setup";
import { buildFrontendSetupChecks } from "~/utils/setup";

const { copy, copied } = useClipboard();
const isProduction = import.meta.env.PROD;

if (isProduction) {
	throw createError({
		statusCode: 404,
		statusMessage: "Page not found"
	});
}

const { data, pending, refresh } = await useAsyncData("setup-dashboard", () =>
	$fetch<SetupDashboardResponse>("/api/setup-status")
);
const { data: promptData } = await useAsyncData("setup-prompt", () => $fetch<SetupPromptResponse>("/api/setup-prompt"));

const dashboard = computed(() => data.value);
const frontendChecks = computed<SetupCheck[]>(() => (dashboard.value ? buildFrontendSetupChecks(dashboard.value) : []));
const backendChecks = computed<SetupCheck[]>(() => dashboard.value?.backendSetup.data?.checks ?? []);
const allChecks = computed<SetupCheck[]>(() => [...frontendChecks.value, ...backendChecks.value]);
const blockingChecks = computed(() => allChecks.value.filter((check) => check.severity === "critical" && !check.ok));
const warningChecks = computed(() => allChecks.value.filter((check) => check.severity === "warning" && !check.ok));
const passCount = computed(() => allChecks.value.filter((check) => check.ok).length);
const serverAgentPrompt = computed(() => promptData.value?.prompt || "");
const serverPreparationTasks = computed(() => promptData.value?.serverPreparationTasks ?? []);
const launchValidationTasks = computed(() => promptData.value?.launchValidationTasks ?? []);
const lastUpdated = computed(() =>
	dashboard.value?.generatedAt ? new Date(dashboard.value.generatedAt).toLocaleString() : "Not available yet"
);

async function copyPrompt() {
	if (!serverAgentPrompt.value) return;
	await copy(serverAgentPrompt.value);
}

async function refreshStatus() {
	await refresh();
}

function statusTone(ok: boolean, severity: SetupCheck["severity"]) {
	if (ok) return "good";
	if (severity === "critical") return "bad";
	if (severity === "warning") return "warn";
	return "neutral";
}
</script>

<template>
	<div class="setup">
		<header class="setup__hero">
			<div class="setup__copy">
				<p class="eyebrow">Launch HQ</p>
				<h1>Bring the server and the site into the same shape.</h1>
				<p>
					This development-only page gives you a live readiness view, the production concerns this app has,
					and a copyable prompt you can hand to a server-side AI agent.
				</p>
			</div>

			<div class="setup__actions">
				<button class="cta primary" type="button" :disabled="pending" @click="refreshStatus">
					{{ pending ? "Refreshing..." : "Refresh status" }}
				</button>
				<button class="cta ghost" type="button" :disabled="!serverAgentPrompt" @click="copyPrompt">
					{{ copied ? "Prompt copied" : "Copy server prompt" }}
				</button>
			</div>
		</header>

		<section class="status-strip">
			<article class="status-card">
				<p class="status-card__label">Overall</p>
				<h2>{{ blockingChecks.length ? "Needs work" : "Ready to finish" }}</h2>
				<p>{{ passCount }}/{{ allChecks.length || 1 }} checks passing</p>
			</article>
			<article class="status-card">
				<p class="status-card__label">Blocking</p>
				<h2>{{ blockingChecks.length }}</h2>
				<p>Critical items still failing</p>
			</article>
			<article class="status-card">
				<p class="status-card__label">Warnings</p>
				<h2>{{ warningChecks.length }}</h2>
				<p>Non-blocking fixes worth closing</p>
			</article>
			<article class="status-card">
				<p class="status-card__label">Updated</p>
				<h2>{{ lastUpdated }}</h2>
				<p>Live status from this deployment</p>
			</article>
		</section>

		<section class="setup__grid">
			<div class="panel">
				<div class="panel__header">
					<h2>Live readiness</h2>
					<p>Frontend, backend, and environment checks are merged here so you can spot mismatches quickly.</p>
				</div>

				<div v-if="!allChecks.length" class="muted">
					Status data is not available yet. Refresh after the backend is reachable.
				</div>

				<div v-else class="checklist">
					<article
						v-for="check in allChecks"
						:key="check.id"
						class="check"
						:class="`check--${statusTone(check.ok, check.severity)}`"
					>
						<div class="check__top">
							<p class="check__label">{{ check.label }}</p>
							<span class="check__badge">
								{{ check.ok ? "Passing" : check.severity === "critical" ? "Blocking" : "Attention" }}
							</span>
						</div>
						<p class="check__detail">{{ check.detail }}</p>
						<p v-if="check.action" class="check__action">{{ check.action }}</p>
					</article>
				</div>
			</div>

			<div class="panel">
				<div class="panel__header">
					<h2>What to configure on the server</h2>
					<p>
						The production setup is straightforward if you keep the site same-origin and treat SSR and API
						as separate services.
					</p>
				</div>
				<div class="task-list">
					<article v-for="task in serverPreparationTasks" :key="task.title" class="task">
						<h3>{{ task.title }}</h3>
						<p>{{ task.body }}</p>
					</article>
				</div>
			</div>
		</section>

		<section class="setup__grid">
			<div class="panel">
				<div class="panel__header">
					<h2>Prompt for the server AI agent</h2>
					<p>
						This is written for the architecture in this repo, including the Nuxt SSR frontend, Express API,
						Mongo, cookie auth, and reverse proxy needs.
					</p>
				</div>
				<textarea
					class="prompt-box"
					readonly
					:value="serverAgentPrompt || 'Authorized prompt data is unavailable.'"
				/>
			</div>

			<div class="panel">
				<div class="panel__header">
					<h2>Go-live validation</h2>
					<p>Do these checks after the deploy is supposedly “done,” not before.</p>
				</div>
				<div class="task-list">
					<article v-for="task in launchValidationTasks" :key="task.title" class="task">
						<h3>{{ task.title }}</h3>
						<p>{{ task.body }}</p>
					</article>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.setup {
	display: grid;
	gap: 28px;
}

.setup__hero {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
	align-items: end;
}

.setup__copy {
	max-width: 760px;
}

.setup__copy h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.6rem, 5vw, 4rem);
	line-height: 1.05;
	margin: 10px 0 14px;
}

.setup__copy p:last-child {
	color: var(--consensus-muted);
	line-height: 1.6;
}

.setup__actions {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 12px 20px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	font-size: 0.95rem;
	font-weight: 600;
	cursor: pointer;
	font-family: inherit;
	background: var(--consensus-field-surface);
	color: var(--consensus-ink);
}

.cta.primary {
	background: var(--consensus-ember);
	color: var(--consensus-on-accent);
	border-color: transparent;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.cta.ghost {
	background: var(--consensus-elevated-surface);
}

.status-strip {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.status-card,
.panel,
.task {
	background: var(--consensus-field-surface);
	border-radius: 22px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 18px 40px rgba(21, 17, 13, 0.08);
}

.status-card {
	padding: 20px;
}

.status-card__label,
.check__label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.72rem;
	color: var(--consensus-muted);
}

.status-card h2 {
	font-family: "Fraunces", serif;
	font-size: 1.5rem;
	margin: 10px 0 8px;
}

.status-card p:last-child {
	color: var(--consensus-muted);
}

.setup__grid {
	display: grid;
	gap: 18px;
	grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
}

.panel {
	padding: 22px;
	display: grid;
	gap: 16px;
}

.panel__header h2 {
	font-family: "Fraunces", serif;
	margin: 0 0 6px;
}

.panel__header p {
	color: var(--consensus-muted);
	line-height: 1.6;
	margin: 0;
}

.checklist,
.task-list {
	display: grid;
	gap: 12px;
}

.check {
	padding: 16px;
	border-radius: 18px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	background: var(--consensus-mist);
	display: grid;
	gap: 8px;
}

.check--good {
	background: rgba(83, 138, 115, 0.12);
	border-color: rgba(83, 138, 115, 0.18);
}

.check--warn {
	background: rgba(233, 181, 69, 0.16);
	border-color: rgba(233, 181, 69, 0.2);
}

.check--bad {
	background: rgba(211, 107, 56, 0.16);
	border-color: rgba(211, 107, 56, 0.25);
}

.check--neutral {
	background: rgba(21, 17, 13, 0.05);
}

.check__top {
	display: flex;
	justify-content: space-between;
	align-items: start;
	gap: 12px;
}

.check__badge {
	font-size: 0.78rem;
	font-weight: 700;
	color: var(--consensus-ink);
}

.check__detail,
.check__action,
.task p,
.muted {
	color: var(--consensus-muted);
	line-height: 1.55;
	margin: 0;
}

.check__action {
	font-weight: 600;
}

.task {
	padding: 18px;
}

.task h3 {
	font-family: "Fraunces", serif;
	margin: 0 0 8px;
}

.prompt-box {
	min-height: 420px;
	width: 100%;
	border-radius: 18px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 16px;
	font: inherit;
	line-height: 1.55;
	background: var(--consensus-mist);
	color: var(--consensus-ink);
	resize: vertical;
}
</style>
