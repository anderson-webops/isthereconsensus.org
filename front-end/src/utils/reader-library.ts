import { reactive } from "vue";

export const READER_LIBRARY_KEY = "consensus-reader-library-v1";
const ACCOUNT_PREFERENCE_KEY = "consensus-reader-library-account";
export const MAX_SAVED_REVIEWS = 200;
export const MAX_FOLLOWED_TOPICS = 100;
export const MAX_SAVED_COMPARISONS = 50;

export interface LibrarySelection {
	savedReviewIds: string[];
	followedTopicIds: string[];
	savedComparisonSlugs: string[];
}

export interface AccountLibrary extends LibrarySelection {
	revision: number;
}

export interface LibraryStorage {
	getItem: (key: string) => string | null;
	setItem: (key: string, value: string) => void;
}

interface LibraryPorts {
	storage: () => LibraryStorage;
	loadAccount: (signal: AbortSignal) => Promise<AccountLibrary>;
	saveAccount: (library: AccountLibrary, signal: AbortSignal) => Promise<AccountLibrary>;
}

function emptySelection(): LibrarySelection {
	return { savedReviewIds: [], followedTopicIds: [], savedComparisonSlugs: [] };
}

export function validLibrarySelection(value: unknown): value is LibrarySelection {
	if (!value || typeof value !== "object") return false;
	const record = value as Record<string, unknown>;
	const limits = {
		savedReviewIds: MAX_SAVED_REVIEWS,
		followedTopicIds: MAX_FOLLOWED_TOPICS,
		savedComparisonSlugs: MAX_SAVED_COMPARISONS
	};
	return (["savedReviewIds", "followedTopicIds", "savedComparisonSlugs"] as const).every((key) => {
		const values = record[key];
		return (
			Array.isArray(values) &&
			values.length <= limits[key] &&
			new Set(values).size === values.length &&
			values.every(
				(id) =>
					typeof id === "string" &&
					(key === "savedComparisonSlugs"
						? id.length <= 100 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)
						: /^[a-f\d]{24}$/.test(id))
			)
		);
	});
}

export function decodeDeviceLibrary(raw: string | null): LibrarySelection {
	if (raw === null) return emptySelection();
	const value = JSON.parse(raw) as Record<string, unknown> | null;
	if (!value || (value.version !== 1 && value.version !== 2)) throw new Error("Invalid browser library");
	// Upgrade in memory only. The same key switches to version 2 on an explicit
	// mutation, so older clients fail closed instead of dropping comparisons.
	if (value.version === 1 && value.savedComparisonSlugs !== undefined) throw new Error("Invalid legacy library");
	const normalized = value.version === 1 ? { ...value, savedComparisonSlugs: [] } : value;
	if (!validLibrarySelection(normalized)) {
		throw new Error("Invalid browser library");
	}
	return {
		savedReviewIds: [...normalized.savedReviewIds],
		followedTopicIds: [...normalized.followedTopicIds],
		savedComparisonSlugs: [...normalized.savedComparisonSlugs]
	};
}

function validAccountLibrary(value: unknown): value is AccountLibrary {
	return (
		validLibrarySelection(value) &&
		Number.isSafeInteger((value as AccountLibrary).revision) &&
		(value as AccountLibrary).revision >= 0
	);
}

function statusCode(error: unknown) {
	if (!error || typeof error !== "object") return undefined;
	const value = error as { status?: number; statusCode?: number };
	return value.statusCode ?? value.status;
}

