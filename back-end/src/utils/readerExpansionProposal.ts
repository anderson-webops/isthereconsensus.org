import type { CompleteSeedClaim, SeedClaim } from "../data/claims.js";
import { createHash } from "node:crypto";
import { seedClaimFields } from "../data/seedClaims.js";
import { CLAIM_SOURCE_TITLE_MAX_LENGTH } from "../models/schemas/ClaimSource.js";
import { CLAIM_NARRATIVE_FIELDS, normalizeClaimNarratives } from "./claimNarratives.js";

const citationFields = ["kind", "title", "publisher", "year", "url", "doi", "pmid", "pmcid", "isAnchor", "appraisal", "citationStatus", "citationCheckedAt", "statusSources", "stance", "note", "order"] as const;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u;
const completeFields = ["agreementLevel", "evidenceCertainty", "reviewMode", "searchDatabases", "searchCutoffAt", "inclusionRules", "exclusionRules", "surveillanceSpec", "appraisalTools", "evidenceSummaries", "institutionalAnchors", "misconceptionTags", "authorLine", "reviewerLine", "coiSummary", "independenceSummary", "uncertaintySummary", "uncertaintyDrivers", "lastRetractionCheckAt", "changeLog"] as const satisfies readonly (keyof CompleteSeedClaim)[];

export const READER_EXPANSION_SOURCE_PATHS = ["back-end/src", "back-end/package.json", "back-end/package-lock.json", "back-end/.npmrc", "package.json", "package-lock.json", ".npmrc", ".node-version", ".nvmrc", "vendor"] as const;

function canonicalValue(value: unknown): unknown {
	if (value instanceof Date) {
		if (Number.isNaN(value.getTime())) throw new Error("Source dates must be valid.");
		return value.toISOString();
	}
	if (Array.isArray(value)) return value.map(canonicalValue);
	if (value && typeof value === "object") {
		return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined).sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0).map(([key, entry]) => [key, canonicalValue(entry)]));
	}
	if (typeof value === "number" && !Number.isFinite(value)) throw new Error("Source numbers must be finite.");
	return value;
}

export function readerExpansionValueHash(value: unknown) {
	return createHash("sha256").update(JSON.stringify(canonicalValue(value))).digest("hex");
}

function requireCompleteDefinition(definition: SeedClaim): asserts definition is CompleteSeedClaim {
	if (completeFields.some(field => definition[field] === undefined)) throw new Error("Authored assessment fields must be supplied; source preparation does not infer missing assessments.");
}

function proposalContent(definition: SeedClaim) {
	requireCompleteDefinition(definition);
	if (!definition.title.trim() || definition.title !== definition.title.trim() || definition.title.length > 220) throw new Error("Source titles must survive editorial creation without truncation or trimming.");
	const content = Object.fromEntries(Object.entries(seedClaimFields(definition)).filter(([key, value]) => key !== "status" && key !== "changeLog" && value !== undefined));
	const normalized = normalizeClaimNarratives(content);
	for (const field of CLAIM_NARRATIVE_FIELDS) {
		if (JSON.stringify(normalized[field]) !== JSON.stringify(content[field])) throw new Error("Source narrative text would change during draft creation.");
	}
	return canonicalValue(content) as Record<string, unknown>;
}

function proposalSources(definition: SeedClaim) {
	if (definition.sources.length < 2) throw new Error("Expansion proposals require at least two citations per review.");
	return definition.sources.map((source) => {
		if (!source.title.trim() || source.title.length > CLAIM_SOURCE_TITLE_MAX_LENGTH) throw new Error("Citation titles must respect the current schema bound.");
		const url = new URL(source.url ?? "");
		if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error("Citation URLs must be HTTP(S) without credentials.");
		const payload = Object.fromEntries(citationFields.filter(field => source[field] !== undefined).map(field => [field, field === "url" ? url.href : source[field]]));
		if (source.citationCheckedAt !== undefined) {
			const checked = new Date(source.citationCheckedAt);
			if (Number.isNaN(checked.getTime())) throw new Error("Citation check dates must be valid when supplied.");
			payload.citationCheckedAt = checked.toISOString();
		}
		return canonicalValue(payload) as Record<string, unknown>;
	});
}

