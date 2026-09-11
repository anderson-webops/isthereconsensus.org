import type { SeedClaim } from "./claims.js";
import { september2026VisitorDepthGeneticsClaims } from "./claim-expansion-2026-09-visitor-depth-genetics.js";
import { september2026VisitorDepthInfectionClaims } from "./claim-expansion-2026-09-visitor-depth-infection.js";
import { september2026VisitorDepthSleepClaims } from "./claim-expansion-2026-09-visitor-depth-sleep.js";

export const september2026VisitorDepthClaims: SeedClaim[] = [
	...september2026VisitorDepthGeneticsClaims,
	...september2026VisitorDepthInfectionClaims,
	...september2026VisitorDepthSleepClaims
];
