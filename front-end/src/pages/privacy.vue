<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	{
		title: "Account data",
		body: "Includes your name, email, password hash, session state, and any updates you make to that account."
	},
	{
		title: "Public posts",
		body: "Questions you post on the public site can be visible to other users and search engines."
	},
	{
		title: "Analytics and abuse prevention",
		body: "When enabled, the site uses bot protection and production analytics services hosted at analytics.isthereconsensus.org and analytics.jacobdanderson.net to keep the service usable and understand how it is used."
	},
	{
		title: "Privacy requests",
		body: "There is not currently a self-serve account deletion tool. Privacy requests can be sent to consensus@isthereconsensus.org."
	}
];

const collectionCategories = [
	{
		title: "Information you give us",
		items: [
			"account details such as your name, email address, password, and any later account updates",
			"public question content, including titles, body text, source links, display names, and related metadata",
			"expert application materials such as affiliation, credentials, expertise areas, evidence links, and statements",
			"moderation reports and notes you submit about public questions",
			"emails or other direct messages you send to the site operator"
		]
	},
	{
		title: "Information collected automatically",
		items: [
			"session and authentication data needed to keep you signed in",
			"basic server and security logs such as IP address, browser headers, timestamps, and request paths",
			"analytics and usage data on deployed versions of the site, including page usage and technical request metadata",
			"theme or interface preferences stored in your browser",
			"captcha and anti-abuse signals when Turnstile or similar protections are enabled"
		]
	},
	{
		title: "Information generated as the site operates",
		items: [
			"question routing, flag review, moderation, and audit records",
			"trust or expertise status connected to your account",
			"editorial and admin records needed to review claims, applications, and safety issues"
		]
	}
];

const useCases = [
	"create and maintain accounts, sign users in, and keep sessions secure",
	"publish, route, moderate, and, when necessary, remove community questions and related reports",
	"review expert applications and manage editorial roles",
	"measure site usage, diagnose issues, and improve the public reading experience",
	"prevent spam, bot abuse, scraping, credential misuse, and other attacks",
	"comply with legal obligations and respond to safety, security, or rights-related requests"
];

const sharingCategories = [
	"service providers that host, secure, monitor, or help operate the site",
	"the analytics services loaded from analytics.isthereconsensus.org and analytics.jacobdanderson.net on deployed versions of the site",
	"Cloudflare Turnstile and related captcha infrastructure when anti-bot checks are enabled",
	"admins, editors, or moderators who need access to review applications, flags, or operational records",
	"courts, regulators, law enforcement, or other third parties when legally required or reasonably necessary to protect users or the service"
];

const retentionRows = [
	{
		title: "Account records",
		body: "We generally keep account information for as long as the account remains active, and for a reasonable period afterward when needed for security, fraud prevention, or legal compliance."
	},
	{
		title: "Session and preference data",
		body: "Standard session cookies are short-lived. If you choose “remember me,” the session may last longer, currently up to about 30 days. Browser-side preference storage may remain until you clear it."
	},
	{
		title: "Public questions and thread records",
		body: "Questions remain on the site until they are deleted by the author or an admin, or otherwise removed through moderation or operational cleanup. Backups, logs, or external caches may persist for longer."
	},
	{
		title: "Moderation, expert review, and security records",
		body: "These records may be retained longer than public content when needed to preserve site integrity, resolve disputes, investigate abuse, or comply with law."
	},
	{
		title: "Analytics and technical logs",
		body: "Usage data and logs are retained according to configured service-provider settings and our operational needs."
	}
];

const rightsPoints = [
	"You can update your account email and password from the account page while signed in.",
	"You can delete your own questions from the public thread interface while signed in, subject to ordinary product limits and admin controls.",
	"If you want help with access, correction, closure, or deletion requests, email consensus@isthereconsensus.org.",
	"Depending on where you live, you may have additional privacy rights under applicable law. We may need to verify your identity before acting on a request."
];

useStaticPageMeta({
	description:
		"Review what personal information the site collects, how it is used, when it may be shared, and how privacy requests are handled.",
	path: "/privacy",
	title: "Privacy Policy - Is There Consensus?"
});
</script>