export function createReaderExpansionSourceProposal(
	expansion: readonly SeedClaim[],
	catalog: readonly SeedClaim[],
	identity: { commit: string; tree: string },
	generatedAt: Date
) {
	if (!/^[a-f\d]{40}$/u.test(identity.commit) || !/^[a-f\d]{40}$/u.test(identity.tree)) throw new Error("Verified Git commit and tree identities are required.");
	if (Number.isNaN(generatedAt.getTime())) throw new Error("Proposal generation date must be valid.");
	if (expansion.length !== 201 || catalog.length < 1001) throw new Error("The complete expansion and canonical library are required.");
	const catalogByPath = new Map(catalog.map(definition => [`${definition.topicSlug}/${definition.slug}`, definition]));
	if (catalogByPath.size !== catalog.length) throw new Error("Canonical source paths must be unique.");
	const targets = expansion.map((definition) => {
		if (!slugPattern.test(definition.topicSlug) || !slugPattern.test(definition.slug) || definition.topicSlug.length > 120 || definition.slug.length > 200) throw new Error("Canonical source paths must use bounded valid slugs.");
		const catalogDefinition = catalogByPath.get(`${definition.topicSlug}/${definition.slug}`);
		if (!catalogDefinition) throw new Error("Every proposed review must exist in the canonical source library.");
		const content = proposalContent(definition);
		const canonicalContent = proposalContent(catalogDefinition);
		for (const [field, value] of Object.entries(content)) {
			if (readerExpansionValueHash(value) !== readerExpansionValueHash(canonicalContent[field])) throw new Error("Expansion content differs from the canonical source library.");
		}
		const sourcePayloads = proposalSources(definition);
		const canonicalSources = proposalSources(catalogDefinition);
		if (canonicalSources.length !== sourcePayloads.length) throw new Error("Expansion citations differ from the canonical source library.");
		for (const [index, source] of sourcePayloads.entries()) {
			for (const [field, value] of Object.entries(source)) {
				if (readerExpansionValueHash(value) !== readerExpansionValueHash(canonicalSources[index][field])) throw new Error("Expansion citations differ from the canonical source library.");
			}
		}
		const createPayload = { ...content, topic: definition.topicSlug, slug: definition.slug };
		return {
			canonicalPath: `/consensus/${definition.topicSlug}/${definition.slug}`,
			publicApiPath: `/api/topics/${definition.topicSlug}/claims/${definition.slug}`,
			createPayload,
			sourcePayloads,
			contentSha256: readerExpansionValueHash(createPayload),
			citationSha256: sourcePayloads.map(readerExpansionValueHash)
		};
	});
	if (new Set(targets.map(target => target.canonicalPath)).size !== targets.length) throw new Error("Expansion canonical paths must not repeat.");
	const longNarrativeItems = expansion.reduce((total, definition) => total + CLAIM_NARRATIVE_FIELDS.reduce((count, field) => count + definition[field].filter(item => item.length > 280).length, 0), 0);
	return {
		schemaVersion: 1,
		artifactKind: "reader-expansion-source-proposal",
		isPublicationReceipt: false,
		productionAuthorizationGranted: false,
		generatedAt: generatedAt.toISOString(),
		sourceCommit: identity.commit,
		sourceTree: identity.tree,
		proposalDataSha256: readerExpansionValueHash(targets),
		sourceCatalogCount: catalog.length,
		sourceBaselineCount: catalog.length - expansion.length,
		proposalClaimCount: targets.length,
		proposalCitationCount: targets.reduce((total, target) => total + target.sourcePayloads.length, 0),
		longNarrativeItems,
		publicAcceptanceMinimum: 1001,
		requiredOperatorGates: ["separate authorization", "fresh complete restore-tested backup", "exact deployed source and artifact identity", "live baseline and conflict review", "complete authenticated isolated rehearsal", "explicit production promotion approval", "actual anonymous full-content and identity readback"],
		targets
	};
}
