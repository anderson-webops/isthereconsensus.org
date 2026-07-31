import type { Request } from "express";

export function getActorFromRequest(req: Request) {
	if (req.currentAdmin) {
		return {
			id: req.currentAdmin._id.toString(),
			model: "Admin" as const,
			name: req.currentAdmin.name || "Admin"
		};
	}

	if (req.currentUser) {
		return {
			id: req.currentUser._id.toString(),
			model: "User" as const,
			name: req.currentUser.name || "Member"
		};
	}

	throw new Error("Authenticated actor unavailable");
}

export function trustTierLabel(trustLevel: number | undefined, expertiseStatus: string | undefined) {
	if (expertiseStatus === "verified") return "expert";
	if ((trustLevel || 0) >= 2) return "trusted";
	if ((trustLevel || 0) >= 1) return "contributor";
	return "member";
}
