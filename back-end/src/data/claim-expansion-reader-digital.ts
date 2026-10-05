import type { SeedClaim } from "./claims.js";

export const digitalCheckedAt = "2026-10-05T15:40:09.000Z";

function reference(title: string, publisher: string, year: number, url: string, note: string): SeedClaim["sources"][number] {
	return { kind: "technical_reference", title, publisher, year, url, note, stance: "supports", order: 1 };
}

export const readerDigitalSources = {
	mls: reference("RFC 9420: The Messaging Layer Security (MLS) Protocol", "IETF; Barnes and colleagues", 2023, "https://www.rfc-editor.org/rfc/rfc9420.html", "Original abstract and Sections 16.1-16.6 checked for endpoints, metadata and conditional recovery. A specified protocol, not an audit or measured effectiveness score for all messengers."),
	architecture: reference("RFC 9750: The Messaging Layer Security (MLS) Architecture", "IETF; Benjamin Beurdouche and colleagues", 2025, "https://www.rfc-editor.org/rfc/rfc9750.html", "Original architecture, confidentiality and endpoint-compromise discussion checked. Stored plaintext and ongoing device control remain outside unconditional confidentiality; no attack reproduction or brand comparison."),
	hash: reference("FIPS 180-4: Secure Hash Standard", "NIST", 2015, "https://nvlpubs.nist.gov/nistpubs/FIPS/NIST.FIPS.180-4.pdf", "Original digest and one-way-function definitions checked. Historical algorithm inventory is not current approval of every listed algorithm, nor a password-hashing implementation recommendation."),
	passwords: reference("SP 800-63B-4: Authentication and Authenticator Management, Section 3.1.1.2", "NIST", 2025, "https://pages.nist.gov/800-63-4/sp800-63b/authenticators/", "Original final password-verifier section checked for salt, cost and offline guessing. Defined government-system scope; no benchmark, personal risk score or attack instructions adopted."),
	doh: reference("RFC 8484: DNS Queries over HTTPS", "IETF; Paul Hoffman and Patrick McManus", 2018, "https://www.rfc-editor.org/rfc/rfc8484", "Original Sections 8 and 9 checked: encrypted resolver transport, server visibility and HTTP privacy considerations. It does not tunnel all application traffic or remove resolver trust."),
	dnssec: reference("RFC 4033: DNS Security Introduction and Requirements", "IETF; Roy Arends and colleagues", 2005, "https://www.rfc-editor.org/rfc/rfc4033.html", "Original introduction and Section 4 checked for DNS origin/integrity versus explicitly absent confidentiality. No current algorithm suite, deployment certification or universal website safety inferred."),
	dnsprivacy: reference("RFC 9076: DNS Privacy Considerations", "IETF; Stephane Bortzmeyer and Sara Dickinson", 2021, "https://www.rfc-editor.org/rfc/rfc9076.html", "Original observer and resolver privacy discussion checked. DNS observations differ from complete browsing histories; no universal observer-visibility or anonymity guarantee."),
	fingerprinting: reference("Mitigating Browser Fingerprinting in Web Specifications", "W3C Privacy Working Group; Nick Doty and Tom Ritter", 2025, "https://www.w3.org/TR/2025/NOTE-fingerprinting-guidance-20250925/", "Original Group Note status, active/passive/cookie-like definitions and limits checked. Working-group endorsement is not endorsement by W3C or its Members. No study prevalence, contemporary uniqueness percentage or browser ranking adopted."),
	cookies: reference("RFC 6265: HTTP State Management Mechanism", "IETF; Adam Barth", 2011, "https://www.rfc-editor.org/rfc/rfc6265.html", "Original stored-cookie, request and deletion semantics checked. A foundational mechanism description, not a current inventory of browser defaults, legal consent requirements or remote record retention."),
	address: reference("RFC 6269: Issues with IP Address Sharing", "IETF; Matthew Ford and colleagues", 2011, "https://www.rfc-editor.org/rfc/rfc6269.html", "Original address-sharing and address-based identification limits checked. Technical attribution limits, not a legal evidentiary opinion or numerical geolocation accuracy claim."),
	cgn: reference("RFC 6888: Common Requirements for Carrier-Grade NATs", "IETF; Simon Perreault and colleagues", 2013, "https://www.rfc-editor.org/rfc/rfc6888.html", "Original multiple-subscriber address-sharing scope checked. Requirements for a network mechanism do not identify an individual person or prove a specific subscriber's configuration."),
	storage: reference("SP 800-209: Security Guidelines for Storage Infrastructure", "NIST; Ramaswamy Chandramouli and Doron Pinhas", 2020, "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-209.pdf", "Original replication, versioned recovery, management-plane compromise, isolated copies and restore-assurance sections checked. Enterprise guidance is adapted only conceptually; no household recovery guarantee or mandatory schedule inferred."),
	contingency: reference("SP 800-34 Revision 1: Contingency Planning Guide for Federal Information Systems", "NIST; Marianne Swanson and colleagues", 2010, "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-34r1.pdf", "Original backup, recovery-strategy and testing scope checked. Historical federal contingency guidance is not a current product comparison, prescribed consumer configuration or tested recovery outcome."),
	sanitize: reference("SP 800-88 Revision 2: Guidelines for Media Sanitization", "NIST; Ramaswamy Chandramouli and Eric Hibbard", 2025, "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r2.pdf", "September 2025 final revision and original clear/purge/destroy, device dependence and validation distinctions checked. No destructive command, disassembly, procedure or universal overwrite prescription reproduced."),
	disk: reference("SP 800-111: Guide to Storage Encryption Technologies for End User Devices", "NIST; Karen Scarfone, Murugiah Souppaya and Matt Sexton", 2007, "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-111.pdf", "Original Section 3.4 checked for at-rest protection and plaintext access after authentication. Historical device examples and cryptographic choices are not current recommendations or audited product results."),
	code: reference("Security Considerations for Code Signing", "NIST; David Cooper and colleagues", 2018, "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.01262018.pdf", "Original provenance/integrity role and Section 5 risks of signing malicious code checked. No signing-system exploitation, current incident claim or certification of executable behavior."),
	ssdf: reference("SP 800-218: Secure Software Development Framework Version 1.1", "NIST; Murugiah Souppaya, Karen Scarfone and Donna Dodson", 2022, "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-218.pdf", "Original release-integrity practice PS.2 and vulnerability response practices checked. Process guidance does not establish that a signed or updated release contains no vulnerabilities."),
	patch: reference("SP 800-40 Revision 4: Guide to Enterprise Patch Management Planning", "NIST; Murugiah Souppaya and Karen Scarfone", 2022, "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-40r4.pdf", "Original patching as preventive maintenance, deployment verification and continuing risk response checked. No universal update efficacy, restart rule, exploit directions or personal support-contract advice adopted."),
	dmarc: reference("RFC 9989: Domain-Based Message Authentication, Reporting, and Conformance", "IETF; Tim Herr and John Levine", 2026, "https://www.rfc-editor.org/rfc/rfc9989.html", "May 2026 Standards Track replacement for RFC 7489 verified. Original Sections 2.4 and 11.4 exclude content analysis, individual authentication and display-name attacks. No universal spam/phishing prevention rate."),
	dkim: reference("RFC 6376: DomainKeys Identified Mail Signatures", "IETF; Dave Crocker, Tony Hansen and Murray Kucherawy", 2011, "https://www.rfc-editor.org/rfc/rfc6376.html", "Original signing-identity and verifier-output distinctions checked. Domain responsibility differs from purported personal authorship; historical algorithm details are not current deployment instructions.")
} satisfies Record<string, SeedClaim["sources"][number]>;

