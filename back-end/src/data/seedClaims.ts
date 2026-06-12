import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { Topic } from "../models/schemas/Topic.js";
import { defaultClaims } from "./claims.js";

type SeedClaimSource = (typeof defaultClaims)[number]["sources"][number];

interface SeedSourceUpdate {
	$set?: Record<string, unknown>;
	$unset?: Record<string, "">;
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
					title: seed.title,
					slug: seed.slug,
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
					searchCutoffAt: new Date(seed.searchCutoffAt),
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
					lastRetractionCheckAt: new Date(seed.lastRetractionCheckAt),
					changeLog: seed.changeLog.map(entry => ({
						...entry,
						date: new Date(entry.date)
					})),
					lastReviewedAt: new Date(),
					nextReviewAt: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
					publishedAt: seed.status === "published" ? new Date() : undefined
				}
			},
			{ upsert: true, returnDocument: "after" }
		);

		const missingFields: Record<string, unknown> = {};
		if (!claim.agreementLevel) missingFields.agreementLevel = seed.agreementLevel;
		if (!claim.evidenceCertainty) missingFields.evidenceCertainty = seed.evidenceCertainty;
		if (!claim.reviewMode) missingFields.reviewMode = seed.reviewMode;
		if (!claim.searchDatabases?.length) missingFields.searchDatabases = seed.searchDatabases;
		if (!claim.searchCutoffAt) missingFields.searchCutoffAt = new Date(seed.searchCutoffAt);
		if (!claim.inclusionRules?.length) missingFields.inclusionRules = seed.inclusionRules;
		if (!claim.exclusionRules?.length) missingFields.exclusionRules = seed.exclusionRules;
		if (!claim.misconceptionTags?.length) missingFields.misconceptionTags = seed.misconceptionTags;
		if (!claim.uncertaintySummary) missingFields.uncertaintySummary = seed.uncertaintySummary;
		if (!claim.uncertaintyDrivers?.length) missingFields.uncertaintyDrivers = seed.uncertaintyDrivers;
		if (!claim.surveillanceSpec?.focus && seed.surveillanceSpec) missingFields.surveillanceSpec = seed.surveillanceSpec;
		if (!claim.appraisalTools?.length) missingFields.appraisalTools = seed.appraisalTools;
		if (!claim.evidenceSummaries?.length) missingFields.evidenceSummaries = seed.evidenceSummaries;
		if (!claim.institutionalAnchors?.length) missingFields.institutionalAnchors = seed.institutionalAnchors;
		if (!claim.authorLine) missingFields.authorLine = seed.authorLine;
		if (!claim.reviewerLine) missingFields.reviewerLine = seed.reviewerLine;
		if (!claim.coiSummary) missingFields.coiSummary = seed.coiSummary;
		if (!claim.independenceSummary) missingFields.independenceSummary = seed.independenceSummary;
		if (!claim.lastRetractionCheckAt) missingFields.lastRetractionCheckAt = new Date(seed.lastRetractionCheckAt);
		if (!claim.changeLog?.length) {
			missingFields.changeLog = seed.changeLog.map(entry => ({
				...entry,
				date: new Date(entry.date)
			}));
		}
		if (!claim.lastReviewedAt) missingFields.lastReviewedAt = new Date();
		if (!claim.nextReviewAt) missingFields.nextReviewAt = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000);
		if (seed.status === "published" && !claim.publishedAt) missingFields.publishedAt = new Date();
		if (Object.keys(missingFields).length) {
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
