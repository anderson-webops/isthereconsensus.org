import type { AccountLibrary } from "~/utils/reader-library";
import { createReaderLibrary } from "~/utils/reader-library";

export default defineNuxtPlugin((nuxtApp) => {
	const { apiUrl } = useApi();
	const { currentAccount, role, ready } = useAuth();
	const library = createReaderLibrary({
		storage: () => window.localStorage,
		loadAccount: (signal) => $fetch<AccountLibrary>(apiUrl("/library/account"), { credentials: "include", signal }),
		saveAccount: (body, signal) =>
			$fetch<AccountLibrary>(apiUrl("/library/account"), {
				method: "PATCH",
				credentials: "include",
				body,
				signal
			})
	});
	if (import.meta.client) {
		nuxtApp.hook("app:mounted", () => {
			void library.initialize();
			watch(
				() => (ready.value ? `${role.value || ""}:${currentAccount.value?._id || ""}` : ""),
				() => {
					const owner =
						ready.value && role.value && currentAccount.value?._id
							? `${role.value}:${currentAccount.value._id}`
							: null;
					void library.setOwner(owner);
				},
				{ immediate: true, flush: "sync" }
			);
			window.addEventListener("storage", (event) => {
				void library.onStorageChange(event.key);
			});
		});
	}
	return { provide: { readerLibrary: library } };
});
