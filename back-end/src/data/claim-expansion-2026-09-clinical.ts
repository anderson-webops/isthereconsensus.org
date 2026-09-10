import type { SeedClaim } from "./claims.js";
import { september2026CancerCareClaims } from "./claim-expansion-2026-09-cancer-care.js";
import { september2026CardiometabolicKidneyClaims } from "./claim-expansion-2026-09-cardiometabolic-kidney.js";
import { september2026SubstanceUseClaims } from "./claim-expansion-2026-09-substance-use.js";

export const september2026ClinicalClaims: SeedClaim[] = [
	...september2026CancerCareClaims,
	...september2026CardiometabolicKidneyClaims,
	...september2026SubstanceUseClaims
];
