<script setup lang="ts">
import AdminReviewPanel from "~/components/AdminReviewPanel.vue";
import AuthPanel from "~/components/AuthPanel.vue";
import ExpertApplicationPanel from "~/components/ExpertApplicationPanel.vue";
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const { currentAccount, isLoggedIn, role } = useAuth();

const roleCopy = computed(() => {
	if (!isLoggedIn.value) {
		return "Sign in to post questions, track trust, and apply for expert review.";
	}
	if (role.value === "admin") {
		return "You are reviewing moderation and expert queues for the public-facing consensus lanes.";
	}
	if (currentAccount.value?.expertiseStatus === "verified") {
		return "You can post as a member and take part in the expert review path.";
	}
	return "You can post questions now and apply for expert review when you are ready.";
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

const principles = [
	"Read the bottom line before joining a thread.",
	"Keep claims specific enough to evaluate with evidence.",
	"Use the community lane for questions and the expert lane for review."
];
</script>

<template>
	<div class="account-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Account' }]" />

		<header class="account-header">
			<div>
				<p class="eyebrow">Account</p>
				<h1>Manage access without leaving the public workflow.</h1>
				<p>{{ roleCopy }}</p>
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
			hint="Posting requires a member account. Admin review and expert verification live below."
		/>

		<ExpertApplicationPanel />
		<AdminReviewPanel />

		<section class="principles">
			<div>
				<p class="eyebrow">How this area works</p>
				<h2>Access supports the public reading path.</h2>
			</div>
			<ul>
				<li v-for="item in principles" :key="item">{{ item }}</li>
			</ul>
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
.principles {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.account-header,
.principles {
	padding: 22px;
}

.account-header h1,
.principles h2 {
	margin: 8px 0 10px;
	font-family: "Fraunces", serif;
}

.account-header h1 {
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.account-header p,
.principles ul {
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
	font-size: 1rem;
	color: var(--consensus-ink);
}

.principles {
	display: grid;
	gap: 14px;
}

.principles ul {
	padding-left: 18px;
	display: grid;
	gap: 8px;
}
</style>
