import type { IClaim } from "../src/models/schemas/Claim.js";
import assert from "node:assert/strict";
import process from "node:process";
import { afterEach, describe, it } from "node:test";
import mongoose from "mongoose";
import {
	accountPasswordSchema,
	adminPasswordSchema,
	normalizeHttpOrigin,
	normalizeHttpUrl,
	normalizeHttpUrlList
} from "../src/utils/accountValidation.js";
import { verifyCaptcha } from "../src/utils/captcha.js";
import {
	toApplicantExpertApplication,
	toEditorialClaim,
	toEditorialClaimRevision,
	toEditorialEvidenceReview,
	toEditorialQuestion,
	toPublicClaim,
	toPublicQuestion,
	toPublicTopicSentimentVote,
	toReporterQuestionFlag
} from "../src/utils/publicRecords.js";

const originalNodeEnv = process.env.NODE_ENV;
const originalCaptchaSecret = process.env.CAPTCHA_SECRET;

afterEach(() => {
	process.env.NODE_ENV = originalNodeEnv;
	if (originalCaptchaSecret === undefined) delete process.env.CAPTCHA_SECRET;
	else process.env.CAPTCHA_SECRET = originalCaptchaSecret;
});

describe("security boundaries", () => {
	it("accepts long passwords and rejects short passwords", () => {
		assert.equal(accountPasswordSchema.safeParse("a long passphrase for this account").success, true);
		assert.equal(accountPasswordSchema.safeParse("too short").success, false);
		assert.equal(adminPasswordSchema.safeParse("sixteen chars ok!").success, true);
		assert.equal(adminPasswordSchema.safeParse("only-12-char").success, false);
	});

	it("accepts only credential-free HTTP and HTTPS URLs", () => {
		assert.equal(normalizeHttpUrl("https://example.com/source"), "https://example.com/source");
		assert.throws(() => normalizeHttpUrl("javascript:alert(1)"), /HTTP or HTTPS/);
		assert.throws(() => normalizeHttpUrl("https://user:secret@example.com"), /embedded credentials|HTTP or HTTPS/);
		assert.throws(
			() => normalizeHttpUrlList(["https://example.com", "data:text/html,unsafe"]),
			/HTTP or HTTPS/
		);
	});

	it("accepts only exact HTTP origins and requires HTTPS for production origins", () => {
		assert.equal(normalizeHttpOrigin("https://example.com"), "https://example.com");
		assert.throws(() => normalizeHttpOrigin("https://example.com/path"), /must not include/);
		assert.throws(() => normalizeHttpOrigin("file:///tmp/site"), /HTTP or HTTPS/);
		assert.throws(
			() => normalizeHttpOrigin("http://example.com", { requireHttps: true }),
			/must use HTTPS/
		);
	});

	it("fails closed when production captcha credentials are missing", async () => {
		process.env.NODE_ENV = "production";
		delete process.env.CAPTCHA_SECRET;
		const result = await verifyCaptcha(undefined);
		assert.equal(result.ok, false);
		assert.equal(result.skipped, undefined);
	});

	it("removes account, reviewer, workflow, and surveillance identifiers from public questions and claims", () => {
		const internalId = new mongoose.Types.ObjectId();
		const question = toPublicQuestion({
			_id: new mongoose.Types.ObjectId(),
			title: "Public question",
			topic: {
				_id: new mongoose.Types.ObjectId(),
				title: "Topic",
				slug: "topic"
			} as any,
			author: internalId,
			authorModel: "User",
			linkedBy: internalId,
			moderatedBy: internalId,
			moderationNote: "private moderation rationale",
			displayName: "Reader"
		});
		assert.equal("author" in question, false);
		assert.equal("authorModel" in question, false);
		assert.equal("linkedBy" in question, false);
		assert.equal("moderatedBy" in question, false);
		assert.equal("moderationNote" in question, false);

		const claim = toPublicClaim({
			_id: new mongoose.Types.ObjectId(),
			title: "Public claim",
			slug: "public-claim",
			status: "published",
			reviewedBy: internalId,
			surveillanceSpec: {
				focus: "private monitoring detail",
				watchTerms: [],
				integrityMonitors: [],
				guidelineMonitors: [],
				triggerRules: []
			},
			evidenceLandscape: {
				publicFlags: {
					showEvidenceLandscape: false
				},
				workflow: {
					status: "draft",
					editorialNotes: "private editorial note",
					assignedEditorId: internalId
				}
			} as IClaim["evidenceLandscape"]
		});
		assert.equal("reviewedBy" in claim, false);
		assert.equal("surveillanceSpec" in claim, false);
		assert.equal(claim.evidenceLandscape, undefined);
		assert.equal(JSON.stringify(claim).includes(internalId.toString()), false);
		assert.equal(JSON.stringify(claim).includes("private editorial note"), false);
	});

	it("removes source coding and reviewer notes from public claim source records", () => {
		const serialized = toPublicClaim(
			{
				_id: new mongoose.Types.ObjectId(),
				title: "Claim",
				slug: "claim",
				status: "published"
			},
			{
				sources: [
					{
						_id: new mongoose.Types.ObjectId(),
						claim: new mongoose.Types.ObjectId(),
						kind: "systematic_review",
						title: "Source",
						stance: "supports",
						evidenceProfile: {
							reviewer: {
								notes: "private reviewer note"
							}
						}
					} as any
				]
			}
		);
		assert.equal(JSON.stringify(serialized).includes("private reviewer note"), false);
		assert.equal("evidenceProfile" in (serialized.sources?.[0] ?? {}), false);
	});

	it("does not expose linked draft claims through public question records", () => {
		const question = toPublicQuestion({
			_id: new mongoose.Types.ObjectId(),
			title: "Question linked during editorial review",
			claim: {
				_id: new mongoose.Types.ObjectId(),
				title: "Unpublished draft",
				slug: "unpublished-draft",
				status: "draft"
			} as any
		});

		assert.equal(question.claim, null);
		assert.equal(JSON.stringify(question).includes("Unpublished draft"), false);
	});

	it("keeps editorial routing data while removing account and moderation identifiers", () => {
		const internalId = new mongoose.Types.ObjectId();
		const question = toEditorialQuestion({
			_id: new mongoose.Types.ObjectId(),
			title: "Editorial question",
			displayName: "Reader",
			author: internalId,
			authorModel: "User",
			linkedBy: internalId,
			moderatedBy: internalId,
			moderationNote: "private moderation rationale",
			claim: {
				_id: new mongoose.Types.ObjectId(),
				title: "Draft claim",
				slug: "draft-claim",
				status: "draft"
			} as any
		});

		assert.equal(question.claim?.title, "Draft claim");
		assert.equal(question.claim?.status, "draft");
		assert.equal("author" in question, false);
		assert.equal("authorModel" in question, false);
		assert.equal("linkedBy" in question, false);
		assert.equal("moderatedBy" in question, false);
		assert.equal("moderationNote" in question, false);
		assert.equal(JSON.stringify(question).includes(internalId.toString()), false);
		assert.equal(JSON.stringify(question).includes("private moderation rationale"), false);
	});

	it("removes account identifiers and stored snapshots from editorial claim responses", () => {
		const internalId = new mongoose.Types.ObjectId();
		const claim = toEditorialClaim({
			_id: new mongoose.Types.ObjectId(),
			title: "Editorial claim",
			reviewedBy: internalId,
			evidenceLandscape: {
				workflow: {
					status: "ready_for_review",
					assignedEditorId: internalId,
					reviewedById: internalId,
					approvedById: internalId,
					assessedBy: internalId,
					editorialNotes: "private workflow note"
				}
			},
			sources: [
				{
					_id: new mongoose.Types.ObjectId(),
					claim: internalId,
					evidenceProfile: {
						reviewer: {
							codedById: internalId,
							reviewedById: internalId,
							notes: "private reviewer note"
						}
					}
				}
			]
		}) as any;
		const serialized = JSON.stringify(claim);

		assert.equal("reviewedBy" in claim, false);
		assert.equal("assignedEditorId" in claim.evidenceLandscape.workflow, false);
		assert.equal("reviewedById" in claim.evidenceLandscape.workflow, false);
		assert.equal("approvedById" in claim.evidenceLandscape.workflow, false);
		assert.equal("assessedBy" in claim.evidenceLandscape.workflow, false);
		assert.equal("claim" in claim.sources[0], false);
		assert.equal("codedById" in claim.sources[0].evidenceProfile.reviewer, false);
		assert.equal("reviewedById" in claim.sources[0].evidenceProfile.reviewer, false);
		assert.equal(serialized.includes(internalId.toString()), false);
		assert.equal(serialized.includes("private workflow note"), true);
		assert.equal(serialized.includes("private reviewer note"), true);

		const revision = toEditorialClaimRevision({
			_id: new mongoose.Types.ObjectId(),
			editor: internalId,
			editorModel: "User",
			summary: "Updated evidence",
			snapshot: { reviewedBy: internalId }
		}) as any;
		assert.equal("editor" in revision, false);
		assert.equal("snapshot" in revision, false);

		const review = toEditorialEvidenceReview({
			_id: new mongoose.Types.ObjectId(),
			actorId: internalId,
			actorModel: "Admin",
			action: "approved",
			snapshot: { sourceReviewer: internalId }
		}) as any;
		assert.equal("actorId" in review, false);
		assert.equal("snapshot" in review, false);
	});

	it("removes internal source record ids from public evidence boundaries", () => {
		const internalId = new mongoose.Types.ObjectId();
		const claim = toPublicClaim({
			evidenceLandscape: {
				boundaryConditions: [
					{
						dimension: "population",
						label: "Adults",
						explanation: "Evidence is limited to adults.",
						sourceIds: [internalId]
					}
				],
				publicFlags: {
					showEvidenceLandscape: true
				},
				workflow: {
					status: "published"
				}
			} as IClaim["evidenceLandscape"]
		});

		assert.equal(claim.evidenceLandscape?.boundaryConditions[0]?.label, "Adults");
		assert.equal("sourceIds" in (claim.evidenceLandscape?.boundaryConditions[0] ?? {}), false);
		assert.equal(JSON.stringify(claim).includes(internalId.toString()), false);
	});

	it("removes account and topic identifiers from sentiment vote responses", () => {
		const voter = new mongoose.Types.ObjectId();
		const topic = new mongoose.Types.ObjectId();
		const serialized = toPublicTopicSentimentVote({
			_id: new mongoose.Types.ObjectId(),
			voter,
			voterModel: "User",
			topic,
			stance: "aligns",
			confidence: 4,
			note: "My view"
		});

		assert.equal("voter" in (serialized ?? {}), false);
		assert.equal("voterModel" in (serialized ?? {}), false);
		assert.equal("topic" in (serialized ?? {}), false);
		assert.equal(JSON.stringify(serialized).includes(voter.toString()), false);
		assert.equal(JSON.stringify(serialized).includes(topic.toString()), false);
	});

	it("does not echo reporter account identifiers from question-flag submissions", () => {
		const reporter = new mongoose.Types.ObjectId();
		const serialized = toReporterQuestionFlag({
			_id: new mongoose.Types.ObjectId(),
			question: new mongoose.Types.ObjectId(),
			reporter,
			reporterModel: "User",
			reporterName: "Reporter",
			reason: "misleading",
			note: "Needs review",
			status: "open"
		}) as any;

		assert.equal("reporter" in serialized, false);
		assert.equal("reporterModel" in serialized, false);
		assert.equal("reporterName" in serialized, false);
		assert.equal("question" in serialized, false);
		assert.equal(JSON.stringify(serialized).includes(reporter.toString()), false);
	});

	it("removes account and reviewer identifiers from applicant-facing expert applications", () => {
		const user = new mongoose.Types.ObjectId();
		const reviewedBy = new mongoose.Types.ObjectId();
		const serialized = toApplicantExpertApplication({
			_id: new mongoose.Types.ObjectId(),
			user,
			name: "Applicant",
			credentialLabel: "Researcher",
			expertiseAreas: ["methods"],
			evidenceLinks: [],
			statement: "Relevant experience",
			attestsDisclosurePolicy: true,
			attestsReviewStandards: true,
			status: "approved",
			reviewedBy,
			reviewNotes: "Approved after credential review."
		});

		assert.equal("user" in (serialized ?? {}), false);
		assert.equal("reviewedBy" in (serialized ?? {}), false);
		assert.equal(JSON.stringify(serialized).includes(user.toString()), false);
		assert.equal(JSON.stringify(serialized).includes(reviewedBy.toString()), false);
	});
});
