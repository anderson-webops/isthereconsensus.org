import { novemberLearningClaims } from "./claim-expansion-2026-11-learning.js";

export const CATALOG_ENTRY_GOAL = 1501;
export const catalogExpansionReleases = [
	{
		id: "catalog-1501-learning-2026-11-06",
		claims: novemberLearningClaims,
		dataSha256: "4ee54e7752ad58b5f24cbb97631a90c59f61e1c377871bf9793670894172bfb1"
	}
];

export const catalogExpansionClaims = catalogExpansionReleases.flatMap(release => release.claims);
