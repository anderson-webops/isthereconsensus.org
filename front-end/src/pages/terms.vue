<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	{
		title: "Educational service",
		body: "This site is an educational service, not a medical, legal, or other professional service."
	},
	{
		title: "Public submissions",
		body: "Public questions and related community content can be visible to other users and search engines."
	},
	{
		title: "Minimum age",
		body: "You must be at least 13 to create an account or submit community content."
	},
	{
		title: "Moderation authority",
		body: "We can route, merge, hide, archive, or remove content to keep the site usable and accurate."
	}
];

const acceptableUse = [
	"post unlawful, harassing, hateful, defamatory, sexually explicit, or abusive material",
	"post sensitive personal information about yourself or others that does not belong on a public educational site",
	"impersonate a person, institution, or qualification you do not actually hold",
	"submit misleading expert credentials, fake citations, or fabricated evidence",
	"interfere with moderation, review queues, rate limits, or anti-abuse controls",
	"scrape, crawl, or automate access in a way that burdens the site or bypasses ordinary access controls",
	"upload malware, attack the site, probe for vulnerabilities, or attempt unauthorized access",
	"use the site to promote scams, spam, coordinated manipulation, or mass misinformation campaigns"
];

const contentRules = [
	"Community questions are meant to surface confusion, sources, and follow-up issues. They are not a voting system for deciding what the evidence says.",
	"If you post content, you should keep it focused, lawful, and supported where possible. We may edit routing metadata, merge duplicates, or move content to the right claim or topic page.",
	"Do not post medical records, financial account details, passwords, government identifiers, or other information that creates an avoidable privacy or safety risk."
];

const licensePoints = [
	"You keep ownership of content you submit.",
	"You give us a non-exclusive, worldwide, royalty-free license to host, store, reproduce, format, adapt for display, moderate, index, back up, and show that content as needed to operate, improve, and protect the site.",
	"This license continues for any copies reasonably retained for backups, moderation records, legal compliance, or abuse-prevention purposes."
];

const editorialPoints = [
	"Claim reviews, explainer pages, standards pages, and related editorial material reflect the site’s good-faith attempt to summarize the state of evidence at the time of review.",
	"Science changes. Claim pages may be corrected, updated, narrowed, expanded, merged, or archived as evidence and guidance change.",
	"Nothing on the site creates a clinician-patient, attorney-client, fiduciary, or other professional relationship."
];

const expertPoints = [
	"Expert applications and editorial privileges are discretionary. Applying does not guarantee approval, publication rights, or any ongoing status.",
	"We may approve, decline, pause, or revoke expert/editorial access at any time to protect quality, safety, or site operations."
];

useStaticPageMeta({
	description:
		"Read the terms for public browsing, accounts, question submissions, expert applications, editorial tools, and acceptable use.",
	path: "/terms",
	title: "Terms of Service - Is There Consensus?"
});
</script>

