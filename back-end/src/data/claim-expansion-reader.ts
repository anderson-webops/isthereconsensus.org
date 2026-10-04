import type { SeedClaim } from "./claims.js";
import { readerPrivacyClaims, readerPrivacyGaps } from "./claim-expansion-reader-privacy.js";

export const readerExpansionClaims: SeedClaim[] = [...readerPrivacyClaims];
export const readerExpansionGaps = [...readerPrivacyGaps];
