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
const empty = () => ({ revision: 0, savedReviewIds: [] as string[], followedTopicIds: [] as string[] });
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
		replaceAccount: (next: AccountLibrary) => {
			account = next;
		}
	};
}

describe("reader library", () => {
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
			followedTopicIds: []
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
		assert.deepEqual(f.account(), { revision: 2, savedReviewIds: [reviewA, reviewB], followedTopicIds: [topic] });
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
		deferred.resolve({ revision: 9, savedReviewIds: [reviewA], followedTopicIds: [] });
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
		deferred.resolve({ revision: 1, savedReviewIds: [reviewB], followedTopicIds: [] });
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
		assert.deepEqual(f.account(), { revision: 2, savedReviewIds: [reviewA, reviewB], followedTopicIds: [] });
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
		assert.equal(
			validLibrarySelection({ savedReviewIds: ["https://secret.example"], followedTopicIds: [] }),
			false
		);
		assert.equal(validLibrarySelection({ savedReviewIds: [reviewA, reviewA], followedTopicIds: [] }), false);
		assert.equal(
			validLibrarySelection({
				savedReviewIds: Array.from({ length: MAX_SAVED_REVIEWS + 1 }, (_, i) =>
					i.toString(16).padStart(24, "0")
				),
				followedTopicIds: []
			}),
			false
		);
		assert.throws(() => decodeDeviceLibrary(JSON.stringify({ ...empty(), version: 2 })));
	});
});
