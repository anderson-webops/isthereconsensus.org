import type { SeedClaim } from "./claims.js";

export const august2026EncyclopediaReviewTimestamp = "2026-08-18T18:00:00.000Z";
export const august2026EncyclopediaTrancheTwoReviewTimestamp = "2026-08-18T20:00:00.000Z";

type EncyclopediaClaim = Omit<SeedClaim, "status"> & {
	status?: SeedClaim["status"];
};

function encyclopediaClaimAt(seed: EncyclopediaClaim, reviewTimestamp: string): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? reviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? reviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: reviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the evidence-encyclopedia expansion."
			}
		]
	};
}

export function august2026EncyclopediaClaim(seed: EncyclopediaClaim): SeedClaim {
	return encyclopediaClaimAt(seed, august2026EncyclopediaReviewTimestamp);
}

export function august2026EncyclopediaTrancheTwoClaim(seed: EncyclopediaClaim): SeedClaim {
	return encyclopediaClaimAt(seed, august2026EncyclopediaTrancheTwoReviewTimestamp);
}
