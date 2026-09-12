import type { ComparisonFinding, EvidenceComparison } from "./types.js";
import { accountProtectionClaims, accountProtectionSources } from "../claim-expansion-practical-account.js";

function finding(headline: string, summary: string, evidence: string, scope: string, limitation: string, sourceIds: string[]): ComparisonFinding {
	return { headline, summary, evidence, scope, limitation, sourceIds };
}
export const accountProtectionComparison: EvidenceComparison = {
	slug: "account-protection",
	title: "Compare account protection methods",
	description: "Passwords, managers, codes, approval prompts and passkeys: compare the threats they address and the access or recovery each depends on.",
	checkedAt: "2026-09-12",
	datasetLabel: "Current authentication standards, institutional guidance and scoped usability/security research",
	measureNote: "Qualitative properties and evidence limits. No common attack-prevention percentage, provider rating or measured share of expert agreement.",
	resultNote: "These are components you may combine. A password manager can support unique passwords alongside MFA; installing it does not add a second factor to every saved account.",
	protocolNote: "No study tested all these approaches against identical attackers in an interchangeable population. Compare the particular threat and access dependency, not an invented overall security score.",
	guidance: { text: "Use the strongest suitable method the service supports, with a workable recovery plan. Check what alternative login and recovery paths remain available. A strong normal login does not evaluate every other route into the account.", sourceIds: ["mfa", "sync"] },
	topics: ["digital-security-and-privacy"],
	guidePath: "/guides/account-protection",
	reviews: accountProtectionClaims.map(claim => ({ path: `/consensus/${claim.topicSlug}/${claim.slug}`, label: claim.title })),
	readerUpdates: [{ id: "59682067-834d-44c1-b572-044924d8dcc5", date: "2026-09-12T02:50:46.000Z", kind: "new_comparison", bottomLineImpact: "new", summary: "Added an account-protection comparison, five canonical reviews and a guide distinguishing phishing, reuse, recovery and user-password expiry.", sourceIds: ["nist", "webauthn", "mfa"] }],
	outcomes: [
		{ id: "threat", label: "Threats addressed", unit: "Protection and limits", explanation: "Which barrier the method adds against password reuse, guessing or fake-site credential phishing." },
		{ id: "access", label: "Access and recovery", unit: "Dependencies and usability", explanation: "What needs to remain available, and what a successful everyday login does not establish about future access." }
	],
	contexts: [
		{ id: "general", label: "Understand the methods", supportsEstimates: true, explanation: "Compare stated properties under their assumptions. These descriptions do not test your account or provider." },
		{ id: "personal", label: "My chance of being hacked", supportsEstimates: false, explanation: "No personal probability is available. Attack exposure, devices, service settings and recovery paths have not been assessed." },
		{ id: "incident", label: "Recover a compromised account", supportsEstimates: false, explanation: "A general comparison cannot determine who controls your devices, sessions or recovery. Use the service's official recovery/support process; these cards are not an incident diagnosis." }
	],
	options: [
		{
			id: "password",
			label: "Password alone",
			scope: "An account that accepts a password without an additional factor.",
			estimates: {},
			findingsByContext: { general: {
				threat: finding("The password remains the reusable secret", "A distinct, hard-to-guess password helps with guessing and reuse, but a fake site can still solicit it.", "NIST distinguishes password strength from phishing resistance. Length or complexity does not bind a typed password to the intended service.", "Password-based authentication; the account may have other protective controls.", "No universal password-cracking time or personal compromise probability is calculated.", ["nist"]),
				access: finding("Familiar entry, separate recovery", "Remembering or securely storing the password supports access; forgetting it shifts dependence to the service's recovery process.", "Institutional guidance treats password management and recovery as parts of a wider access system. Routine expiry is different from changing a compromised password.", "Ordinary user passwords, not every machine credential or organizational policy.", "A successful reset does not by itself verify that every unwanted session or other credential was revoked.", ["nist", "interpersonal"])
			} }
		},
		{
			id: "manager",
			label: "Manager with unique passwords",
			scope: "A workflow that generates and applies distinct passwords; it can be combined with MFA.",
			estimates: {},
			findingsByContext: { general: {
				threat: finding("Reduce reuse through actual replacement", "Generated unique passwords can prevent one reused secret from linking several accounts, when the replacements are applied at each service.", "Guidance and observational research distinguish generation from simply saving existing passwords. Site-matched autofill can also help avoid an impostor.", "Generation, account updates, storage and entry together.", "A password manager is not automatically a second factor or the same phishing-resistant protocol as WebAuthn.", ["buyers", "managers", "nist"]),
				access: finding("Protect the vault and its recovery", "Device support, a usable vault recovery arrangement and reliable access determine whether the workflow can be maintained.", "NCSC includes these considerations in selection; recent research shows that server trust and recovery features deserve scrutiny even with encrypted vaults.", "The chosen implementation and its current updates, not a general product certification.", "No current brand ranking or claim that a published historical flaw remains unfixed is supplied.", ["buyers", "vaults"])
			} }
		},
		{
			id: "sms",
			label: "Password plus SMS code",
			scope: "A second step delivered through the telephone channel.",
			estimates: {},
			findingsByContext: { general: {
				threat: finding("Another barrier, with delivery and relay risks", "Possession of a password alone is insufficient when the additional code is required, but the code can still be solicited by an impostor.", "NIST treats telephone-based out-of-band authentication as restricted and asks verifiers to consider SIM changes, number porting and abnormal behavior.", "The service actually enforces the extra step and does not offer a weaker bypass.", "Short lifetime and one-use acceptance do not establish phishing resistance.", ["nist", "mfa"]),
				access: finding("Depends on access to the number", "Receiving codes depends on telephone service and continued control of the registered number.", "NIST recognizes delivery limitations and requires alternative authenticator types for its covered systems.", "The user's delivery conditions and the service's alternative/recovery arrangements.", "This comparison does not test coverage, carrier protection or a specific recovery process.", ["nist"])
			} }
		},
		{
			id: "totp",
			label: "Password plus authenticator code",
			scope: "A code generated by an enrolled app rather than sent by SMS.",
			estimates: {},
			findingsByContext: { general: {
				threat: finding("Avoid SMS delivery, retain live-code phishing risk", "The code is generated from an enrolled secret, adding a factor without using telephone delivery for each login.", "NIST and NCSC distinguish the extra barrier from phishing resistance: a manually entered fresh code is not bound to the legitimate site's session.", "An enforced code step and a properly protected authenticator secret.", "Replay resistance does not prevent every real-time relay; no numerical superiority is assigned.", ["nist", "mfa"]),
				access: finding("Plan for the authenticator becoming unavailable", "Changing or losing a device requires an available enrolled alternative, supported transfer or recovery.", "NIST describes rebinding and invalidating old authenticators, with protected syncing as an implementation-dependent alternative.", "The particular app and account, not every product called an authenticator.", "Keeping a seed or recovery code in an exposed location can change who can authenticate.", ["nist", "sync"])
			} }
		},
		{
			id: "prompt",
			label: "Login approval prompt",
			scope: "A challenge sent to an enrolled app; designs may include number matching.",
			estimates: {},
			findingsByContext: { general: {
				threat: finding("Approval design and behavior matter", "An app challenge can add a useful barrier, but a misleading or unwanted approval remains a different problem from password guessing.", "NCSC discusses challenge apps and prompt fatigue separately from FIDO2. NIST's phishing-resistant category requires cryptographic binding to the intended verifier.", "The exact challenge flow and required user action.", "Number matching is not treated as equivalent to a service-bound passkey or as protection against every phishing flow.", ["mfa", "nist"]),
				access: finding("Requires a reachable enrolled app", "Availability depends on the device, app and challenge delivery, together with whatever alternatives the service accepts.", "NCSC includes trusted-device availability and connectivity among the practical limits of challenge-based methods.", "Usability and delivery in the actual work or personal setting.", "No universal approval-completion time, accessibility score or support guarantee is provided.", ["mfa"])
			} }
		},
		{
			id: "passkey",
			label: "Passkey or FIDO2 security key",
			scope: "Service-scoped public-key authentication; local user verification is needed for the multi-factor form.",
			estimates: {},
			findingsByContext: { general: {
				threat: finding("Bind authentication to the legitimate service", "A conforming passkey flow prevents a fake site from simply obtaining a reusable password or code for the real service.", "WebAuthn scopes credentials to the relying service and requires origin checks. NIST recognizes this as verifier-name binding.", "Proper implementation, including the service's checks and any required local user verification.", "This does not secure a compromised endpoint or eliminate unsafe recovery and interpersonal device-access risks.", ["webauthn", "nist", "interpersonal"]),
				access: finding("Sync and device binding have different dependencies", "A synced credential can be available on another device; a device-bound one needs a separately supported alternative if the original becomes unavailable.", "NIST describes sync and recovery controls. The usability literature identifies recovery and transfer as continuing challenges.", "Actual backup state, provider access and accepted alternatives for the account.", "Backup eligibility does not establish a completed backup, and no universal recovery success rate is available.", ["sync", "adoption"])
			} }
		}
	],
	limitations: [
		"The options overlap: generated passwords and a second factor can be used together. Selecting cards does not configure or test an account.",
		"Protocol properties, human-behavior studies and product implementation findings answer different questions and are not pooled into one score.",
		"A standard's multi-factor requirement depends on the actual verification flow, not a feature name alone.",
		"Recovery, fallback login, device control and existing sessions can remain relevant even when ordinary authentication is strong.",
		"Research dates and threat models are retained. Historical findings and author-assigned importance ratings are not current product rankings.",
		"This is targeted AI-assisted source checking; no independent product audit, expert approval or personal account-risk assessment was performed."
	],
	sources: ["nist", "webauthn", "mfa", "buyers", "managers", "sync", "adoption", "vaults", "interpersonal"].map((id) => {
		const source = accountProtectionSources[id as keyof typeof accountProtectionSources];
		return { id, title: source.title, url: source.url!, note: source.note, locator: ({ nist: "Authenticator types and phishing resistance", webauthn: "Credential scope, origin validation and biometric privacy", mfa: "Method descriptions and practical constraints", buyers: "Generation, recovery, updates and platform support", managers: "Methods, results and threats to validity", sync: "Backup state, provider access and recovery controls", adoption: "Search methods and recovery/adoption limitations", vaults: "Threat model, study scope and disclosure discussion", interpersonal: "Research-account methods, lifecycle findings and scope" } as Record<string, string>)[id]! };
	})
};
