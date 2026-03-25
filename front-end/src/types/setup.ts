export type SetupSeverity = "critical" | "warning" | "info";

export interface SetupCheck {
	id: string;
	label: string;
	ok: boolean;
	severity: SetupSeverity;
	detail: string;
	action?: string;
}

export interface SetupStatusResponse {
	ok: boolean;
	environment: "production" | "development";
	generatedAt: string;
	apiBase: string;
	databaseName: string;
	mongoSource: "vault" | "env" | "missing";
	checks: SetupCheck[];
	summary: string;
}

export interface SetupProbe<T> {
	ok: boolean;
	detail: string;
	data?: T;
}

export interface SetupDashboardResponse {
	generatedAt: string;
	siteUrl: string;
	apiBase: string;
	frontend: SetupProbe<{ ok: boolean }>;
	backendHealth: SetupProbe<{ ok: boolean }>;
	backendReady: SetupProbe<{ ready: boolean; state?: number }>;
	backendSetup: SetupProbe<SetupStatusResponse>;
}