<template>
	<div class="privacy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]" />

		<header class="privacy-header">
			<p class="eyebrow">Privacy Policy</p>
			<h1>How we handle personal information.</h1>
			<p>
				Effective April 11, 2026. This policy explains what information the site collects, how that information
				is used, when it may be disclosed, and what practical choices users currently have.
			</p>
		</header>

		<section class="privacy-summary">
			<article v-for="item in quickPoints" :key="item.title" class="summary-card">
				<h3>{{ item.title }}</h3>
				<p>{{ item.body }}</p>
			</article>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>1. Scope</h2>
			</div>
			<div class="prose">
				<p>
					This policy applies to the public website, member accounts, community question features, expert
					application workflow, editorial/admin tools, and related operational services used to run
					isthereconsensus.org.
				</p>
				<p>
					The site discusses health, medicine, psychology, climate, and other consequential subjects.
					Browsing, searching, or posting about those topics can reveal sensitive interests, so use care when
					deciding what to post publicly.
				</p>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>2. Information we collect</h2>
			</div>
			<div class="category-grid">
				<article v-for="group in collectionCategories" :key="group.title" class="category-card">
					<h3>{{ group.title }}</h3>
					<ul class="plain-list plain-list--tight">
						<li v-for="item in group.items" :key="item">{{ item }}</li>
					</ul>
				</article>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>3. How we use information</h2>
			</div>
			<ul class="plain-list">
				<li v-for="item in useCases" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>4. Cookies, browser storage, analytics, and captcha</h2>
			</div>
			<div class="prose">
				<p>
					The site uses secure session cookies to keep signed-in users authenticated. If you choose “remember
					me,” the session can last longer than the default session window.
				</p>
				<p>
					The site may also store interface preferences, such as color theme choice, in your browser so the
					interface behaves consistently the next time you return.
				</p>
				<p>
					On deployed versions of the site, we currently load analytics scripts from
					<code>analytics.isthereconsensus.org</code> and <code>analytics.jacobdanderson.net</code> to
					understand site usage and performance. When your browser loads those scripts, the analytics services
					may receive technical request information such as IP address, browser metadata, referring page, and
					page usage details.
				</p>
				<p>
					When captcha protection is enabled, the site loads Cloudflare Turnstile in the browser and validates
					captcha responses server-side. That process can involve IP address and standard browser/device
					signals used for anti-abuse purposes.
				</p>
				<p>
					The site does not currently provide a separate, browser-specific response to “Do Not Track” signals.
					We also do not currently use the site to serve third-party ads.
				</p>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>5. Public content and visibility</h2>
			</div>
			<div class="prose">
				<p>
					Questions posted through the community features are public by design. Titles, body text, source
					URLs, and your displayed author information may be visible to other users and may be indexed by
					search engines.
				</p>
				<p>
					If you contribute publicly as a reviewer, editor, or author on a claim page, the site may display
					your name, role, affiliation, or similar contribution metadata when that is part of the editorial
					workflow.
				</p>
				<p>
					Even if content is later removed from the live site, copies may persist in backups, moderation
					records, or external caches outside our control.
				</p>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>6. When we share or disclose information</h2>
			</div>
			<ul class="plain-list">
				<li v-for="item in sharingCategories" :key="item">{{ item }}</li>
			</ul>
			<div class="prose">
				<p>
					We do not currently use the site to run third-party display advertising. If the product model
					changes, we should update this policy before rolling those changes out.
				</p>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>7. Retention</h2>
			</div>
			<div class="category-grid">
				<article v-for="item in retentionRows" :key="item.title" class="category-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>8. Choices and rights</h2>
			</div>
			<ul class="plain-list">
				<li v-for="item in rightsPoints" :key="item">{{ item }}</li>
			</ul>
			<div class="prose">
				<p>
					There is not currently a self-serve account deletion portal. If you ask to close an account or
					delete data, we may still retain some records, including moderation, security, backup, and
					community-integrity records, where reasonably necessary. The practical handling of public questions,
					disassociated attribution, and retained records is explained on the
					<NuxtLink to="/account-deletion-and-retention">Account deletion and retention</NuxtLink> page.
				</p>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>9. Children</h2>
			</div>
			<div class="prose">
				<p>
					Public pages may be readable by a general audience, but accounts and community submissions are not
					intended for children under 13. If we learn that we have created an account for or collected
					personal information directly from a child under 13 without an appropriate legal basis, we may
					remove the account and related data.
				</p>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>10. Security</h2>
			</div>
			<div class="prose">
				<p>
					We use administrative, technical, and operational measures intended to protect the information we
					maintain, including account authentication controls, secure session handling, moderation controls,
					and anti-abuse tooling. No internet service can guarantee perfect security.
				</p>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>11. International visitors</h2>
			</div>
			<div class="prose">
				<p>
					The site is operated from infrastructure that may be located in the United States and in other
					places where our service providers operate. If you use the site from outside those locations, your
					information may be processed there.
				</p>
			</div>
		</section>

		<section class="privacy-panel">
			<div class="section-heading section-heading--tight">
				<h2>12. Changes to this policy</h2>
			</div>
			<div class="prose">
				<p>
					We may update this policy as the product, infrastructure, or legal requirements change. The current
					version will be posted on this page with an updated effective date.
				</p>
			</div>
		</section>

		<section class="privacy-callout">
			<div>
				<p class="eyebrow">Questions or requests</p>
				<h2>Contact the site operator</h2>
				<p>
					For privacy questions or rights requests, email
					<a href="mailto:consensus@isthereconsensus.org">consensus@isthereconsensus.org</a>.
				</p>
			</div>
			<div class="privacy-callout__actions">
				<NuxtLink class="button button--primary" to="/terms">Terms of service</NuxtLink>
				<NuxtLink class="button button--ghost" to="/account-deletion-and-retention"
					>Account deletion and retention</NuxtLink
				>
				<NuxtLink class="button button--ghost" to="/account">Account</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.privacy-page {
	display: grid;
	gap: 24px;
}

