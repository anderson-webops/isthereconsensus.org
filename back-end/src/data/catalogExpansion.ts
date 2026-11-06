import { novemberLearningClaims } from "./claim-expansion-2026-11-learning.js";
import { novemberUrbanClaims } from "./claim-expansion-2026-11-urban.js";

export const CATALOG_ENTRY_GOAL = 1501;
export const catalogExpansionReleases = [
	{
		id: "catalog-1501-learning-2026-11-06",
		claims: novemberLearningClaims,
		dataSha256: "4ee54e7752ad58b5f24cbb97631a90c59f61e1c377871bf9793670894172bfb1"
	},
	{
		id: "catalog-1501-urban-2026-11-06",
		claims: novemberUrbanClaims,
		dataSha256: "4d6522389f71888a8d64978cf0432b1be8a8868af293e7a781f3a67557f55b48"
	}
];

export const catalogExpansionClaims = catalogExpansionReleases.flatMap(release => release.claims);
