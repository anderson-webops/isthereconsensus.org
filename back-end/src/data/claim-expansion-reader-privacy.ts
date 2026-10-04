import type { SeedClaim } from "./claims.js";

export const privacyCheckedAt = "2026-10-04T20:57:54.000Z";
export const readerPrivacySlugs = {
	privateBrowsing: "does-private-or-incognito-browsing-make-you-anonymous",
	https: "does-https-or-a-padlock-mean-a-website-is-trustworthy",
	passwordRules: "do-password-symbol-and-character-rules-guarantee-strong-passwords",
	vpn: "does-a-vpn-make-you-completely-anonymous-online"
};
export const readerPrivacyGaps = [
	{ slug: readerPrivacySlugs.privateBrowsing, gap: "Examines the boundary between local browsing records and remote observation; no existing canonical review covers private browsing.", relatedExistingSlugs: [] },
	{ slug: readerPrivacySlugs.https, gap: "Distinguishes transport protection from the trustworthiness of the receiving operator, not authentication to a user account.", relatedExistingSlugs: [] },
	{ slug: readerPrivacySlugs.passwordRules, gap: "Examines password creation requirements and guessing resistance, separately from manager adoption and calendar-driven expiry.", relatedExistingSlugs: ["does-installing-a-password-manager-eliminate-password-reuse", "does-changing-passwords-every-month-improve-account-security"] },
	{ slug: readerPrivacySlugs.vpn, gap: "Examines network routing, remaining identification and provider trust, not local history deletion or a repeat of the HTTPS review.", relatedExistingSlugs: [] }
];

function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return { appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: privacyCheckedAt, statusSources: [entry.url!], isAnchor: false, ...entry };
}

