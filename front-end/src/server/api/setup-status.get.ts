import type { SetupDashboardResponse, SetupProbe, SetupStatusResponse } from "~/types/setup";
import { buildApiUrl, joinBaseUrl } from "~/utils/api";

async function probeJson<T>(url: string, successDetail: (data: T) => string): Promise<SetupProbe<T>> {
	try {
		const data = (await $fetch(url, { retry: 0 })) as T;
		return {
			ok: true,
			detail: successDetail(data),
			data
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Request failed";
		return {
			ok: false,
			detail: `${url} is unreachable: ${message}`
		};
	}
}

export default defineEventHandler(async (event): Promise<SetupDashboardResponse> => {
	const config = useRuntimeConfig(event);
	const siteUrl = config.public.siteUrl || getRequestURL(event).origin;
	const apiBase = config.public.apiBase as string;
	const internalApiBase = config.apiInternalBase as string;

	const frontend: SetupProbe<{ ok: boolean }> = {
		ok: true,
		detail: "Nuxt is serving this page."
	};

	const [backendHealth, backendReady, backendSetup] = await Promise.all([
		probeJson<{ ok: boolean }>(joinBaseUrl(internalApiBase, "/healthz"), () => "Backend /healthz responded successfully."),
		probeJson<{ ready: boolean; state?: number }>(joinBaseUrl(internalApiBase, "/readyz"), (data) =>
			data.ready
				? "Backend /readyz reports MongoDB is ready."
				: `Backend /readyz reports not ready${typeof data.state === "number" ? ` (state ${data.state})` : ""}.`
		),
		probeJson<SetupStatusResponse>(buildApiUrl(internalApiBase, "/setup/status"), (data) => data.summary)
	]);

	return {
		generatedAt: new Date().toISOString(),
		siteUrl,
		apiBase,
		frontend,
		backendHealth,
		backendReady,
		backendSetup
	};
});
