import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { Topic } from "../models/schemas/Topic.js";
import { defaultClaims } from "./claims.js";

type SeedClaimSource = (typeof defaultClaims)[number]["sources"][number];
type SeedClaim = (typeof defaultClaims)[number];

interface SeedSourceUpdate {
	$set?: Record<string, unknown>;
	$unset?: Record<string, "">;
}

interface SeedClaimUpdate {
	$set?: Record<string, unknown>;
}

interface ExistingClaimSourceForSeedSync {
	kind?: string;
	title?: string;
	publisher?: string;
	year?: number;
	url?: string;
	doi?: string;
	pmid?: string;
	pmcid?: string;
	isAnchor?: boolean;
	appraisal?: string;
	citationStatus?: string;
	citationCheckedAt?: Date | string;
	statusSources?: string[];
	stance?: string;
	note?: string;
	order?: number;
}

const optionalSeedStringFields = ["publisher", "url", "doi", "pmid", "pmcid"] as const;

function toSeedDate(value: string) {
	return new Date(value);
}

function datesMatch(existingValue: Date | string | undefined, seedValue: Date) {
	if (!existingValue) return false;
	const existingDate = existingValue instanceof Date ? existingValue : new Date(existingValue);
	return !Number.isNaN(existingDate.getTime()) && existingDate.getTime() === seedValue.getTime();
}

function stringArraysMatch(existingValues: string[] | undefined, seedValues: string[]) {
	if (!existingValues || existingValues.length !== seedValues.length) return false;
	return existingValues.every((value, index) => value === seedValues[index]);
}

function hasSeedSourceUpdate(update: SeedSourceUpdate) {
	return Boolean(Object.keys(update.$set ?? {}).length || Object.keys(update.$unset ?? {}).length);
}

function hasSeedClaimUpdate(update: SeedClaimUpdate) {
	return Boolean(Object.keys(update.$set ?? {}).length);
}

function seedClaimFields(seed: SeedClaim) {
	return {
		title: seed.title,
		status: seed.status,
		consensusBand: seed.consensusBand,
		agreementLevel: seed.agreementLevel,
		evidenceCertainty: seed.evidenceCertainty,
		confidenceScore: seed.confidenceScore,
		reviewMode: seed.reviewMode,
		bottomLine: seed.bottomLine,
		stableCore: seed.stableCore,
		openQuestions: seed.openQuestions,
		whatWouldChangeMinds: seed.whatWouldChangeMinds,
		misconceptions: seed.misconceptions,
		misconceptionTags: seed.misconceptionTags,
		editorSummary: seed.editorSummary,
		uncertaintySummary: seed.uncertaintySummary,
		uncertaintyDrivers: seed.uncertaintyDrivers,
		searchDatabases: seed.searchDatabases,
		searchCutoffAt: toSeedDate(seed.searchCutoffAt),
		inclusionRules: seed.inclusionRules,
		exclusionRules: seed.exclusionRules,
		surveillanceSpec: seed.surveillanceSpec,
		appraisalTools: seed.appraisalTools,
		evidenceSummaries: seed.evidenceSummaries,
		institutionalAnchors: seed.institutionalAnchors,
		authorLine: seed.authorLine,
		reviewerLine: seed.reviewerLine,
		coiSummary: seed.coiSummary,
		independenceSummary: seed.independenceSummary,
		lastRetractionCheckAt: toSeedDate(seed.lastRetractionCheckAt),
		changeLog: seed.changeLog.map(entry => ({
			...entry,
			date: toSeedDate(entry.date)
		}))
	};
}

function normalizeSeedValue(value: unknown): unknown {
	if (value instanceof Date) return value.toISOString();
	if (Array.isArray(value)) return value.map(normalizeSeedValue);
	if (value && typeof value === "object") {
		if ("toObject" in value && typeof value.toObject === "function") {
			return normalizeSeedValue(value.toObject());
		}

		return Object.fromEntries(
			Object.entries(value)
				.filter(([key]) => key !== "_id")
				.sort(([left], [right]) => left.localeCompare(right))
				.map(([key, entryValue]) => [key, normalizeSeedValue(entryValue)])
		);
	}
	return value;
}

function seedValuesMatch(existingValue: unknown, seedValue: unknown) {
	return JSON.stringify(normalizeSeedValue(existingValue)) === JSON.stringify(normalizeSeedValue(seedValue));
}

