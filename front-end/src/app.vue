<script setup lang="ts">
import { appName } from "~/constants";

useHead({
	title: appName,
	link: [
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
		}
	]
});
</script>

<template>
	<VitePwaManifest />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
:root {
	color-scheme: light;
	--consensus-ink: #15110d;
	--consensus-muted: #5d544f;
	--consensus-cream: #f6f1e8;
	--consensus-sand: #e7d6c4;
	--consensus-ember: #d36b38;
	--consensus-moss: #35524a;
	--consensus-mist: #fbf8f3;
	--consensus-surface: #fffdf9;
	--consensus-line: rgba(21, 17, 13, 0.12);
	--consensus-soft-line: rgba(21, 17, 13, 0.08);
	--consensus-soft-accent: rgba(211, 107, 56, 0.1);
}

html,
body,
#__nuxt {
	min-height: 100%;
	margin: 0;
	padding: 0;
	background: var(--consensus-mist);
	color: var(--consensus-ink);
	font-family: "Space Grotesk", system-ui, sans-serif;
}

* {
	box-sizing: border-box;
}

body {
	line-height: 1.5;
}

img {
	max-width: 100%;
}

button,
input,
textarea,
select {
	font: inherit;
}

a {
	color: inherit;
}

.eyebrow {
	text-transform: uppercase;
	letter-spacing: 0.18em;
	font-size: 0.73rem;
	color: var(--consensus-muted);
}
</style>
