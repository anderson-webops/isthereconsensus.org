<script setup lang="ts">
import { siteUrl } from "~/constants";

const router = useRouter();

if (import.meta.server) {
	setResponseStatus(404);
}

useHead({
	title: "Not found"
});

useSeoMeta({
	robots: "noindex,follow"
});

useHead({
	link: [
		{
			key: "canonical",
			rel: "canonical",
			href: `${siteUrl}/`
		}
	]
});
</script>

<template>
	<section class="not-found">
		<p class="eyebrow">Page not found</p>
		<h1>That page is not part of the current consensus map.</h1>
		<p>
			Try the topic browser, return to the homepage, or go back to the previous page if you followed an old link.
		</p>

		<div class="not-found__actions">
			<NuxtLink class="button button--primary" to="/consensus">Browse topics</NuxtLink>
			<NuxtLink class="button button--ghost" to="/">Go home</NuxtLink>
			<button class="button button--ghost" type="button" @click="router.back()">Go back</button>
		</div>
	</section>
</template>

<style scoped>
.not-found {
	display: grid;
	gap: 16px;
	padding: clamp(24px, 5vw, 36px);
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 24px;
	text-align: left;
}

.not-found h1 {
	margin: 0;
	font-family: "Fraunces", serif;
	font-size: var(--consensus-page-title-size);
	line-height: 1.02;
	max-width: 14ch;
}

.not-found p:last-of-type {
	margin: 0;
	max-width: 58ch;
	color: var(--consensus-muted);
	line-height: 1.65;
}

.not-found__actions {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 20px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	text-decoration: none;
	font-weight: 600;
	background: transparent;
	color: inherit;
	cursor: pointer;
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.button--ghost {
	background: transparent;
}
</style>