interface DigitalReview {
	key: string;
	title: string;
	slug: string;
	bottomLine: string;
	stableCore: string[];
	editorSummary: string;
	qualification: string;
	question: string;
	gap: string;
	tags: string[];
	sources: Array<keyof typeof readerDigitalSources>;
}

const reviews: DigitalReview[] = [
	{
		key: "transport",
		title: "Does an encrypted connection to a messaging server mean end-to-end encryption?",
		slug: "does-an-encrypted-connection-to-a-messaging-server-mean-end-to-end-encryption",
		bottomLine: "No. Transport encryption can protect a connection between a device and a service while allowing that service to receive readable messages. End-to-end encryption instead places the protected message's decryption at the communicating endpoints. The word encrypted alone does not tell you which parties possess the necessary keys or where readable copies exist.",
		stableCore: ["A conceptual route can contain a sender, a delivery server and a recipient. Separate encrypted connections on the two legs do not establish that the server lacks access to the message between them. Message-layer protection and connection-layer protection have different boundaries. The MLS protocol and architecture explicitly distinguish these roles; neither document certifies that every service using an encrypted connection implements MLS or any other end-to-end design.", "Conversely, protecting message content end to end does not make connection protection redundant. Transport protection can conceal additional traffic information from observers on a network segment and support the surrounding service exchange. A system may use both layers for different purposes. Naming the layer is therefore more informative than counting how many times a provider says encryption, and a server's inability to read selected content is not an all-information anonymity claim."],
		editorSummary: "Ask where plaintext appears and which party controls each decryption step. A service's documented architecture, not a connection icon, answers that question. This review does not inspect any messenger, encrypted backup setting or implementation. The earlier HTTPS review addresses website trust rather than the separation between a delivery service and message endpoints. Missing architecture evidence should remain an unanswered product-specific question, not be filled with a guessed brand guarantee.",
		qualification: "Conceptual transport and message-layer boundaries; actual endpoint, key and backup arrangements require service-specific evidence.",
		question: "Which components can access readable messages in the documented service architecture?",
		gap: "Adds the message-layer versus connection-layer confidentiality boundary, not another judgment about whether an HTTPS website is honest.",
		tags: ["transport encryption end-to-end messaging server", "encrypted connection plaintext keys"],
		sources: ["architecture", "mls"]
	},
	{
		key: "metadata",
		title: "Does end-to-end encryption hide all message metadata?",
		slug: "does-end-to-end-encryption-hide-all-message-metadata",
		bottomLine: "No. Keeping message content confidential does not automatically hide every associated identifier, timing, length or delivery relationship. Some metadata can receive additional protection, but exposure depends on the protocol, delivery architecture and observer. It is also wrong to conclude that every end-to-end service exposes exactly the same metadata.",
		stableCore: ["Content is what a message says; metadata describes aspects of its handling or context. The MLS specification protects some sender information while explicitly discussing other group fields, message lengths and frequency that can remain observable. Delivery-system choices affect what outsiders learn. These distinctions show why the answer must name particular information and a particular observer instead of equating encryption with either total invisibility or no privacy at all.", "An observer learning that communication occurred need not have recovered its words. Conversely, hidden words do not by themselves prevent all inferences from communication patterns. The strength of an inference depends on the available records, ambiguity and other information. A protocol field list is not a measured prediction of someone's relationships, and this review supplies neither a re-identification algorithm nor a probability that a given person can be identified."],
		editorSummary: "Ask a provider's privacy claim separately about content, routing, account records and traffic patterns. Do not assume a service using one protocol has the same full architecture as another. Additional anonymity or metadata-minimization features need their own evidence. This question is distinct from whether a delivery server can decrypt content and from whether a compromised endpoint can read it. Where current retention or implementation details are unavailable, the library does not establish them.",
		qualification: "Specified MLS properties and general content/metadata distinction; no audit of a service's current collection, retention or inference capabilities.",
		question: "Which metadata fields and observers are actually included in a particular privacy claim?",
		gap: "Adds information-category and observer limits to message confidentiality; no baseline review examines messaging metadata.",
		tags: ["end-to-end encryption message metadata timing length", "content confidentiality traffic patterns"],
		sources: ["mls", "architecture"]
	},
	{
		key: "endpoint",
		title: "Does end-to-end encryption protect messages on a compromised device?",
		slug: "does-end-to-end-encryption-protect-messages-on-a-compromised-device",
		bottomLine: "Not unconditionally. A device that legitimately displays a message has access to readable content at that stage. Someone controlling the relevant application or device may obtain it without breaking the message encryption. Certain protocols can protect past or future messages under defined recovery conditions, but continuing endpoint control is not solved by an encryption label.",
		stableCore: ["The MLS architecture explicitly discusses full-state compromise and applications retaining unencrypted messages. The security boundary cannot be inferred solely from the strength of the encryption used during delivery. A trusted recipient can also keep or share a readable copy. Those facts do not make transport or message encryption useless; they identify an observer and access path that differ from passive interception on the network.", "Forward secrecy concerns selected earlier messages after later key compromise; post-compromise security concerns recovering protection for later messages under stated updates and remediation. Neither phrase means that an actively controlled device becomes trustworthy while the adversary continues to operate it. Deleted key material, retained plaintext, compromised credentials and the scope of control matter. The architecture discusses several compromise models rather than giving one universal safety result for every device state."],
		editorSummary: "Separate a protocol recovering its key state from a person recovering control of a device, and separate transmitted messages from readable local history. This review does not diagnose malware, test recovery or recommend a forensic procedure. The existing passkey review mentions device control as a login limit; it does not answer this message-confidentiality and time-bound recovery proposition. Any product-specific promise about restored confidentiality needs evidence about both its architecture and the actual compromise.",
		qualification: "Endpoint access and conditional protocol recovery; no incident diagnosis, compromise prevalence or guaranteed remediation outcome.",
		question: "Which local records and credentials remain exposed after a specified compromise and recovery?",
		gap: "Adds endpoint plaintext and conditional past/future message protection, separate from the existing passkey authentication question.",
		tags: ["end-to-end encryption compromised device plaintext", "forward secrecy post-compromise security"],
		sources: ["architecture", "mls"]
	},
	{
		key: "hashing",
		title: "Is hashing a password the same as encrypting it?",
		slug: "is-hashing-a-password-the-same-as-encrypting-it",
		bottomLine: "No. Encryption is designed to permit authorized recovery with the relevant key; a cryptographic hash produces a digest rather than a ciphertext to decrypt. Password hashing must also address guessing of candidate passwords. Calling a stored value hashed does not prove that its scheme, salt, cost or surrounding access controls are appropriate.",
		stableCore: ["A digest can support a comparison without being a reversible storage format. A one-way design is not a promise that a predictable input cannot be guessed and compared. NIST's final digital-identity guidance explicitly requires suitable salted password hashing with a cost factor to make guesses more expensive. A general-purpose hash definition therefore does not establish that any fast digest is a suitable complete password-verifier design.", "A salt distinguishes otherwise similar stored computations; it is not a secret password substitute and does not supply missing unpredictability to the original password. Scheme choice and cost are separate from the input's guessability. This review deliberately omits algorithm settings, guessing instructions and performance numbers. The older Secure Hash Standard is cited for digest terminology, not as current approval of every algorithm in its historical list."],
		editorSummary: "Read a breach report by separating what was exposed from how it was represented and protected. A hashed-password file does not automatically mean that plaintext passwords were disclosed, but it also does not establish that every account is safe. Assessments need the actual verifier scheme and circumstances. This question concerns storage representation and offline guessing, not the existing reviews of password composition, reuse, managers or calendar-driven password changes. No personal probability of account compromise follows from the word hash alone.",
		qualification: "Definition and final NIST verifier requirements; no implementation advice, breach assessment or guarantee against guessing.",
		question: "What verifier scheme and actual exposure are established by the evidence in a particular case?",
		gap: "Adds one-way digest versus reversible encryption and password-verifier storage limits, rather than another password-choice rule.",
		tags: ["password hashing encryption salt cost digest", "hashed password offline guessing"],
		sources: ["passwords", "hash"]
	},
	{
		key: "doh",
		title: "Does encrypted DNS hide all of your browsing from everyone?",
		slug: "does-encrypted-dns-hide-all-of-your-browsing-from-everyone",
		bottomLine: "No. DNS over HTTPS protects the DNS exchange between its client and chosen resolver; it does not encrypt or anonymously route every application connection. The resolver still handles the queries, and other observers may have other information. Reducing exposure on one network segment is useful without being complete browsing anonymity.",
		stableCore: ["DNS helps resolve names; it is not identical to fetching all of a website's content. The DoH specification distinguishes privacy on the wire from privacy in the server, including the resolver's ability to correlate requests. Encrypting the exchange changes which network observers can directly read that exchange, but it does not erase the resolver or establish its retention policy. DNS Privacy Considerations describes multiple observers and disclosure paths.", "Application traffic, destination addresses and signed-in accounts remain separate questions. Their visibility depends on the surrounding protocols and system, not solely on the DNS transport. A DNS request is also not conclusive evidence that a person intentionally viewed a particular page: software activity and the granularity of names matter. This review does not claim that every network operator can read encrypted page content, or that hiding DNS automatically hides every destination."],
		editorSummary: "Ask which exchange a privacy setting protects and who receives the protected request. Treat promises about logs, anonymous routing or application content as separate claims needing separate documentation. This review neither configures a resolver nor ranks providers. The existing VPN review concerns routing and provider trust, while this question concerns the scope of one name-resolution transport. If a particular device sends some requests by another path, a general DoH definition alone does not establish what that device actually hides.",
		qualification: "DoH client-resolver transport and observer limits; actual request routing, retention and application behavior are not audited.",
		question: "Which resolver and transport actually handle a device's relevant name queries?",
		gap: "Adds encrypted name-resolution scope and resolver visibility; the baseline VPN review does not explain DNS transport.",
		tags: ["encrypted DNS DNS over HTTPS resolver privacy", "DoH browsing anonymity DNS queries"],
		sources: ["doh", "dnsprivacy"]
	},
	{
		key: "dnssec",
		title: "Does DNSSEC encrypt DNS lookups?",
		slug: "does-dnssec-encrypt-dns-lookups",
		bottomLine: "No. DNSSEC is designed to authenticate the origin and integrity of DNS data, not to provide confidentiality for the lookup. An encrypted DNS transport addresses a different property. These mechanisms can be combined, but a signed DNS answer is not proof that the query was hidden or that the destination website is trustworthy.",
		stableCore: ["The DNSSEC introductory specification explicitly excludes confidentiality from its design. Its signature and validation model concerns whether the answer has the expected authenticated provenance and integrity under the relevant trust chain. That question differs from whether an observer can see a name query crossing a network. Giving both mechanisms names containing security does not make their protected objects or observer models interchangeable.", "An authenticated answer may legitimately point to a service whose content is misleading or harmful. DNS data integrity is not a review of the website's business practices, downloads or claims. Conversely, transport encryption to a resolver does not by itself establish all DNSSEC validation properties. Actual protection depends on what validation is performed, which channel is protected and which components are trusted, rather than counting one security badge as complete coverage."],
		editorSummary: "A useful explanation names the property first: data origin and integrity, exchange confidentiality, or confidence in the destination's behavior. The references support those distinctions rather than an audit of any live resolver or domain. Historical DNSSEC algorithm details are not adopted as current recommendations. This question is separate from whether encrypted DNS hides all browsing and from whether an HTTPS website is honest. An unavailable deployment check remains unavailable, not proof that signatures or encryption were correctly configured.",
		qualification: "Specified DNSSEC integrity/origin role versus encrypted transport; no deployment, algorithm or website-safety certification.",
		question: "Which component validates the answer and which connection, if any, protects the lookup?",
		gap: "Adds authenticated DNS data versus lookup confidentiality, not a second formulation of the encrypted-DNS anonymity question.",
		tags: ["DNSSEC DNS encryption signatures integrity", "DNS lookup confidentiality validation"],
		sources: ["dnssec", "doh"]
	},
	{
		key: "tracking",
		title: "Does blocking cookies prevent all website tracking?",
		slug: "does-blocking-cookies-prevent-all-website-tracking",
		bottomLine: "No. Cookies are one way to maintain an identifier or session, but websites can also associate activity through accounts, other state or browser characteristics. Blocking particular cookies can reduce that mechanism's exposure without eliminating every tracking route. It does not follow that every browser can always be uniquely identified without cookies.",
		stableCore: ["The cookie specification describes browser-stored values returned with relevant requests. The W3C Privacy Working Group's fingerprinting note describes active, passive and cookie-like ways of correlating users, browsers or devices. Those mechanisms need not all use the ordinary cookie store. Their existence defeats a blanket all-tracking claim, but the note does not supply a contemporary success rate for identifying every browser in the population.", "Identification, linking two visits and establishing a person's real-world identity are different achievements. A signed-in account can provide an association without a unique device fingerprint. Fingerprint usefulness depends on exposed characteristics, stability, audience and mitigations; similarity is not universal proof of identity. The Group Note is working-group guidance, not endorsement by all W3C Members, an empirical meta-analysis or a comparative certification of current browser products."],
		editorSummary: "Read a blocking claim by naming which state, identifier or observation it blocks. First-party and third-party contexts, other storage and deliberate login can change the question. Historical fingerprinting percentages found during discovery were not adopted because original full papers were unavailable. No tracking code or bypass instructions are provided. This review concerns identification mechanisms rather than the existing private-window mode question, and it does not conclude that a cookie control is either useless or a comprehensive anonymity guarantee.",
		qualification: "Mechanism existence and distinctions, not current tracking prevalence, uniqueness rates, legal consent advice or browser rankings.",
		question: "Which identifiers and observations remain available in a specified browser and service context?",
		gap: "Adds cookie versus non-cookie association mechanisms; baseline private browsing addresses a session mode, not this mechanism inventory.",
		tags: ["block cookies website tracking browser fingerprinting", "non-cookie identification accounts"],
		sources: ["fingerprinting", "cookies"]
	},
	{
		key: "cookieDeletion",
		title: "Does deleting browser cookies erase a website's records of you?",
		slug: "does-deleting-browser-cookies-erase-a-websites-records-of-you",
		bottomLine: "No. Removing a cookie from the browser changes local state; it does not automatically command the receiving service to erase records it already holds. It may interrupt a cookie-based session or identifier, but later login or other associations can reconnect activity. Remote data deletion is a separate operation with service-specific limits.",
		stableCore: ["The cookie mechanism stores values in a user agent and attaches applicable values to later requests. Ending that storage can stop later return of the removed value. It does not undo requests already received or rewrite a remote database. Those are different systems and different operations. A browser control's success at removing a local item therefore cannot establish successful deletion of every copy held by another party.", "Nor is the ordinary cookie store the only possible association path. Accounts, other browser state and exposed characteristics can support linkage under appropriate conditions. The fingerprinting guidance describes such distinctions without proving that every cleared browser is successfully re-identified. Removing an identifier can still reduce continuity for observers who relied on it. A surviving association and universal re-identification should not be confused with each other."],
		editorSummary: "Ask whether the claim is about future browser requests, existing service records or a legal data-erasure process. This review covers the first two technical boundaries and makes no legal promise about retention rights, deadlines or exceptions. It neither inspects a service nor tests its account-deletion workflow. The earlier incognito review concerns a private browsing session's retained local information; this question concerns the effect of an explicit cookie deletion on remote records. An unknown remote retention policy remains unknown rather than inferred from a clean browser screen.",
		qualification: "Local cookie removal versus remote record retention; no legal-erasure determination, product test or guaranteed re-identification rate.",
		question: "Which party actually received and completed a requested remote record-deletion operation?",
		gap: "Adds the causal boundary between explicit cookie removal and server-held records, not another private-window feature description.",
		tags: ["delete cookies website records remote history", "local state account data deletion"],
		sources: ["cookies", "fingerprinting"]
	},
	{
		key: "address",
		title: "Does a public IP address uniquely identify a person?",
		slug: "does-a-public-ip-address-uniquely-identify-a-person",
		bottomLine: "No. A public address can be shared by several devices or subscribers, and network attribution does not by itself establish who performed an action. A timestamp, port, provider records and other context can matter to technical association, but even a subscriber association is not automatically identification of the individual using a device.",
		stableCore: ["The IETF's address-sharing discussion and carrier-grade NAT requirements explicitly contemplate multiple subscribers sharing public IPv4 addresses. Ordinary network address translation can also place several devices behind one outward-facing address. A server observing that address therefore does not necessarily observe a one-to-one person identifier. The specifications describe possible network arrangements rather than certify which arrangement a particular user actually has.", "An address can change over time, and multiple people may use a subscriber's connection or device. Those distinctions separate a traffic record, a network allocation, a device and a human actor. Combining more records can strengthen a particular technical association, but the completeness and reliability of those records remain separate evidence questions. This review does not provide surveillance procedures, forensic attribution instructions or a numerical score for IP geolocation."],
		editorSummary: "Interpret a claim of identification by asking what was actually associated and over which time interval. Shared addresses do not make all network records meaningless, but an observed address is not a universal personal identity card. The existing VPN review discusses routing and provider trust; it does not establish address-to-person uniqueness. This is a technical boundary rather than an opinion about admissibility, guilt or legal proof. Where the relevant topology or records are unavailable, the library does not identify the person behind an event.",
		qualification: "Network address-sharing and attribution limits; no legal opinion, geolocation accuracy estimate or case-specific identification.",
		question: "Does the evidence establish an address, subscriber, device or actual human actor?",
		gap: "Adds address/subscriber/device/person attribution distinctions independently of the existing VPN anonymity review.",
		tags: ["public IP address identify person shared NAT", "subscriber device attribution carrier-grade NAT"],
		sources: ["address", "cgn"]
	},
	{
		key: "sync",
		title: "Is file synchronization automatically a backup?",
		slug: "is-file-synchronization-automatically-a-backup",
		bottomLine: "No. Synchronization can keep locations aligned, including propagating an unwanted change or deletion. A recovery copy must preserve the state needed after a relevant failure and remain usable. A service can combine synchronization with version history or backup features, but the presence of sync alone does not establish those recovery properties.",
		stableCore: ["NIST's storage guidance distinguishes replication, point-in-time copies and continuous data protection that retains recoverable history. Keeping another location current solves a different problem from recovering an earlier intact state. In a conceptual example, copying a mistaken edit to every current replica produces several copies of the mistake. That example is a logical distinction, not a measured claim about any named cloud service's retention policy.", "Version history may help if the required version exists, remains accessible and can actually be restored. Retention limits, account access, failure boundaries and dependencies matter. A copy on the same affected system may fail with that system; a remotely stored copy may still share compromised administrative control. The recovery question therefore includes both what state survives and which access path remains available, rather than simply where an icon says the file lives."],
		editorSummary: "Ask which failure the proposed copy addresses: a device loss, mistaken edit, account loss or broader compromise. The answer can differ for the same service. The original federal contingency and enterprise storage guidance supply concepts, not certification of a consumer product or a mandatory household schedule. This review adds file-state retention; the existing synced-passkey question concerns credential access and recovery rather than document version history. An untested recovery claim should be described as untested, even when the current files visibly match across devices.",
		qualification: "Synchronization and recoverable-state concepts; actual version retention, access and recovery capabilities are service-specific and untested here.",
		question: "Which earlier intact state survives the particular failure being considered?",
		gap: "Adds file-state recovery versus current replication, distinct from the baseline synced-authenticator access question.",
		tags: ["file synchronization backup version history deletion", "sync replication recovery copies"],
		sources: ["storage", "contingency"]
	},
	{
		key: "reachableBackup",
		title: "Can ransomware affect a backup that remains writable from the compromised system?",
		slug: "can-ransomware-affect-a-backup-that-remains-writable-from-the-compromised-system",
		bottomLine: "Yes, if the compromised access can modify or delete the relevant recovery copy. Calling a storage location a backup does not remove its permissions or shared administrative dependencies. Isolated, independently controlled or appropriately immutable copies can address particular failure paths, but no single label guarantees complete recovery or prevents prior data disclosure.",
		stableCore: ["NIST's storage guidance identifies compromised management systems as a risk to existing and future backups. It separately discusses isolated recovery copies, limited host access and restoration assurance. The mechanism is access to a protected asset, not an assumption that all backup software behaves alike. A copy that survives a failed drive can still be vulnerable to a different event involving its modification rights or management plane.", "Physical disconnection and properly enforced immutability are different mechanisms with different dependencies. Protection can be undermined by missing historical copies, unavailable credentials, expired retention or incomplete recovery components even when the data itself was not altered. A backup can also preserve availability without undoing information already taken from the original system. These distinctions keep recovery, confidentiality and incident containment from being collapsed into one yes-or-no badge."],
		editorSummary: "Ask what the compromised system can reach and change, and what remains outside that control. This is a conceptual explanation, not instructions to build ransomware or test destructive access. Enterprise and federal guidance do not establish a universal consumer architecture or a personal recovery probability. This review differs from the synchronization question: even a genuine historical backup may share the compromised access path. Product-specific assertions about protected copies require evidence about their actual isolation, permission enforcement and recovery behavior.",
		qualification: "Conditional writable-access and shared-control risk; no destructive test, product certification or guarantee of complete incident recovery.",
		question: "Which recovery copies remain intact and accessible outside the compromised control boundary?",
		gap: "Adds the access/control boundary of genuine recovery copies, not simply whether synchronized files retain historical versions.",
		tags: ["ransomware writable backup isolated recovery copies", "backup permissions immutability management control"],
		sources: ["storage", "contingency"]
	},
	{
		key: "deletion",
		title: "Does deleting a file guarantee that its data cannot be recovered?",
		slug: "does-deleting-a-file-guarantee-that-its-data-cannot-be-recovered",
		bottomLine: "No. Ordinary file removal does not by itself establish that the underlying data or every other copy has been sanitized. Recoverability depends on the storage system, encryption, device behavior, snapshots and copies. It is equally unjustified to promise that every deleted file remains recoverable: a particular outcome needs evidence about the actual system.",
		stableCore: ["NIST's current media-sanitization guidance distinguishes clear, purge and destroy methods by their defined goals and conditions. A user interface no longer listing a file is not the same evidence as validated sanitization of the relevant medium. Different technologies expose different storage regions and support different techniques. A historical multi-pass rule cannot simply be transferred to every modern device, and this review supplies no destructive procedure or command.", "The target medium is also not the entire universe of copies. A successfully sanitized local device does not remove independently held backups, snapshots, recipient copies or remote replicas. Conversely, deletion behavior and encryption can make some data unavailable in particular systems. This is why the statement concerns absence of a universal guarantee rather than universal survival of deleted data. The storage guidance's copy lifecycle and recovery distinctions support that boundary."],
		editorSummary: "Ask which data, which medium, which remaining copies and what evidence of the intended outcome are involved. Device-specific official documentation and an appropriate validation process are separate from this conceptual review. The earlier cookie-deletion question concerns local identifiers and remote service records; this one concerns file removal and underlying storage. No forensic recovery, physical destruction, disassembly or wiping instructions are provided. The library cannot certify disposal of a device it has not inspected, or infer recoverability from a file's absence in a directory.",
		qualification: "File removal versus scoped media sanitization and other copies; no destructive guidance or device-specific recoverability result.",
		question: "What establishes sanitization of the intended data and the relevant copies on the actual storage system?",
		gap: "Adds file/storage sanitization and copy boundaries; neither cookie removal nor synced credential recovery answers this proposition.",
		tags: ["deleted file recovery media sanitization erase", "storage snapshots copies clear purge destroy"],
		sources: ["sanitize", "storage"]
	},
	{
		key: "disk",
		title: "Does full-disk encryption prevent malware from reading files after you unlock the device?",
		slug: "does-full-disk-encryption-prevent-malware-from-reading-files-after-you-unlock-the-device",
		bottomLine: "Not by itself. Storage encryption protects data under a defined at-rest and key-access boundary. Once the system makes files readable to an authorized process, malicious software with the relevant access may read them too. Encrypting storage is useful, but it is not a replacement for operating-system and application access controls.",
		stableCore: ["NIST's storage-encryption guide explicitly distinguishes protecting a lost or stolen device from protecting plaintext available after authentication. An application reading a file must receive a usable representation, so the relevant question includes who controls or can access that application context. The fact that bytes are encrypted on the medium does not require every use of them to remain unreadable inside the running system.", "This does not mean every process automatically receives all files after any unlock. Access controls, separate containers, key handling and device states can impose further boundaries. Those are additional properties that require implementation evidence. The older guide's named products and cryptographic examples are not adopted as current recommendations, and the broader storage guidance distinguishes unauthorized access and malware risks from the existence of encryption itself."],
		editorSummary: "Ask whether the threat is removal of the locked storage medium or control of software during legitimate use. A protection can perform well against the first without eliminating the second. This review does not inspect a device, diagnose malware or prescribe a disk configuration. It addresses local at-rest confidentiality rather than the separate end-to-end messaging endpoint question. No universal stolen-device safety, memory-state behavior or account compromise probability is inferred from an encryption setting. If its actual key and access arrangements are unavailable, the protection remains unverified here.",
		qualification: "At-rest versus authorized plaintext access; actual process rights, keys and device states are not audited.",
		question: "Which processes can access plaintext and keys in the relevant device state?",
		gap: "Adds local storage encryption and runtime access, a different protected object from message-layer endpoint confidentiality.",
		tags: ["full-disk encryption unlocked device malware plaintext", "storage encryption at rest application access"],
		sources: ["disk", "storage"]
	},
	{
		key: "signing",
		title: "Does a valid software signature prove that an app is safe?",
		slug: "does-a-valid-software-signature-prove-that-an-app-is-safe",
		bottomLine: "No. A valid code signature supports a claim about the signed code's provenance and integrity under the relevant trust system. It does not prove that the program is harmless, free of vulnerabilities or appropriate for your needs. NIST explicitly discusses malicious or unauthorized code being signed through mistakes or compromise of development and signing processes.",
		stableCore: ["Signature validation and behavior assessment answer different questions. Checking a signature can detect certain changes and establish a relationship to a trusted signing key, but it does not inspect every action the signed program may perform. A deliberately harmful program can retain exactly the bytes its signer intended. The code-signing white paper therefore treats governance, key protection and authorization as important dependencies rather than defining signatures as universal safety approvals.", "The Secure Software Development Framework separately describes release-integrity verification and practices for reducing and responding to vulnerabilities. Their separation matters: provenance is valuable even when it is not a complete security review. Certificate status, the relevant signer, what content was covered and the integrity of the trust path affect interpretation. This review does not claim that an operating system's entire application-review process consists only of checking a signature."],
		editorSummary: "Read a download badge by asking what was checked, who made the claim and which risks remain outside it. Signature, store review, permission enforcement and behavioral testing are not interchangeable evidence types. This question does not inspect an executable, rank vendors or describe how to misuse a signing system. The existing HTTPS trust question concerns a connection and website operator; software signatures concern an artifact and signing provenance. A familiar publisher can still ship a defect, and an unexamined executable is not certified safe by this library.",
		qualification: "Code-signing provenance/integrity under trust assumptions; no executable audit, product endorsement or current incident claim.",
		question: "Which artifact, signer and independent behavior checks support a particular safety claim?",
		gap: "Adds signed-artifact provenance versus executable behavior, not another interpretation of an HTTPS connection badge.",
		tags: ["valid software signature app safety code signing", "signed code provenance vulnerabilities"],
		sources: ["code", "ssdf"]
	},
	{
		key: "updates",
		title: "Does keeping software updated prevent every cyberattack?",
		slug: "does-keeping-software-updated-prevent-every-cyberattack",
		bottomLine: "No. Updates can address vulnerabilities and other defects they actually cover, making maintenance an important risk-reduction measure. They do not eliminate every unknown flaw, unsafe configuration, compromised credential or harmful user action. A patch must also be successfully applied and take effect; downloading it is not automatically evidence that the protection is active.",
		stableCore: ["NIST's patch-management guidance treats patching as preventive maintenance within continuing risk management. It distinguishes finding relevant assets and patches, deploying a response, verifying its effect and monitoring the result. Whether a restart or other action is required depends on the update and environment, so neither always restart nor never restart follows from this general review. A specific fixed vulnerability is a narrower claim than all attacks being impossible.", "The development framework likewise includes vulnerability discovery, response and process improvement rather than a proof of software perfection. New information or an overlooked component can change the exposure after a maintenance check. Those limits do not justify abandoning updates; they explain why patching works alongside other controls. This review assigns no universal percentage of attacks prevented and does not treat all devices, software versions or adversaries as equivalent."],
		editorSummary: "Ask which vulnerability or defect an update addresses, whether the affected component is in use and what establishes effective deployment. That evidence differs from a success notification or a generic up-to-date label. This is a conceptual reading guide, not an incident assessment, exploit description or instruction to modify a live system. Existing password-maintenance content concerns authenticator policy rather than software lifecycle. For a named product with missing current support or patch evidence, the library does not establish its remaining exposure or promise that a particular update solves it.",
		qualification: "Scoped patching and continuing risk management; no universal efficacy, restart policy, support determination or exploitation guidance.",
		question: "Which affected components have a verified effective fix, and which risk paths remain?",
		gap: "Adds software lifecycle, patch scope and verified activation; baseline account credential policies do not answer this maintenance question.",
		tags: ["software updates prevent attacks patch deployment", "updated software vulnerabilities maintenance"],
		sources: ["patch", "ssdf"]
	},
	{
		key: "email",
		title: "Does a passing email-authentication check prove that the message is truthful?",
		slug: "does-a-passing-email-authentication-check-prove-that-the-message-is-truthful",
		bottomLine: "No. Domain authentication can establish specified properties of a message's domain use or signature; it does not verify the truth of its claims or the identity implied by its display name. The current DMARC specification explicitly excludes content analysis and authentication of entities other than domains. A deceptive message can come from an authenticated domain.",
		stableCore: ["DMARC relates the author domain to qualifying authenticated identifiers and communicates domain-owner handling preferences. DKIM separately establishes a signing-domain identity under its verification rules, which need not be the same as proving a particular person's authorship. The May 2026 DMARC replacement retains explicit limits on content and display-name attacks. A pass result should be interpreted within the checked mechanism rather than as approval of the entire message.", "A familiar-looking sender name, domain reputation and message content remain distinct pieces of evidence. A malicious sender can control its own legitimate domain, and an otherwise legitimate account or service can be compromised. These possibilities do not make domain authentication worthless: it helps address specified unauthorized domain use. They do rule out treating its success as a universal fraud detector, individual identity certificate or factual endorsement."],
		editorSummary: "Ask what domain or signature was authenticated and what independent evidence supports the message's request or factual assertion. This review does not analyze private mail, expose raw headers, assign spam scores or teach impersonation. The older RFC 7489 was inspected for history but is not used as the current DMARC reference; RFC 9989 supplies the current scope. This new question is about message-domain authentication, not typed login codes or an HTTPS site's honesty. An authenticated message still needs context, and absent content verification remains absent.",
		qualification: "Current DMARC domain scope and DKIM identity semantics; no mail-system audit, personal identity proof or measured fraud-prevention rate.",
		question: "What independently establishes the purported person, request and factual claim beyond domain authentication?",
		gap: "Adds authenticated email-domain provenance versus personal authorship and truth; existing login and HTTPS reviews cover different objects.",
		tags: ["email authentication DMARC DKIM truthful message", "sender display name domain identity phishing"],
		sources: ["dmarc", "dkim"]
	}
];

