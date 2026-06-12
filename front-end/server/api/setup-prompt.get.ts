import type { SetupPromptResponse } from "~/types/setup";
import process from "node:process";
import { canReadDiagnostics } from "~/utils/diagnostics";
import { buildServerAgentPrompt, launchValidationTasks, serverPreparationTasks } from "../utils/setupPrompt";

export default defineEventHandler((event): SetupPromptResponse => {
	const config = useRuntimeConfig(event);
	const internalDiagnosticsKey = config.internalDiagnosticsKey as string;
	const providedDiagnosticsKey = getHeader(event, "x-internal-diagnostics-key");
	const diagnosticsAllowed = canReadDiagnostics({
		isProd: process.env.NODE_ENV === "production",
		configuredKey: internalDiagnosticsKey,
		providedKey: providedDiagnosticsKey
	});

	if (!diagnosticsAllowed) {
		throw createError({
			statusCode: 403,
			statusMessage: "Forbidden"
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
