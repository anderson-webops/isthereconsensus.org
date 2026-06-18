import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

export type EvidenceLandscapeReviewAction
	= | "created"
		| "updated"
		| "submitted_for_review"
		| "changes_requested"
		| "approved"
		| "published"
		| "marked_stale"
		| "superseded"
		| "source_coding_updated"
		| "distribution_recomputed";

export interface IEvidenceLandscapeReview {
	claimId: mongoose.Types.ObjectId;
	action: EvidenceLandscapeReviewAction;
	fromStatus?: string;
	toStatus?: string;
	actorId: mongoose.Types.ObjectId;
	actorModel: "User" | "Admin";
	reviewerId?: mongoose.Types.ObjectId;
	notes?: string;
	changedFields: string[];
	snapshot: {
		evidenceLandscape?: unknown;
		sourceEvidenceProfiles: Array<{
			claimSourceId: mongoose.Types.ObjectId;
			evidenceProfile?: unknown;
		}>;
	};
	createdAt?: Date;
	updatedAt?: Date;
}

const evidenceLandscapeReviewSchema: Schema<IEvidenceLandscapeReview> = new Schema(
	{
		claimId: { type: Schema.Types.ObjectId, ref: "Claim", required: true, index: true },
		action: {
			type: String,
			required: true,
			enum: [
				"created",
				"updated",
				"submitted_for_review",
				"changes_requested",
				"approved",
				"published",
				"marked_stale",
				"superseded",
				"source_coding_updated",
				"distribution_recomputed"
			],
			index: true
		},
		fromStatus: { type: String, default: "", trim: true },
		toStatus: { type: String, default: "", trim: true },
		actorId: { type: Schema.Types.ObjectId, required: true, index: true },
		actorModel: { type: String, required: true, default: "User", enum: ["User", "Admin"] },
		reviewerId: { type: Schema.Types.ObjectId, ref: "User" },
		notes: { type: String, default: "", trim: true, maxlength: 2000 },
		changedFields: { type: [String], default: [] },
		snapshot: {
			type: new Schema<IEvidenceLandscapeReview["snapshot"]>(
				{
					evidenceLandscape: { type: Schema.Types.Mixed, default: null },
					sourceEvidenceProfiles: {
						type: [
							new Schema(
								{
									claimSourceId: { type: Schema.Types.ObjectId, ref: "ClaimSource", required: true },
									evidenceProfile: { type: Schema.Types.Mixed, default: null }
								},
								{ _id: false }
							)
						],
						default: []
					}
				},
				{ _id: false }
			),
			default: () => ({
				evidenceLandscape: null,
				sourceEvidenceProfiles: []
			})
		}
	},
	{ timestamps: true }
);

evidenceLandscapeReviewSchema.index({ claimId: 1, createdAt: -1 });

export const EvidenceLandscapeReview: Model<IEvidenceLandscapeReview> = mongoose.model<IEvidenceLandscapeReview>(
	"EvidenceLandscapeReview",
	evidenceLandscapeReviewSchema
);
