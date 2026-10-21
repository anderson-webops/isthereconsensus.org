<script setup lang="ts">
import PaletteSwitcher from "~/components/PaletteSwitcher.vue";
import ThemeToggle from "~/components/ThemeToggle.vue";

const { currentAccount, role } = useAuth();

const route = useRoute();
const year = new Date().getFullYear();
const learnPathPattern = /^\/(?:explainers|guides|compare|misconceptions)(?:\/|$)/;
const isLearnRoute = computed(() => learnPathPattern.test(route.path));
const canUseEditorial = computed(() => role.value === "admin" || currentAccount.value?.expertiseStatus === "verified");
</script>

<template>
	<div class="site-shell">
		<a class="skip-link" href="#main-content">Skip to content</a>
		<header class="site-header">
			<NuxtLink class="site-brand" to="/">
				<span class="site-brand__mark" aria-hidden="true"><span /><span /></span>
				<span class="site-brand__text">
					<span class="site-brand__name">Is There Consensus?</span>
					<span class="site-brand__tag">Science, explained in the right order.</span>
				</span>
			</NuxtLink>
			<nav class="site-nav" aria-label="Primary">
				<NuxtLink to="/consensus">Browse</NuxtLink>
				<NuxtLink to="/explainers" :class="{ 'router-link-active': isLearnRoute }">Learn</NuxtLink>
				<NuxtLink to="/ask">Ask</NuxtLink>
				<NuxtLink to="/library">My library</NuxtLink>
				<NuxtLink v-if="canUseEditorial" to="/account/editorial">Editorial</NuxtLink>
			</nav>
		</header>

		<main id="main-content" class="site-main" tabindex="-1">
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
				<div class="site-footer__appearance" aria-label="Appearance controls" role="group">
					<span class="site-footer__appearance-label">Appearance</span>
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
					<NuxtLink to="/standards">How reviews work</NuxtLink>
					<NuxtLink to="/account">Account</NuxtLink>
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
	padding: 0 clamp(18px, 3vw, 48px) 42px;
	overflow-x: clip;
}

.skip-link {
	position: absolute;
	top: 10px;
	left: 10px;
	z-index: 50;
	padding: 10px 14px;
	border-radius: 8px;
	background: var(--consensus-ink);
	color: var(--consensus-mist);
	font-weight: 700;
	text-decoration: none;
	transform: translateY(-160%);
}

.skip-link:focus-visible {
	transform: none;
}

.site-main:focus {
	outline: none;
}

.site-header,
.site-footer {
	max-width: 1120px;
	margin: 0 auto;
}

.site-header {
	position: sticky;
	top: 0;
	z-index: 30;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
	min-height: var(--consensus-header-height);
	padding: 12px 0;
	border-bottom: 1px solid var(--consensus-soft-line);
	background: color-mix(in srgb, var(--consensus-mist) 84%, transparent);
	backdrop-filter: saturate(1.4) blur(14px);
}

.site-brand {
	display: inline-flex;
	align-items: center;
	gap: 12px;
	text-decoration: none;
}

.site-brand__text {
	display: grid;
	gap: 1px;
}

.site-brand__mark {
	display: inline-grid;
	align-content: center;
	justify-items: center;
	gap: 4px;
	flex: none;
	width: 36px;
	height: 36px;
	border-radius: 10px;
	background: var(--consensus-ink);
	transition: transform 180ms ease;
}

.site-brand__mark > span {
	width: 18px;
	height: 4px;
	border-radius: 999px;
	background: var(--consensus-mist);
}

.site-brand:hover .site-brand__mark {
	transform: rotate(-6deg);
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
	font-size: 0.82rem;
	line-height: 1.3;
}

.site-nav {
	display: flex;
	gap: 6px;
	flex-wrap: wrap;
	justify-content: end;
	min-width: 0;
	max-width: 520px;
}

.site-nav a {
	padding: 8px 10px;
	border-radius: 999px;
	text-decoration: none;
	font-weight: 500;
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
	padding-top: 28px;
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
	min-width: min(100%, 320px);
}

.site-footer__appearance {
	display: inline-flex;
	align-items: center;
	gap: 10px;
	max-width: 100%;
	padding: 6px 6px 6px 14px;
	border: 1px solid var(--consensus-line);
	border-radius: 999px;
	background: var(--consensus-elevated-surface);
	box-shadow: 0 18px 48px rgba(21, 17, 13, 0.1);
	backdrop-filter: blur(16px);
}

.site-footer__appearance-label {
	color: var(--consensus-muted);
	font-size: 0.84rem;
	font-weight: 700;
	letter-spacing: 0;
	line-height: 1;
	white-space: nowrap;
}

.site-footer__controls {
	display: inline-flex;
	align-items: center;
	gap: 8px;
}

.site-footer__appearance-fallback {
	width: 120px;
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

@media (max-width: 700px) {
	.site-shell {
		padding: 0 14px 28px;
	}

	.site-header {
		position: static;
		align-items: stretch;
		flex-direction: column;
		gap: 10px;
		padding: 14px 0 12px;
		backdrop-filter: none;
		background: transparent;
	}

	.site-brand__mark {
		width: 30px;
		height: 30px;
		border-radius: 8px;
	}

	.site-brand__mark > span {
		width: 14px;
		height: 3px;
	}

	.site-nav {
		justify-content: start;
		gap: 4px;
		flex-wrap: wrap;
	}

	.site-nav a {
		padding: 6px 8px;
		font-size: 0.84rem;
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
		width: min(100%, 360px);
	}

	.site-footer__links {
		justify-content: start;
	}
}

@media (max-width: 480px) {
	.site-brand__tag {
		display: none;
	}
}
</style>
