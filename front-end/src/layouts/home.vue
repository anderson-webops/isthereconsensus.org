<template>
	<div class="site">
		<slot />
		<footer class="site__footer">
			<div class="footer__brand">Is There Consensus?</div>
			<p>
				A calm place for the curious: find what science agrees on, where the real debates are, and what to ask
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
