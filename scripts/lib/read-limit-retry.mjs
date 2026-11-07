import { setTimeout as delay } from "node:timers/promises";

export async function fetchWithReadLimit(request, wait = delay) {
	const response = await request();
	if (response.status !== 429) return response;
	const retryAfter = response.headers.get("retry-after");
	await response.arrayBuffer();
	if (!/^\d{1,2}$/u.test(retryAfter ?? "") || Number(retryAfter) > 60) {
		throw new Error("Public read retry requires a Retry-After value between zero and sixty seconds.");
	}
	await wait((Number(retryAfter) + 1) * 1000);
	const retried = await request();
	if (retried.status === 429) {
		await retried.arrayBuffer();
		throw new Error("Public read remained rate-limited after one bounded retry.");
	}
	return retried;
}
