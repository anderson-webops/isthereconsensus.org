import type { SeedClaim } from "./claims.js";
import { september2026DemandEssentialsClimateClaims } from "./claim-expansion-2026-09-demand-essentials-climate.js";
import { september2026DemandEssentialsHealthClaims } from "./claim-expansion-2026-09-demand-essentials-health.js";
import { september2026DemandEssentialsNutritionClaims } from "./claim-expansion-2026-09-demand-essentials-nutrition.js";

export const september2026DemandEssentialsClaims: SeedClaim[] = [
	...september2026DemandEssentialsClimateClaims,
	...september2026DemandEssentialsNutritionClaims,
	...september2026DemandEssentialsHealthClaims
];
