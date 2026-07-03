<script setup lang="ts">
import ThemeToggle from "~/components/ThemeToggle.vue";

const { currentAccount, role } = useAuth();

const canUseEditorial = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
</script>

<template>
	<div class="site-shell">
		<header class="site-header">
			<NuxtLink class="site-brand" to="/">
				<span class="site-brand__name">Is There Consensus?</span>
				<span class="site-brand__tag">Science, explained in the right order.</span>
			</NuxtLink>
			<div class="site-header__actions">
				<nav class="site-nav" aria-label="Primary">
					<NuxtLink to="/">Home</NuxtLink>
					<NuxtLink to="/consensus">Browse</NuxtLink>
					<NuxtLink to="/explainers">Explainers</NuxtLink>
					<NuxtLink to="/ask">Ask</NuxtLink>
					<NuxtLink to="/standards">How reviews work</NuxtLink>
					<NuxtLink to="/account">Account</NuxtLink>
					<NuxtLink v-if="canUseEditorial" to="/account/editorial">Editorial</NuxtLink>
				</nav>
				<ThemeToggle />
			</div>
		</header>

		<main class="site-main">
			<slot />
		</main>

		<footer class="site-footer">
			<div>
				<p class="site-footer__title">Is There Consensus?</p>
				<p>
					Clear summaries of where the science stands, what is still open, and where public confusion tends to
					creep in.
				</p>
			</div>
			<div class="site-footer__links">
				<NuxtLink to="/consensus">Browse topics</NuxtLink>
				<NuxtLink to="/ask">Ask a question</NuxtLink>
				<NuxtLink to="/explainers">Explainers</NuxtLink>
				<NuxtLink to="/standards">How reviews work</NuxtLink>
				<NuxtLink to="/community-guidelines">Community guidelines</NuxtLink>
				<NuxtLink to="/corrections">Corrections policy</NuxtLink>
				<NuxtLink to="/terms">Terms of service</NuxtLink>
				<NuxtLink to="/privacy">Privacy policy</NuxtLink>
			</div>
		</footer>
	</div>
</template>

<style scoped>
.site-shell {
	min-height: 100vh;
	padding: 18px clamp(18px, 3vw, 48px) 42px;
	overflow-x: clip;
}

.site-header,
.site-footer {
	max-width: 1120px;
	margin: 0 auto;
}

.site-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	padding-bottom: 16px;
	border-bottom: 1px solid var(--consensus-soft-line);
}

.site-header__actions {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center;
	gap: 12px;
	justify-content: end;
	min-width: 0;
}

.site-brand {
	display: grid;
	gap: 1px;
	text-decoration: none;
}

.site-brand__name,
.site-footer__title {
	font-family: "Fraunces", serif;
	font-size: 1.2rem;
	color: var(--consensus-ink);
}

.site-brand__tag,
.site-footer,
.site-nav a {
	color: var(--consensus-muted);
}

.site-brand__tag {
	max-width: 30ch;
	font-size: 0.88rem;
}

.site-nav {
	display: flex;
	gap: 6px;
	flex-wrap: wrap;
	justify-content: end;
	min-width: 0;
}

.site-nav a {
	padding: 8px 10px;
	border-radius: 999px;
	text-decoration: none;
	font-weight: 600;
	font-size: 0.92rem;
	transition:
		background-color 180ms ease,
		color 180ms ease,
		box-shadow 180ms ease;
}

.site-nav a:hover {
	color: var(--consensus-ink);
	background: var(--consensus-soft-line);
}

.site-nav a.router-link-active {
	color: var(--consensus-ink);
	background: var(--consensus-soft-accent);
	box-shadow: inset 0 0 0 1px rgba(211, 107, 56, 0.14);
}

.site-main {
	max-width: 1120px;
	margin: 0 auto;
	padding-top: 24px;
}

.site-footer {
	margin-top: 48px;
	padding-top: 18px;
	border-top: 1px solid var(--consensus-soft-line);
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
	font-size: 0.95rem;
}

.site-footer__title {
	margin: 0 0 6px;
}

.site-footer p {
	margin: 0;
	max-width: 560px;
	line-height: 1.6;
}

.site-footer__links {
	display: flex;
	gap: 10px 12px;
	flex-wrap: wrap;
	align-items: start;
	justify-content: end;
	max-width: 420px;
}

.site-footer__links a {
	text-decoration: none;
	font-weight: 600;
}

@media (max-width: 700px) {
	.site-shell {
		padding: 14px 14px 28px;
	}

	.site-header {
		align-items: stretch;
		flex-direction: column;
		padding-bottom: 12px;
	}

	.site-header__actions {
		width: 100%;
		align-items: start;
		justify-content: stretch;
	}

	.site-nav {
		justify-content: start;
		gap: 6px;
	}

	.site-nav a {
		padding: 7px 9px;
		font-size: 0.9rem;
	}

	.site-main {
		padding-top: 16px;
	}

	.site-footer {
		margin-top: 32px;
		padding-top: 14px;
	}

	.site-footer__links {
		justify-content: start;
	}
}
</style>
