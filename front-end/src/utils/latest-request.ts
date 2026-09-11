/** Invalidating on input change prevents an older response replacing newer intent. */
export function createLatestRequest() {
	let version = 0;
	let controller: AbortController | undefined;
	function cancel() {
		version++;
		controller?.abort();
	}
	return {
		cancel,
		begin() {
			cancel();
			controller = new AbortController();
			const current = version;
			return { signal: controller.signal, isCurrent: () => current === version };
		}
	};
}
