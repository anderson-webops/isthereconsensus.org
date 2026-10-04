import type { SeedClaim } from "./claims.js";
import { readerOriginsClaims, readerOriginsGaps } from "./claim-expansion-reader-origins.js";
import { readerPrivacyClaims, readerPrivacyGaps } from "./claim-expansion-reader-privacy.js";

export const readerExpansionClaims: SeedClaim[] = [...readerPrivacyClaims, ...readerOriginsClaims];
export const readerExpansionGaps = [...readerPrivacyGaps, ...readerOriginsGaps];
