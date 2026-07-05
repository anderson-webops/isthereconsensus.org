<script setup lang="ts">
import PaletteSwitcher from "~/components/PaletteSwitcher.vue";
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
			<nav class="site-nav" aria-label="Primary">
				<NuxtLink to="/">Home</NuxtLink>
				<NuxtLink to="/consensus">Browse</NuxtLink>
				<NuxtLink to="/explainers">Explainers</NuxtLink>
				<NuxtLink to="/ask">Ask</NuxtLink>
				<NuxtLink to="/standards">How reviews work</NuxtLink>
				<NuxtLink to="/account">Account</NuxtLink>
				<NuxtLink v-if="canUseEditorial" to="/account/editorial">Editorial</NuxtLink>
			</nav>
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
			<div class="site-footer__meta">
				<ClientOnly>
					<div class="site-footer__appearance" aria-label="Appearance controls">
						<PaletteSwitcher />
						<span class="site-footer__appearance-divider" aria-hidden="true" />
						<ThemeToggle />
					</div>
					<template #fallback>
						<span class="site-footer__appearance-fallback" aria-hidden="true" />
					</template>
				</ClientOnly>
				<nav class="site-footer__links" aria-label="Footer links">
					<NuxtLink to="/corrections">Corrections</NuxtLink>
					<NuxtLink to="/terms">Terms</NuxtLink>
					<NuxtLink to="/privacy">Privacy</NuxtLink>
				</nav>
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
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: start;
	gap: 20px;
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

.site-footer__meta {
	display: flex;
	flex-direction: column;
	align-items: end;
	gap: 12px;
	min-width: min(100%, 220px);
}

.site-footer__appearance {
	display: inline-flex;
	align-items: center;
	justify-content: end;
	gap: 8px;
	padding: 5px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	background: var(--consensus-elevated-surface);
	box-shadow: 0 18px 54px rgba(21, 17, 13, 0.1);
	backdrop-filter: blur(18px);
}

.site-footer__appearance-divider {
	width: 1px;
	height: 24px;
	background: var(--consensus-soft-line);
}

.site-footer__appearance-fallback {
	display: inline-block;
	width: 158px;
	height: 52px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	background: var(--consensus-elevated-surface);
	box-shadow: 0 18px 54px rgba(21, 17, 13, 0.1);
}

.site-footer__links {
	display: flex;
	gap: 8px 14px;
	flex-wrap: wrap;
	justify-content: end;
	font-size: 0.9rem;
}

.site-footer__links a {
	text-decoration: none;
	font-weight: 600;
}

:deep(.site-footer__appearance .palette-switcher) {
	border: 0;
	background: transparent;
	box-shadow: none;
	backdrop-filter: none;
}

:deep(.site-footer__appearance .theme-toggle) {
	box-shadow: none;
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
		grid-template-columns: 1fr;
		margin-top: 32px;
		padding-top: 14px;
	}

	.site-footer__meta {
		align-items: start;
		min-width: 0;
	}

	.site-footer__appearance {
		justify-content: start;
	}

	.site-footer__links {
		justify-content: start;
	}
}
</style>
