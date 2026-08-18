import type { SeedClaim } from "./claims.js";
import { august2026BiotechnologyClaims } from "./claim-expansion-2026-08-biotechnology.js";
import { august2026ClimateClaims } from "./claim-expansion-2026-08-climate.js";
import { august2026HealthClaims } from "./claim-expansion-2026-08-health.js";
import { august2026NutritionClaims } from "./claim-expansion-2026-08-nutrition.js";
import { august2026PolicyClaims } from "./claim-expansion-2026-08-policy.js";
import { august2026PsychologyClaims } from "./claim-expansion-2026-08-psychology.js";

export const august2026ExpansionClaims: SeedClaim[] = [
	...august2026HealthClaims,
	...august2026ClimateClaims,
	...august2026NutritionClaims,
	...august2026PsychologyClaims,
	...august2026BiotechnologyClaims,
	...august2026PolicyClaims
];
