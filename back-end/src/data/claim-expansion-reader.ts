import type { SeedClaim } from "./claims.js";
import { readerOriginsClaims, readerOriginsGaps } from "./claim-expansion-reader-origins.js";
import { readerPrivacyClaims, readerPrivacyGaps } from "./claim-expansion-reader-privacy.js";
import { readerSpaceClaims, readerSpaceGaps } from "./claim-expansion-reader-space.js";
import { readerWaterClaims, readerWaterGaps } from "./claim-expansion-reader-water.js";

export const readerExpansionClaims: SeedClaim[] = [
	...readerPrivacyClaims,
	...readerOriginsClaims,
	...readerSpaceClaims,
	...readerWaterClaims
];
export const readerExpansionGaps = [...readerPrivacyGaps, ...readerOriginsGaps, ...readerSpaceGaps, ...readerWaterGaps];
