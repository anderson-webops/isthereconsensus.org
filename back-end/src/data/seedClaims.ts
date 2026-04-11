import { Claim } from "../models/schemas/Claim.js";
import { ClaimSource } from "../models/schemas/ClaimSource.js";
import { Topic } from "../models/schemas/Topic.js";
import { defaultClaims } from "./claims.js";

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
					editorSummary: seed.editorSummary,
					searchDatabases: seed.searchDatabases,
					searchCutoffAt: new Date(seed.searchCutoffAt),
					inclusionRules: seed.inclusionRules,
					exclusionRules: seed.exclusionRules,
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
			{ upsert: true, new: true }
		);

		const missingFields: Record<string, unknown> = {};
		if (!claim.agreementLevel) missingFields.agreementLevel = seed.agreementLevel;
		if (!claim.evidenceCertainty) missingFields.evidenceCertainty = seed.evidenceCertainty;
		if (!claim.reviewMode) missingFields.reviewMode = seed.reviewMode;
		if (!claim.searchDatabases?.length) missingFields.searchDatabases = seed.searchDatabases;
		if (!claim.searchCutoffAt) missingFields.searchCutoffAt = new Date(seed.searchCutoffAt);
		if (!claim.inclusionRules?.length) missingFields.inclusionRules = seed.inclusionRules;
		if (!claim.exclusionRules?.length) missingFields.exclusionRules = seed.exclusionRules;
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
		if (Object.keys(missingFields).length) {
			await Claim.updateOne({ _id: claim._id }, { $set: missingFields });
		}

		for (const source of seed.sources) {
			const existingSource = await ClaimSource.findOne({ claim: claim._id, title: source.title });
			if (!existingSource) {
				await ClaimSource.create({
					claim: claim._id,
					...source,
					citationCheckedAt: source.citationCheckedAt ? new Date(source.citationCheckedAt) : undefined
				});
				continue;
			}

			const missingSourceFields: Record<string, unknown> = {};
			if (!existingSource.url && source.url) missingSourceFields.url = source.url;
			if (!existingSource.year && source.year) missingSourceFields.year = source.year;
			if (!existingSource.doi && source.doi) missingSourceFields.doi = source.doi;
			if (!existingSource.pmid && source.pmid) missingSourceFields.pmid = source.pmid;
			if (!existingSource.pmcid && source.pmcid) missingSourceFields.pmcid = source.pmcid;
			if (!existingSource.isAnchor && source.isAnchor) missingSourceFields.isAnchor = source.isAnchor;
			if ((!existingSource.appraisal || existingSource.appraisal === "not_appraised") && source.appraisal) {
				missingSourceFields.appraisal = source.appraisal;
			}
			if (
				(!existingSource.citationStatus || existingSource.citationStatus === "current")
				&& source.citationStatus
			) {
				missingSourceFields.citationStatus = source.citationStatus;
			}
			if (!existingSource.citationCheckedAt && source.citationCheckedAt) {
				missingSourceFields.citationCheckedAt = new Date(source.citationCheckedAt);
			}

			if (Object.keys(missingSourceFields).length) {
				await ClaimSource.updateOne({ _id: existingSource._id }, { $set: missingSourceFields });
			}
		}
	}
}
