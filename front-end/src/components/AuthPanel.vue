<script setup lang="ts">
import CaptchaWidget from "~/components/CaptchaWidget.vue";

const props = withDefaults(
	defineProps<{
		title?: string;
		hint?: string;
	}>(),
	{
		title: "Account access",
		hint: ""
	}
);

const config = useRuntimeConfig();
const captchaRequired = computed(() => !!config.public.captchaSiteKey);

const { currentAccount, isLoggedIn, role, ready, login, register, logout, changeEmail, changePassword } = useAuth();

const mode = ref<"login" | "register">("login");
const loginEmail = ref("");
const loginPassword = ref("");
const rememberMe = ref(true);

const registerName = ref("");
const registerEmail = ref("");
const registerPassword = ref("");
const registerCaptcha = ref("");
const acceptedTerms = ref(false);

const emailUpdate = ref("");
const currentPassword = ref("");
const newPassword = ref("");

const authError = ref("");
const authSuccess = ref("");
const accountMessage = ref("");
const accountError = ref("");
const busy = ref(false);

const accountId = computed(() => currentAccount.value?._id ?? "");
const accountName = computed(() => currentAccount.value?.name || "Account");
const accountRole = computed(() => (role.value === "admin" ? "Admin" : "Member"));

async function handleLogin() {
	authError.value = "";
	authSuccess.value = "";
	busy.value = true;
	try {
		await login({
			email: loginEmail.value.trim(),
			password: loginPassword.value,
			remember: rememberMe.value
		});
		authSuccess.value = "Signed in.";
		loginPassword.value = "";
	} catch (error) {
		authError.value = "Unable to sign in. Check your credentials and try again.";
		console.error(error);
	} finally {
		busy.value = false;
	}
}

async function handleRegister() {
	authError.value = "";
	authSuccess.value = "";
	if (!acceptedTerms.value) {
		authError.value = "You must agree to the Terms of Service before creating an account.";
		return;
	}
	if (captchaRequired.value && !registerCaptcha.value) {
		authError.value = "Please complete the captcha.";
		return;
	}
	busy.value = true;
	try {
		await register({
			name: registerName.value.trim(),
			email: registerEmail.value.trim(),
			password: registerPassword.value,
			captchaToken: registerCaptcha.value,
			acceptTerms: acceptedTerms.value
		});
		authSuccess.value = "Account created. You are now signed in.";
		registerPassword.value = "";
		acceptedTerms.value = false;
	} catch (error) {
		authError.value = "Unable to create an account. Please try again.";
		console.error(error);
	} finally {
		busy.value = false;
	}
}

async function handleLogout() {
	accountMessage.value = "";
	accountError.value = "";
	busy.value = true;
	try {
		await logout();
		accountMessage.value = "Signed out.";
	} catch (error) {
		accountError.value = "Unable to sign out right now.";
		console.error(error);
	} finally {
		busy.value = false;
	}
}

async function handleChangeEmail() {
	if (!accountId.value) return;
	accountMessage.value = "";
	accountError.value = "";
	busy.value = true;
	try {
		await changeEmail({ id: accountId.value, email: emailUpdate.value.trim() });
		accountMessage.value = "Email updated.";
		emailUpdate.value = "";
	} catch (error) {
		accountError.value = "Unable to update email right now.";
		console.error(error);
	} finally {
		busy.value = false;
	}
}

async function handleChangePassword() {
	if (!accountId.value) return;
	accountMessage.value = "";
	accountError.value = "";
	busy.value = true;
	try {
		await changePassword({
			id: accountId.value,
			currentPassword: currentPassword.value,
			newPassword: newPassword.value
		});
		accountMessage.value = "Password updated.";
		currentPassword.value = "";
		newPassword.value = "";
	} catch (error) {
		accountError.value = "Unable to update password right now.";
		console.error(error);
	} finally {
		busy.value = false;
	}
}
</script>