<template>
	<div class="terms-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Terms of Service' }]" />

		<header class="terms-header">
			<p class="eyebrow">Terms of Service</p>
			<h1>Ground rules for using isthereconsensus.org.</h1>
			<p>
				Effective April 11, 2026. These terms govern your use of the public website, member accounts, question
				submissions, expert applications, and editorial tools made available through isthereconsensus.org.
			</p>
		</header>

		<section class="terms-summary">
			<article v-for="item in quickPoints" :key="item.title" class="summary-card">
				<h3>{{ item.title }}</h3>
				<p>{{ item.body }}</p>
			</article>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>1. Acceptance and scope</h2>
			</div>
			<div class="prose">
				<p>
					By accessing or using isthereconsensus.org, creating an account, posting a question, applying for an
					expert role, or using any editorial/admin feature made available to you, you agree to these Terms of
					Service.
				</p>
				<p>
					If you do not agree to these terms, do not create an account, submit content, or use the site beyond
					casual public browsing.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>2. Who may use the site</h2>
			</div>
			<div class="prose">
				<p>
					The public pages are intended for a general audience. To create an account, submit community
					content, or apply for expert review access, you must be at least 13 years old and able to agree to
					these terms.
				</p>
				<p>
					If you are using the site on behalf of an organization, you represent that you are authorized to
					bind that organization to these terms.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>3. Accounts and account security</h2>
			</div>
			<div class="prose">
				<p>
					You are responsible for the accuracy of the account information you provide and for keeping your
					login credentials confidential. You are responsible for activity that occurs through your account
					unless the activity was caused by our own security failure.
				</p>
				<p>
					You may not share your credentials, create accounts through deceptive means, or use another person’s
					account without permission. We may require captcha, rate limiting, or additional verification to
					protect the service.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>4. Public content and community submissions</h2>
			</div>
			<ul class="plain-list">
				<li v-for="item in contentRules" :key="item">{{ item }}</li>
			</ul>
			<div class="prose">
				<p>
					Community submissions may be publicly visible and may be indexed by search engines or cached by
					other services outside our control. Think carefully before posting anything that you would not want
					to appear in a public context.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>5. Your content and the license you give us</h2>
			</div>
			<ul class="plain-list">
				<li v-for="item in licensePoints" :key="item">{{ item }}</li>
			</ul>
			<div class="prose">
				<p>
					You represent that you have the rights needed to submit the material you post and that posting it
					does not violate another person’s rights, confidentiality obligations, or the law.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>6. Acceptable use</h2>
			</div>
			<div class="prose">
				<p>You may not:</p>
			</div>
			<ul class="plain-list">
				<li v-for="item in acceptableUse" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>7. Moderation, routing, and enforcement</h2>
			</div>
			<div class="prose">
				<p>
					We may review, flag, route, merge, hide, archive, or remove content to enforce these terms, protect
					other users, keep claim pages coherent, reduce duplication, or preserve the integrity of the site’s
					editorial workflow.
				</p>
				<p>
					The public-facing conduct rules and moderation model are described in the
					<NuxtLink to="/community-guidelines">Community Guidelines</NuxtLink> and
					<NuxtLink to="/moderation-and-appeals">Moderation and Appeals</NuxtLink> pages.
				</p>
				<p>
					We may suspend or terminate accounts or editorial access if we believe a user has violated these
					terms, created legal risk, attempted to manipulate the site, or interfered with normal operations.
				</p>
				<p>
					We may preserve moderation records, abuse-prevention records, and related operational logs as
					reasonably necessary for safety, integrity, legal compliance, and dispute handling.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>8. Expert applications and editorial access</h2>
			</div>
			<ul class="plain-list">
				<li v-for="item in expertPoints" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>9. Editorial content and no professional advice</h2>
			</div>
			<ul class="plain-list">
				<li v-for="item in editorialPoints" :key="item">{{ item }}</li>
			</ul>
			<div class="prose">
				<p>
					The site discusses health, medicine, nutrition, psychology, climate, and other consequential topics.
					That does not make the site a substitute for a licensed professional who knows your circumstances.
				</p>
				<p>
					The public corrections path, including how factual changes are labeled and surfaced, is described in
					the <NuxtLink to="/corrections">Corrections Policy</NuxtLink>.
				</p>
				<p>
					If you believe you are experiencing a medical or mental health emergency, do not rely on the site.
					Contact an appropriate clinician or emergency service.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>10. Intellectual property and copyright concerns</h2>
			</div>
			<div class="prose">
				<p>
					The site’s original text, layout, brand elements, and editorial compilations are protected by
					intellectual property laws. You may not copy substantial portions of the site or republish site
					materials in a way that exceeds fair use or any permission we give in writing.
				</p>
				<p>
					Third-party articles, paper abstracts, logos, and linked materials remain the property of their
					respective owners. If you believe content on the site infringes your copyright or other rights,
					email
					<a href="mailto:consensus@isthereconsensus.org">consensus@isthereconsensus.org</a> with enough
					detail for us to review the issue. The current complaint workflow is described on the
					<NuxtLink to="/copyright-and-trademark">Copyright and trademark complaints</NuxtLink> page.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>11. Third-party services and links</h2>
			</div>
			<div class="prose">
				<p>
					The site may rely on third-party services for analytics, email delivery, bot protection, hosting,
					security, and outbound links. Those services operate under their own terms and policies, and we are
					not responsible for third-party sites or services that we do not control.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>12. Disclaimers</h2>
			</div>
			<div class="prose">
				<p>
					To the fullest extent permitted by law, the site is provided on an “as is” and “as available” basis.
					We do not guarantee uninterrupted availability, perfect accuracy, or that the site will always be
					free of errors, omissions, or outdated material.
				</p>
				<p>
					We do not guarantee that community content is accurate, lawful, or useful. Community content
					reflects the views of the people who submitted it, not necessarily the views of the site.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>13. Limitation of liability</h2>
			</div>
			<div class="prose">
				<p>
					To the fullest extent permitted by law, isthereconsensus.org and its operators will not be liable
					for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of
					data, goodwill, profits, or business opportunities arising from or related to your use of the site.
				</p>
				<p>
					Where the law does not allow a full exclusion of liability, liability is limited to the narrowest
					extent the law permits.
				</p>
			</div>
		</section>

		<section class="terms-panel">
			<div class="section-heading section-heading--tight">
				<h2>14. Changes to these terms</h2>
			</div>
			<div class="prose">
				<p>
					We may update these terms as the product, law, or operational model changes. The current version
					will be posted on this page with an updated effective date. Continued use of the site after a
					material update means you accept the revised terms.
				</p>
			</div>
		</section>

		<section class="terms-callout">
			<div>
				<p class="eyebrow">Questions</p>
				<h2>Contact the site operator</h2>
				<p>
					For terms, copyright, or policy questions, email
					<a href="mailto:consensus@isthereconsensus.org">consensus@isthereconsensus.org</a>.
				</p>
			</div>
			<div class="terms-callout__actions">
				<NuxtLink class="button button--ghost" to="/copyright-and-trademark">Copyright and trademark</NuxtLink>
				<NuxtLink class="button button--ghost" to="/standards">How reviews work</NuxtLink>
				<NuxtLink class="button button--ghost" to="/community-guidelines">Community guidelines</NuxtLink>
				<NuxtLink class="button button--ghost" to="/privacy">Privacy policy</NuxtLink>
				<NuxtLink class="button button--primary" to="/account">Account</NuxtLink>
			</div>
		</section>
	</div>
