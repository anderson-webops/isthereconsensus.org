export interface PolicySurface {
	title: string;
	to: string;
	summary: string;
	status: "core" | "operational" | "program";
}

export interface PolicyGroup {
	title: string;
	description: string;
	items: PolicySurface[];
}

export const policyGroups: PolicyGroup[] = [
	{
		title: "Core site policies",
		description:
			"The main public rules for using the site, understanding moderation, and handling rights or privacy questions.",
		items: [
			{
				title: "Terms of service",
				to: "/terms",
				summary:
					"Account rules, acceptable use, user-content license, moderation authority, and baseline service disclaimers.",
				status: "core"
			},
			{
				title: "Privacy policy",
				to: "/privacy",
				summary:
					"What personal data the site collects, how it is used, what is public, and how privacy requests should be submitted.",
				status: "core"
			},
			{
				title: "Account deletion and retention",
				to: "/account-deletion-and-retention",
				summary:
					"Explains what happens to accounts, public questions, moderation records, and backups when a user asks to close an account.",
				status: "operational"
			},
			{
				title: "Copyright and trademark complaints",
				to: "/copyright-and-trademark",
				summary:
					"Explains how to report copyright, trademark, impersonation, or other rights concerns and what the site does with those notices.",
				status: "operational"
			}
		]
	},
	{
		title: "How reviewed pages work",
		description:
			"The public trust pages that explain how reviewed answers are built and what disclosure rules apply.",
		items: [
			{
				title: "Conflict and funding disclosure",
				to: "/conflicts-and-funding",
				summary:
					"Defines what counts as a conflict, who must disclose, when recusal is required, and how public disclosure appears on reviewed pages.",
				status: "program"
			},
			{
				title: "Verified expert review program",
				to: "/expert-review-program",
				summary:
					"Explains eligibility, verification, reviewer responsibilities, disagreement handling, and expert removal standards.",
				status: "program"
			},
			{
				title: "How reviews work",
				to: "/standards",
				summary:
					"Explains what a reviewed page shows, how sources are weighted, when pages update, and what community discussion cannot decide.",
				status: "operational"
			}
		]
	},
	{
		title: "Community, corrections, and automation",
		description:
			"How community participation is moderated, how factual changes are handled, and where automation stops.",
		items: [
			{
				title: "Community guidelines",
				to: "/community-guidelines",
				summary: "Rules for public discussion, flagging, and participation in community threads.",
				status: "core"
			},
			{
				title: "Moderation and appeals",
				to: "/moderation-and-appeals",
				summary:
					"Defines notices, action types, appeal expectations, and how moderation transparency should work.",
				status: "operational"
			},
			{
				title: "Corrections policy",
				to: "/corrections",
				summary:
					"Explains how factual correction requests, urgent updates, and visible change-log entries are handled.",
				status: "operational"
			},
			{
				title: "Automation and AI disclosure",
				to: "/automation-and-ai",
				summary:
					"Defines where automation can assist, what it cannot decide alone, and how human review gates apply.",
				status: "program"
			}
		]
	}
];

export const policyPrinciples = [
	"Start with the narrowest page that matches the problem you actually have.",
	"Use legal pages for rights and privacy questions, and the trust pages for how reviewed answers are built.",
	"Keep community discussion, reviewed pages, and correction paths separate.",
	"Do not treat planning notes or internal workflow details like everyday reading."
];
