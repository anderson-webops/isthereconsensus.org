// src/types/abstractions/BaseUser.ts
import type { Document, Types } from "mongoose";

export interface IBaseUser extends Document {
	_id: Types.ObjectId;
	name: string;
	email: string;
	password: string;
	saveEdit: string; // the “Save” / “Edit” toggle text
	trustScore?: number;
	trustLevel?: number;
	expertiseStatus?: "none" | "pending" | "verified" | "rejected";
	affiliation?: string;
	expertiseAreas?: string[];
	termsVersion?: string;
	termsAcceptedAt?: Date;

	comparePassword: (password: string) => Promise<boolean>;

	toJSON: () => Record<string, unknown>;
}
