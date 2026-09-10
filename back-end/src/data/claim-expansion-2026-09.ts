import type { SeedClaim } from "./claims.js";
import { september2026HumanOriginsClaims } from "./claim-expansion-2026-09-human-origins.js";
import { september2026InfectionImmunityClaims } from "./claim-expansion-2026-09-infection-immunity.js";
import { september2026SportsNutritionClaims } from "./claim-expansion-2026-09-sports-nutrition.js";

export const september2026TrafficClaims: SeedClaim[] = [
	...september2026HumanOriginsClaims,
	...september2026SportsNutritionClaims,
	...september2026InfectionImmunityClaims
];
