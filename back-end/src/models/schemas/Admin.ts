// src/models/schemas/Admin.ts

import type { Model } from "mongoose";
import type { IAdmin } from "../../types/entities/IAdmin.js";
import mongoose, { Schema } from "mongoose";
import { passwordPlugin } from "../plugins/password.js";

/**
 * Create Mongoose Schema for Admin
 */
const adminSchema: Schema<IAdmin> = new Schema(
	{
		name: { type: String, required: true, trim: true, maxlength: 80 },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
		password: { type: String, required: true },
		sessionVersion: { type: Number, required: true, default: 0, min: 0, select: true },
		enabled: { type: Boolean, required: true, default: true, index: true },
		editAdmins: { type: Boolean, default: false, required: true }, // Added required: true
		saveEdit: { type: String, default: "Edit", required: true }, // Added required: true
		role: { type: String, default: "admin", enum: ["admin"], immutable: true }
	},
	{ timestamps: true }
);

/**
 * Create and handle password hashing, comparison, and removal from JSON responses
 */
adminSchema.plugin(passwordPlugin);

/**
 * Create and export Admin model
 */
export const Admin: Model<IAdmin> = mongoose.model<IAdmin>("Admin", adminSchema);
