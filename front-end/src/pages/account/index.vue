<script setup lang="ts">
import AuthPanel from "~/components/AuthPanel.vue";
import ExpertApplicationPanel from "~/components/ExpertApplicationPanel.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const { currentAccount, isLoggedIn, role } = useAuth();

const canUseEditorial = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
const roleCopy = computed(() => {
	if (!isLoggedIn.value) {
		return "Sign in to post questions, manage your account, and apply for expert review.";
	}
	if (role.value === "admin") {
		return "Admin accounts can review intake and maintain canonical claim pages from the editorial workspace.";
	}
	if (currentAccount.value?.expertiseStatus === "verified") {
		return "Verified experts can draft and publish canonical claim reviews from the editorial workspace.";
	}
	return "Member accounts can post community questions and apply for expert review.";
});

const accountFacts = computed(() => {
	if (!isLoggedIn.value || !currentAccount.value) return [];
	return [
		{ label: "Role", value: role.value === "admin" ? "Admin" : "Member" },
		{ label: "Trust score", value: String(currentAccount.value.trustScore ?? 0) },
		{ label: "Trust level", value: String(currentAccount.value.trustLevel ?? 0) },
		{ label: "Expert status", value: currentAccount.value.expertiseStatus || "none" }
	];
});
</script>

<template>
	<div class="account-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Account' }]" />

		<header class="account-header">
			<div>
				<p class="eyebrow">Account</p>
				<h1>Manage access without crowding the public reading path.</h1>
				<p>{{ roleCopy }}</p>
			</div>
			<div v-if="canUseEditorial" class="account-header__actions">
				<NuxtLink class="button button--primary" to="/account/editorial">Open editorial workspace</NuxtLink>
			</div>
		</header>

		<section v-if="accountFacts.length" class="status-strip">
			<article v-for="fact in accountFacts" :key="fact.label" class="status-card">
				<span>{{ fact.label }}</span>
				<strong>{{ fact.value }}</strong>
			</article>
		</section>

		<AuthPanel
			title="Account access"
			hint="Posting requires a member account. Editorial work lives in the dedicated workspace."
		/>

		<ExpertApplicationPanel />

		<section v-if="canUseEditorial" class="next-step">
			<p class="eyebrow">Editorial access</p>
			<h2>Use the separate editorial workspace for intake routing and claim maintenance.</h2>
			<p>
				The public account page stays intentionally light. Draft claims, review queues, and moderation tools
				live in a separate workspace so they do not complicate normal account management.
			</p>
			<NuxtLink class="button button--ghost" to="/account/editorial">Go to editorial workspace</NuxtLink>
		</section>
	</div>
</template>

<style scoped>
.account-page {
	display: grid;
	gap: 24px;
}

.account-header,
.status-card,
.next-step {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.account-header,
.next-step {
	padding: 22px;
}

.account-header {
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: end;
}

.account-header h1,
.next-step h2 {
	margin: 8px 0 10px;
	font-family: "Fraunces", serif;
}

.account-header h1 {
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.account-header p,
.next-step p {
	margin: 0;
	max-width: 48rem;
	color: var(--consensus-muted);
	line-height: 1.7;
}

.status-strip {
	display: grid;
	gap: 12px;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.status-card {
	padding: 16px 18px;
	display: grid;
	gap: 6px;
}

.status-card span {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

.status-card strong {
	color: var(--consensus-ink);
}

.next-step {
	display: grid;
	gap: 12px;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 11px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	text-decoration: none;
	cursor: pointer;
	background: transparent;
	color: var(--consensus-ink);
}

.button--primary {
	background: var(--consensus-interactive);
	border-color: var(--consensus-interactive);
	color: #fff;
}
</style>
