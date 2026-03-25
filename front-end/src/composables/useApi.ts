import { buildApiUrl } from "~/utils/api";

export function useApi() {
	const config = useRuntimeConfig();
	const base = import.meta.server ? (config.apiInternalBase as string) : (config.public.apiBase as string);

	function apiUrl(path: string) {
		return buildApiUrl(base, path);
	}

	return {
		base,
		apiUrl
	};
}