export const readerPrivacySources = {
	chrome: source({ kind: "context", title: "Browse in Incognito mode", publisher: "Google Chrome Help", url: "https://support.google.com/chrome/answer/95464?hl=en", stance: "supports", isAnchor: true, order: 1, note: "Current first-party product documentation checked for session data, downloads, bookmarks and remote visibility. Describes Chrome, not every browser or a forensic guarantee. No product effectiveness percentage extracted." }),
	firefox: source({ kind: "context", title: "Private Browsing: Use Firefox without saving history", publisher: "Mozilla Support", url: "https://support.mozilla.org/en-US/kb/private-browsing-use-firefox-without-history", stance: "supports", order: 2, note: "Current first-party scope and exceptions checked. Vendor documentation is not independent testing; its broad local-trace wording is not adopted as a forensic promise." }),
	disclosures: source({ kind: "landmark_study", title: "Your Secrets Are Safe: How Browsers' Explanations Impact Misconceptions About Private Browsing Mode", publisher: "The Web Conference", year: 2018, doi: "10.1145/3178876.3186088", url: "https://www.blaseur.com/papers/www18privatebrowsing.pdf", stance: "context", order: 3, note: "Original methods, selected results, discussion and acknowledgments checked. Historical disclosure-comprehension study, not a current browser audit. DOI identity and Crossref linked-update metadata checked; no notice observed there, not an exhaustive integrity guarantee. No raw-data reanalysis." }),
	lock: source({ kind: "context", title: "An Update on the Lock Icon", publisher: "Chromium Blog", year: 2023, url: "https://blog.chromium.org/2023/05/an-update-on-lock-icon.html", stance: "supports", isAnchor: true, order: 1, note: "Primary Chrome Security explanation checked for the distinction between connection security and operator trust. Historical survey percentages and phishing prevalence not extracted; no current icon ranking or usability effect adopted." }),
	tls: source({ kind: "guideline", title: "The Transport Layer Security (TLS) Protocol Version 1.3", publisher: "IETF / RFC Editor", year: 2018, url: "https://www.rfc-editor.org/rfc/rfc8446.html", stance: "supports", order: 2, note: "Section 1 secure-channel properties and protocol scope checked. A technical specification, not empirical certification of a website. The RFC record links errata; this review does not implement TLS or assess every erratum." }),
	wifi: source({ kind: "guideline", title: "Are Public Wi-Fi Networks Safe? What You Need To Know", publisher: "Federal Trade Commission", year: 2023, url: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know", stance: "supports", order: 3, note: "Consumer guidance checked for encrypted connections and the explicit exception that scam websites can also use HTTPS. Not a measured attack rate or a guarantee about every network and device." }),
	nist: source({ kind: "guideline", title: "Digital Identity Guidelines: Authentication and Authenticator Management", publisher: "NIST", year: 2025, doi: "10.6028/NIST.SP.800-63b-4", url: "https://pages.nist.gov/800-63-4/sp800-63b/authenticators/", stance: "supports", isAnchor: true, order: 1, note: "Final July 2025 publication record, section 3.1.1.2 and informative password appendix checked. Centrally verified passwords in the standard's defined scope, not every device PIN or a universal legal requirement. No numerical researcher-agreement estimate." }),
	passwords: source({ kind: "landmark_study", title: "Practical Recommendations for Stronger, More Usable Passwords Combining Minimum-strength, Minimum-length, and Blocklist Requirements", publisher: "ACM Conference on Computer and Communications Security", year: 2020, doi: "10.1145/3372297.3417882", url: "https://www.ece.cmu.edu/~lbauer/papers/2020/pwd-guidance-ccs20.pdf", stance: "supports", order: 2, note: "Original study protocol, guessing-model measures, results, limitations and funding checked. Strength estimates are not observed account compromises. DOI identity and Crossref linked-update metadata checked with no notice observed there; no independent replication or exhaustive notice search." }),
	passwordAppendix: source({ kind: "context", title: "NIST SP 800-63B-4 Appendix A: Strength of Passwords", publisher: "NIST", year: 2025, url: "https://pages.nist.gov/800-63-4/sp800-63b/passwords/", stance: "supports", order: 3, note: "Informative appendix checked for online versus offline guessing and attacks unaffected by complexity. Same publication and evidence base as the normative requirements, not an independent third study." }),
	vpn: source({ kind: "guideline", title: "Choosing the VPN That's Right for You", publisher: "Electronic Frontier Foundation", url: "https://ssd.eff.org/module/choosing-vpn-thats-right-you", stance: "supports", isAnchor: true, order: 1, note: "Primary guidance last reviewed July 28, 2026 checked for routing, anonymity limits and provider trust. Advocacy guidance, not a provider audit. TLS-encrypted content remains distinct from information a VPN operator can observe." }),
	vpnStudy: source({ kind: "landmark_study", title: "An Analysis of the Privacy and Security Risks of Android VPN Permission-enabled Apps", publisher: "ACM Internet Measurement Conference", year: 2016, doi: "10.1145/2987443.2987471", url: "https://www.icir.org/vern/papers/vpn-apps-imc16.pdf", stance: "context", order: 2, note: "Original sampling, static/dynamic methods, selected findings, limitations and funding checked. Historical Android snapshot; no current brand judgment or prevalence extracted. DOI identity and Crossref linked-update metadata checked without a linked notice; no exploit reproduction or raw-data reanalysis." }),
	tlsLimits: source({ kind: "context", title: "TLS / SSL: Security properties and their limits", publisher: "The Chromium Projects", url: "https://www.chromium.org/Home/chromium-security/education/tls/", stance: "context", order: 3, note: "Primary explanation checked for endpoint and local trust-anchor limitations. Historical cipher and UI examples are not current setup instructions. Distinguishes a protected connection from a protected client or server." })
};

const common = {
	topicSlug: "digital-security-and-privacy",
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	confidenceScore: 75,
	searchDatabases: ["Consensus.app targeted computer-science discovery", "Original author-hosted ACM conference papers", "NIST and IETF primary standards", "Chrome and Mozilla product documentation", "FTC and EFF primary guidance", "Crossref DOI identity and linked-update metadata"],
	searchCutoffAt: privacyCheckedAt,
	inclusionRules: ["Distinguish protocol properties, documented product behavior and empirical human or implementation studies.", "Use current first-party guidance for current scope; retain dates and sampling limitations of older studies.", "Specify the observer, information and conditions that a protection addresses."],
	exclusionRules: ["No product rankings, invented agreement percentage or personalized probability of compromise.", "Do not treat a historical implementation problem as an unpatched current vulnerability.", "Do not equate a label, installation, store listing or protocol feature with complete safety."],
	appraisalTools: ["Targeted original-methods and applicability assessment", "Guidance versus empirical evidence separation", "DOI identity and linked-notice checks; not exhaustive integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "Vendor documentation, standards and guidance can share concepts and citations. Source counts are not independent votes. The legacy confidence score is editorial, not a measured fraction of researchers or attacks prevented.",
	lastRetractionCheckAt: privacyCheckedAt
} satisfies Partial<SeedClaim>;

function publication(id: string, summary: string, focus: string): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return {
		changeLog: [{ date: privacyCheckedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: privacyCheckedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: { focus, cadenceDays: 90, watchTerms: [focus], integrityMonitors: ["Corrections and updated versions of the cited ACM papers"], guidelineMonitors: ["NIST digital identity, browser documentation and EFF privacy guidance"], triggerRules: ["Reassess when relevant standards, documented behavior or applicable empirical evidence materially change."] }
	};
}

export const readerPrivacyClaims: SeedClaim[] = [
	{
		...common,
		title: "Does private or incognito browsing make you anonymous?",
		slug: readerPrivacySlugs.privateBrowsing,
		bottomLine: "Private browsing limits some records kept by the browser after a session; it does not make you anonymous to websites or network operators. Signing in can still identify you. Useful local privacy is not the same as internet invisibility, protection from spyware or guaranteed removal of every trace.",
		stableCore: ["Current Chrome and Firefox documentation separates session history and cookies from remote observation; saved downloads and bookmarks can remain.", "A 2018 randomized disclosure study involved 460 US Mechanical Turk adults, 13 rebranded explanations and 20 scenarios. Important misunderstandings remained.", "The study used August 2017 disclosure text and measured comprehension, not attacks prevented or current browser quality."],
		openQuestions: ["Which current explanations best help people distinguish the observer and the data a private window protects?", "How do protections vary across browser versions, extensions and managed devices?"],
		whatWouldChangeMinds: ["A browser could add a separately verified network-privacy feature, but its guarantees would need evaluation beyond a private-mode label.", "New representative comprehension studies could change how these limits should be explained."],
		misconceptions: ["Closing a private window does not erase a website's own records.", "Blocking some trackers is not blocking every way to recognize a visitor.", "A missing history suggestion is not evidence that a remote service forgot the activity."],
		misconceptionTags: ["incognito", "private browsing", "browser history", "anonymous browsing"],
		editorSummary: "Ask 'private from whom?' A person casually checking this browser's history and a service receiving your requests are different observers. A mode can help with the first without preventing the second. Read the documented limits before using one familiar word as a guarantee about both.",
		uncertaintySummary: "The historical convenience sample does not establish today's population beliefs. Current vendor descriptions establish intended behavior, not an independent forensic audit. Network visibility depends on encryption and configuration; this review does not claim an ISP can read every encrypted page or message.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "Historical convenience sample and browser-specific documentation." }, { type: "implementation", detail: "Settings, extensions and managed-device controls differ." }],
		evidenceSummaries: [{ question: "What does the private-mode label establish?", population: "Documented Chrome/Firefox behavior with historical disclosure-study context", finding: "Local session handling has a narrower scope than remote anonymity; users can misunderstand that boundary.", effectDirection: "supports", magnitude: "No current anonymity percentage or population misunderstanding estimate.", certainty: "moderate", limitations: ["Comprehension is not protection efficacy", "Product documentation is not independent testing", "No forensic guarantee"] }],
		institutionalAnchors: [{ name: "Google Chrome / Mozilla", role: "First-party descriptions of their products, not independent research replications" }],
		coiSummary: "Wu et al. acknowledge a Mozilla Research Award. Google and Mozilla describe their own products. These interests do not invalidate the scope distinction but are not independent product certification.",
		...publication("5e02f5b2-c18a-4ef8-9010-43da84401b53", "New review: private browsing, local records and remote observation.", "Private browsing scope and comprehension"),
		sources: [readerPrivacySources.chrome, readerPrivacySources.firefox, readerPrivacySources.disclosures]
	},
	{
		...common,
		title: "Does HTTPS or a padlock mean a website is trustworthy?",
		slug: readerPrivacySlugs.https,
		bottomLine: "HTTPS protects a connection when properly implemented and validated; it does not certify that the receiving website is honest. A scam site can use HTTPS too. Connection authentication and encryption are valuable, but they do not turn the operator's claims, downloads or requests for information into trustworthy ones.",
		stableCore: ["TLS specifies peer authentication, confidentiality and integrity for a communication channel, not the truth of the content sent through it.", "Chrome Security explicitly distinguishes the historical lock icon from operator trust; browser indicators can change.", "FTC consumer guidance warns that scam websites can also encrypt their connections."],
		openQuestions: ["Which explanations help readers assess website identity without mistaking encryption for an endorsement?", "How do interface changes affect understanding in different populations?"],
		whatWouldChangeMinds: ["A separate, independently evaluated reputation or identity process might add information about an operator; that would not be a property of HTTPS alone.", "Representative interface studies could change the best wording or presentation."],
		misconceptions: ["A valid connection to the wrong domain is still the wrong destination.", "An encrypted submission can reach a dishonest recipient.", "A connection warning and a separate malware or fraud warning address different problems."],
		misconceptionTags: ["HTTPS", "padlock", "secure website", "website trust", "encrypted connection"],
		editorSummary: "Separate the journey from the destination. Encryption addresses interference along a connection; it cannot decide whether the recipient deserves your information. Website trust requires evidence beyond a connection indicator. An indicator that establishes one property should not silently become a broad seal of approval for everything a page says or offers.",
		uncertaintySummary: "Specifications describe conforming behavior, not every live implementation. This review does not assess a particular site's certificates, reputation or vulnerabilities. The historical Chrome explainer is not treated as a current prevalence survey or evidence that one icon prevents a quantified share of fraud.",
		uncertaintyDrivers: [{ type: "implementation", detail: "Actual protection depends on implementation and certificate validation." }, { type: "indirectness", detail: "A protocol specification is not a trial of consumer fraud outcomes." }],
		evidenceSummaries: [{ question: "Does a protected channel imply an honest website?", population: "TLS communication channels and consumer website interpretation", finding: "The standard's channel properties do not certify operator trustworthiness; primary browser and consumer guidance retain that distinction.", effectDirection: "supports", magnitude: "No universal fraud-prevention rate or endorsement score.", certainty: "moderate", limitations: ["No audit of an individual website", "No new icon-comprehension experiment", "Endpoint behavior remains separate"] }],
		institutionalAnchors: [{ name: "IETF / FTC", role: "Protocol specification and consumer guidance, not independent randomized studies" }],
		coiSummary: "The browser explanation is written by Chrome Security; IETF standards involve implementers and FTC guidance addresses consumer protection. No paid provider recommendation or independent website certification is supplied.",
		...publication("8de9f489-43af-44e9-ad7a-c6c9c48e814b", "New review: HTTPS connection protection versus website trust.", "HTTPS indicators and operator trust"),
		sources: [readerPrivacySources.lock, readerPrivacySources.tls, readerPrivacySources.wifi]
	},
	{
		...common,
		title: "Do password symbol and character rules guarantee strong passwords?",
		slug: readerPrivacySlugs.passwordRules,
		bottomLine: "Requiring an uppercase letter, a digit and a symbol does not guarantee a hard-to-guess password. Predictable choices can satisfy those rules. Current NIST guidance emphasizes length, rejecting common or compromised choices and limiting online guesses rather than mandatory character-class mixes. That is not a guarantee against phishing, reuse or a breached device.",
		stableCore: ["NIST's final 2025 rules for centrally verified passwords reject mandatory character-class composition rules and require a blocklist and rate limiting within their defined scope.", "Two online role-play experiments reported in 2020 compared policy combinations using modeled guessability, password creation and two-day recall. Results depended on the policy combination and strength-feedback interface.", "Online guessing through a login and offline guessing after a hash breach impose different conditions; a rule cannot be evaluated without its threat model."],
		openQuestions: ["How well do specific policy combinations transfer to today's real accounts and different user populations?", "Which interfaces reduce predictable choices without imposing avoidable recall and creation burdens?"],
		whatWouldChangeMinds: ["Replicated field evidence could identify a setting where composition rules add useful protection beyond suitable length and compromised-password checks.", "Changes in guessing techniques or the authentication standard could change an appropriate policy."],
		misconceptions: ["A symbol appended in a predictable way is not proof of unpredictability.", "A modeled number of guesses is not a promise about how many years your account will remain safe.", "The study does not justify abandoning NIST's compromised-password blocklist or online rate limiting."],
		misconceptionTags: ["password symbols", "password complexity", "character classes", "password length", "password requirements"],
		editorSummary: "Character classes describe categories such as letters, digits and symbols. A checklist records which character types are present, not how a person selected them. The relevant question is resistance to plausible guesses under a stated attack model, alongside usability. This differs from how often to change a password or whether installing a manager replaces existing reused secrets.",
		uncertaintySummary: "The experiments used Mechanical Turk participants, role-play accounts and a particular feedback meter rather than observed compromises of real accounts. Model estimates and short recall tests are indirect outcomes. No universal optimal length, individual crack time or current product score is established here.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "Modeled guessing and short recall are not real account-takeover outcomes." }, { type: "generalizability", detail: "Convenience sample and a specific strength-feedback interface." }],
		evidenceSummaries: [{ question: "Do character-class rules guarantee useful guessing resistance?", population: "Centrally verified user passwords with experimental policy context", finding: "Rules alone are not a sufficient guarantee; standards and experimental comparisons favor assessing the whole policy and threat model.", effectDirection: "supports", magnitude: "No personal cracking-time estimate or measured researcher-agreement percentage.", certainty: "moderate", limitations: ["Role-play rather than real high-value accounts", "Model-dependent guessing estimates", "NIST scope is not every local device PIN"] }],
		institutionalAnchors: [{ name: "NIST", role: "Normative requirements and an informative appendix from one publication" }],
		coiSummary: "Tan et al. disclose gifts from Microsoft Research, Google and NVIDIA. NIST's two linked sections are not independent evaluations; the synthesis includes no formal independent appraisal or vendor endorsement.",
		...publication("9950d616-fda2-4dc9-88a6-a773a443907b", "New review: password composition rules, guessing and usability.", "Password policy combinations and guessing resistance"),
		sources: [readerPrivacySources.nist, readerPrivacySources.passwords, readerPrivacySources.passwordAppendix]
	},
	{
		...common,
		title: "Does a VPN make you completely anonymous online?",
		slug: readerPrivacySlugs.vpn,
		bottomLine: "A correctly functioning VPN changes the network route and can conceal some traffic information from the local network, but it does not make you completely anonymous. Websites can still recognize accounts and other identifiers, and the VPN provider becomes another party to trust. HTTPS-encrypted content does not automatically become readable by the VPN provider.",
		stableCore: ["EFF's July 2026 guidance distinguishes a VPN's routing function from anonymity and emphasizes provider trust.", "A 2016 Android study examined 283 permission-enabled apps from a September 2015 crawl; runtime network tests covered 150. It documented implementation problems, not a current ranking of all VPNs.", "A VPN tunnel and the website's TLS connection have different endpoints. Neither automatically protects a compromised device or a dishonest recipient."],
		openQuestions: ["What independently verified evidence supports a specific provider's current practices across its app and infrastructure?", "How reliably does a configuration cover intended traffic across platforms and network changes?"],
		whatWouldChangeMinds: ["Current reproducible independent audits can strengthen confidence in particular configurations and provider practices, without proving universal anonymity.", "A substantially different design would need evaluation of remaining identifiers and observers, not only a changed IP address."],
		misconceptions: ["A different apparent IP address does not erase an account you sign into.", "A provider's no-logs slogan is not independent proof of its practices.", "Historical app findings are not evidence that a named provider remains vulnerable today."],
		misconceptionTags: ["VPN", "anonymous online", "VPN privacy", "hide IP address", "no logs"],
		editorSummary: "Identify what should be hidden, from which observer, and under what conditions. Network routing can address one part of that problem while leaving another unchanged. Moving trust is different from removing trust; a reassuring subscription or installation screen cannot establish every privacy property.",
		uncertaintySummary: "The Android study's dated, platform-limited sample and unequal static/runtime coverage cannot estimate today's VPN failure prevalence. This review does not audit providers, reproduce exploits, verify no-logs claims or offer a safety plan for high-risk surveillance situations. Configuration and endpoint trust still matter.",
		uncertaintyDrivers: [{ type: "timing", detail: "Historical implementation findings do not establish current provider behavior." }, { type: "implementation", detail: "Traffic coverage and provider practices depend on the deployed configuration." }],
		evidenceSummaries: [{ question: "Does VPN routing alone establish complete anonymity?", population: "Consumer VPN use with historical Android implementation context", finding: "Routing changes some observers' visibility but leaves identification and provider-trust questions. Implementation findings further caution against reading installation as a guarantee.", effectDirection: "supports", magnitude: "No current failure prevalence, brand ranking or personal anonymity probability.", certainty: "moderate", limitations: ["Historical Android sample", "No independent current provider audit", "Encrypted content differs from observable connection information"] }],
		institutionalAnchors: [{ name: "EFF / Chromium", role: "Primary guidance and technical explanations, not independent provider certification" }],
		coiSummary: "Ikram et al. acknowledge Data61/CSIRO and NSF support. EFF is a privacy advocacy organization and Chromium is a browser project. No paid VPN recommendation, brand ranking or independent certification is offered.",
		...publication("a3610386-6b13-4f99-af3c-ec19ae4d20b2", "New review: VPN routing, remaining identifiers and provider trust.", "VPN routing and anonymity limits"),
		sources: [readerPrivacySources.vpn, readerPrivacySources.vpnStudy, readerPrivacySources.tlsLimits]
	}
];