.privacy-header,
.privacy-panel,
.summary-card,
.category-card,
.privacy-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.privacy-header,
.privacy-panel,
.privacy-callout {
	padding: 22px;
}

.privacy-header h1,
.section-heading h2,
.summary-card h3,
.category-card h3,
.privacy-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.privacy-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.privacy-header p,
.section-heading p,
.summary-card p,
.plain-list,
.prose p,
.category-card p,
.privacy-callout p {
	color: var(--consensus-muted);
	line-height: 1.7;
}

.privacy-header p,
.privacy-callout > div {
	max-width: 68ch;
}

.section-heading p {
	max-width: 56ch;
}

.privacy-summary,
.category-grid {
	display: grid;
	gap: 14px;
	grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
}

.privacy-summary {
	align-items: start;
}

.summary-card,
.category-card {
	padding: 18px;
}

.summary-card {
	display: grid;
	gap: 8px;
	align-content: start;
}

.summary-card h3 {
	font-size: 1rem;
	color: var(--consensus-ink);
}

.summary-card p,
.plain-list,
.prose p,
.summary-card h3,
.category-card h3,
.category-card p {
	margin: 0;
}

.section-heading {
	display: grid;
	gap: 6px;
	margin-bottom: 14px;
}

.prose {
	display: grid;
	gap: 12px;
}

.plain-list {
	padding-left: 20px;
	display: grid;
	gap: 10px;
}

.plain-list--tight {
	padding-left: 18px;
	gap: 8px;
}

.privacy-callout {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
	align-items: end;
}

.privacy-callout > div {
	flex: 1 1 340px;
}

.privacy-callout__actions {
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
}

.button {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 12px 20px;
	border-radius: 999px;
	text-decoration: none;
	border: 1px solid var(--consensus-line);
	font-weight: 600;
}

.button--primary {
	background: var(--consensus-ember);
	border-color: var(--consensus-ember);
	color: var(--consensus-on-accent);
}

.button--ghost {
	background: transparent;
	color: var(--consensus-ink);
}

.prose a,
.privacy-callout a {
	color: var(--consensus-link);
}

.privacy-callout a.button--primary {
	color: var(--consensus-on-accent);
}

code {
	padding: 0.08em 0.34em;
	border: 1px solid var(--consensus-soft-line);
	border-radius: 6px;
	background: color-mix(in srgb, var(--consensus-ink) 8%, var(--consensus-surface));
	color: var(--consensus-ink);
	font-family: "JetBrains Mono", monospace;
	font-size: 0.95em;
}

@media (max-width: 720px) {
	.privacy-header,
	.privacy-panel,
	.privacy-callout {
		padding: 18px;
	}

	.privacy-callout {
		align-items: stretch;
	}

	.privacy-callout__actions {
		width: 100%;
	}
}

@media (max-width: 820px) {
	.privacy-summary,
	.category-grid {
		grid-template-columns: 1fr;
	}
}
</style>
