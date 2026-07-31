import type { SetupPromptResponse } from "~/types/setup";
import process from "node:process";
import { canReadDiagnostics } from "~/utils/diagnostics";
import { buildServerAgentPrompt, launchValidationTasks, serverPreparationTasks } from "../utils/setupPrompt";

export default defineEventHandler((event): SetupPromptResponse => {
	const config = useRuntimeConfig(event);
	const internalDiagnosticsKey = config.internalDiagnosticsKey as string;
	const providedDiagnosticsKey = getHeader(event, "x-internal-diagnostics-key");
	const diagnosticsEnabled = process.env.ENABLE_INTERNAL_DIAGNOSTICS === "true";
	const diagnosticsAllowed = canReadDiagnostics({
		isProd: process.env.NODE_ENV === "production",
		enabled: diagnosticsEnabled,
		configuredKey: internalDiagnosticsKey,
		providedKey: providedDiagnosticsKey
	});

	if (!diagnosticsAllowed) {
		const diagnosticsHidden = process.env.NODE_ENV === "production" && !diagnosticsEnabled;
		throw createError({
			statusCode: diagnosticsHidden ? 404 : 403,
			statusMessage: diagnosticsHidden ? "Not Found" : "Forbidden"
		});
	}

	const siteUrl = config.public.siteUrl || getRequestURL(event).origin;
	const apiBase = config.public.apiBase as string;

	return {
		prompt: buildServerAgentPrompt({ siteUrl, apiBase }),
		serverPreparationTasks,
		launchValidationTasks
	};
});
