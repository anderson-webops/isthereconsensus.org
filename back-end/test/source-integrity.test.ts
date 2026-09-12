import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
	SOURCE_INTEGRITY_CHECK_RETENTION_SECONDS,
	SourceIntegrityCheck
} from "../src/models/schemas/SourceIntegrityCheck.js";
import {
	crossrefIntegrityUrl,
	normalizeDoi,
	parseCrossrefIntegrityResponse,
	strongerCitationStatus
} from "../src/utils/sourceIntegrity.js";
import { buildSourceIntegrityUpdate } from "../src/utils/sourceIntegrityMonitor.js";

describe("source integrity observations", () => {
	it("retains bounded audit history for two years", () => {
		const retentionIndex = SourceIntegrityCheck.schema
			.indexes()
			.find(([fields]) => fields.createdAt === 1);
		assert.equal(retentionIndex?.[1].expireAfterSeconds, SOURCE_INTEGRITY_CHECK_RETENTION_SECONDS);
	});

	it("normalizes DOI resolver links and rejects malformed identifiers", () => {
		assert.equal(normalizeDoi("https://doi.org/10.1000/Example"), "10.1000/example");
		assert.equal(normalizeDoi("doi: 10.5555/ABC.12"), "10.5555/abc.12");
		assert.equal(normalizeDoi("not a doi"), "");
		assert.match(crossrefIntegrityUrl("10.1000/example").toString(), /filter=updates%3A10\.1000%2Fexample/u);
	});

	it("uses only update relations that point to the requested DOI and applies the strongest signal", () => {
		const observation = parseCrossrefIntegrityResponse(
			{
				message: {
					items: [
						{
							"DOI": "10.1000/correction-notice",
							"update-to": [
								{ DOI: "10.1000/other", type: "retraction" },
								{
									DOI: "10.1000/target",
									type: "correction",
									label: "Correction",
									source: "publisher"
								},
								{
									DOI: "10.1000/target",
									type: "correction",
									label: "Correction",
									source: "publisher"
								}
							]
						},
						{
							"DOI": "10.1000/retraction-notice",
							"update-to": [
								{
									DOI: "10.1000/target",
									type: "retraction",
									label: "Retraction",
									source: "retraction-watch"
								}
							]
						}
					]
				}
			},
			"10.1000/target"
		);

		assert.equal(observation.outcome, "retracted");
		assert.equal(observation.suggestedStatus, "retracted");
		assert.equal(observation.signals.length, 2);
		assert.ok(observation.signals.every(signal => signal.noticeDoi !== ""));
		assert.ok(observation.statusSources.includes("https://doi.org/10.1000/retraction-notice"));
	});

	it("does not treat absent Crossref updates as proof of current status or clear an existing warning", () => {
		const observation = parseCrossrefIntegrityResponse({ message: { items: [] } }, "10.1000/target");
		assert.equal(observation.outcome, "no_registered_update");
		assert.equal(observation.suggestedStatus, undefined);
		assert.equal(strongerCitationStatus("retracted", observation.suggestedStatus), "retracted");

		const checkedAt = new Date("2026-09-10T12:00:00.000Z");
		const update = buildSourceIntegrityUpdate(
			{
				citationStatus: "expression_of_concern",
				statusSources: ["https://publisher.example/concern"],
				evidenceProfile: {
					publicationIntegrity: {
						retracted: false,
						expressionOfConcern: true,
						correctionOrErratum: false,
						predatoryOrQuestionableVenue: false
					}
				} as any
			},
			observation,
			checkedAt
		);

		assert.equal(update.nextStatus, "expression_of_concern");
		assert.equal(update.statusChanged, false);
		assert.equal(update.update.citationStatus, undefined);
		assert.equal(update.update.statusSources, undefined);
	});
});
