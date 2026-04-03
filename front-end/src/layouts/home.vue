<script setup lang="ts">
import ThemeToggle from "~/components/ThemeToggle.vue";
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
					<NuxtLink to="/consensus">Browse</NuxtLink>
					<NuxtLink to="/explainers">Explainers</NuxtLink>
					<NuxtLink to="/how">How it works</NuxtLink>
					<NuxtLink to="/ask">Ask</NuxtLink>
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
				<NuxtLink to="/explainers">Explainers</NuxtLink>
				<NuxtLink to="/standards">Editorial standards</NuxtLink>
				<NuxtLink to="/how">How it works</NuxtLink>
				<NuxtLink to="/ask">Ask a question</NuxtLink>
			</div>
		</footer>
	</div>
</template>

<style scoped>
.site-shell {
	min-height: 100vh;
	padding: 24px clamp(20px, 4vw, 64px) 56px;
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
	align-items: start;
	gap: 20px;
	padding-bottom: 18px;
	border-bottom: 1px solid var(--consensus-soft-line);
}

.site-header__actions {
	display: flex;
	align-items: center;
	gap: 14px;
	justify-content: end;
	flex-wrap: wrap;
}

.site-brand {
	display: grid;
	gap: 2px;
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
	font-size: 0.9rem;
}

.site-nav {
	display: flex;
	gap: 14px;
	flex-wrap: wrap;
	justify-content: end;
}

.site-nav a {
	text-decoration: none;
	font-weight: 600;
	font-size: 0.95rem;
}

.site-nav a.router-link-active {
	color: var(--consensus-ink);
}

.site-main {
	max-width: 1120px;
	margin: 0 auto;
	padding-top: 24px;
}

.site-footer {
	margin-top: 56px;
	padding-top: 20px;
	border-top: 1px solid var(--consensus-soft-line);
	display: flex;
	justify-content: space-between;
	gap: 24px;
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
	gap: 14px;
	flex-wrap: wrap;
	align-items: start;
}

.site-footer__links a {
	text-decoration: none;
	font-weight: 600;
}

@media (max-width: 700px) {
	.site-shell {
		padding: 16px 14px 32px;
	}

	.site-header {
		align-items: stretch;
		flex-direction: column;
		padding-bottom: 14px;
	}

	.site-header__actions {
		width: 100%;
		justify-content: space-between;
	}

	.site-nav {
		justify-content: start;
	}

	.site-main {
		padding-top: 18px;
	}

	.site-footer {
		margin-top: 40px;
		padding-top: 16px;
	}
}
</style>
