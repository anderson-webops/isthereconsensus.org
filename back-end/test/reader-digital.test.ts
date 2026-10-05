import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getAtlasCollectionMemberships } from "../src/data/atlasCollections.js";
import { digitalCheckedAt, readerDigitalClaims, readerDigitalGaps, readerDigitalSlugs, readerDigitalSources } from "../src/data/claim-expansion-reader-digital.js";
import { readerExpansionClaims } from "../src/data/claim-expansion-reader.js";
import { defaultClaims } from "../src/data/claims.js";
import { ClaimSource } from "../src/models/schemas/ClaimSource.js";
import { createClaimSearchIndex } from "../src/utils/claimSearch.js";

const claimFor = (key: string) => readerDigitalClaims.find(claim => claim.slug === readerDigitalSlugs[key])!;
const textFor = (key: string) => [claimFor(key).bottomLine, ...claimFor(key).stableCore, claimFor(key).editorSummary].join(" ");

describe("digital-security boundary expansion", () => {
	it("adds sixteen substantive unique canonical questions rather than counting guides or old refreshes", () => {
		assert.equal(readerDigitalClaims.length, 16);
		for (const field of ["slug", "title", "bottomLine"] as const) assert.equal(new Set(readerDigitalClaims.map(claim => claim[field])).size, 16);
		assert.equal(new Set(readerDigitalClaims.map(claim => claim.readerAnnouncement!.id)).size, 16);
		assert.deepEqual(readerDigitalGaps.map(gap => gap.slug), readerDigitalClaims.map(claim => claim.slug));
		assert.ok(Date.parse(digitalCheckedAt) <= Date.now());
		for (const claim of readerDigitalClaims) {
			assert.equal(defaultClaims.filter(existing => existing.slug === claim.slug).length, 1);
			assert.equal(claim.topicSlug, "digital-security-and-privacy");
			assert.equal(claim.searchCutoffAt, digitalCheckedAt);
			assert.equal(claim.readerAnnouncement!.date, digitalCheckedAt);
			assert.match(claim.readerAnnouncement!.id, /^fa45f3a0-82b1-485f-bbe5-f31cd74a00\d\d$/);
			assert.ok([claim.bottomLine, ...claim.stableCore, claim.editorSummary].join(" ").split(/\s+/).length >= 250);
			assert.equal(claim.sources.length, 2);
		}
		assert.equal(defaultClaims.filter(claim => !readerExpansionClaims.some(addition => addition.slug === claim.slug)).length, 800);
		assert.equal(defaultClaims.filter(claim => claim.topicSlug === "digital-security-and-privacy" && !readerDigitalClaims.some(addition => addition.slug === claim.slug)).length, 9);
	});

	it("uses actual schemas without treating technical sources as appraised experiments or scientific votes", async () => {
		assert.equal(Object.keys(readerDigitalSources).length, 20);
		for (const claim of readerDigitalClaims) {
			assert.match(claim.reviewerLine!, /independent expert review not completed/);
			assert.match(claim.independenceSummary!, /editorial, not a measured fraction/);
			assert.match(claim.evidenceSummaries![0]!.magnitude!, /not a measured attack-prevention percentage/);
			assert.equal(claim.sources.filter(source => source.isAnchor).length, 1);
			for (const entry of claim.sources) {
				const source = new ClaimSource({ claim: "aaaaaaaaaaaaaaaaaaaaaaaa", ...entry });
				await source.validate();
				assert.equal(source.kind, "technical_reference");
				assert.equal(source.appraisal, "not_appraised");
				assert.equal(source.evidenceProfile.studyDesign, "not_coded");
				assert.equal(source.evidenceProfile.reviewer.reviewedById, undefined);
				assert.equal(source.citationCheckedAt!.toISOString(), digitalCheckedAt);
				assert.ok(entry.statusSources!.includes(entry.url!));
				assert.ok(!entry.url!.includes("consensus.app"));
			}
		}
	});

	it("retains current DMARC scope and honest historical/reference status", () => {
		assert.equal(readerDigitalSources.dmarc.year, 2026);
		assert.match(readerDigitalSources.dmarc.url!, /rfc9989\.html$/);
		assert.match(readerDigitalSources.dmarc.note!, /replacement for RFC 7489/);
		assert.match(textFor("email"), /excludes content analysis and authentication of entities other than domains/);
		assert.match(readerDigitalSources.fingerprinting.note!, /not endorsement by W3C or its Members/);
		assert.match(readerDigitalSources.architecture.publisher, /Benjamin Beurdouche/);
		assert.match(readerDigitalSources.hash.note!, /not current approval/);
		assert.match(readerDigitalSources.disk.note!, /not current recommendations/);
		assert.equal(readerDigitalSources.sanitize.year, 2025);
		assert.match(readerDigitalSources.sanitize.url!, /800-88r2\.pdf$/);
	});

	it("separates message layers, metadata, continuing endpoint control and conditional recovery", () => {
		assert.match(textFor("transport"), /Separate encrypted connections.*do not establish that the server lacks access/);
		assert.match(textFor("metadata"), /not.*measured prediction/);
		assert.match(textFor("endpoint"), /continuing endpoint control is not solved/);
		assert.match(textFor("endpoint"), /remediat/);
		assert.match(textFor("hashing"), /fast digest.*suitable complete password-verifier/);
	});

	it("does not conflate DNS secrecy, authenticated answers, shared addresses and human identity", () => {
		assert.match(textFor("doh"), /resolver still handles the queries/);
		assert.match(textFor("doh"), /does not claim that every network operator can read encrypted page content/);
		assert.match(textFor("dnssec"), /explicitly excludes confidentiality/);
		assert.match(textFor("dnssec"), /not a review of the website/);
		assert.match(textFor("address"), /multiple subscribers sharing public IPv4 addresses/);
		assert.match(textFor("address"), /subscriber association is not automatically identification of the individual/);
	});

	it("keeps local browser state separate from remote records without inventing universal fingerprint rates", () => {
		const browserState = new Set(["local-session"]);
		const remoteRecords = new Set(["received-request"]);
		browserState.clear();
		assert.equal(browserState.size, 0);
		assert.deepEqual([...remoteRecords], ["received-request"]);
		assert.match(textFor("cookieDeletion"), /does not undo requests already received/);
		assert.match(textFor("tracking"), /does not follow that every browser can always be uniquely identified/);
		assert.match(textFor("tracking"), /original full papers were unavailable/);
		assert.match(textFor("tracking"), /does not make the control pointless|does not conclude that a cookie control is either useless/);
	});

	it("checks a non-destructive replica counterexample and access-based backup boundary", () => {
		const replicas = ["intact", "intact"];
		const retainedHistory = Object.freeze(["intact"]);
		const updatedReplicas = replicas.map(() => "mistaken-edit");
		assert.ok(updatedReplicas.every(value => value === "mistaken-edit"));
		assert.equal(retainedHistory[0], "intact");
		const writableCopies = new Set(["primary", "reachable-backup"]);
		assert.ok(writableCopies.has("reachable-backup"));
		assert.ok(!writableCopies.has("independently-controlled-copy"));
		assert.match(textFor("sync"), /several copies of the mistake/);
		assert.match(textFor("reachableBackup"), /does not remove its permissions/);
		assert.match(textFor("reachableBackup"), /without undoing information already taken/);
	});

	it("keeps file removal, other copies and authorized runtime plaintext access bounded", () => {
		assert.match(textFor("deletion"), /not.*every deleted file remains recoverable/);
		assert.match(textFor("deletion"), /does not remove independently held backups/);
		assert.match(textFor("disk"), /does not mean every process automatically receives all files/);
		assert.match(textFor("disk"), /Historical.*not|older guide.*not adopted as current/);
	});

	it("preserves the benefits of signatures and updates without inventing universal safety", () => {
		assert.match(textFor("signing"), /malicious or unauthorized code being signed/);
		assert.match(textFor("signing"), /entire application-review process consists only/);
		assert.match(textFor("updates"), /Downloading it|downloading it/);
		assert.match(textFor("updates"), /neither always restart nor never restart/);
		assert.match(textFor("updates"), /limits do not justify abandoning updates/);
	});

	it("deliberately places every review in one of four collections", () => {
		const groups = {
			"message-and-password-cryptography": ["transport", "metadata", "endpoint", "hashing"],
			"dns-and-browser-identifiers": ["doh", "dnssec", "tracking", "cookieDeletion", "address"],
			"files-backups-and-storage": ["sync", "reachableBackup", "deletion", "disk"],
			"software-and-email-trust": ["signing", "updates", "email"]
		};
		assert.equal(Object.values(groups).flat().length, 16);
		for (const [group, keys] of Object.entries(groups)) {
			for (const key of keys) assert.deepEqual(getAtlasCollectionMemberships("digital-security-and-privacy", readerDigitalSlugs[key]!).map(collection => collection.slug), [group]);
		}
	});

	it("retrieves diagnostic questions without changing search or the frozen evaluation", () => {
		const search = createClaimSearchIndex(defaultClaims.map(claim => ({ ...claim, _id: claim.slug })));
		const queries = { transport: "encrypted messaging connection", metadata: "message metadata timing", endpoint: "end-to-end compromised device", hashing: "hashing password encrypting", doh: "encrypted DNS resolver", dnssec: "DNSSEC encrypt lookups", tracking: "blocking cookies tracking", cookieDeletion: "deleting cookies website records", address: "IP address identify person", sync: "file synchronization backup", reachableBackup: "ransomware writable backup", deletion: "deleting file recovered", disk: "full-disk encryption malware", signing: "valid software signature safe", updates: "software updated cyberattack", email: "email authentication truthful" };
		for (const [key, query] of Object.entries(queries)) assert.ok(search(query).some(result => result.claim.slug === readerDigitalSlugs[key]), query);
	});
});
