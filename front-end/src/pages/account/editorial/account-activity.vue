<script setup lang="ts">
import type {
	AccountActivityAction,
	AccountActivityActorType,
	AccountActivityResponse,
	AccountActivityTargetType
} from "~/types/platform";

definePageMeta({
	layout: "home"
});

useStaticPageMeta({
	description: "Admin-only account activity log for account lifecycle and authentication events.",
	path: "/account/editorial/account-activity",
	robots: "noindex, nofollow",
	title: "Account activity - Is There Consensus?"
});

const { apiUrl } = useApi();
const { role, ready, refreshAuth } = useAuth();

const loading = ref(false);
const errorMessage = ref("");
const logs = ref<AccountActivityResponse["logs"]>([]);
const pagination = ref<AccountActivityResponse["pagination"]>({
	page: 1,
	limit: 25,
	total: 0,
	hasMore: false
});
const action = ref("");
const actorType = ref("");
const actorId = ref("");
const targetType = ref("");
const targetId = ref("");
const sourceIp = ref("");
const from = ref("");
const to = ref("");

const isAdmin = computed(() => role.value === "admin");
const actions: AccountActivityAction[] = [
	"user.registered",
	"user.deleted",
	"admin.created",
	"admin.deleted",
	"login.success",
	"login.failed",
	"logout",
	"password.changed",
	"email.changed",
	"expert_application.created",
	"expert_application.reviewed"
];
const actorTypes: AccountActivityActorType[] = ["user", "admin", "system", "anonymous"];
const targetTypes: AccountActivityTargetType[] = ["user", "admin", "expert_application", "unknown"];
const actionLabels: Record<AccountActivityAction, string> = {
	"user.registered": "Public user registration",
	"user.deleted": "User deleted",
	"admin.created": "Admin created",
	"admin.deleted": "Admin deleted",
	"login.success": "Login success",
	"login.failed": "Login failed",
	logout: "Logout",
	"password.changed": "Password changed",
	"email.changed": "Email changed",
	"expert_application.created": "Expert application created",
	"expert_application.reviewed": "Expert application reviewed"
};

function formatDate(value?: string) {
	if (!value) return "Unknown";
	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(new Date(value));
}

function rowAction(actionName: AccountActivityAction) {
	return actionLabels[actionName] ?? actionName;
}

function rowActor(actorTypeName: AccountActivityActorType, id?: string) {
	return id ? `${actorTypeName} ${id.slice(-8)}` : actorTypeName;
}

function rowTarget(type: AccountActivityTargetType, id?: string) {
	return id ? `${type} ${id.slice(-8)}` : type;
}

function metadataEntries(metadata?: Record<string, string>) {
	return Object.entries(metadata ?? {});
}

function queryParams(page = pagination.value.page) {
	const params = new URLSearchParams();
	params.set("page", String(page));
	params.set("limit", String(pagination.value.limit));
	if (action.value) params.set("action", action.value);
	if (actorType.value) params.set("actorType", actorType.value);
	if (actorId.value.trim()) params.set("actorId", actorId.value.trim());
	if (targetType.value) params.set("targetType", targetType.value);
	if (targetId.value.trim()) params.set("targetId", targetId.value.trim());
	if (sourceIp.value.trim()) params.set("sourceIp", sourceIp.value.trim());
	if (from.value) params.set("from", from.value);
	if (to.value) params.set("to", to.value);
	return params;
}

async function loadActivity(page = pagination.value.page) {
	if (import.meta.server || !isAdmin.value) return;
	loading.value = true;
	errorMessage.value = "";
	try {
		const response = await $fetch<AccountActivityResponse>(apiUrl(`/admin/account-activity?${queryParams(page)}`), {
			credentials: "include"
		});
		logs.value = response.logs;
		pagination.value = response.pagination;
	} catch (error) {
		errorMessage.value = "Unable to load account activity.";
		console.error(error);
	} finally {
		loading.value = false;
	}
}

function applyFilters() {
	void loadActivity(1);
}

function clearFilters() {
	action.value = "";
	actorType.value = "";
	actorId.value = "";
	targetType.value = "";
	targetId.value = "";
	sourceIp.value = "";
	from.value = "";
	to.value = "";
	void loadActivity(1);
}

onMounted(async () => {
	await refreshAuth();
	if (isAdmin.value) await loadActivity(1);
});

watch(
	() => isAdmin.value,
	(value) => {
		if (value && import.meta.client) void loadActivity(1);
	}
);
</script>

