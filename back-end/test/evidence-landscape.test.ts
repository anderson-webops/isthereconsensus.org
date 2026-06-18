import type { IClaim } from "../src/models/schemas/Claim.js";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import mongoose from "mongoose";
import { Claim } from "../src/models/schemas/Claim.js";
import { toPublicEvidenceLandscape } from "../src/utils/evidenceLandscape.js";

describe("claim evidence landscape", () => {
	it("defaults to a private, not-assessed landscape", async () => {
		const claim = new Claim({
			topic: new mongoose.Types.ObjectId(),
			title: "Does a new claim start with a private landscape?"
		});

		await claim.validate();

		assert.equal(claim.evidenceLandscape.schemaVersion, 1);
		assert.equal(claim.evidenceLandscape.supportLabel, "unresolved");
		assert.equal(claim.evidenceLandscape.evidenceCertainty, "not_assessable");
		assert.equal(claim.evidenceLandscape.expertAgreement, "not_assessable");
		assert.equal(claim.evidenceLandscape.publicFlags.showEvidenceLandscape, false);
		assert.equal(claim.evidenceLandscape.workflow.status, "not_started");
	});

	it("rejects unsupported landscape labels", async () => {
		const claim = new Claim({
			topic: new mongoose.Types.ObjectId(),
			title: "Does validation reject made-up labels?",
			evidenceLandscape: {
				supportLabel: "consensus_magic"
			}
		});

		await assert.rejects(() => claim.validate(), /consensus_magic/);
	});

	it("only exposes the landscape after explicit public publish flags", () => {
		const hidden = toPublicEvidenceLandscape({
			evidenceLandscape: {
				schemaVersion: 1,
				supportLabel: "well_supported",
				evidenceCertainty: "high",
				expertAgreement: "strong",
				plainLanguageAnswer: "The reviewed answer is clear.",
				publicFlags: {
					showEvidenceLandscape: false,
					showCredibleMinorityView: true,
					showFalseBalanceWarning: true
				},
				workflow: {
					status: "published",
					editorialNotes: "Do not expose this."
				}
			}
		} as Partial<IClaim>);

		assert.equal(hidden, undefined);

		const visible = toPublicEvidenceLandscape({
			evidenceLandscape: {
				schemaVersion: 1,
				supportLabel: "well_supported",
				evidenceCertainty: "high",
				expertAgreement: "strong",
				plainLanguageAnswer: "The reviewed answer is clear.",
				credibleMinorityViewSummary: "A credible minority view remains narrow.",
				fringeOrUnsupportedViewSummary: "Unsupported versions are not weighted equally.",
				publicFlags: {
					showEvidenceLandscape: true,
					showCredibleMinorityView: false,
					showFalseBalanceWarning: true
				},
				workflow: {
					status: "published",
					lastAssessedAt: new Date("2026-04-25T00:00:00.000Z"),
					editorialNotes: "Do not expose this."
				}
			}
		} as Partial<IClaim>);

		assert.equal(visible?.plainLanguageAnswer, "The reviewed answer is clear.");
		assert.equal(visible?.credibleMinorityViewSummary, undefined);
		assert.equal(visible?.fringeOrUnsupportedViewSummary, "Unsupported versions are not weighted equally.");
		assert.equal("editorialNotes" in (visible?.workflow ?? {}), false);
	});
});
