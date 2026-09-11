import type { SeedClaim } from "./claims.js";
import { september2026DemandDepthEnergyClaims } from "./claim-expansion-2026-09-demand-depth-energy.js";
import { september2026DemandDepthEvolutionClaims } from "./claim-expansion-2026-09-demand-depth-evolution.js";
import { september2026DemandDepthSportsNutritionClaims } from "./claim-expansion-2026-09-demand-depth-sports-nutrition.js";

export const september2026DemandDepthClaims: SeedClaim[] = [
	...september2026DemandDepthEvolutionClaims,
	...september2026DemandDepthEnergyClaims,
	...september2026DemandDepthSportsNutritionClaims
];
