interface CancellationEvents<Event extends string> {
	once: (event: Event, listener: () => void) => unknown;
	off: (event: Event, listener: () => void) => unknown;
}

interface CancellationRequest extends CancellationEvents<"aborted"> {
	aborted: boolean;
}

interface CancellationResponse extends CancellationEvents<"close"> {
	writableEnded: boolean;
	destroyed: boolean;
}

export function observeHttpRequestCancellation(request: CancellationRequest, response: CancellationResponse) {
	const controller = new AbortController();
	const abort = () => controller.abort();
	const close = () => {
		if (!response.writableEnded) abort();
	};
	request.once("aborted", abort);
	response.once("close", close);
	if (request.aborted || response.destroyed) abort();
	return {
		signal: controller.signal,
		dispose: () => {
			request.off("aborted", abort);
			response.off("close", close);
		}
	};
}
