import type { SeedClaim } from "./claims.js";

export const july2026ReviewTimestamp = "2026-07-26T12:00:00.000Z";

type ExpansionClaim = Omit<SeedClaim, "status"> & {
	status?: SeedClaim["status"];
};

export function july2026ReviewedClaim(seed: ExpansionClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? july2026ReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? july2026ReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: july2026ReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published from the July 2026 evidence-library expansion."
			}
		]
	};
}
