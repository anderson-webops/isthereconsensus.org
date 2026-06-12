import process from "node:process";

interface PublicDeploymentConfig {
	deployment?: {
		commit?: unknown;
		ref?: unknown;
	};
	siteUrl?: unknown;
}

function stringValue(value: unknown): string {
	return typeof value === "string" ? value : "";
}

export default defineEventHandler((event) => {
	const config = useRuntimeConfig(event);
	const publicConfig = config.public as PublicDeploymentConfig;

	setResponseHeader(event, "Cache-Control", "no-store");

	return {
		ok: true,
		service: "front-end",
		runtime: "nuxt-ssr",
		nodeEnv: process.env.NODE_ENV || "",
		buildId: stringValue(config.app?.buildId),
		commit: stringValue(publicConfig.deployment?.commit),
		ref: stringValue(publicConfig.deployment?.ref),
		siteUrl: stringValue(publicConfig.siteUrl)
	};
});