<template>
	<section class="auth-panel">
		<header class="auth-panel__header">
			<div>
				<h2>{{ props.title }}</h2>
				<p v-if="props.hint">{{ props.hint }}</p>
			</div>
		</header>

		<div v-if="!ready" class="muted">Checking your session...</div>

		<div v-else-if="isLoggedIn" class="account-state">
			<div class="account-state__summary">
				<div>
					<p class="account-state__name">{{ accountName }}</p>
					<p class="muted">{{ currentAccount?.email }} · {{ accountRole }}</p>
				</div>
				<button class="button button--ghost" type="button" :disabled="busy" @click="handleLogout">
					Sign out
				</button>
			</div>

			<details class="account-details">
				<summary>Account settings</summary>
				<div class="account-details__body">
					<form class="account-form" @submit.prevent="handleChangeEmail">
						<label class="field-label" for="email-update">Update email</label>
						<input id="email-update" v-model="emailUpdate" type="email" placeholder="you@email.com" />
						<button class="button button--primary" type="submit" :disabled="busy || !emailUpdate">
							Save email
						</button>
					</form>

					<form class="account-form" @submit.prevent="handleChangePassword">
						<label class="field-label" for="current-password">Current password</label>
						<input
							id="current-password"
							v-model="currentPassword"
							type="password"
							autocomplete="current-password"
						/>
						<label class="field-label" for="new-password">New password</label>
						<input id="new-password" v-model="newPassword" type="password" autocomplete="new-password" />
						<button class="button button--primary" type="submit" :disabled="busy || !newPassword">
							Update password
						</button>
					</form>
				</div>
			</details>

			<p v-if="accountMessage" class="success">{{ accountMessage }}</p>
			<p v-if="accountError" class="error">{{ accountError }}</p>
		</div>

		<div v-else class="auth-state">
			<div class="auth-tabs">
				<button class="tab" :class="{ active: mode === 'login' }" type="button" @click="mode = 'login'">
					Log in
				</button>
				<button class="tab" :class="{ active: mode === 'register' }" type="button" @click="mode = 'register'">
					Create account
				</button>
			</div>

			<form v-if="mode === 'login'" class="auth-form" @submit.prevent="handleLogin">
				<label class="field-label" for="login-email">Email</label>
				<input id="login-email" v-model="loginEmail" type="email" autocomplete="email" />
				<label class="field-label" for="login-password">Password</label>
				<input id="login-password" v-model="loginPassword" type="password" autocomplete="current-password" />
				<label class="checkbox">
					<input v-model="rememberMe" type="checkbox" />
					<span>Remember me</span>
				</label>
				<button class="button button--primary" type="submit" :disabled="busy">Log in</button>
			</form>

			<form v-else class="auth-form" @submit.prevent="handleRegister">
				<label class="field-label" for="register-name">Name</label>
				<input id="register-name" v-model="registerName" type="text" autocomplete="name" />
				<label class="field-label" for="register-email">Email</label>
				<input id="register-email" v-model="registerEmail" type="email" autocomplete="email" />
				<label class="field-label" for="register-password">Password</label>
				<input id="register-password" v-model="registerPassword" type="password" autocomplete="new-password" />
				<CaptchaWidget v-model="registerCaptcha" />
				<label class="checkbox checkbox--legal">
					<input v-model="acceptedTerms" type="checkbox" />
					<span>
						I confirm I am at least 13 and agree to the
						<NuxtLink to="/terms">Terms of Service</NuxtLink>.
					</span>
				</label>
				<p class="muted">
					Read the <NuxtLink to="/privacy">Privacy Policy</NuxtLink> to learn how account data, secure
					sessions, captcha checks, and public posting work on this site.
				</p>
				<button class="button button--primary" type="submit" :disabled="busy">Create account</button>
				<p class="muted">Admin accounts are managed separately.</p>
			</form>

			<p v-if="authSuccess" class="success">{{ authSuccess }}</p>
			<p v-if="authError" class="error">{{ authError }}</p>
		</div>
	</section>
</template>

<style scoped>
.auth-panel,
.account-state__summary,
.account-details,
.tab {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 20px;
}

.auth-panel {
	padding: 20px;
	display: grid;
	gap: 16px;
}

.auth-panel__header h2,
.account-state__name {
	margin: 0;
	font-family: "Fraunces", serif;
}

.auth-panel__header p,
.muted,
.checkbox,
.error,
.success {
	margin: 0;
	color: var(--consensus-muted);
	line-height: 1.6;
}

.account-state,
.auth-state,
.auth-form,
.account-details__body,
.account-form {
	display: grid;
	gap: 14px;
}

.account-state__summary {
	padding: 16px 18px;
	display: flex;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
	align-items: start;
}

.account-state__name {
	font-size: 1.1rem;
}

.account-details {
	padding: 16px 18px;
}

.account-details summary {
	cursor: pointer;
	font-weight: 600;
}

.account-details__body {
	margin-top: 14px;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.auth-tabs {
	display: flex;
	gap: 8px;
	flex-wrap: wrap;
}

.tab {
	padding: 10px 16px;
	cursor: pointer;
	font-weight: 600;
}

.tab.active {
	background: var(--consensus-soft-accent);
	border-color: rgba(211, 107, 56, 0.3);
}

.field-label {
	font-size: 0.82rem;
	font-weight: 600;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--consensus-muted);
}

input {
	padding: 12px 14px;
	border-radius: 14px;
	border: 1px solid var(--consensus-line);
	background: var(--consensus-field-surface);
}

.checkbox {
	display: flex;
	gap: 8px;
	align-items: center;
}

.checkbox--legal {
	align-items: start;
}

.checkbox--legal a {
	color: var(--consensus-link);
}

.muted a {
	color: var(--consensus-link);
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 18px;
	border-radius: 999px;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
	cursor: pointer;
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.button--ghost {
	background: transparent;
}

.error {
	color: #b83d2e;
	font-weight: 600;
}

.success {
	color: #2f6b4e;
	font-weight: 600;
}
</style>