export function buildSeedClaimUpdate(existingClaim: Record<string, unknown>, seed: SeedClaim): SeedClaimUpdate {
	const $set: Record<string, unknown> = {};

	for (const [field, seedValue] of Object.entries(seedClaimFields(seed))) {
		if (!seedValuesMatch(existingClaim[field], seedValue)) {
			$set[field] = seedValue;
		}
	}

	return Object.keys($set).length ? { $set } : {};
}

export function buildSeedSourceUpdate(
	existingSource: ExistingClaimSourceForSeedSync,
	source: SeedClaimSource
): SeedSourceUpdate {
	const $set: Record<string, unknown> = {};
	const $unset: Record<string, ""> = {};

	function setIfChanged(field: keyof ExistingClaimSourceForSeedSync, value: unknown) {
		if (existingSource[field] !== value) {
			$set[field] = value;
		}
	}

	function syncOptionalString(field: (typeof optionalSeedStringFields)[number]) {
		const value = source[field] ?? "";
		if (value) {
			setIfChanged(field, value);
			return;
		}
		if (existingSource[field]) {
			$unset[field] = "";
		}
	}

	setIfChanged("kind", source.kind);
	setIfChanged("title", source.title);
	for (const field of optionalSeedStringFields) {
		syncOptionalString(field);
	}
	if (typeof source.year === "number") {
		setIfChanged("year", source.year);
	}
	else if (existingSource.year) {
		$unset.year = "";
	}
	setIfChanged("isAnchor", Boolean(source.isAnchor));
	setIfChanged("appraisal", source.appraisal ?? "not_appraised");
	setIfChanged("citationStatus", source.citationStatus ?? "current");
	if (source.citationCheckedAt) {
		const citationCheckedAt = new Date(source.citationCheckedAt);
		if (!datesMatch(existingSource.citationCheckedAt, citationCheckedAt)) {
			$set.citationCheckedAt = citationCheckedAt;
		}
	}
	else if (existingSource.citationCheckedAt) {
		$unset.citationCheckedAt = "";
	}
	const statusSources = source.statusSources ?? [];
	if (!stringArraysMatch(existingSource.statusSources, statusSources)) {
		$set.statusSources = statusSources;
	}
	setIfChanged("stance", source.stance);
	setIfChanged("note", source.note);
	setIfChanged("order", source.order);

	return {
		...(Object.keys($set).length ? { $set } : {}),
		...(Object.keys($unset).length ? { $unset } : {})
	};
}

export async function seedClaims() {
	for (const seed of defaultClaims) {
		const topic = await Topic.findOne({ slug: seed.topicSlug });
		if (!topic) continue;

		const claim = await Claim.findOneAndUpdate(
			{ topic: topic._id, slug: seed.slug },
			{
				$setOnInsert: {
					topic: topic._id,
					slug: seed.slug,
					...seedClaimFields(seed),
					lastReviewedAt: new Date(),
					nextReviewAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
					publishedAt: seed.status === "published" ? new Date() : undefined
				}
			},
			{ upsert: true, returnDocument: "after" }
		);

		const claimUpdate = buildSeedClaimUpdate(claim as unknown as Record<string, unknown>, seed);
		const missingFields: Record<string, unknown> = { ...(claimUpdate.$set ?? {}) };
		if (!claim.agreementLevel) missingFields.agreementLevel = seed.agreementLevel;
		if (!claim.evidenceCertainty) missingFields.evidenceCertainty = seed.evidenceCertainty;
		if (!claim.reviewMode) missingFields.reviewMode = seed.reviewMode;
		if (!claim.lastReviewedAt) missingFields.lastReviewedAt = new Date();
		if (!claim.nextReviewAt) missingFields.nextReviewAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
		if (seed.status === "published" && !claim.publishedAt) missingFields.publishedAt = new Date();
		if (hasSeedClaimUpdate({ $set: missingFields })) {
			await Claim.updateOne({ _id: claim._id }, { $set: missingFields });
		}

		for (const source of seed.sources) {
			let existingSource = await ClaimSource.findOne({ claim: claim._id, title: source.title });
			if (!existingSource && typeof source.order === "number") {
				existingSource = await ClaimSource.findOne({ claim: claim._id, order: source.order });
			}
			if (!existingSource) {
				await ClaimSource.create({
					claim: claim._id,
					...source,
					citationCheckedAt: source.citationCheckedAt ? new Date(source.citationCheckedAt) : undefined
				});
				continue;
			}

			const sourceUpdate = buildSeedSourceUpdate(existingSource, source);
			if (hasSeedSourceUpdate(sourceUpdate)) {
				await ClaimSource.updateOne({ _id: existingSource._id }, sourceUpdate);
			}
		}
	}
}
