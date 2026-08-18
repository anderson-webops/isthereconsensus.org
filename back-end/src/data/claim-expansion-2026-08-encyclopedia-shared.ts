import type { SeedClaim } from "./claims.js";

export const august2026EncyclopediaReviewTimestamp = "2026-08-18T18:00:00.000Z";

type EncyclopediaClaim = Omit<SeedClaim, "status"> & {
	status?: SeedClaim["status"];
};

export function august2026EncyclopediaClaim(seed: EncyclopediaClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? august2026EncyclopediaReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? august2026EncyclopediaReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: august2026EncyclopediaReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the evidence-encyclopedia expansion."
			}
		]
	};
}