</template>

<style scoped>
.terms-page {
	display: grid;
	gap: 24px;
}

.terms-header,
.terms-panel,
.summary-card,
.terms-callout {
	background: var(--consensus-surface);
	border: 1px solid var(--consensus-soft-line);
	border-radius: 22px;
}

.terms-header,
.terms-panel,
.terms-callout {
	padding: 22px;
}

.terms-header h1,
.section-heading h2,
.summary-card h3,
.terms-callout h2 {
	margin: 0;
	font-family: "Fraunces", serif;
}

.terms-header h1 {
	margin-top: 8px;
	font-size: clamp(2.4rem, 5vw, 4rem);
	line-height: 1;
}

.terms-header p,
.section-heading p,
.summary-card p,
.plain-list,
.prose p,
.terms-callout p {
	color: var(--consensus-muted);
	line-height: 1.7;
}

.terms-header p,
.terms-callout > div {
	max-width: 68ch;
}

.section-heading p {
	max-width: 56ch;
}

.terms-summary {
	display: grid;
	gap: 14px;
	align-items: start;
	grid-template-columns: repeat(2, minmax(0, 1fr));
}

.summary-card {
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
.section-heading h2 {
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

.terms-callout {
	display: flex;
	justify-content: space-between;
	gap: 20px;
	flex-wrap: wrap;
	align-items: end;
}

.terms-callout > div {
	flex: 1 1 340px;
}

.terms-callout__actions {
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
.terms-callout a {
	color: var(--consensus-link);
}

.terms-callout a.button--primary {
	color: var(--consensus-on-accent);
}

@media (max-width: 720px) {
	.terms-header,
	.terms-panel,
	.terms-callout {
		padding: 18px;
	}

	.terms-callout {
		align-items: stretch;
	}

	.terms-callout__actions {
		width: 100%;
	}
}

@media (max-width: 820px) {
	.terms-summary {
		grid-template-columns: 1fr;
	}
}
</style>
