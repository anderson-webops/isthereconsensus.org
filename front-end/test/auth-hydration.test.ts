import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { setImmediate } from "node:timers/promises";
import { runInNewContext } from "node:vm";
import { transformSync } from "esbuild";
import { computed, ref } from "vue";

// Execute the actual composable with Nuxt's lifecycle boundary under explicit
// control. A fast response must not change server-rendered state before hydration.
function harness(response: unknown, server = false) {
	const states = new Map<string, ReturnType<typeof ref>>();
	const mounted: Array<() => void> = [];
	const calls: string[] = [];
	const module = { exports: {} as { useAuth: typeof import("../src/composables/useAuth").useAuth } };
	const { code } = transformSync(readFileSync(new URL("../src/composables/useAuth.ts", import.meta.url), "utf8"), {
		loader: "ts",
		format: "cjs",
		define: { "import.meta.client": String(!server), "import.meta.server": String(server) }
	});
	runInNewContext(code, {
		module,
		exports: module.exports,
		computed,
		useApi: () => ({ apiUrl: (path: string) => `/api${path}` }),
		useState: (key: string, init: () => unknown) => {
			if (!states.has(key)) states.set(key, ref(init()));
			return states.get(key);
		},
		onNuxtReady: (callback: () => void) => mounted.push(callback),
		$fetch: async (url: string) => {
			calls.push(url);
			if (response instanceof Error) throw response;
			return response;
		}
	});
	return { useAuth: module.exports.useAuth, mounted, calls };
}

describe("initial authentication hydration", () => {
	for (const role of ["anonymous", "user", "admin"] as const) {
		it(`keeps SSR state until ready, then resolves one ${role} lookup across consumers`, async () => {
			const account = { _id: "fixture", name: "Fixture" };
			const runtime = harness({
				currentUser: role === "user" ? account : null,
				currentAdmin: role === "admin" ? account : null
			});
			const first = runtime.useAuth();
			const second = runtime.useAuth();
			await setImmediate();
			assert.equal(runtime.calls.length, 0, "Do not start authentication before hydration completes.");
			assert.equal(first.ready.value, false);
			assert.equal(first.currentAccount.value, null);
			for (const callback of runtime.mounted) callback();
			await setImmediate();
			assert.deepEqual(runtime.calls, ["/api/auth/me"]);
			assert.equal(first.ready.value, true);
			assert.equal(second.ready.value, true);
			assert.equal(first.role.value, role === "anonymous" ? null : role);
			assert.equal(second.currentAccount.value?._id ?? null, role === "anonymous" ? null : "fixture");
			runtime.useAuth();
			assert.equal(runtime.calls.length, 1);
		});
	}
	it("does not perform browser initialization during SSR", () => {
		const runtime = harness({}, true);
		assert.equal(runtime.useAuth().ready.value, false);
		assert.equal(runtime.calls.length, 0);
		assert.equal(runtime.mounted.length, 0);
	});
	it("finishes loading without an account when the initial lookup fails", async () => {
		const runtime = harness(new Error("Fixture network failure"));
		const auth = runtime.useAuth();
		for (const callback of runtime.mounted) callback();
		await setImmediate();
		assert.equal(auth.ready.value, true);
		assert.equal(auth.currentAccount.value, null);
	});
});
