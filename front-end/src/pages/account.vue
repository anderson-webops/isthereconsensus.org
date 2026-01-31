<script setup lang="ts">
import AuthPanel from "~/components/AuthPanel.vue";
</script>

<template>
	<div class="account-page">
		<header class="account-page__header">
			<p class="eyebrow">Account</p>
			<h1>Manage your profile</h1>
			<p>Sign in, update your details, or reset your password from here.</p>
		</header>
		<AuthPanel title="Account access" hint="Your account controls posting and moderation later." />
	</div>
</template>

<style scoped>
.account-page {
	display: grid;
	gap: 28px;
}

.account-page__header h1 {
	font-family: "Fraunces", serif;
	font-size: clamp(2.2rem, 4vw, 3.2rem);
	margin-bottom: 8px;
}

.account-page__header p {
	max-width: 640px;
	color: var(--consensus-muted);
	line-height: 1.6;
}
</style>
