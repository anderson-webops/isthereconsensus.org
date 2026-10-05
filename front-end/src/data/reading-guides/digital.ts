import type { ReadingGuideContent } from "./types";

export const digitalGuide: ReadingGuideContent = {
	takeaway:
		"Security labels describe particular properties, not everything about a system. Name the information, observer, state and surviving copies before deciding what a protection actually establishes.",
	scope: "An original conceptual guide to everyday digital-security claims, based on original IETF, NIST and W3C references checked on 2026-10-05. It is not a product ranking, incident diagnosis, legal opinion, attack tutorial, destructive procedure or safety certification. Technical definitions and institutional guidance are not a poll of scientists or measured prevention rates. Historical documents retain their publication and applicability limits; independent expert review has not been completed.",
	sections: [
		{
			id: "layers-and-readers",
			title: "Encrypted between which parties?",
			paragraphs: [
				{
					text: "Start with a route and the parties allowed to read at each step. A sender can have an encrypted connection to a delivery service, and that service can have another encrypted connection to a recipient, while the service sees the message in between. End-to-end message protection instead aims to keep the selected content accessible only at the communicating endpoints under its stated assumptions. These descriptions are not contradictory; they describe different boundaries. The MLS protocol and architecture make that separation explicit. A service's use of a secure connection does not establish its message-layer design, its key custody or the treatment of separate backups.",
					sources: ["architecture", "mls"]
				},
				{
					text: "Using both layers can serve different purposes. Protecting a network connection can conceal aspects of the exchange from an observer on that segment; protecting message content from the delivery service addresses another observer. Neither property automatically tells you everything about the service's records, accounts or application. Ask what becomes readable, where and to whom before interpreting the word encrypted. If the relevant product architecture is unavailable, the library does not establish it. This guide deliberately offers no comparative list of supposedly safest messengers, because a general specification is not an independent audit of every service implementing some of its ideas.",
					sources: ["architecture", "mls"]
				}
			]
		},
		{
			id: "metadata-and-endpoints",
			title: "Hidden words are not hidden context or trusted devices",
			paragraphs: [
				{
					text: "Message content, message length, timing and relationships are not one information category. MLS protects some sender information while discussing other fields or patterns that may remain visible depending on the delivery architecture. A provider's content-confidentiality claim therefore cannot stand in for a complete metadata analysis. But the opposite shortcut also fails: not every service exposes identical metadata, and an observation about communication does not prove that an observer recovered the words. A valid assessment identifies the particular field, its observer and the available surrounding information. This guide neither calculates a person's re-identification probability nor describes how to infer their relationships.",
					sources: ["mls", "architecture"]
				},
				{
					text: "The receiving endpoint is allowed to read a message, so its condition matters. An adversary controlling the relevant application may read displayed or retained plaintext without defeating the transmission cipher. The MLS architecture separately analyzes forms of endpoint compromise and conditional recovery. Forward secrecy and post-compromise security describe selected time-dependent protections, not a promise that an actively controlled device becomes safe while control continues. Stored plaintext and key state also have different lifetimes. A recipient can retain or share a readable copy. None of this makes encryption useless; it separates its real boundary from an unsolved device-control or recipient-trust problem.",
					sources: ["architecture", "mls"]
				}
			]
		},
		{
			id: "hashes-and-representations",
			title: "A transformed value is not automatically a safe password store",
			paragraphs: [
				{
					text: "A cryptographic digest and a ciphertext serve different roles. Encryption is designed for authorized recovery with the relevant key; hashing condenses an input into a value used for such purposes as comparison or integrity checking. Calling a function one-way does not establish that an easy input cannot be guessed and compared. NIST's final password-verifier guidance therefore addresses suitable password hashing, salts and cost rather than treating any fast digest as a complete solution. This guide does not give implementation settings or guessing instructions. The historical Secure Hash Standard supplies terminology, not current approval of every algorithm it lists or a password-storage recipe.",
					sources: ["hash", "passwords"]
				},
				{
					text: "For a breach report, ask which representation was exposed and what protection actually applied. A hashed-password file is not automatically a plaintext password list, but its existence is not assurance that all accounts remain safe. Scheme choice, cost, predictable inputs and surrounding access paths are relevant evidence questions. The phrase hashed cannot answer them alone. Conversely, a salt is not a secret substitute for the password's unpredictability. This is deliberately a conceptual account rather than an assessment of an actual incident. No personal probability, attack benchmark or recommendation to change a live verifier follows from this guide, and absent scheme details must remain an uncertainty.",
					sources: ["passwords", "hash"]
				}
			]
		},
		{
			id: "names-and-addresses",
			title: "Lookup privacy, answer integrity and identity are separate",
			paragraphs: [
				{
					text: "DNS resolves names, so an encrypted DNS transport protects a specific exchange rather than every later application connection. The DoH specification distinguishes visibility on the wire from visibility at the resolver. DNS Privacy Considerations expands the observer model instead of promising complete browsing invisibility. DNSSEC addresses another question: authenticated origin and integrity of DNS data. Its foundational specification explicitly excludes confidentiality. The mechanisms can coexist without substituting for one another, and neither judges the honesty of content delivered from a resolved destination. A query is also not automatically evidence that a person deliberately read a particular page; software activity and name granularity complicate that interpretation.",
					sources: ["doh", "dnsprivacy", "dnssec"]
				},
				{
					text: "An outward-facing IP address is likewise not a universal personal identity card. Address-sharing and carrier-grade NAT documents describe multiple subscribers behind public addresses, and a subscriber connection can also serve several devices or people. A network allocation, a device and the human performing an action are distinct objects of attribution. More context can strengthen a particular association, but missing records, time information or topology cannot be replaced by certainty. This is not a legal assessment or a forensic procedure. It also supplies no universal geolocation accuracy. Asking which object was actually linked preserves useful network evidence without converting it into an unsupported identification of a person.",
					sources: ["address", "cgn"]
				}
			]
		},
		{
			id: "browser-state-and-records",
			title: "Clearing one identifier is not erasing every association",
			paragraphs: [
				{
					text: "Cookies let a browser hold values and return applicable ones with later requests. They are one association mechanism, not the whole tracking universe. The W3C Privacy Working Group's note distinguishes active, passive and cookie-like fingerprinting surfaces and discusses what mitigations can and cannot establish. Deliberate login can also associate activity without relying on a globally unique device fingerprint. Blocking a particular cookie mechanism can still reduce its contribution; the existence of alternatives does not make the control pointless. The note is working-group guidance, not a measured ranking of current browsers, a contemporary uniqueness rate or endorsement by all W3C Members.",
					sources: ["cookies", "fingerprinting"]
				},
				{
					text: "Removing a cookie changes local state and can interrupt later return of that value. It does not automatically rewrite records a remote service already received. Reconnecting through an account or another available association is a separate possibility, not a promise that every cleared browser can always be identified. Ask whether the operation concerned future requests, existing remote records or a formal erasure request. The last of those includes service-specific and legal questions not settled here. A clean local screen is not a remote deletion receipt. This guide describes the technical boundary without offering bypass code, tracking procedures or an unsupported claim that local controls erase all online history.",
					sources: ["cookies", "fingerprinting"]
				}
			]
		},
		{
			id: "copies-and-recovery",
			title: "A current copy and a recoverable state solve different problems",
			paragraphs: [
				{
					text: "Synchronization keeps selected locations aligned; recovery needs a usable state after the failure that matters. If a mistaken edit is copied to all current replicas, having several replicas does not itself restore the earlier intact version. NIST's storage guidance distinguishes replication, point-in-time copies and history-retaining protection. A service may combine sync with versions or backup features, but the label sync alone establishes none of their retention or restore properties. Ask which failure is addressed and which state survives it. A device loss, mistaken edit, account loss and management-system compromise need not leave the same copies or access paths available, even within one product.",
					sources: ["storage", "contingency"]
				},
				{
					text: "A genuine historical backup can still share a compromised control boundary. If the compromised access can modify or delete that copy, its backup label does not stop those rights from applying. Storage guidance treats management-plane protection, isolation and appropriately enforced immutability as distinct considerations. None is a guarantee that every component needed for recovery exists and works. Original federal contingency guidance emphasizes planning and testing rather than merely possessing media. These enterprise and federal documents provide concepts, not a compulsory household schedule or certification of a consumer vendor. No destructive test or ransomware construction is described; the question is what remains intact beyond the relevant control.",
					sources: ["storage", "contingency"]
				},
				{
					text: "Recovery evidence must also be distinguished from confidentiality evidence. A usable copy can help restore availability without undoing information already disclosed from another system. A backup job's success notification does not demonstrate complete application restoration with all dependencies and necessary access. NIST's restoration-assurance discussion makes that distinction explicit. This guide does not inspect your files, credentials or recovery arrangements and cannot certify them. Treat a proposed configuration, an intact archive and a tested restoration as different evidence states. When recovery has not actually been tested for the relevant failure, describing it as untested is more informative than promoting the existence of a copy into a guaranteed outcome.",
					sources: ["storage", "contingency"]
				}
			]
		},
		{
			id: "removal-and-encryption",
			title: "No longer listed is not the same as sanitized",
			paragraphs: [
				{
					text: "A directory no longer showing a file does not establish validated sanitization of every underlying byte or other copy. NIST's September 2025 sanitization revision defines different goals and conditions for clear, purge and destroy methods. Device behavior and storage technology matter; an old universal overwrite rule should not be imported into every modern system. Nor does this mean every deleted file can always be recovered. The honest conclusion is that a particular outcome needs actual system evidence. Other backups, snapshots or recipient copies remain separate objects even if one medium was successfully sanitized. No wiping command, disassembly or destructive procedure is provided here.",
					sources: ["sanitize", "storage"]
				},
				{
					text: "At-rest encryption has another state boundary. The storage-encryption guide explains that once authentication makes data available, processes with relevant file access may obtain plaintext. A stolen locked medium and malicious software during legitimate use are different threats. Access controls or separate encrypted containers can impose further boundaries, but their behavior needs implementation evidence. The historical guide's named devices and algorithms are not current recommendations. This distinction does not invalidate encryption: it prevents a real at-rest benefit from being advertised as universal runtime protection. Ask what is unlocked, which process can read it and what evidence supports the claimed control in that actual state.",
					sources: ["disk", "storage"]
				}
			]
		},
		{
			id: "authenticated-is-not-approved",
			title: "Authenticated is not a synonym for harmless or truthful",
			paragraphs: [
				{
					text: "Code signatures help establish provenance and integrity under a trust system, not the harmlessness of every program behavior. NIST's code-signing discussion explicitly considers malicious or unauthorized code being signed through mistakes or compromised processes. The development framework separately describes release-integrity verification and vulnerability prevention or response. That separation preserves both benefits without exaggerating either. A store review, a signature, permission enforcement and independent behavioral testing are different evidence types. This guide does not inspect an executable, certify a signer or report a current vendor incident. A program can retain its intended bytes while still having a defect or behavior a user did not want.",
					sources: ["code", "ssdf"]
				},
				{
					text: "Updates can address the defects they cover without making all attacks impossible. Patch-management guidance separates deployment from verifying that a patch has taken effect and monitoring the continuing response. A downloaded package is not automatically an active fix; whether a restart is required depends on the update and environment. Other credentials, settings, unknown defects or components can remain relevant. These limits do not justify neglecting maintenance. They explain why a specific verified fix is a stronger statement than a generic success badge, but narrower than immunity. No exploit instructions, universal efficacy percentage, support-contract determination or operational change follows from this guide.",
					sources: ["patch", "ssdf"]
				},
				{
					text: "Email-domain authentication is not factual verification either. The current May 2026 DMARC specification, RFC 9989, explicitly excludes content analysis, authentication of non-domain entities and display-name attacks. DKIM's signing-domain identity must also be kept distinct from proving a particular person's authorship. An authenticated domain can still send a deceptive assertion, and a familiar service can be compromised. Domain authentication remains useful for its actual purpose; it simply cannot endorse everything a message says. Ask what identity property was checked and what independently supports the request or claim. This guide does not inspect private messages, expose headers, assign spam scores or teach impersonation.",
					sources: ["dmarc", "dkim"]
				}
			]
		},
		{
			id: "what-the-evidence-establishes",
			title: "Keep the claim and the evidence at the same level",
			paragraphs: [
				{
					text: "These references include protocol specifications, definitions and institutional guidance, not interchangeable experiments or an expert poll. Related MLS documents describe one design, and multiple NIST documents share institutional provenance. The fingerprinting document is a Group Note rather than a W3C Recommendation. Older publications are used for scoped concepts, not presumed current approval of all their implementation details. Two Consensus.app discovery searches and fetched records helped locate historical fingerprinting papers, but original full texts were unavailable and their percentages were excluded. No Deep Review, current prevalence estimate, actual reader-demand measurement or independent expert approval is claimed. An unknown product property should remain unknown until evidence establishes it.",
					sources: ["architecture", "fingerprinting", "hash", "disk"]
				}
			]
		}
	],
	questions: [
		"What information is protected, against which observer and in which device state?",
		"Does the evidence establish a protocol property, actual deployment, product behavior or observed outcome?",
		"Which keys, accounts and permissions remain inside the same control boundary?",
		"Which historical state and dependencies would remain usable after the relevant failure?",
		"What important property is still unknown rather than guaranteed by the label?"
	],
	sources: [
		{
			id: "mls",
			title: "IETF RFC 9420: Messaging Layer Security Protocol (2023)",
			url: "https://www.rfc-editor.org/rfc/rfc9420.html",
			kind: "Protocol specification",
			note: "Original confidentiality, transport, metadata and conditional recovery scope checked; not a test of every messenger."
		},
		{
			id: "architecture",
			title: "IETF RFC 9750: Messaging Layer Security Architecture (2025)",
			url: "https://www.rfc-editor.org/rfc/rfc9750.html",
			kind: "Architecture reference",
			note: "Original endpoint and retained-plaintext limits checked; related to the same MLS design, not an independent efficacy trial."
		},
		{
			id: "hash",
			title: "NIST FIPS 180-4: Secure Hash Standard (2015)",
			url: "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf",
			kind: "Definition reference",
			note: "Digest terminology checked; historical algorithm inventory is not current approval or a password-storage recipe."
		},
		{
			id: "passwords",
			title: "NIST SP 800-63B-4: Password verifier requirements (2025)",
			url: "https://pages.nist.gov/800-63-4/sp800-63b/authenticators/",
			kind: "Scoped institutional requirements",
			note: "Final salt, cost and suitable scheme scope checked; no implementation settings or attack benchmark adopted."
		},
		{
			id: "doh",
			title: "IETF RFC 8484: DNS Queries over HTTPS (2018)",
			url: "https://www.rfc-editor.org/rfc/rfc8484",
			kind: "Protocol specification",
			note: "Client-resolver transport and server privacy distinctions checked; does not protect all application traffic."
		},
		{
			id: "dnsprivacy",
			title: "IETF RFC 9076: DNS Privacy Considerations (2021)",
			url: "https://www.rfc-editor.org/rfc/rfc9076.html",
			kind: "Observer-model reference",
			note: "Original DNS observer and resolver discussion checked; not a guarantee of anonymous browsing or erased logs."
		},
		{
			id: "dnssec",
			title: "IETF RFC 4033: DNS Security Introduction and Requirements (2005)",
			url: "https://www.rfc-editor.org/rfc/rfc4033.html",
			kind: "Protocol scope reference",
			note: "Explicit absence of confidentiality checked; historical algorithms and implementation details are not prescribed."
		},
		{
			id: "cookies",
			title: "IETF RFC 6265: HTTP State Management Mechanism (2011)",
			url: "https://www.rfc-editor.org/rfc/rfc6265.html",
			kind: "Mechanism reference",
			note: "Local stored-state and request semantics checked; not a current browser-default or legal-retention inventory."
		},
		{
			id: "fingerprinting",
			title: "W3C Privacy Working Group: Mitigating Browser Fingerprinting (2025)",
			url: "https://www.w3.org/TR/2025/NOTE-fingerprinting-guidance-20250925/",
			kind: "Group Note",
			note: "Working-group guidance, not endorsement by all W3C Members; no contemporary uniqueness percentages or browser rankings adopted."
		},
		{
			id: "address",
			title: "IETF RFC 6269: Issues with IP Address Sharing (2011)",
			url: "https://www.rfc-editor.org/rfc/rfc6269.html",
			kind: "Network scope reference",
			note: "Original address-sharing and identity limits checked; no forensic attribution, legal opinion or accuracy estimate."
		},
		{
			id: "cgn",
			title: "IETF RFC 6888: Common Requirements for Carrier-Grade NATs (2013)",
			url: "https://www.rfc-editor.org/rfc/rfc6888.html",
			kind: "Network requirements",
			note: "Multiple-subscriber address-sharing scope checked; no claim about a particular person's actual topology."
		},
		{
			id: "storage",
			title: "NIST SP 800-209: Security Guidelines for Storage Infrastructure (2020)",
			url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-209.pdf",
			kind: "Enterprise guidance",
			note: "Replication, copies, access and restore-assurance distinctions checked; no consumer product certification or universal recovery guarantee."
		},
		{
			id: "contingency",
			title: "NIST SP 800-34 Revision 1: Contingency Planning (2010)",
			url: "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf",
			kind: "Historical scoped guidance",
			note: "Original backup/recovery planning and testing concepts checked; no mandatory household schedule or contemporary vendor comparison."
		},
		{
			id: "sanitize",
			title: "NIST SP 800-88 Revision 2: Guidelines for Media Sanitization (2025)",
			url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r2.pdf",
			kind: "Scoped sanitization guidance",
			note: "Current final revision and device-dependent method/validation limits checked; no destructive commands or procedures reproduced."
		},
		{
			id: "disk",
			title: "NIST SP 800-111: Storage Encryption Technologies (2007)",
			url: "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-111.pdf",
			kind: "Historical scope reference",
			note: "At-rest versus authorized plaintext-access boundary checked; historical products and algorithms are not current recommendations."
		},
		{
			id: "code",
			title: "NIST: Security Considerations for Code Signing (2018)",
			url: "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.01262018.pdf",
			kind: "Technical white paper",
			note: "Original signed-malicious-code and provenance limits checked; no current incident, exploitation or software-safety certification."
		},
		{
			id: "ssdf",
			title: "NIST SP 800-218: Secure Software Development Framework 1.1 (2022)",
			url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf",
			kind: "Process guidance",
			note: "Release-integrity and vulnerability response are distinct practices; not proof that signed or updated code is defect-free."
		},
		{
			id: "patch",
			title: "NIST SP 800-40 Revision 4: Enterprise Patch Management Planning (2022)",
			url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-40r4.pdf",
			kind: "Scoped maintenance guidance",
			note: "Deployment verification and continuing risk management checked; no universal restart or prevention-rate rule."
		},
		{
			id: "dmarc",
			title: "IETF RFC 9989: DMARC (2026)",
			url: "https://www.rfc-editor.org/rfc/rfc9989.html",
			kind: "Current protocol specification",
			note: "May 2026 replacement for RFC 7489 verified; original exclusions cover content, non-domain identities and display-name attacks."
		},
		{
			id: "dkim",
			title: "IETF RFC 6376: DomainKeys Identified Mail Signatures (2011)",
			url: "https://www.rfc-editor.org/rfc/rfc6376.html",
			kind: "Identity scope reference",
			note: "Signing-domain identity distinguished from personal authorship; historical algorithm details are not deployment recommendations."
		}
	]
};
