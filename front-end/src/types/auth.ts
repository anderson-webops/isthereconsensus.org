export type AuthRole = "user" | "admin";

export interface AuthUser {
	_id: string;
	name: string;
	email: string;
	role?: AuthRole;
}

export interface AuthResponse {
	currentUser?: AuthUser | null;
	currentAdmin?: AuthUser | null;
}