export function createReaderLibrary(ports: LibraryPorts) {
	const state = reactive({
		...emptySelection(),
		revision: 0,
		owner: null as string | null,
		scope: "device" as "device" | "account",
		ready: false,
		busy: false,
		needsReload: false,
		error: "",
		notice: ""
	});
	let generation = 0;
	let request = new AbortController();
	let initialized = false;

	function assign(selection: LibrarySelection) {
		state.savedReviewIds = [...selection.savedReviewIds];
		state.followedTopicIds = [...selection.followedTopicIds];
		state.savedComparisonSlugs = [...selection.savedComparisonSlugs];
	}

	function beginContext() {
		generation += 1;
		request.abort();
		request = new AbortController();
		assign(emptySelection());
		state.revision = 0;
		state.busy = false;
		state.ready = false;
		state.needsReload = false;
		state.error = "";
		state.notice = "";
		return generation;
	}

	function readDevice() {
		return decodeDeviceLibrary(ports.storage().getItem(READER_LIBRARY_KEY));
	}

	async function reload() {
		const epoch = beginContext();
		if (state.scope === "device") {
			try {
				assign(readDevice());
				state.ready = true;
			} catch {
				state.error =
					"This browser's library could not be read. Your stored selections have not been overwritten.";
			}
			return;
		}
		state.busy = true;
		try {
			const result = await ports.loadAccount(request.signal);
			if (epoch !== generation) return;
			if (!validAccountLibrary(result)) throw new Error("Invalid account library");
			assign(result);
			state.revision = result.revision;
			state.ready = true;
		} catch {
			if (epoch === generation) state.error = "Your account library could not be loaded. Please retry.";
		} finally {
			if (epoch === generation) state.busy = false;
		}
	}

	async function initialize() {
		if (initialized) return;
		initialized = true;
		await reload();
	}

	async function setOwner(owner: string | null) {
		if (owner === state.owner) return;
		state.owner = owner;
		state.scope = "device";
		try {
			if (owner && ports.storage().getItem(ACCOUNT_PREFERENCE_KEY) === owner) state.scope = "account";
		} catch {
			// A preference failure must never substitute the last account's data.
		}
		await reload();
	}

	async function changeScope(scope: "device" | "account") {
		if (scope === "account" && !state.owner) return;
		state.scope = scope;
		try {
			ports.storage().setItem(ACCOUNT_PREFERENCE_KEY, scope === "account" ? state.owner! : "");
		} catch {
			// Scope is still usable in memory when browser preferences are blocked.
		}
		await reload();
	}

	async function mutate(transform: (current: LibrarySelection) => LibrarySelection, clear = false) {
		if (!state.ready || state.busy || state.needsReload) return false;
		state.error = "";
		state.notice = "";
		const epoch = generation;
		state.busy = true;
		try {
			if (state.scope === "device") {
				const next = transform(readDevice());
				if (!validLibrarySelection(next)) throw new Error("Library limit");
				ports.storage().setItem(READER_LIBRARY_KEY, JSON.stringify({ version: 2, ...next }));
				assign(next);
			} else {
				let current: AccountLibrary = {
					savedReviewIds: [...state.savedReviewIds],
					followedTopicIds: [...state.followedTopicIds],
					savedComparisonSlugs: [...state.savedComparisonSlugs],
					revision: state.revision
				};
				for (let attempt = 0; attempt < 2; attempt += 1) {
					if (epoch !== generation) return false;
					const next = transform(current);
					if (!validLibrarySelection(next)) throw new Error("Library limit");
					try {
						const saved = await ports.saveAccount({ ...next, revision: current.revision }, request.signal);
						if (epoch !== generation) return false;
						if (!validAccountLibrary(saved)) throw new Error("Invalid account library");
						assign(saved);
						state.revision = saved.revision;
						break;
					} catch (error) {
						if (epoch !== generation) return false;
						if (statusCode(error) !== 409 || attempt === 1 || clear) throw error;
						current = await ports.loadAccount(request.signal);
						if (!validAccountLibrary(current)) throw new Error("Invalid account library");
					}
				}
			}
			state.notice = state.scope === "account" ? "Saved to your account." : "Saved in this browser.";
			return true;
		} catch (error) {
			if (epoch !== generation) return false;
			state.needsReload = state.scope === "account";
			state.error =
				statusCode(error) === 422
					? "A selected review, topic or comparison is no longer available. Reload your library before retrying."
					: state.scope === "account"
						? "Your changes were not confirmed saved. Reload your library before retrying."
						: "Your changes could not be saved in this browser. Check browser storage and the library limits.";
			return false;
		} finally {
			if (epoch === generation) state.busy = false;
		}
	}

	function setSelected(key: keyof LibrarySelection, id: string, selected: boolean) {
		return mutate((current) => ({
			...current,
			[key]: selected ? [...new Set([id, ...current[key]])] : current[key].filter((value) => value !== id)
		}));
	}

	async function copyDeviceToAccount() {
		if (!state.owner || state.busy) return false;
		const owner = state.owner;
		await changeScope("account");
		if (state.owner !== owner || state.scope !== "account" || !state.ready) return false;
		let device: LibrarySelection;
		try {
			device = readDevice();
		} catch {
			state.error = "The browser library could not be read. Nothing was copied.";
			return false;
		}
		return mutate((current) => ({
			savedReviewIds: [...new Set([...device.savedReviewIds, ...current.savedReviewIds])],
			followedTopicIds: [...new Set([...device.followedTopicIds, ...current.followedTopicIds])],
			savedComparisonSlugs: [...new Set([...device.savedComparisonSlugs, ...current.savedComparisonSlugs])]
		}));
	}

	async function clearLibrary() {
		if (state.scope === "device" && !state.busy) {
			try {
				ports.storage().setItem(READER_LIBRARY_KEY, JSON.stringify({ version: 2, ...emptySelection() }));
				await reload();
				state.notice = "Browser library cleared.";
				return true;
			} catch {
				state.error = "The browser library could not be cleared. Check browser storage and retry.";
				return false;
			}
		}
		return mutate(emptySelection, true);
	}

	async function onStorageChange(key: string | null) {
		if ((key === READER_LIBRARY_KEY || key === null) && state.scope === "device" && !state.busy) await reload();
	}

	return {
		state,
		initialize,
		setOwner,
		changeScope,
		reload,
		setSelected,
		copyDeviceToAccount,
		clearLibrary,
		onStorageChange
	};
}

export type ReaderLibraryController = ReturnType<typeof createReaderLibrary>;
