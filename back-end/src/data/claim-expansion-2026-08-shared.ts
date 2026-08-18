import type { SeedClaim } from "./claims.js";

export const august2026ReviewTimestamp = "2026-08-18T12:00:00.000Z";

type ExpansionClaim = Omit<SeedClaim, "status"> & {
	status?: SeedClaim["status"];
};

export function august2026ReviewedClaim(seed: ExpansionClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? august2026ReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? august2026ReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: august2026ReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published from the August 2026 evidence-library expansion."
			}
		]
	};
}
