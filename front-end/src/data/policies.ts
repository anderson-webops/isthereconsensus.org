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
		title: "Core legal pages",
		description: "These pages define the site contract, data-handling baseline, and user-rights entry points.",
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
		title: "Editorial integrity and reviewer governance",
		description:
			"These pages explain who can influence canonical pages, how review works, and how interests are disclosed.",
		items: [
			{
				title: "Governance and workflow",
				to: "/governance",
				summary:
					"How public questions enter editorial intake, move through expert review, and become canonical claim pages.",
				status: "operational"
			},
			{
				title: "Conflict and funding disclosure",
				to: "/conflicts-and-funding",
				summary:
					"Defines what counts as a conflict, who must disclose, when recusal is required, and how public disclosure appears on canonical pages.",
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
				title: "Editorial standards",
				to: "/standards",
				summary:
					"Defines the evidence threshold, source hierarchy, uncertainty language, and publishing standard for canonical claims.",
				status: "operational"
			},
			{
				title: "Methods playbook",
				to: "/methods",
				summary: "Shows the review rubric, evidence model, and page-level trust cues used across the site.",
				status: "operational"
			}
		]
	},
	{
		title: "Community fairness and automation controls",
		description:
			"These pages explain how public participation is moderated, appealed, corrected, and kept distinct from canonical conclusions.",
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
				title: "Evidence operations",
				to: "/evidence-ops",
				summary:
					"Shows how the site monitors retractions, guideline changes, and other update triggers over time.",
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
	"Keep the core legal contract stable, and move faster-changing operational rules into standalone governance pages.",
	"Do not publish a policy promise the product cannot currently honor in a real workflow.",
	"Show who can influence canonical pages, how conflicts are handled, and how users can challenge decisions.",
	"Treat public community content, expert review, and canonical editorial conclusions as separate layers with different rights and responsibilities."
];