export const readerDigitalSlugs: Record<string, string> = Object.fromEntries(reviews.map(review => [review.key, review.slug]));

export const readerDigitalClaims: SeedClaim[] = reviews.map((review, index) => ({
	topicSlug: "digital-security-and-privacy",
	title: review.title,
	slug: review.slug,
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	confidenceScore: 75,
	bottomLine: review.bottomLine,
	stableCore: review.stableCore,
	editorSummary: review.editorSummary,
	openQuestions: [review.question],
	whatWouldChangeMinds: [`A verified specification revision, original correction or implementation evidence that changes this boundary requires reassessment. ${review.qualification}`],
	misconceptions: [review.title, "A named security mechanism is not a certification of every property of the surrounding system."],
	misconceptionTags: review.tags,
	uncertaintySummary: review.qualification,
	uncertaintyDrivers: [{ type: "implementation", detail: review.qualification }],
	searchDatabases: ["Original IETF specifications and architecture", "Original NIST guidance and definitions", "Original W3C Privacy Working Group Note", "Consensus.app fingerprinting discovery; inaccessible original papers not used as evidence"],
	searchCutoffAt: digitalCheckedAt,
	inclusionRules: ["Distinguish confidentiality, integrity, identity, availability and factual trust.", "Name the protected information, observer, state and control boundary; retain publication dates and source status."],
	exclusionRules: ["No attack instructions, destructive commands, private mail or incident diagnosis.", "No invented reader requests, current product rankings, expert polls, fingerprinting percentages or universally guaranteed protection."],
	appraisalTools: ["Original technical scope, boundary and counterexample checks; no formal study appraisal or product audit", "Original source-context check, not exhaustive integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "Standards and guidance can share authors, institutional provenance and references. MLS protocol and architecture describe one related design; NIST documents are not independent efficacy trials. The legacy confidence score is editorial, not a measured fraction of researchers agreeing or attacks prevented. No actual reader demand or contemporary product population was measured.",
	coiSummary: "IETF and W3C contributors include industry participants; the sanitization reference includes a semiconductor-industry coauthor. Institutional provenance is not product independence or certification. Funding and conflicts were not exhaustively audited; no vendor is endorsed.",
	lastRetractionCheckAt: digitalCheckedAt,
	evidenceSummaries: [{ question: review.title, population: review.qualification, finding: review.bottomLine, effectDirection: "supports", magnitude: "A technical distinction or conditional mechanism, not a measured attack-prevention percentage.", certainty: "moderate", limitations: [review.qualification, "No product testing, incident analysis or expert-agreement survey"] }],
	institutionalAnchors: [{ name: readerDigitalSources[review.sources[0]!].publisher, role: "Technical scope reference, not formal scientific consensus, a clinical guideline or product approval" }],
	changeLog: [{ date: digitalCheckedAt, kind: "publication", summary: `New review: ${review.title}` }],
	readerAnnouncement: { id: `fa45f3a0-82b1-485f-bbe5-f31cd74a${String(index + 1).padStart(4, "0")}`, date: digitalCheckedAt, kind: "new_review", bottomLineImpact: "new", summary: `New review: ${review.title}` },
	surveillanceSpec: { focus: review.title, cadenceDays: 90, watchTerms: review.tags, integrityMonitors: ["Original corrections and errata for cited references"], guidelineMonitors: ["IETF, NIST and W3C source-status or scope revisions"], triggerRules: ["Reassess a verified source revision or applicability finding that changes the stated boundary."] },
	sources: review.sources.map((key, index) => ({ ...readerDigitalSources[key], order: index + 1, isAnchor: index === 0, appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: digitalCheckedAt, statusSources: [readerDigitalSources[key].url!] }))
}));

export const readerDigitalGaps = reviews.map(review => ({ slug: review.slug, gap: review.gap, relatedExistingSlugs: ["do-passkeys-prevent-phishing-and-all-account-takeovers", "does-installing-a-password-manager-eliminate-password-reuse", "do-synced-passkeys-prevent-lockout-when-a-device-is-lost"] }));
