<script setup lang="ts">
import CaptchaWidget from "~/components/CaptchaWidget.vue";

const props = withDefaults(
	defineProps<{
		title?: string;
		hint?: string;
	}>(),
	{
		title: "Sign in to post",
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
			captchaToken: registerCaptcha.value
		});
		authSuccess.value = "Account created. You're signed in.";
		registerPassword.value = "";
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
			<h3>{{ props.title }}</h3>
			<p v-if="props.hint">{{ props.hint }}</p>
		</header>

		<div v-if="!ready" class="muted">Checking your session…</div>

		<div v-else-if="isLoggedIn" class="auth-panel__account">
			<div class="account-summary">
				<div>
					<p class="account-name">{{ accountName }}</p>
					<p class="muted">{{ accountRole }}</p>
				</div>
				<button class="cta ghost" type="button" :disabled="busy" @click="handleLogout">Sign out</button>
			</div>

			<div class="account-forms">
				<form class="account-form" @submit.prevent="handleChangeEmail">
					<label class="field-label" for="email-update">Update email</label>
					<input id="email-update" v-model="emailUpdate" type="email" placeholder="you@email.com" />
					<button class="cta primary" type="submit" :disabled="busy || !emailUpdate">Save email</button>
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
					<button class="cta primary" type="submit" :disabled="busy || !newPassword">Update password</button>
				</form>
			</div>

			<p v-if="accountMessage" class="success">{{ accountMessage }}</p>
			<p v-if="accountError" class="error">{{ accountError }}</p>
		</div>

		<div v-else class="auth-panel__auth">
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
				<button class="cta primary" type="submit" :disabled="busy">Log in</button>
			</form>

			<form v-else class="auth-form" @submit.prevent="handleRegister">
				<label class="field-label" for="register-name">Name</label>
				<input id="register-name" v-model="registerName" type="text" autocomplete="name" />
				<label class="field-label" for="register-email">Email</label>
				<input id="register-email" v-model="registerEmail" type="email" autocomplete="email" />
				<label class="field-label" for="register-password">Password</label>
				<input id="register-password" v-model="registerPassword" type="password" autocomplete="new-password" />
				<CaptchaWidget v-model="registerCaptcha" />
				<button class="cta primary" type="submit" :disabled="busy">Create account</button>
				<p class="muted">Admins are invited separately. Use your admin email to sign in.</p>
			</form>

			<p v-if="authSuccess" class="success">{{ authSuccess }}</p>
			<p v-if="authError" class="error">{{ authError }}</p>
		</div>
	</section>
</template>

<style scoped>
.auth-panel {
	background: #fff;
	border-radius: 18px;
	padding: 20px;
	border: 1px solid rgba(21, 17, 13, 0.08);
	box-shadow: 0 16px 32px rgba(21, 17, 13, 0.08);
	display: grid;
	gap: 16px;
}

.auth-panel__header h3 {
	margin: 0;
	font-family: "Fraunces", serif;
	font-size: 1.2rem;
}

.auth-panel__header p {
	margin: 6px 0 0;
	color: var(--consensus-muted);
}

.auth-tabs {
	display: flex;
	gap: 8px;
}

.tab {
	border-radius: 999px;
	border: 1px solid rgba(21, 17, 13, 0.2);
	padding: 8px 16px;
	background: transparent;
	cursor: pointer;
	font-family: inherit;
	font-weight: 600;
}

.tab.active {
	border-color: var(--consensus-ember);
	color: var(--consensus-ink);
	box-shadow: 0 8px 16px rgba(211, 107, 56, 0.2);
}

.auth-form,
.account-form {
	display: grid;
	gap: 10px;
}

.field-label {
	text-transform: uppercase;
	letter-spacing: 0.12em;
	font-size: 0.7rem;
	color: var(--consensus-muted);
}

input[type="text"],
input[type="email"],
input[type="password"] {
	border-radius: 12px;
	border: 1px solid rgba(21, 17, 13, 0.12);
	padding: 10px 12px;
	font-family: inherit;
}

.checkbox {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 0.9rem;
	color: var(--consensus-muted);
}

.cta {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	border-radius: 999px;
	padding: 10px 20px;
	border: none;
	font-size: 0.9rem;
	font-weight: 600;
	cursor: pointer;
	font-family: inherit;
	text-decoration: none;
	width: fit-content;
}

.cta.primary {
	background: var(--consensus-ember);
	color: #fff;
	box-shadow: 0 12px 30px rgba(211, 107, 56, 0.25);
}

.cta.ghost {
	background: transparent;
	border: 1px solid rgba(21, 17, 13, 0.2);
	color: var(--consensus-ink);
}

.account-summary {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 16px;
}

.account-name {
	font-weight: 700;
	margin: 0;
}

.account-forms {
	display: grid;
	gap: 16px;
	margin-top: 8px;
}

.muted {
	color: var(--consensus-muted);
	font-size: 0.9rem;
}

.success {
	color: #2f6b4e;
	font-weight: 600;
}

.error {
	color: #b83d2e;
	font-weight: 600;
}
</style>
