// src/models/schemas/User.ts

import type { Model } from "mongoose";
import type { IUser } from "../../types/entities/IUser.js";
import mongoose, { Schema } from "mongoose";
import { passwordPlugin } from "../plugins/password.js";

const userSchema: Schema<IUser> = new Schema(
	{
		name: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
		password: { type: String, required: true },
		saveEdit: { type: String, default: "Edit", required: true },
		role: { type: String, default: "user" },
		trustScore: { type: Number, default: 0, min: 0 },
		trustLevel: { type: Number, default: 0, min: 0, max: 3 },
		expertiseStatus: {
			type: String,
			default: "none",
			enum: ["none", "pending", "verified", "rejected"]
		},
		affiliation: { type: String, default: "", trim: true, maxlength: 160 },
		expertiseAreas: { type: [String], default: [] }
	},
	{ timestamps: true }
);

userSchema.plugin(passwordPlugin);

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
