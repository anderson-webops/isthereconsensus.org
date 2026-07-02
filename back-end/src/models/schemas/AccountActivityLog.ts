import type { Model } from "mongoose";
import mongoose, { Schema } from "mongoose";

export const ACCOUNT_ACTIVITY_ACTIONS = [
	"user.registered",
	"user.deleted",
	"admin.created",
	"admin.deleted",
	"login.success",
	"login.failed",
	"logout",
	"password.changed",
	"email.changed",
	"expert_application.created",
	"expert_application.reviewed"
] as const;

export const ACCOUNT_ACTIVITY_ACTOR_TYPES = ["user", "admin", "system", "anonymous"] as const;
export const ACCOUNT_ACTIVITY_TARGET_TYPES = ["user", "admin", "expert_application", "unknown"] as const;

export type AccountActivityAction = (typeof ACCOUNT_ACTIVITY_ACTIONS)[number];
export type AccountActivityActorType = (typeof ACCOUNT_ACTIVITY_ACTOR_TYPES)[number];
export type AccountActivityTargetType = (typeof ACCOUNT_ACTIVITY_TARGET_TYPES)[number];

export interface IAccountActivityLog {
	action: AccountActivityAction;
	actorType: AccountActivityActorType;
	actorId?: mongoose.Types.ObjectId;
	targetType: AccountActivityTargetType;
	targetId?: mongoose.Types.ObjectId;
	targetEmailHash?: string;
	targetEmailDomain?: string;
	sourceIp?: string;
	userAgent?: string;
	requestId?: string;
	metadata: Record<string, string>;
	createdAt?: Date;
}

const accountActivityLogSchema: Schema<IAccountActivityLog> = new Schema(
	{
		action: { type: String, required: true, enum: ACCOUNT_ACTIVITY_ACTIONS, index: true },
		actorType: { type: String, required: true, enum: ACCOUNT_ACTIVITY_ACTOR_TYPES, index: true },
		actorId: { type: Schema.Types.ObjectId, index: true },
		targetType: { type: String, required: true, enum: ACCOUNT_ACTIVITY_TARGET_TYPES, index: true },
		targetId: { type: Schema.Types.ObjectId, index: true },
		targetEmailHash: { type: String, trim: true, maxlength: 64, index: true },
		targetEmailDomain: { type: String, lowercase: true, trim: true, maxlength: 255, index: true },
		sourceIp: { type: String, trim: true, maxlength: 80, index: true },
		userAgent: { type: String, trim: true, maxlength: 500 },
		requestId: { type: String, trim: true, maxlength: 120, index: true },
		metadata: { type: Schema.Types.Mixed, default: {} }
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

accountActivityLogSchema.index({ createdAt: -1 });
accountActivityLogSchema.index({ action: 1, createdAt: -1 });
accountActivityLogSchema.index({ actorType: 1, actorId: 1, createdAt: -1 });
accountActivityLogSchema.index({ targetType: 1, targetId: 1, createdAt: -1 });

export const AccountActivityLog: Model<IAccountActivityLog> = mongoose.model<IAccountActivityLog>(
	"AccountActivityLog",
	accountActivityLogSchema
);
