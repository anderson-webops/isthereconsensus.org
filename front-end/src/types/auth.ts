export type AuthRole = "user" | "admin";

export interface AuthUser {
	_id: string;
	name: string;
	email: string;
	role?: AuthRole;
	trustScore?: number;
	trustLevel?: number;
	expertiseStatus?: "none" | "pending" | "verified" | "rejected";
	affiliation?: string;
	expertiseAreas?: string[];
}

export interface AuthResponse {
	currentUser?: AuthUser | null;
	currentAdmin?: AuthUser | null;
}
