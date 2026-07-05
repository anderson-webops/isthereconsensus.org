<script setup lang="ts">
import PageBreadcrumbs from "~/components/PageBreadcrumbs.vue";

const quickPoints = [
	{
		title: "Manual request path",
		body: "There is no self-serve deletion portal yet; account closure and deletion requests go to the site operator."
	},
	{
		title: "Public content differs",
		body: "Public questions and threads can be removed, disassociated, or retained when integrity requires it."
	},
	{
		title: "Records may remain",
		body: "Moderation, security, abuse-prevention, and backup records may remain after account closure when necessary."
	},
	{
		title: "External caches",
		body: "Search-engine copies and third-party caches may outlast removal from the live site."
	}
];

const retentionMatrix = [
	{
		title: "Account profile and login data",
		body: "The site deletes or disables access and removes routine profile data unless security, legal, or abuse-prevention records need to remain."
	},
	{
		title: "Public questions and community content",
		body: "Public contributions may be removed, disassociated, or retained in reduced form to preserve thread continuity or moderation records."
	},
	{
		title: "Moderation and safety records",
		body: "Flags, enforcement history, appeal logs, and abuse-prevention records may remain longer to support integrity and repeat-abuse handling."
	},
	{
		title: "Backups and operational logs",
		body: "Deleted or modified records can persist in backups and system logs for a limited operational period before normal rotation removes them."
	}
];

const requestSteps = [
	"email from the account address or provide enough information to verify ownership",
	"state whether you want account closure, public-content deletion, or both",
	"identify question URLs or text you want reviewed for removal, redaction, or disassociation",
	"allow time for identity checks and review of safety, fraud, or legal retention exceptions"
];

const expectationNotes = [
	"Account deletion cannot remove search snippets, archived pages, or third-party copies outside the site’s control.",
	"If public contributions remain visible, the site may reduce attribution when integrity and moderation needs allow it.",
	"Deletion and erasure rights may be limited by legal, fraud-prevention, security, and recordkeeping exceptions."
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
			<p>Use this request-based process for account closure, public-content handling, and retained records.</p>
		</header>

		<section class="policy-summary">
			<article v-for="item in quickPoints" :key="item.title" class="policy-summary-card">
				<h2>{{ item.title }}</h2>
				<p>{{ item.body }}</p>
			</article>
		</section>

		<section class="policy-panel">
			<div class="policy-section-heading policy-section-heading--tight">
				<h2>What happens to different data types</h2>
				<p>Account deletion affects each record type differently.</p>
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
				<p>The workflow is manual, so precise requests are easier to review correctly.</p>
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
				<p>Know what account deletion can and cannot reach before you submit a request.</p>
			</div>
			<ul class="policy-list">
				<li v-for="item in expectationNotes" :key="item">{{ item }}</li>
			</ul>
		</section>

		<section class="policy-callout">
			<div>
				<p class="eyebrow">Related rights pages</p>
				<h2>Privacy maps data; account closure covers retained records.</h2>
				<p>
					The Privacy Policy explains collection and legal request channels. Account-closure guidance explains
					what can happen to public contributions and retained records.
				</p>
			</div>
			<div class="policy-callout__actions">
				<NuxtLink class="button button--primary" to="/privacy">Privacy policy</NuxtLink>
				<NuxtLink class="button button--ghost" to="/account">Account workspace</NuxtLink>
			</div>
		</section>
	</div>
</template>
