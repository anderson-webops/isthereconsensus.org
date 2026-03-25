import type { Request } from "express";

export function getActorFromRequest(req: Request) {
	const session = req.session as any;
	if (session?.adminID) {
		return {
			id: session.adminID as string,
			model: "Admin" as const,
			name: req.currentAdmin?.name || "Admin"
		};
	}

	return {
		id: session?.userID as string,
		model: "User" as const,
		name: req.currentUser?.name || "Member"
	};
}

export function trustTierLabel(trustLevel: number | undefined, expertiseStatus: string | undefined) {
	if (expertiseStatus === "verified") return "expert";
	if ((trustLevel || 0) >= 2) return "trusted";
	if ((trustLevel || 0) >= 1) return "contributor";
	return "member";
}
