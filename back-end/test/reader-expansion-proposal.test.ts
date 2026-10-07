import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { readerExpansionClaims } from "../src/data/claim-expansion-reader.js";
import { defaultClaims } from "../src/data/claims.js";
import { seedClaimFields } from "../src/data/seedClaims.js";
import { CLAIM_NARRATIVE_FIELDS } from "../src/utils/claimNarratives.js";
import { createReaderExpansionSourceProposal, readerExpansionValueHash } from "../src/utils/readerExpansionProposal.js";

const identity = { commit: "a".repeat(40), tree: "b".repeat(40) };
const generatedAt = new Date("2026-10-06T13:00:00.000Z");
const build = (expansion = readerExpansionClaims, catalog = defaultClaims) => createReaderExpansionSourceProposal(expansion, catalog, identity, generatedAt);

describe("read-only complete reader expansion proposal", () => {
	it("binds all canonical reviews and citations without claiming publication or connecting a database", () => {
		const before = JSON.stringify(readerExpansionClaims);
		const proposal = build();
		assert.equal(proposal.proposalClaimCount, 201);
		assert.equal(proposal.proposalCitationCount, 461);
		assert.equal(proposal.sourceCatalogCount, 1001);
		assert.equal(proposal.sourceBaselineCount, 800);
		assert.equal(proposal.publicAcceptanceMinimum, 1001);
		assert.equal(proposal.longNarrativeItems, 277);
		assert.equal(proposal.isPublicationReceipt, false);
		assert.equal(proposal.productionAuthorizationGranted, false);
		assert.equal(new Set(proposal.targets.map(target => target.canonicalPath)).size, 201);
		assert.equal(mongoose.connection.readyState, 0);
		assert.equal(JSON.stringify(readerExpansionClaims), before);
	});

	it("preserves every authored field and long paragraph independently of its hashes", () => {
		const proposal = build();
		for (const [index, definition] of readerExpansionClaims.entries()) {
			const target = proposal.targets[index];
			const expected = Object.fromEntries(Object.entries(seedClaimFields(definition)).filter(([key, value]) => !["status", "changeLog"].includes(key) && value !== undefined));
			assert.deepEqual(target.createPayload, { ...JSON.parse(JSON.stringify(expected)), topic: definition.topicSlug, slug: definition.slug });
			for (const field of CLAIM_NARRATIVE_FIELDS) assert.deepEqual(target.createPayload[field], definition[field]);
			assert.equal(target.sourcePayloads.length, definition.sources.length);
			for (const [sourceIndex, source] of definition.sources.entries()) {
				assert.deepEqual(target.sourcePayloads[sourceIndex], JSON.parse(JSON.stringify({ ...source, url: new URL(source.url!).href })));
			}
		}
	});

	it("keeps stable data hashes separate from proposal generation dates and binds changed content", () => {
		const original = build();
		const later = createReaderExpansionSourceProposal(readerExpansionClaims, defaultClaims, identity, new Date("2026-10-07T13:00:00.000Z"));
		assert.equal(original.proposalDataSha256, later.proposalDataSha256);
		assert.notEqual(original.generatedAt, later.generatedAt);
		assert.equal(original.targets[0].contentSha256, readerExpansionValueHash(original.targets[0].createPayload));
		assert.notEqual(readerExpansionValueHash({ ...original.targets[0].createPayload, bottomLine: "Changed text" }), original.targets[0].contentSha256);
		assert.equal(readerExpansionValueHash({ alpha: 1, beta: 2 }), readerExpansionValueHash({ beta: 2, alpha: 1 }));
	});

	it("rejects editorial title, path and check-date violations even when the canonical source agrees", () => {
		const cases = [
			{ field: "title", value: "x".repeat(221), error: /Source titles must survive/u },
			{ field: "title", value: " trailing title ", error: /Source titles must survive/u },
			{ field: "topicSlug", value: "x".repeat(121), error: /bounded valid slugs/u },
			{ field: "slug", value: "x".repeat(201), error: /bounded valid slugs/u }
		];
		for (const { field, value, error } of cases) {
			const definitions = structuredClone(readerExpansionClaims);
			const catalog = structuredClone(defaultClaims);
			const canonical = catalog.find(definition => definition.topicSlug === definitions[0].topicSlug && definition.slug === definitions[0].slug)!;
			Object.assign(definitions[0], { [field]: value });
			Object.assign(canonical, { [field]: value });
			assert.throws(() => build(definitions, catalog), error);
		}
		const definitions = structuredClone(readerExpansionClaims);
		const catalog = structuredClone(defaultClaims);
		const canonical = catalog.find(definition => definition.topicSlug === definitions[0].topicSlug && definition.slug === definitions[0].slug)!;
		definitions[0].sources[0].citationCheckedAt = "invalid";
		canonical.sources[0].citationCheckedAt = "invalid";
		assert.throws(() => build(definitions, catalog), /Citation check dates must be valid/u);
	});

	it("preserves provenance labels and supplied check instants without inventing a new assessment", () => {
		const definitions = structuredClone(readerExpansionClaims);
		const catalog = structuredClone(defaultClaims);
		const canonical = catalog.find(definition => definition.topicSlug === definitions[0].topicSlug && definition.slug === definitions[0].slug)!;
		const provenance = { citationCheckedAt: "2026-10-05T18:00:00-04:00", statusSources: ["Crossref", "https://example.test/correction"] };
		Object.assign(definitions[0].sources[0], provenance);
		Object.assign(canonical.sources[0], provenance);
		const source = build(definitions, catalog).targets[0].sourcePayloads[0];
		assert.equal(source.citationCheckedAt, "2026-10-05T22:00:00.000Z");
		assert.deepEqual(source.statusSources, provenance.statusSources);
	});

	it("does not forward seed status, planned announcements, database IDs or unknown secret fields", () => {
		const definitions = structuredClone(readerExpansionClaims);
		Object.assign(definitions[0], { password: "must-not-forward", _id: "invented-id", readerAnnouncement: { id: "invented-announcement" } });
		Object.assign(definitions[0].sources[0], { authorization: "must-not-forward", _id: "invented-source-id" });
		const serialized = JSON.stringify(build(definitions));
		assert.doesNotMatch(serialized, /must-not-forward|invented-id|invented-announcement|invented-source-id|"status":|"changeLog":|"password":|"authorization":|"_id":/u);
	});

	it("rejects incomplete, duplicated, absent or divergent source cohorts", () => {
		assert.throws(() => build(readerExpansionClaims.slice(1)));
		assert.throws(() => build(readerExpansionClaims, defaultClaims.slice(1)));
		const duplicate = structuredClone(readerExpansionClaims);
		duplicate[0] = duplicate[1];
		assert.throws(() => build(duplicate));
		const unknown = structuredClone(readerExpansionClaims);
		unknown[0].slug = "missing-canonical-review";
		assert.throws(() => build(unknown));
		const changed = structuredClone(readerExpansionClaims);
		changed[0].bottomLine += " Modified.";
		assert.throws(() => build(changed));
		const changedCitation = structuredClone(readerExpansionClaims);
		changedCitation[0].sources[0].title += " Modified.";
		assert.throws(() => build(changedCitation));
		const missingAssessment = structuredClone(readerExpansionClaims);
		delete missingAssessment[0].agreementLevel;
		assert.throws(() => build(missingAssessment), /does not infer missing assessments/u);
	});

	it("rejects malformed or truncated narratives, credentials, invalid dates and overlong citations", () => {
		for (const alteration of [
			(definitions: typeof readerExpansionClaims) => { definitions[0].stableCore[0] = "x".repeat(1001); },
			(definitions: typeof readerExpansionClaims) => { definitions[0].stableCore[0] = ` ${definitions[0].stableCore[0]}`; },
			(definitions: typeof readerExpansionClaims) => { definitions[0].sources[0].url = "https://name:private@example.test/source"; },
			(definitions: typeof readerExpansionClaims) => { definitions[0].sources[0].url = "javascript:alert(1)"; },
			(definitions: typeof readerExpansionClaims) => { definitions[0].sources[0].title = "x".repeat(321); },
			(definitions: typeof readerExpansionClaims) => { definitions[0].searchCutoffAt = "not-a-date"; }
		]) {
			const definitions = structuredClone(readerExpansionClaims);
			alteration(definitions);
			assert.throws(() => build(definitions));
		}
		assert.throws(() => createReaderExpansionSourceProposal(readerExpansionClaims, defaultClaims, { ...identity, commit: "unknown" }, generatedAt));
		assert.throws(() => createReaderExpansionSourceProposal(readerExpansionClaims, defaultClaims, identity, new Date("invalid")));
		assert.throws(() => readerExpansionValueHash(new Date("invalid")));
		assert.throws(() => readerExpansionValueHash(Number.NaN));
	});
});
