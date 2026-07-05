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
			<div class="site-footer__meta">
				<div class="site-footer__appearance-block">
					<p class="site-footer__eyebrow">Appearance</p>
					<div class="site-footer__appearance" role="group" aria-label="Appearance controls">
						<span class="i-carbon-color-palette site-footer__appearance-icon" aria-hidden="true" />
						<PaletteSwitcher />
						<ThemeToggle />
					</div>
				</div>
				<div class="site-footer__links">
					<NuxtLink to="/corrections">Corrections</NuxtLink>
					<NuxtLink to="/terms">Terms</NuxtLink>
					<NuxtLink to="/privacy">Privacy</NuxtLink>
				</div>
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
	display: flex;
	align-items: center;
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
	min-width: min(100%, 320px);
}

.site-footer__appearance-block {
	display: grid;
	gap: 7px;
	justify-items: end;
}

.site-footer__eyebrow {
	margin: 0;
	max-width: none;
	color: var(--consensus-muted);
	font-size: 0.72rem;
	font-weight: 700;
	letter-spacing: 0.15em;
	line-height: 1;
	text-transform: uppercase;
}

.site-footer__appearance {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	padding: 4px 5px 4px 9px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	background: color-mix(in srgb, var(--consensus-elevated-surface) 92%, transparent);
	box-shadow: 0 18px 48px rgba(21, 17, 13, 0.12);
	backdrop-filter: blur(18px);
}

.site-footer__appearance-icon {
	width: 1.05rem;
	height: 1.05rem;
	color: var(--consensus-ember);
}

.site-footer__appearance :deep(.palette-switcher),
.site-footer__appearance :deep(.theme-toggle) {
	border-color: transparent;
	background: transparent;
	box-shadow: none;
	backdrop-filter: none;
}

.site-footer__appearance :deep(.palette-switcher) {
	padding: 0;
}

.site-footer__appearance :deep(.theme-toggle:hover),
.site-footer__appearance :deep(.palette-switcher__button:hover) {
	box-shadow: none;
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
		grid-template-columns: 1fr;
		margin-top: 32px;
		padding-top: 14px;
	}

	.site-footer__meta {
		align-items: start;
		min-width: 0;
	}

	.site-footer__appearance-block {
		justify-items: start;
	}

	.site-footer__appearance {
		max-width: 100%;
	}

	.site-footer__links {
		justify-content: start;
	}
}
</style>
