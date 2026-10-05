import assert from "node:assert/strict";

export async function createIsolatedBrowserPage(context, base, handleOwnedRequest) {
	const origin = new URL(base);
	assert.equal(origin.protocol, "http:");
	assert.ok(["127.0.0.1", "[::1]"].includes(origin.hostname));
	assert.equal(origin.username, "");
	assert.equal(origin.password, "");
	const page = await context.newPage();
	await page.setRequestInterception(true);
	page.on("request", request => {
		const url = new URL(request.url());
		if (url.origin !== origin.origin && !["data:", "blob:"].includes(url.protocol)) {
			void request.abort().catch(() => {});
			return;
		}
		if (url.origin === origin.origin && handleOwnedRequest?.(request, url) === true) return;
		void request.continue().catch(() => {});
	});
	return page;
}
