<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	"There is not currently a self-serve account deletion portal, so account closure and deletion requests are submitted to the site operator.",
	"Public questions and threads are different from private account data: some public content may be removed, some may be disassociated, and some records may be retained for integrity reasons.",
	"Moderation, security, abuse-prevention, and backup records may persist beyond account closure when reasonably necessary.",
	"Search-engine copies and third-party caches may outlast removal from the live site."
];

const retentionMatrix = [
	{
		title: "Account profile and login data",
		body: "The site deletes or disables direct account access and removes routine profile data unless specific records must be kept for security, legal, or abuse-prevention reasons."
	},
	{
		title: "Public questions and community content",
		body: "Public contributions may be removed, left visible but disassociated from the account, or retained in a reduced form when doing so is necessary to preserve thread continuity or moderation records."
	},
	{
		title: "Moderation and safety records",
		body: "Flags, enforcement history, appeal logs, and abuse-prevention records may be retained longer than ordinary account data because they support community integrity and repeat-abuse handling."
	},
	{
		title: "Backups and operational logs",
		body: "Deleted or modified records can persist in backups and system logs for a limited operational period before normal rotation removes them."
	}
];

const requestSteps = [
	"email the site operator from the address associated with the account or provide enough information to verify ownership",
	"state whether you are requesting account closure, deletion of specific public contributions, or both",
	"identify any public question URLs or text you want reviewed for removal, redaction, or disassociation",
	"allow time for identity verification and for the site to check what records must be retained under safety, fraud, or legal exceptions"
];

const expectationNotes = [
	"Deleting an account does not guarantee removal of search-engine snippets, archived pages, or other third-party copies outside the site’s control.",
	"If public contributions remain visible, the site may reduce attribution when that is compatible with integrity and moderation needs.",
	"Deletion and erasure rights can be limited by legal, fraud-prevention, security, and recordkeeping exceptions."
];

useStaticPageMeta({
	description:
		"Learn how to request account deletion, what public content can be removed, and which operational records may be retained.",
	path: "/account-deletion-and-retention",
	title: "Account deletion and retention - Is There Consensus?"
});
</script>

<template>
	<div class="policy-page">
		<PageBreadcrumbs :items="[{ label: 'Home', to: '/' }, { label: 'Account deletion and retention' }]" />

		<header class="policy-header">
			<p class="eyebrow">Account deletion and retention</p>
			<h1>Account deletion and retained records.</h1>
			<p>
				This page explains the site’s current request-based approach to account closure, public-content
				handling, and retained operational records.
			</p>
		</header>

		<section class="policy-summary">
			<article v-for="item in quickPoints" :key="item" class="policy-summary-card">
				<p>{{ item }}</p>
			</article>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>What happens to different data types</h2>
				<p>Account deletion is not one uniform action across every record type.</p>
			</div>
			<div class="policy-card-grid">
				<article v-for="item in retentionMatrix" :key="item.title" class="policy-detail-card">
					<h3>{{ item.title }}</h3>
					<p>{{ item.body }}</p>
				</article>
			</div>
		</section>

		<section class="policy-panel policy-panel--soft">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>How to make a request</h2>
				<p>The current workflow is manual, so precise requests are easier to honor correctly.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in requestSteps" :key="item">{{ item }}</li>
			</ul>
			<div class="policy-prose">
				<p>
					Send requests to
					<a href="mailto:consensus@isthereconsensus.org">consensus@isthereconsensus.org</a> with the subject
					line <strong>Account deletion request</strong>.
				</p>
			</div>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>Important limitations</h2>
				<p>This page is meant to prevent false expectations, not to bury them.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in expectationNotes" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Related rights pages</p>
				<h2>Use Privacy for the data map and this page for the product behavior.</h2>
				<p>
					The Privacy Policy explains collection and legal request channels. This page explains the practical
					effect of account closure on public contributions and retained records.
				</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/privacy">Privacy policy</NuxtLink>
				<NuxtLink class="button button--ghost" to="/account">Account workspace</NuxtLink>
			</div>
		</section>
	</div>
</template>
