import type { ReadingGuideContent } from "./types";

export const accountProtectionGuide: ReadingGuideContent = {
	takeaway:
		"Choose a login method by the threat it addresses, then check how you would regain access. Password reuse, fake-site phishing, device control and account recovery are different problems.",
	scope: "A guide to evidence and assumptions behind account-protection methods. It does not inspect your accounts, recommend a particular vendor, diagnose an incident or certify compliance.",
	sections: [
		{
			id: "which-threat",
			title: "Start with the attack being prevented",
			paragraphs: [
				{
					text: "The word secure is incomplete until the threat is named. A long, unique password makes a different contribution from an additional factor, and a one-time response has a different property from a response tied to the legitimate service. NIST explicitly distinguishes replay resistance from phishing resistance. An impostor may be able to relay a fresh manually entered code even though the service would reject a second use later. Keeping those cases separate explains why adding a factor can help without making every method equivalent.",
					sources: ["nist"]
				},
				{
					text: "Passkeys change the authentication exchange. WebAuthn credentials are scoped to a relying service, with checks that prevent another website from simply using the same credential. When a face, fingerprint or PIN activates the credential, that local step is not a request to send biometric data to the website. This is a technical property under implementation assumptions, not an observed percentage of all possible account compromises prevented. Recovery and other accepted login methods still need separate attention.",
					sources: ["webauthn", "sync"]
				}
			]
		},
		{
			id: "workflow",
			title: "Evaluate the workflow, not just the tool",
			paragraphs: [
				{
					text: "A password manager can make distinct credentials practical, but saving an old reused password does not replace it at the service. The full workflow includes generating a replacement, applying it to the right account, storing it and retrieving it when needed. Observational research found that creation strategy helped explain strength and reuse. Its older browser sample should not become a ranking of current products. The useful question for today's reader is whether the workflow reliably changes the underlying reuse problem.",
					sources: ["managers", "buyers"]
				},
				{
					text: "The method also has to fit the setting. Message delivery, app access, device availability and permitted hardware differ. A password manager and an additional factor can be used together; they are not competing labels that force an either-or choice. NCSC's guidance discusses these practical constraints alongside authentication strength. A comparison that ignores an inaccessible device or an unusable fallback would miss part of what determines whether the protection can actually be maintained.",
					sources: ["mfa", "buyers"]
				}
			]
		},
		{
			id: "recovery",
			title: "Think through losing access",
			paragraphs: [
				{
					text: "A synced passkey can be available beyond the original device, provided syncing happened and access to the relevant provider remains available. A device-bound credential creates a different dependency on the original authenticator or other registered options. Backup eligibility is not proof of a completed backup. NIST's guidance therefore addresses access controls, verification and recovery alongside syncing itself. Convenience and security need to be examined together, including what happens when the ordinary route is unavailable.",
					sources: ["sync"]
				},
				{
					text: "Recovery is also an access path. A person who can unlock a device or control a recovery account poses a different problem from a stranger operating a fake login page. Research on interpersonal threats highlights the importance of enrollment, notifications and revocation. Those studies used specific historical implementations and research accounts, so they do not establish current defects in every service. They do explain why a strong sign-in method cannot stand in for an assessment of the entire account lifecycle.",
					sources: ["interpersonal"]
				}
			]
		},
		{
			id: "maintenance",
			title: "Keep maintenance tied to its purpose",
			paragraphs: [
				{
					text: "A calendar-based password change and a response to compromise serve different purposes. Current NIST and NCSC guidance oppose routine expiry for ordinary user passwords while retaining the need to act on compromise. The linked workplace survey is more nuanced than saying expiry always makes behavior worse: it did not detect several feared effects, yet reported replacement strategies did not establish stronger passwords either. Habits and beliefs are not the same outcome as observed account takeovers.",
					sources: ["policy", "expiry"]
				},
				{
					text: "Read claims about security tools with the same discipline. A specification describes conforming behavior; an implementation study tests selected versions and assumptions; a user study measures a particular sample and task. None automatically supplies a universal product score. The comparison keeps those evidence types visible and leaves personal risk and compromised-account contexts unanswered. It is a route into the underlying reviews, where dates, source limitations and reasons to revise the conclusions remain available.",
					sources: ["webauthn", "managers", "interpersonal"]
				}
			]
		}
	],
	questions: [
		"Which threat does this method address?",
		"Does the evidence concern a protocol, a product version or user behavior?",
		"What else can be used to log in or recover the account?",
		"What happens if the usual device or provider is unavailable?",
		"Is a recommendation about routine maintenance being confused with responding to compromise?"
	],
	sources: [
		{
			id: "nist",
			title: "NIST SP 800-63B-4: authenticator requirements",
			url: "https://pages.nist.gov/800-63-4/sp800-63b/authenticators/",
			kind: "Final 2025 guidance",
			note: "Password, code and phishing-resistance sections checked; requirements have a defined government-system scope."
		},
		{
			id: "webauthn",
			title: "W3C WebAuthn Level 3",
			url: "https://www.w3.org/TR/2026/REC-webauthn-3-20260825/",
			kind: "2026 Recommendation",
			note: "Credential scope, origin validation and biometric privacy checked; no independent audit of implementations."
		},
		{
			id: "sync",
			title: "NIST: syncable authenticators",
			url: "https://pages.nist.gov/800-63-4/sp800-63b/syncable/",
			kind: "Standards guidance",
			note: "Full appendix checked for sync, verification flags and recovery assumptions."
		},
		{
			id: "mfa",
			title: "NCSC: recommended types of MFA",
			url: "https://www.ncsc.gov.uk/collection/mfa-for-your-corporate-online-services/recommended-types-of-mfa",
			kind: "Corporate-use guidance",
			note: "Method descriptions and practical constraints checked; no common numerical effectiveness scale."
		},
		{
			id: "buyers",
			title: "NCSC: password manager buyers guide",
			url: "https://www.ncsc.gov.uk/collection/passwords/password-manager-buyers-guide",
			kind: "Selection guidance",
			note: "Generation, platform support, recovery and vault-protection considerations checked."
		},
		{
			id: "managers",
			title: "Lyastani et al.: managers, strength and reuse",
			url: "https://www.usenix.org/conference/usenixsecurity18/presentation/lyastani",
			kind: "2018 observational study",
			note: "Primary methods, findings and validity limits checked; historical US Chrome sample, not a current brand trial."
		},
		{
			id: "interpersonal",
			title: "Daffalla et al.: passkeys and interpersonal threats",
			url: "https://www.usenix.org/conference/usenixsecurity25/presentation/daffalla",
			kind: "2025 implementation study",
			note: "Research-account methods and scope checked; historical service behavior is not a current vulnerability inventory."
		},
		{
			id: "policy",
			title: "NCSC: updating password policy",
			url: "https://www.ncsc.gov.uk/collection/passwords/updating-your-approach",
			kind: "Organizational guidance",
			note: "Routine expiry and compromise exception checked; categorical wording is not treated as a universal experimental finding."
		},
		{
			id: "expiry",
			title: "Habib et al.: password expiration policies",
			url: "https://www.usenix.org/conference/soups2018/presentation/habib-password",
			kind: "2018 workplace surveys",
			note: "Methods, findings, self-report limitations and funding checked; no causal measurement of account-takeover rates."
		}
	]
};
