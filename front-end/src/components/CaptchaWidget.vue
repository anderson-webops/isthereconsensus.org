<script setup lang="ts">
interface TurnstileOptions {
	sitekey: string;
	theme?: "light" | "dark";
	size?: "normal" | "compact";
	callback?: (token: string) => void;
	"expired-callback"?: () => void;
	"error-callback"?: () => void;
}

declare global {
	interface Window {
		turnstile?: {
			render: (container: string | HTMLElement, options: TurnstileOptions) => string;
			reset: (widgetId?: string) => void;
			remove: (widgetId: string) => void;
		};
	}
}

const props = withDefaults(
	defineProps<{
		modelValue: string;
		theme?: "light" | "dark";
		size?: "normal" | "compact";
	}>(),
	{
		size: "normal"
	}
);

const emit = defineEmits<{
	(event: "update:modelValue", value: string): void;
}>();

const config = useRuntimeConfig();
const colorMode = useColorMode();
const siteKey = config.public.captchaSiteKey as string;
const resolvedTheme = computed<"light" | "dark">(() => props.theme || (colorMode.value === "dark" ? "dark" : "light"));

const containerId = `turnstile-${Math.random().toString(36).slice(2, 10)}`;
const widgetId = ref<string | null>(null);
const isReady = ref(false);
const hasSiteKey = computed(() => !!siteKey);

let scriptPromise: Promise<void> | null = null;

function loadScript() {
	if (scriptPromise) return scriptPromise;
	scriptPromise = new Promise((resolve, reject) => {
		if (window.turnstile) {
			resolve();
			return;
		}
		const script = document.createElement("script");
		script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Failed to load captcha"));
		document.head.appendChild(script);
	});
	return scriptPromise;
}

function renderWidget() {
	if (!window.turnstile || !hasSiteKey.value) return;
	const container = document.getElementById(containerId);
	if (!container) return;
	widgetId.value = window.turnstile.render(container, {
		sitekey: siteKey,
		theme: resolvedTheme.value,
		size: props.size,
		callback: (token) => emit("update:modelValue", token),
		"expired-callback": () => emit("update:modelValue", ""),
		"error-callback": () => emit("update:modelValue", "")
	});
	isReady.value = true;
}

function reset() {
	if (window.turnstile && widgetId.value) {
		window.turnstile.reset(widgetId.value);
		emit("update:modelValue", "");
	}
}

defineExpose({ reset });

onMounted(async () => {
	if (!hasSiteKey.value) {
		isReady.value = true;
		return;
	}
	try {
		await loadScript();
		renderWidget();
	} catch (error) {
		console.error(error);
		isReady.value = true;
	}
});

onBeforeUnmount(() => {
	if (window.turnstile && widgetId.value) {
		window.turnstile.remove(widgetId.value);
	}
});

watch(resolvedTheme, async (theme, previousTheme) => {
	if (!window.turnstile || !hasSiteKey.value || !widgetId.value || theme === previousTheme) return;
	window.turnstile.remove(widgetId.value);
	widgetId.value = null;
	isReady.value = false;
	await nextTick();
	renderWidget();
});
</script>

<template>
	<div class="captcha">
		<div v-if="!hasSiteKey" class="captcha__note">Captcha is currently disabled.</div>
		<div v-else>
			<div :id="containerId" class="captcha__widget" />
			<p v-if="!isReady" class="captcha__note">Loading captcha…</p>
		</div>
	</div>
</template>

<style scoped>
.captcha {
	display: grid;
	gap: 8px;
}

.captcha__note {
	color: var(--consensus-muted);
	font-size: 0.85rem;
}
</style>
