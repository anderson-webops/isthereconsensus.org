import type { ReadingGuideContent } from "./types";

export const browsingPrivacyGuide: ReadingGuideContent = {
	takeaway:
		"Private windows, HTTPS and VPNs solve different problems. Start with who can see which information, not a promise that one tool makes everything private.",
	scope: "A practical guide to ordinary browser privacy and connection trust, based on primary documentation and technical guidance checked October 4, 2026. It is not a provider ranking, independent security audit or individualized plan for high-risk surveillance. The linked reviews explain historical studies and their limitations; independent expert review has not been completed.",
	sections: [
		{
			id: "name-the-observer",
			title: "1. Name the information and the observer",
			paragraphs: [
				{
					text: "Before choosing a tool, describe the problem as a sentence: 'I want to keep this information from this observer.' A browser history entry, the content of a message and a website's knowledge that you signed in are different things. The observer might be another person using the device, someone operating a network or the service you deliberately contacted. Separating those cases makes a protection claim testable instead of letting the word private carry several incompatible meanings.",
					sources: ["security-plan"]
				},
				{
					text: "Then ask how serious a failure would be and what practical constraints apply. A casual history check and a determined attacker controlling the device call for different assessments. A useful tool does not have to solve every possible problem, but the unsolved parts should stay visible. Treat the examples here as a way to read claims, not a checklist that certifies a particular device, account, network or person as safe.",
					sources: ["security-plan", "tls-limits"]
				}
			]
		},
		{
			id: "private-window",
			title: "2. A private window is not a remote memory eraser",
			paragraphs: [
				{
					text: "Imagine using a shared computer and then returning it to its owner. Firefox's private-browsing documentation describes limits on retained browser information but also exceptions, including saved downloads and bookmarks. That is a local-record question. It is not evidence that the receiving website deleted its own records, and it does not establish protection from software already monitoring the computer. The useful habit is to check both what a mode stops saving and what its documentation explicitly leaves outside its scope.",
					sources: ["firefox"]
				},
				{
					text: "Signing into a familiar account poses a different question: what can the service associate with that account? A blank history list does not answer it. Likewise, a tracking-control feature should be read according to the mechanisms it covers, not interpreted as a guarantee that no one can recognize you. In the linked review, the historical disclosure experiment concerns people's understanding of these distinctions, not today's ranking of browsers or a numerical estimate of your privacy.",
					sources: ["firefox", "chrome"]
				}
			]
		},
		{
			id: "connection-versus-recipient",
			title: "3. Separate the protected connection from the recipient",
			paragraphs: [
				{
					text: "Picture a website asking you to submit information. HTTPS can protect that connection, but a dishonest website can use HTTPS too. The FTC explicitly cautions against reading encryption as proof that a site is legitimate. These are two separate questions: could someone interfere with the journey, and should you trust the recipient? Answering the first does not supply the missing evidence for the second. The indicator is meaningful within its scope, not a general endorsement of the page.",
					sources: ["wifi", "lock"]
				},
				{
					text: "Connection protection also has endpoints. Chromium's technical explanation distinguishes TLS from protection of the client and server themselves, including compromised software and locally installed trust controls. That matters when someone says encryption means nobody else can see anything. The statement has silently skipped where the protected channel begins and ends. This guide does not diagnose a managed computer or tell you to override a warning; it explains why those conditions belong in the question.",
					sources: ["tls-limits"]
				}
			]
		},
		{
			id: "vpn-trust",
			title: "4. A different route still has trust dependencies",
			paragraphs: [
				{
					text: "EFF's VPN guidance frames the tool as network routing rather than complete anonymity. Changing an apparent IP address does not make an account you sign into forget who you are. It also introduces a provider whose practices matter. Before accepting a broad privacy claim, identify which traffic it covers and what evidence supports the provider's behavior. A marketing promise and an independently scoped assessment are different kinds of evidence, and neither should quietly become a guarantee about every observer.",
					sources: ["vpn"]
				},
				{
					text: "Do not replace one exaggeration with its opposite. Saying a VPN provider becomes a party to trust does not mean it can automatically decrypt properly protected HTTPS content. The VPN route and the website connection have distinct boundaries. The linked review also retains the historical Android study's date and testing limits: old implementation findings cannot establish that a present-day named service is unsafe, or that every current service has the same problem.",
					sources: ["tls-limits", "vpn"]
				}
			]
		},
		{
			id: "read-a-promise",
			title: "5. Turn a reassuring label into an answerable question",
			paragraphs: [
				{
					text: "Try this exercise with a claim such as 'secure browsing': write down the observer, the information, the feature and the conditions. Then look for what the source actually establishes. Product documentation describes intended behavior; a specification defines protocol properties; a dated implementation study tests a particular sample. They can each be useful without answering the same question. If the evidence stops at connection protection, leave operator honesty and device integrity as separate questions rather than filling the gaps with reassurance.",
					sources: ["security-plan", "tls-limits", "lock"]
				}
			]
		}
	],
	questions: [
		"Who should this information be private from, and does the tool address that observer?",
		"Which local records remain, and what can the receiving service still associate with an account?",
		"Does this indicator establish a protected connection, an honest operator, or neither?",
		"What evidence supports the provider's current behavior, and what remains outside its scope?"
	],
	sources: [
		{
			id: "security-plan",
			title: "Your Security Plan",
			url: "https://ssd.eff.org/module/your-security-plan",
			kind: "Primary guidance",
			note: "EFF's scope-based planning framework, checked for observers, consequences and constraints. Not a personalized risk assessment or measured tool-effectiveness result."
		},
		{
			id: "firefox",
			title: "Private Browsing: Use Firefox without saving history",
			url: "https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history",
			kind: "Product documentation",
			note: "Current Mozilla description and exceptions checked. First-party documentation, not independent forensic testing of all versions and settings."
		},
		{
			id: "chrome",
			title: "Browse in Incognito mode",
			url: "https://support.google.com/chrome/answer/95464?hl=en",
			kind: "Product documentation",
			note: "Current Chrome explanation of local session handling and remote observation checked. Does not establish an anonymity probability or universal browser behavior."
		},
		{
			id: "wifi",
			title: "Are Public Wi-Fi Networks Safe? What You Need To Know",
			url: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know",
			kind: "Consumer guidance",
			note: "FTC's distinction between encrypted connections and legitimate websites checked. Not a guarantee about a particular public network or individual device."
		},
		{
			id: "lock",
			title: "An Update on the Lock Icon",
			url: "https://blog.chromium.org/2023/05/an-update-on-lock-icon.html",
			kind: "Primary browser explanation",
			note: "Chrome Security's scope explanation checked. Its historical percentages are not adopted, and icon appearance can change across browsers and versions."
		},
		{
			id: "tls-limits",
			title: "TLS / SSL: Security properties and their limits",
			url: "https://www.chromium.org/Home/chromium-security/education/tls/",
			kind: "Technical explanation",
			note: "Endpoint and local trust-anchor limitations checked. Historical cipher examples are not current configuration instructions or an audit of this reader's device."
		},
		{
			id: "vpn",
			title: "Choosing the VPN That's Right for You",
			url: "https://ssd.eff.org/module/choosing-vpn-thats-right-you",
			kind: "Primary guidance",
			note: "EFF guidance reviewed July 28, 2026 checked for anonymity limits and provider trust. No particular provider is independently audited or recommended here."
		}
	]
};
