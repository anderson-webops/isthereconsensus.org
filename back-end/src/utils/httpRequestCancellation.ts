import type { IncomingMessage, ServerResponse } from "node:http";

export function observeHttpRequestCancellation(request: IncomingMessage, response: ServerResponse) {
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
