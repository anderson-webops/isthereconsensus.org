import { novemberHouseholdEnergyClaims } from "./claim-expansion-2026-11-household-energy.js";
import { novemberLearningHabitsWorkClaims } from "./claim-expansion-2026-11-learning-habits-work.js";
import { novemberLearningClaims } from "./claim-expansion-2026-11-learning.js";
import { novemberTransportHousingClaims } from "./claim-expansion-2026-11-transport-housing.js";
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
	},
	{
		id: "catalog-1501-learning-habits-work-2026-11-06",
		claims: novemberLearningHabitsWorkClaims,
		dataSha256: "f420839700734714998cb591385fc97ddc6c8e02f4f24805722a9724ee889130"
	},
	{
		id: "catalog-1501-transport-housing-2026-11-06",
		claims: novemberTransportHousingClaims,
		dataSha256: "416a2f3253e2fa38b0dc905571142433c9bffb2473a0037f9725be186ec121bd"
	},
	{
		id: "catalog-1501-household-energy-2026-11-07",
		claims: novemberHouseholdEnergyClaims,
		dataSha256: "07fa9ed9bd72d5c312d84f51a5154d72094bd481c504230deb2dcd1b1afe8352"
	}
];

export const catalogExpansionClaims = catalogExpansionReleases.flatMap(release => release.claims);
