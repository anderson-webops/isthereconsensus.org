import type { AccountLibrary, LibraryStorage } from "../src/utils/reader-library";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	createReaderLibrary,
	decodeDeviceLibrary,
	MAX_SAVED_REVIEWS,
	READER_LIBRARY_KEY,
	validLibrarySelection
} from "../src/utils/reader-library";

const reviewA = "a".repeat(24);
const reviewB = "b".repeat(24);
const topic = "c".repeat(24);
function empty() {
	return {
		revision: 0,
		savedReviewIds: [] as string[],
		followedTopicIds: [] as string[],
		savedComparisonSlugs: [] as string[],
		followedCoverageRequestIds: [] as string[]
	};
}
const copy = <T>(value: T): T => JSON.parse(JSON.stringify(value));

function fixture() {
	const data = new Map<string, string>();
	const storage: LibraryStorage = {
		getItem: (key) => data.get(key) ?? null,
		setItem: (key, value) => {
			data.set(key, value);
		}
	};
	let account = empty();
	let saves = 0;
	const ports = {
		storage: () => storage,
		loadAccount: async (_signal: AbortSignal) => copy(account),
		saveAccount: async (next: AccountLibrary, _signal: AbortSignal) => {
			saves += 1;
			if (next.revision !== account.revision) throw Object.assign(new Error("conflict"), { statusCode: 409 });
			account = { ...copy(next), revision: next.revision + 1 };
			return copy(account);
		}
	};
	return {
		data,
		storage,
		ports,
		library: createReaderLibrary(ports),
		account: () => account,
		saveCount: () => saves,
		replaceAccount: (
			next: Omit<AccountLibrary, "savedComparisonSlugs" | "followedCoverageRequestIds"> & {
				savedComparisonSlugs?: string[];
				followedCoverageRequestIds?: string[];
			}
		) => {
			account = { ...empty(), ...next };
		}
	};
}

