export interface IsolatedBrowserRequest {
	url: () => string;
	abort: () => Promise<unknown>;
	continue: () => Promise<unknown>;
}

export interface IsolatedBrowserPage<RequestType extends IsolatedBrowserRequest> {
	setRequestInterception: (enabled: boolean) => Promise<unknown>;
	on: (event: "request", listener: (request: RequestType) => void) => unknown;
}

export function createIsolatedBrowserPage<
	RequestType extends IsolatedBrowserRequest,
	PageType extends IsolatedBrowserPage<RequestType>
>(
	context: { newPage: () => Promise<PageType> },
	base: string,
	handleOwnedRequest?: (request: RequestType, url: URL) => boolean
): Promise<PageType>;
