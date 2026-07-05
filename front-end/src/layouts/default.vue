<script setup lang="ts">
import PaletteSwitcher from "~/components/PaletteSwitcher.vue";
import ThemeToggle from "~/components/ThemeToggle.vue";

const { currentAccount, role } = useAuth();

const year = new Date().getFullYear();
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
			<div class="site-footer__brand">
				<p class="site-footer__title">Is There Consensus?</p>
				<p class="site-footer__description">
					Clear summaries of where the science stands, what is still open, and where public confusion tends to
					creep in.
				</p>
			</div>
			<div class="site-footer__meta">
				<div class="site-footer__appearance" aria-label="Appearance controls">
					<span class="i-carbon-color-palette site-footer__appearance-icon" aria-hidden="true" />
					<span class="site-footer__appearance-label">Theme</span>
					<ClientOnly>
						<div class="site-footer__controls">
							<PaletteSwitcher />
							<ThemeToggle />
						</div>
						<template #fallback>
							<div class="site-footer__appearance-fallback" aria-hidden="true" />
						</template>
					</ClientOnly>
				</div>
				<nav class="site-footer__links" aria-label="Support and policy">
					<NuxtLink to="/corrections">Corrections</NuxtLink>
					<NuxtLink to="/privacy">Privacy</NuxtLink>
					<NuxtLink to="/terms">Terms</NuxtLink>
				</nav>
				<p class="site-footer__copyright">&copy; {{ year }} Is There Consensus?</p>
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
	max-width: 760px;
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
	align-items: center;
	gap: 24px;
	font-size: 0.95rem;
}

.site-footer__title {
	margin: 0 0 6px;
}

.site-footer__description {
	margin: 0;
	max-width: 560px;
	line-height: 1.6;
}

.site-footer__meta {
	display: flex;
	flex-direction: column;
	align-items: end;
	gap: 12px;
	min-width: min(100%, 340px);
}

.site-footer__appearance {
	display: inline-flex;
	align-items: center;
	gap: 9px;
	max-width: 100%;
	padding: 6px 6px 6px 12px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	background: var(--consensus-elevated-surface);
	box-shadow: 0 18px 48px rgba(21, 17, 13, 0.1);
	backdrop-filter: blur(16px);
}

.site-footer__appearance-icon {
	display: inline-block;
	flex: 0 0 auto;
	width: 1em;
	height: 1em;
	color: var(--consensus-ember);
	font-size: 1rem;
}

.site-footer__appearance-label {
	color: var(--consensus-ink);
	font-size: 0.9rem;
	font-weight: 700;
	line-height: 1;
	white-space: nowrap;
}

.site-footer__controls {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.site-footer__appearance-fallback {
	width: 146px;
	height: 34px;
	border-radius: 999px;
	background: var(--consensus-soft-line);
}

.site-footer__appearance :deep(.palette-switcher) {
	padding: 0;
	border: 0;
	background: transparent;
	box-shadow: none;
	backdrop-filter: none;
}

.site-footer__appearance :deep(.theme-toggle) {
	width: 34px;
	height: 34px;
	border-color: transparent;
	background: var(--consensus-soft-line);
	box-shadow: none;
	backdrop-filter: none;
}

.site-footer__appearance :deep(.theme-toggle:hover) {
	box-shadow: none;
}

.site-footer__links {
	display: flex;
	gap: 8px 12px;
	flex-wrap: wrap;
	justify-content: end;
	font-size: 0.9rem;
}

.site-footer__links a {
	text-decoration: none;
	font-weight: 600;
}

.site-footer__copyright {
	margin: 0;
	color: var(--consensus-muted);
	font-size: 0.86rem;
}

:global(.dark) .site-footer__appearance-icon {
	color: var(--consensus-moss);
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
		justify-content: space-between;
		width: min(100%, 390px);
	}

	.site-footer__links {
		justify-content: start;
	}
}
</style>
