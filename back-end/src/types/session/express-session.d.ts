import type { IAdmin } from "../entities/IAdmin.js";
import type { IUser } from "../entities/IUser.js";

declare module "express-session" {
	interface SessionData {
		adminID?: string;
		userID?: string;
	}
}

declare global {
	namespace Express {
		interface Request {
			currentAdmin?: IAdmin;
			currentUser?: IUser;
		}
	}
}
