import { novemberCareLearningClaims } from "./claim-expansion-2026-11-care-learning.js";
import { novemberCommonReaderClaims } from "./claim-expansion-2026-11-common-reader.js";
import { novemberEcologyConservationClaims } from "./claim-expansion-2026-11-ecology-conservation.js";
import { novemberEverydayHealthEnvironmentClaims } from "./claim-expansion-2026-11-everyday-health-environment.js";
import { novemberHouseholdEnergyClaims } from "./claim-expansion-2026-11-household-energy.js";
import { novemberLearningHabitsWorkClaims } from "./claim-expansion-2026-11-learning-habits-work.js";
import { novemberLearningClaims } from "./claim-expansion-2026-11-learning.js";
import { novemberRecoveryPreventionClaims } from "./claim-expansion-2026-11-recovery-prevention.js";
import { novemberRiverLandscapeClaims } from "./claim-expansion-2026-11-river-landscape.js";
import { novemberSocialPolicyClaims } from "./claim-expansion-2026-11-social-policy.js";
import { novemberTransportHousingClaims } from "./claim-expansion-2026-11-transport-housing.js";
import { novemberUrbanClaims } from "./claim-expansion-2026-11-urban.js";
import { novemberWomensHealthSupportClaims } from "./claim-expansion-2026-11-womens-health-support.js";

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
	},
	{
		id: "catalog-1501-common-reader-2026-11-07",
		claims: novemberCommonReaderClaims,
		dataSha256: "72fd21a53492d7693eec00ac1112cd997099b07fbaa0f437ef05effb65440e3d"
	},
	{
		id: "catalog-1501-everyday-health-environment-2026-11-07",
		claims: novemberEverydayHealthEnvironmentClaims,
		dataSha256: "1466a07509ff63a35b6810870fd7ce4e8e09eb17a67d6d2f20ae9d248fe20aa3"
	},
	{
		id: "catalog-1501-social-policy-2026-11-07",
		claims: novemberSocialPolicyClaims,
		dataSha256: "15c9290f7da18174a586c80174c36d46f893d1ee8dd8e82b94d3914d735b4896"
	},
	{
		id: "catalog-1501-care-learning-2026-11-07",
		claims: novemberCareLearningClaims,
		dataSha256: "c46db54ebd176e61558c182e7705e11e82105ed0eb5355a0aef8b26235c8743c"
	},
	{
		id: "catalog-1501-recovery-prevention-2026-11-07",
		claims: novemberRecoveryPreventionClaims,
		dataSha256: "d77fc79c111ed1e33a90546ed2628e9122dd29f00a091745d371d0eaa5e73373"
	},
	{
		id: "catalog-1501-womens-health-support-2026-11-07",
		claims: novemberWomensHealthSupportClaims,
		dataSha256: "9631a3d296ce3c94fa4f6927b9c0495ef4d64f7c5de1126454a2a352279d1b0b"
	},
	{
		id: "catalog-1501-ecology-conservation-2026-11-07",
		claims: novemberEcologyConservationClaims,
		dataSha256: "b5439504065657568da318099a3cd4bd1bb96fcbda896f86d54cc171675c87f4"
	},
	{
		id: "catalog-1501-river-landscape-2026-11-07",
		claims: novemberRiverLandscapeClaims,
		dataSha256: "aa45716f29f50b9ba3d61d3a4a740bb8024c73bd6a274fbf4e632437cbc9bd19"
	}
];

export const catalogExpansionClaims = catalogExpansionReleases.flatMap(release => release.claims);
