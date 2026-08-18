import type { SeedClaim } from "./claims.js";
import { august2026AgricultureClaims } from "./claim-expansion-2026-08-agriculture.js";
import { august2026AstronomyClaims } from "./claim-expansion-2026-08-astronomy.js";
import { august2026CrimeClaims } from "./claim-expansion-2026-08-crime.js";
import { august2026EcologyClaims } from "./claim-expansion-2026-08-ecology.js";
import { august2026EconomicsClaims } from "./claim-expansion-2026-08-economics.js";
import { august2026EducationClaims } from "./claim-expansion-2026-08-education.js";
import { august2026EnergyClaims } from "./claim-expansion-2026-08-energy.js";
import { august2026ExerciseClaims } from "./claim-expansion-2026-08-exercise.js";
import { august2026GeoscienceClaims } from "./claim-expansion-2026-08-geoscience.js";
import { august2026OceanClaims } from "./claim-expansion-2026-08-oceans.js";
import { august2026PhysicsClaims } from "./claim-expansion-2026-08-physics.js";
import { august2026SleepClaims } from "./claim-expansion-2026-08-sleep.js";

export const august2026EncyclopediaClaims: SeedClaim[] = [
	...august2026EducationClaims,
	...august2026SleepClaims,
	...august2026ExerciseClaims,
	...august2026CrimeClaims,
	...august2026AstronomyClaims,
	...august2026GeoscienceClaims,
	...august2026EcologyClaims,
	...august2026EnergyClaims,
	...august2026AgricultureClaims,
	...august2026OceanClaims,
	...august2026PhysicsClaims,
	...august2026EconomicsClaims
];
