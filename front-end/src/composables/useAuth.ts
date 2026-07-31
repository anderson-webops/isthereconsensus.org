import type { AuthResponse, AuthUser } from "~/types/auth";

interface LoginPayload {
	email: string;
	password: string;
	remember?: boolean;
}

interface RegisterPayload {
	name: string;
	email: string;
	password: string;
	captchaToken: string;
	acceptTerms: boolean;
}

interface ChangeEmailPayload {
	email: string;
	currentPassword: string;
}

interface ChangePasswordPayload {
	currentPassword: string;
	newPassword: string;
}

export function useAuth() {
	const { apiUrl } = useApi();

	const user = useState<AuthUser | null>("auth-user", () => null);
	const admin = useState<AuthUser | null>("auth-admin", () => null);
	const ready = useState<boolean>("auth-ready", () => false);
	const refreshing = useState<boolean>("auth-refreshing", () => false);

	const currentAccount = computed(() => admin.value ?? user.value);
	const role = computed(() => (admin.value ? "admin" : user.value ? "user" : null));
	const isLoggedIn = computed(() => !!currentAccount.value);

	async function refreshAuth() {
		if (refreshing.value) return;
		refreshing.value = true;
		try {
			const headers = import.meta.server ? useRequestHeaders(["cookie"]) : undefined;
			const response = await $fetch<AuthResponse>(apiUrl("/auth/me"), {
				credentials: "include",
				headers
			});
			user.value = response.currentUser ?? null;
			admin.value = response.currentAdmin ?? null;
		} catch {
			user.value = null;
			admin.value = null;
		} finally {
			ready.value = true;
			refreshing.value = false;
		}
	}

	if (import.meta.client && !ready.value && !refreshing.value) {
		refreshAuth();
	}

	async function login(payload: LoginPayload) {
		const response = await $fetch<AuthResponse>(apiUrl("/auth/login"), {
			method: "POST",
			credentials: "include",
			body: payload
		});
		user.value = response.currentUser ?? null;
		admin.value = response.currentAdmin ?? null;
		ready.value = true;
		return response;
	}

	async function register(payload: RegisterPayload) {
		const response = await $fetch<AuthResponse>(apiUrl("/auth/register"), {
			method: "POST",
			credentials: "include",
			body: payload
		});
		user.value = response.currentUser ?? null;
		admin.value = response.currentAdmin ?? null;
		ready.value = true;
		return response;
	}

	async function logout() {
		await $fetch(apiUrl("/auth/logout"), {
			method: "DELETE",
			credentials: "include"
		});
		user.value = null;
		admin.value = null;
		ready.value = true;
	}

	async function changeEmail(payload: ChangeEmailPayload) {
		const response = await $fetch<AuthResponse>(apiUrl("/auth/email"), {
			method: "PATCH",
			credentials: "include",
			body: payload
		});
		user.value = response.currentUser ?? null;
		admin.value = response.currentAdmin ?? null;
		return response;
	}

	async function changePassword(payload: ChangePasswordPayload) {
		return $fetch(apiUrl("/auth/password"), {
			method: "PATCH",
			credentials: "include",
			body: payload
		});
	}

	return {
		user,
		admin,
		currentAccount,
		role,
		isLoggedIn,
		ready,
		refreshAuth,
		login,
		register,
		logout,
		changeEmail,
		changePassword
	};
}