<template>
	<main class="activity-page">
		<PageBreadcrumbs
			:items="[
				{ label: 'Home', to: '/' },
				{ label: 'Account', to: '/account' },
				{ label: 'Editorial', to: '/account/editorial' },
				{ label: 'Account activity' }
			]"
		/>

		<section class="activity-header">
			<div>
				<p class="eyebrow">Admin</p>
				<h1>Account activity</h1>
			</div>
			<button
				v-if="isAdmin"
				class="button button--ghost"
				type="button"
				:disabled="loading"
				@click="loadActivity()"
			>
				{{ loading ? "Refreshing..." : "Refresh" }}
			</button>
		</section>

		<section v-if="ready && !isAdmin" class="activity-panel">
			<h2>Admin access required.</h2>
			<p>Sign in with an admin account to view account activity logs.</p>
			<NuxtLink class="button button--primary" to="/account">Go to account</NuxtLink>
		</section>

		<section v-else class="activity-panel">
			<form class="filter-grid" @submit.prevent="applyFilters">
				<label>
					<span>Action</span>
					<select v-model="action">
						<option value="">All actions</option>
						<option v-for="entry in actions" :key="entry" :value="entry">{{ rowAction(entry) }}</option>
					</select>
				</label>
				<label>
					<span>Actor type</span>
					<select v-model="actorType">
						<option value="">Any actor</option>
						<option v-for="entry in actorTypes" :key="entry" :value="entry">{{ entry }}</option>
					</select>
				</label>
				<label>
					<span>Actor id</span>
					<input v-model="actorId" type="text" autocomplete="off" />
				</label>
				<label>
					<span>Target type</span>
					<select v-model="targetType">
						<option value="">Any target</option>
						<option v-for="entry in targetTypes" :key="entry" :value="entry">{{ entry }}</option>
					</select>
				</label>
				<label>
					<span>Target id</span>
					<input v-model="targetId" type="text" autocomplete="off" />
				</label>
				<label>
					<span>Source IP</span>
					<input v-model="sourceIp" type="text" autocomplete="off" />
				</label>
				<label>
					<span>From</span>
					<input v-model="from" type="datetime-local" />
				</label>
				<label>
					<span>To</span>
					<input v-model="to" type="datetime-local" />
				</label>
				<div class="filter-actions">
					<button class="button button--primary" type="submit" :disabled="loading">Apply</button>
					<button class="button button--ghost" type="button" :disabled="loading" @click="clearFilters">
						Clear
					</button>
				</div>
			</form>

			<p v-if="errorMessage" class="error">{{ errorMessage }}</p>

			<div class="activity-table-wrap">
				<table class="activity-table">
					<thead>
						<tr>
							<th>Time</th>
							<th>Action</th>
							<th>Actor</th>
							<th>Target</th>
							<th>Email domain</th>
							<th>Source</th>
							<th>Metadata</th>
						</tr>
					</thead>
					<tbody>
						<tr v-if="!logs.length">
							<td colspan="7">No account activity found.</td>
						</tr>
						<tr v-for="log in logs" :key="log._id">
							<td>{{ formatDate(log.createdAt) }}</td>
							<td>
								<strong>{{ rowAction(log.action) }}</strong>
								<span v-if="log.action === 'user.registered' && log.actorType === 'anonymous'">
									Public
								</span>
								<span v-else-if="log.action === 'admin.created' && log.actorType === 'system'">
									System
								</span>
							</td>
							<td>{{ rowActor(log.actorType, log.actorId) }}</td>
							<td>{{ rowTarget(log.targetType, log.targetId) }}</td>
							<td>
								<span>{{ log.targetEmailDomain || "-" }}</span>
								<code v-if="log.targetEmailHash">{{ log.targetEmailHash.slice(0, 12) }}</code>
							</td>
							<td>
								<span>{{ log.sourceIp || "-" }}</span>
								<code v-if="log.requestId">{{ log.requestId }}</code>
							</td>
							<td>
								<div class="metadata-list">
									<span v-for="[key, value] in metadataEntries(log.metadata)" :key="key">
										{{ key }}={{ value }}
									</span>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div class="pagination-row">
				<span>Showing {{ logs.length }} of {{ pagination.total }}</span>
				<div>
					<button
						class="button button--ghost"
						type="button"
						:disabled="loading || pagination.page <= 1"
						@click="loadActivity(pagination.page - 1)"
					>
						Previous
					</button>
					<button
						class="button button--ghost"
						type="button"
						:disabled="loading || !pagination.hasMore"
						@click="loadActivity(pagination.page + 1)"
					>
						Next
					</button>
				</div>
			</div>
		</section>
	</main>
</template>

<style scoped>
.activity-page {
	max-width: 1180px;
	margin: 0 auto;
	padding: 32px 20px 56px;
	display: grid;
	gap: 18px;
}

.activity-header,
.activity-panel {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 20px;
}

.activity-header {
	padding: 22px;
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.activity-header h1,
.activity-panel h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.activity-panel {
	padding: 20px;
	display: grid;
	gap: 18px;
}

.eyebrow,
.activity-panel p,
.pagination-row,
.error {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.filter-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 12px;
	align-items: end;
}

.filter-grid label {
	display: grid;
	gap: 6px;
	font-weight: 600;
	color: var(--consensus-ink);
}

.filter-grid span {
	font-size: 0.78rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.filter-grid input,
.filter-grid select {
	width: 100%;
	padding: 10px 12px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 12px;
	background: var(--consensus-field-surface);
	color: var(--consensus-ink);
}

.filter-actions,
.pagination-row,
.pagination-row > div {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
	align-items: center;
}

.pagination-row {
	justify-content: space-between;
}

.activity-table-wrap {
	overflow-x: auto;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 14px;
}

.activity-table {
	width: 100%;
	border-collapse: collapse;
	min-width: 980px;
}

.activity-table th,
.activity-table td {
	padding: 11px 12px;
	border-bottom: 1px solid var(--consensus-soft-line);
	text-align: left;
	vertical-align: top;
}

.activity-table th {
	font-size: 0.78rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
	background: var(--consensus-background);
}

.activity-table td {
	color: var(--consensus-ink);
}

.activity-table td span,
.activity-table td code {
	display: block;
}

.activity-table code {
	margin-top: 4px;
	color: var(--consensus-muted);
	white-space: nowrap;
}

.metadata-list {
	display: flex;
	gap: 6px;
	flex-wrap: wrap;
}

.metadata-list span {
	padding: 3px 7px;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 999px;
	font-size: 0.78rem;
	color: var(--consensus-muted);
	white-space: nowrap;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 10px 16px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	cursor: pointer;
	background: transparent;
}

.button--primary {
	background: var(--consensus-ink);
	color: var(--consensus-surface);
}

.error {
	color: #b83d2e;
	font-weight: 600;
}
</style>
