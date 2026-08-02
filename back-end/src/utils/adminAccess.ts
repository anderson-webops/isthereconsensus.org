import type { IAdmin } from "../types/entities/IAdmin.js";

export function adminIsEnabled(admin: Pick<IAdmin, "enabled">) {
	return admin.enabled !== false;
}
