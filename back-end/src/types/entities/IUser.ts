// src/types/entities/IUser.ts
import type { IBaseUser } from "../abstractions/BaseUser.js";

export interface IUser extends IBaseUser {
	role: string;
}
