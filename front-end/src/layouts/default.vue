<template>
	<div class="site">
		<header class="site__header">
			<NuxtLink class="site__brand" to="/">Is There Consensus?</NuxtLink>
			<nav class="site__nav">
				<NuxtLink to="/how">How it works</NuxtLink>
				<NuxtLink to="/ask">Ask</NuxtLink>
				<NuxtLink to="/account">Account</NuxtLink>
			</nav>
		</header>
		<slot />
		<footer class="site__footer">
			<div class="footer__brand">Is There Consensus?</div>
			<p>
				A calm place for the curious: see how knowledge is built, where the consensus sits, and what to ask
				next.
			</p>
			<div class="footer__meta">
				<span>isthereconsensus.org</span>
				<span>Built for curious viewers</span>
			</div>
		</footer>
	</div>
</template>

<style scoped>
.site {
	min-height: 100vh;
	padding: 32px clamp(24px, 6vw, 96px) 72px;
}

.site__header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 18px;
	padding-bottom: 24px;
}

.site__brand {
	font-family: "Fraunces", serif;
	font-size: 1.25rem;
	color: var(--consensus-ink);
	text-decoration: none;
}

.site__nav {
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
}

.site__nav a {
	text-decoration: none;
	color: var(--consensus-muted);
	font-weight: 600;
	font-size: 0.95rem;
}

/*noinspection CssUnusedSymbol*/
.site__nav a.router-link-active {
	color: var(--consensus-ink);
}

.site__footer {
	margin-top: 72px;
	padding: 32px 0 16px;
	border-top: 1px solid rgba(21, 17, 13, 0.1);
	color: var(--consensus-muted);
	display: grid;
	gap: 12px;
	font-size: 0.95rem;
}

.footer__brand {
	font-family: "Fraunces", serif;
	font-size: 1.2rem;
	color: var(--consensus-ink);
}

.footer__meta {
	display: flex;
	gap: 18px;
	flex-wrap: wrap;
	font-size: 0.85rem;
	text-transform: uppercase;
	letter-spacing: 0.08em;
}
</style>