describe("reader library", () => {
	it("normalizes legacy account responses when retrying a following conflict", async () => {
		const setup = fixture();
		const load = setup.ports.loadAccount;
		setup.ports.loadAccount = async (signal) => {
			const current = await load(signal);
			const { followedCoverageRequestIds: _requests, ...legacy } = current;
			return legacy as AccountLibrary;
		};
		await setup.library.initialize();
		await setup.library.setOwner("user-a");
		await setup.library.changeScope("account");
		setup.replaceAccount({ ...empty(), revision: 1, savedReviewIds: [reviewA] });
		assert.equal(await setup.library.setSelected("followedCoverageRequestIds", topic, true), true);
		assert.deepEqual(setup.account().followedCoverageRequestIds, [topic]);
		assert.deepEqual(setup.account().savedReviewIds, [reviewA]);
		assert.equal(setup.account().revision, 2);
	});

	it("saves, follows and removes without an account, persisting across reloads", async () => {
		const f = fixture();
		await f.library.initialize();
		assert.equal(await f.library.setSelected("savedReviewIds", reviewA, true), true);
		await f.library.setSelected("followedTopicIds", topic, true);
		assert.equal(f.saveCount(), 0);
		const reloaded = createReaderLibrary(f.ports);
		await reloaded.initialize();
		assert.deepEqual(reloaded.state.savedReviewIds, [reviewA]);
		assert.deepEqual(reloaded.state.followedTopicIds, [topic]);
		await reloaded.setSelected("savedReviewIds", reviewA, false);
		await reloaded.setSelected("followedTopicIds", topic, false);
		assert.deepEqual(decodeDeviceLibrary(f.data.get(READER_LIBRARY_KEY)!), {
			savedReviewIds: [],
			followedTopicIds: [],
			savedComparisonSlugs: [],
			followedCoverageRequestIds: []
		});
	});

	it("does not claim a failed storage write succeeded", async () => {
		const f = fixture();
		await f.library.initialize();
		f.storage.setItem = () => {
			throw new Error("quota");
		};
		assert.equal(await f.library.setSelected("savedReviewIds", reviewA, true), false);
		assert.deepEqual(f.library.state.savedReviewIds, []);
		assert.match(f.library.state.error, /could not be saved/);
		assert.equal(f.library.state.notice, "");
	});

	it("preserves corrupt storage until an explicit clear", async () => {
		const f = fixture();
		f.data.set(READER_LIBRARY_KEY, "not-json");
		await f.library.initialize();
		assert.equal(f.library.state.ready, false);
		assert.equal(await f.library.setSelected("savedReviewIds", reviewA, true), false);
		assert.equal(f.data.get(READER_LIBRARY_KEY), "not-json");
		assert.equal(await f.library.clearLibrary(), true);
		assert.equal(f.library.state.ready, true);
		assert.deepEqual(f.library.state.savedReviewIds, []);
	});

	it("does not upload browser saves on sign-in or account selection", async () => {
		const f = fixture();
		await f.library.initialize();
		await f.library.setSelected("savedReviewIds", reviewA, true);
		await f.library.setOwner(`user:${reviewA}`);
		assert.equal(f.library.state.scope, "device");
		await f.library.changeScope("account");
		assert.deepEqual(f.library.state.savedReviewIds, []);
		assert.equal(f.saveCount(), 0);
		assert.deepEqual(decodeDeviceLibrary(f.data.get(READER_LIBRARY_KEY)!).savedReviewIds, [reviewA]);
	});

	it("copies browser selections only explicitly and merges without duplicate ids", async () => {
		const f = fixture();
		f.replaceAccount({ revision: 1, savedReviewIds: [reviewA, reviewB], followedTopicIds: [] });
		await f.library.initialize();
		await f.library.setSelected("savedReviewIds", reviewA, true);
		await f.library.setSelected("followedTopicIds", topic, true);
		await f.library.setOwner(`user:${reviewA}`);
		assert.equal(await f.library.copyDeviceToAccount(), true);
		assert.deepEqual(f.account(), {
			...empty(),
			revision: 2,
			savedReviewIds: [reviewA, reviewB],
			followedTopicIds: [topic]
		});
		assert.equal(f.saveCount(), 1);
	});

	it("restores only browser data after sign-out, and never caches account selections in storage", async () => {
		const f = fixture();
		f.replaceAccount({ revision: 1, savedReviewIds: [reviewB], followedTopicIds: [] });
		await f.library.initialize();
		await f.library.setSelected("savedReviewIds", reviewA, true);
		await f.library.setOwner(`user:${reviewA}`);
		await f.library.changeScope("account");
		assert.deepEqual(f.library.state.savedReviewIds, [reviewB]);
		assert.equal(
			[...f.data.values()].some((value) => value.includes(reviewB)),
			false
		);
		await f.library.setOwner(null);
		assert.equal(f.library.state.scope, "device");
		assert.deepEqual(f.library.state.savedReviewIds, [reviewA]);
	});

	it("reopens the chosen account scope across reloads without copying browser saves", async () => {
		const f = fixture();
		f.replaceAccount({ revision: 7, savedReviewIds: [reviewB], followedTopicIds: [topic] });
		await f.library.initialize();
		await f.library.setOwner(`user:${reviewA}`);
		await f.library.changeScope("account");
		const reloaded = createReaderLibrary(f.ports);
		await reloaded.initialize();
		await reloaded.setOwner(`user:${reviewA}`);
		assert.equal(reloaded.state.scope, "account");
		assert.deepEqual(reloaded.state.savedReviewIds, [reviewB]);
		assert.equal(f.saveCount(), 0);
	});

	it("ignores a delayed account read after switching identities", async () => {
		const f = fixture();
		await f.library.initialize();
		await f.library.setOwner(`user:${reviewA}`);
		const deferred = Promise.withResolvers<AccountLibrary>();
		f.ports.loadAccount = () => deferred.promise;
		const pending = f.library.changeScope("account");
		await f.library.setOwner(`user:${reviewB}`);
		deferred.resolve({ ...empty(), revision: 9, savedReviewIds: [reviewA] });
		await pending;
		assert.equal(f.library.state.owner, `user:${reviewB}`);
		assert.equal(f.library.state.scope, "device");
		assert.deepEqual(f.library.state.savedReviewIds, []);
	});

	it("ignores a delayed save after sign-out", async () => {
		const f = fixture();
		await f.library.initialize();
		await f.library.setOwner(`user:${reviewA}`);
		await f.library.changeScope("account");
		const deferred = Promise.withResolvers<AccountLibrary>();
		f.ports.saveAccount = () => deferred.promise;
		const pending = f.library.setSelected("savedReviewIds", reviewB, true);
		await f.library.setOwner(null);
		deferred.resolve({ ...empty(), revision: 1, savedReviewIds: [reviewB] });
		assert.equal(await pending, false);
		assert.deepEqual(f.library.state.savedReviewIds, []);
		assert.equal(f.library.state.notice, "");
	});

	it("merges a concurrent addition after a revision conflict", async () => {
		const f = fixture();
		await f.library.initialize();
		await f.library.setOwner(`user:${reviewA}`);
		await f.library.changeScope("account");
		f.replaceAccount({ revision: 1, savedReviewIds: [reviewB], followedTopicIds: [] });
		assert.equal(await f.library.setSelected("savedReviewIds", reviewA, true), true);
		assert.deepEqual(f.account(), { ...empty(), revision: 2, savedReviewIds: [reviewA, reviewB] });
		assert.equal(f.saveCount(), 2);
	});

	it("does not retry a clear against a concurrently changed account library", async () => {
		const f = fixture();
		await f.library.initialize();
		await f.library.setOwner(`user:${reviewA}`);
		await f.library.changeScope("account");
		f.replaceAccount({ revision: 1, savedReviewIds: [reviewB], followedTopicIds: [] });
		assert.equal(await f.library.clearLibrary(), false);
		assert.deepEqual(f.account().savedReviewIds, [reviewB]);
		assert.equal(f.library.state.needsReload, true);
	});

	it("freezes account writes after an uncertain response until a reload", async () => {
		const f = fixture();
		await f.library.initialize();
		await f.library.setOwner(`user:${reviewA}`);
		await f.library.changeScope("account");
		const save = f.ports.saveAccount;
		f.ports.saveAccount = async (next, signal) => {
			await save(next, signal);
			throw new Error("connection lost");
		};
		assert.equal(await f.library.setSelected("savedReviewIds", reviewA, true), false);
		assert.equal(f.library.state.needsReload, true);
		assert.equal(await f.library.setSelected("savedReviewIds", reviewB, true), false);
		assert.equal(f.saveCount(), 1);
		await f.library.reload();
		assert.deepEqual(f.library.state.savedReviewIds, [reviewA]);
		assert.equal(f.library.state.needsReload, false);
	});

	it("re-reads browser selections from another tab before adding", async () => {
		const f = fixture();
		await f.library.initialize();
		f.data.set(READER_LIBRARY_KEY, JSON.stringify({ version: 1, savedReviewIds: [reviewB], followedTopicIds: [] }));
		await f.library.setSelected("savedReviewIds", reviewA, true);
		assert.deepEqual(f.library.state.savedReviewIds, [reviewA, reviewB]);
		f.data.set(READER_LIBRARY_KEY, JSON.stringify({ version: 1, savedReviewIds: [], followedTopicIds: [topic] }));
		await f.library.onStorageChange(READER_LIBRARY_KEY);
		assert.deepEqual(f.library.state.followedTopicIds, [topic]);
		assert.deepEqual(f.library.state.savedReviewIds, []);
	});

	it("validates ids, array limits, duplicates and serialized versions", () => {
		assert.equal(validLibrarySelection({ ...empty(), savedReviewIds: ["https://secret.example"] }), false);
		assert.equal(validLibrarySelection({ ...empty(), savedReviewIds: [reviewA, reviewA] }), false);
		assert.equal(
			validLibrarySelection({
				...empty(),
				savedReviewIds: Array.from({ length: MAX_SAVED_REVIEWS + 1 }, (_, i) =>
					i.toString(16).padStart(24, "0")
				),
				followedTopicIds: []
			}),
			false
		);
		assert.throws(() => decodeDeviceLibrary(JSON.stringify({ ...empty(), version: 4 })));
	});

	it("upgrades legacy browser saves only on mutation and persists comparisons across reloads", async () => {
		const f = fixture();
		const legacy = JSON.stringify({ version: 1, savedReviewIds: [reviewA], followedTopicIds: [topic] });
		f.data.set(READER_LIBRARY_KEY, legacy);
		await f.library.initialize();
		assert.equal(f.data.get(READER_LIBRARY_KEY), legacy);
		assert.deepEqual(f.library.state.savedComparisonSlugs, []);
		assert.equal(await f.library.setSelected("savedComparisonSlugs", "electricity-emissions", true), true);
		assert.equal(JSON.parse(f.data.get(READER_LIBRARY_KEY)!).version, 3);
		const reloaded = createReaderLibrary(f.ports);
		await reloaded.initialize();
		assert.deepEqual(reloaded.state.savedComparisonSlugs, ["electricity-emissions"]);
		assert.deepEqual(reloaded.state.savedReviewIds, [reviewA]);
		assert.deepEqual(reloaded.state.followedTopicIds, [topic]);
		await reloaded.setSelected("savedComparisonSlugs", "electricity-emissions", false);
		assert.deepEqual(reloaded.state.savedComparisonSlugs, []);
	});

	it("copies comparisons only explicitly, merges conflicts and isolates account removals", async () => {
		const f = fixture();
		await f.library.initialize();
		await f.library.setSelected("savedComparisonSlugs", "electricity-emissions", true);
		await f.library.setOwner(`user:${reviewA}`);
		assert.equal(f.saveCount(), 0);
		f.replaceAccount({ ...empty(), revision: 1, savedComparisonSlugs: ["caffeine-dose-and-sleep"] });
		assert.equal(await f.library.copyDeviceToAccount(), true);
		assert.deepEqual(f.account().savedComparisonSlugs, ["electricity-emissions", "caffeine-dose-and-sleep"]);
		f.replaceAccount({
			...f.account(),
			revision: 3,
			savedComparisonSlugs: [...f.account().savedComparisonSlugs, "strength-training-supplements"]
		});
		await f.library.setSelected("savedComparisonSlugs", "electricity-emissions", false);
		assert.deepEqual(f.account().savedComparisonSlugs, [
			"caffeine-dose-and-sleep",
			"strength-training-supplements"
		]);
		await f.library.setOwner(null);
		assert.deepEqual(f.library.state.savedComparisonSlugs, ["electricity-emissions"]);
		await f.library.clearLibrary();
		assert.deepEqual(f.library.state.savedComparisonSlugs, []);
		assert.equal(f.account().savedComparisonSlugs.length, 2);
	});

	it("rejects malformed, oversized or future comparison data without overwriting storage", async () => {
		for (const savedComparisonSlugs of [
			["../private"],
			["a", "a"],
			["a".repeat(101)],
			Array.from({ length: 51 }, (_, i) => `comparison-${i}`)
		]) {
			assert.equal(validLibrarySelection({ ...empty(), savedComparisonSlugs }), false);
		}
		const f = fixture();
		const future = JSON.stringify({ ...empty(), version: 4, savedComparisonSlugs: ["electricity-emissions"] });
		f.data.set(READER_LIBRARY_KEY, future);
		await f.library.initialize();
		assert.equal(await f.library.setSelected("savedReviewIds", reviewA, true), false);
		assert.equal(f.data.get(READER_LIBRARY_KEY), future);
	});
});

describe("requested-question follows", () => {
	it("upgrades version-two storage only after an explicit follow and preserves older selections", async () => {
		const fixtureState = fixture();
		const { followedCoverageRequestIds: _requests, ...legacy } = empty();
		const raw = JSON.stringify({
			...legacy,
			version: 2,
			savedReviewIds: [reviewA],
			savedComparisonSlugs: ["electricity-emissions"]
		});
		fixtureState.data.set(READER_LIBRARY_KEY, raw);
		await fixtureState.library.initialize();
		assert.equal(fixtureState.data.get(READER_LIBRARY_KEY), raw);
		assert.deepEqual(fixtureState.library.state.followedCoverageRequestIds, []);
		assert.equal(await fixtureState.library.setSelected("followedCoverageRequestIds", topic, true), true);
		assert.equal(JSON.parse(fixtureState.data.get(READER_LIBRARY_KEY)!).version, 3);
		const reloaded = createReaderLibrary(fixtureState.ports);
		await reloaded.initialize();
		assert.deepEqual(reloaded.state.followedCoverageRequestIds, [topic]);
		assert.deepEqual(reloaded.state.savedReviewIds, [reviewA]);
		assert.deepEqual(reloaded.state.savedComparisonSlugs, ["electricity-emissions"]);
		assert.equal(fixtureState.saveCount(), 0);
		await reloaded.setSelected("followedCoverageRequestIds", topic, false);
		assert.deepEqual(reloaded.state.followedCoverageRequestIds, []);
	});
	it("copies follows only explicitly and isolates account and browser removals", async () => {
		const fixtureState = fixture();
		await fixtureState.library.initialize();
		await fixtureState.library.setSelected("followedCoverageRequestIds", topic, true);
		await fixtureState.library.setOwner(`user:${reviewA}`);
		assert.equal(fixtureState.saveCount(), 0);
		fixtureState.replaceAccount({ ...empty(), revision: 1, followedCoverageRequestIds: [reviewB] });
		assert.equal(await fixtureState.library.copyDeviceToAccount(), true);
		assert.deepEqual(fixtureState.account().followedCoverageRequestIds, [topic, reviewB]);
		await fixtureState.library.setSelected("followedCoverageRequestIds", topic, false);
		assert.deepEqual(fixtureState.account().followedCoverageRequestIds, [reviewB]);
		await fixtureState.library.setOwner(null);
		assert.deepEqual(fixtureState.library.state.followedCoverageRequestIds, [topic]);
		await fixtureState.library.clearLibrary();
		assert.deepEqual(fixtureState.library.state.followedCoverageRequestIds, []);
		assert.deepEqual(fixtureState.account().followedCoverageRequestIds, [reviewB]);
	});
	it("merges a concurrent follow without dropping another requested question", async () => {
		const fixtureState = fixture();
		await fixtureState.library.initialize();
		await fixtureState.library.setOwner(`user:${reviewA}`);
		await fixtureState.library.changeScope("account");
		fixtureState.replaceAccount({ ...empty(), revision: 1, followedCoverageRequestIds: [reviewB] });
		assert.equal(await fixtureState.library.setSelected("followedCoverageRequestIds", topic, true), true);
		assert.deepEqual(fixtureState.account().followedCoverageRequestIds, [topic, reviewB]);
	});
	it("rejects duplicate, malformed and excessive follows and preserves corrupt storage", async () => {
		for (const followedCoverageRequestIds of [
			[topic, topic],
			["PRIVATE QUESTION"],
			Array.from({ length: 101 }, (_, index) => index.toString(16).padStart(24, "0"))
		]) {
			assert.equal(validLibrarySelection({ ...empty(), followedCoverageRequestIds }), false);
		}
		const fixtureState = fixture();
		const corrupt = JSON.stringify({ ...empty(), version: 3, followedCoverageRequestIds: [topic, topic] });
		fixtureState.data.set(READER_LIBRARY_KEY, corrupt);
		await fixtureState.library.initialize();
		assert.equal(fixtureState.library.state.ready, false);
		assert.equal(await fixtureState.library.setSelected("followedCoverageRequestIds", reviewA, true), false);
		assert.equal(fixtureState.data.get(READER_LIBRARY_KEY), corrupt);
	});
});
